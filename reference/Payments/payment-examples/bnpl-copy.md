---
title: BNPL
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
This page presents examples of requests and responses for creating BNPL payments using the [Create Payment](https://docs.y.uno/reference/create-payment) endpoint with the REDIRECT workflow for back to back integrations. 

To test the creation of each payment, you can copy the content from the request code and use it on your machine or paste it on the [Create Payment](ref:create-payment) endpoint to test using Readme.

## BNPL available examples

[block:html]
{
  "html": "<style>\n  \n\n  .table-of-contents-btn-shelf {\n    margin: 0 0 0 0;\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    grid-template-rows: 1fr;\n    gap: 10px;\n  }\n\n  @media only screen and (max-width: 800px) {\n    .table-of-contents-btn-shelf {\n      grid-template-columns: repeat(2, 1fr);\n    }\n  }\n\n\n  .table-of-contents-btn {\n    font-size: 0.85rem;\n    border: 1px solid var(--yuno-purple-50);\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 0.6rem;\n    border-radius: 7px;\n    font-size: 0.85rem;\n    color: var(--yuno-purple);\n    font-weight: 600;\n    transition: transform .1s;\n  }\n\n  .table-of-contents-btn-on-click-effects {\n    cursor: pointer;\n  }\n\n  .table-of-contents-btn-on-click-effects:hover {\n    transform: scale(1.02);\n    box-shadow: 0 5px 5px var(--yuno-purple-10);\n  }\n\n  .table-of-contents-btn .card-logo div {\n    height: 23px;\n    width: 30px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n\n  /* .table-of-contents-btn .card-name {\n    grid-area: name;\n    align-self: center;\n  } */\n\n  .table-of-contents-btn img {\n    max-height: 23px;\n    max-width: 23px;\n  }\n\n  .table-of-contents-btn .card-title {\n    display: inline-block;\n    ;\n    padding: 0;\n    margin: 0;\n  }\n\n  /* ------------------------ define the configuration for DARK Mode ------------------------  */\n\n  @media (prefers-color-scheme: dark) {\n    .table-of-contents-btn-on-click-effects:hover {\n      box-shadow: none !important;\n    }\n  }\n\n  [data-color-mode=\"dark\"] .table-of-contents-btn-on-click-effects:hover {\n    box-shadow: none !important;\n  }\n</style>\n\n<body>\n  <section class=\"table-of-contents-btn-shelf\">\n    <div class=\"payment-card-button\">\n      <div class=\"table-of-contents-btn table-of-contents-btn-on-click-effects\"\n        onclick=\"window.location='/reference/bnpl-copy#acuotaz';\">\n        <div class=\"card-logo\">\n          <div>\n            <img src=\"https://icons.prod.y.uno/acuotaz_logosimbolo.png\" alt=\"Acuotaz logo\">\n          </div>\n        </div>\n        <span class='card-title'>Acuotaz</span>\n      </div>\n    </div>\n    <div class=\"payment-card-button\">\n      <div class=\"table-of-contents-btn table-of-contents-btn-on-click-effects\"\n        onclick=\"window.location='/reference/bnpl-copy#addi';\">\n        <div class=\"card-logo\">\n          <div>\n            <img src=\"https://icons.prod.y.uno/addi_logosimbolo.png\" alt=\"Addi logo\">\n          </div>\n        </div>\n        <span class='card-title'>Addi</span>\n      </div>\n    </div>\n    <div class=\"payment-card-button\">\n      <div class=\"table-of-contents-btn table-of-contents-btn-on-click-effects\"\n        onclick=\"window.location='/reference/bnpl-copy#wibond';\">\n        <div class=\"card-logo\">\n          <div>\n            <img src=\"https://icons.prod.y.uno/wibond_logosimbolo.png\" alt=\"Wibond logo\">\n          </div>\n        </div>\n        <span class='card-title'>Wibond</span>\n      </div>\n    </div>\n  </section>\n</body>"
}
[/block]

### Acuotaz

Example of a request for a BNPL payment using Acuotaz. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

```curl Request (cURL)
curl --request POST \
     --url https://api-sandbox.y.uno/v1/payments \
     --header 'X-Idempotency-Key: <Your X-Idempotency-Key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <Your private-secret-key>' \
     --header 'public-api-key: <Your public-api-key>' \
     --data '
{
    "description": "Test ACUOTAZ",
    "account_id":"{{account-code}}",
    "merchant_order_id": "0000022",
    "country": "PE",
    "additional_data": {
        "order": {
            "fee_amount": 0,
            "items": [
                {
                    "brand": "XYZ",
                    "category": "Clothes",
                    "id": "123AD",
                    "manufacture_part_number": "XYZ123456",
                    "name": "Skirt",
                    "quantity": 1,
                    "sku_code": "8765432109",
                    "unit_amount": 50
                }
            ],
            "shipping_amount": 0
        }
    },
    "amount": {
        "currency": "PEN",
        "value": 900
    },
    "customer_payer": {
        "merchant_customer_id": "1668863583",
        "first_name": "Tyler",
        "last_name": "Rosenbaum",
        "email": "Jadon56@hotmail.com"
     },
    "workflow":"REDIRECT",
    "payment_method": {
        "type": "ACUOTAZ"
    }
}
'
```
```json Response (JSON)
{
  "id": "1c3c6bee-0230-4989-af06-a2c97c433ac6",
  "account_id": "d3d38fc9-49ec-4277-9115-bbad5d17d236",
  "description": "Test ACUOTAZ",
  "country": "PE",
  "status": "READY_TO_PAY",
  "sub_status": "CREATED",
  "merchant_order_id": "0000022",
  "created_at": "2022-11-19T14:25:19.932037Z",
  "updated_at": "2022-11-19T14:25:20.940450Z",
  "amount": {
    "currency": "PEN",
    "value": 120
  },
  "checkout": {
    "session": "3d6794b3-dff2-40a3-8e53-981e69f35191",
    "sdk_action_required": true
  },
  "payment_method": {
    "vaulted_token": "",
    "type": "ACUOTAZ",
    "vault_on_success": false,
    "token": "",
    "payment_method_detail": {
      "bnpl": {
        "installments": null,
        "provider_image": null,
        "redirect_url": "https://checkout.sandbox.y.uno/payment?session=ddc821e0-1dc0-497f-a304-32c6a99d7103",
        "customer_data": null
      }
    }
  },
  "customer_payer": {
    "id": "71caa74c-f759-4a7c-a1c4-a983bcf24812",
    "merchant_customer_id": "1668863583",
    "first_name": "Tyler",
    "last_name": "Rosenbaum",
    "gender": "",
    "date_of_birth": null,
    "email": "Jadon56@hotmail.com",
    "nationality": null,
    "ip_address": null,
    "device_fingerprint": null,
    "browser_info": null,
    "document": {
      "document_type": "DNI",
      "document_number": "532924789"
    },
    "phone": {
      "number": "11992149494",
      "country_code": "55"
    },
    "billing_address": null,
    "shipping_address": null
  },
  "additional_data": {
    "airline": null,
    "order": {
      "fee_amount": 40,
      "shipping_amount": 10,
      "items": [
        {
          "id": "123AD",
          "name": "Skirt",
          "quantity": 1,
          "unit_amount": 100,
          "category": "Clothes",
          "brand": "XYZ",
          "sku_code": "8765432109",
          "manufacture_part_number": "XYZ123456"
        }
      ]
    },
    "seller_details": null
  },
  "taxes": null,
  "transactions": {
    "id": "2fc3d3aa-e5d4-4e52-afdd-edbca07c4733",
    "type": "PURCHASE",
    "status": "CREATED",
    "category": "BUY_NOW_PAY_LATER",
    "amount": 120,
    "provider_id": "ACUOTAZ",
    "payment_method": {
      "vaulted_token": "",
      "type": "ACUOTAZ",
      "vault_on_success": false,
      "token": "7946b293-853a-42c8-97f3-a37e72ce230f",
      "detail": {
        "bnpl": {
          "installments": null,
          "provider_image": null,
          "redirect_url": "https://checkout.sandbox.y.uno/payment?session=ddc821e0-1dc0-497f-a304-32c6a99d7103",
          "customer_data": null
        }
      }
    },
    "response_code": "SUCCEEDED",
    "response_message": "",
    "reason": null,
    "description": null,
    "merchant_reference": null,
    "provider_data": {
      "id": "ACUOTAZ",
      "transaction_id": "2fc3d3aa-e5d4-4e52-afdd-edbca07c4733",
      "account_id": "",
      "status": "CREATED",
      "sub_status": "",
      "status_detail": "",
      "raw_response": {
        "redirect_to": "https://aprt.me/upYm",
        "status": "new_order"
      }
    },
    "created_at": "2022-11-19T14:25:19.939870Z",
    "updated_at": "2022-11-19T14:25:20.940427Z"
  },
  "workflow": "REDIRECT"
}
```

### Addi

Example of a request for a BNPL payment using Addi. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

```curl Request (cURL)
curl --request POST \
     --url https://api-sandbox.y.uno/v1/payments \
     --header 'X-Idempotency-Key: <Your X-Idempotency-Key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <Your private-secret-key>' \
     --header 'public-api-key: <Your public-api-key>' \
     --data '
{
    "description": "Test ADDI",
    "account_id":"{{account-code}}",
    "merchant_order_id": "0000022",
    "country": "CO",
    "amount": {
        "currency": "COP",
        "value": 52000
    },
   "customer_payer": {
        "first_name": "Pepito",
        "last_name": "Perez",
        "email":"test@gmail.com",
        "merchant_customer_id": "example00234",
        "document": {
            "document_type": "CC",
            "document_number": "1032765432"
        },
        "phone":{
            "number":"3132450778",
            "country_code":"57"
        }
    },
    "workflow":"REDIRECT",
    "payment_method": {
        "type": "ADDI"
    }
}
'
```
```json Response (JSON)
{
    "id": "087be3a5-bed7-4c58-bbe0-c2ebcf376ebb",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test ADDI",
    "country": "CO",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000022",
    "created_at": "2023-07-20T21:25:11.903819Z",
    "updated_at": "2023-07-20T21:25:12.983059Z",
    "amount": {
        "captured": 0.00,
        "currency": "COP",
        "refunded": 0.00,
        "value": 52000.00
    },
    "checkout": {
        "session": "25e073ae-016c-4bca-89e7-64e05f766f11",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "ADDI",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "bnpl": {
                "installments": null,
                "provider_image": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=82e244a2-9d5b-4998-93b7-8a293fb43b9c",
                "customer_data": null
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "example00234",
        "first_name": "Pepito",
        "last_name": "Perez",
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
        "id": "1328382d-f6e8-4f09-91b7-c18b1308c031",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "BUY_NOW_PAY_LATER",
        "amount": 52000.00,
        "provider_id": "ADDI",
        "payment_method": {
            "vaulted_token": "",
            "type": "ADDI",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "bnpl": {
                    "installments": null,
                    "provider_image": null,
                    "redirect_url": "https://checkout.sandbox.y.uno/payment?session=82e244a2-9d5b-4998-93b7-8a293fb43b9c",
                    "customer_data": null
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test ADDI",
        "merchant_reference": null,
        "provider_data": {
            "id": "ADDI",
            "transaction_id": "0000022",
            "account_id": "",
            "status": "CREATED",
            "sub_status": "",
            "status_detail": "",
            "response_message": "",
            "raw_response": {
                "value": ""
            },
            "third_party_transaction_id": ""
        },
        "three_d_secure_action_required": null,
        "created_at": "2023-07-20T21:25:12.008657Z",
        "updated_at": "2023-07-20T21:25:12.918362Z"
    },
    "split": [],
    "workflow": "REDIRECT",
    "metadata": [],
    "fraud_screening": null
}
```

### Wibond

Example of a request for a BNPL payment using Wibond. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

```curl Request (cURL)
curl --request POST \
     --url https://api-sandbox.y.uno/v1/payments \
     --header 'X-Idempotency-Key: <Your X-Idempotency-Key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <Your private-secret-key>' \
     --header 'public-api-key: <Your public-api-key>' \
     --data '
{
    "description": "Test Wibond",
    "account_id": "{{account-code}}",
    "merchant_order_id":"1689888540",
    "country": "AR",
    "amount": {
        "currency": "ARS",
        "value": 52000
    },
    "customer_payer": {
            "merchant_customer_id": "1689888540",
            "first_name": "Alessandra",
            "last_name": "CANO",
            "email": "Darius48@gmail.com"
        },
    "workflow":"REDIRECT",
    "payment_method": {
        "type": "WIBOND"
    }
}
'
```
```json Response
{
    "id": "2f9d9279-d9cc-451b-bf79-b6d176927b0b",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test Wibond",
    "country": "AR",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "1689888540",
    "created_at": "2023-07-20T21:29:00.413927Z",
    "updated_at": "2023-07-20T21:29:02.917870Z",
    "amount": {
        "captured": 0.00,
        "currency": "ARS",
        "refunded": 0.00,
        "value": 52000.00
    },
    "checkout": {
        "session": "76cfacf8-d489-4d6d-bb1d-edaf2f303877",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "WIBOND",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "bnpl": {
                "installments": null,
                "provider_image": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=64947b6b-5963-431d-bb09-507e8effcc15",
                "customer_data": null
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "1689888540",
        "first_name": "Alessandra",
        "last_name": "CANO",
        "gender": null,
        "date_of_birth": null,
        "email": "Darius48@gmail.com",
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
        "id": "eb4d1f14-d004-47a7-a5e9-527062b74b29",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "BUY_NOW_PAY_LATER",
        "amount": 52000.00,
        "provider_id": "WIBOND",
        "payment_method": {
            "vaulted_token": "",
            "type": "WIBOND",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "bnpl": {
                    "installments": null,
                    "provider_image": null,
                    "redirect_url": "https://checkout.sandbox.y.uno/payment?session=64947b6b-5963-431d-bb09-507e8effcc15",
                    "customer_data": null
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test Wibond",
        "merchant_reference": null,
        "provider_data": {
            "id": "WIBOND",
            "transaction_id": "6286140",
            "account_id": "",
            "status": "ACTIVE",
            "sub_status": "",
            "status_detail": "",
            "response_message": "",
            "raw_response": {
                "amount": 52000,
                "created": "2023-07-20T21:29:02.356+0000",
                "currency": "ARS",
                "externalId": "eb4d1f14-d004-47a7-a5e9-527062b74b29",
                "features": "",
                "id": 6286140,
                "productName": "Test Wibond",
                "requiresAddressInfo": false,
                "shortDescription": "",
                "status": "ACTIVE",
                "tenant": {
                    "address": "SANCHEZ",
                    "addressNumber": "2267",
                    "address_number": "2267",
                    "alias": "FRANCO PATRICIO MORELLO",
                    "city": "empty city",
                    "country": "ARGENTINA",
                    "created": "2022-06-24T21:56:57.000+0000",
                    "creditLimit": 0,
                    "declaredIngress": 0,
                    "delayedTransactions": 0,
                    "email": "Integration.sbx@y.uno",
                    "evalOwnCreditProfile": false,
                    "floor": "",
                    "id": 2422650,
                    "idProvince": 0,
                    "inProgressTransactions": 0,
                    "name": "FRANCO PATRICIO MORELLO",
                    "phone": "+541169018687",
                    "province": "CIUDAD AUTONOMA BUENOS AIRES",
                    "receivePayOrders": true,
                    "signatureType": "INDISTINCT",
                    "signaturesRequired": 1,
                    "status": "ACTIVE",
                    "successfulTransactions": 0,
                    "taxCondition": 2,
                    "taxId": "20344005452",
                    "taxIdType": 86,
                    "tenantArea": "OTROS",
                    "type": "PERSONAL",
                    "typeOptPaymentLink": "TNA_FREE",
                    "username": "francopatriciomorello",
                    "verificacionFacta": false,
                    "verificacionFondos": true,
                    "verificacionIdIdentification": true,
                    "verificacionOcde": false,
                    "verificacionPolitico": false,
                    "verificacionSujetoObligado": false,
                    "verificationIdMati": "63f677e52f7b41001c584d93",
                    "verificationStatusMati": "verified",
                    "wibondAmount": 446852.4,
                    "wibondAmountCreation": "2023-02-10T00:00:00.000+0000"
                },
                "urlCheckout": "https://demo.dev.y.uno/checkout/status?checkoutSession=",
                "urlLink": "https://preprod.wibond.co/pay-link/6286140",
                "urlNotification": "https://sandbox.y.uno/wibond-webhook/v1/payments/notification",
                "urlSuccess": "https://demo.dev.y.uno/checkout/status?checkoutSession=&id=6286140&externalId=eb4d1f14-d004-47a7-a5e9-527062b74b29",
                "variations": []
            },
            "third_party_transaction_id": ""
        },
        "three_d_secure_action_required": null,
        "created_at": "2023-07-20T21:29:00.532790Z",
        "updated_at": "2023-07-20T21:29:02.826785Z"
    },
    "split": [],
    "workflow": "REDIRECT",
    "metadata": [],
    "fraud_screening": null
}
```