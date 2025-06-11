---
title: Lite SDK (Payment Web) [test page]
deprecated: false
hidden: false
metadata:
  robots: index
---
> 📘 Web SDK v1.1 Release
>
> v1.1 introduces enhancements to 3DS, performance, security, and user experience. To learn more, [visit the Web SDK v1.1 page](https://docs.y.uno/docs/yuno-web-sdk-v11).

## Choose your integration method

Let's help you choose the integration method that best fits your needs. Each approach has specific advantages, and selecting the right one depends on your development environment, technical requirements, and preferences.

* **[Method 1 (HTML)](#1-add-the-sdk-script-directly-in-html)**: Add a single script tag to your HTML file. This is the simplest method, ideal for basic implementations and quick prototypes
* **[Method 2 (Dynamic JavaScript)](#2-inject-the-sdk-dynamically-using-javascript)**: Load the SDK programmatically with custom error handling and loading states. Best for applications needing more control over the integration
* **[Method 3 (NPM)](#3-use-the-npm-module)**: Use our NPM package in modern JavaScript applications. This is our recommended approach, with dependency management, tree-shaking, and TypeScript support

### 1. Add the SDK script directly in HTML

The simplest way to integrate the Yuno SDK is by adding a `<script>` tag to your HTML file. This method provides a quick implementation while maintaining proper asynchronous loading. The SDK exposes an event that notifies when it's fully loaded, ensuring you can safely initialize and use its features at the right time.

> 📘 Event Listener Timing
>
> While the `defer` attribute ensures the script is executed after the HTML is parsed, it doesn't guarantee that the SDK script will always load last. In some cases, if the SDK loads faster than expected and the event listener is declared afterward, the `yuno-sdk-ready` event may have already fired — and your listener won't catch it. To prevent this, always define the listener before loading the SDK script.

```html
<!-- First, set up the event listener -->
<script>
  window.addEventListener('yuno-sdk-ready', () => {
    console.log('SDK loaded'); // The SDK is ready to use
    await yuno.initialize('publicKey');
  });
</script>

<!-- Then load the SDK -->
<script defer src="https://sdk-web.y.uno/v1.1/main.js"></script>
```

### 2. Inject the SDK dynamically using JavaScript

The dynamic JavaScript injection method provides enhanced control over SDK loading and initialization. This approach enables you to:

* Load the SDK programmatically when needed
* Implement custom loading states and error handling
* Precisely control when the SDK becomes available
* Synchronize SDK initialization with your application logic
* Create tailored error handling for your use case

This method is ideal when you need granular control over the SDK's loading process and want to handle various scenarios with precision.

**file.js**

```javascript
// Function to inject the SDK dynamically
export const injectScript = async (): Promise<boolean> => {
  const head = document.getElementsByTagName('head')[0];
  const js = document.createElement('script');
  js.src = "https://sdk-web.y.uno/v1.1/main.js";
  js.defer = true;

  // Return a promise that resolves when the SDK is ready
  return new Promise((resolve, reject) => {
    window.addEventListener('yuno-sdk-ready', () => {
      resolve(true); // SDK loaded successfully
    });

    js.onerror = (error) => {
      // Create a custom event in case of loading error
      const event = new CustomEvent('yuno-sdk-error', { detail: error });
      window.dispatchEvent(event);

      reject(new Error(`Failed to load script: ${js.src} - ${error.message}`));
    };

    head.appendChild(js); // Add the script to the document
  });
};

// Using the function to inject the SDK
await injectScript();
// SDK is ready to use
await yuno.initialize('publicKey');
```

### 3. Use the NPM module

For projects using NPM package management, you can install the SDK as a module through NPM. This approach provides better dependency management, version control, and seamless integration with modern JavaScript build tools and frameworks. It's particularly beneficial for applications using bundlers like webpack, Rollup, or Vite.

```bash
npm install @yuno-payments/sdk-web
```

Then, load and initialize the SDK as follows:

```javascript
// Import the SDK module from npm
import { loadScript } from '@yuno-payments/sdk-web';

// Load and initialize the SDK
const yuno = await loadScript();

// Initialize the SDK with the public key
await yuno.initialize('publicKey');
```

## Improve performance using `preconnect`

To optimize performance and reduce latency, we recommend adding `preconnect` links as early as possible within the `<head>` tag of your HTML document. These links allow browsers to quickly connect to our servers before resources are actually requested. This proactive approach can significantly improve loading times, especially for the initial SDK setup and subsequent API calls.

```html
<!-- Improve performance with preconnect -->
<link rel="preconnect" href="https://sdk-web.y.uno" />
<link rel="preconnect" href="https://api.y.uno" />
<link rel="preconnect" href="https://sdk-web-card.prod.y.uno" />
```

Follow this step-by-step guide to implement and enable Yuno's Lite Web SDK v1.0 functionality in your application.

## Step 1: Include the library in your project

Ensure the Yuno SDK file is included in your webpage before closing the `</body>` tag. Refer to the example below:

```html
<script src="https://sdk-web.y.uno/v1/static/js/main.min.js"></script>
```

> 📘 TypeScript Support
>
> If you are using TypeScript, Yuno provides a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) that you can use to see all available methods available in the Yuno Web SDK.

## Step 2: Initialize SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid **PUBLIC\_API\_KEY**. Check the [Get your API credentials](doc:developers-credentials) guide.

Like the example below, use the initialized class that is attributed to the `yuno`constant.

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY)
```

## Step 3: Start the checkout process

You will start the checkout process. To do it, use the `yuno.startCheckout` function and provide the necessary parameters.

The following table lists all required parameters and their descriptions. For optional parameters, go to [Complementary Features](doc:lite-checkout-sdk#complementary-features).

| Parameter                         | Description                                                                                                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `checkoutSession`                 | Refers to the current payment's [checkout session](ref:create-checkout-session). Example: '438413b7-4921-41e4-b8f3-28a5a0141638'                                         |
| `country_code`                    | Determines the country for which the payment process is being configured. See [Country coverage](doc:country-coverage-yuno-sdk) for supported countries and their codes. |
| `language`                        | Defines the language for payment forms. Options: 'es' (Spanish), 'en' (English), 'pt' (Portuguese), 'fil' (Filipino), 'id' (Indonesian), 'ms' (Malay), 'th' (Thai).      |
| `onLoading`                       | Callback function to receive notifications about server calls or loading events during the payment process.                                                              |
| `showLoading`                     | Controls visibility of Yuno loading/spinner page during payment process. Default: `true`.                                                                                |
| `issuersFormEnable`               | Enables the issuer's form. Default: `true`.                                                                                                                              |
| `showPaymentStatus`               | Shows Yuno Payment Status page. Can be used when continuing a payment. Default: `true`.                                                                                  |
| `card.isCreditCardProcessingOnly` | Optional. When `true`, ensures all card transactions are processed as credit only. Useful in markets where cards can act as both credit and debit.                       |

```javascript
yuno.startCheckout({
  checkoutSession: '438413b7-4921-41e4-b8f3-28a5a0141638',
  country_code: "FR",
  language: 'fr',
  showLoading: true,
  issuersFormEnable: true,
  showPaymentStatus: true,
  onLoading: (args) => {
    console.log(args);
  },
  async yunoCreatePayment(oneTimeToken) {
    /**
     * The createPayment function calls the backend to create a payment in Yuno.
     * It uses the following endpoint https://docs.y.uno/reference/create-payment
     */
    await createPayment({ oneTimeToken, checkoutSession })
    yuno.continuePayment({ showPaymentStatus: true })
  },
})
```

> 📘 Transaction Types
>
> Payments can be initiated by the customer (CIT) or by the merchant (MIT). You find more information about their characteristics in [Stored credentials](/docs/stored-credentials).
>
> The step-by-step presented on this page refers to a customer-initiated transaction without the recurrence option. Typically, it's used in one-time online purchases, in-store purchases, ATM withdrawals, etc.

> 📘 Rendering mode
>
> By default, Yuno SDK renders as a modal. However, you can specify the element where the SDK will render. To learn how to use the Lite SDK to perform MIT operations, access the [Mode of form rendering](https://docs.y.uno/docs/lite-checkout-sdk#mode-of-form-rendering) section.

## Step 4: Mount the SDK

Next, you have to mount the SDK, presenting the checkout based on the payment method selected by your customer. Remember, when using the Lite SDK, you're responsible for displaying the payment methods and capturing the customer's selection. Access [Lite SDK (Payment)](doc:the-ultimate-checkout-lite) for additional information.

Use the `yuno.mountCheckoutLite()` function by selecting an HTML element and using a valid CSS selector (`#`, `.`, `[data-*]`) to display the checkout for the selected payment method.

```javascript
yuno.mountCheckoutLite({
  /**
   * can be one of 'PAYPAL' | 'PIX' | 'APPLE_PAY' | 'GOOGLE_PAY' | CARD
   */
  paymentMethodType: PAYMENT_METHOD_TYPE,
  /**
   * Vaulted token related to payment method type.
   * Only if you already have it
   * @optional 
   */
  vaultedToken: VAULTED_TOKEN,
})
```

After mounting the SDK, the selected payment method flow will start automatically.

## Step 5: Initiate the payment process

After the user has selected a payment method, remember to call `yuno.startPayment()` to initiate the payment flow. Below, you will find an example where `yuno.startPayment()` is called when the user clicks on `button-pay`:

```javascript
const PayButton = document.querySelector('#button-pay')

PayButton.addEventListener('click', () => {
  yuno.startPayment()
})
```

## Step 6: Get the OTT (one-time token)

Once the customer fills out the requested data in Yuno's payment forms, the SDK provides the one-time token. The configuration function `yunoCreatePayment(oneTimeToken)` is then triggered with the one-time token.

```javascript
yunoCreatePayment(oneTimeToken)
```

You can also use `tokenWithInformation` to receive any additional info the customer gives at checkout, such as installments or document type/number.

```javascript
yunoCreatePayment(oneTimeToken, tokenWithInformation)
```

> 📘 Loader Management
>
> The merchant is responsible for managing the loader. Yuno provides a default loader option, but merchants may implement their own loader if preferred. In that case, they are responsible for making the necessary configurations.

## Step 7: Create the Payment

Once you have completed the steps described before, you will be able to create a payment. The back-to-back payment creation must be carried out using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant should call their backend to create the payment within Yuno, using the one-time token and the checkout session.

> 📘 Continue Payment Method
>
> Yuno recommends integrating the `continuePayment` method of the SDK after the payment is created. This is because certain asynchronous payment methods require additional action from the customer to complete the payment. The API will inform you of this scenario via the `sdk_action_required` field of the response, which will be returned as true. The `yuno.continuePayment()` function will display additional screens to customers, where they can carry out the necessary actions to complete the payment. If `sdk_action_required` is false, this step is not necessary.

## Complementary features

Yuno Web SDK provides additional services and configurations you can use to improve customers' experience:

* [Form loader](doc:lite-checkout-sdk#loader)
* [Bank Issuer List](doc:lite-checkout-sdk#form-of-the-issuer)
* [Render mode ](doc:lite-checkout-sdk#mode-of-form-rendering)
* [Card form configurations ](doc:lite-checkout-sdk#card-form-configurations)
  * [Save Card for future payments](doc:lite-checkout-sdk#save-card-for-future-payments)
  * [Render mode](doc:lite-checkout-sdk#rendering-modes)
  * [Text payment form buttons](doc:lite-checkout-sdk#text-payment-form-buttons)
  * [Persist credit card form to retry payments](doc:lite-checkout-sdk#persist-credit-card-form-to-retry-payments)
  * [Hide Pay button](doc:lite-checkout-sdk#hide-pay-button)

### Loader

Control the use of the [loader](doc:loader).

| Parameter     | Description                                                                                                                                                                                                                         |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `showLoading` | You can hide or show the Yuno loading/spinner page. Enabling this option ensures that the loading component remains displayed until either the `hideLoader()` or `continuePayment()` function is called. The default value is true. |

```javascript
yuno.startCheckout({
  showLoading: true,
})
```

### Form of the issuer

| Parameter           | Description                                                                                |
| :------------------ | :----------------------------------------------------------------------------------------- |
| `issuersFormEnable` | Through this parameter, you can configure the SDK to enable the issuer's form (bank list). |

```javascript
yuno.startCheckout({
  issuersFormEnable: true,
})
```

<br />

### Mode of form rendering

> 📘 Enhanced Render Mode in Lite SDK v2.0.0
>
> The enhanced Lite SDK v2.0 provides advanced render mode capabilities that embed Yuno's checkout forms directly within your interface. This gives you complete control over the checkout journey, including loading, status, and payment input screens, with full visual customization and seamless UX integration.

| Parameter         | Description                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `renderMode`      | This optional parameter determines how payment forms are displayed:\<br>• \`type\`: Either 'modal' or 'element'\<br>• \`elementSelector\`: Required if \`type\` is 'element'. Specifies where to render the form.                                                                                                                                                                                       |
| `elementSelector` | Required when \`type\` is 'element'. Specifies where to mount the Yuno SDK:\<br>• \*\*String\*\* (Deprecated): ID or selector for mounting the SDK\<br>• \*\*Object\*\*: Specify elements for APM and action forms:\<br>  - \`apmForm\`: Element to display the APM\<br>  - \`actionForm\`: Element for the Continue Payment button, which opens a modal for completing provider-specific payment steps |

```javascript
yuno.startCheckout({
  renderMode: 

 
```

<br />

### Card form configurations

| Parameter | Description                                                                                                                                                                                                                                                                                                                                                             |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `card`    | Define specific settings for the credit card form:\<br>\<br>• \`type\`: \`step\` o \`extends\`\<br>• \`styles\`: You can edit card form styles. Only you should write css, then it will be injected into the iframe.\<br>• \`cardSaveEnable\`: Show checkbox for save/enroll card. The default value is false.\<br>• \`texts\`: Custom texts in the Card forms buttons. |

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