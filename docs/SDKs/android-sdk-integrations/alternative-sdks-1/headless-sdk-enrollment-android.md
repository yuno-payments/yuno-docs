---
title: Headless SDK (Enrollment Android)
deprecated: false
hidden: true
metadata:
  robots: index
---
This page provides a guide to the Yuno Headless SDK for Android enrollment.

The Yuno Headless SDK for Android provides a flexible, UI-free solution for enrolling payment methods and tokenizing cards.

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

* [Full SDK](doc:android)
* [Lite SDK](doc:enrollment-android)

## Requirements

Before starting the Yuno Android SDK integration, ensure your project meets the [technical requirements](doc:requirements-android). Also, ensure the following prerequisites are in place:

* You must have an active Yuno account
* You need your Yuno API credentials:
  * `account_id`
  * `public-api-key`
  * `private-secret-key`

You can obtain these credentials from the [Developers section of the Yuno dashboard](../docs/developers-credentials). They are required to:

* Create a `customer`, which is required before enrolling payment methods
* Create a `customer_session`, which initializes the enrollment flow

> 📘 SDK Version Information
>
> Verify the current SDK version by accessing the [Release notes](doc:release-notes-android) or visiting the [Yuno Android SDK repository](https://github.com/yuno-payments/yuno-sdk-android).

## Step 1: Create a customer

Create a customer using the [Create Customer](ref:create-customer) endpoint before enrolling payment methods.

**Prerequisites:**

* Active Yuno account
* API credentials

**Required for:**

* Identifying the person enrolling the payment method
* Enabling saved payment method functionality
* Tracking enrollment history
* Store the customer ID securely for the next step.

## Step 2: Create a customer session

Create a new `customer_session` using the [Create Customer Session](ref:create-customer-session) endpoint:

**Prerequisites:**

* Customer ID from Step 1
* API credentials

**Required actions:**

* Include the customer ID in the request
* Store the returned `customer_session` ID
* Generate a new `customer_session` for each payment method enrollment.

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

Retrieve your public API keys from the [Yuno dashboard](https://dashboard.y.uno/).

If you haven't implemented a custom application, create one. In the `onCreate()` method of your application class, call the initialize function (`Yuno.initialize`):

```kotlin
class CustomApplication : Application() {
  override fun onCreate() {
    super.onCreate()
    Yuno.initialize(
      this,
      PUBLIC_API_KEY,
      config: YunoConfig,
    )
  }
}
```

## Step 5: Create a customer session

To start the enrollment process:

1. Create a customer using the [Create Customer](ref:create-customer) endpoint. The response will include the customer `id`.

2. Create a customer session using:
   * The customer `id` from step 1
   * The [Create Customer Session](ref:create-customer-session) endpoint

The endpoint response will provide the `customer_session` value required for enrollment.

> 🚧 Customer Session Generation
>
> You need to generate a new `customer_session` each time you enroll a payment method.

## Step 6: Create an enrollment payment method object

Create an enrollment payment method object using the [Enroll Payment Method](ref:enroll-payment-method-checkout) endpoint to set up the Headless SDK integration for enrollment. When creating this object, specify which payment method type your customer can enroll in. Currently, the Headless SDK only supports the CARD payment method type.

> 📘 Card Verification
>
> To verify cards (zero value authorization) before enrollment, include the `verify` object when creating the payment method object for the customer session. [Learn more](#verify-cards)

## Step 7: Start the enrollment process

Use the `apiClientEnroll` function to start the enrollment process. This function requires configuration parameters that define how the enrollment will be processed. The following table describes the required parameters:

| Parameter          | Description                                                                                                                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `country_code`     | This parameter determines the country for which the payment process is being configured. The complete list of supported countries and their `country_code` is available on the [Country coverage](doc:quickstart) page. |
| `customer_session` | Refers to the current enrollment's [customer session](doc:sessions) received as a response to the [Create Customer Session](ref:create-customer-session) endpoint. Example: `438413b7-4921-41e4-b8f3-28a5a0141638`                     |

The following code block shows an example of the parameter configuration:

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
	val apiClientEnroll = Yuno.apiClientEnroll(
  	country_code = "CO",
    
    customer_session = "eec6578e-ac2f-40a0-8065-25b5957f6dd3",

    context = this 
  )
 }
```

## Step 8: Generate a vaulted token

After collecting all required customer information, create a `vaulted_token` using the `apiClientEnroll.continueEnrollment` function. Since this is an asynchronous function, use a `try/catch` block to handle any errors that may occur. The following example shows how to create a `vaulted_token`:

```kotlin
apiClientEnroll.continueEnrollment( 
 collectedData = EnrollmentCollectedData(
    customerSession = "customer_session",
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
                   type = CardType.DEBIT
               ),
           customer = Customer(
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

The following code block shows an example of observing the response:

```kotlin
apiClientPayment.continueEnrollment(data, context).observe(context) { response ->
   val status = response["status"] as String?
   val vauldtedtoken = response["vaulted_token"] as String?
}
```

### Enrollment flow states

The `apiClientEnroll.continueEnrollment` function returns a response that includes a `status` field indicating the current state of the enrollment process. The following are the possible states returned:

```kotlin
const val ENROLLMENT_STATE_SUCCEEDED = "SUCCEEDED"
const val ENROLLMENT_STATE_FAIL = "FAIL"
const val ENROLLMENT_STATE_PROCESSING = "PROCESSING"
const val ENROLLMENT_STATE_REJECT = "REJECT"
const val ENROLLMENT_STATE_INTERNAL_ERROR = "INTERNAL_ERROR"
const val ENROLLMENT_STATE_CANCELED_BY_USER = "CANCELED"
```

The following table provides additional information about the possible states:

| **State**        | **Description**                                                                                                                | **Additional action required**                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `SUCCEEDED`      | The enrollment process was successfully completed without any errors.                                                          | No.                                                                                                           |
| `FAIL`           | The enrollment attempt failed due to errors such as data validation issues, server connection failures, or technical problems. | Yes. Investigate the cause of failure (validation, network, server) and take corrective measures.             |
| `PROCESSING`     | The enrollment is currently in progress, awaiting approval or verification.                                                    | No.                                                                                                           |
| `REJECT`         | The enrollment was rejected due to reasons such as missing requirements or detected inconsistencies.                           | Yes. Inform the user of the rejection, provide the reason if possible, and suggest next steps.                |
| `INTERNAL_ERROR` | An unexpected internal error occurred within the system handling the enrollment process.                                       | Yes. Requires technical intervention to review the system, fix internal issues, and retry or inform the user. |
| `CANCELED`       | The user voluntarily canceled the enrollment process or exited before completion.                                              | No.                                                                                                           |

> 📘 Webhook Status Tracking
>
> Consider using the enrollment status received via [Webhooks](#webhooks). Yuno recommends always using this status to base and make business decisions on your platform.

<br />

## Error handling

Handle errors returned by the SDK in your app (e.g. failed payments, validation errors). For HTTP status and response codes, see [Status and response codes](https://docs.y.uno/reference/status-and-response-codes) in the API reference.
