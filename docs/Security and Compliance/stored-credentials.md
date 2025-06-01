---
title: Stored Credentials
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
Depending on how and when a payment is being processed, it can be considered to have two different origins: Customer Initiated Transactions (CIT) or Merchant Initiated Transactions (MIT).

To guarantee the responsible storage and utilization of cardholder information, Visa and Mastercard have implemented guidelines and regulations for stored credentials.

We have simplified the process for you to adhere to these scheme rules, allowing you to securely store card details in Yuno for future use while ensuring compliance.

- Categorization
- General considerations
- Create a payment
- Subscription Agreement Id
- Network Transaction ID

## Categorization

|                | **CIT**                                                                                                                                                                              | **MIT**                                                                                                                                                                                                                        |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Definition     | Customer-Initiated Transactions (CIT) are transactions in which the customer actively initiates the transaction, such as online purchases, in-store purchases, ATM withdrawals, etc. | Merchant-Initiated Transactions (MIT) are transactions in which the merchant or service provider initiates the transaction without active involvement from the customer.                                                       |
| Examples       | Online purchases, in-store purchases, ATM withdrawals, etc.                                                                                                                          | Recurring payments, automatic subscription renewals, recurring billing, etc.                                                                                                                                                   |
| Authentication | Generally, these transactions require cardholder authentication to ensure security.                                                                                                  | Only an initial authentication by the customer is necessary the later create merchant initiated transactions. Additional authentication may be required depending on security regulations and the policies of the card issuer. |

Defining whether a transaction is initiated by the merchant or the customer has significant implications for security, user experience, fraud prevention, and regulatory compliance. This ensures an efficient and secure payment process for all parties involved.

## General Considerations

- **Responsibility**: In the context of Strong Customer Authentication (SCA) under PSD2 regulation in the European Union, CIT generally requires higher authentication compared to MIT.
- **Frequency**: MIT transactions are often recurring and periodic, while CIT are more ad hoc events based on customer actions.

## Create a payment with processing type

In order to indicate a [payment](ref:create-payment) specifying the processing type, use the structure `stored_credentials` inside the `payment_method.detail.card` while creating a payment.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "`reason`",
    "0-1": "enum",
    "0-2": "Indicates the store credentials reason for the transaction.  \n`CARD_ON_FILE`  \n`SUBSCRIPTION`  \n`UNSCHEDULED_CARD_ON_FILE`",
    "1-0": "`usage`",
    "1-1": "enum",
    "1-2": "A credit card could be stored with or without a first initial payment. This field Iets you indicate if this is the first time the vaulted_token/network_token is used for a payment or if it has already been used for a previous payment.  \n`FIRST`  \n`USED`",
    "2-0": "`subscription_agreement_id`",
    "2-1": "string",
    "2-2": "ID of the agreement with the customer mandatory for certain markets (MX for example)",
    "3-0": "`network_transaction_id`",
    "3-1": "string",
    "3-2": "The ID provided by Visa/Mastercard in the response of the initial payment, which is highly recommended for future use in Merchant Initiated Transactions (MIT)."
  },
  "cols": 3,
  "rows": 4,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]

Store credential reasons

| Reason                     | Description                                                                                                                                                                    |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CARD_ON_FILE`             | A customer-initiated payment using a previously enrolled credit card where the cardholder is present. Allow customers one-click payment for a frictionless payment experience. |
| `SUBSCRIPTION`             | A merchant-initiated payment as part of a subscription schedule and with a set amount. Payments are processed in regular intervals to which the user has given consent.        |
| `UNSCHEDULED_CARD_ON_FILE` | A merchant initiated payment using stored credit card details that is not related to a subscription schedule or amount. Payment that could happen at any given time.           |

### Request Example

```curl Request (cURL)
curl --request POST \
     --url https://api-sandbox.y.uno/v1/payments \
     --header 'X-Idempotency-Key: <Your idempotency-key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <Your private-secret-key>' \
     --header 'public-api-key: <Your public-api-key>' \
     --data '
{
    "description": "Test",
    "account_id": "{{account-code}}",
    "merchant_order_id": "0000023",
    "country": "DE",
    "merchant_reference" : "reference-{{$randomUUID}}",
    "amount": {
        "currency": "EUR",
        "value": 5000
    },
    "customer_payer": {
        "id":"967ecd18-d898-4b88-9400-dd5b01b18edc"
    },
    "workflow": "DIRECT",
    "payment_method": {
        "type":"CARD",
        "vaulted_token": "eb8caa17-6407-457b-960e-125d8d7a90c1",
        "detail": {
           "card": {
               "stored_credentials":{
                  "reason":"CARD_ON_FILE",
                  "usage": "USED"
              }
           }
        }
    }
}
'
```

## Subscription Agreement

For certain markets (MX for example) and payment processors, when a subscription-related payment is made, the ID of the agreement with the customer needs to be specified in the payment request to ensure correct processing. To facilitate this, we have enabled the `subscription_agreement_id` field inside the `stored_credentials` struct, allowing you to share the agreement made with the customer.

```json
"payment_method": {
        "type":"CARD",
        "vaulted_token": "eb8caa17-6407-457b-960e-125d8d7a90c1",
        "detail": {
           "card": {
               "stored_credentials":{
                  "reason":"CARD_ON_FILE",
                  "usage": "USED",
                  "subscription_agreement_id":"AA0001"
              }
           }
        }
    }
```

## Network Transaction ID

Is a unique identifier assigned to a transaction by the card network. It is used to track and reference specific transactions, particularly in recurring payment scenarios, ensuring consistency and traceability across the payment lifecycle.

If the transaction is customer-initiated (CIT), the Network Transaction Reference will be available in the `card.stored_credentials.network_transaction_id` field, representing the transaction ID for VISA and the traceID for Mastercard that are recommended for future subscription payments.

```json
"payment_method": {
        "type":"CARD",
        "vaulted_token": "eb8caa17-6407-457b-960e-125d8d7a90c1",
        "detail": {
           "card": {
               "stored_credentials":{
                  "reason":"CARD_ON_FILE",
                  "usage": "USED",
                  "network_transaction_id":"583103536844189"
              }
           }
        }
    }
```

### Usage

We associate the `network_transaction_id` to the `vaulted_token` for future transactions so you don't have to manage the logic for each case. We will do the association when a payment is created with:

- _Payment method_:
  - A card`vaulted_token` or
  - card data with `vault_on_success` in `true`
- _Stored credentials_:
  - `usage` with `FIRST` value.

If you already have the `network_transaction_id` for the card you can send it in the payment as well in the corresponding field, if not, for MIT payments (with stored_credentials.usage=USED) we will send the `network_transaction_id` associated to the `vaulted_token` to the provider.

> ❗️
>
> Remember to specify the usage in the stored_credentials section, as we trigger the network_transaction_id logic based on those fields.