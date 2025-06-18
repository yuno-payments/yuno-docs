---
title: Android SDK release notes
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
The Android SDK release notes offer a comprehensive overview of the updates, improvements, and fixes introduced in each version of the Android SDK.

| Version   | Changes                                                                                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.20.2    | **FIX**: NuPay redirect issue                                                                                                                                   |
|           | **FIX**: CVV validation in enrollment                                                                                                                           |
|           | **NEW**: Callback `tokenWithInformation`                                                                                                                        |
| 1.17.0    | **IMPROVE**: Nubank flow                                                                                                                                        |
| 1.16.0    | **NEW**: 3DS FAC fraud engine                                                                                                                                   |
| 1.15.1    | **FIX**: Java version compatibility                                                                                                                             |
| 1.15.0    | **IMPROVE**: Cards and Nubank UI/UX                                                                                                                             |
|           | **IMPROVE**: Chile RUT validation                                                                                                                               |
| 1.14.0    | **IMPROVE**: Removed CNPJ from Nubank flow                                                                                                                      |
| 1.13.0    | **IMPROVE**: Card forms design and UX                                                                                                                           |
| 1.12.2    | **NEW**: 3DS Netcetera fraud engine                                                                                                                             |
| 1.12.1    | **IMPROVE**: MercadoPago SDK performance                                                                                                                        |
| 1.12.0    | **NEW**: PIX - SANTANDER payment method                                                                                                                         |
| 1.11.4    | **IMPROVE**: MercadoPago SDK performance                                                                                                                        |
| 1.11.3    | **FIX**: Style overrides                                                                                                                                        |
| 1.11.2    | **IMPROVE**: Card flow expiration date experience                                                                                                               |
| 1.11.1    | **IMPROVE**: Card flow                                                                                                                                          |
| 1.11.0    | **NEW**: DeUna payment method                                                                                                                                   |
| 1.10.1    | **IMPROVE**: SDK and Card flow performance                                                                                                                      |
| 1.10.0    | **NEW**: Pluxe payment method                                                                                                                                   |
|           | **IMPROVE**: Google Pay flow                                                                                                                                    |
|           | **IMPROVE**: SDK performance and design                                                                                                                         |
| 1.8.0     | **NEW**: Headless flow to get 3DS challenge URL                                                                                                                 |
| 1.7.0     | **NEW**: Headless flow to generate a one-time token (OTT) and get 3DS challenge                                                                                 |
| 1.6.1     | **FIX**: Antifraud blocking one-time token generation                                                                                                           |
|           | IMPORTANT CHANGES: Added `showPaymentStatus` argument to `startPaymentLite` and `startPayment` to control error screen display                                  |
| 1.6.0     | **NEW**: Mercado Pago antifraud                                                                                                                                 |
|           | **IMPROVE**: Click to pay flow                                                                                                                                  |
|           | **FIX**: Minor bugs                                                                                                                                             |
| 1.5.14-HF | **NEW**: Function to create One Time Token with card info in Enrollment and Payment                                                                             |
|           | **FIX**: Crash with location permissions                                                                                                                        |
| 1.5.14    | **IMPROVE**: Step-by-step and one-step card payments                                                                                                            |
| 1.5.13    | **NEW**: Mercado Pago Wallet enrollment via deeplink and custom tab                                                                                             |
|           | **NEW**: 3DS and Cybersource fraud engines                                                                                                                      |
| 1.5.12    | **IMPROVE**: Card payments flow                                                                                                                                 |
|           | Important Changes: Replaced **CardExpiryDate** **EditText** and **TextField** **ItemView** (CVV) with a single **CardDataStackView** component for SecureFields |
| 1.5.11    | **FIX**: Discover card validation                                                                                                                               |
| 1.5.0     | **NEW**: Antifraud for Cards flow                                                                                                                               |
|           | **NEW**: Click 2 Pay payment method                                                                                                                             |
|           | **NEW**: Supported language methods                                                                                                                             |
|           | **NEW**: SDK Design                                                                                                                                             |
|           | **IMPROVE**: Card payments flow                                                                                                                                 |
|           | **IMPROVE**: Performance                                                                                                                                        |
| 1.4.12    | **IMPROVE**: Card payments flow                                                                                                                                 |
| 1.4.11    | **IMPROVE**: Card enrollment flow                                                                                                                               |
| 1.4.10    | **IMPROVE**: Google Pay flow                                                                                                                                    |
|           | **FIX**: Restore SDK state after app kill                                                                                                                       |
| 1.4.9     | **IMPROVE**: Google Pay flow                                                                                                                                    |
|           | **FIX**: CVV and expiry fields missing in step-by-step enrollment                                                                                               |
|           | **NEW**: VOUCHER card payment method                                                                                                                            |
|           | **IMPROVE**: Card step-by-step and Pix flow design                                                                                                              |
|           | **NEW**: SAFETYPAY payment method                                                                                                                               |
|           | **NEW**: EFECTY payment method                                                                                                                                  |
|           | **NEW**: NEQUI payment method                                                                                                                                   |
|           | **NEW**: YAPPY payment method                                                                                                                                   |
|           | **NEW**: GOOGLE PAY payment method                                                                                                                              |
|           | **NEW**: SENCILLITO payment method                                                                                                                              |
|           | **NEW**: Installments for card payments                                                                                                                         |
|           | **IMPROVE**: 3DS flow for cards                                                                                                                                 |
|           | **IMPROVE**: Card step-by-step design                                                                                                                           |
|           | **NEW**: `sessionId` generation for antifraud via `startCheckout()`                                                                                             |
|           | **NEW**: Option to persist loader                                                                                                                               |
| 1.4.8     | **IMPROVE**: Google Pay flow                                                                                                                                    |
| 1.4.7     | **FIX**: CVV and expiry fields missing in step-by-step enrollment                                                                                               |
| 1.4.6     | **NEW**: VOUCHER card payment method                                                                                                                            |
|           | **IMPROVE**: Google Pay flow                                                                                                                                    |
| 1.4.5     | **IMPROVE**: Card step-by-step and Pix flow design                                                                                                              |
| 1.4.4     | **IMPROVE**: 3DS flow for card payments                                                                                                                         |
| 1.4.3     | **IMPROVE**: Card step-by-step field navigation                                                                                                                 |
| 1.4.2     | **IMPROVE**: Card step-by-step flow design                                                                                                                      |
| 1.4.1     | **NEW**: GOOGLE PAY payment method                                                                                                                              |
|           | **NEW**: SENCILLITO payment method                                                                                                                              |
| 1.4.0     | **NEW**: SAFETYPAY payment method                                                                                                                               |
|           | **NEW**: EFECTY payment method                                                                                                                                  |
|           | **NEW**: NEQUI payment method                                                                                                                                   |
|           | **NEW**: YAPPY payment method                                                                                                                                   |
|           | **NEW**: Installments for card payments                                                                                                                         |
|           | **NEW**: `sessionId` generation for antifraud via `startCheckout()`                                                                                             |
|           | **NEW**: Option to persist loader                                                                                                                               |
| 1.3.9     | **FIX**: Card step-by-step flow                                                                                                                                 |
|           | **NEW**: Loading screen design                                                                                                                                  |
|           | **NEW**: Mercado Pago Checkout Pro no longer requires form                                                                                                      |
| 1.3.8     | **FIX**: Customer with null document                                                                                                                            |
| 1.3.7     | **IMPROVE**: Card flows                                                                                                                                         |
| 1.3.6     | Important Changes: Removed flag to require CVV on enrolled cards, now dynamic.                                                                                  |
|           | `data class YunoConfig(`                                                                                                                                        |
|           | `  val cardFlow: CardFormType = CardFormType.ONE_STEP,`                                                                                                         |
|           | `  val saveCardEnabled: Boolean = false`                                                                                                                        |
|           | `)`                                                                                                                                                             |
| 1.3.5     | **NEW**: CASH payment method                                                                                                                                    |
|           | **NEW**: BANK\_TRANSFER payment method                                                                                                                          |
| 1.3.4     | **NEW**: UNLIMINT payment method                                                                                                                                |
|           | **NEW**: PagSeguro payment method                                                                                                                               |
| 1.3.3     | **FIX**: Card step-by-step form design                                                                                                                          |
| 1.3.2     | **NEW**: Tarjeta Clave payment method                                                                                                                           |
|           | **NEW**: Kushki payment method                                                                                                                                  |
|           | **NEW**: Khipu payment method                                                                                                                                   |
|           | **NEW**: Request CVV for enrolled cards via SDK init flag                                                                                                       |
|           | **NEW**: OTP screen timer for payment expiration                                                                                                                |
|           | **NEW**: `EnrollmentMethodsListView()` to show enrollment-available methods                                                                                     |
|           | Important Changes: Added `requestSecurityCode` field to **YunoConfig** for requesting CVV in card flow:                                                         |
|           | `data class YunoConfig(`                                                                                                                                        |
|           | `  val cardFlow: CardFormType = CardFormType.ONE_STEP,`                                                                                                         |
|           | `  val saveCardEnabled: Boolean = false,`                                                                                                                       |
|           | `  val requestSecurityCode: Boolean = false`                                                                                                                    |
|           | `)`                                                                                                                                                             |
| 1.3.1     | **NEW**: Paga con Rappi payment method                                                                                                                          |
| 1.3.0     | **NEW**: Arcus Cash payment method                                                                                                                              |
|           | **NEW**: Daviplata payment method                                                                                                                               |
|           | **NEW**: CoDi payment method                                                                                                                                    |
|           | **NEW**: PayValida payment method                                                                                                                               |
|           | **NEW**: Enable/Disable "Save card" via **YunoConfig** in `initialize`                                                                                          |
|           | Important Changes: **YunoConfig** data class for `initialize` customization                                                                                     |
| 1.2.5     | **FIX**: Payment and Enrollment state on user cancel                                                                                                            |
| 1.2.4     | **NEW**: SPEI payment method                                                                                                                                    |
|           | **NEW**: Step-by-step card Enrollment and Payment                                                                                                               |
| 1.2.2     | **NEW**: Initialize enrollment state callback in `startEnrollment`                                                                                              |
|           | **NEW**: Initialize payment state callback in `continuePayment`                                                                                                 |
|           | **NEW**: Initialize one-time token callback in `startPayment`                                                                                                   |
| 1.2.1     | **FIX**: "Paga con tajeta" typo in Spanish                                                                                                                      |
|           | **FIX**: Error message on document number field                                                                                                                 |
| 1.2.0     | Important Changes: Added callback in `startPayment` to avoid `onActivityResult`                                                                                 |
|           | Important Changes: Added `initEnrollment` method to configure callback and avoid `onActivityResult`                                                             |
| 1.1.1     | **FIX**: Hide environment tag for production keys                                                                                                               |
| 1.1.0     | Important Changes: `startEnrollment` now requires country code (e.g., "CO")                                                                                     |
|           | **NEW**: Credit card enrollment flow                                                                                                                            |
|           | **NEW**: New design for Credit Card form                                                                                                                        |
|           | **NEW**: `onSelected` event for **PaymentMethodListView**                                                                                                       |
|           | **NEW**: Title to separate enrolled/unEnrolled methods                                                                                                          |
|           | **NEW**: `EnrollmentPaymentMethodListView()`                                                                                                                    |
|           | **NEW**: `UnEnrolledPaymentMethodListView()`                                                                                                                    |
|           | **NEW**: Label for current environment                                                                                                                          |
|           | **FIX**: Improved expiration date validation in Credit Card Form                                                                                                |
|           | **REMOVE**: Deleted `testResult` options                                                                                                                        |
| 1.0.11    | **FIX**: Improved UX on enrollment flow after external app interaction                                                                                          |
| 1.0.10    | **FIX**: Avoid 404 after enrollment                                                                                                                             |
| 1.0.9     | **FIX**: Avoid infinite loader on payment lite flow                                                                                                             |
| 1.0.8     | **NEW**: Removed Moshi dependency, using Gson                                                                                                                   |
| 1.0.7     | **NEW**: Changed android hint type on attrs with reference                                                                                                      |
| 1.0.6     | **FIX**: Improved pay method item design (full version)                                                                                                         |
|           | **FIX**: Phone field visibility                                                                                                                                 |
| 1.0.5     | **NEW**: SafetyPay payment method                                                                                                                               |
|           | **NEW**: WebSocket for payment state notifications                                                                                                              |
|           | **NEW**: Removed user address from Addi form                                                                                                                    |
|           | **FIX**: CustomerForm regex validators                                                                                                                          |
| 1.0.4     | **NEW**: Transaction status changed to pending on start                                                                                                         |
| 1.0.3     | **NEW**: Internal error state callback                                                                                                                          |
| 1.0.2     | **FIX**: Reset CVV regex on card number deletion in payment form                                                                                                |
| 1.0.1     | **NEW**: Bank transfer/card payment type filter                                                                                                                 |
|           | **NEW**: Payment view models testing features                                                                                                                   |
|           | **FIX**: Payment type name for PIX and Nupay                                                                                                                    |
|           | **CHANGE**: Set timezone to UTC in DateExtension                                                                                                                |
|           | **CHANGE**: Payment method type in payment mappers                                                                                                              |
| 1.0.0     | **NEW** Payment Methods                                                                                                                                         |
|           | **NEW**: Mercado Pago method enrollment                                                                                                                         |
|           | **NEW**: Debit/credit card payments                                                                                                                             |
|           | **NEW**: Mercado Pago Checkout Pro payments                                                                                                                     |
|           | **FIX**: City text field hint and title                                                                                                                         |
|           | **FIX**: Pix type in payments flow                                                                                                                              |
|           | **FIX**: Card information on start checkout                                                                                                                     |
|           | **FIX**: English translation in payment form title                                                                                                              |