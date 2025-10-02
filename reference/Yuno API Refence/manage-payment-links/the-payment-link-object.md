---
title: The Payment Link Object
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    The object representing a payment link that can be associated with a
    customer.
  robots: index
next:
  description: ''
---
## Attributes

This object represents a payment link that can be associated with a customer.

<HTMLBlock>{`
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

  .yuno ul {
    margin-top: -1rem;
  }

  .payment-type {
    display: grid;
    grid-template-columns: 1fr 1fr;

  }
</style>



<body>

  <div class="yuno">
    <p><strong><code>id</code></strong> <small>string</small>
      <br />The unique identifier of the customer (MAX 64 ; MIN 36).
      <br /><small> Example: 8546df3a-b83e-4bb5-a4b3-57aa6385924f </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>account_id</code></strong> <small>string</small>
      <br />The unique identifier of the account (MAX 64; MIN 36).
      <br /><small> Example: 9104911d-5df9-429e-8488-ad41abea1a4b </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>description</code></strong> <small>string</small>
      <br />The description of the payment link (MAX 255; MIN 3).
      <br /><small> Example: Marketplace payment </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>country</code></strong> <small>enum</small>
      <br />Country where the transaction must be processed (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
      <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.</small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>status</code></strong> <small>enum</small>
      <br />The status of the Payment link (MAX 255; MIN 3) (CREATED, USED, CANCELED, EXPIRED, ERROR).
      <br /><small> Example: ACTIVE </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>merchant_order_id</code></strong> <small>string</small>
      <br />Identification of the payment link (MAX 255; MIN 3).
      <br /><small> Example: 432245 </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>created_at</code></strong> <small>timestamp</small>
      <br /> The date and time when the payment link was created.
      <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>updated_at</code></strong> <small>timestamp</small>
      <br /> The date and time of last update for the payment link.
      <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>capture</code></strong> <small>boolean</small>
      <br /> Decides whether to authorize the payment or capture it. Authorizing a card payment allows you to reserve
      funds in a customer's bank account. If the field is not sent, we will take it as true. You can later capture the
      payment vía Yuno's dashboard or <a href="capture-authorization">API method</a>.
      <br /><small> Example: true </small>
    </p>
  </div>

  <details class="yuno">
    <summary>
      <strong><code>amount</code></strong> <small>object</small>
      <br />
      <p>Specifies the payment amount object, with the value and currency.</p>
    </summary>
    <div>
      <p><strong><code>currency</code></strong> <small>enum</small>
        <br />The currency used to make the payment (MAX 3; MIN 3; <a href="country-reference">ISO 4217</a>).
        <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.</small>
      </p>
      <p><strong><code>value</code></strong> <small>number</small>
        <br />The payment amount (multiple of 0.0001).
        <br /><small> Example: 12100.00 </small>
      </p>
    </div>
  </details>

  <details class="yuno">
    <summary>
      <strong><code>customer_payer</code></strong> <small>object</small>
      <br />
      <p>Specifies customer object for payments links.</p>
    </summary>
    <div>
      <p><strong><code>id</code></strong> <small>string</small>
        <br />The unique identifier of the customer at
        Yuno platform (MAX 255; MIN 3).
        <br /><small> Example: faa89e18-5a11-11ed-9b6a-0242ac120002 </small>
      </p>

      <p><strong><code>customer_id</code></strong> <small>string</small>
        <br />The unique identifier of the customer in the external merchant (MAX 255; MIN 3).
        <br /><small> Example: 23456 </small>
      </p>

      <p><strong><code>first_name</code></strong> <small>string</small>
        <br />The customer's first name (MAX 255; MIN 3).
        <br /><small> Example: John </small>
      </p>

      <p><strong><code>last_name</code></strong> <small>string</small>
        <br />The customer's last name (MAX 255; MIN 3).
        <br /><small> Example: Doe </small>
      </p>

      <p><strong><code>gender</code></strong> <small>enum</small>
        <br />The customer's gender (MAX 2; MIN 1; (M=Male/F=Female/NA=Not applicable/NK=Not Known)).
        <br /><small> Possible enum values: <code>M</code>, <code>F</code>, <code>NA</code>, or <code>NK</code>.
        </small>
      </p>

      <p><strong><code>date_of_birth</code></strong> <small>string</small>
        <br />The customer's date of birth in the YYYY-MM-DD format (Length: 10).
        <br /><small> Example: 1990-02-28 </small>
      </p>

      <p><strong><code>email</code></strong> <small>string</small>
        <br />The customer's e-mail (MAX 255; MIN 3).
        <br /><small> Example: john.doe@email.com </small>
      </p>

      <p><strong><code>nationality</code></strong> <small>enum</small>
        <br />The customer's nationality (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
        <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.
        </small>
      </p>

      <!-- <p><strong><code>device_fingerprint</code></strong> <small>string</small>
        <br />The customer's device fingerprint (MAX 4000; MIN 1). For integrations using Yuno checkout the value is
        obtained automatically, do not send this field.
        <br /><small> Example: hi88287gbd8d7d782ge..... </small>
      </p>

      <p><strong><code>ip_address</code></strong> <small>string</small>
        <br />The customer's IP address (MAX 45; MIN 7).
        <br /><small> Example: 192.168.123.167 </small>
      </p> -->

      <!-- <details class="yuno">
        <summary>
          <strong><code>browser_info</code></strong> <small>object</small>
          <br />
          <p>Specifies the browser_info object.</p>
        </summary>
        <div>
          <p><strong><code>accept_header</code></strong> <small>boolean</small>
            <br />The accept header value of the customer's browser.
            <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
          </p>
          <p><strong><code>color_depth</code></strong> <small>float</small>
            <br />The color depth of the customer's browser in bits per pixel. This should be obtained by using the
            browser's screen.colorDepth property. Accepted values: 1, 4, 8, 15, 16, 24, 30, 32 or 48 bit color depth.
            (MAX
            5; MIN 1)..
            <br /><small> Example: 15 </small>
          </p>
          <p><strong><code>javascript_enabled</code></strong> <small>boolean</small>
            <br />Indicates if Javascript is enabled or not in the device.
            <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
          </p>
          <p><strong><code>language</code></strong> <small>string</small>
            <br />The navigator.language value of the customer's browser (as defined in IETF BCP 47) (MAX 5; MIN 1).
            <br /><small> Example: es-ES </small>
          </p>
          <p><strong><code>screen_height</code></strong> <small>string</small>
            <br />The total height of the customer's device screen in pixels. (MAX 255; MIN 3).
            <br /><small> Example: 2048 </small>
          </p>
          <p><strong><code>screen_width</code></strong> <small>string</small>
            <br />The total width of the customer's device screen in pixels. (MAX 255; MIN 3).
            <br /><small> Example: 1152 </small>
          </p>
          <p><strong><code>user_agent</code></strong> <small>string</small>
            <br />The user agent value of the customer's browser (MAX 255; MIN 3).
            <br /><small> Example: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like
              Gecko)
              Version/9.0.2 Safari/601.3.9 </small>
          </p>
        </div>
      </details> -->

      <details class="yuno">
        <summary>
          <strong><code>document</code></strong> <small>object</small>
          <br />
          <p>Specifies the customer's document object, including its number and type.</p>
        </summary>
        <div>
          <p><strong><code>document_number</code></strong> <small>string</small>
            <br />The customer's document number (MAX 40; MIN 3).
            <br /><small> Example: 1093333333 </small>
          </p>
          </p>
          <p><strong><code>document_type</code></strong> <small>enum</small>
            <br />The customer's document type (MAX 6, MIN 2).
            <br /><small> Possible enum values: Check the <a href="country-reference">
                Country reference</a>. </small>
          </p>
        </div>
      </details>

      <details class="yuno">
        <summary>
          <strong><code>phone</code></strong> <small>object</small>
          <br />
          <p>Specifies the customer's phone object, including number and code.</p>
        </summary>
        <div>
          <p><strong><code>number</code></strong> <small>string</small>
            <br />The customer's phone number (MAX 40; MIN 3).
            <br /><small> Example: 11992149494 </small>
          </p>
          </p>
          <p><strong><code>country_code</code></strong> <small>string</small>
            <br />The country calling code of the customer's phone (MAX 3; MIN 1)
            <br /><small> Possible values: Check the <a href="country-reference">
                Country reference</a>. </small>
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
            <br />The country considered for the billing address (MAX 2; MIN 2; <a href="country-reference">ISO
              3166-1</a>).
            <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.</small>
          </p>
          <p><strong><code>state</code></strong> <small>string</small>
            <br />The state considered for the billing address (MAX 255; MIN 3).
            <br /><small> Example: Cundinamarca </small>
          </p>
          <p><strong><code>zip_code</code></strong> <small>string</small>
            <br />The zipcode considered for the billing address (MAX 11; MIN 4).
            <br /><small> Example: 111111 </small>
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
            <br />The country considered for the shipping address (MAX 2; MIN 2; <a href="country-reference">ISO
              3166-1</a>).
            <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.</small>
          </p>
          <p><strong><code>state</code></strong> <small>string</small>
            <br />The state considered for the shipping address (MAX 255; MIN 3).
            <br /><small> Example: Cundinamarca </small>
          </p>
          <p><strong><code>zip_code</code></strong> <small>string</small>
            <br />The zipcode considered for the shipping address (MAX 11; MIN 4).
            <br /><small> Example: 111111 </small>
          </p>
        </div>
      </details>
    </div>
  </details>

  <details class="yuno">
    <summary>
      <strong><code>additional_data</code></strong> <small>object</small>
      <br />
      <p>Specifies the additional_data object. This object is not mandatory. However, if you send this information, the
        payment experience will be enhanced for your user.</p>
    </summary>
    <div>
      <details class="yuno">
        <summary>
          <strong><code>airline</code></strong> <small>object</small>
          <br />
          <p>Specifies the airline object. Passengers and tickets should have the same order information.</p>
        </summary>
        <div>
          <p><strong><code>pnr</code></strong> <small>string</small>
            <br />Passenger name record (MAX 10; MIN 1).
            <br /><small> Example: 1P-2UUGJW </small>
          </p>
          <details class="yuno">
            <summary>
              <strong><code>legs</code></strong> <small>array of object</small>
              <br />
              <p>Specifies the legs array of objects.</p>
            </summary>
            <div>
              <p><strong><code>arrival_airport</code></strong> <small>string</small>
                <br />IATA airport code (MAX 3; MIN 3). See <a href="http://www.iata.org">http://www.iata.org</a>.
                <br /><small> Example: AMS </small>
              </p>
              <p><strong><code>base_fare</code></strong> <small>float</small>
                <br />The transaction amount, excluding taxes and fees, the smallest unit of currency (multiple of
                0.0001).
                <br /><small> Example: 23.5676 </small>
              </p>
              <p><strong><code>base_fare_currency</code></strong> <small>string</small>
                <br />The currency used to transaction amount (MAX 3; MIN 3; <a href="country-reference">ISO 4217</a>).
                <br /><small> Example: Check the <a href="country-reference">Country reference</a>.</small>
              </p>
              <p><strong><code>carrier_code</code></strong> <small>string</small>
                <br />IATA carrier code (MAX 2; MIN 2). See <a href="http://www.iata.org">http://www.iata.org</a>.
                <br /><small> Example: KL </small>
              </p>
              <p><strong><code>departure_airport</code></strong> <small>string</small>
                <br />IATA code (MAX 3; MIN 3). See <a href="http://www.iata.org">http://www.iata.org</a>.
                <br /><small> Example: EZE </small>
              </p>
              <p><strong><code>departure_airport_timezone</code></strong> <small>string</small>
                <br />Airport timezone (MAX 6; MIN 6).
                <br /><small> Example: -03:00 </small>
              </p>
              <p><strong><code>departure_datetime</code></strong> <small>timestamp</small>
                <br />The departure date and time in local time at the departure airport.
                <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
              </p>
              <p><strong><code>fare_basis_code</code></strong> <small>string</small>
                <br />Code base rate provides specific information on the fare in addition to the class service, both
                required for booking (MAX 15; MIN 1).
                <br /><small> Example: HL7LNR </small>
              </p>
              <p><strong><code>fare_class_code</code></strong> <small>string</small>
                <br />The fare class code of the airline (MAX 1; MIN 1). The values can be a letter (A-Z) but may vary
                depending on the airline's definition.
                <br /><small> Example: C </small>
              </p>
              <p><strong><code>flight_number</code></strong> <small>string</small>
                <br />The flight number assigned by the airline carrier (MAX 5; MIN 1).
                <br /><small> Example: 842 </small>
              </p>
              <p><strong><code>stopover_code</code></strong> <small>string</small>
                <br />The stopover code (1-letter code that indicates whether the passenger is allowed to make a
                stopover.
                Only two types of characters are allowed: O: Stopover allowed (the letter “O”, not zero) / X: Stopover
                not
                allowed).
                <br /><small> Example: O </small>
              </p>
            </div>
          </details>
          <details class="yuno">
            <summary>
              <strong><code>passengers</code></strong> <small>array of objects</small>
              <br />
              <p>Specifies the array of objects that represents the passengers associated to the tickets.</p>
            </summary>
            <div>
              <details class="yuno">
                <summary>
                  <strong><code>document</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the document object for the passenger.</p>
                </summary>
                <div>
                  <p><strong><code>document_number</code></strong> <small>string</small>
                    <br />The passenger's document number (MAX 40; MIN 3).
                    <br /><small> Example: 1093333333 </small>
                  </p>
                  <p><strong><code>document_type</code></strong> <small>enum</small>
                    <br />The passenger's document type (MAX 6, MIN 2).
                    <br /><small> Possible enum values: Check the <a href="country-reference">
                        Country reference</a>. </small>
                  </p>
                  <p><strong><code>country</code></strong> <small>enum</small>
                    <br />Country where the document was issued (MAX 2; MIN 2; <a href="country-reference">ISO
                      3166-1</a>).
                    <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.
                    </small>
                  </p>
                </div>
              </details>
              <!-- <details class="yuno">
                <summary>
                  <strong><code>phone</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the phone object for the passenger.</p>
                </summary>
                <div>
                  <p><strong><code>country_code</code></strong> <small>string</small>
                    <br />The country calling code of the passenger's phone (MAX 3; MIN 1).
                    <br /><small> Possible values: Check the <a href="country-reference">
                        Country reference</a> </small>
                  </p>
                  <p><strong><code>number</code></strong> <small>string</small>
                    <br />The passenger's phone number, without the country code (MAX 32; MIN 1).
                    <br /><small> Example: 1130292837 </small>
                  </p>
                </div>
              </details> -->
              <p><strong><code>date_of_birth</code></strong> <small>string</small>
                <br />The passenger's date of birth in the YYYY-MM-DD format (MAX 10; MIN 10).
                <br /><small> Example: 1990-02-28 </small>
              </p>
              <p><strong><code>email</code></strong> <small>string</small>
                <br />The passenger's email (MAX 255; MIN 3).
                <br /><small> Example: John.Doe@gmail.com </small>
              </p>
              <p><strong><code>first_name</code></strong> <small>string</small>
                <br />The passenger's first name (MAX 255; MIN 3).
                <br /><small> Example: John </small>
              </p>
              <p><strong><code>last_name</code></strong> <small>string</small>
                <br />The passenger's last name (MAX 255; MIN 3).
                <br /><small> Example: Doe </small>
              </p>
              <p><strong><code>loyalty_number</code></strong> <small>string</small>
                <br />Number of passenger loyalty program (MAX 20, MIN 1).
                <br /><small> Example: 254587547 </small>
              </p>
              <p><strong><code>loyalty_tier</code></strong> <small>enum</small>
                <br />Tier of passenger loyalty program (MAX 255; MIN 3).
                <br /><small> Possible enum values: Check the <a href="airline-information">
                    Loyalty tier</a>.</small>
              </p>
              <p><strong><code>middle_name</code></strong> <small>string</small>
                <br />The passenger's middle name (MAX 255; MIN 3).
                <br /><small> Example: Charles </small>
              </p>
              <p><strong><code>nationality</code></strong> <small>enum</small>
                <br />The passenger's nationality (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
                <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.
                </small>
              </p>
              <p><strong><code>type</code></strong> <small>enum</small>
                <br />The type of passenger (MAX 1; MIN 1).
                <br /><small> Possible enum values: Check the <a href="airline-information">Passenger type list</a>.
                </small>
              </p>
            </div>
          </details>

          <details class="yuno">
            <summary>
              <strong><code>tickets</code></strong> <small>array of objects</small>
              <br />
              <p>Specifies the array of tickets associated with the passengers.</p>
            </summary>
            <div>
              <p><strong><code>ticket_number</code></strong> <small>string</small>
                <br />Ticket number (MAX 14; MIN 1).
                <br /><small> Example: 7411823255523 </small>
              </p>
              <p><strong><code>e_ticket</code></strong> <small>boolean</small>
                <br />Is this an e-ticket?
                <br /><small> Possible values: <code>True</code> or <code>False</code></small>
              </p>
              <p><strong><code>restricted</code></strong> <small>boolean</small>
                <br />Indicates if the ticket is refunfable or not.
                <br /><small> Possible values: <code>True</code> or <code>False</code></small>
              </p>
              <p><strong><code>total_fare_amount</code></strong> <small>float</small>
                <br />Total fare amount in the smallest unit of currency (multiple of 0.0001).
                <br /><small> Example: 80000 </small>
              </p>
              <p><strong><code>total_tax_amount</code></strong> <small>float</small>
                <br />Total taxes amount in the smallest unit of currency (multiple of 0.0001).
                <br /><small> Example: 14800 </small>
              </p>
              <p><strong><code>total_fee_amount</code></strong> <small>float</small>
                <br />Total fee amount in the smallest unit of currency (multiple of 0.0001).
                <br /><small> Example: 25200 </small>
              </p>
              <details class="yuno">
                <summary>
                  <strong><code>issue</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the issue object.</p>
                </summary>
                <div>
                  <p><strong><code>address</code></strong> <small>string</small>
                    <br />Address of the agent who sold the ticket (MAX 255; MIN 3).
                    <br /><small> Example: Apartamento 502, Torre I </small>
                  </p>
                  <!-- <p><strong><code>zip_code</code></strong> <small>string</small>
                    <br />Zip code of the agent who sold the ticket.
                    <br /><small> Example: 1636 </small>
                  </p> -->
                  <p><strong><code>carrier_prefix_code</code></strong> <small>string</small>
                    <br />Issuing or Validating carrier. This is the AWB Prefix (Air waybill) IATA 3-numeric code (MAX
                    3; MIN
                    3).
                    <br /><small> Example: 044 </small>
                  </p>
                  <p><strong><code>city</code></strong> <small>string</small>
                    <br />City name of the agent who sold the ticket (MAX 255; MIN 3).
                    <br /><small> Example: Bogotá</small>
                  </p>
                  <p><strong><code>country</code></strong> <small>enum</small>
                    <br />Country code where the ticket was issued (MAX 2; MIN 2; <a href="country-reference">ISO
                      3166-1</a>).
                    <br /><small> Possible enum values: Check the <a href="country-reference">Country code
                        list</a>. </small>
                  </p>
                  <p><strong><code>date</code></strong> <small>string</small>
                    <br />Ticket issuing date.
                    <br /><small> Example: 1979-01-12 </small>
                  </p>
                  <p><strong><code>travel_agent_code</code></strong> <small>string</small>
                    <br />Code of the travel agent issuing the ticket.
                    <br /><small> Example: 10655823 </small>
                  </p>
                  <p><strong><code>travel_agent_name</code></strong> <small>string</small>
                    <br />The name under which the point of sale appears on the agency list or franchise name (MAX 32;
                    MIN
                    1).
                    <br /><small> Example: ACME Agency Inc </small>
                  </p>
                </div>
              </details>
            </div>
          </details>
        </div>
      </details>
      <details class="yuno">
        <summary>
          <strong><code>order</code></strong> <small>object</small>
          <br />
          <p>Specifies the order object. </p>
        </summary>
        <div>
          <p><strong><code>fee_amount</code></strong> <small>float</small>
            <br />The fee amount of the order (multiple of 0.0001).
            <br /><small> Example: 1 </small>
          </p>
          <p><strong><code>shipping_amount</code></strong> <small>float</small>
            <br />The shipping amount of the order (multiple of 0.0001).
            <br /><small> Example: 1 </small>
          </p>
          <details class="yuno">
            <summary>
              <strong><code>items</code></strong> <small>array of object</small>
              <br />
              <p>Specifies the item's object.</p>
            </summary>
            <div>
              <p><strong><code>id</code></strong> <small>string</small>
                <br />The unique identifier of the item (MAX 255; MIN 3).
                <br /><small> Example: 3214</small>
              </p>
              <p><strong><code>name</code></strong> <small>string</small>
                <br />The name of the item (MAX 255; MIN 3).
                <br /><small> Example: iPhone 12 Pro Max </small>
              </p>
              <p><strong><code>quantity</code></strong> <small>int</small>
                <br />The quantity of the item (MAX 999; MIN 1).
                <br /><small> Example: 1 </small>
              </p>
              <p><strong><code>unit_amount</code></strong> <small>float</small>
                <br />The unit amount of the item (multiple of 0.0001).
                <br /><small> Example: 550 </small>
              </p>
              <p><strong><code>category</code></strong> <small>string</small>
                <br />The category of the item (MAX 255; MIN 3).
                <br /><small> Possible values: Check the <a href="items-category-list">Item category list</a>.
                </small>
              </p>
              <p><strong><code>brand</code></strong> <small>string</small>
                <br />The brand of the item (MAX 255; MIN 3).
                <br /><small> Example: Apple </small>
              </p>
              <p><strong><code>sku_code</code></strong> <small>string</small>
                <br />The stock keeping unit (SKU) of the item (MAX 255; MIN 3).
                <br /><small> Example: A2342</small>
              </p>
              <p><strong><code>manufacture_part_number</code></strong> <small>string</small>
                <br />The manufacture part number of the item (MAX 255; MIN 3).
                <br /><small> Example: 345621234 </small>
              </p>
              <p><strong><code>picture_url</code></strong> <small>string</small>
                <br />The picture of the item (MAX 255; MIN 3).
                <br /><small> Example: https://www.merchant_url.com/items/:id </small>
              </p>
            </div>
          </details>

        </div>
      </details>

      <details class="yuno">
        <summary>
          <strong><code>seller_details</code></strong> <small>object</small>
          <br />
          <p>Specifies the seller's details object.</p>
        </summary>
        <div>
          <p><strong><code>name</code></strong> <small>string</small>
            <br />The seller's legal name (MAX 255; MIN 3).
            <br /><small> Example: Jhon Doe </small>
          </p>
          <p><strong><code>email</code></strong> <small>string</small>
            <br />The seller's e-mail (MAX 255; MIN 3).
            <br /><small> Example: jhondoe@business.com </small>
          </p>
          <p><strong><code>reference</code></strong> <small>string</small>
            <br />The seller's identification code (MAX 255; MIN 3).
            <br /><small> Example: Seller </small>
          </p>
          <p><strong><code>website</code></strong> <small>string</small>
            <br />The seller's website URL (MAX 255; MIN 3).
            <br /><small> Example: https://www.test.com/1231324 </small>
          </p>
          <p><strong><code>industry</code></strong> <small>enum</small>
            <br />The seller's industry (MAX 255; MIN 3).
            <br /><small> Possible enum values: Check the <a href="industry-category-list">Industry category</a>.
            </small>
          </p>
          <p><strong><code>country</code></strong> <small>enum</small>
            <br />The seller's country (MAX 255; MIN 3).
            <br /><small> Possible enum values: Check the <a href="country-reference">Country code list</a>.
            </small>
          </p>

          <details class="yuno">
            <summary>
              <strong><code>document</code></strong> <small>object</small>
              <br />
              <p>Specifies the document object of the seller.</p>
            </summary>
            <div>
              <p><strong><code>document_number</code></strong> <small>string</small>
                <br />The seller's document number (MAX 40; MIN 3).
                <br /><small> Example: 1093333333 </small>
              </p>
              <p><strong><code>document_type</code></strong> <small>enum</small>
                <br />The seller's document type (MAX 6, MIN 2).
                <br /><small> Possible enum values: Check the <a href="country-reference">
                    Country reference</a>. </small>
              </p>
            </div>
          </details>


          <details class="yuno">
            <summary><strong><code>phone</code></strong> <small>object</small>
              <br />
              <p>Specifies the seller's phone number object.</p>
            </summary>
            <div>
              <p><strong><code>country_code</code></strong> <small>string</small>
                <br />The country calling code of the seller's phone (MAX 3; MIN 1). Possible values: Check the <a
                  href="country-reference">
                  Country reference</a>.
                <br /><small> Example: 57 </small>
              </p>
              <p><strong><code>number</code></strong> <small>string</small>
                <br />The seller's phone number, without the country code (MAX 32; MIN 1).
                <br /><small> Example: 3132450765 </small>
              </p>
            </div>
          </details>

          <details class="yuno">
            <summary><strong><code>address</code></strong> <small>object</small>
              <br />
              <p>Specifies the seller's address object.</p>
            </summary>
            <div>
              <p><strong><code>address_line_1</code></strong> <small>string</small>
                <br />The primary address line of the seller (MAX 255; MIN 3).
                <br /><small> Example: Calle 34 # 56 - 78 </small>
              </p>
              <p><strong><code>address_line_2</code></strong> <small>string</small>
                <br />The secondary billing address line of the seller (MAX 255; MIN 3).
                <br /><small> Example: Apartamento 502, Torre I </small>
              </p>
              <p><strong><code>city</code></strong> <small>string</small>
                <br />The city considered for the seller's address (MAX 255; MIN 3).
                <br /><small> Example: Bogotá </small>
              </p>
              <p><strong><code>country</code></strong> <small>enum</small>
                <br />The country considered for the seller's address (MAX 2; MIN 2,<a href='country-reference'>ISO
                  3166-1</a>).
                <br /><small> Possible enum values: Check the <a href="country-reference">Country code
                    list</a>.</small>
              </p>
              <p><strong><code>state</code></strong> <small>string</small>
                <br />The state considered for the seller's address (MAX 255; MIN 3).
                <br /><small> Example: Cundinamarca </small>
              </p>
              <p><strong><code>zip_code</code></strong> <small>string</small>
                <br />The zipcode considered for the seller's address (MAX 11; MIN 4).
                <br /><small> Example: 111111 </small>
              </p>
            </div>
          </details>

        </div>
      </details>
    </div>
  </details>

  <details class="yuno">
    <summary><strong><code>taxes</code></strong> <small>array of objects</small>
      <br />
      <p>Specifies the order's tax object.</p>
    </summary>
    <div>
      <p><strong><code>type</code></strong> <small>string</small>
        <br />Type of the tax.
        <br /><small> Example: VAT </small>
      </p>
      <p><strong><code>tax_base</code></strong> <small>float</small>
        <br />The amount base to apply the tax defined.
        <br /><small> Example: 10000 </small>
      </p>
      <p><strong><code>value</code></strong> <small>float</small>
        <br />The amount of the tax.
        <br /><small> Example: 2100 </small>
      </p>
      <p><strong><code>percentage</code></strong> <small>float</small>
        <br />The percentage of the tax.
        <br /><small> Example: 21 </small>
      </p>
    </div>
  </details>

  <div class="yuno">
    <p><strong><code>one_time_use</code></strong> <small>boolean</small>
      <br /> Single Link: For a single collection with defined product, amount and customer information.
      <br /> Multiple Link: To use and share as many times as necessary, with defined amount and product.
      <br />
      <br /><small> Options: <b>false</b> allows only one use, <b>true</b> multiple payments. </small>
    </p>
  </div>

  <details class="yuno">
    <summary><strong><code>availability</code></strong> <small>object</small>
      <br />
      <p>Specifies the availability object. Refers to the Payment Link expiration date.</p>
    </summary>
    <div>
      <p><strong><code>start_at</code></strong> <small>timestamp</small>
        <br />Start of the validity period of the payment link.
        <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
      </p>
      <p><strong><code>finish_at</code></strong> <small>timestamp</small>
        <br />End of the validity period of the payment link.
        <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
      </p>

    </div>
  </details>

  <div class="yuno">
    <p><strong><code>callback_url</code></strong> <small>string</small>
      <br />URL to redirect your customer after the payment (MAX 255; MIN 3).
      <br /><small> Example: https://www.your-site.com/ </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>redirect_url</code></strong> <small>string</small>
      <br />Payment Link URL (MAX 255; MIN 3).
      <br /><small> Example: https://checkout.y.uno/payment_links/id </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>payment_method_types</code></strong> <small>array of enums</small>
      <br />The list of types of payment methods that customers can use. If no value is passed, Yuno will display the
      payment methods defined in the dashboard.
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>payment</code></strong> <small>array of objects</small>
      <br />Array of <a href="the-payment-object">Payment objects</a>
    </p>
  </div>

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
    <p><strong><code>vault_on_success</code></strong> <small>boolean</small>
      <br />Flag to enroll the card after a successful payment. False by default.
      <br /><small> Example: false </small>
    </p>
  </div>

</body>
`}</HTMLBlock>
