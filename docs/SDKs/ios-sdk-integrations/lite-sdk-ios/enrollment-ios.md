---
title: Lite SDK (Enrollment iOS)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Lite SDK (Enrollment)
  description: >-
    Here is a step-by-step guide on integrating Yuno's Lite SDK (Enrollment)
    into your iOS application, enabling efficient and secure payment processing
    for your mobile platform.
  robots: index
next:
  description: ''
---
On this page, you will find all the steps to add, configure, and use the Lite iOS SDK to enroll payment methods in your iOS project.

##Requirements

In order to implement the Yuno iOS SDK, first, you need to address the following requirements:

* Add [CocoaPods](https://guides.cocoapods.org/using/using-cocoapods.html) or [Swift Package Manager](https://www.swift.org/package-manager/) to your project.
* Use iOS version 14.0 or above.

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

## Step 2: Enroll a new payment method

Yuno's iOS SDK provides an enrollment feature for payment methods integrated into Yuno. To display a view controller with the flow for integrating a new payment method, call the method presented in the following code snippet:

```swift
protocol YunoPaymentDelegate: AnyObject {

    var customerSession: String { get }
  	// The complete list of country codes is available on https://docs.y.uno/docs/country-coverage-yuno-sdk
    var countryCode: String { get }
    var language: String? { get }
    var viewController: UIViewController? { get }

    func yunoEnrollmentResult(_ result: Yuno.Result)
}

class ViewController: YunoEnrollmentDelegate {

    func startEnrollment() {
        Yuno.enrollPayment(with: self, showPaymentStatus: Bool)
    }
}

```

The following table presents all the protocol requirements you have to provide and their descriptions.

| Parameter                                      | Description                                                                                                                                                                                                                           |
| :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `customerSession`                              | Refers to the current payment's customer session.                                                                                                                                                                                     |
| `countryCode`                                  | This parameter determines the country for which the payment process is being configured. The complete list of supported countries and their country code is available on the [Country coverage](doc:country-coverage-yuno-sdk)  page. |
| `language`                                     | Defines the language to be used in the payment forms. You can set it to one of the available language options: es (Spanish), en (English), or pt (Portuguese).                                                                        |
| `yunoEnrollmentResult(\_ result: Yuno.Result)` | This method is called when the enrollment process is completed, providing the result of the enrollment as a parameter of type `Yuno.Result`.                                                                                          |

The parameter`showPaymentStatus`is used to determine whether the payment status should be displayed. Passing `true`as an argument will show the payment status while passing `false` indicates that the payment status should not be displayed.

The class `ViewController ` is a subclass of `UIViewController `and conforms to the `YunoEnrollmentDelegate `protocol. It includes a function called` enrollPayment(with delegate: YunoEnrollmentDelegate, showPaymentStatus: Bool)`, which parameters are described below:

* `delegate: YunoEnrollmentDelegate` : The delegate object that handles enrollment callbacks.
* `showPaymentStatus: Bool`: A Boolean flag that determines whether to display status views during the payment enrollment process.

The method `enrollPayment` initiates the payment enrollment process. You should call It in response to user interactions, such as pressing a button. The method utilizes the provided `delegate `to manage enrollment events and, based on the parameter `showPaymentStatus `decides whether to show visual feedback about the enrollment status.

## Step 3: Enrollment status

> ❗️ Deep Link Enrollment
>
> This feature is only used if you enroll in a payment method that executes deep links. If you are not enrolling in a payment method that executes deep links, you can ignore Step 3.

If you use a payment method that requires a deep link to return to your app, use the method described in the following code block to obtain the enrollment status in your AppDelegate. The `url.scheme` should be the same as the `callback_url` used when creating the `customer_session`.

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
  
  // Here your scheme URL should be the same as the callback_url you set in the customer session
  
  guard url.scheme == "yunoexample" else { return false }
  return Yuno.receiveDeeplink(url, showStatusView: true)
}

```

## Complementary Features

Yuno iOS SDK provides additional services and configurations you can use to improve customers' experience.

### Render option

When presenting the enrollment, you can also choose one of the render options for the card form. You have the following options:

* `ONE_STEP`
* `STEP_BY_STEP`

To change the render option, set the `cardFormType` equal one of the available options. Each option is presented below.

<Image align="center" src="https://files.readme.io/ff9a74d50d3a8d3a4e550be1b917832bd6b8daa28cc4249d9ec22edef2f410bc-Full_SDK_ios.png" />

### Loader

Control the use of the [Loader](https://docs.y.uno/docs/loader-1).

### SDK Customizations

Use the [SDK Customizations](https://docs.y.uno/docs/sdk-customizations-ios) to change the SDK appearance to match your brand.

> 📘 Demo App
>
> In addition to the code examples provided, you can access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-ios) for a complete implementation of Yuno iOS SDKs.