---
title: Android SDK
deprecated: false
hidden: false
metadata:
  robots: index
---
## Install

**build.gradle (Project level):**

```kotlin
repositories {
    maven { url = uri("https://yunopayments.jfrog.io/artifactory/snapshots-libs-release") }
}
```

**build.gradle (App level):**

```kotlin
dependencies {
    implementation("com.yuno.payments:android-sdk:{last_version}")
}
```

> 📘 Requirements
>
> Android 5.0 (API 21)+, Kotlin 1.4.0+, Java 8, AndroidX, android-gradle-plugin 4.0.0+, Proguard 6.2.2+

## Initialize

**In Application class:**

```kotlin
import com.yuno.sdk.Yuno
import com.yuno.sdk.YunoConfig
import android.app.Application

class CustomApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Yuno.initialize(
            this,
            "your-public-api-key",
            YunoConfig()
        )
    }
}
```

**AndroidManifest.xml:**

```xml
<application
    android:name=".CustomApplication"
    ...>
</application>
```

### YunoConfig Options

```kotlin
data class YunoConfig(
    val cardFlow: CardFormType = CardFormType.ONE_STEP,
    val saveCardEnabled: Boolean = false,
    val cardFormDeployed: Boolean = false,
    val language: YunoLanguage? = null,
    val styles: YunoStyles? = null
)
```

| Parameter          | Type          | Default  | Description                                                     |
| ------------------ | ------------- | -------- | --------------------------------------------------------------- |
| `cardFlow`         | CardFormType  | ONE_STEP | Card form type: `ONE_STEP` or `STEP_BY_STEP`                    |
| `saveCardEnabled`  | Boolean       | false    | Show save card checkbox in card flows                           |
| `cardFormDeployed` | Boolean       | false    | Show card form deployed in payment methods list (Full SDK only) |
| `language`         | YunoLanguage? | null     | SDK language (null uses device language)                        |
| `styles`           | YunoStyles?   | null     | SDK-wide UI customization (fonts, button styles)                |

**Available Languages:**

```kotlin
enum class YunoLanguage {
    SPANISH,
    ENGLISH,
    PORTUGUESE,
    INDONESIAN,
    MALAYSIAN,
    FRENCH,
    POLISH,
    ITALIAN,
    GERMAN,
    RUSSIAN,
    TURKISH,
    DUTCH,
    SWEDISH,
    THAI,
    FILIPINO,
    VIETNAMESE,
    CHINESE_SIMPLIFIED,
    CHINESE_TRADITIONAL
}
```

## Basic Payment Flow

### Full SDK Version

```kotlin
import androidx.appcompat.app.AppCompatActivity
import com.yuno.sdk.payments.startCheckout
import com.yuno.sdk.payments.startPayment
import com.yuno.sdk.payments.continuePayment
import com.yuno.sdk.payments.updateCheckoutSession

class PaymentActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment)
        
        // Step 1: Initialize checkout in onCreate
        startCheckout(
            callbackPaymentState = ::onPaymentStateChange
        )
        
        setupPaymentMethodsView()
    }
    
    private fun setupPaymentMethodsView() {
        // Step 2: Update checkout session with your session ID and country
        updateCheckoutSession(
            checkoutSession = "your_checkout_session_id",
            countryCode = "CO"
        )
        
        // Step 3: Display payment methods using Compose view
        val composeView = findViewById<ComposeView>(R.id.paymentMethodsContainer)
        composeView.setContent {
            PaymentMethodListViewComponent(
                activity = this@PaymentActivity,
                onPaymentSelected = { isSelected ->
                    findViewById<Button>(R.id.payButton).isEnabled = isSelected
                }
            )
        }
    }
    
    private fun processPayment() {
        // Step 4: Start payment when user clicks pay button
        startPayment(
            callbackOTT = ::onTokenReceived
        )
    }
    
    private fun onTokenReceived(token: String?) {
        token?.let {
            // Step 5: Send token to your backend to create payment
            createPaymentOnBackend(it)
        }
    }
    
    private fun createPaymentOnBackend(token: String) {
        // Call your backend API to create payment with the token
        // If response has sdk_action_required = true, call continuePayment()
    }
    
    private fun handleSdkActionRequired() {
        // Step 6: Continue payment if sdk_action_required is true
        continuePayment(
            callbackPaymentState = ::onPaymentStateChange
        )
    }
    
    private fun onPaymentStateChange(paymentState: String?, paymentSubState: String?) {
        when (paymentState) {
            "SUCCEEDED" -> {
                // Payment successful
                navigateToSuccess()
            }
            "FAIL" -> {
                // Payment failed
                showError("Payment failed")
            }
            "PROCESSING" -> {
                // Payment is being processed
                showPendingMessage()
            }
            "REJECT" -> {
                // Payment was rejected
                showError("Payment rejected")
            }
            "INTERNAL_ERROR" -> {
                // Internal error occurred
                showError("An error occurred")
            }
            "CANCELED" -> {
                // User canceled
                Toast.makeText(this, "Payment canceled", Toast.LENGTH_SHORT).show()
            }
        }
        // paymentSubState provides additional details about the payment status
    }
}
```

**Layout XML for Payment Methods:**

```xml
<com.yuno.payments.features.payment.ui.views.PaymentMethodListView
    android:id="@+id/list_payment_methods"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

Or use ComposeView for Jetpack Compose integration:

```xml
<androidx.compose.ui.platform.ComposeView
    android:id="@+id/paymentMethodsContainer"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

### Lite SDK Version

For custom payment method selection, use the Lite version:

```kotlin
import com.yuno.sdk.payments.startCheckout
import com.yuno.sdk.payments.startPaymentLite
import com.yuno.sdk.payments.continuePayment
import com.yuno.sdk.payments.updateCheckoutSession
import com.yuno.presentation.core.components.PaymentSelected

class CheckoutLiteActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_checkout_lite)
        
        // Initialize checkout
        startCheckout(
            checkoutSession = "your_checkout_session_id",
            countryCode = "CO",
            callbackPaymentState = ::onPaymentStateChange
        )
    }
    
    private fun processPayment(paymentMethodType: String, vaultedToken: String?) {
        // Start payment with selected payment method
        startPaymentLite(
            paymentSelected = PaymentSelected(
                paymentMethodType = paymentMethodType,
                vaultedToken = vaultedToken
            ),
            callBackTokenWithInformation = { ottModel ->
                // Optional: Receive additional token information
                Log.i("OTT Info", ottModel.toString())
            },
            callbackOTT = ::onTokenReceived
        )
    }
    
    private fun onTokenReceived(token: String?) {
        token?.let {
            // Send token to your backend
            createPaymentOnBackend(it)
        }
    }
    
    private fun onPaymentStateChange(paymentState: String?, paymentSubState: String?) {
        // Handle payment state changes
        // paymentSubState provides additional details about the payment status
    }
}
```

## Payment States

The SDK returns these payment states via `callbackPaymentState`. The callback receives two parameters: `paymentState` (the main state) and `paymentSubState` (additional details).

```kotlin
const val PAYMENT_STATE_SUCCEEDED = "SUCCEEDED"
const val PAYMENT_STATE_FAIL = "FAIL"
const val PAYMENT_STATE_PROCESSING = "PROCESSING"
const val PAYMENT_STATE_REJECT = "REJECT"
const val PAYMENT_STATE_INTERNAL_ERROR = "INTERNAL_ERROR"
const val PAYMENT_STATE_CANCELED = "CANCELED"
```

## 3DS Authentication

3DS is handled automatically by the SDK. Call `continuePayment()` after creating payment if `sdk_action_required` is true in the response:

```kotlin
private fun onTokenReceived(token: String?) {
    token?.let {
        lifecycleScope.launch {
            val response = createPaymentOnBackend(it)
            
            if (response.sdkActionRequired) {
                continuePayment(
                    callbackPaymentState = ::onPaymentStateChange
                )
            }
        }
    }
}
```

## Configuration Options

### Essential Parameters

| Parameter              | Type                       | Description                              |
| ---------------------- | -------------------------- | ---------------------------------------- |
| `checkoutSession`      | String                     | Session ID from your backend             |
| `countryCode`          | String                     | ISO country code (e.g., "CO", "US")      |
| `callbackPaymentState` | (String?, String?) -> Unit | Payment state callback (state, subState) |
| `callbackOTT`          | (String?) -> Unit          | One-time token callback                  |

### Optional Parameters

| Parameter           | Type    | Default | Description                        |
| ------------------- | ------- | ------- | ---------------------------------- |
| `showPaymentStatus` | Boolean | true    | Show Yuno's payment status screens |
| `merchantSessionId` | String? | null    | Anti-fraud session ID              |

## Proguard Rules

**proguard-rules.pro:**

```proguard
# Yuno SDK
-keep class com.yuno.sdk.** { *; }
-keep interface com.yuno.sdk.** { *; }
-dontwarn com.yuno.sdk.**

# OkHttp & Retrofit
-dontwarn okhttp3.**
-dontwarn retrofit2.**
```

## Next Steps

Ready to explore more advanced features? Check out the [Advanced Features](doc:advanced-features-android-sdk) guide for:

* **Lite SDK Flow** - Custom payment method selection with `startPaymentLite()`
* **Enrollment (Save Cards)** - Save payment methods for future use
* **Vaulted Token Payments** - One-click payments with saved cards
* **Keep Loader Flow** - Unified payment flow with `startCompletePaymentFlow()`
* **Custom Card Form** - Build custom card forms with Yuno Secure Fields
* **Styling** - Customize SDK appearance

See also:

* [Code Examples](doc:code-examples-android-sdk) - Copy-paste examples for common scenarios
* [Release Notes](doc:release-notes-android-sdk) - SDK versions, changes, and migration guides
