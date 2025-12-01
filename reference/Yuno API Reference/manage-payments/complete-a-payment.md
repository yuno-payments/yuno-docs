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
This request allows you to create an OTP when the status of a payment is `PENDING_OTP_COMPLETION`.

The response will return all the payment information, same as in [create payment](ref:create-payment).

<Callout icon="🚧" theme="warn">
  Payments requiring an OTP (`PENDING_OTP_COMPLETION`) already include the OTP in the [Create payment](ref:create-payment) response.
</Callout>
