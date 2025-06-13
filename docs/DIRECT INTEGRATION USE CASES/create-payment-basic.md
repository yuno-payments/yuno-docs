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
On this page, you will find a walk-through guide on creating a payment and the necessary information to accomplish such a task.

## Requirements

Before starting following the steps described in this guide, you need to:

* Access your [API credentials](doc:developers-credentials) on the Yuno Dashboard, which are composed by:
  * `public-api-key`
  * `private-secrete-key`
  * `account_id`
* [Set up your connections](doc:connections) on your Yuno Dashboard account.
* [Build a route](doc:routing) for the payment method to define how it will be processed.
* [Configure the checkout builder](ref:manage-your-checkout) to make your connected payments available.

Make sure to complete these requirements before following the create payment guide.

> 📘 Explore Yuno Postman Collections
>
> Yuno provides [Postman Collections](/reference/postman-collections) that you can use to replicate the use cases locally.

## Steps summary

The create payment process normally requires finishing the four steps listed below.

1. [Create a customer](ref:create-customer)
2. [Create a checkout session](ref:create-checkout-session)
3. [Create a one-time token](#step-3-create-a-one-time-token-ott)
4. [Create the payment](ref:create-payment)

> 📘 Additional payment methods and functionalities
>
> Different payment methods, such as with specific wallets or BNPL, or functionalities, such as split payments, may require additional steps before creating the payment. Yuno provides complementary guides for these situations. Check the [Create payments](create-payments) page to find them all.

## Create a payment

### Step 1: Create a customer

Use the [Create Customer](ref:create-customer) to register the customer info. You will need to provide personal customer information. In addition, you also need to supply the `merchant_customer_id`, a unique identifier for the customer used on your system.

> 📘 Customer complementary information
>
> When creating a **Customer**, certain information is not required but can improve the user's payment experience if provided. Phone, billing address, and shipping address are examples of not mandatory data you can provide.
>
> If you add optional information, be aware of the required mandatory fields.

At the end of the create a customer process, you will receive an `id`, which identifies the user within the Yuno system. Use the `id` to initialize the checkout.

If you are creating a payment for an existing user who was previously created and already had an `id` you can skip this step.

### Step 2: Create a checkout session

With a customer registered, you can create a checkout session. The checkout is when the customer finalizes their order and proceeds to pay for the products or services they wish to acquire. Therefore, at this stage, you will provide information regarding the payment amount and the location where it is being created.

Use the [Create Checkout Session](ref:create-checkout-session) endpoint. Notice that the `customer_id` required to perform the request is the `id` you received when creating the customer in [Step 1](doc:create-payment-basic#1-create-a-customer).

From the request response to the  [Create Checkout Session](ref:create-checkout-session) endpoint, you will receive the `checkout_session` information. It will be used to create the one-time token (OTT) and the payment on the next steps.

### Step 3: Create a one-time token (OTT)

An one-time token is a unique identifier Yuno generates to protect your customer privacy and security. It serves as an identifier for payments detail and prevents sensitive data from being stored on your servers. Therefore, you can use one-time tokens to make it simple for your customers to repeat payments without re-entering their payment information, making the process more secure and convenient.

You will always get the one-time token from the Yuno SDK on your application. By using Yuno's SDK we take care of every particular scenario that different payment methods could have. This allows us to:

* Ask for missing information for the enrolled payment method in case the selected provider in the CARD route needs some additional fields.
* Support fraud screening
* Support 3DS

You can always use the list [Payment type](ref:payment-type-list) to check all available payment types. In the response of the SDK, you will receive the `one-time-token`, which you will use to create the payment.

> 📘 Testing credit card payments
>
> Remember that for testing credit card payments you can set the [Yuno Test Payment Gateway](doc:yuno-testing-gateway) as a provider in your Card route.

### Step 4: Create a payment

You will create a payment using the endpoint [Create Payment](ref:create-payment). With Yuno, you can create payments with several payment methods, using 3DS or split payments. However, this guide focuses on a simple payment without additional authentication, validation, or enrollment requirements.

Below, you find a deeper description of how to create a payment.

#### 4.1 Provide the required attributes

Provide customer-related information, including the `checkout_session` from Step 2 through `checkout.session` and `customer_payer` object that contains the `id` from Step 1.

Certain objects are not mandatory when creating a payment. However, if you provide this information, the user’s payment experience will be enhanced. Be aware of the mandatory fields if you wish to provide this information.

#### 4.2 Choose the capture type

Yuno provides two options for payment capture:

* Single-step: Authorization and capture are performed simultaneously. You only need to create the payment. The authorization and capture are performed automatically. For the single-step option, you need to send the attribute `capture` as `true` on the request.
* Two steps: Authorization and capture are performed at different moments. After creating the payment, you will need to perform an authorization request and a capture request.  if you wish to process the payment in Two Steps, send `capture` as `false` and after creating the payment, use the [Authorize Payment](ref:authorize-payment) and the [Capture Authorization](ref:capture-authorization) to complete the process.

#### 4.3 Additional features

Yuno also lets you use some additional features that are supported in the basic payment creation process:

* `vault_on_success`: If your customer uses a credit card to make the payment, we let you enroll that payment method for the customer for future purchase in the same step.
* `installments`: In case you offer your clients installments for their payments and your chosen processor accepts them, you can send us the amount of installments to create the payment with.

Both fields can be found in the payment\_method detail section of the payment.

### Step 5: Check the payment status

After performing the request to the [Create Payment](ref:create-payment), you can check the payment status by analyzing the `status` and `sub_status` from the response. Check the page [Payment Status](ref:payment) to see all options you can receive in response to the payment creation request.

Depending on the processor and payment method, the status may take some time to update. Therefore, you may need to use endpoints to recover the payment status. To perform this task, you can use the [Retrieve Payment by ID](ref:retrieve-payment-by-id) or [Retrieve Payment by merchant\_order\_id](ref:retrieve-payment-by-merchant_order_id). Another option is to use webhooks to receive notifications after each event. Yuno recommends you use webhooks to monitor asynchronous payments better. Check the [Webhooks](doc:configuring-yuno-webhooks) guide to learn how to configure the webhooks solution provided by Yuno.

> 📘 Test Card Payments
>
> If you need to test Card payments in general, Yuno provides the Yuno Test Payment Gateway. It works as a connection, however, it is available only in the sandbox environment. Check the [Yuno Test Payment Gateway page](yuno-testing-gateway) to learn all functionalities, or go directly to the guide on [how to test card payments](yuno-testing-gateway#test-card-payments-with-yuno-testing-gateway).