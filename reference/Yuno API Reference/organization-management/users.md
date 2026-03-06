---
title: Users
excerpt: Create and manage organization users.
api:
  file: organization-management.json
  operationId: list-users
deprecated: false
hidden: true
metadata:
  title: Users
  description: Manage staff members and their basic profiles.
  robots: noindex
---
Users are staff members of your organization. When creating a user, you must assign at least one permission (either to an account or an account group).

### Create User
Create a new user in the system. Note that this only creates the user in the Yuno database; it does not handle external Auth0/WorkOS provisioning.

[api:create-user]

### List Users
Retrieve a list of users, with optional filtering by account group or account.

[api:list-users]

### Get User
Retrieve details for a specific user.

[api:get-user]

### Update User
Update a user's name.

[api:update-user]

### Delete User
Permanently delete a user and all their associated permissions.

[api:delete-user]
