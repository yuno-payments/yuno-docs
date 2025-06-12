---
title: Seamless SDK
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
Yuno's **Seamless SDK** provides a simple and efficient integration while giving you full control over the payment experience. Like the [Lite SDK](doc:the-ultimate-checkout-lite), it allows you to retrieve available payment methods and decide which to display during checkout. Once the selection is made, a single API and SDK call completes the payment process, creating an experience identical to the Lite SDK.

When using the Seamless SDK, you can:

* Execute the payment process.
* Enroll a credit card while making a payment.
* Use a vaulted token from an enrolled payment method to complete a payment.

Use the following guides to implement each process.

## Payment workflow

The diagram below illustrates the complete payment workflow:

![](https://files.readme.io/aa0edc30b1470562f8cc1380856aacb410d41aa6417d863e2c65476d26481fa4-image1.png)

For platform-specific setup, refer to:

<Shelf classname="platform_shelf">
  <YunoCard title="Web" href="/docs/seamless-sdk-payment-web" />

  <YunoCard title="iOS" href="/docs/seamless-sdk-payment-ios" />

  <YunoCard title="Android" href="/docs/seamless-sdk-payment-android" />
</Shelf>

### Step 1: Create a customer (optional)

If you want to associate a customer with stored payment methods, start by creating a customer profile.

* Use the [Create customer](ref:create-customer) endpoint to generate a new customer `id`.
* If a **customer session** is not used, payments will proceed without stored user data (e.g., pre-filled fields or saved payment methods).

You can skip this step if you already have a customer `id` or prefer to omit it entirely.

> 📘 Omit customer session step
>
> When you choose to not use a `customer_session`, the payment will be created without a customer `id`, leaving it empty when creating the payment. As a result, the process will not use any stored customer date, such as pre-filled form fields or saved payment details.
>
> While skipping the customer session can simplify integration, it removes features designed to streamline the user experience, which can improve conversion rates by reducing friction during checkout.

### Step 2: Create a checkout session

Next, create a checkout session. You must create a new checkout session for every new payment. This session provides access to all available payment methods (previously enrolled or not) for a specific customer.

Use the [Create checkout session](ref:create-checkout-session) endpoint, providing the customer `id`, to get a new `checkout_session`.

### Step 3: Display payment methods

Query the available payment methods using the [Retrieve payment methods](ref:retrieve-payment-methods-for-checkout) endpoint using the `checkout_session`. Show these methods to the customer so they can select their preferred payment method to execute the payment.

> 📘 Previously enrolled payment methods
>
> If the customer has previously enrolled payment methods, you'll receive them as well. Use the `vaulted_token` for these methods to create the One-Time Token and process the payment.

> ❗️ Display Payment Methods
>
> You are responsible for displaying the payment methods and capturing the customer's selection when using the Seamless SDK.

### Step 4: Implement the SDK

After the customer selects the payment method, initialize the SDK with the checkout information. The SDK will generate the one-time toke, create the payment, and call on `continuePayment()` to display any screens necessary for the user to complete the payment automatically.

After the customer selects a payment method, initialize the SDK with the checkout information. The SDK will:

* Generate the **one-time token (OTT)**.
* Create the payment.
* Call `continuePayment()` if additional customer actions are required.

To initialize the **Seamless SDK**, follow these steps:

1. Include the SDK library in your project.
2. Initialize it with your API credentials and `checkout_session`.
3. Start the checkout process by calling `yuno.startCheckout()` with your configuration.
4. Display the checkout interface in a browser or mobile app.
5. Add a **payment button** that calls `yuno.startPayment()` when clicked.

The SDK may also collect customer details (e.g., card information, email, phone number, document ID) required by the provider. Once initialized, the SDK returns a **one-time token (OTT)** via the `yunoCreatePayment()` callback function.

### Step 5: Get payment status

To obtain the **payment status**, call the `yunoPaymentResult()` function. Based on the status, display the corresponding confirmation screen to the customer.

### Step 6: Receive payment result through webhook

Yuno recommends configuring [webhooks](doc:webhooks) in your [dashboard](https://auth.y.uno/u/login?). Webhooks automatically notify your system of payment updates, eliminating the need for frequent status requests.