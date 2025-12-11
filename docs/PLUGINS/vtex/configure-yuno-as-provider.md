---
title: Configure Yuno as provider
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

<Image border={false} src="https://files.readme.io/b5feefa-image.png" />

3. Search for **Yuno** on the dialog and select the **Yuno** option on the results.

<Image border={false} src="https://files.readme.io/0277803-image.png" />

4. Fill out the form with the required information. Following, you will find a description for each field you need to fill:

> 📘 Franchise Account Fields
>
> Only fill the "Main account …" fields if your VTEX environment uses the [Franchise model](https://help.vtex.com/tutorial/what-is-a-franchise-account--kWQC6RkFSCUFGgY5gSjdl). For [Standard or Seller Portal](https://help.vtex.com/tutorial/choosing-between-standard-account-franchise-account-or-seller-portal--4S90HzzhMyZESsHqrnUs78) accounts, leave them blank.

| Field                                       | Description                                                                                                                                                                                                                                                          |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **App key**                                 | VTEX application keys. For additional information on accessing it, see [Generating internal application keys](https://help.vtex.com/tutorial/application-keys--2iffYzlvvz4BDMr6WGUtet#generating-internal-application-keys).                                         |
| **App Token**                               | VTEX application token, which you find when [Generating internal application keys](https://help.vtex.com/tutorial/application-keys--2iffYzlvvz4BDMr6WGUtet#generating-internal-application-keys).                                                                    |
| **Create customer**                         | This field controls whether a customer is created in Yuno. Select **Yes** to create the customer, or **No** to leave it unchanged. The default value is **No**.                                                                                                      |
| **Main account app key (Franchise only)**   | VTEX application key from your main VTEX account. For additional information on accessing it, see [Generating internal application keys](https://help.vtex.com/tutorial/application-keys--2iffYzlvvz4BDMr6WGUtet#generating-internal-application-keys).              |
| **Main account app token (Franchise only)** | VTEX application token from your main VTEX account, paired with the Main account app key. You can find it when [Generating internal application keys](https://help.vtex.com/tutorial/application-keys--2iffYzlvvz4BDMr6WGUtet#generating-internal-application-keys). |
| **Main account name (Franchise only)**      | The main VTEX account name (`accountName`) that owns these credentials. Use the exact account name as it appears in VTEX Admin.                                                                                                                                      |
| **Name**                                    | Connection name. You can use **Yuno**.                                                                                                                                                                                                                               |
| **Enable Test Mode**                        | It enables you to decide whether to use the Production or Sandbox environments. While you are testing, Yuno recommends you enable test mode.                                                                                                                         |
| **Automatic Settlement**                    | Select the option **Use behavior recommended by payment processor**.                                                                                                                                                                                                 |
| **Affiliation Name**                        | This name should be equal to the previously provided for connection **Name**.                                                                                                                                                                                        |
| **Account_ID**                              | The Yuno `account_id`. You can find this information in the [Yuno dashboard](https://dashboard.y.uno/developers). For additional information, see [Developers (Credentials)](doc:developers-credentials).                                                            |
| **Public API Key**                          | The Yuno `public-api-key`. You can find this information in the Yuno dashboard. For additional information, see [Developers (Credentials)](doc:developers-credentials).                                                                                              |
| **Private Secret Key**                      | The Yuno `private-secret-key`. You can find this information in the Yuno dashboard. For additional information, see [Developers (Credentials)](doc:developers-credentials).                                                                                          |

> 🚧 Test Mode Warning
>
> VTEX recommends you to not enable the test mode in production environments, since the test payment options will be available to customers in your store.

> ❗️ Automatic Settlement Warning
>
> There is a known issue affecting the option **Scheduled: Schedules the Automatic Capture**. You can find more details [here](https://help.vtex.com/en/known-issues/scheduled-automatic-capture-does-not-appear--1cuvGbgUvd1ATeHEG6Il98).
>
> Before performing the update (`PUT`), the affiliation first makes a `GET` request to retrieve the current configuration.

5. After filling in all fields, click **Save**.
6. Navigate to **Store Settings** > **Settings** and click the **+** button (green button at the top right corner) to add a new payment option.

<Image border={false} src="https://files.readme.io/f053995-image.png" />

7. Select the payment method you want to provide for your customer. You need to configure the provider for each payment method you want to make available, including card brands (Visa, Mastercard, etc.), alternative payment methods (PIX, Boleto, Mercado Pago Wallet, etc.), and other payment types.

<Image border={false} src="https://files.readme.io/4ad7929-image.png" />

8. After you select the payment method, a new dialog is displayed where you need to configure the payment provider:
   1. At the **Process with provider**, select **Yuno**.
   2. Add special conditions if necessary. For additional information regarding configuring the special conditions, access [Configuring payment special conditions](https://help.vtex.com/tutorial/special-conditions--tutorials_456#). For further information on configuring payment conditions considering installments with or without interest, check the [VTEX page](https://help.vtex.com/en/tutorial/how-to-configure-payment-conditions--tutorials_455?\&utm_source=autocomplete#installments-without-interest).
   3. Click **Save**.
   4. Change the **Status**  to **Active**.

<Image border={false} src="https://files.readme.io/cd7de3e-image.png" />

> 📘 Adding Multiple Payment Methods
>
> If you want to add more than one payment method to offer to your clients, you need to repeat steps **7** and **8** for each payment method. For example:
> * To offer Visa and Mastercard, repeat steps **7** and **8** two times, one for Visa and the other for Mastercard.
> * To offer cards and alternative payment methods like Mercado Pago Wallet or PIX, configure each payment method separately.

9. As the last step, you have to configure the Webhook URL to receive the updates from the payments.
   1. Access the [Yuno Dashboard](https://auth.y.uno/u/login?) and select **Developers**.
   2. Select the **Webhooks** tab.
   3. Click **add webhook**. The webhook  form will show up, where you should provide the following information:
      1. **Name**: Define a name for the VTEX webhook.
      2. **Endpoint URL**: You should inform the following URL **`https://{store_name}.myvtex.com/_v/yunopartnerbr.yuno/v4/webhook`** (replace `{store_name}` with your actual store name).
      3. **x-api-key** and **x-secret**: You can set any information here. For example, you can add **VTEX** for both fields.
   4. For **Trigger on**, check all events that should notify you through the webhooks. Yuno recommends checking all options.
   5. Click **Add**.

<Image border={false} src="https://files.readme.io/ccc5357-image.png" />

### PIX payment expiration management

When configuring PIX payments with VTEX, Yuno provides automatic expiration handling to prevent order reconciliation issues:

* **Custom expiration tracking (connection level):** Yuno monitors PIX payment expiration based on the `expiration_date` defined in the VTEX–Yuno connection, without relying solely on provider webhooks
* **Proactive verification:** Before expiration, Yuno makes a request to the provider to confirm whether the payment was completed
* **Automatic order cancellation:** If a PIX QR code expires unpaid, Yuno marks the payment as expired and immediately notifies VTEX via webhook so the order can be cancelled automatically
* **Reconciliation consistency:** This ensures payment statuses remain synchronized across VTEX, Yuno, and the payment provider

This feature is particularly useful to prevent VTEX from continuing to retry expired PIX payments, eliminating status mismatches and reducing reconciliation overhead.

<Callout icon="📘" theme="info">
  ## Important

  For VTEX integrations, the `expiration_date` is configured at the **connection level** in Yuno. This enhanced expiration handling only applies when a custom expiration time is set in the connection, not when using the default provider expiration.
</Callout>

After completing the steps above, your clients can access a new payment method at checkout.
For example, if you configure Visa, when your customers select credit card at checkout, the Yuno checkout will gather all the information required for fraud screening and 3DS services in the background while using the VTEX credit card form.

<Image align="center" border={false} src="https://files.readme.io/a17a02d-vtex.png" />

Once you start receiving payments in VTEX with Yuno, you will be able to see all the information related to the transactions in your [Yuno dashboard](doc:payments) as a regular payment.

* As additional info in the payment detail, particularly inside the metadata struct, you will also be able to identify the VTEX account related to the payment creation.

  ```json
  "metadata": [
      {
        "key": "vtex_account",
        "value": "[your_vtex_subaccount]"
      }
    ]
  ```
* When a customer attempts multiple payments and those payments are declined, VTEX activates **Defense Mode**. During this period, VTEX does not execute our payment app, which means Yuno's fraud detection features are disabled. The payment process is delayed by VTEX and forwarded to the Yuno PPF connector. Once received, the Yuno PPF connector will send the payment along with the metadata `defense_mode=true`.

  Yuno recommends configuring a route that bypasses fraud validation whenever the `defense_mode` metadata is set to `true`.

  ```json
  "metadata": [
    {
      "key": "defense_mode",
      "value": "[true/false]"
    }
  ]
  ```
* The VTEX connector captures the `sellerId` (Affiliate Code) from VTEX orders and includes it in the checkout session and payment metadata. This enables marketplace tracking and affiliate mode functionality, allowing merchants to track attribution between their own stores and partner marketplaces.

  ```json
  "metadata": [
    {
      "key": "sellerId",
      "value": "[affiliate_code_from_vtex_order]"
    }
  ]
  ```

  For more information about VTEX Affiliate mode, see the [VTEX documentation on configuring affiliates](https://help.vtex.com/tutorial/configuring-affiliates--tutorials_187).

### Automatic customer creation for Click to Pay

When customers choose to pay via Click to Pay on VTEX merchants, the VTEX connector automatically creates the corresponding VTEX customer record in Yuno during the checkout flow initialization. This ensures a streamlined payment experience by eliminating redundant data entry.

**How it works:**

* **Automatic creation**: When a shopper initiates a Click to Pay transaction, the VTEX customer is automatically created in Yuno if it doesn't already exist
* **Data mapping**: All customer data available in the VTEX profile is automatically mapped to Yuno and included in the checkout session
* **Pre-filled fields**: The SDK automatically pre-fills customer information (CVV, email, address) from the VTEX profile, eliminating the need for customers to re-enter this information
* **UX improvement**: The Click to Pay flow matches the streamlined experience for non-VTEX merchants, with no unnecessary input steps

This feature requires the **Create customer** field to be set to **Yes** in the VTEX provider configuration (see step 4 in the configuration process above).

<Callout icon="📘" theme="info">
  ## Important

  The automatic customer creation only applies when using Click to Pay as the payment method. For other payment methods, customer creation follows the standard flow based on the "Create customer" configuration setting.
</Callout>

### Customizations

If you want to add or change certain UX aspects of the checkout, VTEX lets the merchants modify a few things:

* Checkout Page [customizations](https://developers.vtex.com/docs/guides/customization)
* [Change Payment Method names](https://developers.vtex.com/docs/guides/change-payment-method-names-in-checkout) in Checkout.

### Available options

For more information on the custom auto capture feature, [refer to the VTEX documentation](https://developers.vtex.com/docs/guides/custom-auto-capture-feature).

## ClearSale field mappings

When using ClearSale fraud detection with the VTEX connector, Yuno automatically maps VTEX order data to ClearSale's required fields. This ensures that all necessary information is correctly passed to ClearSale for fraud analysis.

### Delivery type mapping

The `deliveryType` field from VTEX orders is automatically extracted and mapped to ClearSale. This field is mandatory for merchants using ClearSale's Chargeback Guarantee product.

**VTEX to ClearSale Mapping:**

The VTEX connector extracts the `deliveryType` value from VTEX order logs (available in `AdditionalData.Order.Shipping.Type`) and correctly maps it to ClearSale. Common delivery type values include:

* `Normal` → Mapped as `NORMAL`
* `ECONOMY` → Mapped as `ECONOMY`
* Other delivery types are mapped according to ClearSale's field requirements

The delivery type is automatically included in the payload sent to ClearSale, ensuring compliance with ClearSale's mandatory field requirements for Chargeback Guarantee products.

> 📘 ClearSale Integration
>
> For merchants using ClearSale's Chargeback Guarantee product, the `deliveryType` field is mandatory. The VTEX connector ensures this field is correctly extracted from VTEX orders and properly formatted for ClearSale.
