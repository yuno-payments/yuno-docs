---
title: Unenroll Payment Method
excerpt: ''
api:
  file: customer-api-register-payment-method.json
  operationId: unenroll-payment-method-api
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    Unenroll a saved payment method for the user. Once you've done the POST to
    the unenrollment endpoint, the payment method status will be changed to
    UNENROLLED.
  robots: index
next:
  description: ''
---
Unenroll a saved payment method for the user. Once you've done the POST to the unenrollment endpoint, the payment method status will be changed to UNENROLLED.

[block:html]
{
  "html": "<div class=\"infoBlockContainer\">\n  <div class=\"verticalLine\"></div>\n  <div>      \n    <div class=\"contentContainer\">\n      <p>\n        To unenroll the payment method, you need to provide the <code>payment_method_id</code>, which is the <code>vaulted_token</code> received when using the <a href=\"/reference/enroll-payment-method-api\">Enroll Payment Method</a> endpoint.\n      </p>\n    </div>  \n  </div>  \n</div>  "
}
[/block]