---
title: New - iOS Flow Enrollment Integration
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: iOS Flow Enrollment Integration
  description: >-
    Save payment methods for future use with the iOS Flow enrollment, including automatic and headless enrollment options.
  robots: index
---

This guide covers saving payment methods for future use with the iOS Flow enrollment.

> 📘 Prerequisites
>
> Before starting, make sure you've [installed and initialized the SDK](doc:new-ios-sdk-getting-started).

## Overview

Enrollment allows customers to save payment methods for future transactions without processing a payment. This is useful for:

* Setting up customer accounts before first purchase
* Building a payment method management interface
* Enrolling alternative payment methods (not just cards)
* Subscription or recurring payment scenarios

## Enrollment vs. Save During Payment

There are **two ways** to save payment methods:

### Option 1: Separate Enrollment (This Page)

Use the enrollment workflow when:
* You want to save payment methods **without** processing a payment
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

**[Learn about save-during-payment →](doc:new-ios-sdk-payment-integration#save-cards-during-payment)**

> 📘 For Cards
>
> Save-during-payment is usually easier. Use separate enrollment only when you need to save payment methods before a purchase.

## Step 1: Create a Customer Session

Before starting the enrollment flow, create a customer session on your backend using the [Create Customer Session](ref:create-customer-session) endpoint:

```json
POST /v1/customer-session

{
  "country": "BR",
  "customer_id": "6c85a4e3-0a6c-423d-a12a-10045320ab4a"
}
```

The response includes a `customer_session` ID that you'll use in the next step.

## Step 2: Implement the Enrollment Delegate

Create a class that adopts the `YunoEnrollmentDelegate` protocol:

```swift
protocol YunoEnrollmentDelegate: AnyObject {
    var customerSession: String { get }
    var countryCode: String { get }
    var language: String? { get }
    var viewController: UIViewController? { get }

    func yunoEnrollmentResult(_ result: Yuno.Result)
}

class ViewController: UIViewController, YunoEnrollmentDelegate {
    var customerSession: String { "cus_ses_123456" }
    var countryCode: String { "BR" }
    var language: String? { "en" }
    var viewController: UIViewController? { self }

    func yunoEnrollmentResult(_ result: Yuno.Result) {
        switch result {
        case .succeeded:
            print("Enrollment successful")
        case .fail:
            print("Enrollment failed")
        case .processing:
            print("Enrollment processing")
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

### Parameters

| Parameter | Description |
|-----------|-------------|
| `customerSession` | The unique identifier for the customer session. |
| `countryCode` | Country code where the enrollment is performed. See [Country Coverage](doc:quickstart) for supported countries. |
| `language` | Language code for the enrollment forms (e.g., `"en"`, `"es"`, `"pt"`). |
| `viewController` | The `UIViewController` used to present the enrollment flow. Required for proper UI presentation. |
| `yunoEnrollmentResult(_:)` | Called when the enrollment process completes with the final result. |

## Step 3: Start the Enrollment Process

Call the `enrollPayment()` method to display the enrollment flow:

```swift
func startEnrollment() {
    Yuno.enrollPayment(with: self, showPaymentStatus: true)
}
```

The SDK presents a full-screen `UIViewController` modally using the `viewController` provided in your delegate.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `delegate` | `YunoEnrollmentDelegate` | The delegate object that handles enrollment callbacks. |
| `showPaymentStatus` | `Bool` | Whether to display status views during the enrollment process. |

> 📘 SwiftUI Integration
>
> In SwiftUI, wrap a `UIViewController` and return it via the `viewController` property to allow the SDK to present the UI.

## Step 4: Handle Deep Link Return (Optional)

> ❗ Deep Link Enrollment
>
> This feature is only used if you enroll in a payment method that executes deep links. If your payment method doesn't use deep links, you can skip this step.

If you use a payment method that requires a deep link to return to your app, handle it in your `AppDelegate`:

```swift
func application(_ app: UIApplication,
                 open url: URL,
                 options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {

    guard url.scheme == "yunoexample" else { return false }

    return Yuno.receiveDeeplink(url, showStatusView: true)
}
```

Make sure the `url.scheme` matches the `callback_url` used when creating the `customer_session`.

## Step 5: Handle Enrollment Result

The SDK calls your `yunoEnrollmentResult(_:)` delegate method with the final status:

```swift
func yunoEnrollmentResult(_ result: Yuno.Result) {
    switch result {
    case .succeeded:
        print("Enrollment successful")
        // Navigate to success screen or update UI
    case .fail:
        print("Enrollment failed")
        // Show error message
    case .processing:
        print("Enrollment still processing")
        // Show processing message
    case .reject:
        print("Enrollment rejected")
        // Show rejection message
    case .userCancell:
        print("User canceled")
        // Handle cancellation
    case .internalError:
        print("Internal error occurred")
        // Show error message
    }
}
```

### Enrollment Result States

| State | Description | Action Required |
|-------|-------------|-----------------|
| `succeeded` | Enrollment completed successfully | No |
| `fail` | Enrollment failed due to validation or technical issues | Yes - Investigate and retry |
| `processing` | Enrollment in progress, awaiting approval | No |
| `reject` | Enrollment rejected (invalid data, fraud detection, etc.) | Yes - Inform user and suggest actions |
| `internalError` | Unexpected internal error occurred | Yes - Technical intervention required |
| `userCancell` | User canceled the enrollment | No |

> 📘 Note
>
> `Yuno.Result` does not include tokens or error messages. You'll only get a high-level status to help guide the user experience.

## Alternative: Headless Enrollment (Advanced)

For complete UI control, use the Headless Enrollment approach where you build your own enrollment UI:

```swift
// Step 1: Initialize Headless API client
let apiClientEnroll = Yuno.apiClientEnroll(
    countryCode: "BR",
    customerSession: "cus_ses_123456"
)

// Step 2: Collect payment information in your custom UI

// Step 3: Enroll payment method
let enrollCollectedData = EnrollCollectedData(
    customerSession: "cus_ses_123456",
    paymentMethod: CollectedData(
        type: "CARD",
        card: CardData(
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
    let result = try await apiClientEnroll.enrollPayment(data: enrollCollectedData)
    // Handle enrollment result
    if let success = result["success"] as? Bool, success {
        print("Enrollment successful")
    }
} catch {
    print("Enrollment failed: \(error)")
}

// Step 4: Continue enrollment if needed
if apiClientEnroll.shouldContinue {
    try await apiClientEnroll.continueEnrollment()
}
```

**When to use Headless Enrollment:**
* You need complete control over the enrollment UI
* You have specific design requirements
* You're building a highly customized enrollment experience

> 📘 Learn More
>
> For complete Headless Integration documentation, see [Headless Integration Pattern](doc:new-headless-integration-pattern).

## Render Mode Integration (Advanced)

For advanced UI control while retaining SDK functionality, use the Render Mode:

```swift
// Step 1: Create enrollment flow instance
let enrollmentFlow = await Yuno.startEnrollmentRenderFlow(with: self)

// Step 2: Get and display the form
let formView = await enrollmentFlow.formView(with: self)

// Step 3: Display in your UI
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
```

### YunoEnrollmentRenderFlowProtocol Methods

* **`formView()`**: Returns the enrollment form view if required, otherwise `nil`
* **`submitForm()`**: Triggers validations and proceeds with enrollment
* **`needSubmit`**: Indicates whether you should render a submit button

## Managing Enrolled Payment Methods

After enrollment, customers can view and manage their saved payment methods:

### List Enrolled Methods

Retrieve enrolled payment methods using the [List Payment Methods](ref:list-payment-methods) endpoint:

```http
GET /v1/vaulted-token?customer_id={customer_id}
```

### Delete Enrolled Methods

Remove enrolled payment methods using the [Delete Vaulted Token](ref:delete-vaulted-token) endpoint:

```http
DELETE /v1/vaulted-token/{vaulted_token}
```

Or allow users to unenroll directly in the SDK UI (available in automatic display mode).

## Card Verification

Some card networks require verification when enrolling payment methods. The SDK handles this automatically:

1. Customer enters card details
2. SDK initiates verification if required by the card network
3. Verification completes (may include 3DS challenge)
4. Card is enrolled upon successful verification

## Complementary Features

### Render Option

Choose the card form render style:

* **`ONE_STEP`**: All fields on one screen
* **`STEP_BY_STEP`**: Fields displayed across multiple steps

Set the `cardFormType` in `YunoConfig`:

```swift
let config = YunoConfig(
    cardFormType: .stepByStep
)

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: config,
    callback: { _ in }
)
```

### Loader Control

Control when the loader is displayed and hidden using the `keepLoader` option in `YunoConfig`:

```swift
let config = YunoConfig(
    keepLoader: true
)

// Hide loader manually when needed
Yuno.hideLoader()
```

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
* **[Payment Integration](doc:new-ios-sdk-payment-integration)**: Process payments with enrolled methods
* **[Release Notes](doc:release-notes-ios)**: Latest SDK updates

## Demo Application

In addition to the documentation, you can access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-ios) for a complete implementation of Yuno iOS SDKs.

## Swift 6 Concurrency

Swift 6 introduces stricter concurrency requirements that affect how you implement the `YunoEnrollmentDelegate` protocol.

### Option 1: Immutable Properties

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

### Option 2: Mutable Properties with `MainActor.assumeIsolated`

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

### Option 3: For Non-MainActor Classes

Best for background services or utility classes:

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
* **`nonisolated`**: Means it can be accessed from any thread, so it must be thread-safe
* **`viewController`**: Remains as `@MainActor` because UI components must run on the main thread

