---
title: Set Up Your Account (COPY)
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
In this section, you will create a Yuno account and make all the necessary configurations to process a payment. We will guide you on your account creation, configuring your first connection, setting the routing, enabling the payment method in the checkout builder, and getting the API credentials.

### Step 1: Create a Yuno account

Go to our [dashboard](https://dashboard.y.uno/), click on **Sign Up** and create a user using your company's email. Then you will receive an email to verify your identity. Once you are verified, you can log into the dashboard.

[block:html]
{
  "html": "<div style=\"background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px\">\n  <image src=\"https://github.com/writechoiceorg/yuno-images/blob/main/doc/set_up_you_account/register_yuno.png?raw=true\" style=\"width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);\"></image>\n</div>"
}
[/block]

Now you have access to the dashboard. Follow the next configuration steps to turn on a payment method. You will follow these steps always you add a new payment method. 

### Step 2: Configure your first connection

1. Go to the [Connections](https://dashboard.y.uno/connections) section on the left sidebar of the dashboard. Here you can find all the available connections you can use through Yuno. In this example, we will use the **Yuno Test Payment Gateway**.
2. Look for the Yuno Test Payment Gateway in the search box on the upper right section of your screen and click **Connect**.
3. Give the connection a name you can remember, and click **Connect** again. 

You will see a confirmation that your new connection was added.

[block:html]
{
  "html": "<div style=\"background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;\">\n  <video src=\"https://github.com/writechoiceorg/yuno-images/raw/main/doc/set_up_you_account/connection_setup_low.mp4\" loop autoplay muted playsinline style=\"width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);\"></video>\n</div>"
}
[/block]

### Step 3: Set up the route for your new connection

When you have a new connection, you need to add it to a route. A route defines the provider which will process a payment. You can have multiple routes and processors for a payment method. However, for this example, we will make a basic configuration in which all the payments will be processed with the Yuno Test Payment Gateway connection.

1. Go to the [Routing](https://dashboard.y.uno/routing) section on the left sidebar of the dashboard. Here you can find all your published and unpublished routes. 
2. Now you need to click in the **Not Published** tab, where you will find all the payment methods with available connections that don't have a route configured. 
3. Look for the **Card** payment method and click on **Set Up**. 
4. Create a new route and set a name for it. 
5. Then click the purple arrow and add a step using the Yuno Test Payment Gateway. 
6. Click the purple **Publish** button in the upper right corner, and you are all set.

Now you can find the new route in the Published tab, which means that the Card payment method will process all the transactions through the route you previously configured.

[block:html]
{
  "html": "<div style=\"background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;\">\n  <video src=\"https://github.com/writechoiceorg/yuno-images/raw/main/doc/set_up_you_account/routing_low.mp4\"  loop autoplay muted playsinline style=\"width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);\"></video>\n</div>"
}
[/block]

### Step 4: Enable the payment method in the checkout builder

Once you have created a connection and set it up in a route, you must turn on the Card payment method to show it in your checkout.

1. Go to the [Checkout Builder](https://dashboard.y.uno/checkout-builder) section on the left sidebar of the dashboard. Here you can find the payment methods with published routes.
2. Turn on the Card toggle to show the payment method in your checkout.
3. Click the purple **Publish** button in the upper right corner, and you are all set.

[block:html]
{
  "html": "<div style=\"background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;\">\n  <video src=\"https://github.com/writechoiceorg/yuno-images/raw/main/doc/set_up_you_account/checkout_low.mp4\" loop autoplay muted playsinline style=\"width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);\"></video>\n</div>"
}
[/block]

### Step 5: Get your API credentials

Now everything is set, and you need to get your API credentials. Note that these credentials only work with our Sandbox environment.

1. Go to the [Developers](https://dashboard.y.uno/developers) section on the left sidebar of the dashboard. Here you can find the Developers' tools.
2. You can find the API credentials you will need to complete this guide here.

[block:html]
{
  "html": "<div style=\"background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;\">\n  <video src=\"https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/set_up_you_account/developer_low.mp4\" loop autoplay muted playsinline style=\"width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);\"></video>\n</div>"
}
[/block]

Everything is set in the dashboard. Now you can go to the [Create Your First Payment](doc:step-2-your-first-payment) section, where you will find the steps to complete this guide.