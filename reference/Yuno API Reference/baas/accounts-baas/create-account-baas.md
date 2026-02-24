---
title: Create Account (BaaS)
api:
  file: baa-s.json
  operationId: post_v1-baas-accounts
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: index
---
Create a bank account for an onboarded entity. The onboarding referenced by `onboarding_id` must have `status: SUCCEEDED`.

The response includes region-specific banking identifiers. See [Account identifiers by region](ref:baas#account-identifiers-by-region) for which fields are returned per region.
