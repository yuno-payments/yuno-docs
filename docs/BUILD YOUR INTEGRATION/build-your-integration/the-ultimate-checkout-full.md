---
title: Full SDK (Con flujo unificado)
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: Full SDK (Con flujo unificado)
  description: >-
    Using our Full SDK, you can integrate Yuno, minimizing integration,
    maintenance, and operational efforts without any need for compliance.
  robots: index
next:
  description: ''
---
## Overview

Using our Full SDK, you can integrate Yuno, minimizing integration, maintenance, and operational efforts without any need for compliance.

With the Full SDK, Yuno handles the user experience and allows you to customize the checkout and payment methods you are showing to your users from our dashboard. This gives you a lot of flexibility and reduces the need to write more code in the future when you add new payment methods and features to your payment stack.

One of the main advantages of the full SDK integration is that we take care of every scenario for your customer regardless of the payment method chosen. You can handle all of them with a single integration.

## Payment Workflow

Render all the available payment methods with a single integration

![](https://files.readme.io/f80dc2a-image.png)

### Step 1: Create a customer

The first step of the payment flow is to create a customer. A customer will have payment methods associated, this is why it is important. You can create a customer using the [Create Customer Endpoint](https://docs.y.uno/reference/create-customer). As a result, you will receive the id of the customer that was created in the Yuno DB.

If you have created a customer that is going to pay previously you can skip this step.

### Step 2: Create a checkout session

You use checkout sessions to create payments. You will create a new checkout session every time you make a payment. With a checkout session, you will have access to all payment methods available for that customer (both previously enrolled or not) to make a purchase, which you can then offer to your customers.

You can create it using [Checkout Session Endpoint](https://docs.y.uno/reference/create-checkout-session). To create a new checkout session, you will need the customer id, generated when you created the customer on the Yuno system. This endpoint will provide the checkout session id that you can use for your payment.

Once you have performed the first two steps, you will need to implement one of our  SDKs to continue the payment flow.

### Step 3: Implement the SDK and obtain the One Time Token

By using the Full SDK, we will show the customer all the payment methods they have available (including previously enrolled payment methods) and ask for any additional information necessary to make the payment so you do not have to worry about it.

In this step, you will have to initialize Yuno's SDK with your API credentials and the checkout session previously created in step two. Below you will find a checklist to initialize the Yuno SDK:

**Checklist**

1. Include the library in your project.
2. Initialize SDK with the public key.
3. Start the checkout process. Configure SDK by calling the function `yuno.startCheckout()` with the desired configuration.
4. Mount the SDK in Web or add the view in Mobile to display the checkout to your user. Once your user selects a payment method, proceed with step 5.
5. You must create a payment button on your front end. When the user clicks the payment button, begin the payment process by calling the function `yuno.startPayment()`.

* If needed the SDK will collect the additional payment information. This can include, card information or the customer payer information, required by the provider. (email, phone number, document, etc).

6. Once this process is completed, the SDK will provide a One-Time Token in the callback function `yunoCreatePayment()`. This function must be defined when you configure the SDK in the function `yuno.startCheckout()`.

For more detailed information on how to initiate Yuno's SDK please refer to one of the following sections according to the corresponding platform:

<HTMLBlock>{`
<body>
  <section class="platform_shelf">
    <div class="platform_buttons" onclick="window.location='full-checkout-sdk';">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe"
        viewBox="0 0 16 16">
        <path
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
      </svg>
      <h3>
        Web
      </h3>
    </div>
    <div class="platform_buttons" onclick="window.location='full-checkout-ios';">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-apple"
        viewBox="0 0 16 16">
        <path
          d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
        <path
          d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
      </svg>
      <h3>
        iOS
      </h3>
    </div>
    <div class="platform_buttons" onclick="window.location='full-checkout-android';">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-android2"
        viewBox="0 0 16 16">
        <path
          d="m10.213 1.471.691-1.26c.046-.083.03-.147-.048-.192-.085-.038-.15-.019-.195.058l-.7 1.27A4.832 4.832 0 0 0 8.005.941c-.688 0-1.34.135-1.956.404l-.7-1.27C5.303 0 5.239-.018 5.154.02c-.078.046-.094.11-.049.193l.691 1.259a4.25 4.25 0 0 0-1.673 1.476A3.697 3.697 0 0 0 3.5 5.02h9c0-.75-.208-1.44-.623-2.072a4.266 4.266 0 0 0-1.664-1.476ZM6.22 3.303a.367.367 0 0 1-.267.11.35.35 0 0 1-.263-.11.366.366 0 0 1-.107-.264.37.37 0 0 1 .107-.265.351.351 0 0 1 .263-.11c.103 0 .193.037.267.11a.36.36 0 0 1 .112.265.36.36 0 0 1-.112.264Zm4.101 0a.351.351 0 0 1-.262.11.366.366 0 0 1-.268-.11.358.358 0 0 1-.112-.264c0-.103.037-.191.112-.265a.367.367 0 0 1 .268-.11c.104 0 .19.037.262.11a.367.367 0 0 1 .107.265c0 .102-.035.19-.107.264ZM3.5 11.77c0 .294.104.544.311.75.208.204.46.307.76.307h.758l.01 2.182c0 .276.097.51.292.703a.961.961 0 0 0 .7.288.973.973 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h1.343v2.182c0 .276.097.51.292.703a.972.972 0 0 0 .71.288.973.973 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h.76c.291 0 .54-.103.749-.308.207-.205.311-.455.311-.75V5.365h-9v6.404Zm10.495-6.587a.983.983 0 0 0-.702.278.91.91 0 0 0-.293.685v4.063c0 .271.098.501.293.69a.97.97 0 0 0 .702.284c.28 0 .517-.095.712-.284a.924.924 0 0 0 .293-.69V6.146a.91.91 0 0 0-.293-.685.995.995 0 0 0-.712-.278Zm-12.702.283a.985.985 0 0 1 .712-.283c.273 0 .507.094.702.283a.913.913 0 0 1 .293.68v4.063a.932.932 0 0 1-.288.69.97.97 0 0 1-.707.284.986.986 0 0 1-.712-.284.924.924 0 0 1-.293-.69V6.146c0-.264.098-.491.293-.68Z" />
      </svg>
      <h3>
        Android
      </h3>
    </div>
  </section>
</body>
`}</HTMLBlock>

### Step 4: Create the payment

Once you have completed the first three steps, you can create a payment. A payment gathers all crucial details regarding the order, customer specifics, total amount, currency, products, shipping details, and more. You can create it using [Create Payment endpoint](https://docs.y.uno/reference/create-payment), please consider that you will have to send the one\_time\_token obtained in the previous step in order for the payment to work.

**Note:**

The response of the payment endpoint will provide an important parameter called `sdk_action_required`.

* When the selected payment method is synchronous, the API response will provide the final payment status. In this scenario, the field `sdk_action_required` in the API response will be `false`. The payment process concludes at this step.

* For asynchronous payment methods, additional action via the SDK will be necessary. This will be indicated by the API through the field `sdk_action_required` in the response, which will be set to `true`.

> 📘 Status
>
> During integration, we advise using the payment `status` and `sub_status` as your primary reference for the payment's state. Since a payment might have multiple associated transactions, concentrating on the payment `status`/`sub_status` ensures you're informed of the most recent state. This provides a clear basis for decision-making regardless of the number of transactions involved.

### Step 5: Continue Payment

If in the response of the create payment you receive the parameter `sdk_action_required` set to `true`, you will need to invoke the Full SDK again, you can do this using the function `continuePayment`. Calling this function will display the additional screens or steps the customer needs to perform in order to complete the payment.

We recommend incorporating the method `continuePayment` from the SDK after creating the payment. This is because certain asynchronous payment methods demand additional action from the customer for completion.

### Step 6: Get Payment Status

Call the `yunoPaymentResult()` function to obtain the payment status. Once you have this status you can use it to show your user the corresponding screen depending on the final result of the payment.

### Step 7: Receive the payment result through a webhook

We also recommend configuring [Webhooks](doc:webhooks) in your Yuno dashboard. Webhooks are the best way to ensure your system is up-to-date with payment progress and status. Since the event notifications trigger automatically, your system won't need to perform recurrent requests to Yuno.

***

## Enroll a credit card with a payment

Yuno enables you to save a credit/debit card for future purchases with the same payment request without having to integrate the [enrollment](doc:enrollment-lite) integration. There are several ways to obtain a [vaulted token](https://docs.y.uno/docs/tokens):

* Set the parameter `vault_on_sucess = true` in the Create Payment Endpoint. In the response of the payment, you will receive the `vaulted_token` that corresponds to the card used by the customer payer.
* You can also set the function `cardSaveEnable = true` in the SDK to display a checkbox for the user to select if he wants to save the card for future purchases. If the user checks the box in the response of the payment you will receive the `vaulted_token` that corresponds to the card used by the customer payer.

After the payment is made, the user will have the credit card available for future purchases and you can see the detailed information by using one of the following services:

* [Get payment methods by checkout session](https://docs.y.uno/reference/retrieve-payment-methods-for-checkout)
* [Get payment methods by customer](https://docs.y.uno/reference/retrieve-enrolled-payment-methods-api)

> 🚧 Using a vaulted token
>
> Even though the user selects an enrolled payment method to create the payment, we recommend using the SDK to tokenize the information and continue with the payment instead of just using the vaulted token directly to Yuno's API. This allows us to:
>
> * Support 3DS
> * Support fraud screening
> * Ask for missing information for the enrolled payment method in case the selected provider in the CARD route needs some additional fields.
>
> You just need to send the vaultedToken in the mountCheckoutLite method and we'll take care of the rest. Remember that if the payment method you are using requires an additional step for the user to complete (such as a 3DS challenge), you can use the yuno.continuePayment() method so we can take care of the corresponding redirection. The continue method not only works for enrolled payment methods, but it is necessary for regular payment methods that require an action from the customer in general, such as PSE for example.