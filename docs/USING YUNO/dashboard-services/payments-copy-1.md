---
title: Payments (COPY)
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
On the Payments tab on the dashboard, you can access all payments, transactions, and fraud screenings data from your payments. You can use this section to review any information related to them. In addition, you can use filters to refine your searches and configure and export reports. 

The Payments tab is your central hub for all things payments.

[block:html]
{
  "html": "<div style=\"background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;\">\n  <video src=\"https://github.com/writechoiceorg/yuno-images/raw/main/doc/yourPaymentsOperationSystem/payments.mp4\" loop autoplay muted playsinline style=\"width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);\"></video>\n</div>"
}
[/block]


Here's a breakdown of what you can do in the Payments tab:

- **View all of your payments**: This is the default view, showing all your payments, regardless of their status.
- **Filter your payments**: You can use filters to narrow your search results. For example, you can filter by status, amount, date, or payment method.
- **Export reports**: Export your payment or transaction data to a CSV file. This is a great way to share your data with others or to use it for analysis.
- **Review payment information**: You can view detailed information about each payment, including the customer payer's information, payment method, and the transaction timeline associated with the payment.
- **Track each transaction**: Change to the transactions view to access all transaction information related to your payments.
- **Check fraud screenings**: Verify potential fraudulent transactions through the dedicated fraud screenings view.

The Payments tab is a powerful tool to help you manage your payments more effectively. Your payment-related tasks are now simplified and more efficient than ever. Take some time to explore the tab and see how it can help you.

## Batch refunds

You can perform batch refunds directly through the Payment dashboard. The batch refund feature allows you to process refunds for several transactions simultaneously, saving time and effort. Instead of processing refunds individually, you can list all transactions and initiate the refunds simultaneously.

You can refund up to 1000 payments at once. To execute the batch refunds, access the Payments tab in the dashboard,  select **Batches refunds → Upload**, and upload the payment list through a CSV file. For each payment to refund, you should inform:

- Payment ID
- Transaction ID
- Amount to refund
- Currency
- Merchant reference
- Reason (`DUPLICATE`, `FRAUDULENT`, or `REQUESTED_BY_CUSTOMER`)

You can download a sample file using [here](https://dashboard-assets.y.uno/samples-files/Batch_refunds_sample_file.xlsx).

After uploading the file, you can track the refund status of each payment by accessing Payments and selecting **Batches refunds → Overview**.