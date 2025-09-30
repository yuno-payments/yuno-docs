---
title: Create One Time Use Token (NEW)
excerpt: ''
api:
  file: tokens.json
  operationId: post_tokens1
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
> ❗️ This endpoint is for PCI compliant merchants only

Create a one-time-use token from the customer's card data as part of the `DIRECT` workflow.

In the regular workflow, you create a `checkout_session`, use Yuno's SDK to generate a one‑time use token, and then use that token to create the payment. For `DIRECT` workflow integrations where you prefer **not** to use the SDK, this endpoint lets PCI merchants tokenize card data directly while maintaining security throughout the process.

Use the returned token to [create a payment](ref:create-payment) with workflow `DIRECT` by setting `payment_method.type = "CARD"` and `payment_method.token` to the token.
