---
title: Credit Card Payment with installments and without token
description: >-
  Credit card payment with installments using the DIRECT method and minimum
  fields, and without a token.
hidden: false
recipe:
  color: '#614ad6'
  icon: 💰
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
    amount: {currency: 'USD', value: '20000'},
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
          },
          installments: 12
        }
      },
      type: 'CARD'
    },
    account_id: 'c004cfd7-0c65-4add-b9b3-3d7e3949c9f1',
    description: 'SUCCESSFUL',
    country: 'US',
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
  "id": "bd305bca-2e87-45d1-9b69-2fcdde0c368e",
  "account_id": "c004cfd7-0c65-4add-b9b3-3d7e3949c9f1",
  "description": "SUCCESSFUL",
  "country": "US",
  "status": "SUCCEEDED",
  "sub_status": "APPROVED",
  "merchant_order_id": "Order_id",
  "created_at": "2023-04-12T00:47:24.704068Z",
  "updated_at": "2023-04-12T00:47:24.997201Z",
  "amount": {
    "currency": "USD",
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
          "currency": "USD",
          "value": 20000
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

# Request settings

<!-- javascript@2-8 -->

Define the API request method and the necessary headers.

# Request information

<!-- javascript@10-34 -->

List the necessary information to create the payment using a card with the DIRECT workflow with installments.

# Transaction amount

<!-- javascript@11 -->

Define the currency and the amount of the payment.

# Customer information

<!-- javascript@12 -->

Define the customer information that will perform the payment.

# Payment method information

<!-- javascript@13-27 -->

Define the payment method to be used. In this case, the payment type is CARD. In addition, list the necessary card data to perform the payment.

# Number of installments

<!-- javascript@23 -->

Define the number of installments for the payment.

# Complementary information

<!-- javascript@28-32 -->

Define the workflow used, the country, the description, and merchant information.

# Perform the request

<!-- javascript@36-39 -->

The code performs the request and presents the request response using the previously defined request information.