---
title: Create Standalone Transfer
type: reference
api:
  file: split-marketplace-transfers.json
  operationId: create-standalone-transfer
hidden: false
---

Create a forward transfer to distribute funds from your organization balance to your recipients independently of a payment.

### Recipient Validation

Before processing any transfer, we validate the recipient's connection with the payment provider. Ensure your recipient has an `ACTIVE` status and At least one `PENDING` or `SUCCEEDED` onboarding matching the `provider_id`.

