---
title: New - Android SDK Enrollment Integration
deprecated: false
hidden: true
metadata:
  robots: index
---
This guide shows you how to enroll payment methods to customer accounts for future use. Enrollment allows you to save payment methods **without processing a payment**.

> 📘 Prerequisites
>
> Before starting, make sure you've [installed and initialized the SDK](doc:new-getting-started-with-android-sdk).

## Enrollment vs. Save During Payment

There are **two ways** to save payment methods:

### Option 1: Separate Enrollment (This Page)

Use the enrollment workflow when:

* You want to save payment methods WITHOUT processing a payment
* You're setting up customer accounts before first purchase
* You're building a payment method management interface
* You need to enroll alternative payment methods (not just cards)

**Uses:** Customer session + enrollment API

### Option 2: Save During Payment

Use save-during-payment when:

* Customer is already making a purchase
* You want to save cards only (simpler approach)
* You don't need a separate enrollment UI

**Uses:** `saveCardEnabled: true` in `YunoConfig`

**[Learn about save-during-payment →](doc:new-android-sdk-payment-integration#save-cards-during-payment)**

> **For Cards:** Save-during-payment is usually easier. Use separate enrollment only when you need to save payment methods before a purchase.

## Step 1: Create a Customer

Create a customer using the [Create Customer endpoint](ref:create-customer) before enrolling payment methods. This endpoint returns a `customer_id` that you'll use to associate enrolled payment methods with the customer.

```kotlin
// Server-side
POST /v1/customers
{
  "merchant_customer_id": "your-internal-id",
  "email": "customer@example.com",
  "first_name": "John",
  "last_name": "Doe"
}
```

Store the returned `customer_id` for the next step.

## Step 2: Create a Customer Session

Create a new `customer_session` using the [Create Customer Session](ref:create-customer-session) endpoint to initialize the enrollment flow:

```kotlin
// Server-side
POST /v1/customers/sessions
{
  "customer_id": "customer-id-from-step-1",
  "country": "US"
}
```

The endpoint response provides the `customer_session` value required for enrollment.

> 🚧 Customer Session Generation
>
> You need to generate a new `customer_session` each time you enroll a payment method.

## Step 3: Initialize the Enrollment Process

Call the `initEnrollment` method within your activity's `onCreate` method to prepare your app to handle the enrollment flow. This is a mandatory setup step required by the Android operating system to register the contract that allows the SDK to send the final enrollment status back to your app.

```kotlin
class EnrollmentActivity : ComponentActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        initEnrollment(
            callbackEnrollmentState = { enrollmentState ->
                // Handle enrollment state
                when (enrollmentState) {
                    "SUCCEEDED" -> {
                        // Enrollment successful
                    }
                    "FAIL" -> {
                        // Enrollment failed
                    }
                    "CANCELED" -> {
                        // User canceled enrollment
                    }
                }
            }
        )
    }
}
```

## Step 4: Start the Enrollment Flow

Call the `startEnrollment` method to launch the user interface and begin enrolling a new payment method. You can call this method at any point after `initEnrollment` has been executed, such as when a user taps an "Add Payment Method" button.

```kotlin
fun Activity.startEnrollment(
    customerSession: String,
    countryCode: String,
    showEnrollmentStatus: Boolean = true,
    callbackEnrollmentState: ((String?) -> Unit)? = null,
    requestCode: Int
)
```

### Example Implementation

```kotlin
addPaymentMethodButton.setOnClickListener {
    startEnrollment(
        customerSession = "eec6578e-ac2f-40a0-8065-25b5957f6dd3",
        countryCode = "US",
        showEnrollmentStatus = true,
        callbackEnrollmentState = { enrollmentState ->
            // Handle enrollment result
        },
        requestCode = 1001 // Optional: for onActivityResult
    )
}
```

### Parameters

| Parameter                 | Description                                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `customerSession`         | The session customer associated with the current enrollment process.                                                           |
| `countryCode`             | Country code where the enrollment is performed. See [Country Coverage](doc:country-coverage-yuno-sdk) for supported countries. |
| `showEnrollmentStatus`    | Indicates whether the enrollment status should be shown. Default: `true`.                                                      |
| `callbackEnrollmentState` | Optional function that returns the current enrollment state. Must call `initEnrollment` in `onCreate` to use this callback.    |
| `requestCode`             | Optional parameter needed if using the `onActivityResult` method to capture enrollment states.                                 |

### Enrollment States

The `callbackEnrollmentState` callback receives one of the following states:

```kotlin
const val ENROLLMENT_STATE_SUCCEEDED = "SUCCEEDED"
const val ENROLLMENT_STATE_FAIL = "FAIL"
const val ENROLLMENT_STATE_PROCESSING = "PROCESSING"
const val ENROLLMENT_STATE_REJECT = "REJECT"
const val ENROLLMENT_STATE_INTERNAL_ERROR = "INTERNAL_ERROR"
const val ENROLLMENT_STATE_CANCELED_BY_USER = "CANCELED"
```

| State            | Description                                                       | Action Required                       |
| ---------------- | ----------------------------------------------------------------- | ------------------------------------- |
| `SUCCEEDED`      | Enrollment completed successfully                                 | No                                    |
| `FAIL`           | Enrollment failed due to validation, network, or technical issues | Yes - Investigate and retry           |
| `PROCESSING`     | Enrollment in progress, awaiting approval                         | No                                    |
| `REJECT`         | Enrollment rejected (missing requirements, inconsistencies)       | Yes - Inform user and suggest actions |
| `INTERNAL_ERROR` | Unexpected internal error occurred                                | Yes - Technical intervention required |
| `CANCELED`       | User canceled the enrollment                                      | No                                    |

## Check Enrollment Status

Use the `enrollmentStatus()` function to check the current enrollment state at any time:

```kotlin
fun AppCompatActivity.enrollmentStatus(
    customerSession: String,
    countryCode: String,
    showEnrollmentStatus: Boolean = false,
    callbackEnrollmentState: ((String?) -> Unit)? = null,
)
```

This function is optional and not required to complete the enrollment process.

> 🚧 Callback Override
>
> If you provide a new callback when calling `enrollmentStatus`, it will override the callback you set when calling `initEnrollment`.

## Using onActivityResult (Deprecated)

> ❗️ Deprecated Method
>
> The `onActivityResult` method is deprecated. If you are performing a new Android integration, Yuno recommends using the `initEnrollment()` contract, which follows Google's best practices.

The `onActivityResult` method is automatically invoked when an activity returns a result. Follow these steps to process the enrollment result:

> 📘 Using Default Request Code
>
> If you didn't provide a `requestCode` when calling `startEnrollment`, you must use the `YUNO_ENROLLMENT_REQUEST_CODE` provided by Yuno.

### Implementation

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
            // Handle successful enrollment
        }
        "FAIL" -> {
            // Handle failed enrollment
        }
    }
}
```

## Using Enrolled Payment Methods

After successful enrollment, you receive a `vaulted_token` that represents the saved payment method.

### Retrieving Vaulted Tokens

Get enrolled payment methods for a customer:

```kotlin
// Get by customer ID
GET /v1/customers/{customer_id}/payment-methods

// Get by checkout session (for payment)
GET /v1/checkout/sessions/{checkout_session}/payment-methods
```

**API References:**

* [Get payment methods by customer](ref:retrieve-enrolled-payment-methods-api)
* [Get payment methods by checkout session](ref:retrieve-payment-methods-for-checkout)

### Using in Future Payments

Pass the vaulted token when processing payments:

```kotlin
// With automatic display - select the enrolled method from the list

// With custom display
startPaymentLite(
    paymentSelected = PaymentSelected(
        paymentMethodType = "CARD",
        vaultedToken = "enrolled-token-here"
    )
)

// With seamless
startPaymentSeamlessLite(
    paymentSelected = PaymentSelected(
        paymentMethodType = "CARD",
        vaultedToken = "enrolled-token-here"
    )
)
```

> **Best Practice:** Always use vaulted tokens through the SDK, not directly in API calls. This ensures proper 3DS handling, fraud screening, and collection of any required fields.

## Managing Enrolled Payment Methods

Customers typically need to manage their saved payment methods:

### Display Saved Methods

Fetch and display enrolled payment methods in your UI:

```kotlin
// Fetch customer's saved methods
val paymentMethods = fetchEnrolledPaymentMethods(customerId)

// Display in your UI with options to:
// - Set as default
// - Delete/unenroll
// - Use for payment
```

### Unenroll (Remove) Payment Methods

Allow customers to remove saved payment methods:

```kotlin
// Delete a saved payment method
DELETE /v1/customers/{customer_id}/payment-methods/{vaulted_token}
```

The `PaymentMethodListViewComponent` also provides an `onUnEnrollSuccess` callback for handling removal in the UI:

```kotlin
PaymentMethodListViewComponent(
    activity = activity,
    onPaymentSelected = { isSelected ->
        // Handle selection
    },
    onUnEnrollSuccess = { success ->
        if (success) {
            // Payment method removed successfully
            showSnackbar("Payment method removed")
        }
    }
)
```

## Advanced Features

### Render Mode (Enrollment)

The SDK render mode lets you integrate the enrollment flow with full UI control while keeping SDK validation and logic. The SDK returns Android `Fragment` instances that you can display in both Jetpack Compose (via AndroidView) and traditional XML layouts.

#### Main Function: `startEnrollmentRender`

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

| Parameter         | Type                           | Required | Description                                                             |
| ----------------- | ------------------------------ | -------- | ----------------------------------------------------------------------- |
| `customerSession` | `String`                       | Yes      | The customer session for the enrollment process                         |
| `countryCode`     | `String`                       | Yes      | Country code for regional configuration                                 |
| `submitButton`    | `Boolean`                      | No       | If `true`, SDK renders submit actions internally; otherwise use your UI |
| `coroutineScope`  | `CoroutineScope`               | Yes      | Scope for async operations tied to Activity lifecycle                   |
| `listener`        | `YunoEnrollmentRenderListener` | Yes      | Listener that receives fragments, loading, and status events            |

#### Implementation Example

```kotlin
class EnrollmentActivity : Activity() {

    private lateinit var fragmentController: YunoEnrollmentFragmentController

    private fun initializeEnrollment() {
        fragmentController = startEnrollmentRender(
            customerSession = "your_customer_session_id",
            countryCode = "US",
            submitButton = false,
            coroutineScope = lifecycleScope,
            listener = object : YunoEnrollmentRenderListener {
                override fun showView(fragment: Fragment, needSubmit: Boolean) {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.enrollment_container, fragment)
                        .commit()

                    clientSubmitButton.isVisible = needSubmit
                    if (needSubmit) {
                        clientSubmitButton.setOnClickListener {
                            fragmentController.submitForm()
                        }
                    }
                }

                override fun returnStatus(resultCode: Int, paymentStatus: String) {
                    handleEnrollmentResult(paymentStatus)
                }

                override fun loadingListener(isLoading: Boolean) {
                    progressBar.isVisible = isLoading
                    clientSubmitButton.isEnabled = !isLoading
                }
            }
        )
    }
}
```

#### YunoEnrollmentRenderListener Interface

```kotlin
interface YunoEnrollmentRenderListener {
    fun showView(fragment: Fragment, needSubmit: Boolean)
    fun returnStatus(resultCode: Int, paymentStatus: String)
    fun loadingListener(isLoading: Boolean)
}
```

* **`showView(fragment, needSubmit)`**: Receives the fragment to display. `needSubmit` indicates whether to display your own submit button.
* **`returnStatus(resultCode, paymentStatus)`**: Final enrollment status event.
* **`loadingListener(isLoading)`**: Loading state callback for showing/hiding spinners.

#### YunoEnrollmentFragmentController Interface

```kotlin
interface YunoEnrollmentFragmentController {
    fun submitForm()
}
```

Control the enrollment flow by calling `submitForm()` when ready:

```kotlin
fragmentController.submitForm()
```

## Card Form Customization

Configure card form behavior when initializing the SDK:

```kotlin
YunoConfig(
    cardFlow = CardFormType.ONE_STEP, // or STEP_BY_STEP
    saveCardEnabled = false, // Not needed for enrollment
    cardNumberPlaceholder = "Enter card number",
    hideCardholderName = false
)
```

### Render Options

Choose between two card form layouts:

<Image align="center" border={false} src="https://files.readme.io/7525725793bb95941157225f086e5abaa58875401b435703e4d3e69e217ca690-Full_SDK_android.png" />

## SDK Customization

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

## Supported Payment Methods

Enrollment support varies by payment method type:

| Payment Method         | Enrollment Support             |
| ---------------------- | ------------------------------ |
| **Credit/Debit Cards** | ✅ Full support                 |
| **Bank Accounts**      | ✅ Varies by provider           |
| **Digital Wallets**    | ⚠️ Limited (depends on wallet) |
| **Cash Vouchers**      | ❌ Not applicable               |
| **QR Payments**        | ❌ Not applicable               |

> **For Cards:** Both SDK enrollment and save-during-payment work well.  
> **For Other Methods:** Check specific payment method documentation for support details.

## Demo Application

Access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-android/tree/master) for a complete implementation of enrollment functionality with working examples.

## Additional Resources

* **[Android SDK Complementary Features](doc:new-android-sdk-complementary-features)**: Configuration options, UI customization, card scanning, and fraud prevention
* **[Payment Integration](doc:new-android-sdk-payment-integration)**: Process payments with enrolled methods
* **[Release Notes](doc:release-notes-android-sdk)**: Latest SDK updates

## Common Questions

### When should I use enrollment vs. save-during-payment?

**Use enrollment when:**

* Setting up customer accounts before first purchase
* Building payment method management UI
* Need to enroll non-card payment methods

**Use save-during-payment when:**

* Customer is already making a purchase
* Only need to save cards
* Want simplest implementation

### Can I enroll payment methods without SDK?

See the Headless Enrollment section below for complete UI control. For API-only enrollment (requires PCI compliance), contact Yuno support.

### Do I need both enrollment and payment integration?

No. You only need enrollment if you want to save payment methods separately from purchases. Many merchants only implement payment with the save-during-payment option.

## Alternative: Headless Enrollment (Advanced)

For complete UI control, use the Headless Enrollment approach where you build your own enrollment UI and handle tokenization manually. This is ideal for merchants who need full control over the enrollment experience.

> 📘 When to Use Headless Enrollment
>
> Use Headless Enrollment when you need to:
> * Build a completely custom enrollment UI
> * Integrate enrollment into non-standard interfaces
> * Have full control over payment method presentation
> * Handle tokenization manually without SDK UI components

### Step 1: Create Customer Session

Before starting enrollment, create a customer session on your backend:

```kotlin
// Server-side
val customer = createCustomer(
    firstName = "John",
    lastName = "Doe",
    email = "john.doe@example.com"
)

val customerSession = createCustomerSession(
    customerId = customer.id,
    country = "US"
)
```

### Step 2: Create Enrollment Payment Method Object

Create an enrollment payment method object using the [Enroll Payment Method](ref:enroll-payment-method-checkout) endpoint:

```kotlin
// Server-side
val enrollmentObject = enrollPaymentMethod(
    customerSession = customerSession.id,
    paymentMethodType = "CARD"
)
```

> 🚧 Card Verification
>
> To verify cards (zero value authorization) before enrollment, include the `verify` object when creating the payment method object.

### Step 3: Initialize Headless API Client

After initializing the SDK with your public key, create a Headless enrollment client:

```kotlin
val apiClientEnroll = Yuno.apiClientEnroll(
    country_code = "US",
    customerSession = "cus_ses_123456",
    context = this
)
```

### Step 4: Collect Payment Information

Build your own UI to collect payment information from customers. The SDK doesn't provide any UI components in Headless mode - you're responsible for:

* Card number input
* Expiration date fields
* Security code field
* Cardholder name
* Any additional required fields

### Step 5: Generate Vaulted Token

Use the collected information to enroll the payment method:

```kotlin
try {
    val result = apiClientEnroll.continueEnrollment(
        collectedData = EnrollCollectedData(
            customerSession = "cus_ses_123456",
            paymentMethod = PaymentMethod(
                type = "CARD",
                card = CardData(
                    detail = CardDetail(
                        number = "4111111111111111",
                        expirationMonth = 12,
                        expirationYear = 25,
                        securityCode = "123",
                        holderName = "JOHN DOE",
                        type = "CREDIT" // or "DEBIT"
                    )
                ),
                customer = CustomerData(),
                deviceFingerprint = "device-fingerprint-id"
            )
        )
    )

    val vaultedToken = result.vaultedToken
    // Save this token for future payments
} catch (error: Exception) {
    Log.e("Enrollment", "Enrollment failed: ${error.message}")
}
```

### Step 6: Handle Asynchronous Enrollment Actions

For payment methods that require additional verification steps (3DS, etc.), handle the continuation:

```kotlin
if (apiClientEnroll.shouldContinue) {
    try {
        val continueResult = apiClientEnroll.continueEnrollment()
        // Handle enrollment completion
    } catch (error: Exception) {
        Log.e("Enrollment", "Continue enrollment failed: ${error.message}")
    }
}
```

### Key Parameters for `continueEnrollment()`

| Parameter | Required | Description |
|-----------|----------|-------------|
| `customerSession` | Yes | The customer session ID |
| `paymentMethod.type` | Yes | Payment method type (currently only "CARD" supported) |
| `card.detail` | Yes | Card information including number, expiration, security code, holder name |
| `card.detail.type` | No | "CREDIT" or "DEBIT" (auto-detected if not provided) |
| `deviceFingerprint` | No | Required if fraud screening is configured |

### Response Structure

The `continueEnrollment()` method returns:

```kotlin
EnrollmentResult(
    vaultedToken = "vtk_abc123def456",
    type = "CARD",
    cardData = CardData(
        holderName = "JOHN DOE",
        iin = "41111111",
        lfd = "1111",
        brand = "VISA",
        type = "CREDIT",
        issuerName = "JPMORGAN CHASE BANK N A"
    )
)
```

### Headless Enrollment Flow

```
1. Create customer session → Your backend
2. Create enrollment object → Your backend
3. Customer enters card info → Your custom UI
4. Submit enrollment data → apiClientEnroll.continueEnrollment()
5. Receive vaulted token → result.vaultedToken
6. Handle verification → continueEnrollment() if needed
7. Save vaulted token → Your backend/database
```

## Stay Updated

Visit the [Release Notes](doc:release-notes-android-sdk) page for the latest SDK updates and version history.
