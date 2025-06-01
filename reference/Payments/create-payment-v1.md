---
title: Create Payment - V1
excerpt: ''
api:
  file: payment-api-create-payment-back-to-back.json
  operationId: create-payment-v1
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
This request creates a payment after you created a checkout session.

> 🚧 Important
> 
> There are certain objects that are not mandatory when creating a "Payment". However, if you provide this information, the user’s payment experience will be enhanced. Be aware of the mandatory fields if you wish to provide this information.

If you want to process payments in a Single Step (Authorization and Capture simultaneously), you need to send the `capture` attribute as `true`, so the payment is captured automatically.

On the other hand, if you wish to process the payment in Two Steps (First Authorization and then Capture) you need to send this attribute as `false`. Please follow the steps below to implement a two-step flow:

1. Create an authorization using the [Authorize Payment](https://docs.y.uno/reference/authorize-payment) request.
2. Capture the created authorization using the [Capture Authorization](https://docs.y.uno/reference/capture-authorization) request.

[block:html]
{
  "html": " <style>\n.rm-Playground { \n  padding-bottom: 20px; \n  overflow: scroll; \n}\n\n.hub-footer { \n\tposition: static; \n}\n</style>"
}
[/block]