import { DEFAULT_STYLING_SETTINGS, Language, Payment } from './sdk-contract'
import { CATALOG, COUNTRY_PRESETS } from './catalog'
import type { PlaygroundState, PlaygroundStyles, WalletType } from './types'

const WALLETS: WalletType[] = ['GOOGLE_PAY', 'APPLE_PAY', 'PAYPAL']

export const defaultStateFor = ({ country }: { country: string }): PlaygroundState => {
  const preset = COUNTRY_PRESETS[country] ?? COUNTRY_PRESETS.CO

  return {
    country: COUNTRY_PRESETS[country] ? country : 'CO',
    language: preset.language,
    paymentMethods: [...preset.paymentMethods],
    wallets: [...WALLETS],
    enrolledCard: true,
    enrolledCardCvv: true,
    unfolded: false,
    condensed: false,
    requiredFields: {},
    // The SDK's own defaults (DEFAULT_STYLING_SETTINGS), so an untouched playground looks like an unstyled merchant.
    styles: {
      accentColor: DEFAULT_STYLING_SETTINGS.global.accent_color,
      primaryTextColor: DEFAULT_STYLING_SETTINGS.global.primary_text_color,
      secondaryTextColor: DEFAULT_STYLING_SETTINGS.global.secondary_text_color,
      backgroundColor: DEFAULT_STYLING_SETTINGS.global.primary_background_color,
      buttonTextColor: DEFAULT_STYLING_SETTINGS.global.primary_button_text_color,
      secondaryBackgroundColor: DEFAULT_STYLING_SETTINGS.global.secondary_background_color,
      fontFamily: 'Inter',
    },
  }
}

const isHexColor = (value: unknown): value is string => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value)

/**
 * Accepts untrusted input (URL hash, postMessage) and keeps only known values,
 * so a crafted link can't push arbitrary data into the SDK.
 */
export const sanitizeState = ({
  base,
  patch,
}: {
  base: PlaygroundState
  patch: Partial<PlaygroundState>
}): PlaygroundState => {
  const countryChanged = typeof patch.country === 'string' && patch.country !== base.country && COUNTRY_PRESETS[patch.country]
  const start = countryChanged ? defaultStateFor({ country: patch.country! }) : base

  // Only the country's own methods, so a crafted link can't mix countries.
  const countryMethods = COUNTRY_PRESETS[start.country].paymentMethods
  const paymentMethods = Array.isArray(patch.paymentMethods)
    ? countryMethods.filter((type) => patch.paymentMethods!.includes(type))
    : start.paymentMethods

  const wallets = Array.isArray(patch.wallets)
    ? patch.wallets.filter((wallet): wallet is WalletType => WALLETS.includes(wallet))
    : start.wallets

  const bool = (key: 'unfolded' | 'condensed' | 'enrolledCard' | 'enrolledCardCvv') =>
    typeof patch[key] === 'boolean' ? patch[key]! : start[key]

  const styles = { ...start.styles }
  const patchStyles: Partial<PlaygroundStyles> = patch.styles ?? {}
  ;(['accentColor', 'primaryTextColor', 'secondaryTextColor', 'backgroundColor', 'buttonTextColor', 'secondaryBackgroundColor'] as const).forEach((key) => {
    if (isHexColor(patchStyles[key])) {
      styles[key] = patchStyles[key]!
    }
  })
  if (typeof patchStyles.fontFamily === 'string' && /^[\w -]{1,40}$/.test(patchStyles.fontFamily)) {
    styles.fontFamily = patchStyles.fontFamily
  }

  const requiredFields: PlaygroundState['requiredFields'] = { ...start.requiredFields }
  Object.entries(patch.requiredFields ?? {}).forEach(([type, fields]) => {
    if (!CATALOG[type as Payment.Type] || typeof fields !== 'object' || !fields) return
    requiredFields[type as Payment.Type] = Object.fromEntries(
      Object.entries(fields).filter(([, value]) => typeof value === 'boolean'),
    )
  })

  return {
    country: start.country,
    language: Object.values(Language).includes(patch.language as Language) ? patch.language! : start.language,
    paymentMethods,
    wallets,
    enrolledCard: bool('enrolledCard'),
    enrolledCardCvv: bool('enrolledCardCvv'),
    unfolded: bool('unfolded'),
    condensed: bool('condensed'),
    requiredFields,
    styles,
  }
}

export const encodeState = ({ state }: { state: PlaygroundState }) =>
  btoa(unescape(encodeURIComponent(JSON.stringify(state)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

export const decodeState = ({ hash }: { hash: string }): Partial<PlaygroundState> => {
  const raw = hash.replace(/^#/, '')
  if (!raw) return {}
  try {
    const base64 = raw.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(decodeURIComponent(escape(atob(base64))))
  } catch {
    return {}
  }
}
