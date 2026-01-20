---
title: Enroll Payment Method
excerpt: ''
api:
  file: customer-api-register-payment-method.json
  operationId: enroll-payment-method-api
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    A request to enroll a payment method for a customer. With the information
    provided by Yuno after the customer selects the payment method to enroll,
    you can save that information for future purchases using the payment method
    object created.
  robots: index
next:
  description: ''
---
This request enrolls a payment method for a customer. With the information provided by Yuno after the customer selects the payment method to enroll, you will be able to save that information for future purchases using the payment method object created.

Check the [Available payment methods in Yuno](ref:payment-type-list). You'll need to set your credentials for each payment method in the Yuno dashboard in order to to be able to use them.

Note that this request requires an `X-Idempotency-Key`. Check the [Authentication](ref:authentication#idempotency) page for more information.

> 📘 Webhooks
>
> We recommend listening to [Webhooks](https://docs.y.uno/docs/configure-webhooks) to stay up to date with the state of the enrolled payment methods of your customers.

  
 If a customer enrolls the same card multiple times, Yuno creates a new enrollment each time and returns a distinct `vaulted_token`. Use the card `fingerprint` in the enrollment response to detect duplicates on your side (the fingerprint may be `null` for some providers). See [Card Fingerprint](doc:fingerprint).
 
> 🚧 Only available for PCI certified merchants.