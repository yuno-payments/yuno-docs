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
You can use the Merchant Installments options when you, the merchant, have your own commercial agreements and installment capabilities defined within your payment processors. In this case, you are responsible for handling the logic behind the installment options available for each transaction. When creating the payment, you will inform Yuno of the available number of installments that customers can choose from.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;">
  <video src="https://github.com/writechoiceorg/yuno-images/raw/main/doc/yourPaymentsOperationSystem/installments.mp4" loop autoplay muted playsinline style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></video>
</div>
`}</HTMLBlock>

## How to Use Merchant Installments?

Depending on the way you are connected to Yuno, the process of configuring the installments may vary. Next, we present how you can inform Yuno of the installment option for the Direct workflow and the SDK integration. 

### Direct workflow

When using a [Direct integration](doc:direct-flow),  you manage the front-end checkout experience. In this case, you will inform Yuno about the number of installments when creating the payment using the [Create Payment](ref:create-payment) endpoint. The number of installments will be defined through the  `payment_method.detail.card.installments` parameter.

### SDK Integration

When you use Yuno's SDK, Yuno is responsible for presenting to the customer the installment options available for each payment. As a result, you need to inform Yuno which installments will be available for your account. In this case, the installment configurations are performed through [Yuno's Dashboard](https://auth.y.uno/u/login?). To perform this configuration, execute the two steps described below.

1. First, when configuring your provider [Connection](doc:connections) in Yuno Dashboard, you need to enable the installments option. Thus, Yuno will show the installment option when the customer chooses the Credit card option form of the SDK checkout.

<Image align="center" src="https://files.readme.io/3874bb1-installments.png" />

2. After enabling the installments, you need to create an installment plan using the  [Create Installments Plan](ref:create-installments-plan) endpoint. When creating a plan, you will specify the accepted currency, amounts, card brands, dates, etc. After that, we will take care of the rest.

> 🚧 Secure Fields SDK Integration
> 
> When using Secure Fields SDK integration, you will need to [enable the installments option](secure-fields-payment#step-3-start-the-checkout-process) while starting the checkout process.


For merchant-created installments, you also have the possibility of specifying the plan for every session by either using:  

* the `plan_id` while [creating the session](ref:create-checkout-session).
* a `plan structure` while [creating the checkout session](ref:create-checkout-session).

> ❗️ Routing with Fallback Providers
> 
> When setting up your [route](routing) for the Card payment method, it's important to remember that if you have a fallback provider while using installments, we will try to make a fallback payment if the first transaction is rejected. Therefore, it's crucial to ensure that both providers support the amount of installments set for your account. If they do not, you can set up different routes for each scenario to avoid issues.
