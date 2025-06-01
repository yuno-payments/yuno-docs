---
title: Lite SDK (Payment Flutter)
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
This page outlines the steps to integrate the Lite Flutter SDK payment functionalities into your project. Follow these instructions to add, configure, and use the Yuno Flutter SDK.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tEnsure all required Flutter SDK dependencies are included in your project before following the setup example. \n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 1: Add the SDK Dependency

To add the Yuno SDK to your Flutter project, run the following command:

```dart
dart pub add yuno
```

## Step 2: Initialize the SDK with a Public Key

Create an instance of `Yuno.init` by providing a valid `PUBLIC_API_KEY`. Please refer to the [Yuno documentation](https://docs.y.uno/) for details on obtaining [API credentials](https://docs.y.uno/docs/developers-credentials).

```dart
await Yuno.init(
  apiKey: 'your_api_key_here',
  country_code: 'your_country_code',  // The complete list of country codes is available at https://docs.y.uno/docs/country-coverage-yuno-sdk
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


## Step 3: Start Payment Lite

After setting up the SDK, use the `Yuno.startPaymentLite` method to initiate the payment process with the selected parameters, as shown in the following code snippet:

```dart
import 'package:yuno/yuno.dart';

void initiatePayment() async {
  // Define the payment method with required values
  final methodSelected = MethodSelected(
    vaultedToken: 'your_vaulted_token',       // The token for the selected payment method
    paymentMethodType: 'your_payment_method', // The type of payment method (e.g., 'credit_card')
  );

  // Start the payment process
  await Yuno.startPaymentLite(
    arguments: StartPayment(
      checkoutSession: 'your_checkout_session_id', // Current payment's checkout session
      showPaymentStatus: true,                     // Set to true to display payment status
      methodSelected: methodSelected,              // Payment method selection
    ),
    country_code: 'your_country_code',              // Customer's country code
  );
}
```

The functions used in `Yuno.startPaymentLite` are described in the table below.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Description",
    "0-0": "`checkoutSession`",
    "0-1": "Unique identifier for the current payment's checkout session. This is generated when calling the [Create Payment endpoint](ref:create-payment).",
    "1-0": "`showPaymentStatus`",
    "1-1": "Boolean to determine if payment status should be displayed (`true`) or not (`false`).",
    "2-0": "`methodSelected`",
    "2-1": "An instance of `MethodSelected` that includes:  \n  \n- `paymentMethodType`: Type of payment method selected by the customer. For the complete available options, access the [Payment types](ref:payment-type-list)  page.\n- `VaultedToken`:  The vaulted token from a previously enrolled payment method."
  },
  "cols": 2,
  "rows": 3,
  "align": [
    null,
    null
  ]
}
[/block]


By using the `methodSelected` parameter, the merchant specifies the payment method chosen by the customer. 

## Step 4: Retrieve the one-time token (OTT)

Use the `YunoPaymentListener` widget to listen for updates in the payment process and retrieve the one-time token after the customer has entered their information.

```dart
YunoPaymentListener(
  listener: (state) {
    // Handle [state] - it is YunoState with [String token] and [PaymentStatus status]
    // - [token]: one-time token
    // - [paymentStatus]: [reject, succeeded, fail, processing, internalError, cancelByUser]
  },
  child: SomeWidget(),
)
```

## Step 5: Create the Payment

Once you have obtained the one-time token, create the payment using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment), using both the one-time token and the checkout session.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Continue method</h3>\n      <div class=\"contentContainer\">\n        <p>\n          Yuno <b>requires</b> you integrate the <code>continuePayment</code> method of the SDK after the payment is created because certain asynchronous payment methods require additional action from the customer to complete it. The API will inform you of this scenario via the <code>sdk_action_required</code> field of the response, which will be returned as true. The <code>yuno.continuePayment()</code> function will display the additional screens to the customers, where they can carry out the necessary actions to complete the payment without needing you to handle every scenario.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


Some asynchronous payment methods require additional customer actions after the payment initiation. The response from the Create Payment endpoint will indicate this with the `sdk_action_required` attribute, which will be set to `true` if further action is needed. When this occurs, you can use the `Yuno.continuePayment()` function to guide the customer through the necessary steps:

```dart
Yuno.continuePayment(showPaymentStatus: true)
```

The `Yuno.continuePayment(showPaymentStatus: true)` method does not return any data. It displays additional screens in the mobile app where the customer can complete the required actions. If `sdk_action_required` is `false`, this step is not necessary, and you can proceed without calling `continuePayment`.

### Callback

After the payment is completed, the SDK can return different transaction states. The descriptions of each transaction state is presented in the table below.

| Transaction State | Description                                                                                                                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `succeeded`       | Indicates that the transaction or payment process has been completed successfully.                                                                                                                                                              |
| `fail`            | Indicates that the transaction or payment process has failed. This means there was an error or issue during the payment process, preventing it from being completed successfully.                                                               |
| `processing`      | Indicates that the transaction or payment process is currently being processed. This state is typically used when there is a delay in processing the payment, such as waiting for approval from a third-party service or financial institution. |
| `reject`          | Indicates that the transaction has been rejected. This rejection can occur for various reasons, such as insufficient funds, fraudulent activity, or a request that violates specific rules or policies.                                         |
| `internalError`   | Suggests that an unexpected error occurred within the system or infrastructure handling the payment process. This indicates a problem on the server or backend side rather than an issue with the user's input or request.                      |
| `userCancell`     | Indicates that the user has voluntarily canceled or aborted the transaction or payment process. This state is typically used when there is an option for the user to cancel or abandon the payment process.                                     |

## Complementary Features

The SDK offers additional features to enhance customer experience, including appearance customization, payment status updates, and 3DS integration. Refer to the [SDK Customizations](https://docs.y.uno/docs/sdk-customization) page for more details.