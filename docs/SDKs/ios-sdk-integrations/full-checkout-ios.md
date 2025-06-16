---
title: Full SDK (iOS)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Full SDK
  description: >-
    Here is a step-by-step guide on integrating Yuno's Full SDK into your iOS
    application, enabling efficient and secure payment processing for your
    mobile platform.
  robots: index
next:
  description: ''
---
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

To add the Yuno SDK to your iOS project, you need to install the [Swift Package Manager](https://www.swift.org/package-manager/). With the Swift package set up, add YunoSDK as a dependency, as presented in the following code block:

```swift
dependencies: [
    .package(url: "https://github.com/yuno-payments/yuno-sdk-ios.git", .upToNextMajor(from: "1.1.17"))
]
```

## Step 2: Initialize SDK with the public key

To start running the Yuno iOS Full checkout, you first need to get your Yuno app ID and Public API Key. Then, import and initialize Yuno as presented in the following code snippet:

```swift
import YunoSDK

Yuno.initialize(
    apiKey: "<Public API Key>",
    config: YunoConfig() // This is optional, by default it configures .oneStep card form and disables save card checkbox.,
    callback: { (value: Bool) in }  // Optional callback to be notified when the SDK has completed initialization
)

```

> 🚧 UISceneDelegate Usage
>
> If your app is using a UISceneDelegate, ensure to place your Yuno initialization code within your SceneDelegate.

The Full checkout enables you to configure the appearance and process. It is an optional step that you configure through the class `YunoConfig`. If you want to set up the configurations, the following code block presents the elements that can be configured:

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

> 📘 Access Your API Key
>
> Retrieve your API Key from the [Developers section](https://docs.y.uno/docs/developers-credentials) in the Yuno Dashboard.

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

<Table>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `checkoutSession`
      </td>

      <td>
        Refers to the current payment's checkout session.
      </td>
    </tr>

    <tr>
      <td>
        `country_code`
      </td>

      <td>
        This parameter determines the country for which the payment process is being configured. The complete list of supported countries and their country code is available on the [Country coverage](doc:country-coverage-yuno-sdk) page.
      </td>
    </tr>

    <tr>
      <td>
        `language`
      </td>

      <td>
        Defines the language to be used in the payment forms. You can set it to one of the available language options:
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `en` (English)
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `es` (Spanish)
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `pt` (Portuguese)
      </td>
    </tr>

    <tr>
      <td>
        `navigationController`
      </td>

      <td>
        This property represents the navigation controller used for presenting the payment flow, and it's an optional `UINavigationController` instance.
      </td>
    </tr>

    <tr>
      <td>
        `yunoCreatePayment(with token: String)`
      </td>

      <td>
        This method is responsible for creating a payment with the provided token. It takes a String parameter called `token`, which represents the payment token.
      </td>
    </tr>

    <tr>
      <td>
        `yunoCreatePayment(with token: String, information: [String: Any])`
      </td>

      <td>
        This method is responsible for creating a payment with the provided token. It takes a String parameter called `token`, representing the payment token. Additionally, it returns all the token response info in a dictionary.
      </td>
    </tr>

    <tr>
      <td>
        `yunoPaymentResult(_ result: Yuno.Result)`
      </td>

      <td>
        This method is called when the payment process is completed, providing the result of the payment as a parameter of type `Yuno.Result`.
      </td>
    </tr>
  </tbody>
</Table>

> ❗️ Important Note on yunoCreatePayment
>
> You can call `yunoCreatePayment` with or without the `information` parameter based on your needs. However, use only one version in your code, as calling both is not required and may cause issues.

## Step 4: Add the SDK view to the checkout

After calling the `startCheckout()` function, your view needs to adopt the `YunoPaymentFullDelegate` protocol. This allows your app to respond to payment-related actions, such as when the user selects a payment method.

Here is how to define the delegate:

```swift
protocol YunoPaymentFullDelegate: YunoPaymentDelegate {
    func yunoDidSelect(paymentMethod: YunoSDK.PaymentMethodSelected)
    func yunoDidUnenrollSuccessfully(_ success: Bool)
    func yunoUpdatePaymentMethodsViewHeight(_ height: CGFloat)
}
```

The following table describes the functions available:

| Function                                                      | Description                                                                                            |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `yunoDidSelect(paymentMethod: YunoSDK.PaymentMethodSelected)` | Called when the user selects a payment method. <br />- `paymentMethod`: The method the user chose.     |
| `yunoDidUnenrollSuccessfully(_ success: Bool)`                | Called when an unenroll action finishes. <br />- `success`: `true` if it worked, `false` if it didn’t. |
| `yunoUpdatePaymentMethodsViewHeight(_ height: CGFloat)`       | Called when `getPaymentMethodView()` is invoked and whenever the view's height changes.                |

[]()To display the payment methods, call the following method and pass your view model or controller as the delegate.

```swift
Yuno.getPaymentMethodView(delegate:)
```

This method will automatically return the correct type of view depending on the UI framework you are using:

* If you're using **UIKit**, it returns a `UIView`.
* If you're using **SwiftUI**, it returns a `some View`.

This makes it easy to integrate the SDK into any iOS project, no matter which UI framework you use.

## Step 5: Initiate the payment process

To effectively start a payment after displaying the payment methods, you have to call the method `startPayment`, as presented in the code snippet below:

```swift
Yuno.startPayment(showPaymentStatus:Bool)
```

## Step 6: Get the OTT (one-time token)

You can obtain the one-time token to create the payment back-to-back at the end of this process. You will get the one-time token in the function `yunoCreatePayment()` that you get when implementing the `YunoPaymentDelegate`. An example of retrieving the one-time token is presented below:

```swift
func yunoCreatePayment(with token: String) { ... }
```

## Step 7: Create the Payment

Once you have completed the steps described before, you can create a payment. The back-to-back payment creation must be carried out using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant should call their backend to create the payment within Yuno, using the one-time token and the checkout session.

> ❗️ Important Integration Step
>
> Yuno **requires** you to integrate the `continuePayment` method of the SDK after the payment is created. This is necessary because certain asynchronous payment methods require additional action from the customer to complete the transaction. The API will notify you of this scenario via the `sdk_action_required` field in the response, which will be returned as true. The `yuno.continuePayment()` function will display the additional screens to the customers, allowing them to complete the payment without requiring you to handle every scenario. [test](#test)

```swift
Yuno.continuePayment(showPaymentStatus: Bool)
```

The `showPaymentStatus` parameter is used to determine whether the payment status should be displayed or not. By passing `true` as an argument, the payment status might be shown, while passing `false` could indicate that the payment status should not be displayed.

> ❗️ Default Payment Status Display
>
> In Yuno's iOS Full SDK, the default value for `showPaymentStatus` is `true`.

## Step 8: Handle Payment Status (Optional)

> 🚧 Deep Links and Mercado Pago Checkout Pro
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

## Callback

After the payment is completed, the SDK can return different transaction states: `success`, `fail`, `processing`, `reject`, `internalError`, and `userCancell`.  The descriptions of each transaction state is presented in the table below.

| Transaction state | Description                                                                                                                                                                                                                         |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `succeeded`       | Indicates that the transaction or payment process has been completed successfully.                                                                                                                                                  |
| `fail`            | This state indicates that the transaction or payment process has failed. It means that there was an error or issue during the payment process, preventing it from being completed successfully.                                     |
| `processing`      | Indicates that the transaction or payment process is currently being processed. It is typically used when there is a delay in payment processing, such as waiting for approval from a third-party service or financial institution. |
| `reject`          | This state indicates that the transaction has been rejected. The rejection can occur for various reasons, such as insufficient funds, fraudulent activity, or requests that violate specific rules or policies.                     |
| `internalError`   | It means that an unexpected error occurred within the system or infrastructure handling the payment process. This state suggests a problem on the server or backend side rather than an issue with the user's input or request.     |
| `userCancell`     | This state indicates that the user has voluntarily canceled or aborted the transaction or payment process. This state is typically used when there is an option for the user to cancel or abandon the payment process.              |

To get the transaction state, you have to implement the delegate presented in the following piece of code:

```swift
enum Result {
    case reject, success, fail, processing, internalError, userCancell
}

func yunoPaymentResult(_ result: Yuno.Result) { ... }
func yunoEnrollmentResult(_ result: Yuno.Result) { ... }
```

## Complementary Features

Yuno iOS SDK provides additional services and configurations you can use to improve customers' experience. Use the [SDK Customizations](https://docs.y.uno/docs/sdk-customizations-ios) to change the SDK appearance to match your brand or to configure the loader.

* [Loader](https://docs.y.uno/docs/loader-1): Control the use of the loader.
* **Save card for future payments**: In addition, you can display a checkbox for save or enroll cards using `cardSaveEnable: true`. Below you can find examples of the checkbox for both card form renders.

<Image align="center" src="https://files.readme.io/ae235ca04eda2c260442c375617e64950bed2a0564578771fcc3403de7ca965e-Card___save_for_future_payments.png" />

* You also can choose one of the render options for the card form. Below you find screenshots presenting the difference between the `cardFormType` `ONE_STEP` and `STEP_BY_STEP`.

<Image align="center" src="https://files.readme.io/0a1e67430bc9765920c9252731b79626f3777c96322a66a760f682dafc72c637-Full_SDK_ios.png" />

* [SDK Customizations](https://docs.y.uno/docs/sdk-customizations-ios): Change the SDK appearance to match your brand.

> 📘 Demo App
>
> In addition to the code examples provided, you can access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-ios) for a complete implementation of Yuno iOS SDKs.