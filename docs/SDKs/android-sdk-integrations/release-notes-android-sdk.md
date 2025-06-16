---
title: Android release notes
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

\| Version   | Changes |
\|-----------|---------|
\| 1.20.2    | \*\*FIX\*\*: NuPay redirect issue\<br>\*\*FIX\*\*: CVV validation in enrollment\<br>\*\*NEW\*\*: Callback \`tokenWithInformation\` |
\| 1.17.0    | \*\*IMPROVE\*\*: Nubank flow |
\| 1.16.0    | \*\*NEW\*\*: 3DS FAC fraud engine |
\| 1.15.1    | \*\*FIX\*\*: Java version compatibility |
\| 1.15.0    | \*\*IMPROVE\*\*: Cards and Nubank UI/UX\<br>\*\*IMPROVE\*\*: Chile RUT validation |
\| 1.14.0    | \*\*IMPROVE\*\*: Removed CNPJ from Nubank flow |
\| 1.13.0    | \*\*IMPROVE\*\*: Card forms design and UX |
\| 1.12.2    | \*\*NEW\*\*: 3DS Netcetera fraud engine |
\| 1.12.1    | \*\*IMPROVE\*\*: MercadoPago SDK performance |
\| 1.12.0    | \*\*NEW\*\*: PIX - SANTANDER payment method |
\| 1.11.4    | \*\*IMPROVE\*\*: MercadoPago SDK performance |
\| 1.11.3    | \*\*FIX\*\*: Style overrides |
\| 1.11.2    | \*\*IMPROVE\*\*: Card flow expiration date experience |
\| 1.11.1    | \*\*IMPROVE\*\*: Card flow |
\| 1.11.0    | \*\*NEW\*\*: DeUna payment method |
\| 1.10.1    | \*\*IMPROVE\*\*: SDK and Card flow performance |
\| 1.10.0    | \*\*NEW\*\*: Pluxe payment method\<br>\*\*IMPROVE\*\*: Google Pay flow\<br>\*\*IMPROVE\*\*: SDK performance and design |
\| 1.8.0     | \*\*NEW\*\*: Headless flow to get 3DS challenge URL |
\| 1.7.0     | \*\*NEW\*\*: Headless flow to generate a one-time token (OTT) and get 3DS challenge |
\| 1.6.1     | \*\*FIX\*\*: Antifraud blocking one-time token generation\<br>IMPORTANT CHANGES: Added \`showPaymentStatus\` argument to \`startPaymentLite\` and \`startPayment\` to control error screen display |
\| 1.6.0     | \*\*NEW\*\*: Mercado Pago antifraud\<br>\*\*IMPROVE\*\*: Click to pay flow\<br>\*\*FIX\*\*: Minor bugs |
\| 1.5.14-HF | \*\*NEW\*\*: Function to create One Time Token with card info in Enrollment and Payment\<br>\*\*FIX\*\*: Crash with location permissions |
\| 1.5.14    | \*\*IMPROVE\*\*: Step-by-step and one-step card payments |
\| 1.5.13    | \*\*NEW\*\*: Mercado Pago Wallet enrollment via deeplink and custom tab\<br>\*\*NEW\*\*: 3DS and Cybersource fraud engines |
\| 1.5.12    | \*\*IMPROVE\*\*: Card payments flow\<br>Important Changes: Replaced \*\*CardExpiryDate\*\* \*\*EditText\*\* and \*\*TextField\*\* \*\*ItemView\*\* (CVV) with a single \*\*CardDataStackView\*\* component for SecureFields |
\| 1.5.11    | \*\*FIX\*\*: Discover card validation |
\| 1.5.0     | \*\*NEW\*\*: Antifraud for Cards flow\<br>\*\*NEW\*\*: Click 2 Pay payment method\<br>\*\*NEW\*\*: Supported language methods\<br>\*\*NEW\*\*: SDK Design\<br>\*\*IMPROVE\*\*: Card payments flow\<br>\*\*IMPROVE\*\*: Performance |
\| 1.4.12    | \*\*IMPROVE\*\*: Card payments flow |
\| 1.4.11    | \*\*IMPROVE\*\*: Card enrollment flow |
\| 1.4.10    | \*\*IMPROVE\*\*: Google Pay flow\<br>\*\*FIX\*\*: Restore SDK state after app kill |
\| 1.4.9     | \*\*IMPROVE\*\*: Google Pay flow\<br>\*\*FIX\*\*: CVV and expiry fields missing in step-by-step enrollment\<br>\*\*NEW\*\*: VOUCHER card payment method\<br>\*\*IMPROVE\*\*: Card step-by-step and Pix flow design\<br>\*\*NEW\*\*: SAFETYPAY payment method\<br>\*\*NEW\*\*: EFECTY payment method\<br>\*\*NEW\*\*: NEQUI payment method\<br>\*\*NEW\*\*: YAPPY payment method\<br>\*\*NEW\*\*: GOOGLE PAY payment method\<br>\*\*NEW\*\*: SENCILLITO payment method\<br>\*\*NEW\*\*: Installments for card payments\<br>\*\*IMPROVE\*\*: 3DS flow for cards\<br>\*\*IMPROVE\*\*: Card step-by-step design\<br>\*\*NEW\*\*: \`sessionId\` generation for antifraud via \`startCheckout()\`\<br>\*\*NEW\*\*: Option to persist loader |
\| 1.4.8     | \*\*IMPROVE\*\*: Google Pay flow |
\| 1.4.7     | \*\*FIX\*\*: CVV and expiry fields missing in step-by-step enrollment |
\| 1.4.6     | \*\*NEW\*\*: VOUCHER card payment method\<br>\*\*IMPROVE\*\*: Google Pay flow |
\| 1.4.5     | \*\*IMPROVE\*\*: Card step-by-step and Pix flow design |
\| 1.4.4     | \*\*IMPROVE\*\*: 3DS flow for card payments |
\| 1.4.3     | \*\*IMPROVE\*\*: Card step-by-step field navigation |
\| 1.4.2     | \*\*IMPROVE\*\*: Card step-by-step flow design |
\| 1.4.1     | \*\*NEW\*\*: GOOGLE PAY payment method\<br>\*\*NEW\*\*: SENCILLITO payment method |
\| 1.4.0     | \*\*NEW\*\*: SAFETYPAY payment method\<br>\*\*NEW\*\*: EFECTY payment method\<br>\*\*NEW\*\*: NEQUI payment method\<br>\*\*NEW\*\*: YAPPY payment method\<br>\*\*NEW\*\*: Installments for card payments\<br>\*\*NEW\*\*: \`sessionId\` generation for antifraud via \`startCheckout()\`\<br>\*\*NEW\*\*: Option to persist loader |
\| 1.3.9     | \*\*FIX\*\*: Card step-by-step flow\<br>\*\*NEW\*\*: Loading screen design\<br>\*\*NEW\*\*: Mercado Pago Checkout Pro no longer requires form |
\| 1.3.8     | \*\*FIX\*\*: Customer with null document |
\| 1.3.7     | \*\*IMPROVE\*\*: Card flows |
\| 1.3.6     | Important Changes: Removed flag to require CVV on enrolled cards, now dynamic.\<br>\`data class YunoConfig(\` \<br>\`  val cardFlow: CardFormType = CardFormType.ONE\_STEP,\`\<br>\`  val saveCardEnabled: Boolean = false\`\<br>\`)\` |
\| 1.3.5     | \*\*NEW\*\*: CASH payment method\<br>\*\*NEW\*\*: BANK\_TRANSFER payment method |
\| 1.3.4     | \*\*NEW\*\*: UNLIMINT payment method\<br>\*\*NEW\*\*: PagSeguro payment method |
\| 1.3.3     | \*\*FIX\*\*: Card step-by-step form design |
\| 1.3.2     | \*\*NEW\*\*: Tarjeta Clave payment method\<br>\*\*NEW\*\*: Kushki payment method\<br>\*\*NEW\*\*: Khipu payment method\<br>\*\*NEW\*\*: Request CVV for enrolled cards via SDK init flag\<br>\*\*NEW\*\*: OTP screen timer for payment expiration\<br>\*\*NEW\*\*: \`EnrollmentMethodsListView()\` to show enrollment-available methods\<br>Important Changes: Added \`requestSecurityCode\` field to \*\*YunoConfig\*\* for requesting CVV in card flow:\<br>\`data class YunoConfig(\` \<br>\`  val cardFlow: CardFormType = CardFormType.ONE\_STEP,\`\<br>\`  val saveCardEnabled: Boolean = false,\`\<br>\`  val requestSecurityCode: Boolean = false\`\<br>\`)\` |
\| 1.3.1     | \*\*NEW\*\*: Paga con Rappi payment method |
\| 1.3.0     | \*\*NEW\*\*: Arcus Cash payment method\<br>\*\*NEW\*\*: Daviplata payment method\<br>\*\*NEW\*\*: CoDi payment method\<br>\*\*NEW\*\*: PayValida payment method\<br>\*\*NEW\*\*: Enable/Disable "Save card" via \*\*YunoConfig\*\* in \`initialize\`\<br>Important Changes: \*\*YunoConfig\*\* data class for \`initialize\` customization |
\| 1.2.5     | \*\*FIX\*\*: Payment and Enrollment state on user cancel |
\| 1.2.4     | \*\*NEW\*\*: SPEI payment method\<br>\*\*NEW\*\*: Step-by-step card Enrollment and Payment |
\| 1.2.2     | \*\*NEW\*\*: Initialize enrollment state callback in \`startEnrollment\`\<br>\*\*NEW\*\*: Initialize payment state callback in \`continuePayment\`\<br>\*\*NEW\*\*: Initialize one-time token callback in \`startPayment\` |
\| 1.2.1     | \*\*FIX\*\*: "Paga con tajeta" typo in Spanish\<br>\*\*FIX\*\*: Error message on document number field |
\| 1.2.0     | Important Changes: Added callback in \`startPayment\` to avoid \`onActivityResult\`\<br>Important Changes: Added \`initEnrollment\` method to configure callback and avoid \`onActivityResult\` |
\| 1.1.1     | \*\*FIX\*\*: Hide environment tag for production keys |
\| 1.1.0     | Important Changes: \`startEnrollment\` now requires country code (e.g., "CO")\<br>\*\*NEW\*\*: Credit card enrollment flow\<br>\*\*NEW\*\*: New design for Credit Card form\<br>\*\*NEW\*\*: \`onSelected\` event for \*\*PaymentMethodListView\*\*\<br>\*\*NEW\*\*: Title to separate enrolled/unEnrolled methods\<br>\*\*NEW\*\*: \`EnrollmentPaymentMethodListView()\`\<br>\*\*NEW\*\*: \`UnEnrolledPaymentMethodListView()\`\<br>\*\*NEW\*\*: Label for current environment\<br>\*\*FIX\*\*: Improved expiration date validation in Credit Card Form\<br>\*\*REMOVE\*\*: Deleted \`testResult\` options |
\| 1.0.11    | \*\*FIX\*\*: Improved UX on enrollment flow after external app interaction |
\| 1.0.10    | \*\*FIX\*\*: Avoid 404 after enrollment |
\| 1.0.9     | \*\*FIX\*\*: Avoid infinite loader on payment lite flow |
\| 1.0.8     | \*\*NEW\*\*: Removed Moshi dependency, using Gson |
\| 1.0.7     | \*\*NEW\*\*: Changed android hint type on attrs with reference |
\| 1.0.6     | \*\*FIX\*\*: Improved pay method item design (full version)\<br>\*\*FIX\*\*: Phone field visibility |
\| 1.0.5     | \*\*NEW\*\*: SafetyPay payment method\<br>\*\*NEW\*\*: WebSocket for payment state notifications\<br>\*\*NEW\*\*: Removed user address from Addi form\<br>\*\*FIX\*\*: CustomerForm regex validators |
\| 1.0.4     | \*\*NEW\*\*: Transaction status changed to pending on start |
\| 1.0.3     | \*\*NEW\*\*: Internal error state callback |
\| 1.0.2     | \*\*FIX\*\*: Reset CVV regex on card number deletion in payment form |
\| 1.0.1     | \*\*NEW\*\*: Bank transfer/card payment type filter\<br>\*\*NEW\*\*: Payment view models testing features\<br>\*\*FIX\*\*: Payment type name for PIX and Nupay\<br>\*\*CHANGE\*\*: Set timezone to UTC in DateExtension\<br>\*\*CHANGE\*\*: Payment method type in payment mappers |
\| 1.0.0     | \*\*NEW\*\* Payment Methods\<br>\*\*NEW\*\*: Mercado Pago method enrollment\<br>\*\*NEW\*\*: Debit/credit card payments\<br>\*\*NEW\*\*: Mercado Pago Checkout Pro payments\<br>\*\*FIX\*\*: City text field hint and title\<br>\*\*FIX\*\*: Pix type in payments flow\<br>\*\*FIX\*\*: Card information on start checkout\<br>\*\*FIX\*\*: English translation in payment form title |
&#x20;&#x20;

\<table>
&#x20; \<thead>
&#x20;   \<tr>
&#x20;     \<th>Version\</th>
&#x20;     \<th>Changes\</th>
&#x20;   \</tr>
&#x20; \</thead>

&#x20; \<tbody>
&#x20;   \<tr>
&#x20;     \<td>1.20.2\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: NuPay redirect issue\<br />- \*\*FIX\*\*: CVV validation in enrollment\<br />- \*\*NEW\*\*: Callback \`tokenWithInformation\`
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.17.0\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Nubank flow
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.16.0\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: 3DS FAC fraud engine
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.15.1\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: Java version compatibility
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.15.0\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Cards and Nubank UI/UX\<br />- \*\*IMPROVE\*\*: Chile RUT validation
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.14.0\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Removed CNPJ from Nubank flow
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.13.0\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Card forms design and UX
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.12.2\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: 3DS Netcetera fraud engine
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.12.1\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: MercadoPago SDK performance
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.12.0\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: PIX - SANTANDER payment method
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.11.4\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: MercadoPago SDK performance
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.11.3\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: Style overrides
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.11.2\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Card flow expiration date experience
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.11.1\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Card flow
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.11.0\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: DeUna payment method
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.10.1\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: SDK and Card flow performance
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.10.0\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: Pluxe payment method\<br />- \*\*IMPROVE\*\*: Google Pay flow\<br />- \*\*IMPROVE\*\*: SDK performance and design
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.8.0\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: Headless flow to get 3DS challenge URL
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.7.0\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: Headless flow to generate a one-time token (OTT) and get 3DS challenge
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.6.1\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: Antifraud blocking one-time token generation\<br />- IMPORTANT CHANGES: Added \`showPaymentStatus\` argument to \`startPaymentLite\` and \`startPayment\` to control error screen display
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.6.0\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: Mercado Pago antifraud\<br />- \*\*IMPROVE\*\*: Click to pay flow\<br />- \*\*FIX\*\*: Minor bugs
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.5.14-HF\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: Function to create One Time Token with card info in Enrollment and Payment\<br />- \*\*FIX\*\*: Crash with location permissions
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.5.14\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Step-by-step and one-step card payments
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.5.13\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: Mercado Pago Wallet enrollment via deeplink and custom tab\<br />- \*\*NEW\*\*: 3DS and Cybersource fraud engines
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.5.12\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Card payments flow\<br />- Important Changes: Replaced \*\*CardExpiryDate\*\* \*\*EditText\*\* and \*\*TextField\*\* \*\*ItemView\*\* (CVV) with a single \*\*CardDataStackView\*\* component for SecureFields
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.5.11\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: Discover card validation
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.5.0\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: Antifraud for Cards flow\<br />- \*\*NEW\*\*: Click 2 Pay payment method\<br />- \*\*NEW\*\*: Supported language methods\<br />- \*\*NEW\*\*: SDK Design\<br />- \*\*IMPROVE\*\*: Card payments flow\<br />- \*\*IMPROVE\*\*: Performance
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.4.12\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Card payments flow
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.4.11\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Card enrollment flow
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.4.10\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Google Pay flow\<br />- \*\*FIX\*\*: Restore SDK state after app kill
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.4.9\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Google Pay flow\<br />- \*\*FIX\*\*: CVV and expiry fields missing in step-by-step enrollment\<br />- \*\*NEW\*\*: VOUCHER card payment method\<br />- \*\*IMPROVE\*\*: Card step-by-step and Pix flow design\<br />- \*\*NEW\*\*: SAFETYPAY payment method\<br />- \*\*NEW\*\*: EFECTY payment method\<br />- \*\*NEW\*\*: NEQUI payment method\<br />- \*\*NEW\*\*: YAPPY payment method\<br />- \*\*NEW\*\*: GOOGLE PAY payment method\<br />- \*\*NEW\*\*: SENCILLITO payment method\<br />- \*\*NEW\*\*: Installments for card payments\<br />- \*\*IMPROVE\*\*: 3DS flow for cards\<br />- \*\*IMPROVE\*\*: Card step-by-step design\<br />- \*\*NEW\*\*: \`sessionId\` generation for antifraud via \`startCheckout()\`\<br />- \*\*NEW\*\*: Option to persist loader
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.4.8\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Google Pay flow
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.4.7\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: CVV and expiry fields missing in step-by-step enrollment
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.4.6\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: VOUCHER card payment method\<br />- \*\*IMPROVE\*\*: Google Pay flow
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.4.5\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Card step-by-step and Pix flow design
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.4.4\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: 3DS flow for card payments
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.4.3\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Card step-by-step field navigation
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.4.2\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Card step-by-step flow design
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.4.1\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: GOOGLE PAY payment method\<br />- \*\*NEW\*\*: SENCILLITO payment method
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.4.0\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: SAFETYPAY payment method\<br />- \*\*NEW\*\*: EFECTY payment method\<br />- \*\*NEW\*\*: NEQUI payment method\<br />- \*\*NEW\*\*: YAPPY payment method\<br />- \*\*NEW\*\*: Installments for card payments\<br />- \*\*NEW\*\*: \`sessionId\` generation for antifraud via \`startCheckout()\`\<br />- \*\*NEW\*\*: Option to persist loader
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.3.9\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: Card step-by-step flow\<br />- \*\*NEW\*\*: Loading screen design\<br />- \*\*NEW\*\*: Mercado Pago Checkout Pro no longer requires form
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.3.8\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: Customer with null document
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.3.7\</td>

&#x20;     \<td>
&#x20;       \* \*\*IMPROVE\*\*: Card flows
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.3.6\</td>

&#x20;     \<td>
&#x20;       \* Important Changes: Removed flag to require CVV on enrolled cards, now dynamic.\<br />\`data class YunoConfig(\` \<br />\`  val cardFlow: CardFormType = CardFormType.ONE\_STEP,\`\<br />\`  val saveCardEnabled: Boolean = false\`\<br />\`)\`
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.3.5\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: CASH payment method\<br />- \*\*NEW\*\*: BANK\\\_TRANSFER payment method
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.3.4\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: UNLIMINT payment method\<br />- \*\*NEW\*\*: PagSeguro payment method
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.3.3\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: Card step-by-step form design
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.3.2\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: Tarjeta Clave payment method\<br />- \*\*NEW\*\*: Kushki payment method\<br />- \*\*NEW\*\*: Khipu payment method\<br />- \*\*NEW\*\*: Request CVV for enrolled cards via SDK init flag\<br />- \*\*NEW\*\*: OTP screen timer for payment expiration\<br />- \*\*NEW\*\*: \`EnrollmentMethodsListView()\` to show enrollment-available methods\<br />- Important Changes: Added \`requestSecurityCode\` field to \*\*YunoConfig\*\* for requesting CVV in card flow:\<br />\`data class YunoConfig(\` \<br />\`  val cardFlow: CardFormType = CardFormType.ONE\_STEP,\`\<br />\`  val saveCardEnabled: Boolean = false,\`\<br />\`  val requestSecurityCode: Boolean = false\`\<br />\`)\`
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.3.1\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: Paga con Rappi payment method
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.3.0\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: Arcus Cash payment method\<br />- \*\*NEW\*\*: Daviplata payment method\<br />- \*\*NEW\*\*: CoDi payment method\<br />- \*\*NEW\*\*: PayValida payment method\<br />- \*\*NEW\*\*: Enable/Disable "Save card" via \*\*YunoConfig\*\* in \`initialize\`\<br />- Important Changes: \*\*YunoConfig\*\* data class for \`initialize\` customization
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.2.5\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: Payment and Enrollment state on user cancel
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.2.4\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: SPEI payment method\<br />- \*\*NEW\*\*: Step-by-step card Enrollment and Payment
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.2.2\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: Initialize enrollment state callback in \`startEnrollment\`\<br />- \*\*NEW\*\*: Initialize payment state callback in \`continuePayment\`\<br />- \*\*NEW\*\*: Initialize one-time token callback in \`startPayment\`
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.2.1\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: "Paga con tajeta" typo in Spanish\<br />- \*\*FIX\*\*: Error message on document number field
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.2.0\</td>

&#x20;     \<td>
&#x20;       \* Important Changes: Added callback in \`startPayment\` to avoid \`onActivityResult\`\<br />- Important Changes: Added \`initEnrollment\` method to configure callback and avoid \`onActivityResult\`
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.1.1\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: Hide environment tag for production keys
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.1.0\</td>

&#x20;     \<td>
&#x20;       \* Important Changes: \`startEnrollment\` now requires country code (e.g., "CO")\<br />- \*\*NEW\*\*: Credit card enrollment flow\<br />- \*\*NEW\*\*: New design for Credit Card form\<br />- \*\*NEW\*\*: \`onSelected\` event for \*\*PaymentMethodListView\*\*\<br />- \*\*NEW\*\*: Title to separate enrolled/unEnrolled methods\<br />- \*\*NEW\*\*: \`EnrollmentPaymentMethodListView()\`\<br />- \*\*NEW\*\*: \`UnEnrolledPaymentMethodListView()\`\<br />- \*\*NEW\*\*: Label for current environment\<br />- \*\*FIX\*\*: Improved expiration date validation in Credit Card Form\<br />- \*\*REMOVE\*\*: Deleted \`testResult\` options
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.0.11\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: Improved UX on enrollment flow after external app interaction
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.0.10\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: Avoid 404 after enrollment
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.0.9\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: Avoid infinite loader on payment lite flow
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.0.8\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: Removed Moshi dependency, using Gson
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.0.7\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: Changed android hint type on attrs with reference
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.0.6\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: Improved pay method item design (full version)\<br />- \*\*FIX\*\*: Phone field visibility
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.0.5\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: SafetyPay payment method\<br />- \*\*NEW\*\*: WebSocket for payment state notifications\<br />- \*\*NEW\*\*: Removed user address from Addi form\<br />- \*\*FIX\*\*: CustomerForm regex validators
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.0.4\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: Transaction status changed to pending on start
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.0.3\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: Internal error state callback
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.0.2\</td>

&#x20;     \<td>
&#x20;       \* \*\*FIX\*\*: Reset CVV regex on card number deletion in payment form
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.0.1\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\*: Bank transfer/card payment type filter\<br />- \*\*NEW\*\*: Payment view models testing features\<br />- \*\*FIX\*\*: Payment type name for PIX and Nupay\<br />- \*\*CHANGE\*\*: Set timezone to UTC in DateExtension\<br />- \*\*CHANGE\*\*: Payment method type in payment mappers
&#x20;     \</td>
&#x20;   \</tr>

&#x20;   \<tr>
&#x20;     \<td>1.0.0\</td>

&#x20;     \<td>
&#x20;       \* \*\*NEW\*\* Payment Methods\<br />- \*\*NEW\*\*: Mercado Pago method enrollment\<br />- \*\*NEW\*\*: Debit/credit card payments\<br />- \*\*NEW\*\*: Mercado Pago Checkout Pro payments\<br />- \*\*FIX\*\*: City text field hint and title\<br />- \*\*FIX\*\*: Pix type in payments flow\<br />- \*\*FIX\*\*: Card information on start checkout\<br />- \*\*FIX\*\*: English translation in payment form title
&#x20;     \</td>
&#x20;   \</tr>
&#x20; \</tbody>
\</table>