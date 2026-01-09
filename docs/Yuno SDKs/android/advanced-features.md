---
title: Android SDK - Advanced Features
deprecated: false
hidden: true
metadata:
  robots: index
---
Advanced configuration and custom integrations for Android.

## Custom UI (Headless Integration) {#custom-ui}

Build completely custom payment forms with full UI control when you need complete control over every UI element, highly custom checkout experiences, or have development resources for custom UI.

```kotlin
import com.yuno.payments.Yuno
import com.yuno.payments.features.api_client.ApiClientPayment

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

## Render Mode Integration {#render-mode}

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

## Styling {#styling}

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

## Card Scanning (OCR) {#card-scanning}

Enable card scanning with camera.

**Add dependency:**

```kotlin
dependencies {
    implementation("com.yuno.payments:card-scan:1.0.0")
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

## ClearSale Integration {#clearsale}

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

```kotlin
Yuno.startCheckout(
    activity = this,
    checkoutSession = session.id,
    countryCode = "US",
    yunoCreatePayment = { token ->
        try {
            createPayment(token)
        } catch (e: Exception) {
            Log.e("Payment", "Error: ${e.message}")
            throw e
        }
    },
    yunoPaymentResult = { result ->
        when (result.status) {
            PaymentStatus.SUCCEEDED -> handleSuccess()
            PaymentStatus.FAILED -> {
                when (result.error?.code) {
                    "SESSION_EXPIRED" -> recreateSession()
                    "INVALID_CARD" -> showError("Invalid card")
                    "INSUFFICIENT_FUNDS" -> showError("Insufficient funds")
                    "NETWORK_ERROR" -> retryPayment()
                    else -> showError(result.error?.message ?: "Payment failed")
                }
            }
            PaymentStatus.PENDING -> showPendingMessage()
            PaymentStatus.REJECTED -> showRejectedMessage()
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

