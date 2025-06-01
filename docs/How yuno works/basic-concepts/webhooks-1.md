---
title: Webhooks
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
Webhooks allow apps to receive real-time updates whenever an event occurs, eliminating the need for constant requests. They provide a passive way to transfer data between systems using an HTTP POST request. Once you configure Yuno webhooks, your system will receive event notifications whenever an activity or function occurs within the Yuno flow.

![](https://files.readme.io/3dded07-concepts-webhooks.png)

## Why use webhooks?

Webhooks keep your system up to date with payment progress and status changes. Since event notifications trigger automatically, your system does not need to send repeated requests to Yuno. This allows you to process payment information only when needed, improving efficiency.

## Getting started with webhooks

To use Yuno's webhooks, you must build a public REST API to receive event notifications via POST requests. Your API should not require authentication or access restrictions through headers. Despite being a public API, the system remains secure since Yuno event notifications are not publicly accessible and use a unique URL for communication with your REST API.