---
title: Sessions
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Sessions
  description: >-
    With Yuno's SDK, you can create sessions to create payments or to enroll
    payment methods for future purchases. For each workflow, we use two types of
    sessions, **Customer** and **Checkout** sessions, to ensure we get the
    correct information for each scenario.
  robots: index
next:
  description: ''
---
With Yuno, sessions power both payments and payment-method enrollment. You’ll use two types—**customer sessions** and **checkout sessions**—so the platform can gather the right data for each flow.

## Customer session

Use customer sessions to enroll and store a customer's payment methods. Create one every time you register a payment method for a specific customer. Supply the `customer_id` generated when you first created the customer in Yuno. The session returns the payment methods that are eligible for enrollment so you can present them in your UI.

> 📘 Available payment methods
>
> When you create either session type, Yuno returns the payment methods enabled for your account in the Connections and Checkout Builder sections of the dashboard.

For more detailed information on how to use the Create customer session endpoint, see [API reference](ref:the-customer-session-object).

## Checkout session

Use checkout sessions to create payments or launch the payment flow. Start a new session for every transaction and include the `customer_id` you stored when you created the customer. A checkout session exposes all payment methods available to that shopper—enrolled or not—so you can render the correct options.

> 📘 Create a payment without a checkout session
>
> If you build on the Direct integration (no SDK), you can create payments without generating a checkout session.

For more detailed information on how to use the **Create checkout session** endpoint, refer to the [API reference](ref:the-checkout-session-object).
