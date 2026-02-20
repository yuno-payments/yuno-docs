---
title: Enrollment Flows
deprecated: false
hidden: false
metadata:
  robots: index
---
The Web SDK makes it easy to implement enrollment flows for saving payment methods to a customer account.

Include the library in your project by following the same steps as in [payment flows](payment-flows-web#include-the-library-in-your-project). This lets you complete [step 1](#step-1-include-the-library-in-your-project) and continue with the enrollment flow below.

## Additional resources

* Yuno offers a [TypeScript library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) that complements the SDK.

* See [Choose the right integration for you](choose-your-integration) if you're unsure which flow to follow.

* See the [Demo App](https://github.com/yuno-payments/yuno-sdk-web) for a complete implementation (clone from the repository).

## Requirements

* A [customer](ref:create-customer) created in Yuno, a [customer session](ref:create-customer-session), and an [enrollment payment method object](ref:enroll-payment-method-checkout): reference each API when setting up your backend.
* Public API key (obtain from the [Yuno Dashboard](https://dashboard.y.uno/) → **Developers** > **Credentials**)

## Parameters

For the full list of parameters and callbacks, see the [Web SDK Common Reference](web-sdk-common-reference).

| Parameter              | Description                                                                    |
| ---------------------- | ------------------------------------------------------------------------------ |
| `customerSession`      | Customer session ID from your backend (Create customer session API). Required. |
| `countryCode`          | ISO country code (e.g. `US`).                                                  |
| `language`             | Language code for the UI (e.g. `en`). Optional.                                |
| `showLoading`          | Show loading spinner. Optional.                                                |
| `onLoading`            | Callback: loading state updates. Optional.                                     |
| `elementSelector`      | CSS selector where the enrollment form mounts. Optional.                       |
| `card`                 | Card form options. Optional.                                                   |
| `yunoEnrollmentStatus` | Callback: enrollment ended; receives `vaultedToken` and `status`.              |
| `issuersFormEnable`    | Show issuer (bank) list. Optional.                                             |
| `texts`                | Custom button/label text. Optional.                                            |

## Lite Enrollment (Web)

Use Lite for enrollment only; for payments, use [Seamless (payment Web)](payment-flows-web#seamless-payment-web). Implement Lite enrollment as follows.

### Step 1: Include the library in your project

Including the library in your project is done in the same way as in [payment flows](payment-flows-web#include-the-library-in-your-project).

### Step 2: Initialize the SDK

See [Quickstart guide](quickstart-guide#web-sdk-integration) for initialization.

### Step 3: Create a customer session and an enrollment payment method object

Create a [customer session](ref:create-customer-session) and an [enrollment payment method object](ref:enroll-payment-method-checkout) on your **server-side** to keep private API keys secure; define which payment method the customer can enroll when creating the payment method object.

#### Server-side example

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

#### Client-side example

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

To verify cards (zero-value authorization) before enrollment, add the `verify` struct when defining the payment method object on the server.

### Step 4: Mount the enrollment lite

Use `yuno.mountEnrollmentLite` with the parameters below.

| Parameter                         | Description                                                                                                                                                                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customerSession`                 | Refers to the current enrollment's [customer session](ref:create-customer-session). Example: `e15648b0-fcd5-4799-a14c-cc463ae8a133`.                                                                                                              |
| `countryCode`                     | Country for the payment process. Use an `ENUM` value; see [Country Coverage](country-coverage).                                                                                                                                                   |
| `language`                        | Language for payment forms. Use any code listed in [Supported languages](languages-supported). Example: `en-US`. Defaults to browser language when available.                                                                                     |
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
   * The complete list of country codes is available on https://docs.y.uno/docs/country-coverage
   */
  countryCode: country,
  /**
  - Language for payment forms (see Supported languages)
  - Defaults to browser language when available
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

### `continuePayment` return value or null

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

When the method returns an object, use it to handle redirects; when it returns null, no extra merchant-side action is needed. See the [Demo App](https://github.com/yuno-payments/yuno-sdk-web) for a full implementation (clone from the repository).

### Complementary features

For styling, themes, form options, and additional configurations, see [SDK customizations](sdk-customizations-web).

## Headless Enrollment (Web)

Yuno's Headless integration lets you enroll payment methods and tokenize cards for future use. Use [Seamless (payment Web)](payment-flows-web#seamless-payment-web) if you prefer pre-built UI; Headless is for custom UI and direct API control. See [Requirements](#requirements) above.

### Step 1: Include the library in your project

Including the library in your project is done in the same way as in payment flows. Follow the steps in [Include the library in your project](payment-flows-web#include-the-library-in-your-project) there.

### Step 2: Initialize the SDK

See [Quickstart guide](quickstart-guide#web-sdk-integration) for loading and initializing.

### Step 3: Create a customer session

To start the enrollment process, provide the `customer_session`. Create a customer using the [Create Customer](ref:create-customer) endpoint. In the response, you'll receive the customer `id`, which you use to create the customer session.

After creating the customer, you can create the customer session. Use the customer `id` and the [Create Customer Session](ref:create-customer-session) endpoint. The `customer_session` will be provided in the response. You need a new `customer_session` every time you enroll in a new payment method.

### Step 4: Create an enrollment payment method object

Create an enrollment payment method with the [Enroll Payment Method](ref:enroll-payment-method-checkout) endpoint and set which method the customer can enroll (Headless supports CARD only). To verify cards (zero-value authorization) before enrollment, include the `verify` object when creating the payment method object.

### Step 5: Start the enrollment process

Call `apiClientEnroll` with the parameters below.

| Parameter         | Description                                                                                                                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `countryCode`     | This parameter specifies the country for which the enrollment process is being set up. Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](country-coverage) page. |
| `customerSession` | Refers to the current customer's [customer session](ref:create-customer-session). Example: `'eec6578e-ac2f-40a0-8065-25b5957f6dd3'`                                                                                                                                                 |

```javascript
const apiClientEnroll = yuno.apiClientEnroll({
  countryCode: "US",
  customerSession: "eec6578e-ac2f-40a0-8065-25b5957f6dd3"
});
```

### Step 6: Continue enrollment

Use the Headless API client to continue the enrollment process and generate a `vaulted_token`:

```javascript
const vaultedTokenResponse = await apiClientEnroll.continueEnrollment({
  customer_session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3",
  payment_method: {
    type: "CARD",
    card: {
      detail: {
        expiration_month: 11,
        expiration_year: 25,
        number: "4111111111111111",
        security_code: "123",
        holder_name: "ANDREA B",
        type: "DEBIT"
      }
    },
    customer: {
    }
  }
});
```

The response will include the `vaulted_token` and enrollment `status`, which you can use for future payments or to update your customer records.

## Common reference

For full parameter and customization details, see the [Web SDK Common Reference](web-sdk-common-reference).
