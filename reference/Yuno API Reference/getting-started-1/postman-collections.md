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

Here, you find how to import the Yuno Collection and Environment. All endpoints on the [API Reference](ref:api-reference-overview)  are available on the Postman collection provided so that you can test Yuno services on your machine.

> 📘 Postman Collection
>
> Access the Yuno APIs Postman collection [here](https://jonathancastrillon.postman.co/workspace/Yuno-Public-APIs~3f631c16-0632-416e-8529-6e3fad62e67b/collection/43923852-d2e00360-9d01-4454-8aa5-31f5fc459d56?action=share&creator=43923852&active-environment=43923852-100bb804-01a7-456b-ba2e-54f0420cda30).

## Step 1: Fork the Yuno Postman collection

Before testing the endpoints, you need to fork the Yuno collection to your Postman account.

1. Access the [Yuno Postman collection](https://jonathancastrillon.postman.co/workspace/Yuno-Public-APIs~3f631c16-0632-416e-8529-6e3fad62e67b/collection/43923852-d2e00360-9d01-4454-8aa5-31f5fc459d56?action=share&creator=43923852&active-environment=43923852-100bb804-01a7-456b-ba2e-54f0420cda30).
2. Select the following **Run in Postman** button.
3. Select if you want to run Postman on your Browser or using the Postman app.
4. Sign up or log in to a Postman account.
5. Select a workspace to import the collection and environment into.

> 📘 Collections and Environment
>
> The collections provided configured endpoint requests. The environments provide a list of variables used by the endpoints. Instead of defining values for each parameter each time you perform a request, you can use the environment variables.

## Step 2: Configure the environment variables

Before start testing the endpoint, you need to configure the environment variables. Otherwise, the requests will fail.

1. Access **Environments** on the left panel.

<Image align="center" border={false} src="https://files.readme.io/123a391405b6f4e8be27e073693fa5e74efb6a0d766e31dd47f97a1bde9bb260-acces_environments_on_the_left_panel.png" />

2. Select the **Yuno Sbx - Postman** environment provided by yuno.

<Image align="center" border={false} src="https://files.readme.io/77813dfe7c2b5fd8088b6ca2711239cb3c5b8cd9ca06e766cd1ad0388961958c-select_the_yuno_sbx_-_postman.png" />

3. Update the variable's values. To start testing, you need to update at least the `api-key`, `secret-key`, and `account-code`.

4. Define **Yuno Sbx - Postman** as the environment using the **No Environment** selector at the top right corner.

<Image align="center" border={false} src="https://files.readme.io/8cbf447d1376344b2462c394ce63b54649aaa043a6e004233d9eeeeb9b8e2630-define_yuno_sbx_as_the_environment.png" />

The **Yuno Sbx - Postman** environment has an extensive list of variables used on all requests inside the collection. You can define their values as you try new endpoints.

## Step 3: Run in Postman

After selecting the environment and defining the variable values, you can start testing the endpoint.

1. Select the **Yuno - Collection** on the Collections tab.
2. Choose an endpoint.

<Image align="center" border={false} src="https://files.readme.io/5f4e5e1566a607e73c06d01bea321a86093a2239f8f2fd3dff9f92b45e93676b-choose_an_endpoint.png" />

3. Provide the necessary values to the parameters available on the **Headers** and **Body** tabs.

<Image align="center" border={false} src="https://files.readme.io/a2e91e295bcce5f9e3427a2c833bbbd9c8fd6aa277ae921def3b88fe1c59943a-provide_the_necessary_values.png" />

4. Use the **Send** button to perform the request to Yuno's server.

<Image align="center" border={false} src="https://files.readme.io/f144aae5675c88d220468a0e3c076deb44fbd33cb17da3cda247895f537d32be-use_the_send_button.png" />

> 📘 Postman Variables
>
> In the Yuno Collection, various parameters are considered as variables. These values can be defined in the environment or upon receiving a response from the server. Postman variables aid in testing different endpoints in a sequence as the values received fill in the body parameters for the subsequent request.
