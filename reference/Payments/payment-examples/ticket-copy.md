---
title: Ticket
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    This page presents examples of requests and responses for creating payments
    using the Create Payment endpoint and Ticket payment methods.
  robots: index
next:
  description: ''
---
This page presents examples of requests and responses for creating payments using the [Create Payment](https://docs.y.uno/reference/create-payment) endpoint and Ticket payment methods.

To test the creation of each payment, you can copy the content from the request code and use it on your machine or paste it on the [Create Payment](ref:create-payment) endpoint to test using Readme.

> 🚧 Important
>
> Some payment methods and providers may only be available in specific countries and/or currencies. Make sure you choose the right provider for your needs.

## Ticket available examples

<HTMLBlock>{`
<style>
  

  .table-of-contents-btn-shelf {
    margin: 0 0 0 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    gap: 10px;
  }

  @media only screen and (max-width: 800px) {
    .table-of-contents-btn-shelf {
      grid-template-columns: repeat(2, 1fr);
    }
  }


  .table-of-contents-btn {
    font-size: 0.85rem;
    border: 1px solid var(--yuno-purple-50);
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0.6rem;
    border-radius: 7px;
    font-size: 0.85rem;
    color: var(--yuno-purple);
    font-weight: 600;
    transition: transform .1s;
  }

  .table-of-contents-btn-on-click-effects {
    cursor: pointer;
  }

  .table-of-contents-btn-on-click-effects:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 5px var(--yuno-purple-10);
  }

  .table-of-contents-btn .card-logo div {
    height: 23px;
    width: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  /* .table-of-contents-btn .card-name {
    grid-area: name;
    align-self: center;
  } */

  .table-of-contents-btn img {
    max-height: 23px;
    max-width: 23px;
  }

  .table-of-contents-btn .card-title {
    display: inline-block;
    ;
    padding: 0;
    margin: 0;
  }

  /* ------------------------ define the configuration for DARK Mode ------------------------  */

  @media (prefers-color-scheme: dark) {
    .table-of-contents-btn-on-click-effects:hover {
      box-shadow: none !important;
    }
  }

  [data-color-mode="dark"] .table-of-contents-btn-on-click-effects:hover {
    box-shadow: none !important;
  }
</style>

<body>
  <section class="table-of-contents-btn-shelf">
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='ticket-copy#arcus';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/arcus_logosimbolo.png" alt="Arcus logo">
          </div>
        </div>
        <span class='card-title'>Arcus</span>
      </div>
    </div>
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='ticket-copy#efecty';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/efecty_logosimbolo.png" alt="Efecty logo">
          </div>
        </div>
        <span class='card-title'>Efecty</span>
      </div>
    </div>
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='ticket-copy#oxxo';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/oxxo_logosimbolo.png" alt="Oxxo logo">
          </div>
        </div>
        <span class='card-title'>Oxxo</span>
      </div>
    </div>
  </section>
</body>
`}</HTMLBlock>

### Arcus

Example of a request for a Cash payment using Arcus. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

```curl Request (cURL)
curl --request POST \
     --url https://api-sandbox.y.uno/v1/payments \
     --header 'X-Idempotency-Key: <your-X-idempotency-key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <your-private-secret-key>' \
     --header 'public-api-key: <your-public-api-key>'\
--data '{
    "description": "Payment with Arcus",
    "account_id":"<account_id>",
    "merchant_order_id": "0000022",
    "country": "MX",
    "amount": {
        "currency": "MXN",
        "value": 52000
    },
    "customer_payer": {
      "merchant_customer_id": "1789123456",
      "first_name": "John",
      "last_name": "Smith",
      "email": "john.smith@example.com",
      "document": {
        "document_type": "PAS",
        "document_number": "123456789"
      },
      "phone": {
        "number": "5551234567",
        "country_code": "1"
      }
    },
    "payment_method": {
        "type": "CASH"
    },
    "workflow":"REDIRECT",
    "callback_url":"www.y.uno"
}'
```
```json Response (JSON)
{
    "id": "f190cf86-de16-4b6d-b634-ab478bb6da01",
    "account_id": "5beead35-0cd5-4e1c-9a13-b8f48f7f8f3a",
    "description": "Payment with Arcus",
    "country": "MX",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000022",
    "created_at": "2025-06-20T13:00:30.417457Z",
    "updated_at": "2025-06-20T13:00:30.696683Z",
    "amount": {
        "captured": 0.00,
        "currency": "MXN",
        "currency_conversion": null,
        "refunded": 0.00,
        "value": 52000.00
    },
    "checkout": {
        "session": "1c57438e-f854-4d01-9b04-4c7338372a81",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "CASH",
        "vault_on_success": false,
        "token": "",
        "parent_payment_method_type": null,
        "payment_method_detail": {
            "ticket": {
                "type": null,
                "benefit_type": null,
                "date_of_expiration": null,
                "payment_instruction": null,
                "provider_number": "AP001123456761082788244884910249",
                "provider_barcode": null,
                "provider_logo": null,
                "provider_format": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=278f85d1-71f4-4d9a-bc02-e34421302097",
                "expires_at": null
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "1789123456",
        "first_name": "John",
        "last_name": "Smith",
        "gender": null,
        "date_of_birth": null,
        "email": "john.smith@example.com",
        "nationality": null,
        "ip_address": null,
        "device_fingerprint": null,
        "device_fingerprints": [],
        "browser_info": {
            "user_agent": "",
            "accept_header": "",
            "accept_content": null,
            "accept_browser": null,
            "color_depth": "",
            "screen_height": "",
            "screen_width": "",
            "javascript_enabled": null,
            "java_enabled": null,
            "browser_time_difference": null,
            "language": "",
            "platform": null
        },
        "document": {
            "document_type": "PAS",
            "document_number": "123456789"
        },
        "phone": {
            "number": "5551234567",
            "country_code": "1"
        },
        "billing_address": null,
        "shipping_address": null,
        "merchant_customer_created_at": null
    },
    "additional_data": null,
    "transactions": {
        "id": "36609e7c-cd92-48a1-b520-edaa1c1bf026",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "TICKET",
        "amount": 52000.00,
        "provider_id": "ARCUS",
        "payment_method": {
            "vaulted_token": "",
            "type": "CASH",
            "vault_on_success": false,
            "token": "",
            "parent_payment_method_type": null,
            "detail": {
                "ticket": {
                    "type": null,
                    "benefit_type": null,
                    "date_of_expiration": null,
                    "payment_instruction": null,
                    "provider_number": "AP001123456761082788244884910249",
                    "provider_barcode": null,
                    "provider_logo": null,
                    "provider_format": null,
                    "redirect_url": "https://checkout.sandbox.y.uno/payment?session=278f85d1-71f4-4d9a-bc02-e34421302097",
                    "expires_at": null
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Payment with Arcus",
        "merchant_reference": "0000022",
        "provider_data": {
            "id": "ARCUS",
            "transaction_id": "AP001123456761082788244884910249",
            "account_id": "",
            "status": "",
            "sub_status": "",
            "status_detail": "",
            "response_message": null,
            "response_code": null,
            "raw_response": null,
            "third_party_transaction_id": "",
            "third_party_account_id": null,
            "iso8583_response_code": null,
            "iso8583_response_message": null
        },
        "connection_data": {
            "id": "48425c89-8fd0-4c6f-a8f3-17a25e5ac7ce",
            "name": null
        },
        "created_at": "2025-06-20T13:00:30.553544Z",
        "updated_at": "2025-06-20T13:00:30.626338Z"
    },
    "transactions_history": [
        {
            "id": "36609e7c-cd92-48a1-b520-edaa1c1bf026",
            "type": "PURCHASE",
            "status": "CREATED",
            "category": "TICKET",
            "amount": 52000.00,
            "provider_id": "ARCUS",
            "payment_method": {
                "vaulted_token": "",
                "type": "CASH",
                "vault_on_success": false,
                "token": "",
                "parent_payment_method_type": null,
                "detail": {
                    "ticket": {
                        "type": null,
                        "benefit_type": null,
                        "date_of_expiration": null,
                        "payment_instruction": null,
                        "provider_number": "AP001123456761082788244884910249",
                        "provider_barcode": null,
                        "provider_logo": null,
                        "provider_format": null,
                        "redirect_url": "https://checkout.sandbox.y.uno/payment?session=278f85d1-71f4-4d9a-bc02-e34421302097",
                        "expires_at": null
                    }
                }
            },
            "response_code": "SUCCEEDED",
            "response_message": "Transaction successful",
            "reason": null,
            "description": "Payment with Arcus",
            "merchant_reference": "0000022",
            "provider_data": {
                "id": "ARCUS",
                "transaction_id": "AP001123456761082788244884910249",
                "account_id": "",
                "status": "",
                "sub_status": "",
                "status_detail": "",
                "response_message": null,
                "response_code": null,
                "raw_response": null,
                "third_party_transaction_id": "",
                "third_party_account_id": null,
                "iso8583_response_code": null,
                "iso8583_response_message": null
            },
            "connection_data": {
                "id": "48425c89-8fd0-4c6f-a8f3-17a25e5ac7ce",
                "name": null
            },
            "created_at": "2025-06-20T13:00:30.553544Z",
            "updated_at": "2025-06-20T13:00:30.626338Z"
        }
    ],
    "callback_url": "www.y.uno",
    "workflow": "REDIRECT",
    "metadata": [],
    "fraud_screening": null,
    "payment_link_id": "",
    "subscription_code": null,
    "routing_rules": {
        "smart_routing": false,
        "monitors": false,
        "condition": {
            "id": 191919,
            "name": null,
            "description": null
        }
    },
    "simplified_mode": false
}
```

### Efecty

Example of a request for a Ticket payment using Efecty. Below you find the JSON body request example.

```curl Request (cURL)
curl --request POST \
     --url https://api-sandbox.y.uno/v1/payments \
     --header 'X-Idempotency-Key: <your-X-idempotency-key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <your-private-secret-key>' \
     --header 'public-api-key: <your-public-api-key>'\
--data '
{
    "description": "Payment with Efecty",
    "account_id":"<account_id>",
    "merchant_order_id": "0000022",
    "country": "CO",
    "amount": {
        "currency": "COP",
        "value": 52000
    },
    "customer_payer": {
      "merchant_customer_id": "1234567",
      "first_name": "John",
      "last_name": "Smith",
      "email": "john.smith@example.com",
      "document": {
          "document_type": "PAS",
          "document_number": "1012345678"
      },
    },
    "payment_method": {
        "type": "EFECTY"
    },
    "workflow":"REDIRECT",
    "callback_url":"www.google.com"
}'
```
```json Response (JSON)
{
    "id": "1c109200-3236-43f3-ab44-9a317991a288",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Payment with Efecty",
    "country": "CO",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000022",
    "created_at": "2023-07-23T23:35:25.021285Z",
    "updated_at": "2023-07-23T23:35:26.067120Z",
    "amount": {
        "captured": 0.00,
        "currency": "COP",
        "refunded": 0.00,
        "value": 52000.00
    },
    "checkout": {
        "session": "3faeb04f-0a52-41fc-9aba-33e535386776",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "EFECTY",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "ticket": {
                "type": null,
                "date_of_expiration": null,
                "provider_number": "762c4604-d4ba-4a8f-ba2f-5d39931e9ed8",
                "provider_barcode": null,
                "provider_logo": null,
                "provider_format": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=3feff49c-a422-434a-9fad-eca87e2193d5"
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "1690155316",
        "first_name": "John",
        "last_name": "Smith",
        "gender": null,
        "date_of_birth": null,
        "email": "john.smith@example.com",
        "nationality": null,
        "ip_address": null,
        "device_fingerprint": null,
        "browser_info": {
            "user_agent": "",
            "accept_header": "",
            "accept_content": null,
            "accept_browser": null,
            "color_depth": "",
            "screen_height": "",
            "screen_width": "",
            "javascript_enabled": null,
            "java_enabled": null,
            "browser_time_difference": null,
            "language": ""
        },
        "document": null,
        "phone": null,
        "billing_address": null,
        "shipping_address": null
    },
    "additional_data": null,
    "taxes": null,
    "transactions": {
        "id": "762c4604-d4ba-4a8f-ba2f-5d39931e9ed8",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "TICKET",
        "amount": 52000.00,
        "provider_id": "UNLIMINT",
        "payment_method": {
            "vaulted_token": "",
            "type": "EFECTY",
            "vault_on_success": false,
            "token": "",
            "detail": {}
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Payment with Efecty",
        "merchant_reference": null,
        "provider_data": {
            "id": "UNLIMINT",
            "transaction_id": "",
            "account_id": "",
            "status": "",
            "sub_status": "",
            "status_detail": "",
            "response_message": "",
            "raw_response": {
                "redirect_url": "https://sandbox.cardpay.com/MI/payment.html?uuid=a6cfEG0H3c1Hf42f23HhH3Ch"
            },
            "third_party_transaction_id": ""
        },
        "created_at": "2023-07-23T23:35:25.116858Z",
        "updated_at": "2023-07-23T23:35:25.988725Z"
    },
    "split": [],
    "callback_url": "www.google.com",
    "workflow": "REDIRECT",
    "metadata": []
}
```

### Oxxo

Example of a request for a Ticket payment using Oxxo. Below you find the JSON body request example.

```curl Request (cURL)
curl --request POST \
     --url https://api-sandbox.y.uno/v1/payments \
     --header 'X-Idempotency-Key: <your-X-idempotency-key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <your-private-secret-key>' \
     --header 'public-api-key: <your-public-api-key>'\
--data '{
    "description": "Payment with Oxxo",
    "account_id":"<account_id>",
    "merchant_order_id": "0000022",
    "country": "MX",
    "amount": {
        "currency": "MXN",
        "value": 5200
    },
    "customer_payer": {
        "merchant_customer_id": "1690155799",
        "first_name": "John",
        "last_name": "Smith",
        "email": "john.smith@example.com"
    },
    "payment_method": {
        "type": "OXXO"
    },
    "workflow":"REDIRECT",
    "callback_url":"www.google.com"
}'
```
```json Response (JSON)
{
    "id": "f36a1e5d-7073-4a6d-88ab-b26f69de7a01",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Payment with Oxxo",
    "country": "MX",
    "status": "PURCHASE",
    "sub_status": "SUCCEEDED",
    "merchant_order_id": "0000022",
    "created_at": "2023-07-23T23:48:18.014380Z",
    "updated_at": "2023-07-23T23:48:18.758261Z",
    "amount": {
        "captured": 0.00,
        "currency": "MXN",
        "refunded": 0.00,
        "value": 5200.00
    },
    "checkout": {
        "session": "2a3cd0a7-9bdc-46b7-859b-0e13ab91f2ff",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "OXXO",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "ticket": {
              "type": null,
              "date_of_expiration": null,
              "provider_number": "",
              "provider_barcode": null,
              "provider_logo": null,
              "provider_format": null,
              "redirect_url": "https://checkout.sandbox.y.uno/payment?session=f7c986c5-d66e-4e52-8c02-9a90b73fb9a5"
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "1690156096",
        "first_name": "John",
        "last_name": "Smith",
        "gender": null,
        "date_of_birth": null,
        "email": "john.smith@example.com",
        "nationality": null,
        "ip_address": null,
        "device_fingerprint": null,
        "browser_info": {
          "user_agent": "",
          "accept_header": "",
          "accept_content": null,
          "accept_browser": null,
          "color_depth": "",
          "screen_height": "",
          "screen_width": "",
          "javascript_enabled": null,
          "java_enabled": null,
          "browser_time_difference": null,
          "language": ""
        },
        "document": null,
        "phone": null,
        "billing_address": null,
        "shipping_address": null
    },
    "additional_data": null,
    "taxes": null,
    "transactions": {
        "id": "1946defd-3312-4bdf-86b6-751a1aff94d0",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "TICKET",
        "amount": 5200.00,
        "provider_id": "DLOCAL",
        "payment_method": {
            "vaulted_token": "",
            "type": "OXXO",
            "vault_on_success": false,
            "token": "",
            "detail": {}
        },
        "response_code": "",
        "response_message": "",
        "reason": null,
        "description": "Payment with Oxxo",
        "merchant_reference": "0000022",
        "provider_data": {
            "id": "DLOCAL",
            "transaction_id": "",
            "account_id": "",
            "status": "",
            "sub_status": "",
            "status_detail": "",
            "response_message": null,
            "raw_response": null,
            "third_party_transaction_id": null
        },
        "three_d_secure_action_required": null,
        "created_at": "2023-07-23T23:48:18.186301Z",
        "updated_at": "2023-07-23T23:48:18.693131Z"
    },
    "split": [],
    "callback_url": "www.google.com",
    "workflow": "REDIRECT",
    "metadata": [],
    "fraud_screening": null,
    "payment_link_code": ""
}
```
