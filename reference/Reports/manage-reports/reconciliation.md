---
title: Reconciliation
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
## What's reconciliation?

Reconciliation is the process of comparing transactions with the documents issued by the different providers. It provides information to resolve any discrepancies that have been discovered. In addition, a proper reconciliation process ensures that all processed transactions have been properly settled.

By consuming settlement files from each provider, the reconciliation process constantly compares the intakes with the transactions processed by Yuno. The transactional reconciliation process is executed between the universe of transactions and settlements. This operational process checks account balances with your acquirers to ensure that all sets of records are true, consistent, and up-to-date. 

## Why reconciliation matters

Discrepancies are not unusual and many are harmless, but payment time, deposits and pending transactions can affect the results of all bank accounts. Therefore, businesses can take advantage of the reconciliation process to detect and prevent balance errors, identify fraud, track failed payments.

The main goals of reconciliation are:

* Ensure that the merchant will receive all the payments coming from successful transactions processed by Yuno;
* Compliance with the payment term agreed between the merchants and the acquirers;
* Control of acquisition processing costs and effective processors vs. agreed between the merchant and the previous intervening actors;
* Control of transactional integrity and states in the Yuno dashboard; 

It's ideal to do it as often as you can (daily), but if that's not possible, you should try to do it weekly or monthly at the very least.

## How Yuno provides reconciliation

Yuno offers its clients a comprehensive transaction reconciliation process in order to ensure accreditation, compliance with payment terms and processing costs associated with their operations. We take care of the orchestration and management of all the data from Yuno, its partners and merchants, to subsequently execute conciliation processes.

### Reconciliation status

A transaction can be classified according to the reconciliation process as RECONCILED, NOT RECONCILED, or in CONFLICT.

| Reconciliation Status | Description                                                                                                                                                                                                           |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RECONCILED            | A RECONCILED transaction indicates that it was identified in a settlement from the provider that processed it and will therefore be credited to your bank account.                                                    |
| NOT RECONCILED        | A NOT RECONCILED transaction indicates that the transaction is still in the process of being identified in a settlement. The sub-status of said reconciliation will indicate whether it is still in the payment term. |
| CONFLICT              | A transaction in CONFLICT in reconciliation indicates that although a counterpart transaction was identified in the settlement, it has some discrepancy with the processed record.                                    |

### State machine

<Image align="center" src="https://files.readme.io/d2ca5f4-report_reconciliation1.png" />

### Deliveries

Yuno provides two types of reports related to reconciliation:

* [**Transaction Report**](https://docs.y.uno/reference/reports-fields#transaction-report): Provides reconciliation status and sub-status columns and reconciliation ID for each transaction processed by Yuno;
* [**Settlement Report**](https://docs.y.uno/reference/reports-fields#settlement-report):  The settlement report contains all the transactions included in each bank transfer executed to the merchant’s account by the acquirer, adding reconciliation information.
