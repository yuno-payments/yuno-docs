---
title: Headless SDK (Enrollment Android)
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
The Yuno Headless SDK for Android provides a flexible, UI-free solution for enrolling payment methods and tokenizing cards.

> 👍 Recommended SDKs
>
> We recommend using the [Android Full SDK](full-checkout-android) or the [Android Lite SDK](lite-checkout-android) for a smooth integration experience. These options provide a complete solution with built-in forms and validation.

This SDK offers complete control over the payment method enrollment process, making it ideal for merchants who:

* Need full control over the UI and user experience
* Want to implement custom enrollment flows
* Require advanced integration capabilities

The Headless SDK includes core features like:

* Card tokenization
* Secure payment method enrollment
* Direct API access
* Custom error handling

For merchants requiring a pre-built UI solution or simpler integration, consider using our other SDK implementations:

* [Full SDK](doc:full-checkout-android)
* [Lite SDK](doc:enrollment-android)

## Requirements

Before starting the Yuno Android SDK integration, make sure your project meets the [technical requirements](doc:requirements-android). In addition, ensure the following prerequisites are in place:

* You must have an active Yuno account
* To perform the integration, you'll need your Yuno API credentials:
  * `account_id`
  * `public-api-key`
  * `private-secret-key`

You can obtain these credentials from the [Developers section of the Yuno dashboard](https://docs.y.uno/docs/developers-credentials). They are required to:

* Create a `customer`, which is required before enrolling payment methods
* Create a `customer_session`, which initializes the enrollment flow

> 📘 SDK Version Information
>
> Verify the latest SDK version by accessing the [Release notes](release-notes-android-sdk) or visiting the [Yuno Android SDK repository](https://github.com/yuno-payments/yuno-sdk-android).

## Step 1: Create a customer

Before enrolling payment methods, you need to create a customer using the [Create Customer](ref:create-customer) endpoint.

**Prerequisites:**

* Active Yuno account
* API credentials

**Required for:**

* Identifying the person enrolling the payment method
* Enabling saved payment method functionality
* Tracking enrollment history
* Store the customer ID securely; you'll need it for the next step.

## Step 2: Create a customer session

Create a new `customer_session` using the [Create Customer Session](ref:create-customer-session) endpoint.

**Prerequisites:**

* Customer ID from Step 1
* API credentials

**Required actions:**

* Include the customer ID in the request
* Store the returned `customer_session` ID
* Generate a new `customer_session`  for each payment method enrollment.

## Step 3: Add the SDK to your project

**Prerequisites:**

* Android project setup
* Gradle configuration access

1. Add the repository source:

```kotlin
maven { url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" }
```

2. Add the SDK dependency:

```kotlin
dependencies {
    implementation 'com.yuno.payments:android-sdk:{last_version}'
}
```

> 📘 Internet Permission Required
>
> The Yuno SDK automatically includes the `INTERNET` permission, necessary for network requests. Ensure your AndroidManifest.xml contains:
>
> `<uses-permission android:name="android.permission.INTERNET" />`

## Step 4: Initialize Headless SDK with the public key

First, retrieve your public API keys from the [Yuno dashboard](https://dashboard.y.uno/).

If you haven't implemented a custom application, create one. In the `onCreate()` method of your application class, call the initialize function (`Yuno.initialize`) as shown in the example below:

```kotlin
class CustomApplication : Application() {
  override fun onCreate() {
    super.onCreate()
    Yuno.initialize(
      this,
      "your api key",
      config: YunoConfig, // This is a data class to use custom configs in the SDK.
    )
  }
}
```

## Step 5: Create a customer session

To start the enrollment process, you need to:

1. Create a customer using the [Create Customer](ref:create-customer) endpoint. The response will include the customer `id`.

2. Create a customer session using:
   * The customer `id` from step 1
   * The [Create Customer Session](ref:create-customer-session) endpoint

The endpoint response will provide the `customer_session` value required for enrollment.

> 🚧 Customer Session Generation
>
> You need to generate a new `customer_session` each time you enroll a payment method.

## Step 6: Create an enrollment payment method object

To set up the Headless SDK integration for enrollment, you need to create an enrollment payment method object using the [Enroll Payment Method](ref:enroll-payment-method-checkout) endpoint. When creating this object, specify which payment method type your customer can enroll in. Currently, the Headless SDK only supports the CARD payment method type.

> 📘 Card Verification
>
> To verify cards (zero value authorization) before enrollment, include the `verify` object when creating the payment method object for the customer session. [Learn more](#verify-cards)

## Step 7: Start the enrollment process

To start the enrollment process, use the `apiClientEnroll` function. This function requires configuration parameters that define how the enrollment will be processed. The following table describes the required parameters.

| Parameter          | Description                                                                                                                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `country_code`     | This parameter determines the country for which the payment process is being configured. The complete list of supported countries and their `country_code` is available on the [Country coverage](doc:country-coverage-yuno-sdk) page. |
| `customer_session` | Refers to the current enrollment's [customer session](doc:sessions) received as a response to the [Create Customer Session](ref:create-customer-session) endpoint. Example: `438413b7-4921-41e4-b8f3-28a5a0141638`                     |

The following code block presents an example of the parameter configuration.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
	val apiClientEnroll = Yuno.apiClientEnroll(
    // country can be one of the following: https://docs.y.uno/docs/country-coverage-yuno-sdk
  	country_code = "CO",
    
		// The customer_session created in https://docs.y.uno/reference/create-customer-session
    customerSession = "eec6578e-ac2f-40a0-8065-25b5957f6dd3",

    context = this ->  it´s the context of your activity 
  )
 }
```

## Step 8: Generate a vaulted token

After collecting all required customer information, create a `vaulted_token` using the `apiClientEnroll.continueEnrollment` function. Since this is an asynchronous function, use a `try/catch` block to handle any errors that may occur. The following example demonstrates how to create a `vaulted_token`:

```kotlin
/**
 * Create Token
 * This function will trigger an error if there is missing data.
 * You can catch this error using a try/catch block.
 */
apiClientEnroll.continueEnrollment( 
 collectedData = EnrollmentCollectedData(
   	// The customer_session created in https://docs.y.uno/reference/create-customer-session
    customerSession = "customer_session",
   	// The necessary info to use the payment method structure
    paymentMethod = EnrollmentMethod(
           type = "CARD",
           card = CardData(
               save = true,
               detail = Detail(
                   expirationMonth = 11,
                   expirationYear = 55,
                   number = "4111111111111111",
                   securityCode = "123",
                   holderName = "Firstname Lastname",
                 	// Use `CardType.DEBIT` or `CardType.CREDIT` for the card type.
                   type = CardType.DEBIT
               ),
           customer = Customer(
             	 // You can check the object here: https://docs.y.uno/reference/the-customer-object
            	 // You create the customer using the following endpoint: https://docs.y.uno/reference/create-customer
               id = "id",
               merchantCustomerId = "merchant_customer_id",
               firstName = "firstName",
             	  email = "email@email.com",
               country = "CO",
               document = Document(
                   documentType = "PAS",
                   documentNumber = "PAS12312"
               ),
             phone = Phone(
                   number = "321123321123",
                   country_code = "57"
               )
            )
      )
   ),
  context = this
 )

```

> 🚧 PCI Compliance
>
> Ensure you adhere to best practices for managing sensitive card data. Without PCI certification, you are prohibited from storing any card data except for the token provided by the SDK.

The `apiClientEnroll.continueEnrollment` function returns an Observable type that extends `LiveData`. You can observe the response as a standard `LiveData` with type `SingleLiveEvent<Map<String, Any?>>`. This `LiveData` emits only once and returns a `Map` containing the complete response. Below is an example response from calling `apiClientEnroll.continueEnrollment`:

```json
{
  "vaulted_token": "9104911d-5df9-429e-8488-ad41abea1a4b",
  "status": "SUCCEEDED",
  "customer": {
    "session": "eec6578e-ac2f-40a0-8065-25b5957f6dd3"
  }
}
```
```
```

The code block below presents an example of observing the response:

```kotlin
apiClientPayment.continueEnrollment(data, context).observe(context) { response ->
   val status = response["status"] as String?
   val vauldtedtoken = response["vaulted_token"] as String?
}
```

> 📘 Webhook Status Tracking
>
> Consider using the enrollment status received via [Webhooks](#webhooks). Yuno recommends always using this status to base and make business decisions on your platform.