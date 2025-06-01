---
title: Unprefer Payment Method
excerpt: ''
api:
  file: checkout-api.json
  operationId: unprefer-payment-method
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
After the request is executed, by doing a [get to the payment methods available for a checkout\_session](ref:retrieve-payment-methods-for-checkout), you'll be able to see which payment methods are preferred with the `"preferred": true/false` field.
