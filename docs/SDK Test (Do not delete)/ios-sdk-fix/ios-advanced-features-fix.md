---
title: iOS Advanced Features Fix
deprecated: false
hidden: true
metadata:
  robots: index
---
Advanced configuration and custom integrations for iOS.

## Alternative Payment Flows

The basic flow uses `Yuno.startPayment()` which handles the full payment flow automatically. For more control, use these alternatives:

### Custom Payment Method Selection (`startPaymentLite`)

Select which payment method to display. Your delegate must implement `YunoPaymentDelegate` with required properties:

```swift
class PaymentViewController: UIViewController, YunoPaymentDelegate {
    var checkoutSession: String { return _checkoutSession }
    var countryCode: String { "US" }
    var language: String? { "en" }
    var viewController: UIViewController? { self }
    
    private var _checkoutSession: String = ""
    
    func setupPayment() async {
        // 1. Create session
        let session = await createCheckoutSession()
        _checkoutSession = session.checkoutSession
        
        // 2. Fetch available methods
        let methods = await fetchPaymentMethods(sessionId: checkoutSession)
        
        // 3. Display in your UI, then start payment with selected method
        let paymentSelected = PaymentMethodSelected(
            paymentMethodType: "CARD", // User's selection
            vaultedToken: nil // Optional: for enrolled methods
        )
        
        Yuno.startPaymentLite(
            with: self,
            paymentSelected: paymentSelected,
            showPaymentStatus: true
        )
    }
    
    func yunoCreatePayment(with token: String) {
        Task {
            await createPayment(token: token)
            Yuno.continuePayment()
        }
    }
    
    func yunoPaymentResult(_ result: Yuno.Result) {
        switch result.status {
        case .succeeded:
            navigateToSuccess()
        case .fail, .reject, .internalError:
            showError("Payment failed")
        case .processing:
            showPendingMessage()
        case .userCancelled:
            break
        }
    }
}
```

### Simplified Flow (`startPaymentSeamlessLite`)

Similar to Lite but with automatic payment creation. Uses `SeamlessParams` instead of delegate properties:

```swift
let seamlessParams = SeamlessParams(
    checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
    countryCode: "BR",
    language: "en",
    viewController: self
)

let paymentSelected = PaymentMethodSelected(
    paymentMethodType: "CARD",
    vaultedToken: nil
)

// Using async/await
let result = await Yuno.startPaymentSeamlessLite(
    with: seamlessParams,
    paymentSelected: paymentSelected,
    showPaymentStatus: true
)

// Handle result
switch result.status {
case .succeeded:
    navigateToSuccess()
case .fail, .reject, .internalError:
    showError("Payment failed")
case .processing:
    showPendingMessage()
case .userCancelled:
    break
}
```

<Callout icon="📘" theme="info">


  The Seamless flow automatically handles payment creation on the backend. You still receive the payment result through the return value, but you don't need to call the Create Payment API manually.
</Callout>

## Enrollment (Save Cards)

### Save During Payment

Enable card saving during the payment flow by setting `saveCardEnabled` in `YunoConfig`:

```swift
let config = YunoConfig(
    cardFormType: .oneStep,
    saveCardEnabled: true
)

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: config,
    callback: { }
)
```

When enabled, a "Save card" checkbox appears in the card form during payment.

### Separate Enrollment

For enrolling payment methods without a payment, implement `YunoEnrollmentDelegate`:

```swift
class EnrollmentViewController: UIViewController, YunoEnrollmentDelegate {
    var customerSession: String { _customerSession }
    var countryCode: String { "US" }
    var language: String? { "en" }
    var viewController: UIViewController? { self }
    
    private var _customerSession: String = ""
    
    func setupEnrollment() async {
        // Create customer session on backend
        let session = await createCustomerSession(customerId: "cus_123")
        _customerSession = session.id
        
        // Start enrollment - SDK reads session from delegate
        Yuno.enrollPayment(with: self, showPaymentStatus: true)
    }
    
    func yunoEnrollmentResult(_ result: Yuno.Result) {
        switch result.status {
        case .succeeded:
            print("Card saved successfully")
        case .fail, .reject, .internalError:
            print("Enrollment failed")
        case .processing:
            print("Enrollment processing")
        case .userCancelled:
            print("User cancelled")
        }
    }
}
```

## Vaulted Token Payments

Use saved cards by providing the vaulted token to `startPaymentLite`:

```swift
class PaymentViewController: UIViewController, YunoPaymentDelegate {
    var checkoutSession: String { _checkoutSession }
    var countryCode: String { "US" }
    var language: String? { "en" }
    var viewController: UIViewController? { self }
    
    private var _checkoutSession: String = ""
    
    func payWithSavedCard(vaultedToken: String) {
        let paymentSelected = PaymentMethodSelected(
            paymentMethodType: "CARD",
            vaultedToken: vaultedToken
        )
        
        Yuno.startPaymentLite(
            with: self,
            paymentSelected: paymentSelected,
            showPaymentStatus: true
        )
    }
    
    func yunoCreatePayment(with token: String) {
        Task {
            await createPayment(token: token)
            Yuno.continuePayment()
        }
    }
    
    func yunoPaymentResult(_ result: Yuno.Result) {
        switch result.status {
        case .succeeded:
            navigateToSuccess()
        default:
            showError("Payment failed")
        }
    }
}
```

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
            save: true,
            detail: CardData.Detail(
                number: "4111111111111111",
                expirationMonth: 12,
                expirationYear: 25,
                securityCode: "123",
                holderName: "John Doe",
                type: .credit
            )
        )
        
        // 3. Generate token
        do {
            let tokenData = TokenCollectedData(
                checkoutSession: "session_id",
                paymentMethod: CollectedData(
                    type: "CARD",
                    vaultedToken: nil,
                    card: cardData
                )
            )
            
            let result = try await apiClient.generateToken(data: tokenData)
            
            // 4. Extract token from result and create payment
            if let token = result["token"] as? String {
                await createPayment(token: token)
            }
        } catch {
            print("Token generation failed: \(error)")
        }
    }
}
```

### With Vaulted Token

```swift
let tokenData = TokenCollectedData(
    checkoutSession: "session_id",
    paymentMethod: CollectedData(
        type: "CARD",
        vaultedToken: "saved_token_id",
        card: CardData(
            detail: CardData.Detail(securityCode: "123")
        )
    )
)

let result = try await apiClient.generateToken(data: tokenData)
```

## Render Mode Integration

Display payment form within your custom view while retaining SDK functionality:

```swift
class PaymentViewController: UIViewController, YunoPaymentDelegate {
    var checkoutSession: String { _checkoutSession }
    var countryCode: String { "US" }
    var language: String? { "en" }
    var viewController: UIViewController? { self }
    
    private var _checkoutSession: String = ""
    private var paymentFlow: YunoPaymentRenderFlowProtocol?
    
    func startRenderMode() async {
        let session = await createCheckoutSession()
        _checkoutSession = session.id
        
        let paymentSelected = PaymentMethodSelected(
            paymentMethodType: "CARD",
            vaultedToken: nil
        )
        
        // Create payment flow instance
        paymentFlow = await Yuno.startPaymentRenderFlow(
            paymentMethodSelected: paymentSelected,
            with: self
        )
        
        // Get and display the form
        if let formView = await paymentFlow?.formView(
            paymentMethodSelected: paymentSelected,
            with: self
        ) {
            // Add formView to your UI
            view.addSubview(formView)
        }
    }
    
    @IBAction func submitButtonTapped() {
        paymentFlow?.submitForm()
    }
    
    func yunoCreatePayment(with token: String, information: [String: Any]) {
        Task {
            await createPayment(token: token)
            
            // Display additional views (e.g., 3DS) if needed
            let additionalView = await paymentFlow?.continuePayment()
            if let additionalView = additionalView {
                // Display 3DS or additional verification views
            }
        }
    }
    
    func yunoPaymentResult(_ result: Yuno.Result) {
        switch result.status {
        case .succeeded:
            navigateToSuccess()
        default:
            showError("Payment failed")
        }
    }
}
```

**SwiftUI:**

```swift
struct RenderModeView: View {
    @State private var paymentView: UIView?
    @StateObject private var viewModel = RenderModeViewModel()
    
    var body: some View {
        VStack {
            if let view = paymentView {
                PaymentViewWrapper(view: view)
                    .frame(height: 500)
            }
            
            Button("Pay") {
                viewModel.submitForm()
            }
        }
        .task {
            paymentView = await viewModel.startPayment()
        }
    }
}

struct PaymentViewWrapper: UIViewRepresentable {
    let view: UIView
    
    func makeUIView(context: Context) -> UIView { view }
    func updateUIView(_ uiView: UIView, context: Context) {}
}
```

### YunoPaymentRenderFlowProtocol Methods

* **`formView()`**: Returns the payment form view if required, otherwise `nil`
* **`submitForm()`**: Submits the form and triggers token generation
* **`continuePayment()`**: Displays additional views (e.g., 3DS authentication) if needed

## Styling & Appearance

Customize SDK appearance using `Yuno.Appearance` during initialization:

```swift
import YunoSDK

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
    disableButtonTitleColor: UIColor.systemGray,
    checkboxColor: UIColor.systemBlue
)

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: YunoConfig(appearance: appearance)
)
```

| Field                            | Description                                                                             |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| `fontFamily`                     | Specifies the font family used in the SDK. Provide the font file name used in your app. |
| `accentColor`                    | Defines the accent color used in several SDK elements.                                  |
| `buttonBackgroundColor`          | Sets the background color for the primary buttons.                                      |
| `buttonTitleColor`               | Determines the text color for the primary buttons.                                      |
| `buttonBorderColor`              | Specifies the border color for the primary buttons.                                     |
| `secondaryButtonBackgroundColor` | Sets the background color for the secondary buttons.                                    |
| `secondaryButtonTitleColor`      | Determines the text color for the secondary buttons.                                    |
| `secondaryButtonBorderColor`     | Specifies the border color for the secondary buttons.                                   |
| `disableButtonBackgroundColor`   | Sets the background color for the disabled buttons.                                     |
| `disableButtonTitleColor`        | Determines the text color for the disabled buttons.                                     |
| `checkboxColor`                  | Sets the color for checkboxes.                                                          |

> 📘 Color Configuration
>
> Ensure all colors are specified as UIColor to maintain compatibility. Colors can be sourced from Xcode's predefined palette or the merchant's assets.

## Swift 6 Concurrency

Swift 6 introduces stricter concurrency requirements that affect how you implement the delegate protocols.

### The Problem

With Swift 6, protocols that inherit from `Sendable` require all their implementations to be thread-safe. This generates warnings when implementing the delegate in classes marked as `@MainActor`.

### Option 1: Immutable Properties

Best for simple apps with fixed configuration values:

```swift
@MainActor
class MyViewController: UIViewController, YunoPaymentDelegate {

    private let _countryCode = "CO"
    private let _language = "EN"
    private let _checkoutSession: String

    nonisolated var countryCode: String { _countryCode }
    nonisolated var language: String? { _language }
    nonisolated var checkoutSession: String { _checkoutSession }
    var viewController: UIViewController? { self }

    nonisolated func yunoPaymentResult(_ result: Yuno.Result) {
        Task { @MainActor in
            // Handle result on main thread
        }
    }
    
    nonisolated func yunoCreatePayment(with token: String) {
        Task { @MainActor in
            // Create payment on main thread
        }
    }
}
```

### Option 2: Mutable Properties with `MainActor.assumeIsolated`

Best for apps where configuration values might change during runtime:

```swift
@MainActor
class MyViewController: UIViewController, YunoPaymentDelegate {

    @Published var configLanguage: String = "EN"
    @Published var configCountryCode: String = "CO"
    private var _checkoutSession: String = ""

    nonisolated var language: String? {
        MainActor.assumeIsolated { configLanguage }
    }

    nonisolated var countryCode: String {
        MainActor.assumeIsolated { configCountryCode }
    }
    
    nonisolated var checkoutSession: String {
        MainActor.assumeIsolated { _checkoutSession }
    }
    
    var viewController: UIViewController? { self }
    
    nonisolated func yunoPaymentResult(_ result: Yuno.Result) {
        MainActor.assumeIsolated {
            // Handle result
        }
    }
}
```

### Option 3: For Non-MainActor Classes

Best for background services or utility classes:

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
    
    func yunoCreatePayment(with token: String) {
        // Create payment
    }
}
```

### Important Considerations

* **`MainActor.assumeIsolated`**: Only use when you guarantee it's called from `MainActor`
* **`nonisolated`**: Means it can be accessed from any thread, so it must be thread-safe
* **`viewController`**: Remains as `@MainActor` because UI components must run on the main thread

## Card Flow Types

Configure card input flow during Yuno initialization:

```swift
// One-step card form (all fields on one screen)
let config = YunoConfig(cardFormType: .oneStep)

// Step-by-step card form (multi-screen)
let config = YunoConfig(cardFormType: .multiStep)

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: config,
    callback: { }
)
```

## Error Handling

Handle payment results using the `Yuno.Result` class:

```swift
func yunoPaymentResult(_ result: Yuno.Result) {
    switch result.status {
    case .succeeded:
        handleSuccess()
    case .fail:
        handleFailure()
    case .processing:
        handlePending()
    case .reject:
        handleRejection()
    case .internalError:
        handleInternalError()
    case .userCancelled:
        handleCancellation()
    }
    
    // Access substatus if available
    if let substatus = result.substatus {
        print("Substatus: \(substatus)")
    }
}

func handleFailure() {
    showAlert("Payment failed. Please try again.")
}

func handleRejection() {
    showAlert("Payment was rejected. Please check your payment details.")
}

func handleInternalError() {
    showAlert("An error occurred. Please try again later.")
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
Yuno.initialize(
    apiKey: "pk_test_your_key",
    config: YunoConfig(),
    callback: { }
)
```

### Test Cards

Use test card numbers in sandbox environment:

* **Successful payment**: 4111111111111111
* **Declined**: 4000000000000002
* **Insufficient funds**: 4000000000009995

## Demo Application

In addition to the documentation, you can access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-ios) for a complete implementation of Yuno iOS SDKs.
