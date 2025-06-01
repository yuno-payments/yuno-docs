---
title: Payment Status and Response Codes
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    Payments have all the essential information about the order, including
    customer information, amount, currency, items, shipping info, etc. You can
    always refer to the transaction details for more details about the order and
    the payment interactions.
  robots: index
next:
  description: ''
---
Payments have all the essential information about the order, including customer information, amount, currency, items, shipping info, etc. You can always refer to the transaction details for more details about the order and the payment interactions. 

## Workflow

In the following workflow, you can find the different payment statuses and how they can be updated. 

<Image align="center" src="https://files.readme.io/67594c0b6b052ae9039fa91ea96b65b926eab739bb04dd2ccd51a64f1715eb73-payments1.png" />

For every implementation, we recommend taking the payment <code>status</code> and <code>sub\_status</code> as the main reference for the payment's state. A payment could have different [transactions](https://docs.y.uno/reference/transaction) associated with it. By focusing on the payment <code>status</code> / <code>sub\_status</code>, you can have the latest state regardless of how many transactions were made, giving you clear inputs for decision-making.

## Payments status

The payments can have the following status and sub status.

<HTMLBlock>{`
<style>
  .table-div .substatus,
  .table-div .status {
    font-size: 12px;
  }

  .table-div .substatus {
    word-wrap: break-word;
    word-break: break-all;
  }
</style>

<body>
  <div class="table-div">
    <table>
      <thead>
        <tr>
          <th>Status</th>
          <th>Substatus</th>
          <th>Transaction type</th>
          <th>Transaction status</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="status"><code>CREATED</code></td>
          <td class="substatus"><code>CREATED</code></td>
          <td></td>
          <td></td>
          <td>Initial state at the time of creating a payment.</td>
        </tr>
        <tr>
          <td class="status" rowspan="2"><code>READY_TO_PAY</code></td>
          <td class="substatus"><code>CREATED</code></td>
          <td>Purchase</td>
          <td>Created</td>
          <td>Initial state at the time of creating a payment. Waiting for customer action</td>
        </tr>
        <tr>
          <td class="status"><code>READY_TO_PAY</code></td>
          <td></td>
          <td></td>
          <td>Initial state at the time of creating a payment.Waiting for customer action</td>
        </tr>
        <tr>
          <td class="status" rowspan="5"><code>PENDING</code></td>
          <td class="substatus"><code>AUTHORIZED</code></td>
          <td>Authorize</td>
          <td>Succeeded</td>
          <td>Card authorizations</td>
        </tr>
        <tr>
          <td class="substatus"><code>IN_PROCESS</code></td>
          <td>Purchase</td>
          <td>Created</td>
          <td>The client has been redirected to the provider and we are waiting for the completion of the payment.</td>
        </tr>
        <tr>
          <td class="substatus"><code>WAITING_ADDITIONAL_STEP</code></td>
          <td>Purchase</td>
          <td>Pending</td>
          <td>3DS/Second factor</td>
        </tr>
        <tr>
          <td class="substatus"><code>PENDING_PROVIDER_CONFIRMATION</code></td>
          <td>Purchase</td>
          <td>Pending</td>
          <td>Wating for providers payment confirmation.</td>
        </tr>
        <tr>
          <td class="substatus"><code>PENDING_FRAUD_REVIEW</code></td>
          <td>Fraud</td>
          <td>Pending</td>
          <td>Transaction is being analyzed by fraud provider</td>
        </tr>
        <tr>
          <td class="status"><code>VERIFIED</code></td>
          <td class="substatus"><code>VERIFIED</code></td>
          <td>Verify</td>
          <td>Succeeded</td>
          <td>Zero amount card authorizations</td>
        </tr>
        <tr>
          <td rowspan="2" class="status"><code>EXPIRED</code></td>
          <td rowspan="2" class="substatus"><code>EXPIRED</code></td>
          <td>Purchase</td>
          <td>Expired</td>
          <td>The offline payment method reaches its expiration date.</td>
        </tr>
        <tr>
          <td>Authorize</td>
          <td>Expired</td>
          <td><br>Authorization expires</td>
        </tr>
        <tr>
          <td rowspan="2" class="status"><code>REJECTED</code></td>
          <td rowspan="2" class="substatus"><code>REJECTED</code></td>
          <td>Purchase</td>
          <td>Rejected</td>
          <td>Rejected by Yuno</td>
        </tr>
        <tr>
          <td>Capture</td>
          <td>Error</td>
          <td>Capture rejection by Yuno</td>
        </tr>
        <tr>
          <td rowspan="3" class="status"><code>DECLINED</code></td>
          <td rowspan="2" class="substatus"><code>DECLINED</code></td>
          <td>Purchase</td>
          <td>Declined</td>
          <td>Providers rejection</td>
        </tr>
        <tr>
          <td>Capture</td>
          <td>Declined</td>
          <td>Providers capture rejection</td>
        </tr>
        <tr>
          <td class="substatus"><code>FRAUD_DECLINED</code></td>
          <td>Fraud screening</td>
          <td>Declined</td>
          <td>Declined fraud screening</td>
        </tr>
        <tr>
          <td rowspan="13" class="status"><code>SUCCEEDED</code></td>
          <td class="substatus"><code>PARTIALLY_APPROVED</code></td>
          <td>Purchase</td>
          <td>Succeeded</td>
          <td>Partial payment (payment with 2 cards)</td>
        </tr>
        <tr>
          <td class="substatus"><code>APPROVED</code></td>
          <td>Purchase</td>
          <td>Succeeded</td>
          <td>Successful payment</td>
        </tr>
        <tr>
          <td class="substatus"><code>CAPTURED</code></td>
          <td>Capture</td>
          <td>Succeeded</td>
          <td>Successful capture</td>
        </tr>
        <tr>
          <td rowspan="4" class="substatus"><code>PARTIALLY_CAPTURED</code></td>
          <td>Capture</td>
          <td>Succeeded</td>
          <td>Successful partial capture</td>
        </tr>
        <tr>
          <td>Refund</td>
          <td>Error/Declined</td>
          <td>Remains approved due to error in refund / cancellation</td>
        </tr>
        <tr>
          <td>Chargeback</td>
          <td>Error/Declined</td>
          <td>Remains approved due to rejection in chargeback</td>
        </tr>
        <tr>
          <td>Chargeback</td>
          <td>Won</td>
          <td>Review Won</td>
        </tr>
        <tr>
          <td class="substatus"><code>PARTIALLY_REFUNDED</code></td>
          <td>Refund</td>
          <td>Succeeded</td>
          <td>Successful partial refund</td>
        </tr>
        <tr>
          <td class="substatus"><code>PARTIALLY_CHARGEBACKED</code></td>
          <td>Chargeback</td>
          <td>Succeeded</td>
          <td>Successful partial chargeback</td>
        </tr>
        <tr>
          <td class="substatus"><code>FRAUD_DECLINED</code></td>
          <td>Fraud screening</td>
          <td>Declined</td>
          <td>Declined fraud screening post payment authorization. Only enable if no action is set in the payment method
            route after the fraud screening validation post authorization. </td>
        </tr>
        <tr>
          <td class="substatus"><code>REFUND_RETRY_IN_PROCESS</code></td>
          <td>Refund</td>
          <td>Declined</td>
          <td>Transaction was declined and is waiting for retry.</td>
        </tr>
        <tr>
          <td class="substatus"><code>CAPTURE_RETRY_IN_PROCESS</code></td>
          <td>Capture</td>
          <td>Declined</td>
          <td>Transaction was declined and is waiting for retry.</td>
        </tr>
        <tr>
          <td class="substatus"><code>CAPTURE_RETRY_PROCESS_FAILED</code></td>
          <td>Capture</td>
          <td>Declined</td>
          <td>Transaction was declined and retry scheme it's finished.</td>
        </tr>
        <tr>
          <td rowspan="2" class="status"><code>REFUNDED</code></td>
          <td class="substatus"><code>PENDING_PROVIDER_CONFIRMATION</code></td>
          <td>Refund</td>
          <td>Pending</td>
          <td>Refund Pending</td>
        </tr>
        <tr>
          <td class="substatus"><code>REFUNDED</code></td>
          <td>Refund</td>
          <td>Succeeded</td>
          <td>Successful refund</td>
        </tr>
        <tr>
          <td rowspan="2" class="status"><code>CANCELED</code></td>
          <td class="substatus"><code>PENDING_PROVIDER_CONFIRMATION</code></td>
          <td>Cancel</td>
          <td>Pending</td>
          <td>Cancel Pending</td>
        </tr>
        <tr>
          <td class="substatus" class="status"><code>CANCELED</code></td>
          <td>Cancel</td>
          <td>Succeeded</td>
          <td>Successful cancelation</td>
        </tr>
        <tr>
          <td rowspan="2" class="status"><code>IN_DISPUTE</code></td>
          <td class="substatus"><code>RECEIVED</code></td>
          <td>Chargeback</td>
          <td>Created</td>
          <td>Chargeback or Inquiry received. Decision or documentation must be provided</td>
        </tr>
        <tr>
          <td class="substatus"><code>PENDING_REVIEW</code></td>
          <td>Chargeback</td>
          <td>Pending</td>
          <td>In_review</td>
        </tr>
        <tr>
          <td rowspan="1" class="status"><code>CHARGEBACK</code></td>
          <td class="substatus"><code>LOST</code></td>
          <td>Chargeback</td>
          <td>Lost</td>
          <td>Expired/Closed/Review_lost</td>
        </tr>
        <tr>
          <td rowspan="4" class="status"><code>ERROR</code></td>
          <td class="substatus"><code>ERROR</code></td>
          <td></td>
          <td>Example: timeout.</td>
          <td></td>
        </tr>
        <tr>
          <td class="substatus"><code>TIMEOUT</code></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="substatus"><code>PENDING_REVERSE</code></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="substatus"><code>REVERSED_BY_TIMEOUT</code></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td rowspan="1" class="status"><code>FRAUD</code></td>
          <td class="substatus"><code>FRAUD_VERIFIED</code></td>
          <td>Fraud</td>
          <td>Succeeded</td>
          <td>Transaction verified by fraud provider during stand alone fraud verification</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
`}</HTMLBlock>

### Possible states for sync and async flows

<Image align="center" src="https://files.readme.io/5abb6742f0f5c40410be7c93e2d7455e090ac857bf69d2009da04953a44a9349-payments_Sync.png" />

<Image align="center" src="https://files.readme.io/999b7b8d2e25cb00c8766bec06e748841d7af28514bd8049a2d0fb3438a69163-payments_Asinc.png" />
