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
Integrate Yuno SDK Web for VTEX Headless to handle online payments efficiently. This guide covers installation, configuration, and implementation steps.

## VTEXIO Integration

To use Yuno in VTEXIO checkout, install the following applications:

* `yunopartnerbr.yuno`: A VTEXIO PPF connector that facilitates integration between VTEX and Yuno's payment infrastructure.
* `yunopartnerbr.yuno-app`: A VTEXIO frontend payment application is required when using Card or Click to Pay as payment method. It is not required for Pix, Boleto, and other redirect-based payment methods. `yunopartnerbr.yuno-app` has the following key features:

  * Runs the Yuno Web SDK to collect browser data.
  * Executes third-party fraud detection SDKs.
  * Processes payments directly within Yuno.
  * Supports payments with two credit cards.

## Installation

To integrate **Yuno with VTEX**, you need to install two applications:  

* `yunopartnerbr.yuno`: VTEX PPF connector for backend communication.  
* `yunopartnerbr.yuno-app`: Frontend payment application required for card-based payments.

> 📘 Admin Permissions Required
>
> To install both applications, you need Admin permissions in VTEX.


### Install `yunopartnerbr.yuno`

Follow these steps to install `yunopartnerbr.yuno` in **VTEX Admin**:

1. Log into your  [VTEX store account](https://vtex.com).
2. In the VTEX Admin dashboard, navigate to  **Store Settings**  >  **Providers**  and click  **New Provider**.
3. Search for **Yuno** in the list of available providers.
4. Click **Install** and follow the setup instructions.

![](https://files.readme.io/8b9a136e600a017bac069f269c13f2e2d13c5510c81327a33e18db3eac49ce84-image.png)

For more details, refer to the [Configure Yuno as Provider](https://docs.y.uno/docs/configure-yuno-as-provider) page.

### Install `yunopartnerbr.yuno-app`

`yunopartnerbr.yuno-app` is required for payments using Card or Click to Pay. To install it, follow the steps:

1. In **VTEX Admin**, go to **Apps > App Management**.
2. Search for **Yuno**.
3. Locate and select **Yuno Payment App** (the second option in the list).
4. Click **Install** to complete the setup.

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

For additional information, access [@yuno-payments/sdk-web-vtex](https://www.npmjs.com/package/@yuno-payments/sdk-web-vtex).

## Payment Flows

The following sections illustrate how payments are processed in VTEXIO and VTEX Headless using different payment methods:

* [Credit Card Payment Flow in VTEXIO](#credit-card-payment-flow-in-vtexio) 
* [Pix (APMs) Payment Flow in VTEXIO](#pix-apms-payment-flow-in-vtexio)
* [VTEX Headless Payment Flow](#vtex-headless-payment-flow) 

### VTEXIO Payment Flows

VTEXIO enables seamless payment processing for various methods, including credit cards and alternative payment methods (APMs) like Pix. Below is a step-by-step breakdown of how these payment flows work.  

#### Credit Card Payment Flow in VTEXIO

This flow details how credit card payments are processed in VTEXIO, from user interaction to transaction completion.

1. The user clicks on the pay button in the VTEXIO frontend.
2. VTEX backend sends the payment information to the `yunopartnerbr.yuno` connector.
3. The Yuno connector sends the credit card information to the Yuno API.
4. The Yuno API returns a one-time token for the payment.
5. The Yuno connector informs VTEX that the payment app should be opened and provides the one-time token.
6. VTEXIO opens the Yuno payment app with the data from the Yuno connector.
7. The user enters credit card details in the Yuno payment app.
8. Payment details, browser information, and fraud detection data are sent back to the Yuno connector.
9. The payment is created in Yuno and processed.
10. The user receives confirmation of the payment status from VTEX.

<Image align="center" src="https://files.readme.io/ef30b7c45fbb3db4e49c574d6085dd9f242872a3c14ad9f93112631409e3c44a-Diagrama_-_Credit_card_payment_flow_VTEXIO.png" />

#### Pix (APMs) Payment Flow in VTEXIO

This flow explains how Pix and other APMs are handled in VTEXIO, including payment creation and redirection.

1. The user clicks on the pay button in the VTEXIO frontend.
2. VTEX backend sends the payment information to the `yunopartnerbr.yuno` connector.
3. The Yuno connector creates the payment in Yuno's system.
4. Yuno generates a QR code and additional payment details and returns them to VTEX.
5. VTEXIO opens the Pix application or redirects the user to complete the payment.

<Image align="center" src="https://files.readme.io/89ce5296e6a38d163c1e5c9936b689477545556e7c42fd2d57561db069d09e06-Diagrama_-_Pix_APM_payment_flow_VTEXIO.png" />

### VTEX Headless

To use Yuno in VTEX Headless checkout, install:

* `yunopartnerbr.yuno`: A VTEXIO PPF connector that runs on the VTEXIO server side.

Additionally, the [SDK Web VTEX](#installing-and-using-the-sdk-web-vtex) should be implemented. This SDK supports payments with two credit cards.

#### VTEX Headless Payment Flow

VTEX Headless requires a different approach to payment processing. Below are the steps for handling credit card transactions within VTEX Headless.

1. The user clicks on the pay button in the merchant's custom frontend.
2. VTEX backend sends the payment information to the `yunopartnerbr.yuno` connector.
3. The Yuno connector sends the credit card information to the Yuno API.
4. The Yuno API returns a one-time token for the payment.
5. The Yuno connector informs VTEX that the payment app should be opened and provides the one-time token.
6. The merchant frontend opens the Yuno SDK Web VTEX using the provided data.
7. The payment details, browser information, and fraud detection data are sent to the Yuno connector.
8. The Yuno connector processes the payment by calling the`{{merchant’s domain}}/_v/yunopartnerbr.yuno/v4/payments/yuno`.
9. The user receives confirmation of the payment status from VTEX.

<Image align="center" src="https://files.readme.io/4cc5782110e9722bbf3572bb047e010b8a17e471c600b6d6fa3bf64ac3536781-Diagrama_-_Credit_card_payment_flow_VTEX_Headless.png" />

## Installing and Using the SDK Web VTEX

The Yuno SDK Web VTEX allows seamless integration with VTEX’s payment infrastructure, enabling merchants to handle payments directly within their frontend.

To integrate Yuno SDK Web for VTEX, include the script in your HTML file and configure the necessary parameters:

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

## Payment Response Payloads

When processing payments through **Yuno and VTEX**, the `yunopartnerbr.yuno` connector generates a structured payload containing all the necessary transaction details. Below, we provide example payloads for credit card payments and Pix payments (APMs).  

> 📘 Payload Generation and Structure
>
> - Automated Generation: Merchants do not need to modify or format the payload manually.
> - Dynamic Structure: The payload format adapts based on the selected payment method (credit card, Pix, etc.).
> - Seamless Integration: The data is retrieved automatically from Yuno's connector when processing transactions in VTEX.
>
> For more details, access the [API reference](https://docs.y.uno/reference/create-payment).

### Credit Card Payment Payload

The following JSON response represents a credit card payment authorization processed through Yuno.

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

### Pix Payment Payload

This example shows a Pix payment response, where Yuno generates a QR code in both text format and base64 image format. 

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
