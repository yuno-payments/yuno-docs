---
title: Chargeback Management
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
Yuno provides a unified and automated solution for managing disputes, enabling you to handle chargebacks from all providers in a single dashboard. With Yuno, you can streamline your workflows, recover revenue, and maintain audit readiness—eliminating unnecessary back and forth.

## What is a chargeback?

A chargeback is a claim initiated by a customer through their issuing bank when they identify a problem with a transaction. Common reasons include unauthorized payments, incorrect amounts, or disputes with the merchant.

In Yuno, a **chargeback** and a **dispute** both refer to a contested transaction. The distinction is based on the merchant's response: when the merchant submits documentation to contest the chargeback, it becomes an **active dispute**. The transaction itself remains the same, but its state changes depending on the actions taken.

## Chargeback workflow

The chargeback workflow in Yuno helps you understand each step from the moment a customer initiates a claim to the final resolution. The following outlines the typical process:

<Image align="center" src="https://files.readme.io/e0034ded51f79400bd4698b840ec6c77237938e13ea3db078ae959c94d05f375-Chargebacks_disputes.png" />

1. **Chargeback creation**
   * The customer raises a claim with their issuing bank
   * The issuing bank notifies the payment provider
   * The provider informs Yuno about the claim
   * Yuno logs the chargeback, and the initial transaction state is `CREATED`

2. **Merchant notification**
   * Yuno notifies the merchant about the chargeback and updates the payment status.

3. **Merchant actions**
   * The merchant can:
     * **Submit evidence**: Provide documentation supporting the validity of the transaction. This action turns the chargeback into an active dispute.
     * **Accept the chargeback**: Acknowledge the claim without contesting it, resulting in a loss of funds (`LOST`).

4. **Evidence review**
   * If evidence is submitted, the issuing bank reviews the documentation and issues a final decision (`PENDING_REVIEW`).

5. **Chargeback or dispute resolution**
   * **Dispute won** (`WON`): The customer's claim is rejected, and the transaction remains valid
   * **Dispute lost** (`LOST`): The customer's claim is accepted, resulting in a refund to the customer

## Chargeback states

Chargebacks in Yuno move through several states, each representing a different stage in the dispute process. Understanding these states helps you track and manage chargebacks efficiently.

<Image align="center" src="https://files.readme.io/5affb7a6f6868047baf67fda23adbe8f44f4dd142a81c64dd6c2f0a5b6e857bf-Chargebacks_2.png" />

| **State**         | **Description**                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| `CREATED`         | The chargeback has been received. The merchant can take action or submit evidence if supported by the provider. |
| `PENDING_REVIEW`  | Evidence has been submitted and is under review by the issuing bank.                                            |
| `WON`             | The dispute was resolved in favor of the merchant.                                                              |
| `LOST`            | The claim was accepted, resulting in a refund to the customer.                                                  |


### Payment and transaction statuses

The following table explains how chargeback states relate to payment and transaction statuses in Yuno:

| **Payment status** | **Payment substatus** | **Transaction type** | **Transaction status** | **Description**                                                                                           |
| ------------------ | --------------------- | -------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------- |
| `SUCCEEDED`        | APPROVED              | Chargeback           | Won                    | The chargeback dispute was won by the merchant.                                                           |
| `IN_DISPUTE`       | RECEIVED              | Chargeback           | Created                | Chargeback or inquiry received. Decision or documentation is required to initiate a dispute.              |
|                    | PENDING_REVIEW        | Chargeback           | Pending_review         | Dispute is under review by the provider.                                                                  |
| `CHARGEBACK`       | LOST                  | Chargeback           | Lost                   | The dispute was lost (expired, closed, or review lost).                                                   |

## Key benefits of managing chargebacks with Yuno

Yuno helps you simplify and optimize your chargeback management process. Here are some of the main benefits you gain by using Yuno for chargebacks:

### All your disputes in one integrated workflow

Easily consolidate chargeback data from all your payment providers into a single dashboard. Whether you work with Visa, Mastercard, or a local acquirer, you can track, respond to, and manage disputes centrally—no need for complex API integrations.

### Streamlined chargeback response

Automate your chargeback responses with the right supporting documentation, ensuring every dispute is addressed quickly and efficiently.

### Simplified compliance

Every chargeback, response, and update is logged and accessible. With built-in audit trails and exportable records, compliance and internal reviews become faster and easier.

## Understanding the reason code

Each chargeback includes a reason code that explains why the customer initiated the dispute. Understanding these codes helps you tailor your response and gather the right information for each case.

You can find a comprehensive list of all possible codes provided by acquirers in the [chargeback reason codes section](doc:reason-codes). For each chargeback transaction, the reason code appears in the `response_code` field.

## Evidence management

To dispute a chargeback, you must submit evidence supporting your case. In the context of dispute resolution, evidence refers to any information or documentation that substantiates your position in a disagreement or claim. Providing clear and relevant evidence is essential for achieving a favorable outcome.

Common types of evidence include:

* *Proof of delivery*: Documents confirming that a product was shipped and received by the customer, such as tracking numbers or delivery confirmations.
* *Customer communications*: Records of emails, text messages, or any exchanges that demonstrate agreements or clarifications made with the customer.
* *Refund and return policies*: Copies of the policies that the customer agreed to at the time of purchase, outlining the conditions for returns or refunds.
* *Proof of authenticity*: Documentation verifying the legitimacy of a transaction, such as signed receipts or authentication records.

Make sure your evidence is clear, relevant, and directly related to the issue at hand. Organizing and presenting your evidence professionally and concisely will help the parties involved assess your case more effectively.

> 📘 Evidence requirements
>
> Uploaded files must meet the following criteria:
>
> * *Format*: PDF file, encoded as base64
> * *Size*: No larger than 1 MB
> * *Language*: Dispute should be written in English or the local language

### Example Request to Submit Evidence

```json
POST https://api-sandbox.y.uno/v1/payments/:payment_id/transactions/:transaction_id/dispute

Headers:
  X-Idempotency-Key: <unique-key>
  X-Public-Api-Key: <api-key>
  X-Private-Secret-Key: <secret-key>

Body:
{
  "account_id":"<Your Yuno account_id>",
  "evidence": [
    {
      "file_name": "signed_receipt.pdf",
      "content_type": "application/pdf",
      "content_category": "RECEIPT",
      "content": "JVBERi0xLjMKJcTl8uXrp/Og0MT..."
    }
  ]
}

 
```

Please refer to the [Disputes API](ref:disputes) reference section for more information.