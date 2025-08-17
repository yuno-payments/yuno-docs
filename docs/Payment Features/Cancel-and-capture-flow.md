---
title: Cancel and Capture Flow
deprecated: false
hidden: true
metadata:
  robots: index
---

## Cancel and capture flow

This guide explains how Yuno handles card payment flows using the `payment_method.detail.card.capture` field and optional delayed actions. It covers immediate capture, manual operations, and delayed automatic flows.

---

## Capture behavior

| `capture` value | behavior                                                                                                               |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `true`          | Payment is captured immediately as a purchase.                                                                         |
| `false`         | Payment is only authorized. You can either manually finalize it or configure delayed automatic capture or cancelation. |

---

## Manual flow

If `capture = false`, you can take manual control of the authorization:

- Use **`/capture`** to complete the payment.
- Use **`/cancel`** to void the authorization.

Calling either of these endpoints overrides any delayed action configured.

---

## Delayed auto-actions

If `capture = false`, Yuno also supports delayed execution of capture or cancel using two configuration objects:

### `delayed_capture_settings`

```json
{
  "delay": "P3D",
  "simple_mode": true
}
```

### `delayed_cancel_settings`

```json
{
  "delay": "P5D",
  "simple_mode": false
}
```

Use these objects to instruct Yuno to handle the capture or cancel action automatically after a delay.

---

## Constraints and behavior

- Only valid when `capture = false`. If `capture = true`, these objects must be omitted or set to `null`.
- Only full captures are supported with `delayed_capture_settings`.
- If the merchant calls `/capture` or `/cancel` manually before the delay is reached, Yuno will cancel the scheduled automatic action.

---

## Examples

### Immediate capture

```json
{
  "payment_method": {
    "detail": {
      "card": {
        "capture": true,
        "delayed_capture_settings": null,
        "delayed_cancel_settings": null
      }
    },
    "type": "CARD"
  }
}
```

### Delayed capture

```json
{
  "payment_method": {
    "detail": {
      "card": {
        "capture": false,
        "delayed_capture_settings": {
          "delay": "P2D",
          "simple_mode": true
        },
        "delayed_cancel_settings": null
      }
    },
    "type": "CARD"
  }
}
```

### Delayed cancel

```json
{
  "payment_method": {
    "detail": {
      "card": {
        "capture": false,
        "delayed_capture_settings": null,
        "delayed_cancel_settings": {
          "delay": "P5D",
          "simple_mode": false
        }
      }
    },
    "type": "CARD"
  }
}
```

---

## When to use delayed actions

Use `delayed_capture_settings` or `delayed_cancel_settings` if:

- You want Yuno to automatically finalize or void an authorized transaction.
- You don’t want to rely on manually calling `/capture` or `/cancel`.
- You need retry behavior in case of failure (`simple_mode = true`).

Avoid them if:

- You need to support **partial capture** (not supported via delay).
- You plan to control the capture/cancel process manually in real time.

---

## Field reference

| field                                  | type      | description                                                                                                                              |
| -------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `capture`                              | `boolean` | Determines whether the card payment is captured immediately (`true`, purchase) or only authorized (`false`, requires capture or cancel). |
| `delayed_capture_settings.delay`       | `string`  | Delay before Yuno captures the payment. Must follow ISO 8601 duration format.                                                            |
| `delayed_capture_settings.simple_mode` | `boolean` | If `true`, Yuno retries the capture if it fails.                                                                                         |
| `delayed_cancel_settings.delay`        | `string`  | Delay before Yuno cancels the authorization. Must follow ISO 8601 duration format.                                                       |
| `delayed_cancel_settings.simple_mode`  | `boolean` | If `true`, Yuno retries the cancel if it fails.                                                                                          |
