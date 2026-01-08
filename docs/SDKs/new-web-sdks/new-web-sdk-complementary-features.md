---
title: New - Web Flow Complementary Features
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
Configuration options for customizing the Yuno Web SDK flow behavior and appearance.

> **Integration Guides:**  
> See [Payment Integration](doc:new-web-sdk-payment-integration) or [Enrollment Integration](doc:new-web-sdk-enrollment-integration) for complete implementation workflows.

## Loader Configuration

Control the visibility and behavior of the loading spinner during SDK operations.

| Parameter     | Description                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `showLoading` | Controls whether the Yuno loading/spinner is displayed. When enabled, the loader remains visible until `hideLoader()` or `continuePayment()` is called. Default: `true`. |

**Example:**

```javascript
yuno.startCheckout({
  showLoading: true,
});
```

**Hide the loader manually:**

```javascript
yuno.hideLoader();
```

> 📘 Custom Loaders
>
> Merchants are responsible for managing loaders. Yuno provides a default option, but you can implement your own custom loader if preferred.

## Render Mode

Control how and where SDK forms are displayed on your page.

| Parameter         | Description                                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `renderMode`      | Determines the display mode for payment forms. Can be `modal` (overlay) or `element` (embedded in page).                                                 |
| `type`            | Set to `'modal'` for overlay display or `'element'` to embed within a specific page element.                                                             |
| `elementSelector` | Required when `type` is `'element'`. Specifies where to render the SDK. Can be a string (element ID/selector) or object (separate APM and action forms). |

### Render Mode Options

**Modal (Default):** Opens payment forms in an overlay modal.

**Element:** Embeds forms directly within specified page elements.

### Element Selector Formats

**String (Deprecated):** Provide the ID or selector of the element:

```javascript
yuno.startCheckout({
  renderMode: {
    type: 'element',
    elementSelector: '#checkout-container'
  }
});
```

**Object (Recommended):** Specify separate elements for APM forms and action buttons:

```javascript
yuno.startCheckout({
  renderMode: {
    type: 'element',
    elementSelector: {
      apmForm: "#form-element",        // Where payment methods display
      actionForm: "#action-form-element" // Where Continue Payment button appears
    } 
  }
});
```

> 📘 Action Form
>
> The `actionForm` element displays the Continue Payment button, which triggers modals for completing asynchronous payment methods (e.g., showing QR codes for PIX).

### Visual Examples

Below are screenshots presenting the difference between `modal` and `element` render modes:

<Image align="center" border={false} src="https://files.readme.io/b56fe6dfdebaee158495dea86d5269d865fae2dfcb81eb8b34879f9e5e737f0e-caracteristicas_Complemetarias_web_1.png" />

## Card Form Configuration

Customize the appearance and behavior of credit/debit card forms.

| Parameter                    | Description                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| `card`                       | Object containing card form settings.                                                               |
| `type`                       | Card form layout: `'step'` (separate screens) or `'extends'` (single screen). Default: `'extends'`. |
| `styles`                     | Custom CSS to inject into the card form iframe for styling.                                         |
| `cardSaveEnable`             | Show checkbox for saving/enrolling cards for future use. Default: `false`.                          |
| `texts`                      | Custom text labels for card form buttons.                                                           |
| `cardNumberPlaceholder`      | Custom placeholder text for card number input field.                                                |
| `hideCardholderName`         | Hide the cardholder name field from the card form. Default: `false`.                                |
| `isCreditCardProcessingOnly` | Process credit cards only, hiding debit option. Useful for Brazil. Default: `false`.                |
| `onChange`                   | Callback function triggered when card form data changes. Receives `{ error, data }`.                |

**Example:**

```javascript
yuno.startCheckout({
  card: {
    type: "extends",
    styles: "/* custom CSS */",
    cardSaveEnable: true,
    cardNumberPlaceholder: "Enter your card number",
    hideCardholderName: false,
    isCreditCardProcessingOnly: false,
    onChange: ({ error, data }) => {
      if (error) {
        console.log('Card form error:', error);
      } else {
        console.log('Card form data:', data);
      }
    },
    texts: {
      submitButton: "Pay Now"
    }
  }
});
```

### Save Cards for Future Payments

Enable the `cardSaveEnable` option to display a checkbox allowing customers to save their card for future transactions:

```javascript
yuno.startCheckout({
  card: {
    cardSaveEnable: true
  }
});
```

<Image align="center" border={false} src="https://files.readme.io/37b2e00b0c6a3d31bceb42b26b1b433c8d30e61d947a93298dd90c466bde004b-complementary-features.png" />

### Card Form Layouts

Choose between two card form layouts:

* **`step`**: Multi-step form (customer selects card, then fills details on separate screen)
* **`extends`**: Single-screen form (all card details on one screen)

<Image align="center" border={false} src="https://files.readme.io/08654f8fa7b638641cb1b9f5b882a75537a9e449fff4960cf560c1ec5b3efb74-caracteristicas_Complemetarias_web_2.png" />

### Control the Pay Button

Hide or show the Pay button in card and customer forms:

```javascript
yuno.startCheckout({
  showPayButton: false
});
```

<Image align="center" border={false} src="https://files.readme.io/873a709f1c3dce3c3dcc13dd4fd3cc9b5a8ecdf812c3b631f3cf8700177cc5cf-Card_boton.png" />

<Image align="center" border={false} src="https://files.readme.io/b8b5e51ab3f5907786b802cb782a71e043f4ec18475b6e5b6d4dd052c6dc4e37-Card_boton_1.png" />

If you hide the Pay button, trigger OTT creation manually:

```javascript
yuno.submitOneTimeTokenForm();
```

### Persist Card Form for Payment Retries

If a transaction is rejected, you can allow customers to retry payment without re-entering card details:

1. **Persist the form** by preventing automatic unmounting:

```javascript
yuno.startCheckout({
  automaticallyUnmount: false
});
```

2. **If transaction fails:**
   * Call `yuno.notifyError()` to clear the previously entered CVV
   * Create a new checkout session
   * Update the SDK with the new session:

```javascript
yuno.updateCheckoutSession(newCheckoutSession);
```

3. **Continue** with the regular payment flow using the new checkout session.

## Issuer Form

Enable a form for customers to select their bank or card issuer.

| Parameter           | Description                                                 |
| ------------------- | ----------------------------------------------------------- |
| `issuersFormEnable` | Display issuer selection form (bank list). Default: `true`. |

**Example:**

```javascript
yuno.startCheckout({
  issuersFormEnable: true
});
```

## External Payment Buttons

Display Google Pay and Apple Pay as standalone buttons (separate from the payment methods list).

| Function                 | Description                                                                |
| ------------------------ | -------------------------------------------------------------------------- |
| `mountExternalButtons()` | Renders Google Pay and Apple Pay buttons in a specified container element. |

**Example:**

```javascript
// Mount external buttons in a specific element
yuno.mountExternalButtons({
  elementSelector: '#external-buttons-container'
});
```

> 📘 Automatic Display
>
> From SDK version 1.5+, Google Pay and Apple Pay appear as direct buttons instead of radio buttons in the payment methods list when using `mountCheckout()`.

## Text Customization

Customize button labels and text throughout the SDK to match your application's language or branding.

| Parameter | Description                                                                |
| --------- | -------------------------------------------------------------------------- |
| `texts`   | Object containing custom text labels for various SDK buttons and messages. |

**Example:**

```javascript
yuno.startCheckout({
  texts: {
    customerForm: {
      submitButton: "Continue to Payment"
    },
    paymentOtp: {
      sendOtpButton: "Send Verification Code"
    }
  }
});
```

## Platform-Specific Configuration

### Mercado Pago Checkout Pro (Webview Only)

> ❗️ Special Exception
>
> This section describes a special exception for handling Mercado Pago Checkout Pro integration in webview environments. This is the only payment method that requires custom redirect handling.

For Mercado Pago Checkout Pro in webview environments, `await yuno.continuePayment()` returns either an object with redirect information or `null`.

**Return Type:**

```typescript
{
  action: 'REDIRECT_URL'
  type: 'MERCADO_PAGO_CHECKOUT_PRO'
  redirect: {
    init_url: string    // URL to redirect to for completing payment
    success_url: string // URL to redirect after successful payment
    error_url: string   // URL to redirect after failed payment
  }
} | null
```

**Properties:**

| Property      | Description                                                                        |
| ------------- | ---------------------------------------------------------------------------------- |
| `action`      | Always `'REDIRECT_URL'` when redirect handling is required.                        |
| `type`        | Enum value `'MERCADO_PAGO_CHECKOUT_PRO'` identifying the payment method.           |
| `init_url`    | URL to redirect customer to for completing payment with Mercado Pago Checkout Pro. |
| `success_url` | URL to redirect customer to after successful payment.                              |
| `error_url`   | URL to redirect customer to if payment fails.                                      |

When an object is returned, handle the custom redirect flow. When `null`, no additional action is needed.

### Android WebView Configuration

When integrating the Web SDK within an Android WebView, you may need to configure specific WebView settings. See the [Web Flow index page](doc:new-web-sdks#android-webview-configuration) for detailed configuration instructions.

## Advanced Initialization Options

Starting from **SDK v1.2**, the `Yuno.initialize()` function supports an optional `options` parameter for advanced configuration.

### Function Signature

```javascript
const yuno = await Yuno.initialize(publicApiKey, applicationSession, options);
```

**Parameters:**

| Parameter            | Type     | Description                                  |                                                                                                   |
| :------------------- | :------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `publicApiKey`       | `string` | Your public API key from the Yuno Dashboard. |                                                                                                   |
| `applicationSession` | `string  | undefined`                                   | Optional session ID. **Recommended:** Leave as `undefined` to let SDK manage sessions internally. |
| `options`            | `object  | undefined`                                   | Optional advanced configuration (e.g., custom cookie name for device identification).             |

### Options Structure

```javascript
const options = {
  cookies: {
    deviceId: {
      name: "customCookieName" // Overrides default cookie name ("yuno")
    }
  }
};
```

### Example Usage

```javascript
const publicApiKey = 'your-public-api-key';
const options = {
  cookies: {
    deviceId: {
      name: 'custom-device-id'
    }
  }
};

// Recommended: omit applicationSession or set to undefined
const yuno = await Yuno.initialize(publicApiKey, undefined, options);
```

> 📘 When to Use
>
> This feature is optional and intended for advanced use cases where you need custom device identification via cookies.

## Next Steps

* **[Payment Integration](doc:new-web-sdk-payment-integration)**: Process payments with the Web SDK
* **[Enrollment Integration](doc:new-web-sdk-enrollment-integration)**: Save payment methods for future use
* **[Getting Started](doc:new-getting-started-with-web-sdk)**: Installation and initialization guide
