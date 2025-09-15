---
title: Full SDK implementation
deprecated: false
hidden: false
metadata:
  robots: index
---
Follow this step-by-step guide to implement and enable Yuno's Full Web SDK functionality in your application.

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

### Parameters

Below you'll find a list of all the available parameters for the `continuePayment` method, along with a brief description of what each one does.

| Parameter                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`                 | The checkout session for the current payment. Example: `'438413b7-4921-41e4-b8f3-28a5a0141638'`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `elementSelector`                 | The element where the SDK will be mounted.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `countryCode`                     | Specifies the country code for the payment process. Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk) page.                                                                                                                                                                                                                                                                                                                                               |
| `language`                        | Defines the language to be used in the payment forms. You can set it to one of the available language options: <ul><li>es (Spanish)</li><li>en (English)</li><li>pt (Portuguese)</li><li>fil (Filipino)</li><li>id (Indonesian)</li><li>ms (Malay)</li><li>th (Thai)</li><li>zh-TW (Chinese (Traditional, Taiwan)</li><li>zh-CN (Chinese (Simplified, China)</li><li>vi (Vietnamese)</li><li>fr (French)</li><li>pl (Polish)</li><li>it (Italian)</li><li>de (German)</li><li>ru (Russian)</li><li>tr (Turkish)</li><li>nl (Dutch)</li><li>sv (Swedish)</li><li>ko (Korean)</li><li>ja (Japanese)</li></ul> |
| `showPaymentStatus`               | Controls whether to show the Yuno Payment Status page. By default, it's `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `onLoading`                       | Required to receive notifications about server calls or loading events during the payment process.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `showLoading`                     | Control the visibility of the Yuno loading/spinner page during the payment process. By default, it's `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `issuersFormEnable`               | Enables the issuer's form. By default, it's `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `card.isCreditCardProcessingOnly` | Enables you to ensure that all card transactions are processed as credit only. This option is helpful in markets where cards can act as both credit and debit. To enable, set the `isCreditCardProcessingOnly` to `true` to ensure that all card transactions are processed as credit. This parameter is not required.                                                                                                                                                                                                                                                                                      |
| `yunoPaymentMethodSelected`       | Callback function that executes when a payment method is selected by the customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `yunoPaymentResult`               | Callback function that executes when the payment result is obtained. Receives the payment status as a parameter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `yunoError`                       | Callback function that executes when an error occurs during the payment process. Receives the error message and optional additional data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `yunoCreatePayment`               | Callback function that handles the creation of a payment. Receives the one-time token and optionally additional token information.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

#### Implementation example

```javascript
yuno.continuePayment({
  checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
  showPaymentStatus: true,
  countryCode: "FR",
  language: "fr",
  yunoPaymentResult: (status) => {
    console.log("Payment result:", status);
  },
  yunoError: (message, data) => {
    console.error("Payment error:", message, data);
  },
});
```

## Step 1: Include the library in your project

To include the Yuno Web SDK in your project, add the following script tag to your HTML file:

```html
<script src="https://cdn.yuno.com/sdk-web/latest/yuno-sdk-web.js"></script>
```

Alternatively, you can install it via npm:

```bash
npm install @yuno-payments/sdk-web
```

After completing the SDK integration, you can proceed with the following steps to implement the full checkout functionality.

> 📘 TypeScript Library
>
> If you are using TypeScript, Yuno provides a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) to see all methods available in the Yuno Web SDK.

## Step 2: Initialize SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid `PUBLIC_API_KEY`. See the [credentials](https://docs.y.uno/docs/developers-credentials) page for more information.

Use the initialized class that is attributed to the `yuno` constant:

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

## Step 3: Start the checkout process

To start the checkout, you'll use the function `yuno.startCheckout`, providing the necessary parameters.

Refer to the [Parameters table above](#parameters) to see all the options you can use with both `continuePayment` and `startCheckout`.

If you want to customize your integration further or use advanced/optional settings, check out the [Complementary Features](#complementary-features) section for more details.

```javascript
yuno.startCheckout({
  checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
  elementSelector: "#root",
  countryCode: "FR",
  language: "fr",
  showLoading: true,
  issuersFormEnable: true,
  showPaymentStatus: true,
  card: {
    isCreditCardProcessingOnly: true, // true | false | undefined
  },
  onLoading: (args) => {
    console.log(args);
  },
  yunoPaymentMethodSelected: () => {
    console.log("Payment method selected");
  },
  yunoPaymentResult: (status) => {
    console.log("Payment result:", status);
  },
  yunoError: (message, data) => {
    console.error("Payment error:", message, data);
  },
  async yunoCreatePayment(oneTimeToken) {
    await createPayment({ oneTimeToken, checkoutSession });
    yuno.continuePayment({ showPaymentStatus: true });
  },
});
```

> 📘 Rendering Mode
>
> By default, Yuno SDK renders as a modal. However, you can specify the element where the SDK will render. For additional information, access [Render mode](#render-mode) under the complementary features page.

## Step 4: Mount the SDK

Display the payment methods by using:

```javascript
yuno.mountCheckout();
```

To mount with a default payment method selected:

```javascript
yuno.mountCheckout({
  paymentMethodType: PAYMENT_METHOD_TYPE, // 'PAYPAL' | 'PIX' | 'APPLE_PAY' | 'GOOGLE_PAY' | 'CARD'
  vaultedToken: VAULTED_TOKEN,
});
```

## Step 5: Initiate the payment process

After the user has selected a payment method, call `yuno.startPayment()` to initiate the payment flow:

```javascript
const PayButton = document.querySelector("#button-pay");

PayButton.addEventListener("click", () => {
  yuno.startPayment();
});
```

## Step 6: Get the OTT (one-time token)

Once the customer fills out the requested data in Yuno's payment forms, the SDK provides the one-time token. The configuration function `yuno.CreatePayment(oneTimeToken)` is then triggered with the one-time token.

```javascript
yunoCreatePayment(oneTimeToken);
```

You can also use `tokenWithInformation` to receive any additional info given by the customer in the checkout such as installments or document type/number:

```javascript
yunoCreatePayment(oneTimeToken, tokenWithInformation);
```

> ❗️ Loader Management
>
> The merchant is responsible for managing the loader. Yuno provides a default loader option, but merchants may implement their own loader if preferred. In that case, they are responsible for making the necessary configurations.

## Step 7: Create the Payment

Once the previous steps are complete, you can proceed to create a payment. Back-to-back payment creation must be performed using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant's backend should call this endpoint to create the payment in Yuno using the one-time token and checkout session.

> 📘 Complete the Integration
>
> After Step 7, you have successfully implemented the basic payment flow. To test your integration, create a test payment using the checkout session and one-time token. For additional features and advanced configurations, see the [Complementary Features](#complementary-features) section below.

> ❗️ ContinuePaymentmethod
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

* [Form loader](#form-loader)
* [Render mode ](#mode-of-form-rendering)
* [Card form configurations ](#card-form-configurations)
  * [Save Card for future payments](#save-card-for-future-payments)
  * [Rendering modes](#rendering-modes)
  * [Text payment form buttons](#text-payment-form-buttons)
  * [Persist credit card form to retry payments](#persist-credit-card-form-to-retry-payments)
  * [Hide Pay button](#hide-pay-button)

### Form loader

Control the use of the [loader](doc:loader).

| Parameter     | Description                                                                                                                                                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `showLoading` | You can hide or show the Yuno loading/spinner page. Enabling this option ensures that the loading component remains displayed until either the `hideLoader()` or `continuePayment()` function is called. The default value is true. |

```javascript
yuno.startCheckout({
  showLoading: true,
});
```

### Issuer's form

| Parameter           | Description                                                                                |
| :------------------ | :----------------------------------------------------------------------------------------- |
| `issuersFormEnable` | Through this parameter, you can configure the SDK to enable the issuer's form (bank list). |

```javascript
yuno.startCheckout({
  issuersFormEnable: true,
});
```

### Render mode

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
    type: "modal", // 'modal' | 'element' (default: 'modal')
    elementSelector: {
      apmForm: "#form-element",
      actionForm: "#action-form-element",
    },
  },
});
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
    styles: "",
    cardSaveEnable: false,
    texts: {},
  },
});
```

### Save card for future payments

In addition, you can display a checkbox for saving or enrolling cards using the `cardSaveEnable: true`. Below are examples of the checkbox for both card form renders.

![](https://files.readme.io/37b2e00b0c6a3d31bceb42b26b1b433c8d30e61d947a93298dd90c466bde004b-complementary-features.png)

### Rendering modes

Below you find screenshots presenting the difference between the following:

* Render modes `modal` and `elements` for the payment method list
* Render modes `step` and `extends` for the credit card form

![](https://files.readme.io/b56fe6dfdebaee158495dea86d5269d865fae2dfcb81eb8b34879f9e5e737f0e-caracteristicas_Complemetarias_web_1.png)

You also can choose one of the render options for the card form, `step` and `extends`:

![](https://files.readme.io/08654f8fa7b638641cb1b9f5b882a75537a9e449fff4960cf560c1ec5b3efb74-caracteristicas_Complemetarias_web_2.png)

### Text payment form buttons

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

### Persist credit card form to retry payments

If a transaction is rejected, you can use the credit card form to retry a payment after the customer has entered the credit card details. To do that, you will need to:

1. Add the following parameter while initializing the SDK to persist the credit card form after the one-time use token is created:
   ```javascript
   yuno.startCheckout({
     automaticallyUnmount: false,
   });
   ```
2. In case the transaction is rejected, you will need to:
   1. Execute the method `yuno.notifyError() `to delete the previously entered CVV for the first transaction
   2. Create a new checkout session and update the SDK with the new one by executing `yuno.updateCheckoutSession(checkoutsession)`
3. Continue with the new checkout and one-time use token with the regular payment flow.

### Hide Pay button

You can hide the Pay button when presenting the card or customer data form. To control this feature, you'll set `showPayButton` to `false` when starting the checkout with the `startCheckout` function:

```javascript
yuno.startCheckout({
  showPayButton: false, // Hide (false) or show (true) the customer or card form pay button
});
```

The following images present examples of the Customer Data Form with and without the Pay button:

![](https://files.readme.io/873a709f1c3dce3c3dcc13dd4fd3cc9b5a8ecdf812c3b631f3cf8700177cc5cf-Card_boton.png)

The following images present examples of the Card Form with and without the Pay button:

![](https://files.readme.io/b56fe6dfdebaee158495dea86d5269d865fae2dfcb81eb8b34879f9e5e737f0e-caracteristicas_Complemetarias_web_1.png)

If you hide the Pay button, you will need to start the one-time token creation through your code. To create the one-time token and continue the payment in your backend, call the `submitOneTimeTokenForm` function:

```javascript
yuno.submitOneTimeTokenForm(); // This function triggers the same functionality that is called when the customer clicks on the pay form button. This doesn't work on the step Card form.
```

#### Optional initialization `options` parameter

This feature is **optional** and is intended for **advanced use cases** where you need to customize how device identification is handled via cookies.

Starting from **Yuno SDK v1.2**, the `Yuno.initialize` function supports a new optional parameter called `options`. This allows for advanced configuration such as customizing the cookie name used for device identification.

### Initialization options

The updated function signature is:

```javascript
const yuno = await Yuno.initialize(publicApiKey, applicationSession, options);
```

* `publicApiKey` (`string`): Your public API key.
* `applicationSession` (`string | undefined`): Optional session ID.
  > **Recommendation:** Leave this as `undefined` so the SDK can generate and manage its own session internally. Only set this if you require a custom session management strategy.
* `options` (`object | undefined`): Optional object for advanced configuration.

### Options structure

The `options` object supports the following shape:

```javascript
const options = {
  cookies: {
    deviceId: {
      name: "customCookieName", // Overrides the default cookie name used for device ID
    },
  },
};
```

> **Note:** If `deviceId.name` is not specified, the SDK defaults to `"yuno"` as the cookie name.

### Implementation example

```javascript
const publicApiKey = "your-public-api-key";
const options = {
  cookies: {
    deviceId: {
      name: "custom-device-id",
    },
  },
};

// Recommended: omit the second parameter or set it to undefined
const yuno = await Yuno.initialize(publicApiKey, undefined, options);
```

## What's next?

Learn about the additional configurations from the Full SDK accessing [Complementary Features](doc:complementary-features-full-sdk). You can also access other functions available on the Yuno Web SDK:

* [SDK Customizations](doc:sdk-customizations): Change the SDK appearance to match your brand
* [Payment Status](doc:payment-status): Update the user about the payment process
* [3DS Setup SDK](doc:3ds-setup-sdk): Integrate 3DS into your payment flow
