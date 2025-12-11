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

You can configure webhooks using the [Yuno dashboard](https://dashboard.y.uno/):

1. Navigate to the **Developers** tab
2. Click **Webhooks**
3. Click **Add webhook**

A sidebar will open where you'll configure:

* **Name**: Identify your webhook
* **Endpoint URL**: Your server URL to receive notifications
* **x-api-key**: Your API key (sent in notification headers)
* **x-secret**: Your secret (sent in notification headers)
* **Use OAuth2 Authentication**: Optional checkbox for OAuth2
* **Use HMAC Authentication**: Optional checkbox for HMAC signature verification

**Trigger on**: Select which events will trigger this webhook (enrollment, payment, subscription, etc.)

Once configured, the webhook will send notifications whenever the selected events occur. The image below shows the side panel to add a webhook.

<Image border={false} src="https://files.readme.io/d6c9cb749a295424c3ebbb241f29f8480d7df5f0df38e88c6c0c41688900f664-Screenshot_2025-11-04_at_8.25.21PM.png" />

In the [Yuno dashboard](https://dashboard.y.uno/) Developers tab, you can activate and deactivate webhooks using the **Status** toggle button.

Access the [Webhooks Examples](doc:examples) page to check examples for payment, enrollment, and many other notification events.

### HMAC authentication

When you enable **Use HMAC Authentication** in the dashboard, you'll provide a client secret key. Yuno will use this key to generate an HMAC signature and send it in the `x-hmac-signature` HTTP header with each webhook request, allowing you to verify that webhooks genuinely come from Yuno and haven't been tampered with.

See the [Verify Webhook Signatures (HMAC)](doc:verify-webhook-signatures-hmac) guide for implementation details.

### oAuth2

When you enable **Use OAuth2 Authentication** in the dashboard, you can configure the following parameters so Yuno can obtain the authorization token that will be sent in the webhook headers:

* `Authentication_url`: url to use for authentication
* `Credentials`: Necessary credentials to communicate with the authentication_url.
  * Client Secret_key
  * Cliente Client_ID
* `Grant type`: Type of grant for the authentication.

<Image align="center" border={false} src="https://files.readme.io/3075c93d6bfd9bc1a786206a165768229231928441c12c919717ab38d89df995-Screenshot_2025-02-07_at_10.49.53_AM.png" />

## Receipt confirmation process

Yuno webhooks expect to receive an HTTP 200 OK status as a response to indicate that the webhook was received. The merchant system response does not need to provide any information on the body request, only the HTTP 200 status. In case of not receiving a response at the specified time, Yuno webhooks will send the event notification up to seven times to avoid information loss. The table below presents the webhooks notification schedule and the confirmation waiting time.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Event
      </th>

      <th>
        Deadline after the first try
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        First try
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        Second try
      </td>

      <td>
        5 minutes
      </td>
    </tr>

    <tr>
      <td>
        Third try
      </td>

      <td>
        50 minutes
      </td>
    </tr>

    <tr>
      <td>
        Fourth try
      </td>

      <td>
        6 hours
      </td>
    </tr>

    <tr>
      <td>
        Fifth try
      </td>

      <td>
        24 hours
      </td>
    </tr>

    <tr>
      <td>
        Sixth try
      </td>

      <td>
        48 hours
      </td>
    </tr>

    <tr>
      <td>
        Seventh try
      </td>

      <td>
        96 hours
      </td>
    </tr>
  </tbody>
</Table>

## Webhooks event types

Depending on the type of event, you will receive a different type of webhook and event. The next table presents the possible event types for enrollments and payments currently available.

| type         | type_event |
| :----------- | :--------- |
| enrollment   | enroll     |
| enrollment   | unenroll   |
| enrollment   | expiration |
| payment      | purchase        |
| payment      | authorize       |
| payment      | capture         |
| payment      | refund          |
| payment      | cancel          |
| payment      | verify          |
| payment      | chargeback      |
| payment      | fraud_screening |
| payout       | payout          |
| subscription | create     |
| subscription | pause      |
| subscription | resume     |
| subscription | active     |
| subscription | cancel     |
| subscription | complete   |
| onboarding   | create     |
| onboarding   | pending    |
| onboarding   | succeeded  |
| onboarding   | canceled   |
| onboarding   | declined   |
| onboarding   | blocked    |
| onboarding   | unblocked  |

> `subscription.active` is sent only when a subscription transitions from any other valid status into `ACTIVE`. No webhook is emitted if the subscription is already active.

### Fraud Screening Webhook Behavior

When a transaction is declined by the fraud screening and doesn't move forward to processing with any provider, no transactions are created — the `transactions` array comes back empty. In this case, the only elements that get created are within the `fraud_screening` object, and the webhook that's triggered is `payment.fraud_screening`.

If due to the routing configuration the fraud screening declines but the transaction still proceeds to processing, the event sent to the client is `payment.purchase`.
