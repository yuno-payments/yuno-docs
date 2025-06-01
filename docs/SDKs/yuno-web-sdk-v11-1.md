---
title: Yuno Web SDK v1.1
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
Follow this step-by-step guide to implement and enable Yuno's Full Web SDK functionality in your application.

## Step 1: Include the library in your project

After completing the SDK integration, you can proceed with the following steps to implement the full checkout functionality.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer \">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>TypeScript library</h3>\n      <div class=\"contentContainer\">\n        <p>\n          If you are using TypeScript, Yuno provides a <a href=\"https://www.npmjs.com/package/@yuno-payments/sdk-web-types\">library</a> to see all methods available in the Yuno Web SDK.          \n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 2: Initialize SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid **PUBLIC_API_KEY**. Check the [Get your API credentials](ref:developers-credentials) guide.

Like the example below, use the initialized class that is attributed to the `yuno`constant.

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY)
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
    "1-1": "This parameter specifies the country for which the payment process is being set up.  \nUse an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk)  page.",
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
  }
  onLoading: (args) => {
    console.log(args);
  }
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

## Step 6: Get the OTT (one-time token)

Once the customer fills out the requested data in Yuno's payment forms, the SDK provides the one-time token. The configuration function `yuno.CreatePayment(oneTimeToken)` is then triggered with the one-time token.

```javascript
 yunoCreatePayment(oneTimeToken)
```

You can also use tokenWithInformation to receive any additional info given by the customer in the checkout such as installments or document type/number.

```javascript
yunoCreatePayment(oneTimeToken, tokenWithInformation)
```

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer alert\">\n    <div class=\"verticalLineAlert\"></div>\n    <div>\n      <h3>Important</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tThe merchant is responsible for managing the loader. Yuno provides a default loader option, but merchants may implement their own loader if preferred. In that case, they are responsible for making the necessary configurations.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 7: Create the Payment

Once the previous steps are complete, you can proceed to create a payment. Back-to-back payment creation must be performed using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant’s backend should call this endpoint to create the payment in Yuno using the one-time token and checkout session.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Complete the integration</h3>\n      <div class=\"contentContainer\">\n        <p>\n          After Step 7, you can complete the end-to-end integration by accessing <a href=\"https://docs.y.uno/docs/full-sdk-workflow\">Step by Step integration of the Full SDK</a>.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Continue method</h3>\n      <div class=\"contentContainer\">\n        <p>\n          After creating a payment, Yuno <b>requires</b> you to integrate the <code>continuePayment</code> method from the SDK. This is necessary because some asynchronous payment methods require additional customer actions to complete the process. The API response will indicate this scenario by setting the <code>sdk_action_required</code> field to true. When this occurs, you must call <code>yuno.continuePayment()</code>, which will automatically present the necessary screens to the customer, allowing them to complete the payment flow without requiring you to handle each case manually.         \n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## `continuePayment` return value or null

For payment methods that require merchant-side action (e.g., when the payment provider requires a redirect URL in a webview), the `await yuno.continuePayment()` method will return either an object with the following structure or null:

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

When the method returns an object, it allows you to handle your application's payment flows that require custom redirect handling. When it returns null, no additional merchant-side action is needed.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Demo App</h3>\n      <div class=\"contentContainer\">\n        <p>\n          In addition to the code examples provided, you can access the <a href=\"https://docs.y.uno/docs/demo-app\">Demo App</a> for a complete implementation of Yuno SDKs or go directly to the <a href=\"https://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout.html\">HTML<a/> and <a href=\"https://github.com/yuno-payments/yuno-sdk-web/blob/main/static/checkout.js\">JavaScript</a> checkout demos available on GitHub.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Complementary features

Yuno Web SDK provides additional services and configurations you can use to improve customers' experience:

- [Form loader](doc:complementary-features-full-sdk#loader-control-the-use-of-the-loader)
- [Render mode ](doc:complementary-features-full-sdk#mode-of-form-rendering)
- [Card form configurations ](doc:complementary-features-full-sdk#card-form-configurations)
  - [Save Card for future payments](doc:complementary-features-full-sdk#save-card-for-future-payments)
  - [Render mode](doc:complementary-features-full-sdk#rendering-modes)
  - [Text payment form buttons](doc:complementary-features-full-sdk#text-payment-form-buttons)
  - [Persist credit card form to retry payments](doc:complementary-features-full-sdk#persist-credit-card-form-to-retry-payments)
  - [Hide Pay button](doc:complementary-features-full-sdk#hide-pay-button)

### [Form loader](doc:loader)

Control the use of the [loader](doc:loader).

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Description",
    "0-0": "`showLoading`",
    "0-1": "You can hide or show the Yuno loading/spinner page. Enabling this option ensures that the loading component remains displayed until either the `hideLoader()` or `continuePayment()` function is called.  \nThe default value is true."
  },
  "cols": 2,
  "rows": 1,
  "align": [
    "left",
    "left"
  ]
}
[/block]


```javascript
yuno.startCheckout({
  showLoading: true,
})
```

### Form of the issuer

| Parameter           | Description                                                                                |
| :------------------ | :----------------------------------------------------------------------------------------- |
| `issuersFormEnable` | Through this parameter, you can configure the SDK to enable the issuer's form (bank list). |

```javascript
yuno.startCheckout({
  issuersFormEnable: true,
})
```

### Mode of form rendering

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Description",
    "0-0": "`renderMode`",
    "0-1": "This parameter is optional. It determines the mode in which the payment forms will be displayed.  \n  \n- `type`: can be one of `modal` or `element`.\n- `elementSelector`: Element where the form will be rendered. Only required if `type `is `element`.",
    "1-0": "`elementSelector`",
    "1-1": "Required only if the type is `element`. Specifies the HTML elements where you want to mount the Yuno SDK. You can specify the elements using one of the following options:  \n  \n- **String (Deprecated)**: Provide the ID or selector of the element where the SDK should be mounted.\n- **Object**: Specify the elements for mounting the APM and action forms. You need to provide the element for the `apmForm`, which is where the APM is displayed, and the element for the `actionForm`, where the Continue Payment button appears. This button triggers a modal that shows the steps to complete a payment with a provider. For example, with PIX, it displays a QR code."
  },
  "cols": 2,
  "rows": 2,
  "align": [
    "left",
    "left"
  ]
}
[/block]


```javascript
yuno.startCheckout({
  renderMode: {
    /**
     * Type can be one of `modal` or `element`
     * By default the system uses 'modal'
     * It is optional
     */
    type: 'modal',
    /**
     * Element where the form will be rendered.
     * It is optional
     * Can be a string (deprecated) or an object with the following structure:
     * {
     *   apmForm: "#form-element",
     *   actionForm: "#action-form-element"
     * }
     */
    elementSelector: {
      apmForm: "#form-element",
      actionForm: "#action-form-element"
    }
  },
})
```

### Card form configurations

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Description",
    "0-0": "`card`",
    "0-1": "Define specific settings for the credit card form:  \n  \n- `type`: `step` or `extends`\n- `styles`: You can edit card form styles. Only you should write css, then it will be injected into the iframe.\n- `cardSaveEnable`: Show checkbox for save/enroll card. The default value is false.\n- `texts`: Custom texts in the Card forms buttons."
  },
  "cols": 2,
  "rows": 1,
  "align": [
    "left",
    "left"
  ]
}
[/block]


```javascript
yuno.startCheckout({
  card: {
    type: "extends",
    styles: '',
    cardSaveEnable: false,
    texts: {}
  },
})
```

#### Save card for future payments

In addition, you can display a checkbox for saving or enrolling cards using the `cardSaveEnable: true`. Below are examples of the checkbox for both card form renders.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/37b2e00b0c6a3d31bceb42b26b1b433c8d30e61d947a93298dd90c466bde004b-complementary-features.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


#### Rendering modes

Below you find screenshots presenting the difference between the following:

- Render modes `modal` and `elements` for the payment method list
- Render modes `step` and `extends` for the credit card form

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b56fe6dfdebaee158495dea86d5269d865fae2dfcb81eb8b34879f9e5e737f0e-caracteristicas_Complemetarias_web_1.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


You also can choose one of the render options for the card form, `step` and `extends`:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/08654f8fa7b638641cb1b9f5b882a75537a9e449fff4960cf560c1ec5b3efb74-caracteristicas_Complemetarias_web_2.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


#### Text payment form buttons

| Parameter | Description                                                                                    |
| :-------- | :--------------------------------------------------------------------------------------------- |
| `texts`   | Provide custom text for payment form buttons to match your application's language or branding. |

```javascript
yuno.startCheckout({
  texts: {
    customerForm?: {
      submitButton?: string;
    }
    paymentOtp?: {
      sendOtpButton?: string;
    }
  }
})
```

#### Persist credit card form to retry payments

If a transaction is rejected, you can use the credit card form to retry a payment after the customer has entered the credit card details. To do that, you will need to:

1. Add the following parameter while initializing the SDK to persist the credit card form after the one-time use token is created:
   ```javascript
   yuno.startCheckout({
     automaticallyUnmount: false,
   })
   ```
2. In case the transaction is rejected, you will need to:
   1. Execute the method `yuno.notifyError() `to delete the previously entered CVV for the first transaction
   2. Create a new checkout session and update the SDK with the new one by executing `yuno.updateCheckoutSession(checkoutsession)`
3. Continue with the new checkout and one-time use token with the regular payment flow.

#### Hide Pay button

You can hide the Pay button when presenting the card or customer data form. To control this feature, you'll set `showPayButton` to `false` when starting the checkout with the `startCheckout` function. The code block below presents an example of how to hide the payment button:

```javascript
yuno.startCheckout({
  /**
   * Hide (false) or show (true) the customer or card form pay button
   * @default true
   * @optional
   */
  showPayButton: false,
})
```

The following images present examples of the Customer Data Form with and without the Pay button:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/873a709f1c3dce3c3dcc13dd4fd3cc9b5a8ecdf812c3b631f3cf8700177cc5cf-Card_boton.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


The following images present examples of the Card Form with and without the Pay button:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b8b5e51ab3f5907786b802cb782a71e043f4ec18475b6e5b6d4dd052c6dc4e37-Card_boton_1.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


If you hide the Pay button, you will need to start the one-time token creation through your code. To create the one-time token and continue the payment in your backend, call the `submitOneTimeTokenForm` function. The code block below presents how to use the `submitOneTimeTokenForm` function.

```javascript
/**
 * This function triggers the same functionality that is called when the customer clicks on the pay form button.  This doesn't work on the step Card form
 */
yuno.submitOneTimeTokenForm()
```

## What's next?

Learn about the additional configurations from the Full SDK accessing [Complementary Features](doc:complementary-features-full-sdk). You can also access other functions available on the Yuno Web SDK:

- [SDK Customizations](doc:sdk-customizations): Change the SDK appearance to match your brand
- [Payment Status](doc:payment-status): Update the user about the payment process
- [3DS Setup SDK](doc:3ds-setup-sdk): Integrate 3DS into your payment flow