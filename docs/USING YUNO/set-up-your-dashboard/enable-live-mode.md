---
title: Enable Live Mode
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
When you move your Yuno account from test mode (Sandbox) to live mode, you will put your payment system into production, making it possible to process real transactions.

## Checklist

Before enabling live mode, it is essential you have accomplished some steps in the Yuno integration process. Consult this checklist to guarantee a smooth transition while getting ready to go live with your integration.

### 1. Dashboard

[block:html]
{
  "html": "<input type=\"checkbox\"> You have access to your credentials. <br>\n<input type=\"checkbox\"> All payment, acquirers, and fraud prevention solutions you will use are connected.<br>\n<input type=\"checkbox\"> You have created routes to define how each payment will be processed.<br>\n<input type=\"checkbox\"> The checkout was configured using the checkout builder, and the desired payment methods are available.<br>"
}
[/block]

### 2. Integration

[block:html]
{
  "html": "<input type=\"checkbox\"> You have chosen one of the available integration methods (Full Checkout, Lite Checkout, Secure Fields, Direct Flow, or Plugins). <br>\n<input type=\"checkbox\"> The Yuno system was integrated with your system using the chosen method. <br>"
}
[/block]

### 3. Tests

After the integration, you have successfully performed tests to:

[block:html]
{
  "html": "<input type=\"checkbox\"> Create payments. <br>\n<input type=\"checkbox\"> Authorize and capture payments. <br>\n<input type=\"checkbox\"> Cancel payments. <br>\n<input type=\"checkbox\"> Refund payments. <br>\n<input type=\"checkbox\"> Build and receive reports. <br>\n<input type=\"checkbox\"> Handle all the possible error scenarios."
}
[/block]

### 4. Notifications

[block:html]
{
  "html": "<input type=\"checkbox\"> You have successfully configured webhooks to receive notification in real-time. <br>"
}
[/block]

## Going live

Once you have access to your credentials, configured payment connections, and successfully tested all functionalities in sandbox environment, you are ready to enable live mode.

### Enable live mode

1. First, you must activate your account by clicking on **Activate account** in the [Yuno Merchant Dashboard](https://dashboard.y.uno/).

[block:image]
{
  "images": [
    {
      "image": [
        "https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/enableLiveMode/enable_live1.png",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]

> 📘 Note
> 
> The account activation process requires you to provide some profile information and may take 2-4 weeks. In case of any problems, please get in touch with <a href="mailto:support@y.uno">Yuno support</a>. Meanwhile, you can continue using the sandbox environment for testing.

2. After starting the activation process, your Dashboard status will change to **Verifying account status**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/enableLiveMode/enable_live2.png",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]

3. Once activation is completed, Yuno will contact you, and you will have access to your **Production** environment credentials. Thus, you can switch to the Production environment through your Merchant Dashboard:

[block:image]
{
  "images": [
    {
      "image": [
        "https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/enableLiveMode/enable_live3.png",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]