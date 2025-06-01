---
title: Transactions - Outdated with colapsing
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
### Overview

Each payment has one or more associated transactions. The following documentation covers transaction types, status codes, and descriptions after an HTTP 200 status is obtained and a transaction is processed.

### Workflow

![](https://files.readme.io/9bfc609-transactions.png)

### Types of transactions

| Type       | Description                                                          |
| :--------- | :------------------------------------------------------------------- |
| PURCHASE   | A direct purchase transaction.                                       |
| AUTHORIZE  | Transaction associated with authorization. Mainly for card payments. |
| CAPTURE    | A capture of a previously authorized transaction.                    |
| REFUND     | A refund of a previously approved transaction.                       |
| CANCEL     | A cancelation of a previously pending transaction.                   |
| VERIFY     | Transaction associated with a credit card verification.              |
| CHARGEBACK | Transaction associated with a chargeback.                            |

## Transaction codes

With every transaction, you´ll receive a `response_code` detailing more info about it. The details related to each status are presented below.

### Succeeded status

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
  
  .table-card .table-div table{
    margin: 0 !important;
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
      <span class="table-call"><code>SUCCEEDED</code> status details </span>
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
            <th>Type</th>
            <th>response_code</th>
            <th>Description - response_message</th>
            <th>ISO 8583 Code</th>
            <th>Hard/Soft decline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>AUTHORIZE</td>
            <td>AUTHORIZED</td>
            <td>Transaction authorized.</td>
            <td>10,11</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>PURCHASE</td>
            <td>SUCCESSFUL</td>
            <td>Transaction was successful.</td>
            <td>00</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>VERIFY</td>
            <td>VERIFIED</td>
            <td>Transaction verified.</td>
            <td>85</td>
            <td>N/A</td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

### Pending status

<HTMLBlock>{`
<body>
  <details class="table-card">
    <summary>
      <span class="table-call"><code>PENDING</code> status details </span>
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
            <th>Type</th>
            <th>response_code</th>
            <th>Description - response_message</th>
            <th>ISO 8583 Code</th>
            <th>Hard/Soft decline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PURCHASE</td>
            <td>PENDING_PROVIDER_<br>CONFIRMATION</td>
            <td>Transaction awaiting confirmation.</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>PURCHASE</td>
            <td>PENDING_REVIEW</td>
            <td>Transaction waiting for fraud review confirmation.</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

### Declined status

<HTMLBlock>{`
<body>
    <details class="table-card">
      <summary>
        <span class="table-call"><code>DECLINED</code> status details</span>
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
            <th>Type</th>
            <th>response_code</th>
            <th>Description - response_message</th>
            <th>ISO 8583 Code</th>
            <th>Hard/Soft decline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE/<br>VERIFY/<br>REFUND</td>

            <td>DECLINED_BY_BANK</td>
            <td>Rejected by the bank. Refer to the card issuer.</td>
            <td>01</td>
            <td>Soft</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>INVALID_MERCHANT</td>
            <td>Invalid merchant or service provider.</td>
            <td>03</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE/<br>VERIFY/<br>REFUND</td>

            <td>DO_NOT_HONOR</td>
            <td>Do not honor.</td>
            <td>05</td>
            <td>Soft</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>INVALID_TRANSACTION</td>
            <td>Invalid transaction.<br>The transaction being attempted is invalid. <br>For example, you are trying to use a
              debit card for a credit transaction.</td>
            <td>12</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>INVALID_ISSUER</td>
            <td>No such customer.</td>
            <td>15</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE/<br>VERIFY/<br>REFUND</td>

            <td>ACQUIRE_CONTINGENCY</td>
            <td>Acquire service unavailable.</td>
            <td>22,80,<br>90,91,<br>92,96</td>
            <td>Soft</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>DUPLICATED_<br>TRANSACTION</td>
            <td>Duplicate transmission of the transaction.</td>
            <td>94</td>
            <td>Soft</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>BAD_FILLED_INFO</td>
            <td>The card does not match the parameters of <br>the issuer.</td>
            <td>30,89</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>BANK_NOT_SUPPORTED</td>
            <td>Bank not supported by switch.</td>
            <td>31</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>INVALID_CREDENTIALS</td>
            <td>Invalid credentials.</td>
            <td></td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>INVALID_SECURITY_<br>CODE</td>
            <td>Invalid card´s security code.</td>
            <td>39</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE/<br>VERIFY/<br>REFUND</td>

            <td>UNSUPPORTED_<br>OPERATION</td>
            <td>The requested function not supported.</td>
            <td>40,62</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>REPORTED_LOST</td>
            <td>Lost card.</td>
            <td>41</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>REPORTED_STOLEN</td>
            <td>Stolen card, pick-up.</td>
            <td>43</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>INSUFFICIENT_FOUNDS</td>
            <td>Not sufficient funds.</td>
            <td>51</td>
            <td>Soft</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>CHECKING_ACCOUNT</td>
            <td>No checking account.</td>
            <td>52</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>REJECTED_SAVING<br />_ACCOUNT</td>
            <td>No saving account.</td>
            <td>53</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>EXPIRED</td>
            <td>Expired card or the alternative payment method.</td>
            <td>54</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>PIN_ERROR</td>
            <td>Incorrect PIN for the card.</td>
            <td>55,86</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>DENIED</td>
            <td>No card record.</td>
            <td>56</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE/<br>VERIFY/<br>REFUND</td>

            <td>USER_RESTRICTION</td>
            <td>The transaction is not permitted for cardholders.</td>
            <td>57</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE<br>/AUTHORIZE/<br>VERIFY/<br>REFUND</td>

            <td>TERMINAL_ERROR</td>
            <td>Your merchant account is not properly configured for the transaction.</td>
            <td>58</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>INVALID_AMOUNT</td>
            <td>The original amount is incorrect. The invalid amount for the operation.</td>
            <td>61</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>FRAUD_VALIDATION</td>
            <td>Security violation.</td>
            <td>59,63,<br>64</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>CALL_FOR_AUTHORIZE</td>
            <td>Card acceptor call the acquirer's security department.</td>
            <td>66</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>TIMEOUT</td>
            <td>Response received too late by provider.</td>
            <td>68</td>
            <td>Soft</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>FIRST_USE</td>
            <td>Blocked first use.</td>
            <td>78</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>ISSUER_VIOLATION</td>
            <td>The issuing bank rejected the transaction due to some violation related to the account.</td>
            <td>93</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>

            <td>REJECTED_3D_SECURE_<br>REQUIRED</td>
            <td>3DS validation rejection.</td>
            <td></td>
            <td>Hard</td>
          </tr>
        </tbody>
      </table>
      </div>
    </details>
</body>
`}</HTMLBlock>

### Rejected status

<HTMLBlock>{`
<body>
  <details class="table-card">
    <summary>
      <span class="table-call"><code>REJECTED</code> status details </span>
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
            <th>Type</th>
            <th>response_code</th>
            <th>Description - response_message</th>
            <th>ISO 8583 Code</th>
            <th>Hard/Soft decline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>
            <td>INVALID_TRANSACTION</td>
            <td>Invalid transaction.<br>The transaction being attempted is invalid. <br>For example, you are trying to use a
              debit card for a credit transaction.</td>
            <td>12</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>
            <td>INVALID_ACCOUNT</td>
            <td>Invalid account number.</td>
            <td>14</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>
            <td>INVALID_ISSUER</td>
            <td>No such customer.</td>
            <td>15</td>
            <td>Hard</td>
          </tr>

          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>
            <td>DUPLICATED_PAYMENT</td>
            <td>Duplicate transmission of the transaction.</td>
            <td>26</td>
            <td>Soft</td>
          </tr>

          <tr>
            <td>PURCHASE/<br>AUTHORIZE/<br>VERIFY/<br>REFUND</td>
            <td>UNSUPPORTED_<br>OPERATION</td>
            <td>The requested function not supported.</td>
            <td>40,62</td>
            <td>Hard</td>
          </tr>

          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>
            <td>INVALID_AMOUNT</td>
            <td>The original amount is incorrect. The invalid amount for the operation.</td>
            <td>61</td>
            <td>Hard</td>
          </tr>

          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>
            <td>DISABLED</td>
            <td>Restricted card.</td>
            <td>36</td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>
            <td>REJECTED_3D_SECURE_<br>REQUIRED</td>
            <td>3DS validation rejection.</td>
            <td></td>
            <td>Hard</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>
            <td>REFUND_IN_PROCESS</td>
            <td>There is already a refund in process for the transaction.</td>
            <td></td>
            <td>Hard</td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

### Error status

<HTMLBlock>{`
<body>
  <details class="table-card">
    <summary>
      <span class="table-call"><code>ERROR</code> status details </span>
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
            <th>Type</th>
            <th>response_code</th>
            <th>Description - response_message</th>
            <th>ISO 8583 Code</th>
            <th>Hard/Soft decline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE/<br>VERIFY/REFUND/<br>CAPTURE</td>
            <td>ERROR</td>
            <td>Error. An unknown error occurred during the <br>authorization.</td>
            <td>06</td>
            <td>Soft</td>
          </tr>
          <tr>
            <td>PURCHASE/<br>AUTHORIZE</td>
            <td>TIMEOUT</td>
            <td>Response received too late by Yuno.</td>
            <td>68</td>
            <td>Soft</td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>
