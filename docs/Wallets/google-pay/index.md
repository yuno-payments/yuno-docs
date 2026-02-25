---
title: Google Pay™
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    Integrate Google Pay with Yuno to accept wallet payments. Choose from three
    integration options: direct, via Yuno SDK, or through a payment provider.
  robots: index
next:
  description: ''
---
Google Pay™ is a digital wallet that lets customers pay using credit and debit cards stored in their Google account or on their Android device. Instead of sharing card details with the merchant, Google Pay generates a secure token that represents the payment information, protecting customer data throughout the transaction.

Yuno supports Google Pay for **card payments** and **PIX payments** (Brazil only).

## How Google Pay works with Yuno

1. The customer selects Google Pay at checkout.
2. Google Pay returns an encrypted payment token containing the customer's payment credentials.
3. The token is sent to Yuno (directly or through a provider) for processing.
4. Yuno decrypts and routes the payment to your configured payment processor.

## Integration options

Yuno provides three ways to add Google Pay to your checkout. Choose the option that best fits your architecture:

### Yuno SDK

Yuno's SDK handles the complete Google Pay flow, including displaying the Google Pay button, managing the payment sheet, and processing the token. You integrate Yuno's SDK into your app, and Yuno takes care of the Google Pay interaction.

**Workflow:** `SDK_CHECKOUT`

<YunoCard title="SDK integration guide" href="google-pay-sdk-integration">
  Integrate Google Pay using Yuno's SDK for the fastest setup.
</YunoCard>

### Direct

You integrate directly with the Google Pay API on your frontend, obtain the payment token from Google, and pass it to Yuno's API. This gives you full control over the Google Pay experience while Yuno handles the backend payment processing.

**Workflow:** `DIRECT`

<YunoCard title="Direct integration guide" href="google-pay-direct-integration">
  Integrate directly with Google Pay and pass the token to Yuno.
</YunoCard>

### Via provider

The Google Pay integration is handled entirely by your payment provider (e.g., Adyen, Cielo). Yuno routes the transaction to the provider, which manages the Google Pay token processing. This is ideal if you are already using a provider's Google Pay solution.

<YunoCard title="Provider integration guide" href="integration-via-provider-google-pay">
  Use your payment provider's Google Pay integration with Yuno.
</YunoCard>

## Google Pay with PIX

In Brazil, Yuno supports Google Pay as a payment method for PIX transactions. Customers select Google Pay at checkout and complete the payment through PIX, combining the convenience of Google Pay with Brazil's instant payment system.

<YunoCard title="Google Pay with PIX" href="google-pay-with-pix">
  Learn how to accept PIX payments through Google Pay in Brazil.
</YunoCard>

## Supported card networks

| Region | Supported networks |
|---|---|
| Global | Visa, Mastercard, American Express, Discover, JCB |
| Brazil | Visa, Electron, Mastercard, Maestro, Elo, Elo Debit |

## Authorization methods

Yuno supports both Google Pay API authorization methods:

- **`PAN_ONLY`**: Card credentials stored in the user's Google account. When used, Yuno automatically handles 3D Secure authentication if enabled.
- **`CRYPTOGRAM_3DS`**: Device-based card credentials (from Android devices with NFC) that include built-in cryptographic authentication. No additional 3DS processing is required.

Include both methods in your `allowedAuthMethods` array for maximum payment success rates.

## Requirements

Before integrating Google Pay:

1. Verify Google Pay is available in your operating countries using the [Google Pay support page](https://support.google.com/googlepay/answer/12429287?hl=en).
2. Review [participating processors](https://developers.google.com/pay/api/) on Google's site.
3. Comply with the Google Pay APIs [Acceptable Use Policy](https://payments.developers.google.com/terms/aup) and [Terms of Service](https://payments.developers.google.com/terms/sellertos).

## Capabilities and limitations

### By integration model

| Capability | Yuno SDK | Direct | Via provider |
|---|---|---|---|
| Card payments via Google Pay | Yes | Yes | Yes (if provider supports) |
| PIX via Google Pay (Brazil) | Yes (if configured) | Yes (if configured) | Depends on provider |
| Control over Google Pay UI | Medium (SDK options) | Full (merchant-managed) | Low (provider-controlled) |
| Responsibility for Google compliance | Yuno | Merchant | Provider |
| Frontend implementation effort | Minimal | Significant | Minimal |

### Cards vs PIX behavior

| Behavior | Google Pay + Cards | Google Pay + PIX |
|---|---|---|
| Processing | Usually synchronous | Asynchronous |
| Statuses | `SUCCEEDED` / `DECLINED` | `PENDING` / `SUCCEEDED` / `EXPIRED` |
| Settlement | Depends on acquirer | Instant (PIX network) |
| Requires QR code display | No | Possibly, depending on flow |
| Recurring payments | Supported via vaulted tokens | Not supported |
| Currency | Multiple | BRL only |
| Availability | Global | Brazil only |

## FAQ

**Do I have to integrate with Google Pay directly?**

No. You can use Yuno's SDK (where Yuno handles the Google Pay interaction) or a provider's integration (where the provider handles it). Direct integration is only necessary if you want full control over the Google Pay setup, UX, and compliance.

**Is Google Pay a card payment or a wallet payment?**

Google Pay is a wallet that typically carries cards. In Yuno, it is modeled as a wallet payment method (`payment_method.type = GOOGLE_PAY`). For PIX payments through Google Pay in Brazil, use `payment_method.type = GOOGLE_PAY_PIX` instead. Yuno handles routing to the appropriate processor in both cases.

**How do I enable Google Pay with PIX?**

1. Confirm with your Yuno account manager that Google Pay PIX is available for your organization. It is currently supported through Adyen, Santander, and Itau.
2. Set up a provider connection in your Yuno dashboard.
3. Use `payment_method.type = GOOGLE_PAY_PIX` in your payment requests with country `BR` and currency `BRL`. See [Google Pay with PIX](doc:google-pay-with-pix) for the full integration guide.

**What happens if a customer closes the Google Pay or PIX screen without completing the payment?**

The frontend/SDK reports that the user left the flow, but the payment remains in `PENDING` status on the backend. The PIX reference is still valid and the customer can complete the transfer from their bank app. The payment only expires when the PIX deadline is reached. See [Handling user cancellation](doc:google-pay-with-pix#handling-user-cancellation) for implementation guidance.

## Additional resources

- [Google Pay Web documentation](https://developers.google.com/pay/api/web/guides/setup) | [Integration checklist](https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist)
- [Google Pay Android documentation](https://developers.google.com/pay/api/android/overview) | [Integration checklist](https://developers.google.com/pay/api/android/guides/test-and-deploy/integration-checklist)
- [Google Pay Web brand guidelines](https://developers.google.com/pay/api/web/guides/brand-guidelines) | [Android brand guidelines](https://developers.google.com/pay/api/android/guides/brand-guidelines)
