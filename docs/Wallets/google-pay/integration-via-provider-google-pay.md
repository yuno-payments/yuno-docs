---
title: Integration Via Provider
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
This page presents the procedures to connect and provide Google Pay™ as a payment option for your customers using the integration via a provider. Yuno uses Google integration for each provider without accessing card data in this integration. Each integration can only be used with the selected provider with this option.

## Requirements

Before starting the Google Pay integration process, you need to ensure it's in your country. Use the [Google Pay support page](https://support.google.com/googlepay/answer/12429287?hl=en\&visit_id=638246798082960127-380022514\&rd=1#zippy=) to check if it supports the countries where you operate.

Afterward, you must check the available processors using the [participating processors](https://developers.google.com/pay/api/) on Google's page.

All merchants must adhere to the Google Pay APIs [Acceptable Use Policy](https://payments.developers.google.com/terms/aup) and accept the terms defined in the [Google Pay API Terms of Service](https://payments.developers.google.com/terms/sellertos).

## Providers

To incorporate Google Pay into your system using Yuno, select one provider supporting this payment method first.

You must have credentials to connect to the selected provider using [Yuno dashboard](https://dashboard.y.uno/) before integrating Google Pay.

## Integration

You need to cover some steps to integrate Google Pay into your system using Yuno.

1. First, you will review Google’s approval process for [Android devices](https://developers.google.com/pay/api/android/overview) or [Google Pay on the Web](https://developers.google.com/pay/api/web/overview).
   1. Start by checking the Terms of Service and Acceptable Use Policy.
   2. Complete the tutorials and integration checklist.
   3. Complete the integration checklist for [Android](https://developers.google.com/pay/api/android/guides/test-and-deploy/integration-checklist) or [Web](https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist) before requesting production credentials from Google.
   4. Finally, you will request your production access.
2. Get the developer credentials from the provider you choose to start using with Yuno.

> 📘 Adyen Connection
>
> For Adyen, merchants need to create a [testing account](https://www.adyen.com/signup) and get a **Merchant Account** and a **x-api-key**.

1. Within the [Yuno dashboard](https://dashboard.y.uno/), select the **Connections** tab. Find the provider you choose and click **Connect**. Fulfill the side panel fields with your credentials. Below, you will find examples of connecting panels for Adyen and Cielo.

<Image align="center" width="700px" src="https://files.readme.io/b3b39cd-Group_2.png" />

4. Create a route in Yuno's dashboard using the gateway you have connected. Access the [Configure dynamic routing](ref:configure-dynamic-routing) guide page for further information on creating routes.

## Enable and test Google Pay with Yuno

After performing the integration on Yuno, you can enable Google Pay with Yuno and perform integration tests using the following steps:

1. First, integrate [Yuno's SDK](doc:android-sdk-integration) into your app to ensure a smooth connection between your application and Yuno's platform.
2. Create a Google Wallet Test Account:
   1. Visit the [Google Wallet Test Account Sign-In](https://accounts.google.com/InteractiveLogin/signinchooser?continue=https%3A%2F%2Fpay.google.com%2Fbusiness%2Fconsole%2F\&followup=https%3A%2F%2Fpay.google.com%2Fbusiness%2Fconsole%2F\&osid=1\&passive=1209600\&ifkv=AeDOFXjl_LLJZyuykU06uleha4p7uSXJNnLCv_n2jshX6QVJYCy9AKq3K28mIfpgyfS2NDHfimnAFg\&flowName=GlifWebSignIn\&flowEntry=ServiceLogin) page.
   2. If you don't have a Google account, you'll need to create one to proceed.
   3. Once signed in, you'll be redirected to the Google Wallet business console.
3. Access the Google Wallet API Section:
   1. In the Google Wallet business console, navigate to the section related to API management or integration. It is found in the developer or integration settings.
4. Select **Create a Pass** to Enable **Demo Mode**:
   1. Within the Google Wallet API section, locate the option labeled  **Create a Pass**.
   2. Click on this option to enable **Demo mode**. This mode allows you to simulate and test pass creation and interactions without making real transactions.

<Image align="center" width="600px" src="https://files.readme.io/fbc51b7-6847ef9-demo_mode.png" />

5. Download the Google Wallet App from the Play Store.
6. Navigate through the payment flow to test the integration.

Following these steps, you can ensure that Google Pay is integrated into your app and works as expected before making it available for your customers.