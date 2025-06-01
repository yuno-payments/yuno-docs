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
Yuno iOS SDK lets you modify styles by changing font, button, and color styles. To customize the iOS SDK appearance, you will set the appearance fields. This solution allows you to adapt the visual elements of the SDK to match your application brand, improving consistency and the UX.

## Appearance configuration

The following table presents all available fields you can use to customize the iOS SDK.

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

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Color configuration</h3>\n      <div class=\"contentContainer\">\n        <p>Ensure all colors are specified as UIColor to maintain compatibility.</p>\n\t\t\t\t<p> Colors can be sourced from Xcode's predefined palette or the merchant's assets, but they must always be of type UIColor.</p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


To control the appearance, you must use the `Yuno.Appearance()` function to define a variable with all your customizations. Then you have to inform it when initializing the SDK, as exemplified in the following code block:

```swift
// Create an instance of Yuno.Appearance to customize the SDK's appearance
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

// Initialize the Yuno SDK with the provided API key and configuration
Yuno.initialize(
    apiKey: apiKey, // Your API key for authenticating with the Yuno SDK
    config: YunoConfig(appearance: appearance) // Pass the customized appearance configuration
)

```

### Usage examples

Below, you will find two appearance customization for the iOS SDK:

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

![](https://files.readme.io/47e26ec-image.png)