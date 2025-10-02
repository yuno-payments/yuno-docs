---
title: Transactions OLD VERSION
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

### Transaction codes

With every transaction, you´ll receive a `response_code` detailing more info about it. 

<HTMLBlock>{`
<table>
<thead>
  <tr>
    <th>Type</th>
    <th>Status</th>
    <th>response_code</th>
    <th>Description - response_message</th>
    <th>ISO 8583 Code</th>
    <th>Hard/Soft decline</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>PURCHASE</td>
    <td>SUCCEEDED</td>
    <td>SUCCESSFUL</td>
    <td>Transaction was successful.</td>
    <td>00</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>AUTHORIZE</td>
    <td>SUCCEEDED</td>
    <td>AUTHORIZED</td>
    <td>Transaction authorized.</td>
    <td>10,11</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>VERIFY</td>
    <td>SUCCEEDED</td>
    <td>VERIFIED</td>
    <td>Transaction verified.</td>
    <td>85</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>PURCHASE</td>
    <td>PENDING</td>
    <td>PENDING_PROVIDER_<br>CONFIRMATION</td>
    <td>Transaction awaiting confirmation.</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>PURCHASE</td>
    <td>PENDING</td>
    <td>PENDING_REVIEW</td>
    <td>Transaction waiting for fraud review confirmation.</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>PURCHASE/<br>AUTHORIZE/<br>VERIFY/<br>REFUND</td>
    <td>DECLINED</td>
    <td>DECLINED_BY_BANK</td>
    <td>Rejected by the bank. Refer to the card issuer.</td>
    <td>01</td>
    <td>Soft</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>INVALID_MERCHANT</td>
    <td>Invalid merchant or service provider.</td>
    <td>03</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/<br>AUTHORIZE/<br>VERIFY/REFUND</td>
    <td>DECLINED</td>
    <td>DO_NOT_HONOR</td>
    <td>Do not honor.</td>
    <td>05</td>
    <td>Soft</td>
  </tr>
  <tr>
    <td>PURCHASE/<br>AUTHORIZE/<br>VERIFY/REFUND/<br>CAPTURE</td>
    <td>ERROR</td>
    <td>ERROR</td>
    <td>Error. An unknown error occurred during the <br>authorization.</td>
    <td>06</td>
    <td>Soft</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED/<br>REJECTED</td>
    <td>INVALID_TRANSACTION</td>
    <td>Invalid transaction.<br>The transaction being attempted is invalid. <br>For example, you are trying to use a debit <br>card for a credit transaction.</td>
    <td>12</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>REJECTED</td>
    <td>INVALID_ACCOUNT</td>
    <td>Invalid account number.</td>
    <td>14</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED/<br>REJECTED</td>
    <td>INVALID_ISSUER</td>
    <td>No such customer.</td>
    <td>15</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/<br>AUTHORIZE/<br>VERIFY/REFUND</td>
    <td>DECLINED</td>
    <td>ACQUIRE_CONTINGENCY</td>
    <td>Acquire service unavailable.</td>
    <td>22,80,<br>90,91,<br>92,96</td>
    <td>Soft</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>REJECTED</td>
    <td>DUPLICATED_PAYMENT</td>
    <td>Duplicate transmission of the transaction.</td>
    <td>26</td>
    <td>Soft</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>DUPLICATED_<br>TRANSACTION</td>
    <td>Duplicate transmission of the transaction.</td>
    <td>94</td>
    <td>Soft</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>BAD_FILLED_INFO</td>
    <td>The card does not match the parameters of <br>the issuer.</td>
    <td>30,89</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>BANK_NOT_SUPPORTED</td>
    <td>Bank not supported by switch.</td>
    <td>31</td>
    <td>Hard</td>
  </tr>
    <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>INVALID_CREDENTIALS</td>
    <td>Invalid credentials.</td>
    <td></td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>INVALID_SECURITY_<br>CODE</td>
    <td>Invalid card´s security code.</td>
    <td>39</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/<br>AUTHORIZE/<br>VERIFY/REFUND</td>
    <td>DECLINED/<br>REJECTED</td>
    <td>UNSUPPORTED_<br>OPERATION</td>
    <td>The requested function not supported.</td>
    <td>40,62</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>REPORTED_LOST</td>
    <td>Lost card.</td>
    <td>41</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>REPORTED_STOLEN</td>
    <td>Stolen card, pick-up.</td>
    <td>43</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>INSUFFICIENT_FOUNDS</td>
    <td>Not sufficient funds.</td>
    <td>51</td>
    <td>Soft</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>CHECKING_ACCOUNT</td>
    <td>No checking account.</td>
    <td>52</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>REJECTED_SAVING<br/>_ACCOUNT</td>
    <td>No saving account.</td>
    <td>53</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED/<br>REJECTED</td>
    <td>EXPIRED</td>
    <td>Expired card or the alternative payment method.</td>
    <td>54</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>PIN_ERROR</td>
    <td>Incorrect PIN for the card.</td>
    <td>55,86</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>DENIED</td>
    <td>No card record.</td>
    <td>56</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/<br>AUTHORIZE/<br>VERIFY/REFUND</td>
    <td>DECLINED</td>
    <td>USER_RESTRICTION</td>
    <td>The transaction is not permitted for cardholders.</td>
    <td>57</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE<br>/AUTHORIZE/<br>VERIFY/REFUND</td>
    <td>DECLINED</td>
    <td>TERMINAL_ERROR</td>
    <td>Your merchant account is not properly configured for the transaction.</td>
    <td>58</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED/<br>REJECTED</td>
    <td>INVALID_AMOUNT</td>
    <td>The original amount is incorrect. The invalid amount for the operation.</td>
    <td>61</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>FRAUD_VALIDATION</td>
    <td>Security violation.</td>
    <td>59,63,<br>64</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>CALL_FOR_AUTHORIZE</td>
    <td>Card acceptor call the acquirer's security department.</td>
    <td>66</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>TIMEOUT</td>
    <td>Response received too late by provider.</td>
    <td>68</td>
    <td>Soft</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>FIRST_USE</td>
    <td>Blocked first use.</td>
    <td>78</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED</td>
    <td>ISSUER_VIOLATION</td>
    <td>The issuing bank rejected the transaction due to some violation related to the account.</td>
    <td>93</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>REJECTED</td>
    <td>DISABLED</td>
    <td>Restricted card.</td>
    <td>36</td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>DECLINED/<br>REJECTED</td>
    <td>REJECTED_3D_SECURE_<br>REQUIRED</td>
    <td>3DS validation rejection.</td>
    <td></td>
    <td>Hard</td>
  </tr>
  <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>REJECTED</td>
    <td>REFUND_IN_PROCESS</td>
    <td>There is already a refund in process for the transaction.</td>
    <td></td>
    <td>Hard</td>
  </tr>
    <tr>
    <td>PURCHASE/AUTHORIZE</td>
    <td>ERROR</td>
    <td>TIMEOUT</td>
    <td>Response received too late by Yuno.</td>
    <td>68</td>
    <td>Soft</td>
  </tr>
</tbody>
</table>
`}</HTMLBlock>
