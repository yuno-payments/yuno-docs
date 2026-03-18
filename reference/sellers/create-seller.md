---
title: Create Seller
excerpt: Creates a new franchise seller mapping with per-provider merchant credentials.
api:
  file: sellers-api.json
  operationId: create-seller
hidden: true
---

Creates a new franchise seller mapping.

### Example — Seller with card provider

```shell
curl --request POST \
  --url https://api-sandbox.y.uno/v1/sellers \
  --header 'public-api-key: <YOUR_PUBLIC_API_KEY>' \
  --header 'private-secret-key: <YOUR_PRIVATE_SECRET_KEY>' \
  --header 'X-account-code: 11111111-2222-3333-4444-555555555555' \
  --header 'Content-Type: application/json' \
  --data '{
    "account_code": "11111111-2222-3333-4444-555555555555",
    "merchant_seller_id": "FRANCHISE_STORE_001",
    "name": "Franchise Store São Paulo",
    "email": "store001@franchise.com",
    "phone": { "country_code": "55", "number": "11999999999" },
    "document": { "type": "CNPJ", "number": "12345678000199" },
    "address": {
      "street": "Av Paulista",
      "number": "1000",
      "city": "São Paulo",
      "state": "SP",
      "country": "BR",
      "zip_code": "01310-100"
    },
    "country": "BR",
    "merchant_category_code": "5812",
    "payment_method": [
      {
        "payment_method_type": "CARD",
        "detail": {
          "card": {
            "provider": {
              "id": "CIELO",
              "merchant_id": "CIELO_CC_12345"
            }
          }
        }
      }
    ]
  }'
```
