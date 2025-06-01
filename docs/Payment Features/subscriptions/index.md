---
title: Subscriptions
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Subscriptions are essential components of a business model that enable your company to offer its products or services to customers on a recurring basis. Yuno's subscription service allows you to easily manage recurring payments, automate subscription billing, and provide seamless subscription experiences for your users. Whether running a SaaS application, a content platform, or an e-commerce store, Yuno service can help you handle subscription-related tasks efficiently.

## Benefits of using Yuno subscriptions

* **Recurring Revenue**: Subscriptions provide a steady and predictable income stream, which can help stabilize cash flow and reduce financial uncertainties.
* **Customer Loyalty**: Subscribers tend to be more loyal, resulting in higher customer retention rates and reduced churn.
* **Reduced Acquisition Costs**: Subscriptions reduce the need for constant customer acquisition efforts, allowing businesses to focus more on retaining and serving existing customers.

## Yuno subscriptions

A subscription in Yuno's environment can go through a few different stages, starting with its creation status. When a subscription is created, it automatically receives the **CREATED** status. However, it is a transitory status that is active while the payment isn't processed. After that, the subscription will be **ACTIVE** or **CANCELLED**, depending on the payment confirmation.

When the payment related to the subscription is confirmed, the subscription status changes to **ACTIVE**. It remains with this status while the subscription is within its availability data range and the customer pays the bills. An active subscription can change to three different statuses:

* **COMPLETED**: The subscription finish date was reached. In this case, the current subscription is terminated, and it is not possible to reactivate it. If your client wants to continue using your product/service using recurring payments, you need to create a new subscription.
* **PAUSED**: At any moment, you can pause the subscription. Use this option in case your customer has delayed a payment, for example. You can always activate a paused subscription.
* **CANCELLED**: If your customers decides to cancel the recurring payment, you can cancel the subscription. After canceling it, the subscription is terminated, and it is not possible to reactivate it.

![](https://files.readme.io/47919b9-image.png)

Learn more about the status of the subscription on the [Subscription status page](ref:status-subscriptions).

## Subscription integration

To start using the subscriptions feature, you need to have a Yuno account and have integration with the Yuno API. The Yuno API provides the following operations to manage your subscriptions:

* **Create**: using the [Create a Subscription endpoint](ref:create-subscription) you can subscribe a customer.
* **Pause**: You can pause an active subscription with the [Pause Subscription endpoint](ref:pause-subscription).
* **Resume**: A previously paused subscription can be resumed with the [Resume Subscription endpoint](ref:resume-subscription).
* **Cancel**: You can cancel an active subscription with the [Cancel Subscription endpoint](ref:cancel-subscription).
* **Retrieve**: Use the [Retrieve Subscription endpoint](ref:retrieve-subscription) to retrieve the details of a subscription.

## New concepts

* *Subscriptions*: A subscription involves recurring charges directly tied to a customer and a particular payment method. When stopping or updating, the impact is solely on the same. 
* *Payment methods available*
  * *Enrolled*: Customers can pay with a previously enrolled payment method. Only the vaulted token is needed when creating the subscription to associate it with the charges.
* *Capabilities*: 
  * *Frequency*: You can define the frequency at which subscription charges will occur. Whether it's daily, weekly, or monthly, specifying the amount that needs to be charged for the next billing cycle.
  * *Billing Cycles*: The number of billing cycles (following the frequency criterion) that will be completed to fulfill the subscription. If neither an end\_date is sent nor defined, we will continue attempting charges until it is stopped.
  * *Billing date*: By specifying the billing\_date object, the merchant can define the logic behind the exact date for the billing of the subscription. Mutually exclusive with the frequency object. 
  * *Availability*: The start and end dates of the subscription. If they are not defined, nor the billing cycles, charges will continue until it is stopped.
    * The fields billing\_cycles and availability.finish\_at have an impact on each other. If both are completed during the subscription creation, it will transition to the COMPLETED state upon reaching the nearest event defined in these fields, whether it is the billing cycle or the corresponding finish\_at.
  * *Trial periods*: This new feature lets you define a period where your customers can benefit from a reduced amount. Could be partial or total (in case you want to define a free trial for example), you need to determine the value to be reduced from the total amount of each subscription charge and the billing cycles it should apply to. 
  * *Initial Payment validation*: Flag to identify if the subscription should wait for the first payment in order to continue. False by default. If the field is set to true, the subscription should remain in the CREATED status while waiting for the first payment of the subscription.
    * If the first payment succeeds (SUCCEEDED), the subscription transitions to ACTIVE.
    * If the first payment fails (DECLINED/REJECTED), the subscription transitions to CANCELED.

## Using Yuno subscription solution

Yuno provides subscription management functionalities through its API. You can use this API to create, update, and manage subscriptions, as well as retrieve subscription details and usage.

To use the subscription solution, normally, you will follow the steps described below:

1. To start, [create a customer](ref:create-customer). You will need to provide personal customer information. In addition, you also need to supply the `merchant_customer_id`, a unique identifier for the customer used on your system. At the end of the create a customer process, you will receive an `id`, which identifies the user within the Yuno system. You will use the `id` to create the subscription.
2. After creating the customer, you will need to [enroll a credit card](doc:enroll-payment-methods) in order to generate a `vaulted_token` to use it in the subscription creation. 
3. [Create a subscription](ref:create-subscription) for your customer and the card enrolled. You will configure the subscription and define the payment method at this step. When creating the subscription, you can customize:
   * The amount the subscription charges.
   * The billing frequency (daily, monthly, or yearly).
   * The total number of billing cycles.
   * The subscription availability to define the start and ending date.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Available payment methods</h3>
      <div class="contentContainer">
        <p>Currently, only Cards can be used as payment methods for subscriptions.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Declined payments</h3>
      <div class="contentContainer">
        <p>
          If a payment from a subscription is declined (including the first payment attempt), the subscription will continue its schedule for future payment attempts, giving the merchant the possibility to charge the client the pending amount through a different process and continue with the ongoing subscription.         
        <p>        
         If you want to cancel a subscription, feel free to use the <a href='https://docs.y.uno/reference/cancel-subscription'>cancel subscription endpoint</a>.       
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

In the response to the [Create Subscription](ref:create-subscription) endpoint, you receive an `id` which is used to identify the created endpoint. You will use the `id` if you decide to pause, resume, or cancel the subscription.
