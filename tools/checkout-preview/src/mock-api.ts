import { ENROLLED_CARD } from './catalog'
import {
  buildCountryData,
  buildEnrolledCard,
  buildIssuers,
  buildMerchantConfig,
  buildPaymentMethod,
  buildPaymentMethods,
  buildSettings,
} from './responses'
import { Payment } from './sdk-contract'
import type { PlaygroundState } from './types'

/**
 * The backend the production SDK talks to, answered from the viewer's settings.
 * Routes mirror sdk-web-core `src/api/public-sdk/public-sdk.ts`; anything else returns undefined
 * and the network guard refuses it.
 */
export const resolveMockApi = ({
  url,
  method,
  state,
  checkoutSession,
}: {
  url: URL
  method: string
  state: PlaygroundState
  checkoutSession: string
}): unknown | undefined => {
  if (method !== 'GET') return undefined
  const path = url.pathname

  // GET /v2/sdk/checkout/sessions/{cs}/settings
  if (/^\/v2\/sdk\/checkout\/sessions\/[^/]+\/settings$/.test(path)) {
    return buildSettings({ state })
  }

  // GET /v1/sdk/checkout/sessions/{cs}/payment-methods
  if (/^\/v1\/sdk\/checkout\/sessions\/[^/]+\/payment-methods$/.test(path)) {
    return buildPaymentMethods({ state, checkoutSession })
  }

  // GET /v1/checkout/sessions/{cs}/type/{type}/payment-methods?vaulted_token=
  const single = path.match(/^\/v1\/checkout\/sessions\/[^/]+\/type\/([A-Z_]+)\/payment-methods$/)
  if (single) {
    const type = single[1] as Payment.Type
    const { event } = buildPaymentMethods({ state, checkoutSession })
    const vaultedToken = url.searchParams.get('vaulted_token')
    if (vaultedToken === ENROLLED_CARD.vaultedToken) {
      return { ...buildEnrolledCard({ state, checkoutSession }), event }
    }
    return { ...buildPaymentMethod({ state, type, checkoutSession }), event }
  }

  // GET /v1/sdk/checkout/sessions/{cs}/config?payment_method_type=
  if (/^\/v1\/sdk\/checkout\/sessions\/[^/]+\/config$/.test(path)) {
    return buildMerchantConfig()
  }

  // GET /v1/country-data?country= and GET /v1/checkout/country-data (checkout-session header)
  if (path === '/v1/country-data' || path === '/v1/checkout/country-data') {
    return buildCountryData({ country: state.country })
  }

  // GET /v1/sdk/issuers?checkout_session=&payment_method=
  if (path === '/v1/sdk/issuers') {
    return buildIssuers()
  }

  return undefined
}
