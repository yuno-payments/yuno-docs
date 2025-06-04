---
title: How the Yuno Payment Process Works
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
While Yuno provides diverse payment options, the basic payment process always follows the same sequence. This guide provides a step-by-step breakdown of the process and key elements involved, clarifying how payments flow when utilizing Yuno's SDKs or API.

## The Yuno payment process

The payment process consists of four steps:

1. [Create a customer](#step-1-create-a-customer)
2. [Create a checkout session](#step-2-create-a-checkout-session)
3. [Create a one-time token](#step-3-create-a-one-time-token)
4. [Create the payment](#step-4-create-the-payment)

A successful [payment](doc:payments-1) leads to a completed [transaction](doc:transactions) based on the customer's payment details and available funds.

The steps below explain each part of the process in detail.

### Step 1: Create a customer

Every payment in Yuno links to a [customer](doc:customers). The system stores customer details such as name, address, and phone number. Yuno uses this information to process payments across different [payment methods](doc:payment-methods) and processors. Payment methods can be enrolled in customer profiles.

When you create a customer, Yuno generates a unique identifier for use in later steps. Although some details are optional, adding a phone number, billing address, and shipping address can improve the user's payment experience.

> 📘 Note
>
> You will need the customer's identification information for each subsequent step.

### Step 2: Create a checkout session

To process a payment, create a [checkout session](doc:sessions#checkout-session). This session connects the customer to the payment and stores key transaction details.

When you create a checkout session, Yuno loads all available [payment methods](doc:payment-methods) linked to your account. You can present these options to your customer at checkout. After they select a payment method, proceed to the next step.

> 📘 Enroll a payment method
>
> If your customer wishes to enroll a payment method to their profile, you'll create a [customer session](doc:sessions#customer-session) instead of a checkout session. When your customers enroll in a payment method, they provide important information such as card number and CVV only once. Yuno receives and stores payment information from your customers and their preferences for future use.

### Step 3: Create a one-time token

A [one-time token](doc:tokens) (OTT) enhances payment security by protecting sensitive customer information. This temporary code ensures privacy during transactions.

To generate an one-time token, provide:

* The customer's identification
* The associated checkout session
* The selected [payment method](doc:payment-methods)

> 📘 Info
>
> A one-time token (OTT) is a temporary, single-use code that prevents unauthorized reuse. It enhances security by ensuring each transaction is unique, blocking fraud and unauthorized access.

Yuno securely generates the one-time token, preventing sensitive details from being stored on your servers. This method adds a layer of security and simplifies recurring payments by keeping payment information safe for future use.

### Step 4: Create the payment

A [payment](doc:payments-1) represents a customer's transaction on Yuno's platform, consolidating all necessary order details.

To process a payment, use the data collected in the previous steps. The transaction must occur within a checkout session and include:

* A connected customer
* A valid one-time token for security

The payment entity organizes transaction details, ensuring a clear and structured payment flow. This setup simplifies tracking and reconciliation.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Enhance the customer's experience</h3>
      <div class="contentContainer">
        <p>
          When creating a payment, certain fields are optional but can enhance user experience if completed. Make sure to consider mandatory fields if you decide to include this information.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

After creating the payment, Yuno will keep you informed about updates through [webhooks](doc:webhooks-1). Additionally, Yuno offers [fraud prevention](doc:fraud) solutions that you can integrate into the payment process.