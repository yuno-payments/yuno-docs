---
title: Replace Account Permissions
excerpt: ''
api:
  file: organization-management.json
  operationId: replace-account-permissions
deprecated: false
hidden: true
metadata:
  title: ''
  description: >-
    Perform a full reset of a user's account-level permissions. 
    Existing permissions not in the request will be removed.
  robots: index
next:
  description: ''
---
This request performs a full reset of a user's account-level permissions by replacing the existing set with the one provided in the request body.

> 🚧 Important: Full Replacement
>
> This is a **destructive replacement** operation. Any existing account permissions not explicitly included in the new array will be permanently removed.

### Validation Rules

- Each `account_id` must belong to the authenticated organization.
- Each `role_id` must be a valid, existing role.
- Duplicate account entries in the same request are rejected.
- Providing an empty array `[]` effectively removes all account permissions.
