---
title: Accounts
excerpt: Create and manage accounts within groups.
api:
  file: organization-management.json
  operationId: list-all-accounts
deprecated: false
hidden: true
metadata:
  title: Accounts
  description: Manage individual merchant accounts.
  robots: noindex
---
Accounts represent individual merchant entities within your organization groups.

### Create Account
Create a new account under a specific account group.

[api:create-account]

### List All Accounts
List all accounts across all groups.

[api:list-all-accounts]

### List Account Group Accounts
List only the accounts belonging to a specific group.

[api:list-account-group-accounts]

### Get Account
Retrieve details for a specific account.

[api:get-account]

### Update Account
Update the details of an account.

[api:update-account]

### Disable Account
Disable an account. Note that this action is usually preferred over deletion for auditing purposes.

[api:disable-account]
