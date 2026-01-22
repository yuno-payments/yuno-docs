---
title: Lite SDK (Enrollment Android)
excerpt: ''
deprecated: false
hidden: true
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
This page provides a guide to the Yuno Lite SDK for Android enrollment. This SDK offers a streamlined integration process with essential enrollment functionality, making it ideal for merchants who:

* Need a quick implementation with minimal customization requirements
* Want to focus primarily on payment method enrollment
* Prefer a ready-to-use UI that handles the enrollment flow

The Lite SDK includes core features like:

* Pre-built enrollment UI components
* Card enrollment processing
* Basic enrollment status handling
* Essential error management

For merchants requiring more advanced features like multiple payment methods, custom UI, or advanced fraud prevention, consider using our [Full SDK](doc:android) instead.

## Requirements

Before starting the Yuno Android SDK integration, ensure your project meets the [technical requirements](doc:requirements-android). Also, ensure the following prerequisites are in place:

* You must have an active Yuno account
* You need your Yuno API credentials (`public-api-key`), which you can obtain from the [Developers section of the Yuno dashboard](../docs/developers-credentials)
* Before enrolling a payment method, you must first create a customer using the [Create customer endpoint](ref:create-customer)

## Step 1: Create a customer

Create a customer in Yuno's system using the [Create customer endpoint](ref:create-customer) before enrolling payment methods. This endpoint will return a `customer_id` that you'll use to associate enrolled payment methods with the specific customer.

The endpoint will return a `customer_session` that you'll need to use when calling the enrollment methods.

## Step 2: Include the library in your project

Add the Yuno Lite SDK to your Android project:

### Add the Repository

Add Yuno's Maven repository to your project's Gradle configuration:

```kotlin
maven { url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" }
```

Include the following code in the `build.gradle` file to add the Yuno SDK dependency to the application:

```kotlin
dependencies {
    implementation 'com.yuno.payments:android-sdk:{last_version}'
}
```

### Permissions

The Yuno SDK includes the `INTERNET` permission by default, which is required to make network requests.

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## Step 3: Initialize SDK with the public key

Initialize the SDK:

1. Get your Public API Key from the [Yuno Dashboard](https://dashboard.y.uno/)
2. Create a custom application class if you haven't already done so
3. In the `onCreate()` method of your application class, call `Yuno.initialize()` with your API key:

```kotlin
class CustomApplication : Application() {
  override fun onCreate() {
    super.onCreate()
    Yuno.initialize(
      this,
      PUBLIC_API_KEY,
      config: YunoConfig,
    )
  }
}
```

Use the data class `YunoConfig` to customize the SDK's behavior. Include this configuration when calling `Yuno.initialize()`. The available options are:

```kotlin
data class YunoConfig(
    val cardFlow: CardFormType = CardFormType.ONE_STEP,
    val saveCardEnabled: Boolean = false,
    val keepLoader: Boolean = false,
    val cardFormDeployed: Boolean = false,
    val language: YunoLanguage? = null,
    val styles: YunoStyles? = null
)
```

The following table describes each customization option:

<Table>
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
        This optional configuration defines Payment and Enrollment Card flow. By default, the `CardFormType.ONE_STEP` option is used. See the [Render options](#render-options) section for more information.
      </td>
    </tr>

    <tr>
      <td>
        **saveCardEnabled**
      </td>

      <td>
        Enables the **Save card checkbox** on card flows. See the [Save card](#save-card-for-future-payments) section for more information.
      </td>
    </tr>

    <tr>
      <td>
        **keepLoader**
      </td>

      <td>
        Keep Yuno's loading screen until you create and continue with payment. To use this feature, use the function `startCompletePaymentFlow()`, described in the next sections. See the [Loader](#loader) for additional information.
      </td>
    </tr>

    <tr>
      <td>
        **language**
      </td>

      <td>
        Defines the language to be used in the payment forms. You can set it to one of the available language options: <ul><li>es (Spanish)</li><li>en (English)</li><li>pt (Portuguese)</li><li>fil (Filipino)</li><li>id (Indonesian)</li><li>ms (Malay)</li><li>th (Thai)</li><li>zh-TW (Chinese (Traditional, Taiwan))</li><li>zh-CN (Chinese (Simplified, China))</li><li>vi (Vietnamese)</li><li>fr (French)</li><li>pl (Polish)</li><li>it (Italian)</li><li>de (German)</li><li>ru (Russian)</li><li>tr (Turkish)</li><li>nl (Dutch)</li><li>sv (Swedish)</li><li>ko (Korean)</li><li>ja (Japanese)</li></ul>
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `pt` (Portuguese)
      </td>
    </tr>

    <tr>
      <td>
        **styles**
      </td>

      <td>
        Enables SDK-wide UI customization. Use it to define global visual styles like font family and button appearance (color, padding, radius, typography) through a `YunoStyles` object. For more information, see the [`styles`](../docs/full-checkout-android#styles) section.
      </td>
    </tr>
  </tbody>
</Table>

You also need to update your manifest to use your application:

```xml
<application android:name=".CustomApplication"></application>
```

## Step 4: Enroll a new payment method

The enrollment process is a two-step flow. First, initialize the process to set up the necessary components. Then, start the UI flow to allow the user to enroll a payment method.

### 4.1 Initialize the enrollment process

Call the `initEnrollment` method within your activity's `onCreate` method to prepare your app to handle the enrollment flow. This is a mandatory setup step required by the Android operating system to register the contract that allows the SDK to send the final enrollment status back to your app.

```kotlin
fun ComponentActivity.initEnrollment(
    callbackEnrollmentState: ((String?) -> Unit)? = null
)
```

### 4.2 Start the enrollment flow

Call the `startEnrollment` method to launch the user interface and begin the enrollment of a new payment method. You can call this method at any point after `initEnrollment` has been executed, such as when a user taps an "Enroll New Payment Method" button.

```kotlin
fun Activity.startEnrollment(
    customerSession: String,
    countryCode: String,
    showEnrollmentStatus: Boolean = true,
    callbackEnrollmentState: ((String?) -> Unit)? = null,
    requestCode: Int
)
```

The following table describes the `startEnrollment` parameters:

| Parameter                 | Description                                                                                                                                                                                                                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customerSession`         | The session customer associated with the current enrollment process.                                                                                                                                                                                                                                             |
| `countryCode`             | Country code where the payment is performed. See [Country coverage](doc:quickstart) for a complete list of supported countries and their codes.                                                                                                                                                   |
| `showEnrollmentStatus`    | Indicates whether the enrollment status should be shown. This parameter is optional and defaults to `true`.                                                                                                                                                                                                      |
| `callbackEnrollmentState` | A function that returns the current state of the enrollment process. This parameter is optional and defaults to `null`. To register this callback, you must call `initEnrollment` method in the `onCreate` method of the activity. Check the [possible states](#callback-enrollment-state) that can be returned. |
| `requestCode`             | It is an optional parameter you must inform if you are going to use the `onActivityResult` method to capture the enrollment states.                                                                                                                                                                              |

### Callback Enrollment State

The `callbackEnrollmentState` parameter is a function that returns the current enrollment process status. Provide this function only if you want to track the enrollment status.

Use the `AppCompatActivity.enrollmentStatus()` function to check the current enrollment state at any time. This function is optional and accepts the same parameters as `startEnrollment`. The following code block shows the function signature:

```kotlin
fun AppCompatActivity.enrollmentStatus(
    customerSession: String,
    countryCode: String,
    showEnrollmentStatus: Boolean = false,
    callbackEnrollmentState: ((String?) -> Unit)? = null,
)
```

> 📘 Optional Function
>
> Using the function `enrollmentStatus` is optional. It isn't a requirement to complete the enrollment process. [Learn more](#enrollmentStatus)

> 🚧 Callback Override
>
> If you provide a new callback when calling the function `enrollmentStatus`, it will override the callback you set when calling the function `initEnrollment`.

The following code block shows the possible states:

```kotlin
const val ENROLLMENT_STATE_SUCCEEDED = "SUCCEEDED"
const val ENROLLMENT_STATE_FAIL = "FAIL"
const val ENROLLMENT_STATE_PROCESSING = "PROCESSING"
const val ENROLLMENT_STATE_REJECT = "REJECT"
const val ENROLLMENT_STATE_INTERNAL_ERROR = "INTERNAL_ERROR"
const val ENROLLMENT_STATE_CANCELED_BY_USER = "CANCELED"
```

The following table provides additional information about the possible states:

| **State**        | **Description**                                                                                                                | **Additional action required**                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `SUCCEEDED`      | The enrollment process was successfully completed without any errors.                                                          | No.                                                                                                           |
| `FAIL`           | The enrollment attempt failed due to errors such as data validation issues, server connection failures, or technical problems. | Yes. Investigate the cause of failure (validation, network, server) and take corrective measures.             |
| `PROCESSING`     | The enrollment is currently in progress, awaiting approval or verification.                                                    | No.                                                                                                           |
| `REJECT`         | The enrollment was rejected due to reasons such as missing requirements or detected inconsistencies.                           | Yes. Inform the user of the rejection, provide the reason if possible, and suggest next steps.                |
| `INTERNAL_ERROR` | An unexpected internal error occurred within the system handling the enrollment process.                                       | Yes. Requires technical intervention to review the system, fix internal issues, and retry or inform the user. |
| `CANCELED`       | The user voluntarily canceled the enrollment process or exited before completion.                                              | No.                                                                                                           |

### Using the `OnActivityResult` method

> ❗️ Deprecated Method
>
> The `onActivityResult` method is a deprecated solution. If you are performing a new Android integration, Yuno recommends using the `initEnrollment()` contract, which follows Google's best practices.

The **onActivityResult** method is automatically invoked when an activity returns a result. You can use this option to execute actions whenever the enrollment status changes. Follow these steps to process the enrollment result:

> 📘 Using Default Request Code
>
> If you are using the `onActivityResult` method but did not inform a `requestCode` when calling the `startEnrollment` in [Step 3](#step-3-enroll-a-new-payment-method), you must use the `YUNO_ENROLLMENT_REQUEST_CODE` provided by Yuno.

1. Override the `onActivityResult` method. This ensures that the hierarchy calls are respected.

```kotlin kotl
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)
}
```

2. Check if the `requestCode` corresponds to `YUNO_ENROLLMENT_REQUEST_CODE`. Since you are running `Yuno` in your app, you can import the `YUNO_ENROLLMENT_REQUEST_CODE` to use it.

```kotlin
if (requestCode == YUNO_ENROLLMENT_REQUEST_CODE) {
}
```

3. If the `requestCode` matches, handle the enrollment result. Extract the enrollment state using the `YUNO_ENROLLMENT_RESULT` key provided by the Yuno library. Create an `onEnrollmentStateChange` function to handle the state changes.

```kotlin
onEnrollmentStateChange(data?.getStringExtra(YUNO_ENROLLMENT_RESULT))
```

The following code block shows an example of code to use the `OnActivityResult` method to execute functions when the enrollment status changes:

```kotlin
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)

    if (requestCode == YUNO_ENROLLMENT_REQUEST_CODE) {
        val enrollmentState = data?.getStringExtra(YUNO_ENROLLMENT_RESULT)
        onEnrollmentStateChange(enrollmentState)
    }
}

fun onEnrollmentStateChange(enrollmentState: String?) {
    when (enrollmentState) {
        "SUCCEEDED" -> {
        }
        "FAIL" -> {
        }
    }
}
```

## Step 5: Get enrollment status

Call the `initEnrollment` method in the `onCreate` method of activity to register a callback to get the final enrollment state.

## Complementary features

Yuno Android SDK provides additional services and configurations you can use to improve customers' experience. Use the [SDK customization](doc:sdk-customizations-android) to change the SDK appearance to match your brand or to configure the loader.

### `styles`

With the `styles` customization option, you can define global visual styles through a `YunoStyles` object. It lets you apply consistent branding across the SDK by customizing button appearance and typography.

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

Use the `YunoConfig` data class, described in Step 3, to use the `styles` customization option.

### Loader

The loader functionality is controlled through the `keepLoader` parameter in the `YunoConfig` data class, which is documented inline in the SDK configuration section above.

### Render options

You can choose between two card form render options. The following screenshots show the difference between `cardFormType` `ONE_STEP` and `STEP_BY_STEP`:

<Image align="center" border={false} src="https://files.readme.io/7525725793bb95941157225f086e5abaa58875401b435703e4d3e69e217ca690-Full_SDK_android.png" />

### SDK customization

You can change the SDK appearance to match your brand. For more information, see the [SDK customization](../docs/sdk-customizations-android) page.

> 📘 Demo App
>
> In addition to the code examples provided, you can see the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-android/tree/master) to complete Yuno Android SDKs implementation.

## Render mode (enrollment)

The Yuno SDK render mode lets you integrate the enrollment flow with full UI control while keeping SDK validation and logic. The SDK returns Android `Fragment` instances that you can display in both Jetpack Compose (via AndroidView) and traditional XML layouts.

### Main function: `startEnrollmentRender`

```kotlin
fun Activity.startEnrollmentRender(
    customerSession: String,
    countryCode: String,
    submitButton: Boolean = false,
    coroutineScope: CoroutineScope,
    listener: YunoEnrollmentRenderListener
): YunoEnrollmentFragmentController
```

#### Parameters

| Parameter         | Type                           | Required | Description                                                                 |
| ----------------- | ------------------------------ | -------- | --------------------------------------------------------------------------- |
| `customerSession` | `String`                       | Yes      | The customer session for the current enrollment process                     |
| `countryCode`     | `String`                       | Yes      | Country code for regional configuration                                     |
| `submitButton`    | `Boolean`                      | No       | If `true`, the SDK renders submit actions internally; otherwise use your UI |
| `coroutineScope`  | `CoroutineScope`               | Yes      | Scope used for running async operations tied to the Activity lifecycle      |
| `listener`        | `YunoEnrollmentRenderListener` | Yes      | Listener that receives fragments, loading, and final status events          |

#### Return value

Returns a `YunoEnrollmentFragmentController` to control the enrollment flow (e.g., submit forms).

#### Usage example

```kotlin
class EnrollmentActivity : Activity() {

    private lateinit var fragmentController: YunoEnrollmentFragmentController

    private fun initializeEnrollment() {
        fragmentController = startEnrollmentRender(
            customerSession = "your_customer_session_id",
            countryCode = "US",
            submitButton = false,
            coroutineScope = lifecycleScope,
            listener = enrollmentRenderListener
        )
    }
}
```

***

### Interface: `YunoEnrollmentRenderListener`

Implement this interface to receive enrollment fragments and events.

```kotlin
interface YunoEnrollmentRenderListener {
    fun showView(fragment: Fragment, needSubmit: Boolean)
    fun returnStatus(resultCode: Int, paymentStatus: String)
    fun loadingListener(isLoading: Boolean)
}
```

#### showView(fragment: Fragment, needSubmit: Boolean)

* Receives the fragment to display in your UI container
* `needSubmit` indicates whether you should display your own submit button (when `submitButton = false`)

Example (XML):

```kotlin
override fun showView(fragment: Fragment, needSubmit: Boolean) {
    supportFragmentManager.beginTransaction()
        .replace(R.id.enrollment_container, fragment)
        .commit()

    clientSubmitButton.isVisible = needSubmit
    if (needSubmit) {
        clientSubmitButton.setOnClickListener { fragmentController.submitForm() }
    }
}
```

#### returnStatus(resultCode: Int, paymentStatus: String)

* Final enrollment status event. Use it to notify the user of success or failure

#### loadingListener(isLoading: Boolean)

* Loading state callback for showing/hiding spinners and disabling/enabling UI

```kotlin
override fun loadingListener(isLoading: Boolean) {
    progressBar.isVisible = isLoading
    clientSubmitButton.isEnabled = !isLoading
}
```

### Interface: `YunoEnrollmentFragmentController`

Returned by `startEnrollmentRender` to control the enrollment flow.

```kotlin
interface YunoEnrollmentFragmentController {
    fun submitForm()
}
```

```kotlin
val fragmentController = startEnrollmentRender(
    customerSession = "your_customer_session_id",
    countryCode = "US",
    submitButton = false,
    coroutineScope = lifecycleScope,
    listener = enrollmentRenderListener
)
```

3. Control the flow (submit when needed):

```kotlin
fragmentController.submitForm()
```

## Advantages of Render Mode

### UI flexibility

* Compatible with both Compose (via AndroidView) and XML
* Full control over where and how views are displayed
* Easy to match your app’s design system

### Flow control

* Custom submit timing using `submitForm()`

## Important considerations

* Tie `coroutineScope` to your Activity/Fragment lifecycle (e.g., `lifecycleScope`)
* When `needSubmit = true`, render your own submit button and call `submitForm()`
* In Compose, place the fragment in an `AndroidView` container
