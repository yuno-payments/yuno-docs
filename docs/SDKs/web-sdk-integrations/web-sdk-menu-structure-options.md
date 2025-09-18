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

The Web SDK section contains 11 pages in this order:

1. `web-sdk-changelog` - Version history and updates
2. `full-checkout-sdk` - Complete SDK implementation
3. `lite-checkout-sdk` - Lightweight SDK option
4. `secure-fields-web` - Secure payment fields
5. `alternative-sdks` - Headless and Seamless SDKs
6. `loader` - SDK loading utilities
7. `payment-status` - Payment status tracking
8. `sdk-customizations` - Customization options
9. `demo-app` - Demo application
10. `3ds-setup-sdk` - 3D Secure setup (deprecated)
11. `other-integrations` - Direct workflow and additional options

### Current structure visualization

```
Web SDKs (Current)
├── web-sdk-changelog
├── full-checkout-sdk
├── lite-checkout-sdk
├── secure-fields-web
├── alternative-sdks
├── loader
├── payment-status
├── sdk-customizations
├── demo-app
├── 3ds-setup-sdk (deprecated)
└── other-integrations
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
│   ├── Alternative SDKs (contains Headless & Seamless)
│   └── 3DS Setup SDK (deprecated)
├── Tools & Utilities
│   ├── Loader
│   ├── Payment Status
│   ├── SDK Customizations
│   └── Demo App
└── Additional Resources
    └── Other Integrations (remaining content)
```

### Key benefits

* **Starts with decision-making**: Then implementation
* **Groups main options**: Together
* **Progressive complexity**: From simple to advanced solutions
* **Related features**: Grouped together

### Recommended page reordering

1. Choose the Right Integration for You (moved from parent level)
2. Web SDK Changelog
3. Full Checkout SDK
4. Lite Checkout SDK
5. Secure Fields
6. Alternative SDKs
7. Loader
8. Payment Status
9. SDK Customizations
10. Demo App
11. 3DS Setup SDK
12. Other Integrations

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
├── Launch & Monitor
│   ├── Loader
│   ├── Payment Status
│   ├── SDK Customizations
│   └── Demo App
└── Additional Options
    └── Other Integrations
```

### Key benefits

* **Action-oriented grouping**: Build, Customize, Launch
* **Clear progression**: From decision to implementation to launch
* **Maintains all existing pages**: In logical groupings
* **Better discoverability**: Of related features

### Recommended page reordering

1. Choose the Right Integration for You (moved from parent level)
2. Web SDK Changelog
3. Full Checkout SDK
4. Lite Checkout SDK
5. Secure Fields
6. Alternative SDKs
7. Loader
8. Payment Status
9. SDK Customizations
10. Demo App
11. 3DS Setup SDK
12. Other Integrations

## Recommendation

We recommend Option 1 (User Journey-Based) because it:

1. Addresses current pain points by providing clear decision guidance upfront
2. Improves user flow with logical progression from choice to implementation
3. Groups utilities together in one section
4. Makes changelog discoverable by moving it to position 2
5. Maintains simplicity by using existing pages without adding complexity

### Key improvements

* **"Choose the Right Integration"**: Becomes the entry point
* **Changelog**: Moved from position 1 to position 2 for better visibility
* **Main SDKs**: Grouped together, utilities grouped together
* **Clear categories**: Help users understand what each section contains

## Implementation

### Immediate actions

1. Reorder existing pages according to recommended structure
2. Move "Choose the Right Integration" from parent level to Web SDK section
3. Update navigation labels to be more descriptive
4. Add visual indicators to guide users

### Future enhancements

1. Add decision trees to help users choose the right SDK
2. Include complexity indicators for each integration option
3. Create quick-start guides for each main SDK
4. Add interactive examples and code snippets

## Next steps

1. Present both options to the team for discussion
2. Validate assumptions with actual users
3. Create detailed implementation roadmap
4. Review existing content for consistency
5. Plan phased implementation approach
