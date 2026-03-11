---
title: Webhook Notifications
type: reference
api:
  file: banking-connectivity-merchant-base-url.json
  operationId: post_v1-banking-connectivity-transfers
deprecated: false
hidden: false
link:
  new_tab: false
metadata:
  robots: index
---
Yuno sends incoming transfer notifications to your endpoint at `{merchant_base_URL}/v1/banking/transfers`. Your endpoint must return a `200 OK` response with `{"received": true}`.

Notifications include sender details, transfer amount, payment rail, and status. Yuno retries on `5xx` responses and timeouts with exponential backoff.

See [Webhook events](ref:banking-connectivity#webhook-events) for the complete list of Banking Connectivity webhook event types.