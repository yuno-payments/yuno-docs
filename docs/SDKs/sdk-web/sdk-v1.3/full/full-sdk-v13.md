---
title: Full Web SDK v1.3
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

## What's new in v1.3

1. When a customer has an enrolled payment method, other available payment methods are grouped under a "More options" dropdown. The enrolled method is shown prominently by default, and customers can expand the dropdown to choose a different method
2. Added support for multiple Asian and European languages: German, Dutch, Swedish, French, Italian, Japanese, Korean
3. General bug fixes
4. Enhancements to styling and branding

## Step 1: Include the library in your project

After completing the SDK integration, you can proceed with the following steps to implement the full checkout functionality.

> 📘 TypeScript Library
>
> If you are using TypeScript, Yuno provides a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) to see all methods available in the Yuno Web SDK.

## Step 2: Initialize SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid **PUBLIC\_API\_KEY**. Check the [Get your API credentials](https://docs.y.uno/docs/developers-credentials) guide.

Like the example below, use the initialized class that is attributed to the `yuno`constant.

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

## Step 3: Start the checkout process

To start the checkout, you'll use the function `yuno.startCheckout`, providing the necessary parameters.

The following table lists all required parameters and their descriptions. For optional parameters, go to [Complementary Features](https://docs.y.uno/docs/full-checkout-sdk#complementary-features).

| Parameter                         | Description                                                                                                                                                                                                                                                                                                            |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`                 | Refers to the current payment's [checkout session](ref:create-checkout-session). Example: `'438413b7-4921-41e4-b8f3-28a5a0141638'`                                                                                                                                                                                     |
| `elementSelector`                 | The element where the SDK will be mounted.                                                                                                                                                                                                                                                                             |
| `countryCode`                     | This parameter specifies the country for which the payment process is being set up. Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk) page.                          |
| `language`                        | Defines the language to be used in the payment forms. You can set it to one of the available language options: <ul><li>es (Spanish)</li><li>en (English)</li><li>pt (Portuguese)</li><li>fil (Filipino)</li><li>id (Indonesian)</li><li>ms (Malay)</li><li>th (Thai)</li></ul>                                         |
| `onLoading`                       | Required to receive notifications about server calls or loading events during the payment process.                                                                                                                                                                                                                     |
| `showLoading`                     | Control the visibility of the Yuno loading/spinner page during the payment process. By default, it's `true`.                                                                                                                                                                                                           |
| `issuersFormEnable`               | Enables the issuer's form. By default, it's `true`.                                                                                                                                                                                                                                                                    |
| `showPaymentStatus`               | Shows the Yuno Payment Status page. You can use this option when continuing a payment as well. By default, it's `true`.                                                                                                                                                                                                |
| `card.isCreditCardProcessingOnly` | Enables you to ensure that all card transactions are processed as credit only. This option is helpful in markets where cards can act as both credit and debit. To enable, set the `isCreditCardProcessingOnly` to `true` to ensure that all card transactions are processed as credit. This parameter is not required. |

```javascript
yuno.startCheckout({
  checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
  elementSelector: "#root",
  /**
   * The complete list of country codes is available on https://docs.y.uno/docs/country-coverage-yuno-sdk
   */
  countryCode: "FR",
  language: "fr",
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
    console.log("Payment method selected");
  },
  /**
   * Returns the payment result after continuePayment
   * @param {string} status - The payment status
   */
  yunoPaymentResult: (status) => {
    console.log("Payment result:", status);
  },
  /**
   * Executes when there are errors
   * @param {string} message - Error message
   * @param {any} data - Additional error data
   */
  yunoError: (message, data) => {
    console.error("Payment error:", message, data);
  },
  async yunoCreatePayment(oneTimeToken) {
    /**
     * The createPayment function calls the backend to create a payment in Yuno.
     * It uses the following endpoint https://docs.y.uno/reference/create-payment
     */
    await createPayment({ oneTimeToken, checkoutSession });
    yuno.continuePayment({ showPaymentStatus: true });
  },
});
