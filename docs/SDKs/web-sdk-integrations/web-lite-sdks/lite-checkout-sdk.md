---
title: Lite SDK (Payment Web)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Lite SDK (Payment)
  description: >-
    Here, you will find an outline of the step-by-step process to enable the
    Lite SDK functionalities within your system.
  robots: index
next:
  description: ''
---
Welcome to the Yuno Lite SDK (Web) guide. This guide will help you get started with Yuno's lightweight payment solution. Whether you're integrating for the first time or updating to the latest version, you'll find all the information you need to create a seamless payment experience for your users.

<br />

\<HTMLBlock>\{\`

\<style>
&#x20; .tabs \{
&#x20;   display: flex;
&#x20;   border-bottom: 2px solid #ddd;
&#x20;   margin-bottom: 20px;
&#x20; }
&#x20; input\[type="radio"] \{
&#x20;   display: none;
&#x20; }
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
&#x20; label:hover,
&#x20; label:focus \{
&#x20;   color: #000;
&#x20; }
&#x20; .tab-content \{
&#x20;   display: none;
&#x20; }
&#x20; \#liteSDKv10:checked\~.tab-content#liteSDKv10,
&#x20; \#liteSDKv11:checked\~.tab-content#liteSDKv11 \{
&#x20;   display: block;
&#x20; }
&#x20; \#liteSDKv10:checked\~.tabs label\[for="liteSDKv10"],
&#x20; \#liteSDKv11:checked\~.tabs label\[for="liteSDKv11"] \{
&#x20;   color: #000;
&#x20;   border-bottom: 2px solid #513CE1;
&#x20; }
\</style>
\<body>
&#x20; \<div class="infoBlockContainer ">
&#x20;   \<div class="verticalLine">\</div>
&#x20;   \<div>
&#x20;     \<h3>Lite SDK v1.1 release\</h3>
&#x20;     \<div class="contentContainer">
&#x20;       \<p>
&#x20;         v1.1 brings improved performance, security, and user experience. For details, \<a href="https\://docs.y.uno/docs/yuno-web-sdk-v11">see the Web SDK v1.1 page\</a>.
&#x20;       \</p>
&#x20;     \</div>
&#x20;   \</div>
&#x20; \</div>
&#x20; \<h2>Choose your integration method\</h2>
&#x20; \<ul>
&#x20;   \<li>\<b>Method 1 (HTML):\</b> Add a script tag to your HTML. Easiest for basic sites and prototypes.\</li>
&#x20;   \<li>\<b>Method 2 (Dynamic JavaScript):\</b> Load the SDK programmatically for more control.\</li>
&#x20;   \<li>\<b>Method 3 (NPM):\</b> Use our NPM package in modern JavaScript apps. Best for dependency management and TypeScript support.\</li>
&#x20; \</ul>
&#x20; \<h3>1. Add the SDK script directly in HTML\</h3>
&#x20; \<pre>\<code>\&lt;!-- Add the event listener before loading the SDK --\&gt;
\&lt;script\&gt;
&#x20; window\.addEventListener('yuno-sdk-ready', async () =\&gt; \{
&#x20;   const yuno = await Yuno.initialize('PUBLIC\_API\_KEY');
&#x20;   // Continue with your integration
&#x20; });
\&lt;/script\&gt;
\&lt;!-- Then load the SDK --\&gt;
\&lt;script defer src="https\://sdk-web.y.uno/v1.1/main.js"\&gt;\&lt;/script\&gt;
\</code>\</pre>
&#x20; \<h3>2. Inject the SDK dynamically using JavaScript\</h3>
&#x20; \<pre>\<code>export const injectScript = async () =\&gt; \{
&#x20; const head = document.getElementsByTagName('head')\[0];
&#x20; const js = document.createElement('script');
&#x20; js.src = "https\://sdk-web.y.uno/v1.1/main.js";
&#x20; js.defer = true;
&#x20; return new Promise((resolve, reject) =\&gt; \{
&#x20;   window\.addEventListener('yuno-sdk-ready', () =\&gt; resolve(true));
&#x20;   js.onerror = (error) =\&gt; reject(error);
&#x20;   head.appendChild(js);
&#x20; });
};
// Usage:
await injectScript();
const yuno = await Yuno.initialize('PUBLIC\_API\_KEY');
\</code>\</pre>
&#x20; \<h3>3. Use the NPM module\</h3>
&#x20; \<pre>\<code>npm install @yuno-payments/sdk-web\</code>\</pre>
&#x20; \<pre>\<code>import \{ loadScript } from '@yuno-payments/sdk-web';
const yuno = await loadScript();
await yuno.initialize('PUBLIC\_API\_KEY');
\</code>\</pre>
&#x20; \<h3>Improve performance using \<code>preconnect\</code>\</h3>
&#x20; \<pre>\<code>\&lt;link rel="preconnect" href="https\://sdk-web.y.uno" /\&gt;
\&lt;link rel="preconnect" href="https\://api.y.uno" /\&gt;
\&lt;link rel="preconnect" href="https\://sdk-web-card.prod.y.uno" /\&gt;
\</code>\</pre>
&#x20; \<hr/>
&#x20; \<input type="radio" id="liteSDKv11" name="tabs" checked>
&#x20; \<input type="radio" id="liteSDKv10" name="tabs">
&#x20; \<div class="tabs">
&#x20;   \<label for="liteSDKv11">Yuno Lite SDK v1.1\</label>
&#x20;   \<label for="liteSDKv10">Yuno Lite SDK v1.0\</label>
&#x20; \</div>
&#x20; \<div class="tab-content" id="liteSDKv11">
&#x20;   \<h2>Step 1: Initialize SDK with the public key\</h2>
&#x20;   \<div class="infoBlockContainer ">\<div class="verticalLine">\</div>\<div>\<h3>TypeScript library\</h3>\<div class="contentContainer">\<p>If you use TypeScript, see all available methods in the \<a href="https\://www\.npmjs.com/package/@yuno-payments/sdk-web-types">@yuno-payments/sdk-web-types\</a> package.\</p>\</div>\</div>\</div>
&#x20;   \<pre>\<code>const yuno = await Yuno.initialize('PUBLIC\_API\_KEY');\</code>\</pre>
&#x20;   \<h2>Step 2: Start the checkout process\</h2>
&#x20;   \<div class="infoBlockContainer ">\<div class="verticalLine">\</div>\<div>\<h3>Parameters\</h3>\<div class="contentContainer">\<ul>\<li>\<code>checkoutSession\</code>: Your payment session ID\</li>\<li>\<code>country\_code\</code>: Country code (see \<a href="/docs/country-coverage-yuno-sdk">Country Coverage\</a>)\</li>\<li>\<code>language\</code>: Language code (e.g. 'en', 'es')\</li>\<li>\<code>onLoading\</code>: Callback for loading events\</li>\<li>\<code>showLoading\</code>: Show/hide loader (default: true)\</li>\<li>\<code>issuersFormEnable\</code>: Enable issuer's form (default: true)\</li>\<li>\<code>showPaymentStatus\</code>: Show payment status page (default: true)\</li>\<li>\<code>card.isCreditCardProcessingOnly\</code>: Process all cards as credit (optional)\</li>\</ul>\</div>\</div>\</div>
&#x20;   \<pre>\<code>yuno.startCheckout(\{
&#x20; checkoutSession: 'YOUR\_SESSION\_ID',
&#x20; country\_code: 'FR',
&#x20; language: 'fr',
&#x20; showLoading: true,
&#x20; issuersFormEnable: true,
&#x20; showPaymentStatus: true,
&#x20; onLoading: (args) => \{ console.log(args); },
&#x20; async yunoCreatePayment(oneTimeToken) \{
&#x20;   await createPayment(\{ oneTimeToken, checkoutSession });
&#x20;   yuno.continuePayment(\{ showPaymentStatus: true });
&#x20; },
});
\</code>\</pre>
&#x20;   \<h2>Step 3: Mount the SDK\</h2>
&#x20;   \<pre>\<code>yuno.mountCheckoutLite(\{
&#x20; paymentMethodType: PAYMENT\_METHOD\_TYPE, // e.g., 'CARD', 'PAYPAL', etc.
&#x20; vaultedToken: VAULTED\_TOKEN, // optional
});
\</code>\</pre>
&#x20;   \<h2>Step 4: Initiate the payment process\</h2>
&#x20;   \<pre>\<code>const PayButton = document.querySelector('#button-pay');
PayButton.addEventListener('click', () => \{
&#x20; yuno.startPayment();
});
\</code>\</pre>
&#x20;   \<h2>Step 5: Get the OTT (one-time token)\</h2>
&#x20;   \<pre>\<code>yunoCreatePayment(oneTimeToken);
// or with extra info
yunoCreatePayment(oneTimeToken, tokenWithInformation);
\</code>\</pre>
&#x20;   \<h2>Step 6: Create the Payment\</h2>
&#x20;   \<p>Call your backend to create the payment using the one-time token and checkout session. Then use \<code>yuno.continuePayment()\</code> if required.\</p>
&#x20;   \<h2>Step 7: Handle async flows\</h2>
&#x20;   \<pre>\<code>const result = await yuno.continuePayment();
if (result && result.action === 'REDIRECT\_URL') \{
&#x20; // handle redirect
}
\</code>\</pre>
&#x20;   \<div class="infoBlockContainer alert">\<div class="verticalLineAlert">\</div>\<div>\<h3>Important\</h3>\<div class="contentContainer">\<p>The merchant is responsible for handling the loader. Yuno provides a default loader, but you may implement your own.\</p>\</div>\</div>\</div>
&#x20;   \<div class="infoBlockContainer">\<div class="verticalLine">\</div>\<div>\<h3>Demo App\</h3>\<div class="contentContainer">\<p>See the \<a href="/docs/demo-app">Demo App\</a> or the \<a href="https\://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout.html">HTML\</a> and \<a href="https\://github.com/yuno-payments/yuno-sdk-web/blob/main/static/checkout.js">JavaScript\</a> demos on GitHub.\</p>\</div>\</div>\</div>
&#x20; \</div>
&#x20; \<div class="tab-content" id="liteSDKv10">
&#x20;   \<h2>Step 1: Include the library in your project\</h2>
&#x20;   \<pre>\<code>\&lt;script src="https\://sdk-web.y.uno/v1/static/js/main.min.js"\&gt;\&lt;/script\&gt;\</code>\</pre>
&#x20;   \<h2>Step 2: Initialize SDK with the public key\</h2>
&#x20;   \<pre>\<code>const yuno = Yuno.initialize('PUBLIC\_API\_KEY');\</code>\</pre>
&#x20;   \<h2>Step 3: Start the checkout process\</h2>
&#x20;   \<pre>\<code>yuno.startCheckout(\{
&#x20; checkoutSession: 'YOUR\_SESSION\_ID',
&#x20; country\_code: 'FR',
&#x20; language: 'fr',
&#x20; showLoading: true,
&#x20; issuersFormEnable: true,
&#x20; showPaymentStatus: true,
&#x20; onLoading: (args) => \{ console.log(args); },
&#x20; async yunoCreatePayment(oneTimeToken) \{
&#x20;   await createPayment(\{ oneTimeToken, checkoutSession });
&#x20;   yuno.continuePayment(\{ showPaymentStatus: true });
&#x20; },
});
\</code>\</pre>
&#x20;   \<h2>Step 4: Mount the SDK\</h2>
&#x20;   \<pre>\<code>yuno.mountCheckoutLite(\{
&#x20; paymentMethodType: PAYMENT\_METHOD\_TYPE, // e.g., 'CARD', 'PAYPAL', etc.
&#x20; vaultedToken: VAULTED\_TOKEN, // optional
});
\</code>\</pre>
&#x20;   \<h2>Step 5: Initiate the payment process\</h2>
&#x20;   \<pre>\<code>const PayButton = document.querySelector('#button-pay');
PayButton.addEventListener('click', () => \{
&#x20; yuno.startPayment();
});
\</code>\</pre>
&#x20;   \<h2>Step 6: Get the OTT (one-time token)\</h2>
&#x20;   \<pre>\<code>yunoCreatePayment(oneTimeToken);
// or with extra info
yunoCreatePayment(oneTimeToken, tokenWithInformation);
\</code>\</pre>
&#x20;   \<h2>Step 7: Create the Payment\</h2>
&#x20;   \<p>Call your backend to create the payment using the one-time token and checkout session. Then use \<code>yuno.continuePayment()\</code> if required.\</p>
&#x20;   \<h2>Step 8: Handle async flows\</h2>
&#x20;   \<pre>\<code>const result = await yuno.continuePayment();
if (result && result.action === 'REDIRECT\_URL') \{
&#x20; // handle redirect
}
\</code>\</pre>
&#x20;   \<div class="infoBlockContainer alert">\<div class="verticalLineAlert">\</div>\<div>\<h3>Important\</h3>\<div class="contentContainer">\<p>The merchant is responsible for handling the loader. Yuno provides a default loader, but you may implement your own.\</p>\</div>\</div>\</div>
&#x20;   \<div class="infoBlockContainer">\<div class="verticalLine">\</div>\<div>\<h3>Demo App\</h3>\<div class="contentContainer">\<p>See the \<a href="/docs/demo-app">Demo App\</a> or the \<a href="https\://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout.html">HTML\</a> and \<a href="https\://github.com/yuno-payments/yuno-sdk-web/blob/main/static/checkout.js">JavaScript\</a> demos on GitHub.\</p>\</div>\</div>\</div>
&#x20; \</div>
\</body>
\`}\</HTMLBlock>



<br />

## Complementary features

<br />

Yuno Lite SDK provides additional services and configurations to improve your customers' experience:

* [Form loader](#loader)
  * [Bank Issuer List](#form-of-the-issuer)
    * [Render mode](#mode-of-form-rendering)
      * [Card form configurations](#card-form-configurations)
        * [Save Card for future payments](#save-card-for-future-payments)
          * [Rendering modes](#rendering-modes)
            * [Text payment form buttons](#text-payment-form-buttons)
              * [Persist credit card form to retry payments](#persist-credit-card-form-to-retry-payments)
                * [Hide Pay button](#hide-pay-button)
                  <br />

### Loader

Control the use of the loader.

| Parameter     | Description                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `showLoading` | Show or hide the Yuno loading/spinner page. Remains until `hideLoader()` or `continuePayment()` is called. Default: true. |

```javascript
yuno.startCheckout({
  showLoading: true,
})
```

<br />

### Form of the issuer

| Parameter           | Description                           |
| :------------------ | :------------------------------------ |
| `issuersFormEnable` | Enable the issuer's form (bank list). |

```javascript
yuno.startCheckout({
  issuersFormEnable: true,
})
```

<br />

### Mode of form rendering

| Parameter         | Description                                                                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `renderMode`      | Optional. Determines how payment forms are displayed. \<br>- \`type\`: \`modal\` or \`element\`.\<br>- \`elementSelector\`: Where to render the form. Only required if \`type\` is \`element\`. |
| `elementSelector` | Only if \`type\` is \`element\`. Can be a string (deprecated) or an object: \<br>\\\{ apmForm: "#form-element", actionForm: "#action-form-element" }                                            |

```javascript
yuno.startCheckout({
  renderMode: {
    type: 'modal',
    elementSelector: {
      apmForm: "#form-element",
      actionForm: "#action-form-element"
    }
  },
})
```

<br />

### Card form configurations

| Parameter | Description                                                                                                                                                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `card`    | Configure the credit card form:\<br>- \`type\`: \`step\` or \`extends\`\<br>- \`styles\`: Custom CSS injected into the iframe\<br>- \`cardSaveEnable\`: Show checkbox for save/enroll card (default: false)\<br>- \`texts\`: Custom button texts |

```javascript
yuno.startCheckout({
  card: {
    type: "extends",
    styles: '',
    cardSaveEnable: false,
    texts: {}
  },
})
```

<br />

#### Save card for future payments

<br />

Show a checkbox for saving/enrolling cards with `cardSaveEnable: true`.

<br />

#### Rendering modes

<br />

Screenshots and explanations for `modal`/`element` and `step`/`extends` modes.

<br />

#### Text payment form buttons

| Parameter | Description                           |
| --------- | ------------------------------------- |
| `texts`   | Custom text for payment form buttons. |

```javascript
yuno.startCheckout({
  texts: {
    customerForm: {
      submitButton: 'Pay now',
    },
    paymentOtp: {
      sendOtpButton: 'Send OTP',
    }
  }
})
```

<br />

#### Persist credit card form to retry payments

<br />

To retry a payment after a failed transaction:

1. Set `automaticallyUnmount: false` in the SDK config.
   2. On failure, call `yuno.notifyError()` and update the checkout session with `yuno.updateCheckoutSession(newSession)`.
      3. Continue with the new session and token.
         <br />

#### Hide Pay button

<br />

Hide the Pay button in the customer/card form with `showPayButton: false`.

<br />

```
```

<br />

If you hide the Pay button, trigger token creation with `yuno.submitOneTimeTokenForm()`.

<br />

## What's next?

<br />

Learn more about [Lite SDK complementary features](#complementary-features) , [SDK Customizations](https://docs.y.uno/docs/sdk-customizations) , and [3DS Setup SDK](https://docs.y.uno/docs/3ds-setup-sdk) .