---
title: Code Examples Android SDK
deprecated: false
hidden: true
metadata:
  robots: index
---
Ready-to-use Android code examples for common scenarios.

## Example 1: Full SDK Payment Flow

Complete payment flow using the Full SDK with PaymentMethodListView:

```kotlin
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.ui.platform.ComposeView
import com.yuno.presentation.core.components.PaymentMethodListViewComponent
import com.yuno.sdk.payments.continuePayment
import com.yuno.sdk.payments.startCheckout
import com.yuno.sdk.payments.startPayment
import com.yuno.sdk.payments.updateCheckoutSession

class FullPaymentActivity : AppCompatActivity() {
    
    private lateinit var payButton: Button
    private var checkoutSession: String = ""
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment)
        
        payButton = findViewById(R.id.button_pay)
        payButton.isEnabled = false
        
        // Step 1: Initialize checkout in onCreate
        startCheckout(
            callbackPaymentState = ::onPaymentStateChange
        )
        
        // Step 2: Fetch checkout session from your backend
        lifecycleScope.launch {
            checkoutSession = fetchCheckoutSessionFromBackend()
            setupPaymentMethods()
        }
        
        payButton.setOnClickListener {
            processPayment()
        }
    }
    
    private fun setupPaymentMethods() {
        // Step 3: Update SDK with session and country
        updateCheckoutSession(
            checkoutSession = checkoutSession,
            countryCode = "CO"
        )
        
        // Step 4: Display payment methods
        val composeView = findViewById<ComposeView>(R.id.compose_payment_methods)
        composeView.setContent {
            PaymentMethodListViewComponent(
                activity = this@FullPaymentActivity,
                onPaymentSelected = { isSelected ->
                    payButton.isEnabled = isSelected
                }
            )
        }
    }
    
    private fun processPayment() {
        // Step 5: Start payment
        startPayment(
            callbackOTT = ::onTokenReceived
        )
    }
    
    private fun onTokenReceived(token: String?) {
        token?.let {
            lifecycleScope.launch {
                // Step 6: Create payment on your backend
                val response = createPaymentOnBackend(it, checkoutSession)
                
                // Step 7: Continue if SDK action required
                if (response.sdkActionRequired) {
                    continuePayment(
                        callbackPaymentState = ::onPaymentStateChange
                    )
                }
            }
        }
    }
    
    private fun onPaymentStateChange(state: String?) {
        when (state) {
            "SUCCEEDED" -> {
                Toast.makeText(this, "Payment successful!", Toast.LENGTH_SHORT).show()
                finish()
            }
            "FAIL" -> Toast.makeText(this, "Payment failed", Toast.LENGTH_LONG).show()
            "PROCESSING" -> Toast.makeText(this, "Processing...", Toast.LENGTH_SHORT).show()
            "REJECT" -> Toast.makeText(this, "Payment rejected", Toast.LENGTH_LONG).show()
            "INTERNAL_ERROR" -> Toast.makeText(this, "Error occurred", Toast.LENGTH_LONG).show()
            "CANCELED" -> Toast.makeText(this, "Canceled", Toast.LENGTH_SHORT).show()
        }
    }
    
    private suspend fun fetchCheckoutSessionFromBackend(): String {
        // Call your backend API
        return "checkout_session_id"
    }
    
    private suspend fun createPaymentOnBackend(token: String, session: String): PaymentResponse {
        // Call your backend API to create payment
        return PaymentResponse(sdkActionRequired = false)
    }
}

data class PaymentResponse(val sdkActionRequired: Boolean)
```

## Example 2: Lite SDK Payment Flow

Custom payment method selection using the Lite SDK:

```kotlin
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.yuno.presentation.core.components.PaymentSelected
import com.yuno.sdk.payments.continuePayment
import com.yuno.sdk.payments.startCheckout
import com.yuno.sdk.payments.startPaymentLite
import com.yuno.sdk.payments.updateCheckoutSession

class LitePaymentActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_lite_payment)
        
        val checkoutSession = intent.getStringExtra("checkout_session") ?: return
        val countryCode = intent.getStringExtra("country_code") ?: "CO"
        
        // Initialize checkout
        startCheckout(
            checkoutSession = checkoutSession,
            countryCode = countryCode,
            callbackPaymentState = ::onPaymentStateChange
        )
        
        // Set up payment buttons
        findViewById<Button>(R.id.button_pay_card).setOnClickListener {
            payWithMethod("CARD")
        }
        
        findViewById<Button>(R.id.button_pay_pix).setOnClickListener {
            payWithMethod("PIX")
        }
    }
    
    private fun payWithMethod(paymentMethodType: String) {
        startPaymentLite(
            paymentSelected = PaymentSelected(
                paymentMethodType = paymentMethodType,
                vaultedToken = null
            ),
            callBackTokenWithInformation = { ottModel ->
                Log.i("OTT Info", ottModel.toString())
            },
            callbackOTT = ::onTokenReceived,
            showPaymentStatus = true
        )
    }
    
    private fun onTokenReceived(token: String?) {
        token?.let {
            lifecycleScope.launch {
                createPaymentOnBackend(it)
            }
        }
    }
    
    private fun onPaymentStateChange(state: String?) {
        when (state) {
            "SUCCEEDED" -> navigateToSuccess()
            "FAIL" -> showError("Payment failed")
            "CANCELED" -> finish()
            else -> {}
        }
    }
}
```

## Example 3: Enrollment Flow

Save a payment method for future use:

```kotlin
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.yuno.sdk.enrollment.initEnrollment
import com.yuno.sdk.enrollment.startEnrollment

class EnrollmentActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_enrollment)
        
        // Must be called in onCreate to register callback
        initEnrollment(::onEnrollmentStateChange)
        
        findViewById<Button>(R.id.button_enroll).setOnClickListener {
            startEnrollmentFlow()
        }
    }
    
    private fun startEnrollmentFlow() {
        val customerSession = intent.getStringExtra("customer_session") ?: return
        
        startEnrollment(
            customerSession = customerSession,
            countryCode = "CO",
            showEnrollmentStatus = true
        )
    }
    
    private fun onEnrollmentStateChange(state: String?) {
        state?.let {
            Log.d("Enrollment", "State: $it")
            when (it) {
                "SUCCEEDED" -> {
                    Toast.makeText(this, "Card saved successfully!", Toast.LENGTH_SHORT).show()
                    finish()
                }
                "FAIL" -> {
                    Toast.makeText(this, "Failed to save card", Toast.LENGTH_LONG).show()
                }
                "CANCELED" -> {
                    Toast.makeText(this, "Enrollment canceled", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
}
```

## Example 4: One-Click Payment with Saved Card

Pay with a previously saved card using vaulted token:

```kotlin
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.yuno.presentation.core.components.PaymentSelected
import com.yuno.sdk.payments.startCheckout
import com.yuno.sdk.payments.startPaymentLite

class SavedCardPaymentActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_saved_card)
        
        val checkoutSession = intent.getStringExtra("checkout_session") ?: return
        val vaultedToken = intent.getStringExtra("vaulted_token") ?: return
        
        // Initialize checkout
        startCheckout(
            checkoutSession = checkoutSession,
            countryCode = "CO",
            callbackPaymentState = ::onPaymentStateChange
        )
        
        findViewById<Button>(R.id.button_pay_saved_card).setOnClickListener {
            payWithSavedCard(vaultedToken)
        }
    }
    
    private fun payWithSavedCard(vaultedToken: String) {
        startPaymentLite(
            paymentSelected = PaymentSelected(
                paymentMethodType = "CARD",
                vaultedToken = vaultedToken
            ),
            callBackTokenWithInformation = { ottModel ->
                Log.i("OTT Info", ottModel.toString())
            },
            callbackOTT = ::onTokenReceived,
            showPaymentStatus = true
        )
    }
    
    private fun onTokenReceived(token: String?) {
        token?.let {
            lifecycleScope.launch {
                createPaymentOnBackend(it)
            }
        }
    }
    
    private fun onPaymentStateChange(state: String?) {
        when (state) {
            "SUCCEEDED" -> navigateToSuccess()
            "FAIL" -> showError("Payment failed")
            else -> {}
        }
    }
}
```

## Example 5: Keep Loader Flow

Keep Yuno's loading screen until payment is created:

```kotlin
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.yuno.sdk.payments.startCheckout
import com.yuno.sdk.payments.startCompletePaymentFlow
import com.yuno.sdk.payments.updateCheckoutSession

// In Application class, set keepLoader = true
// Yuno.initialize(this, "api_key", YunoConfig(keepLoader = true))

class KeepLoaderPaymentActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment)
        
        val checkoutSession = intent.getStringExtra("checkout_session") ?: return
        
        startCheckout(
            callbackPaymentState = ::onPaymentStateChange
        )
        
        updateCheckoutSession(
            checkoutSession = checkoutSession,
            countryCode = "CO"
        )
        
        // Set up payment methods view...
    }
    
    private fun processPayment() {
        startCompletePaymentFlow(
            paymentSelected = null, // null for Full SDK
            showPaymentStatus = true,
            createPaymentFun = { ott ->
                // Loader stays visible until this completes
                createPaymentOnBackend(ott)
            },
            callbackPaymentState = ::onPaymentStateChange,
            callbackOTT = { token ->
                // Optional: handle token
            }
        )
    }
    
    private suspend fun createPaymentOnBackend(ott: String) {
        // Call your backend API
        // Loader remains visible until this function returns
    }
    
    private fun onPaymentStateChange(state: String?) {
        when (state) {
            "SUCCEEDED" -> navigateToSuccess()
            "FAIL" -> showError("Payment failed")
            else -> {}
        }
    }
}
```

## Example 6: Deep Link Return Handling

Handle return from external browser (3DS, bank redirects):

```kotlin
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.yuno.sdk.payments.continuePayment
import com.yuno.sdk.payments.startCheckout

class DeepLinkPaymentActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment)
        
        // Initialize checkout
        startCheckout(
            callbackPaymentState = ::onPaymentStateChange
        )
        
        // Check if opened via deep link
        handleIntent(intent)
    }
    
    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        intent?.let { handleIntent(it) }
    }
    
    private fun handleIntent(intent: Intent) {
        intent.data?.let { uri ->
            if (isPaymentReturnUri(uri)) {
                handlePaymentReturn()
            } else {
                // Normal flow - set up payment UI
                setupPaymentUI()
            }
        } ?: setupPaymentUI()
    }
    
    private fun isPaymentReturnUri(uri: Uri): Boolean {
        return uri.toString().contains("myapp://payment/return")
    }
    
    private fun handlePaymentReturn() {
        // Continue payment after returning from external browser
        continuePayment(
            showPaymentStatus = true,
            callbackPaymentState = ::onPaymentStateChange
        )
    }
    
    private fun setupPaymentUI() {
        // Set up normal payment flow
    }
    
    private fun onPaymentStateChange(state: String?) {
        when (state) {
            "SUCCEEDED" -> navigateToSuccess()
            "FAIL" -> showError("Payment failed")
            else -> {}
        }
    }
}
```

**AndroidManifest.xml:**

```xml
<activity android:name=".DeepLinkPaymentActivity"
    android:launchMode="singleTask">
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

## Example 7: Custom Error Handling

Handle all payment states with custom UI:

```kotlin
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.yuno.sdk.payments.startCheckout
import com.yuno.sdk.payments.startPayment

class CustomErrorHandlingActivity : AppCompatActivity() {
    
    private lateinit var statusText: TextView
    private lateinit var retryButton: Button
    private var retryCount = 0
    private val maxRetries = 3
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_custom_error)
        
        statusText = findViewById(R.id.text_status)
        retryButton = findViewById(R.id.button_retry)
        retryButton.visibility = View.GONE
        
        startCheckout(
            callbackPaymentState = ::onPaymentStateChange
        )
        
        retryButton.setOnClickListener {
            retryPayment()
        }
    }
    
    private fun processPayment() {
        statusText.text = "Processing payment..."
        
        startPayment(
            callbackOTT = ::onTokenReceived,
            showPaymentStatus = false // Handle status ourselves
        )
    }
    
    private fun onTokenReceived(token: String?) {
        token?.let {
            lifecycleScope.launch {
                try {
                    createPaymentOnBackend(it)
                } catch (e: Exception) {
                    handleError(e.message ?: "Unknown error")
                }
            }
        }
    }
    
    private fun onPaymentStateChange(state: String?) {
        when (state) {
            "SUCCEEDED" -> {
                statusText.text = "Payment successful!"
                retryButton.visibility = View.GONE
                navigateToSuccessDelayed()
            }
            "FAIL" -> {
                handleError("Payment failed. Please try again.")
            }
            "REJECT" -> {
                handleError("Payment was rejected. Please try a different payment method.")
            }
            "INTERNAL_ERROR" -> {
                handleError("An error occurred. Please try again.")
            }
            "PROCESSING" -> {
                statusText.text = "Your payment is being processed..."
                retryButton.visibility = View.GONE
            }
            "CANCELED" -> {
                statusText.text = "Payment canceled"
                retryButton.visibility = View.VISIBLE
                retryButton.text = "Try Again"
            }
        }
    }
    
    private fun handleError(message: String) {
        statusText.text = message
        
        if (retryCount < maxRetries) {
            retryButton.visibility = View.VISIBLE
            retryButton.text = "Retry (${maxRetries - retryCount} attempts left)"
        } else {
            retryButton.visibility = View.GONE
            statusText.text = "$message\n\nMaximum retry attempts reached."
        }
    }
    
    private fun retryPayment() {
        retryCount++
        processPayment()
    }
}
```

## Example 8: ViewModel Architecture

Use ViewModel for payment state management:

```kotlin
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class PaymentViewModel : ViewModel() {
    
    private val _paymentState = MutableStateFlow<PaymentUiState>(PaymentUiState.Idle)
    val paymentState: StateFlow<PaymentUiState> = _paymentState
    
    sealed class PaymentUiState {
        object Idle : PaymentUiState()
        object Loading : PaymentUiState()
        object PaymentMethodSelected : PaymentUiState()
        data class TokenReceived(val token: String) : PaymentUiState()
        data class Success(val message: String) : PaymentUiState()
        data class Error(val message: String) : PaymentUiState()
    }
    
    fun onPaymentMethodSelected(isSelected: Boolean) {
        _paymentState.value = if (isSelected) {
            PaymentUiState.PaymentMethodSelected
        } else {
            PaymentUiState.Idle
        }
    }
    
    fun onTokenReceived(token: String?) {
        token?.let {
            _paymentState.value = PaymentUiState.TokenReceived(it)
            createPayment(it)
        }
    }
    
    fun onPaymentStateChange(state: String?) {
        _paymentState.value = when (state) {
            "SUCCEEDED" -> PaymentUiState.Success("Payment successful!")
            "FAIL" -> PaymentUiState.Error("Payment failed")
            "REJECT" -> PaymentUiState.Error("Payment rejected")
            "INTERNAL_ERROR" -> PaymentUiState.Error("An error occurred")
            "PROCESSING" -> PaymentUiState.Loading
            "CANCELED" -> PaymentUiState.Idle
            else -> PaymentUiState.Idle
        }
    }
    
    private fun createPayment(token: String) {
        viewModelScope.launch {
            _paymentState.value = PaymentUiState.Loading
            try {
                // Call backend API
                _paymentState.value = PaymentUiState.Success("Payment created")
            } catch (e: Exception) {
                _paymentState.value = PaymentUiState.Error(e.message ?: "Unknown error")
            }
        }
    }
}

// Usage in Activity
class PaymentActivity : AppCompatActivity() {
    
    private val viewModel: PaymentViewModel by viewModels()
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        startCheckout(
            callbackPaymentState = viewModel::onPaymentStateChange
        )
        
        lifecycleScope.launch {
            viewModel.paymentState.collect { state ->
                when (state) {
                    is PaymentViewModel.PaymentUiState.Idle -> {
                        payButton.isEnabled = false
                    }
                    is PaymentViewModel.PaymentUiState.PaymentMethodSelected -> {
                        payButton.isEnabled = true
                    }
                    is PaymentViewModel.PaymentUiState.Loading -> {
                        showLoading()
                    }
                    is PaymentViewModel.PaymentUiState.Success -> {
                        hideLoading()
                        navigateToSuccess()
                    }
                    is PaymentViewModel.PaymentUiState.Error -> {
                        hideLoading()
                        showError(state.message)
                    }
                    else -> {}
                }
            }
        }
    }
    
    private fun processPayment() {
        startPayment(
            callbackOTT = viewModel::onTokenReceived
        )
    }
}
```

## Backend API Helper

Example backend API client:

```kotlin
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import com.google.gson.Gson

object YunoBackendClient {
    
    private val client = OkHttpClient()
    private val gson = Gson()
    private const val BASE_URL = "https://your-backend.com/api"
    
    suspend fun createCheckoutSession(
        amount: Int,
        currency: String,
        customerId: String,
        countryCode: String
    ): CheckoutSessionResponse = withContext(Dispatchers.IO) {
        val json = gson.toJson(mapOf(
            "amount" to mapOf("currency" to currency, "value" to amount),
            "customer_id" to customerId,
            "country" to countryCode
        ))
        
        val request = Request.Builder()
            .url("$BASE_URL/checkout-sessions")
            .post(json.toRequestBody("application/json".toMediaType()))
            .build()
        
        val response = client.newCall(request).execute()
        gson.fromJson(response.body?.string(), CheckoutSessionResponse::class.java)
    }
    
    suspend fun createPayment(
        oneTimeToken: String,
        checkoutSession: String
    ): PaymentResponse = withContext(Dispatchers.IO) {
        val json = gson.toJson(mapOf(
            "one_time_token" to oneTimeToken,
            "checkout_session" to checkoutSession
        ))
        
        val request = Request.Builder()
            .url("$BASE_URL/payments")
            .post(json.toRequestBody("application/json".toMediaType()))
            .build()
        
        val response = client.newCall(request).execute()
        gson.fromJson(response.body?.string(), PaymentResponse::class.java)
    }
    
    suspend fun createCustomerSession(customerId: String): CustomerSessionResponse = 
        withContext(Dispatchers.IO) {
            val json = gson.toJson(mapOf("customer_id" to customerId))
            
            val request = Request.Builder()
                .url("$BASE_URL/customer-sessions")
                .post(json.toRequestBody("application/json".toMediaType()))
                .build()
            
            val response = client.newCall(request).execute()
            gson.fromJson(response.body?.string(), CustomerSessionResponse::class.java)
        }
}

data class CheckoutSessionResponse(
    val checkoutSession: String,
    val customerId: String
)

data class PaymentResponse(
    val paymentId: String,
    val status: String,
    val sdkActionRequired: Boolean
)

data class CustomerSessionResponse(
    val customerSession: String
)
```
