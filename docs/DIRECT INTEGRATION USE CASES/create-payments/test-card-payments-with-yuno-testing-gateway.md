---
title: Test card payments with Yuno Testing Gateway
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
On this page, you will find a walk-through guide on creating a card payment using the [Yuno Testing Gateway](doc:yuno-testing-gateway). 

[Yuno Testing Gateway](doc:yuno-testing-gateway) is a Yuno solution to test card payment in general. It works as a connection. However, it is only available in the sandbox environment.

## Requirements

Before starting following the steps described in this guide, you need to:

* Access your [API credentials](doc:get-your-api-credentials) on the Yuno Dashboard, which are composed by:
  * `public-api-key`
  * `private-secrete-key`
  * `account_id`
* Set up the Yuno Testing Gateway connection on your Yuno Dashboard account. You find a step-by-step guide on connecting it in the [Integration configuration section](doc:yuno-testing-gateway#integration-configuration).
* [Build a route](doc:configure-dynamic-routing) for the Yuno Testing Gateway to define it as your card payment provider. You find a step-by-step guide on how to do it in the Set up the [Yuno Testing Gateway section](doc:yuno-testing-gateway#set-up-the-yuno-test-payment-gateway).
* [Configure the checkout builder](ref:manage-your-checkout) to make the Yuno Testing Gateway available.

## Steps summary

The create payment process normally requires finishing the four steps listed below.

1. [Create a customer](ref:create-customer)
2. [Create a checkout session](ref:create-checkout-session)
3. [Create a One-Time Token]
4. [Create the payment](ref:create-payment)

## Create a payment

### 1. Create a customer

Use the [Create Customer](ref:create-customer) to register the customer info. You will need to provide personal customer information. In addition, you also need to supply the `merchant_customer_id`, a unique identifier for the customer used on your system.

> 📘 Customer complementary information
>
> When creating a **Customer**, certain information is not required but can improve the user's payment experience if provided. Phone, billing address, and shipping address are examples of not mandatory data you can provide.
>
> If you add optional information, be aware of the required mandatory fields.

At the end of the create a customer process, you will receive an `id`, which identifies the user within the Yuno system. Use the `id` to initialize the checkout. 

If you are creating a payment for an existing user who was previously created and already has an `id`you can skip this step.

### 2. Create a checkout session

With a customer registered, you can create a checkout session. The checkout is when the customer finalizes their order and proceeds to pay for the products or services they wish to acquire. Therefore, at this stage, you will provide information regarding the payment amount and the location where it is being created.

> 🚧 Route conditions filtering
>
> When creating the route, you can define condition that work as filters. If you have used country as a condition, check if the provided country when creating the checkout session in on the condition list. Otherwise, the card payment may not be processed by the Yuno Testing Gateway.

Use the [Create Checkout Session](ref:create-checkout-session) endpoint. Notice that the `customer_id` required to perform the request is the `id` you received when creating the customer in [Step 1](doc:create-card-payment-with-yuno-testing-gateway#1-create-a-customer). 

From the request response to the  [Create Checkout Session](ref:create-checkout-session) endpoint, you will receive the `checkout_session` information. It will be used to create the one-time token (OTT) and the payment on the next steps.

### 3. Create a one-time token (OTT)

An OTT is a unique identifier Yuno generates to protect your customer privacy and security. It serves as an identifier for payments detail and prevents sensitive data from being stored on your servers. Therefore, you can use OTTs to make it simple for your customers to repeat payments without re-entering their payment information, making the process more secure and convenient.

You will always get the OTT from the Yuno SDK on your production application. However, to make it easier for you to test the payment creation process, Yuno provides the [Create OTT]() endpoint. You will need to provide the  `checkout_session` received in [Step 2](doc:create-card-payment-with-yuno-testing-gateway#2-create-a-checkout-session) and define the payment type as `CARD` through the `type` parameter.  In the response, you will receive the `one-time-token`, which you will use to create the payment. 

### 4. Create a payment

You will create a payment using the [Create Payment endpoint](ref:create-payment). Below you find a deeper description of how to create a payment.

#### 4.1 Provide the required attributes

Provide customer-related information, including the `checkout_session` from Step 2 through `checkout.session` and `customer_payer` object that contains the `id` from Step 1.

Certain objects are not mandatory when creating a payment. However, if you provide this information, the user’s payment experience will be enhanced. Be aware of the mandatory fields if you wish to provide this information.

#### 4.2 Choose the capture type

Yuno provides two options for payment capture:

* Single-step: Authorization and capture are performed simultaneously. You only need to create the payment. The authorization and capture are performed automatically. For the single-step option, you need to send the `capture` attribute as `true` on the request.
* Two steps: Authorization and capture are performed at different moments. After creating the payment, you will need to perform an authorization request and a capture request.  if you wish to process the payment in Two Steps, send `capture` as `false` and after creating the payment, use the [Authorize Payment](ref:authorize-payment) and the [Capture Authorization](ref:capture-authorization) to complete the process.

#### 4.3 Define the payment workflow

When creating the payment, you need to inform which integration from Yuno you are using. When creating a payment, you must inform it through the `workflow` attribute, which can be:

* `CHECKOUT`: If you are using the Yuno SDK to create the payment.
* `DIRECT`: If you are using a back-to-back integration. To use this workflow, you need to be PCI compliant. 
* `REDIRECT`: If you are using a back-to-back integration and provider redirection.

#### 4.4 Provide the payment method information

Inform the payment method information through the object `payment_method`. Here you will provide the `one-time-token` through the attribute `token` and select the payment `type` equal to `CARD`, the one informed in  [Step 3](doc:create-card-payment-with-yuno-testing-gateway#3-create-a-one-time-token-ott), based on the [Payment type list](ref:payment-type-list). In addition, you need to add the card information on the object `detail.card`. The following table presents a list of card data you can use to perform tests when using the Yuno Testing Gateway:

| Number              | Security Code | Expiration Date |
| :------------------ | :------------ | :-------------- |
| 4509 9535 6623 3704 | 456           | 10/26           |
| 3711 803032 57522   | 4567          | 10/26           |
| 5031 7557 3453 0604 | 456           | 10/26           |

> 📘 Define the expected result
>
> To get the desired result when testing with the Yuno Testing Gateway, you need to define the payment description as the expected result. All option are available on [Transaction Codes](ref:transaction#transaction-codes). For example: "SUCCESSFUL", "DECLINED", "ERROR".

### 5. Check the payment status

 After performing the request to the [Create Payment](ref:create-payment), you can check the payment status by analyzing the `status` and `sub_status` from the response. Check the [Payment Status](ref:payment) page to see all options you can receive in response to the payment creation request.

Depending on the processor and payment method, the status may take some time to update. Therefore, you may need to use endpoints to recover the payment status. To perform this task, you can use the [Retrieve Payment by ID](ref:retrieve-payment-by-id) or [Retrieve Payment by merchant\_order\_id](ref:retrieve-payment-by-merchant_order_id) endpoints. Another option is to use webhooks to receive notifications after each event. Yuno recommends you use webhooks to monitor asynchronous payments better. Check the [Webhooks](doc:configuring-yuno-webhooks) guide to learn how to configure the webhooks solution provided by Yuno.
