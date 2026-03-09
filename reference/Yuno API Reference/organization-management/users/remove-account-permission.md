---
title: Remove Account Permission
excerpt: ''
api:
  file: organization-management.json
  operationId: remove-account-permission
deprecated: false
hidden: true
metadata:
  title: ''
  description: >-
    Revoke a user's access to a specific account by removing the associated permission.
  robots: index
next:
  description: ''
---
Revoke a user's access to a specific account by removing the associated permission assignment. The account to be removed is identified by the `account_id` in the request path.

### Endpoint
`DELETE /v1/organizations/users/{user_id}/account-permissions/{account_id}`
