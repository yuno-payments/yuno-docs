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

Before proceeding with the Secure Fields implementation, see the [SDK Integration Overview](doc:build-your-integration) for detailed instructions on how to properly integrate the SDK into your project.

The integration guide provides three flexible methods:

1. Direct HTML script inclusion
2. Dynamic JavaScript injection
3. NPM module installation

Choose the integration method that best suits your development workflow and technical requirements. After completing the SDK integration, you can proceed with the following steps to implement the secure fields functionality.

> 📘 TypeScript Library
>
> If you are using TypeScript, Yuno provides a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) that you can use to see all available methods in the Yuno Web SDK.

## Step 2: Initialize secure fields with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid `PUBLIC_API_KEY`:

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

> 📘 Credentials
>
> See the credentials page for more information: [https://docs.y.uno/reference/authentication](https://docs.y.uno/reference/authentication)

## Step 3: Start the checkout process

You will start the checkout process. To do it, use the `secureFields` function and provide the necessary configuration parameters:

The essential parameters are the `countrycode`, which determines the country for which the payment process is configured, and `checkoutSession`, which refers to the current payment's checkout session.

### Parameters

Configure the secure fields with the following options:

| Parameter           | Description                                                                                                                                                                                                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `countrycode`       | This parameter specifies the country for which the payment process is being set up. Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk) page. |
| `checkoutSession`   | Refers to the current payment's [checkout session](ref:create-checkout-session). `Example: '438413b7-4921-41e4-b8f3-28a5a0141638'`                                                                                                                                                            |
| `installmentEnable` | This parameter is optional and is set false by default. If set True, the installments set for the account will be shown as a secure field.                                                                                                                                                    |

```javascript
const secureFields = yuno.secureFields({
  countrycode: country,
  checkoutSession,
  installmentEnable: false
});
```

> 📘 Customer and Merchant-Initiated Transactions
>
> Payments can be initiated by the customer (CIT) or by the merchant (MIT). You find more information about their characteristics in [Stored credentials](../docs/stored-credentials).
>
> The step-by-step presented on this page refers to a customer-initiated transaction without the recurrence option. Typically, it's used in one-time online purchases, in-store purchases, ATM withdrawals, etc.

## Step 4: Mount the Secure Fields

After defining the parameters, you will define, configure, and mount the Secure Fields. For each Secure Field, you need to define the `name` and `options` when creating it with the `secureFields.create` function.

The following table shows all configurations available:

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
| `options.inputMode`             | _(v1.2+ only)_ Defines the type of keyboard to display on mobile devices. Possible values: `'numeric'` (default) or `'text'`.                                                       |

Once you have set the parameter, you will render the created Secure Field with the `render` function by selecting an HTML element using a valid CSS selector (`#`, `.`, `[data-*]`).

The following code block shows an example of the parameter configuration for three Secure Fields, and as they are mounted, the fields are presented to the user:

### Secure Field Parameters

| Parameter                       | Description                                                                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                          | Field type: 'cvv', 'pan', or 'expiration'                                                                                                         |
| `options.placeholder`           | Placeholder text displayed in the input field                                                                                                     |
| `options.styles`                | CSS styles to be injected into the iframe. You can customize the appearance by writing CSS                                                        |
| `options.label`                 | Label text for the field                                                                                                                          |
| `options.showError`             | Whether to display error messages                                                                                                                 |
| `options.errorMessage`          | Custom error message to display                                                                                                                   |
| `options.validateOnBlur`        | Whether to validate the field when it loses focus                                                                                                 |
| `options.onChange`              | Callback function triggered when field value changes. Receives `{error, data}` where `data` contains card IIN information and installment options |
| `options.onBlur`                | Callback function triggered when field loses focus                                                                                                |
| `options.onFocus`               | Callback function triggered when field gains focus                                                                                                |
| `options.onRenderedSecureField` | Callback function triggered when the secure field has finished rendering                                                                          |

### Data Available in onChange Callback

When the `onChange` callback is triggered, the `data` parameter contains:

* **Card IIN Information**: Card issuer details including scheme, brand, type, and issuer information
* **Installment Plans**: Available installment options for the account if configured
* **Loading States**: `isCardIINLoading` and `isInstallmentLoading` boolean flags

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
      onChange: ({ error,data }) => {
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
      errorMessage: "Custom Error",
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
      errorMessage: "Custom Error",
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

Below, you can see a GIF showing how you can configure the Secure Fields:

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

With all user information in hand, you can start the payment. First, you need to create a One-Time Token using the function `secureFields.generateToken`. As it is an asynchronous function, you can use `try/catch` to ensure you will correctly handle triggered errors. The following example shows how to create a one-time token using **vaultedToken** information:

> 📘 Benefits of Using a Vaulted Token
>
> When you use a vaulted token with the SDK, all the fraud information from the providers you configured in your card routing is collected and attached to the one-time token. In addition, you can add installment information and a security code if the provider requires it.

### Generate Token Parameters

| Parameter         | Description                                                                            |
| ----------------- | -------------------------------------------------------------------------------------- |
| `checkoutSession` | Optional: Different checkout session ID for card data persistence after payment errors |
| `cardHolderName`  | Required: Name of the cardholder                                                       |
| `saveCard`        | Optional: Whether to save the card for future payments                                 |
| `vaultedToken`    | Optional: Use if you have a previously enrolled payment method                         |
| `installment`     | Optional: Required only if an installment plan is configured for the account           |

```javascript
const oneTimeToken = await secureFields.generateToken({
  checkoutSession: '{{the checkout session id}}',
  cardHolderName: 'John Deer',
  saveCard: true,
  vaultedToken: "aad8578e-ac2f-40a0-8065-25b5957f6555",
  installment: {
            id: string,
            value: number,
            amount: {
                currency: string,
                value: string,
                total_value: string,
            },
        },
  customer: {
    document: {
      document_number: '1090209924',
      document_type: 'CC',
    },
  },
  cardType: 'DEBIT'
})
```

You can also use `secureFields.generateTokenWithInformation` to receive any additional info the customer gives at checkout, such as installments or document type/number.

```javascript
Create a one-time token with error handling:
const oneTimeTokenWithInformation = await secureFields.generateTokenWithInformation({ 
  checkoutSession: '{{the checkout session id}}',
  cardHolderName: 'John Deer',
  saveCard: true,
  vaultedToken: "aad8578e-ac2f-40a0-8065-25b5957f6555",
  installment: {
            id: string,
            value: number,
            amount: {
                currency: string,
                value: string,
                total_value: string,
            },
        },
  customer: {
    document: {
      document_number: '1090209924',
      document_type: 'CC',
    },
  },
  cardType: 'DEBIT'
})
```

## Step 6: Create the Payment

After receiving the one-time token, you can create the payment using one of the following options:

* Create the payment using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment).
* Use the `createPayment` function.

Both options require you to provide the `oneTimeToken` and the `checkoutSession`. As creating the payment may raise errors, Yuno recommends you use a try/catch function here.

After, you can check the payment status using the `yuno.mountStatusPayment` function. The following example uses the `createPayment` function to create the payment and the `mountStatusPayment` to display the payment status:

### Payment Creation Flow

1. **Create Payment**: Use the `createPayment` function with the one-time token and checkout session
2. **Check SDK Action**: If `sdk_action_required` is true, call `yuno.continuePayment()` for additional customer actions
3. **Mount Status**: If no SDK action is required, use `yuno.mountStatusPayment()` to display payment status

### Mount Status Payment Parameters

| Parameter           | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `checkoutSession`   | The checkout session ID for the payment                |
| `countrycode`       | Country code for the payment process                   |
| `language`          | Language for the status display                        |
| `yunoPaymentResult` | Callback function that receives payment status updates |

```javascript
const payment = await createPayment({ oneTimeToken, checkoutSession })

if (payment.checkout.sdk_action_required) {
      yuno.continuePayment()
} else {
  yuno.mountStatusPayment({
    checkoutSession: checkoutSession,
    countrycode: 'US',
    language: 'en',
    yunoPaymentResult(data) {
      console.log('yunoPaymentResult', data)
    },
  })
}
```

> 📘 Demo App
>
> In addition to the code examples provided, you can access the [Demo App](doc:demo-app) for a complete implementation of Yuno SDKs. The demo app includes working examples of all Yuno SDKs and can be cloned from the [GitHub repository](https://github.com/yuno-payments/yuno-sdk-web).

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
    "types": ["@yuno-payments/sdk-web-types"]
  }
}
```

With the type definitions installed and configured, you can now use them in your code. The following code block shows an example of how to initialize Yuno and create an instance:

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

2. In case the transaction is rejected, you will need to:
   i. Create a new checkout session.
   ii. Generate a new one-time token. In the one-time token generation, send the new checkout session in the `checkoutSession` parameter.
3. Continue with the new checkout and one-time token with the regular payment flow.

### Clear the values entered in the card fields

Related to the previous functionality, the merchant can configure to clear the information entered in any card field. To accomplish this, it is necessary to execute the method `secureFieldInstance.clearValue()`, for each field that you wish to clear or delete. The following example shows how:

```javascript
const secureFieldInstance = secureFields.create({...})
secureFieldInstance.clearValue()
```

### Input focus

The merchant can set the focus on a particular input. To accomplish this, it is necessary to execute the method `secureFieldInstance.focus()`, for each field that you wish to focus on. The following code block shows an example:

```javascript
const secureFieldInstance = secureFields.create({...})
secureFieldInstance.focus()
```

### Force validation

The merchant can force the validation for a particular input. To accomplish this, it is necessary to execute the method `secureFieldInstance.validate()`, for each field that you wish to validate. The following code block shows an example:

```javascript
const secureFieldInstance = secureFields.create({...})
secureFieldInstance.validate()
```

### Set custom error message

The merchant can define a custom error message after an input validation. To accomplish this, it is necessary to execute the method `secureFieldInstance.setError()`, for each field you wish to set a custom error message for. The following code block shows an example:

```javascript
const secureFieldInstance = secureFields.create({...})
secureFieldInstance.setError('Custom error')
```

### Set card type

The merchant can define the card type the customer uses for the payment. To accomplish this, you need to execute the method `secureFieldInstance.setCardType()` and send either 'DEBIT' or 'CREDIT' for each scenario. This is useful for dual cards, where the same card can be used as credit or debit, such as in Brazil. The following code block shows an example:

```javascript
const secureFieldInstance = secureFields.create({...})
secureFieldInstance.setCardType('CREDIT')
```

## What's next?

You can access other functions available on the Yuno Web SDK:

* [SDK Customizations](doc:sdk-customizations): Change the SDK appearance to match your brand.
* [Payment Status](doc:payment-status): Update the user about the payment process.

## Stay Updated

Visit the [changelog](https://docs.y.uno/changelog) for the latest SDK updates and version history.
