---
title: Unenroll Payment Method
excerpt: ''
api:
  file: customer-api.json
  operationId: unenroll-payment-method-checkout
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    Unenroll a saved payment method for the user based on their
    `payment_method_id`, which needs to be provided in the request path. Once
    you've done the POST to the unenrollment endpoint, the payment method status
    will be changed to `UNENROLLED`.
  robots: index
next:
  description: ''
---
Unenroll a previously saved payment method for a customer.

To perform this action, provide the `payment_method_id` in the request path. Once the request is successful, the payment method's status will be updated to `UNENROLLED`, making it inactive and no longer available for use in future transactions.