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

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Recommended SDKs</h3>
      <div class="contentContainer">
        <p>
         We recommend using the <a href="full-checkout-sdk">Web Full SDK</a> or the <a href="lite-checkout-sdk">Web Lite SDK</a> for a smooth integration experience. These options provide a complete solution with built-in forms and validation.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Step 1: Include the library in your project

Before proceeding with the Seamless Web SDK implementation, please refer to the [Yuno SDK Integration Guide](doc:yuno-sdk-integration-guide) for detailed instructions on how to properly integrate the SDK into your project.

The integration guide provides three flexible methods:

1. Direct HTML script inclusion
2. Dynamic JavaScript injection
3. NPM module installation

Choose the integration method that best suits your development workflow and technical requirements. After completing the SDK integration, you can proceed with the following steps to implement the Seamless functionality.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>TypeScript library</h3>
      <div class="contentContainer">
        <p>
					If you're using TypeScript, Yuno offers a <a href="https://www.npmjs.com/package/@yuno-payments/sdk-web-types">library</a> that provides access to all available methods in the Yuno Web SDK.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

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

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `checkoutSession`
      </td>

      <td>
        Refers to the current payment's [checkout session](https://docs.y.uno/reference/create-checkout-session).
        Example: `438413b7-4921-41e4-b8f3-28a5a0141638`.
      </td>
    </tr>

    <tr>
      <td>
        `elementSelector`
      </td>

      <td>
        The HTML element where the checkout will be rendered.
      </td>
    </tr>

    <tr>
      <td>
        `country_code`
      </td>

      <td>
        This parameter specifies the country for which the payment process is being set up.
        Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk) page.
      </td>
    </tr>

    <tr>
      <td>
        `language`
      </td>

      <td>
        Defines the language to be used in the payment forms. Supported options include:

        * `es` (Spanish)
        * `en` (English)
        * `pt` (Portuguese)
        * `fil` (Filipino)
        * `id` (Indonesian)
        * `ms` (Malay)
        * `th` (Thai). By default, the SDK will use the browser language.
      </td>
    </tr>

    <tr>
      <td>
        `showLoading`
      </td>

      <td>
        Controls the visibility of the Yuno loading/spinner page during the payment process. Default: `true`.
      </td>
    </tr>

    <tr>
      <td>
        `onLoading`
      </td>

      <td>
        Required to receive notifications about server calls or loading events during the payment process.
      </td>
    </tr>

    <tr>
      <td>
        `issuersFormEnable`
      </td>

      <td>
        Enables the issuer's form (e.g., a list of banks). Default: `true`.
      </td>
    </tr>

    <tr>
      <td>
        `showPaymentStatus`
      </td>

      <td>
        It shows the Yuno Payment Status page, which is useful when continuing a payment. Default: `true`.
      </td>
    </tr>

    <tr>
      <td>
        `showPayButton`
      </td>

      <td>
        Controls the visibility of the pay button in the customer or card form. Default: `true`.
      </td>
    </tr>

    <tr>
      <td>
        `renderMode`
      </td>

      <td>
        Specify how and where the forms will be rendered. The options available are:

        * `type: modal'` (default)\
          -`type: element`. If you select `element`you must inform the `elementSelector`, to specify where the form should be rendered.
      </td>
    </tr>

    <tr>
      <td>
        `card`
      </td>

      <td>
        Defines the configuration for the card form. It contains settings like render mode, custom styles, and save card option.
      </td>
    </tr>

    <tr>
      <td>
        `texts`
      </td>

      <td>
        Allows you to set custom button texts for card and non-card payment forms.
      </td>
    </tr>

    <tr>
      <td>
        `yunoCreatePayment`
      </td>

      <td>
        Placeholder function for creating a payment. This function will not be called but should be implemented.
      </td>
    </tr>

    <tr>
      <td>
        `yunoPaymentMethodSelected`
      </td>

      <td>
        Callback invoked when a payment method is selected, along with the method's type and name.
      </td>
    </tr>

    <tr>
      <td>
        `yunoPaymentResult`
      </td>

      <td>
        Callback called after the payment is completed, with the payment status (e.g., `SUCCEEDED`, `ERROR`).
      </td>
    </tr>

    <tr>
      <td>
        `yunoError`
      </td>

      <td>
        Callback invoked when there is an error in the payment process. Receives error type and optional additional data.
      </td>
    </tr>
  </tbody>
</Table>

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Customer and merchant-initiated transactions</h3>
      <div class="contentContainer">
        <p>
					Payments can be initiated by the customer (CIT) or by the merchant (MIT). You find more information about their characteristics in <a href="/docs/stored-credentials">Stored credentials</a>. 
        </p>
        <p>
					The step-by-step presented on this page refers to a customer-initiated transaction without the recurrence option. Typically, it's used in one-time online purchases, in-store purchases, ATM withdrawals, etc.
        </p>     
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer ">
    <div class="verticalLine"></div>
    <div>
      <h3>Rendering mode</h3>
      <div class="contentContainer">
        <p>
          By default, Yuno SDK renders as a modal. However, you can specify the element where the SDK will render. For additional information, access the <a href="/docs/lite-sdk-complementary-features#mode-of-form-rendering">Render mode</a> under the complementary complementary features page.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

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

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Demo App</h3>
      <div class="contentContainer">
        <p>
          In addition to the code examples provided, you can access the <a href="/docs/demo-app">Demo App</a> for a complete implementation of Yuno SDKs or go directly to the <a href="https://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout-seamless-lite.html">HTML<a/> and <a href="https://github.com/yuno-payments/yuno-sdk-web/blob/main/static/checkout-seamless-lite.js">JavaScript</a> checkout demos available on GitHub.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>