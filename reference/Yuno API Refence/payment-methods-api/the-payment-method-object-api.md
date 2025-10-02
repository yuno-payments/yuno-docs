---
title: The Payment Method Object
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    The object representing a payment method that can be associated with a
    customer for back-to-back payments.
  robots: index
next:
  description: ''
---
## Attributes

This object represents a payment method that can be associated with a customer for back-to-back payments.

<HTMLBlock>{`
<div>
  <div class="yuno">
    <p><strong><code>id</code></strong> <small>string</small>
      <br />The unique identifier of the payment method (MAX 64; MIN 36).
      <br /><small> Example: 693ed90e-5aa9-11ed-9b6a-0242ac120002 </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>name</code></strong> <small>string</small>
      <br />The payment method name (MAX 255; MIN 3).
      <br /><small> Example: CARD </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>description</code></strong> <small>string</small>
      <br />The payment method description (MAX 255; MIN 3).
      <br /><small> Example: CARD </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>type</code></strong> <small>enum</small>
      <br />The payment method type (MAX 255; MIN 3).
      <br /><small> Possible enum values: Check the <a href="payment-type-list">
          Payment type list</a>. </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>category</code></strong> <small>enum</small>
      <br />The payment method category (MAX 255; MIN 3).
      <br /><small> Example: CARD </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>country</code></strong> <small>enum</small>
      <br />The customer's country (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
      <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>. </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>last_successfuly_used</code></strong> <small>bool</small>
      <br />Indicates if the enrolled payment method was the last successfully used by the customer</a>).
      <br /><small> Example: True </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>last_successfuly_used_at</code></strong> <small>timestamp</small>
      <br />Indicates the date of the last succeeded payment if the enrolled payment method was the last successfully
      used by the customer</a>).
      <br /><small> Example: "2023-01-24T12:50:43.938087Z" </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>workflow</code></strong> <small>enum</small>
      <br /> The payment workflow indicates whether the integration will use Yuno´s SDK or will be a back to back
      connection.
      <br /><small> Possible enum values: If <code>CHECKOUT</code> you will use Yuno SDK. If <code>DIRECT</code> you
        will back to back integration. </small>
    </p>
  </div>


  <details class="yuno">
    <summary><strong><code>card_data</code></strong> <small>object</small>
      <br />
      <p>Specifies the details of the card.</p>
    </summary>
    <div>
      <p><strong><code>iin</code></strong> <small>integer</small>
        <br />The issuer indentificarion number (IIN) refers to the first few digits of the payment card number issued
        by a financial insituition (MAX 8; MIN 6).
        <br /><small> Example: 45079900 </small>
      </p>
      <p><strong><code>lfd</code></strong> <small>integer</small>
        <br />The last four digits of the card (MAX 4; MIN 4).
        <br /><small> Example: 0010 </small>
      </p>
      <p><strong><code>expiration_month</code></strong> <small>integer</small>
        <br />The expiraton month of the card (MAX 2; MIN 2) - only available for PCI certified merchants.
        <br /><small> Example: 12 </small>
      </p>
      <p><strong><code>expiration_year</code></strong> <small>integer</small>
        <br />The expiraton year of the card (MAX 2; MIN 2) - only available for PCI certified merchants.
        <br /><small> Example: 12 </small>
      </p>
      <p><strong><code>number_length</code></strong> <small>integer</small>
        <br />The length of the card's number (MAX 19; MIN 8).
        <br /><small> Example: 41961111 </small>
      </p>
      <p><strong><code>security_code_length</code></strong> <small>integer</small>
        <br />The length of the card's security code (MAX 4; MIN 3).
        <br /><small> Example: 123 </small>
      </p>
      <p><strong><code>brand</code></strong> <small>string</small>
        <br />The card's brand information (MAX 255; MIN 3).
        <br /><small> Example: VISA </small>
      </p>
      <p><strong><code>issuer</code></strong> <small>string</small>
        <br />The card's issuer (MAX 255; MIN 3).
        <br /><small> Example: Banco Galicia </small>
      </p>
      <p><strong><code>category</code></strong> <small>string</small>
        <br />The category of the card's issuer (MAX 255; MIN 3).
        <br /><small> Example: Gold </small>
      </p>
      <p><strong><code>type</code></strong> <small>string</small>
        <br />The type of the card's issuer (MAX 255; MIN 3).
        <br /><small> Example: CREDIT, DEBIT, or PREPAID </small>
      </p>
    </div>
  </details>
  <div class="yuno">
    <p><strong><code>callback_url</code></strong> <small>string</small>
      <br />URL to return the customer after an enrollment in a provider´s environment. Only necessary for alternative
      payment methods integrations (MAX: 64; MIN: 36).
      <br /><small> Example: https://www.company.com/customer_1231324 </small>
    </p>
  </div>

  <details class="yuno">
    <summary><strong><code>verify</code></strong> <small>object</small>
      <br />
      <p>Indicates whether to verify the payment with a verify transaction or not. You’ll need to have a provider
        defined in your CARD route. </p>
    </summary>
    <div>
      <p><strong><code>vault_on_success</code></strong> <small>boolean</small>
        <br />Indicates whether to verify the payment with a verify transaction or not. False by default.
      </p>
      <p><strong><code>currency</code></strong> <small>enum</small>
        <br />Currency of the card verification.(MAX 3; MIN 3; <a href="country-reference">ISO 4217</a>).
        <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.</small>
      </p>
    </div>
  </details>

  <div class="yuno">
    <p><strong><code>status</code></strong> <small>enum</small>
      <br />The status of the payment method (MAX 255; MIN 5).
      <br /><small> Possible enum values: Check the <a href="enrollment-workflow#payment-method-status">Payment method
          status</a>. </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>vaulted_token</code></strong> <small>string</small>
      <br />The vaulted token for the previously enrolled payment method (MAX 64; MIN 36).
      <br /><small> Example: 321c12f6-42c2-45b7-bf0c-f2f767b31948 </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>created_at</code></strong> <small>timestamp</small>
      <br />Payment method creation date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO
        8601</a>).
      <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>updated_at</code></strong> <small>timestamp</small>
      <br />Last payment method update date and time (MAX 27; MIN 27; <a
        href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).
      <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
    </p>
  </div>

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
      --highlight: var(#eee);
      background: #eee;
      margin: 1.5em;
      border-radius: 5px;
      border-left: 15px solid var(--yuno-main-color);
      padding: 0.25em;
    }
  </style>
`}</HTMLBlock>
