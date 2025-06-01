---
title: Postman Guide
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: Postman Guide
  description: >-
    Check how to test Yuno API using Postman. Postman is an API platform to help
    developers design and test APIs and is an alternative to run Yuno API
    requests using Readme.io.
  robots: index
next:
  description: ''
---
Postman is an API platform to help developers design and test APIs. Postman is an alternative to run Yuno API requests using Readme.io. You can download Postman [here](https://www.postman.com/downloads/) for Linux, Windows, or Mac or use it through your web browser.

Here, you find how to import the Yuno Collection and Environment. All endpoints on the [API Reference](ref:introduction)  are available on the Postman collection provided so that you can test Yuno services on your machine.

## Step 1: Fork the Yuno Postman collection

Before testing the endpoints, you need to fork the Yuno collection to your Postman account.

1. Access the [Yuno Postman collection](https://documenter.getpostman.com/view/21179596/2s9XxyRt9S#dba8efb6-f39d-430c-8e89-bf2000f3e28e).
2. Select the following **Run in Postman** button.
3. Select if you want to run Postman on your Browser or using the Postman app. 
4. Sign up or log in to a Postman account.
5. Select a workspace to import the collection and environment into. 

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Collections and environment</h3>
      <div class="contentContainer">
        <p>
					The collections provided configured endpoint requests.
        </p>
        <p>
					The enviroments provide a list of variables used by the endpoints. Instead of defining values for each parameter each time you perform a request, you can use the enviroment variables.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Step 2: Configure the environment variables

Before start testing the endpoint, you need to configure the environment variables. Otherwise, the requests will fail.

1. Access **Environments** on the left panel.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px; max-width: 700px; margin: auto;">
  <image src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/postmanCollection/How%20to%20Create%20a%20Customer%20in%20Postman%20-%20Step%202.png?raw=true" style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></image>
</div>
`}</HTMLBlock>

2. Select the **Yuno Sbx - Postman** environment provided by yuno.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px; max-width: 700px; margin: auto; ">
  <image src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/postmanCollection/How%20to%20Create%20a%20Customer%20in%20Postman%20-%20Step%203.png?raw=true" style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></image>
</div>
`}</HTMLBlock>

3. Update the variable's values. To start testing, you need to update at least the `api-key`, `secret-key`, and `account-code`.

4. Define **Yuno Sbx - Postman** as the environment using the **No Environment** selector at the top right corner.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px; max-width: 700px; margin: auto;">
  <image src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/postmanCollection/How%20to%20Create%20a%20Customer%20in%20Postman%20-%20Step%206.png?raw=true" style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></image>
</div>
`}</HTMLBlock>

The **Yuno Sbx - Postman** environment has an extensive list of variables used on all requests inside the collection. You can define their values as you try new endpoints. 

## Step 3: Run in Postman

You can start testing the endpoint after selecting the environment and defining the variable values.

1. Select the **Yuno - Collection** on the Collections tab.
2. Choose an endpoint.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px; max-width: 700px; margin: auto;">
  <image src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/postmanCollection/How%20to%20Create%20a%20Customer%20in%20Postman%20-%20Step%2010.png?raw=true" style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></image>
</div>
`}</HTMLBlock>

3. Provide the necessary values to the parameters available on the **Headers** and **Body** tabs.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px; max-width: 700px; margin: auto;">
  <image src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/postmanCollection/How%20to%20Create%20a%20Customer%20in%20Postman%20-%20Step%2011.png?raw=true" style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></image>
</div>
`}</HTMLBlock>

4. Use the **Send** button to perform the request to Yuno's server.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px; max-width: 700px; margin: auto;">
  <image src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/postmanCollection/How%20to%20Create%20a%20Customer%20in%20Postman%20-%20Step%2012.png?raw=true" style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></image>
</div>
`}</HTMLBlock>

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Postman variables</h3>
      <div class="contentContainer">
        <p>
					In the Yuno Collection, various parameters are considered as variables. These values can be defined in the environment or upon receiving a response from the server. Postman variables aid in testing different endpoints in a sequence as the values received fill in the body parameters for the subsequent request.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

```json
asd
```
```json
qwe
```
