import { describe, expect, it } from 'vitest'
import { ENROLLED_CARD } from '../catalog'
import { resolveMockApi } from '../mock-api'
import { Payment } from '../sdk-contract'
import { defaultStateFor, sanitizeState } from '../state'
import type { PlaygroundState } from '../types'

const API = 'https://api-sandbox.y.uno'
const checkoutSession = 'preview-spec'

const get = ({ path, state = defaultStateFor({ country: 'CO' }) }: { path: string; state?: PlaygroundState }) =>
  resolveMockApi({ url: new URL(`${API}${path}`), method: 'GET', state, checkoutSession }) as Record<string, any>

describe('resolveMockApi', () => {
  it('answers every read the payment-method list makes at mount', () => {
    expect(get({ path: `/v2/sdk/checkout/sessions/${checkoutSession}/settings` })).toHaveProperty('styles.global')
    expect(get({ path: `/v1/sdk/checkout/sessions/${checkoutSession}/config?payment_method_type=GOOGLE_PAY` })).toHaveProperty('payment')
    expect(get({ path: '/v1/country-data?country=CO' })).toHaveProperty('countries')
    expect(get({ path: '/v1/checkout/country-data' })).toHaveProperty('countries')
    expect(get({ path: `/v1/sdk/issuers?checkout_session=${checkoutSession}&payment_method=PSE` }).issuers.length).toBeGreaterThan(0)

    const state = defaultStateFor({ country: 'CO' })
    expect(get({ path: `/v1/sdk/checkout/sessions/${checkoutSession}/payment-methods` })).toMatchObject({
      payment_methods: [
        { type: Payment.Type.CARD, vaulted_token: ENROLLED_CARD.vaultedToken },
        ...state.paymentMethods.map((type) => ({ type, vaulted_token: null })),
      ],
    })
  })

  it('answers a single method, and the saved card by its vaulted token', () => {
    expect(get({ path: `/v1/checkout/sessions/${checkoutSession}/type/PSE/payment-methods` })).toMatchObject({ type: 'PSE', vaulted_token: null })
    expect(
      get({ path: `/v1/checkout/sessions/${checkoutSession}/type/CARD/payment-methods?vaulted_token=${ENROLLED_CARD.vaultedToken}` }),
    ).toMatchObject({ type: 'CARD', vaulted_token: ENROLLED_CARD.vaultedToken, name: ENROLLED_CARD.name })
  })

  it('leaves writes and unknown endpoints to the guard', () => {
    const state = defaultStateFor({ country: 'CO' })
    expect(resolveMockApi({ url: new URL(`${API}/v1/checkout/sessions/x/token`), method: 'POST', state, checkoutSession })).toBeUndefined()
    expect(get({ path: '/v1/sdk/installment' })).toBeUndefined()
  })

  it('maps the viewer settings into the settings and payment-method answers', () => {
    const base = defaultStateFor({ country: 'CO' })
    const state = sanitizeState({
      base,
      patch: {
        unfolded: true,
        enrolledCardCvv: false,
        requiredFields: { PSE: { phone: true } },
        styles: { ...base.styles, accentColor: '#D6336C' },
      },
    })

    const settings = get({ path: `/v2/sdk/checkout/sessions/${checkoutSession}/settings`, state })
    expect(settings.settings.payment_method_list.unfolded_display).toBe(true)
    expect(settings.styles.global.accent_color).toBe('#D6336C')
    expect(settings.internal_settings.events_logs).toMatchObject({ enable_events: false, enable_logs: false })

    const { payment_methods } = get({ path: `/v1/sdk/checkout/sessions/${checkoutSession}/payment-methods`, state })
    const saved = payment_methods.find((method: Payment.Method) => method.vaulted_token)
    expect(saved.required_fields).toMatchObject({ security_code: false, card_holder_name: false })
    const pse = payment_methods.find((method: Payment.Method) => method.type === Payment.Type.PSE)
    expect(pse.required_fields).toMatchObject({ phone: true, email: true, document: true })
  })

  it("only returns the selected country's document types", () => {
    const { document_types } = get({ path: '/v1/checkout/country-data', state: defaultStateFor({ country: 'BR' }) })
    expect(document_types.length).toBeGreaterThan(0)
    expect(document_types.every((type: { country: string; display_description: string }) => type.country === 'BR' && type.display_description)).toBe(true)
  })
})

describe('sanitizeState', () => {
  it('drops unknown payment methods, bad colors and unsupported languages', () => {
    const base = defaultStateFor({ country: 'CO' })
    const state = sanitizeState({
      base,
      patch: {
        paymentMethods: ['CARD', 'NOT_A_METHOD'] as Payment.Type[],
        language: 'xx',
        styles: { ...base.styles, accentColor: 'red;background:url(x)' },
      },
    })

    expect(state.paymentMethods).toEqual([Payment.Type.CARD])
    expect(state.language).toBe(base.language)
    expect(state.styles.accentColor).toBe(base.styles.accentColor)
  })

  it('resets to the country preset when the country changes', () => {
    const state = sanitizeState({ base: defaultStateFor({ country: 'CO' }), patch: { country: 'BR' } })

    expect(state.country).toBe('BR')
    expect(state.paymentMethods).toContain(Payment.Type.PIX)
  })
})
