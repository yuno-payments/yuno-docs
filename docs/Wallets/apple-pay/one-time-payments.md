---
title: One-Time Payments
deprecated: false
hidden: false
metadata:
  robots: index
---
This guide provides comprehensive integration options for Apple Pay one-time payments with Yuno. Choose between SDK integration for simplified setup or direct API integration for full control over immediate transactions.

> 📘 Setup Required
>
> Before implementing Apple Pay payments, ensure you have completed the [dashboard setup and configuration](doc:apple-pay-setup-configuration) process.

## One-time payments overview

Apple Pay one-time payments are immediate transactions processed once without future automated billing. Yuno offers two integration approaches:

* [**SDK integration**](#sdk-integration) - Simplified implementation with automated payment flow handling, built-in security, and streamlined user experience

  * [Complete dashboard setup](#step-1-complete-dashboard-setup) - Configure provider connections, routing, and Checkout Builder enablement
  * [Add Apple Pay capability](#step-2-add-apple-pay-capability) - Set up Xcode capabilities and Merchant ID configuration
  * [Generate one-time token](#step-3-generate-one-time-token-ott) - Create OTT for privacy and security using Yuno SDK
  * [Create the payment](#step-4-create-the-payment) - Use checkout session endpoint for immediate transactions
  * [Process the payment](#step-5-process-the-payment) - Handle automatic Apple Pay flow completion

* [**Direct API integration**](#direct-api-integration) - Complete control over payment timing, custom validation logic, and direct API communication
  * [Complete dashboard setup](#step-1-complete-dashboard-setup-1) - Configure provider connections, routing, and Checkout Builder settings
  * [Create the payment](#step-2-create-the-payment-1) - Use create payment endpoint with Apple Pay payment token
  * [Apple Pay wallet response object](#apple-pay-wallet-response-object) - Understanding the token structure from Apple Pay SDK
  * [One-time payment request example](#one-time-payment-request-example) - Complete JSON request structure for immediate payments
  * [Handle payment response](#step-3-handle-payment-response) - Process responses and implement webhook monitoring

## SDK integration

The Yuno SDK integration method provides a streamlined integration experience for one-time Apple Pay payments.

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

> ⚠️ Apple Pay Merchant ID Required
>
> Ensure your Apple Pay Merchant ID matches the one configured in your Yuno Dashboard provider connections.

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

## Direct API integration

Direct API integration provides full control over the Apple Pay one-time payment process using Yuno's payment API.

### Step 1: Complete dashboard setup

Ensure you have completed all the setup steps in the [dashboard setup and configuration](doc:apple-pay-setup-configuration) guide, including:

* Provider connections configuration
* Routing setup
* Checkout Builder enablement

### Step 2: Create the payment

Use the [create payment](ref:create-payment) endpoint to create a payment sending the Apple Pay `payment_token` returned by Apple Pay SDK. If you haven't integrated Apple's SDK, we recommend using [our SDKs](doc:sdk-integration-apple) so you don't have to worry about the integration.

> 📘 Pass Apple Pay payment token in request
>
> When you initiate a transaction with Apple Pay, a payment token containing a JSON-formatted `paymentData` string is sent. Pass the complete token received from Apple Pay in the `payment_method.detail.wallet.payment_token` field as a JSON string in your payment request.

#### Apple Pay wallet response object

The Apple Pay SDK returns the following object structure, which must be passed as the complete `payment_token` value:

```json
{
  "paymentMethod": {
    "type": "credit",
    "displayName": "Visa 1234",
    "network": "Visa"
  },
  "paymentData": {
    "data": "+yWYyldI/H0kAvZOTQL/y0vRKYoWPGWK54TN5xiBUK7EdZhMDvlWaX88n1yXJdKzcW7arzqmckP5rjx7hGsYP3oF5VJW4OhElkSdPWsvWqnCzUmUz6BTmT3HBwI5gJBjGoIUG79UkBP+dRbpVCEcTd6Zr3d/jE7Uu6Q+6XMhMzkKwfPuNGrTzSFPQcOX5z8xNmnFiZwjXE42LsM4+INhzkzUvW7AfugmpU+aoPS8L6bcoMSwy0jalxraAMwxUQUNbxFdTe78F9Ftryr03kHWIDI7pvCSMHmT/skC6ha425x0zSPrrvoQtJVbR7lZEsHiaqsIyP7Qgfn3iPrdaEg/nx2WIgW+SrFAqsgOCauh6WRo7KjU5+M9AFpJXyByYPmnwqo14trsSZq25iVc0dS99EweperG5E+FCRiTNrSf1Xk=",
    "signature": "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",
    "header": {
      "publicKeyHash": "h/mfJj19xShja2t1Wfto4BiaaOuRaF/Fj5tAHHkjZUo=",
      "ephemeralPublicKey": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEuW/NN1h3s5rQFiOOfXH7VpiPy4Twbyiy4um/5XJcRlwcRuRfy2574VFMKk4FKalyXZC/J4/hcq/taS8yImRBYg==",
      "transactionId": "dcba2ab36bdf5f7131ea1c8c590039a95038cb528cf6d6c8a4326e7b8853dca3"
    },
    "version": "EC_v1"
  },
  "transactionIdentifier": "dcba2ab36bdf5f7131ea1c8c590039a95038cb528cf6d6c8a4326e7b8853dca3"
}
```

#### One-time payment request example

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
    "detail": {
      "wallet": {
        "payment_token": "{\"paymentMethod\":{\"type\":\"credit\",\"displayName\":\"Visa 1234\",\"network\":\"Visa\"},\"paymentData\":{\"data\":\"+yWYyldI/H0kAvZOTQL/y0vRKYoWPGWK54TN5xiBUK7EdZhMDvlWaX88n1yXJdKzcW7arzqmckP5rjx7hGsYP3oF5VJW4OhElkSdPWsvWqnCzUmUz6BTmT3HBwI5gJBjGoIUG79UkBP+dRbpVCEcTd6Zr3d/jE7Uu6Q+6XMhMzkKwfPuNGrTzSFPQcOX5z8xNmnFiZwjXE42LsM4+INhzkzUvW7AfugmpU+aoPS8L6bcoMSwy0jalxraAMwxUQUNbxFdTe78F9Ftryr03kHWIDI7pvCSMHmT/skC6ha425x0zSPrrvoQtJVbR7lZEsHiaqsIyP7Qgfn3iPrdaEg/nx2WIgW+SrFAqsgOCauh6WRo7KjU5+M9AFpJXyByYPmnwqo14trsSZq25iVc0dS99EweperG5E+FCRiTNrSf1Xk=\",\"signature\":\"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\",\"header\":{\"publicKeyHash\":\"h/mfJj19xShja2t1Wfto4BiaaOuRaF/Fj5tAHHkjZUo=\",\"ephemeralPublicKey\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEuW/NN1h3s5rQFiOOfXH7VpiPy4Twbyiy4um/5XJcRlwcRuRfy2574VFMKk4FKalyXZC/J4/hcq/taS8yImRBYg==\",\"transactionId\":\"dcba2ab36bdf5f7131ea1c8c590039a95038cb528cf6d6c8a4326e7b8853dca3\"},\"version\":\"EC_v1\"},\"transactionIdentifier\":\"dcba2ab36bdf5f7131ea1c8c590039a95038cb528cf6d6c8a4326e7b8853dca3\"}"
      }
    },
    "type": "APPLE_PAY"
  },
  "account_id": "2d77ea44-9a01-4ffc-a465-7db5c2ced44d",
  "description": "Apple Pay one-time payment",
  "merchant_order_id": "MER01"
}
```

### Step 3: Handle payment response

Process the payment response and handle various status codes. Use [webhooks](doc:webhooks) to receive real-time payment status updates.

## Testing your integration

1. **Use Apple's sandbox environment** for initial testing
2. **Test different payment scenarios** including successful and failed transactions
3. **Verify payment flow** from authorization to completion
4. **Test error scenarios** including network issues and payment failures
5. **Validate webhook handling** for payment status monitoring

## Related documentation

* [Dashboard setup and configuration](doc:apple-pay-setup-configuration) - Required setup steps before integration
* [Prerequisites for Apple Pay](doc:prerequisites-apple-pay) - Initial requirements and account setup
* [Apple Pay recurring payments](doc:apple-pay-recurring-payments) - Subscription and automated billing setup
* [Create payment API](ref:create-payment) - Direct integration payment endpoint
* [Create checkout session API](ref:create-checkout-session) - SDK integration session endpoint
* [Webhooks](doc:webhooks) - Payment monitoring and status updates