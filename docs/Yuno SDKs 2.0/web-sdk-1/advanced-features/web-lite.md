---
title: Web Lite
deprecated: false
hidden: false
metadata:
  robots: index
---
## Payment

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
