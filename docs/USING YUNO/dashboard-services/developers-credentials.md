---
title: Developers (Credentials)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Developers (Credentials)
  description: >-
    In the Developers section, you will find your authentication credentials to
    integrate Yuno. Authentication lies at the heart of every interaction within
    the Yuno ecosystem.
  robots: index
next:
  description: ''
---
The **Developers** section in the Yuno dashboard provides secure authentication credentials (also known as keys) for integrating Yuno's services. Yuno maintains separate keys for Test and Live environments, ensuring robust security and smooth operations.

## Credential structure

Yuno implements a two-tier authentication hierarchy:

1. **Organization keys**
   * Primary authentication layer providing a gateway to your overarching operations
   * Grant access to all [accounts](https://docs.y.uno/docs/account-management) associated to your organization
   * Assigned to your organization after registering with Yuno

2. **Account keys**
   * Unique to each account within your organization
   * Operate independently between Test and Live modes
   * Provide granular access control

## Accessing credentials

You can access your authentication credentials in two ways:

* **Account management**: The Yuno dashboard's [**Account management**](https://dashboard.y.uno/accounts) section contains credentials for each account. Click each account name to gain instant access to its keys.
* **Developers section**:  You can also access your authentication credentials from the **Developers** section. The **Authentication** tab, open by default, will showcase account, organization, and customized API keys. Your permissions will determine which keys are visible. This area is particularly valuable when integrating Yuno functionalities into your applications or systems.

<Image align="center" src="https://files.readme.io/4c104b79c95009ee44608cb0cf48164fb7ca5cd457f7dee203004bb3170b52c2-Developers.png" />

## Customized API keys

Yuno lets you create customized API keys for increased security and control, ensuring only authorized members can access data and reports via the API.

Inside the Authentication tab of the Developers section, look for Customized API keys and click **Create key** next to it. From here, you can set various parameters:

* Key name and the member who can access it.
* The account(s) associated with the new key.
* The product(s) accessible by the key, such as subscriptions, payments, installment plans, and more.

The flexibility of customized API keys streamlines access and permission control, enabling easy and secure API integration management through the Yuno dashboard.

## Safeguarding your credentials

Protecting your authentication credentials is paramount for maintaining secure operations. Follow these guidelines:

* Treat credentials as sensitive information
* Never share credentials with unauthorized parties
* Monitor credential usage

> 📘 Security Alert
>
> If you suspect credential exposure or unauthorized access, contact our support team immediately. Prompt action helps maintain the security of your operations.