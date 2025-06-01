---
title: Payments
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Payments
  description: >-
    On the Payments tab on the dashboard, you have access to all payments,
    transactions, and fraud screenings data from your payments. You can use this
    section to review any information related to them. In addition, you can use
    filters to refine your searches and configure and export reports.
  robots: index
next:
  description: ''
---
The Payments dashboard section shows all payments, transactions, fraud screening, and payout data. In addition, you can use filters to refine your searches and enjoy extensive configuration of exports and reports.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;">
  <video src="https://github.com/writechoiceorg/yuno-images/raw/main/doc/yourPaymentsOperationSystem/payments-v2.mp4" loop autoplay muted playsinline style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></video>
</div>
`}</HTMLBlock>

## Payments section breakdown

* **All payments**: This is the default view, showing all your payments, regardless of their status.
* **Batch refunds**: A convenient way to process all your refunds. Simply upload a CSV file to get started, a template is available from the dashboard.
* **All transactions**: View all transactions related to your payments.
* **All fraud screenings**: Verify potential fraudulent transactions through our dedicated fraud screenings view.
* **View all payouts**: Access and filter all payouts to easily find specific transactions.
* **Filters**: Select **Add filters** to narrow your search results. You can filter by status, country, date, payment method, and more.
* **Export reports**: Export customized data, schedule email reports, and download previous exports. CSV downloads are perfect for file sharing and team analysis.
* **Review payment information**: Click any transaction to view detailed information. Payments will include the customer payer's information, payment method, and the transaction timeline associated with the payment.

The Payments section is a powerful tool to simplify payment-related tasks and help you manage your payments more effectively. Take some time to explore the section and see how it can help you.

<Image align="center" src="https://files.readme.io/d7ac0ba24083af55ea569d9203a1a08a9823460533060340e57d2c82856a8625-Payments.png" />

## Batch refunds

The batch refund feature allows you to process refunds for several transactions simultaneously, saving time and effort. You can refund up to 1000 payments at once.

 To execute batch refunds, access the **All payments** tab and select **Batch refunds → Upload**. From here, upload a CSV file with your refunds. You can download a sample file to help with the formatting. For each payment to refund, you should inform:

* Payment ID
* Transaction ID
* Amount to refund
* Currency
* Merchant reference
* Reason (`DUPLICATE`, `FRAUDULENT`, or `REQUESTED_BY_CUSTOMER`)

The sample file is also available [here](https://dashboard-assets.y.uno/samples-files/Batch_refunds_sample_file.xlsx).

After uploading the file, you can track the refund status of each payment by accessing **All payments** and selecting **Batch refunds → Overview**.

## Exporting Data

Click the **Export** button to see three tabs, each giving you specialized control over your data exports:

**Quick export**: Select a specific date range and customize the columns visible in the export.\
**Scheduled reports**: Configure a report to send periodically to your email address. You may also set the columns to export.\
**Downloads**: Previous reports are saved in this tab for easy download.
