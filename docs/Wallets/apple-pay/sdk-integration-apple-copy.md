---
title: Apple SDK integration (One-time payments) (COPY)
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

This guide provides a step-by-step process to integrate the Yuno SDK with Apple Pay. Following this guide will enable seamless payment processing through Apple Pay.

## Step 1: Add the Connection

To add the Apple Pay connection to the Yuno dashboard, follow these steps:

1. Log in to your [Yuno dashboard](https://dashboard.y.uno/connections).
2. Navigate to the **Connections** section.
3. Locate and select the **Apple Pay** option and click **Connect**.
4. Provide a **Name** for the connection, select **Apple Pay** as **Payment method**, and provide the information you acquired when following the [Prerequisites](doc:prerequisites-apple-pay) process.
5. Click **Add**. Apple Pay will be added to your connections.

<Image align="center" width="700px" src="https://files.readme.io/6d674dd-Screenshot_2024-07-02_at_2.27.47_PM.png" />

## Step 2: Add a Route for Apple Pay

Set up a new route to control how payments are processed through Apple Pay. Follow the steps below:

1. In the [Yuno dashboard](https://dashboard.y.uno/connections), navigate to the **Routing** section.
2. The **Apple Pay** new connection is on the **Not published** tab.
3. Set up a new route by pressing **Setup** on your **Apple Pay** module and then pressing **Create new route**.
4. Add conditions to specify when payments should be routed through Apple Pay.
5. Add **Apple Pay** as the payment processor for this route to ensure that payments meeting the defined conditions are processed through **Apple Pay**.
6. Save and publish the route once all configurations are properly defined.

The following image displays a simple route through which **Apple Pay** processes all payments.

<Image align="center" width="600px" src="https://files.readme.io/d5b9a8c-Screenshot_2024-07-02_at_2.30.09_PM.png" />

7. Once that is done, you will need to **set the route for the Card payment method** indicating with which provider you want to process payments with.

## Step 3: Checkout Builder

To make Apple Pay available to your end users, follow these steps:

1. In the [Yuno dashboard](https://dashboard.y.uno/connections), navigate to the **Checkout Builder** section.
2. Locate the available **Payment methods** and enable **Apple Pay**.
3. Press **Publish** to make **Apple Pay** available as a payment option for all transactions that meet the defined routing criteria.

<Image align="center" width="700px" src="https://files.readme.io/4eb043c-Screenshot_2024-08-07_at_4.57.16_PM.png" />

## Step 4: Start Using Your Yuno Integration

With your Yuno integration set up, you're ready to start processing payments. Using our standard [Full](doc:full-sdk-workflow) or [Lite SDK](doc:the-ultimate-checkout-lite) integration, you can seamlessly offer payments through Apple Pay Wallet, providing your users with a smooth and secure payment experience.

<Image align="center" width="350px" src="https://files.readme.io/4617077-Screenshot_2024-08-07_at_5.03.42_PM.png" />

### Using Yuno's SDK

1. **Create a Customer**: Use the [Create Customer](ref:create-customer) endpoint to register the customer's information. (Optional)

2. **Set Up a Checkout Session**: You can create a checkout session with a registered customer. Use the [Create Checkout Session](ref:create-checkout-session) endpoint, providing the payment amount and location details.

3. **Generate a One-Time Token (OTT)**: An [OTT](doc:how-yuno-payment-flow-works#step-3-create-a-one-time-token) is a unique identifier Yuno generates to protect your customer's privacy and security. You will obtain the OTT from the Yuno SDK, which handles various payment method scenarios, supports fraud screening, and 3DS authentication. Use `payment_method_type = APPLE_PAY`. Access [Payment type](ref:payment-type-list) to view available payment types.

4. **Create the Payment**: Use the [Create Payment](ref:create-payment) endpoint to create a payment. To create the payment, you will inform the data received in the previous three steps.

5. **Retrieve Payment Details**: To check the payment status, you can analyze the `status` and `sub_status` in the response from the [Create Payment](ref:create-payment) endpoint or use the [Webhooks](doc:webhooks). Refer to the [Payment Status](ref:payment) page to see all possible statuses.

## Step 5: Configure Apple Pay in Your iOS App

To enable Apple Pay in your app, you need to configure the Apple Pay capability in Xcode:

1. **Add Apple Pay Capability**: In Xcode, add the Apple Pay capability to your project.

<Image align="center" width="700px" src="https://files.readme.io/757a4706d90b183020c05910648ed12822233bb14b0436a0d67f6eb18e03f77e-image.png" />

2. **Select Merchant ID**: Select the merchant ID created in the previous step. It will appear if you are logged in to your developer account.

<Image align="center" width="700px" src="https://files.readme.io/4bc6e2bb6d6317b3cf3b39c3b9483b082b5d97e0f046222c862cef28edae90dd-image.png" />

<br />

> ⚠️
>
> Make sure the Merchant ID is correctly linked to the Apple Pay capability in your app's App Identifier in the Apple Developer portal. This is configured under: **Certificates, Identifiers & Profiles** → **Identifiers** → **select your app** → **Capabilities** tab.

## Step 6: Prepare for Testing with Apple Pay

Before you start making test payments with Apple Pay, follow these steps to ensure your setup is correctly configured:

### Browser Testing

1. Follow the [official Apple Pay test guidelines](https://developer.apple.com/apple-pay/sandbox-testing/) to create a test account and set up test cards.
2. Test in Safari to ensure compatibility and functionality.
3. Set up the testing domain URL in the **Apple Pay** connection within your [Yuno dashboard](https://dashboard.y.uno/connections) to ensure that payments are routed correctly during testing.

### Testing in the App

1. **Provide Test Email**: Provide an email address to any of the iOS team members that does not have an Apple ID associated with it (as specified in the Apple documentation).

2. **Set Up iCloud**: Log in to iCloud using the email provided in the previous step.

3. **Add Test Cards**: In the Wallet app, add one of the cards available on the [sandbox testing cards page on the Apple Developer website](https://developer.apple.com/apple-pay/sandbox-testing/).

<Image align="center" width="350px" src="https://files.readme.io/a1e4444a95a84d8f16910480f7fd1adc5144afc68164d7bb9d0b62c058d177f6-image.png" />

4. **Follow Payment Flow**: Follow the flow you use for any other payment method.

<Image align="center" width="350px" src="https://files.readme.io/6b449c2330349d52c6a74645abfb29fd11e09298437ed6bbf94f19fd5de0d357-image.png" />

<Image align="center" width="350px" src="https://files.readme.io/7c8ba2456ec3db7abe13324298a7228facccb8db21acf65078c95cdd32e02551-image.png" />
