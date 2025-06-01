---
title: Seamless (Flutter)
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
This page provides step-by-step instructions for integrating the Seamless Flutter SDK payment functionalities into your application.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <div class=\"contentContainer\">\n        <p>\n          Ensure all <a href=\"/docs/requirements\">required Flutter SDK dependencies</a> are included in your project before following the setup example. \n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 1: Add the SDK Dependency

To add the Yuno SDK to your Flutter project, run the following command:

```dart
 dart pub add yuno
```

## Step 2: Initialize the SDK with the Public Key

Create an instance of `Yuno.init` by providing a valid `PUBLIC_API_KEY`. Refer to the [Yuno documentation](https://docs.y.uno/) for details on obtaining [API credentials](https://docs.y.uno/docs/developers-credentials).

```dart
await Yuno.init(
  apiKey:  'your_api_key_here',
  country_code:  'your_country_code',  //  The  complete  list  of  country_codes  is  available  on  https://docs.y.uno/docs/country-coverage-yuno-sdk
  yunoConfig:  YunoConfig(
    lang:  YunoLanguage.en,  // supported  languages:  ENGLISH,  SPANISH,  PORTUGUESE,  MALAY,  INDONESIAN,  THAI
    cardflow:  CardFlow.multiStep,  //  default  cardflow
    saveCardEnable:  true,  //  default  saveCardEnable
    keepLoader:  true,  //  default  saveCardEnable
  ),
  iosConfig:  IosConfig(),  //  Optional,  can  use  default  value
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


## Step 3: Initialize Seamless SDK

The seamless checkout and payment process is initiated with a single method `Yuno.startPaymentSeamlessLite`. Use it with `async/await`:

```dart
Future<YunoStatus> startPaymentSeamlessLite(
  arguments: SeamlessArguments(
    showPaymentStatus: true, // optional parameter by default is true
    checkoutSession: 'YOUR_CHECKOUT_SESSION',
    methodSelected: MethodSelected(
      vaultedToken: 'YOUR_VAULTED_TOKEN',
      paymentMethodType: 'YOUR_PAYMENT_METHOD_TYPE',
    ),
  )
);

// use
final yunoStatus = await Yuno.startPaymentSeamlessLite(arguments: ...);

```

## Seamless Arguments

| Parameter           | Description                                                                       |
| ------------------- | --------------------------------------------------------------------------------- |
| `showPaymentStatus` | Optional. When `true`, displays the SDK’s default result screen. Default: `true`. |
| `checkoutSession`   | Refers to the current payment's checkout session.                                 |
| `methodSelected`    | Accepts `vaultedToken` and `paymentMethodType` parameters.                        |

## Transaction States

After the payment is completed, the SDK returns different transaction states:

| Transaction State | Description                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `succeeded`       | Transaction completed successfully.                                                          |
| `fail`            | Payment process failed due to an error.                                                      |
| `processing`      | Payment is being processed, awaiting approval.                                               |
| `reject`          | Transaction was rejected due to various reasons (e.g., insufficient funds, fraud detection). |
| `internalError`   | Unexpected error occurred on the backend.                                                    |
| `userCancell`     | User voluntarily canceled the payment.                                                       |

## Additional Features

- **Continue Payment**: Use `continuePayment` to handle asynchronous payment steps if required.
- **Customizations**: Configure SDK appearance, update payment status, or integrate 3DS into your flow.

For a full implementation example, refer to the [Demo App on GitHub](https://github.com/yuno-payments/yuno-flutter-example).