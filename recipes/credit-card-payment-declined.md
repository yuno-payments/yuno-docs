---
title: Credit Card Payment - Declined
description: >-
  Declined credit card payment with DIRECT method and minimum fields without
  token and installments.
hidden: false
recipe:
  color: '#614ad6'
  icon: ⚠️
---
```javascript JavaScript
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'public-api-key': '<Your public-api-key>',
    'private-secret-key': '<Your private-secret-key>',
    'X-Idempotency-Key': '<Your X-Idempotency-Key>'
  },
  body: JSON.stringify({
    amount: {currency: 'COP', value: '20000'},
    customer_payer: {first_name: 'JOHN', last_name: 'DOE', email: 'test@test.com'},
    payment_method: {
      detail: {
        card: {
          card_data: {
            number: '4111111111111111',
            expiration_month: 11,
            expiration_year: 28,
            security_code: '123',
            holder_name: 'JOHN DOE'
          }
        }
      },
      type: 'CARD'
    },
    account_id: 'c004cfd7-0c65-4add-b9b3-3d7e3949c9f1',
    description: 'DECLINED',
    country: 'CO',
    merchant_order_id: 'Order_id',
    workflow: 'DIRECT'
  })
};

fetch('https://api-sandbox.y.uno/v1/payments', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

```json Response Example
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

# T



s