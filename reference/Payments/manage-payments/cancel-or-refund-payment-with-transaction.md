---
title: Cancel or Refund a Payment with transaction
excerpt: ''
api:
  file: payment-api-refundcancel-payment.json
  operationId: cancel-or-refund-payment-with-transaction
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    This service allows you to cancel or refund an existing payment. Our system
    will identify if a cancellation or a refund is necessary based on the
    transaction status related to the transaction_id provided on the request.
  robots: index
next:
  description: ''
---
> ⚠️
>
> Do not execute a refund while another is in progress. Wait for the current operation to complete before starting a new one.

This service allows you to cancel or refund an existing payment. Our system will identify if a cancellation or a refund is necessary based on the transaction status related to the `transaction_id` provided on the request. This is for certain scenarios where you want to be more specific about the actions taken on the payments lifecycle. This service performs the following functions based on the status of the transaction:

* **Cancels** the payment if it has not been captured.
* **Refunds** the payment if it has been captured.

> 📘 Refunds
>
> If you fill out the amount field, the refund will be partial. Otherwise, it will create a complete refund. The funds will be refunded to the payment method that was originally charged.

Note that this request requires an `X-Idempotency-Key`. Check the [Authentication](ref:authentication#idempotency) page for more information.