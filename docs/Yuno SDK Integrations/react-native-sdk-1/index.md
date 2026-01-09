---
title: React Native SDK
deprecated: false
hidden: true
metadata:
  robots: index
---
## Install

```bash
npm install @yuno-payments/yuno-sdk-react-native
```

**iOS setup:**

```bash
cd ios && pod install
```

**Android setup:**

No additional steps required.

> 📘 Requirements: React Native 0.70+, Node.js 16+, Android Min SDK 21, iOS 14.0+

> 📘 TypeScript Support
>
> SDK includes TypeScript definitions out of the box

## Initialize

**App.tsx:**

```typescript
import { YunoSdk } from '@yuno-payments/yuno-sdk-react-native';

export default function App() {
  useEffect(() => {
    YunoSdk.initialize({
      apiKey: 'your-public-api-key',
      countryCode: 'US',
    });
  }, []);
  
  return <NavigationContainer>{/* your app */}</NavigationContainer>;
}
```

## Basic Payment Flow

```typescript
import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { YunoSdk } from '@yuno-payments/yuno-sdk-react-native';

export default function PaymentScreen() {
  const [checkoutSession, setCheckoutSession] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    initializeCheckout();
    
    // Subscribe to payment events
    const paymentSubscription = YunoSdk.onPaymentStatus((state) => {
      switch (state.status) {
        case 'SUCCEEDED':
          navigateToSuccess();
          break;
        case 'FAILED':
          showError(state.error?.message);
          break;
        case 'PROCESSING':
          console.log('Payment is being processed');
          break;
        default:
          break;
      }
    });
    
    const tokenSubscription = YunoSdk.onOneTimeToken((token) => {
      console.log('OTT received:', token);
      // Send to backend for payment processing
    });
    
    return () => {
      paymentSubscription.remove();
      tokenSubscription.remove();
    };
  }, []);
  
  const initializeCheckout = async () => {
    try {
      // Create checkout session on backend
      const session = await createCheckoutSession();
      setCheckoutSession(session.checkoutSession);
      setIsReady(true);
    } catch (error) {
      console.error('Checkout initialization failed:', error);
    }
  };
  
  const handlePayment = async () => {
    try {
      // 3. Start payment flow
      await YunoSdk.startPayment(true); // true = show payment status screen
    } catch (error) {
      console.error('Payment start failed:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.amount}>$25.00</Text>
      
      <Button
        title="Pay Now"
        onPress={handlePayment}
        disabled={!isReady}
      />
    </View>
  );
}

async function createCheckoutSession() {
  const response = await fetch('https://api.example.com/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: { currency: 'USD', value: 2500 },
      customer_id: 'cus_123',
      country: 'US',
    }),
  });
  return response.json();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});
```

## Complete TypeScript Example

```typescript
import React, { useState, useEffect } from 'react';
import { View, Button, Text, ActivityIndicator, Alert } from 'react-native';
import { YunoSdk, YunoPaymentResult, YunoError } from '@yuno-payments/yuno-sdk-react-native';

interface CheckoutSession {
  checkoutSession: string;
  id: string;
}

export default function CheckoutScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutSession, setCheckoutSession] = useState<string | null>(null);
  
  useEffect(() => {
    loadCheckout();
    
    // Subscribe to payment status
    const paymentSubscription = YunoSdk.onPaymentStatus((state) => {
      setIsProcessing(false);
      
      switch (state.status) {
        case 'SUCCEEDED':
          Alert.alert('Success', 'Payment completed successfully!');
          // Navigate to success screen
          break;
        case 'FAILED':
          Alert.alert('Failed', state.error?.message || 'Payment failed');
          break;
        case 'PROCESSING':
          Alert.alert('Processing', 'Your payment is being processed');
          break;
        default:
          break;
      }
    });
    
    return () => {
      paymentSubscription.remove();
    };
  }, []);
  
  const loadCheckout = async () => {
    try {
      const session = await createCheckoutSession();
      setCheckoutSession(session.checkoutSession);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to load checkout');
      setIsLoading(false);
    }
  };
  
  const processPayment = async () => {
    setIsProcessing(true);
    
    try {
      await YunoSdk.startPayment(true); // Show status screen
    } catch (error) {
      setIsProcessing(false);
      Alert.alert('Error', 'Failed to start payment');
    }
  };
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 16 }}>Loading checkout...</Text>
      </View>
    );
  }
  
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Total: $25.00
      </Text>
      
      <Button
        title={isProcessing ? 'Processing...' : 'Pay Now'}
        onPress={processPayment}
        disabled={isProcessing}
      />
    </View>
  );
}

async function createCheckoutSession(): Promise<CheckoutSession> {
  const response = await fetch('https://api.example.com/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: { currency: 'USD', value: 2500 },
      customer_id: 'cus_123',
      country: 'US',
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }
  
  return response.json();
}
```

## Handling Payment Results

```typescript
const paymentSubscription = YunoSdk.onPaymentStatus((state) => {
  switch (state.status) {
    case 'SUCCEEDED':
      navigation.navigate('Success');
      break;
    case 'FAILED':
      Alert.alert('Payment Failed', state.error?.message);
      break;
    case 'PROCESSING':
      Alert.alert('Processing', 'Your payment is being processed');
      break;
    case 'REJECTED':
      Alert.alert('Rejected', 'Payment was rejected');
      break;
    default:
      break;
  }
});

// Remember to remove listener when done
// paymentSubscription.remove();
```

## 3DS Authentication

3DS is handled automatically by the SDK. The SDK will present the 3DS challenge when needed.

## Configuration Options

### Essential Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `checkoutSession` | string | Session ID from backend |
| `countryCode` | string | ISO country code (e.g., 'US') |
| `showPaymentStatus` | boolean | Show payment result screen |

### Event Listeners

```typescript
// Payment status
const paymentSubscription = YunoSdk.onPaymentStatus((state) => {
  console.log('Payment status:', state.status);
  console.log('Token:', state.token);
});

// One-time token
const tokenSubscription = YunoSdk.onOneTimeToken((token) => {
  console.log('Token:', token);
  // Send to backend
});

// Enrollment status
const enrollmentSubscription = YunoSdk.onEnrollmentStatus((state) => {
  console.log('Enrollment status:', state.status);
});

// Remove listeners individually (in cleanup)
paymentSubscription.remove();
tokenSubscription.remove();
enrollmentSubscription.remove();
```

## Next Steps

Ready to explore more advanced features? Check out the [Advanced Features](./advanced-features-react-native-sdk.md) guide for:

- **Alternative Mounting Options** - `startPaymentLite()` and `startPaymentSeamlessLite()` for custom payment method selection
- **Enrollment (Save Cards)** - Save payment methods for future use
- **Vaulted Token Payments** - One-click payments with saved cards
- **Custom UI (Headless Integration)** - Build completely custom payment forms
- **Platform-Specific Configuration** - Handle iOS vs Android differences
- **Styling** - Customize SDK appearance

See also:
- [Code Examples](./code-examples-react-native-sdk.md) - Copy-paste examples for common scenarios
