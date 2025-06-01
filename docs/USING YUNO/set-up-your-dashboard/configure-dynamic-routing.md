---
title: Routing (old)
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
Dynamic routing is a payment orchestration technique that enhances the payment experience for users while automating the process of increasing approval rates. It involves directing payment transactions to the most suitable payment service provider or acquiring bank based on various factors such as card type, transaction amount, currency, and payment origin.

<Image align="center" src="https://files.readme.io/d292320-dynamic_route1.png" />

## Why use dynamic routing?

 Yuno, through its user-friendly [Merchant Dashboard](https://auth.y.uno/u/login?state=hKFo2SB1dGdwd0VYZWxrOHpaLVdWck5FYWYtaW5GN0hhM25MNaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIExidWxTMDRSNG5qYnZQQklTN3JtY0hyME5fZDBRa25xo2NpZNkgbGNIOEVyS3A3UUl2Tkx1Y0JUOXpEQlhrbXlaN25CSnc), offers a graphical interface for you to configure business rules for payments. Yuno's dynamic routing feature allows you to create personalized payment flows by defining validation and processing services according to your specific requirements. As a result, you can prioritize services that align with your needs, such as those with lower fees or higher approval rates.

By leveraging dynamic routing, you will enjoy several advantages:

* **Optimization:** You can optimize your payment processing strategy in response to market changes, regulatory demands, or other factors. With the ability to quickly adjust routing rules, you can seamlessly switch between PSPs or services, ensuring you will always use the best options for processing transactions.
* **Reduce costs:** Dynamic routing allows you to reduce payment processing fees significantly. By routing transactions through the most cost-effective PSP or service, you can take advantage of lower fees or better exchange rates offered by different providers for specific currencies or transaction types.
* **Mitigate frauds:** You can direct high-risk transactions to specialized fraud prevention providers or PSPs with advanced fraud detection capabilities, minimizing your exposure to fraudulent activities.
* **Processing speed:** Dynamic routing ensures efficient and speedy transaction processing. Directing transactions to the most suitable PSP or service based on transaction volume, processing capacity, or response times can enhance the overall customer experience while reducing the likelihood of transaction failures or delays.

![](https://files.readme.io/8de0d5a-smart_routing_gif.gif)

## Configuring the dynamic routing

In the following steps, you will find a guide on how to create routes to process payments using the Yuno Merchant Dashboard.

1. First, access your [Yuno Merchant Dashboard](https://auth.y.uno/u/login?state=hKFo2SB1dGdwd0VYZWxrOHpaLVdWck5FYWYtaW5GN0hhM25MNaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIExidWxTMDRSNG5qYnZQQklTN3JtY0hyME5fZDBRa25xo2NpZNkgbGNIOEVyS3A3UUl2Tkx1Y0JUOXpEQlhrbXlaN25CSnc) account and select the option **Routing**. The Routing page separates the payment by **Not published** and **Published**. In the **Not published** tab, you will find the payment methods connected to your account that don’t have a published route. 
2. After choosing the desired method, click on **Set up**. Then, the right panel will show up, and you can click on the **Create new route** to start configuring routes.

![](https://files.readme.io/6c1d336-image-1.png)

3. After clicking on **Create new route**, you can name the route you will build.

<Image align="center" src="https://files.readme.io/df7de39-dynamic_route4.png" />

4. With the route named, use the **Add new condition** button to define the condition that will trigger the payment processing route. 

<Image align="center" src="https://files.readme.io/a480fc8-dynamic_route5.png" />

5. When adding a new condition, you can select several condition types to narrow route usage. The example below uses **Country** and **Card brand** as conditions. For each condition, you need to define the values accepted. In the example below, the route will be triggered when the payment is from **Colombia** using a card with the **MasterCard** brand. After defining the conditions, click on the **Save** button.

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/ConfigureDynamicRouting/dynamic_route6.png" />

6. The new condition will appear on the screen. Now you can click on the **+** button to add further steps to the payment process route. Click on the **Add step** arrow to show the available connections.

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/ConfigureDynamicRouting/dynamic_route7.png" />

7. After clicking on **Add step**, a panel will show up presenting the available connections. You will find a list of **Fraud**, **Processors**, **Payment Methods**, and **Acquirers**. Select the necessary connections to distribute your payments and click on **Next**. In the example, both **Fraud** solutions were selected.

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/ConfigureDynamicRouting/dynamic_route8.png" />

8. Then, you need to define the percentage distribution between the selected connections. In the example, 50% of payment data will be validated using Cybersource, and the other 50% will be validated using ClearSale. After defining the distribution, click on **Done**.

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/ConfigureDynamicRouting/dynamic_route9.png" />

9. After configuring a connection, it will appear on your screen, providing paths for each possible case: **Authorized**, **Declined**, and **Error**. New steps can be connected to each case to build a complete routing that meets your demands. Below you will find an example of a complete route. After adding all steps of the payment process route, you can publish it using the **Publish** button, making it available for the respective payment method. Alternatively, you can click on the **Close and continue later** to save the route as a draft anytime.

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/ConfigureDynamicRouting/dynamic_route10.png" />

The payment method is moved to the  **Published** tab if you have published the route. When selecting the payment method, the right panel will present a list of **Published** and **Draft** routes. You can favorite, edit, and clone routes in this panel.

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/ConfigureDynamicRouting/dynamic_route11.png" />

One payment method can have several routes active to cover all your necessities. The use of each route will depend on the conditions you define when creating a route. You can always edit or archive an existing route if a problem arises.

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/ConfigureDynamicRouting/dynamic_route12.png" />

With the routing configured and the checkout selected, you are now ready to [test a payment](ref:make-a-test-payment).

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
    
    <div class="navigation-button" onclick="window.location='manage-your-checkout';">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-toggles"
        viewBox="0 0 16 16">
        <path
          d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7h-7zm7 6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm2.45 0A3.49 3.49 0 0 1 8 3.5 3.49 3.49 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5H6.95zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7z" />
      </svg>
      <h4>
        Manage your checkout
      </h4>
    </div>
  </section>
</body>

</html>
`}</HTMLBlock>
