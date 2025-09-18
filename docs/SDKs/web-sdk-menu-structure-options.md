---
title: Web SDK Menu Structure Options
deprecated: false
hidden: false
metadata:
  robots: index
---
## Executive Summary

This document presents two improved menu structure options for the Yuno Web SDK documentation section, based on analysis of the current structure and research into best practices from leading payment platforms (Adyen, Stripe, PayPal, and Checkout.com). Both options use only existing pages and aim to create a more intuitive user experience.

## Analysis Methodology

### Research Approach

1. **Current Structure Analysis**: Examined the existing 11 pages in the Web SDK section
2. **User Journey Mapping**: Identified pain points in the current navigation flow
3. **Competitive Analysis**: Studied navigation patterns from 4 leading payment platforms
4. **Best Practice Synthesis**: Applied industry standards to Yuno's specific context

### Reference Sites Analyzed

* **Adyen Documentation**: User journey-based approach with clear decision guidance
* **Stripe Documentation**: Progressive disclosure and user-centric organization
* **PayPal Developer Docs**: Platform-first structure with action-oriented grouping
* **Checkout.com Docs**: Feature-based organization with clear categorization

## Current Structure Analysis

### Existing Web SDK Section Structure

The current Web SDK section contains 11 pages in this order:

1. **web-sdk-changelog** - Version history and updates
2. **full-checkout-sdk** - Complete SDK implementation
3. **lite-checkout-sdk** - Lightweight SDK option
4. **secure-fields-web** - Secure payment fields
5. **alternative-sdks** - Headless and Seamless SDKs
6. **loader** - SDK loading utilities
7. **payment-status** - Payment status tracking
8. **sdk-customizations** - Customization options
9. **demo-app** - Demo application
10. **3ds-setup-sdk** - 3D Secure setup (deprecated)
11. **other-integrations** - Direct workflow and additional options

### Key Problems Identified

**1. Poor Decision Flow**

* No clear starting point for users to choose the right integration
* "Choose the Right Integration for You" exists at parent level but not in Web SDK section
* Users must navigate through multiple pages to understand their options

**2. Buried Important Content**

* Changelog is first but should be easily accessible, not the entry point
* Demo app and utilities are scattered throughout the list
* No logical grouping of related functionality

**3. Inconsistent Naming**

* Technical terms like "Headless SDK" and "Secure Fields" without clear context
* "Alternative SDKs" suggests these are secondary options when they're actually primary choices
* "Other Integrations" is vague and doesn't indicate what's inside

**4. Missing User Guidance**

* No clear "recommended" path for new users
* No indication of complexity levels or implementation effort
* No clear progression from simple to advanced solutions

**5. Poor Information Architecture**

* Utilities (Loader, Payment Status, Customizations) are mixed with main SDK options
* Deprecated content (3DS Setup SDK) is not clearly marked
* Related functionality is scattered across different pages

## Design Philosophy & Train of Thought

### Core Principles Applied

**1. User-Centric Design**

* Start with user needs, not technical categories
* Guide users through decision-making process
* Provide clear recommendations and guidance

**2. Progressive Disclosure**

* Present information in order of importance and complexity
* Group related functionality together
* Create logical information hierarchy

**3. Industry Best Practices**

* Follow patterns users expect from other payment platforms
* Use familiar terminology and organization
* Implement proven navigation patterns

### Decision Framework

The two options represent different approaches to solving the same problems:

* **Option 1 (User Journey-Based)**: Focuses on guiding users through their decision-making process
* **Option 2 (Feature-First)**: Organizes content by what users want to accomplish

Both options address the core issues while maintaining different philosophical approaches to information architecture.

## Option 1: User Journey-Based Structure

### Philosophy

This structure follows the user's mental model and decision-making process, inspired by Stripe and Adyen's approach to documentation.

### Structure

```
📚 Web SDKs
├── 🚀 Getting Started
│   ├── Choose the Right Integration for You (move from parent level)
│   └── Web SDK Changelog (moved up for visibility)
├── 💳 Main Integration Options
│   ├── Full Checkout SDK
│   ├── Lite Checkout SDK
│   └── Secure Fields
├── 🛠️ Advanced Solutions
│   ├── Alternative SDKs (contains Headless & Seamless)
│   ├── Direct Workflow (from other-integrations)
│   └── 3DS Setup SDK (deprecated)
├── 🔧 Tools & Utilities
│   ├── Loader
│   ├── Payment Status
│   ├── SDK Customizations
│   └── Demo App
└── 📋 Additional Resources
    └── Other Integrations (remaining content)
```

### Key Benefits

* **User-centric flow**: Starts with decision-making, then implementation
* **Clear recommendations**: Groups main options together
* **Progressive complexity**: From simple to advanced solutions
* **Contextual grouping**: Related features grouped together

### Recommended Page Reordering

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

### Philosophy

This organizes content by what users want to accomplish, inspired by PayPal and Checkout.com's action-oriented approach.

### Structure

```
📚 Web SDKs
├── 🎯 Choose Your Integration
│   ├── Choose the Right Integration for You (move from parent level)
│   └── Web SDK Changelog
├── 🏗️ Build Your Checkout
│   ├── Full Checkout SDK
│   ├── Lite Checkout SDK
│   └── Secure Fields
├── ⚙️ Advanced Customization
│   ├── Alternative SDKs
│   ├── SDK Customizations
│   └── 3DS Setup SDK
├── 🚀 Launch & Monitor
│   ├── Loader
│   ├── Payment Status
│   └── Demo App
└── 🔗 Additional Options
    └── Other Integrations
```

### Key Benefits

* **Action-oriented grouping**: Build, Customize, Launch
* **Clear progression**: From decision to implementation to launch
* **Maintains all existing pages**: In logical groupings
* **Better discoverability**: Of related features

### Recommended Page Reordering

1. Choose the Right Integration for You (moved from parent level)
2. Web SDK Changelog
3. Full Checkout SDK
4. Lite Checkout SDK
5. Secure Fields
6. Alternative SDKs
7. SDK Customizations
8. 3DS Setup SDK
9. Loader
10. Payment Status
11. Demo App
12. Other Integrations

## Recommendation

### Preferred Option: Option 1 (User Journey-Based)

**Rationale:**

1. **Addresses current pain points**: Provides clear decision guidance upfront
2. **Improves user flow**: Logical progression from choice to implementation
3. **Groups utilities together**: Loader, Payment Status, Customizations in one section
4. **Makes changelog discoverable**: Moved to position 2 for better visibility
5. **Maintains simplicity**: Uses existing pages without adding complexity

### Key Improvements

* **Decision guidance first**: "Choose the Right Integration" becomes the entry point
* **Changelog visibility**: Moved from position 1 to position 2
* **Logical grouping**: Main SDKs together, utilities together
* **Clear categories**: Users understand what each section contains

## Implementation Considerations

### Immediate Actions

1. **Reorder existing pages** according to recommended structure
2. **Move "Choose the Right Integration"** from parent level to Web SDK section
3. **Update navigation labels** to be more descriptive
4. **Add visual indicators** (badges, icons) to guide users

### Future Enhancements

1. **Add decision trees** to help users choose the right SDK
2. **Include complexity indicators** for each integration option
3. **Create quick-start guides** for each main SDK
4. **Add interactive examples** and code snippets

## Success Metrics

### User Experience Improvements

* **Reduced decision time**: Users can quickly identify the right SDK
* **Improved discoverability**: Important content is easier to find
* **Better task completion**: Clear progression from decision to implementation
* **Reduced support queries**: Better self-service through improved navigation

### Business Impact

* **Faster integration**: Users can start implementing sooner
* **Higher adoption**: Clear guidance reduces abandonment
* **Better developer experience**: Improved satisfaction and retention
* **Reduced support burden**: Self-service through better documentation

## Next Steps

1. **Team Review**: Present both options to the team for discussion
2. **User Testing**: Validate assumptions with actual users
3. **Implementation Planning**: Create detailed implementation roadmap
4. **Content Audit**: Review existing content for consistency
5. **Rollout Strategy**: Plan phased implementation approach

***

_This document provides a comprehensive analysis and two viable options for improving the Web SDK menu structure. Both options address the identified pain points while maintaining the existing content and following industry best practices._
