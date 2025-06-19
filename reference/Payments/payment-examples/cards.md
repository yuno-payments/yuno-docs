---
title: Cards
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    This page presents examples of requests and responses for creating payments
    and authorizations using the Create Payment endpoint and Card as payment
    method.
  robots: index
next:
  description: ''
---
This page presents examples of requests and responses for creating payments and authorizations using the [Create Payment](https://docs.y.uno/reference/create-payment) endpoint and Card as payment method.

To test the creation of each payment, you can copy the content from the request code and use it on your machine or paste it on the [Create Payment](ref:create-payment) endpoint to test using Readme.

## Cards available examples

<HTMLBlock>{`
<style>
  .table-of-contents-btn-shelf {
    margin: 0 0 0 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
        onclick="window.location='/reference/cards#card-direct-for-authorization';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/card_logosimbolo.png" alt="Card logo">
          </div>
        </div>
        <span class='card-title'>Card Direct for authorization</span>
      </div>
    </div>
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='/reference/cards#card-direct-for-authorization-with-airline-data';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/card_logosimbolo.png" alt="Card logo">
          </div>
        </div>
        <span class='card-title'>Card Direct for authorization with airline data</span>
      </div>
    </div>
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='/reference/cards#card-direct-with-installments';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/card_logosimbolo.png" alt="Card logo">
          </div>
        </div>
        <span class='card-title'>Card Direct with installments</span>
      </div>
    </div>
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='/reference/cards#card-direct-with-vault-on-success';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/card_logosimbolo.png" alt="Card logo">
          </div>
        </div>
        <span class='card-title'>Card Direct with vault on success</span>
      </div>
    </div>
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='/reference/cards#card-direct-with-vaulted-token';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/card_logosimbolo.png" alt="Card logo">
          </div>
        </div>
        <span class='card-title'>Card Direct with vaulted token</span>
      </div>
    </div>
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='/reference/cards#card-direct-with-3ds';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/card_logosimbolo.png" alt="Card logo">
          </div>
        </div>
        <span class='card-title'>Card Direct with 3DS</span>
      </div>
    </div>
    <div class="payment-card-button">
      <div class="table-of-contents-btn table-of-contents-btn-on-click-effects"
        onclick="window.location='/reference/cards#card-direct-with-customer-billing-shipping-and-order-items';">
        <div class="card-logo">
          <div>
            <img src="https://icons.prod.y.uno/card_logosimbolo.png" alt="Card logo">
          </div>
        </div>
        <span class='card-title'>Card Direct with customer, billing, shipping and order items</span>
      </div>
    </div>





  </section>
</body>
`}</HTMLBlock>

### Card Direct for authorization

Example of a request for authorization using Card Direct. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

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
  "country": "US",
  "amount": {
    "currency": "USD",
    "value": "200"
  },
  "customer_payer": {
    "first_name": "JOHN",
    "last_name": "DOE",
    "email": "john.doe@example.com",
    "country": "US",
    "gender": "M",
    "date_of_birth": "1998-07-20",
    "nationality": "US",
    "document": {
      "document_type": "PASSPORT",
      "document_number": "123456789"
    }
  },
  "payment_method": {
    "detail": {
      "card": {
        "card_data": {
          "number": "4111111111111111",
          "expiration_month": 11,
          "expiration_year": 28,
          "security_code": "123",
          "holder_name": "JOHN DOE"
        },
        "capture": false
      }
    },
    "type": "CARD"
  },
  "account_id": "<account_id>",
  "description": "Card payment for authorization",
  "merchant_order_id": "000022",
  "merchant_reference": "reference-0001",
  "workflow": "DIRECT"
}
'
```
```json Response (JSON)
{
    "id": "d9b4e33a-5c9f-4f1a-9ccb-ee13cc432390",
    "account_id": "5beead35-0cd5-4e1c-9a13-b8f48f7f8f3a",
    "description": "Online purchase",
    "country": "US",
    "status": "SUCCEEDED",
    "sub_status": "APPROVED",
    "merchant_order_id": "00000233",
    "created_at": "2025-06-19T18:48:36.294677Z",
    "updated_at": "2025-06-19T18:48:36.591107Z",
    "amount": {
        "captured": 0.00,
        "currency": "USD",
        "currency_conversion": null,
        "refunded": 0.00,
        "value": 55.75
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
        "parent_payment_method_type": null,
        "payment_method_detail": {
            "card": {
                "verify": false,
                "capture": true,
                "installments": 1,
                "installments_plan_id": null,
                "first_installment_deferral": 0,
                "installments_type": "",
                "installment_amount": null,
                "soft_descriptor": "",
                "authorization_code": "554791",
                "retrieval_reference_number": "",
                "voucher": null,
                "card_data": {
                    "holder_name": "JANE SMITH",
                    "iin": "41234567",
                    "lfd": "2345",
                    "number_length": 16,
                    "security_code_length": 3,
                    "brand": "VISA",
                    "issuer_name": "INTL HDQTRSCENTER OWNED",
                    "issuer_code": null,
                    "country_code": "VN",
                    "category": "CLASSIC",
                    "type": "CREDIT",
                    "three_d_secure": {
                        "version": null,
                        "electronic_commerce_indicator": null,
                        "cryptogram": null,
                        "transaction_id": null,
                        "directory_server_transaction_id": null,
                        "pares_status": null,
                        "acs_id": null
                    },
                    "fingerprint": "e5fb7cbd-c42b-4ec2-ab9c-a421f049a3b8",
                    "expiration_month": 10,
                    "expiration_year": 29
                },
                "stored_credentials": {
                    "reason": null,
                    "usage": null,
                    "subscription_agreement_id": null,
                    "network_transaction_id": null
                }
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "1750358916",
        "first_name": "JANE",
        "last_name": "SMITH",
        "gender": "F",
        "date_of_birth": "1985-07-20",
        "email": "jane.smith@example.com",
        "nationality": "US",
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
            "document_type": "PASSPORT",
            "document_number": "123456789"
        },
        "phone": null,
        "billing_address": null,
        "shipping_address": null,
        "merchant_customer_created_at": null
    },
    "additional_data": null,
    "transactions": {
        "id": "8ec993f5-20a4-4aae-9cc9-d830adfa6948",
        "type": "PURCHASE",
        "status": "SUCCEEDED",
        "category": "CARD",
        "amount": 55.75,
        "provider_id": "YUNO_TEST_PAYMENT_GW",
        "payment_method": {
            "vaulted_token": "",
            "type": "CARD",
            "vault_on_success": false,
            "token": "",
            "parent_payment_method_type": null,
            "detail": {
                "card": {
                    "verify": false,
                    "capture": true,
                    "installments": 1,
                    "installments_plan_id": null,
                    "first_installment_deferral": 0,
                    "installments_type": "",
                    "installment_amount": null,
                    "soft_descriptor": "",
                    "authorization_code": "554791",
                    "retrieval_reference_number": "",
                    "voucher": null,
                    "card_data": {
                        "holder_name": "JANE SMITH",
                        "iin": "41234567",
                        "lfd": "2345",
                        "number_length": 16,
                        "security_code_length": 3,
                        "brand": "VISA",
                        "issuer_name": "INTL HDQTRSCENTER OWNED",
                        "issuer_code": null,
                        "country_code": "VN",
                        "category": "CLASSIC",
                        "type": "CREDIT",
                        "three_d_secure": {
                            "version": null,
                            "electronic_commerce_indicator": null,
                            "cryptogram": null,
                            "transaction_id": null,
                            "directory_server_transaction_id": null,
                            "pares_status": null,
                            "acs_id": null
                        },
                        "fingerprint": "e5fb7cbd-c42b-4ec2-ab9c-a421f049a3b8",
                        "expiration_month": 10,
                        "expiration_year": 29
                    },
                    "stored_credentials": {
                        "reason": null,
                        "usage": null,
                        "subscription_agreement_id": null,
                        "network_transaction_id": null
                    }
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Online purchase",
        "merchant_reference": "reference-d84c8065-06d6-4caf-9fcd-a7fede9f22c2",
        "provider_data": {
            "id": "YUNO_TEST_PAYMENT_GW",
            "transaction_id": "26a91a1a-674a-425f-8bc1-d33c8f43975c",
            "account_id": "",
            "status": "SUCCEEDED",
            "sub_status": "",
            "status_detail": "",
            "response_message": null,
            "response_code": null,
            "raw_response": {
                "amount": {
                    "currency": "BRL",
                    "value": 2100
                },
                "merchantAccount": "YunoPaymentsECOM",
                "paymentPspReference": "ZKHXKZGXMLBX8N82",
                "pspReference": "VKJTCWZ9575ZGN82",
                "reference": "34343434",
                "status": "received"
            },
            "third_party_transaction_id": "",
            "third_party_account_id": null,
            "iso8583_response_code": null,
            "iso8583_response_message": null
        },
        "connection_data": {
            "id": "a2ee2f97-8ba0-4198-a821-3b750bc97872",
            "name": null
        },
        "created_at": "2025-06-19T18:48:36.492840Z",
        "updated_at": "2025-06-19T18:48:36.552678Z"
    },
    "transactions_history": [
        {
            "id": "8ec993f5-20a4-4aae-9cc9-d830adfa6948",
            "type": "PURCHASE",
            "status": "SUCCEEDED",
            "category": "CARD",
            "amount": 55.75,
            "provider_id": "YUNO_TEST_PAYMENT_GW",
            "payment_method": {
                "vaulted_token": "",
                "type": "CARD",
                "vault_on_success": false,
                "token": "",
                "parent_payment_method_type": null,
                "detail": {
                    "card": {
                        "verify": false,
                        "capture": true,
                        "installments": 1,
                        "installments_plan_id": null,
                        "first_installment_deferral": 0,
                        "installments_type": "",
                        "installment_amount": null,
                        "soft_descriptor": "",
                        "authorization_code": "554791",
                        "retrieval_reference_number": "",
                        "voucher": null,
                        "card_data": {
                            "holder_name": "JANE SMITH",
                            "iin": "41234567",
                            "lfd": "2345",
                            "number_length": 16,
                            "security_code_length": 3,
                            "brand": "VISA",
                            "issuer_name": "INTL HDQTRSCENTER OWNED",
                            "issuer_code": null,
                            "country_code": "VN",
                            "category": "CLASSIC",
                            "type": "CREDIT",
                            "three_d_secure": {
                                "version": null,
                                "electronic_commerce_indicator": null,
                                "cryptogram": null,
                                "transaction_id": null,
                                "directory_server_transaction_id": null,
                                "pares_status": null,
                                "acs_id": null
                            },
                            "fingerprint": "e5fb7cbd-c42b-4ec2-ab9c-a421f049a3b8",
                            "expiration_month": 10,
                            "expiration_year": 29
                        },
                        "stored_credentials": {
                            "reason": null,
                            "usage": null,
                            "subscription_agreement_id": null,
                            "network_transaction_id": null
                        }
                    }
                }
            },
            "response_code": "SUCCEEDED",
            "response_message": "Transaction successful",
            "reason": null,
            "description": "Online purchase",
            "merchant_reference": "reference-d84c8065-06d6-4caf-9fcd-a7fede9f22c2",
            "provider_data": {
                "id": "YUNO_TEST_PAYMENT_GW",
                "transaction_id": "26a91a1a-674a-425f-8bc1-d33c8f43975c",
                "account_id": "",
                "status": "SUCCEEDED",
                "sub_status": "",
                "status_detail": "",
                "response_message": null,
                "response_code": null,
                "raw_response": {
                    "amount": {
                        "currency": "BRL",
                        "value": 2100
                    },
                    "merchantAccount": "YunoPaymentsECOM",
                    "paymentPspReference": "ZKHXKZGXMLBX8N82",
                    "pspReference": "VKJTCWZ9575ZGN82",
                    "reference": "34343434",
                    "status": "received"
                },
                "third_party_transaction_id": "",
                "third_party_account_id": null,
                "iso8583_response_code": null,
                "iso8583_response_message": null
            },
            "connection_data": {
                "id": "a2ee2f97-8ba0-4198-a821-3b750bc97872",
                "name": null
            },
            "created_at": "2025-06-19T18:48:36.492840Z",
            "updated_at": "2025-06-19T18:48:36.552678Z"
        }
    ],
    "workflow": "DIRECT",
    "metadata": [],
    "fraud_screening": null,
    "payment_link_id": "",
    "subscription_code": null,
    "routing_rules": {
        "smart_routing": false,
        "monitors": false,
        "condition": {
            "id": 192539,
            "name": "Card",
            "description": ""
        }
    },
    "simplified_mode": false
}
```

### Card Direct for authorization with airline data

Example of a request for authorization with airline data using Card Direct. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

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
  "account_id": "<accound_id>",
  "description": "Card payment with airline data",
  "merchant_order_id": "00024",
  "merchant_reference": "Example_Merchant_Reference",
  "country": "US",
  "amount": {
    "currency": "USD",
    "value": "2350"
  },
  "additional_data": {
    "airline": {
      "legs": [
        {
          "departure_airport": "JFK",
          "departure_datetime": "2024-07-03T05:00:00",
          "departure_airport_timezone": "GMT-04",
          "arrival_airport": "BOM",
          "carrier_code": "PR",
          "flight_number": "AV348",
          "fare_basis_code": "Y",
          "fare_class_code": "S",
          "base_fare": 950,
          "base_fare_currency": "USD",
          "stopover_code": "O"
        }
      ],
      "passengers": [
        {
          "document": {
            "document_number": "1092456327",
            "document_type": "PASSPORT%",
            "country": "US"
          },
          "first_name": "JOHN",
          "last_name": "DOE",
          "middle_name": "STEPHEN",
          "type": "A",
          "date_of_birth": "1998-01-01",
          "nationality": "US",
          "loyalty_number": "79250001",
          "loyalty_tier": "DIAMOND"
        }
      ],
      "tickets": [
        {
          "issue": {
            "carrier_prefix_code": "016",
            "travel_agent_code": "B987654",
            "travel_agent_name": "GLOBAL TRAVELS",
            "date": "2024-12-01 10:00:00",
            "address": "789 Broadway Ave",
            "city": "NEW YORK",
            "country": "US",
            "zip_code": "10003"
          },
          "ticket_number": "BRB0001",
          "e_ticket": true,
          "restricted": false,
          "total_fare_amount": 1000,
          "total_tax_amount": 150,
          "total_fee_amount": 25
        },
        {
          "issue": {
            "carrier_prefix_code": "016",
            "travel_agent_code": "B987654",
            "travel_agent_name": "GLOBAL TRAVELS",
            "date": "2024-12-01 10:00:00",
            "address": "789 Broadway Ave",
            "city": "NEW YORK",
            "country": "US",
            "zip_code": "10003"
          },
          "ticket_number": "BRB0002",
          "e_ticket": true,
          "restricted": false,
          "total_fare_amount": 1000,
          "total_tax_amount": 150,
          "total_fee_amount": 25
        }
      ],
      "pnr": "ABC123"
    }
  },
  "customer_payer": {
    "document": {
      "document_number": "1092345673",
      "document_type": "PASS"
    },
    "billing_address": {
      "address_line_1": "123 Main Street",
      "address_line_2": "Apt 4B",
      "country": "US",
      "state": "NY",
      "city": "NEW YORK",
      "zip_code": "10001"
    },
    "first_name": "JOHN",
    "last_name": "DOE",
    "gender": "M",
    "date_of_birth": "1998-01-01",
    "email": "john.doe@example.com",
    "nationality": "US",
    "ip_address": "192.0.0.1"
  },
  "workflow": "DIRECT",
  "payment_method": {
    "detail": {
      "card": {
        "card_data": {
          "number": "4111111111111111",
          "expiration_month": 11,
          "expiration_year": 28,
          "security_code": "123",
          "holder_name": "JOHN DOE"
        },
        "capture": false
      }
    },
    "type": "CARD"
  } 
}
'
```
```json Response (JSON)
{
    "id": "16402f10-228b-4868-97e3-c3d1d73ab987",
    "account_id": "5beead35-0cd5-4e1c-9a13-b8f48f7f8f3a",
    "description": "Flight booking to India",
    "country": "US",
    "status": "SUCCEEDED",
    "sub_status": "APPROVED",
    "merchant_order_id": "0000024",
    "created_at": "2025-06-19T18:51:38.094726Z",
    "updated_at": "2025-06-19T18:51:38.549591Z",
    "amount": {
        "captured": 0.00,
        "currency": "USD",
        "currency_conversion": null,
        "refunded": 0.00,
        "value": 1175.00
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
        "parent_payment_method_type": null,
        "payment_method_detail": {
            "card": {
                "verify": false,
                "capture": true,
                "installments": 1,
                "installments_plan_id": null,
                "first_installment_deferral": 0,
                "installments_type": "",
                "installment_amount": null,
                "soft_descriptor": "",
                "authorization_code": "349399",
                "retrieval_reference_number": "",
                "voucher": null,
                "card_data": {
                    "holder_name": "SARAH CONNOR",
                    "iin": "41234567",
                    "lfd": "2345",
                    "number_length": 16,
                    "security_code_length": 3,
                    "brand": "VISA",
                    "issuer_name": "INTL HDQTRSCENTER OWNED",
                    "issuer_code": null,
                    "country_code": "VN",
                    "category": "CLASSIC",
                    "type": "CREDIT",
                    "three_d_secure": {
                        "version": null,
                        "electronic_commerce_indicator": null,
                        "cryptogram": null,
                        "transaction_id": null,
                        "directory_server_transaction_id": null,
                        "pares_status": null,
                        "acs_id": null
                    },
                    "fingerprint": "e5fb7cbd-c42b-4ec2-ab9c-a421f049a3b8",
                    "expiration_month": 12,
                    "expiration_year": 29
                },
                "stored_credentials": {
                    "reason": null,
                    "usage": null,
                    "subscription_agreement_id": null,
                    "network_transaction_id": null
                }
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "1750359097",
        "first_name": "SARAH",
        "last_name": "CONNOR",
        "gender": "F",
        "date_of_birth": "1990-03-20",
        "email": "sarah.connor@example.com",
        "nationality": "US",
        "ip_address": "192.168.1.100",
        "device_fingerprint": null,
        "device_fingerprints": [],
        "browser_info": {
            "user_agent": "",
            "accept_header": "",
            "accept_content": "True",
            "accept_browser": "True",
            "color_depth": "",
            "screen_height": "",
            "screen_width": "",
            "javascript_enabled": true,
            "java_enabled": null,
            "browser_time_difference": null,
            "language": "",
            "platform": null
        },
        "document": {
            "document_type": "PASSPORT",
            "document_number": "543210987"
        },
        "phone": {
            "number": "5551234567",
            "country_code": "1"
        },
        "billing_address": {
            "address_line_1": "123 Main Street",
            "address_line_2": "Apt 4B",
            "country": "US",
            "state": "NY",
            "city": "NEW YORK",
            "zip_code": "10001",
            "neighborhood": null
        },
        "shipping_address": {
            "address_line_1": "Flat 101, Green Apartments",
            "address_line_2": "MG Road",
            "country": "IN",
            "state": "KA",
            "city": "BENGALURU",
            "zip_code": "560001",
            "neighborhood": null
        },
        "merchant_customer_created_at": null
    },
    "additional_data": {
        "airline": {
            "pnr": "XYZZZY",
            "legs": [
                {
                    "departure_airport": "JFK",
                    "departure_datetime": "2025-08-15 10:00:00",
                    "departure_airport_timezone": "-04:00",
                    "arrival_airport": "DEL",
                    "arrival_airport_timezone": "+00:00",
                    "arrival_datetime": "",
                    "carrier_code": "AI",
                    "flight_number": "AI102",
                    "fare_basis_code": "Q",
                    "fare_class_code": "L",
                    "base_fare": 950.00,
                    "base_fare_currency": "USD",
                    "stopover_code": "N",
                    "departure_airport_country": null,
                    "departure_airport_city": null,
                    "arrival_airport_country": null,
                    "arrival_airport_city": null
                }
            ],
            "passengers": [
                {
                    "first_name": "SARAH",
                    "last_name": "CONNOR",
                    "middle_name": "JANE",
                    "type": "A",
                    "date_of_birth": "1990-03-20",
                    "nationality": "US",
                    "document": {
                        "document_type": "PASSPORT",
                        "document_number": "543210987"
                    },
                    "country": null,
                    "loyalty_number": "AERO2025",
                    "loyalty_tier": "PLATINUM",
                    "email": null,
                    "phone": null
                }
            ],
            "ticket": {
                "ticket_number": "GLTICKET001",
                "e_ticket": true,
                "restricted": false,
                "total_fare_amount": 1000.00,
                "total_tax_amount": 150.00,
                "total_fee_amount": 25.00,
                "issue": {
                    "carrier_prefix_code": "016",
                    "travel_agent_code": "B987654",
                    "travel_agent_name": "GLOBAL TRAVELS",
                    "date": "2024-12-01 10:00:00",
                    "address": "789 Broadway Ave",
                    "city": "NEW YORK",
                    "country": "US",
                    "zip_code": "10003",
                    "booking_system_code": null,
                    "booking_system_name": null
                }
            },
            "tickets": null
        },
        "order": {
            "fee_amount": 5,
            "shipping_amount": 5.76,
            "tip_amount": null,
            "items": [
                {
                    "id": "SKU-98765",
                    "name": "Denim Skirt",
                    "quantity": 1,
                    "unit_amount": 49.99,
                    "category": "Apparel",
                    "brand": "Fashionista",
                    "sku_code": "SKT-DNM-BLK-28",
                    "manufacture_part_number": "FASH-SKIRT-001"
                }
            ],
            "account_funding": null,
            "tickets": null,
            "fulfillment": null,
            "discounts": null,
            "sales_channel": null
        },
        "seller_details": null
    },
    "transactions": {
        "id": "ea7ca4c3-c69d-4390-a1ab-60fa9f82e1a3",
        "type": "PURCHASE",
        "status": "SUCCEEDED",
        "category": "CARD",
        "amount": 1175.00,
        "provider_id": "YUNO_TEST_PAYMENT_GW",
        "payment_method": {
            "vaulted_token": "",
            "type": "CARD",
            "vault_on_success": false,
            "token": "",
            "parent_payment_method_type": null,
            "detail": {
                "card": {
                    "verify": false,
                    "capture": true,
                    "installments": 1,
                    "installments_plan_id": null,
                    "first_installment_deferral": 0,
                    "installments_type": "",
                    "installment_amount": null,
                    "soft_descriptor": "",
                    "authorization_code": "349399",
                    "retrieval_reference_number": "",
                    "voucher": null,
                    "card_data": {
                        "holder_name": "SARAH CONNOR",
                        "iin": "41234567",
                        "lfd": "2345",
                        "number_length": 16,
                        "security_code_length": 3,
                        "brand": "VISA",
                        "issuer_name": "INTL HDQTRSCENTER OWNED",
                        "issuer_code": null,
                        "country_code": "VN",
                        "category": "CLASSIC",
                        "type": "CREDIT",
                        "three_d_secure": {
                            "version": null,
                            "electronic_commerce_indicator": null,
                            "cryptogram": null,
                            "transaction_id": null,
                            "directory_server_transaction_id": null,
                            "pares_status": null,
                            "acs_id": null
                        },
                        "fingerprint": "e5fb7cbd-c42b-4ec2-ab9c-a421f049a3b8",
                        "expiration_month": 12,
                        "expiration_year": 29
                    },
                    "stored_credentials": {
                        "reason": null,
                        "usage": null,
                        "subscription_agreement_id": null,
                        "network_transaction_id": null
                    }
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Flight booking to India",
        "merchant_reference": "FlightBooking_REF_98765",
        "provider_data": {
            "id": "YUNO_TEST_PAYMENT_GW",
            "transaction_id": "21e6d532-d41c-4205-b1c5-05cc41a223d9",
            "account_id": "",
            "status": "SUCCEEDED",
            "sub_status": "",
            "status_detail": "",
            "response_message": null,
            "response_code": null,
            "raw_response": {
                "amount": {
                    "currency": "BRL",
                    "value": 2100
                },
                "merchantAccount": "YunoPaymentsECOM",
                "paymentPspReference": "ZKHXKZGXMLBX8N82",
                "pspReference": "VKJTCWZ9575ZGN82",
                "reference": "34343434",
                "status": "received"
            },
            "third_party_transaction_id": "",
            "third_party_account_id": null,
            "iso8583_response_code": null,
            "iso8583_response_message": null
        },
        "connection_data": {
            "id": "a2ee2f97-8ba0-4198-a821-3b750bc97872",
            "name": null
        },
        "created_at": "2025-06-19T18:51:38.452839Z",
        "updated_at": "2025-06-19T18:51:38.504087Z"
    },
    "transactions_history": [
        {
            "id": "ea7ca4c3-c69d-4390-a1ab-60fa9f82e1a3",
            "type": "PURCHASE",
            "status": "SUCCEEDED",
            "category": "CARD",
            "amount": 1175.00,
            "provider_id": "YUNO_TEST_PAYMENT_GW",
            "payment_method": {
                "vaulted_token": "",
                "type": "CARD",
                "vault_on_success": false,
                "token": "",
                "parent_payment_method_type": null,
                "detail": {
                    "card": {
                        "verify": false,
                        "capture": true,
                        "installments": 1,
                        "installments_plan_id": null,
                        "first_installment_deferral": 0,
                        "installments_type": "",
                        "installment_amount": null,
                        "soft_descriptor": "",
                        "authorization_code": "349399",
                        "retrieval_reference_number": "",
                        "voucher": null,
                        "card_data": {
                            "holder_name": "SARAH CONNOR",
                            "iin": "41234567",
                            "lfd": "2345",
                            "number_length": 16,
                            "security_code_length": 3,
                            "brand": "VISA",
                            "issuer_name": "INTL HDQTRSCENTER OWNED",
                            "issuer_code": null,
                            "country_code": "VN",
                            "category": "CLASSIC",
                            "type": "CREDIT",
                            "three_d_secure": {
                                "version": null,
                                "electronic_commerce_indicator": null,
                                "cryptogram": null,
                                "transaction_id": null,
                                "directory_server_transaction_id": null,
                                "pares_status": null,
                                "acs_id": null
                            },
                            "fingerprint": "e5fb7cbd-c42b-4ec2-ab9c-a421f049a3b8",
                            "expiration_month": 12,
                            "expiration_year": 29
                        },
                        "stored_credentials": {
                            "reason": null,
                            "usage": null,
                            "subscription_agreement_id": null,
                            "network_transaction_id": null
                        }
                    }
                }
            },
            "response_code": "SUCCEEDED",
            "response_message": "Transaction successful",
            "reason": null,
            "description": "Flight booking to India",
            "merchant_reference": "FlightBooking_REF_98765",
            "provider_data": {
                "id": "YUNO_TEST_PAYMENT_GW",
                "transaction_id": "21e6d532-d41c-4205-b1c5-05cc41a223d9",
                "account_id": "",
                "status": "SUCCEEDED",
                "sub_status": "",
                "status_detail": "",
                "response_message": null,
                "response_code": null,
                "raw_response": {
                    "amount": {
                        "currency": "BRL",
                        "value": 2100
                    },
                    "merchantAccount": "YunoPaymentsECOM",
                    "paymentPspReference": "ZKHXKZGXMLBX8N82",
                    "pspReference": "VKJTCWZ9575ZGN82",
                    "reference": "34343434",
                    "status": "received"
                },
                "third_party_transaction_id": "",
                "third_party_account_id": null,
                "iso8583_response_code": null,
                "iso8583_response_message": null
            },
            "connection_data": {
                "id": "a2ee2f97-8ba0-4198-a821-3b750bc97872",
                "name": null
            },
            "created_at": "2025-06-19T18:51:38.452839Z",
            "updated_at": "2025-06-19T18:51:38.504087Z"
        }
    ],
    "workflow": "DIRECT",
    "metadata": [],
    "fraud_screening": null,
    "payment_link_id": "",
    "subscription_code": null,
    "routing_rules": {
        "smart_routing": false,
        "monitors": false,
        "condition": {
            "id": 192539,
            "name": "Card",
            "description": ""
        }
    },
    "simplified_mode": false
}
```

### Card Direct with installments

Example of a request for payment with installments using Card Direct. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

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
  "account_id": "<account_id>",
  "description": "Card payment with installments",
  "merchant_order_id": "0000022",
  "merchant_reference": "ref-0001",
  "country": "US",
  "amount": {
    "currency": "USD",
    "value": 250.75
  },
  "customer_payer": {
    "first_name": "JOHN",
    "last_name": "DOE",
    "email": "test@test.com"
  },
  "payment_method": {
    "detail": {
      "card": {
        "card_data": {
          "number": "4111111111111111",
          "expiration_month": 11,
          "expiration_year": 28,
          "security_code": "123",
          "holder_name": "JOHN DOE"
        },
        "installments": 6
      }
    },
    "type": "CARD"
  },
  "workflow": "DIRECT"
}
'
```
```json Response (JSON)
{
    "id": "bb3a6aec-1704-4c61-a035-320f75f500e7",
    "account_id": "5beead35-0cd5-4e1c-9a13-b8f48f7f8f3a",
    "description": "Card payment with installments",
    "country": "US",
    "status": "SUCCEEDED",
    "sub_status": "APPROVED",
    "merchant_order_id": "0000022",
    "created_at": "2025-06-19T19:02:37.809761Z",
    "updated_at": "2025-06-19T19:02:38.151822Z",
    "amount": {
        "captured": 0.00,
        "currency": "USD",
        "currency_conversion": null,
        "refunded": 0.00,
        "value": 250.75
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
        "parent_payment_method_type": null,
        "payment_method_detail": {
            "card": {
                "verify": false,
                "capture": true,
                "installments": 6,
                "installments_plan_id": null,
                "first_installment_deferral": 0,
                "installments_type": "",
                "installment_amount": null,
                "soft_descriptor": "",
                "authorization_code": "330936",
                "retrieval_reference_number": "",
                "voucher": null,
                "card_data": {
                    "holder_name": "JOHN DOE",
                    "iin": "41111111",
                    "lfd": "1111",
                    "number_length": 16,
                    "security_code_length": 3,
                    "brand": "VISA",
                    "issuer_name": "CONOTOXIA SP Z O O",
                    "issuer_code": null,
                    "country_code": "PL",
                    "category": "CLASSIC",
                    "type": "DEBIT",
                    "three_d_secure": {
                        "version": null,
                        "electronic_commerce_indicator": null,
                        "cryptogram": null,
                        "transaction_id": null,
                        "directory_server_transaction_id": null,
                        "pares_status": null,
                        "acs_id": null
                    },
                    "fingerprint": "a2ede54f-4b2a-4673-ae2c-c0704338ec7d",
                    "expiration_month": 11,
                    "expiration_year": 28
                },
                "stored_credentials": {
                    "reason": null,
                    "usage": null,
                    "subscription_agreement_id": null,
                    "network_transaction_id": null
                }
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": null,
        "first_name": "JOHN",
        "last_name": "DOE",
        "gender": null,
        "date_of_birth": null,
        "email": "test@test.com",
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
        "document": null,
        "phone": null,
        "billing_address": null,
        "shipping_address": null,
        "merchant_customer_created_at": null
    },
    "additional_data": null,
    "transactions": {
        "id": "db2f176e-c15f-46ca-9a5b-103bea203509",
        "type": "PURCHASE",
        "status": "SUCCEEDED",
        "category": "CARD",
        "amount": 250.75,
        "provider_id": "YUNO_TEST_PAYMENT_GW",
        "payment_method": {
            "vaulted_token": "",
            "type": "CARD",
            "vault_on_success": false,
            "token": "",
            "parent_payment_method_type": null,
            "detail": {
                "card": {
                    "verify": false,
                    "capture": true,
                    "installments": 6,
                    "installments_plan_id": null,
                    "first_installment_deferral": 0,
                    "installments_type": "",
                    "installment_amount": null,
                    "soft_descriptor": "",
                    "authorization_code": "330936",
                    "retrieval_reference_number": "",
                    "voucher": null,
                    "card_data": {
                        "holder_name": "JOHN DOE",
                        "iin": "41111111",
                        "lfd": "1111",
                        "number_length": 16,
                        "security_code_length": 3,
                        "brand": "VISA",
                        "issuer_name": "CONOTOXIA SP Z O O",
                        "issuer_code": null,
                        "country_code": "PL",
                        "category": "CLASSIC",
                        "type": "DEBIT",
                        "three_d_secure": {
                            "version": null,
                            "electronic_commerce_indicator": null,
                            "cryptogram": null,
                            "transaction_id": null,
                            "directory_server_transaction_id": null,
                            "pares_status": null,
                            "acs_id": null
                        },
                        "fingerprint": "a2ede54f-4b2a-4673-ae2c-c0704338ec7d",
                        "expiration_month": 11,
                        "expiration_year": 28
                    },
                    "stored_credentials": {
                        "reason": null,
                        "usage": null,
                        "subscription_agreement_id": null,
                        "network_transaction_id": null
                    }
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Card payment with installments",
        "merchant_reference": "ref-0001",
        "provider_data": {
            "id": "YUNO_TEST_PAYMENT_GW",
            "transaction_id": "c2696806-3e68-4cd4-99f1-e2ceb2b23aae",
            "account_id": "",
            "status": "SUCCEEDED",
            "sub_status": "",
            "status_detail": "",
            "response_message": null,
            "response_code": null,
            "raw_response": {
                "amount": {
                    "currency": "BRL",
                    "value": 2100
                },
                "merchantAccount": "YunoPaymentsECOM",
                "paymentPspReference": "ZKHXKZGXMLBX8N82",
                "pspReference": "VKJTCWZ9575ZGN82",
                "reference": "34343434",
                "status": "received"
            },
            "third_party_transaction_id": "",
            "third_party_account_id": null,
            "iso8583_response_code": null,
            "iso8583_response_message": null
        },
        "connection_data": {
            "id": "a2ee2f97-8ba0-4198-a821-3b750bc97872",
            "name": null
        },
        "created_at": "2025-06-19T19:02:38.058354Z",
        "updated_at": "2025-06-19T19:02:38.110167Z"
    },
    "transactions_history": [
        {
            "id": "db2f176e-c15f-46ca-9a5b-103bea203509",
            "type": "PURCHASE",
            "status": "SUCCEEDED",
            "category": "CARD",
            "amount": 250.75,
            "provider_id": "YUNO_TEST_PAYMENT_GW",
            "payment_method": {
                "vaulted_token": "",
                "type": "CARD",
                "vault_on_success": false,
                "token": "",
                "parent_payment_method_type": null,
                "detail": {
                    "card": {
                        "verify": false,
                        "capture": true,
                        "installments": 6,
                        "installments_plan_id": null,
                        "first_installment_deferral": 0,
                        "installments_type": "",
                        "installment_amount": null,
                        "soft_descriptor": "",
                        "authorization_code": "330936",
                        "retrieval_reference_number": "",
                        "voucher": null,
                        "card_data": {
                            "holder_name": "JOHN DOE",
                            "iin": "41111111",
                            "lfd": "1111",
                            "number_length": 16,
                            "security_code_length": 3,
                            "brand": "VISA",
                            "issuer_name": "CONOTOXIA SP Z O O",
                            "issuer_code": null,
                            "country_code": "PL",
                            "category": "CLASSIC",
                            "type": "DEBIT",
                            "three_d_secure": {
                                "version": null,
                                "electronic_commerce_indicator": null,
                                "cryptogram": null,
                                "transaction_id": null,
                                "directory_server_transaction_id": null,
                                "pares_status": null,
                                "acs_id": null
                            },
                            "fingerprint": "a2ede54f-4b2a-4673-ae2c-c0704338ec7d",
                            "expiration_month": 11,
                            "expiration_year": 28
                        },
                        "stored_credentials": {
                            "reason": null,
                            "usage": null,
                            "subscription_agreement_id": null,
                            "network_transaction_id": null
                        }
                    }
                }
            },
            "response_code": "SUCCEEDED",
            "response_message": "Transaction successful",
            "reason": null,
            "description": "Card payment with installments",
            "merchant_reference": "ref-0001",
            "provider_data": {
                "id": "YUNO_TEST_PAYMENT_GW",
                "transaction_id": "c2696806-3e68-4cd4-99f1-e2ceb2b23aae",
                "account_id": "",
                "status": "SUCCEEDED",
                "sub_status": "",
                "status_detail": "",
                "response_message": null,
                "response_code": null,
                "raw_response": {
                    "amount": {
                        "currency": "BRL",
                        "value": 2100
                    },
                    "merchantAccount": "YunoPaymentsECOM",
                    "paymentPspReference": "ZKHXKZGXMLBX8N82",
                    "pspReference": "VKJTCWZ9575ZGN82",
                    "reference": "34343434",
                    "status": "received"
                },
                "third_party_transaction_id": "",
                "third_party_account_id": null,
                "iso8583_response_code": null,
                "iso8583_response_message": null
            },
            "connection_data": {
                "id": "a2ee2f97-8ba0-4198-a821-3b750bc97872",
                "name": null
            },
            "created_at": "2025-06-19T19:02:38.058354Z",
            "updated_at": "2025-06-19T19:02:38.110167Z"
        }
    ],
    "workflow": "DIRECT",
    "metadata": [],
    "fraud_screening": null,
    "payment_link_id": "",
    "subscription_code": null,
    "routing_rules": {
        "smart_routing": false,
        "monitors": false,
        "condition": {
            "id": 192539,
            "name": "Card",
            "description": ""
        }
    },
    "simplified_mode": false
}
```

### Card Direct with customer, billing, shipping and order items

Example of a declined request for payment using Card Direct. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

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
    "description": "Card payment with shipping and order",
    "account_id": "<account_code>",
    "merchant_order_id": "00000023",
    "country": "US",
    "merchant_reference" : "reference-0001",
    "amount": {
        "currency": "USD",
        "value": 49.99
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
                    "unit_amount": 49.99
                }
            ],
            "shipping_amount": 0
        }
    },
    "customer_payer": {
        "merchant_customer_id": "{{$timestamp}}",
        "first_name": "JANE",
        "last_name": "SMITH",
        "gender": "F",
        "date_of_birth": "1985-07-22",
        "email": "jane.smith@example.com",
        "nationality": "US",
        "ip_address": "73.19.200.15",
        "device_fingerprint": "xyzabc123def456ghi789",
        "document": {
            "document_type": "DRIVERS_LICENSE",
            "document_number": "D987654321"
        },
        "phone": {
            "number": "2125550100",
            "country_code": "1"
        },
        "billing_address": {
            "address_line_1": "123 Maple Drive",
            "address_line_2": "Apt 10A",
            "country": "US",
            "state": "CA",
            "city": "Los Angeles",
            "zip_code": "90001"
        },
        "shipping_address": {
            "address_line_1": "123 Maple Drive",
            "address_line_2": "Apt 10A",
            "country": "US",
            "state": "CA",
            "city": "Los Angeles",
            "zip_code": "90001"
        }
    },
    "workflow": "DIRECT",
    "payment_method": {
        "type": "CARD",
        "detail": {
            "card": {
                "card_data": {
                    "number": "4051885600446623",
                    "holder_name": "JOHN DOE",
                    "expiration_month": 10,
                    "expiration_year": 26,
                    "security_code": "456"
                }
            }
        }
    }
}
'
```
```json Response (JSON)
{
    "id": "7896f300-96bd-4ccc-b15d-6a6541ef4658",
    "account_id": "5beead35-0cd5-4e1c-9a13-b8f48f7f8f3a",
    "description": "Card payment with shipping and order",
    "country": "US",
    "status": "SUCCEEDED",
    "sub_status": "APPROVED",
    "merchant_order_id": "00000023",
    "created_at": "2025-06-19T19:23:52.577766Z",
    "updated_at": "2025-06-19T19:23:52.995825Z",
    "amount": {
        "captured": 0.00,
        "currency": "USD",
        "currency_conversion": null,
        "refunded": 0.00,
        "value": 49.99
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
        "parent_payment_method_type": null,
        "payment_method_detail": {
            "card": {
                "verify": false,
                "capture": true,
                "installments": 1,
                "installments_plan_id": null,
                "first_installment_deferral": 0,
                "installments_type": "",
                "installment_amount": null,
                "soft_descriptor": "",
                "authorization_code": "226813",
                "retrieval_reference_number": "",
                "voucher": null,
                "card_data": {
                    "holder_name": "JOHN DOE",
                    "iin": "40518856",
                    "lfd": "6623",
                    "number_length": 16,
                    "security_code_length": 3,
                    "brand": "VISA",
                    "issuer_name": "INTL HDQTRSCENTER OWNED",
                    "issuer_code": null,
                    "country_code": "US",
                    "category": "TRADITIONAL",
                    "type": "CREDIT",
                    "three_d_secure": {
                        "version": null,
                        "electronic_commerce_indicator": null,
                        "cryptogram": null,
                        "transaction_id": null,
                        "directory_server_transaction_id": null,
                        "pares_status": null,
                        "acs_id": null
                    },
                    "fingerprint": "a3193974-8154-45b7-9e1c-8d942b96188c",
                    "expiration_month": 10,
                    "expiration_year": 26
                },
                "stored_credentials": {
                    "reason": null,
                    "usage": null,
                    "subscription_agreement_id": null,
                    "network_transaction_id": null
                }
            }
        }
    },
    "customer_payer": {
        "id": null,
        "merchant_customer_id": "1750361032",
        "first_name": "JANE",
        "last_name": "SMITH",
        "gender": "F",
        "date_of_birth": "1985-07-22",
        "email": "jane.smith@example.com",
        "nationality": "US",
        "ip_address": "73.19.200.15",
        "device_fingerprint": "xyzabc123def456ghi789",
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
            "document_type": "DRIVERS_LICENSE",
            "document_number": "D987654321"
        },
        "phone": {
            "number": "2125550100",
            "country_code": "1"
        },
        "billing_address": {
            "address_line_1": "123 Maple Drive",
            "address_line_2": "Apt 10A",
            "country": "US",
            "state": "CA",
            "city": "Los Angeles",
            "zip_code": "90001",
            "neighborhood": null
        },
        "shipping_address": {
            "address_line_1": "123 Maple Drive",
            "address_line_2": "Apt 10A",
            "country": "US",
            "state": "CA",
            "city": "Los Angeles",
            "zip_code": "90001",
            "neighborhood": null
        },
        "merchant_customer_created_at": null
    },
    "additional_data": {
        "airline": null,
        "order": {
            "fee_amount": 0,
            "shipping_amount": 0,
            "tip_amount": null,
            "items": [
                {
                    "id": "123AD",
                    "name": "Skirt",
                    "quantity": 1,
                    "unit_amount": 49.99,
                    "category": "Clothes",
                    "brand": "XYZ",
                    "sku_code": "8765432109",
                    "manufacture_part_number": "XYZ123456"
                }
            ],
            "account_funding": null,
            "tickets": null,
            "fulfillment": null,
            "discounts": null,
            "sales_channel": null
        },
        "seller_details": null
    },
    "transactions": {
        "id": "d073ccdf-6f2c-46ce-b014-647746be2f50",
        "type": "PURCHASE",
        "status": "SUCCEEDED",
        "category": "CARD",
        "amount": 49.99,
        "provider_id": "YUNO_TEST_PAYMENT_GW",
        "payment_method": {
            "vaulted_token": "",
            "type": "CARD",
            "vault_on_success": false,
            "token": "",
            "parent_payment_method_type": null,
            "detail": {
                "card": {
                    "verify": false,
                    "capture": true,
                    "installments": 1,
                    "installments_plan_id": null,
                    "first_installment_deferral": 0,
                    "installments_type": "",
                    "installment_amount": null,
                    "soft_descriptor": "",
                    "authorization_code": "226813",
                    "retrieval_reference_number": "",
                    "voucher": null,
                    "card_data": {
                        "holder_name": "JOHN DOE",
                        "iin": "40518856",
                        "lfd": "6623",
                        "number_length": 16,
                        "security_code_length": 3,
                        "brand": "VISA",
                        "issuer_name": "INTL HDQTRSCENTER OWNED",
                        "issuer_code": null,
                        "country_code": "US",
                        "category": "TRADITIONAL",
                        "type": "CREDIT",
                        "three_d_secure": {
                            "version": null,
                            "electronic_commerce_indicator": null,
                            "cryptogram": null,
                            "transaction_id": null,
                            "directory_server_transaction_id": null,
                            "pares_status": null,
                            "acs_id": null
                        },
                        "fingerprint": "a3193974-8154-45b7-9e1c-8d942b96188c",
                        "expiration_month": 10,
                        "expiration_year": 26
                    },
                    "stored_credentials": {
                        "reason": null,
                        "usage": null,
                        "subscription_agreement_id": null,
                        "network_transaction_id": null
                    }
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Card payment with shipping and order",
        "merchant_reference": "reference-0001",
        "provider_data": {
            "id": "YUNO_TEST_PAYMENT_GW",
            "transaction_id": "9d61ba94-f722-4f51-85fe-c28065d1e1f4",
            "account_id": "",
            "status": "SUCCEEDED",
            "sub_status": "",
            "status_detail": "",
            "response_message": null,
            "response_code": null,
            "raw_response": {
                "amount": {
                    "currency": "BRL",
                    "value": 2100
                },
                "merchantAccount": "YunoPaymentsECOM",
                "paymentPspReference": "ZKHXKZGXMLBX8N82",
                "pspReference": "VKJTCWZ9575ZGN82",
                "reference": "34343434",
                "status": "received"
            },
            "third_party_transaction_id": "",
            "third_party_account_id": null,
            "iso8583_response_code": null,
            "iso8583_response_message": null
        },
        "connection_data": {
            "id": "a2ee2f97-8ba0-4198-a821-3b750bc97872",
            "name": null
        },
        "created_at": "2025-06-19T19:23:52.803162Z",
        "updated_at": "2025-06-19T19:23:52.913047Z"
    },
    "transactions_history": [
        {
            "id": "d073ccdf-6f2c-46ce-b014-647746be2f50",
            "type": "PURCHASE",
            "status": "SUCCEEDED",
            "category": "CARD",
            "amount": 49.99,
            "provider_id": "YUNO_TEST_PAYMENT_GW",
            "payment_method": {
                "vaulted_token": "",
                "type": "CARD",
                "vault_on_success": false,
                "token": "",
                "parent_payment_method_type": null,
                "detail": {
                    "card": {
                        "verify": false,
                        "capture": true,
                        "installments": 1,
                        "installments_plan_id": null,
                        "first_installment_deferral": 0,
                        "installments_type": "",
                        "installment_amount": null,
                        "soft_descriptor": "",
                        "authorization_code": "226813",
                        "retrieval_reference_number": "",
                        "voucher": null,
                        "card_data": {
                            "holder_name": "JOHN DOE",
                            "iin": "40518856",
                            "lfd": "6623",
                            "number_length": 16,
                            "security_code_length": 3,
                            "brand": "VISA",
                            "issuer_name": "INTL HDQTRSCENTER OWNED",
                            "issuer_code": null,
                            "country_code": "US",
                            "category": "TRADITIONAL",
                            "type": "CREDIT",
                            "three_d_secure": {
                                "version": null,
                                "electronic_commerce_indicator": null,
                                "cryptogram": null,
                                "transaction_id": null,
                                "directory_server_transaction_id": null,
                                "pares_status": null,
                                "acs_id": null
                            },
                            "fingerprint": "a3193974-8154-45b7-9e1c-8d942b96188c",
                            "expiration_month": 10,
                            "expiration_year": 26
                        },
                        "stored_credentials": {
                            "reason": null,
                            "usage": null,
                            "subscription_agreement_id": null,
                            "network_transaction_id": null
                        }
                    }
                }
            },
            "response_code": "SUCCEEDED",
            "response_message": "Transaction successful",
            "reason": null,
            "description": "Card payment with shipping and order",
            "merchant_reference": "reference-0001",
            "provider_data": {
                "id": "YUNO_TEST_PAYMENT_GW",
                "transaction_id": "9d61ba94-f722-4f51-85fe-c28065d1e1f4",
                "account_id": "",
                "status": "SUCCEEDED",
                "sub_status": "",
                "status_detail": "",
                "response_message": null,
                "response_code": null,
                "raw_response": {
                    "amount": {
                        "currency": "BRL",
                        "value": 2100
                    },
                    "merchantAccount": "YunoPaymentsECOM",
                    "paymentPspReference": "ZKHXKZGXMLBX8N82",
                    "pspReference": "VKJTCWZ9575ZGN82",
                    "reference": "34343434",
                    "status": "received"
                },
                "third_party_transaction_id": "",
                "third_party_account_id": null,
                "iso8583_response_code": null,
                "iso8583_response_message": null
            },
            "connection_data": {
                "id": "a2ee2f97-8ba0-4198-a821-3b750bc97872",
                "name": null
            },
            "created_at": "2025-06-19T19:23:52.803162Z",
            "updated_at": "2025-06-19T19:23:52.913047Z"
        }
    ],
    "workflow": "DIRECT",
    "metadata": [],
    "fraud_screening": null,
    "payment_link_id": "",
    "subscription_code": null,
    "routing_rules": {
        "smart_routing": false,
        "monitors": false,
        "condition": {
            "id": 192539,
            "name": "Card",
            "description": ""
        }
    },
    "simplified_mode": false
}
```

### Card Direct with vault on success

Example of a successful request for payment using Card Direct. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

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
    "description": "Test",
    "account_id": "{{account-code}}",
    "merchant_order_id": "0000023",
    "country": "CO",
    "merchant_reference" : "reference-{{$randomUUID}}",
    "amount": {
        "currency": "COP",
        "value": 5000
    },
    "customer_payer": {
        "id":"967ecd18-d898-4b88-9400-dd5b01b18edc",
        "merchant_customer_id": "1690161049",
        "first_name": "Giovanna",
        "last_name": "Bartell",
        "email": "Lisandro_Leannon58@hotmail.com",
        "device_fingerprint": "hi88287gbd8d7d782ge287gbd8d7d78"
    },
    "workflow": "DIRECT",
    "payment_method": {
        "type": "CARD",
        "vault_on_success":true,
        "detail": {
            "card": {
                "card_data": {
                    "number": "4051885600446623",
                    "holder_name": "JOHN DOE",
                    "expiration_month": 10,
                    "expiration_year": 26,
                    "security_code": "456"
                }
            }
        }
    }
}
'
```
```json Response (JSON)
{
    "id": "96b56df3-0013-4401-b58e-646f5e716ab8",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test",
    "country": "CO",
    "status": "SUCCEEDED",
    "sub_status": "APPROVED",
    "merchant_order_id": "0000023",
    "created_at": "2023-07-24T01:27:23.360857Z",
    "updated_at": "2023-07-24T01:27:25.682059Z",
    "amount": {
        "captured": 0.00,
        "currency": "COP",
        "refunded": 0.00,
        "value": 5000.00
    },
    "checkout": {
        "session": "",
        "sdk_action_required": false
    },
    "payment_method": {
        "vaulted_token": "eb8caa17-6407-457b-960e-125d8d7a90c1",
        "type": "CARD",
        "vault_on_success": true,
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
                "authorization_code": "123456",
                "retrieval_reference_number": "",
                "voucher": null,
                "card_data": {
                    "holder_name": "JOHN DOE",
                    "iin": "40518856",
                    "lfd": "6623",
                    "number_length": 16,
                    "security_code_length": 3,
                    "brand": "VISA",
                    "issuer_name": "",
                    "issuer_code": null,
                    "category": null,
                    "type": "CREDIT",
                    "three_d_secure": {
                        "version": null,
                        "electronic_commerce_indicator": null,
                        "cryptogram": null,
                        "transaction_id": null,
                        "directory_server_transaction_id": null,
                        "pares_status": null,
                        "acs_id": null
                    }
                }
            }
        }
    },
    "customer_payer": {
        "id": "967ecd18-d898-4b88-9400-dd5b01b18edc",
        "merchant_customer_id": "1690161049",
        "first_name": "Giovanna",
        "last_name": "Bartell",
        "gender": null,
        "date_of_birth": null,
        "email": "Lisandro_Leannon58@hotmail.com",
        "nationality": null,
        "ip_address": null,
        "device_fingerprint": "hi88287gbd8d7d782ge287gbd8d7d78",
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
        "id": "85c19c82-dc31-4a50-aa7d-570d89dbc475",
        "type": "PURCHASE",
        "status": "SUCCEEDED",
        "category": "CARD",
        "amount": 5000.00,
        "provider_id": "YUNO_TEST_PAYMENT_GW",
        "payment_method": {
            "vaulted_token": "eb8caa17-6407-457b-960e-125d8d7a90c1",
            "type": "CARD",
            "vault_on_success": true,
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
                    "authorization_code": "123456",
                    "retrieval_reference_number": "",
                    "voucher": null,
                    "card_data": {
                        "holder_name": "JOHN DOE",
                        "iin": "40518856",
                        "lfd": "6623",
                        "number_length": 16,
                        "security_code_length": 3,
                        "brand": "VISA",
                        "issuer_name": "",
                        "issuer_code": null,
                        "category": null,
                        "type": "CREDIT",
                        "three_d_secure": {
                            "version": null,
                            "electronic_commerce_indicator": null,
                            "cryptogram": null,
                            "transaction_id": null,
                            "directory_server_transaction_id": null,
                            "pares_status": null,
                            "acs_id": null
                        }
                    }
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test",
        "merchant_reference": "reference-7cf75e3a-c8eb-4c62-bd02-74928f68f174",
        "provider_data": {
            "id": "YUNO_TEST_PAYMENT_GW",
            "transaction_id": "604075b9-52e9-48f5-8fcf-3c2d9bacbe66",
            "account_id": "",
            "status": "SUCCEEDED",
            "sub_status": "",
            "status_detail": "",
            "response_message": "",
            "raw_response": {
                "amount": {
                    "currency": "BRL",
                    "value": 2100
                },
                "merchantAccount": "YunoPaymentsECOM",
                "paymentPspReference": "ZKHXKZGXMLBX8N82",
                "pspReference": "VKJTCWZ9575ZGN82",
                "reference": "34343434",
                "status": "received"
            },
            "third_party_transaction_id": ""
        },
        "created_at": "2023-07-24T01:27:23.473451Z",
        "updated_at": "2023-07-24T01:27:25.550651Z"
    },
    "split": [],
    "workflow": "DIRECT",
    "metadata": [],
    "fraud_screening": null,
    "payment_link_code": ""
}
```

### Card Direct with vaulted token

Example of a request for payment using Card Direct with a vaulted token. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

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
    "description": "Test",
    "account_id": "{{account-code}}",
    "merchant_order_id": "0000023",
    "country": "CO",
    "merchant_reference" : "reference-{{$randomUUID}}",
    "amount": {
        "currency": "COP",
        "value": 5000
    },
    "customer_payer": {
        "id":"967ecd18-d898-4b88-9400-dd5b01b18edc",
        "merchant_customer_id": "1690161049",
        "first_name": "Giovanna",
        "last_name": "Bartell",
        "email": "Lisandro_Leannon58@hotmail.com",
        "device_fingerprint": "hi88287gbd8d7d782ge287gbd8d7d78"
    },
    "workflow": "DIRECT",
    "payment_method": {
        "type":"CARD",
        "vaulted_token": "eb8caa17-6407-457b-960e-125d8d7a90c1"
    }
}
'
```
```json
{
    "id": "821ddfe4-309a-46a8-bd4b-819564aa9c5a",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test",
    "country": "CO",
    "status": "SUCCEEDED",
    "sub_status": "APPROVED",
    "merchant_order_id": "0000023",
    "created_at": "2023-07-24T01:28:45.444722Z",
    "updated_at": "2023-07-24T01:28:47.712002Z",
    "amount": {
        "captured": 0.00,
        "currency": "COP",
        "refunded": 0.00,
        "value": 5000.00
    },
    "checkout": {
        "session": "",
        "sdk_action_required": false
    },
    "payment_method": {
        "vaulted_token": "eb8caa17-6407-457b-960e-125d8d7a90c1",
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
                "authorization_code": "123456",
                "retrieval_reference_number": "",
                "voucher": null,
                "card_data": {
                    "holder_name": "JOHN DOE",
                    "iin": "40518856",
                    "lfd": "6623",
                    "number_length": 16,
                    "security_code_length": 3,
                    "brand": "VISA",
                    "issuer_name": "",
                    "issuer_code": null,
                    "category": null,
                    "type": "CREDIT",
                    "three_d_secure": {
                        "version": null,
                        "electronic_commerce_indicator": null,
                        "cryptogram": null,
                        "transaction_id": null,
                        "directory_server_transaction_id": null,
                        "pares_status": null,
                        "acs_id": null
                    }
                }
            }
        }
    },
    "customer_payer": {
        "id": "967ecd18-d898-4b88-9400-dd5b01b18edc",
        "merchant_customer_id": "1690161049",
        "first_name": "Giovanna",
        "last_name": "Bartell",
        "gender": null,
        "date_of_birth": null,
        "email": "Lisandro_Leannon58@hotmail.com",
        "nationality": null,
        "ip_address": null,
        "device_fingerprint": "hi88287gbd8d7d782ge287gbd8d7d78",
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
        "id": "a47e879e-3cd1-49f3-ab72-fc33b0185057",
        "type": "PURCHASE",
        "status": "SUCCEEDED",
        "category": "CARD",
        "amount": 5000.00,
        "provider_id": "YUNO_TEST_PAYMENT_GW",
        "payment_method": {
            "vaulted_token": "eb8caa17-6407-457b-960e-125d8d7a90c1",
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
                    "authorization_code": "123456",
                    "retrieval_reference_number": "",
                    "voucher": null,
                    "card_data": {
                        "holder_name": "JOHN DOE",
                        "iin": "40518856",
                        "lfd": "6623",
                        "number_length": 16,
                        "security_code_length": 3,
                        "brand": "VISA",
                        "issuer_name": "",
                        "issuer_code": null,
                        "category": null,
                        "type": "CREDIT",
                        "three_d_secure": {
                            "version": null,
                            "electronic_commerce_indicator": null,
                            "cryptogram": null,
                            "transaction_id": null,
                            "directory_server_transaction_id": null,
                            "pares_status": null,
                            "acs_id": null
                        }
                    }
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test",
        "merchant_reference": "reference-22103236-c3fc-4871-9fc0-98ce48a9f553",
        "provider_data": {
            "id": "YUNO_TEST_PAYMENT_GW",
            "transaction_id": "f9bcb8a8-d5d8-4c53-b551-5932c9804f16",
            "account_id": "",
            "status": "SUCCEEDED",
            "sub_status": "",
            "status_detail": "",
            "response_message": "",
            "raw_response": {
                "amount": {
                    "currency": "BRL",
                    "value": 2100
                },
                "merchantAccount": "YunoPaymentsECOM",
                "paymentPspReference": "ZKHXKZGXMLBX8N82",
                "pspReference": "VKJTCWZ9575ZGN82",
                "reference": "34343434",
                "status": "received"
            },
            "third_party_transaction_id": ""
        },
        "created_at": "2023-07-24T01:28:45.562437Z",
        "updated_at": "2023-07-24T01:28:47.639121Z"
    },
    "split": [],
    "workflow": "DIRECT",
    "metadata": [],
    "fraud_screening": null,
    "payment_link_code": ""
}
```

### Card Direct with 3DS

Example of a request for payment using Card Direct with the 3DS implementation that requires the Yuno Setup. Below are examples of a request and the received response for successful payment creation. The request is presented using the cURL format, and the response is a JSON object.

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
  "country": "CO",
  "amount": {
    "currency": "COP",
    "value": "20000"
  },
  "customer_payer": {
    "id":"customer-123",
    "first_name": "JOHN",
    "last_name": "DOE",
    "email": "test@test.com"
  },
  "payment_method": {
    "detail": {
      "card": {
        "card_data": {
          "number": "4111111111111111",
          "expiration_month": 11,
          "expiration_year": 28,
          "security_code": "123",
          "holder_name": "JOHN DOE"
        },
        "three_d_secure":{
          "three_d_secure_setup_id":"24127d61-b852-42fb-acd4-1ee661645376"
        }
      }
    },
    "type": "CARD"
  },
  "account_id": "<Your account_id>",
  "description": "SUCCESSFUL",
  "merchant_order_id": "Order_id",
  "callback_url":"www.google.com",
  "workflow": "DIRECT"
}
'
```
```json
{
    "payment": {
        "id": "cb3ca163-cb79-41d7-b9a3-0115e30a7c01",
        "idempotency_key": "fc0d89a1-8d18-4759-8d0a-ee1c6d0386e2",
        "account_code": "26a6626c-d3ec-4caa-bf7c-a994b145dc00",
        "account_id": "26a6626c-d3ec-4caa-bf7c-a994b145dc00",
        "description": "TEST_3DS",
        "country": "CO",
        "status": "SUCCEEDED",
        "sub_status": "APPROVED",
        "merchant_order_id": "0000023",
        "created_at": "2023-07-17T17:00:39.678379Z",
        "updated_at": "2023-07-17T17:41:48.453381Z",
        "amount": {
            "currency": "COP",
            "value": 5000.00,
            "refunded": 0.00,
            "captured": 0.00
        },
        "checkout": {
            "session": "b0751c96-0b00-4b8c-8372-c16f72f60598",
            "sdk_action_required": false
        },
        "customer_payer": {
            "id": "fc7ef8ae-000d-4903-ab76-494ebc8d5fa3",
            "merchant_customer_id": "1689374657",
            "first_name": "Rashad",
            "last_name": "Rath",
            "gender": null,
            "date_of_birth": null,
            "email": "Newell.Cronin79@hotmail.com",
            "nationality": null,
            "ip_address": null,
            "device_fingerprint": null,
            "browser_info": null,
            "document": {
                "document_type": "CC",
                "document_number": "38799999"
            },
            "phone": null,
            "billing_address": {
                "address_line_1": "",
                "address_line_2": ""
            },
            "shipping_address": {
                "address_line_1": "",
                "address_line_2": ""
            }
        },
        "additional_data": {
            "airline": null,
            "order": null,
            "seller_details": null
        },
        "taxes": null,
        "transactions": [
            {
                "id": "caada737-27ab-46ca-91a9-744da64c4787",
                "type": "THREE_D_SECURE",
                "status": "SUCCEEDED",
                "category": "CARD",
                "amount": 5000.00,
                "provider_id": "CYBERSOURCE_3DS",
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
                            "authorization_code": "",
                            "retrieval_reference_number": "",
                            "voucher": null,
                            "redirect_url": "https://checkout.staging.y.uno/payment?session=14c263bd-e01d-400f-885a-70205df8b417",
                            "card_data": {
                                "holder_name": "John Doe",
                                "iin": "44565300",
                                "lfd": "0007",
                                "number_length": 16,
                                "security_code_length": 3,
                                "brand": "VISA",
                                "issuer_name": "",
                                "issuer_code": null,
                                "category": null,
                                "type": "CREDIT",
                                "three_d_secure": {
                                    "three_d_secure_setup_id": "24127d61-b852-42fb-acd4-1ee661645376",
                                    "version": null,                        
                                  	"electronic_commerce_indicator": null,
                                    "cryptogram": null,
                                    "transaction_id": null,
                                  	"directory_server_transaction_id": null,
                                    "pares_status": "Y"
                                }
                            }
                        }
                    }
                },
                "response_code": "SUCCEEDED",
                "response_message": "Transaction successful",
                "reason": null,
                "description": "TEST_3DS",
                "merchant_reference": "reference-5f6dd991-ab14-4da3-b7d8-9f24a04ebd92",
                "provider_data": {
                    "id": "CYBERSOURCE_3DS",
                    "transaction_id": "6896132402506977804951",
                    "account_id": "",
                    "status": "AUTHENTICATION_SUCCESSFUL",
                    "sub_status": "",
                    "status_detail": "",
                    "response_message": "CONSUMER_AUTHENTICATION_REQUIRED",
                    "raw_response": {
                        "clientReferenceInformation": {
                            "code": "24127d61-b852-42fb-acd4-1ee661645376"
                        },
                        "consumerAuthenticationInformation": {
                            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxZmM5ZDVhMS04M2ZhLTQwYWEtYjI5Ny1iZDM1ZGIxODQ4ZjAiLCJpYXQiOjE2ODk2MTMyNDAsImlzcyI6IjVkZDgzYmYwMGU0MjNkMTQ5OGRjYmFjYSIsImV4cCI6MTY4OTYxNjg0MCwiT3JnVW5pdElkIjoiNjQwYTM1NjlkODdhMjUwYTQyNTEwOWRjIiwiUGF5bG9hZCI6eyJBQ1NVcmwiOiJodHRwczovL21lcmNoYW50YWNzc3RhZy5jYXJkaW5hbGNvbW1lcmNlLmNvbS9NZXJjaGFudEFDU1dlYi9wYXJlcS5qc3A_dmFhPWImZ29sZD1BQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUEiLCJQYXlsb2FkIjoiZU5wVlVWMXZna0FRZkw5ZlFVd2ZHKzZBS3RHc2w5QnE2a2MwdHRCb254cUViU1dWRDQvRHFMKytkd2kxdmFlZHljN3R6aXdFTzRFNDhqR3FCSEpZWUZtR1gyZ2s4YkRqWC9KcHZqaVV6M0kyUzc4LzAvUE1ZeDBPSys4VkR4eU9LTW9rejdobE10TUcya0tpdmhEUkxzd2toekE2UEU2WC9LSFh0NjBlMEFZU1NGRk1SendZKzhHSE0vS0JYakdCTEV5UnYxZFpiaWphQ0xDVVFHdU9RSlJYbVJSbmJya01hQXNJVkdMUGQxSVc1WURTczZtVVFEVkZnTjYyV0ZXNktwVzVVeEx6TjZjNCt1ditNdG9zSi9HNG1HL1hNdDF1OXZPWHdCc0MxUjBFNGxBaXQ1bnRNTmR5RGNzZE1EWncra0JybmtDWTZ2bjhybXN5eHU2WldxaGhDQlI2bG5kRlhhWWYwTCtjTWxJSmdWblVPbWtSQVR3VmVZYXFSNFg1V3lzanQvV2ZKanJTU0txc1hPWTR6TEoxcGpXdTVZbUt4TzR4cTlZbmRUNVVhMmh6TWRvY1YxWC9qdjREQVEybVdnPT0iLCJUcmFuc2FjdGlvbklkIjoiU3pvSW9NcXNHdEpKbWtmbXlKQTAifSwiT2JqZWN0aWZ5UGF5bG9hZCI6dHJ1ZSwiUmV0dXJuVXJsIjoiaHR0cHM6Ly9zdGFnaW5nLnkudW5vL2N5YmVyc291cmNlLTNkcy13ZWJob29rL3YxL2NvbmZpcm1hdGlvbnMvYXV0aC8yNDEyN2Q2MS1iODUyLTQyZmItYWNkNC0xZWU2NjE2NDUzNzYifQ.5ehSTA5uUKc2DfvTRGJZ8dPKbxAJ5WproKSTLqu4egM",
                            "acsUrl": "https://merchantacsstag.cardinalcommerce.com/MerchantACSWeb/pareq.jsp?vaa=b&gold=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                            "authenticationPath": "ENROLLED",
                            "authenticationTransactionId": "SzoIoMqsGtJJmkfmyJA0",
                            "pareq": "eNpVUV1vgkAQfL9fQUwfG+6AKtGsl9Bq6kc0ttBonxqEbSWVD4/DqL++dwi1vaedyc7tziwEO4E48jGqBHJYYFmGX2gk8bDjX/JpvjiUz3I2S78/0/PMYx0OK+8VDxyOKMokz7hlMtMG2kKivhDRLswkhzA6PE6X/KHXt60e0AYSSFFMRzwY+8GHM/KBXjGBLEyRv1dZbijaCLCUQGuOQJRXmRRnbrkMaAsIVGLPd1IW5YDSs6mUQDVFgN62WFW6KpW5UxLzN6c4+uv+MtosJ/G4mG/XMt1u9vOXwBsC1R0E4lAit5ntMNdyDcsdMDZw+kBrnkCY6vn8rmsyxu6ZWqhhCBR6lndFXaYf0L+cMlIJgVnUOmkRATwVeYaqR4X5Wysjt/WfJjrSSKqsXOY4zLJ1pjWu5YmKxO4xq9YndT5Ua2hzMdocV1X/jv4DAQ2mWg==",
                            "proofXml": "<AuthProof><Time>2023 Jul 17 17:00:39</Time><DSUrl>https://merchantacsstag.cardinalcommerce.com/MerchantACSWeb/vereq.jsp?acqid=CYBS</DSUrl><VEReqProof><Message id=\"SzoIoMqsGtJJmkfmyJA0\"><VEReq><version>1.0.2</version><pan>XXXXXXXXXXXX0007</pan><Merchant><acqBIN>469216</acqBIN><merID>TEST_3DS</merID></Merchant><Browser><deviceCategory>0</deviceCategory><accept>*/*</accept><userAgent>Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36</userAgent></Browser></VEReq></Message></VEReqProof><VEResProof><Message id=\"SzoIoMqsGtJJmkfmyJA0\"><VERes><version>1.0.2</version><CH><enrolled>Y</enrolled><acctID>7033012</acctID></CH><url>https://merchantacsstag.cardinalcommerce.com/MerchantACSWeb/pareq.jsp?vaa=b&amp;gold=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</url><protocol>ThreeDSecure</protocol></VERes></Message></VEResProof></AuthProof>",
                            "proxyPan": "7033012",
                            "specificationVersion": "1.0.2",
                            "stepUpUrl": "https://centinelapistag.cardinalcommerce.com/V2/Cruise/StepUp",
                            "strongAuthentication": {
                                "OutageExemptionIndicator": "0"
                            },
                            "token": "AxjzbwSTddcP6s4BiIKXABEBURzGv4QYVRP0JAY/LtaSZejFq0T8BEAAwwdp",
                            "veresEnrolled": "Y",
                            "xid": "U3pvSW9NcXNHdEpKbWtmbXlKQTA="
                        },
                        "errorInformation": {
                            "message": "The cardholder is enrolled in Payer Authentication. Please authenticate the cardholder before continuing with the transaction.",
                            "reason": "CONSUMER_AUTHENTICATION_REQUIRED"
                        },
                        "id": "6896132402506977804951",
                        "paymentInformation": {
                            "card": {
                                "bin": "445653",
                                "type": "VISA"
                            }
                        },
                        "status": "PENDING_AUTHENTICATION",
                        "submitTimeUtc": "2023-07-17T17:00:40Z"
                    },
                    "third_party_transaction_id": null
                },
                "three_d_secure_action_required": null,
                "created_at": "2023-07-17T17:00:39.765728Z",
                "updated_at": "2023-07-17T17:41:43.593769Z"
            },
            {
                "id": "4081b900-3efa-44a2-83d8-bca350476b06",
                "type": "PURCHASE",
                "status": "SUCCEEDED",
                "category": "CARD",
                "amount": 5000.00,
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
                            "authorization_code": "445975",
                            "retrieval_reference_number": "",
                            "voucher": null,
                            "card_data": {
                                "holder_name": "John Doe",
                                "iin": "44565300",
                                "lfd": "0007",
                                "number_length": 16,
                                "security_code_length": 3,
                                "brand": "VISA",
                                "issuer_name": "",
                                "issuer_code": null,
                                "category": null,
                                "type": "CREDIT",
                                "three_d_secure": {
                                    "three_d_secure_setup_id": "24127d61-b852-42fb-acd4-1ee661645376",
                                    "version": null,                        
                                  	"electronic_commerce_indicator": null,
                                    "cryptogram": null,
                                    "transaction_id": null,
                                  	"directory_server_transaction_id": null,
                                    "pares_status": "Y"
                                }
                            }
                        }
                    }
                },
                "response_code": "SUCCEEDED",
                "response_message": "Transaction successful",
                "reason": null,
                "description": "TEST_3DS",
                "merchant_reference": null,
                "provider_data": {
                    "id": "DLOCAL",
                    "transaction_id": "T-385928-57934367-25ca-4445-a973-da5c1a4635b2",
                    "account_id": "",
                    "status": "PAID",
                    "sub_status": "",
                    "status_detail": "200",
                    "response_message": "The payment was paid.",
                    "raw_response": {
                        "value": "{\"id\":\"T-385928-57934367-25ca-4445-a973-da5c1a4635b2\",\"amount\":5000,\"currency\":\"COP\",\"payment_method_id\":\"CARD\",\"payment_method_type\":\"CARD\",\"payment_method_flow\":\"DIRECT\",\"country\":\"CO\",\"card\":{\"holder_name\":\"John Doe\",\"expiration_month\":1,\"expiration_year\":2026,\"brand\":\"VI\",\"last4\":\"0007\",\"installments\":1,\"installments_responsible\":\"customer\"},\"three_dsecure\":{},\"created_date\":\"2023-07-17T17:41:44.000+0000\",\"approved_date\":\"2023-07-17T17:41:48.000+0000\",\"status\":\"PAID\",\"status_detail\":\"The payment was paid.\",\"status_code\":\"200\",\"order_id\":\"4081b900-3efa-44a2-83d8-bca350476b06\",\"description\":\"TEST_3DS\",\"notification_url\":\"https://staging.y.uno/dlocal-webhook/v1/confirmations\",\"acquirer\":{\"authorization_code\":\"445975\"}}"
                    },
                    "third_party_transaction_id": ""
                },
                "three_d_secure_action_required": null,
                "created_at": "2023-07-17T17:41:43.752435Z",
                "updated_at": "2023-07-17T17:41:48.395863Z"
            }
        ],
        "split": [],
        "callback_url": "https://google.com",
        "workflow": "REDIRECT",
        "fraud_screening": null,
        "metadata": [],
        "payment_link_code": ""
    }
}
```
