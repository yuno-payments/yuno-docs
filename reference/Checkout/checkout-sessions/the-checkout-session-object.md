---
title: The Checkout Session Object
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    The object representing a checkout session that can be created to make a
    payment. You can Create a Checkout Session using the id generated when the
    Customer resource was created.
  robots: index
next:
  description: ''
---
This object represents a checkout session that can be created to make a payment. You can Create a Checkout Session using the id generated when the Customer resource was created.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Notes</h3>
      <div class="contentContainer">
        <ul>
          <li>Create a checkout session is only required for flow <b>SDK_CHECKOUT</b></li>
          <li>Only one payment is supported per each checkout session</li>
          <li>The checkout session expires 5 hours after its creation</li>
        </ul>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Attributes

<HTMLBlock>{`
<div>
  <div class="yuno">
    <p><strong><code>checkout_session</code></strong> <small>string</small>
      <br/>The unique identifier of the checkout session (MAX 64 ; MIN 36).
      <br/><small> Example: 9104911d-5df9-429e-8488-ad41abea1a4b </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>customer_id</code></strong> <small>string</small>
      <br/>The unique identifier of the customer (MAX 64 ; MIN 36).
      <br/><small> Example: 9104911d-5df9-429e-8488-ad41abea1a4b </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>merchant_order_id</code></strong> <small>string</small>
      <br/>The unique identifier of the customer's order (MAX 255; MIN 3).
      <br/><small> Example: 1234 </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>payment_description</code></strong> <small>string</small>
      <br/>The description of the payment (MAX 255; MIN 3).
      <br/><small> Example: Purchase in Pepito market </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>callback_url</code></strong> <small>string</small>
      <br/>The URL where to redirect the customer after the payment (MAX 526; MIN 3).
      <br/><small> Example: https://www.company.com/customer_1231324 </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>country</code></strong> <small>enum</small>
      <br/>Country where the transaction must be processed (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
      <br/><small> Possible enum values: Check the <a href="country-reference">Country reference</a>. </small>
    </p>	
  </div>
  
   <div class="yuno">
    <p><strong><code>created_at</code></strong> <small>timestamp</small>
      <br/>Checkout Session creation date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).
      <br/><small> Example: 2022-05-09T20:46:54.786342Z </small>
     </p>	
  </div>
  
  <details class="yuno">
    <summary><strong><code>amount</code></strong> <small>object</small>
      <br/><p>Specifies the payment amount object, with the value and currency.</p>
    </summary>
    <div>
      <p><strong><code>currency</code></strong> <small>enum</small>
        <br/>The currency used to make the payment (MAX 3; MIN 3; <a href="country-reference">ISO 4217</a>).
        <br/><small> Possible enum values: Check the <a href="country-reference">Country reference</a>. </small>
      </p>
      <p><strong><code>value</code></strong> <small>float</small>
        <br/>The payment amount (multiple of 0.0001).
        <br/><small> Example: 23.5676 </small>
      </p>
    </div>
  </details>
  
  <details class="yuno">
    <summary><strong><code>metadata</code></strong> <small>array of objects</small>
      <br />
      <p>Specifies a list of metadata objects. You can add up to 50 metadata objects.</p>
    </summary>
    <div>
      <details class="yuno">
        <summary><strong><code>metadata object</code></strong> <small>object</small>
          <br />
          <p>Specifies a metadata key and the respective value.</p>
        </summary>
        <div>
          <p><strong><code>key</code></strong> <small>string</small>
            <br />Specifies one metadata key.
            <br /><small> Example: age </small>
          </p>
          <p><strong><code>value</code></strong> <small>string</small>
            <br />Specifies the value for the defined metadata key.
            <br /><small> Example: 28 </small>
          </p>
        </div>
      </details>
    </div>
  </details>
  
  <details class="yuno">
    <summary><strong><code>installments</code></strong> <small>array of objects</small>
      <br />
      <p>[Optional] The object to send the installment plan created in Yuno to show your customers and let them choose from. This optional field is used in case a particular installments plan needs to be used in the session. if not sent, we will display the installment plan created for the account for each scenario, if any.</p>
    </summary>
    <div>
      <p><strong><code>plan_id</code></strong> <small>string</small>
        <br/>Specifies a plan id created in Yuno to show your customer in the checkout session. If not defined, we will use the ones created for the account, if applicable. (MAX 64 ; MIN 64).
        <br/><small> Possible enum values: Check the <a href="country-reference">Country reference</a>. </small>
      </p>
    </div>
    
    <details class="yuno">
      <summary><strong><code>plan</code></strong> <small>array of objects</small>
        <br />
        <p>Installments to show the customer in with the checkout_session. This optional struct is used in case a particular installments plan needs to be used in the session and does not have an installments plan created for it. if not sent, we will display the installment plan created for the account for each scenario, if any. </p>
      </summary>
      <div>
        <details class="yuno">
          <summary><strong><code>installment object</code></strong> <small>object</small>
            <br />
            <p>Specifies an installment available for the checkout session.</p>
          </summary>
          <div>
            <p><strong><code>installment</code></strong> <small>int</small>
              <br />The number of monthly installments shoppers can choose 
              <br /><small> Example: 3 </small>
            </p>
            <p><strong><code>rate</code></strong> <small>float</small>
              <br />The rate that will be applied to the final amount of the transaction by the payment provider after using installments.   
              <br /><small> Example: 1.5 </small>
            </p>
          </div>
        </details>
      </div>
    </details>
    
    
    
    
    
  </details>
  
</div>

<style>
  details {
    display: flex;
    overflow: hidden;
  }
    p {
      margin-left: 20px;
    }
    .yuno {
   	  --highlight: var(--yuno-card-background) ;
    	background: var(--yuno-card-background);
      margin: 1.5em;
      border-radius: 5px;
      border-left: 15px solid var(--yuno-purple);
      padding: 0.25em;
    }
</style>
`}</HTMLBlock>
