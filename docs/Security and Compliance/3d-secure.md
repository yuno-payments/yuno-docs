---
title: 3D Secure
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
## What is 3D Secure 2?

3D Secure, or 3DS, is a security protocol for online payments designed to prevent the fraudulent use of credit cards in card-not-present (CNP) transactions. The protocol, developed in 1999, requires additional verification steps for customers during the purchase process to authenticate themselves and reduce the risk of fraud. The flow below presents a payment process using 3DS:

![](https://files.readme.io/0f08d565c96df5bed7bfa98cf4223662afc41323e477be6dd2c47163bbbb15d2-3ds1.png)

Where:

* **Merchant Plugin Interface (MPI)** initiates the verification process by facilitating the secure exchange of information between the merchant, scheme Directory Server, and the cardholder’s issuing bank.
* **Scheme Directory Server (DS)** acts as a centralized database and facilitates the identification of the appropriate cardholder’s issuing bank and the corresponding authentication method to be used.
* **Issuer Access Control Server (ACS)** is responsible for verifying and validating the cardholder’s identity during a 3DS transaction. The Issuer ACS receives authentication requests and performs risk assessments and authentication checks based on the bank’s predefined rules and policies.

3D Secure 2, or 3DS2, published in 2016, is an updated version of the original 3DS protocol and uses dynamic authentication methods such as biometrics and token-based authentication, whereas the original 3DS protocol relies on static passwords. 3DS2 aims to provide a better user experience with a more fluid flow for end users during authentication. EMVCo, an organization owned by major card brands, developed and managed both protocols. All major card brands stopped supporting the first version of 3DS in October 2022. Therefore, integrating the 3DS2 verification step is essential to ensure your customers' experience and security. Yuno already provides an easy 3DS2 integration for your business.

<TableWrapper>
  <CompanyCard title="Visa" image="https://icons.prod.y.uno/visa_logosimbolo.png" />

  <CompanyCard title="Mastercard" image="https://icons.prod.y.uno/mastercard_logosimbolo.png" />

  <CompanyCard title="American Express" image="https://icons.prod.y.uno/amex_logosimbolo.png" />

  <CompanyCard title="JCB" image="https://icons.prod.y.uno/jcb_logosimbolo.png" />

  <CompanyCard title="Diners Club" image="https://icons.prod.y.uno/dinnersclub_logosimbolo.png" />

  <CompanyCard title="UnionPay" image="https://icons.prod.y.uno/unionpay_logosimbolo.png" />

  <CompanyCard title="Cartes Bancaires" image="https://icons.prod.y.uno/cartabancaire_logosimbolo.png" />
</TableWrapper>

<br />

<br />

<HTMLBlock>{`
<style>
    .psp-card .psp-card-logo {
    max-width: 60px;
  }
  
  .psp-card .detail-psp-card-content {
    display: flex;
    justify-content: space-evenly;
  }
</style>

<body>
  <div class="shelf">
    <div class=" psp-card">
      <section class="detail-psp-card ">
        <div class=" detail-psp-card-content">
     			 <img class="psp-card-logo" src="https://icons.prod.y.uno/visa_logosimbolo.png">
            <img class="psp-card-logo" src="https://icons.prod.y.uno/mastercard_logosimbolo.png">
          	<img class="psp-card-logo" src="https://icons.prod.y.uno/amex_logosimbolo.png">
            <img class="psp-card-logo" src="https://icons.prod.y.uno/jcb_logosimbolo.png">
          	<img class="psp-card-logo" src="https://icons.prod.y.uno/dinnersclub_logosimbolo.png">
          	<img class="psp-card-logo" src="https://icons.prod.y.uno/unionpay_logosimbolo.png">
          <img class="psp-card-logo" src="https://icons.prod.y.uno/cartabancaire_logosimbolo.png">
		    </div>
      </section>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Benefits of 3D Secure 2

As mentioned, 3DS2 was developed to enhance the user experience and adapt the 3DS protocol to the modern payment landscape.

### Prepared for new technologies

3DS2 was designed with the rise of smartphones in mind and allowed banks to offer innovative authentication experiences through their mobile banking apps, such as biometric authentication using fingerprints or facial recognition. Therefore, merchants can offer several authentication methods that align with consumer preferences and technological advancements, resulting in a more convenient and secure authentication process.

### Integration capabilities

Regarding integration, 3DS2 includes an SDK component that enables native integration into mobile apps. As a result, merchants can authenticate transactions within their own apps. Now, the challenge flow happens directly within the mobile checkout flows, eliminating the need for full-page redirects and providing a more seamless user experience.

### Amount of data available for authentication

3DS2 allows businesses to exchange ten times more data on each transaction to the cardholder's bank. This includes payment-specific data, such as shipping address, and contextual data, such as the customer's device ID or previous transaction history. This allows the bank to assess the transaction's risk level and potentially authenticate the payment without additional input from the cardholder. Therefore, a payment using 3DS2 protocols can face a **frictionless flow** or a **challenge flow** to complete the payment.

#### Frictionless flow

In a frictionless flow, the customer's data is confirmed without any manual data entry. It happens when the system recognizes and verifies the customer’s device, and the data is exchanged in the background. As the customer is identified and validated with this information, no additional requests from the payment systems are necessary.

#### Challenge flow

The challenge flow happens when the stored information isn't enough to validate the customer. As the customer's identity is not confirmed, the system requires an additional step to validate the customer, using a one-time password or biometric verification. Depending on the validation system, the customer may be redirected to a card issuer’s page to enter the necessary information.

The use of 3DS2 results in a smoother and more frictionless user experience. The improved data flows and decision-making capabilities enabled by 3DS2 reduce the cart abandonment rate and improve the conversion rates.

## 3D Secure 2 Payment

Adding the 3DS2 verification step to the checkout process changes the normal workflow. Below is a flow chart of the complete checkout and a description of each step to help you better understand the process.

![](https://files.readme.io/f2afaa011ad29c0b939a307042f50d9a4e11a1e31b51786e122f2b8992b6d2e5-3ds2.png)

1. The customer provides their card data to initiate the merchant checkout process.
2. The merchant's system checks if it supports 3DS2.
3. If the merchant does not support 3DS2, the checkout process proceeds with the regular payment workflow without using the 3DS2 verification.
4. If the merchant supports 3DS2, Yuno sends the transaction information to the issuer's 3DS service provider to assess the transaction risk. This data includes cardholder and device information upon regional or market law restrictions, such as device ID, MAC address, geo-location, previous transactions, and more.
5. The issuer's 3DS service provider determines if the transaction is high-risk and if a challenge is necessary for additional verification.
6. The payment proceeds to the authorization step if no challenge is necessary (frictionless flow).
7. If a challenge is required (challenge flow), it is presented to the cardholder to verify their identity. This verification can use biometrics and/or two-factor authentication, such as a one-time password or a fingerprint.
8. The system checks if the cardholder successfully completed the challenge.
9. The payment proceeds to the authorization step if the cardholder successfully verifies their identity.
10. If the cardholder fails to verify their identity, the payment is cancelled.
11. The merchant checks with the card issuer if the transaction is authorized.
12. If the transaction is authorized, the payment is processed successfully.
13. If the transaction is not authorized, the payment is cancelled or declined.

## Configuring 3D Secure for your payments

You decide if your system will implement the 3DS2 or not. The 3DS2 verification step is added while defining your cards [dynamic routing](doc:routing#configuring-the-dynamic-routing). When starting your card routes, you can add the 3DS2 step before defining the payment provider. When adding the 3DS2 verification step, when a payment using a card is initialized, the Yuno system will analyze if the card needs an extra challenge. If an extra challenge is necessary, the user will be redirected to the bank environment to complete the authorization. On the other hand, the payment process will proceed normally.

To create payments with the 3DS DIRECT workflow, you need to fulfill some requirements.

### Requirements

Before using 3DS DIRECT, you need to enable 3DS in your [Yuno Dashboard](https://dashboard.y.uno/) and specify the scenarios in which you want your customers to be able to use it. These scenarios must be indicated on your CARD route. Additionally, you will require the following 3DS setup data in the payment provider connection:

* **Acquirer BIN**: This is the Bank Identification Number (BIN) used to clear and settle the transaction, along with the country in which it is licensed for use.
* **Merchant ID**: This is the affiliation number provided by the acquirer.
* **Merchant Category Code (MCC)**: The acquirer will provide a specific code representing your merchant category.
* **Merchant's Name**: Refers to the official name or business name of the company or entity conducting the commercial transaction.
* **Merchant URL**: The merchant's website or online platform.
* **Country Code**: The country where the payment needs to be processed, following the [ISO 3166-1](ref:country-reference) Standard Country Codes.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer ">
    <div class="verticalLine"></div>
    <div>
      <h3>Using an external MPI for authentication</h3>
      <div class="contentContainer">
        <div>
           If you are using an external MPI to perform the authentication, the following parameters are required for a successful connection with the provider:
          <ul>
            <li>Acquirer BIN</li>
            <li>Acquirer country code</li>
            <li>Merchant ID</li>
            <li>MCC</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

##

## Yuno 3D Secure 2 integration

There are different ways of integrating 3DS in Yuno, depending on your needs.

In general terms, a 3DS integration requires a `setup_id`/`device_fingerprint` for the payment session as the first step for security analysis, and that id can only be obtained by executing a SDK/JS powered by a 3DS authorized provider. While using our SDKs **we take care of all the logic for you**, so you don't have to worry about different provider needs.

Therefore, depending on your Yuno integration, you have three different options:

1. **Checkout integration**: The Checkout workflow is part of the [Checkout](doc:build-your-integration#checkout) solution provided by Yuno. Use our SDKs so we can handle all the logic regarding external provider requirements and executions for 3DS. If you want to define specific cases for 3DS analysis, you can define that in the CARD route of your Yuno dashboard.
2. **External integration**: Use your own 3DS and then send the corresponding authorization fields in the [payment creation](ref:create-payment) (card\_data - eci, cryptogram, etc). Only available for PCI-compliant merchants.
3. **Direct integration**: The Direct workflow is only available for PCI-compliant merchants. It provides a straightforward way to create a payment and validate user information, requiring the merchant to perform just one request to create the payment. To successfully implement the Direct integration, follow the steps outlined in the [integration guideline](doc:direct-flow) and provide the required information as instructed. For each payment you'll have a:
   1. `PENDING/WAITING_ADDITIONAL_STEP` status/sub status.
   2. `sdk_action_required` set as `true`.
   3. `redirect_url` defined in `payment.payment_method.payment_method_detail.card`.

You are responsible for redirecting your customers to the URL provided by the `redirect_url` so we can gather device information and present the challenge to the customer if necessary. Once the customer successfully completes the 3DS challenge, they will be automatically redirected to the `callback_url`, which you provided when creating the payment with the Create Payment endpoint.

For every scenario the Yuno [webhooks](doc:configuring-yuno-webhooks) will promptly notify you about the outcome of the 3DS challenge and the final payment status. This ensures that you receive real-time updates on the progress and completion of the payment transaction. Also, you can always get the payment information by using our [get payment service](ref:retrieve-payment-by-id).

After executing the 3DS for each scenario, you'll receive all the necessary information in the payment's response inside the `payment_method.detail.card.card_data.three_d_secure` object:

| Field                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Example                                                                                      |
| :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| version                            | Refers to the protocol version of the EMV 3-D Secure specification used. 1.0, 2.0, 2.1.0, 2.2.0, 2.2.1.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 2.2.1                                                                                        |
| electronic\_commerce\_indicator    | This field must be completed with the result of the ECI field provided by the 3d Secure service. The Electronic Commerce Indicator (ECI) informs the card issuer if the transaction was protected by a security protocol like VbV or MCSC. It is mandated by Visa and MasterCard that all 3-D Secure transactions have this value populated in the authorization request (MAX: 2, MIN: 0).                                                                                                                                                                                                                                                                                                                              | 04                                                                                           |
| cryptogram                         | This field must be completed with the result of the cryptogram field provided by the 3DSecure service. In Visa transactions, it represents the Cardholder Authentication Verification Value (CAVV), a cryptographic value generated by the Issuer as evidence of payment authentication during online purchase to qualify for chargeback protection. MasterCard transactions have a similar value called Accountholder Authentication Value (AAV) or the Universal Cardholder Authentication Field (UCAF). When submitting a transaction for authorization, the merchant must include the CAVV or AAV/UCAF to demonstrate that the cardholder has been authenticated. It is typically base64-encoded (MAX: 40, MIN: 0). | BA0BB1Z3N5Q4kjkBU3c3ELGUsJY =                                                                |
| transaction\_id                    | For 3DS v1: This is the Unique Transaction Identifier. It is automatically generated by the MPI. It is typically 28 bytes in length and base64-encoded. Is commonly referred to as XID (MAX: 40, MIN: 0). For 3DS v2: Universally unique transaction identifier assigned by the DS to identify a single transaction. (MAX: 36, MIN:36).                                                                                                                                                                                                                                                                                                                                                                                 | Ex for V1: “TjY0MjAxRjA4MD4987DUzMzYyNjU=” Ex for V2: “c4e59ceb-a382-4d6a-bc87-385d591fa09d” |
| directory\_server\_transaction\_id | Transaction ID generated by the Mastercard directory server during authentication (MAX 255; MIN 3).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | f38e6948-5388-41a6-bca4-b49723c19437                                                         |
| pares\_status                      | Indicates the outcome of the cardholder authentication during the 3-D Secure process. It informs you whether the authentication was successful (Y), failed (N), could not be completed (U), or was only attempted (A).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Y                                                                                            |
| acs\_id                            | Unique identifier provided by the Access Control Server (ACS) during the 3-D Secure authentication process.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ACS-1234567890                                                                               |

```json Example
[...]
     "payment_method": {
        "vaulted_token": "",
        "type": "CARD",
        "vault_on_success": false,
        "token": "",
        "detail": {
            "card": {
                "verify": false,
                "capture": false,
                "installments": 1,
                "installments_plan_id": null,
                "first_installment_deferral": 0,
                "installments_type": "",
                "installment_amount": null,
                "soft_descriptor": "",
                "authorization_code": "",
                "retrieval_reference_number": "",
                "voucher": null,
                "card_data": {
                    "holder_name": "John Doe",
                    "iin": "40000000",
                    "lfd": "1026",
                    "number_length": 16,
                    "security_code_length": 3,
                    "brand": "VISA",
                    "issuer_name": "",
                    "issuer_code": null,
                    "category": "STANDARD",
                    "type": "CREDIT",
                    "three_d_secure": {
                        "version": "2.1.0",
                        "electronic_commerce_indicator": null,
                        "cryptogram": null,
                        "transaction_id": null,
                        "directory_server_transaction_id": null,
                        "pares_status": null,
                        "acs_id": "z1A6ZTh7NopIhdb2R420"
                    }
                }
[...]
```

### Transactions status

A 3DS transaction functions similarly to a regular purchase transaction. It progresses through different states that represent the authorization process. Once the 3DS transaction is marked as SUCCEEDED, Yuno proceeds to the processor and generates a PURCHASE transaction to charge the client. The following table describes all possible states and their descriptions.

| Status      | Description                                                            |
| :---------- | :--------------------------------------------------------------------- |
| CREATED     | Payment is created and waiting for Yuno's SDK session id.              |
| PENDING     | The challenge is required, and the `redirect_url` is returned by Yuno. |
| IN\_PROCESS | The user is completing the challenge.                                  |
| SUCCEEDED   | The challenge was completed correctly.                                 |
| DECLINED    | The challenge was completed but declined by the bank.                  |
| ERROR       | An error occurred while redirecting to the user's challenge.           |

As mentioned before, if the payment is PENDING/WAITING\_ADDITIONAL\_STEP, the 3DS transaction will be PENDING when a Challenge is required. After the challenge is completed, either successfully or not, the payment and transaction will be updated to the corresponding states (SUCCEEDED or DECLINED).

### Using 3DS for Specific Scenarios

When configuring the CARD route in the Yuno dashboard, you can specify for which situations 3DS should be executed using the [available conditions](doc:routing#configuring-the-dynamic-routing). As mentioned previously, some preliminary steps will be necessary to execute 3DS depending on the integration method used.