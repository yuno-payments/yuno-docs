---
title: Advanced Features iOS SDK
deprecated: false
hidden: true
metadata:
  robots: index
---
Advanced configuration and custom integrations for iOS.

## Custom UI (Headless Integration)

Build completely custom payment forms with full UI control when you need complete control over every UI element, highly custom checkout experiences, or have development resources for custom UI.

```swift
import YunoSDK

class CustomPaymentVC: UIViewController {
    
    func processWithCustomUI() async {
        // 1. Initialize headless client
        let apiClient = Yuno.apiClientPayment(
            countryCode: "US",
            checkoutSession: "session_id"
        )
        
        // 2. Collect card data in your custom UI
        let cardData = CardData(
            number: "4111111111111111",
            expirationMonth: 12,
            expirationYear: 25,
            securityCode: "123",
            holderName: "John Doe",
            type: .credit
        )
        
        // 3. Generate token
        do {
            let result = try await apiClient.generateToken(data: TokenCollectedData(
                checkoutSession: "session_id",
                paymentMethod: CollectedData(
                    type: "CARD",
                    card: cardData
                )
            ))
            
            // 4. Create payment with token
            await createPayment(token: result.token)
            
            // 5. Handle continuation if needed
            if apiClient.shouldContinue {
                try await apiClient.continuePayment()
            }
        } catch {
            print("Error: \(error)")
        }
    }
}
```

### With Vaulted Token

```swift
let result = try await apiClient.generateToken(data: TokenCollectedData(
    checkoutSession: "session_id",
    paymentMethod: CollectedData(
        type: "CARD",
        vaultedToken: "saved_token_id",
        card: CardData(securityCode: "123")
    )
))
```

## Render Mode Integration

Display payment form within your custom view.

```swift
class PaymentViewController: UIViewController, YunoPaymentRenderFlowProtocol {
    
    func startRenderMode() async {
        let session = try await createCheckoutSession()
        
        let config = YunoConfig(
            checkoutSession: session.id,
            countryCode: "US"
        )
        
        Yuno.startPaymentRenderFlow(with: config, delegate: self)
    }
    
    // SDK provides view to embed
    func formView() -> UIView? {
        let containerView = UIView(frame: CGRect(x: 0, y: 0, width: 350, height: 500))
        containerView.backgroundColor = .systemBackground
        return containerView
    }
    
    // Handle form submission
    func submitForm() async {
        // Customer submitted payment form
    }
    
    // Handle result
    func yunoPaymentResult(_ result: PaymentResult) {
        if result.status == .succeeded {
            navigateToSuccess()
        }
    }
}
```

**SwiftUI:**

```swift
struct RenderModeView: View, YunoPaymentRenderFlowProtocol {
    @State private var paymentView: UIView?
    
    var body: some View {
        if let view = paymentView {
            PaymentViewWrapper(view: view)
                .frame(height: 500)
        }
    }
    
    func startPayment() async {
        let config = YunoConfig(checkoutSession: "session_id", countryCode: "US")
        await Yuno.startPaymentRenderFlow(with: config, delegate: self)
    }
    
    func formView() -> UIView? {
        let view = UIView()
        DispatchQueue.main.async {
            paymentView = view
        }
        return view
    }
}

struct PaymentViewWrapper: UIViewRepresentable {
    let view: UIView
    
    func makeUIView(context: Context) -> UIView { view }
    func updateUIView(_ uiView: UIView, context: Context) {}
}
```

## Styling & Appearance

Customize SDK appearance with `Yuno.Appearance`:

```swift
import YunoSDK

func configureAppearance() {
    var appearance = Yuno.Appearance()
    
    // Colors
    appearance.primaryColor = UIColor.systemBlue
    appearance.backgroundColor = UIColor.systemBackground
    appearance.textColor = UIColor.label
    appearance.errorColor = UIColor.systemRed
    
    // Typography
    appearance.fontFamily = "SF Pro Display"
    appearance.fontSize = 16
    
    // Corner radius
    appearance.cornerRadius = 12
    
    // Apply
    Yuno.setAppearance(appearance)
}
```

## Swift 6 Concurrency

Handle concurrency warnings with proper annotations:

```swift
@MainActor
class PaymentViewController: UIViewController, YunoPaymentDelegate {
    
    // Safe to call from any thread
    nonisolated func startPayment() {
        Task { @MainActor in
            let config = YunoConfig(...)
            Yuno.startPayment(with: config, delegate: self)
        }
    }
    
    // UI updates on main thread
    @MainActor
    func yunoPaymentResult(_ result: PaymentResult) {
        updateUI(result)
    }
}
```

**Non-isolated delegate:**

```swift
extension PaymentViewController {
    nonisolated func yunoPaymentResult(_ result: PaymentResult) {
        MainActor.assumeIsolated {
            // UI updates here
            self.showResult(result)
        }
    }
}
```

## ClearSale Integration

Enable fraud prevention:

**Install ClearSale SDK:**

```ruby
pod 'ClearSaleSDK'
```

**Initialize:**

```swift
import ClearSale

func application(_ application: UIApplication, 
                didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
    // Initialize ClearSale
    ClearSale.setup(apiKey: "your-clearsale-key")
    
    // Initialize Yuno
    Yuno.initialize(publicKey: "your-public-key")
    
    return true
}
```

ClearSale data is automatically collected and sent with payments.

## Custom Configuration

### Card Flow Types

```swift
let config = YunoConfig(
    checkoutSession: session.id,
    countryCode: "US",
    cardFlow: .oneStep // or .stepByStep
)
```

### Hide Cardholder Name

```swift
let config = YunoConfig(
    checkoutSession: session.id,
    countryCode: "US",
    hideCardholderName: true
)
```

### Show/Hide Status Screen

```swift
let config = YunoConfig(
    checkoutSession: session.id,
    countryCode: "US",
    showPaymentStatus: false // Handle result yourself
)
```

## Error Handling

```swift
func yunoPaymentResult(_ result: PaymentResult) {
    switch result.status {
    case .succeeded:
        handleSuccess(result)
    case .failed:
        handleFailure(result.error)
    case .pending:
        handlePending(result)
    case .rejected:
        handleRejection(result)
    }
}

func handleFailure(_ error: YunoError?) {
    guard let error = error else { return }
    
    switch error.code {
    case "SESSION_EXPIRED":
        // Recreate session
        Task { await createNewSession() }
    case "INVALID_CARD":
        showAlert("Please check your card details")
    case "INSUFFICIENT_FUNDS":
        showAlert("Insufficient funds")
    case "NETWORK_ERROR":
        showAlert("Connection error. Please try again.")
    default:
        showAlert("Payment failed: \(error.message)")
    }
}
```

## Webhooks

Verify payment status on backend:

```swift
// Backend receives webhook
POST /webhooks/yuno
{
  "type": "payment.succeeded",
  "data": {
    "payment_id": "pay_123",
    "status": "SUCCEEDED",
    "amount": 2500
  }
}
```

## Testing

### Test Mode

```swift
// Use test key
Yuno.initialize(publicKey: "pk_test_your_key")
```

### Debug Logging

```swift
// Enable logs in development
#if DEBUG
Yuno.setLogLevel(.verbose)
#endif
```

## Performance

### Preload SDK

```swift
// Preload in background
Task(priority: .background) {
    _ = Yuno.self
}
```

### Lazy Loading

```swift
// Load only when needed
lazy var yuno: Yuno = {
    Yuno.initialize(publicKey: "pk_test_key")
    return Yuno.shared
}()
```

