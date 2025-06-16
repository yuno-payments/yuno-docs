---
title: Manage recipients with external providers
deprecated: false
hidden: true
metadata:
  robots: index
---
Yuno’s onboarding model is designed to help marketplaces seamlessly connect and manage their **submerchants** across **multiple payment providers**. At the core of this system is the **Recipient object**, which represents each individual submerchant within the marketplace ecosystem.\
•	Each **Marketplace Owner** is represented in **Yuno as an Organization**.
•	Within an organization, one or more Accounts can be created, each configured with its own set of **Connections** to payment providers (e.g., Stripe, MercadoPago, Adyen, dLocal).
•	For every account, the marketplace can register one or more **Recipients** — these are the submerchants to be onboarded.
•	Each **Recipient** is then linked individually to one or more **Connections**, depending on which payment processors they will use.

This **architecture** enables:\
•	A single, unified onboarding process.
•	Independent status tracking per provider.
•	Easy scaling of submerchant operations across providers.

This design ensures flexibility, transparency, and full traceability throughout the onboarding lifecycle. The /recipients endpoint is used to create and manage each submerchant profile, and to trigger the corresponding provider-specific onboarding workflows.

Yuno supports two **onboarding flows** for submerchants:

1. **Pre-created Accounts**: If the submerchant is already registered with a provider (e.g., via a dashboard or external flow), Yuno can link that existing account using the appropriate identifiers (e.g., account IDs or credentials).
2. **Dynamic Onboarding** : Yuno can initiate the full onboarding process with the provider directly. Depending on the provider, this may involve:\
   •	Collecting and validating additional KYC/KYB documentation.
   •	Redirecting the submerchant to an external hosted onboarding URL (e.g., Stripe or Adyen onboarding pages).
   •	Handling real-time validation and retries as requirements change.

This flexibility allows marketplaces to adapt the onboarding process to their operational needs, without sacrificing control or visibility.