---
title: Headless SDK (Payment Web)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Headless SDK (Payment Web)
  description: >-
    Complete guide to implement Yuno's Headless Web SDK for payment functionality
  robots: index
next:
  description: ''
---
<br />

> 👍 Recommended SDK
>
> We recommend using the [Web Seamless SDK](seamless-sdk-payment-web) for a smooth integration experience. This option provides a flexible payment solution with pre-built UI components and customization options.

Yuno's Headless SDK lets you create payments. Note that when using the Headless SDK, you will need to request and send via API all the mandatory fields the payment provider requires to generate payment in their API.

Yuno's Headless SDK enables you to create payments in two different scenarios:

* Create a [One-Time Use Token](doc:tokens) using credit card information, then create a payment.
* Create a [One-Time Use Token](doc:tokens) using a `vaulted_token` from a previously enrolled credit card, then create a payment.

The following steps describe creating a payment using Yuno's Headless SDK.

## Step 1: Include the library in your project

Before proceeding with the Headless SDK implementation, see the [Web SDK Common Reference](doc:web-sdk-common-reference) for detailed instructions on how to properly integrate the SDK into your project.

The integration guide provides three flexible methods:

* **Method 1 (HTML)**: Add a single script tag to your HTML file
* **Method 2 (Dynamic JavaScript)**: Load the SDK programmatically with custom error handling
* **Method 3 (NPM)**: Use our NPM package in modern JavaScript applications

For detailed implementation steps for each method, see the [Web SDK Common Reference](doc:web-sdk-common-reference).

Choose the integration method that best suits your development workflow and technical requirements. After completing the SDK integration, you can proceed with the following steps to implement the Headless checkout functionality.

> 📘 TypeScript Library
>
> If you are using TypeScript, Yuno provides a [library](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) that you can use to see all available methods in the Yuno Web SDK.

## Step 2: Initialize Headless SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid `PUBLIC_API_KEY`.

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
```

> 📘 Credentials
>
> See the credentials page for more information: [https://docs.y.uno/reference/authentication](https://docs.y.uno/reference/authentication)

## Step 3: Start the checkout process

Next, you will start the checkout process using the `apiClientPayment` function, providing the necessary configuration parameters.

### Parameters

Configure the payment with the following options:

| Parameter          | Description                                                                                                                                                                                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `country_code`     | This parameter specifies the country for which the payment process is being set up. Use an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk) page. |
| `checkout_session` | Refers to the current payment's checkout session created using the [Create Checkout Session](ref:create-checkout-session) endpoint. Example: `'438413b7-4921-41e4-b8f3-28a5a0141638'`                                                                                                         |

```javascript
const apiClientPayment = yuno.apiClientPayment({
  country_code: "US",
  checkout_session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3"
});
```

## Step 4: Generate token

After collecting all user information, you can start the payment. First, you need to create a one-time token (OTT) using the function `apiClientpayment.generateToken`. As it is an asynchronous function, you can use `try/catch` to ensure you will correctly handle triggered errors. The following examples show different scenarios to create the one-time token:

1. **Example 1**: Create a one-time token utilizing a card as the payment method and including all requisite card information.
2. **Example 2**: Create a one-time token using the `vaulted_token` information.

> 📘 Benefits of Using a Vaulted Token
>
> When you use a vaulted token with the SDK, all the fraud information from the providers you configured in your card routing is collected and attached to the one-time token. In addition, you can add installment information and a security code if the provider requires it.

```javascript Example 1
const oneTimeToken = await apiClientPayment.generateToken({
  checkout_session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3",
  payment_method: {
    type: "CARD",
    vaulted_token: null,
    card: {
      save: false,
      detail: {
        expiration_month: 11,
        expiration_year: 25,
        number: "4111111111111111",
        security_code: "123",
        holder_name: "ANDREA B",
        type: "DEBIT"
      },
      installment: {
        id: "64ceacef-0886-4c81-9779-b2b3029c4e8b",
        value: 1
      }
    },
    customer: {},
    device_fingerprint: "0753b47f-bb43-86ab-647b-d735b67baac6",
    third_party_session_id: "QbJU2KolVUm1fhQR0s9qgrS0ArEQmEfE"
  }
});
```

### Parameters for Example 1

| Parameter                      | Description                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------- |
| `checkout_session`             | The checkout session created using the Create Checkout Session endpoint       |
| `payment_method.type`          | Payment method type, set to "CARD"                                            |
| `payment_method.vaulted_token` | Optional: Use if you have a previously enrolled payment method                |
| `card.save`                    | Optional: Set to "true" to generate a vaulted token for the card              |
| `card.detail`                  | Card information including number, expiration, security code, and holder name |
| `card.detail.type`             | Card type: "DEBIT" or "CREDIT"                                                |
| `card.installment`             | Optional: Required only if an installment plan is configured                  |
| `customer`                     | Optional: Customer information object                                         |
| `device_fingerprint`           | Optional: Required only if fraud screening is configured                      |
| `third_party_session_id`       | Optional: Required only if third-party configuration exists                   |

```javascript Example 2
const oneTimeToken = await apiClientPayment.generateToken({
  checkout_session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3",
  payment_method: {
    type: "CARD",
    vaulted_token: "aad8578e-ac2f-40a0-8065-25b5957f6555",
    card: {
      detail: {
        security_code: "123"
      },
      installment: {
        id: "64ceacef-0886-4c81-9779-b2b3029c4e8b",
        value: 1
      }
    }
  }
});
```

### Parameters for Example 2

| Parameter                      | Description                                                             |
| ------------------------------ | ----------------------------------------------------------------------- |
| `checkout_session`             | The checkout session created using the Create Checkout Session endpoint |
| `payment_method.type`          | Payment method type, set to "CARD"                                      |
| `payment_method.vaulted_token` | Use the vaulted token from a previously enrolled payment method         |
| `card.detail.security_code`    | Security code for the enrolled card                                     |
| `card.installment`             | Optional: Required only if an installment plan is configured            |

The following code block shows the `apiClientPayment.generateToken` function responses for both examples above:

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

After receiving the one-time token, you can create the payment using the [Create Payment endpoint](https://docs.y.uno/reference/create-payment) to get the final payment result. You will inform the one-time token received in [Step 4](#step-4-generate-token) through the request's `payment_method.token` parameter. The following code block shows a request example for creating a payment:

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
* When an additional interaction of the SDK is needed to complete the payment flow, `sdk_action_required` will be `true`. If this is the case, you need to follow the instructions from [Step 6](#step-6-get-the-3ds-challenge-url).

## Step 6: Get the 3DS challenge URL

As described on the [3DS Card Verification](doc:3d-secure) page, a payment with 3DS may require an additional challenge to check the customer's identity. If an additional verification step is necessary related to a 3DS verification challenge, the response to the [Create Payment](ref:create-payment) endpoint will have the following information:

* A `THREE_D_SECURE `transaction type.
* Status equal to `PENDING` and sub status equal to `WAITING_ADDITIONAL_STEP`.
* The `sdk_action_required` set as `true`.

To get the 3DS challenge URL, you should call the `getThreeDSecureChallenge` function, providing the `checkoutSession` used to create the payment.

```javascript
const data = await apiClientPayment.getThreeDSecureChallenge(checkoutSession?: string): Promise<{url: string}>
```

If the card does not require a challenge to verify the customer's identity, the `url` will return `null`.

In a web browser, you can open the URL in a new tab or an IFrame. To open the URL in an iframe, you must set the param `embedded = true`. If not, you can omit this parameter, whose default value is `false`. The following code block shows an example of displaying the 3DS challenge content in an IFrame:

```javascript
document.querySelector('#element').innerHTML = `
   <iframe
     src="${data.url}&embedded=true"
     height="700px"
     width="100%"
     border="0"
     frameBorder="0">
   </iframe>
 `;

window.addEventListener('message', (event) => {
   if (
        !event.origin.toLocaleLowerCase().includes('sdk-3ds') ||
        event?.data?.origin !== 'CHALLENGE'
   ) {
     return
   }
   document.querySelector('#element').innerHTML = '';
   if (event.data.status === 'ERROR') {
     document.querySelector('#element').innerHTML = 'There was an error';
   } else {
     document.querySelector('#element').innerHTML = 'Challenge was finished';
   }
});
```

You are responsible for redirecting your customers to the URL provided by the `redirect_url` to complete the challenge. Once the customer successfully completes the 3DS challenge, they will be automatically redirected to the `callback_url`, which you provided when creating the `checkout_session` with the [Create Checkout Session](ref:create-checkout-session) endpoint.

To complete the Headless SDK payment flow, you need to use [Yuno Webhooks](doc:configure-webhooks), which will promptly notify you about the outcome of the 3DS challenge and the final payment status. Using webhooks ensures that you receive real-time updates on the progress of the payment transaction. In addition to the webhooks, you can retrieve the payment information using the [Retrieve Payment by ID](ref:retrieve-payment-by-id) endpoint.

## Step 7: Get payment actions

Sometimes the payment may require an extra action to continue the payment flow. To determine what action is needed, you should call the `getContinuePaymentAction` method, providing the `checkoutSession` used to create the payment.

```javascript
const data = await apiClientPayment.getContinuePaymentAction({ checkoutSession: string }): Promise<ContinuePaymentAction>
```

The `getContinuePaymentAction` method returns a `ContinuePaymentAction` object that describes the specific action required to continue the payment flow, depending on the provider and the specific step required.

### `ContinuePaymentAction` response structure

The response contains information about the type of action required and the necessary data to perform that action:

```typescript
type ContinuePaymentAction = {
  type: Provider.Type;
  action: Provider.Action;
  payment_code?: {
    code: string;
    reference: string;
    expiration_time?: number;
  };
  image?: {
    type: string;
    value: string;
    reference: string;
    expiration_time?: number;
    additional_data?: Record<string, undefined>;
  };
  redirect?: {
    init_url: string;
    success_url: string;
    error_url: string;
  };
  otp?: {
    length: number;
    expiration_time: number;
    retries: {
      accepts: boolean;
      number: number;
    };
    resend: {
      timer: number;
      number: number;
    };
    payment_instructions: string;
  };
  three_d_secure_redirect?: {
    init_url: string;
    access_token: string;
    redirect_url?: string;
  };
  transaction_id?: string;
  request_html?: {
    body?: Record<string, string>;
    headers?: Record<string, string>;
    method?: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
    url: string;
  };
  sdk_provider?: {
    client_id?: string;
    intent?: string;
    components?: string;
    gateway: string;
    init_url?: string;
    merchant_id: string;
    amount: {
      currency: string;
      value: number;
    };
    protocol_version?: string;
    provider_id?: string;
    payment_methods?: string[];
    supported_networks?: string[];
    session?: {
      epoch_timestamp: number;
      expires_at: number;
      merchant_session_identifier: string;
      nonce: string;
      merchant_identifier: string;
      domain_name: string;
      display_name: string;
      signature: string;
      operational_analytics_identifier: string;
      retries: number;
      psp_id: string;
    };
    provider_token_id?: string;
  };
  render_html?: {
    content?: string;
    redirect_url?: string;
  };
  info?: {
    screen_info?: string;
  };
  render_iframe: {
    init_url: string;
    access_token: string;
    redirect_url?: string;
  };
};
```

### `ContinuePaymentAction` Fields

| Field                     | Description                                                                      |
| ------------------------- | -------------------------------------------------------------------------------- |
| `type`                    | Type of payment provider (e.g., MERCADO_PAGO, DLOCAL, etc.)                      |
| `action`                  | Specific action required to continue the payment (e.g., REDIRECT_URL, OTP, etc.) |
| `payment_code`            | Used when the payment provider issues a payment code for cash-based payments     |
| `image`                   | Used when an image (e.g., QR code) must be displayed to the user                 |
| `redirect`                | Used when a redirect is required for 3rd-party payment flows                     |
| `otp`                     | Used when the flow requires OTP (One-Time Password) validation                   |
| `three_d_secure_redirect` | Used for 3DS flows that redirect the user to a secure verification step          |
| `transaction_id`          | Unique transaction ID, if available                                              |
| `request_html`            | Used to render a payment form with dynamic HTML and headers                      |
| `sdk_provider`            | Used for SDK-based providers (e.g., Apple Pay, Google Pay)                       |
| `render_html`             | Used to display HTML content directly in the app                                 |
| `info`                    | General information or messaging (e.g., show confirmation message)               |
| `render_iframe`           | Used when the provider needs to render an iframe for user interaction            |

### Provider Types and Actions

The following enums define the supported payment providers and possible actions:

```typescript
export declare namespace Provider {
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
    UNLIMINT_3DS = "UNLIMINT_3DS"
  }

  enum Action {
    PAYMENT_CODE = "PAYMENT_CODE",
    IMAGE = "IMAGE",
    REDIRECT_URL = "REDIRECT_URL",
    FORM = "FORM",
    INFO = "INFO",
    OTP = "OTP",
    SDK_PROVIDER = "SDK_PROVIDER",
    THREE_D_SECURE_REDIRECT_URL = "THREE_D_SECURE_REDIRECT_URL",
    REQUEST_HTML = "REQUEST_HTML",
    RENDER_HTML = "RENDER_HTML",
    RENDER_IFRAME = "RENDER_IFRAME"
  }
}
```

### Provider Types and Actions

| Provider Type     | Description                   |
| ----------------- | ----------------------------- |
| `MERCADO_PAGO`    | Mercado Pago payment provider |
| `WOMPI`           | Wompi payment provider        |
| `PAYMENTEZ`       | Paymentez payment provider    |
| `GETNET`          | Getnet payment provider       |
| `TRANSFEERA`      | Transfeera payment provider   |
| `CYBERSOURCE_3DS` | Cybersource 3DS provider      |
| `NETCETERA_3DS`   | Netcetera 3DS provider        |
| `XENDIT_3DS`      | Xendit 3DS provider           |
| `DLOCAL`          | DLocal payment provider       |
| `CIELO`           | Cielo payment provider        |
| `INSWITCH`        | Inswitch payment provider     |
| `PAGALEVE`        | Pagaleve payment provider     |
| `UNLIMINT_3DS`    | Unlimint 3DS provider         |

| Action Type                   | Description                         |
| ----------------------------- | ----------------------------------- |
| `PAYMENT_CODE`                | Show payment code to user           |
| `IMAGE`                       | Show image (e.g., QR code)          |
| `REDIRECT_URL`                | Redirect the user to external page  |
| `FORM`                        | Render a form to collect user input |
| `INFO`                        | Display informational screen        |
| `OTP`                         | Require OTP input from user         |
| `SDK_PROVIDER`                | Use SDK to process payment          |
| `THREE_D_SECURE_REDIRECT_URL` | Start 3DS authentication            |
| `REQUEST_HTML`                | Submit an HTML form request         |
| `RENDER_HTML`                 | Render static HTML in the app       |
| `RENDER_IFRAME`               | Render iframe for provider UI       |

### Handling different action types

Based on the `action` field in the response, you should handle each type of action accordingly:

#### `REDIRECT_URL` Action

When the action is `REDIRECT_URL`, you should redirect the user to the URL provided in `data.redirect.init_url`:

```javascript
if (data.action === "REDIRECT_URL") {
  window.location.href = data.redirect.init_url;
}
```

#### Other Action Types

Each action type requires specific handling based on the data provided:

* **PAYMENT_CODE**: Display the payment code and reference to the user
* **IMAGE**: Show a QR code or other image to the user
* **OTP**: Present an OTP input form to the user
* **SDK_PROVIDER**: Initialize the specific provider's SDK
* **RENDER_IFRAME**: Display an iframe with the provider's interface

> 📘 Payment Action Handling
>
> The specific implementation for handling each action type will depend on your application's UI framework and requirements. Ensure you handle all possible action types that your configured payment providers might return.

> 📘 Demo App
>
> In addition to the code examples provided, you can access the [Demo App](#demo-app) for a complete implementation of Yuno SDKs.

## Stay Updated

Visit the [changelog](https://docs.y.uno/changelog) for the latest SDK updates and version history.
