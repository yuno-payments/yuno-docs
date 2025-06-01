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

## Webhooks Delivery and Response Requirements

Yuno webhooks expects to receive an **HTTP 200 OK** status as a response to confirm the webhook was successfully received. The merchant system does not need to include any information in the response's body. Only the HTTP 200 status is required.

If no response is received within the specified time, Yuno will retry sending the event notification up to seven times to ensure no information is lost. Refer to the [Receipt Confirmation Process](https://docs.y.uno/docs/configure-webhooks#receipt-confirmation-process) section for details on the notification schedule and confirmation waiting times for each retry.
