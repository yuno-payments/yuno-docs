---
title: Get Seller
excerpt: Retrieves a franchise seller mapping by the merchant's own identifier.
api:
  file: sellers-api.json
  operationId: get-seller
hidden: true
---

Retrieves a franchise seller mapping by the merchant's own identifier.

### Example

```shell
curl --request GET \
  --url https://api-sandbox.y.uno/v1/sellers/FRANCHISE_STORE_001 \
  --header 'public-api-key: <YOUR_PUBLIC_API_KEY>' \
  --header 'private-secret-key: <YOUR_PRIVATE_SECRET_KEY>' \
  --header 'X-account-code: 11111111-2222-3333-4444-555555555555'
```
