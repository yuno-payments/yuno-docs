---
title: Copy of Enrollment Flows
deprecated: false
hidden: true
metadata:
  robots: index
---
The iOS SDK makes it easy to implement enrollment flows for saving payment methods to a customer account.

Include the library in your project by following the same steps as in [payment flows](payment-flows-ios#include-the-library-in-your-project). This lets you complete [step 2](#step-2-include-the-library-in-your-project) and continue with the enrollment flow below.

## Additional resources

- See [Choose the right integration for you](choose-your-integration) if you're unsure which flow to follow.
- Access the [Release notes](release-notes-ios) or the [Yuno iOS SDK repository](https://github.com/yuno-payments/yuno-sdk-ios) to verify the latest SDK version available.

- [Lite Enrollment (iOS)](#lite-enrollment-ios): Lightweight enrollment with UI control and backend support
- [Headless Enrollment (iOS)](#headless-enrollment-ios): Full enrollment experience customization without requiring PCI compliance

## Requirements

* CocoaPods or [Swift Package Manager](https://www.swift.org/package-manager/)
* iOS 14.0 or later
* Active Yuno account; API credentials (obtain from the [Yuno Dashboard](https://dashboard.y.uno/) → **Developers** > **Credentials**)
* Create a customer using the [Create customer endpoint](ref:create-customer) before enrolling

## Parameters

For the full list of parameters, see the [iOS SDK Common Reference](ios-sdk-common-reference).

| Parameter | Description |
|-----------|-------------|
| `customerSession` | Customer session ID from Create customer session API. Required. |
| `countryCode` | ISO country code (e.g. `BR`). Required. |
| `language` | Language code for the UI. Optional. |
| `viewController` | UIViewController that presents the enrollment flow. Required for delegate. |
| `yunoEnrollmentResult(_:)` | Delegate: enrollment finished with result. |
| `YunoConfig` (initialize) | Optional: appearance, saveCardEnabled, keepLoader. See Common Reference. |

## Lite Enrollment (iOS)

The Yuno Lite iOS SDK provides enrollment with pre-built UI, card enrollment, status handling, and basic error management. Use it when you need minimal customization and a ready-to-use enrollment flow. See [Requirements](#requirements) above.

### Step 1: Create a customer and customer session

Create a customer in Yuno's system using the [Create customer endpoint](ref:create-customer) before enrolling payment methods. This endpoint will return a `customer_id` that you'll use to associate enrolled payment methods with the specific customer.

Then create a customer session using the [Create Customer Session](ref:create-customer-session) endpoint. The session information will be used when calling the enrollment methods.

```json
POST /v1/customer-session

{
  "country": "BR",
  "customer_id": "6c85a4e3-0a6c-423d-a12a-10045320ab4a"
}
```

The response includes a `customer_session` ID that you'll use in the next step.

### Step 2: Include the library in your project

Including the library in your project is done in the same way as in payment flows. Follow the steps in [Include the library in your project](payment-flows-ios#include-the-library-in-your-project) there.

#### CocoaPods

```ruby
pod 'YunoSDK', '~> 2.11.1'
```

Run:

```ruby
pod install
```

#### Swift Package Manager

```swift
dependencies: [
    .package(url: "https://github.com/yuno-payments/yuno-sdk-ios.git", .upToNextMajor(from: "2.11.1"))
]
```

Check the [Release notes](release-notes-ios) or [Yuno iOS SDK repository](https://github.com/yuno-payments/yuno-sdk-ios) for the current SDK version.

### Step 3: Initialize SDK with the public key

Initialize the SDK:

1. Get your Public API Key from the [Yuno Dashboard](https://dashboard.y.uno/)
2. Initialize the SDK by calling `Yuno.initialize()` with your API key:

```swift
import YunoSDK

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: YunoConfig(),
    callback: { (value: Bool) in }
)
```

Use the `YunoConfig` data class to customize the SDK's behavior. Include this configuration when calling `Yuno.initialize()`. For example:

```swift
struct YunoConfig {
    var appearance: Appearance? = nil
    var saveCardEnabled: Bool = false
    var keepLoader: Bool = false
}
```

### Step 4: Implement the enrollment delegate

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
        case .userCancelled:
            print("User canceled")
        case .internalError:
            print("Internal error")
        }
    }
}
```

#### Options

| Parameter | Description |
|-----------|-------------|
| `customerSession` | The unique identifier for the customer session. |
| `countryCode` | Country code where the enrollment is performed. See [Country Coverage](country-coverage) for supported countries. |
| `language` | Language code for the enrollment forms (e.g., `"en"`, `"es"`, `"pt"`). See [Supported languages](languages-supported). |
| `viewController` | The `UIViewController` used to present the enrollment flow. Required for proper UI presentation. |
| `yunoEnrollmentResult(_:)` | Called when the enrollment process completes with the final result. |

### Step 5: Start the enrollment process

Call the `enrollPayment()` method to display the enrollment flow:

```swift
func startEnrollment() {
    Yuno.enrollPayment(with: self, showPaymentStatus: true)
}
```

The SDK presents a full-screen `UIViewController` modally using the `viewController` provided in your delegate. In SwiftUI, wrap a `UIViewController` and return it via the `viewController` property.

#### Options

| Parameter | Type | Description |
|-----------|------|-------------|
| `delegate` | `YunoEnrollmentDelegate` | The delegate object that handles enrollment callbacks. |
| `showPaymentStatus` | `Bool` | Whether to display status views during the enrollment process. When `true`, the SDK displays default status screens. When `false`, you handle status display through callbacks. |

In SwiftUI, wrap a `UIViewController` and return it from the `viewController` property so the SDK can present the UI.

### Step 6: Handle deep link return (Optional)

Only needed when the enrollment flow uses deep links. If your payment method does not use deep links, skip this step. Otherwise, handle the return in your `AppDelegate`:

```swift
func application(_ app: UIApplication,
                 open url: URL,
                 options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {

    guard url.scheme == "yunoexample" else { return false }

    return Yuno.receiveDeeplink(url, showStatusView: true)
}
```

Make sure the `url.scheme` matches the `callback_url` used when creating the `customer_session`.

### Step 7: Handle enrollment result

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
    case .userCancelled:
        print("User canceled")
        // Handle cancellation
    case .internalError:
        print("Internal error occurred")
        // Show error message
    }
}
```

#### Enrollment Result States

| State | Description | Action Required |
|-------|-------------|-----------------|
| `succeeded` | Enrollment completed successfully | No |
| `fail` | Enrollment failed due to validation or technical issues | Yes - Investigate and retry |
| `processing` | Enrollment in progress, awaiting approval | No |
| `reject` | Enrollment rejected (invalid data, fraud detection, etc.) | Yes - Inform user and suggest actions |
| `internalError` | Unexpected internal error occurred | Yes - Technical intervention required |
| `userCancelled` | User canceled the enrollment | No |

`Yuno.Result` does not include tokens or error messages; it only returns a high-level status.

### Complementary features

For styling, themes, form options, and additional configurations, see [SDK customizations](ios-customizations).

## Headless Enrollment (iOS)

Headless (iOS) lets you enroll payment methods and tokenize cards for future use, with full control over the UI and direct API access. See [Requirements](#requirements) above.

### Step 1: Create a customer and customer session

Create a customer using the [Create Customer](ref:create-customer) endpoint before enrolling payment methods. Then create a new `customer_session` using the [Create Customer Session](ref:create-customer-session) endpoint and store the `customer_session` ID for the enrollment calls.

```json
POST /v1/customer-session

{
  "country": "BR",
  "customer_id": "6c85a4e3-0a6c-423d-a12a-10045320ab4a"
}
```

### Step 2: Add the SDK to your project

Including the library in your project is done in the same way as in payment flows. Follow the steps in [Include the library in your project](payment-flows-ios#include-the-library-in-your-project) there.

#### CocoaPods

```ruby
pod 'YunoSDK', '~> 2.11.1'
```

Run:

```ruby
pod install
```

#### Swift Package Manager

```swift
dependencies: [
    .package(url: "https://github.com/yuno-payments/yuno-sdk-ios.git", .upToNextMajor(from: "2.11.1"))
]
```

### Step 3: Initialize Headless with the public key

Retrieve your public API keys from the [Yuno Dashboard](https://dashboard.y.uno/). Then initialize the SDK:

```swift
import YunoSDK

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY"
)
```

### Step 4: Start the enrollment process

Use `Yuno.apiClientEnroll` to configure the headless enrollment client:

```swift
var apiClientEnroll: YunoEnrollHeadless?

apiClientEnroll = try Yuno.apiClientEnroll(
    countryCode: "CO",
    customerSession: "eec6578e-ac2f-40a0-8065-25b5957f6dd3"
)
```

### Step 5: Generate a vaulted token

After collecting all user information, create a `vaulted_token` using `apiClientEnroll.continueEnrollment(data:)`. Use `do/catch` to handle errors:

```swift
let enrollmentCollectedData: EnrollmentCollectedData = EnrollmentCollectedData(
    customerSession: "eec6578e-ac2f-40a0-8065-25b5957f6dd3",
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
        ),
        customer: Customer()
    )
)

let result = try await apiClientEnroll.continueEnrollment(data: enrollmentCollectedData)
```

After enrolling the new card, you receive the `vaulted_token` and enrollment status in the result, which you can use for future payments or to update your customer records.

**When to use Headless Enrollment:**
- You need complete control over the enrollment UI
- You have specific design requirements
- You're building a highly customized enrollment experience

### Complementary features

For styling, themes, form options, and additional configurations, see [SDK customizations](ios-customizations).

## Common reference

For full parameter and customization details, see the [iOS SDK Common Reference](ios-sdk-common-reference).