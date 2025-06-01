---
title: Configuring Yuno Webhooks
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
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

## Configuring webhooks

In order to configure your Webhooks, you need to provide Yuno's technical team with: 

1. URL to receive notifications
2. `API_key` (x-api-key) and `API_secret` (x-secret) from your side (with no format restrictions) for us to send in the notification header so your dev team can identify Yuno Webhooks. 
3. Webhook name to identify each endpoint in the dashboard.

Once configured, you'll need to define which events you want to list for the enabled webhook. The webhook will be sent whenever one or more registered events occur, avoiding constant searches for answers.

You can configure different webhooks using the [Yuno Merchant Dashboard](https://dashboard.y.uno/). At the **Developers** tab, you can choose **Webhooks**. To create a new webhook, you need to name it, define the endpoint and select the trigger event. The image below shows the side panel to add a webhook.

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/webhooks/webhooks_configure1.png" />

In the [Yuno Merchant Dashboard](https://dashboard.y.uno/) Developers tab, you can activate and deactivate webhooks using the **Status** toggle button. 

You can access the [Webhooks Examples](ref:webhooks-examples) page, which presents examples for payment and enrollment notification events.

## Receipt confirmation process

Yuno webhooks expect to receive an HTTP 200 OK status as a response to indicate that the webhook was received. The merchant system response does not need to provide any information on the body request, only the HTTP 200 status. In case of not receiving a response at the specified time, Yuno webhooks will send the event notification up to seven times to avoid information loss. The table below presents the webhooks notification schedule and the confirmation waiting time.

| Event       | Deadline after the first try | Confirmation waiting time |
| :---------- | :--------------------------- | :------------------------ |
| First try   | -                            | 23 seconds                |
| Second try  | 5 minutes                    | 7 seconds                 |
| Third try   | 50 minutes                   | 7 seconds                 |
| Fourth try  | 6 hours                      | 7 seconds                 |
| Fifth try   | 24 hours                     | 7 seconds                 |
| Sixth try   | 48 hours                     | 7 seconds                 |
| Seventh try | 96 hours                     | 7 seconds                 |

## Webhooks event types

Depending on the type of event, you will receive a different type of webhook and event. The next table presents the possible event types for enrollments and payments currently available.

| type       | type.event |
| :--------- | :--------- |
| enrollment | enroll     |
| enrollment | unenroll   |
| enrollment | expiration |
| payment    | purchase   |
| payment    | authorize  |
| payment    | capture    |
| payment    | refund     |
| payment    | cancel     |
| payment    | verify     |
| payment    | chargeback |
