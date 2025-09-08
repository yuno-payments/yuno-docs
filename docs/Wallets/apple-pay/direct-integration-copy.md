---
title: Direct integration (One-time payments) (COPY)
excerpt: ""
deprecated: false
hidden: true
metadata:
  title: ""
  description: ""
  robots: index
next:
  description: ""
---

Yuno makes it easy to integrate Apple Pay into your payment system. This guide will help you set up connections, configure routing, and start processing payments securely with Yuno's **Direct Integration**.

> 📘 Additional Information
>
> Access the [Direct Flow](#direct-flow) page for additional information about the Direct Integration.

## Step 1: Add the connection

First, you have to add the Apple Pay connection to the Yuno Dashboard by following these steps:

1. Log in to your [Yuno Dashboard](https://dashboard.y.uno/connections).
2. Navigate to the **Connections** section.
3. Locate and select the **Apple Pay** option and click **Connect**.
4. Provide a **Name** for the connection, select **Apple Pay** as **Payment method**, and provide the information you acquired when following the [Prerequisites](doc:prerequisites-apple-pay) process.
5. Click **Add**. Apple Pay will be added to your connections.

<Image align="center" width="700px" src="https://files.readme.io/6d674dd-Screenshot_2024-07-02_at_2.27.47_PM.png" />

## Step 2: Add a route for Apple Pay

Set up a new route to control how payments are processed through Apple Pay. Follow the steps below:

1. In the [Yuno Dashboard](https://dashboard.y.uno/connections), navigate to the **Routing** section.
2. Find the **Apple Pay** connection. If you have not created a route for Apple Pay yet, it will be on the **Not published** tab.
3. Set up a new route by pressing **Setup** on your **Apple Pay** module and then clicking on **Create new route**.
4. Add conditions to specify when payments should be routed through Apple Pay.
5. Add Apple Pay as the payment processor for this route to ensure that payments meeting the defined conditions are processed through Apple Pay.
6. Save and publish the route once all configurations are defined.

> 📘 Additional Information
>
> Access the [Routing](#routing) documentation page for additional information.

The following image displays a simple route through which Apple Pay processes all payments.

<Image align="center" width="600px" src="https://files.readme.io/d5b9a8c-Screenshot_2024-07-02_at_2.30.09_PM.png" />

7. Once that is done, you will need to **set the route for the Card payment method** indicating with which provider you want to process payments with.

## Step 3: Update the Checkout Builder

To make Apple Pay available to your end users, you have to enable it on the Checkout Builder by following these steps:

1. In the [Yuno Dashboard](https://dashboard.y.uno/connections), navigate to the **Checkout Builder** section.
2. Select **Set condition**.
3. Under **Payment methods**, enable **Apple Pay**.
4. Click **Publish** to make Apple Pay available as a payment option for all transactions that meet the defined routing criteria.

<Image align="center" src="https://files.readme.io/52781326ea260052f9a62e98d5cd6a1bbfdaa39f50062912f15f3bdb310aa019-4eb043c-Screenshot_2024-08-07_at_4.57.16_PM.png" />

## Step 4: Creating payments with Direct Integration

Follow the steps below to process payments using the **Direct Integration** method. For a detailed walkthrough of each step, refer to the full guide on [Creating Payments](doc:create-payment-basic):

1. **Create a Customer**: Use the [Create Customer](ref:create-customer) endpoint to register the customer's information. (Optional)

2. **Create the Payment**: Use the [Create Payment](ref:create-payment) endpoint to create a payment sending the `cryptogram` returned by Apple Pay SDK. If you do not have integrated Apple's SDK, we recommend using [our SDKs](doc:sdk-integration-apple) so you don't have to worry about the integration.

3. **Retrieve Payment Details**: To check the payment status, you can analyze the `status` and `sub_status` in the response from the [Create Payment](ref:create-payment) endpoint or use the [Webhooks](doc:webhooks). Refer to the [Payment Status](ref:payment) page to see all possible statuses.

## Pass Apple Pay payment token in request

When you initiate a transaction with Apple Pay, a payment token containing a JSON-formatted paymentData string is sent. Pass the complete token received from Apple Pay in the `payment_method.detail.wallet.payment_token` field as a JSON string in your payment request.

### Apple Pay wallet response object

The Apple Pay SDK returns the following object structure, which must be passed as the complete `payment_token` value:

```json
{
  "paymentMethod": {
    "type": "credit",
    "displayName": "Visa 1234",
    "network": "Visa"
  },
  "paymentData": {
    "data": "+yWYyldI/H0kAvZOTQL/y0vRKYoWPGWK54TN5xiBUK7EdZhMDvlWaX88n1yXJdKzcW7arzqmckP5rjx7hGsYP3oF5VJW4OhElkSdPWsvWqnCzUmUz6BTmT3HBwI5gJBjGoIUG79UkBP+dRbpVCEcTd6Zr3d/jE7Uu6Q+6XMhMzkKwfPuNGrTzSFPQcOX5z8xNmnFiZwjXE42LsM4+INhzkzUvW7AfugmpU+aoPS8L6bcoMSwy0jalxraAMwxUQUNbxFdTe78F9Ftryr03kHWIDI7pvCSMHmT/skC6ha425x0zSPrrvoQtJVbR7lZEsHiaqsIyP7Qgfn3iPrdaEg/nx2WIgW+SrFAqsgOCauh6WRo7KjU5+M9AFpJXyByYPmnwqo14trsSZq25iVc0dS99EweperG5E+FCRiTNrSf1Xk=",
    "signature": "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",
    "header": {
      "publicKeyHash": "h/mfJj19xShja2t1Wfto4BiaaOuRaF/Fj5tAHHkjZUo=",
      "ephemeralPublicKey": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEuW/NN1h3s5rQFiOOfXH7VpiPy4Twbyiy4um/5XJcRlwcRuRfy2574VFMKk4FKalyXZC/J4/hcq/taS8yImRBYg==",
      "transactionId": "dcba2ab36bdf5f7131ea1c8c590039a95038cb528cf6d6c8a4326e7b8853dca3"
    },
    "version": "EC_v1"
  },
  "transactionIdentifier": "dcba2ab36bdf5f7131ea1c8c590039a95038cb528cf6d6c8a4326e7b8853dca3"
}
```

### Request example

```json
{
  "country": "US",
  "amount": {
    "currency": "USD",
    "value": 100
  },
  "customer_payer": {
    "merchant_customer_validations": {
      "account_is_verified": true,
      "email_is_verified": true,
      "phone_is_verified": true
    }
  },
  "workflow": "DIRECT",
  "payment_method": {
    "detail": {
      "wallet": {
        "payment_token": "{\"paymentMethod\":{\"type\":\"credit\",\"displayName\":\"Visa 1234\",\"network\":\"Visa\"},\"paymentData\":{\"data\":\"+yWYyldI/H0kAvZOTQL/y0vRKYoWPGWK54TN5xiBUK7EdZhMDvlWaX88n1yXJdKzcW7arzqmckP5rjx7hGsYP3oF5VJW4OhElkSdPWsvWqnCzUmUz6BTmT3HBwI5gJBjGoIUG79UkBP+dRbpVCEcTd6Zr3d/jE7Uu6Q+6XMhMzkKwfPuNGrTzSFPQcOX5z8xNmnFiZwjXE42LsM4+INhzkzUvW7AfugmpU+aoPS8L6bcoMSwy0jalxraAMwxUQUNbxFdTe78F9Ftryr03kHWIDI7pvCSMHmT/skC6ha425x0zSPrrvoQtJVbR7lZEsHiaqsIyP7Qgfn3iPrdaEg/nx2WIgW+SrFAqsgOCauh6WRo7KjU5+M9AFpJXyByYPmnwqo14trsSZq25iVc0dS99EweperG5E+FCRiTNrSf1Xk=\",\"signature\":\"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\",\"header\":{\"publicKeyHash\":\"h/mfJj19xShja2t1Wfto4BiaaOuRaF/Fj5tAHHkjZUo=\",\"ephemeralPublicKey\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEuW/NN1h3s5rQFiOOfXH7VpiPy4Twbyiy4um/5XJcRlwcRuRfy2574VFMKk4FKalyXZC/J4/hcq/taS8yImRBYg==\",\"transactionId\":\"dcba2ab36bdf5f7131ea1c8c590039a95038cb528cf6d6c8a4326e7b8853dca3\"},\"version\":\"EC_v1\"},\"transactionIdentifier\":\"dcba2ab36bdf5f7131ea1c8c590039a95038cb528cf6d6c8a4326e7b8853dca3\"}"
      }
    },
    "type": "APPLE_PAY"
  },
  "account_id": "2d77ea44-9a01-4ffc-a465-7db5c2ced44d",
  "description": "Apple Pay test",
  "merchant_order_id": "MER01"
}
```
