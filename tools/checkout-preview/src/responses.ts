import { DEFAULT_STYLING_SETTINGS, Payment } from './sdk-contract'
import { CATALOG, COUNTRY_PRESETS, ENROLLED_CARD, paymentMethodIcon } from './catalog'
import { COUNTRIES, DOCUMENT_TYPES, LINKS } from './country-data'
import type { PlaygroundState, RequiredFieldKey } from './types'

/** Telemetry off everywhere: the playground must not send events, logs or metrics. */
const EVENT_CONFIG = {
  enable_events_android: false,
  enable_events_ios: false,
  enable_events_web: false,
  enable_events_web_vtex: false,
  enable_logs_android: false,
  enable_logs_ios: false,
  enable_logs_web: false,
  enable_logs_web_vtex: false,
  max_batch_queued: 10,
  service_timeout: 60000,
  loader_timeout: 60000,
}

const NO_REQUIRED_FIELDS: Payment.RequiredFields = {
  banner_info: false,
  email: false,
  first_name: false,
  last_name: false,
  nationality: false,
  security_code: false,
  phone: false,
  document: false,
  billing_address: false,
  shipping_address: false,
  zip_code: false,
  neighborhood: false,
  installment: false,
  issuers: false,
  wallet_card_type: false,
  benefit_type: false,
  account_number: false,
  routing_id: false,
  beneficiary_name: false,
  card_holder_name: false,
  account_type: false,
  account_holder_type: false,
}

export const resolveRequiredFields = ({
  state,
  type,
}: {
  state: PlaygroundState
  type: Payment.Type
}): Record<RequiredFieldKey, boolean> => ({
  ...NO_REQUIRED_FIELDS,
  ...CATALOG[type]?.required,
  ...state.requiredFields[type],
})

export const buildPaymentMethod = ({
  state,
  type,
  checkoutSession,
}: {
  state: PlaygroundState
  type: Payment.Type
  checkoutSession: string
}): Payment.Method => {
  const entry = CATALOG[type]

  return {
    // The backend sends null for a non-vaulted method, and the list matches its radios on that null.
    id: null,
    vaulted_token: null,
    name: entry?.name ?? type,
    description: entry?.name ?? type,
    type,
    category: entry?.category ?? Payment.Category.WALLET,
    icon: paymentMethodIcon(type),
    form_enable: true,
    autocomplete_data: true,
    c2p_enabled: false,
    required_fields: {
      ...NO_REQUIRED_FIELDS,
      ...resolveRequiredFields({ state, type }),
      // The PSE bank picker is part of the real form, so keep it on.
      issuers: type === Payment.Type.PSE,
    },
    additional_data: {},
    preferred: false,
    checkout: {
      session: checkoutSession,
      sdk_required_action: null,
      conditions: { enabled: true, rules: null },
    },
  } as unknown as Payment.Method
}

/** The saved card: CVV only, since the rest comes from the vault. */
export const buildEnrolledCard = ({
  state,
  checkoutSession,
}: {
  state: PlaygroundState
  checkoutSession: string
}): Payment.Method => {
  const base = buildPaymentMethod({ state, type: Payment.Type.CARD, checkoutSession })

  return {
    ...base,
    name: ENROLLED_CARD.name,
    description: 'Card',
    icon: ENROLLED_CARD.icon,
    vaulted_token: ENROLLED_CARD.vaultedToken,
    preferred: true,
    required_fields: { ...base.required_fields!, card_holder_name: false, security_code: state.enrolledCardCvv },
    additional_data: { card: ENROLLED_CARD.card },
  } as unknown as Payment.Method
}

export const buildPaymentMethods = ({
  state,
  checkoutSession,
}: {
  state: PlaygroundState
  checkoutSession: string
}) => ({
  payment_methods: [
    ...(state.enrolledCard ? [buildEnrolledCard({ state, checkoutSession })] : []),
    ...state.paymentMethods.map((type) => buildPaymentMethod({ state, type, checkoutSession })),
  ],
  event: EVENT_CONFIG,
})

export const buildMerchantConfig = () => ({
  payment: [],
  fraud_screening: [],
  three_d_secure: [],
  event: EVENT_CONFIG,
})

/**
 * Like /v1/checkout/country-data: every country (phone prefixes), but only the
 * session country's document types, with the display fields the form renders.
 */
export const buildCountryData = ({ country }: { country: string }) => ({
  countries: COUNTRIES,
  link: LINKS,
  payment_methods: {},
  document_types: DOCUMENT_TYPES
    .filter((documentType) => documentType.country === country)
    .map((documentType) => {
      const numeric = /^\^?\[0-9\]|^\^?\\d/.test(documentType.regex)
      return {
        ...documentType,
        display_code: documentType.code,
        display_description: documentType.description,
        function: '',
        input_type: numeric ? 'numeric' : 'alphanumeric',
        mask: numeric ? 'numeric' : 'alphanumeric',
      }
    }),
})

// A few PSE banks, from sdk-web src/mocks/fixtures/issuers.ts
export const buildIssuers = () => ({
  issuers: [
    { name: 'BANCAMIA', id: '1059' },
    { name: 'BANCO AGRARIO', id: '1040' },
    { name: 'BANCO CAJA SOCIAL', id: '10322' },
    { name: 'BANCO DAVIVIENDA', id: '1051' },
    { name: 'BANCO DE BOGOTA', id: '1039' },
    { name: 'BANCO DE OCCIDENTE', id: '1023' },
    { name: 'BANCO FALABELLA', id: '1062' },
  ],
})

// 'Inter' is the SDK's bundled face; anything else is a system font with a generic fallback.
const toFontStack = (font: string) =>
  font === 'Inter' ? '"Sdk-Payments-Inter", sans-serif' : `"${font}", ${font === 'Georgia' ? 'serif' : 'sans-serif'}`

export const buildSettings = ({ state }: { state: PlaygroundState }) => {
  const preset = COUNTRY_PRESETS[state.country] ?? COUNTRY_PRESETS.CO
  const { styles } = state

  return {
    // Only `global` reaches the UI; `button` and `header` keep the SDK defaults (DEFAULT_STYLING_SETTINGS).
    styles: {
      button: DEFAULT_STYLING_SETTINGS.button,
      header: DEFAULT_STYLING_SETTINGS.header,
      global: {
        ...DEFAULT_STYLING_SETTINGS.global,
        accent_color: styles.accentColor,
        font_family: toFontStack(styles.fontFamily),
        primary_background_color: styles.backgroundColor,
        primary_button_text_color: styles.buttonTextColor,
        primary_text_color: styles.primaryTextColor,
        secondary_background_color: styles.secondaryBackgroundColor,
        secondary_text_color: styles.secondaryTextColor,
      },
    },
    settings: {
      form: {
        autocomplete_by_zip_code: { enabled: false, min_length: 0, max_length: 0 },
      },
      card: {
        credit_card_only_processing: false,
        enable_ocr: false,
        save_on_success: false,
        visualization_mode: 'ONE_STEP',
        enable_payment_retry: false,
      },
      click_to_pay: { dual_pay_load: false, passkey: false, visa_network_token: false },
      google_pay: { double_step_flow: false },
      payment_method_list: {
        condensed_checkout_view: state.condensed,
        edit_payment_method_list: false,
        preselected_payment_method: false,
        unfolded_display: state.unfolded,
        moon_active_experience: false,
        blik_unfolded_display: false,
        // disable_unfolded_apm is left out: it's typed in core but no backend response is known to send it.
      },
      sdk_type: { mobile: 'SEAMLESS', web: 'SEAMLESS' },
      ui: null,
      urls: { c2p_webview_url: '', headless_3ds_challenge_url: '' },
      web_sdk: { hide_pay_button: false, render_mode: 'ELEMENT' },
    },
    internal_settings: {
      events_logs: {
        enable_events: false,
        enable_logs: false,
        enable_metrics: false,
        enable_network: false,
        loader_timeout: 60000,
        sdk_max_batch_queued: 10,
        service_timeout: 60000,
      },
      fraud: { max_fraud_timeout_ms: 0 },
    },
    external_fonts: [],
    amount: { currency: preset.currency, value: preset.amount },
    alternative_amount: { currency: preset.currency, value: preset.amount },
    features: {},
  }
}
