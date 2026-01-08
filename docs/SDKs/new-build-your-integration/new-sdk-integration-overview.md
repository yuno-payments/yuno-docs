---
title: New - SDK Integration Overview
deprecated: false
hidden: true
metadata:
  robots: index
---
Choose your integration approach based on your UI/UX requirements—each uses a different mounting function to give you the level of control you need.

## Standard SDK Integration

Use the Yuno SDK when you want pre-built, secure UI components for collecting payments. You have **three mounting options** that give you different levels of control:

### `mountCheckout()`

**Use when:**

* You want Yuno to display all available payment methods automatically
* You need a complete checkout solution with minimal frontend work
* Payment methods should update automatically from dashboard configuration

**Best for:** Quick integration, marketplace checkouts, standard e-commerce

### `mountCheckoutLite()`

**Use when:**

* You want full control over payment method selection UI
* You need to customize which methods to display and how
* You want to integrate payment forms into your existing checkout design

**Best for:** Custom checkout experiences, branded payment flows, complex UX requirements

> **Note:** With this option, Google Pay and Apple Pay require `mountExternalButtons()` for external placement.

### `mountSeamlessCheckout()`

**Use when:**

* You want a simplified single-call approach
* You prefer automatic payment creation via callbacks
* You want minimal integration code

**Best for:** Streamlined checkouts, simple payment flows, rapid implementation

## Comparison: Which Mounting Option?

| Feature                    | `mountCheckout()`   | `mountCheckoutLite()`     | `mountSeamlessCheckout()` |
| -------------------------- | ------------------- | ------------------------- | ------------------------- |
| **Payment method display** | Yuno handles        | You control               | You control               |
| **UI control**             | High customization  | Complete control          | High customization        |
| **Google/Apple Pay**       | Built-in buttons    | External buttons required | Built-in buttons          |
| **Payment creation**       | Manual via callback | Manual via callback       | Automatic via callback    |
| **Integration effort**     | Low                 | Medium                    | Low                       |
| **Best for**               | Standard checkouts  | Custom designs            | Simplified integration    |

## Advanced Integration Options

When standard SDK mounting options don't meet your needs, consider these alternatives:

### Secure Fields (Web Only)

For completely custom card form design while maintaining PCI compliance. Ideal when you need specific field layouts or unique form validation.

**Key difference:** You build the form UI, Yuno provides secure iframe fields for sensitive data.

**[Learn more about Secure Fields →](../docs/secure-fields-payment)**

### Headless Integration (Advanced)

For completely custom payment experiences with full UI control. Use when standard SDK mounting options can't meet your UX requirements.

**Key difference:** No UI components - you handle everything and use Yuno only for tokenization.

**[Learn more about Headless Integration →](headless-integration-pattern)**

## Understanding Workflows

Once you've chosen your mounting approach, understand the two main workflows:

<Shelf classname="link_cards_container">
  <YunoCard title="Payment Workflow" href="sdk-payment-workflow" titleSize="h4" description="Process one-time payments or use vaulted tokens for recurring payments" />

  <YunoCard title="Enrollment Workflow" href="sdk-enrollment-workflow" titleSize="h4" description="Save payment methods for future use without processing a payment" />
</Shelf>

**Tip:** You can also save payment methods during payment using `vault_on_success: true` or the `cardSaveEnable` checkbox.

## Platform-Specific Implementation

Once you've chosen your integration approach and understand the workflows, proceed to your platform's implementation guide:

- **[Web Flow →](../docs/web-sdk-integrations)** - JavaScript SDK for web applications
- **[iOS Flow →](../docs/ios-sdk-integrations)** - Native iOS SDK for Swift/Objective-C
- **[Android Flow →](../docs/android-sdk-integrations)** - Native Android SDK for Kotlin/Java

## Common Questions

### How do I choose between mounting options?

**Start with `mountCheckout()`** for the fastest integration. Move to `mountCheckoutLite()` only if you need custom payment method display control.

### Can I switch between mounting options?

Yes! All options use the same SDK initialization. You can change which mounting function you call without reinstalling or reconfiguring.

### When should I use Headless Integration instead?

Use Headless Integration only when standard SDK mounting options can't meet your UX requirements. Headless Integration requires more code but gives complete control.

### What about other payment methods (not cards)?

All mounting options support multiple payment methods (cards, wallets, bank transfers, etc.). The difference is only in how payment methods are displayed to users.

## Next Steps

1. **Understand the workflows:** Review [Payment Workflow](sdk-payment-workflow) and [Enrollment Workflow](sdk-enrollment-workflow)
2. **Choose your platform:** Select Web Flow, iOS Flow, or Android Flow implementation guides
3. **Start integrating:** Follow the step-by-step platform-specific documentation
