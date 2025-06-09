---
title: Test page
deprecated: false
hidden: true
metadata:
  robots: index
---
> 📘 Integration Guides
>
> This page provides an overview of Yuno SDKs and integration types. For detailed, step-by-step integration instructions, please refer to our dedicated guides:
>
> * [Full SDK Integration Guide](/docs/full-sdk-workflow)
> * [Lite SDK (Payment) Guide](/docs/the-ultimate-checkout-lite)
> * [Lite SDK (Enrollment) Guide](/docs/enrollment-lite)
> * [Secure Fields Guide](/docs/secure-fields)
> * [Headless SDK (Payment) Guide](/docs/headless-sdk-integration)
> * [Headless SDK (Enrollment) Guide](/docs/headless-sdk-enrollment-steps)
> * [Direct Flow Guide](/docs/direct-flow)

This page provides an overview of the different integration methods available with Yuno. Each option offers unique capabilities and features to suit different business needs. Choose the integration method that best aligns with your requirements.

## Choosing Your Integration Method

### Full SDK

Best for businesses seeking a complete, ready-to-use payment solution with minimal development effort. The Full SDK provides:

* Pre-built UI components for payment flows
* Built-in error handling and validation
* Automatic payment method detection
* Seamless integration with minimal code

### Lite SDK

Ideal for businesses that want more control over their payment UI while maintaining Yuno's core functionality. Available in two variants:

* **Payment**: For processing one-time payments
* **Enrollment**: For saving payment methods for future use

### Headless SDK

Perfect for businesses requiring complete control over their payment UI and user experience. Offers:

* Maximum UI customization
* Full control over payment flow
* Direct access to Yuno's core functionality
* Support for both payment and enrollment flows

### Secure Fields

Recommended for businesses that want to maintain their existing checkout flow while leveraging Yuno's secure payment processing. Features:

* PCI-compliant payment field integration
* Minimal UI changes required
* Direct integration with your existing checkout

### Direct Flow

Best for businesses with highly customized payment flows or specific technical requirements. Provides:

* Direct API access
* Complete control over the payment process
* Custom implementation flexibility

## Integration Features

### Core Features

* **Payment Processing**
  * Support for multiple payment methods
  * Real-time payment status updates
  * Automatic payment method detection
  * Currency conversion support

* **Customer Management**
  * Customer profile creation and management
  * Payment method storage
  * Transaction history
  * Customer preferences

* **Transaction Management**
  * Payment status tracking
  * Transaction history
  * Detailed payment information
  * Receipt generation

### Optional Features

* **Refunds**
  * Full and partial refunds
  * Refund status tracking
  * Refund history
  * Automatic reconciliation

* **Captures and Cancellations**
  * Pre-authorization support
  * Transaction cancellation
  * Capture scheduling
  * Authorization management

* **Webhook Notifications**
  * Real-time payment updates
  * Custom event notifications
  * Secure webhook delivery
  * Retry mechanisms

* **Development Tools**
  * Test mode for development
  * Sandbox environment
  * Debug logging
  * Integration testing tools

## Getting Started

1. Review the available integration methods above
2. Choose the method that best fits your needs
3. Follow the corresponding integration guide
4. Test your integration using our sandbox environment
5. Go live with your production credentials

For detailed information about implementing these features, please refer to the specific integration guides linked above.

<HTMLBlock>{`
<body>
  <section class="link_cards_container">
    <a class="card" href="/docs/full-sdk-workflow">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Full SDK</h4>
    </a>

    <a class="card" href="/docs/the-ultimate-checkout-lite">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Lite SDK (Payment)</h4>
    </a>

    <a class="card" href="/docs/enrollment-lite">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Lite SDK (Enrollment)</h4>
    </a>

    <a class="card" href="/docs/secure-fields">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Secure Fields</h4>
    </a>

    <a class="card" href="/docs/headless-sdk-integration">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Headless SDK (Payment)</h4>
    </a>

    <a class="card" href="/docs/headless-sdk-enrollment-steps">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Headless SDK (Enrollment)</h4>
    </a>

    <a class="card" href="/docs/direct-flow">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Direct Workflow</h4>
    </a>

  </section>
</body>
`}</HTMLBlock>