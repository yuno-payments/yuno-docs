---
title: Create Payment with Payment Method Split
excerpt: ''
api:
  file: payments-api-split.json
  operationId: create-payment-with-payment-method-split
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
The Payment Method Split allows the customer to split the payment between two or more different payment methods. Customers can choose this form of split payment for different reasons. With this type of payment, one payment has multiple transactions associated with covering the total amount.

> 📘 Disclaimers:
>
> * Only available for: 
>   * Card Payment Methods.
>   * DIRECT workflow. Meaning back to back integration not using Yuno's SDK.
> * Secondary transactions, as captures or refunds, work the same as in a regular payment, so you'll have to reference the transaction you want to capture or refund following the corresponding documentation.

Handling different payment statuses for an order is complicated, that is why with our *Payment method Split* you can handle the payment status according to different situations with the field `reverse_on_decline`.

`reverse_on_decline:true`: All the transactions of the payment need to be approved in order to obtain a final SUCCEEDED status for the payment. 

> Example with two cards:\
> 1- If the first transaction is declined, we do not attempt the second one and the payment is set as DECLINED.\
> 2- If the first transaction is approved and the second one is declined, we reverse the first one and the payment status is set as DECLINED.

`reverse_on_decline: false`: If one of the transactions is declined, we continue with the other ones so you can later decide whether to refund the approved transactions, charge your client via a different method, keep the debt, etc. If all the transactions are declined, the payment status is set as DECLINED, but if not, we create a new payment substatus called PARTIALLY\_APPROVED to indicate that one of the transactions was approved. 

> Example with two cards:\
> 1- Regardless of the status of the first transaction, we continue with the second one.\
> 2- If both the first and second one are declined, then the payments is set as DECLINED, but if one of them is successful, then the payments is set as SUCCEEDED/PARTIALLY\_APPROVED.
