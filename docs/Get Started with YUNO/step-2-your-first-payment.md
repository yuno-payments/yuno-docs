---
title: Create Your First Payment With SDK
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
  pages:
    - type: basic
      slug: choose-the-right-integration-for-you
      title: Choose The Right Integration For You
    - type: basic
      slug: build-your-integration
      title: Build Your Integration
---
This guide shows you how to create your first payment using the Yuno SDK. You'll learn how to:

* Set up and run the example project
* Make a test payment using the SDK

The Yuno SDK enables you to integrate payment methods into your web application and process payments securely. By following this guide, you'll have your first payment up and running in under 5 minutes.

### Step 1: Install prerequisites

Before getting started, ensure you have the following installed on your system:

* Git - Required for downloading the project. If you haven't used Git before, follow the [Git installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* Node.js - Required for running the project. If you haven't used Node.js before, download it from the [official Node.js website](https://nodejs.org/en/download)

### Step 2: Download the project

Download the [example project](https://github.com/yuno-payments/yuno-sdk-web/archive/refs/heads/main.zip) or clone the [GitHub repository](https://github.com/yuno-payments/yuno-sdk-web). The project contains Yuno's Web SDK and a sample frontend implementation.

```shell
> git clone https://github.com/yuno-payments/yuno-sdk-web.git
> cd yuno-sdk-web
```

> 📘 SDK Integration Example
>
> Yuno provides a ready-to-use application built with the Web SDK. Explore [this project](https://github.com/yuno-payments/yuno-sdk-web) to see how fast and easy it is to integrate with Yuno.


### Step 3: Set up environment variables

To authenticate with the Yuno API, you need to configure your credentials in the project. Follow these steps:

1. Open the `.env` file in the root folder
2. Add the following environment variables with your credentials from the dashboard's Developers section:
   * `ACCOUNT_CODE`(will display as account\_id in the dashboard) 
   * `PUBLIC_API_KEY` 
   * `PRIVATE_SECRET_KEY`
3. Save the file

```
ACCOUNT_CODE=your_account_code
PUBLIC_API_KEY=your_public_api_key
PRIVATE_SECRET_KEY=your_private_secret_key
```

### Step 4: Run the project

Navigate to the project folder and install the required Node.js dependencies by running:

```shell
> npm install
```

Then, run the project with the following command: 

```shell
> npm start
```

To access the running application, open your browser and go to:

```shell
http://localhost:8080
```

### Step 5: Make your first payment

After accessing the running project in your browser, you'll see a basic checkout page displaying the Card payment method configured in [Set Up Your Account](doc:step-1-set-up-your-account). To create your first successful payment:

1. Select the **Card** payment option
2. Enter the test card information provided below

* **Cardholder name**: Harry Potter
* **Card Number**: 4242 4242 4242 4242
* **Expiration Date**: 09/29
* **CVV**: 123

### Step 6: View payment details in the Dashboard

1. After submitting the payment, wait a few seconds for it to process
2. Go to the [Payments](https://dashboard.y.uno/payments) section in your dashboard
3. Find your test payment in the list
4. Click the eye icon to view the full payment details

Congratulations! You've successfully created your first payment with Yuno. Check out our other guides to learn more about integrating additional features.
