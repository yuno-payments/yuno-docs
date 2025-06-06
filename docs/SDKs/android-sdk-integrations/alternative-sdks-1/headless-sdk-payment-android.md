---
title: Headless SDK (Payment Android)
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
The Headless Android SDK provides a flexible, low-level integration option that gives you complete control over the payment UI and flow. 

> 📘 Recommended SDKs
>
> We recommend using the [Android Full SDK](full-checkout-android) or the [Android Lite SDK](lite-checkout-android) for a smooth integration experience. These options provide a complete solution with built-in forms and validation.


This SDK is ideal for merchants who:

* Need full control over the payment UI and user experience
* Want to build custom payment flows
* Require advanced integration capabilities

The Headless SDK includes core features like:

* Direct API access for payment processing
* Token generation for payment methods
* 3DS authentication handling
* Fraud prevention data collection

For merchants preferring a pre-built UI solution, consider using our [Full SDK](doc:full-checkout-android) or [Lite SDK](doc:lite-checkout-android) instead.

## Requirements

Before starting the Yuno Android SDK integration, make sure your project meets the [technical requirements](doc:requirements-android). In addition, ensure the following prerequisites are in place:

* You must have an active Yuno account.
* To perform the integration, you'll need your Yuno API credentials (`account_id`, `public-api-key`, and `private-secret-key`), which you can obtain from the [Developers section of the Yuno dashboard](https://docs.y.uno/docs/developers-credentials). These credentials are required to authenticate requests to the Yuno API. The API is used to:
  * Create a `customer`, which is required before initiating payments
  * Create a `checkout_session`, which initializes the payment flow
  * Create the payment associated with the session

> 📘 SDK Version
>
> Access the [Release notes](release-notes-android-sdk) or the [Yuno Android SDK repository](https://github.com/yuno-payments/yuno-sdk-android) to verify the last SDK version available.


## Step 1: Create a customer

Before initiating payments, you need to create a customer using the [Create customer endpoint](ref:create-customer). This step is required to:

* Identify the person making the payment
* Enable saved payment method functionality (if enabled)
* Track payment history

The customer ID returned from this endpoint will be used when creating the `checkout_session`.

## Step 2: Create a checkout session

To initialize the payment flow, create a new `checkout_session` using the [Create checkout session](ref:create-checkout-session) endpoint. Make sure to:

* Include the customer ID obtained from the previous step
* Store the returned `checkout_session` ID for use in later steps

The `checkout_session` is unique for each payment attempt and cannot be reused.

## Step 3: Include the library in your project

The first step is to include Yuno SDK in your project through Gradle. Then, you can add the repository source, as shown in the following code block:

```kotlin
maven { url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" }
```

Next, you need to add the Yuno SDK dependency to your application. To accomplish it, add the code below in the `build.gradle` file.

```kotlin
dependencies {
    implementation 'com.yuno.payments:android-sdk:{last_version}'
}
```

Yuno SDK includes, by default, the `INTERNET` permission, which is required to make network requests.

`<uses-permission android:name="android.permission.INTERNET" />`

## Step 4: Initialize headless SDK with the public key

To initialize the Headless SDK, you need to import Yuno and provide a valid **PUBLIC\_API\_KEY**. If you don't have your API credentials, access the [Developers (Credentials)](doc:developers-credentials) page to check how to retrieve them from the dashboard. 

Create a custom application if you haven't already. In the `onCreate()` method of your application class, initialize the SDK by calling the `Yuno.initialize()` function, as shown in the following example:

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

## Step 5: Start the checkout process

To start the checkout process, call the `apiClientPayment` function after your customer selects a payment method. This function requires configuration parameters and initiates the collection of information needed for 3DS authentication and fraud prevention tools configured in your [routing](doc:routing).

The table below describes the required parameters:

<Table align={["left","left"]}>
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
        `country_code`
      </td>

      <td>
        This parameter determines the country for which the payment process is being configured. The complete list of supported countries and their `country_code` is available on the [Country coverage](doc:country-coverage-yuno-sdk) page.
      </td>
    </tr>

    <tr>
      <td>
        `checkout_session`
      </td>

      <td>
        Refers to the current payment's checkout session created using the [Create Checkout Session](ref:create-checkout-session) endpoint.\
        `Example: '438413b7-4921-41e4-b8f3-28a5a0141638'`
      </td>
    </tr>
  </tbody>
</Table>

The following code block presents an example of the parameter configuration.

```kotlin
 val apiClientPayment = Yuno.apiClientPayment(
   // country can be one of the following: https://docs.y.uno/docs/country-coverage-yuno-sdk
   country_code = "US", //-> country can be one of the following: https://docs.y.uno/docs/country-coverage-yuno-sdk
   // The customer_session created in https://docs.y.uno/reference/create-customer-session
   checkoutSession = "74bf4b96-6b35-42a6-8c73-2fe094c34ca9", //-> The checkout_session created using the following endpoint https://docs.y.uno/reference/create-checkout-session
   context = this //-> This is the context of your activity
)

```

## Step 6: Generate token

After collecting the user information, create a one-time token (OTT) using the `apiClientPayment.generateToken` function. Since this is an asynchronous function, use a `try/catch` block to handle any errors that may occur. The following examples demonstrate two different scenarios for creating an one-time token:

1. **Example 1**: Create a one-time token utilizing a card as the payment method and including all requisite card information.
2. **Example 2**: Create a one-time token using the `vaulted_token` information.

### Benefits of using a vaulted token

When you use a vaulted token with the SDK, all the fraud information from the providers you configured in your card routing is collected and attached to the one-time token. In addition, you can add installment information and a security code if the provider requires it.

```kotlin Example 1
/**
 * Create One Time Use Token
 * This will trigger an error if there is missing data
 * You can catch it using a try/catch
 */

apiClientPayment.generateToken(
   collectedData = TokenCollectedData(
     	 // The checkout_session created using the following endpoint https://docs.y.uno/reference/create-checkout-session
       checkoutSession = "checkout_session",
     	 // The necessary info to use the payment method structure
       paymentMethod = PaymentMethod (
           type = "CARD",
         	 // Send this value if you already have a registered or enrolled payment method.
     			 // Other fields like card and customer are optional unless your provider requires them.
           vaultedToken = null,
           card = CardData(
             	 // Set this value to "true" if you want to generate a vaulted_token (tokenize) the card.
               save = true,
               detail = Detail(
                   expirationMonth = 11,
                   expirationYear = 55,
                   number = "4111111111111111",
                   securityCode = "123",
                   holderName = "Firstname Lastname",
                   type = CardType.DEBIT
               ),
               // Only necessary if an installment plan is created for the account.
               installment = Installment(
                   id = "id",
                   value = 12
               )
           ),
           customer = Customer(
             	 // You can check the object here: https://docs.y.uno/reference/the-customer-object
      				 // You create the customer using the following endpoint: https://docs.y.uno/reference/create-customer
               id = "id",
               merchantCustomerId = "merchant_customer_id",
               firstName = "firstName",
               lastName = "lastName",
               gender = Gender.NB,
               dateOfBirth = "DD/MM/YYYY",
               email = "email@email.com",
               country = "US",
               document = Document(
                   documentType = "PAS",
                   documentNumber = "PAS12312"
               ),
               phone = Phone(
                   number = "321123321123",
                   country_code = "1"
               )
           )
       )
   ),
   context = this
)

```
```javascript Example 2
/**
 * Create One Time Use Token
 * This will trigger an error if there is missing data
 * You can catch it using a try/catch
 */

apiClientPayment.generateToken(
   collectedData = TokenCollectedData(
			 // The checkout_session created using the following endpoint https://docs.y.uno/reference/create-checkout-session
       checkoutSession = "checkout_session",
     	 // The necessary info to use the payment method structure     
       paymentMethod = PaymentMethod(
           type = "CARD",
           vaultedToken = "a1c7c5d1-b260-4dc6-909a-8368704233cf",
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
               // Only necessary if an installment plan is created for the account.             
               installment = Installment(
                   id = "id",
                   value = 12
               )
           ),
           customer = Customer(
             	 // You can check the object here: https://docs.y.uno/reference/the-customer-object
      				 // You create the customer using the following endpoint: https://docs.y.uno/reference/create-customer             
               id = "id",
               merchantCustomerId = "merchant_customer_id",
               firstName = "firstName",
               lastName = "lastName",
               lastName = "lastName",
               gender = Gender.NB,
               dateOfBirth = "DD/MM/YYYY",
               email = "email@email.com",
               country = "CO",
               document = Document(
                   documentType = "PAS",
                   documentNumber = "PAS12312"
               ),
               phone = Phone(
                   number = "321123321123",
                   countryCode = "57"
               )
           )
       )
   ),
   context = this
)

```

> 📘 PCI Compliance
>
> Please bear in mind that you are capturing sensitive card data. Therefore, you need to comply with good practices regarding data management. If you don't have a PCI certification, you can't save any card data other than the token provided by the SDK.


The **apiClientPayment.generateToken** function returns an Observable type, which is a subclass of `LiveData`. As a result, you can observe the response as a common `LiveData` with the following type `SingleLiveEvent<Map<String, Any?>>`, which is a `LiveData` that only emits once. The response type is  a `Map` containing the whole response. The following code block presents the examples of response after calling the `apiClientPayment.generateToken` function.

```json Example 1
["token": "9ee44ac7-9134-4598-ae28-a26fec03099d",
     "type": "CARD",
     "customer": ["billing_address": null,
                  "first_name": null,
                  "gender": "",
                  "phone": nil,
                  "browser_info": ["color_depth": null,
                                   "language": "en",
                                   "accept_header": "*/*",
                                   "browser_time_difference": null,
                                   "accept_content": null,
                                   "accept_browser": null,
                                   "java_enabled": null,
                                   "user_agent": "YunoSDK_Example/1 CFNetwork/1406.0.4 Darwin/22.6.0",
                                   "screen_height": "844.0",
                                   "screen_width": "390.0",
                                   "javascript_enabled": null],
                  "document": null,
                  "last_name": null,
                  "device_fingerprint":null,
                  "email": null],
     "country": "US",
     "vaulted_token": null,
     "installment": ["rate": "",
                     "id": "cca80084-961b-4212-9c34-54f03f4f10ae",
                     "value": 24,
                     "amount": null],
     "card_data": null]

```
```json Example 2
["token": "9ee44ac7-9134-4598-ae28-a26fec03099d",
     "type": "CARD",
     "customer": ["billing_address": null,
                  "first_name": null,
                  "gender": "",
                  "phone": nil,
                  "browser_info": ["color_depth": null,
                                   "language": "en",
                                   "accept_header": "*/*",
                                   "browser_time_difference": null,
                                   "accept_content": null,
                                   "accept_browser": null,
                                   "java_enabled": null,
                                   "user_agent": "YunoSDK_Example/1 CFNetwork/1406.0.4 Darwin/22.6.0",
                                   "screen_height": "844.0",
                                   "screen_width": "390.0",
                                   "javascript_enabled": null],
                  "document": null,
                  "last_name": null,
                  "device_fingerprint":null,
                  "email": null],
     "country": "BR",
     "vaulted_token":"a1c7c5d1-b260-4dc6-909a-8368704233cf",
     "installment": ["rate": "",
                     "id": "cca80084-961b-4212-9c34-54f03f4f10ae",
                     "value": 24,
                     "amount": null],
     "card_data": null]

```

The endpoint response provides the `sdk_action_required` parameter that defines if additional actions are necessary.

The code block below presents an example of observing the response.

```kotlin
apiClientPayment.generateToken(data, context).observe(context) { response ->
   val token = response["token"] as String?
   val error = response["error"] as String?
}

```

## Step 7: Create the payment

After generating the one-time token, create the payment by calling the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). You need to include the one-time token obtained in [Step 6](doc:headless-sdk-payment-android#step-6-generate-token) in the `payment_method.token` parameter of your request. The code block below shows an example of a payment creation request.

```json
{
  "merchant_order_id": "0000022",
  "country": "US",
  "account_id": "<Your account_id>",
  "description": "Test",
  "amount": {
    "currency": "USD",
    "value": 500
  },
  "customer_payer": {
    "id": "cfae0941-7234-427a-a739-ef4fce966c79"
  },
  "checkout": {
    "session": "<checkout session>"
  },
  "workflow": "SDK_CHECKOUT",
  "payment_method": {
    "type":"CARD",
    "token": "2cd31999-e44e-4de3-bbe4-179981ff4295"
  }
}
```

The endpoint response includes the `sdk_action_required` parameter that indicates whether additional actions are needed to complete the payment:

* For synchronous payment methods, the payment completes instantly. In this case, `sdk_action_required` will be `false` in the API response and the payment process ends
* For payment flows requiring additional SDK interaction, `sdk_action_required` will be `true`. When this happens, proceed to [Step 8](doc:headless-sdk-payment-android#step-8-get-the-3ds-challenge-url) for next steps

## Step 8: Get the 3DS challenge URL (if required)

 When a payment requires 3DS authentication, an additional challenge may be needed to verify the customer's identity. For more details about this process, see the [3DS Card Verification (old version)](doc:3ds-card-verification-copy) page. If a 3DS verification challenge is required, the Create Payment endpoint response will include the following:

* A `THREE_D_SECURE `transaction type
* Status equal to `PENDING` and sub status equal to `WAITING_ADDITIONAL_STEP`
* `sdk_action_required = true`

To get the 3DS challenge URL, call the `getThreeDSecureChallenge` function and provide the `checkoutSession` used to create the payment. After obtaining the URL, redirect your customer to complete the challenge. The code block below shows how to use the `getThreeDSecureChallenge` function.

```kotlin
fun ApiClientPayment.getThreeDSecureChallenge(
   context: Context,
   // checkout session used to create the payment
   checkoutSession: String? = null,
): SingleLiveEvent<ThreeDSecureChallengeResponse>

```

The `getThreeDSecureChallenge` function will return the `ThreeDSecureChallengeResponse` data class, described in the next code block:

```kotlin
data class ThreeDSecureChallengeResponse(
   val type: String,
   val data: String,
)
```

The `type` can return `ERROR` or `URL`, defining if the function returned a valid URL for the challenge:

* If `type = URL`, `data` will contain the URL your customer needs to access to complete the 3DS challenge.  
* If `type = ERROR`, `data` will contain the error message, informing the source of the problem.

The code block below presents an example of how you can observe the response from `ThreeDSecureChallengeResponse`:

```kotlin
apiClientPayment.getThreeDSecureChallenge(this)?.observe(this) {
   if (it.type == "URL") {
     // load the URL in web view, custom tab or navigator
   } else 
  		// check the error message to identify the problem
}

```

When the response type is "URL", you can load the 3DS challenge URL in your preferred view (WebView, Custom Tab, or browser). If the response type is not "URL", it indicates an error occurred and you should handle it appropriately by displaying an error message to the user.

To complete the 3DS challenge, you must redirect customers to the URL returned by `getThreeDSecureChallenge(context)`. After successful completion, customers are automatically redirected to the `callback_url` that you specified when creating the `checkout_session` using the [Create Checkout Session](ref:create-checkout-session) endpoint. The example below demonstrates how to load the 3DS challenge URL in a WebView:

```kotlin
val webView = WebView(this)
webViewContainer.addView(
   webView,
   ConstraintLayout.LayoutParams(
       ConstraintLayout.LayoutParams.MATCH_PARENT,
       ConstraintLayout.LayoutParams.MATCH_PARENT
   )
)
webView.settings.javaScriptEnabled = true
webView.addJavascriptInterface(
   object {
       @JavascriptInterface
       fun messageFromWeb(data: String?) { // This is required
           // Challenge was completed here
       }
   },
   "Android" // This is required
)
webView.loadUrl(url)

```

The JavaScript interface must use the name `messageFromWeb(data : String?)` and be added with the name `Android`. This allows you to capture challenge events and determine when they complete.

To complete the Headless SDK payment flow:

1. Use [Yuno Webhooks](doc:configure-webhooks) to receive notifications about:
   * The outcome of the 3DS challenge 
   * The final payment status

2. Optionally, retrieve payment details using the [Retrieve Payment by ID](ref:retrieve-payment-by-id) endpoint.

For the complete payment implementation guide, see [Headless SDK (Payment)](doc:headless-sdk-integration).

## Complementary features

Yuno Android SDK provides additional services and configurations you can use to improve customers' experience. Use the [SDK customization](doc:sdk-customizations-android) to change the SDK appearance to match your brand or to configure the loader.

### Loader

The [Loader](https://docs.y.uno/docs/loader-android) enables you to control the use of the loader component.

### SDK customization

You can change the SDK appearance to match your brand. For more information, access the [SDK customization](https://docs.y.uno/docs/sdk-customizations-android) page.

> 📘 Demo App
> 
> In addition to the code examples provided, you can access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-android/tree/master) to complete Yuno Android SDKs implementation.
