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

For platform-specific setup, refer to:

<Shelf classname="platform_shelf">
  <YunoCard title="Web" href="/docs/lite-checkout-sdk" />

  <YunoCard title="iOS" href="/docs/lite-checkout-ios" />

  <YunoCard title="Android" href="/docs/lite-checkout-android" />

  <YunoCard title="Flutter" href="/docs/flutter-sdk-integration" />
</Shelf>

## Payment workflow using a vaulted token

If your customer has enrolled in one of the available payment methods, the payment can be made back to back using the [Vaulted token](doc:tokens) from the enrollment process. With this approach, you don't need to request additional information about the payment method.

The following image describes the complete workflow:

![](https://files.readme.io/45a2289-Diagrama_-_Vaulted_token_Lite.png)

Unlike the [Payment workflow](), for payments using the vaulted token, you'll use information from an existing customer who has previously enrolled in the payment method.

This workflow follows the same steps as the Payment workflow, but instead of collecting new payment details, the SDK retrieves the stored vaulted token:

1. [Create a checkout session](#step-2-create-a-checkout-session).
2. [Implement the SDK and retrieve a one-time token](#step-4-implement-the-sdk-and-retrieve-a-one-time-token), using the **vaulted token**.
3. [Create the payment](#step-5-create-the-payment).
4. [Continue payment](#step-6-continue-payment-if-needed).
5. [Get payment status](#step-7-get-payment-status).
6. [Receive payment result through webhook](#step-8-receive-payment-result-through-webhook).

For these steps, follow the guidelines in the [Payment workflow](#payment-workflow).

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