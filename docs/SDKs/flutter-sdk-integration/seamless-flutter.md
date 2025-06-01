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

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <div class="contentContainer">
        <p>
          Ensure all <a href="/docs/requirements">required Flutter SDK dependencies</a> are included in your project before following the setup example. 
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

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

<Table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`apiKey`</td>
      <td>Your unique public API key for authentication.</td>
    </tr>
    <tr>
      <td>`country_code`</td>
      <td>The user’s country code. Refer to the [Country Coverage](https://docs.y.uno/docs/country-coverage-yuno-sdk) page for a complete list of supported country codes.</td>
    </tr>
    <tr>
      <td>`yunoConfig`</td>
      <td>Configures various SDK settings. Contains additional parameters listed below.</td>
    </tr>
    <tr>
      <td>`lang`</td>
      <td>The language for SDK content. Supported options include: <br> `en` - English <br> `es` - Spanish <br> `pt` - Portuguese <br> `ms` - Malay <br> `id` - Indonesian <br> `th` - Thai</td>
    </tr>
    <tr>
      <td>`cardflow`</td>
      <td>Defines the card flow type for the payment process. The default is `CardFlow.multiStep`.</td>
    </tr>
    <tr>
      <td>`saveCardEnable`</td>
      <td>Specifies whether to enable the "Save Card" option. Defaults to `true`.</td>
    </tr>
    <tr>
      <td>`keepLoader`</td>
      <td>Controls whether to keep the loader visible. Defaults to `true`.</td>
    </tr>
    <tr>
      <td>`iosConfig`</td>
      <td>Optional iOS-specific configurations. If omitted, the default configuration is used.</td>
    </tr>
  </tbody>
</Table>

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

* **Continue Payment**: Use `continuePayment` to handle asynchronous payment steps if required.
* **Customizations**: Configure SDK appearance, update payment status, or integrate 3DS into your flow.

For a full implementation example, refer to the [Demo App on GitHub](https://github.com/yuno-payments/yuno-flutter-example).