---
title: New - iOS SDK Payment Integration
deprecated: false
hidden: false
metadata:
  robots: index
---
This guide walks you through integrating payment processing in your iOS application using the Yuno SDK.

> 📘 Prerequisites
>
> Before starting, make sure you've [installed and initialized the SDK](ios-sdk-getting-started).

## Choose Your Integration Style

The Yuno iOS SDK offers flexible payment integration options depending on how much control you need over the payment method selection:

### Full Checkout (Recommended for Most Use Cases)

Yuno manages and renders the payment method list for you. This provides the fastest integration with pre-built UI components.

**Best for:**

* Quickest integration
* You want Yuno to handle payment method display
* Standard checkout experiences

### Pre-selected Payment Method

You control which payment method to display or pre-select for the customer. This gives you more flexibility over the UI.

**Best for:**

* Custom payment method selection UI
* Pre-selecting based on user preferences
* Advanced checkout flows

Both approaches use the same underlying SDK functionality and support the same payment methods.

***

## Create a Checkout Session

Before starting the payment process, create a `checkout_session` using the [Create Checkout Session](ref:create-checkout-session) endpoint.

### Key Parameters

| Parameter          | Required | Description                                                                                                                              |
| ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `amount`           | Yes      | The primary transaction amount object containing `currency` (ISO 4217 code) and `value` (numeric amount).                                |
| `customer_session` | No       | For [vaulted token payments](#using-saved-payment-methods-vaulted-tokens), provide the customer session to access saved payment methods. |

<Callout icon="💳" theme="info">
  Control auth vs capture by sending `payment_method.detail.card.capture` in the checkout session: `false` = authorize only, `true` = capture immediately.
</Callout>

***

## Implementation: Full Checkout

### Step 1: Implement the Payment Delegate

Your ViewController needs to adopt the `YunoPaymentDelegate` protocol:

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

class ViewController: UIViewController, YunoPaymentDelegate {
    
    var checkoutSession: String {
        return "YOUR_CHECKOUT_SESSION"
    }
    
    var countryCode: String {
        return "CO" // See country coverage page
    }
    
    var language: String? {
        return "en" // Optional: es, en, pt, etc.
    }
    
    var viewController: UIViewController? {
        return self
    }
    
    func yunoCreatePayment(with token: String) {
        // Call your backend to create payment
        createPaymentOnBackend(token: token)
    }
    
    func yunoPaymentResult(_ result: Yuno.Result) {
        // Handle payment result
        switch result {
        case .succeeded:
            print("Payment successful!")
        case .fail:
            print("Payment failed")
        case .processing:
            print("Payment processing")
        case .reject:
            print("Payment rejected")
        case .userCancell:
            print("User cancelled")
        case .internalError:
            print("Internal error")
        }
    }
}
```

#### Delegate Parameters

| Parameter                                     | Description                                                                                                                                                |
| :-------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`                             | The current payment's checkout session.                                                                                                                    |
| `countryCode`                                 | Country code for the payment process. See [Country coverage](doc:country-coverage-yuno-sdk) for the complete list.                                         |
| `language`                                    | Language for payment forms: `es`, `en`, `pt`, `fil`, `id`, `ms`, `th`, `zh-TW`, `zh-CN`, `vi`, `fr`, `pl`, `it`, `de`, `ru`, `tr`, `nl`, `sv`, `ko`, `ja`. |
| `viewController`                              | The `UIViewController` used to present the payment flow. Must supply a visible controller for the SDK to present its UI.                                   |
| `yunoCreatePayment(with token:)`              | Called when the SDK generates a one-time token. Use this to create a payment on your backend.                                                              |
| `yunoCreatePayment(with token: information:)` | Alternative method that also returns token metadata. Use only one version.                                                                                 |
| `yunoPaymentResult(_ result:)`                | Called when the payment process completes with the final result.                                                                                           |

> ❗️ Important Note on yunoCreatePayment
>
> You can call `yunoCreatePayment` with or without the `information` parameter based on your needs. However, use only one version in your code, as calling both is not required and may cause issues.

### Step 2: Display Payment Methods

For Full Checkout, you need to adopt the `YunoPaymentFullDelegate` protocol to receive payment method events:

```swift
protocol YunoPaymentFullDelegate: YunoPaymentDelegate {
    func yunoDidSelect(paymentMethod: YunoSDK.PaymentMethodSelected)
    func yunoDidUnenrollSuccessfully(_ success: Bool)
    func yunoUpdatePaymentMethodsViewHeight(_ height: CGFloat)
}
```

#### Full Delegate Methods

| Function                                        | Description                                         |
| ----------------------------------------------- | --------------------------------------------------- |
| `yunoDidSelect(paymentMethod:)`                 | Called when the user selects a payment method.      |
| `yunoDidUnenrollSuccessfully(_ success:)`       | Called when an unenroll action finishes.            |
| `yunoUpdatePaymentMethodsViewHeight(_ height:)` | Called when the payment method view height changes. |

Call the following method to get the payment method view:

```swift
let paymentMethodView = await Yuno.getPaymentMethodViewAsync(delegate: self)

// The SDK automatically returns the correct type:
// - UIView for UIKit
// - some View for SwiftUI
```

Add the returned view to your layout.

### Step 3: Start the Payment

Once the customer selects a payment method and is ready to pay:

```swift
Yuno.startPayment(showPaymentStatus: true)
```

The `showPaymentStatus` parameter determines whether to display the payment status screen after completion.

***

## Implementation: Pre-selected Payment Method

If you want to control which payment method is displayed, use `startPaymentLite()`.

### Step 1: Implement the Payment Delegate

Same as Full Checkout - implement `YunoPaymentDelegate` (see above).

### Step 2: Start Payment with Pre-selected Method

Call `startPaymentLite()` with the payment method the customer will use:

```swift
// Define the payment method
struct MyPaymentMethod: PaymentMethodSelected {
    var vaultedToken: String?
    var paymentMethodType: String
}

let paymentMethod = MyPaymentMethod(
    vaultedToken: nil, // or "saved_token_123" for saved cards
    paymentMethodType: "CARD"
)

// Start payment
Yuno.startPaymentLite(
    with: self,
    paymentSelected: paymentMethod,
    showPaymentStatus: true
)
```

The SDK will display the appropriate form for the selected payment method.

***

## Create the Payment on Your Backend

When the SDK calls `yunoCreatePayment(with token:)`, use your backend to create the payment with the [Create Payment endpoint](ref:create-payment):

```swift
func yunoCreatePayment(with token: String) {
    // Call your backend
    APIClient.createPayment(
        checkoutSession: self.checkoutSession,
        token: token
    ) { result in
        switch result {
        case .success(let paymentResponse):
            // Check if additional action is required
            if paymentResponse.sdkActionRequired {
                Yuno.continuePayment()
            }
        case .failure(let error):
            print("Payment creation failed: \(error)")
        }
    }
}
```

> 📘 Continue Payment Method
>
> Always integrate the `continuePayment()` method after creating a payment. This is crucial for asynchronous payment methods that require additional customer actions (like 3DS challenges or redirects).
>
> * **Asynchronous Payment Handling**: The API signals the need for further action with `sdk_action_required` set to true.
> * **Functionality**: `Yuno.continuePayment()` manages and displays any additional screens necessary for the customer to complete the payment.

```swift
Yuno.continuePayment()
```

***

## Using Saved Payment Methods (Vaulted Tokens)

To allow customers to pay with previously saved payment methods:

### Step 1: Create Checkout Session with Customer Session

Include a `customer_session` when creating the checkout session to access the customer's saved payment methods.

### Step 2: Use Vaulted Token

For **Full Checkout**: Saved payment methods automatically appear in the payment method list.

For **Pre-selected Method**: Pass the vaulted token:

```swift
let savedCard = MyPaymentMethod(
    vaultedToken: "c8bb2bd8-8abf-4265-b478-0ec4e3c10cd5",
    paymentMethodType: "CARD"
)

Yuno.startPaymentLite(
    with: self,
    paymentSelected: savedCard,
    showPaymentStatus: true
)
```

***

## Save Cards During Payment

Enable customers to save their card for future use during checkout:

### Step 1: Configure SDK

Set `saveCardEnabled: true` in `YunoConfig`:

```swift
let config = YunoConfig(
    saveCardEnabled: true
)

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: config,
    callback: { (value: Bool) in }
)
```

### Step 2: Create Checkout Session with Customer Session

Include a `customer_session` in the checkout session to link the saved card to a customer.

A checkbox will appear on the card form allowing the customer to save their card:

<Image align="center" border={false} src="https://files.readme.io/ae235ca04eda2c260442c375617e64950bed2a0564578771fcc3403de7ca965e-Card___save_for_future_payments.png" />

> 📘 Save During Payment vs. Separate Enrollment
>
> **Save during payment** (`saveCardEnabled: true`) is simpler and works for cards only. For more control or to save alternative payment methods, use [separate enrollment](ios-sdk-enrollment-integration).

***

## Handle Deep Links (Optional)

> 🚧 Deep Links and Mercado Pago Checkout Pro
>
> This step is only required if you're using a payment method that relies on deep links or Mercado Pago Checkout Pro. If your payment methods don't use deep links, you can skip this step.

Some payment methods take users out of your app to complete the transaction. Once finished, the user is redirected back using a deep link.

Add this to your `AppDelegate`:

```swift
func application(_ app: UIApplication,
                 open url: URL,
                 options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {

  guard url.scheme == "yunoexample" else { return false }

  return Yuno.receiveDeeplink(url, showStatusView: true)
}
```

Make sure `url.scheme` matches the `callback_url` you provided when creating the `checkout_session`.

***

## Payment Status and Results

After the payment completes, the SDK returns one of the following transaction states via `yunoPaymentResult(_ result:)`:

| Transaction State | Description                                                                |
| :---------------- | :------------------------------------------------------------------------- |
| `succeeded`       | The transaction has been completed successfully.                           |
| `fail`            | The transaction failed due to an error during the payment process.         |
| `processing`      | The transaction is currently being processed (e.g., waiting for approval). |
| `reject`          | The transaction was rejected (e.g., insufficient funds, fraud detection).  |
| `internalError`   | An unexpected error occurred within the system.                            |
| `userCancell`     | The user voluntarily canceled the transaction.                             |

### Payment Status Validation

This section explains how the SDK handles payment status when users cancel or leave payment flows.

#### Sync Payment Methods (Apple Pay)

For synchronous payment methods like Apple Pay, when a user cancels or closes the wallet UI before a PSP response is received:

* **SDK Status**: Returns `userCancell` (CANCELLED_BY_USER)
* **Backend Payment Status**: Remains `PENDING` until PSP timeout or merchant cancellation
* **Important**: The SDK will not return `reject` or `processing` in this scenario

#### Async Payment Methods (PIX and QR-based methods)

For asynchronous payment methods like PIX, when a user closes the QR code window before completing the payment:

* **SDK Status**: Returns `PENDING`, optionally with a sub-status such as `CLOSED_BY_USER`
* **Backend Payment Status**: Remains `PENDING` and the QR code remains valid until expiry
* **Checkout Session Reuse**: Re-opening the same checkout session can display the same valid QR code
* **No Automatic Cancellation**: The PIX payment is not automatically cancelled when the user closes the QR window

#### Expired Async Payments

If a PIX QR code expires naturally:

* **Backend Status**: Updated to `EXPIRED`
* **SDK Status**: SDK callbacks and polling endpoints return `EXPIRED` consistently

***

## Render Mode Integration

The render mode offers enhanced UI flexibility, enabling you to integrate payment flows with complete control over the user interface while retaining full SDK functionality.

### Main Function: `startPaymentRenderFlow`

```swift
@MainActor static func startPaymentRenderFlow(
    paymentMethodSelected: PaymentMethodSelected,
    with delegate: YunoPaymentDelegate
) async -> some YunoPaymentRenderFlowProtocol
```

#### Parameters

| Parameter               | Type                    | Description                                                                                               |
| ----------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| `paymentMethodSelected` | `PaymentMethodSelected` | The payment method selected by the user. Must include `vaultedToken` (if exists) and `paymentMethodType`. |
| `delegate`              | `YunoPaymentDelegate`   | The delegate that handles payment process responses.                                                      |

### YunoPaymentRenderFlowProtocol

The returned instance provides these methods:

#### formView(paymentMethodSelected:with:)

```swift
func formView(
    paymentMethodSelected: PaymentMethodSelected,
    with delegate: YunoPaymentDelegate
) async -> AnyView?
```

* **Purpose**: Gets the form view to capture payment data
* **Returns**: `AnyView` with the form, or `nil` if no form is needed

#### submitForm()

```swift
func submitForm()
```

* **Purpose**: Submits form data for validation and generates a one-time token
* **When to use**: When the user taps the "pay" button

#### continuePayment()

```swift
func continuePayment() async -> AnyView?
```

* **Purpose**: Continues payment after OTT is generated
* **Returns**: `AnyView` for additional views (e.g., 3DS), or `nil` if none needed

### Implementation Example

```swift
// Step 1: Create payment flow instance
let paymentFlow = await Yuno.startPaymentRenderFlow(
    paymentMethodSelected: selectedPaymentMethod,
    with: self
)

// Step 2: Get and display the form
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
    // No form needed, submit directly
    paymentFlow.submitForm()
}

// Step 3: Handle token in delegate
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
```

***

## Card Form Options

You can choose between two card form render modes:

```swift
let config = YunoConfig(
    cardFormType: .oneStep // or .stepByStep
)
```

<Image align="center" border={false} src="https://files.readme.io/0a1e67430bc9765920c9252731b79626f3777c96322a66a760f682dafc72c637-Full_SDK_ios.png" />

***

## SDK Customizations

Customize the SDK appearance to match your brand. See the [SDK Customizations](../docs/sdk-customizations-ios) guide for details.

***

## Swift 6 Concurrency

If you're using Swift 6, you'll need to implement the `YunoPaymentDelegate` protocol with specific concurrency considerations.

> 📘 Understanding Concurrency in Swift 6
>
> Swift 6 introduces stricter concurrency requirements for thread safety. With Swift 6, protocols that inherit from `Sendable` require all their implementations to be thread-safe.

### The Problem

Protocols that inherit from `Sendable` generate warnings when implementing the delegate in classes marked as `@MainActor`.

### Our Design Decision

We do not mark protocols as `@MainActor` because:

* It would force all implementations to be `MainActor`-compatible
* It would reduce flexibility for merchants who don't use `MainActor`
* Each implementation has different concurrency needs

### Implementation Options

#### Option 1: Immutable Properties

Best for simple apps with fixed configuration values:

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
            // Handle result on main thread
        }
    }
}
```

#### Option 2: Mutable Properties with `MainActor.assumeIsolated`

Best for apps where configuration values might change during runtime:

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

#### Option 3: For Non-`MainActor` Classes

Best for background services or utility classes that don't interact with UI:

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

### Important Considerations

* **`MainActor.assumeIsolated`**: Only use when you guarantee it's called from `MainActor`
* **`nonisolated`**: Can be accessed from any thread, so it must be thread-safe
* **`viewController`**: Should always be accessed from the main thread

***

## Next Steps

* **[Enroll Payment Methods](ios-sdk-enrollment-integration)** - Save payment methods for future use
* **[SDK Customizations](../docs/sdk-customizations-ios)** - Match the SDK appearance to your brand
* **[Click to Pay Integration](doc:click-to-pay#sdk-integration)** - Add Click to Pay support

> 📘 Demo App
>
> For complete implementation examples, visit the [Yuno iOS SDK repository](https://github.com/yuno-payments/yuno-sdk-ios).
