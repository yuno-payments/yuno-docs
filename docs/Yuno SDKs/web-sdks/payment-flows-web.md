---
title: Payment Flows
deprecated: false
hidden: false
metadata:
  robots: index
---
The Web SDK makes it easy to integrate payment flows into your web and browser-based experiences.

## Additional resources

* Yuno offers a [TypeScript library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) that complements the SDK.
* See [Choose the right integration for you](choose-your-integration) if you're unsure which flow to follow.
* See the [Demo App](https://github.com/yuno-payments/yuno-sdk-web) for a complete implementation (clone from the repository).

## Requirements

* A [customer](ref:create-customer) created in Yuno and a [checkout session](ref:create-checkout-session): reference each API when setting up your backend.
* Public API key (obtain from the [Yuno Dashboard](https://dashboard.y.uno/) → **Developers** > **Credentials**)

## Include the library in your project

<Callout icon="📘" theme="info">
  The web SDK supports Subresource Integrity (SRI), see the [common reference](doc:web-sdk-common-reference#subresource-integrity-sri) for details.
</Callout>

The first step is always including the library in your project; this step is performed regardless of which integration type you choose. The integration guide provides three flexible methods:

1. **Direct HTML script inclusion**: Add the script tag to your page.
2. **Dynamic JavaScript injection**: Load the SDK at runtime.
3. **NPM module installation**: Install via npm (recommended).

**Option 1: NPM (Recommended)**

```bash
npm install @yuno-payments/sdk-web
```

**Option 2: HTML Script Tag**

```html
<script src="https://sdk-web.y.uno/v1.5/main.js"></script>
```

**Option 3: Dynamic JavaScript**

```javascript
const script = document.createElement('script');
script.src = 'https://sdk-web.y.uno/v1.5/main.js';
document.head.appendChild(script);
```

Once Step 1 is complete, continue with your desired integration.

### Basic flows

* [Full (Web)](#full-web): Complete control with backend support and full customization options
* [Seamless (payment Web)](#seamless-payment-web): Fastest integration with pre-built UI components

### Advanced flows

* [Lite (Web)](#lite-web): Lightweight integration allowing you to control the UI and payment methods list, as well as backend support
* [Headless (Web)](#headless-web): Full checkout experience customization without requiring PCI compliance

## Parameters

These are the parameters covered in this guide. For the full list of parameters and callbacks, see the [Web SDK Common Reference](web-sdk-common-reference).

| Parameter                         | Description                                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`                 | Checkout session ID from your backend (Create checkout session API). Required for all flows.                  |
| `elementSelector`                 | CSS selector for the element where the SDK mounts (e.g. `#root`).                                             |
| `countryCode`                     | ISO country code where the payment runs (e.g. `FR`, `US`).                                                    |
| `language`                        | Language code for the UI (e.g. `fr-FR`). Optional; defaults to browser language when available.               |
| `showLoading`                     | Show SDK loading spinner. Optional.                                                                           |
| `showPaymentStatus`               | Show payment result screen. Optional.                                                                         |
| `yunoCreatePayment(oneTimeToken)` | Callback: send one-time token to your backend to create the payment; then call `yuno.continuePayment()`.      |
| `yunoPaymentResult(status)`       | Callback: payment finished. Receives [payment status](ref:payment) (e.g. `SUCCEEDED`, `DECLINED`, `PENDING`). |
| `yunoError(message, data)`        | Callback: error during the flow.                                                                              |
| `onLoading`                       | Callback: loading state updates.                                                                              |
| `card`                            | Card form options (e.g. `onChange`, `isCreditCardProcessingOnly`). Optional.                                  |
| `vaultedToken`                    | (Seamless) Saved payment method token for one-click payment. Optional.                                        |
| `paymentMethodType`               | (Seamless) Type of payment method to mount.                                                                   |

## Full (Web)

Implement Yuno's Full integration: pre-built checkout UI with full control over branding, forms, and flow. Use this when you want Yuno to render the checkout experience while you manage customer and checkout session creation on your backend.

### Step 1: Include the library in your project

Follow the steps in [Include the library in your project](#include-the-library-in-your-project) above.

### Step 2: Initialize the SDK

After including the library ([step 1](#step-1-include-the-library-in-your-project)), initialize the SDK. See [Quickstart guide](quickstart-guide#web-sdk-integration) for initialization.

### Step 3: Start the checkout process

Use the `yuno.startCheckout` function to start the checkout process with the necessary parameters.

See [Parameters](#parameters) for all options. For styling, themes, and additional configurations, see [SDK customizations](sdk-customizations-web).

```javascript
yuno.startCheckout({
  checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
  elementSelector: "#root",
  countryCode: "FR",
  language: "fr-FR",
  showLoading: true,
  issuersFormEnable: true,
  showPaymentStatus: true,
  card: {
    isCreditCardProcessingOnly: true,
    onChange: ({ error, data }) => {
      if (error) {
        console.log('Card form error:', error);
      } else {
        console.log('Card form data:', data);
      }
    },
  },
  onLoading: (args) => {
    console.log(args);
  },
  yunoPaymentMethodSelected: () => {
    console.log("Payment method selected");
  },
  yunoPaymentResult: (status) => {
    console.log("Payment result:", status);
  },
  yunoError: (message, data) => {
    console.error("Payment error:", message, data);
  },
  async yunoCreatePayment(oneTimeToken) {
    await createPayment({ oneTimeToken, checkoutSession });
    yuno.continuePayment({ showPaymentStatus: true });
  },
});
```

By default, Yuno SDK renders as a modal. You can specify the element where the SDK will render. See [Render mode](#render-mode) for details.

For all APMs (Google Pay, Apple Pay, PayPal), `onPaymentMethodSelected` triggers when the customer chooses the payment method (before the payment flow begins). Define `onPaymentMethodSelected` in `startCheckout` before `mountCheckout`. For PayPal, the payment sheet opens immediately after selection—no extra confirmation click required.

### Step 4: Mount the SDK

Display the payment methods:

```javascript
yuno.mountCheckout();
```

Alternatively, mount with a default payment method selected:

```javascript
yuno.mountCheckout({
  paymentMethodType: PAYMENT_METHOD_TYPE,
  vaultedToken: VAULTED_TOKEN,
});
```

### Step 5: Initiate the payment process

Call `yuno.startPayment()` to initiate the payment flow after the user selects a payment method:

```javascript
const PayButton = document.querySelector("#button-pay");

PayButton.addEventListener("click", () => {
  yuno.startPayment();
});
```

### Step 6: Get the OTT (one-time token)

After the customer fills out the requested data in Yuno's payment forms, the SDK provides the one-time token. The configuration function `yunoCreatePayment(oneTimeToken)` is then triggered with the one-time token.

```javascript
yunoCreatePayment(oneTimeToken);
```

You can also use `tokenWithInformation` to receive additional information provided by the customer in the checkout, such as installments or document type/number:

```javascript
yunoCreatePayment(oneTimeToken, tokenWithInformation);
```

Use Yuno's default loader or implement your own with the required configuration.

### Step 7: Create the payment

Create a payment using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant's backend should call this endpoint to create the payment in Yuno using the one-time token and checkout session.

After Step 6, the basic payment flow is implemented. Test using the checkout session and one-time token. For additional features, see [Complementary features](#complementary-features).

**Required**: After creating a payment, integrate the `continuePayment` method. When the API response sets `sdk_action_required` to `true`, call `yuno.continuePayment()` to present the necessary screens.

### `continuePayment` return value or null

For payment methods that require merchant-side action (e.g., when the payment provider requires a redirect URL in a webview), the `await yuno.continuePayment()` method returns either an object with the following structure or null:

```typescript
{
  action: 'REDIRECT_URL'
  type: string
  redirect: {
    init_url: string
    success_url: string
    error_url: string
  }
} | null
```

When the method returns an object, you can handle your application's payment flows that require custom redirect handling. When it returns null, no additional merchant-side action is needed.

### Complementary features

For styling, themes, form options, and additional configurations, see [SDK customizations](sdk-customizations-web). [Changelog](https://docs.y.uno/changelog/web-sdk-v13-changelog).

## Seamless (payment Web)

Implement Yuno's Seamless integration. Recommended for pre-built UI.

![Seamless (payment Web) screenshot](https://files.readme.io/bb2c987a467228d113d98035f453a459aedfb41554aad3eb49fc50fed8dbf0a0-Screenshot_2025-06-04_at_10.45.05_AM.png)

### Step 1: Include the library in your project

Follow the steps in [Include the library in your project](#include-the-library-in-your-project) above.

### Step 2: Initialize the SDK

See [Quickstart guide](quickstart-guide#web-sdk-integration) for initialization.

### Step 3: Create a checkout session

Create a `checkout_session` using the [Create checkout session](ref:create-checkout-session) endpoint. If your workflow requires sending the `additional_data` object, include it in the checkout session.

* [Create a customer](ref:create-customer) or retrieve an existing customer ID
* Include it when creating the `checkout_session`

To control authorization and capture with cards, include `payment_method.detail.card.capture` in the checkout session: set `false` to authorize only, `true` to capture immediately. See [Parameters](#parameters).

For all APMs (Google Pay, Apple Pay, PayPal), `onPaymentMethodSelected` triggers when the customer chooses the payment method (before the payment flow begins). Define `onPaymentMethodSelected` in `startSeamlessCheckout` before `mountSeamlessCheckout`.

### Step 4: Start the checkout process

Use the configuration below:

```javascript
yuno.startSeamlessCheckout({
  checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
  elementSelector: "#root",
  countryCode: "US",
  language: "en-US",
  showLoading: true,
  issuersFormEnable: true,
  showPaymentStatus: true,
  onLoading: (args) => console.log(args),
  renderMode: {
    type: "modal",
    elementSelector: {
      apmForm: "#form-element",
      actionForm: "#action-form-element",
    },
  },
  card: {
    type: "extends",
    styles: "",
    cardSaveEnable: false,
    texts: {},
    cardNumberPlaceholder: "Enter card number", // Optional: Custom placeholder text
    hideCardholderName: false, // Optional: Set to true to hide cardholder name field
  },
  texts: {},
  async yunoCreatePayment(oneTimeToken, tokenWithInformation) {
    await createPayment({ 
      oneTimeToken, 
      checkoutSession,
      vault_on_success: true 
    });
    yuno.continuePayment({ showPaymentStatus: true });
  },
  yunoPaymentMethodSelected(data) {
    console.log("Payment method selected:", data);
  },
  yunoPaymentResult(data) {
    console.log("Payment result:", data);
    yuno.hideLoader();
  },
  yunoError(error, data) {
    console.error("An error occurred:", error);
    yuno.hideLoader();
  },
});
```

When using `startSeamlessCheckout`, specify the callbacks to handle payments. See [Parameters](#parameters) for all options.

Payments can be customer-initiated (CIT) or merchant-initiated (MIT). See [Stored credentials](stored-credentials) for details. Sections below cover customer-initiated transactions (one-time; no recurrence).

### Step 5: Mount the SDK

To present the checkout process based on the selected payment method, use the `yuno.mountSeamlessCheckout()` function. This step ensures the SDK is properly mounted on your chosen HTML element.

```javascript
yuno.mountSeamlessCheckout({
  paymentMethodType: PAYMENT_METHOD_TYPE,
  vaultedToken: VAULTED_TOKEN,
});
```

See the [Payment type](ref:payment-type-list) page to view the complete list of payment method types you can use when mounting the SDK.

The `vaultedToken` is optional. It represents a previously enrolled payment method. If you provide the `vaultedToken`, the user will not be required to provide the payment information again since it was provided in a previous transaction.

After mounting, you must start the checkout flow by calling `yuno.startPayment()`. If you skip this call, the payment form will not open.

### Step 6: Start the payment flow (Required)

Call `yuno.startPayment()` immediately after `yuno.mountSeamlessCheckout()` to open the selected payment method UI:

```javascript
yuno.mountSeamlessCheckout({
  paymentMethodType: PAYMENT_METHOD_TYPE,
  vaultedToken: VAULTED_TOKEN,
});

yuno.startPayment();
```

Alternatively, you can trigger the start from a user action such as a button click:

```javascript
const payButton = document.querySelector('#button-pay');
payButton.addEventListener('click', () => {
  yuno.startPayment();
});
```

See the [Demo App](https://github.com/yuno-payments/yuno-sdk-web) for a complete implementation (clone from the repository).

### Mount external buttons

You can use the `mountExternalButtons` method to render Google Pay and Apple Pay buttons in custom locations within your UI. This gives you control over where these buttons are displayed.

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
]);
```

**Options**: `paymentMethodType`: `'APPLE_PAY'` or `'GOOGLE_PAY'`; `elementSelector`: CSS selector for the button container.

#### Unmounting buttons

You can unmount a single external button by payment method type:

```javascript
yuno.unmountExternalButton('APPLE_PAY');
```

Or unmount all external buttons at once:

```javascript
yuno.unmountAllExternalButtons();
```

### Enrolling payment methods in seamless flow

You can enroll payment methods (store cards for future use) directly during the seamless payment flow by setting `payment_method.vault_on_success = true` in the [checkout session creation](https://docs.y.uno/reference/create-checkout-session).

When `vault_on_success` is set to `true`:

* The payment method will be automatically enrolled if the payment status is `SUCCEEDED`
* If the payment does not succeed, no vaulting will occur
* The payment response will include a `vaulted_token` that you can use for future transactions

Example:

```json
{
    "account_id": "...",
    ...
    "payment_method": {
        "vault_on_success": true
    }
}
```

To generate a `vaulted_token` when `vault_on_success = true`, the payment must reference an existing Yuno customer through `customer_payer.id` in the checkout session. Inline customer data in the payment request does not create the customer, so no vaulting occurs.

For more information about enrolling payment methods, see [Enroll Payment Methods](doc:enroll-payment-methods).

## Lite (Web)

Implement Yuno's Lite integration.

### Step 1: Include the library in your project

Follow the steps in [Include the library in your project](#include-the-library-in-your-project) above.

### Step 2: Initialize the SDK

See [Quickstart guide](quickstart-guide#web-sdk-integration) for initialization.

### Step 3: Start the checkout process

Use the `yuno.startCheckout` function with the necessary parameters. See [Parameters](#parameters). For optional parameters and configurations, see [SDK customizations](sdk-customizations-web).

```javascript
yuno.startCheckout({
  checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
  elementSelector: "#root",
  countryCode: "FR",
  language: "fr-FR",
  showLoading: true,
  issuersFormEnable: true,
  showPaymentStatus: true,
  card: {
    isCreditCardProcessingOnly: true,
    onChange: ({ error, data }) => {
      if (error) {
        console.log('Card form error:', error);
      } else {
        console.log('Card form data:', data);
      }
    },
  },
  onLoading: (args) => {
    console.log(args);
  },
  async yunoCreatePayment(oneTimeToken) {
    /**
     * The createPayment function calls the backend to create a payment in Yuno.
     * It uses the following endpoint https://docs.y.uno/reference/create-payment
     */
    await createPayment({ oneTimeToken, checkoutSession });
    yuno.continuePayment({ showPaymentStatus: true });
  },
});
```

Payments can be initiated by the customer (CIT) or merchant (MIT). See [Stored credentials](stored-credentials) for details.

### Step 4: Mount the SDK

Mount the SDK for the selected payment method. You are responsible for displaying payment methods and capturing the customer's selection. See [Lite (Web)](#lite-web) above.

Use the `yuno.mountCheckoutLite()` function by selecting an HTML element and using a valid CSS selector (`#`, `.`, `[data-*]`) to display the checkout for the selected payment method.

```javascript
yuno.mountCheckoutLite({
  /**
   * can be one of 'PAYPAL' | 'PIX' | CARD
   */
  paymentMethodType: PAYMENT_METHOD_TYPE,
  /**
   * Vaulted token related to payment method type.
   * Only if you already have it
   * @optional
   */
  vaultedToken: VAULTED_TOKEN,
});
```

After mounting the SDK, the selected payment method flow will start automatically. For PayPal, the PayPal payment sheet opens immediately after the shopper selects PayPal—no extra confirmation click required.

Google Pay and Apple Pay are not built-in in Lite. Use `mountExternalButtons`. See [SDK customizations](sdk-customizations-web) for details.

### Step 5: Mount external buttons (Optional)

If you want to use Google Pay or Apple Pay in Lite, you can mount these payment buttons externally using the `mountExternalButtons` method. This method allows you to choose where each button is displayed in your UI.

```javascript
// Mount external buttons
await yuno.mountExternalButtons([
  {
    paymentMethodType: 'APPLE_PAY',
    elementSelector: '#apple-pay',
  },
  {
    paymentMethodType: 'GOOGLE_PAY',
    elementSelector: '#google-pay',
  },
]);
```

The `mountExternalButtons` method accepts an array of objects, each containing:

* `paymentMethodType`: Either `'APPLE_PAY'` or `'GOOGLE_PAY'`
* `elementSelector`: The CSS selector for the HTML element where the button should be rendered

#### Unmounting external buttons

You can unmount a single external button:

```javascript
yuno.unmountExternalButton('APPLE_PAY');
```

Or unmount all external buttons at once:

```javascript
yuno.unmountAllExternalButtons();
```

### Step 6: Initiate the payment process

Call `yuno.startPayment()` after the user selects a payment method. Example:

```javascript
const PayButton = document.querySelector("#button-pay");

PayButton.addEventListener("click", () => {
  yuno.startPayment();
});
```

### Step 7: Get the OTT (one-time token)

The SDK provides the one-time token when the customer completes the form. `yunoCreatePayment(oneTimeToken)` is then triggered.

```javascript
yunoCreatePayment(oneTimeToken);
```

You can also use `tokenWithInformation` to receive any additional info the customer gives at checkout, such as installments or document type/number:

```javascript
yunoCreatePayment(oneTimeToken, tokenWithInformation);
```

The merchant manages the loader.

### Step 8: Create the payment

Create the payment using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). Use the one-time token and checkout session.

Integrate the `continuePayment` method after creating the payment. Some asynchronous payment methods require additional customer actions. When the API response sets `sdk_action_required` to `true`, call `yuno.continuePayment()` to display the necessary screens. If `sdk_action_required` is `false`, this step is not necessary.

### Complementary features

For styling, themes, form options, and additional configurations (including mount external buttons, form loader, render mode, card form options), see [SDK customizations](sdk-customizations-web).

## Headless (Web)

**Recommended**: Use [Seamless (payment Web)](#seamless-payment-web) for pre-built UI and customization.

Yuno's Headless integration lets you create payments by requesting and sending via API all mandatory fields the payment provider requires. Use Headless when you need full control over the checkout UI and can collect and submit payment data yourself. You can create payments in two scenarios:

* Create a [One-Time Use Token](doc:tokens) using credit card information, then create a payment.
* Create a [One-Time Use Token](doc:tokens) using a `vaulted_token` from a previously enrolled credit card, then create a payment.

### Step 1: Include the library in your project

Follow the steps in [Include the library in your project](#include-the-library-in-your-project) above.

### Step 2: Initialize the SDK

See [Quickstart guide](quickstart-guide#web-sdk-integration) for initialization.

### Step 3: Start the checkout process

Start the checkout process using the `apiClientPayment` function with the necessary configuration parameters. See [Parameters](#parameters).

```javascript
const apiClientPayment = yuno.apiClientPayment({
  countryCode: "US",
  checkoutSession: "eec6578e-ac2f-40a0-8065-25b5957f6dd3"
});
```

### Step 4: Generate token

Create a one-time token (OTT) using `apiClientPayment.generateToken`. Use `try/catch` for errors. Examples:

1. **Example 1**: Create a one-time token utilizing a card as the payment method and including all requisite card information.
2. **Example 2**: Create a one-time token using the `vaulted_token` information.

When using a vaulted token, all fraud information from providers configured in card routing is collected and attached to the one-time token. You can also add installment information and a security code if required by the provider.

#### Example 1: Create OTT using card data

```javascript
const oneTimeToken = await apiClientPayment.generateToken({
  checkout_session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3",
  payment_method: {
    type: "CARD",
    vaulted_token: null,
    card: {
      save: false,
      detail: {
        expiration_month: 11,
        expiration_year: 25,
        number: "4111111111111111",
        security_code: "123",
        holder_name: "ANDREA B",
        type: "DEBIT"
      },
      installment: {
        id: "64ceacef-0886-4c81-9779-b2b3029c4e8b",
        value: 1
      }
    },
    customer: {},
    device_fingerprint: "0753b47f-bb43-86ab-647b-d735b67baac6",
    third_party_session_id: "QbJU2KolVUm1fhQR0s9qgrS0ArEQmEfE"
  }
});
```

#### Example 2: Create OTT using vaulted token

```javascript
const oneTimeToken = await apiClientPayment.generateToken({
  checkout_session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3",
  payment_method: {
    type: "CARD",
    vaulted_token: "aad8578e-ac2f-40a0-8065-25b5957f6555",
    card: {
      detail: {
        security_code: "123"
      },
      installment: {
        id: "64ceacef-0886-4c81-9779-b2b3029c4e8b",
        value: 1
      }
    }
  }
});
```

The response includes the one-time token and, when applicable, 3DS or provider-specific data.

### Step 5: Create the payment

Create the payment using the [Create payment endpoint](https://docs.y.uno/reference/create-payment). Send the one-time token in `payment_method.token`.

```javascript
await createPayment({
  checkout_session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3",
  one_time_token: oneTimeToken.token,
});
```

Check the API response for `sdk_action_required`:

* If `false`, no further SDK interaction is required and the payment process concludes.
* If `true`, additional SDK interaction is needed (e.g. 3DS). Follow Step 6.

### Step 6: Handle 3DS and provider challenges

When `sdk_action_required` is `true`, some payment methods require additional steps such as 3D Secure authentication or provider-specific challenges. Use the Headless helper methods to manage these flows.

To get the 3DS challenge URL, call `getThreeDSecureChallenge` with the `checkoutSession` used to create the payment:

```javascript
const challengeData = await apiClientPayment.getThreeDSecureChallenge(checkoutSession);

// Redirect the customer to the 3DS URL, or open it in an iframe/modal
window.location.href = challengeData.url;
```

To determine what action is needed to continue the payment flow, call `getContinuePaymentAction`:

```javascript
const continueData = await apiClientPayment.getContinuePaymentAction({
  checkoutSession: "eec6578e-ac2f-40a0-8065-25b5957f6dd3",
});
```

Use the returned data to decide if additional customer actions are needed or if you can finalise the payment.

### Saving cards during Headless payments

With Headless, you can save credit/debit cards for future purchases within the same payment request, without using the enrollment integration. When calling `apiClientPayment.generateToken`, set:

```javascript
payment_method: {
  card: {
    save: true,
  },
}
```

If the payment succeeds and the provider supports vaulting, you will receive a `vaulted_token` in the response, which you can use for future Merchant-Initiated Transactions (MIT) or one-click payments.

## Common reference

For full parameter and customization details, see the [Web SDK Common Reference](web-sdk-common-reference).
