---
title: Cancel Entity Transfer
api:
  file: baa-s.json
  operationId: post_v1-baas-accounts-account-id-transfers-transfer-id-cancel
deprecated: false
hidden: false
link:
  new_tab: false
metadata:
  robots: index
---
Cancel a pending transfer. Only transfers in `PENDING` status can be cancelled. Transfers that have moved to `PROCESSING` or later statuses cannot be cancelled.