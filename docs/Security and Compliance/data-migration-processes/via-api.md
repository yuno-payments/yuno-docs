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
This guide provides a step-by-step process for migrating tokens using the Yuno API endpoints. By following the steps outlined, you will compile a list of customers with their enrolled payment methods.

## Requirements

Before proceeding with the steps in this guide, ensure you have:

* Completed the three steps related to the [importing cards from a gateway account](docs:token-migration-process-copy#importing-cards-from-a-gateway-account) process.
* Accessed your [API credentials](doc:developers-credentials) on the Yuno Dashboard, which include:
  * `public-api-key`
  * `private-secret-key`
  * `account_id`

Make sure you have completed these steps and have the necessary data before continuing with the guide.

## Migrate tokens via API

### Step 1: Create customers

To begin the token migration process, you will use the [Create Customer](ref:create-customer) endpoint to add customers to the Yuno system. It is important to note that payment methods cannot be enrolled for customers who do not exist in the Yuno system. If the customers are already present in Yuno, you may skip this step.

To register new customers, provide their personal information. Additionally, you must supply the `merchant_customer_id`, which is a unique identifier for the customer used in your system.

> 📘 Customer complementary information
>
> When creating a customer, certain information is optional but can enhance the user's payment experience if provided. Examples of non-mandatory data include phone number, billing address, and shipping address.
>
> If you choose to add optional information, ensure that all required mandatory fields are also provided.

Upon completing the customer creation process, you will receive an `id` that identifies the user within the Yuno system. Use this `id` to enroll the existing payment methods.

### Step 2: Check the customer data (optional)

In this step, you have the option to verify the information of each registered customer. Use the [Retrieve Customer](ref:create-customer) endpoint to access the customer data. To do this, provide the `id` that was generated when the customer was initially created.

### Step 3: Enroll a payment method

To complete the migration process, you need to enroll payment methods for each customer using the third-party vault or gateway data.

Utilize the [Enroll Payment Method](ref:enroll-payment-method-api) endpoint to register the payment methods. Remember, the `customer_id` required for this request is the `id` obtained during the customer creation in [Step 1](doc:via-api#step-1-create-customers). Additionally, include the `provider_data` object containing the external provider's token, as shown in the code snippet below:

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

In the response from the endpoint, you will receive a `vaulted_token` that identifies the enrolled payment method. This `vaulted_token` will be used for future payments, eliminating the need for additional payment method details.

### Step 4: Check the enrolled payment method (optional)

Once the payment method is enrolled, you can verify its successful enrollment using the [retrieve enrolled payment methods](ref:retrieve-enrolled-payment-methods-api) endpoint. Remember, the `customer_id` needed for this request is the `id` obtained during the customer creation in [Step 1](doc:via-api#step-1-create-customers).