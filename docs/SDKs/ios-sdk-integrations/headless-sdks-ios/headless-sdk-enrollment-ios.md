---
title: Headless SDK (Enrollment iOS)
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
<br />

> 👍 Recommended SDK
>
> We recommend using the [iOS Seamless SDK](seamless-sdk-payment-ios) for a smooth integration experience. This option provides a flexible payment solution with pre-built UI components and customization options.

Yuno's Headless iOS SDK lets you enroll in payment methods and tokenize cards, saving them for future use.

The following steps describe enrolling a payment method using Yuno's Headless SDK.

> 📘 Enrollment Guide
>
> This page provides all the steps for using the Headless SDK to enroll in a payment method. For a comprehensive guide, including customer creation, visit [Headless SDK (Enrollment)](headless-sdk-enrollment-steps).

## Requirements

To execute the enrollment process, you need to provide the `customer_session` to start the enrollment process in [Step 3](doc:headless-sdk-enrollment#step-3-start-the-enrollment-process). To acquire the  `customer_session`, you need to:

1. **Create a customer**: A customer is required to enroll in payments. Use the [Create Customer](ref:create-customer) endpoint to create new customers. In the response, you will receive the customer `id`, which you use to create the customer session.
2. **Create the customer session**: Use the  customer `id` and the [Create Customer Session](ref:create-customer-session) endpoint to receive the `customer_session`.

A complete enrollment process description is covered in [Headless SDK (Enrollment)](doc:headless-sdk-enrollment-steps).

## Step 1: Include the library in your project

The first step is to install Yuno SDK to your iOS project.

> 📘 Check iOS SDK Versions
>
> To view all available versions, visit the [release page](https://github.com/yuno-payments/yuno-sdk-ios/releases) on the Yuno iOS SDK repository.

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

To initialize the Headless SDK, you need to import Yuno and provide a valid **PUBLIC_API_KEY**. If you don't have your API credentials, access the [Developers (Credentials)](doc:developers-credentials) page to check how to retrieve them from the dashboard.

The code block below presents an example of importing and initializing the `Yuno`.

```swift
import Yuno

Yuno.initialize(
    apiKey: "PUBLIC_API_KEY",
    callback: { (value: Bool) in }
)
```

> 📘 UISceneDelegate Initialization
>
> If your app uses a `UISceneDelegate`, you can initialize Yuno within your `SceneDelegate`. However, if you prefer to initialize Yuno in a different part of your app, the initialization method provides a callback that notifies you when the process has finished.

## Step 3: Create a customer session

To start the enrollment process, you need to provide the `customer_session`. First, you need to create a customer. You need a customer to enroll payments with. Use the [Create Customer](ref:create-customer) endpoint to create new customers. In the response, you will receive the customer `id`, which you use to create the customer session.

After creating the customer, you can create the customer session. Use the  customer `id` and the [Create Customer Session](ref:create-customer-session) endpoint. The `customer_session` will be provided in the response. You need a new `customer_session` every time you enroll in a new payment method.

## Step 4: Create an enrollment payment method object

You need an enrollment payment method object to set Headless SDK integration for enrollment. You can create one using the [Enroll Payment Method](ref:enroll-payment-method-checkout) endpoint. While creating the payment method object, you need to define which payment method your customer can enroll in. Currently, only CARD is available for Headless SDK.

> 📘 Card Verification
>
> To verify cards with zero value authorization before enrollment, include the `verify` object when creating the payment method object for the customer session.

## Step 5: Start the enrollment process

Next, you will start the checkout process using the `apiClientEnroll` function, providing the necessary configuration parameters.

> ⚠️ Error Handling
>
> This method throws an error if the Yuno SDK has not been initialized before calling it.

Parameters

The following table lists all required parameters and their descriptions.

| Parameter         | Description                                                                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `countryCode`     | This parameter determines the country for which the payment process is being configured. The complete list of supported countries and their `countryCode` is available on the [Country coverage](doc:country-coverage-yuno-sdk) page. |
| `customerSession` | Refers to the current enrollment's [customer session](doc:sessions) received as a response to the [Create Customer Session](ref:create-customer-session) endpoint. Example: '438413b7-4921-41e4-b8f3-28a5a0141638'                    |

The next code block presents an example of the parameter configuration.

```swift
var apiClientEnroll: YunoEnrollHeadless?

apiClientEnroll = try Yuno.apiClientEnroll(
    countryCode: "CO",
    customerSession: "eec6578e-ac2f-40a0-8065-25b5957f6dd3"
)
```

## Step 6: Generate a vaulted token

After collecting all user information, you can start the enrollment. First, you need to create a `vaulted_token` using the function `apiClientEnroll.continueEnrollment`. As it is an asynchronous function, you can use `do/catch` to ensure you will correctly handle triggered errors. Below, you will find an example of creating a  `vaulted_token`:

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

After enrolling the new card, you will receive the `vaulted_token`, which you can use to make payments in the future without asking for your customer's card information. The following code block presents an example of a response from the `apiClientEnroll.continueEnrollment` function. The response is a dictionary of type `[String: String]`.

```swift
[
 vaulted_token: "9104911d-5df9-429e-8488-ad41abea1a4b",
 status: "ENROLLED",

    EXPIRED,
    REJECTED,
   
 READY_TO_ENROLL,
    ENROLL_IN_PROCESS,
    UNENROLL_IN_PROCESS,
    IN_PROCESS,
    ENROLLED,
    DECLINED,
    CANCELED,
    ERROR,
    UNENROLLED;
 customerSession: "eec6578e-ac2f-40a0-8065-25b5957f6dd3"
]
```

> 📘 Using Webhooks for Enrollment Status
>
> Consider using the enrollment status received via [Webhooks](webhooks). Yuno recommends always using this status to base and make business decisions on your platform.

> 📘 Access the Demo Application
>
> In addition to the code examples provided, you can access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-ios) for a complete implementation of Yuno iOS SDKs.
