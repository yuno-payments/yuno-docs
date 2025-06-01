---
title: Enroll Payment Method (Direct) Response
description: Recipe Description
hidden: false
recipe:
  color: '#018FF4'
  icon: 🦉
---
```json JSON
{
  "name": "CARD",
  "description": "CARD_ENROLLMENT",
  "type": "CARD",
  "category": "CARD",
  "country": "US",
  "status": "ENROLLED",
  "vaulted_token": "9104911d-5df9-429e-8488-ad41abea1a4b",
  "card_data": {
    "iin": "45079900",
    "lfd": "0010",
    "number_length": "19",
    "security_code_length": "3",
    "brand": "VISA",
    "issuer": "JPMORGAN CHASE BANK, N.A.",
    "category": "Gold",
    "type": "CREDIT"
  },
  "created_at": "2022-05-09T20:46:54.786342Z",
  "updated_at": "2022-05-09T20:46:54.786342Z"
}
```

# Response JSON

<!-- json@1-9,19-21 -->

<li><b>name</b> (<code>string</code>): The payment method name (MAX 255; MIN 3).<br/></li>
<li><b>description</b> (<code>string</code>): The payment method description (MAX 255; MIN 3).<br/></li>
<li><b>type</b> (<code>enum</code>): The payment method type (MAX 255; MIN 3).<br/><small>Possible enum values: Check the <a href="payment-type-list">Payment type list</a>.</small></li>
<li><b>category</b> (<code>enum</code>): The payment method category (MAX 255; MIN 3).<br/></li>
<li><b>country</b> (<code>enum</code>): The customer's country (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).<br/><small>Possible enum values: Check the <a href="country-reference">Country reference</a>.</small></li>
<li><b>status</b> (<code>enum</code>): The status of the payment method (MAX 255; MIN 5).<br/><small>Possible enum values: Check the <a href="enrollment-workflow#payment-method-status">Payment method status</a>.</small></li>
<li><b>vaulted_token</b> (<code>string</code>): The vaulted token for the previously enrolled payment method (MAX 64; MIN 36).<br/></li>
<li><b>card_data</b> (<code>object</code>): Specifies the details of the card.</li>
<li><b>created_at</b> (<code>timestamp</code>): Payment method creation date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).<br/></li>
<li><b>updated_at</b> (<code>timestamp</code>): Last payment method update date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).<br/></li>

# Card data object

<!-- json@9-18 -->

Specifies the details of the card:

<li><b>iin</b> (<code>integer</code>): The issuer identification number (IIN) refers to the first few digits of the payment card number issued by a financial institution (MAX 8; MIN 6).</li>
<li><b>lfd</b> (<code>integer</code>): The last four digits of the card (MAX 4; MIN 4).</li>
<li><b>number_length</b> (<code>integer</code>): The length of the card's number (MAX 19; MIN 8).</li>
<li><b>security_code_length</b> (<code>integer</code>): The length of the card's security code (MAX 4; MIN 3).</li>
<li><b>brand</b> (<code>string</code>): The card's brand information (MAX 255; MIN 3).l></li>
<li><b>issuer</b> (<code>string</code>): The card's issuer (MAX 255; MIN 3).</li>
<li><b>category</b> (<code>string</code>): The category of the card's issuer (MAX 255; MIN 3).</li>
<li><b>type</b> (<code>string</code>): The type of the card's issuer (MAX 255; MIN 3).</li>