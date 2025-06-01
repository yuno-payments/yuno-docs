---
title: Create One Time Use Token
excerpt: ''
api:
  file: tokens.json
  operationId: create-onte-time-use-token
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

This request creates a one-time use token using the credit card information from the customer. 

In a regular workflow, the merchant needs to create a `checkout_session`, use Yuno's SDK to generate a one-time use token, and then use that token to create the payment. This endpoint is designed for merchants with complex integrations who cannot use Yuno's SDK but still want to leverage Yuno's tokenization service to ensure security throughout the payment process.

In order to create the payment using this endpoint, you will need to create the one time use token and then use it to [create the payment ](ref:create-payment)directly with workflow `DIRECT`.

```json Example
[...]
"workflow": "DIRECT",
    "payment_method": {
        "type": "CARD",
        "token": "73378020-49ab-4c18-b340-70afa2cfd462"
    }
[...]
```
