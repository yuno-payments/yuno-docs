---
title: Copy of Continue Onboarding
api:
  file: openapi.json
  operationId: continue-onboarding-1
deprecated: false
hidden: false
link:
  new_tab: false
metadata:
  robots: index
---

This endpoint continues the onboarding process for a recipient, specifically executing the KYC (Know Your Customer) step in two-step onboarding flows. Use this when you need to complete KYC validation after account creation has been completed via [Create Onboarding](ref:create-onboarding).

## Prerequisites

This endpoint requires a prior [Create Onboarding](ref:create-onboarding) call with `type: "TWO_STEP_ONBOARDING"` where the account creation step has been completed successfully. This is the second step in [two-step onboarding flows](ref:create-onboarding) for the [split payments marketplace](https://docs.y.uno/docs/split-payments-marketplace#/).

The continue process supports two workflow types:

- **HOSTED_BY_PROVIDER**: Returns a Yuno redirect URL that logs activity and redirects to the provider's KYC interface. Use `workflow: "HOSTED_BY_PROVIDER"`.
- **DIRECT**: Processes KYC validation directly without external redirects. Use `workflow: "DIRECT"`.