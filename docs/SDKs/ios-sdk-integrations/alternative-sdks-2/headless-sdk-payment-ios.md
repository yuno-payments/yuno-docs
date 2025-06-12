---
title: Headless SDK (Payment iOS)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Yuno's Headless iOS SDK lets you create payments and enroll payment methods simultaneously. Note that when using the Headless SDK, you will need to request and send via API all the mandatory fields the payment provider requires to generate payment in their API.

> 📘 Recommended SDKs
>
> We recommend using the [iOS Full SDK](full-checkout-ios) or the [iOS Lite SDK](enrollment-ios) for a smooth integration experience. These options provide a complete solution with built-in forms and validation.

Yuno's Headless SDK enables you to create payments in two different scenarios:

* Create a [One-Time Use Token](doc:tokens) using credit card information or alternative payment methods, then create a payment.
* Create a [One-Time Use Token](doc:tokens) using a `vaulted_token` from a previously enrolled payment method to collect relevant information for fraud providers, then create a payment.

The following steps describe creating a payment using Yuno's Headless SDK.

## Step 1: Include the library in your project

The first step is to install Yuno SDK to your iOS project.

> 📘 iOS SDK Versions
>
> To check all versions available, you can access the [release page](https://github.com/yuno-payments/yuno-sdk-ios/releases) from the Yuno iOS SDK repository.

You can install Yuno SDK in two ways:

* **Cocoapods**: If you do not have a Podfile, follow the [CocoaPods](https://guides.cocoapods.org/using/using-cocoapods.html) guide to create one. After creating the Podfile, you will integrate the Yuno SDK with Cocoapods by adding the line below to your Podfile:
  ```ruby
  pod 'YunoSDK', '~> {last_version}'
  ```
* **[Swift Package Manager](https://www.swift.org/package-manager/)**: Set up the Swift package, and then add Yuno SDK as a dependency, as presented in the following code block:
  ```swift
  dependencies: [
      .package(url: "https://github.com/yuno-payments/yuno-sdk-ios.git", .upToNextMajor(from: "{last_version}"))
  ]
  ```

## Step 2: Initialize Headless SDK with the public key

To initialize the Headless SDK, you need to import Yuno and provide a valid **PUBLIC\_API\_KEY**. If you don't have your API credentials, access the [Developers (Credentials)](doc:developers-credentials) page to check how to retrieve them from the dashboard.

> 📘 UISceneDelegate initialization
>
> If your app is using a `UISceneDelegate`, you will need to put your Yuno initialization code into your `SceneDelegate`.

The code block below presents an example of importing and initializing the `Yuno`.

```swift
import YunoSDK

Yuno.initialize(
    apiKey: "<Public API Key>"
)
```

## Step 3: Start the checkout process

Next, you will start the checkout process using the `apiClientPayment` function, providing the necessary configuration parameters. You need to call this function once your customer selects the payment method. As a result, the SDK will start collecting relevant information for 3DS and fraud prevention tools you have configured in your [routing](doc:routing).

The following table lists all required parameters and their descriptions.

| Parameter          | Description                                                                                                                                                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `country_code`     | This parameter determines the country for which the payment process is being configured. The complete list of supported countries and their `country_code` is available on the [Country coverage](doc:country-coverage-yuno-sdk)  page. |
| `checkout_session` | Refers to the current payment's checkout session created using the [Create Checkout Session](ref:create-checkout-session)   endpoint.\<br>Example: '438413b7-4921-41e4-b8f3-28a5a0141638'                                               |

The following code block presents an example of the parameter configuration.

```swift
var apiClientPayment: YunoPaymentHeadless?


apiClientPayment = Yuno.apiClientPayment(
    /**
     * The complete list of country_codes is available on https://docs.y.uno/docs/country-coverage-yuno-sdk
    */
  	country_code: "CO",
     /**
		 * The checkout_session created using the following endpoint https://docs.y.uno/reference/create-checkout-session
     */
  	checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638"
  )
```

## Step 4: Generate token

After collecting all user information, you can start the payment. First, you need to create a one-time token (OTT) using the function `apiClientPayment.generateToken`. As it is an asynchronous function, you can use `do/catch` to ensure you will correctly handle triggered errors. Below, you will find two examples of different scenarios to create a one-time token:

1. **Example 1**: Create a one-time token utilizing a card as the payment method and including all requisite card information.
2. **Example 2**: Create a one-time token using the `vaulted_token` information.

> 📘 Benefits of using a vaulted token
>
> When you use a vaulted token with the SDK, all the fraud information from the providers you configured in your card routing is collected and attached to the one-time token. In addition, you can add installment information and a security code if the provider requires it.

<br />

```javascript Example 1
/**
 * Create One Time Use Token
 * This will trigger an error if there is missing data
 * You can catch it using a do/catch
 */

// CollectedData is a public data type with the necessary info for the payment structure

let tokenCollectedData: TokenCollectedData = TokenCollectedData(
  	// The checkout_session created using the following endpoint https://docs.y.uno/reference/create-checkout-session
    checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
		// collectedData: The necessary info to use the payment method structure
  	paymentMethod: CollectedData(
        type: "CARD",
        // Optional
 				// Send this value if you already have a registered or enrolled payment method.
        // Other fields like card and customer are optional unless your provider requires them.
        vaultedToken: nil,
        card: CardData(
            // Optional
            // Set this value to “true” if you want to generate a vaulted_token (tokenize) the card.
            save: true,
            detail: CardData.Detail(
                number: "4111111111111111",
                expirationMonth: 12,
                expirationYear: 25,
                securityCode: "123",
                holderName: "Andrea",
                // .debit or .credit
                type: .credit
            ),
            // Optional
            // Only necessary if an installments plan is created for the account.
            installment: CardData.Installment(
                id: "64ceacef-0886-4c81-9779-b2b3029c4e8b",
                value: 1
            )
        ),
      
        customer: Customer(
            // Add the complete customer object here.
      			// You can check the object here: https://docs.y.uno/reference/the-customer-object
      			// You create the customer using the following endpoint: https://docs.y.uno/reference/create-customer
        )
    )
)

let result = try await apiClientPayment.generateToken(
    data: tokenCollectedData
)

```
```javascript Example 2
/**
 * Create One Time Use Token
 * This will trigger an error if there is missing data
 * You can catch it using a do/catch
 */

// CollectedData is a public data type with the necessary info for the payment structure
let tokenCollectedData: TokenCollectedData = TokenCollectedData(
    // The checkout_session created using the following endpoint https://docs.y.uno/reference/create-checkout-session
    checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
		// collectedData: The necessary info to use the payment method structure
    paymentMethod: CollectedData(
        type: "CARD",
        // Optional
        // Optional
 				// Send this value if you already have a registered or enrolled payment method.
        // Other fields like card and customer are optional unless your provider requires them.
        vaultedToken: "c8bb2bd8-8abf-4265-b478-0ec4e3c10cd5",
        card: CardData(
            // Optional
            // Only necessary if an installments plan is created for the account.
            installment: CardData.Installment(
                id: "64ceacef-0886-4c81-9779-b2b3029c4e8b",
                value: 1
            )
        ),
        customer: Customer(
            // Add the complete customer object here.
      			// You can check the object here: https://docs.y.uno/reference/the-customer-object
      			// You create the customer using the following endpoint: https://docs.y.uno/reference/create-customer
        )
    )
)

///   - checkoutSession: The optional checkout_session created using the following endpoint https://docs.y.uno/reference/create-checkout-session
///   - collectedData: The necessary info to use the payment method structure
let result = try await apiClientPayment.generateToken(
    data: tokenCollectedData
)

```

<br />

> 📘 PCI Compliance
>
> Please bear in mind that you are capturing sensitive card data. Therefore, you need to comply with good practices regarding data management. If you don't have a PCI certification, you can't save any card data other than the token provided by the SDK.

The following code block presents the `apiClientPayment.generateToken` function responses for both examples above. The response is a dictionary of type `[String: Any]`.

```swift Example 1
 ["token": "9ee44ac7-9134-4598-ae28-a26fec03099d",
     "type": "CARD",
     "customer": ["billing_address": nil,
                  "first_name": nil,
                  "gender": "",
                  "phone": nil,
                  "browser_info": ["color_depth": nil,
                                   "language": "en",
                                   "accept_header": "*/*",
                                   "browser_time_difference": nil,
                                   "accept_content": nil,
                                   "accept_browser": nil,
                                   "java_enabled": nil,
                                   "user_agent": "YunoSDK_Example/1 CFNetwork/1406.0.4 Darwin/22.6.0",
                                   "screen_height": "844.0",
                                   "screen_width": "390.0",
                                   "javascript_enabled": nil],
                  "document": nil,
                  "last_name": nil,
                  "device_fingerprint": nil,
                  "email": nil],
     "country": "BR",
     "vaulted_token": nil,
     "installment": ["rate": "",
                     "id": "cca80084-961b-4212-9c34-54f03f4f10ae",
                     "value": 24,
                     "amount": nil],
     "card_data": nil]

```
```swift Example 2
["token": "9ee44ac7-9134-4598-ae28-a26fec03099d",
     "type": "CARD",
     "customer": ["billing_address": nil,
                  "first_name": nil,
                  "gender": "",
                  "phone": nil,
                  "browser_info": ["color_depth": nil,
                                   "language": "en",
                                   "accept_header": "*/*",
                                   "browser_time_difference": nil,
                                   "accept_content": nil,
                                   "accept_browser": nil,
                                   "java_enabled": nil,
                                   "user_agent": "YunoSDK_Example/1 CFNetwork/1406.0.4 Darwin/22.6.0",
                                   "screen_height": "844.0",
                                   "screen_width": "390.0",
                                   "javascript_enabled": nil],
                  "document": nil,
                  "last_name": nil,
                  "device_fingerprint": nil,
                  "email": nil],
     "country": "BR",
     "vaulted_token": "a1c7c5d1-b260-4dc6-909a-8368704233cf",
     "installment": ["rate": "",
                     "id": "cca80084-961b-4212-9c34-54f03f4f10ae",
                     "value": 24,
                     "amount": nil],
     "card_data": nil]

```

## Step 5: Create the payment

Once you have completed the steps described before, you can create a payment. The back-to-back payment creation must be carried out using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant should call their backend to create the payment within Yuno, using the one-time token and the checkout session.

The endpoint response provides the `sdk_action_required` parameter, which indicates if additional actions are needed to complete the payment:

* If the customer selects a synchronous payment method, the payment is completed instantly. In this case, the `sdk_action_required` field in the API response will be `false`, and the payment process concludes at this step. While it is not mandatory to call the `continuePayment` method in this case, it is recommended to ensure proper handling.

> 📘 Call continuePayment
>
> If `sdk_action_required = false` you can call the `Yuno.continuePayment()` method and Yuno will handle the final process to finish the payment.

* If the payment requires further interaction from the SDK to complete the flow, `sdk_action_required` will be `true`. In this case, proceed with Step 6 for instructions.

## Step 6: Process asynchronous payments (Optional)

A payment with 3DS may require an additional challenge to check the customer's identity, as described on the [3DS Card Verification](doc:3ds-1) page. If an 3DS verification challenge is necessary, the [Create Payment](ref:create-payment) endpoint response will contain:

* Status equal to `PENDING` and sub status equal to `WAITING_ADDITIONAL_STEP`
* `sdk_action_required = true`
* A `redirect_url` defined in `payment.payment_method.payment_method_detail.card`

To perform the challenge and finish the payment, you have two integration options:

* (Recommended by Yuno) [Integrate the SDK `continuePayment` method](#integrate-the-continuepayment-method-recommended)
* [Get the 3DS challenge URL](#get-the-3ds-challenge-url)

### Integrate the `continuePayment` method (Recommended)

If you choose to use the `continuePayment` method, Yuno SDK will take care of displaying the additional screens for the customers complete the 3DS challenge, where they can carry out the necessary actions to complete the payment.

To use the `continuePayment`, you need to perform the following call:

```swift
Yuno.continuePayment(showPaymentStatus: Bool)
```

The parameter `showPaymentStatus` is used to determine whether the payment status should be displayed. By passing `true` as an argument, the payment will be displayed on the screen.

> 📘 Default showPaymentStatus value
>
> In Yuno's iOS Headless SDK, the default value for `showPaymentStatus` is `true`.

### Get the 3DS challenge URL

If you are not using the `continuePayment` method, you need to redirect your customer to the challenge URL by your self. To get the 3DS challenge URL, you need to call the `getThreeDSecureChallenge` function, providing the `checkoutSession`. The `checkoutSession` is only required if you aren't using the one used to create the payment. Below, you will find an example of using the `getThreeDSecureChallenge` function. As  `getThreeDSecureChallenge` is an asynchronous function, you can use `do/catch ` to ensure you will correctly handle triggered errors.

```swift
func getThreeDSecureChallenge(checkoutSession: String?) async throws -> ThreeDSecureChallengeResponse
```

The `getThreeDSecureChallenge` function will return the `ThreeDSecureChallengeResponse`, presented in the next code block:

```swift
public struct ThreeDSecureChallengeResponse {
    public let url: String
}
```

The `url` will contain a valid URL you need to redirect your customer to complete the challenge.

You are responsible for redirecting your customers to the URL provided by the `getThreeDSecureChallenge()`  function to complete the challenge. Once the customer successfully completes the 3DS challenge, they will be automatically redirected to the `callback_url`, which you provided when creating the `checkout_session` with the [Create Checkout Session](ref:create-checkout-session) endpoint.

To confirm the challenge was completed, you can open a web view to load the provided URL and listen for the `messageFromWeb` event. Below is an example code demonstrating how to listen for this event.

```swift
class HeadlessWebView: UIViewController, WKScriptMessageHandler, WKNavigationDelegate {

    private var webView: WKWebView!
    private var url: String = ""
    private let configuration = WKWebViewConfiguration()

    init(url: String) {
        self.url = url
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        nil
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        webViewConfig()
    }

    func webViewConfig() {
   
        configuration.preferences.javaScriptEnabled = true
        configuration.userContentController.add(self, name: "messageFromWeb")
        webView = WKWebView(frame: view.bounds, configuration: configuration)
        webView.navigationDelegate = self

        guard let url = URL(string: url) else {
            return
        }
        let request = URLRequest(url: url)
        webView.load(request)

        // Add the webview, and set constraints
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "messageFromWeb", let messageBody = message.body as? String {
            // Handle response 'messageBody'
            // Possible responses from the webview
            self.dismiss(animated: true)

        }
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        self.configuration.userContentController.removeScriptMessageHandler(forName: "messageFromWeb")
    }

}
```

The response will inform the challenge status, which can be `COMPLETED` or `ERROR`. The next code block presents examples for each possible option.

```swift COMPLETED
// Challenge completed
{
   "origin":"CHALLENGE",
   "status":"COMPLETED",
   "data":"callback_url"
}
```
```swift ERROR
// Challenge error
{
   "origin":"CHALLENGE",
   "status":"ERROR",
   "data":"Invalid 3DS provider"
}

```

To complete the Headless SDK payment flow, you need to use [Yuno Webhooks](doc:configure-webhooks), which will promptly notify you about the outcome of the 3DS challenge and the final payment status. Using webhooks ensures that you receive real-time updates on the progress of the payment transaction. In addition to the webhooks, you can retrieve the payment information using the [Retrieve Payment by ID](ref:retrieve-payment-by-id) endpoint.

To finish the payment implementation and understand the remaining steps, access [Headless  SDK (Payment)](doc:headless-sdk-integration).

## Step 7: Handle Payment Status (Optional)

> 📘 Deep Links and Mercado Pago Checkout Pro
>
> This step is only required if you're using a payment method that relies on deep links or Mercado Pago Checkout Pro. If your payment methods don't use deep links, you can skip this step.

Some payment methods take users out of your app to complete the transaction. Once the payment is finished, the user is redirected back to your app using a deep link. The SDK uses this deep link to check what happened, checking if the payment was successful, failed, or canceled, and can show a status screen to the user.

To handle this, you need to update your `AppDelegate` to pass the incoming URL back to the Yuno SDK. This lets the SDK read the result and optionally display the payment status. The following code snippet shows how you can add it to your app:

```swift
func application(_ app: UIApplication,
                 open url: URL,
                 options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {

  // Make sure the scheme matches the one you used in the checkout_session
  guard url.scheme == "yunoexample" else { return false }

  // Let Yuno handle the deep link and show the payment status screen
  return Yuno.receiveDeeplink(url, showStatusView: true)
}
```

This code listens for deep links that open your app. When a URL is received, it checks if the scheme matches the one you used in the `callback_url` during checkout session setup. If it matches, the URL is passed to the Yuno SDK using `Yuno.receiveDeeplink(...)`. The SDK then reads the payment result and, if `showStatusView` is set to `true`, shows the appropriate status screen to the user.

Make sure the `url.scheme` in this code matches the `callback_url` you provided when creating the `checkout_session`.

> 📘 Demo App
>
> In addition to the code examples provided, you can access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-ios) for a complete implementation of Yuno iOS SDKs.