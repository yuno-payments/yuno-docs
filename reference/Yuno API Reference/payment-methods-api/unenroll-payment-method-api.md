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

> 📘 Unenrollment Information
>
> To unenroll the payment method, you need to provide the `payment_method_id`, which is the `vaulted_token` received when using the [Enroll Payment Method](#enroll-payment-method-api) endpoint.