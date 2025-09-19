---
title: Web SDK Menu Structure Options
deprecated: false
hidden: false
metadata:
  robots: index
---
This document presents two improved menu structure options for the Yuno Web SDK documentation section. Both options use only existing pages and aim to create a more intuitive user experience based on proven patterns from leading payment platforms.

## Research approach

We analyzed the current structure and studied the actual navigation patterns from leading payment platforms:

* **Adyen Documentation**: User journey-based approach with clear decision guidance and linear progression from setup to implementation
* **Stripe Documentation**: Progressive disclosure with layered information depth, preventing information overload
* **PayPal Developer Docs**: Platform-first structure with action-oriented grouping and tool accessibility
* **Checkout.com Docs**: Feature-based organization with clear functional separation and business process alignment

### Concrete examples observed:

**Adyen's Decision Guidance:**

* Clear integration checklists guide users through choices
* Linear progression: Get Started → Build Integration → Modify Payments
* Decision points clearly marked (Drop-in vs Components vs API-only)

**Stripe's Progressive Disclosure:**

* Layered information depth (basic → advanced)
* User-centric categories (Payments, Revenue, Platforms)
* Multiple entry points based on user goals

**PayPal's Action-Oriented Grouping:**

* Platform-specific groupings (Online, In-person, Multiparty)
* Clear separation between documentation and resources
* Tool-focused organization for developer efficiency

**Checkout.com's Feature-Based Organization:**

* Feature-centric organization (Payments, Funds, Operations)
* Business process alignment (Get Started → Build → Manage)
* Clear functional separation with dashboard integration

## Current structure

The Web SDK section contains 10 pages in this order:

1. `full-checkout-sdk` - Complete SDK implementation
2. `lite-checkout-sdk` - Lightweight SDK option
3. `secure-fields-web` - Secure payment fields
4. `alternative-sdks` - Headless and Seamless SDKs
5. `web-sdk-changelog` - Version history and updates
6. `loader` - SDK loading utilities
7. `payment-status` - Payment status tracking
8. `sdk-customizations` - Customization options
9. `demo-app` - Demo application
10. `3ds-setup-sdk` - 3D Secure setup (deprecated)

### Current structure visualization

```
Web SDKs (Current)
├── full-checkout-sdk
├── lite-checkout-sdk
├── secure-fields-web
├── alternative-sdks
├── web-sdk-changelog
├── loader
├── payment-status
├── sdk-customizations
├── demo-app
└── 3ds-setup-sdk (deprecated)
```

### Key problems

* No clear entry point for users to choose the right integration
* Main SDKs are mixed with utilities and tools
* Related functionality is scattered across different pages
* No clear progression from simple to advanced solutions
* Important content like demo app and utilities are hard to find

## Design approach

We applied these core principles based on proven patterns from leading platforms:

* **Start with user needs**: Not technical categories (inspired by Adyen's decision guidance)
* **Guide users**: Through decision-making process with clear progression (Adyen's linear approach)
* **Present information**: In layers of complexity (Stripe's progressive disclosure)
* **Group related functionality**: By user goals and actions (PayPal's action-oriented grouping)
* **Follow patterns**: Users expect from other payment platforms (Checkout.com's feature-based organization)

The two options represent different approaches to solving the same problems:

* **Option 1 (Adyen-Inspired User Journey)**: Linear progression with clear decision points and integration checklists
* **Option 2 (Stripe-Inspired Progressive Disclosure)**: Layered information with multiple entry points based on user goals

## Option 1: Adyen-Inspired User Journey Structure

This structure follows Adyen's proven approach of guiding users through a clear decision-making process with linear progression from setup to implementation.

### Structure

Organize the pages into the following new folders:

```
Web SDKs
├── Get Started
│   ├── Choose the Right Integration for You (move from parent level)
│   └── Web SDK Changelog (moved up for visibility)
├── Build Your Integration
│   ├── Full Checkout SDK
│   ├── Lite Checkout SDK
│   └── Secure Fields
├── Advanced Solutions
│   ├── Alternative SDKs (includes Headless & Seamless)
│   └── 3DS Setup SDK (deprecated)
└── Developer Resources
    ├── Loader
    ├── Payment Status
    ├── SDK Customizations
    └── Demo App
```

### Key benefits

* **Clear decision guidance**: Integration choice upfront with decision checklist
* **Linear progression**: Get Started → Build → Advanced → Resources
* **Adyen-style organization**: Proven pattern that users recognize
* **Related functionality**: Grouped by implementation phase

## Option 2: Stripe-Inspired Progressive Disclosure Structure

This organizes content using Stripe's approach of progressive disclosure with multiple entry points and layered information depth.

### Structure

Organize the pages into the following new folders:

```
Web SDKs
├── Quick Start
│   ├── Choose the Right Integration for You (move from parent level)
│   └── Web SDK Changelog
├── Core Integrations
│   ├── Full Checkout SDK
│   ├── Lite Checkout SDK
│   └── Secure Fields
├── Advanced Features
│   ├── Alternative SDKs
│   └── 3DS Setup SDK (deprecated)
└── Tools & Resources
    ├── Loader
    ├── Payment Status
    ├── SDK Customizations
    └── Demo App
```

### Key benefits

* **Progressive disclosure**: Basic concepts first, advanced topics layered
* **Multiple entry points**: Users can start where they're most comfortable
* **Stripe-style organization**: Familiar pattern for developers
* **Tool accessibility**: Developer resources easily discoverable

## Recommendation

We recommend **Option 1 (Adyen-Inspired User Journey)** because it:

1. **Provides clear decision guidance** upfront, addressing the main pain point of users not knowing which integration to choose
2. **Follows a proven linear progression** that users expect from payment platform documentation
3. **Groups utilities together** in Developer Resources, making them easily discoverable
4. **Makes changelog discoverable** by moving it to position 2, following Adyen's pattern of surfacing important updates
5. **Maintains simplicity** by using existing pages without adding complexity

### Key improvements

* **"Choose the Right Integration"**: Becomes the clear entry point
* **Changelog**: Moved from position 5 to position 2 for better visibility
* **Main SDKs**: Grouped together, utilities grouped together
* **Clear categories**: Help users understand what each section contains