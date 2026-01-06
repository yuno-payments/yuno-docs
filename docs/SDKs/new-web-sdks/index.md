---
title: New - Web SDKs
deprecated: false
hidden: true
metadata:
  robots: index
---
Yuno's Web SDK provides flexible payment integration designed to enhance your payment processing capabilities and provide a seamless checkout experience for your customers. The Web SDK enables extensive customization while maintaining PCI compliance.

## Get Started

Follow these steps to integrate Yuno's Web SDK:

<Shelf classname="link_cards_container">
  <YunoCard title="Getting Started" href="../docs/web-sdk-getting-started" titleSize="h4" description="Install and initialize the Web SDK" badge="Start Here" />

  <YunoCard title="Payment Integration" href="../docs/web-sdk-payment-integration" titleSize="h4" description="Process payments with multiple mounting options" badge="Payment" />

  <YunoCard title="Enrollment Integration" href="../docs/web-sdk-enrollment-integration" titleSize="h4" description="Save payment methods for future use" badge="Enrollment" />
</Shelf>

## Advanced Integration Options

For advanced use cases requiring more control over the payment experience:

<Shelf classname="link_cards_container">
  <YunoCard title="Secure Fields" href="../docs/new-web-sdk-secure-fields-integration" titleSize="h4" description="Build custom card forms with secure iframe fields" badge="Custom UI" />

  <YunoCard title="Headless SDK (Payment)" href="../docs/headless-sdk-payment" titleSize="h4" description="Complete control over payment UI and flow" badge="Advanced" />

  <YunoCard title="Headless SDK (Enrollment)" href="../docs/headless-sdk-enrollment" titleSize="h4" description="Complete control over enrollment UI and flow" badge="Advanced" />
</Shelf>

## Additional Resources

<Shelf classname="link_cards_container">
  <YunoCard title="SDK Customizations" href="../docs/sdk-customizations" titleSize="h4" description="Customize SDK appearance to match your brand" />

  <YunoCard title="Payment Status" href="../docs/payment-status" titleSize="h4" description="Monitor payment status with the SDK" />

  <YunoCard title="Demo App" href="../docs/demo-app" titleSize="h4" description="Working examples of all SDK integrations" />

  <YunoCard title="Web SDK Changelog" href="https://docs.y.uno/changelog/web-sdk-v13-changelog" titleSize="h4" description="Check all updates and version history" badge="Changelog" />
</Shelf>

## Understanding Integration Options

The Yuno SDK offers different approaches to integrate payments:

### Standard SDK Integration

Use the standard SDK when you want pre-built, secure UI components. You have **three mounting options**:

* **`mountCheckout()`**: Yuno displays all available payment methods automatically
* **`mountCheckoutLite()`**: You control which payment methods to display
* **`mountSeamlessCheckout()`**: Simplified flow with automatic payment creation

**Best for:** Most integrations, standard checkouts, quick implementation

**[Learn more →](doc:web-sdk-payment-integration)**

### Secure Fields (Web Only)

Use Secure Fields when you want to build completely custom card payment forms while maintaining PCI compliance.

**Best for:** Custom card form designs, specific field layouts, unique checkout experiences

**[Learn more →](doc:secure-fields-payment)**

### Headless SDK (Advanced)

Use Headless SDK when you need complete control over the entire UX/UI without any Yuno components.

**Best for:** Fully custom payment experiences, complete control over every interaction

**[Learn more →](doc:headless-sdk-payment)**

### Direct API Integration

For server-to-server integration without SDK components, see [Direct Workflow](doc:direct-flow).

**Requires:** PCI-DSS certification

## Browser Support

> ❗️ Browser Support
>
> Yuno Web SDK does not support Internet Explorer.

## TypeScript Support

If you are using TypeScript, access the [Yuno repository](https://github.com/yuno-payments/yuno-sdk-web/blob/main/typescript/types.ts) to use all interfaces and types available for the Web SDK.

Install the types package:

```bash
npm install @yuno-payments/sdk-web-types
```

## SDK Project Example

Yuno provides an example project of a running application using the SDK. You can access the [project repository](https://github.com/yuno-payments/yuno-sdk-web) or [download the project](https://github.com/yuno-payments/yuno-sdk-web/archive/refs/heads/main.zip).

You can also access the [Create Your First Payment With SDK](doc:step-2-your-first-payment) guide available in the documentation.

## Android WebView Configuration

If you are using the Web SDK inside a WebView on Android, you must enable JavaScript code execution and multi-window support. Some payment methods, such as Google Pay, require this configuration for proper operation.

```kotlin
settings.javaScriptEnabled = true
settings.javaScriptCanOpenWindowsAutomatically = true
settings.setSupportMultipleWindows(true)
settings.domStorageEnabled = true
```

## Cookie Usage

The Web SDK sets two essential cookies for its functionality:

* `recognitionToken`: Required for the Click-to-Pay flow
* `yuno`: Required for logging and analytics

Third-party fraud prevention SDKs integrated within Yuno may set additional cookies. These cookies are managed by the respective providers and are outside of Yuno's control. For details about third-party cookies and their usage, please consult the documentation of your specific fraud prevention vendor.

## Supported Languages

For the full list of languages supported by our SDKs, see [Supported Languages](doc:supported-languages).

## Need Help?

* **[Choose the Right Integration](doc:choose-the-right-integration-for-you)**: Compare all integration options
* **[Country Coverage](doc:country-coverage-yuno-sdk)**: Check supported countries
* **[Changelog](https://docs.y.uno/changelog)**: Latest SDK updates and version history

## Stay Updated

Visit the [changelog](https://docs.y.uno/changelog) for the latest SDK updates and version history.
