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

To set up your webhooks in Yuno, you need to provide the following information:

1. **Notification URL**: The endpoint where you want to receive webhook notifications.
2. **API key and secret**: Your `API_key` (`x-api-key`) and `API_secret` (`x-secret`). These can be in any format and will be included in the webhook notification headers so your development team can verify that the requests are coming from Yuno.
3. **Webhook name**: A name to identify each webhook endpoint in your dashboard.

After your webhook is configured, you can select which events will trigger notifications for each webhook. This ensures you only receive relevant updates, eliminating the need for constant polling.

You can manage your webhooks directly from the [Yuno Merchant Dashboard](https://dashboard.y.uno/). In the **Developers** tab, select **Webhooks** to view, create, or edit webhooks. To add a new webhook, provide a name, specify the endpoint URL, and choose the events that should trigger notifications. The image below shows the side panel for adding a webhook.

![](https://files.readme.io/b6f4592-webhooks_configure1.png)

You can also activate or deactivate webhooks at any time using the **Status** toggle button in the Developers tab of the dashboard.

For examples of payment and enrollment notification events, visit the [webhooks examples](ref:examples) page.

### oAuth2

If you use the [OAuth2 authentication protocol](https://en.wikipedia.org/wiki/OAuth) to secure your webhook endpoint, Yuno allows you to configure the necessary parameters directly in the dashboard. This enables Yuno to obtain an authorization token and include it in the headers of each webhook notification.

To set up OAuth2 authentication for your webhook, provide the following information:

- **Authentication URL**: The URL used to request the authentication token.
- **Credentials**: The credentials required to authenticate with the `authentication_url`.
  - Client secret key
  - Client ID
- **Grant type**: The OAuth2 grant type to use for authentication.

You can enter these details in the same section where you configure your webhook endpoint in the dashboard.

<Image align="center" src="https://files.readme.io/3075c93d6bfd9bc1a786206a165768229231928441c12c919717ab38d89df995-Screenshot_2025-02-07_at_10.49.53_AM.png" />

## Receipt confirmation process

When Yuno sends a webhook notification to your endpoint, your system must respond with an HTTP 200 OK status to confirm successful receipt. No response body is required—only the status code.

If Yuno does not receive a 200 OK response within the expected timeframe, it will automatically retry sending the notification up to seven times to ensure delivery. The table below shows the webhook notification retry schedule and the confirmation waiting times.

| Event       | Deadline after the first try | Confirmation waiting time |
| :---------- | :--------------------------- | :------------------------ |
| First try   | -                            | 23 seconds                |
| Second try  | 5 minutes                    | 7 seconds                 |
| Third try   | 50 minutes                   | 7 seconds                 |
| Fourth try  | 6 hours                      | 7 seconds                 |
| Fifth try   | 24 hours                     | 7 seconds                 |
| Sixth try   | 48 hours                     | 7 seconds                 |
| Seventh try | 96 hours                     | 7 seconds                 |

## Webhook event types

Yuno sends different webhook notifications based on the type of event that occurs in your account. The table below lists all currently available event types for enrollments, payments, payouts, and subscriptions. Use this information to configure your endpoints and handle each event appropriately.

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

## PIX payment expiration handling

Yuno offers advanced expiration management for Pix payments to help prevent reconciliation issues, especially when integrating with platforms like VTEX.

When you set a custom `expiration_date` during Pix payment creation, Yuno:

- **Tracks expiration internally** instead of relying only on the provider’s webhook notifications.
- **Proactively checks payment status** by querying the provider before the expiration time.
- **Automatically marks payments as expired** if the Pix QR code remains unpaid after the expiration date.
- **Sends expiration webhooks** to notify integrated platforms (such as VTEX) so that orders can be cancelled automatically.

This proactive process keeps payment statuses synchronized between your platform, Yuno, and the payment provider, reducing the risk of pending or orphaned orders.

> **VTEX integration benefit**
>
> For VTEX merchants, Yuno automatically notifies VTEX when a Pix payment expires. This allows orders to be cancelled immediately and helps prevent inventory or reconciliation issues. It also resolves the common problem where VTEX continues retrying expired Pix payments, which can cause status mismatches between systems.
