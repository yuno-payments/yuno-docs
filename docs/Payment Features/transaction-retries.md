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
Yuno provides merchants with the ability to retry capture and refund transactions that have encountered errors or been declined by the provider. This feature aims to enhance transaction success rates and improve the user experience. By setting the `simplified_mode` field to `true` in [capture](ref:capture-authorization) and [refund](ref:refund-payment) requests, Yuno will automatically retry failed transactions up to seven times within a 96-hour period. The system handles the following scenarios during the retry process:

#### Capture transactions

Capture transactions can encounter various statuses during and after the retry process. The table below details these statuses:

| Payment while retry is ongoing          | Payment after successful retries                                      | Payment after failed retries                |
| :-------------------------------------- | :------------------------------------------------------------------- | :------------------------------------------ |
| SUCCEEDED / CAPTURE\_RETRY\_IN\_PROCESS | SUCCEEDED / CAPTURED or PARTIALLY\_CAPTURED depending on the amount. | SUCCEEDED / CAPTURE\_RETRY\_PROCESS\_FAILED |

#### Refund transactions

Refund transactions also have specific statuses during and after the retry process. The table below outlines these statuses:

| Payment while retry is ongoing         | Payment after successful retries                                                 | Payment after failed retries |
| :------------------------------------- | :------------------------------------------------------------------------------ | :--------------------------- |
| SUCCEEDED / REFUND\_RETRY\_IN\_PROCESS | REFUNDED / REFUNDED or SUCCEEDED / PARTIALLY\_REFUNDED depending on the amount. | SUCCEEDED / APPROVED         |

## Benefits

This feature provides several advantages:

* **Improved transaction success rates**: Automatic retries enhance the likelihood of successful transaction completions, leading to higher approval rates and increased revenue.
* **Enhanced user experience**: By automatically retrying failed transactions, user friction is reduced, improving overall customer satisfaction and retention.
* **Operational efficiency**: Automating retry attempts optimizes time and resources by minimizing manual intervention for failed transactions, allowing teams to focus on strategic tasks.

## Retry scheme

The retry scheme is crafted to maximize transaction success by scheduling retries at strategic intervals.

The table below describes the intervals between each retry. Note that each retry is scheduled based on the timing of the last attempt, meaning the time between retries is cumulative:

| Event       | Deadline after the first try |
| :---------- | :--------------------------- |
| First try   | \-                           |
| Second try  | 5 minutes                    |
| Third try   | 50 minutes                   |
| Fourth try  | 6 hours                      |
| Fifth try   | 24 hours                     |
| Sixth try   | 48 hours                     |
| Seventh try | 96 hours                     |

This table illustrates that each retry is performed based on the time elapsed since the previous attempt, not the initial attempt. For example, the fourth retry occurs 6 hours after the third retry rather than 6 hours after the first attempt. The entire schedule spans 7 days and 7 hours in total.

## Examples

Below are examples of capture authorization and refund requests using the simplified mode.

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
