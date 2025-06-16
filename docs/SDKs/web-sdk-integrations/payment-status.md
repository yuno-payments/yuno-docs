---
title: Payment Status
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Payment Status
  description: >-
    To monitor payments, you can use one of the monitoring status solutions
    provided by Yuno. You can use on of two options, Status and Status Lite.
  robots: index
next:
  description: ''
---
To monitor payments, you can use one of the monitoring status solutions provided by Yuno. You can use on of two options:

* **Status**: You can use the Status SDK to update the user about the payment process. It provides visual information for customers.
* **Status Lite**: You can use the Status Lite SDK to get info about the current payment status. However, the Status Lite does not mount any element.

Both solutions initialize the same way. After adding the Yuno SDK to your system and creating an instance, check the desired status solution to learn how to use it.

## Step 1: Include the library in your project.

Ensure the Yuno SDK file is included in your webpage before closing the `<body>` tag. Refer to the example below:

```html
<script src="https://sdk-web.y.uno/v1.1/static/js/main.min.js"></script>
```

## Step 2: Initialize SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid **PUBLIC\_API\_KEY**. Check the [Get your API credentials](ref:get-your-api-credentials) guide.

Like the example below, use the initialized class that is attributed to the `yuno` constant.

```html
<script src="https://sdk-web.y.uno/v1.1/static/js/main.min.js"></script>
```

Once you create the instance, choose between using the Status o Status Lite solutions to access the payment status.

## Step 3: Use Status

To use the Status, you need to mount it. Use the `mountStatusPayment` function to define the `checkoutSession` related to the payment, the `country_code`, the `language`, and the callback `yunoPaymentResult`.

The callback will be executed when the status is received, informing the user. Defining the element to mount the Status is unnecessary since it will cover the entire screen. The next code block presents an example of the parameter configuration.

```javascript
yuno.mountStatusPayment({
  checkoutSession: '438413b7-4921-41e4-b8f3-28a5a0141638',
  /**
   * The complete list of country codes is available on https://docs.y.uno/docs/country-coverage-yuno-sdk
   */
  country_code: 'FR',
  /**
  * Language can be one of en, fr, jp
  */
  language: 'fr',
  /**
   * @param {'READY_TO_PAY' | 'CREATED' | 'SUCCEEDED' | 'REJECTED' | 'CANCELLED' | 'ERROR' | 'DECLINED' | 'PENDING' | 'EXPIRED' | 'VERIFIED' | 'REFUNDED'} data
   */
  yunoPaymentResult(data) {
    console.log('yunoPaymentResult', data)
  }
})
```

### Use Status Lite

To receive the current payment status using Status Lite, you need to call the method `yunoPaymentResult` providing the `checkoutSession` related to the payment, as shown in the example below:

```javascript
/**
 * Call method that returns status, this won't render anything
 * 
 * @return {'READY_TO_PAY' | 'CREATED' | 'SUCCEEDED' | 'REJECTED' | 'CANCELLED' | 'ERROR' | 'DECLINED' | 'PENDING' | 'EXPIRED' | 'VERIFIED' | 'REFUNDED'}
 */
const status = await yuno.yunoPaymentResult(checkoutSession)
```

> 👍 Custom Payment Status Integration
>
> If you prefer to use your own custom Payment Status page instead of personalizing the one provided by our SDK, you can do so by editing the HTML file to connect to an edited `status-lite.js` script. This allows you to fully customize the appearance and behavior of the payment status display while still using Yuno's status functionality. For example, after calling the `yunoPaymentResult` function, you can handle the status result in your own version of the `status-lite.js` script, which will then update your custom HTML file.