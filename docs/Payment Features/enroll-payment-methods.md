---
title: Enroll Payment Methods
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Enroll Payment Methods
  description: >-
    This is a walk-through guide on enrolling a payment method into a customer
    account. Check out the requirements and a step-by-step on how to enroll
    payment methods.
  robots: index
next:
  description: ''
---
This page provides a step-by-step guide on how to enroll a payment method into a customer account and obtain a `vaulted_token` for future transactions.

> 📘 Vaulted token
>
> A vaulted token is generated once a payment method is enrolled and stored with the customer's information. This token can be used to identify the payment method in future transactions.

Yuno's tokenization service and centralized vault allow you to manage recurring payments, fallbacks, and retries across processors without compromising user experience. The following payment methods are available for enrollment in Yuno:

## Available payment methods for enrollment

### Cards
* **Cards** - Payment method type: `CARD`

### Wallet payments
Explore the various wallet payment options available for enrollment.

* **MercadoPago Wallet** - Payment method type: `MERCADO_PAGO_WALLET` (Only for SDK integrations)
* **MercadoPago Checkout Pro** - Payment method type: `MERCADO_PAGO_CHECKOUT_PRO`
* **Google Pay** - Payment method type: `GOOGLE_PAY`
* **Apple Pay** - Payment method type: `APPLE_PAY`
* **Nequi** - Payment method type: `NEQUI` (Only for SDK integrations)
* **NU Pay** - Payment method type: `NU_PAY`
* **NU Pay Enrollment** - Payment method type: `NU_PAY_ENROLLMENT`
* **OVO Wallet** - Payment method type: `OVO_WALLET`
* **ShopeePay** - Payment method type: `SHOPEEPAY`
* **TrueMoney** - Payment method type: `TRUEMONEY`
* **Yappy** - Payment method type: `YAPPY`

### Bank transfer
* **Bancolombia Tokenbox** - Payment method type: `BANCOLOMBIA_TOKENBOX` (Only for SDK integrations)

> 📘 Workflow restrictions
>
> **Checkout workflow**: Supports all payment methods listed above.
> **Direct workflow**: Only supports `CARD` and `NU_PAY_ENROLLMENT` (for PCI compliant merchants).

> 📘 SDK integration requirements
>
> Some payment methods are only available through SDK integrations. Check the specific payment method documentation for integration requirements.

> 📘 Regional availability
>
> Payment method availability may vary by country and region. Check the [payment type list](ref:payment-type-list) for complete details on regional coverage.

## Requirements

Before starting the enrollment process, make sure you have completed the following steps:

* Access your [API credentials](doc:developers-credentials) on the Yuno Dashboard. These credentials include:
  * `public-api-key`
  * `private-secret-key`
  * `account_id`
* [Set up your connections](doc:set-up-initial-connections) on your Yuno Dashboard account. Add a payment method that requires enrollment.
* [Build a route](doc:configure-dynamic-routing) for the payment method to define how it will be processed.
* [Configure the checkout builder](ref:manage-your-checkout) to make your connected payments available.

## Steps summary

To enroll a payment method into a customer account, follow these steps:

1. [Create a customer](ref:create-customer)
2. [Create a customer session](ref:create-customer-session) (exclusive for Checkout workflow)
3. (Optional) Retrieve payment methods available to enroll - [Checkout workflow](ref:retrieve-payment-methods-to-enroll-checkout)/[Direct workflow](ref:retrieve-payment-methods-available-api)
4. Enroll payment method [Checkout workflow](ref:enroll-payment-method-checkout)/[Direct workflow](ref:enroll-payment-method-api)
5. Retrieve payment methods [Checkout workflow](ref:retrieve-payment-method-by-customer-session-checkout)/[Direct workflow](ref:retrieve-enrolled-payment-methods-api)

## Enroll a payment method

### Step 1: Create a customer

To register customer information, use the [Create Customer](ref:create-customer) endpoint. You will need to provide personal customer details and the `merchant_customer_id`, a unique identifier for the customer in your system.

> 📘 Customer complementary information
>
> When creating a customer, certain information is optional but can enhance the user's payment experience if provided. Examples of non-mandatory data include phone number, billing address, and shipping address. If you choose to add optional information, ensure all required fields are completed.

At the end of the customer creation process, you will receive an `id` that identifies the user within the Yuno system. If you are enrolling a payment method for an existing user who already has an `id`, you can skip this step.

### Step 2: Create a customer session

In this step, you will create a customer session to manage and store the customer's payment preferences.

> 🚧 Customer session requirement
>
> The Checkout workflow requires a customer session. If you are using the Direct workflow (for cards, only available for PCI compliant merchants), you can skip to Step 3, as you will only need the `id` generated in Step 1.

After creating the customer, use the [Create Customer Session](ref:create-customer-session) endpoint to initiate a customer session. The `customer_id` needed for this request is the `id` you received when creating the customer in [Step 1](doc:enroll-payment-methods#step-1-create-a-customer).

The response from the [Create Customer Session](ref:create-customer-session) endpoint will include the `customer_session`, which is essential for the payment method enrollment process.

### Step 3: Retrieve payment methods to enroll

This step is optional and allows you to list all available payment methods that the customer can enroll in. If you already know which payment method the user will enroll in, you can proceed to [Step 4](doc:enroll-payment-methods#step-4-enroll-a-payment-method).

To list the available payment methods, use one of the Retrieve Payment Methods to Enroll endpoints. For the [Checkout workflow](ref:retrieve-payment-methods-to-enroll-checkout), include the `customer_session` in your request. For the [Direct workflow](ref:retrieve-payment-methods-available-api), provide the `customer_id`, which corresponds to the `id` created in Step 1.

The response from the **Retrieve Payment Methods to Enroll** endpoint will contain the `payment_methods` parameter, offering an array of objects with all available payment methods for enrollment. Use the `type` information to proceed with enrolling the payment method in the next step.

> 📘 Available payment methods
>
> When retrieving available payment methods to enroll, only those you have connected, created a route for, and added to your checkout will appear in the response.

### Step 4: Enroll a payment method

In this step, you will enroll the defined payment method using one of the available endpoints:

* [Checkout workflow](ref:enroll-payment-method-checkout): Provide the `type` associated with the chosen payment method to the `payment_method_type` parameter.
* [Direct workflow](ref:enroll-payment-method-api): Provide the `type` associated with the chosen payment method to the `type` parameter. (This option is only available for card payment methods for PCI-compliant merchants)

The user must be redirected to the payment provider's page to complete the enrollment process. You will receive this URL in Step 5.

### Step 5: Retrieve payment methods

To complete the enrollment of the payment method, the customer must authorize it on the payment provider's page. To obtain the URL for redirection, use one of the following endpoints based on your workflow:

* Checkout workflow: Use the [Retrieve Payment Method by Customer Session](ref:retrieve-payment-method-by-customer-session-checkout) endpoint, providing the `customer_session` generated in Step 2. The URL for user redirection will be available in the `provider.redirect.init_url` parameter.
* Direct workflow: For the direct workflow, which is only available for card enrollments, you will receive the final status in the previous step.

Redirect the user to provide the necessary authorization. After enrollment, you can proceed to create the checkout session in the next step.

To confirm the enrollment, retrieve the enrolled payment methods. The `status` of the enrolled payment method should be `ENROLLED`.

> 📘 Fingerprint
>
> When a credit card is enrolled, the API response will include the `fingerprint`. This field represents your customer's card across your organization. If a customer enrolls a credit card multiple times across one or more Yuno accounts, multiple vaulted_tokens will be generated. However, the fingerprint allows you to identify when the same card is used in different scenarios.
>
> You will also find the fingerprint in the payment response when a transaction is made using an enrolled credit card.