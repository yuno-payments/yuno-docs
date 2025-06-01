---
title: Object and Examples
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Examples
  description: >-
    Here you find some examples of webhooks and the JSON attributes that you
    will receive in the notification.
  robots: index
next:
  description: ''
---
# Webhook attributes

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
    <p><strong>type_event</strong> <small>string </small>
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
          href="the-payment-method-object-checkout">payment method object</a> (for enrollment and other objects).</p>
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

<HTMLBlock>{`
<body>
  <section class="link_cards_container">

    <a class="card" href="/docs/examples#payment-webhook-v2">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Payment Webhook V2</h4>
    </a>

    <a class="card" href="/docs/examples#payment-webhook-v1">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Payment Webhook V1</h4>
    </a>
    <a class="card" href="/docs/examples#chargeback-webhook-v2">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Chargeback Webhook V2</h4>
    </a>
    <a class="card" href="/docs/examples#chargeback-webhook-v1">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Chargeback Webhook V1</h4>
    </a>

    <a class="card" href="/docs/examples#enrollment">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Enrollment</h4>
    </a>
    <a class="card" href="/docs/examples#payouts">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Payouts</h4>
    </a>
    
    <a class="card" href="/docs/examples#subscriptions">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Subscriptions</h4>
    </a>


  </section>

</body>
`}</HTMLBlock>

## Payment

### Payment Webhook V2

The next JSON object presents an example of a data structure related to a payment event from Webhook V2.

```json
{
    "type": "payment",
    "type_event": "payment.purchase",
    "account_id": "2c05976d-1234-1234-1234-6421883de48d",
    "retry": 0,
    "version": 2,
    "data": {
        "payment": {
            "id": "a546c566-1703-4fba-b334-c46e89bc97f7",
            "account_id": "2c05976d-1234-1234-1234-6421883de48d",
            "description": "Testing Yuno",
            "country": "UY",
            "status": "SUCCEEDED",
            "sub_status": "APPROVED",
            "order_id": "Order1234",
            "merchant_order_id": "Test1234",
            "created_at": "2024-07-19T16:31:59.528561Z",
            "updated_at": "2024-07-19T16:32:02.203776Z",
            "idempotency_key": "9e2aba6a-1234-1234-1234-03a0a67ee15f",
            "amount": {
                "currency": "UYU",
                "value": 1458,
                "refunded": 0,
                "captured": 0
            },
            "checkout": {
                "session": "2f3423dd-1234-1234-1234-2c7da5ad1caf",
                "sdk_action_required": false
            },
            "customer_payer": {
                "id": "96bf8513-1234-1234-1234-0087b2a60535",
                "merchant_customer_id": "user1234",
                "first_name": "harry ",
                "last_name": "potter ",
                "gender": "",
                "date_of_birth": null,
                "email": "testing6@y.uno",
                "nationality": null,
                "ip_address": "123.123.123.27",
                "device_fingerprint": null,
                "third_party_session_id": "third_party_session_id",
                "merchant_customer_created_at": "2019-01-08T18:38:55.617Z",
                "browser_info": {
                    "user_agent": "Yuno's/20979 CFNetwork/1496.0.7 Darwin/23.5.0",
                    "accept_header": "*/*",
                    "color_depth": null,
                    "screen_height": "844.0",
                    "screen_width": "390.0",
                    "javascript_enabled": null,
                    "language": "es-UY",
                    "accept_content": null,
                    "accept_browser": null,
                    "java_enabled": null,
                    "browser_time_difference": null
                },
                "document": {
                    "document_number": "99999999",
                    "document_type": "CI"
                },
                "billing_address": {
                    "address_line_1": "GEANT - Av. A la Playa y calle de 17",
                    "address_line_2": "",
                    "city": "Canelones",
                    "country": "UY",
                    "state": "Canelones",
                    "zip_code": "-",
                    "neighborhood": null
                },
                "shipping_address": {
                    "address_line_1": "GEANT - Av. A la Playa y calle de 17",
                    "address_line_2": "",
                    "city": "Canelones",
                    "country": "UY",
                    "state": "Canelones",
                    "zip_code": "-",
                    "neighborhood": null
                },
                "phone": {
                    "country_code": "598",
                    "number": "12345678"
                }
            },
            "additional_data": {
                "order": {
                    "shipping_amount": 0,
                    "fee_amount": null,
                    "tip_amount": null,
                    "items": [
                        {
                            "id": "item123",
                            "name": "Yuno Testing",
                            "quantity": 1,
                            "unit_amount": 1458,
                            "category": "services",
                            "brand": null,
                            "sku_code": null,
                            "manufacture_part_number": null
                        }
                    ],
                    "taxes": []
                },
                "airline": null,
                "seller_details": null
            },
            "transactions": {
                "id": "3a35add9-89d6-4b11-9f17-24a76f4d046e",
                "type": "PURCHASE",
                "status": "SUCCEEDED",
                "category": "CARD",
                "amount": 1458,
                "provider_id": "YUNO TEST GATEWAY",
                "response_code": "SUCCEEDED",
                "merchant_reference": "Test1234",
                "response_message": "Transaction successful",
                "reason": null,
                "description": "Testing Yuno",
                "created_at": "2024-07-19T16:31:59.617130Z",
                "updated_at": "2024-07-19T16:32:02.138835Z",
                "payment_method": {
                    "token": "902f17f9-1234-1234-1234-3322f5ebdbb5",
                    "type": "CARD",
                    "vaulted_token": "795b4f2e-1234-1234-1234-fcc1930d5d4c",
                    "vault_on_success": false,
                    "payment_method_detail": {
                        "card": {
                            "verify": null,
                            "capture": true,
                            "installments": 1,
                            "installments_plan_id": null,
                            "first_installment_deferral": null,
                            "installments_amount": null,
                            "installments_type": null,
                            "soft_descriptor": "",
                            "authorization_code": "123456",
                            "retrieval_reference_number": "",
                            "voucher": null,
                            "card_data": {
                                "holder_name": "HARRY POTTER",
                                "iin": "51584511",
                                "lfd": "1234",
                                "number_length": 16,
                                "security_code_length": 3,
                                "brand": "MASTERCARD",
                                "issuer_name": "ECONSTAR SA",
                                "issuer_code": null,
                                "category": "MRG - Prepaid MasterCard Card",
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
                                "network_token": null,
                                "fingerprint": null
                            },
                            "stored_credentials": {
                                "reason": null,
                                "usage": null
                            }
                        },
                        "wallet": null,
                        "bnpl": null,
                        "bank_transfer": null,
                        "ticket": null,
                        "payment_link": null
                    }
                },
                "provider": {
                    "provider_transaction_id": "YUNO-51056-b673b951-aaa-aaa-aaa-123489aee2e0"
                },
                "provider_data": {
                    "raw_response": {
                        "value": "provider raw response"
                    },
                    "id": "DLOCAL",
                    "transaction_id": "YUNO-51056-b673b951-aaa-aaa-aaa-123489aee2e0",
                    "account_id": "699ec8d444",
                    "status": "PAID",
                    "status_detail": null,
                    "response_message": "The payment was paid.",
                    "response_code": "200",
                    "third_party_transaction_id": "",
                    "third_party_account_id": ""
                },
                "simplified_mode": false,
                "third_party_session_id": "third_party_session_id"
            },
            "transactions_history": [
                {
                    "id": "3a35add9-89d6-4b11-9f17-24a76f4d046e",
                    "type": "PURCHASE",
                    "status": "SUCCEEDED",
                    "category": "CARD",
                    "amount": 1458,
                    "provider_id": "YUNO TEST GATEWAY",
                    "response_code": "SUCCEEDED",
                    "merchant_reference": "Test1234",
                    "response_message": "Transaction successful",
                    "reason": null,
                    "description": "Testing Yuno",
                    "created_at": "2024-07-19T16:31:59.617130Z",
                    "updated_at": "2024-07-19T16:32:02.138835Z",
                    "payment_method": {
                        "token": "902f17f9-1234-1234-1234-3322f5ebdbb5",
                        "type": "CARD",
                        "vaulted_token": "795b4f2e-1234-1234-1234-fcc1930d5d4c",
                        "vault_on_success": false,
                        "payment_method_detail": {
                            "card": {
                                "verify": null,
                                "capture": true,
                                "installments": 1,
                                "installments_plan_id": null,
                                "first_installment_deferral": null,
                                "installments_amount": null,
                                "installments_type": null,
                                "soft_descriptor": "",
                                "authorization_code": "123456",
                                "retrieval_reference_number": "",
                                "voucher": null,
                                "card_data": {
                                    "holder_name": "HARRY POTTER",
                                    "iin": "51584511",
                                    "lfd": "1234",
                                    "number_length": 16,
                                    "security_code_length": 3,
                                    "brand": "MASTERCARD",
                                    "issuer_name": "ECONSTAR SA",
                                    "issuer_code": null,
                                    "category": "MRG - Prepaid MasterCard Card",
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
                                    "network_token": null,
                                    "fingerprint": null
                                },
                                "stored_credentials": {
                                    "reason": null,
                                    "usage": null
                                }
                            },
                            "wallet": null,
                            "bnpl": null,
                            "bank_transfer": null,
                            "ticket": null,
                            "payment_link": null
                        }
                    },
                    "provider": {
                        "provider_transaction_id": "YUNO-51056-b673b951-aaa-aaa-aaa-123489aee2e0"
                    },
                    "provider_data": {
                        "raw_response": {
                            "value": "raw_response"
                        },
                        "id": "DLOCAL",
                        "transaction_id": "YUNO-51056-b673b951-aaa-aaa-aaa-123489aee2e0",
                        "account_id": "699ec8d444",
                        "status": "PAID",
                        "status_detail": null,
                        "response_message": "The payment was paid.",
                        "response_code": "200",
                        "third_party_transaction_id": "",
                        "third_party_account_id": ""
                    },
                    "simplified_mode": false,
                    "third_party_session_id": "json object"
                }
            ],
            "callback_url": null,
            "workflow": "SDK_CHECKOUT",
            "split": [],
            "payment_link_code": "",
            "subscription_id": null,
            "fraud_screening": null,
            "metadata": [],
            "routing_rules": {
                "condition": {
                    "id": 222770,
                    "name": null,
                    "description": null
                }
            }
        }
    }
}
```

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
      ],
     "subscription_id":null,
     "payment_link_id":null
   }
}
```

### Chargeback Webhook V2

The next JSON object presents an example of a data structure related to a payment event from Webhook V2.

```json
{
   "type":"payment",
   "type_event":"payment.chargeback",
   "account_id":"a4441009-df56-4a59-a515-ca9b949c4ce3",
   "retry":0,
   "version":2,
   "data":{
      "payment":{
         "id":"ae70d7f9-e0a2-4e37-a12f-765e8af87924",
         "account_id":"a4441009-df56-4a59-a515-ca9b949c4ce3",
         "description":"test Ecommerce",
         "country":"MX",
         "status":"IN_DISPUTE",
         "sub_status":"RECEIVED",
         "order_id":"584-67f854a2eb05a22320e86071",
         "merchant_order_id":"584-67f854a2eb05a22320e86071",
         "created_at":"2025-04-10T23:30:53.210656Z",
         "updated_at":"2025-04-17T04:46:49.640765Z",
         "idempotency_key":"485d3965-6deb-4fc5-81de-4a7211c835bc",
         "amount":{
            "currency":"MXN",
            "value":418.0,
            "refunded":0.0,
            "captured":0.0,
            "currency_conversion":null
         },
         "checkout":{
            "session":"4f335b32-79de-41a7-b30b-f478620bc7a8",
            "sdk_action_required":false
         },
         "customer_payer":{
            "id":"4476c479-9a32-4910-83d8-b74b7b8eb86f",
            "merchant_customer_id":"67f854536e2a02461a1a8f5f",
            "first_name":"merit",
            "last_name":"amador",
            "gender":"",
            "date_of_birth":null,
            "email":"bolitas.nuca9b@icloud.com",
            "nationality":null,
            "ip_address":"200.68.159.190",
            "device_fingerprint":null,
            "third_party_session_id":null,
            "device_fingerprints":[
               
            ],
            "merchant_customer_created_at":"2025-04-10T23:23:46.357Z",
            "browser_info":{
               "user_agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
               "accept_header":"*/*",
               "color_depth":"24",
               "screen_height":"852",
               "screen_width":"393",
               "javascript_enabled":true,
               "language":"es",
               "accept_content":"*/*",
               "accept_browser":"*/*",
               "java_enabled":false,
               "browser_time_difference":"360"
            },
            "document":null,
            "billing_address":{
               "address_line_1":"Av. test test No. 193 Local C-1-2-3 Plaza Galerias Col. test test C.P11300 test D.F",
               "address_line_2":"",
               "city":"test",
               "country":"MX",
               "state":"-",
               "zip_code":"-",
               "neighborhood":null
            },
            "shipping_address":{
               "address_line_1":"Av. test test No. 193 Local C-1-2-3 test test Col. test test C.P11300 test D.F",
               "address_line_2":"",
               "city":"CDMX",
               "country":"MX",
               "state":"-",
               "zip_code":"-",
               "neighborhood":null
            },
            "phone":{
               "country_code":"52",
               "number":"5659708369"
            }
         },
         "additional_data":{
            "order":{
               "shipping_amount":0.0,
               "fee_amount":0.0,
               "tip_amount":null,
               "items":[
                  {
                     "id":"26609",
                     "name":"McTrío Grande Signature BBQ Crispy Onion",
                     "quantity":2,
                     "unit_amount":193.0,
                     "category":"others",
                     "brand":null,
                     "sku_code":"26609",
                     "manufacture_part_number":null
                  }
               ],
               "taxes":[
                  
               ],
               "shipping":null,
               "account_funding":null,
               "tickets":[
                  
               ],
               "fulfillment":null,
               "discounts":[
                  
               ]
            },
            "airline":null,
            "seller_details":null
         },
         "transactions":{
            "id":"5f354190-ffe8-4b25-a73d-55fe25821067",
            "type":"CHARGEBACK",
            "status":"CREATED",
            "category":"CARD",
            "amount":418.0,
            "provider_id":"ADYEN",
            "response_code":"ACTION_REQUIRED",
            "merchant_reference":"YU00000058467f854a2eb05a22320e86071",
            "response_message":"Chargeback or Inquiry received. Decision or documentation must be provided",
            "reason":"REQUESTED_BY_CUSTOMER",
            "description":"webhook transaction",
            "created_at":"2025-04-17T04:46:49.591869Z",
            "updated_at":"2025-04-17T04:46:49.616143Z",
            "payment_method":{
               "token":"592c7a1c-e34c-4dc1-851f-5bd41bc32c68",
               "type":"CARD",
               "vaulted_token":"2146a9c4-56c9-43a5-a35b-916bf15f7772",
               "vault_on_success":false,
               "parent_payment_method_type":null,
               "payment_method_detail":{
                  "card":{
                     "verify":false,
                     "capture":false,
                     "installments":1,
                     "installments_plan_id":null,
                     "first_installment_deferral":null,
                     "installments_amount":null,
                     "installments_type":null,
                     "soft_descriptor":"",
                     "authorization_code":"373761",
                     "retrieval_reference_number":"",
                     "voucher":null,
                     "card_data":{
                        "holder_name":"YOANA CALAM",
                        "iin":"55123824",
                        "lfd":"2451",
                        "number_length":16,
                        "security_code_length":3,
                        "brand":"MASTERCARD",
                        "issuer_name":"BANCO AZTECA INSTITUCION BANCA MULTIPLE",
                        "issuer_code":null,
                        "country_code":"MX",
                        "category":"DEBIT MASTERCARD",
                        "type":"DEBIT",
                        "three_d_secure":{
                           "version":null,
                           "electronic_commerce_indicator":null,
                           "cryptogram":null,
                           "transaction_id":null,
                           "directory_server_transaction_id":null,
                           "pares_status":null,
                           "acs_id":null
                        },
                        "network_token":null,
                        "fingerprint":"355e7384-7e75-4a32-94b9-26031a4faab5",
                        "expiration_month":12,
                        "expiration_year":26
                     },
                     "stored_credentials":{
                        "reason":null,
                        "usage":null,
                        "subscription_agreement_id":null,
                        "network_transaction_id":null
                     }
                  },
                  "wallet":null,
                  "bnpl":null,
                  "bank_transfer":null,
                  "ticket":null,
                  "payment_link":null
               }
            },
            "provider":{
               "provider_transaction_id":"L2JC9B5K995BJDF6"
            },
            "provider_data":{
               "raw_response":null,
               "id":"ADYEN",
               "transaction_id":"L2JC9B5K995BJDF6",
               "account_id":null,
               "status":"NOTIFICATION_OF_CHARGEBACK",
               "status_detail":null,
               "response_message":null,
               "response_code":null,
               "third_party_transaction_id":null,
               "third_party_account_id":null,
               "iso8583_response_code":null,
               "iso8583_response_message":null
            },
            "connection_data":{
               "id":null,
               "name":null
            },
            "device_fingerprint":null,
            "simplified_mode":false,
            "third_party_session_id":null
         },
         "transactions_history":[
            {
               "id":"5f354190-ffe8-4b25-a73d-55fe25821067",
               "type":"CHARGEBACK",
               "status":"CREATED",
               "category":"CARD",
               "amount":418.0,
               "provider_id":"ADYEN",
               "response_code":"ACTION_REQUIRED",
               "merchant_reference":"YU00000058467f854a2eb05a22320e86071",
               "response_message":"Chargeback or Inquiry received. Decision or documentation must be provided",
               "reason":"REQUESTED_BY_CUSTOMER",
               "description":"webhook transaction",
               "created_at":"2025-04-17T04:46:49.591869Z",
               "updated_at":"2025-04-17T04:46:49.616143Z",
               "payment_method":{
                  "token":"592c7a1c-e34c-4dc1-851f-5bd41bc32c68",
                  "type":"CARD",
                  "vaulted_token":"2146a9c4-56c9-43a5-a35b-916bf15f7772",
                  "vault_on_success":false,
                  "parent_payment_method_type":null,
                  "payment_method_detail":{
                     "card":{
                        "verify":false,
                        "capture":false,
                        "installments":1,
                        "installments_plan_id":null,
                        "first_installment_deferral":null,
                        "installments_amount":null,
                        "installments_type":null,
                        "soft_descriptor":"",
                        "authorization_code":"373761",
                        "retrieval_reference_number":"",
                        "voucher":null,
                        "card_data":{
                           "holder_name":"YOANA CALAM",
                           "iin":"55123824",
                           "lfd":"2451",
                           "number_length":16,
                           "security_code_length":3,
                           "brand":"MASTERCARD",
                           "issuer_name":"BANCO AZTECA INSTITUCION BANCA MULTIPLE",
                           "issuer_code":null,
                           "country_code":"MX",
                           "category":"DEBIT MASTERCARD",
                           "type":"DEBIT",
                           "three_d_secure":{
                              "version":null,
                              "electronic_commerce_indicator":null,
                              "cryptogram":null,
                              "transaction_id":null,
                              "directory_server_transaction_id":null,
                              "pares_status":null,
                              "acs_id":null
                           },
                           "network_token":null,
                           "fingerprint":"355e7384-7e75-4a32-94b9-26031a4faab5",
                           "expiration_month":12,
                           "expiration_year":26
                        },
                        "stored_credentials":{
                           "reason":null,
                           "usage":null,
                           "subscription_agreement_id":null,
                           "network_transaction_id":null
                        }
                     },
                     "wallet":null,
                     "bnpl":null,
                     "bank_transfer":null,
                     "ticket":null,
                     "payment_link":null
                  }
               },
               "provider":{
                  "provider_transaction_id":"L2JC9B5K995BJDF6"
               },
               "provider_data":{
                  "raw_response":null,
                  "id":"ADYEN",
                  "transaction_id":"L2JC9B5K995BJDF6",
                  "account_id":null,
                  "status":"NOTIFICATION_OF_CHARGEBACK",
                  "status_detail":null,
                  "response_message":null,
                  "response_code":null,
                  "third_party_transaction_id":null,
                  "third_party_account_id":null,
                  "iso8583_response_code":null,
                  "iso8583_response_message":null
               },
               "connection_data":{
                  "id":null,
                  "name":null
               },
               "device_fingerprint":null,
               "simplified_mode":false,
               "third_party_session_id":null
            },
            {
               "id":"4d508842-5ffc-438a-a864-deeceb9935ca",
               "type":"PURCHASE",
               "status":"SUCCEEDED",
               "category":"CARD",
               "amount":418.0,
               "provider_id":"ADYEN",
               "response_code":"SUCCEEDED",
               "merchant_reference":"YU00000058467f854a2eb05a22320e86071",
               "response_message":"Transaction successful",
               "reason":null,
               "description":"McDonalds Ecommerce",
               "created_at":"2025-04-10T23:30:53.319251Z",
               "updated_at":"2025-04-10T23:30:54.496131Z",
               "payment_method":{
                  "token":"592c7a1c-e34c-4dc1-851f-5bd41bc32c68",
                  "type":"CARD",
                  "vaulted_token":"2146a9c4-56c9-43a5-a35b-916bf15f7772",
                  "vault_on_success":false,
                  "parent_payment_method_type":null,
                  "payment_method_detail":{
                     "card":{
                        "verify":false,
                        "capture":true,
                        "installments":1,
                        "installments_plan_id":null,
                        "first_installment_deferral":null,
                        "installments_amount":null,
                        "installments_type":null,
                        "soft_descriptor":"",
                        "authorization_code":"373761",
                        "retrieval_reference_number":"",
                        "voucher":null,
                        "card_data":{
                           "holder_name":"YOANA CALAM",
                           "iin":"55123824",
                           "lfd":"2451",
                           "number_length":16,
                           "security_code_length":3,
                           "brand":"MASTERCARD",
                           "issuer_name":"BANCO AZTECA INSTITUCION BANCA MULTIPLE",
                           "issuer_code":null,
                           "country_code":"MX",
                           "category":"DEBIT MASTERCARD",
                           "type":"DEBIT",
                           "three_d_secure":{
                              "version":null,
                              "electronic_commerce_indicator":null,
                              "cryptogram":null,
                              "transaction_id":null,
                              "directory_server_transaction_id":null,
                              "pares_status":null,
                              "acs_id":null
                           },
                           "network_token":null,
                           "fingerprint":"355e7384-7e75-4a32-94b9-26031a4faab5",
                           "expiration_month":12,
                           "expiration_year":26
                        },
                        "stored_credentials":{
                           "reason":null,
                           "usage":null,
                           "subscription_agreement_id":null,
                           "network_transaction_id":null
                        }
                     },
                     "wallet":null,
                     "bnpl":null,
                     "bank_transfer":null,
                     "ticket":null,
                     "payment_link":null
                  }
               },
               "provider":{
                  "provider_transaction_id":"L2JC9B5K995BJDF6"
               },
               "provider_data":{
                  "raw_response":{
                     "additionalData":{
                        "acquirerAccountCode":"AdyenProsa_ArcosDouradosPlataforma-MX_Cvv",
                        "acquirerCode":"AdyenProsa",
                        "acquirerReference":"373761",
                        "authCode":"373761",
                        "authorisationMid":"9024452",
                        "avsResult":"0 Unknown",
                        "cardFunction":"Consumer",
                        "cavv":"N/A",
                        "cavvAlgorithm":"N/A",
                        "cvcResult":"1 Matches",
                        "cvcResultRaw":"1 Matches",
                        "eci":"N/A",
                        "liabilityShift":"false",
                        "paymentMethod":"mc",
                        "paymentMethodVariant":"mcstandarddebit",
                        "refusalReasonRaw":"00 : Approved or completed successfully",
                        "threeDAuthenticated":"false",
                        "threeDAuthenticatedResponse":"N/A",
                        "threeDOffered":"false",
                        "threeDOfferedResponse":"N/A",
                        "threeds2.cardEnrolled":"true",
                        "xid":"N/A"
                     },
                     "amount":{
                        "currency":"MXN",
                        "value":41800
                     },
                     "merchantReference":"584-67f854a2eb05a22320e86071",
                     "paymentMethod":{
                        "brand":"mc",
                        "type":"scheme"
                     },
                     "pspReference":"L2JC9B5K995BJDF6",
                     "resultCode":"Authorised"
                  },
                  "id":"ADYEN",
                  "transaction_id":"L2JC9B5K995BJDF6",
                  "account_id":"test-account",
                  "status":"Authorised",
                  "status_detail":"Authorised",
                  "response_message":null,
                  "response_code":null,
                  "third_party_transaction_id":"L2JC9B5K995BJDF6",
                  "third_party_account_id":"",
                  "iso8583_response_code":"00 ",
                  "iso8583_response_message":null
               },
               "connection_data":{
                  "id":"72f2adb3-ed95-4bca-be01-20bbe4d5a1cb",
                  "name":null
               },
               "device_fingerprint":null,
               "simplified_mode":false,
               "third_party_session_id":null
            }
         ],
         "callback_url":"https://test.com.mx/api/callback/my-orders?path=%2Fmi-cuenta%2Fmis-pedidos%2F67f854a2eb05a22320e86071&checkoutSession=5f446b32-79de-41a7-b30b-f478620bc7a8",
         "workflow":"SDK_CHECKOUT",
         "split_marketplace":[
            
         ],
         "payment_link_code":"",
         "subscription_id":null,
         "fraud_screening":null,
         "metadata":[
            {
               "key":"riskdata.deliveryMethod",
               "value":"MOP"
            },
            {
               "key":"riskdata.storeId",
               "value":"584"
            },
            {
               "key":"riskdata.basket.item1.amountPerItem",
               "value":"41800"
            },
            {
               "key":"riskdata.basket.item1.itemID",
               "value":"26609"
            },
            {
               "key":"riskdata.basket.item1.category",
               "value":"test value"
            },
            {
               "key":"riskdata.basket.item1.currency",
               "value":"MXN"
            },
            {
               "key":"riskdata.basket.item1.quantity",
               "value":"2"
            },
            {
               "key":"riskdata.basket.item1.productTitle",
               "value":"test value"
            }
         ],
         "routing_rules":{
            "smart_routing":false,
            "monitors":false,
            "condition":{
               "id":537769,
               "name":null,
               "description":null
            }
         }
      }
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

## Enrollment

```json
{
  "type": "enrollment",
  "type_event": "enrollment.enroll",
  "account_id": "493e9374-510a-4201-9e09-de669d75f256",
  "retry": 0,
  "version": 2,
  "data": {
    "payment_method": {
      "id": "03c3aae1-ed42-4be6-bc24-de5487f58491",
      "account_id": "493e9374-510a-4201-9e09-de669d75f256",
      "name": "VISA ****1111",
      "description": "VISA ****1111",
      "type": "CARD",
      "category": "CARD",
      "country": "CO",
      "status": "ENROLLED",
      "customer_id": "2f38972e-2427-43b7-95be-ee4cf21cef1b",
      "created_at": "2024-09-10T15:04:10.453741Z",
      "updated_at": "2024-09-10T15:04:10.453745Z",
      "enrollment": {
        "session": null,
        "sdk_action_required": false
      },
      "verify": {
        "vault_on_success": false,
        "currency": null,
        "payment": null
      },
      "detail": {
        "card": {
          "holder_name": "Pepito Perez",
          "expiration_month": 3,
          "expiration_year": 26,
          "iin": "41111111",
          "lfd": "1111",
          "security_code_length": 3,
          "number_length": 16,
          "brand": "VISA",
          "issuer_name": "JPMORGAN CHASE BANK N A",
          "issuer_code": null,
          "type": "CREDIT",
          "category": "CREDIT",
          "country_code": "US",
          "country_name": "United States of America",
          "fingerprint_code": "d244e20d-43a1-43f7-9b48-0a76423be35e",
          "created_at": "2024-09-10T15:04:10.453799Z",
          "updated_at": "2024-09-10T15:04:10.453800Z"
        }
      }
    }
  }
}

```

## Payouts

```json JSON
{
  "type": "payout",
  "type_event": "payout.payout",
  "account_id": "f7c5fe77-721b-49c2-84d3-957748df3c2c",
  "retry": 0,
  "version": 2,
  "data": {
    "id": "0cbc7bd4-04f3-4897-b3c6-4d5f36a6b9a7",
    "status": "SUCCEEDED",
    "merchant_reference": "MR-12345",
    "description": null,
    "country": "BR",
    "account_code": "f7c5fe77-721b-49c2-84d3-957748df3c2c",
    "organization_code": "6c6a6b2c-c9c0-4104-9dd0-4237e6f00047",
    "purpose": null,
    "amount": {
      "currency": "BRL",
      "value": 100
    },
    "beneficiary": {
      "merchant_beneficiary_id": "test_merchant_deposit_id",
      "national_entity": null,
      "first_name": null,
      "last_name": null,
      "legal_name": null,
      "email": null,
      "country": "BR",
      "date_of_birth": null,
      "document": null,
      "phone": null,
      "address": null
    },
    "transactions": [
      {
        "id": "2be03290-70a9-414a-a285-8c573d26de5a",
        "status": "SUCCEEDED",
        "type": "ASTROPAY_PAYOUT",
        "response_code": "SUCCEEDED",
        "purpose": null,
        "description": null,
        "amount": {
          "currency": "BRL",
          "value": 100
        },
        "withdrawal_method": {
          "type": "ASTROPAY_PAYOUT",
          "provider_id": null,
          "detail": {
            "bank_transfer": null,
            "wallet": {
              "code": "h15sg84U6rCl",
              "email": null,
              "country": null,
              "document": null,
              "phone": null
            }
          }
        },
        "provider_data": {
          "id": "ASTROPAY",
          "transaction_id": "32389",
          "account_id": "",
          "beneficiary_id": "test_merchant_deposit_id",
          "raw_response": "\"{\\n  \\\"cashout_id\\\" : 32389,\\n  \\\"merchant_cashout_id\\\" : \\\"2be03290-70a9-414a-a285-8c573d26de5a\\\",\\n  \\\"status\\\" : \\\"APPROVED\\\",\\n  \\\"user_id\\\" : \\\"h15sg84U6rCl\\\"\\n}\"",
          "status_detail": "APPROVED",
          "provider_status": null
        },
        "created_at": "2024-05-27T19:10:32.723578Z",
        "updated_at": "2024-05-27T19:10:33.757137Z"
      }
    ],
    "metadata": [],
    "created_at": "2024-05-27T19:10:32.494514Z",
    "updated_at": "2024-05-27T19:10:33.757143Z"
  }
}
```

## Subscriptions

```Text JSON
{
  "type": "subscription",
  "type_event": "subscription.create",
  "account_id": "c24d6c92-99a7-40bb-bc7b-efc40337f9f4",
  "retry": 0,
  "version": 2,
  "data": {
    "subscription": {
      "code": "8fc8a985-bc18-4f9a-9403-d0cf6fc64e94",
      "name": "Subscription",
      "description": "retries activos",
      "country": "CO",
      "account_code": "c24d6c92-99a7-40bb-bc7b-efc40337f9f4",
      "merchant_reference": "subscription-ref-merchant-002",
      "status": "CREATED",
      "amount": {
        "currency": "COP",
        "value": 36000
      },
      "frequency": null,
      "billing_date": {
        "type": "DAY",
        "day": 30
      },
      "billing_cycles": {
        "total": 5,
        "current": 1,
        "next_at": "2026-02-28T18:25:49.995376Z"
      },
      "customer_payer": {
        "code": "a9f9140a-1216-481c-8356-1a125078f905"
      },
      "payment_method": {
        "type": "CARD",
        "vaulted_token": "7eeb8d32-d5c3-45a8-955b-30accc625d1f"
      },
      "availability": {
        "start_at": "2026-02-01T18:25:49.995376Z",
        "finish_at": null
      },
      "retries": {
        "retry_on_decline": false,
        "amount": 6
      },
      "metadata": [
        {
          "key": "Canal 1",
          "value": "Soccer"
        }
      ],
      "additional_data": null,
      "payments": [],
      "trial_period": {
        "billing_cycles": 1,
        "amount": {
          "currency": null,
          "value": null
        }
      },
      "initial_payment_validation": true,
      "created_at": "2025-05-21T15:33:16.662026Z",
      "updated_at": "2025-05-21T15:33:16.662026Z"
    }
  }
}
```
