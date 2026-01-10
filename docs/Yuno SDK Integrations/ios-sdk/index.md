---
title: iOS SDK
deprecated: false
hidden: false
metadata:
  robots: index
---
## Install

**Option 1: CocoaPods**

Add to your `Podfile`:

```ruby
pod 'YunoSDK'
```

```bash
pod install
```

**Option 2: Swift Package Manager**

In Xcode: File → Add Package Dependencies

```
https://github.com/yuno-payments/yuno-sdk-ios
```

> 📘 Requirements: iOS 14.0+, Swift 5.7+

## Initialize

**AppDelegate.swift or App struct:**

```swift
import YunoSDK

// In AppDelegate
func application(_ application: UIApplication, didFinishLaunchingWithOptions...) -> Bool {
    Yuno.initialize(apiKey: "your-public-api-key")
    return true
}

// Or in SwiftUI App struct
init() {
    Yuno.initialize(apiKey: "your-public-api-key")
}
```

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
            Yuno.continuePayment(showPaymentStatus: true)
        }
    }
    
    func yunoPaymentResult(_ result: Yuno.Result) {
        switch result {
        case .success:
            print("Payment succeeded")
        case .failure(let error):
            print("Payment failed:", error)
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
            Yuno.continuePayment(showPaymentStatus: true)
        }
    }
    
    func yunoPaymentResult(_ result: Yuno.Result) {
        switch result {
        case .success:
            navigationController?.pushViewController(SuccessViewController(), animated: true)
        case .failure(let error):
            showAlert(message: "Payment failed: \(error.localizedDescription)")
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
}
```

## Handling Payment Results

```swift
func yunoPaymentResult(_ result: Yuno.Result) {
    switch result {
    case .success(let data):
        switch data.status {
        case "SUCCEEDED":
            navigateToSuccess()
        case "PENDING":
            showPendingMessage()
        default:
            break
        }
        
    case .failure(let error):
        switch error.code {
        case .cardDeclined:
            showError("Card was declined")
        case .insufficientFunds:
            showError("Insufficient funds")
        case .networkError:
            showError("Network error, please try again")
        default:
            showError("Payment failed: \(error.localizedDescription)")
        }
    }
}
```

## 3DS Authentication

3DS is handled automatically. For asynchronous payment methods:

```swift
func yunoCreatePayment(with token: String, information: [String: Any]) {
    Task {
        await createPayment(token: token)
        
        // Handle redirects if needed
        let result = await Yuno.continuePayment(showPaymentStatus: false)
        
        if let redirectURL = result?.redirectURL {
            // Open redirect URL
            UIApplication.shared.open(redirectURL)
        }
    }
}
```

## Configuration Options

### Essential Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `checkoutSession` | String | Session ID from backend |
| `countryCode` | String | ISO country code (e.g., 'US') |
| `language` | String? | Language code (e.g., 'en') |
| `viewController` | UIViewController? | For presenting payment UI (UIKit) |

### Card Configuration

```swift
let config = YunoConfig(
    checkoutSession: session.id,
    countryCode: "US",
    cardSaveEnable: true, // Show save checkbox
    cardFormType: .default, // or .extended
    allowedPaymentTypes: [.credit, .debit]
)
```

### Appearance

```swift
Yuno.Appearance.primaryColor = .systemBlue
Yuno.Appearance.backgroundColor = .systemBackground
Yuno.Appearance.font = .systemFont(ofSize: 16)
Yuno.Appearance.cornerRadius = 8.0
```

## Next Steps

Ready to explore more advanced features? Check out the [Advanced Features](doc:advanced-features-ios-sdk) guide for:

- **Alternative Mounting Options** - `startPaymentLite()` and `startPaymentSeamlessLite()` for custom payment method selection
- **Enrollment (Save Cards)** - Save payment methods for future use
- **Vaulted Token Payments** - One-click payments with saved cards
- **Custom UI (Headless Integration)** - Build completely custom payment forms
- **Render Mode Integration** - Display payment form within your custom view
- **Styling & Appearance** - Customize SDK appearance
- **Swift 6 Concurrency** - Handle concurrency warnings with proper annotations
- **ClearSale Integration** - Fraud prevention

See also:
- [Code Examples](doc:code-examples-ios-sdk) - Copy-paste examples for common scenarios
- [Release Notes](doc:release-notes-ios-sdk) - SDK versions, changes, and migration guides