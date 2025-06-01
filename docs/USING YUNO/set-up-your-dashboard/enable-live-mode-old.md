---
title: Enable live mode (old)
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
## Going live

Once you have access to your credentials, configured payment connections, and successfully tested all functionalities in sandbox environment, you are ready to enable live mode.

### Enable live mode

1. First, you must activate your account by clicking on **Activate account** in the [Yuno Merchant Dashboard](https://dashboard.y.uno/).

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/enableLiveMode/enable_live1.png" />

> 📘 Note
>
> The account activation process requires you to provide some profile information and may take 2-4 weeks. In case of any problems, please get in touch with <a href="mailto:support@y.uno">Yuno support</a>. Meanwhile, you can continue using the sandbox environment for testing.

2. After starting the activation process, your Dashboard status will change to **Verifying account status**.

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/enableLiveMode/enable_live2.png" />

3. Once activation is completed, Yuno will contact you, and you will have access to your **Production** environment credentials. Thus, you can switch to the Production environment through your Merchant Dashboard:

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/enableLiveMode/enable_live3.png" />

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
  <br />
  <br />
  <section class="navigation-button-shelf">
    <div class="navigation-button" onclick="window.location='make-a-test-payment';">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-credit-card"
        viewBox="0 0 16 16">
        <path
          d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
        <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
      </svg>
      <h4>
        Make a test payment
      </h4>
    </div>
  </section>
</body>
`}</HTMLBlock>
