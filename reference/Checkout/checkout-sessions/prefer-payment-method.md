---
title: Prefer Payment Method
excerpt: ''
api:
  file: checkout-api.json
  operationId: prefer-payment-method
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
In Yuno we let merchants specify if a payment method is preferred by a customer to create payments in order to customize the payment experience in their application.

This request lets you flag a payment method previously used by a customer to indicate if it is preferred for future purchases. After the request is executed, by doing a [get to the payment methods available for a checkout\_session](ref:retrieve-payment-methods-for-checkout), you'll be able to see which payment methods are preferred with the `"preferred": true/false` field.
