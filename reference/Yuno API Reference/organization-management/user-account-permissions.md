---
title: User Account Permissions
excerpt: Manage user access to specific accounts.
deprecated: false
hidden: true
metadata:
  title: User Account Permissions
  description: Assign roles to users for individual merchant accounts.
  robots: noindex
---
Manage a user's access to individual accounts. Each assignment pairs an account with a role.

### Replace Account Permissions
Replaces all existing account permissions for a user.

[api:put-v1-organizations-users-user_id-account-permissions]

### List Account Permissions
Returns all current account permission assignments for a user.

[api:get-v1-organizations-users-user_id-account-permissions]

### Update Account Permissions
Partially updates account permissions (adds or updates without removing others).

[api:patch-v1-organizations-users-user_id-account-permissions]

### Remove Account Permission
Removes a specific account permission from a user.

[api:delete-v1-organizations-users-user_id-account-permissions-account_id]
