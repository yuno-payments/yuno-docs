---
title: Create Payment Link Response
description: Recipe Description
hidden: false
recipe:
  color: '#018FF4'
  icon: 🦉
---
```json JSON
{
  "code": "e1512b4d-9057-4c73-8e49-921c51eb5ba2",
  "country": "US",
  "status": "CREATED",
  "merchant_order_id": "AA01",
  "description": "Test",
  "amount": {
    "currency": "USD",
    "value": 5000
  },
  "capture": true,
  "split_payment_methods": false,
  "payment_method_types": [
    "CARD"
  ],
  "one_time_use": false,
  "payments": null,
  "callback_url": "https://checkout.sandbox.y.uno/payment/status",
  "installments_plan": null,
  "customer_payer": {
    "id": "a76d79b7-902f-4152-922f-7e7eebc5f3dc",
    "merchant_customer_id": "1309",
    "first_name": "JOHN",
    "last_name": "DOE",
    "gender": "M",
    "date_of_birth": "1990-02-28",
    "email": "test@test.com",
    "nationality": "US",
    "ip_address": null,
    "device_fingerprint": null,
    "browser_info": {
      "user_agent": "string",
      "accept_header": "string",
      "accept_content": null,
      "accept_browser": null,
      "color_depth": "32",
      "screen_height": "32",
      "screen_width": "32",
      "javascript_enabled": true,
      "java_enabled": null,
      "browser_time_difference": null,
      "language": "string"
    },
    "document": {
      "document_type": "SSN",
      "document_number": "123-45-6789"
    },
    "phone": {
      "number": "5551234567",
      "country_code": "1"
    },
    "billing_address": {
      "address_line_1": "123 Main St",
      "address_line_2": "",
      "country": "US",
      "city": "San Diego"
    },
    "shipping_address": {
      "address_line_1": "123 Main St",
      "address_line_2": "",
      "country": "US",
      "city": "San Diego"
    }
  },
  "taxes": {
    "type": "SALES_TAX",
    "tax_base": 10000.0,
    "value": 2100.0,
    "percentage": 21.0
  },
  "additional_data": {
    "airline": {
      "pnr": "ABC123",
      "legs": [
        {
          "departure_airport": "JFK",
          "departure_datetime": "2023-10-31T01:30:00.000-05:00",
          "departure_airport_timezone": "GMT-05",
          "arrival_airport": "LAX",
          "arrival_datetime": "",
          "carrier_code": "AA",
          "flight_number": "AA100",
          "fare_basis_code": "Y",
          "fare_class_code": "S",
          "base_fare": 300,
          "base_fare_currency": "USD",
          "stopover_code": "O"
        }
      ],
      "passengers": [
        {
          "first_name": "JOHN",
          "last_name": "DOE",
          "middle_name": "STEPHEN",
          "type": "A",
          "date_of_birth": "1998-01-01",
          "nationality": "US",
          "document": {
            "document_type": "SSN",
            "document_number": "123-45-6789"
          },
          "country": null,
          "loyalty_number": "79250001",
          "loyalty_tier": "DIAMOND",
          "email": "john.doe@company.com",
          "phone": {
            "number": "5559876543",
            "country_code": "1"
          }
        }
      ],
      "ticket": null,
      "tickets": [
        {
          "ticket_number": "BRB0001",
          "e_ticket": true,
          "restricted": false,
          "total_fare_amount": 300,
          "total_tax_amount": 40,
          "total_fee_amount": 10,
          "issue": {
            "carrier_prefix_code": "AA",
            "travel_agent_code": "A104121",
            "travel_agent_name": "TRAVEL_AIR",
            "date": "2023-10-31T01:30:00.000-05:00",
            "address": "123 Main St",
            "city": "New York",
            "country": "US",
            "zip_code": "10001"
          }
        },
        {
          "ticket_number": "BRB0002",
          "e_ticket": true,
          "restricted": false,
          "total_fare_amount": 300,
          "total_tax_amount": 40,
          "total_fee_amount": 10,
          "issue": {
            "carrier_prefix_code": "AA",
            "travel_agent_code": "A104121",
            "travel_agent_name": "TRAVEL_AIR",
            "date": "2023-10-31T01:30:00.000-05:00",
            "address": "123 Main St",
            "city": "New York",
            "country": "US",
            "zip_code": "10001"
          }
        }
      ]
    },
    "order": {
      "fee_amount": 0,
      "shipping_amount": 0,
      "items": [
        {
          "id": "123AD",
          "name": "Skirt",
          "quantity": 1,
          "unit_amount": 50,
          "category": "Clothes",
          "brand": "XYZ",
          "sku_code": "8765432109",
          "manufacture_part_number": "XYZ123456"
        }
      ]
    },
    "seller_details": {
      "name": "John Doe",
      "email": "johndoe@business.com",
      "reference": "Seller",
      "website": "https://www.test.com/1231324",
      "industry": null,
      "country": "US",
      "document": {
        "document_number": "123-45-6789",
        "document_type": "SSN"
      },
      "phone": {
        "country_code": "1",
        "number": "5551234567"
      },
      "address": {
        "address_line_1": "123 Main St",
        "address_line_2": "",
        "city": "New York",
        "country": "US",
        "state": "NY",
        "zip_code": "10001"
      }
    }
  },
  "availability": {
    "start_at": "2023-01-15T14:00:12Z",
    "finish_at": "2023-12-29T14:00:12Z"
  },
  "metadata": [
    {
      "key": "order_id",
      "value": "AA001"
    }
  ],
  "account_code": "493e9374-510a-4201-9e09-de669d75f256",
  "checkout_url": "https://checkout.sandbox.y.uno/payment?session=2f6d9754-43d0-4dca-b023-6aba4b107179",
  "payments_number": 0,
  "merchant_image": ""
}
```

```json Response Example
{"success":true}
```

# Response JSON

<!-- json@1-7,11-13,16-20,71,193,197,203-206 -->

<ul>
  <li><b>id</b> (<code>string</code>): The unique identifier of the customer (MAX 64; MIN 36).</li>
  <li><b>account_id</b> (<code>string</code>): The unique identifier of the account (MAX 64; MIN 36).</li>
  <li><b>description</b> (<code>string</code>): The description of the payment link (MAX 255; MIN 3).</li>
  <li><b>country</b> (<code>enum</code>): Country where the transaction must be processed (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>). Possible enum values: Check the <a href="country-reference">Country reference</a>.</li>
  <li><b>status</b> (<code>enum</code>): The status of the Payment link (MAX 255; MIN 3) (CREATED, USED, CANCELED, EXPIRED, ERROR).</li>
  <li><b>merchant_order_id</b> (<code>string</code>): Identification of the payment link (MAX 255; MIN 3).</li>
  <li><b>created_at</b> (<code>timestamp</code>): The date and time when the payment link was created.</li>
  <li><b>updated_at</b> (<code>timestamp</code>): The date and time of the last update for the payment link.</li>
  <li><b>capture</b> (<code>boolean</code>): Decides whether to authorize the payment or capture it. Authorizing a card payment allows you to reserve funds in a customer's bank account. If the field is not sent, we will take it as true. You can later capture the payment vía Yuno's dashboard or <a href="capture-authorization">API method</a>.</li>
  <li><b>amount</b> (<code>object</code>): Specifies the payment amount object, with the value and currency.</li>
  <li><b>customer_payer</b> (<code>object</code>): Specifies customer object for payments links.</li>
  <li><b>additional_data</b> (<code>object</code>): Specifies the additional_data object. This object is not mandatory.
    However, if you send this information, the payment experience will be enhanced for your user.</li>
  <li><b>taxes</b> (<code>object</code>): Specifies the order's tax object.</li>
  <li><b>one_time_use</b> (<code>boolean</code>): Single Link: For a single collection with defined product, amount and customer information.
    Multiple Link: To use and share as many times as necessary, with defined amount and product.
  <br>Options: <b>false</b> allows only one use, <b>true</b> multiple payments.</li>
  <li><b>availability</b> (<code>object</code>): Specifies the availability object. Refers to the Payment Link expiration date.</li>
  <li><b>redirect_url</b> (<code>string</code>): Payment Link URL (MAX 255; MIN 3).</li>
  <li><b>payment_method_types</b> (<code>array of enums</code>): The list of types of payment methods that customers can use. If no value is passed, Yuno will display the payment methods defined in the dashboard.</li>
  <li><b>payment</b> (<code>array of objects</code>): Array of <a href="the-payment-object">Payment objects</a>.</li>
  <li><b>metadata</b> (<code>array of objects</code>): Specifies a list of metadata objects. You can add up to 50 metadata objects.</li>
</ul>

# Amount object

<!-- json@7-10 -->

Specifies the payment amount object, with the value and currency:

<ul>
  <li><b>currency</b> (<code>enum</code>): The currency used to make the payment (MAX 3; MIN 3; <a
      href="country-reference">ISO 4217</a>).</li>
  <li><b>value</b> (<code>number</code>): The payment amount (multiple of 0.0001).</li>
  <li><b>refunded</b> (<code>number</code>): The refund amount (multiple of 0.0001).</li>
  <li><b>captured</b> (<code>number</code>): The captured amount (multiple of 0.0001).</li>
</ul>

# Customer payer object

<!-- json@20-64 -->

Specifies customer object for payments:

<ul>
  <li><b>id</b> (<code>string</code>): The unique identifier of the customer (MAX 64; MIN 36). Specifies the checkout object. This object is not mandatory for back-to-back payments. Required when WORKFLOW is defined as CHECKOUT or is not sent.</li>
  <li><b>customer_id</b> (<code>string</code>): The unique identifier of the customer in the external merchant (MAX 255; MIN 3).</li>
  <li><b>first_name</b> (<code>string</code>): The customer's first name (MAX 255; MIN 1).</li>
  <li><b>last_name</b> (<code>string</code>): The customer's last name (MAX 255; MIN 1).</li>
  <li><b>gender</b> (<code>enum</code>): The customer's gender (MAX 1; MIN 1; (M=Male/F=Female/NA=Not applicable/NK=Not Known)).
    <br />Possible enum values: <code>M</code>, <code>F</code>, <code>NA</code>, or <code>NK</code>.</li>
  <li><b>date_of_birth</b> (<code>string</code>): The customer's date of birth in the YYYY-MM-DD format (Length: 10).</li>
  <li><b>email</b> (<code>string</code>): The customer's e-mail (MAX 255; MIN 3).</li>
  <li><b>nationality</b> (<code>enum</code>): The customer's nationality (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
    <br />Possible enum values: Check the <a href="country-reference">Country reference</a>.</li>
  <li>
    <details>
      <summary><b>document</b> (<code>object</code>): Specifies the customer's document object, including its number and type.</summary>
      <ul>
        <li><b>document_number</b> (<code>string</code>): The customer's document number (MAX 40; MIN 3).</li>
        <li><b>document_type</b> (<code>enum</code>): The customer's document type (MAX 6, MIN 2).
          <br />Possible enum values: Check the <a href="country-reference">Country reference</a>.</li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary><b>phone</b> (<code>object</code>): Specifies the customer's phone object, including number and code.</summary>
      <ul>
        <li><b>number</b> (<code>string</code>): The customer's phone number (MAX 40; MIN 3).</li>
        <li><b>country_code</b> (<code>string</code>): The country calling code of the customer's phone (MAX 3; MIN 1)
          <br />Possible values: Check the <a href="country-reference">Country reference</a>.</li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary><b>billing_address</b> (<code>object</code>): Specifies the customer's billing address object.</summary>
      <ul>
        <li><b>address_line_1</b> (<code>string</code>): The primary billing address line of the customer (MAX 255; MIN 3).</li>
        <li><b>address_line_2</b> (<code>string</code>): The secondary billing address line of the customer (MAX 255; MIN 3).</li>
        <li><b>city</b> (<code>string</code>): The city considered for the billing address (MAX 255; MIN 3).</li>
        <li><b>country</b> (<code>enum</code>): The country considered for the billing address (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
          <br />Possible enum values: Check the <a href="country-reference">Country reference</a>.</li>
        <li><b>state</b> (<code>string</code>): The state considered for the billing address (MAX 255; MIN 3).</li>
        <li><b>zip_code</b> (<code>string</code>): The zip code considered for the billing address (MAX 11; MIN 4).</li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary><b>shipping_address</b> (<code>object</code>): Specifies the customer's shipping address object.</summary>
      <ul>
        <li><b>address_line_1</b> (<code>string</code>): The primary shipping address line of the customer (MAX 255; MIN 3).</li>
        <li><b>address_line_2</b> (<code>string</code>): The secondary shipping address line of the customer (MAX 255; MIN 3).</li>
        <li><b>city</b> (<code>string</code>): The city considered for the shipping address (MAX 255; MIN 3).</li>
        <li><b>country</b> (<code>enum</code>): The country considered for the shipping address (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
          <br />Possible enum values: Check the <a href="country-reference">Country reference</a>.</li>
        <li><b>state</b> (<code>string</code>): The state considered for the shipping address (MAX 255; MIN 3).</li>
        <li><b>zip_code</b> (<code>string</code>): The zip code considered for the shipping address (MAX 11; MIN 4).</li>
      </ul>
    </details>
  </li>
</ul>

# Airline object

<!-- json@72-151 -->

Specifies the airline object. Passengers and tickets should have the same order information:

<ul>
  <li><b>pnr</b> (<code>string</code>): Passenger name record (MAX 10; MIN 1).<br /><small> Example: 1P-2UUGJW </small>
  </li>
  <li>
    <details>
      <summary>
        <b>legs</b> (<code>array of object</code>): Specifies the legs array of objects.
      </summary>
      <ul>
        <li><b>arrival_airport</b> (<code>string</code>): IATA airport code (MAX 3; MIN 3). See <a
            href="http://www.iata.org">http://www.iata.org</a>.<br /><small> Example: AMS </small></li>
        <li><b>base_fare</b> (<code>float</code>): The transaction amount, excluding taxes and fees, the smallest unit
          of currency (multiple of 0.0001).<br /><small> Example: 23.5676 </small></li>
        <li><b>base_fare_currency</b> (<code>string</code>): The currency used to transaction amount (MAX 3; MIN 3; <a
            href="country-reference">ISO 4217</a>).<br /><small> Example: Check the <a href="country-reference">Country
              reference</a>.</small></li>
        <li><b>carrier_code</b> (<code>string</code>): IATA carrier code (MAX 2; MIN 2). See <a
            href="http://www.iata.org">http://www.iata.org</a>.<br /><small> Example: KL </small></li>
        <li><b>departure_airport</b> (<code>string</code>): IATA code (MAX 3; MIN 3). See <a
            href="http://www.iata.org">http://www.iata.org</a>.<br /><small> Example: EZE </small></li>
        <li><b>departure_airport_timezone</b> (<code>string</code>): Airport timezone (MAX 6; MIN 6).<br /><small>
            Example: -03:00 </small></li>
        <li><b>departure_datetime</b> (<code>timestamp</code>): The departure date and time in local time at the
          departure airport.<br /><small> Example: 2022-05-09T20:46:54.786342Z </small></li>
        <li><b>fare_basis_code</b> (<code>string</code>): Code base rate provides specific information on the fare in
          addition to the class service, both required for booking (MAX 15; MIN 1).<br /><small> Example: HL7LNR
          </small></li>
        <li><b>fare_class_code</b> (<code>string</code>): The fare class code of the airline (MAX 1; MIN 1). The values
          can be a letter (A-Z) but may vary depending on the airline's definition. Check the Airline information
          reference.<br /><small> Example: Y </small></li>
        <li><b>flight_number</b> (<code>string</code>): The flight number assigned by the airline carrier (MAX 5; MIN
          1).<br /><small> Example: 842 </small></li>
        <li><b>stopover_code</b> (<code>string</code>): The stopover code (1-letter code that indicates whether the
          passenger is allowed to make a stopover. Only two types of characters are allowed: O: Stopover allowed (the
          letter “O”, not zero) / X: Stopover not allowed).<br /><small> Example: O </small></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary>
        <b>passengers</b> (<code>array of objects</code>): Specifies the array of objects that represents the passengers
        associated with the tickets.
      </summary>
      <ul>
        <li><b>country</b> (<code>enum</code>): Country where the document was issued (MAX 2; MIN 2; <a
            href="country-reference">ISO 3166-1</a>).<br /><small> Possible enum values: Check the <a
              href="country-reference">Country reference</a>.</small></li>
        <li><b>date_of_birth</b> (<code>string</code>): The passenger's date of birth in the YYYY-MM-DD format (MAX 10;
          MIN 10).<br /><small> Example: 1990-02-28 </small></li>
        <details>
          <summary>
            <b>document</b> (<code>object</code>): Specifies the document object for the passenger.
          </summary>
          <ul>
            <li><b>document_number</b> (<code>string</code>): The passenger's document number (MAX 40; MIN
              3).<br /><small> Example: 1093333333 </small></li>
            <li><b>document_type</b> (<code>enum</code>): The passenger's document type (MAX 6, MIN 2).<br /><small>
                Possible enum values: Check the <a href="country-reference">Country reference</a>. </small></li>
            <li><b>country</b> (<code>enum</code>): Country where the document was issued (MAX 2; MIN 2; <a
                href="country-reference">ISO 3166-1</a>).<br /><small> Possible enum values: Check the <a
                  href="country-reference">Country reference</a>. </small></li>
          </ul>
        </details>
        <details>
          <summary>
            <b>phone</b> (<code>object</code>): Specifies the phone object for the passenger.
          </summary>
          <ul>
            <li><b>country_code</b> (<code>string</code>): The country calling code of the passenger's phone (MAX 3; MIN
              1).<br /><small> Possible values: Check the <a href="country-reference">Country reference</a> </small>
            </li>
            <li><b>number</b> (<code>string</code>): The passenger's phone number, without the country code (MAX 32; MIN
              1).<br /><small> Example: 1130292837 </small></li>
          </ul>
        </details>
        <li><b>email</b> (<code>string</code>): The passenger's email (MAX 255; MIN 3).<br /><small> Example:
            John.Doe@gmail.com </small></li>
        <li><b>first_name</b> (<code>string</code>): The passenger's first name (MAX 255; MIN 3).<br /><small> Example:
            John </small></li>
        <li><b>last_name</b> (<code>string</code>): The passenger's last name (MAX 255; MIN 3).<br /><small> Example:
            Doe </small></li>
        <li><b>loyalty_number</b> (<code>string</code>): Number of passenger loyalty program (MAX 20, MIN
          1).<br /><small> Example: 254587547 </small></li>
        <li><b>loyalty_tier</b> (<code>enum</code>): Tier of passenger loyalty program (MAX 255; MIN 3).<br /><small>
            Possible enum values: Check the <a href="airline-information">Loyalty tier</a>.</small></li>
        <li><b>middle_name</b> (<code>string</code>): The passenger's middle name (MAX 255; MIN 3).<br /><small>
            Example: Charles </small></li>
        <li><b>nationality</b> (<code>enum</code>): The passenger's nationality (MAX 2; MIN 2; <a
            href="country-reference">ISO 3166-1</a>).<br /><small> Possible enum values: Check the <a
              href="country-reference">Country reference</a>.</small></li>
        <li><b>type</b> (<code>enum</code>): The type of passenger (MAX 1; MIN 1).<br /><small> Possible enum values:
            Check the <a href="airline-information">Passenger type list</a>.</small></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary>
        <b>tickets</b> (<code>array of objects</code>): Specifies the array of tickets associated with the passengers.
      </summary>
      <ul>
        <li><b>ticket_number</b> (<code>string</code>): Ticket number (MAX 14; MIN 1).<br /><small> Example:
            7411823255523 </small></li>
        <li><b>e_ticket</b> (<code>boolean</code>): Is this an e-ticket?<br /><small> Possible values: <code>True</code>
            or <code>False</code></small></li>
        <li><b>restricted</b> (<code>boolean</code>): Indicates if the ticket is refundable or not.<br /><small>
            Possible values: <code>True</code> or <code>False</code></small></li>
        <li><b>total_fare_amount</b> (<code>float</code>): Total fare amount in the smallest unit of currency (multiple
          of 0.0001).<br /><small> Example: 80000 </small></li>
        <li><b>total_tax_amount</b> (<code>float</code>): Total taxes amount in the smallest unit of currency (multiple
          of 0.0001).<br /><small> Example: 14800 </small></li>
        <li><b>total_fee_amount</b> (<code>float</code>): Total fee amount in the smallest unit of currency (multiple of
          0.0001).<br /><small> Example: 25200 </small></li>
        <details>
          <summary>
            <b>issue</b> (<code>object</code>): Specifies the issue object.
          </summary>
          <ul>
            <li><b>address</b> (<code>string</code>): Address of the agent who sold the ticket (MAX 255; MIN
              3).<br /><small> Example: Apartamento 502, Torre I </small></li>
            <li><b>zip_code</b> (<code>string</code>): Zip code of the agent who sold the ticket.<br /><small> Example:
                1636 </small></li>
            <li><b>carrier_prefix_code</b> (<code>string</code>): Issuing or Validating carrier. This is the AWB Prefix
              (Air waybill) IATA 3-numeric code (MAX 3; MIN 3).<br /><small> Example: 044 </small></li>
            <li><b>city</b> (<code>string</code>): City name of the agent who sold the ticket (MAX 255; MIN
              3).<br /><small> Example: Bogotá</small></li>
            <li><b>country</b> (<code>enum</code>): Country code where the ticket was issued (MAX 2; MIN 2; <a
                href="country-reference">ISO 3166-1</a>).<br /><small> Possible enum values: Check the <a
                  href="country-reference">Country code list</a>. </small></li>
            <li><b>date</b> (<code>string</code>): Ticket issuing date.<br /><small> Example: 1979-01-12 </small></li>
            <li><b>travel_agent_code</b> (<code>string</code>): Code of the travel agent issuing the
              ticket.<br /><small> Example: 10655823 </small></li>
            <li><b>travel_agent_name</b> (<code>string</code>): The name under which the point of sale appears on the
              agency list or franchise name (MAX 32; MIN 1).<br /><small> Example: ACME Agency Inc </small></li>
          </ul>
        </details>
      </ul>
    </details>
  </li>
</ul>

# Order object

<!-- json@152-167 -->

Specifies the order object:

<ul>
  <li><b>fee_amount</b> (<code>float</code>): The fee amount of the order (multiple of 0.0001).</li>
<li><b>shipping_amount</b> (<code>float</code>): The shipping amount of the order (multiple of 0.0001).</li>
<li>
  <details class="yuno">
    <summary>
        <b>items</b> (<code>array of object</code>): Specifies the item's object.
    </summary>
    <ul>
        <li><b>id</b> (<code>string</code>): The unique identifier of the item (MAX 255; MIN 3).</li>
        <li><b>name</b> (<code>string</code>): The name of the item (MAX 255; MIN 3).</li>
        <li><b>quantity</b> (<code>int</code>): The quantity of the item (MAX 999; MIN 1).</li>
        <li><b>unit_amount</b> (<code>float</code>): The unit amount of the item (multiple of 0.0001).</li>
        <li><b>category</b> (<code>string</code>): The category of the item (MAX 255; MIN 3).</li>
        <li><b>brand</b> (<code>string</code>): The brand of the item (MAX 255; MIN 3).</li>
        <li><b>sku_code</b> (<code>string</code>): The stock keeping unit (SKU) of the item (MAX 255; MIN 3).</li>
        <li><b>manufacture_part_number</b> (<code>string</code>): The manufacture part number of the item (MAX 255; MIN 3).</li>
    </ul>
</details>
</li>


</ul>

# Seller details object

<!-- json@168-191 -->

Specifies the seller's details object:

<ul>
  <li><b>name</b> (<code>string</code>): The seller's legal name (MAX 255; MIN 3).</li>
<li><b>email</b> (<code>string</code>): The seller's e-mail (MAX 255; MIN 3).</li>
<li><b>reference</b> (<code>string</code>): The seller's identification code (MAX 255; MIN 3).</li>
<li><b>website</b> (<code>string</code>): The seller's website URL (MAX 255; MIN 3).</li>
<li><b>industry</b> (<code>enum</code>): The seller's industry (MAX 255; MIN 3). Possible enum values: Check the <a href="industry-category-list">Industry category</a>.</li>
<li><b>country</b> (<code>enum</code>): The seller's country (MAX 255; MIN 3). Possible enum values: Check the <a href="country-reference">Country code list</a>.</li>
<li>
  <details class="yuno">
      <summary>
          <b>document</b> (<code>object</code>): Specifies the document object of the seller.
      </summary>
      <ul>
          <li><b>document_number</b> (<code>string</code>): The seller's document number (MAX 40; MIN 3).</li>
          <li><b>document_type</b> (<code>enum</code>): The seller's document type (MAX 6, MIN 2). Possible enum values: Check the <a href="country-reference">Country reference</a>.</li>
      </ul>
  </details>
</li>
<li>
  <details class="yuno">
      <summary>
          <b>phone</b> (<code>object</code>): Specifies the seller's phone number object.
      </summary>
      <ul>
          <li><b>country_code</b> (<code>string</code>): The country calling code of the seller's phone (MAX 3; MIN 1). Possible values: Check the <a href="country-reference">Country reference</a>.</li>
          <li><b>number</b> (<code>string</code>): The seller's phone number, without the country code (MAX 32; MIN 1).</li>
      </ul>
  </details>
</li>
<li>
  <details class="yuno">
      <summary>
          <b>address</b> (<code>object</code>): Specifies the seller's address object.
      </summary>
      <ul>
          <li><b>address_line_1</b> (<code>string</code>): The primary address line of the seller (MAX 255; MIN 3).</li>
          <li><b>address_line_2</b> (<code>string</code>): The secondary billing address line of the seller (MAX 255; MIN 3).</li>
          <li><b>city</b> (<code>string</code>): The city considered for the seller's address (MAX 255; MIN 3).</li>
          <li><b>country</b> (<code>enum</code>): The country considered for the seller's address (MAX 2; MIN 2,<a href='country-reference'>ISO 3166-1</a>). Possible enum values: Check the <a href="country-reference">Country code list</a>.</li>
          <li><b>state</b> (<code>string</code>): The state considered for the seller's address (MAX 255; MIN 3).</li>
          <li><b>zip_code</b> (<code>string</code>): The zipcode considered for the seller's address (MAX 11; MIN 4).</li>
      </ul>
  </details>
</li>

</ul>

# Taxes object

<!-- json@65-70 -->

Specifies the order's tax object:

<li><b>type</b> (<code>string</code>): Type of the tax.</li>
<li><b>tax_base</b> (<code>float</code>): The amount base to apply the tax defined.</li>
<li><b>value</b> (<code>float</code>): The amount of the tax.</li>
<li><b>percentage</b> (<code>float</code>): The percentage of the tax.</li>

# Availability object

<!-- json@193-196 -->

Specifies the availability object. Refers to the Payment Link expiration date:

<ul>
  <li><b>start_at</b> (<code>timestamp</code>): Start of the validity period of the payment link.</li>
  <li><b>finish_at</b> (<code>timestamp</code>): End of the validity period of the payment link.</li>
</ul>

# Metadata array of objects

<!-- json@197-202 -->

Specifies a list of metadata objects. You can add up to 50 metadata objects:

<li><b>key</b> (<code>string</code>): Specifies one metadata key.</li>
        <li><b>value</b> (<code>string</code>): Specifies the value for the defined metadata key.</li>