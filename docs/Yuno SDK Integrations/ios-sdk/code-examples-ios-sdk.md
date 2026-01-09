---
title: Code Examples iOS SDK
deprecated: false
hidden: true
metadata:
  robots: index
---
Ready-to-use iOS code examples for common scenarios.

## Example 1: Basic UIKit Payment

```swift
import UIKit
import YunoSDK

class PaymentViewController: UIViewController, YunoPaymentFullDelegate {
    
    @IBOutlet weak var payButton: UIButton!
    
    @IBAction func payButtonTapped() {
        startPayment()
    }
    
    func startPayment() {
        Task {
            let session = try await createSession(amount: 2500)
            
            await MainActor.run {
                let config = YunoConfig(
                    checkoutSession: session.id,
                    countryCode: "US"
                )
                Yuno.startPayment(with: config, delegate: self)
            }
        }
    }
    
    func createSession(amount: Int) async throws -> CheckoutSession {
        var request = URLRequest(url: URL(string: "https://api.example.com/checkout")!)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try JSONSerialization.data(withJSONObject: [
            "amount": ["currency": "USD", "value": amount],
            "customer_id": "cus_123"
        ])
        
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode(CheckoutSession.self, from: data)
    }
    
    func yunoPaymentResult(_ result: PaymentResult) {
        if result.status == .succeeded {
            performSegue(withIdentifier: "showSuccess", sender: nil)
        } else {
            showAlert(title: "Error", message: result.error?.message ?? "Payment failed")
        }
    }
}
```

## Example 2: SwiftUI Payment

```swift
import SwiftUI
import YunoSDK

struct CheckoutView: View {
    @State private var showSuccess = false
    @State private var errorMessage: String?
    
    var body: some View {
        VStack {
            Text("$25.00")
                .font(.largeTitle)
            
            Button("Pay Now") {
                Task { await processPayment() }
            }
            .buttonStyle(.borderedProminent)
        }
        .alert("Success!", isPresented: $showSuccess) {
            Button("OK") { }
        }
        .alert("Error", isPresented: .constant(errorMessage != nil)) {
            Button("OK") { errorMessage = nil }
        } message: {
            Text(errorMessage ?? "")
        }
    }
    
    func processPayment() async {
        do {
            let session = try await createCheckoutSession()
            
            await MainActor.run {
                let config = YunoConfig(
                    checkoutSession: session.id,
                    countryCode: "US"
                )
                Yuno.startPayment(with: config, delegate: self)
            }
        } catch {
            errorMessage = error.localizedDescription
        }
    }
    
    func createCheckoutSession() async throws -> CheckoutSession {
        // API call implementation
        fatalError("Implement API call")
    }
}

extension CheckoutView: YunoPaymentFullDelegate {
    func yunoPaymentResult(_ result: PaymentResult) {
        if result.status == .succeeded {
            showSuccess = true
        } else {
            errorMessage = result.error?.message
        }
    }
}
```

## Example 3: Subscription Enrollment

```swift
class SubscriptionVC: UIViewController, YunoEnrollmentDelegate {
    
    func enrollCard() {
        Task {
            let session = try await createCustomerSession(customerId: "cus_123")
            
            await MainActor.run {
                let config = YunoConfig(
                    customerSession: session.id,
                    countryCode: "US"
                )
                Yuno.enrollPayment(with: config, delegate: self)
            }
        }
    }
    
    func yunoEnrollmentResult(_ result: EnrollmentResult) {
        if result.status == .succeeded {
            saveVaultedToken(result.vaultedToken)
            setupSubscription(vaultedToken: result.vaultedToken)
        }
    }
    
    func setupSubscription(vaultedToken: String) {
        Task {
            try await apiClient.post("/subscriptions", body: [
                "customer_id": "cus_123",
                "vaulted_token": vaultedToken,
                "plan": "premium_monthly"
            ])
            
            await MainActor.run {
                showAlert("Subscription activated!")
            }
        }
    }
}
```

## Example 4: One-Click Payment

```swift
class FastCheckoutVC: UIViewController {
    var savedCards: [SavedCard] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        loadSavedCards()
    }
    
    func loadSavedCards() {
        Task {
            savedCards = try await apiClient.get("/customer/cards")
            tableView.reloadData()
        }
    }
    
    func payWithSavedCard(_ card: SavedCard) {
        Task {
            let session = try await createCheckoutSession()
            
            await MainActor.run {
                let config = YunoConfig(
                    checkoutSession: session.id,
                    countryCode: "US",
                    vaultedToken: card.vaultedToken
                )
                Yuno.startPayment(with: config, delegate: self)
            }
        }
    }
}

extension FastCheckoutVC: YunoPaymentFullDelegate {
    func yunoPaymentResult(_ result: PaymentResult) {
        if result.status == .succeeded {
            navigateToOrderConfirmation()
        }
    }
}
```

## Example 5: Custom Payment Method Selection

```swift
class CustomSelectionVC: UIViewController {
    
    @IBOutlet weak var tableView: UITableView!
    var paymentMethods: [PaymentMethod] = []
    
    func loadPaymentMethods() async {
        do {
            let session = try await createCheckoutSession()
            paymentMethods = try await fetchPaymentMethods(session: session.id)
            tableView.reloadData()
        } catch {
            showError(error)
        }
    }
    
    func fetchPaymentMethods(session: String) async throws -> [PaymentMethod] {
        let url = URL(string: "https://api.y.uno/v1/checkout/sessions/\(session)/payment-methods")!
        var request = URLRequest(url: url)
        request.setValue("pk_test_your_key", forHTTPHeaderField: "X-Yuno-Api-Key")
        
        let (data, _) = try await URLSession.shared.data(for: request)
        let response = try JSONDecoder().decode(PaymentMethodsResponse.self, from: data)
        return response.paymentMethods
    }
    
    func didSelectPaymentMethod(_ method: PaymentMethod) {
        let config = YunoConfig(
            checkoutSession: currentSession.id,
            countryCode: "US"
        )
        
        Yuno.startPaymentLite(
            with: config,
            paymentType: method.type,
            delegate: self
        )
    }
}
```

## Example 6: Render Mode Integration

```swift
class RenderModeVC: UIViewController, YunoPaymentRenderFlowProtocol {
    
    @IBOutlet weak var paymentContainerView: UIView!
    
    func startPayment() {
        Task {
            let session = try await createCheckoutSession()
            
            await MainActor.run {
                let config = YunoConfig(
                    checkoutSession: session.id,
                    countryCode: "US"
                )
                Yuno.startPaymentRenderFlow(with: config, delegate: self)
            }
        }
    }
    
    func formView() -> UIView? {
        return paymentContainerView
    }
    
    func submitForm() async {
        // Form submitted
    }
    
    func yunoPaymentResult(_ result: PaymentResult) {
        if result.status == .succeeded {
            navigateToSuccess()
        }
    }
}
```

## Example 7: Error Handling with Retry

```swift
class PaymentWithRetryVC: UIViewController {
    var retryCount = 0
    let maxRetries = 3
    
    func attemptPayment() {
        Task {
            do {
                let session = try await createCheckoutSession()
                await startPayment(session: session)
            } catch {
                await handlePaymentError(error)
            }
        }
    }
    
    func handlePaymentError(_ error: Error) async {
        if retryCount < maxRetries {
            retryCount += 1
            try? await Task.sleep(nanoseconds: 2_000_000_000) // 2s delay
            attemptPayment()
        } else {
            await MainActor.run {
                showAlert("Payment failed after \(maxRetries) attempts")
            }
        }
    }
}

extension PaymentWithRetryVC: YunoPaymentFullDelegate {
    func yunoPaymentResult(_ result: PaymentResult) {
        if result.status == .succeeded {
            retryCount = 0
            navigateToSuccess()
        } else if result.status == .failed {
            Task { await handlePaymentError(result.error!) }
        }
    }
}
```

## Example 8: Analytics Integration

```swift
import FirebaseAnalytics

class PaymentWithAnalyticsVC: UIViewController {
    
    func startPayment() {
        Analytics.logEvent("checkout_started", parameters: [
            "value": 25.00,
            "currency": "USD"
        ])
        
        Task {
            let session = try await createCheckoutSession()
            let config = YunoConfig(checkoutSession: session.id, countryCode: "US")
            Yuno.startPayment(with: config, delegate: self)
        }
    }
}

extension PaymentWithAnalyticsVC: YunoPaymentFullDelegate {
    func yunoPaymentResult(_ result: PaymentResult) {
        switch result.status {
        case .succeeded:
            Analytics.logEvent(AnalyticsEventPurchase, parameters: [
                "transaction_id": result.paymentId,
                "value": 25.00,
                "currency": "USD"
            ])
            navigateToSuccess()
            
        case .failed:
            Analytics.logEvent("payment_failed", parameters: [
                "error": result.error?.code ?? "unknown"
            ])
            showError(result.error?.message)
            
        default:
            break
        }
    }
}
```

## Example 9: Custom Styling

```swift
class StyledPaymentVC: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureYunoAppearance()
    }
    
    func configureYunoAppearance() {
        var appearance = Yuno.Appearance()
        
        appearance.primaryColor = UIColor(red: 0.2, green: 0.4, blue: 0.8, alpha: 1.0)
        appearance.backgroundColor = .systemBackground
        appearance.textColor = .label
        appearance.errorColor = .systemRed
        appearance.fontFamily = "SF Pro Display"
        appearance.fontSize = 16
        appearance.cornerRadius = 12
        
        Yuno.setAppearance(appearance)
    }
    
    func startPayment() {
        // Payment flow uses custom appearance
    }
}
```

## Example 10: Multi-Platform ViewModel

```swift
import Combine

class PaymentViewModel: ObservableObject {
    @Published var paymentState: PaymentState = .idle
    @Published var errorMessage: String?
    
    enum PaymentState {
        case idle, processing, succeeded, failed
    }
    
    func processPayment(amount: Int) async {
        await MainActor.run {
            paymentState = .processing
        }
        
        do {
            let session = try await createCheckoutSession(amount: amount)
            await startYunoPayment(session: session)
        } catch {
            await MainActor.run {
                paymentState = .failed
                errorMessage = error.localizedDescription
            }
        }
    }
    
    private func startYunoPayment(session: CheckoutSession) async {
        await MainActor.run {
            let config = YunoConfig(checkoutSession: session.id, countryCode: "US")
            Yuno.startPayment(with: config, delegate: self)
        }
    }
}

extension PaymentViewModel: YunoPaymentFullDelegate {
    func yunoPaymentResult(_ result: PaymentResult) {
        Task { @MainActor in
            if result.status == .succeeded {
                paymentState = .succeeded
            } else {
                paymentState = .failed
                errorMessage = result.error?.message
            }
        }
    }
}

// Usage in SwiftUI
struct PaymentView: View {
    @StateObject private var viewModel = PaymentViewModel()
    
    var body: some View {
        VStack {
            switch viewModel.paymentState {
            case .idle:
                Button("Pay $25") {
                    Task { await viewModel.processPayment(amount: 2500) }
                }
            case .processing:
                ProgressView()
            case .succeeded:
                Text("Payment successful!")
            case .failed:
                Text("Error: \(viewModel.errorMessage ?? "")")
            }
        }
    }
}
```

## Backend API Helper

```swift
class YunoAPIClient {
    static let shared = YunoAPIClient()
    
    func createCheckoutSession(amount: Money, customerId: String) async throws -> CheckoutSession {
        var request = URLRequest(url: URL(string: "https://api.example.com/checkout")!)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body: [String: Any] = [
            "amount": ["currency": amount.currency, "value": amount.value],
            "customer_id": customerId,
            "country": "US"
        ]
        
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode(CheckoutSession.self, from: data)
    }
    
    func createCustomerSession(customerId: String) async throws -> CustomerSession {
        var request = URLRequest(url: URL(string: "https://api.example.com/customer/session")!)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try JSONSerialization.data(withJSONObject: [
            "customer_id": customerId
        ])
        
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode(CustomerSession.self, from: data)
    }
}
```

