---
title: Credit Card Authorization without token and installments
description: >-
  Credit card authorization with DIRECT method and minimum fields without a
  token and installments.
hidden: false
recipe:
  color: '#614ad6'
  icon: ✅
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
          capture: false
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
{"success":true}
```

# Request settings

<!-- javascript@2-9 -->

Define the API request method and the necessary headers.

# Request information

<!-- javascript@10-34 -->

List the necessary information to perform the authorization process using a card with the DIRECT workflow.

# Transaction amount

<!-- javascript@11 -->

Define the currency and the amount.

# Customer information

<!-- javascript@12 -->

Define customer information.

# Payment method information

<!-- javascript@13-27 -->

Define the payment method to be used. In this case, the payment type is CARD. In addition, list the necessary card data to perform the authorization.

# Capture

<!-- javascript@23 -->

Since it is an authorization process, capture should be "false" (boolean value).

# Complementary information

<!-- javascript@28-32 -->

Define the workflow used, the country, the description, and merchant information.

# Perform the request

<!-- javascript@36-39 -->

The code performs the request and presents the request response using the previously defined request information.