---
title: Create Payout Response
description: Recipe Description
hidden: false
recipe:
  color: '#018FF4'
  icon: 🦉
---
```json JSON
{
  "id": "5404911d-5df9-429e-8488-ad41abea1a4b",
  "account_id": "2404911d-5df9-429e-8488-ad41abea1a4b",
  "status": "RECEIVED",
  "merchant_reference": "4234",
  "description": "marketplace payment",
  "purpose": "CHECK_PURPOSE_LIST",
  "country": "US",
  "amount": {
    "value": 10000,
    "currency": "USD"
  },
  "beneficiary": {
    "external_id": "AAAA01",
    "national_entity": "INDIVIDUAL",
    "first_name": "John",
    "last_name": "Doe",
    "legal_name": "Arcos Dorados Inc.",
    "email": "john.doe@email.com",
    "country": "US",
    "date_of_birth": "1990-02-28"
  },
  "document": {
    "document_number": "123-45-6789",
    "document_type": "SSN"
  },
  "phone": {
    "country_code": "1",
    "number": "5551234567"
  },
  "address": {
    "address_line_1": "123 Main St",
    "address_line_2": "Apt 5B",
    "city": "New York",
    "country": "US",
    "state": "NY",
    "zip_code": "10001"
  },
  "financial_institution": {
    "code": "026009593",
    "branch": "MAIN",
    "branch_digit": "001",
    "account": "123456789",
    "account_digit": "01",
    "account_type": "CHECKING"
  },
  "transactions": [
    {
      "id": "9104911d-5df9-429e-8488-ad41abea1a4b",
      "type": "PURCHASE",
      "status": "COMPLETED",
      "response_code": "00",
      "merchant_reference": "AAB01-432245",
      "amount": 40.5,
      "reason": "DUPLICATE",
      "description": "Product Received in Poor Condition"
    }
  ],
  "provider_data": {
    "id": "ADDI",
    "transaction_id": "12345678",
    "account_id": "9990128",
    "status": "accredited",
    "status_detail": "approved",
    "raw_response": "The response will vary for each data provider.",
    "created_at": "2022-05-09T20:46:54.786342Z",
    "updated_at": "2022-05-09T20:46:54.786342Z"
  },
  "metadata": [
    {
      "key": "order_id",
      "value": "AA001"
    }
  ],
  "created_at": "2022-05-09T20:46:54.786342Z",
  "updated_at": "2022-05-09T20:46:54.786342Z"
}
```

```json Response Example
{"success":true}
```

# Response JSON

<!-- json@1-9,13,23,27,31,39,47,59,69,75-80 -->

<ul>
  <li><b>id</b> (<code>string</code>): The unique identifier of the payout (MAX 64 ; MIN 36).</li>
<li><b>account_id</b> (<code>string</code>): The unique identifier of the account (MAX 64 ; MIN 36).</li>
<li><b>status</b> (<code>enum</code>): The status of the Payout (MAX 255; MIN 3).</li>
<li><b>merchant_reference</b> (<code>string</code>): The unique identifier of the customer's order (MAX 255; MIN 3).</li>
<li><b>description</b> (<code>string</code>): The description of the payout (MAX 255; MIN 3).</li>
<li><b>purpose</b> (<code>enum</code>): Indicates the purpose for the payout.
  <br /><small>Possible enum values: Check the <a href='purposes-list'>Purpose list</a>.</small>
</li>
<li><b>country</b> (<code>enum</code>): Country where the transaction must be processed (MAX 2; MIN 2; <a href='country-reference'>ISO 3166-1</a>).
  <br /><small>Possible enum values: Check the <a href='country-reference'>Country reference</a>.</small>
</li>
<li><b>amount</b> (<code>object</code>): Specifies the payout amount object, with the value and currency.</li>
<li><b>beneficiary</b> (<code>object</code>): Specifies the beneficiary object with their identification.</li>
<li><b>document</b> (<code>object</code>): Specifies the beneficiary's document object, including its number and type.</li>
<li><b>phone</b> (<code>object</code>): Specifies the beneficiary's phone number object.</li>
<li><b>address</b> (<code>object</code>): Specifies the beneficiary's address object.</li>
<li><b>financial_institution</b> (<code>object</code>): Specifies the beneficiary's financial institution object.</li>
<li><b>transactions</b> (<code>array of objects</code>): Specifies a list of payouts objects.</li>
<li><b>provider_data</b> (<code>object</code>): Specifies the data provider.</li>
<li><b>metadata</b> (<code>object</code>): Specifies the metadata object, including any additional information about the payout.</li>
<li><b>created_at</b> (<code>timestamp</code>): Transactions creation date (MAX 27; MIN 27, <a href='https://en.wikipedia.org/wiki/ISO_8601'>ISO 8601</a>).</li>
<li><b>updated_at</b> (<code>timestamp</code>): The last transactions update date (MAX 27; MIN 27, <a href='https://en.wikipedia.org/wiki/ISO_8601'>ISO 8601</a>).</li>
</ul>

# Amount object

<!-- json@9-12 -->

Specifies the payout amount object, with the value and currency:

<ul>
    <li><b>value</b> (<code>number</code>): The payout amount (multiple of 0.0001).</li>
    <li><b>currency</b> (<code>enum</code>): The currency used to make the payout (MAX 3; MIN 3; <a href='country-reference'>ISO 4217</a>).
      <br /><small>Possible enum values: Check the <a href='country-reference'>Country reference</a>.</small>
    </li>
  </ul>

# Beneficiary object

<!-- json@13-22 -->

Specifies the beneficiary object with their identification:

<ul>
    <li><b>external_id</b> (<code>string</code>): Unique identifier of the beneficiary defined by the merchant.</li>
    <li><b>national_entity</b> (<code>enum</code>): Beneficiary's national entity type.
      <br /><small>Possible enum values: <code>INDIVIDUAL</code> or <code>ENTITY</code></small>
    </li>
    <li><b>first_name</b> (<code>string</code>): The beneficiary's first name (MAX 80; MIN 1).</li>
    <li><b>last_name</b> (<code>string</code>): The beneficiary's last name (MAX 80; MIN 1).</li>
    <li><b>legal_name</b> (<code>string</code>): The beneficiary's name (Max: 80). Only necessary when <code>national_entity</code> is <code>ENTITY</code>.</li>
    <li><b>email</b> (<code>string</code>): The beneficiary's email (MAX 255; MIN 3).</li>
    <li><b>country</b> (<code>enum</code>): The beneficiary's country (MAX 2; MIN 2; <a href='country-reference'>ISO 3166-1</a>).
      <br /><small>Possible enum values: Check the <a href='country-reference'>Country reference</a>. </small>
    </li>
    <li><b>date_of_birth</b> (<code>date</code>): The beneficiary's date of birth in the YYYY-MM-DD format (MAX 10; MIN 10).</li>
  </ul>

# Document object

<!-- json@23-26 -->

Specifies the beneficiary's document object, including its number and type:

<ul>
    <li><b>document_number</b> (<code>string</code>): The beneficiary's document number (MAX 40; MIN 3).</li>
    <li><b>document_type</b> (<code>enum</code>): The beneficiary's document type (MAX 6, MIN 2).
      <br /><small>Possible enum values: Check the <a href='country-reference'>Country reference.</a></small>
    </li>
  </ul>

# Phone object

<!-- json@27-30 -->

Specifies the beneficiary's phone number object:

  <ul>
    <li><b>country_code</b> (<code>string</code>): The country calling code of the beneficiary's phone (MAX 3; MIN 1).</li>
    <li><b>number</b> (<code>string</code>): The beneficiary's phone number, without the country calling code (MAX 32; MIN 1).</li>
  </ul>

# Address object

<!-- json@31-38 -->

Specifies the beneficiary's address object:

  <ul>
    <li><b>address_line_1</b> (<code>string </code>): The beneficiary's primary address line (MAX 255; MIN 3).</li>
    <li><b>address_line_2</b> (<code>string</code>): The beneficiary's secondary address line (MAX 255; MIN 3).</li>
    <li><b>city</b> (<code>string</code>): The city considered for the beneficiary address (MAX 255; MIN 3).</li>
    <li><b>country</b> (<code>enum</code>): The country of the beneficiary address (MAX 2; MIN 2; <a href='country-reference'>ISO 3166-1</a>).
      <br /><small>Possible enum values: Check the <a href='country-reference'>Country reference</a>. </small>
    </li>
    <li><b>state</b> (<code>string</code>): The beneficiary's state or province address (MAX 255; MIN 3).</li>
    <li><b>zip_code</b> (<code>string</code>): The zipcode considered for the beneficiary address (MAX 11; MIN 4).</li>
  </ul>

# Financial institution object

<!-- json@39-46 -->

Specifies the beneficiary's financial institution object:

  <ul>
    <li><b>code</b> (<code>string</code>): The beneficiary's financial institution code (MAX 3; MIN 3).</li>
    <li><b>branch</b> (<code>string</code>): The beneficiary's specific financial institution branch (MAX 3; MIN 3).</li>
  </ul>

# Transactions array of objects

<!-- json@47-57 -->

Specifies a list of payout objects:

<ul>
  <li><strong>id</strong> (<code>string</code>): The unique identifier for the payout intent (MAX 64 ; MIN 36).</li>
  <li><strong>type</strong> (<code>enum</code>): The payout intent type (MAX 255; MIN 3).</li>
  <li><strong>status</strong> (<code>enum</code>): The payout intent status (MAX 255; MIN 3).</li>
  <li><strong>response_code</strong> (<code>enum</code>): The response code indicates the status of the payout intent request (MAX 255; MIN 3).</li>
  <li><strong>merchant_reference</strong> (<code>string</code>): The payout transaction identification defined by the merchant (MAX 255; MIN 3).</li>
  <li><strong>amount</strong> (<code>number</code>): Specifies the payout amount (multiple of 0.0001).</li>
  <li><strong>reason</strong> (<code>enum</code>): Specifies the refund reason that originated the payout. Possible values: <code>DUPLICATE</code>, <code>FRAUDULENT</code>, <code>REQUESTED_BY_CUSTOMER</code>, <code>NULL</code>.</li>
  <li><strong>description</strong> (<code>string</code>): Describes the refund and its reason (MAX 255; MIN 3). Example: Product Received in Poor Condition.</li>
</ul>

# Provider data object

<!-- json@59-68 -->

Specifies the data provider:

<ul>
  <li><strong>id</strong> (<code>enum</code>): The data provider identification. Possible values: <code>ADDI</code>, <code>MERCADO_PAGO</code>, <code>SPINPAY</code>, <code>WOMPI</code>.</li>
  <li><strong>transaction_id</strong> (<code>string</code>): The unique identifier of the payment from the provider. Example: 12345678.</li>
  <li><strong>account_id</strong> (<code>string</code>): The merchant's payment provider account id. Example: 9990128.</li>
  <li><strong>status</strong> (<code>string</code>): Provider's status of the transaction (MAX 255; MIN 3). Example: accredited.</li>
  <li><strong>status_detail</strong> (<code>string</code>): The data provider's detailed status of the transaction (MAX 255; MIN 3). Example: approved.</li>
  <li><strong>raw_response</strong> (<code>string</code>): The data provider raw response. The format depends on the provider's response. The response will vary for each data provider.</li>
  <li><strong>created_at</strong> (<code>timestamp</code>): Transactions creation date (MAX 27; MIN 27, <a href='https://en.wikipedia.org/wiki/ISO_8601'>ISO 8601</a>). Example: 2022-05-09T20:46:54.786342Z.</li>
  <li><strong>updated_at</strong> (<code>timestamp</code>): The last transactions update date (MAX 27; MIN 27, <a href='https://en.wikipedia.org/wiki/ISO_8601'>ISO 8601</a>). Example: 2022-05-09T20:46:54.786342Z.</li>  
</ul>

# Metadata array of objects

<!-- json@69-74 -->

<ul>
    <li><b>key</b> (<code>string</code>): The metadata key (MAX 255; MIN 3).</li>
    <li><b>value</b> (<code>string</code>): The metadata value (MAX 255; MIN 3).</li>
  </ul>