---
title: NuPay
deprecated: false
hidden: false
metadata:
  robots: index
---
This guide explores Yuno's NuPay integration using the Direct workflow. You'll learn how to:

* Enroll NuPay as a customer payment method
* Make payments with installments (payment conditions)
* Set up subscriptions

## Requirements

Before starting, you need:

* A Yuno account with Dashboard access
* API keys and an `account_id` (found in dashboard)
* A customer created in Yuno (or create one in Step 1)

## Create and manage customers

Create the customer once using your external `merchant_customer_id`, then retrieve by Yuno `id` or by `merchant_customer_id` as needed.

1. Use the [Create Customer](ref:create-customer) endpoint and provide your own `merchant_customer_id` (the unique id of the customer in your system). The response returns `id` which is the Yuno customer id.
2. Use [Retrieve Customer](ref:retrieve-customer) with the Yuno `id`.
3. Use [Retrieve Customer by External Id](ref:retrieve-customer-by-external-id) with query parameter `merchant_customer_id`.

## Enroll NuPay payment method

Follow these steps to enroll `NU_PAY_ENROLLMENT` to a customer using the Direct workflow.

### Step 1: Create a customer

If you don't have a customer yet, create one as shown above. You'll use the returned customer `id`.

### Step 2: Enroll the payment method

Use [Enroll Payment Method](ref:enroll-payment-method-api) with the following request parameters:

* **type**: `NU_PAY_ENROLLMENT`
* **account_id**: UUID of your account (from the Yuno Dashboard)
* **workflow**: `DIRECT`

Expected response fields:

* **vaulted_token**: UUID for the enrolled payment method
* **status**: `READY_TO_ENROLL`
* **sub_status**: `WAITING_ADDITIONAL_STEP`
* **action**: `REDIRECT_URL`
* **redirect_url**: URL to redirect the customer to Nu for authentication

### Step 3: Redirect the customer

Redirect the customer to the `redirect_url`. The customer completes the Nu flow. Nu notifies Yuno of the final state.

### Step 4: Confirm enrollment

Use [Retrieve Enrolled Payment Method by id](ref:retrieve-enrolled-payment-method-by-id-api) with the `vaulted_token`. A successful enrollment returns:

* **status**: `ENROLLED`
* **sub_status**: `ENROLLED`

> ⚠️ The enrollment is only complete after Yuno receives Nu’s confirmation.

## Payments with payment conditions (installments)

After enrollment, you can accept payments with NuPay using payment conditions.

### Step 1: Ensure prerequisites

Have a Yuno customer `id` and an enrolled NuPay `vaulted_token`.

### Step 2: Get payment conditions

Request available installment options for NuPay using the APM installments endpoint.

```bash
curl --location 'https://api-sandbox.y.uno/v1/apm-installments' \
--header 'public-api-key: {{your_public_api_key}}' \
--header 'private-secret-key: {{your_secret_api_key}}' \
--header 'X-account-code: {{your_account_code}}' \
--header 'Content-Type: application/json' \
--data '{
  "country": "BR",
  "amount": {
    "currency": "BRL",
    "value": "250"
  },
  "customer": {
    "id": "{{customer_id}}"
  },
  "payment_method": "NU_PAY_ENROLLMENT",
  "vaulted_token": "{{vaulted_token}}"
}'
```

The response returns an array of installment plans, including `id`, available `installments`, and amounts. Select a plan `id` and an allowed installments number.

### Step 3: Create payment

Use [Create payment](ref:create-payment) with the Direct workflow and NuPay type. Include the selected plan id and installments in the wallet `card_data`.

```json
{
  "description": "test",
  "account_id": "{{account_id}}",
  "merchant_order_id": "0000023",
  "country": "BR",
  "merchant_reference": "ref-merchant-AA01",
  "amount": {
    "currency": "BRL",
    "value": 250
  },
  "customer_payer": {
    "id": "{{customer_id}}"
  },
  "workflow": "DIRECT",
  "callback_url": "https://your-callback.com",
  "payment_method": {
    "type": "NU_PAY_ENROLLMENT",
    "vaulted_token": "{{vaulted_token}}",
    "detail": {
      "wallet": {
        "card_data": {
          "installments_plan_id": "{{plan_id}}",
          "installments": 2
        }
      }
    }
  }
}
```

### Step 4: Retrieve payment

Use [Retrieve payment by id](ref:retrieve-payment) to confirm final status.

## Subscription flow

You can use NuPay for recurring charges.

1. Create a customer
2. Enroll NuPay as a payment method (see above)
3. Create a subscription with the enrolled `vaulted_token` using [Create subscription](ref:create-subscription)
4. Retrieve the subscription using [Retrieve subscription](ref:retrieve-subscription)

> ⚠️ Limitations
>
> * Subscriptions with NuPay do not support payment conditions (installments)
> * Creating subscriptions directly within a payment request is not supported

## Endpoints

* [Create customer](ref:create-customer)
* [Retrieve customer](ref:retrieve-customer)
* [Retrieve customer by external id](ref:retrieve-customer-by-external-id)
* [Enroll payment method (Direct)](ref:enroll-payment-method-api)
* [Retrieve enrolled payment method by id](ref:retrieve-enrolled-payment-method-by-id-api)
* [Create payment](ref:create-payment)
* [Retrieve payment by id](ref:retrieve-payment)
* [Create subscription](ref:create-subscription)
* [Retrieve subscription](ref:retrieve-subscription)
