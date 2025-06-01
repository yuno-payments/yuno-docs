---
title: Aida AI Agent
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
## Introduction

Yuno is introducing **Aida**, an AI-powered agent designed to simplify data retrieval for support and operations teams. Aida allows you to instantly access detailed information about payments, payouts, subscriptions, and payment links, making it easier to troubleshoot incidents efficiently. It can also provide webhook data and surface the status of each actor involved in the payment flow: the provider, Yuno, and the merchant. Beyond transactional insights, Aida can answer technical questions about SDK integration, API usage, and how Yuno’s platform works. It also offers details about Yuno’s technical integrations and features with supported payment providers.

To use **Aida**, simply include “Aida” in your first message and follow up with your question. If at any point the agent is unable to resolve your request, you just need to send a message that includes **“human”** and we’ll automatically notify your key account manager and technical account manager to support you directly. If you do not include "Aida" in your messages you will be directly communicated to your Technical Account Manager. 

Aida is available across multiple channels:

- Slack  
- Email  
- Yuno dashboard

***

## Retrieve information about payments, payouts, subscriptions, and payment links

Use Aida to look up and retrieve complete payment details. This tool is especially helpful if you want to gather all the information regarding any of these operations.

### Searchable fields

You can search by any of these IDs:

- `payment_code`  
- `transaction_code`  
- `order_id`  
- `trace_id`  

### How to search

To search, send an ID and mention "Aida".

> “Aida, give the information for transaction_code: 12345”

### Response

Aida will return all relevant payment information, including the transaction summary and full payment details.

**Note:** You can also send an ID without specifying its category. Aida will automatically check across all possible types and return the relevant information once it identifies the ID.

***

### Payment answer example

```
Here’s the information I found for Payment ID `a43a589a-e7fe-49e2-9e62-44e206026fc8` in the production environment:

- **Account Name**: Velocity Airlines - Account 1  
- **Payment Status**: Successful  
- **Description**: Velocity Payment  
- **Payment Method**: Credit Card (VISA)  
  - **Issuing Bank**: JP Morgan Chase  
  - **Cardholder**: JOHN SMITH  
  - **Installments**: 1  
- **Amount**: 1,718 USD  
- **Creation Date**: April 20, 2025  
- **Provider**: STRIPE  
- **Order ID**: 1ad449c5-484f-42ed-a768-96846e746808  

**Transaction Details**:  
- **Transaction Status**: Succeeded  
- **Provider Transaction Number**: T-357233-19f3481f-1d90-486d-9897-724e941e10d8  

No information is available in the sandbox environment for this ID.

Is there anything else I can help you with?
```

***

### Payouts answer example

```
Here’s the full information for the payout with ID `1a0e03d8-73eb-465b-b40f-f6746658d784` in the production environment:

- **Payout Status**: SUCCEEDED  
- **Payout Sub-status**: SUCCEEDED  

- **Amount**:  
  - **Value**: 37.84 USD  

- **Purpose**: PERSONAL TRANSFER  
- **Description**: CharityPlatform payout ID 40670325 for user ID 2671355  
- **Merchant Reference Code**: payout-40670325  
- **Currency**: USD  
- **Created At**: 2025-04-30T05:27:37.397038Z  
- **Updated At**: 2025-04-30T05:27:39.388616Z  
- **Beneficiary Code**: 2671355  
- **Beneficiary Country**: US (United States)  

- **Withdrawal Method**:  
  - **Method Type**: Debit Card  
  - **Card Brand**: MASTERCARD  
  - **Card Category**: DEBIT MASTERCARD NON-EMBOSSED  
  - **Cardholder Name**: JANE DOE  
  - **Issuing Bank**: BANK OF AMERICA  
  - **Issuing Country Code**: US
```

***

### Subscription answer example

```
- **Code**: 8bc1900a-0341-4e15-b841-556ce40b1233  
- **Name**: StreamMax Monthly
- **Description**: Premium Streaming Subscription  
- **Status**: ACTIVE  
- **Country**: US  
- **Created At**: 2024-11-29T22:20:46Z  
- **Updated At**: 2025-04-30T17:20:46Z  

**Amount & Billing:**  
- **Currency**: USD  
- **Amount**: 9.99  
- **Billing Cycle (Current)**: 6  
- **Next Billing Cycle**: 2025-05-30T17:20:46Z  

**Frequency & Payments:**  
- **Frequency**: Every 1 MONTH  
- **Payments**:  
  - Payment 1: 42266ea1-098e-4530-a630-14155a582196  
  - Payment 2: a381fa15-eb1f-4a3f-83b4-4d4735daf98f  
  - Payment 3: c5014bb2-5be8-444f-b689-9f32223b4bfd  
  - Payment 4: 182dea88-a2d6-4456-b6ad-32d0d4282665  
  - Payment 5: 6a4b44f7-419e-4aaf-a816-01214ef0baae  

**Payment Method:**  
- **Type**: CARD  
- **Vaulted Token**: 7d182868-8886-4ba5-9dfb-d0ad56aa1b54  

**Retries:**  
- **Number of Retries**: 6  
- **Retry on Decline**: False  

If you need further details or have any other questions, feel free to ask!
```

***

### Payment answer link example

```
Here are the details for the payment link with code `6370130d-19d5-31e3-b0e5-bc612a31e1e8` in the production environment:

- **Account Code**: e4f11f90-f87d-45d4-b1c5-e63bf251f33d  
- **Amount**: 200.00 USD  
- **Capture**: True  
- **Checkout URL**: [Visit Checkout](https://checkout.y.uno/payment?session=4c7290ed-95da-40ba-9278-816f90e14624)  
- **Country**: United States (US)  
- **Created At**: 2025-04-16T16:49:27.171169Z  
- **Description**: Test Purchase  
- **One Time Use**: True  
- **Organization Code**: cb2960f5-c3e1-4c09-86ab-55506240394f  
- **Payment Method Types**: CARD, GOOGLE_PAY, CLICK_TO_PAY, APPLE_PAY, BANK_TRANSFER  
- **Payments Number**: 0  
- **Split Payment Methods**: False  
- **Start At**: 2025-04-16T16:49:25.818Z  
- **Status**: CREATED  
- **Timezone**: GMT-4 America/New_York  

No information was found for the sandbox environment.

If there's anything else you'd like to know or need further assistance, feel free to ask!
```

***

## Webhook & system information

Aida makes it easy to monitor and validate webhook activity by showing whether webhooks were **configured** in Yuno, **received** by Yuno from the provider, and **successfully sent** to the merchant, along with key transaction and delivery details.

**Note:** **Received** means Yuno successfully received the webhook from the provider.

### 1. Determine the search criteria

Choose the appropriate search criteria for your query. The options include:

- `tx_code`  
- `payment_code`  
- `order_id`  
- `trace_id`  
- `unknown`  

### 2. Provide the search value

Enter the value that corresponds to the search criteria you selected. This value will be used to locate the specific webhook information.

### 3. Select the environment

Decide whether to perform your query in the **Sandbox** (testing) or **PROD** (live production) environment.

**Example Message:**

> “Hi Aida, I need to verify webhook information.  
> **Search criteria:** tx_code  
> **Search value:** 123456789  
> **Environment:** PROD”

If the information is incomplete, Aida will ask follow-up questions, to be able to assist the user.

***

### Webhooks answer example

```
Here are the webhook details for the payment with ID `68245f98-5049-4b88-9861-81e01c235bbf` in the production environment:

- *Webhook Configured:* Yes  
- *Webhook Received:* Yes  
- *Webhook Sent to the Merchant:* Yes  

*Transaction Information:*  
- *Account Code:* 4c0b49cd-16ca-4221-bf30-0d62ac38a83c  
- *Account Name:* Velocity Retail - U.S. Account  
- *Country:* US  
- *Created At:* 2025-05-09T19:40:30.011016Z  
- *Organization Code:* 1199c453-1a51-4476-9a18-efc887c30cff  
- *Organization Name:* Velocity Retail  
- *Payment Code:* 68245f98-5049-4b88-9861-81e01c235bbf  
- *Payment Method Type:* CREDIT_CARD  
- *Payment Status:* SUCCEEDED  
- *Payment Sub Status:* APPROVED  
- *Provider ID:* STRIPE  
- *Provider Transaction ID:* 1620000000409096389  
- *Transaction Status:* SUCCEEDED  
- *Updated At:* 2025-05-09T19:42:26.544614Z  

*Webhook Information:*  
- *HTTP Method:* POST  
- *Organization Code:* 1199c453-1a51-4476-9a18-efc887c30cff  
- *Account Code:* 4c0b49cd-16ca-4221-bf32-0d62ac38a83b  
- *Trace ID:* traceId  
- *Origin ID:* 68245f98-5049-4b88-9861-81e01c235bbf  
- *URL:* [Webhook URL](https://merchant-api.velocityretail.com/api/payment-provider/webhook/yuno)  

If you need more detailed information or further assistance, feel free to ask!
```

***

## From integration to features, Aida has you covered

Instead of digging through pages to find what you need, you can just ask Aida using natural language. Aida is your conversational agent, designed to help support, operations, and technical teams get clear, immediate answers about Yuno's platform and features.

You can ask Aida what payment methods are supported in a specific country, get a list of providers available in a particular region, or explore what features are enabled for each integration, such as refunds, recurring payments, or real-time notifications. You can also ask for guidance on how to integrate Yuno’s SDKs on web or mobile, understand which payment method types support 3DS or tokenization, or confirm if a certain provider allows installment payments.

Whether you’re launching a new market, debugging a payment flow, or just exploring what’s possible with Yuno, Aida helps you get answers fast, just by asking!

> “Aida, I want to understand how Yuno's subscriptions engine works, the key features it supports and how it adds value to my business.”

### Aida answer example

```
Yuno's subscription engine offers several key features and provides significant business value:  

### Key Features:

- **Recurring Revenue**: Facilitates the management of recurring payments, automating subscription billing processes, and streamlining subscription management.  
  This provides businesses with a steady and predictable income stream, crucial for financial stability.

- **Flexible Subscription Management**: Allows for management of different subscription statuses such as `ACTIVE`, `PAUSED`, `COMPLETED`, and `CANCELED`, enabling businesses to adapt to various customer needs and payment issues.

- **Automation and Efficiency**: Capabilities to pause, resume, and cancel subscriptions through API endpoints simplify operational tasks, reducing overhead and increasing efficiency.

### Business Value:

- **Customer Loyalty and Reduced Churn**: Subscribers typically exhibit higher loyalty, contributing to increased customer retention rates, reducing churn, and the need for constant customer acquisition efforts.

- **Cost-effectiveness**: By reducing the frequency of onboarding new customers, businesses can lower acquisition costs and focus more on serving existing customers.

- **Enhanced Revenue Streams**: Features like smart retries help improve payment success rates, stabilizing cash flow and maximizing revenue potential.

For more detailed information about managing subscriptions and their statuses, you can refer to the [Subscription status API Reference](https://docs.y.uno/reference/status-subscriptions).

Is there anything else you would like to know?
```