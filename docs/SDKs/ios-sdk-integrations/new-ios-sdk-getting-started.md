---
title: New - Getting Started with iOS Flow
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: Getting Started with iOS Flow
  description: >-
    Install and initialize the Yuno SDK to start accepting payments and enrolling payment methods in your iOS application.
  robots: index
---

This guide walks you through installing and initializing the Yuno SDK for iOS integration.

## Requirements

To implement the Yuno SDK on iOS, you need to meet the following requirements:

* Add [CocoaPods](https://guides.cocoapods.org/using/using-cocoapods.html) or [Swift Package Manager](https://www.swift.org/package-manager/) to your project
* Use iOS version 14.0 or above

## Step 1: Add the Library to Your Project

You can add the Yuno SDK using either CocoaPods or Swift Package Manager.

### CocoaPods

If you don't have a Podfile, follow the [CocoaPods guide](https://guides.cocoapods.org/using/using-cocoapods.html) to create one. Then add the following line to your Podfile:

```ruby
pod 'YunoSDK', '~> 1.1.22'
```

Run the installation:

```ruby
pod install
```

### Swift Package Manager

Add `YunoSDK` as a dependency in your `Package.swift` file:

```swift
dependencies: [
    .package(url: "https://github.com/yuno-payments/yuno-sdk-ios.git", .upToNextMajor(from: "1.1.17"))
]
```

## Step 2: Initialize the SDK

Import and initialize Yuno with your Public API Key:

```swift
import YunoSDK

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: YunoConfig(),
    callback: { (value: Bool) in
        // Initialization complete
    }
)
```

> 🚧 UISceneDelegate Usage
>
> If your app uses a `UISceneDelegate`, place your Yuno initialization code within your `SceneDelegate`.

> 📘 Access Your API Key
>
> Retrieve your API Key from the [Developers section](doc:developers-credentials) in the Yuno Dashboard.

## Step 3: Configure the SDK (Optional)

Customize the SDK appearance and behavior using `YunoConfig`:

```swift
final class YunoConfig {
    let cardFormType: CardFormType
    let appearance: Yuno.Appearance
    let saveCardEnabled: Bool
    let keepLoader: Bool
    let hideCardholderName: Bool
}
```

### Configuration Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `cardFormType` | `CardFormType` | `.oneStep` | Card form flow type. Options: `.oneStep` or `.stepByStep`. |
| `appearance` | `Yuno.Appearance` | Yuno default | Custom appearance configuration for the SDK UI. |
| `saveCardEnabled` | `Bool` | `false` | When `true`, displays a "Save card" checkbox during payment. |
| `keepLoader` | `Bool` | `false` | When `true`, you must manually call `hideLoader()` to dismiss the loader. |
| `hideCardholderName` | `Bool` | `false` | When `true`, hides the cardholder name field in card forms. |

### Example Configuration

```swift
let config = YunoConfig(
    cardFormType: .oneStep,
    appearance: customAppearance,
    saveCardEnabled: true,
    keepLoader: false,
    hideCardholderName: false
)

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: config,
    callback: { (value: Bool) in
        print("SDK initialized: \(value)")
    }
)
```

## Supported Languages

The iOS Flow supports multiple languages for payment forms:

* **es** (Spanish)
* **en** (English)
* **pt** (Portuguese)
* **fr** (French)
* **it** (Italian)
* **de** (German)
* **pl** (Polish)
* **ru** (Russian)
* **tr** (Turkish)
* **nl** (Dutch)
* **sv** (Swedish)
* **ko** (Korean)
* **ja** (Japanese)
* **zh-CN** (Chinese - Simplified)
* **zh-TW** (Chinese - Traditional)
* **vi** (Vietnamese)
* **th** (Thai)
* **ms** (Malay)
* **id** (Indonesian)
* **fil** (Filipino)

When not specified, the SDK uses the device's default language if supported, otherwise falls back to English.

## What's Next?

Now that you've installed and initialized the SDK, choose your integration path:

<Shelf classname="link_cards_container">
  <YunoCard title="Payment Integration" href="../docs/new-ios-sdk-payment-integration" titleSize="h4" description="Process one-time payments with multiple mounting options" />

  <YunoCard title="Enrollment Integration" href="../docs/new-ios-sdk-enrollment-integration" titleSize="h4" description="Save payment methods for future use" />

  <YunoCard title="Complementary Features" href="../docs/new-ios-sdk-complementary-features" titleSize="h4" description="Configuration, UI customization, and fraud prevention" />
</Shelf>

## Additional Resources

* **[iOS Flow Complementary Features](doc:new-ios-sdk-complementary-features)**: Complete configuration and customization reference
* **[Release Notes](doc:release-notes-ios)**: Latest SDK updates and version history

## Demo Application

Yuno provides an example project showcasing iOS SDK integration. You can access the [project repository](https://github.com/yuno-payments/yuno-sdk-ios) or [download the project](https://github.com/yuno-payments/yuno-sdk-ios/archive/refs/heads/main.zip).

## Need Help?

* **[Choose the Right Integration](doc:choose-your-integration)**: Compare all integration options
* **[Country Coverage](doc:quickstart)**: Check supported countries
* **[SDK Integration Overview](doc:new-sdk-integration-overview)**: Understand different integration approaches

