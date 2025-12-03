---
title: Lite SDK (Payment iOS)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Lite SDK (Payment)
  description: >-
    Here is a step-by-step guide on integrating Yuno's Lite SDK (Payment) into
    your iOS application, enabling efficient and secure payment processing for
    your mobile platform.
  robots: index
next:
  description: ''
---
<br />

> 👍 Recommended SDK
>
> We recommend using the [iOS Seamless SDK](seamless-sdk-payment-ios) for a smooth integration experience. This option provides a flexible payment solution with pre-built UI components and customization options.

This guide walks you through integrating Yuno's Lite iOS SDK for payments into your project.

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

## Step 2: Initialize SDK with the public key

Initialize the Yuno iOS SDK with your Public API Key:

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
> If your app is using a UISceneDelegate, you will need to put your Yuno initialization code into your SceneDelegate.

Configure the SDK appearance and behavior using the `YunoConfig` class. This is optional and allows you to customize the checkout experience:

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

| Parameter         | Description                                                                                                                                                                           |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `cardFormType`    | This field can be used to choose Payment and Enrollment Card flow. It's an optional property and considers `.oneStep` by default.                                                   |
| `appearance`      | This optional field defines the appearance of the checkout. By default, it uses Yuno styles.                                                                                          |
| `saveCardEnabled` | This optional field can be used to choose if the **Save Card** checkbox is shown on card flows. It is false by default.                                                               |
| `keepLoader`      | This optional field provides control over when to hide the loader. If set to `true`, the `hideLoader()` function must be called to hide the loader. By default, it is set to `false`. |
| `cardNumberPlaceholder` | This optional field allows you to customize the placeholder text for the card number field. Supports alphanumeric characters, spaces, and UTF-8 characters for localization. If not provided, the SDK uses the default placeholder ("Card number"). This customization does not affect card formatting, masking, BIN logic, or validation. |

> 📘 Accessing Your API Key
>
> You can retrieve your API Key from the [Developers section](../docs/developers-credentials) in the Yuno Dashboard.

## Step 3: Start the checkout process

Create a ViewController that adopts the `YunoPaymentDelegate` protocol:

> ❗️ Deprecation
>
> The `startCheckout` method has been deprecated in recent iOS SDK versions.

```swift
protocol YunoPaymentDelegate: AnyObject {
    var checkoutSession: String { get }
    var countryCode: String { get }
    var language: String? { get }
    var viewController: UIViewController? { get }

    func yunoCreatePayment(with token: String)
    func yunoCreatePayment(with token: String, information: [String: Any])
    func yunoPaymentResult(_ result: Yuno.Result)
}


class ViewController: YunoPaymentDelegate {

    func viewDidLoad() {
        super.viewDidLoad()
    }
}
```

Parameters

| Parameter                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `checkoutSession`                                                   | Refers to the current payment's checkout session.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `countryCode`                                                       | This parameter determines the country for which the payment process is being configured. The complete list of supported countries and their country code is available on the [Country coverage](doc:country-coverage-yuno-sdk) page.                                                                                                                                                                                                                                                                                                                                                                          |
| `language`                                                          | Defines the language to be used in the payment forms. You can set it to one of the available language options: <ul><li>es (Spanish)</li><li>en (English)</li><li>pt (Portuguese)</li><li>fil (Filipino)</li><li>id (Indonesian)</li><li>ms (Malay)</li><li>th (Thai)</li><li>zh-TW (Chinese (Traditional, Taiwan))</li><li>zh-CN (Chinese (Simplified, China))</li><li>vi (Vietnamese)</li><li>fr (French)</li><li>pl (Polish)</li><li>it (Italian)</li><li>de (German)</li><li>ru (Russian)</li><li>tr (Turkish)</li><li>nl (Dutch)</li><li>sv (Swedish)</li><li>ko (Korean)</li><li>ja (Japanese)</li></ul> |
| `viewController`                                                    | This property represents the `UIViewController` used to present the payment flow. Even though the property remains optional for backward compatibility, you must supply a visible controller so the SDK can present its UI correctly.                                                                                                                                                                                                                                                                                                                                                                          |
| `yunoCreatePayment(with token: String)`                             | This method is responsible for creating a payment with the provided token. It takes a String parameter called `token`, which represents the payment token.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `yunoCreatePayment(with token: String, information: [String: Any])` | This method is responsible for creating a payment with the provided token. It takes a String parameter called `token`, representing the payment token. Additionally, it returns all the token response info in a dictionary.                                                                                                                                                                                                                                                                                                                                                                                  |
| `yunoPaymentResult(_ result: Yuno.Result)`                          | This method is called when the payment process is completed, providing the result of the payment as a parameter of type `Yuno.Result`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

> 🚧 Important Note
>
> You can call `yunoCreatePayment` with or without the `information` parameter based on your needs. However, use only one version in your code, as calling both is not required and may cause issues.

> 🚧 Swift 6 Concurrency Requirements
>
> If you're using Swift 6, you'll need to implement the `YunoPaymentDelegate` protocol with specific concurrency considerations. Swift 6 introduces stricter thread safety requirements that affect how you implement delegates. See the [Implementing `YunoPaymentDelegate` with Swift 6 Concurrency](#implementing-yunopaymentdelegate-with-swift-6-concurrency) section for detailed implementation options and best practices.

## Step 4: Initiate the payment process

To effectively start a payment after displaying the payment methods, you have to call the method `startPaymentLite`, as presented in the code snippet below:

```swift
startPaymentLite(
    with: YunoPaymentDelegate,
    paymentSelected: PaymentMethodSelected,
    showPaymentStatus: Bool
)
```

For the Lite checkout version, you need to send an additional parameter, which can be the vaulted token and/or the payment method the customer will use to make the payment.

```swift
protocol PaymentMethodSelected {
    var vaultedToken: String? { get }
    var paymentMethodType: String { get }
}

startPaymentLite(with: self, paymentSelected: paymentSelected)
```

## Step 5: Get the OTT (one-time token)

You can obtain the one-time token to create the payment back-to-back at the end of this process. You will get the one-time token in the function `yunoCreatePayment()` that you get when implementing the `YunoPaymentDelegate`. An example of retrieving the one-time token is presented below:

```swift
func yunoCreatePayment(with token: String) { ... }
```

## Step 6: Create the Payment

Once you have completed the steps described before, you can create a payment. The back-to-back payment creation must be carried out using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant should call their backend to create the payment within Yuno, using the one-time token and the checkout session.

> 🚧 Continue Method
>
> Yuno **requires** you integrate the `continuePayment` method of the SDK after the payment is created because certain asynchronous payment methods require additional action from the customer to complete it. The API will inform you of this scenario via the `sdk_action_required` field of the response, which will be returned as true. The `yuno.continuePayment()` function will display the additional screens to the customers, where they can carry out the necessary actions to complete the payment without needing you to handle every scenario.

```swift
Yuno.continuePayment()
```

## Step 7: Handle Payment Status (Optional)

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

  return Yuno.receiveDeeplink(url)
}
```

This code listens for deep links that open your app. When a URL is received, it checks if the scheme matches the one you used in the `callback_url` during checkout session setup. If it matches, the URL is passed to the Yuno SDK using `Yuno.receiveDeeplink(...)`. The SDK then reads the payment result and shows the appropriate status screen to the user.

Make sure the `url.scheme` in this code matches the `callback_url` you provided when creating the `checkout_session`.

> 📘 Click to Pay
>
> For Click to Pay support, follow the dedicated [Click to Pay SDK integration](doc:click-to-pay#sdk-integration) guide in the Wallets section.

## Callback

The SDK returns different transaction states after payment completion. The following table describes each state:

| Transaction state | Description                                                                                                                                                                                                                                    |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `success`         | Indicates that the transaction or payment process has been completed successfully.                                                                                                                                                             |
| `fail`            | This state indicates that the transaction or payment process has failed. It means that there was an error or issue during the payment process, preventing it from being completed successfully.                                                |
| `processing`      | Indicates that the transaction or payment process is currently being processed. It is typically used when there is a delay in processing the payment, such as waiting for approval from a third-party service or financial institution.        |
| `reject`          | This state indicates that the transaction has been rejected. The rejection can occur for various reasons, such as insufficient funds, fraudulent activity, or a request that violates specific rules or policies.                              |
| `internalError`   | It means that an unexpected error occurred within the system or infrastructure handling the payment process. This state suggests that there was a problem on the server or backend side rather than an issue with the user's input or request. |
| `userCancell`     | This state indicates that the user has voluntarily canceled or aborted the transaction or payment process. This state is typically used when there is an option for the user to cancel or abandon the payment process.                         |

Implement the delegate to receive transaction states:

```swift
enum Result {
    case reject, success, fail, processing, internalError, userCancell
}

func yunoPaymentResult(_ result: Yuno.Result) { ... }
func yunoEnrollmentResult(_ result: Yuno.Result) { ... }
```

## Complementary Features

The Yuno iOS SDK provides additional features to enhance the customer experience. Use [SDK Customizations](../docs/sdk-customizations-ios) to match your brand appearance or configure the loader.

* **Loader**: Control the use of the loader through the SDK configuration options.
* **Save card for future payments**: In addition, you can display a checkbox for save or enroll cards using `cardSaveEnable: true`. Below, you can find examples of the checkbox for both card form renders.

<Image align="center" border={false} src="https://files.readme.io/89c94f120736a724c6b46a05f82ee8b95d3e892046d11a119635f5ab0d1d59a4-Card___save_for_future_payments.png" />

* You also can choose one of the render options for the card form. Below, you find screenshots presenting the difference between the `cardFormType` `ONE_STEP` and `STEP_BY_STEP`.

<Image align="center" border={false} src="https://files.readme.io/602fa6e31d55d6e71826ec7b429fc6842e06b3cccbf2d00339e485f97d97a841-Full_SDK_ios.png" />

* [SDK Customizations](../docs/sdk-customizations-ios): Change the SDK appearance to match your brand.

## Render mode integration

The render mode in the Yuno SDK offers enhanced UI flexibility, enabling developers to integrate payment flows with complete control over the user interface while retaining full SDK functionality. This mode provides SwiftUI views that can be seamlessly incorporated into your existing UI.

### Main function: `startPaymentRenderFlow`

The `startPaymentRender` function is a feature of the Yuno SDK that allows merchants to integrate the payment process in a more detailed and customizable manner. This function grants full control over when and how payment forms are displayed, facilitating smoother integration with the merchant's existing application UI.

#### Purpose

This function is designed to offer greater control over the payment flow, allowing merchants to:

* Integrate payment forms in a customized manner within their own UI.
* Precisely control when payment data forms are displayed.
* Gain detailed control over the payment confirmation process.
* Provide a more fluid and consistent user experience within the merchant's application.

#### Syntax

The syntax section provides the method signature for the `startPaymentRender` function. This function is central to integrating the payment process within your application, offering a customizable and detailed approach to handling payment forms and flows.

```swift
@MainActor static func startPaymentRenderFlow(
    paymentMethodSelected: PaymentMethodSelected,
    with delegate: YunoPaymentDelegate
) async -> some YunoPaymentRenderFlowProtocol
```

Parameters

The `startPaymentRender` function requires specific parameters to operate effectively. These parameters are essential for defining the payment method and handling the payment process responses.

| Parameter               | Type                    | Description                                                                                                      |
| ----------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `paymentMethodSelected` | `PaymentMethodSelected` | The payment method selected by the user. Must include the `vaultedToken` (if exists) and the `paymentMethodType` |
| `delegate`              | `YunoPaymentDelegate`   | The delegate that will handle payment process responses, including token creation and final result               |

#### Return value

Returns an instance that conforms to `YunoPaymentRenderFlowProtocol`, which provides methods to handle the payment rendering flow.

### YunoPaymentRenderFlowProtocol protocol

The instance returned by `startPaymentRender` conforms to this protocol which includes the following methods:

#### formView(paymentMethodSelected:with:)

```swift
func formView(
    paymentMethodSelected: PaymentMethodSelected,
    with delegate: YunoPaymentDelegate
) async -> AnyView?
```

* **Purpose**: Gets the form view to capture payment data
* **Behavior**:
  * If the payment method requires showing a form, returns an `AnyView` with the corresponding form
  * If the payment method doesn't need to show any form (e.g., already configured methods), returns `nil`
* **When to use**: Call immediately after creating the payment flow instance

#### submitForm()

```swift
func submitForm()
```

* **Purpose**: Submits form data for validation
* **Behavior**: Executes all necessary validations and, if successful, proceeds to generate a new one-time token
* **When to use**: When the user executes the "pay" action in the merchant's application

#### continuePayment()

```swift
func continuePayment() async -> AnyView?
```

* **Purpose**: Continues the payment process after the one-time token has been generated
* **Behavior**:
  i. If it's necessary to show any additional view (e.g., 3DS authentication), returns an `AnyView`
  ii. If no additional view is required, returns `nil`
* **When to use**: After receiving the one-time token through the delegate and creating the payment

### Implementation flow

This section outlines the sequence of steps required to implement the payment rendering process using the Yuno SDK.

#### Step 1: Initial setup

To begin using `startPaymentRender`, make sure the SDK is properly initialized and you possess a valid `checkoutSession`. Follow the steps below to set up your environment:

```swift
await Yuno.initialize(apiKey: "your_api_key")
```

#### Step 2: Create payment flow instance

Create a payment flow instance to manage and render the payment process using the selected method.

```swift
let paymentFlow = await Yuno.startPaymentRenderFlow(
    paymentMethodSelected: selectedPaymentMethod,
    with: self
)
```

#### Step 3: Get and display the form

Retrieve and present the payment form to collect user payment information efficiently.

```swift
let formView = await paymentFlow.formView(
    paymentMethodSelected: selectedPaymentMethod,
    with: self
)

if let formView = formView {
    VStack {
        Text("Payment Information")

        formView

        Button("Pay") {
            paymentFlow.submitForm()
        }
    }
} else {
    paymentFlow.submitForm()
}
```

#### Step 4: Handle the one time token

Implement the delegate method to receive the token:

```swift
extension MyViewController: YunoPaymentDelegate {
    var checkoutSession: String {
        return "your_checkout_session"
    }

    var countryCode: String {
        return "CO"
    }

    var viewController: UIViewController? {
        return self
    }

    func yunoCreatePayment(with token: String, information: [String: Any]) {
        createPaymentInBackend(token: token) { [weak self] success in
            if success {
                Task {
                    let additionalView = await self?.paymentFlow?.continuePayment()
                    if let additionalView = additionalView {
                        self?.showAdditionalView(additionalView)
                    }
                }
            }
        }
    }

    func yunoPaymentResult(_ result: Yuno.Result) {
        switch result {
        case .succeeded:
            showSuccessMessage()
        case .reject:
            showRejectionMessage()
        case .fail:
            showErrorMessage()
        case .processing:
            showProcessingMessage()
        case .userCancell:
            handleCancellation()
        case .internalError:
            showInternalErrorMessage()
        }
    }
}
```

### Complete example

```swift
import SwiftUI
import YunoSDK

struct PaymentRenderView: View {
    @State private var paymentFlow: YunoPaymentRenderFlowProtocol?
    @State private var formView: AnyView?
    @State private var additionalView: AnyView?

    let selectedPaymentMethod: PaymentMethodSelected
    let delegate: YunoPaymentDelegate

    var body: some View {
        VStack(spacing: 20) {
            Text("Complete Purchase")
                .font(.title2)
                .fontWeight(.bold)

            OrderSummaryView()

            if let formView = formView {
                VStack(alignment: .leading) {
                    Text("Payment Information")
                        .font(.headline)

                    formView
                }
            }

            if let additionalView = additionalView {
                additionalView
            }

            Spacer()

            Button(action: {
                paymentFlow?.submitForm()
            }) {
                Text("Confirm Payment")
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .cornerRadius(10)
            }
        }
        .padding()
        .onAppear {
            setupPaymentFlow()
        }
    }

    private func setupPaymentFlow() {
paymentFlow = await Yuno.startPaymentRenderFlow(
    paymentMethodSelected: selectedPaymentMethod,
    with: delegate
)

        Task {
            formView = await paymentFlow?.formView(
                paymentMethodSelected: selectedPaymentMethod,
                with: delegate
            )
        }
    }
}

class PaymentDelegate: YunoPaymentDelegate {
    let checkoutSession: String
    let countryCode: String
    weak var viewController: UIViewController?

    init(checkoutSession: String, countryCode: String, viewController: UIViewController?) {
        self.checkoutSession = checkoutSession
        self.countryCode = countryCode
        self.viewController = viewController
    }

    func yunoCreatePayment(with token: String, information: [String: Any]) {
        PaymentService.createPayment(token: token) { [weak self] result in
            switch result {
            case .success:
                Task {
                    await self?.continuePaymentProcess()
                }
            case .failure(let error):
                print("Error creating payment: \(error)")
            }
        }
    }

    func yunoPaymentResult(_ result: Yuno.Result) {
        DispatchQueue.main.async {
            switch result {
            case .succeeded:
                NotificationCenter.default.post(name: .paymentSucceeded, object: nil)
            case .reject:
                NotificationCenter.default.post(name: .paymentRejected, object: nil)
            }
        }
    }

    private func continuePaymentProcess() async {
    }
}
```

### Common use cases

This section outlines typical scenarios where the Yuno SDK can be utilized to handle various payment methods, providing flexibility and ease of integration.

#### 1. Credit card payment

In this use case, we demonstrate how to process payments using new credit card information, requiring the user to fill out a form to capture the necessary card details.

```swift
let cardPayment = CardPaymentMethod(paymentMethodType: "CARD")
let flow = Yuno.startPaymentRender(paymentMethodSelected: cardPayment, with: delegate)

let form = await flow.formView(paymentMethodSelected: cardPayment, with: delegate)
```

#### 2. Payment with saved method

This scenario demonstrates using a saved payment method, allowing users to pay without re-entering details by utilizing a vaulted token.

```swift
let savedCard = SavedCardPayment(
    paymentMethodType: "CARD",
    vaultedToken: "saved_token_123"
)
let flow = Yuno.startPaymentRender(paymentMethodSelected: savedCard, with: delegate)

let form = await flow.formView(paymentMethodSelected: savedCard, with: delegate)
```

#### 3. Payment with 3DS authentication

3D Secure (3DS) adds an extra verification step for enhanced security. The Yuno SDK integrates this process into your payment flow seamlessly.

```swift
func yunoCreatePayment(with token: String, information: [String: Any]) {
    createPayment(token: token) { [weak self] success in
        if success {
            Task {
                let authView = await self?.paymentFlow?.continuePayment()
                if let authView = authView {
                    self?.show3DSView(authView)
                }
            }
        }
    }
}
```

### Important considerations

This section highlights key points for integrating the Yuno SDK effectively, ensuring a seamless and secure payment process.

#### Prerequisites

* Ensure the SDK is initialized before using `startPaymentRender`
* The delegate must implement all required methods of `YunoPaymentDelegate`
* The `checkoutSession` must be valid and active

#### State management

* Always check if `formView()` returns `nil` before displaying the view
* Properly handle the case where `continuePayment()` returns `nil`
* Implement loading states during asynchronous operations

#### Security

* Never store one-time tokens - use them immediately
* Always validate payment results in your backend
* Implement appropriate timeouts for network operations

#### Performance

* Calls to `formView()` and `continuePayment()` are asynchronous
* Consider showing loading indicators during these operations
* Reuse the payment flow instance when possible

### Troubleshooting

This section offers quick solutions to common issues encountered during Yuno SDK integration, ensuring a smoother payment process.

#### Common issues

1. **`formView()`always returns`nil`**

   * Verify that the selected payment method requires a form
   * Ensure the SDK is initialized correctly

2. **Delegate doesn't receive`yunoCreatePayment`**

   * Verify that `submitForm()` is being called correctly
   * Confirm that the form has valid data

3. **`continuePayment()`doesn't return view when expected**
   * Some payment methods don't require additional views
   * Check the payment method configuration in your Yuno dashboard

#### Debugging logs

```swift
Yuno.config.environment = .staging
```

### Migration from other methods

If you're migrating from `startPayment()` or `startPaymentLite()`:

```swift
Yuno.startPayment()

let flow = Yuno.startPaymentRender(paymentMethodSelected: method, with: delegate)
let form = await flow.formView(paymentMethodSelected: method, with: delegate)
```

The primary benefit of using the new method is the detailed control it provides over both the user interface and the payment process.

> 📘 Demo app
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

* It would force all implementations to be `MainActor`-compatible
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

#### Option 3: For non-`MainActor` classes

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
