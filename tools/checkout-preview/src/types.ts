import type { Payment } from './sdk-contract'

export type WalletType = 'GOOGLE_PAY' | 'APPLE_PAY' | 'PAYPAL'

export type RequiredFieldKey = keyof Pick<
  Payment.RequiredFields,
  | 'email'
  | 'first_name'
  | 'last_name'
  | 'phone'
  | 'document'
  | 'billing_address'
  | 'shipping_address'
  | 'card_holder_name'
  | 'security_code'
>

export type PlaygroundStyles = {
  accentColor: string
  primaryTextColor: string
  secondaryTextColor: string
  backgroundColor: string
  buttonTextColor: string
  secondaryBackgroundColor: string
  fontFamily: string
}

/**
 * Everything the playground lets the viewer change. It is serialised into the
 * URL hash, so it stays small and JSON-friendly.
 */
export type PlaygroundState = {
  country: string
  language: string
  /** Non-wallet payment methods rendered by the SDK list, in order. */
  paymentMethods: Payment.Type[]
  /** Express buttons drawn by the playground page as placeholders. */
  wallets: WalletType[]
  /** Adds a saved (vaulted) card at the top of the list. */
  enrolledCard: boolean
  /** Whether the saved card asks for its CVV (its only required field). */
  enrolledCardCvv: boolean
  unfolded: boolean
  condensed: boolean
  /** Per payment method overrides on top of the catalog defaults. */
  requiredFields: Partial<Record<Payment.Type, Partial<Record<RequiredFieldKey, boolean>>>>
  styles: PlaygroundStyles
}

export type PlaygroundMessage =
  | { type: 'yuno-playground:set-state'; state: Partial<PlaygroundState> }
  | { type: 'yuno-playground:get-state' }
  | { type: 'yuno-playground:set-theme'; theme: 'light' | 'dark' }
