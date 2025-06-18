---
title: Yuno Testing Gateway
deprecated: false
hidden: false
metadata:
  robots: index
---
To test Card payments in general, Yuno provides the **Yuno Test Payment Gateway**. It works as a connection, however, it is available **only** in the sandbox environment.

## Connecting with Yuno

<HTMLBlock>{`
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }


  .shelf {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .psp-card {
    background-color: var(--yuno-card-background);
    border-radius: 10px;
    border: 1px solid var(--yuno-purple);
    max-width: 800px;

  }

  .detail-psp-card {
    max-width: 800px;
    margin: 0;
    padding: 20px;
  }

  .detail-psp-card-content {
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 5%;
    align-items: center;
    font-size: 0.85rem;
    border-bottom: 1px solid #BABABA;
    margin-bottom: 0.5rem;
  }

  .detail-psp-card-content-tables {
    align-items: center;
    font-size: 0.85rem;
    border-bottom: 1px solid #BABABA;
    padding: 2rem 0;

  }

  .detail-psp-card-content:last-of-type {
    border: 0;
    margin-bottom: 0;
  }

  .detail-psp-card-content .label {
    font-weight: 500;
    margin: 0.6rem 0;
  }

  .detail-psp-card-content ul, .detail-psp-card-content  ol {
    padding-left: 0 !important;
  }

  .detail-psp-card-content .content {
    font-weight: 400;
    margin: 0.6rem 0;
  }

  .detail-psp-card-content li {
    list-style-position: inside;
  }

  .detail-psp-card-content .seccond-level-bullet-list li {
    padding-left: 1rem;
    list-style-type: square;
  }


  .detail-psp-card .content .contry-badge {
    display: flex;
    align-items: center;
    border-radius: 7px;
    margin-bottom: 16px;
  }

  .detail-psp-card .content .container-county-img {
    border-radius: 50%;
    background-color: rgba(197, 78, 230, 0.1);
    padding: 0.1rem;
    margin-right: 7px;
  }

  .detail-psp-card .content .container-county-img .county-img {
    max-width: 25px;
  }

  .psp-card .detail-psp-card .content table {
    border-collapse: collapse;
    width: 100%;
    font-size: 0.8rem;
    border: 0;
    border-radius: 10px;
  }

  .psp-card .detail-psp-card .content table td,
  th {
    border: 0;
    padding: 6px;
    font-weight: 400;
  }

  .psp-card .detail-psp-card .content table td {
    font-size: 0.8rem;
    text-align: left;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }

  .psp-card .detail-psp-card .content .table-text td {
    font-size: 0.8rem;
    text-align: left;
  }

  .psp-card .detail-psp-card .content table td:nth-child(1) {
    width: 30%;
  }

  .psp-card .detail-psp-card .content th {
    text-align: left;
    font-weight: 600 !important;
    border-left: 0;
    border-right: 0;
    padding: 6px !important;
  }

  .psp-card .detail-psp-card .content tr:nth-child(odd) {
    background-color: var(--yuno-purple-10);
    ;
  }

  .psp-card .detail-psp-card .content tr:nth-child(even) {
    background-color: var(--yuno-card-background);
    ;
  }
  
   .detail-content-countries-list {
    display: grid;
    grid-template-columns: 1fr ;
    column-gap: 3%;
    justify-content: space-between;
  }

 
</style>

<body>
  <div class="shelf">
    <div class=" psp-card">
      <section class="detail-psp-card ">
        <div class="detail-psp-card-content">
          <p class="label"><b>Mandatory fields when integrating via Yuno</b>:</p>
          <p class="content">
            Yuno Test Payment Gateway doesn't requiere any key.
          </p>
        </div>
      </section>
    </div>
  </div>
</body>
`}</HTMLBlock>

## General information

<HTMLBlock>{`
<body>
  <div class="shelf">
    <div class=" psp-card">
      <section class="detail-psp-card ">
        <div class="detail-psp-card-content">
          <p class="label"><b>Countries</b>:
            
          </p>
         <div class="content detail-content-countries-list">
        
           <div class="content">
            <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/flags/world.png" alt="globe-flag">
            </div>
            <span>Available in for all countries. </span>
          </div>
          </div>
           </div>
        </div>
        <div class="detail-psp-card-content">
          <p class="label"><b>Currencies</b>:
          <p class="content">
            All currencies are available.
          </p>
        </div>
				<div class="detail-psp-card-content">
          <p class="label"><b>Type of cards</b>:</p>
          <div class="content">
						Credit, Debit and Prepaid.          
          </div>
        </div>
        <div class="detail-psp-card-content">
          <p class="label"><b>Test data</b>:</p>
          <div class="content">
						<a href="https://docs.y.uno/docs/yuno-testing-gateway#44-provide-the-payment-method-information">Card information</a> to complete payments in test mode.          
          </div>
        </div>
        
      </section>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Integration configuration

<HTMLBlock>{`
<body>
  <div class="shelf">
    <div class=" psp-card Mercado-Pago">
      <section class="detail-psp-card ">
        <div class="detail-psp-card-content">
          <p class="label"><b>Dashboard configuration</b>:</p>
          <div class="content">
            <ol>
              <li>Log in to <a href="http://dashboard.y.uno/">dashboard.y.uno</a>.</li>
              <li>Click <b>Connections</b> and then select <b>Yuno Test Payment Gateway</b>.</li>
              <li>Click <b>Connect</b>.</li>
              <li>Introduce <b>Name</b>.</li>
              <li>Click <b>Connect</b></li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Production environment

<HTMLBlock>{`
<body>
  <div class="shelf">
    <div class=" psp-card">
      <section class="detail-psp-card ">
        <div class="detail-psp-card-content">
          <p class="label"><b>Specific procedure for a merchant to go live</b>:</p>
          <div class="content">
           This connection is available only for testing procedures. 
          </div>
        </div>
      </section>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Set up the Yuno Test Payment Gateway

1. Complete the Test Payment Gateway [Integration configuration](doc:yuno-testing-gateway#integration-configuration).
2. After establishing the connection, you must designate the Yuno Test Payment Gateway as your card payment provider in your routing section. Access [Routing](https://dashboard.y.uno/routing) on the Yuno Dashboard, select **Not published**, find the **Card** option, and click **Set Up**.

<Image align="center" width="400px" src="https://files.readme.io/c556c04-image.png" />

3. Create a new route for **Card**. If you are unsure how to create it, check the [Configure dynamic routing](doc:configure-dynamic-routing).
   1. On the Routing dashboard, add conditions to trigger the card payment. You can use card brand or country as trigger conditions, for example.
   2. For the created condition, add the Yuno Test Payment Gateway.
   3. For the **All other payments** options, select the **Cancel** option. The below image presents an example of a routing configuration where the card brand condition was used, accepting payments with Visa and Mastercard brands.

<Image align="center" width="700px" src="https://files.readme.io/75de840-image.png" />

4. Now you need to make the cards available for testing. Access [Checkout builder](https://dashboard.y.uno/checkout-builder) on the Yuno Dashboard.  Activate the toggle button for **Card** and publish the checkout using the **Publish** button.

<Image align="center" width="350px" src="https://files.readme.io/4240aa0-image.png" />

Use the [Create payment](doc:create-payment-basic) guide to learn how to test card payments.

## Test card payments with Yuno Testing Gateway

On this page, you will find a walk-through guide on creating a card payment using the [Yuno Testing Gateway](doc:yuno-testing-gateway).

[Yuno Testing Gateway](doc:yuno-testing-gateway) is a Yuno solution to test card payment in general. It works as a connection. However, it is only available in the sandbox environment.

### Requirements

Before starting following the steps described in this guide, you need to:

* Access your [API credentials](doc:get-your-api-credentials) on the Yuno Dashboard, which are composed by:
  * `public-api-key`
  * `private-secrete-key`
  * `account_id`
* Set up the Yuno Testing Gateway connection on your Yuno Dashboard account. You find a step-by-step guide on connecting it in the [Integration configuration section](doc:yuno-testing-gateway#integration-configuration).
* [Build a route](doc:configure-dynamic-routing) for the Yuno Testing Gateway to define it as your card payment provider. You find a step-by-step guide on how to do it in the Set up the [Yuno Testing Gateway section](doc:yuno-testing-gateway#set-up-the-yuno-test-payment-gateway).
* [Configure the checkout builder](ref:manage-your-checkout) to make the Yuno Testing Gateway available.

### Steps summary

The create payment process normally requires finishing the four steps listed below.

1. [Create a customer](ref:create-customer)
2. [Create a checkout session](ref:create-checkout-session)
3. [Create a One-Time Token](#3-create-a-one-time-token-ott)
4. [Create the payment](ref:create-payment)

### Create a payment

#### 1. Create a customer

Use the [Create Customer](ref:create-customer) to register the customer info. You will need to provide personal customer information. In addition, you also need to supply the `merchant_customer_id`, a unique identifier for the customer used on your system.

> 📘 Customer Complementary Information
>
> When creating a **Customer**, certain information is not required but can improve the user's payment experience if provided. Phone, billing address, and shipping address are examples of non-mandatory data you can provide. If you add optional information, be aware of the required mandatory fields.

At the end of the create a customer process, you will receive an `id`, which identifies the user within the Yuno system. Use the `id` to initialize the checkout.

If you are creating a payment for an existing user who was previously created and already has an `id`you can skip this step.

#### 2. Create a checkout session

With a customer registered, you can create a checkout session. The checkout is when the customer finalizes their order and proceeds to pay for the products or services they wish to acquire. Therefore, at this stage, you will provide information regarding the payment amount and the location where it is being created.

> 🚧 Route Conditions Filtering
>
> When creating the route, you can define conditions that work as filters. If you have used country as a condition, check if the provided country when creating the checkout session is on the condition list. Otherwise, the card payment may not be processed by the Yuno Testing Gateway.

Use the [Create Checkout Session](ref:create-checkout-session) endpoint. Notice that the `customer_id` required to perform the request is the `id` you received when creating the customer in [Step 1](doc:yuno-testing-gateway#1-create-a-customer).

From the request response to the  [Create Checkout Session](ref:create-checkout-session) endpoint, you will receive the `checkout_session` information. It will be used to create the one-time token (OTT) and the payment on the next steps.

#### 3. Create a one-time token (OTT)

An OTT is a unique identifier Yuno generates to protect your customer privacy and security. It serves as an identifier for payments detail and prevents sensitive data from being stored on your servers. Therefore, you can use OTTs to make it simple for your customers to repeat payments without re-entering their payment information, making the process more secure and convenient.

You will always get the OTT from the Yuno SDK on your production application. However, to make it easier for you to test the payment creation process, Yuno provides the [Create OTT]() endpoint. You will need to provide the  `checkout_session` received in [Step 2](doc:yuno-testing-gateway#2-create-a-checkout-session) and define the payment type as `CARD` through the `type` parameter.  In the response, you will receive the `one-time-token`, which you will use to create the payment.

#### 4. Create a payment

You will create a payment using the [Create Payment endpoint](ref:create-payment). Below you find a deeper description of how to create a payment.

#### 4.1 Provide the required attributes

Provide customer-related information, including the `checkout_session` from Step 2 through `checkout.session` and `customer_payer` object that contains the `id` from Step 1.

Certain objects are not mandatory when creating a payment. However, if you provide this information, the user’s payment experience will be enhanced. Be aware of the mandatory fields if you wish to provide this information.

#### 4.2 Choose the capture type

Yuno provides two options for payment capture:

* Single-step: Authorization and capture are performed simultaneously. You only need to create the payment. The authorization and capture are performed automatically. For the single-step option, you need to send the `capture` attribute as `true` on the request.
* Two steps: Authorization and capture are performed at different moments. After creating the payment, you will need to perform an authorization request and a capture request.  if you wish to process the payment in Two Steps, send `capture` as `false` and after creating the payment, use the [Authorize Payment](ref:authorize-payment) and the [Capture Authorization](ref:capture-authorization) to complete the process.

#### 4.3 Define the payment workflow

When creating the payment, you need to inform which integration from Yuno you are using. When creating a payment, you must inform it through the `workflow` attribute, which can be:

* `CHECKOUT`: If you are using the Yuno SDK to create the payment.
* `DIRECT`: If you are using a back-to-back integration. To use this workflow, you need to be PCI compliant.
* `REDIRECT`: If you are using a back-to-back integration and provider redirection.

#### 4.4 Provide the payment method information

Inform the payment method information through the object `payment_method`. Here, you will provide the `one-time-token` through the attribute `token` and select the payment `type` equal to `CARD`, the one informed in  [Step 3](doc:yuno-testing-gateway#3-create-a-one-time-token-ott), based on the [Payment type list](ref:payment-type-list). In addition, you need to add the card information on the object `detail.card`.

You can use the payment description or specific card data to get the desired result when you test payment with Yuno Test Payment Gateway. The following sections describe in detail each approach.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <div class="contentContainer">
        <p>
          Yuno system follows a sequential process, initially examining card data and subsequently evaluating the provided description. Consequently, if there is a disparity in the status indicated by the card data and the description for a testing payment, Yuno will prioritize and reflect the status associated with the card data.
        </p>          
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

##### 4.4.1 - Payment Description

To get the desired payment result using the payment description, you need to define the expected result as the description of the payment you create. For example, if you are testing a payment and expect a successful result, the payment description should be "SUCCEEDED". You will find all available options in the [Transaction Codes](https://docs.y.uno/reference/transaction#transaction-codes) section.

##### 4.4.2 - Card detail

Another option to get the expected payment results is to use one of the testing cards provided by Yuno. In the tables below, you find a list of cards and their data details to use when using the Yuno Testing Gateway. The **Transaction Response Code** column defines the returned payment status when you use the corresponding card.

<HTMLBlock>{`
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }


  .table-card {
    border-radius: 10px;
    border: 1px solid #614ad623;
    display: flex;
    transition: all .2s;
  }

  .table-card:hover {
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  }

  .table-card .control-icon {
    fill: rebeccapurple;
    transition: .3s ease;
    pointer-events: none;
  }

  .table-card .control-icon-close {
    display: none;
  }

  details[open] .control-icon-close {
    display: initial;
    transition: .3s ease;
  }

  details[open] .control-icon-expand {
    display: none;
  }

  details[open] summary {
    border: 1px solid #614ad623;
  }


  .table-card summary {
    padding: 0.8rem 1rem;
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }

  .table-card summary .table-call {
    display: block;
    padding: 0;
    margin: 0;
    font-size: 0.938rem;

  }


  .table-card summary .sumary-icon {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
  }

  .table-card .table-div {
    margin: 0.5rem 0;
    padding: 0 0.5rem;
  }

  .table-card .table-div table {
    margin: 0 !important;
    font-size: 0.85rem;
  }

  .table-card .table-div td {
    text-align: center;
  }
  
  
  .table-card .table-div table {
      display: block !important;
      overflow-x: auto !important;
    }
  
  summary table {
  width: 100%;
  table-layout: fixed;
}
  
  summary th, summary td {
  width: auto;
}
  
  @media only screen and (max-width: 700px) {
    .table-card .table-div table {
      display: block !important;
      overflow-x: auto !important;
    }
  }
  



  details[open] div {
    animation: sweep .3s ease-in-out;
  }

  @keyframes sweep {
    0% {
      opacity: 0;
      margin-left: -10px
    }

    100% {
      opacity: 1;
      margin-left: 0px
    }
  }
</style>

<body>
  <details open class="table-card">
    <summary>
      <span class="table-call">Visa</span>
      <div class="sumary-icon">
        <svg class="control-icon control-icon-expand" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
        </svg>
        <svg class="control-icon control-icon-close" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
        </svg>
      </div>
    </summary>
    <div class="table-div">
      <table>
        <thead>
          <tr>
            
            <th>Number</th>
            <th>Expiration Date</th>
            <th>Security Code</th>
            <th>Cardholder Name</th>
            <th>Transaction Response Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            
            <td>4507990000000002</td>
            <td>11/28</td>
            <td>123</td>
            <td>John Doe</td>
            <td>SUCCEEDED</td>
          </tr>
          <tr>
            
            <td>4507990000000010</td>
            <td>11/28</td>
            <td>123</td>
            <td>John Doe</td>
            <td>INSUFFICIENT_FUNDS</td>
          </tr>
          <tr>
            
            <td>4507990000000028</td>
            <td>11/28</td>
            <td>123</td>
            <td>John Doe</td>
            <td>DECLINED_BY_BANK</td>
          </tr>
          <tr>
            
            <td>4507990000000036</td>
            <td>11/28</td>
            <td>123</td>
            <td>John Doe</td>
            <td>DO_NOT_HONOR</td>
          </tr>
          <tr>
            
            <td>4507990000000044</td>
            <td>11/28</td>
            <td>123</td>
            <td>John Doe</td>
            <td>INVALID_SECURITY_CODE</td>
          </tr>
          <tr>
            
            <td>4507990000000051</td>
            <td>11/28</td>
            <td>123</td>
            <td>John Doe</td>
            <td>INVALID_CARD_DATA</td>
          </tr>
          <tr>
            
            <td>4507990000000069</td>
            <td>11/28</td>
            <td>123</td>
            <td>John Doe</td>
            <td>REPORTED_STOLEN</td>
          </tr>
          <tr>
            
            <td>4507990000000077</td>
            <td>11/28</td>
            <td>123</td>
            <td>John Doe</td>
            <td>ERROR</td>
          </tr>
        </tbody>
        </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<body>
  <details open class="table-card">
    <summary>
      <span class="table-call">Mastercard</span>
      <div class="sumary-icon">
        <svg class="control-icon control-icon-expand" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
        </svg>
        <svg class="control-icon control-icon-close" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
        </svg>
      </div>
    </summary>
    <div class="table-div">
      <table>
        	<thead>
          <tr>
            
            <th>Number</th>
            <th>Expiration Date</th>
            <th>Security Code</th>
            <th>Cardholder Name</th>
            <th>Transaction Response Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            
            <td>5252440000000002</td>
            <td>11/28</td>
            <td>123</td>
            <td>John Doe</td>
            <td>SUCCEEDED</td>
          </tr>
          <tr>
            
            <td>5252440000000010</td>
            <td>11/28</td>
            <td>123</td>
            <td>John Doe</td>
            <td>INSUFFICIENT_FUNDS</td>
          </tr>
          <tr>
            
            <td>5252440000000028</td>
            <td>11/28</td>
            <td>123</td>
            <td>John Doe</td>
            <td>DECLINED_BY_BANK</td>
          </tr>
          <tr>
            
            <td>5252440000000036</td>
            <td>11/28</td>
            <td>123</td>
            <td>John Doe</td>
            <td>DO_NOT_HONOR</td>
          </tr>
          <tr>
            
            <td>5252440000000044</td>
            <td>11/28</td>
            <td>123</td>
            <td>John Doe</td>
            <td>INVALID_SECURITY_CODE</td>
          </tr>
          <tr>
            
            <td>5252440000000051</td>
            <td>11/28</td>
            <td>123</td>
            <td>John Doe</td>
            <td>INVALID_CARD_DATA</td>
          </tr>
          <tr>
            
            <td>5252440000000069</td>
            <td>11/28</td>
            <td>123</td>
            <td>John Doe</td>
            <td>REPORTED_STOLEN</td>
          </tr>
          <tr>
            
            <td>5252440000000077</td>
            <td>11/28</td>
            <td>123</td>
            <td>John Doe</td>
            <td>ERROR</td>
          </tr>
        </tbody>
        </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<body>
  <details open class="table-card">
    <summary>
      <span class="table-call">American Express</span>
      <div class="sumary-icon">
        <svg class="control-icon control-icon-expand" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
        </svg>
        <svg class="control-icon control-icon-close" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
        </svg>
      </div>
    </summary>
    <div class="table-div">
      <table>
        <thead>
          <tr>
            
            <th>Number</th>
            <th>Expiration Date</th>
            <th>Security Code</th>
            <th>Cardholder Name</th>
            <th>Transaction Response Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            
            <td>370000000000002</td>
            <td>11/28</td>
            <td>1234</td>
            <td>John Doe</td>
            <td>SUCCEEDED</td>
          </tr>
          <tr>
            
            <td>370000000000010</td>
            <td>11/28</td>
            <td>1234</td>
            <td>John Doe</td>
            <td>INSUFFICIENT_FUNDS</td>
          </tr>
          <tr>
            
            <td>370000000000028</td>
            <td>11/28</td>
            <td>1234</td>
            <td>John Doe</td>
            <td>DECLINED_BY_BANK</td>
          </tr>
          <tr>
            
            <td>370000000000036</td>
            <td>11/28</td>
            <td>1234</td>
            <td>John Doe</td>
            <td>DO_NOT_HONOR</td>
          </tr>
          <tr>
            
            <td>370000000000044</td>
            <td>11/28</td>
            <td>1234</td>
            <td>John Doe</td>
            <td>INVALID_SECURITY_CODE</td>
          </tr>
          <tr>
            
            <td>370000000000051</td>
            <td>11/28</td>
            <td>1234</td>
            <td>John Doe</td>
            <td>INVALID_CARD_DATA</td>
          </tr>
          <tr>
            
            <td>370000000000069</td>
            <td>11/28</td>
            <td>1234</td>
            <td>John Doe</td>
            <td>REPORTED_STOLEN</td>
          </tr>
          <tr>
            
            <td>370000000000077</td>
            <td>11/28</td>
            <td>1234</td>
            <td>John Doe</td>
            <td>ERROR</td>
          </tr>
        </tbody>
        </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<body>
  <details open class="table-card">
    <summary>
      <span class="table-call">Diners</span>
      <div class="sumary-icon">
        <svg class="control-icon control-icon-expand" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
        </svg>
        <svg class="control-icon control-icon-close" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
        </svg>
      </div>
    </summary>
    <div class="table-div">
      <table>
<thead>
  <tr>
    <th>Number</th>
    <th>Expiration Date</th>
    <th>Security Code</th>
    <th>Cardholder Name</th>
    <th>Transaction Response Code</th>
  </tr>
</thead>
<tbody>
  <tr>

    <td>3647166000000002</td>
    <td>11/28</td>
    <td>123</td>
    <td>John Doe</td>
    <td>SUCCEEDED</td>
  </tr>
  <tr>

    <td>3647166000000010</td>
    <td>11/28</td>
    <td>123</td>
    <td>John Doe</td>
    <td>INSUFFICIENT_FUNDS</td>
  </tr>
  <tr>

    <td>3647166000000028</td>
    <td>11/28</td>
    <td>123</td>
    <td>John Doe</td>
    <td>DECLINED_BY_BANK</td>
  </tr>
  <tr>

    <td>3647166000000036</td>
    <td>11/28</td>
    <td>123</td>
    <td>John Doe</td>
    <td>DO_NOT_HONOR</td>
  </tr>
  <tr>

    <td>3647166000000044</td>
    <td>11/28</td>
    <td>123</td>
    <td>John Doe</td>
    <td>INVALID_SECURITY_CODE</td>
  </tr>
  <tr>

    <td>3647166000000051</td>
    <td>11/28</td>
    <td>123</td>
    <td>John Doe</td>
    <td>INVALID_CARD_DATA</td>
  </tr>
  <tr>

    <td>3647166000000069</td>
    <td>11/28</td>
    <td>123</td>
    <td>John Doe</td>
    <td>REPORTED_STOLEN</td>
  </tr>
  <tr>

    <td>3647166000000077</td>
    <td>11/28</td>
    <td>123</td>
    <td>John Doe</td>
    <td>ERROR</td>
  </tr>
</tbody>
</table>
    </div>
  </details>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<body>
  <details open class="table-card">
    <summary>
      <span class="table-call">UATP</span>
      <div class="sumary-icon">
        <svg class="control-icon control-icon-expand" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
        </svg>
        <svg class="control-icon control-icon-close" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
        </svg>
      </div>
    </summary>
    <div class="table-div">
      <table>
<thead>
  <tr>
    
    <th>Number</th>
    <th>Expiration Date</th>
    <th>Security Code</th>
    <th>Cardholder Name</th>
    <th>Transaction Response Code</th>
  </tr>
</thead>
<tbody>
  <tr>
    
    <td>1139000000000002</td>
    <td>11/28</td>
    <td>123</td>
    <td>John Doe</td>
    <td>SUCCEEDED</td>
  </tr>
  <tr>
    
    <td>1139000000000010</td>
    <td>11/28</td>
    <td>123</td>
    <td>John Doe</td>
    <td>INSUFFICIENT_FUNDS</td>
  </tr>
  <tr>
    
    <td>1139000000000028</td>
    <td>11/28</td>
    <td>123</td>
    <td>John Doe</td>
    <td>DECLINED_BY_BANK</td>
  </tr>
  <tr>
    
    <td>1139000000000036</td>
    <td>11/28</td>
    <td>123</td>
    <td>John Doe</td>
    <td>DO_NOT_HONOR</td>
  </tr>
  <tr>
    
    <td>1139000000000044</td>
    <td>11/28</td>
    <td>123</td>
    <td>John Doe</td>
    <td>INVALID_SECURITY_CODE</td>
  </tr>
  <tr>
    
    <td>1139000000000051</td>
    <td>11/28</td>
    <td>123</td>
    <td>John Doe</td>
    <td>INVALID_CARD_DATA</td>
  </tr>
  <tr>
    
    <td>1139000000000069</td>
    <td>11/28</td>
    <td>123</td>
    <td>John Doe</td>
    <td>REPORTED_STOLEN</td>
  </tr>
  <tr>
    
    <td>1139000000000077</td>
    <td>11/28</td>
    <td>123</td>
    <td>John Doe</td>
    <td>ERROR</td>
  </tr>
</tbody>
</table>
    </div>
  </details>
</body>
`}</HTMLBlock>

#### 5. Check the payment status

After performing the request to the [Create Payment](ref:create-payment), you can check the payment status by analyzing the `status` and `sub_status` from the response. Check the [Payment Status](ref:payment) page to see all the options you can receive in response to the payment creation request.

Depending on the processor and payment method, the status may take some time to update. Therefore, you may need to use endpoints to recover the payment status. To perform this task, you can use the [Retrieve Payment by ID](ref:retrieve-payment-by-id) or [Retrieve Payment by merchant\_order\_id](ref:retrieve-payment-by-merchant_order_id) endpoints. Another option is to use webhooks to receive notifications after each event. Yuno recommends you use webhooks to monitor asynchronous payments better. Check the [Webhooks](doc:configuring-yuno-webhooks) guide to learn how to configure the webhooks solution provided by Yuno.