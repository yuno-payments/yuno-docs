---
title: Create One Time Use Token
excerpt: ''
api:
  file: tokens.json
  operationId: post_tokens
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
> 🚧 This endpoint is for PCI compliant merchants only

Create a one-time-use token from the customer's card data as part of the `DIRECT` workflow.

For `DIRECT` integrations, this endpoint allows PCI-compliant merchants to tokenize card data directly while maintaining security throughout the process — without the need to use Yuno’s SDK. Unlike the regular workflow, which involves creating a checkout_session and using the SDK to generate a one-time-use token, the `DIRECT` flow offers an alternative approach for those who prefer to manage the entire process directly from their backend.

Use the returned token to [create a payment](ref:create-payment) with workflow `DIRECT` by setting `payment_method.type = "CARD"` and `payment_method.token` to the token.