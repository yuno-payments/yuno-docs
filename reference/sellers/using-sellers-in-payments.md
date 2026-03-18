---
title: Using Sellers in Payments
description: Guide on referencing sellers in payment requests.
hidden: true
---

Once a seller mapping is registered, you can reference it in payment requests via `additional_data.seller_details`. The system automatically resolves the correct `merchant_id` at payment time based on which provider processes the payment.

## Referencing a Seller

You can reference a seller using either identifier (they are **mutually exclusive** — send one or the other):

| Field | Description |
| :---- | :---- |
| `merchant_seller_id` | The merchant's own identifier (e.g., `"FRANCHISE_STORE_001"`). |
| `seller_id` | The Yuno-generated UUID (e.g., `"f7a1b2c3-d4e5-6789-abcd-ef0123456789"`). |

### Example — Payment using `merchant_seller_id`

```json
{
  "amount": { "currency": "BRL", "value": 10000 },
  "country": "BR",
  "payment_method": {
    "type": "CARD",
    "token": "pm_tok_abc123"
  },
  "additional_data": {
    "seller_details": {
      "merchant_seller_id": "FRANCHISE_STORE_001"
    }
  }
}
```

### Example — Payment with field overrides

When you send additional seller fields alongside the seller reference, those fields **override** the stored seller values for that payment only.

```json
{
  "amount": { "currency": "BRL", "value": 10000 },
  "additional_data": {
    "seller_details": {
      "merchant_seller_id": "FRANCHISE_STORE_001",
      "name": "Store 001 - Campinas",
      "document": {
        "type": "CNPJ",
        "number": "98765432000111"
      }
    }
  }
}
```

## How Resolution Works

1. The merchant sends a payment request with `merchant_seller_id` or `seller_id`.
2. Routing selects a provider (e.g., Cielo).
3. The system looks up the franchise mapping by `(organization, seller_identifier, provider, payment_method_type)`.
4. **If found:** the connection's `merchant_id` is overridden with the resolved `merchant_id`.
5. **If not found:** the payment proceeds with the connection's default `merchant_id` (graceful fallback).

### Backward Compatibility

When neither `seller_id` nor `merchant_seller_id` is present, the entire franchise feature is bypassed — zero impact on existing flows.
