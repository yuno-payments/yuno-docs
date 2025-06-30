---
title: Split Payments Marketplace
deprecated: false
hidden: false
metadata:
  robots: index
---
This feature enables **merchants to split payments among multiple recipients**, which is particularly beneficial for marketplace models where transactions need to be divided among different sellers or stakeholders. Merchants can specify how the payment is split, including the amounts, recipients, and any applicable fees.

The split payment functionality is contingent on the support of the selected payment provider. Yuno serves solely as the orchestrator of the payment, not the processor. Ensure your provider supports split payments before using this functionality.

## Key features

* **Split payments**: Define how the total payment amount is distributed among different recipients.
* **Flexible configuration**: Support for absolute-based splits.
* **Integration with providers**: Splits can be executed by payment providers that support this functionality.
* **Detailed handling of fees**: The system allows for fine-tuning of how transaction fees and chargebacks are managed.

**First** you'll need to **onboard your recipients** for the payment split, and **then** create the **payment** specifying the necessary information.

***

## 1- Onboardings

Yuno's onboarding model is designed to help marketplaces seamlessly connect and manage their **submerchants** across **multiple payment providers**. At the core of this system is the **Recipient object**, which represents each individual submerchant within the marketplace ecosystem.

* Each **Marketplace Owner** is represented in **Yuno as an Organization**.
* Within an organization, one or more Accounts can be created, each configured with its own set of **Connections** to payment providers (e.g., Stripe, Adyen, dLocal).
* For every account, the marketplace can register one or more **Recipients** — these are the submerchants to be onboarded.
* Each **Recipient** is then linked individually to one or more **Connections**, depending on which payment processors they will use.

This **architecture** enables:

* A single, unified onboarding process.
* Independent status tracking per provider.
* Easy scaling of submerchant operations across providers.

This design ensures flexibility, transparency, and full traceability throughout the onboarding lifecycle. The [/recipients endpoint](ref:create-recipient-1) is used to create and manage each submerchant profile, and to trigger the corresponding provider-specific onboarding workflows.

### Onboarding flows

Yuno supports two **onboarding flows** for submerchants:

1. **Pre-onboarded Accounts**: If the submerchant has already completed the onboarding process with a given provider (e.g., via an external dashboard or platform), the marketplace can provide the corresponding **recipient\_id** at the time of creation. In this case, **no further onboarding is needed**, and the status will immediately be set to **SUCCEEDED**. (`onboardings.type`='PREVIOUSLY\_ONBOARDED')
2. **Dynamic Onboarding**: If no credentials are provided, Yuno will initiate the onboarding process for the selected provider. (`onboardings.type`='ONBOARD\_ONTO\_PROVIDER'). Depending on the provider's requirements, this may involve:
   1. Form submission or redirection to hosted onboarding.
   2. Upload of legal or financial documentation.
   3. KYC/KYB validation steps.

During the onboarding lifecycle, a Recipient may go through several statuses which indicate the current state of the process:

| Status      | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| `CREATED`   | Initial state after creation; onboarding process not yet started.            |
| `PENDING`   | Awaiting provider review after data was submitted.                           |
| `SUCCEEDED` | The recipient is fully onboarded and active.                                 |
| `DECLINED`  | The onboarding was rejected by the provider and cannot be retried.           |
| `BLOCKED`   | The provider has explicitly blocked the onboarding due to compliance issues. |
| `CANCELED`  | The onboarding process was voluntarily canceled before completion.           |
| `REJECTED`  | The onboarding failed due to incorrect data or failed validations.           |
| `ERROR`     | A technical error occurred during the onboarding flow.                       |

These statuses help the marketplace understand the onboarding lifecycle and implement appropriate retry, alert, or fallback mechanisms when required.

This flexibility allows marketplaces to adapt the onboarding process to their operational needs, without sacrificing control or visibility.

### Workflow

The onboarding workflow is a structured process designed to ensure that submerchants are seamlessly integrated into the marketplace ecosystem. It involves several key steps that guide the marketplace owner from initial setup to successful payment processing and split execution.

<Image align="center" src="https://files.readme.io/2e4dec348bf565b0c39fe638b9867d6283f70e1bd66830ceda354f59f01e14d9-onboardings-workflow.png" />

The onboarding workflow follows these key steps:

1. **Marketplace Setup**: The marketplace owner creates an organization in Yuno and sets up accounts with connections to payment providers.

2. **Recipient Registration**: For each submerchant, the marketplace creates a recipient using the [Create Recipients API](ref:create-recipients) endpoint.

3. **Onboarding Process**:
   * **Pre-onboarded**: If the submerchant already has provider credentials, the marketplace provides the `provider_recipient_id` and the status is immediately set to `SUCCEEDED`.
   * **Dynamic Onboarding**: If no credentials exist, Yuno initiates the provider-specific onboarding flow, which may include form submissions, document uploads, or KYC/KYB validations.

4. **Status Tracking**: The recipient goes through various statuses (`CREATED` → `PENDING` → `SUCCEEDED`) as the onboarding progresses.

5. **Payment Processing**: Once recipients are successfully onboarded, the marketplace can create payments with the `split_marketplace` object to distribute funds among the recipients.

6. **Split Execution**: The payment provider processes the split according to the defined distribution, with each recipient receiving their designated share of the transaction.

***

## 2- Payment Split Integration

The `split_marketplace` object defines how a [payment](ref:create-payment) should be split between recipients. It is an array of objects, where each object represents a recipient and their share of the payment.

| Field                   | Type      | Description                                                                                                                                                                                           | Mandatory   | Example Value  |
| :---------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- | :------------- |
| `recipient_id`          | `string`  | The ID of the recipient in the [Yuno system](ref:create-recipients).                                                                                                                                  | Conditional | `rec_test123`  |
| `provider_recipient_id` | `string`  | The recipient ID from the payment provider, if applicable.                                                                                                                                            | Conditional | `prov_rec_abc` |
| **Note:**               |           | Either `recipient_id` or `provider_recipient_id` must be provided. For marketplace owners (`type`='COMMISSION'), `provider_recipient_id` can be optional if not applicable for the specific provider. |             |                |
| `type`\*                | `enum`    | Split type. Could be `PURCHASE`, `PAYMENTFEE`, `VAT`, `COMMISSION`, `MARKETPLACE`, `SHIPPING`.                                                                                                        | Yes         | `PURCHASE`     |
| `merchant_reference`    | `string`  | Identification of the payment transaction. Optional. If not defined, the same value as the main payment's merchant reference will be used for all split transactions. (MAX 255; MIN 3 characters).    | No          | `AAB01-432245` |
| `amount`\*              | `struct`  | Defines the amount of the split.                                                                                                                                                                      | Yes         |                |
|     `value`\*           | `number`  | Amount of the split (e.g., 7500 for 75.00).                                                                                                                                                           | Yes         | `7500`         |
|     `currency`\*        | `enum`    | The currency used to make the payment (ISO 4217, 3 characters).                                                                                                                                       | Yes         | `COP`          |
| `liability`             | `struct`  | Optional information regarding the recipient's liability for fees and chargebacks.                                                                                                                    | No          |                |
|     `processing_fee`    | `enum`    | Indicates who will be charged the transaction fee: `MERCHANT`, `RECIPIENT`, `SHARED`.                                                                                                                 | No          | `MERCHANT`     |
|     `chargebacks`       | `boolean` | If `true`, the recipient is responsible in case of a chargeback.                                                                                                                                      | No          | `false`        |

<br />

```json Example using provider recipients directly
{
  "split_marketplace": [
    {
      "provider_recipient_id": "recipient_123",
      "type": "PURCHASE",
      "amount": {
        "value": 750,
        "currency": "EUR"
      }
    },
    {
      "type": "COMMISSION",
      "amount": {
        "value": 30,
        "currency": "EUR"
      }
    }
  ]
}

```
```json Example using Yuno recipients
{
  "split_marketplace": [
    {
      "recipient_id": "4b31a9b8-4cd2-4e47-93cf-03729241bd68",
      "type": "PURCHASE",
      "amount": {
        "value": 750,
        "currency": "EUR"
      }
    },
    {
      "recipient_id": "9104911d-5df9-429e-8488-ad41abea1a4b",
      "type": "COMMISSION",
      "amount": {
        "value": 30,
        "currency": "EUR"
      }
    }
  ]
}
```

***

## Validations

* The sum of all splits must equal the total payment amount.
* For each split, you must send an object for every participant, and the sum of amounts must equal the total payment amount.
* For scenarios where a direct recipient ID is not required for the marketplace owner (e.g., with Adyen), the `type` field can be used as a flag (e.g., `COMMISSION`) to indicate the marketplace owner's share, and the `provider_recipient_id` will be optional for that specific split.
* Either `recipient_id` or `provider_recipient_id` must be provided for the split, but not both.
* If any required fields are missing or invalid, the request will return an error.
* In case you use more than one payment provider for the split payments, we recommend using the [recipients object](ref:create-recipients), as it lets you define more than one provider for each recipient.

## API endpoints involved

* **[Create Recipients](ref:create-recipients)**: **POST**: `https://api-sandbox.y.uno/v1/recipients`
* **[Create Payment](ref:create-payment)**: **POST**: `https://api-sandbox.y.uno/v1/payments`
* **[Capture Authorization](ref:capture-authorization)**: **POST**: `https://api-sandbox.y.uno/v1/payments/{id}/transactions/{transaction_id}/capture`
* **[Refund Payment](ref:refund-payment)**: **POST**: `https://api-sandbox.y.uno/v1/payments/{id}/transactions/{transaction_id}/refund`
* **[Cancel or Refund a Payment](https://docs.y.uno/reference/cancel-or-refund-a-payment)**: **POST**: `https://api-sandbox.y.uno/v1/payments/{id}/cancel-or-refund`
* **[Cancel or Refund a Payment with transaction](https://docs.y.uno/reference/cancel-or-refund-payment-with-transaction)**: **POST**: `https://api-sandbox.y.uno/v1/payments/{id}/transactions/{transaction_id}/cancel-or-refund`