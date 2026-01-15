---
title: Advanced Features Android SDK
deprecated: false
hidden: true
metadata:
  robots: index
---
Advanced configuration and custom integrations for Android.

## Lite SDK Flow

For custom payment method selection, use `startPaymentLite()` instead of `startPayment()`:

```kotlin
import com.yuno.sdk.payments.startCheckout
import com.yuno.sdk.payments.startPaymentLite
import com.yuno.sdk.payments.updateCheckoutSession
import com.yuno.presentation.core.components.PaymentSelected

class CheckoutLiteActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_checkout_lite)
        
        // Initialize checkout with session and country
        startCheckout(
            checkoutSession = "your_checkout_session_id",
            countryCode = "CO",
            callbackPaymentState = ::onPaymentStateChange
        )
    }
    
    private fun startPaymentWithSelectedMethod(
        paymentMethodType: String,
        vaultedToken: String? = null
    ) {
        startPaymentLite(
            paymentSelected = PaymentSelected(
                paymentMethodType = paymentMethodType,
                vaultedToken = vaultedToken
            ),
            callBackTokenWithInformation = { ottModel ->
                // Optional: Receive additional token information
                Log.i("OTT Info", ottModel.toString())
            },
            callbackOTT = ::onTokenReceived,
            showPaymentStatus = true
        )
    }
    
    private fun onTokenReceived(token: String?) {
        token?.let {
            // Send token to your backend to create payment
            createPaymentOnBackend(it)
        }
    }
    
    private fun onPaymentStateChange(state: String?) {
        when (state) {
            "SUCCEEDED" -> navigateToSuccess()
            "FAIL" -> showError("Payment failed")
            "PROCESSING" -> showPendingMessage()
            "REJECT" -> showError("Payment rejected")
            "INTERNAL_ERROR" -> showError("An error occurred")
            "CANCELED" -> showCanceledMessage()
        }
    }
}
```

### PaymentSelected Data Class

```kotlin
PaymentSelected(
    paymentMethodType: String,  // Payment type: "CARD", "PIX", etc.
    vaultedToken: String?       // Optional: Saved card token for vaulted payments
)
```

## Keep Loader Flow

To keep Yuno's loading screen until payment is created, use `keepLoader = true` in YunoConfig and `startCompletePaymentFlow()`:

```kotlin
// Step 1: Initialize with keepLoader = true
class CustomApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Yuno.initialize(
            this,
            "your-api-key",
            YunoConfig(keepLoader = true)
        )
    }
}

// Step 2: Use startCompletePaymentFlow instead of startPayment
class PaymentActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        startCheckout(
            callbackPaymentState = ::onPaymentStateChange
        )
        
        updateCheckoutSession(
            checkoutSession = "your_checkout_session_id",
            countryCode = "CO"
        )
    }
    
    private fun processPayment() {
        startCompletePaymentFlow(
            paymentSelected = null, // null for Full SDK, PaymentSelected for Lite
            showPaymentStatus = true,
            createPaymentFun = { ott ->
                // This suspend function keeps the loader until you complete
                createPaymentOnBackend(ott)
            },
            callbackPaymentState = ::onPaymentStateChange,
            callbackOTT = ::onTokenReceived
        )
    }
    
    private suspend fun createPaymentOnBackend(ott: String) {
        // Call your backend API to create payment
        // Loader stays visible until this function completes
        apiClient.createPayment(ott)
    }
}
```

## Enrollment (Save Cards)

### Initialize Enrollment

You must call `initEnrollment()` in the `onCreate()` method of your activity to register the callback:

```kotlin
import com.yuno.sdk.enrollment.initEnrollment
import com.yuno.sdk.enrollment.startEnrollment

class EnrollmentActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_enrollment)
        
        // Must be called in onCreate to register callback
        initEnrollment(::onEnrollmentStateChange)
    }
    
    private fun startEnrollmentFlow() {
        startEnrollment(
            customerSession = "your_customer_session_id",
            countryCode = "CO",
            showEnrollmentStatus = true
        )
    }
    
    private fun onEnrollmentStateChange(enrollmentState: String?) {
        enrollmentState?.let {
            Log.d("Enrollment", "State: $it")
            // Handle enrollment result
        }
    }
}
```

### Check Enrollment Status

To check a previous enrollment status without starting a new enrollment:

```kotlin
import com.yuno.sdk.enrollment.initEnrollment
import com.yuno.sdk.enrollment.enrollmentStatus

class EnrollmentStatusActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Must be called in onCreate
        initEnrollment(::onEnrollmentStateChange)
    }
    
    private fun checkStatus() {
        // This does NOT start enrollment, only checks status
        enrollmentStatus(
            customerSession = "your_customer_session_id",
            countryCode = "CO",
            showEnrollmentStatus = false,
            callbackEnrollmentState = ::onEnrollmentStateChange
        )
    }
    
    private fun onEnrollmentStateChange(state: String?) {
        // Handle enrollment status
    }
}
```

> **Important:** `enrollmentStatus()` is read-only and does NOT start a new enrollment process. Use `startEnrollment()` to begin a new enrollment.

## Vaulted Token Payments

Pay with a saved card using the vaulted token:

```kotlin
private fun payWithSavedCard(vaultedToken: String) {
    startPaymentLite(
        paymentSelected = PaymentSelected(
            paymentMethodType = "CARD",
            vaultedToken = vaultedToken
        ),
        callbackOTT = ::onTokenReceived,
        showPaymentStatus = true
    )
}
```

## Payment Methods Views

### Full SDK - PaymentMethodListView

Display all available payment methods:

```xml
<com.yuno.payments.features.payment.ui.views.PaymentMethodListView
    android:id="@+id/list_payment_methods"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

### Compose Integration

```kotlin
import com.yuno.presentation.core.components.PaymentMethodListViewComponent

composeView.setContent {
    PaymentMethodListViewComponent(
        activity = this@PaymentActivity,
        onPaymentSelected = { isSelected ->
            payButton.isEnabled = isSelected
        }
    )
}
```

### Enrollment Methods Views

Show only enrollment-available payment methods:

```xml
<com.yuno.payments.features.enrollment.ui.views.EnrollmentMethodsListView
    android:id="@+id/list_enrollment_methods"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

Show only enrolled payment methods:

```xml
<com.yuno.payments.features.enrollment.ui.views.EnrollmentPaymentMethodListView
    android:id="@+id/list_enrolled_methods"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

Show only unenrolled payment methods:

```xml
<com.yuno.payments.features.enrollment.ui.views.UnEnrolledPaymentMethodListView
    android:id="@+id/list_unenrolled_methods"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

## Custom Card Form (Secure Fields)

Build custom card forms while maintaining PCI compliance using Yuno Secure Fields.

### Step 1: Create Custom Layout

Create `screen_payment_card_form.xml` to override the default card form:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp">

        <!-- Close Button -->
        <ImageView
            android:id="@+id/imageView_close"
            android:layout_width="24dp"
            android:layout_height="24dp"
            android:src="@drawable/ic_close" />

        <!-- Card Number Field -->
        <com.yuno.payments.features.base.ui.views.CardNumberEditText
            android:id="@+id/textField_number"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />

        <!-- Expiration Date and CVV -->
        <com.yuno.payments.features.base.ui.views.CardDataStackView
            android:id="@+id/cardDataStackView"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />

        <!-- Voucher Card Type Copy -->
        <TextView
            android:id="@+id/textView_voucher_copy"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:visibility="gone" />

        <!-- Card Holder Name -->
        <com.yuno.payments.features.base.ui.views.TextFieldItemView
            android:id="@+id/textField_name"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />

        <!-- Document Type Spinner -->
        <com.yuno.payments.features.base.ui.views.SpinnerFieldItemView
            android:id="@+id/spinner_document_type"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />

        <!-- Document Number -->
        <com.yuno.payments.features.base.ui.views.TextFieldItemView
            android:id="@+id/textField_user_document"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />

        <!-- Phone Information (hidden by default) -->
        <com.yuno.payments.features.base.ui.views.PhoneInformationView
            android:id="@+id/layout_phone_information"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:visibility="gone" />

        <!-- Installments -->
        <LinearLayout
            android:id="@+id/container_installments"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical">

            <com.yuno.payments.features.base.ui.views.SpinnerFieldItemView
                android:id="@+id/spinner_installments"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:visibility="gone" />

            <com.facebook.shimmer.ShimmerFrameLayout
                android:id="@+id/shimmer_installments"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:visibility="gone">
                <include layout="@layout/shimmer_component_field" />
            </com.facebook.shimmer.ShimmerFrameLayout>
        </LinearLayout>

        <!-- Address Fields (hidden by default) -->
        <com.yuno.payments.features.base.ui.views.TextFieldItemView
            android:id="@+id/textField_address"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:visibility="gone" />

        <com.yuno.payments.features.base.ui.views.TextFieldItemView
            android:id="@+id/textField_state"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:visibility="gone" />

        <com.yuno.payments.features.base.ui.views.TextFieldItemView
            android:id="@+id/textField_city"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:visibility="gone" />

        <com.yuno.payments.features.base.ui.views.TextFieldItemView
            android:id="@+id/textField_zip_code"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:visibility="gone" />

        <com.yuno.payments.features.base.ui.views.SpinnerFieldItemView
            android:id="@+id/spinner_country"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:visibility="gone" />

        <com.yuno.payments.features.base.ui.views.SpinnerFieldItemView
            android:id="@+id/spinner_gender"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:visibility="gone" />

        <!-- Credit/Debit Switch -->
        <com.yuno.payments.features.base.ui.views.CustomYunoSwitch
            android:id="@+id/switch_cardType"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:visibility="gone" />

        <ImageView
            android:id="@+id/switch_tooltip"
            android:layout_width="24dp"
            android:layout_height="24dp"
            android:src="@drawable/ic_thin_info"
            android:visibility="gone" />

        <!-- Save Card Checkbox -->
        <androidx.appcompat.widget.AppCompatCheckBox
            android:id="@+id/checkBox_save_card"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Save card for future purchases" />

        <!-- Secure Payment Text -->
        <TextView
            android:id="@+id/textView_secure_payment"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Secured by Yuno" />

        <!-- Submit Button -->
        <Button
            android:id="@+id/button_complete_form"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Pay" />

    </LinearLayout>
</ScrollView>
```

> **Note:** For installments shimmer, add dependency: `implementation 'com.facebook.shimmer:shimmer:0.5.0'`

## Error Handling

Handle errors in payment state callback:

```kotlin
private fun onPaymentStateChange(state: String?) {
    when (state) {
        "SUCCEEDED" -> {
            // Payment successful
            navigateToSuccess()
        }
        "FAIL" -> {
            // Payment failed - show error to user
            showError("Payment failed. Please try again.")
        }
        "REJECT" -> {
            // Payment rejected by processor
            showError("Payment was rejected. Please try a different payment method.")
        }
        "INTERNAL_ERROR" -> {
            // Internal SDK error
            showError("An error occurred. Please try again.")
        }
        "PROCESSING" -> {
            // Payment is being processed
            showPendingMessage("Your payment is being processed.")
        }
        "CANCELED" -> {
            // User canceled the payment
            Toast.makeText(this, "Payment canceled", Toast.LENGTH_SHORT).show()
        }
    }
}
```

## Show/Hide Payment Status Screens

Control whether Yuno shows its built-in status screens:

```kotlin
// Show Yuno's status screens (default)
startPayment(
    callbackOTT = ::onTokenReceived,
    showPaymentStatus = true
)

// Hide Yuno's status screens and handle in your app
startPayment(
    callbackOTT = ::onTokenReceived,
    showPaymentStatus = false
)

// Same for continuePayment
continuePayment(
    showPaymentStatus = false,
    callbackPaymentState = ::onPaymentStateChange
)
```

## Anti-Fraud Session ID

Pass a merchant session ID for anti-fraud purposes:

```kotlin
startCheckout(
    checkoutSession = "your_checkout_session_id",
    countryCode = "CO",
    callbackOTT = ::onTokenReceived,
    callbackPaymentState = ::onPaymentStateChange,
    merchantSessionId = "your_antifraud_session_id"
)
```

## External Browser Return (Deep Links)

Handle users returning to your app after external payment flows like 3DS authentication.

### 1. Set callback_url in Checkout Session

Include `callback_url` when creating the checkout session on your backend:

```json
{
  "callback_url": "myapp://payment/return"
}
```

### 2. Configure Deep Link Handling

Add an `intent-filter` to your activity in `AndroidManifest.xml`:

```xml
<activity android:name=".PaymentActivity">
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:scheme="myapp"
            android:host="payment"
            android:path="/return" />
    </intent-filter>
</activity>
```

### 3. Handle Return Intent

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    
    // Initialize checkout
    startCheckout(
        callbackPaymentState = ::onPaymentStateChange
    )
    
    // Check if app was opened via deep link
    intent.data?.let { uri ->
        if (uri.toString().contains("myapp://payment/return")) {
            handlePaymentReturn(uri)
        }
    }
}

private fun handlePaymentReturn(uri: Uri) {
    // Continue payment after returning from external browser
    continuePayment(
        showPaymentStatus = true,
        callbackPaymentState = ::onPaymentStateChange
    )
}
```

## Best Practices

1. Always call `startCheckout()` in `onCreate()` before any other SDK methods
2. Always call `initEnrollment()` in `onCreate()` before starting enrollment
3. Handle all payment states in your callback
4. Use `showPaymentStatus = false` if you want to show custom status screens
5. Test deep link handling on multiple devices and Android versions
6. Include `callback_url` in payment flows that may redirect to external browsers
