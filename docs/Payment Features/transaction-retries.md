---
title: Transaction Retries
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
Yuno allows merchants to retry capture and refund transactions that received an error or declined responses from the provider by adding a field to the transaction request. This feature is designed to enhance transaction success rates and improve user experience. By setting the `simplified_mode` field to `true` in [capture](ref:capture-authorization) and [refund](ref:refund-payment) requests, Yuno will automatically retry failed transactions up to seven times within a 96-hour period. The system manages the following scenarios during the retry process:

#### Capture transactions

| Payment while retry is ongoing          | Payment after succeeded retries                                      | Payment after failed retries                |
| :-------------------------------------- | :------------------------------------------------------------------- | :------------------------------------------ |
| SUCCEEDED / CAPTURE\_RETRY\_IN\_PROCESS | SUCCEEDED / CAPTURED or PARTIALLY\_CAPTURED depending on the amount. | SUCCEEDED / CAPTURE\_RETRY\_PROCESS\_FAILED |

#### Refund transactions

| Payment while retry is ongoing         | Payment after succeeded retries                                                 | Payment after failed retries |
| :------------------------------------- | :------------------------------------------------------------------------------ | :--------------------------- |
| SUCCEEDED / REFUND\_RETRY\_IN\_PROCESS | REFUNDED / REFUNDED or SUCCEEDED / PARTIALLY\_REFUNDED depending on the amount. | SUCCEEDED / APPROVED         |

## Benefits

* **Improved Transaction Success Rates**: Automatic retries increase the likelihood of successful transaction completions, leading to higher approval rates and revenue generation.
* **Enhanced User Experience**: Reduces user friction by automatically retrying failed transactions, improving overall customer satisfaction and retention.
* **Operational Efficiency**: Automating retry attempts optimizes time and resources by reducing manual intervention for failed transactions, allowing teams to focus on strategic tasks.

## Retry scheme

The following table describes the intervals between each retry. It is important to note that each retry is scheduled based on the timing of the last attempt, meaning the time between retries is cumulative:

| Event       | Deadline after the first try |
| :---------- | :--------------------------- |
| First try   | \-                           |
| Second try  | 5 minutes                    |
| Third try   | 50 minutes                   |
| Fourth try  | 6 hours                      |
| Fifth try   | 24 hours                     |
| Sixth try   | 48 hours                     |
| Seventh Try | 96 hours                     |

The table shows that each retry is performed based on the time elapsed since the previous attempt, not the initial attempt. For example, the fourth retry happens 6 hours after the third retry rather than 6 hours after the first attempt. The entire schedule consists of 7 days and 7 hours in total. 

## Examples

The following code block presents examples of capture authorization and refund requests using the simplified mode.

```Text Capture
curl --request POST \
     --url https://api-sandbox.y.uno/v1/payments/id/transactions/transaction_id/capture \
     --header 'X-Idempotency-Key: <Your X-Idempotency-Key>' \
     --header 'accept: application/json' \
     --header 'charset: utf-8' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <Your private-secret-key>' \
     --header 'public-api-key: <Your public-api-key>' \
     --data '
{
  "amount": {
    "currency": "JPY",
    "value": 300
  },
  "simplified_mode": true,
  "description": "Confirmed",
  "reason": "PRODUCT_CONFIRMED",
  "merchant_reference": "AAB01-432245"
}
'
```
```curl Refund
curl --request POST \
     --url https://api-sandbox.y.uno/v1/payments/id/transactions/transaction_id/refund \
     --header 'X-Idempotency-Key: <Your X-Idempotency-Key>' \
     --header 'accept: application/json' \
     --header 'charset: utf-8' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <Your private-secret-key>' \
     --header 'public-api-key: <Your public-api-key>' \
     --data '
{
  "simplified_mode": true,
  "description": "Refund",
  "reason": "REQUESTED_BY_CUSTOMER",
  "merchant_reference": "AAB01-432245"
}
'
```
