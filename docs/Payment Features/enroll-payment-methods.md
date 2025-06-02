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
On this page, you will find a walk-through guide on enrolling a payment method into a customer account and get a `vauletd_token` for future purchases.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Vaulted token</h3>
      <div class="contentContainer">
        <p>
         A Vaulted Token is created once a payment method is enrolled and stored with the customer information. You can use the created Vaulted Token to identify the payment method in future payments.</p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

Yuno tokenization service and centralized vault enable you to handle recurring payments, fallbacks, and retries across processors without compromising UX. Today, the following payment methods are available for enrollment in Yuno:

* **Cards** - Payment Method Type: `CARD`
* **MercadoPago Wallet** - Payment Method Type: `MERCADO_PAGO_WALLET`(Only for SDK integrations)
* **Nequi** - Payment Method Type: `NEQUI`(Only for SDK integrations)
* **Nupay** - Payment Method Type: `NU_PAY_ENROLLMENT`
* **Bancolombia Tokenbox** - Payment Method Type: `BANCOLOMBIA_TOKENBOX`(Only for SDK integrations)

## Requirements

Before starting the enrollment process, you need to:

* Access your [API credentials](doc:get-your-api-credentials) on the Yuno Dashboard, which are composed by:
  * `public-api-key`
  * `private-secrete-key`
  * `account_id`
* [Set up your connections](doc:set-up-initial-connections) on your Yuno Dashboard account. Add a payment method that requires enrollment.
* [Build a route](doc:configure-dynamic-routing) for the payment method to define how it will be processed.
* [Configure the checkout builder](ref:manage-your-checkout) to make your connected payments available.

## Steps summary

To enroll a payment method into a customer account, you will follow the steps listed below.

1. [Create a customer](ref:create-customer)
2. [Create Customer Session](ref:create-customer-session) (Exclusive for Checkout workflow)
3. (Optional) Retrieve Payment Methods Available to Enroll - [Checkout workflow](ref:retrieve-payment-methods-to-enroll-checkout)/[Direct workflow](ref:retrieve-payment-methods-available-api)
4. Enroll Payment Method [Checkout workflow](ref:enroll-payment-method-checkout)/[Direct workflow](ref:enroll-payment-method-api)
5. Retrieve Payment Methods [Checkout workflow](ref:retrieve-payment-method-by-customer-session-checkout)/[Direct workflow](ref:retrieve-enrolled-payment-methods-api)

## Enroll a payment method

### Step 1: Create a customer

Use the [Create Customer](ref:create-customer) to register the customer info. You will need to provide personal customer information. In addition, you also need to supply the `merchant_customer_id`, a unique identifier for the customer used on your system.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Customer complementary information</h3>
      <div class="contentContainer">
        <p>
          When creating a <b>Customer</b>, certain information is not required but can improve the user's payment experience if provided. Phone, billing address, and shipping address are examples of not mandatory data you can provide.
        </p>
        <p>If you add optional information, be aware of the required mandatory fields.</p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

At the end of the create a customer process, you will receive an `id`, which identifies the user within the Yuno system. If you are enrolling a payment method for an existing user, who was previously created and already had an `id`, you can skip this step.

### Step 2: Create a customer session

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Customer session requirement</h3>
      <div class="contentContainer">
        <p>
					Only the Checkout workflow requires the utilization of a customer session. If you are using the Direct workflow (For Cards, only available for PCI complaint merchants), you may proceed directly to Step 3 since you will solely be using the <code>id</code> generated in Step 1.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

After creating the customer, you will create a customer session to identify and store customers' information regarding payment preferences. Use the endpoint [Create Customer Session](ref:create-customer-session) to perform the request. Notice that the `customer_id` required to perform the request is the `id` you received when creating the customer in [Step 1](doc:enroll-payment-methods#step-1-create-a-customer).

From the response of the endpoint [Create Customer Session](ref:create-customer-session), you will receive the `customer_session`. It will be used in the payment method enrollment process.

### Step 3: Retrieve payment methods to enroll

This is an **optional step** where you can list all available payment methods the customer can enroll in. If you know which payment method the user will enroll in, you can proceed to [Step 4](doc:enroll-payment-methods#step-4-enroll-a-payment-method).

To list the available payment methods, you can use one of the available Retrieve Payment Methods To Enroll endpoints. If you are using the [Checkout workflow](ref:retrieve-payment-methods-to-enroll-checkout), you will inform the `customer_session` on the request. While if you are using the [Direct workflow](ref:retrieve-payment-methods-available-api), you will provide the `customer_id`, which refers to the `id` created in Step 1.

The response to the endpoint **Retrieve Payment Methods To Enroll** will contain only the `payment_methods` parameter. It will provide an array of objects with all available payment methods to enroll. You will use the `type` information to enroll the payment method on the next step.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Which payment methods will be available?</h3>
      <div class="contentContainer">
        <p>
				When you retrieve the payment methods available to enroll, only the ones which you have connected, created a route, and added to you checkout will be present on the response.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

### Step 4: Enroll a payment method

After defining the payment method, you can perform the enrollment using one of the Enroll Payment Method endpoints:

* [Checkout workflow](ref:enroll-payment-method-checkout): Provide the `type` related to the chosen payment method to the parameter `payment_method_type`.
* [Direct workflow](ref:enroll-payment-method-api): Provide the `type` related to the chosen payment method to the parameter `type`. (Only available for Card payment methods for PCI compliant merchants)

The user must be redirected to the payment provider page to complete the enrollment process. You will receive this URL in Step 5.

### Step 5: Retrieve payment methods

To successfully enroll in the payment method, the customer must provide authorization on the payment provider page. To receive the URL, use one of the following endpoints depending on the workflow you are using:

* Checkout workflow: Use the endpoint [Retrieve Payment Method by Customer Session](ref:retrieve-payment-method-by-customer-session-checkout) providing the `customer_session` generated in Step 2. The URL to redirect the user will be available in the parameter `provider.redirect.init_url`.
* Direct workflow: For the Direct workflow, as it is only available for card enrollments, you will receive the final status in the previous step.

Redirect the user so they provide the required authorization. After the enrollment, you can proceed to the checkout session creation on the next step.

To confirm the enrollment, you can retrieve the enrolled payment methods. The `status` of the enrolled payment method should be `ENROLLED`.

> 📘 Fingerprint
>
> When a credit card is enrolled, you will also find the `fingerprint` in the API response. It is a field that represents your customer's card throughout your organization. When a customer enrolls a credit card multiple times related to one or many Yuno accounts, multiple vaulted\_tokens will be generated, but the fingerprint lets you identify when the same card is used across multiple scenarios.
>
> You will also find the fingerprint in the payment response when a transaction is made using an enrolled credit card.