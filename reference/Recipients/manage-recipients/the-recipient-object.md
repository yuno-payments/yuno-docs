---
title: The Recipient Object
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
This object represents a recipient who will receive part of a [split payment](doc:split-payments-marketplace). Represents a seller's account within your marketplace. The split allows you to disperse the money of a purchase in your marketplace directly to the seller's account and your commission in your marketplace account.

## Attributes

<HTMLBlock>{`
<div>
  <div class="yuno">
    <p><strong><code>id</code></strong> <small>string</small>
      <br/>The unique identifier of the recipient (MAX 64 ; MIN 36).
      <br/><small> Example: 9104911d-5df9-429e-8488-ad41abea1a4b. </small>
    </p>	
  </div>
  
  <div class="yuno">
  <p><strong><code>account_id</code></strong> <small>string</small>
    <br />The unique identifier of the account (MAX 64; MIN 36).
    <br/><small> Example: 4323f8a0-7699-4a5b-8293-f4d712312eb3bd. </small>
    </p>
	</div>
  
  <details class="yuno">
    <summary><strong><code>providers</code></strong> <small>array of objects</small>
      <br/><p>Specifies the provider object. Only necessary when using a third party split. If not, you´ll need to complete the rest of the recipient fields.</p>
    </summary>
    <div>
      <p><strong><code>recipient_id</code></strong> <small>string</small>
        <br/>The unique identifier of the provider's recipient.
        <br/><small> Example: 12445. </small>
      </p>
      <p><strong><code>id</code></strong> <small>string</small>
        <br/>The unique identifier of the provider.
        <br/><small> Example: PAGARME. </small>
      </p>
    </div>
  </details>
  
  <div class="yuno">
    <p><strong><code>merchant_recipient_id</code></strong> <small>string</small>
      <br/>The unique identifier of the recipient for the marketplace owner (MAX 255; MIN 3).
      <br/><small> Example: AAAA01. </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>national_entity</code></strong> <small>string</small>
      <br/>Beneficiary's national entity type. Could be INDIVIDUAL or ENTITY (MAX 64 ; MIN 36).
      <br/><small> Example: INDIVIDUAL. </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>first_name</code></strong> <small>string</small>
      <br/>The recipient's first name (MAX 255; MIN 3).
      <br/><small> Example: John. </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>last_name</code></strong> <small>string</small>
      <br/>The recipient's last name (MAX 255; MIN 3).
      <br/><small> Example: Doe. </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>legal_name</code></strong> <small>string</small>
      <br/>Beneficiary's name. (Max: 80) Only necessary when national entity is ENTITY (MAX 64 ; MIN 36).
      <br/><small> Example: Arcos dorados S.A. </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>email</code></strong> <small>string</small>
      <br/>The recipient's e-mail (MAX 255; MIN 3).
      <br/><small> Example: john.doe@email.com. </small>
    </p>	
  </div>
  
    <div class="yuno">
    <p><strong><code>country</code></strong> <small>enum</small>
      <br/>The recipient's country (MAX 2; MIN 2; <a href="https://docs.y.uno/reference/the-customer-object">ISO 3166-1</a>).
      <br/><small> Possible enum values: Check the <a href="https://docs.y.uno/reference/country-reference">Country Code List</a>.  </small>
      </p>	
  </div>
  
  <details class="yuno">
    <summary><strong><code>document</code></strong> <small>object</small>
      <br/><p>Specifies the recipient's document object, including its number and type.</p>
    </summary>
    <div>
      <p><strong><code>document_number</code></strong> <small>string</small>
        <br/>The recipient's document number (MAX 40; MIN 3).
        <br/><small> Example: 1093333333.  </small>  </p>
      </p>
      <p><strong><code>document_type</code></strong> <small>enum</small>
        <br/>The recipient's document type (MAX 6, MIN 2).
        <br/><small> Possible enum values: Check the <a href="https://docs.y.uno/reference/customer-object#document-type-list">Document Type List</a>.  </small>
    </p>
    </div>
  </details>
  
  <details class="yuno">
    <summary><strong><code>phone</code></strong> <small>object</small>
      <br/><p>Specifies the recipient's phone number object.</p>
    </summary>
    <div>
      <p><strong><code>country_code</code></strong> <small>string</small>
        <br/>The country code of the recipient's phone (MAX 3; MIN 2).
        <br/><small> Example: 57.  </small>  
      </p>
      <p><strong><code>number</code></strong> <small>string</small>
        <br/>The recipient's phone number, without the country code (MAX 32; MIN 1).
        <br/><small> Example: 3132450765.  </small>  
      </p>
    </div>
  </details>
  
  <details class="yuno">
    <summary><strong><code>address</code></strong> <small>object</small>
      <br/><p>Specifies the recipient's billing address object.</p>
    </summary>
    <div>
      <p><strong><code>address_line_1</code></strong> <small>string</small>
        <br/>The primary billing address line of the recipient (MAX 255; MIN 3).
        <br/><small> Example: Calle 34 # 56 - 78.  </small>  
      </p>
      <p><strong><code>address_line_2</code></strong> <small>string</small>
        <br/>The secondary billing address line of the recipient (MAX 255; MIN 3).
        <br/><small> Example: Apartamento 502, Torre I. </small>  
      </p>
      <p><strong><code>city</code></strong> <small>string</small>
        <br/>The city considered for the billing address (MAX 255; MIN 3).
        <br/><small> Example: Bogotá.  </small>  
      </p>
      <p><strong><code>country</code></strong> <small>enum</small>
        <br/>The country considered for the billing address (MAX 2; MIN 2; <a href="https://docs.y.uno/reference/the-customer-object">ISO 3166-1</a>).
        <br/><small> Possible enum values: Check the <a href="https://docs.y.uno/reference/country-reference">Country Code List</a>.</small>
      </p>
      <p><strong><code>state</code></strong> <small>string</small>
        <br/>The state considered for the billing address (MAX 255; MIN 3).
        <br/><small> Example: Cundinamarca.  </small>  
      </p>  
      <p><strong><code>zip_code</code></strong> <small>string</small>
        <br/>The zipcode considered for the billing address (MAX 11; MIN 4).
        <br/><small> Example: 111111.  </small>  
      </p>  
    </div>
  </details>
  
  
  <div class="yuno">
    <p><strong><code>created_at</code></strong> <small>timestamp</small>
      <br/>Recipient creation date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).
      <br/><small> Example: 2022-05-09T20:46:54.786342Z.  </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>updated_at</code></strong> <small>timestamp</small>
      <br/>Last recipient update date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).
      <br/><small> Example: 2022-05-09T20:46:54.786342Z.  </small>
</p>	
  </div>
  
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