---
title: New - Getting Started with Android SDK
deprecated: false
hidden: true
metadata:
  robots: index
---
This guide helps you install and initialize Yuno's Android SDK. Complete these setup steps before implementing payment or enrollment functionality.

## Requirements

Before starting the Yuno Android SDK integration, ensure your project meets the following requirements:

* **Minimum SDK Version**: Your `minSdkVersion` must be 21 or above
* **Java Version**: Your project must have Java 8 enabled
* **AndroidX**: Use AndroidX instead of older support libraries
* **Android Gradle Plugin**: Version 4.0.0 or above
* **ProGuard**: Version 6.2.2 or above
* **Kotlin Gradle Plugin**: Version 1.4.0 or above
* **ELF Page Size Support**: Fully compliant with Google's 16 KB ELF page alignment requirements (Android 15 / ARMv9 ready)

> 👍 ELF Page Size Support
>
> The Yuno Android SDK fully supports Google's 16 KB ELF page alignment requirements. All native libraries are built and verified for 16 KB memory pages, ensuring compatibility with Android 15 (API Level 35) and ARMv9 devices. The SDK's native components were validated using Google's `check_elf_alignment.sh` script, confirming full compliance. Apps built with the Yuno SDK can be safely published to the Play Store and meet Google's November 1, 2025 enforcement deadline.

## Prerequisites

Before integrating the SDK, ensure you have:

1. **Active Yuno account**
2. **API credentials** from the [Developers section of the Yuno dashboard](../docs/developers-credentials):
   * `account_id`
   * `public-api-key`
   * `private-secret-key`
3. **Created customer** using the [Create customer endpoint](ref:create-customer)

These credentials are required to authenticate requests to the Yuno API for:

* Creating a `checkout_session` (initializes the payment flow)
* Creating a `customer_session` (initializes the enrollment flow)
* Creating payments

> 📘 SDK Version
>
> Access the [Release notes](doc:release-notes-android-sdk) or the [Yuno Android SDK repository](https://github.com/yuno-payments/yuno-sdk-android) to verify the latest SDK version available.

## Step 1: Add the SDK to Your Project

### Add Repository Source

Include the Yuno SDK file in your project through Gradle. Add the repository source:

```kotlin
maven { url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" }
```

### Add SDK Dependency

Include the following code in the `build.gradle` file to add the Yuno SDK dependency to the application:

```kotlin
dependencies {
    implementation 'com.yuno.payments:android-sdk:{last_version}'
}
```

> 📘 Latest Version
>
> Check the [Release notes](doc:release-notes-android-sdk) or [GitHub repository](https://github.com/yuno-payments/yuno-sdk-android) for the current version.

## Step 2: Configure Permissions

### Required Permissions

The Yuno SDK includes, by default, the `INTERNET` permission, which is required to make network requests:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### Optional Fraud Prevention Permissions

If you're using fraud prevention tools that require additional data:

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
```

### Optional Location Permissions

For fraud prevention tools that use geolocation:

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
```

## Step 3: Initialize the SDK

### Create Custom Application Class

If you haven't implemented a custom application, create one:

```kotlin
class CustomApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Yuno.initialize(
            this,
            "<your-public-api-key>",
            config = YunoConfig()
        )
    }
}
```

> 📘 Get Your Credentials
>
> Retrieve your public API keys from the [Yuno dashboard](https://dashboard.y.uno/). See the [Authentication](https://docs.y.uno/reference/authentication) page for more information.

### Update AndroidManifest

Register your custom application in `AndroidManifest.xml`:

```xml
<application android:name=".CustomApplication">
    <!-- Your activities here -->
</application>
```

## Step 4: Configure SDK Behavior

Use the `YunoConfig` data class to customize the SDK's behavior when calling `Yuno.initialize()`:

```kotlin
data class YunoConfig(
    val cardFlow: CardFormType = CardFormType.ONE_STEP,
    val saveCardEnabled: Boolean = false,
    val cardFormDeployed: Boolean = false,
    val language: YunoLanguage? = null,
    val styles: YunoStyles? = null,
    val cardNumberPlaceholder: String? = null,
    val hideCardholderName: Boolean? = null
)
```

### Configuration Options

| Option                  | Description                                                                                                                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cardFlow`              | Defines the card form layout. Options: `CardFormType.ONE_STEP` (default) or `CardFormType.STEP_BY_STEP`. See [Render Options](#render-options) below.                                                          |
| `saveCardEnabled`       | Enables the "Save card" checkbox on card forms. Default: `false`.                                                                                                                                              |
| `cardFormDeployed`      | When `true`, displays the card form expanded in the payment methods list. When `false`, shows the card form on a separate screen. Default: `false`. (Only applies when using automatic payment method display) |
| `language`              | Defines the language for payment forms. See [Supported Languages](#supported-languages) below.                                                                                                                 |
| `styles`                | Enables SDK-wide UI customization for button appearance and typography through a `YunoStyles` object. See [SDK Customizations](doc:sdk-customizations-android).                                                |
| `cardNumberPlaceholder` | Custom placeholder text for the card number field. Supports alphanumeric characters, spaces, and UTF-8 characters. If not provided, defaults to "Card number".                                                 |
| `hideCardholderName`    | When `true`, hides the cardholder name field in the card form. Default: `false`. Note: Merchants are responsible for providing cardholder name when required by their payment provider.                        |

### Example Configuration

```kotlin
class CustomApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Yuno.initialize(
            this,
            PUBLIC_API_KEY,
            config = YunoConfig(
                cardFlow = CardFormType.ONE_STEP,
                saveCardEnabled = true,
                language = YunoLanguage.EN,
                styles = YunoStyles(
                    buttonStyles = YunoButtonStyles(
                        backgroundColor = Color(0xFF6200EE),
                        contentColor = Color.White,
                        cornerRadius = 8.dp
                    ),
                    fontFamily = customFontFamily
                )
            )
        )
    }
}
```

## Render Options

You can choose between two card form render options:

* **`ONE_STEP`**: All card fields displayed on a single screen (default)
* **`STEP_BY_STEP`**: Card fields displayed across multiple steps

<Image align="center" border={false} src="https://files.readme.io/2b2b5c5c798e57c561beb5cf3e7711e83928de826c2922cd8262b4459c6e1737-Full_SDK_android.png" />

## Supported Languages

The Yuno Android SDK supports the following languages:

* `es` (Spanish)
* `en` (English)
* `pt` (Portuguese)
* `fil` (Filipino)
* `id` (Indonesian)
* `ms` (Malay)
* `th` (Thai)
* `zh-TW` (Chinese - Traditional, Taiwan)
* `zh-CN` (Chinese - Simplified, China)
* `vi` (Vietnamese)
* `fr` (French)
* `pl` (Polish)
* `it` (Italian)
* `de` (German)
* `ru` (Russian)
* `tr` (Turkish)
* `nl` (Dutch)
* `sv` (Swedish)
* `ko` (Korean)
* `ja` (Japanese)

When not specified, the SDK uses the device's default language if supported, otherwise falls back to English.

## What's Next?

Now that you've installed and initialized the SDK, choose your integration path:

<Shelf classname="link_cards_container">
  <YunoCard title="Payment Integration" href="../docs/new-android-sdk-payment-integration" titleSize="h4" description="Process one-time payments with multiple mounting options" />

  <YunoCard title="Enrollment Integration" href="../docs/new-android-sdk-enrollment-integration" titleSize="h4" description="Save payment methods for future use" />

  <YunoCard title="Complementary Features" href="../docs/new-android-sdk-complementary-features" titleSize="h4" description="Configuration, UI customization, card scanning, and fraud prevention" />
</Shelf>

## Additional Resources

* **[Android SDK Complementary Features](doc:new-android-sdk-complementary-features)**: Complete configuration and customization reference
* **[External Browser Handling](doc:external-browser-callback-android)**: Handle deep links and browser returns
* **[Release Notes](doc:release-notes-android-sdk)**: Latest SDK updates and version history

## Demo Application

In addition to the documentation, you can access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-android/tree/master) for a complete implementation of Yuno Android SDKs with working examples.

## Need Help?

* **[Choose the Right Integration](doc:choose-the-right-integration-for-you)**: Compare all integration options
* **[Country Coverage](doc:country-coverage-yuno-sdk)**: Check supported countries
* **[Release Notes](doc:release-notes-android-sdk)**: Latest SDK updates

## Stay Updated

Visit the [Release Notes](doc:release-notes-android-sdk) page for the latest SDK updates and version history.