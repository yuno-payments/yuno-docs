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
With Yuno, you can create sessions to initiate payments or register payment methods for future purchases. There are two types of sessions: **customer sessions** and **checkout sessions**. These sessions ensure the correct information is collected for each scenario.

## Customer session

Use customer sessions to enroll and store a customer's payment methods. Create a new customer session each time you register a payment method for a specific customer. You'll need the `customer_id` (a unique customer identifier) generated when creating the customer in Yuno. A customer session provides access to all available payment methods for enrollment, which you can offer to customers.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Available payment methods</h3>\n      <div class=\"contentContainer\">\n        <p>When creating both sessions, customer and checkout, the Yuno system will provide you with a list of all enable the payment methods in your Yuno dashboard within the Connections and Checkout builder section.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


For more detailed information on how to use the Create customer session endpoint, see [API reference](ref:the-customer-session-object).

## Checkout session

Use checkout sessions to create payments or initiate the payment flow. Each time a customer makes a payment, you must create a new session. You'll need the `customer_id` (a unique customer identifier) generated when creating the customer in Yuno. A checkout session provides access to all available payment methods for that customer, whether previously enrolled or not.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Create a payment without a checkout session</h3>\n      <div class=\"contentContainer\">\n        <p>By utilizing Direct integration, which doesn't require Yuno's SDK, you can create a payment without the need for a checkout session.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


For more detailed information on how to use the **Create checkout session** endpoint, refer to the [API reference](ref:the-checkout-session-object).