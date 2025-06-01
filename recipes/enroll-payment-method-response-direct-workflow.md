---
title: Enroll Payment Method Response (Direct Workflow)
description: Recipe Description
hidden: false
recipe:
  color: '#018FF4'
  icon: 🦉
---
```json JSON
{
  "idempotency_key": "b3447c35-588a-4d39-8517-9929ee591cda",
  "name": "VISA ****0000",
  "description": "VISA ****0000",
  "type": "CARD",
  "category": "CARD",
  "country": "US",
  "status": "ENROLLED",
  "sub_status": null,
  "vaulted_token": "9c298b36-b005-42ed-92e1-808b2a785e5f",
  "callback_url": null,
  "action": "FORM",
  "redirect_url": null,
  "created_at": "2023-09-04T16:37:55.314018Z",
  "updated_at": "2023-09-04T16:37:55.314019Z",
  "card_data": {
    "iin": "49880800",
    "lfd": "0000",
    "expiration_month": 3,
    "expiration_year": 30,
    "number_length": 16,
    "security_code_length": 3,
    "brand": "VISA",
    "issuer": null,
    "issuer_code": null,
    "category": "BUSINESS ENHANCED",
    "type": "CREDIT"
  },
  "last_successfully_used": null,
  "last_successfully_used_at": null,
  "preferred": null,
  "verify": {
    "vault_on_success": true,
    "currency": "USD",
    "payment": {
      "id": "2ff3872a-9b62-412f-be3e-69689b184e5f",
      "account_id": "ad59c347-407c-4f11-841b-f3ac260cd018",
      "description": "VERIFY CARD",
      "country": "US",
      "status": "SUCCEEDED",
      "sub_status": "VERIFIED",
      "merchant_order_id": "VERIFY_CARD_9c298b36-b005-42ed-92e1-808b2a785e5f",
      "created_at": "2023-09-04T16:37:55.352948Z",
      "updated_at": "2023-09-04T16:37:56.429675Z",
      "amount": {
        "currency": "USD",
        "value": 0,
        "refunded": 0,
        "captured": 0
      },
      "transactions": [
        {
          "id": "1e501f45-583b-4187-b42e-8c3e620d1ef5",
          "type": "VERIFY",
          "status": "SUCCEEDED",
          "response_code": "SUCCEEDED",
          "response_message": "Transaction successful",
          "category": "CARD",
          "merchant_reference": "VERIFY_CARD_9c298b36-b005-42ed-92e1-808b2a785e5f",
          "provider_data": {
            "id": "ADYEN",
            "transaction_id": "SKCN8ZR5S8NKGK82",
            "account_id": "",
            "status": "Cancelled",
            "sub_status": "",
            "status_detail": "",
            "response_message": "",
            "raw_response": {
              "additionalData": {
                "threeds2.cardEnrolled": "false"
              },
              "merchantReference": "VERIFY_CARD_9c298b36-b005-42ed-92e1-808b2a785e5f",
              "pspReference": "SKCN8ZR5S8NKGK82",
              "refusalReason": "FRAUD-CANCELLED",
              "refusalReasonCode": "22",
              "resultCode": "Cancelled"
            },
            "third_party_transaction_id": null
          },
          "created_at": "2023-09-04T16:37:55.482510Z",
          "updated_at": "2023-09-04T16:37:56.348742Z"
        }
      ]
    }
  }
}
```

# Response JSON

<!-- json@1-16,29-32 -->

<li><b>idempotency_key</b> (<code>string</code>): The unique identifier for idempotency (MAX 36).</li>
<li><b>name</b> (<code>string</code>): The payment method name (MAX 255; MIN 3).</li>
<li><b>description</b> (<code>string</code>): The payment method description (MAX 255; MIN 3).</li>
<li><b>type</b> (<code>string</code>): The payment method type (MAX 255; MIN 3).</li>
<li><b>category</b> (<code>string</code>): The payment method category (MAX 255; MIN 3).</li>
<li><b>country</b> (<code>string</code>): The customer's country (MAX 2; MIN 2; <a href="https://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1</a>).</li>
<li><b>status</b> (<code>string</code>): The status of the payment method (MAX 255; MIN 5).</li>
<li><b>sub_status</b> (<code>null</code>): The sub-status of the payment method (MAX 255; MIN 3).</li>
<li><b>vaulted_token</b> (<code>string</code>): The vaulted token for the previously enrolled payment method (MAX 64; MIN 36).</li>
<li><b>callback_url</b> (<code>null</code>): URL to return the customer after an enrollment in a provider´s environment. Only necessary for alternative payment methods integrations (MAX: 64; MIN: 36).</li>
<li><b>action</b> (<code>string</code>): The action associated with the payment method (MAX 255; MIN 3).</li>
<li><b>redirect_url</b> (<code>null</code>): The redirect URL associated with the payment method.</li>
<li><b>created_at</b> (<code>timestamp</code>): Payment method creation date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</li>
<li><b>updated_at</b> (<code>timestamp</code>): Last payment method update date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</li>
<li><b>card_data</b> (<code>object</code>): Specifies the details of the card.</li>
<li><b>last_successfully_used</b> (<code>null</code>): Indicates if the enrolled payment method was the last successfully used by the customer.</li>
<li><b>last_successfully_used_at</b> (<code>null</code>): Indicates the date of the last succeeded payment if the enrolled payment method was the last successfully used by the customer.</li>
<li><b>preferred</b> (<code>null</code>): Indicates the preferred status of the payment method.</li>
<li><b>verify</b> (<code>object</code>): Indicates whether to verify the payment with a verify transaction or not. You’ll need to have a provider defined in your CARD route.</li>

# Card data object

<!-- json@16-28 -->

Specifies the details of the card:

<li><b>iin</b> (<code>integer</code>): The issuer identification number (IIN) refers to the first few digits of the payment card number issued by a financial institution (MAX 8; MIN 6).</li>
        <li><b>lfd</b> (<code>integer</code>): The last four digits of the card (MAX 4; MIN 4).</li>
        <li><b>expiration_month</b> (<code>integer</code>): The expiration month of the card (MAX 2; MIN 2) - only available for PCI certified merchants.</li>
        <li><b>expiration_year</b> (<code>integer</code>): The expiration year of the card (MAX 2; MIN 2) - only available for PCI certified merchants.</li>
        <li><b>number_length</b> (<code>integer</code>): The length of the card's number (MAX 16; MIN 8).</li>
        <li><b>security_code_length</b> (<code>integer</code>): The length of the card's security code (MAX 3; MIN 3).</li>
        <li><b>brand</b> (<code>string</code>): The card's brand information (MAX 255; MIN 3).</li>
        <li><b>issuer</b> (<code>null</code>): The card's issuer (MAX 255; MIN 3).</li>
        <li><b>issuer_code</b> (<code>null</code>): The issuer code of the card (MAX 255; MIN 3).</li>
        <li><b>category</b> (<code>string</code>): The category of the card's issuer (MAX 255; MIN 3).</li>
        <li><b>type</b> (<code>string</code>): The type of the card's issuer (MAX 255; MIN 3).</li>

# Verify object

<!-- json@32-35 -->

Indicates whether to verify the payment with a verify transaction or not. You’ll need to have a provider defined in your CARD route.

<li><b>vault_on_success</b> (<code>boolean</code>): Indicates whether to vault the card on a successful verify transaction.</li>
        <li><b>currency</b> (<code>string</code>): The currency for the verify transaction (MAX 3; MIN 3; <a href="https://en.wikipedia.org/wiki/ISO_4217">ISO 4217</a>).</li>
        
        <li><b>payment</b> (<code>object</code>): Specifies details about the verify transaction.</li>

# Payment object

<!-- json@35-45,50-51 -->

Specifies details about the verify transaction:

<li><b>id</b> (<code>string</code>): The unique identifier for the verify transaction (MAX 36).</li>
                <li><b>account_id</b> (<code>string</code>): The account identifier associated with the verify transaction (MAX 36).</li>
                <li><b>description</b> (<code>string</code>): The description of the verify transaction (MAX 255; MIN 3).</li>
                <li><b>country</b> (<code>string</code>): The customer's country for the verify transaction (MAX 2; MIN 2; <a href="https://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1</a>).</li>
                <li><b>status</b> (<code>string</code>): The status of the verify transaction (MAX 255; MIN 5).</li>
                <li><b>sub_status</b> (<code>string</code>): The sub-status of the verify transaction (MAX 255; MIN 3).</li>
                <li><b>merchant_order_id</b> (<code>string</code>): The merchant order identifier associated with the verify transaction (MAX 255; MIN 3).</li>
                <li><b>created_at</b> (<code>timestamp</code>): Verify transaction creation date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</li>
                <li><b>updated_at</b> (<code>timestamp</code>): Last verify transaction update date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</li>
                
                <li><b>amount</b> (<code>object</code>): Specifies details about the amount of the verify transaction.</li>
<li><b>transactions</b> (<code>array</code>): Array of transactions associated with the verify transaction.</li>

# Amount object

<!-- json@45-50 -->

Specifies details about the amount of the verify transaction:

<li><b>currency</b> (<code>string</code>): The currency for the amount (MAX 3; MIN 3; <a href="https://en.wikipedia.org/wiki/ISO_4217">ISO 4217</a>).</li>
                        <li><b>value</b> (<code>integer</code>): The value of the amount.</li>
                        <li><b>refunded</b> (<code>integer</code>): The refunded amount.</li>
                        <li><b>captured</b> (<code>integer</code>): The captured amount.</li>

# Transactions array of objects

<!-- json@51-83 -->

Array of transactions associated with the verify transaction:

<ul>
                        <li><b>id</b> (<code>string</code>): The unique identifier for the transaction (MAX 36).</li>
                        <li><b>type</b> (<code>string</code>): The type of the transaction (MAX 255; MIN 3).</li>
                        <li><b>status</b> (<code>string</code>): The status of the transaction (MAX 255; MIN 5).</li>
                        <li><b>response_code</b> (<code>string</code>): The response code of the transaction (MAX 255; MIN 3).</li>
                        <li><b>response_message</b> (<code>string</code>): The response message of the transaction (MAX 255; MIN 3).</li>
                        <li><b>category</b> (<code>string</code>): The category of the transaction (MAX 255; MIN 3).</li>
                        <li><b>merchant_reference</b> (<code>string</code>): The merchant reference of the transaction (MAX 255; MIN 3).</li>
                        
                        <li><b>provider_data</b> (<code>object</code>): Specifies details about the provider data.
                            <ul>
                                <li><b>id</b> (<code>string</code>): The provider's unique identifier for the transaction (MAX 255; MIN 3).</li>
                                <li><b>transaction_id</b> (<code>string</code>): The provider's transaction identifier for the transaction (MAX 255; MIN 3).</li>
                                <li><b>account_id</b> (<code>string</code>): The provider's account identifier for the transaction (MAX 255; MIN 3).</li>
                                <li><b>status</b> (<code>string</code>): The status of the provider for the transaction (MAX 255; MIN 3).</li>
                                <li><b>sub_status</b> (<code>string</code>): The sub-status of the provider for the transaction (MAX 255; MIN 3).</li>
                                <li><b>status_detail</b> (<code>string</code>): The status detail of the provider for the transaction (MAX 255; MIN 3).</li>
                                <li><b>response_message</b> (<code>string</code>): The response message of the provider for the transaction (MAX 255; MIN 3).</li>
                                <li><b>raw_response</b> (<code>object</code>): The raw response from the provider for the transaction (MAX 255; MIN 3).</li>
                                <li><b>third_party_transaction_id</b> (<code>null</code>): The third-party transaction identifier for the transaction (MAX 255; MIN 3).</li>
                            </ul>
                        </li>
                        
                        <li><b>created_at</b> (<code>timestamp</code>): Transaction creation date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</li>
                        <li><b>updated_at</b> (<code>timestamp</code>): Last transaction update date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</li>
                    </ul>