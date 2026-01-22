---
title: Android SDK - Code Examples
deprecated: false
hidden: false
metadata:
  robots: index
---
Ready-to-use Android code examples for common scenarios.

## Example 1: Basic Compose Payment

```kotlin
@Composable
fun PaymentScreen() {
    val context = LocalContext.current as ComponentActivity
    var showSuccess by remember { mutableStateOf(false) }
    
    if (showSuccess) {
        SuccessScreen()
    } else {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text("$25.00", fontSize = 32.sp, fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.height(24.dp))
            
            Button(onClick = {
                context.lifecycleScope.launch {
                    val session = createCheckoutSession()
                    Yuno.startCheckout(
                        activity = context,
                        checkoutSession = session.id,
                        countryCode = "US",
                        yunoCreatePayment = { token ->
                            createPayment(token, session.id)
                        },
                        yunoPaymentResult = { result ->
                            if (result.status == PaymentStatus.SUCCEEDED) {
                                showSuccess = true
                            }
                        }
                    )
                }
            }) {
                Text("Pay Now")
            }
        }
    }
}
```

## Example 2: XML Views Payment

```kotlin
class PaymentActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment)
        
        findViewById<Button>(R.id.payButton).setOnClickListener {
            processPayment()
        }
    }
    
    private fun processPayment() {
        lifecycleScope.launch {
            try {
                val session = createCheckoutSession(2500)
                
                Yuno.startCheckout(
                    activity = this@PaymentActivity,
                    checkoutSession = session.checkoutSession,
                    countryCode = "US",
                    yunoCreatePayment = { token ->
                        createPayment(token, session.checkoutSession)
                    },
                    yunoPaymentResult = { result ->
                        handleResult(result)
                    }
                )
            } catch (e: Exception) {
                showError(e.message ?: "Payment failed")
            }
        }
    }
    
    private fun handleResult(result: PaymentResult) {
        when (result.status) {
            PaymentStatus.SUCCEEDED -> {
                startActivity(Intent(this, SuccessActivity::class.java))
                finish()
            }
            PaymentStatus.FAILED -> {
                showError(result.error?.message ?: "Payment failed")
            }
            else -> {}
        }
    }
}
```

## Example 3: Subscription Enrollment

```kotlin
class SubscriptionActivity : ComponentActivity() {
    
    fun enrollCard() {
        lifecycleScope.launch {
            val customerSession = createCustomerSession("cus_123")
            
            Yuno.startEnrollment(
                activity = this@SubscriptionActivity,
                customerSession = customerSession.id,
                countryCode = "US",
                yunoEnrolled = { vaultedToken ->
                    setupSubscription(vaultedToken)
                }
            )
        }
    }
    
    private suspend fun setupSubscription(vaultedToken: String) {
        apiClient.post("/subscriptions", mapOf(
            "customer_id" to "cus_123",
            "vaulted_token" to vaultedToken,
            "plan" to "premium_monthly"
        ))
        
        Toast.makeText(this, "Subscription activated!", Toast.LENGTH_SHORT).show()
    }
}
```

## Example 4: One-Click Payment

```kotlin
@Composable
fun SavedCardsScreen(cards: List<SavedCard>) {
    val context = LocalContext.current as ComponentActivity
    
    LazyColumn {
        items(cards) { card ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp)
                    .clickable { payWithCard(context, card) }
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("${card.brand} ****${card.last4}")
                    Spacer(Modifier.weight(1f))
                    Text("Use this card", color = MaterialTheme.colorScheme.primary)
                }
            }
        }
    }
}

fun payWithCard(activity: ComponentActivity, card: SavedCard) {
    activity.lifecycleScope.launch {
        val session = createCheckoutSession()
        
        Yuno.startCheckout(
            activity = activity,
            checkoutSession = session.id,
            countryCode = "US",
            vaultedToken = card.vaultedToken,
            yunoCreatePayment = { token ->
                createPayment(token)
            },
            yunoPaymentResult = { result ->
                if (result.status == PaymentStatus.SUCCEEDED) {
                    activity.startActivity(Intent(activity, SuccessActivity::class.java))
                }
            }
        )
    }
}
```

## Example 5: Custom Payment Method Selection

```kotlin
@Composable
fun CustomMethodSelectionScreen() {
    var paymentMethods by remember { mutableStateOf<List<PaymentMethod>>(emptyList()) }
    val context = LocalContext.current as ComponentActivity
    
    LaunchedEffect(Unit) {
        paymentMethods = fetchPaymentMethods()
    }
    
    LazyColumn {
        items(paymentMethods) { method ->
            ListItem(
                headlineContent = { Text(method.name) },
                leadingContent = {
                    AsyncImage(model = method.icon, contentDescription = null)
                },
                modifier = Modifier.clickable {
                    startPaymentWithMethod(context, method)
                }
            )
        }
    }
}

fun startPaymentWithMethod(activity: ComponentActivity, method: PaymentMethod) {
    activity.lifecycleScope.launch {
        val session = createCheckoutSession()
        
        Yuno.startPaymentLite(
            activity = activity,
            checkoutSession = session.id,
            countryCode = "US",
            paymentMethodType = method.type,
            yunoCreatePayment = { token -> createPayment(token) }
        )
    }
}
```

## Example 6: Error Handling with Retry

```kotlin
class PaymentWithRetryActivity : ComponentActivity() {
    private var retryCount = 0
    private val maxRetries = 3
    
    fun attemptPayment() {
        lifecycleScope.launch {
            try {
                val session = createCheckoutSession()
                startPayment(session)
            } catch (e: Exception) {
                handleError(e)
            }
        }
    }
    
    private fun handleError(error: Exception) {
        if (retryCount < maxRetries) {
            retryCount++
            lifecycleScope.launch {
                delay(2000) // Wait 2 seconds
                attemptPayment()
            }
        } else {
            Toast.makeText(this, "Payment failed after $maxRetries attempts", 
                Toast.LENGTH_LONG).show()
        }
    }
    
    private fun startPayment(session: CheckoutSession) {
        Yuno.startCheckout(
            activity = this,
            checkoutSession = session.id,
            countryCode = "US",
            yunoCreatePayment = { token -> createPayment(token) },
            yunoPaymentResult = { result ->
                when (result.status) {
                    PaymentStatus.SUCCEEDED -> {
                        retryCount = 0
                        navigateToSuccess()
                    }
                    PaymentStatus.FAILED -> handleError(Exception(result.error?.message))
                    else -> {}
                }
            }
        )
    }
}
```

## Example 7: Analytics Integration

```kotlin
import com.google.firebase.analytics.FirebaseAnalytics

class PaymentWithAnalyticsActivity : ComponentActivity() {
    private lateinit var analytics: FirebaseAnalytics
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        analytics = FirebaseAnalytics.getInstance(this)
        
        analytics.logEvent("checkout_started", Bundle().apply {
            putDouble("value", 25.00)
            putString("currency", "USD")
        })
        
        startPayment()
    }
    
    private fun startPayment() {
        lifecycleScope.launch {
            val session = createCheckoutSession()
            
            Yuno.startCheckout(
                activity = this@PaymentWithAnalyticsActivity,
                checkoutSession = session.id,
                countryCode = "US",
                yunoCreatePayment = { token ->
                    analytics.logEvent("begin_checkout", Bundle())
                    createPayment(token)
                },
                yunoPaymentResult = { result ->
                    when (result.status) {
                        PaymentStatus.SUCCEEDED -> {
                            analytics.logEvent(FirebaseAnalytics.Event.PURCHASE, Bundle().apply {
                                putString("transaction_id", result.paymentId)
                                putDouble("value", 25.00)
                                putString("currency", "USD")
                            })
                            navigateToSuccess()
                        }
                        PaymentStatus.FAILED -> {
                            analytics.logEvent("payment_failed", Bundle().apply {
                                putString("reason", result.error?.code ?: "unknown")
                            })
                        }
                        else -> {}
                    }
                }
            )
        }
    }
}
```

## Example 8: ViewModel Architecture

```kotlin
class PaymentViewModel : ViewModel() {
    private val _paymentState = MutableStateFlow<PaymentState>(PaymentState.Idle)
    val paymentState: StateFlow<PaymentState> = _paymentState
    
    sealed class PaymentState {
        object Idle : PaymentState()
        object Loading : PaymentState()
        data class Success(val paymentId: String) : PaymentState()
        data class Error(val message: String) : PaymentState()
    }
    
    fun processPayment(activity: ComponentActivity) {
        viewModelScope.launch {
            _paymentState.value = PaymentState.Loading
            
            try {
                val session = createCheckoutSession()
                
                Yuno.startCheckout(
                    activity = activity,
                    checkoutSession = session.id,
                    countryCode = "US",
                    yunoCreatePayment = { token ->
                        createPayment(token)
                    },
                    yunoPaymentResult = { result ->
                        _paymentState.value = when (result.status) {
                            PaymentStatus.SUCCEEDED -> PaymentState.Success(result.paymentId)
                            PaymentStatus.FAILED -> PaymentState.Error(
                                result.error?.message ?: "Payment failed"
                            )
                            else -> PaymentState.Idle
                        }
                    }
                )
            } catch (e: Exception) {
                _paymentState.value = PaymentState.Error(e.message ?: "Unknown error")
            }
        }
    }
}

// Usage in Compose
@Composable
fun PaymentScreen(viewModel: PaymentViewModel = viewModel()) {
    val state by viewModel.paymentState.collectAsState()
    val context = LocalContext.current as ComponentActivity
    
    when (val currentState = state) {
        is PaymentViewModel.PaymentState.Idle -> {
            Button(onClick = { viewModel.processPayment(context) }) {
                Text("Pay Now")
            }
        }
        is PaymentViewModel.PaymentState.Loading -> {
            CircularProgressIndicator()
        }
        is PaymentViewModel.PaymentState.Success -> {
            Text("Payment successful!")
        }
        is PaymentViewModel.PaymentState.Error -> {
            Text("Error: ${currentState.message}", color = Color.Red)
        }
    }
}
```

## Example 9: Multi-Step Checkout

```kotlin
@Composable
fun MultiStepCheckoutScreen() {
    var currentStep by remember { mutableStateOf(CheckoutStep.CART) }
    val context = LocalContext.current as ComponentActivity
    
    when (currentStep) {
        CheckoutStep.CART -> {
            CartScreen(onProceed = { currentStep = CheckoutStep.SHIPPING })
        }
        CheckoutStep.SHIPPING -> {
            ShippingScreen(onProceed = { currentStep = CheckoutStep.PAYMENT })
        }
        CheckoutStep.PAYMENT -> {
            Column {
                Text("Payment", fontSize = 24.sp)
                Button(onClick = {
                    processPayment(context) { success ->
                        if (success) currentStep = CheckoutStep.CONFIRMATION
                    }
                }) {
                    Text("Pay $25.00")
                }
            }
        }
        CheckoutStep.CONFIRMATION -> {
            ConfirmationScreen()
        }
    }
}

enum class CheckoutStep {
    CART, SHIPPING, PAYMENT, CONFIRMATION
}
```

## Example 10: Themed Payment UI

```kotlin
@Composable
fun ThemedPaymentScreen() {
    MaterialTheme(
        colorScheme = darkColorScheme(
            primary = Color(0xFF007bff),
            background = Color(0xFF1a1a1a),
            surface = Color(0xFF2a2a2a)
        )
    ) {
        Surface {
            PaymentContent()
        }
    }
}

// Apply Yuno theme
fun applyYunoTheme(context: Context) {
    Yuno.setTheme(R.style.YunoSDKTheme)
}
```

## Backend API Helper

```kotlin
object YunoAPIClient {
    private val client = OkHttpClient()
    private val gson = Gson()
    
    suspend fun createCheckoutSession(amount: Int, currency: String = "USD"): CheckoutSession {
        return withContext(Dispatchers.IO) {
            val json = gson.toJson(mapOf(
                "amount" to mapOf("currency" to currency, "value" to amount),
                "customer_id" to "cus_123",
                "country" to "US"
            ))
            
            val request = Request.Builder()
                .url("https://api.example.com/checkout")
                .post(json.toRequestBody("application/json".toMediaType()))
                .build()
            
            val response = client.newCall(request).execute()
            gson.fromJson(response.body?.string(), CheckoutSession::class.java)
        }
    }
    
    suspend fun createPayment(token: String, sessionId: String): Payment {
        return withContext(Dispatchers.IO) {
            val json = gson.toJson(mapOf(
                "one_time_token" to token,
                "checkout_session" to sessionId
            ))
            
            val request = Request.Builder()
                .url("https://api.example.com/payment")
                .post(json.toRequestBody("application/json".toMediaType()))
                .build()
            
            val response = client.newCall(request).execute()
            gson.fromJson(response.body?.string(), Payment::class.java)
        }
    }
}
```

