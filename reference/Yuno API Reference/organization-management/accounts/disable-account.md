---
title: Disable Account
excerpt: ''
api:
  file: organization-management.json
  operationId: disable-account
deprecated: false
hidden: true
metadata:
  title: ''
  description: >-
    Permanently disable a merchant account to prevent further transaction processing.
  robots: index
next:
  description: ''
---
This request permanently disables a merchant account to prevent further transaction processing.

### Endpoint
`DELETE /v1/organizations/accounts/{account_id}`

> 🚧 Important
>
> Disabling an account is a terminal operation. Once disabled, the account can no longer be used to process payments.
