---
title: Web SDK
deprecated: false
hidden: false
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
const yuno = await Yuno.initialize(
  'your-public-api-key',
  'optional-application-session', // Optional: for session tracking
  { cookies: undefined }          // Optional: additional options
);
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
  async yunoCreatePayment(oneTimeToken, tokenWithInformation) {
    // oneTimeToken: string - the token to send to your backend
    // tokenWithInformation: object - additional token details (card info, etc.)
    console.log('Token info:', tokenWithInformation);
    
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
  yunoPaymentResult: (status) => {
    console.log('Payment completed:', status);
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
      // Initialize with optional parameters
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
        async yunoCreatePayment(oneTimeToken, tokenWithInformation) {
          // tokenWithInformation contains additional details like card brand, last 4 digits, etc.
          await fetch('/api/payment/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              one_time_token: oneTimeToken, 
              checkout_session: session.checkout_session 
            })
          });
          yuno.continuePayment();
        },
        yunoPaymentResult: (status) => {
          if (status === 'SUCCEEDED') {
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

## Handling Payment Results

```javascript
yuno.startCheckout({
  // ... other config
  yunoPaymentResult: (status) => {
    switch(status) {
      case 'SUCCEEDED':
        window.location.href = '/success';
        break;
      case 'FAIL':
        alert('Payment failed');
        break;
      case 'PROCESSING':
        console.log('Payment is being processed');
        break;
      case 'REJECT':
        alert('Payment was rejected');
        break;
      case 'INTERNAL_ERROR':
        alert('An internal error occurred');
        break;
      case 'CANCELED':
        console.log('Payment was canceled');
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
async yunoCreatePayment(oneTimeToken, tokenWithInformation) {
  await createPaymentOnBackend(oneTimeToken);
  
  // Handle redirect if needed
  const result = await yuno.continuePayment();
  
  if (result?.action === 'REDIRECT_URL') {
    window.location.href = result.redirect.init_url;
  }
}
```

## Configuration Options

### Initialize Parameters

| Parameter            | Type   | Required | Description                                         |
| -------------------- | ------ | -------- | --------------------------------------------------- |
| `publicApiKey`       | string | Yes      | Your public API key                                 |
| `applicationSession` | string | No       | Optional session ID for tracking                    |
| `options`            | object | No       | Additional options (e.g., `{ cookies: undefined }`) |

### Essential Parameters

| Parameter           | Type     | Description                                                              |
| ------------------- | -------- | ------------------------------------------------------------------------ |
| `checkoutSession`   | string   | Session ID from backend                                                  |
| `elementSelector`   | string   | CSS selector for container                                               |
| `countryCode`       | string   | ISO country code (e.g., 'US')                                            |
| `language`          | string   | Language code (e.g., 'en-US')                                            |
| `yunoCreatePayment` | function | Payment creation callback `(oneTimeToken, tokenWithInformation) => void` |

### Card Configuration

```javascript
yuno.startCheckout({
  // ... other config
  card: {
    type: 'extends', // or 'only'
    cardSaveEnable: true, // Show save checkbox
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

## Next Steps

Ready to explore more advanced features? Check out the [Advanced Features](doc:advanced-features-web-sdk) guide for:

* **Alternative Mounting Options** - `mountCheckoutLite()` and `mountSeamlessCheckout()` for custom payment method selection
* **Enrollment (Save Cards)** - Save payment methods for future use
* **Vaulted Token Payments** - One-click payments with saved cards
* **Custom UI (Headless Integration)** - Build completely custom payment forms
* **Secure Fields** - Custom card forms with PCI compliance
* **Styling & Customization** - Match the SDK to your brand
* **Advanced Configuration** - Dynamic views, render mode, and more

See also:

* [Code Examples](doc:code-examples-web-sdk) - Copy-paste examples for common scenarios
