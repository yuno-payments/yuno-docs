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
This page provides an overview of voucher payment creation with Yuno. Although voucher transactions flow through the standard [Create payment](ref:create-payment) endpoint, this guide reduces the amount of fields available for simplicity.

Review the request body schema and examples below to understand voucher payment creation. Yuno processes voucher cards (such as meal, food, or fuel vouchers) using the same endpoint as regular card payments, with the voucher type automatically identified in the response via the `type = VOUCHER` field.

## Split payments

Yuno allows you to distribute transaction amounts across multiple submerchants through the [split payments marketplace](doc:split-payments-marketplace). Ideal for marketplace platforms, commissions, and multi-vendor transactions.

First, [onboard](ref:create-onboarding) submerchants:

<Accordion title="Onboardings request" icon="fa-clipboard-check">
  ```json
  {
    "type": "PREVIOUSLY_ONBOARDED",
    "workflow": "HOSTED_BY_PROVIDER",
    "provider": {
      "id": "ALELO",
      "connection_id": "09ae0cfb-b1da-4101-a62c-d0dc3cf6e492",
      "recipient_id": "42867246000105"
    },
    "terms_of_service": {
      "acceptance": true,
      "date": "2025-07-21T20:43:54Z"
    },
    "account_id": "52c456b4-93e2-42bc-91d8-969e1464fce3"
  }
  ```
</Accordion>

<Accordion title="Onboardings response" icon="fa-clipboard-check">
  ```json
  {
      "code": "ONBOARDING_ALREADY_EXISTS",
      "messages": [
          "Onboarding already exists for this recipient."
      ]
  }
  ```
</Accordion>

Then, [create recipients](ref:create-recipient-1) who can receive portions of payments. An `onboardings` object is available to do both steps at the same time.


<Accordion title="Recipients request" icon="fa-users">
  ```json
  {"type":"PREVIOUSLY_ONBOARDED","national_entity":"ENTITY","document":{"document_number":"42867246000105","document_type":"CNPJ"},"account_id":"52c456b4-93e2-42bc-91d8-969e1464fce3","merchant_recipient_id":"42867246000105","entity_type":"PRIVATE","first_name":"Harry","last_name":"Potter","date_of_birth":"1932-11-11","legal_name":"Casa Rosada","email":"harry.potter@gmail.com","country":"BR","website":"https://www.google.com","merchant_category_code":"5812","industry":"grocery_&_gourmet_food","legal_representatives":[{"merchant_reference":"42867246000105","first_name":"Harry","last_name":"Potter","email":"harry.potter@gmail.com","date_of_birth":"1932-11-11","country":"BR","nationality":"BR","title":"CEO","publicly_exposed_person":false,"ultimate_beneficial_owner":true}],"onboardings":[{"provider":{"id":"ALELO","recipient_id":"42867246000105","connection_id":"09ae0cfb-b1da-4101-a62c-d0dc3cf6e492"},"terms_of_service":{"acceptance":true,"date":"2025-07-21T20:43:54Z"},"type":"PREVIOUSLY_ONBOARDED","workflow":"HOSTED_BY_PROVIDER"}]}
  ```
</Accordion>

<Accordion title="Recipients response" icon="fa-users">
  ```json
  {"id":"eaa1b6f9-1f57-469a-919b-dc388058b6c8","account_id":"52c456b4-93e2-42bc-91d8-969e1464fce3","merchant_recipient_id":"42867246000105","national_entity":"ENTITY","entity_type":"PRIVATE","first_name":"Harry","last_name":"Potter","legal_name":"Casa Rosada","email":"harry.potter@gmail.com","date_of_birth":"1932-11-11","country":"BR","website":"https://www.google.com","industry":"grocery_&_gourmet_food","merchant_category_code":"5812","document":{"document_number":"42867246000105","document_type":"CNPJ"},"phone":null,"address":null,"legal_representatives":[{"merchant_reference":"42867246000105","first_name":"Harry","last_name":"Potter","email":"harry.potter@gmail.com","date_of_birth":"1932-11-11","country":"BR","nationality":"BR","title":"CEO","publicly_exposed_person":false,"ultimate_beneficial_owner":true,"document":null,"phone":null,"address":null}],"withdrawal_methods":null,"documentation":[],"onboardings":[{"id":"e5108b93-8621-4b08-92f0-dce508857c54","type":"PREVIOUSLY_ONBOARDED","workflow":"HOSTED_BY_PROVIDER","description":null,"status":"SUCCEEDED","response_message":null,"callback_url":null,"provider":{"id":"ALELO","connection_id":"09ae0cfb-b1da-4101-a62c-d0dc3cf6e492","recipient_id":"42867246000105","redirect_url":null,"onboarding_url":null,"legal_entity":null,"recipient_additional_id":null,"balance_account_id":null},"documentation":[],"legal_representatives":[],"requirements":[],"metadata":[],"withdrawal_methods":null,"terms_of_service":{"acceptance":true,"date":"2025-07-21T20:43:54Z","ip":null},"created_at":"2025-11-03T16:30:07.691401Z","updated_at":"2025-11-03T16:30:07.691404Z"}],"created_at":"2025-11-03T16:30:07.662664Z","updated_at":"2025-11-03T16:30:07.662667Z"}
  ```

  <br />
</Accordion>

<br />
