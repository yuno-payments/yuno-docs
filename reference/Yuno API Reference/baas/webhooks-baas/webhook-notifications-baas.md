---
title: Webhook Notifications (BaaS)
api:
  file: baa-s-merchant-base-url.json
  operationId: post_v1-baas-transfers
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: index
---
Yuno sends incoming transfer notifications to your endpoint at `{merchant_base_URL}/v1/baas/transfers`. Your endpoint must return a `200 OK` response with `{"received": true}`.

Notifications include sender details, transfer amount, payment rail, and status. Yuno retries on `5xx` responses and timeouts with exponential backoff.

See [Webhook events](ref:baas#webhook-events) for the complete list of BaaS webhook event types.
