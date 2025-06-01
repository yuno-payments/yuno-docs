---
title: Enroll Payment Method
excerpt: ''
api:
  file: customer-api-register-payment-method.json
  operationId: enroll-payment-method-checkout
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    A request to enroll a payment method for a customer. With the information
    provided by Yuno after the customer selects the payment method to enroll,
    you will be able to save it for future purchases in the payment method
    object created.
  robots: index
next:
  description: ''
---
This request enrolls a payment method for a customer. With the information provided by Yuno after the customer selects the payment method to enroll, you will be able to save it for future purchases in the payment method object created.

Note that this request requires an `X-Idempotency-Key`. Check the [Authentication](ref:authentication#idempotency).

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Webhooks</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\t We recommend listening to \n          <a href=\"configure-webhooks\">Webhooks</a>\n          to stay up to date to the state of the enrolled payment methods of your customers.\n        </p>\n  </div>  \n</div>  \n</div>  \n</body>"
}
[/block]


In case a customer enrolls the same card twice but with new expiration date or cardholder info, we will unenroll the previously enrolled card and keep the new one.