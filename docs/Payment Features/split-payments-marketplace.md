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

This feature enables merchants to split payments among multiple recipients, which is particularly beneficial for marketplace models where transactions need to be divided among different sellers or stakeholders. Merchants can specify how the payment is split, including the amounts, recipients, and any applicable fees.

The split payment functionality is contingent on the support of the selected payment provider. Yuno serves solely as the orchestrator of the payment, not the processor. Ensure your provider supports split payments before using this functionality. Currently, this feature is available only for the following provider:

* Pagarme

## Key features

* **Split payments**: Define how the total payment amount is distributed among different recipients.
* **Flexible configuration**: Support for absolute-based splits.
* **Integration with providers**: Splits can be executed by payment providers that support this functionality.
* **Detailed handling of fees**: The system allows for fine-tuning of how transaction fees and chargebacks are managed.

## Integration

The split\_marketplace object defines how a [payment](ref:create-payment) should be split between recipients. It is an array of objects, where each object represents a recipient and their share of the payment.

<Table>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `recipient_id`
      </td>

      <td>
        string
      </td>

      <td>
        The ID of the recipient in the [Yuno system](ref:create-recipients).
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>

      </td>

      <td>
        * Conditional - Either the `recipient_id` or the `provider_recipient_id` should be sent in the payment creation.
      </td>
    </tr>

    <tr>
      <td>
        `provider_recipient_id`
      </td>

      <td>
        string
      </td>

      <td>
        The recipient ID from the payment provider, if applicable.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>

      </td>

      <td>
        * Conditional - Either the `recipient_id` or the `provider_recipient_id` should be sent in the payment creation.
      </td>
    </tr>

    <tr>
      <td>
        `type`
      </td>

      <td>
        enum
      </td>

      <td>
        The type of split (`PURCHASE`, `PAYMENTFEE`, `VAT`, `COMMISSION`, `MARKETPLACE`, `SHIPPING`).
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>

      </td>

      <td>
        * Mandatory
      </td>
    </tr>

    <tr>
      <td>
        `merchant_reference`
      </td>

      <td>
        string
      </td>

      <td>
        Optional unique identifier for the split transaction.
      </td>
    </tr>

    <tr>
      <td>
        `amount`
      </td>

      <td>
        struct
      </td>

      <td>
        Defines the amount or percentage of the split.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>

      </td>

      <td>
        * Mandatory
      </td>
    </tr>

    <tr>
      <td>
        * `value`
      </td>

      <td>
        number
      </td>

      <td>
        Amount of the split
      </td>
    </tr>

    <tr>
      <td>
        * `currency`
      </td>

      <td>
        enum
      </td>

      <td>
        The currency used to make the payment (ISO 4217 MAX 3; MIN 3)
      </td>
    </tr>

    <tr>
      <td>
        `liability`
      </td>

      <td>
        struct
      </td>

      <td>
        Optional information regarding the recipient’s liability for fees and chargebacks.
      </td>
    </tr>

    <tr>
      <td>
        * `processing_fee`
      </td>

      <td>
        enum
      </td>

      <td>
        Indicates who will be charged the transaction fee. `MERCHANT`, `RECIPIENT`, `SHARED`
      </td>
    </tr>

    <tr>
      <td>
        * `chargebacks`
      </td>

      <td>
        boolean
      </td>

      <td>
        The recipient is responsible in case of a chargeback
      </td>
    </tr>
  </tbody>
</Table>

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

* The sum of all splits must equal the total payment amount.
* Either recipíent\_id or provider\_recipient\_id must be provided for the split, but not both.
  * In case you use more than one payment provider for the split payments, we recommend using the [recipients object](ref:create-recipients), as it lets you define more than one provider for each recipient.
* If any required fields are missing or invalid, the request will return an error.

## API Endpoints Involved

* *[Recipients](ref:create-recipients)*: POST /v1/recipients
* [*Payment Creation*](ref:create-payment): POST /v1/payments
* [*Full and Partial Capture*](ref:capture-authorization): POST /v1/payments/:id/transactions/:transaction\_id/capture
* [*Full or Partial Refund*](ref:refund-payment):
  * POST /v1/payments/:id/transactions/:transaction\_id/refund
  * POST /v1/payments/:id/cancel-or-refund
  * POST /v1/payments/:id/transactions/:transaction\_id/cancel-or-refund