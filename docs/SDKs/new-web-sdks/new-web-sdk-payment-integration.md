---
title: New - Web Flow Payment Integration
deprecated: false
hidden: true
metadata:
  robots: index
---
This guide shows you how to integrate payment processing using the Yuno SDK's Web Flow.

> 📘 Prerequisites
>
> Before starting, make sure you've [installed and initialized the SDK](doc:new-getting-started-with-web-sdk).

## Step 1: Create a Checkout Session

Before starting the payment flow, create a checkout session on your backend using the [Create Checkout Session](ref:create-checkout-session) endpoint.

* First, [create a customer](ref:create-customer) or retrieve an existing customer ID
* Include it when creating the `checkout_session`

```javascript
// Server-side
const checkoutSession = await createCheckoutSession({
  customer_id: "customer-id-here",
  amount: {
    currency: "USD",
    value: 1000
  },
  country: "US"
});
```

> 📘 Additional Data
>
> If your workflow requires sending the `additional_data` object, it can be sent as part of the checkout session.

<Callout icon="💳" theme="default">
  ### Control Authorization and Capture

  To control authorization and capture with cards, include `payment_method.detail.card.capture` in the checkout session: set `false` to authorize only, `true` to capture immediately.
</Callout>

### Key Parameters

| Parameter            | Required | Description                                                                                                                                                         |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `amount`             | Yes      | The primary transaction amount object containing `currency` (ISO 4217 code) and `value` (numeric amount in that currency).                                          |
| `alternative_amount` | No       | An alternative currency representation of the transaction amount with the same structure as `amount` (`currency` and `value`). Useful for multi-currency scenarios. |

## Step 2: Start the Checkout Process

Use `yuno.startCheckout()` to initialize the checkout with necessary parameters:

```javascript
yuno.startCheckout({
  checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
  elementSelector: "#root",
  countryCode: "US",
  language: "en-US",
  showLoading: true,
  issuersFormEnable: true,
  showPaymentStatus: true,
  card: {
    type: "extends",
    isCreditCardProcessingOnly: false,
    onChange: ({ error, data }) => {
      if (error) {
        console.log('Card form error:', error);
      } else {
        console.log('Card form data:', data);
      }
    },
  },
  onLoading: (args) => {
    console.log('Loading event:', args);
  },
  async yunoCreatePayment(oneTimeToken, tokenWithInformation) {
    await createPayment({ oneTimeToken, checkoutSession });
    yuno.continuePayment({ showPaymentStatus: true });
  },
  yunoPaymentMethodSelected: (data) => {
    console.log("Payment method selected:", data);
  },
  yunoPaymentResult: (data) => {
    console.log("Payment result:", data);
  },
  yunoError: (error, data) => {
    console.error("An error occurred:", error, data);
  },
});
```

> 📘 For Seamless Flow
>
> If using `mountSeamlessCheckout()` in Step 3, use `startSeamlessCheckout()` instead of `startCheckout()`. The parameters are the same.

### Essential Parameters

| Parameter                   | Description                                                                                                                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`           | Refers to the current payment's [checkout session](ref:create-checkout-session). Example: `438413b7-4921-41e4-b8f3-28a5a0141638`.                                                                     |
| `elementSelector`           | The HTML element where the checkout will be rendered.                                                                                                                                                 |
| `countryCode`               | This parameter specifies the country for which the payment process is being set up. Use an `ENUM` value representing the desired country code. See [Country Coverage](doc:country-coverage-yuno-sdk). |
| `language`                  | Language for payment forms. Use any code listed in [Supported languages](doc:supported-languages). Example: `en-US`. Defaults to browser language when available.                                     |
| `showLoading`               | Controls the visibility of the Yuno loading/spinner page during the payment process. Default: `true`.                                                                                                 |
| `onLoading`                 | Callback to receive notifications about server calls or loading events during the payment process.                                                                                                    |
| `issuersFormEnable`         | Enables the issuer's form (e.g., a list of banks). Default: `true`.                                                                                                                                   |
| `showPaymentStatus`         | Shows the Yuno Payment Status page, which is useful when continuing a payment. Default: `true`.                                                                                                       |
| `yunoCreatePayment`         | Callback function for creating a payment. Called when the SDK generates a one-time token.                                                                                                             |
| `yunoPaymentMethodSelected` | Callback invoked when a payment method is selected.                                                                                                                                                   |
| `yunoPaymentResult`         | Callback called after the payment is completed, with the payment status.                                                                                                                              |
| `yunoError`                 | Callback invoked when an error occurs during the payment process.                                                                                                                                     |

### Configuration Options

The `startCheckout()` function accepts many configuration options for customizing SDK behavior:

* **Loader control**: `showLoading`, `hideLoader()`
* **Render mode**: `modal` vs `element`
* **Card form options**: `cardSaveEnable`, `cardNumberPlaceholder`, `hideCardholderName`, `isCreditCardProcessingOnly`, `onChange`
* **Issuer form**: `issuersFormEnable`
* **Text customization**: `texts` for button labels
* **And more**

**For all configuration options, see [Complementary Features](doc:new-web-sdk-complementary-features).**

> 📘 Customer and Merchant-Initiated Transactions
>
> Payments can be initiated by the customer (CIT) or by the merchant (MIT). Learn more in [Stored Credentials](doc:stored-credentials).
>
> The steps on this page refer to a customer-initiated transaction without the recurrence option.

> 📘 `onPaymentMethodSelected` Event
>
> For all APMs, including Google Pay, Apple Pay, and PayPal, `onPaymentMethodSelected` is triggered as soon as the customer chooses the payment method (before the payment flow begins).

> 📘 Google Pay and Apple Pay Display
>
> From SDK version 1.5, Google Pay and Apple Pay appear as direct buttons instead of radio buttons in the payment methods list. They are displayed separately from other payment methods.

## Step 3: Mount the SDK

Choose your mounting option based on your integration needs:

### Option A: Using `mountCheckout()`

Yuno automatically displays all available payment methods based on your dashboard configuration:

```javascript
yuno.mountCheckout();
```

Mount with a specific payment method pre-selected:

```javascript
yuno.mountCheckout({
  paymentMethodType: 'CARD',
  vaultedToken: 'optional-vaulted-token'
});
```

### Option B: Using `mountCheckoutLite()`

You control which payment method to display. First, fetch available methods from the API, display them in your UI, then mount the selected method.

**Step 1: Fetch available payment methods**

Call the API to retrieve payment methods available for the checkout session:

```javascript
// Backend API call
GET /v1/checkout/sessions/{checkout_session}/payment-methods

// Example response
{
  "payment_methods": [
    {
      "type": "CARD",
      "name": "Credit/Debit Card",
      "supported": true
    },
    {
      "type": "PIX",
      "name": "PIX",
      "supported": true
    },
    // ... more payment methods
  ]
}
```

**Step 2: Display payment methods in your UI**

Present the payment methods to your customer and capture their selection.

**Step 3: Mount the selected payment method**

```javascript
yuno.mountCheckoutLite({
  paymentMethodType: 'CARD', // User's selection
  vaultedToken: 'optional-vaulted-token'
});
```

See the [Payment Types](ref:payment-type-list) page for the complete list of payment method types.

> 📘 Google Pay and Apple Pay in Lite Mounting
>
> When using `mountCheckoutLite()`, Google Pay and Apple Pay are not available as built-in payment options. To use these payment methods, you must use the `mountExternalButtons()` method. See [Mount External Buttons](#mount-external-buttons) below.

### Option C: Using `mountSeamlessCheckout()`

Similar to `mountCheckoutLite()`, but payment creation happens automatically via callbacks:

```javascript
yuno.mountSeamlessCheckout({
  paymentMethodType: 'CARD', // User's selection
  vaultedToken: 'optional-vaulted-token'
});
```

> 📘 Seamless Callback Behavior
>
> When using Seamless mounting option, the SDK handles token generation and payment creation behind the scenes. The `yunoCreatePayment` callback is invoked automatically after the customer completes the payment form. Your implementation should create the payment on your backend when this callback is triggered.

## Step 4: Initiate the Payment Process

After mounting the SDK, call `yuno.startPayment()` to initiate the payment flow:

```javascript
const payButton = document.querySelector("#button-pay");

payButton.addEventListener("click", () => {
  yuno.startPayment();
});
```

> 📘 Automatic Start with Seamless
>
> When using `mountSeamlessCheckout()`, you still need to call `yuno.startPayment()` to open the payment form.

## Step 5: Get the One-Time Token

After the customer fills out the payment form, the SDK generates a one-time token (OTT) and calls your `yunoCreatePayment()` callback:

```javascript
async yunoCreatePayment(oneTimeToken, tokenWithInformation) {
  // Send token to your backend to create the payment
  await createPayment({ oneTimeToken, checkoutSession });
  
  // Always call continuePayment after creating the payment
  yuno.continuePayment({ showPaymentStatus: true });
}
```

You can use `tokenWithInformation` to receive additional information provided by the customer, such as installments or document type/number.

> ❗️ Loader Management
>
> The merchant is responsible for managing the loader. Yuno provides a default loader option, but merchants may implement their own loader if preferred.

## Step 6: Create the Payment

In your backend, call the [Create Payment endpoint](ref:create-payment) using the one-time token:

```javascript
// Backend API call
POST /v1/payments
{
  "checkout": {
    "session": "checkout-session-id"
  },
  "payment_method": {
    "type": "CARD",
    "token": "one-time-token-from-sdk"
  },
  ...
}
```

> ❗️ ContinuePayment Method Required
>
> After creating a payment, you **must** call `yuno.continuePayment()`. Some asynchronous payment methods require additional customer actions. The API response sets `sdk_action_required` to `true` when this is needed.

### `continuePayment` Return Value

For payment methods requiring merchant-side action, `await yuno.continuePayment()` returns either an object or `null`:

```typescript
{
  action: 'REDIRECT_URL'
  type: string
  redirect: {
    init_url: string
    success_url: string
    error_url: string
  }
} | null
```

When an object is returned, you can handle custom redirect flows. When `null`, no additional action is needed.

## Payment with Vaulted Tokens

If a customer has a previously enrolled payment method, use the vaulted token to process payments without collecting details again:

```javascript
// With automatic display
yuno.mountCheckout({
  vaultedToken: "stored-token-here"
});

// With custom display
yuno.mountCheckoutLite({
  paymentMethodType: "CARD",
  vaultedToken: "stored-token-here"
});

// With seamless
yuno.mountSeamlessCheckout({
  paymentMethodType: "CARD",
  vaulted Token: "stored-token-here"
});
```

> **Best Practice:** Even when using vaulted tokens, pass them through the SDK instead of directly to the API. This ensures proper 3DS handling, fraud screening, and collection of any additional required information.

## Enroll Cards During Payment

You can save payment methods while processing a payment, without a separate enrollment flow.

### Option 1: API-Level Enrollment

Set `vault_on_success = true` when creating the payment:

```javascript
async yunoCreatePayment(oneTimeToken) {
  await createPayment({ 
    oneTimeToken, 
    checkoutSession,
    vault_on_success: true // Card will be saved if payment succeeds
  });
  yuno.continuePayment();
}
```

**Result:** If payment succeeds, you'll receive a `vaulted_token` in the payment response.

### Option 2: SDK Checkbox

Enable `cardSaveEnable` when starting checkout:

```javascript
yuno.startCheckout({
  checkoutSession: "...",
  card: {
    cardSaveEnable: true // Shows "Save card" checkbox to user
  }
});
```

**Result:** If user checks the box and payment succeeds, you'll receive a `vaulted_token`.

> **Important:** Use only ONE enrollment method. For enrolling alternative payment methods (not cards), see [Enrollment Integration](doc:new-web-sdk-enrollment-integration).

## Mount External Buttons

You can use the `mountExternalButtons` method to render Google Pay and Apple Pay buttons in custom locations within your UI:

```javascript
await yuno.mountExternalButtons([
  {
    paymentMethodType: 'APPLE_PAY',
    elementSelector: '#apple-pay',
  },
  {
    paymentMethodType: 'GOOGLE_PAY',
    elementSelector: '#google-pay',
  },
]);
```

### Unmounting Buttons

Unmount a single external button:

```javascript
yuno.unmountExternalButton('APPLE_PAY');
```

Or unmount all external buttons:

```javascript
yuno.unmountAllExternalButtons();
```

## Alternative: Headless Integration (Advanced)

For complete UI control, use the Headless Integration approach where you build your own payment UI and handle tokenization manually. This is ideal for merchants who need full control over the payment experience and want to build custom payment flows.

### Step 1: Initialize Headless API Client

After initializing the SDK with your public key, create a Headless API client:

```javascript
const apiClientPayment = yuno.apiClientPayment({
  country_code: "US",
  checkout_session: "438413b7-4921-41e4-b8f3-28a5a0141638"
});
```

### Step 2: Collect Payment Information

Build your own UI to collect payment information from customers. The SDK doesn't provide any UI components in Headless mode - you're responsible for:

* Card number input
* Expiration date fields
* Security code field
* Cardholder name
* Any additional required fields

### Step 3: Generate Token

Use the collected information to generate a one-time token:

#### Option A: With Card Data

```javascript
try {
  const result = await apiClientPayment.generateToken({
    checkout_session: "438413b7-4921-41e4-b8f3-28a5a0141638",
    payment_method: {
      type: "CARD",
      vaulted_token: null,
      card: {
        save: false,
        detail: {
          number: "4111111111111111",
          expiration_month: 12,
          expiration_year: 25,
          security_code: "123",
          holder_name: "ANDREA B",
          type: "CREDIT" // or "DEBIT"
        },
        installment: {
          id: "installment-id-here",
          value: 1
        }
      },
      customer: {},
      device_fingerprint: "device-fingerprint-id",
      third_party_session_id: "third-party-session-id"
    }
  });

  const oneTimeToken = result.token;
  // Use this token to create payment on your backend
} catch (error) {
  console.error("Token generation failed:", error);
}
```

#### Option B: With Vaulted Token

```javascript
try {
  const result = await apiClientPayment.generateToken({
    checkout_session: "438413b7-4921-41e4-b8f3-28a5a0141638",
    payment_method: {
      type: "CARD",
      vaulted_token: "stored-token-id",
      card: {
        detail: {
          security_code: "123"
        },
        installment: {
          id: "installment-id-here",
          value: 1
        }
      }
    }
  });

  const oneTimeToken = result.token;
  // Use this token to create payment on your backend
} catch (error) {
  console.error("Token generation failed:", error);
}
```

### Step 4: Create Payment

After generating the token, call your backend to create the payment using the [Create Payment](ref:create-payment) endpoint:

```javascript
// Call your backend
await fetch('/api/create-payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    one_time_token: oneTimeToken,
    checkout_session: checkoutSession
  })
});
```

### Step 5: Handle Asynchronous Payment Actions

For payment methods that require additional steps (3DS, redirects, etc.), use `continuePayment()`:

```javascript
const result = await yuno.continuePayment({
  showPaymentStatus: false // Handle status in your own UI
});

if (result && result.action === 'REDIRECT_URL') {
  // Handle redirect in your UI
  window.location.href = result.redirect.init_url;
}
```

### Key Parameters for `generateToken()`

| Parameter                      | Required | Description                                               |
| ------------------------------ | -------- | --------------------------------------------------------- |
| `checkout_session`             | Yes      | The checkout session ID                                   |
| `payment_method.type`          | Yes      | Payment method type (e.g., "CARD")                        |
| `payment_method.vaulted_token` | No       | Use when processing with saved payment method             |
| `card.save`                    | No       | Set to `true` to save card for future use                 |
| `card.detail`                  | Yes*     | Card information (*required when not using vaulted token) |
| `card.detail.type`             | No       | "CREDIT" or "DEBIT" (auto-detected if not provided)       |
| `card.installment`             | No       | Required only if installment plan is configured           |
| `device_fingerprint`           | No       | Required if fraud screening is configured                 |
| `third_party_session_id`       | No       | Required if third-party configuration exists              |

> 📘 Benefits of Using Vaulted Tokens
>
> When you use a vaulted token with the SDK, all the fraud information from the providers you configured in your card routing is collected and attached to the one-time token. You can also add installment information and a security code if the provider requires it.

### Headless Integration Flow

```
1. Customer enters payment info → Your custom UI
2. Submit payment data → apiClientPayment.generateToken()
3. Receive one-time token → result.token
4. Create payment → Your backend calls Yuno API
5. Handle async actions → continuePayment() if needed
6. Show payment result → Your custom UI
```
