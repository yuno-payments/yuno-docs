---
title: Currency Conversion
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

Yuno's currency conversion service allows you to settle payments in both your currency and your customer's. Currency conversion is the process of converting one currency into another. It involves using exchange rates to determine the equivalent amount in the target currency.

### Benefits

- _Global Reach_: Allows businesses to operate internationally by accepting and making payments in multiple currencies.
- _Customer Convenience_: Customers can pay in their preferred currency, enhancing their buying experiences. 
- _Cost Efficiency_: Optimizing conversion rates can reduce transaction costs.
- _Revenue Optimization_: Businesses can leverage favorable exchange rates to maximize profits.

### Some use Cases

- _E-commerce Platforms_: Online stores that sell products internationally use currency conversion to display prices in local currencies and process payments accordingly.
- _Remittance Services_: Companies that facilitate money transfers across borders rely on currency conversion to ensure recipients receive funds in their local currency.
- _Travel and Hospitality_: Businesses in this sector use currency conversion to handle payments from international travelers.
- _Investment Platforms_: Fintech platforms that offer trading in foreign stocks, bonds, or cryptocurrencies use currency conversion to manage investments across different currencies.

## Implementation

In Yuno, we connect different currency conversion providers, so you dont have to worry about the differences between each integration. The implementation of the service is going to depend on the currency conversion provider you choose to work with. 

### Key Concepts

- _Exchange Rate_: The rate at which one currency can be exchanged for another. This can be a fixed rate or a floating rate that fluctuates based on market conditions.
- _Base Currency_: The currency you are converting from.
- _Cardholder Currency_: The currency you are converting to.
- _Conversion Spread_: The difference between the buy and sell rates, representing the profit margin for the entity providing the conversion service.
- _Real-Time Conversion_: Using up-to-date exchange rates to perform conversions at the exact time of the transaction.

### API implementation

In order to be able to use the currency conversion service you have two API implementations available. 

#### Provider's rate service

The merchant can use the currency conversion service of an external provider and send the corresponding information directly in the payment in Yuno. In order to use this, please contact your technical account manager to make sure that the information is set properly. Example:

```json
 "amount": {
        "currency": "COP",
        "value": 5000, 
        "currency_conversion": {
            "provider_currency_conversion_id": "AAA01SADOIAJSDLAKSJM",
            "cardholder_currency": "ARS",
            "cardholder_amount": 1146.55    
        }
    }
```

<br />

#### Yuno's rate service

Also, the merchant can use directly the [currency conversion service of Yuno](ref:getting-started-with-your-api-4) that gets the information from the provider of their choosing and send in the creation of the payment the id of the conversion rate query and the amount data accordingly. In case of using this service, you will also need to send the id obtained in the payment request so we can link the information. Example:

```json Rate service
{
  "account_id": "fe14c7c6-c75e-43b7-bdbe-4c87ad52c482",
  "amount": {
    "currency_conversion": {
      "cardholder_currency": "USD",
      "provider_data": {
        "id": "CIBC"
      }
    },
    "value": 10000,
    "currency": "COP"
  }
}
```

<br />

```json Payment
    "amount": {
        "currency": "COP",
        "value": 5000, 
        "currency_conversion": {
            "id": "62fdcd6c-50ea-4640-985b-5656010fe5fD",
            "cardholder_currency": "ARS",
            "cardholder_amount": 1146.55    
        }
    },
```

In order to use this, please **contact your technical account manager** to make sure that the information is set properly.