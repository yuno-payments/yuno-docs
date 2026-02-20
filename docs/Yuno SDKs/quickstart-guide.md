---
title: Quickstart Guide
deprecated: false
hidden: false
metadata:
  robots: index
---

Welcome to the Yuno SDKs quickstart guide. This guide shows you how to easily implement our full payment flow, Yuno's most straightforward solution with pre-built UI and automatic payment method display.

Choose your platform and follow the steps to start process your first payments with Yuno.

## Web SDK integration

### 1. Install

```bash
npm install @yuno-payments/sdk-web
```

Or include via CDN:

```html
<script src="https://sdk-web.y.uno/v1.5/main.js"></script>
```

### 2. Initialize and process payment

```javascript
import { Yuno } from '@yuno-payments/sdk-web';

// Initialize SDK
const yuno = await Yuno.initialize('your-public-api-key');

// Create checkout session on your backend
// Your backend calls: POST https://api-sandbox.y.uno/v1/checkout/sessions
const session = await fetch('/api/create-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customer_id: 'customer-123',
    amount: { currency: 'USD', value: 1000 },
    country: 'US'
  })
}).then(r => r.json());

// Configure checkout
yuno.startCheckout({
  checkoutSession: session.checkout_session,
  elementSelector: '#payment-form',
  countryCode: 'US',
  async yunoCreatePayment(oneTimeToken) {
    // Your backend calls: POST https://api-sandbox.y.uno/v1/payments
    // with { payment_method: { token: oneTimeToken }, checkout_session: ... }
    const payment = await fetch('/api/process-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        one_time_token: oneTimeToken,
        checkout_session: session.checkout_session
      })
    }).then(r => r.json());
    
    // Required for async payment methods (3DS, PIX, etc.)
    yuno.continuePayment();
  }
});

// Mount payment form
yuno.mountCheckout();
```

### 3. Add HTML container and trigger payment

```html
<div id="payment-form"></div>
<button id="pay-button">Pay Now</button>

<script>
  document.getElementById('pay-button').addEventListener('click', () => {
    yuno.startPayment();
  });
</script>
```

**Test with**: Card `4111 1111 1111 1111`, any future date, any CVV

For a comprehensive overview of all Web SDK parameters, see [Web SDK Common Reference](web-sdk-common-reference).

[Complete Web guide →](payment-flows-web)

## iOS

### 1. Install

**CocoaPods**:
```ruby
pod 'YunoSDK', '~> 2.11.1'
```

**Swift Package Manager**:
```swift
dependencies: [
    .package(url: "https://github.com/yuno-payments/yuno-sdk-ios", from: "2.11.1")
]
```

### 2. Initialize and implement delegate

```swift
import YunoSDK

// Initialize in AppDelegate or App struct
Yuno.initialize(
    apiKey: "your-public-api-key",
    config: YunoConfig()
)

// In your view controller - implement YunoPaymentDelegate
class PaymentViewController: UIViewController, YunoPaymentDelegate {
    
    // Required delegate properties
    var checkoutSession: String { "session-from-backend" }
    var countryCode: String { "US" }
    var language: String? { "en" }
    var viewController: UIViewController? { self }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        displayPaymentMethods()
    }
    
    func displayPaymentMethods() async {
        // Get payment methods view
        let paymentView = await Yuno.getPaymentMethodViewAsync(delegate: self)
        view.addSubview(paymentView)
        // Add constraints...
    }
    
    // Required: Create payment with one-time token
    func yunoCreatePayment(with token: String) {
        // Call your backend: POST /v1/payments
        createPaymentOnBackend(token: token) { result in
            // After payment creation, continue for async methods
            Yuno.continuePayment()
        }
    }
    
    // Required: Handle payment result
    func yunoPaymentResult(_ result: Yuno.Result) {
        switch result {
        case .succeeded:
            print("Payment succeeded!")
        case .fail:
            print("Payment failed")
        case .processing:
            print("Payment processing")
        default:
            break
        }
    }
}

// Start payment when user taps pay button
@IBAction func payButtonTapped(_ sender: UIButton) {
    Yuno.startPayment(showPaymentStatus: true)
}
```

**Test with**: Card `4111 1111 1111 1111`, any future date, any CVV

For a comprehensive overview of all iOS SDK parameters, see [iOS SDK Common Reference](ios-sdk-common-reference).

[Complete iOS guide →](payment-flows-ios)

## Android

### 1. Install

**build.gradle**:
```kotlin
repositories {
    maven { url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" }
}

dependencies {
    implementation 'com.yuno.payments:android-sdk:2.9.0'
}
```

### 2. Initialize and process payment

**Initialize in Application**:
```kotlin
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

**In Activity/Fragment**:
```kotlin
import com.yuno.payments.Yuno

class PaymentActivity : ComponentActivity() {
    private var checkoutSession: String? = null
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Create checkout session on your backend first
        // Your backend calls: POST https://api-sandbox.y.uno/v1/checkout/sessions
        lifecycleScope.launch {
            val session = createCheckoutSession() // Your backend call
            checkoutSession = session.id
            
            // Start checkout with session
            startCheckout(
                checkoutSession = session.id,
                countryCode = "US",
                callbackPaymentState = { state, subState ->
                    when (state) {
                        "SUCCEEDED" -> println("Payment succeeded!")
                        "FAILED" -> println("Payment failed")
                        "PROCESSING" -> println("Payment processing")
                        "REJECT" -> println("Payment rejected")
                        else -> println("Payment state: $state")
                    }
                }
            )
        }
        
        setContent {
            var paymentMethodSelected by remember { mutableStateOf(false) }
            
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .verticalScroll(rememberScrollState())
            ) {
                // Display payment methods
                PaymentMethodListViewComponent(
                    activity = this@PaymentActivity,
                    onPaymentSelected = { isSelected ->
                        paymentMethodSelected = isSelected
                    }
                )
                
                // Pay button
                Button(
                    onClick = {
                        startPayment(
                            showStatusYuno = true,
                            callbackOTT = { token ->
                                token?.let { ott ->
                                    // Call your backend: POST /v1/payments
                                    // with { payment_method: { token: ott }, checkout_session: ... }
                                    createPayment(ott, checkoutSession!!)
                                    
                                    // Required for async payment methods
                                    continuePayment()
                                }
                            }
                        )
                    },
                    enabled = paymentMethodSelected
                ) {
                    Text("Pay Now")
                }
            }
        }
    }
}
```

**Test with**: Card `4111 1111 1111 1111`, any future date, any CVV

For a comprehensive overview of all Android SDK parameters, see [Android SDK Common Reference](android-sdk-common-reference).

[Complete Android guide →](payment-flows-android)

## React Native

### 1. Install

```bash
npm install @yuno-payments/yuno-sdk-react-native
```

**iOS**:
```bash
cd ios && pod install
```

### 2. Initialize and process payment

```typescript
import React, { useState, useEffect } from 'react';
import { View, Button, ScrollView, StyleSheet } from 'react-native';
import { YunoSdk, YunoPaymentMethods } from '@yuno-payments/yuno-sdk-react-native';

// Initialize SDK (e.g., in App.tsx)
YunoSdk.initialize({
  apiKey: 'your-public-api-key',
  countryCode: 'US',
});

// Payment screen
export default function PaymentScreen() {
  const [checkoutSession, setCheckoutSession] = useState(null);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(false);
  
  useEffect(() => {
    // Create checkout session on your backend
    // Your backend calls: POST https://api-sandbox.y.uno/v1/checkout/sessions
    async function initCheckout() {
      const session = await fetch('https://your-backend.com/api/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: 'customer-123',
          amount: { currency: 'USD', value: 2500 },
          country: 'US'
        })
      }).then(r => r.json());
      
      setCheckoutSession(session.checkout_session);
    }
    
    initCheckout();
    
    // Subscribe to payment status
    const subscription = YunoSdk.onPaymentStatus((state) => {
      switch (state.status) {
        case 'SUCCEEDED':
          console.log('Payment succeeded!');
          break;
        case 'FAILED':
          console.log('Payment failed');
          break;
        case 'PROCESSING':
          console.log('Payment processing');
          break;
      }
    });
    
    return () => subscription.remove();
  }, []);
  
  const handlePayment = async () => {
    // Start payment flow
    await YunoSdk.startPayment(true); // true = show payment status
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* Display payment methods */}
      {checkoutSession && (
        <YunoPaymentMethods
          checkoutSession={checkoutSession}
          countryCode="US"
          onPaymentMethodSelected={(event) => {
            setPaymentMethodSelected(event.isSelected);
          }}
        />
      )}
      
      {/* Pay button */}
      <Button
        title="Pay Now"
        onPress={handlePayment}
        disabled={!paymentMethodSelected}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
```

**Test with**: Card `4111 1111 1111 1111`, any future date, any CVV

[Complete React Native guide →](react-native-sdks)

## Backend integration

Your backend must implement two API endpoints to work with Yuno:

### 1. Create checkout session

Before displaying the payment UI, your backend creates a checkout session:

- **Endpoint**: `POST https://api-sandbox.y.uno/v1/checkout/sessions`
- **Required**: Customer ID, amount, country
- **Returns**: `checkout_session` ID (used in SDK)
- **Reference**: [Create checkout session API](https://docs.y.uno/reference/create-checkout-session)

**Example request**:
```json
{
  "country": "US",
  "customer_payer": {
    "id": "customer-123"
  },
  "amount": {
    "currency": "USD",
    "value": "2500"
  }
}
```

### 2. Create payment

In the One-Time Token (OTT) callback, your backend creates the payment:

- **Endpoint**: `POST https://api-sandbox.y.uno/v1/payments`
- **Required**: One-time token (from SDK callback), checkout session
- **Returns**: Payment status and `sdk_action_required` field
- **Reference**: [Create payment API](https://docs.y.uno/reference/create-payment)

**Example request**:
```json
{
  "payment_method": {
    "token": "one-time-token-from-sdk"
  },
  "checkout": {
    "session": "checkout-session-id"
  }
}
```

**Important**: If the API response has `sdk_action_required: true`, you must call the SDK's `continuePayment()` method to complete async payment methods (3DS authentication, PIX, bank redirects, etc.).

## Parameters

Primary parameters used in this quickstart:

| Parameter | Description |
| --------- | ----------- |
| `publicKey` / `apiKey` | Your Yuno public API key (frontend). From [Yuno Dashboard](https://dashboard.y.uno/) → **Developers** > **Credentials**. |
| `checkoutSession` | Checkout session ID returned by your backend (create session endpoint). Required to start payment. |
| `countryCode` | ISO country code for the payment (e.g. `US`, `CO`). See [Country coverage](country-coverage). |
| `elementSelector` (Web) | CSS selector for the element where the payment form is mounted (e.g. `#payment-form`). |

Full parameter reference: [Payment flows (Web)](payment-flows-web), [Payment flows (iOS)](payment-flows-ios), [Payment flows (Android)](payment-flows-android).

## Test cards

| Card Number         | Scenario       |
| ------------------- | -------------- |
| 4111 1111 1111 1111 | Success        |
| 4000 0000 0000 0002 | Declined       |
| 4000 0000 0000 3220 | 3DS Challenge  |