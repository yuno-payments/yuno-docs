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

## Ticket available examples

[block:html]
{
  "html": "<style>\n  \n\n  .table-of-contents-btn-shelf {\n    margin: 0 0 0 0;\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    grid-template-rows: 1fr;\n    gap: 10px;\n  }\n\n  @media only screen and (max-width: 800px) {\n    .table-of-contents-btn-shelf {\n      grid-template-columns: repeat(2, 1fr);\n    }\n  }\n\n\n  .table-of-contents-btn {\n    font-size: 0.85rem;\n    border: 1px solid var(--yuno-purple-50);\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 0.6rem;\n    border-radius: 7px;\n    font-size: 0.85rem;\n    color: var(--yuno-purple);\n    font-weight: 600;\n    transition: transform .1s;\n  }\n\n  .table-of-contents-btn-on-click-effects {\n    cursor: pointer;\n  }\n\n  .table-of-contents-btn-on-click-effects:hover {\n    transform: scale(1.02);\n    box-shadow: 0 5px 5px var(--yuno-purple-10);\n  }\n\n  .table-of-contents-btn .card-logo div {\n    height: 23px;\n    width: 30px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n\n  /* .table-of-contents-btn .card-name {\n    grid-area: name;\n    align-self: center;\n  } */\n\n  .table-of-contents-btn img {\n    max-height: 23px;\n    max-width: 23px;\n  }\n\n  .table-of-contents-btn .card-title {\n    display: inline-block;\n    ;\n    padding: 0;\n    margin: 0;\n  }\n\n  /* ------------------------ define the configuration for DARK Mode ------------------------  */\n\n  @media (prefers-color-scheme: dark) {\n    .table-of-contents-btn-on-click-effects:hover {\n      box-shadow: none !important;\n    }\n  }\n\n  [data-color-mode=\"dark\"] .table-of-contents-btn-on-click-effects:hover {\n    box-shadow: none !important;\n  }\n</style>\n\n<body>\n  <section class=\"table-of-contents-btn-shelf\">\n    <div class=\"payment-card-button\">\n      <div class=\"table-of-contents-btn table-of-contents-btn-on-click-effects\"\n        onclick=\"window.location='ticket-copy#arcus';\">\n        <div class=\"card-logo\">\n          <div>\n            <img src=\"https://icons.prod.y.uno/arcus_logosimbolo.png\" alt=\"Arcus logo\">\n          </div>\n        </div>\n        <span class='card-title'>Arcus</span>\n      </div>\n    </div>\n    <div class=\"payment-card-button\">\n      <div class=\"table-of-contents-btn table-of-contents-btn-on-click-effects\"\n        onclick=\"window.location='ticket-copy#efecty';\">\n        <div class=\"card-logo\">\n          <div>\n            <img src=\"https://icons.prod.y.uno/efecty_logosimbolo.png\" alt=\"Efecty logo\">\n          </div>\n        </div>\n        <span class='card-title'>Efecty</span>\n      </div>\n    </div>\n    <div class=\"payment-card-button\">\n      <div class=\"table-of-contents-btn table-of-contents-btn-on-click-effects\"\n        onclick=\"window.location='ticket-copy#oxxo';\">\n        <div class=\"card-logo\">\n          <div>\n            <img src=\"https://icons.prod.y.uno/oxxo_logosimbolo.png\" alt=\"Oxxo logo\">\n          </div>\n        </div>\n        <span class='card-title'>Oxxo</span>\n      </div>\n    </div>\n  </section>\n</body>"
}
[/block]

### Arcus

Example of a request for a Cash payment using Arcus. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

```curl Request (cURL)
curl --request POST \
     --url https://api-sandbox.y.uno/v1/payments \
     --header 'X-Idempotency-Key: <Your X-Idempotency-Key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <Your private-secret-key>' \
     --header 'public-api-key: <Your public-api-key>'\
--data '{
    "description": "Test CASH",
    "account_id":"{{account-code}}",
    "merchant_order_id": "0000022",
    "country": "MX",
    "amount": {
        "currency": "MXN",
        "value": 52000
    },
    "customer_payer": {
        "merchant_customer_id": "1690155567",
        "first_name": "Leda",
        "last_name": "CANO",
        "email": "Melody_Bins@hotmail.com",
        "document":{
          "document_type": "CC",
          "document_number": "1032765432"
          },
        "phone":{
              "number":"3132450778",
              "country_code":"57"
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
    "id": "d858ca9a-fb84-4310-a17d-fc3e3b95596d",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test CASH",
    "country": "MX",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000022",
    "created_at": "2023-07-23T23:39:37.569231Z",
    "updated_at": "2023-07-23T23:39:38.010432Z",
    "amount": {
        "captured": 0.00,
        "currency": "MXN",
        "refunded": 0.00,
        "value": 52000.00
    },
    "checkout": {
        "session": "c83ac160-a838-4b3e-8543-abe96fe2167a",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "CASH",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "ticket": {
                "type": null,
                "date_of_expiration": null,
                "provider_number": "AP001123456759090125366900147357",
                "provider_barcode": null,
                "provider_logo": null,
                "provider_format": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=183dccfe-8269-4ab2-b04f-462eafca511b"
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "1690155567",
        "first_name": "Leda",
        "last_name": "CANO",
        "gender": null,
        "date_of_birth": null,
        "email": "Melody_Bins@hotmail.com",
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
        "document": {
            "document_type": "CC",
            "document_number": "1032765432"
        },
        "phone": {
            "number": "3132450778",
            "country_code": "57"
        },
        "billing_address": null,
        "shipping_address": null
    },
    "additional_data": null,
    "taxes": null,
    "transactions": {
        "id": "8cd2394e-d8f3-4462-8692-48c03887e463",
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
            "detail": {}
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test CASH",
        "merchant_reference": null,
        "provider_data": {
            "id": "ARCUS",
            "transaction_id": "AP001123456759090125366900147357",
            "account_id": "",
            "status": "",
            "sub_status": "",
            "status_detail": "",
            "response_message": "",
            "raw_response": null,
            "third_party_transaction_id": ""
        },
        "created_at": "2023-07-23T23:39:37.699260Z",
        "updated_at": "2023-07-23T23:39:37.893170Z"
    },
    "split": [],
    "callback_url": "www.y.uno",
    "workflow": "REDIRECT",
    "metadata": []
}
```

### Efecty

Example of a request for a Ticket payment using Efecty. Below you find the JSON body request example.

```curl Request (cURL)
curl --request POST \
     --url https://api-sandbox.y.uno/v1/payments \
     --header 'X-Idempotency-Key: <Your X-Idempotency-Key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <Your private-secret-key>' \
     --header 'public-api-key: <Your public-api-key>'\
--data '
{
    "description": "Test EFECTY",
    "account_id":"{{account-code}}",
    "merchant_order_id": "0000022",
    "country": "CO",
    "amount": {
        "currency": "COP",
        "value": 52000
    },
    "customer_payer": {
        "merchant_customer_id": "{{$timestamp}}",
        "first_name": "Kaleb",
        "last_name": "CANO",
        "email": "test@gmail.com"
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
    "description": "Test EFECTY",
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
        "first_name": "Kaleb",
        "last_name": "CANO",
        "gender": null,
        "date_of_birth": null,
        "email": "test@gmail.com",
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
        "description": "Test EFECTY",
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
     --header 'X-Idempotency-Key: <Your X-Idempotency-Key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <Your private-secret-key>' \
     --header 'public-api-key: <Your public-api-key>'\
--data '{
    "description": "Test OXXO",
    "account_id":"{{account-code}}",
    "merchant_order_id": "0000022",
    "country": "MX",
    "amount": {
        "currency": "MXN",
        "value": 5200
    },
    "customer_payer": {
        "merchant_customer_id": "1690155799",
        "first_name": "Willy",
        "last_name": "CANO",
        "email": "test@gmail.com"
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
    "description": "Test OXXO",
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
        "first_name": "Rogers",
        "last_name": "CANO",
        "gender": null,
        "date_of_birth": null,
        "email": "test@gmail.com",
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
        "description": "Test OXXO",
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