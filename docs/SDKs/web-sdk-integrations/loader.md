---
title: Loader
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: Loader
  description: >-
    The loader is displayed from when the one-time token is created until the
    merchant calls `yuno.hideLoader()` or `yuno.continuePayment()`.  This way,
    the user experience is improved because they will see the loader while the
    merchant creates the payment.
  robots: index
next:
  description: ''
---
The loader is displayed from when the one-time token is created until the merchant calls `yuno.hideLoader()` or `yuno.continuePayment()`.  This way, the user experience is improved because they will see the loader while the merchant creates the payment.

To disable this behavior, the merchant should set the property `keepLoader` to `false` in the method `yuno.startCheckout`. See the documentation for [Full SDK](doc:full-checkout-sdk) or [Lite SDK](https://docs.y.uno/docs/lite-checkout-sdk).

## What's New

Track the latest Web SDK updates, new features, and breaking changes on the [changelog](../web-sdk-changelog) page.