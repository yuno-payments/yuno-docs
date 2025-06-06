---
title: Seamless SDK (Payment Web) (COPY)
deprecated: false
hidden: true
metadata:
  robots: index
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

## Seamless Full SDK updates (v1.2)

The new Seamless Full SDK flow is similar to Seamless Lite, but with the following differences:

* The Full version is responsible for listing all available payment methods.
* Payment buttons (such as PayPal) are displayed in a separate list from other payment methods.

### Example integration

```javascript
await yuno.startSeamlessCheckout({
  checkoutSession,
  // element where the SDK will be mounted
  elementSelector: '#root',
  /**
    * country can be one of CO, BR, CL, PE, EC, UR, MX
    */
  countryCode,
  /**
    * language can be one of es, en, pt
    */
  language: initialSetup.language,
  /**
    * 
    * @param {'READY_TO_PAY' | 'CREATED' | 'PAYED' | 'REJECTED' | 'CANCELLED' | 'ERROR' | 'DECLINED' | 'PENDING' | 'EXPIRED' | 'VERIFIED' | 'REFUNDED'} data
    */
  yunoPaymentResult(data) {
    console.log('yunoPaymentResult', data)
  },
  /**
    * @param { error: 'CANCELED_BY_USER' | any }
    */
  yunoError: (error) => {
    console.log('There was an error', error)
  },
  onLoading: (data) => {
    console.log('onLoading', data)
  }
})

await yuno.mountSeamlessCheckout()
```

**Parameters:**

* `checkoutSession`: The current payment session.
* `elementSelector`: The HTML element where the SDK will be mounted.
* `countryCode`: Country code (CO, BR, CL, PE, EC, UR, MX).
* `language`: Language for the payment forms (`es`, `en`, `pt`).
* `yunoPaymentResult`: Callback for payment status updates.
* `yunoError`: Callback for error handling.
* `onLoading`: Callback for loading events.

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

To start the checkout, use the appropriate function for your integration:

<HTMLBlock>{`
<style>
  .tabs {
    display: flex;
    border-bottom: 2px solid #ddd;
    margin-bottom: 20px;
  }
  input[type="radio"] { display: none; }
  label {
    text-decoration: none;
    color: #333;
    padding: 10px 20px;
    transition: all 0.3s ease;
    font-size: 16px;
    margin-right: 10px;
    border-bottom: 2px solid transparent;
    cursor: pointer;
  }
  label:hover, label:focus { color: #000; }
  .tab-content { display: none; }
  #lite:checked~.tab-content#lite,
  #full:checked~.tab-content#full { display: block; }
  #lite:checked~.tabs label[for="lite"],
  #full:checked~.tabs label[for="full"] {
    color: #000;
    border-bottom: 2px solid #513CE1;
  }
</style>
<body>
  <input type="radio" id="lite" name="tabs" checked>
  <input type="radio" id="full" name="tabs">
  <div class="tabs">
    <label for="lite">Seamless Lite</label>
    <label for="full">Seamless Full</label>
  </div>
  <div class="tab-content" id="lite">
    <pre><code class="language-javascript">// Seamless Lite example
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
</code></pre>
  </div>
  <div class="tab-content" id="full">
    <pre><code class="language-javascript">// Seamless Full example
await yuno.startSeamlessCheckout({
  checkoutSession,
  // element where the SDK will be mounted
  elementSelector: '#root',
  /**
    * country can be one of CO, BR, CL, PE, EC, UR, MX
    */
  countryCode,
  /**
    * language can be one of es, en, pt
    */
  language: initialSetup.language,
  /**
    * 
    * @param {'READY_TO_PAY' | 'CREATED' | 'PAYED' | 'REJECTED' | 'CANCELLED' | 'ERROR' | 'DECLINED' | 'PENDING' | 'EXPIRED' | 'VERIFIED' | 'REFUNDED'} data
    */
  yunoPaymentResult(data) {
    console.log('yunoPaymentResult', data)
  },
  /**
    * @param { error: 'CANCELED_BY_USER' | any }
    */
  yunoError: (error) => {
    console.log('There was an error', error)
  },
  onLoading: (data) => {
    console.log('onLoading', data)
  }
})

await yuno.mountSeamlessCheckout();
</code></pre>
  </div>
</body>
`}</HTMLBlock>

**Parameters:**

* `checkoutSession`: The current payment session.
* `elementSelector`: The HTML element where the SDK will be mounted.
* `countryCode`: Country code (CO, BR, CL, PE, EC, UR, MX).
* `language`: Language for the payment forms (`es`, `en`, `pt`).
* `yunoPaymentResult`: Callback for payment status updates.
* `yunoError`: Callback for error handling.
* `onLoading`: Callback for loading events.

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
          By default, Yuno SDK renders as a modal. However, you can specify the element where the SDK will render.
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

<br />

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