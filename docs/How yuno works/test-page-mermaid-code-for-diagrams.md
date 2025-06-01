---
title: 'Test page: Mermaid code for diagrams'
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
## How it works

If you are a developer, you can use our Direct Flow to continue using your checkout and connect to our services using only a server-to-server connection.

Your company must be PCI-certified to use our server-to-server card payments service. Please forward your AOC certification to your account manager before beginning the implementation.

> ❗️
>
> We always recommend using Yuno's SDKs over Direct Flow integrations. Yuno's SDKs are PCI compliant and simplify the payment process by managing all complexities, including fraud prevention, 3DS, and payment provider-specific requirements. Direct Flow requires merchants to handle these aspects manually, increasing complexity and risk.

For every implementation, we recommend taking the payment <code>status</code> and <code>sub\_status</code> as the main reference for the [payment's state](ref:payment). A payment could have different [transactions](ref:transaction) associated with it, so by focusing on the payment **status/sub\_status**, you can have the latest state regardless of how many transactions were made, giving you clear input for decision-making. With this integration, you can also [enroll credit cards](doc:direct-flow#enrollment) for future purchases (also only available for PCI-compliant merchants).

## Payment

![](https://files.readme.io/d13bfc9-Diagrama_-_Direct_flow_pago.png)

## Direct Payment Flow Diagram

This diagram illustrates the direct payment process, outlining the interactions between the Merchant App, Merchant Back, and Yuno Back systems. It details the steps from a user initiating a payment to receiving a payment status, including an optional customer creation flow.

### Merchant App

* List payment method
* User selects payment method and enters payment details
* User clicks payment button
* Show payment status

### Merchant Back

* Created customer (Optional)
* Make payment by sending user information
* Receive payment status via webhook

### Yuno Back

* Customer created (Optional)
* Make payment
* Issue payment status via webhook

### Flow:

1. Merchant App: List payment method
2. Merchant App: User selects payment method and enters payment details
3. Merchant App: User clicks payment button
4. Merchant App: User clicks payment button --> Merchant Back: Make payment by sending user information
5. Merchant Back: Make payment by sending user information --> Yuno Back: Make payment
6. Yuno Back: Make payment --> Yuno Back: Issue payment status via webhook
7. Yuno Back: Issue payment status via webhook --> Merchant Back: Receive payment status via webhook
8. Merchant Back: Receive payment status via webhook --> Merchant App: Show payment status

### Optional Customer Creation Flow:

1. Merchant Back: Created customer (Optional) --> Yuno Back: Customer created (Optional)

### Step 1: Create a customer

**[Optional]**: The first step of the payment flow is to create a customer. A customer will have payment methods associated. You can create a customer using the following [endpoint](ref:create-customer). As a result, you will receive the customer's ID that was created in the Yuno DB.

You can skip this step if you have previously created the customer.

This step is optional because you can send the customer information directly in the payment without creating a customer object in Yuno.

### Step 2: Create the payment

As you handle the whole payment experience with this integration, you will need to display the payment methods enabled in your Yuno account. Once the user has selected the payment method, you can create a payment. A payment gathers all crucial details regarding the order, customer specifics, total amount, currency, products, shipping details, and more. You can create a Payment using the following [endpoint](ref:create-payment).

You can use the [examples section](ref:payments-examples) in the API reference as a reference. If the user selects a previously enrolled payment method, you can use the **vaulted\_token** returned by the get payment methods service to create the payment.

During the integration, we recommend taking the payment **status** and **sub\_status** as the main reference for the payment's state. A payment could have different transactions associated with it, so by focusing on the payment **status/sub\_status**, you can have the latest state regardless of how many transactions were made, giving you clear input for decision-making.

### DIRECT vs REDIRECT Workflow

While using the Direct integration in Yuno, for Alternative Payment Methods (PSE, Nequi, MercadoPago, PIX, etc.), you have two available `workflow` options:

* **DIRECT**: We return the raw response from the providers so you can build the experience however you like with the unfiltered data.
* **REDIRECT**: While we also return the direct response from the providers, we also offer merchants the possibility to use a redirection link provided by Yuno where we handle the payment experience just for that payment. You can find such a URL in the `payment_method.detail.redirect_url` field in the payment's response.

### Important Add-ons

* **Webhooks**: We recommend configuring [Webhooks](doc:webhooks) in your Yuno dashboard. Webhooks are the best way to ensure your system stays up-to-date with payment progress and status. Since event notifications are triggered automatically, your system won't need to perform repeated requests to Yuno.

* **Device Fingerprints**: The customer's device fingerprints are used for fraud prevention purposes. They are usually generated by using third-party JavaScript in the checkout. If you are using a **Direct integration** and want to support fraud providers in the [payment flow](ref:create-payment), you can use this object to specify the necessary information. For integrations using Yuno checkout, the value is obtained automatically, so do not send this field.

  * ```json
    [...]
    "customer_payer": {
        "merchant_customer_id": "1690161049",
        "first_name": "Giovanna",
        "last_name": "Bartell",
        "email": "Lisandro_Leannon58@hotmail.com",
         "device_fingerprints": [
            {
                "provider_id": "MERCADO_PAGO",
                "id": "20a6c463-dd0c-4323-9115-03668d178856"
            },
            {
                "provider_id": "CLEARSALE",
                "id": "92d2ea4b-4bf7-494b-aaea-c48276135941"
            }     
      }, 
    [...]
    ```
    <br />

* **three\_d\_secure\_setup\_id**: Use our JS only to get the `three_d_secure_setup_id` and then handle the payment as an only API integration. The Direct workflow is only available for PCI-compliant merchants. It provides a straightforward way to create a payment and validate user information, requiring the merchant to perform just one request to create the payment. To successfully implement the Direct integration, follow the steps outlined in the [integration guideline](doc:direct-workflow) and provide the required information as instructed. This service is not necessary for 3DS implementation using Yuno's SDK.

## Enrollment

![](https://files.readme.io/26b6ffc-Diagrama_-_Direct_flow_registro.png)

## Direct Flow for Payment Method Registration

This diagram illustrates the process for directly registering a payment method, showing the interactions between the Merchant App, Merchant Back, and Yuno Back systems. It covers the steps from a user selecting a payment method for enrollment to receiving confirmation.

### Merchant App

* List payment method for enrollment
* User selects payment method and enters payment details
* User clicks the enrollment button
* Show enrollment status

### Merchant Back

* Created customer (Optional)
* Create payment method (Enrollment) - Receive Vaulted Token
* Receive confirmation via webhook (Receives Vaulted Token)

### Yuno Back

* Customer created (Optional)
* Create enrollment (Response Vaulted Token)
* Issue enrollment confirmation via webhook

### Flow:

1. Merchant App: List payment method for enrollment
2. Merchant App: User selects payment method and enters payment details
3. Merchant App: User clicks the enrollment button
4. Merchant App: User clicks the enrollment button --> Merchant Back: Create payment method (Enrollment) - Receive Vaulted Token
5. Merchant Back: Create payment method (Enrollment) - Receive Vaulted Token --> Yuno Back: Create enrollment (Response Vaulted Token)
6. Yuno Back: Create enrollment (Response Vaulted Token) --> Yuno Back: Issue enrollment confirmation via webhook
7. Yuno Back: Issue enrollment confirmation via webhook --> Merchant Back: Receive confirmation via webhook (Receives Vaulted Token)
8. Merchant Back: Receive confirmation via webhook (Receives Vaulted Token) --> Merchant App: Show enrollment status

### Optional Customer Creation Flow:

1. Merchant Back: Created customer (Optional) --> Yuno Back: Customer created (Optional)

### Step 1: Create a customer

The first step of the payment flow is to create a customer. A customer will have payment methods associated. You can create a customer using the following [endpoint](ref:create-customer). As a result, you will receive the customer's ID that was created in the Yuno DB.

You can skip this step if you have previously created the customer.

### Step 2: Enroll a payment method

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <div class="contentContainer">
        <p>
          This feature is only available for enrolling Cards for PCI compliant merchants
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

Once you have your customer, you can enroll the payment method using the [Enroll Payment Method endpoint ](ref:enroll-payment-method-api). With the information provided by Yuno after the customer selects the payment method to enroll, you will be able to save that information for future purchases using the `vaulted_token` that represents the payment method object created.
