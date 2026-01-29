---
title: Flutter Lite v2
deprecated: false
hidden: true
metadata:
  robots: index
---
This guide walks you through integrating Yuno's Flutter SDK Lite payment and enrollment flows into your project.

## Requirements

Before you start, make sure your project meets these requirements:

* Flutter SDK installed (Dart included).
* iOS 14.0 or above.
* Android minSdkVersion 21 or above.
* Java 8 enabled and AndroidX enabled.
* Android Gradle plugin 4.0.0 or above.
* Proguard 6.2.2 or above.
* Kotlin Gradle plugin 1.4.0 or above.
* `FlutterFragmentActivity` for `MainActivity` on Android.

## Adding the SDK to your project

This section applies to both Payment and Enrollment flows. Complete these steps before implementing either flow.

### Flutter Package

Add the Yuno package to your Flutter project:

```bash
flutter pub add yuno
```

### Android Configuration

Add the Yuno Maven repository to your project-level `android/build.gradle`:

```groovy
allprojects {
  repositories {
    google()
    mavenCentral()
    maven { url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" }
  }
}
```

Use `FlutterFragmentActivity` in `MainActivity.kt`:

```kotlin
class MainActivity: FlutterFragmentActivity()
```

Create a custom `Application` and initialize the native SDK:

```kotlin
import android.app.Application
import com.yuno_flutter.yuno_sdk_android.YunoSdkAndroidPlugin

class MyApp : Application() {
  override fun onCreate() {
    super.onCreate()
    YunoSdkAndroidPlugin.initSdk(this, "YUNO_API_KEY")
  }
}
```

Then register the application class in `AndroidManifest.xml`:

```xml
<application
  android:name=".MyApp">
```

### iOS Configuration

No additional iOS-specific configuration required beyond the Flutter package installation. iOS appearance customization is configured through `IosConfig` during SDK initialization (see Customizations section).

## Payment

### Step 1: Create a customer and checkout session

Before initiating a payment through the SDK, you need to create a customer and checkout session using Yuno's server-side API. The customer represents the person making the payment, while the checkout session contains transaction details like amount, currency, and available payment methods. These are created in your backend to ensure security and prevent client-side tampering.

Create a customer using the [Create customer endpoint](ref:create-customer). This customer is required for checkout sessions and saved cards.

Create a new `checkout_session` using the [Create checkout session](ref:create-checkout-session) endpoint. Keep the returned `checkout_session` ID for use in Step 4.

### Step 2: Initialize the SDK

Initialize the Yuno SDK in your Flutter app before any payment or enrollment operations. This configures the SDK with your API key and sets regional, language, and UI preferences that will apply throughout the payment flow.

Make sure `Yuno.init()` is called before `runApp` in your main.dart file:

```dart
await Yuno.init(
  apiKey: 'YOUR_PUBLIC_API_KEY',
  countryCode: 'CO',
  yunoConfig: const YunoConfig(),
  iosConfig: const IosConfig(),
);
```

See [`Yuno.init`](#yunoinit), [`YunoConfig`](#yunoconfig), and [`IosConfig`](#iosconfig) parameters for detailed configuration options.

### Step 3: Start the checkout process

Set up a payment listener in your widget tree to receive payment events and status updates from the SDK. The listener must be placed in the widget tree before initiating the payment flow so it can capture the one-time token and payment status.

Use `YunoPaymentListener` or `YunoMultiListener` to receive the OTT from the SDK:

```dart
YunoPaymentListener(
  listener: (context, state) {
    final ott = state.token;
    if (ott.isNotEmpty) {
      // Send ott to your backend to create the payment
    }
  },
  child: YourWidget(),
)
```

Alternatively, use `YunoMultiListener` to handle both payment and enrollment flows:

```dart
YunoMultiListener(
  paymentListener: (context, state) {
    final ott = state.token;
    if (ott.isNotEmpty) {
      // Send ott to your backend to create the payment
    }
  },
  enrollmentListener: (context, state) {
    final status = state.enrollmentStatus;
    // Handle enrollment status updates
  },
  child: YourWidget(),
)
```

#### Payment status values

The SDK returns different transaction states through the `YunoStatus` enum. The following table describes each state:

| Status          | Description                                                                                                                                                                                                                      | Additional Action Required                                                                                                                            |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `succeeded`     | The transaction or payment process has been completed successfully.                                                                                                                                                              | No. The payment was processed successfully.                                                                                                           |
| `fail`          | The transaction failed due to errors such as data validation issues, server connection failures, or technical/network problems.                                                                                                  | Yes. Investigate the cause of failure (validation, network, server) and take corrective measures. Allow the user to retry with corrected information. |
| `processing`    | The transaction is currently being processed. It is typically used when there is a delay in processing the payment, such as waiting for approval from a third-party service or financial institution.                            | No. Wait for the final status. For asynchronous payment methods, this may be the final SDK status while the payment completes in the background.      |
| `reject`        | The transaction has been rejected. The rejection can occur for various reasons, such as insufficient funds, fraudulent activity, or a request that violates specific rules or policies.                                          | Yes. Inform the user of the rejection with a clear message. If possible, provide the reason and suggest alternative payment methods or actions.       |
| `internalError` | An unexpected error occurred within the system or infrastructure handling the payment process. This state suggests that there was a problem on the server or backend side rather than an issue with the user's input or request. | Yes. Requires technical intervention to review logs and identify the issue. Allow the user to retry or provide alternative payment options.           |
| `cancelByUser`  | The user has voluntarily canceled or aborted the transaction or payment process. This state is typically used when the user closes the payment form or explicitly cancels the operation.                                         | No. The user intentionally canceled the payment. You may want to track this for analytics purposes.                                                   |

### Step 4: Initiate payment

Start the Lite payment flow by calling `startPaymentLite` with the selected payment method. In the Lite SDK, you are responsible for displaying available payment methods and capturing the user's selection. The SDK handles the payment form and processing for the selected method.

```dart
await Yuno.startPaymentLite(
  arguments: StartPayment(
    checkoutSession: checkoutSessionId,
    methodSelected: const MethodSelected(
      paymentMethodType: 'CARD',
    ),
  ),
);
```

The Lite payment flow does not render a payment method list. Your app must show the available methods and pass the selected `paymentMethodType` (and `vaultedToken` if applicable).

See [`StartPayment`](#startpayment-lite) and [`MethodSelected`](#methodselected) parameters for detailed options.

### Step 5: Get the OTT (one-time token)

After the user completes the payment form, the SDK generates a one-time token (OTT) that securely represents the payment details. This token is delivered to your `YunoPaymentListener` callback and must be sent to your backend to create the actual payment.

The OTT is available in the listener you set up in Step 3:

```dart
listener: (context, state) {
  final ott = state.token;
  if (ott.isNotEmpty) {
    // Send ott to your backend to create the payment
  }
}
```

### Step 6: Create the payment

Use the one-time token from Step 5 to create the payment in your backend. Call the [Create payment endpoint](ref:create-payment) from your server with:

* `one_time_token` from Step 5
* `checkout_session` from Step 1

The API response will indicate whether additional actions are required using the `sdk_action_required` field.

### Step 7: Continue payment (when sdk_action_required: true)

Some payment methods require additional customer actions to complete the transaction, such as 3D Secure authentication or bank redirects. When the Create Payment API response includes `sdk_action_required: true`, you must call `continuePayment` to display these additional screens to the user.

If the API response includes `sdk_action_required: true`, call:

```dart
await Yuno.continuePayment(showPaymentStatus: true);
```

This method handles asynchronous payment flows automatically, including authentication challenges, redirect pages, and payment confirmations.

### Payment status validation

The SDK manages the relationship between frontend SDK status and backend payment status when users interact with payment flows. Understanding this distinction helps you handle payment states correctly in your application.

#### Sync payment methods (Apple Pay and Google Pay)

For synchronous payment methods like Apple Pay and Google Pay, when a user cancels or closes the wallet UI before a payment service provider (PSP) response is received:

* **SDK Status**: Returns `cancelByUser` (CANCELLED_BY_USER)
* **Backend payment status**: Remains `PENDING` until PSP timeout or merchant cancellation
* **Important**: The SDK will not return `reject` or `processing` in this scenario

This ensures that the backend payment remains in a pending state and can be properly handled by the merchant's system.

#### Async payment methods (PIX and QR-based methods)

For asynchronous payment methods like PIX, when a user closes the QR code window before completing the payment:

* **SDK Status**: Returns `processing`, optionally with a sub-status such as `CLOSED_BY_USER`
* **Backend payment status**: Remains `PENDING` and the QR code remains valid until expiry
* **Checkout session reuse**: Re-opening the same checkout session can display the same valid QR code
* **No Automatic Cancellation**: The PIX payment is not automatically cancelled when the user closes the QR window

This behavior allows users to return to the payment flow and complete the transaction using the same QR code before it expires.

#### Expired async payments

If a PIX QR code expires naturally:

* **Backend Status**: Updated to `EXPIRED`
* **SDK Status**: SDK callbacks and polling endpoints return `EXPIRED` consistently

This ensures merchants receive accurate status information when a payment method has expired.

## Enrollment

### Step 1: Create customer and customer session

Before enrolling a payment method, create a customer and customer session in your backend. The customer session is specifically designed for enrollment flows and associates the enrolled payment method with the customer for future use.

Create a customer and a `customer_session` using the [Create customer session endpoint](ref:create-customer-session). Keep the returned `customer_session` ID for use in Step 4.

### Step 2: Initialize the SDK

If you haven't already initialized the SDK for payment flows, initialize it now with your API key and configuration preferences. This step can be shared between payment and enrollment flows.

Make sure `Yuno.init()` is called before any enrollment operations:

```dart
await Yuno.init(
  apiKey: 'YOUR_PUBLIC_API_KEY',
  countryCode: 'CO',
  yunoConfig: const YunoConfig(),
  iosConfig: const IosConfig(),
);
```

See [`Yuno.init`](#yunoinit), [`YunoConfig`](#yunoconfig), and [`IosConfig`](#iosconfig) parameters for detailed configuration options.

### Step 3: Start enrollment process

Set up an enrollment listener in your widget tree to receive enrollment status updates from the SDK. The listener captures the enrollment result and any errors that occur during the process.

Use `YunoEnrollmentListener` or `YunoMultiListener`:

```dart
YunoEnrollmentListener(
  listener: (context, state) {
    final status = state.enrollmentStatus;
    // Handle status updates
  },
  child: YourWidget(),
)
```

### Step 4: Initiate enrollment

Start the enrollment flow by calling `enrollmentPayment` with the customer session. The SDK will display the appropriate enrollment form for the payment method the user wants to save.

```dart
await Yuno.enrollmentPayment(
  arguments: EnrollmentArguments(
    customerSession: customerSessionId,
    showPaymentStatus: true,
  ),
);
```

See [`EnrollmentArguments`](#enrollmentarguments) parameters for detailed options.

### Step 5: Listen for enrollment status

Monitor the enrollment status through the listener you configured in Step 3. The status indicates whether the payment method was successfully enrolled, failed, or requires additional actions.

The enrollment status is delivered to your `YunoEnrollmentListener` callback:

```dart
listener: (context, state) {
  final status = state.enrollmentStatus;
  // Handle enrollment completion, errors, or user cancellation
}
```

### Step 6: Handle deep links (optional)

Some enrollment flows redirect users to external authentication pages (like bank portals) and return to your app via deep links. This step is only required if you're enrolling payment methods that use external authentication or verification.

If the enrollment flow uses a deep link to return to your app on iOS:

1. Configure your URL scheme in `Info.plist` to match the `callback_url` used in the `customer_session`.
2. Pass the URL to the SDK:

```dart
await Yuno.receiveDeeplink(url: uri);
```

For Android deep link configuration, refer to the [Android deep linking documentation](doc:external-browser-callback-android).

## Parameters

The following parameters are used in the integration flows above.

### `Yuno.init`

| Parameter     | Description                                                                     |
| :------------ | :------------------------------------------------------------------------------ |
| `apiKey`      | Your Yuno public API key.                                                       |
| `countryCode` | Country where the payment is performed. See [Country coverage](doc:quickstart). |
| `yunoConfig`  | SDK configuration options. See `YunoConfig` below.                              |
| `iosConfig`   | iOS appearance configuration. See `IosConfig` below.                            |

### `YunoConfig`

| Parameter             | Description                                                                                                                                                                                                                                                                                                                                   |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lang`                | Defines the language to be used in the payment forms. You can set it to one of the available language options: <ul><li>en (English)</li><li>es (Spanish)</li><li>pt (Portuguese)</li><li>ms (Malay)</li><li>id (Indonesian)</li><li>th (Thai)</li><li>ar (Arabic)</li></ul> See [Supported languages](#supported-languages) for more details. |
| `cardFlow`            | Card form render mode. Use `CardFlow.oneStep` for a single-page card form or `CardFlow.multiStep` for a step-by-step card input experience. Default: `CardFlow.oneStep`.                                                                                                                                                                      |
| `saveCardEnable`      | Enables the **Save card checkbox** on card flows, allowing users to save their card for future payments. Default: `false`.                                                                                                                                                                                                                    |
| `keepLoader`          | Keeps the SDK loader visible until you call `Yuno.hideLoader()` or the flow completes. When set to `true`, you must manually hide the loader. Default: `false`.                                                                                                                                                                               |
| `isDynamicViewEnable` | Enables dynamic view updates for native UI components on Android and iOS. This allows the SDK to refresh UI elements based on payment method requirements.                                                                                                                                                                                    |
| `cardFormDeployed`    | Enables card form deployment mode for supported flows. When enabled, the card form will be displayed in an expanded state by default, showing all fields at once.                                                                                                                                                                             |

### `IosConfig`

| Parameter    | Description                                                                                                                                                  |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `appearance` | iOS-only appearance customization. See [`Appearance`](#appearance-ios) below and the [Customizations](#customizations) section for detailed styling options. |

### `Appearance` (iOS)

| Parameter                              | Description                                      |
| :------------------------------------- | :----------------------------------------------- |
| `fontFamily`                           | iOS font family name.                            |
| `accentColor`                          | Accent color for highlights and active elements. |
| `buttonBackgroundColor`                | Primary button background color.                 |
| `buttonTitleBackgroundColor`           | Primary button title color.                      |
| `buttonBorderBackgroundColor`          | Primary button border color.                     |
| `secondaryButtonBackgroundColor`       | Secondary button background color.               |
| `secondaryButtonTitleBackgroundColor`  | Secondary button title color.                    |
| `secondaryButtonBorderBackgroundColor` | Secondary button border color.                   |
| `disableButtonBackgroundColor`         | Disabled button background color.                |
| `disableButtonTitleBackgroundColor`    | Disabled button title color.                     |
| `checkboxColor`                        | Checkbox color.                                  |

### `StartPayment` (Lite)

| Parameter           | Description                                                                                                                                                                                      |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`   | The `checkout_session` ID created in your backend using the [Create checkout session](ref:create-checkout-session) endpoint. This session identifier is required to initialize the payment flow. |
| `methodSelected`    | The selected payment method information. See `MethodSelected` below for details on specifying the payment method type and optional vaulted token.                                                |
| `showPaymentStatus` | Controls whether the SDK displays its built-in payment status screens after payment completion. Set to `false` if you want to handle status display in your own UI. Default: `true`.             |

### `MethodSelected`

| Parameter           | Description                                                                                                                                                                                                               |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `paymentMethodType` | Payment method type selected by the user. Common values include: `CARD`, `PIX`, `PAYPAL`, `MERCADO_PAGO`, `GOOGLE_PAY`, `APPLE_PAY`. This value must match one of the payment methods available in your checkout session. |
| `vaultedToken`      | Optional vaulted token to reuse a previously saved payment method. When provided, the SDK will use the saved payment method instead of prompting for new payment details. Leave empty for new payment methods.            |

### `EnrollmentArguments`

| Parameter           | Description                                                                                                                                                                                                          |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customerSession`   | The `customer_session` ID created in your backend using the [Create customer session](ref:create-customer-session) endpoint. This session is used to associate the enrolled payment method with a specific customer. |
| `showPaymentStatus` | Controls whether the SDK displays its built-in enrollment status screens after enrollment completion. Set to `false` if you want to handle status display in your own UI. Default: `true`.                           |
| `countryCode`       | Optional country code override for this enrollment. If not provided, the SDK uses the country code from `Yuno.init()`. See [Country coverage](doc:quickstart) for supported countries.                               |

## Customizations

You can customize SDK behavior and appearance using the configuration options:

* `YunoConfig` for language, card flow render mode, save card, and loader handling
* `IosConfig.appearance` for iOS UI styling
* Android styling through native configuration (see below)

### iOS Customization

iOS appearance is fully customizable through the `IosConfig.appearance` parameter in `Yuno.init()`. You can modify visual styling to match your brand identity, including colors, fonts, and button designs.

#### Available iOS Customization Options

| Parameter                              | Type   | Description                                                                                                 |
| -------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| `fontFamily`                           | String | Custom font family name for all SDK text. Use the font name as registered in your iOS project's Info.plist. |
| `accentColor`                          | Color  | Primary accent color used for highlights, active states, and interactive elements throughout the SDK.       |
| `buttonBackgroundColor`                | Color  | Background color for primary action buttons (e.g., "Pay", "Confirm").                                       |
| `buttonTitleBackgroundColor`           | Color  | Text color for primary button labels.                                                                       |
| `buttonBorderBackgroundColor`          | Color  | Border color for primary buttons. Set to match background for borderless buttons.                           |
| `secondaryButtonBackgroundColor`       | Color  | Background color for secondary/cancel buttons.                                                              |
| `secondaryButtonTitleBackgroundColor`  | Color  | Text color for secondary button labels.                                                                     |
| `secondaryButtonBorderBackgroundColor` | Color  | Border color for secondary buttons.                                                                         |
| `disableButtonBackgroundColor`         | Color  | Background color for disabled buttons (when user cannot proceed).                                           |
| `disableButtonTitleBackgroundColor`    | Color  | Text color for disabled button labels.                                                                      |
| `checkboxColor`                        | Color  | Color for checkboxes like "Save card for future payments".                                                  |

> **Note:** When using `Color(0xFF...)` for iOS appearance customization, you must add `import 'dart:ui';` at the top of your file.

For more iOS customization options, see [SDK Customizations (iOS)](doc:sdk-customizations-ios).

### Android Customization

For Android, the Flutter SDK leverages the native Android SDK's styling system. Customization is performed in the native Android layer using Kotlin/Java code when initializing the SDK through `YunoSdkAndroidPlugin.initSdk()`.

#### YunoConfig (Android)

The Android SDK supports comprehensive styling through the `YunoConfig` data class:

```kotlin
data class YunoConfig(
    val cardFlow: CardFormType = CardFormType.ONE_STEP,
    val saveCardEnabled: Boolean = false,
    val language: YunoLanguage? = null,
    val styles: YunoStyles? = null
)
```

#### YunoStyles

Control the visual appearance of SDK components:

```kotlin
data class YunoStyles(
    val buttonStyles: YunoButtonStyles? = null,
    val fontFamily: FontFamily? = null
)
```

| Parameter      | Type             | Description                                                                                                                                                        |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `buttonStyles` | YunoButtonStyles | Customizes all primary action buttons displayed in the SDK including background, text, borders, and state colors. See YunoButtonStyles below for detailed options. |
| `fontFamily`   | FontFamily       | Sets a custom font family for all text elements throughout the SDK. Use a FontFamily registered in your Android app.                                               |

#### YunoButtonStyles

Fine-tune button appearance with these options:

```kotlin
data class YunoButtonStyles(
    val backgroundColor: Color? = null,
    val contentColor: Color? = null,
    val cornerRadius: Dp? = null,
    val elevation: Dp? = null,
    val padding: Dp? = null,
    val fontFamily: FontFamily? = null,
    val fontSize: TextUnit? = null,
    val fontStyle: FontStyle? = null
)
```

| Parameter         | Type       | Description                                                              |
| ----------------- | ---------- | ------------------------------------------------------------------------ |
| `backgroundColor` | Color      | Background color for buttons.                                            |
| `contentColor`    | Color      | Text and icon color for buttons.                                         |
| `cornerRadius`    | Dp         | Button corner radius for rounded corners. Use `0.dp` for square buttons. |
| `elevation`       | Dp         | Shadow elevation for Material Design elevation effect.                   |
| `padding`         | Dp         | Internal padding inside buttons.                                         |
| `fontFamily`      | FontFamily | Font family specifically for button text (overrides global fontFamily).  |
| `fontSize`        | TextUnit   | Font size for button text.                                               |
| `fontStyle`       | FontStyle  | Font style (normal, italic, bold) for button text.                       |

Configure styles in your `Application` class during SDK initialization in `MyApp.kt`. For more Android customization options including XML themes and drawable customization, see [SDK Customizations (Android)](doc:sdk-customizations-android).

## Environment variables (recommended)

Use `--dart-define` to avoid hardcoding keys:

```bash
flutter run --dart-define="YUNO_API_KEY=apiKey"
```

Then read it in Dart:

```dart
const apiKey = String.fromEnvironment('YUNO_API_KEY', defaultValue: '');
```

If you also need the key on Android native side, map `dart-defines` into `BuildConfig` and read `BuildConfig.YUNO_API_KEY` in `MyApp` (see the Flutter SDK README for the full snippet).

## Troubleshooting

| Issue                                                            | Cause                                                                                                                                                 | Fix                                                                                                                                                                                                                                                  |
| :--------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Country code has not been initialized. Call Yuno.init() first.` | `Yuno.init()` was not called or failed before calling payment/enrollment methods.                                                                     | Ensure `Yuno.init()` completes before any SDK call, and avoid hot reload for Android configuration changes. Perform a full restart after initialization changes.                                                                                     |
| Android native initialization fails silently                     | The Android native SDK was not initialized in the `Application` class, or the custom `Application` class was not registered in `AndroidManifest.xml`. | Verify that: 1) `YunoSdkAndroidPlugin.initSdk()` is called in your custom `Application` class `onCreate()`, 2) The custom `Application` class is registered in `AndroidManifest.xml` with `android:name=".MyApp"`, 3) The API key is correct.        |
| Hot reload causes Android initialization issues                  | Flutter's hot reload doesn't re-execute native platform initialization code.                                                                          | Perform a full app restart (stop and restart) instead of hot reload when making changes to `Yuno.init()` or Android native configuration.                                                                                                            |
| Payment status listener not triggered                            | Listener widget is not in the widget tree above the point where payment is initiated, or the listener is recreated during navigation.                 | Ensure `YunoPaymentListener` or `YunoMultiListener` wraps the relevant part of your widget tree and persists across navigation. Place it high in the widget tree (e.g., wrapping `MaterialApp` or a top-level screen).                               |
| Deep links not working on iOS                                    | URL scheme not configured in `Info.plist` or scheme doesn't match the `callback_url` in checkout/customer session.                                    | Add URL scheme configuration to `Info.plist` matching the scheme used in your `callback_url`. Ensure the scheme is unique to your app. Call `Yuno.receiveDeeplink(url: uri)` in your deep link handler.                                              |
| Android build fails with Maven repository error                  | Yuno Maven repository not added or added in wrong location in `build.gradle`.                                                                         | Add `maven { url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" }` to the `repositories` block in your project-level `android/build.gradle` (not in the app-level `build.gradle`). Ensure it's inside the `allprojects` section. |
| `MainActivity` crashes on Android                                | `MainActivity` doesn't extend `FlutterFragmentActivity` as required by the Yuno SDK.                                                                  | Change your `MainActivity` to extend `FlutterFragmentActivity` instead of `FlutterActivity`: `class MainActivity: FlutterFragmentActivity()`                                                                                                         |
| Token is empty or null in payment listener                       | Payment form validation failed, or the user canceled before completing the form.                                                                      | Check for validation errors in the payment form. Ensure all required fields are filled correctly. Add null/empty checks in your listener before using the token.                                                                                     |
| Customization not applied                                        | Platform-specific customization not configured correctly or cached build artifacts.                                                                   | For iOS: Verify `IosConfig.appearance` is properly set in `Yuno.init()`. For Android: Check native styling in XML or programmatic configuration. Clear build cache with `flutter clean` and rebuild.                                                 |

## Notes

* The Lite payment flow requires you to render the payment method list and pass the selected `paymentMethodType`.
* Use `YunoPaymentListener`/`YunoEnrollmentListener` to receive OTT/status updates and drive backend calls.

## Supported languages

The Flutter SDK supports the following `YunoLanguage` values:

`en` (English), `es` (Spanish), `pt` (Portuguese), `ms` (Malay), `id` (Indonesian), `th` (Thai), `ar` (Arabic).
