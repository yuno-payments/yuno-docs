---
title: Full SDK (Flutter)
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
This page provides a step-by-step guide to integrating the Full Flutter SDK functionalities into your application.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tEnsure all required Flutter SDK dependencies are included in your project before following the setup example. \n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 1: Add the SDK Dependency

To add the Yuno SDK to your Flutter project, run the following command:

```dart Dart
dart pub add yuno
```

## Step 2: Initialize the SDK with the Public Key

Create an instance of `Yuno.init` by providing a valid `PUBLIC_API_KEY`. Refer to the [Yuno documentation](https://docs.y.uno/) for details on obtaining [API credentials](https://docs.y.uno/docs/developers-credentials).

```dart Dart
await Yuno.init(
  apiKey: 'your_api_key_here',
  country_code: 'your_country_code',  // Full list of country codes is available at https://docs.y.uno/docs/country-coverage-yuno-sdk
  yunoConfig: YunoConfig(
    lang: YunoLanguage.en, // Supported languages: ENGLISH, SPANISH, PORTUGUESE, MALAY, INDONESIAN, THAI
    cardflow: CardFlow.multiStep, // Default card flow
    saveCardEnable: true, // Default save card option
    keepLoader: true, // Default keep loader option
  ),
  iosConfig: IosConfig(), // Optional, can use default value
);
```

Below is a table describing the parameters required for initializing the Yuno SDK in your Flutter application. These settings allow you to customize the SDK behavior to align with your application needs:

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Description",
    "0-0": "`apiKey`",
    "0-1": "Your unique public API key for authentication.",
    "1-0": "`country_code`",
    "1-1": "The user’s country code. Refer to the [Country Coverage](https://docs.y.uno/docs/country-coverage-yuno-sdk) page for a complete list of supported country codes.",
    "2-0": "`yunoConfig`",
    "2-1": "Configures various SDK settings. Contains additional parameters listed below.",
    "3-0": "`lang`",
    "3-1": "The language for SDK content. Supported options include: <br> `en` - English <br> `es` - Spanish <br> `pt` - Portuguese <br> `ms` - Malay <br> `id` - Indonesian <br> `th` - Thai",
    "4-0": "`cardflow`",
    "4-1": "Defines the card flow type for the payment process. The default is `CardFlow.multiStep`.",
    "5-0": "`saveCardEnable`",
    "5-1": "Specifies whether to enable the \"Save Card\" option. Defaults to `true`.",
    "6-0": "`keepLoader`",
    "6-1": "Controls whether to keep the loader visible. Defaults to `true`.",
    "7-0": "`iosConfig`",
    "7-1": "Optional iOS-specific configurations. If omitted, the default configuration is used."
  },
  "cols": 2,
  "rows": 8,
  "align": [
    null,
    null
  ]
}
[/block]


## Step 3: Add the SDK Widget View

After initializing the SDK, implement the `YunoPaymentMethods` widget in your view to display available payment methods. Use the code below to add it to your layout.

```dart Dart
YunoPaymentMethods(
  config: PaymentMethodConf(
    checkoutSession: 'your_checkout_session_id',
    country_code: 'your_country_code',
    // Add additional configuration options as needed
  ),
  listener: (context, isSelected) {
    if (isSelected) {
      print('A payment method has been selected');
    } else {
      print('No payment method is currently selected');
    }
  },
)
```

The functions used in `YunoPaymentMethods` are described in the table below.

[block:parameters]
{
  "data": {
    "h-0": "Function",
    "h-1": "Description",
    "0-0": "`config`",
    "0-1": "An instance of `PaymentMethodConf` that configures the payment method list based on session and locale. Key properties include:  <br>- `checkoutSession`: Unique identifier for the current checkout session.<br>- `country_code`: User’s country code for displaying relevant payment methods.",
    "1-0": "`listener`",
    "1-1": "Triggered when the payment method selection state changes. Parameters:<br>- `context`: Allows interactions with other UI elements or navigation.<br>- `isSelected`: Boolean indicating whether a payment method is selected (`true`) or not (`false`)."
  },
  "cols": 2,
  "rows": 2,
  "align": [
    null,
    null
  ]
}
[/block]


By using the `listener` callback, the merchant is notified as soon as a customer selects a payment method. This allows the merchant to initiate the payment process immediately upon selection, improving the user experience.

## Step 4: Initiate the Payment Process

Once a payment method is selected, initiate the payment by calling the `Yuno.startPayment` method.

The `isSelected` variable indicates when the merchant has selected a payment option. This variable name, `isSelected`, is customizable by the merchant. 

With `isSelected` set to `true`, proceed with the `Yuno.startPayment` method to initiate the payment process.

```dart Dart
Yuno.startPayment(bool showPaymentStatus)
```

## Step 5: Retrieve the one-time token (OTT)

The `YunoPaymentListener` widget listens for updates in the payment process, specifically to retrieve a one-time token once the customer has completed entering the required information. The one-time token is used to initiate the payment.

```dart Dart
YunoPaymentListener(
  listener: (state) {
    // Handle [state] - it is YunoState with [String token] and [PaymentStatus status]
    // - [token]: one-time token
    // - [paymentStatus]: [reject, succeeded, fail, processing, internalError, cancelByUser]
  },
  child: SomeWidget(),
)
```

Once you have the one-time token, the next step is to create the payment. This process must be handled on the backend by calling Yuno's [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant should call their backend to initiate the payment within Yuno, passing both the one-time token and the checkout session to complete the payment process. 

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tEnsure that your backend is set up to handle this call to Yuno’s Create Payment endpoint for successful payment processing. \n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 6: Create the Payment

Once you have the one-time token, initiate the payment within Yuno by using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment), leveraging both the one-time token and the checkout session. 

After the payment is created, some asynchronous payment methods may require additional customer action. In such cases, the  Create Payment endpoint will indicate this requirement through the `sdk_action_required` field in the response, which will be set to `true`. When this occurs, you should call the `Yuno.continuePayment()` function in your mobile app to display the necessary screens for the customer, where they can complete the required steps for the payment.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Continue method</h3>\n      <div class=\"contentContainer\">\n        <p>\n          Yuno <b>requires</b> you integrate the <code>continuePayment</code> method of the SDK after the payment is created because certain asynchronous payment methods require additional action from the customer to complete it. The API will inform you of this scenario via the <code>sdk_action_required</code> field of the response, which will be returned as true. The <code>yuno.continuePayment()</code> function will display the additional screens to the customers, where they can carry out the necessary actions to complete the payment without needing you to handle every scenario.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


If `sdk_action_required` is `false`, there is no need to call `continuePayment`, and you can proceed without it. 

```dart Dart
Yuno.continuePayment(bool showPaymentStatus)
```

### Callback

After the payment is completed, the SDK can return different transaction states. The table below describes each transaction state.

| Transaction State | Description                                                                                                                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `succeeded`       | Indicates that the transaction or payment process has been completed successfully.                                                                                                                                                              |
| `fail`            | Indicates that the transaction or payment process has failed. This means there was an error or issue during the payment process, preventing it from being completed successfully.                                                               |
| `processing`      | Indicates that the transaction or payment process is currently being processed. This state is typically used when there is a delay in processing the payment, such as waiting for approval from a third-party service or financial institution. |
| `reject`          | Indicates that the transaction has been rejected. This rejection can occur for various reasons, such as insufficient funds, fraudulent activity, or a request that violates specific rules or policies.                                         |
| `internalError`   | Suggests that an unexpected error occurred within the system or infrastructure handling the payment process. This indicates a problem on the server or backend side rather than an issue with the user's input or request.                      |
| `userCancell`     | Indicates that the user has voluntarily canceled or aborted the transaction or payment process. This state is typically used when there is an option for the user to cancel or abandon the payment process.                                     |

### Additional Features

- **Continue Payment**: Use `continuePayment` to handle asynchronous payment steps if required.
- **Customizations**: Configure SDK appearance, update payment status, or integrate 3DS into your flow.

For a full implementation example, refer to the [Demo App on GitHub](https://github.com/yuno-payments/yuno-flutter-example).