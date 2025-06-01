---
title: Test Page
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
This guide provides a step-by-step approach to integrating the Lite Flutter SDK for enrollment functionalities into your application.

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

## **Step 1: Add the SDK Dependency**

To add the Yuno SDK to your Flutter project, run the following command:

```sh
dart pub add yuno
```

## **Step 2: Initialize the SDK with the Public Key**

Create an instance of `Yuno.init` by providing a valid `PUBLIC_API_KEY`. Refer to the [Yuno documentation](https://docs.y.uno/) for details on obtaining [API credentials](https://docs.y.uno/docs/developers-credentials).

```dart
await Yuno.init(
  apiKey: 'your_api_key_here', // Your unique public API key for authentication
  countryCode: 'your_country_code', // The user’s country code (ISO 3166-1 alpha-2)
  yunoConfig: YunoConfig(
    lang: YunoLanguage.en, // Language for SDK content (en, es, pt, ms, id, th)
    cardflow: CardFlow.multiStep, // Default card flow
    saveCardEnable: true, // Enables the "Save Card" option (default: true)
    keepLoader: true, // Keeps the loader visible (default: true)
  ),
  iosConfig: IosConfig(), // Optional, can use default value
);
```

Below is a table describing the parameters required for initializing the Yuno SDK in your Flutter application. These settings allow you to customize the SDK behavior to align with your application needs.

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
        `countryCode`
      </td>
      <td>
        The user’s country code (ISO 3166-1 alpha-2). Refer to the [Country Coverage](https://docs.y.uno/docs/country-coverage-yuno-sdk) page for supported countries.
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
        The language for SDK content: <br> `en` - English <br> `es` - Spanish <br> `pt` - Portuguese <br> `ms` - Malay <br> `id` - Indonesian <br> `th` - Thai
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
</Table>

## **Step 3: Add the SDK Widget Handler**

Integrate `YunoEnrollmentListener` to track and manage enrollment state changes in your application.

```dart
YunoEnrollmentListener(
  listener: (state) {
    // Handle [state] as YunoEnrollmentState
    // Possible values: [success, fail, processing, reject, internalError, cancelByUser]
  },
  child: SomeWidget(),
);
```

## **Step 4: Enroll a New Payment Method**

To enroll a new payment method, use the `enrollmentPayment` method:

```dart
await Yuno.enrollmentPayment(
  arguments: EnrollmentArguments(
    customerSession: 'YOUR_CUSTOMER_SESSION',
    showPaymentStatus: true, // Optional, defaults to true
    countryCode: 'your_country_code', // Optional, defaults to the value set during initialization
  ),
);
```

The following table presents all the required parameters and their descriptions.

| Parameter           | Description                                                                                                                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customerSession`   | Refers to the current payment's customer session.                                                                                                                                                   |
| `countryCode`       | Determines the country for the payment process. Defaults to the value set during initialization. See [Country Coverage](https://docs.y.uno/docs/country-coverage-yuno-sdk) for supported countries. |
| `showPaymentStatus` | Boolean flag that determines whether to display status views during the payment enrollment process. Defaults to `true`.                                                                             |

## **Step 5: Enrollment Status**

The possible enrollment states are listed below:

| Status            | Description                                                             |
| ----------------- | ----------------------------------------------------------------------- |
| **success**       | The enrollment was completed successfully.                              |
| **fail**          | The enrollment process failed due to an error during the payment.       |
| **processing**    | The enrollment is in progress, possibly awaiting third-party approval.  |
| **reject**        | The enrollment was rejected due to insufficient funds or policy issues. |
| **internalError** | An unexpected system error occurred during enrollment.                  |
| **cancelByUser**  | The user voluntarily canceled the enrollment before completion.         |

## **Complementary Features**

The **Yuno Flutter SDK** offers additional features to enhance the customer experience. You can check the current enrollment configurations and use [SDK Customizations](https://docs.y.uno/docs/sdk-customization) to modify the appearance, match your brand, or adjust the loader settings.