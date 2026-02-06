---
title: Headless SDK (Enrollment Web)
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: Head
  description: >-
    The document outlines the steps for creating a payment using the Headless
    Web SDK, including requirements, initialization, creating a customer
    session, and generating a vaulted token.
  robots: index
next:
  description: ''
---
<br />

> 👍 Recommended SDK
>
> We recommend using the [Web Seamless SDK](seamless-sdk-payment-web) for a smooth integration experience. This option provides a flexible payment solution with pre-built UI components and customization options.

Yuno's Headless SDK lets you enroll in payment methods and tokenize cards, saving them for future usage.

The following steps describe creating a payment using Yuno's Headless SDK.

## Requirements

To execute the enrollment process, you need to provide the `customer_session` to start the enrollment process in [Step 3](doc:headless-sdk-enrollment#step-3-create-a-customer-session). To acquire the  `customer_session`, you need to:

1. **Create a customer**: A customer is required to enroll in payments. Use the [Create Customer](ref:create-customer) endpoint to create new customers. In the response, you will receive the customer `id`, which you use to create the customer session.
2. **Create the customer session**: Use the  customer `id` and the [Create Customer Session](ref:create-customer-session) endpoint to receive the `customer_session`.

## Step 1: Include the library in your project

Before proceeding with the Headless SDK implementation, see the [SDK Integration Overview](doc:quickstart) for detailed instructions on how to properly integrate the SDK into your project.

The integration guide provides three flexible methods:

1. Direct HTML script inclusion
2. Dynamic JavaScript injection
3. NPM module installation

Choose the integration method that best suits your development workflow and technical requirements. After completing the SDK integration, you can proceed with the following steps to implement the headless enrollment functionality.

> 📘 TypeScript Library
>
> If you are using TypeScript, Yuno provides a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) that you can use to see all available methods in the Yuno Web SDK.

## Step 2: Initialize Headless SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid `PUBLIC_API_KEY`.

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

> 📘 Credentials
>
> See the credentials page for more information: [https://docs.y.uno/reference/authentication](https://docs.y.uno/reference/authentication)

## Step 3: Create a customer session

To start the enrollment process, you need to provide the `customer_session`. First, you need to create a customer. You need a customer to enroll payments with. Use the [Create Customer](ref:create-customer) endpoint to create new customers. In the response, you will receive the customer `id`, which you use to create the customer session.

After creating the customer, you can create the customer session. Use the  customer `id` and the [Create Customer Session](ref:create-customer-session) endpoint. The `customer_session` will be provided in the response. You need a new `customer_session` every time you enroll in a new payment method.

## Step 4: Create an enrollment payment method object

You need an enrollment payment method object to set Headless SDK integration for enrollment. You can create one using the [Enroll Payment Method](ref:enroll-payment-method-checkout) endpoint. While creating the payment method object, you need to define which payment method your customer can enroll in. Currently, only CARD is available for Headless SDK.

> 🚧 Verify Card
>
> If you want to verify cards (zero value authorization) before enrollment, you need to provide the `verify` object when creating the payment method object for the customer session.

## Step 5: Start the enrollment process

Next, you will start the checkout process using the `apiClientEnroll` function, providing the necessary configuration parameters.

### Parameters

Configure the enrollment with the following options:

| Parameter          | Description                                                                                                                                                                                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `countryCode`      | This parameter specifies the country for which the enrollment process is being set up. Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:quickstart) page. |
| `customer_session` | Refers to the current enrollment's [customer session](doc:sessions) received as a response to the [Create Customer Session](ref:create-customer-session) endpoint. Example: `'438413b7-4921-41e4-b8f3-28a5a0141638'`                                                                          |

```javascript
const apiClientEnroll = yuno.apiClientEnroll({
  countryCode: "CO",
  customer_session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3"
});
```

## Step 6: Generate a vaulted token

After collecting all user information, you can start the enrollment. First, you need to create a `vaulted_token` using the function `apiClientEnroll.continueEnrollment`. As it is an asynchronous function, you can use `try/catch` to ensure you will correctly handle triggered errors. The following example shows how to create a `vaulted_token`:

```javascript
const vaultedTokenResponse = await apiClientEnroll.continueEnrollment({
  customer_session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3",
  payment_method: {
    type: "CARD",
    card: {
      detail: {
        expiration_month: 11,
        expiration_year: 25,
        number: "4111111111111111",
        security_code: "123",
        holder_name: "ANDREA B",
        type: "DEBIT"
      }
    },
    customer: {
    }
  }
});
```

After enrolling the new card, you will receive the `vaulted_token`, which you can use to make payments in the future without asking for your customer's card information. The following code block shows an example of a response from the `apiClientEnroll.continueEnrollment` function:

```json
{
 vaulted_token: "9104911d-5df9-429e-8488-ad41abea1a4b",
 customer: {
   session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3"
 },
 status: "ENROLLED"
}
```

> 📘 Possible Status Values
>
> The `status` field can have one of the following values:
>
> * `CREATED`
> * `EXPIRED`
> * `REJECTED`
> * `READY_TO_ENROLL`
> * `ENROLL_IN_PROCESS`
> * `UNENROLL_IN_PROCESS`
> * `IN_PROCESS`
> * `ENROLLED`
> * `DECLINED`
> * `CANCELED`
> * `ERROR`
> * `UNENROLLED`

> 📘 Demo App
>
> In addition to the code examples provided, you can access the [Demo App](../docs/demo-app) for a complete implementation of Yuno SDKs.

## Stay Updated

Visit the [changelog](https://docs.y.uno/changelog) for the latest SDK updates and version history.
