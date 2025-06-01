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
This page provides instructions for connecting and offering Google Pay as a payment option to your customers using the Direct integration.

## Requirements

Before starting the Google Pay integration process, ensure that Google Pay is available in your country. Use the [Google Pay support page](https://support.google.com/googlepay/answer/12429287?hl=en) to verify support for your operating countries.

Next, check which processors are available by reviewing the [participating processors](https://developers.google.com/pay/api/) on Google's site.

All merchants must comply with the Google Pay APIs [Acceptable Use Policy](https://payments.developers.google.com/terms/aup), accept the [Google Pay API Terms of Service](https://payments.developers.google.com/terms/sellertos), and register with the [Google Pay Business Console](https://pay.google.com/business/console) to obtain a Google merchant ID. Complete the Google Pay and Wallet Console configuration by following these steps:

1. Complete the "Business Profile".
2. Review the information required in "Google Pay API" > "Integrate with your website":
   1. Your website – This must exactly match the domain of your hosted checkout page (with or without "www").
   2. Integration type – "GATEWAY".
   3. Screenshots:
      1. Payment method screen – Your hosted checkout page.
      2. Google Pay API payment screen – The Google Pay payment sheet (shown after clicking the GPay button).
      3. Post-purchase screen – Transaction confirmation page.
   4. Submit the screenshots, indicate that you have submitted the request, and share the merchantId (BCR).\
      Use the assigned Merchant ID to configure the Google Pay connection in the Yuno dashboard.

## Integration

To integrate Google Pay with Yuno, follow these steps:

1. In the [Yuno dashboard](https://dashboard.y.uno/), go to the Connections tab. Find Google Pay and click Connect. Enter your credentials in the side panel. Choose a name for the connection and use the merchant ID obtained from the [Google Pay Business Console](https://pay.google.com/business/console) in the Merchant ID field.

<Image align="center" src="https://files.readme.io/2fee3d1-google-pay1.png" />

2. Create a route in Yuno's dashboard using the processor you want for Google Pay payments. See the [Configure dynamic routing](ref:configure-dynamic-routing) guide for more information.
3. Integrate [Yuno's SDK](https://docs.y.uno/docs/android-sdk-integrations) into your app to ensure a smooth connection between your application and Yuno's platform. [Example](https://github.com/yuno-payments/yuno-sdk-android).
   1. **Authorization methods available**: Yuno supports all authorization methods (purchase, authorization, capture), but availability depends on each provider.
4. Enable Google Pay as a payment method in your [Yuno Checkout builder](https://docs.y.uno/docs/checkout-builder) so customers can use it during checkout.

Once these integration steps are complete, Google Pay will be seamlessly offered to your customers via the Yuno checkout. Customers will be able to select Google Pay and authorize payments using their familiar Google Pay interface. Yuno then securely handles the payment token received from Google, processing the transaction through your configured payment processor. All Google Pay transactions will be visible and manageable within your Yuno dashboard alongside your other payment methods, providing a unified view of your operations.

## Enable and Test Google Pay with Yuno

After integrating, you can enable and test Google Pay with Yuno as follows:

1. Create a Google Wallet Test Account:
   1. Visit the [Google Wallet Test Account Sign-In](https://accounts.google.com/InteractiveLogin/signinchooser?continue=https%3A%2F%2Fpay.google.com%2Fbusiness%2Fconsole%2F\&followup=https%3A%2F%2Fpay.google.com%2Fbusiness%2Fconsole%2F\&osid=1\&passive=1209600\&ifkv=AeDOFXjl_LLJZyuykU06uleha4p7uSXJNnLCv_n2jshX6QVJYCy9AKq3K28mIfpgyfS2NDHfimnAFg\&flowName=GlifWebSignIn\&flowEntry=ServiceLogin) page.
   2. If you do not have a Google account, create one to proceed.
   3. Once signed in, you will be redirected to the Google Wallet business console.
2. Access the Google Wallet API Section:
   1. In the Google Wallet business console, navigate to the API management or integration section (usually under developer or integration settings).
3. Select **Create a Pass** to enable **Demo Mode**:
   1. In the Google Wallet API section, find the option labeled **Create a Pass**.
   2. Click this option to enable **Demo mode**. This allows you to simulate and test pass creation and interactions without real transactions.

<Image align="center" width="600px" src="https://files.readme.io/fbc51b7-6847ef9-demo_mode.png" />

4. Download the [Google Wallet App](https://play.google.com/store/apps/details?id=com.google.android.apps.walletnfcrel\&hl=en\&gl=US) from the Play Store.
5. Go through the payment flow to test the integration.

By following these steps, you can ensure Google Pay is integrated and working as expected before making it available to your customers.

## Go Live

After completing all integration steps in the testing environment, request [Google Production Access](https://developers.google.com/pay/api/web/guides/test-and-deploy/request-prod-access) and contact your Technical Account Manager. The Yuno team will help verify your configuration and confirm you are ready to go live.

## Implementation Details

Key details for your Google Pay integration with Yuno:

* **3D Secure (3DS) for`PAN_ONLY` Credentials**: If Google Pay returns a `PAN_ONLY` credential (a card stored in the user's Google account), Yuno will automatically handle the 3D Secure authentication flow if 3DS is enabled for your account and the transaction. This is similar to 3DS for standard card payments.
* **Gateway and GatewayMerchantID Configuration**: When registering with the [Google Pay Business Console](https://pay.google.com/business/console), ensure that under "Google Pay API" > "Integrate with your website", the "Integration type" is set to "GATEWAY". The `Merchant ID` from the Google Pay Business Console is used in the "Merchant ID" field when setting up the Google Pay connection in the Yuno dashboard.
* **Authorization Methods**: Yuno supports standard authorization methods (purchase, authorization, capture). Availability depends on the payment processor and acquiring bank for each country and payment.
* **Billing Address Requirements**: If your payment processing requires the customer's billing address (e.g., for AVS checks), configure this in your Google Pay API request. Google provides `BillingAddressParameters` to specify the required detail (e.g., MIN or FULL). See [Google's documentation](https://developers.google.com/pay/api/web/reference/request-objects#BillingAddressParameters). Only request billing address details if necessary, as this can increase checkout friction.
* **Transaction Data and Payment Cryptography**: Merchants integrate Yuno's SDKs (Android, iOS, Web) into their applications. When a customer chooses Google Pay, Yuno's SDK interacts with the Google Pay API and securely receives the encrypted payment data (payment token) from Google. This token is passed from your app to your backend server, which then uses Yuno's server-side APIs to submit the token for payment processing. Yuno handles decryption and processing with the payment processor.

## Additional Information

* For further questions about the integration process, contact Yuno support or consult:
  * [Web documentation](https://developers.google.com/pay/api/web/guides/setup) and [integration checklist](https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist)
  * [Android documentation](https://developers.google.com/pay/api/android/overview) and [integration checklist](https://developers.google.com/pay/api/android/guides/test-and-deploy/integration-checklist)
* Google provides brand guides for including the Google Pay brand in your website or app:
  * [Web](https://developers.google.com/pay/api/web/guides/brand-guidelines)
  * [Android](https://developers.google.com/pay/api/android/guides/brand-guidelines)
* **Card networks supported**:
  * The card networks supported worldwide are AMEX, DISCOVER, JCB, MASTERCARD, and VISA. For Brazil, supported networks are VISA, ELECTRON, MASTERCARD, MAESTRO, ELO, and ELO\_DEBIT.
