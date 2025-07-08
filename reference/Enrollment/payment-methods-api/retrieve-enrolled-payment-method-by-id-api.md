---
title: Retrieve Enrolled Payment Method by Id
excerpt: ''
api:
  file: customer-api.json
  operationId: retrieve-enrolled-payment-method-by-id-api
deprecated: false
hidden: false
metadata:
  title: ''
  description: Retrieve a specific payment method that a user has enrolled in.
  robots: index
next:
  description: ''
---
Retrieve a specific payment method that a user has enrolled in.

> 📘 Retrieve Enrolled Payment Method
>
> To recover the enrolled payment method information, you need to provide the `payment_method_id`, which is the `vaulted_token` received when using the [Enroll Payment Method](#enroll-payment-method-api) endpoint.
