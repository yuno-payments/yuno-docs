---
title: Reconciliations (new draft)
deprecated: false
hidden: true
metadata:
  title: Reconciliations
  description: >-
    Reconciliation is the process of comparing transactions with the documents
    issued by different providers. It provides information to resolve any
    discrepancies that have been discovered.
  robots: index
---
Reconciliation is a fundamental process that ensures financial accuracy across your entire payment ecosystem. By comparing transactions processed through Yuno with the official settlement files issued by each provider, you can identify discrepancies, validate payment flows, and maintain full control over your revenue.

Yuno automates this process end-to-end. We ingest settlement reports from all your payment providers and systematically match them against your transaction records. This enables you to verify balances with acquirers, confirm that every settlement aligns with your commercial agreements, and ensure that your financial data remains complete, accurate, and audit-ready.

<Image
  align="center"
  src="https://files.readme.io/3f66c409f3e0afed83ab7829398e5d88abb6696e587d3b1e32909f496400ba91-Reconciliations.
png"
/>

## Why reconciliation matters

Reconciling your payment data is a critical process to ensure that every transaction processed is correctly settled and accounted for. Misalignments between provider settlements and your transaction records can result in revenue leakage, compliance issues, or even fraud exposure.

At Yuno, we streamline and automate this process by ingesting settlement files directly from your payment providers. Our system matches each settlement entry against the corresponding transaction processed through Yuno—ensuring consistency between your operational records and financial outcomes.

### Core benefits of reconciliation

* **Error detection & resolution:** Catch and correct mismatches before they impact your accounting.
* **Fraud prevention:** Identify suspicious or unauthorized payment behavior.
* **Operational visibility:** Gain clarity on pending, failed, or partially settled transactions.
* **Cost control:** Ensure fees and deductions align with your negotiated commercial terms.
* **Compliance assurance:** Maintain alignment with acquirer agreements and financial reporting standards.

Daily reconciliation is ideal, but even weekly or monthly reviews provide substantial value.

## How Yuno powers best-in-class reconciliation

Yuno provides an end-to-end reconciliation infrastructure built to meet the needs of modern merchants. Our system orchestrates data across multiple sources—Yuno's own transaction engine, payment providers, and your internal systems—to ensure accurate matching, issue detection, and reporting at scale.

### Reconciliation status

Transactions within Yuno can have several statuses related to the reconciliation process:

| Reconciliation Status | Description                                                                                                                                                            |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RECONCILED            | The transaction was identified in a provider's settlement file and is confirmed to be credited to your bank account                                                    |
| NON RECONCILABLE      | The transaction does not meet the criteria for reconciliation. It will not be processed further, and no additional action will be taken                                |
| NOT RECONCILED        | The transaction is still pending identification in a settlement file. The sub-status will indicate if it remains within the expected payment term                      |
| CONFLICT              | A counterpart for the transaction was found in the settlement file, but there's a discrepancy (e.g., in amount or currency) with the original record processed by Yuno |

### State machine

The following diagram illustrates the lifecycle of a transaction through the reconciliation statuses:

<Image align="center" src="https://files.readme.io/97f552819f904bc8f051368a96b35d3736028a84fce9fc4be65e08ef3811df5a-report_reconciliation3_1.png" />

## Navigating the Reconciliations dashboard

The Reconciliations section within the Yuno Dashboard is your command center for tracking and managing transaction matching. It's structured into intuitive tabs, each offering a specific view of the reconciliation lifecycle.

### Universal features across Tabs:

* **Dynamic filters:** Filter by provider, account, country, date range, and more to refine your analysis.
* **Custom exports:** Download filtered data sets with flexible column selection for offline reporting, BI integration, or audit support.

### Dashboard tabs

#### Overview

A high-level snapshot of your reconciliation performance:

* **Reconciliation Rate - Transactions:** Track success trends over time.
* **By Provider:** Assess provider-specific reconciliation performance.
* **By Account:** Compare success rates across your merchant accounts.
* **By Currency:** Understand currency-based discrepancies and volumes.

#### Sales

Review every transaction processed by Yuno, enriched with reconciliation indicators that show whether the provider has correctly reported them.

Compare transaction records between Yuno and your providers to identify discrepancies.

#### Your transactions

Analyze all processed transactions alongside their corresponding reconciliation status.

Cross-reference your Yuno transactions with provider settlement data to ensure complete accuracy.

Clicking a transaction opens the Transaction Detail view for granular insights.

#### Agenda

Forecast upcoming settlements based on credit, debit, and installment cycles. Understand which transactions have been processed but not yet settled.

View your settlement calendar to track when providers will process pending transactions.

#### Advancements

Monitor early fund disbursements made by providers based on expected settlements.

Track early funding opportunities and liquidity advances from your payment providers.

#### Settlements

Track confirmed settlements, standardized to Yuno's unified format for cross-provider consistency.

Reconcile actual settlement batches against your transaction records for complete financial clarity.

#### Fees

Validate the fees charged by providers by comparing them with your commercial agreements. Configure expected fees in the Connections section to automate this check.

Monitor fee discrepancies by comparing charged amounts against your negotiated commercial terms.

#### Alerts

Stay proactively informed with configurable alerts for reconciliation events.

From the Alerts tab, you can:

* View existing alerts with detailed metadata (type, provider, country, etc.)
* Create new alerts by defining:
  * The name and description for the alert
  * The alert type (e.g., missing settlements)
  * Conditions such as the provider, country, and transaction type (debit/credit)
  * Email addresses to receive the alert notifications
  * Accounts to apply the alert

At Yuno, we believe reconciliation should be seamless, automated, and deeply insightful. Our tools are designed to empower finance, operations, and product teams to maintain unmatched accuracy and control over payment flows—no matter how complex your setup.

Get started with Yuno's reconciliation tools today and ensure every cent is exactly where it should be.