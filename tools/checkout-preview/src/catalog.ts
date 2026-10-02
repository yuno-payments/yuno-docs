import { Payment } from './sdk-contract'
import type { RequiredFieldKey, WalletType } from './types'

type CatalogEntry = {
  name: string
  category: Payment.Category
  required: Partial<Record<RequiredFieldKey, boolean>>
}

export const paymentMethodIcon = (type: string) => `https://icons.prod.y.uno/${type.toLowerCase()}_logosimbolo.png`

/**
 * Payment methods the playground can show. Defaults mirror what the backend
 * usually returns for each method; the viewer can toggle the required fields.
 */
export const CATALOG: Partial<Record<Payment.Type, CatalogEntry>> = {
  [Payment.Type.CARD]: {
    name: 'Card',
    category: Payment.Category.CARD,
    required: { card_holder_name: true, security_code: true },
  },
  [Payment.Type.PSE]: {
    name: 'PSE',
    category: Payment.Category.BANK_TRANSFER,
    required: { email: true, document: true },
  },
  [Payment.Type.NEQUI]: {
    name: 'Nequi',
    category: Payment.Category.WALLET,
    required: { phone: true },
  },
  [Payment.Type.PIX]: {
    name: 'Pix',
    category: Payment.Category.BANK_TRANSFER,
    required: { email: true, document: true, first_name: true, last_name: true },
  },
  [Payment.Type.BOLETO]: {
    name: 'Boleto',
    category: Payment.Category.TICKET,
    required: { email: true, document: true, first_name: true, last_name: true, billing_address: true },
  },
  [Payment.Type.OXXO]: {
    name: 'OXXO',
    category: Payment.Category.TICKET,
    required: { email: true, first_name: true, last_name: true },
  },
  [Payment.Type.SPEI]: {
    name: 'SPEI',
    category: Payment.Category.BANK_TRANSFER,
    required: { email: true },
  },
  [Payment.Type.WEBPAY]: {
    name: 'Webpay',
    category: Payment.Category.BANK_TRANSFER,
    required: { email: true },
  },
  [Payment.Type.BLIK]: {
    name: 'BLIK',
    category: Payment.Category.BANK_TRANSFER,
    required: {},
  },
  [Payment.Type.YAPE]: {
    name: 'Yape',
    category: Payment.Category.WALLET,
    required: { phone: true },
  },
}

export const WALLET_NAMES: Record<WalletType, string> = {
  GOOGLE_PAY: 'Google Pay',
  APPLE_PAY: 'Apple Pay',
  PAYPAL: 'PayPal',
}

export type Region = 'Latin America' | 'North America' | 'Europe' | 'Middle East'

export type CountryPreset = {
  region: Region
  currency: string
  amount: number
  language: string
  paymentMethods: Payment.Type[]
}

export const COUNTRY_PRESETS: Record<string, CountryPreset> = {
  CO: {
    region: 'Latin America',
    currency: 'COP',
    amount: 150000,
    language: 'es',
    paymentMethods: [Payment.Type.CARD, Payment.Type.PSE, Payment.Type.NEQUI],
  },
  BR: {
    region: 'Latin America',
    currency: 'BRL',
    amount: 250,
    language: 'pt',
    paymentMethods: [Payment.Type.CARD, Payment.Type.PIX, Payment.Type.BOLETO],
  },
  MX: {
    region: 'Latin America',
    currency: 'MXN',
    amount: 900,
    language: 'es',
    paymentMethods: [Payment.Type.CARD, Payment.Type.OXXO, Payment.Type.SPEI],
  },
  CL: {
    region: 'Latin America',
    currency: 'CLP',
    amount: 45000,
    language: 'es',
    paymentMethods: [Payment.Type.CARD, Payment.Type.WEBPAY],
  },
  PE: {
    region: 'Latin America',
    currency: 'PEN',
    amount: 180,
    language: 'es',
    paymentMethods: [Payment.Type.CARD, Payment.Type.YAPE],
  },
  US: {
    region: 'North America',
    currency: 'USD',
    amount: 50,
    language: 'en',
    paymentMethods: [Payment.Type.CARD],
  },
  // Europe and the Middle East: the SDK's Payment.Type enum has no local APMs for them besides
  // BLIK, so they show card plus the express buttons.
  ES: { region: 'Europe', currency: 'EUR', amount: 60, language: 'es', paymentMethods: [Payment.Type.CARD] },
  PT: { region: 'Europe', currency: 'EUR', amount: 60, language: 'pt', paymentMethods: [Payment.Type.CARD] },
  DE: { region: 'Europe', currency: 'EUR', amount: 60, language: 'en', paymentMethods: [Payment.Type.CARD] },
  GB: { region: 'Europe', currency: 'GBP', amount: 50, language: 'en', paymentMethods: [Payment.Type.CARD] },
  PL: { region: 'Europe', currency: 'PLN', amount: 250, language: 'en', paymentMethods: [Payment.Type.CARD, Payment.Type.BLIK] },
  AE: { region: 'Middle East', currency: 'AED', amount: 220, language: 'en', paymentMethods: [Payment.Type.CARD] },
  SA: { region: 'Middle East', currency: 'SAR', amount: 225, language: 'ar', paymentMethods: [Payment.Type.CARD] },
  KW: { region: 'Middle East', currency: 'KWD', amount: 18, language: 'ar', paymentMethods: [Payment.Type.CARD] },
}


/** A saved card, shaped like the SDK's own enrolled-card fixtures (enrolled-card-header.spec.tsx). */
export const ENROLLED_CARD = {
  vaultedToken: 'playground-vaulted-card',
  name: 'VISA ****1111',
  icon: 'https://icons.prod.y.uno/visa_logosimbolo.png',
  card: {
    brand: 'VISA',
    lfd: '1111',
    iin: '411111',
    holder_name: 'John Doe',
    expiration_month: 3,
    expiration_year: 2031,
    type: 'CREDIT',
  },
}
