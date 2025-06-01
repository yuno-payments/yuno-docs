---
title: Wallet
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    This page presents examples of requests and responses for creating payments
    using the Create Payment endpoint and Payment Link as payment method.
  robots: index
next:
  description: ''
---
This page presents examples of requests and responses for creating payments using the [Create Payment](https://docs.y.uno/reference/create-payment) endpoint and Payment Link as payment method.

To test the creation of each payment, you can copy the content from the request code and use it on your machine or paste it on the [Create Payment](ref:create-payment) endpoint to test using Readme.

## Wallet available examples

[block:html]
{
  "html": "<style>\n  \n\n  .table-of-contents-btn-shelf {\n    margin: 0 0 0 0;\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    grid-template-rows: 1fr;\n    gap: 10px;\n  }\n\n  @media only screen and (max-width: 800px) {\n    .table-of-contents-btn-shelf {\n      grid-template-columns: repeat(2, 1fr);\n    }\n  }\n\n  .table-of-contents-btn {\n    font-size: 0.85rem;\n    border: 1px solid var(--yuno-purple-50);\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 0.6rem;\n    border-radius: 7px;\n    font-size: 0.85rem;\n    color: var(--yuno-purple);\n    font-weight: 600;\n    transition: transform .1s;\n    min-height: 62px;\n  }\n\n  .table-of-contents-btn-on-click-effects {\n    cursor: pointer;\n  }\n\n  .table-of-contents-btn-on-click-effects:hover {\n    transform: scale(1.02);\n    box-shadow: 0 5px 5px var(--yuno-purple-10);\n  }\n\n  .table-of-contents-btn .card-logo div {\n    height: 23px;\n    width: 30px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n\n  /* .table-of-contents-btn .card-name {\n    grid-area: name;\n    align-self: center;\n  } */\n\n  .table-of-contents-btn img {\n    max-height: 23px;\n    max-width: 23px;\n  }\n\n  .table-of-contents-btn .card-title {\n    display: inline-block;\n    ;\n    padding: 0;\n    margin: 0;\n  }\n\n  /* ------------------------ define the configuration for DARK Mode ------------------------  */\n\n  @media (prefers-color-scheme: dark) {\n    .table-of-contents-btn-on-click-effects:hover {\n      box-shadow: none !important;\n    }\n  }\n\n  [data-color-mode=\"dark\"] .table-of-contents-btn-on-click-effects:hover {\n    box-shadow: none !important;\n  }\n</style>\n\n<body>\n  <section class=\"table-of-contents-btn-shelf\">\n    <div class=\"payment-card-button\">\n      <div class=\"table-of-contents-btn table-of-contents-btn-on-click-effects\"\n        onclick=\"window.location='wallet#mercado-pago-checkout-pro';\">\n        <div class=\"card-logo\">\n          <div>\n            <img src=\"https://icons.prod.y.uno/mercadopago_logosimbolo.png\" alt=\"Mercado Pago Checkout Pro logo\">\n          </div>\n        </div>\n        <span class='card-title'>Mercado Pago Checkout Pro</span>\n      </div>\n    </div>\n    <div class=\"payment-card-button\">\n      <div class=\"table-of-contents-btn table-of-contents-btn-on-click-effects\"\n        onclick=\"window.location='wallet#astropay';\">\n        <div class=\"card-logo\">\n          <div>\n            <img src=\"https://icons.prod.y.uno/astropay_logosimbolo.png\" alt=\"Astropay logo\">\n          </div>\n        </div>\n        <span class='card-title'>Astropay</span>\n      </div>\n    </div>\n    <div class=\"payment-card-button\">\n      <div class=\"table-of-contents-btn table-of-contents-btn-on-click-effects\"\n        onclick=\"window.location='#nupay-enrollment';\">\n        <div class=\"card-logo\">\n          <div>\n            <img src=\"https://icons.prod.y.uno/nupay_logosimbolo.png\" alt=\"Nupay logo\">\n          </div>\n        </div>\n        <span class='card-title'>Nupay Enrollment</span>\n      </div>\n    </div>\n    <div class=\"payment-card-button\">\n      <div class=\"table-of-contents-btn table-of-contents-btn-on-click-effects\"\n        onclick=\"window.location='#nequi';\">\n        <div class=\"card-logo\">\n          <div>\n            <img src=\"https://icons.prod.y.uno/nequi_logosimbolo.png\" alt=\"Nequi logo\">\n          </div>\n        </div>\n        <span class='card-title'>Nequi</span>\n      </div>\n    </div>\n  </section>\n</body>"
}
[/block]


## Mercado Pago Checkout Pro

Example of a request for a payment using Mercado Pago Checkout Pro. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

```curl Request (cURL)
curl --request POST \
     --url https://api-sandbox.y.uno/v1/payments \
     --header 'X-Idempotency-Key: <Your idempotency-key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <Your private-secret-key>' \
     --header 'public-api-key: <Your public-api-key>' \
     --data '
{
    "description": "Test MP Checkout pro",
    "account_id": "{{account-code}}",
    "merchant_order_id": "0000023",
    "country": "CO",
    "merchant_reference": "reference-{{$randomUUID}}",
    "additional_data": {
        "order": {
            "items": [
                {
                    "id": "123AD",
                    "name": "Skirt",
                    "quantity": 1,
                    "unit_amount": 3000
                }
            ]
        }
    },
    "amount": {
        "currency": "COP",
        "value": 3000
    },
    "customer_payer": {
        "email": "pepitoperez@y.uno",
        "first_name": "Pepito",
        "last_name": "Perez"
    },
    "payment_method": {
        "type": "MERCADO_PAGO_CHECKOUT_PRO"
    },
    "workflow": "REDIRECT",
    "callback_url":"www.y.uno"
}
'
```
```json Response (JSON)
{
    "id": "d0ff19c2-cf55-4015-a613-e35f22da0233",
    "account_id": "{{account-code}}",
    "description": "Test MP Checkout pro",
    "country": "CO",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000023",
    "created_at": "2023-07-23T23:02:39.401790Z",
    "updated_at": "2023-07-23T23:02:40.312593Z",
    "amount": {
        "captured": 0.00,
        "currency": "COP",
        "refunded": 0.00,
        "value": 3000.00
    },
    "checkout": {
        "session": "b7e15362-4ac0-4e23-886e-329695933ecb",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "MERCADO_PAGO_CHECKOUT_PRO",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "wallet": {
                "verify": false,
                "capture": false,
                "installments": null,
                "payment_method_id": null,
                "payment_method_detail": null,
                "date_of_expiration": null,
                "money_release_date": null,
                "sponsor_id": null,
                "authorization_code": null,
                "customer_data": null,
                "card_data": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=e93d8431-f55c-43a3-a4e4-0c7a4bcc7e27"
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": null,
        "first_name": "Pepito",
        "last_name": "Perez",
        "gender": null,
        "date_of_birth": null,
        "email": "pepitoperez@y.uno",
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
    "additional_data": {
        "airline": null,
        "order": {
            "fee_amount": null,
            "shipping_amount": null,
            "items": [
                {
                    "id": "123AD",
                    "name": "Skirt",
                    "quantity": 1,
                    "unit_amount": 3000,
                    "category": null,
                    "brand": null,
                    "sku_code": null,
                    "manufacture_part_number": null
                }
            ]
        },
        "seller_details": null
    },
    "taxes": null,
    "transactions": {
        "id": "286ad833-7cbc-4e66-92f9-01019eb7d7a3",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "WALLET",
        "amount": 3000.00,
        "provider_id": "MERCADO_PAGO",
        "payment_method": {
            "vaulted_token": "",
            "type": "MERCADO_PAGO_CHECKOUT_PRO",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "wallet": {
                    "verify": false,
                    "capture": false,
                    "installments": null,
                    "payment_method_id": null,
                    "payment_method_detail": null,
                    "date_of_expiration": null,
                    "money_release_date": null,
                    "sponsor_id": null,
                    "authorization_code": null,
                    "customer_data": null,
                    "card_data": null,
                    "redirect_url": "https://checkout.sandbox.y.uno/payment?session=e93d8431-f55c-43a3-a4e4-0c7a4bcc7e27"
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test MP Checkout pro",
        "merchant_reference": "reference-d2b08e8e-c87a-4806-b1ea-b35a19a36a6d",
        "provider_data": {
            "id": "MERCADO_PAGO",
            "transaction_id": "",
            "account_id": "",
            "status": "",
            "sub_status": "",
            "status_detail": "",
            "response_message": "",
            "raw_response": {
                "value":"{\"additional_info\":\"\",\"auto_return\":\"approved\",\"back_urls\":{\"failure\":\"http://www.y.uno\",\"pending\":\"http://www.y.uno\",\"success\":\"http://www.y.uno\"},\"binary_mode\":true,\"client_id\":\"3615163740385056\",\"collector_id\":1131498549,\"coupon_code\":null,\"coupon_labels\":null,\"date_created\":\"2023-07-23T19:02:40.082-04:00\",\"date_of_expiration\":null,\"expiration_date_from\":null,\"expiration_date_to\":null,\"expires\":false,\"external_reference\":\"286ad833-7cbc-4e66-92f9-01019eb7d7a3\",\"id\":\"1131498549-ef2fc547-72b3-4e19-acce-83f94c70609a\",\"init_point\":\"https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1131498549-ef2fc547-72b3-4e19-acce-83f94c70609a\",\"internal_metadata\":null,\"items\":[{\"id\":\"123AD\",\"category_id\":\"others\",\"currency_id\":\"ARS\",\"description\":\"\",\"title\":\"Skirt\",\"quantity\":1,\"unit_price\":3000}],\"marketplace\":\"MP-MKT-3615163740385056\",\"marketplace_fee\":0,\"metadata\":{},\"notification_url\":\"https://sandbox.y.uno/mercadopago-webhook/v1/checkout-pro/events?source_news=webhooks\&transaction=286ad833-7cbc-4e66-92f9-01019eb7d7a3\",\"operation_type\":\"regular_payment\",\"payer\":{\"phone\":{\"area_code\":\"\",\"number\":\"\"},\"address\":{\"zip_code\":\"\",\"street_name\":\"\",\"street_number\":null},\"email\":\"pepitoperez@y.uno\",\"identification\":{\"number\":\"\",\"type\":\"\"},\"name\":\"Pepito\",\"surname\":\"Perez\",\"date_created\":null,\"last_purchase\":null},\"payment_methods\":{\"default_card_id\":null,\"default_payment_method_id\":null,\"excluded_payment_methods\":[{\"id\":\"\"}],\"excluded_payment_types\":[{\"id\":\"ticket\"},{\"id\":\"atm\"}],\"installments\":null,\"default_installments\":null},\"processing_modes\":null,\"product_id\":null,\"redirect_urls\":{\"failure\":\"\",\"pending\":\"\",\"success\":\"\"},\"sandbox_init_point\":\"https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=1131498549-ef2fc547-72b3-4e19-acce-83f94c70609a\",\"site_id\":\"MLA\",\"shipments\":{\"mode\":\"not_specified\",\"default_shipping_method\":null,\"cost\":0,\"receiver_address\":{\"zip_code\":\"\",\"street_name\":\"\",\"street_number\":null,\"floor\":\"\",\"apartment\":\"\",\"city_name\":null,\"state_name\":null,\"country_name\":null}},\"total_amount\":null,\"last_updated\":null}"
            },
            "third_party_transaction_id": ""
        },
        "created_at": "2023-07-23T23:02:39.582570Z",
        "updated_at": "2023-07-23T23:02:40.227158Z"
    },
    "split": [],
    "callback_url": "www.y.uno",
    "workflow": "REDIRECT",
    "metadata": []
}
```

## Astropay

Example of a request for a payment using Astropay. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

```curl Request (cURL)
curl --location 'https://api-sandbox.y.uno/v1/payments' \
--header 'X-idempotency-key: ----' \
--header 'public-api-key:--- ' \
--header 'private-secret-key: ---' \
--header 'Content-Type: application/json' \
--data '{
    "account_id": {{your_account_id}},
    "amount": {
        "currency": "BRL",
        "value": 283
    },
    "checkout": {
        "session": "ce855c45-f560-4a28-8258-d765777ba485"
    },
    "payment_method": {
        "type": "ASTROPAY"
    },
    "customer_payer": {
        "id": {{your_customer_payer_id}}
    },
    "merchant_order_id": "test merchant order id",
    "country": "BR",
    "description": "test description",
    "workflow": "REDIRECT"
}'
```
```json Response (JSON)
{
    "id": "245e360c-3bd7-4a8d-9258-8a8839087f7e",
    "account_id": "{{your_account_id}}",
    "description": "test description",
    "country": "BR",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "test merchant order id",
    "created_at": "2024-03-22T11:48:45.772202Z",
    "updated_at": "2024-03-22T11:48:46.402414Z",
    "amount": {
        "captured": 0.00,
        "currency": "BRL",
        "refunded": 0.00,
        "value": 283.00
    },
    "checkout": {
        "session": "a5e36fa7-e635-417b-aa87-8cda1adbe24e",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "ASTROPAY",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "wallet": {
                "verify": false,
                "capture": false,
                "installments": null,
                "payment_method_id": null,
                "payment_method_detail": null,
                "date_of_expiration": null,
                "money_release_date": null,
                "sponsor_id": null,
                "authorization_code": null,
                "customer_data": null,
                "card_data": {
                    "holder_name": "",
                    "iin": "",
                    "lfd": "",
                    "number_length": 0,
                    "security_code_length": 0,
                    "brand": "",
                    "issuer_name": "",
                    "issuer_code": null,
                    "category": null,
                    "type": ""
                },
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=4da1aa74-a2c7-457d-8b21-f823fe8cf5b8"
            }
        }
    },
    "customer_payer": {
        "id": "{{customer_payer_id}}",
        "merchant_customer_id": "{{merchant_customer_id}}",
        "first_name": "Aaron",
        "last_name": "Heann",
        "gender": "F",
        "date_of_birth": "1990-02-28",
        "email": "test@test.com",
        "nationality": "BR",
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
            "document_type": "CPF",
            "document_number": "{{document_number}}"
        },
        "phone": {
            "number": "{{phone_number}}",
            "country_code": "55"
        },
        "billing_address": {
            "address_line_1": "Calle 34 # 56 - 78",
            "address_line_2": "Apartamento 502, Torre I",
            "country": "BR",
            "state": "Cundinamarca",
            "city": "Bogotá",
            "zip_code": "68890000",
            "neighborhood": null
        },
        "shipping_address": {
            "address_line_1": "Calle 34 # 56 - 78",
            "address_line_2": "Apartamento 502, Torre I",
            "country": "BR",
            "state": "Cundinamarca",
            "city": "Bogotá",
            "zip_code": "68890000",
            "neighborhood": null
        },
        "merchant_customer_created_at": null
    },
    "additional_data": null,
    "taxes": null,
    "transactions": {
        "id": "0b258b77-1785-4b64-9094-c1f7e714e460",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "WALLET",
        "amount": 283.00,
        "provider_id": "ASTROPAY",
        "payment_method": {
            "vaulted_token": "",
            "type": "ASTROPAY",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "wallet": {
                    "verify": false,
                    "capture": false,
                    "installments": null,
                    "payment_method_id": null,
                    "payment_method_detail": null,
                    "date_of_expiration": null,
                    "money_release_date": null,
                    "sponsor_id": null,
                    "authorization_code": null,
                    "customer_data": null,
                    "card_data": {
                        "holder_name": "",
                        "iin": "",
                        "lfd": "",
                        "number_length": 0,
                        "security_code_length": 0,
                        "brand": "",
                        "issuer_name": "",
                        "issuer_code": null,
                        "category": null,
                        "type": ""
                    },
                    "redirect_url": "https://checkout.sandbox.y.uno/payment?session=4da1aa74-a2c7-457d-8b21-f823fe8cf5b8"
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "test description",
        "merchant_reference": "test merchant order id",
        "provider_data": {
            "id": "ASTROPAY",
            "transaction_id": "qW10WwSpwtTY8vLAqiTBY1D3FT4fTutdLCbFtiBy",
            "account_id": "",
            "status": "PENDING",
            "sub_status": "",
            "status_detail": "",
            "response_message": "",
            "response_code": "200",
            "raw_response": {
                "deposit_external_id": "{{deposit_external_id}}",
                "merchant_deposit_id": "{{merchant_deposit_id}}",
                "status": "PENDING",
                "type": "default",
                "url": "https://onetouch-sandbox.astropay.com/deposit/qW10WwSpwtTY8vLAqiTBY1D3FT4fTutdLCbFtiBy"
            },
            "third_party_transaction_id": "",
            "third_party_account_id": ""
        },
        "created_at": "2024-03-22T11:48:45.874280Z",
        "updated_at": "2024-03-22T11:48:46.361673Z"
    },
    "transactions_history": [
        {
            "id": "0b258b77-1785-4b64-9094-c1f7e714e460",
            "type": "PURCHASE",
            "status": "CREATED",
            "category": "WALLET",
            "amount": 283.00,
            "provider_id": "ASTROPAY",
            "payment_method": {
                "vaulted_token": "",
                "type": "ASTROPAY",
                "vault_on_success": false,
                "token": "",
                "detail": {
                    "wallet": {
                        "verify": false,
                        "capture": false,
                        "installments": null,
                        "payment_method_id": null,
                        "payment_method_detail": null,
                        "date_of_expiration": null,
                        "money_release_date": null,
                        "sponsor_id": null,
                        "authorization_code": null,
                        "customer_data": null,
                        "card_data": {
                            "holder_name": "",
                            "iin": "",
                            "lfd": "",
                            "number_length": 0,
                            "security_code_length": 0,
                            "brand": "",
                            "issuer_name": "",
                            "issuer_code": null,
                            "category": null,
                            "type": ""
                        },
                        "redirect_url": "https://checkout.sandbox.y.uno/payment?session=4da1aa74-a2c7-457d-8b21-f823fe8cf5b8"
                    }
                }
            },
            "response_code": "SUCCEEDED",
            "response_message": "Transaction successful",
            "reason": null,
            "description": "test description",
            "merchant_reference": "test merchant order id",
            "provider_data": {
                "id": "ASTROPAY",
                "transaction_id": "qW10WwSpwtTY8vLAqiTBY1D3FT4fTutdLCbFtiBy",
                "account_id": "",
                "status": "PENDING",
                "sub_status": "",
                "status_detail": "",
                "response_message": "",
                "response_code": "200",
                "raw_response": {
                    "deposit_external_id": "{{deposit_external_id}}",
                    "merchant_deposit_id": "{{merchant_deposit_id}}",
                    "status": "PENDING",
                    "type": "default",
                    "url": "https://onetouch-sandbox.astropay.com/deposit/qW10WwSpwtTY8vLAqiTBY1D3FT4fTutdLCbFtiBy"
                },
                "third_party_transaction_id": "",
                "third_party_account_id": ""
            },
            "created_at": "2024-03-22T11:48:45.874280Z",
            "updated_at": "2024-03-22T11:48:46.361673Z"
        }
    ],
    "split": [],
    "workflow": "REDIRECT",
    "metadata": [],
    "fraud_screening": null,
    "payment_link_id": "",
    "subscription_code": null
}
```

## Nupay Enrollment

Example of a request for creating a payment Nupay Enrollment. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

```curl Request (cURL)
curl --location 'https://api-sandbox.y.uno/v1/payments' \
--header 'X-idempotency-key: <Your idempotency-key>' \
--header 'public-api-key: <Your public-api-key>' \
--header 'private-secret-key: <Your private-secret-key>' \
--header 'Content-Type: application/json' \
--data '{
    "description": "Test NuPay",
    "account_id": "7ae52512-1234-1234-1234-db973de67640",
    "merchant_order_id": "Order1234",
    "country": "BR",
    "amount": {
        "currency": "BRL",
        "value": 20
    },
    "checkout": {
        "session": "4351f6f4-1234-1234-1234-fd1388c3d55d"
    },
    "customer_payer": {
        "id": "45ad52b6-a094-41ab-933e-2e75a7ad4bf9"
    },
    "workflow": "DIRECT",
    "payment_method": {
        "type": "NU_PAY_ENROLLMENT",
        "vaulted_token": "1f3d74a0-1234-1234-1234-f5ccd42b27dc",
        "detail": {
            "wallet": {
                "card_data": {
                    "card_type": "CREDIT"
                }
            }
        }
    }
}'
```
```json Response (JSON)
{
    "id": "db24dc85-1ce3-48bc-a77b-b768c2b45c58",
    "account_id": "7ae52512-1234-1234-1234-db973de67640",
    "description": "Test NuPay",
    "country": "BR",
    "status": "PENDING",
    "sub_status": "PENDING_PROVIDER_CONFIRMATION",
    "merchant_order_id": "Order1234",
    "created_at": "2024-08-03T00:41:31.729501Z",
    "updated_at": "2024-08-03T00:41:36.469759Z",
    "amount": {
        "captured": 0,
        "currency": "BRL",
        "currency_conversion": null,
        "refunded": 0,
        "value": 20
    },
    "checkout": {
        "session": "4351f6f4-1234-1234-1234-fd1388c3d55d",
        "sdk_action_required": false
    },
    "payment_method": {
        "vaulted_token": "1f3d74a0-1234-1234-1234-f5ccd42b27dc",
        "type": "NU_PAY_ENROLLMENT",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "wallet": {
                "verify": false,
                "capture": false,
                "installments": null,
                "payment_method_id": null,
                "payment_method_detail": null,
                "date_of_expiration": null,
                "money_release_date": null,
                "sponsor_id": null,
                "authorization_code": null,
                "customer_data": null,
                "card_data": {
                    "holder_name": "",
                    "iin": "",
                    "lfd": "",
                    "number_length": 0,
                    "security_code_length": 0,
                    "brand": "",
                    "issuer_name": "",
                    "issuer_code": null,
                    "category": null,
                    "type": "CREDIT",
                    "fingerprint": null
                },
                "redirect_url": ""
            }
        }
    },
    "customer_payer": {
        "id": "45ad52b6-a094-41ab-933e-2e75a7ad4bf9",
        "merchant_customer_id": "123456789012",
        "first_name": "John",
        "last_name": "Doe",
        "gender": null,
        "date_of_birth": null,
        "email": "john.doe@email.com",
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
            "document_type": "CPF",
            "document_number": "01234567891"
        },
        "phone": null,
        "billing_address": null,
        "shipping_address": null,
        "merchant_customer_created_at": null
    },
    "additional_data": null,
    "transactions": {
        "id": "0bcc0b37-d863-4139-a9ae-44110c3253d8",
        "type": "PURCHASE",
        "status": "PENDING",
        "category": "WALLET",
        "amount": 20,
        "provider_id": "SPINPAY",
        "payment_method": {
            "vaulted_token": "1f3d74a0-1234-1234-1234-f5ccd42b27dc",
            "type": "NU_PAY_ENROLLMENT",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "wallet": {
                    "verify": false,
                    "capture": false,
                    "installments": null,
                    "payment_method_id": null,
                    "payment_method_detail": null,
                    "date_of_expiration": null,
                    "money_release_date": null,
                    "sponsor_id": null,
                    "authorization_code": null,
                    "customer_data": null,
                    "card_data": {
                        "holder_name": "",
                        "iin": "",
                        "lfd": "",
                        "number_length": 0,
                        "security_code_length": 0,
                        "brand": "",
                        "issuer_name": "",
                        "issuer_code": null,
                        "category": null,
                        "type": "CREDIT",
                        "fingerprint": null
                    },
                    "redirect_url": ""
                }
            }
        },
        "response_code": "PENDING_PROVIDER_CONFIRMATION",
        "response_message": "Transaction waiting confirmation",
        "reason": null,
        "description": "Test NuPay",
        "merchant_reference": "Order1234",
        "provider_data": {
            "id": "SPINPAY",
            "transaction_id": "512b4695-cc8e-48c6-a72c-36db3ba2e47d",
            "account_id": "5864724921505",
            "status": "WAITING_PAYMENT_METHOD",
            "sub_status": "",
            "status_detail": "",
            "response_message": null,
            "response_code": null,
            "raw_response": {
                "value": "{\"paymentMethodType\":\"nupay\",\"status\":\"WAITING_PAYMENT_METHOD\",\"pspReferenceId\":\"512b4695-cc8e-48c6-a72c-36db3ba2e47d\",\"referenceId\":\"0bcc0b37-d863-4139-a9ae-44110c3253d8\"}"
            },
            "third_party_transaction_id": "",
            "third_party_account_id": null
        },
        "created_at": "2024-08-03T00:41:31.928075Z",
        "updated_at": "2024-08-03T00:41:36.379150Z"
    },
    "transactions_history": [
        {
            "id": "0bcc0b37-d863-4139-a9ae-44110c3253d8",
            "type": "PURCHASE",
            "status": "PENDING",
            "category": "WALLET",
            "amount": 20,
            "provider_id": "SPINPAY",
            "payment_method": {
                "vaulted_token": "1f3d74a0-1234-1234-1234-f5ccd42b27dc",
                "type": "NU_PAY_ENROLLMENT",
                "vault_on_success": false,
                "token": "",
                "detail": {
                    "wallet": {
                        "verify": false,
                        "capture": false,
                        "installments": null,
                        "payment_method_id": null,
                        "payment_method_detail": null,
                        "date_of_expiration": null,
                        "money_release_date": null,
                        "sponsor_id": null,
                        "authorization_code": null,
                        "customer_data": null,
                        "card_data": {
                            "holder_name": "",
                            "iin": "",
                            "lfd": "",
                            "number_length": 0,
                            "security_code_length": 0,
                            "brand": "",
                            "issuer_name": "",
                            "issuer_code": null,
                            "category": null,
                            "type": "CREDIT",
                            "fingerprint": null
                        },
                        "redirect_url": ""
                    }
                }
            },
            "response_code": "PENDING_PROVIDER_CONFIRMATION",
            "response_message": "Transaction waiting confirmation",
            "reason": null,
            "description": "Test NuPay",
            "merchant_reference": "Order1234",
            "provider_data": {
                "id": "SPINPAY",
                "transaction_id": "512b4695-cc8e-48c6-a72c-36db3ba2e47d",
                "account_id": "5864724921505",
                "status": "WAITING_PAYMENT_METHOD",
                "sub_status": "",
                "status_detail": "",
                "response_message": null,
                "response_code": null,
                "raw_response": {
                    "value": "{\"paymentMethodType\":\"nupay\",\"status\":\"WAITING_PAYMENT_METHOD\",\"pspReferenceId\":\"512b4695-cc8e-48c6-a72c-36db3ba2e47d\",\"referenceId\":\"0bcc0b37-d863-4139-a9ae-44110c3253d8\"}"
                },
                "third_party_transaction_id": "",
                "third_party_account_id": null
            },
            "created_at": "2024-08-03T00:41:31.928075Z",
            "updated_at": "2024-08-03T00:41:36.379150Z"
        }
    ],
    "split": [],
    "workflow": "DIRECT",
    "metadata": [],
    "fraud_screening": null,
    "payment_link_id": "",
    "subscription_code": null,
    "routing_rules": {
        "condition": {
            "id": 95706,
            "name": null,
            "description": null
        }
    },
    "simplified_mode": false
}

```

## Nequi

Below is an example of a payment request using Nequi. This example demonstrates how to create a payment operation using the cURL format.

```curl Request (cURL)
curl --location 'https://api-sandbox.y.uno/v1/payments' \
--header 'X-idempotency-key: XXXXXXXXXXX' \
--header 'public-api-key: ***********' \
--header 'Content-Type: application/json' \
--data-raw '{
    "description": "Test Nequi",
    "account_id":"493e9374-510a-4201-9e09-de669d75f256",
    "merchant_order_id": "0000022",
    "country": "CO",
    "amount": {
        "currency": "COP",
        "value": 52000
    },
    "customer_payer": {
        "merchant_customer_id": "1737124506",
        "first_name": "Reva",
        "last_name": "CANO",
        "email": "test@gmail.com",
        "document":{
            "document_type": "CC",
            "document_number": "1032765432"
        },
        "phone": {
            "country_code": "57",
            "number": "3991111111"
        }
    },
    "payment_method": {
        "type": "NEQUI"
    },
    "workflow":"REDIRECT",
    "callback_url":"www.google.com"
}'
```
```json Response (JSON)
{
    "id": "340c1be8-05b9-4e37-aabf-4e57f098bf03",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test Nequi",
    "country": "CO",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000022",
    "created_at": "2025-01-17T14:35:08.157837Z",
    "updated_at": "2025-01-17T14:35:18.879785Z",
    "amount": {
        "captured": 0.00,
        "currency": "COP",
        "currency_conversion": null,
        "refunded": 0.00,
        "value": 52000.00
    },
    "checkout": {
        "session": "b1792599-fa77-44ac-a31e-87f2af2e30ac",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "NEQUI",
        "vault_on_success": false,
        "token": "",
        "parent_payment_method_type": null,
        "payment_method_detail": {
            "wallet": {
                "verify": false,
                "capture": false,
                "installments": 0,
                "installments_plan_id": null,
                "first_installment_deferral": 0,
                "installments_type": "",
                "installment_amount": null,
                "payment_method_id": null,
                "payment_method_detail": null,
                "date_of_expiration": null,
                "money_release_date": null,
                "sponsor_id": null,
                "authorization_code": null,
                "customer_data": null,
                "card_data": {
                    "holder_name": "",
                    "iin": "",
                    "lfd": "",
                    "number_length": 0,
                    "security_code_length": 0,
                    "brand": "",
                    "issuer_name": "",
                    "issuer_code": null,
                    "country_code": "",
                    "category": null,
                    "type": "",
                    "fingerprint": null,
                    "expiration_month": null,
                    "expiration_year": null
                },
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=cd627381-11ea-45d7-8918-ee703098c265"
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "1737124506",
        "first_name": "Reva",
        "last_name": "CANO",
        "gender": null,
        "date_of_birth": null,
        "email": "test@gmail.com",
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
            "language": ""
        },
        "document": {
            "document_type": "CC",
            "document_number": "1032765432"
        },
        "phone": {
            "number": "3991111111",
            "country_code": "57"
        },
        "billing_address": null,
        "shipping_address": null,
        "merchant_customer_created_at": null
    },
    "additional_data": null,
    "transactions": {
        "id": "a55a645d-4fcd-4720-9128-abbcbe739d81",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "WALLET",
        "amount": 52000.00,
        "provider_id": "DLOCAL",
        "payment_method": {
            "vaulted_token": "",
            "type": "NEQUI",
            "vault_on_success": false,
            "token": "",
            "parent_payment_method_type": null,
            "detail": {
                "wallet": {
                    "verify": false,
                    "capture": false,
                    "installments": 0,
                    "installments_plan_id": null,
                    "first_installment_deferral": 0,
                    "installments_type": "",
                    "installment_amount": null,
                    "payment_method_id": null,
                    "payment_method_detail": null,
                    "date_of_expiration": null,
                    "money_release_date": null,
                    "sponsor_id": null,
                    "authorization_code": null,
                    "customer_data": null,
                    "card_data": {
                        "holder_name": "",
                        "iin": "",
                        "lfd": "",
                        "number_length": 0,
                        "security_code_length": 0,
                        "brand": "",
                        "issuer_name": "",
                        "issuer_code": null,
                        "country_code": "",
                        "category": null,
                        "type": "",
                        "fingerprint": null,
                        "expiration_month": null,
                        "expiration_year": null
                    },
                    "redirect_url": "https://checkout.sandbox.y.uno/payment?session=cd627381-11ea-45d7-8918-ee703098c265"
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test Nequi",
        "merchant_reference": "0000022",
        "provider_data": {
            "id": "DLOCAL",
            "transaction_id": "F-385928-c8516ec5-5b49-4ccf-9fc9-89000f3935bd",
            "account_id": "1OABfzqFOD",
            "status": "PENDING",
            "sub_status": "",
            "status_detail": "",
            "response_message": "The payment is pending.",
            "response_code": "100",
            "raw_response": {
                "value": "{\"id\":\"F-385928-c8516ec5-5b49-4ccf-9fc9-89000f3935bd\",\"amount\":52000,\"currency\":\"COP\",\"payment_method_id\":\"QP\",\"payment_method_type\":\"WALLET\",\"payment_method_flow\":\"REDIRECT\",\"country\":\"CO\",\"created_date\":\"2025-01-17T14:35:09.000+0000\",\"status\":\"PENDING\",\"status_detail\":\"The payment is pending.\",\"status_code\":\"100\",\"order_id\":\"a55a645d-4fcd-4720-9128-abbcbe739d81\",\"notification_url\":\"https://sandbox.y.uno/dlocal-webhook/v1/confirmations\"}"
            },
            "third_party_transaction_id": "",
            "third_party_account_id": "",
            "iso8583_response_code": null,
            "iso8583_response_message": null
        },
        "connection_data": {
            "id": "c3f18893-9318-4652-90f6-7bb9d12cc160",
            "name": null
        },
        "device_fingerprint": null,
        "created_at": "2025-01-17T14:35:08.314925Z",
        "updated_at": "2025-01-17T14:35:18.832995Z"
    },
    "transactions_history": [
        {
            "id": "a55a645d-4fcd-4720-9128-abbcbe739d81",
            "type": "PURCHASE",
            "status": "CREATED",
            "category": "WALLET",
            "amount": 52000.00,
            "provider_id": "DLOCAL",
            "payment_method": {
                "vaulted_token": "",
                "type": "NEQUI",
                "vault_on_success": false,
                "token": "",
                "parent_payment_method_type": null,
                "detail": {
                    "wallet": {
                        "verify": false,
                        "capture": false,
                        "installments": 0,
                        "installments_plan_id": null,
                        "first_installment_deferral": 0,
                        "installments_type": "",
                        "installment_amount": null,
                        "payment_method_id": null,
                        "payment_method_detail": null,
                        "date_of_expiration": null,
                        "money_release_date": null,
                        "sponsor_id": null,
                        "authorization_code": null,
                        "customer_data": null,
                        "card_data": {
                            "holder_name": "",
                            "iin": "",
                            "lfd": "",
                            "number_length": 0,
                            "security_code_length": 0,
                            "brand": "",
                            "issuer_name": "",
                            "issuer_code": null,
                            "country_code": "",
                            "category": null,
                            "type": "",
                            "fingerprint": null,
                            "expiration_month": null,
                            "expiration_year": null
                        },
                        "redirect_url": "https://checkout.sandbox.y.uno/payment?session=cd627381-11ea-45d7-8918-ee703098c265"
                    }
                }
            },
            "response_code": "SUCCEEDED",
            "response_message": "Transaction successful",
            "reason": null,
            "description": "Test Nequi",
            "merchant_reference": "0000022",
            "provider_data": {
                "id": "DLOCAL",
                "transaction_id": "F-385928-c8516ec5-5b49-4ccf-9fc9-89000f3935bd",
                "account_id": "1OABfzqFOD",
                "status": "PENDING",
                "sub_status": "",
                "status_detail": "",
                "response_message": "The payment is pending.",
                "response_code": "100",
                "raw_response": {
                    "value": "{\"id\":\"F-385928-c8516ec5-5b49-4ccf-9fc9-89000f3935bd\",\"amount\":52000,\"currency\":\"COP\",\"payment_method_id\":\"QP\",\"payment_method_type\":\"WALLET\",\"payment_method_flow\":\"REDIRECT\",\"country\":\"CO\",\"created_date\":\"2025-01-17T14:35:09.000+0000\",\"status\":\"PENDING\",\"status_detail\":\"The payment is pending.\",\"status_code\":\"100\",\"order_id\":\"a55a645d-4fcd-4720-9128-abbcbe739d81\",\"notification_url\":\"https://sandbox.y.uno/dlocal-webhook/v1/confirmations\"}"
                },
                "third_party_transaction_id": "",
                "third_party_account_id": "",
                "iso8583_response_code": null,
                "iso8583_response_message": null
            },
            "connection_data": {
                "id": "c3f18893-9318-4652-90f6-7bb9d12cc160",
                "name": null
            },
            "device_fingerprint": null,
            "created_at": "2025-01-17T14:35:08.314925Z",
            "updated_at": "2025-01-17T14:35:18.832995Z"
        }
    ],
    "callback_url": "www.google.com",
    "workflow": "REDIRECT",
    "metadata": [],
    "fraud_screening": null,
    "payment_link_id": "",
    "subscription_code": null,
    "routing_rules": {
        "smart_routing": false,
        "condition": {
            "id": 130132,
            "name": null,
            "description": null
        }
    },
    "simplified_mode": false
}
```