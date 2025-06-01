---
title: Create Customer Session Response
description: Recipe Description
hidden: false
recipe:
  color: '#018FF4'
  icon: 🦉
---
```json JSON
  {
    "customer_session": "b22edccc-cdd5-4520-bae7-5f5f491dd851",
    "customer_id": "1b430201-0200-46cd-84f7-36a8799bbbd7",
    "country": "US",
    "callback_url": "http://www.mysite.com?customerSession=b22edccc-cdd5-4520-bae7-5f5f491dd851",
    "created_at": "2022-11-08T01:28:08.804150Z"
  }
```

# Response JSON

<!-- json@1-7 -->

<li><b>customer_session</b> (<code>string</code>): The customer session that has been created for the enrollment (MAX 64 ; MIN 36).</li>

  <li><b>customer_id</b> (<code>string</code>): The unique identifier of the customer (MAX 64 ; MIN 36).</li>

  <li><b>country</b> (<code>enum</code>): The customer's country (MAX 2; MIN 2;  <a href="country-reference">ISO 3166-1</a>). Possible enum values: Check the  <a href="country-reference">Country reference</a>.</li>

  <li><b>callback_url</b> (<code>string</code>): The URL to redirect your customer after the enrollment  is made in the provider´s environment (MAX 526; MIN 3).</li>

  <li><b>created_at</b> (<code>timestamp</code>): Customer Session creation date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</li>