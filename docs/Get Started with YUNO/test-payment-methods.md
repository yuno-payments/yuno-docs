---
title: Test Payment Methods
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Yuno´s integration allows you to connect to dozens of payment methods within a single integration, and some of them need certain information required by the payment providers in order to use their sandbox environment. In the following sections, we provide test guidelines on the alternative payment platforms available in Yuno for you to test during your integration.

<br>

## Payment methods

| Payment\_method\_type                                                                         |
| :-------------------------------------------------------------------------------------------- |
| [CARDS](https://docs.y.uno/docs/test-payment-methods#cards)                                   |
| [ADDI](https://docs.y.uno/docs/test-payment-methods#addi)                                     |
| [ACUOTAZ](https://docs.y.uno/docs/test-payment-methods#acuotaz)                               |
| [BANCOLOMBIA\_TOKEN\_BOX](https://docs.y.uno/docs/test-payment-methods#bancolombia_token_box) |
| [BANCOLOMBIA\_TRANSFER](https://docs.y.uno/docs/test-payment-methods#bancolombia_transfer)    |
| [DAVIPLATA](https://docs.y.uno/docs/test-payment-methods#daviplata)                           |
| [MERCADO\_PAGO\_CHECKOUT\_PRO](https://docs.y.uno/docs/test-payment-methods#mercado-pago)     |
| [MERCADO\_PAGO\_WALLET](https://docs.y.uno/docs/test-payment-methods#mercado-pago)            |
| [NEQUI](https://docs.y.uno/docs/test-payment-methods#nequi)                                   |
| [NU\_PAY](https://docs.y.uno/docs/test-payment-methods#nupay)                                 |
| [PAYMENTEZ](https://docs.y.uno/docs/test-payment-methods#paymentez)                           |
| [PIX](https://docs.y.uno/docs/test-payment-methods#pixnupay)                                  |
| [SAFETYPAY](https://docs.y.uno/docs/test-payment-methods#safetypay)                           |
| [WEBPAY](https://docs.y.uno/docs/test-payment-methods#webpay)                                 |
| [WIBOND](https://docs.y.uno/docs/test-payment-methods#wibond)                                 |

<br>

***

### CARDS

In order to test Card payments in general, you will need to activate the **Yuno Test Payment Gateway** connection in your Yuno Dashboard.  

<Image width="500px" src="https://files.readme.io/d95c859-Screen_Shot_2022-12-05_at_8.13.44_AM.png" />

Once your connection turns on, you will need to set the **Yuno test Payment Gateway** as your card provider in your route defined for Card payments in your routing section. 

![](https://files.readme.io/4b09f6f-Screen_Shot_2022-12-05_at_8.19.26_AM.png)

After that, you are ready to start testing your Card payment method using your Yuno integration. To get the desired result in each test, you need to define the payment description as one of the [Transaction Codes](https://docs.y.uno/reference/transaction#transaction-codes) available in Yuno. For example: "SUCCESSFUL", "DECLINED", "ERROR". 

Cards you can use:

| Number              | Security Code | Expiration Date |
| :------------------ | :------------ | :-------------- |
| 4509 9535 6623 3704 | 456           | 10/26           |
| 3711 803032 57522   | 4567          | 10/26           |
| 5031 7557 3453 0604 | 456           | 10/26           |

```Text Payment Request Example
{
    "description": "SUCCESSFUL",
    "account_id":"{{account-code}}",
    "merchant_order_id": "0000022",
    "merchant_reference":"Pago de test 001",
    "country": "AR",
    "amount": {
        "currency": "ARS",
        "value": 100
    },
    "checkout": {
        "session": "{{checkout_session}}"
    },
    "customer_payer": {
        "id": "{{customer_id}}",
        "document": {
            "document_type": "DNI",
            "document_number": "38799999"
        },
        "date_of_birth": "1990-02-28",
        "nationality": "{{country}}",
        "phone": {
            "number": "3132450765",
            "country_code": "54"
        }
        },
    "payment_method": {
        "token": {{onetime_token}}
    }
}
```

***

### ADDI

In order to make a payment using Addi, you should complete the following steps:

1. [Create Customer](https://docs.y.uno/reference/create-customer)
2. [Create Checkout Session](https://docs.y.uno/reference/create-checkout-session)
3. Create One Time Token / Get the token from SDK 
4. [Create Payment ](https://docs.y.uno/reference/create-payment)
5. After that, you need to use [Retrieve Payment by ID](https://docs.y.uno/reference/retrieve-payment-by-id) to get the URL (payment.transaction.provider.redirect.init\_url) to complete the payment in the Addi platform. 

<Image width="500px" src="https://files.readme.io/3b83fd4-image.png" />

You have to access the Addi checkout with the following info:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Info
      </th>

      <th>
        Data
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        APELLIDO
      </td>

      <td>
        CANO
      </td>
    </tr>

    <tr>
      <td>
        FECHA DE EXPEDICIÓN DOC&#x9;
      </td>

      <td>
        01-01-1996
      </td>
    </tr>

    <tr>
      <td>
        AMOUNT - CO
      </td>

      <td>
        Min: 50.000\
        Max: 500.000
      </td>
    </tr>

    <tr>
      <td>
        AMOUNT - BR
      </td>

      <td>
        Min: 45\
        Max: 3.000
      </td>
    </tr>

    <tr>
      <td>
        ORDER\_ID
      </td>

      <td>
        Must be changed on every transaction
      </td>
    </tr>

    <tr>
      <td>
        EMAIL
      </td>

      <td>
        Must be valid and changed in all tests
      </td>
    </tr>

    <tr>
      <td>
        PHONE\_NUMBER
      </td>

      <td>
        Must be valid and changed in all tests
      </td>
    </tr>
  </tbody>
</Table>

<br>

***

### ACUOTAZ

In order to make a payment using Acuotaz, you should complete the following steps:

1. [Create Customer](https://docs.y.uno/reference/create-customer)
2. [Create Checkout Session](https://docs.y.uno/reference/create-checkout-session)
3. Create One Time Token / Get the token from SDK 
4. [Create Payment ](https://docs.y.uno/reference/create-payment)

The Create Payment response provides a redirect URL (transactions.provider\_data.raw\_response.redirect\_to), so the user can complete the payment in the Acuotaz platform. The Acuotaz service provides the option to  the user select the payment installments before completing the payment, as shown in the following image:

<Image width="500px" src="https://files.readme.io/8586a74-acuotaz.png" />

For testing a Payment in Acuotaz, there are two approaches you can use: testing credit card payment or testing bank transfer payment.

**Testing credit card payment**

If you need to make a payment with the test credentials for the card, you can use the following info:

| Info            | Data                |
| :-------------- | :------------------ |
| Name            | Any name            |
| Card no         | 4111 1111 1111 1111 |
| Expiration date | 04/2023             |
| CVV             | 123                 |
| Address         | Any address         |

**Testing bank transfer payment**

If you need to make a payment by bank transfer, you can use the following info:

| Info             | Data                     |
| :--------------- | :----------------------- |
| Image            | Any image                |
| Bank             | Any bank                 |
| Operation number | 1234567                  |
| Payment Amount   | Amount                   |
| Payment Date     | Today                    |
| Payment Type     | Full installment payment |

<br>

***

### BANCOLOMBIA\_TRANSFER

Bancolombia transfer does not have a sandbox environment to interact with the end user. The payment is directly approved after sending the request to the provider in the first instance.

In order to make a payment using Bancolombia Transfer, you should complete the following steps:

1. [Create Customer](https://docs.y.uno/reference/create-customer)
2. [Create Checkout Session](https://docs.y.uno/reference/create-checkout-session)
3. Create One Time Token / Get the token from SDK. The total amount should be bigger than COP 1500.
4. [Create Payment ](https://docs.y.uno/reference/create-payment)

<br>

***

### BANCOLOMBIA\_TOKEN\_BOX

Bancolombia Tokenbox works as an enrolled payment method. Therefore, you will need to start enrolling it before making a payment. Similar to the Bancolombia transfer, the payment gets automatically approved. However, with Bancolombia, you can test different scenarios for enrollment. 

In order to make a payment using Bancolombia Tokenbox, you should complete the following steps:

1. [Create Customer](https://docs.y.uno/reference/create-customer)
2. [Create Customer Session](https://docs.y.uno/reference/create-customer-session)
3. [Retrieve Payment Methods Available](https://docs.y.uno/reference/retrieve-payment-methods-available-checkout)
4. [Enroll Payment Method](https://docs.y.uno/reference/enroll-payment-method-checkout)
5. [Retrieve Payment Method by Customer Session](https://docs.y.uno/reference/retrieve-payment-method-by-customer-session-checkout)
   1. To complete the enrollment in the Banbox environment, use the redirect URL (provider.redirect.init\_url) to follow the next steps and complete the enrollment:
      1. **User**: This can be any email with the correct format. For example: [test@y.uno](mailto:test@y.uno)
      2. **4-digit password**: This can be any 4-digit password. For example: 1234. At that stage, you can choose the result of your enrollment. 
      3. **Dynamic key**: Can be any 6-digit number. For example: 123456.
      4. **Select account**: This could be any of the accounts already available for testing.

<Image width="500px" src="https://files.readme.io/07c5308-Screen_Shot_2022-10-31_at_8.11.59_AM.png" />

6. [Create Checkout Session](https://docs.y.uno/reference/create-checkout-session)
7. [Retrieve Payment Methods Available for Checkout](https://docs.y.uno/reference/retrieve-payment-methods-for-checkout)
8. [Create Payment ](https://docs.y.uno/reference/create-payment)

<br>

***

### DAVIPLATA

In order to make a payment using DaviPlata, you should complete the following steps:

1. [Create Customer](https://docs.y.uno/reference/create-customer)
2. [Create Checkout Session](https://docs.y.uno/reference/create-checkout-session)
3. Create One Time Token / Get the token from SDK. Use "DAVIPLATA" as the payment type to generate the One Time Token. 
4. [Create Payment ](https://docs.y.uno/reference/create-payment)

The response body of the Create Payment request will provide a redirect URL (payment\_method.payment\_method\_detail.bank\_transfer.redirect\_url) to the DaviPlata service. On this page, select a document type and fill in the document number with "1" to continue with the payment. 

***

### MERCADO PAGO

In order to make a payment using Mercado Pago, you should complete the following steps:

1. [Create Customer](https://docs.y.uno/reference/create-customer)
2. [Create Checkout Session](https://docs.y.uno/reference/create-checkout-session)
3. Create One Time Token / Get the token from SDK 
4. [Create Payment ](https://docs.y.uno/reference/create-payment)

The response body of the Create Payment request will provide a redirect URL (payment\_method.payment\_method\_detail.bank\_transfer.redirect\_url) to the Mercado Pago service. In this service, use your Mercado Pago account to complete the transaction. The following image shows the page the user will be redirected to:

<Image width="500px" src="https://files.readme.io/b80e9b0-mercado-pago-page.png" />

For additional information, refer to the [Mercado Pago documentation](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/test-integration). However, as a summary, you basically need to follow the next steps: 

1. [Create test users](https://www.mercadolibre.com/jms/mla/lgz/msl/login/H4sIAAAAAAAEAzVOSw6DIBC9C2sre5e9CJnqU0kHITBKG-PdOzTt8v3faTgufnPyTjCDwSuxH72YziQmmWMOzk8qhKRU8YIfZGoWyhQgyMUMZytaMN2hoVY1ExeoiXZZ3cyxKvfdUs4Xh5fmNmJX8Tg8mvpPLFHBKpLKYG2ttQ_II00x0RL7MYaesp1wgGPSaZtoA1tBkdte2per06oiTjKNTzNI3nF9AF7j-APoAAAA/user) to use as a “seller” and as a “customer” while developing the integration. Mercado Pago uses these test users to replicate the production environment, and they can only interact with other test users. If you use a real account to pay a checkout created by a test user, you will receive an error message (invalid\_users\_involved).

> 📘 Tips
>
> * Always check if you are logged in with a real account before completing a payment. You SHOULD NOT use a real account to perform tests.
> * Add account money to the test user account while creating it.

2. [Get your API credentials](https://www.mercadolibre.com/jms/mla/lgz/msl/login/H4sIAAAAAAAEAzWNSw7DIAxE78I6CnuWvQhywSGoJiBwQqood6-p2uV83sylKIe4WX4XVEbhWSi6yGpShYCXXJONXoJUxGqR8ScJRgUqJGSsTZlrDAX0DxRoTC1ADaUEO692odzF-36JF5vFU7gNyHZ8HhFH-idCFrEyl2a07r3PCasDnwuEPLucZqja44GUi1zrAhuSuifhG1uu4F7KcN3x_gAEIH1v3QAAAA/user) and set them on Yuno´s dashboard while creating the payment method. If you do not have an application started yet, create one following to get your API keys.
3. Both for enrollments with MercadoPago Wallet or payments with the Mercado Pago Checkout Pro, use the account money available for the test user or test cards provided by Mercado Pago to make a payment.

After creating your Mercado Pago user and performing the payment, you can use the [Retrieve Payment by ID](https://docs.y.uno/reference/retrieve-payment-by-id) to check the payment status. If everything goes correctly, the Retrieve Payment by ID response will have a **SUCCEEDED** payment.status and a **APPROVED** payment.sub\_status.

<br>

***

### MERCADO PAGO WALLET

Mercado Pago Wallet works as an enrolled payment method. Therefore, you will need to start enrolling it before making a payment.

To make a payment using the Mercado Pago Wallet, you should follow the steps:

1. [Create Customer](https://docs.y.uno/reference/create-customer)
2. [Create Customer Session](https://docs.y.uno/reference/create-customer-session)
3. [Retrieve Payment Methods Available](https://docs.y.uno/reference/retrieve-payment-methods-available-checkout) (Optional)
4. [Enroll Payment Method](https://docs.y.uno/reference/enroll-payment-method-checkout)
5. [Retrieve Payment Method by Customer Session](https://docs.y.uno/reference/retrieve-payment-method-by-customer-session-checkout) 
   * The response provides a redirect URL (provider.redirect.init\_url), so the user can enroll in the payment method using the Mercado Pago service. 
   * After the login, the user will be requested to connect a new payment method or use cash.
   * The user should add credit card info to add a secondary payment method. 
   * By selecting the cash option, the connection is performed directly. 
   * For additional information, refer to the [Mercado Pago documentation](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/test-integration). However, as a summary, you basically need to follow the next steps:
     * [Create test users](https://www.mercadolibre.com/jms/mla/lgz/msl/login/H4sIAAAAAAAEAzVOSw6DIBC9C2sre5e9CJnqU0kHITBKG-PdOzTt8v3faTgufnPyTjCDwSuxH72YziQmmWMOzk8qhKRU8YIfZGoWyhQgyMUMZytaMN2hoVY1ExeoiXZZ3cyxKvfdUs4Xh5fmNmJX8Tg8mvpPLFHBKpLKYG2ttQ_II00x0RL7MYaesp1wgGPSaZtoA1tBkdte2per06oiTjKNTzNI3nF9AF7j-APoAAAA/user) to use as a “seller” and as a “customer” while developing the integration. Mercado Pago uses these test users to replicate the production environment, and they can only interact with other test users. If you use a real account to pay a checkout created by a test user, you will receive an error message (invalid\_users\_involved).
     * [Get your API credentials](https://www.mercadolibre.com/jms/mla/lgz/msl/login/H4sIAAAAAAAEAzWNSw7DIAxE78I6CnuWvQhywSGoJiBwQqood6-p2uV83sylKIe4WX4XVEbhWSi6yGpShYCXXJONXoJUxGqR8ScJRgUqJGSsTZlrDAX0DxRoTC1ADaUEO692odzF-36JF5vFU7gNyHZ8HhFH-idCFrEyl2a07r3PCasDnwuEPLucZqja44GUi1zrAhuSuifhG1uu4F7KcN3x_gAEIH1v3QAAAA/user) and set them on Yuno´s dashboard while creating the payment method. If you do not have an application started yet, create one following to get your API keys.
     * Both for enrollments with MercadoPago Wallet or payments with the Mercado Pago Checkout Pro, use the account money available for the test user or test cards provided by Mercado Pago to make a payment.

> 📘 Tips
>
> * Always check if you are logged in with a real account before completing a payment. You SHOULD NOT use a real account to perform tests.
> * Add account money to the test user account while creating it.

6. [Create Checkout Session](https://docs.y.uno/reference/create-checkout-session)
7. [Retrieve Payment Methods Available for Checkout](https://docs.y.uno/reference/retrieve-payment-methods-available-checkout) to get the `vaulted_token` related to the payment enrolled before.
8. [Create Payment](https://docs.y.uno/reference/create-payment) using the `vaulted_token` from the last step.

<br>

***

### PAYMENTEZ

Paymentez provides multiple payment methods. Here we will explain the testing process for payments using OXXO or cash. There are some differences when testing each payment type. Below, you will find the guide to test Paymentez using OXXO and cash.

In order to make a payment with Paymentez using OXXO or cash, you should complete the following steps:

1. [Create Customer](https://docs.y.uno/reference/create-customer)
2. [Create Checkout Session](https://docs.y.uno/reference/create-checkout-session)
3. Create One Time Token / Get the token from SDK. You will need to provide the payment type used on the request body. If you are performing a test using OXXO as the payment method, use "OXXO" as the type. On the other hand, if you are testing for payment with cash, use "CASH" as the type.
4. [Create Payment ](https://docs.y.uno/reference/create-payment)

The response body of the Create Payment request will provide a redirect URL (payment\_method.payment\_method\_detail.bank\_transfer.redirect\_url) to the Paymentez service page. On the Paymentez page, the customer will enter their data and find the reference number to make the payment. The image below presents the Paymentez interface for both OXXO and cash payments.

<Image align="center" width="500px" src="https://files.readme.io/ad0ece8-paymentez-OXXO.png" />

5. [Retrieve Payment Methods for Checkout](https://docs.y.uno/reference/retrieve-payment-methods-for-checkout) or [Retireve Payment by ID](https://docs.y.uno/reference/retrieve-payment-by-id)  to check the payment status.

#### Paymentez with Cash

In order to make a payment with Paymentez using Cash, you should complete the following steps:

1. [Create Customer](https://docs.y.uno/reference/create-customer)
2. [Create Checkout Session](https://docs.y.uno/reference/create-checkout-session)
3. Create One Time Token / Get the token from SDK 
4. [Create Payment ](https://docs.y.uno/reference/create-payment)

The response body of the Create Payment request will provide a redirect URL (payment\_method.payment\_method\_detail.bank\_transfer.redirect\_url) to the Paymentez service page. On the Paymentez page, you will find the reference number to make the payment.

<Image align="center" width="500px" src="https://files.readme.io/3e75b3e-paymentez-Cash.png" />

***

### NEQUI

Nequi works as an enrolled payment method, meaning you'll need to enroll it before making a payment. The payment gets automatically approved, but you can test different scenarios for enrollment. 

In order to make a payment using Nequi, you should complete the following steps:

1. [Create Customer](https://docs.y.uno/reference/create-customer)
   1. To perform approved or rejected ENROLLMENTS in Nequi's Sandbox environment, you only have to assign the following phone numbers to the customer:
   * *3991111111* to automatically enroll and generate an approved transaction (**APPROVED**)
   * *3992222222* to generate a declined transaction (**DECLINED**)

> 📘 Note
>
> Keep in mind that any other number you use will result in a transaction with a final status of **ERROR**.

2. [Create Customer Session](https://docs.y.uno/reference/create-customer-session)
3. [Retrieve Payment Methods Available](https://docs.y.uno/reference/retrieve-payment-methods-available-checkout) (Optional)
4. [Enroll Payment Method](https://docs.y.uno/reference/enroll-payment-method-checkout). The Enroll Payment Method response will provide the status READY\_TO\_ENROLL.
5. [Retrieve Payment Method by Customer Session](https://docs.y.uno/reference/retrieve-payment-method-by-customer-session-checkout). As explained in step 1, the response will automatically provide the status  ENROLLED if the *3991111111* phone number was used.
6. [Create Checkout Session](https://docs.y.uno/reference/create-checkout-session)
7. [Retrieve Payment Methods for Checkout](https://docs.y.uno/reference/retrieve-payment-methods-for-checkout). The response will provide a list of payment methods available. You should find the Nequi object, which will contain the `vaulted_token` to be used to create the payment.
8. [Create Payment](https://docs.y.uno/reference/create-payment) using the `vaulted_token`

<br>

***

### PIX/NUPay

To make a payment using PIX, you should follow the steps:

1. [Create Customer](https://docs.y.uno/reference/create-customer)
2. [Create Checkout Session](https://docs.y.uno/reference/create-checkout-session)
3. Create One Time Token / Get the token from SDK 
4. [Create Payment ](https://docs.y.uno/reference/create-payment)

Instead of a redirect URL, the Create Payment response provides a QR code image (payment\_method.payment\_method\_detail.bank\_transfer.provider\_image). After creating the order, you must complete and test the payment and access the NuPay sandbox [dashboard](https://sandbox-painel.nupaybusiness.com.br/) with your Nubank credentials. Once logged in, you can approve the transaction in the 'Activities' section.

<Image width="500px" src="https://files.readme.io/98bccd6-image.png" />

After approving the payment, its status will change to "completo" on the NuPay sandbox dashboard. You can check the payment status using the [Retrieve Payment by ID](https://docs.y.uno/reference/retrieve-payment-by-id). If the payment were approved, the Retrieve Payment by ID response would provide the status **SUCCEEDED**, and sub\_status **APPROVED**.

<br>

***

### NUPAY

To make a payment using NUPay you should follow the steps:

1. [Create Customer](https://docs.y.uno/reference/create-customer)
2. [Create Checkout Session](https://docs.y.uno/reference/create-checkout-session)
3. Create One Time Token / Get the token from SDK 
4. [Create Payment ](https://docs.y.uno/reference/create-payment)

The Create Payment response provides a redirect URL (payment\_method.payment\_method\_detail.bank\_transfer.redirect\_url), redirecting the user to a NuBank page that provides a QR code to complete the payment:

![](https://files.readme.io/662bf38-nu_pay.png)

After creating the order, you must complete and test the payment and access the NuPay sandbox [dashboard](https://sandbox-painel.nupaybusiness.com.br/) with your Nubank credentials. Once logged in, you can approve the transaction in the 'Activities' section:

![](https://files.readme.io/52a2332-nu_pay_dashboard.png)

After approving the payment, its status will change to "completo" on the NuPay sandbox dashboard. You can check the payment status using the [Retrieve Payment by ID](https://docs.y.uno/reference/retrieve-payment-by-id). If the payment were approved, the Retrieve Payment by ID response would provide the status **SUCCEEDED**, and sub\_status **APPROVED**.

<br>

***

### SAFETYPAY

SafetyPay is a non-card payment method. They enable cash payments, bank transfers, and international online transactions for a global consumer market. To perform a payment using the SafetyPay, you should follow the steps:

1. [Create Customer](https://docs.y.uno/reference/create-customer)
2. [Create Checkout Session](https://docs.y.uno/reference/create-checkout-session)
3. [Retrieve Payment Methods for Checkout](https://docs.y.uno/reference/retrieve-payment-methods-for-checkout) (Optional)
4. Create One Time Token / Get the token from SDK 
5. [Create Payment ](https://docs.y.uno/reference/create-payment)

After creating the payment (step 5), the API response will provide a redirect URL (transactions.payment\_method.detail.bank\_transfer.redirect\_url). The URL redirects to the SafetyPay Gateway, where you will find information about the payment, such as the payment code and the total amount, as shown next:

![](https://files.readme.io/21ccd83-safetypay-call-back.png)

In the above example, the **Payment Code** is 219131, and the **Total Amount** is 3922. To approve and complete the payment process, you must follow the instructions:

1. Open [SafetyPay DemoBank](http://sandbox-demobank.safetypay.com/Default/Login.aspx). 
2. Log in with the following credentials: 
   1. **User**: test
   2. **Password:** test

![](https://files.readme.io/ec8e5a6-image.png)

3. Enter the transaction information: Currency, Payment Code, and Amount. Do not change Account No. After, click on the **Accept** button.

![](https://files.readme.io/db52aac-image.png)

4. Click on **Conﬁrm** button.

![](https://files.readme.io/9db1640-image.png)

5. After confirming the payment, you’ll get a message indicating the operation was successfully paid. A table with the transaction summary will be displayed.

![](https://files.readme.io/b502978-image.png)

Subsequently confirming the payment, you can check the payment status using the [Retrieve Payment by ID](https://docs.y.uno/reference/retrieve-payment-by-id) route. The status provided by the response should be **SUCCEEDED**. 

<br>

***

### WEBPAY

In the Webpay environment, you can use the following card data to get an approved/rejected transaction in the sandbox. At the end of the Webpay checkout, you´ll have the option to choose the payment status. 

| Info        | Data                |
| :---------- | :------------------ |
| Card number | 4051 8856 0044 6623 |
| Exp Date    | > Today             |
| CVV         | 123                 |
| RUT         | 11.111.111-1        |

<br>

***

### WIBOND

The sandbox environment in Wibond works the same as the one in production. To make a test payment, you´ll first need to go through a verification process in order to get your account.  

![](https://files.readme.io/3075940-Screen_Shot_2022-10-31_at_7.58.55_AM.png)

Once you have your Wibond account, you´ll just need to enter Wibond's checkout, proceed with the payment with any random information, and select to pay with installments.
