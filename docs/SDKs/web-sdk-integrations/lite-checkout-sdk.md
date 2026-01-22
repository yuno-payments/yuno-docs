---
title: Lite Web SDK
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Lite Web SDK
  description: >-
    Complete guide to implement Yuno's Lite Web SDK for both payment and enrollment functionality
  robots: index
next:
  description: ''
---

<br />

> 👍 Recommended SDK
>
> We recommend using the [Web Seamless SDK](seamless-sdk-payment-web) for a smooth integration experience. This option provides a flexible payment solution with pre-built UI components and customization options.

This page provides a guide to get started with Yuno's Lite SDK (Web) payment and enrollment solutions. Whether you're looking to implement your first payment integration or enhance your existing setup, this guide provides all the information you need to create a seamless payment experience for your users.

> 📘 Web SDK Release
>
> This is the latest version with enhanced UI grouping and multilingual support.

## SDK Integration

Before proceeding with the Lite SDK implementation, see the [Web SDK Common Reference](doc:web-sdk-common-reference) for detailed instructions on how to properly integrate the SDK into your project.

The integration guide provides three flexible methods:

* **Method 1 (HTML)**: Add a single script tag to your HTML file. This is the simplest method, ideal for basic implementations and quick prototypes
* **Method 2 (Dynamic JavaScript)**: Load the SDK programmatically with custom error handling and loading states. Best for applications needing more control over the integration
* **Method 3 (NPM)**: Use our NPM package in modern JavaScript applications. This is our recommended approach, with dependency management, tree-shaking, and TypeScript support

For detailed implementation steps for each method, see the [Web SDK Common Reference](doc:web-sdk-common-reference).

## Improve performance using `preconnect`

Add `preconnect` links as early as possible within the `<head>` tag of your HTML document to optimize performance and reduce latency. These links allow browsers to quickly connect to our servers before resources are actually requested. This proactive approach can significantly improve loading times, especially for the initial SDK setup and subsequent API calls.

For detailed information, see the [Web SDK Common Reference](doc:web-sdk-common-reference#improve-performance-using-preconnect).

## Payment Implementation

Follow this step-by-step guide to implement and enable Yuno's Lite Web SDK payment functionality in your application.

> 📘 TypeScript Support
>
> If you are using TypeScript, Yuno provides a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) that you can use to see all available methods available in the Yuno Web SDK.

### Step 1: Initialize SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid **PUBLIC_API_KEY**. Check the [Get your API credentials](doc:developers-credentials) guide.

Like the example below, use the initialized class that is attributed to the `yuno`constant.

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

### Step 2: Start the checkout process

You will start the checkout process. To do it, use the `yuno.startCheckout` function and provide the necessary parameters.

The following table lists all required parameters and their descriptions. For optional parameters, go to [Complementary Features](#complementary-features).

| Parameter                         | Description                                                                                                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `checkoutSession`                 | Refers to the current payment's [checkout session](ref:create-checkout-session). Example: `438413b7-4921-41e4-b8f3-28a5a0141638`                                         |
| `elementSelector`                 | The element where the SDK will be mounted.                                                                                                                               |
| `countryCode`                     | Determines the country for which the payment process is being configured. See [Country coverage](doc:country-coverage-yuno-sdk) for supported countries and their codes. |
| `language`                        | Language for payment forms. Use any code listed in [Supported languages](doc:supported-languages). Example: `en-US`. Defaults to browser language when available.        |
| `onLoading`                       | Callback function to receive notifications about server calls or loading events during the payment process.                                                              |
| `showLoading`                     | Controls visibility of Yuno loading/spinner page during payment process. Default: `true`.                                                                                |
| `issuersFormEnable`               | Enables the issuer's form. Default: `true`.                                                                                                                              |
| `showPaymentStatus`               | Shows Yuno Payment Status page. Can be used when continuing a payment. Default: `true`.                                                                                  |
| `card.isCreditCardProcessingOnly` | Optional. When `true`, ensures all card transactions are processed as credit only. Useful in markets where cards can act as both credit and debit.                       |

```javascript
yuno.startCheckout({
  checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
  elementSelector: "#root",
  countryCode: "FR",
  language: "fr-FR",
  showLoading: true,
  issuersFormEnable: true,
  showPaymentStatus: true,
  card: {
    isCreditCardProcessingOnly: true,
    onChange: ({ error, data }) => {
      if (error) {
        console.log('Card form error:', error);
      } else {
        console.log('Card form data:', data);
      }
    },
  },
  onLoading: (args) => {
    console.log(args);
  },
  async yunoCreatePayment(oneTimeToken) {
    /**
     * The createPayment function calls the backend to create a payment in Yuno.
     * It uses the following endpoint https://docs.y.uno/reference/create-payment
     */
    await createPayment({ oneTimeToken, checkoutSession });
    yuno.continuePayment({ showPaymentStatus: true });
  },
});
```

> 📘 Transaction Types
>
> Payments can be initiated by the customer (CIT) or by the merchant (MIT). You find more information about their characteristics in [Stored credentials](/docs/stored-credentials).
>
> The step-by-step presented on this page refers to a customer-initiated transaction without the recurrence option. Typically, it's used in one-time online purchases, in-store purchases, ATM withdrawals, etc.

### Step 3: Mount the SDK

Next, you have to mount the SDK, presenting the checkout based on the payment method selected by your customer. Remember, when using the Lite SDK, you're responsible for displaying the payment methods and capturing the customer's selection. Access [Lite SDK (Payment)](doc:the-ultimate-checkout-lite) for additional information.

Use the `yuno.mountCheckoutLite()` function by selecting an HTML element and using a valid CSS selector (`#`, `.`, `[data-*]`) to display the checkout for the selected payment method.

```javascript
yuno.mountCheckoutLite({
  /**
   * can be one of 'PAYPAL' | 'PIX' | CARD
   */
  paymentMethodType: PAYMENT_METHOD_TYPE,
  /**
   * Vaulted token related to payment method type.
   * Only if you already have it
   * @optional
   */
  vaultedToken: VAULTED_TOKEN,
});
```

After mounting the SDK, the selected payment method flow will start automatically.

For PayPal, the PayPal payment sheet now opens immediately after the shopper selects PayPal—no extra confirmation click required.

> 📘 Google Pay and Apple Pay in Lite SDK
>
> Google Pay and Apple Pay are not available as built-in payment options in the Lite SDK. To use these payment methods, you must use the `mountExternalButtons` method. See [Mount external buttons](#mount-external-buttons) for more information.

### Step 4: Mount external buttons (Optional)

If you want to use Google Pay or Apple Pay in the Lite SDK, you can mount these payment buttons externally using the `mountExternalButtons` method. This method allows you to choose where each button is displayed in your UI.

```javascript
// Mount external buttons
await yuno.mountExternalButtons([
  {
    paymentMethodType: 'APPLE_PAY',
    elementSelector: '#apple-pay',
  },
  {
    paymentMethodType: 'GOOGLE_PAY',
    elementSelector: '#google-pay',
  },
]);
```

The `mountExternalButtons` method accepts an array of objects, each containing:

* `paymentMethodType`: Either `'APPLE_PAY'` or `'GOOGLE_PAY'`
* `elementSelector`: The CSS selector for the HTML element where the button should be rendered

### Unmounting external buttons

You can unmount a single external button:

```javascript
yuno.unmountExternalButton('APPLE_PAY');
```

Or unmount all external buttons at once:

```javascript
yuno.unmountAllExternalButtons();
```

### Step 5: Initiate the payment process

After the user has selected a payment method, remember to call `yuno.startPayment()` to initiate the payment flow. Below, you will find an example where `yuno.startPayment()` is called when the user clicks on `button-pay`:

```javascript
const PayButton = document.querySelector("#button-pay");

PayButton.addEventListener("click", () => {
  yuno.startPayment();
});
```

### Step 6: Get the OTT (one-time token)

Once the customer fills out the requested data in Yuno's payment forms, the SDK provides the one-time token. The configuration function `yunoCreatePayment(oneTimeToken)` is then triggered with the one-time token.

```javascript
yunoCreatePayment(oneTimeToken);
```

You can also use `tokenWithInformation` to receive any additional info the customer gives at checkout, such as installments or document type/number.

```javascript
yunoCreatePayment(oneTimeToken, tokenWithInformation);
```

> 📘 Loader Management
>
> The merchant is responsible for managing the loader. Yuno provides a default loader option, but merchants may implement their own loader if preferred. In that case, they are responsible for making the necessary configurations.

### Step 7: Create the payment

Once you have completed the steps described before, you will be able to create a payment. The back-to-back payment creation must be carried out using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant should call their backend to create the payment within Yuno, using the one-time token and the checkout session.

> 📘 Continue Payment Method
>
> Yuno recommends integrating the `continuePayment` method of the SDK after the payment is created. This is because certain asynchronous payment methods require additional action from the customer to complete the payment. The API will inform you of this scenario via the `sdk_action_required` field of the response, which will be returned as true. The `yuno.continuePayment()` function will display additional screens to customers, where they can carry out the necessary actions to complete the payment. If `sdk_action_required` is false, this step is not necessary.

## Enrollment Implementation

Follow this step-by-step guide to implement and enable Yuno's Lite Web SDK enrollment functionality in your application.

> 📘 TypeScript Library
>
> If you are using TypeScript, Yuno provides a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) that you can use to see all available methods available in the Yuno Web SDK.

### Step 1: Initialize SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid **PUBLIC_API_KEY**. Check the [Get your API credentials](https://docs.y.uno/docs/developers-credentials) guide if you do not have your credentials. In the example below, the initialized class is attributed to the `yuno`constant.

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

### Step 2: Create a customer session and an enrollment payment method object

Before continuing with the process, you will need to create a [customer session](ref:create-customer-session) and a [payment method object](ref:enroll-payment-method-checkout) to use in the setup of your SDK Lite integration for enrollment. While creating the payment method object, you will need to define which payment method is going to be available for your customer to enroll.

> 📘 Important
>
> The customer session and enrollment payment method object must be created on your **server-side** to keep your private API keys secure. The payment method type is set on the server-side, unlike other integrations where it may be set on the client-side.

### Server-side example

Create a customer session and enrollment payment method on your backend. This keeps your private API keys secure.

```javascript
// 1. Create customer session
const customerSession = await fetch(
  "https://api-sandbox.y.uno/v1/customers/sessions",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PRIVATE_SECRET_KEY}`,
    },
    body: JSON.stringify({
      customer_id: "your-customer-id",
      country: "US",
    }),
  }
).then((res) => res.json());

// 2. Create enrollment payment method
const enrollment = await fetch(
  `https://api-sandbox.y.uno/v1/customers/sessions/${customerSession.id}/payment-methods`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PRIVATE_SECRET_KEY}`,
    },
    body: JSON.stringify({
      type: "CARD",
    }),
  }
).then((res) => res.json());

// Return customerSession to your client
return customerSession;
```

### Client-side example

After receiving the `customerSession` from your server, initialize the Yuno SDK and mount the enrollment form on the client-side.

```javascript
// Initialize Yuno SDK
const yuno = await Yuno.initialize(PUBLIC_API_KEY);

// Mount the enrollment form
yuno.mountEnrollmentLite({
  customerSession, // Received from your server
  countryCode: "US",
  language: "en",
  showLoading: true,
  onLoading: (args) => {
    console.log(args);
  },
});
```

> 📘 Verify
>
> In case you want to verify cards (zero value authorization) before the enrollment, you can complete the `verify` struct while defining the payment method object for the customer session.

### Step 3: Mount the enrollment lite

The configuration and mounting are done in the same step for the Enrollment Lite. To do it, use the `yuno.mountEnrollmentLite` function and provide the necessary parameters. The following table lists all parameters and their descriptions.

| Parameter | Description |
| --- | --- |
| `customerSession` | Refers to the current payment's [customer session](ref:create-customer). Example: `e15648b0-fcd5-4799-a14c-cc463ae8a133`. |
| `country_code` | Country for the payment process. Use an `ENUM` value; see [Country Coverage](doc:country-coverage-yuno-sdk). |
| `language` | Language for payment forms. Use any code listed in [Supported languages](doc:supported-languages). Example: `en-US`. Defaults to browser language when available. |
| `showLoading` | Controls visibility of the Yuno loading/spinner page during the payment process. |
| `onLoading` | Required to receive notifications about server calls or loading events. |
| `elementSelector` | HTML element where the Yuno SDK is mounted. |
| `card` | Define specific settings for the credit card form. |
| `yunoEnrollmentStatus` | Callback after enrollment ends; receives `vaultedToken` and `status`. Status options: `CREATED`, `EXPIRED`, `REJECTED`, `READY_TO_ENROLL`, `ENROLL_IN_PROCESS`, `UNENROLL_IN_PROCESS`, `ENROLLED`, `DECLINED`, `CANCELED`, `ERROR`, `UNENROLLED`. |
| `issuersFormEnable` | Enable the issuer's form (bank list). |
| `texts` | Custom text for payment form buttons to match your application's language or branding. |
| `card.isCreditCardProcessingOnly` | Optional. Forces card transactions to process as credit only—useful where cards act as both credit and debit. |

The next code block presents an example of the Enrollment Lite parameter configuration and mounting.

```javascript
yuno.mountEnrollmentLite({
  customerSession: 'e15648b0-fcd5-4799-a14c-cc463ae8a133',
  /**
   * The complete list of country codes is available on https://docs.y.uno/docs/country-coverage-yuno-sdk
   */
  country_code: country,
  /**
  * Language for payment forms (see Supported languages)
  * Defaults to browser language when available
  */
  language: 'en-US',
  /**
   * Hide or show the Yuno loading/spinner page
   * Default is true
   * @optional
   */
  showLoading: true,
  /**
   * Required if you'd like to be informed if there is a server call
   * @param { isLoading: boolean, type: 'DOCUMENT' | 'ONE_TIME_TOKEN'  } data
   * @optional
   */
  onLoading: (args) => {
    console.log(args);
  },
  /**
   *  API card
   *  @optional
   */
  card: {
    /**
     * Mode render card can be step or extends
     * Default extends
     */
    type: "extends",
    /**
     * Write custom CSS to style the card form. Your CSS will be injected into the iframe.
     * Example:
     * `@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');
     *  .Yuno-front-side-card__name-label {
     *    color: red !important;
     *    font-family: 'Luckiest Guy' !important;
     *   }`
     */
    styles: '',
    /**
     * Show checkbox for save/enroll card
     * Default is false
     */
    cardSaveEnable: false,
    /**
     * Custom texts in Card forms buttons
     * Example:
     *
     *  texts: {
     *    cardForm?: {
     *      enrollmentSubmitButton?: string;
     *       paymentSubmitButton?: string;
     *     }
     *     cardStepper?: {
     *       numberCardStep?: {
     *         nextButton?: string;
     *       },
     *       cardHolderNameStep?: {
     *         prevButton?: string;
     *         nextButton?: string;
     *       },
     *       expirationDateStep?: {
     *         prevButton?: string;
     *         nextButton?: string;
     *       },
     *       cvvStep?: {
     *         prevButton?: string;
     *         nextButton?: string;
     *       }
     *     }
     *  }
     */
    texts: {},
    /**
     * Hide or show the document fields into card form
     * Default is true
     * @optional
     */
    documentEnable: true,
  },
  /**
   * Call back is called with the following object
   * @param {{
   *  status: 'CREATED'
   *    | 'EXPIRED',
   *    | 'REJECTED',
   *    | 'READY_TO_ENROLL',
   *    | 'ENROLL_IN_PROCESS',
   *    | 'UNENROLL_IN_PROCESS',
   *    | 'ENROLLED',
   *    | 'DECLINED',
   *    | 'CANCELED',
   *    | 'ERROR',
   *    | 'UNENROLLED',
   *  vaultedToken: string,
   * }}
   */
  yunoEnrollmentStatus: ({ status, vaultedToken}) => {
    console.log('status', { status, vaultedToken})
  },
  /**
   * If this is called the SDK should be mounted again
   * @param { error: 'CANCELED_BY_USER' | any }
   * @optional
   */
  yunoError: (error) => {
    console.log('There was an error', error)
  },
});
```

## `continuePayment` return value or null

For payment methods that require merchant-side action (e.g., when the payment provider requires a redirect URL in a webview), the `await yuno.continuePayment()` method will return either an object with the following structure or null:

```typescript
{
  action: 'REDIRECT_URL'
  type: string
  redirect: {
    init_url: string
    success_url: string
    error_url: string
  }
} | null
```

When the method returns an object, it allows you to handle your application's payment flows that require custom redirect handling. When it returns null, no additional merchant-side action is needed.

> 📘 Demo App
>
> In addition to the code examples provided, you can access the [Demo App](doc:demo-app) for a complete implementation of Yuno SDKs. The demo app includes working examples of all Yuno SDKs and can be cloned from the [GitHub repository](https://github.com/yuno-payments/yuno-sdk-web).

## Complementary features

Yuno Web SDK provides additional services and configurations you can use to improve customers' experience:

* [Mount external buttons](#mount-external-buttons)
* [Form loader](#form-loader)
* [Bank Issuer List](#form-of-the-issuer)
* [Render mode](#mode-of-form-rendering)
* [Card form configurations](#card-form-configurations)
  * [Save Card for future payments](#save-card-for-future-payments)
  * [Rendering modes](#rendering-modes)
  * [Text payment form buttons](#text-payment-form-buttons)
  * [Persist credit card form to retry payments](#persist-credit-card-form-to-retry-payments)
  * [Hide Pay button](#hide-pay-button)

### Mount external buttons

Use the `mountExternalButtons` method to render Google Pay and Apple Pay buttons in your custom UI. This method is required if you want to use these payment methods in the Lite SDK, as they are not available as built-in payment options.

```javascript
await yuno.mountExternalButtons([
  {
    paymentMethodType: 'APPLE_PAY',
    elementSelector: '#apple-pay',
  },
  {
    paymentMethodType: 'GOOGLE_PAY',
    elementSelector: '#google-pay',
  },
]);
```

#### Parameters

| Parameter           | Description                                                                                                    |
| :------------------ | :------------------------------------------------------------------------------------------------------------- |
| `paymentMethodType` | The payment method type. Must be either `'APPLE_PAY'` or `'GOOGLE_PAY'`.                                       |
| `elementSelector`   | The CSS selector for the HTML element where the button should be rendered (e.g., `'#apple-pay'`, `'.button'`). |

#### Unmounting buttons

You can unmount a single external button by payment method type:

```javascript
yuno.unmountExternalButton('APPLE_PAY');
```

Or unmount all external buttons at once:

```javascript
yuno.unmountAllExternalButtons();
```

### Form loader

Control the use of the loader.

| Parameter     | Description                                                                                                                                                                                                                         |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `showLoading` | You can hide or show the Yuno loading/spinner page. Enabling this option ensures that the loading component remains displayed until either the `hideLoader()` or `continuePayment()` function is called. The default value is true. |

```javascript
yuno.startCheckout({
  showLoading: true,
});
```

### Form of the issuer

| Parameter           | Description                                                                                |
| :------------------ | :----------------------------------------------------------------------------------------- |
| `issuersFormEnable` | Through this parameter, you can configure the SDK to enable the issuer's form (bank list). |

```javascript
yuno.startCheckout({
  issuersFormEnable: true,
});
```

### Mode of form rendering

> 📘 Enhanced Render Mode in Lite SDK v2.0
>
> The enhanced Lite SDK v2.0 provides advanced render mode capabilities that embed Yuno's checkout forms directly within your interface. This gives you complete control over the checkout journey, including loading, status, and payment input screens, with full visual customization and seamless UX integration.

<Table>
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
        This optional parameter determines how payment forms are displayed.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `type`: Either `'modal'` or `'element'`.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `elementSelector`: Required if `type` is `'element'`. Specifies where to render the form.
      </td>
    </tr>

    <tr>
      <td>
        `elementSelector`
      </td>

      <td>
        Required when `type` is `'element'`. Specifies where to mount the Yuno SDK.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **String** (Deprecated): ID or selector for mounting the SDK.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **Object**: Specify elements for APM and action forms:
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `apmForm`: Element to display the APM.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * `actionForm`: Element for the **Continue Payment** button, which opens a modal for completing provider-specific payment steps.
      </td>
    </tr>
  </tbody>
</Table>

```javascript
yuno.startCheckout({
  renderMode: {
    type: "modal",
    elementSelector: {
      apmForm: "#form-element",
      actionForm: "#action-form-element",
    },
  },
});
```

Below, you will find screenshots presenting the difference between the render modes `modal` and `elements` for the payment method list.

<Image align="center" border={false} src="https://files.readme.io/ea83f08344229a735fe646ff96fa0a0971ae3d35f4bbfeac9e7bab7663f4a156-caracteristicas_Complemetarias_web_1.png" />

You also can choose one of the render options for the card form, `step` and `extends`:

<Image align="center" border={false} src="https://files.readme.io/0842757d6b3b0fffb88ef9de4923b2e4b2d1d71100cb879eff892504c3a554b8-caracteristicas_Complemetarias_web_2.png" />

### Card form configurations

<Table>
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
        Configure settings for the credit card form:
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **`type`**: Card form layout type. Options: `step` or `extends`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **`styles`**: Write custom CSS to style the card form. Your CSS will be injected into the iframe.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **`cardSaveEnable`**: Show checkbox to save or enroll the card. Defaults to `false`.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **`texts`**: Custom text for the card form buttons.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **`cardNumberPlaceholder`**: Optional. Custom placeholder text for the card number field. Supports alphanumeric characters, spaces, and UTF-8 characters for localization. If not provided, the SDK uses the default English placeholder ("Card number"). This customization does not affect card formatting, masking, BIN logic, or validation.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **`hideCardholderName`**: Optional. When set to `true`, the cardholder name field is hidden in the card form. When not specified or set to `false`, the cardholder name field is displayed (default behavior). Hiding the field does not affect PAN, expiry, CVV collection, BIN logic, or 3DS/provider validations.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **`onChange`**: Callback function triggered when card information state changes. Called when card-related events occur, such as during data fetching (loading), after completion, when a network is selected (e.g., Visa, Mastercard), or when the card form is reset. Receives `{error, data}` where `data` contains card IIN (Issuer Identification Number, also known as BIN - Bank Identification Number) information and installment options. The BIN (first 6 digits of the card number) can be used for real-time tax calculations. Works the same as the secure fields `options.onChange` method.
      </td>
    </tr>
  </tbody>
</Table>

```javascript
yuno.startCheckout({
  card: {
    type: "extends",
    styles: "",
    cardSaveEnable: false,
    texts: {},
    cardNumberPlaceholder: "Enter card number", // Optional: Custom placeholder text
    hideCardholderName: false, // Optional: Set to true to hide cardholder name field
    isCreditCardProcessingOnly: true,
    onChange: ({ error, data }) => {
      if (error) {
        console.log('Card form error:', error);
      } else {
        console.log('Card form data:', data);
      }
    },
  },
});
```

#### Save card for future payments

In addition, you can display a checkbox for saving or enrolling cards using the `cardSaveEnable: true`. Below are examples of the checkbox for both card form renders.

<Image border={false} src="https://files.readme.io/bd62c09d3eaf421c95d0df7574f346d99b863383f86cdb3d570d344f7ecf2b3b-complementary-features.png" />

#### Rendering modes

Below you find screenshots presenting the difference between the following:

* Render modes `modal` and `elements` for the payment method list
* Render modes `step` and `extends` for the credit card form

<Image border={false} src="https://files.readme.io/6af3c546704cb7a9474fecdf1dc9a139b611ae585ae72074faeb2a6ea3c620b0-caracteristicas_Complemetarias_web_1.png" />

You also can choose one of the render options for the card form, `step` and `extends`:

<Image border={false} src="https://files.readme.io/c9b56c608ae9542d7f78dd8b9406054eee82169a3b8f3c3b22c8338d9b797939-caracteristicas_Complemetarias_web_2.png" />

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
   });
   ```
2. In case the transaction is rejected, you will need to:
   1. Execute the method `yuno.notifyError() `to delete the previously entered CVV for the first transaction.
   2. Create a new checkout session and update the SDK with the new one by executing `yuno.updateCheckoutSession(checkoutsession)`
3. Continue with the new checkout and one-time use token with the regular payment flow.

#### Hide Pay button

You can hide the **Pay** button when presenting the Card or Customer Data Forms. To control this feature, you'll set `showPayButton` to `false` when starting the checkout with the `startCheckout` function. The code block below presents an example of how to hide the payment button:

```javascript
yuno.startCheckout({
  /**
   * Hide (false) or show (true) the customer or card form pay button
   * @default true
   * @optional
   */
  showPayButton: false,
});
```

The following images present examples of the Customer Data Form with and without the Pay button:

<Image border={false} src="https://files.readme.io/f2fd10924004e11c3776699fe301afd21259eba255f9329f83e3276c19010b64-Card_boton.png" />

The following images present examples of the Card Form with and without the **Pay** button:

<Image border={false} src="https://files.readme.io/87bfe55c56266fb1d8ffc7cd1f8648840b06353a960b7d2bb7d27cb174eaae53-Card_boton_1.png" />

If you hide the **Pay** button, you will need to start the one-time token creation through your code. To create the one-time token and continue the payment in your backend, call the `submitOneTimeTokenForm` function. The code block below presents how to use the `submitOneTimeTokenForm` function.

```javascript
/**
 * This function triggers the same functionality that is called when the customer clicks on the pay form button. This approach does not work if you choosed step for rendering mode.
 */
yuno.submitOneTimeTokenForm();
```

### SDK customizations

Use the [SDK Customizations](https://docs.y.uno/docs/sdk-customizations-ios) to change the SDK appearance to match your brand.

## Stay Updated

Visit the [changelog](https://docs.y.uno/changelog) for the latest SDK updates and version history.

<br />

