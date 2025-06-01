---
title: Click to Pay
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
Click to Pay is an online payment solution designed to streamline and secure online transactions. It's based on the EMVCo secure payment standard, a global consortium comprising major card companies like Visa, MasterCard, American Express, and Discover.

<Image align="center" width="300px" src="https://files.readme.io/9411cdb-C2P_PAY.png" />

*Networks available in Yuno*: [MasterCard](https://www.mastercard.us/en-us/personal/ways-to-pay/click-to-pay.html) 

## Key Features and benefits:

* **Ease of Use**: It enables consumers to make online purchases with a single click, eliminating the need to enter credit card details for each purchase manually.
* **Enhanced Security**: Utilizes modern authentication standards to minimize fraud risk. This may include methods such as two-factor authentication or payment tokens.
* **Consistent Across Various Sites**: Offers a similar payment experience across all websites that support this technology, meaning consumers don’t have to learn different processes for each online store.
* **Integration with Card Brands**: Being backed by major card brands, "Click to Pay" is widely accepted and trusted.
* **Mobile and Desktop Compatibility**: Designed to work across various devices, it facilitates online shopping on both desktops and mobile devices.

This feature enhances the customer experience and aligns with modern digital payment trends, potentially increasing conversion rates and customer loyalty. By incorporating "Click to Pay," you can offer a seamless checkout experience, reducing friction and addressing security concerns in online transactions.

## Integration

To integrate and start offering Click to Pay to your customers, follow these 3 simple steps: 

1. Create a [connection](https://dashboard.y.uno/connections) in the Yuno dashboard using your Click to Pay credentials. 

   <Image align="center" src="https://files.readme.io/c553dc8-C2P_connection.png" />
2. Define the payment method route in the [Routing](https://dashboard.y.uno/routing) section in order to be able to enable it in the Checkout Builder. 

   <Image align="center" src="https://files.readme.io/b22669d-C2P_Route.png" />
3. Enable Click to Pay in the [Checkout builder](https://dashboard.y.uno/checkout-builder). 

   <Image align="center" src="https://files.readme.io/24baf88-C2P_checkout.png" />
4. Define the Card route: Taking in consideration that Click to Pay is a wallet that stores credit card information, the **route** where you will need to define the providers for each scenario is the same as the **'Card' payment method**.
