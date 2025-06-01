---
title: Quickstart
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Welcome to the Get Started guide for integrating Yuno into your business operations. This page covers the steps you need to take to ensure a smooth and efficient integration process.

## Step 1: Set up your dashboard

The first step when getting in touch with Yuno for the first time is understanding what you can do with Yuno's cutting-edge Dashboard solutions. Without requiring any code, you can monitor your operations in real-time, define payment flows, customize the checkout, and manage reports. Use the [Set Up Your Dashboard](doc:set-up-your-dashboard) guides to learn how to use all available functionalities.

On your journey with Yuno's Dashboard, you will complete the following  main steps before starting your integration:

1. Get your credential to have access to the Yuno services.
2. Set up connections with payment processors, acquirers, and fraud prevention solutions.
3. Build dynamic routes to define how payments will be processed.
4. Configure your checkout using the checkout builder to make your connected payments available.

## Step 2: Choose the integration method

Once you have completed the initial steps on the Dashboard, the next step is to explore the integration options offered by Yuno. Head to the [Workflows page](doc:workflows) to discover the two available integration categories: Checkout and Direct. On this page, you will gain insights into the unique advantages of each workflow and the integration methods they offer. This information will help you make an informed decision about which integration approach best suits your needs.

## Step 3: Build your integration

After determining the ideal integration that meets your requirements, it is time to initiate the process. Access the integration page using the links below to gain a comprehensive understanding of all the steps involved in the integration, as well as the necessary procedures for processing payments:

- [Full Checkout](doc:the-ultimate-checkout-full) 
- [Lite Checkout](doc:the-ultimate-checkout-lite)
- [Secure Fields](doc:secure-fields)
- [Direct Flow](doc:direct-flow)
- [Yuno Plugins](doc:vtex)

## Step 4: Test your integration

The test stage is essential to ensure your integration runs accordingly and connects perfectly with Yuno solutions. To make this process easier, you find on the Yuno Docs step-by-step guides on how to manage payments. The following guides walk you through all steps to complete each process.

- [Enroll payment methods](doc:enroll-payment-methods).
- [Create payments](doc:create-payments) using different payment methods and functionalities, such as 3DS and split payments.
- Test card payments using the [Yuno Test Gateway](doc:test-card-payments-with-yuno-testing-gateway).
- [Cancel payments](doc:cancel-payments).
- [Refund payments](doc:refund-payments).
- [Build reports](doc:build-reports).

When you use Yuno Docs, you can perform all API requests directly through the [Yuno API Reference endpoints](ref:introduction). If it is your first time using Yuno Docs, check the [How to use Yuno Docs endpoints](ref:how-to-use-yuno-docs-endpoints) guide to learn how to perform requests directly through the documentation.

## Step 5: Receive notifications using Webhooks (optional)

Monitoring the payment operation is another essential portion of managing payments. Yuno provides a webhooks system that provides:

- **Real-time updates**: Unlike polling, which requires you to check for updates periodically, Webhooks are triggered in real-time by events, so you'll always be up-to-date on the status of your payments.
- **Efficiency**: Webhooks are more efficient as they only send notifications when something happens, saving you time and resources.
- **Flexibility**: You can use the notifications from the Webhooks can be used to trigger a variety of actions, such as sending emails, updating databases, or launching workflows. This gives you the freedom to handle payment notifications in your preferred way.

Using webhooks to receive notifications is not required to perform payment operations on the Yuno systems. However, Yuno strongly recommends you use this solution. Check the [Configuring Yuno Webhooks](doc:configuring-yuno-webhooks) to learn all the necessary configuration steps to receive event notifications in real-time.

## Final Step: Moving to production

After successfully finishing the abovementioned steps, you can move your checkout system into production. On the Yuno system, to move to production, you need to enable the Live Mode on the Yuno Dashboard. The [Enable Live Mode](doc:enable-live-mode) guide describes the steps you need to take to start receiving real payments on your checkout.