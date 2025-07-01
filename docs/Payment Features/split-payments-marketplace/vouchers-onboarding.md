---
title: Vouchers Onboarding
deprecated: false
hidden: false
metadata:
  robots: index
---
As mentioned before, this feature allows **merchants to split payments among multiple recipients**, which is particularly useful for marketplace models where transactions need to be divided among different sellers or stakeholders. Merchants can specify how the payment is split, including the amounts, recipients, and any applicable fees.

Particularly for Brazil, merchants can accept **meal vouchers** as payment methods. “Voucher” is the name given to benefit cards that companies provide to their employees. They must be used to purchase specific products, such as groceries (meal allowance) and meals (restaurant allowance), in other words, the well-known meal and food vouchers.

In case you work as a marketplace and want your submerchants (recipients) to accept meal vouchers as well, you'll need to setup you provider connections in the Yuno dashboard and an onboarding needs to be made for each recipient and provider supported:

| Fields required      | Alelo                            | Edenred | Pluxee        | VR     |
| :------------------- | :------------------------------- | :------ | :------------ | :----- |
| For Onboarding       | `cnpj`, `merchant_category_code` | `cnpj`  | `cnpj`        | `cnpj` |
| For payment creation | `cnpj`, `merchant_category_code` | `mid`   | `id_filiacao` | `mid`  |

These onboardings can be done by the marketplace owner outside Yuno, or Yuno can perform those onboardings.

**A- Pre-onboarded accounts**: If a submerchant has already completed the onboarding process with a specific provider (e.g., through an external dashboard or platform), the marketplace can supply the corresponding recipient\_id during creation. In this scenario, no further onboarding is required, and the status will be immediately set to SUCCEEDED (onboardings.type=PREVIOUSLY\_ONBOARDED).

```json Request
{
  "document": {
    "document_number": "1093333333",
    "document_type": "CNPJ"
  },
  "merchant_category_code":"1234",
  "onboardings": [
    {
      "type": "PREVIOUSLY_ONBOARDED",
      "workflow": "DIRECT",
      "provider": {
        "id": "ALELO",
        "recipient_id":"[CNPJ]"
      }
    },
    {
      "type": "PREVIOUSLY_ONBOARDED",
      "workflow": "DIRECT",
      "provider": {
        "id": "EDENRED",
        "recipient_id":"[MID]"
      }
    },
    {
      "type": "PREVIOUSLY_ONBOARDED",
      "workflow": "DIRECT",
      "provider": {
        "id": "PLUXEE",
        "recipient_id":"[ID_FILIACAO]"
      }
    },
    {
      "type": "PREVIOUSLY_ONBOARDED",
      "workflow": "DIRECT",
      "provider": {
        "id": "VR",
        "recipient_id":"[MID]"
      }
    }
  ]
}
```
```json Response
{
  "account_id": "9104911d-5df9-429e-8488-ad41abea1a4b",
  "document": {
    "document_number": "1093333333",
    "document_type": "CNPJ"
  },
  "merchant_category_code":"1234",
  "onboardings": [
    {
      "type": "PREVIOUSLY_ONBOARDED",
      "workflow": "DIRECT",
      "status":"SUCCEEDED",
      "provider": {
        "id": "ALELO",
        "recipient_id":"[CNPJ]"
      }
    },
    {
      "type": "PREVIOUSLY_ONBOARDED",
      "workflow": "DIRECT",
			"status":"SUCCEEDED",
      "provider": {
        "id": "EDENRED",
        "recipient_id":"[MID]"
      }
    },
    {
      "type": "PREVIOUSLY_ONBOARDED",
      "workflow": "DIRECT",
			"status":"SUCCEEDED",
      "provider": {
        "id": "PLUXEE",
        "recipient_id":"[ID_FILIACAO]"
      }
    },
    {
      "type": "PREVIOUSLY_ONBOARDED",
      "workflow": "DIRECT",
			"status":"SUCCEEDED",
      "provider": {
        "id": "VR",
        "recipient_id":"[MID]"
      }
    }
  ],
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**B- Dynamic onboarding**: If no credentials are provided, Yuno will initiate the onboarding process for the chosen provider (onboardings.type=ONBOARD\_ONTO\_PROVIDER):

```json Request
{
  "document": {
    "document_number": "1093333333",
    "document_type": "CNPJ"
  },
  "merchant_category_code":"1234",
  "onboardings": [
    {
      "type": "ONBOARD_ONTO_PROVIDER",
      "workflow": "DIRECT",
      "provider": {
        "id": "ALELO"
      }
    },
    {
      "type": "ONBOARD_ONTO_PROVIDER",
      "workflow": "DIRECT",
      "provider": {
        "id": "EDENRED"
      }
    },
    {
      "type": "ONBOARD_ONTO_PROVIDER",
      "workflow": "DIRECT",
      "provider": {
        "id": "PLUXEE"
      }
    },
    {
      "type": "ONBOARD_ONTO_PROVIDER",
      "workflow": "DIRECT",
      "provider": {
        "id": "VR"
      }
    }
  ]
}
```
```json Response
{
  "account_id": "9104911d-5df9-429e-8488-ad41abea1a4b",
  "document": {
    "document_number": "1093333333",
    "document_type": "CNPJ"
  },
  "merchant_category_code":"1234",
  "onboardings": [
    {
      "type": "ONBOARD_ONTO_PROVIDER",
      "workflow": "DIRECT",
      "status":"SUCCEEDED",
      "provider": {
        "id": "ALELO",
        "recipient_id":"[CNPJ]"
      }
    },
    {
      "type": "ONBOARD_ONTO_PROVIDER",
      "workflow": "DIRECT",
			"status":"SUCCEEDED",
      "provider": {
        "id": "EDENRED",
        "recipient_id":"[MID]"
      }
    },
    {
      "type": "ONBOARD_ONTO_PROVIDER",
      "workflow": "DIRECT",
			"status":"SUCCEEDED",
      "provider": {
        "id": "PLUXEE",
        "recipient_id":"[ID_FILIACAO]"
      }
    },
    {
      "type": "ONBOARD_ONTO_PROVIDER",
      "workflow": "DIRECT",
			"status":"SUCCEEDED",
      "provider": {
        "id": "VR",
        "recipient_id":"[MID]"
      }
    }
  ],
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

Once the recipient creation is made, then the **payment** needs to be created specifying the recipient\_id in the payment request as previously mentioned in the [Split Payments Marketplace](https://docs.y.uno/docs/split-payments-marketplace#/2--payment-split-integration) guides section.

```json Example
{
  "split_marketplace": [
    {
      "recipient_id": "4b31a9b8-4cd2-4e47-93cf-03729241bd68",
      "type": "PURCHASE",
      "amount": {
        "value": 750,
        "currency": "BRL"
      }
    }
  ]
}
```