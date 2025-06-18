---
title: Set Up Payment Connection
deprecated: false
hidden: true
metadata:
  robots: index
next:
  pages:
    - slug: create-payment-basic
      title: Create Payments
      type: basic
---
# Set Up Connections and Routing for Payments

Before you can create payments using direct integration with Yuno's API, you must configure your account by setting up payment connections, defining payment routing, enabling payment methods, and obtaining your API credentials. This page explains these essential setup steps.

You'll learn how to:

* Configure your first payment connection.
* Set up payment routing.
* Enable payment methods in the checkout builder.
* Get your API credentials, including your `public-api-key` and `private-secret-key`.

> > 📘 Yuno Testing Gateway
> >
> > Make sure to choose the payment connection that suits your needs when following these instructions. If you want to test credit card payments, use [Yuno Testing Gateway](doc:yuno-testing-gateway) as your provider.

## Set Up Your Account

### Step 1: Set Up Your Connection

To set up your first payment connection:

1. Navigate to **Connections** in the dashboard sidebar.
2. Use the search bar to find the connection you need.
3. Click **Connect** next to the gateway.
4. Provide a descriptive name for the connection and follow any on-screen prompts.
5. Click **Save**.

A confirmation message will appear in the dashboard once your connection is successfully added.

<Video src="https://github.com/writechoiceorg/yuno-images/raw/main/doc/set_up_you_account/connection_setup_V4_v2.mp4" />

### Step 2: Set Up Routing for Your New Connection

After adding a connection, you must assign it to a route, which determines which provider processes payments. For a basic setup, follow these steps:

1. Navigate to [Routing](https://dashboard.y.uno/routing) in the dashboard sidebar.
2. Click on the **Not published** tab to view payment methods that have available connections but no configured routes.
3. Find the desired payment method and click **Set Up**.
4. In the pop-up window:
   * Click **+ Create new route**.
   * Enter a descriptive name for the route.
   * Click **Save**.
5. Click the arrow next to the new route and select **Add step**.
6. Choose a **processor** from the list and click **Select**.
7. Click **Publish** to save all your changes.

Your new route now appears in the **Published** tab, indicating that the configured payment method will now process all transactions through this configured route.

<Video src="https://github.com/writechoiceorg/yuno-images/raw/main/doc/set_up_you_account/routing_V2.mp4" />

### Step 3: Enable the Payment Method in the Checkout Builder

After configuring your connection and routing, you need to enable the payment method to make it available in your checkout:

1. Navigate to [Checkout Builder](https://dashboard.y.uno/checkout-builder) in the dashboard sidebar.
2. Locate the configured payment method in the list of available methods.
3. Toggle the switch to enable it.
4. Click **Publish settings** to apply your changes.

<Video src="https://github.com/writechoiceorg/yuno-images/raw/main/doc/set_up_you_account/checkoutbuilder.mp4" />

### Step 4: Get Your API Credentials

To complete the setup and integrate Yuno into your application, you will need to obtain your API credentials from the Yuno dashboard. These credentials are specific to the Sandbox environment:

1. Navigate to the **Developers** section in the dashboard sidebar.
2. In the Developer Tools section, locate your API credentials:
   * **Public API Key**: Used for client-side SDK initialization.
   * **Secret API Key**: Used for server-side API calls.

<Video src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/set_up_you_account/developer_V2.mp4" />

After you complete these steps, you're ready to create payments using **direct integration**.