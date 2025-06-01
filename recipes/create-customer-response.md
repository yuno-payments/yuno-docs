---
title: Create Customer Response
description: Recipe Description
hidden: false
recipe:
  color: '#018FF4'
  icon: 🦉
---
```json JSON
{
  "id": "9104911d-5df9-429e-8488-ad41abea1a4b",
  "merchant_customer_id": "4321",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@email.com",
  "gender": "M",
  "date_of_birth": "1990-02-28",
  "nationality": "US",
  "country": "US",
  "document": {
    "document_type": "SSN",
    "document_number": "123-45-6789"
  },
  "phone": {
    "number": "5551234567",
    "country_code": "1"
  },
  "billing_address": {
    "address_line_1": "123 Main St",
    "address_line_2": "Apt 5B",
    "country": "US",
    "state": "NY",
    "city": "New York",
    "zip_code": "10001"
  },
  "shipping_address": {
    "address_line_1": "123 Main St",
    "address_line_2": "Apt 5B",
    "country": "US",
    "state": "NY",
    "city": "New York",
    "zip_code": "10001"
  },
  "created_at": "2022-05-09T20:46:54.786342Z",
  "updated_at": "2022-05-09T20:46:54.786342Z"
}
```

# Response JSON

<!-- json@1-11,15,19,27,35-37 -->

<li><b>id</b> (<code>string</code>): The unique identifier of the customer (MAX 64 ; MIN 36).</li>
  <li><b>merchant_customer_id</b> (<code>string</code>): The unique identifier of the customer in the external merchant (MAX 255; MIN 3).</li>
  <li><b>first_name</b> (<code>string</code>): The customer's first name (MAX 255; MIN 1).</li>
  <li><b>last_name</b> (<code>string</code>): The customer's last name (MAX 255; MIN 1).</li>
  <li><b>email</b> (<code>string</code>): The customer's e-mail (MAX 255; MIN 3).</li>
  <li><b>gender</b> (<code>enum</code>): The customer's gender (MAX 2; MIN 1). Possible enum values: <code>M</code>, <code>F</code>, or <code>NB</code>.</li>
  <li><b>date_of_birth</b> (<code>string</code>): The customer's date of birth in the YYYY-MM-DD format (MAX 10; MIN 10).</li>
  <li><b>nationality</b> (<code>enum</code>): The customer's nationality (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).</li>
  <li><b>country</b> (<code>enum</code>): The customer's country (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).</li>
  <li><b>created_at</b> (<code>timestamp</code>): Customer creation date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</li>
  <li><b>updated_at</b> (<code>timestamp</code>): Last customer update date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</li>
  <li><b>document</b> (<code>object</code>): Information related to the customer's document.</li>
<li><b>phone</b> (<code>object</code>): Information related to the customer's phone.</li>
<li><b>billing_address</b> (<code>object</code>): Information related to the customer's billing address.</li>
<li><b>shipping_address</b> (<code>object</code>): Information related to the customer's shipping address.</li>

# Document object

<!-- json@11-14 -->

Information related to the customer's document:

<li><b>document_number</b> (<code>string</code>): The customer's document number (MAX 40; MIN 3).</li>
      <li><b>document_type</b> (<code>enum</code>): The customer's document type (MAX 6, MIN 2).</li>

# Phone object

<!-- json@15-18 -->

Information related to the customer's phone:

<li><b>country_code</b> (<code>string</code>): The country calling code of the customer's phone (MAX 3; MIN 1).</li>
      <li><b>number</b> (<code>string</code>): The customer's phone number, without the country code (MAX 32; MIN 1).</li>

# Billing address object

<!-- json@19-26 -->

Information related to the customer's billing address:

<li><b>address_line_1</b> (<code>string</code>): The primary billing address line of the customer (MAX 255; MIN 3).</li>
      <li><b>address_line_2</b> (<code>string</code>): The secondary billing address line of the customer (MAX 255; MIN 3).</li>
      <li><b>city</b> (<code>string</code>): The city considered for the billing address (MAX 255; MIN 3).</li>
      <li><b>country</b> (<code>enum</code>): The country considered for the billing address (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).</li>
      <li><b>state</b> (<code>string</code>): The state considered for the billing address (MAX 255; MIN 3).</li>
      <li><b>zip_code</b> (<code>string</code>): The zipcode considered for the billing address (MAX 11; MIN 4).</li>

# Shipping address object

<!-- json@27-34 -->

Information related to the customer's shipping address:

 <li><b>address_line_1</b> (<code>string</code>): The primary shipping address line of the customer (MAX 255; MIN 3).</li>
      <li><b>address_line_2</b> (<code>string</code>): The secondary shipping address line of the customer (MAX 255; MIN 3).</li>
      <li><b>city</b> (<code>string</code>): The city considered for the shipping address (MAX 255; MIN 3).</li>
      <li><b>country</b> (<code>enum</code>): The country considered for the shipping address (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).</li>
      <li><b>state</b> (<code>string</code>): The state considered for the shipping address (MAX 255; MIN 3).</li>
      <li><b>zip_code</b> (<code>string</code>): The zipcode considered for the shipping address (MAX 10; MIN 5).</li>