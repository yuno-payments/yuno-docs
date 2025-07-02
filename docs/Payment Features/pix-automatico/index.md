---
title: PIX Automatico
deprecated: false
hidden: true
metadata:
  robots: index
---
> 🚧 Under development

## Overview

Pix Automático is the Central Bank of Brazil’s new merchant-initiated recurring-payment feature built on the ubiquitous Pix instant-payment network. Since its launch in late 2020, Pix has become Brazilians’ favorite way to pay—handling over **26 trillion BRL** in transactions last year—and is available 24/7 across all banking apps and digital wallets. On **June 16, 2025**, Pix Automático went live, enabling businesses to collect **subscription-style** or **installment** payments with a single one-time customer authorization—no credit cards or manual debit mandates required. Early estimates project up to **$30 billion USD** in e-commerce volume over the next two years via this new feature.

Pix Automático is a Pix-based payment method designed for recurring charges. Unlike regular Pix flows where the customer initiates each transaction, Pix Automático allows **automated debits** from the payer’s account after a **one-time authorization**. Think of it as Pix-native direct debit, ideal for subscriptions, monthly bills, and other recurring payments.

This flow reduces friction for end users while helping merchants minimize late payments and improve collection success rates.

***

## Use Cases

| Journey                           | Description                                                                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **QR Code & Instant-Pay Journey** | Single QR that both charges the first installment and enrolls the customer for all future recurring payments.                   |
| **QR Code Journey**               | Present a QR code for authorization only—no immediate charge. Perfect for free trials or deferred first payments. *Coming soon* |

***

## Key Features

| Feature                         | Description                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------- |
| **Billing Cycles**              | Weekly, monthly, quarterly, semi-annual or annual recurrence.                      |
| **Duration**                    | Fixed-term or open-ended (until customer or merchant cancels).                     |
| **Amount Flexibility**          | Fixed or variable charges based on usage tiers or consumption.                     |
| **First-Payment Options**       | Execute an immediate capture or schedule the first payment for a later date.       |
| **Retry Rules**                 | Up to 3 automatic retries over 7 calendar days if a charge fails.                  |
| **Credit-Line Access**          | Leverage the customer’s authorized credit limit, not just their available balance. |
| **One-Time + Recurring Bundle** | Combine an initial one-off charge with the enrollment in a single transaction.     |
| **Cancellation & Refund APIs**  | Cancel enrollments or process refunds at any time via simple REST calls.           |
| **Service-Triggered Payments**  | Send ad-hoc or variable orders outside the regular schedule when needed.           |

***

## Flow

1. **Subscription**\
   The merchant creates a subscription in Yuno by calling the Payments API endpoint and presenting the authorization flow (e.g., render QR code). The customer approves once, defining amount parameters, billing cycle, and duration.

2. **Recurring Payment Requests**\
   For each billing cycle, the merchant submits a payment-order request referencing the enrollment ID. The customer’s bank validates the request against the original consent and executes the transfer automatically.

3. **Monitoring & Retries**\
   On failure for each payment, the merchant can perform up to 3 retries over a 7-day window.

4. **Cancellation & Reporting**\
   When an enrollment is canceled—by customer action or via Yuno’s API—no further orders are sent. Comprehensive reporting endpoints support reconciliation of successful charges, failures, and refunds.