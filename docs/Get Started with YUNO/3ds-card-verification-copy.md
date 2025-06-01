---
title: 3DS Card Verification (old version)
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
As the world continues to move towards a digital economy, online payments have become the norm. However, with the increasing prevalence of payment fraud and data breaches, ensuring the security of online transactions has become a top priority for businesses and consumers alike. That's where 3DS comes in.

3DS, which stands for 3D Secure, is a cutting-edge authentication protocol that adds an extra layer of security to online payments. It was developed by major card networks such as Visa, Mastercard, and American Express, and is designed to protect against unauthorized use of credit and debit cards for online transactions.

**So, how does 3DS work?** When a customer makes an online payment, the 3DS protocol kicks in and prompts the customer to provide additional authentication, such as a one-time passcode or fingerprint recognition. This helps verify that the person making the transaction is the legitimate cardholder, adding an extra layer of protection against fraud.

## How to configure it for your payments?

As every other tool we use in Yuno, you'll need to define wether or not to implement **3DS** verification while defining your cards [dynamic routing](https://docs.y.uno/docs/configure-dynamic-routing).  When starting youR card routes, you'll be able to find the 3DS step before actually going to a payment provider. If set, we will analyze if the card needs an extra challenge, and if so, the user will be redirected to the bank environment to complete the authorization. 

## Workflow

![](https://files.readme.io/0c3ba2b-3ds_workflow.png)

## Direct integration

You can add 3DS to your payment flow using different methods. If you are a PCI-compliant merchant integrating 3DS for a DIRECT workflow, you'll have to follow the guidelines presented in [Create Payment with 3DS](https://docs.y.uno/reference/create-payment-with-payment-method-split-3ds) in order to get the necessary information to achieve a successful workflow.
