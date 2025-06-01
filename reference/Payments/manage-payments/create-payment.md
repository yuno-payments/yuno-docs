---
title: Create Payment
excerpt: ''
api:
  file: payment-api-create-payment-back-to-back.json
  operationId: create-payment
deprecated: false
hidden: false
metadata:
  title: ''
  description: A request to create a payment after you created a checkout session.
  robots: index
next:
  description: ''
---
This request creates a payment after you created a checkout session.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer alert\">\n    <div class=\"verticalLineAlert\"></div>\n    <div>\n      <h3>Important</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\tThere are certain objects that are not mandatory when creating a \"Payment\". However, if you provide this information, the user’s payment experience will be enhanced. Be aware of the mandatory fields if you wish to provide this information.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>3DS Payments</h3>\n      <div class=\"contentContainer\">\n        <p>\n          To understand how 3D Secure payments work, check the <a onclick=\"window.location='3d-secure'\">3D Secure</a> page or the <a onclick=\"window.location='direct-workflow'\">Direct Workflow</a> guide to learn how to create payments using 3DS on Yuno.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


If you want to process payments in a Single Step (Authorization and Capture simultaneously), you need to send the `payment_method.detail.card.capture` attribute as `true`, so the payment is captured automatically.

To test all possible transaction outcomes within Yuno in **Sandbox**, please refer to the following [documentation](doc:yuno-testing-gateway#44-provide-the-payment-method-information) for **test data**.

On the other hand, if you wish to process the payment in Two Steps (First Authorization and then Capture), you need to send `payment_method.detail.card.capture` attribute as `false`. Please follow the steps below to implement a two-step flow:

1. Create an authorization using the [Authorize Payment](ref:authorize-payment) request.
2. Capture the created authorization using the [Capture Authorization](ref:capture-authorization) request.

Note that this request requires an `X-Idempotency-Key`. Check the [Authentication](ref:authentication#idempotency) page for more information.

[block:html]
{
  "html": "<style>\n  .rm-Playground { \n    padding-bottom: 20px; \n    overflow: scroll; \n  }\n\n  .hub-footer { \n    position: static; \n  }\n\n  .link_stored_credential {\n    color: rgb(81, 60, 225) !important;\n  }\n</style>"
}
[/block]