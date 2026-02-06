---
title: Copy of Enroll Payment Methods
deprecated: false
hidden: true
metadata:
  title: Enroll Payment Methods
  description: >-
    This is a walk-through guide on enrolling a payment method into a customer
    account. Check out the requirements and a step-by-step on how to enroll
    payment methods.
  robots: index
---
This page will walk you through enrolling a payment method into a customer account and get a `vaulted_token` for future purchases.

> 📘 Vaulted Token
>
> A Vaulted Token is created once a payment method is enrolled and stored with the customer information. You can use the created Vaulted Token to identify the payment method in future payments.

Yuno's tokenization service and centralized vault enable you to handle recurring payments, fallbacks, and retries across processors without compromising UX. The following payment methods are available for enrollment in Yuno:

## Available payment methods for enrollment

| Payment method            | Type                   |
| ------------------------- | ---------------------- |
| **Cards**                 | `CARD`                 |
| **Nupay**                 | `NU_PAY_ENROLLMENT`    |
| **PayPal**                | `PAYPAL_ENROLLMENT`    |
| **Daviplata**             | `DAVIPLATA_ENROLLMENT` |
| **MercadoPago Wallet**    | `WALLET_CONNECT`       |
| **dLocal Yape**           | `YAPE_ENROLLMENT`      |
| **dLocal Smart PIX**      | `SMART_PIX`            |
| **Astropay**              | `ASTROPAY_ENROLLABLE`  |
| **Nequi***                | `NEQUI`                |
| **Bancolombia Tokenbox*** | `BANCOLOMBIA_TOKENBOX` |
| **Adyen PIX Biométrico**  | `PIX_BIOMETRICO`       |

(*) SDK only. Consult the [SDK documentation](doc:quickstart) for integration details.

## Requirements

Before starting the enrollment process, you need to:

* Access your [API credentials](doc:developers-credentials) on the Yuno Dashboard, which are composed by:
  * `public-api-key`
  * `private-secret-key`
  * `account_id`
* [Set up your connections](doc:connections) on your Yuno Dashboard account. Add a payment method that requires enrollment.
* [Build a route](doc:routing#configuring-the-dynamic-routing) for the payment method to define how it will be processed.
* [Configure the checkout builder](doc:checkout-builder) to make your connected payments available.

## Steps summary

To enroll a payment method into a customer account, you will follow the steps listed below.

1. [Create a customer](ref:create-customer)
2. [Create Customer Session](ref:create-customer-session) (Exclusive for Checkout workflow)
3. (Optional) Retrieve Payment Methods Available to Enroll - [Checkout workflow](ref:retrieve-payment-methods-to-enroll-checkout)
4. Enroll Payment Method [Checkout workflow](ref:enroll-payment-method-checkout)/[Direct workflow](ref:enroll-payment-method-api)
5. Retrieve Payment Methods - [Direct workflow](ref:retrieve-enrolled-payment-methods-api)

## Enroll a payment method

### Step 1: Create a customer

Use the [Create Customer](ref:create-customer) to register the customer info. You will need to provide personal customer information. In addition, you also need to supply the `merchant_customer_id`, a unique identifier for the customer used on your system.

> 📘 Customer complementary information
>
> When creating a **Customer**, certain information is not required but can improve the user's payment experience if provided. Phone, billing address, and shipping address are examples of not mandatory data you can provide. If you add optional information, be aware of the required mandatory fields.

At the end of the create a customer process, you will receive an `id`, which identifies the user within the Yuno system. If you are enrolling a payment method for an existing user, who was previously created and already had an `id`, you can skip this step.

### Step 2: Create a customer session

> 🚧 Workflow Requirements
>
> The enrollment workflow varies by payment method type:
>
> * **Checkout workflow**: Requires customer session for most payment methods (Cards, Nupay, PayPal, Daviplata, dLocal methods, Astropay, Adyen PIX Biométrico)
> * **Direct workflow**: Available for Cards only (PCI compliant merchants). Proceed directly to Step 3 using the customer `id` generated in Step 1.
> * **SDK workflow**: Payment methods like Nequi and Bancolombia Tokenbox require SDK implementation. WALLET_CONNECT (MercadoPago) supports both SDK and Checkout workflows. Consult the [SDK documentation](doc:quickstart) for details.
> * **Seamless SDK workflow**: You can enroll payment methods during the seamless payment flow by setting `vault_on_success: true` when creating the payment. The payment method will be automatically enrolled if the payment succeeds. See [Save During Payment](doc:web#save-during-payment) for more details.

After creating the customer, you will create a customer session to identify and store customers' information regarding payment preferences. Use the endpoint [Create Customer Session](ref:create-customer-session) to perform the request. Notice that the `customer_id` required to perform the request is the `id` you received when creating the customer in [Step 1](doc:enroll-payment-methods#step-1-create-a-customer).

From the response of the endpoint [Create Customer Session](ref:create-customer-session), you will receive the `customer_session`. It will be used in the payment method enrollment process.

### Step 3: Retrieve payment methods to enroll

This is an **optional step** where you can list all available payment methods the customer can enroll in. If you know which payment method the user will enroll in, you can proceed to [Step 4](doc:enroll-payment-methods#step-4-enroll-a-payment-method).

To list the available payment methods, you can use the Retrieve Payment Methods To Enroll endpoint. If you are using the [Checkout workflow](ref:retrieve-payment-methods-to-enroll-checkout), you will inform the `customer_session` on the request. The Direct workflow does not currently support retrieving available payment methods to enroll.

The response to the endpoint **Retrieve Payment Methods To Enroll** will contain only the `payment_methods` parameter. It will provide an array of objects with all available payment methods to enroll. You will use the `type` information to enroll the payment method on the next step.

> 📘 Available Payment Methods
>
> When you retrieve the payment methods available to enroll, only the ones which you have connected, created a route, and added to you checkout will be present on the response.

### Step 4: Enroll a payment method

After defining the payment method, you can perform the enrollment using one of the Enroll Payment Method endpoints:

* [**Checkout workflow**](ref:enroll-payment-method-checkout): Provide the `type` related to the chosen payment method to the parameter `payment_method_type`. Supported types include: `CARD`, `NU_PAY_ENROLLMENT`, `PAYPAL_ENROLLMENT`, `DAVIPLATA_ENROLLMENT`, `WALLET_CONNECT`, `YAPE_ENROLLMENT`, `SMART_PIX`, `ASTROPAY_ENROLLABLE` (with space), `PIX_BIOMETRICO`.
* [**Direct workflow**](ref:enroll-payment-method-api): Provide the `type` related to the chosen payment method to the parameter `type`. (Only available for `CARD` payment methods for PCI compliant merchants)
* [**SDK workflow**](doc:quickstart): Payment methods like `NEQUI` and `BANCOLOMBIA_TOKENBOX` require SDK implementation. `WALLET_CONNECT` (MercadoPago) supports both SDK and Checkout workflows.

The user must be redirected to the payment provider page to complete the enrollment process. You will receive this URL in Step 5.

### Step 5: Retrieve payment methods

To successfully enroll in the payment method, the customer must provide authorization on the payment provider page. To receive the URL, use one of the following endpoints depending on the workflow you are using:

* Checkout workflow: The enrollment URL is provided directly in the enrollment response from Step 4. The URL to redirect the user will be available in the parameter `provider.redirect.init_url`.
* Direct workflow: For the Direct workflow, as it is only available for card enrollments, you will receive the final status in the previous step.

Redirect the user so they provide the required authorization. After the enrollment, you can proceed to the checkout session creation on the next step.

To confirm the enrollment, you can retrieve the enrolled payment methods. The `status` of the enrolled payment method should be `ENROLLED`.

> 📘 Fingerprint
>
> When a credit card is enrolled, you will also find the `fingerprint` in the API response. It is a field that represents your customer's card throughout your organization. When a customer enrolls a credit card multiple times, multiple `vaulted_token` values are generated. The fingerprint lets you identify the same card across those enrollments so you can deduplicate on your side. See [Card Fingerprint](doc:fingerprint).
>
> The fingerprint is available after enrollment and can be `null` for some providers. Always check for its presence before using it for deduplication.
>
> You will also find the fingerprint in the payment response when a transaction is made using an enrolled credit card.