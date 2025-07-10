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
To offer your customers more payment methods using Yuno as the provider, follow the steps below to connect your VTEX account to Yuno and configure the available payment methods.

### Connect Yuno as a provider in VTEX

This section guides you through adding Yuno as a payment provider in your VTEX store.

1. Log in to your [VTEX store account](https://vtex.com/).

2. In the VTEX admin dashboard, go to **Store Settings** > **Providers** and click **New provider**.

![](https://files.readme.io/b5feefa-image.png)

3. In the dialog, search for **Yuno** and select the **Yuno** option from the results.

![](https://files.readme.io/0277803-image.png)

4. Complete the form with the required information. See the table below for a description of each field:

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

> 🚧 Test mode warning
>
> Do not enable test mode in your production environment. If test mode is enabled, test payment options will be visible to your customers at checkout.

### Add payment methods in VTEX

After saving your provider configuration, you can add payment methods to your VTEX store. Follow these steps:

5. After completing all required fields, click **Save**.

6. Go to **Store Settings** > **Settings** and click the **+** button (green button at the top right) to add a new payment option.

![](https://files.readme.io/f053995-image.png)

7. Select the payment method you want to offer your customers. You must configure the provider for each card brand you want to make available.

![](https://files.readme.io/4ad7929-image.png)

8. After selecting the payment method, a new dialog will appear for configuring the payment provider:
   1. In **Process with provider**, select **Yuno**.
   2. If needed, add special conditions. For more details, see [Configuring payment special conditions](https://help.vtex.com/tutorial/special-conditions--tutorials_456#). For information about configuring payment conditions for installments (with or without interest), refer to the [VTEX documentation](https://help.vtex.com/en/tutorial/how-to-configure-payment-conditions--tutorials_455?\&utm_source=autocomplete#installments-without-interest).
   3. Click **Save**.
   4. Set the **Status** to **Active**.

![](https://files.readme.io/cd7de3e-image.png)

> 📘 Adding multiple payment methods
>
> To offer more than one payment method (for example, Visa and Mastercard), repeat steps **7** and **8** for each card brand you want to enable.

### Configure the webhook URL

To receive payment updates from Yuno, you need to set up a webhook in your Yuno dashboard:

9. Configure the webhook as follows:
   1. Log in to the [Yuno dashboard](https://auth.y.uno/u/login?) and go to **Developers**.
   2. Select the **Webhooks** tab.
   3. Click **Add webhook**. In the form, provide the following:
      1. **Name**: Enter a name for the VTEX webhook.
      2. **Endpoint URL**: Enter `https://store_name.myvtex.com/_v/yunopartnerbr.yuno/v4/webhook` (replace `store_name` with your actual VTEX store name).
      3. **x-api-key** and **x-secret**: You can use any value here, such as **VTEX** for both fields.
   4. Under **Trigger on**, select all events you want to receive notifications for. Yuno recommends enabling all options.
   5. Click **Add** to save the webhook.

![](https://files.readme.io/ccc5357-image.png)

### Pix payment expiration management

Yuno offers enhanced management of Pix payment expirations when integrated with VTEX. This feature helps prevent order reconciliation issues and keeps payment statuses consistent across VTEX, Yuno, and your payment provider.

When you enable Pix payments with VTEX, Yuno automatically handles expiration in the following ways:

- **Custom expiration tracking**: Yuno tracks Pix payment expiration dates internally, without relying solely on provider webhooks.
- **Proactive verification**: Before a Pix payment expires, Yuno checks with the provider to confirm whether the payment was completed.
- **Automatic order cancellation**: If a Pix payment expires without being paid, Yuno immediately notifies VTEX via webhook, enabling automatic order cancellation.
- **Consistent reconciliation**: This process ensures that payment statuses remain synchronized between VTEX, Yuno, and your payment provider.

This functionality is especially useful for merchants who set custom expiration dates for Pix payments. It prevents orphaned orders and inventory discrepancies by addressing a common issue: VTEX may continue trying to authorize expired Pix payments for an extended period (up to 24 retries), which can cause status mismatches between systems.

> **Important:** Enhanced expiration management only applies when you set a custom `expiration_date` during Pix payment creation. It does not apply to default provider expiration times.

---

After completing the configuration steps above, your customers will see the new payment methods at checkout. For example, if you enable Visa, customers selecting credit card at checkout will use the VTEX credit card form, while Yuno collects all necessary information for fraud screening and 3DS in the background.

<Image align="center" src="https://files.readme.io/a17a02d-vtex.png" />

Once you start receiving payments in VTEX with Yuno, you can view all transaction details in your [Yuno dashboard](doc:payments-2) as with any other payment method.

- As additional information, you can identify the VTEX account associated with each payment in the payment details, specifically within the `metadata` structure.

  ```json
  "metadata": [
      {
        "key": "vtex_account",
        "value": "[your_vtex_subaccount]"
      }
    ]
  ```

### Customizations

### Customizations

You can tailor the checkout experience in VTEX to better match your brand and customer needs. VTEX allows merchants to customize several aspects of the checkout flow, including the appearance and naming of payment methods.

- [Customize the checkout page](https://developers.vtex.com/docs/guides/customization): Adjust the layout, design, and user experience of your checkout.
- [Change payment method names in checkout](https://developers.vtex.com/docs/guides/change-payment-method-names-in-checkout): Update how payment methods are displayed to your customers.

For more details, refer to the official VTEX documentation linked above.
