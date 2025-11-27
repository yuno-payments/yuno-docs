---
title: Enroll Payment Method
excerpt: ''
api:
  file: customer-api-register-payment-method.json
  operationId: enroll-payment-method-checkout
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    A request to enroll a payment method for a customer. With the information
    provided by Yuno after the customer selects the payment method to enroll,
    you will be able to save it for future purchases in the payment method
    object created.
  robots: index
next:
  description: ''
---
This request enrolls a payment method for a customer. With the information provided by Yuno after the customer selects the payment method to enroll, you will be able to save it for future purchases in the payment method object created.

Note that this request requires an `X-Idempotency-Key`. Check the [Authentication](ref:authentication#idempotency).

> 📘 Webhooks
>
> We recommend listening to [Webhooks](https://docs.y.uno/docs/configure-webhooks) to stay up to date with the state of the enrolled payment methods of your customers.

In case a customer enrolls the same card twice but with new expiration date or cardholder info, we will unenroll the previously enrolled card and keep the new one.

## Available payment methods for enrollment

The following payment methods can be enrolled using this endpoint:

| Payment Method            | Type                   |
| ------------------------- | ---------------------- |
| **Cards**                 | `CARD`                 |
| **Nupay**                 | `NU_PAY_ENROLLMENT`    |
| **PayPal**                | `PAYPAL_ENROLLMENT`    |
| **Daviplata**             | `DAVIPLATA_ENROLLMENT` |
| **MercadoPago Wallet**    | `WALLET_CONNECT`       |
| **dLocal Yape**           | `YAPE_ENROLLMENT`      |
| **dLocal Smart PIX**      | `SMART_PIX`            |
| **Astropay**              | `ASTROPAY_ENROLLABLE`  |
| **Adyen PIX Biométrico**  | `PIX_BIOMETRICO`       |

> 📘 Payment Method Availability
>
> When you retrieve the payment methods available to enroll, only the ones which you have connected, created a route, and added to your checkout will be present. For more information about enrollment workflows, see the [Enroll Payment Methods](doc:enroll-payment-methods) guide.