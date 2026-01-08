---
title: New - Headless Integration
deprecated: false
hidden: true
metadata:
  robots: index
---
Headless Integration gives you complete control over your payment UI by using the SDK as a tokenization library only. This guide covers implementation details for payment and enrollment using the Headless Integration approach.

> **Note:** This is an advanced integration pattern. If you're deciding whether to use Headless Integration, see [SDK Integration Overview](sdk-integration-overview) first.

## How Headless Integration Works

Unlike standard mounting options (`mountCheckout()`, `mountCheckoutLite()`), Headless Integration provides no UI components. Instead, you:

1. Build your own forms and collect payment data
2. Call Headless SDK functions to generate tokens
3. Handle all UI, validation, and error display yourself
4. Manually manage 3DS challenges and redirects

**Key API differences:**

| Standard SDK | Headless Integration |
|--------------|---------------------|
| `mountCheckout()` / `mountCheckoutLite()` | `apiClientPayment()` |
| `startPayment()` | `generateToken()` |
| `continuePayment()` (automatic 3DS) | `getThreeDSecureChallenge()` (manual) |
| `mountEnrollmentForm()` | `apiClientEnroll()` |

## Headless Payment Integration

### Payment Workflow

The Headless payment integration follows the same conceptual workflow as standard SDK, but you handle UI and tokenization manually:

1. Create checkout session (same as standard SDK)
2. Build and display your custom payment form
3. Collect card data in your UI
4. Call `apiClientPayment.generateToken()` with card data
5. Send token to your backend
6. Backend creates payment (same as standard SDK)
7. Handle 3DS challenges manually (if required)
8. Display payment result in your UI

### Code Example

```javascript
// Initialize Headless SDK
const yuno = await Yuno.initialize(PUBLIC_API_KEY);

// Create payment client
const apiClientPayment = yuno.apiClientPayment({
  country_code: "US",
  checkout_session: checkoutSessionId
});

// User fills your custom form...
// When user submits:

try {
  // Generate token with card data from your form
  const tokenResponse = await apiClientPayment.generateToken({
    checkout_session: checkoutSessionId,
    payment_method: {
      type: "CARD",
      card: {
        detail: {
          number: cardNumberFromYourForm,
          expiration_month: expiryMonthFromYourForm,
          expiration_year: expiryYearFromYourForm,
          security_code: cvvFromYourForm,
          holder_name: nameFromYourForm,
          type: "CREDIT"
        }
      }
    }
  });

  // Send token to your backend
  const payment = await yourBackend.createPayment({
    token: tokenResponse.token,
    checkout_session: checkoutSessionId
  });

  // Check if additional action needed (3DS)
  if (payment.sdk_action_required) {
    // Get 3DS challenge URL
    const challenge = await apiClientPayment.getThreeDSecureChallenge();
    // You must redirect user to challenge.url and handle callback
  }

} catch (error) {
  // Display error in your UI
  yourCustomErrorDisplay(error);
}
```

## Headless Enrollment Integration

### Enrollment Workflow

Headless enrollment integration follows the same concept as standard enrollment, but you build the form:

1. Create customer session (same as standard enrollment)
2. Create enrollment payment method object
3. Build and display your custom enrollment form
4. Call `apiClientEnroll.continueEnrollment()` with card data
5. Receive and store vaulted token

### Code Example

```javascript
// Initialize Headless SDK
const yuno = await Yuno.initialize(PUBLIC_API_KEY);

// Create enrollment client
const apiClientEnroll = yuno.apiClientEnroll({
  country_code: "US",
  customer_session: customerSessionId
});

// User fills your custom enrollment form...
// When user submits:

try {
  // Generate vaulted token with card data from your form
  const enrollmentResponse = await apiClientEnroll.continueEnrollment({
    customer_session: customerSessionId,
    payment_method: {
      type: "CARD",
      card: {
        detail: {
          number: cardNumberFromYourForm,
          expiration_month: expiryMonthFromYourForm,
          expiration_year: expiryYearFromYourForm,
          security_code: cvvFromYourForm,
          holder_name: nameFromYourForm,
          type: "CREDIT"
        }
      }
    }
  });

  // Store vaulted token for future use
  const vaultedToken = enrollmentResponse.vaulted_token;
  await yourBackend.savePaymentMethod({
    customer_id: customerId,
    vaulted_token: vaultedToken
  });

} catch (error) {
  // Display error in your UI
  yourCustomErrorDisplay(error);
}
```

## Manual 3DS Handling

With Headless Integration, you must manually handle 3DS authentication. After creating a payment, check if `sdk_action_required` is true, then:

**Step 1: Get the 3DS challenge URL**

```javascript
// After creating payment, if sdk_action_required is true:
const challenge = await apiClientPayment.getThreeDSecureChallenge(
  checkoutSession // optional if using same session
);

// challenge.url contains the 3DS authentication page
```

**Step 2: Redirect user to challenge URL**

You have two options:

**Option 1: Full page redirect**

```javascript
// Redirect user to 3DS challenge
window.location.href = challenge.url;

// User completes 3DS
// Provider redirects back to your callback_url
// Check payment status on callback
```

**Option 2: Modal/iframe**

```javascript
// Open challenge URL in iframe/webview
const modal = openYourCustomModal();
modal.loadURL(challenge.url);

// Listen for completion
modal.onClose(() => {
  // Check payment status
  checkPaymentStatus();
});
```

**Step 3: Set callback URL**

When creating checkout session, specify where to return after 3DS:

```javascript
POST /v1/checkout/sessions
{
  "callback_url": "https://yoursite.com/payment-callback",
  // ... other fields
}
```

## Using Vaulted Tokens with Headless Integration

Pass vaulted tokens through the SDK for proper security handling:

```javascript
// Generate token using existing vaulted token
const tokenResponse = await apiClientPayment.generateToken({
  checkout_session: checkoutSessionId,
  payment_method: {
    type: "CARD",
    vaulted_token: existingVaultedToken,
    card: {
      detail: {
        security_code: cvvFromYourForm // May still need CVV
      }
    }
  }
});
```

This ensures proper device fingerprinting, 3DS handling, and fraud prevention.

## Important Limitations

**Payment Method Support:**
- ✅ Credit/Debit cards fully supported
- ⚠️ Limited support for other payment methods (varies by platform)

**Development Requirements:**

You must build and maintain:
- All input fields and validation
- Card number formatting and masking  
- Error message display
- Loading states
- 3DS redirect handling
- Payment status display

**Trade-offs:**
- Higher development effort vs. standard SDK
- More code to maintain
- Manual handling of provider requirement changes
- Testing complexity increases

> **Recommendation:** Use standard SDK mounting options unless you have specific requirements that cannot be met with SDK customization.

## Platform-Specific Headless Integration

For detailed Headless Integration implementation, see the platform-specific guides:

<Shelf classname="platform_shelf">
  <YunoCard title="Web Headless Integration" href="../docs/headless-sdk-payment" />

  <YunoCard title="iOS Headless Integration" href="../docs/headless-sdk-payment-ios" />

  <YunoCard title="Android Headless Integration" href="../docs/headless-sdk-payment-android" />
</Shelf>