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

> 📘 Recommended SDKs
> 
> We recommend using the [iOS Full SDK](full-checkout-ios) or the [iOS Lite SDK](enrollment-ios) for a smooth integration experience. These options provide a complete solution with built-in forms and validation.

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

If you are using the Swift Package Manager, to add the Yuno SDK to your iOS project, you need to install the [Swift Package Manager](https://www.swift.org/package-manager/). With the Swift package set up, add Yuno SDK as a dependency, as presented in the following code block:

```swift
dependencies: [
    .package(url: "https://github.com/yuno-payments/yuno-sdk-ios.git", .upToNextMajor(from: "1.1.17"))
]
```

## Step 2: Initialize SDK with the public key

To start running the Yuno iOS Lite checkout, you first need to get your Yuno app ID and Public API key. Then, import and initialize Yuno as presented in the following code snippet:

```swift
import YunoSDK

Yuno.initialize(
    apiKey: "<Public API Key>",
    config: YunoConfig() // This is optional, by default it configures .oneStep card form and disables save card checkbox.,
    callback: { (value: Bool) in } // Optional callback to be notified when the SDK has completed initialization
)
```

> 📘 UISceneDelegate
> 
> If your app uses a `UISceneDelegate`, you must put your Yuno initialization code into your `SceneDelegate`.

The Seamless checkout enables you to configure the appearance of the SDK. It is an optional step that you configure through the class `YunoConfig`. To set up configurations, use the following code block to configure the available elements:

```swift
final class YunoConfig {
    let cardFormType: CardFormType,
    let appearance: Yuno.Appearance,
    let saveCardEnabled: Bool,
    let keepLoader: Bool
}
```

Below, you find a description of each configuration variable available.

| Parameter         | Description                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cardFormType`    | This field can be used to choose `Payment` and `Enrollment Card` flow. It's an optional property. It uses the `.oneStep` option by default.                                         |
| `appearance`      | This optional field defines the appearance of the checkout. By default, it uses Yuno styles.                                                                                        |
| `saveCardEnabled` | This optional field lets you choose whether the **Save Card** checkbox is shown on card flows. It is false by default.                                                              |
| `keepLoader`      | This optional field provides control over when to hide the loader. If set to `true`, the `hideLoader()` function must be called to hide the loader. By default, it is set to false. |

> 📘 Accessing Your API Key
> 
> You can retrieve your API Key from the [Developers section](https://docs.y.uno/docs/developers-credentials) in the Yuno Dashboard.

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

Below, you will find a description of each parameter from `SeamlessParams`:

| Parameter         | Description                                                                                                                                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession` | Refers to the current payment's checkout session.                                                                                                                                                                                                        |
| `country_code`    | This parameter determines the country for which the payment process is being configured. The complete list of supported countries and their country code is available on the [Country coverage](https://docs.y.uno/docs/country-coverage-yuno-sdk) page. |
| `language`        | Defines the language to be used in the payment forms. You can set it to one of the available language options: `en` (English), `es` (Spanish), `pt` (Portuguese).                                                                                        |
| `viewController`  | This parameter is of type `UIViewController` and represents the merchant's view where Yuno's payment flow will be presented.                                                                                                                             |

## Step 4: Handle Payment Status (Optional)

> 📘 Deep Links and Mercado Pago Checkout Pro
>
> This step is only required if you're using a payment method that relies on deep links or Mercado Pago Checkout Pro. If your payment methods don't use deep links, you can skip this step.

Some payment methods take users out of your app to complete the transaction. Once the payment is finished, the user is redirected back to your app using a deep link. The SDK uses this deep link to check what happened, checking if the payment was successful, failed, or canceled, and can show a status screen to the user.

To handle this, you need to update your `AppDelegate` to pass the incoming URL back to the Yuno SDK. This lets the SDK read the result and optionally display the payment status. The following code snippet shows how you can add it to your app:

```swift
func application(_ app: UIApplication,
                 open url: URL,
                 options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {

  // Make sure the scheme matches the one you used in the checkout_session
  guard url.scheme == "yunoexample" else { return false }

  // Let Yuno handle the deep link and show the payment status screen
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

Yuno iOS SDK provides additional services and configurations you can use to improve customers' experience. Use the [SDK Customizations](https://docs.y.uno/docs/sdk-customizations-ios) to change the SDK appearance to match your brand or to configure the loader.

* [Loader](https://docs.y.uno/docs/loader-1): Control the use of the loader.
* Save card for future payments: In addition, you can display a checkbox for save or enroll cards using `cardSaveEnable: true`. Below, you can find examples of the checkbox for both card form renders.

![Example Checkbox](https://lh7-rt.googleusercontent.com/docsz/AD_4nXe9dPjXE9Y8Uq3EKpmzUrsBpXHCHtspu98NLo41GsszFV1lCCGNsiXvB-9dmQRtPTExcDWQ7S-Qqoq0iFXaeogBZPpONcLy8Ep55cqog0KHHasbstgeCgSTR00BiFmIbcWd4NwHkO7LrLUOsQXnFV1_gT45?key=-31QL7MEbUE8QLWSURQp1jZt)

* You also can choose one of the render options for the card form. Below, you find screenshots presenting the difference between the `cardFormType` `ONE_STEP` and `STEP_BY_STEP`.

![Render Options](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcf2gb-FB3sHbyzXYhwBcio9JJ7i0Vh-WBwHQC1dLul3k5XKGExvmYCApNNdx7DfwZcNgK-ARnQgncc3lE-3ln0chmnKstQL7NBKXXjgM8OHk4JpAeCneddETCFUAIF6xpCGMSDrrsBy7N4lHPcgYncIu7J?key=-31QL7MEbUE8QLWSURQp1jZt)

* [SDK Customizations](https://docs.y.uno/docs/sdk-customizations-ios): Change the SDK appearance to match your brand.
