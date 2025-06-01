---
title: Seamless SDK (Payment Android)
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
The Yuno Seamless SDK for Android provides a flexible payment solution that combines pre-built UI components with customization options. 

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Recommended SDKs</h3>
      <div class="contentContainer">
        <p>
         We recommend using the <a href="full-checkout-android">Android Full SDK</a> or the <a href="lite-checkout-android">Android Lite SDK</a> for a smooth integration experience. These options provide a complete solution with built-in forms and validation.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

This SDK is ideal for merchants who:

* Want control over the payment flow while leveraging pre-built UI components
* Need to customize the payment experience while maintaining PCI compliance
* Require a balance between implementation speed and customization

The Seamless SDK includes features like:

* Pre-built payment UI components with customization options
* Multiple payment method support
* Advanced payment status handling
* Comprehensive error management

For merchants requiring complete UI control or more advanced features, consider using our [Full SDK](doc:full-sdk-android) instead.

## Requirements

Before starting the Yuno Android SDK integration, make sure your project meets the [technical requirements](doc:requirements-android). In addition, ensure the following prerequisites are in place:

* You must have an active Yuno account.
* To perform the integration, you'll need your Yuno API credentials (`account_id`, `public-api-key`, and `private-secret-key`), which you can obtain from the [Developers section of the Yuno dashboard](https://docs.y.uno/docs/developers-credentials). These credentials are required to authenticate requests to the Yuno API. The API is used to:
  * Create a `customer`, which is required before initiating payments
  * Create a `checkout_session`, which initializes the payment flow
  * Create the payment associated with the session

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>SDK Version</h3>
      <div class="contentContainer">
        <p>
        Access the <a href="release-notes-android-sdk">Release notes</a> or the <a href="https://github.com/yuno-payments/yuno-sdk-android">Yuno Android SDK repository</a> to verify the last SDK version available.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Step 1: Create a customer

Before initiating payments, you need to create a customer using the [Create customer endpoint](ref:create-customer). This step is required to:

* Identify the person making the payment
* Enable saved card functionality (if enabled)
* Track payment history

The customer ID returned from this endpoint will be used when creating the `checkout_session`.

## Step 2: Create a checkout session

To initialize the payment flow, create a new `checkout_session` using the [Create checkout session](ref:create-checkout-session) endpoint. Make sure to:

* Include the customer ID obtained from the previous step
* Store the returned `checkout_session` ID for use in Step 6 of the integration

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Important</h3>
      <div class="contentContainer">
        <p>
        The <code>checkout_session</code> is unique for each payment attempt and cannot be reused.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Step 3: Add SDK to your project

Add the repository source using the following code:

```groovy
maven { url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" }
```

After, include the code below in the file `build.gradle` to add the Yuno SDK dependency to the application.

```kotlin
dependencies {
    implementation 'com.yuno.payments:android-sdk:{last_version}'
}
```

## Step 4: Configure permissions

The Yuno SDK requires network permissions. Ensure the `INTERNET` permission is included in your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## Step 5: Initialize SDK

First, you retrieve your public API keys from the [Yuno dashboard](https://dashboard.y.uno/).

If you haven't implemented a custom application, create one. In the `onCreate()` method of your application class, call the initialize function (`Yuno.initialize`) as shown in the example below:

```kotlin
class CustomApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Yuno.initialize(
            this,
            "your api key",
            config = YunoConfig() // Customize configurations if needed
        )
    }
}
```

Use the `YunoConfig` data class to set additional configurations for the SDK. The customization options are listed and described in the following table:

<Table>
  <thead>
    <tr>
      <th>
        Option
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **cardFlow**
      </td>

      <td>
        Defines the card form flow. The default option is `CardFormType.ONE_STEP`. Check the section [Render options](#render-options)   for more information.
      </td>
    </tr>

    <tr>
      <td>
        **saveCardEnabled**
      </td>

      <td>
        Enables the save card checkbox for card flows. Check the [Save card](#save-card-for-future-payments)    section for more information.
      </td>
    </tr>

    <tr>
      <td>
        **language**
      </td>

      <td>
        Defines the language to be used in the payment forms. If you don't send or provide a null value, Yuno SDK will use the device language. You can set it to one of the available language options:  

        * `es` (Spanish)
        * `en` (English)
        * `pt` (Portuguese)
      </td>
    </tr>

    <tr>
      <td>
        **styles**
      </td>

      <td>
        Enables SDK-wide UI customization. Use it to define global visual styles like font family and button appearance (color, padding, radius, typography) through a `YunoStyles` object. For more information, check the [`styles`](/docs/full-checkout-android#styles)   section.
      </td>
    </tr>
  </tbody>
</Table>

The following code block presents an example of `YunoConfig`:

```kotlin
data class YunoConfig(
    val cardFlow: CardFormType = CardFormType.ONE_STEP,
    val saveCardEnabled: Boolean = false,
    val language: YunoLanguage? = null,
  	val styles: YunoStyles? = null 
)
```

## Step 6: Start checkout

To initiate a new payment process with the Seamless SDK, call the `startCheckout` method in the `onCreate()` function of the activity that integrates the SDK:

```kotlin
startCheckout(
  checkoutSession: "checkout_session",
  // Replace with your target country's ISO code (e.g., "US" for USA, "FR" for France). The complete list of country_codes is available on https://docs.y.uno/docs/country-coverage-yuno-sdk.
  country_code: "US",
  callbackPaymentState: ((String?) -> Unit)?,
  merchantSessionId: String? = null //Optional - Default null
)
```

| Parameter              | Description                                                                                                                                                    |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`      | The `checkout_session` is related to the payment.                                                                                                              |
| `country_code`         | Country code where the payment is performed. See [Country coverage](doc:country-coverage-yuno-sdk) for a complete list of supported countries and their codes. |
| `callbackPaymentState` | A function that returns the current payment process. Optional if you don't need the result.                                                                    |
| `merchantSessionId`    | Optional identifier for merchant session tracking. Default is null.                                                                                            |

The possible payment states returned by `callbackPaymentState` are:

```kotlin
const val PAYMENT_STATE_SUCCEEDED = "SUCCEEDED"
const val PAYMENT_STATE_FAIL = "FAIL"
const val PAYMENT_STATE_PROCESSING = "PROCESSING"
const val PAYMENT_STATE_REJECT = "REJECT"
const val PAYMENT_STATE_INTERNAL_ERROR = "INTERNAL_ERROR"
const val PAYMENT_STATE_STATE_CANCELED_BY_USER = "CANCELED"
```

The following table provide additional information about the possible states:

| **State**        | **Description**                                                                                                                 | **Additional action required**                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `SUCCEEDED`      | The transaction or payment process was successfully completed without any errors.                                               | No.                                                                                                           |
| `FAIL`           | The transaction failed due to errors such as data validation issues, server connection failures, or technical/network problems. | Yes. Investigate the cause of failure (validation, network, server) and take corrective measures.             |
| `PROCESSING`     | The transaction is currently in progress, awaiting approval or verification.                                                    | No.                                                                                                           |
| `REJECT`         | The transaction was rejected due to reasons like insufficient funds or suspected fraudulent activity.                           | Yes. Inform the user of the rejection, provide the reason if possible, and suggest actions.                   |
| `INTERNAL_ERROR` | An unexpected internal error occurred within the system handling the payment process.                                           | Yes. Requires technical intervention to review the system, fix internal issues, and retry or inform the user. |
| `CANCELED`       | The user voluntarily canceled the transaction or abandoned the payment process.                                                 | No.                                                                                                           |

## Step 7: Get payment one-time token (OTT)

To start a payment process, you have to call the method `startPaymentSeamlessLite`.

```kotlin
startPaymentSeamlessLite(
    paymentSelected: PaymentSelected,
    callbackPaymentState: ((String?) -> Unit)?, //Optional - Default null
    showPaymentStatus: Boolean, //Optional - Default true - If you wish to use your own payment result screen set this param in false. The default shows the SDK's default result screen.
)
```

Below is a description of the parameters to start the payment:

| Parameter              | Description                                                                              |
| :--------------------- | :--------------------------------------------------------------------------------------- |
| `paymentSelected`      | Specifies the payment method, either through a vaulted token or a selected payment type. |
| `callbackPaymentState` | This is an optional parameter. This function handles the state updates.                  |
| `showPaymentStatus`    | This is an optional parameter.  When `true`, displays the SDK's default result screen.   |

You will receive the payment status via `callbackPaymentState`, which will indicate whether the payment was successful or if an issue occurred.

## Step 8: Create payment

To complete the payment process, you need to call the method `startPaymentSeamlessLite` with the selected payment method.

```kotlin
startPaymentSeamlessLite(
    paymentSelected: PaymentSelected,
    callbackPaymentState: ((String?) -> Unit)?, //Optional - Default null
    showPaymentStatus: Boolean, //Optional - Default true - If you wish to use your own payment result screen set this param in false. The default shows the SDK's default result screen.
)
```

## Complementary features

Yuno Android SDK provides additional services and configurations you can use to improve customers' experience. Use the [SDK customization](doc:sdk-customizations-android) to change the SDK appearance to match your brand or to configure the loader.

### `styles`

With the `styles` customization option, you can define global visual styles like through a `YunoStyles` object. It lets you apply consistent branding across the SDK by customizing button appearance and typography.

```kotlin
data class YunoStyles(
    val buttonStyles: YunoButtonStyles? = null,
    val fontFamily: FontFamily? = null
)
```

| Parameter      | Description                                             |
| :------------- | :------------------------------------------------------ |
| `buttonStyles` | Customizes the primary buttons displayed in the SDK.    |
| `fontFamily`   | Sets the font family used across all SDK text elements. |

The `YunoButtonStyles` object lets you define specific settings for button appearance:

```kotlin
data class YunoButtonStyles(
    val backgroundColor: Color? = null,
    val contentColor: Color? = null,
    val cornerRadius: Dp? = null,
    val elevation: Dp? = null,
    val padding: Dp? = null,
    val fontFamily: FontFamily? = null,
    val fontSize: TextUnit? = null,
    val fontStyle: FontStyle? = null
)
```

To use the `styles` customization option, you have to use the `YunoConfig` data class, described in Step 2. 

### Loader

The [Loader](https://docs.y.uno/docs/loader-android) enables you to control the use of the loader component.

### Save card for future payments

In addition, you can display a checkbox to save or enroll cards using `cardSaveEnable: true`. Below, you can find examples of the checkbox for both card form renders:

<Image align="center" src="https://files.readme.io/1c3d62f0307923298b22f18a1e58f86f8b6068a582315a0991ff8d802c475dbc-Card___save_for_future_payments.png" />

### Render options

You can choose between two card form render options. The following screenshots demonstrate the difference between `cardFormType` `ONE_STEP` and `STEP_BY_STEP`:

<Image align="center" src="https://files.readme.io/7525725793bb95941157225f086e5abaa58875401b435703e4d3e69e217ca690-Full_SDK_android.png" />

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Demo App</h3>
      <div class="contentContainer">
        <p>
				In addition to the code examples provided, you can access the <a href="https://github.com/yuno-payments/yuno-sdk-android/tree/master">Yuno repository</a> to complete Yuno Android SDKs implementation.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>
