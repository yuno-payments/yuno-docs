---
title: Demo App
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Demo App
  description: >-
    To help you understand and check how the Yuno SDKs work, the Yuno team
    provides the Demo App. It provides implementation examples for all Yuno
    SDKs. Therefore, if you are having trouble running some SDK on your
    platform, you can check the working examples from the Demo App.
  robots: index
next:
  description: ''
---
To help you understand and check how the Yuno SDKs work, the Yuno team provides the Demo App. It provides implementation examples for all Yuno SDKs. Therefore, if you are having trouble running some SDK on your platform, you can check the working examples from the Demo App.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Connect payment methods</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tTo ensure the Demo App will work properly, be sure to connect at least one payment method to your account through the <a href=\"https://dashboard.y.uno/\">Dashboard</a>. Otherwise, when you access the Demo App, some features won't work. If you don't know how to connect a payment method to your account, check the following contents:\n        </p>\n        <ul>\n          <li><a href=\"/docs/connections\">Connections</a></li>\n          <li><a href=\"/docs/checkout-builder\">Checkout Builder</a></li>\n          <li><a href=\"/docs/routing\">Routing</a></li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


### Step 1: Clone the repository

All files from the Demo App are available on a [GitHub repository](https://github.com/yuno-payments/yuno-sdk-web). To start using it, open your terminal, clone the repository, and change to the cloned directory:

```shell
> git clone https://github.com/yuno-payments/yuno-sdk-web.git
> cd yuno-sdk-web
```

### Step 2: Update the environment variables

First, you need to provide some information to run the application properly. Create a `.env` file in the root folder and define the following variables with your information:

```
YUNO_X_ACCOUNT_CODE=your_account_code
YUNO_PUBLIC_API_KEY=your_public_api_key
YUNO_PRIVATE_SECRET_KEY=your_private_secret_key
```

You can find `account_code`, `public_apy_key`, and `private_secrete_key` in [Yuno Merchant Dashboard](https://docs.y.uno/reference/authentication). 

### Step 3: Start the Demo App

After defining the `.env` file, install all dependencies:

```shell
> npm install
```

Now you are ready to run the application using the following command:

```shell
> npm start
```

To access the running application, open your browser and go to:

```shell
http://localhost:YOUR-PORT
```

If you don't change the code, the application will be available at <http://localhost:8080/>.

You can also change the country by adding a query parameter named `country` to the URL with one of the country codes `US`, `GB`, `FR`, `DE`, `IT`, `JP`, `CN`. The following example defines the URL to access an application running on the 8080 port and with Deutschland as the country selected:

```shell
http://localhost:8080?country=DE
```

You will find a panel, as presented below, with all Yuno SDKs available by accessing the URL. Select the desired SDK to check its appearance and how it works.

[block:html]
{
  "html": "<div style=\"background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px; max-width:500px; margin:auto\">\n  <image src=\"https://github.com/writechoiceorg/yuno-images/blob/main/doc/SDKs/webSDK/new-images/demo-app-1.png?raw=true\" style=\"width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);\"></image>\n</div>"
}
[/block]