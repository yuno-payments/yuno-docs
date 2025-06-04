---
title: 3DS Setup SDK
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: 3DS Setup SDK
  description: >-
    To enable 3DS in your payment flow, you first need to request a setup id
    (`three_d_secure_setup_id`). For each payment, you need to generate a new
    `three_d_secure_setup_id`.
  robots: index
next:
  description: ''
---
The 3DS Setup SDK enables you to collect the user's device information. This information determines whether a transaction is high-risk and whether a challenge is necessary for additional verification. After collecting the information, you can continue with the payment. This page explains how to integrate and use the SDK to collect user information.

## Requirements

Before integrating the 3DS into your system, be sure to enable 3DS in your [Yuno Dashboard](https://dashboard.y.uno/) and specify the scenarios in which you want your customers to be able to use it. For additional information, access the [Direct Workflow](doc:direct-workflow#requirements) page.

## Step 1: Add Yuno SDK

With the `three_d_secure_setup_id` in hand, you need to include the Yuno SDK file in your webpage before closing the `<head>` tag. See the example below:

```html
<script src="https://sdk-web.y.uno/v1.1/static/js/main.min.js"></script>
```

## Step 2: Get the Setup Id

Before starting the payment flow,  you have to request a setup Id (`three_d_secure_setup_id`). For each payment, you need to generate a new `three_d_secure_setup_id`. Use the [3DS Setup](ref:3ds-setup) endpoint to get the `three_d_secure_setup_id`. You need to inform your Yuno `account_id` and the card information used in the payment.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer alert">
    <div class="verticalLineAlert"></div>
    <div>
      <h3>Availability</h3>
      <div class="contentContainer">
        <p>
					This operation is only available for PCI compliance merchants, as you would be handling customers' card data.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Step 3: Start the data collection

To initiate the data collection necessary for the 3DS payment flow, you will use the `Yuno.threeDSecure.setup()` function. The following table lists all the required parameters for initializing the `setup()` function.

| Required Parameter | Description                                                                                            |
| :----------------- | :----------------------------------------------------------------------------------------------------- |
| `setupId`          | Refers to the `three_d_secure_setup_id` obtained in [Step 2](#step-2-get-the-setup-id).                |
| `publicApiKey`     | Refers to your Yuno's `public-api-key`, available on the [Yuno's Dashboard](https://dashboard.y.uno/). |
| `accountId`        | Refers to your Yuno's `account-id`, available on the [Yuno's Dashboard](https://dashboard.y.uno/).     |

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer alert">
    <div class="verticalLineAlert"></div>
    <div>
      <h3>Misconfiguration Risk</h3>
      <div class="contentContainer">
        <p>
					Improper configuration of the <code>acquirerBin</code>, <code>acquireCountryCode</code>, <code>merchantID</code>, and <code>mcc</code> parameters can lead to issues in the transaction liability shift.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

The next code block presents an example of initialization.

```javascript javasc
Yuno.threeDSecure.setup({
      publicApiKey: '<public-api-key>',
      setupId: '<three_d_secure_setup_id>',
      accountId: '<account-id>',
    }).then(({status}) => {
      //SUCCEEDED or ERROR
    })
```

After executing the `setup()` service, the Yuno system will receive the necessary device information. Thus, you can continue with the payment. Remember always to use the`three_d_secure_setup_id` to identify the device where the payment is being made.