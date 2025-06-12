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
| `checkout_session` | Refers to the current payment's checkout session created using the \[Create Checkout Session]\(ref:create-checkout-session)  endpoint.\<br>Example: '438413b7-4921-41e4-b8f3-28a5a0141638'                                              |

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