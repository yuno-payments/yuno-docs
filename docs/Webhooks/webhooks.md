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

## Banking Connectivity webhook events

Banking Connectivity (Banking as a Service) webhook notifications follow the same delivery and retry behavior described above. Yuno sends these events to your configured webhook endpoint when the status of a Banking Connectivity resource changes.

For incoming transfer payload structure, see [Webhook Notifications (Banking Connectivity)](ref:webhook-notifications-banking). Incoming transfer notifications are sent to your endpoint at `{merchant_base_URL}/v1/banking/transfers`.

### Entity events

| Event | Description |
| --- | --- |
| `banking_connectivity.entity.created` | Entity created |
| `banking_connectivity.entity.updated` | Entity updated |
| `banking_connectivity.entity.deleted` | Entity deleted |

### Onboarding events

| Event | Description |
| --- | --- |
| `banking_connectivity.onboarding.created` | Onboarding created |
| `banking_connectivity.onboarding.pending` | Submitted, awaiting review |
| `banking_connectivity.onboarding.pending_additional_documentation` | More documents required |
| `banking_connectivity.onboarding.succeeded` | Onboarding approved |
| `banking_connectivity.onboarding.failed` | Onboarding failed |
| `banking_connectivity.onboarding.declined` | Provider declined |
| `banking_connectivity.onboarding.cancelled` | Merchant cancelled |
| `banking_connectivity.onboarding.expired` | Onboarding expired |

### Account events

| Event | Description |
| --- | --- |
| `banking_connectivity.account.created` | Account created |
| `banking_connectivity.account.updated` | Account updated |
| `banking_connectivity.account.activated` | Account activated |
| `banking_connectivity.account.closed` | Account closed |

### Transfer events (outgoing)

| Event | Description |
| --- | --- |
| `banking_connectivity.transfer.pending` | Transfer pending |
| `banking_connectivity.transfer.processing` | Transfer processing |
| `banking_connectivity.transfer.completed` | Transfer completed |
| `banking_connectivity.transfer.failed` | Transfer failed |
| `banking_connectivity.transfer.cancelled` | Transfer cancelled |
| `banking_connectivity.transfer.reversed` | Transfer reversed |

### Transfer events (incoming)

| Event | Description |
| --- | --- |
| `banking_connectivity.transfer.incoming.pending` | Incoming transfer pending settlement |
| `banking_connectivity.transfer.incoming.completed` | Incoming transfer settled |
