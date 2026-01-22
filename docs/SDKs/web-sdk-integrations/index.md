---
title: Web SDKs
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Web SDK Integrations
  description: >-
    Yuno's Web SDKs provide several features designed to enhance your payment
    processing capabilities and provide a seamless checkout experience for your
    customers. In addition, the Web SDKs enable you to customize the user
    interface.
  robots: index
next:
  description: ''
---
Yuno's Web SDKs provide several features designed to enhance your payment processing capabilities and provide a seamless checkout experience for your customers. The Web SDKs also enable you to customize the user interface.

## Integration options

Select one of the user-friendly Web integration options available and start your journey toward efficient payment processing:

<Shelf classname="link_cards_container">
  <YunoCard title="Full SDK" href="../docs/full-checkout-sdk" titleSize="h4" description="Complete control with backend support and full customization options" badge="Most Popular" />

  <YunoCard title="Lite SDK" href="../docs/lite-checkout-sdk" titleSize="h4" description="Lightweight integration with UI control and backend support" badge="Lightweight" />

  <YunoCard title="Secure Fields" href="../docs/secure-fields-payment" titleSize="h4" description="Create and customize your own checkout with prebuilt UI components" badge="Secure" />

  <YunoCard title="Headless SDK (Payment)" href="../docs/headless-sdk-payment-web" titleSize="h4" description="Customize the checkout without having to be PCI compliant" badge="Advanced" />

  <YunoCard title="Headless SDK (Enrollment)" href="../docs/headless-sdk-enrollment-web" titleSize="h4" description="Customize the enrollment of new payment methods" badge="Advanced" />

  <YunoCard title="Seamless SDK" href="../docs/seamless-sdk-payment-web" titleSize="h4" description="Fastest integration with pre-built UI components and maximum flexibility" badge="Recommended" />

  <YunoCard title="Direct Workflow" href="../docs/direct-flow" titleSize="h4" description="Direct integration without SDK components" badge="Quick Setup" />

  <YunoCard title="Web SDK Changelog" href="https://docs.y.uno/changelog/web-sdk-v13-changelog" titleSize="h4" description="Check all updates, improvements and version history for the Web SDK" badge="Changelog" />
</Shelf>

> ❗️ Browser Support
>
> Yuno Web SDK does not support Internet Explorer.

## TypeScript support

If you are using TypeScript, access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-web/blob/main/typescript/types.ts) to use all interfaces and types available for the Web SDK.

## SDK project example

Yuno provides an example project of a running application using an SDK. You can access the [project repository](https://github.com/yuno-payments/yuno-sdk-web) or [download the project](https://github.com/yuno-payments/yuno-sdk-web/archive/refs/heads/main.zip). You can also access the [Create Your First Payment With SDK](../docs/step-2-your-first-payment) guide available in the documentation.

## Android WebView configuration

If you are using the Web SDK inside a WebView on Android, you must enable JavaScript code execution and multi-window support. Some payment methods, such as Google Pay, require this configuration for proper operation.

```kotlin
settings.javaScriptEnabled = true
settings.javaScriptCanOpenWindowsAutomatically = true
settings.setSupportMultipleWindows(true)
settings.domStorageEnabled = true
```

## Cookie usage

The Web SDK sets two essential cookies for its functionality:

* `recognitionToken`: Required for the Click-to-Pay flow
* `yuno`: Required for logging and analytics

Third-party fraud prevention SDKs integrated within Yuno may set additional cookies. These cookies are managed by the respective providers and are outside of Yuno's control. For details about third-party cookies and their usage, please consult the documentation of your specific fraud prevention vendor.

## Stay updated

Visit the [changelog](https://docs.y.uno/changelog) for the latest SDK updates and version history.

## Supported languages

For the full list of languages supported by our SDKs, see [this page](doc:supported-languages).