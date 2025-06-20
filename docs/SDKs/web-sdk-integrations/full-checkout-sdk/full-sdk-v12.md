---
title: Full SDK v1.2
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
Follow this step-by-step guide to implement and enable Yuno's Full Web SDK functionality in your application.

## What's new in v1.2.0

Starting from version 1.2.0, the `continuePayment` method now accepts additional properties that were previously only available in `startCheckout`. This allows you to override specific configurations when continuing a payment.

### Enhanced `continuePayment` method

<br />

| Parameter           | Description                                                                                                                                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`   | The checkout session for the current payment. Example: `'438413b7-4921-41e4-b8f3-28a5a0141638'`                                                                                                                                          |
| `showPaymentStatus` | Controls whether to show the Yuno Payment Status page. By default, it's `true`.                                                                                                                                                          |
| `yunoPaymentResult` | Callback function that executes when the payment result is obtained. Receives the payment status as a parameter.                                                                                                                         |
| `yunoError`         | Callback function that executes when an error occurs during the payment process. Receives the error message and optional additional data.                                                                                                |
| `countryCode`       | Specifies the country code for the payment process. Use an `ENUM` value representing the desired country code.                                                                                                                           |
| `language`          | Defines the language to be used in the payment forms. Available options: <ul><li>es (Spanish)</li><li>en (English)</li><li>pt (Portuguese)</li><li>fil (Filipino)</li><li>id (Indonesian)</li><li>ms (Malay)</li><li>th (Thai)</li></ul> |

### Example usage

```javascript
yuno.continuePayment({
  checkoutSession: '438413b7-4921-41e4-b8f3-28a5a0141638',
  showPaymentStatus: true,
  countryCode: 'FR',
  language: 'fr',
  yunoPaymentResult: (status) => {
    console.log('Payment result:', status);
  },
  yunoError: (message, data) => {
    console.error('Payment error:', message, data);
  },
})
```

## Step 1: Include the library in your project

After completing the SDK integration, you can proceed with the following steps to implement the full checkout functionality.

> 📘 TypeScript Library
>
> If you are using TypeScript, Yuno provides a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) to see all methods available in the Yuno Web SDK.

## Step 2: Initialize SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid **PUBLIC\_API\_KEY**. Check the [Get your API credentials](https://docs.y.uno/docs/developers-credentials) guide.

Like the example below, use the initialized class that is attributed to the `yuno`constant.

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY)
```

## Step 3: Start the checkout process

To start the checkout, you'll use the function `yuno.startCheckout`, providing the necessary parameters.

The following table lists all required parameters and their descriptions. For optional parameters, go to [Complementary Features](https://docs.y.uno/docs/full-checkout-sdk#complementary-features).

| Parameter                         | Description                                                                                                                                                                                                                                                                                                            |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`                 | Refers to the current payment's [checkout session](ref:create-checkout-session). Example: `'438413b7-4921-41e4-b8f3-28a5a0141638'`                                                                                                                                                                                     |
| `countryCode`                     | This parameter specifies the country for which the payment process is being set up. Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk) page.                          |
| `language`                        | Defines the language to be used in the payment forms. You can set it to one of the available language options: <ul><li>es (Spanish)</li><li>en (English)</li><li>pt (Portuguese)</li><li>fil (Filipino)</li><li>id (Indonesian)</li><li>ms (Malay)</li><li>th (Thai)</li></ul>                                         |
| `onLoading`                       | Required to receive notifications about server calls or loading events during the payment process.                                                                                                                                                                                                                     |
| `showLoading`                     | Control the visibility of the Yuno loading/spinner page during the payment process. By default, it's `true`.                                                                                                                                                                                                           |
| `issuersFormEnable`               | Enables the issuer's form. By default, it's `true`.                                                                                                                                                                                                                                                                    |
| `showPaymentStatus`               | Shows the Yuno Payment Status page. You can use this option when continuing a payment as well. By default, it's `true`.                                                                                                                                                                                                |
| `card.isCreditCardProcessingOnly` | Enables you to ensure that all card transactions are processed as credit only. This option is helpful in markets where cards can act as both credit and debit. To enable, set the `isCreditCardProcessingOnly` to `true` to ensure that all card transactions are processed as credit. This parameter is not required. |

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

> 📘 Rendering Mode
>
> By default, Yuno SDK renders as a modal. However, you can specify the element where the SDK will render. For additional information, access the [Render mode](#mode-of-form-rendering) under the complementary features page.

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

> ❗️ Loader Management
>
> The merchant is responsible for managing the loader. Yuno provides a default loader option, but merchants may implement their own loader if preferred. In that case, they are responsible for making the necessary configurations.

## Step 7: Create the Payment

Once the previous steps are complete, you can proceed to create a payment. Back-to-back payment creation must be performed using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant's backend should call this endpoint to create the payment in Yuno using the one-time token and checkout session.

> 📘 Complete the Integration
>
> After Step 7, you can complete the end-to-end integration by accessing [Step by Step integration of the Full SDK](https://docs.y.uno/docs/full-sdk-workflow).

> ❗️ Continue Payment Method
>
> After creating a payment, Yuno **requires** you to integrate the `continuePayment` method from the SDK. This is necessary because some asynchronous payment methods require additional customer actions to complete the process. The API response will indicate this scenario by setting the `sdk_action_required` field to true. When this occurs, you must call `yuno.continuePayment()`, which will automatically present the necessary screens to the customer, allowing them to complete the payment flow without requiring you to handle each case manually.

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

> 📘 Demo App
>
> In addition to the code examples provided, you can access the [Demo App](https://docs.y.uno/docs/demo-app) for a complete implementation of Yuno SDKs or go directly to the [HTML](https://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout.html) and [JavaScript](https://github.com/yuno-payments/yuno-sdk-web/blob/main/static/checkout.js) checkout demos available on GitHub.

## Complementary features

Yuno Web SDK provides additional services and configurations you can use to improve customers' experience:

* [Form loader](doc:web-sdk-integration-guide-v11#form-loader)
* [Render mode ](doc:web-sdk-integration-guide-v11#mode-of-form-rendering)
* [Card form configurations ](doc:web-sdk-integration-guide-v11#card-form-configurations)
  * [Save Card for future payments](doc:web-sdk-integration-guide-v11#save-card-for-future-payments)
  * [Rendering modes](doc:web-sdk-integration-guide-v11#rendering-modes)
  * [Text payment form buttons](doc:web-sdk-integration-guide-v11#text-payment-form-buttons)
  * [Persist credit card form to retry payments](doc:web-sdk-integration-guide-v11#persist-credit-card-form-to-retry-payments)
  * [Hide Pay button](doc:web-sdk-integration-guide-v11#hide-pay-button)

### Form loader

Control the use of the [loader](doc:loader).

| Parameter     | Description                                                                                                                                                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `showLoading` | You can hide or show the Yuno loading/spinner page. Enabling this option ensures that the loading component remains displayed until either the `hideLoader()` or `continuePayment()` function is called. The default value is true. |

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

<Table>
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
        `renderMode`
      </td>

      <td>
        This parameter is optional. It determines the mode in which the payment forms will be displayed.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `type`: can be one of `modal` or `element`.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `elementSelector`: Element where the form will be rendered. Only required if `type` is `element`.
      </td>
    </tr>

    <tr>
      <td>
        `elementSelector`
      </td>

      <td>
        Required only if the type is `element`. Specifies the HTML elements where you want to mount the Yuno SDK. You can specify the elements using one of the following options:
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **String (Deprecated)**: Provide the ID or selector of the element where the SDK should be mounted.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **Object**: Specify the elements for mounting the APM and action forms. You need to provide the element for the `apmForm`, which is where the APM is displayed, and the element for the `actionForm`, where the Continue Payment button appears. This button triggers a modal that shows the steps to complete a payment with a provider. For example, with PIX, it displays a QR code.
      </td>
    </tr>
  </tbody>
</Table>

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

| Parameter | Description                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------- |
| `card`    | Define specific settings for the credit card form:                                                                |
|           | **`type`**: `step` or `extends`                                                                                   |
|           | **`styles`**: You can edit card form styles. Only you should write css, then it will be injected into the iframe. |
|           | **`cardSaveEnable`**: Show checkbox for save/enroll card. The default value is false.                             |
|           | **`texts`**: Custom texts in the Card forms buttons.                                                              |

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

![](https://files.readme.io/37b2e00b0c6a3d31bceb42b26b1b433c8d30e61d947a93298dd90c466bde004b-complementary-features.png)

#### Rendering modes

Below you find screenshots presenting the difference between the following:

* Render modes `modal` and `elements` for the payment method list
* Render modes `step` and `extends` for the credit card form

![](https://files.readme.io/b56fe6dfdebaee158495dea86d5269d865fae2dfcb81eb8b34879f9e5e737f0e-caracteristicas_Complemetarias_web_1.png)

You also can choose one of the render options for the card form, `step` and `extends`:

![](https://files.readme.io/08654f8fa7b638641cb1b9f5b882a75537a9e449fff4960cf560c1ec5b3efb74-caracteristicas_Complemetarias_web_2.png)

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

![](https://files.readme.io/873a709f1c3dce3c3dcc13dd4fd3cc9b5a8ecdf812c3b631f3cf8700177cc5cf-Card_boton.png)

The following images present examples of the Card Form with and without the Pay button:

![](https://files.readme.io/b8b5e51ab3f5907786b802cb782a71e043f4ec18475b6e5b6d4dd052c6dc4e37-Card_boton_1.png)

If you hide the Pay button, you will need to start the one-time token creation through your code. To create the one-time token and continue the payment in your backend, call the `submitOneTimeTokenForm` function. The code block below presents how to use the `submitOneTimeTokenForm` function.

```javascript
/**
 * This function triggers the same functionality that is called when the customer clicks on the pay form button.  This doesn't work on the step Card form
 */
yuno.submitOneTimeTokenForm()
```

## What's next?

Learn about the additional configurations from the Full SDK accessing [Complementary Features](doc:complementary-features-full-sdk). You can also access other functions available on the Yuno Web SDK:

* [SDK Customizations](doc:sdk-customizations): Change the SDK appearance to match your brand
* [Payment Status](doc:payment-status): Update the user about the payment process
* [3DS Setup SDK](doc:3ds-setup-sdk): Integrate 3DS into your payment flow