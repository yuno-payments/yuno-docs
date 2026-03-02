---
title: Lite SDK (Enrollment iOS)
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: Lite SDK (Enrollment)
  description: >-
    Here is a step-by-step guide on integrating Yuno's Lite SDK (Enrollment)
    into your iOS application, enabling efficient and secure payment processing
    for your mobile platform.
  robots: index
next:
  description: ''
---
This guide walks you through integrating Yuno's Lite iOS SDK for enrollment into your project.

## Requirements

Before implementing the Yuno iOS SDK, ensure you meet these requirements:

* Add [CocoaPods](https://guides.cocoapods.org/using/using-cocoapods.html) or [Swift Package Manager](https://www.swift.org/package-manager/) to your project.
* Use iOS version 14.0 or above.

## Step 1: Include the library in your project

You can add the library using CocoaPods or Swift Package Manager.

### CocoaPods

Add the Yuno SDK to your iOS project using CocoaPods. If you don't have a Podfile, follow the [CocoaPods guide](https://guides.cocoapods.org/using/using-cocoapods.html) to create one. Then add the following line to your Podfile:

```ruby
pod 'YunoSDK', '~> 1.1.22'
```

Then run the installation:

```ruby
pod install

```

### Swift Package Manager

Add the Yuno SDK using Swift Package Manager. Add `YunoSDK` as a dependency in your Package.swift file:

```swift
dependencies: [
    .package(url: "https://github.com/yuno-payments/yuno-sdk-ios.git", .upToNextMajor(from: "1.1.17"))
]
```

## Step 2: Enroll a new payment method

<Callout icon="📘" theme="info">
  Before calling `Yuno.enrollPayment()`, make sure you’ve initialized the SDK with `Yuno.initialize()`.
</Callout>

Yuno's iOS SDK provides an enrollment feature for payment methods. To display the enrollment flow, implement the delegate and call the enrollment method:

```swift
protocol YunoEnrollmentDelegate: AnyObject {
    var customerSession: String { get }
    var countryCode: String { get }
    var language: String? { get }
    var viewController: UIViewController? { get }

    func yunoEnrollmentResult(_ result: Yuno.Result)
}

class ViewController: YunoEnrollmentDelegate {

    func startEnrollment() {
        Yuno.enrollPayment(with: self, showPaymentStatus: Bool)
    }
}

```

`Yuno.enrollPayment()` presents a full-screen `UIViewController` modally using the `viewController` provided in your `delegate`. This works only in UIKit. In SwiftUI, wrap a `UIViewController` and return it via the `viewController` property. The `delegate` must expose a visible controller to allow the SDK to present the UI.

Parameters

| Parameter                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `customerSession`                              | Refers to the current payment's customer session.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `countryCode`                                  | This parameter determines the country for which the payment process is being configured. The complete list of supported countries and their country code is available on the [Country coverage](doc:quickstart) page.                                                                                                                                                                                                                                                                                                                                                                          |
| `language`                                     | Defines the language to be used in the payment forms. You can set it to one of the available language options: <ul><li>es (Spanish)</li><li>en (English)</li><li>pt (Portuguese)</li><li>fil (Filipino)</li><li>id (Indonesian)</li><li>ms (Malay)</li><li>th (Thai)</li><li>zh-TW (Chinese (Traditional, Taiwan))</li><li>zh-CN (Chinese (Simplified, China))</li><li>vi (Vietnamese)</li><li>fr (French)</li><li>pl (Polish)</li><li>it (Italian)</li><li>de (German)</li><li>ru (Russian)</li><li>tr (Turkish)</li><li>nl (Dutch)</li><li>sv (Swedish)</li><li>ko (Korean)</li><li>ja (Japanese)</li></ul> |
| `viewController`                               | This property represents the `UIViewController` used to present the enrollment flow. Even though the property remains optional for backward compatibility, you must supply a visible controller so the SDK can present its UI correctly. |
| `yunoEnrollmentResult(\_ result: Yuno.Result)` | This method is called when the enrollment process is completed, providing the result of the enrollment as a parameter of type `Yuno.Result`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

The `showPaymentStatus` parameter determines whether the payment status should be displayed. Passing `true` shows the payment status, while passing `false` hides it.

Parameters

The `enrollPayment` method parameters are described below:

| Parameter           | Type                     | Description                                                                                           |
| :------------------ | :----------------------- | :---------------------------------------------------------------------------------------------------- |
| `delegate`          | `YunoEnrollmentDelegate` | The delegate object that handles enrollment callbacks.                                                |
| `showPaymentStatus` | `Bool`                   | A Boolean flag that determines whether to display status views during the payment enrollment process. |

The method `enrollPayment` initiates the payment enrollment process. You should call it in response to user interactions, such as pressing a button. The method utilizes the provided `delegate` to manage enrollment events and, based on the parameter `showPaymentStatus`, decides whether to show visual feedback about the enrollment status.

## Step 3: Enrollment status

> ❗️ Deep Link Enrollment
>
> This feature is only used if you enroll in a payment method that executes deep links. If you are not enrolling in a payment method that executes deep links, you can ignore Step 3.

If you use a payment method that requires a deep link to return to your app, use the method described in the following code block to obtain the enrollment status in your `AppDelegate`. The `url.scheme` should be the same as the `callback_url` used when creating the `customer_session`.

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {

  guard url.scheme == "yunoexample" else { return false }
  return Yuno.receiveDeeplink(url, showStatusView: true)
}

```

> 🚧 Swift 6 Concurrency Requirements
>
> If you're using Swift 6, you'll need to implement the `YunoPaymentDelegate` protocol with specific concurrency considerations. Swift 6 introduces stricter thread safety requirements that affect how you implement delegates. See the [Implementing `YunoPaymentDelegate` with Swift 6 Concurrency](#implementing-yunopaymentdelegate-with-swift-6-concurrency) section for detailed implementation options and best practices.

## Understanding `Yuno.Result`

When the enrollment process finishes, the SDK calls:

```swift
func yunoEnrollmentResult(_ result: Yuno.Result)
```

This result can reflect different final states for the enrollment. The `Yuno.Result` enum includes:

```swift
enum Result {
    case success
    case fail
    case reject
    case processing
    case internalError
    case userCancell
}
```

You can use a switch to handle each result case:

```swift
func yunoEnrollmentResult(_ result: Yuno.Result) {
    switch result {
    case .success:
        print("Enrollment successful")
    case .fail:
        print("Enrollment failed")
    case .processing:
        print("Enrollment still processing")
    case .reject:
        print("Enrollment rejected")
    case .userCancell:
        print("User canceled")
    case .internalError:
        print("Internal error")
    }
}
```

<Callout icon="📘" theme="info">
  `Yuno.Result` does not include tokens or error messages. You’ll only get a high-level status to help you guide the user experience.
</Callout>

## Render mode integration (enrollment)

The render mode offers enhanced UI flexibility for enrollment, letting you integrate the enrollment flow within your own views while using the SDK’s validations and logic.

### Main function: `startEnrollmentRenderFlow`

```swift
@MainActor static func startEnrollmentRenderFlow(
    with delegate: YunoEnrollmentDelegate
) async -> some YunoEnrollmentRenderFlowProtocol
```

### YunoEnrollmentRenderFlowProtocol

```swift
func formView(
    with delegate: YunoEnrollmentDelegate
) async -> AnyView?

func submitForm()

var needSubmit: Bool { get }
```

* **formView**: Returns an `AnyView` with the enrollment form (cards/APMs) if UI is required; otherwise `nil`.
* **submitForm**: Triggers validations and proceeds with enrollment when applicable.
* **needSubmit**: Indicates whether you should render a submit button.

### Implementation flow

#### Step 1: Create enrollment flow instance

```swift
let enrollmentFlow = await Yuno.startEnrollmentRenderFlow(with: self)
```

#### Step 2: Get and display the form

```swift
let formView = await enrollmentFlow.formView(with: self)

if let formView = formView {
    VStack {
        Text("Enroll Payment Method")
        formView

        if enrollmentFlow.needSubmit {
            Button("Enroll") {
                enrollmentFlow.submitForm()
            }
        }
    }
}
```

#### Step 3: Handle the enrollment result

```swift
extension MyViewController: YunoEnrollmentDelegate {
    var customerSession: String { "your_customer_session" }
    var countryCode: String { "CO" }
    var language: String? { "es" }
    var viewController: UIViewController? { self }

    func yunoEnrollmentResult(_ result: Yuno.Result) {
        // Handle enrollment result
    }
}
```

## Complementary features

Yuno iOS SDK provides additional services and configurations you can use to improve customers' experience.

### Render option

When presenting the enrollment, you can also choose one of the render options for the card form. You have the following options:

* `ONE_STEP`
* `STEP_BY_STEP`

You can change the render option; each option is presented below.

<Image align="center" border={false} src="https://files.readme.io/ff9a74d50d3a8d3a4e550be1b917832bd6b8daa28cc4249d9ec22edef2f410bc-Full_SDK_ios.png" />

### Loader

Control the use of the loader through the SDK configuration options.

### SDK Customizations

Use the [SDK Customizations](../docs/sdk-customizations-ios) to change the SDK appearance to match your brand.

> 📘 Demo App
>
> In addition to the code examples provided, you can access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-ios) for a complete implementation of Yuno iOS SDKs.

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
            // Handle result
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
        // Handle result
    }
}
```

### ⚠️ Important considerations

When implementing concurrency in your delegate, keep these key points in mind:

* `MainActor.assumeIsolated`: Only use when you guarantee it's called from `MainActor`. This is a safety mechanism that tells Swift "trust me, I know this is running on the main thread."
* `nonisolated`: Means it can be accessed from any thread, so it must be thread-safe. Use this when your properties or methods don't depend on UI state.
* `viewController`: Remains as `@MainActor` because it should always be accessed from the main thread. UI components must always run on the main thread to prevent crashes.
