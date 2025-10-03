---
title: SDK Integration (COPY)
deprecated: false
hidden: true
metadata:
  robots: index
---
This guide provides a comprehensive process to integrate Apple Pay with Yuno SDK for both one-time and recurring payments. The SDK simplifies Apple Pay integration by handling payment token management, providing built-in security, and supporting both immediate and subscription-based payments.

> 📘 Setup Required
>
> Before implementing Apple Pay payments, ensure you have completed the [dashboard setup and configuration](doc:apple-pay-setup-configuration) process.

## SDK integration overview

The Yuno SDK integration method provides a streamlined approach for both immediate and subscription-based Apple Pay payments:

* [**One-time payments**](#one-time-payments-with-sdk) - Implement immediate Apple Pay transactions with simplified SDK integration, automated token handling, and built-in security

  * [Add Apple Pay capability](#step-1-add-apple-pay-capability) - Set up Xcode capabilities and Merchant ID configuration
  * [Generate one-time token](#step-2-generate-one-time-token-ott) - Create OTT for privacy and security using Yuno SDK
  * [Create the payment](#step-3-create-the-payment) - Use checkout session endpoint for immediate transactions
  * [Process the payment](#step-4-process-the-payment) - Handle automatic Apple Pay flow completion

* [**Recurring payments**](#recurring-payments-with-sdk) - Set up subscription-based payments with automatic CIT/MIT flow management, built-in scheduling, and subscription management capabilities
  * [Customer Initiated Transaction](#customer-initiated-transaction-cit---first-payment) - Initial payment setup with customer authorization and token generation
  * [Merchant Initiated Transaction](#merchant-initiated-transaction-mit---subsequent-payments) - Automated subsequent payments using stored tokens
  * [Subscription management URL](#subscription-management-url) - Customer portal for subscription management and updates
  * [Error handling](#error-handling) - Built-in retry logic and automatic error management

## One-time payments with SDK

One-time Apple Pay payments using the Yuno SDK provide a streamlined integration experience for immediate transactions.

### Step 1: Add Apple Pay capability

Add the Apple Pay capability to your iOS app:

1. In Xcode, select your project in the navigator
2. Select your app target
3. Go to the **Signing & Capabilities** tab
4. Click **+ Capability** and search for "Apple Pay"
5. Add the **Apple Pay** capability
6. Configure your Merchant IDs in the Apple Pay section

> ⚠️ Apple Pay Merchant ID Required
>
> Ensure your Apple Pay Merchant ID matches the one configured in your Yuno Dashboard provider connections.

### Step 2: Generate one-time token (OTT)

An [OTT](doc:how-yuno-payment-flow-works#step-3-create-a-one-time-token) is a unique identifier Yuno generates to protect your customer's privacy and security. You will obtain the OTT from the Yuno SDK, which handles various payment method scenarios. Use `payment_method_type = APPLE_PAY`. For a list of all available options, see the [Payment types](ref:payment-type-list) page.

### Step 3: Create the payment

Use the [create checkout session](ref:create-checkout-session) endpoint to create a payment session for one-time Apple Pay transactions:

```json
{
  "country": "US",
  "customer_id": "customer-unique-id",
  "merchant_order_id": "order-123",
  "payment_description": "Apple Pay one-time payment",
  "amount": {
    "currency": "USD",
    "value": 100
  }
}
```

### Step 4: Process the payment

The SDK handles the Apple Pay flow automatically. When the customer completes the Apple Pay authorization, the payment is processed immediately.

## Recurring payments with SDK

The SDK simplifies recurring payment flows by handling both Customer Initiated Transactions (CIT) and Merchant Initiated Transactions (MIT). It also manages payment tokens securely, provides built-in subscription support.

### Customer Initiated Transaction (CIT) - First payment

The CIT is the initial transaction where the customer authorizes recurring payments. This transaction requires customer interaction and generates a token for future MIT transactions.

#### CIT request example

```json
{
  "account_id": "62fa3145-1408-4044-a599-caa0c2159782",
  "amount": {
    "currency": "COP",
    "value": 2000
  },
  "checkout": {
    "session": "0793c7a5-79c6-40d6-aa5f-13e4e9bdf169"
  },
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
  "customer_payer": {
    "id": "070a34cb-4649-4a4e-b231-065a53060379",
    "nationality": "CO",
    "browser_info": {
      "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15",
      "accept_header": "application/json",
      "accept_content": "*/*",
      "accept_browser": "*/*",
      "color_depth": "5",
      "screen_height": "8",
      "screen_width": "8",
      "javascript_enabled": true,
      "java_enabled": false,
      "browser_time_difference": "300",
      "language": "en",
      "platform": "WEB"
    }
  },
  "subscription": {
    "id": "d67a4295-7bb3-4183-99ce-9f5d26d92709",
    "billing_date": {
      "type": "fixed_day",
      "day": 18
    }
  },
  "merchant_order_id": "merchant-order-123",
  "country": "CO",
  "description": "Apple Pay recurring setup",
  "workflow": "SDK_CHECKOUT"
}
```

**Key parameters for CIT:**

* `vault_on_success: true` - This parameter indicates this is a recurring payment setup and generates the token for future MIT transactions
* `stored_credentials.usage: "FIRST"` - Indicates this is the initial transaction in a recurring series
* `subscription` - Required object containing subscription details for Apple Pay recurrence

### Merchant Initiated Transaction (MIT) - Subsequent payments

MIT transactions are processed automatically for subsequent billing cycles using the token generated during the CIT.

#### MIT request example

```json
{
  "account_id": "account-id",
  "amount": {
    "currency": "USD",
    "value": 100
  },
  "payment_method": {
    "token": "token-from-CIT",
    "detail": {
      "wallet": {}
    },
    "type": "APPLE_PAY",
    "stored_credentials": {
      "reason": "SUBSCRIPTION",
      "usage": "USED",
      "subscription_agreement_id": "",
      "network_transaction_id": ""
    }
  },
  "customer_payer": {
    "id": "customer-id"
  },
  "merchant_order_id": "recurring-order-456",
  "country": "US",
  "description": "Apple Pay recurring payment",
  "workflow": "DIRECT"
}
```

**Key parameters for MIT:**

* `token` - The payment token generated during the CIT
* `stored_credentials.usage: "USED"` - Indicates this is a subsequent transaction in a recurring series
* No `payment_token` required - Uses the stored token instead

### Subscription management URL

For SDK recurring payments, you must provide a subscription management URL where customers can:

* View their subscription details
* Update payment methods
* Cancel subscriptions
* Modify billing schedules

This URL should be included in your subscription configuration and customer communications.

### Error handling

The SDK provides built-in error handling for common scenarios:

* **Token expiration**: Automatic retry with fresh token generation
* **Payment failures**: Built-in retry logic for temporary issues
* **Network issues**: Connection retry mechanisms

Monitor payment status through [webhooks](doc:webhooks) to handle edge cases and provide customer notifications.

## Testing your integration

1. **Use Apple's sandbox environment** for initial testing
2. **Test both one-time and recurring flows** with different payment scenarios
3. **Verify token generation** for recurring payments works correctly
4. **Test error scenarios** including payment failures and network issues
5. **Validate webhook handling** for payment status updates

## Related documentation

* [Dashboard setup and configuration](doc:apple-pay-setup-configuration) - Required setup steps
* [Prerequisites for Apple Pay](doc:prerequisites-apple-pay) - Initial requirements
* [Apple Pay direct integration](doc:apple-pay-direct-integration) - API-only integration
* [Subscription management](doc:subscriptions) - General subscription documentation
* [Webhooks](doc:webhooks) - Payment monitoring and status updates