---
title: Update Subscription
excerpt: ''
api:
  file: subscription-secondary.json
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

> 📘 Retry configuration updates
>
> If retries are already scheduled for the current billing cycle, updating the `retries` object does **not** modify them. The new configuration applies starting from the next payment. When switching strategy to `CUSTOM_SCHEDULE`, you must include `schedule`. When switching to `DEFAULT`, you must include `amount`. See [Smart Retries](doc:retries) for details.