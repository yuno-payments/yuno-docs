---
title: Via API
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    See a walk-through guide on migrating tokens using the Yuno API endpoints.
    After completing the guide steps, you will have a list of customers with
    enrolled payment methods in their accounts.
  robots: index
next:
  description: ''
---
On this page, you will find a walk-through guide on migrating tokens using the Yuno API endpoints. After completing the guide steps, you will have a list of customers with enrolled payment methods in their accounts. 

## Requirements

Before starting following the steps described in this guide, you need to:

- Have concluded the three steps related to the [importing cards from a gateway account](docs:token-migration-process-copy#importing-cards-from-a-gateway-account) process.
- Access your [API credentials](doc:get-your-api-credentials) on the Yuno Dashboard, which are composed by:
  - `public-api-key`
  - `private-secrete-key`
  - `account_id`

Ensure to have concluded the steps and have the above data before following the guide.

## Migrate tokens via API

### Step 1: Create customers

Use the [Create Customer](ref:create-customer) endpoint to create customers on the Yuno system. You can't enroll payment methods to customers that do not exist on the Yuno system. However, you can skip this step if customers already exist in Yuno.

To register new customers, You will need to provide their personal information. In addition, you also need to supply the `merchant_customer_id`, a unique identifier for the customer used on your system.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Customer complementary information</h3>\n      <div class=\"contentContainer\">\n        <p>\n          When creating a <b>Customer</b>, certain information is not required but can improve the user's payment experience if provided. Phone, billing address, and shipping address are examples of not mandatory data you can provide. \n        </p>\n        <p>\n           If you add optional information, be aware of the required mandatory fields. \n          </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


At the end of the create a customer process, you will receive an `id`, which identifies the user within the Yuno system. Use the `id` to enroll the existing payment methods.

### Step 2: Check the customer data (optional)

After creating each customer, you can use the [Retrieve Customer](ref:create-customer) endpoint to confirm the registered customer information. To retrieve the customer data, you need to provide the `id` received when the customer was created. 

### Step 3: Enroll a payment method

To finish the migration process, you will use the third-party vault/gateway data to enroll payment methods for each customer on the Yuno system. 

Use the [Enroll Payment Method](ref:enroll-payment-method-api) endpoint to enroll the received payment methods. Notice that the `customer_id` required to perform the request is the `id` you received when creating the customer in [Step 1](doc:via-api#step-1-create-customers). You will also need to provide the `provider_data` object with the external provider's token, as presented in the code snip below:

```curl Request
curl --request POST \
     --url https://api-sandbox.y.uno/v1/customers/{{customer_id}}/payment-methods \
     --header 'X-Idempotency-Key: <Your X-Idempotency-Key>' \
     --header 'accept: application/json' \
     --header 'charset: utf-8' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <Your private-secret-key>' \
     --header 'public-api-key: <Your public-api-key>' \
     --data '
{
  "country": "BR",
  "type": "CARD",
  "workflow": "DIRECT",
  "provider_data": {
    "id": "MERCADO_PAGO",
    "payment_method_token": "{{provider_card_token}}"
  },
  "account_id": "{{account_id}}" 
}
'
```

Within the endpoint response, you will have access to the `vaulted_token` which identifies the enrolled payment method. You will use the received `vaulted_token` to perform future payments, making additional payment method information unnecessary. 

### Step 4: Check the enrolled payment method (optional)

After enrolling the payment method, you can use the [Retrieve Enrolled Payment Methods](ref:retrieve-enrolled-payment-methods-api) endpoint to confirm that the payment method was enrolled correctly. Notice that the `customer_id` required to perform the request is the `id` you received when creating the customer in [Step 1](doc:via-api#step-1-create-customers).