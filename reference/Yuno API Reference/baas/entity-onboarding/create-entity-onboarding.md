---
title: Create Entity Onboarding
api:
  file: baa-s.json
  operationId: post_v1-baas-entities-entity-id-onboardings
deprecated: false
hidden: false
link:
  new_tab: false
metadata:
  robots: index
---
Onboard an existing [Entity](ref:create-entity) with a BaaS provider.

## Onboarding types

- **`ONE_STEP`**: Submit all information, compliance declarations, risk assessment, and documents at once. The provider processes immediately.
- **`PREVIOUSLY_ONBOARDED`**: Generate an internal Yuno onboarding ID without contacting the provider. Use when the entity was already onboarded externally.

For `ONE_STEP`, include `compliance_declaration`, `risk_assessment`, `source_of_funds`, and `documentation`. See [Documentation types](ref:baas#documentation-types) for the full list of supported document types.

Monitor progress via [Get Entity Onboarding Status](ref:get-entity-onboarding-status) or webhook events. See [Onboarding statuses](ref:baas#onboarding-statuses) for the full status lifecycle.