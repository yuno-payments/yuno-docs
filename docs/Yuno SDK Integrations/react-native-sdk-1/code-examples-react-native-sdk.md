---
title: Code Examples React Native SDK
deprecated: false
hidden: true
metadata:
  robots: index
---
Ready-to-use React Native code examples for common scenarios.

## Example 1: Basic Payment

```typescript
import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { YunoSdk, YunoPaymentMethods } from '@yuno-payments/yuno-sdk-react-native';

export default function PaymentScreen() {
  const [result, setResult] = useState('');
  const [checkoutSession, setCheckoutSession] = useState<string | null>(null);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(false);
  
  useEffect(() => {
    // Initialize checkout on mount
    initCheckout();
    
    // Subscribe to payment events
    const subscription = YunoSdk.onPaymentStatus((state) => {
      if (state.status === 'SUCCEEDED') {
        setResult('Payment successful!');
      } else if (state.status === 'FAILED') {
        setResult(`Error: Payment failed`);
      }
    });
    
    return () => subscription.remove();
  }, []);
  
  const initCheckout = async () => {
    const session = await fetch('https://api.example.com/checkout', {
      method: 'POST',
      body: JSON.stringify({ amount: { currency: 'USD', value: 2500 } }),
    }).then(r => r.json());
    
    setCheckoutSession(session.checkoutSession);
  };
  
  const processPayment = async () => {
    await YunoSdk.startPayment(true);
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.amount}>$25.00</Text>
      
      {/* Display payment methods */}
      {checkoutSession && (
        <YunoPaymentMethods
          checkoutSession={checkoutSession}
          countryCode="US"
          onPaymentMethodSelected={(selected) => {
            setPaymentMethodSelected(selected);
          }}
        />
      )}
      
      <Button 
        title="Pay Now" 
        onPress={processPayment}
        disabled={!paymentMethodSelected}
      />
      
      {result ? <Text style={styles.result}>{result}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  amount: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  result: { marginTop: 20, textAlign: 'center', fontSize: 16 },
});
```

## Example 2: React Navigation Integration

```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { YunoSdk, YunoPaymentMethods } from '@yuno-payments/yuno-sdk-react-native';
import { useState, useEffect } from 'react';
import { View, Button, Text, Alert, ScrollView } from 'react-native';

const Stack = createStackNavigator();

function CheckoutScreen({ navigation }) {
  const [checkoutSession, setCheckoutSession] = useState<string | null>(null);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(false);
  
  useEffect(() => {
    initCheckout();
    
    const subscription = YunoSdk.onPaymentStatus((state) => {
      if (state.status === 'SUCCEEDED') {
        navigation.navigate('Success');
      } else if (state.status === 'FAILED') {
        Alert.alert('Payment Failed', 'Please try again');
      }
    });
    
    return () => subscription.remove();
  }, []);
  
  const initCheckout = async () => {
    const session = await createCheckoutSession();
    setCheckoutSession(session.checkoutSession);
  };
  
  const handlePayment = async () => {
    await YunoSdk.startPayment(true);
  };
  
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Checkout</Text>
      
      {checkoutSession && (
        <YunoPaymentMethods
          checkoutSession={checkoutSession}
          countryCode="US"
          onPaymentMethodSelected={(selected) => {
            setPaymentMethodSelected(selected);
          }}
        />
      )}
      
      <Button 
        title="Continue to Payment" 
        onPress={handlePayment}
        disabled={!paymentMethodSelected}
      />
    </ScrollView>
      <Button title="Pay" onPress={handlePayment} />
    </View>
  );
}

function SuccessScreen() {
  return (
    <View>
      <Text>Payment Successful!</Text>
    </View>
  );
}

export default function App() {
  useEffect(() => {
    YunoSdk.initialize({
      apiKey: 'pk_test_key',
      countryCode: 'US',
    });
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## Example 3: Subscription Enrollment

```typescript
function EnrollmentScreen() {
  useEffect(() => {
    const enrollmentSubscription = YunoSdk.onEnrollmentStatus((state) => {
      if (state.status === 'SUCCEEDED') {
        Alert.alert('Success', 'Subscription activated!');
      } else if (state.status === 'FAILED') {
        Alert.alert('Error', 'Failed to save card');
      }
    });
    
    return () => enrollmentSubscription.remove();
  }, []);
  
  const enrollCard = async () => {
    const customerSession = await createCustomerSession('cus_123');
    
    await YunoSdk.enrollmentPayment({
      customerSession: customerSession.id,
      countryCode: 'US',
      showPaymentStatus: true,
    });
  };
  
  return <Button title="Save Card" onPress={enrollCard} />;
}
```

## Example 4: One-Click Payment

```typescript
function SavedCardsScreen() {
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    loadSavedCards();
    
    const subscription = YunoSdk.onPaymentStatus((state) => {
      if (state.status === 'SUCCEEDED') {
        Alert.alert('Success', 'Payment completed!');
      }
    });
    
    return () => subscription.remove();
  }, []);
  
  const loadSavedCards = async () => {
    const data = await fetch('/api/customer/cards').then(r => r.json());
    setCards(data);
  };
  
  const payWithCard = async (card) => {
    const session = await createCheckoutSession();
    
    await YunoSdk.startPaymentLite({
      checkoutSession: session.id,
      methodSelected: {
        vaultedToken: card.vaultedToken,
        paymentMethodType: 'CARD',
      },
      showPaymentStatus: true,
    }, 'US');
  };
  
  return (
    <FlatList
      data={cards}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => payWithCard(item)}>
          <Text>{item.brand} ****{item.last4}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
```

## Example 5: Error Handling with Retry

```typescript
function PaymentWithRetry() {
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  
  useEffect(() => {
    const subscription = YunoSdk.onPaymentStatus((state) => {
      if (state.status === 'SUCCEEDED') {
        setRetryCount(0);
        navigation.navigate('Success');
      } else if (state.status === 'FAILED') {
        if (retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => attemptPayment(), 2000);
        } else {
          Alert.alert('Payment Failed', `Failed after ${maxRetries} attempts`);
        }
      }
    });
    
    return () => subscription.remove();
  }, [retryCount]);
  
  const attemptPayment = async () => {
    try {
      const session = await createCheckoutSession();
      await YunoSdk.startPayment(true);
    } catch (error) {
      console.error('Payment error:', error);
    }
  };
  
  return <Button title="Pay" onPress={attemptPayment} />;
}
```

## Example 6: Context API Integration

```typescript
import React, { createContext, useContext, useState } from 'react';

const PaymentContext = createContext(null);

export function PaymentProvider({ children }) {
  const [paymentState, setPaymentState] = useState({
    isProcessing: false,
    error: null,
    success: false,
  });
  
  useEffect(() => {
    const subscription = YunoSdk.onPaymentStatus((state) => {
      if (state.status === 'SUCCEEDED') {
        setPaymentState({ isProcessing: false, error: null, success: true });
      } else if (state.status === 'FAILED') {
        setPaymentState({ isProcessing: false, error: 'Payment failed', success: false });
      }
    });
    
    return () => subscription.remove();
  }, []);
  
  const processPayment = async (sessionId: string) => {
    setPaymentState({ isProcessing: true, error: null, success: false });
    
    try {
      await YunoSdk.startPayment(true);
    } catch (error) {
      setPaymentState({ isProcessing: false, error: error.message, success: false });
    }
  };
  
  return (
    <PaymentContext.Provider value={{ paymentState, processPayment }}>
      {children}
    </PaymentContext.Provider>
  );
}

// Usage
function CheckoutScreen() {
  const { paymentState, processPayment } = useContext(PaymentContext);
  
  return (
    <View>
      <Button
        title="Pay"
        onPress={() => processPayment('session_id')}
        disabled={paymentState.isProcessing}
      />
      {paymentState.error && <Text>{paymentState.error}</Text>}
      {paymentState.success && <Text>Payment successful!</Text>}
    </View>
  );
}
```

## Example 7: Analytics Integration

```typescript
import analytics from '@react-native-firebase/analytics';

function PaymentWithAnalytics() {
  useEffect(() => {
    const subscription = YunoSdk.onPaymentStatus(async (state) => {
      if (state.status === 'SUCCEEDED') {
        await analytics().logEvent('purchase', {
          value: 25.00,
          currency: 'USD',
        });
        navigation.navigate('Success');
      } else if (state.status === 'FAILED') {
        await analytics().logEvent('payment_failed', {
          error_code: 'FAILED',
        });
      }
    });
    
    return () => subscription.remove();
  }, []);
  
  const handlePayment = async () => {
    await analytics().logEvent('checkout_started', {
      value: 25.00,
      currency: 'USD',
    });
    
    const session = await createCheckoutSession();
    await YunoSdk.startPayment(true);
  };
  
  return <Button title="Pay" onPress={handlePayment} />;
}
```

## Example 8: TypeScript ViewModel

```typescript
import { useState, useCallback } from 'react';

interface PaymentState {
  isProcessing: boolean;
  error: string | null;
  success: boolean;
}

export function usePayment() {
  const [state, setState] = useState<PaymentState>({
    isProcessing: false,
    error: null,
    success: false,
  });
  
  useEffect(() => {
    const subscription = YunoSdk.onPaymentStatus((paymentState) => {
      if (paymentState.status === 'SUCCEEDED') {
        setState({ isProcessing: false, error: null, success: true });
      } else if (paymentState.status === 'FAILED') {
        setState({ isProcessing: false, error: 'Payment failed', success: false });
      }
    });
    
    return () => subscription.remove();
  }, []);
  
  const processPayment = useCallback(async (amount: number) => {
    setState({ isProcessing: true, error: null, success: false });
    
    try {
      const session = await createCheckoutSession(amount);
      await YunoSdk.startPayment(true);
    } catch (error) {
      setState({ isProcessing: false, error: error.message, success: false });
    }
  }, []);
  
  return { ...state, processPayment };
}

// Usage
function PaymentScreen() {
  const { isProcessing, error, success, processPayment } = usePayment();
  
  return (
    <View>
      <Button
        title="Pay $25"
        onPress={() => processPayment(2500)}
        disabled={isProcessing}
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {success && <Text>Payment successful!</Text>}
    </View>
  );
}
```

## API Helper

```typescript
const API_BASE = 'https://api.example.com';

export const YunoAPI = {
  async createCheckoutSession(amount: number, currency: string = 'USD') {
    const response = await fetch(`${API_BASE}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: { currency, value: amount },
        customer_id: 'cus_123',
        country: 'US',
      }),
    });
    return response.json();
  },
  
  async createCustomerSession(customerId: string) {
    const response = await fetch(`${API_BASE}/customer/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer_id: customerId }),
    });
    return response.json();
  },
};
```

