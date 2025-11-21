---
title: Seamless SDK (Payment Web)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Follow this step-by-step guide to implement and enable Yuno's Seamless Web SDK payment functionality in your application.

> 👍 Recommended SDK
>
> We recommend using the **Web Seamless SDK** for a smooth integration experience. This option provides a flexible payment solution with pre-built UI components and customization options.

> 📘 Should I use Lite or Full Seamless SDK?
>
> Use the Full Seamless SDK for automatic payment method listing and separate display of payment buttons (like PayPal). The Lite Seamless SDK gives you more control over how payment methods are displayed and organized.

<Image align="center" border={false} src="https://files.readme.io/bb2c987a467228d113d98035f453a459aedfb41554aad3eb49fc50fed8dbf0a0-Screenshot_2025-06-04_at_10.45.05_AM.png" />

## Step 1: Include the library in your project

The integration guide provides [three flexible methods](../docs/full-checkout-sdk#/choose-your-integration-method):

1. Direct HTML script inclusion
2. Dynamic JavaScript injection
3. NPM module installation

Choose the integration method that best suits your development workflow and technical requirements. After completing the SDK integration, you can proceed with the following steps to implement the Seamless functionality.

> 📘 TypeScript Library
>
> If you are using TypeScript, Yuno offers a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) that provides access to all available methods in the Yuno Web SDK.

## Step 2: Initialize SDK with the public key

Initialize the Yuno SDK in your JavaScript application by providing a valid `PUBLIC_API_KEY`:

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

> 📘 Credentials
>
> See the credentials page for more information: [https://docs.y.uno/reference/authentication](https://docs.y.uno/reference/authentication)

## Step 3: Create a checkout session

To initialize the payment flow, create a new `checkout_session` using the [Create checkout session](ref:create-checkout-session) endpoint.

- First, [create a customer](ref:create-customer) or retrieve an existing customer ID
- Include it when creating the `checkout_session`

### Key Parameters

| Parameter            | Required | Description                                                                                                                                                                                                                                      |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `amount`             | Yes      | The primary transaction amount object containing `currency` (ISO 4217 code) and `value` (numeric amount in that currency).                                                                                                                      |
| `alternative_amount` | No       | An alternative currency representation of the transaction amount with the same structure as `amount` (`currency` and `value`). Useful for multi-currency scenarios, such as displaying prices to customers in their preferred currency (e.g., USD) while processing the payment in the local currency (e.g., COP). |

> 📘 `onPaymentMethodSelect` Event
>
> For all APMs, including Google Pay, Apple Pay, and PayPal, `onPaymentMethodSelected` is triggered as soon as the customer chooses the payment method (before the payment flow begins). Define `onPaymentMethodSelected` in `startSeamlessCheckout` before `mountSeamlessCheckout`.

> 📘 Google Pay and Apple Pay Display
>
> From SDK version 1.5, Google Pay and Apple Pay appear as direct buttons instead of radio buttons in the payment methods list. They are displayed separately from other payment methods.

## Step 4: Start the checkout process

Use the configuration below to provide a seamless and user-friendly payment experience for your customers:

```javascript
yuno.startSeamlessCheckout({
  checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
  elementSelector: "#root",
  countryCode: "US",
  language: "en",
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
  },
  texts: {},
  async yunoCreatePayment(oneTimeToken, tokenWithInformation) {
    await createPayment({ oneTimeToken, checkoutSession });
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

When using `startSeamlessCheckout`, specify the callbacks to handle payments. You can also customize the checkout interface using the `texts` objects.

### Parameters

Configure the seamless checkout with the following options:

| Parameter                   | Description                                                                                                                                                                                                                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`           | Refers to the current payment's [checkout session](https://docs.y.uno/reference/create-checkout-session). Example: `438413b7-4921-41e4-b8f3-28a5a0141638`.                                                                                                                                    |
| `elementSelector`           | The HTML element where the checkout will be rendered.                                                                                                                                                                                                                                         |
| `countryCode`               | This parameter specifies the country for which the payment process is being set up. Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk) page. |
| `language`                  | Defines the language to be used in the payment forms. You can set it to one of the available language options: <ul><li>es (Spanish)</li><li>en (English)</li><li>pt (Portuguese)</li><li>fil (Filipino)</li><li>id (Indonesian)</li><li>ms (Malay)</li><li>th (Thai)</li></ul>                |
| `showLoading`               | Controls the visibility of the Yuno loading/spinner page during the payment process. Default: `true`.                                                                                                                                                                                         |
| `onLoading`                 | Required to receive notifications about server calls or loading events during the payment process.                                                                                                                                                                                            |
| `issuersFormEnable`         | Enables the issuer's form (e.g., a list of banks). Default: `true`.                                                                                                                                                                                                                           |
| `showPaymentStatus`         | Shows the Yuno Payment Status page, which is useful when continuing a payment. Default: `true`.                                                                                                                                                                                               |
| `showPayButton`             | Controls the visibility of the pay button in the customer or card form. Default: `true`.                                                                                                                                                                                                      |
| `renderMode`                | Specify how and where the forms will be rendered. The options available are:                                                                                                                                                                                                                  |
|                             | ▪️ `type: modal` (default)                                                                                                                                                                                                                                                                    |
|                             | ▪️ `type: element` - If you select `element`, you must inform the `elementSelector` to specify where the form should be rendered.                                                                                                                                                             |
| `card`                      | Defines the configuration for the card form. It contains settings like render mode, custom styles, and save card option.                                                                                                                                                                      |
| `texts`                     | Allows you to set custom button texts for card and non-card payment forms.                                                                                                                                                                                                                    |
| `yunoCreatePayment`         | Placeholder function for creating a payment. This function will not be called but should be implemented.                                                                                                                                                                                      |
| `yunoPaymentMethodSelected` | Callback invoked when a payment method is selected, along with the method's type and name.                                                                                                                                                                                                    |
| `yunoPaymentResult`         | Callback called after the payment is completed, with the payment status (e.g., `SUCCEEDED`, `ERROR`).                                                                                                                                                                                         |
| `yunoError`                 | Callback invoked when there is an error in the payment process. Receives error type and optional additional data.                                                                                                                                                                             |

> 📘 Customer and Merchant-Initiated Transactions
>
> Payments can be initiated by the customer (CIT) or by the merchant (MIT). You find more information about their characteristics in [Stored credentials](../docs/stored-credentials).
>
> The step-by-step on this page refers to a customer-initiated transaction without the recurrence option. Typically, it's used in one-time online purchases, in-store purchases, ATM withdrawals, etc.

## Step 5: Mount the SDK

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

## Step 6: Start the payment flow (Required)

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

> 📘 Demo App
>
> In addition to the code examples provided, you can access the [Demo App](doc:demo-app) for a complete implementation of Yuno SDKs. The demo app includes working examples of all Yuno SDKs and can be cloned from the [GitHub repository](https://github.com/yuno-payments/yuno-sdk-web).

## Mount external buttons

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

### Parameters

| Parameter           | Description                                                                                                 |
| :------------------ | :---------------------------------------------------------------------------------------------------------- |
| `paymentMethodType` | The payment method type. Must be either `'APPLE_PAY'` or `'GOOGLE_PAY'`.                                    |
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

## Stay Updated

Visit the [changelog](https://docs.y.uno/changelog) for the latest SDK updates and version history.
