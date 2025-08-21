---
title: Recurring Apple Pay (SDK Integration)
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

> 📘 Setup Required
>
> Before following this guide, ensure you have completed the [dashboard setup and configuration](doc:apple-pay-setup-configuration) process.

## Recurring payments with SDK overview

Using the Yuno SDK for recurring Apple Pay payments provides simplified implementation by automatically handling the complexity of Customer Initiated Transactions (CIT) and Merchant Initiated Transactions (MIT) flows. The SDK manages payment tokens securely and provides built-in subscription support with enhanced fraud screening and 3DS authentication.

## Prerequisites for recurring payments

### Subscription management URL configuration

For recurring payments, you must configure a **Subscription Management URL** in your Apple Pay connection. This URL allows customers to view, cancel, and modify their active subscriptions, as well as access billing history.

> ⚠️ **Important**: This URL must be created and hosted by your merchant platform. It should provide a complete subscription management interface for your customers.

To configure the Subscription Management URL:

1. Go to your [Yuno Dashboard](https://dashboard.y.uno/connections)
2. Navigate to **Connections** > **Apple Pay**
3. Add your subscription management URL in the connection configuration
4. Ensure the URL is accessible and provides subscription management functionality

## Implementation steps

### Step 1: Create customer

Use the [Create Customer](ref:create-customer) endpoint to register customer information. This is recommended for recurring payments to maintain customer relationships.

### Step 2: Create checkout session with subscription object

When creating a checkout session for recurring payments, include the `subscriptions` object in your request:

```json
{
  "customer_id": "customer-uuid",
  "amount": {
    "currency": "USD",
    "value": 100
  },
  "country": "US",
  "merchant_order_id": "subscription-order-001",
  "payment_description": "Monthly subscription",
  "subscriptions": {
    "frequency": {
      "type": "MONTH",
      "value": 1
    },
    "billing_cycles": {
      "total": 12
    },
    "subscription_management_url": "https://yoursite.com/manage-subscription"
  }
}
```

### Step 3: Generate one-time token (OTT)

Generate an OTT using the Yuno SDK with `payment_method_type = APPLE_PAY`. The SDK will handle the CIT setup automatically when subscriptions are configured.

### Step 4: Create initial payment (CIT)

Use the [Create Payment](ref:create-payment) endpoint with the subscription configuration. The SDK automatically sets `vault_on_success: true`, configures stored credentials appropriately, and handles the initial customer authorization.

### Step 5: Subsequent payments (MIT)

For subsequent recurring payments, the SDK manages token retrieval and usage, MIT transaction processing, stored credentials handling, and error recovery with retry logic.

## Subscription object structure

When implementing recurring payments with the SDK, include the following subscription configuration:

```json
{
  "subscriptions": {
    "frequency": {
      "type": "DAY|WEEK|MONTH",
      "value": 1
    },
    "billing_cycles": {
      "total": 12
    },
    "subscription_management_url": "https://yoursite.com/manage-subscription",
    "trial_period": {
      "duration": 7,
      "type": "DAY"
    },
    "metadata": [
      {
        "key": "subscription_type",
        "value": "premium"
      }
    ]
  }
}
```

### Subscription parameters

- **`frequency`**: Defines how often the recurring payment occurs
  - `type`: DAY, WEEK, or MONTH
  - `value`: Interval between charges (e.g., every 2 weeks)
- **`billing_cycles.total`**: Total number of billing cycles (optional for open-ended subscriptions)
- **`subscription_management_url`**: URL where customers can manage their subscription
- **`trial_period`**: Optional trial period configuration
- **`metadata`**: Additional subscription metadata

## SDK configuration for iOS app

In addition to the standard Apple Pay configuration, ensure your iOS app is properly configured:

### Apple Pay capability

Ensure Apple Pay capability is added in Xcode with the correct Merchant ID:

<Image align="center" width="700px" src="https://files.readme.io/757a4706d90b183020c05910648ed12822233bb14b0436a0d67f6eb18e03f77e-image.png" />

### Testing recurring payments

For testing recurring Apple Pay payments:

1. **Browser testing**: Use Safari with test domains configured in your Apple Pay connection
2. **App testing**:
   - Use test Apple IDs without associated payment methods
   - Add sandbox test cards from Apple's documentation
   - Test the complete subscription flow including management URL

## Error handling and monitoring

### Common scenarios

Handle initial payment failures gracefully with user feedback, implement retry logic for failed MIT transactions, and provide clear subscription status updates.

### Monitoring tools

Use [Webhooks](doc:webhooks) to monitor payment status changes, implement proper logging for subscription lifecycle events, and monitor subscription health through the Yuno Dashboard.

## Related documentation

- [Prerequisites for Apple Pay](doc:prerequisites-apple-pay) - Initial requirements before integration
- [Dashboard setup and configuration](doc:apple-pay-setup-configuration) - Required setup steps
- [Direct integration for recurring payments](doc:apple-pay-recurring-direct) - API-based recurring implementation
- [SDK integration for one-time payments](doc:sdk-integration-apple) - Non-recurring SDK integration
- [Subscription management](doc:subscriptions) - General subscription documentation
