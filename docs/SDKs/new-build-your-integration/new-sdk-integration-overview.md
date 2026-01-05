---
title: New - SDK Integration Overview
deprecated: false
hidden: true
metadata:
  robots: index
---
Yuno's SDK provides a flexible, PCI-compliant way to integrate payment processing into your application. This page helps you understand the available integration approaches and choose the right one for your needs.

## What is the Yuno SDK?

The Yuno SDK handles payment collection and processing with pre-built, customizable UI components. It:

* **Manages payment method display and selection**
* **Collects payment information securely** (PCI-compliant)
* **Tokenizes sensitive data** before sending to your server
* **Handles 3DS authentication and provider-specific flows**
* **Supports multiple payment methods** through a single integration

## Choose Your Integration Approach

The Yuno SDK offers different ways to integrate payments based on your UI/UX requirements. All approaches use the same SDK - the difference is which mounting function you call.

### Standard SDK Integration

Use the Yuno SDK when you want pre-built, secure UI components for collecting payments. You have **three mounting options** that give you different levels of control:

#### Option A: Automatic Payment Method Display

**Use `mountCheckout()` when:**

* You want Yuno to display all available payment methods automatically
* You need a complete checkout solution with minimal frontend work
* Payment methods should update automatically from dashboard configuration

**Best for:** Quick integration, marketplace checkouts, standard e-commerce

#### Option B: Custom Payment Method Display

**Use `mountCheckoutLite()` when:**

* You want full control over payment method selection UI
* You need to customize which methods to display and how
* You want to integrate payment forms into your existing checkout design

**Best for:** Custom checkout experiences, branded payment flows, complex UX requirements

> **Note:** With this option, Google Pay and Apple Pay require `mountExternalButtons()` for external placement.

#### Option C: Seamless Flow

**Use `mountSeamlessCheckout()` when:**

* You want a simplified single-call approach
* You prefer automatic payment creation via callbacks
* You want minimal integration code

**Best for:** Streamlined checkouts, simple payment flows, rapid implementation

### Comparison: Which Mounting Option?

| Feature                    | `mountCheckout()`   | `mountCheckoutLite()`     | `mountSeamlessCheckout()` |
| -------------------------- | ------------------- | ------------------------- | ------------------------- |
| **Payment method display** | Yuno handles        | You control               | You control               |
| **UI control**             | High customization  | Complete control          | High customization        |
| **Google/Apple Pay**       | Built-in buttons    | External buttons required | Built-in buttons          |
| **Payment creation**       | Manual via callback | Manual via callback       | Automatic via callback    |
| **Integration effort**     | Low                 | Medium                    | Low                       |
| **Best for**               | Standard checkouts  | Custom designs            | Simplified integration    |

### Advanced Integration Options

When standard SDK mounting options don't meet your needs, consider these alternatives:

#### Secure Fields (Web Only)

Use **Secure Fields** when you want to build completely custom payment forms while maintaining PCI compliance.

**When to use:**

* You need custom card input form design
* You want specific field layouts and validation
* You're building a unique checkout experience

**Key difference:** You build the form UI, Yuno provides secure iframe fields for sensitive data.

**[Learn more about Secure Fields →](../docs/secure-fields-payment)**

#### Headless SDK (Advanced)

Use **Headless SDK** when you need complete control over the entire UX/UI without any Yuno components.

**When to use:**

* You're building a fully custom payment experience
* You need to collect card data in your own forms
* You want complete control over every interaction
* You have specific compliance or design requirements

**Key difference:** No UI components - you handle everything and use Yuno only for tokenization.

**[Learn more about Headless SDK →](headless-integration-pattern)**

## Understanding Workflows

Different operations require different workflows:

### Payment Processing

Process one-time payments from customers. This is the most common integration.

**[View Payment Workflow →](sdk-payment-workflow)**

### Payment Method Enrollment

Save payment methods to customer accounts for future use without processing a payment.

**[View Enrollment Workflow →](sdk-enrollment-workflow)**

### Combined: Save During Payment

You can also enroll payment methods while processing a payment using `vault_on_success: true` or the `cardSaveEnable` checkbox.

## Platform-Specific Implementation

Once you've chosen your integration approach, follow the platform-specific implementation guides:

<Shelf classname="platform_shelf">
  <YunoCard title="Web SDK" href="../docs/web-sdk-integrations" titleSize="h4" />

  <YunoCard title="iOS SDK" href="../docs/ios-sdk-integrations" titleSize="h4" />

  <YunoCard title="Android SDK" href="../docs/android-sdk-integrations" titleSize="h4" />
</Shelf>

## Common Questions

### How do I choose between mounting options?

**Start with `mountCheckout()`** for the fastest integration. Move to `mountCheckoutLite()` only if you need custom payment method display control.

### Can I switch between mounting options?

Yes! All options use the same SDK initialization. You can change which mounting function you call without reinstalling or reconfiguring.

### When should I use Headless instead?

Use Headless only when standard SDK mounting options can't meet your UX requirements. Headless requires more code but gives complete control.

### What about other payment methods (not cards)?

All mounting options support multiple payment methods (cards, wallets, bank transfers, etc.). The difference is only in how payment methods are displayed to users.

## Next Steps

1. **Understand the workflows:** Review [Payment Workflow](sdk-payment-workflow) and [Enrollment Workflow](sdk-enrollment-workflow)
2. **Choose your platform:** Select Web, iOS, or Android implementation guides
3. **Start integrating:** Follow the step-by-step platform-specific documentation
