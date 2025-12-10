---
title: Update a chargeback dispute
api:
  file: payment-api-refundcancel-payment.json
  operationId: post_{payment_id}transactions{transaction_id}dispute-1
deprecated: false
hidden: false
link:
  new_tab: false
metadata:
  robots: index
---
This endpoint allows you to add additional evidence to an existing dispute after it has been submitted. Use this endpoint when you need to provide supplementary documentation to support your dispute case.

> ⚠️ Important
>
> * **Chargeback status**: Updating evidence does not change the chargeback status. The chargeback status remains unchanged regardless of whether additional evidence is added.
> * **Provider support**: Not all payment providers support updating disputes after they have been submitted. If a provider does not support updates, the endpoint will return a controlled error with an UPPER_SNAKE_CASE error code (e.g., `UPDATE_NOT_SUPPORTED`), and the chargeback status will remain unchanged.
> * **Error handling**: If you receive a 404 error indicating the provider doesn't support the update flow, the chargeback status will remain the same, and you will receive a controlled error response with a descriptive error code and message.

> 📘 Evidence requirements
>
> The uploaded files must meet the following criteria:
>
> _Format_: File must be in PDF format, encoded as base64.  
> _Size_: File must be no larger than 1 MB in size.  
> _Language_: Dispute should be written in English or the country's local language.

