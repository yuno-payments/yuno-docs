---
title: NEW - SDK Enrollment Workflow
deprecated: false
hidden: true
metadata:
  robots: index
---
This page explains how to enroll payment methods to customer accounts for future use. Enrollment allows you to save payment methods **without processing a payment**.

## What is Enrollment?

Enrollment (also called vaulting or tokenization) saves a customer's payment method information securely for future transactions. This enables:

* **One-click checkout** - Customers don't re-enter payment details
* **Subscription billing** - Charge saved methods automatically
* **Faster checkout** - Reduce friction for returning customers
* **Multiple payment methods** - Customers can save several options

## Enrollment vs. Save During Payment

There are **two ways** to save payment methods:

### Option 1: Separate Enrollment (This Page)

Use the enrollment workflow when:

* You want to save payment methods WITHOUT processing a payment
* You're setting up customer accounts before first purchase
* You're building a payment method management interface
* You need to enroll alternative payment methods (not just cards)

**Uses:** Customer session + enrollment API

### Option 2: Save During Payment

Use save-during-payment when:

* Customer is already making a purchase
* You want to save cards only (simpler approach)
* You don't need a separate enrollment UI

**Uses:** `vault_on_success: true` or `cardSaveEnable` checkbox

**[Learn about save-during-payment →](sdk-payment-workflow#enrolling-cards-during-payment)**

> **For Cards:** Save-during-payment is usually easier. Use separate enrollment only when you need to save payment methods before a purchase or need enrollment-specific features.

## Enrollment Workflow Overview

The enrollment workflow involves creating a customer session (not checkout session) and using SDK enrollment functions to save payment methods.

<Image border={false} src="https://files.readme.io/deacb45-Diagrama_-_SDK_Lite_enrollment.png" />

### Component Responsibilities

#### Merchant Client (Your Frontend)

Your frontend handles the enrollment user interface:

* Display "Add payment method" UI
* Show available payment methods to enroll
* Collect user's payment method selection
* Initialize SDK enrollment flow
* Display enrollment result

#### Merchant Server (Your Backend)

Your backend coordinates the enrollment process:

* Create customer (if new)
* Create customer session (not checkout session)
* Create enrollment payment method object
* Receive enrollment result via webhook

#### Yuno Server

Yuno's servers handle enrollment processing:

* Create and manage customer sessions
* Process enrollment with payment providers
* Store vaulted tokens securely
* Send enrollment results via webhooks

#### Yuno SDK

The SDK manages enrollment UI and flow:

* Display payment method enrollment forms
* Collect payment information securely
* Submit enrollment to Yuno
* Show verification screens (if required)
* Display enrollment result (optional)

### Complete Enrollment Steps

1. **Merchant Server** → Create customer (if new) → **Yuno Server**
2. **Merchant Client** → Request customer session → **Merchant Server**
3. **Merchant Server** → Create customer session → **Yuno Server**
4. **Merchant Server** → Create enrollment payment method object → **Yuno Server**
5. **Merchant Client** → Display enrollment options → **User selects method**
6. **Merchant Client** → Initialize SDK enrollment → **Yuno SDK**
7. **Yuno SDK** → Display enrollment form → **User fills details**
8. **Yuno SDK** → Submit enrollment → **Yuno Server**
9. **Yuno Server** → Process enrollment → Payment provider
10. **Yuno Server** → Send enrollment result → **Merchant Server** (webhook)
11. **Yuno SDK** → Display enrollment result → **User sees confirmation**

## Key Differences from Payment Workflow

| Aspect            | Payment Workflow                           | Enrollment Workflow                          |
| ----------------- | ------------------------------------------ | -------------------------------------------- |
| **Session Type**  | Checkout session                           | Customer session                             |
| **API Endpoint**  | Create checkout session                    | Create customer session                      |
| **SDK Functions** | `mountCheckout()` or `mountCheckoutLite()` | `mountEnrollmentForm()` (varies by platform) |
| **Purpose**       | Process a payment                          | Save for future use                          |
| **Result**        | Payment status + optional vaulted token    | Vaulted token                                |
| **Verification**  | Payment amount charged                     | Optional zero-value auth                     |

## Enrollment Mounting Options

Similar to payment processing, you have options for displaying enrollment:

### Automatic Display

The SDK displays all available enrollment options:

```javascript
// SDK shows all enrollment options automatically
yuno.mountEnrollmentForm();
```

**Best for:** Simple enrollment UI, letting Yuno handle the display

### Custom Display

You control which payment methods to offer for enrollment:

```javascript
// You display enrollment options
// User selects which method to enroll
// You mount the enrollment form for selected method
yuno.mountEnrollmentFormLite({
  paymentMethodType: userSelectedMethod
});
```

**Best for:** Custom enrollment flows, specific payment method offerings

> **Note:** The specific function names vary by platform. See platform-specific guides for exact implementation.

## Card Verification

When enrolling cards, you can optionally verify them before saving using a zero-value authorization (also called card verification or $0 auth).

### How Verification Works

1. Merchant creates enrollment with `verify` object
2. SDK collects card information
3. Yuno performs zero-value authorization with card issuer
4. Card is validated without charging customer
5. Authorization is immediately reversed
6. Card is saved if verification succeeds

### Implementing Verification

Configure verification when creating the enrollment payment method object:

```javascript
// Server-side: Create enrollment with verification
POST /v1/customers/sessions/{session_id}/payment-methods
{
  "type": "CARD",
  "verify": {
    "enabled": true
  }
}
```

**When to use verification:**

* You want to ensure card is valid before saving
* You need to detect invalid/expired cards early
* Your business requires card validation

**When to skip verification:**

* First payment will happen immediately after enrollment
* You want to minimize friction
* Verification is handled during first payment

## Using Enrolled Payment Methods

After successful enrollment, you receive a `vaulted_token` that represents the saved payment method.

### Retrieving Vaulted Tokens

Get enrolled payment methods for a customer:

```javascript
// Get by customer ID
GET /v1/customers/{customer_id}/payment-methods

// Get by checkout session (for payment)
GET /v1/checkout/sessions/{checkout_session}/payment-methods
```

### Using in Future Payments

Pass the vaulted token when processing payments:

```javascript
// In payment flow
yuno.mountCheckout({
  vaultedToken: "enrolled-token-here"
});

// Or with custom display
yuno.mountCheckoutLite({
  paymentMethodType: "CARD",
  vaultedToken: "enrolled-token-here"
});
```

> **Best Practice:** Always use vaulted tokens through the SDK, not directly in API calls. This ensures proper 3DS handling, fraud screening, and collection of any required fields.

## Managing Enrolled Payment Methods

Customers typically need to manage their saved payment methods:

### Display Saved Methods

Fetch and display enrolled payment methods in your UI:

```javascript
// Fetch customer's saved methods
const paymentMethods = await fetch(
  `/v1/customers/${customerId}/payment-methods`
);

// Display in your UI with option to:
// - Set as default
// - Delete/unenroll
// - Use for payment
```

### Unenroll (Remove) Payment Methods

Allow customers to remove saved payment methods:

```javascript
// Delete a saved payment method
DELETE /v1/customers/{customer_id}/payment-methods/{vaulted_token}
```

Some SDKs also provide built-in unenroll functionality in the UI.

## Supported Payment Methods

Enrollment support varies by payment method type:

| Payment Method         | Enrollment Support             |
| ---------------------- | ------------------------------ |
| **Credit/Debit Cards** | ✅ Full support                 |
| **Bank Accounts**      | ✅ Varies by provider           |
| **Digital Wallets**    | ⚠️ Limited (depends on wallet) |
| **Cash Vouchers**      | ❌ Not applicable               |
| **QR Payments**        | ❌ Not applicable               |

> **For Cards:** Both standard SDK enrollment and save-during-payment work well.  
> **For Other Methods:** Check platform-specific documentation for support details.

## Platform-Specific Implementation

The workflow described above applies to all platforms. For detailed implementation steps, see the platform-specific guides:

<Shelf classname="platform_shelf">
  <YunoCard title="Web SDK Enrollment" href="../docs/web-sdk-integrations" />

  <YunoCard title="iOS SDK Enrollment" href="../docs/ios-sdk-integrations" />

  <YunoCard title="Android SDK Enrollment" href="../docs/android-sdk-integrations" />
</Shelf>

## Key Takeaways

* **Enrollment saves without payment** - Use when you need to save methods before a purchase
* **Customer session (not checkout)** - Enrollment uses different session type than payments
* **Verification is optional** - Zero-value auth validates cards but adds friction
* **Vaulted tokens through SDK** - Always use tokens via SDK for proper security handling
* **Manage enrolled methods** - Provide UI for customers to view/delete saved methods

## Common Questions

### When should I use enrollment vs. save-during-payment?

**Use enrollment when:**

* Setting up customer accounts before first purchase
* Building payment method management UI
* Need to enroll non-card payment methods

**Use save-during-payment when:**

* Customer is already making a purchase
* Only need to save cards
* Want simplest implementation

### Do I need both enrollment and payment integration?

No. You only need enrollment if you want to save payment methods separately from purchases. Many merchants only implement payment with save-during-payment option.

### Can I enroll payment methods without SDK?

For cards, use headless integration for complete UI control (see each flow's documentation for details). For API-only enrollment (requires PCI compliance), contact Yuno support.
