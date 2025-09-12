---
title: Full Web SDK
excerpt: 'Complete integration guide for Yuno Web SDK'
deprecated: false
hidden: false
metadata:
  title: Full SDK (WEB)
  description: >-
    Complete step-by-step guide to integrate Yuno's Full Web SDK with your application. 
    Includes all integration methods, configuration options, and implementation examples.
  keywords:
    - Full SDK WEB Configuration
    - Yuno Web SDK Integration
    - Payment Integration Web
  robots: index
next:
  description: ''
---

> 👍 Recommended SDK
>
> We recommend using the [Web Seamless SDK](seamless-sdk-payment-web) for a smooth integration experience. This option provides a flexible payment solution with pre-built UI components and customization options.

Welcome to the Yuno Full SDK (Web) guide. This guide provides complete instructions for integrating Yuno's payment solutions into your web application. Whether you're implementing your first payment integration or enhancing your existing setup, this guide covers everything you need to create a seamless payment experience for your users.

> 📘 Current Version
>
> These instructions are for the latest Web SDK version (v1.3). For information about previous versions or migration guidance, visit our [SDK Changelog](../../../../changelog/).

## Choose your integration method

Let's help you choose the integration method that best fits your needs. Each approach has specific advantages, and selecting the right one depends on your development environment, technical requirements, and preferences.

* **[Method 1 (HTML)](#1-add-the-sdk-script-directly-in-html)**: Add a single script tag to your HTML file. This is the simplest method, ideal for basic implementations and quick prototypes
* **[Method 2 (Dynamic JavaScript)](#2-inject-the-sdk-dynamically-using-javascript)**: Load the SDK programmatically with custom error handling and loading states. Best for applications needing more control over the integration
* **[Method 3 (NPM)](#3-use-the-npm-module)**: Use our NPM package in modern JavaScript applications. This is our recommended approach, with dependency management, tree-shaking, and TypeScript support

### 1. Add the SDK script directly in HTML

The simplest way to integrate the Yuno SDK is by adding a `<script>` tag to your HTML file. This method provides a quick implementation while maintaining proper asynchronous loading. The SDK exposes an event that notifies when it's fully loaded, ensuring you can safely initialize and use its features at the right time.

> 📘 Important
>
> While the `defer` attribute ensures the script is executed after the HTML is parsed, it doesn't guarantee that the SDK script will always load last. In some cases, if the SDK loads faster than expected and the event listener is declared afterward, the `yuno-sdk-ready` event may have already fired — and your listener won't catch it. To prevent this, always define the listener before loading the SDK script.

```html
<!-- First, set up the event listener -->
<script>
  window.addEventListener('yuno-sdk-ready', () => {
    console.log('SDK loaded'); // The SDK is ready to use
    const yuno = await Yuno.initialize(PUBLIC_API_KEY);
  });
</script>

<!-- Then load the SDK -->
<script defer src="https://sdk-web.y.uno/v1.3/main.js"></script>
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
  js.src = "https://sdk-web.y.uno/v1.3/main.js";
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
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
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
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

> 📘 TypeScript Support
>
> If you are using TypeScript, Yuno provides a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) to see all methods available in the Yuno Web SDK.

## Improve performance using `preconnect`

To optimize performance and reduce latency, we recommend adding `preconnect` links as early as possible within the `<head>` tag of your HTML document. These links allow browsers to quickly connect to our servers before resources are actually requested. This proactive approach can significantly improve loading times, especially for the initial SDK setup and subsequent API calls.

```html
<!-- Improve performance with preconnect -->
<link rel="preconnect" href="https://sdk-web.y.uno" />
<link rel="preconnect" href="https://api.y.uno" />
<link rel="preconnect" href="https://sdk-web-card.prod.y.uno" />
```

## Step 1: Initialize SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid **PUBLIC_API_KEY**. See the [credentials page](https://docs.y.uno/docs/developers-credentials) for more information.

Like the example below, use the initialized class that is attributed to the `yuno` constant.

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

> 📘 Credentials
>
> See the credentials page for more information: https://docs.y.uno/reference/authentication

## Step 2: Start the checkout process

To start the checkout, you'll use the function `yuno.startCheckout`, providing the necessary parameters.

The following table lists all required parameters and their descriptions. For optional parameters, go to [Complementary Features](#complementary-features).

### Parameters

Configure the checkout with the following options:

| Parameter                         | Description                                                                                                                                                                                                                                                                                                            |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkoutSession`                 | Refers to the current payment's [checkout session](ref:create-checkout-session). Example: `'438413b7-4921-41e4-b8f3-28a5a0141638'`                                                                                                                                                                                     |
| `elementSelector`                 | The element where the SDK will be mounted.                                                                                                                                                                                                                                                                             |
| `countryCode`                     | This parameter specifies the country for which the payment process is being set up. Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk) page.                          |
| `language`                        | Defines the language to be used in the payment forms. You can set it to one of the available language options: es (Spanish), en (English), pt (Portuguese), fil (Filipino), id (Indonesian), ms (Malay), th (Thai), zh-TW (Chinese (Traditional, Taiwan)), zh-CN (Chinese (Simplified, China)), vi (Vietnamese), fr (French), pl (Polish), it (Italian), de (German), ru (Russian), tr (Turkish), nl (Dutch), sv (Swedish), ko (Korean), ja (Japanese). |
| `onLoading`                       | Required to receive notifications about server calls or loading events during the payment process.                                                                                                                                                                                                                     |
| `showLoading`                     | Control the visibility of the Yuno loading/spinner page during the payment process. By default, it's `true`.                                                                                                                                                                                                           |
| `issuersFormEnable`               | Enables the issuer's form. By default, it's `true`.                                                                                                                                                                                                                                                                    |
| `showPaymentStatus`               | Shows the Yuno Payment Status page. You can use this option when continuing a payment as well. By default, it's `true`.                                                                                                                                                                                                |
| `card.isCreditCardProcessingOnly` | Enables you to ensure that all card transactions are processed as credit only. This option is helpful in markets where cards can act as both credit and debit. To enable, set the `isCreditCardProcessingOnly` to `true` to ensure that all card transactions are processed as credit. This parameter is not required. |

### Example

```javascript
yuno.startCheckout({
  checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
  elementSelector: "#root",
  countryCode: "FR",
  language: "fr",
  showLoading: true,
  issuersFormEnable: true,
  showPaymentStatus: true,
  card: {
    isCreditCardProcessingOnly: true,
  },
  onLoading: (args) => {
    console.log(args);
  },
  yunoPaymentMethodSelected: () => {
    console.log("Payment method selected");
  },
  yunoPaymentResult: (status) => {
    console.log("Payment result:", status);
  },
  yunoError: (message, data) => {
    console.error("Payment error:", message, data);
  },
});
```

## Step 3: Handle payment continuation

When the API response includes `sdk_action_required: true`, you must call `continuePayment` to resume the payment process. The SDK will automatically render the necessary screens, such as 3DS authentication or external wallet steps.

> 📘 `ContinuePayment` Method
>
> The `continuePayment` method is essential for completing dynamic payment flows. When `sdk_action_required: true` appears in your payment response, call `yuno.continuePayment()` to let the SDK handle the remaining steps automatically.

```javascript
// After creating a payment and receiving sdk_action_required: true
const result = await yuno.continuePayment();
// The SDK handles 3DS, redirects, and other dynamic flows automatically
```

## Render mode

The render mode feature allows you to customize how payment methods are displayed to your customers. You can choose between different presentation styles to match your user experience requirements.

```javascript
yuno.startCheckout({
  // ... other parameters
  renderMode: {
    type: 'modal'  // Options: 'modal', 'embedded', 'redirect'
  }
});
```

## Complementary features

Explore additional features and configuration options to enhance your payment integration:

- **Custom styling**: Customize the appearance of payment forms
- **Advanced callbacks**: Implement sophisticated event handling
- **Multi-currency support**: Handle payments in different currencies
- **Payment method filtering**: Show only specific payment methods
- **Custom error handling**: Implement tailored error management

For detailed information about these features, visit our [complementary features documentation](doc:complementary-features-full-sdk).

---

## Need Help?

- **API Reference**: [Payment API Documentation](../../../../reference/Payments/)
- **SDK Changelog**: [Version History](../../../../changelog/)
- **Country Coverage**: [Supported Countries](doc:country-coverage-yuno-sdk)
- **Support**: Contact our team for implementation assistance
