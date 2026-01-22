---
title: Web Full
deprecated: false
hidden: false
metadata:
  robots: index
---
## Step 3: Start the checkout process

Use the `yuno.startCheckout` function to start the checkout process with the necessary parameters.

See the [Parameters table below](#parameters) for all the options you can use with `startCheckout`.

For further customization or advanced/optional settings, see the [Complementary Features](#complementary-features) section.

### Parameters

The following table lists all the available parameters for the `startCheckout` method with descriptions:

| Parameter                         | Description                                                                                                                                                                                                                                                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`                 | Refers to the current payment's [checkout session](ref:create-checkout-session). Example: `'438413b7-4921-41e4-b8f3-28a5a0141638'`                                                                                                                                                                                                    |
| `elementSelector`                 | The element where the SDK will be mounted.                                                                                                                                                                                                                                                                                            |
| `countryCode`                     | This parameter specifies the country for which the payment process is being set up. Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk) page.                                         |
| `language`                        | Language for payment forms. Use any code listed in [Supported languages](doc:supported-languages). Example: `en-US`. Defaults to browser language when available.                                                                                                                                                                     |
| `onLoading`                       | Required to receive notifications about server calls or loading events during the payment process.                                                                                                                                                                                                                                    |
| `showLoading`                     | Control the visibility of the Yuno loading/spinner page during the payment process. By default, it's `true`.                                                                                                                                                                                                                          |
| `issuersFormEnable`               | Enables the issuer's form. By default, it's `true`.                                                                                                                                                                                                                                                                                   |
| `showPaymentStatus`               | Shows the Yuno Payment Status page. You can use this option when continuing a payment as well. By default, it's `true`.                                                                                                                                                                                                               |
| `card.isCreditCardProcessingOnly` | Enables you to ensure that all card transactions are processed as credit only. This option is helpful in markets such as Brazil where cards can act as both credit and debit. To enable, set the `isCreditCardProcessingOnly` to `true` to ensure that all card transactions are processed as credit. This parameter is not required. |

```javascript
yuno.startCheckout({
  checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
  elementSelector: "#root",
  countryCode: "FR",
  language: "fr-FR",
  showLoading: true,
  issuersFormEnable: true,
  showPaymentStatus: true,
  card: {
    isCreditCardProcessingOnly: true,
    onChange: ({ error, data }) => {
      if (error) {
        console.log('Card form error:', error);
      } else {
        console.log('Card form data:', data);
      }
    },
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

> 📘 `onPaymentMethodSelected` Event
>
> For all APMs, including Google Pay, Apple Pay, and PayPal, `onPaymentMethodSelected` is triggered as soon as the customer chooses the payment method (before the payment flow begins). Define `onPaymentMethodSelected` in `startCheckout` before `mountCheckout`.

For PayPal, the payment sheet now opens immediately after the shopper selects PayPal—no extra confirmation click required.

> 📘 Google Pay and Apple Pay Display
>
> From SDK version 1.5, Google Pay and Apple Pay appear as direct buttons instead of radio buttons in the payment methods list. They are displayed separately from other payment methods.

## Step 4: Mount the SDK

Display the payment methods:

```javascript
yuno.mountCheckout();
```

Mount with a default payment method selected:

```javascript
yuno.mountCheckout({
  paymentMethodType: PAYMENT_METHOD_TYPE,
  vaultedToken: VAULTED_TOKEN,
});
```

## Step 5: Initiate the payment process

Call `yuno.startPayment()` to initiate the payment flow after the user selects a payment method:

```javascript
const PayButton = document.querySelector("#button-pay");

PayButton.addEventListener("click", () => {
  yuno.startPayment();
});
```

## Step 6: Get the OTT (one-time token)

After the customer fills out the requested data in Yuno's payment forms, the SDK provides the one-time token. The configuration function `yuno.CreatePayment(oneTimeToken)` is then triggered with the one-time token.

```javascript
yunoCreatePayment(oneTimeToken);
```

You can also use `tokenWithInformation` to receive additional information provided by the customer in the checkout, such as installments or document type/number:

```javascript
yunoCreatePayment(oneTimeToken, tokenWithInformation);
```

> ❗️ Loader Management
>
> The merchant is responsible for managing the loader. Yuno provides a default loader option, but merchants may implement their own loader if preferred. In that case, they are responsible for making the necessary configurations.

## Step 7: Create the payment

After completing the previous steps, proceed to create a payment. Back-to-back payment creation must be performed using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant's backend should call this endpoint to create the payment in Yuno using the one-time token and checkout session.

> 📘 Complete the Integration
>
> After Step 7, you have successfully implemented the basic payment flow. To test your integration, create a test payment using the checkout session and one-time token. For additional features and advanced configurations, see the [Complementary Features](#complementary-features) section below.

> ❗️ ContinuePaymentmethod
>
> After creating a payment, Yuno **requires** you to integrate the `continuePayment` method from the SDK. This is necessary because some asynchronous payment methods require additional customer actions to complete the process. The API response will indicate this scenario by setting the `sdk_action_required` field to true. When this occurs, you must call `yuno.continuePayment()`, which will automatically present the necessary screens to the customer, allowing them to complete the payment flow without requiring you to handle each case manually.

## `continuePayment` return value or null

For payment methods that require merchant-side action (e.g., when the payment provider requires a redirect URL in a webview), the `await yuno.continuePayment()` method returns either an object with the following structure or null:

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

When the method returns an object, you can handle your application's payment flows that require custom redirect handling. When it returns null, no additional merchant-side action is needed.
