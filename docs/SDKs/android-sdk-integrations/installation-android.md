---
title: Installation
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
## Adding the SDK to the project

First, add the repository source using the following code line:

```kotlin
maven { url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" }
```

After that, include the code snippet below in the "build.gradle" file to add the Yuno SDK dependency to the application.

```kotlin
dependencies {
    implementation 'com.yuno.payments:android-sdk:{last_version}'
}
```

#### Permissions

We have already included the INTERNET permission by default as we need it to make network requests.

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

### Initialize Yuno

To initialize the Yuno SDK, first, you need to get your public API keys from the Yuno dashboard. Then, if you have not implemented a custom application yet, you will need to create one and call the initialize function in the onCreate() method of your application class.

The following code snippet includes an example of a custom application:

```kotlin
class CustomApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Yuno.initialize(
        this, 
        "your api key",
        config: YunoConfig, // This is a data class to use custom configs in the SDK.
        )
    }
}
```

Please use the YunoConfig data class presented as follows:

```kotlin
data class YunoConfig(
    val cardFlow: CardFormType = CardFormType.ONE_STEP, // This is optional, CardFormType.ONE_STEP by default, this is to choose Payment and Enrollment Card flow.
    val saveCardEnabled: Boolean = false, // This is to choose if show save card checkbox on cards flows.
)
```

In addition, you need to update your manifest to use your application:

```XML
<application
    android:name=".CustomApplication">
</application>
```
