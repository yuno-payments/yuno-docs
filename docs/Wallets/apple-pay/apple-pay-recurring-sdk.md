---
title: Recurring Apple Pay Payments (SDK Integration)
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

This guide explains how to implement recurring Apple Pay payments using Yuno's SDK. The SDK simplifies recurring payment flows by handling both Customer Initiated Transactions (CIT) and Merchant Initiated Transactions (MIT). It also manages payment tokens securely and provides built-in subscription support.

## Recurring payments overview

Recurring Apple Pay payments involve two types of transactions:

- **Customer Initiated Transaction (CIT)**: The first transaction where the customer actively participates and authorizes the recurring payment setup. This generates a payment token for future use.
- **Merchant Initiated Transaction (MIT)**: Subsequent transactions processed automatically using the stored token without customer interaction.

The SDK automatically handles the CIT/MIT flow, but understanding these concepts helps with implementation and troubleshooting.

> 📘 Setup Required
>
> Before following this guide, ensure you have completed the [dashboard setup and configuration](doc:apple-pay-setup-configuration) process.

> 📘 Subscription Management URL
>
> For recurring payments, you must configure a URL in your Apple Pay connection within the Yuno dashboard. This URL allows users to manage their subscription (such as canceling or modifying it). The subscription management URL must be created and hosted by you (the merchant).

## Step 1: Create customer

Use the [create customer](ref:create-customer) endpoint to register customer information. This is recommended for recurring payments to maintain customer relationships.

## Step 2: Create checkout session with subscription object

When creating a checkout session for recurring payments, include the `subscriptions` object in your request with the appropriate subscription configuration.

## Step 3: Generate one-time token (OTT)

Generate an OTT using the Yuno SDK with `payment_method_type = APPLE_PAY`. The SDK will handle the CIT setup automatically when subscriptions are configured.

## Step 4: Create initial payment (CIT)

Use the [create payment](ref:create-payment) endpoint with the subscription configuration. The SDK automatically sets `vault_on_success: true`, configures stored credentials appropriately, and handles the initial customer authorization.

### CIT request example

```json
{
  "country": "US",
  "amount": { "currency": "USD", "value": 100 },
  "customer_payer": {
    /* customer info */
  },
  "workflow": "SDK_CHECKOUT",
  "payment_method": {
    "vault_on_success": true,
    "detail": {
      "wallet": {
        "payment_token": "{Apple Pay token from SDK}"
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
  "merchant_order_id": "subscription-order-001"
}
```

**Key CIT parameters:**

- `vault_on_success: true` - This parameter indicates this is a recurring payment setup and generates the token for future MIT transactions
- `stored_credentials.usage: "FIRST"` - Indicates initial transaction in recurring series
- `stored_credentials.reason: "SUBSCRIPTION"` - Specifies the recurring payment type
- `subscription` - This object is essential for creating the Apple Pay recurrence. It contains the subscription details that will be displayed to the user during the Apple Pay authorization flow, including billing frequency and schedule information

## Step 5: Subsequent payments (MIT)

For subsequent recurring payments, the SDK manages token retrieval and usage, MIT transaction processing, stored credentials handling, and error recovery with retry logic.

> 📘 Automatic Call Management
>
> The SDK manages MIT (Merchant Initiated Transaction) calls automatically when subscriptions are configured. As a merchant, you typically only need to track subscription status and handle webhooks for monitoring.

### MIT request example

```json
{
  "country": "US",
  "amount": { "currency": "USD", "value": 100 },
  "customer_payer": {
    /* customer info */
  },
  "workflow": "SDK_CHECKOUT",
  "payment_method": {
    "token": "token-from-CIT",
    "detail": {
      "wallet": {
        "stored_credentials": {
          "reason": "SUBSCRIPTION",
          "usage": "USED",
          "subscription_agreement_id": "",
          "network_transaction_id": ""
        }
      }
    },
    "type": "APPLE_PAY"
  },
  "account_id": "2d77ea44-9a01-4ffc-a465-7db5c2ced44d",
  "description": "Apple Pay recurring payment",
  "merchant_order_id": "subscription-order-002"
}
```

**Key MIT parameters:**

- `token` - The token generated during the CIT
- `stored_credentials.usage: "USED"` - Indicates subsequent transaction in recurring series
- `network_transaction_id` - Optional; if not provided, Yuno uses the one from the original CIT

## SDK configuration for iOS app

In addition to the standard Apple Pay configuration, ensure your iOS app is properly configured:

### Apple Pay capability

To enable Apple Pay in your app, you need to configure the Apple Pay capability in Xcode:

1. **Add Apple Pay capability**: In Xcode, add the Apple Pay capability to your project.

<Image align="center" width="700px" src="https://files.readme.io/757a4706d90b183020c05910648ed12822233bb14b0436a0d67f6eb18e03f77e-image.png" />

2. **Select merchant ID**: Select the merchant ID you created during the [prerequisites](doc:prerequisites-apple-pay) process. It will appear if you are logged into your developer account.

<Image align="center" width="700px" src="https://files.readme.io/4bc6e2bb6d6317b3cf3b39c3b9483b082b5d97e0f046222c862cef28edae90dd-image.png" />

<br />

> ⚠️
>
> Make sure the Merchant ID is correctly linked to the Apple Pay capability in your app's App Identifier in the Apple Developer portal. This is configured under: **Certificates, Identifiers & Profiles** → **Identifiers** → **select your app** → **Capabilities** tab.

### Testing recurring payments

Test recurring Apple Pay payments using the same methods as standard Apple Pay testing, ensuring the subscription flow works correctly.

## Error handling and monitoring

Implement appropriate error handling for recurring payment failures and use [webhooks](doc:webhooks) to monitor payment status changes.

## Related documentation

- [Prerequisites for Apple Pay](doc:prerequisites-apple-pay) - Initial requirements before integration
- [Dashboard setup and configuration](doc:apple-pay-setup-configuration) - Required setup steps
- [Direct integration for recurring payments](doc:apple-pay-recurring-direct) - API-based recurring implementation
- [SDK integration for one-time payments](doc:sdk-integration-apple) - Non-recurring SDK integration
- [Subscription management](doc:subscriptions) - General subscription documentation
