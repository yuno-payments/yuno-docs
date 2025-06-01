---
title: Create Payment
excerpt: ''
api:
  file: payments-api-split.json
  operationId: create-payment-with-payment-method-split-copy
deprecated: false
hidden: true
metadata:
  title: ''
  description: >-
    While creating a payment that accepts 3DS, we are going to need the _card
    data_ for the DIRECT workflow and a _callback_url_ to redirect the customer
    after completing the challenge in case they need it.
  robots: index
next:
  description: ''
---
While creating a payment that accepts 3DS, we are going to need the *card data* for the DIRECT workflow and a *callback\_url* to redirect the customer after completing the challenge in case they need it. All that information should be sent inside each `payment_method` object in the request. 

After receiving the three\_d\_secure fields, you'll need to initialize Yuno's SDK to get the `session_id` to continue with the payment.
