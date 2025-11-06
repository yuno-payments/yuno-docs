---
title: Creating Vouchers
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
This page provides information on Yuno's voucher creation. In practice, you can perform the same process via the Create payment endpoint, although this simplified overview might help your understanding early on.

Have a look at the request body, as well as the examples we have created to understand how to create voucher payments. With Yuno, voucher transactions are processed just like any other flowing through the Create payments endpoint. When you

Recipients and Onboardings

Yuno allows you to split payments with submerchants via the split marketplace. You can create recipients and onboardings to accomplish this task.

Recipients

<Accordion title="Recipients" icon="fa-users">

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

Onboardings

<br />
