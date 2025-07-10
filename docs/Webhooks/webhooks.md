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

A webhook is a way for applications to receive real-time notifications about events as they happen, without the need for constant polling or manual requests. Webhooks work by sending data from one system to another through an HTTP POST request. 

After you configure Yuno webhooks, your system will automatically receive event notifications whenever an activity or function occurs within the Yuno platform. This allows you to react to important events as soon as they happen.

## Why use webhooks?

Webhooks are the most efficient way to keep your system updated with the latest payment progress and status changes. Because event notifications are triggered automatically, your system does not need to repeatedly request updates from Yuno. Instead, you can process payment information on demand, improving both efficiency and reliability.

## What you need to know before using webhooks

Before you start using Yuno webhooks, you need to set up a public REST API endpoint to receive event notifications via HTTP POST requests. This endpoint should be accessible without authentication or header-based access restrictions. Although your API is public, security is maintained because Yuno sends event notifications only to your unique webhook URL, which is not exposed to the public.

## Webhook delivery and response requirements

Yuno expects your endpoint to respond with an **HTTP 200 OK** status to confirm successful receipt of each webhook notification. No response body is required—only the status code.

If Yuno does not receive a 200 OK response within the expected timeframe, it will automatically retry sending the notification up to seven times to ensure delivery. For more information about the retry schedule and confirmation process, see the [receipt confirmation process](https://docs.y.uno/docs/configure-webhooks#receipt-confirmation-process) section.
