---
title: New - iOS Flow Complementary Features
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: iOS Flow Complementary Features
  description: >-
    Configure and customize the iOS Flow with initialization options, UI customization, fraud prevention, and advanced features.
  robots: index
---

This guide covers optional configurations and features available in the iOS Flow, including initialization options, UI customization, and fraud prevention tools.

> 📘 Core Integration First
>
> Complete the core integration before configuring these features:
> * [Getting Started](doc:new-ios-sdk-getting-started)
> * [Payment Integration](doc:new-ios-sdk-payment-integration)
> * [Enrollment Integration](doc:new-ios-sdk-enrollment-integration)

## YunoConfig Options

Configure SDK behavior by passing a `YunoConfig` object when initializing Yuno:

```swift
Yuno.initialize(
    apiKey: "your-public-api-key",
    config: YunoConfig(
        cardFormType: .oneStep,
        appearance: customAppearance,
        saveCardEnabled: true,
        keepLoader: false,
        hideCardholderName: false
    ),
    callback: { (value: Bool) in
        print("SDK initialized: \(value)")
    }
)
```

### Available Configuration Options

```swift
final class YunoConfig {
    let cardFormType: CardFormType
    let appearance: Yuno.Appearance
    let saveCardEnabled: Bool
    let keepLoader: Bool
    let hideCardholderName: Bool
}
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `cardFormType` | `CardFormType` | `.oneStep` | Card form flow type. Options: `.oneStep` or `.stepByStep`. |
| `appearance` | `Yuno.Appearance` | Yuno default | Custom appearance configuration for the SDK UI. Allows you to match the SDK appearance to your brand. |
| `saveCardEnabled` | `Bool` | `false` | When `true`, displays a "Save card" checkbox during payment for future use. |
| `keepLoader` | `Bool` | `false` | When `true`, you must manually call `hideLoader()` to dismiss the loader. Useful for custom loading states. |
| `hideCardholderName` | `Bool` | `false` | When `true`, hides the cardholder name field in card forms. Merchant is responsible for ensuring cardholder name is provided when required by payment providers. |

### Card Form Types

#### ONE_STEP

All card fields displayed on a single screen:

* Card number
* Expiration date
* CVV
* Cardholder name (unless `hideCardholderName` is `true`)
* Document type and number (if required)

**Best for:** Quick checkout flows where users want to complete payment in one view.

```swift
let config = YunoConfig(cardFormType: .oneStep)
```

#### STEP_BY_STEP

Card fields displayed across multiple steps for a guided experience:

* **Step 1:** Card number
* **Step 2:** Expiration date and CVV
* **Step 3:** Cardholder name and additional info (if required)

**Best for:** Complex forms or when you want to guide users through each field.

```swift
let config = YunoConfig(cardFormType: .stepByStep)
```

### Save Card Enabled

When `saveCardEnabled` is set to `true`, a checkbox appears in the card form allowing customers to save their card for future payments:

```swift
let config = YunoConfig(
    cardFormType: .oneStep,
    saveCardEnabled: true
)

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: config,
    callback: { _ in }
)
```

The saved cards are then available as vaulted tokens for future transactions.

### Loader Control

Control when the SDK loader is displayed and hidden:

**Automatic (default):**

```swift
let config = YunoConfig(keepLoader: false)
```

The SDK automatically shows and hides the loader during API calls.

**Manual:**

```swift
let config = YunoConfig(keepLoader: true)

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: config,
    callback: { _ in }
)

// Later, hide the loader manually
Yuno.hideLoader()
```

Useful when you want to control loading states or display custom loaders.

### Hide Cardholder Name

Hide the cardholder name field in card forms:

```swift
let config = YunoConfig(
    cardFormType: .oneStep,
    hideCardholderName: true
)

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: config,
    callback: { _ in }
)
```

> ⚠️ Important
>
> Hiding the cardholder name field does not affect PAN, expiry, CVV collection, BIN logic, or 3DS/provider validations. The merchant is responsible for ensuring cardholder name is provided when required by their payment provider.

## UI Customization

The Yuno iOS SDK provides extensive UI customization through the `Yuno.Appearance` API, allowing you to match the SDK appearance to your brand.

### Custom Appearance

Create a custom appearance configuration:

```swift
let appearance = Yuno.Appearance()

// Primary color
appearance.primaryColor = UIColor(red: 0.42, green: 0.36, blue: 0.83, alpha: 1.0)

// Background colors
appearance.backgroundColor = .white
appearance.surfaceColor = UIColor(red: 0.96, green: 0.96, blue: 0.96, alpha: 1.0)

// Text colors
appearance.textColor = .black
appearance.textColorLight = UIColor(red: 0.4, green: 0.4, blue: 0.4, alpha: 1.0)

// Button styling
appearance.buttonBackgroundColor = appearance.primaryColor
appearance.buttonTextColor = .white
appearance.buttonCornerRadius = 8.0

// Input field styling
appearance.inputBackgroundColor = .white
appearance.inputBorderColor = UIColor(red: 0.8, green: 0.8, blue: 0.8, alpha: 1.0)
appearance.inputBorderColorFocused = appearance.primaryColor
appearance.inputTextColor = .black
appearance.inputCornerRadius = 6.0

// Error styling
appearance.errorColor = UIColor(red: 0.9, green: 0.2, blue: 0.2, alpha: 1.0)

// Font
if let customFont = UIFont(name: "YourCustomFont-Regular", size: 16) {
    appearance.font = customFont
}

let config = YunoConfig(
    cardFormType: .oneStep,
    appearance: appearance
)

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: config,
    callback: { _ in }
)
```

### Appearance Properties

#### Colors

| Property | Type | Description |
|----------|------|-------------|
| `primaryColor` | `UIColor` | Main brand color used for buttons, links, and accents |
| `backgroundColor` | `UIColor` | Main background color of the SDK views |
| `surfaceColor` | `UIColor` | Background color for cards and elevated surfaces |
| `textColor` | `UIColor` | Primary text color |
| `textColorLight` | `UIColor` | Secondary/light text color |
| `errorColor` | `UIColor` | Color used for error messages and validation warnings |

#### Buttons

| Property | Type | Description |
|----------|------|-------------|
| `buttonBackgroundColor` | `UIColor` | Button background color |
| `buttonTextColor` | `UIColor` | Button text color |
| `buttonCornerRadius` | `CGFloat` | Button corner radius in points |
| `buttonBorderWidth` | `CGFloat` | Button border width in points |
| `buttonBorderColor` | `UIColor` | Button border color |

#### Input Fields

| Property | Type | Description |
|----------|------|-------------|
| `inputBackgroundColor` | `UIColor` | Input field background color |
| `inputBorderColor` | `UIColor` | Input field border color (default state) |
| `inputBorderColorFocused` | `UIColor` | Input field border color (focused state) |
| `inputTextColor` | `UIColor` | Input field text color |
| `inputPlaceholderColor` | `UIColor` | Input field placeholder text color |
| `inputCornerRadius` | `CGFloat` | Input field corner radius in points |
| `inputBorderWidth` | `CGFloat` | Input field border width in points |

#### Typography

| Property | Type | Description |
|----------|------|-------------|
| `font` | `UIFont` | Base font for all text in the SDK |
| `fontBold` | `UIFont` | Bold font variant |
| `fontLight` | `UIFont` | Light font variant |

### Example: Dark Mode

```swift
let darkAppearance = Yuno.Appearance()

// Dark mode colors
darkAppearance.primaryColor = UIColor(red: 0.5, green: 0.4, blue: 0.9, alpha: 1.0)
darkAppearance.backgroundColor = UIColor(red: 0.1, green: 0.1, blue: 0.1, alpha: 1.0)
darkAppearance.surfaceColor = UIColor(red: 0.15, green: 0.15, blue: 0.15, alpha: 1.0)
darkAppearance.textColor = .white
darkAppearance.textColorLight = UIColor(red: 0.7, green: 0.7, blue: 0.7, alpha: 1.0)

// Buttons
darkAppearance.buttonBackgroundColor = darkAppearance.primaryColor
darkAppearance.buttonTextColor = .white
darkAppearance.buttonCornerRadius = 8.0

// Input fields
darkAppearance.inputBackgroundColor = darkAppearance.surfaceColor
darkAppearance.inputBorderColor = UIColor(red: 0.3, green: 0.3, blue: 0.3, alpha: 1.0)
darkAppearance.inputBorderColorFocused = darkAppearance.primaryColor
darkAppearance.inputTextColor = .white
darkAppearance.inputPlaceholderColor = UIColor(red: 0.5, green: 0.5, blue: 0.5, alpha: 1.0)
darkAppearance.inputCornerRadius = 6.0

// Error
darkAppearance.errorColor = UIColor(red: 1.0, green: 0.3, blue: 0.3, alpha: 1.0)

let config = YunoConfig(
    cardFormType: .oneStep,
    appearance: darkAppearance
)
```

## ClearSale Fraud Prevention

Integrate ClearSale's device fingerprinting and fraud prevention capabilities with the Yuno SDK.

> ❗ Simplified Integration
>
> The iOS ClearSale SDK integration is simpler than Android. You only need to configure it as a fraud provider before initiating payments.

### Requirements

* Active ClearSale account
* Working Yuno Payments SDK integration
* iOS 14.0 or higher

### Installation

#### Swift Package Manager (Recommended)

In Xcode, go to `File > Add Packages...` and enter the ClearSale repository URL:

```
https://github.com/yuno-payments/yuno-antifraud-clearsale-ios
```

Ensure you select version `1.3.0` or higher.

#### CocoaPods

Add to your `Podfile`:

```ruby
pod 'YunoAntifraudClearsaleSDK', '~> 1.3.0'
```

Then run:

```ruby
pod install
```

### Integration

Configure ClearSale as a fraud provider before initiating any payment:

```swift
import YunoSDK
import YunoAntifraudClearsale

// Configure ClearSale as a fraud provider
Yuno.setFraudProviders(with: [YunoAntifraudClearsale()])

// Now you can initiate the payment process
Yuno.startPayment(showPaymentStatus: true)
// or
Yuno.startPaymentLite(with: delegate, paymentSelected: paymentMethod, showPaymentStatus: true)
```

That's it! The SDK will automatically:
* Collect device fingerprinting data
* Generate a session ID
* Attach fraud prevention information to the payment

### Usage Flow

```swift
class PaymentViewController: UIViewController, YunoPaymentDelegate {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Configure fraud prevention
        Yuno.setFraudProviders(with: [YunoAntifraudClearsale()])
    }
    
    func startPaymentFlow() {
        // Payment flow will automatically include ClearSale data
        Yuno.startPayment(showPaymentStatus: true)
    }
    
    // YunoPaymentDelegate implementation
    var checkoutSession: String { "your_checkout_session_id" }
    var countryCode: String { "BR" }
    var language: String? { "en" }
    var viewController: UIViewController? { self }
    
    func yunoCreatePayment(with token: String) {
        // Create payment on backend
    }
    
    func yunoPaymentResult(_ result: Yuno.Result) {
        // Handle result
    }
}
```

### Important Notes

* **Configure Before Payment**: Always set fraud providers before calling `startPayment()` or `startPaymentLite()`
* **Automatic Data Collection**: The SDK handles all data collection and session management automatically
* **No Manual Session Management**: Unlike Android, iOS doesn't require manual lifecycle management

## Supported Languages

The iOS Flow supports multiple languages for payment forms:

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

Set the language through your delegate:

```swift
class ViewController: YunoPaymentDelegate {
    var language: String? { "es" } // Spanish
    // ... other properties
}
```

When not specified, the SDK uses the device's default language if supported, otherwise falls back to English.

## Advanced Features

### Click to Pay Integration

For Click to Pay support, follow the dedicated [Click to Pay SDK integration](doc:click-to-pay#sdk-integration) guide in the Wallets section.

### Deep Link Handling

Handle deep links for payment methods that redirect to external apps or browsers:

```swift
func application(_ app: UIApplication,
                 open url: URL,
                 options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {

    guard url.scheme == "yunoexample" else { return false }

    return Yuno.receiveDeeplink(url)
}
```

For Seamless SDK, you can control status view display:

```swift
return Yuno.receiveDeeplink(url, showStatusView: true)
```

### UISceneDelegate Support

If your app uses `UISceneDelegate`, place your Yuno initialization code within your `SceneDelegate`:

```swift
class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene,
               willConnectTo session: UISceneSession,
               options connectionOptions: UIScene.ConnectionOptions) {

        guard let _ = (scene as? UIWindowScene) else { return }

        // Initialize Yuno here
        Yuno.initialize(
            apiKey: "PUBLIC_API_KEY",
            config: YunoConfig(),
            callback: { _ in }
        )
    }
}
```

### Manual Loader Control

Hide the SDK loader manually when using `keepLoader: true`:

```swift
Yuno.hideLoader()
```

Useful for:
* Custom loading animations
* Complex multi-step flows
* Precise control over loading states

## SDK Requirements

Ensure your iOS project meets the following requirements:

| Requirement | Minimum Version |
|-------------|-----------------|
| **iOS Version** | 14.0 |
| **Xcode** | 12.0 or higher |
| **Swift** | 5.0 or higher |
| **Dependency Manager** | CocoaPods or Swift Package Manager |

## Additional Resources

* **[Payment Integration](doc:new-ios-sdk-payment-integration)**: Process payments with the iOS Flow
* **[Enrollment Integration](doc:new-ios-sdk-enrollment-integration)**: Save payment methods for future use
* **[Release Notes](doc:release-notes-ios)**: Latest SDK updates and version history
* **[ClearSale Repository](https://github.com/yuno-payments/yuno-antifraud-clearsale-ios)**: ClearSale SDK source code and releases
* **[Yuno iOS SDK Repository](https://github.com/yuno-payments/yuno-sdk-ios)**: Main SDK source code and examples



## Error handling

Handle errors returned by the SDK in your app (e.g. failed payments, validation errors). For HTTP status and response codes, see [Status and response codes](https://docs.y.uno/reference/status-and-response-codes) in the API reference.
