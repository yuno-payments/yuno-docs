---
title: Payout Status
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    This page serves as a comprehensive reference for tracking and managing
    payout transactions on Yuno. provides an overview of the payout process on
    Yuno, along with a detailed workflow and corresponding status information.
  robots: index
next:
  description: ''
---
This page provides an overview of the payout process on Yuno, along with a detailed workflow and corresponding status information. Each status represents a specific stage in the payout process, from creation to completion or cancellation. You can always refer to the [transaction details](ref:transaction) for more details about the order and the payment interactions.

## Workflow

For every implementation, we recommend taking the payout `status` as the main reference for the payout's state. A payout could have different transactions associated with it. Therefore, by focusing on the payout `status`, you can have the latest state regardless of how many transactions were made, giving you a clear input for decision making. The image below presents the payout state machine. 

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e2159af-Driagram-yuno.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Payout status

The following table presents all `status` and `response_code` you will find when handling payouts with the Yuno system. In addition, you will find the relation of `status`/`response_code` with the transaction status of the payout process.

[block:html]
{
  "html": "<table>\n  <thead>\n    <tr>\n      <th>Status</th>\n      <th>Response code</th>\n      <th>Description</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td><code>CREATED</code></td>\n      <td><code>CREATED</code></td>\n      <td>Initial state when a payout is created. It is an internal state.</td>\n    </tr>\n    <tr>\n      <td><code>PENDING</code></td>\n      <td><code>PENDING_PROVIDER_CONFIRMATION</code></td>\n      <td>The payout has been delivered to the provider and is being analyzed.</td>\n    </tr>\n    <tr>\n      <td><code>PENDING</code></td>\n      <td><code>AUTHORIZED</code></td>\n      <td>The payout has been delivered to the provider, its authorized and its waiting merchant's confirmation to release the transaction. Only available for certain providers that support it.</td>\n    </tr>\n    <tr>\n      <td><code>SUCCEEDED</code></td>\n      <td><code>SUCCEEDED</code></td>\n      <td>The payout was successfully completed.</td>\n    </tr>\n    <tr>\n      <td><code>REJECTED</code></td>\n      <td><code>REJECTED</code></td>\n      <td>Payout rejected by Yuno. Please review the request fields.</td>\n    </tr>\n    <tr>\n      <td><code>DECLINED</code></td>\n      <td><code>DECLINED</code></td>\n      <td>The provider declined the payout.</td>\n    </tr>\n    <tr>\n      <td><code>ERROR</code></td>\n      <td><code>ERROR</code></td>\n      <td>Error.</td>\n    </tr>\n  </tbody>\n</table>"
}
[/block]