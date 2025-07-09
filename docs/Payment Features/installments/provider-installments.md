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
Provider installments allow you to offer installment payment options defined by your payment processor, rather than by your own commercial agreements. This is useful when you do not have a predefined set of installment plans with a provider. In this scenario, Yuno consults your selected payment provider to retrieve the available installment options for each transaction, and presents them to your customers at checkout.

<Video src="https://github.com/writechoiceorg/yuno-images/raw/main/doc/yourPaymentsOperationSystem/provider.mp4" />

### How to use provider installments

To enable provider installments, configure your provider [connection](doc:connections) in the Yuno Dashboard. When setting up the connection, you can enable the available installment options for that provider. These options will then be shown in the credit card form of the SDK, allowing your customers to select from the plans offered by your payment processor. There is no need to create a custom installment plan—Yuno will automatically use the plans defined by your provider.

> 🚧 Secure Fields SDK
>
> If you are using the Secure Fields SDK integration, make sure to [enable the installments option](secure-fields-payment#step-3-start-the-checkout-process) when starting the checkout process.

Note that provider installments are only available for certain providers—specifically, those that offer installment services which Yuno can access. If you believe a provider should support this feature but does not, please contact your account manager.

<Image align="center" src="https://files.readme.io/04626a1-provider.png" />

> ❗️ Routing configuration warning
>
> When configuring your [route](routing) for the card payment method, keep in mind that fallback routing is not supported for provider installments. Different providers may handle installment plans differently, and using a fallback provider can result in processing errors.