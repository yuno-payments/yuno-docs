---
title: Tokens
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Tokens
  description: >-
    Yuno's SDK enables secure payment method data capture on your site or app,
    transforming it into a string-based payment method token. This token
    encompasses sensitive payment credentials and customer data, gathered via
    direct communication with Yuno's PCI-L1 tokenization service.
  robots: index
next:
  description: ''
---
With Yuno's SDK, you can securely capture payment method data on your site or app. A payment method token is a string that represents sensitive payment method credentials and customer data. By communicating directly with Yuno's PCI-L1 tokenization service, we gather sensitive customer data.

## One-time use token vs. vaulted token

Yuno uses two different types of tokens to process payments, depending on the integration.

- **One-time use token**: When using Yuno's SDK, we gather all the necessary information to process the payment and store it in a one-time use token, regardless of the customer's chosen payment method. This token is used when creating the payment. Note that this token only works once. You will need to generate a new one-time token for each checkout session created.
- **Vaulted token**: A vaulted token is created once a payment method is enrolled and stored with the customer's information. You can use the created vaulted token to identify the payment method for future payments.

Yuno's tokenization service and centralized vault enable you to handle recurring payments, fallbacks, and retries across processors without compromising user experience.