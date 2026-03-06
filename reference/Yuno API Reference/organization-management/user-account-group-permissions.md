---
title: User Account Group Permissions
excerpt: Manage user access to account groups.
deprecated: false
hidden: true
metadata:
  title: User Account Group Permissions
  description: Assign roles to users for entire groups of accounts.
  robots: noindex
---
When a user has permission on an account group, they gain access to all accounts within that group with the assigned role.

### Replace Account Group Permissions
Replaces all existing account group permissions for a user.

[api:put-v1-organizations-users-user_id-account-group-permissions]

### List Account Group Permissions
Returns all current account group permission assignments for a user.

[api:get-v1-organizations-users-user_id-account-group-permissions]

### Update Account Group Permissions
Partially updates account group permissions.

[api:patch-v1-organizations-users-user_id-account-group-permissions]

### Remove Account Group Permission
Removes a specific account group permission from a user.

[api:delete-v1-organizations-users-user_id-account-group-permissions-account_group_id]
