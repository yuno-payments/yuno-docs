---
title: Handle external browser return (callback_url)
excerpt: How to configure and handle callback_url for external browser payment flows in Android
deprecated: false
hidden: true
metadata:
  title: Handle external browser return (callback_url)
  description: Step-by-step guide for Android developers to ensure users return to the app after external payment flows using callback_url.
  robots: index
next:
  description: ''
---

# Handle external browser return (callback_url) — Android

## Overview

When a payment flow requires the user to complete an action in an external browser (e.g., 3DS challenge, bank redirect), it is essential to use the `callback_url` parameter to ensure the user returns to your app seamlessly.

---

## 1. Set the callback_url when creating the checkout session

Send the `callback_url` parameter when creating the checkout session:

```json
{
  "callback_url": "myapp://return"
}
```

> **Important:**  
> Without `callback_url`, the user may be left in the browser with no way to return to your app.

---

## 2. Configure your Android app to handle the deep link

Add an `intent-filter` to your main activity in `AndroidManifest.xml`:

```xml
<activity android:name=".YourMainActivity">
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:scheme="myapp"
            android:host="return" />
    </intent-filter>
</activity>
```
- The scheme (`myapp`) and host (`return`) must match your `callback_url`.

---

## 3. Handle the intent in your activity

In your activity, handle the return intent:

```kotlin
intent.data?.let { uri ->
    val url = uri.toString()
    if (url.contains("myapp://return")) {
        // Handle the return, e.g., show a message or navigate
        Toast.makeText(this, "Returned from payment flow", Toast.LENGTH_SHORT).show()
    }
}
```
- Adapt this logic to your app's needs.

---

## 4. Full example: integrating with Yuno SDK

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    startCheckout(
        callbackPaymentState = {
            Toast.makeText(this, it, Toast.LENGTH_SHORT).show()
        }
    )

    if (intent?.data != null) {
        intent.data?.let {
            if (it.toString().contains(URI_INTENT_CONTINUE)) {
                val sessionId = extractCheckoutSessionFromIntent(intent)

                continuePayment(
                    showPaymentStatus = configuration.showStatusYuno,
                    checkoutSession = sessionId,
                    countryCode = configuration.country,
                ) { result ->
                    result?.let {
                        Toast.makeText(this, it, Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }
    } else {
        setContent {
            YunoContent(configuration) {
                initYuno()
            }
        }
    }
}

private fun extractCheckoutSessionFromIntent(intent: Intent?): String? {
    return intent?.data?.getQueryParameter("checkoutSession")
}
```

---

## Best practices

- Always define and use `callback_url` in your payment flows.
- Configure the `intent-filter` correctly in your manifest.
- Handle the return intent to update the payment status or navigate the user.
- Test the flow on multiple devices and browsers.

---

## Summary

- Use `callback_url` to ensure users return to your app.
- Configure deep link handling in Android.
- Handle the intent to complete the payment flow. 