---
title: '[Release notes]'
deprecated: false
hidden: true
metadata:
  robots: index
---
## Old version

<HTMLBlock>{`
<table>
  <thead>
    <tr>
      <th>Version</th>
      <th>Changes</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>1.20.2</td>

      <td>
        * **FIX**: NuPay redirect issue<br />- **FIX**: CVV validation in enrollment<br />- **NEW**: Callback \`tokenWithInformation\`
      </td>
    </tr>

    <tr>
      <td>1.17.0</td>

      <td>
        * **IMPROVE**: Nubank flow
      </td>
    </tr>

    <tr>
      <td>1.16.0</td>

      <td>
        * **NEW**: 3DS FAC fraud engine
      </td>
    </tr>

    <tr>
      <td>1.15.1</td>

      <td>
        * **FIX**: Java version compatibility
      </td>
    </tr>

    <tr>
      <td>1.15.0</td>

      <td>
        * **IMPROVE**: Cards and Nubank UI/UX<br />- **IMPROVE**: Chile RUT validation
      </td>
    </tr>

    <tr>
      <td>1.14.0</td>

      <td>
        * **IMPROVE**: Removed CNPJ from Nubank flow
      </td>
    </tr>

    <tr>
      <td>1.13.0</td>

      <td>
        * **IMPROVE**: Card forms design and UX
      </td>
    </tr>

    <tr>
      <td>1.12.2</td>

      <td>
        * **NEW**: 3DS Netcetera fraud engine
      </td>
    </tr>

    <tr>
      <td>1.12.1</td>

      <td>
        * **IMPROVE**: MercadoPago SDK performance
      </td>
    </tr>

    <tr>
      <td>1.12.0</td>

      <td>
        * **NEW**: PIX - SANTANDER payment method
      </td>
    </tr>

    <tr>
      <td>1.11.4</td>

      <td>
        * **IMPROVE**: MercadoPago SDK performance
      </td>
    </tr>

    <tr>
      <td>1.11.3</td>

      <td>
        * **FIX**: Style overrides
      </td>
    </tr>

    <tr>
      <td>1.11.2</td>

      <td>
        * **IMPROVE**: Card flow expiration date experience
      </td>
    </tr>

    <tr>
      <td>1.11.1</td>

      <td>
        * **IMPROVE**: Card flow
      </td>
    </tr>

    <tr>
      <td>1.11.0</td>

      <td>
        * **NEW**: DeUna payment method
      </td>
    </tr>

    <tr>
      <td>1.10.1</td>

      <td>
        * **IMPROVE**: SDK and Card flow performance
      </td>
    </tr>

    <tr>
      <td>1.10.0</td>

      <td>
        * **NEW**: Pluxe payment method<br />- **IMPROVE**: Google Pay flow<br />- **IMPROVE**: SDK performance and design
      </td>
    </tr>

    <tr>
      <td>1.8.0</td>

      <td>
        * **NEW**: Headless flow to get 3DS challenge URL
      </td>
    </tr>

    <tr>
      <td>1.7.0</td>

      <td>
        * **NEW**: Headless flow to generate a one-time token (OTT) and get 3DS challenge
      </td>
    </tr>

    <tr>
      <td>1.6.1</td>

      <td>
        * **FIX**: Antifraud blocking one-time token generation<br />- IMPORTANT CHANGES: Added \`showPaymentStatus\` argument to \`startPaymentLite\` and \`startPayment\` to control error screen display
      </td>
    </tr>

    <tr>
      <td>1.6.0</td>

      <td>
        * **NEW**: Mercado Pago antifraud<br />- **IMPROVE**: Click to pay flow<br />- **FIX**: Minor bugs
      </td>
    </tr>

    <tr>
      <td>1.5.14-HF</td>

      <td>
        * **NEW**: Function to create One Time Token with card info in Enrollment and Payment<br />- **FIX**: Crash with location permissions
      </td>
    </tr>

    <tr>
      <td>1.5.14</td>

      <td>
        * **IMPROVE**: Step-by-step and one-step card payments
      </td>
    </tr>

    <tr>
      <td>1.5.13</td>

      <td>
        * **NEW**: Mercado Pago Wallet enrollment via deeplink and custom tab<br />- **NEW**: 3DS and Cybersource fraud engines
      </td>
    </tr>

    <tr>
      <td>1.5.12</td>

      <td>
        * **IMPROVE**: Card payments flow<br />- Important Changes: Replaced **CardExpiryDate** **EditText** and **TextField** **ItemView** (CVV) with a single **CardDataStackView** component for SecureFields
      </td>
    </tr>

    <tr>
      <td>1.5.11</td>

      <td>
        * **FIX**: Discover card validation
      </td>
    </tr>

    <tr>
      <td>1.5.0</td>

      <td>
        * **NEW**: Antifraud for Cards flow<br />- **NEW**: Click 2 Pay payment method<br />- **NEW**: Supported language methods<br />- **NEW**: SDK Design<br />- **IMPROVE**: Card payments flow<br />- **IMPROVE**: Performance
      </td>
    </tr>

    <tr>
      <td>1.4.12</td>

      <td>
        * **IMPROVE**: Card payments flow
      </td>
    </tr>

    <tr>
      <td>1.4.11</td>

      <td>
        * **IMPROVE**: Card enrollment flow
      </td>
    </tr>

    <tr>
      <td>1.4.10</td>

      <td>
        * **IMPROVE**: Google Pay flow<br />- **FIX**: Restore SDK state after app kill
      </td>
    </tr>

    <tr>
      <td>1.4.9</td>

      <td>
        * **IMPROVE**: Google Pay flow<br />- **FIX**: CVV and expiry fields missing in step-by-step enrollment<br />- **NEW**: VOUCHER card payment method<br />- **IMPROVE**: Card step-by-step and Pix flow design<br />- **NEW**: SAFETYPAY payment method<br />- **NEW**: EFECTY payment method<br />- **NEW**: NEQUI payment method<br />- **NEW**: YAPPY payment method<br />- **NEW**: GOOGLE PAY payment method<br />- **NEW**: SENCILLITO payment method<br />- **NEW**: Installments for card payments<br />- **IMPROVE**: 3DS flow for cards<br />- **IMPROVE**: Card step-by-step design<br />- **NEW**: \`sessionId\` generation for antifraud via \`startCheckout()\`<br />- **NEW**: Option to persist loader
      </td>
    </tr>

    <tr>
      <td>1.4.8</td>

      <td>
        * **IMPROVE**: Google Pay flow
      </td>
    </tr>

    <tr>
      <td>1.4.7</td>

      <td>
        * **FIX**: CVV and expiry fields missing in step-by-step enrollment
      </td>
    </tr>

    <tr>
      <td>1.4.6</td>

      <td>
        * **NEW**: VOUCHER card payment method<br />- **IMPROVE**: Google Pay flow
      </td>
    </tr>

    <tr>
      <td>1.4.5</td>

      <td>
        * **IMPROVE**: Card step-by-step and Pix flow design
      </td>
    </tr>

    <tr>
      <td>1.4.4</td>

      <td>
        * **IMPROVE**: 3DS flow for card payments
      </td>
    </tr>

    <tr>
      <td>1.4.3</td>

      <td>
        * **IMPROVE**: Card step-by-step field navigation
      </td>
    </tr>

    <tr>
      <td>1.4.2</td>

      <td>
        * **IMPROVE**: Card step-by-step flow design
      </td>
    </tr>

    <tr>
      <td>1.4.1</td>

      <td>
        * **NEW**: GOOGLE PAY payment method<br />- **NEW**: SENCILLITO payment method
      </td>
    </tr>

    <tr>
      <td>1.4.0</td>

      <td>
        * **NEW**: SAFETYPAY payment method<br />- **NEW**: EFECTY payment method<br />- **NEW**: NEQUI payment method<br />- **NEW**: YAPPY payment method<br />- **NEW**: Installments for card payments<br />- **NEW**: \`sessionId\` generation for antifraud via \`startCheckout()\`<br />- **NEW**: Option to persist loader
      </td>
    </tr>

    <tr>
      <td>1.3.9</td>

      <td>
        * **FIX**: Card step-by-step flow<br />- **NEW**: Loading screen design<br />- **NEW**: Mercado Pago Checkout Pro no longer requires form
      </td>
    </tr>

    <tr>
      <td>1.3.8</td>

      <td>
        * **FIX**: Customer with null document
      </td>
    </tr>

    <tr>
      <td>1.3.7</td>

      <td>
        * **IMPROVE**: Card flows
      </td>
    </tr>

    <tr>
      <td>1.3.6</td>

      <td>
        * Important Changes: Removed flag to require CVV on enrolled cards, now dynamic.<br />\`data class YunoConfig(\` <br />\`  val cardFlow: CardFormType = CardFormType.ONE_STEP,\`<br />\`  val saveCardEnabled: Boolean = false\`<br />\`)\`
      </td>
    </tr>

    <tr>
      <td>1.3.5</td>

      <td>
        * **NEW**: CASH payment method<br />- **NEW**: BANK\_TRANSFER payment method
      </td>
    </tr>

    <tr>
      <td>1.3.4</td>

      <td>
        * **NEW**: UNLIMINT payment method<br />- **NEW**: PagSeguro payment method
      </td>
    </tr>

    <tr>
      <td>1.3.3</td>

      <td>
        * **FIX**: Card step-by-step form design
      </td>
    </tr>

    <tr>
      <td>1.3.2</td>

      <td>
        * **NEW**: Tarjeta Clave payment method<br />- **NEW**: Kushki payment method<br />- **NEW**: Khipu payment method<br />- **NEW**: Request CVV for enrolled cards via SDK init flag<br />- **NEW**: OTP screen timer for payment expiration<br />- **NEW**: \`EnrollmentMethodsListView()\` to show enrollment-available methods<br />- Important Changes: Added \`requestSecurityCode\` field to **YunoConfig** for requesting CVV in card flow:<br />\`data class YunoConfig(\` <br />\`  val cardFlow: CardFormType = CardFormType.ONE_STEP,\`<br />\`  val saveCardEnabled: Boolean = false,\`<br />\`  val requestSecurityCode: Boolean = false\`<br />\`)\`
      </td>
    </tr>

    <tr>
      <td>1.3.1</td>

      <td>
        * **NEW**: Paga con Rappi payment method
      </td>
    </tr>

    <tr>
      <td>1.3.0</td>

      <td>
        * **NEW**: Arcus Cash payment method<br />- **NEW**: Daviplata payment method<br />- **NEW**: CoDi payment method<br />- **NEW**: PayValida payment method<br />- **NEW**: Enable/Disable "Save card" via **YunoConfig** in \`initialize\`<br />- Important Changes: **YunoConfig** data class for \`initialize\` customization
      </td>
    </tr>

    <tr>
      <td>1.2.5</td>

      <td>
        * **FIX**: Payment and Enrollment state on user cancel
      </td>
    </tr>

    <tr>
      <td>1.2.4</td>

      <td>
        * **NEW**: SPEI payment method<br />- **NEW**: Step-by-step card Enrollment and Payment
      </td>
    </tr>

    <tr>
      <td>1.2.2</td>

      <td>
        * **NEW**: Initialize enrollment state callback in \`startEnrollment\`<br />- **NEW**: Initialize payment state callback in \`continuePayment\`<br />- **NEW**: Initialize one-time token callback in \`startPayment\`
      </td>
    </tr>

    <tr>
      <td>1.2.1</td>

      <td>
        * **FIX**: "Paga con tajeta" typo in Spanish<br />- **FIX**: Error message on document number field
      </td>
    </tr>

    <tr>
      <td>1.2.0</td>

      <td>
        * Important Changes: Added callback in \`startPayment\` to avoid \`onActivityResult\`<br />- Important Changes: Added \`initEnrollment\` method to configure callback and avoid \`onActivityResult\`
      </td>
    </tr>

    <tr>
      <td>1.1.1</td>

      <td>
        * **FIX**: Hide environment tag for production keys
      </td>
    </tr>

    <tr>
      <td>1.1.0</td>

      <td>
        * Important Changes: \`startEnrollment\` now requires country code (e.g., "CO")<br />- **NEW**: Credit card enrollment flow<br />- **NEW**: New design for Credit Card form<br />- **NEW**: \`onSelected\` event for **PaymentMethodListView**<br />- **NEW**: Title to separate enrolled/unEnrolled methods<br />- **NEW**: \`EnrollmentPaymentMethodListView()\`<br />- **NEW**: \`UnEnrolledPaymentMethodListView()\`<br />- **NEW**: Label for current environment<br />- **FIX**: Improved expiration date validation in Credit Card Form<br />- **REMOVE**: Deleted \`testResult\` options
      </td>
    </tr>

    <tr>
      <td>1.0.11</td>

      <td>
        * **FIX**: Improved UX on enrollment flow after external app interaction
      </td>
    </tr>

    <tr>
      <td>1.0.10</td>

      <td>
        * **FIX**: Avoid 404 after enrollment
      </td>
    </tr>

    <tr>
      <td>1.0.9</td>

      <td>
        * **FIX**: Avoid infinite loader on payment lite flow
      </td>
    </tr>

    <tr>
      <td>1.0.8</td>

      <td>
        * **NEW**: Removed Moshi dependency, using Gson
      </td>
    </tr>

    <tr>
      <td>1.0.7</td>

      <td>
        * **NEW**: Changed android hint type on attrs with reference
      </td>
    </tr>

    <tr>
      <td>1.0.6</td>

      <td>
        * **FIX**: Improved pay method item design (full version)<br />- **FIX**: Phone field visibility
      </td>
    </tr>

    <tr>
      <td>1.0.5</td>

      <td>
        * **NEW**: SafetyPay payment method<br />- **NEW**: WebSocket for payment state notifications<br />- **NEW**: Removed user address from Addi form<br />- **FIX**: CustomerForm regex validators
      </td>
    </tr>

    <tr>
      <td>1.0.4</td>

      <td>
        * **NEW**: Transaction status changed to pending on start
      </td>
    </tr>

    <tr>
      <td>1.0.3</td>

      <td>
        * **NEW**: Internal error state callback
      </td>
    </tr>

    <tr>
      <td>1.0.2</td>

      <td>
        * **FIX**: Reset CVV regex on card number deletion in payment form
      </td>
    </tr>

    <tr>
      <td>1.0.1</td>

      <td>
        * **NEW**: Bank transfer/card payment type filter<br />- **NEW**: Payment view models testing features<br />- **FIX**: Payment type name for PIX and Nupay<br />- **CHANGE**: Set timezone to UTC in DateExtension<br />- **CHANGE**: Payment method type in payment mappers
      </td>
    </tr>

    <tr>
      <td>1.0.0</td>

      <td>
        * **NEW** Payment Methods<br />- **NEW**: Mercado Pago method enrollment<br />- **NEW**: Debit/credit card payments<br />- **NEW**: Mercado Pago Checkout Pro payments<br />- **FIX**: City text field hint and title<br />- **FIX**: Pix type in payments flow<br />- **FIX**: Card information on start checkout<br />- **FIX**: English translation in payment form title
      </td>
    </tr>
  </tbody>
</table>
`}</HTMLBlock>

<br />

## New version

<Table>
  <thead>
    <tr>
      <th>
        Version
      </th>

      <th>
        Changes
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        1.20.2
      </td>

      <td>
        * **FIX**: NuPay redirect issue
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **FIX**: CVV validation in enrollment
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Callback `tokenWithInformation`
      </td>
    </tr>

    <tr>
      <td>
        1.17.0
      </td>

      <td>
        * **IMPROVE**: Nubank flow
      </td>
    </tr>

    <tr>
      <td>
        1.16.0
      </td>

      <td>
        * **NEW**: 3DS FAC fraud engine
      </td>
    </tr>

    <tr>
      <td>
        1.15.1
      </td>

      <td>
        * **FIX**: Java version compatibility
      </td>
    </tr>

    <tr>
      <td>
        1.15.0
      </td>

      <td>
        * **IMPROVE**: Cards and Nubank UI/UX
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **IMPROVE**: Chile RUT validation
      </td>
    </tr>

    <tr>
      <td>
        1.14.0
      </td>

      <td>
        * **IMPROVE**: Removed CNPJ from Nubank flow
      </td>
    </tr>

    <tr>
      <td>
        1.13.0
      </td>

      <td>
        * **IMPROVE**: Card forms design and UX
      </td>
    </tr>

    <tr>
      <td>
        1.12.2
      </td>

      <td>
        * **NEW**: 3DS Netcetera fraud engine
      </td>
    </tr>

    <tr>
      <td>
        1.12.1
      </td>

      <td>
        * **IMPROVE**: MercadoPago SDK performance
      </td>
    </tr>

    <tr>
      <td>
        1.12.0
      </td>

      <td>
        * **NEW**: PIX - SANTANDER payment method
      </td>
    </tr>

    <tr>
      <td>
        1.11.4
      </td>

      <td>
        * **IMPROVE**: MercadoPago SDK performance
      </td>
    </tr>

    <tr>
      <td>
        1.11.3
      </td>

      <td>
        * **FIX**: Style overrides
      </td>
    </tr>

    <tr>
      <td>
        1.11.2
      </td>

      <td>
        * **IMPROVE**: Card flow expiration date experience
      </td>
    </tr>

    <tr>
      <td>
        1.11.1
      </td>

      <td>
        * **IMPROVE**: Card flow
      </td>
    </tr>

    <tr>
      <td>
        1.11.0
      </td>

      <td>
        * **NEW**: DeUna payment method
      </td>
    </tr>

    <tr>
      <td>
        1.10.1
      </td>

      <td>
        * **IMPROVE**: SDK and Card flow performance
      </td>
    </tr>

    <tr>
      <td>
        1.10.0
      </td>

      <td>
        * **NEW**: Pluxe payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **IMPROVE**: Google Pay flow
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **IMPROVE**: SDK performance and design
      </td>
    </tr>

    <tr>
      <td>
        1.8.0
      </td>

      <td>
        * **NEW**: Headless flow to get 3DS challenge URL
      </td>
    </tr>

    <tr>
      <td>
        1.7.0
      </td>

      <td>
        * **NEW**: Headless flow to generate a one-time token (OTT) and get 3DS challenge
      </td>
    </tr>

    <tr>
      <td>
        1.6.1
      </td>

      <td>
        * **FIX**: Antifraud blocking one-time token generation
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **IMPORTANT CHANGES**: Added `showPaymentStatus` argument to `startPaymentLite` and `startPayment` to control error screen display
      </td>
    </tr>

    <tr>
      <td>
        1.6.0
      </td>

      <td>
        * **NEW**: Mercado Pago antifraud
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **IMPROVE**: Click to pay flow
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **FIX**: Minor bugs
      </td>
    </tr>

    <tr>
      <td>
        1.5.14-HF
      </td>

      <td>
        * **NEW**: Function to create One Time Token with card info in Enrollment and Payment
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **FIX**: Crash with location permissions
      </td>
    </tr>

    <tr>
      <td>
        1.5.14
      </td>

      <td>
        * **IMPROVE**: Step-by-step and one-step card payments
      </td>
    </tr>

    <tr>
      <td>
        1.5.13
      </td>

      <td>
        * **NEW**: Mercado Pago Wallet enrollment via deeplink and custom tab
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: 3DS and Cybersource fraud engines
      </td>
    </tr>

    <tr>
      <td>
        1.5.12
      </td>

      <td>
        * **IMPROVE**: Card payments flow
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **IMPORTANT CHANGES**: Replaced **CardExpiryDate** **EditText** and **TextField** **ItemView** (CVV) with a single **CardDataStackView** component for SecureFields
      </td>
    </tr>

    <tr>
      <td>
        1.5.11
      </td>

      <td>
        * **FIX**: Discover card validation
      </td>
    </tr>

    <tr>
      <td>
        1.5.0
      </td>

      <td>
        * **NEW**: Antifraud for Cards flow
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Click 2 Pay payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Supported language methods
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: SDK Design
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **IMPROVE**: Card payments flow
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **IMPROVE**: Performance
      </td>
    </tr>

    <tr>
      <td>
        1.4.12
      </td>

      <td>
        * **IMPROVE**: Card payments flow
      </td>
    </tr>

    <tr>
      <td>
        1.4.11
      </td>

      <td>
        * **IMPROVE**: Card enrollment flow
      </td>
    </tr>

    <tr>
      <td>
        1.4.10
      </td>

      <td>
        * **IMPROVE**: Google Pay flow
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **FIX**: Restore SDK state after app kill
      </td>
    </tr>

    <tr>
      <td>
        1.4.9
      </td>

      <td>
        * **IMPROVE**: Google Pay flow
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **FIX**: CVV and expiry fields missing in step-by-step enrollment
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: VOUCHER card payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **IMPROVE**: Card step-by-step and Pix flow design
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: SAFETYPAY payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: EFECTY payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: NEQUI payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: YAPPY payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: GOOGLE PAY payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: SENCILLITO payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Installments for card payments
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **IMPROVE**: 3DS flow for cards
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **IMPROVE**: Card step-by-step design
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: `sessionId` generation for antifraud via `startCheckout()`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Option to persist loader
      </td>
    </tr>

    <tr>
      <td>
        1.4.8
      </td>

      <td>
        * **IMPROVE**: Google Pay flow
      </td>
    </tr>

    <tr>
      <td>
        1.4.7
      </td>

      <td>
        * **FIX**: CVV and expiry fields missing in step-by-step enrollment
      </td>
    </tr>

    <tr>
      <td>
        1.4.6
      </td>

      <td>
        * **NEW**: VOUCHER card payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **IMPROVE**: Google Pay flow
      </td>
    </tr>

    <tr>
      <td>
        1.4.5
      </td>

      <td>
        * **IMPROVE**: Card step-by-step and Pix flow design
      </td>
    </tr>

    <tr>
      <td>
        1.4.4
      </td>

      <td>
        * **IMPROVE**: 3DS flow for card payments
      </td>
    </tr>

    <tr>
      <td>
        1.4.3
      </td>

      <td>
        * **IMPROVE**: Card step-by-step field navigation
      </td>
    </tr>

    <tr>
      <td>
        1.4.2
      </td>

      <td>
        * **IMPROVE**: Card step-by-step flow design
      </td>
    </tr>

    <tr>
      <td>
        1.4.1
      </td>

      <td>
        * **NEW**: GOOGLE PAY payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: SENCILLITO payment method
      </td>
    </tr>

    <tr>
      <td>
        1.4.0
      </td>

      <td>
        * **NEW**: SAFETYPAY payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: EFECTY payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: NEQUI payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: YAPPY payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Installments for card payments
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: `sessionId` generation for antifraud via `startCheckout()`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Option to persist loader
      </td>
    </tr>

    <tr>
      <td>
        1.3.9
      </td>

      <td>
        * **FIX**: Card step-by-step flow
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Loading screen design
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Mercado Pago Checkout Pro no longer requires form
      </td>
    </tr>

    <tr>
      <td>
        1.3.8
      </td>

      <td>
        * **FIX**: Customer with null document
      </td>
    </tr>

    <tr>
      <td>
        1.3.7
      </td>

      <td>
        * **IMPROVE**: Card flows
      </td>
    </tr>

    <tr>
      <td>
        1.3.6
      </td>

      <td>
        * **IMPORTANT CHANGES**: Removed flag to require CVV on enrolled cards, now dynamic.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        `data class YunoConfig(`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        `  val cardFlow: CardFormType = CardFormType.ONE_STEP,`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        `  val saveCardEnabled: Boolean = false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        `)`
      </td>
    </tr>

    <tr>
      <td>
        1.3.5
      </td>

      <td>
        * **NEW**: CASH payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: BANK\_TRANSFER payment method
      </td>
    </tr>

    <tr>
      <td>
        1.3.4
      </td>

      <td>
        * **NEW**: UNLIMINT payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: PagSeguro payment method
      </td>
    </tr>

    <tr>
      <td>
        1.3.3
      </td>

      <td>
        * **FIX**: Card step-by-step form design
      </td>
    </tr>

    <tr>
      <td>
        1.3.2
      </td>

      <td>
        * **NEW**: Tarjeta Clave payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Kushki payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Khipu payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Request CVV for enrolled cards via SDK init flag
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: OTP screen timer for payment expiration
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: `EnrollmentMethodsListView()` to show enrollment-available methods
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **IMPORTANT CHANGES**: Added `requestSecurityCode` field to **YunoConfig** for requesting CVV in card flow:
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        `data class YunoConfig(`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        `  val cardFlow: CardFormType = CardFormType.ONE_STEP,`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        `  val saveCardEnabled: Boolean = false,`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        `  val requestSecurityCode: Boolean = false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        `)`
      </td>
    </tr>

    <tr>
      <td>
        1.3.1
      </td>

      <td>
        * **NEW**: Paga con Rappi payment method
      </td>
    </tr>

    <tr>
      <td>
        1.3.0
      </td>

      <td>
        * **NEW**: Arcus Cash payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Daviplata payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: CoDi payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: PayValida payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Enable/Disable "Save card" via **YunoConfig** in `initialize`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **IMPORTANT CHANGES**: **YunoConfig** data class for `initialize` customization
      </td>
    </tr>

    <tr>
      <td>
        1.2.5
      </td>

      <td>
        * **FIX**: Payment and Enrollment state on user cancel
      </td>
    </tr>

    <tr>
      <td>
        1.2.4
      </td>

      <td>
        * **NEW**: SPEI payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Step-by-step card Enrollment and Payment
      </td>
    </tr>

    <tr>
      <td>
        1.2.2
      </td>

      <td>
        * **NEW**: Initialize enrollment state callback in `startEnrollment`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Initialize payment state callback in `continuePayment`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Initialize one-time token callback in `startPayment`
      </td>
    </tr>

    <tr>
      <td>
        1.2.1
      </td>

      <td>
        * **FIX**: "Paga con tajeta" typo in Spanish
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **FIX**: Error message on document number field
      </td>
    </tr>

    <tr>
      <td>
        1.2.0
      </td>

      <td>
        * **IMPORTANT CHANGES**: Added callback in `startPayment` to avoid `onActivityResult`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **IMPORTANT CHANGES**: Added `initEnrollment` method to configure callback and avoid `onActivityResult`
      </td>
    </tr>

    <tr>
      <td>
        1.1.1
      </td>

      <td>
        * **FIX**: Hide environment tag for production keys
      </td>
    </tr>

    <tr>
      <td>
        1.1.0
      </td>

      <td>
        * **IMPORTANT CHANGES**: `startEnrollment` now requires country code (e.g., "CO")
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Credit card enrollment flow
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: New design for Credit Card form
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: `onSelected` event for **PaymentMethodListView**
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Title to separate enrolled/unEnrolled methods
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: `EnrollmentPaymentMethodListView()`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: `UnEnrolledPaymentMethodListView()`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Label for current environment
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **FIX**: Improved expiration date validation in Credit Card Form
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **REMOVE**: Deleted `testResult` options
      </td>
    </tr>

    <tr>
      <td>
        1.0.11
      </td>

      <td>
        * **FIX**: Improved UX on enrollment flow after external app interaction
      </td>
    </tr>

    <tr>
      <td>
        1.0.10
      </td>

      <td>
        * **FIX**: Avoid 404 after enrollment
      </td>
    </tr>

    <tr>
      <td>
        1.0.9
      </td>

      <td>
        * **FIX**: Avoid infinite loader on payment lite flow
      </td>
    </tr>

    <tr>
      <td>
        1.0.8
      </td>

      <td>
        * **NEW**: Removed Moshi dependency, using Gson
      </td>
    </tr>

    <tr>
      <td>
        1.0.7
      </td>

      <td>
        * **NEW**: Changed android hint type on attrs with reference
      </td>
    </tr>

    <tr>
      <td>
        1.0.6
      </td>

      <td>
        * **FIX**: Improved pay method item design (full version)
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **FIX**: Phone field visibility
      </td>
    </tr>

    <tr>
      <td>
        1.0.5
      </td>

      <td>
        * **NEW**: SafetyPay payment method
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: WebSocket for payment state notifications
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Removed user address from Addi form
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **FIX**: CustomerForm regex validators
      </td>
    </tr>

    <tr>
      <td>
        1.0.4
      </td>

      <td>
        * **NEW**: Transaction status changed to pending on start
      </td>
    </tr>

    <tr>
      <td>
        1.0.3
      </td>

      <td>
        * **NEW**: Internal error state callback
      </td>
    </tr>

    <tr>
      <td>
        1.0.2
      </td>

      <td>
        * **FIX**: Reset CVV regex on card number deletion in payment form
      </td>
    </tr>

    <tr>
      <td>
        1.0.1
      </td>

      <td>
        * **NEW**: Bank transfer/card payment type filter
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Payment view models testing features
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **FIX**: Payment type name for PIX and Nupay
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **CHANGE**: Set timezone to UTC in DateExtension
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **CHANGE**: Payment method type in payment mappers
      </td>
    </tr>

    <tr>
      <td>
        1.0.0
      </td>

      <td>
        * **NEW** Payment Methods
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Mercado Pago method enrollment
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Debit/credit card payments
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **NEW**: Mercado Pago Checkout Pro payments
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **FIX**: City text field hint and title
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **FIX**: Pix type in payments flow
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **FIX**: Card information on start checkout
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        * **FIX**: English translation in payment form title
      </td>
    </tr>
  </tbody>
</Table>