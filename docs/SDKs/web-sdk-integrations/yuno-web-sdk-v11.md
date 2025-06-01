---
title: Yuno Web SDK v1.1
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
Starting April 2025, Yuno is launching version 1.1 of its Web SDKs. It includes major performance improvements, a more flexible checkout experience, better visual consistency, and new features that improve both security and usability. Existing customers may choose to skip the upgrade, though they won’t have access to the enhancements.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer ">
    <div class="verticalLine"></div>
    <div>
      <h3>Upgrade to v1.1</h3>
      <div class="contentContainer">
        <p>
          <a href="https://docs.y.uno/docs/full-checkout-sdk">Visit the Web SDK documentation page</a> for detailed instructions on how to implement v1.1.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Implementation changes

### Async method update

As of SDK v1.1, key methods such as `initialize()`, `mountCheckout()`, and `startCheckout()` now return Promises. This change supports better handling of dynamic flows like 3DS, PayPal redirects, and custom UI rendering.

These methods are asynchronous and should use `await` to ensure the flow completes in order.

### `continuePayment` method

With the introduction of new payment methods and dynamic flows in SDK v1.1, the `continuePayment` method has become more important for completing customer payment experiences after payment creation. When the API response includes `sdk_action_required: true`, you must call `continuePayment` to resume the process.

The SDK will automatically render the necessary screens, such as 3DS authentication or external wallet steps, so customers can complete the payment without any manual handling on your side. In some cases, the method may return a redirect object if merchant-side handling is required; otherwise, it returns `null`.

## 3DS enhancements notice (June 5, 2025)

As part of ongoing improvements, Yuno has updated the 3DS flow to increase reliability and simplify integration:

* The 3DS setup service is no longer required separately; data collection and setup are now included inside the payment creation
* All 3DS transactions will be asynchronous with a redirection to collect device information and handle challenges
* If using the Web SDK, upgrade to version 1.1 and ensure to implement `continuePayment()` and `yunoPaymentResult()` after payment creation
* Direct 3DS integrations no longer require the setup service or SDK; a single API call handles this flow via redirect URLs
* These changes go live in sandbox on 06/05/2025 and in production on 09/05/2025

For more information, see the [3DS guide](https://docs.y.uno/docs/3ds-setup-sdk).

## Additional Updates in v1.1

### 3DS flow optimization

The SDK now triggers the `collect` step only when 3DS is required, reducing unnecessary calls and improving overall performance. Challenge flows remain unaffected.

### Click-to-pay (C2P) dynamic behavior

* Terms & Conditions and logos dynamically update based on the card.
* C2P options are hidden for unsupported cards.
* A phone number field has been added for registration.
* Compliance settings for `privacy` and `tnc` (terms and conditions) are now passed along with the card.

### Enrolled Card Visualization Improvements

* Generic card visuals now appear for Visa and Mastercard.
* American Express displays CVV on the front of the card.
* Card visualization flips dynamically based on CVV field focus.
* Dynamic titles adapt to the input entered by users.
* Redesigned installment selector for better UX in mobile and desktops.
* Consistent styling and behavior across platforms.

### Layout improvements

Corrected overlapping between document type and installment fields. Layout now adjusts appropriately during validation.

### Preselected payment method

* Automatically preselects the last payment method used (or first configured one).
* Error-free handling of invalid or deleted methods.

### Enrolled payment method deletion

Users can now remove saved payment methods directly within the SDK interface.

### Inline card input

* Users can now enter card details directly beneath the **Card** option.
* Full with existing flows, such as installments and card selector.
* Fields persist when switching methods.

### PayPal fallback client ID

When the PayPal `clientId` is not provided in the merchant configuration, the SDK uses the fallback from the `paymentByCheckoutSession` endpoint response.

### Flexible checkout styling

Flexible Actions elements now support custom styling passed through the `UI` object in the `getPaymentByCheckout`response, ensuring consistent design across platforms and devices.

### Obsolete field removal

Removed the unused `gender` field from the SDK and required fields configuration.

### Status screen updates

Visual enhancements to all status screens, providing a cleaner look.

### New security integrations

* **Airwallex**: Adds an additional security layer for web.
* **Forter (Web)**: Enhanced payment protection thanks to Forter’s fraud prevention technology.
* **Checkout 3DS**: New 3D Secure provider supported. Renders the authentication page when the transaction provider is `checkout3ds`.
* **Unlimit 3DS**: Introduced 3DS support for Unlimit payments, enhancing authentication and fraud prevention.

### Improvements to Brazilian hybrid cards

Hybrid cards are now processed as credit by default, improving conversion for Brazil-based merchants.

### New payment method - Boleto (Brazil)

Boleto Bancário is now available for all merchants operating in Brazil, expanding local payment options and improving conversion for users who prefer offline methods.

Visit the Web SDK [GitHub repository](https://github.com/yuno-payments/yuno-sdk-web/blob/main/README.md) for more information.
