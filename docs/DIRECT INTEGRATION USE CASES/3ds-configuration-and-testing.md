---
title: 3DS Configuration and Testing
deprecated: false
hidden: true
metadata:
  robots: index
---
Use this step-by-step guide to configure and test 3D Secure in Yuno. You’ll set up a 3DS-enabled connection and provider credentials, add 3DS to your routing, enable Card in Checkout Builder, and validate payments using either the Yuno Testing Gateway, the Yuno SDK, or the API. Scheme-specific test cards, OTP codes, and troubleshooting notes are included to verify frictionless and challenge scenarios.

## Testing cards for 3DS flow

Use the scheme-specific cards below to validate 3DS in sandbox. In the preview environment, a simulator mocks the Directory Server (DS) and Access Control Server (ACS) so you can test both frictionless and challenge outcomes. Each table shows the card number with expected 3DS2 results and 3DS1 VERes (Verification Response)/PARes (Payer Authentication Response) responses. Use the one-time password (OTP) codes at the end to complete challenge scenarios.

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
    font-size: 0.938rem;

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
    font-size: 0.85rem;
  }

  .table-card .table-div td {
    text-align: center;
  }
  
  
  .table-card .table-div table {
      display: block !important;
      overflow-x: auto !important;
    }
  
  summary table {
  width: 100%;
  table-layout: fixed;
}
  
  summary th, summary td {
  width: auto;
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
      <span class="table-call">Amex</span>
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
            <th>Card Number</th>
            <th>Expected Response 3DS 2.x</th>
            <th>Expected Response 3DS 1.x DS (VERes)</th>
            <th>Expected Response 3DS 1.x ACS (PARes)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>341502098634895</td><td>AUTHENTICATED_APPLICATION_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>348638267931507</td><td>BROWSER_CHALLENGE</td><td>ENROLLED_Y</td><td>TRANSACTION_CHALLENGE_OTP</td></tr>
          <tr><td>345695399207589</td><td>NOT_AUTHENTICATED_APPLICATION_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>349531373081938</td><td>APPLICATION_CHALLENGE</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>342316317472410</td><td>APPLICATION_CHALLENGE_SDK_TRANS_ID_INVALID_FORMAT</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>347899129656655</td><td>AUTHENTICATED_BROWSER_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>345197771649926</td><td>NOT_AUTHENTICATED_BROWSER_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>372021106351394</td><td>BROWSER_CHALLENGE</td><td>ENROLLED_Y</td><td>TRANSACTION_CHALLENGE_OTP</td></tr>
          <tr><td>3734123412340000</td><td></td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>3434567891111005</td><td></td><td>ENROLLED_Y</td><td>TRANSACTION_CHALLENGE_OTP</td></tr>
          <tr><td>3794521996036850</td><td></td><td>ENROLLED_Y</td><td>TRANSACTION_CHALLENGE_OTP</td></tr>
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
      <span class="table-call">Mastercard</span>
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
            <th>Card Number</th>
            <th>Expected Response 3DS 2.x</th>
            <th>Expected Response 3DS 1.x DS (VERes)</th>
            <th>Expected Response 3DS 1.x ACS (PARes)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>5333259155643223</td><td>AUTHENTICATED_APPLICATION_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_Y</td></tr>
          <tr><td>5306889942833340</td><td>BROWSER_CHALLENGE</td><td>ENROLLED_Y</td><td>TRANSACTION_CHALLENGE_OTP</td></tr>
          <tr><td>5328720384582224</td><td>NOT_AUTHENTICATED_APPLICATION_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>5267648608924299</td><td>APPLICATION_CHALLENGE</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>5187434643593002</td><td>APPLICATION_CHALLENGE_SDK_TRANS_ID_INVALID_FORMAT</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>5512459816707531</td><td>AUTHENTICATED_BROWSER_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_Y</td></tr>
          <tr><td>5487971631330522</td><td>NOT_AUTHENTICATED_BROWSER_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>5424184049821670</td><td>BROWSER_CHALLENGE</td><td>ENROLLED_Y</td><td>TRANSACTION_CHALLENGE_OTP</td></tr>
          <tr><td>5204240438720050123</td><td>BROWSER_CHALLENGE</td><td>ENROLLED_Y</td><td>TRANSACTION_CHALLENGE_OTP</td></tr>
          <tr><td>5250548692069390</td><td></td><td>ENROLLED_Y</td><td>TRANSACTION_CHALLENGE_OTP</td></tr>
          <tr><td>5641523891636636</td><td></td><td>ENROLLED_Y</td><td>TRANSACTION_CHALLENGE_OTP</td></tr>
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
      <span class="table-call">Visa</span>
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
            <th>Card Number</th>
            <th>Expected Response 3DS 2.x</th>
            <th>Expected Response 3DS 1.x DS (VERes)</th>
            <th>Expected Response 3DS 1.x ACS (PARes)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>4556557955726624</td><td>AUTHENTICATED_APPLICATION_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_Y</td></tr>
          <tr><td>4916994064252017</td><td>BROWSER_CHALLENGE</td><td>ENROLLED_Y</td><td>TRANSACTION_CHALLENGE_OTP</td></tr>
          <tr><td>4556104160382032</td><td>NOT_AUTHENTICATED_APPLICATION_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>4024007189449340</td><td>APPLICATION_CHALLENGE</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>4024007179872394</td><td>APPLICATION_CHALLENGE_SDK_TRANS_ID_INVALID_FORMAT</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>4929251897047956</td><td>AUTHENTICATED_BROWSER_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_Y</td></tr>
          <tr><td>4716429323842524</td><td>NOT_AUTHENTICATED_BROWSER_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>4234123412340003</td><td></td><td>ENROLLED_Y</td><td>TRANSACTION_CHALLENGE_OTP</td></tr>
          <tr><td>4604633194219929</td><td></td><td>ENROLLED_Y</td><td>TRANSACTION_CHALLENGE_OTP</td></tr>
          <tr><td>4485436455354151</td><td>BROWSER_FRICTIONLESS_MISSING_DS_TRANS_ID</td><td></td><td></td></tr>
          <tr><td>4556962659911995</td><td>APPLICATION_FRICTIONLESS_MISSING_SDK_TRANS_ID</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>4539837572943550</td><td>BROWSER_FRICTIONLESS_MISSING_DS_TRANS_ID</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>4024007176265022</td><td>BROWSER_CHALLENGE_MISSING_ACS_URL</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>4716125059847899</td><td>THREE_RI</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>4556362626719763</td><td>PROTOCOL_ERROR</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>4234123412340000</td><td></td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_Y</td></tr>
          <tr><td>4234123412340006</td><td></td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_U</td></tr>
          <tr><td>4234123412340007</td><td></td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_A</td></tr>
          <tr><td>4234123412340001</td><td></td><td>ENROLLED_N</td><td></td></tr>
          <tr><td>4234123412340002</td><td>NOT ENROLLED (VeRes is error 404 "Card account number not found in card ranges from Directory Server")</td><td>ENROLLED_N (NOT APPLICABLE)</td><td></td></tr>
          <tr><td>4234123412340100</td><td>MISSING_ROOT</td><td></td><td></td></tr>
          <tr><td>4234123412340101</td><td>MISSING_MESSAGE</td><td></td><td></td></tr>
          <tr><td>4234123412340102</td><td>INVALID_MESSAGE</td><td></td><td></td></tr>
          <tr><td>4234123412340103</td><td>MISSING_VERSION</td><td></td><td></td></tr>
          <tr><td>4234123412340104</td><td>ILLEGAL_VERSION</td><td></td><td></td></tr>
          <tr><td>4234123412340105</td><td>MISSING_URL</td><td></td><td></td></tr>
          <tr><td>4234123412340106</td><td>ILLEGAL_URL</td><td></td><td></td></tr>
          <tr><td>4234123412340107</td><td>MISSING_ENROLLED</td><td></td><td></td></tr>
          <tr><td>4234123412340108</td><td>ILLEGAL_ENROLLED</td><td></td><td></td></tr>
          <tr><td>4234123412340109</td><td>ILLEGAL_EXTENSION</td><td></td><td></td></tr>
          <tr><td>4234123412340200</td><td>ERROR_CUSTOM</td><td></td><td></td></tr>
          <tr><td>4234123412340201</td><td>ERROR_1</td><td></td><td></td></tr>
          <tr><td>4234123412340202</td><td>ERROR_2</td><td></td><td></td></tr>
          <tr><td>4234123412340203</td><td>ERROR_3</td><td></td><td></td></tr>
          <tr><td>4234123412340204</td><td>ERROR_4</td><td></td><td></td></tr>
          <tr><td>4234123412340205</td><td>ERROR_5</td><td></td><td></td></tr>
          <tr><td>4234123412340206</td><td>ERROR_6</td><td></td><td></td></tr>
          <tr><td>4234123412340220</td><td>ERROR_CUSTOM_WITH_DIFFERENT_MESSAGE_ID</td><td></td><td></td></tr>
          <tr><td>4234123412340250</td><td>ERROR_50</td><td></td><td></td></tr>
          <tr><td>4234123412340251</td><td>ERROR_51</td><td></td><td></td></tr>
          <tr><td>4234123412340252</td><td>ERROR_52</td><td></td><td></td></tr>
          <tr><td>4234123412340253</td><td>ERROR_53</td><td></td><td></td></tr>
          <tr><td>4234123412340258</td><td>ERROR_58</td><td></td><td></td></tr>
          <tr><td>4234123412340298</td><td>ERROR_98</td><td></td><td></td></tr>
          <tr><td>4234123412340299</td><td>ERROR_99</td><td></td><td></td></tr>
          <tr><td>4234123412340300</td><td>IREQ_CUSTOM</td><td></td><td></td></tr>
          <tr><td>4234123412340301</td><td>IREQ_ENROLLED_Y</td><td></td><td></td></tr>
          <tr><td>4234123412340350</td><td>IREQ_50</td><td></td><td></td></tr>
          <tr><td>4234123412340351</td><td>IREQ_51</td><td></td><td></td></tr>
          <tr><td>4234123412340352</td><td>IREQ_52</td><td></td><td></td></tr>
          <tr><td>4234123412340353</td><td>IREQ_53</td><td></td><td></td></tr>
          <tr><td>4234123412340354</td><td>IREQ_54</td><td></td><td></td></tr>
          <tr><td>4234123412340355</td><td>IREQ_55</td><td></td><td></td></tr>
          <tr><td>4234123412340356</td><td>IREQ_56</td><td></td><td></td></tr>
          <tr><td>4234123412340358</td><td>IREQ_58</td><td></td><td></td></tr>
          <tr><td>4234123412340398</td><td>IREQ_98</td><td></td><td></td></tr>
          <tr><td>4234123412340399</td><td>IREQ_99</td><td></td><td></td></tr>
          <tr><td>4234123412340400</td><td>UNSUPPORTED_VERSION</td><td></td><td></td></tr>
          <tr><td>4234123412340401</td><td>UNRECOGNIZED_CRITICAL_EXTENSION</td><td></td><td></td></tr>
          <tr><td>4234123412340402</td><td>SERVER_ERROR</td><td></td><td></td></tr>
          <tr><td>4234123412340403</td><td>TIMEOUT</td><td></td><td></td></tr>
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
      <span class="table-call">Diners</span>
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
            <th>Card Number</th>
            <th>Expected Response 3DS 2.x</th>
            <th>Expected Response 3DS 1.x DS (VERes)</th>
            <th>Expected Response 3DS 1.x ACS (PARes)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>3095000000000000</td><td>AUTHENTICATED_APPLICATION_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_Y</td></tr>
          <tr><td>3095000000000001</td><td>BROWSER_CHALLENGE</td><td>ENROLLED_Y</td><td>TRANSACTION_CHALLENGE_OTP</td></tr>
          <tr><td>3095000000000002</td><td>NOT_AUTHENTICATED_APPLICATION_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>3095000000000005</td><td>AUTHENTICATED_BROWSER_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_Y</td></tr>
          <tr><td>3095000000000006</td><td>NOT_AUTHENTICATED_BROWSER_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
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
      <span class="table-call">JCB</span>
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
            <th>Card Number</th>
            <th>Expected Response 3DS 2.x</th>
            <th>Expected Response 3DS 1.x DS (VERes)</th>
            <th>Expected Response 3DS 1.x ACS (PARes)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>3528000000000000</td><td>AUTHENTICATED_APPLICATION_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_Y</td></tr>
          <tr><td>3528000000000001</td><td>BROWSER_CHALLENGE</td><td>ENROLLED_Y</td><td>TRANSACTION_CHALLENGE_OTP</td></tr>
          <tr><td>3528000000000002</td><td>NOT_AUTHENTICATED_APPLICATION_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
          <tr><td>3528000000000005</td><td>AUTHENTICATED_BROWSER_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_Y</td></tr>
          <tr><td>3528000000000006</td><td>NOT_AUTHENTICATED_BROWSER_FRICTIONLESS</td><td>ENROLLED_Y</td><td>TRANSACTION_STATUS_N</td></tr>
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
      <span class="table-call">Ranges</span>
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
            <th>Start range</th>
            <th>End range</th>
            <th>Scheme</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>340000000000000</td><td>349999999999999</td><td>Amex</td></tr>
          <tr><td>370000000000000</td><td>379999999999999</td><td>Amex</td></tr>
          <tr><td>2221000000000000</td><td>2223000000000022</td><td>Mastercard</td></tr>
          <tr><td>2223000000000024</td><td>2720999999999999</td><td>Mastercard</td></tr>
          <tr><td>5100000000000000</td><td>5111111111111117</td><td>Mastercard</td></tr>
          <tr><td>5111111111111119</td><td>5599999999999999</td><td>Mastercard</td></tr>
          <tr><td>4000000000000000</td><td>4111110000000210</td><td>Visa</td></tr>
          <tr><td>4111110000000212</td><td>4234123412339999</td><td>Visa</td></tr>
          <tr><td>4234123412350000</td><td>4999999999999999</td><td>Visa</td></tr>
          <tr><td>3000000000000000</td><td>3099999999999999</td><td>Diners</td></tr>
          <tr><td>3528000000000000</td><td>3589009999999999</td><td>JCB</td></tr>
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
      <span class="table-call">3DS2 OTP Codes</span>
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
            <th>OTP Code</th>
            <th>Transaction Status</th>
            <th>Transaction Status reason</th>
            <th>ECI</th>
            <th>authenticationValue</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1234</td><td>Y</td><td>/</td><td>01</td><td>JAmi21makAifmwqo2120cjq1AAA=</td></tr>
          <tr><td>1111</td><td>N</td><td>01</td><td>01</td><td>/</td></tr>
          <tr><td>2222</td><td>R</td><td>01</td><td>01</td><td>/</td></tr>
          <tr><td>3333</td><td>U</td><td>01</td><td>01</td><td>/</td></tr>
          <tr><td>4444</td><td>A</td><td>01</td><td>01</td><td>Qm181okmdyqh6yQmYuq1890QAAA=</td></tr>
        </tbody>
      </table>
      <p class="content" style="margin-top:8px">The same OTP codes are valid for Visa, Mastercard and Amex scenarios.</p>
    </div>
  </details>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<body>
  <details class="table-card">
    <summary>
      <span class="table-call">3DS1 OTP Codes</span>
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
            <th>OTP Code</th>
            <th>Transaction Status</th>
            <th>CAVV</th>
            <th>CAVV Algorithm</th>
            <th>ECI</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1234</td><td>Y</td><td>VGhpcyBpcyBhIHRlc3QgYmFzZTY=</td><td>7</td><td>05</td></tr>
          <tr><td>1111</td><td>N</td><td>/</td><td>/</td><td>/</td></tr>
        </tbody>
      </table>
    </div>
  </details>
</body>
`}</HTMLBlock>

## Set up the 3D Secure connections

First, we'll set up a 3DS-enabled connection in the Yuno dashboard. Log into your dashboard and navigate to Connections. In this case, we'll use Yuno Test Payment Gateway as our provider, so we'll look for it and click **Connect**.

![](https://files.readme.io/ccc4b146d14332173c06a72ea8ed59cb6df0bdcf72785b1774553ee89f4bcd48-Screenshot_2025-09-22_at_6.58.21_PM.png)

Name the connection and enable the 3D Secure credentials checkbox. Provide the following details. If you need test credentials, contact us and we'll provide them:

* Merchant Name
* Merchant URL
* Merchant Country Code
* MCC
* Brand
* Acquirer BIN
* Acquirer Merchant ID
* Merchant ID
* Processing Channel ID (optional)
* Acquirer Country Code
* SIRET (optional)

Click **Next** to complete all steps and **Save** your connection.

Next, configure your 3DS provider (we'll use Cybersource 3DS in this example). In Connections, select the provider and click **Connect**.

Name the connection and select **3D Secure** under Integration type. Using the information from your 3DS provider, fill in:

* Organization ID
* Secret
* Shared Secret
* Transaction identification from
* Transactions expire time (minutes) (optional)

![](https://files.readme.io/4ec53ccbcaec7a23524f85b83592f06a290395d2a6edca47a6ffc03065cbea0b-Screenshot_2025-09-22_at_6.56.50_PM.png)

## Configure routing

* Navigate to Routing and find the Card route in either the Published or Not Published tab. Click **View** or **Set Up**, then **Create new route**.
* Add a step to the route: select **Cybersource 3DS** (or your provider) and click **Select**.
* Then, for the "Succeeded" path, add **Yuno Test Payment Gateway** and click **Select**.
* Click **Publish** to save your changes.

![](https://files.readme.io/48c6e666c7f9bad95b933a313c3f5b84445cb1b73fba60463c7ff8660d58aa25-Screenshot_2025-09-22_at_6.48.52_PM.png)

## Configure Checkout Builder

Navigate to Checkout Builder, enable the Card payment method, then click **Publish settings** to save your changes.

![](https://files.readme.io/fe06394e99174779ad5234e34178afd2fc2749c667cec3e7c925337d00b0ae4b-Screenshot_2025-09-22_at_6.47.38_PM.png)

## Testing 3DS with Yuno

You can test 3D Secure in three ways:

* Yuno Testing Gateway: Use the gateway configured above (sandbox only).
* Yuno SDK: Create a payment in your application using the Yuno SDK.
* Yuno API: Use the [Create Customer](ref:create-customer) and [Create Payment](ref:create-payment) endpoints to run a 3DS flow.

Refer to [Testing cards for 3DS flow](#testing-cards-for-3ds-flow) above for the test cards and OTP codes to use.
