---
title: Authorize Payment
excerpt: ''
api:
  file: payment-api-authorize-payment.json
  operationId: authorize-payment-2
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
This request allows you to authorize a payment after you created a checkout session. It just authorizes the amount on the `credit_card` (the client is not charged). If you want to make an authorization for a payment, you will need to send the `capture` as "false" within the card object, which is located inside the payment_method object.