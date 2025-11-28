# **API Documentation for Declined Payment Calls**

This document describes the endpoint /declined-payments/external which is used to initiate the process of handling calls related to declined payments in a massive way. The endpoint receives an array with detailed information about the rejected payments.

## *Request*

(POST) [https://api-sandbox.y.uno/v1/](https://api-sandbox.y.uno/v1/ai-caller/decline-payments)smart-support/external/payments/recover

```json
{
    "settings": {
        "contact_details": {
            "channel": "PHONE_CALL",
	     "initia_template_message": {
   "id": "HX8e7ac569f40a064c71a37e5d672bb9123",
   "variables": {
   	"name": "Maria",
       "amount": "$10.0000"
   }
     },
            "payment_methods": {
                "available": [
                    "MERCADO_PAGO",
                    "NEQUI"
                ]
            }
        }
    },
    "additional_information": {
        "seller_details": {
            "name": "RAPPI",
            "fallback_instructions": "Go to the application and click on the top right corner to contact a customer support agent."
            "redirection_url": "www.test.com/purchase"
        },
        "payment": {
            "account_id": "e4c03f29-b0f6-403a-8814-9aee1a88d60e",
            "id": "f1fbad16-93c1-4335-b735-2b01ec94ea9e",
            "merchant_order_id": "MX_Verification_50708779",
            "country": "CO",
            "description": "Purchase in McDonalds",
            "created_at": "2022-05-09T20:46:54.786342Z",
            "declined_reason": "insufficient funds",
            "payment_method": {
                "type": "Credit Card",
                "detail": {
                    "card_data": {
                        "iin": "636318",
                        "lfd": "2671",
                        "type": "CREDIT",
                        "issuer": "SCOTIABANK",
                        "expiration_year": 2030,
                        "expiration_month": 12
                    }
                }
            },
            "amount": {
                "currency": "COP",
                "value": 27000
            },
            "customer_payer": {
                "first_name": "Pepito",
                "last_name": "Perez",
                "phone": {
                    "country_code": "57",
                    "number": "3132450765"
                }
            }
        }
    }
}
```

| Headers |  |  |  | Current Name |
| :---- | :---- | :---- | :---- | :---- |
| X-Public-Api-Key | string | Merchant’s public API Key. | gAAABidUg3BOa6BN-3ukNMoZhp13Q-T1afmllapA8Non8AcniVuYcVctqEyD\_IliLqc\_FPvsBzdb8bWX6farN-zJ\_JgMViXB21Vd2jWrzCY8UyBri\_Bmn\_EN-CTMbBs= | \- |
| X-Private-Secret-Key | string | Merchant’s Private Secret Key. | gAAABidUg3vX7bV-iXhV4rSXSoCvt-DuTDTd-1o-e8xPly6B8xymTtc1nYJtYDnI7S7KfPrhT\_y3rqGlefG-XUq7oSOwfxacZID9ZpOMVfyPuZeojWwk8u5n23A= | \- |
| **Parameter** | **Type** | **Description** | **Example** |  |
| A \-  settings | struct | AI agent configuration |  |  |
|    A.1 contact\_details |  | Object with the contact details |  |  |
|              channel\* | enum | The list of possible contact channels. PHONE\_CALL, WHATSAPP\_MESSAGE | WHATSAPP\_MESSAGE |  |
|           initial\_template\_message | struct | Initial template message configuration for WHATSAPP\_MESSAGE | HX8e7ac569f40a064c71a37e5d672bb9123 |  |
|                id | string | Yuno  template ID  |  |  |
|               variables | struct | Object with template’s variables | {     "name": "Maria",     "amount": "$10.0000" } |  |
|             payment\_methods | struct | Available payment methods for to offer the customer payer |  |  |
|                available \* | array | The list of available payment methods to be offered to the user as alternatives to complete the payment. | \[‘MERCADO\_PAGO. NEQUI, CREDIT\_CARD\] | External\_data.custom\_agent.target\_config.available\_payment\_methods  |
| additional\_infromation | struct | All relevant information to feed to the AI to improve context. |  |  |
|   A.2   seller\_details | struct | Object containing the merchant’s contact information to be used if the agent is unable to answer the inquiry. |  |  |
|              name\* | string | The merchant's name, used by the AI to introduce itself (MAX 255; MIN 3). | Rappi | External\_data.custom\_agent.config.merchant\_name  |
|         fallback\_instructions\* | string | Instruction to be provided to the user on how to contact customer support in case the AI can not solve the issue. (MAX 255; MIN 3). | Please contact customer support at the following number 3132450765 |  |
| B \-  payments | Array of objects |  |  |  |
|       account\_id\* | string | The unique identifier of the account (MAX 64 ; MIN 36\). |   2404911d-5df9-429e-8488-ad41abea1a4b  | No está en el request, pero para identificar el account, lo tenemos en varios endpoints |
|        id | string | The unique identifier of the payment (MAX 64 ; MIN 3\) | 5104911d-5df9-229e-8468-bd41abea1a4s | External\_data.payment.code  |
|       merchant\_order\_id\* | string | Identification of the Order (MAX 255; MIN 3\) | 432245 | External\_data.payment.order\_id |
|       country\* | enum | Country where the payment was processed.([ISO 3166-1](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) MAX 2; MIN 2\) | CO | External\_data.payment.country |
|      description\* | string | The description of product or service the user tried to purchase (MAX 1000; MIN 3\) | marketplace payment | External\_data.payment.description |
|     created\_at\* | timestamp | The timestamp of when the payment was made. ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) MAX 27; MIN 27\) | 2022-05-09T20:46:54.786342Z | External\_data.payment.created\_at |
|       declined\_reason\* | string | The declined reason for the payment provided by the payment provider. (MAX 255; MIN 3\) | Insufficient funds | external\_data.transactions.reject\_reason |
|      payment\_method | struct |  |  |  |
|             type\* | string | The type of payment method selected by the customer(MAX 255; MIN 3\) | Credit Card | external\_data.transactions.payment\_method.type |
|                     card\_data | struct |  |  |  |
|                       expiration\_month | number | Card’s expiration month \- MM (MAX 2; MIN 2\)  | 10 | external\_data.transactions.payment\_method.card\_expiration\_month |
|                       expiration\_year | number | Card’s expiration year \- YYYY  (MAX 4; MIN 4\)  | 2025 | external\_data.transactions.payment\_method.card\_expiration\_year |
|                        iin | number | The Institution identification number (IIN) refers to the first few digits of a payment card number issued by a [financial institution](https://www.investopedia.com/terms/f/financialinstitution.asp) (MAX 8; MIN 6\) | 45079900 | external\_data.transactions.payment\_method.card\_iin |
|                        lfd | number | Last four digits of the card (MAX 4; MIN 4\) | 0010 | external\_data.transactions.payment\_method.card\_lfd |
|                        issuer | string | Card issuer (MAX 255; MIN 3\) | Banco Galicia | external\_data.transactions.payment\_method.issuer\_name |
|                        type | string | Card’s issuer type. (MAX 255; MIN 3). Possible values: CREDIT, DEBIT or PREPAID | CREDIT | external\_data.transactions.payment\_method.card\_type |
|      amount | struct |  |  |  |
|          value\* | number | The amount of the payment that was declined. | 12100.00 | External\_data.payment.amount\_value |
|          currency\* | enum | The currency of the payment that was declined ([ISO 4217](https://docs.y.uno/reference/the-session-object#currency-code-list-iso-4217) MAX 3; MIN 3\) | COP | External\_data.payment.currency\_code |
|     customer\_payer | struct |  |  |  |
|       first\_name\* | string | The customer's first name(MAX 255; MIN 3\) | John | External\_data.customer\_payer.name |
|       last\_name | string | The customer's last name(MAX 255; MIN 3\) | Doe | External\_data.customer\_payer.name |
|       phone | struct |  |  |  |
|             country\_code\* | string | Customer Payer cell phone area code.(MAX 3; MIN 2\) | 57 | External\_data.customer\_payer.phone\_country\_code |
|             number\* | string | Customer payer cell phone number.(MAX 32; MIN 1\) | 3132450765 | External\_data.customer\_payer.phone\_number |

## 

## *Response*

HTTP STATUS 200

```json
{
   "id": "7c3a9c6e-9bf0-4c2c-9f67-752b16ba5dd5",
   "message": "Communication processed successfully"
}
```

HTTP STATUS 400

```json
{
   "message": "Missing customer_payer.first_name required field"
}
```

HTTP STATUS 500

```json
{
   "message": "Internal error"
}
```

| Fields | Type | Description | Example |  |
| :---- | :---- | :---- | :---- | :---- |
|              id | string | Communication ID generated from our system | 7c3a9c6e-9bf0-4c2c-9f67-752b16ba5dd5 |  |
|           message | string | Response description  | Missing customer\_payer.first\_name required field |  |

