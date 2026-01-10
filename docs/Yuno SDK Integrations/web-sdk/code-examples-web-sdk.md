---
title: Code Examples Web SDK
deprecated: false
hidden: false
metadata:
  robots: index
---
Ready-to-use code examples for common payment scenarios.

## Example 1: Basic One-Time Payment

Complete checkout flow with card payment.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Basic Payment</title>
  <script src="https://sdk-web.y.uno/v1.5/main.js"></script>
  <style>
    #payment-container { max-width: 500px; margin: 50px auto; }
    #pay-button { margin-top: 20px; padding: 12px 24px; }
  </style>
</head>
<body>
  <div id="payment-container"></div>
  <button id="pay-button">Start Payment</button>
  
  <script>
    document.getElementById('pay-button').addEventListener('click', async () => {
      const yuno = await Yuno.initialize('pk_test_your_key');
      
      const session = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: { currency: 'USD', value: 2500 },
          customer_id: 'cus_123'
        })
      }).then(r => r.json());
      
      yuno.startCheckout({
        checkoutSession: session.id,
        elementSelector: '#payment-container',
        countryCode: 'US',
        async yunoCreatePayment(token) {
          await fetch('/api/payment', {
            method: 'POST',
            body: JSON.stringify({ token, session: session.id })
          });
          yuno.continuePayment();
        },
        yunoPaymentResult: (data) => {
          if (data.status === 'SUCCEEDED') {
            window.location.href = '/success';
          }
        }
      });
      
      yuno.mountCheckout();
    });
  </script>
</body>
</html>
```

## Example 2: Subscription Payment

Recurring payment with card saving.

```javascript
async function setupSubscription() {
  const yuno = await Yuno.initialize('pk_test_your_key');
  
  // Create customer session for enrollment
  const session = await fetch('/api/customer/session', {
    method: 'POST',
    body: JSON.stringify({ customer_id: 'cus_123' })
  }).then(r => r.json());
  
  // Enroll payment method
  yuno.startEnrollment({
    customerSession: session.id,
    countryCode: 'US',
    async yunoEnrolled(vaultedToken) {
      // Save vaulted token for future charges
      await fetch('/api/subscription/create', {
        method: 'POST',
        body: JSON.stringify({
          customer_id: 'cus_123',
          vaulted_token: vaultedToken,
          plan: 'premium_monthly'
        })
      });
      
      alert('Subscription created successfully!');
    }
  });
  
  yuno.mountEnrollment();
}
```

## Example 3: One-Click Checkout

Fast checkout with saved cards.

```javascript
async function oneClickCheckout(vaultedToken) {
  const yuno = await Yuno.initialize('pk_test_your_key');
  
  const session = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({
      amount: { currency: 'USD', value: 1500 },
      customer_id: 'cus_123'
    })
  }).then(r => r.json());
  
  yuno.startCheckout({
    checkoutSession: session.id,
    elementSelector: '#payment',
    countryCode: 'US',
    async yunoCreatePayment(token) {
      await fetch('/api/payment', {
        method: 'POST',
        body: JSON.stringify({ token, session: session.id })
      });
      yuno.continuePayment();
    }
  });
  
  // Mount with saved card
  yuno.mountCheckout({
    vaultedToken: vaultedToken
  });
}

// Display saved cards UI
async function showSavedCards() {
  const cards = await fetch('/api/customer/cards').then(r => r.json());
  
  cards.forEach(card => {
    const button = document.createElement('button');
    button.textContent = `${card.brand} ****${card.last4}`;
    button.onclick = () => oneClickCheckout(card.vaulted_token);
    document.getElementById('saved-cards').appendChild(button);
  });
}
```

## Example 4: Multi-Currency Checkout

Display prices in customer's local currency.

```javascript
async function multiCurrencyCheckout(customerCountry) {
  const currencyMap = {
    'BR': { currency: 'BRL', exchangeRate: 5.0 },
    'MX': { currency: 'MXN', exchangeRate: 20.0 },
    'AR': { currency: 'ARS', exchangeRate: 350.0 }
  };
  
  const baseAmount = 100; // USD
  const local = currencyMap[customerCountry];
  
  const session = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({
      amount: { currency: 'USD', value: baseAmount * 100 },
      alternative_amount: { 
        currency: local.currency, 
        value: Math.round(baseAmount * local.exchangeRate * 100)
      },
      country: customerCountry
    })
  }).then(r => r.json());
  
  const yuno = await Yuno.initialize('pk_test_your_key');
  
  yuno.startCheckout({
    checkoutSession: session.id,
    elementSelector: '#payment',
    countryCode: customerCountry,
    async yunoCreatePayment(token) {
      await processPayment(token, session.id);
      yuno.continuePayment();
    }
  });
  
  yuno.mountCheckout();
}
```

## Example 5: Split Payment

Divide payment between multiple recipients.

```javascript
async function splitPayment(totalAmount, splits) {
  // splits = [{ recipient_id: 'rec_1', amount: 5000 }, ...]
  
  const session = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({
      amount: { currency: 'USD', value: totalAmount },
      metadata: { splits: JSON.stringify(splits) }
    })
  }).then(r => r.json());
  
  const yuno = await Yuno.initialize('pk_test_your_key');
  
  yuno.startCheckout({
    checkoutSession: session.id,
    elementSelector: '#payment',
    countryCode: 'US',
    async yunoCreatePayment(token) {
      // Backend handles split logic
      await fetch('/api/payment/split', {
        method: 'POST',
        body: JSON.stringify({
          token,
          session: session.id,
          splits
        })
      });
      yuno.continuePayment();
    }
  });
  
  yuno.mountCheckout();
}
```

## Example 6: Custom Payment Method Selection

Build your own payment method selector.

```html
<div id="payment-methods"></div>
<div id="payment-form"></div>

<script>
async function customMethodSelection() {
  const yuno = await Yuno.initialize('pk_test_your_key');
  const session = await createSession();
  
  // Fetch available methods
  const methods = await fetch(
    `https://api.y.uno/v1/checkout/sessions/${session.id}/payment-methods`,
    { headers: { 'X-Yuno-Api-Key': 'pk_test_your_key' }}
  ).then(r => r.json());
  
  // Display methods
  methods.payment_methods.forEach(method => {
    const button = document.createElement('button');
    button.innerHTML = `
      <img src="${method.icon}" width="32" />
      ${method.name}
    `;
    button.onclick = () => selectMethod(method.type);
    document.getElementById('payment-methods').appendChild(button);
  });
  
  async function selectMethod(type) {
    yuno.startCheckout({
      checkoutSession: session.id,
      elementSelector: '#payment-form',
      countryCode: 'US',
      async yunoCreatePayment(token) {
        await processPayment(token);
        yuno.continuePayment();
      }
    });
    
    yuno.mountCheckoutLite({
      paymentMethodType: type
    });
  }
}
</script>
```

## Example 7: Mobile-Optimized Checkout

Responsive payment form for mobile devices.

```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    #payment-container {
      padding: 20px;
      min-height: 100vh;
    }
    @media (max-width: 768px) {
      #payment-container {
        padding: 10px;
      }
    }
  </style>
  <script src="https://sdk-web.y.uno/v1.5/main.js"></script>
</head>
<body>
  <div id="payment-container"></div>
  
  <script>
    async function mobileCheckout() {
      const yuno = await Yuno.initialize('pk_test_your_key');
      const session = await createSession();
      
      yuno.startCheckout({
        checkoutSession: session.id,
        elementSelector: '#payment-container',
        countryCode: 'US',
        renderMode: 'element', // Better for mobile than modal
        card: {
          type: 'extends' // Separate fields easier on mobile
        },
        async yunoCreatePayment(token) {
          await processPayment(token);
          yuno.continuePayment();
        }
      });
      
      yuno.mountCheckout();
    }
    
    mobileCheckout();
  </script>
</body>
</html>
```

## Example 8: Payment with Analytics

Track payment events with Google Analytics.

```javascript
async function checkoutWithAnalytics() {
  const yuno = await Yuno.initialize('pk_test_your_key');
  const session = await createSession();
  
  yuno.startCheckout({
    checkoutSession: session.id,
    elementSelector: '#payment',
    countryCode: 'US',
    
    yunoPaymentMethodSelected: (data) => {
      gtag('event', 'payment_method_selected', {
        method: data.type
      });
    },
    
    async yunoCreatePayment(token) {
      gtag('event', 'begin_checkout', {
        value: 25.00,
        currency: 'USD'
      });
      
      await processPayment(token);
      yuno.continuePayment();
    },
    
    yunoPaymentResult: (data) => {
      if (data.status === 'SUCCEEDED') {
        gtag('event', 'purchase', {
          transaction_id: data.payment_id,
          value: 25.00,
          currency: 'USD'
        });
      } else {
        gtag('event', 'payment_failed', {
          reason: data.error?.message
        });
      }
    }
  });
  
  yuno.mountCheckout();
}
```

## Example 9: Custom Loading State

Use your own loader instead of Yuno's.

```html
<div id="payment"></div>
<div id="custom-loader" style="display:none;">
  <div class="spinner"></div>
  Processing...
</div>

<script>
async function customLoader() {
  const yuno = await Yuno.initialize('pk_test_your_key');
  const session = await createSession();
  
  yuno.startCheckout({
    checkoutSession: session.id,
    elementSelector: '#payment',
    countryCode: 'US',
    showLoading: false, // Disable Yuno loader
    
    onLoading: (isLoading) => {
      document.getElementById('custom-loader').style.display =
        isLoading ? 'flex' : 'none';
    },
    
    async yunoCreatePayment(token) {
      await processPayment(token);
      yuno.continuePayment();
    }
  });
  
  yuno.mountCheckout();
}
</script>
```

## Example 10: React Integration

Use Yuno SDK in React application.

```jsx
import { useEffect, useRef, useState } from 'react';

function PaymentComponent() {
  const [yuno, setYuno] = useState(null);
  const [error, setError] = useState(null);
  const paymentRef = useRef(null);
  
  useEffect(() => {
    async function init() {
      try {
        const yunoInstance = await window.Yuno.initialize('pk_test_your_key');
        setYuno(yunoInstance);
      } catch (err) {
        setError('Failed to load payment SDK');
      }
    }
    
    init();
  }, []);
  
  useEffect(() => {
    if (!yuno || !paymentRef.current) return;
    
    async function startPayment() {
      const session = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ amount: { currency: 'USD', value: 2500 } })
      }).then(r => r.json());
      
      yuno.startCheckout({
        checkoutSession: session.id,
        elementSelector: '#yuno-payment',
        countryCode: 'US',
        async yunoCreatePayment(token) {
          await fetch('/api/payment', {
            method: 'POST',
            body: JSON.stringify({ token, session: session.id })
          });
          yuno.continuePayment();
        },
        yunoPaymentResult: (data) => {
          if (data.status === 'SUCCEEDED') {
            window.location.href = '/success';
          }
        }
      });
      
      yuno.mountCheckout();
    }
    
    startPayment();
  }, [yuno]);
  
  if (error) return <div>Error: {error}</div>;
  if (!yuno) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>Complete Payment</h2>
      <div id="yuno-payment" ref={paymentRef}></div>
    </div>
  );
}

export default PaymentComponent;
```

## Example 11: Vue.js Integration

```vue
<template>
  <div>
    <h2>Payment</h2>
    <div ref="paymentContainer" id="yuno-payment"></div>
  </div>
</template>

<script>
export default {
  name: 'PaymentComponent',
  data() {
    return {
      yuno: null
    }
  },
  async mounted() {
    this.yuno = await window.Yuno.initialize('pk_test_your_key');
    await this.initPayment();
  },
  methods: {
    async initPayment() {
      const session = await this.$http.post('/api/checkout', {
        amount: { currency: 'USD', value: 2500 }
      });
      
      this.yuno.startCheckout({
        checkoutSession: session.data.id,
        elementSelector: '#yuno-payment',
        countryCode: 'US',
        yunoCreatePayment: async (token) => {
          await this.$http.post('/api/payment', { token, session: session.data.id });
          this.yuno.continuePayment();
        },
        yunoPaymentResult: (data) => {
          if (data.status === 'SUCCEEDED') {
            this.$router.push('/success');
          }
        }
      });
      
      this.yuno.mountCheckout();
    }
  }
}
</script>
```

## Example 12: Error Recovery

Handle and retry failed payments.

```javascript
async function paymentWithRetry() {
  const yuno = await Yuno.initialize('pk_test_your_key');
  let session = await createSession();
  let retryCount = 0;
  const MAX_RETRIES = 3;
  
  function startPayment() {
    yuno.startCheckout({
      checkoutSession: session.id,
      elementSelector: '#payment',
      countryCode: 'US',
      
      async yunoCreatePayment(token) {
        try {
          await fetch('/api/payment', {
            method: 'POST',
            body: JSON.stringify({ token, session: session.id })
          });
          yuno.continuePayment();
          retryCount = 0; // Reset on success
        } catch (error) {
          console.error('Payment failed:', error);
          throw error;
        }
      },
      
      yunoError: async (error, data) => {
        if (error.code === 'SESSION_EXPIRED' && retryCount < MAX_RETRIES) {
          retryCount++;
          session = await createSession(); // Create new session
          startPayment(); // Retry
        } else if (error.code === 'NETWORK_ERROR' && retryCount < MAX_RETRIES) {
          retryCount++;
          setTimeout(() => startPayment(), 2000); // Retry after 2s
        } else {
          alert('Payment failed. Please try again.');
        }
      }
    });
    
    yuno.mountCheckout();
  }
  
  startPayment();
}
```

## Example 13: Installments Payment

Enable installment options for cards.

```javascript
async function installmentsCheckout() {
  const yuno = await Yuno.initialize('pk_test_your_key');
  const session = await createSession();
  
  yuno.startCheckout({
    checkoutSession: session.id,
    elementSelector: '#payment',
    countryCode: 'BR', // Brazil commonly uses installments
    card: {
      installments: {
        enabled: true,
        defaultValue: 1
      }
    },
    async yunoCreatePayment(token, tokenInfo) {
      await fetch('/api/payment', {
        method: 'POST',
        body: JSON.stringify({
          token,
          session: session.id,
          installments: tokenInfo.card_data?.installment
        })
      });
      yuno.continuePayment();
    }
  });
  
  yuno.mountCheckout();
}
```

## Example 14: Dynamic Checkout Session

Update session amount based on user selection.

```html
<select id="product-select">
  <option value="1000">Basic Plan - $10</option>
  <option value="2500">Pro Plan - $25</option>
  <option value="5000">Enterprise - $50</option>
</select>
<button id="checkout-btn">Checkout</button>
<div id="payment"></div>

<script>
document.getElementById('checkout-btn').addEventListener('click', async () => {
  const amount = document.getElementById('product-select').value;
  
  const session = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({
      amount: { currency: 'USD', value: parseInt(amount) }
    })
  }).then(r => r.json());
  
  const yuno = await Yuno.initialize('pk_test_your_key');
  
  yuno.startCheckout({
    checkoutSession: session.id,
    elementSelector: '#payment',
    countryCode: 'US',
    async yunoCreatePayment(token) {
      await processPayment(token, session.id);
      yuno.continuePayment();
    }
  });
  
  yuno.mountCheckout();
});
</script>
```

## Example 15: Guest Checkout

Quick checkout without account creation.

```javascript
async function guestCheckout(email, amount) {
  // Create anonymous customer
  const customer = await fetch('/api/customer/guest', {
    method: 'POST',
    body: JSON.stringify({ email, guest: true })
  }).then(r => r.json());
  
  const session = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({
      customer_id: customer.id,
      amount: { currency: 'USD', value: amount },
      metadata: { guest_checkout: true }
    })
  }).then(r => r.json());
  
  const yuno = await Yuno.initialize('pk_test_your_key');
  
  yuno.startCheckout({
    checkoutSession: session.id,
    elementSelector: '#payment',
    countryCode: 'US',
    card: {
      cardSaveEnable: false // Don't offer to save card for guests
    },
    async yunoCreatePayment(token) {
      await processPayment(token, session.id);
      yuno.continuePayment();
    },
    yunoPaymentResult: (data) => {
      if (data.status === 'SUCCEEDED') {
        window.location.href = `/order-confirmation?email=${email}`;
      }
    }
  });
  
  yuno.mountCheckout();
}
```

## Backend Examples

Complete backend implementations:

**Node.js/Express:**
```javascript
const express = require('express');
const app = express();

app.post('/api/checkout', async (req, res) => {
  const response = await fetch('https://api.y.uno/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'X-Yuno-Api-Key': process.env.YUNO_SECRET_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      customer_id: req.body.customer_id,
      amount: req.body.amount,
      country: req.body.country || 'US'
    })
  });
  res.json(await response.json());
});

app.post('/api/payment', async (req, res) => {
  const response = await fetch('https://api.y.uno/v1/payments', {
    method: 'POST',
    headers: {
      'X-Yuno-Api-Key': process.env.YUNO_SECRET_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      one_time_token: req.body.token,
      checkout_session: req.body.session
    })
  });
  res.json(await response.json());
});
```