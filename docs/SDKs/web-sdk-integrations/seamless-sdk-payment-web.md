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

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Recommended SDKs</h3>\n      <div class=\"contentContainer\">\n        <p>\n         We recommend using the <a href=\"full-checkout-sdk\">Web Full SDK</a> or the <a href=\"lite-checkout-sdk\">Web Lite SDK</a> for a smooth integration experience. These options provide a complete solution with built-in forms and validation.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 1: Include the library in your project

Before proceeding with the Seamless Web SDK implementation, please refer to the [Yuno SDK Integration Guide](doc:yuno-sdk-integration-guide) for detailed instructions on how to properly integrate the SDK into your project. 

The integration guide provides three flexible methods:

1. Direct HTML script inclusion
2. Dynamic JavaScript injection
3. NPM module installation

Choose the integration method that best suits your development workflow and technical requirements. After completing the SDK integration, you can proceed with the following steps to implement the Seamless functionality.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>TypeScript library</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tIf you're using TypeScript, Yuno offers a <a href=\"https://www.npmjs.com/package/@yuno-payments/sdk-web-types\">library</a> that provides access to all available methods in the Yuno Web SDK.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 2: Initialize SDK with the public key

Initialize the Yuno SDK in your JavaScript application by providing a valid `PUBLIC_API_KEY`. You can find your API credentials in the [Get your API credentials](https://docs.y.uno/reference/authentication) guide.

```javascript java
const yuno = await Yuno.initialize(PUBLIC_API_KEY)
```

The `yuno` instance will be used in subsequent steps to configure and manage the payment process.

## Step 3: Start the checkout process

Use the `yuno.startCheckout()` method to configure and begin the checkout process. The following example demonstrates how to set up a configuration object and start the checkout process:

```javascript javascript
yuno.startCheckout({
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

Notice that when using the `startCheckout`you already have to specify the callbacks to handle the payments. In addition, you can customize the checkout interface using the `texts` objects. The following table lists all required parameters and their descriptions. 

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Description",
    "0-0": "`checkoutSession`",
    "0-1": "Refers to the current payment's [checkout session](https://docs.y.uno/reference/create-checkout-session).  \nExample: `438413b7-4921-41e4-b8f3-28a5a0141638`.",
    "1-0": "`elementSelector`",
    "1-1": "The HTML element where the checkout will be rendered. ",
    "2-0": "`country_code`",
    "2-1": "This parameter specifies the country for which the payment process is being set up.  \nUse an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk) page.",
    "3-0": "`language`",
    "3-1": "Defines the language to be used in the payment forms. Supported options include:  \n  \n- `es` (Spanish)\n- `en` (English)\n- `pt` (Portuguese)\n- `fil` (Filipino)\n- `id` (Indonesian)\n- `ms` (Malay)\n- `th` (Thai). By default, the SDK will use the browser language.",
    "4-0": "`showLoading`",
    "4-1": "Controls the visibility of the Yuno loading/spinner page during the payment process. Default: `true`.",
    "5-0": "`onLoading`",
    "5-1": "Required to receive notifications about server calls or loading events during the payment process.",
    "6-0": "`issuersFormEnable`",
    "6-1": "Enables the issuer's form (e.g., a list of banks). Default: `true`.",
    "7-0": "`showPaymentStatus`",
    "7-1": "It shows the Yuno Payment Status page, which is useful when continuing a payment. Default: `true`.",
    "8-0": "`showPayButton`",
    "8-1": "Controls the visibility of the pay button in the customer or card form. Default: `true`.",
    "9-0": "`renderMode`",
    "9-1": "Specify how and where the forms will be rendered. The options available are:  \n  \n- `type: modal'` (default)  \n  -`type: element`. If you select `element`you must inform the `elementSelector`, to specify where the form should be rendered. ",
    "10-0": "`card`",
    "10-1": "Defines the configuration for the card form. It contains settings like render mode, custom styles, and save card option.",
    "11-0": " `texts`",
    "11-1": "Allows you to set custom button texts for card and non-card payment forms.",
    "12-0": "`yunoCreatePayment`",
    "12-1": "Placeholder function for creating a payment. This function will not be called but should be implemented.",
    "13-0": "`yunoPaymentMethodSelected`",
    "13-1": "Callback invoked when a payment method is selected, along with the method's type and name.",
    "14-0": "`yunoPaymentResult`",
    "14-1": "Callback called after the payment is completed, with the payment status (e.g., `SUCCEEDED`, `ERROR`).",
    "15-0": "`yunoError`",
    "15-1": "Callback invoked when there is an error in the payment process. Receives error type and optional additional data."
  },
  "cols": 2,
  "rows": 16,
  "align": [
    "left",
    "left"
  ]
}
[/block]


[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Customer and merchant-initiated transactions</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tPayments can be initiated by the customer (CIT) or by the merchant (MIT). You find more information about their characteristics in <a href=\"/docs/stored-credentials\">Stored credentials</a>. \n        </p>\n        <p>\n\t\t\t\t\tThe step-by-step presented on this page refers to a customer-initiated transaction without the recurrence option. Typically, it's used in one-time online purchases, in-store purchases, ATM withdrawals, etc.\n        </p>\n        <p>\n\t\t\t\t\tTo learn how to use the Lite SDK to perform MIT operations, access the <a href=\"/docs/lite-sdk-merchant-initiated-transactions\">Merchant-initiated transactions</a> page. \n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer \">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Rendering mode</h3>\n      <div class=\"contentContainer\">\n        <p>\n          By default, Yuno SDK renders as a modal. However, you can specify the element where the SDK will render. For additional information, access the <a href=\"/docs/lite-sdk-complementary-features#mode-of-form-rendering\">Render mode</a> under the complementary complementary features page.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 4: Mount the SDK

To present the checkout process based on the selected payment method, use the `yuno.mountSeamlessCheckoutLite()` function. This step ensures the SDK is properly mounted on your chosen HTML element.

```javascript
yuno.mountSeamlessCheckoutLite({
  paymentMethodType: PAYMENT_METHOD_TYPE,
  /**
   * Vaulted token related to payment method type.
   * @optional 
   */
  vaultedToken: VAULTED_TOKEN,
})

```

Access the [Payment type](ref:payment-type-list) page to see the complete list of payment method types you can use when mounting the SDK.

The `vaultedToken` is optional. It represents information of a previously enrolled payment method. If you inform the `vaultedToken`, the user will not be required to provide the payment information again since it was provided in a previous transaction.

After mounting, the checkout flow for the selected payment method will automatically begin.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Demo App</h3>\n      <div class=\"contentContainer\">\n        <p>\n          In addition to the code examples provided, you can access the <a href=\"/docs/demo-app\">Demo App</a> for a complete implementation of Yuno SDKs or go directly to the <a href=\"https://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout-seamless-lite.html\">HTML<a/> and <a href=\"https://github.com/yuno-payments/yuno-sdk-web/blob/main/static/checkout-seamless-lite.js\">JavaScript</a> checkout demos available on GitHub.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]