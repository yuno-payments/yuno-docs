---
title: ClearSale SDK (iOS)
deprecated: false
hidden: true
metadata:
  robots: index
---
> ❗️ This page is deprecated.
>
> The Yuno ClearSale SDK no longer requires standalone documentation. Contact your Yuno representative if you need historical details about the integration.

The Yuno ClearSale SDK provides device fingerprinting and fraud prevention capabilities by integrating with ClearSale and is designed to complement the Yuno Payments SDK.

## Installation (Swift Package Manager - SPM)

`YunoAntifraudClearsale` is installed exclusively via Swift Package Manager (SPM).

### 1. Swift Package Manager (SPM)

This is the recommended method for versions 1.3.0 and later.

In Xcode, go to `File > Add Packages...`

Enter the ClearSale repository URL:

`https://github.com/yuno-payments/yuno-antifraud-clearsale-ios`

Ensure you select version `1.3.0` or higher.

### 2. CocoaPods

You can also use CocoaPods for version `1.3.0`. Add the following line to your `Podfile`:

```ruby
pod 'YunoAntifraudClearsaleSDK', '~> 1.3.0'
```

## Core SDK Dependency

This package also requires you to add the main Yuno SDK as a dependency. Repeat the SPM installation process with the following URL:

GitHub - yuno-payments/yuno-sdk-ios

## Usage

The minimum required version is iOS 14.0.

### Fraud Provider Configuration

To integrate `YunoAntifraudClearsale`, you must configure it as a fraud provider within the `YunoSDK` before calling any payment initiation method (`startPaymentLite` or `startPayment`).

Make sure to import both modules and then use the static method `Yuno.setFraudProviders(with:)`:

```swift
import YunoSDK
import YunoAntifraudClearsale // Import the provider class

// Configure Clearsale as a fraud provider.
// You must pass an instance of the class inside an array.
Yuno.setFraudProviders(with: [YunoAntifraudClearsale()])

// Once the provider is configured, you can initiate the payment process.
// Yuno.startPaymentLite(...) or Yuno.startPayment(...)
```
