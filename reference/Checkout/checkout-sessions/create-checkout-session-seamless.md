---
title: Create Checkout Session - Seamless integration
excerpt: ''
api:
  file: checkout-api.json
  operationId: create-checkout-session-seamless
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
This request creates a checkout session for the [seamless integration](doc:seamless) using the unique identifier generated when the Customer resource was created.

The payment associated with the checkout session will be created with the `"workflow": "SDK_SEAMLESS"`.
