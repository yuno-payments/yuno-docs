---
title: Configure Webhooks
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Configure Webhooks
  description: >-
    To configure your Webhooks, you need to provide Yuno's technical team with
    some information such as API_key, API_secret, URL, and a name to identify
    your webhook.
  robots: index
next:
  description: ''
---
## Setup

To configure your Webhooks, you need to provide Yuno's  with: 

1. URL to receive notifications
2. `API_key` (x-api-key) and `API_secret` (x-secret) from your side (with no format restrictions) for us to send in the notification header so your dev team can identify Yuno Webhooks. 
3. A name to identify each endpoint in the dashboard.

Once configured, you'll need to define which events you want to list for the enabled webhook. The webhook will be sent whenever one or more registered events occur, avoiding constant searches for answers.

You can configure different webhooks using the [Yuno Merchant Dashboard](https://dashboard.y.uno/). At the **Developers** tab, you can choose **Webhooks**. To create a new webhook, you need to name it, define the endpoint, and select the trigger event. The image below shows the side panel to add a webhook.

![](https://files.readme.io/b6f4592-webhooks_configure1.png)

In the [Yuno Merchant Dashboard](https://dashboard.y.uno/) Developers tab, you can activate and deactivate webhooks using the **Status** toggle button.

 Access the [Webhooks Examples](ref:examples) page to check examples for payment and enrollment notification events.

### oAuth2

In case you use the [oAuth2 authentication protocol](https://en.wikipedia.org/wiki/OAuth) for your webhook reception, Yuno also offers the possibility to define the required parameters in the same dashboard section. You will need to configure the following fields so we can obtain the authorization token that will be sent in the headers of the webhooks. 

* `Authentication_url`: url to use for authentication
* `Credentials`: Necessary credentials to communicate with the authentication\_url.
  * Client Secret\_key
  * Cliente Client\_ID
* `Grant type`: Type of grant for the authentication. 

<Image align="center" src="https://files.readme.io/3075c93d6bfd9bc1a786206a165768229231928441c12c919717ab38d89df995-Screenshot_2025-02-07_at_10.49.53_AM.png" />

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

| type         | type\_event |
| :----------- | :---------- |
| enrollment   | enroll      |
| enrollment   | unenroll    |
| enrollment   | expiration  |
| payment      | purchase    |
| payment      | authorize   |
| payment      | capture     |
| payment      | refund      |
| payment      | cancel      |
| payment      | verify      |
| payment      | chargeback  |
| payout       | payout      |
| subscription | create      |
| subscription | pause       |
| subscription | resume      |
| subscription | cancel      |
| subscription | complete    |
