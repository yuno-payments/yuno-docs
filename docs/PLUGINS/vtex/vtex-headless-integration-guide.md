---
title: VTEX Headless Integration Guide
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
Integrate Yuno SDK Web with VTEX Headless to streamline your online payment process. This guide provides step-by-step instructions for installation, configuration, and implementation.

## VTEXIO integration

To enable Yuno in your VTEXIO checkout, you must install the following applications:

* `yunopartnerbr.yuno`: A VTEXIO PPF connector that integrates VTEX with Yuno’s payment infrastructure.
* `yunopartnerbr.yuno-app`: A VTEXIO frontend payment application required for Card or Click to Pay payment methods. This app is not needed for Pix, Boleto, or other redirect-based payment methods.

`yunopartnerbr.yuno-app` offers these key features:

  * Runs the Yuno Web SDK to collect browser data.
  * Executes third-party fraud detection SDKs.
  * Processes payments directly within Yuno.
  * Supports payments with two credit cards.

## Installation

To integrate **Yuno with VTEX**, you need to install two applications:

* `yunopartnerbr.yuno`: VTEX PPF connector for backend communication.
* `yunopartnerbr.yuno-app`: Frontend payment application required for card-based payments.

> 🚧 Admin permissions required
>
> You must have Admin permissions in VTEX to install these applications.


### Install the `yunopartnerbr.yuno` connector

To connect your VTEX store with Yuno, you need to install the `yunopartnerbr.yuno` connector in VTEX Admin. This connector enables backend communication between VTEX and Yuno.

Follow these steps:

1. Log in to your [VTEX store account](https://vtex.com).
2. In the VTEX Admin dashboard, go to **Store Settings > Providers** and click **New Provider**.
3. Search for **Yuno** in the list of available providers.
4. Click **Install** and follow the on-screen instructions to complete the setup.

![](https://files.readme.io/8b9a136e600a017bac069f269c13f2e2d13c5510c81327a33e18db3eac49ce84-image.png)

For more information, see [Configure Yuno as provider](https://docs.y.uno/docs/configure-yuno-as-provider).

### Install the `yunopartnerbr.yuno-app` frontend app

The `yunopartnerbr.yuno-app` is required for card-based payments, including Card and Click to Pay. This app enables the Yuno Web SDK and payment UI in your VTEX checkout.

To install the app:

1. In VTEX Admin, navigate to **Apps > App Management**.
2. Search for **Yuno**.
3. Find and select **Yuno Payment App** (usually the second option in the list).
4. Click **Install** and follow the prompts to finish the installation.

<Image align="center" src="https://files.readme.io/4902cb86d6c26bee4ac69c17c8eccb5d05d97d59639d1420065f48af77623e10-Install_Yuno_Payment_App_.png" />

### Install Yuno SDK Web for VTEX (Optional)

If your project requires **Yuno SDK Web VTEX**, install it using `npm`:

```sh
npm install @yuno-payments/sdk-web-vtex
```

This package simplifies the integration of **SDK Web VTEX** and includes TypeScript support.

To use the SDK, import and initialize it:

```javascript
import { loadScript } from '@yuno-payments/sdk-web-vtex'

...

const yunoVTEX = await loadScript()

yunoVTEX.mount({...})
```

For more information, see the [@yuno-payments/sdk-web-vtex package on npm](https://www.npmjs.com/package/@yuno-payments/sdk-web-vtex).

## Payment flows

This section explains how payments are processed in both VTEXIO and VTEX Headless environments, covering different payment methods and their respective flows.

- [Credit card payment flow in VTEXIO](#credit-card-payment-flow-in-vtexio)
- [Pix (APMs) payment flow in VTEXIO](#pix-apms-payment-flow-in-vtexio)
- [VTEX Headless payment flow](#vtex-headless-payment-flow)

### VTEXIO payment flows

VTEXIO supports seamless payment processing for multiple methods, including credit cards and alternative payment methods (APMs) such as Pix. The following steps describe how these payment flows operate.

#### Credit card payment flow in VTEXIO

The following steps outline how a credit card payment is processed in VTEXIO, from the initial user action to the final transaction confirmation:

1. The user clicks the pay button in the VTEXIO frontend.
2. The VTEX backend sends the payment information to the `yunopartnerbr.yuno` connector.
3. The Yuno connector forwards the credit card information to the Yuno API.
4. The Yuno API returns a one-time token for the payment.
5. The Yuno connector notifies VTEX that the payment app should be opened and provides the one-time token.
6. VTEXIO opens the Yuno payment app using the data from the Yuno connector.
7. The user enters their credit card details in the Yuno payment app.
8. Payment details, browser information, and fraud detection data are sent back to the Yuno connector.
9. The payment is created and processed in Yuno.
10. The user receives confirmation of the payment status from VTEX.

<Image align="center" src="https://files.readme.io/ef30b7c45fbb3db4e49c574d6085dd9f242872a3c14ad9f93112631409e3c44a-Diagrama_-_Credit_card_payment_flow_VTEXIO.png" />

#### Pix (APMs) payment flow in VTEXIO

The following steps describe how Pix and other alternative payment methods (APMs) are processed in VTEXIO, from payment creation to user redirection.

1. The user clicks the pay button in the VTEXIO frontend.
2. The VTEX backend sends the payment information to the `yunopartnerbr.yuno` connector.
3. The Yuno connector creates the payment in Yuno’s system.
4. Yuno generates a QR code and additional payment details, then returns them to VTEX.
5. VTEXIO opens the Pix application or redirects the user to complete the payment.

<Image align="center" src="https://files.readme.io/89ce5296e6a38d163c1e5c9936b689477545556e7c42fd2d57561db069d09e06-Diagrama_-_Pix_APM_payment_flow_VTEXIO.png" />

### VTEX headless

VTEX Headless allows merchants to build custom checkout experiences while leveraging Yuno for payment processing.

To enable Yuno in your VTEX Headless checkout, you must install:

* `yunopartnerbr.yuno`: A VTEXIO PPF connector that runs on the VTEXIO server side.

Additionally, you should implement the [SDK Web VTEX](#installing-and-using-the-sdk-web-vtex), which supports payments with two credit cards.

#### VTEX headless payment flow

The VTEX Headless payment flow differs from VTEXIO, as it requires more direct integration with your custom frontend. The following steps outline how credit card payments are processed in VTEX Headless:

1. The user clicks the pay button in the merchant’s custom frontend.
2. The VTEX backend sends the payment information to the `yunopartnerbr.yuno` connector.
3. The Yuno connector sends the credit card information to the Yuno API.
4. The Yuno API returns a one-time token for the payment.
5. The Yuno connector notifies VTEX that the payment app should be opened and provides the one-time token.
6. The merchant frontend opens the Yuno SDK Web VTEX using the provided data.
7. The payment details, browser information, and fraud detection data are sent to the Yuno connector.
8. The Yuno connector processes the payment by calling `{{merchant’s domain}}/_v/yunopartnerbr.yuno/v4/payments/yuno`.
9. The user receives confirmation of the payment status from VTEX.

<Image align="center" src="https://files.readme.io/4cc5782110e9722bbf3572bb047e010b8a17e471c600b6d6fa3bf64ac3536781-Diagrama_-_Credit_card_payment_flow_VTEX_Headless.png" />

## Installing and using the SDK Web VTEX

Integrate Yuno payments into your VTEX storefront using the SDK Web VTEX. This SDK enables you to process payments directly in your custom frontend, providing a seamless checkout experience for your customers.

To get started, add the SDK script to your HTML file and configure the required parameters as shown below:

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://sdk-web-vtex.y.uno/v1/main.js"></script>
</head>
<body>
  <div id="root-container"></div>
  <script>
    window.YunoVTEX.mount({  
      elementRoot: "root-container",  
      payload: '{}',  
      language: 'pt',
      domainVTEX: 'https://myvtex.yunopartnerbr.com',
      onPaymentDone: (paymentData) => { console.log(paymentData); },
      onError: (message, error) => { console.log(message, error); },
      onLoading: (loading) => { console.log(loading); }
    });
  </script>
</body>
</html>
```

The following table describes the parameters you can use.

| Property        | Type     | Description                                     | Required | Example                                                                               |
| --------------- | -------- | ----------------------------------------------- | -------- | ------------------------------------------------------------------------------------- |
| `elementRoot`   | String   | HTML Element ID                                 | True     | `"root-container"`                                                                    |
| `payload`       | String   | Comes from our connector response               | True     | `{"isVTEXCard":true, "checkoutSessions":["id"], "paymentIds":["id"], "orderId":"id"}` |
| `language`      | String   | ISO 639-1 language code                         | True     | `"pt"`                                                                                |
| `domainVTEX`    | String   | Merchant’s VTEX domain (if different from VTEX) | False    | `"https://myvtex.yunopartnerbr.com"`                                                  |
| `onLoading`     | Function | Called when SDK processes a payment             | False    | `function(loading) { console.log(loading); }`                                         |
| `onPaymentDone` | Function | Called when payment is complete                 | False    | `function(paymentResponse) { console.log(paymentResponse); }`                         |
| `onError`       | Function | Called if an error occurs                       | False    | `function(message, error) { console.log(error); }`                                    |

To get TypeScript types, install the `npm` package:

```shell
npm install @yuno-payments/sdk-web-vtex
```

## Payment response payloads

When you process payments with **Yuno and VTEX**, the `yunopartnerbr.yuno` connector automatically generates a structured payload containing all relevant transaction details. You do not need to manually modify or format this payload. The structure of the payload adapts dynamically based on the selected payment method (for example, credit card or Pix).

Below you will find example payloads for credit card and Pix payments.

> 📘 **About payload generation**
>
> - **Automated:** The payload is generated automatically by the connector.
> - **Dynamic:** The structure changes depending on the payment method.
> - **Seamless integration:** The data is retrieved directly from Yuno’s connector during VTEX transactions.
>
> For more information, see the [API reference](https://docs.y.uno/reference/create-payment).

### Credit card payment payload

The following JSON example shows a typical credit card payment authorization response generated by Yuno.

```json
{
  "status": "undefined",
  "authorizationId": null,
  "paymentAppData": {
    "appName": "yunopartnerbr.yuno-app",
    "payload": "{\"isVTEXCard\":true,\"checkoutSessions\":[\"acd5c64e-f4c6-4cde-a24d-840e2d7ed78c\"],\"paymentIds\":[\"6BB2F575BB1B493A9D3A3EBD8D8AA8D8\"],\"orderId\":\"1510060504991\",\"publicApiKeys\":[\"sandbox_gAAAAABmq_lv7XP4nR-1Wey4rNuph3vWrCxxDwXYB9_V28t2ZGiAJPBAiWRKUxCu1siekHoTkSTNWaUoi2kjfyVJHdPbqZ3mrKwwXHtwkEeOBYqiAGmGQ2-RXJT3-ay-XUrnRbAWwz_tnwU-CHrb1_Mh6GkBzWCvMaZqeGwjF3xVRCeGfrlZopW9mmB7G93d-Q7UBTIcQNIQi-llGl8VHR396GKiwZT8XGC0wYh5ZYzotUWs9KZ1PZkH1d-ow-Zw2tmsv8cuc3HJ\"],\"country_code\":\"BR\",\"paymentMethod\":\"Visa\",\"authorizations\":[{\"reference\":\"504991\",\"orderId\":\"1510060504991\",\"shopperInteraction\":\"ecommerce\",\"paymentMethod\":\"Visa\",\"value\":0,\"referenceValue\":148,\"currency\":\"BRL\",\"installments\":1,\"installmentsInterestRate\":0,\"installmentsValue\":148,\"ipAddress\":\"185.239.149.42\",\"miniCart\":{\"buyer\":{\"email\":\"camilo.segura@y.uno\",\"firstName\":\"Camilo\",\"lastName\":\"Segura\",\"document\":\"02678175928\",\"phone\":\"+5511912345678\"},\"shippingAddress\":{\"receiverName\":\"Camilo Segura\",\"postalCode\":\"89220555\",\"city\":\"Joinville\",\"state\":\"SC\",\"country\":\"BRA\",\"street\":\"Rua São Matias\",\"number\":\"1\"},\"billingAddress\":{\"postalCode\":\"89220555\",\"street\":\"Rua São Matias\",\"neighborhood\":\"Costa e Silva\",\"city\":\"Joinville\",\"state\":\"SC\",\"country\":\"BRA\",\"number\":\"1\"},\"items\":[{\"id\":\"17\",\"name\":\"BLACK + DECKER 20V Max Cordless Motosserra, 10 polegadas, ferramenta somente (LCS1020B)\",\"price\":138,\"quantity\":1}],\"shippingValue\":10,\"taxValue\":0},\"paymentId\":\"6BB2F575BB1B493A9D3A3EBD8D8AA8D8\",\"transactionId\":\"A09E2F38DD524C64B92CD5019D9A41E7\",\"callbackUrl\":\"https://yunopartnerbr.vtexpayments.com.br/payment-provider/transactions/A09E2F38DD524C64B92CD5019D9A41E7/payments/6BB2F575BB1B493A9D3A3EBD8D8AA8D8/retry\"}],\"sessions\":[\"ZjgyMzRmZTZmMDVkMzBkNTg2YjY5NzZjNDA2YTY0NTJmNTE2NWJiYTIyZjI3NjU2ZjRiNjg0YzNhZGZkZGQ5NTVjMzFhYWNkNDU1NzFlNTU1ZmQ1MmQ0MWQyYzdlZDM4MDNmNTQ4OTZhN2FiMmYyNTJhYzI4YzZkYzkxNTlmNDAzMmYwNmIyY2E1ZmM1OWE2OWZhOTUyNDY3NjI3YTM0OTQ5NmEyYTQwNzgzMTVhYmU2YTkzNDBhMTc2ZmFjNzY0NWU0ZjU3ZjBmNDIzNDVjNDJjM2MyNjBlZGIwMmQ2ZjkyMzc4OGEzODEzMjE0N2NhN2M0MTM4Y2RkMDAwNjRkYjkwNmQxMjAzZTdiNGNjODJlMjEzZjczZDliZDg3NTMxYjQzZjQ0ZmFiNDJlMmQ4M2UwYTg2YjJhZWNmMmNmYTYzNDY4ZDExZGE2YjAyZTMyYTA2MmI3ZWJlMzIyNjRkYWFlM2JjMTczNThiYmEyNzZkMGUzMzIzMDFlYjk4NTA4NzJjNTIwZjIxOWI5OWY3YTE3ZWJhNWFiMGI0YzYzNWEwNTMwMmQ4YzlmMmVhZGJiOTBlNmY1YTZjMzk3ZTU4M2E4NGU3YzMzMDI2YTczNzdmM2Y5ZWQwOWE3MGFiZjlmMDk4NzkwY2U5YTQ3MTQ1ZTY1MzhjYjU0N2ZhNjY4MDY2NDIxMjA5MWM3MDdhYzc4MDYwMzg0YzA4ODg2NzM0YzRjNzMwNzAyMGNiNWQxOTVlZTAxOWZiZWJhOTg4MWJhMTY2ODY1NDFjOWExMTdlM2M2OGJmMmE5OGI4OTBjYTBkYWIxZjI2ZDc5NDdmYzc2NDE0YjBmODNlNWFkM2RlYTFkNzM1ZmQzMGMxNTlmNTY5YTZmZTYwNGMxMjViMzY0ZTNkN2JmYTk0NWFmN2I2Y2ZiNTRjN2Y3Y2EwMzJjZGY1NDM4MTlhNTIwMTQ4MzY2YzI1YmUyYTk1M2VlYjFhZGE2YmQ5MWYxYjUxZGIwYjE1MWJhYmZmZmFjODgzMDNjNmY4OTBiMWMxZWViMzUwMmQ3NGIwZTljNDZlY2ZlMTkyNTgwZjYwNDcxZjQ5ZWEzMTEyODQyMjE2NDYxYzI0MzM5NjQ3MjU3NGQ5NTE2MGJiMDBhMjQxYThlNmM1ZDEwZDQ3NzFlNDM4YjNhNzZhMzkzNTIyZDNkNmE1YWQyNGY3MTc5ZGJjOWM4OGEzNmVhNjgzYmZiMGQ2YThjNDY4M2ZiNDRkNGJmODVmNzIyYThhMmNhZjY0NzRlMmYxYzYzMTFjNWQ1N2RhOWM3NmFhNmU5ZjJmZmEwODUxMDZmNDA4ZjJlMjkyN2VkZjRiMjRiYzk0ZGMxZTJiMzlhMzk5YjE4ZTUzNjYwZjhmMDJmNTVlZWVhYzdhOWE0MjIyMjBjOWM0NzQ1YTliOWQ0MjYxZmE0YjliMDcxNjhhM2NmZjA2NDRjNWEyZTQ1NWU5YjViMjAyY2NmNDI5MmU4OWEwNjgyZjdkODZkYTc3ZWE4YzEzYjVhODI3YzhjMmI0MWNiNTc1MjMwZTQzZjUzZjhlMTdmOTVjOTkxNmE0MWIwNmMzZDZkNjc2YTgxOTk2ZjZlMGEwNGZiZTMyYTIxMzk3YTdjYjhmNTRjYjJhZTNlYmNkYmI3Njc4ZTdiOWVjZDU3ZTkxZWI4NGY2MWUzNjQ0N2I1YzY4ODhmODVlYmQzY2Q4YjExY2E2M2RkNmUzOTAyZjgyNTRkMjcxZGU0MzI1YzUxMmViMTBkYTM4YTk3ZTMwMzM1N2ZkZmVkNDlkYTQ0MzQ1NjczZTJlNTljZDdkMmFlZGNjMWVlYjM4NWE3NjMyYjZkZjIxZDQ3M2I0ZTdmMzNhNTI3MDg1Y2M0OWEyYzVhZTRiZmVhYjg2MDVhZTQzZWIwY2ExM2RkMzc1MWE1MzQyMDMwMzc4ODI0YTZiMDQ4MjA0NjYwMmZmNmQ2ZDIwYTk4NGI1NWQ5MGU3ODBmODM2MGI5NGU4ZjNhNjYwNDlkZDZkNjBmN2NkMzAyOTZjNDczYjQwNTcyMjkyNWZh\"],
    \"account\":\"yunopartnerbr\"}"
  }
}
```

### Pix payment payload

When processing a Pix payment, Yuno automatically generates a response payload that includes the Pix QR code in both text and base64 image formats. This allows you to display the QR code to the customer for payment. Below is an example of a typical Pix payment response.

```json
{
  "status": "undefined",
  "authorizationId": null,
  "paymentAppData": {
    "appName": "yunopartnerbr.yuno-app",
    "payload": {
      "code": "00020126830014br.gov.bcb.pix2561qr-code-h.picpay.com/pix/624ea025-9bb0-47ae-a620-6f2b9ba048815204000053039865802BR5912p2bpix teste6009Sao Paulo62070503***6304535D",
      "qrCodeBase64Image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABWQAAAVkCAYAAABTjRaxAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAIABJREFUeJzs2ltu5TqWQMFmw/OfMuvz3vyoBFyil7YPIwZwsCU+bCxo7b33/wEAAAAA8OP+/+0BAAAAAABuIcgCAAAAAEQEWQAAAACAiCALAAAAABARZAEAAAAAIoIsAAAAAEBEkAUAAAAAiAiyAAAAAAARQRYAAAAAICLIAgAAAABEBFkAAAAAgIggCwAAAAAQEWQBAAAAACKCLAAAAABARJAFAAAAAIgIsgAAAAAAEUEWAAAAACAiyAIAAAAARARZAAAAAICIIAsAAAAAEBFkAQAAAAAigiwAAAAAQESQBQAAAACICLIAAAAAABFBFgAAAAAgIsgCAAAAAEQEWQAAAACAiCALAAAAABARZAEAAAAAIoIsAAAAAEBEkAUAAAAAiAiyAAAAAAARQRYAAAAAICLIAgAAAABEBFkAAAAAgIggCwAAAAAQEWQBAAAAACKCLAAAAABARJAFAAAAAIgIsgAAAAAAEUEWAAAAACAiyAIAAAAARARZAAAAAICIIAsAAAAAEBFkAQAAAAAigiwAAAAAQESQBQAAAACICLIAAAAAABFBFgAAAAAgIsgCAAAAAEQEWQAAAACAiCALAAAAABARZAEAAAAAIoIsAAAAAEBEkAUAAAAAiAiyAAAA**TRUNCATED**"
    }
  },
  "paymentId": "C9B4F5750BD24EF084E0C7EC0DB7AD16",
  "code": "UNDEFINED",
  "message": "Payment session started by Yuno"
}

```
