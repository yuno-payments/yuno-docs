---
title: Yuno SDK Integration Guide
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

## Which method should I use?

Before diving into the implementation details, let's help you choose the integration method that best suits your needs. Each approach has its own advantages, and selecting the right one depends on your development environment, technical requirements, and preferences.

* **[Method 1 (HTML)](#1-add-the-sdk-script-directly-in-html)**: The simplest integration method - just add a single script tag to your HTML file. Ideal for basic implementations and quick prototypes.
* **[Method 2 (Dynamic JavaScript)](#2-inject-the-sdk-dynamically-using-javascript)**: Provides programmatic control over SDK loading and initialization. Best for applications requiring custom error handling and loading states.
* **[Method 3 (NPM)](#3-use-the-npm-module)**: The recommended approach for modern JavaScript applications. Offers proper dependency management, tree-shaking, and TypeScript support.

### 1. Add the SDK script directly in HTML

The simplest way to integrate the Yuno SDK is by adding a `<script>` tag to your HTML file. This method provides a quick implementation while maintaining proper asynchronous loading. The SDK exposes an event that notifies when it's fully loaded, ensuring you can safely initialize and use its features at the right time.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Important</h3>
      <div class="contentContainer">
        <p>
          While the <code>defer</code> attribute ensures the script is executed after the HTML is parsed, it does not guarantee that the SDK script will always load last. In some cases, if the SDK loads faster than expected and the event listener is declared afterward, the <code>yuno-sdk-ready</code> event may have already fired — and your listener won't catch it. To avoid this, always define the listener before loading the SDK script.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

```html
<!-- First, set up the event listener -->
<script>
  window.addEventListener('yuno-sdk-ready', async () => {
    console.log('SDK loaded'); // The SDK is ready to use
    await yuno.initialize('publicKey');
  });
</script>

<!-- Then load the SDK -->
<script defer src="https://sdk-web.y.uno/v1.1/main.js"></script>
```

### 2. Inject the SDK dynamically using JavaScript

For developers who need more control over the SDK loading process, the dynamic JavaScript injection method provides enhanced flexibility. This approach allows you to:

* Programmatically load the SDK when needed
* Handle loading states and manage errors gracefully
* Control exactly when and how the SDK becomes available
* Coordinate SDK initialization with other application logic
* Implement custom error handling strategies

This method is particularly useful when you need precise control over the SDK's loading and initialization process.

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

To optimize performance and reduce latency, we recommend adding `preconnect` links as early as possible within the `<head>` tag of your HTML document. These links allow browsers to quickly connect to our servers before resources are actually requested. This proactive approach can significantly improve loading times, especially for the initial SDK setup and subsequent API calls.

````html
<!-- Improve performance with preconnect -->
<link rel="preconnect" href="https://sdk-web.y.uno" />
<link rel="preconnect" href="https://api.y.uno" />
<link rel="preconnect" href="https://sdk-web-card.prod.y.uno" />
````