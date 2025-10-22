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
Depending on how and when a payment is processed, it can originate from either customer-initiated transactions (CIT) or merchant-initiated transactions (MIT).

To ensure the responsible storage and use of cardholder information, Visa and Mastercard have established guidelines and regulations for stored credentials.

We have streamlined the process for you to comply with these scheme rules, enabling you to securely store card details in Yuno for future use while maintaining compliance.

* Categorization
* General considerations
* Create a payment
* Subscription agreement ID
* Network transaction ID

## Categorization

| Category           | Customer-initiated transactions (CIT)                                                              | Merchant-initiated transactions (MIT)                                                                                                                                            |
| :----------------- | :------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Definition**     | Transactions initiated by the customer, such as online and in-store purchases, or ATM withdrawals. | Transactions initiated by the merchant or service provider without the customer's active involvement.                                                                            |
| **Examples**       | Includes online purchases, in-store purchases, and ATM withdrawals.                                | Includes recurring payments, automatic subscription renewals, and recurring billing.                                                                                             |
| **Authentication** | Typically requires cardholder authentication to ensure security.                                   | Requires initial customer authentication to set up, with potential additional authentication based on security regulations and card issuer policies for subsequent transactions. |

Determining whether a transaction is initiated by the merchant or the customer has significant implications for security, user experience, fraud prevention, and regulatory compliance. This ensures an efficient and secure payment process for all parties involved.

## General considerations

* **Responsibility**: In the context of strong customer authentication (SCA) under PSD2 regulation in the European Union, CIT generally requires higher authentication compared to MIT.
* **Frequency**: MIT transactions are often recurring and periodic, while CIT are more ad hoc events based on customer actions.

## Create a payment with processing type

To specify a [payment](ref:create-payment) with a processing type, use the `stored_credentials` structure inside the `payment_method.detail.card` when creating a payment.

| Parameter                   | Type   | Description                                                                                                                                                                                                     |
| --------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reason`                    | enum   | Indicates the reason for storing credentials for the transaction. <br /> `CARD_ON_FILE` <br /> `SUBSCRIPTION` <br /> `UNSCHEDULED_CARD_ON_FILE`                                                                       |
| `usage`                     | enum   | A credit card can be stored with or without an initial payment. This field indicates if this is the first time the vaulted_token/network_token is used or reused. <br /> `FIRST` <br /> `USED` |
| `subscription_agreement_id` | string | The ID of the agreement with the customer, mandatory for certain markets (e.g., MX).                                                                                                                          |
| `network_transaction_id`    | string | The ID provided by Visa/Mastercard in the response of the initial payment, which is highly recommended for future use in merchant-initiated transactions (MIT).                                                 |

Store credential reasons

| Reason                     | Description                                                                                                                                                                    |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CARD_ON_FILE`             | A customer-initiated payment using a previously enrolled credit card where the cardholder is present. Allows customers one-click payment for a frictionless payment experience. |
| `SUBSCRIPTION`             | A merchant-initiated payment as part of a subscription schedule with a set amount. Payments are processed at regular intervals to which the user has given consent.        |
| `UNSCHEDULED_CARD_ON_FILE` | A merchant-initiated payment using stored credit card details that is not related to a subscription schedule or amount. Payment can occur at any given time.           |

### Request example

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

## Subscription agreement

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

## Network transaction ID

A network transaction ID is a unique identifier assigned to a transaction by the card network. It is used to track and reference specific transactions, particularly in recurring payment scenarios, ensuring consistency and traceability across the payment lifecycle.

If the transaction is customer-initiated (CIT), the network transaction reference will be available in the `card.stored_credentials.network_transaction_id` field. This field represents the transaction ID for Visa and the trace ID for Mastercard, which are recommended for future subscription payments.

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

We associate the `network_transaction_id` with the `vaulted_token` for future transactions, so you don't have to manage the logic for each case. We will perform the association when a payment is created with:

* *Payment method*:
  * A card `vaulted_token`, or
  * Card data with `vault_on_success` set to `true`
* *Stored credentials*:
  * `usage` set to `FIRST`

If you already have the `network_transaction_id` for the card, you can include it in the payment in the corresponding field. If not, for MIT payments (with `stored_credentials.usage=USED`), we will send the `network_transaction_id` associated with the `vaulted_token` to the provider.

> ❗️
>
> Remember to specify the usage in the `stored_credentials` section, as we trigger the `network_transaction_id` logic based on those fields.