---
title: Update Subscription
excerpt: ''
api:
  file: subscription.json
  operationId: update-subscription
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---

> 🚧 Subscription Transition
>
> The fields `billing_cycles` and `availability.finish_at` have an impact on each other. If both are completed during the subscription creation, it will transition to the `COMPLETED` state upon reaching the nearest event defined in these fields, whether it is the billing cycle or the corresponding `finish_at`.
