---
title: Initiate Entity Transfer
type: reference
api:
  file: banking-connectivity.json
  operationId: post_v1-banking-connectivity-transfers
deprecated: false
hidden: false
link:
  new_tab: false
metadata:
  robots: index
---
Initiate an outgoing transfer from a Banking Connectivity account. For external transfers, provide the `destination_account` details. For internal (book) transfers between accounts on the same provider, set `destination_account_id` to the target account.

The required fields in `destination_account` depend on the region. See [Payment rails](ref:banking_connectivity#payment-rails) and [Account identifiers by region](ref:banking_connectivity#account-identifiers-by-region) for details.

The response returns `202 Accepted` with a `PENDING` status. Monitor progress via [Get Entity Transfer Status](ref:get-entity-transfer-status) or webhook events. See [Transfer statuses](ref:banking_connectivity#transfer-statuses) for the full status lifecycle.