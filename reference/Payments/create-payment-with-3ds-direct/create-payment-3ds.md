---
title: Create Payment
excerpt: ''
api:
  file: payments-api-split.json
  operationId: create-payment-3ds
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
While creating a payment that accepts 3DS, we are going to need

* `card.data` inside the corresponding `payment_method` object for the DIRECT workflow. 
* `callback_url` to redirect the customer after completing the challenge in case they need it. Also should be sent inside each `payment_method` object in the request. 
* `browser_info` to verify the user session and analice wether or not a challenge is required. 

If the transactions requires a 3DS verification challenge, we will return a required\_action set as redirect and an init\_url for you to redirect your customers in order to complete the challenge. There will be as many redirect\_urls as 3DS challenges required. If both cards require a 3DS challenge, you'll get two different urls to redirect your customer.
