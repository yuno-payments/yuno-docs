---
title: Create Entity Onboarding
api:
  file: baa-s.json
  operationId: post_v1-baas-entities-entity-id-onboardings
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: index
---
Onboard an existing [Entity](doc:create-entity) .

## Onboarding Types

`ONE_STEP`: Submit all information, compliance declarations, risk assessment, and documents at once. Provider processes immediately.

`PREVIOUSLY_ONBOARDED`: Don't go to the provider, only generate the `id` internally at Yuno.
