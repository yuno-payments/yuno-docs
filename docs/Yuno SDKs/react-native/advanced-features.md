---
title: React Native SDK - Advanced Features
deprecated: false
hidden: true
metadata:
  robots: index
---
Advanced configuration and custom integrations for React Native.

## Custom UI (Headless Integration) {#custom-ui}

Build completely custom payment forms with full UI control when you need complete control over every UI element, highly custom checkout experiences, or have development resources for custom UI.

```typescript
import { Yuno, YunoAPIClient } from '@yuno-payments/react-native-sdk';

const CustomPaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  
  const processPayment = async () => {
    try {
      // 1. Initialize headless client
      const apiClient = Yuno.apiClientPayment({
        countryCode: 'US',
        checkoutSession: 'session_id',
      });
      
      // 2. Generate token with custom form data
      const result = await apiClient.generateToken({
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
      });
      
      // 3. Create payment with token
      await createPayment(result.token);
      
      // 4. Continue if needed (3DS, etc.)
      await apiClient.continuePayment();
      
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

## Styling {#styling}

Customize SDK appearance.

```typescript
Yuno.setTheme({
  primaryColor: '#007bff',
  backgroundColor: '#ffffff',
  textColor: '#333333',
  errorColor: '#dc3545',
  fontFamily: 'System',
  borderRadius: 8,
});
```

## Platform-Specific Configuration {#platform-specific}

Handle platform differences.

```typescript
import { Platform } from 'react-native';

const config = {
  checkoutSession: session.id,
  countryCode: 'US',
  ...(Platform.OS === 'ios' && {
    // iOS-specific config
    showPaymentStatus: true,
  }),
  ...(Platform.OS === 'android' && {
    // Android-specific config
    cardScanEnabled: true,
  }),
};

await Yuno.startCheckout(config);
```

## Error Handling

```typescript
const handlePayment = async () => {
  try {
    await Yuno.startCheckout({
      checkoutSession: session.id,
      countryCode: 'US',
      onPaymentError: (error) => {
        switch (error.code) {
          case 'SESSION_EXPIRED':
            recreateSession();
            break;
          case 'INVALID_CARD':
            Alert.alert('Error', 'Invalid card details');
            break;
          case 'INSUFFICIENT_FUNDS':
            Alert.alert('Error', 'Insufficient funds');
            break;
          case 'NETWORK_ERROR':
            Alert.alert('Error', 'Connection error. Please try again.');
            break;
          default:
            Alert.alert('Error', error.message);
        }
      },
    });
  } catch (error) {
    console.error('Checkout error:', error);
  }
};
```

## Testing & Debug

```typescript
// Enable debug logs
Yuno.setLogLevel('verbose');

// Use test mode
Yuno.initialize({
  publicKey: 'pk_test_your_key',
  testMode: true,
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
      Yuno.initialize({ publicKey: 'pk_test_key' });
      setYunoLoaded(true);
    }
  }, []);
  
  // ...
};
```

