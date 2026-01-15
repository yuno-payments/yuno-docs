---
title: Full SDK (Web)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Full SDK (WEB)
  description: >-
    Here, you will find an outline of the step-by-step process to enable the
    Full SDK functionalities within your system.
  keywords:
    - Full SDK WEB Configuration
  robots: index
next:
  description: ''
---
<br />

> 👍 Recommended SDK
>
> We recommend using the [Web Seamless SDK](seamless-sdk-payment-web) for a smooth integration experience. This option provides a flexible payment solution with pre-built UI components and customization options.

Welcome to the Yuno Full Web SDK guide. This guide will help you get started with Yuno's payment solutions. Whether you're looking to implement your first payment integration or enhance your existing setup, this guide provides all the information you need to create a seamless payment experience for your users.

> 📘 Latest Version Documentation
>
> This guide covers the latest version of our Full Web SDK. To read about previous versions, explore the [related links](#related-links) or visit the [changelog](../changelog#/).

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

### 2. Inject the SDK dynamically using JavaScript

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

### 3. Use the NPM module

For projects using NPM package management, you can install the SDK as a module through NPM. This approach provides better dependency management, version control, and seamless integration with modern JavaScript build tools and frameworks. It's particularly beneficial for applications using bundlers like webpack, Rollup, or Vite.

```bash
npm install @yuno-payments/sdk-web
```

Then, load and initialize the SDK as follows:

```javascript
import { loadScript } from '@yuno-payments/sdk-web';

const yuno = await loadScript();
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

## Improve performance using `preconnect`

To optimize performance and reduce latency, we recommend adding `preconnect` links as early as possible within the `<head>` tag of your HTML document. These links allow browsers to quickly connect to our servers before resources are actually requested. This proactive approach can significantly improve loading times, especially for the initial SDK setup and subsequent API calls.

```html
<link rel="preconnect" href="https://sdk-web.y.uno" />
<link rel="preconnect" href="https://api.y.uno" />
<link rel="preconnect" href="https://sdk-web-card.prod.y.uno" />
```

## Full SDK implementation

After integrating the SDK using one of the methods described above, follow these steps to implement the full checkout functionality:

<Shelf classname="link_cards_container">
  <YunoCard title="Full SDK implementation" href="../docs/full-sdk-implementation" titleSize="h4" />
</Shelf>

## Stay Updated

Visit the [changelog](https://docs.y.uno/changelog) for the latest SDK updates and version history.
