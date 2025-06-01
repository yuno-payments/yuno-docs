---
title: Create Recipients
excerpt: ''
api:
  file: recipients.json
  operationId: create-recipients
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Creating a recipient generates a recipient `id` that can be used to create the [payment with split_marketplace](ref:split-payments-marketplace). 

This request creates a recipient resource. You need to provide several parameters of the recipient in the request body, including the unique identifier of the recipient in the external provider, personal information, as well as billing and shipping addresses.