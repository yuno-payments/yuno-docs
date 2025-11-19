---
title: Card Scanning (OCR)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Card Scanning (OCR)
  description: >-
    Enable users to quickly complete card forms by scanning credit or debit cards
    with their device's camera using Google Pay's OCR solution.
  robots: index
next:
  description: ''
---
This feature allows your users to quickly and accurately complete credit or debit card forms by scanning the card with their device's camera. This functionality leverages **Google Pay's official OCR** (Optical Character Recognition) solution.

## Security & Privacy

The card data is processed directly by **Google Pay's OCR**. **Neither Yuno nor Google retains or stores** the scanned card details.

## Card Details Detected

The OCR scanner detects the following card details via the device camera:

* **Card Number**
* **Expiration Date** (Month and Year)

## Prerequisites for Merchants

To enable and use the Card Scanning feature, your Android application must meet the following requirements:

1. **SDK Version:** Your application must be using **Yuno Android SDK version 2.8.0** or higher.
2. **Camera Permissions:** Your application must have the necessary **camera permissions** requested and granted by the user at runtime, as per standard Android development practices.
3. **Google Pay Availability:** The feature requires your application to have **access to the Google Pay Services** on the user's device.

