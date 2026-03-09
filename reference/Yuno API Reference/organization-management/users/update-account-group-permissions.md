---
title: Update Account Group Permissions
excerpt: ''
api:
  file: organization-management.json
  operationId: update-account-group-permissions
deprecated: false
hidden: true
metadata:
  title: ''
  description: >-
    Append or modify specific account group permissions for a user without affecting existing unlisted group access.
  robots: index
next:
  description: ''
---
This request enables you to append new account group permissions or modify existing role assignments for a user. Unlike the replace endpoint, this operation only affects the account groups explicitly listed in the request.

### Validation Rules

- All `account_group_id` values must be valid and belong to your organization.
- Providing an existing `account_group_id` with a new `role_id` will update the role for that group.
