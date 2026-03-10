---
title: Create Entity
api:
  file: banking-connectivity.json
  operationId: post_v1-banking-connectivity-entities
deprecated: false
hidden: false
link:
  new_tab: false
metadata:
  robots: index
---
Create a Yuno entity representing an individual or organization. Set `national_entity` to `INDIVIDUAL` or `ENTITY` and provide the corresponding `entity_detail` sub-object. See [Entity types](ref:banking_connectivity#entity-types) for details.

Sensitive fields like `tax_id` and `document_number` are masked in responses (only last 4 digits returned).