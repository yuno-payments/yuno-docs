---
title: Full SDK (COPY)
deprecated: false
hidden: false
metadata:
  title: Full SDK
  description: >-
    Using our Full SDK, you can integrate Yuno, minimizing integration,
    maintenance, and operational efforts without any need for compliance.
  robots: index
---
With Yuno Full SDK, you can seamlessly integrate Yuno into your system. This approach simplifies integration, maintenance, and operations without requiring additional compliance work.

### Key features

* **User experience**: Yuno manages the entire checkout process.
* **Customization**: Configure payment methods and UI elements directly from Yuno's dashboard.
* **Flexibility**: Add new payment methods and features without extra development.
* **Single integration**: Support multiple payment methods through a single implementation, regardless of the customer's chosen method.

### What you can do with the full SDK

1. Process payments seamlessly.
2. Enroll a credit card while processing a payment.
3. Use a vaulted token from an enrolled payment method.

Follow the step-by-step guides below to integrate the full SDK:

<HTMLBlock>{`
<body>
  <section class="link_cards_container">
    <a class="card" href="#payment-workflow">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Payment workflow</h4>
    </a>
    
    <a class="card" href="#payment-workflow-using-a-vaulted-token">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Payment workflow using a vaulted token</h4>
    </a>    

    <a class="card" href="#enroll-a-credit-card-while-paying">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Enroll a credit card while paying</h4>
    </a>
  </section>

</body>
`}</HTMLBlock>

## Payment workflow

The Full SDK provides a **unified payment experience**, allowing customers to complete transactions using multiple payment methods within a single integration. The diagram below illustrates the complete process:

![](https://files.readme.io/0b97d1a-Diagrama_-_Full_SDK.png)

For platform-specific SDK setup, refer to:

<HTMLBlock>{`
<body>
  <section class="platform_shelf">
    <a class="platform_buttons" href="/docs/full-checkout-sdk">
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

    <a class="platform_buttons" href="/docs/full-checkout-ios">
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

    <a class="platform_buttons" href="/docs/full-checkout-android">
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
     <a class="platform_buttons" href="/docs/flutter-sdk-integration">
      <div class="svg_content">

        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
          <path
            d="M13.4219 7.38437L9.11563 11.6906L13.4219 16H8.5L6.65312 14.1531L4.19063 11.6906L8.5 7.38437H13.4219ZM8.5 0L0.5 8L2.9625 10.4625L13.4219 0H8.5Z"
            fill="#513CE1" />
        </svg>

      </div>
      <h3>
        Flutter
      </h3>
    </a>
  </section>
</body>
`}</HTMLBlock>

<br />

### Step 1: Create a customer

If your system does not already have a `customer_id`, you must create one to associate payment methods with the customer.

* Use the [Create customer](ref:create-customer) endpoint to generate a new `customer_id`.
* If no customer session is used, the payment process will proceed without stored user data (e.g., pre-filled fields or saved payment methods).

**Note**: Skipping the customer session simplifies integration but removes features that enhance conversion rates by reducing checkout friction.

> 📘 Omit customer session step
>
> When you choose to not use a `customer_session`, the payment will be created without a customer `id`, leaving it empty when creating the payment. As a result, the process will not use any stored customer date, such as pre-filled form fields or saved payment details.
>
> While skipping the customer session can simplify integration, it removes features designed to streamline the user experience, which can improve conversion rates by reducing friction during checkout.

### Step 2: Create a checkout session

Each payment requires a new checkout session, which grants access to all available payment methods for a specific customer.

* Use the [Create checkout session](ref:create-checkout-session) endpoint.
* Provide the `customer_id` to retrieve a new `checkout_session`.

### Step 3: Implement the SDK and retrieve a one-time token

The Full SDK displays all available payment methods and collects additional customer details if required.

**To initialize the SDK:**

1. Include the SDK library in your project.
2. Initialize it with your API credentials and `checkout_session`.
3. Call `yuno.startCheckout()` to launch the checkout process.
4. Display the checkout interface in a browser or mobile app.
5. Add a **payment button** that calls `yuno.startPayment()` when clicked.

During this process, the SDK may collect customer details such as card information, email, phone number, or document ID.

After a successful initialization, the SDK returns a one-time token (OTT) via the `yunoCreatePayment()` callback function.

### Step 4: Create a payment

With the one-time token, create the payment. This process gathers all order details, including customer specifics, total amount, currency, products, and shipping details. Use the [Create payment](ref:create-payment) endpoint, informing the `one_time_token` in the `payment_method.token` attribute.

The response from [Create payment](ref:create-payment) will include the `sdk_action_required`, which defines if additional actions are required based on the payment type:

* **Synchronous payment**: If `sdk_action_required` is `false`, the payment is complete.
* **Asynchronous payment**: If `sdk_action_required` is `true`, additional actions are required to complete the payment. Use the `continuePayment` function to complete the payment. See the instructions in [Step 5](#step-5-continue-payment-if-needed).

> 📘 Payment Status Best Practices
>
> During integration, use the payment `status` and `sub_status` as your primary reference for the payment's state. Since a payment might have multiple associated transactions, concentrating on the payment `status`/`sub_status` ensures you're informed of the most recent state. This provides a clear basis for decision-making regardless of the number of transactions involved.

### Step 5: Continue payment

If `sdk_action_required` is `true`, call `continuePayment()` to display additional screens or steps for the customer.

Yuno recommends implementing `continuePayment()` since some asynchronous payment methods require customer actions to finalize the transaction.

### Step 6: Get payment status

Call the `yunoPaymentResult()` function to obtain the payment `status`. Based on the status, you can show your customer the corresponding screen depending on the final result of the payment.

### Step 7: Receive payment result through webhook

Yuno recommends configuring [webhooks](doc:webhooks) in your [dashboard](https://auth.y.uno/u/login?). Webhooks ensure your system remains updated with payment statuses in real-time, removing the need for manual status checks.

## Payment workflow using a vaulted token

If a customer has an enrolled payment method, they can use a **vaulted token** from the enrollment process to complete transactions **without** entering payment details again.

![](https://files.readme.io/e257d04-Diagrama_-_Vaulted_token_Full.png)

This workflow follows the same steps as the **payment workflow**, but instead of collecting new payment details, the SDK retrieves the stored **vaulted token**:

1. [Create a checkout session](#step-2-create-a-checkout-session).
2. [Implement the SDK and retrieve a one-time token](#step-3-implement-the-sdk-and-retrieve-a-one-time-token), using the **vaulted token**.
3. [Create the payment](#step-4-create-a-payment).
4. [Continue payment](#step-5-continue-payment).
5. [Get payment status](#step-6-get-payment-status).
6. [Receive payment result via webhook](#step-7-receive-payment-result-through-webhook).

For these steps, follow the guidelines in the [payment workflow](#payment-workflow).

## Enroll a credit card while paying

With the Full SDK, you can save credit/debit cards for future purchases with the same payment request without the enrollment [integration](enrollment-lite). You can obtain the [vaulted token](doc:tokens) in two ways:

* **Via API**: Set `vault_on_success = true` when using the [Create payment](ref:create-payment) endpoint. You will receive the `vaulted_token` that corresponds to the card used by the customer payer in the response.
* **Via SDK settings**: Set `cardSaveEnable = true` in the SDK complementary features ([Web](doc:complementary-features-full-sdk), [iOS](doc:full-checkout-ios), [Android](doc:full-checkout-android), and [Flutter](https://docs.y.uno/docs/flutter-sdk-integration)). The SDK will display a checkbox for users to select if they want to save the card for future purchases. If the user checks the box, you will receive the `vaulted_token`.

> 📘 Card Enrollment Options
>
> You should only use one option to enroll a card. To enroll alternative payment methods, you have to use the [Lite SDK](enrollment-lite).

After enrolling a payment method, you can use the vaulted token to perform payments. To access information about the payment methods enrolled by each user, you can use one of the following endpoints:

* [Get payment methods by checkout session](ref:retrieve-payment-methods-for-checkout).
* [Get payment methods by customer](ref:retrieve-enrolled-payment-methods-api).

> 🚧 Using a vaulted token
>
> Even if the user selects an enrolled payment method, Yuno recommends using the SDK to tokenize the information instead of directly using the vaulted token with Yuno's API. This approach provides several benefits:
>
> * **Support 3DS**: Enhanced security for online payments.
> * **Fraud Screening**: Better protection against fraudulent transactions.
> * **Collect Required Information**: Gather additional fields required by the provider if necessary.