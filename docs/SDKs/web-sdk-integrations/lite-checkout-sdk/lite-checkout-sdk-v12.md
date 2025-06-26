---
title: Lite Web SDK v1.2 (Payment)
deprecated: false
hidden: false
metadata:
  title: Lite SDK (Payment)
  description: >-
    Here, you will find an outline of the step-by-step process to enable the
    Lite SDK functionalities within your system.
  robots: index
---
## What's new in v1.2.0

Starting from version 1.2.0, the `continuePayment` method now accepts additional properties that were previously only available in `startCheckout`. This allows you to override specific configurations when continuing a payment.

### Enhanced `continuePayment` method

The `continuePayment` method can now receive the following new properties:

```typescript
continuePayment({
  checkoutSession?: string
  showPaymentStatus?: boolean
  yunoPaymentResult?: (status: string) => void
  yunoError?: (message: string, data?: unknown) => void
  countryCode?: string
  language?: string
})
```

| Parameter           | Description                                                                                                                                                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `checkoutSession`   | The checkout session for the current payment. Example: `'438413b7-4921-41e4-b8f3-28a5a0141638'`                                                                                                                                                                                |
| `showPaymentStatus` | Controls whether to show the Yuno Payment Status page. By default, it's `true`.                                                                                                                                                                                                |
| `yunoPaymentResult` | Callback function that executes when the payment result is obtained. Receives the payment status as a parameter.                                                                                                                                                               |
| `yunoError`         | Callback function that executes when an error occurs during the payment process. Receives the error message and optional additional data.                                                                                                                                      |
| `countryCode`       | Specifies the country code for the payment process. Use an `ENUM` value representing the desired country code.                                                                                                                                                                 |
| `language`          | Defines the language to be used in the payment forms. You can set it to one of the available language options: <ul><li>es (Spanish)</li><li>en (English)</li><li>pt (Portuguese)</li><li>fil (Filipino)</li><li>id (Indonesian)</li><li>ms (Malay)</li><li>th (Thai)</li></ul> |

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

Follow this step-by-step guide to implement and enable Yuno's Lite Web SDK functionality in your application.

## Step 1: Include the library in your project

Ensure the Yuno SDK file is included in your webpage before closing the `</body>` tag. Refer to the example below:

```html
<script src="https://sdk-web.y.uno/v1.1/static/js/main.min.js"></script>
```

> 📘 TypeScript Support
>
> If you are using TypeScript, Yuno provides a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) that you can use to see all available methods available in the Yuno Web SDK.

## Step 2: Initialize SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid **PUBLIC\_API\_KEY**. Check the [Get your API credentials](doc:developers-credentials) guide.

Like the example below, use the initialized class that is attributed to the `yuno`constant.

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY)
```

## Step 3: Start the checkout process

You will start the checkout process. To do it, use the `yuno.startCheckout` function and provide the necessary parameters.

The following table lists all required parameters and their descriptions. For optional parameters, go to [Complementary Features](doc:lite-checkout-sdk#complementary-features).

| Parameter                         | Description                                                                                                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `checkoutSession`                 | Refers to the current payment's [checkout session](ref:create-checkout-session). Example: '438413b7-4921-41e4-b8f3-28a5a0141638'                                         |
| `country_code`                    | Determines the country for which the payment process is being configured. See [Country coverage](doc:country-coverage-yuno-sdk) for supported countries and their codes. |
| `language`                        | Defines the language for payment forms. Options: 'es' (Spanish), 'en' (English), 'pt' (Portuguese), 'fil' (Filipino), 'id' (Indonesian), 'ms' (Malay), 'th' (Thai).      |
| `onLoading`                       | Callback function to receive notifications about server calls or loading events during the payment process.                                                              |
| `showLoading`                     | Controls visibility of Yuno loading/spinner page during payment process. Default: `true`.                                                                                |
| `issuersFormEnable`               | Enables the issuer's form. Default: `true`.                                                                                                                              |
| `showPaymentStatus`               | Shows Yuno Payment Status page. Can be used when continuing a payment. Default: `true`.                                                                                  |
| `card.isCreditCardProcessingOnly` | Optional. When `true`, ensures all card transactions are processed as credit only. Useful in markets where cards can act as both credit and debit.                       |

```javascript
yuno.startCheckout({
  checkoutSession: '438413b7-4921-41e4-b8f3-28a5a0141638',
  country_code: "FR",
  language: 'fr',
  showLoading: true,
  issuersFormEnable: true,
  showPaymentStatus: true,
  onLoading: (args) => {
    console.log(args);
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

> 📘 Transaction Types
>
> Payments can be initiated by the customer (CIT) or by the merchant (MIT). You find more information about their characteristics in [Stored credentials](/docs/stored-credentials).
>
> The step-by-step presented on this page refers to a customer-initiated transaction without the recurrence option. Typically, it's used in one-time online purchases, in-store purchases, ATM withdrawals, etc.

## Step 4: Mount the SDK

Next, you have to mount the SDK, presenting the checkout based on the payment method selected by your customer. Remember, when using the Lite SDK, you're responsible for displaying the payment methods and capturing the customer's selection. Access [Lite SDK (Payment)](doc:the-ultimate-checkout-lite) for additional information.

Use the `yuno.mountCheckoutLite()` function by selecting an HTML element and using a valid CSS selector (`#`, `.`, `[data-*]`) to display the checkout for the selected payment method.

```javascript
yuno.mountCheckoutLite({
  /**
   * can be one of 'PAYPAL' | 'PIX' | 'APPLE_PAY' | 'GOOGLE_PAY' | CARD
   */
  paymentMethodType: PAYMENT_METHOD_TYPE,
  /**
   * Vaulted token related to payment method type.
   * Only if you already have it
   * @optional 
   */
  vaultedToken: VAULTED_TOKEN,
})
```

After mounting the SDK, the selected payment method flow will start automatically.

## Step 5: Initiate the payment process

After the user has selected a payment method, remember to call `yuno.startPayment()` to initiate the payment flow. Below, you will find an example where `yuno.startPayment()` is called when the user clicks on `button-pay`:

```javascript
const PayButton = document.querySelector('#button-pay')

PayButton.addEventListener('click', () => {
  yuno.startPayment()
})
```

## Step 6: Get the OTT (one-time token)

Once the customer fills out the requested data in Yuno's payment forms, the SDK provides the one-time token. The configuration function `yunoCreatePayment(oneTimeToken)` is then triggered with the one-time token.

```javascript
yunoCreatePayment(oneTimeToken)
```

You can also use `tokenWithInformation` to receive any additional info the customer gives at checkout, such as installments or document type/number.

```javascript
yunoCreatePayment(oneTimeToken, tokenWithInformation)
```

> 📘 Loader Management
>
> The merchant is responsible for managing the loader. Yuno provides a default loader option, but merchants may implement their own loader if preferred. In that case, they are responsible for making the necessary configurations.

## Step 7: Create the Payment

Once you have completed the steps described before, you will be able to create a payment. The back-to-back payment creation must be carried out using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant should call their backend to create the payment within Yuno, using the one-time token and the checkout session.

> 📘 Continue Payment Method
>
> Yuno recommends integrating the `continuePayment` method of the SDK after the payment is created. This is because certain asynchronous payment methods require additional action from the customer to complete the payment. The API will inform you of this scenario via the `sdk_action_required` field of the response, which will be returned as true. The `yuno.continuePayment()` function will display additional screens to customers, where they can carry out the necessary actions to complete the payment. If `sdk_action_required` is false, this step is not necessary.

## Complementary features

Yuno Web SDK provides additional services and configurations you can use to improve customers' experience:

* [Form loader](doc:lite-checkout-sdk#loader)
* [Bank Issuer List](doc:lite-checkout-sdk#form-of-the-issuer)
* [Render mode ](doc:lite-checkout-sdk#mode-of-form-rendering)
* [Card form configurations ](doc:lite-checkout-sdk#card-form-configurations)
  * [Save Card for future payments](doc:lite-checkout-sdk#save-card-for-future-payments)
  * [Render mode](doc:lite-checkout-sdk#rendering-modes)
  * [Text payment form buttons](doc:lite-checkout-sdk#text-payment-form-buttons)
  * [Persist credit card form to retry payments](doc:lite-checkout-sdk#persist-credit-card-form-to-retry-payments)
  * [Hide Pay button](doc:lite-checkout-sdk#hide-pay-button)

### Loader

Control the use of the [loader](doc:loader).

| Parameter     | Description                                                                                                                                                                                                                         |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
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

> 📘 Enhanced Render Mode in Lite SDK v2.0.0
>
> The enhanced Lite SDK v2.0 provides advanced render mode capabilities that embed Yuno's checkout forms directly within your interface. This gives you complete control over the checkout journey, including loading, status, and payment input screens, with full visual customization and seamless UX integration.

| Parameter         | Description                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `renderMode`      | This optional parameter determines how payment forms are displayed:\<br>• `type`: Either 'modal' or 'element'\<br>• `elementSelector`: Required if `type` is 'element'. Specifies where to render the form.                                                                                                                                                                               |
| `elementSelector` | Required when `type` is 'element'. Specifies where to mount the Yuno SDK:\<br>• **String** (Deprecated): ID or selector for mounting the SDK\<br>• **Object**: Specify elements for APM and action forms:\<br>  - `apmForm`: Element to display the APM\<br>  - `actionForm`: Element for the Continue Payment button, which opens a modal for completing provider-specific payment steps |

```javascript
yuno.startCheckout({
  renderMode: 

 
```

### Card form configurations

| Parameter | Description                                                                                                                                                                                                                                                                                                                                                 |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `card`    | Define specific settings for the credit card form:\<br>\<br>• `type`: `step` o `extends`\<br>• `styles`: You can edit card form styles. Only you should write css, then it will be injected into the iframe.\<br>• `cardSaveEnable`: Show checkbox for save/enroll card. The default value is false.\<br>• `texts`: Custom texts in the Card forms buttons. |

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

![](https://files.readme.io/bd62c09d3eaf421c95d0df7574f346d99b863383f86cdb3d570d344f7ecf2b3b-complementary-features.png)

#### Rendering modes

Below you find screenshots presenting the difference between the following:

* Render modes `modal` and `elements` for the payment method list
* Render modes `step` and `extends` for the credit card form

![](https://files.readme.io/6af3c546704cb7a9474fecdf1dc9a139b611ae585ae72074faeb2a6ea3c620b0-caracteristicas_Complemetarias_web_1.png)

You also can choose one of the render options for the card form, `step` and `extends`:

![](https://files.readme.io/c9b56c608ae9542d7f78dd8b9406054eee82169a3b8f3c3b22c8338d9b797939-caracteristicas_Complemetarias_web_2.png)

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
   1. Execute the method `yuno.notifyError() `to delete the previously entered CVV for the first transaction.
   2. Create a new checkout session and update the SDK with the new one by executing `yuno.updateCheckoutSession(checkoutsession)`
3. Continue with the new checkout and one-time use token with the regular payment flow.

#### Hide Pay button

You can hide the Pay button when presenting the Card or Customer Data Forms. To control this feature, you'll set `showPayButton` to `false` when starting the checkout with the `startCheckout` function. The code block below presents an example of how to hide the payment button:

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

![](https://files.readme.io/f2fd10924004e11c3776699fe301afd21259eba255f9329f83e3276c19010b64-Card_boton.png)

The following images present examples of the Card Form with and without the Pay button:

![](https://files.readme.io/87bfe55c56266fb1d8ffc7cd1f8648840b06353a960b7d2bb7d27cb174eaae53-Card_boton_1.png)

If you hide the Pay button, you will need to start the one-time token creation through your code. To create the one-time token and continue the payment in your backend, call the `submitOneTimeTokenForm` function. The code block below presents how to use the `submitOneTimeTokenForm` function.

```javascript
/**
 * This function triggers the same functionality that is called when the customer clicks on the pay form button. This approach does not work if you choosed step for rendering mode.
 */
yuno.submitOneTimeTokenForm()
```

## What's next?

Learn about the additional configurations from the Lite SDK accessing [Complementary Features](doc:lite-checkout-sdk#complementary-features). You can also access other functions available on the Yuno Web SDK:

* [SDK Customizations](doc:sdk-customizations): Change the SDK appearance to match your brand

* [Payment Status](doc:payment-status): Update the user about the payment process