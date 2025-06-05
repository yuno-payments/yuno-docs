---
title: Cancel Payments
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Cancel Payments
  description: >-
    Cancel Payments is a step-by-step instructions guide on canceling a
    previously created payment on Yuno.
  robots: index
next:
  description: ''
---
In this guide, you will find step-by-step instructions on canceling a previously created payment on Yuno.

> 🚧 Cancellable Payments
> 
> Only payments with **PENDING** status can be canceled. Check the [Payment status](https://docs.y.uno/docs/payment-status) page for further details regarding the possible payment status.


## Requirements

To cancel a payment, you need to:

* Access your [API credentials](doc:developers-credentials) on the Yuno Dashboard, which consist of:
  * `public-api-key`
  * `private-secrete-key`
* Have the payment identification data received after creating the payment using the [Create Payment endpoint](ref:create-payment):
  * `id`: The unique identifier of the payment, obtained from the parameter `id` after creating the payment.
  * `transaction_id`: The unique identifier of the transaction obtained from the parameter `transaction.id` after creating the payment.

> 📘 Explore Yuno Postman Collections
>
> Yuno provides [Postman Collections](/reference/postman-collections) that you can use to replicate the use cases locally.


## Cancel a Payment

You can cancel a payment only if it has the PENDING status. Use the [Cancel Payment endpoint](ref:cancel-payment) to cancel the payment. To identify the payment to be canceled, you need to provide its `id` and the `transaction_id`.

To confirm you have successfully canceled the payment, check if the parameters from the [Cancel Payment endpoint](ref:cancel-payment) response contain the following values:

* `type = CANCEL`
* `status = SUCCEEDED`
* `payment.status = CANCELED`
* `payment.sub_status = CANCELED`

If the response contains the above values, the cancellation was successful.

### Check the payment status

If, for some reason, you need to confirm the payment cancelation:

* Use the [Retrieve Payment by ID](ref:retrieve-payment-by-id) or [Retrieve Payment by merchant\_order\_id](ref:retrieve-payment-by-merchant_order_id) to get detailed information about the payment.
* Alternatively, set up webhooks to receive notifications for each event. Refer to the [Webhooks](doc:configuring-yuno-webhooks) guide to learn how to configure webhooks in Yuno.