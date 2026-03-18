---
title: Delete Seller
excerpt: Soft-deletes a franchise seller mapping and all associated payment method data.
api:
  file: sellers-api.json
  operationId: delete-seller
hidden: true
---

Soft-deletes a franchise seller mapping and all associated payment method data.

**Important:** This action cannot be undone. Already-processed payments are unaffected. Future payments referencing this seller will fall back to the connection's default `merchant_id`.

### Example

```shell
curl --request DELETE \
  --url https://api-sandbox.y.uno/v1/sellers/FRANCHISE_STORE_001 \
  --header 'public-api-key: <YOUR_PUBLIC_API_KEY>' \
  --header 'private-secret-key: <YOUR_PRIVATE_SECRET_KEY>' \
  --header 'X-account-code: 11111111-2222-3333-4444-555555555555'
```
