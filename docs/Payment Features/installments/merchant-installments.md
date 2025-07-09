---
title: Merchant Installments
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
Merchant installments allow you, as the merchant, to offer installment payment options based on your own commercial agreements and configurations with your payment processors. In this setup, you are responsible for defining and managing the available installment options for each transaction. When creating a payment, you must inform Yuno of the number of installments that customers can select.

<Video src="https://github.com/writechoiceorg/yuno-images/raw/main/doc/yourPaymentsOperationSystem/installments.mp4" />

## How to use merchant installments

The way you configure merchant installments depends on your integration with Yuno. Below, you'll find guidance for both the Direct workflow and SDK integration.

### Direct workflow

If you are using a [Direct integration](doc:direct-flow), you control the front-end checkout experience. In this case, you specify the number of installments when creating a payment via the [Create payment](ref:create-payment) endpoint. Set the number of installments using the `payment_method.detail.card.installments` parameter.

### SDK integration

With Yuno's SDK integration, Yuno manages the presentation of available installment options to your customers during checkout. To ensure the correct installment plans are shown, you must configure which installment options are available for your account. This configuration is managed through the [Yuno Dashboard](https://auth.y.uno/u/login?).

Follow these steps to set up merchant installments with the SDK:

1. **Enable installments in your provider connection**:  
   In the [Connections](doc:connections) section of the Yuno Dashboard, enable the installments option for your payment provider. This allows Yuno to display installment options when customers select the credit card payment method in the SDK checkout.

   <Image align="center" src="https://files.readme.io/3874bb1-installments.png" />

2. **Create an installment plan**:  
   After enabling installments, create an installment plan using the [Create installments plan](ref:create-installments-plan) endpoint. When creating a plan, specify details such as accepted currencies, amounts, card brands, and validity dates. Once your plan is set up, Yuno will handle the rest.

> 🚧 Secure Fields SDK integration
>
> If you are using the Secure Fields SDK, you must [enable the installments option](secure-fields-payment#step-3-start-the-checkout-process) when starting the checkout process.

For merchant-created installments, you can also specify the plan for each session by either:

* Providing a `plan_id` when [creating the session](ref:create-checkout-session).
* Including a `plan structure` when [creating the checkout session](ref:create-checkout-session).

> ❗️ Routing with fallback providers
>
> When configuring your [route](routing) for the card payment method, keep in mind that if you have a fallback provider and the first transaction is rejected, Yuno will attempt a fallback payment. Make sure that all providers in your route support the number of installments you have configured. If not, consider setting up different routes for each scenario to avoid issues.