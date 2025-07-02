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

<Image align="center" src="https://files.readme.io/bb2c987a467228d113d98035f453a459aedfb41554aad3eb49fc50fed8dbf0a0-Screenshot_2025-06-04_at_10.45.05_AM.png" />

## Step 1: Include the library in your project

The integration guide provides [three flexible methods](https://docs.y.uno/docs/full-checkout-sdk#/choose-your-integration-method):

1. Direct HTML script inclusion
2. Dynamic JavaScript injection
3. NPM module installation

Choose the integration method that best suits your development workflow and technical requirements. After completing the SDK integration, you can proceed with the following steps to implement the Seamless functionality.

> 📘 TypeScript Library
>
> If you're using TypeScript, Yuno offers a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) that provides access to all available methods in the Yuno Web SDK.

## Step 2: Initialize SDK with the public key

Initialize the Yuno SDK in your JavaScript application by providing a valid `PUBLIC_API_KEY`. You can find your API credentials in the [Get your API credentials](https://docs.y.uno/reference/authentication) guide.

```javascript java
const yuno = await Yuno.initialize(PUBLIC_API_KEY)
```

The `yuno` instance will be used in subsequent steps to configure and manage the payment process.

## Step 3: Create a checkout session

To initialize the payment flow, create a new `checkout_session` using the [Create checkout session](ref:create-checkout-session) endpoint. Make sure to:

* First create a customer or retrieve an existing customer ID using the [Create Customer](ref:create-customer) endpoint
* Include the customer ID when creating the checkout session


## Step 4: Start the checkout process

By following the instructions below, you will be able to provide a seamless and user-friendly payment experience for your customers.

```javascript
yuno.startSeamlessCheckout({
  checkoutSession: '438413b7-4921-41e4-b8f3-28a5a0141638', // Current payment session
  elementSelector: '#root', // HTML element for rendering
  country_code: 'US', // Country code for the payment process
  language: 'en', // Language for the payment forms
  showLoading: true, // Show loading spinner
  issuersFormEnable: true, // Enable issuer's form
  showPaymentStatus: true, // Show payment status page
  onLoading: (args) => console.log(args), // Callback for loading events
  renderMode: {
    type: 'modal', // Render as a modal
    elementSelector: {
      apmForm: '#form-element',
      actionForm: '#action-form-element',
    },
  },
  card: {
    type: 'extends', // Card render mode
    styles: '', // Custom card styles
    cardSaveEnable: false, // Enable save card checkbox
    texts: {}, // Custom texts for card forms
  },
  texts: {}, // Custom texts for payment forms
  async yunoCreatePayment(oneTimeToken, tokenWithInformation) {
    await createPayment({ oneTimeToken, checkoutSession });
    yuno.continuePayment({ showPaymentStatus: true });
  },
  yunoPaymentMethodSelected(data) {
    console.log('Payment method selected:', data);
  },
  yunoPaymentResult(data) {
    console.log('Payment result:', data);
    yuno.hideLoader();
  },
  yunoError(error, data) {
    console.error('An error occurred:', error);
    yuno.hideLoader();
  },
});
```

Notice that when using the `startCheckout` you already have to specify the callbacks to handle the payments. In addition, you can customize the checkout interface using the `texts` objects. The following table lists all required parameters and their descriptions.

| Parameter                   | Description                                                                                                                                                                                                                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`           | Refers to the current payment's [checkout session](https://docs.y.uno/reference/create-checkout-session). Example: `438413b7-4921-41e4-b8f3-28a5a0141638`.                                                                                                                                    |
| `elementSelector`           | The HTML element where the checkout will be rendered.                                                                                                                                                                                                                                         |
| `country_code`              | This parameter specifies the country for which the payment process is being set up. Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk) page. |
| `language`                  | Defines the language to be used in the payment forms. Supported options include:                                                                                                                                                                                                              |
|                             | ▪️ `es` (Spanish)                                                                                                                                                                                                                                                                             |
|                             | ▪️ `en` (English)                                                                                                                                                                                                                                                                             |
|                             | ▪️ `pt` (Portuguese)                                                                                                                                                                                                                                                                          |
|                             | ▪️ `fil` (Filipino)                                                                                                                                                                                                                                                                           |
|                             | ▪️ `id` (Indonesian)                                                                                                                                                                                                                                                                          |
|                             | ▪️ `ms` (Malay)                                                                                                                                                                                                                                                                               |
|                             | ▪️ `th` (Thai)                                                                                                                                                                                                                                                                                |
|                             | By default, the SDK will use the browser language.                                                                                                                                                                                                                                            |
| `showLoading`               | Controls the visibility of the Yuno loading/spinner page during the payment process. Default: `true`.                                                                                                                                                                                         |
| `onLoading`                 | Required to receive notifications about server calls or loading events during the payment process.                                                                                                                                                                                            |
| `issuersFormEnable`         | Enables the issuer's form (e.g., a list of banks). Default: `true`.                                                                                                                                                                                                                           |
| `showPaymentStatus`         | It shows the Yuno Payment Status page, which is useful when continuing a payment. Default: `true`.                                                                                                                                                                                            |
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
> Payments can be initiated by the customer (CIT) or by the merchant (MIT). You find more information about their characteristics in [Stored credentials](/docs/stored-credentials).
>
> The step-by-step presented on this page refers to a customer-initiated transaction without the recurrence option. Typically, it's used in one-time online purchases, in-store purchases, ATM withdrawals, etc.

## Step 5: Mount the SDK

To present the checkout process based on the selected payment method, use the `yuno.mountSeamlessCheckout()` function. This step ensures the SDK is properly mounted on your chosen HTML element.

```javascript
yuno.mountSeamlessCheckout({
  /**
   // This parameter is optional and is used to pre-select a payment method type by default.
   // Available options include: 'PAYPAL', 'PIX', 'APPLE_PAY', 'GOOGLE_PAY', 'CARD'.
   */
  paymentMethodType: PAYMENT_METHOD_TYPE,
  /**
   // Optional: This parameter is a vaulted token associated with the payment method type.
   */
  vaultedToken: VAULTED_TOKEN,
})
```

Access the [Payment type](ref:payment-type-list) page to see the complete list of payment method types you can use when mounting the SDK.

The `vaultedToken` is optional. It represents information of a previously enrolled payment method. If you inform the `vaultedToken`, the user will not be required to provide the payment information again since it was provided in a previous transaction.

After mounting, the checkout flow for the selected payment method will automatically begin.

> 📘 Demo App
>
> In addition to the code examples provided, you can access the [Demo App](/docs/demo-app) for a complete implementation of Yuno SDKs or go directly to the [HTML](https://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout-seamless-lite.html) and [JavaScript](https://github.com/yuno-payments/yuno-sdk-web/blob/main/static/checkout-seamless-lite.js) checkout demos available on GitHub.