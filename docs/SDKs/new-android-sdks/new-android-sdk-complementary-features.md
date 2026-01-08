---
title: New - Android SDK Complementary Features
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: Android SDK Complementary Features
  description: >-
    Configure and customize the Yuno Android SDK with initialization options, UI customization, card scanning, fraud prevention, and more.
  robots: index
---

This guide covers optional configurations and features available in the Yuno Android SDK, including initialization options, UI customization, card scanning, and fraud prevention tools.

> 📘 Core Integration First
>
> Complete the core integration before configuring these features:
> * [Getting Started](doc:new-getting-started-with-android-sdk)
> * [Payment Integration](doc:new-android-sdk-payment-integration)
> * [Enrollment Integration](doc:new-android-sdk-enrollment-integration)

## YunoConfig Options

Configure SDK behavior by passing a `YunoConfig` object when initializing Yuno:

```kotlin
Yuno.initialize(
    application = this,
    apiKey = "your-public-api-key",
    config = YunoConfig(
        cardFlow = CardFormType.ONE_STEP,
        saveCardEnabled = true,
        cardFormDeployed = false,
        language = YunoLanguage.EN,
        styles = yunoStyles,
        cardNumberPlaceholder = "Enter card number"
    )
)
```

### Available Configuration Options

```kotlin
data class YunoConfig(
    val cardFlow: CardFormType = CardFormType.ONE_STEP,
    val saveCardEnabled: Boolean = false,
    val cardFormDeployed: Boolean = false,
    val language: YunoLanguage? = null,
    val styles: YunoStyles? = null,
    val cardNumberPlaceholder: String? = null
)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `cardFlow` | `CardFormType` | `ONE_STEP` | Defines card form flow type. Options: `ONE_STEP` or `TWO_STEP`. |
| `saveCardEnabled` | `Boolean` | `false` | When `true`, displays a "Save card" checkbox during payment for future use. |
| `cardFormDeployed` | `Boolean` | `false` | When `true` (automatic display only), shows the card form expanded within the payment methods list. When `false`, card form appears on a separate screen. |
| `language` | `YunoLanguage?` | `null` | Sets the SDK language. See [Supported Languages](#supported-languages) below. |
| `styles` | `YunoStyles?` | `null` | Applies global UI customizations. See [UI Customization](#ui-customization) below. |
| `cardNumberPlaceholder` | `String?` | `"Card number"` | Custom placeholder text for card number field. Supports alphanumeric characters, spaces, and UTF-8 for localization. Does not affect formatting, masking, or validation. |

### Supported Languages

| Code | Language |
|------|----------|
| `en` | English |
| `es` | Spanish |
| `pt` | Portuguese |
| `fr` | French |
| `it` | Italian |
| `de` | German |
| `pl` | Polish |
| `ru` | Russian |
| `tr` | Turkish |
| `nl` | Dutch |
| `sv` | Swedish |
| `ko` | Korean |
| `ja` | Japanese |
| `zh-CN` | Chinese (Simplified, China) |
| `zh-TW` | Chinese (Traditional, Taiwan) |
| `vi` | Vietnamese |
| `th` | Thai |
| `ms` | Malay |
| `id` | Indonesian |
| `fil` | Filipino |

## UI Customization

The Yuno Android SDK supports extensive UI customization through XML themes and styles defined in your application's `styles.xml` file.

> 📘 Version Compatibility
>
> Some customizations are version-specific. We recommend using SDK version **1.13.0 or higher** for full customization support.

### Font Styles

Override the default SDK fonts to use your own font family:

```xml
<style name="YunoRegularFont">
    <item name="android:fontFamily">@font/inter_regular</item>
</style>

<style name="YunoMediumFont">
    <item name="android:fontFamily">@font/inter_medium</item>
</style>

<style name="YunoBoldFont">
    <item name="android:fontFamily">@font/inter_bold</item>
</style>
```

### Button Styles

Customize button appearance across the SDK. Available button styles vary by SDK version:

#### SDK v1.13.0 and Higher (Recommended)

Available button styles:
* `Button.Normal`
* `Button.Small`
* `Button.Normal.NeutralW`
* `Button.Normal.NeutralW.TextGrey4`
* `Button.Normal.Green`
* `Button.Normal.NeutralB`
* `Button.Small.NeutralB`

**Base Button Configuration:**

```xml
<style name="Button.Normal" parent="Widget.AppCompat.Button.Colored">
    <item name="android:padding">16dp</item>
    <item name="android:radius">8dp</item>
    <item name="android:textAllCaps">false</item>
    <item name="android:textSize">16sp</item>
    <item name="android:fontFamily">@font/inter_regular</item>
    <item name="android:foreground">?attr/selectableItemBackground</item>
</style>

<style name="Button.Small" parent="Widget.AppCompat.Button.Colored">
    <item name="android:padding">12dp</item>
    <item name="android:radius">6dp</item>
    <item name="android:textAllCaps">false</item>
    <item name="android:textSize">14sp</item>
    <item name="android:fontFamily">@font/inter_regular</item>
</style>
```

**Button Color Variants:**

```xml
<style name="Button.Normal.NeutralB">
    <item name="android:background">@drawable/button_neutral_b</item>
    <item name="android:textColor">#FFFFFF</item>
</style>

<style name="Button.Normal.Green">
    <item name="android:background">@drawable/button_green</item>
    <item name="android:textColor">#FFFFFF</item>
</style>

<style name="Button.Normal.NeutralW">
    <item name="android:background">@drawable/button_neutral_w</item>
    <item name="android:textColor">#282A30</item>
</style>
```

**Example: Custom Primary Button**

```xml
<style name="Button.Normal.NeutralB">
    <item name="android:background">#000000</item>
    <item name="android:textColor">#FFFFFF</item>
    <item name="android:fontFamily">@font/inter_bold</item>
</style>
```

#### Legacy Button Styles (v1.10.0 and Earlier)

<details>
<summary>Click to view legacy button styles</summary>

**Versions before v1.10.0:**
* `Button.Normal.White`
* `Button.Normal.Green`
* `Button.Normal.Purple`
* `Button.Normal.Purple.Big`

**Version v1.10.0 to v1.12.x:**
* `Button.Small.NeutralB`
* `Button.Normal.NeutralB`
* `Button.Normal.Green`
* `Button.Normal.NeutralW.TextGrey4`
* `Button.Normal.NeutralW`
* `Button.Small`
* `Button.Normal`

</details>

### Color Styles

Customize SDK colors to match your brand. Available colors vary by SDK version:

#### SDK v1.13.0 and Higher (Recommended)

```xml
<color name="on_focus_outlined_text_view">#282A30</color>
<color name="primary_4">#6C5DD3</color>
<color name="primary_5">#4E3AB7</color>
<color name="secondary_1">#EBF9F2</color>
<color name="secondary_2">#CFF3DF</color>
<color name="secondary_3">#9FE5BE</color>
<color name="secondary_4">#6ED79D</color>
<color name="secondary_5">#40C97C</color>
<color name="secondary_6">#2BA55D</color>
<color name="tertiary_1">#FFF5E6</color>
<color name="tertiary_2">#FFE9C2</color>
<color name="tertiary_3">#FFD28A</color>
<color name="tertiary_4">#FFBB52</color>
```

#### Legacy Color Styles

<details>
<summary>Click to view legacy color styles</summary>

**Versions before v1.10.0:**
* `yuno_purple_light`

**Version v1.10.0 to v1.12.x:**
* `neutral_b`
* `neutral_b_60_alpha`
* `neutral_w`
* `neutral_w_30_alpha`
* `grey_0` through `grey_5`
* `primary_1` through `primary_3`

</details>

### Text Styles

Customize typography across the SDK (available in SDK v1.13.0 and higher):

**Font Family (Base Style):**

```xml
<style name="YunoRegularFont">
    <item name="android:fontFamily">@font/inter_regular</item>
</style>
```

**Text Size Hierarchy:**

```xml
<style name="TextMicro" parent="YunoRegularFont">
    <item name="android:textSize">10sp</item>
</style>

<style name="TextSmall" parent="YunoRegularFont">
    <item name="android:textSize">12sp</item>
</style>

<style name="TextBody" parent="YunoRegularFont">
    <item name="android:textSize">14sp</item>
</style>

<style name="TextSubTitle" parent="YunoRegularFont">
    <item name="android:textSize">16sp</item>
</style>

<style name="TextH4" parent="YunoRegularFont">
    <item name="android:textSize">18sp</item>
</style>

<style name="TextH3" parent="YunoRegularFont">
    <item name="android:textSize">20sp</item>
</style>

<style name="TextH2" parent="YunoRegularFont">
    <item name="android:textSize">24sp</item>
</style>

<style name="TextH1" parent="YunoRegularFont">
    <item name="android:textSize">28sp</item>
</style>

<style name="TextH1Super" parent="YunoRegularFont">
    <item name="android:textSize">32sp</item>
</style>
```

**Text Color Variants:**

```xml
<!-- Neutral Black -->
<style name="TextBody.NeutralB" parent="TextBody">
    <item name="android:textColor">#000000</item>
    <item name="android:textColorHint">#999999</item>
</style>

<!-- Grey -->
<style name="TextBody.Grey5" parent="TextBody">
    <item name="android:textColor">#6B7280</item>
    <item name="android:textColorHint">#9CA3AF</item>
</style>

<!-- Neutral White -->
<style name="TextBody.NeutralW" parent="TextBody">
    <item name="android:textColor">#FFFFFF</item>
</style>

<!-- Primary Color -->
<style name="TextBody.Primary1" parent="TextBody">
    <item name="android:textColor">#6C5DD3</item>
    <item name="android:textColorHint">#A99FE8</item>
</style>
```

**Available Text Style Hierarchy:**

| Base Style | Color Variants |
|------------|----------------|
| `TextMicro` | `.NeutralB`, `.Grey5`, `.NeutralW`, `.Primary4`, `.Grey4` |
| `TextSmall` | `.NeutralB`, `.Grey5`, `.NeutralW`, `.Primary1`, `.Primary4`, `.Grey4`, `.Black.Light` |
| `TextBody` | `.NeutralB`, `.Grey5`, `.NeutralW`, `.Primary1` |
| `TextSubTitle` | `.NeutralB`, `.Grey5`, `.NeutralW`, `.Primary1`, `.Grey4`, `.Grey.Bold` |
| `TextH4` | `.NeutralB`, `.Grey5`, `.NeutralW` |
| `TextH3` | `.NeutralB`, `.Grey5`, `.NeutralW` |
| `TextH2` | `.NeutralB`, `.Grey5`, `.NeutralW` |
| `TextH1` | `.NeutralB`, `.Grey5`, `.NeutralW`, `.Primary4` |
| `TextH1Super` | `.NeutralB`, `.Grey5`, `.NeutralW` |

## Custom Card Form Flow

Create your own card form layout by overriding the `screen_payment_card_form.xml` file. You must use Yuno's Secure Fields components to ensure the SDK can securely collect card information.

> 🚧 Component IDs Required
>
> When using Yuno components, you **must** keep their defined Android `id` attributes.

### Required Components (All SDK Versions)

**Close Button:**

```xml
<ImageView
    android:id="@+id/imageView_close"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:src="@drawable/ic_close" />
```

**Card Number Field:**

```xml
<com.yuno.payments.features.base.ui.views.CardNumberEditText
    android:id="@+id/textField_number"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

**Expiration Date & CVV:**

```xml
<com.yuno.payments.features.base.ui.views.CardDataStackView
    android:id="@+id/cardDataStackView"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

**Voucher Card Copy (Hidden by Default):**

```xml
<TextView
    android:id="@+id/textView_voucher_copy"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:visibility="gone" />
```

**Cardholder Name:**

```xml
<com.yuno.payments.features.base.ui.views.TextFieldItemView
    android:id="@+id/textField_name"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

**Document Type Selector:**

```xml
<com.yuno.payments.features.base.ui.views.SpinnerFieldItemView
    android:id="@+id/spinner_document_type"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

**Document Number:**

```xml
<com.yuno.payments.features.base.ui.views.TextFieldItemView
    android:id="@+id/textField_user_document"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

**Phone Number (Hidden by Default):**

```xml
<com.yuno.payments.features.base.ui.views.PhoneInformationView
    android:id="@+id/layout_phone_information"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:visibility="gone" />
```

**Installments (Hidden by Default):**

> 📘 Requires Additional Dependency
>
> Add to your `build.gradle`: `implementation 'com.facebook.shimmer:shimmer:0.5.0'`

```xml
<LinearLayout
    android:id="@+id/container_installments"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">

    <com.yuno.payments.features.base.ui.views.SpinnerFieldItemView
        android:id="@+id/spinner_installments"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:visibility="gone"
        app:spinner_title="@string/payment.form_installments" />

    <com.facebook.shimmer.ShimmerFrameLayout
        android:id="@+id/shimmer_installments"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:foregroundGravity="center"
        android:visibility="gone">
        <include layout="@layout/shimmer_component_field" />
    </com.facebook.shimmer.ShimmerFrameLayout>

</LinearLayout>
```

**Save Card Checkbox:**

```xml
<androidx.appcompat.widget.AppCompatCheckBox
    android:id="@+id/checkBox_save_card"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Save card for future payments" />
```

**Card Type Switch (Hidden by Default):**

```xml
<com.yuno.payments.features.base.ui.views.CustomYunoSwitch
    android:id="@+id/switch_cardType"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:visibility="gone" />

<ImageView
    android:id="@+id/switch_tooltip"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:src="@drawable/ic_thin_info"
    android:visibility="gone" />
```

**Secure Payment Text:**

```xml
<TextView
    android:id="@+id/textView_secure_payment"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Secured by Yuno" />
```

**Submit Button:**

```xml
<Button
    android:id="@+id/button_complete_form"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Complete Payment" />
```

### Additional Components (SDK v1.10.0 and Higher)

**Address Fields (Hidden by Default):**

```xml
<com.yuno.payments.features.base.ui.views.TextFieldItemView
    android:id="@+id/textField_address"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:visibility="gone" />

<com.yuno.payments.features.base.ui.views.TextFieldItemView
    android:id="@+id/textField_state"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:visibility="gone" />

<com.yuno.payments.features.base.ui.views.TextFieldItemView
    android:id="@+id/textField_city"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:visibility="gone" />

<com.yuno.payments.features.base.ui.views.TextFieldItemView
    android:id="@+id/textField_zip_code"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:visibility="gone" />

<com.yuno.payments.features.base.ui.views.SpinnerFieldItemView
    android:id="@+id/spinner_country"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:visibility="gone" />

<com.yuno.payments.features.base.ui.views.SpinnerFieldItemView
    android:id="@+id/spinner_gender"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:visibility="gone" />
```

### Address Autocomplete

Merchants can enable or disable address autocomplete functionality. When enabled, the SDK automatically fills address fields based on postal code lookup. When disabled, users must manually enter all address information.

## Card Scanning (OCR)

Enable users to quickly complete card forms by scanning their credit or debit cards with the device's camera, powered by **Google Pay's OCR** solution.

### Security & Privacy

Card data is processed directly by Google Pay's OCR. Neither Yuno nor Google retains or stores the scanned card details.

### Detected Card Details

The OCR scanner automatically detects:
* **Card Number**
* **Expiration Date** (Month and Year)

### Prerequisites

1. **SDK Version:** Yuno Android SDK version **2.8.0 or higher**
2. **Camera Permissions:** Your app must request and obtain camera permissions from the user
3. **Google Pay Services:** Available on the user's device

### How to Activate

Enable card scanning from your Yuno Dashboard:

1. Navigate to the [Yuno Dashboard](https://dashboard.y.uno/)
2. Go to **Checkout Builder**
3. Locate the **Card** payment method and click the three dots icon
4. Enable the **Card Scanning** feature
5. Click **Publish settings** to apply changes

> 📘 Learn More
>
> Visit the [Checkout Builder](doc:checkout-builder) page for additional configuration options.

## ClearSale Fraud Prevention

Integrate ClearSale's device fingerprinting and fraud prevention capabilities with the Yuno SDK.

### Requirements

* Active ClearSale account with App Key
* Working Yuno Payments SDK integration
* Meets general Android SDK requirements

### Installation

Add the ClearSale SDK dependency to your `build.gradle`:

```gradle
dependencies {
    implementation 'com.yuno.fraud-prevention:clearsale:{last_version}'
}
```

### Required Permissions

The following permissions are included by default:

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
<uses-permission android:name="android.permission.INTERNET"/>
```

### Optional Location Permissions

For enhanced fraud detection, add location permissions:

**AndroidManifest.xml:**

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
```

**build.gradle:**

```gradle
dependencies {
    implementation 'com.google.android.gms:play-services-location:17.0.0'
}
```

### Integration Steps

**Step 1: Initialize ClearSale SDK**

Call in your Activity's `onCreate()` method:

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    onCreateYunoClearSale("<your-clear-sale-app-key>")
}
```

**Step 2: Generate Session ID**

Call in your `onResume()` method to generate and retrieve the `sessionId`:

```kotlin
override fun onResume() {
    super.onResume()
    val sessionId = onResumeYunoClearSale()
    // Store sessionId for use in payment flow
}
```

**Step 3: Stop ClearSale Session**

Release resources in `onStop()`:

```kotlin
override fun onStop() {
    super.onStop()
    onStopYunoClearSale()
}
```

**Step 4: Pass Session ID to Yuno**

Include the `sessionId` when starting the payment flow:

```kotlin
startCheckout(
    checkoutSession = "your_checkout_session_id",
    countryCode = "US",
    merchantSessionId = sessionId, // ClearSale session ID
    callbackPaymentState = { paymentState ->
        // Handle payment state
    }
)
```

Or with custom display:

```kotlin
startPaymentLite(
    paymentSelected = PaymentSelected(
        paymentMethodType = "CARD"
    ),
    callbackOTT = { oneTimeToken ->
        // Handle OTT
    },
    merchantSessionId = sessionId // ClearSale session ID
)
```

### Lifecycle Summary

* `onCreateYunoClearSale(appKey)` → Call once in `onCreate()`
* `onResumeYunoClearSale()` → Call in `onResume()` to generate `sessionId`
* `onStopYunoClearSale()` → Call in `onStop()` to release resources

## SDK Requirements

Ensure your Android project meets the following requirements:

| Requirement | Minimum Version |
|-------------|-----------------|
| **Minimum SDK Version** | 21 |
| **Java Version** | Java 8 |
| **Android Libraries** | AndroidX (no legacy support libraries) |
| **Android Gradle Plugin** | 4.0.0 |
| **ProGuard** | 6.2.2 |
| **Kotlin Gradle Plugin** | 1.4.0 |
| **ELF Page Size** | Fully compliant with 16 KB alignment (Android 15 / ARMv9 ready) |

## Additional Resources

* **[Payment Integration](doc:new-android-sdk-payment-integration)**: Process payments with the Android SDK
* **[Enrollment Integration](doc:new-android-sdk-enrollment-integration)**: Save payment methods for future use
* **[External Browser Handling](doc:external-browser-callback-android)**: Handle deep links and browser returns
* **[Release Notes](doc:release-notes-android-sdk)**: Latest SDK updates and version history

