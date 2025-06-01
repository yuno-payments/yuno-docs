---
title: Lite SDK (Enrollment Android)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Lite SDK (Enrollment)
  description: >-
    Here is a step-by-step guide on integrating Yuno's Lite (Enrollment) SDK
    into your Android application, enabling efficient and secure payment
    processing for your mobile platform.
  robots: index
next:
  description: ''
---
The Yuno Lite SDK for Android provides a pre-built UI solution focused on payment method enrollment. This SDK offers a streamlined integration process with essential enrollment functionality, making it ideal for merchants who:

* Need a quick implementation with minimal customization requirements
* Want to focus primarily on payment method enrollment
* Prefer a ready-to-use UI that handles the enrollment flow

The Lite SDK includes core features like:

* Pre-built enrollment UI components
* Card enrollment processing
* Basic enrollment status handling
* Essential error management

For merchants requiring more advanced features like multiple payment methods, custom UI, or advanced fraud prevention, consider using our [Full SDK](doc:full-sdk-android) instead.

## Requirements

Before starting the Yuno Android SDK integration, make sure your project meets the [technical requirements](doc:requirements-android). In addition, ensure the following prerequisites are in place:

* You must have an active Yuno account
* To perform the integration, you'll need your Yuno API credentials (`public-api-key`), which you can obtain from the [Developers section of the Yuno dashboard](https://docs.y.uno/docs/developers-credentials)
* Before enrolling a payment method, you must first create a customer using the [Create customer endpoint](ref:create-customer)

## Step 1: Create a customer

Before enrolling payment methods, you need to create a customer in Yuno's system. Use the [Create customer endpoint](ref:create-customer) to obtain a `customer_id`. This identifier will be used to associate enrolled payment methods with the specific customer.

The endpoint will return a `customer_session` that you'll need to use when calling the enrollment methods.

## Step 2: Include the library in your project

Follow these steps to add the Yuno Lite SDK to your Android project:

### Add the Repository

First, add Yuno's Maven repository to your project's Gradle configuration:

```kotlin
maven { url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" }
```

After, include the code below in the file `build.gradle` to add the Yuno SDK dependency to the application.

```kotlin
dependencies {
    implementation 'com.yuno.payments:android-sdk:{last_version}'
}
```

### Permissions

Yuno SDK includes, by default, the `INTERNET` permission, which is required to make network requests. 

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## Step 3: Initialize SDK with the public key

To initialize the SDK, follow these steps:

1. Get your Public API Key from the [Yuno Dashboard](https://dashboard.y.uno/)
2. Create a custom application class if you haven't already done so
3. In the `onCreate()` method of your application class, call `Yuno.initialize()` with your API key as shown below:

```kotlin
class CustomApplication : Application() {
  override fun onCreate() {
    super.onCreate()
    Yuno.initialize(
      this,
      "your api key",
      config: YunoConfig, // This is a data class to use custom configs in the SDK.
    )
  }
}
```

Use the data class `YunoConfig` to customize the SDK's behavior. You can include this configuration when calling `Yuno.initialize()`. The available options are:

```kotlin
data class YunoConfig(
    val cardFlow: CardFormType = CardFormType.ONE_STEP, // Optional: Defines the card form flow type. ONE_STEP shows a single screen for card details, TWO_STEP splits it across multiple screens.
    val saveCardEnabled: Boolean = false, // Determines whether to display the "Save card" checkbox on card flows.
    val keepLoader: Boolean = false, // If true, keeps the Yuno loading screen visible until payment creation and continuation. Requires an additional step described later.
    val cardFormDeployed: Boolean = false, // Full SDK only: If true, displays the card form within the payment methods list. If false, shows the card form on a separate screen.
    val language: YunoLanguage? = null, // Sets the SDK language. If null or not provided, defaults to the device language.
    val styles: YunoStyles? = null // Enables SDK-wide UI customization.
)
```

The following table includes descriptions for each customization available.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Customization option
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
        It is an optional configuration that defines Payment and Enrollment Card flow. By default, the `CardFormType.ONE_STEP` option is used. Check the section [Render options](#render-options)   for more information
      </td>
    </tr>

    <tr>
      <td>
        **saveCardEnabled**
      </td>

      <td>
        Enables the **Save card checkbox** on card flows. Check the [Save card](#save-card-for-future-payments)    section for more information.
      </td>
    </tr>

    <tr>
      <td>
        **keepLoader**
      </td>

      <td>
        Keep Yuno's loading screen until you create and continue with payment. To use this feature, you need to use the function `startCompletePaymentFlow()`, described in the next sections. Check the [Loader](#loader)   for additional information.
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
        Enables SDK-wide UI customization. Use it to define global visual styles like font family and button appearance (color, padding, radius, typography) through a `YunoStyles` object. For more information, check the [`styles`](/docs/full-checkout-android#styles)  section.
      </td>
    </tr>
  </tbody>
</Table>

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Loading Screen Persistence</h3>
      <div class="contentContainer">
        <p>
         To ensure that the Yuno loading screen persists until you create and proceed with the payment, you need to use the <code>startCompletePaymentFlow()</code>(loader-android) function.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

You also need to update your manifest to use your application:

```xml
<application android:name=".CustomApplication"></application>
```

## Step 4: Enroll a new payment method

To create the enrollment flow, you need to call the `initEnrollment `method on the `onCreate ` method of your activity. This process is required because Yuno's Lite SDK uses it to register the contract to give you the final enrollment state.

````kotlin
fun ComponentActivity.initEnrollment(
    callbackEnrollmentState: ((String?) -> Unit)? = null, //Default null | To register this callback is a must to call ```initEnrollment``` method on the onCreate method of activity.
)
````

To start the enrollment of a new payment method, you need to use the `startEnrollment` method. When you call the `startEnrollment` method, the enrollment flow of a new payment method will start.

````kotlin
fun Activity.startEnrollment(
    customerSession: String,
  	// The complete list of country codes is available on https://docs.y.uno/docs/country-coverage-yuno-sdk
    country_code: String,
    showEnrollmentStatus: Boolean = true, //Optional - Default true
    callbackEnrollmentState: ((String?) -> Unit)? = null, // Default null | To register this callback is a must to call ```initEnrollment``` method on the onCreate method of activity.
  	requestCode: Int, // Optional. Use this option to capture the status when using the onActivityResult
)
````

Below is a description of the `startEnrollment` parameters.

| Parameter                 | Description                                                                                                                                                                                                                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customerSession`         | The session customer associated with the current enrollment process.                                                                                                                                                                                                                                              |
| `country_code`            | Country code where the payment is performed. See [Country coverage](doc:country-coverage-yuno-sdk) for a complete list of supported countries and their codes.                                                                                                                                                    |
| `showEnrollmentStatus`    | Indicates whether the enrollment status should be shown. This parameter is optional and defaults to `true`.                                                                                                                                                                                                       |
| `callbackEnrollmentState` | A function that returns the current state of the enrollment process. This parameter is optional and defaults to `null`. To register this callback, you must call `initEnrollment` method in the `onCreate` method of the activity. Check the [possible states](#callback-enrollment-state)  that can be returned. |
| `requestCode`             | It is an optional parameter you must inform if you are going to use the `onActivityResult` method to capture the enrollment states.                                                                                                                                                                               |

### Callback Enrollment State

The `callbackEnrollmentState` parameter is a function that returns the current enrollment process status. You only need to provide this function if you want to track the enrollment status.

To check the current enrollment state at any time, use the `AppCompatActivity.enrollmentStatus()` function. This function is optional and accepts the same parameters as `startEnrollment`. The following code block shows the function signature:

```kotlin
fun AppCompatActivity.enrollmentStatus(
    customerSession: String,
    country_code: String,
    showEnrollmentStatus: Boolean = false, //Optional - Default false
    callbackEnrollmentState: ((String?) -> Unit)? = null, //Optional - You can send again another callback that is gonna override the one you sent on initEnrollment function.
)
```

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Optional Function</h3>
      <div class="contentContainer">
        <p>
         Using the function <code>enrollmentStatus</code> is optional. It isn't a requirement to complete the enrollment process.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Note</h3>
      <div class="contentContainer">
        <p>
         If you provide a new callback when calling the function <code>enrollmentStatus</code>, it will override the callback you set when calling the function <code>initEnrollment</code>.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

The possible states are presented in the following code block:

```kotlin
const val ENROLLMENT_STATE_SUCCEEDED = "SUCCEEDED"
const val ENROLLMENT_STATE_FAIL = "FAIL"
const val ENROLLMENT_STATE_PROCESSING = "PROCESSING"
const val ENROLLMENT_STATE_REJECT = "REJECT"
const val ENROLLMENT_STATE_INTERNAL_ERROR = "INTERNAL_ERROR"
const val ENROLLMENT_STATE_CANCELED_BY_USER = "CANCELED"
```

The following table provide additional information about the possible states:

| **State**        | **Description**                                                                                                                | **Additional action required**                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `SUCCEEDED`      | The enrollment process was successfully completed without any errors.                                                          | No.                                                                                                           |
| `FAIL`           | The enrollment attempt failed due to errors such as data validation issues, server connection failures, or technical problems. | Yes. Investigate the cause of failure (validation, network, server) and take corrective measures.             |
| `PROCESSING`     | The enrollment is currently in progress, awaiting approval or verification.                                                    | No.                                                                                                           |
| `REJECT`         | The enrollment was rejected due to reasons such as missing requirements or detected inconsistencies.                           | Yes. Inform the user of the rejection, provide the reason if possible, and suggest next steps.                |
| `INTERNAL_ERROR` | An unexpected internal error occurred within the system handling the enrollment process.                                       | Yes. Requires technical intervention to review the system, fix internal issues, and retry or inform the user. |
| `CANCELED`       | The user voluntarily canceled the enrollment process or exited before completion.                                              | No.                                                                                                           |

### Using the `OnActivityResult` method

The **onActivityResult** method is automatically invoked when an activity returns a result. You can use this option to execute actions whenever the enrollment status changes.  To process the enrollment result, follow these steps:

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Deprecated</h3>
      <div class="contentContainer">
        <p>
         The <code>onActivityResult</code> method is a deprecated solution. If you are performing a new Android integration, Yuno recommends using <code>initEnrollment()</code> contract, which follows Google's best practices.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Request Code</h3>
      <div class="contentContainer">
        <p>
         If you are using the <code>onActivityResult</code> method but did not inform a <code>requestCode</code> when calling the <code>startEnrollment</code> in <a href="#step-3-enroll-a-new-payment-method">Step 3</a>, you must use the <code>YUNO_ENROLLMENT_REQUEST_CODE</code> provided by Yuno.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

1. First, override the `onActivityResult` method. It ensures that the hierarchy calls are respected.

```kotlin kotl
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {  
    super.onActivityResult(requestCode, resultCode, data)  
}
```

2. After, check if the `requestCode` to verify if it corresponds to `YUNO_ENROLLMENT_REQUEST_CODE`. Since you are running `Yuno` in your app, you can import the `YUNO_ENROLLMENT_REQUEST_CODE` to use it.

```kotlin
if (requestCode == YUNO_ENROLLMENT_REQUEST_CODE) {  
    // Specific enrollment processing  
}
```

3. If the `requestCode` matches, you can handle the enrollment result. In this case, you can extract the enrollment state using the `YUNO_ENROLLMENT_RESULT` key provided by the Yuno library. You can create a `onEnrollmentStateChange`function to handle the state changes.

```kotlin
onEnrollmentStateChange(data?.getStringExtra(YUNO_ENROLLMENT_RESULT))
```

The following code block presents an example of code to use the `OnActivityResult` method to execute functions when the enrollment status changes.

```kotlin
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)
    
    if (requestCode == YUNO_ENROLLMENT_REQUEST_CODE) {
        // Handle the enrollment result
        val enrollmentState = data?.getStringExtra(YUNO_ENROLLMENT_RESULT)
        onEnrollmentStateChange(enrollmentState)
    }
}

fun onEnrollmentStateChange(enrollmentState: String?) {
    // Implement your logic to handle different enrollment states here
    when (enrollmentState) {
        "SUCCEEDED" -> {
            // Handle successful enrollment
        }
        "FAIL" -> {
            // Handle failed enrollment
        }
        // Add other states as needed
    }
}
```

## Step 5: Get enrollment status

To register a callback to get the final enrollment state, it is necessary to call the `initEnrollment` method on the `onCreate` method of activity.

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

### SDK customization

You can change the SDK appearance to match your brand. For more information, access the [SDK customization](https://docs.y.uno/docs/sdk-customizations-android) page.

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
