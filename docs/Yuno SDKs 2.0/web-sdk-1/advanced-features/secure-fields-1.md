---
title: Secure Fields
deprecated: false
hidden: false
metadata:
  robots: index
---
# Payment

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

### Payment creation flow

1. **Create Payment**: Use the `createPayment` function with the one-time token and checkout session
2. **Check SDK Action**: If `sdk_action_required` is true, call `yuno.continuePayment()` for additional customer actions
3. **Mount Status**: If no SDK action is required, use `yuno.mountStatusPayment()` to display payment status

### Mount Status Payment parameters

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

# enrollment

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
| `countryCode`     | This parameter specifies the country for which the payment process is being set up. Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk) page. |
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
