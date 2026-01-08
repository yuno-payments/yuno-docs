---
title: New - Web SDK Payment Integration
deprecated: false
hidden: true
metadata:
  robots: index
---
This guide shows you how to integrate payment processing with Yuno's Web SDK. You'll learn about different mounting options and choose the approach that best fits your UI/UX requirements.

> 📘 Prerequisites
>
> Before starting, make sure you've [installed and initialized the SDK](doc:new-getting-started-with-web-sdk).

## Choose Your Mounting Option

The Yuno SDK offers **three mounting options** for displaying payment methods. All options use the same SDK - the difference is which function you call and how payment methods are presented to customers.

### Option A: Automatic Payment Method Display

**Use `mountCheckout()` when:**

* You want Yuno to display all available payment methods automatically
* You need a complete checkout solution with minimal frontend work
* Payment methods should update automatically from dashboard configuration

```javascript
yuno.mountCheckout();
```

**Best for:** Quick integration, standard e-commerce, marketplace checkouts

### Option B: Custom Payment Method Display

**Use `mountCheckoutLite()` when:**

* You want full control over payment method selection UI
* You need to customize which methods to display and how
* You want to integrate payment forms into your existing checkout design

```javascript
yuno.mountCheckoutLite({
  paymentMethodType: 'CARD' // You control which method to mount
});
```

**Best for:** Custom checkout experiences, branded payment flows, complex UX requirements

> 📘 Google Pay and Apple Pay in mountCheckoutLite
>
> When using `mountCheckoutLite()`, Google Pay and Apple Pay require the `mountExternalButtons()` method for display. See [Mount External Buttons](#mount-external-buttons) below.

### Option C: Seamless Flow

**Use `mountSeamlessCheckout()` when:**

* You want a simplified single-call approach with automatic payment creation
* You prefer payment creation handled via callbacks
* You want minimal integration code

```javascript
yuno.mountSeamlessCheckout({
  paymentMethodType: 'CARD' // You control which method to mount
});
```

**Best for:** Streamlined checkouts, simple payment flows, rapid implementation

### Quick Comparison

| Feature                    | `mountCheckout()`   | `mountCheckoutLite()`     | `mountSeamlessCheckout()` |
| -------------------------- | ------------------- | ------------------------- | ------------------------- |
| **Payment method display** | Yuno handles        | You control               | You control               |
| **UI control**             | High customization  | Complete control          | High customization        |
| **Google/Apple Pay**       | Built-in buttons    | External buttons required | Built-in buttons          |
| **Payment creation**       | Manual via callback | Manual via callback       | Automatic via callback    |
| **Integration effort**     | Low                 | Medium                    | Low                       |

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

- **Loader control**: `showLoading`, `hideLoader()`
- **Render mode**: `modal` vs `element`
- **Card form options**: `cardSaveEnable`, `cardNumberPlaceholder`, `hideCardholderName`, `isCreditCardProcessingOnly`, `onChange`
- **Issuer form**: `issuersFormEnable`
- **Text customization**: `texts` for button labels
- **And more**

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

### Option A: Using `mountCheckout()` - Automatic Display

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

### Option B: Using `mountCheckoutLite()` - Custom Display

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

> 📘 Google Pay and Apple Pay in Lite SDK
>
> When using `mountCheckoutLite()`, Google Pay and Apple Pay are not available as built-in payment options. To use these payment methods, you must use the `mountExternalButtons()` method. See [Mount External Buttons](#mount-external-buttons) below.

### Option C: Using `mountSeamlessCheckout()` - Seamless Flow

Similar to `mountCheckoutLite()`, but payment creation happens automatically via callbacks:

```javascript
yuno.mountSeamlessCheckout({
  paymentMethodType: 'CARD', // User's selection
  vaultedToken: 'optional-vaulted-token'
});
```

> 📘 Seamless SDK Callback Behavior
>
> When using Seamless SDK, the SDK handles token generation and payment creation behind the scenes. The `yunoCreatePayment` callback is invoked automatically after the customer completes the payment form. Your implementation should create the payment on your backend when this callback is triggered.

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

## Next Steps

- **[Enrollment Integration](doc:new-web-sdk-enrollment-integration)**: Save payment methods for future use
- **[Complementary Features](doc:new-web-sdk-complementary-features)**: Advanced configuration options
- **[Secure Fields](doc:new-web-sdk-secure-fields)**: Custom card forms with iframe security
- **[Demo App](doc:demo-app)**: Working examples and implementation reference
