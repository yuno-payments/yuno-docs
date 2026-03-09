---
title: Remove Account Group Permission
excerpt: ''
api:
  file: organization-management.json
  operationId: remove-account-group-permission
deprecated: false
hidden: true
metadata:
  title: ''
  description: >-
    Revoke a user's access to a specific account group by removing the associated permission.
  robots: index
next:
  description: ''
---
Revoke a user's access to a specific account group by removing the associated permission assignment. The group to be removed is identified by the `account_group_id` in the request path.

### Endpoint
`DELETE /v1/organizations/users/{user_id}/account-group-permissions/{account_group_id}`
