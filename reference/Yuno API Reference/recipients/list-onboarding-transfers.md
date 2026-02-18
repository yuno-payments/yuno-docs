---
title: List Onboarding Transfers
api:
  file: openapi.json
  operationId: get_onboardings-onboarding-id-transfers
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: index
---
View all transfers associated with a specific onboarding. Useful to track the complete transfer chain, including reversals.

## Response Format

* Returns an array of `onboardingTransferResponse` objects
* Ordered by `created_at` DESC (most recent first)
* Includes transfers where onboarding is either origin or destination
* Empty array `[]` if no transfers found
