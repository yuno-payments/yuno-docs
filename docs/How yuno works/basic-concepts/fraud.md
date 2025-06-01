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
Yuno integrates with external fraud detection services to help prevent fraud in your payment process. You can configure both **pre-authorization** and **post-authorization** fraud screening through your preferred **fraud detection provider**.

### Fraud prevention with Yuno

When using Yuno's SDK, no additional development is required. Simply add the fraud detection provider to the payment route, and Yuno will handle the rest.

![](https://files.readme.io/2c9a0ed-Fraud_prevention_.png)

When a payment is created, Yuno generates different transactions based on the payment method route. If fraud verification is enabled in the route, Yuno creates a `FRAUD_SCREENING` transaction and associates it with the payment. This transaction contains details about the fraud verification outcome, which you can also view in the [payment details](doc:transactions#transaction-types-and-statuses) on your Yuno dashboard.
