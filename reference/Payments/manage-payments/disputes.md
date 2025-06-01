---
title: Dispute a chargeback
excerpt: ''
api:
  file: payment-api-refundcancel-payment.json
  operationId: disputes
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
This request enables clients to [submit dispute documentation for chargeback management](doc:chargeback-management), allowing Yuno to forward these documents to the appropriate issuers for processing. 

> 📘 Evidence requirements
>
> The uploaded files must meet the following criteria:
>
> *Format*: File must be in PDF format, encoded as base64.\
> *Size*: File must be no larger than 1 MB in size.\
> *Language*: Dispute should be written in English or the country’s local language.

Note that this request requires an `X-Idempotency-Key`. Check the [Authentication](ref:authentication#idempotency) page for more information.
