---
title: Request Examples
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
This page presents examples of requests and responses for creating payments using the [Create Payment](https://docs.y.uno/reference/create-payment) endpoint. In addition to the JSON examples, you can find recipes describing portions of the request code.

## Credit Card Payment

<HTMLBlock>{`
<style>
  .table-of-contents-btn-shelf {
    margin: 0 0 0 0;
    display: flex;
    justify-items:space-evenly;
    gap: 20px;
  }

  .table-of-contents-btn {
    display: flex;
    padding: 0.5rem 0.3rem;
    background: rgba(255, 255, 255, 0.23);
    border-radius: 7px;
    border: 1px solid #614ad67a;
    transition: transform .2s;
    align-items: center;
    justify-content: center;
    text-align: center;

  }

  .table-of-contents-btn:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;

  }

  .table-of-contents-btn p {
    font-size: 0.85rem;
    color: #614ad6;
    font-weight: 600;
    margin: 0 !important;

  }

  @media only screen and (max-width: 800px) {
    .table-of-contents-btn-shelf {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<body>
  <section class="table-of-contents-btn-shelf">
    <div class="table-of-contents-btn"
      onclick="window.location='https://docs.y.uno/reference/request-examples#payment-without-token-and-installments';">
      <p>
        Payment without token and installments
      </p>
    </div>
    <div class="table-of-contents-btn" onclick="window.location='https://docs.y.uno/reference/request-examples#payment-with-installments-and-without-token';">
      <p>
        Payment with installments and without token
      </p>
    </div>
    <div class="table-of-contents-btn" onclick="window.location='https://docs.y.uno/reference/request-examples#authorization-without-token-and-installments';">
      <p>
        Authorization without token and installments
      </p>
    </div>
  </section>
</body>
`}</HTMLBlock>

### Payment without token and installments

This example presents a request for the [Create Payment](https://docs.y.uno/reference/create-payment) endpoint for payment using a credit card with the DIRECT method and minimum fields without a token and installments.  Check the recipe below for details and explanations for each portion of the request code.

<TutorialTile backgroundColor="#018FF4" emoji="🦉" id="67e6db21199a3100370a325f" link="https://docs.y.uno/v1.0/recipes/credit-card-payment" slug="credit-card-payment" title="Credit Card Payment" />

The request body JSON is presented next.

```json
{
    "account_id":"c004cfd7-0c65-4add-b9b3-3d7e3949c9f1",
    "description":"SUCCESSFUL",
    "country":"CO",
    "merchant_order_id":"Order_id",
    "amount":{
        "currency":"COP",
        "value":"20000"
    },
    "customer_payer":{
        "first_name":"JOHN",
        "last_name":"DOE",
        "email":"test@test.com"
    },
    "workflow":"DIRECT",
    "payment_method":{
        "type":"CARD",
        "detail":{
            "card":{
                "card_data":{
                    "number":"4111111111111111",
                    "expiration_month":11,
                    "expiration_year":28,
                    "security_code":"123",
                    "holder_name":"JOHN DOE"
                }
            }
        }
    }
}
```

The received response JSON for a **SUCCESSFUL** request is presented next. For payments, the  `transactions.type` value will be PURCHASE.

```json
{
    "id": "443a0348-472e-4554-8246-60f977568ec8",
    "account_id": "c004cfd7-0c65-4add-b9b3-3d7e3949c9f1",
    "description": "SUCCESSFUL",
    "country": "CO",
    "status": "SUCCEEDED",
    "sub_status": "APPROVED",
    "merchant_order_id": "Order_id",
    "created_at": "2023-04-12T00:40:18.287694Z",
    "updated_at": "2023-04-12T00:40:18.697142Z",
    "amount": {
        "currency": "COP",
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
                "capture": false,
                "installments": 1,
                "first_installment_deferral": 0,
                "installments_type": "",
                "installment_amount": null,
                "soft_descriptor": "",
                "authorization_code": "",
                "retrieval_reference_number": "",
                "voucher": null,
                "card_data": {
                    "holder_name": "JOHN DOE",
                    "iin": "41111111",
                    "lfd": "1111",
                    "number_length": 16,
                    "security_code_length": 3,
                    "brand": "VISA",
                    "issuer_name": "JPMORGAN CHASE BANK, N.A.",
                    "issuer_code": null,
                    "category": "",
                    "type": "CREDIT"
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
        "browser_info": null,
        "document": null,
        "phone": null,
        "billing_address": null,
        "shipping_address": null
    },
    "additional_data": {
        "airline": null,
        "order": null,
        "seller_details": null
    },
    "taxes": null,
    "transactions": {
        "id": "584d7ec4-34d1-4f87-9ee6-289ce2571364",
        "type": "PURCHASE",
        "status": "SUCCEEDED",
        "category": "CARD",
        "amount": 20000,
        "provider_id": "YUNO_TEST_PAYMENT_GW",
        "payment_method": {
            "vaulted_token": "",
            "type": "CARD",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "card": {
                    "verify": null,
                    "capture": false,
                    "installments": 1,
                    "first_installment_deferral": 0,
                    "installments_type": "",
                    "installment_amount": null,
                    "soft_descriptor": "",
                    "authorization_code": "",
                    "retrieval_reference_number": "",
                    "voucher": null,
                    "card_data": {
                        "holder_name": "JOHN DOE",
                        "iin": "41111111",
                        "lfd": "1111",
                        "number_length": 16,
                        "security_code_length": 3,
                        "brand": "VISA",
                        "issuer_name": "JPMORGAN CHASE BANK, N.A.",
                        "issuer_code": null,
                        "category": "",
                        "type": "CREDIT"
                    }
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": null,
        "merchant_reference": null,
        "provider_data": {
            "id": "YUNO_TEST_PAYMENT_GW",
            "transaction_id": "fa6bd12a-52f6-4863-9f72-a0b77bd771b4",
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
            }
        },
        "created_at": "2023-04-12T00:40:18.410928Z",
        "updated_at": "2023-04-12T00:40:18.659161Z"
    },
    "split": [],
    "workflow": "DIRECT",
    "metadata": null,
    "fraud_screening": null
}
```

The received response JSON for a **DECLINED** request is presented next.

```json
{
    "id": "bdc37095-8647-4ca0-9c2e-0f216a456731",
    "account_id": "c004cfd7-0c65-4add-b9b3-3d7e3949c9f1",
    "description": "DECLINED",
    "country": "CO",
    "status": "DECLINED",
    "sub_status": "DECLINED",
    "merchant_order_id": "Order_id",
    "created_at": "2023-04-12T00:42:46.550675Z",
    "updated_at": "2023-04-12T00:42:46.847483Z",
    "amount": {
        "currency": "COP",
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
                "capture": false,
                "installments": 1,
                "first_installment_deferral": 0,
                "installments_type": "",
                "installment_amount": null,
                "soft_descriptor": "",
                "authorization_code": "",
                "retrieval_reference_number": "",
                "voucher": null,
                "card_data": {
                    "holder_name": "JOHN DOE",
                    "iin": "41111111",
                    "lfd": "1111",
                    "number_length": 16,
                    "security_code_length": 3,
                    "brand": "VISA",
                    "issuer_name": "JPMORGAN CHASE BANK, N.A.",
                    "issuer_code": null,
                    "category": "",
                    "type": "CREDIT"
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
        "browser_info": null,
        "document": null,
        "phone": null,
        "billing_address": null,
        "shipping_address": null
    },
    "additional_data": {
        "airline": null,
        "order": null,
        "seller_details": null
    },
    "taxes": null,
    "transactions": {
        "id": "ea4347af-f13a-45c0-920d-100029cd56e0",
        "type": "PURCHASE",
        "status": "DECLINED",
        "category": "CARD",
        "amount": 20000,
        "provider_id": "YUNO_TEST_PAYMENT_GW",
        "payment_method": {
            "vaulted_token": "",
            "type": "CARD",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "card": {
                    "verify": null,
                    "capture": false,
                    "installments": 1,
                    "first_installment_deferral": 0,
                    "installments_type": "",
                    "installment_amount": null,
                    "soft_descriptor": "",
                    "authorization_code": "",
                    "retrieval_reference_number": "",
                    "voucher": null,
                    "card_data": {
                        "holder_name": "JOHN DOE",
                        "iin": "41111111",
                        "lfd": "1111",
                        "number_length": 16,
                        "security_code_length": 3,
                        "brand": "VISA",
                        "issuer_name": "JPMORGAN CHASE BANK, N.A.",
                        "issuer_code": null,
                        "category": "",
                        "type": "CREDIT"
                    }
                }
            }
        },
        "response_code": "DECLINED_BY_BANK",
        "response_message": "Rejected by the bank. Refer to card issuer",
        "reason": null,
        "description": null,
        "merchant_reference": null,
        "provider_data": {
            "id": "YUNO_TEST_PAYMENT_GW",
            "transaction_id": "ccb23db9-912b-49c5-8c18-2e18f9250b15",
            "account_id": "",
            "status": "DECLINED",
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
            }
        },
        "created_at": "2023-04-12T00:42:46.674752Z",
        "updated_at": "2023-04-12T00:42:46.813815Z"
    },
    "split": [],
    "workflow": "DIRECT",
    "metadata": null,
    "fraud_screening": null
}
```

Check the transaction  `status` and `substatus` received from the response to verify if it was approved or declined.  In addition, to acquire more information regarding the process, you can check the `transactions.response_code` and the `transactions.response_message`.  In the first response example,  `transactions.response_message` indicates that the transaction was successful. On the other hand, in the second example, `transactions.response_message` indicates that the bank rejected the transaction.

### Payment with installments and without token

This example presents a request for the [Create Payment](https://docs.y.uno/reference/create-payment) endpoint for payment with installments using a credit card with the DIRECT method and minimum fields without a token. Check the recipe below for details and explanations for each portion of the request code. 

<TutorialTile backgroundColor="#614ad6" emoji="💰" id="67e6db21199a3100370a3261" link="https://docs.y.uno/v1.0/recipes/credit-card-payment-with-installments-and-without-a-token" slug="credit-card-payment-with-installments-and-without-a-token" title="Credit Card Payment With Installments and Without a Token" />

The request body JSON is presented next.

```json
{
    "account_id":"c004cfd7-0c65-4add-b9b3-3d7e3949c9f1",
    "description":"SUCCESSFUL",
    "country":"CO",
    "merchant_order_id":"Order_id",
    "amount":{
        "currency":"COP",
        "value":"20000"
    },
    "customer_payer":{
        "first_name":"JOHN",
        "last_name":"DOE",
        "email":"test@test.com"
    },
    "workflow":"DIRECT",
    "payment_method":{
        "type":"CARD",
        "detail":{
            "card":{
                "installments":12,
                "card_data":{
                    "number":"4111111111111111",
                    "expiration_month":11,
                    "expiration_year":28,
                    "security_code":"123",
                    "holder_name":"JOHN DOE"
                }
            }
        }
    }
}
```

The received response JSON for a **SUCCESSFUL** request is presented next. You can check the number of installments by checking `payment_method.payment_method_detail.installments`.

```
{
    "id": "bd305bca-2e87-45d1-9b69-2fcdde0c368e",
    "account_id": "c004cfd7-0c65-4add-b9b3-3d7e3949c9f1",
    "description": "SUCCESSFUL",
    "country": "CO",
    "status": "SUCCEEDED",
    "sub_status": "APPROVED",
    "merchant_order_id": "Order_id",
    "created_at": "2023-04-12T00:47:24.704068Z",
    "updated_at": "2023-04-12T00:47:24.997201Z",
    "amount": {
        "currency": "COP",
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
                "capture": false,
                "installments": 12,
                "first_installment_deferral": 0,
                "installments_type": "",
                "installment_amount": null,
                "soft_descriptor": "",
                "authorization_code": "",
                "retrieval_reference_number": "",
                "voucher": null,
                "card_data": {
                    "holder_name": "JOHN DOE",
                    "iin": "41111111",
                    "lfd": "1111",
                    "number_length": 16,
                    "security_code_length": 3,
                    "brand": "VISA",
                    "issuer_name": "JPMORGAN CHASE BANK, N.A.",
                    "issuer_code": null,
                    "category": "",
                    "type": "CREDIT"
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
        "browser_info": null,
        "document": null,
        "phone": null,
        "billing_address": null,
        "shipping_address": null
    },
    "additional_data": {
        "airline": null,
        "order": null,
        "seller_details": null
    },
    "taxes": null,
    "transactions": {
        "id": "6eba574a-4229-44b4-b5e6-ed30c54fbfc5",
        "type": "PURCHASE",
        "status": "SUCCEEDED",
        "category": "CARD",
        "amount": 20000,
        "provider_id": "YUNO_TEST_PAYMENT_GW",
        "payment_method": {
            "vaulted_token": "",
            "type": "CARD",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "card": {
                    "verify": null,
                    "capture": false,
                    "installments": 12,
                    "first_installment_deferral": 0,
                    "installments_type": "",
                    "installment_amount": null,
                    "soft_descriptor": "",
                    "authorization_code": "",
                    "retrieval_reference_number": "",
                    "voucher": null,
                    "card_data": {
                        "holder_name": "JOHN DOE",
                        "iin": "41111111",
                        "lfd": "1111",
                        "number_length": 16,
                        "security_code_length": 3,
                        "brand": "VISA",
                        "issuer_name": "JPMORGAN CHASE BANK, N.A.",
                        "issuer_code": null,
                        "category": "",
                        "type": "CREDIT"
                    }
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": null,
        "merchant_reference": null,
        "provider_data": {
            "id": "YUNO_TEST_PAYMENT_GW",
            "transaction_id": "60674ed4-f0a8-4f72-ba78-6f32ae89e1d5",
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
            }
        },
        "created_at": "2023-04-12T00:47:24.824497Z",
        "updated_at": "2023-04-12T00:47:24.961960Z"
    },
    "split": [],
    "workflow": "DIRECT",
    "metadata": null,
    "fraud_screening": null
}
```

The received response JSON for a **DECLINED** request is presented next.

```json
{
    "id": "82a7ab63-eaab-48ae-b6e5-ef2ef4a560eb",
    "account_id": "c004cfd7-0c65-4add-b9b3-3d7e3949c9f1",
    "description": "DECLINED",
    "country": "CO",
    "status": "DECLINED",
    "sub_status": "DECLINED",
    "merchant_order_id": "Order_id",
    "created_at": "2023-04-12T01:41:53.392958Z",
    "updated_at": "2023-04-12T01:41:53.766758Z",
    "amount": {
        "currency": "COP",
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
                "capture": false,
                "installments": 12,
                "first_installment_deferral": 0,
                "installments_type": "",
                "installment_amount": null,
                "soft_descriptor": "",
                "authorization_code": "",
                "retrieval_reference_number": "",
                "voucher": null,
                "card_data": {
                    "holder_name": "JOHN DOE",
                    "iin": "41111111",
                    "lfd": "1111",
                    "number_length": 16,
                    "security_code_length": 3,
                    "brand": "VISA",
                    "issuer_name": "JPMORGAN CHASE BANK, N.A.",
                    "issuer_code": null,
                    "category": "",
                    "type": "CREDIT"
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
        "browser_info": null,
        "document": null,
        "phone": null,
        "billing_address": null,
        "shipping_address": null
    },
    "additional_data": {
        "airline": null,
        "order": null,
        "seller_details": null
    },
    "taxes": null,
    "transactions": {
        "id": "9048c7e6-849a-4809-8c48-ef508997bb41",
        "type": "PURCHASE",
        "status": "DECLINED",
        "category": "CARD",
        "amount": 20000,
        "provider_id": "YUNO_TEST_PAYMENT_GW",
        "payment_method": {
            "vaulted_token": "",
            "type": "CARD",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "card": {
                    "verify": null,
                    "capture": false,
                    "installments": 12,
                    "first_installment_deferral": 0,
                    "installments_type": "",
                    "installment_amount": null,
                    "soft_descriptor": "",
                    "authorization_code": "",
                    "retrieval_reference_number": "",
                    "voucher": null,
                    "card_data": {
                        "holder_name": "JOHN DOE",
                        "iin": "41111111",
                        "lfd": "1111",
                        "number_length": 16,
                        "security_code_length": 3,
                        "brand": "VISA",
                        "issuer_name": "JPMORGAN CHASE BANK, N.A.",
                        "issuer_code": null,
                        "category": "",
                        "type": "CREDIT"
                    }
                }
            }
        },
        "response_code": "DECLINED_BY_BANK",
        "response_message": "Rejected by the bank. Refer to card issuer",
        "reason": null,
        "description": null,
        "merchant_reference": null,
        "provider_data": {
            "id": "YUNO_TEST_PAYMENT_GW",
            "transaction_id": "92d13742-3a50-4add-8d67-b4ef69f5e533",
            "account_id": "",
            "status": "DECLINED",
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
            }
        },
        "created_at": "2023-04-12T01:41:53.520512Z",
        "updated_at": "2023-04-12T01:41:53.731966Z"
    },
    "split": [],
    "workflow": "DIRECT",
    "metadata": null,
    "fraud_screening": null
}
```

### Authorization without token and installments

This example presents a request for the [Create Payment](https://docs.y.uno/reference/create-payment) endpoint for an authorization process using a credit card with the DIRECT method and minimum fields without a token and installments. Check the recipe below for details and explanations for each portion of the request code.

<TutorialTile backgroundColor="#614ad6" emoji="✅" id="67e6db21199a3100370a3262" link="https://docs.y.uno/v1.0/recipes/authorization-without-a-token-and-installments" slug="authorization-without-a-token-and-installments" title="Authorization Without a Token and Installments" />

The request body JSON is presented next.

```json
{
    "account_id":"c004cfd7-0c65-4add-b9b3-3d7e3949c9f1",
    "description":"SUCCESSFUL",
    "country":"CO",
    "merchant_order_id":"Order_id",
    "amount":{
        "currency":"COP",
        "value":"20000"
    },
    "customer_payer":{
        "first_name":"JOHN",
        "last_name":"DOE",
        "email":"test@test.com"
    },
    "workflow":"DIRECT",
    "payment_method":{
        "type":"CARD",
        "detail":{
            "card":{
                "capture":false,
                "card_data":{
                    "number":"4111111111111111",
                    "expiration_month":11,
                    "expiration_year":28,
                    "security_code":"123",
                    "holder_name":"JOHN DOE"
                }
            }
        }
    }
}
```

The received response JSON for a **AUTHORIZED** request is presented next. For authorization requests, the  `status` will have the PENDING value, while the `sub_status` will define if the authorization was successful. The `transaction.type` will also change to AUTHORIZE, for authorization requests.

```json
{
    "id": "bffb54d7-6177-4583-9865-529966ee1cc2",
    "account_id": "c004cfd7-0c65-4add-b9b3-3d7e3949c9f1",
    "description": "SUCCESSFUL",
    "country": "CO",
    "status": "PENDING",
    "sub_status": "AUTHORIZED",
    "merchant_order_id": "Order_id",
    "created_at": "2023-04-12T02:01:14.609045Z",
    "updated_at": "2023-04-12T02:01:14.972537Z",
    "amount": {
        "currency": "COP",
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
                "capture": false,
                "installments": 1,
                "first_installment_deferral": 0,
                "installments_type": "",
                "installment_amount": null,
                "soft_descriptor": "",
                "authorization_code": "",
                "retrieval_reference_number": "",
                "voucher": null,
                "card_data": {
                    "holder_name": "JOHN DOE",
                    "iin": "41111111",
                    "lfd": "1111",
                    "number_length": 16,
                    "security_code_length": 3,
                    "brand": "VISA",
                    "issuer_name": "JPMORGAN CHASE BANK, N.A.",
                    "issuer_code": null,
                    "category": "",
                    "type": "CREDIT"
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
        "browser_info": null,
        "document": null,
        "phone": null,
        "billing_address": null,
        "shipping_address": null
    },
    "additional_data": {
        "airline": null,
        "order": null,
        "seller_details": null
    },
    "taxes": null,
    "transactions": {
        "id": "e40b36bd-a785-4f10-ab94-95b1abed1c3a",
        "type": "AUTHORIZE",
        "status": "SUCCEEDED",
        "category": "CARD",
        "amount": 20000,
        "provider_id": "YUNO_TEST_PAYMENT_GW",
        "payment_method": {
            "vaulted_token": "",
            "type": "CARD",
            "vault_on_success": false,
            "token": "",
            "detail": {
                "card": {
                    "verify": null,
                    "capture": false,
                    "installments": 1,
                    "first_installment_deferral": 0,
                    "installments_type": "",
                    "installment_amount": null,
                    "soft_descriptor": "",
                    "authorization_code": "",
                    "retrieval_reference_number": "",
                    "voucher": null,
                    "card_data": {
                        "holder_name": "JOHN DOE",
                        "iin": "41111111",
                        "lfd": "1111",
                        "number_length": 16,
                        "security_code_length": 3,
                        "brand": "VISA",
                        "issuer_name": "JPMORGAN CHASE BANK, N.A.",
                        "issuer_code": null,
                        "category": "",
                        "type": "CREDIT"
                    }
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": null,
        "merchant_reference": null,
        "provider_data": {
            "id": "YUNO_TEST_PAYMENT_GW",
            "transaction_id": "717c2ee8-603d-4633-9ca9-37ec82d52a76",
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
            }
        },
        "created_at": "2023-04-12T02:01:14.758882Z",
        "updated_at": "2023-04-12T02:01:14.934272Z"
    },
    "split": [],
    "workflow": "DIRECT",
    "metadata": null,
    "fraud_screening": null
}
```
