---
title: Full SDK (Android)
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: Full SDK
  description: >-
    Here is a step-by-step guide on integrating Yuno's Full SDK into your
    Android application, enabling efficient and secure payment processing for
    your mobile platform.
  robots: index
next:
  description: ''
---
<br />

> 👍 Recommended SDK
>
> We recommend using the [Android Seamless SDK](seamless-sdk-payment-android) for a smooth integration experience. This option provides a flexible payment solution with pre-built UI components and customization options.

This page provides a guide to the Yuno Full SDK for Android, which offers a complete payment solution with a customizable UI. It provides advanced features like payment method management, fraud prevention, and seamless checkout flows, making it more feature-rich than our Headless SDK, which is specific to core payment processing capabilities.

## Requirements

Before starting the Yuno Android SDK, ensure your project meets the [technical requirements](doc:requirements-android). Also, ensure the following prerequisites are in place:

1. You must have an active Yuno account
2. You need your Yuno API credentials (`account_id`, `public-api-key`, and `private-secret-key`), which you can obtain from the [Developers section of the Yuno dashboard](../docs/developers-credentials). These credentials are required to authenticate requests to the Yuno API. The API is used to:

* Create a `checkout_session`, which initializes the payment flow
* Create the payment associated with the session

3. Before creating a payment, you must first create a customer using the [Create customer endpoint](ref:create-customer)

## Step 1: Include the library in your project

Include the Yuno SDK file in your project through Gradle. Then, add the repository source:

```kotlin
maven { url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" }
```

> 📘 SDK Version
>
> Access the [Release notes](doc:release-notes-android) or the [Yuno Android SDK repository](https://github.com/yuno-payments/yuno-sdk-android) to verify the latest SDK version available.

Then, include the following code in the `build.gradle` file to add the Yuno SDK dependency to the application:

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

## Step 2: Initialize SDK with the public key

Retrieve your public API keys from the [Yuno dashboard](https://dashboard.y.uno/).

If you haven't implemented a custom application, create one. In the `onCreate()` method of your application class, call the initialize function (`Yuno.initialize`):

```kotlin
class CustomApplication : Application() {
  override fun onCreate() {
    super.onCreate()
    Yuno.initialize(
      this,
      "<your-public-api-key>",
      config: YunoConfig,
    )
  }
}
```

> 📘 Credentials
>
> See the credentials page for more information: [https://docs.y.uno/reference/authentication](https://docs.y.uno/reference/authentication)

Use the data class `YunoConfig` to customize the SDK's behavior. Include this configuration when calling `Yuno.initialize()`. The available options are:

> 🚧 cardFlow removed from YunoConfig
>
> Starting from version **2.11.0**, `cardFlow` is no longer part of `YunoConfig`. Card flow configuration is now handled exclusively through the **CheckoutBuilder** in the Dashboard.

```kotlin
data class YunoConfig(
    val saveCardEnabled: Boolean = false,
    val cardFormDeployed: Boolean = false,
    val language: YunoLanguage? = null,
    val styles: YunoStyles? = null
)
```

Parameters

The following table describes each customization available:

| Customization option | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `saveCardEnabled`    | Enables the Save card checkbox on card flows. Check the [Save card](../docs/full-checkout-android#save-card-for-future-payments) section for more information.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `cardFormDeployed`   | This option is only available for Full SDK. If `TRUE`, the system presents the card form deployed on the payment methods list. If `FALSE`, presents the normal card form on another screen.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `language`           | Defines the language to be used in the payment forms. You can set it to one of the available language options: <ul><li>es (Spanish)</li><li>en (English)</li><li>pt (Portuguese)</li><li>fil (Filipino)</li><li>id (Indonesian)</li><li>ms (Malay)</li><li>th (Thai)</li><li>zh-TW (Chinese (Traditional, Taiwan))</li><li>zh-CN (Chinese (Simplified, China))</li><li>vi (Vietnamese)</li><li>fr (French)</li><li>pl (Polish)</li><li>it (Italian)</li><li>de (German)</li><li>ru (Russian)</li><li>tr (Turkish)</li><li>nl (Dutch)</li><li>sv (Swedish)</li><li>ko (Korean)</li><li>ja (Japanese)</li></ul> |
| `styles`             | Enables SDK-wide UI customization. Use it to define global visual styles like font family and button appearance (color, padding, radius, typography) through a `YunoStyles` object. For more information, check the [`styles`](../docs/full-checkout-android#styles) section.                                                                                                                                                                                                                                                                                                                                 |

Update your manifest to use your application:

```xml
<application android:name=".CustomApplication"></application>
```

## Step 3: Create the checkout session

Each payment requires a new `checkout_session`, which provides access to all available payment methods for a specific customer. Use the [Create checkout session](ref:create-checkout-session) endpoint to obtain a new `checkout_session`. This session is then used to initiate the payment.

> 📘 External Browser Return Handling
>
> If your payment flow sends users to an external browser (for example, for 3DS authentication or bank redirects), make sure to set the `callback_url` when creating your checkout session. For a step-by-step guide on handling the return to your app, see [Handle external browser return (callback_url)](doc:payment-flows-android#step-3-create-the-checkout-session).

## Step 4: Start the checkout process

Call the `startCheckout` method inside the `onCreate()` function of the activity that initializes the SDK to start a new payment process with the Full SDK:

```kotlin
startCheckout(
  checkoutSession: "checkout_session",
  countryCode: "country_code_iso",
  callbackPaymentState: ((String?, String?) -> Unit)?,
  merchantSessionId: String? = null
)
```

### Parameters

Configure the checkout with the following options:

| Parameter              | Description                                                                                                                                                                               |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`      | A unique identifier for the checkout session associated with the payment. It is required to initialize the payment process and grants access to the customer's available payment methods. |
| `countryCode`          | Country code where the payment is performed. See [Country coverage](doc:quickstart) for a complete list of supported countries and their codes.                            |
| `callbackPaymentState` | A function that returns the current payment process. It receives `paymentState` and `paymentSubState` values. You don't need to send this function if you don't need the result.          |
| `merchantSessionId`    | An identifier used by the merchant to track the payment.                                                                                                                                  |

The following are the possible states returned by the `callbackPaymentState`:

```kotlin
const val PAYMENT_STATE_SUCCEEDED = "SUCCEEDED"
const val PAYMENT_STATE_FAIL = "FAIL"
const val PAYMENT_STATE_PROCESSING = "PROCESSING"
const val PAYMENT_STATE_REJECT = "REJECT"
const val PAYMENT_STATE_INTERNAL_ERROR = "INTERNAL_ERROR"
const val PAYMENT_STATE_STATE_CANCELED_BY_USER = "CANCELED"
```

The following table provides additional information about the possible states:

| **State**        | **Description**                                                                                                                 | **Additional action required**                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `SUCCEEDED`      | The transaction or payment process was successfully completed without any errors.                                               | No.                                                                                                           |
| `FAIL`           | The transaction failed due to errors such as data validation issues, server connection failures, or technical/network problems. | Yes. Investigate the cause of failure (validation, network, server) and take corrective measures.             |
| `PROCESSING`     | The transaction is currently in progress, awaiting approval or verification.                                                    | No.                                                                                                           |
| `REJECT`         | The transaction was rejected due to reasons like insufficient funds or suspected fraudulent activity.                           | Yes. Inform the user of the rejection, provide the reason if possible, and suggest actions.                   |
| `INTERNAL_ERROR` | An unexpected internal error occurred within the system handling the payment process.                                           | Yes. Requires technical intervention to review the system, fix internal issues, and retry or inform the user. |
| `CANCELED`       | The user voluntarily canceled the transaction or abandoned the payment process.                                                 | No.                                                                                                           |

### Payment status validation

This section explains how the SDK handles payment status when users cancel or leave payment flows, and how the SDK status relates to the backend payment status in these scenarios.

#### Sync payment methods (Google Pay)

For synchronous payment methods like Google Pay, when a user cancels or closes the wallet UI before a payment service provider (PSP) response is received:

- **SDK Status**: Returns `CANCELED` (CANCELLED_BY_USER)
- **Backend payment status**: Remains `PENDING` until PSP timeout or merchant cancellation
- **Important**: The SDK will not return `REJECT` or `PROCESSING` in this scenario

This ensures that the backend payment remains in a pending state and can be properly handled by the merchant's system.

#### Async payment methods (PIX and QR-based methods)

For asynchronous payment methods like PIX, when a user closes the QR code window (clicks X) before completing the payment:

- **SDK Status**: Returns `PROCESSING`, optionally with a sub-status such as `CLOSED_BY_USER`
- **Backend payment status**: Remains `PENDING` and the QR code remains valid until expiry
- **Checkout session reuse**: Re-opening the same checkout session can display the same valid QR code
- **No Automatic Cancellation**: The PIX payment is not automatically cancelled when the user closes the QR window

This behavior allows users to return to the payment flow and complete the transaction using the same QR code before it expires.

#### Expired async payments

If a PIX QR code expires naturally:

- **Backend Status**: Updated to `EXPIRED`
- **SDK Status**: SDK callbacks and polling endpoints return `EXPIRED` consistently

This ensures merchants receive accurate status information when a payment method has expired.

## Step 5: Add the SDK view to the checkout

Use the `PaymentMethodListViewComponent` to display the available payment methods when implementing the Full SDK with Jetpack Compose. This component provides callbacks to notify your app when to enable or disable the pay button, and when an enrolled payment method is successfully removed.

### Component signature

```kotlin
@Composable
fun PaymentMethodListViewComponent(
    activity: Activity,
    modifier: Modifier? = null,
    onPaymentSelected: (Boolean) -> Unit,
    onUnEnrollSuccess: (Boolean) -> Unit = {}
)
```

### Parameters

* `activity: Activity`
  * The current `Activity` where the component is hosted. Required to handle payment flows correctly.
* `modifier: Modifier?` (optional)
  * Allows you to customise the layout and appearance (for example, padding, spacing). Defaults to `null`.
* `onPaymentSelected: (Boolean) -> Unit`
  * Callback invoked whenever a payment method is selected or deselected.
    * `true` → A method is selected (enable the pay button).
    * `false` → No method is selected (disable the pay button).
* `onUnEnrollSuccess: (Boolean) -> Unit` (optional)
  * Callback invoked when a stored payment method is successfully removed (unenrolled).
    * `true` → Indicates the removal succeeded.
    * Can be used to show a snackbar, refresh the list, or update UI state.

### Example

```kotlin
val coroutineScope = rememberCoroutineScope()
val snackbarHostState = remember { SnackbarHostState() }
var paymentMethodIsSelected by remember { mutableStateOf(false) }

Column(
    modifier = Modifier
        .weight(1f)
        .verticalScroll(rememberScrollState())
) {
    PaymentMethodListViewComponent(
        activity = activity,
        onPaymentSelected = { isSelected ->
            paymentMethodIsSelected = isSelected
        },
        onUnEnrollSuccess = { success ->
            if (success) {
                coroutineScope.launch {
                    snackbarHostState.showSnackbar(
                        message = "Your payment method has been removed",
                    )
                }
            }
        },
    )
}
```

> ❗ Important
>
> Always wrap the component in a `Column` with `.verticalScroll(rememberScrollState())`. Without this, the list of payment methods may not render or scroll properly when there are multiple methods available.

## Step 6: Initiate the payment process

Call the `startPayment()` method to start a payment process:

```kotlin
startPayment(
    showStatusYuno: Boolean,
    callbackOTT: (String?) -> Unit = this::onTokenUpdated,
    callBackTokenWithInformation: (OneTimeTokenModel?) -> Unit = this::onTokenComplete
)

```

### Parameters

Configure the payment with the following options:

| Parameter                      | Description                                                                                                                                                            |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `showStatusYuno`               | A boolean that specifies whether the payment status should be displayed within the Yuno interface.                                                                     |
| `callbackOTT`                  | A required function that returns the updated one-time token (OTT) needed to complete the payment process. This token is required to complete the payment.              |
| `callBackTokenWithInformation` | A function that supplies detailed information about the one-time token, wrapped in a `OneTimeTokenModel` object, allowing for comprehensive handling of token details. |

## Step 7: Get the one-time token (OTT)

After the customer fills out the requested data in Yuno's payment forms, you will obtain the one-time token, a required parameter to create a payment using the Yuno API.

The one-time token will be shared by Yuno using the `callbackOTT` function you provided in Step 6 when initiating the payment. The one-time token will be available in the `onActivityResult`.

> 📘 Loader Configuration
>
> While Yuno receives the customer information and shares the one-time token, a loader can be displayed to improve the user experience. Yuno provides a default loader that can be used out of the box. However, merchants may choose to implement their own loader and are responsible for making the necessary configurations.

## Step 8: Create the payment

After receiving the one-time token, create the payment using the [Create payment endpoint](https://docs.y.uno/reference/create-payment). Use the `checkout_session` and the one-time token to create the payment. For the updated Android flow, see the [Android SDK integration guide](doc:android).

The response from the Create payment endpoint will include the parameter `sdk_action_required`, which defines if additional actions are required to finish the payment based on the payment type.

> 🚧 Continue Payment Method Integration
>
> Yuno **requires** you integrate the `continuePayment` method of the SDK after the payment is created because certain asynchronous payment methods require additional customer action to complete. The API will inform you of this scenario via the `sdk_action_required` field of the response, which will be returned as true. The `yuno.continuePayment()` function will display additional screens to customers, where they can carry out the necessary actions to complete the payment without you needing to handle every scenario.

## Step 9: Continue payment

Yuno requires integrating the SDK's `continuePayment` method after the payment is created, as certain asynchronous payment methods require additional customer actions to complete. The response from the [Create payment endpoint](https://docs.y.uno/reference/create-payment), from Step 8, will include a `sdk_action_required` field. If it returns `TRUE`, you need to call the `continuePayment()` function to show additional screens that allow the customer to complete the payment. Otherwise, this step is not necessary. Call the `continuePayment` method:

```kotlin
continuePayment(
    showPaymentStatus: Boolean = true,
    checkoutSession: String? = null,
    countryCode: String? = null,
    callbackPaymentState: ((String?, String?) -> Unit)? = null
)
```

To show your payment status screens, send `FALSE` in the `showPaymentStatus` parameter. Then, get the payment state by callback.

## Render mode integration

The Yuno SDK render mode provides advanced UI flexibility, allowing developers to integrate payment flows with complete control over the user interface while maintaining full SDK functionality. This mode returns fragments that can be used with both Jetpack Compose and traditional XML views.

### Main function: `startPaymentRender`

The `startPaymentRender` function initializes the payment flow in render mode, giving you granular control over UI presentation.

```kotlin
fun Activity.startPaymentRender(
    checkoutSession: String? = null,
    countryCode: String? = null,
    coroutineScope: CoroutineScope,
    paymentSelected: PaymentSelected,
    listener: YunoPaymentRenderListener,
): YunoPaymentFragmentController
```

#### Parameters

| Parameter         | Type                        | Required | Description                                   |
| ----------------- | --------------------------- | -------- | --------------------------------------------- |
| `checkoutSession` | `String?`                   | No       | ID of the previously created checkout session |
| `countryCode`     | `String?`                   | No       | Country code for regional configurations      |
| `coroutineScope`  | `CoroutineScope`            | Yes      | Coroutine scope for asynchronous operations   |
| `paymentSelected` | `PaymentSelected`           | Yes      | Selected payment method                       |
| `listener`        | `YunoPaymentRenderListener` | Yes      | Listener implementation to receive events     |

### Implementation example

```kotlin
class PaymentActivity : Activity() {

    private lateinit var fragmentController: YunoPaymentFragmentController

    private fun initializePayment() {
        fragmentController = startPaymentRender(
            checkoutSession = "your_checkout_session_id",
            countryCode = "US",
            coroutineScope = lifecycleScope,
            paymentSelected = PaymentSelected.CARD,
            listener = paymentRenderListener
        )
    }
}
```

### `YunoPaymentRenderListener` interface

Implement this interface to receive all events and views from the SDK during the payment flow:

```kotlin
class PaymentRenderListener : YunoPaymentRenderListener {

    override fun showView(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.payment_container, fragment)
            .commit()
    }

    override fun returnStatus(resultCode: Int, paymentStatus: String) {
        when (paymentStatus) {
            "SUCCEEDED" -> handleSuccessfulPayment()
            "FAIL" -> handleFailedPayment()
        }
    }

    override fun returnOneTimeToken(oneTimeToken: String, additionalData: OneTimeTokenModel?) {
        createPaymentInBackend(oneTimeToken) { result ->
            when (result) {
                is Success -> fragmentController.continuePayment()
                is Error -> handlePaymentError(result.error)
            }
        }
    }

    override fun loadingListener(isLoading: Boolean) {
        progressBar.visibility = if (isLoading) View.VISIBLE else View.GONE
    }
}
```

### `YunoPaymentFragmentController` interface

Control the payment flow using the returned controller instance:

#### Methods

* **`submitForm()`**: Submits the current form when available
* **`continuePayment()`**: Continues the payment flow after backend OTT processing

```kotlin
fragmentController.submitForm()

fragmentController.continuePayment()
```

### Integration benefits

#### UI flexibility

* **Compose and XML compatible**: Works with both Jetpack Compose and traditional XML views
* **Complete control**: You decide where and how to display each view
* **Custom integration**: Easy integration with existing app design

#### Flow control

* **Custom submit logic**: Control when to submit forms
* **Backend integration**: Process OTT on your backend before continuing

### Complete integration example

```kotlin
class PaymentActivity : ComponentActivity() {

    private lateinit var fragmentController: YunoPaymentFragmentController

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        fragmentController = startPaymentRender(
            checkoutSession = checkoutSessionId,
            countryCode = "US",
            coroutineScope = lifecycleScope,
            paymentSelected = PaymentSelected.CARD,
            listener = object : YunoPaymentRenderListener {
                override fun showView(fragment: Fragment) {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.payment_fragment_container, fragment)
                        .commit()
                }

                override fun returnOneTimeToken(oneTimeToken: String, additionalData: OneTimeTokenModel?) {
                    processPaymentToken(oneTimeToken) {
                        fragmentController.continuePayment()
                    }
                }

                override fun returnStatus(resultCode: Int, paymentStatus: String) {
                    handlePaymentResult(paymentStatus)
                }

                override fun loadingListener(isLoading: Boolean) {
                    updateLoadingState(isLoading)
                }
            }
        )
    }
}
```

> 🚧 Lifecycle Management
>
> Ensure that the `CoroutineScope` is tied to the Activity/Fragment lifecycle to prevent memory leaks and ensure proper cleanup.

## Complementary features

The Yuno Android SDK provides additional services and configurations you can use to improve the customer experience. Use the [SDK customizations](doc:android-customizations) to change the SDK appearance to match your brand or to configure the loader:

### Click to Pay (CTP) with Passkey

Unlike other processes, when a user completes a payment using CTP Passkey, the _One-Time Token_ (`OTT`) will not be received through the usual callback methods. The OTT will be delivered via the **deeplink URL** in the Intent. Your app must read it from the `Intent`, create the payment on your backend, and then continue the flow with the SDK.

> ⚠️ Important
>
> It is **essential** to include a `callback_url` when creating the checkout session for CTP Passkey payments. This URL must match the deeplink scheme configured in your AndroidManifest. For example:
>
> ```json
> {
>   "callback_url": "myapp://pay/ctp"
> }
> ```
>
> The `callback_url` is used to redirect the customer back to your app after the Passkey authentication process completes.

#### 1. AndroidManifest (deeplink)

Add an `intent-filter` to your main activity in `AndroidManifest.xml`:

```xml
<activity android:name=".CheckoutActivity" android:exported="true">
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <!-- Adjust to your actual scheme/host -->
    <data android:scheme="myapp" android:host="pay" android:pathPrefix="/ctp" />
  </intent-filter>
</activity>
```

Adjust the `scheme`, `host`, and `pathPrefix` to match your app's configuration.

#### 2. Handle the Intent

In your activity, handle the Intent in both `onCreate()` and `onNewIntent()`:

```kotlin
class CheckoutActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initYuno()
        startCheckout()
        // Initialize your SDK / UI
        handleDeeplink(intent)
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        handleDeeplink(intent)
    }

    private fun handleDeeplink(intent: Intent?) {
        val uri = intent?.data ?: return

        when {
            // Cancellation or error
            uri.getBooleanQueryParameter("has_error", false) -> {
                val message = uri.getQueryParameter("message") ?: "Operation canceled"
                showError(message)
            }

            // Success: OTT received in URL
            uri.getQueryParameter("one_time_token") != null -> {
                val ott = extractOtt(uri) ?: return
                val checkoutSession = extractCheckoutSession(uri)

                // 1) Send the OTT to your backend to create the payment
                createPaymentOnBackend(ott) { success ->
                    if (success && checkoutSession != null) {
                        // 2) Then continue the flow in the SDK
                        continuePayment(
                            checkoutSession = checkoutSession,
                            countryCode = currentCountry
                        ) { result ->
                            // Handle payment state
                        }
                    }
                }
            }
        }
    }
    
    private fun extractOtt(uri: Uri): String? =
        uri.getQueryParameter("one_time_token")

    private fun extractCheckoutSession(uri: Uri): String? =
        uri.getQueryParameter("checkout_session")
            ?: uri.getQueryParameter("checkoutSession")
}
```

#### 3. Create the Payment (Backend)

Once you extract the **OTT** from the deeplink, create the payment on your backend using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment).

After receiving a successful response from your backend (payment created), continue the flow in the SDK by calling `continuePayment()`.

#### 4. Helper Functions

Create helper functions to extract parameters from the Intent URI:

```kotlin
private fun extractOtt(uri: Uri): String? =
    uri.getQueryParameter("one_time_token")

private fun extractCheckoutSession(uri: Uri): String? =
    uri.getQueryParameter("checkout_session")
        ?: uri.getQueryParameter("checkoutSession")
```

<Callout icon="💡" theme="default">
  ### Tip

  In QA environments, log the complete URL to verify the parameter names.
</Callout>

#### 5. Quick Testing

You can test the CTP Passkey flow using these sample deeplink URLs:

* **Success:** `myapp://pay/ctp?one_time_token=OTT_123&checkout_session=CHK_456`
* **Error:** `myapp://pay/ctp?has_error=true&message=User%20canceled`
* **Continuation:** `myapp://pay/ctp`

#### 6. Checklist

Use this checklist to ensure proper CTP Passkey integration:

* ✅ `callback_url` included when creating the checkout session (must match deeplink scheme)
* ✅ `intent-filter` configured correctly (scheme/host/path)
* ✅ `handleDeeplink` implemented in both `onCreate()` and `onNewIntent()`
* ✅ Extract both `one_time_token` and `checkout_session` parameters
* ✅ Create payment on backend with **OTT** ➜ call `continuePayment(...)`
* ✅ Handle `has_error` and `message` parameters for error scenarios

> ⚠️ Important
>
> The OTT will **not** be received through the `callbackOTT` function for CTP Passkey payments. You must extract the token from the Intent URI parameters instead.

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

To use the `styles` customization option, use the `YunoConfig` data class, described in Step 2.

### Loader

The loader functionality is controlled through the `keepLoader` parameter in the `YunoConfig` data class, which is documented inline in the SDK configuration section above.

### Save card for future payments

You can display a checkbox to save or enroll cards using `cardSaveEnable: true`. The following examples show the checkbox for both card form renders:

<Image align="center" border={false} src="https://files.readme.io/bc488803d0318c28987b6db6fc68652ffaea43dbbd456e8dada33f7cdd472030-Card___save_for_future_payments.png" />

### Render options

You can choose between two card form render options. The following screenshots show the difference between ONE_STEP and STEP_BY_STEP:

<Image align="center" border={false} src="https://files.readme.io/2b2b5c5c798e57c561beb5cf3e7711e83928de826c2922cd8262b4459c6e1737-Full_SDK_android.png" />

### SDK customizations

You can change the SDK appearance to match your brand. For more information, see the [SDK customization](doc:android-customizations) page.

> 📘 Demo Application
>
> In addition to the code examples provided, you can access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-android/tree/master) for a complete implementation of Yuno Android SDKs.

## Error handling

Handle errors returned by the SDK in your app (e.g. failed payments, validation errors). For HTTP status and response codes, see [Status and response codes](https://docs.y.uno/reference/status-and-response-codes) in the API reference. To refund a payment, see [Refund payments](https://docs.y.uno/docs/refund-payments) and the [Refund payment](https://docs.y.uno/reference/refund-payment) API.
