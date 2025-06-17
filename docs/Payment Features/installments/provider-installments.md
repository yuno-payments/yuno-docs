---
title: Provider Installments
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
**Provider** installment is when the merchant does not have a commercial agreement for a defined set of installments, so they use the installments defined by the payment processor. Yuno consults the provider of your choosing in order to get the installments available to offer your customers for each transaction.

<Video src="https://github.com/writechoiceorg/yuno-images/raw/main/doc/yourPaymentsOperationSystem/provider.mp4" />

### How to Use Provider Installments?

While configuring your provider [Connection](doc:connections) in Yuno Dashboard, you can enable the installments available for the provider so we can use them in the Credit card form of the SDK for the customer to select from. For this scenario, there is no need to create a plan, as Yuno will use the plan defined by your payment processor.

> 🚧 Secure Fields SDK
>
> When using Secure Fields SDK integration, you will need to [enable the installments option](secure-fields-payment#step-3-start-the-checkout-process) while starting the checkout process.

This option is not enabled for all providers, only the ones that have Installment services that Yuno can access to get the information from. If you consider that a provider should have this feature enabled, please reach out to your account manager.

<Image align="center" src="https://files.readme.io/04626a1-provider.png" />

> ❗️ Routing Configuration Warning
>
> While setting your [route](routing) for the Card payment method, remember that having a fallback for a provider that has "Provider installments" is not supported, as different providers handle different types of installment plans. It can cause a processing error in the fallback.