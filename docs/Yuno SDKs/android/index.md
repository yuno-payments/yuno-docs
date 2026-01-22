---
title: Android SDK Integration
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
    implementation("com.yuno.payments:android-sdk:1.0.0")
}
```

> 📘 Requirements: Android 5.0 (API 21)+, Kotlin 1.9.24+, Java 17, Jetpack Compose (for Compose integration)

## Initialize

**In Application class:**

```kotlin
import com.yuno.payments.Yuno
import android.app.Application

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Yuno.initialize(
            this,
            publicApiKey = "your-public-api-key",
            config = YunoConfig()
        )
    }
}
```

**AndroidManifest.xml:**

```xml
<application
    android:name=".MyApplication"
    ...>
</application>
```

## Basic Payment Flow

### Jetpack Compose

```kotlin
import androidx.compose.runtime.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.yuno.payments.Yuno
import com.yuno.payments.features.base.OneTimeToken

@Composable
fun PaymentScreen() {
    var checkoutSession by remember { mutableStateOf<String?>(null) }
    var paymentMethodSelected by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()
    
    LaunchedEffect(Unit) {
        // Initialize checkout
        val session = createCheckoutSession()
        checkoutSession = session.checkoutSession
        
        startCheckout(
            checkoutSession = session.checkoutSession,
            countryCode = "US",
            callbackPaymentState = { state ->
                when (state) {
                    "SUCCEEDED" -> navigateToSuccess()
                    "FAIL" -> showError()
                    else -> {}
                }
            }
        )
    }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("Total: $25.00", style = MaterialTheme.typography.headlineMedium)
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Payment methods list
        Column(
            modifier = Modifier
                .weight(1f)
                .verticalScroll(rememberScrollState())
        ) {
            PaymentMethodListViewComponent(
                activity = LocalContext.current as ComponentActivity,
                onPaymentSelected = { isSelected ->
                    paymentMethodSelected = isSelected
                }
            )
        }
        
        // Pay button
        Button(
            onClick = {
                scope.launch {
                    startPayment(
                        showStatusYuno = true,
                        callbackOTT = { token ->
                            token?.let { createPayment(it, checkoutSession!!) }
                        }
                    )
                }
            },
            enabled = paymentMethodSelected,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Pay Now")
        }
    }
}

suspend fun createCheckoutSession(): CheckoutSession {
    return apiClient.post("/checkout", mapOf(
        "amount" to mapOf("currency" to "USD", "value" to 2500),
        "customer_id" to "cus_123",
        "country" to "US"
    ))
}

suspend fun createPayment(token: String, checkoutSession: String) {
    apiClient.post("/payment/create", mapOf(
        "one_time_token" to token,
        "checkout_session" to checkoutSession
    ))
}
```

### XML Views (Traditional)

```kotlin
import com.yuno.payments.Yuno
import com.yuno.payments.features.base.OneTimeToken

class PaymentActivity : AppCompatActivity() {
    private lateinit var checkoutSession: String
    private var paymentMethodSelected = false
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment)
        
        initializeCheckout()
        
        findViewById<Button>(R.id.payButton).apply {
            isEnabled = false
            setOnClickListener {
                if (paymentMethodSelected) {
                    processPayment()
                }
            }
        }
    }
    
    private fun initializeCheckout() {
        lifecycleScope.launch {
            val session = createCheckoutSession()
            checkoutSession = session.checkoutSession
            
            startCheckout(
                checkoutSession = session.checkoutSession,
                countryCode = "US",
                callbackPaymentState = { state ->
                    handlePaymentState(state)
                }
            )
            
            // Set up payment methods view
            setupPaymentMethodsView()
        }
    }
    
    private fun setupPaymentMethodsView() {
        // For Compose-based payment methods view:
        val composeView = findViewById<ComposeView>(R.id.paymentMethodsContainer)
        composeView.setContent {
            PaymentMethodListViewComponent(
                activity = this@PaymentActivity,
                onPaymentSelected = { isSelected ->
                    paymentMethodSelected = isSelected
                    findViewById<Button>(R.id.payButton).isEnabled = isSelected
                }
            )
        }
    }
    
    private fun processPayment() {
        lifecycleScope.launch {
            startPayment(
                showStatusYuno = true,
                callbackOTT = { token ->
                    token?.let {
                        createPayment(it, checkoutSession)
                    }
                }
            )
        }
    }
    
    private fun handlePaymentState(state: String?) {
        when (state) {
            "SUCCEEDED" -> {
                Toast.makeText(this, "Payment successful!", Toast.LENGTH_SHORT).show()
                startActivity(Intent(this, SuccessActivity::class.java))
                finish()
            }
            "FAIL" -> {
                Toast.makeText(this, "Payment failed", Toast.LENGTH_LONG).show()
            }
            "PROCESSING" -> {
                Toast.makeText(this, "Payment is being processed", Toast.LENGTH_SHORT).show()
            }
            "CANCELED" -> {
                Toast.makeText(this, "Payment canceled", Toast.LENGTH_SHORT).show()
            }
            else -> {}
        }
    }
    
    private suspend fun createCheckoutSession(): CheckoutSession = withContext(Dispatchers.IO) {
        val client = OkHttpClient()
        val json = """
            {
                "amount": {"currency": "USD", "value": 2500},
                "customer_id": "cus_123",
                "country": "US"
            }
        """.trimIndent()
        
        val request = Request.Builder()
            .url("https://api.example.com/checkout")
            .post(json.toRequestBody("application/json".toMediaType()))
            .build()
        
        val response = client.newCall(request).execute()
        Gson().fromJson(response.body?.string(), CheckoutSession::class.java)
    }
    
    private suspend fun createPayment(token: String, checkoutSession: String) = withContext(Dispatchers.IO) {
        val client = OkHttpClient()
        val json = """
            {
                "one_time_token": "$token",
                "checkout_session": "$checkoutSession"
            }
        """.trimIndent()
        
        val request = Request.Builder()
            .url("https://api.example.com/payment/create")
            .post(json.toRequestBody("application/json".toMediaType()))
            .build()
        
        client.newCall(request).execute()
    }
}
```

## Alternative Mounting Options

The basic flow above uses automatic payment method display. For more control:

### Custom Payment Method Selection (`startPaymentLite`)

Control which payment method to display:

```kotlin
// 1. Fetch available methods
val methods = fetchPaymentMethods(sessionId)

// 2. Display in your UI
// 3. Start payment with selected method

startPaymentLite(
    paymentMethodType = selectedMethod, // "CARD", "PIX", etc.
    vaultedToken = null,
    showPaymentStatus = true,
    callbackOTT = { token ->
        token?.let { createPayment(it, checkoutSession) }
    }
)
```

### Simplified Flow (`startPaymentSeamlessLite`)

Similar to Lite but with automatic payment creation:

```kotlin
startPaymentSeamlessLite(
    paymentMethodType = "CARD",
    vaultedToken = null,
    showPaymentStatus = true
)
```

## Enrollment (Save Cards)

### Save During Payment

```kotlin
// When creating payment on backend, include vault_on_success flag
suspend fun createPayment(token: String, checkoutSession: String) {
    apiClient.post("/payment/create", mapOf(
        "one_time_token" to token,
        "checkout_session" to checkoutSession,
        "vault_on_success" to true // Save after successful payment
    ))
}

// Configure SDK to show save checkbox
startCheckout(
    checkoutSession = session.checkoutSession,
    countryCode = "US",
    // SDK will show "Save card" checkbox
)
```

### Separate Enrollment

```kotlin
// Create customer session on backend
val customerSession = createCustomerSession("cus_123")

// Start enrollment
initEnrollment(
    customerSession = customerSession.id,
    countryCode = "US"
)

// Start enrollment flow
startEnrollment(
    showEnrollmentStatus = true,
    callback = { vaultedToken ->
        vaultedToken?.let {
            println("Card saved: $it")
        }
    }
)
```

## Vaulted Token Payments

```kotlin
startPaymentLite(
    paymentMethodType = "CARD",
    vaultedToken = "vtok_saved_card_123",
    showPaymentStatus = true,
    callbackOTT = { token ->
        token?.let { createPayment(it, checkoutSession) }
    }
)
```

## Handling Payment Results

```kotlin
startCheckout(
    checkoutSession = session.checkoutSession,
    countryCode = "US",
    callbackPaymentState = { state ->
        when (state) {
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
            "CANCELED" -> {
                // User canceled
                Toast.makeText(context, "Payment canceled", Toast.LENGTH_SHORT).show()
            }
            else -> {}
        }
    }
)
```

## 3DS Authentication

3DS is handled automatically by the SDK. Call `continuePayment()` after creating payment if `sdk_action_required` is true:

```kotlin
startPayment(
    showStatusYuno = true,
    callbackOTT = { token ->
        lifecycleScope.launch {
            val result = createPayment(token, checkoutSession)
            
            if (result.sdkActionRequired) {
                continuePayment()
            }
        }
    }
)
```

## Configuration Options

### Essential Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `checkoutSession` | String | Session ID from backend |
| `countryCode` | String | ISO country code (e.g., 'US') |
| `callbackPaymentState` | Function | Payment state callback |
| `callbackOTT` | Function | One-time token callback |

### Payment Status States

```kotlin
const val PAYMENT_STATE_SUCCEEDED = "SUCCEEDED"
const val PAYMENT_STATE_FAIL = "FAIL"
const val PAYMENT_STATE_PROCESSING = "PROCESSING"
const val PAYMENT_STATE_REJECT = "REJECT"
const val PAYMENT_STATE_CANCELED = "CANCELED"
```

## Proguard Rules

**proguard-rules.pro:**

```proguard
# Yuno SDK
-keep class com.yuno.payments.** { *; }
-keep interface com.yuno.payments.** { *; }
-dontwarn com.yuno.payments.**

# OkHttp & Retrofit
-dontwarn okhttp3.**
-dontwarn retrofit2.**
```
