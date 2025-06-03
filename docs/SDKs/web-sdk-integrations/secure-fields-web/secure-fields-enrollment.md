---
title: Secure Fields (Enrollment)
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
Follow this step-by-step guide to implement and enable Yuno's Secure Fields Enrollment functionality in your application.

## Step 1: Include the library in your project

Before proceeding with the Secure Fields implementation, please refer to the [Yuno SDK Integration Guide](doc:yuno-sdk-integration-guide) for detailed instructions on how to properly integrate the SDK into your project.

The integration guide provides three flexible methods:

1. Direct HTML script inclusion
2. Dynamic JavaScript injection
3. NPM module installation

Choose the integration method that best suits your development workflow and technical requirements. After completing the SDK integration, you can proceed with the following steps to implement the secure fields functionality.

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

### Step 2: Initialize secure fields with the public key

Get a `Yuno` instance class in your `JS` app with a valid **PUBLIC\_API\_KEY**

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY)
```

### Step 3: Create a customer session and an enrollment payment method object

Before continuing with the process, you will need to create a [customer session](ref:create-customer-session) and a [payment method object](ref:enroll-payment-method-checkout) to use in the setup of your secure fields integration for enrollment. While creating the payment method object, you will need to define which one will be available for your customer to enroll (in the case of secure fields, only CARD is available).

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer ">
    <div class="verticalLine"></div>
    <div>
      <h3>Verify</h3>
      <div class="contentContainer">
        <p>
          If you need to verify cards through a zero-value authorization before enrolling a customer, you can include the <code>verify</code> structure when defining the payment method object for the customer session.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

### Step 4: Start the enrollment process

Next, you have to create a configuration object. The essential parameters are the `country_code`, which determines the country for which the enrollment process is configured, and `customerSession`, which refers to the current enrollment's customer session.  The next code block presents an example of the parameter configuration.

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
        Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk)   page.
      </td>
    </tr>

    <tr>
      <td>
        `customerSession`
      </td>

      <td>
        Refers to the current enrollment's customer session.
        `Example: '438413b7-4921-41e4-b8f3-28a5a0141638'`
      </td>
    </tr>
  </tbody>
</Table>

```javascript
const secureFields = yuno.secureFields({
    /**
     * The complete list of country codes is available on https://docs.y.uno/docs/country-coverage-yuno-sdk
    */
    country_code: "CO",
     /**
		 * The customer session created using the following endpoint https://docs.y.uno/reference/create-customer-session
     */
    customerSession: "eec6578e-ac2f-40a0-8065-25b5957f6dd3"
  })
```

### Step 5: Mount the Secure Fields

After defining the parameters, you will define, configure, and mount the Secure Fields. For each Secure Field, you need to define the `name` and `options` when creating it with the `secureFields.create` function.

The table below presents all configurations available:

| Parameters                      | Description                                                                                                                                                                         |
| :------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                          | The available names for field names are **cvv**, **pan**, or **expiration**.                                                                                                        |
| `options.placeholder`           | Default placeholder for the field.                                                                                                                                                  |
| `options.styles`                | Additional CSS styles for the current field.                                                                                                                                        |
| `options.label`                 | Field visible label.                                                                                                                                                                |
| `options.showError`             | Defines if errors will be shown. Available options are `true` and `false`.                                                                                                          |
| `options.onChange`              | An auxiliary function that can be configured and will run when the field content changes. Indicates if the fields have errors.                                                      |
| `options.onBlur`                | An auxiliary function that can be configured and will run when blurring from the input.                                                                                             |
| `options.validateOnBlur`        | Change the validation behavior, improving the user experience by providing validation feedback after the field loses focus. It is an optional parameter that is `false` as default. |
| `options.onFocus`               | An auxiliary function that can be configured and will run when focussing on the input.                                                                                              |
| `options.onRenderedSecureField` | An auxiliary function that can be configured and will run when the element finishes rendering                                                                                       |
| `options.errorMessage`          | This allows for the definition of the field's error message.                                                                                                                        |

Once you have set the parameter, you will render the created Secure Field with the `render` function by selecting an HTML element using a valid CSS selector (`#`, `.`, `[data-*]`).

The next code block presents an example of the parameter configuration for three Secure Fields, and as they are mounted, the fields are presented to the user.

```javascript
const secureNumber = secureFields.create({
  /**
   * Field name, can be 'cvv', 'pan', or 'expiration'.
   */
  name: 'pan',
  // All options are optional
  options: {
    placeholder: '0000 0000 0000 0000',
    /**
     * You can edit card form styles.
     * Simply write CSS, and it will be injected into the iframe.
     * Example: 
     * `@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');
     *  .Yuno-text-field__content.focus label.Yuno-text-field__label {
     *    color: red;
     *    font-family: 'Luckiest Guy' !important;
     *  }`
     */
    styles: ``,
    label: 'Card Number',
    showError: true,
    errorMessage: "Custom Error",
    // Indicates if the field has an error
    validateOnBlur: false,
    onChange: ({ error, data }) => {
      /**
       * In data.cardIIN, you can receive card data:
       * [{
       *   "id": "436c457c-1234-4e5e-b51d-1814e67d696a",
       *   "iin": "411111",
       *   "scheme": "VISA",
       *   "issuer_name": "JPMORGAN CHASE BANK N.A.",
       *   "issuer_code": null,
       *   "brand": "VISA",
       *   "type": "CREDIT",
       *   "category": "CREDIT",
       *   "country_code": "US",
       *   "country_name": "United States of America",
       *   "website": "https://www.chase.com",
       *   "phone": {
       *       "country_code": null,
       *       "number": "+1 212-270-6000"
       *   },
       *   "address": {
       *       "address_line_1": null,
       *       "address_line_2": null,
       *       "city": null,
       *       "country": null,
       *       "state": null,
       *       "zip_code": null
       *   }
       * }]
       */
      /**
       * In data.isCardIINLoading, you can receive a true or false indicating if the card IIN search is being executed.
       */
      /**
       * In data.isInstallmentLoading, you can receive a true or false indicating if the installments search is being executed.
       */
      if (error) {
        console.log('error_pan')
      } else {
        console.log('not_error_pan')
      }
    },
    // Triggered when blurring from input
    onBlur() {
      console.log('blur_pan')
    },
    // Triggered when focusing on input
    onFocus: () => {
      console.log('focus_pan')
    },
    // Trigger when input has finished rendering 
    onRenderedSecureField: ()=> {
      console.log('render completed')
    }
  },
})

// Render into desired element
secureNumber.render('#pan')

const secureExpiration = secureFields.create({
  /**
   * Field name, can be 'cvv', 'pan', or 'expiration'.
   */
  name: 'expiration',
  // All options are optional
  options: {
    placeholder: 'MM / YY',
    /**
     * You can edit card form styles.
     * Simply write CSS, and it will be injected into the iframe.
     * Example: 
     * `@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');
     *  .Yuno-text-field__content.focus label.Yuno-text-field__label {
     *    color: red;
     *    font-family: 'Luckiest Guy' !important;
     *  }`
     */
    styles: ``,
    label: 'Card Expiration',
    showError: true,
    // Indicates if the field has an error
    onChange: ({ error }) => {
      if (error) {
        console.log('error_expiration')
      } else {
        console.log('not_error_expiration')
      }
    },
    // Triggered when blurring from input
    onBlur() {
      console.log('blur_expiration')
    },
    // Triggered when focusing on input
    onFocus: () => {
      console.log('focus_expiration')
    },
    // Trigger when input has finished rendering 
    onRenderedSecureField: ()=> {
      console.log('render completed')
    }
  },
})

// Render into desired element
secureExpiration.render('#expiration')

const secureCvv = secureFields.create({
  /**
   * Field name, can be 'cvv', 'pan', or 'expiration'.
   */
  name: 'cvv',
  // All options are optional
  options: {
    placeholder: 'CVV',
        /**
     * You can edit card form styles.
     * Simply write CSS, and it will be injected into the iframe.
     * Example: 
     * `@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');
     *  .Yuno-text-field__content.focus label.Yuno-text-field__label {
     *    color: red;
     *    font-family: 'Luckiest Guy' !important;
     *  }`
     */
    styles: ``,
    label: 'CVV',
    showError: true,
    // Indicates if the field has an error
    onChange: ({ error }) => {
      if (error) {
        console.log('error_cvv')
      } else {
        console.log('not_error_cvv')
      }
    },
    // Triggered when blurring from input
    onBlur() {
      console.log('blur_cvv')
    },
    // Triggered when focusing on input
    onFocus: () => {
      console.log('focus_cvv')
    },
    // Trigger when input has finished rendering 
    onRenderedSecureField: ()=> {
      console.log('render completed')
    }
  },
})

// Render into desired element
secureCvv.render('#cvv')

```

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer ">
    <div class="verticalLine"></div>
    <div>
      <h3>Enrollment for Payouts</h3>
      <div class="contentContainer">
        <p>
          If you are enrolling a credit card for the payouts flow, only the credit/debit pan is required, so you can just use the <code>secureNumber</code> object before creating the vaulted_token and ignore the <code>secureExpiration</code> and <code>secureCvv</code> objects.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

After they are mounted, the three secure fields will be shown

### Step 6: Create Vaulted Token

To enroll, create a Vaulted Token

```javascript
// Create Vaulted Token
// This will trigger an error if there are missing data
// You can catch it using a try/catch
const vaultedToken = await secureFields.generateVaultedToken({
  // Required: You can create an input to get this formation
  cardHolderName: 'John Deer',
  // Check your card processor to know if you need to send 
  // customer information
  // full object here https://docs.y.uno/reference/the-customer-object
  customer: {
    document: {
      document_number: '1090209924',
      document_type: 'CC',
    },
  },
})
```

If you need the full response, you can use `secureFields.generateVaultedTokenWithInformation`

```javascript
/**
 *  Create One Time Token
 *  This will trigger an error if there are missing data
 *  You can catch it using a try/catch
 *  Returns an object with the full response
 *  {
 *   code: string;
 *   idempotency_key: string;
 *   organization_code: string;
 *   account_code: string;
 *   customer_session: string;
 *   name: string;
 *   description: string;
 *   status: Enrollment.Status;
 *   type: Payment.Type;
 *   category: Payment.Category;
 *   provider: {
 *       type: string;
 *       action: string;
 *       token: string;
 *       enrollment_id: string | null;
 *       provider_status: string | null;
 *       redirect: string | null;
 *       raw_response: unknown;
 *   };
 *   created_at: Date;
 *   updated_at: Date;
 *  }
 */ 
const vaultedTokenWithInformation = await secureFields.generateVaultedTokenWithInformation({
  // Required: You can create an input to get this formation
  cardHolderName: 'John Deer',
  // Check your card processor to know if you need to send 
  // customer information
  // full object here https://docs.y.uno/reference/the-customer-object
  customer: {
    document: {
      document_number: '1090209924',
      document_type: 'CC',
    },
  },
})
```

## Demo

In addition to the code examples provided, you can access the [Demo App](ref:demo-app) for a complete implementation of Yuno Secure Fields or go directly to the [HTML](https://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout-secure-fields.html) and [JavaScript](https://github.com/yuno-payments/yuno-sdk-web/blob/main/static/checkout-secure-fields.js) Secure Fields checkout demos available on GitHub.