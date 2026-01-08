---
title: New - iOS Flow Enrollment Integration
deprecated: false
hidden: true
metadata:
  robots: index
---
This guide walks you through saving payment methods for future use in your iOS application using the Yuno SDK enrollment feature.

> 📘 Prerequisites
>
> Before starting, make sure you've [installed and initialized the SDK](ios-sdk-getting-started).

## Enrollment vs. Save During Payment

There are **two ways** to save payment methods:

### Option 1: Separate Enrollment (This Page)

Use the enrollment workflow when:

* You want to save payment methods WITHOUT processing a payment
* You're setting up customer accounts before first purchase
* You're building a payment method management interface
* You need to enroll alternative payment methods (not just cards)

**Uses:** Customer session + enrollment API

### Option 2: Save During Payment

Use save-during-payment when:

* Customer is already making a purchase
* You want to save cards only (simpler approach)
* You don't need a separate enrollment UI

**Uses:** `saveCardEnabled: true` in `YunoConfig`

**[Learn about save-during-payment →](ios-sdk-payment-integration#save-cards-during-payment)**

> 📘 For Cards: Save-during-payment is usually easier. Use separate enrollment only when you need to save payment methods before a purchase.

***

## Create Required Sessions

Before enrolling a payment method, you need:

### Step 1: Create a Customer

Use the [Create Customer](ref:create-customer) endpoint to create a customer. You'll receive a customer `id` in the response.

### Step 2: Create a Customer Session

Use the customer `id` with the [Create Customer Session](ref:create-customer-session) endpoint to get a `customer_session`.

> 📘 New Session Per Enrollment
>
> You need a new `customer_session` every time you enroll a new payment method.

### Step 3: Create an Enrollment Payment Method Object

Create an enrollment payment method object using the [Enroll Payment Method](ref:enroll-payment-method-checkout) endpoint. Define which payment method your customer can enroll (e.g., CARD).

> 📘 Card Verification
>
> To verify cards with zero value authorization before enrollment, include the `verify` object when creating the payment method object.

***

## Implementation

### Step 1: Implement the Enrollment Delegate

Your ViewController needs to adopt the `YunoEnrollmentDelegate` protocol:

```swift
protocol YunoEnrollmentDelegate: AnyObject {
    var customerSession: String { get }
    var countryCode: String { get }
    var language: String? { get }
    var viewController: UIViewController? { get }

    func yunoEnrollmentResult(_ result: Yuno.Result)
}

class ViewController: UIViewController, YunoEnrollmentDelegate {
    
    var customerSession: String {
        return "YOUR_CUSTOMER_SESSION"
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
    
    func yunoEnrollmentResult(_ result: Yuno.Result) {
        switch result {
        case .succeeded:
            print("Enrollment successful")
        case .fail:
            print("Enrollment failed")
        case .processing:
            print("Enrollment still processing")
        case .reject:
            print("Enrollment rejected")
        case .userCancell:
            print("User canceled")
        case .internalError:
            print("Internal error")
        }
    }
}
```

#### Delegate Parameters

| Parameter                         | Description                                                                                                                                                   |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `customerSession`                 | The current enrollment's customer session.                                                                                                                    |
| `countryCode`                     | Country code for the enrollment process. See [Country coverage](doc:country-coverage-yuno-sdk) for the complete list.                                         |
| `language`                        | Language for enrollment forms: `es`, `en`, `pt`, `fil`, `id`, `ms`, `th`, `zh-TW`, `zh-CN`, `vi`, `fr`, `pl`, `it`, `de`, `ru`, `tr`, `nl`, `sv`, `ko`, `ja`. |
| `viewController`                  | The `UIViewController` used to present the enrollment flow. Must supply a visible controller for the SDK to present its UI.                                   |
| `yunoEnrollmentResult(_ result:)` | Called when the enrollment process completes with the final result.                                                                                           |

### Step 2: Start Enrollment

Call the enrollment method in response to user interactions (e.g., button press):

```swift
func startEnrollment() {
    Yuno.enrollPayment(with: self, showPaymentStatus: true)
}
```

The `showPaymentStatus` parameter determines whether to display status screens during enrollment.

> 📘 UIKit Integration
>
> `Yuno.enrollPayment()` presents a full-screen `UIViewController` modally using the `viewController` from your delegate. For SwiftUI, wrap a `UIViewController` and return it via the `viewController` property.

***

## Handle Deep Links (Optional)

> ❗️ Deep Link Enrollment
>
> This step is only required if you're enrolling in a payment method that uses deep links (e.g., PayPal, some alternative payment methods). If you're only enrolling cards, you can skip this step.

Some payment methods require a deep link to return to your app. Add this to your `AppDelegate`:

```swift
func application(_ app: UIApplication, 
                 open url: URL, 
                 options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {

  guard url.scheme == "yunoexample" else { return false }
  return Yuno.receiveDeeplink(url, showStatusView: true)
}
```

Make sure `url.scheme` matches the `callback_url` you provided when creating the `customer_session`.

***

## Enrollment Results

The SDK returns one of the following enrollment states via `yunoEnrollmentResult(_ result:)`:

```swift
enum Result {
    case succeeded    // Enrollment successful
    case fail         // Enrollment failed
    case processing   // Enrollment still processing
    case reject       // Enrollment rejected
    case userCancell  // User canceled
    case internalError // Internal error
}
```

<Callout icon="📘" theme="info">
  `Yuno.Result` does not include tokens or error messages. You'll only get a high-level status to help you guide the user experience.
</Callout>

> 📘 Using Webhooks for Enrollment Status
>
> Consider using the enrollment status received via [Webhooks](webhooks). Yuno recommends always using this status to make business decisions on your platform.

***

## Render Mode Integration (Enrollment)

The render mode offers enhanced UI flexibility for enrollment, letting you integrate the enrollment flow within your own views.

### Main Function: `startEnrollmentRenderFlow`

```swift
@MainActor static func startEnrollmentRenderFlow(
    with delegate: YunoEnrollmentDelegate
) async -> some YunoEnrollmentRenderFlowProtocol
```

### YunoEnrollmentRenderFlowProtocol

```swift
func formView(with delegate: YunoEnrollmentDelegate) async -> AnyView?
func submitForm()
var needSubmit: Bool { get }
```

| Method/Property | Description                                                                    |
| --------------- | ------------------------------------------------------------------------------ |
| `formView`      | Returns `AnyView` with the enrollment form if UI is required; otherwise `nil`. |
| `submitForm`    | Triggers validations and proceeds with enrollment.                             |
| `needSubmit`    | Indicates whether you should render a submit button.                           |

### Implementation Example

```swift
// Step 1: Create enrollment flow instance
let enrollmentFlow = await Yuno.startEnrollmentRenderFlow(with: self)

// Step 2: Get and display the form
let formView = await enrollmentFlow.formView(with: self)

if let formView = formView {
    VStack {
        Text("Enroll Payment Method")
        formView

        if enrollmentFlow.needSubmit {
            Button("Enroll") {
                enrollmentFlow.submitForm()
            }
        }
    }
}

// Step 3: Handle result in delegate
func yunoEnrollmentResult(_ result: Yuno.Result) {
    // Handle enrollment result
}
```

***

## Card Form Options

When presenting enrollment, you can choose between two card form render modes:

```swift
let config = YunoConfig(
    cardFormType: .oneStep // or .stepByStep
)

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: config,
    callback: { (value: Bool) in }
)
```

<Image align="center" border={false} src="https://files.readme.io/ff9a74d50d3a8d3a4e550be1b917832bd6b8daa28cc4249d9ec22edef2f410bc-Full_SDK_ios.png" />

***

## Loader Configuration

Control the loader through SDK configuration options:

```swift
let config = YunoConfig(
    keepLoader: true // Manually control loader dismissal
)
```

If `keepLoader` is `true`, you must call `Yuno.hideLoader()` to dismiss the loader.

***

## SDK Customizations

Customize the SDK appearance to match your brand. See the [SDK Customizations](../docs/sdk-customizations-ios) guide for details on:

* Color schemes
* Fonts
* Button styles
* Input field styling

***

## Swift 6 Concurrency

If you're using Swift 6, you'll need to implement the `YunoEnrollmentDelegate` protocol with specific concurrency considerations.

> 📘 Understanding Concurrency in Swift 6
>
> Swift 6 introduces stricter concurrency requirements for thread safety. Protocols that inherit from `Sendable` require all implementations to be thread-safe.

### The Problem

With Swift 6, protocols that inherit from `Sendable` generate warnings when implementing the delegate in classes marked as `@MainActor`.

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
class MyViewController: UIViewController, YunoEnrollmentDelegate {
    
    private let _countryCode = "CO"
    private let _language = "EN"
    
    nonisolated var countryCode: String { _countryCode }
    nonisolated var language: String? { _language }
    nonisolated var customerSession: String { _customerSession }
    
    nonisolated func yunoEnrollmentResult(_ result: Yuno.Result) {
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
class MyViewController: UIViewController, YunoEnrollmentDelegate {
    
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
class MyService: YunoEnrollmentDelegate {
    
    let countryCode: String
    let language: String?
    let customerSession: String
    let viewController: UIViewController?
    
    init(countryCode: String, language: String?, customerSession: String, viewController: UIViewController?) {
        self.countryCode = countryCode
        self.language = language
        self.customerSession = customerSession
        self.viewController = viewController
    }
    
    func yunoEnrollmentResult(_ result: Yuno.Result) {
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

* **[Process Payments](ios-sdk-payment-integration)** - Use enrolled payment methods for payments
* **[SDK Customizations](../docs/sdk-customizations-ios)** - Match the SDK appearance to your brand

> 📘 Demo App
>
> For complete implementation examples, visit the [Yuno iOS SDK repository](https://github.com/yuno-payments/yuno-sdk-ios).