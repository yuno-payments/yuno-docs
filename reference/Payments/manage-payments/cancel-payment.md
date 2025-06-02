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
A payment with a **PENDING** status due to an **AUTHORIZE** transaction status (due to card authorization) can be canceled before it is completed if the payment is no longer required. Sending a cancel request will update the payment's status to **CANCELLED**.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>3DS Payments</h3>
      <div class="contentContainer">
        <p>
          Payments in a <b>PENDING</b> status due to 3DS authentication cannot be canceled. These payments are in a temporary state awaiting user authentication. The payment status will automatically update to either <b>FRAUD VERIFIED</b> or <b>CANCELLED</b> based on the outcome of the authentication process.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>APMs</h3>
      <div class="contentContainer">
        <p>
          Certain alternative payment methods providers also support payment cancelation with a PENDING status.  Please feel free to reach out to your technical account manager for more information in case you need to use it
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

If you need a receipt for the canceled transaction, you can retrieve it after it has been created. To do this, use the [Retrieve Payment by ID](ref:retrieve-payment-by-id) endpoint and check the `receipt_url` field in the `payment.transaction` object.

To use this endpoint, you have to provide an `X-Idempotency-Key` in your request. Check the [Authentication](ref:authentication#idempotency) page for more information.