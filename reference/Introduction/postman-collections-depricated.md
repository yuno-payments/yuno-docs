---
title: Postman Collections (depricated)
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
Postman is an API platform to help developers design and test APIs. Postman is an alternative to run Yuno API requests instead of using Readme.io. You can download Postman [here](https://www.postman.com/downloads/) for Linux, Windows, or Mac or use it through your web browser.

Here we demonstrate how to import the Yuno Collection and Environment. The collection includes the requests related to all alternative payment methods provided by Yuno. Currently, the collection does not have requests related to enrollment and debit or credit card payment methods, but they will be available soon.

# Run in Postman

Yuno provides a Postman collection, so you can start testing our API quickly. This is an ideal approach to becoming used to the available endpoints, requests, and responses from Yuno API.

Using the following button, you will be redirected to a Postman page, where you can choose between forking the collection, viewing the collection in a public workspace, or importing a copy of the collection. 

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/21397186-ac043630-1afe-4f2c-97ca-29f631990235?action=collection%2Ffork\&collection-url=entityId%3D21397186-ac043630-1afe-4f2c-97ca-29f631990235%26entityType%3Dcollection%26workspaceId%3Dfe4b0890-4013-499c-8f9d-cc537f2d78b3#?env%5BYuno%20Collections%20Enviroment%5D=W3sia2V5IjoicHVibGljLWFwaS1rZXkiLCJ2YWx1ZSI6IjxZT1VSIEFQSSBLRVk+IiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiI8WU9VUiBBUEkgS0VZPiIsInNlc3Npb25JbmRleCI6MH0seyJrZXkiOiJwcml2YXRlLXNlY3JldC1rZXkiLCJ2YWx1ZSI6IjxZT1VSIEFQSSBTRUNSRUNUIEtFWT4iLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoidGV4dCIsInNlc3Npb25WYWx1ZSI6IjxZT1VSIEFQSSBTRUNSRUNUIEtFWT4iLCJzZXNzaW9uSW5kZXgiOjF9LHsia2V5IjoiYWNjb3VudF9pZCIsInZhbHVlIjoiPFlPVVIgQUNDT1VOVCBDT0RFPiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiPFlPVVIgQUNDT1VOVCBDT0RFPiIsInNlc3Npb25JbmRleCI6Mn0seyJrZXkiOiJpZGVtcG90ZW5jeSIsInZhbHVlIjoiYzc0NmQ0ZmItZmNmYS00NGFlLTk3YWUtMTAwYmZiOTdlODFiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiJjNzQ2ZDRmYi1mY2ZhLTQ0YWUtOTdhZS0xMDBiZmI5N2U4MWIiLCJzZXNzaW9uSW5kZXgiOjN9LHsia2V5IjoiY291bnRyeSIsInZhbHVlIjoiQVIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6IkFSIiwic2Vzc2lvbkluZGV4Ijo0fSx7ImtleSI6ImRvY3VtZW50X3R5cGUiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJhbnkiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjV9LHsia2V5IjoiZG9jdW1lbnRfbnVtYmVyIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiYW55Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4Ijo2fSx7ImtleSI6ImN1cnJlbmN5IiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiYW55Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4Ijo3fSx7ImtleSI6ImFtb3VudCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImFueSIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6OH0seyJrZXkiOiJjdXN0b21lcl9pZCIsInZhbHVlIjoiOTBlZTIwNmMtN2Y0NC00YWRkLWEzYTYtZjdhYThjOTgyOTI4IiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImFueSIsInNlc3Npb25WYWx1ZSI6IjkwZWUyMDZjLTdmNDQtNGFkZC1hM2E2LWY3YWE4Yzk4MjkyOCIsInNlc3Npb25JbmRleCI6OX0seyJrZXkiOiJjdXN0b21lcl9zZXNzaW9uIiwidmFsdWUiOiI4YjBlODQ1ZS01YWYxLTQyZTktODM4Ni00OTY4MWU1ZTAwMTIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoidGV4dCIsInNlc3Npb25WYWx1ZSI6IjhiMGU4NDVlLTVhZjEtNDJlOS04Mzg2LTQ5NjgxZTVlMDAxMiIsInNlc3Npb25JbmRleCI6MTB9LHsia2V5IjoicGF5bWVudF9tZXRob2RfaWQiLCJ2YWx1ZSI6Im51bGwiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6Im51bGwiLCJzZXNzaW9uSW5kZXgiOjExfSx7ImtleSI6InBheW1lbnRfY29kZSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImFueSIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6MTJ9LHsia2V5Ijoib25ldGltZV90b2tlbiIsInZhbHVlIjoibnVsbCIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoibnVsbCIsInNlc3Npb25JbmRleCI6MTN9LHsia2V5IjoiY2hlY2tvdXRfc2Vzc2lvbiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImFueSIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6MTR9LHsia2V5IjoicGF5bWVudF9tZXRob2RfdHlwZSIsInZhbHVlIjoiTUVSQ0FET19QQUdPX1dBTExFVCIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiTUVSQ0FET19QQUdPX1dBTExFVCIsInNlc3Npb25JbmRleCI6MTV9LHsia2V5IjoicGNpX3VybF9taWNyb3NlcnZpY2UiLCJ2YWx1ZSI6Imh0dHBzOi8vYXBpLXNhbmRib3gueS51bm8iLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6Imh0dHBzOi8vYXBpLXNhbmRib3gueS51bm8iLCJzZXNzaW9uSW5kZXgiOjE2fSx7ImtleSI6InBjaV9pbnRlcm5hbF91cmxfbWljcm9zZXJ2aWNlIiwidmFsdWUiOiJodHRwczovL2ludGVybmFsLWFwaS1zYW5kYm94LnkudW5vIiwiZW5hYmxlZCI6ZmFsc2UsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiaHR0cHM6Ly9pbnRlcm5hbC1hcGktc2FuZGJveC55LnVubyIsInNlc3Npb25JbmRleCI6MTd9LHsia2V5Ijoid29uZGVybGFuZF9pbnRlcm5hbF91cmxfc2VydmljZXMiLCJ2YWx1ZSI6Imh0dHBzOi8vaW50ZXJuYWwtc2FuZGJveC55LnVubyIsImVuYWJsZWQiOmZhbHNlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6Imh0dHBzOi8vaW50ZXJuYWwtc2FuZGJveC55LnVubyIsInNlc3Npb25JbmRleCI6MTh9LHsia2V5Ijoid29uZGVybGFuZF91cmxfc2VydmljZXMiLCJ2YWx1ZSI6Imh0dHBzOi8vc2FuZGJveC55LnVubyIsImVuYWJsZWQiOmZhbHNlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6Imh0dHBzOi8vc2FuZGJveC55LnVubyIsInNlc3Npb25JbmRleCI6MTl9LHsia2V5IjoiZGFzaGJvYXJkX3Byb2RfdXJsIiwidmFsdWUiOiJodHRwczovL3Byb2QueS51bm8iLCJlbmFibGVkIjpmYWxzZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJodHRwczovL3Byb2QueS51bm8iLCJzZXNzaW9uSW5kZXgiOjIwfSx7ImtleSI6IngtZW52aXJvbm1lbnQiLCJ2YWx1ZSI6InRlc3RpbmciLCJlbmFibGVkIjpmYWxzZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiJ0ZXN0aW5nIiwic2Vzc2lvbkluZGV4IjoyMX1d)

We recommend you fork the collection using the button presented on the screen. Thus, you can change the collection and add your personal information to the local environment.

<Image align="center" width="350px" src="https://files.readme.io/5de4fda-Postman-01-fork.png" />

After clicking on **Fork Collection**, you will be redirected to a Postman page where you can define the forked collection label and select the workspace to save the forked collection and environment.

<Image align="center" width="340px" src="https://files.readme.io/bcd120d-Postman-02-fork.png" />

After forking the collection, you can configure the environment and test requests using the Postman app or your browser.

# Configuring Postman environment

After forking our API collection to your workspace, a list of operations will be available on the **Collections** tab.

![](https://files.readme.io/06b64a6-Postman-1-edited.png)

Before starting testing, you must select the environment we provide with the collection and configure a few variables. 

1. First, you must choose the provided **Yuno Collections Environment** by clicking on the select tab in the top right corner.

<Image align="center" width="250px" src="https://files.readme.io/79a6ff5-Postman-2-edited.png" />

2. After selecting the **Yuno Collections Environment**, click on the environment quick look icon. Postman will present the variables list available. Click on **Edit** to set your credential on **public-api-key**, **private-secret-key**, and **account-id** fields. Now, you are ready to test Yuno API using Postman.

<Image align="center" width="450px" src="https://files.readme.io/8b1d465-Postman-3.png" />

3. To efficiently analyze and edit the variables list provided by the **Yuno Collections Environment**, click on the **Environments** tab on the left and select the **Yuno Collections Environment** to present the complete variable list. Here you can define the initial value for each variable or specify temporary information adding the value to the Current Value column.

![](https://files.readme.io/a49335f-Postman-4.png)
