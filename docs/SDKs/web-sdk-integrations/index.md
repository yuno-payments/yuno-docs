---
title: Web SDKs
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Web SDK Integrations
  description: >-
    Yuno's Web SDKs simplify payment integrations, enable a seamless checkout experience,
    and offer UI customization options.
  robots: index
next:
  description: ''
---
Yuno's Web SDKs simplify payment integrations and help you deliver a seamless checkout experience. You can also customize the user interface to match your brand.

## Integration options

Choose the Web SDK that fits your use case:

<Shelf classname="link_cards_container">
  <YunoCard title="Full SDK" href="https://docs.y.uno/docs/full-checkout-sdk" titleSize="h4" description="Render the payment methods your company has available in the checkout and for user enrollment." />

  <YunoCard title="Seamless SDK" href="https://docs.y.uno/docs/seamless-sdk-payment-web" titleSize="h4" description="Combine API and SDK to keep a fast integration with a great UX." />

  <YunoCard title="Lite SDK (Payment)" href="https://docs.y.uno/docs/lite-checkout-sdk" titleSize="h4" description="With this option, you control which payment methods will be shown to the user during checkout and enrollment." />

  <YunoCard title="Lite SDK (Enrollment)" href="https://docs.y.uno/docs/enrollment-lite-sdk" titleSize="h4" description="Simplify the user enrollment of payment methods." />

  <YunoCard title="Secure Fields (Payment)" href="https://docs.y.uno/docs/secure-fields-payment" titleSize="h4" description="Create and customize your own checkout with prebuilt UI components." />

  <YunoCard title="Headless SDK (Payment)" href="https://docs.y.uno/docs/headless-sdk-payment" titleSize="h4" description="Customize the checkout without having to be PCI compliant." />

  <YunoCard title="Headless SDK (Enrollment)" href="https://docs.y.uno/docs/headless-sdk-enrollment" titleSize="h4" description="Customize the enrollment of new payment methods." />

  <YunoCard title="Direct workflow" href="https://docs.y.uno/docs/direct-flow" titleSize="h4" />
</Shelf>

<br />

> ❗️ Browser support
>
> Yuno Web SDK does not support the IE browser.

> 🚧 TypeScript types
>
> If you use TypeScript, see the [@yuno-payments/sdk-web-types](https://www.npmjs.com/package/@yuno-payments/sdk-web-types) package for available interfaces and types.

> 📘 Demo app and first payment
>
> Explore an SDK demo project in the [repository](https://github.com/yuno-payments/yuno-sdk-web) or
> [download it](https://github.com/yuno-payments/yuno-sdk-web/archive/refs/heads/main.zip). Then follow
> [Create your first payment with SDK](/docs/step-2-your-first-payment).

> 🚧 Android WebView configuration
>
> If you are using the Web SDK inside a WebView on Android, you must enable JavaScript code execution and multi-window support. Some payment methods, such as Google Pay, require this configuration for proper operation.
>
> ```kotlin
> settings.javaScriptEnabled = true
> settings.javaScriptCanOpenWindowsAutomatically = true
> settings.setSupportMultipleWindows(true)
> settings.domStorageEnabled = true
> ```

> 🚧 Cookie usage
>
> The Web SDK sets two essential cookies for its functionality:
>
> * `recognitionToken`: Required for the Click-to-Pay flow
> * `yuno`: Required for logging and analytics
>
> Third-party fraud prevention SDKs integrated within Yuno may set additional cookies. These cookies are managed by the respective providers and are outside of Yuno's control. For details about third-party cookies and their usage, please consult the documentation of your specific fraud prevention vendor.