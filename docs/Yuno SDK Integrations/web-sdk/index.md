---
title: Web SDK
deprecated: false
hidden: true
metadata:
  robots: index
---
## Install

**Option 1: NPM**

```bash
npm install @yuno-payments/sdk-web
```

```javascript
import { Yuno } from '@yuno-payments/sdk-web';
```

**Option 2: CDN**

```html
<script src="https://sdk-web.y.uno/v1.5/main.js"></script>
```

**Option 3: Dynamic Load**

```javascript
const script = document.createElement('script');
script.src = 'https://sdk-web.y.uno/v1.5/main.js';
document.head.appendChild(script);
```

> 📘 TypeScript Support
>
> Install types: `npm install @yuno-payments/sdk-web-types`

## Basic Payment Flow

### 1. Initialize SDK

```javascript
const yuno = await Yuno.initialize('your-public-api-key');
```

### 2. Create Checkout Session (Backend)

```javascript
// Your backend endpoint
const session = await fetch('/api/checkout/session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customer_id: 'cus_123',
    amount: { currency: 'USD', value: 2500 },
    country: 'US'
  })
}).then(r => r.json());
```

### 3. Configure Checkout

```javascript
yuno.startCheckout({
  checkoutSession: session.checkout_session,
  elementSelector: '#payment-container',
  countryCode: 'US',
  language: 'en-US',
  async yunoCreatePayment(oneTimeToken) {
    const result = await fetch('/api/payment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        one_time_token: oneTimeToken,
        checkout_session: session.checkout_session
      })
    }).then(r => r.json());
    
    yuno.continuePayment({ showPaymentStatus: true });
  },
  yunoPaymentResult: (data) => {
    console.log('Payment completed:', data.status);
  }
});
```

### 4. Mount Payment Form

```javascript
yuno.mountCheckout();
```

### 5. Start Payment Flow

Add a payment button and trigger the payment flow:

```javascript
const payButton = document.querySelector('#pay-button');

payButton.addEventListener('click', () => {
  yuno.startPayment();
});
```

### 6. Add HTML

```html
<div id="payment-container"></div>
<button id="pay-button">Pay Now</button>
```

## Complete Working Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>Yuno Payment</title>
  <script src="https://sdk-web.y.uno/v1.5/main.js"></script>
</head>
<body>
  <div id="payment-container"></div>
  <button id="pay-button">Pay Now</button>
  
  <script>
    async function initPayment() {
      // Initialize
      const yuno = await Yuno.initialize('pk_test_123');
      
      // Create session
      const session = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: 'cus_123',
          amount: { currency: 'USD', value: 2500 },
          country: 'US'
        })
      }).then(r => r.json());
      
      // Configure checkout
      yuno.startCheckout({
        checkoutSession: session.checkout_session,
        elementSelector: '#payment-container',
        countryCode: 'US',
        async yunoCreatePayment(token) {
          await fetch('/api/payment/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              one_time_token: token, 
              checkout_session: session.checkout_session 
            })
          });
          yuno.continuePayment();
        },
        yunoPaymentResult: (data) => {
          if (data.status === 'SUCCEEDED') {
            window.location.href = '/success';
          }
        }
      });
      
      // Mount form
      yuno.mountCheckout();
      
      // Start payment on button click
      document.querySelector('#pay-button').addEventListener('click', () => {
        yuno.startPayment();
      });
    }
    
    initPayment();
  </script>
</body>
</html>
```

## Alternative Mounting Options

The basic flow above uses `mountCheckout()` which automatically displays all payment methods. For more control:

### Custom Payment Method Selection (`mountCheckoutLite()`)

Control which payment methods to display:

```javascript
// 1. Fetch available methods from API
const methods = await fetch(
  `https://api.y.uno/v1/checkout/sessions/${sessionId}/payment-methods`,
  { headers: { 'X-Yuno-Api-Key': 'your-public-key' }}
).then(r => r.json());

// 2. Display methods in your UI
// 3. Mount selected method
yuno.mountCheckoutLite({
  paymentMethodType: selectedMethod // 'CARD', 'PIX', 'PAYPAL', etc.
});

// 4. Still need startPayment()
document.querySelector('#pay-button').addEventListener('click', () => {
  yuno.startPayment();
});
```

**Google Pay & Apple Pay with Lite:**

```javascript
await yuno.mountExternalButtons([
  {
    paymentMethodType: 'GOOGLE_PAY',
    elementSelector: '#google-pay-button'
  },
  {
    paymentMethodType: 'APPLE_PAY',
    elementSelector: '#apple-pay-button'
  }
]);
```

### Simplified Flow (`mountSeamlessCheckout()`)

Similar to `mountCheckoutLite()` but with automatic payment creation:

```javascript
// Use startSeamlessCheckout instead of startCheckout
yuno.startSeamlessCheckout({
  // Same configuration
});

// Mount
yuno.mountSeamlessCheckout({
  paymentMethodType: 'CARD'
});

// Still need startPayment()
document.querySelector('#pay-button').addEventListener('click', () => {
  yuno.startPayment();
});
```

## Enrollment (Save Cards)

### Save During Payment

```javascript
yuno.startCheckout({
  checkoutSession: session.id,
  elementSelector: '#payment-container',
  countryCode: 'US',
  card: {
    cardSaveEnable: true // Shows "Save card" checkbox
  },
  async yunoCreatePayment(token) {
    await fetch('/api/payment/create', {
      method: 'POST',
      body: JSON.stringify({
        token,
        vault_on_success: true // Save card after successful payment
      })
    });
    yuno.continuePayment();
  }
});
```

### Separate Enrollment

```javascript
// Create customer session on backend
const customerSession = await fetch('/api/customer/session', {
  method: 'POST',
  body: JSON.stringify({ customer_id: 'cus_123' })
}).then(r => r.json());

// Initialize enrollment
yuno.startEnrollment({
  customerSession: customerSession.id,
  countryCode: 'US',
  async yunoEnrolled(vaultedToken) {
    console.log('Card saved:', vaultedToken);
  }
});

// Mount enrollment form
yuno.mountEnrollment();
```

## Vaulted Token Payments

```javascript
// Use saved card
yuno.mountCheckout({
  vaultedToken: 'vtok_saved_card_123'
});

// Still need startPayment()
document.querySelector('#pay-button').addEventListener('click', () => {
  yuno.startPayment();
});
```

## Handling Payment Results

```javascript
yuno.startCheckout({
  // ... other config
  yunoPaymentResult: (data) => {
    switch(data.status) {
      case 'SUCCEEDED':
        window.location.href = '/success';
        break;
      case 'FAILED':
        alert('Payment failed: ' + data.error?.message);
        break;
      case 'PENDING':
        console.log('Payment is being processed');
        break;
      case 'REJECTED':
        alert('Payment was rejected');
        break;
    }
  },
  yunoError: (error) => {
    console.error('Error:', error);
  }
});
```

## 3DS Authentication

3DS is handled automatically by the SDK. For asynchronous payment methods:

```javascript
async yunoCreatePayment(token) {
  await createPaymentOnBackend(token);
  
  // Handle redirect if needed
  const result = await yuno.continuePayment();
  
  if (result?.action === 'REDIRECT_URL') {
    window.location.href = result.redirect.init_url;
  }
}
```

## Configuration Options

### Essential Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `checkoutSession` | string | Session ID from backend |
| `elementSelector` | string | CSS selector for container |
| `countryCode` | string | ISO country code (e.g., 'US') |
| `language` | string | Language code (e.g., 'en-US') |
| `yunoCreatePayment` | function | Payment creation callback |

### Card Configuration

```javascript
yuno.startCheckout({
  // ... other config
  card: {
    type: 'extends', // or 'only'
    cardSaveEnable: true, // Show save checkbox
    isCreditCardProcessingOnly: false, // Allow debit
    onChange: ({ error, data }) => {
      if (error) {
        console.log('Card validation error:', error);
      }
    }
  }
});
```

### Loader & Status

```javascript
yuno.startCheckout({
  // ... other config
  showLoading: true, // Show Yuno's loader
  showPaymentStatus: true, // Show payment result page
  onLoading: (isLoading) => {
    console.log('Loading state:', isLoading);
  }
});
```
