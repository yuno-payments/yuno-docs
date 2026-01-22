---
title: Advanced Features Web SDK
deprecated: false
hidden: false
metadata:
  robots: index
---
Advanced configuration options and custom integrations for the Yuno Web SDK.

## Alternative Mounting Options

The basic flow uses `mountCheckout()` for automatic payment method display. For more control, use these alternatives:

### Custom Payment Method Selection (`mountCheckoutLite()`)

Control which payment method to display:

```javascript
// 1. Fetch available methods from backend
const methods = await fetch('/api/payment-methods').then(r => r.json());

// 2. Display methods in your custom UI
// 3. Mount selected payment method

yuno.mountCheckoutLite({
  paymentMethodType: selectedMethod, // 'CARD', 'PIX', etc.
  vaultedToken: null // or saved token
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

Use `mountEnrollmentLite()` to create a standalone enrollment flow for saving cards without a payment:

```javascript
// Create customer session on backend
const customerSession = await fetch('/api/customer/session', {
  method: 'POST',
  body: JSON.stringify({ customer_id: 'cus_123' })
}).then(r => r.json());

// Mount enrollment form
yuno.mountEnrollmentLite({
  customerSession: customerSession.id,
  countryCode: 'US',
  language: 'en',
  yunoEnrollmentStatus: (enrollmentData) => {
    console.log('Enrollment status:', enrollmentData);
  },
  yunoError: (error) => {
    console.error('Enrollment error:', error);
  }
});
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

**2. Create Secure Fields Instance**

```javascript
// Initialize secure fields with configuration
const secureFields = await yuno.secureFields({
  countryCode: 'US',
  checkoutSession: 'session_id'
});
```

**3. Create and Render Individual Fields**

```html
<div id="pan-field"></div>
<div id="cvv-field"></div>
<div id="expiration-field"></div>
```

```javascript
// Create card number field
const panField = secureFields.create({
  name: 'pan',
  options: {
    placeholder: '1234 5678 9012 3456',
    onChange: (event) => {
      console.log('Card number changed:', event);
    }
  }
});
panField.render('#pan-field');

// Create CVV field
const cvvField = secureFields.create({
  name: 'cvv',
  options: {
    placeholder: 'CVV',
    onChange: (event) => {
      console.log('CVV changed:', event);
    }
  }
});
cvvField.render('#cvv-field');

// Create expiration field
const expirationField = secureFields.create({
  name: 'expiration',
  options: {
    placeholder: 'MM/YY',
    onChange: (event) => {
      console.log('Expiration changed:', event);
    }
  }
});
expirationField.render('#expiration-field');
```

**4. Generate Token**

```javascript
// When user submits the form
const tokenResult = await secureFields.generateToken({
  // Additional data if needed
});

// Use the token to create payment
await createPayment(tokenResult.token);
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

### Custom CSS via Card Styles

You can customize the appearance of card forms using CSS injection through the `card.styles` property:

```javascript
yuno.startCheckout({
  // ... other config
  card: {
    styles: `
      .yuno-input {
        border: 1px solid #007bff;
        border-radius: 4px;
        font-family: 'Inter', sans-serif;
      }
      .yuno-input:focus {
        border-color: #0056b3;
      }
      .yuno-input.error {
        border-color: #dc3545;
      }
    `
  }
});
```

### Custom Texts

You can customize form labels and messages using the `texts` property:

```javascript
yuno.startCheckout({
  // ... other config
  texts: {
    customerForm: {
      // Customer form field labels
    },
    paymentOtp: {
      // OTP form labels
    }
  }
});
```

## Render Modes

The `renderMode` property controls how the payment form is displayed. It accepts an object with a `type` property:

### Modal Display

```javascript
yuno.startCheckout({
  renderMode: {
    type: 'modal'
  },
  elementSelector: '#payment-container'
});
```

### Inline Display

```javascript
yuno.startCheckout({
  renderMode: {
    type: 'element'
  },
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

Installments are configured in the Yuno dashboard per payment method and country. When enabled, the SDK will automatically display installment options to the user during checkout.

To enable installments for secure fields, use the `installmentEnable` option:

```javascript
const secureFields = await yuno.secureFields({
  countryCode: 'BR',
  checkoutSession: 'session_id',
  installmentEnable: true
});
```

### Custom Installment Plans

Installment plans are configured in the Yuno dashboard per payment method and country.

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
  yunoPaymentResult: (status) => {
    // Redirect to custom status page based on status
    window.location.href = `/payment-status?status=${status}`;
  }
});
```

The `yunoPaymentResult` callback receives the payment status as a string. Possible values include: `SUCCEEDED`, `FAIL`, `PROCESSING`, `REJECT`, `INTERNAL_ERROR`, `CANCELED`.

## Event Callbacks

### All Available Callbacks

```javascript
yuno.startCheckout({
  // ... other config
  
  // Payment method selected
  yunoPaymentMethodSelected: (data) => {
    console.log('Selected:', data.type, data.name);
    analytics.track('payment_method_selected', { type: data.type });
  },
  
  // Payment created (before processing)
  async yunoCreatePayment(oneTimeToken, tokenWithInformation) {
    console.log('Creating payment with token:', oneTimeToken);
    // tokenWithInformation contains additional data like device fingerprint
    await processPayment(oneTimeToken);
    yuno.continuePayment();
  },
  
  // Payment completed - receives status string directly
  yunoPaymentResult: (status) => {
    console.log('Payment result:', status);
    if (status === 'SUCCEEDED') {
      gtag('event', 'purchase');
    }
  },
  
  // Error occurred
  yunoError: (message, data) => {
    console.error('Error:', message, data);
    Sentry.captureException(new Error(message));
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

### Handling Errors

The `yunoError` callback receives an error message string and optional data:

```javascript
yunoError: (message, data) => {
  console.error('Payment error:', message);
  
  // Display error to user
  showError(message || 'An error occurred. Please try again.');
  
  // Log additional data if available
  if (data) {
    console.log('Error details:', data);
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

The SDK automatically determines the environment based on your API key prefix:

### Development (Sandbox)

Use test API keys (prefixed with `pk_test_`) for sandbox environment:

```javascript
const yuno = await Yuno.initialize('pk_test_your_key_here');
```

### Production

Use live API keys (prefixed with `pk_live_`) for production environment:

```javascript
const yuno = await Yuno.initialize('pk_live_your_key_here');
```

> **Note:** The environment is determined by your API key. Test keys (`pk_test_*`) connect to sandbox, and live keys (`pk_live_*`) connect to production.
