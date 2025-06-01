---
title: Reconciliations (New draft)
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
Reconciliation is a crucial process for comparing your transactions with the settlement documents issued by different providers. It helps identify and resolve discrepancies, ensuring that all processed transactions are accurately settled.

Yuno facilitates this by consuming settlement files from each provider. Our system then compares these intakes with the transactions processed by Yuno. This operational process verifies account balances with your acquirers, ensuring your records are consistent, up-to-date, and accurate.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3f66c409f3e0afed83ab7829398e5d88abb6696e587d3b1e32909f496400ba91-Reconciliations.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Why reconciliation matters

Discrepancies in payment processing are not uncommon. Factors like payment timing, deposits, and pending transactions can affect bank account results. The reconciliation process is vital for:

- **Detecting and preventing errors:** Identify and correct balance errors promptly
- **Identifying fraud:** Uncover potentially fraudulent activities
- **Tracking failed payments:** Monitor and manage transactions that have not completed successfully

The primary goals of reconciliation within Yuno are to:

- Ensure you receive all payments from successful transactions processed by Yuno
- Maintain compliance with the payment terms agreed upon with acquirers
- Control acquisition processing costs effectively
- Guarantee transactional integrity and accurate status representation in the Yuno dashboard

It's best to perform reconciliation as frequently as possible (ideally daily), but weekly or monthly reconciliation is also beneficial.

## How Yuno facilitates reconciliation

Yuno offers a comprehensive transaction reconciliation process designed to ensure accurate accreditation, adherence to payment terms, and control over processing costs. We manage the orchestration of all relevant data from Yuno, our partners, and your merchant systems to execute these conciliation processes efficiently.

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

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/97f552819f904bc8f051368a96b35d3736028a84fce9fc4be65e08ef3811df5a-report_reconciliation3_1.png",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


### Deliveries

Yuno provides two key report types to support your reconciliation efforts:

- **Transaction reconciliation report**: These reports detail the reconciliation status, sub-status, and reconciliation ID for every transaction processed by Yuno
- **Settlement report**: These reports contain all transactions included in each bank transfer made to your merchant account by the acquirer, enriched with reconciliation information

## Navigating the reconciliations dashboard

The Reconciliations section in your Yuno dashboard provides a suite of tools to monitor and manage your transaction reconciliation. It is organized into several tabs, each offering specific views and functionalities.

**Common features: filters and exports**

Across many tabs in the Reconciliations section, you'll find powerful tools to refine and utilize your data:

- **Filters:** Tabs feature an **Add filters** option. Common filter criteria include accounts, acquirer, country, date range, and providers, though specific options vary slightly depending on the tab. This allows you to narrow down the displayed information to focus on what's most relevant to your current task.
- **Exports:** Several tabs include an **Export** button. This functionality allows you to download the currently displayed data for reporting, offline analysis, or use in other systems. Export options often include naming the report and choosing between default or custom column selections. For instance, in the Settlements tab, you might find options for **Quick export** or **Downloads** and the ability to specify if you want a summary header or only the detailed data.

Exploring reconciliations:

### Overview

The Overview tab provides a high-level summary of your reconciliation activities and key metrics. It displays several key charts and data points to give you an instant understanding of your reconciliation status.

- **Reconciliation rate transactions:** This report provides a view of the overall success of your transaction reconciliation, illustrating trends over time
- **Reconciliation rate by provider:** This report shows reconciliation performance for each payment provider, highlighting their success rates and transaction volumes
- **Reconciliation rate by accounts:** This report details reconciliation success across your different merchant accounts, showing rates and transaction counts for each
- **Reconciliation rate by currency:** This report tracks reconciliation effectiveness for each transaction currency, displaying success rates and volumes  
  This tab supports data filtering as described in the "Common Features" section.

### Your transactions

This tab allows you to view a detailed list of your transactions. The main view displays columns such as status, sub-status, type, order ID, settlement transaction delay, transaction ID, and creation date. You can search for specific transactions and utilize the filtering and export functionalities.

Clicking on an individual transaction in the list opens a "Transaction detail" view. This detailed view displays comprehensive information about the transaction, including:

- Payment ID
- Transaction ID
- Order ID
- Creation date
- Type (e.g., Authorize)
- Payment method
- Provider
- Reconciliation date
- Status (e.g., Not reconciled)
- Sub-status (e.g., Pending)
- Transaction amount and currency

### Sales

The Sales tab focuses on sales-related data within the reconciliation process. It presents a list of transactions with columns such as payment ID, payment method type, payment method category, merchant order ID, merchant transaction ID, transaction ID, provider transaction ID, transaction type, authorization code, and acquirer.

### Advancements

The Advancements tab is designed for tracking and managing reconciliation related to advancements or financial operations. It displays a list of these operations with columns like UR key, operation ID, country, merchant ID, product ID, operation type, movement type, operation date, and operation settlement date.

### Settlements

The Settlements tab helps you track and manage your settlement batches. Select **Settlement Batch ID** to reveal a dropdown list of other specific criteria to search by, including options like authorization code, card brand, card IIN, card IFD, card type, cost of installment rate, customer ID, fee rate, FX rate, gross credit, or gross currency. After selecting your desired search field from this list and entering your search term, the system will display the relevant settlement information. This tab also supports data export.

### Agenda

The Agenda tab provides insights into your expected settlements. Key features include:

- A graph displaying the amount to be settled over time
- Information on top payment methods and top card brands

This tab supports exporting.

### Alerts

The Alerts tab enables you to configure and manage notifications for specific reconciliation events.

- You can view a list of existing alerts, showing details like name, alert type, description, creation date, last update date, provider, and country
- You can create new alerts by clicking the "Create new alert" button. You can define:
  - The name and description for the alert
  - The alert type (e.g., missing settlements)
  - Conditions such as the provider, country, and transaction type (debit/credit)
  - Email addresses to receive the alert notifications
  - Accounts to apply the alert

These tools in the Reconciliations section are designed to help you manage your payment settlements effectively, identify any issues quickly, and maintain accurate financial records.