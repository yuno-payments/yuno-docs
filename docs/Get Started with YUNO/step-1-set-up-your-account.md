---
title: Set Up Your Account
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Set Up Your Account
  description: >-
    In this section, you will create a Yuno account and make all the necessary
    configurations to process a payment. We will guide you on your account
    creation, configuring your first connection, setting the routing, enabling
    the payment method in the checkout builder, and getting the API credentials.
  robots: index
next:
  description: ''
  pages:
    - type: basic
      slug: step-2-your-first-payment
      title: Create Your First Payment
---
This guide walks you through creating and configuring your Yuno account to process payments. You'll learn how to:

* Set up your Yuno account
* Configure your first payment connection
* Set up payment routing
* Enable payment methods
* Obtain API credentials

### Step 1: Create your account on Yuno

To create your Yuno account:

1. Contact [sales@y.uno](mailto:sales@y.uno) to request a new account
2. Look for a verification email from the Yuno team and follow the instructions to verify your identity
3. Once verified, you'll receive your Yuno account credentials
4. Log into the [Yuno dashboard](https://dashboard.y.uno/) using your credentials

![Account creation process](https://files.readme.io/4e69b61-register_yuno_V2.png)

After accessing the dashboard, follow the steps below to enable payment methods. Repeat these steps each time you want to add a new payment method.

### Step 2: Set up your first connection

To set up your first payment connection:

1. Navigate to [Connections](https://dashboard.y.uno/connections) in the dashboard sidebar
2. Search for "Yuno Test Payment Gateway" in the search bar
3. Click **Connect** next to the gateway
4. Enter a descriptive name for the connection, and follow the on-screen prompts
5. Click **Save**

The dashboard will display a confirmation message when your connection is successfully added.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;">
  <video src="https://github.com/writechoiceorg/yuno-images/raw/main/doc/set_up_you_account/connection_setup_V4_v2.mp4" loop autoplay muted playsinline style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></video>
</div>
`}</HTMLBlock>

### Step 3: Set up routing for your new connection

After adding a connection, you need to assign it to a route. Routes determine which provider processes payments. While you can configure multiple routes and processors for each payment method, this guide covers a basic setup where all payments are processed through the Yuno Test Payment Gateway connection.

To set up routing:

1. Navigate to [Routing](https://dashboard.y.uno/routing) in the dashboard sidebar
2. Click the **Not published** tab to view payment methods with available connections but no configured routes
3. Find the **Card** payment method and click **Set Up**
4. In the popup window:
   * Click **+ Create new route**
   * Enter a descriptive name
   * Click **Save**
5. Click the arrow and select **Add step**
6. Choose **Yuno Test Payment Gateway** from the list and click **Select**
7. Click **Publish** to save all changes

Once published, you'll find your new route in the Published tab. This means the Card payment method will process all transactions through your configured route.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;">
  <video src="https://github.com/writechoiceorg/yuno-images/raw/main/doc/set_up_you_account/routing_V2.mp4"  loop autoplay muted playsinline style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></video>
</div>
`}</HTMLBlock>

### Step 4: Enable the payment method in the checkout builder

After configuring your connection and routing, enable the Card payment method to make it available in your checkout:

1. Navigate to [Checkout Builder](https://dashboard.y.uno/checkout-builder) in the dashboard sidebar
2. Locate the Card payment method in the list of available methods
3. Toggle the switch next to Card to enable it
4. Click **Publish settings** apply your changes

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;">
  <video src="https://github.com/writechoiceorg/yuno-images/raw/main/doc/set_up_you_account/checkoutbuilder.mp4"  loop autoplay muted playsinline style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></video>
</div>
`}</HTMLBlock>

### Step 5: Get your API credentials

To complete the setup, you'll need to obtain your API credentials from the Yuno dashboard. These credentials are required for integrating Yuno into your application and are specific to the Sandbox environment.

1. Navigate to the [Developers](https://dashboard.y.uno/developers) section in the dashboard sidebar
2. Locate your API credentials in the Developer Tools section:
   * Public API Key - Used for client-side SDK initialization
   * Secret API Key - Used for server-side API calls

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;">
  <video src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/set_up_you_account/developer_V2.mp4" loop autoplay muted playsinline style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></video>
</div>
`}</HTMLBlock>

Now that you've completed the dashboard setup and obtained your API credentials, proceed to [Create your first payment](doc:step-2-your-first-payment) to continue with the integration guide.