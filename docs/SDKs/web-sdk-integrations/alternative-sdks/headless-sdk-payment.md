---
title: Headless SDK (Payment Web)
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
> 👍 Recommended SDK
>
> We recommend using the [Web Seamless SDK](seamless-sdk-payment-web) for a smooth integration experience. This option provides a flexible payment solution with pre-built UI components and customization options.

Yuno's Headless SDK lets you create payments. Note that when using the Headless SDK, you will need to request and send via API all the mandatory fields the payment provider requires to generate payment in their API.

Yuno's Headless SDK enables you to create payments in two different scenarios:

* Create a [One-Time Use Token](doc:tokens) using credit card information, then create a payment.
* Create a [One-Time Use Token](doc:tokens) using a `vaulted_token` from a previously enrolled credit card, then create a payment.

The following steps describe creating a payment using Yuno's Headless SDK.

## Step 1: Include the library in your project

Before proceeding with the Headless SDK implementation, please refer to the [Yuno SDK Integration Guide](doc:yuno-sdk-integration-guide) for detailed instructions on how to properly integrate the SDK into your project.

The integration guide provides three flexible methods:

1. Direct HTML script inclusion
2. Dynamic JavaScript injection
3. NPM module installation

Choose the integration method that best suits your development workflow and technical requirements. After completing the SDK integration, you can proceed with the following steps to implement the Headless checkout functionality.

> 📘 TypeScript Library
>
> If you are using TypeScript, Yuno provides a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) that you can use to see all available methods available in the Yuno Web SDK.

## Step 2: Initialize Headless SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid `PUBLIC_API_KEY`. If you don't have your API credentials, access the [Developers (Credentials)](doc:developers-credentials) page to check how to retrieve them from the dashboard.

The code block below presents an example of initializing the `Yuno` class and assigning it to the `yuno`constant.

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

## Step 3: Start the checkout process

Next, you will start the checkout process using the `apiClientPayment` function, providing the necessary configuration parameters. The following table lists all required parameters and their descriptions.

| Parameter          | Description                                                                                                                                                                                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `country_code`     | This parameter specifies the country for which the payment process is being set up. Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk) page. |
| `checkout_session` | Refers to the current payment's checkout session created using the [Create Checkout Session](ref:create-checkout-session) endpoint. `Example: '438413b7-4921-41e4-b8f3-28a5a0141638'`                                                                                                         |

The next code block presents an example of the parameter configuration.

```javascript
const apiClientPayment = yuno.apiClientPayment({
  /**
   * The complete list of country_codes is available on https://docs.y.uno/docs/country-coverage-yuno-sdk
   */
  country_code: "US",
  /**
   * The checkout_session created using the following endpoint https://docs.y.uno/reference/create-checkout-session
   */
  checkout_session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3",
});
```

## Step 4: Generate token

After collecting all user information, you can start the payment. First, you need to create a one-time token (OTT) using the function `apiClientpayment.generateToken`. As it is an asynchronous function, you can use `try/catch` to ensure you will correctly handle triggered errors. Below, you will find two examples of different scenarios to create the one-time token:

1. **Example 1**: Create a one-time token utilizing a card as the payment method and including all requisite card information.
2. **Example 2**: Create a one-time token using the `vaulted_token` information.

> 📘 Benefits of Using a Vaulted Token
>
> When you use a vaulted token with the SDK, all the fraud information from the providers you configured in your card routing is collected and attached to the one-time token. In addition, you can add installment information and a security code if the provider requires it.

```javascript Example 1
/**
 * Create one-time token
 * This will trigger an error if data is missing.
 * You can catch it using a try/catch.
 */
const oneTimeToken = await apiClientPayment.generateToken({
  /**
   * @optional:
   * The checkout_session created using the following endpoint https://docs.y.uno/reference/create-checkout-session
   */
  checkout_session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3",
  /**
   * The necessary info to use the payment method structure
   */
  payment_method: {
    type: "CARD",
    /**
     * @optional
     * Send this value if you already have a registered or enrolled payment method.
     * Other fields like card and customer are optional unless your provider requires them.
     */
    vaulted_token: null,
    card: {
      /**
       * @optional
       * Set this value to “true” if you want to generate a vaulted_token (tokenize) the card.
       */
      save: false,
      detail: {
        expiration_month: 11,
        expiration_year: 25,
        number: "4111111111111111",
        security_code: "123",
        holder_name: "ANDREA B",
        type: "DEBIT" /* 'CREDIT' also possible */,
      },
      /**
       * @optional
       * Only necessary if an installment plan is created for the account.
       */
      installment: {
        id: "64ceacef-0886-4c81-9779-b2b3029c4e8b",
        value: 1,
      },
    },
    /**
     * @optional
     * Customer information.
     */
    customer: {
      // Add the complete customer object here.
      // You can check the object here: https://docs.y.uno/reference/the-customer-object
      // You create the customer using the following endpoint: https://docs.y.uno/reference/create-customer
    },
    /**
     * @optional
     * Only necessary if a fraud screening configuration is created for the account.
     */
    device_fingerprint: "0753b47f-bb43-86ab-647b-d735b67baac6",
    /**
     * @optional
     * Only necessary if a third-party configuration is created for the account.
     */
    third_party_session_id: "QbJU2KolVUm1fhQR0s9qgrS0ArEQmEfE",
  },
});
```

```javascript Example 2
/**
 * Create One-Time Token
 * This will trigger an error if data is missing.
 * You can catch it using a try/catch.
 */
const oneTimeToken = await apiClientPayment.generateToken({
  /**
   * @optional:
   * The checkout_session created using the following endpoint https://docs.y.uno/reference/create-checkout-session
   */
  checkout_session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3",
  /**
   * The necessary info to use the payment method structure
   */
  payment_method: {
    type: "CARD",
    /**
     * @optional
     * Send this value if you already have a registered or enrolled payment method.
     * Other fields like card and customer are optional unless your provider requires them.
     */
    vaulted_token: "aad8578e-ac2f-40a0-8065-25b5957f6555",
    card: {
      detail: {
        security_code: "123",
      },

      /**
       * @optional
       * Only necessary if an installment plan is created for the account.
       */
      installment: {
        id: "64ceacef-0886-4c81-9779-b2b3029c4e8b",
        value: 1,
      },
    },
  },
});
```

> ❗️ PCI Compliance
>
> Please bear in mind that you are capturing sensitive card data. Therefore, you need to comply with good practices regarding data management. If you don't have a PCI certification, you can't save any card data other than the token provided by the SDK.

The following code block presents the `apiClientPayment.generateToken` function responses for both examples above.

```json Example 1
{
  "token": "ee78bc2a-63b4-45bb-bd28-3e6829ab1c3d",
  "vaulted_token": null,
  "vault_on_success": false,
  "type": "CARD",
  "card_data": {
    "holder_name": "ANDREA B",
    "iin": "41111111",
    "lfd": "1111",
    "number_length": 16,
    "security_code_length": 3,
    "brand": "VISA",
    "type": "CREDIT",
    "category": "CREDIT",
    "issuer_name": "JPMORGAN CHASE BANK N A",
    "issuer_code": null
  },
  "customer": {
    "first_name": "Cesar",
    "last_name": "Sanchez",
    "email": "cesar.sanchez@y.uno",
    "gender": "",
    "phone": null,
    "billing_address": null,
    "document": null,
    "browser_info": {
      "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      "accept_header": "*/*",
      "accept_content": "*/*",
      "accept_browser": "*/*",
      "color_depth": "24",
      "screen_height": "1080",
      "screen_width": "2560",
      "javascript_enabled": true,
      "java_enabled": false,
      "browser_time_difference": "300",
      "language": "en-US"
    },
    "device_fingerprint": "19764508-c9df-a90b-a365-83b2d718c12e"
  },
  "installment": null,
  "country": "CO"
}
```

```json Example 2
{
  token: 'ee78bc2a-63b4-45bb-bd28-3e6829ab1c3d',
  vaulted_token: aad8578e-ac2f-40a0-8065-25b5957f6555,
  vault_on_success: false,
  type: 'CARD',
  card_data: {
    holder_name: 'ANDREA B',
    iin: '41111111',
    lfd: '1111',
    number_length: 16,
    security_code_length: 3,
    brand: 'VISA',
    type: 'CREDIT',
    category: 'CREDIT',
    issuer_name: 'JPMORGAN CHASE BANK N A',
    issuer_code: null,
  },
  customer: {
    first_name: 'Cesar',
    last_name: 'Sanchez',
    email: 'cesar.sanchez@y.uno',
    gender: '',
    phone: null,
    billing_address: null,
    document: null,
    browser_info: {
      user_agent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      accept_header: '*/*',
      accept_content: '*/*',
      accept_browser: '*/*',
      color_depth: '24',
      screen_height: '1080',
      screen_width: '2560',
      javascript_enabled: true,
      java_enabled: false,
      browser_time_difference: '300',
      language: 'en-US',
    },
    device_fingerprint: '19764508-c9df-a90b-a365-83b2d718c12e',
  },
  installment: null,
  country: 'CO',
}
```

## Step 5: Create the Payment

After receiving the one-time token, you can create the payment using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment) to get the final payment result. You will inform the one-time token received in [Step 4](doc:headless-sdk-payment#step-4-generate-an-ott-one-time-token) through the request's `payment_method.token` parameter. The following code block presents a request example for creating a payment.

```json
{
  "merchant_order_id": "0000022",
  "country": "US",
  "account_id": "<Your account_id>",
  "description": "Test",
  "amount": {
    "currency": "USD",
    "value": 500
  },
  "customer_payer": {
    "id": "cfae0941-7234-427a-a739-ef4fce966c79"
  },
  "checkout": {
    "session": "<checkout session>"
  },
  "workflow": "SDK_CHECKOUT",
  "payment_method": {
    "type": "CARD",
    "token": "2cd31999-e44e-4de3-bbe4-179981ff4295"
  }
}
```

The endpoint response provides the `sdk_action_required` parameter that defines if additional actions are necessary to conclude the payment:

* If your customer selects a synchronous payment method, the payment is completed instantly. In this scenario, the field `sdk_action_required` in the API response will be `false`, and the payment process concludes at this step.
* When an additional interaction of the SDK is needed to complete the payment flow, `sdk_action_required` will be `true`. If this is the case, you need to follow the instructions from [Step 6](doc:headless-sdk-payment#step-6-get-the-3ds-challenge-url).

## Step 6: Get the 3DS challenge URL

As described on the [3DS Card Verification](doc:3d-secure) page, a payment with 3DS may require an additional challenge to check the customer's identity. If an additional verification step is necessary related to a 3DS verification challenge, the response to the [Create Payment](ref:create-payment) endpoint will have the following information:

* A `THREE_D_SECURE `transaction type.
* Status equal to `PENDING` and sub status equal to `WAITING_ADDITIONAL_STEP`.
* The `sdk_action_required` set as `true`.

To get the 3DS challenge URL, you should call the `getThreeDSecureChallenge` function, providing the `checkoutSession` used to create the payment.

```javascript
/**
 * Get 3D Secure URL
 * This will trigger an error if there is missing data
 * You can catch it using a try/catch
 */

const data = await apiClientPayment.getThreeDSecureChallenge(checkoutSession?: string): Promise<{url: string}>
```

If the card does not require a challenge to verify the customer's identity, the `url` will return `null`.

In a web browser, you can open the URL in a new tab or an IFrame. To open the URL in an iframe, you must set the param `embedded = true`. If not, you can omit this parameter, whose default value is `false`. The next code block presents an example of displaying the 3DS challenge content in an IFrame.

```javascript

/**
 * Add or modify an iframe into your document
 */

document.querySelector('#element').innerHTML = `
   <iframe
     src="${data.url}&embedded=true"
     height="700px"
     width="100%"
     border="0"
     frameBorder="0">
   </iframe>
 `
/**
 * The iframe will send an event when the challenge is finished
 */

window.addEventListener('message', (event) => {
   if (
        !event.origin.toLocaleLowerCase().includes('sdk-3ds') ||
        event?.data?.origin !== 'CHALLENGE'
   ) {
     return
   }
   document.querySelector('#element').innerHTML = ‘’
   if (event.data.status === 'ERROR') {
     document.querySelector('#element').innerHTML = ‘There was an error’
   } else {
     document.querySelector('#element').innerHTML = ‘Challenge was finished’
   }
})
```

You are responsible for redirecting your customers to the URL provided by the `redirect_url` to complete the challenge. Once the customer successfully completes the 3DS challenge, they will be automatically redirected to the `callback_url`, which you provided when creating the `checkout_session` with the [Create Checkout Session](ref:create-checkout-session) endpoint.

To complete the Headless SDK payment flow, you need to use [Yuno Webhooks](doc:configure-webhooks), which will promptly notify you about the outcome of the 3DS challenge and the final payment status. Using webhooks ensures that you receive real-time updates on the progress of the payment transaction. In addition to the webhooks, you can retrieve the payment information using the [Retrieve Payment by ID](ref:retrieve-payment-by-id) endpoint.

## Step 7: Get payment actions

Sometimes the payment may require an extra action to continue the payment flow. To determine what action is needed, you should call the `getContinuePaymentAction` method, providing the `checkoutSession` used to create the payment.

```javascript
/**
 * Get Payment Action
 * This will trigger an error if there is missing data
 * You can catch it using a try/catch
 */
const data = await apiClientPayment.getContinuePaymentAction({ checkoutSession: string }): Promise<ContinuePaymentAction>
```

The `getContinuePaymentAction` method returns a `ContinuePaymentAction` object that describes the specific action required to continue the payment flow, depending on the provider and the specific step required.

### `ContinuePaymentAction` response structure

The response contains information about the type of action required and the necessary data to perform that action:

```typescript
/*
 * Describes an action to continue a payment flow depending on the provider and the specific step required.
 */
type ContinuePaymentAction = {
  // Type of payment provider (e.g., MERCADO_PAGO, DLOCAL, etc.)
  type: Provider.Type;

  // Specific action required to continue the payment (e.g., REDIRECT_URL, OTP, etc.)
  action: Provider.Action;

  // Used when the payment provider issues a payment code (e.g., for cash-based payments)
  payment_code?: {
    code: string; // The actual code to be used by the customer
    reference: string; // Reference associated with the code (e.g., payment ID)
    expiration_time?: number; // Unix timestamp when the code expires
  };

  // Used when an image (e.g., QR code) must be displayed to the user
  image?: {
    type: string; // MIME type of the image (e.g., 'image/png')
    value: string; // Base64-encoded image data
    reference: string; // Image reference or ID
    expiration_time?: number; // Expiry time for the image
    additional_data?: Record<string, undefined>; // Extra metadata (reserved for future use)
  };

  // Used when a redirect is required (e.g., for 3rd-party payment flows)
  redirect?: {
    init_url: string; // URL to initiate the redirect flow
    success_url: string; // URL to redirect to after successful payment
    error_url: string; // URL to redirect to if the payment fails
  };

  // Used when the flow requires OTP (One-Time Password) validation
  otp?: {
    length: number; // Expected OTP length
    expiration_time: number; // Time (in seconds) before OTP expires
    retries: {
      accepts: boolean; // Whether retries are allowed
      number: number; // Max number of retries allowed
    };
    resend: {
      timer: number; // Cooldown time (in seconds) before OTP can be resent
      number: number; // Max number of resends allowed
    };
    payment_instructions: string; // Message or instructions for user to complete the payment
  };

  // Used for 3DS flows that redirect the user to a secure verification step
  three_d_secure_redirect?: {
    init_url: string; // URL to start the 3DS process
    access_token: string; // Token used for authentication with the 3DS provider
    redirect_url?: string; // Optional final redirect after 3DS completes
  };

  // Unique transaction ID, if available
  transaction_id?: string;

  // Used to render a payment form with dynamic HTML and headers
  request_html?: {
    body?: Record<string, string>; // Payload to send (e.g., form fields)
    headers?: Record<string, string>; // HTTP headers for the request
    method?: "POST" | "GET" | "PUT" | "PATCH" | "DELETE"; // HTTP method
    url: string; // Endpoint to send the request to
  };

  // Used for SDK-based providers (e.g., Apple Pay, Google Pay)
  sdk_provider?: {
    client_id?: string; // Optional client ID for the SDK
    intent?: string; // Payment intent or context (e.g., "buy", "subscribe")
    components?: string; // Components required by the SDK (e.g., "buttons")
    gateway: string; // Payment gateway name
    init_url?: string; // URL to initialize the SDK session
    merchant_id: string; // Merchant identifier
    amount: {
      currency: string; // ISO currency code (e.g., "USD")
      value: number; // Amount in minor units (e.g., cents)
    };
    protocol_version?: string; // Version of the protocol (e.g., for Apple Pay)
    provider_id?: string; // Internal or external provider identifier
    payment_methods?: string[]; // List of supported payment methods
    supported_networks?: string[]; // Card networks supported (e.g., ["visa", "mastercard"])
    session?: {
      epoch_timestamp: number; // Timestamp of session creation
      expires_at: number; // Expiration timestamp
      merchant_session_identifier: string; // Unique session ID
      nonce: string; // Random nonce for security
      merchant_identifier: string; // Merchant's unique identifier
      domain_name: string; // Domain name initiating the session
      display_name: string; // Merchant's display name
      signature: string; // Cryptographic signature for validation
      operational_analytics_identifier: string; // Used for tracking
      retries: number; // Number of retry attempts
      psp_id: string; // Payment Service Provider ID
    };
    provider_token_id?: string; // Token ID used by the provider
  };

  // Used to display HTML content directly in the app
  render_html?: {
    content?: string; // HTML markup to be rendered
    redirect_url?: string; // URL to redirect to after displaying the content
  };

  // General information or messaging (e.g., show confirmation message)
  info?: {
    screen_info?: string; // Text to be shown on a screen
  };

  // Used when the provider needs to render an iframe for the user to interact with
  render_iframe: {
    init_url: string; // URL to load in the iframe
    access_token: string; // Token used to authenticate iframe content
    redirect_url?: string; // Redirect URL after interaction is complete
  };
};
```

### Provider Types and Actions

The following enums define the supported payment providers and possible actions:

```typescript
/*
 * Enum definitions for supported payment providers and actions
 */
export declare namespace Provider {
  // List of supported provider types
  enum Type {
    MERCADO_PAGO = "MERCADO_PAGO",
    WOMPI = "WOMPI",
    PAYMENTEZ = "PAYMENTEZ",
    GETNET = "GETNET",
    TRANSFEERA = "TRANSFEERA",
    CYBERSOURCE_3DS = "CYBERSOURCE_3DS",
    NETCETERA_3DS = "NETCETERA_3DS",
    XENDIT_3DS = "XENDIT_3DS",
    DLOCAL = "DLOCAL",
    CIELO = "CIELO",
    INSWITCH = "INSWITCH",
    PAGALEVE = "PAGALEVE",
    UNLIMINT_3DS = "UNLIMINT_3DS",
  }

  // List of possible actions required to continue a payment
  enum Action {
    PAYMENT_CODE = "PAYMENT_CODE", // Show payment code to user
    IMAGE = "IMAGE", // Show image (e.g., QR code)
    REDIRECT_URL = "REDIRECT_URL", // Redirect the user to external page
    FORM = "FORM", // Render a form to collect user input
    INFO = "INFO", // Display informational screen
    OTP = "OTP", // Require OTP input from user
    SDK_PROVIDER = "SDK_PROVIDER", // Use SDK to process payment
    THREE_D_SECURE_REDIRECT_URL = "THREE_D_SECURE_REDIRECT_URL", // Start 3DS authentication
    REQUEST_HTML = "REQUEST_HTML", // Submit an HTML form request
    RENDER_HTML = "RENDER_HTML", // Render static HTML in the app
    RENDER_IFRAME = "RENDER_IFRAME", // Render iframe for provider UI
  }
}
```

### Handling different action types

Based on the `action` field in the response, you should handle each type of action accordingly:

#### `REDIRECT_URL` Action

When the action is `REDIRECT_URL`, you should redirect the user to the URL provided in `data.redirect.init_url`:

```javascript
if (data.action === "REDIRECT_URL") {
  // Redirect user to the provider's payment page
  window.location.href = data.redirect.init_url;
}
```

#### Other Action Types

Each action type requires specific handling based on the data provided:

* **PAYMENT\_CODE**: Display the payment code and reference to the user
* **IMAGE**: Show a QR code or other image to the user
* **OTP**: Present an OTP input form to the user
* **SDK\_PROVIDER**: Initialize the specific provider's SDK
* **RENDER\_IFRAME**: Display an iframe with the provider's interface

> 📘 Payment Action Handling
>
> The specific implementation for handling each action type will depend on your application's UI framework and requirements. Ensure you handle all possible action types that your configured payment providers might return.

> 📘 Demo App
>
> In addition to the code examples provided, you can access the [Demo App](#demo-app) for a complete implementation of Yuno SDKs.