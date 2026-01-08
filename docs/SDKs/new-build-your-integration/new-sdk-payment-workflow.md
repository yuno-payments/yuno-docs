---
title: New - SDK Payment Workflow
deprecated: false
hidden: true
metadata:
  robots: index
---
This page explains the payment workflow when using Yuno's SDK. The core workflow is the same regardless of which mounting option you choose.

## Payment Workflow Overview

The Yuno SDK provides a **unified payment experience**, allowing customers to complete transactions using multiple payment methods through a single integration. The workflow involves coordinated interactions between your frontend (Merchant Client), your backend (Merchant Server), Yuno's servers, and the Yuno SDK.

### Standard Payment Flow

The following diagram illustrates the complete payment workflow:

<Image alt="SDK Payment Flow" border={false} src="https://files.readme.io/0b97d1a-Diagrama_-_Full_SDK.png" />

### Component Responsibilities

#### Merchant Client (Your Frontend)

Your frontend application handles the user-facing aspects of the payment flow:

* Initiate checkout
* Display payment method selection (with `mountCheckout()`, Yuno displays them automatically; with `mountCheckoutLite()` or `mountSeamlessCheckout()`, you display them in your own UI)
* Initiate SDK with checkout session
* Receive one-time token from SDK
* Trigger payment creation on your backend
* Initiate SDK to continue payment flow if needed
* Display payment result (optional)

#### Merchant Server (Your Backend)

Your backend application handles server-side operations:

* Create customer (if new)
* Create checkout session
* Create payment using one-time token
* Receive payment result via webhook

#### Yuno Server

Yuno's servers handle payment processing:

* Create and manage checkout sessions
* Process payments with payment providers
* Send payment results via webhooks

#### Yuno SDK

The SDK manages the payment UI and flow:

* Display payment method forms (based on mounting option)
* Collect payment information securely
* Generate one-time tokens
* Handle provider-specific flows (3DS, redirects, etc.)
* Show completion screens (optional)

### Complete Workflow Steps

1. **Merchant Server** → Create customer (if new) → **Yuno Server**
2. **Merchant Client** → Request checkout session → **Merchant Server**
3. **Merchant Server** → Create checkout session → **Yuno Server**
4. **Merchant Client** → Initialize SDK with checkout session → **Yuno SDK**
5. **Yuno SDK** → Display payment methods → **User selects**
6. **Yuno SDK** → Generate one-time token → Return to **Merchant Client**
7. **Merchant Client** → Send token to → **Merchant Server** _(Seamless SDK handles steps 6-8 automatically)_
8. **Merchant Server** → Create payment → **Yuno Server**
9. **Yuno Server** → Process payment → Payment provider
10. **Merchant Client** → Call `continuePayment()` if needed → **Yuno SDK**
11. **Yuno SDK** → Show additional screens (if required) → **User completes**
12. **Yuno Server** → Send payment result → **Merchant Server** (webhook)

## Payment Method Display Options

The workflow above is the same for all mounting options. The main differences are:

* How payment methods are displayed (step 5)
* Who handles payment creation (steps 6-8)

### Using `mountCheckout()`

Yuno SDK automatically displays all available payment methods based on your dashboard configuration.

```javascript
// SDK displays all payment methods
yuno.mountCheckout();

// User selects → SDK generates token → Workflow continues
```

**Payment method display:** Handled by Yuno automatically

### Using `mountCheckoutLite()`

You fetch available payment methods, display them in your UI, and mount the selected method's form.

```javascript
// You fetch payment methods from API
// You display them in your UI
// You mount the selected payment method
yuno.mountCheckoutLite({
  paymentMethodType: userSelectedMethod
});

// SDK shows form → User fills → SDK generates token → Workflow continues
```

**Payment method display:** You control which methods to show and how

### Using `mountSeamlessCheckout()`

The Seamless option handles the entire payment flow automatically. You display payment methods and mount the selected one - the SDK handles token generation and payment creation behind the scenes using the checkout session.

```javascript
// You display payment methods
// You mount selected method
yuno.mountSeamlessCheckout({
  paymentMethodType: userSelectedMethod
});

// SDK shows form → User fills → SDK handles everything automatically
```

**Payment method display:** You control  
**Payment creation:** Fully automatic (SDK handles it internally)

## Payment with Vaulted Token

If a customer has a previously enrolled payment method, you can use the vaulted token to process payments without collecting payment details again.

<Image border={false} src="https://files.readme.io/e257d04-Diagrama_-_Vaulted_token_Full.png" />

### Vaulted Token Workflow

The workflow is simplified when using a vaulted token:

1. **Merchant Server** → Create checkout session → **Yuno Server**
2. **Merchant Client** → Initialize SDK (with public key) and start checkout (with checkout session)
3. **Merchant Client** → Mount SDK with vaulted token parameter
4. **Yuno SDK** → Generate one-time token (using vaulted token)
5. **Merchant Client** → Send token to → **Merchant Server**
6. **Merchant Server** → Create payment → **Yuno Server**
7. **Yuno Server** → Process payment → Complete

### Using Vaulted Tokens

When mounting the SDK with any option, pass the `vaultedToken` parameter:

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
  vaultedToken: "stored-token-here"
});
```

> **Best Practice:** Even when using vaulted tokens, pass them through the SDK instead of directly to the API. This ensures proper 3DS handling, fraud screening, and collection of any additional required information.

## Enrolling Cards During Payment

You can save payment methods while processing a payment, without a separate enrollment flow.

### Option 1: API-Level Enrollment

Set `vault_on_success = true` when creating the payment:

```javascript
// In yunoCreatePayment callback
async yunoCreatePayment(oneTimeToken) {
  await createPayment({ 
    oneTimeToken, 
    checkoutSession,
    vault_on_success: true  // Card will be saved if payment succeeds
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
    cardSaveEnable: true  // Shows "Save card" checkbox to user
  }
});
```

**Result:** If user checks the box and payment succeeds, you'll receive a `vaulted_token`.

> **Important:** Use only ONE enrollment method. For enrolling alternative payment methods (not cards), see [Enrollment Workflow](sdk-enrollment-workflow).

### Retrieving Enrolled Payment Methods

After enrollment, retrieve saved payment methods using:

* [Get payment methods by checkout session](ref:retrieve-payment-methods-for-checkout)
* [Get payment methods by customer](ref:retrieve-enrolled-payment-methods-api)

## Asynchronous Payment Methods

Some payment methods require additional customer actions after the initial submission (e.g., 3DS authentication, bank redirects, QR code scanning).

### The `continuePayment()` Method

After creating a payment, **always** check the `sdk_action_required` field in the API response:

```javascript
async yunoCreatePayment(oneTimeToken) {
  const paymentResponse = await createPayment({ 
    oneTimeToken, 
    checkoutSession 
  });
  
  // Check if additional SDK action needed
  if (paymentResponse.sdk_action_required) {
    yuno.continuePayment({ showPaymentStatus: true });
  }
}
```

The `continuePayment()` method handles:

* 3DS authentication challenges
* Bank redirect flows
* QR code display (PIX, etc.)
* Provider-specific completion steps
* Payment status display

### Return Value

For some payment methods, `continuePayment()` returns redirect information:

```typescript
{
  action: 'REDIRECT_URL',
  type: string,
  redirect: {
    init_url: string,
    success_url: string,
    error_url: string
  }
} | null
```

When an object is returned, you can handle custom redirect flows. When `null`, no additional action is needed.

## Platform-Specific Implementation

The workflow described above applies to all platforms. For detailed implementation steps, see the platform-specific guides:

<Shelf classname="platform_shelf">
  <YunoCard title="Web SDK Payment" href="../docs/web-sdk-integrations" />

  <YunoCard title="iOS SDK Payment" href="../docs/ios-sdk-integrations" />

  <YunoCard title="Android SDK Payment" href="../docs/android-sdk-integrations" />
</Shelf>

> **Platform Implementation Patterns**
>
> **Web & Android**: Use callback functions (`yunoCreatePayment`, `callbackOTT`, etc.)  
> **iOS**: Uses delegate pattern (`YunoPaymentDelegate`) instead of callbacks  
> **All platforms**: The workflow and concepts remain the same; only the implementation syntax differs.

## Key Takeaways

* **Same workflow** regardless of mounting option - the difference is only in payment method display
* **Always use `continuePayment()`** after creating a payment to handle async methods
* **Vaulted tokens** simplify repeat payments but should still go through the SDK
* **Save during payment** is easier than separate enrollment for cards
* **One-time tokens** are single-use and tied to the checkout session
