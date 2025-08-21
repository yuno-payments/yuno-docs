---
title: Recurring Payments
deprecated: false
hidden: false
metadata:
  robots: index
---
This guide provides comprehensive integration options for Apple Pay recurring payments with Yuno. Choose between SDK integration for simplified setup or direct API integration for full control over subscription-based transactions.

> 📘 Setup Required
>
> Before implementing Apple Pay payments, ensure you have completed the [dashboard setup and configuration](doc:apple-pay-setup-configuration) process.

## Recurring payments overview

Apple Pay recurring payments enable automated billing for subscriptions, memberships, and regular services using a two-step process: Customer Initiated Transactions (CIT) and Merchant Initiated Transactions (MIT). Yuno offers two integration approaches:

* [**SDK integration**](#sdk-integration) - Simplified recurring payment implementation with automatic CIT/MIT flow management, built-in scheduling, and subscription management capabilities

* [**Direct API integration**](#direct-api-integration) - Manual CIT/MIT implementation with custom token management and flexible subscription logic tailored to your business needs

## SDK integration

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

## Direct API integration

Recurring Apple Pay payments with direct integration require manual implementation of the Customer Initiated Transaction (CIT) and Merchant Initiated Transaction (MIT) flow.

### Understanding CIT and MIT

**Customer Initiated Transaction (CIT):** The first transaction where the customer authorizes recurring payments. This generates a payment token for future use.

**Merchant Initiated Transaction (MIT):** Subsequent automated transactions using the stored token without customer interaction.

### Customer Initiated Transaction (CIT) - First payment

The CIT establishes the recurring payment relationship and generates a token for future MIT transactions.

#### CIT request example

```json
{
  "country": "US",
  "amount": {
    "currency": "USD",
    "value": 100
  },
  "customer_payer": {
    "id": "customer-unique-id",
    "email": "customer@example.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "workflow": "DIRECT",
  "payment_method": {
    "vault_on_success": true,
    "detail": {
      "wallet": {
        "payment_token": "{Apple Pay token}"
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
  "account_id": "account-id",
  "description": "Apple Pay recurring setup",
  "merchant_order_id": "recurring-setup-123"
}
```

**Key parameters for CIT:**

* `vault_on_success: true` - This parameter indicates this is a recurring payment setup and generates the token for future MIT transactions
* `stored_credentials.usage: "FIRST"` - Indicates this is the initial transaction in a recurring series
* `subscription` - Required object containing subscription details for Apple Pay recurrence

#### CIT response handling

When the CIT is successful, you'll receive a response containing the `payment_token` that must be stored securely for future MIT transactions:

```json
{
  "id": "payment-id",
  "status": "SUCCEEDED",
  "payment_method": {
    "id": "payment-method-id",
    "token": "generated-token-for-mit"
  }
}
```

Store the `token` value securely for use in subsequent MIT transactions.

### Merchant Initiated Transaction (MIT) - Subsequent payments

MIT transactions are processed automatically for recurring billing using the token from the CIT.

#### MIT request example

```json
{
  "country": "US",
  "amount": {
    "currency": "USD",
    "value": 100
  },
  "customer_payer": {
    "id": "customer-unique-id"
  },
  "workflow": "DIRECT",
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
  "account_id": "account-id",
  "description": "Apple Pay recurring payment",
  "merchant_order_id": "recurring-payment-456"
}
```

**Key parameters for MIT:**

* `token` - The payment token generated during the CIT
* `stored_credentials.usage: "USED"` - Indicates this is a subsequent transaction in a recurring series
* No `payment_token` required - Uses the stored token instead
* `detail.wallet` - Empty object for MIT transactions

### Token management

With direct integration, you are responsible for:

* **Securely storing** the payment token from the CIT response
* **Managing token lifecycle** including expiration handling
* **Implementing retry logic** for failed MIT transactions
* **Handling token invalidation** scenarios

### Custom subscription flow implementation

Direct integration requires you to implement:

1. **Subscription scheduling** - Determine when to execute MIT transactions
2. **Billing cycle management** - Track billing dates and frequencies
3. **Payment retry logic** - Handle failed payments with appropriate retry strategies
4. **Customer notifications** - Inform customers of successful/failed payments
5. **Subscription modifications** - Handle plan changes, cancellations, and updates

### Error handling and retries

Implement robust error handling for:

* **Token expiration** - Re-authenticate customers when tokens expire
* **Payment failures** - Implement retry logic with exponential backoff
* **Network issues** - Handle timeouts and connection failures
* **Card issues** - Manage declined payments and insufficient funds

Monitor payment status through [webhooks](doc:webhooks) for real-time updates and automated retry mechanisms.

## Testing your integration

1. **Use Apple's sandbox environment** for initial testing
2. **Test both CIT and MIT flows** with different payment scenarios
3. **Verify token generation** for recurring payments works correctly
4. **Test error scenarios** including payment failures and network issues
5. **Validate webhook handling** for payment status updates
6. **Test subscription management** features and customer notifications

## Related documentation

* [Dashboard setup and configuration](doc:apple-pay-setup-configuration) - Required setup steps before integration
* [Prerequisites for Apple Pay](doc:prerequisites-apple-pay) - Initial requirements and account setup
* [Apple Pay one-time payments](doc:one-time-payments) - Immediate transaction implementation
* [Create payment API](ref:create-payment) - Direct integration payment endpoint
* [Create checkout session API](ref:create-checkout-session) - SDK integration session endpoint