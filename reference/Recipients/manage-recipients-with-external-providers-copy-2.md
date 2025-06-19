---
title: Manage recipients with external providers (COPY)
deprecated: false
hidden: true
metadata:
  robots: index
---
## Strategic overview

As Yuno expands its orchestration capabilities across multiple global payment platforms, we recognized the need to unify the sub-merchant onboarding experience into a single, streamlined service. This document outlines the development of a **standardized onboarding API** that abstracts the complexities of provider-specific requirements from platforms like Adyen for Platforms, dLocal, Stripe Connect, and MercadoPago Marketplace.

Our goal is to enable Yuno's clients to provide merchant data once, allowing Yuno to seamlessly handle account creation, verification (KYC/KYB), and compliance processes across multiple downstream providers. This unified flow ensures **faster go-live times**, **reduces integration effort**, and allows for **scalable expansion** into new markets and payment rails.

By defining a common merchant data model, implementing adapter services for each provider, and enforcing validation rules based on country and business type, this product development lays the groundwork for a future-proof, flexible onboarding orchestration engine.

## Yuno's core onboarding framework

Yuno's onboarding model helps marketplaces seamlessly connect and manage their **submerchants** across multiple payment providers. The core of this system is the **Recipient object**, which represents each individual submerchant within the marketplace ecosystem. This existing framework will be leveraged by our new standardized API to provide a unified experience.

* Each **Marketplace Owner** is represented in Yuno as an **Organization**.
* Within an organization, you can create one or more **Accounts**, each configured with its own set of **Connections** to various payment providers (e.g., Stripe, MercadoPago, Adyen, dLocal).
* For every account, the marketplace can register one or more **Recipients**—these are your submerchants to be onboarded.
* Each **Recipient** is then individually linked to one or more **Connections**, depending on which payment processors they will use.

This **architecture** offers several key benefits:

* A single, unified onboarding process.
* Independent status tracking per provider.
* Easy scaling of submerchant operations across providers.

This design ensures flexibility, transparency, and full traceability throughout the onboarding lifecycle. The `/recipients` endpoint is used to create and manage each submerchant profile and to trigger the corresponding provider-specific onboarding workflows.

## Onboarding flows

Yuno supports two primary **onboarding flows** for submerchants, managed through the unified API and existing Recipient framework:

1. **Pre-onboarded Accounts**: If a submerchant has already completed the onboarding process with a given provider (e.g., via an external dashboard or platform), the marketplace can provide the corresponding `recipient_id` during creation. In this case, **no further onboarding is needed**, and the status will immediately be set to `SUCCEEDED` (`onboardings.type='PREVIOUSLY_ONBOARDED'`).

2. **Dynamic Onboarding**: If no credentials are provided, Yuno initiates the onboarding process for the selected provider (`onboardings.type='ONBOARD_ONTO_PROVIDER'`). Depending on the provider’s requirements, this may involve:
   * Form submission or redirection to hosted onboarding.
   * Uploading legal or financial documentation.
   * KYC/KYB (Know Your Customer/Know Your Business) validation steps.

## Platform-specific onboarding details

To achieve a truly unified onboarding experience, Yuno's standardized API integrates with the following platforms, each with its unique handling:

| Platform       | Onboarding Type   | Special Handling                             | Integration Mode         | Outcome                                                         |
| :------------- | :---------------- | :------------------------------------------- | :----------------------- | :-------------------------------------------------------------- |
| Adyen          | API/KYC/KYB       | Documents, `accountHolder` creation, payouts | API or Hosted Onboarding | `accountHolderCode` and `accountCode` used for payments/payouts |
| dLocal         | API/KYC           | Payer creation, KYC document upload          | API Only                 | `payer_id` used for identifying merchant in payments/payouts    |
| Stripe Connect | API/OAuth Hybrid  | Person object, external accounts             | API or Hosted Onboarding | `account_id` (e.g., `acct_123`) used for charges and transfers  |
| MercadoPago    | OAuth Marketplace | Requires merchant to authenticate via OAuth  | OAuth Only - Hosted      | Dedicated `access_token` for payment creation                   |

## Detailed Provider Onboarding Steps

Below are the specific steps Yuno orchestrates when onboarding submerchants with various payment providers, depending on their integration modes.

### A - [Adyen](https://docs.adyen.com/platforms/onboard-users/onboarding-steps/?onboarding_type=custom\&hosted_onboarding_page=api\&location=us\&legal_entity=organization#add-payment-methods-to-store)

**Hosted Flow**

1. Create [legal entity](https://docs.adyen.com/api-explorer/legalentity/latest/post/legalEntities)
2. Create a [business line](https://docs.adyen.com/api-explorer/legalentity/latest/post/businessLines) to add info of the industry
3. Create a [store](https://docs.adyen.com/api-explorer/Management/latest/post/stores)
4. Add supported [payment methods](https://docs.adyen.com/platforms/onboard-users/onboarding-steps/?onboarding_type=hosted\&hosted_onboarding_page=api\&location=us\&legal_entity=organization#add-payment-methods-to-store) to the store
   * *After these initial steps, the process often involves a hand-off or additional user interaction:*
5. Create an [account holder](https://docs.adyen.com/api-explorer/balanceplatform/latest/post/accountHolders)
6. Create [balance](https://docs.adyen.com/api-explorer/balanceplatform/latest/post/balanceAccounts)
7. Create an [onboarding payment link](https://docs.adyen.com/platforms/onboard-users/onboarding-steps/?onboarding_type=hosted\&hosted_onboarding_page=api\&location=us\&legal_entity=organization#create-hosted-onboarding-link) and wait for updates

**API Only Flow**

1. Create [legal entity](https://docs.adyen.com/api-explorer/legalentity/latest/post/legalEntities)
2. Associate [entities to the legal entity](https://docs.adyen.com/api-explorer/legalentity/latest/patch/legalEntities/\(id\)#request-entityAssociations)
3. Create [transfer instrument](https://docs.adyen.com/api-explorer/legalentity/latest/post/transferInstruments)
4. Create a [business line](https://docs.adyen.com/api-explorer/legalentity/latest/post/businessLines) to add info of the industry
5. Create a [store](https://docs.adyen.com/api-explorer/Management/latest/post/stores)
6. Add supported [payment methods](https://docs.adyen.com/platforms/onboard-users/onboarding-steps/?onboarding_type=hosted\&hosted_onboarding_page=api\&location=us\&legal_entity=organization#add-payment-methods-to-store) to the store
7. Create an [account holder](https://docs.adyen.com/api-explorer/balanceplatform/latest/post/accountHolders)
8. Create [balance](https://docs.adyen.com/api-explorer/balanceplatform/latest/post/balanceAccounts)
9. Ask for [terms and conditions](https://docs.adyen.com/platforms/onboard-users/onboarding-steps/?onboarding_type=custom\&location=us\&legal_entity=organization#determine-the-terms-of-service)
10. Create an [onboarding payment link](https://docs.adyen.com/platforms/onboard-users/onboarding-steps/?onboarding_type=hosted\&hosted_onboarding_page=api\&location=us\&legal_entity=organization#create-hosted-onboarding-link) and wait for updates

*For Adyen payments with automatic split configuration, refer to:[Adyen Split Payments](https://docs.adyen.com/platforms/automatic-split-configuration/create-split-configuration/)*

### B - [Stripe](https://docs.stripe.com/connect/how-connect-works)

**Hosted Onboarding**

1. Create an [account](https://docs.stripe.com/api/accounts/create)
2. Create an [account link](https://docs.stripe.com/api/account_links)

**API Only Onboarding**

1. Create an [account](https://docs.stripe.com/api/accounts/create)
2. Gather information and [update the account](https://docs.stripe.com/api/accounts/update)

### C - [Dlocal](https://docs.dlocal.com/docs/onboard-user-accounts-platforms)

1. Create an account
2. Get required information and upload documentation
3. Wait for updates. You could also block or unblock an account

*For Dlocal split payments, refer to:[Dlocal Split Struct](https://docs.dlocal.com/docs/split-payments-platforms)*

### D - [MercadoPago](https://www.mercadopago.com.ar/developers/es/docs/split-payments/landing)

1. [OAuth process](https://www.mercadopago.com.ar/developers/es/docs/split-payments/additional-content/security/oauth/introduction) is created to redirect the customer
2. Redirect customer and wait for authorization grant.
3. Get [access\_token](https://www.mercadopago.com.ar/developers/es/docs/security/oauth/creation#bookmark_authorization_code)

### E - [Gr4vy](https://docs.gr4vy.com/guides/features/merchant-accounts/overview)

Gr4vy's approach is more aligned with creating "merchant accounts" via API or dashboard, which are then used for payments. While it supports **split payments** (as indicated by my search and your linked article about "split-tender support"), the core concept is the creation of distinct merchant accounts that can handle their own payments. Yuno's integration would focus on creating and managing these merchant accounts.

### F - [Juspay](https://juspay.io/in/docs/split-settlements/docs/split-settlements/description)

Similar to Gr4vy, Juspay requires the configuration of separate accounts where amounts need to be settled for split orders. Yuno's process for Juspay would involve configuring these merchant and vendor account details.

## Recipient onboarding statuses

During the onboarding lifecycle, a Recipient may go through several statuses that indicate the current state of the process:

| Status                             | Description                                                                  |
| :--------------------------------- | :--------------------------------------------------------------------------- |
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

These statuses help the marketplace understand the onboarding lifecycle and implement appropriate retry, alert, or fallback mechanisms when required. This flexibility allows marketplaces to adapt the onboarding process to their operational needs without sacrificing control or visibility.