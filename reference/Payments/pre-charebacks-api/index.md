---
title: Pre Chargeback Alerts
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
A [pre-chargeback alert](doc:pre-chargeback-alerts) is an early notification system that informs merchants about transactions that are at risk of resulting in chargebacks. These alerts are typically provided by payment processors or specialized services and offer merchants the opportunity to address potential disputes proactively before they escalate into formal chargebacks.

Yuno allows you to receive pre-chargeback alerts from external providers, take action on them, and attempt to prevent future chargebacks.

## Possible Payment and Alert statuses

| Payment status | Payment sub_status            | Transaction Type | Transaction status          | Description                   |
| :------------- | :---------------------------- | :--------------- | :-------------------------- | :---------------------------- |
| SUCCEEDED      | PRE_CHARGEBACK_PENDING_REVIEW | PRE_CHARGEBACK   | PENDING                     | For alerts pending resolution |
| SUCCEEDED      | APPROVED                      | PRE_CHARGEBACK   | EXPIRED/SETTLED/NOT_SETTLED |                               |

> 📘 Important disclaimers
> 
> - The refund/cancel notification in Yuno does not trigger a new transaction. taking into consideration that a refund could be done in or outside Yuno, the merchant is responsible for executing the refund directly via Yuno or an external service provider.
> - The notification of the refund/cancel outcome to the provider does not assure that a chargeback is not going to be generated, but in case it is, the provider will cover the cost of the alert related to it.

## Possible resolution types

| Status      | Reason            | Category | Description                                           |
| :---------- | :---------------- | :------- | :---------------------------------------------------- |
| SETTLED     | REFUNDED          | Dispute  | Refund processed                                      |
|             | RESOLVED          | Dispute  | Case resolved with the customer                       |
|             | CANCELLED         | Fraud    | The transaction was already cancelled                 |
|             | SERVICE_SUSPENDED | Fraud    | The account has been suspended                        |
|             | ORDER_STOPPED     | Fraud    | The order was stopped / Part of the order was stopped |
| NOT_SETTLED | DISMISS           | Dispute  | Chargeback will be disputed                           |
|             | MISSED            | Fraud    | The order shipped or the service was consumed         |