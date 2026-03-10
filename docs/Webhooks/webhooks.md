---
title: Webhooks Overview
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Webhooks
  description: >-
    Webhooks enable apps to provide real-time information whenever an event
    happens without needing constant requests. They are a passive method to
    receive data between two systems through an HTTP POST.
  robots: index
next:
  description: ''
---
## What is a webhook

Webhooks enable apps to provide real-time information whenever an event happens without needing constant requests. They are a passive method to receive data between two systems through an HTTP POST. After configuring the Yuno webhooks, you will receive event notifications every time an activity or a function is generated within the Yuno flow.

## Why do we recommend you use webhooks?

Webhooks are the best way to ensure your system is up-to-date with payment progress and status. Since the event notifications trigger automatically, your system won't need to perform recurrent requests to Yuno. You will process the payment information on demand.

## What do you need to know before start using webhooks?

To start using Yuno’s webhooks, you need to build a public REST API to receive event notifications (POST request). That means the REST API you will build should not require any authentication or access restriction through a header. Despite using a public API, the communication system is very safe since Yuno event notifications will not be available to the public and will use a unique URL to communicate only to your REST API.

## Webhooks delivery and response requirements

Yuno webhooks expects to receive an **HTTP 200 OK** status as a response to confirm the webhook was successfully received. The merchant system does not need to include any information in the response's body. Only the HTTP 200 status is required.

If no response is received within the specified time, Yuno will retry sending the event notification up to seven times to ensure no information is lost. Refer to the [Receipt Confirmation Process](../docs/configure-webhooks#receipt-confirmation-process) section for details on the notification schedule and confirmation waiting times for each retry.

## BaaS webhook events

BaaS (Banking as a Service) webhook notifications follow the same delivery and retry behavior described above. Yuno sends these events to your configured webhook endpoint when the status of a BaaS resource changes.

For incoming transfer payload structure, see [Webhook Notifications (BaaS)](ref:webhook-notifications-baas). Incoming transfer notifications are sent to your endpoint at `{merchant_base_URL}/v1/baas/transfers`.

### Entity events

| Event | Description |
| --- | --- |
| `baas.entity.created` | Entity created |
| `baas.entity.updated` | Entity updated |
| `baas.entity.deleted` | Entity deleted |

### Onboarding events

| Event | Description |
| --- | --- |
| `baas.onboarding.created` | Onboarding created |
| `baas.onboarding.pending` | Submitted, awaiting review |
| `baas.onboarding.pending_additional_documentation` | More documents required |
| `baas.onboarding.succeeded` | Onboarding approved |
| `baas.onboarding.failed` | Onboarding failed |
| `baas.onboarding.declined` | Provider declined |
| `baas.onboarding.cancelled` | Merchant cancelled |
| `baas.onboarding.expired` | Onboarding expired |

### Account events

| Event | Description |
| --- | --- |
| `baas.account.created` | Account created |
| `baas.account.updated` | Account updated |
| `baas.account.activated` | Account activated |
| `baas.account.closed` | Account closed |

### Transfer events (outgoing)

| Event | Description |
| --- | --- |
| `baas.transfer.pending` | Transfer pending |
| `baas.transfer.processing` | Transfer processing |
| `baas.transfer.completed` | Transfer completed |
| `baas.transfer.failed` | Transfer failed |
| `baas.transfer.cancelled` | Transfer cancelled |
| `baas.transfer.reversed` | Transfer reversed |

### Transfer events (incoming)

| Event | Description |
| --- | --- |
| `baas.transfer.incoming.pending` | Incoming transfer pending settlement |
| `baas.transfer.incoming.completed` | Incoming transfer settled |

### Marketplace Transfer events

| Event | Description |
| --- | --- |
| `split_transfer.created` | Transfer flow created |
| `split_transfer.pending` | Transfer sent to provider |
| `split_transfer.succeeded` | Transfer completed successfully |
| `split_transfer.declined` | Transfer declined by provider |
| `split_transfer.error` | Transfer error |
| `split_transfer_reverse.created` | Reverse transaction created |
| `split_transfer_reverse.pending` | Reversal sent to provider |
| `split_transfer_reverse.succeeded` | Reversal completed successfully |
| `split_transfer_reverse.declined` | Reversal declined by provider |
| `split_transfer_reverse.error` | Reversal error |
