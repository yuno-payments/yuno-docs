---
title: Seamless SDK (Payment Web) (COPY)
deprecated: false
hidden: true
metadata:
  robots: index
---
Follow this step-by-step guide to implement and enable Yuno's Seamless Web SDK payment functionality in your application.

<br />

\<HTMLBlock>\{\`

\<body>
&#x20; \<div class="infoBlockContainer">
&#x20;   \<div class="verticalLine">\</div>
&#x20;   \<div>
&#x20;     \<h3>Recommended SDKs\</h3>
&#x20;     \<div class="contentContainer">
&#x20;       \<p>
&#x20;        We recommend using the \<a href="full-checkout-sdk">Web Full SDK\</a> or the \<a href="lite-checkout-sdk">Web Lite SDK\</a> for a smooth integration experience. These options provide a complete solution with built-in forms and validation.
&#x20;       \</p>
&#x20;     \</div>
&#x20;   \</div>
&#x20; \</div>
\</body>
\`}\</HTMLBlock>



<br />

## Seamless Full SDK updates (v1.2)

<br />

The new Seamless Full SDK flow is similar to Seamless Lite, but with the following differences:

* The Full version is responsible for listing all available payment methods.
  * Payment buttons (such as PayPal) are displayed in a separate list from other payment methods.
    <br />

## Step 3: Start the checkout process

<br />

Choose the integration method based on your SDK version:

* **v1.2 (Seamless Full):**\
  Use this if you are integrating with SDK v1.2 or later. This version introduces the new `startSeamlessCheckout` flow, which automatically lists all payment methods and separates payment buttons (like PayPal) from other methods.
  * **Before v1.2 (Seamless Lite/Legacy):**\
    Use this if you are on an earlier version of the SDK. The `startCheckout` method is used, and you have more control over which payment methods are displayed and how they are presented.
    <br />
    \<HTMLBlock>\{\`

\<style>
&#x20; .tabs \{
&#x20;   display: flex;
&#x20;   border-bottom: 2px solid #ddd;
&#x20;   margin-bottom: 20px;
&#x20; }
&#x20; input\[type="radio"] \{ display: none; }
&#x20; label \{
&#x20;   text-decoration: none;
&#x20;   color: #333;
&#x20;   padding: 10px 20px;
&#x20;   transition: all 0.3s ease;
&#x20;   font-size: 16px;
&#x20;   margin-right: 10px;
&#x20;   border-bottom: 2px solid transparent;
&#x20;   cursor: pointer;
&#x20; }
&#x20; label:hover, label:focus \{ color: #000; }
&#x20; .tab-content \{ display: none; }
&#x20; \#v12:checked\~.tab-content#v12,
&#x20; \#legacy:checked\~.tab-content#legacy \{ display: block; }
&#x20; \#v12:checked\~.tabs label\[for="v12"],
&#x20; \#legacy:checked\~.tabs label\[for="legacy"] \{
&#x20;   color: #000;
&#x20;   border-bottom: 2px solid #513CE1;
&#x20; }
\</style>
\<body>
&#x20; \<input type="radio" id="v12" name="tabs" checked>
&#x20; \<input type="radio" id="legacy" name="tabs">
&#x20; \<div class="tabs">
&#x20;   \<label for="v12">v1.2 (Seamless Full)\</label>
&#x20;   \<label for="legacy">Before v1.2 (Seamless Lite/Legacy)\</label>
&#x20; \</div>
&#x20; \<div class="tab-content" id="v12">
&#x20;   \`\`\`javascript
&#x20;   await yuno.startSeamlessCheckout(\{
&#x20;     checkoutSession,
&#x20;     elementSelector: "#root",
&#x20;     countryCode,
&#x20;     language: initialSetup.language,
&#x20;     yunoPaymentResult(data) \{
&#x20;       console.log("yunoPaymentResult", data);
&#x20;     },
&#x20;     yunoError: (error) => \{
&#x20;       console.log("There was an error", error);
&#x20;     },
&#x20;     onLoading: (data) => \{
&#x20;       console.log("onLoading", data);
&#x20;     }
&#x20;   });
&#x20;  &#x20;
&#x20;   await yuno.mountSeamlessCheckout();
&#x20;   \`\`\`
&#x20; \</div>
&#x20; \<div class="tab-content" id="legacy">
&#x20;   \`\`\`javascript
&#x20;   yuno.startCheckout(\{
&#x20;     checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
&#x20;     elementSelector: "#root",
&#x20;     country\_code: "US",
&#x20;     language: "en",
&#x20;     showLoading: true,
&#x20;     issuersFormEnable: true,
&#x20;     showPaymentStatus: true,
&#x20;     onLoading: (args) => console.log(args),
&#x20;     renderMode: \{
&#x20;       type: "modal",
&#x20;       elementSelector: \{
&#x20;         apmForm: "#form-element",
&#x20;         actionForm: "#action-form-element"
&#x20;       }
&#x20;     },
&#x20;     card: \{
&#x20;       type: "extends",
&#x20;       styles: "",
&#x20;       cardSaveEnable: false,
&#x20;       texts: \{}
&#x20;     },
&#x20;     texts: \{},
&#x20;     async yunoCreatePayment(oneTimeToken, tokenWithInformation) \{
&#x20;       await createPayment(\{ oneTimeToken, checkoutSession });
&#x20;       yuno.continuePayment(\{ showPaymentStatus: true });
&#x20;     },
&#x20;     yunoPaymentMethodSelected(data) \{
&#x20;       console.log("Payment method selected:", data);
&#x20;     },
&#x20;     yunoPaymentResult(data) \{
&#x20;       console.log("Payment result:", data);
&#x20;       yuno.hideLoader();
&#x20;     },
&#x20;     yunoError(error, data) \{
&#x20;       console.error("An error occurred:", error);
&#x20;       yuno.hideLoader();
&#x20;     }
&#x20;   });
&#x20;   \`\`\`
&#x20; \</div>
\</body>
\`}\</HTMLBlock>

\*\*Parameters:\*\*
\- \`checkoutSession\`: The current payment session.
\- \`elementSelector\`: The HTML element where the SDK will be mounted.
\- \`countryCode\`: Country code (CO, BR, CL, PE, EC, UR, MX).
\- \`language\`: Language for the payment forms (\`es\`, \`en\`, \`pt\`).
\- \`