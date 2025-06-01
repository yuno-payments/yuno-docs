---
title: Refund Payment
excerpt: ''
api:
  file: payment-api-refundcancel-payment.json
  operationId: refund-payment
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    This service allows you to create refunds of an existing payment. If the
    amount field was filled, it will create a partial refund, otherwise it will
    create a complete refund.
  robots: index
next:
  description: ''
---
This endpoint allows you to issue a refund for an existing payment.

If you specify an `amount`, a **partial refund** will be created. If the `amount` is omitted, a **full refund** of the original payment will be processed.

Refunds can only be created for charges that have not been refunded yet. The refunded amount will be returned to the original payment method used in the transaction.

Note that this request requires an `X-Idempotency-Key`. Check the [Authentication](ref:authentication#idempotency) page for more information.