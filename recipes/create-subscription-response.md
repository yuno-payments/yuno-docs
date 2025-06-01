---
title: Create Subscription Response
description: Recipe Description
hidden: false
recipe:
  color: '#018FF4'
  icon: 🦉
---
```json JSON
{
  "id": "7304911d-5df9-429e-8488-ad41abea1a4c",
  "name": "sub_001",
  "description": "streaming service",
  "account_id": "2404911d-5df9-429e-8488-ad41abea1a4b",
  "merchant_reference": "001_March_23",
  "status": "ACTIVE",
  "subscription_plan_id": "1904911d-5df9-429e-8488-ad41abea1a4d",
  "amount": {
    "currency": "USD",
    "value": 12.99
  },
  "frequency": {
    "type": "MONTH",
    "value": 1
  },
  "billing_cycles": {
    "total": 10,
    "current": 2,
    "next_at": "2023-02-16T20:00:00.786342Z"
  },
  "customer_payer": {
    "id": "3t04911d-5df9-429e-8488-ad41abea1a2c"
  },
  "payment_method": [
    {
      "type": "CARD",
      "token": "9104911d-5df9-429e-8488-ad41abea1a4b",
      "vaulted_token": "6104911d-5df9-429e-8488-ad41abea1a4b",
      "card": {
        "verify": false,
        "card_data": {
          "number": "4111111111111111",
          "expiration_month": 10,
          "expiration_year": 2025,
          "security_code": 123,
          "holder_name": "JOHN DOE"
        }
      }
    }
  ],
  "availability": {
    "start_at": "2024-01-16T00:00:00.786342Z",
    "finish_at": "2024-05-26T20:00:00.786342Z"
  },
  "metadata": {
    "key": "sub_ext_id",
    "value": "AA001"
  },
  "payments": [
    "5104911d-5df9-229e-8468-bd41abea1a4s"
  ],
  "created_at": "2023-12-16T20:46:54.786342Z",
  "updated_at": "2023-12-16T21:00:54.786342Z"
}
```

```json Response Example
{"success":true}
```

# Response JSON

<!-- json@1-9,13,17,22,25,42,46,50,53-60 -->

<ul>
  <li><b>id</b> (<code>string</code>): The unique identifier of the subscription (MAX 64; MIN 36).</li>
  <li><b>name</b> (<code>string</code>): The subscription name (MAX 255; MIN 3).</li>
  <li><b>description</b> (<code>string</code>): The subscription description (MAX 255; MIN 3).</li>
  <li><b>account_id</b> (<code>string</code>): The unique identifier of the account that will have the subscription plan available to use (MAX 64; MIN 36).</li>
  <li><b>merchant_reference</b> (<code>string</code>): Identification of the subscription plan (MAX 255; MIN 3).</li>
  <li><b>country</b> (<code>string</code>): The subscription's country.</li>
  <li><b>status</b> (<code>enum</code>): Status of the subscription. Possible values: ACTIVE, PAUSED, COMPLETED, CANCELED.</li>
  <li><b>subscription_plan_id</b> (<code>string</code>): Unique identifier of the subscription plan (MAX 255; MIN 3).</li>
  <li><b>amount</b> (<code>object</code>): Specifies the subscription amount object, with the value and currency.</li>
  <li><b>frequency</b> (<code>object</code>): The frequency defined for the payment subscription.</li>
  <li><b>billing_cycles</b> (<code>object</code>): Specifies the billing_cycles object.</li>
  <li><b>customer_payer</b> (<code>object</code>): Specifies the customer_payer object.</li>
  <li><b>payment_method</b> (<code>array of objects</code>): Specifies the payment_method object.</li>
  <li><b>availability</b> (<code>object</code>): Specifies the availability object.</li>
  <li><b>metadata</b> (<code>object</code>): Specifies the metadata object.</li>
  <li><b>payments</b> (<code>Array of strings</code>): Specifies the payments array.</li>
  <li><b>created_at</b> (<code>Timestamp</code>): Subscription creation date and time (ISO 8601 MAX 27; MIN 27).</li>
  <li><b>updated_at</b> (<code>Timestamp</code>): Subscription last updated date and time (ISO 8601 MAX 27; MIN 27).</li>
</ul>

# Amount object

<!-- json@9-12 -->

Specifies the subscription amount object, with the value and currency:

<ul>
    <li><b>currency</b> (<code>enum</code>): The currency used to make the payment (MAX 3; MIN 3; ISO 4217).</li>
    <li><b>value</b> (<code>number</code>): The payment amount (multiple of 0.0001).</li>
  </ul>

# Frequency object

<!-- json@13-16 -->

The frequency defined for the payment subscription:

<ul>
    <li><b>type</b> (<code>enum</code>): The type of interval the subscription will have in time (DAY, WEEK, MONTH).</li>
    <li><b>value</b> (<code>int</code>): The value between each interval the subscription will have in time.</li>
  </ul>

# Billing cycle object

<!-- json@17-21 -->

Specifies the billing_cycles object:

<ul>
    <li><b>total</b> (<code>number</code>): Total amount of billing cycles.</li>
    <li><b>current</b> (<code>number</code>): Value of the current billing cycle.</li>
    <li><b>next_at</b> (<code>timestamp</code>): The date of the next payment for the subscription.</li>
  </ul>

# Customer payer object

<!-- json@22-24 -->

Specifies the customer_payer object:

<ul>
    <li><b>id*</b> (<code>string</code>): The unique identifier of the customer (MAX 255; MIN 3).</li>
  </ul>

# Payment method array of objects

<!-- json@25-41 -->

Specifies the <code>payment_method</code> objects:

<ul>
    <li><b>type</b> (<code>enum</code>): Type of the payment method. Possible enum values: CARD.</li>
    <li><b>token</b> (<code>string</code>): The one-time use payment method token provided by Yuno SDK (MAX 64; MIN 36).</li>
    <li><b>vaulted_token</b> (<code>string</code>): The vaulted token of the stored payment method (MAX: 64; MIN: 36).</li>
    <li>
      <details>
        <summary>
          <b>card</b> (<code>object</code>): Specifies the card object.
        </summary>
        <ul>
          <li><b>verify</b> (<code>boolean</code>): Using amount = 0 and verify = true, you can verify the user's card without authorizing a real amount.</li>
          <li>
            <details>
              <summary>
                <b>card_data</b> (<code>object</code>): Specifies the card_data object.
              </summary>
              <ul>
                <li><b>number</b> (<code>string</code>): Card's number without any separators (MAX 19; MIN 8).</li>
                <li><b>expiration_month</b> (<code>number</code>): Card's expiration month - MM (MAX 2; MIN 2).</li>
                <li><b>expiration_year</b> (<code>number</code>): Card's expiration year - YYYY (MAX 4; MIN 4).</li>
                <li><b>security_code</b> (<code>number</code>): Card's security code (MAX 4; MIN 3).</li>
                <li><b>holder_name</b> (<code>string</code>): Cardholder's full name as it appears on the card (MAX 26; MIN 3).</li>
              </ul>
            </details>
          </li>
        </ul>
      </details>
    </li>
  </ul>

# Availability object

<!-- json@42-45 -->

Specifies the availability object:

<ul>
    <li><b>start_at</b> (<code>timestamp</code>): The start date that the subscription will be available to use.</li>
    <li><b>finish_at</b> (<code>timestamp</code>): The end date until the subscription will be available to use.</li>
  </ul>

# Metadata array of objects

<!-- json@46-49 -->

Specifies the metadata object:

  <ul>
    <li><b>key</b> (<code>string</code>): Object title that represents the key-value pair inside the metadata (MAX 48; MIN 1).</li>
    <li><b>value</b> (<code>string</code>): Object value for the key defined (MAX 512; MIN 1).</li>
  </ul>

# Payments array of strings

<!-- json@50-52 -->

Specifies the payments array:

<ul>
    <li><b>id*</b> (<code>string</code>): The unique identifier of the payment (MAX 64 ; MIN 36).</li>
  </ul>