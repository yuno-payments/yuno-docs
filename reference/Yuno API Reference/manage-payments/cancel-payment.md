---
title: Cancel Payment
excerpt: ''
api:
  file: payment-api-refundcancel-payment.json
  operationId: cancel-payment
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    A payment with pending status (due to authorization or waiting user’s
    action) can be canceled before it is completed if payment is no longer
    required. This request cancels a payment with pending status.
  robots: index
next:
  description: ''
---
A payment with a **PENDING** status due to an **AUTHORIZE** transaction status can be canceled before it is completed if the payment is no longer required. Sending a cancel request will update the payment status to **CANCELLED**.

> 🚧 3DS Payments
>
> Payments in a **PENDING** status due to 3DS authentication cannot be canceled. These payments are in a temporary state awaiting user authentication. The payment status will automatically update to either **FRAUD VERIFIED** or **CANCELLED** based on the outcome of the authentication process.

> 📘 Alternative Payment Methods
>
> Alternative payment methods such as PIX also support payment cancellation with a PENDING status. Reach out to your technical account manager for more information.

If you need a receipt for the canceled transaction, you can retrieve it after it has been created. To do this, use the [Retrieve Payment by ID](ref:retrieve-payment-by-id) endpoint and check the `receipt_url` field in the `payment.transaction` object. See [The Payment Object](ref:the-payment-object) for `receipt`, `receipt_url`, and `receipt_language`.

To use this endpoint, you have to provide an `X-Idempotency-Key` in your request. Check the [Authentication](ref:authentication#idempotency) page for more information.