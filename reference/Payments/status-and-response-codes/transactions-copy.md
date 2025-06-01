---
title: Transactions - New
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
Each payment has one or more associated transactions. The following documentation covers transaction types, status codes, and descriptions after an HTTP 200 status is obtained and a transaction is processed.

## Workflow

<Image align="center" src="https://files.readme.io/67d2053-transactions.png" />

## Types of transactions

| Type             | Description                                                          |
| :--------------- | :------------------------------------------------------------------- |
| PURCHASE         | A direct purchase transaction.                                       |
| AUTHORIZE        | Transaction associated with authorization. Mainly for card payments. |
| CAPTURE          | A capture of a previously authorized transaction.                    |
| REFUND           | A refund of a previously approved transaction.                       |
| CANCEL           | A cancelation of a previously pending transaction.                   |
| VERIFY           | Transaction associated with a credit card verification.              |
| CHARGEBACK       | Transaction associated with a chargeback.                            |
| THREE\_D\_SECURE | A 3DS verification transaction for an initial purchase.              |
| FRAUD\_SCREENING | Fraud screening is associated with fraud verification.               |

## Transaction codes

With every transaction, you´ll receive a `response_code` detailing more info about it. The details related to each status are presented below. Use the following buttons to navigate to the desired content.

<HTMLBlock>{`
<body>
  <section class="link_cards_container">

    <a class="card" onclick="window.location='#succeeded-status';">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Succeeded status</h4>
    </a>

    <a class="card" onclick="window.location='#won-status';">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Won status</h4>
    </a>
    
    <a class="card" onclick="window.location='#created-status';">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Created status</h4>
    </a>
    
    <a class="card" onclick="window.location='#pending-status';">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Pending status</h4>
    </a>
    
    <a class="card" onclick="window.location='#declined-status';">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Declined status</h4>
    </a>
    
    <a class="card" onclick="window.location='#rejected-status';">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Rejected status</h4>
    </a>
    
    <a class="card" onclick="window.location='#error-status';">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Error status</h4>
    </a>
    
    <a class="card" onclick="window.location='#expired-status';">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Expired status</h4>
    </a>
    
    <a class="card" onclick="window.location='#lost-status';">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Lost status</h4>
    </a>
     
  </section>

</body>
`}</HTMLBlock>

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

  .table-card .table-div table {
    margin: 0 !important;
  }

  .table-card .table-div td {
    text-align: center;
  }
  
  .table-card .table-div tbody tr :first-child {
		font-weight: 600;    
    font-size: 0.7rem;
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
            <th>response_code</th>
            <th>Description</th>
            <th>Hard/Soft decline</th>
            <th>ISO 8583 code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SUCCEEDED</td>
            <td>Transaction successful</td>
            <td>N/A</td>
            <td>0,8,10,11,16,32</td>
          </tr>
          <tr>
            <td>FRAUD_VERIFIED</td>
            <td>Transaction verified by fraud provider</td>
            <td>N/A</td>
            <td>-</td>
          </tr>
          <tr>
            <td>SUCCEEDED_THREE_D_SECURE</td>
            <td>3DS validation successful</td>
            <td>N/A</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

### Won status

<HTMLBlock>{`
<body>
  <details open class="table-card">
    <summary>
      <span class="table-call"><code>WON</code> status details </span>
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
            <th>response_code</th>
            <th>Description</th>
            <th>Hard/Soft decline</th>
            <th>ISO 8583 code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>REVIEW_WON</td>
            <td>Acquirer rejected the chargeback</td>
            <td>N/A</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

### Created status

<HTMLBlock>{`
<body>
  <details open class="table-card">
    <summary>
      <span class="table-call"><code>CREATED</code> status details </span>
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
            <th>response_code</th>
            <th>Description</th>
            <th>Hard/Soft decline</th>
            <th>ISO 8583 code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ACTION_REQUIRED</td>
            <td>Chargeback or Inquiry received. Decision or documentation must be provided</td>
            <td>N/A</td>
            <td>-</td>
          </tr>
          <tr>
            <td>SUCCEEDED</td>
            <td>Transaction created successfully</td>
            <td>N/A</td>
            <td>-</td>
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
  <details open class="table-card">
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
            <th>response_code</th>
            <th>Description</th>
            <th>Hard/Soft decline</th>
            <th>ISO 8583 code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CHALLENGE_REQUIRED</td>
            <td>Transaction waiting for the challenge completion</td>
            <td>N/A</td>
            <td>-</td>
          </tr>
          <tr>
            <td>IN_REVIEW</td>
            <td>Chargeback documentation was sent to the provider and is being analyzed</td>
            <td>N/A</td>
            <td>-</td>
          </tr>
          <tr>
            <td>PENDING_FRAUD_REVIEW</td>
            <td>Transaction is being analyzed by fraud provider</td>
            <td>N/A</td>
            <td>-</td>
          </tr>
          <tr>
            <td>PENDING_PROVIDER_CONFIRMATION</td>
            <td>Transaction waiting confirmation</td>
            <td>N/A</td>
            <td>-</td>
          </tr>
          <tr>
            <td>PENDING_REVIEW</td>
            <td>Transaction waiting fraud review confirmation</td>
            <td>N/A</td>
            <td>-</td>
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
  <details open class="table-card">
    <summary>
      <span class="table-call"><code>DECLINED</code> status details </span>
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
            <th>response_code</th>
            <th>Description</th>
            <th>Hard/Soft decline</th>
            <th>ISO 8583 code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ACCOUNT_STATUS</td>
            <td>Contact your fraud provider to verify your account status.</td>
            <td>N/A</td>
            <td>-</td>
          </tr>
          <tr>
            <td>ACQUIRE_CONTINGENCY</td>
            <td>Acquire service unavailable</td>
            <td>SOFT</td>
            <td>22, 80, 90, 91, 92, 96</td>
          </tr>
          <tr>
            <td>AUTHENTICATION_ATTEMPT</td>
            <td>Authentication attempt without completion</td>
            <td>N/A</td>
            <td>-</td>
          </tr>
          <tr>
            <td>AUTHENTICATION_FAILED_THREE_D_SECURE</td>
            <td>3D validation failed</td>
            <td>N/A</td>
            <td>-</td>
          </tr>
          <tr>
            <td>BAD_FILLED_INFO</td>
            <td>Card does not match the parameters from the issuer</td>
            <td>HARD</td>
            <td>30,89</td>
          </tr>
          <tr>
            <td>BANK_NOT_SUPPORTED</td>
            <td>Bank not supported by switch</td>
            <td>SOFT</td>
            <td>31</td>
          </tr>
          <tr>
            <td>CALL_FOR_AUTHORIZE</td>
            <td>Card acceptor call acquirer's security department</td>
            <td>SOFT</td>
            <td>66</td>
          </tr>
          <tr>
            <td>CANCELLED_BY_USER</td>
            <td>Cancelled by user</td>
            <td>SOFT</td>
            <td>17</td>
          </tr>
          <tr>
            <td>COUNTRY_NOT_SUPPORTED</td>
            <td>This transaction cannot be processed due to an unsupported country</td>
            <td>HARD</td>
            <td>-</td>
          </tr>
          <tr>
            <td>CURRENCY_NOT_ALLOWED</td>
            <td>Currency not allowed </td>
            <td>HARD</td>
            <td>-</td>
          </tr>
					<tr>
            <td>DECLINED_BY_BANK</td>
            <td>Rejected by the bank. Refer to card issuer</td>
            <td>SOFT</td>
            <td>-</td>
          </tr>
          <tr>
            <td>DECLINED_BY_PROVIDER</td>
            <td>Rejected by the provider. Refer to the provider_data</td>
            <td>SOFT</td>
            <td>-</td>
          </tr>
          <tr>
            <td>DISABLED</td>
            <td>Restricted card</td>
            <td>SOFT</td>
            <td>-</td>
          </tr>
          <tr>
            <td>DO_NOT_HONOR</td>
            <td>Do not honor</td>
            <td>SOFT</td>
            <td>5</td>
          </tr>
          <tr>
            <td>DUPLICATED_TRANSACTION</td>
            <td>Duplicate transmission of the transaction</td>
            <td>SOFT</td>
            <td>26,94</td>
          </tr>
          <tr>
            <td>EXPIRED</td>
            <td>Expired alternative payment method</td>
            <td>SOFT</td>
            <td></td>
          </tr>
          <tr>
            <td>EXPIRED_CARD</td>
            <td>Expired card</td>
            <td>HARD</td>
            <td>33,54</td>
          </tr>
          <tr>
            <td>FIRST_USE</td>
            <td>Blocked first use</td>
            <td>SOFT</td>
            <td>78</td>
          </tr>
          <tr>
            <td>FRAUD_VALIDATION</td>
            <td>Security violation</td>
            <td>SOFT</td>
            <td>34, 59, 63, 64</td>
          </tr>
          <tr>
            <td>FRAUD_VERIFICATION_DECLINED</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>INSUFFICIENT_FUNDS</td>
            <td>Not sufficient funds </td>
            <td>SOFT</td>
            <td>51</td>
          </tr>
          <tr>
            <td>INVALID_AMOUNT</td>
            <td>Invalid amount</td>
            <td>SOFT</td>
            <td>13,64</td>
          </tr>
          <tr>
            <td>INVALID_CARD_DATA</td>
            <td>Card does not match the parameters from the issuer.</td>
            <td>HARD</td>
            <td>56</td>
          </tr>
          <tr>
            <td>INVALID_CARD_NUMBER</td>
            <td>Card does not match the parameters from the issuer.</td>
            <td>HARD</td>
            <td>14</td>
          </tr>
          <tr>
            <td>INVALID_API</td>
            <td>Trying to verify the payment with an unauthorized IP address</td>
            <td>HARD</td>
            <td>-</td>
          </tr>
          <tr>
            <td>INVALID_API_VERSION</td>
            <td>Invalid API version</td>
            <td>HARD</td>
            <td>-</td>
          </tr>
          <tr>
            <td>INVALID_CREDENTIALS</td>
            <td>Fraud provider invalid credentials set in Yuno.</td>
            <td>HARD</td>
            <td>-</td>
          </tr>
          <tr>
            <td>INVALID_ISSUER</td>
            <td>Invalid issuer</td>
            <td>SOFT</td>
            <td>15</td>
          </tr>
          <tr>
            <td>INVALID_MERCHANT</td>
            <td>Invalid merchant or service provider</td>
            <td>SOFT</td>
            <td>3</td>
          </tr>
          <tr>
            <td>INVALID_PARAMETERS</td>
            <td>Invalid parameters</td>
            <td>HARD</td>
            <td>-</td>
          </tr>
          <tr>
            <td>INVALID_SECURITY_CODE</td>
            <td>Invalid card's security code</td>
            <td>HARD</td>
            <td>56,82</td>
          </tr>
          <tr>
            <td>INVALID_STATUS</td>
            <td>Invalid status</td>
            <td>SOFT</td>
            <td>-</td>
          </tr>
          <tr>
            <td>INVALID_RESPONSE_FORMAT</td>
            <td>The response body returned by the provider has an invalid format</td>
            <td>SOFT</td>
            <td>-</td>
          </tr>
          <tr>
            <td>INVALID_TRANSACTION</td>
            <td>The transaction being attempted is invalid</td>
            <td>HARD</td>
            <td>12,23</td>
          </tr>
          <tr>
            <td>ISSUER_VIOLATION</td>
            <td>The issuing bank rejected the transaction due to some violation related to the account.</td>
            <td>SOFT</td>
            <td>93</td>
          </tr>
          <tr>
            <td>MISSING_PARAMETERS</td>
            <td>Missing parameters</td>
            <td>HARD</td>
            <td>-</td>
          </tr>
          <tr>
            <td>NO_RETRY_LIFE_CYCLE</td>
            <td>No retry life cycle</td>
            <td>HARD</td>
            <td>79</td>
          </tr>
          <tr>
            <td>NO_RETRY_POLICY</td>
            <td>No retry policy</td>
            <td>HARD</td>
            <td>82</td>
          </tr>
          <tr>
            <td>NO_RETRY_SECURITY</td>
            <td>No retry security</td>
            <td>HARD</td>
            <td>83</td>
          </tr>
          <tr>
            <td>RETRY_AFTER_1_H</td>
            <td>Retry after 1 hours</td>
            <td>HARD</td>
            <td></td>
          </tr>
          <tr>
            <td>RETRY_AFTER_24_H</td>
            <td>Retry after 24 hours</td>
            <td>HARD</td>
            <td></td>
          </tr>
          <tr>
            <td>RETRY_AFTER_2_D</td>
            <td>Retry after 2 days</td>
            <td>HARD</td>
            <td></td>
          </tr>
          <tr>
            <td>RETRY_AFTER_4_D</td>
            <td>Retry after 4 days</td>
            <td>HARD</td>
            <td></td>
          </tr>
          <tr>
            <td>RETRY_AFTER_6_D</td>
            <td>Retry after 6 days</td>
            <td>HARD</td>
            <td></td>
          </tr>
          <tr>
            <td>RETRY_AFTER_8_D</td>
            <td>Retry after 8 days</td>
            <td>HARD</td>
            <td></td>
          </tr>
          <tr>
            <td>RETRY_AFTER_10_D</td>
            <td>Retry after 10 days</td>
            <td>HARD</td>
            <td></td>
          </tr>
          <tr>
            <td>REJECTED_THREE_D_SECURE_REQUIRED</td>
            <td>3DS validation rejection</td>
            <td>SOFT</td>
            <td>-</td>
          </tr>
          <tr>
            <td>REPORTED_LOST</td>
            <td>Lost card</td>
            <td>HARD</td>
            <td>41</td>
          </tr>
          <tr>
            <td>REPORTED_STOLEN</td>
            <td>Stolen card, pick-up</td>
            <td>HARD</td>
            <td>43</td>
          </tr>
          <tr>
            <td>REQUESTS_EXCEEDED</td>
            <td>Requests limit for the provider account reached.</td>
            <td>SOFT</td>
            <td>-</td>
          </tr>
          <tr>
            <td>RESTRICTED_BY_BANK</td>
            <td>Rejected by the bank. Refer to card issuer's special conditions</td>
            <td>SOFT</td>
            <td>62</td>
          </tr>
          <tr>
            <td>TERMINAL_ERROR</td>
            <td>Your merchant account is not properly configured for the transaction</td>
            <td>SOFT</td>
            <td>58</td>
          </tr>
          <tr>
            <td>TRANSACTION_NOT_FOUND</td>
            <td>Transaction not found</td>
            <td>HARD</td>
            <td>25</td>
          </tr>
          <tr>
            <td>UNAVAILABLE_PAYMENT_METHOD</td>
            <td>Requested function not supported</td>
            <td>HARD</td>
            <td>-</td>
          </tr>
          <tr>
            <td>UNSUPPORTED_OPERATION</td>
            <td>Requested function not supported</td>
            <td>HARD</td>
            <td>40</td>
          </tr>
          <tr>
            <td>UNKNOWN_ERROR</td>
            <td>Unknown error</td>
            <td>SOFT</td>
            <td>-</td>
          </tr>
          <tr>
            <td>USER_RESTRICTION</td>
            <td>Transaction not permitted for cardholder</td>
            <td>HARD</td>
            <td>57</td>
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
  <details open class="table-card">
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
            <th>response_code</th>
            <th>Description</th>
            <th>Hard/Soft decline</th>
            <th>ISO 8583 code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>COUNTRY_NOT_SUPPORTED</td>
            <td>-</td>
            <td>HARD</td>
            <td>-</td>
          </tr>
          <tr>
            <td>CURRENCY_NOT_ALLOWED</td>
            <td>-</td>
            <td>HARD</td>
            <td>-</td>
          </tr>
          <tr>
            <td>INVALID_PARAMETERS</td>
            <td>-</td>
            <td>HARD</td>
            <td>-</td>
          </tr>
          <tr>
            <td>INVALID_REQUEST</td>
            <td>-</td>
            <td>HARD</td>
            <td>-</td>
          </tr>
          <tr>
            <td>INTERNAL_ERROR</td>
            <td>-</td>
            <td>HARD</td>
            <td>-</td>
          </tr>
          
          <tr>
            <td>MISSING_PARAMETERS</td>
            <td>-</td>
            <td>HARD</td>
            <td>-</td>
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
  <details open class="table-card">
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
            <th>response_code</th>
            <th>Description</th>
            <th>Hard/Soft decline</th>
            <th>ISO 8583 code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ERROR</td>
            <td>Unknown internal error</td>
            <td>SOFT</td>
            <td>-</td>
          </tr>
          <tr>
            <td>PROVIDER_ERROR</td>
            <td>Error. An unknown error occurred during the authorization</td>
            <td>SOFT</td>
            <td>6</td>
          </tr>
          <tr>
            <td>PROVIDER_INTERNAL_ERROR</td>
            <td>Internal error</td>
            <td>SOFT</td>
            <td>98</td>
          </tr>
          <tr>
            <td>PROVIDER_INVALID_CREDENTIALS</td>
            <td>Invalid credentials</td>
            <td>HARD</td>
            <td>-</td>
          </tr>
          <tr>
            <td>PROVIDER_INVALID_REQUEST</td>
            <td>Invalid request</td>
            <td>HARD</td>
            <td>-</td>
          </tr>
          <tr>
            <td>PROVIDER_TIMEOUT</td>
            <td>Response received too late</td>
            <td>SOFT</td>
            <td>68</td>
          </tr>
          <tr>
            <td>PROVIDER_UNKNOWN_ERROR</td>
            <td>Unknown error</td>
            <td>SOFT</td>
            <td>-</td>
          </tr>
          <tr>
            <td>OPERATION_NOT_SUPPORTED</td>
            <td>Provider does not support this operation</td>
            <td>HARD</td>
            <td>-</td>
          </tr>
          <tr>
            <td>TO_REVERSE</td>
            <td>The transaction will be reversed</td>
            <td>HARD</td>
            <td>-</td>
          </tr>
          <tr>
            <td>PROVIDER_INVALID_RESPONSE</td>
            <td>Invalid response</td>
            <td>HARD</td>
            <td>20</td>
          </tr>
          <tr>
            <td>PROVIDER_INVALID_API_VERSION</td>
            <td>Invalid API version</td>
            <td>HARD</td>
            <td>-</td>
          </tr>

          
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

### Expired status

<HTMLBlock>{`
<body>
  <details open class="table-card">
    <summary>
      <span class="table-call"><code>EXPIRED</code> status details </span>
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
            <th>response_code</th>
            <th>Description</th>
            <th>Hard/Soft decline</th>
            <th>ISO 8583 code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EXPIRED_BY_PROVIDER</td>
            <td>-</td>
            <td>N/A</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

### Lost status

<HTMLBlock>{`
<body>
  <details open class="table-card">
    <summary>
      <span class="table-call"><code>LOST</code> status details </span>
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
            <th>response_code</th>
            <th>Description</th>
            <th>Hard/Soft decline</th>
            <th>ISO 8583 code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CLOSED</td>
            <td>-</td>
            <td>N/A</td>
            <td>-</td>
          </tr>
          <tr>
            <td>EXPIRED</td>
            <td>-</td>
            <td>N/A</td>
            <td>-</td>
          </tr>
          <tr>
            <td>PARTIALLY_CHARGEBACKED</td>
            <td>-</td>
            <td>N/A</td>
            <td>-</td>
          </tr>
          <tr>
            <td>REVIEW_LOST</td>
            <td>The Chargeback dispute was lost </td>
            <td>N/A</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

***

### Chargebacks specific response\_codes

For more details, please refer to the [reason codes page](https://docs.y.uno/docs/reason-codes-copy) in the [Chargeback guides](https://docs.y.uno/docs/chargeback-management) section. 

<HTMLBlock>{`
<body>
  <details open class="table-card">
    <summary>
      <span class="table-call"><code>CREATED</code> status details </span>
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
            <th>response_code</th>
            <th>response_message</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EMV_LIABILITY_SHIFT_COUNTERFEIT</td>
            <td>EMV Liability Shift Counterfeit Fraud	</td>
            <td>Fraud</td>
            <td>The cardholder is claiming that they did not authorize or participate in a transaction that you processed.
</td>
          </tr>
          <tr>
            <td>EMV_LIABILITY_SHIFT_NOT_COUNTERFEIT</td>
            <td>EMV Liability Shift Non-Counterfeit Fraud</td>
            <td>Fraud</td>
            <td>The cardholder is claiming that they did not authorize or participate in a transaction that you processed.</td>
          </tr>
          <tr>
            <td>CARD_PRESENT_FRAUD</td>
            <td>Other Fraud – Card-Present Environment</td>
            <td>Fraud</td>
            <td>The cardholder is claiming that they did not authorize or participate in a key-entered or unattended transaction conducted in a card-present environment.
</td>
          </tr>
          <tr>
            <td>NON_CARD_PRESENT_FRAUD</td>
            <td>Other Fraud – Card-Absent Environment </td>
            <td>Fraud</td>
            <td>The cardholder did not authorize or participate in a transaction conducted in a card-not-present environment, such as internet, mail-order, phone-order, and others.</td>
          </tr>
          <tr>
            <td>SCHEME_MONITORING_PROGRAM</td>
            <td>Other Fraud - Scheme Monitoring Program </td>
            <td>Fraud</td>
            <td>Scheme Fraud Monitoring program</td>
          </tr>
          <tr>
            <td>NO_AUTHORIZATION</td>
            <td>No Authorization </td>
            <td>Authorization</td>
            <td>Correct and valid authorization was not obtained by the merchant.</td>
          </tr>
          <tr>
            <td>DECLINED_AUTHORIZATION</td>
            <td>Declined Authorization </td>
            <td>Authorization</td>
            <td>Authorization request received a Decline response and the merchant completed the transaction.</td>
          </tr>
          <tr>
            <td>LATE_PRESENTMENT</td>
            <td>Late Presentment </td>
            <td>Processing Errors</td>
            <td>The transaction was not sent to Visa within the timeframe required.</td>
          </tr>
          <tr>
            <td>INCORRECT_TRANSACTION_CODE</td>
            <td>Incorrect Transaction Code</td>
            <td>Processing Errors</td>
            <td>The cardholder is claiming that the converted amount of charge on an international transaction is incorrect.</td>
          </tr>
          <tr>
            <td>INCORRECT_CURRENCY</td>
            <td>Incorrect Currency</td>
            <td>Processing Errors</td>
            <td>The merchant made one or more errors related to the transaction currency</td>
          </tr>
          <tr>
            <td>INCORRECT_ACCOUNT_NUMBER</td>
            <td>Incorrect Account Number</td>
            <td>Processing Errors</td>
            <td>The account number in the authorization does not match the account number used in the transaction.</td>
          </tr>
          <tr>
            <td>INCORRECT_AMOUNT</td>
            <td>Incorrect Amount</td>
            <td>Processing Errors</td>
            <td>The cardholder is claiming that the amount they agreed to pay differs from the amount charged.</td>
          </tr>
           <tr>
            <td>DUPLICATE_PROCESSING</td>
            <td>Duplicate Processing/Paid by Other Means</td>
            <td>Processing Errors</td>
            <td>A single transaction was processed two or more times.</td>
          </tr>
           <tr>
            <td>INVALID_DATA</td>
            <td>Invalid Data</td>
            <td>Processing Errors</td>
            <td>The authorization was obtained using invalid or incorrect data.</td>
          </tr>
           <tr>
            <td>PRODUCT_OR_SERVICE_NOT_RECEIVED</td>
            <td>Merchandise/Services Not Received</td>
            <td>Customer Disputes</td>
            <td>The cardholder is claiming that merchandise or services that they ordered were not received.</td>
          </tr>
           <tr>
            <td>CANCELED_RECURRING_TRANSACTION</td>
            <td>Cancelled Recurring Transaction	</td>
            <td>Customer Disputes</td>
            <td>A recurring transaction was processed after it was cancelled.</td>
          </tr>
           <tr>
            <td>PRODUCT_OR_SERVICE_ISSUE</td>
            <td>Not as Described or Defective Merchandise/Services</td>
            <td>Customer Disputes</td>
            <td>The cardholder is claiming the goods were not as described.</td>
          </tr>
          <tr>
            <td>COUNTERFEIT_MERCHANDISE</td>
            <td>Counterfeit Merchandise	</td>
            <td>Customer Disputes</td>
            <td>The merchandise was identified as counterfeit.</td>
          </tr>
          <tr>
            <td>MISREPRESENTATION</td>
            <td>Misrepresentation</td>
            <td>Customer Disputes</td>
            <td>The cardholder’s bank received a notice from the cardholder is claiming misrepresented terms of sale.</td>
          </tr>
          <tr>
            <td>CREDIT_NOT_PROCESSED</td>
            <td>Credit Not Processed</td>
            <td>Customer Disputes</td>
            <td>The cardholder’s bank received a notice from the cardholder claiming that they received authorization, credit or voided transaction receipt that has not been processed.</td>
          </tr>
          <tr>
            <td>PRODUCT_OR_SERVICE_CANCELED</td>
            <td>Cancelled Merchandise/Services	 </td>
            <td>Customer Disputes</td>
            <td>The cardholder’s bank received a notice from the cardholder stating that they returned merchandise or cancelled services, but the credit has not appeared on the cardholder’s Visa statement.</td>
          </tr>
          <tr>
            <td>ORIGINAL_TRANSACTION_NOT_ACCEPTED</td>
            <td>Original Credit Transaction Not Accepted	</td>
            <td>Customer Disputes</td>
            <td>The original credit was not accepted.</td>
          </tr>
           <tr>
            <td>CASH_TRANSACTION_VALUE</td>
            <td>Non-Receipt of Cash or Load Transaction Value	</td>
            <td>Customer Disputes</td>
            <td>Cardholder did not receive the full cash withdrawal at an ATM.</td>
          </tr>
          
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>
