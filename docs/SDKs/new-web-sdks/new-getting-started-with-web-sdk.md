---
title: New - Getting Started with Web SDK
deprecated: false
hidden: false
metadata:
  robots: index
---
This guide helps you install and initialize Yuno's Web SDK. Choose the installation method that best fits your development workflow, then proceed to implement payment or enrollment functionality.

## Choose Your Installation Method

Yuno's Web SDK offers three flexible installation methods. Each approach has specific advantages - select the one that best fits your development environment and technical requirements.

* **[Method 1 (HTML)](#method-1-add-the-sdk-script-directly-in-html)**: Add a single script tag to your HTML file. This is the simplest method, ideal for basic implementations and quick prototypes.
* **[Method 2 (Dynamic JavaScript)](#method-2-inject-the-sdk-dynamically-using-javascript)**: Load the SDK programmatically with custom error handling and loading states. Best for applications needing more control over the integration.
* **[Method 3 (NPM)](#method-3-use-the-npm-module)**: Use our NPM package in modern JavaScript applications. This is our recommended approach, with dependency management, tree-shaking, and TypeScript support.

### Method 1: Add the SDK Script Directly in HTML

The simplest way to integrate the Yuno SDK is by adding a `<script>` tag to your HTML file. This method provides a quick implementation while maintaining proper asynchronous loading. The SDK exposes an event that notifies when it's fully loaded, ensuring you can safely initialize and use its features at the right time.

> 📘 Event Listener Timing
>
> While the `defer` attribute ensures the script is executed after the HTML is parsed, it doesn't guarantee that the SDK script will always load last. In some cases, if the SDK loads faster than expected and the event listener is declared afterward, the `yuno-sdk-ready` event may have already fired — and your listener won't catch it. To prevent this, always define the listener before loading the SDK script.

First, set up the event listener, then load the SDK:

```html
<script>
  window.addEventListener('yuno-sdk-ready', () => {
    console.log('SDK loaded');
    const yuno = await Yuno.initialize(PUBLIC_API_KEY);
  });
</script>

<script defer src="https://sdk-web.y.uno/v1.5/main.js"></script>
```

### Method 2: Inject the SDK Dynamically Using JavaScript

The dynamic JavaScript injection method provides enhanced control over SDK loading and initialization. This approach enables you to:

* Load the SDK programmatically when needed
* Implement custom loading states and error handling
* Precisely control when the SDK becomes available
* Synchronize SDK initialization with your application logic
* Create tailored error handling for your use case

This method is ideal when you need granular control over the SDK's loading process and want to handle various scenarios with precision.

Create a function to inject the SDK dynamically:

```javascript
export const injectScript = async (): Promise<boolean> => {
  const head = document.getElementsByTagName('head')[0];
  const js = document.createElement('script');
  js.src = "https://sdk-web.y.uno/v1.5/main.js";
  js.defer = true;

  return new Promise((resolve, reject) => {
    window.addEventListener('yuno-sdk-ready', () => {
      resolve(true);
    });

    js.onerror = (error) => {
      const event = new CustomEvent('yuno-sdk-error', { detail: error });
      window.dispatchEvent(event);
      reject(new Error(`Failed to load script: ${js.src} - ${error.message}`));
    };

    head.appendChild(js);
  });
};
```

Use the function to inject the SDK:

```javascript
await injectScript();
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

### Method 3: Use the NPM Module

For projects using NPM package management, you can install the SDK as a module through NPM. This approach provides better dependency management, version control, and seamless integration with modern JavaScript build tools and frameworks. It's particularly beneficial for applications using bundlers like webpack, Rollup, or Vite.

```bash
npm install @yuno-payments/sdk-web
```

Then, load and initialize the SDK:

```javascript
import { loadScript } from '@yuno-payments/sdk-web';

await loadScript();
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

## Improve Performance Using `preconnect`

To optimize performance and reduce latency, we recommend adding `preconnect` links as early as possible within the `<head>` tag of your HTML document. These links allow browsers to quickly connect to our servers before resources are actually requested. This proactive approach can significantly improve loading times, especially for the initial SDK setup and subsequent API calls.

```html
<link rel="preconnect" href="https://sdk-web.y.uno" />
<link rel="preconnect" href="https://api.y.uno" />
<link rel="preconnect" href="https://sdk-web-card.prod.y.uno" />
```

## Initialize the SDK

After installing the SDK using one of the methods above, initialize it with your public API key:

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

> 📘 Get Your Credentials
>
> See the [Authentication](https://docs.y.uno/reference/authentication) page for information on obtaining your public API key.

## TypeScript Support

If you are using TypeScript, Yuno provides a [types library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) that includes all interfaces and types available for the Web SDK:

```bash
npm install @yuno-payments/sdk-web-types
```

Access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-web/blob/main/typescript/types.ts) to view all available interfaces and types.

## Browser Support

> ❗️ Internet Explorer Not Supported
>
> Yuno Web SDK does not support Internet Explorer.

## Android WebView Configuration

If you are using the Web SDK inside a WebView on Android, you must enable JavaScript code execution and multi-window support. Some payment methods, such as Google Pay, require this configuration for proper operation.

```kotlin
settings.javaScriptEnabled = true
settings.javaScriptCanOpenWindowsAutomatically = true
settings.setSupportMultipleWindows(true)
settings.domStorageEnabled = true
```

## Cookie Usage

The Web SDK sets two essential cookies for its functionality:

* `recognitionToken`: Required for the Click-to-Pay flow
* `yuno`: Required for logging and analytics

Third-party fraud prevention SDKs integrated within Yuno may set additional cookies. These cookies are managed by the respective providers and are outside of Yuno's control. For details about third-party cookies and their usage, please consult the documentation of your specific fraud prevention vendor.

## What's Next?

Now that you've installed and initialized the SDK, choose your integration path:

<Shelf classname="link_cards_container">
  <YunoCard title="Payment Integration" href="../docs/web-sdk-payment-integration" titleSize="h4" description="Process one-time payments with multiple mounting options" />

  <YunoCard title="Enrollment Integration" href="../docs/web-sdk-enrollment-integration" titleSize="h4" description="Save payment methods for future use" />

  <YunoCard title="Headless Integration" href="../docs/headless-sdk-payment" titleSize="h4" description="Complete UI control for advanced use cases" />

  <YunoCard title="Secure Fields" href="../docs/secure-fields-payment" titleSize="h4" description="Custom card forms with secure iframe fields" />
</Shelf>

## Additional Resources

* **[Demo App](doc:demo-app)**: Working examples of all SDK integrations
* **[SDK Customizations](doc:sdk-customizations)**: Customize the SDK appearance to match your brand
* **[Payment Status](doc:payment-status)**: Monitor payment status with the SDK
* **[Changelog](https://docs.y.uno/changelog)**: Latest SDK updates and version history

## Supported Languages

For the full list of languages supported by our SDKs, see the [Supported Languages](doc:supported-languages) page.

## Stay Updated

Visit the [changelog](https://docs.y.uno/changelog) for the latest SDK updates and version history.
