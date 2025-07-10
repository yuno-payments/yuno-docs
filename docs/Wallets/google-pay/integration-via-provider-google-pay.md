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
This page explains how to offer Google Pay™ as a payment option to your customers by integrating it through a supported provider. With this approach, Yuno leverages each provider’s native Google Pay integration, ensuring that card data is never accessed or stored by Yuno. Each integration is specific to the provider you select.

## Requirements

Before you begin, make sure Google Pay is available in the countries where you operate. You can verify this on the [Google Pay support page](https://support.google.com/googlepay/answer/12429287?hl=en).

Next, review the list of [participating processors](https://developers.google.com/pay/api/) on Google’s site to confirm which processors are available for your region.

All merchants must comply with the Google Pay APIs [Acceptable Use Policy](https://payments.developers.google.com/terms/aup) and accept the [Google Pay API Terms of Service](https://payments.developers.google.com/terms/sellertos).

## Providers

To add Google Pay to your system using Yuno, first select a provider that supports this payment method.

Before integrating Google Pay, you must have valid credentials for your chosen provider and connect it in the [Yuno dashboard](https://dashboard.y.uno/).

## Integration

To integrate Google Pay into your system using Yuno, follow the steps below. This process ensures a secure and seamless connection between your application, your chosen provider, and Yuno.

1. Review Google’s approval process for [Android devices](https://developers.google.com/pay/api/android/overview) or [Google Pay on the Web](https://developers.google.com/pay/api/web/overview).
   1. Check the Terms of Service and Acceptable Use Policy.
   2. Complete the official tutorials and integration checklist.
   3. Finish the integration checklist for [Android](https://developers.google.com/pay/api/android/guides/test-and-deploy/integration-checklist) or [Web](https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist) before requesting production credentials from Google.
   4. Request production access from Google.
2. Obtain developer credentials from your selected provider to use with Yuno.

> 📘 Adyen connection
>
> For Adyen, you need to create a [testing account](https://www.adyen.com/signup) and obtain a **Merchant Account** and a **x-api-key**.

3. In the [Yuno dashboard](https://dashboard.y.uno/), go to the **Connections** tab. Find your provider and click **Connect**. Enter your credentials in the side panel. Below are examples of connection panels for Adyen and Cielo.

<Image align="center" width="700px" src="https://files.readme.io/b3b39cd-Group_2.png" />

4. Create a route in the Yuno dashboard using the gateway you have connected. For more details, see the [configure dynamic routing](ref:configure-dynamic-routing) guide.

## Enable and test Google Pay with Yuno

After completing the integration steps, you can enable and test Google Pay in your application. Follow these steps to verify your setup:

1. Integrate [Yuno's SDK](doc:android-sdk-integration) into your app to connect your application with Yuno's platform.
2. Create a Google Wallet test account:
   1. Go to the [Google Wallet Test Account Sign-In](https://accounts.google.com/InteractiveLogin/signinchooser?continue=https%3A%2F%2Fpay.google.com%2Fbusiness%2Fconsole%2F\&followup=https%3A%2F%2Fpay.google.com%2Fbusiness%2Fconsole%2F\&osid=1\&passive=1209600\&ifkv=AeDOFXjl_LLJZyuykU06uleha4p7uSXJNnLCv_n2jshX6QVJYCy9AKq3K28mIfpgyfS2NDHfimnAFg\&flowName=GlifWebSignIn\&flowEntry=ServiceLogin) page.
   2. If you do not have a Google account, create one to proceed.
   3. After signing in, you will be redirected to the Google Wallet business console.
3. Access the Google Wallet API section:
   1. In the business console, navigate to the API management or integration section (usually found in developer or integration settings).
4. Enable demo mode by creating a pass:
   1. In the Google Wallet API section, find the **Create a Pass** option.
   2. Click this option to enable **Demo mode**. Demo mode allows you to simulate and test pass creation and interactions without real transactions.

<Image align="center" width="600px" src="https://files.readme.io/fbc51b7-6847ef9-demo_mode.png" />

5. Download the Google Wallet app from the Play Store.
6. Go through the payment flow in your app to test the integration.

By following these steps, you can ensure that Google Pay is properly integrated and functioning in your app before making it available to your customers.