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

This guide covers how to implement recurring Apple Pay payments using Yuno's SDK. The SDK simplifies the implementation of recurring payments while handling the complexity of Customer Initiated Transactions (CIT) and Merchant Initiated Transactions (MIT) flows.

Using the Yuno SDK for recurring Apple Pay payments provides simplified implementation by automatically handling the complexity of Customer Initiated Transactions (CIT) and Merchant Initiated Transactions (MIT) flows. The SDK manages payment tokens securely and provides built-in subscription support with enhanced fraud screening and 3DS authentication.

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
        "payment_token": "{Apple Pay token from SDK}",
        "stored_credentials": {
          "reason": "SUBSCRIPTION",
          "usage": "FIRST",
          "subscription_agreement_id": "",
          "network_transaction_id": ""
        }
      }
    },
    "type": "APPLE_PAY"
  },
  "account_id": "2d77ea44-9a01-4ffc-a465-7db5c2ced44d",
  "description": "Apple Pay recurring setup",
  "merchant_order_id": "subscription-order-001"
}
```

**Key CIT parameters:**

- `vault_on_success: true` - Enables token generation for recurring payments
- `stored_credentials.usage: "FIRST"` - Indicates initial transaction in recurring series
- `stored_credentials.reason: "SUBSCRIPTION"` - Specifies the recurring payment type

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

## Apple Pay payment token structure

The Apple Pay SDK returns a payment token that must be passed in the `payment_method.detail.wallet.payment_token` field. The token contains encrypted payment data from Apple Pay:

```json
{
  "paymentMethod": {
    "type": "credit",
    "displayName": "Visa 1234",
    "network": "Visa"
  },
  "paymentData": {
    "data": "encrypted_payment_data...",
    "signature": "payment_signature...",
    "header": {
      "publicKeyHash": "public_key_hash...",
      "ephemeralPublicKey": "ephemeral_key...",
      "transactionId": "transaction_id..."
    },
    "version": "EC_v1"
  },
  "transactionIdentifier": "transaction_identifier..."
}
```

Pass this complete object as a JSON string in your payment requests.

## Important considerations

- **Token management**: Store the token securely after the CIT for subsequent MIT transactions
- **Customer consent**: Ensure customers understand they're authorizing recurring payments
- **Network transaction ID**: While optional, providing this helps with transaction tracking
- **Error handling**: Implement retry logic for failed MIT transactions with appropriate delays

## SDK configuration for iOS app

In addition to the standard Apple Pay configuration, ensure your iOS app is properly configured:

### Apple Pay capability

Ensure Apple Pay capability is added in Xcode with the correct Merchant ID:

<Image align="center" width="700px" src="https://files.readme.io/757a4706d90b183020c05910648ed12822233bb14b0436a0d67f6eb18e03f77e-image.png" />

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
