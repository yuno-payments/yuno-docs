---
title: Initiate Entity Transfer
api:
  file: baa-s.json
  operationId: post_v1-baas-transfers
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: index
---
Initiate an outgoing transfer from a BaaS account. For external transfers, provide the `destination_account` details. For internal (book) transfers between accounts on the same provider, set `destination_account_id` to the target account.

The required fields in `destination_account` depend on the region. See [Payment rails](ref:baas#payment-rails) and [Account identifiers by region](ref:baas#account-identifiers-by-region) for details.

The response returns `202 Accepted` with a `PENDING` status. Monitor progress via [Get Entity Transfer Status](ref:get-entity-transfer-status) or webhook events. See [Transfer statuses](ref:baas#transfer-statuses) for the full status lifecycle.
