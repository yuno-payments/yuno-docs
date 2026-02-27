---
title: Web SDK Common Reference
deprecated: false
hidden: false
metadata:
  robots: index
---
Parameters, customizations, and advanced features for all Web SDK flows. See [Quickstart guide](quickstart-guide#web-sdk-integration) and [Choose the Right Integration for You](choose-your-integration) for introductory information.

## TypeScript support

TypeScript: Yuno provides a [TypeScript library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) for all available methods.

## Subresource Integrity (SRI)

This browser security feature lets you ensure a loaded script has not been tampered with. You provide a cryptographic hash alongside the script URL; the browser verifies the downloaded bytes match the declared hash before executing the code.

* **Integrity**: Guarantees the exact code built and published is what runs in the browser.
* **Immutability**: When paired with full semantic version URLs, it ensures stable, reproducible integrations.
* **Defense-in-depth**: Mitigates risks from supply-chain or transport-layer compromise.

### URL formats

When implementing SRI, use the full semantic version URL format to ensure immutable, tamper-evident integrations.

* **Full (immutable) URL with SRI**: Full semantic version path used for locked, tamper-evident integrations with an SRI hash.
* **Partial (mutable) URL**: Version with major and minor (e.g., v1.5).  This version will receive patch improvements.  This is useful if you like to avoid updates in your code base.

### How to integrate the SDK with SRI

Replace `src` and `integrity` with the environment/version you target. `crossorigin="anonymous"` lets the browser validate the SRI for cross-origin scripts.

The hash can be found in the manifest.json file at `files.["main.js"].integrity`.

```html
<script
  src="https://sandbox.y.uno/sdk-static-bundles-ms/sdk-web/v1.5.0/main.js"
  integrity="sha384-<paste-hash-here>"
  crossorigin="anonymous"></script>
```

`src`for production is `https://sdk-web.y.uno/versions-sri.json` .

### Using NPM package

```javascript
import { loadScript } from '@yuno-payments/sdk-web'

const yuno = await loadScript({
  sri: true
})
```

### Validation notes

* Open DevTools Network tab and confirm main.js returns `200` from the full-version path.
* Verify the response headers allow cross-origin fetches for static assets if served from a distinct origin (`crossorigin="anonymous"` is set).
* Ensure the integrity attribute exactly matches the generated hash, including the sha384- prefix.
* Any change to main.js changes the hash. When changing versions, always regenerate or retrieve the new sha384 value and update the integrity attribute.

### SRI Troubleshooting

* Hash mismatchs cause the script to fail execution with an integrity error (e.g., you updated the file but not the hash). To fix, rebuild, retrieve the new sha384 from sri-manifest.json, and update integrity.

* Browser blocks SRI on cross-origin request when the crossorigin attribute is missing or CORS is restrictive. To fix, add `crossorigin="anonymous"` and configure the static hosting to allow cross-origin fetches for JS assets.

## Key parameters (checkout session creation)

When creating a checkout session on your backend, the following parameters are commonly used across web SDKs:

| Parameter            | Required | Description                                                                                                                                                                                                                                                                                                        |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `amount`             | Yes      | The primary transaction amount object containing `currency` (ISO 4217 code) and `value` (numeric amount in that currency).                                                                                                                                                                                         |
| `alternative_amount` | No       | An alternative currency representation of the transaction amount with the same structure as `amount` (`currency` and `value`). Useful for multi-currency scenarios, such as displaying prices to customers in their preferred currency (e.g., USD) while processing the payment in the local currency (e.g., COP). |

## Payment and checkout parameters (full reference)

Parameters for `yuno.startCheckout`, `yuno.mountCheckout` (Seamless), and related payment flows. All parameters used in [Payment flows (Web)](payment-flows-web) are listed here with full detail.

### Core parameters

| Parameter           | Type    | Required | Description                                                                                                                                                                                                                                                        |
| ------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `checkoutSession`   | string  | Yes      | Checkout session ID returned from your backend (Create checkout session API). Required for all payment flows.                                                                                                                                                      |
| `elementSelector`   | string  | No*      | CSS selector for the element where the SDK mounts (e.g. `#root`). Deprecated when used alone; prefer `renderMode.elementSelector` object to control APM and action areas independently. *Required when `renderMode.type` is `'element'` and using the object form. |
| `countryCode`       | string  | Yes      | ISO country code where the payment runs (e.g. `FR`, `US`). Determines available payment methods and compliance.                                                                                                                                                    |
| `language`          | string  | No       | Language code for the UI (e.g. `fr-FR`, `en-US`). Defaults to browser language when available. See [Supported languages](languages-supported).                                                                                                                     |
| `showLoading`       | boolean | No       | When `true`, shows the SDK loading spinner. Default `true`. Remains visible until `hideLoader()` or `continuePayment()` is called.                                                                                                                                 |
| `showPaymentStatus` | boolean | No       | When `true`, shows the payment result screen after the flow completes. Optional.                                                                                                                                                                                   |
| `issuersFormEnable` | boolean | No       | When `true`, shows the issuer (bank) list form. Default `true` in source. Optional.                                                                                                                                                                                |

### Callbacks

| Parameter                         | Type     | Required | Description                                                                                                                                                                                               |
| --------------------------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yunoCreatePayment(oneTimeToken)` | function | Yes      | Callback invoked when the user completes the card/APM step. Receive the one-time token; send it to your backend to create the payment via the API; then call `yuno.continuePayment()` to resume the flow. |
| `yunoPaymentResult(status)`       | function | No       | Callback invoked when the payment flow finishes. Receives the [payment status](ref:payment) (e.g. `SUCCEEDED`, `DECLINED`, `PENDING`, `REJECTED`, `CANCELED`, `ERROR`). Use for UI updates or analytics.  |
| `yunoError(message, data)`        | function | No       | Callback invoked when an error occurs during the flow. Receives an error message and optional data object for debugging.                                                                                  |
| `onLoading`                       | function | No       | Callback invoked when loading state changes (e.g. SDK fetching config, processing payment). Use to show or hide your own loader.                                                                          |

### Card form options (`card`)

| Parameter                         | Type     | Required | Description                                                                                                                                                                                                 |
| --------------------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `card.type`                       | string   | No       | Layout type for the card form. Options: `'step'` or `'extends'`. Affects how the form is displayed in the checkout.                                                                                         |
| `card.styles`                     | string   | No       | Custom CSS string injected into the iframe to style the card form. Use to match your brand.                                                                                                                 |
| `card.cardSaveEnable`             | boolean  | No       | When `true`, shows a checkbox to save or enroll the card for future use. Default `false`. Requires backend support for vaulting.                                                                            |
| `card.texts`                      | object   | No       | Custom text for card form buttons and labels. Keys depend on SDK version (e.g. placeholders, button labels).                                                                                                |
| `card.cardNumberPlaceholder`      | string   | No       | Placeholder text for the card number field. Supports alphanumeric, spaces, UTF-8. Default `"Card number"` if not set. Does not affect formatting, masking, BIN logic, or validation.                        |
| `card.hideCardholderName`         | boolean  | No       | When `true`, hides the cardholder name field. Default `false`. Hiding does not affect PAN, expiry, CVV, BIN logic, or 3DS/provider validations.                                                             |
| `card.onChange`                   | function | No       | Callback when card form state changes (loading, completed, network selected, reset). Receives `{ error, data }`; `data` can include IIN/BIN and instalment options. Use BIN for real-time tax calculations. |
| `card.isCreditCardProcessingOnly` | boolean  | No       | When `true`, forces card transactions to process as credit only. Useful where the card can act as both credit and debit.                                                                                    |

### Render mode

| Parameter                    | Type   | Required | Description                                                                                                                                                                           |
| ---------------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `renderMode`                 | object | No       | Controls how payment forms are displayed. Omit to use defaults.                                                                                                                       |
| `renderMode.type`            | string | No       | `'modal'` (default) or `'element'`. Modal shows forms in an overlay; element embeds in the given DOM element.                                                                         |
| `renderMode.elementSelector` | object | No*      | Required if `type` is `'element'`. Provide `apmForm` (selector where APM UI is rendered) and `actionForm` (selector for button/area that opens provider-specific steps, e.g. PIX QR). |

### Seamless (payment Web) only

| Parameter           | Type   | Required | Description                                                                                                          |
| ------------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `vaultedToken`      | string | No       | Saved payment method token for one-click or saved-card payment. Pass when reusing a previously enrolled card.        |
| `paymentMethodType` | string | No       | Type of payment method to mount when using Seamless (e.g. card, APM). Determines which form or provider UI is shown. |

### Custom texts

| Parameter | Type   | Required | Description                                                                                                                                                         |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `texts`   | object | No       | Custom text for payment form buttons and labels (e.g. `customerForm.submitButton`, `paymentOtp.sendOtpButton`). Use to match your application language or branding. |

## Enrollment parameters (full reference)

Parameters for `yuno.mountEnrollmentLite` and `yuno.mountEnrollmentHeadless`. All parameters used in [Enrollment flows (Web)](enrollment-flows-web) are listed here with full detail.

| Parameter              | Type     | Required | Description                                                                                                                                                                                                                                     |
| ---------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customerSession`      | string   | Yes      | Customer session ID from your backend (Create customer session API). Required. Associates the enrolled payment method with a specific customer.                                                                                                 |
| `countryCode`          | string   | Yes      | ISO country code (e.g. `US`, `BR`). Determines available enrollment options. See [Country coverage](country-coverage).                                                                                                                          |
| `language`             | string   | No       | Language code for the UI (e.g. `en`, `en-US`). Defaults to browser language when available.                                                                                                                                                     |
| `showLoading`          | boolean  | No       | When `true`, shows the loading spinner during enrollment. Default `true`.                                                                                                                                                                       |
| `onLoading`            | function | No       | Callback when loading state changes during enrollment.                                                                                                                                                                                          |
| `elementSelector`      | string   | No       | CSS selector where the enrollment form mounts. Required when not using default modal behavior.                                                                                                                                                  |
| `card`                 | object   | No       | Card form options (same structure as payment flows: `type`, `styles`, `texts`, `hideCardholderName`, `onChange`, `isCreditCardProcessingOnly`, etc.).                                                                                           |
| `yunoEnrollmentStatus` | function | No       | Callback when enrollment ends. Receives `vaultedToken` and `status`. Status values: `CREATED`, `EXPIRED`, `REJECTED`, `READY_TO_ENROLL`, `ENROLL_IN_PROCESS`, `UNENROLL_IN_PROCESS`, `ENROLLED`, `DECLINED`, `CANCELED`, `ERROR`, `UNENROLLED`. |
| `issuersFormEnable`    | boolean  | No       | When `true`, shows the issuer (bank) list form. Optional.                                                                                                                                                                                       |
| `texts`                | object   | No       | Custom text for enrollment form buttons and labels.                                                                                                                                                                                             |

## Mount external buttons

Use the `mountExternalButtons` method to render PayPal, Google Pay, and Apple Pay buttons in custom locations within your UI. This gives you control over where these buttons are displayed.

```javascript
await yuno.mountExternalButtons([
  {
    paymentMethodType: 'APPLE_PAY',
    elementSelector: '#apple-pay',
  },
  {
    paymentMethodType: 'GOOGLE_PAY',
    elementSelector: '#google-pay',
  },
  {
    paymentMethodType: 'PAYPAL',
    elementSelector: '#paypal',
  },
]);
```

### Parameters

| Parameter           | Description                                                                                                    |
| :------------------ | :------------------------------------------------------------------------------------------------------------- |
| `paymentMethodType` | The payment method type. Must be `'APPLE_PAY'`, `'GOOGLE_PAY'`, or `'PAYPAL'`.                                 |
| `elementSelector`   | The CSS selector for the HTML element where the button should be rendered (e.g., `'#apple-pay'`, `'.button'`). |

### Unmounting buttons

You can unmount a single external button by payment method type:

```javascript
yuno.unmountExternalButton('APPLE_PAY');
```

Or unmount all external buttons at once:

```javascript
yuno.unmountAllExternalButtons();
```

## Enrolling payment methods

You can enroll payment methods (store cards for future use) directly during the payment flow by setting `payment_method.vault_on_success = true` in the [checkout session creation](https://docs.y.uno/reference/the-checkout-session-object).

When `vault_on_success` is set to `true`:

* The payment method will be automatically enrolled if the payment status is `SUCCEEDED`
* If the payment does not succeed, no vaulting will occur
* The payment response will include a `vaulted_token` that you can use for future transactions

**Example**:

```json
{
    "account_id": "...",
    ...
    "payment_method": {
        "vault_on_success": true
    }
}
```

To generate and receive a `vaulted_token` when `vault_on_success = true`, the payment must reference an existing Yuno customer through `customer_payer.id` in the checkout session. Creating or sending the customer data inline inside the payment request does not create the customer on our side, so no vaulting will occur.

For enrollment flows, see [Enrollment flows (Web)](enrollment-flows-web).
