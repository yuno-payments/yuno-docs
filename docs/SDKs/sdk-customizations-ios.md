---
title: SDK Customizations
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: SDK Customizations
  description: >-
    Using `YunoConfig`, you have the flexibility to tailor the card form
    according to your preferences through the `cardFormFields` property. This
    allows you to determine the field order and customize the SDK's visual
    presentation by configuring the appearance field as well.
  robots: index
next:
  description: ''
---
This page explains how to modify styles in the Yuno iOS SDK by changing font, button, and color styles. To customize the iOS SDK appearance, set the appearance fields. This solution allows you to adapt the visual elements of the SDK to match your application brand, improving consistency and the UX.

## Appearance configuration

The following table lists all available fields you can use to customize the iOS SDK:

| Field                            | Description                                                                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `fontFamily`                     | Specifies the font family used in the SDK. Provide the font file name used in your app, ensuring it matches your application's assets. |
| `accentColor`                    | Defines the accent color used in several SDK elements.                                                                                 |
| `buttonBackgroundColor`          | Sets the background color for the primary buttons.                                                                                     |
| `buttonTitleColor`               | Determines the text color for the primary buttons.                                                                                     |
| `buttonBorderColor`              | Specifies the border color for the primary buttons.                                                                                    |
| `secondaryButtonBackgroundColor` | Sets the background color for the secondary buttons.                                                                                   |
| `secondaryButtonTitleColor`      | Determines the text color for the secondary buttons.                                                                                   |
| `secondaryButtonBorderColor`     | Specifies the border color for the secondary buttons.                                                                                  |
| `disableButtonBackgroundColor`   | Sets the background color for the disabled-buttons.                                                                                    |
| `disableButtonTitleColor`        | Determines the text color for the disabled-buttons.                                                                                    |

> 📘 Color Configuration
>
> Ensure all colors are specified as UIColor to maintain compatibility. Colors can be sourced from Xcode's predefined palette or the merchant's assets, but they must always be of type UIColor.

Use the `Yuno.Appearance()` function to define a variable with all your customizations to control the appearance. Then inform it when initializing the SDK:

```swift
let appearance = Yuno.Appearance(
    fontFamily: "Climate Crisis",
    accentColor: UIColor.orange, 
    buttonBackgroundColor: UIColor.yellow, 
    buttonTitleColor: UIColor.black, 
    buttonBorderColor: UIColor.black,
    secondaryButtonBackgroundColor: UIColor.yellow,
    secondaryButtonTitleColor: UIColor.black,
    secondaryButtonBorderColor: UIColor.black,
    disableButtonBackgroundColor: UIColor.gray,
    disableButtonTitleColor: UIColor.black
)

Yuno.initialize(
    apiKey: apiKey,
    config: YunoConfig(appearance: appearance)
)

```

### Usage examples

The following examples show two appearance customizations for the iOS SDK:

```swift Example 1 (left)
let appearance = Yuno.Appearance(
    fontFamily: "Climate Crisis",
    accentColor: UIColor.black, 
    buttonBackgroundColor: UIColor.black, 
    buttonTitleColor: UIColor.white
)

Yuno.initialize(
    apiKey: apiKey,
    config: YunoConfig(appearance: appearance)
)

```
```swift Example 2 (right)
let appearance = Yuno.Appearance(
    fontFamily: "Climate Crisis",
    accentColor: UIColor.orange, 
    buttonBackgroundColor: UIColor.orange, 
    buttonTitleColor: UIColor.white
)

Yuno.initialize(
    apiKey: apiKey,
    config: YunoConfig(appearance: appearance)
)

```

<Image border={false} src="https://files.readme.io/47e26ec-image.png" />

## Address autocomplete

Merchants can enable or disable address autocomplete functionality in the iOS SDK. When enabled, the SDK automatically fills address fields based on postal code lookup. When disabled, users must manually enter all address information.