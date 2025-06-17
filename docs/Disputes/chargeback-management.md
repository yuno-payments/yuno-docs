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
Yuno offers a unified and automated solution for handling disputes, allowing you to manage chargebacks across all providers from a single dashboard. Our platform helps you automate workflows, recover revenue, and stay audit-ready, all without the back and forth.

## What is a Chargeback?

A chargeback is a claim initiated by a customer through their issuing bank due to a transaction they find problematic, such as unauthorized payments, incorrect amounts, or merchant disputes.

In Yuno, a **chargeback** and a **dispute** are technically the same—they both represent a contested transaction.\
The conceptual difference lies in the merchant's response: when a merchant provides documentation to contest the chargeback, it becomes an **active dispute**. However, the transaction remains the same, and only its state evolves based on the actions taken.

## Chargeback Workflow

<Image align="center" src="https://files.readme.io/e0034ded51f79400bd4698b840ec6c77237938e13ea3db078ae959c94d05f375-Chargebacks_disputes.png" />

1. **Chargeback creation**
   * The customer raises a claim with their issuing bank
   * The bank notifies the payment provider
   * The provider informs Yuno about the claim
   * Yuno logs the chargeback, and its initial transaction state is `CREATED`

2. **Merchant notification**
   * Yuno notifies the merchant about the chargeback and updates the payment's status

3. **Merchant actions**
   * The merchant can:
     * **Submit evidence**: Provide documentation supporting the validity of the transaction, turning the chargeback into an active dispute
     * **Accept the chargeback**: Acknowledge the claim without disputing it and lose the funds (`LOST`)

4. **Evidence review**
   * If evidence is submitted, the issuing bank reviews the documentation and issues a final decision (`PENDING_REVIEW`)

5. **Chargeback/dispute resolution**
   * **Dispute Won** (`WON`): The customer's claim is rejected, and the transaction remains valid
   * **Dispute Lost** (`LOST`): The customer's claim is accepted, resulting in a refund to the customer

## Chargeback States

The states of chargebacks in Yuno represent the various stages of the process:

<Image align="center" src="https://files.readme.io/5affb7a6f6868047baf67fda23adbe8f44f4dd142a81c64dd6c2f0a5b6e857bf-Chargebacks_2.png" />

| **State**        | **Description**                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `CREATED`        | A chargeback has been received; the merchant can take action or submit evidence if the provider supports it. |
| `PENDING_REVIEW` | Evidence has been submitted and is under review by the issuing bank.                                         |
| `WON`            | The dispute was resolved in favor of the merchant.                                                           |
| `LOST`           | The claim was accepted, resulting in a refund to the customer.                                               |

<br />

| **Payment Status** | **Payment Substatus** | **Transaction Type** | **Transaction Status** | **Description**                                                                                            |
| ------------------ | --------------------- | -------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| `SUCCEEDED`        | APPROVED              | Chargeback           | Won                    | Chargeback dispute won                                                                                     |
| `IN_DISPUTE`       | RECEIVED              | Chargeback           | Created                | Chargeback or Inquiry received. Decision or documentation must be provided in order to initiate a dispute. |
|                    | PENDING\_REVIEW       | Chargeback           | Pending\_review        | Dispute in review by the provider                                                                          |
| `CHARGEBACK`       | LOST                  | Chargeback           | Lost                   | Expired/Closed/Review\_lost                                                                                |

## Key benefits of managing chargebacks with Yuno

Yuno simplifies and optimizes your chargeback management through several key advantages:

### All your disputes in one integrated workflow

Consolidate chargeback data from all your payment providers into one dashboard. Whether it's Visa, Mastercard, or a local acquirer, you can track, respond, and manage disputes centrally—no API stitching required.

### Streamlined chargeback response

Automate chargeback responses with the right supporting documentation to ensure every dispute is addressed quickly and efficiently.

### Ensure compliance

Every chargeback, every response, every update—logged and accessible. With built-in audit trails and exportable records, compliance and internal reviews are faster and easier.

## Understand the reason code

Understanding the reason code behind each chargeback is crucial, as it explains why the customer initiated the dispute. Familiarity with these codes allows you to tailor your response more effectively and gather the necessary information for each case. In the [Chargeback Reason Codes section](doc:reason-codes), you can find a comprehensive list of all possible codes provided by acquirers. In each chargeback transaction you'll be able to find the reason code in the `response_code` field.

## Evidence Management

To dispute a chargeback, the merchant must submit evidence supporting their case. In the context of dispute resolution services, evidence refers to any information or documentation that substantiates your position in a disagreement or claim. Providing compelling evidence is crucial for achieving a favorable outcome. Examples of such evidence include:

* *Proof of delivery*: Documents confirming that a product was shipped and received by the customer, such as tracking numbers or delivery confirmations
* *Customer communications*: Records of emails, text messages, or any exchanges that demonstrate agreements or clarifications made with the customer
* *Refund and return policies*: Copies of the policies that the customer agreed to at the time of purchase, outlining the conditions for returns or refunds
* *Proof of authenticity*: Documentation verifying the legitimacy of a transaction, like signed receipts or authentication records

It's essential that the evidence presented is clear, relevant, and directly pertains to the issue at hand. Additionally, organizing and presenting the evidence professionally and concisely will aid in its assessment by the parties involved in resolving the dispute.

> 📘 Evidence requirements
>
> The uploaded files must meet the following criteria:
>
> * *Format*: File must be in PDF format, encoded as base64
> * *Size*: File must be no larger than 1 MB in size
> * *Language*: Dispute should be written in English or the country's local language

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