---
title: New - Web Flow
deprecated: false
hidden: true
metadata:
  robots: index
---

Complete guide to integrating Yuno's Web SDK into your application. This section covers installation, payment processing, enrollment, and advanced options.

> **New to Yuno?** Start with [SDK Integration Overview](doc:new-sdk-integration-overview) to understand your options.

## Get Started

Follow these steps to integrate Yuno's Web SDK:

<Shelf classname="link_cards_container">
  <YunoCard title="Getting Started" href="../docs/new-getting-started-with-web-sdk" titleSize="h4" description="Install and initialize the Web SDK" badge="Start Here" />

  <YunoCard title="Payment Integration" href="../docs/new-web-sdk-payment-integration" titleSize="h4" description="Process payments with multiple mounting options" badge="Payment" />

  <YunoCard title="Enrollment Integration" href="../docs/new-web-sdk-enrollment-integration" titleSize="h4" description="Save payment methods for future use" badge="Enrollment" />
</Shelf>

## Alternative Integrations

Need more control over your payment UI?

<Shelf classname="link_cards_container">
  <YunoCard title="Secure Fields" href="../docs/new-web-sdk-secure-fields-integration" titleSize="h4" description="Custom card forms with iframe security" badge="Cards Only" />

  <YunoCard title="Headless Integration (Payment)" href="../docs/headless-sdk-payment" titleSize="h4" description="Complete control over entire payment flow" badge="Advanced" />

  <YunoCard title="Headless Integration (Enrollment)" href="../docs/headless-sdk-enrollment" titleSize="h4" description="Complete control over enrollment flow" badge="Advanced" />
</Shelf>

## Additional Resources

<Shelf classname="link_cards_container">
  <YunoCard title="Complementary Features" href="../docs/new-web-sdk-complementary-features" titleSize="h4" description="Configuration options and SDK customization" />

  <YunoCard title="Demo App" href="../docs/demo-app" titleSize="h4" description="Working examples of all SDK integrations" />

  <YunoCard title="Web SDK Changelog" href="https://docs.y.uno/changelog/web-sdk-v13-changelog" titleSize="h4" description="Updates and version history" badge="Changelog" />
</Shelf>

## Technical Information

### Browser Support

> ❗️ Browser Support
>
> Yuno Web SDK does not support Internet Explorer.

### TypeScript Support

If you are using TypeScript, access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-web/blob/main/typescript/types.ts) to use all interfaces and types available for the Web SDK.

Install the types package:

```bash
npm install @yuno-payments/sdk-web-types
```

### Android WebView Configuration

If you are using the Web SDK inside a WebView on Android, you must enable JavaScript code execution and multi-window support. Some payment methods, such as Google Pay, require this configuration for proper operation.

```kotlin
settings.javaScriptEnabled = true
settings.javaScriptCanOpenWindowsAutomatically = true
settings.setSupportMultipleWindows(true)
settings.domStorageEnabled = true
```

### Cookie Usage

The Web SDK sets two essential cookies for its functionality:

* `recognitionToken`: Required for the Click-to-Pay flow
* `yuno`: Required for logging and analytics

Third-party fraud prevention SDKs integrated within Yuno may set additional cookies. These cookies are managed by the respective providers and are outside of Yuno's control. For details about third-party cookies and their usage, please consult the documentation of your specific fraud prevention vendor.

### Supported Languages

For the full list of languages supported by our SDKs, see [Supported Languages](doc:supported-languages).

## Quick Links

- **[Choose the Right Integration](doc:new-choose-the-right-integration-for-you)**: Compare all options
- **[Country Coverage](doc:country-coverage-yuno-sdk)**: Supported countries
- **[Changelog](https://docs.y.uno/changelog)**: Latest updates

