---
title: Declined Payment Calls
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
This document describes the `/declined-payments/external` endpoint, which is used to initiate large-scale processing of calls and WhatsApp mensagges related to declined payments. The endpoint receives an array containing detailed information about the rejected payments.

* **Endpoint**: `https://prod.y.uno/ai-caller-ms/declined-payments/external`  
* **Method**: `POST`  
* **Content-Type**: `application/json`

## Request Body

The body of the request must be a JSON object with the following structure:

```json
{
  "organization_code": "string",
  "external_data": [
    {
      "payment": {
        "organization_code": "string*",
        "id": "string*",
        "code": "string",
        "order_id": "string*",
        "country": "string*",
        "status": "string*",
        "sub_status": "string",
        "description": "string*",
        "amount_value": "number*",
        "currency_code": "string*",
        "reject_reason": "string*",
        "additional_data": { ... },
        "created_at": "string (YYYY-MM-DD HH:MM:SS)"
      },
      "transactions": [
        {
          "id": "string*",
          "card": { ... },
          "code": "string",
          "type": "string",
          "amount": "number*",
          "status": "string*",
          "provider": "string",
          "category": "string",
          "payment_method_type": "string*",
          "description": "string*",
          "reject_reason": "string",
          "additional_data": { ... },
          "created_at": "string (YYYY-MM-DD HH:MM:SS)"
        }
      ],
      "customer_payer": {
        "name": "string*",
        "phone_number": "string*",
        "phone_country_code": "string*",
        "additional_data": { ... }
      }
    }
    // ... more external_data objects
  ]
}

 
```

## Root Object Fields

* `organization_code` (string): Unique code that identifies the organization.\
  **Example**: `"e4c03f29-b0f6-403a-8814-9aee1a88d60e"`

* `external_data` (array): An array of objects, where each object contains the information of a declined payment along with its associated transactions and customer information.

### `external_data` Object Fields

> **Note**: Fields marked with an asterisk (`*`) are mandatory.

Each object within the `external_data` array contains the following structure:

### `payment` Object Fields

* `organization_code` (string\*): Unique code that identifies the organization (duplicated from the root object for consistency).\
  **Example**: `"e4c03f29-b0f6-403a-8814-9aee1a88d60e"`

* `id` (string\*): Unique identifier of the declined payment.\
  **Example**: `"553855156"`

* `code` (string): Internal code or reference of the payment.\
  **Example**: `"f1fbad16-93c1-4335-b735-2b01ec94ea9e"`

* `order_id` (string\*): Identifier of the order associated with the payment.\
  **Example**: `"MX_Verification_50708779"`

* `country` (string\*): Code of the country where the payment was made (ISO 3166-1 alpha-2).\
  **Example**: `"MX"`

* `status` (string\*): Current status of the payment.\
  **Example**: `"DECLINED"`

* `sub_status` (string): Sub-status of the payment, provides more detailed information.\
  **Example**: `"DECLINED"`

* `description` (string\*): Description of the payment.\
  **Example**: `"rappi referencia MX Verification 50708779"`

* `amount_value` (number\*): Amount value of the payment.\
  **Example**: `23.79`

* `currency_code` (string\*): Currency code of the payment (ISO 4217).\
  **Example**: `"MXN"`

* `reject_reason` (string\*): Main reason why the payment was rejected.\
  **Example**: `"invalid cvv"`

* `additional_data` (object): JSON object for additional data related to the payment.\
  **Example**: `"fraud_score": 0.85`, `"ip_address": "192.168.1.1"`

* `created_at` (string): Date and time of the transaction record creation in `YYYY-MM-DD HH:MM:SS` format.\
  **Example**: `"2025-04-10 15:05:52"`

### `transactions` (array)

An array of objects representing the transactions associated with the declined payment. This array can be empty if there are no detailed transactions available.

#### Transaction Object Fields

* `id` (string\*): Unique identifier of the transaction.\
  **Example**: `"603948738"`

* `card` (object): Object that contains information about the card used in the transaction.

##### Card Object Fields

* `id` (integer): Unique identifier of the card.\
  **Example**: `458342406`

* `card_iin` (string): Issuer Identification Number of the card (first digits).\
  **Example**: `"63631818"`

* `card_lfd` (string): Last digits of the card.\
  **Example**: `"2671"`

* `card_type` (string): Type of card (e.g., `"CREDIT"`, `"DEBIT"`).\
  **Example**: `"CREDIT"`

* `issuer_name` (string): Name of the card issuer.\
  **Example**: `"SCOTIABANK"`

* `transaction_id` (integer): Identifier of the transaction associated with the card.\
  **Example**: `603948738`

* `card_expiration_year` (integer): Year of card expiration.\
  **Example**: `2030`

* `card_expiration_month` (integer): Month of card expiration.\
  **Example**: `12`

#### Additional Transaction Fields

* `code` (string): Internal code or reference of the transaction.\
  **Example**: `"2e9083ec-6f1d-43d1-8677-abc36b2063a6"`

* `type` (string): Type of transaction (e.g., `"PURCHASE"`, `"AUTHORIZATION"`).\
  **Example**: `"PURCHASE"`

* `amount` (number\*): Transaction amount.\
  **Example**: `23.79`

* `status` (string\*): Transaction status.\
  **Example**: `"DECLINED"`

* `provider` (string): Transaction provider (e.g., `"STRIPE"`, `"ADYEN"`).\
  **Example**: `"STRIPE"`

* `category` (string): Transaction category (e.g., `"CARD"`, `"PSE"`).\
  **Example**: `"CARD"`

* `payment_method_type` (string\*): Type of payment method used (e.g., `"CARD"`, `"BANK_TRANSFER"`).\
  **Example**: `"CARD"`

* `description` (string\*): Transaction description.\
  **Example**: `"order from restaurants"`

* `reject_reason` (string): Reason why the transaction was rejected.\
  **Example**: `"invalid cvv"`

* `additional_data` (object): JSON object for additional data related to the transaction.\
  **Example**:`"acquirer_reference": "123456"`, `"eci": "05"`

* `created_at` (string): Date and time of the transaction record creation in `YYYY-MM-DD HH:MM:SS` format.\
  **Example**: `"2025-04-10 15:05:52"`

### `customer_payer` (object)

Object that contains information about the customer who made the payment.

#### Fields

* `name` (string\*): Full name of the customer.\
  **Example**: `"LUCY ROBLES"`

* `phone_number` (string\*): Customer phone number.\
  **Example**: `"3183497646"`

* `phone_country_code` (string\*): Country code of the phone number.\
  **Example**: `"57"`

* `additional_data` (object): JSON object for additional data related to the customer.\
  **Example**: `"email": "lucy.robles@example.com"`, `"customer_id": "cust_123"`

## Request Examples (Mocked Code)

Here are two examples of what the JSON request body could look like:

```json
{
  "organization_code": "e4c03f29-b0f6-403a-8814-9aee1a88d60e",
  "external_data": [
```

### **Minimalist request example:**

```json
{
  "payment": {
    "organization_code": "e4c03f29-b0f6-403a-8814-9aee1a88d60e",
    "id": "987654321",
    "order_id": "SIMPLE_ORDER_123",
    "country": "CO",
    "status": "DECLINED",
    "description": "Pago simple declinado",
    "amount_value": 10.00,
    "currency_code": "COP",
    "reject_reason": "insufficient funds"
  },
  "customer_payer": {
    "name": "JUAN PEREZ",
    "phone_number": "3101234567",
    "phone_country_code": "57"
  }
}

 
```

### **Detailed request example:**

```json
{
  "organization_code": "f9a2b7d1-c8e5-4b19-a302-5dff6e7789ab",
  "external_data": [
    {
      "payment": {
        "organization_code": "f9a2b7d1-c8e5-4b19-a302-5dff6e7789ab",
        "id": "123456789",
        "code": "txn-abc-456",
        "order_id": "FULL_ORDER_789",
        "country": "US",
        "status": "DECLINED",
        "sub_status": "CARD_EXPIRED",
        "description": "Compra de electrónicos",
        "amount_value": 199.99,
        "currency_code": "USD",
        "reject_reason": "expired card",
        "additional_data": {
          "attempts": 3,
          "error_code": "4002"
        },
        "created_at": "2025-04-10 16:30:00"
      },
      "transactions": [
        {
          "id": "trans-xyz-789",
          "card": {
            "id": 11223344,
            "card_iin": "411111",
            "card_lfd": "1234",
            "card_type": "VISA",
            "issuer_name": "VISA",
            "transaction_id": 99887766,
            "card_expiration_year": 2026,
            "card_expiration_month": 6
          },
          "code": "auth-987",
          "type": "AUTHORIZATION",
          "amount": 199.99,
          "status": "DECLINED",
          "provider": "PROCESSOR_X",
          "category": "CARD",
          "payment_method_type": "CARD",
          "description": "Autorización de compra",
          "reject_reason": "expired card",
          "additional_data": {
            "authorization_code": null,
            "network_response_code": "05"
          },
          "created_at": "2025-04-10 16:29:55"
        }
      ],
      "customer_payer": {
        "name": "JOHN DOE",
        "phone_number": "5551234567",
        "phone_country_code": "1",
        "additional_data": {
          "email": "john.doe@example.com",
          "address": "123 Main St"
        }
      }
    }
  ]
}

 
```
