---
title: Reports
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: Reports
  description: >-
    With Yuno reports, you can find entries from transactions in different
    stages of the Payments lifecycle. The reports service allows you to request
    and download different reports associated with your operations with Yuno.
  robots: index
next:
  description: ''
---
With Yuno reports, you can find entries from transactions in different stages of the Payments lifecycle. The reports service allows you to request and download different reports associated with your operations with Yuno. 

To understand all report content with descriptions for all available fields, check the [Reports Fields](ref:reports-fields) section. Below you will find a description of each report type provided by Yuno.

## Payment report

The payment report will give you an overview of the payments you processed with Yuno. Information such as the collection status, refunds, or chargebacks associated with a payment will be available in a row.

## Transaction report

The transaction report is a detailed file where you can find the breakdown of all your transactions with Yuno. They will be related to a specific payment in a period selected in the report request.

## Transaction reconciliation report

The transaction reconciliation report is a comprehensive document that provides a breakdown of all your transactions with Yuno and the result of the reconciliation process against the settlements. This report may be generated with information on transactions processed until the day before the request.

## Settlement report

The settlement report will let you know the transactional composition and the fees incurred by each acquirer's payout in your bank accounts. Your financial team can use this report to recognize the composition of each settlement (gross amount, fees, and net amount) but also to perform reconciliation on a transaction level.

## Reports relationships

The reports provided by Yuno are related. Below you will find a description of these relations:

* Payments and Transactions reports are linked through `payment_id`. 
* Transactions and settlements are linked via `transaction_id field`.

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/yourPaymentsOperationSystem/Reports/reports_1.png" />

The transaction reconciliation report has no direct connection with the other three.
