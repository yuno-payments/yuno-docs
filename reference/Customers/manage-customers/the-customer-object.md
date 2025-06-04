---
title: The Customer Object
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    The object that represents a customer who will make payments using your
    service.
  robots: index
next:
  description: ''
---
This object represents a customer who will make payments using your service.

## Attributes

<HTMLBlock>{`
<div>
  <div class="yuno">
    <p><strong><code>id</code></strong> <small>string</small>
      <br />The unique identifier of the customer (MAX 64; MIN 36).
      <br /><small> Example: faa89e18-5a11-11ed-9b6a-0242ac120002 </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>merchant_customer_id</code></strong> <small>string</small>
      <br />The unique identifier of the customer in the external merchant (MAX 255; MIN 1).
      <br /><small> Example: 50ca6f06-5a12-11ed-9b6a-0242ac120002 </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>merchant_customer_created_at</code></strong> <small>timestamp</small>
      <br />Customer´s registration date on the merchants platform (MAX 27; MIN 27 <a href="country-reference">ISO 3166-1</a>).
      <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>first_name</code></strong> <small>string</small>
      <br />The customer's first name (MAX 255; MIN 1).
      <br /><small> Example: John </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>last_name</code></strong> <small>string</small>
      <br />The customer's last name (MAX 255; MIN 1).
      <br /><small> Example: Doe </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>gender</code></strong> <small>enum</small>
      <br />The customer's gender (MAX 2; MIN 1).
      <br /><small> Possible enum values: <code>M</code>, <code>F</code> or <code>NB</code> </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>date_of_birth</code></strong> <small>string</small>
      <br />The customer's date of birth in the YYYY-MM-DD format (MAX 10; MIN 10).
      <br /><small> Example: 1990-02-28 </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>email</code></strong> <small>string</small>
      <br />The customer's e-mail (MAX 255; MIN 3).
      <br /><small> Example: john.doe@email.com </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>nationality</code></strong> <small>enum</small>
      <br />The customer's nationality (MAX 2; MIN 2; <a href="https://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1</a>).
      <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>. </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>country</code></strong> <small>enum</small>
      <br />The customer's country (MAX 2; MIN 2; <a href="https://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1</a>).
      <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>. </small>
    </p>
  </div>

  <details class="yuno">
    <summary><strong><code>document</code></strong> <small>object</small>
      <br />
      <p>Specifies the customer's document object, including its number and type.</p>
    </summary>
    <div>
      <p><strong><code>document_number</code></strong> <small>string</small>
        <br />The customer's document number (MAX 40; MIN 3).
        <br /><small> Example: 1093333333 </small>
      </p>
      <p><strong><code>document_type</code></strong> <small>enum</small>
        <br />The customer's document type (MAX 6; MIN 2).
        <br /><small> Possible enum values: Check the <a href="country-reference"> Country reference</a>. </small>
      </p>
    </div>
  </details>

  <details class="yuno">
    <summary><strong><code>phone</code></strong> <small>object</small>
      <br />
      <p>Specifies the customer's phone number object.</p>
    </summary>
    <div>
      <p><strong><code>country_code</code></strong> <small>string</small>
        <br />The country calling code of the customer's phone (MAX 3; MIN 1). Possible values: Check the <a
          href="country-reference"> Country reference</a>.
        <br /><small> Example: 57 </small>
      </p>
      <p><strong><code>number</code></strong> <small>string</small>
        <br />The customer's phone number, without the country code (MAX 32; MIN 1).
        <br /><small> Example: 3132450765 </small>
      </p>
    </div>
  </details>

  <details class="yuno">
    <summary><strong><code>billing_address</code></strong> <small>object</small>
      <br />
      <p>Specifies the customer's billing address object.</p>
    </summary>
    <div>
      <p><strong><code>address_line_1</code></strong> <small>string</small>
        <br />The primary billing address line of the customer (MAX 255; MIN 3).
        <br /><small> Example: Calle 34 # 56 - 78 </small>
      </p>
      <p><strong><code>address_line_2</code></strong> <small>string</small>
        <br />The secondary billing address line of the customer (MAX 255; MIN 3).
        <br /><small> Example: Apartamento 502, Torre I </small>
      </p>
      <p><strong><code>city</code></strong> <small>string</small>
        <br />The city considered for the billing address (MAX 255; MIN 3).
        <br /><small> Example: Bogotá </small>
      </p>
      <p><strong><code>country</code></strong> <small>enum</small>
        <br />The country considered for the billing address (MAX 2; MIN 2; <a href="https://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1</a>).
        <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.</small>
      </p>
      <p><strong><code>state</code></strong> <small>string</small>
        <br />The state considered for the billing address (MAX 255; MIN 3; <a href="https://en.wikipedia.org/wiki/ISO_3166-2">ISO 3166-2</a>).
        <br /><small> Example: Cundinamarca </small>
      </p>
      <p><strong><code>zip_code</code></strong> <small>string</small>
        <br />The zipcode considered for the billing address (MAX 11; MIN 4).
        <br /><small> Example: 111111 </small>
      </p>
      <p><strong><code>neighborhood</code></strong> <small>string</small>
        <br />The neighborhood of the address line of the customer(MAX 255; MIN 2)
        <br /><small> Example: Barrio 11 </small>
      </p>
    </div>
  </details>

  <details class="yuno">
    <summary><strong><code>shipping_address</code></strong> <small>object</small>
      <br />
      <p>Specifies the customer's shipping address object.</p>
    </summary>
    <div>
      <p><strong><code>address_line_1</code></strong> <small>string</small>
        <br />The primary shipping address line of the customer (MAX 255; MIN 3).
        <br /><small> Example: Calle 34 # 56 - 78 </small>
      </p>
      <p><strong><code>address_line_2</code></strong> <small>string</small>
        <br />The secondary shipping address line of the customer (MAX 255; MIN 3).
        <br /><small> Example: Apartamento 502, Torre I </small>
      </p>
      <p><strong><code>city</code></strong> <small>string</small>
        <br />The city considered for the shipping address (MAX 255; MIN 3).
        <br /><small> Example: Bogotá </small>
      </p>
      <p><strong><code>country</code></strong> <small>enum</small>
        <br />The country considered for the shipping address (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
        <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.</small>
      </p>
      <p><strong><code>state</code></strong> <small>string</small>
        <br />The state considered for the shipping address (MAX 255; MIN 3; <a href="https://en.wikipedia.org/wiki/ISO_3166-2">ISO 3166-2</a>).
        <br /><small> Example: Cundinamarca </small>
      </p>
      <p><strong><code>zip_code</code></strong> <small>string</small>
        <br />The zipcode considered for the shipping address (MAX 10; MIN 5).
        <br /><small> Example: 111111 </small>
      </p>
      <p><strong><code>neighborhood</code></strong> <small>string</small>
        <br />The neighborhood of the address line of the customer(MAX 255; MIN 2)
        <br /><small> Example: Barrio 11 </small>
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

  <div class="yuno">
    <p><strong><code>created_at</code></strong> <small>timestamp</small>
      <br />Customer creation date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).
      <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>updated_at</code></strong> <small>timestamp</small>
      <br />Last customer update date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).
      <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
    </p>
  </div>
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
    --highlight: var(--yuno-card-background);
    background: var(--yuno-card-background);
    margin: 1.5em;
    border-radius: 5px;
    border-left: 15px solid var(--yuno-purple);
    padding: 0.25em;
  }
</style>
`}</HTMLBlock>