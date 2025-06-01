---
title: Postman Collections
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
Postman is an API platform to help developers design and test APIs. Postman is an alternative to run Yuno API requests using Readme.io. You can download Postman [here](https://www.postman.com/downloads/) for Linux, Windows, or Mac or use it through your web browser.

Here, you find how to import the Yuno Collection and Environment. All endpoints on the [API Reference](ref:introduction)  are available on the Postman collection provided so that you can test Yuno services on your machine.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Postman collection</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tIf you know how to use Postman, you can access the Yuno API collection <a href=\"https://documenter.getpostman.com/view/21179596/2s9XxyRt9S#dba8efb6-f39d-430c-8e89-bf2000f3e28e\">here</a>.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 1: Fork the Yuno Postman collection

Before testing the endpoints, you need to fork the Yuno collection to your Postman account.

1. Access the [Yuno Postman collection](https://documenter.getpostman.com/view/21179596/2s9XxyRt9S#dba8efb6-f39d-430c-8e89-bf2000f3e28e).
2. Select the following **Run in Postman** button.
3. Select if you want to run Postman on your Browser or using the Postman app. 
4. Sign up or log in to a Postman account.
5. Select a workspace to import the collection and environment into. 

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Collections and environment</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tThe collections provided configured endpoint requests.\n        </p>\n        <p>\n\t\t\t\t\tThe enviroments provide a list of variables used by the endpoints. Instead of defining values for each parameter each time you perform a request, you can use the enviroment variables.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Step 2: Configure the environment variables

Before start testing the endpoint, you need to configure the environment variables. Otherwise, the requests will fail.

1. Access **Environments** on the left panel.

[block:html]
{
  "html": "<div style=\"background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px; max-width: 700px; margin: auto;\">\n  <image src=\"https://github.com/writechoiceorg/yuno-images/blob/main/doc/postmanCollection/How%20to%20Create%20a%20Customer%20in%20Postman%20-%20Step%202.png?raw=true\" style=\"width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);\"></image>\n</div>"
}
[/block]


2. Select the **Yuno Sbx - Postman** environment provided by yuno.

[block:html]
{
  "html": "<div style=\"background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px; max-width: 700px; margin: auto; \">\n  <image src=\"https://github.com/writechoiceorg/yuno-images/blob/main/doc/postmanCollection/How%20to%20Create%20a%20Customer%20in%20Postman%20-%20Step%203.png?raw=true\" style=\"width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);\"></image>\n</div>"
}
[/block]


3. Update the variable's values. To start testing, you need to update at least the `api-key`, `secret-key`, and `account-code`.

4. Define **Yuno Sbx - Postman** as the environment using the **No Environment** selector at the top right corner.

[block:html]
{
  "html": "<div style=\"background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px; max-width: 700px; margin: auto;\">\n  <image src=\"https://github.com/writechoiceorg/yuno-images/blob/main/doc/postmanCollection/How%20to%20Create%20a%20Customer%20in%20Postman%20-%20Step%206.png?raw=true\" style=\"width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);\"></image>\n</div>"
}
[/block]


The **Yuno Sbx - Postman** environment has an extensive list of variables used on all requests inside the collection. You can define their values as you try new endpoints. 

## Step 3: Run in Postman

After selecting the environment and defining the variable values, you can start testing the endpoint.

1. Select the **Yuno - Collection** on the Collections tab.
2. Choose an endpoint.

[block:html]
{
  "html": "<div style=\"background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px; max-width: 700px; margin: auto;\">\n  <image src=\"https://github.com/writechoiceorg/yuno-images/blob/main/doc/postmanCollection/How%20to%20Create%20a%20Customer%20in%20Postman%20-%20Step%2010.png?raw=true\" style=\"width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);\"></image>\n</div>"
}
[/block]


3. Provide the necessary values to the parameters available on the **Headers** and **Body** tabs.

[block:html]
{
  "html": "<div style=\"background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px; max-width: 700px; margin: auto;\">\n  <image src=\"https://github.com/writechoiceorg/yuno-images/blob/main/doc/postmanCollection/How%20to%20Create%20a%20Customer%20in%20Postman%20-%20Step%2011.png?raw=true\" style=\"width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);\"></image>\n</div>"
}
[/block]


4. Use the **Send** button to perform the request to Yuno's server.

[block:html]
{
  "html": "<div style=\"background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px; max-width: 700px; margin: auto;\">\n  <image src=\"https://github.com/writechoiceorg/yuno-images/blob/main/doc/postmanCollection/How%20to%20Create%20a%20Customer%20in%20Postman%20-%20Step%2012.png?raw=true\" style=\"width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);\"></image>\n</div>"
}
[/block]


[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Postman variables</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tIn the Yuno Collection, various parameters are considered as variables. These values can be defined in the environment or upon receiving a response from the server. Postman variables aid in testing different endpoints in a sequence as the values received fill in the body parameters for the subsequent request.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]