---
title: Create Subscription
excerpt: ''
api:
  file: subscription.json
  operationId: create-subscription
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---

> 🚧 Subscription Completion
>
> The fields `billing_cycles` and `availability.finish_at` have an impact on each other. If both are completed during the subscription creation, it will transition to the `COMPLETED` state upon reaching the nearest event defined in these fields, whether it is the billing cycle or the corresponding `finish_at`.

> 📘 Retry configuration
>
> When configuring `retries`, the `strategy` field determines which other fields are required. With `DEFAULT`, provide `amount`. With `CUSTOM_SCHEDULE`, provide `schedule`. See [Smart Retries](doc:retries) for details on strategies and schedule format.

Refer to the [HTTP Response Codes](ref:response-codes) section for details on possible error outcomes.