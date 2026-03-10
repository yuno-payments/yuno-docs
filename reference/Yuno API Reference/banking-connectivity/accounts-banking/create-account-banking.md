---
title: Create Account (Banking Connectivity)
api:
  file: banking-connectivity.json
  operationId: post_v1-banking-connectivity-accounts
deprecated: false
hidden: false
link:
  new_tab: false
metadata:
  robots: index
---
Create a bank account for an onboarded entity. The onboarding referenced by `onboarding_id` must have `status: SUCCEEDED`.

The response includes region-specific banking identifiers. See [Account identifiers by region](ref:banking_connectivity#account-identifiers-by-region) for which fields are returned per region.