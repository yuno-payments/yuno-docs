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

## Recurring Payments with SDK Overview

Using the Yuno SDK for recurring Apple Pay payments provides several advantages:

- **Simplified Implementation**: The SDK handles the complexity of CIT/MIT flows
- **Automatic Token Management**: SDK manages payment tokens securely
- **Built-in Subscription Support**: Native support for subscription workflows
- **Enhanced Security**: Automatic fraud screening and 3DS when required

## Prerequisites for Recurring Payments

### Subscription Management URL Configuration

For recurring payments, you must configure a **Subscription Management URL** in your Apple Pay connection. This URL allows customers to:

- View their active subscriptions
- Cancel subscriptions
- Modify subscription details
- Access billing history

> ⚠️ **Important**: This URL must be created and hosted by your merchant platform. It should provide a complete subscription management interface for your customers.

To configure the Subscription Management URL:

1. Go to your [Yuno Dashboard](https://dashboard.y.uno/connections)
2. Navigate to **Connections** > **Apple Pay**
3. Add your subscription management URL in the connection configuration
4. Ensure the URL is accessible and provides subscription management functionality

## Implementation Steps

### Step 1: Create Customer

Use the [Create Customer](ref:create-customer) endpoint to register customer information. This is recommended for recurring payments to maintain customer relationships.

### Step 2: Create Checkout Session with Subscription Object

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

### Step 3: Generate One-Time Token (OTT)

Generate an OTT using the Yuno SDK with `payment_method_type = APPLE_PAY`. The SDK will handle the CIT setup automatically when subscriptions are configured.

### Step 4: Create Initial Payment (CIT)

Use the [Create Payment](ref:create-payment) endpoint with the subscription configuration. The SDK automatically:

- Sets `vault_on_success: true`
- Configures stored credentials appropriately
- Handles the initial customer authorization

### Step 5: Subsequent Payments (MIT)

For subsequent recurring payments, the SDK manages:

- Token retrieval and usage
- MIT transaction processing
- Stored credentials handling
- Error recovery and retry logic

## Subscription Object Structure

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

### Subscription Parameters

- **`frequency`**: Defines how often the recurring payment occurs
  - `type`: DAY, WEEK, or MONTH
  - `value`: Interval between charges (e.g., every 2 weeks)
- **`billing_cycles.total`**: Total number of billing cycles (optional for open-ended subscriptions)
- **`subscription_management_url`**: URL where customers can manage their subscription
- **`trial_period`**: Optional trial period configuration
- **`metadata`**: Additional subscription metadata

## SDK Configuration for iOS App

In addition to the standard Apple Pay configuration, ensure your iOS app is properly configured:

### Apple Pay Capability

Ensure Apple Pay capability is added in Xcode with the correct Merchant ID:

<Image align="center" width="700px" src="https://files.readme.io/757a4706d90b183020c05910648ed12822233bb14b0436a0d67f6eb18e03f77e-image.png" />

### Testing Recurring Payments

For testing recurring Apple Pay payments:

1. **Browser Testing**: Use Safari with test domains configured in your Apple Pay connection
2. **App Testing**:
   - Use test Apple IDs without associated payment methods
   - Add sandbox test cards from Apple's documentation
   - Test the complete subscription flow including management URL

## Error Handling and Monitoring

### Common Scenarios

- **Initial Payment Failure**: Handle CIT failures gracefully with user feedback
- **Recurring Payment Failure**: Implement retry logic for failed MIT transactions
- **Subscription Management**: Provide clear subscription status updates

### Monitoring Tools

- Use [Webhooks](doc:webhooks) to monitor payment status changes
- Implement proper logging for subscription lifecycle events
- Monitor subscription health through the Yuno Dashboard

## Benefits of SDK Implementation

Using the Yuno SDK for recurring Apple Pay payments provides:

- **Reduced Development Time**: Pre-built subscription handling
- **Compliance**: Automatic adherence to Apple Pay recurring payment requirements
- **Security**: Built-in tokenization and secure credential storage
- **Support**: Enhanced fraud detection and 3DS authentication
- **Flexibility**: Easy integration with existing subscription management systems

## Related Documentation

- [Dashboard Setup and Configuration](doc:apple-pay-setup-configuration) - Required setup steps
- [Direct Integration for Recurring Payments](doc:apple-pay-recurring-direct) - API-based recurring implementation
- [SDK Integration for One-time Payments](doc:sdk-integration-apple) - Non-recurring SDK integration
- [Subscription Management](doc:subscriptions) - General subscription documentation
