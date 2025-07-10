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
Yuno Payouts is an API solution that helps you send secure payouts to a wide range of beneficiaries, including users, merchants, providers, and customers. By integrating Yuno Payouts, you can efficiently distribute funds to multiple recipients, maintain full control over your payout operations, and ensure the security of every transaction.

With Yuno Payouts, you can create payout requests without limits on the number of records. Payouts can be made to any bank, card, or wallet, depending on the capabilities of your chosen provider.

## Benefits of using Yuno Payouts

Discover the key advantages of managing your payouts with Yuno:

* **Centralization**: Manage all your payout operations in one place, saving time and reducing costs. Eliminate the need to handle payments across multiple systems or interfaces.
* **Information**: Stay up to date with customizable notifications. Receive real-time updates on any changes to your payout status, tailored to your preferences.
* **Localization**: Pay your partners directly into their local bank accounts and in their preferred currency. This removes the need for foreign currency conversions and helps avoid extra fees and taxes.

## How payouts work

Yuno Payouts follow a clear workflow, moving through several statuses from creation to completion. Understanding these statuses helps you track and manage your payout operations effectively.

When you create a payout, it starts in the **CREATED** status. This is a temporary state while Yuno verifies the information and prepares to send it to the provider. Once the information is transferred, the payout moves to the **PENDING** status.

<Image align="center" src="https://files.readme.io/9b3d5c1-Driagram-yuno.png" />

While in the **PENDING** status, Yuno and the provider perform a series of checks to determine the outcome of the payout. The payout will then transition to one of the following final statuses:

* **SUCCEEDED**: The provider has validated the transaction, and the funds have been successfully transferred to the beneficiary’s account. You will receive a confirmation notification.
* **REJECTED**: The payout was not processed because Yuno identified an issue before attempting the transfer. Common reasons include insufficient funds or incorrect payout details, such as an invalid account number. To complete the transaction, you must create a new payout.
* **DECLINED**: The payout was attempted, but the provider refused to process it. This can happen if the beneficiary’s account is frozen or closed, or if the transaction is flagged as potential fraud. You will need to create a new payout to try again.

For more details about payout statuses, see the [Payouts status](ref:payout-workflow) page.

## New concepts

Before you start using Yuno Payouts, familiarize yourself with these key terms:

* **Beneficiary**: The recipient of the payout. This is similar to the customer in payins. For example, if you are making salary payments, the beneficiary is the employee receiving their salary.
* **Withdrawal method**: The method used to transfer funds to the beneficiary. Just as payins require payment method details, payouts require information about the withdrawal method. Depending on the category—such as card, bank transfer, or wallet—you must provide the relevant details for the chosen withdrawal method.

## Using Yuno Payouts

You can manage payouts through the Yuno API, which allows you to create and retrieve payout information efficiently. Before you begin, make sure you meet the following requirements:

* You have a Yuno account.
* You are integrated with the [Yuno API](ref:create-payout).
* You have an account with an external provider that supports payouts.

To start using Yuno Payouts, follow these steps:

1. Configure your provider credentials in the [Connections section](https://docs.y.uno/docs/connections) of your Yuno dashboard.
   1. (Optional) Set up a [webhook URL](https://docs.y.uno/docs/configure-webhooks) to receive notifications about updates to your payout transactions.
2. Create a payout using the [Create payout](ref:create-payout) endpoint. You will need to provide beneficiary details, the payout amount, and the withdrawal method.
3. Yuno will verify the information and send the payout request to your provider. The provider will check the available funds and authorize the payment.
4. To check the status of your payouts, you can use one of the following endpoints:
   * [Retrieve payout by ID](ref:retrieve-payout-by-id), using the `id` returned when you created the payout.
   * [Retrieve payout by merchant reference](ref:retrieve-payout-by-merchant-reference), using the `merchant_reference` you provided when creating the payout.

> 🚧 Yuno Payouts availability
>
> Yuno Payouts requires a security and risk analysis before activation. To learn more about provider support or to request activation, contact [Yuno's support team](mailto:support@y.uno).

## Referenced payouts

Some providers allow you to make payouts to different payment methods, such as bank accounts or cards. In cases where you want to send a payout to a card but do not have access to the card details (for example, if you are not PCI compliant), Yuno enables you to process the payout if the card was previously used in a payment. This process is called a "referenced payout."

To use referenced payouts, you must first charge the customer using one of Yuno’s PCI-compliant solutions (such as any [Yuno SDK](doc:yuno-sdks)). When creating the payout, you then reference the original transaction so Yuno can securely retrieve the card information.

Example:

```json
"withdrawal_method": {
    "type": "STP_PAYOUT",
    "provider_id": "STP",
    "original_transaction_id":"9104911d-5df9-429e-8488-ad41abea1a4b"
  }
```
