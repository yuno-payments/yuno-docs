---
title: New - Android SDK Payment Integration
deprecated: false
hidden: true
metadata:
  robots: index
---
This guide shows you how to integrate payment processing with Yuno's Android SDK. You'll learn about different mounting options and choose the approach that best fits your UI/UX requirements.

> 📘 Prerequisites
>
> Before starting, make sure you've [installed and initialized the SDK](doc:new-getting-started-with-android-sdk).

## Choose Your Mounting Option

The Yuno SDK offers **three mounting options** for displaying payment methods. All options use the same SDK - the difference is which function you call and how payment methods are presented to customers.

### Option A: Automatic Payment Method Display

**Use `PaymentMethodListViewComponent` when:**

* You want Yuno to display all available payment methods automatically
* You need a complete checkout solution with minimal frontend work
* Payment methods should update automatically from dashboard configuration

```kotlin
PaymentMethodListViewComponent(
    activity = activity,
    onPaymentSelected = { isSelected ->
        paymentMethodIsSelected = isSelected
    }
)
```

**Best for:** Quick integration, standard e-commerce, marketplace checkouts

### Option B: Custom Payment Method Display

**Use `startPaymentLite()` when:**

* You want full control over payment method selection UI
* You need to customize which methods to display and how
* You want to integrate payment forms into your existing checkout design

```kotlin
startPaymentLite(
    paymentSelected = PaymentSelected(
        paymentMethodType = "CARD" // You control which method
    )
)
```

**Best for:** Custom checkout experiences, branded payment flows, complex UX requirements

### Option C: Seamless Flow

**Use `startPaymentSeamlessLite()` when:**

* You want a simplified single-call approach
* You prefer streamlined payment creation
* You want minimal integration code

```kotlin
startPaymentSeamlessLite(
    paymentSelected = PaymentSelected(
        paymentMethodType = "CARD" // You control which method
    )
)
```

**Best for:** Streamlined checkouts, simple payment flows, rapid implementation

### Quick Comparison

| Feature                    | Automatic Display                | Custom Display       | Seamless Flow                |
| -------------------------- | -------------------------------- | -------------------- | ---------------------------- |
| **Component**              | `PaymentMethodListViewComponent` | `startPaymentLite()` | `startPaymentSeamlessLite()` |
| **Payment method display** | Yuno handles                     | You control          | You control                  |
| **UI control**             | High customization               | Complete control     | High customization           |
| **Integration effort**     | Low                              | Medium               | Low                          |
| **Best for**               | Standard checkouts               | Custom experiences   | Quick implementation         |

## Step 1: Create a Checkout Session

Before starting the payment flow, create a checkout session on your backend using the [Create Checkout Session](ref:create-checkout-session) endpoint.

* First, [create a customer](ref:create-customer) or retrieve an existing customer ID
* Include it when creating the `checkout_session`

```kotlin
// Server-side
val checkoutSession = createCheckoutSession(
    customer_id = "customer-id-here",
    amount = mapOf(
        "currency" to "USD",
        "value" to 1000
    ),
    country = "US"
)
```

<Callout icon="💳" theme="default">
  ### Control Authorization and Capture

  To control authorization and capture with cards, include `payment_method.detail.card.capture` in the checkout session: set `false` to authorize only, `true` to capture immediately.
</Callout>

> 🚧 External Browser Return Handling
>
> If your payment flow sends users to an external browser (for 3DS authentication or bank redirects), set the `callback_url` when creating your checkout session. See [Handle External Browser Return](doc:external-browser-callback-android) for a step-by-step guide.

### Key Parameters

| Parameter            | Required    | Description                                                                                                                                                        |
| -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `amount`             | Yes         | The primary transaction amount object containing `currency` (ISO 4217 code) and `value` (numeric amount).                                                          |
| `alternative_amount` | No          | An alternative currency representation with the same structure as `amount`. Useful for multi-currency scenarios.                                                   |
| `callback_url`       | Recommended | URL to redirect users back to your app after external browser flows (3DS, bank redirects). See [External Browser Handling](doc:external-browser-callback-android). |

## Step 2: Start the Checkout Process

Call the `startCheckout` method inside the `onCreate()` function of the activity that initializes the SDK:

```kotlin
startCheckout(
    checkoutSession = "438413b7-4921-41e4-b8f3-28a5a0141638",
    countryCode = "US",
    callbackPaymentState = { paymentState ->
        // Handle payment state
    },
    merchantSessionId = null
)
```

### Parameters

| Parameter              | Description                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`      | A unique identifier for the checkout session associated with the payment. Required to initialize the payment process.       |
| `countryCode`          | Country code where the payment is performed. See [Country Coverage](doc:country-coverage-yuno-sdk) for supported countries. |
| `callbackPaymentState` | Optional function that returns the current payment state. See [Payment States](#payment-states) below.                      |
| `merchantSessionId`    | Optional identifier used by the merchant to track the payment (e.g., for fraud prevention tools like ClearSale).            |

### Payment States

The `callbackPaymentState` callback receives one of the following states:

```kotlin
const val PAYMENT_STATE_SUCCEEDED = "SUCCEEDED"
const val PAYMENT_STATE_FAIL = "FAIL"
const val PAYMENT_STATE_PROCESSING = "PROCESSING"
const val PAYMENT_STATE_REJECT = "REJECT"
const val PAYMENT_STATE_INTERNAL_ERROR = "INTERNAL_ERROR"
const val PAYMENT_STATE_CANCELED_BY_USER = "CANCELED"
```

| State            | Description                                                    | Action Required                       |
| ---------------- | -------------------------------------------------------------- | ------------------------------------- |
| `SUCCEEDED`      | Payment completed successfully                                 | No                                    |
| `FAIL`           | Payment failed due to validation, network, or technical issues | Yes - Investigate and retry           |
| `PROCESSING`     | Payment in progress, awaiting approval                         | No                                    |
| `REJECT`         | Payment rejected (insufficient funds, fraud detection, etc.)   | Yes - Inform user and suggest actions |
| `INTERNAL_ERROR` | Unexpected internal error occurred                             | Yes - Technical intervention required |
| `CANCELED`       | User canceled the payment                                      | No                                    |

### Payment Status Validation

#### Sync Payment Methods (Google Pay)

For synchronous payment methods like Google Pay, when a user cancels before PSP response:

* **SDK Status**: Returns `CANCELED` (CANCELLED_BY_USER)
* **Backend Payment Status**: Remains `PENDING` until PSP timeout or merchant cancellation
* **Important**: The SDK will not return `REJECT` or `PROCESSING` in this scenario

#### Async Payment Methods (PIX, QR codes)

For asynchronous payment methods like PIX, when a user closes the QR window:

* **SDK Status**: Returns `PROCESSING`, optionally with sub-status `CLOSED_BY_USER`
* **Backend Payment Status**: Remains `PENDING` and QR code remains valid until expiry
* **Checkout Session Reuse**: Re-opening the same session can display the same valid QR code
* **No Automatic Cancellation**: Payment is not automatically canceled

#### Expired Async Payments

If a PIX QR code expires naturally:

* **Backend Status**: Updated to `EXPIRED`
* **SDK Status**: Callbacks and polling endpoints return `EXPIRED` consistently

## Step 3: Mount the SDK

Choose your mounting option based on your integration needs:

### Option A: Automatic Payment Method Display

Use the `PaymentMethodListViewComponent` to display all available payment methods automatically:

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
                        message = "Your payment method has been removed"
                    )
                }
            }
        }
    )
}
```

> ❗ Important
>
> Always wrap the component in a `Column` with `.verticalScroll(rememberScrollState())`. Without this, the list may not render or scroll properly when multiple payment methods are available.

#### Component Parameters

| Parameter           | Description                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `activity`          | The current `Activity` where the component is hosted. Required for payment flows.                                                                                        |
| `modifier`          | Optional Compose modifier for customizing layout and appearance.                                                                                                         |
| `onPaymentSelected` | Callback invoked when payment method is selected/deselected. Returns `true` when a method is selected (enable pay button), `false` when deselected (disable pay button). |
| `onUnEnrollSuccess` | Optional callback invoked when a stored payment method is successfully removed. Returns `true` on success.                                                               |

### Option B: Custom Payment Method Display

You control which payment method to display. First, fetch available methods from the API, display them in your UI, then mount the selected method.

**Step 1: Fetch available payment methods**

Call the API to retrieve payment methods available for the checkout session:

```kotlin
// Backend API call
GET /v1/checkout/sessions/{checkout_session}/payment-methods

// Example response
{
  "payment_methods": [
    {
      "type": "CARD",
      "name": "Credit/Debit Card",
      "supported": true
    },
    {
      "type": "PIX",
      "name": "PIX",
      "supported": true
    },
    // ... more payment methods
  ]
}
```

**Step 2: Display payment methods in your UI**

Present the payment methods to your customer and capture their selection.

**Step 3: Mount the selected payment method**

```kotlin
startPaymentLite(
    paymentSelected = PaymentSelected(
        paymentMethodType = "CARD", // User's selection
        vaultedToken = null // Optional: for enrolled methods
    ),
    callbackOTT = { oneTimeToken ->
        // Handle one-time token
    },
    callBackTokenWithInformation = { tokenModel ->
        // Optional: Handle additional token information
    },
    showPaymentStatus = true
)
```

See the [Payment Types](ref:payment-type-list) page for the complete list of payment method types.

### Option C: Seamless Flow

Similar to custom display, but with simplified flow:

```kotlin
startPaymentSeamlessLite(
    paymentSelected = PaymentSelected(
        paymentMethodType = "CARD", // User's selection
        vaultedToken = null // Optional: for enrolled methods
    ),
    callbackPaymentState = { paymentState ->
        // Handle payment state
    },
    showPaymentStatus = true
)
```

### Using PaymentSelected

```kotlin
PaymentSelected(
    vaultedToken = "payment_vaulted_token", // Optional: for enrolled methods
    paymentMethodType = "CARD" // Required: payment type
)
```

## Step 4: Initiate the Payment Process

After mounting the SDK, trigger the payment:

### For Automatic Display

Call `startPayment()` when the user clicks your pay button:

```kotlin
startPayment(
    showStatusYuno = true,
    callbackOTT = { oneTimeToken ->
        // Create payment with token
    },
    callBackTokenWithInformation = { tokenModel ->
        // Optional: Handle additional information
    }
)
```

### For Custom Display & Seamless

The payment flow is initiated automatically when you call `startPaymentLite()` or `startPaymentSeamlessLite()` in Step 3.

### Parameters

| Parameter                      | Description                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `showStatusYuno`               | Boolean specifying whether the payment status should be displayed within the Yuno interface.                   |
| `showPaymentStatus`            | Boolean specifying whether to show the SDK's default result screen.                                            |
| `callbackOTT`                  | Required function that returns the one-time token needed to complete the payment.                              |
| `callBackTokenWithInformation` | Optional function that supplies detailed information about the one-time token in a `OneTimeTokenModel` object. |
| `callbackPaymentState`         | Optional function that returns the current payment state.                                                      |

## Step 5: Get the One-Time Token

After the customer fills out the payment form, the SDK generates a one-time token (OTT) and calls your callback:

```kotlin
callbackOTT = { oneTimeToken ->
    oneTimeToken?.let {
        // Send token to your backend to create the payment
        createPayment(it, checkoutSession)
    }
}
```

The `callBackTokenWithInformation` callback provides additional information:

```kotlin
callBackTokenWithInformation = { tokenModel ->
    tokenModel?.let {
        // Access additional information like installments, document data
        val installments = it.installment
        val document = it.customer?.document
    }
}
```

> 📘 Loader Management
>
> The merchant is responsible for managing the loader. Yuno provides a default loader option, but merchants may implement their own loader if preferred.

## Step 6: Create the Payment

In your backend, call the [Create Payment endpoint](ref:create-payment) using the one-time token:

```kotlin
// Backend API call
POST /v1/payments
{
  "checkout": {
    "session": "checkout-session-id"
  },
  "payment_method": {
    "type": "CARD",
    "token": "one-time-token-from-sdk"
  },
  ...
}
```

The response includes the `sdk_action_required` parameter that defines if additional actions are required based on the payment type.

> 🚧 ContinuePayment Method Required
>
> Yuno **requires** you integrate the `continuePayment` method after the payment is created because certain asynchronous payment methods require additional customer action to complete. The API will inform you via the `sdk_action_required` field (set to `true`). The `continuePayment()` function will display additional screens to customers where they can complete the payment.

## Step 7: Continue Payment

Call the `continuePayment` method after creating the payment:

```kotlin
continuePayment(
    showPaymentStatus = true,
    checkoutSession = "checkout-session-id",
    countryCode = "US",
    callbackPaymentState = { paymentState ->
        // Handle payment result
    }
)
```

To show your own payment status screens, send `false` in the `showPaymentStatus` parameter and handle the payment state via callback.

## Payment with Vaulted Tokens

If a customer has a previously enrolled payment method, use the vaulted token:

```kotlin
// With automatic display - select the enrolled method from the list

// With custom display
startPaymentLite(
    paymentSelected = PaymentSelected(
        paymentMethodType = "CARD",
        vaultedToken = "stored-token-here"
    )
)

// With seamless
startPaymentSeamlessLite(
    paymentSelected = PaymentSelected(
        paymentMethodType = "CARD",
        vaultedToken = "stored-token-here"
    )
)
```

> **Best Practice:** Even when using vaulted tokens, pass them through the SDK instead of directly to the API. This ensures proper 3DS handling, fraud screening, and collection of any required information.

## Save Cards During Payment

Enable `saveCardEnabled` in `YunoConfig` when initializing the SDK to show a "Save card" checkbox:

```kotlin
Yuno.initialize(
    this,
    PUBLIC_API_KEY,
    config = YunoConfig(
        saveCardEnabled = true
    )
)
```

<Image align="center" border={false} src="https://files.readme.io/bc488803d0318c28987b6db6fc68652ffaea43dbbd456e8dada33f7cdd472030-Card___save_for_future_payments.png" />

**Result:** If the user checks the box and payment succeeds, you'll receive a `vaulted_token` in the payment response.

## Advanced Features

### Render Mode Integration

The SDK render mode provides advanced UI flexibility, returning fragments you can use with both Jetpack Compose and traditional XML views.

#### Main Function: `startPaymentRender`

```kotlin
fun Activity.startPaymentRender(
    checkoutSession: String? = null,
    countryCode: String? = null,
    coroutineScope: CoroutineScope,
    paymentSelected: PaymentSelected,
    listener: YunoPaymentRenderListener,
): YunoPaymentFragmentController
```

#### Implementation Example

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

### Click to Pay (CTP) with Passkey

When a user completes payment using CTP Passkey, the One-Time Token (OTT) is delivered via **deeplink URL** in the Intent, not through callbacks.

> ⚠️ Important
>
> Include a `callback_url` when creating the checkout session for CTP Passkey payments. This URL must match your deeplink scheme:
>
> ```json
> {
>   "callback_url": "myapp://pay/ctp"
> }
> ```

#### 1. Configure AndroidManifest (Deeplink)

```xml
<activity android:name=".CheckoutActivity" android:exported="true">
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="myapp" android:host="pay" android:pathPrefix="/ctp" />
  </intent-filter>
</activity>
```

#### 2. Handle the Intent

```kotlin
class CheckoutActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initYuno()
        startCheckout()
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
            uri.getBooleanQueryParameter("has_error", false) -> {
                val message = uri.getQueryParameter("message") ?: "Operation canceled"
                showError(message)
            }

            uri.getQueryParameter("one_time_token") != null -> {
                val ott = extractOtt(uri) ?: return
                val checkoutSession = extractCheckoutSession(uri)

                createPaymentOnBackend(ott) { success ->
                    if (success && checkoutSession != null) {
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

## Additional Features

### Card Form Customization

Configure card form behavior when initializing the SDK:

```kotlin
YunoConfig(
    cardFlow = CardFormType.ONE_STEP, // or STEP_BY_STEP
    cardFormDeployed = false, // Show card form expanded in list
    cardNumberPlaceholder = "Enter card number",
    hideCardholderName = false
)
```

### SDK Customization

Customize the SDK appearance to match your brand using `YunoStyles`:

```kotlin
YunoConfig(
    styles = YunoStyles(
        buttonStyles = YunoButtonStyles(
            backgroundColor = Color(0xFF6200EE),
            contentColor = Color.White,
            cornerRadius = 8.dp,
            padding = 16.dp
        ),
        fontFamily = customFontFamily
    )
)
```

For detailed customization options, see [SDK Customizations](doc:sdk-customizations-android).

## Demo Application

Access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-android/tree/master) for a complete implementation of all SDK features with working examples.

## Additional Resources

* **[SDK Customizations](doc:sdk-customizations-android)**: Change the SDK appearance to match your brand
* **[External Browser Handling](doc:external-browser-callback-android)**: Handle deep links and browser returns
* **[Card Scanning (OCR)](doc:card-scanning-ocr-android)**: Enable camera-based card scanning
* **[ClearSale Integration](doc:clearsale-sdk-android)**: Fraud prevention integration
* **[Enrollment Integration](doc:new-android-sdk-enrollment-integration)**: Save payment methods for future use
* **[Release Notes](doc:release-notes-android-sdk)**: Latest SDK updates

## Stay Updated

Visit the [Release Notes](doc:release-notes-android-sdk) page for the latest SDK updates and version history.