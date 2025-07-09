---
title: Account Funding Transactions (AFTs)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
## Introduction

Account funding transactions (AFTs) are financial operations that enable the transfer of funds between payment accounts. They are commonly used to load or top up user accounts, digital wallets, or to perform internal fund transfers within a payment platform.

AFTs play a key role in payment orchestration systems, allowing for efficient and secure movement of money across different accounts.

## What is an AFT?

An account funding transaction (AFT) is a specific type of transaction used for:

* **Loading funds** into user accounts or digital wallets.
* **Transferring funds** between accounts within the same platform.
* **Depositing money** into commercial or personal accounts, including remittances.

AFTs use established payment networks (such as Visa, Mastercard, or ACH) to process transactions quickly, securely, and cost-effectively.

### Types of AFT transactions

Account funding transactions (AFTs) can be categorized into two main types, depending on the direction of the fund movement:

1. **Funding transactions**  
   Transfer funds into an account from a debit card, credit card, or bank account.  
   *Example: A user loads their digital wallet using their debit card.*

2. **Withdrawal transactions**  
   Move funds from a user account back to their bank account or card.  
   *Example: A user transfers money from their digital wallet to their bank account.*

## Integration

To perform an AFT, send a request to the [payments API](ref:create-payment) including the `additional_data.order.account_funding` object. This object must specify both the `sender` and `beneficiary` details.

> **Note:**  
> The required information for the sender and beneficiary may vary depending on the card scheme, region, and transaction type.

```Text Example
[...]
 "additional_data": {
   "order": {
    "account_funding": {
      "sender": {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@mail.com"
      },
      "beneficiary": {
        "first_name": "Chris",
        "last_name": "Martin",
        "document": {
          "document_number": "38192019",
          "document_type": "CC"
        }
      }
     }
    }
  }
[...]
```

For more details, refer to the create [payments API](ref:create-payment) section.

> 📘 Additional Data
>
> In case you need to define additional information about the seller, such as `merchant_category_code`for example, you can find extra fields in the seller\_details inside the [additional\_data struct](ref:the-payment-object) in the payment.