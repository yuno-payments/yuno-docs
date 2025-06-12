---
title: Web SDK Integrations
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
Yuno's Web SDKs provide several features designed to enhance your payment processing capabilities and provide a seamless checkout experience for your customers. In addition, the Web SDKs enable you to customize the user interface.

## Integration options

Select one of the user-friendly Web integration options available and kickstart your journey toward efficient payment processing:

<Shelf classname="link_cards_container">
  <YunoCard title="Full SDK" href="https://docs.y.uno/docs/full-checkout-sdk" titleSize="h4" description="Render the payment methods your company has available in the checkout and for user enrollment." />

  <YunoCard title="Lite SDK (Payment)" href="https://docs.y.uno/docs/lite-checkout-sdk" titleSize="h4" description="With this option, you control which payment methods will be shown to the user during checkout and enrollment." />

  <YunoCard title="Lite SDK (Enrollment)" href="https://docs.y.uno/docs/enrollment-lite-sdk" titleSize="h4" description="Simplify the user enrollment of payment methods." />

  <YunoCard title="Secure Fields" href="https://docs.y.uno/docs/secure-fields-payment" titleSize="h4" description="Create and customize your own checkout with prebuilt UI components." />

  <YunoCard title="Headless SDK (Payment)" href="https://docs.y.uno/docs/headless-sdk-payment" titleSize="h4" description="Customize the checkout without having to be PCI compliant." />

  <YunoCard title="Headless SDK (Enrollment)" href="https://docs.y.uno/docs/headless-sdk-enrollment" titleSize="h4" description="Customize the enrollment of new payment methods." />

  <YunoCard title="Direct Workflow" href="https://docs.y.uno/docs/direct-flow" titleSize="h4" />
</Shelf>

<br />

> ❗️ Browser Support
>
> Yuno Web SDK does not support the IE browser.

> 🚧 TypeScript Support
>
> If you are using TypeScript, access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-web/blob/main/typescript/types.ts) to use all interfaces and types available for the Web SDK.

> 📘 Explore the SDK Project Example
>
> Yuno provides an example project of a running application using an SDK. You can access the [project repository](https://github.com/yuno-payments/yuno-sdk-web) or [download the project](https://github.com/yuno-payments/yuno-sdk-web/archive/refs/heads/main.zip). In addition, you can access the [Create Your First Payment With SDK](/docs/step-2-your-first-payment) guide available in the documentation.

> 🚧 Android WebView Configuration
>
> If you are using the Web SDK inside a WebView on Android, you must enable JavaScript code execution and multi-window support. Some payment methods, such as Google Pay, require this configuration for proper operation.
>
> ```kotlin
> settings.javaScriptEnabled = true
> settings.javaScriptCanOpenWindowsAutomatically = true
> settings.setSupportMultipleWindows(true)
> settings.domStorageEnabled = true
> ```

> 🚧 Cookie Usage
>
> The Web SDK sets two essential cookies for its functionality:
>
> * `recognitionToken`: Required for the Click-to-Pay flow
> * `yuno`: Required for logging and analytics
>
> Third-party fraud prevention SDKs integrated within Yuno may set additional cookies. These cookies are managed by the respective providers and are outside of Yuno's control. For details about third-party cookies and their usage, please consult the documentation of your specific fraud prevention vendor.