---
title: Lite SDK (Enrollment Flutter)
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
This page provides a step-by-step guide to integrating the Lite Flutter SDK for enrollment functionalities into your application.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <div class="contentContainer">
        <p>
					Ensure all required Flutter SDK dependencies are included in your project before proceeding with the setup. 
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

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
  country_code: 'your_country_code', // The complete list of country codes is available at: 
                                    // https://docs.y.uno/docs/country-coverage-yuno-sdk
  yunoConfig: YunoConfig(
    lang: YunoLanguage.en, // Supported languages: ENGLISH, SPANISH, PORTUGUESE, MALAY, INDONESIAN, THAI
    cardflow: CardFlow.multiStep, // Default card flow
    saveCardEnable: true, // Default: true
    keepLoader: true, // Default: true
  ),
  iosConfig: IosConfig(), // Optional, can use default value
);

```

Below is a table describing the parameters required for initializing the Yuno SDK in your Flutter application. These settings allow you to customize the SDK behavior to align with your application needs:

<table>
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
        `lang`
      </td>
      <td>
        The language for SDK content. Supported options include: <br/> `en` - English <br/> `es` - Spanish <br/> `pt` - Portuguese <br/> `ms` - Malay <br/> `id` - Indonesian <br/> `th` - Thai
      </td>
    </tr>
    <tr>
      <td>
        `cardflow`
      </td>
      <td>
        Defines the card flow type for the payment process. The default is `CardFlow.multiStep`.
      </td>
    </tr>
    <tr>
      <td>
        `saveCardEnable`
      </td>
      <td>
        Specifies whether to enable the "Save Card" option. Defaults to `true`.
      </td>
    </tr>
    <tr>
      <td>
        `keepLoader`
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
</table>

## Step 3: Add the SDK Widget Handler

Integrate `YunoEnrollmentListener` to track and manage enrollment state changes in your application.

```dart Dart
YunoEnrollmentListener(
  listener: (state) {
    // Handle [state] it is YunoEnrollmentState
    // - [enrollmentStatus]:  [reject,succeded,fail,processing,internalError,cancelByUser]
  },
  child: SomeWidget(),
)

```

## Step 4: Enroll a New Payment Method

To enroll a new payment method, use the `enrollmentPayment` method:

```dart
await Yuno.enrollmentPayment(
  arguments: EnrollmentArguments(
    customerSession: 'YOUR_CUSTOMER_SESSION',
    showPaymentStatus: true, // Optional by default is true,
    country_code: 'your_country_code', // Optional by default the value setted in the initialize,
  ),
);

```

The following table presents all the protocol requirements you have to provide and their descriptions.

| Parameter           | Description                                                                                                                                                                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customerSession`   | Refers to the current payment's customer session.                                                                                                                                                                                                          |
| `country_code`      | Determines the country for the payment process. The complete list of supported countries is available on the [Country coverage](https://docs.y.uno/docs/country-coverage-yuno-sdk) page. By default, it uses the same value you set during initialization. |
| `showPaymentStatus` | A Boolean flag that determines whether to display status views during the payment enrollment process. Defaults to `true`.                                                                                                                                  |

## Step 5: Enrollment Status

The possible enrollment states are listed below:  

| Status          | Description                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| `succeeded`     | The enrollment was completed successfully.                                                                     |
| `fail`          | The enrollment process failed due to an error during the payment process, preventing completion.               |
| `processing`    | The enrollment is in progress, possibly awaiting approval from a third-party service or financial institution. |
| `reject`        | The enrollment was rejected, possibly due to insufficient funds, suspected fraud, or policy violations.        |
| `internalError` | An unexpected system error occurred during the enrollment process.                                             |
| `cancelByUser`  | The user voluntarily canceled the enrollment before completion.                                                |

### Complementary Features

The **Yuno Flutter SDK** offers additional features to enhance the customer experience. You can check the current enrollment configurations and use [SDK Customizations](https://docs.y.uno/docs/sdk-customization) to modify the appearance, match your brand, or adjust the loader settings.