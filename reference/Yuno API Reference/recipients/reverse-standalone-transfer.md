---
title: Reverse Standalone Transfer
api:
  file: split-marketplace-transfers.json
  operationId: reverse-standalone-transfer
hidden: false
---

Reverse a specific standalone transfer. This endpoint allows you to fully or partially reverse a `SUCCEEDED` forward transfer. 

> [!NOTE] Difference between Reversals  
> This endpoint is used **only** for reversing standalone transfers created via the `/v1/split-marketplace/transfers` endpoint. 
> To reverse transfers that are directly linked to a payment lifecycle (`SPLIT_TRANSFER_REVERSAL`), use the `POST /v1/payments/{payment_id}/transactions/{transaction_id}/split-marketplace/transfer-reversal` endpoint instead.

