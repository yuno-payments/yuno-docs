---
title: Network Tokens
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
Network tokens represent a significant advancement in the payment processing industry, acting as digital surrogates for sensitive payment card details, including credit card numbers. Issued by payment networks such as Visa, Mastercard, and American Express, these tokens are at the forefront of enhancing transaction security within our evolving digital landscape.

<Image align="center" src="https://files.readme.io/12b72d4-desktop_Network_token_2.png" />

### Benefits of network tokens

* **Enhanced security**: By replacing actual card data during transactions, network tokens play a crucial role in strengthening security measures, significantly reducing the risk of exposure to potential fraud.
* **Seamless integration**: With minimal integration efforts adhering to EMVCo's network token standards, our solution ensures a seamless and efficient implementation process, allowing for quick adaptation within various payment scenarios.
* **Automatic updates**: Network tokens, managed and updated automatically by card networks, contribute to a reduction in shopper friction and declined payments. This inherent adaptability ensures a higher authorization rate compared to transactions without network tokens.

## One-time use token vs vaulted token vs network token

| One-time use token                                                                                                                                                                                                                                                                                                                                             | Vaulted token                                                                                                                                                                                           | Network token                                                                                                                                                                                                                                                                                                                                     |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| While using Yuno's SDK, we gather all the necessary information to process the payment and store it in a one-time use token, regardless of the customer's chosen payment method. You will use the token when creating the payment. Note that this token only works one time. You will need to generate a new one-time token for each checkout session created. | A vaulted token is created by Yuno once a payment method is enrolled and stored with the customer information. You can use the created vaulted token to identify the payment method in future payments. | Digitized representations of sensitive payment card information, such as credit card numbers, issued by major payment networks like Visa, Mastercard, or American Express. These tokens serve the purpose of substituting actual card data in transactions, thereby enhancing security by minimizing exposure to potential fraudulent activities. |

When the network tokens feature is enabled, Yuno generates network tokens for all cards enrolled and securely stored in our vault. This approach is fully aligned with how network tokenization is intended to work, as defined by Visa and Mastercard after the card validation — ensuring better performance, security, and reliability in recurring and future transactions. Cards not stored in Yuno — such as one-time use cards — are naturally excluded from this process, since network tokenization is not applicable in those cases.

## Network tokens lifecycle

Network tokens can have the statuses described in the section below.

<Image align="center" src="https://files.readme.io/654f542-Image_-_nico2.png" />

| Status    | Description                                                                                                                  |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Created   | The initial status of a network token that has been created.                                                                 |
| Active    | The network token is active and can be used to make a payment.                                                               |
| Suspended | Tokens may be suspended if the cardholder contacts the issuer and requests that payments from a particular merchant be blocked. |
| Canceled  | Tokens may be canceled for various reasons, such as the cardholder account associated with the token being closed.            |

## Types of integration

To make payments with network tokens, you have two available options:

1. Let Yuno provision and collect network tokens.
2. Use your existing network tokens.

### 1. Let Yuno provision and collect network tokens

We procure network tokens from leading card networks, including Visa, Mastercard, and American Express. These tokens are securely stored within the Yuno infrastructure and are used instead of the actual cards during the authorization process.

There is no need for additional integration to access the benefits of network tokenization when Yuno manages the solicitation and accumulation of tokens on your behalf. Simply follow the standard payment workflow corresponding to your specific card payment integration. Yuno seamlessly handles the process, substituting card details for a network token, resulting in increased authorization rates.

To activate payments using network tokens, please contact our support team to provision or request the necessary credentials.

#### Response example

During either the enrollment or payment creation, you will receive the basic information of the network token used in the corresponding operation.

```json
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
        "vaulted_token": "61d49d6e-7c0e-49d0-be79-7eb08871f998",
        "detail": {
           "card": {
               "network_token":{
                  "network":"MASTERCARD",
                  "status": "ACTIVE",
                  "par":"V0010014622074319305424002620",
                  "token_data":{
                    "iin":"45079900",
                    "lfd": "0010",
                    "expiration_month":"10",
                    "expiration_year":"2028",
                    "response":{
                      "code":"succeeded",
                      "message": "Transaction Succeeded"
                    }
                  }
              }
           }
        }
    }
  [...]
}
```

### 2- Use your existing network tokens

After setting up the necessary credentials in your Yuno account and contacting our support team, you will be ready to execute tokenized transactions seamlessly.

> ❗️
>
> With this option, Yuno acts only as a passthrough for the network token information. The merchant must provide the necessary information about the network tokens so Yuno can share them with upstream payment partners.

Network token transactions utilize existing payment transaction API requests. Similar to creating a payment with credit card details, when a merchant uses the Yuno API to finalize a payment, they can choose to include the "network_token" object to use a network token for the transaction.

#### Payment request fields

Along with the `card_data` object, these fields should be added to the `payment_method.detail.card.network_token.token_data` object for sending payments using Yuno's API.

| Field                           | Type   | Description                                                                                                                                                                                              |
| ------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `number`                        | number | \[Mandatory] - Token's number without any separators. (MAX 19; MIN 8) - only available for PCI certified merchants                                                                                       |
| `holder_name`                   | string | Cardholder's full name as it appears on the token (MAX 26; MIN 3) - only available for PCI certified merchants                                                                                           |
| `expiration_month`              | number | \[Mandatory] - Token's expiration month - MM (MAX 2; MIN 2) - only available for PCI certified merchants                                                                                                 |
| `expiration_year`               | number | \[Mandatory] - Token's expiration year - YYYY (MAX 4; MIN 4) - only available for PCI certified merchants                                                                                                |
| `cryptogram`                    | string | \[Mandatory] - The unique cryptogram generated by the issuer for the network token in use in the transaction. Optional for recurring transactions                                                        |
| `electronic_commerce_indicator` | string | \[Only required for certain providers] - If the token has been authenticated by Mastercard, the field should be set to 02. For Visa or non-authenticated tokens, it is not necessary to send the field. |
| `token_requestor_id`            | string | \[Only required for certain providers] - Token requestor ID of the merchant                                                                                                                              |

#### Request example

```json
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
        "detail": {
           "card": {
             "card_data": {
                "number": "4000000000001026",
                "holder_name": "John Doe",
                "expiration_month": 1,
                "expiration_year": 26,
                "security_code": "123"
              },
             "network_token":{
                  "token_data":{
                    "number":"4000000000001026",
                    "holder_name":"Jhohn Doe",
                    "expiration_month":1,
                    "expiration_year":26,
                    "cryptogram":"CCADBxYzRTBBXXXXXXXYZa0AbZD"
                  }
              }
           }
        }
    }
  [...]
}
```

#### Response example

```json
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
        "detail": {
           "card": {
              "card_data": {
                        "holder_name": "John Doe",
                        "iin": "48710499",
                        "lfd": "9910",
                        "number_length": 16,
                        "security_code_length": 3,
                        "brand": "VISABANCONTACT",
                        "issuer_name": "BNP PARIBAS FORTIS NVSA",
                        "issuer_code": null,
                        "country_code": "BE",
                        "category": "CLASSIC",
                        "type": "DEBIT",
                        "expiration_month": 3,
                        "expiration_year": 30,
                        "fingerprint": "4d486017-afa0-4f2c-ba51-a09af528bd38"
                        [...]
                    }, 
              "network_token":{
                  "network":"MASTERCARD",
                  "status": "ACTIVE",
                  "par":"V0010014622074319305424002620",
                  "token_data":{
                    "iin":"45079900",
                    "lfd": "0010",
                    "holder_name":"Jhohn Doe",
                    "expiration_month":10,
                    "expiration_year":28,
                    "response":{
                      "code":"succeeded",
                      "message": "Transaction Succeeded"
                    }
                  }
              }
           }
        }
    }
  [...]
}
```