---
title: Replace Account Group Permissions
excerpt: ''
api:
  file: organization-management.json
  operationId: replace-account-group-permissions
deprecated: false
hidden: true
metadata:
  title: ''
  description: >-
    Perform a full reset of a user's account group permissions. 
    Existing group-level access not in the request will be removed.
  robots: index
next:
  description: ''
---
This request performs a full reset of a user's account group permissions by replacing the existing set with the one provided in the request body.

> 🚧 Important: Full Replacement
>
> This is a **destructive replacement** operation. Any existing account group permissions not explicitly included in the new array will be permanently removed.

### Validation Rules

- Each `account_group_id` must belong to the authenticated organization.
- Each `role_id` must be a valid, existing role.
- Duplicate account group entries in the same request are rejected.
- Providing an empty array `[]` effectively removes all group-level access for the user.
