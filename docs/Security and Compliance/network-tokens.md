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
Network tokens represent a pivotal advancement in the of payment processing industry, acting as digital surrogates for sensitive payment card details, including credit card numbers. Issued by payment networks such as Visa, Mastercard and American Express, these tokens are at the forefront of enhancing transaction security within our evolving digital landscape.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/12b72d4-desktop_Network_token_2.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


### Benefits of Network Tokens:

- _Enhanced Security_: By replacing actual card data during transactions, network tokens play a pivotal role in fortifying security measures, significantly reducing the risk of exposure to potential fraud.
- _Seamless Integration_: With minimal integration efforts adhering to EMVCo's network token standards, our solution ensures a seamless and efficient implementation process, allowing for quick adaptation within various payment scenarios.
- _Automatic Updates_: Network tokens, managed and updated automatically by card networks, contribute to a reduction in shopper friction and declined payments. This inherent adaptability ensures a higher authorization rate in comparison to transactions without network tokens.

## On-time use token vs Vaulted token vs Network Token

| One-time Use Token                                                                                                                                                                                                                                                                                                                                             | Vaulted Token                                                                                                                                                                                           | Network Token                                                                                                                                                                                                                                                                                                                                     |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| While using Yuno's SDK, we gather all the necessary information to process the payment and store it in a One Time Use Token, regardless of the customer's chosen payment method. You will use the token when creating the payment. Note that this token only works one time. You will need to generate a new one-time token for each checkout session created. | A Vaulted Token is created by Yuno once a payment method is enrolled and stored with the customer information. You can use the created Vaulted Token to identify the payment method in future payments. | Digitized representations of sensitive payment card information, such as credit card numbers, issued by major payment networks like Visa, Mastercard, or American Express. These tokens serve the purpose of substituting actual card data in transactions, thereby enhancing security by minimizing exposure to potential fraudulent activities. |

When the network tokens feature is enabled, Yuno generates network tokens for all cards enrolled and securely stored in our Vault. This approach is fully aligned with how network tokenization is intended to work, as defined by Visa and Mastercard after the card validation — ensuring better performance, security, and reliability in recurring and future transactions. Cards not stored in Yuno — such as one-time use cards — are naturally excluded from this process, since network tokenization is not applicable in those cases.

## Network tokens Lifecycle

Network tokens can have the statuses described in the section below.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/654f542-Image_-_nico2.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


<br />

[block:parameters]
{
  "data": {
    "h-0": "STATUS",
    "h-1": "Description",
    "0-0": "CREATED",
    "0-1": "The initial status of a network token that has been created",
    "1-0": "ACTIVE",
    "1-1": "The network token is active and can be used to make a payment.",
    "2-0": "SUSPENDED",
    "2-1": "Tokens may be suspended if the cardholder calls the issuer and requests that  payments from a particular merchant be blocked",
    "3-0": "CANCELED",
    "3-1": "Tokens may be cancelled for various reasons, such as the cardholder account associated with the token  \nhas been closed."
  },
  "cols": 2,
  "rows": 4,
  "align": [
    "left",
    "left"
  ]
}
[/block]


## Types of integration

To make payments with network tokens, you have two available options:

1. Let Yuno provision and collect network tokens. 
2. Use your existing network tokens. 

### 1- Let Yuno provision and collect network tokens

We procure network tokens from leading card networks including Visa, Mastercard, and American Express. These tokens are meticulously safeguarded within the Yuno infrastructure and are used instead of the actual cards during the authorization process.

There is no need for additional integration to access the advantages of network tokenization when Yuno manages the solicitation and accumulation of tokens on your behalf. Simply adhere to the standard payment workflow corresponding to your specific card payment integration. Yuno seamlessly handles the process, adeptly substituting card details for a network token, resulting in heightened authorization rates.

To activate payments using network tokens, kindly contact our Support Team to provision or request the necessary credentials. 

#### Response example

Either during the enrollment or payment creation, you will receive the basic information of the Network token used in the corresponding operation. 

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
  ...
}
```

### 2- Use your existing network tokens

After establishing the corresponding credentials in your Yuno account and contacting our Support team, you'll be prepared to execute tokenized transactions seamlessly.

> ❗️ 
> 
> With this option, Yuno operates only as a passthrough for the network token information. The merchant will need to send the necessary information about the network tokens so Yuno can share them with upstream payment partners.

Network token transactions make use of existing payment transaction API requests. Similarly to the process of creating a payment with credit card details, when a merchant employs the Yuno API to finalize a payment they can opt to include the "network_token" object to endeavor the utilization of a network token for the transaction.

#### Payment Request Fields

Together with the `card_data` object, these fields should be added to the `payment_method.detail.card.network_token.token_data` object for sending payments using Yuno's API. 

[block:parameters]
{
  "data": {
    "h-0": "Field",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "number",
    "0-1": "number",
    "0-2": "[Mandatory] - Token’s number without any separators.  \n(MAX 19; MIN 8) - only available for PCI certified merchants",
    "1-0": "holder_name",
    "1-1": "string",
    "1-2": "Cardholder’s full name as it appears on the Token (MAX 26; MIN 3) - only available for PCI certified merchants",
    "2-0": "expiration_month",
    "2-1": "number",
    "2-2": "[Mandatory] - Token’s  expiration month - MM (MAX 2; MIN 2) - only available for PCI certified merchants",
    "3-0": "expiration_year",
    "3-1": "number",
    "3-2": "[Mandatory] - Token’s  expiration year - YYYY  (MAX 4; MIN 4) - only available for PCI certified merchants",
    "4-0": "cryptogram",
    "4-1": "string",
    "4-2": "[Mandatory] - The unique cryptogram generated by the issuer for the network token in use in the transaction. Optional for recurring transactions",
    "5-0": "electronic_commerce_indicator",
    "5-1": "string",
    "5-2": "[Only required for certain providers] - In case the token has been authenticated by Mastercard the field should be set to 02. For Visa or not authenticated tokens, is not necessary to send the field.  ",
    "6-0": "token_requestor_id",
    "6-1": "string",
    "6-2": "[Only required for certain providers] - Token requestor ID of the merchant"
  },
  "cols": 3,
  "rows": 7,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


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
  ...
}
```