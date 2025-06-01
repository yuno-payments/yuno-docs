---
title: Cancel Subscription
excerpt: ''
api:
  file: subscription.json
  operationId: cancel-subscription
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Calling this endpoint will cancel a subscription, changing it's `status` to CANCELED. This change cannot be reverted back, being a final point for the respective subscription.
