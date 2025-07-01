---
title: Pix Automático Overview
deprecated: false
hidden: true
metadata:
  robots: index
---
Pix Automático is a Pix-based payment method designed for **recurring charges**. Unlike regular Pix flows where the customer initiates each transaction, Pix Automático allows **automated debits** from the payer’s account after a **one-time authorization**. Think of it as Pix-native direct debit, ideal for subscriptions, monthly bills, and other recurring payments.

This flow reduces friction for end users while helping merchants minimize late payments and improve collection success rates.

## How it works

### 1. Initial setup (subscription enrollment)

The process begins with a standard Pix payment (via QR code or redirect). When the customer pays, a **recurrence contract** is created behind the scenes. The system returns the QR and, once paid, confirms the `subscription_id`.

### 2. Recurring charges

To charge a subscription:

* You must send the payment **at most 2 days before** the billing date and **at least 10 days after** the subscription was created.
* Failed payments can be retried up to **3 times** within **7 days** of the billing due date.

## Flow disclaimers

* You **cannot charge on the exact billing date**. Payments sent on the same day will be rejected.
* If the subscription started on the 31st, and the month has no 31st, send the payment with a due date of the 1st of the next month.
* The `subscription_id` is tied to the contract, not the customer. Treat it like a reusable payment method.
* You can define a **maximum per installment** at subscription creation.

<br />

### Step 1: First payment and subscription

To initiate the flow, you must start with a standard Pix payment that also sets up the subscription. This generates a QR code or redirect screen for the customer to authorize the recurrence. Once paid, the subscription is created and a `subscription_id` is returned.

You can define the frequency, availability window, and the amount type (fixed or variable) as part of the subscription payload.

```json
"amount": {
  "value": "100",
  "currency": "BRL"
},
"subscription": {
  "frequency": {
    "type": "MONTH",
    "value": 1
  },
  "availability": {
    "start_at": "2025-05-23T20:17:30.277678Z",
    "finish_at": "2027-05-23T20:17:30.277678Z"
  },
  "amount": {
    "value": "100",
    "currency": "BRL",
    "type": "FIXED" // or "VARIABLE"
  }
}
```

After the initial payment is confirmed, the customer has an active subscription, and you can begin scheduling future charges.

### Step 2: Recurring payments

There are two ways to manage the recurring charges:

#### Merchant managed

You handle the scheduling of each payment. Payments must be created **at most 2 days before** the scheduled billing date and **at least 10 days after** the subscription was created. Use the `subscription_id` to identify the recurrence.

```json
"workflow": "DIRECT",
"amount": {
  "value": "100",
  "currency": "BRL"
},
"payment_method": {
  "type": "PIX_AUTOMATIC",
  "vaulted_token": "cab9f0fe-2428-419b-8f9d-4b5efee8c1c8"
},
"subscription": {
  "id": "cab9f0fe-2428-419b-8f9d-4b5efee8c1c8",
  "billing_date": {
    "type": "DAY",
    "day": 14
  }
}
```

#### Yuno managed

Yuno automatically triggers the payments according to the subscription frequency, within the allowed execution window. We also handle retries (up to 3) if a payment fails.

### Step 3: Retries

If a recurring payment fails, it can be retried using a new payment request. Retries must occur within **7 days** of the original billing date and are limited to **3 attempts per cycle**.

Include a flag in the request to identify it as a retry:

```json
"is_retry": true
```

Retries follow the same time window rules as standard charges. Attempts made on or after the 8th day past due will be rejected.

### Important notes

* You cannot send the payment on the exact billing date. It will be rejected.
* If the subscription starts on the 31st, and a month has no 31st, use the 1st of the next month as the billing date.
* The `subscription_id` is linked to the contract, not to the customer. Treat it as a reusable payment method.
* You can set a maximum value for each installment when the subscription is created.

### Next steps

Once you understand how Pix Automático works, you can start integrating by using our payment and subscription APIs.

* [Create a payment](https://docs.y.uno/reference/create-payment)
* [Retrieve or cancel a subscription](https://docs.y.uno/reference/retrieve-subscription)

You can also explore retry logic, test scenarios, and cancellation flows in the following reference guides.

If you plan to handle recurring payments programmatically, we recommend starting with the merchant-managed flow and defining your own billing logic. Yuno orchestration is available for cases where you prefer to offload scheduling and retries.

Pix Automático is currently available for merchants collecting from users with Brazilian bank accounts. Make sure to validate your customer's eligibility and always follow the correct charge timing windows for each subscription cycle.