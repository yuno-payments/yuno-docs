---
title: Docs Restructuring Options
deprecated: false
hidden: false
metadata:
  robots: index
---
This document presents two improved menu structure options for the entire Yuno documentation. Both options use only existing content and aim to create a more intuitive user experience based on proven patterns from leading payment platforms.

## Research approach

We analyzed the current structure and studied navigation patterns from leading payment platforms:

* **Adyen Documentation**: User journey-based approach with clear decision guidance and linear progression from setup to implementation
* **Stripe Documentation**: Progressive disclosure with layered information depth, preventing information overload
* **PayPal Developer Docs**: Platform-first structure with action-oriented grouping and tool accessibility
* **Checkout.com Docs**: Feature-based organization with clear functional separation and business process alignment

### Key patterns identified:

* **Adyen**: Decision wizards, linear progression, clear success criteria
* **Stripe**: Progressive disclosure, contextual help, multiple entry points
* **PayPal**: Use case-driven navigation, platform-specific groupings, quick start paths
* **Checkout.com**: Workflow-based content, feature-centric organization, status indicators

## Current structure

The current Yuno documentation consists of 13 main categories with significant complexity imbalance:

### Structure visualization (Only Categories)

```
HOW YUNO WORKS
GET STARTED WITH YUNO
USING YUNO
DIRECT INTEGRATION USE CASES
SDKs
SECURITY AND COMPLIANCE
PAYMENT FEATURES
PAYOUT MANAGEMENT
DISPUTES
WEBHOOKS
WALLETS
PLUGINS
ADDITIONAL SERVICES
```

### Complete structure visualization

The complete structure shows all categories with their sub-items. The SDKs category contains over 50 sub-items, demonstrating the complexity imbalance.

```
HOW YUNO WORKS 
├── What is Yuno? 
├── How Yuno Payment Process Works 
└── Basic Concepts 
    ├── Customers 
    ├── Sessions 
    ├── Payments 
    ├── Transactions 
    ├── Tokens 
    ├── Payment methods 
    ├── Webhooks 
    ├── Fraud prevention 
    └── 3DS 

GET STARTED WITH YUNO 
├── Overview 
├── Set Up Your Account 
├── Create Your First Payment With SDK 
└── BUILD YOUR INTEGRATION 
    ├── Choose the Right Integration for You 
    ├── Direct Flow Integration 
    └── SDK Integration Overview 

USING YUNO 
├── Environments 
├── Dashboard Overview 
│   ├── Home 
│   ├── Connections 
│   ├── Routing 
│   ├── Monitors 
│   ├── Checkout Builder 
│   ├── Payments 
│   ├── Insights 
│   ├── Reconciliations 
│   └── Developers (Credentials) 
├── Other tools 
│   ├── Risk Conditions 
│   ├── Payment Links 
│   └── Audit logs 
├── Account Management 
├── Teams and Roles 
├── Single Sign-On (SSO) 
└── Security 

DIRECT INTEGRATION USE CASES 
├── Set Up Payment Connection 
├── Create Payments 
├── Refund Payments 
├── Cancel Payments 
├── Capture Payments 
├── Build Reports 
└── Yuno Testing Gateway 

SDKs 
├── Choose the Right Integration for You 
├── Yuno SDKs Introduction 
├── SDK Integration Overview 
│   ├── Seamless SDK 
│   ├── Full SDK 
│   ├── Lite SDK (Payment) 
│   ├── Lite SDK (Enrollment) 
│   ├── Secure Fields 
│   ├── Headless SDK (Payment) 
│   └── Headless SDK (Enrollment) 
├── Web SDKs 
│   ├── Full Web SDK 
│   │   └── Full SDK implementation 
│   ├── Lite Web SDK 
│   │   └── Lite SDK implementation 
│   ├── Secure Fields (Web) 
│   │   ├── Secure Fields (Payment) 
│   │   └── Secure Fields (Enrollment) 
│   ├── Alternative SDKs 
│   │   ├── Headless SDK (Enrollment Web) 
│   │   ├── Headless SDK (Payment Web) 
│   │   └── Seamless SDK (Payment Web) 
│   ├── Web SDK Changelog 
│   ├── Loader 
│   ├── Payment Status 
│   ├── SDK Customizations 
│   ├── Demo App 
│   └── 3DS Setup SDK (Deprecated) 
├── Android SDKs 
│   ├── Requirements 
│   ├── Android SDK Release Notes 
│   ├── Full SDK (Android) 
│   ├── Lite SDK (Android) 
│   │   ├── Lite SDK (Payment Android) 
│   │   └── Lite SDK (Enrollment Android) 
│   ├── Headless SDKs (Android) 
│   │   ├── Headless SDK (Enrollment Android) 
│   │   └── Headless SDK (Payment Android) 
│   ├── SDK Customizations 
│   └── Handle External Browser Return (callback_url) 
├── iOS SDKs 
│   ├── iOS SDK release notes 
│   ├── Full SDK (iOS) 
│   ├── Lite SDK (iOS) 
│   │   ├── Lite SDK (Payment iOS) 
│   │   └── Lite SDK (Enrollment iOS) 
│   ├── Headless SDKs (iOS) 
│   │   ├── Headless SDK (Enrollment iOS) 
│   │   └── Headless SDK (Payment iOS) 
│   ├── Loader 
│   ├── SDK Customizations 
│   └── Complementary features 
└── Country coverage 

SECURITY AND COMPLIANCE 
├── 3D Secure 
├── Card Fingerprint 
├── Card Verification 
├── PCI Compliance 
├── Stored Credentials 
├── Network Tokens 
└── Data Migration Processes 
    ├── Token Migration Process 
    ├── Via API 
    └── Exporting Tokens from Yuno 

PAYMENT FEATURES 
├── Enroll Payment Methods 
├── Enroll cards with payment links 
├── Installments 
│   ├── Merchant Installments 
│   └── Provider Installments 
├── Subscriptions 
│   └── Smart Retries 
├── Transaction Retries 
├── Split Payments Marketplace 
├── Account Funding Transactions (AFTs) 
├── Payment Details 
├── SCA Exemptions 
└── Cancel and Capture Flow 

PAYOUT MANAGEMENT 
└── Payouts 

DISPUTES 
├── Chargeback Management 
└── Chargeback response codes 

WEBHOOKS 
├── Webhooks overview 
├── Configure Webhooks 
└── Object and Examples 

WALLETS 
├── Wallets Overview 
├── Apple Pay 
│   ├── Prerequisites (Apple Pay) 
│   ├── Apple Pay Setup and Configuration 
│   ├── SDK Integration 
│   └── Direct Integration 
├── Google Pay™ 
│   ├── Direct Integration 
│   └── Integration Via Provider 
└── Click to Pay 

PLUGINS 
└── VTEX 
    ├── Configure Yuno as Provider 
    └── VTEX Headless Integration Guide 

ADDITIONAL SERVICES 
├── Aida AI Agent 
├── Card Account Updater 
├── Currency Conversion 
└── Building AI Integrations with Yuno's LLMs and MCP 
```

### Current problems

Our documentation has several critical issues that make it difficult for users to find what they need:

* **Overwhelming SDK section**: 50+ items in one section while other sections have only 1-13 items - completely unbalanced
* **No clear starting point**: Users don't know where to begin their integration journey
* **Scattered guidance**: Integration help is split between "GET STARTED" and "SDKs" sections
* **Version confusion**: Multiple versions of the same SDKs create unnecessary complexity
* **Hard to discover**: Important information is buried deep in the massive SDK section
* **Inconsistent structure**: Some sections are simple while others are overwhelming
* **Poor user experience**: Users struggle to navigate and find relevant information

### Platform limitations

**Why this matters**: Our documentation runs on **Readme**, which has strict rules about how deep we can organize content.

**The rules:**

* **Only 3 levels deep** - that's the maximum allowed
* **No exceptions** - the platform won't let us go deeper
* **Current violations** - some parts of our site already break these rules

**How it works:**

```
CATEGORY (Main section)
├── Section (Level 1)
│   └── Subsection (Level 2)
│       └── Page (Level 3 - Maximum allowed)
```

## Design approach

We applied proven patterns from leading platforms to solve the core problems:

* **Adyen**: Decision wizards and linear progression for clear guidance
* **Stripe**: Progressive disclosure and multiple entry points for accessibility
* **PayPal**: Use case-driven navigation and platform-specific groupings
* **Checkout.com**: Workflow-based content and feature-centric organization

The two options represent different approaches:

* **Option 1 (Adyen-Inspired)**: Linear progression with clear decision points
* **Option 2 (Stripe-Inspired)**: Layered information with multiple entry points

### Content mapping

Both options reorganize the existing 13 categories into different structures:

**Current 13 categories → New structures:**

**Option 1 (4 categories):**

* HOW YUNO WORKS, GET STARTED WITH YUNO → GET STARTED
* SDKs (consolidated), Payment Features, DIRECT INTEGRATION USE CASES → BUILD YOUR INTEGRATION
* Wallets, Security and Compliance, Webhooks, Additional Services → ADVANCED FEATURES
* USING YUNO, Disputes, Payout Management, PLUGINS → OPERATIONS & MANAGEMENT

**Option 2 (7 categories):**

* HOW YUNO WORKS, GET STARTED WITH YUNO → GET STARTED
* SDKs → SDKs
* Payment Features, DIRECT INTEGRATION USE CASES → PAYMENT FEATURES
* Security and Compliance, Webhooks → SECURITY & COMPLIANCE
* Wallets → WALLETS
* USING YUNO, Disputes, Payout Management, PLUGINS → OPERATIONS
* Additional Services → ADDITIONAL SERVICES

## Option 1: Adyen-Inspired User Journey Structure (4 Categories)

This structure follows Adyen's approach with clear decision guidance and linear progression from setup to implementation.

### Structure visualization (Only Categories)

```
GET STARTED 
BUILD YOUR INTEGRATION 
ADVANCED FEATURES 
OPERATIONS & MANAGEMENT 
```

### Structure (Readme Platform Compliant)

Reorganize the documentation into the following new structure that complies with Readme's 3-level maximum:

```
GET STARTED 
├── HOW YUNO WORKS 
│   ├── What is Yuno? 
│   ├── How Yuno Payment Process Works 
│   └── Basic Concepts 
│       ├── Customers 
│       ├── Sessions 
│       ├── Payments 
│       ├── Transactions 
│       ├── Tokens 
│       ├── Payment methods 
│       ├── Webhooks 
│       ├── Fraud prevention 
│       └── 3DS 
├── GET STARTED WITH YUNO 
│   ├── Overview 
│   ├── Set Up Your Account 
│   └── Create Your First Payment With SDK 
└── BUILD YOUR INTEGRATION 
    ├── Choose the Right Integration for You 
    ├── Direct Flow Integration 
    └── SDK Integration Overview 

BUILD YOUR INTEGRATION 
├── Seamless SDKs (Recommended) 
│   └── Seamless SDK 
├── Web SDKs 
│   ├── Full Web SDK 
│   │   └── Full SDK implementation 
│   ├── Lite Web SDK 
│   │   └── Lite SDK implementation 
│   ├── Secure Fields (Web) 
│   │   ├── Secure Fields (Payment) 
│   │   └── Secure Fields (Enrollment) 
│   ├── Alternative SDKs 
│   │   ├── Headless SDK (Enrollment Web) 
│   │   ├── Headless SDK (Payment Web) 
│   │   └── Seamless SDK (Payment Web) 
│   ├── Web SDK Changelog 
│   ├── Loader 
│   ├── Payment Status 
│   ├── SDK Customizations 
│   ├── Demo App 
│   └── 3DS Setup SDK (Deprecated) 
├── Mobile SDKs 
│   ├── Android SDKs 
│   │   ├── Requirements 
│   │   ├── Android SDK Release Notes 
│   │   ├── Full SDK (Android) 
│   │   ├── Lite SDK (Payment Android) 
│   │   ├── Lite SDK (Enrollment Android) 
│   │   ├── Headless SDK (Enrollment Android) 
│   │   ├── Headless SDK (Payment Android) 
│   │   ├── SDK Customizations 
│   │   └── Handle External Browser Return (callback_url) 
│   └── iOS SDKs 
│       ├── iOS SDK release notes 
│       ├── Full SDK (iOS) 
│       ├── Lite SDK (Payment iOS) 
│       ├── Lite SDK (Enrollment iOS) 
│       ├── Headless SDK (Enrollment iOS) 
│       ├── Headless SDK (Payment iOS) 
│       ├── Loader 
│       ├── SDK Customizations 
│       └── Complementary features 
├── PAYMENT FEATURES 
│   ├── Enroll Payment Methods 
│   ├── Enroll cards with payment links 
│   ├── Installments 
│   │   ├── Merchant Installments 
│   │   └── Provider Installments 
│   ├── Subscriptions 
│   │   └── Smart Retries 
│   ├── Transaction Retries 
│   ├── Split Payments Marketplace 
│   ├── Account Funding Transactions (AFTs) 
│   ├── Payment Details 
│   ├── SCA Exemptions 
│   └── Cancel and Capture Flow 
└── Direct Integration 
    ├── Set Up Payment Connection 
    ├── Create Payments 
    ├── Refund Payments 
    ├── Cancel Payments 
    ├── Capture Payments 
    ├── Build Reports 
    └── Yuno Testing Gateway 

ADVANCED FEATURES 
├── WALLETS 
│   ├── Wallets Overview 
│   ├── Apple Pay 
│   │   ├── Prerequisites (Apple Pay) 
│   │   ├── Apple Pay Setup and Configuration 
│   │   ├── SDK Integration 
│   │   └── Direct Integration 
│   ├── Google Pay™ 
│   │   ├── Direct Integration 
│   │   └── Integration Via Provider 
│   └── Click to Pay 
├── Security and Compliance 
│   ├── 3D Secure 
│   ├── Card Fingerprint 
│   ├── Card Verification 
│   ├── PCI Compliance 
│   ├── Stored Credentials 
│   ├── Network Tokens 
│   └── Data Migration Processes 
│       ├── Token Migration Process 
│       ├── Via API 
│       └── Exporting Tokens from Yuno 
├── Webhooks 
│   ├── Webhooks overview 
│   ├── Configure Webhooks 
│   └── Object and Examples 
└── ADDITIONAL SERVICES 
    ├── Aida AI Agent 
    ├── Card Account Updater 
    ├── Currency Conversion 
    └── Building AI Integrations with Yuno's LLMs and MCP 

OPERATIONS & MANAGEMENT 
├── USING YUNO 
│   ├── Environments 
│   ├── Dashboard Overview 
│   │   ├── Home 
│   │   ├── Connections 
│   │   ├── Routing 
│   │   ├── Monitors 
│   │   ├── Checkout Builder 
│   │   ├── Payments 
│   │   ├── Insights 
│   │   ├── Reconciliations 
│   │   └── Developers (Credentials) 
│   ├── Other tools 
│   │   ├── Risk Conditions 
│   │   ├── Payment Links 
│   │   └── Audit logs 
│   ├── Account Management 
│   ├── Teams and Roles 
│   ├── Single Sign-On (SSO) 
│   └── Security 
├── Disputes 
│   ├── Chargeback Management 
│   └── Chargeback response codes 
├── Payout Management 
│   └── Payouts 
└── PLUGINS 
    └── VTEX 
        ├── Configure Yuno as Provider 
        └── VTEX Headless Integration Guide 
```

**Key Changes for Readme Compliance:**

* **Flattened structure**: All major sections at top level within each category
* **Eliminated version nesting**: Consolidated multiple versions into single pages
* **Simplified navigation**: No more than 2 levels within each category
* **Platform-optimized**: Designed specifically for Readme's constraints

### Key benefits

* **Clear decision guidance**: Integration choice upfront with step-by-step wizards
* **Linear progression**: GET STARTED → BUILD → ADVANCED → OPERATIONS
* **Use case-driven navigation**: Clear separation between online, mobile, and direct integrations
* **Workflow-based content**: Aligns with business processes
* **Reduced complexity**: SDK section consolidated and reorganized
* **Platform compliance**: Fixes current Readme 3-level violations

## Option 2: Stripe-Inspired Progressive Disclosure Structure (7 Categories)

This organizes content using Stripe's approach with progressive disclosure and multiple entry points, using more categories for better content separation.

### Structure visualization (Only Categories)

```
GET STARTED
SDKs
PAYMENT FEATURES
SECURITY & COMPLIANCE
WALLETS
OPERATIONS
ADDITIONAL SERVICES
```

### Structure (Readme Platform Compliant)

Reorganize the documentation into the following new structure that complies with Readme's 3-level maximum:

```
GET STARTED
├── HOW YUNO WORKS 
│   ├── What is Yuno? 
│   ├── How Yuno Payment Process Works 
│   └── Basic Concepts 
│       ├── Customers 
│       ├── Sessions 
│       ├── Payments 
│       ├── Transactions 
│       ├── Tokens 
│       ├── Payment methods 
│       ├── Webhooks 
│       ├── Fraud prevention 
│       └── 3DS 
├── GET STARTED WITH YUNO 
│   ├── Overview 
│   ├── Set Up Your Account 
│   └── Create Your First Payment With SDK 
└── BUILD YOUR INTEGRATION 
    ├── Choose the Right Integration for You 
    ├── Direct Flow Integration 
    └── SDK Integration Overview 

SDKs
├── Seamless SDKs (Recommended) 
│   └── Seamless SDK 
├── Web SDKs 
│   ├── Full Web SDK 
│   │   └── Full SDK implementation 
│   ├── Lite Web SDK 
│   │   └── Lite SDK implementation 
│   ├── Secure Fields (Web) 
│   │   ├── Secure Fields (Payment) 
│   │   └── Secure Fields (Enrollment) 
│   ├── Alternative SDKs 
│   │   ├── Headless SDK (Enrollment Web) 
│   │   ├── Headless SDK (Payment Web) 
│   │   └── Seamless SDK (Payment Web) 
│   ├── Web SDK Changelog 
│   ├── Loader 
│   ├── Payment Status 
│   ├── SDK Customizations 
│   ├── Demo App 
│   └── 3DS Setup SDK (Deprecated) 
├── Mobile SDKs 
│   ├── Android SDKs 
│   │   ├── Requirements 
│   │   ├── Android SDK Release Notes 
│   │   ├── Full SDK (Android) 
│   │   ├── Lite SDK (Payment Android) 
│   │   ├── Lite SDK (Enrollment Android) 
│   │   ├── Headless SDK (Enrollment Android) 
│   │   ├── Headless SDK (Payment Android) 
│   │   ├── SDK Customizations 
│   │   └── Handle External Browser Return (callback_url) 
│   └── iOS SDKs 
│       ├── iOS SDK release notes 
│       ├── Full SDK (iOS) 
│       ├── Lite SDK (Payment iOS) 
│       ├── Lite SDK (Enrollment iOS) 
│       ├── Headless SDK (Enrollment iOS) 
│       ├── Headless SDK (Payment iOS) 
│       ├── Loader 
│       ├── SDK Customizations 
│       └── Complementary features 
└── Country coverage 

PAYMENT FEATURES
├── Enroll Payment Methods 
├── Enroll cards with payment links 
├── Installments 
│   ├── Merchant Installments 
│   └── Provider Installments 
├── Subscriptions 
│   └── Smart Retries 
├── Transaction Retries 
├── Split Payments Marketplace 
├── Account Funding Transactions (AFTs) 
├── Payment Details 
├── SCA Exemptions 
├── Cancel and Capture Flow 
└── Direct Integration 
    ├── Set Up Payment Connection 
    ├── Create Payments 
    ├── Refund Payments 
    ├── Cancel Payments 
    ├── Capture Payments 
    ├── Build Reports 
    └── Yuno Testing Gateway 

SECURITY & COMPLIANCE
├── 3D Secure 
├── Card Fingerprint 
├── Card Verification 
├── PCI Compliance 
├── Stored Credentials 
├── Network Tokens 
├── Data Migration Processes 
│   ├── Token Migration Process 
│   ├── Via API 
│   └── Exporting Tokens from Yuno 
└── Webhooks 
    ├── Webhooks overview 
    ├── Configure Webhooks 
    └── Object and Examples 

WALLETS
├── Wallets Overview 
├── Apple Pay 
│   ├── Prerequisites (Apple Pay) 
│   ├── Apple Pay Setup and Configuration 
│   ├── SDK Integration 
│   └── Direct Integration 
├── Google Pay™ 
│   ├── Direct Integration 
│   └── Integration Via Provider 
└── Click to Pay 

OPERATIONS
├── USING YUNO 
│   ├── Environments 
│   ├── Dashboard Overview 
│   │   ├── Home 
│   │   ├── Connections 
│   │   ├── Routing 
│   │   ├── Monitors 
│   │   ├── Checkout Builder 
│   │   ├── Payments 
│   │   ├── Insights 
│   │   ├── Reconciliations 
│   │   └── Developers (Credentials) 
│   ├── Other tools 
│   │   ├── Risk Conditions 
│   │   ├── Payment Links 
│   │   └── Audit logs 
│   ├── Account Management 
│   ├── Teams and Roles 
│   ├── Single Sign-On (SSO) 
│   └── Security 
├── Disputes 
│   ├── Chargeback Management 
│   └── Chargeback response codes 
├── Payout Management 
│   └── Payouts 
└── PLUGINS 
    └── VTEX 
        ├── Configure Yuno as Provider 
        └── VTEX Headless Integration Guide 

ADDITIONAL SERVICES
├── Aida AI Agent 
├── Card Account Updater 
├── Currency Conversion 
└── Building AI Integrations with Yuno's LLMs and MCP 
```

**Key Changes for Readme Compliance:**

* **Flattened structure**: All major sections at top level within each category
* **Eliminated version nesting**: Consolidated multiple versions into single pages
* **Simplified navigation**: No more than 2 levels within each category
* **Platform-optimized**: Designed specifically for Readme's constraints

### Key benefits

* **Progressive disclosure**: Basic concepts first, advanced topics layered
* **Multiple entry points**: Users can start where they're most comfortable
* **Use case-driven navigation**: Clear separation between online, mobile, and direct integrations
* **Workflow-based content**: Aligns with business processes
* **Platform consolidation**: Mobile SDKs combined for better organization
* **Platform compliance**: Fixes current Readme 3-level violations

## Recommendation

We recommend **Option 1 (Adyen-Inspired User Journey)** because it:

1. **Provides clear decision guidance** upfront using existing "Choose the Right Integration" content
2. **Follows a proven linear progression** that users expect from payment platform documentation
3. **Consolidates the overwhelming SDK section** by combining mobile platforms and reorganizing web SDKs
4. **Groups operations together** in one section, making administrative tasks easily discoverable
5. **Maintains simplicity** by using existing content without adding complexity
6. **Fixes platform compliance issues** by respecting Readme's 3-level maximum constraint

**Option 2** offers a different approach with **7 categories** that provides more granular organization but may be more complex for users to navigate initially.

### Key improvements

* **"Choose the Right Integration"**: Moves from buried position to clear entry point after understanding Yuno
* **SDK consolidation**: Mobile SDKs combined, web SDKs consolidated to reduce version fragmentation
* **Linear progression**: Clear path from learning → building → advanced features → operations
* **Better discoverability**: Related functionality grouped together
* **Reduced cognitive load**: 4 main sections instead of 13 scattered sections (Option 1) or 7 organized sections (Option 2)
* **Platform compliance**: Fixes current violations of 3-level maximum constraint

### Implementation notes

Both options address the core problems by incorporating best practices from leading payment platforms:

* Clear entry point for integration selection with decision wizards
* Progressive complexity from simple to advanced
* Use case-driven navigation ("Accept payments online" vs "Mobile payments")
* Workflow-based content aligned with business processes
* Logical grouping of related functionality
* Better discoverability of important content
* Consolidated SDK section that's easier to navigate
* Platform compliance with Readme's 3-level maximum constraint
