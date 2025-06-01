---
title: Lite checkout - Updating
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
## How it works

<hr>
With the Lite version of the Yuno SDK, you have full control of your own payment experience. This SDK version allows merchants to consult a service that will provide a list of the payment methods they have available for payment and enrollment. With this information, the merchants have control of which payment methods they want to show to the user in the checkout and enroll to their platform.

### Lite payment without enrollment implementation

[block:html]
{
  "html": "<style>\n  .lista {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  .lista .item-lista {\n    display: flex;\n  }\n\n  .lista .item-lista .numero div {\n    margin: 0 5px 0 0;\n    min-width: 20px;\n    text-align: center;\n    padding: 1px;\n    font-size: 0.8rem;\n    background-color: #614ad6;\n    border-radius: 100%;\n    color: #fff;\n  }\n\n  .lista .item-lista .texto p {\n    margin: 0;\n  }\n\n  .checkout-list {\n    margin: 0 !important;\n    padding-left: 1em !important;\n  }\n</style>\n\n<body>\n  <div class=\"lista\">\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>1</div>\n      </div>\n      <div class=\"texto\">\n        <p><b>Customer:</b></p>\n        <ul class=\"checkout-list\">\n          <li>If the user does not exists, create a customer by making an API request to the Customers endpoint <a\n              href=\"https://docs.y.uno/reference/create-customer\">Create Customer</a>.</li>\n          <li>If the customer already exists, use their existing customer ID.</li>\n        </ul>\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>2</div>\n      </div>\n      <div class=\"texto\">\n        <p><b>Checkout Session:</b> generate a <code>checkout_session</code> by making an API request to the Checkout\n          endpoint, <a href=\"https://docs.y.uno/reference/create-checkout-session\">Create Checkout Session</a> using the\n          customer ID from the previous step. The Checkout Session will be used to collect payment and other necessary\n          information from the customer.</p>\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>3</div>\n      </div>\n      <div class=\"texto\">\n        <p><b>Payment Methods:</b> Query the available payment methods you have enabled via the Yuno integration by\n          making a GET call to the <a href=\"https://docs.y.uno/reference/retrieve-payment-methods-for-checkout\">Retrieve\n            Payment Methods</a> endpoint using the <code>checkout_session</code> created in the previous step. </p>\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>4</div>\n      </div>\n      <div class=\"texto\">\n        <p>Display the available payment methods retrieved in the last step to the customer. Here the user will select\n          the payment method he wants to pay within your platform. By using the Checkout Lite, the merchant is\n          reponsible for displaying the payment methods and capturing the customer's selection.\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>5</div>\n      </div>\n      <div class=\"texto\">\n        <p><b>SDK:</b> Use the Yuno <a href=\"https://docs.y.uno/docs/web-sdk-integration#use-checkout-lite\">Checkout\n            Lite</a> SDK using the <code>checkout_session</code> and the selected payment method by the user. In this\n          process the customer will submit the necessary information for the selected payment method. </p>\n        </p>\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>6</div>\n      </div>\n      <div class=\"texto\">\n        <p>The YUNO SDK will return a <code>one_time_token</code> to your frontend when the customer successfully\n          submits their payment data. This token will be used to create the payment.\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>7</div>\n      </div>\n      <div class=\"texto\">\n        <p><b>Payment:</b> Create the payment by making an API request to the <a\n            href=\"https://docs.y.uno/reference/create-payment\">Create Payment</a> endpoint sending the\n          <code>one_time_token</code> obtained in the previous step.\n        </p>\n\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>8</div>\n      </div>\n      <div class=\"texto\">\n        <p><b>API Response:</b></p>\n        <ul class=\"checkout-list\">\n          <li>If the selected payment method is synchronous, the API response will contain the final status of the\n            payment. If it is a synchonous payment method, the <code>sdk_action_required</code> from the API response\n            will be <code>false</code>. In this case the payment process ends in this step. You can check the\n            payment status using a <a href=\"https://docs.y.uno/docs/configuring-yuno-webhooks\">webhook</a></li>\n          <li>If the payment method is asynchronous, an additional action will be required using the SDK. The API will\n            inform you via the <code>sdk_action_required</code> field of the response, which will have the value\n            <code>true</code>\n          </li>\n        </ul>\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>9</div>\n      </div>\n      <div class=\"texto\">\n        <p><b>Continue the Payment:</b> Invoke the <a\n            href=\"https://docs.y.uno/docs/web-sdk-integration#use-full-checkout\">Checkout Full\n          </a> SDK again using the <code>continuePayment</code> function to display additional screens to the customer.\n          In these new screens, the customer can carry out the necessary actions to complete the payment.\n        </p>\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>10</div>\n      </div>\n      <div class=\"texto\">\n        <p> Receive the payment result through a <a\n            href=\"https://docs.y.uno/docs/configuring-yuno-webhooks\">webhook</a>.\n        </p>\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>11</div>\n      </div>\n      <div class=\"texto\">\n        <p> <b>Optional:</b>. use the <a href=\"https://docs.y.uno/docs/web-sdk-integration#use-status-lite\">Status Lite\n            Function</a>, which is an SDK function, to display the payment result to the customer.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]



![](https://files.readme.io/a187445-Checkout_Lite_Flujo_Completo_v2_Prancheta_1_2.png)

### Lite enrollment implementation

Similarly to what we have in the Full Payment Implementation, if you want to enroll/save the customer's payment method for a frictionless purchase experience using our <code>payment_method_token</code>, you have to follow the next steps:

[block:html]
{
  "html": "<body>\n  <div class=\"lista\">\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>1</div>\n      </div>\n      <div class=\"texto\">\n        <p><b>Customer:</b></p>\n        <ul class=\"checkout-list\">\n          <li>If the user does not exists, create a customer by making an API request to the Customers endpoint <a\n              href=\"https://docs.y.uno/reference/create-customer\">Create Customer</a>.</li>\n          <li>If the customer already exists, use their existing customer ID.</li>\n        </ul>\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>2</div>\n      </div>\n      <div class=\"texto\">\n        <p>Generate a <code>customer_session</code> by making an API request to the C<a\n            href=\"https://docs.y.uno/reference/create-customer-session\">Create Customer Session</a>\n          endpoint using the customer ID from the previous step. </p>\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>3</div>\n      </div>\n      <div class=\"texto\">\n        <p>Retrieve the available payment methods for the customer by making a GET call to the <a\n            href=\"https://docs.y.uno/reference/retrieve-payment-methods-available-checkout\">Retrieve Payment Methods by\n            Customer Session</a> endpoint using the <code>customer_session</code> obtained in the previous step. </p>\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>4</div>\n      </div>\n      <div class=\"texto\">\n        <p>Display in your frontend the available payment methods. Here, the user will select the payment method he\n          wants to enroll with your platform.</p>\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>5</div>\n      </div>\n      <div class=\"texto\">\n        <p>Create an enrolled payment method for the customer by making an API request to the <a\n            href=\"https://docs.y.uno/reference/enroll-payment-method-checkout\">Enroll Payment Method</a> endpoint,\n          passing in the selected payment method and the <code>customer_session</code>. </p>\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>6</div>\n      </div>\n      <div class=\"texto\">\n        <p>Invoke the Yuno <a href=\"https://docs.y.uno/docs/web-sdk-integration#use-enrollment-lite\">Enrollment Lite</a>\n          SDK to guide the customer through the necessary steps to complete the payment enrollment process. </p>\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>7</div>\n      </div>\n      <div class=\"texto\">\n        <p>After the customer has completed the payment enrollment process, you can receive enrollment result wth the\n          <code>vaulted_token</code> via a <a href=\"https://docs.y.uno/docs/configuring-yuno-webhooks\">webhook</a>. This\n          token can be saved and used for future payments.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]



![](https://files.readme.io/74f3c9a-Enrollment_Flow_-_Lite_SDK_version.svg)

On the other hand, if you want to render all the available payment methods regardless of the user, you can just follow the steps in the Lite Payment Experience guideline. 

### Lite payment with enrollment implementation

Once the user has enrolled in one of the available payment methods, the payment can be done back to back using the `vaulted_token `obtained in the enrollment process without having to request the user any more information.

![](https://files.readme.io/f12474d-Payment_flow_with_Enrollment_-_Lite_SDK_Version.svg)

<div class="lista">
    <div class="item-lista">
      <div class="numero">
        <div>1</div>
      </div>
      <div class="texto">
        <p> Generate a <code>checkout_session</code> on your backend by creating a Checkout Session with <code>POST/checkouts/sessions</code>.</p>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>2</div>
      </div>
      <div class="texto">
        <p>Get the available payment methods you have enabled via the Yuno integration that your users can enroll with your platform. <code>GET/customer/sessions/{{customer_session}}/payment-methods</code>.</p>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>3</div>
      </div>
      <div class="texto">
        <p>Display in your checkout frontend the payment methods. Here the user will select the payment method he wants to pay within your platform.</p>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>4</div>
      </div>
      <div class="texto">
        <p>Create a payment using the <code>vaulted_token</code>  via Payments API <code>POST/payments</code>.</p>
      </div>
  </div>