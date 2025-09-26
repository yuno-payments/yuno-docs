---
title: Click to Pay Integration
deprecated: false
hidden: true
metadata:
  robots: index
---
Click to Pay (C2P) in Yuno offers **three distinct payment flows** that provide merchants with flexible options for implementing secure, frictionless payments. These flows build upon the standard [Click to Pay integration](doc:click-to-pay) to offer enhanced user experiences with biometric authentication and flexible processing options.

**Click to Pay** is based on the EMVCo secure payment standard and enables secure payments with reduced friction through saved payment methods and biometric authentication.

### Available C2P Flows

Yuno provides three C2P implementation options:

* **Standard C2P**: Traditional flow with email/OTP authentication
* **C2P with Passkey**: Enhanced security using biometric authentication (Mastercard only)
* **Golden C2P**: Flexible flow allowing users to opt in/out of C2P processing

Each flow is designed for different merchant needs and user preferences, providing varying levels of security, convenience, and user control.

> 📘 Prerequisites
>
> Before implementing these flows, ensure you have completed the basic [Click to Pay setup](../Wallets/click-to-pay) in your Yuno dashboard.

## Standard C2P

### User without previous authorization

1. The SDK displays an email address form
2. User enters an OTP, which is sent to their email or phone
3. Once the OTP is validated, the list of saved user cards is presented
4. The user selects an existing card or adds a new one
5. A modal opens with the C2P experience, where the user authorizes the use of the card

### User authenticated in the browser

1. The email form is not displayed
2. User goes directly to the card list
3. The user can select an existing card or add a new card
4. Finally, the C2P modal opens to authorize the use of the card

## C2P with Passkey

> 🚧 Conditions to activate C2P with Passkey
>
> * The card must be Mastercard
> * The C2P flags must be active
> * The provider that processes the card must have 3DS properly configured in the connection

Activated after the user selects or adds a new card and only if the necessary conditions are met.

### New Card

If the user added a new card, a pop-up will open:

1. A challenge is shown to validate the action
2. Biometric key (passkey) is requested

### Existing card without passkey

If the user selects an already registered card but does not have a passkey, a pop-up will open:

1. A challenge validates the user
2. Passkey is requested for the card

### Existing card with passkey created

If the card already has a passkey configured, a pop-up will open:

1. The user must authorize the use of the card through biometric validation

## Golden C2P

The Golden C2P flow differs from others because the user has the flexibility to decide if they want to use their card with C2P or process it as a normal card, without C2P.

### New user (no account)

1. Displays a form to enter the card data, including a checkbox:

* Checking the box will process the transaction via C2P
* Not checking the box will forego C2P processing

### Existing user (with account)

1. Displays a screen to enter the email
2. This screen includes a radio button that allows the user to choose not to continue with C2P
3. If they choose not to use C2P, the flow diverts to the normal card screen

### During OTP validation

Even if the user reaches the OTP screen, they still have the option to abandon C2P and continue with the normal flow.

### Adding a new card

When the user adds a new card, by default it is not added to C2P:

* The user must explicitly check the checkbox to associate that card with C2P
* If they do not check the checkbox, the payment is processed as a normal card, without C2P
