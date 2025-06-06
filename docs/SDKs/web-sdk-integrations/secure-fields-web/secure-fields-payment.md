---
title: Secure Fields (Payment)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Follow this step-by-step guide to implement and enable Yuno's Secure Fields checkout functionalities in your application.

## Step 1: Include the library in your project

Before proceeding with the Secure Fields implementation, please refer to the [Yuno SDK Integration Guide](doc:yuno-sdk-integration-guide) for detailed instructions on how to properly integrate the SDK into your project.

The integration guide provides three flexible methods:

1. Direct HTML script inclusion
2. Dynamic JavaScript injection
3. NPM module installation

Choose the integration method that best suits your development workflow and technical requirements. After completing the SDK integration, you can proceed with the following steps to implement the secure fields functionality.

<HTMLBlock>{`
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
`}</HTMLBlock>

## Step 2: Initialize secure fields with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid **PUBLIC\_API\_KEY**. Check the [Get your API credentials](https://docs.y.uno/docs/developers-credentials) guide.

Like the example below, use the initialized class that is attributed to the `yuno`constant.

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY)
```

## Step 3: Start the checkout process

You will start the checkout process. To do it, use the `secureFields` function and provide the necessary configuration parameters.

The essential parameters are the `country_code`, which determines the country for which the payment process is configured, and `checkoutSession`, which refers to the current payment's checkout session.  The next code block presents an example of the parameter configuration.

The following table lists all required parameters and their descriptions.

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
        `country_code`
      </td>

      <td>
        This parameter specifies the country for which the payment process is being set up.
        Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk) page.
      </td>
    </tr>

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
        `installmentsEnable`
      </td>

      <td>
        This parameter is optional and is set false by default. If set True, the installments set for the account will be shown as a secure field.
      </td>
    </tr>
  </tbody>
</Table>

```javascript
  const secureFields = yuno.secureFields({
    /**
     * The complete list of country codes is available on https://docs.y.uno/docs/country-coverage-yuno-sdk
     */
    country_code: country,
     /**
     * Should be added her or in the token generation
     * @optional
     */
    checkoutSession,
    installmentsEnable: false,
  })
```

<HTMLBlock>{`
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
`}</HTMLBlock>

## Step 4: Mount the Secure Fields

After defining the parameters, you will define, configure, and mount the Secure Fields. For each Secure Field, you need to define the `name` and `options` when creating it with the `secureFields.create` function.

The table below presents all configurations available:

| Parameters                      | Description                                                                                                                                                                         |
| :------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                          | The available names for field names are **cvv**, **pan**, or **expiration**.                                                                                                        |
| `options.placeholder`           | Default placeholder for the field.                                                                                                                                                  |
| `options.styles`                | Additional CSS styles for the current field.                                                                                                                                        |
| `options.label`                 | Field visible label.                                                                                                                                                                |
| `options.showError`             | Defines if errors will be shown. Available options are `true` and `false`.                                                                                                          |
| `options.onChange`              | An auxiliary function that can be configured and will run when the field content changes. Indicates if the fields have errors or additional data.                                   |
| `options.onBlur`                | An auxiliary function that can be configured and will run when blurring from the input.                                                                                             |
| `options.validateOnBlur`        | Change the validation behavior, improving the user experience by providing validation feedback after the field loses focus. It is an optional parameter that is `false` as default. |
| `options.onFocus`               | An auxiliary function that can be configured and will run when focussing on the input.                                                                                              |
| `options.onRenderedSecureField` | An auxiliary function that can be configured and will run when the element finishes rendering.                                                                                      |
| `options.errorMessage`          | This allows for the definition of the field's error message.                                                                                                                        |
| `options.inputMode`             | *(v1.2+ only)* Defines the type of keyboard to display on mobile devices. Possible values: `'numeric'` (default) or `'text'`.                                                      |

Once you have set the parameter, you will render the created Secure Field with the `render` function by selecting an HTML element using a valid CSS selector (`#`, `.`, `[data-*]`).

The following code block presents an example of the parameter configuration for three Secure Fields, and as they are mounted, the fields are presented to the user.

```javascript
/**
   * interface SecureField {
   *  render(elementSelector: string): void
   * 
   *  clearValue(): void
   * 
   *  setError(errorMessage: string): void
   * 
   *  updateProps(args: Record<string, unknown>): void
   * 
   *  focus(): void
   * 
   *  validate(): void
   * 
   *  unmountSync(): Promise<void>
   * }
   */  
const secureNumber = secureFields.create({
     /**
     * name can be 'cvv' | 'pan' | 'expiration'
    */
    name: 'pan',
    options: {
      placeholder: '0000 0000 0000 0000',
      /**
       * you can edit card form styles
       * only you should write css then it will be injected into the iframe
       * example 
       * `@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');
       *  .Yuno-text-field__content.focus label.Yuno-text-field__label {
       *    color: red;
       *    font-family: 'Luckiest Guy' !important;
       *   }`
       */
      styles: ``,
      label: 'Card Number',
      showError: true,
      errorMessage: "Custom Error",
      validateOnBlur: false,
      // Indicates if the field has an error
      onChange: ({ error,data }) => {
      /**
       * in data.installments you could receive an installments plan list information 
       regarding the installments plan set for your account and chosen by the customer
    		[{
            installmentId: string;
            installment: number;
            amount: {
                currency: string;
                value: string;
                total_value: string;
            } | undefined;
        }]
       */
        /**
       * in data.cardIIN you can receive card_data
    		[{
            "id": "436c457c-1234-4e5e-b51d-1814e67d696a",
            "iin": "411111",
            "scheme": "VISA",
            "issuer_name": "JPMORGAN CHASE BANK N A",
            "issuer_code": null,
            "brand": "VISA",
            "type": "CREDIT",
            "category": "CREDIT",
            "country_code": "US",
            "country_name": "United States of America",
            "website": "https://www.chase.com",
            "phone": {
                "country_code": null,
                "number": "+ (1) 212-270-6000"
            },
            "address": {
                "address_line_1": null,
                "address_line_2": null,
                "city": null,
                "country": null,
                "state": null,
                "zip_code": null
            }
        }]
       */
       /**
       * in data.isCardIINLoading you can receive a true or false indicating if the card iin search is being excecuted.
       */
       /**
       * in data.isInstallmentLoading you can receive a true or false indicating if the installments search is being excecuted.
       */
        if (error) {
          console.log('error_pan')
        } else {
          console.log('not_error_pan')
        }
      },
      // Trigger when blurring from input
      onBlur() {
        console.log('blur_pan')
      },
      // Trigger when focussing on input
      onFocus: () => {
        console.log('focus_pan')
      },
      // Trigger when input has finished rendering 
      onRenderedSecureField: ()=> {
        console.log('render completed')
      }
    },
  })

	// Renders into specified element
  secureNumber.render('#pan')

  const secureExpiration = secureFields.create({
    /**
     * Fields name, can be 'cvv' | 'pan' | 'expiration'
     */
    name: 'expiration',
    // All options are optional
    options: {
      placeholder: 'MM / YY',
      /**
       * you can edit card form styles
       * only you should write css then it will be injected into the iframe
       * example 
       * `@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');
       *  .Yuno-text-field__content.focus label.Yuno-text-field__label {
       *    color: red;
       *    font-family: 'Luckiest Guy' !important;
       *   }`
       */
      styles: ``,
      label: 'Card Expiration',
      showError: true,
      errorMessage: "Custom Error",
      // Indicates if the fields has error
      onChange: ({ error }) => {
        if (error) {
          console.log('error_expiration')
        } else {
          console.log('not_error_expiration')
        }
      },
      // Trigger when blurring from input
      onBlur() {
        console.log('blur_expiration')
      },
      // Trigger when focussing on input
      onFocus: () => {
        console.log('focus_expiration')
      },
      // Trigger when input has finished rendering 
      onRenderedSecureField: ()=> {
        console.log('render completed')
      }
    },
  })

  // Renders into specified element
  secureExpiration.render('#expiration')


  const secureCvv = secureFields.create({
    name: 'cvv',
    options: {
      placeholder: 'CVV',
      /**
       * you can edit card form styles
       * only you should write css then it will be injected into the iframe
       * example 
       * `@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');
       *  .Yuno-text-field__content.focus label.Yuno-text-field__label {
       *    color: red;
       *    font-family: 'Luckiest Guy' !important;
       *   }`
       */
      styles: ``,
      label: 'CVV',
      showError: true,
      errorMessage: "Custom Error",
      // Indicates if the fields has error
      onChange: ({ error }) => {
        if (error) {
          console.log('error_cvv')
        } else {
          console.log('not_error_cvv')
        }
      },
      // Trigger when blurring from input
      onBlur() {
        console.log('blur_cvv')
      },
      // Trigger when focussing on input
      onFocus: () => {
        console.log('focus_cvv')
      },
      // Trigger when input has finished rendering 
      onRenderedSecureField: ()=> {
        console.log('render completed')
      }
    },
  })

  // Renders into specified element
  secureCvv.render('#cvv')
```

Below, you find a GIF showing how you can configure the Secure Fields.

<div
  style={{
  backgroundColor: "#FFFFFF",
  padding: "16px",
  display: "flex",
  justifyContent: "center",
  borderRadius: "14px",
  maxWidth: "500px",
  margin: "auto"
}}
>
  <Image align="center" src="https://files.readme.io/9cca28f-secure-fields-checkout-sdk-1.gif" width="500px" />
</div>

## Step 5: Generate an OTT (one-time token)

With all user information in hand, you can start the payment. First, you need to create a One-Time Token using the function `secureFields.generateToken`. As it is an asynchronous function, you can use `try/catch` to ensure you will correctly handle triggered errors. Below is an example of creating an one-time token using **vaultedToken** information.

<HTMLBlock>{`
<style>
  .contentContainer {
    gap: 0;
  }
</style>


  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <div class="contentContainer">
        <h3>Benefits of using a vaulted token</h3>
        <p>
          When you use a vaulted token with the SDK, all the fraud information from the providers you configured in your card routing is collected and attached to the one-time token. In addition, you can add installment information and a security code if the provider requires it.
        </p>
      </div>
    </div>
  </div>
`}</HTMLBlock>

```javascript
// Create one-time token
// This will trigger an error if there are missing data
// You can catch it using a try/catch
const oneTimeToken = await secureFields.generateToken({
  // Optional: This parameter is used to indicate that a different checkout session is desired, 
  //rather than the one initially generated.
  //A use case is for the persistence of card data after a payment error.
  checkoutSession: '{{the checkout session id}}',
  // Required: You can create an input to get this formation
  cardHolderName: 'John Deer',
  // Optional: You can create an input to get this formation
  saveCard: true,
  /**
   * @optional
   * Send this value if you already have a registered or enrolled payment method.
   * Other fields like card and customer are optional unless your provider requires them.
   */
  vaultedToken: "aad8578e-ac2f-40a0-8065-25b5957f6555",
  // Optional: only neccessary if an installments plan is created for the account
  installment: {
            id: string,
            value: number,
            amount: {
                currency: string,
                value: string,
                total_value: string,
            },
        },
  // Check your card processor to know if you need to send 
  // customer information
  // full object here https://docs.y.uno/reference/the-customer-object
  customer: {
    document: {
      document_number: '1090209924',
      document_type: 'CC',
    },
  },
  // This is useful for dual cards where the same card can be either used as credit or debit
  cardType: 'DEBIT' or 'CREDIT'
})
```

You can also use `secureFields.generateTokenWithInformation` to receive any additional info the customer gives at checkout, such as installments or document type/number.

```javascript
// Create one-time token
// This will trigger an error if there are missing data
// You can catch it using a try/catch
const oneTimeTokenWithInformation = await secureFields.generateTokenWithInformation({ 
  // Optional: This parameter is used to indicate that a different checkout session is desired, 
  //rather than the one initially generated.
  //A use case is for the persistence of card data after a payment error.
  checkoutSession: '{{the checkout session id}}',
  // Required: You can create an input to get this formation
  cardHolderName: 'John Deer',
  // Optional: You can create an input to get this formation
  saveCard: true,
  /**
   * @optional
   * Send this value if you already have a registered or enrolled payment method.
   * Other fields like card and customer are optional unless your provider requires them.
   */
  vaultedToken: "aad8578e-ac2f-40a0-8065-25b5957f6555",
  // Optional: only neccessary if an installments plan is created for the account
  installment: {
            id: string,
            value: number,
            amount: {
                currency: string,
                value: string,
                total_value: string,
            },
        },
  // Check your card processor to know if you need to send 
  // customer information
  // full object here https://docs.y.uno/reference/the-customer-object
  customer: {
    document: {
      document_number: '1090209924',
      document_type: 'CC',
    },
  },
  // This is useful for dual cards where the same card can be either used as credit or debit
  cardType: 'DEBIT' or 'CREDIT'
})
```

## Step 6: Create the Payment

After receiving the one-time token, you can create the payment using one of the two following options:

* Create the payment using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment).
* Use the `createPayment` function.

Both options require you to provide the `oneTimeToken` and the `checkoutSession`. As creating the payment may raise errors, Yuno recommends you use a try/catch function here.

After, you can check the payment status using the `yuno.mountStatusPayment`function. The following example uses the `createPayment` function to create the payment and the `mountStatusPayment` to display the payment status:

```javascript
// Create your payment using the createPayment function. 
const payment = await createPayment({ oneTimeToken, checkoutSession })

// Check if an SDK action is required. If yes, call the continuePayment function.
if (payment.checkout.sdk_action_required) {
      yuno.continuePayment()
} else {
  // Mount the payment status view and check the payment status.
  yuno.mountStatusPayment({
    checkoutSession: checkoutSession,
    /**
     * Specify the country code for the payment process configuration.
     * For a full list of supported countries and their codes, refer to the 
     * {https://docs.y.uno/docs/country-coverage-yuno-sdk | Country Coverage} page.
     * @type {String}
     */
    country_code: 'US',
    /**
     * Specify the language for the payment process.
     * Supported languages:
     * - es (Spanish)
     * - en (English)
     * - pt (Portuguese)
     * - fil (Filipino)
     * - id (Indonesian)
     * - ms (Malay)
     * - th (Thai)
     * By default, the SDK will use the browser language.
     * @type {String}
     */
    language: 'en',
    /**
     * Handle the payment result with the provided callback.
     * @param {'READY_TO_PAY' | 'CREATED' | 'SUCCEEDED' | 'REJECTED' | 'CANCELLED' | 
     *         'ERROR' | 'DECLINED' | 'PENDING' | 'EXPIRED' | 'VERIFIED' | 'REFUNDED'} data
     * The payment status will be passed as an argument.
     */
    yunoPaymentResult(data) {
      console.log('yunoPaymentResult', data)
    },
  })
}
```

<HTMLBlock>{`
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Demo App</h3>
      <div class="contentContainer">
        <p>
          In addition to the code examples provided, you can access the <a href="/docs/demo-app">Demo App</a> for a complete implementation of Yuno SDKs or go directly to the <a href="https://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout-secure-fields.html">HTML<a/> and <a href="https://github.com/yuno-payments/yuno-sdk-web/blob/main/static/checkout-secure-fields.js">JavaScript</a> checkout demos available on GitHub.
        </p>
      </div>
    </div>
  </div>
`}</HTMLBlock>

## Complementary features

Yuno Secure Fields provides additional services and configurations you can use to improve customers' experience:

* [Configure and use TypeScript](#configure-and-use-typescript)
* [Persist credit card information to retry payments](#persist-credit-card-information-to-retry-payments)
* [Clear the values entered in the card fields](#clear-the-values-entered-in-the-card-fields)
* [Input focus](#input-focus)
* [Force validation](#force-validation)
* [Set custom error message](#set-custom-error-message)
* [Set card type](#set-card-type)

### Configure and use TypeScript

To use TypeScript with the Yuno Secure Fields SDK, start by installing the type definitions via npm:

```shell
npm install @yuno-payments/sdk-web-types
```

After finishing the installation, include the type definitions in your TypeScript configuration. Update the `tsconfig.json` file to include `@yuno-payments/sdk-web-types` in the types array, as in the following example:

```json
{
  "compilerOptions": {
    // Other compiler options
    "types": ["@yuno-payments/sdk-web-types"]
  }
}
```

With the type definitions installed and configured, you can now use them in your code. The following code block presents an example of how to initialize Yuno and create an instance.

```typescript
import { YunoInstance } from '@yuno-payments/sdk-web-types/dist/types';

const yunoInstance: YunoInstance = await Yuno.initialize('yourPublicApiKey');

```

Remember to replace the `yourPublicApiKey` with your actual public API key.

### Persist credit card information to retry payments

If a transaction is rejected, you can persist the credit card data to retry a payment after the customer has entered the credit card details. To do that, you need to follow the steps below:

1. Add the parameter presented in the following code block while creating the one-time token in [Step 5](doc:secure-fields-payment#step-5-generate-an-ott-one-time-token). It will enable you to receive any additional information the customer gives during checkout, such as installments, document type, or document number.

```javascript
const oneTimeTokenWithInformation = await secureFields.generateTokenWithInformation({ 
  checkoutSession: '{{the checkout session id}}',
})
```

2. In case the transaction is rejected, you will need to:\
   i. Create a new checkout session.
   ii. Generate a new one-time token. In the one-time token generation, send the new checkout session in the `checkoutSession` parameter.
3. Continue with the new checkout and One Time Token with the regular payment flow.

### Clear the values entered in the card fields

Related to the previous functionality, the merchant can configure to clear the information entered in any card field. To accomplish this, it is necessary to execute the method `secureFieldInstance.clearValue()`, for each field that you wish to clear or delete. Below is an example:

```javascript
const secureFieldInstance = secureFields.create({...})
secureFieldInstance.clearValue()
```

### Input focus

The merchant can set the focus on a particular input. To accomplish this, it is necessary to execute the method `secureFieldInstance.focus()`, for each field that you wish to focus on. The code block below presents an example:

```javascript
const secureFieldInstance = secureFields.create({...})
secureFieldInstance.focus()
```

### Force validation

The merchant can force the validation for a particular input. To accomplish this, it is necessary to execute the method `secureFieldInstance.validate()`, for each field that you wish to validate. The code block below presents an example:

```javascript
const secureFieldInstance = secureFields.create({...})
secureFieldInstance.validate()
```

### Set custom error message

The merchant can define a custom error message after an input validation. To accomplish this, it is necessary to execute the method `secureFieldInstance.setError()`, for each field you wish to set a custom error message for. The code block below presents an example:

```javascript
const secureFieldInstance = secureFields.create({...})
secureFieldInstance.setError('Custom error')
```

### Set card type

The merchant can define the card type the customer uses for the payment. To accomplish this, you need to execute the method `secureFieldInstance.setCardType()` and send either ´DEBIT´ or ´CREDIT´ for each scenario. This is useful for dual cards, where the same card can be used as credit or debit, such as in Brazil. The code block below presents an example:

```javascript
const secureFieldInstance = secureFields.create({...})
secureFieldInstance.setCardType('CREDIT')
```

## What's next?

You can access other functions available on the Yuno Web SDK:

* [SDK Customizations](doc:sdk-customizations): Change the SDK appearance to match your brand.
* [Payment Status](doc:payment-status): Update the user about the payment process.
* [3DS Setup SDK](doc:3ds-setup-sdk): Integrate 3DS into your payment flow.