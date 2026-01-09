---
title: SDKs Quickstart Guide
deprecated: false
hidden: true
metadata:
  robots: index
---
Choose your platform to get started with Yuno. Each guide includes installation, basic setup, and your first payment in minutes.

## Platform Guides

### [Web SDK](./web-sdk/)

Build payment experiences for web applications using JavaScript/TypeScript.

**Best for:** E-commerce websites, web apps, SPA applications

**Key features:**
- NPM package or CDN integration
- TypeScript support built-in
- Secure Fields for PCI compliance
- Custom UI with Headless mode

[Get started with Web SDK →](./web-sdk/)

---

### [iOS SDK](./ios-sdk/)

Native iOS SDK for iPhone and iPad applications.

**Best for:** Native iOS apps, Swift/SwiftUI projects

**Key features:**
- SwiftUI and UIKit support
- Swift 6 concurrency ready
- iOS 14.0+
- CocoaPods and SPM support

[Get started with iOS SDK →](./ios-sdk/)

---

### [Android SDK](./android-sdk/)

Native Android SDK for Android applications.

**Best for:** Native Android apps, Kotlin projects

**Key features:**
- Jetpack Compose support
- Kotlin-first design
- Android 5.0 (API 21)+
- Card scanning (OCR)

[Get started with Android SDK →](./android-sdk/)

---

### [React Native SDK](./react-native-sdk-1/)

Cross-platform SDK for React Native applications.

**Best for:** Cross-platform mobile apps

**Key features:**
- Single codebase for iOS & Android
- TypeScript definitions included
- Native performance
- React Native 0.70+

[Get started with React Native SDK →](./react-native-sdk-1/)

## Before You Start

> 📘 Get Your API Keys
>
> Log in to [Yuno Dashboard](https://dashboard.y.uno) → **Developers** > **Credentials** → Copy your **Public API Key** (for SDK initialization)

## Test Cards

Use these test cards when testing your integration:

| Card Number         | Scenario       |
| ------------------- | -------------- |
| 4111 1111 1111 1111 | Success        |
| 4000 0000 0000 0002 | Declined       |
| 4000 0000 0000 3220 | 3DS Challenge  |

Use any future expiry date and any 3-digit CVV for testing.
