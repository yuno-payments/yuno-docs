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

Yuno provides four report types: 

* [Payment](ref:reports-fields#payment-report)
* [Transaction ](ref:reports-fields#transaction-report)
* [Transaction reconciliation](ref:reports-fields#transaction-reconciliation-report)
* [Settlement](ref:reports-fields#settlement-report) 

Below you will find details of each report type. 

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
            <td>account_code</td>
            <td>string</td>
            <td>The unique identifier of the account (MAX 64; MIN 36).</td>
            <td>64143128-dd12-11ec-9d64-0242ac120002</td>
          </tr>
          <tr>
            <td>amount_value</td>
            <td>number</td>
            <td>The payment amount (multiple of 0.0001).</td>
            <td>111111</td>
          </tr>
          <tr>
            <td>authorization_code</td>
            <td>string</td>
            <td>The acquirer's response code.</td>
            <td>742A64</td>
          </tr>
          <tr>
            <td>bank_name</td>
            <td>string</td>
            <td>Name of the bank associated with the account (MAX 255; MIN 3).</td>
            <td>Banco Galicia</td>
          </tr>
          <tr>
            <td>beneficiary_name</td>
            <td>string</td>
            <td>The name of the account holder (MAX 255; MIN 3).</td>
            <td>John Doe</td>
          </tr>
          <tr>
            <td>captured</td>
            <td>number</td>
            <td>The payment amount that has been captured.</td>
            <td>10000.00</td>
          </tr>
          <tr>
            <td>card_brand</td>
            <td>string</td>
            <td>The card's brand information (MAX 255; MIN 3).</td>
            <td>VISA</td>
          </tr>
          <tr>
            <td>card_category</td>
            <td>string</td>
            <td>The category of the card's issuer (MAX 255; MIN 3).</td>
            <td>Gold</td>
          </tr>
          <tr>
            <td>card_holder_name</td>
            <td>string</td>
            <td>Card holder's full name as it appears on the card (MAX 26; MIN 3) - it is only available for PCI-certified merchants.</td>
            <td>Fannie Weissnat</td>
          </tr>
          <tr>
            <td>card_iin</td>
            <td>number</td>
            <td>The&nbsp;&nbsp;issuer identification number (IIN) refers to the first few digits of a&nbsp;&nbsp;payment card number issued by a financial institution (MAX 8; MIN 8).</td>
            <td>123456</td>
          </tr>
          <tr>
            <td>card_issuer_code</td>
            <td>integer</td>
            <td>The card's issuer identification code (MAX 255; MIN 3).</td>
            <td></td>
          </tr>
          <tr>
            <td>card_issuer_name</td>
            <td>string</td>
            <td>The card's issuer (MAX 255; MIN 3).</td>
            <td>Banco Galicia</td>
          </tr>
          <tr>
            <td>card_lfd</td>
            <td>number</td>
            <td>Last four digits of the card (MAX 4; MIN 4)</td>
            <td>7890</td>
          </tr>
          <tr>
            <td>card_type</td>
            <td>string</td>
            <td>The card issuer type (MAX 255; MIN 3).</td>
            <td>CREDIT</td>
          </tr>
          <tr>
            <td>country</td>
            <td>enum</td>
            <td>The country where the transaction must be processed (MAX 2; MIN 2; <a href="https://docs.y.uno/reference/country-reference">ISO 3166-1</a>).</td>
            <td>US</td>
          </tr>
          <tr>
            <td>created_at</td>
            <td>timestamp</td>
            <td>The payment creation date (MAX 27; MIN 27;<a href="https://en.wikipedia.org/wiki/ISO_8601"> ISO 8601</a>).</td>
            <td>2022-05-09T20:46:54.786342Z</td>
          </tr>
          <tr>
            <td>currency</td>
            <td>enum</td>
            <td>The currency used to make the payment (MAX 3; MIN 3;<a href="https://docs.y.uno/reference/country-reference"> ISO 4217</a>).</td>
            <td>COP</td>
          </tr>
          <tr>
            <td>customer_first_name</td>
            <td>string</td>
            <td>The customer's first name (MAX 255; MIN 1).</td>
            <td>John</td>
          </tr>
          <tr>
            <td>customer_id</td>
            <td>string</td>
            <td>The unique identifier of the customer (MAX 255; MIN 3).</td>
            <td>23456</td>
          </tr>
          <tr>
            <td>customer_last_name</td>
            <td>string</td>
            <td>The customer's last name (MAX 255; MIN 1).</td>
            <td>Doe</td>
          </tr>
          <tr>
            <td>date_of_birth</td>
            <td>string</td>
            <td>The customer's date of birth in the YYYY-MM-DD format (Length: 10).</td>
            <td>1990-02-28</td>
          </tr>
          <tr>
            <td>description</td>
            <td>string</td>
            <td>The description of the payment (MAX 255; MIN 3)</td>
            <td>Order1234</td>
          </tr>
          <tr>
            <td>document_number</td>
            <td>string</td>
            <td>The customer's document number (MAX 40; MIN 3).</td>
            <td>1093333333</td>
          </tr>
          <tr>
            <td>document_type</td>
            <td>enum</td>
            <td>The customer's document type (MAX 6, MIN 2).</td>
            <td>Check the Country reference.</td>
          </tr>
          <tr>
            <td>email</td>
            <td>string</td>
            <td>The customer's e-mail (MAX 255; MIN 3).</td>
            <td><a href="mailto:john.doe@email.com">john.doe@email.com</a></td>
          </tr>
          <tr>
            <td>gender</td>
            <td>enum</td>
            <td>The customer's gender (MAX 1; MIN 1; (M=Male/F=Female/NA=Not applicable/NK=Not Known)).</td>
            <td>M, F, NA, or NK.</td>
          </tr>
          <tr>
            <td>installments</td>
            <td>number</td>
            <td>In the case of a card transaction, the number of installments in which the payment was requested (MAX 2; MIN 1).</td>
            <td>1</td>
          </tr>
          <tr>
            <td>merchant_order_id</td>
            <td>string</td>
            <td>The identification of the order (MAX 255; MIN 3).</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td>nationality</td>
            <td>enum</td>
            <td>The customer's nationality (MAX 2; MIN 2; <a href="https://docs.y.uno/reference/country-reference">ISO 3166-1</a>).</td>
            <td>Check the Country reference.</td>
          </tr>
          <tr>
            <td>payment_id</td>
            <td>string</td>
            <td>The unique identifier of the payment (MAX 64; MIN 36).</td>
            <td>5104911d-5df9-229e-8468-bd41abea1</td>
          </tr>
          <tr>
            <td>pnr</td>
            <td>string</td>
            <td>The passenger name record (MAX 255; MIN 3).</td>
            <td>1P-2UUGJW</td>
          </tr>
          <tr>
            <td>provider_number</td>
            <td>integer</td>
            <td>The ticket's number.</td>
            <td>13141</td>
          </tr>
          <tr>
            <td>refunded</td>
            <td>number</td>
            <td>The payment amount that has been refunded.</td>
            <td>10000.00</td>
          </tr>
          <tr>
            <td>status</td>
            <td>enum</td>
            <td>The status of the payment (MAX 255; MIN 3).</td>
            <td>SUCCEEDED</td>
          </tr>
          <tr>
            <td>sub_status</td>
            <td>enum</td>
            <td>The substatus of the payment (MAX 255; MIN 3).</td>
            <td>APPROVED</td>
          </tr>
          <tr>
            <td>updated_at</td>
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
            <td>account_code</td>
            <td>string</td>
            <td>The unique identifier of the account (MAX 64; MIN 36).</td>
            <td>64143128-dd12-11ec-9d64-0242ac120002</td>
          </tr>
          <tr>
            <td>amount</td>
            <td>number</td>
            <td>The amount of the transaction.</td>
            <td>100</td>
          </tr>
          <tr>
            <td>authorization_code</td>
            <td>string</td>
            <td>The acquirer's response code.</td>
            <td>742A64</td>
          </tr>
          <tr>
            <td>bank_name</td>
            <td>string</td>
            <td>Name of the bank associated with the account (MAX 255; MIN 3).</td>
            <td>Banco Galicia</td>
          </tr>
          <tr>
            <td>beneficiary_document</td>
            <td>string</td>
            <td>The beneficiary’s document number (MAX 40; MIN 3).</td>
            <td>1093333333</td>
          </tr>
          <tr>
            <td>beneficiary_document_type</td>
            <td>enum</td>
            <td>The beneficiary’s document type (MAX 6, MIN 2).</td>
            <td>Check the Country reference.</td>
          </tr>
          <tr>
            <td>beneficiary_name</td>
            <td>string</td>
            <td>The name of the account holder (MAX 255; MIN 3).</td>
            <td>John Doe</td>
          </tr>
          <tr>
            <td>card_brand</td>
            <td>string</td>
            <td>The card's brand information (MAX 255; MIN 3).</td>
            <td>VISA</td>
          </tr>
          <tr>
            <td>card_category</td>
            <td>string</td>
            <td>The category of the card's issuer (MAX 255; MIN 3).</td>
            <td>Gold</td>
          </tr>
          <tr>
            <td>card_holder_name</td>
            <td>string</td>
            <td>Card holder's full name as it appears on the card (MAX 26; MIN 3) - it is only available for PCI-certified merchants.</td>
            <td>Fannie Weissnat</td>
          </tr>
          <tr>
            <td>card_iin</td>
            <td>number</td>
            <td>The&nbsp;&nbsp;issuer identification number (IIN) refers to the first few digits of a&nbsp;&nbsp;payment card number issued by a financial institution (MAX 8; MIN 8)</td>
            <td>123456</td>
          </tr>
          <tr>
            <td>card_issuer_code</td>
            <td>integer</td>
            <td>The card's issuer identification code (MAX 255; MIN 3).</td>
            <td></td>
          </tr>
          <tr>
            <td>card_issuer_name</td>
            <td>string</td>
            <td>The card's issuer (MAX 255; MIN 3).</td>
            <td>Banco Galicia</td>
          </tr>
          <tr>
            <td>card_lfd</td>
            <td>number</td>
            <td>Last four digits of the card (MAX 4; MIN 4)</td>
            <td>7890</td>
          </tr>
          <tr>
            <td>card_type</td>
            <td>string</td>
            <td>The card issuer type (MAX 255; MIN 3).</td>
            <td>CREDIT</td>
          </tr>
          <tr>
            <td>country</td>
            <td>enum</td>
            <td>The country where the transaction must be processed (MAX 2; MIN 2; <a href="https://docs.y.uno/reference/country-reference">ISO 3166-1</a>).</td>
            <td>US</td>
          </tr>
          <tr>
            <td>created_at</td>
            <td>timestamp</td>
            <td>Transaction creation date(MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</td>
            <td>2022-05-09T20:46:54.786342Z</td>
          </tr>
          <tr>
            <td>currency</td>
            <td>enum</td>
            <td>The currency used to make the payment (MAX 3; MIN 3; <a href="https://docs.y.uno/reference/country-reference">ISO 4217</a>)</td>
            <td>COP</td>
          </tr>
          <tr>
            <td>customer first_name</td>
            <td>string</td>
            <td>The customer's first name (MAX 255; MIN 1).</td>
            <td>John</td>
          </tr>
          <tr>
            <td>customer_code</td>
            <td>string</td>
            <td>The unique identifier of the customer (MAX 255; MIN 3).</td>
            <td>23456</td>
          </tr>
          <tr>
            <td>customer_last_name</td>
            <td>string</td>
            <td>The customer's last name (MAX 255; MIN 1).</td>
            <td>Doe</td>
          </tr>
          <tr>
            <td>document_number</td>
            <td>string</td>
            <td>The customer's document number (MAX 40; MIN 3).</td>
            <td>1093333333</td>
          </tr>
          <tr>
            <td>document_type</td>
            <td>enum</td>
            <td>The customer's document type (MAX 6, MIN 2).</td>
            <td>Check the Country reference.</td>
          </tr>
          <tr>
            <td>email</td>
            <td>string</td>
            <td>The customer's e-mail (MAX 255; MIN 3).</td>
            <td><a href="mailto:john.doe@email.com">john.doe@email.com</a></td>
          </tr>
          <tr>
            <td>installments</td>
            <td>number</td>
            <td>In the case of a card transaction, the number of installments in which the payment was requested (MAX 2; MIN 1).</td>
            <td>1</td>
          </tr>
          <tr>
            <td>merchant_order_id</td>
            <td>string</td>
            <td>Identify the Order your company assigned (MAX 255; MIN 3).</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td>merchant_transaction_id</td>
            <td>string</td>
            <td>Identify the transaction your company assigned (MAX 255; MIN 3).</td>
            <td>987654321</td>
          </tr>
          <tr>
            <td>nationality</td>
            <td>enum</td>
            <td>The customer's nationality (MAX 2; MIN 2; ISO 3166-1).</td>
            <td>Check the Country reference.</td>
          </tr>
          <tr>
            <td>payment_id</td>
            <td>string</td>
            <td>The unique identifier of the payment (MAX 64; MIN 36).</td>
            <td>5104911d-5df9-229e-8468-bd41abea1</td>
          </tr>
          <tr>
            <td>payment_method_category</td>
            <td>enum</td>
            <td>Category of the transaction (MAX 255; MIN 3).</td>
            <td>BANK_TRANSFER</td>
          </tr>
          <tr>
            <td>payment_method_type</td>
            <td>enum</td>
            <td>The type of payment method selected by the customer (MAX 255; MIN 3).</td>
            <td>BANCOLOMBIA_TRANSFER</td>
          </tr>
          <tr>
            <td>pnr</td>
            <td>string</td>
            <td>The passenger name record (MAX 255; MIN 3).</td>
            <td>1P-2UUGJW</td>
          </tr>
          <tr>
            <td>provider_id</td>
            <td>enum</td>
            <td>The id of the provider that processed the transaction.</td>
            <td>WOMPI</td>
          </tr>
          <tr>
            <td>provider_number</td>
            <td>integer</td>
            <td>The ticket's number.</td>
            <td>13141</td>
          </tr>
          <tr>
            <td>provider_status</td>
            <td></td>
            <td>The status of the transaction assigned by the provider.</td>
            <td></td>
          </tr>
          <tr>
            <td>provider_transaction_id</td>
            <td>string</td>
            <td>The unique identifier of the transaction from the provider (MAX 255; MIN 3).</td>
            <td>53443e9c-dd17-11ec-9d64-0242ac120002</td>
          </tr>
          <tr>
            <td>response_code</td>
            <td>string</td>
            <td>The code that represents the response to the outcome of the transaction.</td>
            <td>SUCCEEDED</td>
          </tr>
          <tr>
            <td>status</td>
            <td>string</td>
            <td>The status of the transaction(MAX 255; MIN 3)</td>
            <td>SUCCEEDED</td>
          </tr>
          <tr>
            <td>transaction_id</td>
            <td>string</td>
            <td>The unique identifier of the transaction assigned by Yuno (MAX 64; MIN 36).</td>
            <td>9104911d-5df9-429e-8488-ad41abea1a4b</td>
          </tr>
          <tr>
            <td>type</td>
            <td>enum</td>
            <td>The transaction type(MAX 255; MIN 3)</td>
            <td>PURCHASE</td>
          </tr>
          <tr>
            <td>updated_at</td>
            <td>timestamp</td>
            <td>The date and time from the last time the transaction was updated.</td>
            <td>2022-05-15T20:46:54.786342Z</td>
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
            <td>account_code</td>
            <td>string</td>
            <td>The unique identifier of the account (MAX 64; MIN 36).</td>
            <td>64143128-dd12-11ec-9d64-0242ac120002</td>
          </tr>
          <tr>
            <td>country</td>
            <td>enum</td>
            <td>The country where the transaction must be processed (MAX 2; MIN 2; ISO 3166-1).</td>
            <td>US</td>
          </tr>
          <tr>
            <td>type</td>
            <td>enum</td>
            <td>The transaction type (MAX 255; MIN 3)</td>
            <td>PURCHASE</td>
          </tr>
          <tr>
            <td>payment_method_category</td>
            <td>enum</td>
            <td>Category of the transaction (MAX 255; MIN 3).</td>
            <td>BANK_TRANSFER</td>
          </tr>
          <tr>
            <td>payment_method_type</td>
            <td>enum</td>
            <td>The type of payment method selected by the customer (MAX 255; MIN 3).</td>
            <td>BANCOLOMBIA_TRANSFER</td>
          </tr>
          <tr>
            <td>provider_id</td>
            <td>enum</td>
            <td>The id of the provider that processed the transaction.</td>
            <td>WOMPI</td>
          </tr>
          <tr>
            <td>customer_code</td>
            <td>string</td>
            <td>The unique identifier of the customer (MAX 255; MIN 3).</td>
            <td>23456</td>
          </tr>
          <tr>
            <td>payment_id</td>
            <td>string</td>
            <td>The unique identifier of the payment (MAX 64; MIN 36).</td>
            <td>5104911d-5df9-229e-8468-bd41abea1</td>
          </tr>
          <tr>
            <td>merchant_order_id</td>
            <td>string</td>
            <td>Identification of the Order assigned by your company. (MAX 255; MIN 3).</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td>merchant_transaction_id</td>
            <td>string</td>
            <td>Identification of the transaction assigned by your company. (MAX 255; MIN 3).</td>
            <td>987654321</td>
          </tr>
          <tr>
            <td>transaction_id</td>
            <td>string</td>
            <td>The unique identifier of the transaction assigned by Yuno (MAX 64 ; MIN 36).</td>
            <td>9104911d-5df9-429e-8488-ad41abea1a4b</td>
          </tr>
          <tr>
            <td>provider_transaction_id</td>
            <td>string</td>
            <td>The unique identifier of the transaction from the provider (MAX 255; MIN 3).</td>
            <td>53443e9c-dd17-11ec-9d64-0242ac120002</td>
          </tr>
          <tr>
            <td>status</td>
            <td>string</td>
            <td>The status of the transaction (MAX 255; MIN 3)</td>
            <td>SUCCEEDED</td>
          </tr>
          <tr>
            <td>response_code</td>
            <td>string</td>
            <td>The code that represents the response to the outcome of the transaction.</td>
            <td>SUCCEEDED</td>
          </tr>
          <tr>
            <td>provider_status</td>
            <td></td>
            <td>The status of the transaction assigned by the provider.</td>
            <td></td>
          </tr>
          <tr>
            <td>amount</td>
            <td>number</td>
            <td>The amount of the transaction.</td>
            <td>100</td>
          </tr>
          <tr>
            <td>currency</td>
            <td>enum</td>
            <td>The currency used to make the payment (MAX 3; MIN 3; <a href="https://docs.y.uno/reference/country-reference">ISO 4217</a>).</td>
            <td>COP</td>
          </tr>
          <tr>
            <td>card_type</td>
            <td>string</td>
            <td>The type of the card's issuer (MAX 255; MIN 3).</td>
            <td>CREDIT</td>
          </tr>
          <tr>
            <td>card_brand</td>
            <td>string</td>
            <td>The card's brand information (MAX 255; MIN 3).</td>
            <td>VISA</td>
          </tr>
          <tr>
            <td>card_iin</td>
            <td>number</td>
            <td>The&nbsp;&nbsp;issuer identification number (IIN) refers to the first few digits of a&nbsp;&nbsp;payment card number issued by a financial institution (MAX 8; MIN 8)</td>
            <td>123456</td>
          </tr>
          <tr>
            <td>card_lfd</td>
            <td>number</td>
            <td>Last four digits of the card (MAX 4; MIN 4)</td>
            <td>7890</td>
          </tr>
          <tr>
            <td>authorization_code</td>
            <td>string</td>
            <td>The acquirer's response code.</td>
            <td>742A64</td>
          </tr>
          <tr>
            <td>installments</td>
            <td>number</td>
            <td>In case of a card transaction, the number of installments in which the payment was requested (MAX 2; MIN 1).</td>
            <td>1</td>
          </tr>
          <tr>
            <td>pnr</td>
            <td>string</td>
            <td>The passenger name record (MAX 255; MIN 3).</td>
            <td>1P-2UUGJW</td>
          </tr>
          <tr>
            <td>created_at</td>
            <td>timestamp</td>
            <td>Transaction creation date (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</td>
            <td>2022-05-09T20:46:54.786342Z</td>
          </tr>
          <tr>
            <td>updated_at</td>
            <td>timestamp</td>
            <td>The date and time from the last time the transaction was updated.</td>
            <td>2022-05-15T20:46:54.786342Z</td>
          </tr>
          <tr>
            <td>reconciliation_status</td>
            <td>enum</td>
            <td>The reconciliation status of a transaction (MAX 255; MIN 3).</td>
            <td>RECONCILED</td>
          </tr>
          <tr>
            <td>reconciliation_sub_status</td>
            <td>enum</td>
            <td>The reconciliation substatus of a transaction (MAX 255; MIN 3).</td>
            <td>AUTOMATICALLY</td>
          </tr>
          <tr>
            <td>reconciliation_date</td>
            <td>timestamp</td>
            <td>The date the transaction was reconciled (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</td>
            <td>2022-05-09T20:46:54.786342Z</td>
          </tr>
          <tr>
            <td>reconciliation_id</td>
            <td>enum</td>
            <td>The unique identifier assigned to a transaction when it is reconciled (MAX 255; MIN 3).</td>
            <td>2478d494-4a20-45b1-8a12-1c2604cf2d1d</td>
          </tr>
        </tbody>
        </table>
        
    </div>
  </details>
</body>
`}</HTMLBlock>

## Settlement report

Notice that this report has two headers. It happens because the report has 2 different types of records.

<HTMLBlock>{`
<body>
  <details class="table-card">
    <summary>
      <span class="table-call">Settlement report field details </span>
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
            <th colspan="4">HEADER</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Parameter</td>
            <td>Type</td>
            <td>Description</td>
            <td>Example</td>
          </tr>
          <tr>
            <td>type</td>
            <td>String</td>
            <td>Row type. Value: HEADER (MAX 255; MIN 3).</td>
            <td>HEADER</td>
          </tr>
          <tr>
            <td>acquirer</td>
            <td>enum</td>
            <td>Name&nbsp;&nbsp;of the acquirer that processed the original payment. In aggregator&nbsp;&nbsp;models, the provider is the same as the acquirer, in other models they&nbsp;&nbsp;may be different entities (MAX 255; MIN 3).</td>
            <td>SpinPay</td>
          </tr>
          <tr>
            <td>number_of_transactions</td>
            <td>number</td>
            <td>Total transactions contained in the report for the acquirer (MAX 255; MIN 1).</td>
            <td>15</td>
          </tr>
          <tr>
            <td>gross_currency</td>
            <td>enum</td>
            <td>Currency code in which transactions were made (MAX 3; MIN 3; <a href="https://docs.y.uno/reference/country-reference">ISO 4217</a>).</td>
            <td>USD</td>
          </tr>
          <tr>
            <td>gross_credit</td>
            <td>decimal</td>
            <td>For credit transactions, the corresponding gross amount (multiple of 0.0001).</td>
            <td>1000.0</td>
          </tr>
          <tr>
            <td>gross_debit</td>
            <td>decimal</td>
            <td>For debit transactions, the corresponding gross amount (multiple of 0.0001).</td>
            <td>1000.0</td>
          </tr>
          <tr>
            <td>settlement_currency</td>
            <td>enum</td>
            <td>Currency code in which settlement was made(MAX 3; MIN 3; <a href="https://docs.y.uno/reference/country-reference">ISO 4217</a>).</td>
            <td>USD</td>
          </tr>
          <tr>
            <td>settlement_gross_amount</td>
            <td>decimal</td>
            <td>The corresponding gross amount for all transactions in settlement currency (multiple of 0.0001).</td>
            <td>100.0</td>
          </tr>
          <tr>
            <td>settlement_credit_fees</td>
            <td>decimal</td>
            <td>Commission&nbsp;&nbsp;fee that was withheld by the acquirer on credit transactions in&nbsp;&nbsp;settlement currency. This should be the difference between the gross and&nbsp;&nbsp;net amounts (multiple of 0.0001).</td>
            <td>15.0</td>
          </tr>
          <tr>
            <td>settlement_debit_fees</td>
            <td>decimal</td>
            <td>Commission&nbsp;&nbsp;fee that was withheld by the acquirer on debit transactions in&nbsp;&nbsp;settlement currency. This should be the difference between the gross and&nbsp;&nbsp;net amounts (multiple of 0.0001).</td>
            <td>5.0</td>
          </tr>
          <tr>
            <td>settlement_fee_taxes</td>
            <td>decimal</td>
            <td>Commission&nbsp;&nbsp;fee tax that was withheld by the acquirer in settlement currency. This&nbsp;&nbsp;should be the difference between the gross and net amounts (multiple of&nbsp;&nbsp;0.0001).</td>
            <td>0.10</td>
          </tr>
          <tr>
            <td>settlement_taxes</td>
            <td>decimal</td>
            <td>Value&nbsp;&nbsp;of taxes applied to the transactions in settlement currency. This&nbsp;&nbsp;should be the difference between the gross and net amounts (multiple of&nbsp;&nbsp;0.0001).</td>
            <td>1.0</td>
          </tr>
          <tr>
            <td>settlement_cost_of_installments</td>
            <td>decimal</td>
            <td>Commission&nbsp;&nbsp;fee that the acquirer withheld for advance installments in settlement&nbsp;&nbsp;currency (multiple of 0.0001). This should be the difference between the&nbsp;&nbsp;gross and net amounts.</td>
            <td>15.0</td>
          </tr>
          <tr>
            <td>settlement_net_credit</td>
            <td>decimal</td>
            <td>Amount submitted in the credit transactions requests minus acquirer fees in settlement currency (multiple of 0.0001).</td>
            <td>970.0</td>
          </tr>
          <tr>
            <td>settlement_net_debit</td>
            <td>decimal</td>
            <td>Amount submitted in the debit transactions requests minus acquirer fees in settlement currency (multiple of 0.0001).</td>
            <td>970.0</td>
          </tr>
          <tr>
            <td>settlement_net_balance</td>
            <td>decimal</td>
            <td>Net credit/debit amount in settlement currency (multiple of 0.0001).</td>
            <td>1000.0</td>
          </tr>
          <tr>
            <td>settlement_batch_id(A)</td>
            <td>string</td>
            <td>This&nbsp;&nbsp;field contains the unique acquirer settlement batch number that you can&nbsp;&nbsp;find on your bank statement for the corresponding deposit (MAX 255; MIN&nbsp;&nbsp;3).</td>
            <td>SETT-111450235000</td>
          </tr>
          <tr>
            <td>settlement_date(A)</td>
            <td>date</td>
            <td>Estimated date by the acquirer in which the funds will be deposited in the merchant's bank account.</td>
            <td>2022-05-09</td>
          </tr>
          <tr>
            <td>country(A)</td>
            <td>enum</td>
            <td>Country of the merchant account (<a href="https://docs.y.uno/reference/country-reference">ISO 3166-1</a>).</td>
            <td>US</td>
          </tr>
          <tr>
            <td>Parameter</td>
            <td>Type</td>
            <td>Description</td>
            <td>Example</td>
          </tr>
          <tr>
            <td>account_id(A)</td>
            <td>string</td>
            <td>The merchant account ID (MAX 64; MIN 36).</td>
            <td>64143128-dd12-11ec-9d64-0242ac120002</td>
          </tr>
          <tr>
            <td>provider_merchant_id(A)</td>
            <td>string</td>
            <td>Merchant ID in the psp system (MAX 255; MIN 3).</td>
            <td>15a8c304-d334-4da7-bccb-09cf85a1d7a6</td>
          </tr>
          <tr>
            <td>country(A)</td>
            <td>enum</td>
            <td>Country of the merchant account (<a href="https://docs.y.uno/reference/country-reference">ISO 3166-1</a>).</td>
            <td>US</td>
          </tr>
          <tr>
            <td>settlement_batch_id(A)</td>
            <td>string</td>
            <td>This&nbsp;&nbsp;field contains the unique acquirer settlement batch number that you can&nbsp;&nbsp;find on your bank statement for the corresponding deposit (MAX 255; MIN&nbsp;&nbsp;3).</td>
            <td>SETT-111450235000</td>
          </tr>
          <tr>
            <td>settlement_date(A)</td>
            <td>timestamp</td>
            <td>Estimated date by the acquirer in which the funds will be deposited in the merchant's bank account.</td>
            <td>2022-05-09</td>
          </tr>
          <tr>
            <td>payment_method_category</td>
            <td>enum</td>
            <td>Category of the transaction (MAX 255; MIN 3).</td>
            <td>BANK_TRANSFER</td>
          </tr>
          <tr>
            <td>payment_method_type</td>
            <td>enum</td>
            <td>The type of payment method selected by the customer (MAX 255; MIN 3).</td>
            <td>BANCOLOMBIA_TRANSFER</td>
          </tr>
          <tr>
            <td>provider_id</td>
            <td>enum</td>
            <td>Identification of the provider (MAX 255; MIN 3) - - Options: WOMPI, SPINPAY, ADDI, MERCADO_PAGO</td>
            <td>WOMPI</td>
          </tr>
          <tr>
            <td>acquirer</td>
            <td>enum</td>
            <td>Name&nbsp;&nbsp;of the acquirer that processed the original payment. In aggregator&nbsp;&nbsp;models, the provider is the same as the acquirer, in other models they&nbsp;&nbsp;may be different entities (MAX 255; MIN 3).</td>
            <td>SpinPay</td>
          </tr>
          <tr>
            <td>payment_id</td>
            <td>string</td>
            <td>The unique identifier of the payment (MAX 64; MIN 36).</td>
            <td>5104911d-5df9-229e-8468-bd41abea1</td>
          </tr>
          <tr>
            <td>merchant_order_id(A)</td>
            <td>string</td>
            <td>Identification of the Order (MAX 255; MIN 3).</td>
            <td>abc123456789</td>
          </tr>
          <tr>
            <td>merchant_transaction_id</td>
            <td>string</td>
            <td>Identification of the transaction assigned by the merchant (MAX 255; MIN 3).</td>
            <td>987654321</td>
          </tr>
          <tr>
            <td>transaction_id(A)</td>
            <td>string</td>
            <td>The unique identifier of the transaction assigned by Yuno (MAX 64; MIN 36).</td>
            <td>9104911d-5df9-429e-8488-ad41abea1a4b</td>
          </tr>
          <tr>
            <td>provider_transaction_id(A)</td>
            <td>string</td>
            <td>The&nbsp;&nbsp;unique identifier of the transaction assigned by the gateway, This&nbsp;&nbsp;field is empty if the gateway doesn't provide transaction information&nbsp;&nbsp;(MAX 255; MIN 3).</td>
            <td>53443e9c-dd17-11ec-9d64-0242ac120002</td>
          </tr>
          <tr>
            <td>transaction_date</td>
            <td>timestamp</td>
            <td>Transaction creation date (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</td>
            <td>2022-05-09T20:46:54.786342Z</td>
          </tr>
          <tr>
            <td>type</td>
            <td>enum</td>
            <td>The type of transaction. Values could be: VENTA, DEVOLUCIÓN, CONTRACARGO, DISPUTA, COMISIÓN, IMPUESTO, LIQUIDACION.</td>
            <td>VENTA</td>
          </tr>
          <tr>
            <td>gross_currency</td>
            <td>enum</td>
            <td>Currency code in which transaction was made (MAX 3; MIN 3; <a href="https://docs.y.uno/reference/country-reference">ISO 4217</a>).</td>
            <td>USD</td>
          </tr>
          <tr>
            <td>gross_credit</td>
            <td>decimal</td>
            <td>For credit transactions, the corresponding gross amount (multiple of 0.0001).</td>
            <td>1000.0</td>
          </tr>
          <tr>
            <td>gross_debit</td>
            <td>decimal</td>
            <td>For debit transactions, the corresponding gross amount (multiple of 0.0001).</td>
            <td>1000.0</td>
          </tr>
          <tr>
            <td>fee_rate(A)</td>
            <td>decimal</td>
            <td>Percentage&nbsp;&nbsp;value of the fee retained by the acquirer. This field is empty if the&nbsp;&nbsp;acquirer doesn't provide transaction information.</td>
            <td>0.015</td>
          </tr>
          <tr>
            <td>settlement_currency</td>
            <td>enum</td>
            <td>Currency code in which settlement was made(MAX 3; MIN 3; <a href="https://docs.y.uno/reference/country-reference">ISO 4217</a>).</td>
            <td>USD</td>
          </tr>
          <tr>
            <td>fx_rate</td>
            <td>decimal</td>
            <td>The exchange rate applied to the transaction at the time of settlement (multiple of 0.0001).</td>
            <td>10</td>
          </tr>
          <tr>
            <td>settlement_gross_amount</td>
            <td>decimal</td>
            <td>The corresponding gross amount for all transactions in settlement currency (multiple of 0.0001).</td>
            <td>100.0</td>
          </tr>
          <tr>
            <td>settlement_fees</td>
            <td>decimal</td>
            <td>The&nbsp;&nbsp;commission fee that was withheld by the acquirer on transactions in&nbsp;&nbsp;settlement currency. This should be the difference between the gross and&nbsp;&nbsp;net amounts (multiple of 0.0001).</td>
            <td>15.0</td>
          </tr>
          <tr>
            <td>settlement_fee_taxes</td>
            <td>decimal</td>
            <td>The&nbsp;&nbsp;commission fee tax that was withheld by the acquirer in settlement&nbsp;&nbsp;currency. This should be the difference between the gross and net&nbsp;&nbsp;amounts (multiple of 0.0001).</td>
            <td>0.10</td>
          </tr>
          <tr>
            <td>settlement_taxes</td>
            <td>decimal</td>
            <td>The&nbsp;&nbsp;value of taxes applied to the transactions in settlement currency. This&nbsp;&nbsp;should be the difference between the gross and net amounts (multiple of&nbsp;&nbsp;0.0001).</td>
            <td>1.0</td>
          </tr>
          <tr>
            <td>cost_of_installments_rate(A)</td>
            <td>decimal</td>
            <td>In&nbsp;&nbsp;case of processing sales in installments, the percentage financing cost&nbsp;&nbsp;rate retained by the acquirer. This field is empty if the acquirer&nbsp;&nbsp;doesn't provide transaction information.</td>
            <td>0.015</td>
          </tr>
          <tr>
            <td>settlement_cost_of_installments</td>
            <td>decimal</td>
            <td>The&nbsp;&nbsp;commission fee that was withheld by the acquirer for advance&nbsp;&nbsp;installments in settlement currency (multiple of 0.0001). This should be&nbsp;&nbsp;the difference between the gross and net amounts.</td>
            <td>15.0</td>
          </tr>
          <tr>
            <td>settlement_net_credit</td>
            <td>decimal</td>
            <td>The amount submitted in the credit transactions requests minus acquirer fees in settlement currency (multiple of 0.0001).</td>
            <td>970.0</td>
          </tr>
          <tr>
            <td>settlement_net_debit</td>
            <td>decimal</td>
            <td>The amount submitted in the debit transactions requests minus acquirer fees in settlement currency (multiple of 0.0001).</td>
            <td>970.0</td>
          </tr>
          <tr>
            <td>card_type</td>
            <td>enum</td>
            <td>Type of card used in the transaction (MAX 7; MIN 5).</td>
            <td>CREDIT</td>
          </tr>
          <tr>
            <td>card_brand</td>
            <td>enum</td>
            <td>Brand of the card used in the transaction (MAX 255; MIN 3).</td>
            <td>VISA</td>
          </tr>
          <tr>
            <td>card_iin(A)</td>
            <td>number</td>
            <td>The&nbsp;&nbsp;issuer identification number (IIN) refers to the first few digits of a&nbsp;&nbsp;payment card number issued by a financial institution (MAX 8; MIN 8).</td>
            <td>123456</td>
          </tr>
          <tr>
            <td>card_lfd(A)</td>
            <td>number</td>
            <td>Last four digits of the card (MAX 4; MIN 4).</td>
            <td>7890</td>
          </tr>
          <tr>
            <td>authorization_code(A)</td>
            <td>string</td>
            <td>In&nbsp;&nbsp;case of a card transaction, code assigned by the issuing bank to the&nbsp;&nbsp;transaction when it is authorized.This field is empty if the gateway&nbsp;&nbsp;doesn't provide transaction information(MAX 255; MIN 3).</td>
            <td>123456</td>
          </tr>
          <tr>
            <td>customer_id(A)</td>
            <td>string</td>
            <td>The unique identifier of the customer (MAX 255; MIN 3).</td>
            <td>23456</td>
          </tr>
          <tr>
            <td>voucher(A)</td>
            <td>string</td>
            <td>In&nbsp;&nbsp;case of a card transaction, the unique identifier of the payment&nbsp;&nbsp;receipt assigned by the issuing bank. This field is empty if the gateway&nbsp;&nbsp;doesn't provide transaction information (MAX 255; MIN 3).</td>
            <td>43564</td>
          </tr>
          <tr>
            <td>installments</td>
            <td>number</td>
            <td>In case of card transaction, the number of installments in which the payment was requested (MAX 2; MIN 1).</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Installment_number(A)</td>
            <td>string</td>
            <td>In&nbsp;&nbsp;case of card transaction in installments, the installment number that&nbsp;&nbsp;is being settled in this batch. If the installment payment is made in a&nbsp;&nbsp;single batch, the field is empty (MAX 6 ; MIN 3).</td>
            <td>1/3</td>
          </tr>
          <tr>
            <td>pnr</td>
            <td>string</td>
            <td>The passenger name record (MAX 255; MIN 3).</td>
            <td>1P-2UUGJW</td>
          </tr>
          <tr>
            <td>reconciliation</td>
            <td>struct</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>reconciliation_status</td>
            <td>enum</td>
            <td>The reconciliation status of a transaction (MAX 255; MIN 3).</td>
            <td>RECONCILED</td>
          </tr>
          <tr>
            <td>reconciliation_sub_status</td>
            <td>enum</td>
            <td>The reconciliation substatus of a transaction (MAX 255; MIN 3).</td>
            <td>AUTOMATICALLY</td>
          </tr>
          <tr>
            <td>reconciliation_date</td>
            <td>timestamp</td>
            <td>The date the transaction was reconciled (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).</td>
            <td>2022-05-09T20:46:54.786342Z</td>
          </tr>
          <tr>
            <td>reconciliation_id</td>
            <td>enum</td>
            <td>The unique identifier assigned to a transaction when it is reconciled (MAX 255; MIN 3).</td>
            <td>2478d494-4a20-45b1-8a12-1c2604cf2d1d</td>
          </tr>
        </tbody>
        </table>
        
    </div>
  </details>
</body>
`}</HTMLBlock>

(A)The availability of this data field will be subject to the sending of the data by the processor or the acquirer, or failing that, in the event that Yuno can identify said transaction and expose the data. Otherwise, it can be empty.
