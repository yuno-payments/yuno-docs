---
title: Secure Fields (Payment)
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: Secure Fields (Payment)
  description: >-
    Here, you will find an outline of the step-by-step process to enable the
    Secure Fields checkout functionalities within your system.
  robots: index
next:
  description: ''
---
Below, we outline the step-by-step process to enable the Secure Fields checkout functionalities in your system: 

### Step 1: Include the library in your project.

The first step is to make sure to include the Yuno SDK file in your webpage before closing the `<body>` tag. See the example below:

```html
<script src="https://sdk-web.y.uno/v1/static/js/main.min.js"></script>
```

### Step 2: Initialize secure fields with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid **PUBLIC\_API\_KEY**. Check the [Get your API credentials](ref:get-your-api-credentials) guide. 

Like the example below, use the initialized class that is attributed to the `yuno`constant.

```javascript
const yuno = Yuno.initialize(PUBLIC_API_KEY)
```

### Step 3: Start the checkout process

You will start the checkout process. To do it, use the `secureFields` function and provide the necessary configuration parameters. 

The essential parameters are the `countryCode`, which determines the country for which the payment process is configured, and `checkoutSession`, which refers to the current payment's checkout session.  The next code block presents an example of the parameter configuration.

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
        `countryCode`
      </td>

      <td>
        This parameter determines the country for which the payment process is being configured. It should be set to one of the following country codes: CO, BR, CL, PE, EC, UR, or MX.
      </td>
    </tr>

    <tr>
      <td>
        `checkoutSession`
      </td>

      <td>
        Refers to the current payment's checkout session.\
        `Example: '438413b7-4921-41e4-b8f3-28a5a0141638'`
      </td>
    </tr>
  </tbody>
</Table>

```javascript
  const secureFields = yuno.secureFields({
    /**
     * country can be one of CO, BR, CL, PE, EC, UR, MX
     */
    countryCode: country,
    checkoutSession,
  })
```

### Step 4: Mount the Secure Fields

After defining the parameters, you will define, configure, and mount the Secure Fields. For each Secure Field, you need to define the `name` and `options` when creating it with the `secureFields.create` function. 

The table below presents all configurations available:

| Parameters            | Description                                                                                                                    |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `name`                | The available names for field names are **cvv**, **pan**, or **expiration**.                                                   |
| `options.placeholder` | Default placeholder for the field.                                                                                             |
| `options.styles`      | Additional CSS styles for the current field.                                                                                   |
| `options.label`       | Field visible label.                                                                                                           |
| `options.showError`   | Defines if errors will be shown. Available options are `true` and `false`.                                                     |
| `options.onChange`    | An auxiliary function that can be configured and will run when the field content changes. Indicates if the fields have errors. |
| `options.onBlur`      | An auxiliary function that can be configured and will run when blurring from the input.                                        |
| `options.onFocus`     | An auxiliary function that can be configured and will run when focussing on the input.                                         |

Once you have set the parameter, you will render the created Secure Field with the `render` function by selecting an HTML element using a valid CSS selector (`#`, `.`, `[data-*]`). 

The next code block presents an example of the parameter configuration for three Secure Fields, and as they are mounted, the fields are presented to the user.

```javascript
  const secureNumber = secureFields.create({
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
      onChange: ({ error }) => {
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
      }
    },
  })

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
      }
    },
  })

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
      }
    },
  })

  secureCvv.render('#cvv')
```

* Below you find a GIF showing how you can configure the Secure Fields:

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px; max-width:500px; margin:auto">
        <image src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/SDKs/webSDK/new-images/secure-fields-checkout-sdk-1.gif?raw=true" style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></image>
      </div>
`}</HTMLBlock>

### Step 5: Generate an OTT (one-time token)

With all user information in hand, you can start the payment. First, you need to create a One-Time Token using the function `secureFields.generateToken`. As it is an asynchronous function, you can use try/catch to ensure you will correctly handle triggered errors. Below, you will find an example of creating a One-Time Token: 

```javascript
// Create One Time Token
// This will trigger an error if there are missing data
// You can catch it using a try/catch
const oneTimeToken = await secureFields.generateToken({ 
  // Required: You can create an input to get this formation
  cardHolderName: 'John Deer',
  // Optional: You can create an input to get this formation
  saveCard: true,
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

You can also use `secureFields.generateTokenWithInformation` to receive any additional info given by the customer in the checkout such as installments or document type/number.

```javascript
// Create One Time Token
// This will trigger an error if there are missing data
// You can catch it using a try/catch
const oneTimeTokenWithInformation = await secureFields.generateTokenWithInformation({ 
  // Required: You can create an input to get this formation
  cardHolderName: 'John Deer',
  // Optional: You can create an input to get this formation
  saveCard: true,
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

### Step 6: Create the Payment

After receiving the One Time Token, you can create the payment using the `createPayment` function, providing the `oneTimeToken` and the `checkoutSession`. The back-to-back payment creation must be carried out using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment).  

* **Status Payment**: As the process may raise errors, we recommend using a try/catch function here. Then, you can check the payment status with the `yuno.mountStatusPayment`function, as shown in the next code example:

```javascript
// Create your payment, you should implement this function
await createPayment({ oneTimeToken, checkoutSession })

// Check payment status
yuno.mountStatusPayment({
  checkoutSession: checkoutSession,
  /**
   * Country can be one of CO, BR, CL, PE, EC, UR, MX
   */
  countryCode: 'CO',
  /**
   * Language can be one of es, en, pt
   */
  language: 'en',
  /**
   * @param {'READY_TO_PAY' | 'CREATED' | 'SUCCEEDED' | 'REJECTED' | 'CANCELLED' | 'ERROR' | 'DECLINED' | 'PENDING' | 'EXPIRED' | 'VERIFIED' | 'REFUNDED'} data
   */
  yunoPaymentResult(data) {
    console.log('yunoPaymentResult', data)
  },
})
```

## Additional steps

In addition to the code examples provided, you can access the [Demo App](ref:demo-app) for a complete implementation of Yuno SDKs or go directly to the [HTML](https://github.com/yuno-payments/yuno-sdk-web/blob/main/checkout-secure-fields.html) and [JavaScript](https://github.com/yuno-payments/yuno-sdk-web/blob/main/static/checkout-secure-fields.js) Secure Fields checkout demos available on GitHub.
