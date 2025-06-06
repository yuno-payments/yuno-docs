---
title: Seamless SDK (Payment Web) (COPY)
deprecated: false
hidden: true
metadata:
  robots: index
---
Follow this step-by-step guide to implement and enable Yuno's Seamless Web SDK payment functionality in your application.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Recommended SDKs</h3>
      <div class="contentContainer">
        <p>
         We recommend using the <a href="full-checkout-sdk">Web Full SDK</a> or the <a href="lite-checkout-sdk">Web Lite SDK</a> for a smooth integration experience. These options provide a complete solution with built-in forms and validation.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Seamless Full SDK updates (v1.2)

The new Seamless Full SDK flow is similar to Seamless Lite, but with the following differences:

* The Full version is responsible for listing all available payment methods.
* Payment buttons (such as PayPal) are displayed in a separate list from other payment methods.

## Step 3: Start the checkout process

Choose the integration method based on your SDK version:

* **v1.2 (Seamless Full):**\
  Use this if you are integrating with SDK v1.2 or later. This version introduces the new `startSeamlessCheckout` flow, which automatically lists all payment methods and separates payment buttons (like PayPal) from other methods.
* **Before v1.2 (Seamless Lite/Legacy):**\
  Use this if you are on an earlier version of the SDK. The `startCheckout` method is used, and you have more control over which payment methods are displayed and how they are presented.

<Tabs>
  <Tab label="v1.2 (Seamless Full)">
    ```javascript
    await yuno.startSeamlessCheckout({
      checkoutSession,
      elementSelector: "#root",
      countryCode,
      language: initialSetup.language,
      yunoPaymentResult(data) {
        console.log("yunoPaymentResult", data);
      },
      yunoError: (error) => {
        console.log("There was an error", error);
      },
      onLoading: (data) => {
        console.log("onLoading", data);
      }
    });

    await yuno.mountSeamlessCheckout();
    ```
  </Tab>

  <Tab label="Before v1.2 (Seamless Lite/Legacy)">
    ```javascript
    yuno.startCheckout({
      checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
      elementSelector: "#root",
      country_code: "US",
      language: "en",
      showLoading: true,
      issuersFormEnable: true,
      showPaymentStatus: true,
      onLoading: (args) => console.log(args),
      renderMode: {
        type: "modal",
        elementSelector: {
          apmForm: "#form-element",
          actionForm: "#action-form-element"
        }
      },
      card: {
        type: "extends",
        styles: "",
        cardSaveEnable: false,
        texts: {}
      },
      texts: {},
      async yunoCreatePayment(oneTimeToken, tokenWithInformation) {
        await createPayment({ oneTimeToken, checkoutSession });
        yuno.continuePayment({ showPaymentStatus: true });
      },
      yunoPaymentMethodSelected(data) {
        console.log("Payment method selected:", data);
      },
      yunoPaymentResult(data) {
        console.log("Payment result:", data);
        yuno.hideLoader();
      },
      yunoError(error, data) {
        console.error("An error occurred:", error);
        yuno.hideLoader();
      }
    });
    ```
  </Tab>
</Tabs>

**Parameters:**

* `checkoutSession`: The current payment session.
* `elementSelector`: The HTML element where the SDK will be mounted.
* `countryCode`: Country code (CO, BR, CL, PE, EC, UR, MX).
* `language`: Language for the payment forms (`es`, `en`, `pt`).
* \`