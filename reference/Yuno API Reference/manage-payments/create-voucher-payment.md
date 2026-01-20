---
title: Create Voucher Payment
api:
  file: creating-vouchers.json
  operationId: post_payments
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: index
---
This page provides an overview of voucher payment creation with Yuno. Although these type of transactions go through the standard [Create payment](ref:create-payment) endpoint, this guide reduces the amount of fields available for simplicity.

Review the request body schema and examples below to understand the voucher payment creation. Yuno processes voucher cards (such as meal, food, or fuel vouchers) using the same endpoint as regular card payments, with the voucher type automatically identified and notified in the response via the `type = VOUCHER` field.

<Callout icon="🚧" theme="warn">
  Review the `status` on the response to ensure the voucher payment has gone through.
</Callout>

## Recipients and Onboarding

Voucher payments support split payment functionality, allowing you to divide transaction amounts among multiple recipients. This is particularly useful for marketplace scenarios where voucher transactions need to be distributed among different sellers or stakeholders.

**[Create recipient](ref:create-recipient-1)**: This endpoint creates a recipient entity that defines submerchants who will receive portions of split voucher transactions. The recipient represents the merchant or business entity with their business information, legal documentation, and banking details. Recipients work the same for vouchers as they do for regular payments and split payments.

**[Create onboarding](ref:create-onboarding)**: This endpoint registers the recipient with voucher providers (e.g. Alelo). The onboarding process integrates the recipient with the payment provider, including identity verification and compliance checks. Recipients must be successfully onboarded before they can receive split payments.

<Callout icon="ℹ️" theme="info">
  The **recipients** endpoint includes an `onboardings` object, allowing you to create both the recipient and onboarding in a single API call.
</Callout>

The required fields for voucher payments are the same as for regular payments. Check each endpoint's page to learn more about the required fields and parameters.

The examples below demonstrate how to structure recipients and onboarding requests for voucher payments. The Recipients examples show creating a recipient with an embedded `onboardings` object (combining both operations in one call). The Onboardings examples show creating a standalone onboarding for an existing recipient. Note the `type` field which can be `PREVIOUSLY_ONBOARDED` for merchants already registered with the provider, or `ONE_STEP_ONBOARDING`/`TWO_STEP_ONBOARDING` for new registrations.

<Accordion title="Recipients request" icon="fa-users">
  ```json
  {
  "type": "PREVIOUSLY_ONBOARDED",
  "national_entity": "ENTITY",
  "document": {
    "document_number": "42867246000105",
    "document_type": "CNPJ"
  },
  "account_id": "52c456b4-93e2-42bc-91d8-969e1464fce3",
  "merchant_recipient_id": "42867246000105",
  "entity_type": "PRIVATE",
  "first_name": "Harry",
  "last_name": "Potter",
  "date_of_birth": "1932-11-11",
  "legal_name": "Casa Rosada",
  "email": "harry.potter@gmail.com",
  "country": "BR",
  "website": "https://www.google.com",
  "merchant_category_code": "5812",
  "industry": "grocery_&_gourmet_food",
  "legal_representatives": [
    {
      "merchant_reference": "42867246000105",
      "first_name": "Harry",
      "last_name": "Potter",
      "email": "harry.potter@gmail.com",
      "date_of_birth": "1932-11-11",
      "country": "BR",
      "nationality": "BR",
      "title": "CEO",
      "publicly_exposed_person": false,
      "ultimate_beneficial_owner": true
    }
  ],
  "onboardings": [
    {
      "provider": {
        "id": "ALELO",
        "recipient_id": "42867246000105",
        "connection_id": "09ae0cfb-b1da-4101-a62c-d0dc3cf6e492"
      },
      "terms_of_service": {
        "acceptance": true,
        "date": "2025-07-21T20:43:54Z"
      },
      "type": "PREVIOUSLY_ONBOARDED",
      "workflow": "HOSTED_BY_PROVIDER"
    }
  ]
  }
  ```
</Accordion>

<Accordion title="Recipients response" icon="fa-users">
  ```json
  {
  "id": "eaa1b6f9-1f57-469a-919b-dc388058b6c8",
  "account_id": "52c456b4-93e2-42bc-91d8-969e1464fce3",
  "merchant_recipient_id": "42867246000105",
  "national_entity": "ENTITY",
  "entity_type": "PRIVATE",
  "first_name": "Harry",
  "last_name": "Potter",
  "legal_name": "Casa Rosada",
  "email": "harry.potter@gmail.com",
  "date_of_birth": "1932-11-11",
  "country": "BR",
  "website": "https://www.google.com",
  "industry": "grocery_&_gourmet_food",
  "merchant_category_code": "5812",
  "document": {
    "document_number": "42867246000105",
    "document_type": "CNPJ"
  },
  "legal_representatives": [
    {
      "merchant_reference": "42867246000105",
      "first_name": "Harry",
      "last_name": "Potter",
      "email": "harry.potter@gmail.com",
      "date_of_birth": "1932-11-11",
      "country": "BR",
      "nationality": "BR",
      "title": "CEO",
      "publicly_exposed_person": false,
      "ultimate_beneficial_owner": true
    }
  ],
  "onboardings": [
    {
      "id": "e5108b93-8621-4b08-92f0-dce508857c54",
      "type": "PREVIOUSLY_ONBOARDED",
      "workflow": "HOSTED_BY_PROVIDER",
      "status": "SUCCEEDED",
      "provider": {
        "id": "ALELO",
        "connection_id": "09ae0cfb-b1da-4101-a62c-d0dc3cf6e492",
        "recipient_id": "42867246000105"
      },
      "terms_of_service": {
        "acceptance": true,
        "date": "2025-07-21T20:43:54Z"
      },
      "created_at": "2025-11-03T16:30:07.691401Z",
      "updated_at": "2025-11-03T16:30:07.691404Z"
    }
  ],
  "created_at": "2025-11-03T16:30:07.662664Z",
  "updated_at": "2025-11-03T16:30:07.662667Z"
  }
  ```

  <br />
</Accordion>

<Accordion title="Onboardings request" icon="fa-clipboard-check">
  ```json
  {
  "type": "PREVIOUSLY_ONBOARDED",
  "workflow": "HOSTED_BY_PROVIDER",
  "provider": {
    "id": "ALELO",
    "connection_id": "a12f5a33-8c47-47e3-9d36-6e4f2c523af2",
    "recipient_id": "2d92e85a-c1d2-4b8c-9205-8f5a4a4ac149"
  },
  "terms_of_service": {
    "acceptance": true,
    "date": "2025-11-06T05:00:00Z",
    "ip": "192.168.1.100"
  },
  "account_id": "c24d6c92-99a7-40bb-bc7b-efc40337f9f4"
  }
  ```
</Accordion>

<Accordion title="Onboardings response" icon="fa-clipboard-check">
  ```json
  {
  "id": "61df26d9-3750-4206-baab-f2e20683f35b",
  "type": "ONE_STEP_ONBOARDING",
  "workflow": "DIRECT",
  "status": "SUCCEEDED",
  "callback_url": "https://merchant.example.com/webhook/onboarding",
  "provider": {
    "id": "PAGARME",
    "connection_id": "a12f5a33-8c47-47e3-9d36-6e4f2c523af2",
    "recipient_id": "re_cldlw3l0d0001mi0h5h5b0b0b",
    "redirect_url": null,
    "onboarding_url": null,
    "legal_entity": null
  },
  "documentation": [
    {
      "file_name": "recipient.pdf",
      "content_type": "application/pdf",
      "content_category": "IDENTIFICATION_DOCUMENT",
      "content": "recipient.pdf-20ac42c2-ef01-4a0c-80dd-0f9f71c9cde7"
    }
  ],
  "legal_representatives": [
    {
      "merchant_reference": "ONB_001",
      "first_name": "Tatiana",
      "last_name": "González",
      "email": "tatiana.gonzalez@example.com",
      "date_of_birth": "1985-05-20",
      "country": "BR",
      "nationality": "BR",
      "title": "CEO",
      "publicly_exposed_person": false,
      "ultimate_beneficial_owner": true,
      "document": {
        "document_type": "CC",
        "document_number": "0987654321"
      },
      "phone": {
        "number": "3109876543",
        "country_code": "+57"
      },
      "address": {
        "address_line_1": "Calle 26 # 13-19",
        "address_line_2": null,
        "country": "CO",
        "state": "Cundinamarca",
        "city": "Bogotá",
        "zip_code": "110311"
      }
    }
  ],
  "requirements": [],
  "withdrawal_methods": {
    "bank": {
      "code": "003",
      "branch": "003",
      "branch_digit": null,
      "account": "9876543210",
      "account_digit": null,
      "account_type": "CHECKINGS",
      "routing": "021000022",
      "country": "US",
      "currency": "USD"
    }
  },
  "terms_of_service": {
    "acceptance": true,
    "date": "2025-11-06T05:00:00Z",
    "ip": "192.168.1.100"
  },
  "recipient": {
    "id": "5a37f0c0-7689-4065-8348-4b5ff5bf9cc7",
    "account_id": "c24d6c92-99a7-40bb-bc7b-efc40337f9f4",
    "merchant_recipient_id": "MERCHANT_85ac5f5d-a169-46b3-bd87-80c0df2e6591",
    "national_entity": "INDIVIDUAL",
    "entity_type": "PRIVATE",
    "first_name": "Stebann",
    "last_name": "Castro",
    "legal_name": "Steban Castro",
    "email": "juan.perez@example.com",
    "date_of_birth": "1992-01-21",
    "country": "CO",
    "website": "https://juanperez.com",
    "industry": "Technology",
    "merchant_category_code": "5740",
    "document": {
      "document_number": "09082160000100",
      "document_type": "CNPJ"
    },
    "phone": {
      "country_code": "57",
      "number": "3001234567"
    },
    "address": {
      "address_line_1": "Carrera 7 # 32-16",
      "address_line_2": "Oficina 201",
      "city": "Bogotá",
      "country": "CO",
      "state": "Cundinamarca",
      "zip_code": "110311",
      "neighborhood": "Centro"
    },
    "legal_representatives": [
      {
        "merchant_reference": "REP_001",
        "first_name": "María",
        "last_name": "González",
        "email": "maria.gonzalez@example.com",
        "date_of_birth": "1985-05-20",
        "country": "CO",
        "nationality": "CO",
        "title": "CEO",
        "publicly_exposed_person": false,
        "ultimate_beneficial_owner": true,
        "document": {
          "document_type": "CC",
          "document_number": "0987654321"
        },
        "phone": {
          "number": "3109876543",
          "country_code": "+57"
        },
        "address": {
          "address_line_1": "Calle 26 # 13-19",
          "address_line_2": null,
          "country": "CO",
          "state": "Cundinamarca",
          "city": "Bogotá",
          "zip_code": "110311"
        }
      }
    ],
    "withdrawal_methods": {
      "bank": {
        "code": "001",
        "branch": "004",
        "branch_digit": "123",
        "account": "1234567890",
        "account_digit": "123",
        "account_type": "SAVINGS",
        "routing": "021000021",
        "country": "CO",
        "currency": "COP"
      }
    },
    "documentation": [
      {
        "file_name": "recipient.pdf",
        "content_type": "application/pdf",
        "content_category": "IDENTIFICATION_DOCUMENT",
        "content": "recipient.pdf-2bf73b44-33e3-49c7-b777-34a5178cfb45"
      }
    ],
    "created_at": "2025-08-22T17:54:05.711545Z",
    "updated_at": "2025-08-22T17:54:05.711561Z"
  },
  "history": {
    "id": "61df26d9-3750-4206-baab-f2e20683f35b",
    "type": "ONE_STEP_ONBOARDING",
    "workflow": "DIRECT",
    "status": "SUCCEEDED",
    "callback_url": "https://merchant.example.com/webhook/onboarding",
    "provider": {
      "id": "PAGARME",
      "connection_id": "a12f5a33-8c47-47e3-9d36-6e4f2c523af2",
      "recipient_id": "re_cldlw3l0d0001mi0h5h5b0b0b",
      "redirect_url": null
    },
    "documentation": [
      {
        "file_name": "recipient.pdf",
        "content_type": "application/pdf",
        "content_category": "IDENTIFICATION_DOCUMENT",
        "content": "recipient.pdf-20ac42c2-ef01-4a0c-80dd-0f9f71c9cde7"
      }
    ],
    "legal_representatives": [
      {
        "merchant_reference": "ONB_001",
        "first_name": "Tatiana",
        "last_name": "González",
        "email": "tatiana.gonzalez@example.com",
        "date_of_birth": "1985-05-20",
        "country": "BR",
        "nationality": "BR",
        "title": "CEO",
        "publicly_exposed_person": false,
        "ultimate_beneficial_owner": true,
        "document": {
          "document_type": "CC",
          "document_number": "0987654321"
        },
        "phone": {
          "number": "3109876543",
          "country_code": "+57"
        },
        "address": {
          "address_line_1": "Calle 26 # 13-19",
          "address_line_2": null,
          "country": "CO",
          "state": "Cundinamarca",
          "city": "Bogotá",
          "zip_code": "110311"
        }
      }
    ],
    "requirements": [],
    "withdrawal_methods": {
      "bank": {
        "code": "003",
        "branch": "003",
        "branch_digit": null,
        "account": "9876543210",
        "account_digit": null,
        "account_type": "CHECKINGS",
        "routing": "021000022",
        "country": "US",
        "currency": "USD"
      }
    },
    "terms_of_service": {
      "acceptance": true,
      "date": "2025-11-06T05:00:00Z",
      "ip": "192.168.1.100"
    },
    "recipient": {
      "id": "5a37f0c0-7689-4065-8348-4b5ff5bf9cc7",
      "account_id": "c24d6c92-99a7-40bb-bc7b-efc40337f9f4",
      "merchant_recipient_id": "MERCHANT_85ac5f5d-a169-46b3-bd87-80c0df2e6591",
      "national_entity": "INDIVIDUAL",
      "entity_type": "PRIVATE",
      "first_name": "Stebann",
      "last_name": "Castro",
      "legal_name": "Steban Castro",
      "email": "juan.perez@example.com",
      "date_of_birth": "1992-01-21",
      "country": "CO",
      "website": "https://juanperez.com",
      "industry": "Technology",
      "merchant_category_code": "5740",
      "document": {
        "document_number": "09082160000100",
        "document_type": "CNPJ"
      },
      "phone": {
        "country_code": "57",
        "number": "3001234567"
      },
      "address": {
        "address_line_1": "Carrera 7 # 32-16",
        "address_line_2": "Oficina 201",
        "city": "Bogotá",
        "country": "CO",
        "state": "Cundinamarca",
        "zip_code": "110311",
        "neighborhood": "Centro"
      },
      "legal_representatives": [
        {
          "merchant_reference": "REP_001",
          "first_name": "María",
          "last_name": "González",
          "email": "maria.gonzalez@example.com",
          "date_of_birth": "1985-05-20",
          "country": "CO",
          "nationality": "CO",
          "title": "CEO",
          "publicly_exposed_person": false,
          "ultimate_beneficial_owner": true,
          "document": {
            "document_type": "CC",
            "document_number": "0987654321"
          },
          "phone": {
            "number": "3109876543",
            "country_code": "+57"
          },
          "address": {
            "address_line_1": "Calle 26 # 13-19",
            "address_line_2": null,
            "country": "CO",
            "state": "Cundinamarca",
            "city": "Bogotá",
            "zip_code": "110311"
          }
        }
      ],
      "withdrawal_methods": {
        "bank": {
          "code": "001",
          "branch": "004",
          "branch_digit": "123",
          "account": "1234567890",
          "account_digit": "123",
          "account_type": "SAVINGS",
          "routing": "021000021",
          "country": "CO",
          "currency": "COP"
        }
      },
      "documentation": [
        {
          "file_name": "recipient.pdf",
          "content_type": "application/pdf",
          "content_category": "IDENTIFICATION_DOCUMENT",
          "content": "recipient.pdf-2bf73b44-33e3-49c7-b777-34a5178cfb45"
        }
      ],
      "created_at": "2025-08-22T17:54:05.711545Z",
      "updated_at": "2025-08-22T17:54:05.711561Z"
    },
    "created_at": "2025-08-22T17:57:58.460711Z",
    "updated_at": "2025-08-22T17:57:58.460724Z"
  },
  "created_at": "2025-08-22T17:57:58.460711Z",
  "updated_at": "2025-08-22T17:57:58.460724Z"
  }
  ```
</Accordion>