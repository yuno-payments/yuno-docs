---
title: Fraud prevention
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Yuno integrates with external fraud detection services to help prevent fraud in your payment process. Configure both **pre-authorization** and **post-authorization** screening by plugging in your preferred **fraud detection provider**.

### Fraud prevention with Yuno

When using Yuno's SDK, no additional development is required. Add the provider to the payment route and Yuno orchestrates the integration for you.

![](https://files.readme.io/2c9a0ed-Fraud_prevention_.png)

When a payment is created, Yuno generates the transactions defined in the route. If fraud verification is enabled, Yuno adds a `FRAUD_SCREENING` transaction and links it to the payment. You can review the outcome in the API response or in the [Payment details](doc:transactions#transaction-types-and-statuses) view on the dashboard.
