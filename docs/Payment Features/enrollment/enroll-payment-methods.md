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
Enrollment allows you to securely store a customer's payment method in Yuno's vault for future use. When you enroll a payment method, Yuno generates a `vaulted_token` that references the payment details without exposing sensitive information. This enables recurring payments, subscriptions, and retries across providers while maintaining PCI compliance.

> 📘 Vaulted Token
>
> A Vaulted Token is created once a payment method is enrolled and stored with the customer information. You can use the created Vaulted Token to identify the payment method in future payments.

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

(*) SDK only. Consult the [SDK documentation](doc:quickstart-guide) for integration details.

## Requirements

* Gather your [API credentials](doc:developers-credentials) from the [Yuno Dashboard](https://dashboard.y.uno/developers):
  * `public-api-key`
  * `private-secret-key`
  * `account_id`
* [Set up connections](doc:connections) on your Yuno Dashboard. Add a payment method that requires enrollment.
* [Build a route](doc:routing#configuring-the-dynamic-routing) for the payment method to define how it will be processed.
* [Configure the checkout builder](doc:checkout-builder) to make your connected payments available.

## Steps summary

To enroll a payment method into a customer account:

1. [Create a Customer](ref:create-customer)
2. [Create Customer Session](ref:create-customer-session) (Only for Checkout workflow)
3. (Optional) Retrieve Payment Methods Available to Enroll - [Checkout workflow](ref:retrieve-payment-methods-to-enroll-checkout)
4. Enroll Payment Method [Checkout workflow](ref:enroll-payment-method-checkout)/[Direct workflow](ref:enroll-payment-method-api)
5. Retrieve Payment Methods - [Direct workflow](ref:retrieve-enrolled-payment-methods-api)

## Enroll a payment method

### Step 1: Create a customer

Register customer info through the [Create Customer](ref:create-customer) endpoint. Also, supply the `merchant_customer_id`, a unique identifier for the customer used on your system.

> 📘 Customer complementary information
>
> Providing optional details like phone, billing address, and shipping address enhances the payment experience. If you include these fields, certain sub-fields become required.

After creating the customer, you'll receive an `id` that identifies them in Yuno. If your customer already has an `id`, skip this step.

### Step 2: Create a customer session

> 🚧 Workflow Requirements
>
> The enrollment workflow varies by payment method type:
>
> * **Checkout workflow**: Requires customer session for most payment methods (Cards, Nupay, PayPal, Daviplata, dLocal methods, Astropay, Adyen PIX Biométrico)
> * **Direct workflow**: Available for Cards only (PCI compliant merchants). Proceed directly to Step 3 using the customer `id` generated in Step 1.
> * **SDK workflow**: Payment methods like Nequi and Bancolombia Tokenbox require SDK implementation. WALLET_CONNECT (MercadoPago) supports both SDK and Checkout workflows. Consult the [SDK documentation](doc:quickstart-guide) for details.
> * **SDK Seamless workflow**: You can enroll payment methods during the seamless payment flow by setting `vault_on_success: true` when creating the payment. The payment method will be automatically enrolled if the payment succeeds.

Create a customer session to store the customer's payment preferences using the [Create Customer Session](ref:create-customer-session) endpoint. Use the `id` from Step 1 as the `customer_id`.

The response returns a `customer_session`, which you'll use to enroll the payment method.

### Step 3: Retrieve payment methods to enroll

This **optional step** lists all available payment methods the customer can enroll. If you already know which payment method to enroll, proceed to [Step 4](#step-4-enroll-a-payment-method).

To list available payment methods, use the Retrieve Payment Methods To Enroll endpoint. For the [Checkout workflow](ref:retrieve-payment-methods-to-enroll-checkout), include the `customer_session` in the request. The Direct workflow doesn't currently support retrieving payment methods to enroll.

The response returns a `payment_methods` array containing all available payment methods to enroll. Use the `type` field from this response in the next step.

> 📘 Available Payment Methods
>
> Only payment methods that you've connected, routed, and added to your checkout will appear in the response.

### Step 4: Enroll a payment method

Enroll the payment method using one of the following endpoints:

* [**Checkout workflow**](ref:enroll-payment-method-checkout): Pass the payment method `type` to the `payment_method_type` parameter. Supported types include: `CARD`, `NU_PAY_ENROLLMENT`, `PAYPAL_ENROLLMENT`, `DAVIPLATA_ENROLLMENT`, `WALLET_CONNECT`, `YAPE_ENROLLMENT`, `SMART_PIX`, `ASTROPAY_ENROLLABLE`, `PIX_BIOMETRICO`.
* [**Direct workflow**](ref:enroll-payment-method-api): Pass the payment method `type` to the `type` parameter. (Only available for `CARD` payment methods used by PCI compliant merchants)
* [**SDK workflow**](doc:quickstart): Payment methods like `NEQUI` and `BANCOLOMBIA_TOKENBOX` require SDK implementation. `WALLET_CONNECT` (MercadoPago) supports both SDK and Checkout workflows.

Redirect the user to the payment provider page to complete enrollment. You'll receive this URL in Step 5.

### Step 5: Retrieve payment methods

The customer must provide authorization on the payment provider page. Retrieve the authorization URL based on your workflow:

* **Checkout workflow**: The enrollment URL appears in the enrollment response from Step 4. Find it in `provider.redirect.init_url`.
* **Direct workflow**: You'll receive the final status in Step 4 (cards only).

Redirect the user to complete authorization. Once enrollment is complete, proceed to the next step.

To confirm enrollment, retrieve the enrolled payment methods and verify the `status` is `ENROLLED`.

> 📘 Fingerprint
>
> When a credit card is enrolled, the response includes a `fingerprint` field that represents your customer's card across your organization. If a customer enrolls the same card multiple times, multiple `vaulted_token` values are generated, but the `fingerprint` remains the same, allowing you to deduplicate on your side. See [Card Fingerprint](doc:fingerprint).
>
> The fingerprint is available after enrollment but can be `null` for some providers. Always check for its presence before using it for deduplication.
>
> The fingerprint also appears in payment responses when a transaction uses an enrolled credit card.
