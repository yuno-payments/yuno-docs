---
title: Payment Status
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Payment Status
  description: >-
    Monitor payment progress using Status (UI) or Status Lite (no UI).
  robots: index
next:
  description: ''
---
Monitor payment progress using one of two options:

* **Status**: Shows the status to customers using a full-screen UI.
* **Status Lite**: Returns the status programmatically without rendering UI.

Both solutions initialize the same way. After adding the Yuno SDK to your system and creating an instance, check the desired status solution to learn how to use it.

## Step 1: Include the library in your project

Ensure the Yuno SDK file is included in your webpage before closing the `<body>` tag. Refer to the example below:

```html
<script src="https://sdk-web.y.uno/v1.1/static/js/main.min.js"></script>
```

## Step 2: Initialize SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid `PUBLIC_API_KEY`. See the [credentials](https://docs.y.uno/reference/authentication) page for more information.

Like the example below, use the initialized class that is attributed to the `yuno` constant.

```html
<script src="https://sdk-web.y.uno/v1.1/static/js/main.min.js"></script>
```

Once you create the instance, choose between using the Status o Status Lite solutions to access the payment status.

## Step 3: Use Status

To use the Status, you need to mount it. Use the `mountStatusPayment` function to define the `checkoutSession` related to the payment, the `countryCode`, the `language`, and the callback `yunoPaymentResult`.

The callback will be executed when the status is received, informing the user. Defining the element to mount the Status is unnecessary since it will cover the entire screen. The next code block presents an example of the parameter configuration.

### Parameters

Configure the Status view with the following options:

| Parameter          | Description                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| `checkoutSession`  | Checkout session for the payment.                                                                        |
| `countryCode`      | Country code. See the full list in [Country coverage](doc:country-coverage-yuno-sdk).                    |
| `language`         | UI language (e.g., `en`, `fr`, `pt`).                                                                    |
| `yunoPaymentResult`| Callback invoked with the status result.                                                                  |

```javascript
yuno.mountStatusPayment({
  checkoutSession: '438413b7-4921-41e4-b8f3-28a5a0141638',
  countryCode: 'FR',
  language: 'fr',
  yunoPaymentResult(data) {
    console.log('yunoPaymentResult', data)
  }
})
```

### Use Status Lite

To receive the current payment status using Status Lite, you need to call the method `yunoPaymentResult` providing the `checkoutSession` related to the payment, as shown in the example below:

```javascript
// Call method that returns the status without rendering UI
const status = await yuno.yunoPaymentResult(checkoutSession);
```

> 👍 Custom Payment Status integration
>
> If you prefer to use your own custom Payment Status page instead of personalizing the one provided by our SDK, you can connect your HTML to a modified `status-lite.js`. After calling `yunoPaymentResult`, handle the result in your script and update your custom UI accordingly.