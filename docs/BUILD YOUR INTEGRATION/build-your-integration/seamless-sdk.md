---
title: Seamless SDK
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
Yuno's **Seamless SDK** provides a simple and efficient integration while giving you full control over the payment experience. Like the [Lite SDK](doc:the-ultimate-checkout-lite), it allows you to retrieve available payment methods and decide which to display during checkout. Once the selection is made, a single API and SDK call completes the payment process, creating an experience identical to the Lite SDK.

When using the Seamless SDK, you can:

* Execute the payment process.
* Enroll a credit card while making a payment.
* Use a vaulted token from an enrolled payment method to complete a payment.

Use the following guides to implement each process.

## Payment workflow

The diagram below illustrates the complete payment workflow:

![](https://files.readme.io/aa0edc30b1470562f8cc1380856aacb410d41aa6417d863e2c65476d26481fa4-image1.png)

For platform-specific setup, refer to:

<Shelf classname="platform_shelf">
  <YunoCard title="Web" href="/docs/seamless-sdk-payment-web" />

  <YunoCard title="iOS" href="/docs/seamless-sdk-payment-ios" />

  <YunoCard title="Android" href="/docs/seamless-sdk-payment-android" />
</Shelf>