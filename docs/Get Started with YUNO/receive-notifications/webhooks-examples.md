---
title: Webhooks Examples
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
# JSON notification attributes

The attributes of the JSON for the Yuno webhooks are listed below:

<HTMLBlock>{`
<body>
  <div class="yuno">
    <p><strong>account_id</strong> <small>string </small>
      <br />The unique identifier of the account in Yuno (MAX 64 ; MIN 36).
    </p>
  </div>
  <div class="yuno">
    <p><strong>type</strong> <small>string </small>
      <br />Specifies the notification type.
    </p>
  </div>
  <div class="yuno">
    <p><strong>type.event</strong> <small>string </small>
      <br />Specifies the event notification type.
    </p>
  </div>
  <div class="yuno">
    <p><strong>version</strong> <small>string </small>
      <br />Specifies the version of the webhook sent. Currently 2. 
    </p>
  </div>
  <div class="yuno">
    <p><strong>retry</strong> <small>string </small>
      <br />Specifies the number of retries for that notification. 
    </p>
  </div>
  <div class="yuno">
    <p><strong>data</strong> <small>string </small>
      <p>Specifies the <a
          href="the-payment-object">payment</a> (for payment type) or <a
          href="the-payment-method-object-checkout">payment method object</a> (for enrollment).</p>
    </p>
  </div>
</body>
<style>
  :root {
    --yuno-main-color: #614AD6;
    --yellow: #CEE65A;
  }

  details {
    display: flex;
    overflow: hidden;
  }

  p {
    margin-left: 20px;
  }

  .yuno {
    --highlight: var(#eee);
    background: #eee;
    margin: 1.5em;
    border-radius: 5px;
    border-left: 15px solid var(--yuno-main-color);
    padding: 0.25em;
  }
</style>
`}</HTMLBlock>

# Examples

Yuno provides several webhooks related to enrollment and payment notifications. Here you will find some examples of data structures related to each event.

## Payment

### Payment Webhook V1

The next JSON object presents an example of a data structure related to a payment event from Webhook V1.

```json JSON
{
   "payment":{
      "code":"b3da6717-7949-454e-8699-e449bfaccb69",
      "id":"b3da6717-7949-454e-8699-e449bfaccb69",
      "idempotency_key":"28f14927-421b-4424-b4d2-5de4d83ca138",
      "organization_code":"9c99108c-7681-4d48-acca-bce037685e99",
      "account_code":"c004cfd7-0c65-4add-b9b3-3d7e3949c9f1",
      "account_id":"c004cfd7-0c65-4add-b9b3-3d7e3949c9f1",
      "description":"test description",
      "country":"CO",
      "status":"SUCCEEDED",
      "sub_status":"APPROVED",
      "order_id":"1679531154456",
      "merchant_order_id":"1679531154456",
      "created_at":"2023-03-23T00:26:38.093810Z",
      "updated_at":"2023-03-23T00:26:51.285333Z",
      "amount":{
         "currency":"COP",
         "value":2000.0,
         "refunded":0.0,
         "captured":0.0
      },
      "checkout":{
         "session":"fb98b19d-39c0-42d2-bed6-438605458964",
         "sdk_action_required":false
      },
      "customer_payer":{
         "code":"8122d1f5-c07d-4d88-9dfe-a09ccdaeda0b",
         "id":"8122d1f5-c07d-4d88-9dfe-a09ccdaeda0b",
         "organization_customer_external_id":"1679531154456",
         "merchant_customer_id":"1679531154456",
         "first_name":"Aaron",
         "last_name":"Hegmann",
         "gender":"F",
         "date_of_birth":"1990-02-28",
         "email":"andrea@y.uno",
         "nationality":"CO",
         "ip_address":"192.168.123.167",
         "device_fingerprint":"278994bb-9ece-5c63-8c44-c03481851625",
         "browser_info":null,
         "document":{
            "document_number":"1032765432",
            "document_type":"CC"
         },
         "billing_address":{
            "address_line_1":"Calle 34 # 56 - 78",
            "address_line_2":"Apartamento 502, Torre I",
            "city":"Bogotá",
            "country":"CO",
            "state":"Cundinamarca",
            "zip_code":"111111"
         },
         "shipping_address":{
            "address_line_1":"Calle 34 # 56 - 78",
            "address_line_2":"Apartamento 502, Torre I",
            "city":"Bogotá",
            "country":"CO",
            "state":"Cundinamarca",
            "zip_code":"111111"
         },
         "phone":{
            "country_code":"57",
            "number":"3991111111"
         }
      },
      "additional_data":{
         "order":{
            "shipping_amount":0.0,
            "fee_amount":0.0,
            "items":[
               {
                  "id":"123AD",
                  "name":"Skirt",
                  "quantity":1,
                  "unit_amount":2000.0,
                  "category":"Clothes",
                  "brand":"XYZ",
                  "sku_code":"8765432109",
                  "manufacture_part_number":"XYZ123456"
               }
            ]
         },
         "airline":null
      },
      "transactions":{
         "code":"98c80022-fe05-4b9b-b478-2e102fc72cc3",
         "id":"98c80022-fe05-4b9b-b478-2e102fc72cc3",
         "type":"PURCHASE",
         "status":"SUCCEEDED",
         "category":"CARD",
         "amount":2000.0,
         "provider_id":"KUSHKI",
         "response_code":"SUCCEEDED",
         "merchant_reference":null,
         "response_message":"Transaction successful",
         "reason":null,
         "description":"test description",
         "created_at":"2023-03-23T00:26:38.290239Z",
         "updated_at":"2023-03-23T00:26:51.258039Z",
         "payment_method":{
            "token":"e12440ca-920c-4aab-b656-6ed63f9ed5ac",
            "type":"CARD",
            "vaulted_token":null,
            "vault_on_success":false,
            "payment_method_detail":{
               "card":{
                  "verify":null,
                  "capture":false,
                  "installments":1,
                  "first_installment_deferral":null,
                  "installments_amount":null,
                  "installments_type":null,
                  "soft_descriptor":"",
                  "authorization_code":"",
                  "retrieval_reference_number":"",
                  "voucher":null,
                  "card_data":{
                     "holder_name":"APROBADO",
                     "iin":"54519515",
                     "lfd":"5480",
                     "number_length":16,
                     "security_code_length":3,
                     "brand":"MASTERCARD",
                     "issuer_name":"BANCO DE LA PRODUCCION S.A. (PRODUBANCO)",
                     "issuer_code":null,
                     "category":"BLACK",
                     "type":"CREDIT"
                  }
               },
               "wallet":null,
               "bnpl":null,
               "bank_transfer":null,
               "payment_link":null
            }
         },
         "provider":{
            "provider_transaction_id":"488990863216107201"
         },
         "provider_data":{
            "raw_response":{
               "details":{
                  "amount":{
                     "currency":"COP",
                     "ice":0,
                     "iva":0,
                     "subtotalIva":0,
                     "subtotalIva0":2000
                  },
                  "approvalCode":"000000",
                  "approvedTransactionAmount":2000,
                  "binInfo":{
                     "bank":"Banco de la Produccion S.A. (PRODUBANCO)",
                     "bindCard":"545195",
                     "cardCountry":"Ecuador",
                     "lastFourDigits":"5480",
                     "type":"credit"
                  },
                  "cardHolderName":"APROBADO",
                  "created":1679531210000,
                  "merchantId":"20000000107058310000",
                  "merchantName":"kushkiCOSBX Colombia",
                  "paymentBrand":"Mastercard",
                  "processorBankName":"0032~BANCO INTERNACIONAL",
                  "requestAmount":2000,
                  "responseCode":"000",
                  "responseText":"Transacción aprobada",
                  "transactionId":"091607275430589119",
                  "transactionReference":"eb6eb9e1-68d3-46be-8a0b-41ec8ff3ad73",
                  "transactionStatus":"APPROVAL",
                  "transactionType":"SALE"
               },
               "ticketNumber":"488990863216107201",
               "transactionReference":"eb6eb9e1-68d3-46be-8a0b-41ec8ff3ad73"
            },
            "id":"KUSHKI",
            "transaction_id":"488990863216107201",
            "account_id":null,
            "status":"APPROVAL",
            "status_detail":"Transacción aprobada",
            "response_message":"Transacción aprobada"
         }
      },
      "callback_url":null,
      "workflow":"CHECKOUT",
      "split":[
         
      ]
   }
}
```

### Payment Webhook V2

The next JSON object presents an example of a data structure related to a payment event from Webhook V2.

```json
{
  "account_id":"f7c5fe77-721b-49c2-84d3-957748df3c2c",
  "type":"payment",
  "type.event": "payment.purchase", 
  "version": 2,
  "retry": 0,
  "data": {
    "payment":{
        "id": "f42cfadc-6725-4d2e-8bab-5b33344a9ea8",
        "account_code": "dbf0c133-86bc-4be0-94a5-ca2ff6778451",
        "additional_data": {
          "order": {
            "fee_amount": null,
            "items": [],
            "shipping_amount": null
          }
        },
        "amount": {
          "currency": "BRL",
          "value": 436
        },
        "checkout": {
          "sdk_action_required": false,
          "session": "69405158-638c-4f2e-891b-9620207ded1e"
        },
        "country": "BR",
        "created_at": "2022-05-20T02:00:40.587422Z",
        "customer_payer": {
          "billing_address": {
            "address_line1": null,
            "address_line2": null,
            "city": "Bogota",
            "country": "BR",
            "state": "Cundinamarca",
            "zip_code": "111111"
          },
          "browser_info": {
            "accept_header": "string",
            "color_depth": "string",
            "javascript_enabled": "string",
            "language": "string",
            "screen_height": "string",
            "screen_width": "string",
            "user_agent": "string"
          },
          "date_of_birth": "1990-02-28",
          "device_fingerprint": "hi88287gbd8d7d782ge....",
          "document": {
            "document_number": "351.040.753-97",
            "document_type": "CPF"
          },
          "email": "pepitoperez@y.uno",
          "first_name": "Pepito",
          "gender": "MALE",
          "id": 172,
          "ip_address": "192.168.123.167",
          "last_name": "Perez",
          "nationality": "BR",
          "merchant_customer_id": "example00234",
          "phone": {
            "country_code": "57",
            "number": "3132450765"
          },
          "shipping_address": {
            "address_line1": null,
            "address_line2": null,
            "city": "Bogota",
            "country": "CO",
            "state": "Cundinamarca",
            "zip_code": "111111"
          }
        },
        "description": "Test Dlocal 09052022-21",
        "merchant_order_id": "0000022",
        "organization_code": "95f37072-2afd-4dab-b256-88ca61e43c9d",
        "status": "SUCCEEDED",
        "transactions": {
            "amount": 436,
            "category": "CARD",
            "id": "d30cf2c7-5f0b-46ae-b949-34eb24e2ae8b",
            "created_at": "2022-05-20T02:00:40.596002Z",
            "payment_method": {
              "token": "49ba355c-d03a-4fe2-9233-cdddba690d97",
              "type": "CARD",
              "vault_on_success": false,
              "vaulted_token": "49ba355c-d03a-4fe2-9233-cdddba690d97",
              "payment_method_detail":{
                "card":{
                  "verify":null,
                  "capture":true,
                  "installments":1,
                  "first_installment_deferral":null,
                  "installments_amount":null,
                  "installments_type":null,
                  "soft_descriptor":"",
                  "authorization_code":"",
                  "retrieval_reference_number":"",
                  "voucher":null,
                  "card_data":{
                    "holder_name":"Fannie Weissnat",
                    "iin":"41961111",
                    "lfd":"0010",
                    "number_length":16,
                    "security_code_length":3,
                    "brand":"VISA",
                    "issuer_name":"METABANK",
                    "issuer_code":null,
                    "category":"PREPAID RELOADABLE",
                    "type":"DEBIT"}
                }
            },
            "provider_data": {
              "id": "DLOCAL",
              "transaction_id": "2104911d-5df9-429e-8488-ad41abea1a4b",
              "account_id": "9990128",
              "status": "accredited",
              "status_detail": "approved",
              "raw_response": "JSON"
            },
            "provider_id":"DLOCAL",
            "status": "SUCCEEDED",
            "type": "CARD",
            "updated_at": "2022-05-20T02:01:05.509007Z"
        },
        "updated_at": "2022-05-20T02:01:05.509009Z"
      }
    }
  
  }
    

```

## Enrollment

```json
{
  "account_id":"f7c5fe77-721b-49c2-84d3-957748df3c2c",
  "type":"enrollment",
  "type.event": "enrollment.enroll", 
  "version": 2,
  "retry": 0,
  "data": {
    "payment_method": {
      "id":"f7c5fe77-721b-49c2-84d3-957748df3c2c",
      "account_id": "d9cd3ef2-330a-45a4-b2a3-19e6502d2c92",
      "name":"VISA****1111",
      "description":"VISA****1111",
      "category":"CARD",
      "type":"CARD",
      "country":"UY",
      "customer_id":"3769a708-28d5-4bde-b559-4114d5a8fb9c",
      "status":"ENROLLED",
        "enrollment":{
        "sdk_action_required":true,
        "session":"830f66cd-6f14-4ac1-b5e8-45d28ecf0cf6"
        },
      "created_at":"2023-01-30T14:09:04.469723Z",
      "updated_at":"2023-01-30T14:09:07.256240Z"
      }
}

```

### Chargeback Webhook V1

The next JSON object presents an example of a data structure related to a payment event from Webhook V1.

```json JSON
{
   "payment":{
      "code":"b3da6717-7949-454e-8699-e449bfaccb69",
      "id":"b3da6717-7949-454e-8699-e449bfaccb69",
      "idempotency_key":"28f14927-421b-4424-b4d2-5de4d83ca138",
      "organization_code":"9c99108c-7681-4d48-acca-bce037685e99",
      "account_code":"c004cfd7-0c65-4add-b9b3-3d7e3949c9f1",
      "account_id":"c004cfd7-0c65-4add-b9b3-3d7e3949c9f1",
      "description":"test description",
      "country":"CO",
      "status":"CHARGEBACK",
      "sub_status":"LOST",
      "order_id":"1679531154456",
      "merchant_order_id":"1679531154456",
      "created_at":"2023-03-23T00:26:38.093810Z",
      "updated_at":"2023-03-23T00:26:51.285333Z",
      "amount":{
         "currency":"COP",
         "value":2000.0,
         "refunded":0.0,
         "captured":0.0
      },
      "checkout":{
         "session":"fb98b19d-39c0-42d2-bed6-438605458964",
         "sdk_action_required":false
      },
      "customer_payer":{
         "code":"8122d1f5-c07d-4d88-9dfe-a09ccdaeda0b",
         "id":"8122d1f5-c07d-4d88-9dfe-a09ccdaeda0b",
         "organization_customer_external_id":"1679531154456",
         "merchant_customer_id":"1679531154456",
         "first_name":"Aaron",
         "last_name":"Hegmann",
         "gender":"F",
         "date_of_birth":"1990-02-28",
         "email":"andrea@y.uno",
         "nationality":"CO",
         "ip_address":"192.168.123.167",
         "device_fingerprint":"278994bb-9ece-5c63-8c44-c03481851625",
         "browser_info":null,
         "document":{
            "document_number":"1032765432",
            "document_type":"CC"
         },
         "billing_address":{
            "address_line_1":"Calle 34 # 56 - 78",
            "address_line_2":"Apartamento 502, Torre I",
            "city":"Bogotá",
            "country":"CO",
            "state":"Cundinamarca",
            "zip_code":"111111"
         },
         "shipping_address":{
            "address_line_1":"Calle 34 # 56 - 78",
            "address_line_2":"Apartamento 502, Torre I",
            "city":"Bogotá",
            "country":"CO",
            "state":"Cundinamarca",
            "zip_code":"111111"
         },
         "phone":{
            "country_code":"57",
            "number":"3991111111"
         }
      },
      "additional_data":{
         "order":{
            "shipping_amount":0.0,
            "fee_amount":0.0,
            "items":[
               {
                  "id":"123AD",
                  "name":"Skirt",
                  "quantity":1,
                  "unit_amount":2000.0,
                  "category":"Clothes",
                  "brand":"XYZ",
                  "sku_code":"8765432109",
                  "manufacture_part_number":"XYZ123456"
               }
            ]
         },
         "airline":null
      },
      "transactions":{
         "code":"98c80022-fe05-4b9b-b478-2e102fc72cc3",
         "id":"98c80022-fe05-4b9b-b478-2e102fc72cc3",
         "type":"CHARGEBACK",
         "status":"LOST",
         "category":"CARD",
         "amount":2000.0,
         "provider_id":"KUSHKI",
         "response_code":"CHARGEBACK",
         "merchant_reference":null,
         "response_message":"Transaction successful",
         "reason":null,
         "description":"test description",
         "created_at":"2023-03-23T00:26:38.290239Z",
         "updated_at":"2023-03-23T00:26:51.258039Z",
         "payment_method":{
            "token":"e12440ca-920c-4aab-b656-6ed63f9ed5ac",
            "type":"CARD",
            "vaulted_token":null,
            "vault_on_success":false,
            "payment_method_detail":{
               "card":{
                  "verify":null,
                  "capture":false,
                  "installments":1,
                  "first_installment_deferral":null,
                  "installments_amount":null,
                  "installments_type":null,
                  "soft_descriptor":"",
                  "authorization_code":"",
                  "retrieval_reference_number":"",
                  "voucher":null,
                  "card_data":{
                     "holder_name":"APROBADO",
                     "iin":"54519515",
                     "lfd":"5480",
                     "number_length":16,
                     "security_code_length":3,
                     "brand":"MASTERCARD",
                     "issuer_name":"BANCO DE LA PRODUCCION S.A. (PRODUBANCO)",
                     "issuer_code":null,
                     "category":"BLACK",
                     "type":"CREDIT"
                  }
               },
               "wallet":null,
               "bnpl":null,
               "bank_transfer":null,
               "payment_link":null
            }
         },
         "provider":{
            "provider_transaction_id":"488990863216107201"
         },
         "provider_data":{
            "raw_response":{
               },
            "id":"KUSHKI",
            "transaction_id":"488990863216107201",
            "account_id":null,
            "status":"CHARGEBACK",
            "status_detail":"",
            "response_message":""
         }
      },
      "callback_url":null,
      "workflow":"SDK_CHECKOUT",
      "split":[
         
      ]
   }
}
```
