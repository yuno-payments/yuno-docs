---
title: Verify Payment
excerpt: ''
api:
  file: payment-api-create-payment-back-to-back.json
  operationId: verify-payment
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Use this endpoint to verify if the customer's credit card is real and is working. This operation does not create any charges for your client.

To use this endpoint, you need to:

- Define a route for the 'Card' payment method in Yuno for VERIFY transactions. 
- Inform `amount=0` and `verify=true`  inside the `payment_method.detail.card` object to verify the card without authorizing a real amount.