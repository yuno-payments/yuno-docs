---
title: Update a chargeback dispute
api:
  file: payment-api-refundcancel-payment.json
  operationId: post_{payment_id}transactions{transaction_id}dispute-1
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: index
---
This endpoint allows you to update evidence after submitting a dispute.

> 📘 Evidence requirements
>
> The uploaded files must meet the following criteria:
>
> _Format_: File must be in PDF format, encoded as base64.  
> _Size_: File must be no larger than 1 MB in size.  
> _Language_: Dispute should be written in English or the country’s local language.

Note that this request requires an `X-Idempotency-Key`. Check the [Authentication](ref:authentication#idempotency) page for more information.
