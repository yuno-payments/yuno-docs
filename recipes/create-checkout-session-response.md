---
title: Create Checkout Session Response
description: Recipe Description
hidden: false
recipe:
  color: '#018FF4'
  icon: 🦉
---
```json JSON
{
  "merchant_order_id": "Example Order ID",
  "checkout_session": "c437f4cc-7d66-40e6-a8df-7c3cde1ddca7",
  "country": "US",
  "payment_description": "Example Payment Description",
  "customer_id": "55006822-7c79-490b-bea1-81798b9afc74",
  "callback_url": "https://www.y.uno/?checkoutSession=c437f4cc-7d66-40e6-a8df-7c3cde1ddca7",
  "amount": {
    "currency": "USD",
    "value": 20000
  },
  "created_at": "2023-07-20T17:06:17.232130Z",
  "metadata": [
    {
      "key": "test_1",
      "value": "test_1"
    }
  ],
  "workflow": "SDK_CHECKOUT"
}
```

# Response JSON

<!-- json@1-8,12-13,19-20 -->

<li><b>merchant_order_id</b> (<code>string</code>): The unique identifier of the customer's order (MAX 255; MIN 3).</li>
<li><b>checkout_session</b> (<code>string</code>): The unique identifier of the checkout session (MAX 64; MIN 36).</li>
<li><b>country</b> (<code>enum</code>): Country where the transaction must be processed (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).</li>
<li><b>payment_description</b> (<code>string</code>): The description of the payment (MAX 255; MIN 3).</li>
<li><b>customer_id</b> (<code>string</code>): The unique identifier of the customer (MAX 64; MIN 36).</li>
<li><b>callback_url</b> (<code>string</code>): The URL where to redirect the customer after the payment (MAX 526; MIN 3).</li>
<li><b>amount</b> (<code>object</code>): Specifies the payment amount object with the value and currency.</li>
<li><b>created_at</b> (<code>timestamp</code>): Checkout Session creation date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</li>
<li><b>metadata</b> (<code>array of objects</code>): Specifies a list of metadata objects. You can add up to 50 metadata objects.</li>
<li><b>workflow</b> (<code>string</code>): Specifies the workflow for the checkout session.</li>

# Amount object

<!-- json@8-11 -->

Specifies the payment amount object, with the value and currency:

<li><b>currency</b> (<code>enum</code>): The currency used to make the payment (MAX 3; MIN 3; <a href="country-reference">ISO 4217</a>).</li>
    <li><b>value</b> (<code>float</code>): The payment amount (multiple of 0.0001).</li>

# Metadata array of objects

<!-- json@13-18 -->

Specifies a list of metadata objects. You can add up to 50 metadata objects:

<li><b>key</b> (<code>string</code>): Specifies one metadata key.</li>
        <li><b>value</b> (<code>string</code>): Specifies the value for the defined metadata key.</li>