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

[block:image]
{
  "images": [
    {
      "image": [
        "https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/enableLiveMode/enable_live1.png",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]

> 📘 Note
> 
> The account activation process requires you to provide some profile information and may take 2-4 weeks. In case of any problems, please get in touch with <a href="mailto:support@y.uno">Yuno support</a>. Meanwhile, you can continue using the sandbox environment for testing.

2. After starting the activation process, your Dashboard status will change to **Verifying account status**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/enableLiveMode/enable_live2.png",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]

3. Once activation is completed, Yuno will contact you, and you will have access to your **Production** environment credentials. Thus, you can switch to the Production environment through your Merchant Dashboard:

[block:image]
{
  "images": [
    {
      "image": [
        "https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/enableLiveMode/enable_live3.png",
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
  "html": "<style>\n  .navigation-button-shelf {\n    margin: 0 0 0 0;\n    display: flex;\n    justify-content: space-between;\n  }\n\n  .navigation-button {\n    padding: 0.3rem;\n    \n    border-radius: 5px;\n    border: 1px solid  var(--yuno-purple);\n    transition: transform .2s;\n    display: flex;\n    flex-direction: row;\n  }\n\n  .navigation-button:hover {\n    transform: scale(1.02);\n    box-shadow: 0 5px 5px  var(--yuno-purple-10);\n    cursor: pointer;\n  }\n\n  .navigation-button svg {\n    color: var(--yuno-purple);\n    height: 25px;\n    width: 25px;\n  }\n\n  .navigation-button h4 {\n    font-size: 0.8rem;\n    color:  var(--yuno-purple);\n    margin: 0 0 0 10px;\n    display: flex;\n    align-items: center;\n  }\n\n  @media only screen and (max-width: 600px) {\n    .navigation-button h4 {\n      font-size: 0.7rem;\n    }\n\n    .navigation-button svg {\n      color:  var(--yuno-purple);\n      height: 20px;\n      width: 20px;\n    }\n  }\n  \n  nav.Pagination1KE9HXCXYd0E {\n    display: none !important;\n  }\n  \n  /* ------------------------ define the configuration for DARK Mode ------------------------  */\n\n  @media (prefers-color-scheme: dark) {\n    .navigation-button {\n      border: 1px solid  var(--yuno-purple-50);\n    }\n\n    .navigation-button:hover {\n      box-shadow: none ;\n    }\n\n    .navigation-button svg {\n      color: var(--yuno-purple-50);\n    }\n\n    .navigation-button h4 {\n      color:  var(--yuno-purple-50);\n    }\n  }\n\n  [data-color-mode=\"dark\"] .navigation-button {\n      border: 1px solid  var(--yuno-purple-50);\n    }\n\n  [data-color-mode=\"dark\"] .navigation-button:hover {\n    \tbox-shadow: none ;\n    }\n\n  [data-color-mode=\"dark\"] .navigation-button svg {\n      color: var(--yuno-purple-50);\n    }\n\n  [data-color-mode=\"dark\"] .navigation-button h4 {\n      color:  var(--yuno-purple-50);\n    }\n</style>\n\n<body>\n  <br />\n  <br />\n  <section class=\"navigation-button-shelf\">\n    <div class=\"navigation-button\" onclick=\"window.location='make-a-test-payment';\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\" fill=\"currentColor\" class=\"bi bi-credit-card\"\n        viewBox=\"0 0 16 16\">\n        <path\n          d=\"M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z\" />\n        <path d=\"M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z\" />\n      </svg>\n      <h4>\n        Make a test payment\n      </h4>\n    </div>\n  </section>\n</body>\n"
}
[/block]