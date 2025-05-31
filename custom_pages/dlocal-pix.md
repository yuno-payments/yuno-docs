---
title: dLocal - PIX
fullscreen: false
hidden: false
metadata:
  title: ''
  description: ''
---
<HTMLBlock>{`
<style>
  #content {
    margin: 30px 0;
  }
  #content-head {
  	border-bottom: 1px solid var(--color-border-default);
  	padding-bottom: 30px;
  }
  #content-container {
      max-width: 800px !important;
  }
  .markdown-body {
    padding-top: 15px;
  }
</style>
`}</HTMLBlock>

This page presents all information related to the dLocal connection using Pix as the payment method. Use the following buttons to navigate to the desired section.

<HTMLBlock>{`
<body>
  <section class="starting_cards">
    <div class="methods_cards_shelf">
      <a class="item" onclick="window.location='dlocal-pix#general-information';">
        <div class="content">
          <h4>General Information</h4>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32" fill="none">
            <path d="M24.75 8V21C24.75 21.1989 24.671 21.3897 24.5303 21.5303C24.3896 21.671 24.1989 21.75 24 21.75C23.8011 21.75 23.6103 21.671 23.4696 21.5303C23.329 21.3897 23.25 21.1989 23.25 21V9.81L8.52997 24.53C8.38779 24.6625 8.19975 24.7346 8.00545 24.7312C7.81115 24.7277 7.62576 24.649 7.48835 24.5116C7.35093 24.3742 7.27222 24.1888 7.26879 23.9945C7.26537 23.8002 7.33749 23.6122 7.46997 23.47L22.19 8.75H11C10.8011 8.75 10.6103 8.67098 10.4696 8.53033C10.329 8.38968 10.25 8.19891 10.25 8C10.25 7.80109 10.329 7.61032 10.4696 7.46967C10.6103 7.32902 10.8011 7.25 11 7.25H24C24.1989 7.25 24.3896 7.32902 24.5303 7.46967C24.671 7.61032 24.75 7.80109 24.75 8Z"/>
          </svg>
        </div>
      </a>    
      <a class="item" onclick="window.location='dlocal-pix#testing-guidelines-for-sandbox-environment';">
        <div class="content">
          <h4>Testing Guidelines</h4>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32" fill="none">
            <path d="M24.75 8V21C24.75 21.1989 24.671 21.3897 24.5303 21.5303C24.3896 21.671 24.1989 21.75 24 21.75C23.8011 21.75 23.6103 21.671 23.4696 21.5303C23.329 21.3897 23.25 21.1989 23.25 21V9.81L8.52997 24.53C8.38779 24.6625 8.19975 24.7346 8.00545 24.7312C7.81115 24.7277 7.62576 24.649 7.48835 24.5116C7.35093 24.3742 7.27222 24.1888 7.26879 23.9945C7.26537 23.8002 7.33749 23.6122 7.46997 23.47L22.19 8.75H11C10.8011 8.75 10.6103 8.67098 10.4696 8.53033C10.329 8.38968 10.25 8.19891 10.25 8C10.25 7.80109 10.329 7.61032 10.4696 7.46967C10.6103 7.32902 10.8011 7.25 11 7.25H24C24.1989 7.25 24.3896 7.32902 24.5303 7.46967C24.671 7.61032 24.75 7.80109 24.75 8Z"/>
          </svg>
        </div>
      </a>
      <a class="item" onclick="window.location='dlocal-pix#integration-configuration';">
        <div class="content">
          <h4>Integration Configuration</h4>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32" fill="none">
            <path d="M24.75 8V21C24.75 21.1989 24.671 21.3897 24.5303 21.5303C24.3896 21.671 24.1989 21.75 24 21.75C23.8011 21.75 23.6103 21.671 23.4696 21.5303C23.329 21.3897 23.25 21.1989 23.25 21V9.81L8.52997 24.53C8.38779 24.6625 8.19975 24.7346 8.00545 24.7312C7.81115 24.7277 7.62576 24.649 7.48835 24.5116C7.35093 24.3742 7.27222 24.1888 7.26879 23.9945C7.26537 23.8002 7.33749 23.6122 7.46997 23.47L22.19 8.75H11C10.8011 8.75 10.6103 8.67098 10.4696 8.53033C10.329 8.38968 10.25 8.19891 10.25 8C10.25 7.80109 10.329 7.61032 10.4696 7.46967C10.6103 7.32902 10.8011 7.25 11 7.25H24C24.1989 7.25 24.3896 7.32902 24.5303 7.46967C24.671 7.61032 24.75 7.80109 24.75 8Z"/>
          </svg>
        </div>
      </a>
      
    </div>
  </section>
</body>
`}</HTMLBlock>

# Connecting with Yuno

<HTMLBlock>{`
<body>
  <div class="shelf">
    <div class=" psp-card">
      <section class="detail-psp-card ">
        <div class="detail-psp-card-content">
          <p class="label"><b>Mandatory fields when integrating via Yuno</b>:</p>
          <div class="content">
             first_name <br/> last_name <br/> email <br/> document <br/> document_type
          </div>
        </div>
      </section>
    </div>
  </div>
</body>
`}</HTMLBlock>

# General information

<HTMLBlock>{`
<body>
  <div class="shelf">
    <div class=" psp-card">
      <section class="detail-psp-card ">
        <div class="detail-psp-card-content">
          <p class="label"><b>Countries</b>:</p>
          <div class="content detail-content-countries-list">
            <div class="contry-badge">
              <div class="container-county-img">
                <img class="county-img" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/flags/brazil.png" alt="brazil-flag">
              </div>
              <span>Brazil</span>
            </div>
          </div>
        </div>
        <div class="detail-psp-card-content">
          <p class="label"><b>Currencies</b>:</p>
          <p class="content">
            BRL
          </p>
        </div>
        <!-- <div class="detail-psp-card-content">
            <p class="label"><b>Payment methods</b>:</p>
            <div class="content detail-content-countries-list payment_list">
              <div class="contry-badge">
                <div class="container-county-img payment_img">
                  <img class="county-img" src="https://icons.prod.y.uno/card_logosimbolo.png" alt="Credit card">
                </div>
                <span>Credit card</span>
              </div>              
        	</div>
        </div> -->
        <div class="detail-psp-card-content">
          <p class="label"><b>Minimum amount</b>:</p>
          <div class="content">
					  R$ 1.00 
          </div>
        </div>
        <!--<div class="detail-psp-card-content">
          <p class="label"><b>Maximum amount</b>:</p>
          <p class="content">
            N/A
          </p>
        </div>-->
        <div class="detail-psp-card-content">
          <p class="label"><b>Expiration</b>:</p>
          <p class="content">
						The payment expiration period can be set for a maximum of 6 days.
          </p>
        </div>
        <!--<div class="detail-psp-card-content">
          <p class="label"><b>TRX limit</b>:</p>
          <p class="content">
          </p>
        </div> 
        <div class="detail-psp-card-content">
          <p class="label"><b>Support of international BIN</b>:</p>
          <p class="content">
            Yes.
          </p>
        </div>
        <div class="detail-psp-card-content">
          <p class="label"><b>TRX without CVV</b>:</p>
          <p class="content">
            Yes.
          </p>
        </div>-->
        <!--<div class="detail-psp-card-content">
          <p class="label"><b>Purchase TRX in 1-Step</b>:</p>
          <p class="content">
            Yes
          </p>
        </div>-->
        <!-- <div class="detail-psp-card-content">
          <p class="label"><b>Purchase TRX in 2-Step</b>:</p>
          <p class="content">
            Yes
          </p>
        </div>
        <div class="detail-psp-card-content">
          <p class="label"><b>Support for recurrency</b>:</p>
          <p class="content">
            Yes
          </p>
        </div> 
        <div class="detail-psp-card-content">
          <p class="label"><b>Webhooks</b>:</p>
          <p class="content">
            Yes
          </p>
        </div>-->
      </section>
    </div>
  </div>
</body>
`}</HTMLBlock>

# Testing guidelines for sandbox environment

<HTMLBlock>{`
<body>
  <div class="shelf">
    <div class=" psp-card">
      <section class="detail-psp-card ">
        <div class="detail-psp-card-content">
          <p class="label"><b>Necessary fields for testing</b>:</p>
          <div class="content">
            <ul>
              <li>X-login</li>
              <li>X-Trans-Key</li>
              <li>Secret Key</li>
            </ul>
          </div>
        </div>
        <!-- <div class="detail-psp-card-content">
           <p class="label"><b>Test cards</b>:</p>
          <div class="content">
               
          </div>
        </div>
        <div class="detail-psp-card-content">
          <p class="label"><b>Limitations/Specifications for testing</b>:</p>
          <div class="content">
            
          </div>
        </div> -->
      </section>
    </div>
  </div>
</body>
`}</HTMLBlock>

# Integration configuration

<HTMLBlock>{`
<body>
  <div class="shelf">
    <div class=" psp-card">
      <section class="detail-psp-card ">
        <div class="detail-psp-card-content">
          <p class="label"><b>Credentials and steps to obtain them</b>:</p>
          <div class="content">
            There are two types of credentials, Sandbox credentials and Production credentials. <br/>
						Both credentials are available on the Merchant Dashboard. <br/>
            <ol>
              <li>Access the <b>Merchant Dashboard</b>.</li>
              <li>Use the toogle at the top to change between <b>Test</b> (Sandbox credentials) and <b>Live</b> (Production credentials) modes.</li>
              <li>Go to the <b>Settings</b>.</li>
              <li>Select <b>Integrations</b>.</li>
            </ol>
          </div>
        </div>
        <div class="detail-psp-card-content">
          <p class="label"><b>Dashboard configuration</b>:</p>
          <div class="content">
            <ol>
              <li>Log in to <a href="http://dashboard.y.uno/">dashboard.y.uno</a>.</li>
              <li>Click <b>Connections</b> and then select <b>dLocal</b>.</li>
              <li>Click <b>Connect</b>.</li>
              <li>Introduce the <b>Name</b>, <b>X-Login</b>, <b>X-Trans-Key</b>, and <b>Secret-Key</b>.</li>
              <li>Click <b>Connect</b></li>
            </ol>
          </div>
        </div>
       <!-- <div class="detail-psp-card-content">
          <p class="label"><b>Configuration of webhooks in partner</b>:</p>
          <div class="content">
            Configure the Webhook Pix in an endpoint.
            <ol>
              <li>Log in to <a href="https://dashboard.ebanx.com/">EBANX Dashboard</a>.</li>
              <li>Navigate to <b>Settings</b> and <b>Integrations</b>.</li>
              <li>Enter the proper URLs to receive notifications with updates of a transaction..</li>
            </ol>
          </div>
        </div>-->
      </section>
    </div>
  </div>
</body>
`}</HTMLBlock>
