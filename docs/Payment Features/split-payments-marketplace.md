---
title: Split Payments Marketplace
deprecated: false
hidden: false
metadata:
  robots: index
---
This feature allows **merchants to split payments among multiple recipients**, which is particularly useful for marketplace models where transactions need to be divided among different sellers or stakeholders. Merchants can specify how the payment is split, including the amounts, recipients, and any applicable fees.

The split payment functionality depends on the support of the selected payment provider. Yuno acts solely as the orchestrator of the payment, not the processor. Ensure your provider supports split payments before using this functionality.

## Key features

The key features of the split payments marketplace include:

* **Split payments**: Define how the total payment amount is distributed among different recipients.
* **Flexible configuration**: Supports absolute-based splits.
* **Integration with providers**: Splits can be executed by payment providers that support this functionality.
* **Detailed handling of fees**: The system allows for fine-tuning of how transaction fees and chargebacks are managed.

To use this feature, you must **first onboard your recipients** for the payment split, and **then create the payment** specifying the necessary information.

## 1- Onboarding

Yuno's onboarding model is crafted to assist marketplaces in seamlessly connecting and managing their **submerchants** across **multiple payment providers**. Central to this system is the **recipient object**, which represents each individual submerchant within the marketplace ecosystem.

* Each **marketplace owner** is represented in **Yuno as an organization**.
* Within an organization, one or more accounts can be created, each configured with its own set of **connections** to payment providers (e.g., Stripe, Adyen, dLocal).
* For every account, the marketplace can register one or more **recipients** — these are the submerchants to be onboarded.
* Each **recipient** is then linked individually to one or more **connections**, depending on which payment processors they will use.

This **architecture** enables:

* A single, unified onboarding process.
* Independent status tracking per provider.
* Easy scaling of submerchant operations across providers.

This design ensures flexibility, transparency, and full traceability throughout the onboarding lifecycle. The [/recipients endpoint](ref:create-recipient-1) is used to create and manage each submerchant profile and to trigger the corresponding provider-specific onboarding workflows.

### Onboarding flows

Yuno offers two onboarding flows for submerchants, providing flexibility based on the submerchant's current status with payment providers.

1. **Pre-onboarded accounts**: If a submerchant has already completed the onboarding process with a specific provider (e.g., through an external dashboard or platform), the marketplace can supply the corresponding **recipient\_id** during creation. In this scenario, no further onboarding is required, and the status will be immediately set to **SUCCEEDED** (`onboardings.type`=`PREVIOUSLY_ONBOARDED`).

2. **Dynamic onboarding**: If no credentials are provided, Yuno will initiate the onboarding process for the chosen provider (`onboardings.type`=`ONBOARD_ONTO_PROVIDER`). This process may include:
   1. Form submission or redirection to a hosted onboarding page.
   2. Uploading legal or financial documentation.
   3. Completing KYC/KYB validation steps.

Throughout the onboarding lifecycle, a recipient may experience various statuses that reflect the current state of the process:

| Status      | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| `CREATED`   | Initial state after creation; onboarding process not yet started.            |
| `PENDING`   | Awaiting provider review after data submission.                              |
| `SUCCEEDED` | The recipient is fully onboarded and active.                                 |
| `DECLINED`  | The onboarding was rejected by the provider and cannot be retried.           |
| `BLOCKED`   | The provider has explicitly blocked the onboarding due to compliance issues. |
| `CANCELED`  | The onboarding process was voluntarily canceled before completion.           |
| `REJECTED`  | The onboarding failed due to incorrect data or failed validations.           |
| `ERROR`     | A technical error occurred during the onboarding flow.                       |

These statuses assist the marketplace in understanding the onboarding lifecycle and implementing appropriate retry, alert, or fallback mechanisms when necessary.

This flexible approach allows marketplaces to tailor the onboarding process to their operational needs, maintaining control and visibility.

### Workflow

The onboarding workflow follows a structured process that ensures submerchants are properly integrated into the marketplace ecosystem. The diagram below illustrates the complete flow from initial setup to payment processing.

<Image align="center" src="https://files.readme.io/31facc62a78859a26c990685ad3fab72e3a495f88376388ebbe9b52227a5b267-onboardings-workflow.png" />

**Workflow Steps:**

1. **Organization & Account Setup**: The marketplace owner creates an organization in Yuno and configures accounts with payment provider connections.

2. **Recipient Creation**: For each submerchant, the marketplace creates a recipient using the [Create Recipients API](ref:create-recipient-1) endpoint, specifying either:
   * `provider_recipient_id` for pre-onboarded submerchants
   * Provider connection details for new onboarding

3. **Onboarding Execution**:
   * **Pre-onboarded**: Status immediately becomes `SUCCEEDED`
   * **New onboarding**: Yuno initiates provider-specific flow with status progression from `CREATED` → `PENDING` → `SUCCEEDED`

4. **Payment Creation**: Once recipients are successfully onboarded (`SUCCEEDED` status), the marketplace can create payments with the `split_marketplace` object.

5. **Split Processing**: The payment provider executes the split according to the defined distribution, transferring funds to each recipient's designated share.

***

## 2- Payment split integration

In this section, we explore how the `split_marketplace` object is used to divide a [payment](ref:create-payment) among multiple recipients. This object is an array where each entry specifies a recipient and their corresponding share of the payment.

| Field                   | Type      | Description                                                                                                                                                                                | Mandatory   | Example Value  |
| :---------------------- | :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- | :------------- |
| `recipient_id`          | `string`  | The unique identifier for the recipient within the [Yuno system](ref:create-recipients).                                                                                                   | Conditional | `rec_test123`  |
| `provider_recipient_id` | `string`  | The recipient's ID as provided by the payment provider, if applicable.                                                                                                                     | Conditional | `prov_rec_abc` |
| **Note:**               |           | You must provide either `recipient_id` or `provider_recipient_id`. For marketplace owners (`type`=`COMMISSION`), `provider_recipient_id` is optional if not required by the provider.      |             |                |
| `type`\*                | `enum`    | The type of split. Options include `PURCHASE`, `PAYMENTFEE`, `VAT`, `COMMISSION`, `MARKETPLACE`, `SHIPPING`.                                                                               | Yes         | `PURCHASE`     |
| `merchant_reference`    | `string`  | An identifier for the payment transaction. This is optional. If not specified, the main payment's merchant reference will be used for all split transactions. (MAX 255; MIN 3 characters). | No          | `AAB01-432245` |
| `amount`\*              | `struct`  | Specifies the amount for the split.                                                                                                                                                        | Yes         |                |
|     `value`\*           | `number`  | The monetary value of the split (e.g., 7500 for 75.00).                                                                                                                                    | Yes         | `7500`         |
|     `currency`\*        | `enum`    | The currency in which the payment is made (ISO 4217, 3 characters).                                                                                                                        | Yes         | `COP`          |
| `liability`             | `struct`  | Information about the recipient's liability for fees and chargebacks, if applicable.                                                                                                       | No          |                |
|     `processing_fee`    | `enum`    | Specifies who is responsible for the transaction fee: `MERCHANT`, `RECIPIENT`, `SHARED`.                                                                                                   | No          | `MERCHANT`     |
|     `chargebacks`       | `boolean` | Indicates if the recipient is liable for chargebacks (`true` if they are responsible).                                                                                                     | No          | `false`        |

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

In this section, we outline the necessary validations to ensure successful split payments.

* The total of all splits must match the overall payment amount.
* For each split, an object must be sent for every participant, ensuring the sum of amounts equals the total payment amount.
* In scenarios where a direct recipient ID is not needed for the marketplace owner (e.g., with Adyen), the `type` field can serve as a flag (e.g., `COMMISSION`) to denote the marketplace owner's share, making the `provider_recipient_id` optional for that specific split.
* Either `recipient_id` or `provider_recipient_id` must be included for the split, but not both.
* If any required fields are missing or invalid, the request will result in an error.
* If using multiple payment providers for split payments, we recommend utilizing the [recipients object](ref:create-recipients), as it allows defining more than one provider for each recipient.

## API endpoints involved

This section lists the API endpoints involved in managing split payments.

* **[Create recipients](ref:create-recipient-1)**: **POST**: `https://api-sandbox.y.uno/v1/recipients`
* **[Create payment](ref:create-payment)**: **POST**: `https://api-sandbox.y.uno/v1/payments`
* **[Capture authorization](ref:capture-authorization)**: **POST**: `https://api-sandbox.y.uno/v1/payments/{id}/transactions/{transaction_id}/capture`
* **[Refund payment](ref:refund-payment)**: **POST**: `https://api-sandbox.y.uno/v1/payments/{id}/transactions/{transaction_id}/refund`
* **[Cancel or refund a payment](https://docs.y.uno/reference/cancel-or-refund-a-payment)**: **POST**: `https://api-sandbox.y.uno/v1/payments/{id}/cancel-or-refund`
* **[Cancel or refund a payment with transaction](https://docs.y.uno/reference/cancel-or-refund-payment-with-transaction)**: **POST**: `https://api-sandbox.y.uno/v1/payments/{id}/transactions/{transaction_id}/cancel-or-refund`