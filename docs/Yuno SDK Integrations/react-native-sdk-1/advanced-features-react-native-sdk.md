---
title: Advanced Features React Native SDK
deprecated: false
hidden: true
metadata:
  robots: index
---
Advanced configuration and custom integrations for React Native.

## Alternative Mounting Options

The basic flow uses automatic payment method display. For more control, use these alternatives:

### Custom Payment Method Selection (`startPaymentLite`)

Select which payment method to display:

```typescript
// 1. Fetch available methods
const methods = await fetchPaymentMethods(sessionId);

// 2. Display in your UI
// 3. Start payment with selected method

await YunoSdk.startPaymentLite(
  {
    checkoutSession: session.checkoutSession,
    methodSelected: {
      paymentMethodType: selectedMethod, // 'CARD', 'PIX', etc.
      vaultedToken: null, // or saved token
    },
    showPaymentStatus: true,
  },
  'US' // Optional country code override
);
```

### Simplified Flow (`startPaymentSeamlessLite`)

Similar to Lite but with automatic payment creation:

```typescript
await YunoSdk.startPaymentSeamlessLite({
  checkoutSession: session.checkoutSession,
  paymentMethodType: 'CARD',
  showPaymentStatus: true,
});
```

## Enrollment (Save Cards)

### Save During Payment

```typescript
// When creating payment on backend, include vault_on_success flag
async function createPayment(token: string, checkoutSession: string) {
  await fetch('/api/payment/create', {
    method: 'POST',
    body: JSON.stringify({
      one_time_token: token,
      checkout_session: checkoutSession,
      vault_on_success: true, // Save after successful payment
    }),
  });
}
```

### Separate Enrollment

```typescript
// Create customer session on backend
const customerSession = await createCustomerSession('cus_123');

// Set up listener
const enrollmentSubscription = YunoSdk.onEnrollmentStatus((state) => {
  if (state.status === 'SUCCEEDED') {
    console.log('Card saved successfully');
  }
});

// Start enrollment flow
await YunoSdk.enrollmentPayment({
  customerSession: customerSession.id,
  countryCode: 'US',
  showPaymentStatus: true,
});

// Clean up
enrollmentSubscription.remove();
```

## Vaulted Token Payments

```typescript
await YunoSdk.startPaymentLite({
  checkoutSession: session.checkoutSession,
  methodSelected: {
    paymentMethodType: 'CARD',
    vaultedToken: 'vtok_saved_card_123',
  },
  showPaymentStatus: true,
});
```

## Custom UI (Headless Integration)

Build completely custom payment forms with full UI control when you need complete control over every UI element, highly custom checkout experiences, or have development resources for custom UI.

```typescript
import { YunoSdk } from '@yuno-payments/yuno-sdk-react-native';

const CustomPaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  
  const processPayment = async () => {
    try {
      // 1. Use headless API
      const result = await YunoSdk.generateToken({
        checkoutSession: 'session_id',
        paymentMethod: {
          type: 'CARD',
          card: {
            number: cardNumber,
            expirationMonth: parseInt(expiry.split('/')[0]),
            expirationYear: parseInt(expiry.split('/')[1]),
            securityCode: cvv,
            holderName: 'John Doe',
            type: 'CREDIT',
          },
        },
      }, 'session_id', 'US');
      
      
      // 2. Create payment with token
      await createPayment(result.token);
      
      // 3. Handle 3DS if needed
      if (result.needsChallenge) {
        await YunoSdk.continuePayment('session_id', 'US', true);
      }
      
    } catch (error) {
      console.error('Payment error:', error);
    }
  };
  
  return (
    <View>
      <TextInput
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <TextInput
        placeholder="MM/YY"
        value={expiry}
        onChangeText={setExpiry}
      />
      <TextInput
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
        secureTextEntry
      />
      <Button title="Pay" onPress={processPayment} />
    </View>
  );
};
```

## Styling

Customize SDK appearance.

```typescript
// Note: Styling configuration should be done during initialization
YunoSdk.initialize({
  apiKey: 'your-key',
  countryCode: 'US',
  yunoConfig: {
    // Add styling options here
  },
});
```

## Error Handling

```typescript
const handlePayment = async () => {
  useEffect(() => {
    const subscription = YunoSdk.onPaymentStatus((state) => {
      if (state.status === 'FAILED') {
        // Handle payment failure
        Alert.alert('Error', 'Payment failed. Please try again.');
      }
    });
    
    return () => subscription.remove();
  }, []);
  
  try {
    await YunoSdk.startPayment(true);
  } catch (error) {
    console.error('Payment error:', error);
    Alert.alert('Error', error.message);
  }
};
```

## Testing & Debug

```typescript
// Use test mode with test API key
YunoSdk.initialize({
  apiKey: 'pk_test_your_key',
  countryCode: 'US',
});
```

## Performance

### Lazy Loading

```typescript
const PaymentScreen = () => {
  const [yunoLoaded, setYunoLoaded] = useState(false);
  
  useEffect(() => {
    // Load Yuno only when needed
    if (!yunoLoaded) {
      YunoSdk.initialize({
        apiKey: 'pk_test_key',
        countryCode: 'US',
      });
      setYunoLoaded(true);
    }
  }, []);
  
  // ...
};
```

## Deep Linking / External Browser Return

Handle users returning to your app after external payment flows like 3DS authentication challenges, bank transfer redirects, PIX payments, and alternative payment methods that redirect to external browsers.

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

### 2. Configure Deep Links

**iOS - Info.plist:**

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLName</key>
        <string>com.yourapp</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>myapp</string>
        </array>
    </dict>
</array>
```

**Android - AndroidManifest.xml:**

```xml
<activity android:name=".MainActivity">
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

### 3. Handle Deep Links in React Native

```typescript
import { YunoSdk } from '@yuno-payments/yuno-sdk-react-native';
import { Linking } from 'react-native';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Handle initial URL (app opened from closed state)
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });
    
    // Handle URL changes (app is running)
    const subscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });
    
    return () => {
      subscription.remove();
    };
  }, []);
  
  const handleDeepLink = async (url: string) => {
    console.log('Received deep link:', url);
    
    // Check if it's a payment return URL
    if (url.startsWith('myapp://return')) {
      try {
        await YunoSdk.receiveDeeplink(url);
        console.log('Deep link processed successfully');
      } catch (error) {
        console.error('Error processing deep link:', error);
      }
    }
  };
  
  return (
    // Your app
  );
}
```

### 4. Continue Payment After Return

After handling the deep link, continue the payment flow:

```typescript
const handleDeepLink = async (url: string) => {
  if (url.startsWith('myapp://return')) {
    try {
      // Process the deep link
      await YunoSdk.receiveDeeplink(url);
      
      // Continue payment flow
      await YunoSdk.continuePayment(
        checkoutSessionId,
        'US',
        true // show payment status
      );
    } catch (error) {
      console.error('Error:', error);
    }
  }
};
```

> 💡 Best Practices
>
> - Always include `callback_url` in payment flows that may redirect
> - Test deep link handling on both iOS and Android devices
> - Handle missing or malformed deep link data gracefully
> - Update payment status in your UI after returning from external browser

## Fraud Prevention (ClearSale Integration)

Enable fraud prevention by integrating ClearSale with your React Native app.

### Android Setup

**1. Add ClearSale SDK:**

Add to `android/app/build.gradle`:

```gradle
dependencies {
    implementation 'br.com.clearsale:cs-android-sdk:4.0.0'
}
```

**2. Initialize ClearSale:**

Update `android/app/src/main/java/.../MainApplication.kt`:

```kotlin
import br.com.clearsale.androidsdk.ClearSale

class MainApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        
        // Initialize ClearSale first
        ClearSale.init(this, "your-clearsale-app-key")
        
        // Then initialize React Native
        SoLoader.init(this, false)
    }
}
```

### iOS Setup

**1. Add ClearSale SDK:**

Add to `ios/Podfile`:

```ruby
pod 'ClearSaleSDK'
```

Then run:

```bash
cd ios && pod install
```

**2. Initialize ClearSale:**

Update `ios/YourApp/AppDelegate.mm`:

```swift
#import <ClearSale/ClearSale.h>

- (BOOL)application:(UIApplication *)application 
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Initialize ClearSale
    [ClearSale setupWithApiKey:@"your-clearsale-key"];
    
    // Initialize React Native
    // ...
}
```

### Automatic Integration

Once ClearSale is initialized, Yuno SDK automatically:
- Collects device fingerprint data
- Sends fingerprint with payment requests
- No additional code needed in JavaScript

### Testing

Verify ClearSale integration:

```bash
# Android logs
adb logcat | grep -i clearsale

# iOS logs (in Xcode console)
# Look for ClearSale initialization messages
```

## Platform-Specific Configuration

Handle differences between iOS and Android in your React Native app.

### Conditional Configuration

```typescript
import { Platform } from 'react-native';
import { YunoSdk } from '@yuno-payments/yuno-sdk-react-native';

// Initialize with platform-specific config
await YunoSdk.initialize({
  apiKey: 'your-api-key',
  countryCode: 'US',
  yunoConfig: {
    language: 'en',
    cardFlow: Platform.OS === 'ios' ? CardFlow.ONE_STEP : CardFlow.STEP_BY_STEP,
  },
  ...(Platform.OS === 'ios' && {
    iosConfig: {
      // iOS-specific settings
    },
  }),
  ...(Platform.OS === 'android' && {
    androidConfig: {
      // Android-specific settings
    },
  }),
});
```

### Platform-Specific Features

**Card Scanning (Android Only):**

```typescript
if (Platform.OS === 'android') {
  // Card scanning is available on Android
  // Automatically enabled when camera permission is granted
}
```

**Deep Link Handling:**

```typescript
const handlePaymentReturn = async (url: string) => {
  if (Platform.OS === 'ios') {
    // iOS-specific handling
    await YunoSdk.receiveDeeplink(url);
  } else if (Platform.OS === 'android') {
    // Android-specific handling
    await YunoSdk.receiveDeeplink(url);
  }
};
```

### Minimum Version Requirements

| Platform | Minimum Version |
|----------|----------------|
| iOS      | 14.0+          |
| Android  | API 21 (5.0)+  |
| React Native | 0.70+      |

### Platform-Specific Dependencies

**Native SDK Versions:**

| Platform | Native SDK | Version |
|----------|-----------|---------|
| Android  | `com.yuno.sdk:yuno-sdk-android` | 2.8.1 |
| iOS      | `YunoSDK` | 2.9.0 |

### Testing on Both Platforms

Always test your integration on both iOS and Android:

```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

### Common Platform Differences

| Feature | iOS | Android |
|---------|-----|---------|
| Card Scanning | ❌ Not available | ✅ Available |
| Deep Links | Universal Links | Intent Filters |
| Permissions | Info.plist | AndroidManifest.xml |
| UI Components | Native iOS components | Jetpack Compose |
