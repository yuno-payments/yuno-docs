---
title: iOS Examples Fix
deprecated: false
hidden: false
metadata:
  robots: index
---
Ready-to-use iOS code examples for common scenarios.

## Example 1: Basic UIKit Payment

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
    
    @IBOutlet weak var payButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        Task {
            // 1. Create session on backend
            let session = try await createSession(amount: 2500)
            _checkoutSession = session.id
            
            // 2. Get payment methods view from SDK
            paymentMethodsView = await Yuno.getPaymentMethodViewAsync(delegate: self)
            
            // 3. Add to view hierarchy
            if let methodsView = paymentMethodsView {
                methodsView.translatesAutoresizingMaskIntoConstraints = false
                view.addSubview(methodsView)
                // Add constraints...
            }
        }
    }
    
    @IBAction func payButtonTapped() {
        Yuno.startPayment()
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
            performSegue(withIdentifier: "showSuccess", sender: nil)
        case .fail, .reject, .internalError:
            showAlert(title: "Error", message: "Payment failed")
        case .processing:
            showAlert(title: "Processing", message: "Payment is being processed")
        case .userCancelled:
            break
        }
    }
    
    func yunoDidSelect(paymentMethod: PaymentMethodSelected) {
        print("Selected:", paymentMethod)
    }
    
    func yunoUpdatePaymentMethodsViewHeight(_ height: CGFloat) {
        // Update constraints if needed
    }
    
    func yunoDidUnenrollSuccessfully(_ success: Bool) {
        print("Unenroll success:", success)
    }
}
```

## Example 2: SwiftUI Payment

```swift
import SwiftUI
import YunoSDK

struct CheckoutView: View {
    @StateObject private var viewModel = CheckoutViewModel()
    @State private var showSuccess = false
    @State private var errorMessage: String?
    
    var body: some View {
        VStack {
            Text("$25.00")
                .font(.largeTitle)
            
            Button("Pay Now") {
                Task { await viewModel.startPayment() }
            }
            .buttonStyle(.borderedProminent)
        }
        .task {
            await viewModel.initialize()
        }
        .alert("Success!", isPresented: $showSuccess) {
            Button("OK") { }
        }
        .alert("Error", isPresented: .constant(errorMessage != nil)) {
            Button("OK") { errorMessage = nil }
        } message: {
            Text(errorMessage ?? "")
        }
        .onReceive(viewModel.$paymentStatus) { status in
            switch status {
            case .succeeded:
                showSuccess = true
            case .failed(let message):
                errorMessage = message
            default:
                break
            }
        }
    }
}

@MainActor
class CheckoutViewModel: ObservableObject, YunoPaymentFullDelegate {
    enum PaymentStatus {
        case idle, processing, succeeded, failed(String)
    }
    
    @Published var paymentStatus: PaymentStatus = .idle
    
    private var _checkoutSession: String = ""
    private var paymentMethodsView: UIView?
    
    var checkoutSession: String { _checkoutSession }
    var countryCode: String { "US" }
    var language: String? { "en" }
    var viewController: UIViewController? { nil }
    
    func initialize() async {
        let session = try? await createCheckoutSession()
        _checkoutSession = session?.id ?? ""
        paymentMethodsView = await Yuno.getPaymentMethodViewAsync(delegate: self)
    }
    
    func startPayment() async {
        paymentStatus = .processing
        Yuno.startPayment()
    }
    
    func yunoCreatePayment(with token: String, information: [String: Any]) {
        Task {
            await createPayment(token: token)
            Yuno.continuePayment()
        }
    }
    
    func yunoPaymentResult(_ result: Yuno.Result) {
        switch result.status {
        case .succeeded:
            paymentStatus = .succeeded
        case .fail, .reject, .internalError:
            paymentStatus = .failed("Payment failed")
        case .processing:
            paymentStatus = .processing
        case .userCancelled:
            paymentStatus = .idle
        }
    }
    
    func yunoDidSelect(paymentMethod: PaymentMethodSelected) { }
    func yunoUpdatePaymentMethodsViewHeight(_ height: CGFloat) { }
    func yunoDidUnenrollSuccessfully(_ success: Bool) { }
}
```

## Example 3: Enrollment (Save Card)

```swift
import UIKit
import YunoSDK

class EnrollmentViewController: UIViewController, YunoEnrollmentDelegate {
    
    private var _customerSession: String = ""
    
    // YunoEnrollmentDelegate required properties
    var customerSession: String { _customerSession }
    var countryCode: String { "US" }
    var language: String? { "en" }
    var viewController: UIViewController? { self }
    
    func enrollCard() {
        Task {
            // Create customer session on backend
            let session = try await createCustomerSession(customerId: "cus_123")
            _customerSession = session.id
            
            // Start enrollment
            Yuno.enrollPayment(with: self, showPaymentStatus: true)
        }
    }
    
    func yunoEnrollmentResult(_ result: Yuno.Result) {
        switch result.status {
        case .succeeded:
            print("Card enrolled successfully")
            // Fetch vaulted tokens from your backend
            fetchSavedCards()
        case .fail, .reject, .internalError:
            showAlert("Enrollment failed")
        case .processing:
            showAlert("Enrollment processing")
        case .userCancelled:
            break
        }
    }
    
    func fetchSavedCards() {
        Task {
            let cards = try await apiClient.get("/customer/cards")
            // Update UI with saved cards
        }
    }
}
```

## Example 4: One-Click Payment with Saved Card

```swift
import UIKit
import YunoSDK

class FastCheckoutViewController: UIViewController, YunoPaymentDelegate {
    
    private var _checkoutSession: String = ""
    var savedCards: [SavedCard] = []
    
    // YunoPaymentDelegate required properties
    var checkoutSession: String { _checkoutSession }
    var countryCode: String { "US" }
    var language: String? { "en" }
    var viewController: UIViewController? { self }
    
    @IBOutlet weak var tableView: UITableView!
    
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
            // Create checkout session
            let session = try await createCheckoutSession()
            _checkoutSession = session.id
            
            // Start payment with vaulted token
            let paymentSelected = PaymentMethodSelected(
                paymentMethodType: "CARD",
                vaultedToken: card.vaultedToken
            )
            
            Yuno.startPaymentLite(
                with: self,
                paymentSelected: paymentSelected,
                showPaymentStatus: true
            )
        }
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
            navigateToOrderConfirmation()
        case .fail, .reject, .internalError:
            showAlert("Payment failed")
        case .processing:
            showAlert("Payment processing")
        case .userCancelled:
            break
        }
    }
}
```

## Example 5: Custom Payment Method Selection

```swift
import UIKit
import YunoSDK

class CustomSelectionViewController: UIViewController, YunoPaymentDelegate {
    
    private var _checkoutSession: String = ""
    
    var checkoutSession: String { _checkoutSession }
    var countryCode: String { "US" }
    var language: String? { "en" }
    var viewController: UIViewController? { self }
    
    @IBOutlet weak var tableView: UITableView!
    var paymentMethods: [PaymentMethod] = []
    
    func loadPaymentMethods() async {
        do {
            let session = try await createCheckoutSession()
            _checkoutSession = session.id
            
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
        let paymentSelected = PaymentMethodSelected(
            paymentMethodType: method.type,
            vaultedToken: nil
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

## Example 6: Render Mode Integration

```swift
import UIKit
import YunoSDK

class RenderModeViewController: UIViewController, YunoPaymentDelegate {
    
    private var _checkoutSession: String = ""
    private var paymentFlow: YunoPaymentRenderFlowProtocol?
    
    var checkoutSession: String { _checkoutSession }
    var countryCode: String { "US" }
    var language: String? { "en" }
    var viewController: UIViewController? { self }
    
    @IBOutlet weak var paymentContainerView: UIView!
    @IBOutlet weak var submitButton: UIButton!
    
    func startPayment() {
        Task {
            let session = try await createCheckoutSession()
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
                formView.translatesAutoresizingMaskIntoConstraints = false
                paymentContainerView.addSubview(formView)
                NSLayoutConstraint.activate([
                    formView.topAnchor.constraint(equalTo: paymentContainerView.topAnchor),
                    formView.leadingAnchor.constraint(equalTo: paymentContainerView.leadingAnchor),
                    formView.trailingAnchor.constraint(equalTo: paymentContainerView.trailingAnchor),
                    formView.bottomAnchor.constraint(equalTo: paymentContainerView.bottomAnchor)
                ])
            }
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

## Example 7: Error Handling with Retry

```swift
import UIKit
import YunoSDK

class PaymentWithRetryViewController: UIViewController, YunoPaymentDelegate {
    
    private var _checkoutSession: String = ""
    var retryCount = 0
    let maxRetries = 3
    
    var checkoutSession: String { _checkoutSession }
    var countryCode: String { "US" }
    var language: String? { "en" }
    var viewController: UIViewController? { self }
    
    func attemptPayment() {
        Task {
            do {
                let session = try await createCheckoutSession()
                _checkoutSession = session.id
                
                let paymentSelected = PaymentMethodSelected(
                    paymentMethodType: "CARD",
                    vaultedToken: nil
                )
                
                Yuno.startPaymentLite(
                    with: self,
                    paymentSelected: paymentSelected,
                    showPaymentStatus: true
                )
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
    
    func yunoCreatePayment(with token: String) {
        Task {
            await createPayment(token: token)
            Yuno.continuePayment()
        }
    }
    
    func yunoPaymentResult(_ result: Yuno.Result) {
        switch result.status {
        case .succeeded:
            retryCount = 0
            navigateToSuccess()
        case .fail, .internalError:
            Task { await handlePaymentError(NSError(domain: "Payment", code: -1)) }
        case .reject:
            showAlert("Payment was rejected")
        case .processing:
            showAlert("Payment is processing")
        case .userCancelled:
            break
        }
    }
}
```

## Example 8: Analytics Integration

```swift
import UIKit
import YunoSDK
import FirebaseAnalytics

class PaymentWithAnalyticsViewController: UIViewController, YunoPaymentFullDelegate {
    
    private var _checkoutSession: String = ""
    private var paymentMethodsView: UIView?
    
    var checkoutSession: String { _checkoutSession }
    var countryCode: String { "US" }
    var language: String? { "en" }
    var viewController: UIViewController? { self }
    
    func startPayment() {
        Analytics.logEvent("checkout_started", parameters: [
            "value": 25.00,
            "currency": "USD"
        ])
        
        Task {
            let session = try await createCheckoutSession()
            _checkoutSession = session.id
            
            paymentMethodsView = await Yuno.getPaymentMethodViewAsync(delegate: self)
            // Add to view hierarchy...
            
            Yuno.startPayment()
        }
    }
    
    func yunoCreatePayment(with token: String, information: [String: Any]) {
        Task {
            await createPayment(token: token)
            Yuno.continuePayment()
        }
    }
    
    func yunoPaymentResult(_ result: Yuno.Result) {
        switch result.status {
        case .succeeded:
            Analytics.logEvent(AnalyticsEventPurchase, parameters: [
                "value": 25.00,
                "currency": "USD"
            ])
            navigateToSuccess()
            
        case .fail, .reject, .internalError:
            Analytics.logEvent("payment_failed", parameters: [
                "status": String(describing: result.status)
            ])
            showError("Payment failed")
            
        case .processing:
            Analytics.logEvent("payment_processing", parameters: nil)
            
        case .userCancelled:
            Analytics.logEvent("payment_cancelled", parameters: nil)
        }
    }
    
    func yunoDidSelect(paymentMethod: PaymentMethodSelected) {
        Analytics.logEvent("payment_method_selected", parameters: [
            "method": paymentMethod.paymentMethodType
        ])
    }
    
    func yunoUpdatePaymentMethodsViewHeight(_ height: CGFloat) { }
    func yunoDidUnenrollSuccessfully(_ success: Bool) { }
}
```

## Example 9: Custom Styling

```swift
import UIKit
import YunoSDK

class StyledPaymentViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureYunoAppearance()
    }
    
    func configureYunoAppearance() {
        let appearance = Yuno.Appearance(
            fontFamily: "SF Pro Display",
            accentColor: UIColor(red: 0.2, green: 0.4, blue: 0.8, alpha: 1.0),
            buttonBackgroundColor: UIColor(red: 0.2, green: 0.4, blue: 0.8, alpha: 1.0),
            buttonTitleColor: .white,
            buttonBorderColor: UIColor(red: 0.2, green: 0.4, blue: 0.8, alpha: 1.0),
            secondaryButtonBackgroundColor: .systemGray6,
            secondaryButtonTitleColor: .label,
            secondaryButtonBorderColor: .systemGray4,
            disableButtonBackgroundColor: .systemGray4,
            disableButtonTitleColor: .systemGray,
            checkboxColor: UIColor(red: 0.2, green: 0.4, blue: 0.8, alpha: 1.0)
        )
        
        Yuno.initialize(
            apiKey: "PUBLIC_API_KEY",
            config: YunoConfig(appearance: appearance),
            callback: {
                print("SDK initialized with custom appearance")
            }
        )
    }
}
```

## Example 10: Multi-Platform ViewModel

```swift
import Combine
import YunoSDK

@MainActor
class PaymentViewModel: ObservableObject, YunoPaymentFullDelegate {
    @Published var paymentState: PaymentState = .idle
    @Published var errorMessage: String?
    
    private var _checkoutSession: String = ""
    private var paymentMethodsView: UIView?
    
    var checkoutSession: String { _checkoutSession }
    var countryCode: String { "US" }
    var language: String? { "en" }
    var viewController: UIViewController? { nil }
    
    enum PaymentState {
        case idle, processing, succeeded, failed
    }
    
    func processPayment(amount: Int) async {
        paymentState = .processing
        
        do {
            let session = try await createCheckoutSession(amount: amount)
            _checkoutSession = session.id
            
            paymentMethodsView = await Yuno.getPaymentMethodViewAsync(delegate: self)
            Yuno.startPayment()
        } catch {
            paymentState = .failed
            errorMessage = error.localizedDescription
        }
    }
    
    func yunoCreatePayment(with token: String, information: [String: Any]) {
        Task {
            await createPayment(token: token)
            Yuno.continuePayment()
        }
    }
    
    func yunoPaymentResult(_ result: Yuno.Result) {
        switch result.status {
        case .succeeded:
            paymentState = .succeeded
        case .fail, .reject, .internalError:
            paymentState = .failed
            errorMessage = "Payment failed"
        case .processing:
            paymentState = .processing
        case .userCancelled:
            paymentState = .idle
        }
    }
    
    func yunoDidSelect(paymentMethod: PaymentMethodSelected) { }
    func yunoUpdatePaymentMethodsViewHeight(_ height: CGFloat) { }
    func yunoDidUnenrollSuccessfully(_ success: Bool) { }
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
    
    func createPayment(token: String, checkoutSession: String) async throws {
        var request = URLRequest(url: URL(string: "https://api.example.com/payments")!)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try JSONSerialization.data(withJSONObject: [
            "payment_method": ["token": token],
            "checkout_session": checkoutSession
        ])
        
        let (_, response) = try await URLSession.shared.data(for: request)
        guard let httpResponse = response as? HTTPURLResponse,
              httpResponse.statusCode == 200 || httpResponse.statusCode == 201 else {
            throw NSError(domain: "Payment", code: -1, userInfo: [NSLocalizedDescriptionKey: "Payment creation failed"])
        }
    }
}
```
