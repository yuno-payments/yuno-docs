---
title: Loader
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Loader
  description: >-
    The loader is displayed from when the One Time Token is created until the
    merchant calls `yuno.hideLoader()` or `yuno.continuePayment()`.  This way,
    the user experience is improved because they will see the loader while the
    merchant creates the payment.
  robots: index
next:
  description: ''
---
The loader is displayed from when the one-time token is created until the merchant calls `yuno.hideLoader()` or `yuno.continuePayment()`.  This way, the user experience is improved because they will see the loader while the merchant creates the payment.

To disable this behavior, the merchant should set the property `keepLoader` to `false` in the method `yuno.startCheckout`. Check the documentation for [Full SDK](doc:full-checkout-sdk) or [Lite SDK ](https://docs.y.uno/docs/lite-checkout-sdk).