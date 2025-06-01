---
title: Introduction
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
A checkout represents your customer's session that will be used to make the payment. 

You can [Create a Checkout Session](https://docs.y.uno/reference/create-checkout-session) using an `id` generated when the Customer resource has been created. 

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5b0740a-Create_Checkout_Session_final.png",
        "Create_Checkout_Session_final.png",
        469
      ],
      "sizing": "smart"
    }
  ]
}
[/block]

> 📘 Note
> 
> You'll always need to describe a customer object to generate a `checkout_session_id`.