---
title: SDK Customizations
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: SDK Customizations
  description: >-
    Yuno Android SDK enables you to modify styles by changing font, button, and
    color styles or creating your own card form flow.
  robots: index
next:
  description: ''
---
The Yuno Android SDK enables you to modify multiple styles, allowing you to align the design of payment forms and the checkout flow with your brand guidelines and UX/UI principles. While the structure of each element remains uniform, you can adjust colors, text, buttons, and much more.

## General Guidelines

Yuno Android SDK supports XML themes and styles, which should be defined within your application's styles. Android customizations are a work in progress and are continuously updated.

## Customizable Elements

The following sections detail the elements that can be modified to achieve a personalized style. Some customizations are unavailable in previous versions, so we recommend using version 1.13.0 or higher.

- [Font styles](#font-styles)
- [Button styles](#button-styles)
- [Color styles](#color-styles)
- [Text styles](#text-styles)

### Font styles

You can override Yuno Android SDK fonts if you want to use your font family. You can override the following font styles:

- `YunoRegularFont`
- `YunoMediumFont`
- `YunoBoldFont`

The following code block presents an example of how you can configure the font style:

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
````

### Button styles

You can override Yuno Android SDK button styles. The available configurations change depending on your SDK version. The following table lists all available buttons you can customize considering the SDK version.

| Versions before v1.10.0    | Version v1.10.0 and higher         | Version v1.13.0 and higher         |
| -------------------------- | ---------------------------------- | ---------------------------------- |
| `Button.Normal.White`      | `Button.Small.NeutralB`            | `Button.Normal`                    |
| `Button.Normal.Green`      | `Button.Normal.NeutralB`           | `Button.Small`                     |
| `Button.Normal.Purple`     | `Button.Normal.Green`              | `Button.Normal.NeutralW`           |
| `Button.Normal.Purple.Big` | `Button.Normal.NeutralW.TextGrey4` | `Button.Normal.NeutralW.TextGrey4` |
|                            | `Button.Normal.NeutralW`           | `Button.Normal.Green`              |
|                            | `Button.Small`                     | `Button.Normal.NeutralB`           |
|                            | `Button.Normal`                    | `Button.Small.NeutralB`            |

For each style, you can set the following attributes:

```kotlin
<style name="Button.Normal" parent="Widget.AppCompat.Button.Colored">
    <item name="android:padding">YOUR OWN DIMEN</item>
    <item name="android:radius">YOUR OWN DIMEN</item>
    <item name="android:textAllCaps">true|false</item>
    <item name="android:textSize">YOUR OWN DIMEN</item>
    <item name="android:fontFamily">YOUR OWN FONT</item>
    <item name="android:foreground">YOUR OWN ATTR</item>
</style>

<style name="Button.Small" parent="Widget.AppCompat.Button.Colored">
    <item name="android:padding">YOUR OWN DIMEN</item>
    <item name="android:radius">YOUR OWN DIMEN</item>
    <item name="android:textAllCaps">true|false</item>
    <item name="android:textSize">YOUR OWN DIMEN</item>
    <item name="android:fontFamily">YOUR OWN FONT</item>
    <item name="android:foreground">YOUR OWN ATTR</item>
</style>

<style name="Button.Normal.NeutralW">
    <item name="android:background">YOUR OWN DRAWABLE</item>
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="Button.Normal.NeutralW.TextGrey4">
    <item name="android:background">YOUR OWN DRAWABLE</item>
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="Button.Normal.TextBlack">
    <item name="android:background">YOUR OWN DRAWABLE</item>
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="Button.Normal.Green">
    <item name="android:background">YOUR OWN DRAWABLE</item>
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="Button.Normal.NeutralB">
    <item name="android:background">YOUR OWN DRAWABLE</item>
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="Button.Small.NeutralB" parent="Button.Small">
    <item name="android:background">YOUR OWN DRAWABLE</item>
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>
```

The following code block presents an example of how you can configure a `Button.Normal.NeutralB` button. The example also shows how you can change the button font.

```kotlin
<style name="Button.Normal.NeutralB">
    <item name="android:background">#000000</item>
    <item name="android:textColor">#FFFFFF</item>
    <item name="android:fontFamily">@font/inter_regular.ttf</item>
</style>
```

### Color styles

You can override Yuno Android SDK color styles to personalize the SDK's appearance. The available configurations change depending on your SDK version. The following table presents the color styles you can override for each SDK version:

| Versions before v1.10.0 | Version v1.10.0 and higher | Version v1.13.0 and higher    |
| ----------------------- | -------------------------- | ----------------------------- |
| `yuno_purple_light`     | `neutral_b`                | `on_focus_outlined_text_view` |
|                         | `neutral_b_60_alpha`       | `primary_4`                   |
|                         | `neutral_w`                | `primary_5`                   |
|                         | `neutral_w_30_alpha`       | `secondary_1`                 |
|                         | `grey_0`                   | `secondary_2`                 |
|                         | `grey_1`                   | `secondary_3`                 |
|                         | `grey_2`                   | `secondary_4`                 |
|                         | `grey_3`                   | `secondary_5`                 |
|                         | `grey_4`                   | `secondary_6`                 |
|                         | `grey_5`                   | `tertiary_1`                  |
|                         | `primary_1`                | `tertiary_2`                  |
|                         | `primary_2`                | `tertiary_3`                  |
|                         | `primary_3`                | `tertiary_4`                  |

The following code block presents an example of how you can configure the colors when using the SDK with a version equal to or higher than v1.13.0:

```xml
<color name="neutral_b">#fff000</color>
<color name="on_focus_outlined_text_view">#282A30</color>
```

### Text styles

You can override Yuno Android SDK text styles to personalize the SDK's appearance.

> This feature is only available for SDK version 1.13.0 or higher.

The following table lists all customization attributes you can use for each text style:

| Text Style           | Parent Style      | Customizable Attributes |
| -------------------- | ----------------- | ----------------------- |
| `YunoRegularFont`    |                   | `android:fontFamily`    |
| `TextMicro`          | `YunoRegularFont` | `android:textSize`      |
| `TextSmall`          | `YunoRegularFont` | `android:textSize`      |
| `TextBody`           | `YunoRegularFont` | `android:textSize`      |
| `TextSubTitle`       | `YunoRegularFont` | `android:textSize`      |
| `TextH4`             | `YunoRegularFont` | `android:textSize`      |
| `TextH3`             | `YunoRegularFont` | `android:textSize`      |
| `TextH2`             | `YunoRegularFont` | `android:textSize`      |
| `TextH1`             | `YunoRegularFont` | `android:textSize`      |
| `TextH1Super`        | `YunoRegularFont` | `android:textSize`      |
| `TextMicro.NeutralB` | `TextMicro`       | `android:textColor`     |
| `TextMicro.NeutralB` | `TextMicro`       | `android:textColorHint` |
| `TextSmall.NeutralB` | `TextSmall`       | `android:textColor`     |
| `TextSmall.NeutralB` | `TextSmall`       | `android:textColorHint` |

The following code block presents how you can configure these text customizations:

```kotlin
<style name="YunoRegularFont">
    <item name="android:fontFamily">YOUR OWN FONT</item>
</style>

<style name="TextMicro" parent="YunoRegularFont">
    <item name="android:textSize">YOUR OWN DIMEN</item>
</style>

<style name="TextSmall" parent="YunoRegularFont">
    <item name="android:textSize">YOUR OWN DIMEN</item>
</style>

<style name="TextBody" parent="YunoRegularFont">
    <item name="android:textSize">YOUR OWN DIMEN</item>
</style>

<style name="TextSubTitle" parent="YunoRegularFont">
    <item name="android:textSize">YOUR OWN DIMEN</item>
</style>

<style name="TextH4" parent="YunoRegularFont">
    <item name="android:textSize">YOUR OWN DIMEN</item>
</style>

<style name="TextH3" parent="YunoRegularFont">
    <item name="android:textSize">YOUR OWN DIMEN</item>
</style>

<style name="TextH2" parent="YunoRegularFont">
    <item name="android:textSize">YOUR OWN DIMEN</item>
</style>

<style name="TextH1" parent="YunoRegularFont">
    <item name="android:textSize">YOUR OWN DIMEN</item>
</style>

<style name="TextH1Super" parent="YunoRegularFont">
    <item name="android:textSize">YOUR OWN DIMEN</item>
</style>

<style name="TextMicro.NeutralB" parent="TextMicro">
    <item name="android:textColor">YOUR OWN COLOR</item>
    <item name="android:textColorHint">YOUR OWN COLOR</item>
</style>

<style name="TextSmall.NeutralB" parent="TextSmall">
    <item name="android:textColor">YOUR OWN COLOR</item>
    <item name="android:textColorHint">YOUR OWN COLOR</item>
</style>

<style name="TextBody.NeutralB" parent="TextBody">
    <item name="android:textColor">YOUR OWN COLOR</item>
    <item name="android:textColorHint">YOUR OWN COLOR</item>
</style>

<style name="TextSubTitle.NeutralB" parent="TextSubTitle">
    <item name="android:textColor">YOUR OWN COLOR</item>
    <item name="android:textColorHint">YOUR OWN COLOR</item>
</style>

<style name="TextH4.NeutralB" parent="TextH4">
    <item name="android:textColor">YOUR OWN COLOR</item>
    <item name="android:textColorHint">YOUR OWN COLOR</item>
</style>

<style name="TextH3.NeutralB" parent="TextH3">
    <item name="android:textColor">YOUR OWN COLOR</item>
    <item name="android:textColorHint">YOUR OWN COLOR</item>
</style>

<style name="TextH2.NeutralB" parent="TextH2">
    <item name="android:textColor">YOUR OWN COLOR</item>
    <item name="android:textColorHint">YOUR OWN COLOR</item>
</style>

<style name="TextH1.NeutralB" parent="TextH1">
    <item name="android:textColor">YOUR OWN COLOR</item>
    <item name="android:textColorHint">YOUR OWN COLOR</item>
</style>

<style name="TextH1Super.NeutralB" parent="TextH1Super">
    <item name="android:textColor">YOUR OWN COLOR</item>
    <item name="android:textColorHint">YOUR OWN COLOR</item>
</style>

<style name="TextMicro.Grey5" parent="TextMicro">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextSmall.Grey5" parent="TextSmall">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextBody.Grey5" parent="TextBody">
    <item name="android:textColor">YOUR OWN COLOR</item>
    <item name="android:textColorHint">YOUR OWN COLOR</item>
</style>

<style name="TextSubTitle.Grey5" parent="TextSubTitle">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextH4.Grey5" parent="TextH4">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextH3.Grey5" parent="TextH3">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextH2.Grey5" parent="TextH2">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextH1.Grey5" parent="TextH1">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextH1Super.Grey5" parent="TextH1Super">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextMicro.NeutralW" parent="TextMicro">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextSmall.NeutralW" parent="TextSmall">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextBody.NeutralW" parent="TextBody">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextSubTitle.NeutralW" parent="TextSubTitle">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextSubTitle.Grey.Bold" parent="TextSubTitleBold">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextSmall.Black.Light" parent="TextSmall">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextH4.NeutralW" parent="TextH4">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextH3.NeutralW" parent="TextH3">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextH2.NeutralW" parent="TextH2">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextH1.NeutralW" parent="TextH1">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextH1Super.NeutralW" parent="TextH1Super">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextSmall.Primary4" parent="TextSmall">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextH1.Primary4">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextBody.Primary1" parent="TextBody">
    <item name="android:textColor">YOUR OWN COLOR</item>
    <item name="android:textColorHint">YOUR OWN COLOR</item>
</style>

<style name="TextSmall.Primary1" parent="TextSmall">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextSubTitle.Primary1" parent="TextSubTitle">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextSmall.Grey4" parent="TextSmall">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextSubTitle.Grey4" parent="TextSubTitle">
    <item name="android:textColor">YOUR OWN COLOR</item>
</style>

<style name="TextSmall.NuPay" parent="TextSmall">
    <item name="android:textColor">#3A1866</item>
    <item name="android:textColorHint">YOUR OWN COLOR</item>
</style>
```

## Create your own card form flow

The first step to creating your card form flow is to create a new layout resource file called `screen_payment_card_form.xml` to override the current XML and implement your design.

After creating the `screen_payment_card_form.xml` file, you can define your own design. You need to use the Yuno Secure Fields components, which ensures that the Yuno SDK can retrieve credit card information during the checkout. Below, you will find a list of all the components you can use to change the design:

> ### Changing components
>
> When changing the Yuno Android SDK components, you must use them with their defined Android `id`.

> ### v1.10.0 or higher
>
> Additional components are available for the Yuno SDK version v1.10.0 or higher. These components are listed at the \<a href="\#components-available-for-v1100-and-higher"\>subsection below\</a\>.

  - `CloseButton`: Button to close the form.



```xml
<ImageView
        android:id="@+id/imageView_close" />
```

  - `CardNumberEditText`: Field where the user can enter the credit card number.



```xml
<com.yuno.payments.features.base.ui.views.CardNumberEditText
    android:id="@+id/textField_number" />
```

  - `CardDataStackView`: Field where the user can enter the credit card's expiration date and verification code (CVV/CVC).



```xml
<com.yuno.payments.features.base.ui.views.CardDataStackView
    android:id="@+id/cardDataStackView" />
```

  - `TextView` for Voucher card type: This is a copy Yuno SDK shows when the card is ` VOUCHER  `type, you must set it below the CVV field.



```xml
<TextView
    android:id="@+id/textView_voucher_copy"
    android:visibility="gone" />
```

  - ` TextFieldItemView  `for card holder's name: Field where the user can enter the credit card holder's name.



```xml
<com.yuno.payments.features.base.ui.views.TextFieldItemView
    android:id="@+id/textField_name" />
```

  - `SpinnerFieldItemView` for identification document type: A selector where the credit card holder can choose their identification document type.



```xml
<com.yuno.payments.features.base.ui.views.SpinnerFieldItemView
    android:id="@+id/spinner_document_type" />
```

  - `TextFieldItemView` for identification document number: Field where the user can enter the credit card holder's identification document number.



```xml
<com.yuno.payments.features.base.ui.views.TextFieldItemView
    android:id="@+id/textField_user_document" />
```

  - ` PhoneInformationView  `for customer's phone number: Field where the user can enter his phone number if required. In addition to providing the Android `id`, it's required to have `gone` visibility.



```xml
<com.yuno.payments.features.base.ui.views.PhoneInformationView
    android:id="@+id/layout_phone_information"
		android:visibility="gone" />
```

  - `Installments`: Component that shows the spinner of card installments. In addition to providing the Android `id`, it's required to have `gone` visibility, and you need to add the `ShimmerFrameLayout` dependency: `implementation 'com.facebook.shimmer:shimmer:0.5.0'`.



```xml
<LinearLayout
  android:id="@+id/container_installments"
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

  - Yuno's `TextView`: A text to show that Yuno verified the form.



```xml
<TextView
        android:id="@+id/textView_secure_payment" />
```

  - `CustomYunoSwitch`: It's a switch component that lets the user choose if the card will be used as credit or debit. In addition to providing the Android `id`, it's required to have `gone` visibility.



```xml
<com.yuno.payments.features.base.ui.views.CustomYunoSwitch
                android:id="@+id/switch_cardType"
                android:visibility="gone" />
```

  - `CustomYunoSwitch`: A tooltip to show how the switch works. In addition to providing the Android `id`, it's required to have `gone` visibility. Yuno recommends positioning this component next to the switch.



```xml
<ImageView
                android:id="@+id/switch_tooltip"
                android:src="@drawable/ic_thin_info"
                android:visibility="gone"/>
```

  - `AppCompatCheckBox`: A check box users can use to choose whether to save the credit card for future purchases.



```xml
<androidx.appcompat.widget.AppCompatCheckBox
android:id="@+id/checkBox_save_card" />
```

  - `Button`: It validates the card form and continues the payment process. When the user clicks this button, the SDK submits the form and sends the credit card information to Yuno.



```xml
<Button
    android:id="@+id/button_complete_form" />
```

### Components available for v1.10.0 and higher

The following configurations are only available for SDK v1.10.0 and higher.

  - `TextFieldItemView` for customer's address: It is used to input the customer's address when required. Ensure it is utilized with its specified Android `id` (`@+id/textField_address`) and is set to have `gone` visibility by default.



```xml
<com.yuno.payments.features.base.ui.views.TextFieldItemView
    android:id="@+id/textField_address"
    android:visibility="gone" />
```

  - `TextFieldItemView` for customer's state: It allows the customer to enter their state if needed. It must be used with the defined Android `id` (`@+id/textField_state`)  and should have `gone` as the default visibility.



```xml
<com.yuno.payments.features.base.ui.views.TextFieldItemView
    android:id="@+id/textField_state"
    android:visibility="gone" />
```

  - `TextFieldItemView` for customer's city:  It is designated for the input of the customer's city. It should be used with the provided Android `id` (`@+id/textField_city`) and maintain a default visibility setting of `gone`.



```xml
<com.yuno.payments.features.base.ui.views.TextFieldItemView
    android:id="@+id/textField_city"
    android:visibility="gone" />
```

  - `TextFieldItemView` for customer's zip code: This is where the customer can input their zip code. Ensure it is implemented using the specified Android `id` (`@+id/textField_zip_cod`) and has `gone` visibility by default:



```xml
<com.yuno.payments.features.base.ui.views.TextFieldItemView
    android:id="@+id/textField_zip_code"
    android:visibility="gone" />
```

  - `SpinnerFieldItemView` for customer's country: This SpinnerFieldItemView selects the customer's country when necessary. It must be utilized with the defined Android `id` (`@+id/spinner_country`) and should have a default visibility of `gone`.



```xml
<com.yuno.payments.features.base.ui.views.SpinnerFieldItemView
    android:id="@+id/spinner_country"
    android:visibility="gone" />
```

  - `SpinnerFieldItemView` for customer's gender: It is used to select the customer's gender if required. Ensure it is used with its defined Android `id` (`@+id/spinner_gender`) and is set to `gone` visibility by default.



```xml
<com.yuno.payments.features.base.ui.views.SpinnerFieldItemView
    android:id="@+id/spinner_gender"
    android:visibility="gone" />
```