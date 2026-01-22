---
title: iOS SDK Integration
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

> 📘 Requirements: iOS 13.0+, Swift 5.7+

## Initialize

**AppDelegate.swift or App struct:**

```swift
import YunoSDK

// In AppDelegate
func application(_ application: UIApplication, didFinishLaunchingWithOptions...) -> Bool {
    Yuno.initialize(publicKey: "your-public-api-key")
    return true
}

// Or in SwiftUI App struct
init() {
    Yuno.initialize(publicKey: "your-public-api-key")
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
class PaymentViewModel: ObservableObject, YunoPaymentDelegate {
    private var config: YunoConfig?
    
    func initialize() async {
        // Create checkout session on backend
        let session = await createCheckoutSession()
        
        // Configure payment
        self.config = YunoConfig(
            checkoutSession: session.checkoutSession,
            countryCode: "US",
            language: "en"
        )
    }
    
    func startPaymentFlow() async {
        guard let config = config else { return }
        
        // Start payment with SDK
        Yuno.startPayment(with: config, delegate: self)
    }
    
    // YunoPaymentDelegate methods
    func yunoCreatePayment(with token: String) {
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

class PaymentViewController: UIViewController, YunoPaymentDelegate {
    var checkoutSession: String?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let payButton = UIButton(type: .system)
        payButton.setTitle("Pay Now", for: .normal)
        payButton.addTarget(self, action: #selector(payButtonTapped), for: .touchUpInside)
        view.addSubview(payButton)
    }
    
    @objc func payButtonTapped() {
        Task {
            // Create session
            let session = await createCheckoutSession()
            self.checkoutSession = session.checkoutSession
            
            // Configure payment
            let config = YunoConfig(
                checkoutSession: session.checkoutSession,
                countryCode: "US",
                language: "en",
                viewController: self
            )
            
            // Start payment
            Yuno.startPayment(with: config, delegate: self)
        }
    }
    
    // YunoPaymentDelegate methods
    func yunoCreatePayment(with token: String) {
        Task {
            await createPayment(token: token, checkoutSession: self.checkoutSession!)
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
}
```

## Alternative Mounting Options

The basic flow above uses `Yuno.startPayment()` which handles the full payment flow automatically. For more control:

### Custom Payment Method Selection (`startPaymentLite`)

Select which payment method to display:

```swift
// 1. Fetch available methods
let methods = await fetchPaymentMethods(sessionId: checkoutSession)

// 2. Display in your UI
// 3. Start payment with selected method

Yuno.startPaymentLite(
    with: config,
    paymentMethodType: selectedMethod, // "CARD", "PIX", etc.
    vaultedToken: nil, // or saved token
    delegate: self
)
```

### Simplified Flow (`startPaymentSeamlessLite`)

Similar to Lite but with automatic payment creation:

```swift
Yuno.startPaymentSeamlessLite(
    with: config,
    paymentMethodType: "CARD",
    vaultedToken: nil,
    delegate: self
)
```

## Enrollment (Save Cards)

### Save During Payment

```swift
let config = YunoConfig(
    checkoutSession: session.id,
    countryCode: "US",
    cardSaveEnable: true // Show save card checkbox
)

Yuno.startPayment(with: config, delegate: self)

// In delegate:
func yunoCreatePayment(with token: String) {
    Task {
        await createPayment(
            token: token,
            vaultOnSuccess: true // Save after successful payment
        )
        Yuno.continuePayment(showPaymentStatus: true)
    }
}
```

### Separate Enrollment

```swift
// Create customer session on backend
let customerSession = await createCustomerSession(customerId: "cus_123")

// Configure enrollment
let config = YunoConfig(
    customerSession: customerSession.id,
    countryCode: "US"
)

// Conform to YunoEnrollmentDelegate
extension PaymentViewModel: YunoEnrollmentDelegate {
    func yunoEnrollmentStatus(status: Yuno.EnrollmentStatus, vaultedToken: String?) {
        if status == .successful, let token = vaultedToken {
            print("Card saved:", token)
        }
    }
}

// Start enrollment
Yuno.enrollPayment(with: config, delegate: self)
```

## Vaulted Token Payments

```swift
let config = YunoConfig(
    checkoutSession: session.id,
    countryCode: "US",
    vaultedToken: "vtok_saved_card_123"
)

Yuno.startPayment(with: config, delegate: self)
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
func yunoCreatePayment(with token: String) {
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

## Proguard Rules

Not applicable for iOS.
