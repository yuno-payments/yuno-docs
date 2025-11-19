---
title: Card Scanning (OCR)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Card Scanning (OCR)
  description: >-
    Enable users to quickly complete card forms by scanning credit or debit
    cards with their device's camera using Google Pay's OCR solution.
  robots: index
next:
  description: ''
---
This feature allows your users to quickly and accurately complete credit or debit card forms by scanning the card with their device's camera. This functionality leverages **Google Pay's official OCR** (Optical Character Recognition) solution.

## Security & privacy

The card data is processed directly by **Google Pay's OCR**. Neither Yuno nor Google retains or stores the scanned card details.

## Card details detected

The OCR scanner detects the following card details via the device camera:

* **Card Number**
* **Expiration Date** (Month and Year)

## Prerequisites for merchants

To enable and use the Card Scanning feature, your Android application must meet the following requirements:

1. **SDK Version:** Your application must be using Yuno Android SDK version 2.8.0 or higher.
2. **Camera Permissions:** Your application must request and obtain the necessary camera permissions from the user at runtime, in accordance with standard Android development practices.
3. **Google Pay Availability:** The feature requires your application to have access to the Google Pay Services on the user's device.

## How to activate

To enable the card scanning feature, you must activate it in the Checkout Builder from your Yuno Dashboard:

1. In the [Yuno Dashboard](https://dashboard.y.uno/), navigate to the **Checkout Builder** section.
2. Locate the **Card** payment method and click the three dots icon next to it.
3. Enable the card scanning feature in the payment method settings.
4. Click **Publish settings** to apply the changes.

> 📘 Learn more about Checkout Builder
>
> Visit the [Checkout Builder](doc:checkout-builder) page for additional information.

<br />
