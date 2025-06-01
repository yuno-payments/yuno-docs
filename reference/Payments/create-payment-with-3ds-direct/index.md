---
title: Payment with 3DS DIRECT
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
> 📘 Pre-requisites:
>
> * Enable 3DS in your Yuno dashboard and indicate in your CARD routing for which scenarios you want your customers to be able to use it.
> * 3DS data required for setup: 
>   * Acquirer BIN:  This is the Bank Identification Number (BIN) that is used to clear and settle the transaction and the country in which it is licensed for use.
>   * Merchant ID: Affiliation number provided by the acquirer
>   * Merchant Category Code (MCC):  Merchant Category Code provided by the acquirer.
>   * Country Code:  The country where the payment must be processed (ISO 3166-1 Standard Country Codes)

## How does it work?

1. [Create your payment](https://docs.y.uno/v2.0/reference/create-payment-3ds): If 3DS (3D Secure) is enabled in your Yuno routing section and additional verification is required, you will receive a payment with the status `PENDING/WAITING_ADDITIONAL_STEP`. This payment will include corresponding 3DS transactions with a `CREATED` status.
2. Information required in the request:
   1. Card data
   2. Callback URL (in case a 3DS challenge is required)
   3. Browser info
3. If a **3DS verification challenge** is necessary, we will return a `required_action` set as `redirect` and provide an `init_url`. You should redirect your customers to this URL to complete the challenge. If more than one card is used in the payment, more than one 3DS challenge may be necessary, and consequently, you may receive more than one redirect URL.
4. After completing the 3DS challenge, the user will be redirected to the callback URL specified in the payment.
5. Finally, through [webhooks](https://docs.y.uno/v2.0/docs/configuring-yuno-webhooks), you will receive the result of the 3DS challenge and the final payment outcome.

## Workflow

![](https://files.readme.io/7c47202-small-3DS_FLOW.png)

## Transactions

A 3DS transaction behaves similar to a regular purchase transaction. It has different states that represent how the authorization is going. Once the 3DS transaction is SUCCEEDED, we'll to go to the processor and generate a PURCHASE transaction to charge the client. 

| Status      | Description                                                 |
| :---------- | :---------------------------------------------------------- |
| CREATED     | Payment is created and waiting for Yuno's SDK session id.   |
| PENDING     | Challenge is required and the init\_url is returned by Yuno |
| IN\_PROCESS | Challenge is being completed by the user                    |
| SUCCEEDED   | Challenge is completed correctly                            |
| DECLINED    | Challenge is completed and declined by the bank             |
| ERROR       | An error occurred while redirecting to the users challenge  |

## 3DS with Split Payment Methods

In the page [Create Payment with Payment Method Split](https://docs.y.uno/v2.0/reference/create-payment-with-payment-method-split), you can understand how the split workflow actually works and how you can integrate it into your site. In this section, you can also understand how to support **3DS card verification**.
