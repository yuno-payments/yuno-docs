---
title: Flutter Lite v1
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

This section is shared by Payment and Enrollment flows.

1. Add the package:

```bash
flutter pub add yuno
```

2. Android configuration:

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

3. Initialize the Flutter SDK (before `runApp`):

```dart
await Yuno.init(
  apiKey: 'YOUR_PUBLIC_API_KEY',
  countryCode: 'CO',
  yunoConfig: const YunoConfig(),
  iosConfig: const IosConfig(),
);
```

## Parameters

The following parameters are used in the steps below.

### `Yuno.init`

| Parameter     | Description                                                                     |
| :------------ | :------------------------------------------------------------------------------ |
| `apiKey`      | Your Yuno public API key.                                                       |
| `countryCode` | Country where the payment is performed. See [Country coverage](doc:quickstart). |
| `yunoConfig`  | SDK configuration options. See `YunoConfig` below.                              |
| `iosConfig`   | iOS appearance configuration. See `IosConfig` below.                            |

### `YunoConfig`

| Parameter             | Description                                                                                |
| :-------------------- | :----------------------------------------------------------------------------------------- |
| `lang`                | SDK language. Uses `YunoLanguage` values. See [Supported languages](#supported-languages). |
| `cardFlow`            | Card form render mode. Use `CardFlow.oneStep` or `CardFlow.multiStep`.                     |
| `saveCardEnable`      | Enables save card checkbox in card flows.                                                  |
| `keepLoader`          | Keeps the SDK loader visible until you call `Yuno.hideLoader()` or the flow completes.     |
| `isDynamicViewEnable` | Enables dynamic view updates for native UI.                                                |
| `cardFormDeployed`    | Enables card form deployment mode for supported flows.                                     |

### `IosConfig`

| Parameter    | Description                                                                                    |
| :----------- | :--------------------------------------------------------------------------------------------- |
| `appearance` | iOS-only appearance customization. See [SDK Customizations (iOS)](doc:sdk-customizations-ios). |

### `Appearance` (iOS)

| Parameter                             | Description                                      |
| :------------------------------------ | :----------------------------------------------- |
| `fontFamily`                          | iOS font family name.                            |
| `accentColor`                         | Accent color for highlights and active elements. |
| `buttonBackgrounColor`                | Primary button background color.                 |
| `buttonTitleBackgrounColor`           | Primary button title color.                      |
| `buttonBorderBackgrounColor`          | Primary button border color.                     |
| `secondaryButtonBackgrounColor`       | Secondary button background color.               |
| `secondaryButtonTitleBackgrounColor`  | Secondary button title color.                    |
| `secondaryButtonBorderBackgrounColor` | Secondary button border color.                   |
| `disableButtonBackgrounColor`         | Disabled button background color.                |
| `disableButtonTitleBackgrounColor`    | Disabled button title color.                     |
| `checkboxColor`                       | Checkbox color.                                  |

### `StartPayment` (Lite)

| Parameter           | Description                                                     |
| :------------------ | :-------------------------------------------------------------- |
| `checkoutSession`   | The `checkout_session` created in your backend.                 |
| `methodSelected`    | The selected payment method. See `MethodSelected` below.        |
| `showPaymentStatus` | Shows or hides the SDK payment status screens. Default: `true`. |

### `MethodSelected`

| Parameter           | Description                                                                      |
| :------------------ | :------------------------------------------------------------------------------- |
| `paymentMethodType` | Payment method type selected by the user (for example: `CARD`, `PIX`, `PAYPAL`). |
| `vaultedToken`      | Optional vaulted token to reuse a saved payment method.                          |

### `EnrollmentArguments`

| Parameter           | Description                                                        |
| :------------------ | :----------------------------------------------------------------- |
| `customerSession`   | The `customer_session` created in your backend.                    |
| `showPaymentStatus` | Shows or hides the SDK enrollment status screens. Default: `true`. |
| `countryCode`       | Optional override for country code.                                |

## Payment

### Step 1: Create a customer

Create a customer using the [Create customer endpoint](ref:create-customer). This customer is required for checkout sessions and saved cards.

### Step 2: Create a checkout session

Create a new `checkout_session` using the [Create checkout session](ref:create-checkout-session) endpoint. Keep the returned `checkout_session` ID.

### Step 3: Initialize the SDK

Make sure `Yuno.init()` is called before any payment or enrollment flows.

### Step 4: Let the user choose a payment method

The Lite payment flow does not render a payment method list. Your app must show the available methods and pass the selected `paymentMethodType` (and `vaultedToken` if applicable).

### Step 5: Start the Lite payment flow

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

### Step 6: Listen for the one-time token (OTT)

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

The payment status values are `YunoStatus` enum values:

`reject`, `succeeded`, `fail`, `processing`, `internalError`, `cancelByUser`.

### Step 7: Create the payment

Create the payment in your backend using the [Create payment endpoint](https://docs.y.uno/reference/create-payment) with:

* `one_time_token` from Step 6
* `checkout_session` from Step 2

### Step 8: Continue payment (if required)

If the API response includes `sdk_action_required: true`, call:

```dart
await Yuno.continuePayment(showPaymentStatus: true);
```

## Enrollment

### Step 1: Create a customer and customer session

Create a customer and a `customer_session` using the [Create customer session endpoint](ref:create-customer-session). Keep the returned `customer_session` ID.

### Step 2: Start enrollment

```dart
await Yuno.enrollmentPayment(
  arguments: EnrollmentArguments(
    customerSession: customerSessionId,
    showPaymentStatus: true,
  ),
);
```

### Step 3: Listen for enrollment status

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

### Step 4: Handle deep links (optional)

If the enrollment flow uses a deep link to return to your app on iOS:

1. Configure your URL scheme in `Info.plist` to match the `callback_url` used in the `customer_session`.
2. Pass the URL to the SDK:

```dart
await Yuno.receiveDeeplink(url: uri);
```

## Customizations

You can customize SDK behavior and appearance using the configuration options:

* `YunoConfig` for language, card flow render mode, save card, and loader handling
* `IosConfig.appearance` for iOS UI styling
* Android styling options through [SDK Customizations (Android)](doc:sdk-customizations-android)

Example:

```dart
import 'dart:ui'; // Required for Color class

await Yuno.init(
  apiKey: 'YOUR_PUBLIC_API_KEY',
  countryCode: 'CO',
  yunoConfig: const YunoConfig(
    lang: YunoLanguage.en,
    cardFlow: CardFlow.multiStep,
    saveCardEnable: true,
    keepLoader: true,
  ),
  iosConfig: const IosConfig(
    appearance: Appearance(
      fontFamily: 'Avenir',
      accentColor: Color(0xFF4E3DD8),
      buttonBackgrounColor: Color(0xFF4E3DD8),
      buttonTitleBackgrounColor: Color(0xFFFFFFFF),
      buttonBorderBackgrounColor: Color(0xFF4E3DD8),
      secondaryButtonBackgrounColor: Color(0xFFFFFFFF),
      secondaryButtonTitleBackgrounColor: Color(0xFF4E3DD8),
      secondaryButtonBorderBackgrounColor: Color(0xFF4E3DD8),
      disableButtonBackgrounColor: Color(0xFFE0E0E0),
      disableButtonTitleBackgrounColor: Color(0xFF9E9E9E),
      checkboxColor: Color(0xFF4E3DD8),
    ),
  ),
);
```

> **Note:** When using `Color(0xFF...)` for iOS appearance customization, you must add `import 'dart:ui';` at the top of your file.

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

| Issue                                                            | Cause                                                                             | Fix                                                                                                         |
| :--------------------------------------------------------------- | :-------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `Country code has not been initialized. Call Yuno.init() first.` | `Yuno.init()` was not called or failed before calling payment/enrollment methods. | Ensure `Yuno.init()` completes before any SDK call, and avoid hot reload for Android configuration changes. |

## Notes

* The Lite payment flow requires you to render the payment method list and pass the selected `paymentMethodType`.
* Use `YunoPaymentListener`/`YunoEnrollmentListener` to receive OTT/status updates and drive backend calls.

## Supported languages

The Flutter SDK supports the following `YunoLanguage` values:

`en` (English), `es` (Spanish), `pt` (Portuguese), `ms` (Malay), `id` (Indonesian), `th` (Thai), `ar` (Arabic).
