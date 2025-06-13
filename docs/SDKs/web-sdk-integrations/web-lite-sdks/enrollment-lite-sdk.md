---
title: Lite SDK (Enrollment Web)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Lite SDK (Enrollment)
  description: >-
    To enable Enrollment Lite functionality, the first step is to make sure to
    include the Yuno SDK file in your webpage before closing the `<body>`.
  robots: index
next:
  description: ''
---
Follow this step-by-step guide to implement and enable Yuno's Lite Web SDK enrollment functionality in your application.

## Step 1: Include the library in your project

Before proceeding with the Lite SDK implementation, please refer to the [Yuno SDK Integration Guide](doc:yuno-sdk-integration-guide) for detailed instructions on how to properly integrate the SDK into your project.

The integration guide provides three flexible methods:

1. Direct HTML script inclusion
2. Dynamic JavaScript injection
3. NPM module installation

Choose the integration method that best suits your development workflow and technical requirements. After completing the SDK integration, you can proceed with the following steps to implement the lite enrollment functionality.

> 📘 TypeScript Library
>
> If you are using TypeScript, Yuno provides a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) that you can use to see all available methods available in the Yuno Web SDK.

## Step 2: Initialize SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid **PUBLIC\_API\_KEY**. Check the [Get your API credentials](https://docs.y.uno/docs/developers-credentials) guide if you do not have your credentials. In the example below, the initialized class is attributed to the `yuno`constant.

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY)
```

## Step 3: Create a customer session and an enrollment payment method object

Before continuing with the process, you will need to create a [customer session](ref:create-customer-session) and a [payment method object](ref:enroll-payment-method-checkout) to use in the setup of your SDK Lite integration for enrollment. While creating the payment method object, you will need to define which one is going to be available for your customer to enroll (in the case of SDK Lite, only CARD is available).

> 📘 Verify
>
> In case you want to verify cards (zero value authorization) before the enrollment, you can complete the `verify` struct while defining the payment method object for the customer session.

## Step 4: Mount the enrollment lite

The configuration and mounting are done in the same step for the Enrollment Lite. To do it, use the `yuno.mountEnrollmentLite` function and provide the necessary parameters. The following table lists all parameters and their descriptions.

| Parameter                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customerSession`                 | Refers to the current payment's [customer session](ref:create-customer). `Example: 'e15648b0-fcd5-4799-a14c-cc463ae8a133'`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `country_code`                    | This parameter specifies the country for which the payment process is being set up. Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk) page.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `language`                        | Defines the language to be used in the payment forms. You can set it to one of the available language options: es (Spanish), en (English), pt (Portuguese), fil (Filipino), id (Indonesian), ms (Malay), or th (Thai).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `showLoading`                     | Control the visibility of the Yuno loading/spinner page during the payment process.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `onLoading`                       | Required to receive notifications about server calls or loading events during the payment process.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `elementSelector`                 | Specifies the HTML element where you want to mount the Yuno SDK. The SDK will be rendered within this element.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `card`                            | Define specific settings for the credit card form.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `yunoEnrollmentStatus`            | Define a call back to run after the enrollment process ends. It is called with `vaultedToken` and `status` parameters. The `status` returned can be one of:  \  ▪️ `CREATED`: It is an initial and transitory state, only indicating that it is created and updated to another state.  \  ▪️ `EXPIRED`: For asynchronous enrollments, such as MercadoPago, where the user has to take an external action and may never do so.  \  ▪️ `REJECTED`: We reject it from our side. It may be because they entered incorrect Yuno credentials or are sending some data incorrectly.  \  ▪️ `READY_TO_ENROLL`: It follows `CREATED` if everything is okay, indicating that the enrollment has started.  \  ▪️ `ENROLL_IN_PROCESS`: For asynchronous enrollments, like MercadoPago, where the user has to take an action externally. It indicates that the user is performing the action.  \  ▪️ `UNENROLL_IN_PROCESS`: For asynchronous unenrollments, in case the provider has an asynchronous response. Currently, there are none.  \  ▪️ `ENROLLED`: Successfully enrolled.  \  ▪️ `DECLINED`: The provider declined the enrollment. Does not include cards.  \  ▪️ `CANCELED`: The enrollment flow is canceled halfway.  \  ▪️ `ERROR`: There was an ERROR in the service or credentials.  \  ▪️ `UNENROLLED`: The previously enrolled payment method has been unenrolled. |
| `issuersFormEnable`               | Enable the issuer's form (bank list).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `texts`                           | Provide custom text for payment form buttons to match your application's language or branding.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `card.isCreditCardProcessingOnly` | Enables you to ensure that all card transactions are processed as credit only. This option is helpful in markets where cards can act as both credit and debit. To enable, set the `isCreditCardProcessingOnly` to `true` to ensure that all card transactions are processed as credit. This parameter is not required.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

The next code block presents an example of the Enrollment Lite parameter configuration and mounting.

```javascript
yuno.mountEnrollmentLite({
  customerSession: 'e15648b0-fcd5-4799-a14c-cc463ae8a133',
  /**
   * The complete list of country codes is available on https://docs.y.uno/docs/country-coverage-yuno-sdk
   */
  country_code: country,
  /**
  * Language can be one of en, fr, jp
  * Default is browser language
  */
  language: 'en',
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
  }
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
     * You can edit card form styles
     * Only you should write css, then it will be injected into the iframe
     * Example 
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

<br />

> 📘 Rendering Mode
>
> By default, Yuno SDK renders as a modal. However, you can specify the element where the SDK will render. To learn how to use the Lite SDK to perform MIT operations, access the [Mode of form rendering](https://docs.y.uno/docs/enrollment-lite-sdk#mode-of-form-rendering) section.

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
> In addition to the code examples provided, you can access the [Demo App](#test) for a complete implementation of Yuno SDKs or go directly to the [HTML](https://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout.html) and [JavaScript](https://github.com/yuno-payments/yuno-sdk-web/blob/main/static/checkout.js) checkout demos available on GitHub.

## Complementary features

Yuno Web SDK provides additional services and configurations you can use to improve customers' experience:

* [Loader](#loader)
* [Mode of form rendering](#mode-of-form-rendering)
* [Card form configuration](#card-form-configuration)
  * [Text payment form button](#text-payment-form-button)
* [SDK Customization](#sdk-customization)

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

### Mode of form rendering

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

Below, you will find screenshots presenting the difference between the render modes `modal` and `elements` for the payment method list.

<Image align="center" src="https://files.readme.io/ea83f08344229a735fe646ff96fa0a0971ae3d35f4bbfeac9e7bab7663f4a156-caracteristicas_Complemetarias_web_1.png" />

You also can choose one of the render options for the card form, `step` and `extends`:

<Image align="center" src="https://files.readme.io/0842757d6b3b0fffb88ef9de4923b2e4b2d1d71100cb879eff892504c3a554b8-caracteristicas_Complemetarias_web_2.png" />

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

        * `type`: `step` or `extends`
        * `styles`: You can edit card form styles. Only you should write CSS, then it will be injected into the iframe.
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
    texts: {}
  },
})
```

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

### SDK customizations

Use the [SDK Customizations](https://docs.y.uno/docs/sdk-customizations-ios) to change the SDK appearance to match your brand.

## What's next?

You can check the additional configurations from the Lite SDK by accessing the [Complementary Features](doc:enrollment-lite-sdk-complementary-features) or the [SDK Customizations](doc:sdk-customizations), which enable you to change the SDK appearance to match your brand.