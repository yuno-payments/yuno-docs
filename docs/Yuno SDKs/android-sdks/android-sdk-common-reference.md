---
title: Android SDK Common Reference
deprecated: false
hidden: false
metadata:
  robots: index
---

Parameters, customizations, and advanced features for all Android SDK flows. Setup: [Payment flows (Android)](payment-flows-android), [Enrollment flows (Android)](enrollment-flows-android), [integration modes](choose-your-integration).

## Key parameters (checkout session creation)

When creating a checkout session on your backend for payment flows, the following parameters are commonly used across Android SDKs:

| Parameter            | Required | Description                                                                                                                                                                                                                                                                                                        |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `amount`             | Yes      | The primary transaction amount object containing `currency` (ISO 4217 code) and `value` (numeric amount in that currency).                                                                                                                                                                                         |
| `alternative_amount` | No       | An alternative currency representation of the transaction amount with the same structure as `amount` (`currency` and `value`). Useful for multi-currency scenarios, such as displaying prices to customers in their preferred currency (e.g., USD) while processing the payment in the local currency (e.g., COP). |

## Payment parameters (full reference)

Parameters for payment flows (Full, Seamless, Lite, Headless). All parameters used in [Payment flows (Android)](payment-flows-android) are listed here with full detail.

| Parameter               | Type     | Required | Description                                                                                                                                                                                                                                                                 |
| ----------------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`       | string   | Yes      | Checkout session ID from your backend (Create checkout session API). Required for all payment flows.                                                                                                                                                                         |
| `countryCode`           | string   | Yes      | ISO country code where the payment runs (e.g. `US`, `BR`). Determines available payment methods and compliance.                                                                                                                                                            |
| `callbackPaymentState`| function | No       | Callback invoked when the payment state changes. Receives the current state: e.g. `SUCCEEDED`, `FAIL`, `PROCESSING`, `REJECT`. Use for UI updates, analytics, or navigation.                                                                                                  |
| `merchantSessionId`     | string   | No       | Optional merchant session identifier. Use to correlate the SDK session with your own session or order ID.                                                                                                                                                                   |

## YunoConfig options (initialize)

Runtime behavior and appearance are configured via the `YunoConfig` data class when calling `Yuno.initialize(context, publicApiKey, config)`. All parameters used across Android payment and enrollment flows are listed below. For visual styling (fonts, colors, buttons), see [SDK customizations (Android)](android-customizations).

| Parameter          | Type    | Required | Description                                                                                                                                                                                                                                                                 |
| ------------------ | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cardFlow`         | enum    | No       | Configures the card flow behavior (e.g. form deployment, validation). See flow-specific docs for allowed values.                                                                                                                                                            |
| `saveCardEnabled`  | boolean | No       | When `true`, allows the user to save or enroll the card during payment. Requires backend support for vaulting (e.g. `payment_method.vault_on_success` in checkout session).                                                                                               |
| `cardFormDeployed` | boolean | No       | When `true`, the card form is deployed in a specific way (e.g. embedded vs modal). Behavior may vary by SDK version.                                                                                                                                                        |
| `language`         | string  | No       | Language code for the SDK UI (e.g. `en`, `es`). Use a code from [Supported languages](languages-supported) when available.                                                                                                                                                   |
| `styles`           | object  | No       | Custom styles applied to SDK UI elements. Define in your app's styles and reference here, or use theme overrides. See [SDK customizations (Android)](android-customizations) for font, button, and color options.                                                       |
| `placeholders`    | object  | No       | Custom placeholder text for form fields (e.g. card number, cardholder name). Keys depend on SDK version.                                                                                                                                                                      |

## Enrollment parameters (full reference)

Parameters for enrollment flows (Lite, Headless). All parameters used in [Enrollment flows (Android)](enrollment-flows-android) are listed here with full detail.

| Parameter                | Type     | Required | Description                                                                                                                                                                                                                                                                 |
| ------------------------ | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customerSession`        | string   | Yes      | Customer session ID from Create customer session API. Required. Associates the enrolled payment method with a specific customer.                                                                                                                                             |
| `countryCode`            | string   | Yes      | ISO country code (e.g. `US`, `BR`). Required for enrollment.                                                                                                                                                                                                                 |
| `showEnrollmentStatus`   | boolean  | No       | When `true`, shows the enrollment result screen after the flow. Default `true`. Set to `false` to handle result only via callback.                                                                                                                                          |
| `callbackEnrollmentState`| function | No       | Callback invoked when enrollment state changes. Requires registering `initEnrollment` in your Activity's `onCreate` (or equivalent) so the SDK can deliver results. Optional when using `onActivityResult` with `requestCode`.                                               |
| `requestCode`            | int      | No       | Optional request code used when capturing the enrollment result via `onActivityResult`. Use when you prefer activity-result flow over callbacks.                                                                                                                              |
| `country_code`           | string   | No*      | (Headless) Country for the enrollment. Required for `apiClientEnroll`-style Headless enrollment.                                                                                                                                                                          |
| `customer_session`       | string   | No*      | (Headless) Customer session ID. Required for `apiClientEnroll`-style Headless enrollment.                                                                                                                                                                                  |

## Enrolling payment methods

You can enroll payment methods (store cards for future use) during the payment flow or via dedicated enrollment flows. For payment flows, enable save card in `YunoConfig` and set `payment_method.vault_on_success` (or equivalent) when creating the checkout session where supported. For dedicated enrollment, see [Enrollment flows (Android)](enrollment-flows-android).
