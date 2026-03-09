---
title: Create Account
excerpt: ''
api:
  file: organization-management.json
  operationId: create-account
deprecated: false
hidden: true
metadata:
  title: ''
  description: >-
    This request creates a new merchant account within an existing Account Group. 
    Each account serves as a distinct payment environment with its own configuration.
  robots: index
next:
  description: ''
---
This request creates a new merchant account within an existing Account Group, as specified by the group ID in the request path. Each account serves as a distinct payment environment with its own specific configuration.

> 📘 Note
>
> Accounts inherit the organizational context of their parent Account Group.
