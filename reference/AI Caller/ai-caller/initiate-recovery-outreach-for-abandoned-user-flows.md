---
title: Initiate Recovery Outreach for Abandoned User Flows
excerpt: >-
  This endpint allows merchants to notify Yuno's Recovery Agent when a user
  abandons their purchase flow, such as during product selection or after
  initiating checkout, before completing a payment. The submitted data enables
  Yuno to follow up with the user via call or WhatsApp to encourage completion
  of the transaction.


  ## Security and compliance


  - **Authentication**: API access requires a valid API key provided in the
  request headers.


  - **Data Protection**: All data must be transmitted over HTTPS. Yuno adheres
  to relevant data protection regulations, including **GDPR** and **LGPD**.


  - **Data Usage**: Submitted data will be used solely for the purpose of
  customer engagement and will not be stored beyond the necessary duration.


  > ## 📘 Use Case Example

  > A user named Jane Doe adds a pair of wireless headphones to her cart on a
  merchant's website but abandons the checkout process. The merchant's system
  detects this and sends the relevant payload to Yuno’s Recovery Agent API. Yuno
  then initiates a WhatsApp message to Jane, reminding her of the items left in
  her cart and offering assistance to complete the purchase.
api:
  file: ai-caller.json
  operationId: initiate-recovery-outreach-for-abandoned-user-flows
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---