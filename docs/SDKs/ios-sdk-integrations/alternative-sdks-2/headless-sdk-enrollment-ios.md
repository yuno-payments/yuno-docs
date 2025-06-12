---
title: Headless SDK (Enrollment iOS)
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
Yuno's Headless iOS SDK lets you enroll in payment methods and tokenize cards, saving them for future use.

> 📘 Recommended SDKs
>
> We recommend using the [iOS Full SDK](full-checkout-ios) or the [iOS Lite SDK](enrollment-ios) for a smooth integration experience. These options provide a complete solution with built-in forms and validation.

The following steps describe enrolling a payment method using Yuno's Headless SDK.

> 📘 Complete enrollment guide
>
> On this page, you will find all the steps related to using the Headless SDK to enrol in a payment method. For a complete guide, including the customer creation, access [Headless SDK (Enrollment)](headless-sdk-enrollment-steps).

## Requirements

To execute the enrollment process, you need to provide the `customer_session` to start the enrollment process in [Step 3](doc:headless-sdk-enrollment#step-3-start-the-enrollment-process). To acquire the  `customer_session`, you need to:

1. **Create a customer**: A customer is required to enroll in payments. Use the [Create Customer](ref:create-customer) endpoint to create new customers. In the response, you will receive the customer `id`, which you use to create the customer session.
2. **Create the customer session**: Use the  customer `id` and the [Create Customer Session](ref:create-customer-session) endpoint to receive the `customer_session`.

A complete enrollment process description is covered in [Headless SDK (Enrollment)](doc:headless-sdk-enrollment-steps).

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
import Yuno

Yuno.initialize(
    apiKey: "<Your PUBLIC_API_KEY>"
)

```

## Step 3: Create a customer session

To start the enrollment process, you need to provide the `customer_session`. First, you need to create a customer. You need a customer to enroll payments with. Use the [Create Customer](ref:create-customer) endpoint to create new customers. In the response, you will receive the customer `id`, which you use to create the customer session.

After creating the customer, you can create the customer session. Use the  customer `id` and the [Create Customer Session](ref:create-customer-session) endpoint. The `customer_session` will be provided in the response. You need a new `customer_session` every time you enroll in a new payment method.

## Step 4: Create an enrollment payment method object

You need an enrollment payment method object to set Headless SDK integration for enrollment. You can create one using the [Enroll Payment Method](ref:enroll-payment-method-checkout) endpoint. While creating the payment method object, you need to define which payment method your customer can enroll in. Currently, only CARD is available for Headless SDK.

> 📘 Verify card
>
> If you want to verify cards (zero value authorization) before enrollment, you need to provide the `verify` object when creating the payment method object for the customer session.

## Step 5: Start the enrollment process

Next, you will start the checkout process using the `apiClientEnroll` function, providing the necessary configuration parameters. The following table lists all required parameters and their descriptions.

| Parameter          | Description                                                                                                                                                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `country_code`     | This parameter determines the country for which the payment process is being configured. The complete list of supported countries and their `country_code` is available on the [Country coverage](doc:country-coverage-yuno-sdk)  page. |
| `customer_session` | Refers to the current enrollment's [customer session](doc:sessions)   received as a response to the [Create Customer Session](ref:create-customer-session)   endpoint.\<br>Example: '438413b7-4921-41e4-b8f3-28a5a0141638'              |

The next code block presents an example of the parameter configuration.

```swift
var apiClientEnroll: YunoEnrollHeadless?

apiClientEnroll = Yuno.apiClientEnroll(

  /**
     * country can be one of the following: https://docs.y.uno/docs/country-coverage-yuno-sdk
     */
    country_code: "CO",
     /**
     * The customer_session created in https://docs.y.uno/reference/create-customer-session
     */
    customer_session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3"
  )
```

## Step 6: Generate a vaulted token

After collecting all user information, you can start the enrollment. First, you need to create a `vaulted_token` using the function `apiClientEnroll.continueEnrollment`. As it is an asynchronous function, you can use `do/catch` to ensure you will correctly handle triggered errors. Below, you will find an example of creating a  `vaulted_token`:

```swift
/**
 * Create Token
 * This function will trigger an error if there is missing data.
 * You can catch this error using a do/catch block.
 */
// `EnrollmentCollectedData` is a public data type that contains the necessary information for the payment structure.
let enrollmentCollectedData: EnrollmentCollectedData = EnrollmentCollectedData(
    // The customer_session created in https://docs.y.uno/reference/create-customer-session
    customerSession: "eec6578e-ac2f-40a0-8065-25b5957f6dd3",
    // The necessary info to use the payment method structure
    paymentMethod: CollectedData(
        type: "CARD",
        card: CardData(
            detail: CardData.Detail(
                number: "4111111111111111",
                expirationMonth: 12,
                expirationYear: 25,
                securityCode: "123",
                holderName: "Andrea",
                // Use `.debit` or `.credit` for the card type.
                type: .credit
            )
        ),
        customer: Customer(
            // Add the complete customer object here.
            // You can check the object here: https://docs.y.uno/reference/the-customer-object
            // You create the customer using the following endpoint: https://docs.y.uno/reference/create-customer
        )
    )
)

let result = try await apiClientEnroll.continueEnrollment(data: enrollmentCollectedData)
```

<br />

> 📘 PCI Compliance
>
> Please bear in mind that you are capturing sensitive card data. Therefore, you need to comply with good practices regarding data management. If you don't have a PCI certification, you can't save any card data other than the token provided by the SDK.

After enrolling the new card, you will receive the `vaulted_token`, which you can use to make payments in the future without asking for your customer's card information. The following code block presents an example of a response from the `apiClientEnroll.continueEnrollment` function. The response is a dictionary of type `[String: Any]`.

```swift
[
 vaulted_token: "9104911d-5df9-429e-8488-ad41abea1a4b",
 status: "ENROLLED",

//Same status for all SDKs: CREATED,
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
 customer: [
   session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3"
 ]
]
```

<br />

> 📘 Enrollment Status via Webhooks
>
> Consider using the enrollment status received via [Webhooks](webhooks). Yuno recommends always using this status to base and make business decisions on your platform.

> 📘 Demo Application
>
> In addition to the code examples provided, you can access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-ios) for a complete implementation of Yuno iOS SDKs.