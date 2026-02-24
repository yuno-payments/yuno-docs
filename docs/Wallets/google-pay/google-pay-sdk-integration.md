---
title: SDK Integration
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    Integrate Google Pay with Yuno using the SDK. Yuno handles the full Google
    Pay flow including the payment sheet, token management, and processing.
  robots: index
next:
  description: ''
---
This guide covers how to integrate Google Pay with Yuno using the SDK. With this approach, Yuno's SDK manages the complete Google Pay experience: displaying the Google Pay button, presenting the payment sheet, and handling the payment token. You don't need to integrate directly with the Google Pay API.

<Callout icon="📘" theme="info">
  Before implementing, review the [Google Pay requirements](doc:google-pay#requirements) and ensure Google Pay is available in your operating countries.
</Callout>

## Overview

1. Create a checkout session with Yuno.
2. Initialize Yuno's SDK in your app (Web, Android, or iOS).
3. The SDK displays the Google Pay button and handles the payment sheet.
4. The customer authorizes the payment through Google Pay.
5. Yuno receives the payment token and processes the transaction with your configured provider.
6. Monitor the payment status via [webhooks](doc:webhooks).

## Requirements

- A Yuno account with API credentials ([Dashboard](https://dashboard.y.uno/))
- A payment provider connection configured in the Yuno dashboard that supports Google Pay
- A routing rule that includes the Google Pay payment method
- Yuno SDK integrated in your application ([Web](doc:web-sdk-reference), [Android](doc:android-sdk-reference), or [iOS](doc:ios-sdk-reference))

## Integration steps

### Step 1: Create a checkout session

Use the [create checkout session](ref:create-checkout-session) endpoint to start a payment session:

```json
{
  "country": "US",
  "customer_id": "customer-uuid",
  "merchant_order_id": "order-123",
  "payment_description": "Google Pay payment",
  "amount": {
    "currency": "USD",
    "value": 5000
  }
}
```

The response returns a `checkout_session` ID to initialize the SDK.

### Step 2: Initialize the SDK

Initialize Yuno's SDK with the checkout session. The SDK automatically detects available payment methods, including Google Pay, based on your dashboard configuration.

Refer to the SDK documentation for your platform:

- [Web SDK integration](doc:web-sdk-full)
- [Android SDK integration](doc:android-sdk-full)
- [iOS SDK integration](doc:ios-sdk-full)

### Step 3: Customer completes payment

The SDK handles the rest. When the customer selects Google Pay:

1. The Google Pay payment sheet appears with the customer's saved cards.
2. The customer selects a card and authorizes the payment.
3. The SDK sends the encrypted payment token to Yuno.
4. Yuno processes the payment through your configured provider.

### Step 4: Handle the response

The SDK returns the payment result. You can also monitor payment status through [webhooks](doc:webhooks) for asynchronous confirmation.

## Create a payment with the SDK workflow

If you need to call the payment API directly while using the SDK checkout flow, set the `workflow` to `SDK_CHECKOUT` and include the checkout session:

```json
{
  "account_id": "your-account-id",
  "description": "Google Pay via SDK",
  "merchant_order_id": "order-123",
  "country": "US",
  "amount": {
    "currency": "USD",
    "value": 5000
  },
  "checkout": {
    "session": "checkout-session-id"
  },
  "customer_payer": {
    "id": "customer-uuid",
    "email": "customer@example.com"
  },
  "payment_method": {
    "type": "GOOGLE_PAY"
  },
  "workflow": "SDK_CHECKOUT"
}
```

<Callout icon="⚠️" theme="warn">
  When integrating wallets like Google Pay, the `payment_method.type` field is required even when using the SDK workflow. Set it to `GOOGLE_PAY`.
</Callout>

## Enable and test Google Pay

To test Google Pay in sandbox:

1. Integrate [Yuno's SDK](doc:android) into your app.
2. Create a Google test account and sign in to the [Google Pay Business Console](https://pay.google.com/business/console).
3. In the Google Wallet business console, navigate to the API section and select **Create a Pass** to enable **Demo mode**.

<Image align="center" border={false} width="600px" src="https://files.readme.io/fbc51b7-6847ef9-demo_mode.png" />

4. Download the [Google Wallet App](https://play.google.com/store/apps/details?id=com.google.android.apps.walletnfcrel&hl=en&gl=US) on your test device.
5. Run through the payment flow to verify the integration works.

## Go live

After testing, request [Google Production Access](https://developers.google.com/pay/api/web/guides/test-and-deploy/request-prod-access) and contact your Technical Account Manager. The Yuno team will verify your configuration before going live.

## Related documentation

- [Google Pay overview](doc:google-pay)
- [Google Pay Direct integration](doc:google-pay-direct-integration)
- [Google Pay via provider](doc:integration-via-provider-google-pay)
- [Google Pay with PIX](doc:google-pay-with-pix)
