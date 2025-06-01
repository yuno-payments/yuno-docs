---
title: Bank Transfer
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    This page presents examples of requests and responses for creating Bank
    Transfer payments using the Create Payment endpoint.
  robots: index
next:
  description: ''
---
This page presents examples of requests and responses for creating Bank Transfer payments using the [Create Payment](ref:create-payment) endpoint.

To test the creation of each payment, you can copy the content from the request code and use it on your machine or paste it on the [Create Payment](ref:create-payment) endpoint to test using Readme.

## Bank Transfer available examples

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
        onclick="window.location='bank-transfer-copy#bancolombia-button';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/bancolombia_logosimbolo.png" alt="Bancolombia Button logo">
          </div>
        </div>
        <span class='card-title'>Bancolombia Button</span>
      </div>
    </div>
    
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='bank-transfer-copy#daviplata';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/daviplata_logosimbolo.png" alt="Daviplata logo">
          </div>
        </div>
        <span class='card-title'>Daviplata</span>
      </div>
    </div>
    
        <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='bank-transfer-copy#pix';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/pix_logosimbolo.png" alt="PIX logo">
          </div>
        </div>
        <span class='card-title'>PIX</span>
      </div>
    </div>
    
    <!-- <div class="table-of-contents-btn" onclick="window.location='/reference/bank-transfer-examples#pse';">
      <p>
        PSE
      </p>
    </div> -->
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='bank-transfer-copy#pse';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/pse_logosimbolo.png" alt="PSE logo">
          </div>
        </div>
        <span class='card-title'>PSE</span>
      </div>
    </div>
    <!-- <div class="table-of-contents-btn" onclick="window.location='/reference/bank-transfer-examples#safetypay';">
      <p>
        SafetyPay
      </p>
    </div> -->
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='bank-transfer-copy#safetypay';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/safetypay_logosimbolo.png" alt="SafetyPay logo">
          </div>
        </div>
        <span class='card-title'>SafetyPay</span>
      </div>
    </div>
    <!-- <div class="table-of-contents-btn" onclick="window.location='/reference/bank-transfer-examples#spei-direct';">
      <p>
        SPEI Direct
      </p>
    </div> -->
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='bank-transfer-copy#spei';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/spei_logosimbolo.png" alt="SPEI Direct logo">
          </div>
        </div>
        <span class='card-title'>SPEI</span>
      </div>
    </div>
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='bank-transfer-copy#codi';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/codi_logosimbolo.png" alt="Codi logo">
          </div>
        </div>
        <span class='card-title'>Codi</span>
      </div>
    </div>
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='bank-transfer-copy#nupay';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/nubank_logosimbolo.png" alt="Nupay logo">
          </div>
        </div>
        <span class='card-title'>NuPay</span>
      </div>
    </div>
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='bank-transfer-copy#yappy';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/yappy_logosimbolo.png" alt="Yappy logo">
          </div>
        </div>
        <span class='card-title'>Yappy</span>
      </div>
    </div>


  </section>
</body>
`}</HTMLBlock>

### Bancolombia Button

Example of a request for a Bank Transfer payment using Bancolombia Button. Below you find the JSON body request example.

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
    "description": "Test Bancolombia",
    "account_id":"{{account-code}}",
    "merchant_order_id": "0000022",
    "country": "CO",
    "amount": {
        "currency": "COP",
        "value": 52000
    },
    "customer_payer": {
        "merchant_customer_id": "1689888489",
        "first_name": "Laila",
        "last_name": "CANO",
        "email": "Tyreek27@yahoo.com"
    },
    "workflow":"REDIRECT",
    "payment_method": {
        "type": "BANCOLOMBIA_TRANSFER"
    }
}'
```
```json Response(JSON)
{
    "id": "ac427adb-3ac9-4a7c-9389-0a923146b39b",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test Bancolombia",
    "country": "CO",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000022",
    "created_at": "2023-07-23T23:56:25.405475Z",
    "updated_at": "2023-07-23T23:56:29.742339Z",
    "amount": {
        "captured": 0.00,
        "currency": "COP",
        "refunded": 0.00,
        "value": 52000.00
    },
    "checkout": {
        "session": "c21df85b-6c39-4cf5-aa7d-305aac6441e6",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "BANCOLOMBIA_TRANSFER",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "bank_transfer": {
                "provider_image": "",
                "account_type": null,
                "bank_name": null,
                "beneficiary_name": null,
                "bank_account": null,
                "bank_account_2": null,
                "beneficiary_document_type": null,
                "beneficiary_document": null,
                "payment_instruction": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=2cc7ac83-029d-4e13-8360-9b627bba8fc5"
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "1689888489",
        "first_name": "Laila",
        "last_name": "CANO",
        "gender": null,
        "date_of_birth": null,
        "email": "Tyreek27@yahoo.com",
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
        "id": "acbf992c-e448-4efc-a39c-05f74fa624cf",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "BANK_TRANSFER",
        "amount": 52000.00,
        "provider_id": "WOMPI",
        "payment_method": {
            "vaulted_token": "",
            "type": "BANCOLOMBIA_TRANSFER",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "bank_transfer": {
                    "provider_image": "",
                    "account_type": null,
                    "bank_name": null,
                    "beneficiary_name": null,
                    "bank_account": null,
                    "bank_account_2": null,
                    "beneficiary_document_type": null,
                    "beneficiary_document": null,
                    "payment_instruction": null,
                    "redirect_url": "https://checkout.sandbox.y.uno/payment?session=2cc7ac83-029d-4e13-8360-9b627bba8fc5"
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test Bancolombia",
        "merchant_reference": null,
        "provider_data": {
            "id": "WOMPI",
            "transaction_id": "117490-1690156586-55850",
            "account_id": "",
            "status": "APPROVED",
            "sub_status": "",
            "status_detail": "",
            "response_message": "",
            "raw_response": {
                "data": {
                    "amount_in_cents": 5200000,
                    "bill_id": null,
                    "billing_data": null,
                    "created_at": "2023-07-23T23:56:26.350Z",
                    "currency": "COP",
                    "customer_data": null,
                    "customer_email": "Tyreek27@yahoo.com",
                    "finalized_at": null,
                    "id": "117490-1690156586-55850",
                    "payment_link_id": null,
                    "payment_method": {
                        "extra": {
                            "is_three_ds": false
                        },
                        "payment_description": "Test Bancolombia",
                        "sandbox_status": "APPROVED",
                        "type": "BANCOLOMBIA_TRANSFER",
                        "user_type": "PERSON"
                    },
                    "payment_method_type": "BANCOLOMBIA_TRANSFER",
                    "payment_source_id": null,
                    "redirect_url": "https://demo.dev.y.uno/checkout/status?checkoutSession=",
                    "reference": "acbf992c-e448-4efc-a39c-05f74fa624cf",
                    "shipping_address": null,
                    "status": "PENDING",
                    "status_message": null,
                    "taxes": []
                },
                "meta": {}
            },
            "third_party_transaction_id": ""
        },
        "created_at": "2023-07-23T23:56:25.506471Z",
        "updated_at": "2023-07-23T23:56:29.673135Z"
    },
    "split": [],
    "workflow": "REDIRECT",
    "metadata": []
}
```

### Daviplata

Example of a request for a Bank Transfer payment using Daviplata. Below you find the JSON body request example.

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
    "description": "Test DAVIPLATA",
    "account_id": "{{account-code}}",
    "merchant_order_id": "2342",
    "country": "CO",
    "nationality": "CO",
    "amount": {
        "currency": "COP",
        "value": 250
    },
    "customer_payer": {
        "id": "{{customer_id}}",
        "nationality": "CO",
            "document": {
                "document_type": "CC",
                "document_number": "1134568019"
            },
            "phone": {
                "number": "3209454322",
                "country_code": "57"
            }
    },
    "payment_method": {
        "type": "DAVIPLATA"
    },
    "workflow": "REDIRECT",
    "callback_url":"https://www.y.uno"

}'
```
```json Response(JSON)
{
    "id": "4e0c2314-7e8b-45e7-8e9c-a81ac2bc7388",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test DAVIPLATA",
    "country": "CO",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "2342",
    "created_at": "2025-03-10T15:17:43.967602Z",
    "updated_at": "2025-03-10T15:17:45.608775Z",
    "amount": {
        "captured": 0.00,
        "currency": "COP",
        "currency_conversion": null,
        "refunded": 0.00,
        "value": 250.00
    },
    "checkout": {
        "session": "fc35a4cf-953a-49eb-8793-754682af4d06",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "DAVIPLATA",
        "vault_on_success": false,
        "token": "",
        "parent_payment_method_type": null,
        "payment_method_detail": {
            "bank_transfer": {
                "provider_image": null,
                "account_type": null,
                "bank_name": null,
                "beneficiary_name": null,
                "bank_account": null,
                "bank_account_2": null,
                "beneficiary_document_type": null,
                "beneficiary_document": null,
                "reference": null,
                "payment_instruction": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=95ad4b07-55db-4a2a-85f7-60171d8511a1",
                "installments": 0,
                "installments_plan_id": null,
                "first_installment_deferral": 0,
                "installments_type": "",
                "installment_amount": null
            }
        }
    },
    "customer_payer": {
        "id": "4a99dc32-396b-4bc6-a97c-9282c1e767e0",
        "merchant_customer_id": "1740080217",
        "first_name": "Daniel",
        "last_name": "Vanegas",
        "gender": null,
        "date_of_birth": null,
        "email": "Destiney_Botsford49@hotmail.com",
        "nationality": "CO",
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
            "document_number": "1134568019"
        },
        "phone": {
            "number": "3209454322",
            "country_code": "57"
        },
        "billing_address": {
            "address_line_1": "line 1",
            "address_line_2": "",
            "country": "CO",
            "city": "Bogota",
            "neighborhood": null
        },
        "shipping_address": {
            "address_line_1": "line 1",
            "address_line_2": "",
            "country": "CO",
            "city": "Bogota",
            "neighborhood": null
        },
        "merchant_customer_created_at": null
    },
    "additional_data": null,
    "transactions": {
        "id": "16d5b42c-bc66-4020-9bc2-2e711e49109c",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "BANK_TRANSFER",
        "amount": 250.00,
        "provider_id": "DAVIPLATA",
        "payment_method": {
            "vaulted_token": "",
            "type": "DAVIPLATA",
            "vault_on_success": false,
            "token": "",
            "parent_payment_method_type": null,
            "detail": {
                "bank_transfer": {
                    "provider_image": null,
                    "account_type": null,
                    "bank_name": null,
                    "beneficiary_name": null,
                    "bank_account": null,
                    "bank_account_2": null,
                    "beneficiary_document_type": null,
                    "beneficiary_document": null,
                    "reference": null,
                    "payment_instruction": null,
                    "redirect_url": "https://checkout.sandbox.y.uno/payment?session=95ad4b07-55db-4a2a-85f7-60171d8511a1",
                    "installments": 0,
                    "installments_plan_id": null,
                    "first_installment_deferral": 0,
                    "installments_type": "",
                    "installment_amount": null
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test DAVIPLATA",
        "merchant_reference": "2342",
        "provider_data": {
            "id": "DAVIPLATA",
            "transaction_id": "82546960",
            "account_id": "",
            "status": "",
            "sub_status": "",
            "status_detail": "",
            "response_message": null,
            "response_code": null,
            "raw_response": {
                "fechaExpiracionToken": "2025-03-10T10:20:44.903-05:00",
                "idSessionToken": "82546960"
            },
            "third_party_transaction_id": "",
            "third_party_account_id": null,
            "iso8583_response_code": null,
            "iso8583_response_message": null
        },
        "connection_data": {
            "id": "659b27db-02a6-421f-968c-6dd9e52fcb2d",
            "name": null
        },
        "created_at": "2025-03-10T15:17:44.161125Z",
        "updated_at": "2025-03-10T15:17:45.449302Z"
    },
    "transactions_history": [
        {
            "id": "16d5b42c-bc66-4020-9bc2-2e711e49109c",
            "type": "PURCHASE",
            "status": "CREATED",
            "category": "BANK_TRANSFER",
            "amount": 250.00,
            "provider_id": "DAVIPLATA",
            "payment_method": {
                "vaulted_token": "",
                "type": "DAVIPLATA",
                "vault_on_success": false,
                "token": "",
                "parent_payment_method_type": null,
                "detail": {
                    "bank_transfer": {
                        "provider_image": null,
                        "account_type": null,
                        "bank_name": null,
                        "beneficiary_name": null,
                        "bank_account": null,
                        "bank_account_2": null,
                        "beneficiary_document_type": null,
                        "beneficiary_document": null,
                        "reference": null,
                        "payment_instruction": null,
                        "redirect_url": "https://checkout.sandbox.y.uno/payment?session=95ad4b07-55db-4a2a-85f7-60171d8511a1",
                        "installments": 0,
                        "installments_plan_id": null,
                        "first_installment_deferral": 0,
                        "installments_type": "",
                        "installment_amount": null
                    }
                }
            },
            "response_code": "SUCCEEDED",
            "response_message": "Transaction successful",
            "reason": null,
            "description": "Test DAVIPLATA",
            "merchant_reference": "2342",
            "provider_data": {
                "id": "DAVIPLATA",
                "transaction_id": "82546960",
                "account_id": "",
                "status": "",
                "sub_status": "",
                "status_detail": "",
                "response_message": null,
                "response_code": null,
                "raw_response": {
                    "fechaExpiracionToken": "2025-03-10T10:20:44.903-05:00",
                    "idSessionToken": "82546960"
                },
                "third_party_transaction_id": "",
                "third_party_account_id": null,
                "iso8583_response_code": null,
                "iso8583_response_message": null
            },
            "connection_data": {
                "id": "659b27db-02a6-421f-968c-6dd9e52fcb2d",
                "name": null
            },
            "created_at": "2025-03-10T15:17:44.161125Z",
            "updated_at": "2025-03-10T15:17:45.449302Z"
        }
    ],
    "callback_url": "https://www.y.uno",
    "workflow": "REDIRECT",
    "metadata": [],
    "fraud_screening": null,
    "payment_link_id": "",
    "subscription_code": null,
    "routing_rules": {
        "smart_routing": false,
        "monitors": false,
        "condition": {
            "id": 8030,
            "name": null,
            "description": null
        }
    },
    "simplified_mode": false
}
```

###

### PIX

Example of a request for a Bank Transfer payment using PIX. Below you find the JSON body request example.

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
    "description": "Test PIX",
    "account_id":"{{account-code}}",
    "merchant_order_id": "0000022",
    "country": "BR",
    "amount": {
        "currency": "BRL",
        "value": 50
    },
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
    "customer_payer": {
        "merchant_customer_id": "{{$timestamp}}",
        "first_name": "{{$randomFirstName}}",
        "last_name": "CANO",
        "email": "{{$randomEmail}}",
        "phone": {
                "number": "11992149494",
                "country_code": "55"
        },
        "document": {
                "document_type": "CPF",
                "document_number": "47033278802"
        }
    },
    "workflow":"REDIRECT",
    "payment_method": {
        "type": "PIX"
    }
}
'
```
```json Response (JSON)
{
    "id": "ddaf6fd2-8979-4dbd-9153-78943d4e5c54",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test PIX",
    "country": "BR",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000022",
    "created_at": "2023-07-23T23:58:45.847010Z",
    "updated_at": "2023-07-23T23:58:47.118363Z",
    "amount": {
        "captured": 0.00,
        "currency": "BRL",
        "refunded": 0.00,
        "value": 50.00
    },
    "checkout": {
        "session": "19debe0c-ce52-4ecb-8d58-b9478334a8c2",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "PIX",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "bank_transfer": {
                "provider_image": "https://mock-institution.spinpay.com.br/v1/checkouts/qrcode?pspReferenceId=6f9714f7-7c24-43d1-aa4f-f87bd20fefaa&paymentMethodType=payment",
                "account_type": null,
                "bank_name": null,
                "beneficiary_name": null,
                "bank_account": null,
                "bank_account_2": null,
                "beneficiary_document_type": null,
                "beneficiary_document": null,
                "payment_instruction": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=8af24a53-11d8-4c59-afdc-2b87736765f6"
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "1690156724",
        "first_name": "Laura",
        "last_name": "CANO",
        "gender": null,
        "date_of_birth": null,
        "email": "Kathleen68@gmail.com",
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
            "document_number": "47033278802"
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
        "seller_details": null
    },
    "taxes": null,
    "transactions": {
        "id": "cf773de9-8587-43f5-9db0-40e710a14762",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "BANK_TRANSFER",
        "amount": 50.00,
        "provider_id": "SPINPAY",
        "payment_method": {
            "vaulted_token": "",
            "type": "PIX",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "bank_transfer": {
                    "provider_image": "https://mock-institution.spinpay.com.br/v1/checkouts/qrcode?pspReferenceId=6f9714f7-7c24-43d1-aa4f-f87bd20fefaa&paymentMethodType=payment",
                    "account_type": null,
                    "bank_name": null,
                    "beneficiary_name": null,
                    "bank_account": null,
                    "bank_account_2": null,
                    "beneficiary_document_type": null,
                    "beneficiary_document": null,
                    "payment_instruction": null,
                    "redirect_url": "https://checkout.sandbox.y.uno/payment?session=8af24a53-11d8-4c59-afdc-2b87736765f6"
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test PIX",
        "merchant_reference": null,
        "provider_data": {
            "id": "SPINPAY",
            "transaction_id": "6f9714f7-7c24-43d1-aa4f-f87bd20fefaa",
            "account_id": "",
            "status": "WAITING_PAYMENT_METHOD",
            "sub_status": "",
            "status_detail": "",
            "response_message": "",
            "raw_response": {
                "value": "{\"paymentMethodType\":\"pix\",\"status\":\"WAITING_PAYMENT_METHOD\",\"pspReferenceId\":\"6f9714f7-7c24-43d1-aa4f-f87bd20fefaa\",\"referenceId\":\"cf773de9-8587-43f5-9db0-40e710a14762\"}"
            },
            "third_party_transaction_id": ""
        },
        "created_at": "2023-07-23T23:58:45.964691Z",
        "updated_at": "2023-07-23T23:58:47.042142Z"
    },
    "split": [],
    "workflow": "REDIRECT",
    "metadata": []
}
```

### PSE

Example of a request for a Bank Transfer payment using PSE. Below you find the JSON body request example.

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
    "description": "Test PSE",
    "account_id":"{{account-code}}",
    "merchant_order_id": "0000022",
    "country": "CO",
    "amount": {
        "currency": "COP",
        "value": 52000
    },
     "customer_payer": {
        "email": "pepitoperez@y.uno",
        "first_name": "Pepito",
        "last_name": "Perez",
        "merchant_customer_id": "example00234",
        "document": {
            "document_type": "CC",
            "document_number": "38799999"
        }   
    },
    "payment_method": {
        "type": "PSE",
        "detail": {
            "issuer_id": "1552"
        }
    },
    "workflow": "REDIRECT",
    "callback_url":"www.google.com"
}'
```
```json Response(JSON)
{
    "id": "7453777e-019f-498d-9d3e-745788fb4392",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test PSE",
    "country": "CO",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000022",
    "created_at": "2023-07-24T00:00:49.599551Z",
    "updated_at": "2023-07-24T00:00:50.989567Z",
    "amount": {
        "captured": 0.00,
        "currency": "COP",
        "refunded": 0.00,
        "value": 52000.00
    },
    "checkout": {
        "session": "0dbe0a3e-f6db-4b08-a59a-60f11d7adc59",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "PSE",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "bank_transfer": {
                "provider_image": null,
                "account_type": null,
                "bank_name": null,
                "beneficiary_name": null,
                "bank_account": null,
                "bank_account_2": null,
                "beneficiary_document_type": null,
                "beneficiary_document": null,
                "payment_instruction": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=023f18b4-b432-4e39-9fe6-029dfba314fc"
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
        "document": {
            "document_type": "CC",
            "document_number": "38799999"
        },
        "phone": null,
        "billing_address": null,
        "shipping_address": null
    },
    "additional_data": null,
    "taxes": null,
    "transactions": {
        "id": "f52a82b5-05c1-4e68-8763-12170ab031de",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "BANK_TRANSFER",
        "amount": 52000.00,
        "provider_id": "UNLIMINT",
        "payment_method": {
            "vaulted_token": "",
            "type": "PSE",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "bank_transfer": {
                    "provider_image": null,
                    "account_type": null,
                    "bank_name": null,
                    "beneficiary_name": null,
                    "bank_account": null,
                    "bank_account_2": null,
                    "beneficiary_document_type": null,
                    "beneficiary_document": null,
                    "payment_instruction": null,
                    "redirect_url": "https://checkout.sandbox.y.uno/payment?session=023f18b4-b432-4e39-9fe6-029dfba314fc"
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test PSE",
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
                "redirect_url": "https://sandbox.cardpay.com/MI/payment.html?uuid=b5FB0E67GH3FEHg52gBcCe3g"
            },
            "third_party_transaction_id": ""
        },
        "created_at": "2023-07-24T00:00:49.709255Z",
        "updated_at": "2023-07-24T00:00:50.909513Z"
    },
    "split": [],
    "callback_url": "www.google.com",
    "workflow": "REDIRECT",
    "metadata": []
}
```

### SafetyPay

Example of a request for a Bank Transfer payment using SafetyPay. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

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
    "description": "Test Safetypay",
    "account_id":"{{account-code}}",
    "merchant_order_id": "0000022",
    "country": "CO",
    "amount": {
        "currency": "COP",
        "value": 52000
    },
    "customer_payer": {
        "merchant_customer_id": "1689888489",
        "first_name": "Laila",
        "last_name": "CANO",
        "email": "Tyreek27@yahoo.com"
    },
    "workflow":"REDIRECT",
    "payment_method": {
        "type": "SAFETYPAY"
    }
}
'
```
```json Response (JSON)
{
    "id": "ba669392-a6ec-43f6-851c-8bda35064883",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test Safetypay",
    "country": "CO",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000022",
    "created_at": "2023-07-24T00:02:28.873396Z",
    "updated_at": "2023-07-24T00:02:30.433830Z",
    "amount": {
        "captured": 0.00,
        "currency": "COP",
        "refunded": 0.00,
        "value": 52000.00
    },
    "checkout": {
        "session": "29eddfbb-b816-4c79-ad73-80b1ebdf6ef7",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "SAFETYPAY",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "bank_transfer": {
                "provider_image": "",
                "account_type": null,
                "bank_name": null,
                "beneficiary_name": null,
                "bank_account": null,
                "bank_account_2": null,
                "beneficiary_document_type": null,
                "beneficiary_document": null,
                "payment_instruction": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=eeb162be-f85b-46d9-9656-5da588731f11"
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "1689888489",
        "first_name": "Laila",
        "last_name": "CANO",
        "gender": null,
        "date_of_birth": null,
        "email": "Tyreek27@yahoo.com",
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
        "id": "5576f7fd-6cd9-4c9b-b177-d3e03d4c7fe5",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "BANK_TRANSFER",
        "amount": 52000.00,
        "provider_id": "SAFETYPAY",
        "payment_method": {
            "vaulted_token": "",
            "type": "SAFETYPAY",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "bank_transfer": {
                    "provider_image": "",
                    "account_type": null,
                    "bank_name": null,
                    "beneficiary_name": null,
                    "bank_account": null,
                    "bank_account_2": null,
                    "beneficiary_document_type": null,
                    "beneficiary_document": null,
                    "payment_instruction": null,
                    "redirect_url": "https://checkout.sandbox.y.uno/payment?session=eeb162be-f85b-46d9-9656-5da588731f11"
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test Safetypay",
        "merchant_reference": null,
        "provider_data": {
            "id": "SAFETYPAY",
            "transaction_id": "0123205719487787",
            "account_id": "",
            "status": "",
            "sub_status": "",
            "status_detail": "",
            "response_message": "",
            "raw_response": {
                "custom_data": null,
                "digest_check": "518D2E7CCF370349C7DB00BBEA85FA92B11D77E2CD10854CFF3E7DB385633506",
                "error": null,
                "gateway_token_url": "https://sandbox-gateway.safetypay.com/Express4/Checkout/index?TokenID=764ad33a-2cb7-4a9e-b121-1d5839b985e9&CountryID=COL&ChannelID=ONLINE",
                "operation_id": "0123205719487787",
                "request_id": "prop_4c7e8b27-3fa6-452b-acec-d75faa7d3c6b",
                "response_datetime": "2023-07-24T00:01:14"
            },
            "third_party_transaction_id": ""
        },
        "created_at": "2023-07-24T00:02:28.992359Z",
        "updated_at": "2023-07-24T00:02:30.363143Z"
    },
    "split": [],
    "workflow": "REDIRECT",
    "metadata": []
}
```

### SPEI

Example of a request for a Bank Transfer payment using SPEI Direct. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

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
    "description": "Test SPEI",
    "account_id":"{{account-code}}",
    "merchant_order_id": "0000022",
    "country": "MX",
    "amount": {
        "currency": "MXN",
        "value": 500
    },
    "customer_payer": {
        "merchant_customer_id": "1689888489",
        "first_name": "Laila",
        "last_name": "CANO",
        "email": "Tyreek27@yahoo.com"
        },
    "payment_method": {
        "type": "SPEI"
    },
    "workflow": "REDIRECT",
    "callback_url":"www.google.com"
}
'
```
```json Response (JSON)
{
    "id": "5053898d-7873-4326-8213-8eb6edb3e018",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test SPEI",
    "country": "MX",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000022",
    "created_at": "2023-07-24T00:07:47.136260Z",
    "updated_at": "2023-07-24T00:07:48.269931Z",
    "amount": {
        "captured": 0.00,
        "currency": "MXN",
        "refunded": 0.00,
        "value": 500.00
    },
    "checkout": {
        "session": "2cc3a88b-2d2a-4bd4-a27a-0136681003aa",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "SPEI",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "bank_transfer": {
                "provider_image": null,
                "account_type": null,
                "bank_name": null,
                "beneficiary_name": null,
                "bank_account": null,
                "bank_account_2": null,
                "beneficiary_document_type": null,
                "beneficiary_document": null,
                "payment_instruction": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=0d081a4b-3bad-425d-b7bc-554e41b24517"
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "1689888489",
        "first_name": "Laila",
        "last_name": "CANO",
        "gender": null,
        "date_of_birth": null,
        "email": "Tyreek27@yahoo.com",
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
        "id": "b96c2560-4d08-466a-b5a5-09f06defc281",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "BANK_TRANSFER",
        "amount": 500.00,
        "provider_id": "UNLIMINT",
        "payment_method": {
            "vaulted_token": "",
            "type": "SPEI",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "bank_transfer": {
                    "provider_image": null,
                    "account_type": null,
                    "bank_name": null,
                    "beneficiary_name": null,
                    "bank_account": null,
                    "bank_account_2": null,
                    "beneficiary_document_type": null,
                    "beneficiary_document": null,
                    "payment_instruction": null,
                    "redirect_url": "https://checkout.sandbox.y.uno/payment?session=0d081a4b-3bad-425d-b7bc-554e41b24517"
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test SPEI",
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
                "redirect_url": "https://sandbox.cardpay.com/MI/payment.html?uuid=ADb78CG6FHg1HGFHHBBhb8CH"
            },
            "third_party_transaction_id": ""
        },
        "created_at": "2023-07-24T00:07:47.330334Z",
        "updated_at": "2023-07-24T00:07:48.211096Z"
    },
    "split": [],
    "callback_url": "www.google.com",
    "workflow": "REDIRECT",
    "metadata": []
}
```

### Codi

Example of a request for a Bank Transfer payment using Codi. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

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
    "description": "Test CODI",
    "account_id":"{{account-code}}",
    "merchant_order_id": "0000022",
    "country": "MX",
    "amount": {
        "currency": "MXN",
        "value": 500
    },
    "customer_payer": {
        "merchant_customer_id": "1689888489",
        "first_name": "Laila",
        "last_name": "CANO",
        "email": "Tyreek27@yahoo.com"
        },
    "payment_method": {
        "type": "CODI"
    },
    "workflow": "REDIRECT",
    "callback_url":"www.google.com"
}
'
```
```json Response (JSON)
{
    "id": "83742602-9b4a-4e22-8f53-a131bfb91451",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test CODI",
    "country": "MX",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000022",
    "created_at": "2023-07-24T00:10:16.478117Z",
    "updated_at": "2023-07-24T00:10:17.136486Z",
    "amount": {
        "captured": 0.00,
        "currency": "MXN",
        "refunded": 0.00,
        "value": 500.00
    },
    "checkout": {
        "session": "41df2a11-82dc-4a17-9fa9-34a078bcb5d4",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "85118a4a-5751-489e-bff0-c5eca07da0a6",
        "type": "CODI",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "bank_transfer": {
                "provider_image": null,
                "account_type": null,
                "bank_name": null,
                "beneficiary_name": null,
                "bank_account": null,
                "bank_account_2": null,
                "beneficiary_document_type": null,
                "beneficiary_document": null,
                "payment_instruction": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=35fb1c32-1ad9-4200-8cb8-438aaee01c3a"
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "1689888489",
        "first_name": "Laila",
        "last_name": "CANO",
        "gender": null,
        "date_of_birth": null,
        "email": "Tyreek27@yahoo.com",
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
        "id": "35978342-112a-43db-9e26-210544594284",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "BANK_TRANSFER",
        "amount": 500.00,
        "provider_id": "UNLIMINT",
        "payment_method": {
            "vaulted_token": "85118a4a-5751-489e-bff0-c5eca07da0a6",
            "type": "CODI",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "bank_transfer": {
                    "provider_image": null,
                    "account_type": null,
                    "bank_name": null,
                    "beneficiary_name": null,
                    "bank_account": null,
                    "bank_account_2": null,
                    "beneficiary_document_type": null,
                    "beneficiary_document": null,
                    "payment_instruction": null,
                    "redirect_url": "https://checkout.sandbox.y.uno/payment?session=35fb1c32-1ad9-4200-8cb8-438aaee01c3a"
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test CODI",
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
                "redirect_url": "https://sandbox.cardpay.com/MI/payment.html?uuid=fgEC84E46b4C486F1HBFd783"
            },
            "third_party_transaction_id": ""
        },
        "created_at": "2023-07-24T00:10:16.641134Z",
        "updated_at": "2023-07-24T00:10:17.029133Z"
    },
    "split": [],
    "callback_url": "www.google.com",
    "workflow": "REDIRECT",
    "metadata": []
}
```

### Nupay

Example of a request for a Bank Transfer payment using Nupay. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

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
    "description": "Test Nupay",
    "account_id":"{{account-code}}",
    "merchant_order_id": "0000022",
    "country": "BR",
    "amount": {
        "currency": "BRL",
        "value": 50
    },
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
    "customer_payer": {
        "merchant_customer_id": "{{$timestamp}}",
        "first_name": "{{$randomFirstName}}",
        "last_name": "CANO",
        "email": "{{$randomEmail}}",
        "phone": {
                "number": "11992149494",
                "country_code": "55"
        },
        "document": {
                "document_type": "CPF",
                "document_number": "47033278802"
        }
    },
    "workflow":"REDIRECT",
    "payment_method": {
        "type": "NU_PAY"
    }
}
'
```
```json Response (JSON)
{
    "id": "eb0e74bd-ae06-43f0-87ae-d1ecb6287ecb",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test Nupay",
    "country": "BR",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000022",
    "created_at": "2023-07-24T00:13:49.812932Z",
    "updated_at": "2023-07-24T00:13:50.673896Z",
    "amount": {
        "captured": 0.00,
        "currency": "BRL",
        "refunded": 0.00,
        "value": 50.00
    },
    "checkout": {
        "session": "2a5a20a4-4e47-4385-95cb-28a2bfa45744",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "NU_PAY",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "bank_transfer": {
                "provider_image": "",
                "account_type": null,
                "bank_name": null,
                "beneficiary_name": null,
                "bank_account": null,
                "bank_account_2": null,
                "beneficiary_document_type": null,
                "beneficiary_document": null,
                "payment_instruction": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=6ec58229-d200-4616-ba97-427687744e2a"
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "1690157629",
        "first_name": "Beryl",
        "last_name": "CANO",
        "gender": null,
        "date_of_birth": null,
        "email": "Brennon25@hotmail.com",
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
            "document_number": "47033278802"
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
        "seller_details": null
    },
    "taxes": null,
    "transactions": {
        "id": "2563946f-eaa3-4c86-86ec-e4c1bad29ece",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "BANK_TRANSFER",
        "amount": 50.00,
        "provider_id": "SPINPAY",
        "payment_method": {
            "vaulted_token": "",
            "type": "NU_PAY",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "bank_transfer": {
                    "provider_image": "",
                    "account_type": null,
                    "bank_name": null,
                    "beneficiary_name": null,
                    "bank_account": null,
                    "bank_account_2": null,
                    "beneficiary_document_type": null,
                    "beneficiary_document": null,
                    "payment_instruction": null,
                    "redirect_url": "https://checkout.sandbox.y.uno/payment?session=6ec58229-d200-4616-ba97-427687744e2a"
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test Nupay",
        "merchant_reference": null,
        "provider_data": {
            "id": "SPINPAY",
            "transaction_id": "b4ef43a8-4f40-44d8-bd71-b745de7cf572",
            "account_id": "",
            "status": "WAITING_PAYMENT_METHOD",
            "sub_status": "",
            "status_detail": "",
            "response_message": "",
            "raw_response": {
                "value": "{\"paymentUrl\":\"https://staging-nuapp.nubank.com.br/bdc/omniknight/expr/payment-intents.home-screen?payment-intent-id=6549a8e5-cee9-480e-b299-7b91bb95beac&amount=5000&storeName=Spin%20Pay%20VTEX&token=oqpzweylvctA0ijhDroXbWQfux5streHy0zZGHfhL88NBX%2BI4V3%2BZLuFyFTWrV0O9FErst0wYJblK%2BQmpmsxAg%3D%3D&poId=b4ef43a8-4f40-44d8-bd71-b745de7cf572\",\"paymentMethodType\":\"nupay\",\"status\":\"WAITING_PAYMENT_METHOD\",\"pspReferenceId\":\"b4ef43a8-4f40-44d8-bd71-b745de7cf572\",\"referenceId\":\"2563946f-eaa3-4c86-86ec-e4c1bad29ece\"}"
            },
            "third_party_transaction_id": ""
        },
        "created_at": "2023-07-24T00:13:50.028555Z",
        "updated_at": "2023-07-24T00:13:50.610887Z"
    },
    "split": [],
    "workflow": "REDIRECT",
    "metadata": []
}
```

### Yappy

Example of a request for a Bank Transfer payment using Yappy. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

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
    "description": "Test YAPPY",
    "account_id":"{{account-code}}",
    "merchant_order_id": "0000022",
    "country": "PA",
    "amount": {
        "currency": "USD",
        "value": 5
    },
    "customer_payer": {
        "merchant_customer_id": "1690158249",
        "first_name": "Kennedy",
        "last_name": "CANO",
        "email": "test@gmail.com",
        "phone": {
            "country_code": "507",
            "number": "67480618"
        }
    },
    "payment_method": {
        "type": "YAPPY"
    },
    "workflow":"REDIRECT",
    "callback_url":"www.google.com"
}
'
```
```json Response (JSON)
{
    "id": "c32784da-09c4-4bdc-9ae5-bdd0e7259c6b",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test YAPPY",
    "country": "PA",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000022",
    "created_at": "2023-07-24T00:24:10.343969Z",
    "updated_at": "2023-07-24T00:24:11.682062Z",
    "amount": {
        "captured": 0.00,
        "currency": "USD",
        "refunded": 0.00,
        "value": 5.00
    },
    "checkout": {
        "session": "2ec253c5-52f3-4a44-a4b6-ab00e53cdf8e",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "YAPPY",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "bank_transfer": {
                "provider_image": "",
                "account_type": null,
                "bank_name": null,
                "beneficiary_name": null,
                "bank_account": null,
                "bank_account_2": null,
                "beneficiary_document_type": null,
                "beneficiary_document": null,
                "payment_instruction": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=2a1cdeb4-cdb0-4ed4-8c83-9806937cbc63"
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "1690158249",
        "first_name": "Kennedy",
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
        "phone": {
            "number": "67480618",
            "country_code": "507"
        },
        "billing_address": null,
        "shipping_address": null
    },
    "additional_data": null,
    "taxes": null,
    "transactions": {
        "id": "fd45fde9-bf8b-48e7-8294-77cc4aa0291e",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "BANK_TRANSFER",
        "amount": 5.00,
        "provider_id": "YAPPY",
        "payment_method": {
            "vaulted_token": "",
            "type": "YAPPY",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "bank_transfer": {
                    "provider_image": "",
                    "account_type": null,
                    "bank_name": null,
                    "beneficiary_name": null,
                    "bank_account": null,
                    "bank_account_2": null,
                    "beneficiary_document_type": null,
                    "beneficiary_document": null,
                    "payment_instruction": null,
                    "redirect_url": "https://checkout.sandbox.y.uno/payment?session=2a1cdeb4-cdb0-4ed4-8c83-9806937cbc63"
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test YAPPY",
        "merchant_reference": null,
        "provider_data": {
            "id": "YAPPY",
            "transaction_id": "warHCQl43oDUV1K",
            "account_id": "",
            "status": "",
            "sub_status": "",
            "status_detail": "",
            "response_message": "",
            "raw_response": {
                "accessToken": "eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ.ZJj47qlbH_fbzpSY2tr4xeoPrRZDe0DOfFdsal1jyL-luVUq7BcD66lExlg3tvtC96W9Y9f_dMX7_j2xKbT6BavUr-NMeEhkM5Ih6AqbzqV00AnjlifJpYMQyDZbV6kuakPeuDTx3UZUB0BnkzSu8oOsSvYEaaVRYAxKgy24YCE.IHj7-TgyFpNHVISG.U7rNPVrOuyC1_A1zlIatgE7usM6ZSdo1GEFf8xC7NgSxqtZ93-FusucdmatQMiceEHGFiIEmM4tYEyvddV1WFhax1eDvx7Z3DydePi5AgHPdlVS65A.Oo9Q3IW1_GCaP2nOm4gjtA",
                "success": true,
                "unixTimestamp": 1690158251
            },
            "third_party_transaction_id": ""
        },
        "created_at": "2023-07-24T00:24:10.464997Z",
        "updated_at": "2023-07-24T00:24:11.614393Z"
    },
    "split": [],
    "callback_url": "www.google.com",
    "workflow": "REDIRECT",
    "metadata": []
}
```
