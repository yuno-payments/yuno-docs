---
title: Payments
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
## What is a payment?

A payment represents a user's transaction, regardless of the processors or payment methods used.

Payments collect essential order details, including customer information, total amount, currency, products, shipping details, and more. For a deeper understanding of order and payment interactions, refer to the [Transactions](doc:transactions) page.

## Payment workflow

The following workflow illustrates the possible payment statuses and their connections. Every payment has a status that follows a standardized lifecycle, ensuring consistent functionality across all payment methods. A payment moves through a sequence of statuses until completion. The diagram below explains the potential outcomes based on transaction statuses.

![](https://files.readme.io/808ba2b-concepts__payments.png)

For more details on status codes and messages, refer to the [Payments API reference](https://docs.y.uno/reference/payment).

## Payments and transactions

A payment consists of multiple transactions that determine its final outcome. If you enable different connections for your payment method route, such as fraud prevention, 3D Secure, or provider fallbacks, these transactions become part of the payment lifecycle.

In the [Payments](doc:payments-2) section of your Yuno dashboard, you can view and export all payment and transaction details.

For more details on how transactions impact payment outcomes, refer to the [Transactions](doc:transactions) section.
