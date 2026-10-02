import { Language, Payment } from './sdk-contract'
import { CATALOG, COUNTRY_PRESETS, WALLET_NAMES } from './catalog'
import type { Region } from './catalog'
import { buildEnrolledCard, buildPaymentMethod, resolveRequiredFields } from './responses'
import type { PlaygroundState, RequiredFieldKey, WalletType } from './types'

const REQUIRED_FIELD_LABELS: Record<RequiredFieldKey, string> = {
  email: 'Email',
  first_name: 'First name',
  last_name: 'Last name',
  phone: 'Phone',
  document: 'Document',
  billing_address: 'Billing address',
  shipping_address: 'Shipping address',
  card_holder_name: 'Cardholder name',
  security_code: 'Security code (CVV)',
}

const FONTS = ['Inter', 'Arial', 'Georgia', 'Verdana', 'Courier New']

// One entry per `styles.global` color the SDK reads (see mapStylingSettings).
const COLOR_LABELS: Record<'accentColor' | 'primaryTextColor' | 'secondaryTextColor' | 'backgroundColor' | 'buttonTextColor' | 'secondaryBackgroundColor', string> = {
  accentColor: 'Accent',
  primaryTextColor: 'Primary text',
  secondaryTextColor: 'Secondary text',
  backgroundColor: 'Background',
  buttonTextColor: 'Button text',
  secondaryBackgroundColor: 'Secondary background',
}

type Patch = Partial<PlaygroundState>

const displayName = ({ type, code }: { type: 'region' | 'language'; code: string }) => {
  try {
    return new Intl.DisplayNames(['en'], { type }).of(code) ?? code
  } catch {
    return code
  }
}

const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Record<string, unknown> = {},
  children: (Node | string)[] = [],
): HTMLElementTagNameMap[K] => {
  const node = Object.assign(document.createElement(tag), props)
  node.append(...children)
  return node
}

const section = ({ title, children }: { title: string; children: (Node | string)[] }) =>
  el('fieldset', { className: 'control-section' }, [
    el('legend', { textContent: title }),
    el('div', { className: 'control-items' }, children),
  ])

const checkbox = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) => {
  const input = el('input', { type: 'checkbox', checked })
  input.addEventListener('change', () => onChange(input.checked))
  return el('label', { className: 'control-check' }, [input, label])
}

const select = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}) => {
  const input = el('select', {}, options.map((option) => el('option', { value: option.value, textContent: option.label, selected: option.value === value })))
  input.addEventListener('change', () => onChange(input.value))
  return el('label', { className: 'control-field' }, [label, input])
}

const REGIONS: Region[] = ['Latin America', 'North America', 'Europe', 'Middle East']

/** Countries grouped by region, like the docs group SDK pages. */
const countrySelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const groups = REGIONS.map((region) =>
    el('optgroup', { label: region }, Object.entries(COUNTRY_PRESETS)
      .filter(([, preset]) => preset.region === region)
      .map(([code]) => el('option', { value: code, textContent: displayName({ type: 'region', code }), selected: code === value }))),
  )
  const input = el('select', {}, groups)
  input.addEventListener('change', () => onChange(input.value))
  return el('label', { className: 'control-field' }, ['Country', input])
}

const countrySection = ({ state, emit }: { state: PlaygroundState; emit: (patch: Patch) => void }) =>
  section({
    title: 'Country',
    children: [
      countrySelect({ value: state.country, onChange: (country) => emit({ country }) }),
      select({
        label: 'Language',
        value: state.language,
        options: Object.values(Language).map((language) => ({ value: language, label: displayName({ type: 'language', code: language }) })),
        onChange: (language) => emit({ language }),
      }),
    ],
  })

const paymentMethodsSection = ({ state, emit }: { state: PlaygroundState; emit: (patch: Patch) => void }) => {
  // Only the selected country's methods, in the preset's order.
  const ordered = COUNTRY_PRESETS[state.country]?.paymentMethods ?? []

  const toggle = (type: Payment.Type, checked: boolean) =>
    emit({
      paymentMethods: checked
        ? ordered.filter((candidate) => candidate === type || state.paymentMethods.includes(candidate))
        : state.paymentMethods.filter((candidate) => candidate !== type),
    })

  const toggleWallet = (wallet: WalletType, checked: boolean) =>
    emit({
      wallets: checked ? [...state.wallets, wallet] : state.wallets.filter((candidate) => candidate !== wallet),
    })

  return section({
    title: 'Payment methods',
    children: [
      ...ordered.map((type) =>
        checkbox({ label: CATALOG[type]!.name, checked: state.paymentMethods.includes(type), onChange: (checked) => toggle(type, checked) }),
      ),
      el('p', { className: 'control-hint', textContent: 'Saved by the customer' }),
      checkbox({ label: 'Enrolled card (Visa ••••1111)', checked: state.enrolledCard, onChange: (enrolledCard) => emit({ enrolledCard }) }),
      el('p', { className: 'control-hint', textContent: 'Express buttons (preview only)' }),
      ...(Object.keys(WALLET_NAMES) as WalletType[]).map((wallet) =>
        checkbox({ label: WALLET_NAMES[wallet], checked: state.wallets.includes(wallet), onChange: (checked) => toggleWallet(wallet, checked) }),
      ),
    ],
  })
}

const layoutSection = ({ state, emit }: { state: PlaygroundState; emit: (patch: Patch) => void }) =>
  section({
    title: 'Settings',
    children: [
      checkbox({ label: 'Unfolded forms', checked: state.unfolded, onChange: (unfolded) => emit({ unfolded }) }),
      checkbox({ label: 'Condensed list', checked: state.condensed, onChange: (condensed) => emit({ condensed }) }),
    ],
  })

// The saved card is edited apart from CARD: it only asks for its CVV.
const ENROLLED = 'ENROLLED'
type Focus = Payment.Type | typeof ENROLLED

// Card fields first, so they're on top when Card is selected.
const CARD_KEYS: RequiredFieldKey[] = ['card_holder_name', 'security_code']

/**
 * Mirrors sdk-web verifyRequiredFields: a form-enabled method with every required field false is
 * treated as a misconfiguration and gets the SDK's default form (name, email, document, phone).
 * BLIK is the exception: it only asks for its OTP.
 */
const allFieldsOffHint = ({ state, focus }: { state: PlaygroundState; focus: Focus }) => {
  const method = focus === ENROLLED
    ? buildEnrolledCard({ state, checkoutSession: '' })
    : buildPaymentMethod({ state, type: focus, checkoutSession: '' })
  const allOff = method.type !== Payment.Type.BLIK && Object.values(method.required_fields).every((value) => !value)
  return allOff
    ? [el('p', { className: 'control-hint control-note', textContent: 'With no required fields, the SDK falls back to its default form.' })]
    : []
}

const requiredFieldsSection = ({
  state,
  emit,
  focus,
  setFocus,
}: {
  state: PlaygroundState
  emit: (patch: Patch) => void
  focus: Focus
  setFocus: (focus: Focus) => void
}) => {
  const methodSelect = select({
    label: 'Method',
    value: focus,
    options: [
      ...state.paymentMethods.map((type) => ({ value: type, label: CATALOG[type]!.name })),
      ...(state.enrolledCard ? [{ value: ENROLLED, label: 'Enrolled card' }] : []),
    ],
    onChange: (value) => setFocus(value as Focus),
  })

  if (focus === ENROLLED) {
    return section({
      title: 'Required fields',
      children: [
        methodSelect,
        checkbox({
          label: REQUIRED_FIELD_LABELS.security_code,
          checked: state.enrolledCardCvv,
          onChange: (enrolledCardCvv) => emit({ enrolledCardCvv }),
        }),
        ...allFieldsOffHint({ state, focus }),
      ],
    })
  }

  const current = resolveRequiredFields({ state, type: focus })
  const customerKeys = (Object.keys(REQUIRED_FIELD_LABELS) as RequiredFieldKey[]).filter((key) => !CARD_KEYS.includes(key))
  const keys = focus === Payment.Type.CARD ? [...CARD_KEYS, ...customerKeys] : customerKeys

  return section({
    title: 'Required fields',
    children: [
      methodSelect,
      ...keys.map((key) =>
        checkbox({
          label: REQUIRED_FIELD_LABELS[key],
          checked: current[key],
          onChange: (checked) =>
            emit({
              requiredFields: {
                ...state.requiredFields,
                [focus]: { ...state.requiredFields[focus], [key]: checked },
              },
            }),
        }),
      ),
      ...allFieldsOffHint({ state, focus }),
    ],
  })
}

const stylesSection = ({ state, emit }: { state: PlaygroundState; emit: (patch: Patch) => void }) => {
  const color = (key: keyof typeof COLOR_LABELS) => {
    const input = el('input', { type: 'color', value: state.styles[key] })
    input.addEventListener('change', () => emit({ styles: { ...state.styles, [key]: input.value } }))
    return el('label', { className: 'control-field control-color' }, [COLOR_LABELS[key], input])
  }

  return section({
    title: 'Look & feel',
    children: [
      ...(Object.keys(COLOR_LABELS) as (keyof typeof COLOR_LABELS)[]).map(color),
      select({
        label: 'Font',
        value: state.styles.fontFamily,
        options: FONTS.map((font) => ({ value: font, label: font })),
        onChange: (fontFamily) => emit({ styles: { ...state.styles, fontFamily } }),
      }),
    ],
  })
}

// Which method the required-fields editor shows; kept across redraws so an edit doesn't jump back.
let focus: Focus | undefined

export const renderControls = ({
  container,
  state,
  emit,
}: {
  container: HTMLElement
  state: PlaygroundState
  emit: (patch: Patch) => void
}) => {
  const draw = () => {
    const available = focus === ENROLLED ? state.enrolledCard : Boolean(focus && state.paymentMethods.includes(focus))
    if (!available) {
      focus = state.paymentMethods[0] ?? (state.enrolledCard ? ENROLLED : undefined)
    }

    container.replaceChildren(
      countrySection({ state, emit }),
      paymentMethodsSection({ state, emit }),
      layoutSection({ state, emit }),
      ...(focus ? [requiredFieldsSection({ state, emit, focus, setFocus: (type) => { focus = type; draw() } })] : []),
      stylesSection({ state, emit }),
    )
  }

  draw()
}
