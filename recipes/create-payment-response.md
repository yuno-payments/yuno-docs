---
title: Create Payment Response
description: Recipe Description
hidden: false
recipe:
  color: '#018FF4'
  icon: 🦉
---
```json JSON
{
  "id": "bc0489ba-80bf-4bb9-98c5-ff8dfbceebf9",
  "account_id": "64761a45-6e49-4ea5-a6ff-6b52030b92ac",
  "description": "SUCCESSFUL",
  "country": "US",
  "status": "SUCCEEDED",
  "sub_status": "APPROVED",
  "merchant_order_id": "Order_id",
  "created_at": "2023-07-12T18:51:49.437886Z",
  "updated_at": "2023-07-12T18:51:54.679410Z",
  "amount": {
    "currency": "USD",
    "value": 20000,
    "refunded": 0,
    "captured": 0
  },
  "checkout": {
    "session": "",
    "sdk_action_required": false
  },
  "payment_method": {
    "vaulted_token": "",
    "type": "CARD",
    "vault_on_success": false,
    "token": "",
    "payment_method_detail": {
      "card": {
        "verify": null,
        "capture": true,
        "installments": 1,
        "first_installment_deferral": 0,
        "installments_type": "",
        "installment_amount": null,
        "soft_descriptor": "",
        "authorization_code": "517862",
        "retrieval_reference_number": "",
        "voucher": null,
        "card_data": {
          "holder_name": "JOHN DOE",
          "iin": "41111111",
          "lfd": "1111",
          "number_length": 16,
          "security_code_length": 3,
          "brand": "VISA",
          "issuer_name": "JPMORGAN_CHASE_BANK_NA",
          "issuer_code": "US_JPMORGAN_CHASE_BANK_NA",
          "category": null,
          "type": "CREDIT",
          "three_d_secure": {
            "token": null,
            "collect_url": null,
            "setup_reference_id": null,
            "developer_id": null,
            "solution_id": null,
            "code": null,
            "version": null,
            "electronic_commerce_indicator": null,
            "cryptogram": null,
            "transaction_id": null,
            "acs_id": null,
            "ds_id": null,
            "pares_status": null
          }
        }
      }
    }
  },
  "customer_payer": {
    "id": "a76d79b7-902f-4152-922f-7e7eebc5f3dc",
    "merchant_customer_id": "1309",
    "first_name": "JOHN",
    "last_name": "DOE",
    "gender": "M",
    "date_of_birth": "1990-02-28",
    "email": "test@test.com",
    "nationality": "US",
    "ip_address": null,
    "device_fingerprint": null,
    "browser_info": {
      "user_agent": "string",
      "accept_header": "string",
      "accept_content": null,
      "accept_browser": null,
      "color_depth": "32",
      "screen_height": "32",
      "screen_width": "32",
      "javascript_enabled": true,
      "java_enabled": null,
      "browser_time_difference": null,
      "language": "string"
    },
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
    }
  },
  "additional_data": {
    "airline": {
      "pnr": "ABC123",
      "legs": [
        {
          "departure_airport": "JFK",
          "departure_datetime": "2024-07-03T05:00:00",
          "departure_airport_timezone": "GMT-05",
          "arrival_airport": "LAX",
          "arrival_datetime": "",
          "carrier_code": "AA",
          "flight_number": "AA100",
          "fare_basis_code": "Y",
          "fare_class_code": "S",
          "base_fare": 300,
          "base_fare_currency": "USD",
          "stopover_code": "O"
        }
      ],
      "passengers": [
        {
          "first_name": "JOHN",
          "last_name": "DOE",
          "middle_name": "STEPHEN",
          "type": "A",
          "date_of_birth": "1998-01-01",
          "nationality": "US",
          "document": {
            "document_type": "SSN",
            "document_number": "123-45-6789"
          },
          "country": null,
          "loyalty_number": "79250001",
          "loyalty_tier": "DIAMOND",
          "email": "john.doe@company.com",
          "phone": {
            "number": "5559876543",
            "country_code": "1"
          }
        }
      ],
      "ticket": null,
      "tickets": [
        {
          "ticket_number": "BRB0001",
          "e_ticket": true,
          "restricted": false,
          "total_fare_amount": 300,
          "total_tax_amount": 40,
          "total_fee_amount": 10,
          "issue": {
            "carrier_prefix_code": "AA",
            "travel_agent_code": "A104121",
            "travel_agent_name": "TRAVEL_AIR",
            "date": "2023-10-31T01:30:00.000-05:00",
            "address": "123 Main St",
            "city": "New York",
            "country": "US",
            "zip_code": "10001"
          }
        },
        {
          "ticket_number": "BRB0002",
          "e_ticket": true,
          "restricted": false,
          "total_fare_amount": 300,
          "total_tax_amount": 40,
          "total_fee_amount": 10,
          "issue": {
            "carrier_prefix_code": "AA",
            "travel_agent_code": "A104121",
            "travel_agent_name": "TRAVEL_AIR",
            "date": "2023-10-31T01:30:00.000-05:00",
            "address": "123 Main St",
            "city": "New York",
            "country": "US",
            "zip_code": "10001"
          }
        }
      ]
    },
    "order": {
      "fee_amount": 0,
      "shipping_amount": 0,
      "items": [
        {
          "id": "123AD",
          "name": "Skirt",
          "quantity": 1,
          "unit_amount": 50,
          "category": "Clothes",
          "brand": "XYZ",
          "sku_code": "8765432109",
          "manufacture_part_number": "XYZ123456"
        }
      ]
    },
    "seller_details": {
      "name": "John Doe",
      "email": "johndoe@business.com",
      "reference": "Seller",
      "website": "https://www.test.com/1231324",
      "industry": null,
      "country": "US",
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
      }
    }
  },
  "taxes": {
    "type": "SALES_TAX",
    "tax_base": 10000.0,
    "value": 2100.0,
    "percentage": 21.0
  },
  "transactions": {
    "id": "c718b8e9-2943-4fdf-9b3c-426cf44940fb",
    "type": "PURCHASE",
    "status": "SUCCEEDED",
    "category": "CARD",
    "amount": 20000,
    "provider_id": "DLOCAL",
    "payment_method": {
      "vaulted_token": "",
      "type": "CARD",
      "vault_on_success": false,
      "token": "",
      "detail": {
        "card": {
          "verify": null,
          "capture": true,
          "installments": 1,
          "first_installment_deferral": 0,
          "installments_type": "",
          "installment_amount": null,
          "soft_descriptor": "",
          "authorization_code": "517862",
          "retrieval_reference_number": "",
          "voucher": null,
          "card_data": {
            "holder_name": "JOHN DOE",
            "iin": "41111111",
            "lfd": "1111",
            "number_length": 16,
            "security_code_length": 3,
            "brand": "VISA",
            "issuer_name": "JPMORGAN_CHASE_BANK_NA",
            "issuer_code": "US_JPMORGAN_CHASE_BANK_NA",
            "category": null,
            "type": "CREDIT",
            "three_d_secure": {
              "token": null,
              "collect_url": null,
              "setup_reference_id": null,
              "developer_id": null,
              "solution_id": null,
              "code": null,
              "version": null,
              "electronic_commerce_indicator": null,
              "cryptogram": null,
              "transaction_id": null,
              "acs_id": null,
              "ds_id": null,
              "pares_status": null
            }
          }
        }
      }
    },
    "response_code": "SUCCEEDED",
    "response_message": "Transaction successful",
    "reason": null,
    "description": "SUCCESSFUL",
    "merchant_reference": null,
    "provider_data": {
      "id": "DLOCAL",
      "transaction_id": "T-385928-c64b755f-1318-4a4c-a963-cd39bcefdc42",
      "account_id": "",
      "status": "PAID",
      "sub_status": "",
      "status_detail": "200",
      "response_message": "The payment was paid.",
      "raw_response": {
        "value": "{\"id\":\"T-385928-c64b755f-1318-4a4c-a963-cd39bcefdc42\",\"amount\":20000,\"currency\":\"USD\",\"payment_method_id\":\"CARD\",\"payment_method_type\":\"CARD\",\"payment_method_flow\":\"DIRECT\",\"country\":\"US\",\"card\":{\"holder_name\":\"JOHN DOE\",\"expiration_month\":11,\"expiration_year\":2028,\"brand\":\"VISA\",\"last4\":\"1111\",\"installments\":1,\"installments_responsible\":\"customer\"},\"three_dsecure\":{},\"created_date\":\"2023-07-12T18:51:52.000+0000\",\"approved_date\":\"2023-07-12T18:51:54.000+0000\",\"status\":\"PAID\",\"status_detail\":\"The payment was paid.\",\"status_code\":\"200\",\"order_id\":\"c718b8e9-2943-4fdf-9b3c-426cf44940fb\",\"description\":\"SUCCESSFUL\",\"notification_url\":\"https://sandbox.y.uno/dlocal-webhook/v1/confirmations\",\"acquirer\":{\"authorization_code\":\"517862\"}}"
      },
      "third_party_transaction_id": ""
    },
    "three_d_secure_action_required": null,
    "created_at": "2023-07-12T18:51:51.908784Z",
    "updated_at": "2023-07-12T18:51:54.426087Z"
  },
  "split": [],
  "workflow": "DIRECT",
  "metadata": [
    {
      "key": "order_id",
      "value": "AA001"
    }
  ],
  "fraud_screening": [
    {
      "status": "SUCCEEDED",
      "transactions": {
        "id": "ft12",
        "type": "PRE_AUTH",
        "status": "SUCCEEDED",
        "response_code": "FRAUD_VERIFIED",
        "response_message": "Fraud approved",
        "provider_data": {
          "provider_id": "CLEARSALE",
          "transaction_id": "AA001234567",
          "status": "APM",
          "score": "0.7",
          "raw_response": "JSON"
        }
      },
      "created_at": "2022-05-09T20:46:54.786342Z",
      "updated_at": "2022-05-09T20:46:54.786342Z"
    }
  ],
  "payment_link_code": ""
}
```

```json Response Example
{"success":true}
```

# Response JSON

<!-- json@1-11,17,21,68,113,235,241,317-319,325,346-346 -->

<ul>
  <li><b>id</b> (<code>string</code>): The unique identifier of the customer (MAX 64 ; MIN 36).</li>
  <li><b>account_id</b> (<code>string</code>): The unique identifier of the account (MAX 64; MIN 36).</li>
  <li><b>description</b> (<code>string</code>): The description of the payment (MAX 255; MIN 3).</li>
  <li><b>country</b> (<code>enum</code>): Country where the transaction must be processed (MAX 2; MIN 2; <a
      href="country-reference">ISO 3166-1</a>).</li>
  <li><b>status</b> (<code>enum</code>): The status of the transaction.</li>
  <li><b>sub_status</b> (<code>enum</code>): It is a complement to the status information.</li>
  <li><b>merchant_order_id</b> (<code>string</code>): The unique identifier of the customer's order (MAX 255; MIN 3).
  </li>
  <li><b>created_at</b> (<code>timestamp</code>): The date and time when the payment was created (MAX 27; MIN 27; <a
      href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</li>
  <li><b>updated_at</b> (<code>timestamp</code>): The date and time of the last update for the payment (MAX 27; MIN 27;
    <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</li>
  <li><b>amount</b> (<code>object</code>): Specifies the payment amount object, with the value and currency.</li>
  <li><b>checkout</b> (<code>object</code>): Specifies the checkout object. This object is not mandatory for back to
    back
    payments. Required when
    <code>WORKFLOW</code> is defined as <code>CHECKOUT</code> or is not sent. Not required for <code>DIRECT</code>
    payments.
  </li>
  <li><b>payment_method</b> (<code>object</code>): Specifies the <code>payment_method</code> object.</li>
  <li><b>customer_payer</b> (<code>object</code>): Specifies customer object for payments.</li>
  <li><b>additional_data</b> (<code>object</code>): Specifies the additional_data object. This object is not mandatory.
    However, if you send this information, the payment experience will be enhanced for your user.</li>
  <li><b>taxes</b> (<code>object</code>): Specifies the order's tax object.</li>
  <li><b>transactions</b> (<code>object</code>): Specifies the transaction details associated with a payment.</li>
  <li><b>workflow</b> (<code>enum</code>): The payment workflow. Indicates whether the integration will use Yuno´s SDK
    or
    will be a back to back
    connection (Card implementation only available for PCI compliant merchants).
    <br /><small> Possible enum values:</small>
    <ul>
      <li><small><code>SDK_CHECKOUT</code>: Use Yuno SDK. </small></li>
      <li><small><code>DIRECT</code>: Back to back integration with provider info for custom payment
          experience.</small></li>
      <li><small><code>REDIRECT</code>: Back to back integration with provider redirection.</small></li>
    </ul>
  </li>
  <li><b>callback_url</b> (<code>string</code>): The URL where to redirect the customer after the payment. Only required
    for DIRECT integrations that have a redirection (MAX 526; MIN 3).</li>
  <li><b>metadata</b> (<code>array of objects</code>): Specifies a list of metadata objects. You can add up to 50
    metadata
    objects.</li>
  <li><b>fraud_screening</b> (<code>array of objects</code>): Provides information about the fraud scans used for the
    payment.</li>
</ul>

# Amount object

<!-- json@11-16 -->

Specifies the payment amount object, with the value and currency:

<ul>
  <li><b>currency</b> (<code>enum</code>): The currency used to make the payment (MAX 3; MIN 3; <a
      href="country-reference">ISO 4217</a>).</li>
  <li><b>value</b> (<code>number</code>): The payment amount (multiple of 0.0001).</li>
  <li><b>refunded</b> (<code>number</code>): The refund amount (multiple of 0.0001).</li>
  <li><b>captured</b> (<code>number</code>): The captured amount (multiple of 0.0001).</li>
</ul>

# Checkout object

<!-- json@17-20 -->

Specifies the checkout object. This object is not mandatory for back-to-back payments:

<ul>
  <li><b>session</b> (<code>string</code>): The checkout session has been created for the payment (MAX 64; MIN 36).</li>
<li><b>sdk_action_required</b> (<code>boolean</code>): Defines if the payment is asynchronous and requires additional
  steps based on a request to the SDK.</li>
</ul>

# Payment methods object

<!-- json@21-67 -->

Specifies the <code>payment_method </code> object:

<ul>
  <li><b>vaulted_token</b> (<code>string</code>): The vaulted_token represents a securely stored payment_method
    associated
    with a previous transaction. When utilizing a vaulted_token for creating a payment, there is no need to send an
    additional token; it can be set as null (MAX: 64; MIN: 36).</li>
  <li><b>type</b> (<code>enum</code>): Payment method type. Mandatory for <code>DIRECT</code> or <code>REDIRECT</code>
    workflow.
    <br />Possible enum values: check the <a href="payment-type-list">payment type reference</a>.
  </li>
  <li><b>vault_on_success</b> (<code>boolean</code>): Flag to enroll the card after a successful payment.
    <br />Possible values: <code>True</code> or <code>False</code>
  </li>
  <li><b>token</b> (<code>string</code>): The one-time use payment method token <b>provided by Yuno sdk</b>. If a
    payment
    is created using a token, it is not necessary to send a vaulted_token as well; it can be defined as null (MAX: 64;
    MIN: 36).</li>
  <li>
    <details>
      <summary>
        <b>payment_method_detail</b> (<code>object</code>): Specifies the payment method detail object, which provides
        details of the different transaction category types that are part of the payment method object.
      </summary>
      <ul>
        <li>
          <details>
            <summary>
              <b>card</b> (<code>object</code>): Specifies the details of the payment method when using a card.
            </summary>
            <ul>
              <li><b>verify</b> (<code>boolean</code>): Using amount = 0 and verify = true, you can verify the user's card without authorizing a real amount.</li>
              <li><b>capture</b> (<code>boolean</code>): Decides whether to authorize the payment or capture it. Authorizing a card payment allows you to reserve funds in a customer's bank account.</li>
              <li><b>installments</b> (<code>integer</code>): The card installments (MAX 50; MIN 1).</li>
              <li><b>first_installments_deferral</b> (<code>integer</code>): Number of months to wait to debit the first installment.</li>
              <li><b>installments_type</b> (<code>string</code>): Defines the type of installments.</li>
              <li><b>installments_amount</b> (<code>integer</code>): The installment amount includes interests associated with the installment, and the information is defined by the provider.</li>
              <li><b>soft_descriptor</b> (<code>string</code>): The descriptor passed per transaction to our platform. It will be presented on the customer's physical bank statement (MAX 15; MIN 0).</li>
              <li><b>authorization_code</b> (<code>string</code>): The acquirer's response code.</li>
              <li><b>retrieval_reference_number</b> (<code>string</code>): The unique identifier assigned by an acquirer to an authorization.</li>
              <li><b>voucher</b> (<code>string</code>): The unique identifier of the payment receipt assigned by the issuing bank for a card transaction. This field is empty if the gateway does not provide information about the transaction (MAX 255; MIN 3).</li>
              <li>
                <details>
                  <summary>
                    <b>card_data</b> (<code>object</code>): Specifies the details of the card.
                  </summary>
                  <ul>
                    <li><b>holder_name</b> (<code>string</code>): Card holder's full name as it appears on the card (MAX 26; MIN 3) - only available for PCI certified merchants.</li>
                    <li><b>iin</b> (<code>string</code>): The issuer identification number (IIN) refers to the first few digits of the payment card number issued by a financial institution (MAX 8; MIN 6).</li>
                    <li><b>lfd</b> (<code>string</code>): The last four digits of the card (MAX 4; MIN 4).</li>
                    <li><b>number_length</b> (<code>integer</code>): The length of the card's number (MAX 19; MIN 8).</li>
                    <li><b>security_code_length</b> (<code>integer</code>): The length of the card's security code (MAX 1; MIN 1).</li>
                    <li><b>brand</b> (<code>string</code>): The card's brand information (MAX 255; MIN 3).</li>
                    <li><b>issuer_name</b> (<code>string</code>): The card's issuer (MAX 255; MIN 3).</li>
                    <li><b>issuer_code</b> (<code>integer</code>): The card's issuer identification code (MAX 255; MIN 3).</li>
                    <li><b>category</b> (<code>string</code>): The category of the card's issuer (MAX 255; MIN 3).</li>
                    <li><b>type</b> (<code>string</code>): The type of the card's issuer (MAX 255; MIN 3).</li>
                  </ul>
                </details>
                <details>
                  <summary>
                    <b>three_d_secure</b> (<code>object</code>): Specifies the details of the 3DS Transaction.
                  </summary>
                  <ul>
                    <li><b>three_d_secure_setup_id</b> (<code>string</code>): Setup ID obtained for the 3DS Direct flow.</li>
                    <li><b>version</b> (<code>enum</code>): Refers to the protocol version of the EMV 3-D Secure specification used. 1.0, 2.0, 2.1.0, 2.2.0, 2.2.1.</li>
                    <li><b>electronic_commerce_indicator</b> (<code>string</code>): This field must be completed with the result of the <a href="eci-indicators-list">ECI</a> field provided by the 3d Secure service. The Electronic Commerce Indicator (ECI) informs the card issuer if the transaction was protected by a security protocol like VbV or MCSC. It is mandated by Visa and MasterCard that all 3-D Secure transactions have this value populated in the authorization request. (MAX: 2, MIN: 0).</li>
                    <li><b>cryptogram</b> (<code>string</code>): This field must be completed with the result of the cryptogram field provided by the 3DSecure service. In Visa transactions, it represents the Cardholder Authentication Verification Value (CAVV), a cryptographic value generated by the Issuer as evidence of payment authentication during an online purchase to qualify for chargeback protection. MasterCard transactions have a similar value called Account holder Authentication Value (AAV) or the Universal Cardholder Authentication Field (UCAF). When submitting a transaction for authorization, the merchant must include the CAVV or AAV/UCAF to demonstrate that the cardholder has been authenticated. It is typically base64-encoded. (MAX: 40, MIN: 0).</li>
                    <li><b>transaction_id</b> (<code>string</code>): For 3DS v1: This is the Unique Transaction Identifier. It is automatically generated by the MPI. It is typically 28 bytes in length and base64-encoded. Is commonly referred to as XID. (MAX: 40, MIN: 0). For 3DS v2: Universally unique transaction identifier assigned by the DS to identify a single transaction. (MAX: 36, MIN:36).</li>
                    <li><b>directory_server_transaction_id</b> (<code>string</code>): Transaction ID generated by the Mastercard directory server during authentication (MAX 255; MIN 3).</li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>
              <b>bnpl</b> (<code>object</code>): Specifies the details of the payment method when using Buy Now Pay Later (BNPL).
            </summary>
            <ul>
              <li><b>installments</b> (<code>integer</code>): The loan installments (MAX 50; MIN 1).</li>
              <li><b>provider_image</b> (<code>string</code>): The provider's URL to their logo (MAX 255; MIN 3).</li>
              <li><b>redirect_url</b> (<code>string</code>): The URL with the full version of the ticket in case you want to redirect your customer (MAX 255; MIN 3).</li>
              <li>
                <details>
                  <summary>
                    <b>customer_data</b> (<code>object</code>): Specifies the details of the customer.
                  </summary>
                  <ul>
                    <li><b>name</b> (<code>string</code>): The customer's legal name (MAX 32, MIN 8).</li>
                    <li><b>username</b> (<code>string</code>): Customer's username in the provider platform (MAX 32, MIN 8).</li>
                    <li><b>tax_id_type</b> (<code>string</code>): The customer's tax identifier (MAX 32, MIN 8).</li>
                    <li><b>tax_id</b> (<code>string</code>): The customer's tax identifier number (MAX 32, MIN 8).</li>
                    <li><b>type</b> (<code>string</code>): The credit's type (MAX 255; MIN 3).</li>
                    <li><b>area</b> (<code>string</code>): The customer's industry (MAX 255; MIN 3).</li>
                    <li><b>role</b> (<code>string</code>): The customer's role in the company (MAX 255; MIN 3).</li>
                  </ul>
                </details>
            </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>
              <b>bank_transfer</b> (<code>object</code>): Specifies the details of the payment method when using bank transfer.
            </summary>
            <ul>
              <li><b>provider_image</b> (<code>string</code>): The provider's URL to their logo (MAX 255; MIN 3).</li>
              <li><b>account_type</b> (<code>string</code>): Type of the bank account (MAX 255; MIN 3).</li>
              <li><b>bank_name</b> (<code>string</code>): Name of the bank associated with the account (MAX 255; MIN 3).</li>
              <li><b>beneficiary_name</b> (<code>string</code>): The name of the account holder (MAX 255; MIN 3).</li>
              <li><b>bank_account</b> (<code>string</code>): The number of the bank account (MAX 255; MIN 3).</li>
              <li><b>bank_account_2</b> (<code>string</code>): The secondary number of the bank account (MAX 255; MIN 3).</li>
              <li><b>beneficiary_document_type</b> (<code>string</code>): Document type of the account holder (MAX 255; MIN 3).</li>
              <li><b>beneficiary_document</b> (<code>string</code>): Document number of the account holder (MAX 255; MIN 3).</li>
              <li><b>reference</b> (<code>string</code>): Reference code for the user (MAX 255; MIN 3).</li>
              <li><b>payment_instruction</b> (<code>string</code>): Payments instructions related to the payment (MAX 255; MIN 3).</li>
              <li><b>redirect_url</b> (<code>string</code>): The URL with the full version of the ticket in case you want to redirect your customer (MAX 255; MIN 3).</li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>
              <b>wallet</b> (<code>object</code>): Specifies the details of the payment method when using a wallet.
            </summary>
            <ul>
              <li><b>verify</b> (<code>boolean</code>): Using amount = 0 and verify = true, you can verify the user's card without authorizing a real amount. Possible values: <code>True</code> or <code>False</code></li>
              <li><b>capture</b> (<code>boolean</code>): Decides whether to authorize the payment or capture it. Authorizing a card payment allows you to reserve funds in a customer's bank account. Possible values: <code>True</code> or <code>False</code></li>
              <li><b>installments</b> (<code>integer</code>): The card installments (MAX 50; MIN 1).</li>
              <li><b>payment_method_id</b> (<code>string</code>): The user's payment method used in their wallet.</li>
              <li><b>payment_method_detail</b> (<code>string</code>): The payment method's detail used in their wallet.</li>
              <li><b>date_of_expiration</b> (<code>date</code>): Expiration date for an offline payment method.</li>
              <li><b>money_release_date</b> (<code>date</code>): Date in which the money from the provider will be available to use.</li>
              <li><b>sponsor_id</b> (<code>string</code>): Partner's provider account (MAX 255; MIN 3).</li>
              <li><b>authorization_code</b> (<code>string</code>): Acquirer's response code.</li>
              <li>
                <details>
                  <summary>
                    <b>customer_data</b> (<code>object</code>): Specifies the details of the customer.
                  </summary>
                  <ul>
                    <li><b>email</b> (<code>string</code>): The customer's email (MAX 255; MIN 3).</li>
                    <li><b>first_name</b> (<code>string</code>): The customer's first name (MAX 32, MIN 8).</li>
                    <li><b>last_name</b> (<code>string</code>): The customer's last name (MAX 32, MIN 8).</li>
                    <li><b>username</b> (<code>string</code>): The customer's username in the platform (MAX 32, MIN 8).</li>
                    <li><b>identification_type</b> (<code>string</code>): The customer's document type. Check the <a href="country-reference">Country reference</a>.</li>
                    <li><b>identification_number</b> (<code>string</code>): The customer's identification number (MAX 32, MIN 8).</li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <b>fee_details</b> (<code>object</code>): Specifies the details of the fees.
                  </summary>
                  <ul>
                    <li><b>amount</b> (<code>float</code>): Amount of the transaction (multiple of 0.0001).</li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <b>card_data</b> (<code>object</code>): Specifies the details of the card.
                  </summary>
                  <ul>
                    <li><b>iin</b> (<code>integer</code>): The issuer identification number (IIN) refers to the first few digits of the payment card number issued by a financial institution (MAX 8; MIN 6).</li>
                    <li><b>lfd</b> (<code>integer</code>): The last four digits of the card (MAX 4; MIN 4).</li>
                    <li><b>number_length</b> (<code>integer</code>): The length of the card's number (MAX 2; MIN 1).</li>
                    <li><b>security_code_length</b> (<code>integer</code>): The length of the card's security code (MAX 1; MIN 1).</li>
                    <li><b>brand</b> (<code>string</code>): The card's brand information (MAX 255; MIN 3).</li>
                    <li><b>holder_name</b> (<code>string</code>): Card holder's full name as it appears on the card (MAX 26; MIN 3) - only available for PCI certified merchants.</li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>
              <b>ticket</b> (<code>object</code>): Specifies the details of the payment method when using ticket.
            </summary>
            <ul>
              <li><b>type</b> (<code>string</code>): The ticket's type.</li>
              <li><b>date_of_expiration</b> (<code>date</code>): The ticket's expiration date in YYYY-MM-DD.</li>
              <li><b>provider_number</b> (<code>integer</code>): The ticket's number.</li>
              <li><b>provider_barcode</b> (<code>integer</code>): The ticket's barcode.</li>
              <li><b>provider_logo</b> (<code>string</code>): The ticket's logo.</li>
              <li><b>provider_format</b> (<code>string</code>): The ticket's format.</li>
              <li><b>payment_instruction</b> (<code>string</code>): Payments instructions related to the payment (MAX 255; MIN 3).</li>
              <li><b>redirect_url</b> (<code>string</code>): The URL with the full version of the ticket.</li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>
              <b>payment_link</b> (<code>object</code>): Specifies the details of the payment method when using a payment link.
            </summary>
            <ul>
              <li><b>verify</b> (<code>boolean</code>): Using amount = 0 and verify = true, you can verify the user's card without authorizing a real amount. Possible values: <code>True</code> or <code>False</code></li>
              <li><b>capture</b> (<code>boolean</code>): Decides whether to authorize the payment or capture it. Authorizing a card payment allows you to reserve funds in a customer's bank account. Possible values: <code>True</code> or <code>False</code></li>
              <li><b>installments</b> (<code>integer</code>): The card installments (MAX 50; MIN 1).</li>
              <li><b>payment_method_id</b> (<code>string</code>): The user's payment method used in their wallet.</li>
              <li><b>payment_method_detail</b> (<code>string</code>): The payment method's detail used in their wallet.</li>
              <li><b>date_of_expiration</b> (<code>date</code>): Expiration date for an offline payment method.</li>
              <li><b>money_release_date</b> (<code>date</code>): Date in which the money from the provider will be available to use.</li>
              <li><b>sponsor_id</b> (<code>string</code>): Partner's provider account (MAX 255; MIN 3).</li>
              <li><b>authorization_code</b> (<code>string</code>): Acquirer's response code.</li>
              <li>
                <details>
                  <summary>
                    <b>customer_data</b> (<code>object</code>): Specifies the details of the customer.
                  </summary>
                  <ul>
                    <li><b>email</b> (<code>string</code>): The customer's email (MAX 255; MIN 3).</li>
                    <li><b>first_name</b> (<code>string</code>): The customer's first name (MAX 32, MIN 8).</li>
                    <li><b>last_name</b> (<code>string</code>): The customer's last name (MAX 32, MIN 8).</li>
                    <li><b>username</b> (<code>string</code>): The customer's username in the platform (MAX 32, MIN 8).</li>
                    <li><b>identification_type</b> (<code>string</code>): The customer's document type. Check the <a href="country-reference">Country reference</a>.</li>
                    <li><b>identification_number</b> (<code>string</code>): The customer's identification number (MAX 32, MIN 8).</li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <b>fee_details</b> (<code>object</code>): Specifies the details of the fees.
                  </summary>
                  <ul>
                    <li><b>amount</b> (<code>float</code>): Amount of the transaction (multiple of 0.0001).</li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <b>card_data</b> (<code>object</code>): Specifies the details of the card.
                  </summary>
                  <ul>
                    <li><b>iin</b> (<code>integer</code>): The issuer identification number (IIN) refers to the first few digits of the payment card number issued by a financial institution (MAX 8; MIN 6).</li>
                    <li><b>lfd</b> (<code>integer</code>): The last four digits of the card (MAX 4; MIN 4).</li>
                    <li><b>number_length</b> (<code>integer</code>): The length of the card's number (MAX 2; MIN 1).</li>
                    <li><b>security_code_length</b> (<code>integer</code>): The length of the card's security code (MAX 1; MIN 1).</li>
                    <li><b>brand</b> (<code>string</code>): The card's brand information (MAX 255; MIN 3).</li>
                    <li><b>holder_name</b> (<code>string</code>): Card holder's full name as it appears on the card (MAX 26; MIN 3) - only available for PCI certified merchants.</li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </details>
  </li>
</ul>

# Customer payer object

<!-- json@68-112 -->

Specifies customer object for payments:

<ul>
  <li><b>id</b> (<code>string</code>): The unique identifier of the customer (MAX 64; MIN 36). Specifies the checkout object. This object is not mandatory for back-to-back payments. Required when WORKFLOW is defined as CHECKOUT or is not sent.</li>
  <li><b>merchant_customer_id</b> (<code>string</code>): The unique identifier of the customer in the external merchant (MAX 255; MIN 3).</li>
  <li><b>first_name</b> (<code>string</code>): The customer's first name (MAX 255; MIN 1).</li>
  <li><b>last_name</b> (<code>string</code>): The customer's last name (MAX 255; MIN 1).</li>
  <li><b>gender</b> (<code>enum</code>): The customer's gender (MAX 1; MIN 1; (M=Male/F=Female/NA=Not applicable/NK=Not Known)).
    <br />Possible enum values: <code>M</code>, <code>F</code>, <code>NA</code>, or <code>NK</code>.</li>
  <li><b>date_of_birth</b> (<code>string</code>): The customer's date of birth in the YYYY-MM-DD format (Length: 10).</li>
  <li><b>email</b> (<code>string</code>): The customer's e-mail (MAX 255; MIN 3).</li>
  <li><b>nationality</b> (<code>enum</code>): The customer's nationality (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
    <br />Possible enum values: Check the <a href="country-reference">Country reference</a>.</li>
  <li><b>device_fingerprint</b> (<code>string</code>): The customer's device fingerprint (MAX 4000; MIN 1). For integrations using Yuno checkout, the value is obtained automatically, do not send this field.</li>
  <li><b>ip_address</b> (<code>string</code>): The customer's IP address (MAX 45; MIN 7).</li>
  <li>
    <details>
      <summary><b>browser_info</b> (<code>object</code>): Specifies the browser_info object.</summary>
      <ul>
        <li><b>accept_header</b> (<code>boolean</code>): The accept header value of the customer's browser.
          <br />Possible values: <code>True</code> or <code>False</code></li>
        <li><b>color_depth</b> (<code>float</code>): The color depth of the customer's browser in bits per pixel. This should be obtained by using the browser's screen.colorDepth property. Accepted values: 1, 4, 8, 15, 16, 24, 30, 32 or 48 bit color depth. (MAX 5; MIN 1).</li>
        <li><b>javascript_enabled</b> (<code>boolean</code>): Indicates if Javascript is enabled or not in the device.
          <br />Possible values: <code>True</code> or <code>False</code></li>
        <li><b>language</b> (<code>string</code>): The navigator.language value of the customer's browser (as defined in IETF BCP 47) (MAX 5; MIN 1).</li>
        <li><b>screen_height</b> (<code>string</code>): The total height of the customer's device screen in pixels. (MAX 255; MIN 3).</li>
        <li><b>screen_width</b> (<code>string</code>): The total width of the customer's device screen in pixels. (MAX 255; MIN 3).</li>
        <li><b>user_agent</b> (<code>string</code>): The user agent value of the customer's browser (MAX 255; MIN 3).</li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary><b>document</b> (<code>object</code>): Specifies the customer's document object, including its number and type.</summary>
      <ul>
        <li><b>document_number</b> (<code>string</code>): The customer's document number (MAX 40; MIN 3).</li>
        <li><b>document_type</b> (<code>enum</code>): The customer's document type (MAX 6, MIN 2).
          <br />Possible enum values: Check the <a href="country-reference">Country reference</a>.</li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary><b>phone</b> (<code>object</code>): Specifies the customer's phone object, including number and code.</summary>
      <ul>
        <li><b>number</b> (<code>string</code>): The customer's phone number (MAX 40; MIN 3).</li>
        <li><b>country_code</b> (<code>string</code>): The country calling code of the customer's phone (MAX 3; MIN 1)
          <br />Possible values: Check the <a href="country-reference">Country reference</a>.</li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary><b>billing_address</b> (<code>object</code>): Specifies the customer's billing address object.</summary>
      <ul>
        <li><b>address_line_1</b> (<code>string</code>): The primary billing address line of the customer (MAX 255; MIN 3).</li>
        <li><b>address_line_2</b> (<code>string</code>): The secondary billing address line of the customer (MAX 255; MIN 3).</li>
        <li><b>city</b> (<code>string</code>): The city considered for the billing address (MAX 255; MIN 3).</li>
        <li><b>country</b> (<code>enum</code>): The country considered for the billing address (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
          <br />Possible enum values: Check the <a href="country-reference">Country reference</a>.</li>
        <li><b>state</b> (<code>string</code>): The state considered for the billing address (MAX 255; MIN 3).</li>
        <li><b>zip_code</b> (<code>string</code>): The zip code considered for the billing address (MAX 11; MIN 4).</li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary><b>shipping_address</b> (<code>object</code>): Specifies the customer's shipping address object.</summary>
      <ul>
        <li><b>address_line_1</b> (<code>string</code>): The primary shipping address line of the customer (MAX 255; MIN 3).</li>
        <li><b>address_line_2</b> (<code>string</code>): The secondary shipping address line of the customer (MAX 255; MIN 3).</li>
        <li><b>city</b> (<code>string</code>): The city considered for the shipping address (MAX 255; MIN 3).</li>
        <li><b>country</b> (<code>enum</code>): The country considered for the shipping address (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
          <br />Possible enum values: Check the <a href="country-reference">Country reference</a>.</li>
        <li><b>state</b> (<code>string</code>): The state considered for the shipping address (MAX 255; MIN 3).</li>
        <li><b>zip_code</b> (<code>string</code>): The zip code considered for the shipping address (MAX 11; MIN 4).</li>
      </ul>
    </details>
  </li>
</ul>

# Airline object

<!-- json@114-193 -->

Specifies the airline object. Passengers and tickets should have the same order information:

<ul>
  <li><b>pnr</b> (<code>string</code>): Passenger name record (MAX 10; MIN 1).<br /><small> Example: 1P-2UUGJW </small>
  </li>
  <li>
    <details>
      <summary>
        <b>legs</b> (<code>array of object</code>): Specifies the legs array of objects.
      </summary>
      <ul>
        <li><b>arrival_airport</b> (<code>string</code>): IATA airport code (MAX 3; MIN 3). See <a
            href="http://www.iata.org">http://www.iata.org</a>.<br /><small> Example: AMS </small></li>
        <li><b>base_fare</b> (<code>float</code>): The transaction amount, excluding taxes and fees, the smallest unit
          of currency (multiple of 0.0001).<br /><small> Example: 23.5676 </small></li>
        <li><b>base_fare_currency</b> (<code>string</code>): The currency used to transaction amount (MAX 3; MIN 3; <a
            href="country-reference">ISO 4217</a>).<br /><small> Example: Check the <a href="country-reference">Country
              reference</a>.</small></li>
        <li><b>carrier_code</b> (<code>string</code>): IATA carrier code (MAX 2; MIN 2). See <a
            href="http://www.iata.org">http://www.iata.org</a>.<br /><small> Example: KL </small></li>
        <li><b>departure_airport</b> (<code>string</code>): IATA code (MAX 3; MIN 3). See <a
            href="http://www.iata.org">http://www.iata.org</a>.<br /><small> Example: EZE </small></li>
        <li><b>departure_airport_timezone</b> (<code>string</code>): Airport timezone (MAX 6; MIN 6).<br /><small>
            Example: -03:00 </small></li>
        <li><b>departure_datetime</b> (<code>timestamp</code>): The departure date and time in local time at the
          departure airport.<br /><small> Example: 2024-07-03T05:00:00 </small></li>
        <li><b>fare_basis_code</b> (<code>string</code>): Code base rate provides specific information on the fare in
          addition to the class service, both required for booking (MAX 15; MIN 1).<br /><small> Example: HL7LNR
          </small></li>
        <li><b>fare_class_code</b> (<code>string</code>): The fare class code of the airline (MAX 1; MIN 1). The values
          can be a letter (A-Z) but may vary depending on the airline's definition. Check the Airline information
          reference.<br /><small> Example: Y </small></li>
        <li><b>flight_number</b> (<code>string</code>): The flight number assigned by the airline carrier (MAX 5; MIN
          1).<br /><small> Example: 842 </small></li>
        <li><b>stopover_code</b> (<code>string</code>): The stopover code (1-letter code that indicates whether the
          passenger is allowed to make a stopover. Only two types of characters are allowed: O: Stopover allowed (the
          letter “O”, not zero) / X: Stopover not allowed).<br /><small> Example: O </small></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary>
        <b>passengers</b> (<code>array of objects</code>): Specifies the array of objects that represents the passengers
        associated with the tickets.
      </summary>
      <ul>
        <li><b>country</b> (<code>enum</code>): Country where the document was issued (MAX 2; MIN 2; <a
            href="country-reference">ISO 3166-1</a>).<br /><small> Possible enum values: Check the <a
              href="country-reference">Country reference</a>.</small></li>
        <li><b>date_of_birth</b> (<code>string</code>): The passenger's date of birth in the YYYY-MM-DD format (MAX 10;
          MIN 10).<br /><small> Example: 1990-02-28 </small></li>
        <details>
          <summary>
            <b>document</b> (<code>object</code>): Specifies the document object for the passenger.
          </summary>
          <ul>
            <li><b>document_number</b> (<code>string</code>): The passenger's document number (MAX 40; MIN
              3).<br /><small> Example: 1093333333 </small></li>
            <li><b>document_type</b> (<code>enum</code>): The passenger's document type (MAX 6, MIN 2).<br /><small>
                Possible enum values: Check the <a href="country-reference">Country reference</a>. </small></li>
            <li><b>country</b> (<code>enum</code>): Country where the document was issued (MAX 2; MIN 2; <a
                href="country-reference">ISO 3166-1</a>).<br /><small> Possible enum values: Check the <a
                  href="country-reference">Country reference</a>. </small></li>
          </ul>
        </details>
        <details>
          <summary>
            <b>phone</b> (<code>object</code>): Specifies the phone object for the passenger.
          </summary>
          <ul>
            <li><b>country_code</b> (<code>string</code>): The country calling code of the passenger's phone (MAX 3; MIN
              1).<br /><small> Possible values: Check the <a href="country-reference">Country reference</a> </small>
            </li>
            <li><b>number</b> (<code>string</code>): The passenger's phone number, without the country code (MAX 32; MIN
              1).<br /><small> Example: 1130292837 </small></li>
          </ul>
        </details>
        <li><b>email</b> (<code>string</code>): The passenger's email (MAX 255; MIN 3).<br /><small> Example:
            John.Doe@gmail.com </small></li>
        <li><b>first_name</b> (<code>string</code>): The passenger's first name (MAX 255; MIN 3).<br /><small> Example:
            John </small></li>
        <li><b>last_name</b> (<code>string</code>): The passenger's last name (MAX 255; MIN 3).<br /><small> Example:
            Doe </small></li>
        <li><b>loyalty_number</b> (<code>string</code>): Number of passenger loyalty program (MAX 20, MIN
          1).<br /><small> Example: 254587547 </small></li>
        <li><b>loyalty_tier</b> (<code>enum</code>): Tier of passenger loyalty program (MAX 255; MIN 3).<br /><small>
            Possible enum values: Check the <a href="airline-information">Loyalty tier</a>.</small></li>
        <li><b>middle_name</b> (<code>string</code>): The passenger's middle name (MAX 255; MIN 3).<br /><small>
            Example: Charles </small></li>
        <li><b>nationality</b> (<code>enum</code>): The passenger's nationality (MAX 2; MIN 2; <a
            href="country-reference">ISO 3166-1</a>).<br /><small> Possible enum values: Check the <a
              href="country-reference">Country reference</a>.</small></li>
        <li><b>type</b> (<code>enum</code>): The type of passenger (MAX 1; MIN 1).<br /><small> Possible enum values:
            Check the <a href="airline-information">Passenger type list</a>.</small></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary>
        <b>tickets</b> (<code>array of objects</code>): Specifies the array of tickets associated with the passengers.
      </summary>
      <ul>
        <li><b>ticket_number</b> (<code>string</code>): Ticket number (MAX 14; MIN 1).<br /><small> Example:
            7411823255523 </small></li>
        <li><b>e_ticket</b> (<code>boolean</code>): Is this an e-ticket?<br /><small> Possible values: <code>True</code>
            or <code>False</code></small></li>
        <li><b>restricted</b> (<code>boolean</code>): Indicates if the ticket is refundable or not.<br /><small>
            Possible values: <code>True</code> or <code>False</code></small></li>
        <li><b>total_fare_amount</b> (<code>float</code>): Total fare amount in the smallest unit of currency (multiple
          of 0.0001).<br /><small> Example: 80000 </small></li>
        <li><b>total_tax_amount</b> (<code>float</code>): Total taxes amount in the smallest unit of currency (multiple
          of 0.0001).<br /><small> Example: 14800 </small></li>
        <li><b>total_fee_amount</b> (<code>float</code>): Total fee amount in the smallest unit of currency (multiple of
          0.0001).<br /><small> Example: 25200 </small></li>
        <details>
          <summary>
            <b>issue</b> (<code>object</code>): Specifies the issue object.
          </summary>
          <ul>
            <li><b>address</b> (<code>string</code>): Address of the agent who sold the ticket (MAX 255; MIN
              3).<br /><small> Example: Apartamento 502, Torre I </small></li>
            <li><b>zip_code</b> (<code>string</code>): Zip code of the agent who sold the ticket.<br /><small> Example:
                1636 </small></li>
            <li><b>carrier_prefix_code</b> (<code>string</code>): Issuing or Validating carrier. This is the AWB Prefix
              (Air waybill) IATA 3-numeric code (MAX 3; MIN 3).<br /><small> Example: 044 </small></li>
            <li><b>city</b> (<code>string</code>): City name of the agent who sold the ticket (MAX 255; MIN
              3).<br /><small> Example: Bogotá</small></li>
            <li><b>country</b> (<code>enum</code>): Country code where the ticket was issued (MAX 2; MIN 2; <a
                href="country-reference">ISO 3166-1</a>).<br /><small> Possible enum values: Check the <a
                  href="country-reference">Country code list</a>. </small></li>
            <li><b>date</b> (<code>string</code>): Ticket issuing date.<br /><small> Example: 1979-01-12 </small></li>
            <li><b>travel_agent_code</b> (<code>string</code>): Code of the travel agent issuing the
              ticket.<br /><small> Example: 10655823 </small></li>
            <li><b>travel_agent_name</b> (<code>string</code>): The name under which the point of sale appears on the
              agency list or franchise name (MAX 32; MIN 1).<br /><small> Example: ACME Agency Inc </small></li>
          </ul>
        </details>
      </ul>
    </details>
  </li>
</ul>

# Order object

<!-- json@194-209 -->

Specifies the order object:

<ul>
  <li><b>fee_amount</b> (<code>float</code>): The fee amount of the order (multiple of 0.0001).</li>
<li><b>shipping_amount</b> (<code>float</code>): The shipping amount of the order (multiple of 0.0001).</li>
<li>
  <details class="yuno">
    <summary>
        <b>items</b> (<code>array of object</code>): Specifies the item's object.
    </summary>
    <ul>
        <li><b>id</b> (<code>string</code>): The unique identifier of the item (MAX 255; MIN 3).</li>
        <li><b>name</b> (<code>string</code>): The name of the item (MAX 255; MIN 3).</li>
        <li><b>quantity</b> (<code>int</code>): The quantity of the item (MAX 999; MIN 1).</li>
        <li><b>unit_amount</b> (<code>float</code>): The unit amount of the item (multiple of 0.0001).</li>
        <li><b>category</b> (<code>string</code>): The category of the item (MAX 255; MIN 3).</li>
        <li><b>brand</b> (<code>string</code>): The brand of the item (MAX 255; MIN 3).</li>
        <li><b>sku_code</b> (<code>string</code>): The stock keeping unit (SKU) of the item (MAX 255; MIN 3).</li>
        <li><b>manufacture_part_number</b> (<code>string</code>): The manufacture part number of the item (MAX 255; MIN 3).</li>
    </ul>
</details>
</li>


</ul>

# Seller details object

<!-- json@210-232 -->

Specifies the seller's details object:

<ul>
  <li><b>name</b> (<code>string</code>): The seller's legal name (MAX 255; MIN 3).</li>
<li><b>email</b> (<code>string</code>): The seller's e-mail (MAX 255; MIN 3).</li>
<li><b>reference</b> (<code>string</code>): The seller's identification code (MAX 255; MIN 3).</li>
<li><b>website</b> (<code>string</code>): The seller's website URL (MAX 255; MIN 3).</li>
<li><b>industry</b> (<code>enum</code>): The seller's industry (MAX 255; MIN 3). Possible enum values: Check the <a href="industry-category-list">Industry category</a>.</li>
<li><b>country</b> (<code>enum</code>): The seller's country (MAX 255; MIN 3). Possible enum values: Check the <a href="country-reference">Country code list</a>.</li>
<li>
  <details class="yuno">
      <summary>
          <b>document</b> (<code>object</code>): Specifies the document object of the seller.
      </summary>
      <ul>
          <li><b>document_number</b> (<code>string</code>): The seller's document number (MAX 40; MIN 3).</li>
          <li><b>document_type</b> (<code>enum</code>): The seller's document type (MAX 6, MIN 2). Possible enum values: Check the <a href="country-reference">Country reference</a>.</li>
      </ul>
  </details>
</li>
<li>
  <details class="yuno">
      <summary>
          <b>phone</b> (<code>object</code>): Specifies the seller's phone number object.
      </summary>
      <ul>
          <li><b>country_code</b> (<code>string</code>): The country calling code of the seller's phone (MAX 3; MIN 1). Possible values: Check the <a href="country-reference">Country reference</a>.</li>
          <li><b>number</b> (<code>string</code>): The seller's phone number, without the country code (MAX 32; MIN 1).</li>
      </ul>
  </details>
</li>
<li>
  <details class="yuno">
      <summary>
          <b>address</b> (<code>object</code>): Specifies the seller's address object.
      </summary>
      <ul>
          <li><b>address_line_1</b> (<code>string</code>): The primary address line of the seller (MAX 255; MIN 3).</li>
          <li><b>address_line_2</b> (<code>string</code>): The secondary billing address line of the seller (MAX 255; MIN 3).</li>
          <li><b>city</b> (<code>string</code>): The city considered for the seller's address (MAX 255; MIN 3).</li>
          <li><b>country</b> (<code>enum</code>): The country considered for the seller's address (MAX 2; MIN 2,<a href='country-reference'>ISO 3166-1</a>). Possible enum values: Check the <a href="country-reference">Country code list</a>.</li>
          <li><b>state</b> (<code>string</code>): The state considered for the seller's address (MAX 255; MIN 3).</li>
          <li><b>zip_code</b> (<code>string</code>): The zipcode considered for the seller's address (MAX 11; MIN 4).</li>
      </ul>
  </details>
</li>

</ul>

# Taxes object

<!-- json@235-240 -->

Specifies the order's tax object:

<li><b>type</b> (<code>string</code>): Type of the tax.</li>
<li><b>tax_base</b> (<code>float</code>): The amount base to apply the tax defined.</li>
<li><b>value</b> (<code>float</code>): The amount of the tax.</li>
<li><b>percentage</b> (<code>float</code>): The percentage of the tax.</li>

# Transactions object

<!-- json@241-316 -->

Specifies the transaction details associated with a payment:

<ul>
  <li><b>id</b> (<code>string</code>): The unique identifier of the transaction (MAX 64; MIN 36).</li>
  <li><b>type</b> (<code>string</code>): The transaction type.</li>
  <li><b>status</b> (<code>enum</code>): The status of the transaction.</li>
  <li><b>category</b> (<code>string</code>): The category of the payment method used in the transaction.</li>
  <li><b>amount</b> (<code>string</code>): The amount of the transaction.</li>
  <li><b>provider_id</b> (<code>string</code>): The ID of the provider that processed the transaction.</li>
  <li>
    <details>
      <summary>
        <b>payment_method</b> (<code>object</code>): Specifies the payment method details used in the transaction.
      </summary>
      <ul>
        <li><b>vaulted_token</b> (<code>string</code>): The vaulted token for a <b>previously stored payment_method</b>. If a payment is created using a vaulted_token, it is not necessary to send a token as well, it can be defined as null (MAX: 64; MIN: 36).</li>
        <li><b>type</b> (<code>string</code>): Type of the payment method. Mandatory for <code>DIRECT</code> or <code>REDIRECT</code> workflow.<br /><small> Possible enum values: Check the <a href="payment-type-list">payment type reference</a>.</small></li>
        <li><b>vault_on_success</b> (<code>boolean</code>): Flag to enroll the card after a successful payment.<br /><small> Possible values: <code>True</code> or <code>False</code></small></li>
        <li><b>token</b> (<code>string</code>): The one-time-use payment method token <b>provided by Yuno sdk</b>. If a payment is created using a token, it is not necessary to send a vaulted_token as well, it can be defined as null. Not necessary for back-to-back payments (MAX: 64; MIN: 36).</li>
        <li>
          <details>
            <summary>
              <b>detail</b> (<code>object</code>): Specifies the payment method detail object, which provides details of the different transaction
              category types that are part of the payment method object.
            </summary>
            <ul>
              <li>
                <details>
                  <summary>
                    <b>card</b> (<code>object</code>): Specifies the details of the payment method when using a card.
                  </summary>
                  <ul>
                    <li><b>verify</b> (<code>boolean</code>): Using amount = 0 and verify = true, you can verify the user's card without authorizing a real amount.</li>
                    <li><b>capture</b> (<code>boolean</code>): Decides whether to authorize the payment or capture it. Authorizing a card payment allows you to reserve funds in a customer's bank account.</li>
                    <li><b>installments</b> (<code>integer</code>): The card installments (MAX 50; MIN 1).</li>
                    <li><b>first_installments_deferral</b> (<code>integer</code>): Number of months to wait to debit the first installment.</li>
                    <li><b>installments_type</b> (<code>string</code>): Defines the type of installments.</li>
                    <li><b>installments_amount</b> (<code>integer</code>): The installment amount includes interests associated with the installment, and the information is defined by the provider.</li>
                    <li><b>soft_descriptor</b> (<code>string</code>): The descriptor passed per transaction to our platform. It will be presented on the customer's physical bank statement (MAX 15; MIN 0).</li>
                    <li><b>authorization_code</b> (<code>string</code>): The acquirer's response code.</li>
                    <li><b>retrieval_reference_number</b> (<code>string</code>): The unique identifier assigned by an acquirer to an authorization.</li>
                    <li><b>voucher</b> (<code>string</code>): The unique identifier of the payment receipt assigned by the issuing bank for a card transaction. This field is empty if the gateway does not provide information about the transaction (MAX 255; MIN 3).</li>
                    <li>
                      <details>
                        <summary>
                          <b>card_data</b> (<code>object</code>): Specifies the details of the card.
                        </summary>
                        <ul>
                          <li><b>holder_name</b> (<code>string</code>): Card holder's full name as it appears on the card (MAX 26; MIN 3) - only available for PCI certified merchants.</li>
                          <li><b>iin</b> (<code>string</code>): The issuer identification number (IIN) refers to the first few digits of the payment card number issued by a financial institution (MAX 8; MIN 6).</li>
                          <li><b>lfd</b> (<code>string</code>): The last four digits of the card (MAX 4; MIN 4).</li>
                          <li><b>number_length</b> (<code>integer</code>): The length of the card's number (MAX 19; MIN 8).</li>
                          <li><b>security_code_length</b> (<code>integer</code>): The length of the card's security code (MAX 1; MIN 1).</li>
                          <li><b>brand</b> (<code>string</code>): The card's brand information (MAX 255; MIN 3).</li>
                          <li><b>issuer_name</b> (<code>string</code>): The card's issuer (MAX 255; MIN 3).</li>
                          <li><b>issuer_code</b> (<code>integer</code>): The card's issuer identification code (MAX 255; MIN 3).</li>
                          <li><b>category</b> (<code>string</code>): The category of the card's issuer (MAX 255; MIN 3).</li>
                          <li><b>type</b> (<code>string</code>): The type of the card's issuer (MAX 255; MIN 3).</li>
                        </ul>
                      </details>
                      <details>
                        <summary>
                          <b>three_d_secure</b> (<code>object</code>): Specifies the details of the 3DS Transaction.
                        </summary>
                        <ul>
                          <li><b>three_d_secure_setup_id</b> (<code>string</code>): Setup ID obtained for the 3DS Direct flow.</li>
                          <li><b>version</b> (<code>enum</code>): Refers to the protocol version of the EMV 3-D Secure specification used. 1.0, 2.0, 2.1.0, 2.2.0, 2.2.1.</li>
                          <li><b>electronic_commerce_indicator</b> (<code>string</code>): This field must be completed with the result of the <a href="eci-indicators-list">ECI</a> field provided by the 3d Secure service. The Electronic Commerce Indicator (ECI) informs the card issuer if the transaction was protected by a security protocol like VbV or MCSC. It is mandated by Visa and MasterCard that all 3-D Secure transactions have this value populated in the authorization request. (MAX: 2, MIN: 0).</li>
                          <li><b>cryptogram</b> (<code>string</code>): This field must be completed with the result of the cryptogram field provided by the 3DSecure service. In Visa transactions, it represents the Cardholder Authentication Verification Value (CAVV), a cryptographic value generated by the Issuer as evidence of payment authentication during an online purchase to qualify for chargeback protection. MasterCard transactions have a similar value called Account holder Authentication Value (AAV) or the Universal Cardholder Authentication Field (UCAF). When submitting a transaction for authorization, the merchant must include the CAVV or AAV/UCAF to demonstrate that the cardholder has been authenticated. It is typically base64-encoded. (MAX: 40, MIN: 0).</li>
                          <li><b>transaction_id</b> (<code>string</code>): For 3DS v1: This is the Unique Transaction Identifier. It is automatically generated by the MPI. It is typically 28 bytes in length and base64-encoded. Is commonly referred to as XID. (MAX: 40, MIN: 0). For 3DS v2: Universally unique transaction identifier assigned by the DS to identify a single transaction. (MAX: 36, MIN:36).</li>
                          <li><b>directory_server_transaction_id</b> (<code>string</code>): Transaction ID generated by the Mastercard directory server during authentication (MAX 255; MIN 3).</li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <b>bnpl</b> (<code>object</code>): Specifies the details of the payment method when using Buy Now Pay Later (BNPL).
                  </summary>
                  <ul>
                    <li><b>installments</b> (<code>integer</code>): The loan installments (MAX 50; MIN 1).</li>
                    <li><b>provider_image</b> (<code>string</code>): The provider's URL to their logo (MAX 255; MIN 3).</li>
                    <li><b>redirect_url</b> (<code>string</code>): The URL with the full version of the ticket in case you want to redirect your customer (MAX 255; MIN 3).</li>
                    <li>
                      <details>
                        <summary>
                          <b>customer_data</b> (<code>object</code>): Specifies the details of the customer.
                        </summary>
                        <ul>
                          <li><b>name</b> (<code>string</code>): The customer's legal name (MAX 32, MIN 8).</li>
                          <li><b>username</b> (<code>string</code>): Customer's username in the provider platform (MAX 32, MIN 8).</li>
                          <li><b>tax_id_type</b> (<code>string</code>): The customer's tax identifier (MAX 32, MIN 8).</li>
                          <li><b>tax_id</b> (<code>string</code>): The customer's tax identifier number (MAX 32, MIN 8).</li>
                          <li><b>type</b> (<code>string</code>): The credit's type (MAX 255; MIN 3).</li>
                          <li><b>area</b> (<code>string</code>): The customer's industry (MAX 255; MIN 3).</li>
                          <li><b>role</b> (<code>string</code>): The customer's role in the company (MAX 255; MIN 3).</li>
                        </ul>
                      </details>
                  </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <b>bank_transfer</b> (<code>object</code>): Specifies the details of the payment method when using bank transfer.
                  </summary>
                  <ul>
                    <li><b>provider_image</b> (<code>string</code>): The provider's URL to their logo (MAX 255; MIN 3).</li>
                    <li><b>account_type</b> (<code>string</code>): Type of the bank account (MAX 255; MIN 3).</li>
                    <li><b>bank_name</b> (<code>string</code>): Name of the bank associated with the account (MAX 255; MIN 3).</li>
                    <li><b>beneficiary_name</b> (<code>string</code>): The name of the account holder (MAX 255; MIN 3).</li>
                    <li><b>bank_account</b> (<code>string</code>): The number of the bank account (MAX 255; MIN 3).</li>
                    <li><b>bank_account_2</b> (<code>string</code>): The secondary number of the bank account (MAX 255; MIN 3).</li>
                    <li><b>beneficiary_document_type</b> (<code>string</code>): Document type of the account holder (MAX 255; MIN 3).</li>
                    <li><b>beneficiary_document</b> (<code>string</code>): Document number of the account holder (MAX 255; MIN 3).</li>
                    <li><b>reference</b> (<code>string</code>): Reference code for the user (MAX 255; MIN 3).</li>
                    <li><b>payment_instruction</b> (<code>string</code>): Payments instructions related to the payment (MAX 255; MIN 3).</li>
                    <li><b>redirect_url</b> (<code>string</code>): The URL with the full version of the ticket in case you want to redirect your customer (MAX 255; MIN 3).</li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <b>wallet</b> (<code>object</code>): Specifies the details of the payment method when using a wallet.
                  </summary>
                  <ul>
                    <li><b>verify</b> (<code>boolean</code>): Using amount = 0 and verify = true, you can verify the user's card without authorizing a real amount. Possible values: <code>True</code> or <code>False</code></li>
                    <li><b>capture</b> (<code>boolean</code>): Decides whether to authorize the payment or capture it. Authorizing a card payment allows you to reserve funds in a customer's bank account. Possible values: <code>True</code> or <code>False</code></li>
                    <li><b>installments</b> (<code>integer</code>): The card installments (MAX 50; MIN 1).</li>
                    <li><b>payment_method_id</b> (<code>string</code>): The user's payment method used in their wallet.</li>
                    <li><b>payment_method_detail</b> (<code>string</code>): The payment method's detail used in their wallet.</li>
                    <li><b>date_of_expiration</b> (<code>date</code>): Expiration date for an offline payment method.</li>
                    <li><b>money_release_date</b> (<code>date</code>): Date in which the money from the provider will be available to use.</li>
                    <li><b>sponsor_id</b> (<code>string</code>): Partner's provider account (MAX 255; MIN 3).</li>
                    <li><b>authorization_code</b> (<code>string</code>): Acquirer's response code.</li>
                    <li>
                      <details>
                        <summary>
                          <b>customer_data</b> (<code>object</code>): Specifies the details of the customer.
                        </summary>
                        <ul>
                          <li><b>email</b> (<code>string</code>): The customer's email (MAX 255; MIN 3).</li>
                          <li><b>first_name</b> (<code>string</code>): The customer's first name (MAX 32, MIN 8).</li>
                          <li><b>last_name</b> (<code>string</code>): The customer's last name (MAX 32, MIN 8).</li>
                          <li><b>username</b> (<code>string</code>): The customer's username in the platform (MAX 32, MIN 8).</li>
                          <li><b>identification_type</b> (<code>string</code>): The customer's document type. Check the <a href="country-reference">Country reference</a>.</li>
                          <li><b>identification_number</b> (<code>string</code>): The customer's identification number (MAX 32, MIN 8).</li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details>
                        <summary>
                          <b>fee_details</b> (<code>object</code>): Specifies the details of the fees.
                        </summary>
                        <ul>
                          <li><b>amount</b> (<code>float</code>): Amount of the transaction (multiple of 0.0001).</li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details>
                        <summary>
                          <b>card_data</b> (<code>object</code>): Specifies the details of the card.
                        </summary>
                        <ul>
                          <li><b>iin</b> (<code>integer</code>): The issuer identification number (IIN) refers to the first few digits of the payment card number issued by a financial institution (MAX 8; MIN 6).</li>
                          <li><b>lfd</b> (<code>integer</code>): The last four digits of the card (MAX 4; MIN 4).</li>
                          <li><b>number_length</b> (<code>integer</code>): The length of the card's number (MAX 2; MIN 1).</li>
                          <li><b>security_code_length</b> (<code>integer</code>): The length of the card's security code (MAX 1; MIN 1).</li>
                          <li><b>brand</b> (<code>string</code>): The card's brand information (MAX 255; MIN 3).</li>
                          <li><b>holder_name</b> (<code>string</code>): Card holder's full name as it appears on the card (MAX 26; MIN 3) - only available for PCI certified merchants.</li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <b>ticket</b> (<code>object</code>): Specifies the details of the payment method when using ticket.
                  </summary>
                  <ul>
                    <li><b>type</b> (<code>string</code>): The ticket's type.</li>
                    <li><b>date_of_expiration</b> (<code>date</code>): The ticket's expiration date in YYYY-MM-DD.</li>
                    <li><b>provider_number</b> (<code>integer</code>): The ticket's number.</li>
                    <li><b>provider_barcode</b> (<code>integer</code>): The ticket's barcode.</li>
                    <li><b>provider_logo</b> (<code>string</code>): The ticket's logo.</li>
                    <li><b>provider_format</b> (<code>string</code>): The ticket's format.</li>
                    <li><b>payment_instruction</b> (<code>string</code>): Payments instructions related to the payment (MAX 255; MIN 3).</li>
                    <li><b>redirect_url</b> (<code>string</code>): The URL with the full version of the ticket.</li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <b>payment_link</b> (<code>object</code>): Specifies the details of the payment method when using a payment link.
                  </summary>
                  <ul>
                    <li><b>verify</b> (<code>boolean</code>): Using amount = 0 and verify = true, you can verify the user's card without authorizing a real amount. Possible values: <code>True</code> or <code>False</code></li>
                    <li><b>capture</b> (<code>boolean</code>): Decides whether to authorize the payment or capture it. Authorizing a card payment allows you to reserve funds in a customer's bank account. Possible values: <code>True</code> or <code>False</code></li>
                    <li><b>installments</b> (<code>integer</code>): The card installments (MAX 50; MIN 1).</li>
                    <li><b>payment_method_id</b> (<code>string</code>): The user's payment method used in their wallet.</li>
                    <li><b>payment_method_detail</b> (<code>string</code>): The payment method's detail used in their wallet.</li>
                    <li><b>date_of_expiration</b> (<code>date</code>): Expiration date for an offline payment method.</li>
                    <li><b>money_release_date</b> (<code>date</code>): Date in which the money from the provider will be available to use.</li>
                    <li><b>sponsor_id</b> (<code>string</code>): Partner's provider account (MAX 255; MIN 3).</li>
                    <li><b>authorization_code</b> (<code>string</code>): Acquirer's response code.</li>
                    <li>
                      <details>
                        <summary>
                          <b>customer_data</b> (<code>object</code>): Specifies the details of the customer.
                        </summary>
                        <ul>
                          <li><b>email</b> (<code>string</code>): The customer's email (MAX 255; MIN 3).</li>
                          <li><b>first_name</b> (<code>string</code>): The customer's first name (MAX 32, MIN 8).</li>
                          <li><b>last_name</b> (<code>string</code>): The customer's last name (MAX 32, MIN 8).</li>
                          <li><b>username</b> (<code>string</code>): The customer's username in the platform (MAX 32, MIN 8).</li>
                          <li><b>identification_type</b> (<code>string</code>): The customer's document type. Check the <a href="country-reference">Country reference</a>.</li>
                          <li><b>identification_number</b> (<code>string</code>): The customer's identification number (MAX 32, MIN 8).</li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details>
                        <summary>
                          <b>fee_details</b> (<code>object</code>): Specifies the details of the fees.
                        </summary>
                        <ul>
                          <li><b>amount</b> (<code>float</code>): Amount of the transaction (multiple of 0.0001).</li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details>
                        <summary>
                          <b>card_data</b> (<code>object</code>): Specifies the details of the card.
                        </summary>
                        <ul>
                          <li><b>iin</b> (<code>integer</code>): The issuer identification number (IIN) refers to the first few digits of the payment card number issued by a financial institution (MAX 8; MIN 6).</li>
                          <li><b>lfd</b> (<code>integer</code>): The last four digits of the card (MAX 4; MIN 4).</li>
                          <li><b>number_length</b> (<code>integer</code>): The length of the card's number (MAX 2; MIN 1).</li>
                          <li><b>security_code_length</b> (<code>integer</code>): The length of the card's security code (MAX 1; MIN 1).</li>
                          <li><b>brand</b> (<code>string</code>): The card's brand information (MAX 255; MIN 3).</li>
                          <li><b>holder_name</b> (<code>string</code>): Card holder's full name as it appears on the card (MAX 26; MIN 3) - only available for PCI certified merchants.</li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </details>
  </li>
  <li><b>response_code</b> (<code>string</code>): The code that represents the response of the outcome of the transaction.</li>
  <li><b>response_message</b> (<code>string</code>): The description of the <b>response_code</b>.</li>
  <li><b>reason</b> (<code>string</code>): The reason for the transaction. Applies to secondary transactions, such as refunds or captures.</li>
  <li><b>description</b> (<code>string</code>): The description of the payment (MAX 255; MIN 3).</li>
  <li><b>merchant_reference</b> (<code>string</code>): The reference generated by the merchant to identify the payment/transaction.</li>
  <li>
    <details>
      <summary>
        <b>provider_data</b> (<code>object</code>): Specifies the provider data that processed the payment.
      </summary>
      <ul>
        <li><b>id</b> (<code>string</code>): The provider id that processed the payment.</li>
        <li><b>transaction_id</b> (<code>string</code>): The id of the transaction from the provider.</li>
        <li><b>third_party_transaction_id</b> (<code>string</code>): The id of the transaction from the processor of the provider. If applies.</li>
        <li><b>account_id</b> (<code>string</code>): The unique identifier of the account (MAX 64; MIN 36).</li>
        <li><b>status</b> (<code>enum</code>): The status of the transaction.</li>
        <li><b>sub_status</b> (<code>string</code>): The sub_status of the transaction if it applies.</li>
        <li><b>status_detail</b> (<code>string</code>): The status_detail of the transaction if it applies.</li>
        <li><b>response_message</b> (<code>string</code>): Message to provide additional information regarding the operation status.</li>
        <li><b>raw_response</b> (<code>object</code>): The direct response from the provider for the transaction. The format of the object depends on the provider's response.</li>
        <li><b>raw_notification</b> (<code>array of object</code>): The direct notification from the provider for the transaction. The format of the object depends on the provider's response.</li>
        <li>
          <details>
            <summary>
              <b>detail</b> (<code>object</code>): Specifies the payment method detail object returned by the provider, which specifies the details of the
            different transaction category types.
            </summary>
            <ul>
              <li>
                <details>
                  <summary>
                    <b>card</b> (<code>object</code>): Specifies the details of the payment method when using a card.
                  </summary>
                  <ul>
                    <li><b>verify</b> (<code>boolean</code>): Using amount = 0 and verify = true, you can verify the user's card without authorizing a real amount.</li>
                    <li><b>capture</b> (<code>boolean</code>): Decides whether to authorize the payment or capture it. Authorizing a card payment allows you to reserve funds in a customer's bank account.</li>
                    <li><b>installments</b> (<code>integer</code>): The card installments (MAX 50; MIN 1).</li>
                    <li><b>first_installments_deferral</b> (<code>integer</code>): Number of months to wait to debit the first installment.</li>
                    <li><b>installments_type</b> (<code>string</code>): Defines the type of installments.</li>
                    <li><b>installments_amount</b> (<code>integer</code>): The installment amount includes interests associated with the installment, and the information is defined by the provider.</li>
                    <li><b>soft_descriptor</b> (<code>string</code>): The descriptor passed per transaction to our platform. It will be presented on the customer's physical bank statement (MAX 15; MIN 0).</li>
                    <li><b>authorization_code</b> (<code>string</code>): The acquirer's response code.</li>
                    <li><b>retrieval_reference_number</b> (<code>string</code>): The unique identifier assigned by an acquirer to an authorization.</li>
                    <li><b>voucher</b> (<code>string</code>): The unique identifier of the payment receipt assigned by the issuing bank for a card transaction. This field is empty if the gateway does not provide information about the transaction (MAX 255; MIN 3).</li>
                    <li>
                      <details>
                        <summary>
                          <b>card_data</b> (<code>object</code>): Specifies the details of the card.
                        </summary>
                        <ul>
                          <li><b>holder_name</b> (<code>string</code>): Card holder's full name as it appears on the card (MAX 26; MIN 3) - only available for PCI certified merchants.</li>
                          <li><b>iin</b> (<code>string</code>): The issuer identification number (IIN) refers to the first few digits of the payment card number issued by a financial institution (MAX 8; MIN 6).</li>
                          <li><b>lfd</b> (<code>string</code>): The last four digits of the card (MAX 4; MIN 4).</li>
                          <li><b>number_length</b> (<code>integer</code>): The length of the card's number (MAX 19; MIN 8).</li>
                          <li><b>security_code_length</b> (<code>integer</code>): The length of the card's security code (MAX 1; MIN 1).</li>
                          <li><b>brand</b> (<code>string</code>): The card's brand information (MAX 255; MIN 3).</li>
                          <li><b>issuer_name</b> (<code>string</code>): The card's issuer (MAX 255; MIN 3).</li>
                          <li><b>issuer_code</b> (<code>integer</code>): The card's issuer identification code (MAX 255; MIN 3).</li>
                          <li><b>category</b> (<code>string</code>): The category of the card's issuer (MAX 255; MIN 3).</li>
                          <li><b>type</b> (<code>string</code>): The type of the card's issuer (MAX 255; MIN 3).</li>
                        </ul>
                      </details>
                      <details>
                        <summary>
                          <b>three_d_secure</b> (<code>object</code>): Specifies the details of the 3DS Transaction.
                        </summary>
                        <ul>
                          <li><b>three_d_secure_setup_id</b> (<code>string</code>): Setup ID obtained for the 3DS Direct flow.</li>
                          <li><b>version</b> (<code>enum</code>): Refers to the protocol version of the EMV 3-D Secure specification used. 1.0, 2.0, 2.1.0, 2.2.0, 2.2.1.</li>
                          <li><b>electronic_commerce_indicator</b> (<code>string</code>): This field must be completed with the result of the <a href="eci-indicators-list">ECI</a> field provided by the 3d Secure service. The Electronic Commerce Indicator (ECI) informs the card issuer if the transaction was protected by a security protocol like VbV or MCSC. It is mandated by Visa and MasterCard that all 3-D Secure transactions have this value populated in the authorization request. (MAX: 2, MIN: 0).</li>
                          <li><b>cryptogram</b> (<code>string</code>): This field must be completed with the result of the cryptogram field provided by the 3DSecure service. In Visa transactions, it represents the Cardholder Authentication Verification Value (CAVV), a cryptographic value generated by the Issuer as evidence of payment authentication during an online purchase to qualify for chargeback protection. MasterCard transactions have a similar value called Account holder Authentication Value (AAV) or the Universal Cardholder Authentication Field (UCAF). When submitting a transaction for authorization, the merchant must include the CAVV or AAV/UCAF to demonstrate that the cardholder has been authenticated. It is typically base64-encoded. (MAX: 40, MIN: 0).</li>
                          <li><b>transaction_id</b> (<code>string</code>): For 3DS v1: This is the Unique Transaction Identifier. It is automatically generated by the MPI. It is typically 28 bytes in length and base64-encoded. Is commonly referred to as XID. (MAX: 40, MIN: 0). For 3DS v2: Universally unique transaction identifier assigned by the DS to identify a single transaction. (MAX: 36, MIN:36).</li>
                          <li><b>directory_server_transaction_id</b> (<code>string</code>): Transaction ID generated by the Mastercard directory server during authentication (MAX 255; MIN 3).</li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <b>bnpl</b> (<code>object</code>): Specifies the details of the payment method when using Buy Now Pay Later (BNPL).
                  </summary>
                  <ul>
                    <li><b>installments</b> (<code>integer</code>): The loan installments (MAX 50; MIN 1).</li>
                    <li><b>provider_image</b> (<code>string</code>): The provider's URL to their logo (MAX 255; MIN 3).</li>
                    <li><b>redirect_url</b> (<code>string</code>): The URL with the full version of the ticket in case you want to redirect your customer (MAX 255; MIN 3).</li>
                    <li>
                      <details>
                        <summary>
                          <b>customer_data</b> (<code>object</code>): Specifies the details of the customer.
                        </summary>
                        <ul>
                          <li><b>name</b> (<code>string</code>): The customer's legal name (MAX 32, MIN 8).</li>
                          <li><b>username</b> (<code>string</code>): Customer's username in the provider platform (MAX 32, MIN 8).</li>
                          <li><b>tax_id_type</b> (<code>string</code>): The customer's tax identifier (MAX 32, MIN 8).</li>
                          <li><b>tax_id</b> (<code>string</code>): The customer's tax identifier number (MAX 32, MIN 8).</li>
                          <li><b>type</b> (<code>string</code>): The credit's type (MAX 255; MIN 3).</li>
                          <li><b>area</b> (<code>string</code>): The customer's industry (MAX 255; MIN 3).</li>
                          <li><b>role</b> (<code>string</code>): The customer's role in the company (MAX 255; MIN 3).</li>
                        </ul>
                      </details>
                  </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <b>bank_transfer</b> (<code>object</code>): Specifies the details of the payment method when using bank transfer.
                  </summary>
                  <ul>
                    <li><b>provider_image</b> (<code>string</code>): The provider's URL to their logo (MAX 255; MIN 3).</li>
                    <li><b>account_type</b> (<code>string</code>): Type of the bank account (MAX 255; MIN 3).</li>
                    <li><b>bank_name</b> (<code>string</code>): Name of the bank associated with the account (MAX 255; MIN 3).</li>
                    <li><b>beneficiary_name</b> (<code>string</code>): The name of the account holder (MAX 255; MIN 3).</li>
                    <li><b>bank_account</b> (<code>string</code>): The number of the bank account (MAX 255; MIN 3).</li>
                    <li><b>bank_account_2</b> (<code>string</code>): The secondary number of the bank account (MAX 255; MIN 3).</li>
                    <li><b>beneficiary_document_type</b> (<code>string</code>): Document type of the account holder (MAX 255; MIN 3).</li>
                    <li><b>beneficiary_document</b> (<code>string</code>): Document number of the account holder (MAX 255; MIN 3).</li>
                    <li><b>reference</b> (<code>string</code>): Reference code for the user (MAX 255; MIN 3).</li>
                    <li><b>payment_instruction</b> (<code>string</code>): Payments instructions related to the payment (MAX 255; MIN 3).</li>
                    <li><b>redirect_url</b> (<code>string</code>): The URL with the full version of the ticket in case you want to redirect your customer (MAX 255; MIN 3).</li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <b>wallet</b> (<code>object</code>): Specifies the details of the payment method when using a wallet.
                  </summary>
                  <ul>
                    <li><b>verify</b> (<code>boolean</code>): Using amount = 0 and verify = true, you can verify the user's card without authorizing a real amount. Possible values: <code>True</code> or <code>False</code></li>
                    <li><b>capture</b> (<code>boolean</code>): Decides whether to authorize the payment or capture it. Authorizing a card payment allows you to reserve funds in a customer's bank account. Possible values: <code>True</code> or <code>False</code></li>
                    <li><b>installments</b> (<code>integer</code>): The card installments (MAX 50; MIN 1).</li>
                    <li><b>payment_method_id</b> (<code>string</code>): The user's payment method used in their wallet.</li>
                    <li><b>payment_method_detail</b> (<code>string</code>): The payment method's detail used in their wallet.</li>
                    <li><b>date_of_expiration</b> (<code>date</code>): Expiration date for an offline payment method.</li>
                    <li><b>money_release_date</b> (<code>date</code>): Date in which the money from the provider will be available to use.</li>
                    <li><b>sponsor_id</b> (<code>string</code>): Partner's provider account (MAX 255; MIN 3).</li>
                    <li><b>authorization_code</b> (<code>string</code>): Acquirer's response code.</li>
                    <li>
                      <details>
                        <summary>
                          <b>customer_data</b> (<code>object</code>): Specifies the details of the customer.
                        </summary>
                        <ul>
                          <li><b>email</b> (<code>string</code>): The customer's email (MAX 255; MIN 3).</li>
                          <li><b>first_name</b> (<code>string</code>): The customer's first name (MAX 32, MIN 8).</li>
                          <li><b>last_name</b> (<code>string</code>): The customer's last name (MAX 32, MIN 8).</li>
                          <li><b>username</b> (<code>string</code>): The customer's username in the platform (MAX 32, MIN 8).</li>
                          <li><b>identification_type</b> (<code>string</code>): The customer's document type. Check the <a href="country-reference">Country reference</a>.</li>
                          <li><b>identification_number</b> (<code>string</code>): The customer's identification number (MAX 32, MIN 8).</li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details>
                        <summary>
                          <b>fee_details</b> (<code>object</code>): Specifies the details of the fees.
                        </summary>
                        <ul>
                          <li><b>amount</b> (<code>float</code>): Amount of the transaction (multiple of 0.0001).</li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details>
                        <summary>
                          <b>card_data</b> (<code>object</code>): Specifies the details of the card.
                        </summary>
                        <ul>
                          <li><b>iin</b> (<code>integer</code>): The issuer identification number (IIN) refers to the first few digits of the payment card number issued by a financial institution (MAX 8; MIN 6).</li>
                          <li><b>lfd</b> (<code>integer</code>): The last four digits of the card (MAX 4; MIN 4).</li>
                          <li><b>number_length</b> (<code>integer</code>): The length of the card's number (MAX 2; MIN 1).</li>
                          <li><b>security_code_length</b> (<code>integer</code>): The length of the card's security code (MAX 1; MIN 1).</li>
                          <li><b>brand</b> (<code>string</code>): The card's brand information (MAX 255; MIN 3).</li>
                          <li><b>holder_name</b> (<code>string</code>): Card holder's full name as it appears on the card (MAX 26; MIN 3) - only available for PCI certified merchants.</li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <b>ticket</b> (<code>object</code>): Specifies the details of the payment method when using ticket.
                  </summary>
                  <ul>
                    <li><b>type</b> (<code>string</code>): The ticket's type.</li>
                    <li><b>date_of_expiration</b> (<code>date</code>): The ticket's expiration date in YYYY-MM-DD.</li>
                    <li><b>provider_number</b> (<code>integer</code>): The ticket's number.</li>
                    <li><b>provider_barcode</b> (<code>integer</code>): The ticket's barcode.</li>
                    <li><b>provider_logo</b> (<code>string</code>): The ticket's logo.</li>
                    <li><b>provider_format</b> (<code>string</code>): The ticket's format.</li>
                    <li><b>payment_instruction</b> (<code>string</code>): Payments instructions related to the payment (MAX 255; MIN 3).</li>
                    <li><b>redirect_url</b> (<code>string</code>): The URL with the full version of the ticket.</li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <b>payment_link</b> (<code>object</code>): Specifies the details of the payment method when using a payment link.
                  </summary>
                  <ul>
                    <li><b>verify</b> (<code>boolean</code>): Using amount = 0 and verify = true, you can verify the user's card without authorizing a real amount. Possible values: <code>True</code> or <code>False</code></li>
                    <li><b>capture</b> (<code>boolean</code>): Decides whether to authorize the payment or capture it. Authorizing a card payment allows you to reserve funds in a customer's bank account. Possible values: <code>True</code> or <code>False</code></li>
                    <li><b>installments</b> (<code>integer</code>): The card installments (MAX 50; MIN 1).</li>
                    <li><b>payment_method_id</b> (<code>string</code>): The user's payment method used in their wallet.</li>
                    <li><b>payment_method_detail</b> (<code>string</code>): The payment method's detail used in their wallet.</li>
                    <li><b>date_of_expiration</b> (<code>date</code>): Expiration date for an offline payment method.</li>
                    <li><b>money_release_date</b> (<code>date</code>): Date in which the money from the provider will be available to use.</li>
                    <li><b>sponsor_id</b> (<code>string</code>): Partner's provider account (MAX 255; MIN 3).</li>
                    <li><b>authorization_code</b> (<code>string</code>): Acquirer's response code.</li>
                    <li>
                      <details>
                        <summary>
                          <b>customer_data</b> (<code>object</code>): Specifies the details of the customer.
                        </summary>
                        <ul>
                          <li><b>email</b> (<code>string</code>): The customer's email (MAX 255; MIN 3).</li>
                          <li><b>first_name</b> (<code>string</code>): The customer's first name (MAX 32, MIN 8).</li>
                          <li><b>last_name</b> (<code>string</code>): The customer's last name (MAX 32, MIN 8).</li>
                          <li><b>username</b> (<code>string</code>): The customer's username in the platform (MAX 32, MIN 8).</li>
                          <li><b>identification_type</b> (<code>string</code>): The customer's document type. Check the <a href="country-reference">Country reference</a>.</li>
                          <li><b>identification_number</b> (<code>string</code>): The customer's identification number (MAX 32, MIN 8).</li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details>
                        <summary>
                          <b>fee_details</b> (<code>object</code>): Specifies the details of the fees.
                        </summary>
                        <ul>
                          <li><b>amount</b> (<code>float</code>): Amount of the transaction (multiple of 0.0001).</li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details>
                        <summary>
                          <b>card_data</b> (<code>object</code>): Specifies the details of the card.
                        </summary>
                        <ul>
                          <li><b>iin</b> (<code>integer</code>): The issuer identification number (IIN) refers to the first few digits of the payment card number issued by a financial institution (MAX 8; MIN 6).</li>
                          <li><b>lfd</b> (<code>integer</code>): The last four digits of the card (MAX 4; MIN 4).</li>
                          <li><b>number_length</b> (<code>integer</code>): The length of the card's number (MAX 2; MIN 1).</li>
                          <li><b>security_code_length</b> (<code>integer</code>): The length of the card's security code (MAX 1; MIN 1).</li>
                          <li><b>brand</b> (<code>string</code>): The card's brand information (MAX 255; MIN 3).</li>
                          <li><b>holder_name</b> (<code>string</code>): Card holder's full name as it appears on the card (MAX 26; MIN 3) - only available for PCI certified merchants.</li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </details>
  </li>
  <li><b>created_at</b> (<code>timestamp</code>): The date and time when the transaction was created.</li>
  <li><b>updated_at</b> (<code>timestamp</code>): The date and time from the last time the transaction was updated.</li>
</ul>

# Metadata array of objects

<!-- json@319-324 -->

Specifies a list of metadata objects. You can add up to 50 metadata objects:

<li><b>key</b> (<code>string</code>): Specifies one metadata key.</li>
        <li><b>value</b> (<code>string</code>): Specifies the value for the defined metadata key.</li>

# Fraud screening array of object

<!-- json@325-345 -->

Provides information about the fraud scans used for the payment:

<ul>
  <li><b>status</b> (<code>enum</code>): The final status of the screening process of the payment.</li>
  <li>
    <details>
      <summary>
        <b>transactions</b> (<code>object</code>): Specifies the transaction details associated with a screening process of the payment.
      </summary>
      <ul>
        <li><b>id</b> (<code>string</code>): The id of the fraud transaction (MAX 64; MIN 36).</li>
        <li><b>type</b> (<code>enum</code>): Type of the fraud transaction.<br /><small> Possible enum values: <code>PRE_AUTH</code>, <code>POS_AUTH</code> </small></li>
        <li><b>status</b> (<code>enum</code>): The status of the transaction (MAX 255; MIN 3).</li>
        <li><b>response_code</b> (<code>enum</code>): The response code of the transaction.</li>
        <li><b>response_message</b> (<code>enum</code>): The response message of the transaction.</li>
        <li>
          <details>
            <summary>
              <b>provider_data</b> (<code>object</code>): Specifies the provider data that processed the payment.
            </summary>
            <ul>
              <li><b>provider_id</b> (<code>string</code>): The id of the fraud prevention provider.</li>
              <li><b>transaction_id</b> (<code>string</code>): The id of the fraud transaction from the provider.</li>
              <li><b>status</b> (<code>string</code>): The provider fraud transaction status.</li>
              <li><b>score</b> (<code>string</code>): The provider score for the transaction.</li>
              <li><b>raw_response</b> (<code>string</code>): The raw_response of the provider.</li>
            </ul>
          </details>
        </li>
      </ul>
    </details>
  </li>
  <li><b>created_at</b> (<code>timestamp</code>): The date and time when the fraud screening was created.</li>
  <li><b>updated_at</b> (<code>timestamp</code>): The date and time from the last time the fraud screening was updated.</li>
</ul>