---
title: Loader
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Loader
  description: >-
    Control when the loader shows during the checkout flow.
  robots: index
next:
  description: ''
---
The loader displays from the moment the one-time token is created until you call `yuno.hideLoader()` or `yuno.continuePayment()`. This improves the user experience while you create the payment.

To change this behavior, set `keepLoader` to `false` in `yuno.startCheckout`. See [Full SDK](doc:full-checkout-sdk) or [Lite SDK](https://docs.y.uno/docs/lite-checkout-sdk).

### Parameters

Control loader behavior using this option:

| Parameter      | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| `keepLoader`   | Show loader until `hideLoader()` or `continuePayment()` is called |