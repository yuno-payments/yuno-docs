---
title: Lite SDK (Payment iOS)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Lite SDK (Payment)
  description: >-
    Here is a step-by-step guide on integrating Yuno's Lite SDK (Payment) into
    your iOS application, enabling efficient and secure payment processing for
    your mobile platform.
  robots: index
next:
  description: ''
---
On this page, you will find all the steps to add, configure, and use the Lite iOS SDK to make payments in your iOS project.

## Step 1: Include the library in your project

You can add the library using CocoaPods or Swift Package Manager.

### CocoaPods

To add the Yuno SDK to your iOS project, you need to install the Yuno SDK. If you do not have a Podfile, follow the [CocoaPods guide](https://guides.cocoapods.org/using/using-cocoapods.html) to create one. After creating the Podfile, you will integrate the Yuno SDK with Cocoapods by adding the line below to your Podfile.

```ruby
pod 'YunoSDK', '~> 1.1.22'
```

After, you need to run the installation:

```ruby
pod install

```

### Swift Package Manager

To add the Yuno SDK to your iOS project, you need to install the [Swift Package Manager](https://www.swift.org/package-manager/). With the Swift package set up, add Yuno SDK as a dependency, as presented in the following code block:

```swift
dependencies: [
    .package(url: "https://github.com/yuno-payments/yuno-sdk-ios.git", .upToNextMajor(from: "1.1.17"))
]
```

## Step 2: Initialize SDK with the public key

To start running the Yuno iOS Lite checkout, you first need to get your Yuno app ID and Public API key. Then, import and initialize Yuno as presented in the following code snippet:

```swift
import YunoSDK

Yuno.initialize(
    apiKey: "<Public API Key>",
    config: YunoConfig() // This is optional, by default it configures .oneStep card form and disables save card checkbox.,
    callback: { (value: Bool) in }  // Optional callback to be notified when the SDK has completed initialization
)

```

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>UISceneDelegate</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\tIf your app is using a UISceneDelegate you will need to put your Yuno initialization code into your SceneDelegate.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


The Lite checkout enables you to configure the appearance and process. It is an optional step that you configure through the class `YunoConfig`. If you want to set up the configurations, the following code block presents the elements that can be configured:

```swift
final class YunoConfig {
    let cardFormType: CardFormType, 
    let appearance: Yuno.Appearance,
    let saveCardEnabled: Bool, 
    let keepLoader: Bool
}
```

Below, you find a description of each configuration variable available.

| Parameter         | Description                                                                                                                                                                           |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `cardFormType`    | This field can be used to choose Payment and Enrollment Card flow. It's an optional property and considers **.oneStep** by default.                                                   |
| `appearance`      | This optional field defines the appearance of the checkout. By default, it uses Yuno styles.                                                                                          |
| `saveCardEnabled` | This optional field can be used to choose if the **Save Card** checkbox is shown on card flows. It is false by default.                                                               |
| `keepLoadere`     | This optional field provides control over when to hide the loader. If set to `true`, the `hideLoader()` function must be called to hide the loader. By default, it is set to `false`. |

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Accessing Your API Key</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\tYou can retrieve your API Key from the <a href=\"https://docs.y.uno/docs/developers-credentials\">Developers section</a> in the Yuno Dashboard.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 3: Start the checkout process

The ViewController class is defined as a subclass of `UIViewController` and also adopts the `YunoPaymentDelegate` protocol. It overrides the `viewDidLoad()` method and calls `Yuno.startCheckout(with: self)`. The `Yuno.startCheckout(with:)` function is a function provided by the Yuno library, and it takes an instance of a class that conforms to the `YunoPaymentDelegate` protocol as an argument. By passing `self` (the current instance of `ViewController`) as the argument, the `ViewController` becomes the delegate.

```swift
protocol YunoPaymentDelegate: AnyObject {

    var checkoutSession: String { get }
  	// The complete list of country codes is available on https://docs.y.uno/docs/country-coverage-yuno-sdk
    var country_code: String { get }
    var language: String? { get }
    var viewController: UIViewController? { get }

    func yunoCreatePayment(with token: String)
    func yunoCreatePayment(with token: String, information: [String: Any]) 
    func yunoPaymentResult(_ result: Yuno.Result)
}


class ViewController: YunoPaymentDelegate {

    func viewDidLoad() {
        super.viewDidLoad()
        Yuno.startCheckout(with: self)
    }
}
```

The following table presents all the protocol requirements you have to provide and their descriptions.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Description",
    "0-0": "`checkoutSession`",
    "0-1": "Refers to the current payment's checkout session.",
    "1-0": "`country_code`",
    "1-1": "This parameter determines the country for which the payment process is being configured. The complete list of supported countries and their country code is available on the [Country coverage](doc:country-coverage-yuno-sdk)  page.",
    "2-0": "`language`",
    "2-1": "Defines the language to be used in the payment forms. You can set it to one of the available language options:  \n  \n- en (English)\n- es (Spanish)\n- pt (Portuguese)",
    "3-0": "`navigationController`",
    "3-1": "This property represents the navigation controller used for presenting the payment flow, and it's an optional `UINavigationController` instance.",
    "4-0": "`yunoCreatePayment(with token: String)`",
    "4-1": "This method is responsible for creating a payment with the provided token. It takes a String parameter called `token`, which represents the payment token.",
    "5-0": "`yunoCreatePayment(with token: String, information: [String: Any])`",
    "5-1": "This method is responsible for creating a payment with the provided token. It takes a String parameter called `token`, representing the payment token. Additionally, it returns all the token response info in a dictionary.",
    "6-0": "`yunoPaymentResult(\\_ result: Yuno.Result)`",
    "6-1": "This method is called when the payment process is completed, providing the result of the payment as a parameter of type `Yuno.Result`."
  },
  "cols": 2,
  "rows": 7,
  "align": [
    "left",
    "left"
  ]
}
[/block]


[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tYou can call <code>yunoCreatePayment</code> with or without the <code>information</code> parameter based on your needs. However, use only one version in your code, as calling both is not required and may cause issues.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 4: Initiate the payment process

To effectively start a payment after displaying the payment methods, you have to call the method `startPaymentLite`, as presented in the code snippet below:

```swift
Yuno.startPaymentLite(showPaymentStatus: Bool)
```

For the Lite checkout version, you need to send an additional parameter, which can be the vaulted token and/or the payment method the customer will use to make the payment.

```swift
protocol PaymentMethodSelected {
    var vaultedToken: String? { get }
    var paymentMethodType: String { get }
}

Yuno.startPaymentLite(paymentSelected: paymentSelected, showPaymentStatus: Bool)
```

## Step 5: Get the OTT (one-time token)

You can obtain the one-time token to create the payment back-to-back at the end of this process. You will get the one-time token in the function `yunoCreatePayment()` that you get when implementing the `YunoPaymentDelegate`. An example of retrieving the one-time token is presented below:

```swift
func yunoCreatePayment(with token: String) { ... }
```

## Step 6: Create the Payment

Once you have completed the steps described before, you can create a payment. The back-to-back payment creation must be carried out using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant should call their backend to create the payment within Yuno, using the one-time token and the checkout session. 

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Continue method</h3>\n      <div class=\"contentContainer\">\n        <p>\n          Yuno <b>requires</b> you integrate the <code>continuePayment</code> method of the SDK after the payment is created because certain asynchronous payment methods require additional action from the customer to complete it. The API will inform you of this scenario via the <code>sdk_action_required</code> field of the response, which will be returned as true. The <code>yuno.continuePayment()</code> function will display the additional screens to the customers, where they can carry out the necessary actions to complete the payment without needing you to handle every scenario.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


```swift
Yuno.continuePayment(showPaymentStatus: Bool)
```

The parameter `showPaymentStatus` is used to determine whether the payment status should be displayed. By passing `true` as an argument, the payment status might be shown while passing `false` could indicate that the payment status should not be displayed.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Note</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\tIn Yuno's iOS Lite SDK, the default value for <code>showPaymentStatus</code> is <code>true</code>.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 7: Handle Payment Status (Optional)

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Deep Links and Mercado Pago Checkout Pro</h3>\n      <div class=\"contentContainer\">\n        <p>\n          This step is only required if you're using a payment method that relies on deep links or Mercado Pago Checkout Pro.\n        </p>\n        <p>\n          If your payment methods don’t use deep links, you can skip this step.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


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

## Callback

After the payment is completed, the SDK can return different transaction states: `success`, `fail`, `processing`, `reject`, `internalError`, and `userCancell`.  The descriptions of each transaction state is presented in the table below.

| Transaction state | Description                                                                                                                                                                                                                                    |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `success`         | Indicates that the transaction or payment process has been completed successfully.                                                                                                                                                             |
| `fail`            | This state indicates that the transaction or payment process has failed. It means that there was an error or issue during the payment process, preventing it from being completed successfully.                                                |
| `processing`      | Indicates that the transaction or payment process is currently being processed. It is typically used when there is a delay in processing the payment, such as waiting for approval from a third-party service or financial institution.        |
| `reject`          | This state indicates that the transaction has been rejected. The rejection can occur for various reasons, such as insufficient funds, fraudulent activity, or a request that violates specific rules or policies.                              |
| `internalError`   | It means that an unexpected error occurred within the system or infrastructure handling the payment process. This state suggests that there was a problem on the server or backend side rather than an issue with the user's input or request. |
| `userCancell`     | This state indicates that the user has voluntarily canceled or aborted the transaction or payment process. This state is typically used when there is an option for the user to cancel or abandon the payment process.                         |

In order to get the transaction state, you have to implement the delegate presented in the following piece of code:

```swift
enum Result {
    case reject, success, fail, processing, internalError, userCancell
}

func yunoPaymentResult(_ result: Yuno.Result) { ... }
func yunoEnrollmentResult(_ result: Yuno.Result) { ... }
```

## Complementary Features

Yuno iOS SDK provides additional services and configurations you can use to improve customers' experience. Use the [SDK Customizations](https://docs.y.uno/docs/sdk-customizations-ios) to change the SDK appearance to match your brand or to configure the loader.

- [Loader](https://docs.y.uno/docs/loader-1): Control the use of the loader.
- **Save card for future payments**: In addition, you can display a checkbox for save or enroll cards using `cardSaveEnable: true`. Below, you can find examples of the checkbox for both card form renders.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/89c94f120736a724c6b46a05f82ee8b95d3e892046d11a119635f5ab0d1d59a4-Card___save_for_future_payments.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


- You also can choose one of the render options for the card form. Below, you find screenshots presenting the difference between the `cardFormType` `ONE_STEP` and `STEP_BY_STEP`.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/602fa6e31d55d6e71826ec7b429fc6842e06b3cccbf2d00339e485f97d97a841-Full_SDK_ios.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


- [SDK Customizations](https://docs.y.uno/docs/sdk-customizations-ios): Change the SDK appearance to match your brand.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Demo App</h3>\n      <div class=\"contentContainer\">\n        <p>\n          In addition to the code examples provided, you can access the <a href=\"https://github.com/yuno-payments/yuno-sdk-ios\">Yuno repository</a> for a complete implementation of Yuno iOS SDKs.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]