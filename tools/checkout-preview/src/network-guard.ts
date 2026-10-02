/**
 * The preview's backend: the production SDK runs unmodified, and every request it sends to a
 * Yuno API host is answered here instead of reaching the network.
 *
 * - Read endpoints the checkout needs are answered by the resolver (mock-api.ts).
 * - Telemetry (events, logs, metrics) is swallowed with an empty 204.
 * - Anything else is refused with a 503, so tokenization, payment creation or polling fail fast.
 *
 * Install it before the SDK script loads, so the SDK only ever sees the patched fetch.
 * Card iframes (sdk-web-card) run on their own origin and are not covered: their BIN lookups
 * fail and the form falls back to local brand detection.
 */

export type GuardResolver = (request: { url: URL; method: string }) => unknown | undefined

const API_HOST = /^(api|demo)[\w-]*\.y\.uno$/
const WS_PATH = /checkout-websocket-notification-ms/
const TELEMETRY_PATH = /\/v\d\/sdk\/(events|logs|event-log|performance|metrics)/

const json = ({ body, status = 200 }: { body: unknown; status?: number }) =>
  new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })

const toUrl = (input: RequestInfo | URL): URL | undefined => {
  try {
    const raw = input instanceof Request ? input.url : String(input)
    return new URL(raw, window.location.href)
  } catch {
    return undefined
  }
}

export const isYunoApi = (url: URL) => API_HOST.test(url.hostname)

export const installNetworkGuard = ({ resolve }: { resolve: GuardResolver }) => {
  const blocked: string[] = []
  const originalFetch = window.fetch.bind(window)

  const answer = ({ url, method }: { url: URL; method: string }): Response => {
    if (TELEMETRY_PATH.test(url.pathname)) {
      return new Response(null, { status: 204 })
    }

    const body = resolve({ url, method })
    if (body !== undefined) {
      return json({ body })
    }

    blocked.push(`${method} ${url.pathname}`)
    console.info(`[preview] blocked ${method} ${url.pathname}: the checkout preview has no backend`)
    return json({ body: { code: 'PLAYGROUND', message: 'The checkout preview has no backend' }, status: 503 })
  }

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = toUrl(input)
    if (!url || !isYunoApi(url)) {
      return originalFetch(input, init)
    }
    const method = (init?.method ?? (input instanceof Request ? input.method : 'GET')).toUpperCase()
    return answer({ url, method })
  }

  const originalSendBeacon = navigator.sendBeacon?.bind(navigator)
  if (originalSendBeacon) {
    navigator.sendBeacon = (target: string | URL, data?: BodyInit | null) => {
      const url = toUrl(target)
      if (url && isYunoApi(url)) {
        return true
      }
      return originalSendBeacon(target, data)
    }
  }

  const OriginalXhr = window.XMLHttpRequest
  window.XMLHttpRequest = class GuardedXhr extends OriginalXhr {
    #blocked = false

    open(method: string, target: string | URL, ...rest: [boolean?, string?, string?]) {
      const url = toUrl(target)
      this.#blocked = Boolean(url && isYunoApi(url))
      // A blocked request is opened against an inert data URL so the XHR lifecycle still completes.
      const effective = this.#blocked ? 'data:application/json,{}' : target
      return super.open(method, effective, rest[0] ?? true, rest[1], rest[2])
    }

    send(body?: Document | XMLHttpRequestBodyInit | null) {
      return super.send(this.#blocked ? null : body)
    }
  }

  const OriginalWebSocket = window.WebSocket
  window.WebSocket = class GuardedWebSocket extends OriginalWebSocket {
    constructor(target: string | URL, protocols?: string | string[]) {
      const url = toUrl(target)
      if (url && WS_PATH.test(url.pathname)) {
        throw new Error('[preview] payment status socket disabled')
      }
      super(target, protocols)
    }
  }

  return { blocked }
}
