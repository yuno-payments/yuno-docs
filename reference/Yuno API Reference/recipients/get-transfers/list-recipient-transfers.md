---
title: List Recipient Transfers
api:
  file: openapi.json
  operationId: get_recipients-recipient-id-transfers
deprecated: false
hidden: false
link:
  new_tab: false
metadata:
  robots: index
---
List all recipient transfers using the `recipient_id`.

## Response Format

* Returns an array of `onboardingTransferResponse` objects
* Ordered by `created_at` DESC (most recent first)
* Includes transfers where recipient is either origin or destination
* Empty array `[]` if no transfers found