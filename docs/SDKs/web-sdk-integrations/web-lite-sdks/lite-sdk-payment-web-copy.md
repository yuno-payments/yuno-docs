---
title: Lite SDK (Payment Web) (COPY)
deprecated: false
hidden: true
metadata:
  title: Lite SDK (Payment)
  description: >-
    Here, you will find an outline of the step-by-step process to enable the
    Lite SDK functionalities within your system.
  robots: index
---
Welcome to the Yuno Lite SDK (Web) guide. This guide will help you get started with Yuno's lightweight payment solution. Whether you're integrating for the first time or updating to the latest version, you'll find all the information you need to create a seamless payment experience for your users.

\<HTMLBlock>\{\`

\<style>\
.tabs \{
display: flex;
border-bottom: 2px solid #ddd;
margin-bottom: 20px;
}
input\[type="radio"] \{
display: none;
}
label \{
text-decoration: none;
color: #333;
padding: 10px 20px;
transition: all 0.3s ease;
font-size: 16px;
margin-right: 10px;
border-bottom: 2px solid transparent;
cursor: pointer;
}
label:hover,
label:focus \{
color: #000;
}
.tab-content \{
display: none;
}
\#liteSDKv10:checked\~.tab-content#liteSDKv10,
\#liteSDKv11:checked\~.tab-content#liteSDKv11 \{
display: block;
}
\#liteSDKv10:checked\~.tabs label\[for="liteSDKv10"],
\#liteSDKv11:checked\~.tabs label\[for="liteSDKv11"] \{
color: #000;
border-bottom: 2px solid #513CE1;
}
\</style>
\<body>
\<div class="infoBlockContainer ">
\<div class="verticalLine">\</div>
\<div>
\<h3>Lite SDK v1.1 release\</h3>
\<div class="contentContainer">
\<p>
v1.1 brings improved performance, security, and user experience. For details, \<a href="[https://docs.y.uno/docs/yuno-web-sdk-v11">see](https://docs.y.uno/docs/yuno-web-sdk-v11">see) the Web SDK v1.1 page\</a>.
\</p>
\</div>
\</div>
\</div>
\<h2>Choose your integration method\</h2>
\<ul>
\<li>\<b>Method 1 (HTML):\</b> Add a script tag to your HTML. Easiest for basic sites and prototypes.\</li>
\<li>\<b>Method 2 (Dynamic JavaScript):\</b> Load the SDK programmatically for more control.\</li>
\<li>\<b>Method 3 (NPM):\</b> Use our NPM package in modern JavaScript apps. Best for dependency management and TypeScript support.\</li>
\</ul>
\<h3>1. Add the SDK script directly in HTML\</h3>
\<pre>\<code>\<!-- Add the event listener before loading the SDK -->
\<script>
window\.addEventListener('yuno-sdk-ready', async () => \{
const yuno = await Yuno.initialize('PUBLIC\_API\_KEY');
// Continue with your integration
});
\</script>
\<!-- Then load the SDK -->
\<script defer src="[https://sdk-web.y.uno/v1.1/main.js">\</script\&gt](https://sdk-web.y.uno/v1.1/main.js">\</script\<);
\</code>\</pre>
\<h3>2. Inject the SDK dynamically using JavaScript\</h3>
\<pre>\<code>export const injectScript = async () => \{
const head = document.getElementsByTagName('head')\[0];
const js = document.createElement('script');
js.src = "[https://sdk-web.y.uno/v1.1/main.js](https://sdk-web.y.uno/v1.1/main.js)";
js.defer = true;
return new Promise((resolve, reject) => \{
window\.addEventListener('yuno-sdk-ready', () => resolve(true));
js.onerror = (error) => reject(error);
head.appendChild(js);
});
};
// Usage:
await injectScript();
const yuno = await Yuno.initialize('PUBLIC\_API\_KEY');
\</code>\</pre>
\<h3>3. Use the NPM module\</h3>
\<pre>\<code>npm install @yuno-payments/sdk-web\</code>\</pre>
\<pre>\<code>import \{ loadScript } from '@yuno-payments/sdk-web';
const yuno = await loadScript();
await yuno.initialize('PUBLIC\_API\_KEY');
\</code>\</pre>
\<h3>Improve performance using \<code>preconnect\</code>\</h3>
\<pre>\<code>\<link rel="preconnect" href="[https://sdk-web.y.uno](https://sdk-web.y.uno)" />
\<link rel="preconnect" href="[https://api.y.uno](https://api.y.uno)" />
\<link rel="preconnect" href="[https://sdk-web-card.prod.y.uno](https://sdk-web-card.prod.y.uno)" />
\</code>\</pre>
\<hr/>
\<input type="radio" id="liteSDKv11" name="tabs" checked>
\<input type="radio" id="liteSDKv10" name="tabs">
\<div class="tabs">
\<label for="liteSDKv11">Yuno Lite SDK v1.1\</label>
\<label for="liteSDKv10">Yuno Lite SDK v1.0\</label>
\</div>
\<div class="tab-content" id="liteSDKv11">
\<h2>Step 1: Initialize SDK with the public key\</h2>
\<div class="infoBlockContainer ">\<div class="verticalLine">\</div>\<div>\<h3>TypeScript library\</h3>\<div class="contentContainer">\<p>If you use TypeScript, see all available methods in the \<a href="[https://www.npmjs.com/package/@yuno-payments/sdk-web-types">@yuno-payments/sdk-web-types\</a](https://www.npmjs.com/package/@yuno-payments/sdk-web-types">@yuno-payments/sdk-web-types\</a)> package.\</p>\</div>\</div>\</div>
\<pre>\<code>const yuno = await Yuno.initialize('PUBLIC\_API\_KEY');\</code>\</pre>
\<h2>Step 2: Start the checkout process\</h2>
\<div class="infoBlockContainer ">\<div class="verticalLine">\</div>\<div>\<h3>Parameters\</h3>\<div class="contentContainer">\<ul>\<li>\<code>checkoutSession\</code>: Your payment session ID\</li>\<li>\<code>country\_code\</code>: Country code (see \<a href="/docs/country-coverage-yuno-sdk">Country Coverage\</a>)\</li>\<li>\<code>language\</code>: Language code (e.g. 'en', 'es')\</li>\<li>\<code>onLoading\</code>: Callback for loading events\</li>\<li>\<code>showLoading\</code>: Show/hide loader (default: true)\</li>\<li>\<code>issuersFormEnable\</code>: Enable issuer's form (default: true)\</li>\<li>\<code>showPaymentStatus\</code>: Show payment status page (default: true)\</li>\<li>\<code>card.isCreditCardProcessingOnly\</code>: Process all cards as credit (optional)\</li>\</ul>\</div>\</div>\</div>
\<pre>\<code>yuno.startCheckout(\{
checkoutSession: 'YOUR\_SESSION\_ID',
country\_code: 'FR',
language: 'fr',
showLoading: true,
issuersFormEnable: true,
showPaymentStatus: true,
onLoading: (args) => \{ console.log(args); },
async yunoCreatePayment(oneTimeToken) \{
await createPayment(\{ oneTimeToken, checkoutSession });
yuno.continuePayment(\{ showPaymentStatus: true });
},
});
\</code>\</pre>
\<h2>Step 3: Mount the SDK\</h2>
\<pre>\<code>yuno.mountCheckoutLite(\{
paymentMethodType: PAYMENT\_METHOD\_TYPE, // e.g., 'CARD', 'PAYPAL', etc.
vaultedToken: VAULTED\_TOKEN, // optional
});
\</code>\</pre>
\<h2>Step 4: Initiate the payment process\</h2>
\<pre>\<code>const PayButton = document.querySelector('#button-pay');
PayButton.addEventListener('click', () => \{
yuno.startPayment();
});
\</code>\</pre>
\<h2>Step 5: Get the OTT (one-time token)\</h2>
\<pre>\<code>yunoCreatePayment(oneTimeToken);
// or with extra info
yunoCreatePayment(oneTimeToken, tokenWithInformation);
\</code>\</pre>
\<h2>Step 6: Create the Payment\</h2>
\<p>Call your backend to create the payment using the one-time token and checkout session. Then use \<code>yuno.continuePayment()\</code> if required.\</p>
\<h2>Step 7: Handle async flows\</h2>
\<pre>\<code>const result = await yuno.continuePayment();
if (result && result.action === 'REDIRECT\_URL') \{
// handle redirect
}
\</code>\</pre>
\<div class="infoBlockContainer alert">\<div class="verticalLineAlert">\</div>\<div>\<h3>Important\</h3>\<div class="contentContainer">\<p>The merchant is responsible for handling the loader. Yuno provides a default loader, but you may implement your own.\</p>\</div>\</div>\</div>
\<div class="infoBlockContainer">\<div class="verticalLine">\</div>\<div>\<h3>Demo App\</h3>\<div class="contentContainer">\<p>See the \<a href="/docs/demo-app">Demo App\</a> or the \<a href="[https://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout.html">HTML\</a](https://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout.html">HTML\</a)> and \<a href="[https://github.com/yuno-payments/yuno-sdk-web/blob/main/static/checkout.js">JavaScript\</a](https://github.com/yuno-payments/yuno-sdk-web/blob/main/static/checkout.js">JavaScript\</a)> demos on GitHub.\</p>\</div>\</div>\</div>
\</div>
\<div class="tab-content" id="liteSDKv10">
\<h2>Step 1: Include the library in your project\</h2>
\<pre>\<code>\<script src="[https://sdk-web.y.uno/v1/static/js/main.min.js">\</script>\</code>\</pre](https://sdk-web.y.uno/v1/static/js/main.min.js">\</script>\</code>\</pre)>
\<h2>Step 2: Initialize SDK with the public key\</h2>
\<pre>\<code>const yuno = Yuno.initialize('PUBLIC\_API\_KEY');\</code>\</pre>
\<h2>Step 3: Start the checkout process\</h2>
\<pre>\<code>yuno.startCheckout(\{
checkoutSession: 'YOUR\_SESSION\_ID',
country\_code: 'FR',
language: 'fr',
showLoading: true,
issuersFormEnable: true,
showPaymentStatus: true,
onLoading: (args) => \{ console.log(args); },
async yunoCreatePayment(oneTimeToken) \{
await createPayment(\{ oneTimeToken, checkoutSession });
yuno.continuePayment(\{ showPaymentStatus: true });
},
});
\</code>\</pre>
\<h2>Step 4: Mount the SDK\</h2>
\<pre>\<code>yuno.mountCheckoutLite(\{
paymentMethodType: PAYMENT\_METHOD\_TYPE, // e.g., 'CARD', 'PAYPAL', etc.
vaultedToken: VAULTED\_TOKEN, // optional
});
\</code>\</pre>
\<h2>Step 5: Initiate the payment process\</h2>
\<pre>\<code>const PayButton = document.querySelector('#button-pay');
PayButton.addEventListener('click', () => \{
yuno.startPayment();
});
\</code>\</pre>
\<h2>Step 6: Get the OTT (one-time token)\</h2>
\<pre>\<code>yunoCreatePayment(oneTimeToken);
// or with extra info
yunoCreatePayment(oneTimeToken, tokenWithInformation);
\</code>\</pre>
\<h2>Step 7: Create the Payment\</h2>
\<p>Call your backend to create the payment using the one-time token and checkout session. Then use \<code>yuno.continuePayment()\</code> if required.\</p>
\<h2>Step 8: Handle async flows\</h2>
\<pre>\<code>const result = await yuno.continuePayment();
if (result && result.action === 'REDIRECT\_URL') \{
// handle redirect
}
\</code>\</pre>
\<div class="infoBlockContainer alert">\<div class="verticalLineAlert">\</div>\<div>\<h3>Important\</h3>\<div class="contentContainer">\<p>The merchant is responsible for handling the loader. Yuno provides a default loader, but you may implement your own.\</p>\</div>\</div>\</div>
\<div class="infoBlockContainer">\<div class="verticalLine">\</div>\<div>\<h3>Demo App\</h3>\<div class="contentContainer">\<p>See the \<a href="/docs/demo-app">Demo App\</a> or the \<a href="[https://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout.html">HTML\</a](https://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout.html">HTML\</a)> and \<a href="[https://github.com/yuno-payments/yuno-sdk-web/blob/main/static/checkout.js">JavaScript\</a](https://github.com/yuno-payments/yuno-sdk-web/blob/main/static/checkout.js">JavaScript\</a)> demos on GitHub.\</p>\</div>\</div>\</div>
\</div>
\</body>
\`}\</HTMLBlock>

## Complementary features

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

### Form of the issuer

| Parameter           | Description                           |
| :------------------ | :------------------------------------ |
| `issuersFormEnable` | Enable the issuer's form (bank list). |

```javascript
yuno.startCheckout({
  issuersFormEnable: true,
})
```

### Mode of form rendering

| Parameter         | Description                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `renderMode`      | Optional. Determines how payment forms are displayed. \<br>- `type`: `modal` or `element`.\<br>- `elementSelector`: Where to render the form. Only required if `type` is `element`. |
| `elementSelector` | Only if `type` is `element`. Can be a string (deprecated) or an object: \<br>\{ apmForm: "#form-element", actionForm: "#action-form-element" }                                      |

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

### Card form configurations

| Parameter | Description                                                                                                                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `card`    | Configure the credit card form:\<br>- `type`: `step` or `extends`\<br>- `styles`: Custom CSS injected into the iframe\<br>- `cardSaveEnable`: Show checkbox for save/enroll card (default: false)\<br>- `texts`: Custom button texts |

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

#### Save card for future payments

Show a checkbox for saving/enrolling cards with `cardSaveEnable: true`.

#### Rendering modes

Screenshots and explanations for `modal`/`element` and `step`/`extends` modes.

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

#### Persist credit card form to retry payments

To retry a payment after a failed transaction:

1. Set `automaticallyUnmount: false` in the SDK config.
   2. On failure, call `yuno.notifyError()` and update the checkout session with `yuno.updateCheckoutSession(newSession)`.
      3. Continue with the new session and token.
   <br />

#### Hide Pay button

Hide the Pay button in the customer/card form with `showPayButton: false`.

```
```

If you hide the Pay button, trigger token creation with `yuno.submitOneTimeTokenForm()`.

## What's next?

Learn more about [Lite SDK complementary features](#complementary-features) , [SDK Customizations](https://docs.y.uno/docs/sdk-customizations) , and [3DS Setup SDK](https://docs.y.uno/docs/3ds-setup-sdk) .