---
title: SDK Customization
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
The Yuno Flutter SDK allows you to customize its appearance to match your application's branding. This includes modifying fonts, button styles, and colors to create a seamless user experience.

### Android

For Android, follow the official Android SDK documentation for customization, as these modifications are made via XML.

[Android Styling Guide](https://docs.y.uno/docs/sdk-customizations-android)

### iOS

The Yuno Flutter SDK allows you to modify styles, including fonts, buttons, and colors. By setting the appearance fields, you can customize the SDK's visual elements to align with your application's branding, enhancing consistency and user experience.

## Appearance Configuration

The following table lists the available fields for customizing the Flutter SDK appearance:

| Field                            | Description                                                                                           |
| -------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `fontFamily`                     | Specifies the font family used in the SDK. Provide the font file name that matches your app's assets. |
| `accentColor`                    | Defines the accent color used across SDK elements.                                                    |
| `buttonBackgroundColor`          | Sets the background color for primary buttons.                                                        |
| `buttonTitleColor`               | Determines the text color for primary buttons.                                                        |
| `buttonBorderColor`              | Specifies the border color for primary buttons.                                                       |
| `secondaryButtonBackgroundColor` | Sets the background color for secondary buttons.                                                      |
| `secondaryButtonTitleColor`      | Determines the text color for secondary buttons.                                                      |
| `secondaryButtonBorderColor`     | Specifies the border color for secondary buttons.                                                     |
| `disableButtonBackgroundColor`   | Sets the background color for disabled buttons.                                                       |
| `disableButtonTitleColor`        | Determines the text color for disabled buttons.                                                       |
| `checkboxColor`                  | Specifies the color for the checkbox component.                                                       |

## Usage Example

Below is an example of how to customize the appearance of the iOS SDK in Flutter:

```dart
var appearance = Appearance(
  fontFamily: "Climate Crisis",
  accentColor: Colors.red,
  buttonBackgrounColor: Colors.blue,
  buttonBorderBackgrounColor: Colors.red,
  buttonTitleBackgrounColor: Colors.yellow,
  secondaryButtonBackgrounColor: Colors.blueAccent,
  secondaryButtonBorderBackgrounColor: Colors.green,
  secondaryButtonTitleBackgrounColor: Colors.black,
  disableButtonBackgrounColor: Colors.black,
  disableButtonTitleBackgrounColor: Colors.black,
  checkboxColor: Colors.white,
);

await Yuno.init( 
  apiKey: 'your_api_key_here',
  iosConfig: IosConfig(appearance: appearance), 
);

```

## Visual Example

Below are sample images showcasing SDK customizations:

![](https://files.readme.io/01e3024c6a162d6ddbbec180b3931dafb3c727a0370ecf8132b37c6046b0e46d-image2.png)