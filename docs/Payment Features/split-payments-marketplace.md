---
title: Split Payments Marketplace
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
## Overview

This feature allows merchants to split payments between multiple recipients. This is especially useful for marketplace models, where a transaction needs to be divided among different sellers or stakeholders. By utilizing this functionality, merchants can define how the payment is split, including the amounts, recipients, and any applicable fees.

The split payment functionality depends on whether the selected payment provider supports it. Yuno acts solely as the orchestrator of the payment, not the processor. Make sure your provider supports split payments before attempting to use this functionality. At the moment, this feature is only available for the following providers: 

- Pagarme

## Key Features

- _Split Payments_: Define how the total payment amount is distributed among different recipients.
- _Flexible Configuration_: Support for both absolute and percentage-based splits.
- _Integration with Providers_: Splits can be executed by payment providers that support this functionality.
- _Detailed Handling of Fees_: The system allows for fine-tuning of how transaction fees and chargebacks are managed.

## Integration

The split_marketplace object defines how a [payment](ref:create-payment) should be split between recipients. It is an array of objects, where each object represents a recipient and their share of the payment.

| Field                 | Type    | Description                                                                                                                                                                      |
| :-------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| recipient_id          | string  | The ID of the recipient in the [Yuno system](ref:create-recipients). [Conditional - Either the recipient_id or the provider_recipient_id should be sent in the payment creation] |
| provider_recipient_id | string  | The recipient ID from the payment provider, if applicable. [Conditional - Either the recipient_id or the provider_recipient_id should be sent in the payment creation]           |
| type                  | enum    | The type of split (PURCHASE, PAYMENTFEE, VAT, COMMISSION, MARKETPLACE, SHIPPING). [Mandatory]                                                                                    |
| merchant_reference    | string  | Optional unique identifier for the split transaction.                                                                                                                            |
| amount                | struct  | Defines the amount or percentage of the split. [Mandatory]                                                                                                                       |
| - value               | number  | Amount of the split                                                                                                                                                              |
| - currency            | enum    | The currency used to make the payment (ISO 4217 MAX 3; MIN 3)                                                                                                                    |
| liability             | struct  | Optional information regarding the recipient’s liability for fees and chargebacks.                                                                                               |
| - processing_fee      | enum    | Indicates who will be charged the transaction fee. MERCHANT, RECIPIENT, SHARED                                                                                                   |
| - chargebacks         | boolean | The recipient is responsible in case of a chargeback                                                                                                                             |

```json json
{
  "split_marketplace": [
    {
      "provider_recipient_id": "recipient_123",
      "type": "PURCHASE",
      "amount": {
        "value": 750,
        "currency": "EUR"
      },
      "liability": {
        "processing_fee": "MERCHANT",
        "chargebacks": false
      }
    },
    {
      "provider_recipient_id": "recipient_456",
      "type": "COMMISSION",
      "amount": {
        "value": 30,
        "currency": "EUR"
      },
      "liability": {
        "processing_fee": "RECIPIENT",
        "chargebacks": true
      }
    }
  ]
}

```

### Rules

- The sum of all splits must equal the total payment amount.
- Either recipíent_id or provider_recipient_id must be provided for the split, but not both.
  - In case you use more than one payment provider for the split payments, we recommend using the [recipients object](ref:create-recipients), as it lets you define more than one provider for each recipient.
- If any required fields are missing or invalid, the request will return an error.

## API Endpoints Involved

- _[Recipients](ref:create-recipients)_: POST /v1/recipients
- [_Payment Creation_](ref:create-payment): POST /v1/payments
- [_Full and Partial Capture_](ref:capture-authorization): POST /v1/payments/:id/transactions/:transaction_id/capture
- [_Full or Partial Refund_](ref:refund-payment): 
  - POST /v1/payments/:id/transactions/:transaction_id/refund
  - POST /v1/payments/:id/cancel-or-refund
  - POST /v1/payments/:id/transactions/:transaction_id/cancel-or-refund