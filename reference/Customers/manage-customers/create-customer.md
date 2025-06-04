---
title: Create Customer
excerpt: ''
api:
  file: customer-api.json
  operationId: create-customer
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    A request to create a customer resource. You need to provide several
    parameters of the customer in the request body, including the customer's
    unique identifier in the external merchant, personal information, and
    billing and shipping addresses.
  robots: index
next:
  description: ''
---
This request creates a customer resource. You need to provide several parameters of the customer in the request body, including the unique identifier of the customer in the external merchant, personal information, as well as billing and shipping addresses.

Creating a customer generates a customer `id` that can be used to initialize the checkout.

> 📘 Important
>
> There are certain objects that are not mandatory when creating a "Customer". However the more information you provide, the approval, conversion and fraud prevention rates will be positively impacted.