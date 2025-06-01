---
title: Enroll Payment Method Response (Checkout)
description: Recipe Description
hidden: false
recipe:
  color: '#018FF4'
  icon: 🦉
---
```json JSON
{
  "account_id": "8104911d-5df9-429e-8488-ad41abea1a4",
  "id": "9104911d-5df9-429e-8488-ad41abea1a4b",
  "type": "CARD",
  "category": "CARD",
  "country": "US",
  "status": "READY_TO_ENROLL",
  "created_at": "2022-05-09T20:46:54.786342Z",
  "updated_at": "2022-05-09T20:49:54.786342Z",
  "enrollment": {
    "session": "9104911d-5df9-429e-8488-ad41abea1a4b",
    "sdk_required_action": true
  }
}
```

```json Response Example
{"success":true}
```

# Response JSON

<!-- json@1-10,13-14 -->

<li><b>account_id</b> (<code>string</code>): The unique identifier of the account (MAX 64 ; MIN 36).</li>
  <li><b>id</b> (<code>string</code>): The unique identifier of the payment method (MAX 64 ; MIN 36).</li>
  <li><b>type</b> (<code>enum</code>): The payment method type (MAX 255; MIN 3). Possible enum values: Check the <a href="payment-type-list">Payment type list</a>.</li>
  <li><b>category</b> (<code>string</code>): The payment method category (MAX 255; MIN 3).</li>
  <li><b>country</b> (<code>enum</code>): The customer's country (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>). Possible enum values: Check the <a href="country-reference">Country reference</a>.</li>
  <li><b>status</b> (<code>enum</code>): Status of the payment method (MAX 255; MIN 5). Possible enum values: Check the <a href="enrollment-workflow#payment-method-status">Payment method status</a>.</li>
  <li><b>created_at</b> (<code>timestamp</code>): Payment method creation date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</li>
  <li><b>updated_at</b> (<code>timestamp</code>): Last payment method update date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</li>
  <li><b>enrollment</b> (<code>object</code>): Specifies enrollment object.</li>

# Enrollment object

<!-- json@10-13 -->

Specifies enrollment object:

<li><b>session</b> (<code>string</code>): The customer session that has been created for the payment method (MAX 64; MIN 36).</li>
      <li><b>sdk_action_required</b> (<code>boolean</code>): Required action to call the SDK. Possible values: <code>True</code> or <code>False</code>.</li>