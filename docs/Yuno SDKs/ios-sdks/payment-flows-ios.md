---
title: Payment Flows
deprecated: false
hidden: false
metadata:
  robots: index
---
The iOS SDK makes it easy to integrate payment flows into your iOS app.

## Additional resources

* See [Choose the right integration for you](choose-your-integration) if you're unsure which flow to follow.
* Access the [Release notes](release-notes-ios) or the [Yuno iOS SDK repository](https://github.com/yuno-payments/yuno-sdk-ios) to verify the latest SDK version available.

## Requirements

* [CocoaPods](https://guides.cocoapods.org/using/using-cocoapods.html) or [Swift Package Manager](https://www.swift.org/package-manager/)
* iOS 14.0 or above
* Active Yuno account; API credentials (obtain from the [Yuno Dashboard](https://dashboard.y.uno/) → **Developers** > **Credentials**)
* Create `checkout_session` and payment via the API; create a customer using the [Create customer endpoint](ref:create-customer) before creating a payment

## Include the library in your project

The first step is always including the library in your project; this step is performed regardless of which integration type you choose. You can add the Yuno iOS SDK using CocoaPods or Swift Package Manager.

**Option 1: CocoaPods**

Add to your Podfile:

```ruby
pod 'YunoSDK', '~> 2.11.1'
```

Then run:

```ruby
pod install
```

**Option 2: Swift Package Manager**

Add the package dependency:

```swift
dependencies: [
    .package(url: "https://github.com/yuno-payments/yuno-sdk-ios.git", .upToNextMajor(from: "2.11.1"))
]
```

Once Step 1 is complete, continue with your desired integration.

### Basic flows

* [Full (iOS)](#full-ios): Complete control with backend support and full customization options
* [Seamless (payment iOS)](#seamless-payment-ios): Fastest integration with pre-built UI components

### Advanced flows

* [Lite (iOS)](#lite-ios): Lightweight integration allowing you to control the UI and payment methods list, as well as backend support
* [Headless (iOS)](#headless-ios): Full checkout experience customization without requiring PCI compliance

## Parameters

For the full list of parameters and YunoConfig, see the [iOS SDK Common Reference](ios-sdk-common-reference).

| Parameter                  | Description                                                                                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`          | Checkout session ID from your backend (Create checkout session API). Required.                                                                                         |
| `countryCode`              | ISO country code (e.g. `BR`). Required.                                                                                                                                |
| `language`                 | Language code for the UI. Optional.                                                                                                                                    |
| `viewController`           | UIViewController that presents the payment flow. Required for delegate.                                                                                                |
| `yunoCreatePayment(with:)` | Delegate: create payment on your backend with the one-time token.                                                                                                      |
| `yunoPaymentResult(_:)`    | Delegate: payment finished. Receives `Yuno.Result` value (e.g., `.succeeded`, `.fail`, `.processing`). See [Payment Status reference](ref:payment) for status mapping. |
| `YunoConfig` (initialize)  | Optional: cardFormType, appearance, saveCardEnabled, keepLoader, hideCardholderName, cardNumberPlaceholder. See Common Reference.                                      |

## Full (iOS)

Implement the Full iOS SDK: complete payment solution with automatic payment method display and minimal UI customization. See [Requirements](#requirements) above.

### Step 1: Include the library in your project

Follow the steps in [Include the library in your project](#include-the-library-in-your-project) above.

### Step 2: Initialize SDK with the public key

Retrieve your public API keys from the [Yuno Dashboard](https://dashboard.y.uno/).

To start running the Yuno iOS Full checkout, import and initialize Yuno:

```swift
import YunoSDK

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: YunoConfig(),
    callback: { (value: Bool) in }
)
```

The Full checkout enables you to configure the appearance and process through the `YunoConfig` class. The available options are:

```swift
struct YunoConfig {
    var cardFormType: CardFormType = .oneStep
    var appearance: Appearance? = nil
    var saveCardEnabled: Bool = false
    var keepLoader: Bool = false
    var hideCardholderName: Bool = false
    var cardNumberPlaceholder: String? = nil
}
```

#### Options

Customization options:

| Customization option    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cardFormType`          | Defines the card form flow. Options are `.oneStep` (all fields on one screen) or `.stepByStep` (fields displayed across multiple steps). Default is `.oneStep`. Check the Render options section for more information.                                                                                                                                                                                                                                                       |
| `appearance`            | Enables SDK-wide UI customization. Use it to define global visual styles like colors, fonts, and button appearance. For more information, check the SDK customizations page.                                                                                                                                                                                                                                                                                                 |
| `saveCardEnabled`       | Enables the Save card checkbox on card flows. Check the Save card section for more information.                                                                                                                                                                                                                                                                                                                                                                              |
| `keepLoader`            | Controls loader display behavior. When `true`, the loader remains visible until manually hidden.                                                                                                                                                                                                                                                                                                                                                                             |
| `hideCardholderName`    | When set to `true`, hides the cardholder name field in the card form. Default is `false`. Hiding the field does not affect PAN, expiry, CVV collection, BIN logic, or 3DS/provider validations. The merchant is responsible for ensuring cardholder name is provided when required by their payment provider.                                                                                                                                                                |
| `cardNumberPlaceholder` | This optional field allows you to customize the placeholder text for the card number field. Supports alphanumeric characters, spaces, and UTF-8 characters for localization. If not provided, the SDK uses the default placeholder ("Card number"). This customization does not affect card formatting, masking, BIN logic, or validation.                                                                                                                                   |
| `language`              | Defines the language to be used in the payment forms. You can set it to one of the available language options: `en` (English), `es` (Spanish), `pt` (Portuguese), `fil` (Filipino), `id` (Indonesian), `ms` (Malay), `th` (Thai), `zh-TW` (Chinese Traditional), `zh-CN` (Chinese Simplified), `vi` (Vietnamese), `fr` (French), `pl` (Polish), `it` (Italian), `de` (German), `ru` (Russian), `tr` (Turkish), `nl` (Dutch), `sv` (Swedish), `ko` (Korean), `ja` (Japanese). |

### Step 3: Create the checkout session

Each payment requires a new `checkout_session`. Use the [Create checkout session](ref:create-checkout-session) endpoint to create one; use that session to initiate the payment.

If your payment flow sends users to an external browser (e.g., for 3DS authentication or bank redirects), set the `callback_url` when creating your checkout session. See [Handle external browser return](#step-6-handle-external-browser-return-optional) for details.

#### Checkout session options

| Parameter            | Required    | Description                                                                                                      |
| -------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------- |
| `amount`             | Yes         | The primary transaction amount object containing `currency` (ISO 4217 code) and `value` (numeric amount).        |
| `alternative_amount` | No          | An alternative currency representation with the same structure as `amount`. Useful for multi-currency scenarios. |
| `callback_url`       | Recommended | URL to redirect users back to your app after external browser flows (3DS, bank redirects).                       |
| `customer_id`        | Yes         | The customer ID obtained from the Create customer endpoint.                                                      |

<Callout icon="💳" theme="default">
  ### Auth vs capture

  Control auth vs capture by sending `payment_method.detail.card.capture` in the checkout session: `false` = authorize only, `true` = capture immediately.
</Callout>

### Step 4: Implement the payment delegate

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

#### Options

| Parameter                              | Description                                                                                                                                     |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`                      | The unique identifier for the checkout session.                                                                                                 |
| `countryCode`                          | Country code where the payment is performed. See [Country Coverage](country-coverage) for supported countries.                                  |
| `language`                             | Language code for the payment forms (e.g., `"en"`, `"es"`, `"pt"`). See [Supported languages](languages-supported).                             |
| `viewController`                       | The `UIViewController` used to present the payment flow. Required for proper UI presentation.                                                   |
| `yunoCreatePayment(with:)`             | Called when a one-time token is generated. Create the payment on your backend.                                                                  |
| `yunoCreatePayment(with:information:)` | Alternative callback that includes additional token information. Use only one version.                                                          |
| `yunoPaymentResult(_:)`                | Called when the payment process completes. Receives a `Yuno.Result` enum value. See [Payment Status reference](ref:payment) for status mapping. |

> ❗ Important Note
>
> Use either `yunoCreatePayment(with:)` **OR** `yunoCreatePayment(with:information:)` based on your needs—not both. Calling both may cause issues.

### Step 5: Mount the SDK with automatic payment method display

Use `getPaymentMethodViewAsync()` to display all available payment methods automatically. Implement the `YunoPaymentFullDelegate` protocol:

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

> ❗ Important
>
> Always ensure the payment methods view container has proper constraints or layout configuration. The SDK will notify you of height changes through `yunoUpdatePaymentMethodsViewHeight(_:)` if needed.

### Step 6: Start the payment process

After displaying the payment methods, call `startPayment()`:

```swift
Yuno.startPayment(showPaymentStatus: true)
```

#### Options

| Parameter           | Description                                                                                                                                                                                                         |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `showPaymentStatus` | A boolean that specifies whether the payment status should be displayed within the Yuno interface. When `true`, the SDK displays default status screens. When `false`, you handle status display through callbacks. |

### Step 7: Get the one-time token (OTT)

After the customer fills out the requested data in Yuno's payment forms, you will obtain the one-time token, a required parameter to create a payment using the Yuno API.

The one-time token will be shared by Yuno using the `yunoCreatePayment` function you provided in Step 4 when implementing the delegate. The one-time token will be available in the callback.

A loader can be shown while the one-time token is generated. Use Yuno's default or implement your own with the required configuration.

### Step 8: Create the payment

After receiving the one-time token from [Step 7](#step-7-get-the-one-time-token-ott), create the payment using the [Create payment endpoint](https://docs.y.uno/reference/create-payment). Use the `checkout_session` from [Step 3](#step-3-create-the-checkout-session) and the one-time token to create the payment.

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

The response from the Create payment endpoint will include the parameter `sdk_action_required`, which defines if additional actions are required to finish the payment based on the payment type.

> 🚧 **Required:** Integrate the `continuePayment` method after the payment is created. Some asynchronous payment methods require additional customer actions. When the API response sets `sdk_action_required` to `true`, call `Yuno.continuePayment()` to display the necessary screens.

### Step 9: Continue payment

Yuno requires integrating the SDK's `continuePayment` method after the payment is created, as certain asynchronous payment methods require additional customer actions to complete. The response from the [Create payment endpoint](https://docs.y.uno/reference/create-payment), from Step 8, will include a `sdk_action_required` field. If it returns `TRUE`, you need to call the `continuePayment()` function to show additional screens that allow the customer to complete the payment. Otherwise, this step is not necessary.

```swift
Yuno.continuePayment()
```

To show your payment status screens, handle status through the `yunoPaymentResult(_:)` delegate method instead of using the SDK's default status display.

### Step 10: Handle external browser return (Optional)

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

### Step 11: Handle payment result

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
    case .userCancelled:
        print("User canceled payment")
        // Handle cancellation
    case .internalError:
        print("Internal error occurred")
        // Show error message
    }
}
```

#### Payment states

| State           | Description                                                    | Action Required                       |
| --------------- | -------------------------------------------------------------- | ------------------------------------- |
| `succeeded`     | Payment completed successfully                                 | No                                    |
| `fail`          | Payment failed due to validation, network, or technical issues | Yes - Investigate and retry           |
| `processing`    | Payment in progress, awaiting approval                         | No                                    |
| `reject`        | Payment rejected (insufficient funds, fraud detection, etc.)   | Yes - Inform user and suggest actions |
| `internalError` | Unexpected internal error occurred                             | Yes - Technical intervention required |
| `userCancelled` | User canceled the payment                                      | No                                    |

#### Payment status validation

This section explains how the SDK handles payment status when users cancel or leave payment flows, and how the SDK status relates to the backend payment status in these scenarios.

##### Sync payment methods (Apple Pay)

For synchronous payment methods like Apple Pay, when a user cancels before PSP response:

* **SDK Status**: Returns `userCancelled` (CANCELLED_BY_USER)
* **Backend Payment Status**: Remains `PENDING` until PSP timeout or merchant cancellation
* **Important**: The SDK will not return `reject` or `processing` in this scenario

This ensures that the backend payment remains in a pending state and can be properly handled by the merchant's system.

##### Async payment methods (PIX, QR codes)

For asynchronous payment methods like PIX, when a user closes the QR window:

* **SDK Status**: Returns `processing`, optionally with a sub-status such as `CLOSED_BY_USER`
* **Backend Payment Status**: Remains `PENDING` and the QR code remains valid until expiry
* **Checkout Session Reuse**: Re-opening the same checkout session can display the same valid QR code
* **No Automatic Cancellation**: The PIX payment is not automatically cancelled when the user closes the QR window

This behavior allows users to return to the payment flow and complete the transaction using the same QR code before it expires.

##### Expired async payments

If a PIX QR code expires naturally:

* **Backend Status**: Updated to `EXPIRED`
* **SDK Status**: SDK callbacks and polling endpoints return `EXPIRED` consistently

This ensures merchants receive accurate status information when a payment method has expired.

### Complementary features

For styling, themes, form options, and additional configurations, see [SDK customizations](ios-customizations).

## Seamless (payment iOS)

Seamless (payment iOS) for payments.

**Recommended**: Use Seamless (payment iOS) for pre-built UI and customization.

This SDK is ideal for merchants who:

* Want control over the payment flow while leveraging pre-built UI components
* Need to customize the payment experience while maintaining PCI compliance
* Require a balance between implementation speed and customization

Seamless (payment iOS) includes features like:

* Pre-built payment UI components with customization options
* Multiple payment method support
* Advanced payment status handling
* Comprehensive error management

For merchants requiring complete UI control or more advanced features, consider using our [Full](#full-ios) instead.

See [Requirements](#requirements) above.

### Step 1: Create a customer

Create a customer using the [Create customer endpoint](ref:create-customer) before initiating payments. This step is required to:

* Identify the person making the payment
* Enable saved card functionality (if enabled)
* Track payment history

The customer ID returned from this endpoint will be used when creating the `checkout_session`.

### Step 2: Create a checkout session

Create a new `checkout_session` using the [Create checkout session](ref:create-checkout-session) endpoint to initialize the payment flow. Make sure to:

* Include the customer ID obtained from the previous step
* Store the returned `checkout_session` ID for use in Step 6 of the integration
* Set `workflow` to `SDK_SEAMLESS` when creating the checkout session

<Callout icon="💳" theme="default">
  ### **Auth vs capture**

  Control auth vs capture by sending `payment_method.detail.card.capture` in the checkout session: `false` = authorize only, `true` = capture immediately.
</Callout>

#### Checkout session options

| Parameter            | Required | Description                                                                                                                                                                                                                                                                                                        |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `amount`             | Yes      | The primary transaction amount object containing `currency` (ISO 4217 code) and `value` (numeric amount in that currency).                                                                                                                                                                                         |
| `alternative_amount` | No       | An alternative currency representation of the transaction amount with the same structure as `amount` (`currency` and `value`). Useful for multi-currency scenarios, such as displaying prices to customers in their preferred currency (e.g., USD) while processing the payment in the local currency (e.g., COP). |
| `workflow`           | Yes      | Set to `SDK_SEAMLESS` for Seamless (payment iOS) integration.                                                                                                                                                                                                                                                      |

> 🚧 Checkout session usage
>
> The `checkout_session` is unique for each payment attempt and cannot be reused.

Follow the steps in [Include the library in your project](#include-the-library-in-your-project) above.

### Step 3: Initialize SDK

Retrieve your public API keys from the [Yuno Dashboard](https://dashboard.y.uno/).

```swift
import YunoSDK

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: YunoConfig(),
    callback: { (value: Bool) in }
)
```

Configure the Seamless checkout using `YunoConfig` (for card form type, appearance, save card, loader behavior, and optionally `hideCardholderName`).

Use the `YunoConfig` data class to set additional configurations. Options:

| Option                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **cardFormType**          | Defines the card form flow. The default option is `.oneStep`. Check the Render options section for more information.                                                                                                                                                                                                                                                                                                                                                   |
| **saveCardEnabled**       | Enables the save card checkbox for card flows. Check the Save card section for more information.                                                                                                                                                                                                                                                                                                                                                                       |
| **language**              | Defines the language to be used in the payment forms. You can set it to one of the available language options: `en`, `es`, `pt`, `fil`, `id`, `ms`, `th`, `zh-TW`, `zh-CN`, `vi`, `fr`, `pl`, `it`, `de`, `ru`, `tr`, `nl`, `sv`, `ko`, `ja`.                                                                                                                                                                                                                          |
| **appearance**            | Enables SDK-wide UI customization. Use it to define global visual styles like colors, fonts, and button appearance. For more information, check the SDK customizations page.                                                                                                                                                                                                                                                                                           |
| **cardNumberPlaceholder** | This optional field allows you to customize the placeholder text for the card number field. Supports alphanumeric characters, spaces, and UTF-8 characters for localization. If not provided, the SDK uses the default placeholder ("Card number"). This customization does not affect card formatting, masking, BIN logic, or validation.                                                                                                                             |
| **hideCardholderName**    | This optional field allows you to hide the cardholder name field in the card form. When set to `true`, the cardholder name field is not rendered. When not specified or set to `false`, the cardholder name field is displayed (default behavior). Hiding the field does not affect PAN, expiry, CVV collection, BIN logic, or 3DS/provider validations. The merchant is responsible for ensuring cardholder name is provided when required by their payment provider. |

### Step 4: Implement the payment delegate

Create a class that adopts the `YunoPaymentDelegate` protocol as described in the Full (iOS) section.

### Step 5: Start the checkout and payment process

Use `Yuno.startPaymentSeamlessLite` from your `ViewController` to start the seamless checkout UI:

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

#### Options

| Parameter           | Description                                                                                           |
| :------------------ | :---------------------------------------------------------------------------------------------------- |
| `seamlessParams`    | Configuration object containing `checkoutSession`, `countryCode`, `language`, and `viewController`.   |
| `paymentSelected`   | Specifies the payment method, either through a vaulted token or a selected payment type.              |
| `showPaymentStatus` | When `true`, displays the SDK's default result screen. When `false`, handle status through callbacks. |

Seamless (payment iOS) automatically handles payment creation on the backend. You still receive the payment result through the callback or return value, but you don't need to call the Create Payment API manually.

### Step 6: Handle payment result

The SDK returns the payment result through the callback or return value. Handle it as described in the Full (iOS) section.

### Complementary features

For styling, themes, form options, and additional configurations, see [SDK customizations](ios-customizations).

## Lite (iOS)

Lite (iOS) for payments.

**Recommended**: Use the [Seamless](#seamless-payment-ios) for pre-built UI; use Lite for a streamlined card-focused integration.

This SDK offers a streamlined integration process with essential payment functionality, making it ideal for merchants who:

* Need a quick implementation with minimal customization requirements
* Want to focus primarily on card payment processing
* Prefer a ready-to-use UI that handles the payment flow

Lite (iOS) includes core features like:

* Pre-built payment UI components
* Card payment processing
* Basic payment status handling
* Essential error management

For merchants requiring more advanced features like multiple payment methods, custom UI, or advanced fraud prevention, consider using our [Full](#full-ios) instead.

See [Requirements](#requirements) above.

### Step 1: Create a customer

Create a customer using the [Create customer endpoint](ref:create-customer) before initiating payments. This step is required to:

* Identify the person making the payment
* Enable saved card functionality (if enabled)
* Track payment history

The customer ID returned from this endpoint will be used when creating the `checkout_session`.

### Step 2: Create a checkout session

Create a new `checkout_session` using the [Create checkout session](ref:create-checkout-session) endpoint to initialize the payment flow. Make sure to:

* Include the customer ID obtained from the previous step
* Store the returned `checkout_session` ID for use in later steps
* Remember that the `checkout_session` is unique for each payment attempt and cannot be reused

If your payment flow sends users to an external browser (e.g., for 3DS authentication or bank redirects), set the `callback_url` when creating your checkout session. See [Handle external browser return](#step-6-handle-external-browser-return-optional) for details.

Follow the steps in [Include the library in your project](#include-the-library-in-your-project) above.

### Step 3: Initialize SDK with the public key

Initialize the SDK:

1. Get your public API keys from the [Yuno Dashboard](https://dashboard.y.uno/)
2. Initialize the SDK by calling `Yuno.initialize()` with your API key and configuration:

```swift
import YunoSDK

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    config: YunoConfig(),
    callback: { (value: Bool) in }
)
```

Use `YunoConfig` to configure `cardFormType`, `appearance`, `saveCardEnabled`, `keepLoader`, and optionally `hideCardholderName`.

### Step 4: Implement the payment delegate

Create a `ViewController` that adopts `YunoPaymentDelegate` as described in the Full (iOS) section.

### Step 5: Start the Lite checkout process

After initializing the SDK and creating the checkout session, start the payment process using Lite (iOS). Fetch available payment methods from the API, display them in your UI, then mount the selected method.

**Step 1: Fetch available payment methods**

Call the API to retrieve payment methods available for the checkout session:

```swift
// Backend API call
GET /v1/checkout/sessions/{checkout_session}/payment-methods
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

The payment starts automatically when you call `startPaymentLite()`.

A loader can be shown while the one-time token is generated. Use Yuno's default or implement your own with the required configuration.

### Step 6: Create the payment

After receiving the one-time token from Lite (iOS), create the payment using the [Create payment endpoint](https://docs.y.uno/reference/create-payment). Use the `checkout_session` from the previous steps and the one-time token to create the payment.

The response from the Create payment endpoint will include the parameter `sdk_action_required`, which defines if additional actions are required to finish the payment based on the payment type. If `sdk_action_required` is `true`, you must call `continuePayment()` to complete the flow.

## Headless (iOS)

Yuno Headless iOS SDK for payments.

**Recommended**: Use the [Seamless](#seamless-payment-ios) for pre-built UI; use Headless for maximum customization and UI control.

Yuno's Headless iOS SDK lets you create payments and enroll payment methods without relying on pre-built UI.

Headless (iOS) is ideal for merchants who:

* Need full control over the payment UI and user experience
* Want to build custom payment flows
* Require advanced integration capabilities

Headless (iOS) includes core features like:

* Direct API access for payment processing
* Token generation for payment methods
* 3DS authentication handling
* Fraud prevention data collection

For merchants preferring a pre-built UI solution, consider using our [Full](#full-ios) or [Lite](#lite-ios) instead.

See [Requirements](#requirements) above.

### Step 1: Create a customer

Create a customer using the [Create customer endpoint](ref:create-customer) before initiating payments. This step is required to:

* Identify the person making the payment
* Enable saved payment method functionality (if enabled)
* Track payment history

The customer ID returned from this endpoint will be used when creating the `checkout_session`.

### Step 2: Create a checkout session

Create a new `checkout_session` using the [Create checkout session](ref:create-checkout-session) endpoint to initialize the payment flow. Make sure to:

* Include the customer ID obtained from the previous step
* Store the returned `checkout_session` ID for use in later steps

The `checkout_session` is unique for each payment attempt and cannot be reused.

Follow the steps in [Include the library in your project](#include-the-library-in-your-project) above.

### Step 3: Initialize Headless with the public key

```swift
import YunoSDK

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY"
)
```

### Step 4: Start the checkout process

Use `Yuno.apiClientPayment` to configure a headless checkout client:

```swift
var apiClientPayment: YunoPaymentHeadless?

apiClientPayment = Yuno.apiClientPayment(
    countryCode: "CO",
    checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638"
)
```

Then use `apiClientPayment.generateToken(...)` to generate one-time tokens:

```swift
// Step 1: Collect payment information in your custom UI

// Step 2: Generate token with card data
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
        ),
        customer: Customer()
    )
)

do {
    let result = try await apiClientPayment.generateToken(data: tokenCollectedData)
    // Extract token from result and create payment
    if let token = result["token"] as? String {
        // Call Create Payment API on your backend
    }
} catch {
    print("Token generation failed: \(error)")
}
```

After generating the token, create the payment on your backend using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment), then handle 3DS challenges and continue payments as needed.

**When to use Headless:**

* You need complete control over the entire payment UI
* You have specific design requirements that can't be met with SDK components
* You're building a highly customized checkout experience

## Common reference

For full parameter and customization details, see the [iOS SDK Common Reference](ios-sdk-common-reference).
