---
title: Routing
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Routing
  description: >-
    In case you have selected our Embedded or Semi-lite checkout integrations,
    once you have set the conditions for when to display a payment method, you
    can configure the routing of the already enabled payment methods.
  robots: index
next:
  description: ''
---
## What is dynamic routing?

Dynamic routing is a payment orchestration technique that enhances users' payment experience while automating the process of increasing approval rates. It involves directing payment transactions to the most suitable payment service provider or acquiring bank based on various factors such as card type, transaction amount, currency, and payment origin. You can also use the [Smart Routing](#smart-routing) feature, which uses artificial intelligence to identify the optimal conversion rate and allocate transactions to the most suitable provider.

> 📘 Routing Configuration
>
> If you’re using our Embedded or Semi-lite checkout integrations, you can configure the routing of your enabled payment methods after setting the conditions for when each method should be displayed. However, if you’re using the Lite version, all available payment methods will be immediately accessible, allowing you to start configuring how each payment is processed.

> 📘 Route Monitoring Limitation
>
> You can't create a monitor in published routes. [Learn more](#test)

## Why use dynamic routing?

Yuno's user-friendly [dashboard](https://auth.y.uno/u/login?state=hKFo2SB1dGdwd0VYZWxrOHpaLVdWck5FYWYtaW5GN0hhM25MNaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIExidWxTMDRSNG5qYnZQQklTN3JtY0hyME5fZDBRa25xo2NpZNkgbGNIOEVyS3A3UUl2Tkx1Y0JUOXpEQlhrbXlaN25CSnc) offers a graphical interface to configure business rules for payments. Yuno's dynamic routing feature allows you to create personalized payment flows by defining validation and processing services according to your specific requirements. As a result, you can prioritize services that align with your needs, such as those with lower fees or higher approval rates.

By leveraging dynamic routing, you will enjoy several advantages:

### Optimization

You can optimize your payment processing strategy in response to market changes, regulatory demands, or other factors. By quickly adjusting routing rules, you can seamlessly switch between PSPs or services, ensuring you will always use the best options for processing transactions.

### Reduced costs

Dynamic routing allows you to significantly reduce payment processing fees. By routing transactions through the most cost-effective PSP or service, you can take advantage of lower fees or better exchange rates offered by different providers for specific currencies or transaction types.

### Fraud mitigation

You can direct high-risk transactions to specialized fraud prevention providers or PSPs with advanced fraud detection capabilities, minimizing your exposure to fraudulent activities.

### Increased processing speed

Dynamic routing ensures efficient and speedy transaction processing. Directing transactions to the most suitable PSP or service based on transaction volume, processing capacity, or response times can enhance the overall customer experience while reducing the likelihood of transaction failures or delays.

## Configuring the dynamic routing

1. First, access your [Yuno dashboard](https://auth.y.uno/u/login?state=hKFo2SB1dGdwd0VYZWxrOHpaLVdWck5FYWYtaW5GN0hhM25MNaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIExidWxTMDRSNG5qYnZQQklTN3JtY0hyME5fZDBRa25xo2NpZNkgbGNIOEVyS3A3UUl2Tkx1Y0JUOXpEQlhrbXlaN25CSnc) and go to **Routing**. The Routing section separates the payment methods by **published** and **Not published**. In the **Not published** tab, you will find the payment methods connected to your account that don’t have a published route.
2. Choose a payment method and click on **Set up**. A panel will then appear, click on **Create new route** to start configuring routes.
3. Name the route you will build and hit **Save**.
4. Use the **Add new condition** button to define the condition that will trigger the payment processing route.
5. Select and define one or more condition types to narrow the route usage. The conditions available vary depending on the selected payment method. Check a condition to see intuitive options for configuring each.
6. Add connections to the condition created. Click the arrow next to your condition and then **Add step**. You will see a list of available connections including fraud solutions, processors, and acquirers, select one and click **Select**. If you select more than one connection, you will have to click **Next** and either determine the percentage of payments going through each, or select Smart Routing to handle the allocation automatically based on your preference.
7. For each new connection, you can define paths for each possible case (**Succeeded**, **Declined**, and **Error**). New steps can be connected to each scenario to build a complete routing that meets your demands.
8. After adding all steps of the payment process route, you can publish it using the **Publish** button, making it available for the respective payment method.

<Video src="https://github.com/writechoiceorg/yuno-images/raw/main/doc/yourPaymentsOperationSystem/routing_V3.mp4" />

## Smart Routing

Smart Routing is a solution designed to intelligently optimize payment performance according to the variable you choose to optimize as a merchant. To activate Smart Routing, select two or more connections when setting conditions, click **Next**, and turn on the Smart Routing toggle.

Smart Routing can optimize your payments in two ways:

* **Conversion rate and latency**: Make intelligent decisions to optimize processing time while also achieving the highest conversion rate.
* **Conversion rate and costs**: Make smart decisions to optimize costs while also achieving the highest conversion rate. Input the costs associated with each provider through the [Connections](https://docs.y.uno/docs/connections) section. Smart Routing uses the costs you set up on the connection page to optimize your costs.

You only need to specify which providers you want to work with and which variable you want to optimize, and Smart Routing will route each payment through the optimal path.

Smart routing can be applied automatically, optimizing payment distribution for you. Alternatively, manual control lets you define the exact percentage of transactions to route through each connection.

<Video src="https://github.com/writechoiceorg/yuno-images/raw/refs/heads/main/doc/yourPaymentsOperationSystem/smart-routing.mp4" />