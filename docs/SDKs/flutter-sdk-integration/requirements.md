---
title: Requirements
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
## Android

To use this plugin on Android devices, ensure that you meet the following requirements:

1. **Set Minimum SDK Version**: Ensure your `minSdkVersion` is set to 21 or higher.    
2. **Enable Java 8 and AndroidX**:    
   - Your project must have Java 8 enabled.
   - Use **AndroidX** libraries instead of older support libraries.
3. **Update Android Gradle Plugin**: Make sure the `android-gradle-plugin` version is 4.0.0 or above.    
4. **Update Proguard**: Use Proguard version 6.2.2 or above.    
5. **Update Kotlin Gradle Plugin**: Ensure your `kotlin-gradle-plugin` version is 1.4.0 or higher.    
6. **Use FlutterFragmentActivity**: Replace `FlutterActivity` with `FlutterFragmentActivity` in your `MainActivity.kt`.    
7. **Customize SDK Colors and Appearance**: Follow the steps outlined in the [SDK Customizations for Android](https://docs.y.uno/docs/sdk-customizations-android) guide.    
8. **Rebuild the App**: After making these changes, rebuild the app as these updates are not reflected with hot reload.    
9. **Configure the App Class**: Use the [App.kt configuration example](https://github.com/yuno-payments/yuno-flutter-example/blob/develop/android/app/src/main/kotlin/com/example/example/MyApp.kt) for proper setup.
10. **Use Dart-Define with Yuno**:  Configure your project's [build.gradle file](https://github.com/yuno-payments/yuno-flutter-example/blob/develop/android/app/build.gradle) to enable the use of `dart-define` with Yuno.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Rebuild the App</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tRebuild the app as the above changes won’t reflect with hot reload. \n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## iOS

To use this plugin on IOS devices, ensure that you meet the following requirements:

1. **Minimum iOS Version**: Ensure that your project uses iOS version 14.0 or above.