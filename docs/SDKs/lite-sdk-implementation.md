---
title: Lite SDK implementation
deprecated: false
hidden: true
metadata:
  robots: index
---
This page provides a step-by-step guide to implement and enable Yuno's Lite Web SDK functionality in your application.

> 📘 Changelog Reference:
>
> This guide covers the current SDK version. For details on previous versions, see the [changelog](https://docs.y.uno/changelog/lite-web-sdk-v12-changelog).

## Step 1: Include the library in your project

Add the following script tag to your HTML file to include the Yuno Web SDK:

```html
<script src="https://sdk-web.y.uno/v1.5/main.js"></script>
```

Alternatively, you can install it via npm:

```bash
npm install @yuno-payments/sdk-web
```

After completing the SDK integration, proceed with the following steps to implement the lite checkout functionality.

> 📘 TypeScript Library
>
> If you are using TypeScript, Yuno provides a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) to see all methods available in the Yuno Web SDK.

## Step 2: Initialize SDK with the public key

Create an instance of the `Yuno` class by providing a valid `PUBLIC_API_KEY`. See the [credentials](../docs/developers-credentials) page for more information.

Initialize the SDK with your public API key:

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

## Step 3: Start the checkout process

Use the `yuno.startCheckout` function to start the checkout process with the necessary parameters.

See the [Parameters table below](#parameters) for all the options you can use with `startCheckout`.

For further customization or advanced/optional settings, see the [Complementary Features](#complementary-features) section.

### Parameters

The following table lists all the available parameters for the `startCheckout` method with descriptions:

| Parameter                         | Description                                                                                                                                                                                                       |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`                 | Refers to the current payment's [checkout session](ref:create-checkout-session). Example: `438413b7-4921-41e4-b8f3-28a5a0141638`                                                                                  |
| `elementSelector`                 | The element where the SDK will be mounted.                                                                                                                                                                        |
| `country_code`                    | Determines the country for which the payment process is being configured. See [Country coverage](doc:quickstart) for supported countries and their codes.                                          |
| `language`                        | Defines the language for payment forms. Options: <ul><li>es (Spanish)</li><li>en (English)</li><li>pt (Portuguese)</li><li>fil (Filipino)</li><li>id (Indonesian)</li><li>ms (Malay)</li><li>th (Thai)</li><li>tr (Turkish)</li></ul>. |
| `onLoading`                       | Callback function to receive notifications about server calls or loading events during the payment process.                                                                                                       |
| `showLoading`                     | Controls visibility of Yuno loading/spinner page during payment process. Default: `true`.                                                                                                                         |
| `issuersFormEnable`               | Enables the issuer's form. Default: `true`.                                                                                                                                                                       |
| `showPaymentStatus`               | Shows Yuno Payment Status page. Can be used when continuing a payment. Default: `true`.                                                                                                                           |
| `card.isCreditCardProcessingOnly` | Optional. When `true`, ensures all card transactions are processed as credit only. Useful in markets where cards can act as both credit and debit.                                                                |

```javascript
yuno.startCheckout({
  checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
  elementSelector: "#root",
  country_code: "FR",
  language: "fr",
  showLoading: true,
  issuersFormEnable: true,
  showPaymentStatus: true,
  onLoading: (args) => {
    console.log(args);
  },
  async yunoCreatePayment(oneTimeToken) {
    await createPayment({ oneTimeToken, checkoutSession });
    yuno.continuePayment({ showPaymentStatus: true });
  },
});
```

> 📘 Transaction Types
>
> Payments can be initiated by the customer (CIT) or by the merchant (MIT). You can find more information about their characteristics in [Stored credentials](../docs/stored-credentials).
>
> The step-by-step on this page refers to a customer-initiated transaction without the recurrence option. Typically, it's used in one-time online purchases, in-store purchases, ATM withdrawals, etc.

## Step 4: Mount the SDK

Mount the SDK to present the checkout based on the payment method selected by your customer. Remember, when using the Lite SDK, you're responsible for displaying the payment methods and capturing the customer's selection. See [Lite SDK (Payment)](doc:quickstart) for additional information.

Use the `yuno.mountCheckoutLite()` function to display the checkout for the selected payment method:

```javascript
yuno.mountCheckoutLite({
  paymentMethodType: PAYMENT_METHOD_TYPE,
  vaultedToken: VAULTED_TOKEN,
});
```

After mounting the SDK, the selected payment method flow will start automatically.

## Step 5: Initiate the payment process

Call `yuno.startPayment()` to initiate the payment flow after the user selects a payment method:

```javascript
const PayButton = document.querySelector("#button-pay");

PayButton.addEventListener("click", () => {
  yuno.startPayment();
});
```

## Step 6: Get the OTT (one-time token)

After the customer fills out the requested data in Yuno's payment forms, the SDK provides the one-time token. The configuration function `yunoCreatePayment(oneTimeToken)` is then triggered with the one-time token.

```javascript
yunoCreatePayment(oneTimeToken);
```

You can also use `tokenWithInformation` to receive additional information provided by the customer in the checkout, such as installments or document type/number:

```javascript
yunoCreatePayment(oneTimeToken, tokenWithInformation);
```

> 📘 Loader Management
>
> The merchant is responsible for managing the loader. Yuno provides a default loader option, but merchants may implement their own loader if preferred. In that case, they are responsible for making the necessary configurations.

## Step 7: Create the Payment

After completing the previous steps, proceed to create a payment. Back-to-back payment creation must be performed using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant's backend should call this endpoint to create the payment in Yuno using the one-time token and checkout session.

> 📘 Complete the Integration
>
> After Step 7, you have successfully implemented the basic payment flow. To test your integration, create a test payment using the checkout session and one-time token. For additional features and advanced configurations, see the [Complementary Features](#complementary-features) section below.

> ❗️ ContinuePaymentmethod
>
> After creating a payment, Yuno **requires** you to integrate the `continuePayment` method from the SDK. This is necessary because some asynchronous payment methods require additional customer actions to complete the process. The API response will indicate this scenario by setting the `sdk_action_required` field to true. When this occurs, you must call `yuno.continuePayment()`, which will automatically present the necessary screens to the customer, allowing them to complete the payment flow without requiring you to handle each case manually.

## Complementary features

Yuno Web SDK provides additional services and configurations you can use to improve customers' experience:

* [Form loader](#form-loader)
* [Render mode ](#render-mode)
* [Card form configurations ](#card-form-configurations)
  * [Save Card for future payments](#save-card-for-future-payments)
  * [Rendering modes](#rendering-modes)
  * [Text payment form buttons](#text-payment-form-buttons)
  * [Persist credit card form to retry payments](#persist-credit-card-form-to-retry-payments)
  * [Hide Pay button](#hide-pay-button)

### Form loader

Control the use of the loader:

| Parameter     | Description                                                                                                                                                                                                                         |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `showLoading` | You can hide or show the Yuno loading/spinner page. Enabling this option ensures that the loading component remains displayed until either the `hideLoader()` or `continuePayment()` function is called. The default value is true. |

```javascript
yuno.startCheckout({
  showLoading: true,
});
```

### Issuer's form

| Parameter           | Description                                                |
| :------------------ | :--------------------------------------------------------- |
| `issuersFormEnable` | Configure the SDK to enable the issuer's form (bank list): |

```javascript
yuno.startCheckout({
  issuersFormEnable: true,
});
```

### Render mode

> 📘 Enhanced Render Mode in Lite SDK v2.0.0
>
> The enhanced Lite SDK v2.0 provides advanced render mode capabilities that embed Yuno's checkout forms directly within your interface. This gives you complete control over the checkout journey, including loading, status, and payment input screens, with full visual customization and seamless UX integration.

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
        This optional parameter determines how payment forms are displayed.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `type`: Either `'modal'` or `'element'`.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `elementSelector`: Required if `type` is `'element'`. Specifies where to render the form.
      </td>
    </tr>

    <tr>
      <td>
        `elementSelector`
      </td>

      <td>
        Required when `type` is `'element'`. Specifies where to mount the Yuno SDK.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **String** (Deprecated): ID or selector for mounting the SDK.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **Object**: Specify elements for APM and action forms:
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `apmForm`: Element to display the APM.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `actionForm`: Element for the Continue Payment button, which opens a modal for completing provider-specific payment steps.
      </td>
    </tr>
  </tbody>
</Table>

```javascript
yuno.startCheckout({
  renderMode: {
    type: "modal",
    elementSelector: {
      apmForm: "#form-element",
      actionForm: "#action-form-element",
    },
  },
});
```

### Card form configurations

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
        `card`
      </td>

      <td>
        Define specific settings for the credit card form:
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `type`: `step` or `extends`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `styles`: Edit card form styles using your own CSS, injected into the iframe
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `cardSaveEnable`: Show checkbox for save/enroll card (default: false)
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `texts`: Custom texts for the Card form buttons
      </td>
    </tr>
  </tbody>
</Table>

### Save card for future payments

You can display a checkbox for saving or enrolling cards using `cardSaveEnable: true`. The following examples show the checkbox for both card form renders:

<Image border={false} src="https://files.readme.io/bd62c09d3eaf421c95d0df7574f346d99b863383f86cdb3d570d344f7ecf2b3b-complementary-features.png" />

### Rendering modes

The following screenshots show the difference between:

* Render modes `modal` and `elements` for the payment method list
* Render modes `step` and `extends` for the credit card form

<Image border={false} src="https://files.readme.io/6af3c546704cb7a9474fecdf1dc9a139b611ae585ae72074faeb2a6ea3c620b0-caracteristicas_Complemetarias_web_1.png" />

You can also choose one of the render options for the card form, `step` and `extends`:

<Image border={false} src="https://files.readme.io/c9b56c608ae9542d7f78dd8b9406054eee82169a3b8f3c3b22c8338d9b797939-caracteristicas_Complemetarias_web_2.png" />

### Text payment form buttons

| Parameter | Description                                                                                    |
| :-------- | :--------------------------------------------------------------------------------------------- |
| `texts`   | Provide custom text for payment form buttons to match your application's language or branding: |

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

If a transaction is rejected, you can use the credit card form to retry a payment after the customer has entered the credit card details. To do this:

1. Add the following parameter while initializing the SDK to persist the credit card form after the one-time use token is created:
   ```javascript
   yuno.startCheckout({
     automaticallyUnmount: false,
   });
   ```
2. If the transaction is rejected:
   1. Execute the method `yuno.notifyError() `to delete the previously entered CVV for the first transaction.
   2. Create a new checkout session and update the SDK with the new one by executing `yuno.updateCheckoutSession(checkoutsession)`
3. Continue with the new checkout and one-time use token with the regular payment flow.

### Hide Pay button

You can hide the Pay button when presenting the card or customer data form. Set `showPayButton` to `false` when starting the checkout with the `startCheckout` function:

```javascript
yuno.startCheckout({
  showPayButton: false,
});
```

The following images show examples of the Customer Data Form with and without the Pay button:

<Image border={false} src="https://files.readme.io/f2fd10924004e11c3776699fe301afd21259eba255f9329f83e3276c19010b64-Card_boton.png" />

The following images show examples of the Card Form with and without the Pay button:

<Image border={false} src="https://files.readme.io/87bfe55c56266fb1d8ffc7cd1f8648840b06353a960b7d2bb7d27cb174eaae53-Card_boton_1.png" />

If you hide the Pay button, you need to start the one-time token creation through your code. To create the one-time token and continue the payment in your backend, call the `submitOneTimeTokenForm` function:

```javascript
yuno.submitOneTimeTokenForm();
```

#### Optional initialization `options` parameter

This optional feature is intended for advanced use cases where you need to customize how device identification is handled via cookies.

Starting from Yuno SDK v1.2, the `Yuno.initialize` function supports a new optional parameter called `options`. This allows for advanced configuration such as customizing the cookie name used for device identification.

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

The `options` object supports the following structure:

```javascript
const options = {
  cookies: {
    deviceId: {
      name: "customCookieName",
    },
  },
};
```

> If `deviceId.name` is not specified, the SDK defaults to `"yuno"` as the cookie name.

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

const yuno = await Yuno.initialize(publicApiKey, undefined, options);
```

## What's next?

Learn about the additional configurations from the Lite SDK by accessing [Complementary Features](#complementary-features). You can also access other functions available on the Yuno Web SDK:

* [SDK Customizations](doc:sdk-customizations): Change the SDK appearance to match your brand
* [Payment Status](doc:web): Update the user about the payment process

## Stay Updated

Visit the [changelog](https://docs.y.uno/changelog) for the latest SDK updates and version history.