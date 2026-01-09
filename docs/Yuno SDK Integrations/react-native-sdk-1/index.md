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

> 📘 Requirements: React Native 0.70+, Node.js 16+, Android Min SDK 21, iOS 13.0+

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
    setupListeners();
    
    return () => {
      YunoSdk.removeListeners();
    };
  }, []);
  
  const initializeCheckout = async () => {
    try {
      // 1. Create checkout session on backend
      const session = await createCheckoutSession();
      setCheckoutSession(session.checkoutSession);
      
      // 2. Show payment checkout
      await YunoSdk.showPaymentCheckout({
        checkoutSession: session.checkoutSession,
        countryCode: 'US',
      });
      
      setIsReady(true);
    } catch (error) {
      console.error('Checkout initialization failed:', error);
    }
  };
  
  const setupListeners = () => {
    YunoSdk.yunoPaymentResult((event) => {
      switch (event.status) {
        case 'SUCCEEDED':
          navigateToSuccess();
          break;
        case 'FAILED':
          showError(event.error?.message);
          break;
        case 'PROCESSING':
          console.log('Payment is being processed');
          break;
        default:
          break;
      }
    });
    
    YunoSdk.yunoError((error) => {
      console.error('Payment error:', error);
    });
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
    
    // Set up event listeners
    YunoSdk.yunoPaymentResult(handlePaymentResult);
    YunoSdk.yunoError(handleError);
    
    return () => {
      YunoSdk.removeListeners();
    };
  }, []);
  
  const loadCheckout = async () => {
    try {
      const session = await createCheckoutSession();
      setCheckoutSession(session.checkoutSession);
      
      await YunoSdk.showPaymentCheckout({
        checkoutSession: session.checkoutSession,
        countryCode: 'US',
      });
      
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to load checkout');
      setIsLoading(false);
    }
  };
  
  const handlePaymentResult = (result: YunoPaymentResult) => {
    setIsProcessing(false);
    
    switch (result.status) {
      case 'SUCCEEDED':
        Alert.alert('Success', 'Payment completed successfully!');
        // Navigate to success screen
        break;
      case 'FAILED':
        Alert.alert('Failed', result.error?.message || 'Payment failed');
        break;
      case 'PROCESSING':
        Alert.alert('Processing', 'Your payment is being processed');
        break;
      default:
        break;
    }
  };
  
  const handleError = (error: YunoError) => {
    setIsProcessing(false);
    Alert.alert('Error', error.message);
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

## Alternative Mounting Options

The basic flow above uses automatic payment method display. For more control:

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
YunoSdk.yunoEnrollmentStatus((result) => {
  if (result.status === 'SUCCEEDED') {
    console.log('Card saved:', result.vaultedToken);
  }
});

// Show enrollment
await YunoSdk.showEnrollmentLite({
  customerSession: customerSession.id,
  countryCode: 'US',
});

// Start enrollment flow
await YunoSdk.startEnrollment(true); // true = show status screen
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

## Handling Payment Results

```typescript
YunoSdk.yunoPaymentResult((result) => {
  switch (result.status) {
    case 'SUCCEEDED':
      navigation.navigate('Success');
      break;
    case 'FAILED':
      Alert.alert('Payment Failed', result.error?.message);
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

YunoSdk.yunoError((error) => {
  console.error('Payment error:', error);
  Alert.alert('Error', error.message);
});
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
// Payment result
YunoSdk.yunoPaymentResult((result) => {
  console.log('Payment result:', result.status);
});

// Errors
YunoSdk.yunoError((error) => {
  console.error('Error:', error.message);
});

// Enrollment result
YunoSdk.yunoEnrollmentStatus((result) => {
  console.log('Enrollment result:', result.status);
});

// Remove all listeners (in cleanup)
YunoSdk.removeListeners();
```
