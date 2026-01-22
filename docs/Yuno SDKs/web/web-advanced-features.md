---
title: Web SDK - Advanced Features
deprecated: false
hidden: false
metadata:
  robots: index
---
Advanced configuration options and custom integrations for the Yuno Web SDK.

## Custom UI (Headless Integration)

Build completely custom payment forms with full UI control when you need complete control over every UI element, building highly custom checkout experiences, or have development resources for custom UI. Yuno handles only tokenization.

### Implementation

**1. Initialize Headless Client**

```javascript
const yuno = await Yuno.initialize('your-public-key');

const apiClientPayment = yuno.apiClientPayment({
  country_code: "US",
  checkout_session: "checkout_session_id"
});
```

**2. Build Your Custom Form**

```html
<form id="custom-payment-form">
  <input id="card-number" placeholder="Card Number" />
  <input id="expiry" placeholder="MM/YY" />
  <input id="cvv" placeholder="CVV" />
  <input id="cardholder" placeholder="Cardholder Name" />
  <button type="submit">Pay</button>
</form>
```

**3. Generate Token**

```javascript
document.getElementById('custom-payment-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  try {
    const result = await apiClientPayment.generateToken({
      checkout_session: "checkout_session_id",
      payment_method: {
        type: "CARD",
        vaulted_token: null,
        card: {
          save: false,
          detail: {
            number: document.getElementById('card-number').value,
            expiration_month: 12,
            expiration_year: 25,
            security_code: document.getElementById('cvv').value,
            holder_name: document.getElementById('cardholder').value,
            type: "CREDIT"
          }
        }
      }
    });
    
    // Create payment with token
    await createPayment(result.token);
  } catch (error) {
    console.error('Token generation failed:', error);
  }
});
```

**4. Handle 3DS & Redirects**

```javascript
const continueResult = await yuno.continuePayment({ showPaymentStatus: false });

if (continueResult?.action === 'REDIRECT_URL') {
  window.location.href = continueResult.redirect.init_url;
}
```

### With Vaulted Token

```javascript
const result = await apiClientPayment.generateToken({
  checkout_session: "checkout_session_id",
  payment_method: {
    type: "CARD",
    vaulted_token: "saved_token_id",
    card: {
      detail: {
        security_code: "123"
      }
    }
  }
});
```

## Secure Fields (Custom Card Forms)

Build custom card forms while maintaining PCI compliance using secure iframe fields. Ideal when you want custom card form design, need specific field layouts, or require iframe-based security for cards.

### Implementation

**1. Install & Initialize**

```javascript
const yuno = await Yuno.initialize('your-public-key');
```

**2. Create Secure Fields**

```html
<div id="card-number-field"></div>
<div id="cvv-field"></div>
<div id="expiry-field"></div>
```

```javascript
yuno.secureFields({
  checkoutSession: 'session_id',
  countryCode: 'US',
  fields: {
    cardNumber: {
      elementSelector: '#card-number-field',
      placeholder: '1234 5678 9012 3456'
    },
    cvv: {
      elementSelector: '#cvv-field',
      placeholder: 'CVV'
    },
    expiry: {
      elementSelector: '#expiry-field',
      placeholder: 'MM/YY'
    }
  },
  onFieldChange: (field, isValid) => {
    console.log(`${field} valid:`, isValid);
  },
  async onSubmit(token) {
    await createPayment(token);
  }
});
```

**3. Custom Styling**

```javascript
fields: {
  cardNumber: {
    elementSelector: '#card-number-field',
    style: {
      base: {
        color: '#333',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif'
      },
      invalid: {
        color: '#ff0000'
      }
    }
  }
}
```

## Multiple Currencies

Handle multi-currency payments with automatic conversion.

```javascript
// Create session with alternative amount
const session = await fetch('/api/checkout/session', {
  method: 'POST',
  body: JSON.stringify({
    amount: { currency: 'USD', value: 1000 },
    alternative_amount: { currency: 'BRL', value: 5000 }, // Display price
    country: 'BR'
  })
}).then(r => r.json());

// SDK automatically displays both currencies
yuno.startCheckout({
  checkoutSession: session.id,
  countryCode: 'BR',
  // ...
});
```

## Styling & Themes

### Custom CSS

```javascript
yuno.startCheckout({
  // ... other config
  cssCustomization: {
    primaryColor: '#007bff',
    errorColor: '#dc3545',
    fontFamily: 'Inter, sans-serif'
  }
});
```

### Custom Button Text

```javascript
yuno.startCheckout({
  // ... other config
  texts: {
    pay: 'Complete Purchase',
    processing: 'Processing...',
    error: 'Payment Failed'
  }
});
```

## Render Modes

### Modal Display

```javascript
yuno.startCheckout({
  renderMode: 'modal',
  elementSelector: '#payment-container'
});
```

### Inline Display

```javascript
yuno.startCheckout({
  renderMode: 'element',
  elementSelector: '#payment-container'
});
```

## Fraud Prevention

### Device Fingerprinting

Automatically collected by SDK for configured fraud providers (ClearSale, etc.).

### Custom Fraud Data

```javascript
yuno.startCheckout({
  // ... other config
  async yunoCreatePayment(token, tokenWithInformation) {
    // tokenWithInformation includes fraud data
    await fetch('/api/payment/create', {
      method: 'POST',
      body: JSON.stringify({
        token,
        device_fingerprint: tokenWithInformation.device_fingerprint,
        customer_browser_info: tokenWithInformation.customer.browser_info
      })
    });
  }
});
```

## Installments

### Enable Installments

```javascript
yuno.startCheckout({
  // ... other config
  card: {
    installments: {
      enabled: true,
      defaultValue: 1
    }
  }
});
```

### Custom Installment Plans

Configured in Yuno dashboard per payment method.

## Loader Control

### Hide Yuno Loader

```javascript
yuno.startCheckout({
  showLoading: false, // Use your own loader
  onLoading: (isLoading) => {
    document.getElementById('custom-loader').style.display = 
      isLoading ? 'block' : 'none';
  }
});
```

### Custom Loader

```javascript
yuno.startCheckout({
  // ... other config
  onLoading: (isLoading) => {
    if (isLoading) {
      showCustomSpinner();
    } else {
      hideCustomSpinner();
    }
  }
});
```

## Card Form Types

### Extended Form (Separate Fields)

```javascript
yuno.startCheckout({
  card: {
    type: 'extends' // Shows separate fields for all card details
  }
});
```

### Compact Form (Single Field)

```javascript
yuno.startCheckout({
  card: {
    type: 'only' // Shows single combined field
  }
});
```

## Issuer Selection

### Enable/Disable Issuer Form

```javascript
yuno.startCheckout({
  issuersFormEnable: true // Show issuer selection for bank transfers
});
```

## Payment Status Page

### Custom Status Handling

```javascript
yuno.startCheckout({
  showPaymentStatus: false, // Handle status yourself
  yunoPaymentResult: (data) => {
    // Redirect to custom status page
    window.location.href = `/payment-status?id=${data.payment_id}&status=${data.status}`;
  }
});
```

## Event Callbacks

### All Available Callbacks

```javascript
yuno.startCheckout({
  // ... other config
  
  // Payment method selected
  yunoPaymentMethodSelected: (data) => {
    console.log('Selected:', data.type);
    analytics.track('payment_method_selected', { type: data.type });
  },
  
  // Payment created (before processing)
  async yunoCreatePayment(token, tokenInfo) {
    console.log('Creating payment with token:', token);
    await processPayment(token);
    yuno.continuePayment();
  },
  
  // Payment completed
  yunoPaymentResult: (data) => {
    console.log('Payment result:', data.status);
    if (data.status === 'SUCCEEDED') {
      gtag('event', 'purchase', { value: data.amount });
    }
  },
  
  // Error occurred
  yunoError: (error, data) => {
    console.error('Error:', error, data);
    Sentry.captureException(error);
  },
  
  // Loading state changed
  onLoading: (isLoading) => {
    console.log('Loading:', isLoading);
  },
  
  // Card form changed
  card: {
    onChange: ({ error, data }) => {
      if (error) {
        console.log('Card validation error:', error);
      } else {
        console.log('Card data:', data);
      }
    }
  }
});
```

## Browser Compatibility

SDK supports:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Polyfills for Older Browsers

```html
<script src="https://polyfill.io/v3/polyfill.min.js"></script>
<script src="https://sdk-web.y.uno/v1.5/main.js"></script>
```

## Performance Optimization

### Lazy Load SDK

```javascript
// Load SDK only when needed
async function loadYunoSDK() {
  if (typeof Yuno !== 'undefined') return;
  
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://sdk-web.y.uno/v1.5/main.js';
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

// Use when payment page loads
document.getElementById('checkout-btn').addEventListener('click', async () => {
  await loadYunoSDK();
  initPayment();
});
```

### Preconnect to Yuno Servers

```html
<link rel="preconnect" href="https://api.y.uno">
<link rel="preconnect" href="https://sdk-web.y.uno">
```

## Testing in Sandbox

### Test Mode Configuration

```javascript
// Use test keys (pk_test_*)
const yuno = await Yuno.initialize('pk_test_your_key_here');
```

### Simulate Payment Scenarios

```javascript
// Backend: Create session with test data
{
  amount: { currency: 'USD', value: 1000 },
  metadata: {
    test_scenario: 'success' // 'success', 'decline', '3ds_required'
  }
}
```

## Error Handling

### Common Error Codes

```javascript
yunoError: (error, data) => {
  switch(error.code) {
    case 'SESSION_EXPIRED':
      // Recreate session
      refreshSession();
      break;
    case 'INVALID_CARD':
      showError('Please check your card details');
      break;
    case 'INSUFFICIENT_FUNDS':
      showError('Insufficient funds');
      break;
    case 'NETWORK_ERROR':
      showError('Connection error. Please try again.');
      break;
    default:
      showError('An error occurred. Please try again.');
  }
}
```

## Webhooks Integration

Verify payment status on backend via webhooks:

```javascript
// Backend webhook handler
app.post('/webhooks/yuno', (req, res) => {
  const event = req.body;
  
  switch(event.type) {
    case 'payment.succeeded':
      fulfillOrder(event.data.payment_id);
      break;
    case 'payment.failed':
      cancelOrder(event.data.payment_id);
      break;
  }
  
  res.sendStatus(200);
});
```

## Environment Configuration

### Development

```javascript
const yuno = await Yuno.initialize('pk_test_dev_key', {
  environment: 'sandbox',
  debug: true // Enable console logs
});
```

### Production

```javascript
const yuno = await Yuno.initialize('pk_live_prod_key', {
  environment: 'production',
  debug: false
});
```

