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
> 🚧 Deprecated SDK
>
> Yuno’s Flutter SDK is no longer maintained. Refer to our [integration documentation](https://docs.y.uno/docs/choose-the-right-integration-for-you) to choose the best SDK for your project.

This page outlines the steps to integrate the Lite Flutter SDK payment functionalities into your project. Follow these instructions to add, configure, and use the Yuno Flutter SDK.

> 🚧 Prerequisites
>
> Ensure all required Flutter SDK dependencies are included in your project before following the setup example.

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
        `apiKey`
      </td>

      <td>
        Your unique public API key for authentication.
      </td>
    </tr>

    <tr>
      <td>
        `country_code`
      </td>

      <td>
        The user’s country code. Refer to the [Country Coverage](https://docs.y.uno/docs/country-coverage-yuno-sdk) page for a complete list of supported country codes.
      </td>
    </tr>

    <tr>
      <td>
        `yunoConfig`
      </td>

      <td>
        Configures various SDK settings. Contains additional parameters listed below.
      </td>
    </tr>

    <tr>
      <td>
        * `lang`
      </td>

      <td>
        The language for SDK content. Supported options include:
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `en` - English
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `es` - Spanish
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `pt` - Portuguese
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `ms` - Malay
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `id` - Indonesian
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `th` - Thai
      </td>
    </tr>

    <tr>
      <td>
        * `cardflow`
      </td>

      <td>
        Defines the card flow type for the payment process. The default is `CardFlow.multiStep`.
      </td>
    </tr>

    <tr>
      <td>
        * `saveCardEnable`
      </td>

      <td>
        Specifies whether to enable the "Save Card" option. Defaults to `true`.
      </td>
    </tr>

    <tr>
      <td>
        * `keepLoader`
      </td>

      <td>
        Controls whether to keep the loader visible. Defaults to `true`.
      </td>
    </tr>

    <tr>
      <td>
        `iosConfig`
      </td>

      <td>
        Optional iOS-specific configurations. If omitted, the default configuration is used.
      </td>
    </tr>
  </tbody>
</Table>

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
        `checkoutSession`
      </td>

      <td>
        Unique identifier for the current payment's checkout session. This is generated when calling the [Create Payment endpoint](ref:create-payment).
      </td>
    </tr>

    <tr>
      <td>
        `showPaymentStatus`
      </td>

      <td>
        Boolean to determine if payment status should be displayed (`true`) or not (`false`).
      </td>
    </tr>

    <tr>
      <td>
        `methodSelected`
      </td>

      <td>
        An instance of `MethodSelected` that includes:
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `paymentMethodType`: Type of payment method selected by the customer. For the complete available options, access the [Payment types](ref:payment-type-list) page.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `VaultedToken`: The vaulted token from a previously enrolled payment method.
      </td>
    </tr>
  </tbody>
</Table>

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

> 🚧 Important Integration Step
>
> After creating a payment, it is essential to integrate the `continuePayment` method of the Yuno SDK. This step is crucial for handling asynchronous payment methods that may require additional customer actions. Here’s what you need to know:
>
> * **Notification of Requirement**: Certain asynchronous payment methods need additional customer actions to complete. The API will notify you of this requirement via the `sdk_action_required` field in the response, which will be set to true.
> * **Functionality of`yuno.continuePayment()`**: This function will automatically display the necessary screens to guide customers through the completion of their payment. It simplifies the process by managing the required scenarios without additional input from you.

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