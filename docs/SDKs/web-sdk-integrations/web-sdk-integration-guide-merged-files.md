---
title: Web SDK Integration Guide (merged files)
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
This guide walks you through integrating the Yuno Web SDK into your application. We provide three flexible integration methods to match your development workflow and requirements. Whether you need a quick implementation, more control over the loading process, or a modular approach with package management, you'll find detailed examples for each method below.

## SDK v1.1 updates (April 2025)

Starting April 2025, Yuno is launching version 1.1.0 of its Web SDK with significant improvements. This version introduces several enhancements that improve performance, security, and user experience. While existing integrations will continue to work, upgrading to v1.1.0 is recommended to take advantage of these improvements.

### Performance and security enhancements

- **3DS flow optimization**: The SDK now triggers the `collect` step only when 3DS is required, reducing unnecessary calls. This change improves performance by eliminating redundant API calls while maintaining security.
- **New security integrations**: Added support for additional security providers:
  - Airwallex
  - Forter (Web)
  - Checkout 3DS
  - Unlimit 3DS
- **PayPal fallback**: SDK automatically uses fallback client ID from `paymentByCheckoutSession` when not provided in merchant configuration, improving reliability of PayPal integrations

### Improved user experience

- **Click-to-pay (C2P)**: Enhanced dynamic behavior with:
  - Automatic card-specific updates for Terms & Conditions and logos
  - Phone number field for registration
  - Automatic hiding of C2P options for unsupported cards
  - New compliance settings for `privacy` and `tnc` (terms and conditions)
- **Enrolled card visualization**: 
  - Generic card visuals for Visa and Mastercard
  - American Express displays CVV on the front
  - Dynamic card flipping based on CVV field focus
  - Dynamic titles that adapt to user input
  - Redesigned installment selector for better mobile and desktop UX
- **Inline card input**: 
  - Direct card details entry beneath the Card option
  - Fields persist when switching between payment methods
  - Full integration with existing flows (installments, card selector)
- **Preselected payment method**: Automatically selects last used payment method (or first configured one)
- **Enrolled payment method deletion**: Users can remove saved payment methods directly in the SDK interface

### Layout and styling

- **Flexible checkout styling**: Support for custom styling through the `UI` object in `getPaymentByCheckout` response
- **Layout improvements**: Fixed overlapping issues between document type and installment fields
- **Status screen updates**: Enhanced visual design for all status screens

### New features

- **Boleto (Brazil)**: New payment method available for Brazilian merchants
- **Brazilian hybrid cards**: Improved processing as credit by default for better conversion

### Integration impact

The core integration steps remain the same, but v1.1.0 offers several improvements:

1. **Simplified 3DS integration**: No changes required to your existing 3DS implementation, but you'll benefit from optimized performance
2. **Enhanced security**: New security providers are automatically available when configured in your Yuno dashboard
3. **Better user experience**: All UX improvements are automatically applied without requiring code changes
4. **New payment methods**: Boleto and improved Brazilian Hybrid Cards support are available when configured

For more detailed information about these updates, visit the [Web SDK GitHub repository](https://github.com/yuno-payments/yuno-sdk-web/blob/main/README.md).

## Which method should I use?

Let's help you choose the integration method that best fits your needs. Each approach has specific advantages, and selecting the right one depends on your development environment, technical requirements, and preferences.

- **[Method 1 (HTML)](#1-add-the-sdk-script-directly-in-html)**: Add a single script tag to your HTML file. This is the simplest method, ideal for basic implementations and quick prototypes.
- **[Method 2 (Dynamic JavaScript)](#2-inject-the-sdk-dynamically-using-javascript)**: Load the SDK programmatically with custom error handling and loading states. Best for applications needing more control over the integration.
- **[Method 3 (NPM)](#3-use-the-npm-module)**: Use our NPM package in modern JavaScript applications. This is our recommended approach, with dependency management, tree-shaking, and TypeScript support.

### 1. Add the SDK script directly in HTML

The simplest way to integrate the Yuno SDK is by adding a `<script>` tag to your HTML file. This method provides a quick implementation while maintaining proper asynchronous loading. The SDK exposes an event that notifies when it's fully loaded, ensuring you can safely initialize and use its features at the right time.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer \">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Important</h3>\n      <div class=\"contentContainer\">\n        <p>\n          While the <code>defer</code> attribute ensures the script is executed after the HTML is parsed, it doesn't guarantee that the SDK script will always load last. In some cases, if the SDK loads faster than expected and the event listener is declared afterward, the <code>yuno-sdk-ready</code> event may have already fired — and your listener won't catch it. To prevent this, always define the listener before loading the SDK script.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


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

The dynamic JavaScript injection method gives you more control over how the SDK loads and initializes. This approach lets you:

- Load the SDK programmatically when your application needs it
- Handle loading states and errors in a way that fits your application
- Control the exact timing of when the SDK becomes available 
- Coordinate the SDK initialization with your application's logic
- Implement error handling that matches your application's needs

Choose this method when you want full control over the SDK's loading process and need to handle different scenarios gracefully.

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

## Improve Performance: Using `preconnect`

To optimize performance and reduce latency, we recommend adding `preconnect` links as early as possible within the <head> tag of your HTML document. These links allow browsers to quickly connect to our servers before resources are actually requested. This proactive approach can significantly improve loading times, especially for the initial SDK setup and subsequent API calls.

```html
<!-- Improve performance with preconnect -->
<link rel="preconnect" href="https://sdk-web.y.uno" />
<link rel="preconnect" href="https://api.y.uno" />
<link rel="preconnect" href="https://sdk-web-card.prod.y.uno" />
```

## Full SDK Implementation

After integrating the SDK using one of the methods described above, follow these steps to implement the full checkout functionality:

### Step 1: Initialize the SDK

Initialize the SDK with your public API key:

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY)
```

### Step 2: Start the Checkout

Use the `startCheckout` function with the required parameters:

```javascript
yuno.startCheckout({
  checkoutSession: '438413b7-4921-41e4-b8f3-28a5a0141638',
  country_code: "FR",
  language: 'fr',
  showLoading: true,
  issuersFormEnable: true,
  showPaymentStatus: true,
  card: {
    isCreditCardProcessingOnly: true,
  },
  onLoading: (args) => {
    console.log(args);
  },
  async yunoCreatePayment(oneTimeToken) {
    await createPayment({ oneTimeToken, checkoutSession })
    yuno.continuePayment({ showPaymentStatus: true })
  },
})
```

### Step 3: Mount the SDK

Display the payment methods using `mountCheckout()`:

```javascript
// Basic mounting
yuno.mountCheckout()

// Or with a default payment method
yuno.mountCheckout({
  paymentMethodType: PAYMENT_METHOD_TYPE,
  vaultedToken: VAULTED_TOKEN,
})
```

### Step 4: Handle payment process

1. Start the payment when the user is ready:

```javascript
const PayButton = document.querySelector('#button-pay')
PayButton.addEventListener('click', () => {
  yuno.startPayment()
})
```

2. Handle the one-time token:

```javascript
yunoCreatePayment(oneTimeToken)
// Or with additional information
yunoCreatePayment(oneTimeToken, tokenWithInformation)
```

### Important notes

- The merchant is responsible for handling the loader, although Yuno provides a built-in option.
- After creating the payment, you must integrate the `continuePayment` method, as certain payment methods require additional customer actions.
- The `continuePayment` method may return an object with redirect URLs that need to be handled by your application.

### Additional features

The Full SDK offers several customization options:

- **Form loader**: Control the visibility of loading states.
- **Render mode**: Choose between modal or element-based rendering.
- **Card form configurations**:
  - Save cards for future payments
  - Custom button text
  - Form persistence for retry payments
  - Hide or show pay button
- **Styling**: Customize the appearance to match your brand

For complete implementation details and examples, visit the [Demo App](https://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout.html) or refer to the [Full SDK documentation](https://docs.y.uno/docs/full-sdk-workflow).