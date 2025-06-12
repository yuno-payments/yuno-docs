---
title: Seamless SDK
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
Yuno's **Seamless SDK** provides a simple and efficient integration while giving you full control over the payment experience. Like the [Lite SDK](doc:the-ultimate-checkout-lite), it allows you to retrieve available payment methods and decide which to display during checkout. Once the selection is made, a single API and SDK call completes the payment process, creating an experience identical to the Lite SDK.

When using the Seamless SDK, you can:

* Execute the payment process.
* Enroll a credit card while making a payment.
* Use a vaulted token from an enrolled payment method to complete a payment.

Use the following guides to implement each process.

## Payment workflow

The diagram below illustrates the complete payment workflow:

![](https://files.readme.io/aa0edc30b1470562f8cc1380856aacb410d41aa6417d863e2c65476d26481fa4-image1.png)

For platform-specific setup, refer to:

<Shelf classname="link_cards_container">
  <YunoCard title="Web" href="/docs/seamless-sdk-payment-web" titleSize="h4" />

  <YunoCard title="iOS" href="/docs/seamless-sdk-payment-ios" titleSize="h4" />

  <YunoCard title="Android" href="/docs/seamless-sdk-payment-android" titleSize="h4" />
</Shelf>

<br />

<HTMLBlock>{`
<body>
  <section class="platform_shelf">
    <a class="platform_buttons" href="/docs/seamless-sdk-payment-web">
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

    <a class="platform_buttons" href="/docs/seamless-sdk-payment-ios">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
          <path
            d="M7.51258 1.64063C7.63391 1.1707 7.90808 0.754471 8.29192 0.457457C8.67576 0.160444 9.14748 -0.00048619 9.63281 1.10338e-06H9.6875C9.80353 1.10338e-06 9.91481 0.0460947 9.99686 0.128142C10.0789 0.210189 10.125 0.321469 10.125 0.437501C10.125 0.553533 10.0789 0.664813 9.99686 0.74686C9.91481 0.828907 9.80353 0.875001 9.6875 0.875001H9.63281C9.34182 0.874976 9.05906 0.971656 8.829 1.14984C8.59894 1.32803 8.43462 1.57762 8.36188 1.85938C8.33287 1.97178 8.26039 2.06806 8.1604 2.12703C8.0604 2.186 7.94108 2.20284 7.82867 2.17383C7.71627 2.14482 7.61999 2.07235 7.56102 1.97235C7.50204 1.87236 7.48521 1.75303 7.51422 1.64063H7.51258ZM12.7117 9.27445C12.6789 9.19948 12.6259 9.1351 12.5586 9.08852C11.6305 8.45086 11.4375 7.36313 11.4375 6.5625C11.4375 5.59617 12.1741 4.75453 12.6133 4.33836C12.6565 4.29748 12.6909 4.24821 12.7144 4.19358C12.7379 4.13895 12.75 4.0801 12.75 4.02063C12.75 3.96115 12.7379 3.9023 12.7144 3.84767C12.6909 3.79304 12.6565 3.74378 12.6133 3.70289C11.9198 3.04828 10.7714 2.625 9.6875 2.625C8.90889 2.6257 8.14785 2.85648 7.5 3.28836C6.74428 2.7816 5.83561 2.55402 4.93024 2.64474C4.02488 2.73547 3.17943 3.13884 2.5393 3.78547C2.15661 4.17615 1.85635 4.63976 1.65634 5.14875C1.45633 5.65775 1.36066 6.20175 1.375 6.74844C1.39647 7.6712 1.60165 8.58043 1.97856 9.42299C2.35547 10.2655 2.89654 11.0245 3.57016 11.6555C3.97583 12.0388 4.51323 12.2516 5.07133 12.25H9.86633C10.1647 12.2506 10.46 12.1898 10.7339 12.0716C11.0079 11.9533 11.2546 11.7801 11.4588 11.5626C11.8372 11.1554 12.1644 10.7037 12.4334 10.2173C12.8173 9.51563 12.768 9.40625 12.7117 9.27445Z"
            fill="#513CE1" />
        </svg>

      </div>
      <h3>
        iOS
      </h3>
    </a>

    <a class="platform_buttons" href="/docs/seamless-sdk-payment-android">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M11.3236 4.84914C11.2831 4.80867 11.2421 4.7693 11.2011 4.73047L12.5595 3.37203C12.6002 3.33138 12.6324 3.28313 12.6544 3.23002C12.6764 3.17691 12.6877 3.11998 12.6877 3.0625C12.6877 3.00501 12.6764 2.94809 12.6544 2.89498C12.6324 2.84187 12.6002 2.79362 12.5595 2.75297C12.5189 2.71232 12.4706 2.68008 12.4175 2.65808C12.3644 2.63608 12.3075 2.62476 12.25 2.62476C12.1925 2.62476 12.1356 2.63608 12.0825 2.65808C12.0294 2.68008 11.9811 2.71232 11.9405 2.75297L10.5186 4.17484C9.48923 3.45025 8.26073 3.06222 7.00191 3.06408C5.74309 3.06594 4.51574 3.4576 3.48852 4.18523L2.05953 2.75297C1.97744 2.67088 1.8661 2.62476 1.75 2.62476C1.63391 2.62476 1.52256 2.67088 1.44047 2.75297C1.35838 2.83506 1.31226 2.9464 1.31226 3.0625C1.31226 3.1786 1.35838 3.28994 1.44047 3.37203L2.81094 4.7425C2.19871 5.32256 1.71125 6.02141 1.37838 6.79633C1.04551 7.57124 0.874223 8.40591 0.875003 9.2493V10.5C0.875003 10.7321 0.96719 10.9546 1.13128 11.1187C1.29538 11.2828 1.51794 11.375 1.75 11.375H12.25C12.4821 11.375 12.7046 11.2828 12.8687 11.1187C13.0328 10.9546 13.125 10.7321 13.125 10.5V9.1875C13.1272 8.38106 12.9691 7.58223 12.6599 6.83745C12.3506 6.09267 11.8964 5.4168 11.3236 4.84914ZM5.03125 9.1875C4.90146 9.1875 4.77458 9.14901 4.66666 9.0769C4.55874 9.00479 4.47463 8.9023 4.42496 8.78238C4.37529 8.66247 4.36229 8.53052 4.38761 8.40322C4.41293 8.27592 4.47544 8.15899 4.56721 8.06721C4.65899 7.97543 4.77592 7.91293 4.90322 7.88761C5.03052 7.86229 5.16247 7.87528 5.28239 7.92495C5.4023 7.97462 5.5048 8.05874 5.5769 8.16666C5.64901 8.27458 5.6875 8.40145 5.6875 8.53125C5.6875 8.7053 5.61836 8.87222 5.49529 8.99529C5.37222 9.11836 5.2053 9.1875 5.03125 9.1875ZM8.96875 9.1875C8.83896 9.1875 8.71208 9.14901 8.60416 9.0769C8.49624 9.00479 8.41213 8.9023 8.36246 8.78238C8.31279 8.66247 8.29979 8.53052 8.32511 8.40322C8.35043 8.27592 8.41294 8.15899 8.50471 8.06721C8.59649 7.97543 8.71342 7.91293 8.84072 7.88761C8.96803 7.86229 9.09997 7.87528 9.21989 7.92495C9.3398 7.97462 9.44229 8.05874 9.5144 8.16666C9.58651 8.27458 9.625 8.40145 9.625 8.53125C9.625 8.7053 9.55586 8.87222 9.43279 8.99529C9.30972 9.11836 9.1428 9.1875 8.96875 9.1875Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h3>
        Android
      </h3>
    </a>

  </section>
</body>
`}</HTMLBlock>

### Step 1: Create a customer (optional)

If you want to associate a customer with stored payment methods, start by creating a customer profile.

* Use the [Create customer](ref:create-customer) endpoint to generate a new customer `id`.
* If a **customer session** is not used, payments will proceed without stored user data (e.g., pre-filled fields or saved payment methods).

You can skip this step if you already have a customer `id` or prefer to omit it entirely.

> 📘 Omit customer session step
>
> When you choose to not use a `customer_session`, the payment will be created without a customer `id`, leaving it empty when creating the payment. As a result, the process will not use any stored customer date, such as pre-filled form fields or saved payment details.
>
> While skipping the customer session can simplify integration, it removes features designed to streamline the user experience, which can improve conversion rates by reducing friction during checkout.

### Step 2: Create a checkout session

Next, create a checkout session. You must create a new checkout session for every new payment. This session provides access to all available payment methods (previously enrolled or not) for a specific customer.

Use the [Create checkout session](ref:create-checkout-session) endpoint, providing the customer `id`, to get a new `checkout_session`.

### Step 3: Display payment methods

Query the available payment methods using the [Retrieve payment methods](ref:retrieve-payment-methods-for-checkout) endpoint using the `checkout_session`. Show these methods to the customer so they can select their preferred payment method to execute the payment.

> 📘 Previously enrolled payment methods
>
> If the customer has previously enrolled payment methods, you'll receive them as well. Use the `vaulted_token` for these methods to create the One-Time Token and process the payment.

> ❗️ Display Payment Methods
>
> You are responsible for displaying the payment methods and capturing the customer's selection when using the Seamless SDK.

### Step 4: Implement the SDK

After the customer selects the payment method, initialize the SDK with the checkout information. The SDK will generate the one-time toke, create the payment, and call on `continuePayment()` to display any screens necessary for the user to complete the payment automatically.

After the customer selects a payment method, initialize the SDK with the checkout information. The SDK will:

* Generate the **one-time token (OTT)**.
* Create the payment.
* Call `continuePayment()` if additional customer actions are required.

To initialize the **Seamless SDK**, follow these steps:

1. Include the SDK library in your project.
2. Initialize it with your API credentials and `checkout_session`.
3. Start the checkout process by calling `yuno.startCheckout()` with your configuration.
4. Display the checkout interface in a browser or mobile app.
5. Add a **payment button** that calls `yuno.startPayment()` when clicked.

The SDK may also collect customer details (e.g., card information, email, phone number, document ID) required by the provider. Once initialized, the SDK returns a **one-time token (OTT)** via the `yunoCreatePayment()` callback function.

### Step 5: Get payment status

To obtain the **payment status**, call the `yunoPaymentResult()` function. Based on the status, display the corresponding confirmation screen to the customer.

### Step 6: Receive payment result through webhook

Yuno recommends configuring [webhooks](doc:webhooks) in your [dashboard](https://auth.y.uno/u/login?). Webhooks automatically notify your system of payment updates, eliminating the need for frequent status requests.