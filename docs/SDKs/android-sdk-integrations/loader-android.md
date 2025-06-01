---
title: Loader
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Loader
  description: >-
    To keep Yuno loading screen, you must send in the YunoConfig parameter in
    Yuno.initialize() function the parameter keepLoader in TRUE and also when
    you decide to start the payment, you have to use the following function.
  robots: index
next:
  description: ''
---
If you need to maintain the Yuno Loader screen, set the `keepLoader` parameter to `TRUE` in the `Yuno.initialize()` function. Additionally, you need to use the following function when initiating the payment:

```kotlin
startCompletePaymentFlow(
  paymentSelected: PaymentSelected? = null,
  showPaymentStatus: Boolean = true,
  createPaymentFun: (suspend(ott: String) -> Unit)? = null,
  callbackPaymentState: ((String?) -> Unit)? = null,
  callbackOTT: ((String?) -> Unit)? = null,
)
```

The `createPaymentFun` parameter is a suspend function in which Yuno waits for the sequential payment creation. Once the payment is created, completing the suspend function allows Yuno to proceed with the payment. If you opt for this flow, there's no need to invoke `continuePayment()`.