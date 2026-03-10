---
title: Banking Connectivity
deprecated: false
hidden: false
metadata:
  robots: index
---
Yuno Banking Connectivity provides a unified API to create bank accounts, process transfers, and manage entity onboarding across multiple banking providers. A single integration gives you access to providers across the US, UK, Australia, and EU.

## Integration flow

Follow these steps to go from entity creation to fund transfers:

1. **Create an entity**: Register an individual or business using [Create Entity](ref:create-entity).
2. **Onboard the entity**: Submit KYC/KYB documentation through [Create Entity Onboarding](ref:create-entity-onboarding).
3. **Wait for onboarding approval**: Monitor the onboarding status via [Get Entity Onboarding Status](ref:get-entity-onboarding-status) or listen for webhook events.
4. **Create a bank account**: Once onboarding succeeds, open an account with [Create Account](ref:create-account-banking).
5. **Initiate transfers**: Send funds using [Initiate Entity Transfer](ref:initiate-entity-transfer).

## Entity types

The `national_entity` field determines the entity structure:

| Value        | Description                | Required detail                                                                  |
| ------------ | -------------------------- | -------------------------------------------------------------------------------- |
| `INDIVIDUAL` | A natural person           | `entity_detail.individual` with name, DOB, tax info, and identity document       |
| `ENTITY`     | A business or organization | `entity_detail.entity` with business name, type, tax info, and beneficial owners |

## Onboarding types

| Type                   | Behavior                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `ONE_STEP`             | Submits all information, compliance declarations, risk assessment, and documents at once. The provider processes immediately.        |
| `PREVIOUSLY_ONBOARDED` | Generates an internal Yuno onboarding ID without contacting the provider. Use when the entity has already been onboarded externally. |

## Onboarding statuses

| Status                             | Description                                    | Terminal |
| ---------------------------------- | ---------------------------------------------- | -------- |
| `CREATED`                          | Onboarding record created                      | No       |
| `PENDING`                          | Submitted to provider, awaiting review         | No       |
| `PENDING_ADDITIONAL_DOCUMENTATION` | Provider requires more documents               | No       |
| `UNDER_REVIEW`                     | Provider is reviewing the submission           | No       |
| `SUCCEEDED`                        | Onboarding approved: entity can open accounts | Yes      |
| `FAILED`                           | Onboarding failed due to errors                | Yes      |
| `DECLINED`                         | Provider declined the entity                   | Yes      |
| `CANCELLED`                        | Onboarding cancelled by merchant               | Yes      |
| `EXPIRED`                          | Onboarding expired before completion           | Yes      |

## Transfer statuses

| Status       | Description                                        | Terminal |
| ------------ | -------------------------------------------------- | -------- |
| `PENDING`    | Transfer created, awaiting processing              | No       |
| `PROCESSING` | Transfer submitted to the payment network          | No       |
| `COMPLETED`  | Funds successfully delivered                       | Yes      |
| `FAILED`     | Transfer failed                                    | Yes      |
| `CANCELLED`  | Transfer cancelled before processing               | Yes      |
| `REVERSED`   | Completed transfer was reversed (e.g., ACH return) | Yes      |

> **Note:** Instant payment rails (RTP, FPS, NPP) skip the `PROCESSING` state and go directly from `PENDING` to `COMPLETED` or `FAILED`.

## Payment rails

Available payment rails depend on the provider's region:

| Region        | Rail           | Speed                 |
| ------------- | -------------- | --------------------- |
| **US**        | `ACH_STANDARD` | 1–3 business days     |
| **US**        | `ACH_SAME_DAY` | Same day              |
| **US**        | `WIRE`         | Same day              |
| **US**        | `RTP`          | Instant               |
| **UK**        | `FPS`          | Near-instant          |
| **UK**        | `CHAPS`        | Same day (high value) |
| **UK**        | `BACS`         | 3 business days       |
| **Australia** | `NPP`          | Near-instant          |
| **Australia** | `PAYTO`        | Near-instant          |
| **Australia** | `BPAY`         | 1–2 business days     |

## Account identifiers by region

Responses from [Create Account](ref:create-account-banking) include region-specific banking identifiers:

| Region    | Fields returned                       |
| --------- | ------------------------------------- |
| US        | `account_number`, `routing_number`    |
| UK        | `account_number`, `sort_code`, `iban` |
| Australia | `account_number`, `bsb`               |
| EU        | `iban`, `swift`                       |

## Documentation types

When creating or updating an onboarding, the `documentation` array accepts items with a `type` discriminator. Populate the matching sub-object for each type:

| Type                     | Sub-object               | Description                                                                                                         |
| ------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `IDENTITY_DOCUMENT`      | `identity_document`      | Passport, driver's license, national ID, or state ID with front/back images                                         |
| `PROOF_OF_ADDRESS`       | `proof_of_address`       | Utility bill, bank statement, lease, mortgage, or tax document                                                      |
| `BANK_STATEMENT`         | `bank_statement`         | Bank statement with period and account details                                                                      |
| `BUSINESS_DOCUMENT`      | `business_document`      | Articles of incorporation, business license, EIN confirmation, operating agreement, or certificate of good standing |
| `TAX_INFORMATION`        | `tax_information`        | W9, 1099, tax return, SSN card, ITIN letter, EIN confirmation, or VAT certificate                                   |
| `FINANCIAL_DOCUMENT`     | `financial_document`     | Balance sheet, P&L statement, cash flow statement, or financial audit                                               |
| `BIOMETRIC_VERIFICATION` | `biometric_verification` | Facial recognition, fingerprint, voice, or iris scan with liveness check                                            |
| `EMPLOYMENT_INFORMATION` | `employment_information` | Employment status, employer details, occupation, and income                                                         |

All file uploads use base64 encoding with `file_name`, `content_type`, and `content` fields.

## Webhook events

Yuno sends webhook notifications to your configured endpoint for the following events. For general webhook setup, delivery behavior, and retry logic, see [Webhooks Overview](doc:webhooks#banking_connectivity-webhook-events).

### Entity events

* `banking.entity.created`: Entity created
* `banking.entity.updated`: Entity updated
* `banking.entity.deleted`: Entity deleted

### Onboarding events

* `banking.onboarding.created`: Onboarding created
* `banking.onboarding.pending`: Submitted, awaiting review
* `banking.onboarding.pending_additional_documentation`: More documents required
* `banking.onboarding.succeeded`: Onboarding approved
* `banking.onboarding.failed`: Onboarding failed
* `banking.onboarding.declined`: Provider declined
* `banking.onboarding.cancelled`: Merchant cancelled
* `banking.onboarding.expired`: Onboarding expired

### Account events

* `banking.account.created`: Account created
* `banking.account.updated`: Account updated
* `banking.account.activated`: Account activated
* `banking.account.closed`: Account closed

### Transfer events (outgoing)

* `banking.transfer.pending`: Transfer pending
* `banking.transfer.processing`: Transfer processing
* `banking.transfer.completed`: Transfer completed
* `banking.transfer.failed`: Transfer failed
* `banking.transfer.cancelled`: Transfer cancelled
* `banking.transfer.reversed`: Transfer reversed

### Transfer events (incoming)

* `banking.transfer.incoming.pending`: Incoming transfer pending settlement
* `banking.transfer.incoming.completed`: Incoming transfer settled

Incoming transfer notifications are sent to your endpoint at `{merchant_base_URL}/v1/banking/transfers`. See [Webhook Notifications](ref:webhook-notifications-banking) for the payload structure.

## Error codes

| Code                   | HTTP Status | Description                                          |
| ---------------------- | ----------- | ---------------------------------------------------- |
| `NOT_AUTHENTICATED`    | 401         | Missing or invalid API keys                          |
| `AuthenticationFail`   | 401         | Authentication failed                                |
| `BadRequest`           | 400         | Malformed request                                    |
| `VALIDATION_ERROR`     | 400         | Request validation failed                            |
| `DUPLICATE_ENTITY`     | 409         | Entity with this `merchant_entity_id` already exists |
| `ENTITY_NOT_FOUND`     | 404         | Entity not found                                     |
| `ONBOARDING_NOT_FOUND` | 404         | Onboarding not found                                 |
| `ACCOUNT_NOT_FOUND`    | 404         | Account not found                                    |
| `INSUFFICIENT_BALANCE` | 422         | Insufficient funds for transfer                      |
| `CURRENCY_MISMATCH`    | 422         | Transfer currency does not match account currency    |
| `PROVIDER_ERROR`       | 502         | Error from the banking provider                      |
| `PROVIDER_TIMEOUT`     | 504         | Provider did not respond in time                     |
| `InternalError`        | 500         | Internal server error                                |
| `TooManyRequests`      | 429         | Rate limit exceeded                                  |

Error responses follow this format:

```json
{
  "code": "ERROR_CODE",
  "messages": ["Human-readable error message"],
  "http_code": 400
}
```
