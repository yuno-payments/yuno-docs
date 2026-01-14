---
title: Payment Notifications
excerpt: This is your first endpoint! Edit this page to start documenting your API.
api:
  file: embedded-banking-payment.json
  operationId: post_v1-payments
hidden: true
---
This request creates a payment after you created a checkout session.

> ❗️ Important
>
> Although certain objects are not mandatory when creating a **Payment**, the user’s payment experience can be enhanced if you provide this information.

> 📘 3DS Payments
>
> Check the [3D Secure](https://docs.y.uno/docs/3d-secure) page to learn how to create payments using 3DS on Yuno.

If you want to process payments in a Single Step (Authorization and Capture simultaneously), you need to send the `payment_method.detail.card.capture` attribute as `true`, so the payment is captured automatically.

To test all possible transaction outcomes within Yuno in **Sandbox**, please refer to the following [documentation](doc:yuno-testing-gateway#44-provide-the-payment-method-information) for **test data**.

On the other hand, if you wish to process the payment in Two Steps (First Authorization and then Capture), you need to send `payment_method.detail.card.capture` attribute as `false`. Please follow the steps below to implement a two-step flow:

1. Create an authorization using the [Authorize Payment](ref:authorize-payment) request.
2. Capture the created authorization using the [Capture Authorization](ref:capture-authorization) request.

Note that this request requires an `X-Idempotency-Key`. Check the [Authentication](ref:authentication#idempotency) page for more information.

<HTMLBlock>{`
<style>
  .rm-Playground { 
    padding-bottom: 20px; 
    overflow: scroll; 
  }

  .hub-footer { 
    position: static; 
  }

  .link_stored_credential {
    color: rgb(81, 60, 225) !important;
  }
</style>
`}</HTMLBlock>
