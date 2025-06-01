---
title: Create a Report Response
description: Recipe Description
hidden: false
recipe:
  color: '#018FF4'
  icon: 🦉
---
```json JSON
{
  "id": "6d905149-b388-4522-8c0a-759fed1f39da",
  "type": "PAYMENTS",
  "start_date": "2023-07-01 00:00:00 +0000 UTC",
  "end_date": "2023-07-12 00:00:00 +0000 UTC",
  "merchant_reference_id": "payments_1",
  "created_at": "2023-07-12 20:10:30.311048496 +0000 UTC",
  "updated_at": "2023-07-12 20:10:30.311048496 +0000 UTC",
  "expires_at": "",
  "status": "IN_PROCESS"
}
```

```json Response Example
{"success":true}
```

# Response JSON

<!-- json@1-11 -->

<li><strong>id</strong> (<code>string</code>): The unique identifier of the report (MAX 64; MIN 36). Example: 5104911d-5df9-229e-8468-bd41abea1.</li>

<li><strong>type</strong> (<code>enum</code>): The type of the report to run (MAX 255; MIN 3). Possible enum values: <code>PAYMENTS</code>, <code>TRANSACTIONS</code>, or <code>SETTLEMENTS</code>.</li>

<li><strong>start_date</strong> (<code>timestamp</code>): Starting timestamp of data to be included in the report run (MAX 24; MIN 24; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>). Example: 2022-05-09T20:46:54.786Z.</li>

<li><strong>end_date</strong> (<code>timestamp</code>): Ending timestamp of data to be included in the report run (MAX 24; MIN 24; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>). Example: 2022-05-09T20:46:54.786Z.</li>

<li><strong>merchant_reference_id</strong> (<code>string</code>): The unique identifier of the report at the merchant side (MAX 255; MIN 3). Example: Merchant_report_1234.</li>

<li><strong>created_at</strong> (<code>timestamp</code>): Report creation date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>). Example: 2022-05-09T20:46:54.786342Z.</li>

<li><strong>updated_at</strong> (<code>timestamp</code>): Report the last updated date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>). Example: 2022-05-09T20:46:54.786342Z.</li>

<li><strong>expires_at</strong> (<code>timestamp</code>): The time at which the file expires and is no longer available (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>). Example: 2022-05-09T20:46:54.786342Z.</li>

<li><strong>status</strong> (<code>enum</code>): Report status (MAX 255; MIN 3). Possible enum values: <code>IN_PROCESS</code>, <code>SUCCEEDED</code>, <code>DOWNLOADED</code>, <code>EXPIRED</code>, <code>FAILED</code>, or <code>ERROR</code>.</li>