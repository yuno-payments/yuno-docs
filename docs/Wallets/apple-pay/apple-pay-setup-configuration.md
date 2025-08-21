---
title: Apple Pay Setup and Configuration
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

This guide covers the common setup and configuration steps required for all Apple Pay integrations with Yuno.

## Prerequisites

Before starting the dashboard configuration, ensure you have completed the [Prerequisites](doc:prerequisites-apple-pay) process to obtain the necessary Apple Pay certificates and merchant credentials.

## Step 1: Add the Apple Pay connection

To add the Apple Pay connection to the Yuno Dashboard, follow these steps:

1. Log in to your [Yuno Dashboard](https://dashboard.y.uno/connections).
2. Navigate to the **Connections** section.
3. Locate and select the **Apple Pay** option and click **Connect**.
4. Provide a **Name** for the connection, select **Apple Pay** as **Payment method**, and provide the information you acquired when following the [Prerequisites](doc:prerequisites-apple-pay) process, click **Next**.
5. Configure set up costs (optional) and accounts in the following two steps.
6. Click **Save**. Apple Pay will be added to your connections.

<Image align="center" width="700px" src="https://files.readme.io/6d674dd-Screenshot_2024-07-02_at_2.27.47_PM.png" />

## Step 2: Configure routing

Set up a new route to control how payments are processed through Apple Pay. Follow the steps below:

> 📘 Understanding Routing
>
> Visit the [Routing](doc:routing) page for additional information on this step.

1. In the [Yuno Dashboard](https://dashboard.y.uno/), navigate to the **Routing** section.
2. Find the **Apple Pay** connection. If you have not created a route for Apple Pay yet, it will be on the **Not published** tab.
3. Set up a new route by pressing **Setup** on your **Apple Pay** module (or **View** if the route is published) and then clicking on **Create new route**. Give the connection a name and click **Save**.
4. Add conditions to specify how payments should be routed through Apple Pay.
5. Add Apple Pay as the payment processor for this route to ensure that payments meeting the defined conditions are processed through Apple Pay.
6. **Publish** the route once all configurations are defined.

Here's a simple route processing all payments through Apple Pay.

<Image align="center" width="600px" src="https://files.readme.io/d5b9a8c-Screenshot_2024-07-02_at_2.30.09_PM.png" />

7. Finally, **set the route for the Card payment method** indicating which provider you want to process payments with.

## Step 3: Enable Apple Pay in Checkout Builder

> 📘 Learn More About Checkout Builder
>
> Visit the [Routing](doc:checkout-builder) page for additional information on this step.

To make Apple Pay available to your end users, you have to enable it on the Checkout Builder:

1. In the [Yuno Dashboard](https://dashboard.y.uno/), navigate to the **Checkout Builder** section.
2. Locate the available **Payment methods** and enable **Apple Pay**. Click the three dots next to each method for additional options.
3. Click **Publish settings** to make Apple Pay available as a payment option for all transactions that meet the defined routing criteria.

<Image align="center" src="https://files.readme.io/52781326ea260052f9a62e98d5cd6a1bbfdaa39f50062912f15f3bdb310aa019-4eb043c-Screenshot_2024-08-07_at_4.57.16_PM.png" />

## Next steps

After completing the dashboard setup, you can proceed with your preferred integration method:

### One-time payments

- [Direct integration](doc:direct-integration) - Integrate directly with Yuno's API
- [SDK integration](doc:sdk-integration-apple) - Use Yuno's SDK for easier implementation

### Recurring payments

- [Recurring direct integration](doc:apple-pay-recurring-direct) - Handle recurring payments with direct API calls
- [Recurring SDK integration](doc:apple-pay-recurring-sdk) - Implement recurring payments using Yuno's SDK

> 📘 Additional Configuration for Recurring Payments
>
> If you plan to implement recurring payments, you will need to configure an additional URL in your Apple Pay connection where customers can manage their subscriptions (cancel, modify, etc.). This URL must be created and hosted by your merchant platform.
