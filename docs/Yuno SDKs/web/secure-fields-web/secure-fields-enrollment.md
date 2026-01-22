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

Before proceeding with the Secure Fields implementation, see the [SDK Integration Overview](doc:quickstart) for detailed instructions on how to properly integrate the SDK into your project.

The integration guide provides three flexible methods:

1. Direct HTML script inclusion
2. Dynamic JavaScript injection
3. NPM module installation

Choose the integration method that best suits your development workflow and technical requirements. After completing the SDK integration, you can proceed with the following steps to implement the secure fields functionality.

> 📘 TypeScript Library
>
> If you are using TypeScript, Yuno provides a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) that you can use to see all available methods in the Yuno Web SDK.

### Step 2: Initialize secure fields with the public key

Get a `Yuno` instance class in your JavaScript application with a valid `PUBLIC_API_KEY`:

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

> 📘 Credentials
>
> See the credentials page for more information: [https://docs.y.uno/reference/authentication](https://docs.y.uno/reference/authentication)

### Step 3: Create a customer session and an enrollment payment method object

Before continuing with the process, you will need to create a [customer session](ref:create-customer-session) and a [payment method object](ref:enroll-payment-method-checkout) to use in the setup of your secure fields integration for enrollment. While creating the payment method object, you will need to define which one will be available for your customer to enroll (in the case of secure fields, only CARD is available).

> 📘 Verify
>
> If you need to verify cards through a zero-value authorization before enrolling a customer, you can include the `verify` structure when defining the payment method object for the customer session.

### Step 4: Start the enrollment process

Next, you have to create a configuration object. The essential parameters are the `countryCode`, which determines the country for which the enrollment process is configured, and `customerSession`, which refers to the current enrollment's customer session.

### Parameters

Configure the secure fields with the following options:

| Parameter         | Description                                                                                                                                                                                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `countryCode`     | This parameter specifies the country for which the payment process is being set up. Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:quickstart) page. |
| `customerSession` | Refers to the current enrollment's customer session. `Example: '438413b7-4921-41e4-b8f3-28a5a0141638'`                                                                                                                                                                                        |

```javascript
const secureFields = yuno.secureFields({
  countryCode: "CO",
  customerSession: "eec6578e-ac2f-40a0-8065-25b5957f6dd3"
});
```

### Step 5: Mount the Secure Fields

After defining the parameters, you will define, configure, and mount the Secure Fields. For each Secure Field, you need to define the `name` and `options` when creating it with the `secureFields.create` function.

The following table shows all configurations available:

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

The following code block shows an example of the parameter configuration for three Secure Fields, and as they are mounted, the fields are presented to the user:

```javascript
const secureNumber = secureFields.create({
  name: 'pan',
  options: {
    placeholder: '0000 0000 0000 0000',
    styles: ``,
    label: 'Card Number',
    showError: true,
    errorMessage: "Custom Error",
    validateOnBlur: false,
    onChange: ({ error, data }) => {
      if (error) {
        console.log('error_pan')
      } else {
        console.log('not_error_pan')
      }
    },
    onBlur() {
      console.log('blur_pan')
    },
    onFocus: () => {
      console.log('focus_pan')
    },
    onRenderedSecureField: ()=> {
      console.log('render completed')
    }
  },
})

secureNumber.render('#pan')

const secureExpiration = secureFields.create({
  name: 'expiration',
  options: {
    placeholder: 'MM / YY',
    styles: ``,
    label: 'Card Expiration',
    showError: true,
    onChange: ({ error }) => {
      if (error) {
        console.log('error_expiration')
      } else {
        console.log('not_error_expiration')
      }
    },
    onBlur() {
      console.log('blur_expiration')
    },
    onFocus: () => {
      console.log('focus_expiration')
    },
    onRenderedSecureField: ()=> {
      console.log('render completed')
    }
  },
})

secureExpiration.render('#expiration')

const secureCvv = secureFields.create({
  name: 'cvv',
  options: {
    placeholder: 'CVV',
    styles: ``,
    label: 'CVV',
    showError: true,
    onChange: ({ error }) => {
      if (error) {
        console.log('error_cvv')
      } else {
        console.log('not_error_cvv')
      }
    },
    onBlur() {
      console.log('blur_cvv')
    },
    onFocus: () => {
      console.log('focus_cvv')
    },
    onRenderedSecureField: ()=> {
      console.log('render completed')
    }
  },
})

secureCvv.render('#cvv')

```

> 📘 Enrollment for Payouts
>
> If you are enrolling a credit card for the payouts flow, only the credit/debit pan is required, so you can just use the `secureNumber` object before creating the vaulted_token and ignore the `secureExpiration` and `secureCvv` objects.

After they are mounted, the three secure fields will be shown:

### Step 6: Create Vaulted Token

To enroll, create a Vaulted Token:

```javascript
const vaultedToken = await secureFields.generateVaultedToken({
  cardHolderName: 'John Deer',
  customer: {
    document: {
      document_number: '1090209924',
      document_type: 'CC',
    },
  },
});
```

If you need the full response, you can use `secureFields.generateVaultedTokenWithInformation`

````javascript
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
Generate a vaulted token with customer information:

```javascript
const vaultedTokenWithInformation = await secureFields.generateVaultedTokenWithInformation({
  cardHolderName: 'John Deer',
  customer: {
    document: {
      document_number: '1090209924',
      document_type: 'CC',
    },
  },
})
````

## Demo

In addition to the code examples provided, you can access the [Demo App](doc:demo-app) for a complete implementation of Yuno Secure Fields. The demo app includes working examples of all Yuno SDKs and can be cloned from the [GitHub repository](https://github.com/yuno-payments/yuno-sdk-web).

## Stay Updated

Visit the [changelog](https://docs.y.uno/changelog) for the latest SDK updates and version history.