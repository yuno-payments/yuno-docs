---
title: Authentication credentials (OLD)
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
All Yuno API requests require API credentials to verify the call is being made through a valid Yuno account.

## Environments

You can interact with the Yuno API using the following environments: Sandbox and Production.

### Sandbox

This is a controlled development environment in which our users are able to carry out tests during the implementation. When performing tests in Sandbox, they do not have any effects on live data and accounting, since the data used during the test mode is false.

The base URL used for the Yuno API running in the Sandbox environment is formatted as shown below:

```curl c
https://api-sandbox.y.uno/
```

### Production

This is the environment where real events occur, affecting accounting and metrics. This environment is consumed once the integration tests have finished and it is time to open it to the public.

```curl
https://api.y.uno/
```

## API credentials details

| Credential         | Type   | Description                                     |
| :----------------- | :----- | :---------------------------------------------- |
| account\_id        | String | Account identification code.                    |
| public-api-key     | String | API key necessary to authenticate your request. |
| private-secret-key | String | API key necessary to authenticate your request. |

## Getting your API credentials

Yuno provides two different API credentials for users, one to access the Yuno API in the Sandbox  environment and another for the Production environment. The authentication process for both environments is the same, but you will use different credentials for each one. For a deeper explanation of the authentication used by Yuno, please, refer to [Authentication](ref:authentication).

After creating your Yuno account, you immediately have access to the Sandbox credential. Production credentials are generated after activating your account.

### Accessing sandbox credentials

First, go to the  [Yuno Merchant Dashboard](https://dashboard.y.uno/) and sign up or login if you already have an account.  Once logged in, click on the "Go to Developers" button to access your Sandbox API keys.

<Image align="center" src="https://files.readme.io/d883625-get_API_1.png" />

On the Developers page, you find the `public-api-key`, `private-secret-key`, and  `account_code`, used to authenticate your requests to the Yuno API:

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/getYourAPICredentials/get_API_2.png" />

> 📘 Important
>
> The account creation allows you to test payments but does not guarantee that you will be able to process live payments until the account is activated.

### Accessing production credentials

To have access to your Production credentials, first, you must activate your account. 

Afterward activating your account, you should go to the [Yuno Merchant Dashboard](https://dashboard.y.uno/). On the Yuno Dashboard Home page, you must turn off the **Test mode** using the toggle switch at the top of the page. After turning off the Test mode, your status will change to **Active status**, indicating that you can access your Production credentials:

<Image align="center" src="https://files.readme.io/7c3700f-get_API_3.png" />

With the Status active, you can click on the **Developers** tab on the left panel to access your Production credentials.

> 📘 Important
>
> Notice that your `account_code` and API keys are different for Sandbox and Production environments.

<HTMLBlock>{`
<style>
  .navigation-button-shelf {
    margin: 0 0 0 0;
    display: flex;
    justify-content: flex-end;
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
  <br />
  <br />
  <section class="navigation-button-shelf">
    <div class="navigation-button" onclick="window.location='set-up-initial-connections';">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-braces"
        viewBox="0 0 16 16">
        <path
          d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6z" />
      </svg>
      <h4>
        Set up initial connections
      </h4>
    </div>
  </section>
</body>
`}</HTMLBlock>
