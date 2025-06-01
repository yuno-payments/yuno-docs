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

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;">
  <video src="https://github.com/writechoiceorg/yuno-images/raw/main/doc/yourPaymentsOperationSystem/provider.mp4" loop autoplay muted playsinline style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></video>
</div>
`}</HTMLBlock>

### How to Use Provider Installments?

While configuring your provider [Connection](doc:connections) in Yuno Dashboard, you can enable the installments available for the provider so we can use them in the Credit card form of the SDK for the customer to select from. For this scenario, there is no need to create a plan, as Yuno will use the plan defined by your payment processor.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Secure Fields SDK</h3>
      <div class="contentContainer">
        <p>When using Secure Fields SDK integration, you will need to <a href="secure-fields-payment#step-3-start-the-checkout-process">enable the installments option</a> while starting the checkout process.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

This option is not enabled for all providers, only the ones that have Installment services that Yuno can access to get the information from. If you consider that a provider should have this feature enabled, please reach out to your account manager. 

<Image align="center" src="https://files.readme.io/04626a1-provider.png" />

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer danger">
    <div class="verticalLine"></div>
    <div>
      <h3>Routing</h3>
      <div class="contentContainer">
        <p>While setting your <a href="routing">route</a> for the Card payment method, remember that having a fallback for a provider that has "Provider installments" is not supported, as different providers handle different types of installment plans. It can cause a processing error in the fallback.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>
