---
title: Full SDK (Web) v1.0 (with tabs)
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Below, we outline the step-by-step process to enable the full Web SDK  functionalities in your system:

## Step 1: Include the library in your project

Ensure the Yuno SDK file is included in your webpage before closing the `<body>` tag. Refer to the example below:

```html
<script src="https://sdk-web.y.uno/v1/static/js/main.min.js"></script>
```

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer \">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>TypeScript library</h3>\n      <div class=\"contentContainer\">\n        <p>\n          If you are using TypeScript, Yuno provides a <a href=\"https://www.npmjs.com/package/@yuno-payments/sdk-web-types\">library</a> to see all methods available in the Yuno Web SDK.          \n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 2: Initialize SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid **PUBLIC_API_KEY**. Check the [Get your API credentials](ref:get-your-api-credentials) guide.

Like the example below, use the initialized class that is attributed to the `yuno`constant.

```javascript
const yuno = Yuno.initialize(PUBLIC_API_KEY)
```

## Step 3: Start the checkout process

To start the checkout, you'll use the function `yuno.startCheckout`, providing the necessary parameters.

The following table lists all required parameters and their descriptions. For optional parameters, go to [Complementary Features](https://docs.y.uno/docs/full-checkout-sdk#complementary-features).

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Description",
    "0-0": "`checkoutSession`",
    "0-1": "Refers to the current payment's [checkout session](ref:create-checkout-session).  \n`Example: '438413b7-4921-41e4-b8f3-28a5a0141638'`",
    "1-0": "`countryCode`",
    "1-1": "This parameter determines the country for which the payment process is being configured. The complete list of supported countries and their country code is available on the [Country coverage](doc:country-coverage-yuno-sdk)  page.",
    "2-0": "`language`",
    "2-1": "Defines the language to be used in the payment forms. You can set it to one of the available language options: es (Spanish), en (English), pt (Portuguese), fil (Filipino), id (Indonesian), ms (Malay), or th (Thai).",
    "3-0": "`onLoading`",
    "3-1": "Required to receive notifications about server calls or loading events during the payment process. ",
    "4-0": "`showLoading`",
    "4-1": "Control the visibility of the Yuno loading/spinner page during the payment process. By default, it's `true`.",
    "5-0": "`issuersFormEnable`",
    "5-1": "Enables the issuer's form. By default, it's `true`.",
    "6-0": "`showPaymentStatus`",
    "6-1": "Shows the Yuno Payment Status page. You can use this option when continuing a payment as well. By default, it's `true`.",
    "7-0": "`card.isCreditCardProcessingOnly`",
    "7-1": "Enables you to ensure that all card transactions are processed as credit only. This option is helpful in markets where cards can act as both credit and debit.  \nTo enable, set the `isCreditCardProcessingOnly` to `true` to ensure that all card transactions are processed as credit.  \nThis parameter is not required."
  },
  "cols": 2,
  "rows": 8,
  "align": [
    "left",
    "left"
  ]
}
[/block]


```javascript
yuno.startCheckout({
  checkoutSession: '438413b7-4921-41e4-b8f3-28a5a0141638',
  /**
   * The complete list of country codes is available on https://docs.y.uno/docs/country-coverage-yuno-sdk
  */
  country_code: "FR",
  language: 'fr',
  showLoading: true,
  issuersFormEnable: true,
  showPaymentStatus: true,
	/**
   * Set isCreditCardProcessingOnly as true to process all card transactions are credit
   * isCreditCardProcessingOnly: true | false | undefined
  */
  card: {
    isCreditCardProcessingOnly: true,
  },
  onLoading: (args) => {
    console.log(args);
  },
  /**
   * Notifies when a payment method is selected
   */
  yunoPaymentMethodSelected: () => {
    console.log('Payment method selected');
  },
  /**
   * Returns the payment result after continuePayment
   * @param {string} status - The payment status
   */
  yunoPaymentResult: (status) => {
    console.log('Payment result:', status);
  },
  /**
   * Executes when there are errors
   * @param {string} message - Error message
   * @param {any} data - Additional error data
   */
  yunoError: (message, data) => {
    console.error('Payment error:', message, data);
  },
  async yunoCreatePayment(oneTimeToken) {
  	/**
    * The createPayment function calls the backend to create a payment in Yuno.
    * It uses the following endpoint https://docs.y.uno/reference/create-payment
  	*/
    await createPayment({ oneTimeToken, checkoutSession })
    yuno.continuePayment({ showPaymentStatus: true })
  },
})
```

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer \">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Rendering mode</h3>\n      <div class=\"contentContainer\">\n        <p>\n          By default, Yuno SDK renders as a modal. However, you can specify the element where the SDK will render. For additional information, access the <a href=\"/docs/complementary-features-full-sdk#mode-of-form-rendering\">Render mode</a> under the complementary complementary features page.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 4: Mount the SDK

Display the payment methods by using the function `yuno.mountCheckout()` by selecting an HTML element and using a valid CSS selector (`#`, `.`, `[data-*]`)

```javascript
/**
 * Mount checkout in browser DOM
 */
yuno.mountCheckout()
```

If you want to set a default payment method, use the following code to mount it:

```javascript
/**
 * Mount checkout in browser DOM with a payment method selected by default
 * @optional
 */
yuno.mountCheckout({
  /**
   * Optional, only needed if you would like this method type selected by default
   * Can be one of 'PAYPAL' | 'PIX' | 'APPLE_PAY' | 'GOOGLE_PAY' | CARD
   */
  paymentMethodType: PAYMENT_METHOD_TYPE,
  /**
   * Optional
   * Vaulted token related to payment method type
   */
  vaultedToken: VAULTED_TOKEN,
})
```

## Step 5: Initiate the payment process

After the user has selected a payment method remember to call `yuno.startPayment()` to initiate the payment flow. Below you will find an example where `yuno.startPayment()` is called when the user clicks on `button-pay`:

```javascript
const PayButton = document.querySelector('#button-pay')

PayButton.addEventListener('click', () => {
  yuno.startPayment()
})
```

## Step 6: Get the OTT (One Time Token)

Once the customer fills out the requested data in Yuno's payment forms, the SDK provides the OTT. The configuration function `yuno.CreatePayment(oneTimeToken)` is then triggered with the OTT (One Time Token).

```javascript
 yunoCreatePayment(oneTimeToken)
```

You can also use tokenWithInformation to receive any additional info given by the customer in the checkout such as installments or document type/number.

```javascript
yunoCreatePayment(oneTimeToken, tokenWithInformation)
```

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer alert\">\n    <div class=\"verticalLineAlert\"></div>\n    <div>\n      <h3>Important</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tThe merchant is responsible for handling the loader. Yuno offers an option to use our loader; however, the merchant can use their own loader and must make the corresponding configurations.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 7: Create the Payment

Once you have completed the steps described before, you can create a payment. The back-to-back payment creation must be carried out using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant should call their backend to create the payment within Yuno, using the OTT (One Time Token) and the checkout session.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Complete the integration</h3>\n      <div class=\"contentContainer\">\n        <p>\n          After Step 7, you can complete the end-to-end integration by accessing <a href=\"https://docs.y.uno/docs/full-sdk-workflow\">Step by Step integration of the Full SDK</a>.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Continue method</h3>\n      <div class=\"contentContainer\">\n        <p>\n          Yuno recommends you integrate the <code>continuePayment</code> method of the SDK after the payment is created because certain asynchronous payment methods require additional action from the customer to complete it. The API will inform you of this scenario via the <code>sdk_action_required</code> field of the response, which will be returned as true. The <code>yuno.continuePayment()</code> function will display the additional screens to the customers, where they can carry out the necessary actions to complete the payment. Otherwise, this step is not necessary.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Demo App</h3>\n      <div class=\"contentContainer\">\n        <p>\n          In addition to the code examples provided, you can access the <a href=\"https://docs.y.uno/docs/demo-app\">Demo App</a> for a complete implementation of Yuno SDKs or go directly to the <a href=\"https://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout.html\">HTML<a/> and <a href=\"https://github.com/yuno-payments/yuno-sdk-web/blob/main/static/checkout.js\">JavaScript</a> checkout demos available on GitHub.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## What's next?

Learn about the additional configurations from the Full SDK accessing [Complementary Features](doc:complementary-features-full-sdk). You can also access other functions available on the Yuno Web SDK:

- [SDK Customizations](doc:sdk-customizations): Change the SDK appearance to match your brand.
- [Payment Status](doc:payment-status): Update the user about the payment process.
- [3DS Setup SDK](doc:3ds-setup-sdk): Integrate 3DS into your payment flow.