---
title: 🛠️ Web SDK Menu Structure Options
deprecated: false
hidden: false
metadata:
  robots: index
---
This document presents two improved menu structure options for the Yuno Web SDK documentation section. Both options use only existing pages and aim to create a more intuitive user experience.

## Research approach

We analyzed the current structure and studied best practices from leading payment platforms:

* **Adyen Documentation**: User journey-based approach with clear decision guidance
* **Stripe Documentation**: Progressive disclosure and user-centric organization
* **PayPal Developer Docs**: Platform-first structure with action-oriented grouping
* **Checkout.com Docs**: Feature-based organization with clear categorization

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

We applied these core principles:

* **Start with user needs**: Not technical categories
* **Guide users**: Through decision-making process
* **Present information**: In order of importance and complexity
* **Group related functionality**: Together
* **Follow patterns**: Users expect from other payment platforms

The two options represent different approaches to solving the same problems:

* **Option 1 (User Journey-Based)**: Focuses on guiding users through their decision-making process
* **Option 2 (Feature-First)**: Organizes content by what users want to accomplish

## Option 1: User Journey-Based Structure

This structure follows the user's decision-making process, inspired by Stripe and Adyen's approach.

### Structure

```
Web SDKs
├── Getting Started
│   ├── Choose the Right Integration for You (move from parent level)
│   └── Web SDK Changelog (moved up for visibility)
├── Main Integration Options
│   ├── Full Checkout SDK
│   ├── Lite Checkout SDK
│   └── Secure Fields
├── Advanced Solutions
│   ├── Alternative SDKs (includes Headless & Seamless)
│   └── 3DS Setup SDK (deprecated)
└── Tools & Utilities
    ├── Loader
    ├── Payment Status
    ├── SDK Customizations
    └── Demo App
```

### Key benefits

* **Starts with decision-making**: Then implementation
* **Groups main options**: Together
* **Progressive complexity**: From simple to advanced solutions
* **Related features**: Grouped together

### Recommended page reordering with new folders

Organize the pages into the following new folders to match the proposed structure:

1. **Getting Started**
   * Choose the Right Integration for You (moved from parent level)
   * Web SDK Changelog (moved up for visibility)
2. **Main Integration Options**
   * Full Checkout SDK
   * Lite Checkout SDK
   * Secure Fields
3. **Advanced Solutions**
   * Alternative SDKs (includes Headless & Seamless)
   * 3DS Setup SDK (deprecated)
4. **Tools & Utilities**
   * Loader
   * Payment Status
   * SDK Customizations
   * Demo App

The folder structure should look like this:

## Option 2: Feature-First Structure

This organizes content by what users want to accomplish, inspired by PayPal and Checkout.com's action-oriented approach.

### Structure

```
Web SDKs
├── Choose Your Integration
│   ├── Choose the Right Integration for You (move from parent level)
│   └── Web SDK Changelog
├── Build Your Checkout
│   ├── Full Checkout SDK
│   ├── Lite Checkout SDK
│   └── Secure Fields
├── Advanced Customization
│   ├── Alternative SDKs
│   └── 3DS Setup SDK
└── Launch & Monitor
    ├── Loader
    ├── Payment Status
    ├── SDK Customizations
    └── Demo App
```

### Key benefits

* **Action-oriented grouping**: Build, Customize, Launch
* **Clear progression**: From decision to implementation to launch
* **Maintains all 10 pages**: In logical groupings
* **Better discoverability**: Of related features

### Recommended page reordering with new folders

Organize the pages into the following new folders to match the proposed structure:

1. **Choose Your Integration**
   * Choose the Right Integration for You (moved from parent level)
   * Web SDK Changelog
2. **Build Your Checkout**
   * Full Checkout SDK
   * Lite Checkout SDK
   * Secure Fields
3. **Advanced Customization**
   * Alternative SDKs
   * 3DS Setup SDK
4. **Launch & Monitor**
   * Loader
   * Payment Status
   * SDK Customizations
   * Demo App

The folder structure should look like this:

## Recommendation

We recommend Option 1 (User Journey-Based) because it:

1. Addresses current pain points by providing clear decision guidance upfront
2. Improves user flow with logical progression from choice to implementation
3. Groups utilities together in one section
4. Makes changelog discoverable by moving it to position 2
5. Maintains simplicity by using existing pages without adding complexity

### Key improvements

* **"Choose the Right Integration"**: Becomes the entry point
* **Changelog**: Moved from position 5 to position 2 for better visibility
* **Main SDKs**: Grouped together, utilities grouped together
* **Clear categories**: Help users understand what each section contains
