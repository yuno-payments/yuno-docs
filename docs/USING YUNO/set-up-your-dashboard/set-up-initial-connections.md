---
title: Connections (old)
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
## Connections settings

To start testing the API, you need to create a connection with a payment method or a payment processor.

In the following, you find a guide on how to add a connection using the Yuno Merchant Dashboard.

1. First, access your [Yuno Merchant Dashboard](https://auth.y.uno/u/login?state=hKFo2SB1dGdwd0VYZWxrOHpaLVdWck5FYWYtaW5GN0hhM25MNaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIExidWxTMDRSNG5qYnZQQklTN3JtY0hyME5fZDBRa25xo2NpZNkgbGNIOEVyS3A3UUl2Tkx1Y0JUOXpEQlhrbXlaN25CSnc) account and then select the option **Connections**.

![](https://files.readme.io/5943694-initial-connections-01.png)

2. After that, you will see available payment methods and payment processors orchestrated by Yuno for you.

<Image align="center" src="https://files.readme.io/039600a-set_up_conn_2.png" />

By selecting a connection and clicking on **More info**, you can access information about the connection capabilities, compatibility, location coverage, and accepted currencies. The following image presents the dLocal Connection details as an example.

<Image align="center" src="https://files.readme.io/13c6b4b-set_up_conn_3.png" />

3. The next step is to connect the desired payment method or payment processor. Thus, click on **Connect** for the desired connection and a sidebar will show up, so you can provide the required credentials. Each payment method or processor may require different credentials, as shown in the following images for the dLocal and Mercado Pago.

<Image align="center" src="https://files.readme.io/58a1df8-set_up_conn_4.png" />

4. After providing valid credentials, Yuno will perform the connection with the selected payment method or processor. The connection will show up on the **Your connections** tab if no problems were found while connecting, where you have the option to edit or archive connections.

<Image align="center" src="https://files.readme.io/a910ef1-set_up_conn_5.png" />

<HTMLBlock>{`
<style>
  .navigation-button-shelf {
    margin: 0 0 0 0;
    display: flex;
    justify-content: space-between;
  }

  .navigation-button {
    padding: 0.3rem;
    
    border-radius: 5px;
    border: 1px solid  var(--yuno-purple);
    transition: transform .2s;
    display: flex;
    flex-direction: row;
  }

  .navigation-button:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 5px  var(--yuno-purple-10);
    cursor: pointer;
  }

  .navigation-button svg {
    color: var(--yuno-purple);
    height: 25px;
    width: 25px;
  }

  .navigation-button h4 {
    font-size: 0.8rem;
    color:  var(--yuno-purple);
    margin: 0 0 0 10px;
    display: flex;
    align-items: center;
  }

  @media only screen and (max-width: 600px) {
    .navigation-button h4 {
      font-size: 0.7rem;
    }

    .navigation-button svg {
      color:  var(--yuno-purple);
      height: 20px;
      width: 20px;
    }
  }
  
  nav.Pagination1KE9HXCXYd0E {
    display: none !important;
  }
  
  /* ------------------------ define the configuration for DARK Mode ------------------------  */

  @media (prefers-color-scheme: dark) {
    .navigation-button {
      border: 1px solid  var(--yuno-purple-50);
    }

    .navigation-button:hover {
      box-shadow: none ;
    }

    .navigation-button svg {
      color: var(--yuno-purple-50);
    }

    .navigation-button h4 {
      color:  var(--yuno-purple-50);
    }
  }

  [data-color-mode="dark"] .navigation-button {
      border: 1px solid  var(--yuno-purple-50);
    }

  [data-color-mode="dark"] .navigation-button:hover {
    	box-shadow: none ;
    }

  [data-color-mode="dark"] .navigation-button svg {
      color: var(--yuno-purple-50);
    }

  [data-color-mode="dark"] .navigation-button h4 {
      color:  var(--yuno-purple-50);
    }
</style>

<body>
  <br/>
  <br/>
  <section class="navigation-button-shelf">
    <div class="navigation-button" onclick="window.location='get-your-api-credentials';">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-key-fill"
        viewBox="0 0 16 16">
        <path
          d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      </svg>
      <h4>
        Get your API credentials
      </h4>
    </div>

    
		<div class="navigation-button" onclick="window.location='configure-dynamic-routing';">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-bezier2"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M1 2.5A1.5 1.5 0 0 1 2.5 1h1A1.5 1.5 0 0 1 5 2.5h4.134a1 1 0 1 1 0 1h-2.01c.18.18.34.381.484.605.638.992.892 2.354.892 3.895 0 1.993.257 3.092.713 3.7.356.476.895.721 1.787.784A1.5 1.5 0 0 1 12.5 11h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5H6.866a1 1 0 1 1 0-1h1.711a2.839 2.839 0 0 1-.165-.2C7.743 11.407 7.5 10.007 7.5 8c0-1.46-.246-2.597-.733-3.355-.39-.605-.952-1-1.767-1.112A1.5 1.5 0 0 1 3.5 5h-1A1.5 1.5 0 0 1 1 3.5v-1zM2.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10 10a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
      </svg>
      <h4>
        Configure Dynamic Routing
      </h4>
    </div>
  </section>
</body>
`}</HTMLBlock>
