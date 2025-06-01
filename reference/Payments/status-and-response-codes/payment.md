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

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/67594c0b6b052ae9039fa91ea96b65b926eab739bb04dd2ccd51a64f1715eb73-payments1.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


For every implementation, we recommend taking the payment <code>status</code> and <code>sub_status</code> as the main reference for the payment's state. A payment could have different [transactions](https://docs.y.uno/reference/transaction) associated with it. By focusing on the payment <code>status</code> / <code>sub_status</code>, you can have the latest state regardless of how many transactions were made, giving you clear inputs for decision-making.

## Payments status

The payments can have the following status and sub status.

[block:html]
{
  "html": "<style>\n  .table-div .substatus,\n  .table-div .status {\n    font-size: 12px;\n  }\n\n  .table-div .substatus {\n    word-wrap: break-word;\n    word-break: break-all;\n  }\n</style>\n\n<body>\n  <div class=\"table-div\">\n    <table>\n      <thead>\n        <tr>\n          <th>Status</th>\n          <th>Substatus</th>\n          <th>Transaction type</th>\n          <th>Transaction status</th>\n          <th>Description</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td class=\"status\"><code>CREATED</code></td>\n          <td class=\"substatus\"><code>CREATED</code></td>\n          <td></td>\n          <td></td>\n          <td>Initial state at the time of creating a payment.</td>\n        </tr>\n        <tr>\n          <td class=\"status\" rowspan=\"2\"><code>READY_TO_PAY</code></td>\n          <td class=\"substatus\"><code>CREATED</code></td>\n          <td>Purchase</td>\n          <td>Created</td>\n          <td>Initial state at the time of creating a payment. Waiting for customer action</td>\n        </tr>\n        <tr>\n          <td class=\"status\"><code>READY_TO_PAY</code></td>\n          <td></td>\n          <td></td>\n          <td>Initial state at the time of creating a payment.Waiting for customer action</td>\n        </tr>\n        <tr>\n          <td class=\"status\" rowspan=\"5\"><code>PENDING</code></td>\n          <td class=\"substatus\"><code>AUTHORIZED</code></td>\n          <td>Authorize</td>\n          <td>Succeeded</td>\n          <td>Card authorizations</td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>IN_PROCESS</code></td>\n          <td>Purchase</td>\n          <td>Created</td>\n          <td>The client has been redirected to the provider and we are waiting for the completion of the payment.</td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>WAITING_ADDITIONAL_STEP</code></td>\n          <td>Purchase</td>\n          <td>Pending</td>\n          <td>3DS/Second factor</td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>PENDING_PROVIDER_CONFIRMATION</code></td>\n          <td>Purchase</td>\n          <td>Pending</td>\n          <td>Wating for providers payment confirmation.</td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>PENDING_FRAUD_REVIEW</code></td>\n          <td>Fraud</td>\n          <td>Pending</td>\n          <td>Transaction is being analyzed by fraud provider</td>\n        </tr>\n        <tr>\n          <td class=\"status\"><code>VERIFIED</code></td>\n          <td class=\"substatus\"><code>VERIFIED</code></td>\n          <td>Verify</td>\n          <td>Succeeded</td>\n          <td>Zero amount card authorizations</td>\n        </tr>\n        <tr>\n          <td rowspan=\"2\" class=\"status\"><code>EXPIRED</code></td>\n          <td rowspan=\"2\" class=\"substatus\"><code>EXPIRED</code></td>\n          <td>Purchase</td>\n          <td>Expired</td>\n          <td>The offline payment method reaches its expiration date.</td>\n        </tr>\n        <tr>\n          <td>Authorize</td>\n          <td>Expired</td>\n          <td><br>Authorization expires</td>\n        </tr>\n        <tr>\n          <td rowspan=\"2\" class=\"status\"><code>REJECTED</code></td>\n          <td rowspan=\"2\" class=\"substatus\"><code>REJECTED</code></td>\n          <td>Purchase</td>\n          <td>Rejected</td>\n          <td>Rejected by Yuno</td>\n        </tr>\n        <tr>\n          <td>Capture</td>\n          <td>Error</td>\n          <td>Capture rejection by Yuno</td>\n        </tr>\n        <tr>\n          <td rowspan=\"3\" class=\"status\"><code>DECLINED</code></td>\n          <td rowspan=\"2\" class=\"substatus\"><code>DECLINED</code></td>\n          <td>Purchase</td>\n          <td>Declined</td>\n          <td>Providers rejection</td>\n        </tr>\n        <tr>\n          <td>Capture</td>\n          <td>Declined</td>\n          <td>Providers capture rejection</td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>FRAUD_DECLINED</code></td>\n          <td>Fraud screening</td>\n          <td>Declined</td>\n          <td>Declined fraud screening</td>\n        </tr>\n        <tr>\n          <td rowspan=\"13\" class=\"status\"><code>SUCCEEDED</code></td>\n          <td class=\"substatus\"><code>PARTIALLY_APPROVED</code></td>\n          <td>Purchase</td>\n          <td>Succeeded</td>\n          <td>Partial payment (payment with 2 cards)</td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>APPROVED</code></td>\n          <td>Purchase</td>\n          <td>Succeeded</td>\n          <td>Successful payment</td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>CAPTURED</code></td>\n          <td>Capture</td>\n          <td>Succeeded</td>\n          <td>Successful capture</td>\n        </tr>\n        <tr>\n          <td rowspan=\"4\" class=\"substatus\"><code>PARTIALLY_CAPTURED</code></td>\n          <td>Capture</td>\n          <td>Succeeded</td>\n          <td>Successful partial capture</td>\n        </tr>\n        <tr>\n          <td>Refund</td>\n          <td>Error/Declined</td>\n          <td>Remains approved due to error in refund / cancellation</td>\n        </tr>\n        <tr>\n          <td>Chargeback</td>\n          <td>Error/Declined</td>\n          <td>Remains approved due to rejection in chargeback</td>\n        </tr>\n        <tr>\n          <td>Chargeback</td>\n          <td>Won</td>\n          <td>Review Won</td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>PARTIALLY_REFUNDED</code></td>\n          <td>Refund</td>\n          <td>Succeeded</td>\n          <td>Successful partial refund</td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>PARTIALLY_CHARGEBACKED</code></td>\n          <td>Chargeback</td>\n          <td>Succeeded</td>\n          <td>Successful partial chargeback</td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>FRAUD_DECLINED</code></td>\n          <td>Fraud screening</td>\n          <td>Declined</td>\n          <td>Declined fraud screening post payment authorization. Only enable if no action is set in the payment method\n            route after the fraud screening validation post authorization. </td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>REFUND_RETRY_IN_PROCESS</code></td>\n          <td>Refund</td>\n          <td>Declined</td>\n          <td>Transaction was declined and is waiting for retry.</td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>CAPTURE_RETRY_IN_PROCESS</code></td>\n          <td>Capture</td>\n          <td>Declined</td>\n          <td>Transaction was declined and is waiting for retry.</td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>CAPTURE_RETRY_PROCESS_FAILED</code></td>\n          <td>Capture</td>\n          <td>Declined</td>\n          <td>Transaction was declined and retry scheme it's finished.</td>\n        </tr>\n        <tr>\n          <td rowspan=\"2\" class=\"status\"><code>REFUNDED</code></td>\n          <td class=\"substatus\"><code>PENDING_PROVIDER_CONFIRMATION</code></td>\n          <td>Refund</td>\n          <td>Pending</td>\n          <td>Refund Pending</td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>REFUNDED</code></td>\n          <td>Refund</td>\n          <td>Succeeded</td>\n          <td>Successful refund</td>\n        </tr>\n        <tr>\n          <td rowspan=\"2\" class=\"status\"><code>CANCELED</code></td>\n          <td class=\"substatus\"><code>PENDING_PROVIDER_CONFIRMATION</code></td>\n          <td>Cancel</td>\n          <td>Pending</td>\n          <td>Cancel Pending</td>\n        </tr>\n        <tr>\n          <td class=\"substatus\" class=\"status\"><code>CANCELED</code></td>\n          <td>Cancel</td>\n          <td>Succeeded</td>\n          <td>Successful cancelation</td>\n        </tr>\n        <tr>\n          <td rowspan=\"2\" class=\"status\"><code>IN_DISPUTE</code></td>\n          <td class=\"substatus\"><code>RECEIVED</code></td>\n          <td>Chargeback</td>\n          <td>Created</td>\n          <td>Chargeback or Inquiry received. Decision or documentation must be provided</td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>PENDING_REVIEW</code></td>\n          <td>Chargeback</td>\n          <td>Pending</td>\n          <td>In_review</td>\n        </tr>\n        <tr>\n          <td rowspan=\"1\" class=\"status\"><code>CHARGEBACK</code></td>\n          <td class=\"substatus\"><code>LOST</code></td>\n          <td>Chargeback</td>\n          <td>Lost</td>\n          <td>Expired/Closed/Review_lost</td>\n        </tr>\n        <tr>\n          <td rowspan=\"4\" class=\"status\"><code>ERROR</code></td>\n          <td class=\"substatus\"><code>ERROR</code></td>\n          <td></td>\n          <td>Example: timeout.</td>\n          <td></td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>TIMEOUT</code></td>\n          <td></td>\n          <td></td>\n          <td></td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>PENDING_REVERSE</code></td>\n          <td></td>\n          <td></td>\n          <td></td>\n        </tr>\n        <tr>\n          <td class=\"substatus\"><code>REVERSED_BY_TIMEOUT</code></td>\n          <td></td>\n          <td></td>\n          <td></td>\n        </tr>\n        <tr>\n          <td rowspan=\"1\" class=\"status\"><code>FRAUD</code></td>\n          <td class=\"substatus\"><code>FRAUD_VERIFIED</code></td>\n          <td>Fraud</td>\n          <td>Succeeded</td>\n          <td>Transaction verified by fraud provider during stand alone fraud verification</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</body>\n"
}
[/block]


### Possible states for sync and async flows

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5abb6742f0f5c40410be7c93e2d7455e090ac857bf69d2009da04953a44a9349-payments_Sync.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/999b7b8d2e25cb00c8766bec06e748841d7af28514bd8049a2d0fb3438a69163-payments_Asinc.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]