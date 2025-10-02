---
title: Payments (COPY)
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
### Overview

Payments have all the essential information about the order, including customer information, amount, currency, items, shipping info, etc. You can always refer to the transaction details for more details about the order and the payment interactions. 

### Workflow

In the following workflow, you can find the different payment statuses and how they can be updated. 

<Image align="center" src="https://files.readme.io/b806c08-payments1.png" />

For every implementation, we recommend taking the payment <code>status</code> and <code>sub\_status</code> as the main reference for the payment's state. A payment could have different [transactions](https://docs.y.uno/v2.0/reference/transaction) associated to it, so by focusing on the payment status/sub\_status, you can have the latest state regardless of how many transactions were made, giving you a clear input for decision making.

### Payments status

The payments can have the following status and sub status.

<HTMLBlock>{`
<style>
  .table-div {
    overflow-x: scroll;
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
        <!-- <tr> -->
        <tr>
          <td class="status" rowspan="2">CREATED</td>
          <td class="substatus" rowspan="2">CREATED</td>
          <td></td>
          <td></td>
          <td>Initial state at the time of creating a payment.</td>
        </tr>
        <tr>
          <td>Verify</td>
          <td>Created</td>
          <td>Initial state at the time of creating a payment.</td>
        </tr>
        <!-- <tr> -->
        <tr>
          <td class="status">READY_TO_PAY</td>
          <td class="substatus">READY_TO_PAY</td>
          <td></td>
          <td></td>
          <td>Initial state at the time of creating a payment.Waiting for customer action</td>
        </tr>
        <!-- <tr> -->
        <tr>
          <td class="status" rowspan="6">PENDING</td>
          <td class="substatus">AUTHORIZED</td>
          <td>Authorize</td>
          <td>Succeeded</td>
          <td>Card authorizations</td>
        </tr>
        <tr>
          <td class="substatus" rowspan="2">IN_PROCESS</td>
          <td>Purchase</td>
          <td>Created</td>
          <td>The client has been redirected to the provider and we are waiting for the completion of the payment.</td>
        </tr>
        <tr>
          <td>Verify</td>
          <td>Pending</td>
          <td>Transaction is being verified by </td>
        </tr>
        <tr>
          <td class="substatus">WAITING_ADDITIONAL_STEP</td>
          <td>Purchase</td>
          <td>Pending</td>
          <td>3DS/Second factor</td>
        </tr>
        <tr>
          <td class="substatus">PENDING_PROVIDER_CONFIRMATION</td>
          <td>Purchase</td>
          <td>Pending</td>
          <td>Wating for providers payment confirmation.</td>
        </tr>
        <tr>
          <td class="substatus">PENDING_FRAUD_REVIEW</td>
          <td>Fraud</td>
          <td>Pending</td>
          <td>Transaction is being analyzed by fraud provider</td>
        </tr>
        <!-- <tr> -->
        <tr>
          <td class="status">VERIFIED</td>
          <td class="substatus">VERIFIED</td>
          <td>Verify</td>
          <td>Succeeded</td>
          <td>Zero amount card authorizations</td>
        </tr>
        <!-- <tr> -->
        <tr>
          <td rowspan="2" class="status">EXPIRED</td>
          <td class="substatus">EXPIRED</td>
          <td>Purchase</td>
          <td>Expired</td>
          <td>The offline payment method reaches its expiration date.</td>
        </tr>
        <tr>
          <td></td>
          <td>Authorize</td>
          <td>Expired</td>
          <td><br>Authorization expires</td>
        </tr>
        <!-- <tr> -->
        <tr>
          <td rowspan="3" class="status">REJECTED</td>
          <td class="substatus" rowspan="2">REJECTED</td>
          <td>Purchase</td>
          <td>Rejected</td>
          <td>Rejected by Yuno</td>
        </tr>
        <tr>
          <td>Verify</td>
          <td>Rejected</td>
          <td>Payment verification rejected by Yuno.</td>
        </tr>
        <tr>
          <td></td>
          <td>Capture</td>
          <td>Error</td>
          <td>Capture rejection by Yuno.</td>
        </tr>
        <!-- <tr> -->
        <tr>
          <td rowspan="4" class="status">DECLINED</td>
          <td class="substatus" rowspan="2">DECLINED</td>
          <td>Purchase</td>
          <td>Declined</td>
          <td>Providers rejection</td>
        </tr>
        <tr>
          <td>Verify</td>
          <td>Declined</td>
          <td>Verification of provider rejected.</td>
        </tr>
        <tr>
          <td></td>
          <td>Capture</td>
          <td>Declined</td>
          <td>Providers capture rejection</td>
        </tr>
        <tr>
          <td class="substatus">FRAUD_DECLINED</td>
          <td>Fraud screening</td>
          <td>Declined</td>
          <td>Declined fraud screening</td>
        </tr>
        <!-- <tr> -->
        <tr>
          <td rowspan="9" class="status">SUCCEEDED</td>
          <td class="substatus">PARTIALLY_APPROVED</td>
          <td>Purchase</td>
          <td>Succeeded</td>
          <td>Partial payment (for split)</td>
        </tr>
        <tr>
          <td class="substatus">APPROVED</td>
          <td>Purchase</td>
          <td>Succeeded</td>
          <td>Successful payment</td>
        </tr>
        <tr>
          <td class="substatus">CAPTURED</td>
          <td>Capture</td>
          <td>Succeeded</td>
          <td>Successful capture</td>
        </tr>
        <tr>
          <td class="substatus">PARTIALLY_CAPTURED</td>
          <td>Capture</td>
          <td>Succeeded</td>
          <td>Successful partial capture</td>
        </tr>
        <tr>
          <td></td>
          <td>Refund</td>
          <td>Error/Declined</td>
          <td>Remains approved due to error in refund / cancellation</td>
        </tr>
        <tr>
          <td></td>
          <td>Chargeback</td>
          <td>Error/Declined</td>
          <td>Remains approved due to rejection in chargeback</td>
        </tr>
        <tr>
          <td></td>
          <td>Chargeback</td>
          <td>Won</td>
          <td>Review Won</td>
        </tr>
        <tr>
          <td class="substatus">PARTIALLY_REFUNDED</td>
          <td>Refund</td>
          <td>Succeeded</td>
          <td>Successful partial refund</td>
        </tr>
        <tr>
          <td class="substatus">PARTIALLY_CHARGEBACKED</td>
          <td>Chargeback</td>
          <td>Succeeded</td>
          <td>Successful partial chargeback</td>
        </tr>
        <tr>
          <td rowspan="2" class="status">REFUNDED</td>
          <td class="substatus">PENDING_PROVIDER_CONFIRMATION</td>
          <td>Refund</td>
          <td>Pending</td>
          <td>Refund Pending</td>
        </tr>
        <tr>
          <td class="substatus">REFUNDED</td>
          <td>Refund</td>
          <td>Succeeded</td>
          <td>Successful refund</td>
        </tr>
        <tr>
          <td rowspan="2" class="status">CANCELED</td>
          <td class="substatus">PENDING_PROVIDER_CONFIRMATION</td>
          <td>Cancel</td>
          <td>Pending</td>
          <td>Cancel Pending</td>
        </tr>
        <tr>
          <td class="substatus" class="status">CANCELED</td>
          <td>Cancel</td>
          <td>Succeeded</td>
          <td>Successful cancelation</td>
        </tr>
        <tr>
          <td rowspan="2" class="status">IN_DISPUTE</td>
          <td class="substatus">RECEIVED</td>
          <td>Chargeback</td>
          <td>Created</td>
          <td>Chargeback or Inquiry received. Decision or documentation must be provided</td>
        </tr>
        <tr>
          <td class="substatus">PENDING_REVIEW</td>
          <td>Chargeback</td>
          <td>Pending</td>
          <td>In_review</td>
        </tr>
        <tr>
          <td rowspan="1" class="status">CHARGEBACK</td>
          <td class="substatus">LOST</td>
          <td>Chargeback</td>
          <td>Lost</td>
          <td>Expired/Closed/Review_lost</td>
        </tr>
        <!-- <tr> -->
        <tr>
          <td rowspan="5" class="status">ERROR</td>
          <td class="substatus" rowspan="2">ERROR</td>
          <td></td>
          <td>Example: timeout.</td>
          <td></td>
        </tr>
        <tr>
          <td>Verify</td>
          <td>Error</td>
          <td></td>
        </tr>
        <tr>
          <td class="substatus">TIMEOUT</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="substatus">PENDING_REVERSE</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="substatus">REVERSED_BY_TIMEOUT</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <!-- <tr> -->
        <tr>
          <td rowspan="1" class="status">FRAUD</td>
          <td class="substatus">FRAUD_VERIFIED</td>
          <td>Fraud</td>
          <td>Succeeded</td>
          <td>Transaction verified by fraud provider during stand alone fraud verification</td>
        </tr>
      </tbody>
    </table>

  </div>

</body>
`}</HTMLBlock>
