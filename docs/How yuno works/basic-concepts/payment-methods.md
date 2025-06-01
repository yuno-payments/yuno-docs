---
title: Payment methods
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Payment methods
  description: >-
    Yuno provides a growing selection of connections to processors and payment
    methods. For specific details about available payment methods and their
    features, visit the Payment methods section. You can also check the Coverage
    page to see which connections are accessible in different countries.
  robots: index
next:
  description: ''
---
Yuno offers a wide range of connections with various processors and payment methods, continuously expanding each month. This page explains the available payment methods, their capabilities, and how they are organized within Yuno's platform.

## What is a payment method?

To better understand the payment process, it's essential to differentiate between payment methods and processors.

* **Payment method**: A payment method is a way to collect customer payment information and send it to a processor for payment processing. Common payment methods include:
  * Credit/debit cards
  * Digital wallets (Apple Pay, Google Pay)
  * Bank transfers (iDeal)
  * Buy now, pay later services (Klarna) 
  * Regional payment methods (UPI, Pix)
* **Processors**: Processors act as intermediaries between the merchant's and customer's banks, managing refunds, cancellations, and facilitating payment processing. They handle the actual processing of the information obtained by the payment method.

## Differences between payment methods

Payment methods can differ significantly regarding their processing. In addition, some may support enrollment, while others do not. Payment methods can be divided based on their **enrollment characteristics** and **user interaction**.

### User interaction

The workflow for payment methods can vary depending on the capabilities of each processor and the actions required by the customer to complete the payment. There are two main types: synchronous and asynchronous.

* **Synchronous**: Synchronous payment methods provide an instant final result once the customer clicks **Pay**, and the payment is created by the merchant in the background. In these cases, you do not need webhooks to know the outcome, as it will be given in the payment response.
* **Asynchronous**: Asynchronous payment methods, on the other hand, require an additional step by the customer to finalize the payment. These payments will have an intermediate status of `PENDING` until the customer completes the payment or the processor notifies Yuno of the final outcome. To stay up to date on these statuses, it is important to configure [Webhooks](doc:webhooks-1) in your Yuno account for instant updates.

### Enrollment

In Yuno, **enrollment** refers to the process of storing a customer's payment method information for future purchases. This allows for seamless transactions initiated either by the customer or the merchant without requiring additional input from the customer.

* **Enrollable payment methods**: Yuno offers various payment methods for enrollment. The most popular option is **Credit/Debit cards**, but we also offer alternative payment methods, mainly wallets, which allow customers to provide their account information for future payments.
* **Non-enrollable payment methods**: Payment methods that cannot be enrolled are typically alternative methods, such as those relying on bank transfers or cash payments, which may require the customer to take action for each payment.

<Image align="center" src="https://files.readme.io/d965e232b43c86df6cd11c21e576eb7821786426f8e38373256ee9a88cae3c37-Payment_methods.png" />
