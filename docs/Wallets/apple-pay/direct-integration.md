---
title: Direct integration
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
Yuno makes it easy to integrate Apple Pay into your payment system. This guide will help you set up connections, configure routing, and start processing payments securely with Yuno’s **Direct Integration**. 

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer \">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <div class=\"contentContainer\">\n        <p>\n          Access the <a href=\"/docs/direct-flow\">Direct Flow</a> page for additional information aboute the Direct Integration. \n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 1: Add the connection

First, you have to add the Apple Pay connection to the Yuno Dashboard by following these steps:

1. Log in to your [Yuno Dashboard](https://dashboard.y.uno/connections).
2. Navigate to the **Connections** section.
3. Locate and select the **Apple Pay** option and click **Connect**.
4. Provide a **Name** for the connection, select **Apple Pay** as **Payment method**, and provide the information you acquired when following the [Prerequisites](doc:prerequisites-apple-pay)  process.
5. Click **Add**. Apple Pay will be added to your connections.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6d674dd-Screenshot_2024-07-02_at_2.27.47_PM.png",
        "",
        ""
      ],
      "align": "center",
      "sizing": "700px"
    }
  ]
}
[/block]


## Step 2: Add a route for Apple Pay

Set up a new route to control how payments are processed through Apple Pay. Follow the steps below:

1. In the [Yuno Dashboard](https://dashboard.y.uno/connections), navigate to the **Routing** section.
2. Find the **Apple Pay** connection. If you have not created a route for Apple Pay yet, it will be on the **Not published** tab.
3. Set up a new route by pressing **Setup** on your **Apple Pay** module and then clicking on **Create new route**. 
4. Add conditions to specify when payments should be routed through Apple Pay. 
5. Add Apple Pay as the payment processor for this route to ensure that payments meeting the defined conditions are processed through Apple Pay.
6. Save and publish the route once all configurations are defined.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer \">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <div class=\"contentContainer\">\n        <p>\n          Access the <a href=\"/docs/routing\">Routing</a> documentation page for additional information. \n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


The following image displays a simple route through which Apple Pay processes all payments. 

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d5b9a8c-Screenshot_2024-07-02_at_2.30.09_PM.png",
        "",
        ""
      ],
      "align": "center",
      "sizing": "600px"
    }
  ]
}
[/block]


7. Once that is done, you will need to **set the route for the Card payment method** indicating with which provider you want to process payments with. 

## Step 3: Update the Checkout Builder

To make Apple Pay available to your end users, you have to enable it on the Checkout Builder by following these steps:

1. In the [Yuno Dashboard](https://dashboard.y.uno/connections), navigate to the **Checkout Builder** section.
2. Select **Set condition**.
3. Under **Payment methods**, enable **Apple Pay**.
4. Click **Publish** to make Apple Pay available as a payment option for all transactions that meet the defined routing criteria.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/52781326ea260052f9a62e98d5cd6a1bbfdaa39f50062912f15f3bdb310aa019-4eb043c-Screenshot_2024-08-07_at_4.57.16_PM.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Step 4: Creating payments with Direct Integration

Follow the steps below to process payments using the **Direct Integration** method. For a detailed walkthrough of each step, refer to the full guide on [Creating Payments](doc:create-payment-basic):

1. **Create a Customer**: Use the [Create Customer](ref:create-customer) endpoint to register the customer's information. (Optional)

2. **Create the Payment**: Use the [Create Payment](ref:create-payment) endpoint to create a payment sending the `cryptogram` returned by Apple Pay SDK. If you do not have integrated Apple's SDK, we recommend using [our SDKs](doc:sdk-integration-apple) so you don't have to worry about the integration. 

3. **Retrieve Payment Details**: To check the payment status, you can analyze the `status` and `sub_status` in the response from the [Create Payment](ref:create-payment) endpoint or use the [Webhooks](doc:webhooks). Refer to the [Payment Status](ref:payment) page to see all possible statuses.