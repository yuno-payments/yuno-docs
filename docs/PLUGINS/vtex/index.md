---
title: VTEX
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: VTEX
  description: >-
    Yuno and VTEX have joined forces to simplify payment processes for merchants
    worldwide. This partnership aims to streamline the payment experience and
    provide merchants with various payment methods catering to their customer's
    preferences.
  robots: index
next:
  description: ''
---
Yuno and VTEX have joined forces to simplify payment processes for merchants worldwide. This partnership aims to streamline the payment experience and provide merchants with various payment methods catering to their customer's preferences.

![](https://files.readme.io/64caa7b-vtex1.png)

By integrating Yuno's payment orchestration platform with VTEX's e-commerce solution, merchants can easily manage payments and offer diverse payment options. Yuno ensures customers can choose their preferred payment method from local cards to digital wallets. Yuno's plugin allows your store to accept payments seamlessly without redirecting customers to external pages, enhancing the shopping experience and increasing the conversion rate.

> ❗️ Payments with two cards
>
> To enable your customers to pay using two cards in VTEX, you must contact the Yuno supporting team in advance.

Yuno's plugin for VTEX is PCI compliant, ensuring that Yuno meets rigorous security standards when handling card data. Merchants can have peace of mind knowing that their customers' payment information is handled with utmost security and privacy.

The seamless integration between Yuno and VTEX makes it easy for merchants to incorporate Yuno's payment orchestration system into their existing setup. This enables them to focus on delivering exceptional products and services while providing a smooth payment experience for their customers.

## Payment methods available

The following payment method types are available in VTEX:

* **Credit and debit cards**: Visa, Mastercard, American Express, and other card networks
* **Alternative payment methods**: PIX, Boleto, and other local payment methods
* **Digital wallets**: Mercado Pago Wallet, PayPal, and other wallet solutions
* **Buy now pay later**: Installment options and BNPL solutions

Our team is actively collaborating with VTEX to ensure that all Yuno connections are made available to you as soon as possible. We are committed to expanding the available payment options to enhance your experience, so please feel free to reach out to your key account manager to find out more about the available payment methods in VTEX.

## Plugin integration

To start using the Yuno plugin on your VTEX store, you will need two essential elements:

1. A VTEX store.\
   You will use the Application Key and the Application Token from your store account. Check the VTEX [Application Keys](https://help.vtex.com/tutorial/application-keys--2iffYzlvvz4BDMr6WGUtet#) tutorials to understand how to set and access this information.
   1. Application Key: a private key generated when the Yuno account became productive.
   2. Application Token: a productive public key generated when the Conekta account became productive.
2. A Yuno account.\
   If you don't have a Yuno account, sign up at the [Yuno Merchant Dashboard](https://auth.y.uno/u/signup). You will use your Account ID, Public API Key, and Private API Key from your Yuno account. Access the [Developers](doc:developers-credentials) tab on the Yuno dashboard to access your credentials.

Once you have this information, you can register the Yuno plugin affiliation. Follow the steps outlined in the [Configure Yuno as Provider](doc:configure-yuno-as-provider) page. After completing the configuration processes, you'll enable your clients on VTEX to access the Yuno checkout to make payments on their orders.

## Workspaces

Workspaces are environments isolated from each other in terms of app development. They can be understood as different versions of the same VTEX account. In practice, changes performed in a particular workspace do not affect your store's live version or other developers' work. If you're used to working with git, think of workspaces as branches.

### Workspace types

**Development workspace**: Mainly used by software developers to draft, build or extend VTEX IO apps and storefront themes. These workspaces provide more development freedom. They allow linking, installing, and publishing VTEX IO apps. They can't handle production traffic, be promoted to master, nor be used for A/B testing.

**Production workspace**: Mainly used by the quality assurance and development teams to validate VTEX IO apps. These workspaces support production traffic and can be used for A/B testing, but linking apps is forbidden. If desired, these workspaces can be promoted to master to become publicly available for all end-users.

**Master workspace**: A unique production workspace that reflects the content served to the end-users of a store.\
Development and production workspaces can be accessed at `https://{workspace}--{account}.myvtex.com`.

![](https://files.readme.io/b8b6f032beb910a75fa3fadd25efb6b2b3e42d132f5712dedbf727d12f8424f6-image.png)

## Creating a workspace

### Step 1 - Installing the VTEX IO CLI

Any development in VTEX IO begins and ends with the VTEX IO CLI, which works as a communication gateway between your store and the VTEX IO development platform. With VTEX IO’s CLI, you can use the terminal to log in to your VTEX account, manage workspaces, develop apps, and install new ones.

1. Install the VTEX IO CLI on your machine by following [this guide](https://developers.vtex.com/docs/guides/vtex-io-documentation-vtex-io-cli-install).
2. Check if the installation was successful by running VTEX.

### Step 2 - Logging in to your VTEX account

After installing the VTEX IO CLI in your machine, take the following steps to log in to your VTEX account.

1. Log in to your VTEX account by running the following command:

```
vtex login accountName
```

Replace `accountName` with the name of your VTEX account.

![](https://files.readme.io/645257d1c276516b93eb8a14f35a99913fef9fd34e99db6ad02f4f977842ba61-image.png)

2. After running the command, a browser window will open and ask for your credentials. Enter the information required to log in to your account.

### Step 3 - Creating a development workspace

When developing with VTEX IO, you'll use different workspaces. Workspaces are environments isolated from one another. They can be understood as different versions of the same VTEX account. In practice, changes performed in a particular workspace do not affect your store's live version or other developers' work.

When you log in to a VTEX account using the VTEX IO CLI, you are automatically in the master workspace, which is the version of your store available to end-users. Hence, to avoid changing your store's live version, you must create a development workspace.

1. Create a development workspace by running the following command:

```
vtex use exampleworkspace
```

Replace `exampleworkspace` with a name of your choosing to identify your new workspace.

2. Enter Y to create the new workspace.

![](https://files.readme.io/9bd9d720c54bf3a631f4db6bea0f19fbfd18f32863685bd4a45254af462cbce3-image.png)

After running this command, you'll be taken to the exampleworkspace workspace, and all your operations will now run in this specified workspace.

### Step 4 - Accessing your store using a workspace

After creating a new development workspace, you can access this version of your store by going to: `https://exampleworkspace--accountName.myvtex.com`, where:

* `exampleworkspace` - Name of the workspace that you've just created.
* `accountName` - Name of the VTEX account in which you are working.

Done! You're now ready to start developing your Pixel app!

### Using a workspace in a connector

Now that you have a new connector ready to be used, you can test it entirely in the production flow using your store's Checkout.

> 🚧
>
> The account must be allowed to test IO Connectors. This must be [requested via ticket](https://help.vtex.com/en/tutorial/opening-tickets-to-vtex-support--16yOEqpO32UQYygSmMSSAM) informing the name of the app and the account where the tests will be made.

A prerequisite for this procedure is to have products for sale at your store for testing. To place an order with your new connector:

1. Launch a beta version of your connector. E.g.: `vtex.payment-provider-test@0.1.0-beta`. If you need, check the [Making your app publicly available](https://developers.vtex.com/docs/guides/vtex-io-documentation-10-making-your-app-publicly-available#launching-a-new-version) article to learn how to create a beta version of your app.
2. Install the beta version on master workspace. Wait for around 1 hour.
3. Go to `https://{account}myvtex.com/admin/affiliations/connector/Vtex.PaymentGateway.Connectors.PaymentProvider.PaymentProviderConnector_{connector-name}/`. Replace `{account}` for the name of the account you want to test on and `{connector-name}` for the name of your connector. The format of the name is: `${vendor}-${appName}-${appMajor}` (e.g.: `vtex-payment-provider-example-v1`).
4. ![](https://files.readme.io/9b547d5fdb3bbc1e5d771fbac749ced300591d746206eef57c8427eb54554cac-image.png)

   In **Payment Control**, activate the test environment by clicking **Enable test mode**. A new field called **Workspace** will appear.
5. Set the **Workspace** as you wish. You can leave it as `master` if it is the workspace you want to test on.

![](https://files.readme.io/d95b2da1854ee41fdb44002702b3e1385d4c8b20218eb25c9480f2c017e3a96f-image.png)