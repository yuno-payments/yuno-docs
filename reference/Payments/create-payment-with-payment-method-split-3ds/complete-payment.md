---
title: Complete Payment
excerpt: ''
api:
  file: create-payments-v2.json
  operationId: complete-payment
deprecated: false
hidden: true
metadata:
  title: ''
  description: >-
    When creating a payment that has 3DS enabled, in order to know if it
    requires a challenge or not, you'll need to consume the complete payment
    endpoint.
  robots: index
next:
  description: ''
---
When creating a payment that has 3DS enabled, in order to know if it requires a challenge or not, you'll need to consume the complete payment endpoint. 

After getting the customer session information with **Yuno's SDK**, you'll need to send us that **id** in order to verify the transaction. If the transaction does not need a challenge, we'll continue with the payment, but if it does, we'll return a `redirect_url` for you to redirect your customer to the bank environment and complete the challenge.  Once the challenge is completed, the user will be returned to the *callback\_url* set on the payment and we'll send you a **webhook** to notify the **result** of it and the **final status of the payment**.
