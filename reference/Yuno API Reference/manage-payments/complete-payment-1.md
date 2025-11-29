---
title: Complete Payment
api:
  file: otp.json
  operationId: post_v1payments{id}complete
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: index
---
This request allows you to complete a payment when its status is `PENDING_OTP_COMPLETION`.

The response will return all the payment information, same as in [create payment](ref:create-payment).
