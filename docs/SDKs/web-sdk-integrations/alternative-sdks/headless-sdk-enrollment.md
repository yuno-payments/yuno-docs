---
title: Headless SDK (Enrollment Web)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Head
  description: >-
    The document outlines the steps for creating a payment using the Headless
    Web SDK, including requirements, initialization, creating a customer
    session, and generating a vaulted token.
  robots: index
next:
  description: ''
---
Yuno's Headless SDK lets you enroll in payment methods and tokenize cards, saving them for future usage.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Recommended SDKs</h3>\n      <div class=\"contentContainer\">\n        <p>\n         We recommend using the <a href=\"full-checkout-sdk\">Web Full SDK</a> or the <a href=\"lite-checkout-sdk\">Web Lite SDK</a> for a smooth integration experience. These options provide a complete solution with built-in forms and validation.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


The following steps describe creating a payment using Yuno's Headless SDK.

## Requirements

To execute the enrollment process, you need to provide the `customer_session` to start the enrollment process in [Step 3](doc:headless-sdk-enrollment#step-3-create-a-customer-session). To acquire the  `customer_session`, you need to:

1. **Create a customer**: A customer is required to enroll in payments. Use the [Create Customer](ref:create-customer) endpoint to create new customers. In the response, you will receive the customer `id`, which you use to create the customer session.
2. **Create the customer session**: Use the  customer `id` and the [Create Customer Session](ref:create-customer-session) endpoint to receive the `customer_session`.

## Step 1: Include the library in your project

Before proceeding with the Headless SDK implementation, please refer to the [Yuno SDK Integration Guide](doc:yuno-sdk-integration-guide) for detailed instructions on how to properly integrate the SDK into your project. 

The integration guide provides three flexible methods:

1. Direct HTML script inclusion
2. Dynamic JavaScript injection
3. NPM module installation

Choose the integration method that best suits your development workflow and technical requirements. After completing the SDK integration, you can proceed with the following steps to implement the headless enrollment functionality.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer \">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>TypeScript library</h3>\n      <div class=\"contentContainer\">\n        <p>\n          If you are using TypeScript, Yuno provides a <a href=\"https://www.npmjs.com/package/@yuno-payments/sdk-web-types\">library</a> that you can use to see all available methods available in the Yuno Web SDK.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 2: Initialize Headless SDK with the public key

In your JavaScript application, create an instance of the `Yuno` class by providing a valid **PUBLIC_API_KEY**. If you don't have your API credentials, access the [Developers (Credentials)](doc:developers-credentials) page to check how to retrieve them from the dashboard. 

The code block below presents an example of initializing the `Yuno` class and assigning it to the `yuno`constant.

```javascript
const yuno = await Yuno.initialize(PUBLIC_API_KEY)
```

## Step 3: Create a customer session

To start the enrollment process, you need to provide the `customer_session`. First, you need to create a customer. You need a customer to enroll payments with. Use the [Create Customer](ref:create-customer) endpoint to create new customers. In the response, you will receive the customer `id`, which you use to create the customer session.

After creating the customer, you can create the customer session. Use the  customer `id` and the [Create Customer Session](ref:create-customer-session) endpoint. The `customer_session` will be provided in the response. You need a new `customer_session` every time you enroll in a new payment method.

## Step 4: Create an enrollment payment method object

You need an enrollment payment method object to set Headless SDK integration for enrollment. You can create one using the [Enroll Payment Method](ref:enroll-payment-method-checkout) endpoint. While creating the payment method object, you need to define which payment method your customer can enroll in. Currently, only CARD is available for Headless SDK.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <div class=\"contentContainer\">\n        <h3>Verify card</h3>\n        <p>\n          If you want to verify cards (zero value authorization) before enrollment, you need to provide the <code>verify</code> object when creating the payment method object for the customer session. \n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 5: Start the enrollment process

Next, you will start the checkout process using the `apiClientEnroll` function, providing the necessary configuration parameters. The following table lists all required parameters and their descriptions. 

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Description",
    "0-0": "`country_code`",
    "0-1": "This parameter specifies the country for which the payment process is being set up.  \nUse an `ENUM` value representing the desired country code. You can find the full list of supported countries and their corresponding codes on the [Country Coverage](doc:country-coverage-yuno-sdk) page.",
    "1-0": "`customer_session`",
    "1-1": "Refers to the current enrollment's [customer session](doc:sessions) received as a response to the [Create Customer Session](ref:create-customer-session)    endpoint.  \n`Example: '438413b7-4921-41e4-b8f3-28a5a0141638'`"
  },
  "cols": 2,
  "rows": 2,
  "align": [
    "left",
    "left"
  ]
}
[/block]


The next code block presents an example of the parameter configuration.

```javascript
const apiClientEnroll = yuno.apiClientEnroll({
  /**
     * country can be one of the following: https://docs.y.uno/docs/country-coverage-yuno-sdk
     */
    country_code: "CO",
     /**
     * The customer_session created in https://docs.y.uno/reference/create-customer-session
     */
    customer_session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3"
  })
```

## Step 6: Generate a vaulted token

After collecting all user information, you can start the enrollment. First, you need to create a `vaulted_token` using the function `apiClientEnroll.continueEnrollment`. As it is an asynchronous function, you can use `try/catch` to ensure you will correctly handle triggered errors. Below, you will find an example of creating a  `vaulted_token`:

```javascript
/**
* Create Token
* This will trigger an error if there is missing data
* You can catch it using a try/catch
*/
const vaultedTokenResponse = await apiClientEnroll.continueEnrollment({
   /**
    * @optional
    * The customer_session created in https://docs.y.uno/reference/create-customer-session
    */
   customer_session:"eec6578e-ac2f-40a0-8065-25b5957f6dd3",
   /**
    * The necessary info to use the payment method structure
    */
   payment_method: {
         type: "CARD",
         card: {
             detail: {
                 expiration_month: 11,
                 expiration_year: 25,
                 number: "4111111111111111",
                 security_code: "123",
                 holder_name: "ANDREA B",
                 type: 'DEBIT' or 'CREDIT'
             }
         },
        /**
         * @optional
         * customer information
         */
         customer: {
        // Add the complete customer object here.
        // You can check the object here: https://docs.y.uno/reference/the-customer-object
        // You create the customer using the following endpoint: https://docs.y.uno/reference/create-customer
        }
     }
 })

```

[block:html]
{
  "html": "<style>\n  .contentContainer {\n    gap: 0;\n  }\n</style>\n\n\n<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <div class=\"contentContainer\">\n        <h3 class=\"localH3\">PCI Compliance</h3>\n        <p>\n\t\t\t\t\tPlease bear in mind that you are capturing sensitive card data. Therefore, you need to comply with good practices regarding data management. If you don't have a PCI certification, you can't save any card data other than the token provided by the SDK.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


After enrolling the new card, you will receive the `vaulted_token`, which you can use to make payments in the future without asking for your customer's card information. The following code block presents an example of a response from the `apiClientEnroll.continueEnrollment` function.

```json
{
 vaulted_token: "9104911d-5df9-429e-8488-ad41abea1a4b",
 customer: {
   session: "eec6578e-ac2f-40a0-8065-25b5957f6dd3"
 },
 status: "ENROLLED" 
 
 /**List of possible statuses:
 * CREATED,
 * EXPIRED,
 * REJECTED,
 * READY_TO_ENROLL,
 * ENROLL_IN_PROCESS,
 * UNENROLL_IN_PROCESS,
 * IN_PROCESS,
 * ENROLLED,
 * DECLINED,
 * CANCELED,
 * ERROR,
 * UNENROLLED;
 */

}

```

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Demo App</h3>\n      <div class=\"contentContainer\">\n        <p>\n          In addition to the code examples provided, you can access the <a href=\"/docs/demo-app\">Demo App</a> for a complete implementation of Yuno SDKs.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]