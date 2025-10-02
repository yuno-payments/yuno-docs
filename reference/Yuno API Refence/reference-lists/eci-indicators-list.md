---
title: ECI indicators list
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    An Electronic Commerce Indicator (ECI) is a response code used in 3D Secure
    transactions, specifically in EMV 3D Secure. It helps merchants determine
    the next steps to take in a transaction — proceed, reject the purchase, or
    try again.
  robots: index
next:
  description: ''
---
An Electronic Commerce Indicator (ECI) is a response code used in 3D Secure transactions, specifically in EMV 3D Secure. It helps merchants determine the next steps to take in a transaction — proceed, reject the purchase, or try again. Below you will find the possible responses and ECI values you can receive.

## Successful authentication

The card issuer has successfully verified the cardholder's identity and validated the EMV 3Ds protocol. Consequently, the transaction is authorized to proceed, and all parties can benefit from the security and safeguards provided by 3DS.

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

  /*.table-card .table-div th {
    text-align: left;
  }*/
  
 /* .table-card .table-div tbody tr {
    font-size: 0.8rem;
    overflow-wrap: break-word;
  }
  
  .table-card .table-div tbody tr :first-child {
		font-weight: 600;    
  }*/
  
  table:only-child thead th {
    text-align: left;
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
  <details open class="table-card">
    <summary>
      <span class="table-call">Successful authentication codes</span>
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
            <th>Card type</th>
            <th>ECI indicator</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Visa Secure</td>
            <td>05</td>
          </tr>
          <tr>
            <td>Mastercard IdentityCheck</td>
            <td>02</td>
          </tr>
          <tr>
            <td>JC J/Secure 2.0</td>
            <td>05</td>
          </tr>
          <tr>
            <td>American Express SafeKey 2.0</td>
            <td>05</td>
          </tr>
          <tr>
            <td>Discover ProtectBuy 2.0</td>
            <td>05</td>
          </tr>
          <tr>
            <td>Elo 3DS</td>
            <td>05</td>
          </tr>
          <tr>
            <td>eftpos*</td>
            <td>05</td>
          </tr>
          <tr>
            <td>Carte Bancaires Fast'r</td>
            <td>05 / 02</td>
          </tr>
          <tr>
            <td>UnionPay International*</td>
            <td>05 / 02</td>
          </tr>
          <tr>
            <td>ITMX (LSS) Local Switch Secure</td>
            <td>05 / 02</td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

## Attempted authentication

The issuer's authentication service is currently unavailable. A merchant will receive this message when the customer is not enrolled in 3DS. This response serves as evidence that the merchant attempted authentication and fulfilled their due diligence as required by 3DS regulations.

<HTMLBlock>{`
<body>
  <details open class="table-card">
    <summary>
      <span class="table-call">Attempted authentication codes</span>
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
          <th>Card type</th>
          <th>ECI indicator</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Visa Secure</td>
          <td>06</td>
        </tr>
        <tr>
          <td>Mastercard IdentityCheck</td>
          <td>01</td>
        </tr>
        <tr>
          <td>JC J/Secure 2.0</td>
          <td>06</td>
        </tr>
        <tr>
          <td>American Express SafeKey 2.0</td>
          <td>06</td>
        </tr>
        <tr>
          <td>Discover ProtectBuy 2.0</td>
          <td>06</td>
        </tr>
        <tr>
          <td>Elo 3DS</td>
          <td>06</td>
        </tr>
        <tr>
          <td>eftpos*</td>
          <td>06</td>
        </tr>
        <tr>
          <td>Carte Bancaires Fast'r</td>
          <td>06 / 01</td>
        </tr>
        <tr>
          <td>UnionPay International*</td>
          <td>06 / 01</td>
        </tr>
        <tr>
          <td>ITMX (LSS) Local Switch Secure</td>
          <td>06 / 01</td>
        </tr>
      </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

## Failed authentication

The issuer encountered challenges and could not authenticate the cardholder due to various factors. These may include instances where incorrect information was provided during the authentication process or when the cardholder themselves chose to cancel the authentication page. Other unspecified reasons could also contribute to the issuer's inability to complete the authentication successfully.

<HTMLBlock>{`
<body>
  <details open class="table-card">
    <summary>
      <span class="table-call">Failed authentication codes</span>
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
    <th>Card type</th>
    <th>ECI indicator</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Visa Secure</td>
    <td>07</td>
  </tr>
  <tr>
    <td>Mastercard IdentityCheck</td>
    <td>00</td>
  </tr>
  <tr>
    <td>JC J/Secure 2.0</td>
    <td>07</td>
  </tr>
  <tr>
    <td>American Express SafeKey 2.0</td>
    <td>07</td>
  </tr>
  <tr>
    <td>Discover ProtectBuy 2.0</td>
    <td>07</td>
  </tr>
  <tr>
    <td>Elo 3DS</td>
    <td>07</td>
  </tr>
  <tr>
    <td>eftpos*</td>
    <td>07</td>
  </tr>
  <tr>
    <td>Carte Bancaires Fast'r</td>
    <td>07 / 00</td>
  </tr>
  <tr>
    <td>UnionPay International*</td>
    <td>07 / 00</td>
  </tr>
  <tr>
    <td>ITMX (LSS) Local Switch Secure</td>
    <td>07 / 00</td>
  </tr>
</tbody>
</table>
          </div>
  </details>
</body>
`}</HTMLBlock>

## Not permitted authentication

The authentication request encountered obstacles that prevented its completion for various reasons. These reasons may include the exclusion of the card type from authentication attempts, the inability of the ACS (Access Control Server) to process the authentication request message or other unspecified factors. As a result, the authentication process could not be allowed to proceed.

<HTMLBlock>{`
<body>
  <details open class="table-card">
    <summary>
      <span class="table-call">Not permitted authentication codes</span>
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
    <th>Card type</th>
    <th>Supported Version(s)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Visa Secure</td>
    <td>07</td>
  </tr>
  <tr>
    <td>Mastercard IdentityCheck</td>
    <td>00</td>
  </tr>
  <tr>
    <td>JC J/Secure 2.0</td>
    <td>07</td>
  </tr>
  <tr>
    <td>American Express SafeKey 2.0</td>
    <td>07</td>
  </tr>
  <tr>
    <td>Discover ProtectBuy 2.0</td>
    <td>07</td>
  </tr>
  <tr>
    <td>Elo 3DS</td>
    <td>07</td>
  </tr>
  <tr>
    <td>eftpos*</td>
    <td>07</td>
  </tr>
  <tr>
    <td>Carte Bancaires Fast'r</td>
    <td>07 / 00</td>
  </tr>
  <tr>
    <td>UnionPay International*</td>
    <td>07 / 00</td>
  </tr>
  <tr>
    <td>ITMX (LSS) Local Switch Secure</td>
    <td>07 / 00</td>
  </tr>
</tbody>
</table>
          </div>
  </details>
</body>
`}</HTMLBlock>

***

Although cobranded, transactions made through eftpos will receive ECI codes of 05/06/07, indicating the possible outcomes of authentication attempts.

UnionPay International: Transactions falling within the BIN ranges overlapping with UnionPay International will receive both ECI values - 05/06/07 and 02/01/00. These values signify different authentication results.