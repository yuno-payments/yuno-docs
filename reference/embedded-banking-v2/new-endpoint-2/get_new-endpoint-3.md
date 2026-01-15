---
title: Payment Notifications v2
excerpt: This is your first endpoint! Edit this page to start documenting your API.
api:
  file: embedded-banking-v-2.json
  operationId: post_new-endpoint
hidden: true
---
This request creates a payment notification for the Embedded banking flow.

> ❗️ Important
>
> In order to receive Payment notification for embedded banking solution, you should configure the URL where you will liked to be notified in Yuno Dashboard

To test all possible transaction outcomes within Yuno in **Sandbox**, please refer to the following [documentation](doc:yuno-testing-gateway#44-provide-the-payment-method-information) for **test data**.

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