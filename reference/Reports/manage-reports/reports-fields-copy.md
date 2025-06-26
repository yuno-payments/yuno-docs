---
title: Reports Fields (COPY)
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
In this section, you can find all report types and related fields available when generating your reports. Take into account the description of the fields, where you can find the origin of the data and its availability.

Yuno provides several report types:

* [Payment](ref:reports-fields#payment-report)
* [Transaction ](ref:reports-fields#transaction-report)
* [Transaction reconciliation](ref:reports-fields#transaction-reconciliation-report)
* [Settlement](ref:reports-fields#settlement-report)
* [Communications](ref:reports-fields#communications-report)
* [Fraud Transactions](ref:reports-fields#fraud-transactions-report)
* [Payouts](ref:reports-fields#payouts-report)
* [Fees](ref:reports-fields#fees-report)
* [Agenda](ref:reports-fields#agenda-report)
* [Sales Conciliation](ref:reports-fields#sales-conciliation-report)
* [Advancements](ref:reports-fields#advancements-report)

Below, you will find details of each report type.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <div class="contentContainer">
        <h3 style="margin:0;">Updates</h3>
        <p>The report fields are subject to modifications, and new fields can be added to the end of the current structure.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Payment report

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
    font-size: 1rem;

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
  }

  .table-card .table-div td {
    text-align: center;
  }

  .table-card .table-div tbody tr {
    font-size: 0.8rem;
    overflow-wrap: break-word;
  }

  .table-card .table-div tbody tr :first-child {
    font-weight: 600;
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
  <details class="table-card">
    <summary>
      <span class="table-call">Payment report field details </span>
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
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>account_id</code></td>
            <td>string</td>
            <td>The unique identifier of the account (MAX 64; MIN 36).</td>
            <td>64143128-dd12-11ec-9d64-0242ac120002</td>
          </tr>
          <tr>
            <td><code>airline_leg_arrival_airport</code></td>
            <td>string</td>
            <td>Code of the destination airport for the flight leg.</td>
            <td>JFK</td>
          </tr>
          <tr>
            <td><code>airline_leg_base_fare</code></td>
            <td>number</td>
            <td>Base fare of the flight leg before taxes and fees.</td>
            <td>250</td>
          </tr>
          <tr>
            <td><code>airline_leg_base_fare_currency</code></td>
            <td>enum</td>
            <td>Currency in which the base fare is charged (<a href="/reference/country-reference">ISO 4217</a>).</td>
            <td>USD</td>
          </tr>
          <tr>
            <td><code>airline_leg_carrier_code</code></td>
            <td>string</td>
            <td>Airline carrier code for the flight leg.</td>
            <td>AA</td>
          </tr>
          <tr>
            <td><code>airline_leg_departure_airport</code></td>
            <td>string</td>
            <td>Code of the departure airport for the flight leg.</td>
            <td>LAX</td>
          </tr>
          <tr>
            <td><code>airline_leg_departure_datetime</code></td>
            <td>datetime</td>
            <td>Date and time of the flight departure.</td>
            <td>2024-09-12 15:30</td>
          </tr>
          <tr>
            <td><code>airline_leg_fare_basis_code</code></td>
            <td>string</td>
            <td>Code defining fare rules for the ticket.</td>
            <td>Y26HNR</td>
          </tr>
          <tr>
            <td><code>airline_leg_fare_class_code</code></td>
            <td>string</td>
            <td>Class code of the ticket (e.g., economy, business).</td>
            <td>Y</td>
          </tr>
          <tr>
            <td><code>airline_leg_flight_number</code></td>
            <td>string</td>
            <td>Number of the flight for the specific leg.</td>
            <td>100</td>
          </tr>
          <tr>
            <td><code>airline_leg_stopover_code</code></td>
            <td>enum</td>
            <td>Indicates if the flight has a stopover (Y/N).</td>
            <td>N</td>
          </tr>
          <tr>
            <td><code>airline_passenger_country</code></td>
            <td>string</td>
            <td>Country of residence of the passenger.</td>
            <td>US</td>
          </tr>
          <tr>
            <td><code>airline_passenger_date_of_birth</code></td>
            <td>date</td>
            <td>Passenger's date of birth.</td>
            <td>1990-05-14</td>
          </tr>
          <tr>
            <td><code>airline_passenger_document_number</code></td>
            <td>string</td>
            <td>Number of the passenger's identification document.</td>
            <td>A12345678</td>
          </tr>
          <tr>
            <td><code>airline_passenger_document_type</code></td>
            <td>enum</td>
            <td>Type of identification document (e.g., passport, ID card).</td>
            <td>PASSPORT</td>
          </tr>
          <tr>
            <td><code>airline_passenger_email</code></td>
            <td>string</td>
            <td>Email address of the passenger.</td>
            <td>passenger@email.com</td>
          </tr>
          <tr>
            <td><code>airline_passenger_first_name</code></td>
            <td>string</td>
            <td>First name of the passenger.</td>
            <td>John</td>
          </tr>
          <tr>
            <td><code>airline_passenger_last_name</code></td>
            <td>string</td>
            <td>Last name of the passenger.</td>
            <td>Doe</td>
          </tr>
          <tr>
            <td><code>airline_passenger_loyalty_number</code></td>
            <td>string</td>
            <td>Loyalty program number of the passenger.</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td><code>airline_passenger_loyalty_tier</code></td>
            <td>enum</td>
            <td>Tier level of the passenger's loyalty program (e.g., Gold, Platinum).</td>
            <td>Gold</td>
          </tr>
          <tr>
            <td><code>airline_passenger_middle_name</code></td>
            <td>string</td>
            <td>Middle name of the passenger (if applicable).</td>
            <td>Andrew</td>
          </tr>
          <tr>
            <td><code>airline_passenger_nationality</code></td>
            <td>string</td>
            <td>Nationality of the passenger.</td>
            <td>US</td>
          </tr>
          <tr>
            <td><code>airline_passenger_phone_country_code</code></td>
            <td>string</td>
            <td>Country code for the passenger's phone number.</td>
            <td>1</td>
          </tr>
          <tr>
            <td><code>airline_passenger_phone_number</code></td>
            <td>string</td>
            <td>Passenger's phone number.</td>
            <td>555-1234</td>
          </tr>
          <tr>
            <td><code>airline_passenger_type</code></td>
            <td>enum</td>
            <td>Type of passenger (e.g., adult, child, infant).</td>
            <td>Adult</td>
          </tr>
          <tr>
            <td><code>airline_ticket_e_ticket</code></td>
            <td>boolean</td>
            <td>Indicates if the ticket is electronic (true/false).</td>
            <td>TRUE</td>
          </tr>
          <tr>
            <td><code>airline_ticket_issue_address</code></td>
            <td>string</td>
            <td>Address where the ticket was issued.</td>
            <td>123 Main St</td>
          </tr>
          <tr>
            <td><code>airline_ticket_issue_carrier_prefix_code</code></td>
            <td>string</td>
            <td>Carrier prefix code for the issuing airline.</td>
            <td>1</td>
          </tr>
          <tr>
            <td><code>airline_ticket_issue_city</code></td>
            <td>string</td>
            <td>City where the ticket was issued.</td>
            <td>New York</td>
          </tr>
          <tr>
            <td><code>airline_ticket_issue_country</code></td>
            <td>string</td>
            <td>Country where the ticket was issued.</td>
            <td>US</td>
          </tr>
          <tr>
            <td><code>airline_ticket_issue_date</code></td>
            <td>date</td>
            <td>Date when the ticket was issued.</td>
            <td>2024-09-10</td>
          </tr>
          <tr>
            <td><code>airline_ticket_issue_travel_agent_code</code></td>
            <td>string</td>
            <td>Code of the travel agent who issued the ticket.</td>
            <td>TA123</td>
          </tr>
          <tr>
            <td><code>airline_ticket_issue_travel_agent_name</code></td>
            <td>string</td>
            <td>Name of the travel agent who issued the ticket.</td>
            <td>John Doe Travel</td>
          </tr>
          <tr>
            <td><code>airline_ticket_issue_zip_code</code></td>
            <td>string</td>
            <td>Postal code where the ticket was issued.</td>
            <td>10001</td>
          </tr>
          <tr>
            <td><code>airline_ticket_restricted</code></td>
            <td>boolean</td>
            <td>Indicates if the ticket has restrictions (true/false).</td>
            <td>FALSE</td>
          </tr>
          <tr>
            <td><code>airline_ticket_ticket_number</code></td>
            <td>string</td>
            <td>Unique number assigned to the ticket.</td>
            <td>1234567890123</td>
          </tr>
          <tr>
            <td><code>airline_ticket_total_fare_amount</code></td>
            <td>number</td>
            <td>Total amount paid for the ticket.</td>
            <td>300</td>
          </tr>
          <tr>
            <td><code>airline_ticket_total_fee_amount</code></td>
            <td>number</td>
            <td>Total additional fees applied to the ticket.</td>
            <td>50</td>
          </tr>
          <tr>
            <td><code>airline_ticket_total_tax_amount</code></td>
            <td>number</td>
            <td>Total taxes applied to the ticket.</td>
            <td>25</td>
          </tr>
          <tr>
            <td><code>amount_value</code></td>
            <td>number</td>
            <td>The payment amount (multiple of 0.0001).</td>
            <td>111111</td>
          </tr>
          <tr>
            <td><code>bank_name</code></td>
            <td>string</td>
            <td>Name of the bank associated with the transaction.</td>
            <td>Wells Fargo</td>
          </tr>
          <tr>
            <td><code>beneficiary_name</code></td>
            <td>string</td>
            <td>Name of the beneficiary for the transaction or payment.</td>
            <td>Jane Doe</td>
          </tr>
          <tr>
            <td><code>browser_info_accept_header</code></td>
            <td>string</td>
            <td>The 'accept' header sent by the browser.</td>
            <td>text/html</td>
          </tr>
          <tr>
            <td><code>browser_info_color_depth</code></td>
            <td>number</td>
            <td>Color depth supported by the browser's display (in bits).</td>
            <td>24</td>
          </tr>
          <tr>
            <td><code>browser_info_javascript_enabled</code></td>
            <td>boolean</td>
            <td>Indicates if JavaScript is enabled in the browser.</td>
            <td>TRUE</td>
          </tr>
          <tr>
            <td><code>browser_info_language</code></td>
            <td>string</td>
            <td>Default language set in the browser.</td>
            <td>en-US</td>
          </tr>
          <tr>
            <td><code>browser_info_screen_height</code></td>
            <td>number</td>
            <td>Height of the browser screen in pixels.</td>
            <td>1080</td>
          </tr>
          <tr>
            <td><code>browser_info_screen_width</code></td>
            <td>number</td>
            <td>Width of the browser screen in pixels.</td>
            <td>1920</td>
          </tr>
          <tr>
            <td><code>browser_info_user_agent</code></td>
            <td>string</td>
            <td>User agent string representing the browser and operating system.</td>
            <td>Mozilla/5.0</td>
          </tr>
          <tr>
            <td><code>captured</code></td>
            <td>number</td>
            <td>Indicates the total amount captured for payment.</td>
            <td>1000.00</td>
          </tr>
          <tr>
            <td><code>card_brand</code></td>
            <td>string</td>
            <td>Brand of the card used in the transaction (e.g., Visa, MasterCard).</td>
            <td>Visa</td>
          </tr>
          <tr>
            <td><code>card_category</code></td>
            <td>string</td>
            <td>Category of the card (e.g., credit, debit).</td>
            <td>Credit</td>
          </tr>
          <tr>
            <td><code>card_holder_name</code></td>
            <td>string</td>
            <td>Name of the cardholder.</td>
            <td>John Doe</td>
          </tr>
          <tr>
            <td><code>card_iin</code></td>
            <td>string</td>
            <td>Issuer Identification Number (IIN) for the card (first 6 digits).</td>
            <td>123456</td>
          </tr>
          <tr>
            <td><code>card_issuer_code</code></td>
            <td>string</td>
            <td>Code identifying the card issuer.</td>
            <td>CITI123</td>
          </tr>
          <tr>
            <td><code>card_issuer_name</code></td>
            <td>string</td>
            <td>Name of the bank or institution issuing the card.</td>
            <td>Citi Bank</td>
          </tr>
          <tr>
            <td><code>card_lfd</code></td>
            <td>number</td>
            <td>Last four digits of the card number.</td>
            <td>7890</td>
          </tr>
          <tr>
            <td><code>card_type</code></td>
            <td>enum</td>
            <td>Type of card (e.g., credit, debit).</td>
            <td>Credit</td>
          </tr>
          <tr>
            <td><code>checkout_session</code></td>
            <td>string</td>
            <td>Unique identifier for the checkout session.</td>
            <td>ch_sess_12345</td>
          </tr>
          <tr>
            <td><code>country</code></td>
            <td>enum</td>
            <td>The country where the transaction must be processed (MAX 2; MIN 2; <a
                href="/reference/country-reference">ISO 3166-1</a>).</td>
            <td>US</td>
          </tr>
          <tr>
            <td><code>created_at</code></td>
            <td>timestamp</td>
            <td>The payment creation date (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO
                8601</a>).</td>
            <td>2022-05-09T20:46:54.786342Z</td>
          </tr>
          <tr>
            <td><code>currency</code></td>
            <td>enum</td>
            <td>The currency used to make the payment (MAX 3; MIN 3; <a href="/reference/country-reference">ISO
                4217</a>).</td>
            <td>COP</td>
          </tr>
          <tr>
            <td><code>customer_first_name</code></td>
            <td>string</td>
            <td>The customer's first name (MAX 255; MIN 1).</td>
            <td>John</td>
          </tr>
          <tr>
            <td><code>customer_id</code></td>
            <td>string</td>
            <td>The unique identifier of the customer (MAX 255; MIN 3).</td>
            <td>23456</td>
          </tr>
          <tr>
            <td><code>customer_last_name</code></td>
            <td>string</td>
            <td>The customer's last name (MAX 255; MIN 1).</td>
            <td>Doe</td>
          </tr>
          <tr>
            <td><code>customer_payer_phone_country_code</code></td>
            <td>number</td>
            <td>The customer's country code (MAX 3; MIN 2).</td>
            <td>52</td>
          </tr>
          <tr>
            <td><code>customer_payer_phone_number</code></td>
            <td>number</td>
            <td>The customer's phone number (MAX 255; MIN 1).</td>
            <td>3313873320</td>
          </tr>
          <tr>
            <td><code>date_of_birth</code></td>
            <td>date</td>
            <td>Date of birth of the individual.</td>
            <td>1985-07-28</td>
          </tr>
          <tr>
            <td><code>description</code></td>
            <td>string</td>
            <td>The description of the payment (MAX 255; MIN 3).</td>
            <td>Order1234</td>
          </tr>
          <tr>
            <td><code>device_fingerprint</code></td>
            <td>string</td>
            <td>Unique identifier for the device used in the transaction.</td>
            <td>df_987654321</td>
          </tr>
          <tr>
            <td><code>document_number</code></td>
            <td>string</td>
            <td>Document number of the individual.</td>
            <td>A98765432</td>
          </tr>
          <tr>
            <td><code>document_type</code></td>
            <td>enum</td>
            <td>Type of document (e.g., ID card, passport).</td>
            <td>ID</td>
          </tr>
          <tr>
            <td><code>email</code></td>
            <td>string</td>
            <td>The customer's e-mail (MAX 255; MIN 3).</td>
            <td>john.doe@email.com</td>
          </tr>
          <tr>
            <td><code>gender</code></td>
            <td>enum</td>
            <td>Gender of the individual.</td>
            <td>Male</td>
          </tr>
          <tr>
            <td><code>installments</code></td>
            <td>number</td>
            <td>Number of installments for the payment.</td>
            <td>6</td>
          </tr>
          <tr>
            <td><code>ip_address</code></td>
            <td>string</td>
            <td>The customer's IP address (MAX 255; MIN 3).</td>
            <td>2806:103e:2a:414</td>
          </tr>
          <tr>
            <td><code>merchant_customer_id</code></td>
            <td>enum</td>
            <td>A unique identifier assigned by a merchant to represent a specific customer (MAX 255; MIN 3).</td>
            <td>9440127422</td>
          </tr>
          <tr>
            <td><code>merchant_order_id</code></td>
            <td>string</td>
            <td>The identification of the order (MAX 255; MIN 3).</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td><code>nationality</code></td>
            <td>string</td>
            <td>Nationality of the individual.</td>
            <td>US</td>
          </tr>
          <tr>
            <td><code>order_fee_amount</code></td>
            <td>number</td>
            <td>Total fees applied to the order.</td>
            <td>10</td>
          </tr>
          <tr>
            <td><code>order_item_brand</code></td>
            <td>string</td>
            <td>Brand of the item in the order.</td>
            <td>Nike</td>
          </tr>
          <tr>
            <td><code>order_item_category</code></td>
            <td>string</td>
            <td>Category of the item in the order.</td>
            <td>Shoes</td>
          </tr>
          <tr>
            <td><code>order_item_id</code></td>
            <td>string</td>
            <td>Unique identifier for the item in the order.</td>
            <td>item_12345</td>
          </tr>
          <tr>
            <td><code>order_item_manufacture_part_number</code></td>
            <td>string</td>
            <td>Manufacturer's part number for the item.</td>
            <td>MP56789</td>
          </tr>
          <tr>
            <td><code>order_item_name</code></td>
            <td>string</td>
            <td>Name of the item in the order.</td>
            <td>Air Max 2024</td>
          </tr>
          <tr>
            <td><code>order_item_quantity</code></td>
            <td>number</td>
            <td>Quantity of the item in the order.</td>
            <td>2</td>
          </tr>
          <tr>
            <td><code>order_item_sku_code</code></td>
            <td>string</td>
            <td>SKU code of the item in the order.</td>
            <td>SKU98765</td>
          </tr>
          <tr>
            <td><code>order_item_unit_amount</code></td>
            <td>number</td>
            <td>Unit price of the item.</td>
            <td>150</td>
          </tr>
          <tr>
            <td><code>order_shipping_amount</code></td>
            <td>number</td>
            <td>Shipping cost for the order.</td>
            <td>20</td>
          </tr>
          <tr>
            <td><code>payment_callback_url</code></td>
            <td>string</td>
            <td>A URL endpoint provided by the merchant.</td>
            <td>https://www.domain.com</td>
          </tr>
          <tr>
            <td><code>payment_id</code></td>
            <td>string</td>
            <td>A unique identifier assigned to a specific payment transaction.</td>
            <td>69ad0a39-b769-423c-b223-d7b8bf</td>
          </tr>
          <tr>
            <td><code>payment_seller_details_address_city</code></td>
            <td>string</td>
            <td>City of the seller's address.</td>
            <td>Miami</td>
          </tr>
          <tr>
            <td><code>payment_seller_details_address_country</code></td>
            <td>string</td>
            <td>Country of the seller's address.</td>
            <td>US</td>
          </tr>
          <tr>
            <td><code>payment_seller_details_address_line_1</code></td>
            <td>string</td>
            <td>First line of the seller's address.</td>
            <td>456 Market St</td>
          </tr>
          <tr>
            <td><code>payment_seller_details_address_line_2</code></td>
            <td>string</td>
            <td>Second line of the seller's address.</td>
            <td>Apt 202</td>
          </tr>
          <tr>
            <td><code>payment_seller_details_address_state</code></td>
            <td>string</td>
            <td>State or province of the seller's address.</td>
            <td>FL</td>
          </tr>
          <tr>
            <td><code>payment_seller_details_address_zip_code</code></td>
            <td>string</td>
            <td>Postal code of the seller's address.</td>
            <td>33101</td>
          </tr>
          <tr>
            <td><code>payment_seller_details_country</code></td>
            <td>string</td>
            <td>Country where the seller is based.</td>
            <td>US</td>
          </tr>
          <tr>
            <td><code>payment_seller_details_document_number</code></td>
            <td>string</td>
            <td>Document number of the seller.</td>
            <td>98765432</td>
          </tr>
          <tr>
            <td><code>payment_seller_details_document_type</code></td>
            <td>enum</td>
            <td>Type of document for the seller (e.g., ID, passport).</td>
            <td>ID</td>
          </tr>
          <tr>
            <td><code>payment_seller_details_email</code></td>
            <td>string</td>
            <td>Seller's email address.</td>
            <td>seller@domain.com</td>
          </tr>
          <tr>
            <td><code>payment_seller_details_industry</code></td>
            <td>string</td>
            <td>The industry to which the seller belongs.</td>
            <td>Retail</td>
          </tr>
          <tr>
            <td><code>payment_seller_details_name</code></td>
            <td>string</td>
            <td>Name of the seller.</td>
            <td>Best Store</td>
          </tr>
          <tr>
            <td><code>payment_seller_details_phone_code</code></td>
            <td>string</td>
            <td>Country code for the seller's phone number.</td>
            <td>1</td>
          </tr>
          <tr>
            <td><code>payment_seller_details_phone_number</code></td>
            <td>string</td>
            <td>Seller's phone number.</td>
            <td>123-456-7890</td>
          </tr>
          <tr>
            <td><code>payment_seller_details_reference</code></td>
            <td>string</td>
            <td>Internal reference for the seller.</td>
            <td>ref_789456</td>
          </tr>
          <tr>
            <td><code>payment_seller_details_web_site</code></td>
            <td>string</td>
            <td>Seller's website URL.</td>
            <td>www.domain.com</td>
          </tr>
          <tr>
            <td><code>payment_tax_base</code></td>
            <td>number</td>
            <td>Base amount used to calculate tax.</td>
            <td>100</td>
          </tr>
          <tr>
            <td><code>payment_tax_percentage</code></td>
            <td>number</td>
            <td>Percentage of tax applied to the transaction.</td>
            <td>10</td>
          </tr>
          <tr>
            <td><code>payment_tax_type</code></td>
            <td>string</td>
            <td>Type of tax applied (e.g., VAT, GST).</td>
            <td>VAT</td>
          </tr>
          <tr>
            <td><code>payment_tax_value</code></td>
            <td>number</td>
            <td>The calculated tax amount.</td>
            <td>10</td>
          </tr>
          <tr>
            <td><code>payment_workflow</code></td>
            <td>string</td>
            <td>Workflow used for the payment process.</td>
            <td>standard</td>
          </tr>
          <tr>
            <td><code>pnr</code></td>
            <td>string</td>
            <td>Passenger Name Record (PNR) reference.</td>
            <td></td>
          </tr>
          <tr>
            <td><code>provider_number</code></td>
            <td>integer</td>
            <td>The ticket's number.</td>
            <td>13141</td>
          </tr>
          <tr>
            <td><code>refunded</code></td>
            <td>number</td>
            <td>The payment amount that has been refunded.</td>
            <td>10000</td>
          </tr>
          <tr>
            <td><code>sdk_action_required</code></td>
            <td>boolean</td>
            <td>A boolean field that indicates whether additional action is needed from the customer or merchant.</td>
            <td>TRUE</td>
          </tr>
          <tr>
            <td><code>status</code></td>
            <td>enum</td>
            <td>The status of the payment (MAX 255; MIN 3).</td>
            <td>SUCCEEDED</td>
          </tr>
          <tr>
            <td><code>sub_status</code></td>
            <td>enum</td>
            <td>The substatus of the payment (MAX 255; MIN 3).</td>
            <td>APPROVED</td>
          </tr>
          <tr>
            <td><code>subscription_id</code></td>
            <td>string</td>
            <td>A unique identifier assigned to a recurring subscription or billing agreement.</td>
            <td>111aaa222</td>
          </tr>
          <tr>
            <td><code>updated_at</code></td>
            <td>timestamp</td>
            <td>The date and time of the last update for the payment.</td>
            <td>2022-05-15T20:46:54.786342Z</td>
          </tr>
        </tbody>
      </table>

    </div>
  </details>
</body>
`}</HTMLBlock>

## Transaction report

<HTMLBlock>{`
<body>
  <details class="table-card">
    <summary>
      <span class="table-call">Transaction report field details </span>
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
      <th>Parameter</th>
      <th>Type</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account_id</code></td>
      <td>string</td>
      <td>Unique identifier for the account (MAX 64; MIN 36).</td>
      <td>2c05976d-f696-497f-a309-6421883de48d</td>
    </tr>
    <tr>
      <td><code>account_integration_id</code></td>
      <td>string</td>
      <td>Unique identifier of the account integration (MAX 64; MIN 36).</td>
      <td>6a0f939c-0cd1-4350-acbc-b0cbdbee9739</td>
    </tr>
    <tr>
      <td><code>amount</code></td>
      <td>number</td>
      <td>Amount of the transaction (MAX 10000; MIN 0).</td>
      <td>887</td>
    </tr>
    <tr>
      <td><code>authorization_code</code></td>
      <td>string</td>
      <td>Authorization code for the transaction (MAX 6; MIN 6).</td>
      <td>161058</td>
    </tr>
    <tr>
      <td><code>bank_name</code></td>
      <td>string</td>
      <td>Name of the bank involved in the transaction (MAX 100; MIN 3).</td>
      <td>Bank ABC</td>
    </tr>
    <tr>
      <td><code>bank_transfer_account</code></td>
      <td>string</td>
      <td>Bank transfer account details (MAX 255; MIN 3).</td>
      <td>12345678901234567</td>
    </tr>
    <tr>
      <td><code>bank_transfer_account_2</code></td>
      <td>string</td>
      <td>Secondary bank transfer account details (MAX 255; MIN 3).</td>
      <td>76543210987654321</td>
    </tr>
    <tr>
      <td><code>bank_transfer_account_type</code></td>
      <td>enum</td>
      <td>Type of the bank transfer account (MAX 20; MIN 3).</td>
      <td>Checking</td>
    </tr>
    <tr>
      <td><code>bank_transfer_payment_instruction</code></td>
      <td>string</td>
      <td>Instructions for bank transfer payments (MAX 255; MIN 3).</td>
      <td>Payment to be completed within 48 hours.</td>
    </tr>
    <tr>
      <td><code>beneficiary_document</code></td>
      <td>string</td>
      <td>Document identifier of the beneficiary (MAX 20; MIN 5).</td>
      <td>123456789</td>
    </tr>
    <tr>
      <td><code>beneficiary_document_type</code></td>
      <td>enum</td>
      <td>Document type of the beneficiary (MAX 10; MIN 3).</td>
      <td>Passport</td>
    </tr>
    <tr>
      <td><code>beneficiary_name</code></td>
      <td>string</td>
      <td>Full name of the beneficiary (MAX 255; MIN 3).</td>
      <td>John Doe</td>
    </tr>
    <tr>
      <td><code>capture</code></td>
      <td>boolean</td>
      <td>Indicates if the transaction is captured.</td>
      <td>TRUE</td>
    </tr>
    <tr>
      <td><code>card_brand</code></td>
      <td>string</td>
      <td>Brand of the card used (MAX 50; MIN 2).</td>
      <td>VISA</td>
    </tr>
    <tr>
      <td><code>card_category</code></td>
      <td>string</td>
      <td>Category of the card used (MAX 50; MIN 2).</td>
      <td>CLASSIC</td>
    </tr>
    <tr>
      <td><code>card_holder_name</code></td>
      <td>string</td>
      <td>Name of the cardholder (MAX 255; MIN 3).</td>
      <td>Jane Doe</td>
    </tr>
    <tr>
      <td><code>card_iin</code></td>
      <td>string</td>
      <td>Issuer Identification Number (IIN) of the card (MAX 8; MIN 6).</td>
      <td>49296404</td>
    </tr>
    <tr>
      <td><code>card_issuer_code</code></td>
      <td>string</td>
      <td>Code of the card issuer (MAX 50; MIN 2).</td>
      <td>BCO001</td>
    </tr>
    <tr>
      <td><code>card_issuer_name</code></td>
      <td>string</td>
      <td>Name of the card issuer (MAX 100; MIN 3).</td>
      <td>Bank ABC</td>
    </tr>
    <tr>
      <td><code>card_lfd</code></td>
      <td>string</td>
      <td>Last four digits of the card number (MAX 4; MIN 4).</td>
      <td>1228</td>
    </tr>
    <tr>
      <td><code>card_number_length</code></td>
      <td>number</td>
      <td>Length of the card number (MAX 19; MIN 12).</td>
      <td>16</td>
    </tr>
    <tr>
      <td><code>card_security_code_length</code></td>
      <td>number</td>
      <td>Length of the card security code (MAX 4; MIN 3).</td>
      <td>3</td>
    </tr>
    <tr>
      <td><code>card_type</code></td>
      <td>enum</td>
      <td>Type of card used (CREDIT or DEBIT).</td>
      <td>CREDIT</td>
    </tr>
    <tr>
      <td><code>card_expiration_month</code></td>
      <td>number</td>
      <td>Card expiration month (MAX 2; MIN 1).</td>
      <td>10</td>
    </tr>
    <tr>
      <td><code>card_expiration_year</code></td>
      <td>number</td>
      <td>Card expiration year (MAX 2; MIN 2).</td>
      <td>10</td>
    </tr>
    <tr>
      <td><code>country</code></td>
      <td>enum</td>
      <td>Country where the transaction occurred (MAX 2; MIN 2).</td>
      <td>UY</td>
    </tr>
    <tr>
      <td><code>created_at</code></td>
      <td>timestamp</td>
      <td>Timestamp when the transaction was created (<a href="https://pt.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</td>
      <td>2024-09-11T23:16:06.602Z</td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td>enum</td>
      <td>Currency code for the transaction (MAX 3; MIN 3).</td>
      <td>UYU</td>
    </tr>
    <tr>
      <td><code>customer_first_name</code></td>
      <td>string</td>
      <td>First name of the customer (MAX 255; MIN 3).</td>
      <td>Jane</td>
    </tr>
    <tr>
      <td><code>customer_id</code></td>
      <td>string</td>
      <td>Unique identifier for the customer (MAX 64; MIN 36).</td>
      <td>f4c53557-a832-44e9 -94e4-0344f91e9d4f</td>
    </tr>
    <tr>
      <td><code>customer_last_name</code></td>
      <td>string</td>
      <td>Last name of the customer (MAX 255; MIN 3).</td>
      <td>Doe</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>string</td>
      <td>Description of the transaction (MAX 255; MIN 3).</td>
      <td>Merchant Ecommerce</td>
    </tr>
    <tr>
      <td><code>document_number</code></td>
      <td>string</td>
      <td>Document number of the customer (MAX 20; MIN 5).</td>
      <td>48054205</td>
    </tr>
    <tr>
      <td><code>document_type</code></td>
      <td>string</td>
      <td>Document type of the customer (MAX 10; MIN 2).</td>
      <td>CI</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>string</td>
      <td>Email address of the customer (MAX 255; MIN 3).</td>
      <td>example@email.com</td>
    </tr>
    <tr>
      <td><code>first_installments_deferral</code></td>
      <td>string</td>
      <td>Details of the first installment deferral (MAX 255; MIN 3).</td>
      <td>No deferral</td>
    </tr>
    <tr>
      <td><code>fraud_screening_provider_score</code></td>
      <td>number</td>
      <td>Fraud screening score provided by the fraud detection system (MAX 100; MIN 0).</td>
      <td>85</td>
    </tr>
    <tr>
      <td><code>installments</code></td>
      <td>number</td>
      <td>Number of installments for the transaction (MAX 24; MIN 1).</td>
      <td>1</td>
    </tr>
    <tr>
      <td><code>installments_amount</code></td>
      <td>number</td>
      <td>Total amount of installments (MAX 10000; MIN 0).</td>
      <td>887</td>
    </tr>
    <tr>
      <td><code>installments_type</code></td>
      <td>string</td>
      <td>Type of installments plan (MAX 50; MIN 3).</td>
      <td>Single payment</td>
    </tr>
    <tr>
      <td><code>merchant_order_id</code></td>
      <td>string</td>
      <td>Merchant's order identifier (MAX 64; MIN 36).</td>
      <td>NC2- 66e224a53fb722eaa0507579</td>
    </tr>
    <tr>
      <td><code>merchant_transaction_id</code></td>
      <td>string</td>
      <td>Merchant's transaction identifier (MAX 64; MIN 36).</td>
      <td>NC2- 66e224a53fb722eaa0507579</td>
    </tr>
    <tr>
      <td><code>nationality</code></td>
      <td>string</td>
      <td>Nationality of the customer (MAX 3; MIN 2).</td>
      <td>UY</td>
    </tr>
    <tr>
      <td><code>payment_id</code></td>
      <td>string</td>
      <td>Unique identifier for the payment (MAX 64; MIN 36).</td>
      <td>49b08cf9-c577-4451- a673-2dc1ae930200</td>
    </tr>
    <tr>
      <td><code>payment_link_fee_details</code></td>
      <td>string</td>
      <td>Details of any fees associated with the payment link (MAX 255; MIN 3).</td>
      <td>No additional fees</td>
    </tr>
    <tr>
      <td><code>payment_link_money_release_date</code></td>
      <td>timestamp</td>
      <td>Date when the money from the payment link will be released (<a href="https://pt.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</td>
      <td>2024-09-15</td>
    </tr>
    <tr>
      <td><code>payment_link_payment_method_detail</code></td>
      <td>string</td>
      <td>Details of the payment method used in the payment link (MAX 255; MIN 3).</td>
      <td>VISA Card ending in 1228</td>
    </tr>
    <tr>
      <td><code>payment_link_payment_method_id</code></td>
      <td>string</td>
      <td>Unique identifier for the payment method in the payment link (MAX 64; MIN 36).</td>
      <td>PLPMID123456</td>
    </tr>
    <tr>
      <td><code>payment_link_sponsor_id</code></td>
      <td>string</td>
      <td>Unique identifier for the sponsor of the payment link (MAX 64; MIN 36).</td>
      <td>PLS123456</td>
    </tr>
    <tr>
      <td><code>payment_method_category</code></td>
      <td>enum</td>
      <td>Category of the payment method (CARD, BANK_TRANSFER, etc.).</td>
      <td>CARD</td>
    </tr>
    <tr>
      <td><code>payment_method_type</code></td>
      <td>enum</td>
      <td>Type of payment method (CARD, BANK_TRANSFER, etc.).</td>
      <td>CARD</td>
    </tr>
    <tr>
      <td><code>pnr</code></td>
      <td>string</td>
      <td>Passenger Name Record if applicable (MAX 64; MIN 36).</td>
      <td>987654321</td>
    </tr>
    <tr>
      <td><code>provider_account_id</code></td>
      <td>string</td>
      <td>Provider's account identifier (MAX 64; MIN 36).</td>
      <td>699ec8d444</td>
    </tr>
    <tr>
      <td><code>provider_expiration_date</code></td>
      <td>timestamp</td>
      <td>Expiration date provided by the provider (<a href="https://pt.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</td>
      <td>2024-12-31</td>
    </tr>
    <tr>
      <td><code>provider_id</code></td>
      <td>string</td>
      <td>Unique identifier for the provider (MAX 64; MIN 36).</td>
      <td>PROVIDER ID</td>
    </tr>
    <tr>
      <td><code>provider_image</code></td>
      <td>string</td>
      <td>URL of the provider's image or logo (MAX 255; MIN 3).</td>
      <td>https://example.com/logo.png</td>
    </tr>
    <tr>
      <td><code>provider_number</code></td>
      <td>string</td>
      <td>Provider number (MAX 64; MIN 36).</td>
      <td>12345</td>
    </tr>
    <tr>
      <td><code>provider_response_code</code></td>
      <td>string</td>
      <td>Response code from the provider (MAX 255; MIN 3).</td>
      <td>200</td>
    </tr>
    <tr>
      <td><code>provider_response_message</code></td>
      <td>string</td>
      <td>Response message from the provider (MAX 255; MIN 3).</td>
      <td>The payment was paid.</td>
    </tr>
    <tr>
      <td><code>provider_status</code></td>
      <td>string</td>
      <td>Status of the payment at the provider (MAX 255; MIN 3).</td>
      <td>PAID</td>
    </tr>
    <tr>
      <td><code>provider_status_detail</code></td>
      <td>string</td>
      <td>Detailed status from the provider (MAX 255; MIN 3).</td>
      <td>Transaction completed successfully.</td>
    </tr>
    <tr>
      <td><code>provider_third_party_account_id</code></td>
      <td>string</td>
      <td>Third-party account ID associated with the provider (MAX 64; MIN 36).</td>
      <td>ACC123456</td>
    </tr>
    <tr>
      <td><code>provider_third_party_transaction_id</code></td>
      <td>string</td>
      <td>Third-party transaction ID associated with the provider (MAX 64; MIN 36).</td>
      <td>TID123456</td>
    </tr>
    <tr>
      <td><code>provider_transaction_id</code></td>
      <td>string</td>
      <td>Unique transaction identifier from the provider (MAX 64; MIN 36).</td>
      <td>T-51056-1e10f992-e5cf- 40bf-9eb6-8edc881de30b</td>
    </tr>
    <tr>
      <td><code>reason</code></td>
      <td>string</td>
      <td>Reason for the transaction (MAX 255; MIN 3).</td>
      <td>Merchant's order payment</td>
    </tr>
    <tr>
      <td><code>redirect_url</code></td>
      <td>string</td>
      <td>URL where the user will be redirected after payment (MAX 255; MIN 3).</td>
      <td>https://example.com/redirect-url</td>
    </tr>
    <tr>
      <td><code>refund_execution_origin</code></td>
      <td>string</td>
      <td>Origin of the refund execution (MAX 255; MIN 3).</td>
      <td>Customer Request</td>
    </tr>
    <tr>
      <td><code>refund_execution_user</code></td>
      <td>string</td>
      <td>User who executed the refund (MAX 255; MIN 3).</td>
      <td>RefundServiceAgent</td>
    </tr>
    <tr>
      <td><code>response_code</code></td>
      <td>string</td>
      <td>Response code from the system (MAX 255; MIN 3).</td>
      <td>200</td>
    </tr>
    <tr>
      <td><code>response_message</code></td>
      <td>string</td>
      <td>Response message from the system (MAX 255; MIN 3).</td>
      <td>Payment successful.</td>
    </tr>
    <tr>
      <td><code>retrieval_reference_number</code></td>
      <td>string</td>
      <td>Reference number for retrieving transaction details (MAX 255; MIN 3).</td>
      <td>1234567890</td>
    </tr>
    <tr>
      <td><code>soft_descriptor</code></td>
      <td>string</td>
      <td>The soft descriptor shown on the customer's bank statement (MAX 22; MIN 3).</td>
      <td>MERCHANT ECOMMERCE</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>enum</td>
      <td>Status of the transaction (MAX 50; MIN 2).</td>
      <td>PAID</td>
    </tr>
    <tr>
      <td><code>subscription_id</code></td>
      <td>string</td>
      <td>Unique identifier for a subscription associated with the transaction (MAX 64; MIN 36).</td>
      <td>SUB123456</td>
    </tr>
    <tr>
      <td><code>three_d_secure_cryptogram</code></td>
      <td>string</td>
      <td>Cryptogram data used in 3D Secure authentication (MAX 255; MIN 3).</td>
      <td>ABCDEFG12345</td>
    </tr>
    <tr>
      <td><code>three_d_secure_directory_server_transaction_id</code></td>
      <td>string</td>
      <td>Directory server transaction ID for 3D Secure authentication (MAX 255; MIN 3).</td>
      <td>3DSTID123456</td>
    </tr>
    <tr>
      <td><code>three_d_secure_electronic_commerce_indicator</code></td>
      <td>string</td>
      <td>Electronic commerce indicator for 3D Secure authentication (MAX 255; MIN 3).</td>
      <td>ECI05</td>
    </tr>
    <tr>
      <td><code>three_d_secure_setup_id</code></td>
      <td>string</td>
      <td>Setup ID for 3D Secure authentication (MAX 255; MIN 3).</td>
      <td>SETUP123456</td>
    </tr>
    <tr>
      <td><code>three_d_secure_transaction_id</code></td>
      <td>string</td>
      <td>Transaction ID for 3D Secure authentication (MAX 255; MIN 3).</td>
      <td>3DSTXID123456</td>
    </tr>
    <tr>
      <td><code>three_d_secure_version</code></td>
      <td>string</td>
      <td>Version of 3D Secure protocol used (MAX 255; MIN 3).</td>
      <td>2.1.0</td>
    </tr>
    <tr>
      <td><code>has_challenge</code></td>
      <td>boolean</td>
      <td>Indicates if the transaction has a challenge step (3D Secure).</td>
      <td>FALSE</td>
    </tr>
    <tr>
      <td><code>ticket_provider_barcode</code></td>
      <td>string</td>
      <td>Barcode provided by the ticket provider (MAX 255; MIN 3).</td>
      <td>123456789</td>
    </tr>
    <tr>
      <td><code>ticket_provider_format</code></td>
      <td>string</td>
      <td>Format of the ticket provided by the provider (MAX 255; MIN 3).</td>
      <td>PDF</td>
    </tr>
    <tr>
      <td><code>ticket_provider_logo</code></td>
      <td>string</td>
      <td>Logo of the ticket provider (MAX 255; MIN 3).</td>
      <td>https://example.com/logo.png</td>
    </tr>
    <tr>
      <td><code>token</code></td>
      <td>string</td>
      <td>Token generated for the transaction (MAX 255; MIN 3).</td>
      <td>fa476a40-854c-4e66 -9a98-55a68a6b88f4</td>
    </tr>
    <tr>
      <td><code>transaction_id</code></td>
      <td>string</td>
      <td>Unique identifier for the transaction (MAX 64; MIN 36).</td>
      <td>b04db1c6-b2c7-4765-a77e-953d284d080b</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>string</td>
      <td>Type of transaction (MAX 50; MIN 2).</td>
      <td>PURCHASE</td>
    </tr>
    <tr>
      <td><code>updated_at</code></td>
      <td>timestamp</td>
      <td>Timestamp when the transaction was last updated (<a href="https://pt.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</td>
      <td>2024-09-11T23:17:07.602Z</td>
    </tr>
    <tr>
      <td><code>vault_on_success</code></td>
      <td>boolean</td>
      <td>Indicates if vaulting should occur upon transaction success.</td>
      <td>FALSE</td>
    </tr>
    <tr>
      <td><code>vaulted_token</code></td>
      <td>string</td>
      <td>Token generated for a vaulted card (MAX 255; MIN 3).</td>
      <td>fa476a40-854c-4e66- 9a98-55a68a6b88f4</td>
    </tr>
    <tr>
      <td><code>verify</code></td>
      <td>boolean</td>
      <td>Indicates if verification was performed.</td>
      <td>FALSE</td>
    </tr>
    <tr>
      <td><code>wallet</code></td>
      <td>string</td>
      <td>Wallet associated with the transaction (MAX 255; MIN 3).</td>
      <td>Wallet ABC</td>
    </tr>
    <tr>
      <td><code>acquirer</code></td>
      <td>string</td>
      <td>Name of the acquirer that processed the transaction (MAX 255; MIN 3).</td>
      <td>Acquirer ABC</td>
    </tr>
  </tbody>
</table>

    </div>
  </details>
</body>
`}</HTMLBlock>

## Transaction reconciliation report

<HTMLBlock>{`
<body>
  <details class="table-card">
    <summary>
      <span class="table-call">Transaction reconciliation report field details </span>
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
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>account_id</code></td>
            <td>string</td>
            <td>The unique identifier of the account (MAX 64; MIN 36).</td>
            <td>64143128-dd12-11ec-9d64-0242ac120002</td>
          </tr>
          <tr>
            <td><code>country</code></td>
            <td>enum</td>
            <td>The country where the transaction must be processed (MAX 2; MIN 2; ISO 3166-1).</td>
            <td>US</td>
          </tr>
          <tr>
            <td><code>type</code></td>
            <td>enum</td>
            <td>The transaction type (MAX 255; MIN 3).</td>
            <td>PURCHASE</td>
          </tr>
          <tr>
            <td><code>payment_method_category</code></td>
            <td>enum</td>
            <td>Category of the transaction (MAX 255; MIN 3).</td>
            <td>BANK_TRANSFER</td>
          </tr>
          <tr>
            <td><code>payment_method_type</code></td>
            <td>enum</td>
            <td>The type of payment method selected by the customer (MAX 255; MIN 3).</td>
            <td>BANKABC_TRANSFER</td>
          </tr>
          <tr>
            <td><code>provider_id</code></td>
            <td>enum</td>
            <td>The ID of the provider that processed the transaction.</td>
            <td>PROVIDER ID</td>
          </tr>
          <tr>
            <td><code>customer_id</code></td>
            <td>string</td>
            <td>The unique identifier of the customer (MAX 255; MIN 3).</td>
            <td>23456</td>
          </tr>
          <tr>
            <td><code>payment_id</code></td>
            <td>string</td>
            <td>The unique identifier of the payment (MAX 64; MIN 36).</td>
            <td>5104911d-5df9-229e-8468-bd41abea1</td>
          </tr>
          <tr>
            <td><code>merchant_order_id</code></td>
            <td>string</td>
            <td>Identification of the order assigned by your company (MAX 255; MIN 3).</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td><code>merchant_transaction_id</code></td>
            <td>string</td>
            <td>Identification of the transaction assigned by your company (MAX 255; MIN 3).</td>
            <td>987654321</td>
          </tr>
          <tr>
            <td><code>transaction_id</code></td>
            <td>string</td>
            <td>The unique identifier of the transaction assigned by Yuno (MAX 64; MIN 36).</td>
            <td>9104911d-5df9-429e-8488-ad41abea1a4b</td>
          </tr>
          <tr>
            <td><code>provider_transaction_id</code></td>
            <td>string</td>
            <td>The unique identifier of the transaction from the provider (MAX 255; MIN 3).</td>
            <td>53443e9c-dd17-11ec-9d64-0242ac120002</td>
          </tr>
          <tr>
            <td><code>status</code></td>
            <td>string</td>
            <td>The status of the transaction (MAX 255; MIN 3).</td>
            <td>SUCCEEDED</td>
          </tr>
          <tr>
            <td><code>response_code</code></td>
            <td>string</td>
            <td>The code that represents the response to the outcome of the transaction.</td>
            <td>SUCCEEDED</td>
          </tr>
          <tr>
            <td><code>provider_status</code></td>
            <td>string</td>
            <td>The transaction status from the provider (MAX 255; MIN 3).</td>
            <td>Authorised</td>
          </tr>
          <tr>
            <td><code>amount</code></td>
            <td>number</td>
            <td>The amount of the transaction.</td>
            <td>100</td>
          </tr>
          <tr>
            <td><code>local_amount</code><sup>(A)</sup></td>
            <td>decimal</td>
            <td>The corresponding amount for all transactions in settlement currency minus local retention and local tax
              (multiple of 0.0001).</td>
            <td>140.1</td>
          </tr>
          <tr>
            <td><code>local_retention</code><sup>(A)</sup></td>
            <td>decimal</td>
            <td>The corresponding amount for all transactions in settlement currency minus local amount and local tax
              (multiple of 0.0001).</td>
            <td>7.37</td>
          </tr>
          <tr>
            <td><code>local_tax</code><sup>(A)</sup></td>
            <td>decimal</td>
            <td>The corresponding amount for all transactions in settlement currency minus local retention and local
              amount (multiple of 0.0001).</td>
            <td>11.73</td>
          </tr>
          <tr>
            <td><code>provider_fees</code><sup>(A)</sup></td>
            <td>decimal</td>
            <td>The commission fee that was withheld by the acquirer on transactions in settlement currency (multiple of
              0.0001).</td>
            <td>3.53</td>
          </tr>
          <tr>
            <td><code>provider_fee_taxes</code><sup>(A)</sup></td>
            <td>decimal</td>
            <td>The commission fee tax that was withheld by the acquirer in settlement currency (multiple of 0.0001).
            </td>
            <td>0.78</td>
          </tr>
          <tr>
            <td><code>net_amount</code><sup>(A)</sup></td>
            <td>decimal</td>
            <td>The amount submitted in the credit transaction requests minus acquirer fees in settlement currency
              (multiple of 0.0001).</td>
            <td>135.79</td>
          </tr>
          <tr>
            <td><code>currency</code></td>
            <td>enum</td>
            <td>The currency used to make the payment (MAX 3; MIN 3; <a href="/reference/country-reference">ISO
                4217</a>).</td>
            <td>COP</td>
          </tr>
          <tr>
            <td><code>card_type</code></td>
            <td>string</td>
            <td>The type of the card's issuer (MAX 255; MIN 3).</td>
            <td>CREDIT</td>
          </tr>
           <tr>
            <td><code>card_expiration_month</code></td>
            <td>number</td>
            <td>Card expiration month (MAX 2; MIN 1).</td>
            <td>10</td>
          </tr>
          <tr>
            <td><code>card_expiration_year</code></td>
            <td>number</td>
            <td>Card expiration year (MAX 2; MIN 2).</td>
            <td>10</td>
          </tr>
          <tr>
            <td><code>card_brand</code></td>
            <td>string</td>
            <td>The card's brand information (MAX 255; MIN 3).</td>
            <td>VISA</td>
          </tr>
          <tr>
            <td><code>provider_card_brand</code></td>
            <td>string</td>
            <td>The payment method or card brand (MAX 255; MIN 3).</td>
            <td>ABC</td>
          </tr>
          <tr>
            <td><code>retrieval_reference_number</code></td>
            <td>string</td>
            <td>Unique reference number for transaction retrieval (MAX 255; MIN 3).</td>
            <td>CAQMCAQRisS2iL</td>
          </tr>
          <tr>
            <td><code>card_category</code></td>
            <td>enum</td>
            <td>Category of the card used in the transaction (MAX 255; MIN 3).</td>
            <td>CLASSIC</td>
          </tr>
          <tr>
            <td><code>card_iin</code></td>
            <td>number</td>
            <td>The issuer identification number (IIN) refers to the first few digits of a payment card number issued by
              a financial institution (MAX 8; MIN 8).</td>
            <td>123456</td>
          </tr>
          <tr>
            <td><code>card_lfd</code></td>
            <td>number</td>
            <td>Last four digits of the card (MAX 4; MIN 4).</td>
            <td>7890</td>
          </tr>
          <tr>
            <td><code>card_issuer_name</code></td>
            <td>enum</td>
            <td>Bank to which the card corresponds.</td>
            <td>Bank ABC</td>
          </tr>
          <tr>
            <td><code>card_issuer_country</code></td>
            <td>enum</td>
            <td>Country in which settlement was made (MAX 2; MIN 2).</td>
            <td>UY</td>
          </tr>
          <tr>
            <td><code>authorization_code</code></td>
            <td>string</td>
            <td>The acquirer's response code.</td>
            <td>742A64</td>
          </tr>
          <tr>
            <td><code>installments</code></td>
            <td>number</td>
            <td>In case of a card transaction, the number of installments in which the payment was requested (MAX 2; MIN
              1).</td>
            <td>1</td>
          </tr>
          <tr>
            <td><code>pnr</code></td>
            <td>string</td>
            <td>The passenger name record (MAX 255; MIN 3).</td>
            <td>1P-2UUGJW</td>
          </tr>
          <tr>
            <td><code>created_at</code></td>
            <td>timestamp</td>
            <td>Transaction creation date (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO
                8601</a>).</td>
            <td>2022-05-09T20:46:54.786342Z</td>
          </tr>
          <tr>
            <td><code>updated_at</code></td>
            <td>timestamp</td>
            <td>The date and time from the last time the transaction was updated.</td>
            <td>2022-05-15T20:46:54.786342Z</td>
          </tr>
          <tr>
            <td><code>estimated_settlement_date</code><sup>(A)</sup></td>
            <td>timestamp</td>
            <td>Estimated date by the acquirer in which the funds will be deposited in the merchant's bank account.</td>
            <td>2022-05-09</td>
          </tr>
          <tr>
            <td><code>reconciliation_status</code></td>
            <td>enum</td>
            <td>The reconciliation status of a transaction (MAX 255; MIN 3).</td>
            <td>RECONCILED</td>
          </tr>
          <tr>
            <td><code>reconciliation_sub_status</code></td>
            <td>enum</td>
            <td>The reconciliation substatus of a transaction (MAX 255; MIN 3).</td>
            <td>AUTOMATICALLY</td>
          </tr>
          <tr>
            <td><code>reconciliation_date</code></td>
            <td>string</td>
            <td>The date the transaction was reconciled (MAX 27; MIN 27; <a
                href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</td>
            <td>2022-05-09T20:46:54.786342Z</td>
          </tr>
          <tr>
            <td><code>reconciliation_id</code></td>
            <td>enum</td>
            <td>The unique identifier assigned to a transaction when it is reconciled (MAX 255; MIN 3).</td>
            <td>2478d494-4a20-45b1-8a12-1c2604cf2d1d</td>
          </tr>
          <tr>
            <td><code>reconciliation_settlement_date</code></td>
            <td>timestamp</td>
            <td>Date by the acquirer in which the funds will be deposited in the merchant's bank account.</td>
            <td>2022-05-09 0:00</td>
          </tr>
        </tbody>
      </table>


    </div>
  </details>
</body>
`}</HTMLBlock>

## Settlement report

The settlement report has two types of reports:

* **Header**: Shows the settlement summary.
* **Body**: shows the data of each header.

<HTMLBlock>{`
<body>
  <details class="table-card">
    <summary>
      <span class="table-call">Settlement report field details - Header </span>
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
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>type</code></td>
            <td>string</td>
            <td>Row type. Value: <code>HEADER</code> (MAX 255; MIN 3).</td>
            <td>HEADER</td>
          </tr>
          <tr>
            <td><code>acquirer</code></td>
            <td>enum</td>
            <td>Name of the acquirer that processed the original payment. In aggregator models, the provider is the same
              as the acquirer. In other models, they may be different entities (MAX 255; MIN 3).</td>
            <td>Acquirer ABC</td>
          </tr>
          <tr>
            <td><code>number_of_transactions</code></td>
            <td>number</td>
            <td>Total transactions contained in the report for the acquirer (MAX 255; MIN 1).</td>
            <td>15</td>
          </tr>
          <tr>
            <td><code>gross_currency</code></td>
            <td>enum</td>
            <td>Currency code in which transactions were made (MAX 3; MIN 3; ISO 4217).</td>
            <td>USD</td>
          </tr>
          <tr>
            <td><code>gross_credit</code></td>
            <td>decimal</td>
            <td>For credit transactions, the corresponding gross amount (multiple of 0.0001).</td>
            <td>1000.0</td>
          </tr>
          <tr>
            <td><code>gross_debit</code></td>
            <td>decimal</td>
            <td>For debit transactions, the corresponding gross amount (multiple of 0.0001).</td>
            <td>1000.0</td>
          </tr>
          <tr>
            <td><code>settlement_currency</code></td>
            <td>enum</td>
            <td>Currency code in which settlement was made (MAX 3; MIN 3; ISO 4217).</td>
            <td>USD</td>
          </tr>
          <tr>
            <td><code>settlement_gross_amount</code></td>
            <td>decimal</td>
            <td>The corresponding gross amount for all transactions in settlement currency (multiple of 0.0001).</td>
            <td>100.0</td>
          </tr>
          <tr>
            <td><code>settlement_credit_fees</code></td>
            <td>decimal</td>
            <td>Commission fee that was withheld by the acquirer on credit transactions in settlement currency. This
              should be the difference between the gross and net amounts (multiple of 0.0001).</td>
            <td>15.0</td>
          </tr>
          <tr>
            <td><code>settlement_debit_fees</code></td>
            <td>decimal</td>
            <td>Commission fee that was withheld by the acquirer on debit transactions in settlement currency. This
              should be the difference between the gross and net amounts (multiple of 0.0001).</td>
            <td>5.0</td>
          </tr>
          <tr>
            <td><code>settlement_fee_taxes</code></td>
            <td>decimal</td>
            <td>Commission fee tax that was withheld by the acquirer in settlement currency. This should be the
              difference between the gross and net amounts (multiple of 0.0001).</td>
            <td>0.10</td>
          </tr>
          <tr>
            <td><code>settlement_taxes</code></td>
            <td>decimal</td>
            <td>Value of taxes applied to the transactions in settlement currency. This should be the difference between
              the gross and net amounts (multiple of 0.0001).</td>
            <td>1.0</td>
          </tr>
          <tr>
            <td><code>settlement_cost_of_installments</code></td>
            <td>decimal</td>
            <td>Commission fee that the acquirer withheld for advance installments in settlement currency (multiple of
              0.0001). This should be the difference between the gross and net amounts.</td>
            <td>15.0</td>
          </tr>
          <tr>
            <td><code>settlement_net_credit</code></td>
            <td>decimal</td>
            <td>Amount submitted in the credit transaction requests minus acquirer fees in settlement currency (multiple
              of 0.0001).</td>
            <td>970.0</td>
          </tr>
          <tr>
            <td><code>settlement_net_debit</code></td>
            <td>decimal</td>
            <td>Amount submitted in the debit transaction requests minus acquirer fees in settlement currency (multiple
              of 0.0001).</td>
            <td>970.0</td>
          </tr>
          <tr>
            <td><code>settlement_net_balance</code></td>
            <td>decimal</td>
            <td>Net credit/debit amount in settlement currency (multiple of 0.0001).</td>
            <td>1000.0</td>
          </tr>
          <tr>
            <td><code>settlement_batch_id</code><sup>(A)</sup></td>
            <td>string</td>
            <td>This field contains the unique acquirer settlement batch number that you can find on your bank statement
              for the corresponding deposit (MAX 255; MIN 3).</td>
            <td>SETT-111450235000</td>
          </tr>
          <tr>
            <td><code>settlement_date</code><sup>(A)</sup></td>
            <td>date</td>
            <td>Estimated date by the acquirer on which the funds will be deposited in the merchant's bank account.</td>
            <td>2022-05-09</td>
          </tr>
          <tr>
            <td><code>country</code><sup>(A)</sup></td>
            <td>enum</td>
            <td>Country of the merchant account (ISO 3166-1).</td>
            <td>US</td>
          </tr>
        </tbody>
      </table>

    </div>
  </details>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<body>
  <details class="table-card">
    <summary>
      <span class="table-call">Settlement report field details - Body </span>
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
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>account_id</code><sup>(A)</sup></td>
            <td>string</td>
            <td>The merchant account ID (MAX 64; MIN 36).</td>
            <td>64143128-dd12-11ec-9d64-0242ac120002</td>
          </tr>
          <tr>
            <td><code>provider_merchant_id</code><sup>(A)</sup></td>
            <td>string</td>
            <td>Merchant ID in the PSP system (MAX 255; MIN 3).</td>
            <td>15a8c304-d334-4da7-bccb-09cf85a1d7a6</td>
          </tr>
          <tr>
            <td><code>country</code><sup>(A)</sup></td>
            <td>enum</td>
            <td>Country of the merchant account (<a href="/reference/country-reference">ISO 3166-1</a>).</td>
            <td>US</td>
          </tr>
          <tr>
            <td><code>settlement_batch_id</code><sup>(A)</sup></td>
            <td>string</td>
            <td>This field contains the unique acquirer settlement batch number that you can find on your bank statement
              for the corresponding deposit (MAX 255; MIN 3).</td>
            <td>SETT-111450235000</td>
          </tr>
          <tr>
            <td><code>settlement_date</code><sup>(A)</sup></td>
            <td>date</td>
            <td>Estimated date by the acquirer when the funds will be deposited into the merchant's bank account.</td>
            <td>2022-05-09</td>
          </tr>
          <tr>
            <td><code>payment_method_category</code></td>
            <td>enum</td>
            <td>Category of the transaction (MAX 255; MIN 3).</td>
            <td>BANK_TRANSFER</td>
          </tr>
          <tr>
            <td><code>payment_method_type</code></td>
            <td>enum</td>
            <td>The type of payment method selected by the customer (MAX 255; MIN 3).</td>
            <td>BANKABC_TRANSFER</td>
          </tr>
          <tr>
            <td><code>provider_id</code></td>
            <td>enum</td>
            <td>Identification of the provider (MAX 255; MIN 3).</td>
            <td>PROVIDER ID</td>
          </tr>
          <tr>
            <td><code>acquirer</code></td>
            <td>enum</td>
            <td>Name of the acquirer that processed the original payment. In aggregator models, the provider is the same
              as the acquirer. In other models, they may be different entities (MAX 255; MIN 3).</td>
            <td>Acquirer ABC</td>
          </tr>
          <tr>
            <td><code>payment_id</code></td>
            <td>string</td>
            <td>The unique identifier of the payment (MAX 64; MIN 36).</td>
            <td>5104911d-5df9-229e-8468-bd41abea1</td>
          </tr>
          <tr>
            <td><code>merchant_order_id</code><sup>(A)</sup></td>
            <td>string</td>
            <td>Identification of the order (MAX 255; MIN 3).</td>
            <td>abc123456789</td>
          </tr>
          <tr>
            <td><code>merchant_transaction_id</code></td>
            <td>string</td>
            <td>Identification of the transaction assigned by the merchant (MAX 255; MIN 3).</td>
            <td>987654321</td>
          </tr>
          <tr>
            <td><code>transaction_id</code><sup>(A)</sup></td>
            <td>string</td>
            <td>The unique identifier of the transaction assigned by Yuno (MAX 64; MIN 36).</td>
            <td>9104911d-5df9-429e-8488-ad41abea1a4b</td>
          </tr>
          <tr>
            <td><code>provider_transaction_id</code><sup>(A)</sup></td>
            <td>string</td>
            <td>The unique identifier of the transaction assigned by the gateway. This field is empty if the gateway
              doesn't provide transaction information (MAX 255; MIN 3).</td>
            <td>53443e9c-dd17-11ec-9d64-0242ac120002</td>
          </tr>
          <tr>
            <td><code>transaction_date</code></td>
            <td>timestamp</td>
            <td>Transaction creation date (MAX 27; MIN 27)</td>
            <td>2022-05-09 20:46:54.000</td>
          </tr>
          <tr>
            <td><code>type</code></td>
            <td>string</td>
            <td>The transaction type. We display the types sent by the provider (MAX 255; MIN 3).</td>
            <td>PURCHASE</td>
          </tr>
          <tr>
            <td><code>gross_currency</code></td>
            <td>enum</td>
            <td>Currency code in which the transaction was made (MAX 3; MIN 3; <a
                href="/reference/country-reference">ISO 4217</a>).</td>
            <td>USD</td>
          </tr>
          <tr>
            <td><code>gross_credit</code></td>
            <td>decimal</td>
            <td>For credit transactions, the corresponding gross amount (multiple of 0.0001).</td>
            <td>1000.0</td>
          </tr>
          <tr>
            <td><code>gross_debit</code></td>
            <td>decimal</td>
            <td>For debit transactions, the corresponding gross amount (multiple of 0.0001).</td>
            <td>1000.0</td>
          </tr>
          <tr>
            <td><code>fee_rate</code><sup>(A)</sup></td>
            <td>decimal</td>
            <td>Percentage value of the fee retained by the acquirer. This field is empty if the acquirer doesn't
              provide transaction information.</td>
            <td>15</td>
          </tr>
          <tr>
            <td><code>settlement_currency</code></td>
            <td>enum</td>
            <td>Currency code in which settlement was made (MAX 3; MIN 3; <a href="/reference/country-reference">ISO
                4217</a>).</td>
            <td>USD</td>
          </tr>
          <tr>
            <td><code>fx_rate</code></td>
            <td>decimal</td>
            <td>The exchange rate applied to the transaction at the time of settlement (multiple of 0.0001).</td>
            <td>10</td>
          </tr>
          <tr>
            <td><code>settlement_gross_amount</code></td>
            <td>decimal</td>
            <td>The corresponding gross amount for all transactions in settlement currency (multiple of 0.0001).</td>
            <td>100.0</td>
          </tr>
          <tr>
            <td><code>settlement_fees</code></td>
            <td>decimal</td>
            <td>The commission fee that was withheld by the acquirer on transactions in settlement currency. This should
              be the difference between the gross and net amounts (multiple of 0.0001).</td>
            <td>15.0</td>
          </tr>
          <tr>
            <td><code>settlement_fee_taxes</code></td>
            <td>decimal</td>
            <td>The commission fee tax that was withheld by the acquirer in settlement currency. This should be the
              difference between the gross and net amounts (multiple of 0.0001).</td>
            <td>0.10</td>
          </tr>
          <tr>
            <td><code>settlement_taxes</code></td>
            <td>decimal</td>
            <td>The value of taxes applied to the transactions in settlement currency. This should be the difference
              between the gross and net amounts (multiple of 0.0001).</td>
            <td>1.0</td>
          </tr>
          <tr>
            <td><code>cost_of_installments_rate</code><sup>(A)</sup></td>
            <td>decimal</td>
            <td>In case of processing sales in installments, the percentage financing cost rate retained by the
              acquirer. This field is empty if the acquirer doesn't provide transaction information.</td>
            <td>15</td>
          </tr>
          <tr>
            <td><code>settlement_cost_of_installments</code></td>
            <td>decimal</td>
            <td>The commission fee that was withheld by the acquirer for advance installments in settlement currency
              (multiple of 0.0001). This should be the difference between the gross and net amounts.</td>
            <td>15.0</td>
          </tr>
          <tr>
            <td><code>settlement_net_credit</code></td>
            <td>decimal</td>
            <td>The amount submitted in the credit transaction requests minus acquirer fees in settlement currency
              (multiple of 0.0001).</td>
            <td>970.0</td>
          </tr>
          <tr>
            <td><code>settlement_net_debit</code></td>
            <td>decimal</td>
            <td>The amount submitted in the debit transaction requests minus acquirer fees in settlement currency
              (multiple of 0.0001).</td>
            <td>970.0</td>
          </tr>
          <tr>
              <td><code>settlement_net_amount</code></td>
              <td>decimal</td>
              <td>The corresponding net amount for all transactions in settlement currency (multiple of 0.0001).</td>
              <td>100.0</td>
          </tr>
          <tr>
            <td><code>card_type</code></td>
            <td>enum</td>
            <td>Type of card used in the transaction (MAX 7; MIN 5).</td>
            <td>CREDIT</td>
          </tr>
          <tr>
            <td><code>card_brand</code></td>
            <td>enum</td>
            <td>Brand of the card used in the transaction (MAX 255; MIN 3).</td>
            <td>VISA</td>
          </tr>
          <tr>
            <td><code>card_category</code></td>
            <td>enum</td>
            <td>Category of the card used in the transaction (MAX 255; MIN 3).</td>
            <td>premium</td>
          </tr>
          <tr>
            <td><code>card_iin</code><sup>(A)</sup></td>
            <td>number</td>
            <td>The issuer identification number (IIN) refers to the first few digits of a payment card number issued by
              a financial institution (MAX 8; MIN 8).</td>
            <td>123456</td>
          </tr>
          <tr>
            <td><code>card_lfd</code><sup>(A)</sup></td>
            <td>number</td>
            <td>Last four digits of the card (MAX 4; MIN 4).</td>
            <td>7890</td>
          </tr>
          <tr>
            <td><code>authorization_code</code><sup>(A)</sup></td>
            <td>string</td>
            <td>In case of a card transaction, the code assigned by the issuing bank to the transaction when it is
              authorized. This field is empty if the gateway doesn't provide transaction information (MAX 255; MIN 3).
            </td>
            <td>123456</td>
          </tr>
          <tr>
            <td><code>customer_id</code><sup>(A)</sup></td>
            <td>string</td>
            <td>The unique identifier of the customer (MAX 255; MIN 3).</td>
            <td>23456</td>
          </tr>
          <tr>
            <td><code>voucher</code><sup>(A)</sup></td>
            <td>string</td>
            <td>In case of a card transaction, the unique identifier of the payment receipt assigned by the issuing
              bank. This field is empty if the gateway doesn't provide transaction information (MAX 255; MIN 3).</td>
            <td>43564</td>
          </tr>
          <tr>
            <td><code>installments</code></td>
            <td>number</td>
            <td>In case of a card transaction, the number of installments in which the payment was requested (MAX 2; MIN
              1).</td>
            <td>1</td>
          </tr>
          <tr>
            <td><code>installment_number</code><sup>(A)</sup></td>
            <td>string</td>
            <td>In case of a card transaction in installments, the installment number that is being settled in this
              batch. If the installment payment is made in a single batch, the field is empty (MAX 6; MIN 3).</td>
            <td>1/3</td>
          </tr>
          <tr>
            <td><code>pnr</code></td>
            <td>string</td>
            <td>The passenger name record (MAX 255; MIN 3).</td>
            <td>1P-2UUGJW</td>
          </tr>
          <tr>
            <td><code>reconciliation</code></td>
            <td>struct</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td><code>reconciliation_status</code></td>
            <td>enum</td>
            <td>The reconciliation status of a transaction (MAX 255; MIN 3).</td>
            <td>RECONCILED</td>
          </tr>
          <tr>
            <td><code>reconciliation_sub_status</code></td>
            <td>enum</td>
            <td>The reconciliation substatus of a transaction (MAX 255; MIN 3).</td>
            <td>AUTOMATICALLY</td>
          </tr>
          <tr>
            <td><code>reconciliation_date</code></td>
            <td>date</td>
            <td>The date the transaction was reconciled (MAX 27; MIN 27).</td>
            <td>2022-05-09 20:46:54.000</td>
          </tr>
          <tr>
            <td><code>reconciliation_id</code></td>
            <td>string</td>
            <td>The unique identifier assigned to a transaction when it is reconciled (MAX 255; MIN 3).</td>
            <td>2478d494-4a20-45b1-8a12-1c2604cf2d1d</td>
          </tr>
          <tr>
            <td><code>legal_entity</code></td>
            <td>string</td>
            <td>The legal entity of the merchant (MAX 255; MIN 3).</td>
            <td>Legal Entity ABC</td>
          </tr>
          <tr>
            <td><code>provider_merchant_account_name</code></td>
            <td>string</td>
            <td>Name of the merchant account assigned by the payment provider.</td>
            <td>Merchant account ABC</td>
          </tr>
          <tr>
            <td><code>local_amount</code><sup>(A)</sup></td>
            <td>decimal</td>
            <td>The corresponding gross amount for all transactions in settlement currency plus local taxes and
              retention (multiple of 0.0001).</td>
            <td>263.09</td>
          </tr>
          <tr>
            <td><code>provider_fees</code><sup>(A)</sup></td>
            <td>decimal</td>
            <td>The commission fee that was withheld by the acquirer on transactions in settlement currency. This should
              be the difference between the gross and net amounts but with the opposite sign (multiple of 0.0001).</td>
            <td>5.53</td>
          </tr>
          <tr>
            <td><code>provider_fee_taxes</code><sup>(A)</sup></td>
            <td>decimal</td>
            <td>The commission fee tax that was withheld by the acquirer in settlement currency. This should be the
              difference between the gross and net amounts but with the opposite sign (multiple of 0.0001).</td>
            <td>1.22</td>
          </tr>
          <tr>
            <td><code>net_amount</code><sup>(A)</sup></td>
            <td>decimal</td>
            <td>The amount submitted in the credit transaction requests minus acquirer fees in settlement currency
              (multiple of 0.0001).</td>
            <td>256.35</td>
          </tr>
          <tr>
            <td><code>local_retention</code><sup>(A)</sup></td>
            <td>decimal</td>
            <td>The local amount minus the corresponding gross amount for all transactions in settlement currency minus
              the local tax (multiple of 0.0001).</td>
            <td>13.84</td>
          </tr>
          <tr>
            <td><code>local_tax</code><sup>(A)</sup></td>
            <td>decimal</td>
            <td>The local amount minus the corresponding gross amount for all transactions in settlement currency minus
              the local retention (multiple of 0.0001).</td>
            <td>22.04</td>
          </tr>
          <tr>
            <td><code>estimated_settlement_date</code><sup>(A)</sup></td>
            <td>date</td>
            <td>Estimated date by the acquirer when the funds will be deposited in the merchant's bank account.</td>
            <td>2022-05-09</td>
          </tr>
          <tr>
            <td><code>description</code><sup>(A)</sup></td>
            <td>enum</td>
            <td>Description of the merchant.</td>
            <td>Merchant Ecommerce</td>
          </tr>
          <tr>
              <td><code>event_type</code></td>
              <td>string</td>
              <td>Type of the movement 1- Settlement</td>
              <td>1</td>
          </tr>
          <tr>
              <td><code>adjustment_type</code></td>
              <td>string</td>
              <td>Adjustment code informed by the provider.</td>
              <td>12</td>
          </tr>
          <tr>
              <td><code>bank_account</code></td>
              <td>string</td>
              <td>Bank details of the institution where the merchant received the settlement amount.</td>
              <td>12345-6</td>
          </tr>
          <tr>
              <td><code>bank_agency</code></td>
              <td>string</td>
              <td>Bank details of the institution where the merchant received the settlement amount.</td>
              <td>012</td>
          </tr>
          <tr>
              <td><code>bank</code></td>
              <td>string</td>
              <td>Bank details of the institution where the merchant received the settlement amount.</td>
              <td>123</td>
          </tr>
        </tbody>
      </table>

    </div>
  </details>
</body>
`}</HTMLBlock>

<b>(A)</b> The availability of this data field depends on whether the processor or acquirer provides the information. If Yuno can identify the transaction, it will display the data; otherwise, the field may be empty.

## Communications report

The communications report provides detailed information about all communications (calls, messages) between customers and the merchant through Yuno's communication channels. This report includes data about call durations, message content, communication status, and other relevant metrics.

<HTMLBlock>{`
<div class="table-div">
  <table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Type</th>
        <th>Description</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>communication_id</code></td>
        <td>string</td>
        <td>Unique identifier for the communication.</td>
        <td>64143128-dd12-11ec-9d64-0242ac120002</td>
      </tr>
      <tr>
        <td><code>order_id</code></td>
        <td>string</td>
        <td>Identifier of the order associated with the communication.</td>
        <td>64143128-dd12-11ec-9d64-0242ac120003</td>
      </tr>
      <tr>
        <td><code>payment_id</code></td>
        <td>string</td>
        <td>Identifier of the payment associated with the communication.</td>
        <td>64143128-dd12-11ec-9d64-0242ac120004</td>
      </tr>
      <tr>
        <td><code>communication_status</code></td>
        <td>enum</td>
        <td>Current status of the communication.</td>
        <td>COMPLETED</td>
      </tr>
      <tr>
        <td><code>destination_phone</code></td>
        <td>string</td>
        <td>Phone number where the communication was sent.</td>
        <td>+1234567890</td>
      </tr>
      <tr>
        <td><code>created_at</code></td>
        <td>datetime</td>
        <td>Date and time when the communication was initiated.</td>
        <td>2024-03-15 14:30:00</td>
      </tr>
      <tr>
        <td><code>country</code></td>
        <td>string</td>
        <td>Country code where the communication was sent (ISO 3166-1 alpha-2).</td>
        <td>US</td>
      </tr>
      <tr>
        <td><code>transcription</code></td>
        <td>string</td>
        <td>Text transcription of the communication content.</td>
        <td>Customer confirmed payment details...</td>
      </tr>
      <tr>
        <td><code>call_duration</code></td>
        <td>number</td>
        <td>Duration of the call in seconds.</td>
        <td>180</td>
      </tr>
      <tr>
        <td><code>messages</code></td>
        <td>array</td>
        <td>Array of messages exchanged during the communication.</td>
        <td>[{"content": "Hello", "timestamp": "2024-03-15 14:30:00"}]</td>
      </tr>
      <tr>
        <td><code>summary</code></td>
        <td>string</td>
        <td>Summary of the communication content.</td>
        <td>Payment verification call completed successfully</td>
      </tr>
      <tr>
        <td><code>channel</code></td>
        <td>enum</td>
        <td>Communication channel used (e.g., VOICE, SMS, WHATSAPP).</td>
        <td>VOICE</td>
      </tr>
      <tr>
        <td><code>focus</code></td>
        <td>string</td>
        <td>Main topic or focus of the communication.</td>
        <td>Payment Verification</td>
      </tr>
    </tbody>
  </table>
</div>
`}</HTMLBlock>

## Fraud Transactions report

The fraud transactions report provides detailed information about transactions that have been flagged for potential fraud by Yuno's fraud detection systems. This report includes fraud scores, provider responses, and transaction details for risk analysis.

<HTMLBlock>{`
<body>
  <details class="table-card">
    <summary>
      <span class="table-call">Fraud Transactions report field details </span>
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
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>account_id</code></td>
            <td>string</td>
            <td>Unique identifier for the account (MAX 64; MIN 36).</td>
            <td>64143128-dd12-11ec-9d64-0242ac120002</td>
          </tr>
          <tr>
            <td><code>country</code></td>
            <td>enum</td>
            <td>Country where the transaction occurred (MAX 2; MIN 2; ISO 3166-1).</td>
            <td>US</td>
          </tr>
          <tr>
            <td><code>payment_id</code></td>
            <td>string</td>
            <td>Unique identifier for the payment (MAX 64; MIN 36).</td>
            <td>69ad0a39-b769-423c-b223-d7b8bf</td>
          </tr>
          <tr>
            <td><code>transaction_id</code></td>
            <td>string</td>
            <td>Unique identifier for the transaction (MAX 64; MIN 36).</td>
            <td>b04db1c6-b2c7-4765-a77e-953d284d080b</td>
          </tr>
          <tr>
            <td><code>transaction_type</code></td>
            <td>enum</td>
            <td>Type of transaction (e.g., PURCHASE, REFUND).</td>
            <td>PURCHASE</td>
          </tr>
          <tr>
            <td><code>status</code></td>
            <td>enum</td>
            <td>Status of the transaction (MAX 255; MIN 3).</td>
            <td>SUCCEEDED</td>
          </tr>
          <tr>
            <td><code>provider_transaction_id</code></td>
            <td>string</td>
            <td>Transaction identifier from the provider (MAX 255; MIN 3).</td>
            <td>T-51056-1e10f992-e5cf-40bf-9eb6-8edc881de30b</td>
          </tr>
          <tr>
            <td><code>response_code</code></td>
            <td>string</td>
            <td>Response code from the system (MAX 255; MIN 3).</td>
            <td>200</td>
          </tr>
          <tr>
            <td><code>response_message</code></td>
            <td>string</td>
            <td>Response message from the system (MAX 255; MIN 3).</td>
            <td>Payment successful</td>
          </tr>
          <tr>
            <td><code>provider_id</code></td>
            <td>string</td>
            <td>Unique identifier for the provider (MAX 64; MIN 36).</td>
            <td>PROVIDER ID</td>
          </tr>
          <tr>
            <td><code>provider_score</code></td>
            <td>number</td>
            <td>Fraud risk score provided by the fraud detection system (MAX 100; MIN 0).</td>
            <td>85</td>
          </tr>
          <tr>
            <td><code>provider_third_party_account_id</code></td>
            <td>string</td>
            <td>Third-party account ID associated with the provider (MAX 64; MIN 36).</td>
            <td>ACC123456</td>
          </tr>
          <tr>
            <td><code>provider_account_id</code></td>
            <td>string</td>
            <td>Provider's account identifier (MAX 64; MIN 36).</td>
            <td>699ec8d444</td>
          </tr>
          <tr>
            <td><code>provider_status</code></td>
            <td>string</td>
            <td>Status of the payment at the provider (MAX 255; MIN 3).</td>
            <td>PAID</td>
          </tr>
          <tr>
            <td><code>provider_status_detail</code></td>
            <td>string</td>
            <td>Detailed status from the provider (MAX 255; MIN 3).</td>
            <td>Transaction completed successfully</td>
          </tr>
          <tr>
            <td><code>provider_response_message</code></td>
            <td>string</td>
            <td>Response message from the provider (MAX 255; MIN 3).</td>
            <td>The payment was paid</td>
          </tr>
          <tr>
            <td><code>created_at</code></td>
            <td>timestamp</td>
            <td>Timestamp when the transaction was created (ISO 8601).</td>
            <td>2024-09-11T23:16:06.602Z</td>
          </tr>
          <tr>
            <td><code>updated_at</code></td>
            <td>timestamp</td>
            <td>Timestamp when the transaction was last updated (ISO 8601).</td>
            <td>2024-09-11T23:17:07.602Z</td>
          </tr>
          <tr>
            <td><code>account_integration_id</code></td>
            <td>string</td>
            <td>Unique identifier of the account integration (MAX 64; MIN 36).</td>
            <td>6a0f939c-0cd1-4350-acbc-b0cbdbee9739</td>
          </tr>
          <tr>
            <td><code>provider_response_code</code></td>
            <td>string</td>
            <td>Response code from the provider (MAX 255; MIN 3).</td>
            <td>200</td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

## Payouts report

The payouts report provides detailed information about all payout transactions processed through Yuno. This report includes beneficiary details, withdrawal methods, payout status, and financial information for tracking and reconciliation purposes.

<HTMLBlock>{`
<body>
  <details class="table-card">
    <summary>
      <span class="table-call">Payouts report field details </span>
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
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>beneficiary_national_entity</code></td>
            <td>string</td>
            <td>National entity or organization of the beneficiary.</td>
            <td>Bank ABC</td>
          </tr>
          <tr>
            <td><code>payout_id</code></td>
            <td>string</td>
            <td>Unique identifier for the payout (MAX 64; MIN 36).</td>
            <td>69ad0a39-b769-423c-b223-d7b8bf</td>
          </tr>
          <tr>
            <td><code>beneficiary_legal_name</code></td>
            <td>string</td>
            <td>Legal name of the beneficiary (MAX 255; MIN 3).</td>
            <td>John Doe Corporation</td>
          </tr>
          <tr>
            <td><code>account_id</code></td>
            <td>string</td>
            <td>Unique identifier for the account (MAX 64; MIN 36).</td>
            <td>64143128-dd12-11ec-9d64-0242ac120002</td>
          </tr>
          <tr>
            <td><code>status</code></td>
            <td>enum</td>
            <td>Status of the payout (MAX 255; MIN 3).</td>
            <td>SUCCEEDED</td>
          </tr>
          <tr>
            <td><code>merchant_reference</code></td>
            <td>string</td>
            <td>Reference number assigned by the merchant (MAX 255; MIN 3).</td>
            <td>REF123456</td>
          </tr>
          <tr>
            <td><code>description</code></td>
            <td>string</td>
            <td>Description of the payout (MAX 255; MIN 3).</td>
            <td>Commission payment</td>
          </tr>
          <tr>
            <td><code>purpose</code></td>
            <td>string</td>
            <td>Purpose of the payout transaction.</td>
            <td>Commission</td>
          </tr>
          <tr>
            <td><code>country</code></td>
            <td>enum</td>
            <td>Country where the payout is processed (MAX 2; MIN 2; ISO 3166-1).</td>
            <td>US</td>
          </tr>
          <tr>
            <td><code>amount_value</code></td>
            <td>number</td>
            <td>The payout amount (multiple of 0.0001).</td>
            <td>100000</td>
          </tr>
          <tr>
            <td><code>currency</code></td>
            <td>enum</td>
            <td>The currency used for the payout (MAX 3; MIN 3; ISO 4217).</td>
            <td>USD</td>
          </tr>
          <tr>
            <td><code>merchant_beneficiary_id</code></td>
            <td>string</td>
            <td>Beneficiary identifier assigned by the merchant (MAX 255; MIN 3).</td>
            <td>BEN123456</td>
          </tr>
          <tr>
            <td><code>provider_id</code></td>
            <td>string</td>
            <td>Unique identifier for the provider (MAX 64; MIN 36).</td>
            <td>PROVIDER ID</td>
          </tr>
          <tr>
            <td><code>created_at</code></td>
            <td>timestamp</td>
            <td>Timestamp when the payout was created (ISO 8601).</td>
            <td>2024-09-11T23:16:06.602Z</td>
          </tr>
          <tr>
            <td><code>updated_at</code></td>
            <td>timestamp</td>
            <td>Timestamp when the payout was last updated (ISO 8601).</td>
            <td>2024-09-11T23:17:07.602Z</td>
          </tr>
          <tr>
            <td><code>beneficiary_first_name</code></td>
            <td>string</td>
            <td>First name of the beneficiary (MAX 255; MIN 3).</td>
            <td>John</td>
          </tr>
          <tr>
            <td><code>beneficiary_last_name</code></td>
            <td>string</td>
            <td>Last name of the beneficiary (MAX 255; MIN 3).</td>
            <td>Doe</td>
          </tr>
          <tr>
            <td><code>beneficiary_email</code></td>
            <td>string</td>
            <td>Email address of the beneficiary (MAX 255; MIN 3).</td>
            <td>john.doe@email.com</td>
          </tr>
          <tr>
            <td><code>beneficiary_country</code></td>
            <td>enum</td>
            <td>Country of residence of the beneficiary (MAX 2; MIN 2; ISO 3166-1).</td>
            <td>US</td>
          </tr>
          <tr>
            <td><code>beneficiary_date_of_birth</code></td>
            <td>date</td>
            <td>Date of birth of the beneficiary.</td>
            <td>1985-07-28</td>
          </tr>
          <tr>
            <td><code>beneficiary_document_number</code></td>
            <td>string</td>
            <td>Document number of the beneficiary (MAX 20; MIN 5).</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td><code>beneficiary_document_type</code></td>
            <td>enum</td>
            <td>Type of document for the beneficiary (MAX 10; MIN 3).</td>
            <td>PASSPORT</td>
          </tr>
          <tr>
            <td><code>beneficiary_phone_country_code</code></td>
            <td>string</td>
            <td>Country code for the beneficiary's phone number.</td>
            <td>1</td>
          </tr>
          <tr>
            <td><code>beneficiary_phone_number</code></td>
            <td>string</td>
            <td>Phone number of the beneficiary (MAX 255; MIN 3).</td>
            <td>555-1234</td>
          </tr>
          <tr>
            <td><code>beneficiary_address_line_1</code></td>
            <td>string</td>
            <td>First line of the beneficiary's address (MAX 255; MIN 3).</td>
            <td>123 Main St</td>
          </tr>
          <tr>
            <td><code>beneficiary_address_line_2</code></td>
            <td>string</td>
            <td>Second line of the beneficiary's address (MAX 255; MIN 3).</td>
            <td>Apt 202</td>
          </tr>
          <tr>
            <td><code>beneficiary_city</code></td>
            <td>string</td>
            <td>City of the beneficiary's address (MAX 255; MIN 3).</td>
            <td>New York</td>
          </tr>
          <tr>
            <td><code>beneficiary_state</code></td>
            <td>string</td>
            <td>State or province of the beneficiary's address (MAX 255; MIN 3).</td>
            <td>NY</td>
          </tr>
          <tr>
            <td><code>beneficiary_zip_code</code></td>
            <td>string</td>
            <td>Postal code of the beneficiary's address (MAX 255; MIN 3).</td>
            <td>10001</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_branch</code></td>
            <td>string</td>
            <td>Bank branch for the withdrawal method.</td>
            <td>Main Branch</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_branch_digit</code></td>
            <td>string</td>
            <td>Branch digit for the withdrawal method.</td>
            <td>1</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_account_number</code></td>
            <td>string</td>
            <td>Account number for the withdrawal method (MAX 255; MIN 3).</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_account_digit</code></td>
            <td>string</td>
            <td>Account digit for the withdrawal method.</td>
            <td>1</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_account_type</code></td>
            <td>enum</td>
            <td>Type of account for the withdrawal method (MAX 20; MIN 3).</td>
            <td>CHECKING</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_address_line_1</code></td>
            <td>string</td>
            <td>First line of the withdrawal method address (MAX 255; MIN 3).</td>
            <td>456 Bank St</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_address_line_2</code></td>
            <td>string</td>
            <td>Second line of the withdrawal method address (MAX 255; MIN 3).</td>
            <td>Suite 100</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_address_city</code></td>
            <td>string</td>
            <td>City of the withdrawal method address (MAX 255; MIN 3).</td>
            <td>Miami</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_state</code></td>
            <td>string</td>
            <td>State of the withdrawal method address (MAX 255; MIN 3).</td>
            <td>FL</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_zip_code</code></td>
            <td>string</td>
            <td>Postal code of the withdrawal method address (MAX 255; MIN 3).</td>
            <td>33101</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_email</code></td>
            <td>string</td>
            <td>Email address for the withdrawal method (MAX 255; MIN 3).</td>
            <td>withdrawal@bank.com</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_document_number</code></td>
            <td>string</td>
            <td>Document number for the withdrawal method (MAX 20; MIN 5).</td>
            <td>98765432</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_document_type</code></td>
            <td>enum</td>
            <td>Type of document for the withdrawal method (MAX 10; MIN 3).</td>
            <td>ID</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_phone_country_code</code></td>
            <td>string</td>
            <td>Country code for the withdrawal method phone number.</td>
            <td>1</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_phone_number</code></td>
            <td>string</td>
            <td>Phone number for the withdrawal method (MAX 255; MIN 3).</td>
            <td>123-456-7890</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_type</code></td>
            <td>enum</td>
            <td>Type of withdrawal method (MAX 50; MIN 3).</td>
            <td>BANK_TRANSFER</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_code</code></td>
            <td>string</td>
            <td>Code for the withdrawal method (MAX 50; MIN 3).</td>
            <td>BANKABC_TRANSFER</td>
          </tr>
          <tr>
            <td><code>withdrawal_method_country</code></td>
            <td>enum</td>
            <td>Country for the withdrawal method (MAX 2; MIN 2; ISO 3166-1).</td>
            <td>US</td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

## Fees report

The fees report provides detailed information about all fees and charges applied to transactions processed through Yuno. This report includes acquirer fees, taxes, calculated costs, and fee status information for financial analysis and reconciliation.

<HTMLBlock>{`
<body>
  <details class="table-card">
    <summary>
      <span class="table-call">Fees report field details </span>
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
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>transaction_id</code></td>
            <td>string</td>
            <td>Unique identifier for the transaction (MAX 64; MIN 36).</td>
            <td>b04db1c6-b2c7-4765-a77e-953d284d080b</td>
          </tr>
          <tr>
            <td><code>provider_transaction_id</code></td>
            <td>string</td>
            <td>Transaction identifier from the provider (MAX 255; MIN 3).</td>
            <td>T-51056-1e10f992-e5cf-40bf-9eb6-8edc881de30b</td>
          </tr>
          <tr>
            <td><code>acquirer_type</code></td>
            <td>enum</td>
            <td>Type of acquirer that processed the transaction.</td>
            <td>BANK</td>
          </tr>
          <tr>
            <td><code>acquirer_gross_amount</code></td>
            <td>decimal</td>
            <td>Gross amount processed by the acquirer (multiple of 0.0001).</td>
            <td>1000.00</td>
          </tr>
          <tr>
            <td><code>acquirer_real_amount</code></td>
            <td>decimal</td>
            <td>Real amount processed by the acquirer (multiple of 0.0001).</td>
            <td>1000.00</td>
          </tr>
          <tr>
            <td><code>acquirer_fees</code></td>
            <td>decimal</td>
            <td>Fees charged by the acquirer (multiple of 0.0001).</td>
            <td>15.00</td>
          </tr>
          <tr>
            <td><code>acquirer_taxes</code></td>
            <td>decimal</td>
            <td>Taxes applied by the acquirer (multiple of 0.0001).</td>
            <td>2.50</td>
          </tr>
          <tr>
            <td><code>country</code></td>
            <td>enum</td>
            <td>Country where the transaction occurred (MAX 2; MIN 2; ISO 3166-1).</td>
            <td>US</td>
          </tr>
          <tr>
            <td><code>type</code></td>
            <td>enum</td>
            <td>Type of transaction (e.g., PURCHASE, REFUND).</td>
            <td>PURCHASE</td>
          </tr>
          <tr>
            <td><code>gross_field</code></td>
            <td>decimal</td>
            <td>Gross field amount (multiple of 0.0001).</td>
            <td>1000.00</td>
          </tr>
          <tr>
            <td><code>fix_cost</code></td>
            <td>decimal</td>
            <td>Fixed cost applied to the transaction (multiple of 0.0001).</td>
            <td>5.00</td>
          </tr>
          <tr>
            <td><code>percentage_cost</code></td>
            <td>decimal</td>
            <td>Percentage cost applied to the transaction (multiple of 0.0001).</td>
            <td>10.00</td>
          </tr>
          <tr>
            <td><code>calculated_fix_costed_fee</code></td>
            <td>decimal</td>
            <td>Calculated fixed fee amount (multiple of 0.0001).</td>
            <td>5.00</td>
          </tr>
          <tr>
            <td><code>calculated_percentage_cost</code></td>
            <td>decimal</td>
            <td>Calculated percentage cost amount (multiple of 0.0001).</td>
            <td>10.00</td>
          </tr>
          <tr>
            <td><code>acquirer_net_amount</code></td>
            <td>decimal</td>
            <td>Net amount after acquirer fees and taxes (multiple of 0.0001).</td>
            <td>982.50</td>
          </tr>
          <tr>
            <td><code>calculated_net_amount</code></td>
            <td>decimal</td>
            <td>Calculated net amount (multiple of 0.0001).</td>
            <td>985.00</td>
          </tr>
          <tr>
            <td><code>fee_taxes_diff</code></td>
            <td>decimal</td>
            <td>Difference between fee taxes (multiple of 0.0001).</td>
            <td>2.50</td>
          </tr>
          <tr>
            <td><code>fee_status</code></td>
            <td>enum</td>
            <td>Status of the fee (MAX 255; MIN 3).</td>
            <td>APPLIED</td>
          </tr>
          <tr>
            <td><code>fee_sub_status</code></td>
            <td>enum</td>
            <td>Sub-status of the fee (MAX 255; MIN 3).</td>
            <td>PROCESSED</td>
          </tr>
          <tr>
            <td><code>acquirer</code></td>
            <td>string</td>
            <td>Name of the acquirer that processed the transaction (MAX 255; MIN 3).</td>
            <td>Acquirer ABC</td>
          </tr>
          <tr>
            <td><code>settlement_date</code></td>
            <td>date</td>
            <td>Date when the transaction was settled.</td>
            <td>2024-09-15</td>
          </tr>
          <tr>
            <td><code>currency</code></td>
            <td>enum</td>
            <td>The currency used for the transaction (MAX 3; MIN 3; ISO 4217).</td>
            <td>USD</td>
          </tr>
          <tr>
            <td><code>card_iin</code></td>
            <td>string</td>
            <td>Issuer Identification Number (IIN) for the card (first 6 digits).</td>
            <td>123456</td>
          </tr>
          <tr>
            <td><code>card_lfd</code></td>
            <td>number</td>
            <td>Last four digits of the card number.</td>
            <td>7890</td>
          </tr>
          <tr>
            <td><code>authorization_code</code></td>
            <td>string</td>
            <td>Authorization code for the transaction (MAX 6; MIN 6).</td>
            <td>161058</td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

## Agenda report

The agenda report provides detailed information about scheduled and planned transactions, including installment payments, advancement details, and reconciliation schedules. This report helps track transaction lifecycle and settlement planning.

<HTMLBlock>{`
<body>
  <details class="table-card">
    <summary>
      <span class="table-call">Agenda report field details </span>
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
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ur_key</code></td>
            <td>string</td>
            <td>Unique reference key for the agenda item.</td>
            <td>UR123456789</td>
          </tr>
          <tr>
            <td><code>country</code></td>
            <td>enum</td>
            <td>Country where the transaction occurred (MAX 2; MIN 2; ISO 3166-1).</td>
            <td>US</td>
          </tr>
          <tr>
            <td><code>type_transaction</code></td>
            <td>enum</td>
            <td>Type of transaction (e.g., PURCHASE, REFUND).</td>
            <td>PURCHASE</td>
          </tr>
          <tr>
            <td><code>payment_method_category</code></td>
            <td>enum</td>
            <td>Category of the payment method (CARD, BANK_TRANSFER, etc.).</td>
            <td>CARD</td>
          </tr>
          <tr>
            <td><code>payment_method_type</code></td>
            <td>enum</td>
            <td>Type of payment method (CARD, BANK_TRANSFER, etc.).</td>
            <td>CARD</td>
          </tr>
          <tr>
            <td><code>provider_id</code></td>
            <td>string</td>
            <td>Unique identifier for the provider (MAX 64; MIN 36).</td>
            <td>PROVIDER ID</td>
          </tr>
          <tr>
            <td><code>customer_id</code></td>
            <td>string</td>
            <td>Unique identifier for the customer (MAX 64; MIN 36).</td>
            <td>f4c53557-a832-44e9-94e4-0344f91e9d4f</td>
          </tr>
          <tr>
            <td><code>payment_id</code></td>
            <td>string</td>
            <td>Unique identifier for the payment (MAX 64; MIN 36).</td>
            <td>49b08cf9-c577-4451-a673-2dc1ae930200</td>
          </tr>
          <tr>
            <td><code>merchant_order_id</code></td>
            <td>string</td>
            <td>Merchant's order identifier (MAX 64; MIN 36).</td>
            <td>NC2-66e224a53fb722eaa0507579</td>
          </tr>
          <tr>
            <td><code>merchant_transaction_id</code></td>
            <td>string</td>
            <td>Merchant's transaction identifier (MAX 64; MIN 36).</td>
            <td>NC2-66e224a53fb722eaa0507579</td>
          </tr>
          <tr>
            <td><code>transaction_id</code></td>
            <td>string</td>
            <td>Unique identifier for the transaction (MAX 64; MIN 36).</td>
            <td>b04db1c6-b2c7-4765-a77e-953d284d080b</td>
          </tr>
          <tr>
            <td><code>provider_transaction_id</code></td>
            <td>string</td>
            <td>Transaction identifier from the provider (MAX 255; MIN 3).</td>
            <td>T-51056-1e10f992-e5cf-40bf-9eb6-8edc881de30b</td>
          </tr>
          <tr>
            <td><code>third_party_transaction_id</code></td>
            <td>string</td>
            <td>Third-party transaction identifier (MAX 255; MIN 3).</td>
            <td>TP123456789</td>
          </tr>
          <tr>
            <td><code>status_payment</code></td>
            <td>enum</td>
            <td>Status of the payment (MAX 255; MIN 3).</td>
            <td>SUCCEEDED</td>
          </tr>
          <tr>
            <td><code>response_code</code></td>
            <td>string</td>
            <td>Response code from the system (MAX 255; MIN 3).</td>
            <td>200</td>
          </tr>
          <tr>
            <td><code>provider_status</code></td>
            <td>string</td>
            <td>Status of the payment at the provider (MAX 255; MIN 3).</td>
            <td>PAID</td>
          </tr>
          <tr>
            <td><code>transaction_amount</code></td>
            <td>number</td>
            <td>Amount of the transaction (MAX 10000; MIN 0).</td>
            <td>887</td>
          </tr>
          <tr>
            <td><code>currency</code></td>
            <td>enum</td>
            <td>Currency code for the transaction (MAX 3; MIN 3; ISO 4217).</td>
            <td>USD</td>
          </tr>
          <tr>
            <td><code>card_type</code></td>
            <td>enum</td>
            <td>Type of card used (CREDIT or DEBIT).</td>
            <td>CREDIT</td>
          </tr>
          <tr>
            <td><code>card_brand</code></td>
            <td>string</td>
            <td>Brand of the card used (MAX 50; MIN 2).</td>
            <td>VISA</td>
          </tr>
          <tr>
            <td><code>card_iin</code></td>
            <td>string</td>
            <td>Issuer Identification Number (IIN) of the card (MAX 8; MIN 6).</td>
            <td>49296404</td>
          </tr>
          <tr>
            <td><code>card_lfd</code></td>
            <td>string</td>
            <td>Last four digits of the card number (MAX 4; MIN 4).</td>
            <td>1228</td>
          </tr>
          <tr>
            <td><code>authorization_code</code></td>
            <td>string</td>
            <td>Authorization code for the transaction (MAX 6; MIN 6).</td>
            <td>161058</td>
          </tr>
          <tr>
            <td><code>installments</code></td>
            <td>number</td>
            <td>Number of installments for the transaction (MAX 24; MIN 1).</td>
            <td>6</td>
          </tr>
          <tr>
            <td><code>installment_number</code></td>
            <td>string</td>
            <td>Current installment number (MAX 6; MIN 3).</td>
            <td>1/6</td>
          </tr>
          <tr>
            <td><code>installment_amount</code></td>
            <td>number</td>
            <td>Amount of the current installment (MAX 10000; MIN 0).</td>
            <td>147.83</td>
          </tr>
          <tr>
            <td><code>pnr</code></td>
            <td>string</td>
            <td>Passenger Name Record if applicable (MAX 64; MIN 36).</td>
            <td>987654321</td>
          </tr>
          <tr>
            <td><code>created_at</code></td>
            <td>timestamp</td>
            <td>Timestamp when the transaction was created (ISO 8601).</td>
            <td>2024-09-11T23:16:06.602Z</td>
          </tr>
          <tr>
            <td><code>updated_at</code></td>
            <td>timestamp</td>
            <td>Timestamp when the transaction was last updated (ISO 8601).</td>
            <td>2024-09-11T23:17:07.602Z</td>
          </tr>
          <tr>
            <td><code>agenda_status</code></td>
            <td>enum</td>
            <td>Status of the agenda item (MAX 255; MIN 3).</td>
            <td>SCHEDULED</td>
          </tr>
          <tr>
            <td><code>agenda_sub_status</code></td>
            <td>enum</td>
            <td>Sub-status of the agenda item (MAX 255; MIN 3).</td>
            <td>PENDING</td>
          </tr>
          <tr>
            <td><code>sales_reconciliation_date</code></td>
            <td>date</td>
            <td>Date when sales reconciliation is scheduled.</td>
            <td>2024-09-15</td>
          </tr>
          <tr>
            <td><code>provider_intended_settlement_date</code></td>
            <td>date</td>
            <td>Intended settlement date by the provider.</td>
            <td>2024-09-16</td>
          </tr>
          <tr>
            <td><code>provider_confirmation_date</code></td>
            <td>date</td>
            <td>Date when the provider confirmed the transaction.</td>
            <td>2024-09-12</td>
          </tr>
          <tr>
            <td><code>bank_account</code></td>
            <td>string</td>
            <td>Bank account details for the transaction.</td>
            <td>12345-6</td>
          </tr>
          <tr>
            <td><code>bank_agency</code></td>
            <td>string</td>
            <td>Bank agency details for the transaction.</td>
            <td>012</td>
          </tr>
          <tr>
            <td><code>bank</code></td>
            <td>string</td>
            <td>Bank details for the transaction.</td>
            <td>123</td>
          </tr>
          <tr>
            <td><code>advancement_amount</code></td>
            <td>decimal</td>
            <td>Amount advanced for the transaction (multiple of 0.0001).</td>
            <td>800.00</td>
          </tr>
          <tr>
            <td><code>provider_fees</code></td>
            <td>decimal</td>
            <td>Fees charged by the provider (multiple of 0.0001).</td>
            <td>15.00</td>
          </tr>
          <tr>
            <td><code>provider_taxes</code></td>
            <td>decimal</td>
            <td>Taxes applied by the provider (multiple of 0.0001).</td>
            <td>2.50</td>
          </tr>
          <tr>
            <td><code>pending_amount</code></td>
            <td>decimal</td>
            <td>Amount still pending for the transaction (multiple of 0.0001).</td>
            <td>69.50</td>
          </tr>
          <tr>
            <td><code>acquirer</code></td>
            <td>string</td>
            <td>Name of the acquirer that processed the transaction (MAX 255; MIN 3).</td>
            <td>Acquirer ABC</td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

## Sales Conciliation report

The sales conciliation report provides detailed information about sales transactions and their reconciliation status. This report includes transaction details, confirmation status, and provider information for sales tracking and reconciliation purposes.

<HTMLBlock>{`
<body>
  <details class="table-card">
    <summary>
      <span class="table-call">Sales Conciliation report field details </span>
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
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>transaction_id</code></td>
            <td>string</td>
            <td>Unique identifier for the transaction (MAX 64; MIN 36).</td>
            <td>b04db1c6-b2c7-4765-a77e-953d284d080b</td>
          </tr>
          <tr>
            <td><code>payment_method_category</code></td>
            <td>enum</td>
            <td>Category of the payment method (CARD, BANK_TRANSFER, etc.).</td>
            <td>CARD</td>
          </tr>
          <tr>
            <td><code>type</code></td>
            <td>enum</td>
            <td>Type of transaction (e.g., PURCHASE, REFUND).</td>
            <td>PURCHASE</td>
          </tr>
          <tr>
            <td><code>payment_method_type</code></td>
            <td>enum</td>
            <td>Type of payment method (CARD, BANK_TRANSFER, etc.).</td>
            <td>CARD</td>
          </tr>
          <tr>
            <td><code>provider_id</code></td>
            <td>string</td>
            <td>Unique identifier for the provider (MAX 64; MIN 36).</td>
            <td>PROVIDER ID</td>
          </tr>
          <tr>
            <td><code>status</code></td>
            <td>enum</td>
            <td>Status of the transaction (MAX 50; MIN 2).</td>
            <td>PAID</td>
          </tr>
          <tr>
            <td><code>response_code</code></td>
            <td>string</td>
            <td>Response code from the system (MAX 255; MIN 3).</td>
            <td>200</td>
          </tr>
          <tr>
            <td><code>amount</code></td>
            <td>number</td>
            <td>Amount of the transaction (MAX 10000; MIN 0).</td>
            <td>887</td>
          </tr>
          <tr>
            <td><code>created_at</code></td>
            <td>timestamp</td>
            <td>Timestamp when the transaction was created (ISO 8601).</td>
            <td>2024-09-11T23:16:06.602Z</td>
          </tr>
          <tr>
            <td><code>updated_at</code></td>
            <td>timestamp</td>
            <td>Timestamp when the transaction was last updated (ISO 8601).</td>
            <td>2024-09-11T23:17:07.602Z</td>
          </tr>
          <tr>
            <td><code>provider_status</code></td>
            <td>string</td>
            <td>Status of the payment at the provider (MAX 255; MIN 3).</td>
            <td>PAID</td>
          </tr>
          <tr>
            <td><code>merchant_transaction_id</code></td>
            <td>string</td>
            <td>Merchant's transaction identifier (MAX 64; MIN 36).</td>
            <td>NC2-66e224a53fb722eaa0507579</td>
          </tr>
          <tr>
            <td><code>provider_transaction_id</code></td>
            <td>string</td>
            <td>Transaction identifier from the provider (MAX 255; MIN 3).</td>
            <td>T-51056-1e10f992-e5cf-40bf-9eb6-8edc881de30b</td>
          </tr>
          <tr>
            <td><code>acquirer</code></td>
            <td>string</td>
            <td>Name of the acquirer that processed the transaction (MAX 255; MIN 3).</td>
            <td>Acquirer ABC</td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

## Advancements report

The advancements report provides detailed information about advance payments and financing operations processed through Yuno. This report includes negotiation details, UR (Unique Reference) information, and settlement account details for tracking advance payment operations.

<HTMLBlock>{`
<body>
  <details class="table-card">
    <summary>
      <span class="table-call">Advancements report field details </span>
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
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>operation_id</code></td>
            <td>string</td>
            <td>Unique identifier for the advancement operation (MAX 64; MIN 36).</td>
            <td>69ad0a39-b769-423c-b223-d7b8bf</td>
          </tr>
          <tr>
            <td><code>merchant_id</code></td>
            <td>string</td>
            <td>Unique identifier for the merchant (MAX 64; MIN 36).</td>
            <td>64143128-dd12-11ec-9d64-0242ac120002</td>
          </tr>
          <tr>
            <td><code>product_id</code></td>
            <td>string</td>
            <td>Unique identifier for the product (MAX 64; MIN 36).</td>
            <td>prod_123456789</td>
          </tr>
          <tr>
            <td><code>ur_key</code></td>
            <td>string</td>
            <td>Unique reference key for the advancement operation.</td>
            <td>UR123456789</td>
          </tr>
          <tr>
            <td><code>operation_type</code></td>
            <td>enum</td>
            <td>Type of advancement operation (e.g., ADVANCE, REFUND).</td>
            <td>ADVANCE</td>
          </tr>
          <tr>
            <td><code>movement_type</code></td>
            <td>enum</td>
            <td>Type of movement for the advancement (e.g., CREDIT, DEBIT).</td>
            <td>CREDIT</td>
          </tr>
          <tr>
            <td><code>operation_date</code></td>
            <td>date</td>
            <td>Date when the advancement operation was processed.</td>
            <td>2024-09-15</td>
          </tr>
          <tr>
            <td><code>operation_settlement_date</code></td>
            <td>date</td>
            <td>Date when the advancement operation was settled.</td>
            <td>2024-09-16</td>
          </tr>
          <tr>
            <td><code>ur_operation_date</code></td>
            <td>date</td>
            <td>Date of the UR operation.</td>
            <td>2024-09-15</td>
          </tr>
          <tr>
            <td><code>ur_original_settlement_date</code></td>
            <td>date</td>
            <td>Original settlement date for the UR operation.</td>
            <td>2024-09-20</td>
          </tr>
          <tr>
            <td><code>negotiation_gross_amount</code></td>
            <td>decimal</td>
            <td>Gross amount negotiated for the advancement (multiple of 0.0001).</td>
            <td>1000.00</td>
          </tr>
          <tr>
            <td><code>negotiation_fees</code></td>
            <td>decimal</td>
            <td>Fees charged for the negotiation (multiple of 0.0001).</td>
            <td>15.00</td>
          </tr>
          <tr>
            <td><code>negotiation_net_amount</code></td>
            <td>decimal</td>
            <td>Net amount after negotiation fees (multiple of 0.0001).</td>
            <td>985.00</td>
          </tr>
          <tr>
            <td><code>ur_gross_amount</code></td>
            <td>decimal</td>
            <td>Gross amount for the UR operation (multiple of 0.0001).</td>
            <td>1000.00</td>
          </tr>
          <tr>
            <td><code>ur_fees</code></td>
            <td>decimal</td>
            <td>Fees charged for the UR operation (multiple of 0.0001).</td>
            <td>10.00</td>
          </tr>
          <tr>
            <td><code>ur_net_amount</code></td>
            <td>decimal</td>
            <td>Net amount for the UR operation (multiple of 0.0001).</td>
            <td>990.00</td>
          </tr>
          <tr>
            <td><code>bank</code></td>
            <td>string</td>
            <td>Bank details for the advancement operation.</td>
            <td>123</td>
          </tr>
          <tr>
            <td><code>bank_agency</code></td>
            <td>string</td>
            <td>Bank agency details for the advancement operation.</td>
            <td>012</td>
          </tr>
          <tr>
            <td><code>bank_account</code></td>
            <td>string</td>
            <td>Bank account details for the advancement operation.</td>
            <td>12345-6</td>
          </tr>
          <tr>
            <td><code>country</code></td>
            <td>enum</td>
            <td>Country where the advancement operation occurred (MAX 2; MIN 2; ISO 3166-1).</td>
            <td>US</td>
          </tr>
          <tr>
            <td><code>settlement_account</code></td>
            <td>string</td>
            <td>Settlement account details for the advancement operation.</td>
            <td>SETTLE123456</td>
          </tr>
          <tr>
            <td><code>ur_currency</code></td>
            <td>enum</td>
            <td>Currency used for the UR operation (MAX 3; MIN 3; ISO 4217).</td>
            <td>USD</td>
          </tr>
          <tr>
            <td><code>acquirer</code></td>
            <td>string</td>
            <td>Name of the acquirer that processed the advancement (MAX 255; MIN 3).</td>
            <td>Acquirer ABC</td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>