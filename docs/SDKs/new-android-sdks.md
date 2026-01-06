---
title: New - Android SDKs
deprecated: false
hidden: true
metadata:
  robots: index
---
<br />

> 👍 ELF Page Size Support
>
> The Yuno Android SDK fully supports Google's 16 KB ELF page alignment requirements. All native libraries are built and verified for 16 KB memory pages, ensuring compatibility with Android 15 (API Level 35) and ARMv9 devices. The SDK's native components were validated using Google's `check_elf_alignment.sh` script, confirming full compliance. Apps built with the Yuno SDK can be safely published to the Play Store and meet Google's November 1, 2025 enforcement deadline.

Yuno's Android SDKs are specifically designed to simplify the integration of payment processing functionality in your Android applications. Developers can implement features more efficiently, reducing the need for extensive knowledge of payment protocols and infrastructure.

## Get Started

Follow these steps to integrate Yuno's Android SDK:

<Shelf classname="link_cards_container">
  <YunoCard title="Getting Started" href="../docs/android-sdk-getting-started" titleSize="h4" description="Install and initialize the Android SDK" badge="Start Here" />

  <YunoCard title="Payment Integration" href="../docs/android-sdk-payment-integration" titleSize="h4" description="Process payments with multiple mounting options" badge="Payment" />

  <YunoCard title="Enrollment Integration" href="../docs/android-sdk-enrollment-integration" titleSize="h4" description="Save payment methods for future use" badge="Enrollment" />
</Shelf>

## Advanced Integration Options

For advanced use cases requiring more control over the payment experience:

<Shelf classname="link_cards_container">
  <YunoCard title="Headless SDK (Payment)" href="../docs/headless-sdk-payment-android" titleSize="h4" description="Complete control over payment UI and flow" badge="Advanced" />

  <YunoCard title="Headless SDK (Enrollment)" href="../docs/headless-sdk-enrollment-android" titleSize="h4" description="Complete control over enrollment UI and flow" badge="Advanced" />
</Shelf>

## Additional Resources

<Shelf classname="link_cards_container">
  <YunoCard title="SDK Customizations" href="../docs/sdk-customizations-android" titleSize="h4" description="Customize SDK appearance to match your brand" />

  <YunoCard title="Card Scanning (OCR)" href="../docs/card-scanning-ocr-android" titleSize="h4" description="Enable camera-based card scanning" />

  <YunoCard title="ClearSale Integration" href="../docs/clearsale-sdk-android" titleSize="h4" description="Fraud prevention with ClearSale" />

  <YunoCard title="External Browser Handling" href="../docs/external-browser-callback-android" titleSize="h4" description="Handle deep links and browser returns" />

  <YunoCard title="Requirements" href="../docs/requirements-android" titleSize="h4" description="Technical requirements for Android SDK" />

  <YunoCard title="Release Notes" href="../docs/release-notes-android-sdk" titleSize="h4" description="Latest SDK updates and version history" badge="Changelog" />
</Shelf>

## Understanding Integration Options

The Yuno SDK offers different approaches to integrate payments:

### Standard SDK Integration

Use the standard SDK when you want pre-built, secure UI components. You have **three mounting options**:

* **Automatic Display**: Yuno displays all available payment methods automatically
* **Custom Display**: You control which payment methods to display
* **Seamless Flow**: Simplified flow with streamlined payment creation

**Best for:** Most integrations, standard checkouts, quick implementation

**[Learn more →](doc:android-sdk-payment-integration)**

### Headless SDK (Advanced)

Use Headless SDK when you need complete control over the entire UX/UI without any Yuno components.

**Best for:** Fully custom payment experiences, complete control over every interaction

**[Learn more →](doc:headless-sdk-payment-android)**

### Direct API Integration

For server-to-server integration without SDK components, see [Direct Workflow](doc:direct-flow).

**Requires:** PCI-DSS certification

## Key Features

### Multiple Payment Methods

Support for cards, digital wallets, bank transfers, cash payments, and region-specific payment methods.

### Fraud Prevention

Built-in support for fraud prevention tools including 3DS authentication, device fingerprinting, and integration with third-party fraud engines.

### Flexible UI

Choose between pre-built components with customization options or build your own UI with the Headless SDK.

### Enrollment Support

Save payment methods for future use with a dedicated enrollment flow or during payment processing.

### Modern Architecture

Built with Jetpack Compose support, Kotlin coroutines, and AndroidX libraries for seamless integration with modern Android apps.

## Technical Requirements

To use the Yuno Android SDK, you need to meet the following requirements:

* **Minimum SDK Version**: Your `minSdkVersion` must be 21 or above
* **Java Version**: Your project must have Java 8 enabled
* **AndroidX**: Use AndroidX instead of older support libraries
* **Android Gradle Plugin**: Version 4.0.0 or above
* **ProGuard**: Version 6.2.2 or above
* **Kotlin Gradle Plugin**: Version 1.4.0 or above

**[View full requirements →](doc:requirements-android)**

## SDK Project Example

Yuno provides an example project of a running application using the SDK. You can access the [project repository](https://github.com/yuno-payments/yuno-sdk-android) or [download the project](https://github.com/yuno-payments/yuno-sdk-android/archive/refs/heads/master.zip).

You can also access the [Create Your First Payment With SDK](doc:step-2-your-first-payment) guide available in the documentation.

## Supported Languages

The Yuno Android SDK supports multiple languages including:

* English, Spanish, Portuguese
* Chinese (Simplified and Traditional)
* French, German, Italian, Polish, Russian, Turkish, Dutch, Swedish
* Japanese, Korean
* Indonesian, Malaysian, Thai, Filipino, Vietnamese

For the full list of languages supported, see [Supported Languages](doc:supported-languages).

## Need Help?

* **[Choose the Right Integration](doc:choose-the-right-integration-for-you)**: Compare all integration options
* **[Country Coverage](doc:country-coverage-yuno-sdk)**: Check supported countries
* **[Release Notes](doc:release-notes-android-sdk)**: Latest SDK updates and version history

## Stay Updated

Visit the [Release Notes](doc:release-notes-android-sdk) for the latest SDK updates and version history.
