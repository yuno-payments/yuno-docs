---
title: Refund Payments
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Refund Payments
  description: >-
    The payment refund process is the procedure by which you will reimburse a
    customer for a previous payment. In this guide, you will find instructions
    on refunding a previously created payment on Yuno.
  robots: index
next:
  description: ''
---
The payment refund process is the procedure by which you will reimburse a customer for a previous payment. In this guide, you will find instructions on refunding a previously created payment on Yuno.

## Requirements

To refund a payment, you need to:

* Access your [API credentials](doc:developers-credentials) on the Yuno Dashboard, which consist of:
  * `public-api-key`
  * `private-secrete-key`
* Have the payment identification data received after creating the payment using the [Create Payment](ref:create-payment) endpoint and the capture data the capture operation was executed using the [Capture Payment](ref:capture-authorization):
  * `id`: The unique identifier of the payment, obtained from the parameter `id` after creating the payment.
  * `transaction_id`: The unique identifier of the transaction. You will use a different source for this information, depending on how you captured the payment.
    * If you created and captured the payment using only one operation, you obtain the `transaction_id` from the  parameter `transaction.id` after creating the payment with the [Create Payment](ref:create-payment) endpoint.
    * If you performed the authorization and then the payment capture, you will use the `transaction_id` from the  parameter `id` received after capturing the payment using the [Capture Payment](ref:capture-authorization) endpoint. 

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Explore Yuno Postman Collections</h3>
      <div class="contentContainer">
        <p>
          Yuno provides <a href='/reference/postman-collections'>Postman Collections</a> that you can use to replicate the use cases locally.        
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Refund a Payment

If you initiate a refund, it will reimburse a charge created earlier but not yet refunded. The amount will be credited back to the original payment method that was charged.

Use the [Refund Payment endpoint with transaction](ref:refund-payment) to perform the refund. To identify the payment to be refunded, you need to provide its `id` and the `transaction_id`. In case you don't need to return a specific transaction use the [Refund Payment endpoint](ref:cancel-or-refund-a-payment) to perform the refund based on payment. In addition, you need to inform the amount to be refunded using the object `amount`  on the body request:

* Complete refund: Leave the `amount` empty.
* Partial refund: Provide the refund value using the parameter `amount`.

To confirm you have successfully refunded the payment, check if the parameters from the [Refund Payment endpoint](ref:refund-payment) response contain the following values:

* `status = REFUNDED`
* `sub_status = REFUNDED`
* `transaction.type = REFUND`
* `transaction.status = SUCCEEDED`

If the response contains the above values, the refund was successful.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>How long it takes to process the refund?</h3>
      <div class="contentContainer">
        <p>
	Refunds processing time varies depending on the payment type. While in test mode, refunds are processed instantly in the Sandbox environment.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

### Check the payment status

If, for some reason, you need to confirm the payment refund:

* Use the [Retrieve Payment by ID](ref:retrieve-payment-by-id) or [Retrieve Payment by merchant\_order\_id](ref:retrieve-payment-by-merchant_order_id) to get detailed information about the payment. 
* Alternatively, set up webhooks to receive notifications for each event. Refer to the [Webhooks](doc:configuring-yuno-webhooks) guide to learn how to configure webhooks in Yuno.
