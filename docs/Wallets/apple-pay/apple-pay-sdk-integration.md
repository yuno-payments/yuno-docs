---
title: Apple Pay - SDK Integration
deprecated: false
hidden: false
metadata:
  robots: index
---
This guide provides a comprehensive process to integrate Apple Pay with Yuno SDK for both one-time and recurring payments. The SDK simplifies Apple Pay integration by handling payment token management, providing built-in security, and supporting both immediate and subscription-based payments.

> 📘 Setup Required
>
> Before implementing Apple Pay payments, ensure you have completed the [dashboard setup and configuration](doc:apple-pay-setup-configuration) process.

## SDK integration overview

The direct API integration method provides complete control over Apple Pay payment flows for both immediate and subscription-based transactions:

* [**One-time payments**](#one-time-payments-with-direct-api) - Implement immediate Apple Pay transactions with full control over payment timing, custom validation logic, and direct API communication

  * [Complete dashboard setup](#step-1-complete-dashboard-setup) - Configure provider connections, routing, and Checkout Builder settings
  * [Create the payment](#step-2-create-the-payment) - Use create payment endpoint with Apple Pay payment token
  * [Apple Pay wallet response object](#apple-pay-wallet-response-object) - Understanding the token structure from Apple Pay SDK
  * [One-time payment request example](#one-time-payment-request-example) - Complete JSON request structure for immediate payments
  * [Handle payment response](#step-3-handle-payment-response) - Process responses and implement webhook monitoring

* [**Recurring payments**](#recurring-payments-with-direct-api) - Build subscription-based payments with manual CIT/MIT implementation, custom token management, and flexible subscription logic tailored to your business needs
  * [Understanding CIT and MIT](#understanding-cit-and-mit) - Learn the difference between customer and merchant initiated transactions
  * [Customer Initiated Transaction](#customer-initiated-transaction-cit---first-payment) - Initial payment setup with token generation and storage
  * [Merchant Initiated Transaction](#merchant-initiated-transaction-mit---subsequent-payments) - Automated payments using stored tokens
  * [Token management](#token-management) - Secure storage, lifecycle management, and retry logic implementation
  * [Custom subscription flow](#custom-subscription-flow-implementation) - Build scheduling, billing cycles, and customer notifications

## One-time payments with SDK

One-time Apple Pay payments using the Yuno SDK provide a streamlined integration experience for immediate transactions.

### Step 1: Complete dashboard setup

Ensure you have completed all the setup steps in the [dashboard setup and configuration](doc:apple-pay-setup-configuration) guide, including:

* Provider connections configuration
* Routing setup
* Checkout Builder enablement

### Step 2: Add Apple Pay capability

Add the Apple Pay capability to your iOS app:

1. In Xcode, select your project in the navigator
2. Select your app target
3. Go to the **Signing & Capabilities** tab
4. Click **+ Capability** and search for "Apple Pay"
5. Add the **Apple Pay** capability
6. Configure your Merchant IDs in the Apple Pay section

![Apple Pay capability in Xcode](https://files.readme.io/46617c6-apple-pay-capability.png)

> ⚠️ Apple Pay Merchant ID Required
>
> Ensure your Apple Pay Merchant ID matches the one configured in your Yuno Dashboard provider connections.

![Apple Pay merchant configuration](https://files.readme.io/a86db82-apple-pay-merchant-config.png)

### Step 3: Generate one-time token (OTT)

An [OTT](doc:how-yuno-payment-flow-works#step-3-create-a-one-time-token) is a unique identifier Yuno generates to protect your customer's privacy and security. You will obtain the OTT from the Yuno SDK, which handles various payment method scenarios. Use `payment_method_type = APPLE_PAY`. For a list of all available options, see the [Payment types](ref:payment-type-list) page.

### Step 4: Create the payment

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

### Step 5: Process the payment

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
* **3DS authentication**: Automatic handling when required
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
* [Apple Pay direct integration](doc:apple-pay-recurring-direct-implementation) - API-only integration
* [Subscription management](doc:subscriptions) - General subscription documentation
* [Webhooks](doc:webhooks) - Payment monitoring and status updates