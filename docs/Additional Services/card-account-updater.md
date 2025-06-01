---
title: Card Account Updater
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
Card Account Updater (CAU) is a feature available at Yuno to maintain the integrity of stored credit or debit cards, preventing issues caused by expired or outdated card details. When customers provide their card information for recurring billing or subscription services, Card Account Updater ensures that their stored card data remains current. With Yuno’s Card Account Updater, no additional development effort is required to ensure your card details will be updated seamlessly in the background.

![](https://files.readme.io/56a99306e4991180fe968be6ef7c34c035ede94ec07f623a12d3a24edbdeea46-YunoCardAccount_Updater.png)

## Benefits of Card Account Updater

* **Improved Payment Success Rates:** Automatically updating card information reduces the likelihood of failed transactions due to expired or replaced cards, ensuring a higher success rate for recurring payments.
* **Enhanced Customer Experience:** By ensuring seamless and uninterrupted service, customers do not need to manually update their card information, leading to a smoother and more positive experience.
* **Reduced Operational Costs:** Automated updates decrease the need for manual interventions and customer service inquiries related to payment issues, saving time and resources.
* **Increased Revenue:** Higher transaction approval rates translate to fewer missed payments and potentially increased revenue.
* **Security and Compliance:** Centralizing card updates within the vault ensures that sensitive card information is handled securely and complies with relevant regulations and standards.
* **Operational Efficiency:** Streamlining the process of updating card information helps maintain operational efficiency and consistency across payment systems.
* **Customer Retention:** Minimizing disruptions in service due to payment failures can help maintain customer loyalty and retention.

## How does it work?

The Card Account Updater service operates asynchronously, working independently of the payment flow. Card updates are performed automatically, so there is no need to handle individual responses from the service.

Yuno updates card details in the following scenarios:

* The card is past its expiration date.
* The account associated with the card is in a closed, disabled, or flagged state.

When the card's expiration date has passed, Yuno can update all the card information or only the expiration date. The option used will depend on the card issuer's approach to card replacement.

Once a card has been updated, Yuno will send a webhook to notify you of the change. **The`vaulted_token` and `fingerprint` for the enrolled card will remain the same, so you don't need to change anything in your integration**. This webhook will contain the following:

* The latest expiry date, last four digits, and Issuer Identification Number (IIN).
* The reason for the update.
* Details of the card being replaced.

The following code block presents a notification example:

```json
{
  "type": "enrollment",
  "type_event": "enrollment.update",
  "account_id": "493e9374-510a-4201-9e09-de669d75f256",
  "retry": 0,
  "version": 2,
  "data": {
    "payment_method": {
      "id": "03c3aae1-ed42-4be6-bc24-de5487f58491",
      "account_id": "493e9374-510a-4201-9e09-de669d75f256",
      "name": "VISA ****1111",
      "description": "VISA ****1111",
      "type": "CARD",
      "category": "CARD",
      "country": "CO",
      "status": "ENROLLED",
      "customer_id": "2f38972e-2427-43b7-95be-ee4cf21cef1b",
      "created_at": "2024-09-10T15:04:10.453741Z",
      "updated_at": "2024-09-10T15:04:10.453745Z",
      "enrollment": {
        "session": null,
        "sdk_action_required": false
      },
      "verify": {
        "vault_on_success": false,
        "currency": null,
        "payment": null
      },
      "detail": {
        "card": {
          "holder_name": "John Doe",
          "expiration_month": 3,
          "expiration_year": 26,
          "iin": "41111111",
          "lfd": "1111",
          "security_code_length": 3,
          "number_length": 16,
          "brand": "VISA",
          "issuer_name": "JPMORGAN CHASE BANK N A",
          "issuer_code": null,
          "type": "CREDIT",
          "category": "CREDIT",
          "country_code": "US",
          "country_name": "United States of America",
          "fingerprint": "d244e20d-43a1-43f7-9b48-0a76423be35e",
          "created_at": "2024-09-10T15:04:10.453799Z",
          "updated_at": "2024-09-10T15:04:10.453800Z"
        },
        "card_data_history": [
         {
          "holder_name": "John Doe",
          "expiration_month": 3,
          "expiration_year": 24,
          "iin": "4222222",
          "lfd": "2222",
          "security_code_length": 3,
          "number_length": 16,
          "brand": "VISA",
          "issuer_name": "JPMORGAN CHASE BANK N A",
          "issuer_code": null,
          "type": "CREDIT",
          "category": "CREDIT",
          "country_code": "US",
          "country_name": "United States of America",
          "fingerprint": "d244e20d-43a1-43f7-9b48-0a76423be35e",
          "provider_data": {
                 "id": “MASTERCARD”,
                 "status": “UPDATED
          },
          "created_at": "2024-09-10T15:04:10.453799Z",
          "updated_at": "2024-09-10T15:04:10.453800Z"
        }
       ]
      }
    }
  }
}

```

## Card networks' compatibility

Card Account Updater is currently available for Visa and Mastercard.

## Activating the Card Account Updater

To activate Card Account Updater in your Yuno account, contact the Yuno support team at [support@y.uno](mailto:support@y.uno). Note that registration occurs directly with the Card Schemes and may take up to 10 working days for new customers.
