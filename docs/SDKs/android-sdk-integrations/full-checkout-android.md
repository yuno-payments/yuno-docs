---
title: Full SDK (Android)
excerpt: ''
deprecated: false
hidden: false
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
> 👍 Recommended SDK
>
> We recommend using the [Android Seamless SDK](seamless-sdk-payment-android) for a smooth integration experience. This option provides a flexible payment solution with pre-built UI components and customization options.

This page provides a guide to the Yuno Full SDK for Android, which offers a complete payment solution with a customizable UI. It provides advanced features like payment method management, fraud prevention, and seamless checkout flows, making it more feature-rich than our Headless SDK, which is specific to core payment processing capabilities.

## Requirements

Before starting the Yuno Android SDK, ensure your project meets the [technical requirements](doc:requirements-android). Also, ensure the following prerequisites are in place:

1. You must have an active Yuno account
2. You need your Yuno API credentials (`account_id`, `public-api-key`, and `private-secret-key`), which you can obtain from the [Developers section of the Yuno dashboard](https://docs.y.uno/docs/developers-credentials). These credentials are required to authenticate requests to the Yuno API. The API is used to:

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
> Access the [Release notes](#docs/release-notes-android-sdk) or the [Yuno Android SDK repository](#https://github.com/yuno-payments/yuno-sdk-android) to verify the last SDK version available.

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
> See the credentials page for more information: https://docs.y.uno/reference/authentication

Use the data class `YunoConfig` to customize the SDK's behavior. Include this configuration when calling `Yuno.initialize()`. The available options are:

```kotlin
data class YunoConfig(
    val cardFlow: CardFormType = CardFormType.ONE_STEP,
    val saveCardEnabled: Boolean = false,
    val cardFormDeployed: Boolean = false,
    val language: YunoLanguage? = null,
    val styles: YunoStyles? = null
)
```

Parameters

The following table describes each customization available:

| Customization option | Description |
| :------------------- | :---------- |
| `cardFlow` | It is an optional configuration that defines Payment and Enrollment Card flow. By default, the `CardFormType.ONE_STEP` option is used. Check the [Render options](/docs/full-checkout-android#render-options) section for more information. |
| `saveCardEnabled` | Enables the Save card checkbox on card flows. Check the [Save card](/docs/full-checkout-android#save-card-for-future-payments) section for more information. |
| `cardFormDeployed` | This option is only available for Full SDK. If `TRUE`, the system presents the card form deployed on the payment methods list. If `FALSE`, presents the normal card form on another screen. |
| `language` | Defines the language to be used in the payment forms. You can set it to one of the available language options: <ul><li>es (Spanish)</li><li>en (English)</li><li>pt (Portuguese)</li><li>fil (Filipino)</li><li>id (Indonesian)</li><li>ms (Malay)</li><li>th (Thai)</li><li>zh-TW (Chinese (Traditional, Taiwan))</li><li>zh-CN (Chinese (Simplified, China))</li><li>vi (Vietnamese)</li><li>fr (French)</li><li>pl (Polish)</li><li>it (Italian)</li><li>de (German)</li><li>ru (Russian)</li><li>tr (Turkish)</li><li>nl (Dutch)</li><li>sv (Swedish)</li><li>ko (Korean)</li><li>ja (Japanese)</li></ul> |
| `styles` | Enables SDK-wide UI customization. Use it to define global visual styles like font family and button appearance (color, padding, radius, typography) through a `YunoStyles` object. For more information, check the [`styles`](/docs/full-checkout-android#styles) section. |

Update your manifest to use your application:

```xml
<application android:name=".CustomApplication"></application>
```

## Step 3: Create the checkout session

Each payment requires a new `checkout_session`, which provides access to all available payment methods for a specific customer. Use the [Create checkout session](ref:create-checkout-session) endpoint to obtain a new `checkout_session`. This session is then used to initiate the payment.

> 📘 External Browser Return Handling
>
> If your payment flow sends users to an external browser (for example, for 3DS authentication or bank redirects), make sure to set the `callback_url` when creating your checkout session. For a step-by-step guide on handling the return to your app, see [Handle external browser return (callback_url)](/docs/external-browser-callback-android).

## Step 4: Start the checkout process

Call the `startCheckout` method inside the `onCreate()` function of the activity that initializes the SDK to start a new payment process with the Full SDK:

```kotlin
startCheckout(
  checkoutSession: "checkout_session",
  countryCode: "country_code_iso",
  callbackPaymentState: ((String?) -> Unit)?,
  merchantSessionId: String? = null
)
```

### Parameters

Configure the checkout with the following options:

| Parameter              | Description                                                                                                                                                                               |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`      | A unique identifier for the checkout session associated with the payment. It is required to initialize the payment process and grants access to the customer's available payment methods. |
| `countryCode`          | Country code where the payment is performed. See [Country coverage](doc:country-coverage-yuno-sdk) for a complete list of supported countries and their codes.                            |
| `callbackPaymentState` | It's a function that returns the current payment process. You don't need to send this function if you don't need the result.                                                              |
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

After receiving the one-time token from [Step 7](doc:full-checkout-android#step-7-get-the-one-time-token-ott), create the payment using the [Create payment endpoint](https://docs.y.uno/reference/create-payment). Use the `checkout_session` from [Step 3](doc:full-checkout-android#step-3-create-the-checkout-session) and the one-time token to create the payment.

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
    callbackPaymentState: ((String?) -> Unit)? = null
)
```

To show your payment status screens, send `FALSE` in the `showPaymentStatus` parameter. Then, get the payment state by callback.

## Render Mode integration

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
        // Display fragment in your UI container
        supportFragmentManager.beginTransaction()
            .replace(R.id.payment_container, fragment)
            .commit()
    }

    override fun returnStatus(resultCode: Int, paymentStatus: String) {
        // Handle final payment status
        when (paymentStatus) {
            "SUCCEEDED" -> handleSuccessfulPayment()
            "FAIL" -> handleFailedPayment()
            // Handle other states
        }
    }

    override fun returnOneTimeToken(oneTimeToken: String, additionalData: OneTimeTokenModel?) {
        // Process OTT in your backend, then continue the flow
        createPaymentInBackend(oneTimeToken) { result ->
            when (result) {
                is Success -> fragmentController.continuePayment()
                is Error -> handlePaymentError(result.error)
            }
        }
    }

    override fun loadingListener(isLoading: Boolean) {
        // Show/hide loading indicators
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
// Submit form when ready
fragmentController.submitForm()

// Continue after successful backend processing
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
                    // Process in backend and continue
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

Yuno Android SDK provides additional services and configurations you can use to improve customers' experience. Use the [SDK customizations](doc:sdk-customizations-android) to change the SDK appearance to match your brand or to configure the loader:

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

The [Loader](https://docs.y.uno/docs/loader-android) enables you to control the use of the loader component:

### Save card for future payments

You can display a checkbox to save or enroll cards using `cardSaveEnable: true`. The following examples show the checkbox for both card form renders:

<Image align="center" src="https://files.readme.io/bc488803d0318c28987b6db6fc68652ffaea43dbbd456e8dada33f7cdd472030-Card___save_for_future_payments.png" />

### Render options

You can choose between two card form render options. The following screenshots show the difference between `cardFormType` `ONE_STEP` and `STEP_BY_STEP`:

<Image align="center" src="https://files.readme.io/2b2b5c5c798e57c561beb5cf3e7711e83928de826c2922cd8262b4459c6e1737-Full_SDK_android.png" />

### SDK customizations

You can change the SDK appearance to match your brand. For more information, see the [SDK customizations](https://docs.y.uno/docs/sdk-customizations-android) page.

> 📘 Demo Application
>
> In addition to the code examples provided, you can access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-android/tree/master) for a complete implementation of Yuno Android SDKs.
