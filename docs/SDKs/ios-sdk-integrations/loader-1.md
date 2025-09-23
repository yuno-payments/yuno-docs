---
title: Loader
excerpt: ''
deprecated: false
hidden: true
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
## Keep Loader

By default, Yuno automatically stops the loading spinner after processing transaction operations. You can configure the loader to persist by setting `keepLoader: true` in the `YunoConfig`.

```swift
Yuno.initialize(
    apiKey: apiKey,
    config: YunoConfig(keepLoader: true)
)
```

When `keepLoader: true` is set, the loader will persist until you explicitly call one of these functions (applies only to payment flow):

```swift
Yuno.hideLoader()
```

```swift
Yuno.continuePayment(showPaymentStatus: Bool)
```