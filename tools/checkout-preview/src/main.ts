import { renderControls } from './controls'
import { resolveMockApi } from './mock-api'
import { installNetworkGuard } from './network-guard'
import { renderWalletPlaceholders } from './placeholders'
import type {
  PaymentMethodSelected,
  SdkInstance,
  SdkPaymentsGlobal,
  Transaction,
  TransactionConfig,
} from './sdk-contract'
import { decodeState, defaultStateFor, encodeState, sanitizeState } from './state'
import type { PlaygroundMessage, PlaygroundState } from './types'

/**
 * Yuno checkout preview: the production Web SDK (loaded from the CDN like any merchant page), with
 * its backend answered locally from the viewer's settings. No keys, no sessions, no payments.
 */

/** The published SDK this page shows. `?sdk=` overrides it with another published version. */
const DEFAULT_SDK_VERSION = 'v2.0.0-alpha.3'
const SDK_CDN = 'https://sdk-web.y.uno'

// Any non-empty key works: the prefix only picks the API host, and the network guard answers it.
const PUBLIC_API_KEY = 'sandbox_preview'

/**
 * Set by the docs snippet (snippets/CheckoutPreview.jsx) when the page runs inside an
 * `<iframe srcdoc>` on docs.y.uno: no URL to persist state in, and the docs page has its own title.
 */
type EmbedOptions = { embedded?: boolean; theme?: 'light' | 'dark' }
const embed: EmbedOptions = (window as unknown as { __YUNO_PREVIEW__?: EmbedOptions }).__YUNO_PREVIEW__ ?? {}

const DOCS_URL = 'https://docs.y.uno/docs/sdks/overview/quickstart'

// Origins allowed to drive the preview with postMessage (the docs site embedding it).
const ALLOWED_PARENT_ORIGINS = ['https://docs.y.uno']

const params = new URLSearchParams(window.location.search)
const showControls = params.get('controls') !== '0'
const requestedVersion = params.get('sdk')
const sdkVersion = requestedVersion && /^v\d+\.\d+(\.\d+(-[a-z]+\.\d+)?)?$/.test(requestedVersion)
  ? requestedVersion
  : DEFAULT_SDK_VERSION

let state: PlaygroundState = sanitizeState({
  base: defaultStateFor({ country: params.get('country') ?? 'CO' }),
  patch: decodeState({ hash: window.location.hash }),
})
let renderId = 0
let checkoutSession = ''
let sdkPayments: SdkPaymentsGlobal | undefined
let sdk: SdkInstance | undefined
// The list and each previewed form get their own transaction: `start()` runs once per transaction.
let transaction: Transaction | undefined
let formTransaction: Transaction | undefined
let selected: PaymentMethodSelected | undefined

const byId = (id: string) => document.getElementById(id) as HTMLElement

// Before the SDK script: from its first request on, the SDK only sees this patched network.
const guard = installNetworkGuard({
  resolve: ({ url, method }) => resolveMockApi({ url, method, state, checkoutSession }),
})

const loadSdk = (): Promise<SdkPaymentsGlobal> =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `${SDK_CDN}/${sdkVersion}/main.js`
    script.async = true
    script.onload = () => {
      const global = (window as unknown as { SdkPayments?: SdkPaymentsGlobal }).SdkPayments
      if (global) resolve(global)
      else reject(new Error(`SdkPayments is not defined by ${script.src}`))
    }
    script.onerror = () => reject(new Error(`Could not load ${script.src}`))
    document.head.append(script)
  })

const setStatus = (message: string) => {
  byId('playground-status').textContent = message
}

/** With the list unfolded, the SDK renders the selected method's form inline (saved card included). */
const isInline = () => state.unfolded

const updateContinueButton = () => {
  const button = byId('playground-continue') as HTMLButtonElement
  button.disabled = !selected || isInline()
  button.title = selected && isInline()
    ? 'This form is already open in the list'
    : ''
}

const applyPageStyles = () => {
  document.documentElement.style.setProperty('--checkout-bg', state.styles.backgroundColor)
}

const buildTransactionConfig = (): TransactionConfig => ({
  checkoutSession,
  countryCode: state.country,
  language: state.language as TransactionConfig['language'],
  elementSelector: '#playground-form',
  showStatusScreen: false,
  // Manual mode with a no-op merchant callback: nothing is ever charged.
  createPayment: async () => undefined,
  autoContinuePayment: false,
  onStatus: (status) => {
    console.info('[preview] onStatus', status)
    // Swapping the previewed form unmounts the previous one, which the SDK reports as USER_CANCEL.
    if (status?.status === 'USER_CANCEL') return
    setStatus('This is a demo, no payment was made.')
  },
})

const render = async () => {
  if (!sdkPayments) return
  const id = ++renderId
  // A new session per render: the SDK caches answers by checkout session, so this one fetches fresh.
  checkoutSession = `preview-${id}-${Math.random().toString(36).slice(2, 8)}`
  selected = undefined
  updateContinueButton()
  setStatus('')

  const previous = [transaction, formTransaction]
  transaction = undefined
  formTransaction = undefined
  sdk = undefined
  await Promise.all(previous.map((handle) => handle?.unmount().catch(() => undefined)))
  if (id !== renderId) return

  applyPageStyles()
  renderWalletPlaceholders({
    container: byId('playground-wallets'),
    wallets: state.wallets,
    radius: 8,
  })

  // A new application session gives a new init signature, so the SDK tears the previous instance down.
  const instance = await sdkPayments.initialize(PUBLIC_API_KEY, `preview-${id}`)
  if (id !== renderId) return

  // Only now: initialize() has unmounted the previous instance's React roots, so these nodes are free.
  byId('playground-list').replaceChildren()
  byId('playground-form').replaceChildren()

  if (state.paymentMethods.length === 0 && !state.enrolledCard) {
    setStatus('Select at least one payment method.')
    return
  }

  sdk = instance
  const current = instance.transaction(buildTransactionConfig())
  transaction = current
  const views = current.getPaymentMethodsViews({
    types: ['paymentMethodList'],
    onPaymentSelected: (paymentMethod) => {
      selected = paymentMethod
      updateContinueButton()
    },
  })
  views.paymentMethodList?.mount({ elementSelector: '#playground-list' })
}

const setState = ({ patch }: { patch: Partial<PlaygroundState> }) => {
  state = sanitizeState({ base: state, patch })
  // An about:srcdoc document can't rewrite its URL, so the embedded preview keeps state in memory only.
  if (!embed.embedded) {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${encodeState({ state })}`)
  }
  if (showControls) {
    renderControls({ container: byId('playground-controls'), state, emit: (next) => setState({ patch: next }) })
  }
  window.parent?.postMessage({ type: 'yuno-playground:state', state }, '*')
  void render()
}

const listenToParent = () => {
  window.addEventListener('message', (event: MessageEvent<PlaygroundMessage>) => {
    if (!ALLOWED_PARENT_ORIGINS.includes(event.origin)) return
    const message = event.data
    if (message?.type === 'yuno-playground:set-state') {
      setState({ patch: message.state })
    }
    if (message?.type === 'yuno-playground:set-theme' && (message.theme === 'light' || message.theme === 'dark')) {
      document.documentElement.dataset.theme = message.theme
    }
    if (message?.type === 'yuno-playground:get-state') {
      event.source?.postMessage({ type: 'yuno-playground:state', state }, { targetOrigin: event.origin })
    }
  })
}

/** Shows the selected method's form beside the list, replacing the previous one. */
const previewForm = async () => {
  if (!sdk || !selected || isInline()) return
  const paymentMethod = selected
  const instance = sdk

  const previous = formTransaction
  formTransaction = undefined
  await previous?.unmount().catch(() => undefined)
  byId('playground-form').replaceChildren()
  if (instance !== sdk) return

  formTransaction = instance.transaction(buildTransactionConfig())
  await formTransaction.start({ paymentMethod }).catch((error) => console.info('[preview] start failed', error))
}

const COPY_LABEL = 'Copy link'

const wireHeader = () => {
  const dialog = byId('playground-about-dialog') as HTMLDialogElement
  byId('playground-about').addEventListener('click', () => dialog.showModal())
  // A click on the backdrop lands on the dialog element itself
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close()
  })

  const docsLink = byId('playground-docs') as HTMLAnchorElement
  docsLink.href = DOCS_URL

  const copyLink = byId('playground-copy')
  const label = copyLink.querySelector('span') as HTMLElement
  copyLink.addEventListener('click', () => {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      label.textContent = 'Copied'
      window.setTimeout(() => (label.textContent = COPY_LABEL), 1500)
    }).catch(() => undefined)
  })
}

// Light unless the embedding docs page passes ?theme=dark (or sends set-theme).
const applyTheme = () => {
  const theme = embed.theme ?? params.get('theme')
  if (theme === 'light' || theme === 'dark') {
    document.documentElement.dataset.theme = theme
  }
}

const boot = async () => {
  applyTheme()
  document.body.dataset.controls = String(showControls)
  document.body.dataset.embedded = String(Boolean(embed.embedded))
  byId('playground-controls').hidden = !showControls
  byId('playground-sdk-version').textContent = `SDK ${sdkVersion}`
  wireHeader()
  byId('playground-continue').addEventListener('click', () => void previewForm())
  listenToParent()
  // Exposed for the Playwright checks and for debugging from the console.
  ;(window as unknown as { __yunoPlayground: unknown }).__yunoPlayground = {
    blocked: guard.blocked,
    sdkVersion,
    getState: () => state,
    getSelected: () => selected,
  }

  // Controls first, so the panel is usable while the SDK downloads
  setState({ patch: {} })

  try {
    sdkPayments = await loadSdk()
  } catch (error) {
    console.error('[preview]', error)
    setStatus(`The Yuno SDK ${sdkVersion} could not be loaded.`)
    return
  }
  void render()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => void boot())
} else {
  void boot()
}
