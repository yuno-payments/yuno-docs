---
title: Introduction
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
With Yuno reports, you can find entries from transactions in different stages of the Payments lifecycle. The reports service allows you to request and download different reports associated with your operations with Yuno. Below you will find a description of each report type provided by Yuno.

## Payment report

The payment report will allow you to have an overview of the payments you processed with Yuno. Information such as the collection status, refunds or chargebacks associated with a payment will be available in a row.

See the fields for this report in the [Reports Fields](https://docs.y.uno/reference/reports-fields) section.

## Transaction report

The transaction report is a detailed file where you can find the breakdown of all your transactions with Yuno. They will be related to a specific payment in a period selected in the report request.

See the fields available for this report in the [Reports Fields](https://docs.y.uno/reference/reports-fields) section.

## Transaction reconciliation report

The transaction reconciliation report is a comprehensive document that provides a breakdown of all your transactions with Yuno and the result of the reconciliation process against the settlements. This report may be generated with information on transactions processed until the day before the request.

See the fields available for this report in the [Report Fields](ref:reports-fields#transaction-reconciliation-report) section.

## Settlement report

The settlement report will allow you to know the transactional composition and the fees incurred by each acquirer's payout in your bank accounts.  
Your financial team can use this report to recognize the composition of each settlement(gross amount, fees and net amount), but also to perform reconciliation on a transaction level.

See the fields available for this report in the [Reports Fields](ref:reports-fields#settlement-report) section.