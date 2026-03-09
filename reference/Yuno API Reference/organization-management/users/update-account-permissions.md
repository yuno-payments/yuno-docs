---
title: Update Account Permissions
excerpt: ''
api:
  file: organization-management.json
  operationId: update-account-permissions
deprecated: false
hidden: true
metadata:
  title: ''
  description: >-
    Append or modify specific account permissions for a user without affecting existing unlisted assignments.
  robots: index
next:
  description: ''
---
This request enables you to append new account permissions or modify existing role assignments for a user. Unlike the replace endpoint, this operation only affects the accounts explicitly listed in the request.

### Validation Rules

- All `account_id` values must be valid and accessible within your organization.
- Providing an existing `account_id` with a new `role_id` will update the role for that specific account.
