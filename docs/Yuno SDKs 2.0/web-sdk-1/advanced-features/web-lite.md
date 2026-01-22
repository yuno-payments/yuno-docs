---
title: Web Lite
deprecated: false
hidden: false
metadata:
  robots: index
---
# Enrollment

## Step 3: Create a customer session and an enrollment payment method object

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

## Step 4: Mount the enrollment lite

The configuration and mounting are done in the same step for the Enrollment Lite. To do it, use the `yuno.mountEnrollmentLite` function and provide the necessary parameters. The following table lists all parameters and their descriptions.

| Parameter                         | Description                                                                                                                                                                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customerSession`                 | Refers to the current payment's [customer session](ref:create-customer). Example: `e15648b0-fcd5-4799-a14c-cc463ae8a133`.                                                                                                                         |
| `country_code`                    | Country for the payment process. Use an `ENUM` value; see [Country Coverage](doc:country-coverage-yuno-sdk).                                                                                                                                      |
| `language`                        | Language for payment forms. Use any code listed in [Supported languages](doc:supported-languages). Example: `en-US`. Defaults to browser language when available.                                                                                 |
| `showLoading`                     | Controls visibility of the Yuno loading/spinner page during the payment process.                                                                                                                                                                  |
| `onLoading`                       | Required to receive notifications about server calls or loading events.                                                                                                                                                                           |
| `elementSelector`                 | HTML element where the Yuno SDK is mounted.                                                                                                                                                                                                       |
| `card`                            | Define specific settings for the credit card form.                                                                                                                                                                                                |
| `yunoEnrollmentStatus`            | Callback after enrollment ends; receives `vaultedToken` and `status`. Status options: `CREATED`, `EXPIRED`, `REJECTED`, `READY_TO_ENROLL`, `ENROLL_IN_PROCESS`, `UNENROLL_IN_PROCESS`, `ENROLLED`, `DECLINED`, `CANCELED`, `ERROR`, `UNENROLLED`. |
| `issuersFormEnable`               | Enable the issuer's form (bank list).                                                                                                                                                                                                             |
| `texts`                           | Custom text for payment form buttons to match your application's language or branding.                                                                                                                                                            |
| `card.isCreditCardProcessingOnly` | Optional. Forces card transactions to process as credit only—useful where cards act as both credit and debit.                                                                                                                                     |

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

## Payment

# Step 3: Start the checkout process

You will start the checkout process. To do it, use the `yuno.startCheckout` function and provide the necessary parameters.

The following table lists all required parameters and their descriptions. For optional parameters, go to [Complementary Features](doc:complementary-features-sdk).

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

## Step 4: Mount the SDK

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

## Step 5: Mount external buttons (Optional)

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

## Step 6: Initiate the payment process

After the user has selected a payment method, remember to call `yuno.startPayment()` to initiate the payment flow. Below, you will find an example where `yuno.startPayment()` is called when the user clicks on `button-pay`:

```javascript
const PayButton = document.querySelector("#button-pay");

PayButton.addEventListener("click", () => {
  yuno.startPayment();
});
```

## Step 7: Get the OTT (one-time token)

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

## Step 8: Create the payment

Once you have completed the steps described before, you will be able to create a payment. The back-to-back payment creation must be carried out using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment). The merchant should call their backend to create the payment within Yuno, using the one-time token and the checkout session.

> 📘 Continue Payment Method
>
> Yuno recommends integrating the `continuePayment` method of the SDK after the payment is created. This is because certain asynchronous payment methods require additional action from the customer to complete the payment. The API will inform you of this scenario via the `sdk_action_required` field of the response, which will be returned as true. The `yuno.continuePayment()` function will display additional screens to customers, where they can carry out the necessary actions to complete the payment. If `sdk_action_required` is false, this step is not necessary.

<br />
