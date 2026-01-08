---
title: New - Web Flow Enrollment Integration
deprecated: false
hidden: true
metadata:
  robots: index
---
This guide shows you how to enroll payment methods to customer accounts for future use. Enrollment allows you to save payment methods **without processing a payment**.

> 📘 Prerequisites
>
> Before starting, make sure you've [installed and initialized the SDK](doc:new-getting-started-with-web-sdk).

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

**[Learn about save-during-payment →](doc:new-web-sdk-payment-integration#enroll-cards-during-payment)**

> **For Cards:** Save-during-payment is usually easier. Use separate enrollment only when you need to save payment methods before a purchase.

## Step 1: Create a Customer Session

Before starting the enrollment process, create a customer session on your backend (not a checkout session):

```javascript
// Server-side: Create customer session
const customerSession = await fetch(
  "https://api-sandbox.y.uno/v1/customers/sessions",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PRIVATE_SECRET_KEY}`,
    },
    body: JSON.stringify({
      customer_id: "your-customer-id",
      country: "US",
    }),
  }
).then((res) => res.json());
```

> 📘 Customer Required
>
> First [create a customer](ref:create-customer) if you don't have one. You'll need the customer `id` to create the customer session.

## Step 2: Create an Enrollment Payment Method Object

On your backend, create an enrollment payment method object using the [Enroll Payment Method](ref:enroll-payment-method-checkout) endpoint. Define which payment method your customer can enroll:

```javascript
// Server-side: Create enrollment payment method
const enrollment = await fetch(
  `https://api-sandbox.y.uno/v1/customers/sessions/${customerSession.id}/payment-methods`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PRIVATE_SECRET_KEY}`,
    },
    body: JSON.stringify({
      type: "CARD",
      verify: { // Optional: verify card before enrollment
        enabled: true
      }
    }),
  }
).then((res) => res.json());

// Return customerSession to your client
return customerSession;
```

> 📘 Card Verification
>
> If you want to verify cards (zero-value authorization) before enrollment, include the `verify` object with `enabled: true`. This validates the card without charging the customer.

> 📘 Important
>
> The customer session and enrollment payment method object must be created on your **server-side** to keep your private API keys secure. The payment method type is set server-side, unlike other integrations where it may be set client-side.

## Step 3: Mount the Enrollment Form

On the client-side, mount the enrollment form using `yuno.mountEnrollmentLite()`:

```javascript
// Client-side: Initialize SDK
const yuno = await Yuno.initialize(PUBLIC_API_KEY);

// Mount enrollment form
yuno.mountEnrollmentLite({
  customerSession: 'e15648b0-fcd5-4799-a14c-cc463ae8a133', // From server
  country_code: 'US',
  language: 'en-US',
  elementSelector: '#enrollment-container',
  showLoading: true,
  issuersFormEnable: true,
  card: {
    type: "extends",
    styles: "",
    cardSaveEnable: false,
    texts: {},
    documentEnable: true,
    isCreditCardProcessingOnly: false, // Optional
  },
  renderMode: {
    type: "modal", // or "element"
    elementSelector: {
      apmForm: "#form-element",
      actionForm: "#action-form-element",
    },
  },
  texts: {},
  onLoading: (args) => {
    console.log(args);
  },
  yunoEnrollmentStatus: ({ status, vaultedToken }) => {
    console.log('Enrollment status:', status);
    console.log('Vaulted token:', vaultedToken);
    
    if (status === 'ENROLLED') {
      // Store vaulted token for future use
      saveVaultedToken(vaultedToken);
    }
  },
  yunoError: (error) => {
    console.log('Enrollment error:', error);
  },
});
```

### Parameters

| Parameter                         | Description                                                                                                                                                          |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customerSession`                 | Refers to the current enrollment's [customer session](ref:create-customer-session). Example: `e15648b0-fcd5-4799-a14c-cc463ae8a133`.                                 |
| `country_code`                    | Country for the enrollment process. Use an `ENUM` value; see [Country Coverage](doc:country-coverage-yuno-sdk).                                                      |
| `language`                        | Language for enrollment forms. Use any code listed in [Supported languages](doc:supported-languages). Example: `en-US`. Defaults to browser language when available. |
| `elementSelector`                 | HTML element where the Yuno SDK is mounted.                                                                                                                          |
| `showLoading`                     | Controls visibility of the Yuno loading/spinner page during the enrollment process. Default: `true`.                                                                 |
| `onLoading`                       | Required to receive notifications about server calls or loading events.                                                                                              |
| `issuersFormEnable`               | Enable the issuer's form (bank list). Default: `true`.                                                                                                               |
| `card`                            | Define specific settings for the credit card form. See [Card Form Configurations](#card-form-configurations) below.                                                  |
| `card.isCreditCardProcessingOnly` | Optional. Forces card transactions to process as credit only—useful where cards act as both credit and debit.                                                        |
| `renderMode`                      | Specify how and where the forms will be rendered. Options: `type: modal` (default) or `type: element`.                                                               |
| `texts`                           | Custom text for enrollment form buttons to match your application's language or branding.                                                                            |
| `yunoEnrollmentStatus`            | Callback after enrollment ends; receives `vaultedToken` and `status`.                                                                                                |
| `yunoError`                       | Callback invoked when there is an error in the enrollment process.                                                                                                   |

### Enrollment Status Values

The `yunoEnrollmentStatus` callback receives a `status` field with one of the following values:

* `CREATED`
* `EXPIRED`
* `REJECTED`
* `READY_TO_ENROLL`
* `ENROLL_IN_PROCESS`
* `UNENROLL_IN_PROCESS`
* `ENROLLED`
* `DECLINED`
* `CANCELED`
* `ERROR`
* `UNENROLLED`

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

**API References:**

* [Get payment methods by customer](ref:retrieve-enrolled-payment-methods-api)
* [Get payment methods by checkout session](ref:retrieve-payment-methods-for-checkout)

### Using in Future Payments

Pass the vaulted token when processing payments:

```javascript
// In payment integration
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
  `/v1/customers/${customerId}/payment-methods`,
  {
    headers: {
      Authorization: `Bearer ${PRIVATE_SECRET_KEY}`
    }
  }
).then(res => res.json());

// Display in your UI with options to:
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

## Configuration Options

The enrollment workflow supports many configuration options for customizing SDK behavior:

- **Loader control**: `showLoading`, `hideLoader()`
- **Render mode**: `modal` vs `element`
- **Card form options**: `type`, `styles`, `cardSaveEnable`, `texts`, `documentEnable`
- **Text customization**: Custom button labels
- **And more**

**For all configuration options, see [Complementary Features](doc:new-web-sdk-complementary-features).**

## Card Verification

When enrolling cards, you can optionally verify them before saving using a zero-value authorization:

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

## Supported Payment Methods

Enrollment support varies by payment method type:

| Payment Method         | Enrollment Support             |
| ---------------------- | ------------------------------ |
| **Credit/Debit Cards** | ✅ Full support                 |
| **Bank Accounts**      | ✅ Varies by provider           |
| **Digital Wallets**    | ⚠️ Limited (depends on wallet) |
| **Cash Vouchers**      | ❌ Not applicable               |
| **QR Payments**        | ❌ Not applicable               |

> **For Cards:** Both SDK enrollment and save-during-payment work well.  
> **For Other Methods:** Check specific payment method documentation for support details.

## `continuePayment` Return Value

For payment methods that require merchant-side action, the `await yuno.continuePayment()` method returns either an object or `null`:

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

When the method returns an object, it allows you to handle your application's flows that require custom redirect handling. When it returns `null`, no additional merchant-side action is needed.

## Demo App

Access the [Demo App](doc:demo-app) for a complete implementation of enrollment functionality. The demo app includes working examples and can be cloned from the [GitHub repository](https://github.com/yuno-payments/yuno-sdk-web).

## Next Steps

- **[Payment Integration](doc:new-web-sdk-payment-integration)**: Process payments with enrolled methods
- **[Complementary Features](doc:new-web-sdk-complementary-features)**: Advanced configuration options
- **[Secure Fields](doc:new-web-sdk-secure-fields-integration)**: Alternative for custom card forms

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

### Can I enroll payment methods without SDK?

See the Headless Enrollment section below for complete UI control. For API-only enrollment (requires PCI compliance), contact Yuno support.

### Do I need both enrollment and payment integration?

No. You only need enrollment if you want to save payment methods separately from purchases. Many merchants only implement payment with the save-during-payment option.

## Alternative: Headless Enrollment (Advanced)

For complete UI control, use the Headless Enrollment approach where you build your own enrollment UI and handle tokenization manually. This is ideal for merchants who need full control over the enrollment experience.

> 📘 When to Use Headless Enrollment
>
> Use Headless Enrollment when you need to:
> * Build a completely custom enrollment UI
> * Integrate enrollment into non-standard interfaces
> * Have full control over payment method presentation
> * Handle tokenization manually without SDK UI components

### Step 1: Create Customer Session

Before starting enrollment, create a customer session on your backend:

```javascript
// Server-side
const customer = await createCustomer({
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com"
});

const customerSession = await createCustomerSession({
  customer_id: customer.id,
  country: "US"
});
```

### Step 2: Create Enrollment Payment Method Object

Create an enrollment payment method object using the [Enroll Payment Method](ref:enroll-payment-method-checkout) endpoint:

```javascript
// Server-side
const enrollmentObject = await enrollPaymentMethod({
  customer_session: customerSession.id,
  payment_method_type: "CARD"
});
```

> 🚧 Card Verification
>
> To verify cards (zero value authorization) before enrollment, include the `verify` object when creating the payment method object.

### Step 3: Initialize Headless API Client

After initializing the SDK with your public key, create a Headless enrollment client:

```javascript
const apiClientEnroll = yuno.apiClientEnroll({
  country_code: "US",
  customer_session: "cus_ses_123456"
});
```

### Step 4: Collect Payment Information

Build your own UI to collect payment information from customers. The SDK doesn't provide any UI components in Headless mode - you're responsible for:

* Card number input
* Expiration date fields
* Security code field
* Cardholder name
* Any additional required fields

### Step 5: Generate Vaulted Token

Use the collected information to enroll the payment method:

```javascript
try {
  const result = await apiClientEnroll.continueEnrollment({
    customer_session: "cus_ses_123456",
    payment_method: {
      type: "CARD",
      card: {
        detail: {
          number: "4111111111111111",
          expiration_month: 12,
          expiration_year: 25,
          security_code: "123",
          holder_name: "JOHN DOE",
          type: "CREDIT" // or "DEBIT"
        }
      },
      customer: {},
      device_fingerprint: "device-fingerprint-id"
    }
  });

  const vaultedToken = result.vaulted_token;
  // Save this token for future payments
} catch (error) {
  console.error("Enrollment failed:", error);
}
```

### Step 6: Handle Asynchronous Enrollment Actions

For payment methods that require additional verification steps (3DS, etc.), handle the continuation:

```javascript
if (apiClientEnroll.shouldContinue) {
  try {
    const continueResult = await apiClientEnroll.continueEnrollment();
    // Handle enrollment completion
  } catch (error) {
    console.error("Continue enrollment failed:", error);
  }
}
```

### Key Parameters for `continueEnrollment()`

| Parameter | Required | Description |
|-----------|----------|-------------|
| `customer_session` | Yes | The customer session ID |
| `payment_method.type` | Yes | Payment method type (currently only "CARD" supported) |
| `card.detail` | Yes | Card information including number, expiration, security code, holder name |
| `card.detail.type` | No | "CREDIT" or "DEBIT" (auto-detected if not provided) |
| `device_fingerprint` | No | Required if fraud screening is configured |

### Response Structure

The `continueEnrollment()` method returns:

```json
{
  "vaulted_token": "vtk_abc123def456",
  "type": "CARD",
  "card_data": {
    "holder_name": "JOHN DOE",
    "iin": "41111111",
    "lfd": "1111",
    "brand": "VISA",
    "type": "CREDIT",
    "issuer_name": "JPMORGAN CHASE BANK N A"
  }
}
```

### Headless Enrollment Flow

```
1. Create customer session → Your backend
2. Create enrollment object → Your backend
3. Customer enters card info → Your custom UI
4. Submit enrollment data → apiClientEnroll.continueEnrollment()
5. Receive vaulted token → result.vaulted_token
6. Handle verification → continueEnrollment() if needed
7. Save vaulted token → Your backend/database
```

## Stay Updated

Visit the [changelog](https://docs.y.uno/changelog) for the latest SDK updates and version history.