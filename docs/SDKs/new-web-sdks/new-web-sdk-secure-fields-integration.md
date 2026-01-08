---
title: New - Secure Fields
deprecated: false
hidden: true
metadata:
  robots: index
---

Secure Fields allow you to build completely custom card payment forms while maintaining PCI compliance. Use iframe-based secure fields for card number, expiration, and CVV.

> **This is a Web-only, card-only alternative to standard SDK mounting options.**

> 📘 Prerequisites
>
> Before starting, make sure you've [installed and initialized the SDK](doc:new-getting-started-with-web-sdk).

## When to Use Secure Fields

**Use Secure Fields when:**

- You need custom card form layouts
- Standard SDK card forms don't fit your design
- You want PCI compliance without managing card data

**Don't use Secure Fields when:**

- Standard SDK card forms work → Use [Payment Integration](doc:new-web-sdk-payment-integration) with `mountCheckout()` or `mountCheckoutLite()`
- You need non-card payment methods → Use [Payment Integration](doc:new-web-sdk-payment-integration)
- You need complete control over everything → Use [Headless Integration](doc:new-headless-integration-pattern)

## How It Works

Secure Fields provides iframe-based input components:

- Card number field (iframe)
- Expiration field (iframe)
- CVV field (iframe)

You build the form layout, style the iframes, and Secure Fields handles tokenization.

> **For standard card forms:** See [Payment Integration](doc:new-web-sdk-payment-integration)  
> **For complete control:** See [Headless Integration](doc:new-headless-integration-pattern)

## Payment with Secure Fields

Use Secure Fields to collect card information and process payments with your custom UI.

### Create a Checkout Session

Before starting the payment process, create a `checkout_session` using the [Create Checkout Session](ref:create-checkout-session) endpoint.

### Step 1: Configure Secure Fields

Initialize Secure Fields with your checkout session and country code:

```javascript
const secureFields = yuno.secureFields({
  countryCode: 'US',
  checkoutSession: '438413b7-4921-41e4-b8f3-28a5a0141638',
  installmentEnable: false // Optional: enable installment selection
});
```

#### Configuration Parameters

| Parameter           | Required | Description                                                                                                  |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `countryCode`       | Yes      | Country code for the payment. See [Country coverage](doc:country-coverage-yuno-sdk) for supported countries. |
| `checkoutSession`   | Yes      | Checkout session token from your backend.                                                                    |
| `installmentEnable` | No       | Enable installment selection field. Default: `false`.                                                        |

### Step 2: Create and Mount Secure Fields

Create individual secure fields for card number, expiration date, and CVV, then mount them to your HTML elements:

```javascript
// Card Number Field
const secureNumber = secureFields.create({
  name: 'pan',
  options: {
    placeholder: '0000 0000 0000 0000',
    styles: `
      input {
        font-size: 16px;
        color: #333;
        padding: 12px;
      }
    `,
    label: 'Card Number',
    showError: true,
    errorMessage: 'Please enter a valid card number',
    validateOnBlur: true,
    onChange: ({ error, data }) => {
      if (error) {
        console.log('Card number error');
      } else {
        console.log('Card number valid');
        // data contains card IIN info and installment options
        console.log('Card brand:', data?.cardIIN?.brand);
        console.log('Installments:', data?.installments);
      }
    },
    onBlur: () => console.log('Card number field blurred'),
    onFocus: () => console.log('Card number field focused'),
    onRenderedSecureField: () => console.log('Card number field rendered')
  }
});

secureNumber.render('#card-number');

// Expiration Date Field
const secureExpiration = secureFields.create({
  name: 'expiration',
  options: {
    placeholder: 'MM / YY',
    styles: `
      input {
        font-size: 16px;
        color: #333;
        padding: 12px;
      }
    `,
    label: 'Expiration Date',
    showError: true,
    errorMessage: 'Please enter a valid expiration date',
    onChange: ({ error }) => {
      if (error) {
        console.log('Expiration error');
      } else {
        console.log('Expiration valid');
      }
    }
  }
});

secureExpiration.render('#expiration');

// CVV Field
const secureCvv = secureFields.create({
  name: 'cvv',
  options: {
    placeholder: 'CVV',
    styles: `
      input {
        font-size: 16px;
        color: #333;
        padding: 12px;
      }
    `,
    label: 'CVV',
    showError: true,
    errorMessage: 'Please enter a valid CVV',
    onChange: ({ error }) => {
      if (error) {
        console.log('CVV error');
      } else {
        console.log('CVV valid');
      }
    }
  }
});

secureCvv.render('#cvv');
```

#### Field Configuration Options

| Option                  | Description                                                                  |
| ----------------------- | ---------------------------------------------------------------------------- |
| `name`                  | Field type: `'pan'` (card number), `'expiration'`, or `'cvv'`.               |
| `placeholder`           | Placeholder text displayed in the field.                                     |
| `styles`                | CSS styles injected into the iframe. Customize appearance with standard CSS. |
| `label`                 | Label text for the field.                                                    |
| `showError`             | Whether to display error messages. Default: `false`.                         |
| `errorMessage`          | Custom error message to display when validation fails.                       |
| `validateOnBlur`        | Validate the field when it loses focus. Default: `false`.                    |
| `inputMode`             | Keyboard type on mobile: `'numeric'` (default) or `'text'`. (v1.2+)          |
| `onChange`              | Callback triggered when field value changes. Receives `{error, data}`.       |
| `onBlur`                | Callback triggered when field loses focus.                                   |
| `onFocus`               | Callback triggered when field gains focus.                                   |
| `onRenderedSecureField` | Callback triggered when the field finishes rendering.                        |

#### onChange Data

The `onChange` callback provides additional information in the `data` parameter:

* **Card IIN Information**: Card brand, issuer, type (credit/debit)
* **Installment Plans**: Available installment options (if `installmentEnable: true`)
* **Loading States**: `isCardIINLoading`, `isInstallmentLoading` flags

<div
  style={{
  backgroundColor: "#FFFFFF",
  padding: "16px",
  display: "flex",
  justifyContent: "center",
  borderRadius: "14px",
  maxWidth: "500px",
  margin: "auto"
}}
>
  <Image align="center" src="https://files.readme.io/9cca28f-secure-fields-checkout-sdk-1.gif" width="500px" />
</div>

### Step 3: Generate One-Time Token

When the user submits the form, generate a one-time token:

```javascript
const handlePayment = async () => {
  try {
    const oneTimeToken = await secureFields.generateToken({
      cardHolderName: 'John Doe',
      saveCard: false, // Optional: save card for future use
      customer: {
        document: {
          document_number: '123456789',
          document_type: 'ID'
        }
      },
      cardType: 'CREDIT' // Optional: specify CREDIT or DEBIT for dual cards
    });

    console.log('One-time token:', oneTimeToken);
    
    // Send token to your backend
    await createPaymentOnBackend(oneTimeToken);
    
  } catch (error) {
    console.error('Token generation failed:', error);
  }
};
```

#### Token Generation Parameters

| Parameter         | Required | Description                                                                     |
| ----------------- | -------- | ------------------------------------------------------------------------------- |
| `cardHolderName`  | Yes      | Name of the cardholder.                                                         |
| `saveCard`        | No       | Save card for future payments. Requires `customer_session` in checkout session. |
| `vaultedToken`    | No       | Use a previously saved card token instead of collecting new card details.       |
| `installment`     | No       | Selected installment plan (if `installmentEnable: true`).                       |
| `customer`        | No       | Customer information including document details.                                |
| `cardType`        | No       | Specify `'CREDIT'` or `'DEBIT'` for dual cards (e.g., Brazil).                  |
| `checkoutSession` | No       | Use a different checkout session (for retry scenarios).                         |

#### Get Token with Additional Information

To receive extended token information:

```javascript
const tokenWithInfo = await secureFields.generateTokenWithInformation({
  cardHolderName: 'John Doe',
  saveCard: true,
  customer: {
    document: {
      document_number: '123456789',
      document_type: 'ID'
    }
  }
});

console.log('Token:', tokenWithInfo.token);
console.log('Card brand:', tokenWithInfo.cardData?.brand);
console.log('Installments:', tokenWithInfo.installment);
```

### Step 4: Create the Payment

Use the one-time token to create a payment on your backend using the [Create Payment endpoint](ref:create-payment):

```javascript
const payment = await createPaymentOnBackend({
  oneTimeToken,
  checkoutSession
});

// Handle SDK actions if required
if (payment.checkout.sdk_action_required) {
  await yuno.continuePayment();
} else {
  // Show payment status
  yuno.mountStatusPayment({
    checkoutSession: checkoutSession,
    countryCode: 'US',
    language: 'en',
    yunoPaymentResult: (data) => {
      console.log('Payment result:', data);
    }
  });
}
```

> 📘 Continue Payment
>
> Always call `yuno.continuePayment()` when `sdk_action_required` is true. This handles additional steps like 3D Secure challenges or redirects.

***

## Enrollment with Secure Fields

Use Secure Fields to save payment methods for future use without processing a payment.

### Create Required Sessions

Before enrolling, you need:

1. **Customer**: Create using [Create Customer](ref:create-customer) endpoint
2. **Customer Session**: Create using [Create Customer Session](ref:create-customer-session) endpoint
3. **Payment Method Object**: Create using [Enroll Payment Method](ref:enroll-payment-method-checkout) endpoint

> 📘 Card Verification
>
> To verify cards with zero-value authorization before enrollment, include the `verify` object when creating the payment method object.

### Step 1: Configure Secure Fields for Enrollment

Initialize Secure Fields with your customer session:

```javascript
const secureFields = yuno.secureFields({
  countryCode: 'US',
  customerSession: 'eec6578e-ac2f-40a0-8065-25b5957f6dd3'
});
```

### Step 2: Create and Mount Secure Fields

Create the same secure fields as in the payment flow (see [Step 2 above](#step-2-create-and-mount-secure-fields)).

> 📘 Enrollment for Payouts
>
> If enrolling a card for payouts, you only need the card number field (`pan`). You can skip the expiration and CVV fields.

### Step 3: Generate Vaulted Token

When the user submits the form, generate a vaulted token:

```javascript
const handleEnrollment = async () => {
  try {
    const vaultedToken = await secureFields.generateVaultedToken({
      cardHolderName: 'John Doe',
      customer: {
        document: {
          document_number: '123456789',
          document_type: 'ID'
        }
      }
    });

    console.log('Vaulted token:', vaultedToken);
    console.log('Card saved successfully!');
    
  } catch (error) {
    console.error('Enrollment failed:', error);
  }
};
```

#### Get Vaulted Token with Additional Information

To receive extended enrollment information:

```javascript
const vaultedTokenWithInfo = await secureFields.generateVaultedTokenWithInformation({
  cardHolderName: 'John Doe',
  customer: {
    document: {
      document_number: '123456789',
      document_type: 'ID'
    }
  }
});

console.log('Vaulted token:', vaultedTokenWithInfo.vaulted_token);
console.log('Status:', vaultedTokenWithInfo.status);
console.log('Provider:', vaultedTokenWithInfo.provider);
```

***

## Field Management Methods

Secure Fields provide utility methods for enhanced user experience:

### Clear Field Value

Clear the value entered in a specific field:

```javascript
const secureNumber = secureFields.create({...});
secureNumber.render('#card-number');

// Clear the field
secureNumber.clearValue();
```

### Set Focus on Field

Programmatically focus on a specific field:

```javascript
const secureNumber = secureFields.create({...});
secureNumber.render('#card-number');

// Focus the field
secureNumber.focus();
```

### Force Validation

Manually trigger validation for a field:

```javascript
const secureNumber = secureFields.create({...});
secureNumber.render('#card-number');

// Validate the field
secureNumber.validate();
```

### Set Custom Error Message

Display a custom error message on a field:

```javascript
const secureNumber = secureFields.create({...});
secureNumber.render('#card-number');

// Set custom error
secureNumber.setError('This card is not accepted');
```

### Set Card Type

Specify the card type for dual cards (cards that can be used as credit or debit):

```javascript
const secureNumber = secureFields.create({...});
secureNumber.render('#card-number');

// Set as credit card
secureNumber.setCardType('CREDIT');

// Or set as debit card
secureNumber.setCardType('DEBIT');
```

***

## Retry Failed Payments

If a transaction is rejected, you can persist card data to retry without re-entering card details:

### Step 1: Generate Token with Information

Use `generateTokenWithInformation` to preserve card data:

```javascript
const tokenWithInfo = await secureFields.generateTokenWithInformation({
  checkoutSession: 'original_checkout_session'
});
```

### Step 2: Handle Rejection

If the transaction fails:

1. Create a new checkout session on your backend
2. Generate a new token with the new checkout session:

```javascript
const newToken = await secureFields.generateTokenWithInformation({
  checkoutSession: 'new_checkout_session' // New checkout session
  // Card data is already captured in the secure fields
});
```

3. Create payment with the new token

***

## TypeScript Configuration

To use TypeScript with Secure Fields:

### Install Type Definitions

```bash
npm install @yuno-payments/sdk-web-types
```

### Configure tsconfig.json

```json
{
  "compilerOptions": {
    "types": ["@yuno-payments/sdk-web-types"]
  }
}
```

### Use in Your Code

```typescript
import { YunoInstance } from '@yuno-payments/sdk-web-types/dist/types';

const yunoInstance: YunoInstance = await Yuno.initialize('YOUR_API_KEY');
```

***

## Complete Implementation Example

Here's a complete example combining all the steps:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Yuno Secure Fields Payment</title>
  <script src="https://sdk-web.y.uno/v1.5/main.js"></script>
  <style>
    .field-container {
      margin-bottom: 20px;
    }
    .field-label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    #card-number,
    #expiration,
    #cvv {
      height: 50px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .error {
      color: red;
      font-size: 14px;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <form id="payment-form">
    <div class="field-container">
      <label class="field-label">Card Number</label>
      <div id="card-number"></div>
    </div>

    <div class="field-container">
      <label class="field-label">Expiration Date</label>
      <div id="expiration"></div>
    </div>

    <div class="field-container">
      <label class="field-label">CVV</label>
      <div id="cvv"></div>
    </div>

    <div class="field-container">
      <label class="field-label">Cardholder Name</label>
      <input type="text" id="cardholder-name" required />
    </div>

    <button type="submit">Pay Now</button>
  </form>

  <script>
    (async () => {
      // Initialize SDK
      const yuno = await Yuno.initialize('YOUR_PUBLIC_API_KEY');

      // Get checkout session from your backend
      const checkoutSession = await fetchCheckoutSession();

      // Configure Secure Fields
      const secureFields = yuno.secureFields({
        countryCode: 'US',
        checkoutSession: checkoutSession
      });

      // Create and mount card number field
      const secureNumber = secureFields.create({
        name: 'pan',
        options: {
          placeholder: '0000 0000 0000 0000',
          styles: `
            input {
              width: 100%;
              height: 50px;
              font-size: 16px;
              padding: 12px;
              border: none;
              outline: none;
            }
          `,
          showError: true,
          validateOnBlur: true,
          onChange: ({ error, data }) => {
            if (!error && data?.cardIIN) {
              console.log('Card brand:', data.cardIIN.brand);
            }
          }
        }
      });
      secureNumber.render('#card-number');

      // Create and mount expiration field
      const secureExpiration = secureFields.create({
        name: 'expiration',
        options: {
          placeholder: 'MM / YY',
          styles: `
            input {
              width: 100%;
              height: 50px;
              font-size: 16px;
              padding: 12px;
              border: none;
              outline: none;
            }
          `,
          showError: true,
          validateOnBlur: true
        }
      });
      secureExpiration.render('#expiration');

      // Create and mount CVV field
      const secureCvv = secureFields.create({
        name: 'cvv',
        options: {
          placeholder: 'CVV',
          styles: `
            input {
              width: 100%;
              height: 50px;
              font-size: 16px;
              padding: 12px;
              border: none;
              outline: none;
            }
          `,
          showError: true,
          validateOnBlur: true
        }
      });
      secureCvv.render('#cvv');

      // Handle form submission
      document.getElementById('payment-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const cardholderName = document.getElementById('cardholder-name').value;

        try {
          // Generate one-time token
          const oneTimeToken = await secureFields.generateToken({
            cardHolderName: cardholderName,
            saveCard: false
          });

          console.log('Token generated:', oneTimeToken);

          // Create payment on your backend
          const payment = await createPaymentOnBackend({
            oneTimeToken,
            checkoutSession
          });

          // Handle SDK actions if required
          if (payment.checkout.sdk_action_required) {
            await yuno.continuePayment();
          } else {
            // Show success message
            alert('Payment successful!');
          }

        } catch (error) {
          console.error('Payment failed:', error);
          alert('Payment failed. Please try again.');
        }
      });
    })();

    // Helper function to create payment on backend
    async function createPaymentOnBackend({ oneTimeToken, checkoutSession }) {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oneTimeToken, checkoutSession })
      });
      return response.json();
    }

    // Helper function to get checkout session from backend
    async function fetchCheckoutSession() {
      const response = await fetch('/api/checkout-session');
      const data = await response.json();
      return data.checkoutSession;
    }
  </script>
</body>
</html>
```

***

## Next Steps

* **[SDK Customizations](doc:sdk-customizations)** - Customize the SDK appearance
* **[Payment Status](doc:payment-status)** - Display payment status to users
* **[Demo App](doc:demo-app)** - See a complete working example

> 📘 Demo App
>
> For a complete implementation example, visit the [Demo App](doc:demo-app) or clone the [GitHub repository](https://github.com/yuno-payments/yuno-sdk-web).

## Stay Updated

Visit the [changelog](https://docs.y.uno/changelog) for the latest SDK updates and version history.
