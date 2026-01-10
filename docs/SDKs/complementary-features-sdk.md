---
title: Complementary Features
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
Yuno Web SDK provides additional services and configurations you can use to improve customers' experience:

* [Form loader](doc:complementary-features-full-sdk#loader-control-the-use-of-the-loader)
* [Render mode ](doc:complementary-features-full-sdk#mode-of-form-rendering)
* [Card form configurations ](doc:complementary-features-full-sdk#card-form-configurations)
  * [Save Card for future payments](doc:complementary-features-full-sdk#save-card-for-future-payments)
  * [Render mode](doc:complementary-features-full-sdk#rendering-modes)
  * [Text payment form buttons](doc:complementary-features-full-sdk#text-payment-form-buttons)
  * [Persist credit card form to retry payments](doc:complementary-features-full-sdk#persist-credit-card-form-to-retry-payments)
  * [Hide Pay button](doc:complementary-features-full-sdk#hide-pay-button)
* [Mercado Pago Checkout Pro webview handling](doc:complementary-features-full-sdk#mercado-pago-checkout-pro-webview-handling)
* [Optional initialization `options` parameter](doc:complementary-features-full-sdk#optional-initialization-options-parameter)

## Form loader

Control the use of the loader.

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
        `showLoading`
      </td>

      <td>
        * You can hide or show the Yuno loading/spinner page.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * Enabling this option ensures that the loading component remains displayed until either the `hideLoader()` or `continuePayment()` function is called.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * The default value is true.
      </td>
    </tr>
  </tbody>
</Table>

```javascript
yuno.startCheckout({
  showLoading: true,
})
```

## Form of the issuer

| Parameter           | Description                                                                                |
| :------------------ | :----------------------------------------------------------------------------------------- |
| `issuersFormEnable` | Through this parameter, you can configure the SDK to enable the issuer's form (bank list). |

```javascript
yuno.startCheckout({
  issuersFormEnable: true,
})
```

## Mode of form rendering

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
        * **Object**: Specify the elements for mounting the APM and action forms. You need to provide the element for the `apmForm`, which is where the APM is displayed, and the element for the `actionForm`, where the Continue Payment button appears.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        This button triggers a modal that shows the steps to complete a payment with a provider. For example, with PIX, it displays a QR code.
      </td>
    </tr>
  </tbody>
</Table>

```javascript
yuno.startCheckout({
  renderMode: {
    type: 'modal',
    elementSelector: {
      apmForm: "#form-element",
      actionForm: "#action-form-element"
    } 
  },
})
```

<br />

## Card form configurations

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
        * `styles`: You can edit card form styles. Only you should write css, then it will be injected into the iframe.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `cardSaveEnable`: Show checkbox for save/enroll card. The default value is false.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `texts`: Custom texts in the Card forms buttons.
      </td>
    </tr>
  </tbody>
</Table>

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

### Save card for future payments

In addition, you can display a checkbox for saving or enrolling cards using the `cardSaveEnable: true`. Below are examples of the checkbox for both card form renders.

<Image align="center" border={false} src="https://files.readme.io/37b2e00b0c6a3d31bceb42b26b1b433c8d30e61d947a93298dd90c466bde004b-complementary-features.png" />

### Rendering modes

Below you find screenshots presenting the difference between the following:

* Render modes `modal` and `elements` for the payment method list.
* Render modes `step` and `extends` for the credit card form.

<Image align="center" border={false} src="https://files.readme.io/b56fe6dfdebaee158495dea86d5269d865fae2dfcb81eb8b34879f9e5e737f0e-caracteristicas_Complemetarias_web_1.png" />

You also can choose one of the render options for the card form, `step` and `extends`:

<Image align="center" border={false} src="https://files.readme.io/08654f8fa7b638641cb1b9f5b882a75537a9e449fff4960cf560c1ec5b3efb74-caracteristicas_Complemetarias_web_2.png" />

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
   })
   ```
2. In case the transaction is rejected, you will need to:
   1. Execute the method `yuno.notifyError() `to delete the previously entered CVV for the first transaction.
   2. Create a new checkout session and update the SDK with the new one by executing `yuno.updateCheckoutSession(checkoutsession)`
3. Continue with the new checkout and one-time use token with the regular payment flow.

### Hide Pay button

You can hide the Pay button when presenting the card or customer data form. To control this feature, you'll set `showPayButton` to `false` when starting the checkout with the `startCheckout` function. The code block below presents an example of how to hide the payment button:

```javascript
yuno.startCheckout({
  showPayButton: false,
})
```

The following images present examples of the Customer Data Form with and without the Pay button:

<Image align="center" border={false} src="https://files.readme.io/873a709f1c3dce3c3dcc13dd4fd3cc9b5a8ecdf812c3b631f3cf8700177cc5cf-Card_boton.png" />

The following images present examples of the Card Form with and without the Pay button:

<Image align="center" border={false} src="https://files.readme.io/b8b5e51ab3f5907786b802cb782a71e043f4ec18475b6e5b6d4dd052c6dc4e37-Card_boton_1.png" />

If you hide the Pay button, you will need to start the OTT creation through your code. To create the OTT and continue the payment in your backend, call the `submitOneTimeTokenForm` function. The code block below presents how to use the `submitOneTimeTokenForm` function.

```javascript
yuno.submitOneTimeTokenForm()
```

## Mercado Pago Checkout Pro webview handling

> ❗️ Special Exception
>
> This section describes a special exception for handling Mercado Pago Checkout Pro integration in webview environments. This is the only payment method that requires custom redirect handling, and it is documented here to avoid overwhelming merchants with unnecessary implementation details for other payment methods.

For Mercado Pago Checkout Pro integration in webview environments, the `await yuno.continuePayment()` method will return either an object with redirect information or null. When the method returns an object, it allows you to handle the custom redirect flow required by Mercado Pago Checkout Pro. When it returns null, no additional merchant-side action is needed.

```typescript
{
  action: 'REDIRECT_URL'
  type: 'MERCADO_PAGO_CHECKOUT_PRO'  // Enum value identifying Mercado Pago Checkout Pro
  redirect: {
    init_url: string    // URL to redirect to for completing the payment
    success_url: string // URL to redirect to after successful payment
    error_url: string   // URL to redirect to after failed payment
  }
} | null
```

### Properties

<Table>
  <thead>
    <tr>
      <th>
        Property
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `action`
      </td>

      <td>
        * Always set to `'REDIRECT_URL'` when redirect handling is required.
      </td>
    </tr>

    <tr>
      <td>
        `type`
      </td>

      <td>
        * Enum value `'MERCADO_PAGO_CHECKOUT_PRO'` identifying Mercado Pago Checkout Pro as the payment method requiring custom handling.
      </td>
    </tr>

    <tr>
      <td>
        `init_url`
      </td>

      <td>
        * URL to redirect the customer to for completing the payment with Mercado Pago Checkout Pro.
      </td>
    </tr>

    <tr>
      <td>
        `success_url`
      </td>

      <td>
        * URL to redirect the customer to after a successful payment with Mercado Pago Checkout Pro.
      </td>
    </tr>

    <tr>
      <td>
        `error_url`
      </td>

      <td>
        * URL to redirect the customer to if the payment with Mercado Pago Checkout Pro fails.
      </td>
    </tr>
  </tbody>
</Table>

## Optional initialization `options` parameter

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
      name: "customCookieName" // Overrides the default cookie name used for device ID
    }
  }
};
```

> **Note:** If `deviceId.name` is not specified, the SDK defaults to `"yuno"` as the cookie name.

### Example Usage

```javascript
const publicApiKey = 'your-public-api-key';
const options = {
  cookies: {
    deviceId: {
      name: 'custom-device-id'
    }
  }
};

// Recommended: omit the second parameter or set it to undefined
const yuno = await Yuno.initialize(publicApiKey, undefined, options);
```

This feature is **optional** and is intended for **advanced use cases** where you need to customize how device identification is handled via cookies.

## Card Scanning (OCR)

This feature facilitates credit or debit card form completion by scanning the card with a device's camera. This functionality leverages **Google Pay's official OCR** (Optical Character Recognition) solution, neither Yuno nor Google retains or stores the scanned card details.

The OCR scanner detects the following card details via the device camera:

* **Card Number**
* **Expiration Date** (month and year)

### Prerequisites

To enable the Card Scanning feature, your Android application must meet the following requirements:

1. **SDK Version:** Your application must be using Yuno Android SDK version 2.8.0 or higher.
2. **Camera Permissions:** Your application must request and obtain the necessary camera permissions from the user at runtime, in accordance with standard Android development practices.
3. **Google Pay Availability:** The feature requires your application to have access to the Google Pay Services on the user's device.

### How to activate

To enable the card scanning feature, you must activate it in the Checkout Builder from your Yuno Dashboard:

1. In the [Yuno Dashboard](https://dashboard.y.uno/), navigate to the **Checkout Builder** section.
2. Locate the **Card** payment method and click the three dots icon next to it.
3. Enable the card scanning feature in the payment method settings.
4. Click **Publish settings** to apply the changes.

> 📘 Learn more about Checkout Builder
>
> Visit the [Checkout Builder](doc:checkout-builder) page for additional information.