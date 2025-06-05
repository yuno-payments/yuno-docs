---
title: Capture Payments
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Capture Payments
  description: >-
    Capture Payments is a step-by-step instructions guide on capturing a
    previously created payment on Yuno.
  robots: index
next:
  description: ''
---
In this guide, you will find step-by-step instructions on capturing a previously created payment on Yuno.

> 🚧 Which payments can you capture
> 
> Only payments with **PENDING** status can be captured. Check the [Payment status](https://docs.y.uno/docs/payment-status) page for further details regarding the possible payment status.


## Requirements

To capture a payment, you need to:

* Access your [API credentials](doc:developers-credentials) on the Yuno Dashboard, which consist of:
  * `public-api-key`
  * `private-secrete-key`
* Have the payment identification data received after creating the payment using the [Create Payment endpoint](ref:create-payment):
  * `id`: The unique identifier of the payment, obtained from the parameter `id` after creating the payment.
  * `transaction_id`: The unique identifier of the transaction obtained from the parameter `transaction.id` after creating the payment.

> 📘 Explore Yuno Postman Collections
>
> Yuno provides [Postman Collections](/reference/postman-collections) that you can use to replicate the use cases locally.


## Capture a Payment

You can capture a payment only if it has the PENDING status. Use the [Capture Payment endpoint](ref:capture-authorization) to capture the payment. To identify the payment to be captured, you need to provide its `id` and the `transaction_id`. In addition, you need to inform the amount to be captured using the object `amount` on the body request:

* Complete refund: Leave the amount empty.
* Partial refund: Provide the refund value using the parameter `amount`.

To confirm you have successfully captured the payment, check if the parameters from the [Capture Payment](doc:capture-authorization) endpoint response contain the following values:

* `type = CAPTURE`
* `status = SUCCEEDED`
* `payment.status = SUCCEEDED`
* `payment.sub_status = CAPTURED/PARTIALLY_CAPTURED`

If the response contains the above values, the capture was successful.

### Check the payment status

If, for some reason, you need to confirm the payment cancelation:

* Use the [Retrieve Payment by ID](ref:retrieve-payment-by-id) or [Retrieve Payment by merchant\_order\_id](ref:retrieve-payment-by-merchant_order_id) to get detailed information about the payment.
* Alternatively, set up webhooks to receive notifications for each event. Refer to the [Webhooks](doc:configuring-yuno-webhooks) guide to learn how to configure webhooks in Yuno.