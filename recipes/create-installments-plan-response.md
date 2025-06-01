---
title: Create Installments Plan response
description: Recipe Description
hidden: false
recipe:
  color: '#018FF4'
  icon: 🦉
---
```json JSON
{
  "id": "4d573425-33f9-4c46-b009-2c7e749b0ec7",
  "name": "plan_007",
  "account_id": [
    "f7c5fe77-721b-49c2-84d3-957748df3c2c"
  ],
  "merchant_reference": "Test",
  "installments_plan": [
    {
      "installment": 1,
      "rate": 1,
      "provider_id": ""
    },
    {
      "installment": 3,
      "rate": 1,
      "provider_id": ""
    },
    {
      "installment": 6,
      "rate": 1,
      "provider_id": ""
    },
    {
      "installment": 9,
      "rate": 1,
      "provider_id": ""
    },
    {
      "installment": 12,
      "rate": 1,
      "provider_id": ""
    }
  ],
  "type": "",
  "source": "",
  "provider_id": "",
  "scheme": "",
  "brand": "",
  "issuer": "",
  "issuer_id": "",
  "iin": null,
  "country_code": "US",
  "first_installment_deferral": 0,
  "amount": {
    "Currency": "USD",
    "min_value": 0,
    "max_value": 1000000
  },
  "availability": {
    "start_at": "2023-09-12T00:00:00Z",
    "finish_at": "2030-09-20T00:00:00Z"
  },
  "created_at": "2023-10-11T17:52:31.886178246Z",
  "updated_at": "2023-10-11T17:52:31.886178246Z"
}
```

```json Response Example
{"success":true}
```

# Response JSON

<!-- json@1-4,7,8,35-45,50,54-60 -->

<ul>
  <li><b>account_id</b> (<code>array</code> of <code>string</code>): The associated account ID(s).</li>
  <li><b>merchant_reference</b> (<code>string</code>): The merchant reference for the plan.</li>
  <li><b>installments_plan</b> (<code>array</code> of <code>object</code>): The installment details.</li>
  <li><b>type</b> (<code>string</code>): The type of the plan.</li>
  <li><b>source</b> (<code>string</code>): The source of the plan.</li>
  <li><b>provider_id</b> (<code>string</code>): The provider ID associated with the plan.</li>
  <li><b>scheme</b> (<code>string</code>): The scheme of the plan.</li>
  <li><b>brand</b> (<code>string</code>): The brand associated with the plan.</li>
  <li><b>issuer</b> (<code>string</code>): The issuer of the plan.</li>
  <li><b>issuer_id</b> (<code>string</code>): The issuer ID associated with the plan.</li>
  <li><b>iin</b> (<code>null</code> or <code>number</code>): The IIN (Issuer Identification Number) associated with the plan.</li>
  <li><b>country_code</b> (<code>string</code>): The country code associated with the plan.</li>
  <li><b>first_installment_deferral</b> (<code>number</code>): The deferral for the first installment.</li>
  <li><b>amount</b> (<code>object</code>): The amount details.</li>
  <li><b>availability</b> (<code>object</code>): The availability details.</li>
  <li><b>created_at</b> (<code>timestamp</code>): The creation timestamp of the plan (ISO 8601).</li>
  <li><b>updated_at</b> (<code>timestamp</code>): The last updated timestamp of the plan (ISO 8601).</li>
</ul>

# Installments plan array of objects

<!-- json@8-34 -->

The installment details, each containing:

<ul>
    <li><b>installment</b> (<code>number</code>): The installment number.</li>
    <li><b>rate</b> (<code>number</code>): The rate associated with the installment.</li>
    <li><b>provider_id</b> (<code>string</code>): The provider ID for the installment.</li>
  </ul>

# Amount object

<!-- json@45-49 -->

The amount details, including:

<ul>
    <li><b>Currency</b> (<code>string</code>): The currency of the amount (COP).</li>
    <li><b>min_value</b> (<code>number</code>): The minimum value of the amount.</li>
    <li><b>max_value</b> (<code>number</code>): The maximum value of the amount (100000000).</li>
  </ul>

# Availability object

<!-- json@50-53 -->

The availability details, including:

<ul>
    <li><b>start_at</b> (<code>timestamp</code>): The start timestamp of the plan's availability (ISO 8601).</li>
    <li><b>finish_at</b> (<code>timestamp</code>): The finish timestamp of the plan's availability (ISO 8601).</li>
  </ul>