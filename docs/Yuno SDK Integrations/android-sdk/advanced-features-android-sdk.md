---
title: Advanced Features Android SDK
deprecated: false
hidden: false
metadata:
  robots: index
---
Advanced configuration and custom integrations for Android.

## Alternative Mounting Options

The basic flow uses automatic payment method display. For more control, use these alternatives:

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
    callbackPaymentState = { state -> handlePaymentState(state) }
)

// Update with session - SDK will show "Save card" checkbox automatically
updateCheckoutSession(
    checkoutSession = session.checkoutSession,
    countryCode = "US"
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

## Custom UI (Headless Integration)

Build completely custom payment forms with full UI control when you need complete control over every UI element, highly custom checkout experiences, or have development resources for custom UI.

```kotlin
import com.yuno.sdk.Yuno
import com.yuno.sdk.api.ApiClientPayment

lifecycleScope.launch {
    // 1. Initialize headless client
    val apiClient = Yuno.apiClientPayment(
        countryCode = "US",
        checkoutSession = "session_id"
    )
    
    // 2. Collect card data in your custom UI
    val token = apiClient.generateToken(
        checkoutSession = "session_id",
        paymentMethod = PaymentMethod(
            type = "CARD",
            card = CardData(
                number = "4111111111111111",
                expirationMonth = 12,
                expirationYear = 25,
                securityCode = "123",
                holderName = "John Doe",
                type = "CREDIT"
            )
        )
    )
    
    // 3. Create payment with token
    createPayment(token.oneTimeToken)
    
    // 4. Handle continuation if needed
    apiClient.continuePayment(
        activity = this@PaymentActivity,
        onPaymentResult = { result ->
            handlePaymentResult(result)
        }
    )
}
```

### With Vaulted Token

```kotlin
val token = apiClient.generateToken(
    checkoutSession = "session_id",
    paymentMethod = PaymentMethod(
        type = "CARD",
        vaultedToken = "saved_token_id",
        card = CardData(securityCode = "123")
    )
)
```

## Render Mode Integration

Display payment form within your custom view.

```kotlin
class PaymentActivity : ComponentActivity(), YunoPaymentRenderListener {
    
    private lateinit var paymentController: YunoPaymentFragmentController
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        setContent {
            var paymentView by remember { mutableStateOf<View?>(null) }
            
            Column {
                Button(onClick = { startRenderMode() }) {
                    Text("Pay Now")
                }
                
                paymentView?.let {
                    AndroidView(factory = { it })
                }
            }
        }
    }
    
    private fun startRenderMode() {
        lifecycleScope.launch {
            val session = createCheckoutSession()
            
            paymentController = Yuno.startPaymentRender(
                activity = this@PaymentActivity,
                checkoutSession = session.id,
                countryCode = "US",
                listener = this@PaymentActivity
            )
        }
    }
    
    override fun onFormView(view: View) {
        // Add view to your layout
        findViewById<FrameLayout>(R.id.payment_container).addView(view)
    }
    
    override fun onSubmitForm() {
        // Customer submitted form
    }
    
    override fun onPaymentResult(result: PaymentResult) {
        if (result.status == PaymentStatus.SUCCEEDED) {
            navigateToSuccess()
        }
    }
}
```

## Styling

Customize SDK appearance with themes.

**colors.xml:**

```xml
<color name="yuno_primary">#007bff</color>
<color name="yuno_background">#ffffff</color>
<color name="yuno_text">#333333</color>
<color name="yuno_error">#dc3545</color>
```

**themes.xml:**

```xml
<style name="YunoSDKTheme" parent="Theme.MaterialComponents">
    <item name="colorPrimary">@color/yuno_primary</item>
    <item name="colorOnPrimary">@android:color/white</item>
    <item name="android:textColor">@color/yuno_text</item>
</style>
```

Apply theme:

```kotlin
Yuno.setTheme(R.style.YunoSDKTheme)
```

## Card Scanning (OCR)

Enable card scanning with camera.

**Add dependency:**

```kotlin
dependencies {
    implementation("com.yuno.sdk:card-scan:2.8.1")
}
```

**Enable in config:**

```kotlin
Yuno.initialize(
    this,
    publicApiKey = "your-key",
    config = YunoConfig(
        cardScanEnabled = true
    )
)
```

Card scanning button appears automatically in card form.

## ClearSale Integration

Enable fraud prevention.

**Add ClearSale SDK:**

```kotlin
dependencies {
    implementation("br.com.clearsale:cs-android-sdk:4.0.0")
}
```

**Initialize:**

```kotlin
import br.com.clearsale.androidsdk.ClearSale

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        
        // Initialize ClearSale
        ClearSale.init(this, "your-clearsale-app-key")
        
        // Initialize Yuno
        Yuno.initialize(this, "your-public-key", YunoConfig())
    }
}
```

ClearSale fingerprint is automatically collected and sent.

## Error Handling

Handle errors in payment state callback and payment processing:

```kotlin
// Set up error handling in payment state callback
startCheckout(
    callbackPaymentState = { state ->
        when (state) {
            "SUCCEEDED" -> handleSuccess()
            "FAIL" -> {
                // Handle payment failure
                showError("Payment failed")
            }
            "REJECT" -> {
                // Handle payment rejection
                showRejectedMessage()
            }
            "PROCESSING" -> showPendingMessage()
            else -> {}
        }
    }
)

// Update session with error handling
try {
    val session = createCheckoutSession()
    updateCheckoutSession(
        checkoutSession = session.checkoutSession,
        countryCode = "US"
    )
} catch (e: Exception) {
    Log.e("Payment", "Session error: ${e.message}")
    showError("Failed to initialize payment")
}

// Handle errors during payment creation
startPayment(
    showStatusYuno = true,
    callbackOTT = { token ->
        lifecycleScope.launch {
            try {
                createPayment(token, checkoutSession)
            } catch (e: Exception) {
                Log.e("Payment", "Payment creation error: ${e.message}")
                showError("Payment failed: ${e.message}")
            }
        }
    }
)
```

## Testing & Debug

### Enable Logging

```kotlin
Yuno.setLogLevel(LogLevel.VERBOSE)
```

### Test Mode

```kotlin
Yuno.initialize(
    this,
    publicApiKey = "pk_test_your_key",
    config = YunoConfig(testMode = true)
)
```

## Performance

### Lazy Initialization

```kotlin
val yuno by lazy {
    Yuno.initialize(this, "pk_test_key", YunoConfig())
    Yuno.getInstance()
}
```

### Preload SDK

```kotlin
lifecycleScope.launch(Dispatchers.IO) {
    Yuno.preload(this@MainActivity)
}
```

## External Browser Return (Deep Links)

Handle users returning to your app after external payment flows like 3DS authentication challenges, bank transfer redirects, PIX payments, and alternative payment methods with external redirects.

### 1. Set callback_url in Checkout Session

Include `callback_url` when creating the checkout session on your backend:

```json
{
  "callback_url": "myapp://return"
}
```

> ❗️ Important
>
> Without `callback_url`, users may be stranded in the external browser with no way to return to your app.

### 2. Configure Deep Link Handling

Add an `intent-filter` to your activity in `AndroidManifest.xml`:

```xml
<activity android:name=".YourMainActivity">
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:scheme="myapp"
            android:host="return" />
    </intent-filter>
</activity>
```

The scheme (`myapp`) and host (`return`) must match your `callback_url`.

### 3. Handle Return Intent

Handle the deep link when the user returns:

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    
    // Check if app was opened via deep link
    intent.data?.let { uri ->
        val url = uri.toString()
        if (url.contains("myapp://return")) {
            handlePaymentReturn(uri)
        }
    }
}

private fun handlePaymentReturn(uri: Uri) {
    val sessionId = uri.getQueryParameter("checkoutSession")
    
    sessionId?.let {
        continuePayment(
            showPaymentStatus = true,
            checkoutSession = it,
            countryCode = "US"
        ) { result ->
            result?.let { status ->
                Toast.makeText(this, "Payment status: $status", Toast.LENGTH_SHORT).show()
            }
        }
    }
}
```

### 4. Full Integration Example

```kotlin
class PaymentActivity : ComponentActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Initialize checkout
        startCheckout(
            callbackPaymentState = { state ->
                handlePaymentState(state)
            }
        )
        
        // Handle deep link return
        if (intent?.data != null) {
            handleDeepLinkReturn(intent)
        } else {
            // Normal payment flow
            initializePaymentUI()
        }
    }
    
    private fun handleDeepLinkReturn(intent: Intent) {
        intent.data?.let { uri ->
            if (uri.toString().contains("myapp://return")) {
                val sessionId = extractCheckoutSession(uri)
                
                sessionId?.let {
                    continuePayment(
                        showPaymentStatus = true,
                        checkoutSession = it,
                        countryCode = "US"
                    ) { result ->
                        when (result) {
                            "SUCCEEDED" -> navigateToSuccess()
                            "FAILED" -> showError("Payment failed")
                            else -> showPendingMessage()
                        }
                    }
                }
            }
        }
    }
    
    private fun extractCheckoutSession(uri: Uri): String? {
        return uri.getQueryParameter("checkoutSession")
    }
}
```

### Best Practices

- Always include `callback_url` in payment flows that may redirect
- Test deep link handling on multiple devices and Android versions
- Handle missing or malformed deep link data gracefully
- Update payment status in your UI after returning from external browser