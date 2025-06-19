---
title: Reconciliations (COPY)
deprecated: false
hidden: false
metadata:
  title: Reconciliations
  description: >-
    Reconciliation is the process of comparing transactions with the documents
    issued by different providers. It provides information to resolve any
    discrepancies that have been discovered.
  robots: index
---
Reconciliation is a process that compares your transactions with settlement documents from payment providers to:

* Identify and resolve discrepancies
* Ensure all processed transactions are properly settled
* Maintain accurate financial records

The reconciliation process works by:

1. Collecting settlement files from each payment provider
2. Comparing those files with transactions processed through Yuno
3. Checking account balances with your acquirers
4. Verifying all records are accurate, consistent and up-to-date

<Image align="center" src="https://files.readme.io/3f66c409f3e0afed83ab7829398e5d88abb6696e587d3b1e32909f496400ba91-Reconciliations.png" />

## Why reconciliation matters

Reconciliation helps you identify and resolve discrepancies in your payment processing. While some discrepancies are harmless, factors like payment timing, deposits, and pending transactions can affect your bank account balances. Regular reconciliation allows you to:

* Detect and prevent balance errors
* Identify potential fraud
* Track failed payments
* Ensure accurate financial records

The key objectives of reconciliation are to:

* Verify that merchants receive all payments from successful Yuno transactions
* Ensure compliance with payment terms between merchants and acquirers  
* Monitor acquisition processing costs and validate them against agreed terms
* Maintain data integrity and accurate transaction states in the Yuno dashboard

For best results, perform reconciliation daily. If daily reconciliation isn't feasible, aim to reconcile weekly or at minimum monthly.

## How Yuno facilitates reconciliation

Yuno provides a comprehensive transaction reconciliation process that helps you:

* Ensure proper payment accreditation
* Verify compliance with payment terms 
* Track processing costs

Our system orchestrates and manages data from Yuno, partners, and merchants to execute accurate reconciliation.

### Reconciliation status

Each transaction can have one of the following reconciliation statuses:

| Status           | Description                                                                                                               |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------ |
| Reconciled       | The transaction was found in the provider's settlement and will be credited to your bank account                          |
| Non reconcilable | The transaction cannot be reconciled as it doesn't meet reconciliation criteria. No further action will be taken          |
| Not reconciled   | The transaction is pending identification in a settlement. Check the sub-status to see if it's still within payment terms |
| Conflict         | A matching transaction was found in the settlement but has discrepancies with the processed record                        |

### State machine

<Image align="center" src="https://files.readme.io/97f552819f904bc8f051368a96b35d3736028a84fce9fc4be65e08ef3811df5a-report_reconciliation3_1.png" />

### Reports

Yuno provides two reconciliation reports:

1. **Transaction reconciliation report**
   * Shows reconciliation status and sub-status
   * Includes reconciliation ID for each transaction

2. **Settlement report** 
   * Lists all transactions in bank transfers to your account
   * Includes reconciliation details for each transaction