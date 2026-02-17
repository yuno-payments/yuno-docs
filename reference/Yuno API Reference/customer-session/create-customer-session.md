---
title: Create Customer Session
excerpt: ''
api:
  file: customer-api.json
  operationId: create-customer-session
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    A request to create a customer session using the unique identifier generated
    when the Customer resource was created.
  robots: index
next:
  description: ''
---
Creates a customer session for enrolling and managing payment methods. Use this to allow customers to save cards, wallets, and other payment methods for future use. Uses the `id` obtained when [creating a customer](ref:create-customer) .
