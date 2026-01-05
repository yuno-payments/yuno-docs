---
title: New - Headless Integration Pattern
deprecated: false
hidden: false
metadata:
  robots: index
---
<br />

Yuno's **Headless SDK** provides complete control over your payment and enrollment UI while maintaining PCI compliance. This page explains the Headless integration pattern and when to use it.

## What is Headless SDK?

The Headless SDK is a **tokenization library** that lets you build completely custom payment experiences without Yuno UI components. Unlike the standard SDK, Headless provides:

* **No UI components** - You build all forms and interfaces
* **Direct token generation** - Call `generateToken()` with payment data
* **Complete UX control** - Design every interaction yourself
* **PCI compliance maintained** - Sensitive data never touches your server

## Headless vs. Standard SDK

| Aspect                 | Standard SDK                                   | Headless SDK                         |
| ---------------------- | ---------------------------------------------- | ------------------------------------ |
| **UI Components**      | Pre-built forms and flows                      | None - you build everything          |
| **Mounting Functions** | `mountCheckout()`, `mountCheckoutLite()`, etc. | No mounting - just `generateToken()` |
| **Payment Methods**    | All supported methods                          | Cards only (most platforms)          |
| **Integration Effort** | Low to Medium                                  | High                                 |
| **Customization**      | High                                           | Complete                             |
| **Use Case**           | Standard checkouts                             | Fully custom experiences             |

## When to Use Headless

### ✅ Use Headless When:

* You need **complete control** over every UI element
* You have **specific design requirements** that can't be met with SDK customization
* You're building a **unique checkout experience**
* You have **development resources** for custom UI implementation
* You need to **match exact brand guidelines** pixel-perfect

### ❌ Don't Use Headless When:

* Standard SDK mounting options meet your needs
* You want faster time-to-market
* You have limited frontend development resources
* You need support for multiple payment method types with pre-built UI
* You want Yuno to handle payment method display and selection

> **Recommendation:** Start with standard SDK (`mountCheckout()` or `mountCheckoutLite()`). Move to Headless only if standard options can't meet your requirements.

## Headless Payment Workflow

The Headless payment workflow gives you complete control over the payment experience while Yuno handles tokenization and processing.

<Image align="center" border={false} src="https://files.readme.io/a17409c-Diagrama_-_SDK_Headless_pago.png" />

### Component Responsibilities

#### Merchant Client (Your Frontend)

With Headless, you handle all UI responsibilities:

* Build and display custom payment forms
* Collect card information in your UI
* Validate input fields
* Call Headless SDK to generate token
* Handle errors and validation messages
* Display payment status

#### Merchant Server (Your Backend)

Your backend handles payment processing:

* Create customer (if new)
* Create checkout session
* Create payment using token from Headless SDK
* Receive payment result via webhook

#### Yuno Headless SDK

The Headless SDK only handles tokenization:

* Accept payment data from your form
* Generate one-time token
* Collect device fingerprint (for fraud prevention)
* Return token to your application

#### Yuno Server

Yuno processes the payment:

* Validate tokens
* Process payments with providers
* Send payment results via webhooks

### Headless Payment Steps

1. **Merchant Server** → Create customer → **Yuno Server**
2. **Merchant Server** → Create checkout session → **Yuno Server**
3. **Merchant Client** → Display custom payment form → **User enters card data**
4. **Merchant Client** → Call `apiClientPayment.generateToken()` → **Headless SDK**
5. **Headless SDK** → Generate one-time token → Return to **Merchant Client**
6. **Merchant Client** → Send token to → **Merchant Server**
7. **Merchant Server** → Create payment → **Yuno Server**
8. **Yuno Server** → Process payment → Payment provider
9. **Yuno Server** → Send result → **Merchant Server** (webhook)

### Key Differences from Standard SDK

With Headless payment:

* **No `mountCheckout()` or `mountCheckoutLite()`** - You build the form
* **No `startPayment()`** - You call `generateToken()` directly
* **No `continuePayment()` automation** - You handle 3DS challenge URLs manually
* **Manual error handling** - You display validation errors
* **Custom loading states** - You control all UI feedback

### Headless Payment Example

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

## Headless Enrollment Workflow

The Headless enrollment workflow allows you to build custom enrollment interfaces while Yuno handles tokenization and storage.

<Image align="center" border={false} src="https://files.readme.io/e46babd-Diagrama_-_SDK_Headless_Enroll.png" />

### Headless Enrollment Steps

1. **Merchant Server** → Create customer → **Yuno Server**
2. **Merchant Server** → Create customer session → **Yuno Server**
3. **Merchant Server** → Create enrollment payment method object → **Yuno Server**
4. **Merchant Client** → Display custom enrollment form → **User enters data**
5. **Merchant Client** → Call `apiClientEnroll.continueEnrollment()` → **Headless SDK**
6. **Headless SDK** → Generate vaulted token → Return to **Merchant Client**
7. **Merchant Client** → Store vaulted token → **Merchant Server**
8. **Yuno Server** → Process enrollment → Payment provider
9. **Yuno Server** → Send result → **Merchant Server** (webhook)

### Headless Enrollment Example

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

With Headless SDK, you must manually handle 3DS authentication challenges:

### Getting the Challenge URL

```javascript
// After creating payment, if sdk_action_required is true:
const challenge = await apiClientPayment.getThreeDSecureChallenge(
  checkoutSession // optional if using same session
);

// challenge.url contains the 3DS authentication page
```

### Handling the Redirect

You have two options:

#### Option 1: Redirect in Current Window

```javascript
// Redirect user to 3DS challenge
window.location.href = challenge.url;

// User completes 3DS
// Provider redirects back to your callback_url
// Check payment status on callback
```

#### Option 2: Open in Modal/WebView

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

### Setting Callback URL

When creating checkout session, specify where users return after 3DS:

```javascript
POST /v1/checkout/sessions
{
  "callback_url": "https://yoursite.com/payment-callback",
  // ... other fields
}
```

## Using Vaulted Tokens with Headless

Even with Headless SDK, you should tokenize vaulted tokens through the SDK:

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

**Why tokenize vaulted tokens?**

* Collects fresh device fingerprint for fraud prevention
* Handles any required 3DS authentication
* Gathers additional fields if needed by provider
* Ensures proper security protocols

## Limitations and Considerations

### Payment Method Support

Most Headless SDK implementations support:

* ✅ Credit/Debit cards
* ⚠️ Limited support for other payment methods (varies by platform)

For full payment method support, use standard SDK with `mountCheckoutLite()`.

### Development Effort

Headless requires you to build:

* ✅ All input fields and validation
* ✅ Card number formatting and masking
* ✅ Error message display
* ✅ Loading states and spinners
* ✅ 3DS redirect handling
* ✅ Payment status display

This significantly increases development time compared to standard SDK.

### Maintenance

With Headless, you're responsible for:

* Keeping up with payment provider requirement changes
* Implementing new validation rules
* Handling provider-specific edge cases
* Testing across all scenarios

Standard SDK handles these automatically via updates.

## Platform-Specific Implementation

For detailed Headless SDK implementation, see the platform-specific guides:

<Shelf classname="platform_shelf">
  <YunoCard title="Web Headless SDK" href="../docs/headless-sdk-payment" />

  <YunoCard title="iOS Headless SDK" href="../docs/headless-sdk-payment-ios" />

  <YunoCard title="Android Headless SDK" href="../docs/headless-sdk-payment-android" />
</Shelf>

## Key Takeaways

* **Complete UI control** - No Yuno components, you build everything
* **Higher complexity** - More code, more maintenance, more testing
* **Cards primarily** - Limited payment method support compared to standard SDK
* **Manual 3DS** - You handle challenge URLs and redirects
* **Use when necessary** - Only if standard SDK can't meet requirements

## Decision Framework

Use this decision tree to choose the right integration:

```
Need payment processing?
├─ Yes → Need custom payment method display?
│  ├─ No → Use mountCheckout() (automatic display)
│  └─ Yes → Can you use pre-built payment forms?
│     ├─ Yes → Use mountCheckoutLite() (custom display)
│     └─ No → Need complete form control?
│        ├─ Yes → Use Headless SDK
│        └─ No → Try Secure Fields first
└─ No → Just enrollment?
   └─ Follow same logic for enrollment functions
```

## Next Steps

* **Start with standard SDK:** Review [SDK Payment Workflow](sdk-payment-workflow)
* **Consider alternatives:** Check [Secure Fields](../docs/secure-fields-payment) for middle ground
* **Ready for Headless?** See platform-specific implementation guides above
