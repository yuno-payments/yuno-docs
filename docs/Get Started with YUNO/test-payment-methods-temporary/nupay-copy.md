---
title: NuPay (COPY)
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
# Gateway Guide

# Testing Guidelines

To make a payment using NuPay, you should follow the steps:

1. [Create Customer](https://docs.y.uno/reference/create-customer)
2. [Create Checkout Session](https://docs.y.uno/reference/create-checkout-session)
3. Create One Time Token / Get the token from SDK 
4. [Create Payment ](https://docs.y.uno/reference/create-payment)

The Create Payment response provides a redirect URL (payment_method.payment_method_detail.bank_transfer.redirect_url), redirecting the user to a NuBank page that provides a QR code to complete the payment:

![](https://files.readme.io/662bf38-nu_pay.png)

After creating the order, you must complete and test the payment and access the NuPay sandbox [dashboard](https://sandbox-painel.nupaybusiness.com.br/) with your Nubank credentials. Once logged in, you can approve the transaction in the 'Activities' section:

![](https://files.readme.io/52a2332-nu_pay_dashboard.png)

After approving the payment, its status will change to "completo" on the NuPay sandbox dashboard. You can check the payment status using the [Retrieve Payment by ID](https://docs.y.uno/reference/retrieve-payment-by-id). If the payment were approved, the Retrieve Payment by ID response would provide the status **SUCCEEDED**, and sub_status **APPROVED**.

[block:html]
{
  "html": "<!DOCTYPE html>\n<html lang=\"en\">\n<style>\n  .navigation-button-shelf {\n    margin: 0 0 0 0;\n    display: flex;\n    justify-content: flex-end;\n  }\n\n  .navigation-button {\n    padding: 0.3rem;\n    background: rgba(255, 255, 255, 0.23);\n    border-radius: 5px;\n    border: 1px solid #614ad67a;\n    transition: transform .2s;\n    display: flex;\n    flex-direction: row;\n  }\n\n  .navigation-button:hover {\n    transform: scale(1.02);\n    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);\n    cursor: pointer;\n  }\n\n  .navigation-button svg {\n    color: #614ad6;\n    height: 25px;\n    width: 25px;\n  }\n\n  .navigation-button h4 {\n    font-size: 0.8rem;\n    color: #614ad6;\n    margin: 0 0 0 10px;\n    display: flex;\n    align-items: center;\n  }\n\n  @media only screen and (max-width: 600px) {\n    .navigation-button h4 {\n      font-size: 0.7rem;\n    }\n\n    .navigation-button svg {\n      color: #614ad6;\n      height: 20px;\n      width: 20px;\n    }\n  }\n</style>\n\n<body>\n  <br />\n  <br />\n  <section class=\"navigation-button-shelf\">\n    <div class=\"navigation-button\" onclick=\"window.location='https://forms.gle/ufNUzah5hAqjhKPi7';\">\n     <?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n<path style=\"fill:#303C42;\" d=\"M426.667,21.333h-384C19.146,21.333,0,40.469,0,64v416c0,4.313,2.604,8.208,6.583,9.854\n\tc1.312,0.552,2.708,0.813,4.083,0.813c2.771,0,5.5-1.083,7.542-3.125L121.75,384h304.917c23.521,0,42.667-19.135,42.667-42.667V64\n\tC469.333,40.469,450.188,21.333,426.667,21.333z\"/>\n<path style=\"fill:#15BEF0;\" d=\"M448,341.333c0,11.76-9.563,21.333-21.333,21.333H117.333c-2.833,0-5.542,1.125-7.542,3.125\n\tL21.333,454.25V64c0-11.76,9.563-21.333,21.333-21.333h384C438.438,42.667,448,52.24,448,64V341.333z\"/>\n<path style=\"opacity:0.1;enable-background:new    ;\" d=\"M426.667,42.667v245.839c0,29.176-23.652,52.828-52.828,52.828H96\n\tc-2.829,0-5.542,1.124-7.542,3.124l-36.955,36.956c-19.317,19.318-30.17,45.518-30.17,72.837v0l88.46-88.46\n\tc2-2,4.712-3.123,7.54-3.123h309.333c11.782,0,21.333-9.551,21.333-21.333V64C448,52.24,438.438,42.667,426.667,42.667z\"/>\n<g>\n\t<path style=\"fill:#303C42;\" d=\"M352,149.333H117.333c-5.896,0-10.667-4.771-10.667-10.667S111.438,128,117.333,128H352\n\t\tc5.896,0,10.667,4.771,10.667,10.667S357.896,149.333,352,149.333z\"/>\n\t<path style=\"fill:#303C42;\" d=\"M330.646,213.333H117.333c-5.896,0-10.667-4.771-10.667-10.667S111.438,192,117.333,192h213.313\n\t\tc5.896,0,10.667,4.771,10.667,10.667S336.542,213.333,330.646,213.333z\"/>\n\t<path style=\"fill:#303C42;\" d=\"M245.333,277.333h-128c-5.896,0-10.667-4.771-10.667-10.667c0-5.896,4.771-10.667,10.667-10.667h128\n\t\tc5.896,0,10.667,4.771,10.667,10.667C256,272.563,251.229,277.333,245.333,277.333z\"/>\n\t<path style=\"fill:#303C42;\" d=\"M471.167,64c-10.771,0-21.292,4.365-28.875,11.958L312.458,205.771c-1.5,1.49-2.5,3.385-2.917,5.448\n\t\tl-10.667,53.354c-0.708,3.5,0.396,7.115,2.917,9.635c2.021,2.021,4.75,3.125,7.542,3.125c0.688,0,1.396-0.073,2.083-0.208\n\t\tl53.313-10.667c2.083-0.417,3.979-1.427,5.458-2.917l106.676-106.659c0,0,0.008-0.004,0.012-0.008s0.004-0.007,0.004-0.007\n\t\tl23.163-23.16c0,0,0,0,0-0.01c7.604-7.604,11.958-18.125,11.958-28.865C512,82.313,493.688,64,471.167,64z\"/>\n</g>\n<polygon style=\"fill:#FFFFFF;\" points=\"357.396,246.177 322.938,253.073 329.833,218.573 426.661,121.745 454.249,149.332 \"/>\n<path style=\"fill:#FFCA28;\" d=\"M484.958,118.625l-15.625,15.625l-27.589-27.589l15.63-15.63c3.625-3.615,8.646-5.698,13.792-5.698\n\tc10.75,0,19.5,8.75,19.5,19.5C490.667,109.958,488.583,114.99,484.958,118.625z\"/>\n<linearGradient id=\"SVGID_1_\" gradientUnits=\"userSpaceOnUse\" x1=\"-29.8042\" y1=\"636.3796\" x2=\"-24.6018\" y2=\"631.1702\" gradientTransform=\"matrix(21.3333 0 0 -21.3333 996.3334 13791.667)\">\n\t<stop  offset=\"0\" style=\"stop-color:#000000;stop-opacity:0.1\"/>\n\t<stop  offset=\"1\" style=\"stop-color:#000000;stop-opacity:0\"/>\n</linearGradient>\n<path style=\"fill:url(#SVGID_1_);\" d=\"M370.188,263.542c-1.479,1.49-3.375,2.5-5.458,2.917l-53.313,10.667\n\tc-0.688,0.135-1.396,0.208-2.083,0.208c-2.792,0-5.521-1.104-7.542-3.125l88.458,88.458h36.417c11.771,0,21.333-9.573,21.333-21.333\n\tV185.741L370.188,263.542z\"/>\n<linearGradient id=\"SVGID_2_\" gradientUnits=\"userSpaceOnUse\" x1=\"-48.4597\" y1=\"640.1601\" x2=\"-25.0701\" y2=\"629.2543\" gradientTransform=\"matrix(21.3333 0 0 -21.3333 996.3334 13791.667)\">\n\t<stop  offset=\"0\" style=\"stop-color:#FFFFFF;stop-opacity:0.2\"/>\n\t<stop  offset=\"1\" style=\"stop-color:#FFFFFF;stop-opacity:0\"/>\n</linearGradient>\n<path style=\"fill:url(#SVGID_2_);\" d=\"M471.167,64c-0.618,0-1.217,0.155-1.833,0.184V64c0-23.531-19.146-42.667-42.667-42.667h-384\n\tC19.146,21.333,0,40.469,0,64v416c0,4.313,2.604,8.208,6.583,9.854c1.312,0.552,2.708,0.813,4.083,0.813\n\tc2.771,0,5.5-1.083,7.542-3.125L121.75,384h304.917c23.521,0,42.667-19.135,42.667-42.667V164.411l7.53-7.529\n\tc0,0,0.008-0.004,0.012-0.008s0.004-0.007,0.004-0.007l23.163-23.16c0,0,0,0,0-0.01c7.604-7.604,11.958-18.125,11.958-28.865\n\tC512,82.313,493.688,64,471.167,64z\"/>\n</svg>\n      <h4>\n        Send feedback\n      </h4>\n    </div>\n  </section>\n</body>\n\n</html>"
}
[/block]