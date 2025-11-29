---
title: Create OTP
api:
  file: otp.json
  operationId: post_v1payments{id}complete-1
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: index
---
This request allows you to create an OTP when the status of a payment is `PENDING_OTP_COMPLETION`.

The response will return all the payment information, same as in [create payment](ref:create-payment).

<Callout icon="🚧" theme="warn">
  If the payment flow requires an OTP, the creation of the payment will handle the first OTP delivery.
</Callout>