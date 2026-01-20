---
title: Create Checkout Session
excerpt: ''
api:
  file: checkout-api.json
  operationId: create-checkout-session
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    A request to create a checkout session using the unique identifier generated
    when the Customer resource was created.
  robots: index
next:
  description: ''
---
This request creates a checkout session using the unique identifier generated when the `customer` resource was created.

<Callout icon="📘" theme="info">
  If your workflow requires sending the `additional_data` object, it can be sent as part of the checkout session.
</Callout>