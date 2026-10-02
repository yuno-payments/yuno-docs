/**
 * The slice of the Yuno Web SDK contract this preview relies on, copied from their sources so the
 * project doesn't need the private @yuno packages:
 *
 * - Payment types and categories: sdk-web-core `src/types/payment.ts` (`Payment.Type`, `Payment.Category`)
 * - Languages: sdk-web-core `src/types/client.ts` (`Language`)
 * - Styling defaults: sdk-web `src/sdk/utils/styling-settings.ts` (`DEFAULT_STYLING_SETTINGS`)
 * - Endpoints: sdk-web-core `src/api/public-sdk/public-sdk.ts`
 *
 * When the SDK changes one of these, update it here.
 */

/* eslint-disable @typescript-eslint/no-namespace */
export namespace Payment {
  export const Type = {
    CARD: 'CARD',
    PSE: 'PSE',
    NEQUI: 'NEQUI',
    PIX: 'PIX',
    BOLETO: 'BOLETO',
    OXXO: 'OXXO',
    SPEI: 'SPEI',
    WEBPAY: 'WEBPAY',
    YAPE: 'YAPE',
    BLIK: 'BLIK',
    GOOGLE_PAY: 'GOOGLE_PAY',
    APPLE_PAY: 'APPLE_PAY',
    PAYPAL: 'PAYPAL',
    PAYPAL_ENROLLMENT: 'PAYPAL_ENROLLMENT',
    CLICK_TO_PAY: 'CLICK_TO_PAY',
  } as const
  export type Type = (typeof Type)[keyof typeof Type]

  export const Category = {
    CARD: 'CARD',
    BANK_TRANSFER: 'BANK_TRANSFER',
    TICKET: 'TICKET',
    WALLET: 'WALLET',
  } as const
  export type Category = (typeof Category)[keyof typeof Category]

  export type RequiredFields = Record<
    | 'banner_info' | 'email' | 'first_name' | 'last_name' | 'nationality' | 'security_code' | 'phone'
    | 'document' | 'billing_address' | 'shipping_address' | 'zip_code' | 'neighborhood' | 'installment'
    | 'issuers' | 'wallet_card_type' | 'benefit_type' | 'account_number' | 'routing_id'
    | 'beneficiary_name' | 'card_holder_name' | 'account_type' | 'account_holder_type',
    boolean
  >

  /** A row of GET /v1/sdk/checkout/sessions/{cs}/payment-methods, as the SDK reads it. */
  export type Method = {
    id: string | null
    name: string
    description: string
    vaulted_token: string | null
    type: Type
    category: Category
    icon: string
    form_enable: boolean
    autocomplete_data: boolean
    c2p_enabled: boolean
    required_fields: RequiredFields
    additional_data: Record<string, unknown>
    preferred: boolean
    checkout: {
      session: string
      sdk_required_action: null
      conditions: { enabled: boolean; rules: null }
    }
  }
}

export const Language = {
  ES: 'es',
  EN: 'en',
  PT: 'pt',
  ID: 'id',
  MS: 'ms',
  TH: 'th',
  AR: 'ar',
  HI: 'hi',
  BN: 'bn',
  ML: 'ml',
  UR: 'ur',
  MN: 'mn',
} as const
export type Language = (typeof Language)[keyof typeof Language]

export const DEFAULT_STYLING_SETTINGS = {
  header: {
    font_size: 18,
    font_weight: 700,
    logo_border_color: '#00000000',
    logo_border_size: 0,
    logo_corner_radius: 8,
  },
  global: {
    accent_color: '#282A30',
    font_family: '"Sdk-Payments-Inter", sans-serif',
    primary_background_color: '#FFFFFF',
    primary_button_text_color: '#FFFFFF',
    primary_text_color: '#282A30',
    secondary_background_color: '#F6F7FA',
    secondary_button_background_color: '#000000',
    secondary_button_text_color: '#000000',
    secondary_text_color: '#6C6F75',
  },
  button: {
    border_size: 1,
    corner_radius: 1,
    font_size: 1,
    font_weight: 1,
    primary_border_color: '#000000',
    secondary_border_color: '#000000',
  },
}

/** What window.SdkPayments exposes (v2 public API, docs/NEW_PUBLIC_API.md in sdk-web). */
export type PaymentMethodSelected = { type: Payment.Type; vaultedToken?: string }

export type SdkStatus = { status?: string } | undefined

export type TransactionConfig = {
  checkoutSession: string
  countryCode: string
  language: Language
  elementSelector: string
  showStatusScreen: boolean
  createPayment: () => Promise<void>
  autoContinuePayment: boolean
  onStatus: (status: SdkStatus) => void
}

export type Transaction = {
  getPaymentMethodsViews: (options: {
    types: ['paymentMethodList']
    onPaymentSelected: (paymentMethod: PaymentMethodSelected) => void
  }) => { paymentMethodList?: { mount: (options: { elementSelector: string }) => void } }
  start: (args: { paymentMethod: PaymentMethodSelected }) => Promise<void>
  unmount: () => Promise<void>
}

export type SdkInstance = { transaction: (config: TransactionConfig) => Transaction }

export type SdkPaymentsGlobal = {
  initialize: (publicApiKey: string, applicationSession?: string) => Promise<SdkInstance>
}
