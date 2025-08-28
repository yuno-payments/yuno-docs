---
title: Create Payments with Workflow: DIRECT
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Create Payments with Workflow: DIRECT
  description: >-
    Create Payments with Workflow: DIRECT is a walk-through guide on creating backend-to-backend payments using the direct integration flow and the
    necessary information to accomplish such a task.
  robots: index
next:
  description: ''
  pages:
    - type: basic
      slug: yuno-testing-gateway
      title: Yuno Testing Gateway
---
On this page, you will find a walk-through guide on creating payments with **workflow: DIRECT** using the backend-to-backend integration flow and the necessary information to accomplish such a task.

## What is Workflow: DIRECT?

**Workflow: DIRECT** refers to backend-to-backend integrations where your server communicates directly with Yuno's servers without redirecting users to external payment pages. This approach gives you full control over the payment experience while maintaining security through server-to-server communication.

> ❗️ **Important Note**
>
> Workflow: DIRECT is only available for PCI-compliant merchants. If you're not PCI-compliant, we recommend using Yuno's SDKs which handle all security requirements automatically.

## Requirements

Before starting following the steps described in this guide, you need to:

* Access your [API credentials](doc:developers-credentials) on the Yuno Dashboard, which are composed by:
  * `public-api-key`
  * `private-secrete-key`
  * `account_id`
* [Set up your connections](doc:connections) on your Yuno Dashboard account.
* [Build a route](doc:routing) for the payment method to define how it will be processed.
* Ensure your company is PCI-certified to use the server-to-server card payments service.
* Have your own checkout/UI implementation to handle the payment experience.

Make sure to complete these requirements before following the create payment guide.

> 📘 Explore Yuno Postman Collections
>
> Yuno provides [Postman Collections](/reference/postman-collections) that you can use to replicate the use cases locally.

## Steps summary

The create payment process using **workflow: DIRECT** requires completing the following steps:

1. [Create a customer (optional)](ref:create-customer)
2. [Create the payment with workflow: DIRECT](ref:create-payment)

> 📘 Additional payment methods and functionalities
>
> Different payment methods, such as with specific wallets or BNPL, or functionalities, such as split payments, may require additional steps before creating the payment.

## Create a payment with workflow: DIRECT

### Step 1: Create a customer (Optional)

Use the [Create Customer](ref:create-customer) to register the customer info. You will need to provide personal customer information. In addition, you also need to supply the `merchant_customer_id`, a unique identifier for the customer used on your system.

> 📘 Customer complementary information
>
> When creating a **Customer**, certain information is not required but can improve the user's payment experience if provided. Phone, billing address, and shipping address are examples of not mandatory data you can provide.
>
> If you add optional information, be aware of the required mandatory fields.

At the end of the create a customer process, you will receive an `id`, which identifies the user within the Yuno system. Use the `id` to create the payment.

If you are creating a payment for an existing user who was previously created and already had an `id` you can skip this step.

> 📘 Customer creation is optional
>
> You can send the customer information directly in the payment request instead of creating a customer object in Yuno.

### Step 2: Create the payment with workflow: DIRECT

As you handle the whole payment experience with the direct integration, you will need to display the payment methods enabled in your Yuno account. Once the user has selected the payment method, you can create a payment. A payment gathers all crucial details regarding the order, customer specifics, total amount, currency, products, shipping details, and more.

**Important**: When creating the payment, you must specify `"workflow": "DIRECT"` in your request to ensure the backend-to-backend flow.

You can create a Payment using the [Create Payment](ref:create-payment) endpoint. With Yuno, you can create payments with several payment methods, using 3DS or split payments. However, this guide focuses on a simple payment without additional authentication, validation, or enrollment requirements.

Below, you find a deeper description of how to create a payment.

#### 2.1 Provide the required attributes

Provide customer-related information, including the `customer_payer` object that contains the `id` from Step 1 (if you created a customer) or the customer information directly in the payment.

**Required for workflow: DIRECT:**
- Set `"workflow": "DIRECT"` in your payment request
- Handle the complete payment experience in your own UI/checkout

Certain objects are not mandatory when creating a payment. However, if you provide this information, the user's payment experience will be enhanced. Be aware of the mandatory fields if you wish to provide this information.

#### 2.2 Choose the capture type

Yuno provides two options for payment capture:

* Single-step: Authorization and capture are performed simultaneously. You only need to create the payment. The authorization and capture are performed automatically. For the single-step option, you need to send the attribute `capture` as `true` on the request.
* Two steps: Authorization and capture are performed at different moments. After creating the payment, you will need to perform an authorization request and a capture request.  If you wish to process the payment in Two Steps, send `capture` as `false` and after creating the payment, use the [Authorize Payment](ref:authorize-payment) and the [Capture Authorization](ref:capture-authorization) to complete the process.

#### 2.3 Additional features

Yuno also lets you use some additional features that are supported in the basic payment creation process:

* `vault_on_success`: If your customer uses a credit card to make the payment, we let you enroll that payment method for the customer for future purchases in the same step.
* `installments`: In case you offer your clients installments for their payments and your chosen processor accepts them, you can send us the amount of installments to create the payment with.

Both fields can be found in the payment\_method detail section of the payment.

### Step 3: Check the payment status

After performing the request to the [Create Payment](ref:create-payment) endpoint, you can check the payment status by analyzing the `status` and `sub_status` from the response. Check the page [Payment Status](ref:payment) to see all options you can receive in response to the payment creation request.

Depending on the processor and payment method, the status may take some time to update. Therefore, you may need to use endpoints to recover the payment status. To perform this task, you can use the [Retrieve Payment by ID](ref:retrieve-payment-by-id) or [Retrieve Payment by merchant\_order\_id](ref:retrieve-payment-by-merchant_order_id). Another option is to use webhooks to receive notifications after each event. Yuno recommends you use webhooks to monitor asynchronous payments better. Check the [Webhooks](doc:configure-webhooks) guide to learn how to configure the webhooks solution provided by Yuno.

> 📘 Test Card Payments
>
> If you need to test Card payments in general, Yuno provides the Yuno Test Payment Gateway. It works as a connection, however, it is available only in the sandbox environment. Check the [Yuno Test Payment Gateway page](yuno-testing-gateway) to learn all functionalities, or go directly to the guide on [how to test card payments](yuno-testing-gateway#test-card-payments-with-yuno-testing-gateway).

## Example: Payment Request with Workflow: DIRECT

Here's an example of how to create a payment with workflow: DIRECT:

```json
{
  "amount": 1000,
  "currency": "USD",
  "merchant_order_id": "order_123",
  "workflow": "DIRECT",
  "customer_payer": {
    "merchant_customer_id": "customer_456",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com"
  },
  "payment_method": {
    "type": "CARD",
    "installments": 1
  },
  "capture": true
}
```

## Important considerations for Workflow: DIRECT

> ❗️
>
> We always recommend using Yuno's SDKs over Direct Flow integrations. Yuno's SDKs are PCI compliant and simplify the payment process by managing all complexities, including fraud prevention, 3DS, and payment provider-specific requirements. Direct Flow requires merchants to handle these aspects manually, increasing complexity and risk.

For every implementation, we recommend taking the payment <code>status</code> and <code>sub\_status</code> as the main reference for the [payment's state](ref:payment). A payment could have different [transactions](ref:transaction) associated with it, so by focusing on the payment **status/sub\_status**, you can have the latest state regardless of how many transactions were made, giving you clear input for decision-making.

### Webhooks

We recommend configuring [Webhooks](doc:webhooks) in your Yuno dashboard. Webhooks are the best way to ensure your system stays up-to-date with payment progress and status. Since event notifications are triggered automatically, your system won't need to perform repeated requests to Yuno.

### Device Fingerprints

The customer's device fingerprints are used for fraud prevention purposes. They are usually generated by using third-party JavaScript in the checkout. If you are using a **Direct integration** and want to support fraud providers in the [payment flow](ref:create-payment), you can use this object to specify the necessary information.

### Three-D Secure Setup

Use our JS only to get the `three_d_secure_setup_id` and then handle the payment as an only API integration. The Direct workflow is only available for PCI-compliant merchants. It provides a straightforward way to create a payment and validate user information, requiring the merchant to perform just one request to create the payment.
