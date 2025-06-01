---
title: Create payment with enrollment
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
On this page, you will find a walk-through guide on enrolling a payment method and creating a payment. You can check the **XXXXXX** _(Currently, we don't have such a page. Is this information available so we can use it to create a reference page?)_ page to know which payments require enrollment by the customer before the payment creation.

## Requirements

Before starting following the steps described in this guide, you need to:

- Access your [API credentials](doc:get-your-api-credentials) on the Yuno Dashboard, which are composed by:
  - `public-api-key`
  - `private-secrete-key`
  - `account_id`
- [Set up your connections](doc:set-up-initial-connections) on your Yuno Dashboard account. Add a payment method that requires enrollment. 
- [Build a route](doc:configure-dynamic-routing) for the payment method to define how it will be processed.
- [Configure the checkout builder](ref:manage-your-checkout) to make your connected payments available.

Make sure to complete these requirements before following the create payment guide.

## Steps summary

To create a payment involving the enrollment of a payment method, you will follow the steps listed below.

1. [Create a customer](ref:create-customer)
2. [Create Customer Session](ref:create-customer-session) (Exclusive for Checkout workflow)
3. (Optional) Retrieve Payment Methods Available to Enroll - [Checkout workflow](ref:retrieve-payment-methods-to-enroll-checkout)/[Direct workflow](ref:retrieve-payment-methods-available-api) 
4. Enroll Payment Method [Checkout workflow](ref:enroll-payment-method-checkout)/[Direct workflow](ref:enroll-payment-method-api)
5. Retrieve Payment Methods [Checkout workflow](ref:retrieve-payment-method-by-customer-session-checkout)/[Direct workflow](ref:retrieve-enrolled-payment-methods-api)
6. [Create a checkout session](ref:create-checkout-session)
7. [Retrieve Payment Methods Available for Checkout](ref:retrieve-payment-methods-available-checkout)
8. [Create the payment](ref:create-payment)

## Create a payment

### 1. Create a customer

Use the [Create Customer](ref:create-customer) to register the customer info. You will need to provide personal customer information. In addition, you also need to supply the `merchant_customer_id`, a unique identifier for the customer used on your system.

> 📘 Customer complementary information
> 
> When creating a **Customer**, certain information is not required but can improve the user's payment experience if provided. Phone, billing address, and shipping address are examples of not mandatory data you can provide.
> 
> If you add optional information, be aware of the required mandatory fields.

At the end of the create a customer process, you will receive an `id`, which identifies the user within the Yuno system. You will use the `id` in the next steps of the payment creation. 

If you are creating a payment for an existing user who was previously created and already has an `id`you can skip this step.

### 2. Create a customer session

> 📘 Customer session requirement
> 
> Only the Checkout workflow requires the utilization of a customer session. If you are using the Direct workflow, you may proceed directly to Step 3 since you will solely be using the `id` generated in [Step 1](doc:create-payment-with-enrollment#1-create-a-customer).

After creating the customer, you will create a customer session to identify and store customers' information regarding payment preferences. Use the endpoint [Create Customer Session](ref:create-customer-session) to perform the request. Notice that the `customer_id` required to perform the request is the `id` you received when creating the customer in [Step 1](doc:create-payment-with-enrollment#1-create-a-customer).

From the response of the endpoint [Create Customer Session](ref:create-customer-session), you will receive the `customer_session`. It will be used in the payment method enrollment process.

### 3. Retrieve payment methods to enroll

This is an **optional step** where you can list all available payment methods the customer can enroll in. If you know which payment method the user will enroll in, you can proceed to [Step 4](doc:create-payment-with-enrollment#4-enroll-a-payment-method). 

To list the available payment methods, you can use one of the available Retrieve Payment Methods To Enroll endpoints. If you are using the [Checkout workflow](ref:retrieve-payment-methods-to-enroll-checkout), you will inform the `customer_session` on the request. While if you are using the [Direct workflow](ref:retrieve-payment-methods-available-api), you will provide the `customer_id`, which refers to the `id` created in Step 1.

The response to the endpoint **Retrieve Payment Methods To Enroll** will contain only the parameter `payment_methods`. It will provide an array of objects with all available payment methods to enroll. You will use the `type` information to enroll the payment method on the next step.

> 📘 Which payment methods will be available?
> 
> When you retrieve the payment methods available to enroll, only the ones which you have connected, created a route, and added to you checkout will be present on the response.

### 4. Enroll a payment method

After defining the payment method, you can perform the enrollment using one of the Enroll Payment Method endpoints:

- [Checkout workflow](ref:enroll-payment-method-checkout): Provide the `type` related to the chosen payment method to the parameter `payment_method_type`. 
- [Direct workflow](ref:enroll-payment-method-api): Provide the `type` related to the chosen payment method to the parameter `type`.

The user must be redirected to the payment provider page to complete the enrollment process. You will receive this URL in Step 5.

### 5. Retrieve payment methods

To successfully enroll in the payment method, the customer must provide authorization on the payment provider page. To receive the URL, use one of the following endpoints depending on the workflow you are using: 

- Checkout workflow: Use the endpoint [Retrieve Payment Method by Customer Session](ref:retrieve-payment-method-by-customer-session-checkout) providing the `customer_session` generated in Step 2. The URL to redirect the user will be available in the parameter `provider.redirect.init_url`.
- Direct workflow: Use the endpoint [Retrieve Enrolled Payment Methods](ref:retrieve-enrolled-payment-methods-api) providing the `customer_id`, which refers to the `id` created in Step 1. The URL to redirect the user will be available in the parameter`provider.redirect.init_url`. **(!!! IS IT RIGHT?)**

Redirect the user so they provide the required authorization. After the enrollment, you can proceed to the checkout session creation on the next step.

### 6. Create a checkout session

The checkout is when the customer finalizes their order and proceeds to pay for the products or services they wish to acquire. Therefore, at this stage, you will provide information regarding the payment amount and the location where it is being created.

Use the [Create Checkout Session](ref:create-checkout-session) endpoint. Notice that the `customer_id` required to perform the request is the `id` you received when creating the customer in [Step 1](doc:create-payment-with-enrollment#1-create-a-customer).

From the request response to the  [Create Checkout Session](ref:create-checkout-session) endpoint, you will receive the `checkout_session` information used to retrieve the payment methods available and create the payment on the next steps.

### 7. Retrieve payment methods available for checkout

To create the payment, you must provide a one-time or vaulted token. However, you will always use the vaulted token for enrolled payment methods. To access this information, use the endpoint [Retrieve Payment Methods for Checkout](ref:retrieve-payment-methods-for-checkout). The response will provide an array of objects with all payment methods available for the current user checkout. Each payment method will have a unique `vaulted_token` which you will use to create the payment.

### 8. Create a payment

To create a payment with an enrolled payment method, use the [Create Payment](ref:create-payment) endpoint. Below you find a deeper description of how to create a payment.

#### 8.1 Provide the required attributes

Provide customer-related information, including the `checkout_session` from Step 6 through `checkout.session` and `customer_payer` object that contains the `id` from Step 1.

Certain objects are not mandatory when creating a payment. However, if you provide this information, the user’s payment experience will be enhanced. Be aware of the mandatory fields if you wish to provide this information.

#### 8.2 Choose the capture type

Yuno provides two options for payment capture:

- Single-step: Authorization and capture are performed simultaneously. You only need to create the payment. The authorization and capture are performed automatically. For the single-step option, you need to send the `capture` attribute as `true` on the request.
- Two steps: Authorization and capture are performed at different moments. After creating the payment, you will need to perform an authorization request and a capture request.  if you wish to process the payment in Two Steps, send `capture` as `false` and after creating the payment, use the [Authorize Payment](ref:authorize-payment) and the [Capture Authorization](ref:capture-authorization) to complete the process.

#### 8.3 Define the payment workflow

When creating the payment, you need to inform which integration from Yuno you are using. When creating a payment, you must inform it through the `workflow` attribute, which can be:

- `CHECKOUT`: If you are using the Yuno SDK to create the payment.
- `DIRECT`: If you are using a back-to-back integration. To use this workflow, you need to be PCI compliant. 
- `REDIRECT`: If you are using a back-to-back integration and provider redirection.

#### 8.4 Provide the payment method information

Inform the payment method information through the object `payment_method`. Here you will provide the `vaulted_token` obtained in Step 7 and select the payment `type` related to the payment method enrolled. In addition, if you are using cards as the payment method, you will add its information on the object `detail.card`.

### 9. Check the payment status

 After performing the request to the [Create Payment](ref:create-payment), you can check the payment status by analyzing the `status` and `sub_status` from the response. Check the page [Payment Status](ref:payment) to see all options you can receive in response to the payment creation request.

Depending on the processor and payment method, the status may take some time to update. Therefore, you may need to use endpoints to recover the payment status. To perform this task, you can use the endpoints [Retrieve Payment by ID](ref:retrieve-payment-by-id) or [Retrieve Payment by merchant_order_id](ref:retrieve-payment-by-merchant_order_id). Another option is to use webhooks to receive notifications after each event. Yuno recommends you use webhooks to monitor asynchronous payments better. Check the [Webhooks](doc:configuring-yuno-webhooks) guide to learn how to configure the webhooks solution provided by Yuno.