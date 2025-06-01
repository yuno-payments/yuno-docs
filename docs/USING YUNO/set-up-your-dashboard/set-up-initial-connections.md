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

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/039600a-set_up_conn_2.png",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]

By selecting a connection and clicking on **More info**, you can access information about the connection capabilities, compatibility, location coverage, and accepted currencies. The following image presents the dLocal Connection details as an example.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/13c6b4b-set_up_conn_3.png",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]

3. The next step is to connect the desired payment method or payment processor. Thus, click on **Connect** for the desired connection and a sidebar will show up, so you can provide the required credentials. Each payment method or processor may require different credentials, as shown in the following images for the dLocal and Mercado Pago.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/58a1df8-set_up_conn_4.png",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]

4. After providing valid credentials, Yuno will perform the connection with the selected payment method or processor. The connection will show up on the **Your connections** tab if no problems were found while connecting, where you have the option to edit or archive connections.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a910ef1-set_up_conn_5.png",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]

[block:html]
{
  "html": "<style>\n  .navigation-button-shelf {\n    margin: 0 0 0 0;\n    display: flex;\n    justify-content: space-between;\n  }\n\n  .navigation-button {\n    padding: 0.3rem;\n    \n    border-radius: 5px;\n    border: 1px solid  var(--yuno-purple);\n    transition: transform .2s;\n    display: flex;\n    flex-direction: row;\n  }\n\n  .navigation-button:hover {\n    transform: scale(1.02);\n    box-shadow: 0 5px 5px  var(--yuno-purple-10);\n    cursor: pointer;\n  }\n\n  .navigation-button svg {\n    color: var(--yuno-purple);\n    height: 25px;\n    width: 25px;\n  }\n\n  .navigation-button h4 {\n    font-size: 0.8rem;\n    color:  var(--yuno-purple);\n    margin: 0 0 0 10px;\n    display: flex;\n    align-items: center;\n  }\n\n  @media only screen and (max-width: 600px) {\n    .navigation-button h4 {\n      font-size: 0.7rem;\n    }\n\n    .navigation-button svg {\n      color:  var(--yuno-purple);\n      height: 20px;\n      width: 20px;\n    }\n  }\n  \n  nav.Pagination1KE9HXCXYd0E {\n    display: none !important;\n  }\n  \n  /* ------------------------ define the configuration for DARK Mode ------------------------  */\n\n  @media (prefers-color-scheme: dark) {\n    .navigation-button {\n      border: 1px solid  var(--yuno-purple-50);\n    }\n\n    .navigation-button:hover {\n      box-shadow: none ;\n    }\n\n    .navigation-button svg {\n      color: var(--yuno-purple-50);\n    }\n\n    .navigation-button h4 {\n      color:  var(--yuno-purple-50);\n    }\n  }\n\n  [data-color-mode=\"dark\"] .navigation-button {\n      border: 1px solid  var(--yuno-purple-50);\n    }\n\n  [data-color-mode=\"dark\"] .navigation-button:hover {\n    \tbox-shadow: none ;\n    }\n\n  [data-color-mode=\"dark\"] .navigation-button svg {\n      color: var(--yuno-purple-50);\n    }\n\n  [data-color-mode=\"dark\"] .navigation-button h4 {\n      color:  var(--yuno-purple-50);\n    }\n</style>\n\n<body>\n  <br/>\n  <br/>\n  <section class=\"navigation-button-shelf\">\n    <div class=\"navigation-button\" onclick=\"window.location='get-your-api-credentials';\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\" fill=\"currentColor\" class=\"bi bi-key-fill\"\n        viewBox=\"0 0 16 16\">\n        <path\n          d=\"M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z\" />\n      </svg>\n      <h4>\n        Get your API credentials\n      </h4>\n    </div>\n\n    \n\t\t<div class=\"navigation-button\" onclick=\"window.location='configure-dynamic-routing';\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\" fill=\"currentColor\" class=\"bi bi-bezier2\"\n        viewBox=\"0 0 16 16\">\n        <path fill-rule=\"evenodd\"\n          d=\"M1 2.5A1.5 1.5 0 0 1 2.5 1h1A1.5 1.5 0 0 1 5 2.5h4.134a1 1 0 1 1 0 1h-2.01c.18.18.34.381.484.605.638.992.892 2.354.892 3.895 0 1.993.257 3.092.713 3.7.356.476.895.721 1.787.784A1.5 1.5 0 0 1 12.5 11h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5H6.866a1 1 0 1 1 0-1h1.711a2.839 2.839 0 0 1-.165-.2C7.743 11.407 7.5 10.007 7.5 8c0-1.46-.246-2.597-.733-3.355-.39-.605-.952-1-1.767-1.112A1.5 1.5 0 0 1 3.5 5h-1A1.5 1.5 0 0 1 1 3.5v-1zM2.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10 10a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z\" />\n      </svg>\n      <h4>\n        Configure Dynamic Routing\n      </h4>\n    </div>\n  </section>\n</body>\n\n"
}
[/block]