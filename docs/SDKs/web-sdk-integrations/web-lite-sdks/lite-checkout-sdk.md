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
<HTMLBlock>{`
<body>
  <div class="infoBlockContainer ">
    <div class="verticalLine"></div>
    <div>
      <h3>Web SDK v1.1 release</h3>
      <div class="contentContainer">
        <p>
          v1.1 introduces enhancements to 3DS, performance, security, and user experience. To learn more, <a href="https://docs.y.uno/docs/yuno-web-sdk-v11">visit the Web SDK v1.1 page</a>.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<style>
  .tabs {
    display: flex;
    border-bottom: 2px solid #ddd;
    margin-bottom: 20px;
  }

  input[type="radio"] {
    display: none;
  }

  label {
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
  label:focus {
    color: #000;
  }

  .tab-content {
    display: none;
  }

  /* Show content when corresponding radio button is checked */
  #webSDKv10:checked~.tab-content#webSDKv10,
  #webSDKv11:checked~.tab-content#webSDKv11 {
    display: block;
  }

  /* Style active tab */
  #webSDKv10:checked~.tabs label[for="webSDKv10"],
  #webSDKv11:checked~.tabs label[for="webSDKv11"] {
    color: #000;
    border-bottom: 2px solid #513CE1;
  }
</style>

<body>
`}</HTMLBlock>

## Choose your integration method

Let's help you choose the integration method that best fits your needs. Each approach has specific advantages, and selecting the right one depends on your development environment, technical requirements, and preferences.

* **[Method 1 (HTML)](#1-add-the-sdk-script-directly-in-html)**: Add a single script tag to your HTML file. This is the simplest method, ideal for basic implementations and quick prototypes
* **[Method 2 (Dynamic JavaScript)](#2-inject-the-sdk-dynamically-using-javascript)**: Load the SDK programmatically with custom error handling and loading states. Best for applications needing more control over the integration
* **[Method 3 (NPM)](#3-use-the-npm-module)**: Use our NPM package in modern JavaScript applications. This is our recommended approach, with dependency management, tree-shaking, and TypeScript support

### 1. Add the SDK script directly in HTML

The simplest way to integrate the Yuno SDK is by adding a `<script>` tag to your HTML file. This method provides a quick implementation while maintaining proper asynchronous loading. The SDK exposes an event that notifies when it's fully loaded, ensuring you can safely initialize and use its features at the right time.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer ">
    <div class="verticalLine"></div>
    <div>
      <h3>Important</h3>
      <div class="contentContainer">
        <p>
          While the <code>defer</code> attribute ensures the script is executed after the HTML is parsed, it doesn't guarantee that the SDK script will always load last. In some cases, if the SDK loads faster than expected and the event listener is declared afterward, the <code>yuno-sdk-ready</code> event may have already fired — and your listener won't catch it. To prevent this, always define the listener before loading the SDK script.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

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

<HTMLBlock>{`
  </div>

  <input type="radio" id="webSDKv11" name="tabs" checked>
  <input type="radio" id="webSDKv10" name="tabs">
  <div class="tabs">
    <label for="webSDKv11">Yuno Web SDK v1.1</label>
    <label for="webSDKv10">Yuno Web SDK v1.0</label>
  </div>

  <div class="tab-content" id="webSDKv11">
Follow this step-by-step guide to implement and enable Yuno's Lite Web SDK v1.1 functionality in your application.

## Step 1: Include the library in your project

Ensure the Yuno SDK file is included in your webpage before closing the `</body>` tag. Refer to the example below:

```html
<script src="https://sdk-web.y.uno/v1.1/static/js/main.min.js"></script>
```

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer ">
    <div class="verticalLine"></div>
    <div>
      <h3>TypeScript library</h3>
      <div class="contentContainer">
        <p>
          If you are using TypeScript, Yuno provides a <a href="https://www.npmjs.com/package/@yuno-payments/sdk-web-types">library</a> that you can use to see all available methods available in the Yuno Web SDK.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Step 2: Initialize SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid **PUBLIC\_API\_KEY**. Check the [Get your API credentials](doc:developers-credentials) guide.

Like the example below, use the initialized class that is attributed to the `yuno`constant.

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY)
```

## Step 3: Start the checkout process

You will start the checkout process. To do it, use the `yuno.startCheckout` function and provide the necessary parameters.

The following table lists all required parameters and their descriptions. For optional parameters, go to [Complementary Features](doc:lite-checkout-sdk#complementary-features).

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `checkoutSession`
      </td>

      <td>
        Refers to the current payment's [checkout session](ref:create-checkout-session).
        `Example: '438413b7-4921-41e4-b8f3-28a5a0141638'`
      </td>
    </tr>

    <tr>
      <td>
        `country_code`
      </td>

      <td>
        This parameter determines the country for which the payment process is being configured. The complete list of supported countries and their country code is available on the [Country coverage](doc:country-coverage-yuno-sdk) page.
      </td>
    </tr>

    <tr>
      <td>
        `language`
      </td>

      <td>
        Defines the language to be used in the payment forms. You can set it to one of the available language options: es (Spanish), en (English), pt (Portuguese), fil (Filipino), id (Indonesian), ms (Malay), or th (Thai).
      </td>
    </tr>

    <tr>
      <td>
        `onLoading`
      </td>

      <td>
        Required to receive notifications about server calls or loading events during the payment process.
      </td>
    </tr>

    <tr>
      <td>
        `showLoading`
      </td>

      <td>
        Control the visibility of the Yuno loading/spinner page during the payment process. By default, it's `true`.
      </td>
    </tr>

    <tr>
      <td>
        `issuersFormEnable`
      </td>

      <td>
        Enables the issuer's form. By default, it's `true`.
      </td>
    </tr>

    <tr>
      <td>
        `showPaymentStatus`
      </td>

      <td>
        Shows the Yuno Payment Status page. You can use this option when continuing a payment as well. By default, it's `true`.
      </td>
    </tr>

    <tr>
      <td>
        `card.isCreditCardProcessingOnly`
      </td>

      <td>
        Enables you to ensure that all card transactions are processed as credit only. This option is helpful in markets where cards can act as both credit and debit.
        To enable, set the `isCreditCardProcessingOnly` to `true` to ensure that all card transactions are processed as credit.
        This parameter is not required.
      </td>
    </tr>
  </tbody>
</Table>

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

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Customer and merchant-initiated transactions</h3>
      <div class="contentContainer">
        <p>
					Payments can be initiated by the customer (CIT) or by the merchant (MIT). You find more information about their characteristics in <a href="/docs/stored-credentials">Stored credentials</a>. 
        </p>
        <p>
					The step-by-step presented on this page refers to a customer-initiated transaction without the recurrence option. Typically, it's used in one-time online purchases, in-store purchases, ATM withdrawals, etc.
        </p>       
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer ">
    <div class="verticalLine"></div>
    <div>
      <h3>Rendering mode</h3>
      <div class="contentContainer">
        <p>
          By default, Yuno SDK renders as a modal. However, you can specify the element where the SDK will render. To learn how to use the Lite SDK to perform MIT operations, access the <a href="doc:lite-checkout-sdk#mode-of-form-rendering">Mode of form rendering</a> section.  
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

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

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer alert">
    <div class="verticalLineAlert"></div>
    <div>
      <h3>Important</h3>
      <div class="contentContainer">
        <p>
          The merchant is responsible for handling the loader. Yuno offers an option to use our loader; however, the merchant can use their own loader and must make the corresponding configurations.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Step 7: Create the Payment

Once you have completed the steps described before, you will be able to create a payment. The back-to-back payment creation must be carried out using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant should call their backend to create the payment within Yuno, using the one-time token and the checkout session.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Continue method</h3>
      <div class="contentContainer">
        <p>
          Yuno recommends you integrate the <code>continuePayment</code> method of the SDK after the payment is created because certain asynchronous payment methods require additional action from the customer to complete it. The API will inform you of this scenario via the <code>sdk_action_required</code> field of the response, which will be returned as true. The <code>yuno.continuePayment()</code> function will display the additional screens to the customers, where they can carry out the necessary actions to complete the payment. Otherwise, this step is not necessary.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

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

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `showLoading`
      </td>

      <td>
        You can hide or show the Yuno loading/spinner page. Enabling this option ensures that the loading component remains displayed until either the `hideLoader()` or `continuePayment()` function is called.
        The default value is true.
      </td>
    </tr>
  </tbody>
</Table>

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

### Mode of form rendering

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer ">
    <div class="verticalLine"></div>
    <div>
      <h3>Lite SDK v2.0.0 - Enhanced Render Mode</h3>
      <div class="contentContainer">
        <p>
          The enhanced Lite SDK v2.0 provides advanced render mode capabilities that embed Yuno's checkout forms directly within your interface. This gives you complete control over the checkout journey, including loading, status, and payment input screens, with full visual customization and seamless UX integration.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `renderMode`
      </td>

      <td>
        This parameter is optional. It determines the mode in which the payment forms will be displayed.

        * `type`: can be one of `modal` or `element`.
        * `elementSelector`: Element where the form will be rendered. Only required if `type `is `element`.
      </td>
    </tr>

    <tr>
      <td>
        `elementSelector`
      </td>

      <td>
        Required only if the type is `element`. Specifies the HTML elements where you want to mount the Yuno SDK. You can specify the elements using one of the following options:

        * **String (Deprecated)**: Provide the ID or selector of the element where the SDK should be mounted.
        * **Object**: Specify the elements for mounting the APM and action forms. You need to provide the element for the `apmForm`, which is where the APM is displayed, and the element for the `actionForm`, where the Continue Payment button appears. This button triggers a modal that shows the steps to complete a payment with a provider. For example, with PIX, it displays a QR code.
      </td>
    </tr>
  </tbody>
</Table>

```javascript
yuno.startCheckout({
  renderMode: {
    /**
     * Type can be one of `modal` or `element`
     * By default the system uses 'modal'
     * It is optional
     */
    type: 'modal',
    /**
     * Element where the form will be rendered.
     * It is optional
     * Can be a string (deprecated) or an object with the following structure:
     * {
     *   apmForm: "#form-element",
     *   actionForm: "#action-form-element"
     * }
     */
    elementSelector: {
      apmForm: "#form-element",
      actionForm: "#action-form-element"
    } 
  },
})
```

### Card form configurations

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `card`
      </td>

      <td>
        Define specific settings for the credit card form:

        * `type`: `step` o `extends`
        * `styles`: You can edit card form styles. Only you should write css, then it will be injected into the iframe.
        * `cardSaveEnable`: Show checkbox for save/enroll card. The default value is false.
        * `texts`: Custom texts in the Card forms buttons.
      </td>
    </tr>
  </tbody>
</Table>

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

In addition, you can display a checkbox for saving or enrolling cards using the `cardSaveEnable: true`. Below are examples of the checkbox for both card form renders.

<Image align="center" src="https://files.readme.io/bd62c09d3eaf421c95d0df7574f346d99b863383f86cdb3d570d344f7ecf2b3b-complementary-features.png" />

#### Rendering modes

Below you find screenshots presenting the difference between the following:

* Render modes `modal` and `elements` for the payment method list
* Render modes `step` and `extends` for the credit card form

<Image align="center" src="https://files.readme.io/6af3c546704cb7a9474fecdf1dc9a139b611ae585ae72074faeb2a6ea3c620b0-caracteristicas_Complemetarias_web_1.png" />

You also can choose one of the render options for the card form, `step` and `extends`:

<Image align="center" src="https://files.readme.io/c9b56c608ae9542d7f78dd8b9406054eee82169a3b8f3c3b22c8338d9b797939-caracteristicas_Complemetarias_web_2.png" />

#### Text payment form buttons

| Parameter | Description                                                                                    |
| :-------- | :--------------------------------------------------------------------------------------------- |
| `texts`   | Provide custom text for payment form buttons to match your application's language or branding. |

```javascript
yuno.startCheckout({
  texts: {
    customerForm?: {
      submitButton?: string;
    }
    paymentOtp?: {
      sendOtpButton?: string;
    }
  }
})
```

#### Persist credit card form to retry payments

If a transaction is rejected, you can use the credit card form to retry a payment after the customer has entered the credit card details. To do that, you will need to:

1. Add the following parameter while initializing the SDK to persist the credit card form after the one-time use token is created:
   ```javascript
   yuno.startCheckout({
     automaticallyUnmount: false,
   })
   ```
2. In case the transaction is rejected, you will need to:
   1. Execute the method `yuno.notifyError() `to delete the previously entered CVV for the first transaction.
   2. Create a new checkout session and update the SDK with the new one by executing `yuno.updateCheckoutSession(checkoutsession)`
3. Continue with the new checkout and one-time use token with the regular payment flow.

#### Hide Pay button

You can hide the Pay button when presenting the Card or Customer Data Forms. To control this feature, you'll set `showPayButton` to `false` when starting the checkout with the `startCheckout` function. The code block below presents an example of how to hide the payment button:

```javascript
yuno.startCheckout({
  /**
   * Hide (false) or show (true) the customer or card form pay button
   * @default true
   * @optional
   */
  showPayButton: false,
})
```

The following images present examples of the Customer Data Form with and without the Pay button:

<Image align="center" src="https://files.readme.io/f2fd10924004e11c3776699fe301afd21259eba255f9329f83e3276c19010b64-Card_boton.png" />

The following images present examples of the Card Form with and without the Pay button:

<Image align="center" src="https://files.readme.io/87bfe55c56266fb1d8ffc7cd1f8648840b06353a960b7d2bb7d27cb174eaae53-Card_boton_1.png" />

If you hide the Pay button, you will need to start the one-time token creation through your code. To create the one-time token and continue the payment in your backend, call the `submitOneTimeTokenForm` function. The code block below presents how to use the `submitOneTimeTokenForm` function.

```javascript
/**
 * This function triggers the same functionality that is called when the customer clicks on the pay form button. This approach does not work if you choosed step for rendering mode.
 */
yuno.submitOneTimeTokenForm()
```

## What's next?

Learn about the additional configurations from the Lite SDK accessing [Complementary Features](doc:complementary-features-full-sdk). You can also access other functions available on the Yuno Web SDK:

* [SDK Customizations](doc:sdk-customizations): Change the SDK appearance to match your brand
* [Payment Status](doc:payment-status): Update the user about the payment process
* [Mercado Pago Checkout Pro webview handling](doc:complementary-features-full-sdk#mercado-pago-checkout-pro-webview-handling): Learn how to handle Mercado Pago Checkout Pro integration in webview environments
* [3DS Setup SDK](doc:3ds-setup-sdk): Integrate 3DS into your payment flow