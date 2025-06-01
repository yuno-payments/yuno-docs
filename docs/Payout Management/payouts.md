---
title: Payouts
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Payouts
  description: >-
    Yuno Payouts is an API solution designed to streamline the process of
    sending secure payouts to various beneficiaries, such as users, merchants,
    providers, and customers. By integrating our Payouts service, you can
    efficiently distribute funds to multiple recipients while ensuring their
    security.
  robots: index
next:
  description: ''
---
Yuno Payouts is an API solution designed to streamline the process of sending secure payouts to various beneficiaries, such as users, merchants, providers, and customers. With Yuno Payouts, you can efficiently distribute funds to multiple recipients while ensuring their security and taking complete control of your payout operations.

The Yuno Payout solution enables you to create payout requests without restrictions on the number of records. You can perform payouts to any bank, card, or wallet. The payout options are only limited by the provider you choose to use.

## Benefits of using Yuno Payouts

* **Centralization**: The Payout service saves you time and costs by centralizing all your payment operations in one place. You no longer need to manage payments across multiple systems or interfaces.
* **Information** : Stay informed about payment statuses with our customizable notifications. You can receive real-time updates on any changes in the payment order status tailored to your preferences.
* **Localization**: By depositing funds directly into your partners' local bank accounts, you can pay them in their preferred currency, eliminating the need for foreign currency conversions and saving them from extra fees and taxes.

## How Payouts work

A payout in Yuno can go through a few different states, starting with its creation. When you create a payout, it automatically receives the **CREATED** status. However, the **CREATED** status is temporary. As Yuno checks and transfers the information to the provider, the payout status changes to **PENDING**. 

<Image align="center" src="https://files.readme.io/9b3d5c1-Driagram-yuno.png" />

When the payout changes to the **PENDING** status, a series of actions are performed, defining if the payout will succeed, transfer the funds, or if it will be blocked. Below, you find the description for each of the possible ending states:

* **SUCCEEDED**:  The provider validates the transaction, and the funds are successfully transferred to the beneficiary’s account. You'll receive a confirmation notification.
* **REJECTED**:  The payout was not processed due to problems Yuno identified before attempting the transfer. Possible reasons for a rejected payout include insufficient funds or incorrect payout details, like a wrong account number. You'll need to create a new payout to perform the transaction.
* **DECLINED**:  The payout was attempted, but the provider refused to accept it. Reasons for a declined payout include a frozen or closed beneficiary account or the transaction being flagged as a potential fraud. You'll need to create a new payout to perform the transaction.

Learn more about the payout status on the [Payouts Status](ref:payout-workflow) page.

## New Concepts

* **Beneficiary**: This is equivalent to the customer for payins. It is the object that receives beneficiary information for the payout. Example: If the payout is for salary payments, the beneficiary would be the employee receiving their salary. 
* **Withdrawal Method**: Similar to Payins, where information for the corresponding payment method must be completed for the payment, in payouts, information for the withdrawal method to be used for the payout must be completed. Within this, the corresponding information must be sent depending on the category of the withdrawal method, which can be cards, bank transfers, or wallets.

## Using Yuno Payouts

The Yuno Payouts feature is available through Yuno API. You can use the API to create and retrieve payout information.  To use the Payouts solution, you need to fulfill the following requirements:

* You need a Yuno account.
* You need to integrate with [Yuno API](ref:create-payout).
* Have an account with an external provider that supports payouts.

 To use the Payouts solution, you'll need to follow the steps below:

1. Configure the provider credentials in the [Connections section](https://docs.y.uno/docs/connections) in your Yuno dashboard. 
   1. [Optional] - And a [Webhook URL](https://docs.y.uno/docs/configure-webhooks) to get notifications about updates with the payout transactions. 
2. Create the payout using the [Create Payout](ref:create-payout) endpoint. You need to provide the beneficiary information, the amount, and the withdrawal method to make the payout.
3. Yuno will verify the information and then send the payout request to the provider. The provider will analyze the available funds to authorize the payment.
4. To check the current status of payouts, you can use one of the following options:
   * The [Retrieve Payout by ID](ref:retrieve-payout-by-id) endpoint, informing the `id` received after creating the payout.
   * The [Retrieve Payout by Merchant Reference](ref:retrieve-payout-by-merchant-reference) endpoint, informing the `merchant_reference` provided when creating the payout.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Yuno Payouts availability</h3>
      <div class="contentContainer">
        <p>
					Yuno Payouts requires a security and risk analysis. To learn more about the Yuno Payouts, check the provider's support or request the activation, contact <a href="mailto:support@y.uno">Yuno's support team</a>.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Referenced Payouts

Payouts could be made to different payment methods, such as bank accounts and even card, depending on the provider. For Payouts to a card payment method where the merchant does not have the credit card information (not being PCI compliant) Yuno lets them send the Payout if the card was previously used in a payment. This is called a "Referenced Payout". 

In order to be able to use this, you'll need to first charge the customer using one of our PCI compliant solutions (Any [Yuno SDK](doc:yuno-sdks)) and then make a Payout indicating the original transaction where we can find the credit card information. 

```json
"withdrawal_method": {
    "type": "STP_PAYOUT",
    "provider_id": "STP",
    "original_transaction_id":"9104911d-5df9-429e-8488-ad41abea1a4b"
  }
```
