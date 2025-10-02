---
title: The Payment Method Object
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    The object representing a payment method that can be associated with a
    customer.
  robots: index
next:
  description: ''
---
## Attributes

This object represents a payment method that can be associated with a customer.

<HTMLBlock>{`
<div>
  <div class="yuno">
    <p><strong><code>id</code></strong> <small>string</small>
      <br/>The unique identifier of the payment method (MAX 64; MIN 36).
      <br/><small> Example: 693ed90e-5aa9-11ed-9b6a-0242ac120002 </small>
    </p>	
  </div>
  
    <div class="yuno">
    <p><strong><code>account_id</code></strong> <small>string</small>
      <br/>The unique identifier of the account (MAX 64; MIN 36).
      <br/><small> Example: 8caa8bf4-5aa9-11ed-9b6a-0242ac120002 </small>
      </p>	
  </div>
  
        <div class="yuno">
    <p><strong><code>name</code></strong> <small>string</small>
      <br/>The payment method name (MAX 255; MIN 3).
      <br/><small> Example: Mercado Pago - Wallet </small>
          </p>	
  </div>
  
      <div class="yuno">
    <p><strong><code>description</code></strong> <small>string</small>
      <br/>The payment method description (MAX 255; MIN 3).
      <br/><small> Example: Mercado Pago - Wallet, the best! </small>
        </p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>type</code></strong> <small>enum</small>
      <br/>The payment method type (MAX 255; MIN 3).
      <br/><small> Possible enum values: Check the <a href="payment-type-list">
Payment type list</a>.  </small>
    </p>	
  </div>
  
    <div class="yuno">
    <p><strong><code>category</code></strong> <small>string</small>
      <br/>The payment method category (MAX 255; MIN 3).   
      <br/><small> Example: CARD </small>
      </p>	
  </div>
  
      <div class="yuno">
    <p><strong><code>country</code></strong> <small>enum</small>
      <br/>The customer's country (MAX 2; MIN 2;  <a href="https://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1</a>).
      <br/><small> Possible enum values: Check the  <a href="country-reference">Country reference</a>.  </small>
        </p>	
  </div>
  
    <details class="yuno">
    <summary><strong><code>verify</code></strong> <small>object</small>
      <br/><p>Indicates whether to verify the payment with a verify transaction or not. You’ll need to have a provider defined in your CARD route. </p>
    </summary>
    <div>
      <p><strong><code>vault_on_success</code></strong> <small>boolean</small>
        <br/>Indicates whether to verify the payment with a verify transaction or not. False by default.
      </p>
      <p><strong><code>currency</code></strong> <small>enum</small>
        <br/>Currency of the card verification.(MAX 3; MIN 3; <a href="https://en.wikipedia.org/wiki/ISO_4217">ISO 4217</a>).
        <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.</small>
      </p>
    </div>
  </details>
  
      <div class="yuno">
    <p><strong><code>status</code></strong> <small>enum</small>
      <br/>Status of the payment method (MAX 255; MIN 5).    
      <br/><small> Possible enum values: Check the <a href="enrollment-workflow#payment-method-status">Payment method status</a>.  </small>
        </p>	
  </div>
    
  <div class="yuno">
    <p><strong><code>created_at</code></strong> <small>timestamp</small>
      <br/>Payment method creation date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).
      <br/><small> Example: 2022-05-09T20:46:54.786342Z  </small>
    </p>	
  </div>
  
    <div class="yuno">
    <p><strong><code>updated_at</code></strong> <small>timestamp</small>
      <br/>Last payment method update date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).
      <br/><small> Example: 2022-05-09T20:46:54.786342Z  </small>
      </p>	
  </div>
  
  
   <details class="yuno">
    <summary><strong><code>enrollment</code></strong> <small>object</small>
      <br/><p>Specifies enrollment object.</p>
    </summary>
    <div>
      <p><strong><code>session</code></strong> <small>string</small>
        <br/>The customer session that has been created for the payment method (MAX 64; MIN 36).
 	      <br/><small> Example: 9104911d-5df9-429e-8488-ad41abea1a4b  </small></p>
      <p><strong><code>sdk_action_required</code></strong> <small>boolean</small>
        <br/>Required action to call the SDK.
        <br/><small> Possible values: <code>True</code> or <code>False</code> </small>  
      </p>

     </div>
  </details>
  
  <!-- <details class="yuno">
    <summary><strong><code>verify</code></strong> <small>object</small>
      <br/><p>Specifies verify object.</p>
    </summary>
    <div>
        <p><strong><code>vault_on_success</code></strong> <small>boolean</small>
            <br/>Indicates whether to verify the payment with a verify transaction or not. You’ll need to have a provider defined in your CARD route.
            <br/><small> Default: false  </small>
        </p>
        <details class="yuno">
            <summary><strong><code>payment</code></strong> <small>object</small>
            <br/><p>Only received when vault_on_success is set on true.</p>
            </summary>
            <div>
                <details class="yuno">
                    <summary><strong><code>payment</code></strong> <small>object</small>
                    <br/><p>Specifies payment object.</p>
                    </summary>
                    <div>
                    <p><strong><code>id</code></strong> <small>string</small>
                        <br/>The unique identifier of the payment (MAX 64 ; MIN 36)
                        <br/><small>Example: 5104911d-5df9-229e-8468-bd41abea1a4s</small>
                    </p>
                    <p><strong><code>account_id</code></strong> <small>string</small>
                        <br/>The unique identifier of the account (MAX 64 ; MIN 36).
                        <br/><small>Example: 2404911d-5df9-429e-8488-ad41abea1a4b</small>
                    </p>		
                    <p><strong><code>description</code></strong> <small>string</small>
                        <br/>The description of the payment (MAX 255; MIN 3)
                        <br/><small>Example: marketplace payment</small>
                    </p>         
                    <p><strong><code>country</code></strong> <small>enum</small>
                        <br/>Country where the transaction must be processed (ISO 3166-1 MAX 2; MIN 2).
                        <br/><small>Example: CO</small>
                    </p>
                    <p><strong><code>status</code></strong> <small>enum</small>
                        <br/>The status of the Payment (MAX 255; MIN 3).
                        <br/><small>Example: rejected</small>
                    </p>
                    <p><strong><code>sub_status</code></strong> <small>enum</small>
                        <br/>The sub_status of the Payment (MAX 255; MIN 3).
                        <br/><small>Example: PARTIALLY_PAID</small>
                    </p>
                    <p><strong><code>merchant_order_id</code></strong> <small>string</small>
                        <br/>Identification of the order (MAX 255; MIN 3).
                        <br/><small>Example: AAB01-432245</small>
                    </p>
                    <p><strong><code>created_at</code></strong> <small>timestamp</small>
                        <br/>Payment creation date (ISO 8601 MAX 27; MIN 27).
                        <br/><small>Example: 2022-05-09T20:46:54.786342Z</small>
                    </p>
                    <p><strong><code>updated_at</code></strong> <small>timestamp</small>
                        <br/>Last payment update date (ISO 8601 MAX 27; MIN 27).
                        <br/><small>Example: 2022-05-09T20:46:54.786342Z</small>
                    </p>
                    <details class="yuno">
                        <summary><strong><code>amount</code></strong> <small>object</small>
                        <br/><p>Specifies verify object.</p>
                        </summary>
                        <div>
                        <p><strong><code>value</code></strong> <small>number</small>
                            <br/>Amount of the payment.
                            <br/><small> Default: 1000  </small>
                        </p>
                        <p><strong><code>captured</code></strong> <small>number</small>
                            <br/>The summarized amount capture in the payment.
                            <br/><small>Example: 500</small>
                        </p>
                        <p><strong><code>refunded</code></strong> <small>number</small>
                            <br/>The summarized amount refunded  in the payment.
                            <br/><small>Example: 0</small>
                        </p>
                        <p><strong><code>currency</code></strong> <small>enum</small>
                            <br/>The currency used to make the payment (ISO 4217 MAX 3; MIN 3).
                            <br/><small>Example: COP</small>
                        </p>                
                        </div>
                    </details> 
                    </div>
                </details>
                <details class="yuno">
                    <summary><strong><code>transaction</code></strong> <small>object</small>
                    <br/><p>Specifies payment object.</p>
                    </summary>
                    <div>
                    <p><strong><code>id</code></strong> <small>string</small>
                        <br/>id of the transaction (MAX 64 ; MIN 36).
                        <br/><small>Example: 9104911d-5df9-429e-8488-ad41abea1a4b</small>
                    </p>
                    <p><strong><code>type</code></strong> <small>enum</small>
                        <br/>Type of transaction (MAX 255 ; MIN 3).
                        <br/><small>Example: CANCEL</small>
                    </p>
                    <p><strong><code>status</code></strong> <small>enum</small>
                        <br/>Status of the transaction (MAX 255 ; MIN 3).
                        <br/><small>Example: success</small>
                    </p>
                    <p><strong><code>response_code</code></strong> <small>string</small>
                        <br/>The payment provider response_code
                        <br/><small>Example: 200</small>
                    </p>                    
                    <details class="yuno">
                        <summary><strong><code>amount</code></strong> <small>object</small>
                        <br/><p>Specifies verify object.</p>
                        </summary>
                        <div>
                        <p><strong><code>value</code></strong> <small>number</small>
                            <br/>Amount of the payment.
                            <br/><small> Default: 1000  </small>
                        </p>
                        <p><strong><code>currency</code></strong> <small>enum</small>
                            <br/>The currency used to make the payment (ISO 4217 MAX 3; MIN 3).
                            <br/><small>Example: COP</small>
                        </p>                
                        </div>
                    </details> 
                    <details class="yuno">
                        <summary><strong><code>provider_data</code></strong> <small>object</small>
                        <br/><p>Specifies verify object.</p>
                        </summary>
                        <div>
                        <p><strong><code>id</code></strong> <small>enum</small>
                            <br/>Identification of the provider (MAX 255; MIN 3). Options: WOMPI, SPINPAY, ADDI, MERCADO_PAGO.
                            <br/><small> Example: WOMPI  </small>
                        </p>
                        <p><strong><code>currency</code></strong> <small>enum</small>
                            <br/>The currency used to make the payment (ISO 4217 MAX 3; MIN 3).
                            <br/><small>Example: COP</small>
                        </p>
                        <p><strong><code>transaction_id</code></strong> <small>string</small>
                            <br/>The unique identifier of the payment from the provider.
                            <br/><small>Example: 12345678</small>
                        </p>
                        <p><strong><code>account_id</code></strong> <small>string</small>
                            <br/>The merchant´s payment provider account id.
                            <br/><small>Example: 9990128</small>
                        </p>
                        <p><strong><code>status</code></strong> <small>string</small>
                            <br/>Provider´s status of the transaction (MAX 255; MIN 3).
                            <br/><small>Example: accredited</small>
                        </p>
                        <p><strong><code>status_detail</code></strong> <small>string</small>
                            <br/>Provider´s status of the transaction detail (MAX 255; MIN 3).
                            <br/><small>Example: approved</small>
                        </p>
                        <p><strong><code>raw_response</code></strong> <small>string</small>
                            <br/>The raw_response of the provider
                            <br/><small>Example: JSON</small>
                        </p>                                     
                        </div>
                    </details> 
                    </div>
                </details>
                <p><strong><code>created_at</code></strong> <small>timestamp</small>
                    <br/>Transactions creation date (ISO 8601 MAX 27; MIN 27).
                    <br/><small>Example: 2022-05-09T20:46:54.786342Z</small>
                </p>
                <p><strong><code>updated_at</code></strong> <small>timestamp</small>
                    <br/> Last transaction update date (ISO 8601 MAX 27; MIN 27).
                    <br/><small>Example: 2022-07-09T20:43:54.786342Z</small>
                </p>
            </div>
        </details>
     </div>
  </details> -->
  
   <details class="yuno">
    <summary><strong><code>provider</code></strong> <small>object</small>
      <br/><p>Specifies provider object.</p>
    </summary>
    <div>
      <p><strong><code>type</code></strong> <small>enum</small>
        <br/>The provider type.
 	      <br/><small> Example: BANK  </small>
      </p>
    	<p><strong><code>provider_status</code></strong> <small>string</small>
        <br/>The status of the provider (MAX 255; MIN 3).
 	      <br/><small> Example: OK  </small>
      </p>
    	<p><strong><code>enrollment_id</code></strong> <small>string</small>
        <br/>The unique identifier of the enrollment (MAX 64; MIN 36).
 	      <br/><small> Example: a079d524-c3df-4470-b3c8-7f290f5a0ba4  </small>
      </p>
         	<p><strong><code>token</code></strong> <small>string</small>
        <br/>The token returned from the provider (MAX 64; MIN 36).
 	      <br/><small> Example: a079d524-c3df-4470-b3c8-7f290f5a0ba4  </small>
      </p>
     </div>
  </details>
  
</div>

<style>
  :root {
    --yuno-main-color: #614AD6;
    --yellow: #CEE65A;
  }
  details {
    display: flex;
    overflow: hidden;
  }
    p {
      margin-left: 20px;
    }
    .yuno {
   	  --highlight: var(#eee) ;
    	background: #eee;
      margin: 1.5em;
      border-radius: 5px;
      border-left: 15px solid var(--yuno-main-color);
      padding: 0.25em;
    }
</style>
`}</HTMLBlock>