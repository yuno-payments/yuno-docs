---
title: New - iOS Flow
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: iOS Flow
  description: >-
    Yuno's iOS Flow simplifies payment processing integration in your iOS applications with flexible UI components, multiple payment methods, and comprehensive security features.
  robots: index
---

The iOS Flow is designed to simplify the integration of payment processing functionality in your iOS applications using the Yuno SDK. Developers can implement features more efficiently, reducing the need for extensive knowledge of payment protocols and infrastructure.

## Get Started

Follow these guides to integrate the Yuno iOS SDK:

<Shelf classname="link_cards_container">
  <YunoCard title="Getting Started" href="../docs/new-ios-sdk-getting-started" titleSize="h4" description="Install and initialize the iOS SDK in your project" />

  <YunoCard title="Payment Integration" href="../docs/new-ios-sdk-payment-integration" titleSize="h4" description="Process one-time payments with multiple mounting options" />

  <YunoCard title="Enrollment Integration" href="../docs/new-ios-sdk-enrollment-integration" titleSize="h4" description="Save payment methods for future use" />
</Shelf>

## Integration Approaches

The iOS Flow offers flexible integration options to match your technical requirements:

### Automatic Payment Method Display

Use the SDK's built-in UI to display all available payment methods automatically.

**Best for:** Quick integration with minimal UI development

**[Learn more →](doc:new-ios-sdk-payment-integration#option-a-automatic-payment-method-display)**

### Custom Payment Method Display

Control which payment method to display while using SDK components for payment forms.

**Best for:** Custom payment method selection UI with SDK payment processing

**[Learn more →](doc:new-ios-sdk-payment-integration#option-b-custom-payment-method-display)**

### Seamless Flow

Simplified payment creation with automatic backend processing and pre-built UI components.

**Best for:** Fastest integration with automatic payment handling

**[Learn more →](doc:new-ios-sdk-payment-integration#option-c-seamless-flow)**

### Headless Integration (Advanced)

Complete control over the entire UX/UI without any Yuno components.

**Best for:** Fully custom payment experiences with complete control over every interaction

**[Learn more →](doc:new-ios-sdk-payment-integration#alternative-headless-integration-advanced)**

## Key Features

### Multiple Payment Methods

Support for cards, digital wallets (Apple Pay), bank transfers, cash payments, and region-specific payment methods.

### Fraud Prevention

Built-in support for fraud prevention tools including 3DS authentication, device fingerprinting, and integration with third-party fraud engines like ClearSale.

### Flexible UI

Choose between pre-built components with customization options or build your own UI with the Headless Integration.

### Enrollment Support

Save payment methods for future use with a dedicated enrollment flow or during payment processing.

### Modern Architecture

Built with SwiftUI and UIKit support, Swift concurrency (async/await), and modern iOS development practices.

## Technical Requirements

To use the iOS Flow, you need to meet the following requirements:

* **iOS Version**: 14.0 or above
* **Xcode**: 12.0 or higher
* **Swift**: 5.0 or higher
* **Dependency Manager**: CocoaPods or Swift Package Manager

**[View full requirements →](doc:new-ios-sdk-getting-started#requirements)**

## Additional Resources

Explore optional features and configurations:

<Shelf classname="link_cards_container">
  <YunoCard title="Complementary Features" href="../docs/new-ios-sdk-complementary-features" titleSize="h4" description="YunoConfig options, UI customization, and fraud prevention" />

  <YunoCard title="Release Notes" href="../docs/ios-release-notes" titleSize="h4" description="Latest SDK updates and version history" />
</Shelf>

## SDK Project Example

Yuno provides an example project of a running application using the SDK. You can access the [project repository](https://github.com/yuno-payments/yuno-sdk-ios) or [download the project](https://github.com/yuno-payments/yuno-sdk-ios/archive/refs/heads/main.zip).

## Supported Languages

The iOS Flow supports multiple languages including:

* English, Spanish, Portuguese
* Chinese (Simplified and Traditional)
* French, German, Italian, Polish, Russian, Turkish, Dutch, Swedish
* Japanese, Korean
* Indonesian, Malaysian, Thai, Filipino, Vietnamese

For the full list of languages supported, see [Supported Languages](doc:supported-languages).

## Need Help?

* **[Choose the Right Integration](doc:new-choose-the-right-integration-for-you)**: Compare all integration options
* **[Country Coverage](doc:quickstart)**: Check supported countries
* **[SDK Integration Overview](doc:new-sdk-integration-overview)**: Understand different integration approaches

## Stay Updated

* **[Release Notes](doc:ios-release-notes)**: Latest SDK updates and version history
* **[GitHub Repository](https://github.com/yuno-payments/yuno-sdk-ios)**: View source code and contribute

