---
title: Token Migration Process [remove tabs copy]
deprecated: false
hidden: true
metadata:
  description: >-
    Token migration is the process by which the card numbers stored in a
    provider are transferred to Yuno's vault. This process involves the
    generation of a new token for each card.
  robots: index
---
Token migration is the process of transferring card numbers from an existing provider to Yuno's secure vault. During this process, a new token is generated for each card, ensuring seamless continuity and security for payment processing. The token migration process consists of three main steps:

1. The merchant requests the token migration process from their current payment processor.
2. Yuno and the payment provider collaborate to securely import all card data into the Yuno token vault.
3. The merchant uses Yuno's token migration API to map the tokens from the payment provider to the `vaulted_tokens` of Yuno.

> 📘 First step
>
> To initiate the token migration process, contact your business advisor at Yuno to assess the viability and schedule of the procedure.

## Importing cards from a gateway account (steps 1 and 2)

Importing card data from a gateway account involves handling sensitive information, so strict security protocols must be followed. To import card data into Yuno from an existing gateway, complete the following steps:

1. **Coordinate with the current gateway**: Contact your current third-party vault or gateway and request an export of the payment method data. Ensure you follow their specified protocols.
2. **Complete the formal request**: Submit a formal request to Yuno, ensuring all required details and processes are documented. The gateway's response time and procedures will determine the data transfer process.

> 🚧 Your responsibilities when migrating tokens
>
> You are responsible for managing communication with your gateway provider throughout the migration process. The Yuno team will support and collaborate directly with the third-party vault/gateway to facilitate the importing process. Additionally, the customer subscription information, including amounts, dates, etc., must be obtained directly from the exporting entity, as Yuno will not extract this data from encrypted files.

> 📘 Data transfer security
>
> All data throughout the migration process is encrypted using PGP keys and transferred using SFTP (Secure File Transfer Protocol).

## Client-side requirements (step 3)

To successfully complete the token migration process, it is essential to fulfill the client-side requirements outlined in step 3. This involves providing the necessary user data, including the buyers and their existing payment methods.

You can execute the token migration process using the Yuno API, which is specifically designed for merchants. As a merchant, you will use this API to:

1. **Add customers**: Register customers in the Yuno system.
2. **Enroll payment methods**: Register payment methods obtained from payment processors for each customer in the Yuno system.

> 📘 API migration option
>
> The API migration option allows merchants to manage their customers and their respective payment data. [Learn more](#api-migration)

For a detailed guide on performing token migration using the API, click the button below:

<Shelf classname="link_cards_container">
  <YunoCard title="Token migration via API" href="via-api" titleSize="h4" />
</Shelf>

### Data format

Yuno specifies the required parameters for each customer and credit card to proceed with the migration process. The required parameters are listed below:

* Account ID
* Merchant customer ID
* First name
* Last name
* Email
* Country
* Document number
* Document type
* Payment method type
* Payment method ID
* Payment method token

Refer to the [Customer Object](ref:the-customer-object) and [Payment Method Object](ref:the-payment-method-object-api) to explore all possible parameters for importing/creating customers or enrolling payment objects.

Technical limitations associated with alternative payment methods may make them ineligible for migration between service providers. If you are considering migrating alternative payment method tokens, such as Mercado Pago Wallet Connect or Bancolombia Tokenbox, to the Yuno vault, please contact the Yuno support team.

## Data validation

To ensure efficient processing and prevent delays during the token migration process, please provide the following information when communicating with Yuno Support:

* The external identifier name that will be used for the import.
* An approximate count of the expected number of payment methods to be included (a rough estimate is acceptable).
* Any known data gaps, such as missing names or expiration dates.

> 🚧 Important notice
>
> Yuno does not validate expiration dates during credit card import.

## Data protection

When processing payments through Yuno, the platform connects to payment processors. Yuno tokenizes and encrypts the data to ensure security, simplifying the PCI compliance process. However, you are responsible for managing and protecting your customer's data. Additionally, you must communicate any additional fees or issues to your customer.

## Gateway and payment provider requirements

To proceed with the migration process, you will need to provide the following:

* A public SSH key (you can provide one for production and another for testing). Use the following command to generate it: `ssh-keygen -t rsa -b 4096 -C your_email@example.com`
* The outbound IPs that will be used during the migration.
* A template file of the data to be migrated to understand its structure. It must include the following mandatory data:
  * **Cardholder name**: The full name of the cardholder as stored by the current provider.
  * **Expiration date**: The expiry date of the card.
  * **Card number**: The complete card number (PAN) that will be tokenized by Yuno.
  * **Card ID**: A unique identifier assigned to each card by the current provider, used by the client for referencing that card during transactions.

### PGP public key

Use our public key to encrypt the PCI-sensitive files you send to Yuno.

<Tabs>
  <Tab title="Sandbox">
    Email: [security-migrations@y.uno](mailto:security-migrations@y.uno)

    Comment: For encrypting sensitive data. Environment: sandbox

    Created: 22 Nov 2024

    Expires: 22 Nov 2026

    Key ID: B342E3D3

    Length: 4096

    Algorithm: RSA

    Fingerprint: 2B37 55FA 426A B1D0 2061 4C6C 919C 4D81 B342 E3D3

    <Shelf classname="cards_container">
      <div class="first_row">
        <YunoCard type="pgp-key" title="Public PGP Key" href="https://yuno-public-keys.prod.y.uno/generic-pgp-keys_public_key_sandbox.asc">
          Download the public PGP key for encrypting sensitive data in the sandbox environment.
        </YunoCard>
      </div>
    </Shelf>
  </Tab>

  <Tab title="Production">
    Email: [security-migrations@y.uno](mailto:security-migrations@y.uno)

    Comment: For encrypting sensitive data. Environment: production

    Created: 22 Nov 2024

    Expires: 22 Nov 2026

    Key ID: 73D3D88A

    Length: 4096

    Algorithm: RSA

    Fingerprint: 5160 7134 4C00 D270 93FB C450 19ED AACD 73D3 D88A

    <Shelf classname="cards_container">
      <div class="first_row">
        <YunoCard type="sdk-integrations" title="Public PGP Key" href="https://yuno-public-keys.prod.y.uno/generic-pgp-keys_public_key_production.asc">
          Download the public PGP key for encrypting sensitive data in the production environment.
        </YunoCard>
      </div>
    </Shelf>
  </Tab>
</Tabs>