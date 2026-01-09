---
title: Quickstart - Your First Payment in 5 Minutes
deprecated: false
hidden: true
metadata:
  robots: index
---
Choose your platform and follow the steps below to process your first payment with Yuno.

## Web

### 1. Install

```bash
npm install @yuno-payments/sdk-web
```

Or include via CDN:

```html
<script src="https://sdk-web.y.uno/v1.5/main.js"></script>
```

### 2. Initialize and Process Payment

```javascript
import { Yuno } from '@yuno-payments/sdk-web';

// Initialize SDK
const yuno = await Yuno.initialize('your-public-api-key');

// Create checkout session on your backend
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
    // Process payment on your backend
    await fetch('/api/process-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        one_time_token: oneTimeToken,
        checkout_session: session.checkout_session
      })
    });
    yuno.continuePayment();
  }
});

// Mount payment form
yuno.mountCheckout();
```

### 3. Add HTML Container and Trigger Payment

```html
<div id="payment-form"></div>
<button id="pay-button">Pay Now</button>

<script>
  document.getElementById('pay-button').addEventListener('click', () => {
    yuno.startPayment();
  });
</script>
```

**Test with:** Card `4111 1111 1111 1111`, any future date, any CVV

[Complete Web guide →](web/)

## iOS

### 1. Install

**CocoaPods:**
```ruby
pod 'YunoSDK'
```

**Swift Package Manager:**
```swift
dependencies: [
    .package(url: "https://github.com/yuno-payments/yuno-sdk-ios", from: "1.0.0")
]
```

### 2. Initialize and Process Payment

```swift
import YunoSDK

// Initialize in AppDelegate or App struct
Yuno.initialize(publicKey: "your-public-api-key")

// In your view controller
class PaymentViewController: UIViewController, YunoPaymentDelegate {
    
    func processPayment() async {
        // Create session on your backend
        let session = try await createCheckoutSession()
        
        // Configure and start payment
        let config = YunoConfig(
            checkoutSession: session.id,
            countryCode: "US"
        )
        
        Yuno.startPayment(with: config, delegate: self)
    }
    
    // Handle payment result
    func yunoPaymentResult(_ result: PaymentResult) {
        switch result.status {
        case .succeeded:
            print("Payment succeeded!")
        case .failed:
            print("Payment failed: \(result.error?.message ?? "")")
        case .pending:
            print("Payment pending")
        }
    }
}
```

**Test with:** Card `4111 1111 1111 1111`, any future date, any CVV

[Complete iOS guide →](ios/)

## Android

### 1. Install

**build.gradle:**
```kotlin
repositories {
    maven { url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" }
}

dependencies {
    implementation 'com.yuno.payments:android-sdk:1.0.0'
}
```

### 2. Initialize and Process Payment

**Initialize in Application:**
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

**In Activity/Fragment:**
```kotlin
import com.yuno.payments.Yuno

class PaymentActivity : ComponentActivity() {
    private var checkoutSession: String? = null
    private var paymentReady = mutableStateOf(false)
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        setContent {
            var paymentMethodSelected by remember { mutableStateOf(false) }
            
            Column {
                // Initialize checkout
                LaunchedEffect(Unit) {
                    val session = createCheckoutSession()
                    checkoutSession = session.id
                    
                    startCheckout(
                        checkoutSession = session.id,
                        countryCode = "US"
                    )
                }
                
                // Display payment methods
                PaymentMethodListViewComponent(
                    activity = this@PaymentActivity,
                    onPaymentSelected = { paymentMethodSelected = it }
                )
                
                // Pay button
                Button(
                    onClick = {
                        lifecycleScope.launch {
                            startPayment(
                                showStatusYuno = true,
                                callbackOTT = { token ->
                                    token?.let { processPayment(it, checkoutSession!!) }
                                }
                            )
                        }
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

**Test with:** Card `4111 1111 1111 1111`, any future date, any CVV

[Complete Android guide →](android/)

## React Native

### 1. Install

```bash
npm install @yuno-payments/react-native-sdk
```

**iOS:**
```bash
cd ios && pod install
```

### 2. Initialize and Process Payment

```typescript
import { Yuno } from '@yuno-payments/react-native-sdk';

// Initialize
Yuno.initialize({
  publicKey: 'your-public-api-key',
});

// In your component
const PaymentScreen = () => {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    initCheckout();
    return () => YunoSdk.removeListeners();
  }, []);
  
  const initCheckout = async () => {
    const session = await createCheckoutSession();
    
    // Set up listeners
    YunoSdk.yunoPaymentResult((result) => {
      if (result.status === 'SUCCEEDED') {
        console.log('Payment succeeded!');
      }
    });
    
    // Show checkout
    await YunoSdk.showPaymentCheckout({
      checkoutSession: session.id,
      countryCode: 'US',
    });
    
    setIsReady(true);
  };
  
  const processPayment = async () => {
    await YunoSdk.startPayment(true); // Start payment flow
  };
  
  return (
    <Button 
      title="Pay Now" 
      onPress={processPayment}
      disabled={!isReady}
    />
  );
};
```

**Test with:** Card `4111 1111 1111 1111`, any future date, any CVV

[Complete React Native guide →](react-native/)

> 📘 Get Your API Keys
>
> Log in to [Yuno Dashboard](https://dashboard.y.uno) → **Developers** > **Credentials** → Copy your **Public API Key** (for frontend) and **Secret Key** (for backend)

## Test Cards

| Card Number         | Scenario       |
| ------------------- | -------------- |
| 4111 1111 1111 1111 | Success        |
| 4000 0000 0000 0002 | Declined       |
| 4000 0000 0000 3220 | 3DS Challenge  |
