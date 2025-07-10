---
title: Direct integration
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Integrating Apple Pay with Yuno’s direct integration allows you to securely process payments and control your payment flow. This guide walks you through connecting Apple Pay, configuring routing, and preparing your system for direct payment processing.

> 📘 Additional information
>
> For more details about the direct integration flow, see the [Direct flow](#direct-flow) section.

## Step 1: Add the connection

To begin, add the Apple Pay connection in the Yuno dashboard:

1. Log in to your [Yuno dashboard](https://dashboard.y.uno/connections).
2. Go to the **Connections** section.
3. Find and select **Apple Pay**, then click **Connect**.
4. Enter a **Name** for the connection, select **Apple Pay** as the payment method, and provide the required information from the [prerequisites](doc:prerequisites-apple-pay) process.
5. Click **Add**. Apple Pay will now appear in your list of connections.

<Image align="center" width="700px" src="https://files.readme.io/6d674dd-Screenshot_2024-07-02_at_2.27.47_PM.png" />

## Step 2: Add a route for Apple Pay

Next, set up a route to define how payments are processed through Apple Pay:

1. In the [Yuno dashboard](https://dashboard.y.uno/connections), go to the **Routing** section.
2. Your new **Apple Pay** connection will appear under the **Not published** tab if you have not created a route yet.
3. Click **Setup** on the Apple Pay module, then select **Create new route**.
4. Add conditions to specify when payments should be routed through Apple Pay.
5. Set **Apple Pay** as the payment processor for this route to ensure payments that meet your conditions are processed accordingly.
6. Save and publish the route once your configuration is complete.

> 📘 Additional information
>
> For more details, see the [Routing](#routing) documentation.

The image below shows an example of a simple route where Apple Pay processes all payments.

<Image align="center" width="600px" src="https://files.readme.io/d5b9a8c-Screenshot_2024-07-02_at_2.30.09_PM.png" />

7. After setting up the route, make sure to configure the route for the card payment method, specifying the provider you want to use for processing card payments.

## Step 3: Enable Apple Pay in the checkout builder

To make Apple Pay available to your end users, you need to enable it in the Checkout Builder. Follow these steps:

1. In the [Yuno dashboard](https://dashboard.y.uno/connections), go to the **Checkout Builder** section.
2. Select **Set condition** to define when Apple Pay should be shown as a payment option.
3. In the **Payment methods** list, enable **Apple Pay**.
4. Click **Publish** to make Apple Pay available for all transactions that meet your routing criteria.

<Image align="center" src="https://files.readme.io/52781326ea260052f9a62e98d5cd6a1bbfdaa39f50062912f15f3bdb310aa019-4eb043c-Screenshot_2024-08-07_at_4.57.16_PM.png" />

## Step 4: Create payments with direct integration

This section outlines the steps to process payments using the direct integration method. For a detailed walkthrough, see the full guide on [creating payments](doc:create-payment-basic).

1. **Create a customer** (optional): Use the [Create customer](ref:create-customer) endpoint to register your customer's information.

2. **Create the payment**: Use the [Create payment](ref:create-payment) endpoint to initiate a payment, providing the `cryptogram` returned by the Apple Pay SDK. If you have not integrated Apple’s SDK, we recommend using [our SDKs](doc:sdk-integration-apple) for a simplified integration process.

3. **Retrieve payment details**: To check the payment status, review the `status` and `sub_status` fields in the response from the [Create payment](ref:create-payment) endpoint, or use [webhooks](doc:webhooks) for real-time updates. Refer to the [payment status](ref:payment) page for all possible statuses.