---
title: Create Payments
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Create Payments
  description: >-
    Create Payments is a walk-through guide on creating a payment and the
    necessary information to accomplish such a task.
  robots: index
next:
  description: ''
  pages:
    - type: basic
      slug: yuno-testing-gateway
      title: Yuno Testing Gateway
---
On this page, you will find a walk-through guide on creating a payment using the direct integration flow and the necessary information to accomplish such a task.

## Requirements

Before starting following the steps described in this guide, you need to:

* Access your [API credentials](doc:developers-credentials) on the Yuno Dashboard, which are composed of:
  * `public-api-key`
  * `private-secrete-key`
  * `account_id`
* [Set up your connections](doc:connections) on your Yuno Dashboard account.
* [Build a route](doc:routing) for the payment method to define how it will be processed.
* Ensure your company is PCI-certified to use the server-to-server card payments service.

Make sure to complete these requirements before following the create payment guide.

<Callout icon="📘" theme="info">
  **Explore Yuno Postman Collections**

  Yuno provides [Postman Collections](/reference/postman-collections) that you can use to replicate the use cases locally.
</Callout>

## Steps summary

The create payment process using the direct integration flow requires completing the following steps:

1. [Create a customer (optional)](ref:create-customer)
2. [Create the payment](ref:create-payment)

<Callout icon="📘" theme="info">
  **Additional payment methods and functionalities**

  Different payment methods, such as with specific wallets or BNPL, or functionalities, such as split payments, may require additional steps before creating the payment.
</Callout>

## Step 1: Create a customer

Use the [Create Customer](ref:create-customer) to register the customer info. You will need to provide personal customer information. In addition, you also need to supply the `merchant_customer_id`, a unique identifier for the customer used on your system.

<Callout icon="📘" theme="info">
  **Customer complementary information**

  When creating a **Customer**, certain information is not required but can improve the user's payment experience if provided. Phone, billing address, and shipping address are examples of not mandatory data you can provide.

  If you add optional information, be aware of the required mandatory fields.
</Callout>

At the end of the create a customer process, you will receive an `id`, which identifies the user within the Yuno system. Use the `id` to create the payment.

If you are creating a payment for an existing user who was previously created and already had an `id` you can skip this step.

<Callout icon="📘" theme="info">
  **Customer creation is optional**

  You can send the customer information directly in the payment request instead of creating a customer object in Yuno.
</Callout>

## Step 2: Create the payment

As you handle the whole payment experience with the direct integration, you will need to display the payment methods enabled in your Yuno account. Once the user has selected the payment method, you can create a payment. A payment gathers all crucial details regarding the order, customer specifics, total amount, currency, products, shipping details, and more.

You can create a Payment using the [Create Payment](ref:create-payment) endpoint. With Yuno, you can create payments with several payment methods, using 3DS or split payments. However, this guide focuses on a simple payment without additional authentication, validation, or enrollment requirements.

Below, you find a deeper description of how to create a payment.

### 2.1 Provide the required attributes

Provide customer-related information, including the `customer_payer` object that contains the `id` from Step 1 (if you created a customer) or the customer information directly in the payment.

Certain objects are not mandatory when creating a payment. However, if you provide this information, the user's payment experience will be enhanced. Be aware of the mandatory fields if you wish to provide this information.

### 2.2 Choose the capture type

Yuno provides two options for payment capture:

* Single-step: Authorization and capture are performed simultaneously. You only need to create the payment. The authorization and capture are performed automatically. For the single-step option, you need to send the attribute `capture` as `true` on the request.
* Two steps: Authorization and capture are performed at different moments. After creating the payment, you will need to perform an authorization request and a capture request.  If you wish to process the payment in Two Steps, send `capture` as `false` and after creating the payment, use the [Authorize Payment](ref:authorize-payment) and the [Capture Authorization](ref:capture-authorization) to complete the process.

### 2.3 Additional features

Yuno also lets you use some additional features that are supported in the basic payment creation process:

* `vault_on_success`: If your customer uses a credit card to make the payment, we let you enroll that payment method for the customer for future purchases in the same step.
* `installments`: In case you offer your clients installments for their payments and your chosen processor accepts them, you can send us the amount of installments to create the payment with.

Both fields can be found in the payment_method detail section of the payment.

## Step 3: Check the payment status

After performing the request to the [Create Payment](ref:create-payment) endpoint, you can check the payment status by analyzing the `status` and `sub_status` from the response. Check the page [Payment Status](ref:payment) to see all options you can receive in response to the payment creation request.

Depending on the processor and payment method, the status may take some time to update. Therefore, you may need to use endpoints to recover the payment status. To perform this task, you can use the [Retrieve Payment by ID](ref:retrieve-payment-by-id) or [Retrieve Payment by merchant_order_id](ref:retrieve-payment-by-merchant_order_id). Another option is to use webhooks to receive notifications after each event. Yuno recommends you use webhooks to monitor asynchronous payments better. Check the [Webhooks](doc:configure-webhooks) guide to learn how to configure the webhooks solution provided by Yuno.

<Callout icon="📘" theme="info">
  **Test Card Payments**

  If you need to test Card payments in general, Yuno provides the Yuno Test Payment Gateway. It works as a connection, however, it is available only in the sandbox environment. Check the [Yuno Test Payment Gateway page](yuno-testing-gateway) to learn all functionalities, or go directly to the guide on [how to test card payments](yuno-testing-gateway#test-card-payments-with-yuno-testing-gateway).
</Callout>
