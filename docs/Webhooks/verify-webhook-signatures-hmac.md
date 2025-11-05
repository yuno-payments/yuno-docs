---
title: Verify Webhook Signatures (HMAC)
excerpt: >-
  Learn how to verify webhook signatures using HMAC to ensure webhooks from Yuno
  are authentic and haven't been tampered with during transmission.
deprecated: false
hidden: false
metadata:
  robots: index
---
Webhook signature verification using HMAC (Hash-based Message Authentication Code) ensures that webhooks sent to your server actually originate from Yuno and haven't been intercepted or modified during transmission. This adds an extra layer of security beyond authentication methods like OAuth.

While OAuth provides authentication (verifying who is sending the request), HMAC signatures provide:

* **Data integrity**: Confirms the webhook payload hasn't been tampered with
* **Authenticity**: Verifies the webhook genuinely comes from Yuno
* **Protection**: Guards against man-in-the-middle attacks and replay attacks
* **Compliance**: Meets security requirements for handling sensitive payment data

## How HMAC signatures work

<Callout icon="📘">
  The name and location of the signature field (`hmacSignature` in this page) may differ in your integration. Confirm the exact details for your setup with Yuno's technical team.
</Callout>

When Yuno sends a webhook to your server:

1. **Signature generation**: Yuno creates an HMAC signature by hashing specific webhook fields with your secret key using the SHA-256 algorithm
2. **Payload inclusion**: The signature is included as a field within the webhook JSON payload (e.g. `hmacSignature`)
3. **Verification**: Your server extracts the signature, recreates it using the same fields and secret key, then compares
4. **Validation**: If the signatures match, the webhook is authentic and unaltered

## Configuration

To enable HMAC signature verification, check **Use HMAC Authentication** when creating or editing a webhook in the [Yuno dashboard](https://dashboard.y.uno/).

See [Configure Webhooks](doc:configure-webhooks) for step-by-step instructions on accessing the webhook configuration panel.

## What changes with HMAC

When HMAC signature verification is enabled, Yuno webhooks include an additional signature field in the JSON payload. The webhook structure remains the same as documented in [Webhook Examples](doc:examples), with the signature field added.

### Example authorization webhook with HMAC

```json
{
  "live": "false",
  "notificationItems": [
    {
      "NotificationRequestItem": {
        "additionalData": {
          "expiryDate": "12/2012",
          "authCode": "1234",
          "cardSummary": "7777",
          "totalFraudScore": "10",
          "hmacSignature": "YwPQ1b2RcBkDGo32XvDS7R+/nMDuDIRjvQlsak72EMBY="
        },
        "amount": {
          "currency": "EUR",
          "value": 10100
        },
        "eventCode": "AUTHORISATION",
        "eventDate": "2022-11-15T20:04:11+01:00",
        "merchantAccountCode": "AcmeCorp",
        "merchantReference": "2931874530016873",
        "paymentMethod": "visa",
        "pspReference": "CU4KVBAYAPFG0ZZKR",
        "success": "true"
      }
    }
  ]
}
```

## Related documentation

* [Configure Webhooks](doc:configure-webhooks)
* [Webhook Examples](doc:examples)
* [Webhooks Overview](doc:webhooks)
