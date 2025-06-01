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

<Image align="center" src="https://files.readme.io/e2159af-Driagram-yuno.png" />

## Payout status

The following table presents all `status` and `response_code` you will find when handling payouts with the Yuno system. In addition, you will find the relation of `status`/`response_code` with the transaction status of the payout process.

<HTMLBlock>{`
<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Response code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>CREATED</code></td>
      <td><code>CREATED</code></td>
      <td>Initial state when a payout is created. It is an internal state.</td>
    </tr>
    <tr>
      <td><code>PENDING</code></td>
      <td><code>PENDING_PROVIDER_CONFIRMATION</code></td>
      <td>The payout has been delivered to the provider and is being analyzed.</td>
    </tr>
    <tr>
      <td><code>PENDING</code></td>
      <td><code>AUTHORIZED</code></td>
      <td>The payout has been delivered to the provider, its authorized and its waiting merchant's confirmation to release the transaction. Only available for certain providers that support it.</td>
    </tr>
    <tr>
      <td><code>SUCCEEDED</code></td>
      <td><code>SUCCEEDED</code></td>
      <td>The payout was successfully completed.</td>
    </tr>
    <tr>
      <td><code>REJECTED</code></td>
      <td><code>REJECTED</code></td>
      <td>Payout rejected by Yuno. Please review the request fields.</td>
    </tr>
    <tr>
      <td><code>DECLINED</code></td>
      <td><code>DECLINED</code></td>
      <td>The provider declined the payout.</td>
    </tr>
    <tr>
      <td><code>ERROR</code></td>
      <td><code>ERROR</code></td>
      <td>Error.</td>
    </tr>
  </tbody>
</table>
`}</HTMLBlock>
