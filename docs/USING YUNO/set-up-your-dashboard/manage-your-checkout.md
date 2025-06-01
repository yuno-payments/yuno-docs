---
title: Checkout builder (old)
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
Yuno provides an intuitive graphical interface so that you can easily define the available payments for your customers without going deep into the code.

<Image align="center" src="https://files.readme.io/5a0a03a-manage_checkout_view.png" />

After [configuring your connections](docs:set-up-initial-connections) with payment methods and payment processors, you can decide which one you will make available to your customers. The connected methods and processors will be available on [Yuno Merchant Dashboard](https://auth.y.uno/u/login?state=hKFo2SB1dGdwd0VYZWxrOHpaLVdWck5FYWYtaW5GN0hhM25MNaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIExidWxTMDRSNG5qYnZQQklTN3JtY0hyME5fZDBRa25xo2NpZNkgbGNIOEVyS3A3UUl2Tkx1Y0JUOXpEQlhrbXlaN25CSnc). You can toggle a switch to make them available for users instead of going deep into the code. Thus, you can easily add or remove payment methods that make sense to your company.

In the following step-by-step, you find a guide on how to make checkout methods available using the Yuno Merchant Dashboard.

1. First, access your [Yuno Merchant Dashboard](https://auth.y.uno/u/login?state=hKFo2SB1dGdwd0VYZWxrOHpaLVdWck5FYWYtaW5GN0hhM25MNaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIExidWxTMDRSNG5qYnZQQklTN3JtY0hyME5fZDBRa25xo2NpZNkgbGNIOEVyS3A3UUl2Tkx1Y0JUOXpEQlhrbXlaN25CSnc) account and then select the option '**Checkout builder**'.

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/manageYourCheckout/manage_checkout2.png" />

2. When you access the '**Checkout builder**' page, you find all payment methods already connected and created routes. Thus, if you do not see the desired payment method, please ensure you have successfully connected and published a route for it by accessing the **Connections** and **Routes** pages.

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/manageYourCheckout/manage_checkout3.png" />

3. Select the integration type desired by choosing between '**Embedded**', '**Semi-lite**', and '**Lite**'. These options enable you to customize and control the checkout experience, selecting the one that best suits your demands:

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/manageYourCheckout/manage_checkout4.png" />

* **Embedded**: This is the easiest way to build your checkout. — Low-code integration that you won't have to touch when adding new payment methods.
* **Semi-lite**: If you need more customization, this is another type of integration available for your checkout. With this version, you will use your own user interface but manage the conditions of when to display a payment method through the dashboard.
* **Lite**:  For more flexibility, Yuno offers a lighter version that will allow you to use your own user interface and set conditions of when to display a payment method while still having our checkout support.

4. After checking the available payment methods and selecting the integration methods, it's time to define which payment methods will be available for users. By simply clicking on the toggle switch, the respective method shows up on the right panel and becomes available for users. **IMPORTANT**: the right panel provides a pre-visualization of your checkout payment methods. It does not affect your checkout.

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/manageYourCheckout/manage_checkout5.png" />

5. The next step is to define the conditions for each selected payment. A panel will show up by clicking on the menu icon on the right of the toggle switch. In the panel, you can define the countries where the payment method will be available, the accepted currencies, configure the metadata and add additional fields.

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/manageYourCheckout/manage_checkout6.png" />

> 📘 Important
>
> Please, note that only the configured payment methods will be published in your checkout.

> 📘 Important
>
> Make sure that the payment methods have a route created and published. Payment methods that do not have a routing will decline payments. Access [Configure dynamic routes](ref:configure-dynamic-routing) to learn how to set up payment methods rounting.

6. After selecting the payment methods and defining the conditions for each one, you should click on '**Publish**' to complete the Checkout Builder configuration.

<Image align="center" src="https://files.readme.io/c4376db-manage_checkout7.png" />

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
