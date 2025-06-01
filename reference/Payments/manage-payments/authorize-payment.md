---
title: Authorize Payment
excerpt: ''
api:
  file: payment-api-create-payment-back-to-back.json
  operationId: authorize-payment
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
This request allows you to authorize a payment after you created a checkout session. It just authorizes the amount on the `credit_card` (the client is not charged). If you want to make an authorization for a payment, you will need to send the `capture` as "false" within the card object, which is located inside the `payment_method` object.