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

Choose the integration method based on your SDK version:

* **v1.2 (Seamless Full):**\
  Use this if you are integrating with SDK v1.2 or later. This version introduces the new `startSeamlessCheckout` flow, which automatically lists all payment methods and separates payment buttons (like PayPal) from other methods.
* **Before v1.2 (Seamless Lite/Legacy):**\
  Use this if you are on an earlier version of the SDK. The `startCheckout` method is used, and you have more control over which payment methods are displayed and how they are presented.

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
  #v12:checked~.tab-content#v12,
  #legacy:checked~.tab-content#legacy { display: block; }
  #v12:checked~.tabs label[for="v12"],
  #legacy:checked~.tabs label[for="legacy"] {
    color: #000;
    border-bottom: 2px solid #513CE1;
  }
</style>
<body>
  <input type="radio" id="v12" name="tabs" checked>
  <input type="radio" id="legacy" name="tabs">
  <div class="tabs">
    <label for="v12">v1.2 (Seamless Full)</label>
    <label for="legacy">Before v1.2 (Seamless Lite/Legacy)</label>
  </div>
  <div class="tab-content" id="v12">
    <pre><code class="language-javascript">await yuno.startSeamlessCheckout({
  checkoutSession,
  elementSelector: "#root",
  countryCode,
  language: initialSetup.language,
  yunoPaymentResult(data) {
    console.log("yunoPaymentResult", data);
  },
  yunoError: (error) => {
    console.log("There was an error", error);
  },
  onLoading: (data) => {
    console.log("onLoading", data);
  }
});

await yuno.mountSeamlessCheckout();
</code></pre>
  </div>
  <div class="tab-content" id="legacy">
    <pre><code class="language-javascript">yuno.startCheckout({
  checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
  elementSelector: "#root",
  country_code: "US",
  language: "en",
  showLoading: true,
  issuersFormEnable: true,
  showPaymentStatus: true,
  onLoading: (args) => console.log(args),
  renderMode: {
    type: "modal",
    elementSelector: {
      apmForm: "#form-element",
      actionForm: "#action-form-element"
    }
  },
  card: {
    type: "extends",
    styles: "",
    cardSaveEnable: false,
    texts: {}
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
  }
});
</code></pre>
  </div>
</body>
`}</HTMLBlock>

**Parameters:**

* `checkoutSession`: The current payment session.
* `elementSelector`: The HTML element where the SDK will be mounted.
* `countryCode`: Country code (CO, BR, CL, PE, EC, UR, MX).
* `language`: Language for the payment forms (`es`, `en`, `pt`).
* \`

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