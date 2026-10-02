import { WALLET_NAMES } from './catalog'
import type { WalletType } from './types'

/**
 * Express buttons need real merchant credentials, certificates and the wallets'
 * own scripts, so the SDK cannot render them here. The page draws inert look-alikes
 * instead; the SDK is never asked to mount them.
 */
const WALLET_STYLES: Record<WalletType, { background: string; color: string }> = {
  GOOGLE_PAY: { background: '#000000', color: '#FFFFFF' },
  APPLE_PAY: { background: '#000000', color: '#FFFFFF' },
  PAYPAL: { background: '#FFC439', color: '#003087' },
}

export const renderWalletPlaceholders = ({
  container,
  wallets,
  radius,
}: {
  container: HTMLElement
  wallets: WalletType[]
  radius: number
}) => {
  container.replaceChildren(
    ...wallets.map((wallet) => {
      const style = WALLET_STYLES[wallet]
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'wallet-placeholder'
      button.textContent = WALLET_NAMES[wallet]
      button.title = `${WALLET_NAMES[wallet]} — preview only, needs real merchant credentials`
      button.setAttribute('aria-label', `${WALLET_NAMES[wallet]} (preview only)`)
      button.style.background = style.background
      button.style.color = style.color
      button.style.borderRadius = `${radius}px`
      button.addEventListener('click', () => {
        button.dataset.flash = 'true'
        window.setTimeout(() => delete button.dataset.flash, 1200)
      })
      return button
    }),
  )
  container.hidden = wallets.length === 0
}
