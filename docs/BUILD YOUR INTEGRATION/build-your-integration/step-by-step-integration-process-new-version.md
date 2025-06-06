---
title: Step by Step Integration Process (new version)
deprecated: false
hidden: true
metadata:
  robots: index
---
This page guides you through the integration process with Yuno. After [setting up your Yuno account](doc:step-1-set-up-your-account), we will walk you through selecting the right SDK, referencing the correct endpoints, and integrating additional services. Once you complete these steps, you will be ready to process payments with Yuno.

Before proceeding, choose the integration method that best suits your needs. For an overview of available options and their capabilities, see [ Choose the Right Integration You](doc:choose-the-right-integration-for-you).

## Step 1: Integrate the basic payment workflow

To start, integrate the core payment workflow that enables you to create payments. The steps will vary based on the integration you choose. Below is a general overview of the process:

1. Create a customer.
2. Create a checkout session.
3. Show the payment methods available for the customer to choose from.
4. Request the necessary information based on the selected payment method.
5. Create the payment.

<Cards columns={4}>
  <Card title="Full SDK">
    * [Web](https://docs.y.uno/docs/full-checkout-sdk)
    * [Android](https://docs.y.uno/docs/full-checkout-android)
    * [iOS](https://docs.y.uno/docs/full-checkout-ios)
    * [Flutter](https://docs.y.uno/docs/full-sdk-flutter)
  </Card>

  <Card title="Lite SDK (Payment)" href="https://docs.y.uno/docs/full-checkout-sdk" />

  <Card title="Lite SDK (Enrollment)" href="https://docs.y.uno/docs/full-checkout-sdk" />

  <Card title="Secure Fields" href="https://docs.y.uno/docs/full-checkout-sdk" />

  <Card title="Headless SDK (Payment)" href="https://docs.y.uno/docs/full-checkout-sdk" />

  <Card title="Headless SDK (Enrollment)" href="https://docs.y.uno/docs/full-checkout-sdk" />

  <Card title="Direct Workflow" href="https://docs.y.uno/docs/full-checkout-sdk" />
</Cards>

## Step 2: Implement refunds (optional)

Once the basic integration is complete, we recommend implementing refunds to enhance your payment system. Using the [refunds endpoint](ref:refund-payment), you can process full or partial refunds directly within your environment.

Key considerations:

* Refunds can also be managed through the Yuno dashboard.
* Not all payment methods support refunds.

## Step 3: Implement captures and cancellations (optional)

To gain full control over transactions, integrate the [cancel](doc:cancel-payments) and [capture](doc:capture-authorization) endpoints:

* **Cancellations**: Allow you to void ongoing transactions with a pending status (often for asynchronous payment methods).
* **Captures**: Enable you to finalize pre-authorized transactions (commonly used for credit card authorizations).

## Step 4: Set up webhooks (optional)

We strongly recommend configuring [webhooks](doc:webhooks) to receive real-time updates about payment events. Webhooks:

* Eliminate the need for frequent API requests by notifying your system when a payment status changes.
* Allow you to process payment information on demand, improving efficiency.

You can configure webhooks from the Yuno dashboard.

## Step 5: Test and go live

Once your integration is complete:

1. Test your setup using the [Yuno Test Gateway](doc:yuno-testing-gateway) for credit cards.
2. Verify functionality across all workflows.
3. Switch to production credentials by [enabling your account for production](doc:environments).

After successful testing, you’re ready to go live with Yuno.