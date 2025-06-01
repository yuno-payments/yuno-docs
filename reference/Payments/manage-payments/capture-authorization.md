---
title: Capture Authorization
excerpt: ''
api:
  file: payment-api-refundcancel-payment.json
  operationId: capture-authorization
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    A request to capture a payment that was previously authorized. This action
    is required to finalize a payment when an authorization was created with the
    capture option `false`.
  robots: index
next:
  description: ''
---
This request captures a payment that was previously authorized. This action is required to finalize a payment when an authorization was created with the capture option set `false`. Depending on the payment provider, the capture could be partial (including multiple captures) or total.

Note that this request requires an `X-Idempotency-Key`. Check the [Authentication](ref:authentication#idempotency) page for more information.
