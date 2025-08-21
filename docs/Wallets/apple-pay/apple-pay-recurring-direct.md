---
title: Recurring Apple Pay Payments (Direct Integration)
excerpt: ""
deprecated: false
hidden: true
metadata:
  title: ""
  description: ""
  robots: index
next:
  description: ""
---

This guide covers how to implement recurring Apple Pay payments using Yuno's direct integration. Recurring payments involve two types of transactions: Customer Initiated Transactions (CIT) and Merchant Initiated Transactions (MIT).

> 📘 Setup Required
>
> Before following this guide, ensure you have completed the [dashboard setup and configuration](doc:apple-pay-setup-configuration) process.

## Recurring payments overview

Recurring Apple Pay payments consist of two distinct transaction types that work together to enable automated billing:

1. **Customer Initiated Transaction (CIT)** - The initial setup transaction
2. **Merchant Initiated Transaction (MIT)** - Subsequent automated payments

## Customer initiated transaction (CIT)

The **CIT** is the first transaction where the customer actively participates and authorizes the payment. This transaction requires customer interaction and sets up the recurring payment agreement by generating a payment token for future use.

### CIT request example

```json
{
  "country": "US",
  "amount": {
    "currency": "USD",
    "value": 100
  },
  "customer_payer": {
    "merchant_customer_validations": {
      "account_is_verified": true,
      "email_is_verified": true,
      "phone_is_verified": true
    }
  },
  "workflow": "DIRECT",
  "payment_method": {
    "vault_on_success": true,
    "detail": {
      "wallet": {
        "payment_token": "{\"paymentMethod\":{\"type\":\"credit\",\"displayName\":\"Visa 1234\",\"network\":\"Visa\"},\"paymentData\":{\"data\":\"+yWYyldI/H0kAvZOTQL/y0vRKYoWPGWK54TN5xiBUK7EdZhMDvlWaX88n1yXJdKzcW7arzqmckP5rjx7hGsYP3oF5VJW4OhElkSdPWsvWqnCzUmUz6BTmT3HBwI5gJBjGoIUG79UkBP+dRbpVCEcTd6Zr3d/jE7Uu6Q+6XMhMzkKwfPuNGrTzSFPQcOX5z8xNmnFiZwjXE42LsM4+INhzkzUvW7AfugmpU+aoPS8L6bcoMSwy0jalxraAMwxUQUNbxFdTe78F9Ftryr03kHWIDI7pvCSMHmT/skC6ha425x0zSPrrvoQtJVbR7lZEsHiaqsIyP7Qgfn3iPrdaEg/nx2WIgW+SrFAqsgOCauh6WRo7KjU5+M9AFpJXyByYPmnwqo14trsSZq25iVc0dS99EweperG5E+FCRiTNrSf1Xk=\",\"signature\":\"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\",\"header\":{\"publicKeyHash\":\"h/mfJj19xShja2t1Wfto4BiaaOuRaF/Fj5tAHHkjZUo=\",\"ephemeralPublicKey\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEuW/NN1h3s5rQFiOOfXH7VpiPy4Twbyiy4um/5XJcRlwcRuRfy2574VFMKk4FKalyXZC/J4/hcq/taS8yImRBYg==\",\"transactionId\":\"dcba2ab36bdf5f7131ea1c8c590039a95038cb528cf6d6c8a4326e7b8853dca3\"},\"version\":\"EC_v1\"},\"transactionIdentifier\":\"dcba2ab36bdf5f7131ea1c8c590039a95038cb528cf6d6c8a4326e7b8853dca3\"}"
      }
    },
    "type": "APPLE_PAY",
    "stored_credentials": {
      "reason": "SUBSCRIPTION",
      "usage": "FIRST",
      "subscription_agreement_id": "",
      "network_transaction_id": ""
    }
  },
  "subscription": {
    "id": "d67a4295-7bb3-4183-99ce-9f5d26d92709",
    "billing_date": {
      "type": "fixed_day",
      "day": 18
    }
  },
  "account_id": "2d77ea44-9a01-4ffc-a465-7db5c2ced44d",
  "description": "Apple Pay recurring setup",
  "merchant_order_id": "MER01"
}
```

### Key parameters for CIT

- **`vault_on_success: true`**: This parameter indicates this is a recurring payment setup and generates the token for future MIT transactions
- **`stored_credentials.usage: "FIRST"`**: Indicates this is the initial transaction in a recurring series
- **`stored_credentials.reason: "SUBSCRIPTION"`**: Specifies this is for subscription/recurring purposes
- **`subscription`**: This object is essential for creating the Apple Pay recurrence. It contains the subscription details that will be displayed to the user during the Apple Pay authorization flow, including billing frequency and schedule information

## Merchant initiated transaction (MIT)

**MIT** transactions are subsequent payments processed automatically by the merchant without customer interaction. These transactions use the token generated during the CIT and include stored credentials information.

### MIT request example

```json
{
  "country": "US",
  "amount": {
    "currency": "USD",
    "value": 100
  },
  "customer_payer": {
    "merchant_customer_validations": {
      "account_is_verified": true,
      "email_is_verified": true,
      "phone_is_verified": true
    }
  },
  "workflow": "DIRECT",
  "payment_method": {
    "token": "2d77ea44-9a01-4ffc-a465-7db5c2ced44d",
    "detail": {
      "wallet": {
        "payment_token": "{\"paymentMethod\":{\"type\":\"credit\",\"displayName\":\"Visa 1234\",\"network\":\"Visa\"},\"paymentData\":{\"data\":\"+yWYyldI/H0kAvZOTQL/y0vRKYoWPGWK54TN5xiBUK7EdZhMDvlWaX88n1yXJdKzcW7arzqmckP5rjx7hGsYP3oF5VJW4OhElkSdPWsvWqnCzUmUz6BTmT3HBwI5gJBjGoIUG79UkBP+dRbpVCEcTd6Zr3d/jE7Uu6Q+6XMhMzkKwfPuNGrTzSFPQcOX5z8xNmnFiZwjXE42LsM4+INhzkzUvW7AfugmpU+aoPS8L6bcoMSwy0jalxraAMwxUQUNbxFdTe78F9Ftryr03kHWIDI7pvCSMHmT/skC6ha425x0zSPrrvoQtJVbR7lZEsHiaqsIyP7Qgfn3iPrdaEg/nx2WIgW+SrFAqsgOCauh6WRo7KjU5+M9AFpJXyByYPmnwqo14trsSZq25iVc0dS99EweperG5E+FCRiTNrSf1Xk=\",\"signature\":\"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\",\"header\":{\"publicKeyHash\":\"h/mfJj19xShja2t1Wfto4BiaaOuRaF/Fj5tAHHkjZUo=\",\"ephemeralPublicKey\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEuW/NN1h3s5rQFiOOfXH7VpiPy4Twbyiy4um/5XJcRlwcRuRfy2574VFMKk4FKalyXZC/J4/hcq/taS8yImRBYg==\",\"transactionId\":\"dcba2ab36bdf5f7131ea1c8c590039a95038cb528cf6d6c8a4326e7b8853dca3\"},\"version\":\"EC_v1\"},\"transactionIdentifier\":\"dcba2ab36bdf5f7131ea1c8c590039a95038cb528cf6d6c8a4326e7b8853dca3\"}"
      }
    },
    "type": "APPLE_PAY",
    "stored_credentials": {
      "reason": "SUBSCRIPTION",
      "usage": "USED",
      "subscription_agreement_id": "",
      "network_transaction_id": ""
    }
  },
  "account_id": "2d77ea44-9a01-4ffc-a465-7db5c2ced44d",
  "description": "Apple Pay recurring payment",
  "merchant_order_id": "MER02"
}
```

### Key parameters for MIT

- **`token`**: The token generated by Yuno during the successful CIT transaction
- **`stored_credentials.usage: "USED"`**: Indicates this is a subsequent transaction using stored credentials
- **`network_transaction_id`**: Optional field. If provided, it will be used in provider calls; if not provided, Yuno will use the network_transaction_id from the original CIT

## Implementation steps

### Step 1: Create customer (optional)

Use the [Create Customer](ref:create-customer) endpoint to register customer information for better transaction tracking.

### Step 2: Process the CIT

1. Create the initial payment with `vault_on_success: true`
2. Include appropriate stored credentials with `usage: "FIRST"`
3. Store the returned token for future MIT transactions

### Step 3: Process MIT transactions

1. Use the stored token from the CIT
2. Set stored credentials with `usage: "USED"`
3. Process subsequent payments without customer interaction

### Step 4: Monitor payment status

Use [Webhooks](doc:webhooks) or the [Retrieve Payment](ref:retrieve-payment) endpoint to monitor payment status for both CIT and MIT transactions.

## Related documentation

- [Prerequisites for Apple Pay](doc:prerequisites-apple-pay) - Initial requirements before integration
- [Dashboard setup and configuration](doc:apple-pay-setup-configuration) - Required setup steps
- [SDK integration for recurring payments](doc:apple-pay-recurring-sdk) - SDK-based recurring implementation
- [Direct integration for one-time payments](doc:direct-integration) - Non-recurring direct integration
