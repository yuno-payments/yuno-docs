---
title: Yuno's Marketplace
excerpt: Learn how to integrate Yuno´s marketplace solution
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
The Yuno's Marketplace solution offers an easy and fast way to integrate payments into your platform or marketplace and split transactions between numerous merchants. 

### Basic concepts

- Marketplace:  An e-commerce site that connects sellers and buyers in a unique environment. The owner of the marketplace should integrate the split.  
- Recipient: The object that represents the sellers inside your marketplace.
- Split: The structure that defines how the money should be split between the recipients involved. 

### How does it work?

![](https://files.readme.io/cc68d50-Screen_Shot_2022-09-28_at_3.45.55_PM.png)

To add the solution you will need to follow the next steps to guarantee a frictionless integration with your merchants:

1. Get your Yuno credentials from your Dashboard. 
2. Get or create [recipients](https://docs.y.uno/reference/the-recipient-object) that will receive the funds from the transactions. 
3. Create a [payment](https://docs.y.uno/reference/split-payments) with your recipient's information and a split structure that indicates how the money should be split between the parts involved. 

> 📘 
> 
> Refunds and chargebacks will use the same split information sent in the payment creation.