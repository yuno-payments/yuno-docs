---
title: Full SDK
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Full SDK
  description: >-
    Using our Full SDK, you can integrate Yuno, minimizing integration,
    maintenance, and operational efforts without any need for compliance.
  robots: index
next:
  description: ''
---
With Yuno Full SDK, you can seamlessly integrate Yuno into your system. This approach simplifies integration, maintenance, and operations without requiring additional compliance work.

### Key features

* **User experience**: Yuno manages the entire checkout process.
* **Customization**: Configure payment methods and UI elements directly from Yuno's dashboard.
* **Flexibility**: Add new payment methods and features without extra development.
* **Single integration**: Support multiple payment methods through a single implementation, regardless of the customer's chosen method.

### What you can do with the full SDK

1. Process payments seamlessly.
2. Enroll a credit card while processing a payment.
3. Use a vaulted token from an enrolled payment method.

Follow the step-by-step guides below to integrate the full SDK:

<Shelf classname="link_cards_container">
  <YunoCard title="Payment workflow" href="#payment-workflow" titleSize="h4" />

  <YunoCard title="Payment workflow using a vaulted token" href="#payment-workflow-using-a-vaulted-token" titleSize="h4" />

  <YunoCard title="Enroll a credit card while paying" href="#enroll-a-credit-card-while-paying" titleSize="h4" />
</Shelf>

## Payment workflow

The Full SDK provides a **unified payment experience**, allowing customers to complete transactions using multiple payment methods within a single integration. The diagram below illustrates the complete process:

![Full SDK Integration Flow](https://files.readme.io/0b97d1a-Diagrama_-_Full_SDK.png)

### Full SDK Integration Flow

This diagram illustrates the comprehensive integration flow for the Full SDK, detailing the interactions between the Merchant Client, Merchant Server, Yuno Server, and Yuno SDK. It covers the entire payment journey, from initiating a checkout to displaying the final payment result.

#### Merchant Client

The Merchant Client represents your frontend application that interacts with both your backend server and the Yuno SDK. It handles the user-facing aspects of the payment flow, including:

* Initiate Checkout
* Initiate SDK with the checkout session
* Receive one-time token (single use)
* Initiate payment
* Initiate SDK to continue payment flow
* Shows screen for the user to complete payment
* Display payment result (optional)

#### Merchant Server

The Merchant Server represents your backend application that handles server-side operations and communicates with Yuno's servers. Its key responsibilities include:

* Create Customer
* Create Checkout session
* Create payment
* Receive payment result via webhook

#### Yuno Server

The Yuno Server handles all backend operations related to customer management, checkout sessions, and payment processing. Its main responsibilities include:

* Creates Customer
* Creates Checkout session
* Creates payment in the payment provider
* Receive payment results from payment provider

#### Yuno SDK

The Yuno SDK handles the user interface and payment flow on the client side, managing payment method selection, token generation, and payment completion. Its key responsibilities include:

* Receive checkout session
* List payment methods
* User selects payment methods
* Callback with the one-time token
* Continue with the payment flow
* Show screen for the user to complete payment
* Display payment result (optional)

#### Flow

The following steps outline the complete interaction flow between all components of the Full SDK integration, detailing how each request and response moves through the system:

1. Merchant Server: Create Customer --> Yuno Server: Creates Customer
2. Merchant Client: Initiate Checkout -->  Merchant Server: Create Checkout session
3. Merchant Server: Create Checkout session --> Yuno Server: Creates Checkout session
4. Merchant Client: Initiate Checkout --> Initiate SDK to continue payment flow
5. Merchant Client: Initiate SDK to continue payment flow --> Yuno SDK: Receive checkout session
6. Yuno SDK: Receive checkout session --> List payment methods
7. Yuno SDK: List payment methods --> User selects payment methods
8. Yuno SDK: User selects payment methods --> Callback with the one-time token
9. Yuno SDK: Callback with the one-time token --> Merchant Client: Receive one-time token (single use)
10. Merchant Client: Receive one-time token (single use) --> Initiate payment
11. Merchant Client: Initiate payment --> Initiate SDK to continue payment flow
12. Merchant Client: Initiate SDK to continue payment flow --> Yuno SDK: Continue with the payment flow
13. Yuno SDK: Continue with the payment flow --> Show screen for the user to complete payment
14. Yuno SDK: Show screen for the user to complete payment --> Display payment result (optional)
15. Merchant Client: Initiate payment --> Merchant Server: Create payment
16. Merchant Server: Create payment --> Yuno Server: Creates payment in the payment provider

## Platform-specific SDK setup

To implement the Full SDK integration, follow the platform-specific guides below:

<Shelf classname="platform_shelf">
  <YunoCard title="Web" href="/docs/full-checkout-sdk" />

  <YunoCard title="iOS" href="/docs/full-checkout-ios" />

  <YunoCard title="Android" href="/docs/full-checkout-android" />

  <YunoCard title="Flutter" href="/docs/flutter-sdk-integration" />
</Shelf>

## Payment workflow using a vaulted token

If a customer has an enrolled payment method, they can use a **vaulted token** from the enrollment process to complete transactions **without** entering payment details again.

![](https://files.readme.io/e257d04-Diagrama_-_Vaulted_token_Full.png)

### Vaulted Token Full Diagram

This diagram illustrates the process for handling vaulted tokens within the full payment flow, showing interactions between the Merchant Client, Merchant Server, Yuno Server, and Yuno SDK. It focuses on the use of pre-stored payment credentials for streamlined transactions.

#### Merchant Client

The Merchant Client represents the frontend application that interacts with customers. It handles the following key responsibilities:

* Initiate checkout
* Initiate SDK with the checkout session
* Initiate payment
* Show payment result

#### Merchant Server

The Merchant Server handles the backend operations and communicates with both the client and Yuno's services. Its key responsibilities include:

* Create Customer
* Create payment
* Receive payment result

#### Yuno Server

The Yuno Server handles the core payment processing functionality and manages customer data. Its key responsibilities include:

* Create Customer
* Creates payment in the payment provider
* Provides payment result

#### Yuno SDK

The Yuno SDK handles the user interface and payment method selection process. Its key responsibilities include:

* Receive checkout session
* List payment methods
* User selects payment methods
* Callback with the one-time token

#### Flow:

The following steps outline the detailed sequence of interactions between the different components in the vaulted token payment workflow:

1. Merchant Client: Initiate checkout --> Merchant Server: Create Customer
2. Merchant Server: Create Customer --> Yuno Server: Create Customer
3. Merchant Client: Initiate SDK with the checkout session --> Yuno SDK: Receive checkout session
4. Yuno SDK: Receive checkout session --> List payment methods
5. Yuno SDK: List payment methods --> User selects payment methods
6. Yuno SDK: User selects payment method --> Callback with the one-time token
7. Yuno SDK: Callback with the one-time token --> Merchant Client: Initiate payment
8. Merchant Client: Initiate payment --> Merchant Server: Create payment
9. Merchant Server: Create payment --> Yuno Server: Creates payment in the payment provider
10. Merchant Client: Show payment result --> Merchant Server: Receive payment result
11. Merchant Server: Receive payment result --> Yuno Server: Provides payment result

## Enroll a credit card while paying

With the Full SDK, you can save credit/debit cards for future purchases with the same payment request without the enrollment [integration](enrollment-lite). You can obtain the [vaulted token](doc:tokens) in two ways:

* **Via API**: Set `vault_on_success = true` when using the [Create payment](ref:create-payment) endpoint. You will receive the `vaulted_token` that corresponds to the card used by the customer payer in the response.
* **Via SDK settings**: Set `cardSaveEnable = true` in the SDK complementary features ([Web](doc:complementary-features-full-sdk), [iOS](doc:full-checkout-ios), [Android](doc:full-checkout-android), and [Flutter](https://docs.y.uno/docs/flutter-sdk-integration)). The SDK will display a checkbox for users to select if they want to save the card for future purchases. If the user checks the box, you will receive the `vaulted_token`.

> 📘 Card Enrollment Options
>
> You should only use one option to enroll a card. To enroll alternative payment methods, you have to use the [Lite SDK](enrollment-lite).

After enrolling a payment method, you can use the vaulted token to perform payments. To access information about the payment methods enrolled by each user, you can use one of the following endpoints:

* [Get payment methods by checkout session](ref:retrieve-payment-methods-for-checkout).
* [Get payment methods by customer](ref:retrieve-enrolled-payment-methods-api).

> 🚧 Using a vaulted token
>
> Even if the user selects an enrolled payment method, Yuno recommends using the SDK to tokenize the information instead of directly using the vaulted token with Yuno's API. This approach provides several benefits:
>
> * **Support 3DS**: Enhanced security for online payments.
> * **Fraud Screening**: Better protection against fraudulent transactions.
> * **Collect Required Information**: Gather additional fields required by the provider if necessary.