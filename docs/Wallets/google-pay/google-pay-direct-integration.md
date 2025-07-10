---
title: Direct Integration
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
This page explains how to connect and offer Google Pay™ as a payment option to your customers using the direct integration method.

## Requirements

Before you begin integrating Google Pay with Yuno, make sure that Google Pay is supported in your country. You can verify this on the [Google Pay support page](https://support.google.com/googlepay/answer/12429287?hl=en).

Next, review the list of [participating processors](https://developers.google.com/pay/api/) on Google’s site to confirm which processors are available for your region.

To use Google Pay, all merchants must:

- Comply with the Google Pay APIs [Acceptable Use Policy](https://payments.developers.google.com/terms/aup).
- Accept the [Google Pay API Terms of Service](https://payments.developers.google.com/terms/sellertos).
- Register with the [Google Pay Business Console](https://pay.google.com/business/console) to obtain a Google merchant ID.

After registering, complete the Google Pay and Wallet Console configuration:

1. Complete your **Business profile** in the console.
2. In **Google Pay API** > **Integrate with your website**, review and provide the following:
   - **Your website**: The domain must exactly match your hosted checkout page (with or without "www").
   - **Integration type**: Select **GATEWAY**.
3. Prepare and submit the following screenshots:
   - **Payment method screen**: Your hosted checkout page.
   - **Google Pay API payment screen**: The Google Pay payment sheet (shown after clicking the GPay button).
   - **Post-purchase screen**: The transaction confirmation page.
   - Submit these screenshots, indicate that you have submitted the request, and share your merchant ID (BCR).

After you receive your assigned merchant ID, use it to configure the Google Pay connection in the Yuno dashboard.

## Integration

Follow the steps below to integrate Google Pay with Yuno using the direct integration method.

1. In the [Yuno dashboard](https://dashboard.y.uno/), go to the **Connections** tab. Find **Google Pay** and click **Connect**. In the side panel, enter your credentials, choose a name for the connection, and enter the merchant ID you obtained from the [Google Pay Business Console](https://pay.google.com/business/console) in the **Merchant ID** field.

<Image align="center" src="https://files.readme.io/2fee3d1-google-pay1.png" />

2. Create a route in the Yuno dashboard using the payment processor you want to use for Google Pay transactions. For more details, see the [configure dynamic routing](ref:configure-dynamic-routing) guide.
3. Integrate [Yuno’s SDK](https://docs.y.uno/docs/android-sdk-integrations) into your app to connect your application with Yuno’s platform. For an example, see the [Yuno SDK for Android](https://github.com/yuno-payments/yuno-sdk-android).
   - **Authorization methods**: Yuno supports all standard authorization methods (purchase, authorization, capture). The availability of each method depends on your selected provider.
4. Enable Google Pay as a payment method in your [Yuno checkout builder](https://docs.y.uno/docs/checkout-builder) so customers can use it during checkout.

Once you complete these steps, Google Pay will be available to your customers in the Yuno checkout. Shoppers can select Google Pay and authorize payments using the familiar Google Pay interface. Yuno securely handles the payment token received from Google and processes the transaction through your configured payment processor. All Google Pay transactions will appear in your Yuno dashboard alongside your other payment methods, giving you a unified view of your payment operations.

## Enable and test Google Pay with Yuno

Before making Google Pay available to your customers, you should enable and test your integration to ensure everything works as expected. Follow the steps below to set up a test environment and verify your Google Pay integration with Yuno.

1. **Create a Google Wallet test account**
   1. Go to the [Google Wallet Test Account Sign-In](https://accounts.google.com/InteractiveLogin/signinchooser?continue=https%3A%2F%2Fpay.google.com%2Fbusiness%2Fconsole%2F\&followup=https%3A%2F%2Fpay.google.com%2Fbusiness%2Fconsole%2F\&osid=1\&passive=1209600\&ifkv=AeDOFXjl_LLJZyuykU06uleha4p7uSXJNnLCv_n2jshX6QVJYCy9AKq3K28mIfpgyfS2NDHfimnAFg\&flowName=GlifWebSignIn\&flowEntry=ServiceLogin) page.
   2. If you do not have a Google account, create one to continue.
   3. After signing in, you will be redirected to the Google Wallet Business Console.

2. **Access the Google Wallet API section**
   1. In the Google Wallet Business Console, navigate to the API management or integration section (typically found under developer or integration settings).

3. **Enable demo mode**
   1. In the API section, locate the option labeled **Create a Pass**.
   2. Click this option to enable **Demo mode**. Demo mode allows you to simulate and test pass creation and interactions without processing real transactions.

<Image align="center" width="600px" src="https://files.readme.io/fbc51b7-6847ef9-demo_mode.png" />

4. **Download the Google Wallet app**
   - Install the [Google Wallet app](https://play.google.com/store/apps/details?id=com.google.android.apps.walletnfcrel\&hl=en\&gl=US) from the Google Play Store.

5. **Test the payment flow**
   - Go through the payment flow in your integration to verify that Google Pay is working as expected.

By completing these steps, you can confirm that your Google Pay integration with Yuno is functioning correctly before launching it to your customers.

## Go live

Once you have successfully tested your integration, you are ready to move to production. Request [Google production access](https://developers.google.com/pay/api/web/guides/test-and-deploy/request-prod-access) and contact your Technical Account Manager. The Yuno team will help review your configuration and confirm you are ready to go live.

## Implementation details

This section covers important considerations and best practices for integrating Google Pay with Yuno using the direct integration method.

- **3D Secure (3DS) for `PAN_ONLY` credentials**: If Google Pay returns a `PAN_ONLY` credential (a card stored in the user's Google account), Yuno will automatically manage the 3D Secure authentication flow if 3DS is enabled for your account. On your frontend, ensure that your Google Pay API request includes `PAN_ONLY` in the `allowedAuthMethods` array.

- **Gateway and gatewayMerchantId configuration**: When registering in the [Google Pay Business Console](https://pay.google.com/business/console), go to **Google Pay API** > **Integrate with your website** and set the **Integration type** to **GATEWAY**. Use the `Merchant ID` from the Google Pay Business Console in the "Merchant ID" field when setting up the Google Pay connection in the Yuno dashboard. In your Google Pay API configuration, set `gateway` to `yuno` and use your assigned Merchant ID as the `gatewayMerchantId`.

- **Authorization methods**: Yuno supports standard authorization methods, including purchase, authorization, and capture. The availability of each method depends on your selected payment processor and the acquiring bank for each country and payment.

- **Billing address requirements**: If your payment processing requires the customer's billing address (for example, for AVS checks), configure this in your Google Pay API request. Google provides `BillingAddressParameters` to specify the required level of detail (such as `MIN` or `FULL`). See [Google's documentation](https://developers.google.com/pay/api/web/reference/request-objects#BillingAddressParameters) for more information. Only request billing address details if necessary, as this can increase checkout friction for your customers.

- **Transaction data and payment cryptography**: Integrate Yuno's SDKs (Android, iOS, or Web) into your application. When a customer selects Google Pay, Yuno's SDK interacts with the Google Pay API and securely receives the encrypted payment data (payment token) from Google. Your app should pass this token to your backend server, which then uses Yuno's server-side APIs to submit the token for payment processing. Yuno handles decryption and processing with the payment processor.


## Additional information

This section provides helpful resources and details to support your Google Pay integration with Yuno.

- If you have questions about the integration process, contact Yuno support or refer to the following official Google Pay documentation:
  - [Web documentation](https://developers.google.com/pay/api/web/guides/setup) and [integration checklist](https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist)
  - [Android documentation](https://developers.google.com/pay/api/android/overview) and [integration checklist](https://developers.google.com/pay/api/android/guides/test-and-deploy/integration-checklist)

- To ensure correct use of the Google Pay brand in your website or app, review the official brand guidelines:
  - [Web brand guidelines](https://developers.google.com/pay/api/web/guides/brand-guidelines)
  - [Android brand guidelines](https://developers.google.com/pay/api/android/guides/brand-guidelines)

- **Supported card networks**:
  - Globally supported networks: Amex, Discover, JCB, Mastercard, and Visa.
  - In Brazil: Visa, Electron, Mastercard, Maestro, Elo, and Elo_Debit.