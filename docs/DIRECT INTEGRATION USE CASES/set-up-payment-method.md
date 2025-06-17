---
title: Set Up Payment Method
deprecated: false
hidden: true
metadata:
  robots: index
---
# Setting Up Connections and Routing for Payments

Before you can create payments using the Yuno API, you must configure your Yuno account by setting up payment connections, defining payment routing, enabling payment methods, and obtaining your API credentials. This guide walks you through these essential setup steps.

## Requirements Overview

To process payments, ensure you complete the following steps in your Yuno Dashboard:

* Configure your first payment connection.
* Set up payment routing.
* Enable payment methods in the checkout builder.
* Obtain your API credentials, including your `public-api-key` and `private-secret-key`.

## Detailed Setup Steps

### Step 1: Set up Your Connection

To set up your first payment connection:

1. Navigate to **Connections** in the dashboard sidebar.
2. Use the search bar to find the connection you need.
3. Click **Connect** next to the gateway.
4. Provide a descriptive name for the connection and follow any on-screen prompts.
5. Click **Save**.

A confirmation message will appear in the dashboard once your connection is successfully added.

### Step 2: Set up Routing for Your New Connection

After adding a connection, you must assign it to a route, which determines which provider processes payments. For a basic setup, follow these steps:

1. Navigate to **Routing** in the dashboard sidebar.
2. Click on the **Not published** tab to view payment methods that have available connections but no configured routes.
3. Find the desired payment method (for example, **Card**) and click **Set Up**.
4. In the pop-up window:
   * Click **+ Create new route**.
   * Enter a descriptive name for the route.
   * Click **Save**.
5. Click the arrow next to the new route and select **Add step**.
6. From the list, choose **Yuno Test Payment Gateway** and click **Select**.
7. Click **Publish** to save all your changes.

Once published, your new route will appear in the Published tab, indicating that the Card payment method will now process all transactions through this configured route.

### Step 3: Enable the Payment Method in the Checkout Builder

After configuring your connection and routing, you need to enable the payment method to make it available in your checkout:

1. Navigate to **Checkout Builder** in the dashboard sidebar.
2. Locate the Card payment method in the list of available methods.
3. Toggle the switch next to **Card** to enable it.
4. Click **Publish settings** to apply your changes.

### Step 4: Get Your API Credentials

To complete the setup and integrate Yuno into your application, you will need to obtain your API credentials from the Yuno dashboard. These credentials are specific to the Sandbox environment:

1. Navigate to the **Developers** section in the dashboard sidebar.
2. In the Developer Tools section, locate your API credentials:
   * **Public API Key**: Used for client-side SDK initialization.
   * **Secret API Key**: Used for server-side API calls.

Having completed these dashboard setup steps and obtained your API credentials, you are now ready to proceed with creating your first payment using the API.