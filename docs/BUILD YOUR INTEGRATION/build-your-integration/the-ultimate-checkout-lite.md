---
title: Lite SDK (Payment)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Lite SDK (Payment)
  description: >-
    With the Lite version of the Yuno SDK, you have full control of your payment
    experience. The main difference with the full SDK integration is that this
    version allows merchants to consult a service that will provide a list of
    the payment methods they have available for payment and enrollment.
  robots: index
next:
  description: ''
---
The **Lite SDK** provides full control over your payment experience. Unlike the [Full SDK](doc:full-sdk-workflow), this version allows you to query available payment methods and decide which to display at checkout. After the customer selects a payment method, the payment process follows the same steps as the Full SDK.

Additionally, the Lite SDK supports enrolling payment methods for future use. For more details, see [Lite SDK (Enrollment)](doc:enrollment-lite).

With the Lite SDK, you can:

* Execute the payment process
* Enroll a credit card while making a payment
* Use a vaulted token from an enrolled payment method to complete a transaction

Use the following guides to implement each process:

<Shelf classname="link_cards_container">
  <YunoCard title="Payment workflow" href="#payment-workflow" titleSize="h4" />

  <YunoCard title="Payment workflow using a vaulted token" href="#payment-workflow-using-a-vaulted-token" titleSize="h4" />

  <YunoCard title="Enroll a credit card while paying" href="#enroll-a-credit-card-while-paying" titleSize="h4" />
</Shelf>

## Payment workflow

The diagram below illustrates the complete payment workflow:

![](https://files.readme.io/4e2b909-Diagrama_-_SDK_Lite.png)

### SDK Lite Payment Flow

This diagram illustrates the payment process using the SDK Lite, detailing the interactions between the Merchant Client, Merchant Server, Yuno Server, and Yuno SDK. It outlines the steps from initiating a checkout and selecting payment methods to creating and completing the payment.

#### Components Overview

The payment workflow involves several key components working together to process payments securely. Here's how each component contributes to the process:

#### Merchant Client

The Merchant Client represents your frontend application that handles the user interface and payment flow. Its key responsibilities include:

* Initiate Checkout
* List payment methods
* User selects payment methods
* Initiate SDK with checkout session and payment method
* Gets token (single use)
* Initiate payment
* Initiate SDK to continue payment flow

#### Merchant Server

The Merchant Server represents your backend application that coordinates between your frontend and Yuno's services. Its key responsibilities include:

* Create Customer
* Create Checkout session
* Request available payment method
* Create payment
* Receive payment result via webhook

#### Yuno Server

The Yuno Server handles all backend operations related to payment processing and provider integration. Its key responsibilities include:

* Creates Customer
* Creates Checkout session
* Returns available payment method
* Creates payment in the payment provider
* Receive payment results from payment provider

#### Yuno SDK

The Yuno SDK manages the payment flow on the client side, handling user interactions and payment processing. Its key responsibilities include:

* Receives checkout session and payment method selected by user
* Callback with the One Time Token
* Continue with the payment flow
* Shows screen for the user to complete payment
* Display payment result (optional)

#### Complete Flow

The following steps outline the complete interaction flow between all components of the SDK Lite Payment integration, detailing how each request and response moves through the system:

1. Merchant Server: Create Customer --> Yuno Server: Creates Customer
2. Merchant Client: Initiate Checkout --> Merchant Server: Create Checkout session
3. Merchant Server: Create Checkout session --> Yuno Server: Creates Checkout session
4. Merchant Client: Initiate Checkout --> Merchant Client: List payment methods
5. Merchant Client: List payment methods --> Merchant Client: User selects payment methods
6. Merchant Client: User selects payment methods --> Merchant Client: Initiate SDK with checkout session and payment method
7. Merchant Client: Initiate SDK with checkout session and payment method --> Yuno SDK: Receives checkout session and payment method selected by user
8. Yuno SDK: Receives checkout session and payment method selected by user --> Yuno SDK: Callback with the One Time Token
9. Yuno SDK: Callback with the One Time Token --> Merchant Client: Merchant Client: Gets token (single use)
10. Merchant Client: Merchant Client: Gets token (single use) --> Merchant Client: Initiate payment
11. Merchant Client: Initiate payment --> Merchant Client: Initiate SDK to continue payment flow
12. Merchant Client: Initiate SDK to continue payment flow --> Yuno SDK: Continue with the payment flow
13. Yuno SDK: Continue with the payment flow --> Yuno SDK: Shows screen for the user to complete payment
14. Merchant Client: Initiate Checkout --> Merchant Server: Create Checkout session
15. Merchant Client: List payment methods --> Merchant Server: Request available payment method
16. Merchant Client: Initiate payment --> Merchant Server: Create payment
17. Merchant Server: Create payment --> Yuno Server: Creates payment in the payment provider
18. Merchant Server: Receive payment result via webhook --> Yuno Server: Receive payment results from payment provider
19. Yuno Server: Receive payment results from payment provider  --> Yuno SDK: Display payment result (optional)

For platform-specific setup, refer to:

<Shelf classname="platform_shelf">
  <YunoCard title="Web" href="/docs/lite-checkout-sdk" />

  <YunoCard title="iOS" href="/docs/lite-checkout-ios" />

  <YunoCard title="Android" href="/docs/lite-checkout-android" />

  <YunoCard title="Flutter" href="/docs/lite-sdk-payment-flutter" />
</Shelf>

## Payment workflow using a vaulted token

If your customer has enrolled in one of the available payment methods, the payment can be made back to back using the [Vaulted token](doc:tokens) from the enrollment process. With this approach, you don't need to request additional information about the payment method.

The following image describes the complete workflow:

![](https://files.readme.io/45a2289-Diagrama_-_Vaulted_token_Lite.png)

### Vaulted Token Lite Flow

This diagram illustrates the payment process using a vaulted token with the SDK Lite, detailing the interactions between the Merchant Client, Merchant Server, Yuno Server, and Yuno SDK. It outlines the steps from initiating a checkout and using a pre-stored payment method to creating and completing the payment.

#### Components Overview

The vaulted token payment workflow involves several key components working together to process payments securely. Here's how each component contributes to the process:

#### Merchant Client

The Merchant Client represents your frontend application that handles the user interface and payment flow. Its key responsibilities include:

* Initiate Checkout
* Render payment methods
* Initiate payment
* Shows payment results

#### Merchant Server

The Merchant Server represents your backend application that coordinates between your frontend and Yuno's services. Its key responsibilities include:

* Create Checkout session
* Request available payment method
* Create payment
* Receive payment result

#### Yuno Server

The Yuno Server handles all backend operations related to payment processing and provider integration. Its key responsibilities include:

* Creates Checkout session
* Returns enabled payment method
* Creates payment in the payment provider
* Provides payment results

#### Complete Workflow

The following steps outline the detailed sequence of interactions between the different components in the vaulted token payment workflow:

1. Merchant Client: Initiate Checkout --> Merchant Server: Create Checkout session
2. Merchant Server: Create Checkout session --> Yuno Server: Creates Checkout session
3. Merchant Client: Render payment methods --> Merchant Server: Request available payment method
4. Merchant Server: Request available payment method --> Yuno Server: Returns enabled payment method
5. Merchant Client: Render payment methods --> Merchant Client: Initiate payment
6. Merchant Client: Initiate payment --> Merchant Server: Create payment
7. Merchant Server: Create payment --> Yuno Server: Creates payment in the payment provider
8. Merchant Client: Shows payment results --> Merchant Server: Receive payment result
9. Merchant Server: Receive payment result --> Yuno Server: Provides payment results

Unlike the [Payment workflow](), for payments using the vaulted token, you'll use information from an existing customer who has previously enrolled in the payment method.

This workflow follows the same steps as the Payment workflow, but instead of collecting new payment details, the SDK retrieves the stored vaulted token. For detailed implementation steps, refer to the platform-specific guides above.

## Enroll a credit card while paying

With the **Lite SDK**, you can save credit or debit cards for future purchases within the same payment request, **without** additional enrollment integration.

### How to obtain a vaulted token

You can retrieve a vaulted token in two ways:

* **Via API:** Set `vault_on_success = true` when using the [Create payment](ref:create-payment) endpoint. The response will return the `vaulted_token` for the customer's card.
* **Via SDK settings:** Enable `cardSaveEnable = true` in the SDK settings for [Web](doc:lite-sdk-complementary-features), [iOS](doc:lite-checkout-ios), [Android](doc:lite-checkout-android), or [Flutter](https://docs.y.uno/docs/flutter-sdk-integration). The SDK will display a checkbox allowing users to save their card.

Use only one method to enroll a card. To enroll alternative payment methods, see the [Lite SDK (Enrollment)](doc:enrollment-lite) page.

> 📘 Card Enrollment Options
>
> You should only use one option to enroll a card. To enroll alternative payment methods, see the [Lite SDK (Enrollment)](enrollment-lite) page.

After enrolling in a payment method, you can use the vaulted token to perform payments. To access information about the payment methods enrolled by each user, you can use one of the following endpoints:

* [Get payment methods by checkout session](ref:retrieve-payment-methods-for-checkout).
* [Get payment methods by customer](ref:retrieve-enrolled-payment-methods-api).

> 📘 Best Practices for Using Vaulted Tokens
>
> Even if the user selects an enrolled payment method, Yuno recommends using the SDK to tokenize the information instead of directly using the vaulted token with Yuno's API. This approach provides several benefits:
>
> * **Support 3DS**: Enhanced security for online payments.
> * **Fraud Screening**: Better protection against fraudulent transactions.
> * **Collect Required Information**: Gather additional fields required by the provider if necessary.
>
> To implement this, send the `vaultedToken` when mounting the SDK. The SDK will handle the rest. If the payment method requires an extra step (such as a 3DS challenge), use the `yuno.continuePayment()` method. This method handles any required redirections and works for both enrolled and regular payment methods that need additional customer actions.