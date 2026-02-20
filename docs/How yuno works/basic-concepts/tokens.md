---
title: Tokens
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Tokens
  description: >-
    Yuno's SDK enables secure payment method data capture on your site or app,
    transforming it into a string-based payment method token. This token
    encompasses sensitive payment credentials and customer data, gathered via
    direct communication with Yuno's PCI-L1 tokenization service.
  robots: index
next:
  description: ''
---
Yuno provides a fully managed, PCI DSS Level 1 tokenization service. When a customer provides their payment details, Yuno replaces the sensitive data with a token — a non-sensitive string that represents the original credentials. Your systems only ever store and transmit tokens, never raw card data.

This approach reduces your PCI compliance scope significantly: instead of a full audit, most merchants using Yuno's SDK only need to complete a short self-assessment questionnaire (SAQ A). For more details, see [PCI Compliance](doc:pci-compliance).

## Yuno tokenization coverage

Yuno's tokenization platform is not limited to cards. Tokens are issued for any payment method flowing through Yuno, including:

* **Credit and debit cards**
* **Digital wallets** such as Apple Pay, Google Pay, and Click to Pay
* **Bank transfers and local payment methods** including ACH, PIX, and regional alternatives
* **Alternative payment methods** for buy-now-pay-later, vouchers, and more

Regardless of payment method, the token abstraction is consistent: your integration stores a single identifier and passes it to Yuno at payment time.

## Token types

Yuno issues three types of tokens, each suited to a different integration scenario.

### One-time use token

When using Yuno's SDK, all necessary payment information is gathered and stored in a one-time use token scoped to a single [checkout session](doc:sessions). This token is used once when creating the payment and cannot be reused.

One-time tokens are the right choice for:

* Guest checkouts with no stored payment method
* Single-use transactions where vaulting is not required

> 📘 Vault on success
>
> Set `vault_on_success: true` in the token request to automatically enroll and vault the payment method if the payment succeeds. This converts a one-time token into a persistent vaulted token without a separate enrollment step.

### Vaulted token

A vaulted token is created when a payment method is [enrolled](doc:enroll-payment-methods) and securely stored in Yuno's centralized vault alongside the customer's information. You can use the vaulted token to authorize future payments without the customer re-entering their details.

Vaulted tokens are the right choice for:

* Returning customers with saved payment methods
* Subscriptions and recurring billing
* One-click checkout flows

Vaulted tokens persist until the customer unenrolls the payment method or the token is explicitly removed. Because they live in a centralized vault, vaulted tokens work across all processors connected to your Yuno account — no re-tokenization needed when switching or adding providers.

### Network token

A network token is a digitized representation of a card's Primary Account Number (PAN), issued directly by card networks such as Visa, Mastercard, or American Express. When network tokenization is enabled, Yuno automatically provisions and manages network tokens for all enrolled cards and substitutes them for the actual card data during authorization.

Network tokens are the right choice for:

* High-value recurring transactions where maximizing authorization rates matters
* Scenarios requiring enhanced fraud protection at the network level

Unlike vaulted tokens, network tokens are managed by the card network and **automatically updated** when a card is renewed or reissued — reducing involuntary declines without any action required from the merchant or cardholder.

> 📘 Learn more
>
> For a full overview of network tokens, lifecycle statuses, and integration options, see [Network Tokens](doc:network-tokens).

## Token comparison

|                         | One-time use token              | Vaulted token                      | Network token                                  |
| :---------------------- | :------------------------------ | :--------------------------------- | :--------------------------------------------- |
| **Created by**          | Yuno SDK, per checkout session  | Yuno on enrollment                 | Card networks (Visa, Mastercard, Amex)         |
| **Validity**            | Single transaction              | Persistent until unenrolled        | Auto-renewed by card network                   |
| **Use case**            | Guest checkout, single payments | Returning customers, subscriptions | Recurring payments, higher authorization rates |
| **Cross-processor**     | No                              | Yes                                | Yes                                            |
| **Requires enrollment** | No                              | Yes                                | Yes (applied automatically to enrolled cards)  |

## Additional tokenization capabilities

### Card fingerprinting

Every card enrolled through Yuno receives a `fingerprint` — a stable, cryptographic identifier derived from the PAN. Fingerprints remain consistent across multiple enrollments of the same card, allowing you to detect duplicates and deduplicate your vault without ever accessing or storing raw card numbers. See [Card Fingerprint](doc:fingerprint).

### Automatic card updates

Yuno's Card Account Updater automatically refreshes vaulted cards when issuers update card numbers or expiration dates. This keeps your vault current without any cardholder action, reducing declines caused by outdated card data. See [Card Account Updater](doc:card-account-updater).

### Token migration

If you are moving to Yuno from another provider, Yuno supports importing your existing tokenized cards directly into the Yuno vault. Your customers keep their saved payment methods, and you keep their full history — no re-enrollment required. See [Token Migration Process](doc:token-migration-process).

Yuno also supports exporting tokens if you ever need to move your vault data to another provider. See [Exporting Tokens from Yuno](doc:exporting-tokens-from-yuno).
