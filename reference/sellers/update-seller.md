---
title: Update Seller
excerpt: Fully replaces the seller details and payment method configurations for a given seller.
api:
  file: sellers-api.json
  operationId: update-seller
hidden: true
---

Fully replaces the seller details and payment method configurations for a given seller.

**Important:** This is a full replacement operation. All fields you want to keep must be included. Omitted optional fields will be set to `null`. Existing `payment_method` entries not included in the request are soft-deleted; new entries are created.

### Example

```shell
curl --request PUT \
  --url https://api-sandbox.y.uno/v1/sellers/FRANCHISE_STORE_001 \
  --header 'public-api-key: <YOUR_PUBLIC_API_KEY>' \
  --header 'private-secret-key: <YOUR_PRIVATE_SECRET_KEY>' \
  --header 'X-account-code: 11111111-2222-3333-4444-555555555555' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Franchise Store São Paulo - Updated",
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
              "merchant_id": "CIELO_CC_99999"
            }
          }
        }
      }
    ]
  }'
```
