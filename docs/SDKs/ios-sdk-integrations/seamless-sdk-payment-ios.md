---
title: Seamless SDK (Payment iOS)
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
On this page, you will find all the steps to add, configure, and use the Seamless iOS SDK to make payments in your iOS project.

> 👍 Recommended SDK
>
> We recommend using the **iOS Seamless SDK** for a smooth integration experience. This option provides a flexible payment solution with pre-built UI components and customization options.

<Image align="center" border={false} src="https://files.readme.io/bb2c987a467228d113d98035f453a459aedfb41554aad3eb49fc50fed8dbf0a0-Screenshot_2025-06-04_at_10.45.05_AM.png" />

## Step 1: Include the library in your project

You can add the library using CocoaPods or Swift Package Manager.

### CocoaPods

To add the Yuno SDK to your iOS project, you need to install the Yuno SDK. If you do not have a Podfile, follow the [CocoaPods guide](https://guides.cocoapods.org/using/using-cocoapods.html) to create one. After creating the Podfile, you will integrate the Yuno SDK with Cocoapods by adding the line below to your Podfile.

```ruby
pod 'YunoSDK', '~> 1.19.0'
```

After, you need to run the installation:

```ruby
pod install
```

### Swift Package Manager

If you are using the [Swift Package Manager](https://www.swift.org/package-manager/), add Yuno SDK as a dependency, as presented in the following code block:

```swift
dependencies: [
    .package(url: "https://github.com/yuno-payments/yuno-sdk-ios.git", .upToNextMajor(from: "1.1.17"))
]
```

## Step 2: Initialize SDK with the public key

To start running the Yuno iOS Seamless checkout, you first need to get your Yuno app ID and Public API key. Then, import and initialize Yuno as presented in the following code snippet:

```swift
import YunoSDK

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: YunoConfig(),
    callback: { (value: Bool) in }
)
```

> 🚧 UISceneDelegate
>
> Ensure that if your app uses a `UISceneDelegate`, the Yuno initialization code is placed within your `SceneDelegate`.

The Seamless checkout enables you to configure the appearance of the SDK. It is an optional step that you configure through the class `YunoConfig`. To set up configurations, use the following code block to configure the available elements:

```swift
final class YunoConfig {
    let cardFormType: CardFormType,
    let appearance: Yuno.Appearance,
    let saveCardEnabled: Bool,
    let keepLoader: Bool,
    let cardNumberPlaceholder: String? // Optional: Custom placeholder text for card number field
}
```

Configure the SDK with the following options:

| Parameter         | Description                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cardFormType`    | This field can be used to choose `Payment` and `Enrollment Card` flow. It's an optional property. It uses the `.oneStep` option by default.                                         |
| `appearance`      | This optional field defines the appearance of the checkout. By default, it uses Yuno styles.                                                                                        |
| `saveCardEnabled` | This optional field lets you choose whether the **Save Card** checkbox is shown on card flows. It is false by default.                                                              |
| `keepLoader`      | This optional field provides control over when to hide the loader. If set to `true`, the `hideLoader()` function must be called to hide the loader. By default, it is set to false. |
| `cardNumberPlaceholder` | This optional field allows you to customize the placeholder text for the card number field. Supports alphanumeric characters, spaces, and UTF-8 characters for localization. If not provided, the SDK uses the default placeholder ("Card number"). This customization does not affect card formatting, masking, BIN logic, or validation. |

> 📘 Accessing Your API Key
>
> You can retrieve your API Key from the [Developers section](../docs/developers-credentials) in the Yuno Dashboard.

### Create a checkout session

Before starting the payment process, you need to create a `checkout_session` using the [Create checkout session](ref:create-checkout-session) endpoint. This session initializes the payment flow and will be used in the next step.

#### Key Parameters

| Parameter            | Required | Description                                                                                                                                                                                                                                      |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `amount`             | Yes      | The primary transaction amount object containing `currency` (ISO 4217 code) and `value` (numeric amount in that currency).                                                                                                                      |
| `workflow`           | Yes      | Set the value to `SDK_SEAMLESS` so the SDK can complete the payment flow correctly.                                                                                                                                                              |
| `alternative_amount` | No       | An alternative currency representation of the transaction amount with the same structure as `amount` (`currency` and `value`). Useful for multi-currency scenarios, such as displaying prices to customers in their preferred currency (e.g., USD) while processing the payment in the local currency (e.g., COP). |

## Step 3: Start the checkout and Payment process

The seamless checkout and payment process is initiated with a single method `startPaymentSeamlessLite`. In the `ViewController`, where Yuno will be displayed, call the `Yuno.startPaymentSeamlessLite()` method. You can use the method with async/await or using callbacks:

```swift Swift (async/await)
func startPaymentSeamlessLite(
    with params: SeamlessParams,
    paymentSelected: PaymentMethodSelected,
    showPaymentStatus: Bool = true
) async -> Result
```
```swift Swift (with callbacks)
func startPaymentSeamlessLite(
    with params: SeamlessParams,
    paymentSelected: PaymentMethodSelected,
    showPaymentStatus: Bool = true,
    callback: @escaping ((Result) -> Void)
)
```

Additional parameters are required for the seamless version. These include:

* `PaymentMethodSelected`: The vaulted token and/or the payment method the customer will use to make the payment.

```swift
protocol PaymentMethodSelected {
    var vaultedToken: String? { get }
    var paymentMethodType: String { get }
}
```

* `SeamlessParams`

```swift
class SeamlessParams {
    var checkoutSession: String
    var country_code: String
    var language: String?
    var viewController: UIViewController?
}
```

Parameters

The following table describes each parameter from `SeamlessParams`:

| Parameter         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession` | Refers to the current payment's checkout session.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `country_code`    | This parameter determines the country for which the payment process is being configured. The complete list of supported countries and their country code is available on the [Country coverage](../docs/country-coverage-yuno-sdk) page.                                                                                                                                                                                                                                                                                                                                                      |
| `language`        | Defines the language to be used in the payment forms. You can set it to one of the available language options: <ul><li>es (Spanish)</li><li>en (English)</li><li>pt (Portuguese)</li><li>fil (Filipino)</li><li>id (Indonesian)</li><li>ms (Malay)</li><li>th (Thai)</li><li>zh-TW (Chinese (Traditional, Taiwan))</li><li>zh-CN (Chinese (Simplified, China))</li><li>vi (Vietnamese)</li><li>fr (French)</li><li>pl (Polish)</li><li>it (Italian)</li><li>de (German)</li><li>ru (Russian)</li><li>tr (Turkish)</li><li>nl (Dutch)</li><li>sv (Swedish)</li><li>ko (Korean)</li><li>ja (Japanese)</li></ul> |
| `viewController`  | This property represents the `UIViewController` used to present the payment flow. Even though the property remains optional for backward compatibility, you must supply a visible controller so the SDK can present its UI correctly.                                                                                                                                                                                                                                                                                                                                                                       |

> 🚧 Swift 6 Concurrency Requirements
>
> If you're using Swift 6, you'll need to implement the `YunoPaymentDelegate` protocol with specific concurrency considerations. Swift 6 introduces stricter thread safety requirements that affect how you implement delegates. See the [Implementing `YunoPaymentDelegate` with Swift 6 Concurrency](#implementing-yunopaymentdelegate-with-swift-6-concurrency) section for detailed implementation options and best practices.

## Step 4: Handle Payment Status (Optional)

> ❗️ Deep Links and Mercado Pago Checkout Pro
>
> This step is only required if you're using a payment method that relies on deep links or Mercado Pago Checkout Pro. If your payment methods don't use deep links, you can skip this step.

Some payment methods take users out of your app to complete the transaction. Once the payment is finished, the user is redirected back to your app using a deep link. The SDK uses this deep link to check what happened, checking if the payment was successful, failed, or canceled, and can show a status screen to the user.

To handle this, you need to update your `AppDelegate` to pass the incoming URL back to the Yuno SDK. This lets the SDK read the result and optionally display the payment status. The following code snippet shows how you can add it to your app:

```swift
func application(_ app: UIApplication,
                 open url: URL,
                 options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {

  guard url.scheme == "yunoexample" else { return false }

  return Yuno.receiveDeeplink(url, showStatusView: true)
}
```

This code listens for deep links that open your app. When a URL is received, it checks if the scheme matches the one you used in the `callback_url` during checkout session setup. If it matches, the URL is passed to the Yuno SDK using `Yuno.receiveDeeplink(...)`. The SDK then reads the payment result and, if `showStatusView` is set to `true`, shows the appropriate status screen to the user.

Make sure the `url.scheme` in this code matches the `callback_url` you provided when creating the `checkout_session`.

## Transaction state

After the payment is completed, the SDK can return different transaction states. The list of all possible states and their descriptions are presented in the following table:

| Transaction state | Description                                                                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `success`         | Indicates that the transaction or payment process has been completed successfully.                                                                                                                                                  |
| `fail`            | This state indicates that the transaction or payment process has failed. It means that there was an error or issue during the payment process that prevented it from being completed successfully.                                  |
| `processing`      | Indicates that the transaction or payment process is currently being processed. It is typically used when there is a delay in payment processing, such as waiting for approval from a third-party service or financial institution. |
| `reject`          | This state indicates that the transaction has been rejected. The rejection can occur for various reasons, such as insufficient funds, fraudulent activity, or requests that violate specific rules or policies.                     |
| `internalError`   | It means that an unexpected error occurred within the system or infrastructure handling the payment process. This state suggests a problem on the server or backend side rather than an issue with the user's input or request.     |
| `userCancell`     | This state indicates that the user has voluntarily canceled or aborted the transaction or payment process. It is typically used when the user has the option to cancel or abandon the payment process.                              |

The transaction state can be handled in two ways when using the `startPaymentSeamlessLite` method:

* **Async/Await**: Use the async/await approach for a more streamlined flow. This method returns a Result asynchronously, making the code easier to read and manage.
* **Callback**: You can handle the transaction state via a callback function, allowing immediate execution once the result is available.

Both options provide flexibility depending on your preferred approach to asynchronous code.

```swift
enum Result {
    case reject, success, fail, processing, internalError, userCancell
}
```

## Complementary Features

Yuno iOS SDK provides additional services and configurations you can use to improve customers' experience. Use the [SDK Customizations](../docs/sdk-customizations-ios) to change the SDK appearance to match your brand or to configure the loader.

* **Loader**: Control the use of the loader through the SDK configuration options.
* Save card for future payments: In addition, you can display a checkbox for save or enroll cards using `cardSaveEnable: true`. Below, you can find examples of the checkbox for both card form renders.

<Image alt="Example Checkbox" border={false} src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXe9dPjXE9Y8Uq3EKpmzUrsBpXHCHtspu98NLo41GsszFV1lCCGNsiXvB-9dmQRtPTExcDWQ7S-Qqoq0iFXaeogBZPpONcLy8Ep55cqog0KHHasbstgeCgSTR00BiFmIbcWd4NwHkO7LrLUOsQXnFV1_gT45?key=-31QL7MEbUE8QLWSURQp1jZt" />

* You also can choose one of the render options for the card form. Below, you find screenshots presenting the difference between the `cardFormType` `ONE_STEP` and `STEP_BY_STEP`.

<Image alt="Render Options" border={false} src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcf2gb-FB3sHbyzXYhwBcio9JJ7i0Vh-WBwHQC1dLul3k5XKGExvmYCApNNdx7DfwZcNgK-ARnQgncc3lE-3ln0chmnKstQL7NBKXXjgM8OHk4JpAeCneddETCFUAIF6xpCGMSDrrsBy7N4lHPcgYncIu7J?key=-31QL7MEbUE8QLWSURQp1jZt" />

* [SDK Customizations](../docs/sdk-customizations-ios): Change the SDK appearance to match your brand.

## Implementing `YunoPaymentDelegate` with Swift 6 Concurrency

Swift 6 introduces stricter concurrency requirements that affect how you implement the `YunoPaymentDelegate` protocol. This section explains the challenges and provides solutions for different implementation scenarios.

> 📘 Understanding Concurrency in Swift 6
>
> Concurrency is the ability of your app to manage multiple tasks simultaneously. With Swift 6, concurrency rules have become more stringent to enhance app stability and prevent crashes. This means that your code must be more carefully structured to ensure thread safety and proper task management.

### The problem

With Swift 6, protocols that inherit from `Sendable` require all their implementations to be thread-safe. This generates warnings when implementing the delegate in classes marked as `@MainActor`.

Thread-safe means your code can be safely called from multiple threads without causing crashes or unexpected behavior. `@MainActor` ensures code runs on the main thread (UI thread).

### Our design decision

We do not mark protocols as `@MainActor` because:

* It would force all implementations to be `MainActor` compatible
* It would reduce flexibility for merchants who don't use `MainActor`
* Each implementation has different concurrency needs

### Merchant's responsibility

It's the merchant's responsibility to handle concurrency according to their implementation. Below are three different approaches you can use depending on your specific needs.

#### Option 1: Immutable properties

This approach uses immutable properties that are automatically thread-safe, making them ideal for simple configurations. It is best suited for simple apps with fixed configuration values that don't change during runtime.

```swift
@MainActor
class MyViewController: UIViewController, YunoPaymentDelegate {
    
    private let _countryCode = "CO"
    private let _language = "EN"
    
    nonisolated var countryCode: String { _countryCode }
    nonisolated var language: String? { _language }
    nonisolated var checkoutSession: String { _checkoutSession }
    
    nonisolated func yunoPaymentResult(_ result: Yuno.Result) {
        Task { @MainActor in
        }
    }
}
```

#### Option 2: Mutable properties with `MainActor.assumeIsolated`

This approach, best for apps where configuration values might change during runtime (like user preferences), allows for mutable properties while maintaining thread safety by using `MainActor.assumeIsolated`.

```swift
@MainActor
class MyViewController: UIViewController, YunoPaymentDelegate {
    
    @Published var configLanguage: String = "EN"
    @Published var configCountryCode: String = "CO"
    
    nonisolated var language: String? {
        MainActor.assumeIsolated { configLanguage }
    }
    
    nonisolated var countryCode: String {
        MainActor.assumeIsolated { configCountryCode }
    }
}
```

#### Option 3: For non `MainActor` classes

This approach is suitable for service classes that don't require `MainActor` isolation, making it best for background services or utility classes that don't interact with the UI.

```swift
class MyService: YunoPaymentDelegate {
    
    let countryCode: String
    let language: String?
    let checkoutSession: String
    let viewController: UIViewController?
    
    init(countryCode: String, language: String?, checkoutSession: String, viewController: UIViewController?) {
        self.countryCode = countryCode
        self.language = language
        self.checkoutSession = checkoutSession
        self.viewController = viewController
    }
    
    func yunoPaymentResult(_ result: Yuno.Result) {
    }
}
```

### ⚠️ Important considerations

When implementing concurrency in your delegate, keep these key points in mind:

* `MainActor.assumeIsolated`: Only use when you guarantee it's called from `MainActor`. This is a safety mechanism that tells Swift "trust me, I know this is running on the main thread."
* `nonisolated`: Means it can be accessed from any thread, so it must be thread-safe. Use this when your properties or methods don't depend on UI state.
* `viewController`: Remains as `@MainActor` because it should always be accessed from the main thread. UI components must always run on the main thread to prevent crashes.
