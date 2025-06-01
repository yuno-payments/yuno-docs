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

<HTMLBlock>{`
<style>
  .lista {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .lista .item-lista {
    display: flex;
  }

  .lista .item-lista .numero div {
    margin: 0 5px 0 0;
    min-width: 20px;
    text-align: center;
    padding: 1px;
    font-size: 0.8rem;
    background-color: #614ad6;
    border-radius: 100%;
    color: #fff;
  }

  .lista .item-lista .texto p {
    margin: 0;
  }

  .checkout-list {
    margin: 0 !important;
    padding-left: 1em !important;
  }
</style>

<body>
  <div class="lista">
    <div class="item-lista">
      <div class="numero">
        <div>1</div>
      </div>
      <div class="texto">
        <p><b>Customer:</b></p>
        <ul class="checkout-list">
          <li>If the user does not exists, create a customer by making an API request to the Customers endpoint <a
              href="https://docs.y.uno/reference/create-customer">Create Customer</a>.</li>
          <li>If the customer already exists, use their existing customer ID.</li>
        </ul>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>2</div>
      </div>
      <div class="texto">
        <p><b>Checkout Session:</b> generate a <code>checkout_session</code> by making an API request to the Checkout
          endpoint, <a href="https://docs.y.uno/reference/create-checkout-session">Create Checkout Session</a> using the
          customer ID from the previous step. The Checkout Session will be used to collect payment and other necessary
          information from the customer.</p>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>3</div>
      </div>
      <div class="texto">
        <p><b>Payment Methods:</b> Query the available payment methods you have enabled via the Yuno integration by
          making a GET call to the <a href="https://docs.y.uno/reference/retrieve-payment-methods-for-checkout">Retrieve
            Payment Methods</a> endpoint using the <code>checkout_session</code> created in the previous step. </p>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>4</div>
      </div>
      <div class="texto">
        <p>Display the available payment methods retrieved in the last step to the customer. Here the user will select
          the payment method he wants to pay within your platform. By using the Checkout Lite, the merchant is
          reponsible for displaying the payment methods and capturing the customer's selection.
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>5</div>
      </div>
      <div class="texto">
        <p><b>SDK:</b> Use the Yuno <a href="https://docs.y.uno/docs/web-sdk-integration#use-checkout-lite">Checkout
            Lite</a> SDK using the <code>checkout_session</code> and the selected payment method by the user. In this
          process the customer will submit the necessary information for the selected payment method. </p>
        </p>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>6</div>
      </div>
      <div class="texto">
        <p>The YUNO SDK will return a <code>one_time_token</code> to your frontend when the customer successfully
          submits their payment data. This token will be used to create the payment.
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>7</div>
      </div>
      <div class="texto">
        <p><b>Payment:</b> Create the payment by making an API request to the <a
            href="https://docs.y.uno/reference/create-payment">Create Payment</a> endpoint sending the
          <code>one_time_token</code> obtained in the previous step.
        </p>

      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>8</div>
      </div>
      <div class="texto">
        <p><b>API Response:</b></p>
        <ul class="checkout-list">
          <li>If the selected payment method is synchronous, the API response will contain the final status of the
            payment. If it is a synchonous payment method, the <code>sdk_action_required</code> from the API response
            will be <code>false</code>. In this case the payment process ends in this step. You can check the
            payment status using a <a href="https://docs.y.uno/docs/configuring-yuno-webhooks">webhook</a></li>
          <li>If the payment method is asynchronous, an additional action will be required using the SDK. The API will
            inform you via the <code>sdk_action_required</code> field of the response, which will have the value
            <code>true</code>
          </li>
        </ul>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>9</div>
      </div>
      <div class="texto">
        <p><b>Continue the Payment:</b> Invoke the <a
            href="https://docs.y.uno/docs/web-sdk-integration#use-full-checkout">Checkout Full
          </a> SDK again using the <code>continuePayment</code> function to display additional screens to the customer.
          In these new screens, the customer can carry out the necessary actions to complete the payment.
        </p>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>10</div>
      </div>
      <div class="texto">
        <p> Receive the payment result through a <a
            href="https://docs.y.uno/docs/configuring-yuno-webhooks">webhook</a>.
        </p>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>11</div>
      </div>
      <div class="texto">
        <p> <b>Optional:</b>. use the <a href="https://docs.y.uno/docs/web-sdk-integration#use-status-lite">Status Lite
            Function</a>, which is an SDK function, to display the payment result to the customer.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

![](https://files.readme.io/a187445-Checkout_Lite_Flujo_Completo_v2_Prancheta_1_2.png)

### Lite enrollment implementation

Similarly to what we have in the Full Payment Implementation, if you want to enroll/save the customer's payment method for a frictionless purchase experience using our <code>payment\_method\_token</code>, you have to follow the next steps:

<HTMLBlock>{`
<body>
  <div class="lista">
    <div class="item-lista">
      <div class="numero">
        <div>1</div>
      </div>
      <div class="texto">
        <p><b>Customer:</b></p>
        <ul class="checkout-list">
          <li>If the user does not exists, create a customer by making an API request to the Customers endpoint <a
              href="https://docs.y.uno/reference/create-customer">Create Customer</a>.</li>
          <li>If the customer already exists, use their existing customer ID.</li>
        </ul>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>2</div>
      </div>
      <div class="texto">
        <p>Generate a <code>customer_session</code> by making an API request to the C<a
            href="https://docs.y.uno/reference/create-customer-session">Create Customer Session</a>
          endpoint using the customer ID from the previous step. </p>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>3</div>
      </div>
      <div class="texto">
        <p>Retrieve the available payment methods for the customer by making a GET call to the <a
            href="https://docs.y.uno/reference/retrieve-payment-methods-available-checkout">Retrieve Payment Methods by
            Customer Session</a> endpoint using the <code>customer_session</code> obtained in the previous step. </p>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>4</div>
      </div>
      <div class="texto">
        <p>Display in your frontend the available payment methods. Here, the user will select the payment method he
          wants to enroll with your platform.</p>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>5</div>
      </div>
      <div class="texto">
        <p>Create an enrolled payment method for the customer by making an API request to the <a
            href="https://docs.y.uno/reference/enroll-payment-method-checkout">Enroll Payment Method</a> endpoint,
          passing in the selected payment method and the <code>customer_session</code>. </p>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>6</div>
      </div>
      <div class="texto">
        <p>Invoke the Yuno <a href="https://docs.y.uno/docs/web-sdk-integration#use-enrollment-lite">Enrollment Lite</a>
          SDK to guide the customer through the necessary steps to complete the payment enrollment process. </p>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>7</div>
      </div>
      <div class="texto">
        <p>After the customer has completed the payment enrollment process, you can receive enrollment result wth the
          <code>vaulted_token</code> via a <a href="https://docs.y.uno/docs/configuring-yuno-webhooks">webhook</a>. This
          token can be saved and used for future payments.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

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
