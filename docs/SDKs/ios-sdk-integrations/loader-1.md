---
title: Loader
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Loader
  description: >-
    By default, Yuno will stop the loading after processing transaction
    operations. You can make it persist via YunoConfig by setting `keepLoader:
    true`.
  robots: index
next:
  description: ''
---
## Keep loader

By default, Yuno will stop the loading after processing transaction operations. You can make it persist via YunoConfig by setting `keepLoader: true`.

```swift
Yuno.initialize(
    apiKey: apiKey,
    config: YunoConfig(keepLoader: true)
)
```

This will make the loader persist until you call either of the following functions (this only applies to payment flow):

```swift
Yuno.hideLoader()
```

or

```swift
Yuno.continuePayment(showPaymentStatus: Bool)
```
