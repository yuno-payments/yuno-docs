---
title: Cancel and Capture Flow
deprecated: false
hidden: true
metadata:
  robots: index
---
This guide explains how Yuno handles card payment flows using the `payment_method.detail.card.capture` field and optional delayed actions. It covers immediate capture, manual operations, and delayed automatic flows.

## Capture behavior

| `capture` value | Behavior                                                                                                               |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `true`          | Payment is captured immediately as a purchase.                                                                         |
| `false`         | Payment is only authorized. You can either manually finalize it or configure delayed automatic capture or cancelation. |

## Manual flow

If `capture = false`, Yuno also supports delayed execution of capture or cancel using two configuration objects:

### `delayed_capture_settings`

```json
{
  "delay": "P30D",
  "simplified_mode": true
}
```

### `delayed_cancel_settings`

```json
{
  "delay": "P5D",
  "simplified_mode": false
}
```

Use these objects to instruct Yuno to handle the capture or cancel action automatically after a delay.

* Use **`[capture](https://docs.y.uno/reference/capture-authorization)`** to complete the payment.
* Use **`[cancel](https://docs.y.uno/reference/cancel-or-refund-a-payment)`** to void the authorization.

## Additional information

* Only valid when `capture = false`. If `capture = true`, these objects must be omitted or set to `null`.
* Only full captures are supported with `delayed_capture_settings`.
* If the merchant calls `/capture` or `/cancel` manually before the delay is reached, Yuno will cancel the scheduled automatic action.

## Example request

```json
{
  "country": "US",
  "amount": {
    "currency": "USD",
    "value": "20000"
  },
  "customer_payer": {
    "merchant_customer_validations": {
      "account_is_verified": true,
      "email_is_verified": true,
      "phone_is_verified": true
    },
    "id": "<customer_id>",
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com"
  },
  "workflow": "DIRECT",
  "payment_method": {
    "detail": {
      "card": {
        "capture": false,
        "delayed_capture_settings": {
          "delay": "P20D",
          "simplified_mode": true
        },
        "delayed_cancel_settings": {
          "delay": "P40D",
          "simplified_mode": true
        },
        "card_data": {
          "number": "4111111111111111",
          "expiration_month": 11,
          "expiration_year": 28,
          "security_code": "123",
          "holder_name": "John Doe"
        },
        "verify": false
      }
    },
    "type": "CARD"
  },
  "account_id": "<account_id>",
  "description": "Payment with card details",
  "merchant_order_id": "000023"
}
```

## When to use delayed actions

Use `delayed_capture_settings` or `delayed_cancel_settings` if:

* You want Yuno to automatically finalize or void an authorized transaction.
* You don’t want to rely on manually calling the `capture` or `cancel` endpoints.
* You need retry behavior in case of failure (`simplified_mode = true`).

## Field reference

| field                                      | type      | description                                                                                                                              |
| ------------------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `capture`                                  | `boolean` | Determines whether the card payment is captured immediately (`true`, purchase) or only authorized (`false`, requires capture or cancel). |
| `delayed_capture_settings.delay`           | `string`  | Delay before Yuno captures the payment. Must follow ISO 8601 duration format.                                                            |
| `delayed_capture_settings.simplified_mode` | `boolean` | If `true`, Yuno retries the capture if it fails.                                                                                         |
| `delayed_cancel_settings.delay`            | `string`  | Delay before Yuno cancels the authorization. Must follow ISO 8601 duration format.                                                       |
| `delayed_cancel_settings.simplified_mode`  | `boolean` | If `true`, Yuno retries the cancel if it fails.                                                                                          |