---
title: Headless SDK (Payment)
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
Yuno's **Headless SDK** gives you full control over the checkout UX and UI without requiring you to be PCI-compliant. With Headless SDK, you can make card payments or enroll card information into your customers' accounts. Access the [Headless SDK (Enrollment)](doc:headless-sdk-enrollment) for more information. This page covers the payment operation. Below you can check the guides available.

## Payment workflow

The diagram below illustrates the complete payment workflow. Each step is explained in detail in the following sections. For platform-specific implementation details, refer to the corresponding guide:

<Shelf classname="platform_shelf">
  <YunoCard title="Web" href="/docs/headless-sdk-payment" />

  <YunoCard title="iOS" href="/docs/headless-sdk-payment-ios" />

  <YunoCard title="Android" href="/docs/headless-sdk-payment-android" />
</Shelf>

<Image align="center" src="https://files.readme.io/a17409c-Diagrama_-_SDK_Headless_pago.png" />

### SDK Headless Payment Flow

This diagram illustrates the headless payment process using the SDK, detailing the interactions between the Merchant Client, Merchant Server, Yuno Server, and Yuno SDK. It outlines the steps from initiating a checkout and requesting payment methods to creating and receiving the payment result.

#### Merchant Client

The Merchant Client represents your frontend application that interacts with both your backend server and the Yuno SDK. It handles the user-facing aspects of the payment flow, including:

* Initiate checkout
* List payment methods
* User selects payment methods
* Initiate SDK with checkout session and payment method
* Gets token (single use)
* Initiate payment

#### Merchant Server

The Merchant Server represents your backend application that handles server-side operations and communicates with Yuno's servers. Its key responsibilities include:

* Create Customer
* Create checkout session
* Request available payment method
* Create payment
* Receive payment result via webhook

#### Yuno Server

The Yuno Server handles all backend operations related to customer management, checkout sessions, and payment processing. Its main responsibilities include:

* Creates Customer
* Creates checkout session
* Returns available payment method
* Creates payment in the payment provider
* Receive payment results from payment provider

#### Yuno SDK

The Yuno SDK handles the user interface and payment flow on the client side, managing payment method selection, token generation, and payment completion. Its key responsibilities include:

* Receives checkout session and payment method selected by user
* Callback with the One Time Token

#### Flow

The following steps outline the complete interaction flow between all components of the SDK Headless Payment integration, detailing how each request and response moves through the system:

1. Merchant Server: Create Customer --> Yuno Server: Creates Customer
2. Merchant Client: Initiate checkout --> Merchant Server: Create checkout session
3. Merchant Server: Create checkout session --> Yuno Server: Creates checkout session
4. Merchant Client: List payment methods --> Merchant Server: Request available payment method
5. Merchant Server: Request available payment method --> Yuno Server: Returns available payment method
6. Merchant Client: List payment methods --> Merchant Client: User selects payment methods
7. Merchant Client: User selects payment methods --> Merchant Client: Initiate SDK with checkout session and payment method
8. Merchant Client: Initiate SDK with checkout session and payment method --> Yuno SDK: Receives checkout session and payment method selected by user
9. Yuno SDK: Receives checkout session and payment method selected by user --> Yuno SDK: Callback with the One Time Token
10. Yuno SDK: Callback with the One Time Token --> Merchant Client: Gets token (single use)
11. Merchant Client: Gets token (single use) --> Merchant Client: Initiate payment
12. Merchant Client: Initiate payment --> Merchant Server: Create payment
13. Merchant Server: Create payment --> Yuno Server: Creates payment in the payment provider
14. Merchant Server: Receive payment result via webhook --> Yuno Server: Receive payment results from payment provider

> 📘 Choose your integration
>
> The Headless SDK is designed to accept payments using cards only. If you need to perform a payment using another payment method, you need to choose another Yuno integration:
>
> * [Full SDK](/docs/secure-fields-payment)
> * [Lite SDK](/docs/secure-fields-payment)
> * [Direct Flow](/docs/secure-fields-payment)

## Enroll a credit card while paying

With Headless SDK, you can save credit/debit cards for future purchases within the same payment request without the enrollment [integration](doc:headless-sdk-enrollment-steps). You can obtain the [vaulted token](doc:tokens) while executing the `apiClientPayment.generateToken` function in [Step 4](#step-4-implement-the-sdk-and-get-a-one-time-token).

Provide a checkbox on your checkout for users to choose if they want to save their card for future use. If the user selects this option, set `payment_method.card.save = true` when calling the `apiClientPayment.generateToken` function. You'll receive the `vaulted_token` in the function response.

> 📘 Alternative Payment Methods
>
> To enroll alternative payment methods, see the [Lite SDK (Enrollment)](doc:enrollment-lite) page.

After enrolling in a payment method, you can use the vaulted token to perform payments. To access information about the payment methods enrolled by each user, you can use one of the following endpoints:

* [Get payment methods by checkout session](ref:retrieve-payment-methods-for-checkout).
* [Get payment methods by customer](ref:retrieve-enrolled-payment-methods-api).

> 🚧 Using a vaulted token
>
> Even if the user selects an enrolled payment method, Yuno recommends using the SDK to tokenize the information instead of directly using the vaulted token with Yuno's API. This approach provides several benefits:
>
> * **Support 3DS**: Enhanced security for online payments.
> * **Fraud Screening**: Better protection against fraudulent transactions.
> * **Collect Required Information**: Gather additional fields required by the provider if necessary.
>
> To implement this, send the `vaultedToken` when mounting the SDK. The SDK will handle the rest. If the payment method requires an extra step (such as a 3DS challenge), use the `yuno.continuePayment()` method. This method handles any required redirections and works for both enrolled and regular payment methods that need additional customer actions.