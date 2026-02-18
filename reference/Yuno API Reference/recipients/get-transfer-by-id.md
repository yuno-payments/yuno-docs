---
title: Get Transfer by ID
api:
  file: openapi.json
  operationId: get_transfers-transfer-id
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: index
---
Retrieve a single transfer using its `transfer_id`.

## Response Fields

| Field                    | Type      | Description                                                                 |
| ------------------------ | --------- | --------------------------------------------------------------------------- |
| `id`                     | UUID      | Transfer unique identifier                                                  |
| `origin_onboarding`      | object    | Complete onboarding that was transferred (includes recipient details)       |
| `destination_onboarding` | object    | Complete onboarding that received the transfer (includes recipient details) |
| `created_at`             | timestamp | When the transfer was created                                               |
| `updated_at`             | timestamp | When the transfer was last updated                                          |

<br />
