---
title: Manage recipients with external providers
deprecated: false
hidden: true
metadata:
  robots: index
---
## Introduction

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