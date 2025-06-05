---
title: Secure Fields
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Secure Fields
  description: >-
    Secure Fields creates a seamless and secure checkout flow on your website or
    app. With a set of prebuilt UI components available for Web, Android, and
    iOS, Secure Fields simplifies the process of collecting and tokenizing
    sensitive payment details.
  robots: index
next:
  description: ''
---
**Secure Fields** creates a secure and seamless checkout flow on your website or app. With a set of prebuilt UI components available for Web, Android, and iOS, Secure Fields simplifies the collection and tokenization of card payment details. This SDK is designed specifically for card payments and provides a PCI-compliant way to securely collect and process card information.

Explore below the Secure Fields SDK characteristics or follow our step-by-step integration guides to get started.

## Characteristics

The Secure Fields SDK has the following characteristics:

* **Prebuilt UI components**: Use the prebuilt UI to collect card information.
* **Automatic formatting and validation**: Fields format and validate card data.
* **Customizable UI**: Customize the Secure Fields design to maintain your brand's look and feel.
* **Tailored checkout experience**: Choose which fields to display to customers, highlighting incomplete fields and errors.

## Payment security

The Secure Fields SDK enhances your checkout experience by simplifying payment collection and improving security with the following features:

* **PCI compliance**: Secure Fields complies with PCI security standards.
* **Tokenization**: Payment details are tokenized, ensuring sensitive data never touches your server.
* **Data protection**: Secure payment information prevents data breaches and ensures customer security.

## Payment workflow

The following steps describe the integration process for the Secure Fields SDK to perform payments. However, if you need a more technical oriented instructions, refer to the corresponding platform guide:

<HTMLBlock>{`
<body>
  <section class="platform_shelf">
    <a class="platform_buttons" href="/docs/secure-fields-payment">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
          <path
            d="M7.5 1.3125C6.37512 1.3125 5.2755 1.64607 4.3402 2.27102C3.40489 2.89597 2.67591 3.78423 2.24544 4.82349C1.81496 5.86274 1.70233 7.00631 1.92179 8.10958C2.14124 9.21284 2.68292 10.2263 3.47833 11.0217C4.27374 11.8171 5.28716 12.3588 6.39043 12.5782C7.49369 12.7977 8.63726 12.685 9.67651 12.2546C10.7158 11.8241 11.604 11.0951 12.229 10.1598C12.8539 9.2245 13.1875 8.12488 13.1875 7C13.1859 5.49207 12.5862 4.04636 11.5199 2.98009C10.4536 1.91382 9.00793 1.31409 7.5 1.3125ZM11.7859 4.8125H9.84828C9.62501 3.93395 9.25006 3.10113 8.74031 2.35156C9.39156 2.52657 9.99897 2.83594 10.5235 3.25977C11.048 3.68361 11.478 4.21252 11.7859 4.8125ZM7.5 2.19352C8.15625 2.90445 8.64844 3.80953 8.94211 4.8125H6.05789C6.35156 3.80953 6.84375 2.90555 7.5 2.19352ZM5.75 7C5.75008 6.56023 5.78666 6.12122 5.85938 5.6875H9.14063C9.28573 6.55648 9.28573 7.44352 9.14063 8.3125H5.85938C5.78666 7.87878 5.75008 7.43977 5.75 7ZM6.05789 9.1875H8.94211C8.64844 10.1905 8.15625 11.0945 7.5 11.8065C6.84375 11.0945 6.35156 10.1905 6.05789 9.1875ZM8.74031 11.6484C9.25006 10.8989 9.62501 10.066 9.84828 9.1875H11.7859C11.478 9.78748 11.048 10.3164 10.5235 10.7402C9.99897 11.1641 9.39156 11.4734 8.74031 11.6484ZM10.0271 8.3125C10.1576 7.44237 10.1576 6.55763 10.0271 5.6875H12.1304C12.3732 6.54565 12.3732 7.45435 12.1304 8.3125H10.0271Z"
            fill="#513CE1" />
        </svg>

      </div>
      <h3>
        Web
      </h3>
    </a>
  </section>
</body>
`}</HTMLBlock>

> 📘 Choose your integration
>
> The Secure Fields SDK is designed to accept payments using cards. If you need to perform a payment using another payment method or a previously saved card, you need to choose another Yuno integration:
>
> - [Full SDK](/docs/secure-fields-payment)
> - [Lite SDK](/docs/secure-fields-payment) 
> - [Direct Flow](/docs/secure-fields-payment)


### Step 1: Create a customer (Optional)

To begin, create a customer. After creating the customer, you can associate payment methods with their account. If you already have a customer `id` from a previous customer creation, you can skip this step.

Use the [Create Customer](ref:create-customer) endpoint to create new customers and get a customer `id`. This `id` will be used in the following steps.

The `customer_session` parameter is optional.

You can skip this step if you already have a customer `id` and plan to provide it directly when creating the payment. Alternatively, you may choose to omit this step entirely.

> 📘 Customer Session
>
> When you choose to not use a `customer_session`, the payment will be created without a customer `id`, leaving it empty when creating the payment. As a result, the process will not use any stored customer date, such as pre-filled form fields or saved payment details.
>
> While skipping the customer session can simplify integration, it removes features designed to streamline the user experience, which can improve conversion rates by reducing friction during checkout.


### Step 2: Create a checkout session

Next, create a checkout session. A new checkout session must be created for each new payment. This session provides access to all available payment methods (whether previously enrolled or not) for a specific customer.

Use the [Create Checkout Session](ref:create-checkout-session) endpoint and provide the customer `id` to get a new `checkout_session`.

### Step 3: Display payment methods

Query the available payment methods using the [Retrieve Payment Methods](ref:retrieve-payment-methods-for-checkout) endpoint using the `checkout_session`. Show these methods to the customer so they can select their preferred payment method to execute the payment.

> 📘 Important: Payment Method Support
>
> Secure Fields only accepts card payments. Therefore, if your customer chooses a payment method other than a card, you need to use another Yuno integration.


> 📘 Display Payment Methods
>
> You're responsible for displaying the payment methods and capturing the customer's selection when using the Secure Fields SDK.


### Step 4: Implement the SDK and get a one-time token

After the customer selects the payment method, initialize the Secure Fields SDK to generate a one-time token before proceeding with the payment.

Follow these steps to initialize Yuno's Secure Fields SDK:

1. Include the library in your project.
2. Initialize the SDK with your public API key.
3. Start the checkout process by calling `yuno.secureFields()` with your configuration.
4. Mount the Secure Fields SDK using the `secureFields.create()` function to display the checkout to your customers.
5. Generate a one-time token by using `secureFields.generateToken()` or `secureFields.generateTokenWithInformation()`.

### Step 5: Create the payment

With the one-time token, create the payment. This process gathers all order details, including customer specifics, total amount, currency, products, and shipping details. Use the [Create Payment](ref:create-payment) endpoint, providing the `one_time_token`.

> 📘 Payment Status Best Practices
>
> Use the payment `status` and `sub_status` as your primary reference for the payment's state during integration. Since a payment might have multiple associated transactions, concentrating on the payment `status/sub_status` ensures you're informed of the most recent state. This provides a clear basis for decision-making regardless of the number of transactions involved.
>
> To display the current payment status for your clients, you can use the [mountStatusPayment](/docs/payment-status#step-3-use-status) function.


### Step 6: Receive payment result through webhook

Yuno also recommends configuring [Webhooks](doc:webhooks) in your [dashboard](https://auth.y.uno/u/login?). Webhooks are the best way to ensure your system stays updated with payment progress and status. Since the event notifications are triggered automatically, your system won't need to perform repeated requests to Yuno.

## Enroll a credit card while paying

With Secure Fields SDK, you can save credit/debit cards for future purchases within the same payment request without the enrollment [integration](enrollment-lite). You can obtain the [vaulted token](doc:tokens) in two ways:

* Set `vault_on_success = true` when using the [Create Payment](ref:create-payment) endpoint. You will receive the `vaulted_token` that corresponds to the card used by the customer in the response.
* Set `saveCard = true` when creating the one-time token in [Step 4](#step-4-implement-the-sdk-and-get-a-one-time-token). The SDK will display a checkbox for users to select if they want to save the card for future purchases. If the user checks the box, you will receive the `vaulted_token`.

> 📘 Card Enrollment Options
>
> You should only use one option to enroll a card. To enroll alternative payment methods, see the [Lite SDK (Enrollment)](enrollment-lite) page.


After enrolling a payment method, you can use the vaulted token to perform payments. To access information about the payment methods enrolled by each user, you can use one of the following endpoints:

* [Get Payment Methods by Checkout Session](ref:retrieve-payment-methods-for-checkout).
* [Get Payment Methods by Customer](ref:retrieve-enrolled-payment-methods-api).
