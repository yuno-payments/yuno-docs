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

**Account Funding Transactions (AFT)** are financial transactions that facilitate the transfer of funds between payment accounts. They are widely used to load or top up user accounts, digital wallets, perform internal fund transfers within a payment platform.

AFTs are a core component of payment orchestration systems, enabling efficient and secure movement of money across accounts.

## What is an AFT?

An **AFT (Account Funding Transaction)** is a type of transaction designed for:

* **Loading funds** into user accounts or digital wallets.
* **Transferring funds** between accounts within the same platform.
* **Depositing money** into commercial or personal accounts. Remittances included.

AFTs leverage traditional payment networks (e.g., Visa, Mastercard, ACH) to process transactions quickly and securely while optimizing costs.

### Types of AFT Transactions

1. **Funding transactions**:
   * Transfer funds into an account from a debit/credit card or bank account.
   * Example: A user loads their digital wallet using their debit card.

2. **Withdrawal transactions**:
   * Move funds from a user account back to their bank account or card.
   * Example: A user transfers money from their digital wallet to their bank account.

## Integration

To perform an AFT, you will need to send a request to our [Payments API](ref:create-payment) with the `additional_data.order.account_funding` object specifying the `sender` and`beneficiary` data.

Each credit card scheme might require different information about the recipient and the sender, depending on the operating region and transaction category.

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