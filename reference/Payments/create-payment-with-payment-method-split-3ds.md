---
title: Payments with 3DS Split
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: >-
    In the page Create Payment with Payment Method Split, you can understand how
    the split workflow actually works and how you can integrate it into your
    site. In this section, you can also understand how to support **3DS card
    verification**.
  robots: index
next:
  description: ''
---
In the page [Create Payment with Payment Method Split](https://docs.y.uno/reference/create-payment-with-payment-method-split), you can understand how the split workflow actually works and how you can integrate it into your site. In this section, you can also understand how to support **3DS card verification**. 

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <div class=\"contentContainer\">\n\n        <ul>\n          <li> Integrate <a onclick=\"window.location='https://docs.y.uno/reference/create-payment-with-payment-method-split'\">Split payment method</a> solution. (Only available for DIRECT workflow)</li>\n          <li>Enable 3DS in your Yuno dashboard and indicate in your CARD routing for which scenarios you want your customers to be able to use it.</li>\n        </ul>\n\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## How does it work?

1. Create a [checkout_session](https://docs.y.uno/reference/create-checkout-session) to initiate the payment workflow. 
2. Create your payment using the split payment method integration. If 3DS is enabled in your Yuno routing section, you'll get a payment with status _PENDING/WAITING_ADDITIONAL_STEP_ with the corresponding 3DS transactions with a CREATED status. 
   1. Info needed in the request: 
      1. Card data
      2. Callback_url in case a 3DS challenge is required
   2. Response - 3DS transaction: 
      1. sdk_action_required: 3DS
      2. `sdk_token`
      3. `sdk_collect_url`
3. With the fields obtained in the previous step (_token_ and _collect_url_), initialize the Yuno's SDK 3DS() function to capture the `sdk_session_id`. 
4. After initializing the SDK, for each card, consume the **complete** endpoint to see wether or not your customer needs an additional 3DS challenge. If it doesn't, we'll continue with the payment and notify the final result. 
   1. Info needed in the request
      1. payment and transaction_codes
      2. `sdk_session_id`
   2. Response: Updated 3DS transaction (with an `redirect_url` in case a 3DS challenge is required)
5. If the transactions require a **3DS verification challenge**, we will return a _required_action_ set as redirect and an **init_url** for you to redirect your customers in order to complete the challenge. There will be as many redirect_urls as 3DS challenges are required. If both cards require a 3DS challenge, you'll get two different URLs to redirect your customer. 
6. After the 3DS challenge is finished, the user will be redirected to the _callback_url_ defined in the payment.  
7. Finally, by **webhooks** you'll receive the result of the 3DS challenge and the **final payment result**.

## Transactions

A 3DS transaction behaves similar to a regular purchase transaction. It has different states that represent how the authorization is going. Once the 3DS transaction is SUCCEEDED, we'll to go to the processor and generate a PURCHASE transaction to charge the client. 

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/de8148a-3DS.png",
        null,
        ""
      ],
      "align": "left"
    }
  ]
}
[/block]


| Status     | Description                                                |
| :--------- | :--------------------------------------------------------- |
| CREATED    | Payment is created and waiting for Yuno's SDK session id.  |
| PENDING    | Challenge is required and the init_url is returned by Yuno |
| IN_PROCESS | Challenge is being completed by the user                   |
| SUCCEEDED  | Challenge is completed correctly                           |
| DECLINED   | Challenge is completed and declined by the bank            |
| ERROR      | An error occurred while redirecting to the users challenge |