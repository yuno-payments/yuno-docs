---
title: Split Payments Marketplace (COPY) II
deprecated: false
hidden: true
metadata:
  robots: index
---
## Overview

This feature enables merchants to split payments among multiple recipients, which is particularly beneficial for marketplace models where transactions need to be divided among different sellers or stakeholders. Merchants can specify how the payment is split, including the amounts, recipients, and any applicable fees.

The split payment functionality is contingent on the support of the selected payment provider. Yuno serves solely as the orchestrator of the payment, not the processor. Ensure your provider supports split payments before using this functionality. Currently, this feature is available for the following providers:

* Pagarme
* Adyen
* Stripe
* dLocal

**First** you'll need to **onboard your recipients** for the payment split, and **then** create the **payment** specifying the necessary information.

## Key features

* **Split payments**: Define how the total payment amount is distributed among different recipients.
* **Flexible configuration**: Support for absolute-based splits.
* **Integration with providers**: Splits can be executed by payment providers that support this functionality.
* **Detailed handling of fees**: The system allows for fine-tuning of how transaction fees and chargebacks are managed.

## 1- Onboardings

Yuno’s onboarding model is designed to help marketplaces seamlessly connect and manage their **submerchants** across **multiple payment providers**. At the core of this system is the **Recipient object**, which represents each individual submerchant within the marketplace ecosystem.

* Each **Marketplace Owner** is represented in **Yuno as an Organization**.
* Within an organization, one or more Accounts can be created, each configured with its own set of **Connections** to payment providers (e.g., Stripe, MercadoPago, Adyen, dLocal).
* For every account, the marketplace can register one or more **Recipients** — these are the submerchants to be onboarded.
* Each **Recipient** is then linked individually to one or more **Connections**, depending on which payment processors they will use.

This **architecture** enables:

* A single, unified onboarding process.
* Independent status tracking per provider.
* Easy scaling of submerchant operations across providers.

This design ensures flexibility, transparency, and full traceability throughout the onboarding lifecycle. The /recipients endpoint is used to create and manage each submerchant profile, and to trigger the corresponding provider-specific onboarding workflows.

### Onboarding flows

Yuno supports two **onboarding flows** for submerchants:

1. **Pre-onboarded Accounts**: If the submerchant has already completed the onboarding process with a given provider (e.g., via an external dashboard or platform), the marketplace can provide the corresponding **recipient\_id** at the time of creation. In this case, **no further onboarding is needed**, and the status will immediately be set to **SUCCEEDED**. (`onboardings.type`='PREVIOUSLY\_ONBOARDED')
2. **Dynamic Onboarding**: If no credentials are provided, Yuno will initiate the onboarding process for the selected provider. (`onboardings.type`='ONBOARD\_ONTO\_PROVIDER') Depending on the provider’s requirements, this may involve:
   1. Form submission or redirection to hosted onboarding.
   2. Upload of legal or financial documentation.
   3. KYC/KYB validation steps.

During the onboarding lifecycle, a Recipient may go through several statuses which indicate the current state of the process:

| Status                             | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| `CREATED`                          | Initial state after creation; onboarding process not yet started.            |
| `PENDING_REVIEW`                   | Awaiting provider review after data was submitted.                           |
| `PENDING_ADDITIONAL_DOCUMENTATION` | More documents are needed to continue onboarding.                            |
| `PENDING_WAITING_USER_INTERACTION` | Waiting for the submerchant to complete an external action (e.g., form).     |
| `SUCCEEDED`                        | The recipient is fully onboarded and active.                                 |
| `DECLINED`                         | The onboarding was rejected by the provider and cannot be retried.           |
| `BLOCKED`                          | The provider has explicitly blocked the onboarding due to compliance issues. |
| `CANCELED`                         | The onboarding process was voluntarily canceled before completion.           |
| `REJECTED`                         | The onboarding failed due to incorrect data or failed validations.           |
| `ERROR`                            | A technical error occurred during the onboarding flow.                       |

These statuses help the marketplace understand the onboarding lifecycle and implement appropriate retry, alert, or fallback mechanisms when required.

This flexibility allows marketplaces to adapt the onboarding process to their operational needs, without sacrificing control or visibility.

## 2- Payment Split Integration

The `split_marketplace` object defines how a [payment](ref:create-payment) should be split between recipients. It is an array of objects, where each object represents a recipient and their share of the payment.

| Field                   | Type      | Description                                                                                                                                                                                           | Mandatory   | Example Value  |
| :---------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- | :------------- |
| `recipient_id`          | `string`  | The ID of the recipient in the [Yuno system](ref:create-recipients).                                                                                                                                  | Conditional | `rec_test123`  |
| `provider_recipient_id` | `string`  | The recipient ID from the payment provider, if applicable.                                                                                                                                            | Conditional | `prov_rec_abc` |
| **Note:**               |           | Either `recipient_id` or `provider_recipient_id` must be provided. For marketplace owners (`type`='COMMISSION'), `provider_recipient_id` can be optional if not applicable for the specific provider. |             |                |
| `type`\*                | `enum`    | Split type. Could be `PURCHASE`, `PAYMENTFEE`, `VAT`, `COMMISSION`, `MARKETPLACE`, `SHIPPING`. (MAX 10; MIN 4 characters).                                                                            | Yes         | `PURCHASE`     |
| `merchant_reference`    | `string`  | Identification of the payment transaction. Optional. If not defined, the same value as the main payment's merchant reference will be used for all split transactions. (MAX 255; MIN 3 characters).    | No          | `AAB01-432245` |
| `amount`\*              | `struct`  | Defines the amount of the split.                                                                                                                                                                      | Yes         |                |
|     `value`             | `number`  | Amount of the split (e.g., 7500 for 75.00).                                                                                                                                                           | Yes         | `7500`         |
|     `currency`\*        | `enum`    | The currency used to make the payment (ISO 4217, 3 characters).                                                                                                                                       | Yes         | `COP`          |
| `liability`             | `struct`  | Optional information regarding the recipient’s liability for fees and chargebacks.                                                                                                                    | No          |                |
|     `processing_fee`    | `enum`    | Indicates who will be charged the transaction fee: `MERCHANT`, `RECIPIENT`, `SHARED`.                                                                                                                 | No          | `MERCHANT`     |
|     `chargebacks`       | `boolean` | If `true`, the recipient is responsible in case of a chargeback.                                                                                                                                      | No          | `false`        |

The `split_marketplace` object defines how a [payment](ref:create-payment) should be split between recipients. It is an array of objects, where each object represents a recipient and their share of the payment.

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

## Validations

* The sum of all splits must equal the total payment amount.
* For each split, you must send an object for every participant, and the sum of amounts must equal the total payment amount.
* For scenarios where a direct recipient ID is not required for the marketplace owner (e.g., with Adyen), the `type` field can be used as a flag (e.g., `COMMISSION`) to indicate the marketplace owner's share, and the `provider_recipient_id` will be optional for that specific split.
* Either `recipient_id` or `provider_recipient_id` must be provided for the split, but not both.
* If any required fields are missing or invalid, the request will return an error.
* In case you use more than one payment provider for the split payments, we recommend using the [recipients object](ref:create-recipients), as it lets you define more than one provider for each recipient.

## API endpoints involved

* *[Recipients](ref:create-recipients)*: POST /v1/recipients
* [*Payment Creation*](ref:create-payment): POST /v1/payments
* [*Full and Partial Capture*](ref:capture-authorization): POST /v1/payments/:id/transactions/:transaction\_id/capture
* [*Full or Partial Refund*](ref:refund-payment):
  * POST /v1/payments/:id/transactions/:transaction\_id/refund
  * POST /v1/payments/:id/cancel-or-refund
  * POST /v1/payments/:id/transactions/:transaction\_id/cancel-or-refund