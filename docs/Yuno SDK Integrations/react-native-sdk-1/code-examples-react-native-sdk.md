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
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Yuno } from '@yuno-payments/react-native-sdk';

export default function PaymentScreen() {
  const [result, setResult] = useState('');
  
  const processPayment = async () => {
    const session = await fetch('https://api.example.com/checkout', {
      method: 'POST',
      body: JSON.stringify({ amount: { currency: 'USD', value: 2500 } }),
    }).then(r => r.json());
    
    await Yuno.startCheckout({
      checkoutSession: session.id,
      countryCode: 'US',
      onPaymentSuccess: (data) => {
        setResult('Payment successful!');
      },
      onPaymentError: (error) => {
        setResult(`Error: ${error.message}`);
      },
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.amount}>$25.00</Text>
      <Button title="Pay Now" onPress={processPayment} />
      {result ? <Text>{result}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  amount: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
});
```

## Example 2: React Navigation Integration

```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Yuno } from '@yuno-payments/react-native-sdk';

const Stack = createStackNavigator();

function CheckoutScreen({ navigation }) {
  const handlePayment = async () => {
    const session = await createCheckoutSession();
    
    await Yuno.startCheckout({
      checkoutSession: session.id,
      countryCode: 'US',
      onPaymentSuccess: (data) => {
        navigation.navigate('Success', { paymentId: data.paymentId });
      },
      onPaymentError: (error) => {
        Alert.alert('Payment Failed', error.message);
      },
    });
  };
  
  return (
    <View>
      <Button title="Pay" onPress={handlePayment} />
    </View>
  );
}

function SuccessScreen({ route }) {
  const { paymentId } = route.params;
  return (
    <View>
      <Text>Payment Successful!</Text>
      <Text>ID: {paymentId}</Text>
    </View>
  );
}

export default function App() {
  useEffect(() => {
    Yuno.initialize({ publicKey: 'pk_test_key' });
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
  const enrollCard = async () => {
    const customerSession = await createCustomerSession('cus_123');
    
    await Yuno.startEnrollment({
      customerSession: customerSession.id,
      countryCode: 'US',
      onEnrollmentSuccess: (vaultedToken) => {
        saveToken(vaultedToken);
        setupSubscription(vaultedToken);
        Alert.alert('Success', 'Subscription activated!');
      },
      onEnrollmentError: (error) => {
        Alert.alert('Error', error.message);
      },
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
  }, []);
  
  const loadSavedCards = async () => {
    const data = await fetch('/api/customer/cards').then(r => r.json());
    setCards(data);
  };
  
  const payWithCard = async (card) => {
    const session = await createCheckoutSession();
    
    await Yuno.startCheckout({
      checkoutSession: session.id,
      countryCode: 'US',
      vaultedToken: card.vaultedToken,
      onPaymentSuccess: () => {
        Alert.alert('Success', 'Payment completed!');
      },
    });
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
  
  const attemptPayment = async () => {
    try {
      const session = await createCheckoutSession();
      
      await Yuno.startCheckout({
        checkoutSession: session.id,
        countryCode: 'US',
        onPaymentSuccess: () => {
          setRetryCount(0);
          navigation.navigate('Success');
        },
        onPaymentError: (error) => {
          if (retryCount < maxRetries) {
            setRetryCount(retryCount + 1);
            setTimeout(() => attemptPayment(), 2000);
          } else {
            Alert.alert('Payment Failed', `Failed after ${maxRetries} attempts`);
          }
        },
      });
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
  
  const processPayment = async (sessionId: string) => {
    setPaymentState({ isProcessing: true, error: null, success: false });
    
    try {
      await Yuno.startCheckout({
        checkoutSession: sessionId,
        countryCode: 'US',
        onPaymentSuccess: () => {
          setPaymentState({ isProcessing: false, error: null, success: true });
        },
        onPaymentError: (error) => {
          setPaymentState({ isProcessing: false, error: error.message, success: false });
        },
      });
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
  const handlePayment = async () => {
    await analytics().logEvent('checkout_started', {
      value: 25.00,
      currency: 'USD',
    });
    
    const session = await createCheckoutSession();
    
    await Yuno.startCheckout({
      checkoutSession: session.id,
      countryCode: 'US',
      onPaymentSuccess: async (data) => {
        await analytics().logEvent('purchase', {
          transaction_id: data.paymentId,
          value: 25.00,
          currency: 'USD',
        });
        navigation.navigate('Success');
      },
      onPaymentError: async (error) => {
        await analytics().logEvent('payment_failed', {
          error_code: error.code,
        });
      },
    });
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
  
  const processPayment = useCallback(async (amount: number) => {
    setState({ isProcessing: true, error: null, success: false });
    
    try {
      const session = await createCheckoutSession(amount);
      
      await Yuno.startCheckout({
        checkoutSession: session.id,
        countryCode: 'US',
        onPaymentSuccess: () => {
          setState({ isProcessing: false, error: null, success: true });
        },
        onPaymentError: (error) => {
          setState({ isProcessing: false, error: error.message, success: false });
        },
      });
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

