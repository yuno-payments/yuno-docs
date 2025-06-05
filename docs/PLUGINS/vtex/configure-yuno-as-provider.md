---
title: Configure Yuno as Provider
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
To offer more payment methods to your clients using Yuno as the provider, you need to follow the steps below to connect your VTEX account to Yuno and configure the payment methods you want to offer.

1. Log into your [VTEX store account](https://vtex.com/).

2. In the VTEX Admin dashboard, navigate to **Store Settings** > **Providers** and click **New Provider**.

![](https://files.readme.io/b5feefa-image.png)

3. Search for **Yuno** on the dialog and select the **Yuno** option on the results.

![](https://files.readme.io/0277803-image.png)

4. Fill out the form with the required information. Following, you will find a description for each field you need to fill:

| Field                    | Description                                                                                                                                                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **App key**              | VTEX application keys. For additional information on accessing it, see [Generating internal application keys](https://help.vtex.com/tutorial/application-keys--2iffYzlvvz4BDMr6WGUtet#generating-internal-application-keys). |
| **App Token**            | VTEX application token, which you find when [Generating internal application keys](https://help.vtex.com/tutorial/application-keys--2iffYzlvvz4BDMr6WGUtet#generating-internal-application-keys).                            |
| **Name**                 | Connection name. You can use **Yuno**.                                                                                                                                                                                       |
| **Enable Test Mode**     | It enables you to decide whether to use the Production or Sandbox environments. While you are testing, Yuno recommends you enable test mode.                                                                                 |
| **Automatic Settlement** | Select the option **Use behavior recommended by payment processor**.                                                                                                                                                         |
| **Affiliation Name**     | This name should be equal to the previously provided for connection **Name**.                                                                                                                                                |
| **Account\_ID**          | The Yuno `account_id`. You can find this information in the [Yuno dashboard](https://dashboard.y.uno/developers). For additional information, see [Developers (Credentials)](doc:developers-credentials).                    |
| **Public API Key**       | The Yuno `public-api-key`. You can find this information in the Yuno dashboard. For additional information, see [Developers (Credentials)](doc:developers-credentials).                                                      |
| **Private Secret Key**   | The Yuno `private-secret-key`. You can find this information in the Yuno dashboard. For additional information, see [Developers (Credentials)](doc:developers-credentials).                                                  |

> 🚧 Test Mode Warning
>
> VTEX recommends you to not enable the test mode in production environments, since the test payment options will be available to customers in your store.

5. After filling in all fields, click **Save**.
6. Navigate to **Store Settings** > **Settings** and click the **+** button (green button at the top right corner) to add a new payment option.

![](https://files.readme.io/f053995-image.png)

7. Select the payment method you want to provide for your customer. You need to configure the provider for each card brand you want to make available for your customer.

![](https://files.readme.io/4ad7929-image.png)

8. After you select the payment method, a new dialog is displayed where you need to configure the payment provider:
   1. At the **Process with provider**, select **Yuno**.
   2. Add special conditions if necessary. For additional information regarding configuring the special conditions, access [Configuring payment special conditions](https://help.vtex.com/tutorial/special-conditions--tutorials_456#). For further information on configuring payment conditions considering installments with or without interest, check the [VTEX page](https://help.vtex.com/en/tutorial/how-to-configure-payment-conditions--tutorials_455?\&utm_source=autocomplete#installments-without-interest).
   3. Click **Save**.
   4. Change the **Status**  to **Active**.

![](https://files.readme.io/cd7de3e-image.png)

> 📘 Adding Multiple Payment Methods
>
> If you want to add more than one payment method to offer to your clients, Visa and Mastercard for example, you need to repeat steps **7** and **8** two times, one for Visa and the other for Mastercard.


9. As the last step, you have to configure the Webhook URL to receive the updates from the payments. 
   1. Access the [Yuno Dashboard](https://auth.y.uno/u/login?) and select **Developers**. 
   2. Select the **Webhooks** tab.
   3. Click **add webhook**. The webhook  form will show up, where you should provide the following information:
      1. **Name**: Define a name for the VTEX webhook.
      2. **Endpoint URL**: You should inform the following URL **https\://store\_name/\_v/yunopartnerbr.yuno/v4/webhook**.
      3. **x-api-key** and **x-secret**: You can set any information here. For example, you can add **VTEX** for both fields. 
   4. For **Trigger on**, check all events that should notify you through the webhooks. Yuno recommends checking all options.
   5. Click **Add**.

![](https://files.readme.io/ccc5357-image.png)After completing the steps above, your clients can access a new payment method at checkout. If you configure Visa, for example, when your customers arrive at the checkout phase and select credit card as the payment method, the Yuno checkout will gather all the information required for fraud screening and 3DS services in the background while using the VTEX credit card form.

<Image align="center" src="https://files.readme.io/a17a02d-vtex.png" />

Once you start receiving payments in VTEX with Yuno, you will be able to see all the information related to the transactions in your [Yuno dashboard](doc:payments-2) as a regular payment. 

* As additional info in the payment detail, particularly inside the metadata struct, you will also be able to identify the VTEX account related to the payment creation.

  ```json
  "metadata": [
      {
        "key": "vtex_account",
        "value": "[your_vtex_subaccount]"
      }
    ]
  ```

### Customizations

If you want to add or change certain UX aspects of the checkout, VTEX lets the merchants modify a few things: 

* Checkout Page [customizations](https://developers.vtex.com/docs/guides/customization) 
* [Change Payment Method names](https://developers.vtex.com/docs/guides/change-payment-method-names-in-checkout) in Checkout.
