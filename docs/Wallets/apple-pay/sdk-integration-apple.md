---
title: Apple Pay SDK Integration (One-Time Payments)
excerpt: ""
deprecated: false
hidden: false
metadata:
  title: ""
  description: ""
  robots: index
next:
  description: ""
---

This guide provides a step-by-step process to integrate the Yuno SDK with Apple Pay for one-time payments. One-time Apple Pay payments using the Yuno SDK provide a streamlined integration experience. The SDK handles the complexity of Apple Pay integration while providing simplified payment token handling, built-in fraud screening support, automatic 3DS authentication when required, and a seamless user experience.

> 📘 Setup Required
>
> Before following this guide, ensure you have completed the [dashboard setup and configuration](doc:apple-pay-setup-configuration) process.

> 📘 Recurring Payments
>
> If you need to process recurring payments with Apple Pay using the SDK, refer to the [Recurring SDK integration](doc:apple-pay-recurring-sdk) guide.

## Start using your Yuno integration

With your Yuno integration set up, you're ready to start processing payments. Using our SDK integrations, you can seamlessly offer payments through Apple Pay Wallet, providing your users with a smooth and secure payment experience.

<Image align="center" width="350px" src="https://files.readme.io/4617077-Screenshot_2024-08-07_at_5.03.42_PM.png" />

### Step 1: Create customer (optional)

Use the [create customer](ref:create-customer) endpoint to register the customer's information. While this step is optional for one-time payments, it's recommended for better transaction tracking and customer management.

### Step 2: Set up checkout session

Create a checkout session with the customer information. Use the [create checkout session](ref:create-checkout-session) endpoint, providing the payment amount and location details.

### Step 3: Generate one-time token (OTT)

An [OTT](doc:how-yuno-payment-flow-works#step-3-create-a-one-time-token) is a unique identifier Yuno generates to protect your customer's privacy and security. You will obtain the OTT from the Yuno SDK, which handles various payment method scenarios, supports fraud screening, and 3DS authentication. Use `payment_method_type = APPLE_PAY`. For a list of all available options, see the [Payment types](ref:payment-type-list) page.

### Step 4: Create the payment

Use the [create payment](ref:create-payment) endpoint to create a payment using the data received in the previous steps.

### Step 5: Retrieve payment details

To check the payment status, you can analyze the `status` and `sub_status` in the response from the [create payment](ref:create-payment) endpoint, or use [webhooks](doc:webhooks). Refer to the [payment Status](ref:payment) page to see all possible statuses.

## Configure Apple Pay in your iOS app

To enable Apple Pay in your app, you need to configure the Apple Pay capability in Xcode:

1. **Add Apple Pay capability**: In Xcode, add the Apple Pay capability to your project.

<Image align="center" width="700px" src="https://files.readme.io/757a4706d90b183020c05910648ed12822233bb14b0436a0d67f6eb18e03f77e-image.png" />

2. **Select merchant ID**: Select the merchant ID you created during the [prerequisites](doc:prerequisites-apple-pay) process. It will appear if you are logged into your developer account.

<Image align="center" width="700px" src="https://files.readme.io/4bc6e2bb6d6317b3cf3b39c3b9483b082b5d97e0f046222c862cef28edae90dd-image.png" />

<br />

> ⚠️
>
> Make sure the Merchant ID is correctly linked to the Apple Pay capability in your app's App Identifier in the Apple Developer portal. This is configured under: **Certificates, Identifiers & Profiles** → **Identifiers** → **select your app** → **Capabilities** tab.

## Prepare for testing with Apple Pay

Before you start making test payments with Apple Pay, follow these steps to ensure your setup is correctly configured:

### Browser testing

1. Follow the [official Apple Pay test guidelines](https://developer.apple.com/apple-pay/sandbox-testing/) to create a test account and set up test cards.
2. Test in Safari to ensure compatibility and functionality.
3. Set up the testing domain URL in the **Apple Pay** connection within your [Yuno dashboard](https://dashboard.y.uno/connections) to ensure that payments are routed correctly during testing.

### Testing in the app

1. **Provide test email**: Provide an email address to any of the iOS team members that does not have an Apple ID associated with it (as specified in the Apple documentation).

2. **Set up iCloud**: Log in to iCloud using the email provided in the previous step.

3. **Add test cards**: In the Wallet app, add one of the cards available on the [sandbox testing cards page within the Apple Developer website](https://developer.apple.com/apple-pay/sandbox-testing/).

<Image align="center" width="350px" src="https://files.readme.io/a1e4444a95a84d8f16910480f7fd1adc5144afc68164d7bb9d0b62c058d177f6-image.png" />

4. **Follow payment flow**: Follow the flow you use for any other payment method.

<Image align="center" width="350px" src="https://files.readme.io/6b449c2330349d52c6a74645abfb29fd11e09298437ed6bbf94f19fd5de0d357-image.png" />

<Image align="center" width="350px" src="https://files.readme.io/7c8ba2456ec3db7abe13324298a7228facccb8db21acf65078c95cdd32e02551-image.png" />

## Related documentation

- [Prerequisites for Apple Pay](doc:prerequisites-apple-pay) - Initial requirements before integration
- [Dashboard setup and configuration](doc:apple-pay-setup-configuration) - Required setup steps
- [Recurring SDK integration](doc:apple-pay-recurring-sdk) - SDK-based recurring implementation
- [Direct integration for one-time payments](doc:direct-integration) - Non-SDK direct integration
