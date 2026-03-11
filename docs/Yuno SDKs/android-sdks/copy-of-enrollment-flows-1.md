---
title: Copy of Enrollment Flows
deprecated: false
hidden: true
metadata:
  robots: index
---

The Android SDK makes it easy to implement enrollment flows for saving payment methods to a customer account.

Include the library in your project by following the same steps as in [payment flows](payment-flows-android#include-the-library-in-your-project). This lets you complete [step 2](#step-2-include-the-library-in-your-project) and continue with the enrollment flow below.

## Additional resources

- See [Choose the right integration for you](choose-your-integration) if you're unsure which flow to follow.
- Access the [Release notes](release-notes-android) or the [Yuno Android SDK repository](https://github.com/yuno-payments/yuno-sdk-android) to verify the latest SDK version available.

- [Lite Enrollment (Android)](#lite-enrollment-android): Lightweight enrollment with UI control and backend support
- [Headless Enrollment (Android)](#headless-enrollment-android): Full enrollment experience customization without requiring PCI compliance

## Requirements

* **Minimum SDK Version**: `minSdkVersion` 21 or above
* **Java**: Java 8 enabled
* **AndroidX**: Use AndroidX instead of older support libraries
* **Android Gradle Plugin**: 4.0.0 or above
* **ProGuard**: 6.2.2 or above
* **Kotlin Gradle Plugin**: 1.4.0 or above
* **ELF Page Size Support**: Compliant with Google's 16 KB ELF page alignment requirements (Android 15 / ARMv9 ready)
* Active Yuno account
* API credentials (obtain from the [Yuno Dashboard](https://dashboard.y.uno/) → **Developers** > **Credentials**)
* Create a customer using the [Create customer endpoint](ref:create-customer) before enrolling

## Parameters

For the full list of parameters, see the [Android SDK Common Reference](android-sdk-common-reference).

| Parameter | Description |
|-----------|-------------|
| `customerSession` | Customer session ID from Create customer session API. Required. |
| `countryCode` | ISO country code. Required. |
| `showEnrollmentStatus` | Show enrollment result screen. Optional; default true. |
| `callbackEnrollmentState` | Callback: enrollment state. Optional; requires `initEnrollment` in onCreate. |
| `requestCode` | Optional; use if capturing result via `onActivityResult`. |
| `countryCode` (Headless) | Country for the enrollment. Required for apiClientEnroll. |
| `customerSession` (Headless) | Customer session ID. Required for apiClientEnroll. |

## Lite Enrollment (Android)

Yuno Lite for Android provides enrollment with pre-built UI, card enrollment, status handling, and basic error management. Use it when you need minimal customization and a ready-to-use enrollment flow. See [Requirements](#requirements) above.

### Step 1: Create a customer

Create a customer in Yuno's system using the [Create customer endpoint](ref:create-customer) before enrolling payment methods. This endpoint returns a `customer_id`. Then create a customer session using the [Create Customer Session](ref:create-customer-session) endpoint; use the returned `customer_session` when calling the enrollment methods.

### Step 2: Include the library in your project

Add the Yuno Lite library to your Android project:

#### Add the Repository

Add Yuno's Maven repository to your project's Gradle configuration:

```kotlin
maven { url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" }
```

Add the dependency in `build.gradle`:

```kotlin
dependencies {
    implementation 'com.yuno.payments:android-sdk:2.11.0'
}
```

#### Permissions

The Yuno SDK includes the `INTERNET` permission by default, which is required to make network requests.

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### Step 3: Initialize SDK with the public key

Initialize the SDK:

1. Get your Public API Key from the [Yuno Dashboard](https://dashboard.y.uno/)
2. Create a custom application class if you haven't already done so
3. In the `onCreate()` method of your application class, call `Yuno.initialize()` with your API key:

```kotlin
class CustomApplication : Application() {
  override fun onCreate() {
    super.onCreate()
    Yuno.initialize(
      this,
      PUBLIC_API_KEY,
      config = YunoConfig(),
    )
  }
}
```

Use the data class `YunoConfig` to customize the SDK's behavior. Include this configuration when calling `Yuno.initialize()`. The available options are:

```kotlin
data class YunoConfig(
    val saveCardEnabled: Boolean = false,
    val keepLoader: Boolean = false,
    val cardFormDeployed: Boolean = false,
    val language: YunoLanguage? = null,
    val styles: YunoStyles? = null
)
```

> 🚧 cardFlow removed from YunoConfig
>
> Starting from version **2.11.0**, `cardFlow` is no longer part of `YunoConfig`. Card flow configuration is now handled exclusively through the **CheckoutBuilder**.

### Step 4: Enroll a new payment method

The enrollment process is a two-step flow. First, initialize the process to set up the necessary components. Then, start the UI flow to allow the user to enroll a payment method.

#### 4.1 Initialize the enrollment process

Call the `initEnrollment` method within your activity's `onCreate` method to prepare your app to handle the enrollment flow. This is a mandatory setup step required by the Android operating system to register the contract that allows the SDK to send the final enrollment status back to your app.

```kotlin
fun ComponentActivity.initEnrollment(
    callbackEnrollmentState: ((String?) -> Unit)? = null
)
```

#### 4.2 Start the enrollment flow

Call the `startEnrollment` method to launch the user interface and begin the enrollment of a new payment method. You can call this method at any point after `initEnrollment` has been executed, such as when a user taps an "Enroll New Payment Method" button.

```kotlin
fun Activity.startEnrollment(
    customerSession: String,
    countryCode: String,
    showEnrollmentStatus: Boolean = true,
    callbackEnrollmentState: ((String?) -> Unit)? = null,
    requestCode: Int
)
```

`startEnrollment` parameters:

| Parameter                 | Description                                                                                                                                                                                                                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customerSession`         | The session customer associated with the current enrollment process.                                                                                                                                                                                                                                             |
| `countryCode`             | Country code where the payment is performed. See [Country coverage](country-coverage) for a complete list of supported countries and their codes.                                                                                                                                                   |
| `showEnrollmentStatus`    | Indicates whether the enrollment status should be shown. This parameter is optional and defaults to `true`.                                                                                                                                                                                                      |
| `callbackEnrollmentState` | A function that returns the current state of the enrollment process. This parameter is optional and defaults to `null`. To register this callback, you must call `initEnrollment` method in the `onCreate` method of the activity. Check the possible states that can be returned. |
| `requestCode`             | It is an optional parameter you must inform if you are going to use the `onActivityResult` method to capture the enrollment states.                                                                                                                                                                              |

## Headless Enrollment (Android)

Yuno Headless for Android provides UI-free enrollment: card tokenisation, direct API access, and custom error handling. Use it when you need full control over the enrollment UI and flow. See [Requirements](#requirements) above.

### Step 1: Create a customer and customer session

Create a customer using the [Create Customer](ref:create-customer) endpoint before enrolling payment methods. Then create a new `customer_session` using the [Create Customer Session](ref:create-customer-session) endpoint and store the `customer_session` ID for the enrollment calls.

### Step 2: Add the SDK to your project

Add the repository source and SDK dependency:

```kotlin
maven { url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" }

dependencies {
    implementation 'com.yuno.payments:android-sdk:2.11.0'
}
```

Ensure your manifest includes:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### Step 3: Initialize Headless with the public key

Retrieve your public API keys from the [Yuno Dashboard](https://dashboard.y.uno/). Then initialize the SDK:

```kotlin
class CustomApplication : Application() {
  override fun onCreate() {
    super.onCreate()
    Yuno.initialize(
      this,
      PUBLIC_API_KEY,
      config = YunoConfig(),
    )
  }
}
```

### Step 4: Start the enrollment process

Use `apiClientEnroll` to start enrollment. Required parameters:

| Parameter          | Description                                                                                                                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `countryCode`      | This parameter determines the country for which the payment process is being configured. The complete list of supported countries and their codes is available on the [Country coverage](country-coverage) page. |
| `customerSession`  | Refers to the current enrollment's customer session received as a response to the [Create Customer Session](ref:create-customer-session) endpoint. Example: `438413b7-4921-41e4-b8f3-28a5a0141638`                     |

Example:

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
  val apiClientEnroll = Yuno.apiClientEnroll(
    countryCode = "CO",
    customerSession = "eec6578e-ac2f-40a0-8065-25b5957f6dd3",
    context = this
  )
}
```

### Step 5: Generate a vaulted token

After collecting all required customer information, create a `vaulted_token` with `apiClientEnroll.continueEnrollment`. Use a `try/catch` block for errors. Example:

```kotlin
apiClientEnroll.continueEnrollment(
  collectedData = EnrollmentCollectedData(
    customerSession = "customer_session",
    paymentMethod = EnrollmentMethod(
      type = "CARD",
      card = CardData(
        save = true,
        detail = Detail(
          expirationMonth = 11,
          expirationYear = 55,
          number = "4111111111111111",
          securityCode = "123",
          holderName = "Firstname Lastname",
          type = CardType.DEBIT
        ),
        customer = Customer(
          id = "id",
          merchantCustomerId = "merchant_customer_id",
          firstName = "firstName",
          email = "email@email.com",
          country = "CO",
          document = Document(
            documentType = "PAS",
            documentNumber = "PAS12312"
          ),
          phone = Phone(
            number = "321123321123",
            countryCode = "57"
          )
        )
      )
    )
  ),
  context = this
)
```

The `apiClientEnroll.continueEnrollment` function returns an Observable type that extends `LiveData`. You can observe the response as a standard `LiveData` with type `SingleLiveEvent<Map<String, Any?>>`. The response will include the `vaulted_token` and enrollment `status`, which you can use for future payments or to update your customer records.

## Common reference

For full parameter and customization details, see the [Android SDK Common Reference](android-sdk-common-reference).