---
title: Payment Amount Details
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
Yuno’s API allows you to structure payment amounts flexibly, so you can clearly define each component that makes up the total transaction value. You can specify base charges, taxes, fees, tips, shipping, and discounts. This ensures transparency for both you and your customers.

Below, you will find how to include each component in your payment requests:

* [Fee](doc:payment-amount-details#fee-amount)
* [Shipping](doc:payment-amount-details#shipping-amount)
* [Tips](doc:payment-amount-details#tips)
* [Taxes](doc:payment-amount-details#taxes)
* [Discounts](doc:payment-amount-details#discounts)

By itemizing these elements, you provide a clear breakdown of the payment amount, making the payment process more transparent and convenient for everyone involved.

## Fee amount

You can use the `additional_data.order.fee_amount` field to specify the fee amount included in the transaction.

In the example below, a request shows that a 180 JPY fee is part of a 5,000 JPY total transaction. This field is for informational purposes only—the `fee_amount` is already included in the final transaction amount and is not added separately.

```json
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
    "country": "JP",
    "merchant_reference" : "reference-{{$randomUUID}}",
    "amount": {
        "currency": "JPY",
        "value": 5000.00
    },
    "customer_payer": {
        "id":"967ecd18-d898-4b88-9400-dd5b01b18edc"
    },
    "additional_data": {
          "order": {
              "fee_amount": 180.00
          }
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

## Shipping amount

Use the `additional_data.order.shipping_amount` field to specify the shipping amount included in the total transaction value.

This field is for informational purposes only. The `shipping_amount` is already included in the final transaction amount and is not added separately.

In the example below, a request includes a shipping amount of 270 JPY as part of a 5,000 JPY total transaction.

```json
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
    "country": "JP",
    "merchant_reference" : "reference-{{$randomUUID}}",
    "amount": {
        "currency": "JPY",
        "value": 5000.00
    },
    "customer_payer": {
        "id":"967ecd18-d898-4b88-9400-dd5b01b18edc"
    },
    "additional_data": {
          "order": {
              "shipping_amount": 270.00
          }
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

## Tips

You can use the `additional_data.order.tip_amount` field to specify the tip amount included in the total transaction value.

This field is for informational purposes only. The `tip_amount` is already included in the final transaction amount and is not added separately.

In the example below, the request includes a tip amount of 50 JPY as part of a 5,000 JPY total transaction.

```json
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
    "country": "JP",
    "merchant_reference" : "reference-{{$randomUUID}}",
    "amount": {
        "currency": "JPY",
        "value": 5000.00
    },
    "customer_payer": {
        "id":"967ecd18-d898-4b88-9400-dd5b01b18edc"
    },
    "additional_data": {
          "order": {
              "tip_amount": 50.00
          }
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

## Taxes

You can use the `additional_data.order.taxes` array to specify the tax amounts included in your transaction. This field is for informational purposes only; the taxes listed here should already be included in the total transaction amount.

| Field      | Type  | Description                        | Example  |
| :--------- | :---- | :--------------------------------- | :------- |
| type\*     | enum  | Tax Type.                          | VAT      |
| tax\_base  | float | Taxed base amount for the payment. | 10000.00 |
| value\*    | float | Tax amount value for the payment.  | 2100.00  |
| percentage | float | Tax rate                           | 21.00    |

| Tax Type         | Availability | Description                                                                                                                                                                                                                                                                                                                                                                                       |
| :--------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| VAT              | COL, ECU     | Value Added Tax. Also known as IVA.                                                                                                                                                                                                                                                                                                                                                               |
| CONSUMPTION\_TAX | COL          | Also known as "Impuesto al consumo". In Colombia, the National Consumption Tax is an indirect tax applied to the sale of specific goods and services, such as alcoholic beverages, cigarettes, mobile phone services, among others. The rate varies depending on the good or service.                                                                                                             |
| AIRPORT\_TAX     | COL, BRL     | This tax is a fee charged to passengers for the use of airport facilities. This tax varies depending on the airport and may include national and international rates.                                                                                                                                                                                                                             |
| VAT\_LAW\_17934  | UYU          | In Uruguay, Law No. 17.934 refers to the regulations that establish specific modifications and provisions related to the Value Added Tax (VAT). This law may include regulations on exemptions, special rates, and administrative procedures.                                                                                                                                                     |
| VAT\_LAW\_19210  | UYU          | In Uruguay, Law No. 19.210 establishes additional regulations or modifications to VAT rules. This law may focus on aspects such as the digitization of tax processes, new tax rates, or adjustments in exemptions and tax treatments of certain goods and services.                                                                                                                               |
| VAT\_EXEMPTION   | COL, ECU     | Value Added Tax Exemption                                                                                                                                                                                                                                                                                                                                                                         |
| ISV              | DOM          | Sales Tax. Also known as "Impuesto Sobre las Ventas". In the Dominican Republic, the ISV, commonly known as ITBIS (Impuesto a la Transferencia de Bienes Industrializados y Servicios), is a value-added tax applied to the transfer of goods and services. The ITBIS is similar to the VAT in other countries, where the tax is levied at each stage of the production and distribution process. |

In the following example, you can see a request that clarifies what taxes are part of a 1000.00 USD final transaction. This field is for informational purposes; the `taxes`struct is already included in the final transaction amount and has not been added separately.

```json
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
    "country": "US",
    "merchant_reference" : "reference-{{$randomUUID}}",
    "amount": {
        "currency": "USD",
        "value": 1000.00
    },
    "customer_payer": {
        "id":"967ecd18-d898-4b88-9400-dd5b01b18edc"
    },
    "additional_data": {
          "order": {
              "taxes": [
                {
                  "type": "AIRPORT_TAX",
                  "tax_base":400000.00
                },
                {
                  "type": "VAT",
                  "value": 320000.00,
                  "tax_base":2000000.00
                }
              ]
          }
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

## Discounts

You can use the `additional_data.order.discounts` array to provide information about any discounts applied to a transaction. This field is for informational purposes only. The discounts listed in this array should already be included in the final transaction amount—they are not subtracted automatically by the system.

The following example demonstrates how to indicate that a $500 discount has been applied to a total transaction amount of $5,000.

```json Example
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
    "country": "US",
    "merchant_reference" : "reference-{{$randomUUID}}",
    "amount": {
        "currency": "USD",
        "value": 5000.00
    },
    "customer_payer": {
        "id":"967ecd18-d898-4b88-9400-dd5b01b18edc"
    },
    "additional_data": {
          "order": {
              "discounts": [
                {
                  "id": "10OFF",
                  "name":"Offer",
                  "unit_amount":500.00
                }
              ]
          }
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
