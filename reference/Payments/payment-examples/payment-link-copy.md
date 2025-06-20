---
title: Payment Link
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

## Payment Link available examples

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
        onclick="window.location='/reference/payment-link-copy#mercado-pago-checkout-pro';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/payvalida_logosimbolo.png" alt="Payvalida logo">
          </div>
        </div>
        <span class='card-title'>Payvalida</span>
      </div>
    </div>
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='/reference/payment-link-copy#tarjeta-clave';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/tarjetaclave_logosimbolo.png" alt="Tarjeta clave logo">
          </div>
        </div>
        <span class='card-title'>Tarjeta Clave</span>
      </div>
    </div>
   <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='/reference/payment-link-copy#webpay';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/webpay_logosimbolo.png" alt="Webpay logo">
          </div>
        </div>
        <span class='card-title'>Webpay</span>
      </div>
    </div>
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='/reference/payment-link-copy#pago-efectivo';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/pagoefectivo_logosimbolo.png" alt="Pago Efectivo logo">
          </div>
        </div>
        <span class='card-title'>Pago Efectivo</span>
      </div>
    </div>
  </section>
</body>
`}</HTMLBlock>

### Payvalida

Example of a request for a Payment Link payment using Payvalida. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

```curl Request (cURL)
curl --request POST \
     --url https://api-sandbox.y.uno/v1/payments \
     --header 'X-Idempotency-Key: <Your-idempotency-key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <Your-private-secret-key>' \
     --header 'public-api-key: <Your-public-api-key>' \
     --data '
{
    "description": "Payment wiht Payvalida",
    "account_id":"<account_id>",
    "merchant_order_id": "0000022",
    "country": "CO",
    "amount": {
        "currency": "COP",
        "value": 52000
    },
    "customer_payer": {
        "email": "pepitoperez@example.com",
        "first_name": "Pepito",
        "last_name": "Perez"
    },
    "payment_method": {
        "type": "PAYVALIDA"
    },
    "workflow":"REDIRECT",
    "callback_url":"www.google.com",
    "taxes": {
        "value": 100,
        "percentage": 21,
        "type":"VAT",
        "tax_base": 1000
    }
}
'
```
```json Response (JSON)
{
    "id": "c6c81ce5-acbe-480b-9bd4-1f401a3c2c96",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Payment wiht Payvalida",
    "country": "CO",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000022",
    "created_at": "2023-07-23T23:03:32.571147Z",
    "updated_at": "2023-07-23T23:03:36.459433Z",
    "amount": {
        "captured": 0.00,
        "currency": "COP",
        "refunded": 0.00,
        "value": 52000.00
    },
    "checkout": {
        "session": "d8707bff-a7e2-4ff3-9466-919d5bb4fe2b",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "PAYVALIDA",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "payment_link": {
                "verify": null,
                "capture": null,
                "installments": null,
                "payment_method_id": null,
                "payment_method_detail": null,
                "date_of_expiration": null,
                "money_release_date": null,
                "sponsor_id": null,
                "authorization_code": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=e497ea54-0063-47cb-a755-30fb7eed6d54"
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
        "email": "pepitoperez@example.com",
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
    "taxes": {
        "type": "VAT",
        "tax_base": 1000,
        "value": 100,
        "percentage": 21
    },
    "transactions": {
        "id": "1fcd5118-8201-4b80-8cc0-b65f264f434a",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "PAYMENT_LINK",
        "amount": 52000.00,
        "provider_id": "PAYVALIDA",
        "payment_method": {
            "vaulted_token": "",
            "type": "PAYVALIDA",
            "vault_on_success": false,
            "token": "",
            "detail": {}
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test Payvalida",
        "merchant_reference": null,
        "provider_data": {
            "id": "PAYVALIDA",
            "transaction_id": "2415421",
            "account_id": "",
            "status": "CREADA",
            "sub_status": "",
            "status_detail": "",
            "response_message": "",
            "raw_response": {
                "value": "{\"CODE\":\"0000\",\"DATA\":{\"Monto\":\"52000.0\",\"Operacion\":\"CREADA\",\"OrdenID\":\"yuno304314951\",\"PVordenID\":\"2415421\",\"Referencia\":\"90972200867\",\"checkout\":\"sandbox-checkout.payvalida.com?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNRVJDSEFOVF9DRUwiOiIrNTczMDE3ODc1MTA1IiwiTUVSQ0hBTlRfQ09ERSI6MzE2MTQsIk9SREVSX0NPREUiOjI0MTU0MjEsIk1FUkNIQU5UX0VNQUlMIjoiaW5mb0B5LnVubyIsIk1FUkNIQU5UX0xPR08iOiIiLCJNRVJDSEFOVF9VUkxfUkVUVVJOIjoiIiwiTUVSQ0hBTlRfTkFNRSI6IllVTk8gQ09MT01CSUEgKENPKSIsIkVYUElSQVRJT04iOiIyNS8wNy8yMDIzIiwiT1JERVJfQlJJRUYiOiJUZXN0IFBheXZhbGlkYSIsIk9SREVSX0NVUlJFTkNZIjoiQ09QIiwiT1JERVJfQU1PVVQiOiI1MjAwMC4wIiwiTUVSQ0hBTlRfSUQiOiJ5dW5vY29sb21iaWFzYXMiLCJPUkRFUl9SRUZFUkVOQ0UiOiI5MDk3MjIwMDg2NyIsIk9SREVSX01FVEhPRCI6IiIsIlVTRVJfREkiOiIiLCJVU0VSX1RZUEVfREkiOiIiLCJVU0VSX05BTUUiOiIiLCJSRURJUkVDVF9USU1FT1VUIjoiIiwiTUVSQ0hBTlRfVEVNUExBVEUiOiJkZWZhdWx0IiwiZXhwIjoxNjkwMzQ3NjAwLCJpc3MiOiJhdXRoMCJ9.qbcmiq2Emguk4TK5oMtvC6QR9WcRfB-7IMVSwf4IOrw\"},\"DESC\":\"OK\"}"
            },
            "third_party_transaction_id": ""
        },
        "created_at": "2023-07-23T23:03:32.795957Z",
        "updated_at": "2023-07-23T23:03:36.386080Z"
    },
    "split": [],
    "callback_url": "www.y.uno",
    "workflow": "REDIRECT",
    "metadata": []
}
```

### Tarjeta Clave

Example of a request for a Payment Link payment using Tarjeta Clave. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

```curl Request (cURL)
curl --request POST \
     --url https://api-sandbox.y.uno/v1/payments \
     --header 'X-Idempotency-Key: <Your-idempotency-key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <Your-private-secret-key>' \
     --header 'public-api-key: <Your-public-api-key>' \
     --data '
{
    "description": "Payment with Tarjeta Clave",
    "account_id":"<account_id>",
    "merchant_order_id": "0000022",
    "country": "PA",
    "amount": {
        "currency": "USD",
        "value": 5200
    },
    "customer_payer": {
        "email": "pepitoperez@example.com",
        "first_name": "Pepito",
        "last_name": "Perez",
        "document":{
            "document_type": "CC",
            "document_number": "1032765432"
        }
    },
    "payment_method": {
        "type": "TARJETA_CLAVE"
    },
    "workflow":"REDIRECT",
    "callback_url":"www.y.uno"
}
'
```
```json Response (JSON)
{
    "id": "137d6ae2-5c26-4489-bfeb-cd5221d4d00e",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Payment with Tarjeta Clave",
    "country": "PA",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000022",
    "created_at": "2023-07-23T23:06:56.422863Z",
    "updated_at": "2023-07-23T23:06:58.356461Z",
    "amount": {
        "captured": 0.00,
        "currency": "USD",
        "refunded": 0.00,
        "value": 5200.00
    },
    "checkout": {
        "session": "2761b558-393c-4214-96ed-94a2da4af6e6",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "TARJETA_CLAVE",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "payment_link": {
                "verify": null,
                "capture": null,
                "installments": null,
                "payment_method_id": null,
                "payment_method_detail": null,
                "date_of_expiration": null,
                "money_release_date": null,
                "sponsor_id": null,
                "authorization_code": "R-385928-db2ba20e-5b8e-4740-a184-786a9bae925a",
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=683fcf52-4ccf-4ab6-8fd9-0482679a097f"
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
        "email": "pepitoperez@example.com",
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
        "phone": null,
        "billing_address": null,
        "shipping_address": null
    },
    "additional_data": null,
    "taxes": null,
    "transactions": {
        "id": "0d11cbb2-c28e-4366-bf24-cb4f86b00d79",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "PAYMENT_LINK",
        "amount": 5200.00,
        "provider_id": "DLOCAL",
        "payment_method": {
            "vaulted_token": "",
            "type": "TARJETA_CLAVE",
            "vault_on_success": false,
            "token": "",
            "detail": {}
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Payment with Tarjeta Clave",
        "merchant_reference": null,
        "provider_data": {
            "id": "DLOCAL",
            "transaction_id": "R-385928-db2ba20e-5b8e-4740-a184-786a9bae925a",
            "account_id": "",
            "status": "PENDING",
            "sub_status": "",
            "status_detail": "100",
            "response_message": "The payment is pending.",
            "raw_response": {
                "value": "{\"id\":\"R-385928-db2ba20e-5b8e-4740-a184-786a9bae925a\",\"amount\":5200.00,\"currency\":\"USD\",\"payment_method_id\":\"CV\",\"payment_method_type\":\"TICKET\",\"payment_method_flow\":\"REDIRECT\",\"country\":\"PA\",\"created_date\":\"2023-07-23T23:06:57.000+0000\",\"status\":\"PENDING\",\"status_detail\":\"The payment is pending.\",\"status_code\":\"100\",\"order_id\":\"0d11cbb2-c28e-4366-bf24-cb4f86b00d79\",\"notification_url\":\"https://sandbox.y.uno/dlocal-webhook/v1/confirmations\",\"redirect_url\":\"https://sandbox.dlocal.com/gmf-apm/payments/M-d01e3d17-6082-4b1b-a1fb-d5a601260deb\"}"
            },
            "third_party_transaction_id": ""
        },
        "created_at": "2023-07-23T23:06:56.598311Z",
        "updated_at": "2023-07-23T23:06:58.259852Z"
    },
    "split": [],
    "callback_url": "www.y.uno",
    "workflow": "REDIRECT",
    "metadata": []
}
```

### Webpay

Example of a request for a Payment Link payment using Webpay. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

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
    "description": "Test Webpay",
    "account_id":"{{account-code}}",
    "merchant_order_id": "0000022",
    "country": "CL",
    "amount": {
        "currency": "CLP",
        "value": 5000
    },
    "customer_payer": {
        "email": "pepitoperez@y.uno",
        "first_name": "Pepito",
        "last_name": "Perez"
    },
    "payment_method": {
        "type": "WEBPAY"
    },
    "workflow":"REDIRECT",
    "callback_url":"www.y.uno"
}
'
```
```json Response (JSON)
{
    "id": "9c1f6ba0-d483-42a9-8d06-d53a07c284e0",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test Webpay",
    "country": "CL",
    "status": "READY_TO_PAY",
    "sub_status": "CREATED",
    "merchant_order_id": "0000022",
    "created_at": "2023-07-23T23:11:24.724037Z",
    "updated_at": "2023-07-23T23:11:26.318691Z",
    "amount": {
        "captured": 0,
        "currency": "CLP",
        "refunded": 0,
        "value": 5000
    },
    "checkout": {
        "session": "3c9eb446-388a-4c2e-9818-573d54300dd1",
        "sdk_action_required": true
    },
    "payment_method": {
        "vaulted_token": "",
        "type": "WEBPAY",
        "vault_on_success": false,
        "token": "",
        "payment_method_detail": {
            "payment_link": {
                "verify": null,
                "capture": null,
                "installments": null,
                "payment_method_id": null,
                "payment_method_detail": null,
                "date_of_expiration": null,
                "money_release_date": null,
                "sponsor_id": null,
                "authorization_code": null,
                "redirect_url": "https://checkout.sandbox.y.uno/payment?session=40ebcd0c-3598-4bd9-81cc-9f8e29c86987"
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
    "additional_data": null,
    "taxes": null,
    "transactions": {
        "id": "762abda0-2de5-43ba-a52b-04279acfb869",
        "type": "PURCHASE",
        "status": "CREATED",
        "category": "PAYMENT_LINK",
        "amount": 5000.00,
        "provider_id": "TRANSBANK_2",
        "payment_method": {
            "vaulted_token": "",
            "type": "WEBPAY",
            "vault_on_success": false,
            "token": "",
            "detail": {}
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test Webpay",
        "merchant_reference": null,
        "provider_data": {
            "id": "TRANSBANK_2",
            "transaction_id": "",
            "account_id": "",
            "status": "",
            "sub_status": "",
            "status_detail": "",
            "response_message": "",
            "raw_response": {
                "token": "01aba0f569c8a78370aa35461ca482b57d1b767365535de9a0540c03791a3d97",
                "url": "https://webpay3gint.transbank.cl/webpayserver/initTransaction"
            },
            "third_party_transaction_id": ""
        },
        "created_at": "2023-07-23T23:11:24.842815Z",
        "updated_at": "2023-07-23T23:11:26.242431Z"
    },
    "split": [],
    "callback_url": "www.y.uno",
    "workflow": "REDIRECT",
    "metadata": []
}
```

### Pago Efectivo

Example of a request for a Payment Link payment using Pago Efectivo. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

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
    "description": "Test Pago Efectivo",
    "account_id": "{{account-code}}",
    "merchant_order_id": "0000023",
    "country": "CO",
    "merchant_reference": "reference-{{$randomUUID}}",
    "amount": {
        "currency": "COP",
        "value": 3000
    },
    "customer_payer": {
        "email": "pepitoperez@y.uno",
        "first_name": "Pepito",
        "last_name": "Perez",
        "document": {
            "document_type": "CC",
            "document_number": "1032765432"
        }
    },
    "payment_method": {
        "type": "PAGO_EFECTIVO"
    },
    "workflow": "REDIRECT",
    "callback_url":"www.y.uno"
}
'
```
```json Response (JSON)
```
