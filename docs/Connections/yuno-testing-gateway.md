---
title: Yuno Testing Gateway
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
To test Card payments in general, Yuno provides the **Yuno Test Payment Gateway**. It works as a connection, however, it is available **only** in the sandbox environment.

## Connecting with Yuno

[block:html]
{
  "html": "<style>\n  * {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n  }\n\n\n  .shelf {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  .psp-card {\n    background-color: var(--yuno-card-background);\n    border-radius: 10px;\n    border: 1px solid var(--yuno-purple);\n    max-width: 800px;\n\n  }\n\n  .detail-psp-card {\n    max-width: 800px;\n    margin: 0;\n    padding: 20px;\n  }\n\n  .detail-psp-card-content {\n    display: grid;\n    grid-template-columns: 1fr 3fr;\n    column-gap: 5%;\n    align-items: center;\n    font-size: 0.85rem;\n    border-bottom: 1px solid #BABABA;\n    margin-bottom: 0.5rem;\n  }\n\n  .detail-psp-card-content-tables {\n    align-items: center;\n    font-size: 0.85rem;\n    border-bottom: 1px solid #BABABA;\n    padding: 2rem 0;\n\n  }\n\n  .detail-psp-card-content:last-of-type {\n    border: 0;\n    margin-bottom: 0;\n  }\n\n  .detail-psp-card-content .label {\n    font-weight: 500;\n    margin: 0.6rem 0;\n  }\n\n  .detail-psp-card-content ul, .detail-psp-card-content  ol {\n    padding-left: 0 !important;\n  }\n\n  .detail-psp-card-content .content {\n    font-weight: 400;\n    margin: 0.6rem 0;\n  }\n\n  .detail-psp-card-content li {\n    list-style-position: inside;\n  }\n\n  .detail-psp-card-content .seccond-level-bullet-list li {\n    padding-left: 1rem;\n    list-style-type: square;\n  }\n\n\n  .detail-psp-card .content .contry-badge {\n    display: flex;\n    align-items: center;\n    border-radius: 7px;\n    margin-bottom: 16px;\n  }\n\n  .detail-psp-card .content .container-county-img {\n    border-radius: 50%;\n    background-color: rgba(197, 78, 230, 0.1);\n    padding: 0.1rem;\n    margin-right: 7px;\n  }\n\n  .detail-psp-card .content .container-county-img .county-img {\n    max-width: 25px;\n  }\n\n  .psp-card .detail-psp-card .content table {\n    border-collapse: collapse;\n    width: 100%;\n    font-size: 0.8rem;\n    border: 0;\n    border-radius: 10px;\n  }\n\n  .psp-card .detail-psp-card .content table td,\n  th {\n    border: 0;\n    padding: 6px;\n    font-weight: 400;\n  }\n\n  .psp-card .detail-psp-card .content table td {\n    font-size: 0.8rem;\n    text-align: left;\n    border-top: 1px solid #e5e5e5;\n    border-bottom: 1px solid #e5e5e5;\n  }\n\n  .psp-card .detail-psp-card .content .table-text td {\n    font-size: 0.8rem;\n    text-align: left;\n  }\n\n  .psp-card .detail-psp-card .content table td:nth-child(1) {\n    width: 30%;\n  }\n\n  .psp-card .detail-psp-card .content th {\n    text-align: left;\n    font-weight: 600 !important;\n    border-left: 0;\n    border-right: 0;\n    padding: 6px !important;\n  }\n\n  .psp-card .detail-psp-card .content tr:nth-child(odd) {\n    background-color: var(--yuno-purple-10);\n    ;\n  }\n\n  .psp-card .detail-psp-card .content tr:nth-child(even) {\n    background-color: var(--yuno-card-background);\n    ;\n  }\n  \n   .detail-content-countries-list {\n    display: grid;\n    grid-template-columns: 1fr ;\n    column-gap: 3%;\n    justify-content: space-between;\n  }\n\n \n</style>\n\n<body>\n  <div class=\"shelf\">\n    <div class=\" psp-card\">\n      <section class=\"detail-psp-card \">\n        <div class=\"detail-psp-card-content\">\n          <p class=\"label\"><b>Mandatory fields when integrating via Yuno</b>:</p>\n          <p class=\"content\">\n            Yuno Test Payment Gateway doesn't requiere any key.\n          </p>\n        </div>\n      </section>\n    </div>\n  </div>\n</body>\n"
}
[/block]


## General information

[block:html]
{
  "html": "<body>\n  <div class=\"shelf\">\n    <div class=\" psp-card\">\n      <section class=\"detail-psp-card \">\n        <div class=\"detail-psp-card-content\">\n          <p class=\"label\"><b>Countries</b>:\n            \n          </p>\n         <div class=\"content detail-content-countries-list\">\n        \n           <div class=\"content\">\n            <div class=\"contry-badge\">\n            <div class=\"container-county-img\">\n              <img class=\"county-img\" src=\"https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/flags/world.png\" alt=\"globe-flag\">\n            </div>\n            <span>Available in for all countries. </span>\n          </div>\n          </div>\n           </div>\n        </div>\n        <div class=\"detail-psp-card-content\">\n          <p class=\"label\"><b>Currencies</b>:\n          <p class=\"content\">\n            All currencies are available.\n          </p>\n        </div>\n\t\t\t\t<div class=\"detail-psp-card-content\">\n          <p class=\"label\"><b>Type of cards</b>:</p>\n          <div class=\"content\">\n\t\t\t\t\t\tCredit, Debit and Prepaid.          \n          </div>\n        </div>\n        <div class=\"detail-psp-card-content\">\n          <p class=\"label\"><b>Test data</b>:</p>\n          <div class=\"content\">\n\t\t\t\t\t\t<a href=\"https://docs.y.uno/docs/yuno-testing-gateway#44-provide-the-payment-method-information\">Card information</a> to complete payments in test mode.          \n          </div>\n        </div>\n        \n      </section>\n    </div>\n  </div>\n</body>"
}
[/block]


## Integration configuration

[block:html]
{
  "html": "<body>\n  <div class=\"shelf\">\n    <div class=\" psp-card Mercado-Pago\">\n      <section class=\"detail-psp-card \">\n        <div class=\"detail-psp-card-content\">\n          <p class=\"label\"><b>Dashboard configuration</b>:</p>\n          <div class=\"content\">\n            <ol>\n              <li>Log in to <a href=\"http://dashboard.y.uno/\">dashboard.y.uno</a>.</li>\n              <li>Click <b>Connections</b> and then select <b>Yuno Test Payment Gateway</b>.</li>\n              <li>Click <b>Connect</b>.</li>\n              <li>Introduce <b>Name</b>.</li>\n              <li>Click <b>Connect</b></li>\n            </ol>\n          </div>\n        </div>\n      </section>\n    </div>\n  </div>\n</body>"
}
[/block]


## Production environment

[block:html]
{
  "html": "<body>\n  <div class=\"shelf\">\n    <div class=\" psp-card\">\n      <section class=\"detail-psp-card \">\n        <div class=\"detail-psp-card-content\">\n          <p class=\"label\"><b>Specific procedure for a merchant to go live</b>:</p>\n          <div class=\"content\">\n           This connection is available only for testing procedures. \n          </div>\n        </div>\n      </section>\n    </div>\n  </div>\n</body>"
}
[/block]


## Set up the Yuno Test Payment Gateway

1. Complete the Test Payment Gateway [Integration configuration](doc:yuno-testing-gateway#integration-configuration).
2. After establishing the connection, you must designate the Yuno Test Payment Gateway as your card payment provider in your routing section. Access [Routing](https://dashboard.y.uno/routing) on the Yuno Dashboard, select **Not published**, find the **Card** option, and click **Set Up**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c556c04-image.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "400px"
    }
  ]
}
[/block]


3. Create a new route for **Card**. If you are unsure how to create it, check the [Configure dynamic routing](doc:configure-dynamic-routing).
   1. On the Routing dashboard, add conditions to trigger the card payment. You can use card brand or country as trigger conditions, for example.
   2. For the created condition, add the Yuno Test Payment Gateway.
   3. For the **All other payments** options, select the **Cancel** option. The below image presents an example of a routing configuration where the card brand condition was used, accepting payments with Visa and Mastercard brands.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/75de840-image.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "700px"
    }
  ]
}
[/block]


4. Now you need to make the cards available for testing. Access [Checkout builder](https://dashboard.y.uno/checkout-builder) on the Yuno Dashboard.  Activate the toggle button for **Card** and publish the checkout using the **Publish** button.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4240aa0-image.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "350px"
    }
  ]
}
[/block]


Use the [Create payment](doc:create-payment-basic) guide to learn how to test card payments.

## Test card payments with Yuno Testing Gateway

On this page, you will find a walk-through guide on creating a card payment using the [Yuno Testing Gateway](doc:yuno-testing-gateway). 

[Yuno Testing Gateway](doc:yuno-testing-gateway) is a Yuno solution to test card payment in general. It works as a connection. However, it is only available in the sandbox environment.

### Requirements

Before starting following the steps described in this guide, you need to:

- Access your [API credentials](doc:get-your-api-credentials) on the Yuno Dashboard, which are composed by:
  - `public-api-key`
  - `private-secrete-key`
  - `account_id`
- Set up the Yuno Testing Gateway connection on your Yuno Dashboard account. You find a step-by-step guide on connecting it in the [Integration configuration section](doc:yuno-testing-gateway#integration-configuration).
- [Build a route](doc:configure-dynamic-routing) for the Yuno Testing Gateway to define it as your card payment provider. You find a step-by-step guide on how to do it in the Set up the [Yuno Testing Gateway section](doc:yuno-testing-gateway#set-up-the-yuno-test-payment-gateway).
- [Configure the checkout builder](ref:manage-your-checkout) to make the Yuno Testing Gateway available.

### Steps summary

The create payment process normally requires finishing the four steps listed below.

1. [Create a customer](ref:create-customer)
2. [Create a checkout session](ref:create-checkout-session)
3. [Create a One-Time Token](#3-create-a-one-time-token-ott)
4. [Create the payment](ref:create-payment)

### Create a payment

#### 1. Create a customer

Use the [Create Customer](ref:create-customer) to register the customer info. You will need to provide personal customer information. In addition, you also need to supply the `merchant_customer_id`, a unique identifier for the customer used on your system.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Customer complementary information</h3>\n      <div class=\"contentContainer\">\n        <p>\n          When creating a <b>Customer</b>, certain information is not required but can improve the user's payment experience if provided. Phone, billing address, and shipping address are examples of not mandatory data you can provide.\n        </p>          \n        <p>\n          If you add optional information, be aware of the required mandatory fields.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


At the end of the create a customer process, you will receive an `id`, which identifies the user within the Yuno system. Use the `id` to initialize the checkout. 

If you are creating a payment for an existing user who was previously created and already has an `id`you can skip this step.

#### 2. Create a checkout session

With a customer registered, you can create a checkout session. The checkout is when the customer finalizes their order and proceeds to pay for the products or services they wish to acquire. Therefore, at this stage, you will provide information regarding the payment amount and the location where it is being created.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer alert\">\n    <div class=\"verticalLineAlert\"></div>\n    <div>\n      <h3>Route conditions filtering</h3>\n      <div class=\"contentContainer\">\n        <p>\n          When creating the route, you can define condition that work as filters. If you have used country as a condition, check if the provided country when creating the checkout session in on the condition list. Otherwise, the card payment may not be processed by the Yuno Testing Gateway.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


Use the [Create Checkout Session](ref:create-checkout-session) endpoint. Notice that the `customer_id` required to perform the request is the `id` you received when creating the customer in [Step 1](doc:yuno-testing-gateway#1-create-a-customer). 

From the request response to the  [Create Checkout Session](ref:create-checkout-session) endpoint, you will receive the `checkout_session` information. It will be used to create the one-time token (OTT) and the payment on the next steps.

#### 3. Create a one-time token (OTT)

An OTT is a unique identifier Yuno generates to protect your customer privacy and security. It serves as an identifier for payments detail and prevents sensitive data from being stored on your servers. Therefore, you can use OTTs to make it simple for your customers to repeat payments without re-entering their payment information, making the process more secure and convenient.

You will always get the OTT from the Yuno SDK on your production application. However, to make it easier for you to test the payment creation process, Yuno provides the [Create OTT](<>) endpoint. You will need to provide the  `checkout_session` received in [Step 2](doc:yuno-testing-gateway#2-create-a-checkout-session) and define the payment type as `CARD` through the `type` parameter.  In the response, you will receive the `one-time-token`, which you will use to create the payment. 

#### 4. Create a payment

You will create a payment using the [Create Payment endpoint](ref:create-payment). Below you find a deeper description of how to create a payment.

#### 4.1 Provide the required attributes

Provide customer-related information, including the `checkout_session` from Step 2 through `checkout.session` and `customer_payer` object that contains the `id` from Step 1.

Certain objects are not mandatory when creating a payment. However, if you provide this information, the user’s payment experience will be enhanced. Be aware of the mandatory fields if you wish to provide this information.

#### 4.2 Choose the capture type

Yuno provides two options for payment capture:

- Single-step: Authorization and capture are performed simultaneously. You only need to create the payment. The authorization and capture are performed automatically. For the single-step option, you need to send the `capture` attribute as `true` on the request.
- Two steps: Authorization and capture are performed at different moments. After creating the payment, you will need to perform an authorization request and a capture request.  if you wish to process the payment in Two Steps, send `capture` as `false` and after creating the payment, use the [Authorize Payment](ref:authorize-payment) and the [Capture Authorization](ref:capture-authorization) to complete the process.

#### 4.3 Define the payment workflow

When creating the payment, you need to inform which integration from Yuno you are using. When creating a payment, you must inform it through the `workflow` attribute, which can be:

- `CHECKOUT`: If you are using the Yuno SDK to create the payment.
- `DIRECT`: If you are using a back-to-back integration. To use this workflow, you need to be PCI compliant. 
- `REDIRECT`: If you are using a back-to-back integration and provider redirection.

#### 4.4 Provide the payment method information

Inform the payment method information through the object `payment_method`. Here, you will provide the `one-time-token` through the attribute `token` and select the payment `type` equal to `CARD`, the one informed in  [Step 3](doc:yuno-testing-gateway#3-create-a-one-time-token-ott), based on the [Payment type list](ref:payment-type-list). In addition, you need to add the card information on the object `detail.card`. 

You can use the payment description or specific card data to get the desired result when you test payment with Yuno Test Payment Gateway. The following sections describe in detail each approach.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <div class=\"contentContainer\">\n        <p>\n          Yuno system follows a sequential process, initially examining card data and subsequently evaluating the provided description. Consequently, if there is a disparity in the status indicated by the card data and the description for a testing payment, Yuno will prioritize and reflect the status associated with the card data.\n        </p>          \n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


##### 4.4.1 - Payment Description

To get the desired payment result using the payment description, you need to define the expected result as the description of the payment you create. For example, if you are testing a payment and expect a successful result, the payment description should be "SUCCEEDED". You find all available options in the [Transaction Codes](transaction#transaction-codes) section.

##### 4.4.2 - Card detail

Another option to get the expected payment results is to use one of the testing cards provided by Yuno. In the tables below, you find a list of cards and their data details to use when using the Yuno Testing Gateway. The **Transaction Response Code** column defines the returned payment status when you use the corresponding card.

[block:html]
{
  "html": "<style>\n  * {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n  }\n\n\n  .table-card {\n    border-radius: 10px;\n    border: 1px solid #614ad623;\n    display: flex;\n    transition: all .2s;\n  }\n\n  .table-card:hover {\n    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);\n  }\n\n  .table-card .control-icon {\n    fill: rebeccapurple;\n    transition: .3s ease;\n    pointer-events: none;\n  }\n\n  .table-card .control-icon-close {\n    display: none;\n  }\n\n  details[open] .control-icon-close {\n    display: initial;\n    transition: .3s ease;\n  }\n\n  details[open] .control-icon-expand {\n    display: none;\n  }\n\n  details[open] summary {\n    border: 1px solid #614ad623;\n  }\n\n\n  .table-card summary {\n    padding: 0.8rem 1rem;\n    border-radius: 10px;\n    display: flex;\n    justify-content: flex-start;\n    align-items: center;\n    cursor: pointer;\n  }\n\n  .table-card summary .table-call {\n    display: block;\n    padding: 0;\n    margin: 0;\n    font-size: 0.938rem;\n\n  }\n\n\n  .table-card summary .sumary-icon {\n    display: flex;\n    justify-content: flex-end;\n    flex-grow: 1;\n  }\n\n  .table-card .table-div {\n    margin: 0.5rem 0;\n    padding: 0 0.5rem;\n  }\n\n  .table-card .table-div table {\n    margin: 0 !important;\n    font-size: 0.85rem;\n  }\n\n  .table-card .table-div td {\n    text-align: center;\n  }\n  \n  \n  .table-card .table-div table {\n      display: block !important;\n      overflow-x: auto !important;\n    }\n  \n  summary table {\n  width: 100%;\n  table-layout: fixed;\n}\n  \n  summary th, summary td {\n  width: auto;\n}\n  \n  @media only screen and (max-width: 700px) {\n    .table-card .table-div table {\n      display: block !important;\n      overflow-x: auto !important;\n    }\n  }\n  \n\n\n\n  details[open] div {\n    animation: sweep .3s ease-in-out;\n  }\n\n  @keyframes sweep {\n    0% {\n      opacity: 0;\n      margin-left: -10px\n    }\n\n    100% {\n      opacity: 1;\n      margin-left: 0px\n    }\n  }\n</style>\n\n<body>\n  <details open class=\"table-card\">\n    <summary>\n      <span class=\"table-call\">Visa</span>\n      <div class=\"sumary-icon\">\n        <svg class=\"control-icon control-icon-expand\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"\n          viewBox=\"0 0 16 16\">\n          <path fill-rule=\"evenodd\"\n            d=\"M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z\" />\n        </svg>\n        <svg class=\"control-icon control-icon-close\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"\n          viewBox=\"0 0 16 16\">\n          <path fill-rule=\"evenodd\"\n            d=\"M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z\" />\n        </svg>\n      </div>\n    </summary>\n    <div class=\"table-div\">\n      <table>\n        <thead>\n          <tr>\n            \n            <th>Number</th>\n            <th>Expiration Date</th>\n            <th>Security Code</th>\n            <th>Cardholder Name</th>\n            <th>Transaction Response Code</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            \n            <td>4507990000000002</td>\n            <td>11/28</td>\n            <td>123</td>\n            <td>John Doe</td>\n            <td>SUCCEEDED</td>\n          </tr>\n          <tr>\n            \n            <td>4507990000000010</td>\n            <td>11/28</td>\n            <td>123</td>\n            <td>John Doe</td>\n            <td>INSUFFICIENT_FUNDS</td>\n          </tr>\n          <tr>\n            \n            <td>4507990000000028</td>\n            <td>11/28</td>\n            <td>123</td>\n            <td>John Doe</td>\n            <td>DECLINED_BY_BANK</td>\n          </tr>\n          <tr>\n            \n            <td>4507990000000036</td>\n            <td>11/28</td>\n            <td>123</td>\n            <td>John Doe</td>\n            <td>DO_NOT_HONOR</td>\n          </tr>\n          <tr>\n            \n            <td>4507990000000044</td>\n            <td>11/28</td>\n            <td>123</td>\n            <td>John Doe</td>\n            <td>INVALID_SECURITY_CODE</td>\n          </tr>\n          <tr>\n            \n            <td>4507990000000051</td>\n            <td>11/28</td>\n            <td>123</td>\n            <td>John Doe</td>\n            <td>INVALID_CARD_DATA</td>\n          </tr>\n          <tr>\n            \n            <td>4507990000000069</td>\n            <td>11/28</td>\n            <td>123</td>\n            <td>John Doe</td>\n            <td>REPORTED_STOLEN</td>\n          </tr>\n          <tr>\n            \n            <td>4507990000000077</td>\n            <td>11/28</td>\n            <td>123</td>\n            <td>John Doe</td>\n            <td>ERROR</td>\n          </tr>\n        </tbody>\n        </table>\n    </div>\n  </details>\n</body>"
}
[/block]


[block:html]
{
  "html": "<body>\n  <details open class=\"table-card\">\n    <summary>\n      <span class=\"table-call\">Mastercard</span>\n      <div class=\"sumary-icon\">\n        <svg class=\"control-icon control-icon-expand\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"\n          viewBox=\"0 0 16 16\">\n          <path fill-rule=\"evenodd\"\n            d=\"M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z\" />\n        </svg>\n        <svg class=\"control-icon control-icon-close\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"\n          viewBox=\"0 0 16 16\">\n          <path fill-rule=\"evenodd\"\n            d=\"M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z\" />\n        </svg>\n      </div>\n    </summary>\n    <div class=\"table-div\">\n      <table>\n        \t<thead>\n          <tr>\n            \n            <th>Number</th>\n            <th>Expiration Date</th>\n            <th>Security Code</th>\n            <th>Cardholder Name</th>\n            <th>Transaction Response Code</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            \n            <td>5252440000000002</td>\n            <td>11/28</td>\n            <td>123</td>\n            <td>John Doe</td>\n            <td>SUCCEEDED</td>\n          </tr>\n          <tr>\n            \n            <td>5252440000000010</td>\n            <td>11/28</td>\n            <td>123</td>\n            <td>John Doe</td>\n            <td>INSUFFICIENT_FUNDS</td>\n          </tr>\n          <tr>\n            \n            <td>5252440000000028</td>\n            <td>11/28</td>\n            <td>123</td>\n            <td>John Doe</td>\n            <td>DECLINED_BY_BANK</td>\n          </tr>\n          <tr>\n            \n            <td>5252440000000036</td>\n            <td>11/28</td>\n            <td>123</td>\n            <td>John Doe</td>\n            <td>DO_NOT_HONOR</td>\n          </tr>\n          <tr>\n            \n            <td>5252440000000044</td>\n            <td>11/28</td>\n            <td>123</td>\n            <td>John Doe</td>\n            <td>INVALID_SECURITY_CODE</td>\n          </tr>\n          <tr>\n            \n            <td>5252440000000051</td>\n            <td>11/28</td>\n            <td>123</td>\n            <td>John Doe</td>\n            <td>INVALID_CARD_DATA</td>\n          </tr>\n          <tr>\n            \n            <td>5252440000000069</td>\n            <td>11/28</td>\n            <td>123</td>\n            <td>John Doe</td>\n            <td>REPORTED_STOLEN</td>\n          </tr>\n          <tr>\n            \n            <td>5252440000000077</td>\n            <td>11/28</td>\n            <td>123</td>\n            <td>John Doe</td>\n            <td>ERROR</td>\n          </tr>\n        </tbody>\n        </table>\n    </div>\n  </details>\n</body>"
}
[/block]


[block:html]
{
  "html": "<body>\n  <details open class=\"table-card\">\n    <summary>\n      <span class=\"table-call\">American Express</span>\n      <div class=\"sumary-icon\">\n        <svg class=\"control-icon control-icon-expand\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"\n          viewBox=\"0 0 16 16\">\n          <path fill-rule=\"evenodd\"\n            d=\"M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z\" />\n        </svg>\n        <svg class=\"control-icon control-icon-close\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"\n          viewBox=\"0 0 16 16\">\n          <path fill-rule=\"evenodd\"\n            d=\"M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z\" />\n        </svg>\n      </div>\n    </summary>\n    <div class=\"table-div\">\n      <table>\n        <thead>\n          <tr>\n            \n            <th>Number</th>\n            <th>Expiration Date</th>\n            <th>Security Code</th>\n            <th>Cardholder Name</th>\n            <th>Transaction Response Code</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            \n            <td>370000000000002</td>\n            <td>11/28</td>\n            <td>1234</td>\n            <td>John Doe</td>\n            <td>SUCCEEDED</td>\n          </tr>\n          <tr>\n            \n            <td>370000000000010</td>\n            <td>11/28</td>\n            <td>1234</td>\n            <td>John Doe</td>\n            <td>INSUFFICIENT_FUNDS</td>\n          </tr>\n          <tr>\n            \n            <td>370000000000028</td>\n            <td>11/28</td>\n            <td>1234</td>\n            <td>John Doe</td>\n            <td>DECLINED_BY_BANK</td>\n          </tr>\n          <tr>\n            \n            <td>370000000000036</td>\n            <td>11/28</td>\n            <td>1234</td>\n            <td>John Doe</td>\n            <td>DO_NOT_HONOR</td>\n          </tr>\n          <tr>\n            \n            <td>370000000000044</td>\n            <td>11/28</td>\n            <td>1234</td>\n            <td>John Doe</td>\n            <td>INVALID_SECURITY_CODE</td>\n          </tr>\n          <tr>\n            \n            <td>370000000000051</td>\n            <td>11/28</td>\n            <td>1234</td>\n            <td>John Doe</td>\n            <td>INVALID_CARD_DATA</td>\n          </tr>\n          <tr>\n            \n            <td>370000000000069</td>\n            <td>11/28</td>\n            <td>1234</td>\n            <td>John Doe</td>\n            <td>REPORTED_STOLEN</td>\n          </tr>\n          <tr>\n            \n            <td>370000000000077</td>\n            <td>11/28</td>\n            <td>1234</td>\n            <td>John Doe</td>\n            <td>ERROR</td>\n          </tr>\n        </tbody>\n        </table>\n    </div>\n  </details>\n</body>"
}
[/block]


[block:html]
{
  "html": "<body>\n  <details open class=\"table-card\">\n    <summary>\n      <span class=\"table-call\">Diners</span>\n      <div class=\"sumary-icon\">\n        <svg class=\"control-icon control-icon-expand\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"\n          viewBox=\"0 0 16 16\">\n          <path fill-rule=\"evenodd\"\n            d=\"M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z\" />\n        </svg>\n        <svg class=\"control-icon control-icon-close\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"\n          viewBox=\"0 0 16 16\">\n          <path fill-rule=\"evenodd\"\n            d=\"M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z\" />\n        </svg>\n      </div>\n    </summary>\n    <div class=\"table-div\">\n      <table>\n<thead>\n  <tr>\n    <th>Number</th>\n    <th>Expiration Date</th>\n    <th>Security Code</th>\n    <th>Cardholder Name</th>\n    <th>Transaction Response Code</th>\n  </tr>\n</thead>\n<tbody>\n  <tr>\n\n    <td>3647166000000002</td>\n    <td>11/28</td>\n    <td>123</td>\n    <td>John Doe</td>\n    <td>SUCCEEDED</td>\n  </tr>\n  <tr>\n\n    <td>3647166000000010</td>\n    <td>11/28</td>\n    <td>123</td>\n    <td>John Doe</td>\n    <td>INSUFFICIENT_FUNDS</td>\n  </tr>\n  <tr>\n\n    <td>3647166000000028</td>\n    <td>11/28</td>\n    <td>123</td>\n    <td>John Doe</td>\n    <td>DECLINED_BY_BANK</td>\n  </tr>\n  <tr>\n\n    <td>3647166000000036</td>\n    <td>11/28</td>\n    <td>123</td>\n    <td>John Doe</td>\n    <td>DO_NOT_HONOR</td>\n  </tr>\n  <tr>\n\n    <td>3647166000000044</td>\n    <td>11/28</td>\n    <td>123</td>\n    <td>John Doe</td>\n    <td>INVALID_SECURITY_CODE</td>\n  </tr>\n  <tr>\n\n    <td>3647166000000051</td>\n    <td>11/28</td>\n    <td>123</td>\n    <td>John Doe</td>\n    <td>INVALID_CARD_DATA</td>\n  </tr>\n  <tr>\n\n    <td>3647166000000069</td>\n    <td>11/28</td>\n    <td>123</td>\n    <td>John Doe</td>\n    <td>REPORTED_STOLEN</td>\n  </tr>\n  <tr>\n\n    <td>3647166000000077</td>\n    <td>11/28</td>\n    <td>123</td>\n    <td>John Doe</td>\n    <td>ERROR</td>\n  </tr>\n</tbody>\n</table>\n    </div>\n  </details>\n</body>"
}
[/block]


[block:html]
{
  "html": "<body>\n  <details open class=\"table-card\">\n    <summary>\n      <span class=\"table-call\">UATP</span>\n      <div class=\"sumary-icon\">\n        <svg class=\"control-icon control-icon-expand\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"\n          viewBox=\"0 0 16 16\">\n          <path fill-rule=\"evenodd\"\n            d=\"M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z\" />\n        </svg>\n        <svg class=\"control-icon control-icon-close\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"\n          viewBox=\"0 0 16 16\">\n          <path fill-rule=\"evenodd\"\n            d=\"M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z\" />\n        </svg>\n      </div>\n    </summary>\n    <div class=\"table-div\">\n      <table>\n<thead>\n  <tr>\n    \n    <th>Number</th>\n    <th>Expiration Date</th>\n    <th>Security Code</th>\n    <th>Cardholder Name</th>\n    <th>Transaction Response Code</th>\n  </tr>\n</thead>\n<tbody>\n  <tr>\n    \n    <td>1139000000000002</td>\n    <td>11/28</td>\n    <td>123</td>\n    <td>John Doe</td>\n    <td>SUCCEEDED</td>\n  </tr>\n  <tr>\n    \n    <td>1139000000000010</td>\n    <td>11/28</td>\n    <td>123</td>\n    <td>John Doe</td>\n    <td>INSUFFICIENT_FUNDS</td>\n  </tr>\n  <tr>\n    \n    <td>1139000000000028</td>\n    <td>11/28</td>\n    <td>123</td>\n    <td>John Doe</td>\n    <td>DECLINED_BY_BANK</td>\n  </tr>\n  <tr>\n    \n    <td>1139000000000036</td>\n    <td>11/28</td>\n    <td>123</td>\n    <td>John Doe</td>\n    <td>DO_NOT_HONOR</td>\n  </tr>\n  <tr>\n    \n    <td>1139000000000044</td>\n    <td>11/28</td>\n    <td>123</td>\n    <td>John Doe</td>\n    <td>INVALID_SECURITY_CODE</td>\n  </tr>\n  <tr>\n    \n    <td>1139000000000051</td>\n    <td>11/28</td>\n    <td>123</td>\n    <td>John Doe</td>\n    <td>INVALID_CARD_DATA</td>\n  </tr>\n  <tr>\n    \n    <td>1139000000000069</td>\n    <td>11/28</td>\n    <td>123</td>\n    <td>John Doe</td>\n    <td>REPORTED_STOLEN</td>\n  </tr>\n  <tr>\n    \n    <td>1139000000000077</td>\n    <td>11/28</td>\n    <td>123</td>\n    <td>John Doe</td>\n    <td>ERROR</td>\n  </tr>\n</tbody>\n</table>\n    </div>\n  </details>\n</body>"
}
[/block]


#### 5. Check the payment status

 After performing the request to the [Create Payment](ref:create-payment), you can check the payment status by analyzing the `status` and `sub_status` from the response. Check the [Payment Status](ref:payment) page to see all the options you can receive in response to the payment creation request.

Depending on the processor and payment method, the status may take some time to update. Therefore, you may need to use endpoints to recover the payment status. To perform this task, you can use the [Retrieve Payment by ID](ref:retrieve-payment-by-id) or [Retrieve Payment by merchant_order_id](ref:retrieve-payment-by-merchant_order_id) endpoints. Another option is to use webhooks to receive notifications after each event. Yuno recommends you use webhooks to monitor asynchronous payments better. Check the [Webhooks](doc:configuring-yuno-webhooks) guide to learn how to configure the webhooks solution provided by Yuno.