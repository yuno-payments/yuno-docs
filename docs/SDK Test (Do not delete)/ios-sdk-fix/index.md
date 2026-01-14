---
title: iOS SDK Fix
deprecated: false
hidden: true
metadata:
  robots: index
---
## Install

**Option 1: CocoaPods**

Add to your `Podfile`:

```ruby
pod 'YunoSDK', '~> 1.1.22'
```

```bash
pod install
```

**Option 2: Swift Package Manager**

In Xcode: File → Add Package Dependencies

```
https://github.com/yuno-payments/yuno-sdk-ios
```

Or add to your `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/yuno-payments/yuno-sdk-ios.git", .upToNextMajor(from: "1.1.17"))
]
```

> 📘 Requirements: iOS 14.0+, Swift 5.7+

## Initialize

**AppDelegate.swift or App struct:**

```swift
import YunoSDK

// In AppDelegate
func application(_ application: UIApplication, didFinishLaunchingWithOptions...) -> Bool {
    Yuno.initialize(
        apiKey: "PUBLIC_API_KEY",
        config: YunoConfig(),
        callback: { 
            // Initialization complete
        }
    )
    return true
}

// Or in SwiftUI App struct
init() {
    Yuno.initialize(
        apiKey: "PUBLIC_API_KEY",
        config: YunoConfig(),
        callback: { 
            // Initialization complete
        }
    )
}
```

> 🚧 UISceneDelegate Usage
>
> If your app uses a `UISceneDelegate`, place your Yuno initialization code within your `SceneDelegate`.

> 📘 Access Your API Key
>
> Retrieve your API Key from the [Developers section](doc:developers-credentials) in the Yuno Dashboard.

### Configuration Options

Customize the SDK appearance and behavior using `YunoConfig`:

```swift
let config = YunoConfig(
    cardFormType: .oneStep,      // or .multiStep
    appearance: customAppearance,
    saveCardEnabled: true,
    keepLoader: false,
    localizableBundle: nil
)

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: config,
    callback: {
        print("SDK initialized")
    }
)
```

| Parameter           | Type              | Default      | Description                                                               |
| ------------------- | ----------------- | ------------ | ------------------------------------------------------------------------- |
| `cardFormType`      | `CardFormType`    | `.oneStep`   | Card form flow type. Options: `.oneStep` or `.multiStep`.                 |
| `appearance`        | `Yuno.Appearance` | Yuno default | Custom appearance configuration for the SDK UI.                           |
| `saveCardEnabled`   | `Bool`            | `false`      | When `true`, displays a "Save card" checkbox during payment.              |
| `keepLoader`        | `Bool`            | `false`      | When `true`, you must manually call `hideLoader()` to dismiss the loader. |
| `localizableBundle` | `Bundle?`         | `nil`        | Custom bundle for localization strings.                                   |

## Basic Payment Flow

### SwiftUI Example

```swift
import SwiftUI
import YunoSDK

struct PaymentView: View {
    @State private var showPayment = false
    @StateObject private var viewModel = PaymentViewModel()
    
    var body: some View {
        VStack {
            Text("Total: $25.00")
                .font(.title)
            
            Button("Pay Now") {
                Task {
                    await viewModel.startPayment()
                }
            }
        }
        .task {
            await viewModel.initialize()
        }
    }
}

@MainActor
class PaymentViewModel: ObservableObject, YunoPaymentFullDelegate {
    private var _checkoutSession: String = ""
    private var _countryCode: String = "US"
    private var paymentMethodsView: UIView?
    
    // YunoPaymentFullDelegate required properties
    var checkoutSession: String { _checkoutSession }
    var countryCode: String { _countryCode }
    var language: String? { "en" }
    var viewController: UIViewController? { nil }
    
    func initialize() async {
        // Create checkout session on backend
        let session = await createCheckoutSession()
        _checkoutSession = session.checkoutSession
        
        // Get payment methods view from SDK
        paymentMethodsView = await Yuno.getPaymentMethodViewAsync(delegate: self)
        
        // Add view to your UI hierarchy (in SwiftUI, use UIViewRepresentable)
    }
    
    func startPayment() async {
        // Start payment - SDK reads session from delegate properties
        Yuno.startPayment()
    }
    
    // YunoPaymentFullDelegate methods
    func yunoCreatePayment(with token: String, information: [String: Any]) {
        Task {
            await createPayment(token: token)
            Yuno.continuePayment()
        }
    }
    
    func yunoPaymentResult(_ result: Yuno.Result) {
        switch result.status {
        case .succeeded:
            print("Payment succeeded")
        case .fail:
            print("Payment failed")
        case .reject:
            print("Payment was rejected")
        case .processing:
            print("Payment is processing")
        case .internalError:
            print("Internal error occurred")
        case .userCancelled:
            print("User cancelled payment")
        }
    }
    
    func yunoUpdatePaymentMethodsViewHeight(_ height: CGFloat) {
        // Called when payment methods view height changes
        print("Payment methods view height:", height)
    }
    
    func yunoDidSelect(paymentMethod: PaymentMethodSelected) {
        // Called when user selects a payment method
        print("Selected payment method:", paymentMethod)
    }
    
    func yunoDidUnenrollSuccessfully(_ success: Bool) {
        // Called when a payment method is unenrolled
        print("Unenroll success:", success)
    }
}

func createCheckoutSession() async -> CheckoutSession {
    // Call your backend
    let response = try? await URLSession.shared.data(from: URL(string: "https://api.example.com/checkout")!)
    return try! JSONDecoder().decode(CheckoutSession.self, from: response!.0)
}
```

### UIKit Example

```swift
import UIKit
import YunoSDK

class PaymentViewController: UIViewController, YunoPaymentFullDelegate {
    private var _checkoutSession: String = ""
    private var paymentMethodsView: UIView?
    
    // YunoPaymentFullDelegate required properties
    var checkoutSession: String { _checkoutSession }
    var countryCode: String { "US" }
    var language: String? { "en" }
    var viewController: UIViewController? { self }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        Task {
            // 1. Create session on backend
            let session = await createCheckoutSession()
            _checkoutSession = session.checkoutSession
            
            // 2. Get payment methods view from SDK
            paymentMethodsView = await Yuno.getPaymentMethodViewAsync(delegate: self)
            
            // 3. Add payment methods view to hierarchy
            if let methodsView = paymentMethodsView {
                methodsView.translatesAutoresizingMaskIntoConstraints = false
                view.addSubview(methodsView)
                NSLayoutConstraint.activate([
                    methodsView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
                    methodsView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
                    methodsView.trailingAnchor.constraint(equalTo: view.trailingAnchor)
                ])
            }
            
            // 4. Add pay button
            let payButton = UIButton(type: .system)
            payButton.setTitle("Pay Now", for: .normal)
            payButton.addTarget(self, action: #selector(payButtonTapped), for: .touchUpInside)
            payButton.translatesAutoresizingMaskIntoConstraints = false
            view.addSubview(payButton)
            NSLayoutConstraint.activate([
                payButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -20),
                payButton.centerXAnchor.constraint(equalTo: view.centerXAnchor)
            ])
        }
    }
    
    @objc func payButtonTapped() {
        // Start payment - SDK reads session from delegate properties
        Yuno.startPayment()
    }
    
    // YunoPaymentFullDelegate methods
    func yunoCreatePayment(with token: String, information: [String: Any]) {
        Task {
            await createPayment(token: token, checkoutSession: _checkoutSession)
            Yuno.continuePayment()
        }
    }
    
    func yunoPaymentResult(_ result: Yuno.Result) {
        switch result.status {
        case .succeeded:
            navigationController?.pushViewController(SuccessViewController(), animated: true)
        case .fail:
            showAlert(message: "Payment failed")
        case .reject:
            showAlert(message: "Payment was rejected")
        case .processing:
            showAlert(message: "Payment is processing")
        case .internalError:
            showAlert(message: "An error occurred")
        case .userCancelled:
            // User cancelled - no action needed
            break
        }
    }
    
    func yunoUpdatePaymentMethodsViewHeight(_ height: CGFloat) {
        // Called when payment methods view height changes
        // Update constraints if needed
        print("Payment methods view height:", height)
    }
    
    func yunoDidSelect(paymentMethod: PaymentMethodSelected) {
        // Called when user selects a payment method
        print("Selected payment method:", paymentMethod)
    }
    
    func yunoDidUnenrollSuccessfully(_ success: Bool) {
        // Called when a payment method is unenrolled
        print("Unenroll success:", success)
    }
}
```

## Handling Payment Results

The SDK returns the payment result through the `yunoPaymentResult(_:)` delegate method:

```swift
func yunoPaymentResult(_ result: Yuno.Result) {
    switch result.status {
    case .succeeded:
        print("Payment succeeded")
        navigateToSuccess()
    case .fail:
        print("Payment failed")
        showError("Payment failed")
    case .processing:
        print("Payment is processing")
        showPendingMessage()
    case .reject:
        print("Payment was rejected")
        showError("Payment was rejected")
    case .internalError:
        print("Internal error occurred")
        showError("An error occurred")
    case .userCancelled:
        print("User canceled payment")
        // Handle cancellation
        break
    }
}
```

### Payment States

| State           | Description                                                    | Action Required                       |
| --------------- | -------------------------------------------------------------- | ------------------------------------- |
| `succeeded`     | Payment completed successfully                                 | No                                    |
| `fail`          | Payment failed due to validation, network, or technical issues | Yes - Investigate and retry           |
| `processing`    | Payment in progress, awaiting approval                         | No                                    |
| `reject`        | Payment rejected (insufficient funds, fraud detection, etc.)   | Yes - Inform user and suggest actions |
| `internalError` | Unexpected internal error occurred                             | Yes - Technical intervention required |
| `userCancelled` | User canceled the payment                                      | No                                    |

### Payment Status Validation

#### Sync Payment Methods (Apple Pay)

For synchronous payment methods like Apple Pay, when a user cancels before PSP response:

* **SDK Status**: Returns `userCancelled`
* **Backend Payment Status**: Remains `PENDING` until PSP timeout or merchant cancellation
* **Important**: The SDK will not return `reject` or `processing` in this scenario

#### Async Payment Methods (PIX, QR codes)

For asynchronous payment methods like PIX, when a user closes the QR window:

* **SDK Status**: Returns `processing`, optionally with sub-status
* **Backend Payment Status**: Remains `PENDING` and QR code remains valid until expiry
* **Checkout Session Reuse**: Re-opening the same session can display the same valid QR code
* **No Automatic Cancellation**: Payment is not automatically canceled

## 3DS Authentication

3DS is handled automatically by the SDK. After creating the payment on your backend, call `continuePayment()`:

```swift
func yunoCreatePayment(with token: String, information: [String: Any]) {
    Task {
        await createPayment(token: token)
        
        // continuePayment() handles 3DS and other required actions
        Yuno.continuePayment()
    }
}
```

> 🚧 ContinuePayment Method Required
>
> Yuno **requires** you integrate the `continuePayment()` method after the payment is created because certain asynchronous payment methods require additional customer action to complete. The API will inform you via the `sdk_action_required` field (set to `true`). The `continuePayment()` function will display additional screens to customers where they can complete the payment.

## Deep Link Handling

Some payment methods take users out of your app to complete the transaction. Once the payment is finished, the user is redirected back using a deep link. Update your `AppDelegate` to pass the incoming URL to the Yuno SDK:

```swift
func application(_ app: UIApplication,
                 open url: URL,
                 options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {

    guard url.scheme == "yunoexample" else { return false }

    return Yuno.receiveDeeplink(url)
}
```

Make sure the `url.scheme` matches the `callback_url` you provided when creating the `checkout_session`.

## Appearance Customization

Customize SDK appearance using `Yuno.Appearance`:

```swift
let appearance = Yuno.Appearance(
    fontFamily: "SF Pro Display",
    accentColor: UIColor.systemBlue,
    buttonBackgroundColor: UIColor.systemBlue,
    buttonTitleColor: UIColor.white,
    buttonBorderColor: UIColor.systemBlue,
    secondaryButtonBackgroundColor: UIColor.systemGray6,
    secondaryButtonTitleColor: UIColor.label,
    secondaryButtonBorderColor: UIColor.systemGray4,
    disableButtonBackgroundColor: UIColor.systemGray4,
    disableButtonTitleColor: UIColor.systemGray
)

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: YunoConfig(appearance: appearance)
)
```

| Field                            | Description                                            |
| -------------------------------- | ------------------------------------------------------ |
| `fontFamily`                     | Specifies the font family used in the SDK.             |
| `accentColor`                    | Defines the accent color used in several SDK elements. |
| `buttonBackgroundColor`          | Sets the background color for the primary buttons.     |
| `buttonTitleColor`               | Determines the text color for the primary buttons.     |
| `buttonBorderColor`              | Specifies the border color for the primary buttons.    |
| `secondaryButtonBackgroundColor` | Sets the background color for the secondary buttons.   |
| `secondaryButtonTitleColor`      | Determines the text color for the secondary buttons.   |
| `secondaryButtonBorderColor`     | Specifies the border color for the secondary buttons.  |
| `disableButtonBackgroundColor`   | Sets the background color for the disabled buttons.    |
| `disableButtonTitleColor`        | Determines the text color for the disabled buttons.    |
| `checkboxColor`                  | Sets the color for checkboxes.                         |

> 📘 Color Configuration
>
> Ensure all colors are specified as UIColor to maintain compatibility.

## Supported Languages

| Code    | Language              |
| ------- | --------------------- |
| `en`    | English               |
| `es`    | Spanish               |
| `pt`    | Portuguese            |
| `fr`    | French                |
| `it`    | Italian               |
| `de`    | German                |
| `pl`    | Polish                |
| `ru`    | Russian               |
| `tr`    | Turkish               |
| `nl`    | Dutch                 |
| `sv`    | Swedish               |
| `ko`    | Korean                |
| `ja`    | Japanese              |
| `zh-CN` | Chinese (Simplified)  |
| `zh-TW` | Chinese (Traditional) |
| `vi`    | Vietnamese            |
| `th`    | Thai                  |
| `ms`    | Malay                 |
| `id`    | Indonesian            |
| `fil`   | Filipino              |

When not specified, the SDK uses the device's default language if supported, otherwise falls back to English.

## Next Steps

Ready to explore more advanced features? Check out the [Advanced Features](doc:advanced-features-ios-sdk) guide for:

* **Alternative Payment Flows** - `startPaymentLite()` and `startPaymentSeamlessLite()` for custom payment method selection
* **Enrollment (Save Cards)** - Save payment methods for future use
* **Vaulted Token Payments** - One-click payments with saved cards
* **Custom UI (Headless Integration)** - Build completely custom payment forms
* **Render Mode Integration** - Display payment form within your custom view
* **Swift 6 Concurrency** - Handle concurrency warnings with proper annotations

See also:

* [Code Examples](doc:code-examples-ios-sdk) - Copy-paste examples for common scenarios
* [Release Notes](doc:release-notes-ios-sdk) - SDK versions, changes, and migration guides

## Demo Application

Yuno provides an example project showcasing iOS SDK integration. You can access the [project repository](https://github.com/yuno-payments/yuno-sdk-ios) or [download the project](https://github.com/yuno-payments/yuno-sdk-ios/archive/refs/heads/main.zip).
