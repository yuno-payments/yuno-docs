---
title: New - iOS Flow Payment Integration
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: iOS Flow Payment Integration
  description: >-
    Process payments with the iOS Flow using automatic or custom payment method display, with support for cards, digital wallets, and alternative payment methods.
  robots: index
---

This guide covers payment processing with the iOS Flow, including all mounting options for displaying payment methods and handling the complete payment flow.

> 📘 Prerequisites
>
> Before starting, make sure you've [installed and initialized the SDK](doc:new-ios-sdk-getting-started).

## Overview

The iOS Flow provides flexible payment integration options:

* **Automatic Payment Method Display** (`getPaymentMethodViewAsync()` + `startPayment()`): SDK displays all available payment methods
* **Custom Payment Method Display** (`startPaymentLite()`): You control which payment method to display
* **Seamless Flow** (`startPaymentSeamlessLite()`): Simplified payment creation with automatic backend processing

All approaches use the same SDK—the difference is how payment methods are displayed and which function you call.

## Step 1: Create a Checkout Session

Before starting the payment flow, create a checkout session on your backend using the [Create Checkout Session](ref:create-checkout-session) endpoint.

* First, [create a customer](ref:create-customer) or retrieve an existing customer ID
* Then create a checkout session with the customer ID and payment details

```json
POST /v1/checkout/session

{
  "country": "BR",
  "customer_id": "6c85a4e3-0a6c-423d-a12a-10045320ab4a",
  "amount": {
    "currency": "BRL",
    "value": 2500
  }
}
```

<Callout icon="💳" theme="info">
  ### Control Authorization and Capture

  To control authorization and capture with cards, include `payment_method.detail.card.capture` in the checkout session: set `false` to authorize only, `true` to capture immediately.
</Callout>

> 🚧 External Browser Return Handling
>
> If your payment flow sends users to an external browser (for 3DS authentication or bank redirects), set the `callback_url` when creating your checkout session. See [Handle External Browser Return](#step-6-handle-external-browser-return-optional) for details.

### Key Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `amount` | Yes | The primary transaction amount object containing `currency` (ISO 4217 code) and `value` (numeric amount). |
| `alternative_amount` | No | An alternative currency representation with the same structure as `amount`. Useful for multi-currency scenarios. |
| `callback_url` | Recommended | URL to redirect users back to your app after external browser flows (3DS, bank redirects). |
| `workflow` | Conditional | Set to `SDK_SEAMLESS` when using `startPaymentSeamlessLite()`. Not required for other methods. |

## Step 2: Implement the Payment Delegate

Create a class that adopts the `YunoPaymentDelegate` protocol:

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
    var checkoutSession: String { "438413b7-4921-41e4-b8f3-28a5a0141638" }
    var countryCode: String { "BR" }
    var language: String? { "en" }
    var viewController: UIViewController? { self }

    func yunoCreatePayment(with token: String) {
        // Create payment on your backend
    }

    func yunoCreatePayment(with token: String, information: [String: Any]) {
        // Create payment with additional information
    }

    func yunoPaymentResult(_ result: Yuno.Result) {
        // Handle payment result
    }
}
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `checkoutSession` | The unique identifier for the checkout session. |
| `countryCode` | Country code where the payment is performed. See [Country Coverage](doc:quickstart) for supported countries. |
| `language` | Language code for the payment forms (e.g., `"en"`, `"es"`, `"pt"`). See [Supported Languages](#supported-languages) below. |
| `viewController` | The `UIViewController` used to present the payment flow. Required for proper UI presentation. |
| `yunoCreatePayment(with:)` | Called when a one-time token is generated. Create the payment on your backend. |
| `yunoCreatePayment(with:information:)` | Alternative callback that includes additional token information. Use only one version. |
| `yunoPaymentResult(_:)` | Called when the payment process completes with the final result. |

> ❗ Important Note
>
> Use either `yunoCreatePayment(with:)` **OR** `yunoCreatePayment(with:information:)` based on your needs—not both. Calling both may cause issues.

> 🚧 Swift 6 Concurrency Requirements
>
> If you're using Swift 6, you'll need to implement the `YunoPaymentDelegate` protocol with specific concurrency considerations. See [Swift 6 Concurrency](#swift-6-concurrency) at the end of this guide.

## Step 3: Mount the SDK

Choose your mounting option based on your integration needs:

### Option A: Automatic Payment Method Display

Use `getPaymentMethodViewAsync()` to display all available payment methods automatically. First, implement the `YunoPaymentFullDelegate` protocol:

```swift
protocol YunoPaymentFullDelegate: YunoPaymentDelegate {
    func yunoDidSelect(paymentMethod: YunoSDK.PaymentMethodSelected)
    func yunoDidUnenrollSuccessfully(_ success: Bool)
    func yunoUpdatePaymentMethodsViewHeight(_ height: CGFloat)
}

class ViewController: UIViewController, YunoPaymentFullDelegate {
    // ... YunoPaymentDelegate implementation ...

    func yunoDidSelect(paymentMethod: YunoSDK.PaymentMethodSelected) {
        print("Payment method selected: \(paymentMethod.paymentMethodType)")
    }

    func yunoDidUnenrollSuccessfully(_ success: Bool) {
        if success {
            print("Payment method removed successfully")
        }
    }

    func yunoUpdatePaymentMethodsViewHeight(_ height: CGFloat) {
        // Update container height if needed
    }
}
```

Then call `getPaymentMethodViewAsync()` to retrieve the payment methods view:

```swift
let paymentMethodsView = await Yuno.getPaymentMethodViewAsync(delegate: self)

// Add the view to your UI
// For UIKit:
view.addSubview(paymentMethodsView)

// For SwiftUI:
// Use the returned view in your SwiftUI body
```

The SDK automatically returns the correct view type:
* **UIKit**: Returns a `UIView`
* **SwiftUI**: Returns a `some View`

### Option B: Custom Payment Method Display

You control which payment method to display. First, fetch available methods from the API, display them in your UI, then mount the selected method.

**Step 1: Fetch available payment methods**

Call the API to retrieve payment methods available for the checkout session:

```swift
// Backend API call
GET /v1/checkout/sessions/{checkout_session}/payment-methods

// Example response
{
  "payment_methods": [
    {
      "type": "CARD",
      "name": "Credit/Debit Card",
      "supported": true
    },
    {
      "type": "PIX",
      "name": "PIX",
      "supported": true
    }
  ]
}
```

**Step 2: Display payment methods in your UI**

Present the payment methods to your customer and capture their selection.

**Step 3: Mount the selected payment method**

```swift
let paymentSelected = PaymentMethodSelected(
    paymentMethodType: "CARD", // User's selection
    vaultedToken: nil // Optional: for enrolled methods
)

Yuno.startPaymentLite(
    with: self,
    paymentSelected: paymentSelected,
    showPaymentStatus: true
)
```

See the [Payment Types](ref:payment-type-list) page for the complete list of payment method types.

### Option C: Seamless Flow

Simplified payment flow with automatic backend payment creation:

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

// Or using callbacks
Yuno.startPaymentSeamlessLite(
    with: seamlessParams,
    paymentSelected: paymentSelected,
    showPaymentStatus: true,
    callback: { result in
        // Handle result
    }
)
```

> 📘 Seamless SDK Note
>
> The Seamless SDK automatically handles payment creation on the backend. You still receive the payment result through the callback or return value, but you don't need to call the Create Payment API manually.

## Step 4: Start the Payment

**For Automatic Display (Option A):**

After displaying the payment methods, call `startPayment()`:

```swift
Yuno.startPayment(showPaymentStatus: true)
```

**For Custom Display (Option B):**

The payment starts automatically when you call `startPaymentLite()`.

**For Seamless Flow (Option C):**

The payment starts automatically when you call `startPaymentSeamlessLite()`.

## Step 5: Create the Payment

When the SDK generates a one-time token (OTT), it calls your `yunoCreatePayment` delegate method. Create the payment on your backend using the [Create Payment endpoint](ref:create-payment):

```swift
func yunoCreatePayment(with token: String) {
    // Call your backend to create the payment
    createPaymentOnBackend(token: token) { result in
        switch result {
        case .success:
            // Payment created successfully
            // Call continuePayment() if needed
            Yuno.continuePayment()
        case .failure(let error):
            // Handle error
            print("Payment creation failed: \(error)")
        }
    }
}
```

In your backend, call the Create Payment endpoint:

```http
POST /v1/payments

{
  "payment_method": {
    "token": "9ee44ac7-9134-4598-ae28-a26fec03099d"
  },
  "checkout_session": "438413b7-4921-41e4-b8f3-28a5a0141638"
}
```

> 🚧 ContinuePayment Method Required
>
> Yuno **requires** you integrate the `continuePayment()` method after the payment is created because certain asynchronous payment methods require additional customer action to complete. The API will inform you via the `sdk_action_required` field (set to `true`). The `continuePayment()` function will display additional screens to customers where they can complete the payment.

```swift
Yuno.continuePayment()
```

## Step 6: Handle External Browser Return (Optional)

> ❗ Deep Links and Mercado Pago Checkout Pro
>
> This step is only required if you're using a payment method that relies on deep links or Mercado Pago Checkout Pro. If your payment methods don't use deep links, you can skip this step.

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

## Step 7: Handle Payment Result

The SDK returns the payment result through the `yunoPaymentResult(_:)` delegate method:

```swift
func yunoPaymentResult(_ result: Yuno.Result) {
    switch result {
    case .succeeded:
        print("Payment succeeded")
        // Navigate to success screen
    case .fail:
        print("Payment failed")
        // Show error message
    case .processing:
        print("Payment is processing")
        // Show processing message
    case .reject:
        print("Payment was rejected")
        // Show rejection message
    case .userCancell:
        print("User canceled payment")
        // Handle cancellation
    case .internalError:
        print("Internal error occurred")
        // Show error message
    }
}
```

### Payment States

| State | Description | Action Required |
|-------|-------------|-----------------|
| `succeeded` | Payment completed successfully | No |
| `fail` | Payment failed due to validation, network, or technical issues | Yes - Investigate and retry |
| `processing` | Payment in progress, awaiting approval | No |
| `reject` | Payment rejected (insufficient funds, fraud detection, etc.) | Yes - Inform user and suggest actions |
| `internalError` | Unexpected internal error occurred | Yes - Technical intervention required |
| `userCancell` | User canceled the payment | No |

### Payment Status Validation

#### Sync Payment Methods (Apple Pay)

For synchronous payment methods like Apple Pay, when a user cancels before PSP response:

* **SDK Status**: Returns `userCancell` (CANCELLED_BY_USER)
* **Backend Payment Status**: Remains `PENDING` until PSP timeout or merchant cancellation
* **Important**: The SDK will not return `reject` or `processing` in this scenario

#### Async Payment Methods (PIX, QR codes)

For asynchronous payment methods like PIX, when a user closes the QR window:

* **SDK Status**: Returns `PENDING`, optionally with sub-status `CLOSED_BY_USER`
* **Backend Payment Status**: Remains `PENDING` and QR code remains valid until expiry
* **Checkout Session Reuse**: Re-opening the same session can display the same valid QR code
* **No Automatic Cancellation**: Payment is not automatically canceled

#### Expired Async Payments

If a PIX QR code expires naturally:

* **Backend Status**: Updated to `EXPIRED`
* **SDK Status**: Callbacks and polling endpoints return `EXPIRED` consistently

## Alternative: Headless Integration (Advanced)

For complete UI control, use the Headless Integration approach where you build your own payment UI and handle tokenization manually:

```swift
// Step 1: Initialize Headless API client
let apiClientPayment = Yuno.apiClientPayment(
    countryCode: "BR",
    checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638"
)

// Step 2: Collect payment information in your custom UI

// Step 3: Generate token with card data
let tokenCollectedData = TokenCollectedData(
    checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
    paymentMethod: CollectedData(
        type: "CARD",
        vaultedToken: nil,
        card: CardData(
            save: true,
            detail: CardData.Detail(
                number: "4111111111111111",
                expirationMonth: 12,
                expirationYear: 25,
                securityCode: "123",
                holderName: "Andrea",
                type: .credit
            )
        )
    )
)

do {
    let result = try await apiClientPayment.generateToken(data: tokenCollectedData)
    // Extract token from result and create payment
    if let token = result["token"] as? String {
        // Call Create Payment API
    }
} catch {
    print("Token generation failed: \(error)")
}
```

**When to use Headless:**
* You need complete control over the entire payment UI
* You have specific design requirements that can't be met with SDK components
* You're building a highly customized checkout experience

> 📘 Learn More
>
> For complete Headless Integration documentation, see [Headless Integration Pattern](doc:new-headless-integration-pattern).

## Vaulted Token Payments

Use previously enrolled payment methods by passing the `vaultedToken`:

```swift
let paymentSelected = PaymentMethodSelected(
    paymentMethodType: "CARD",
    vaultedToken: "stored-token-here"
)

Yuno.startPaymentLite(
    with: self,
    paymentSelected: paymentSelected,
    showPaymentStatus: true
)
```

## Save Cards During Payment

Enable card saving during the payment flow by setting `saveCardEnabled` in `YunoConfig`:

```swift
let config = YunoConfig(
    saveCardEnabled: true
)

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: config,
    callback: { _ in }
)
```

When enabled, a "Save card" checkbox appears in the card form during payment.

## Render Mode Integration (Advanced)

For advanced UI control while retaining SDK functionality, use the Render Mode:

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

// Step 3: Display in your UI
if let formView = formView {
    VStack {
        Text("Payment Information")
        formView
        Button("Pay") {
            paymentFlow.submitForm()
        }
    }
}

// Step 4: Handle token and continue payment
func yunoCreatePayment(with token: String, information: [String: Any]) {
    createPaymentInBackend(token: token) { [weak self] success in
        if success {
            Task {
                let additionalView = await self?.paymentFlow?.continuePayment()
                if let additionalView = additionalView {
                    // Display 3DS or additional verification views
                }
            }
        }
    }
}
```

### YunoPaymentRenderFlowProtocol Methods

* **`formView()`**: Returns the payment form view if required, otherwise `nil`
* **`submitForm()`**: Submits the form and triggers token generation
* **`continuePayment()`**: Displays additional views (e.g., 3DS authentication) if needed

## Supported Languages

| Code | Language |
|------|----------|
| `en` | English |
| `es` | Spanish |
| `pt` | Portuguese |
| `fr` | French |
| `it` | Italian |
| `de` | German |
| `pl` | Polish |
| `ru` | Russian |
| `tr` | Turkish |
| `nl` | Dutch |
| `sv` | Swedish |
| `ko` | Korean |
| `ja` | Japanese |
| `zh-CN` | Chinese (Simplified) |
| `zh-TW` | Chinese (Traditional) |
| `vi` | Vietnamese |
| `th` | Thai |
| `ms` | Malay |
| `id` | Indonesian |
| `fil` | Filipino |

## Additional Resources

* **[iOS Flow Complementary Features](doc:new-ios-sdk-complementary-features)**: Configuration options and UI customization
* **[Enrollment Integration](doc:new-ios-sdk-enrollment-integration)**: Save payment methods for future use
* **[Release Notes](doc:release-notes-ios)**: Latest SDK updates

## Demo Application

In addition to the documentation, you can access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-ios) for a complete implementation of Yuno iOS SDKs.

## Swift 6 Concurrency

Swift 6 introduces stricter concurrency requirements that affect how you implement the `YunoPaymentDelegate` protocol.

> 📘 Understanding Concurrency in Swift 6
>
> Concurrency is the ability of your app to manage multiple tasks simultaneously. With Swift 6, concurrency rules have become more stringent to enhance app stability and prevent crashes.

### The Problem

With Swift 6, protocols that inherit from `Sendable` require all their implementations to be thread-safe. This generates warnings when implementing the delegate in classes marked as `@MainActor`.

### Merchant's Responsibility

It's the merchant's responsibility to handle concurrency according to their implementation. Below are three approaches you can use:

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

#### Option 3: For Non-MainActor Classes

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
}
```

### Important Considerations

* **`MainActor.assumeIsolated`**: Only use when you guarantee it's called from `MainActor`
* **`nonisolated`**: Means it can be accessed from any thread, so it must be thread-safe
* **`viewController`**: Remains as `@MainActor` because UI components must run on the main thread

## Error handling

Handle errors returned by the SDK in your app (e.g. failed payments, validation errors). For HTTP status and response codes, see [Status and response codes](https://docs.y.uno/reference/status-and-response-codes) in the API reference. To refund a payment, see [Refund payments](https://docs.y.uno/docs/refund-payments) and the [Refund payment](https://docs.y.uno/reference/refund-payment) API.

