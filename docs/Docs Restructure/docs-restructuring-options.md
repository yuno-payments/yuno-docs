---
title: Docs Restructuring Options
deprecated: false
hidden: false
metadata:
  robots: index
---
This document presents two improved menu structure options for the entire Yuno documentation. Both options use only existing content and aim to create a more intuitive user experience based on proven patterns from leading payment platforms.

> ℹ️ Note:
>
> This document provides complete Level 2 and Level 3 structure breakdown for both proposed options.

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
HOW YUNO WORKS (CATEGORY)
GET STARTED WITH YUNO (CATEGORY)
USING YUNO (CATEGORY)
DIRECT INTEGRATION USE CASES (CATEGORY)
SDKs (CATEGORY)
Security and Compliance (CATEGORY)
Payment Features (CATEGORY)
Payout Management (CATEGORY)
Disputes (CATEGORY)
Webhooks (CATEGORY)
Wallets (CATEGORY)
PLUGINS (CATEGORY)
Additional Services (CATEGORY)
```

### Complete structure visualization

The complete structure shows all categories with Level 2 and Level 3 items. The SDKs category contains over 50 sub-items, demonstrating the complexity imbalance.

```
HOW YUNO WORKS (CATEGORY)
├── What is Yuno? (Level 1)
├── How Yuno Payment Process Works (Level 1)
└── Basic Concepts (Level 1)
    ├── Customers (Level 2)
    ├── Sessions (Level 2)
    ├── Payments (Level 2)
    ├── Transactions (Level 2)
    ├── Tokens (Level 2)
    ├── Payment methods (Level 2)
    ├── Webhooks (Level 2)
    ├── Fraud prevention (Level 2)
    └── 3DS (Level 2)

GET STARTED WITH YUNO (CATEGORY)
├── Overview (Level 1)
├── Set Up Your Account (Level 1)
├── Create Your First Payment With SDK (Level 1)
└── BUILD YOUR INTEGRATION (Level 1)
    ├── Choose the Right Integration for You (Level 2)
    ├── Direct Flow Integration (Level 2)
    └── SDK Integration Overview (Level 2)

USING YUNO (CATEGORY)
├── Environments (Level 1)
├── Dashboard Overview (Level 1)
│   ├── Home (Level 2)
│   ├── Connections (Level 2)
│   ├── Routing (Level 2)
│   ├── Monitors (Level 2)
│   ├── Checkout Builder (Level 2)
│   ├── Payments (Level 2)
│   ├── Insights (Level 2)
│   ├── Reconciliations (Level 2)
│   └── Developers (Credentials) (Level 2)
├── Other tools (Level 1)
│   ├── Risk Conditions (Level 2)
│   ├── Payment Links (Level 2)
│   └── Audit logs (Level 2)
├── Account Management (Level 1)
├── Teams and Roles (Level 1)
├── Single Sign-On (SSO) (Level 1)
└── Security (Level 1)

DIRECT INTEGRATION USE CASES (CATEGORY)
├── Set Up Payment Connection (Level 1)
├── Create Payments (Level 1)
├── Refund Payments (Level 1)
├── Cancel Payments (Level 1)
├── Capture Payments (Level 1)
├── Build Reports (Level 1)
└── Yuno Testing Gateway (Level 1)

SDKs (CATEGORY)
├── Choose the Right Integration for You (Level 1)
├── Yuno SDKs Introduction (Level 1)
├── SDK Integration Overview (Level 1)
│   ├── Seamless SDK (Level 2)
│   ├── Full SDK (Level 2)
│   ├── Lite SDK (Payment) (Level 2)
│   ├── Lite SDK (Enrollment) (Level 2)
│   ├── Secure Fields (Level 2)
│   ├── Headless SDK (Payment) (Level 2)
│   └── Headless SDK (Enrollment) (Level 2)
├── Web SDKs (Level 1)
│   ├── Full Web SDK (Level 2)
│   │   └── Full SDK implementation (Level 3)
│   ├── Lite Web SDK (Level 2)
│   │   └── Lite SDK implementation (Level 3)
│   ├── Secure Fields (Web) (Level 2)
│   │   ├── Secure Fields (Payment) (Level 3)
│   │   └── Secure Fields (Enrollment) (Level 3)
│   ├── Alternative SDKs (Level 2)
│   │   ├── Headless SDK (Enrollment Web) (Level 3)
│   │   ├── Headless SDK (Payment Web) (Level 3)
│   │   └── Seamless SDK (Payment Web) (Level 3)
│   ├── Web SDK Changelog (Level 2)
│   ├── Loader (Level 2)
│   ├── Payment Status (Level 2)
│   ├── SDK Customizations (Level 2)
│   ├── Demo App (Level 2)
│   └── 3DS Setup SDK (Deprecated) (Level 2)
├── Android SDKs (Level 1)
│   ├── Requirements (Level 2)
│   ├── Android SDK Release Notes (Level 2)
│   ├── Full SDK (Android) (Level 2)
│   ├── Lite SDK (Android) (Level 2)
│   │   ├── Lite SDK (Payment Android) (Level 3)
│   │   └── Lite SDK (Enrollment Android) (Level 3)
│   ├── Headless SDKs (Android) (Level 2)
│   │   ├── Headless SDK (Enrollment Android) (Level 3)
│   │   └── Headless SDK (Payment Android) (Level 3)
│   ├── SDK Customizations (Level 2)
│   └── Handle External Browser Return (callback_url) (Level 2)
├── iOS SDKs (Level 1)
│   ├── iOS SDK release notes (Level 2)
│   ├── Full SDK (iOS) (Level 2)
│   ├── Lite SDK (iOS) (Level 2)
│   │   ├── Lite SDK (Payment iOS) (Level 3)
│   │   └── Lite SDK (Enrollment iOS) (Level 3)
│   ├── Headless SDKs (iOS) (Level 2)
│   │   ├── Headless SDK (Enrollment iOS) (Level 3)
│   │   └── Headless SDK (Payment iOS) (Level 3)
│   ├── Loader (Level 2)
│   ├── SDK Customizations (Level 2)
│   └── Complementary features (Level 2)
└── Country coverage (Level 1)

Security and Compliance (CATEGORY)
├── 3D Secure (Level 1)
├── Card Fingerprint (Level 1)
├── Card Verification (Level 1)
├── PCI Compliance (Level 1)
├── Stored Credentials (Level 1)
├── Network Tokens (Level 1)
└── Data Migration Processes (Level 1)
    ├── Token Migration Process (Level 2)
    ├── Via API (Level 2)
    └── Exporting Tokens from Yuno (Level 2)

Payment Features (CATEGORY)
├── Enroll Payment Methods (Level 1)
├── Enroll cards with payment links (Level 1)
├── Installments (Level 1)
│   ├── Merchant Installments (Level 2)
│   └── Provider Installments (Level 2)
├── Subscriptions (Level 1)
│   └── Smart Retries (Level 2)
├── Transaction Retries (Level 1)
├── Split Payments Marketplace (Level 1)
├── Account Funding Transactions (AFTs) (Level 1)
├── Payment Details (Level 1)
├── SCA Exemptions (Level 1)
└── Cancel and Capture Flow (Level 1)

Payout Management (CATEGORY)
└── Payouts (Level 1)

Disputes (CATEGORY)
├── Chargeback Management (Level 1)
└── Chargeback response codes (Level 1)

Webhooks (CATEGORY)
├── Webhooks overview (Level 1)
├── Configure Webhooks (Level 1)
└── Object and Examples (Level 1)

Wallets (CATEGORY)
├── Wallets Overview (Level 1)
├── Apple Pay (Level 1)
│   ├── Prerequisites (Apple Pay) (Level 2)
│   ├── Apple Pay Setup and Configuration (Level 2)
│   ├── SDK Integration (Level 2)
│   └── Direct Integration (Level 2)
├── Google Pay™ (Level 1)
│   ├── Direct Integration (Level 2)
│   └── Integration Via Provider (Level 2)
└── Click to Pay (Level 1)

PLUGINS (CATEGORY)
└── VTEX (Level 1)
    ├── Configure Yuno as Provider (Level 2)
    └── VTEX Headless Integration Guide (Level 2)

Additional Services (CATEGORY)
├── Aida AI Agent (Level 1)
├── Card Account Updater (Level 1)
├── Currency Conversion (Level 1)
└── Building AI Integrations with Yuno's LLMs and MCP (Level 1)
```

### Current problems

* **Massive SDK section**: Contains 50+ sub-items across multiple platforms vs. 1-13 items in other sections - completely disproportionate
* **Version fragmentation**: Multiple versions of same SDKs creating confusion (now consolidated)
* **No clear entry point**: Users overwhelmed by SDK section with no guidance on where to start
* **Inconsistent section depth**: Some sections with 1-2 Level 1 items while SDK section has 6 Level 1 items containing 50+ sub-items
* **Poor discoverability**: Important integration guidance buried in massive SDK section
* **Mixed organization**: Well-organized sections alongside overwhelming SDK complexity
* **Scattered related content**: Integration guidance split between "GET STARTED" and "SDKs"

### Platform limitations

**Critical constraint**: The Yuno documentation is hosted on the **Readme platform**, which enforces strict navigation limitations:

**Platform limitations:**

* **Maximum 3 levels** of navigation within each category
* **No subcategories beyond Level 3** are supported
* **Platform enforces these limits** - deeper nesting is not possible

**Structure analysis:**

```
CATEGORY (Level 0 - Readme Category)
├── Level 1 (Section)
│   └── Level 2 (Subsection)
│       └── Level 3 (Maximum allowed - Page)
```

**Current violations:**

* **SDKs section exceeds limits**: Has 4+ levels in multiple areas
* **Web SDKs nested structure**: `SDKs → Web SDKs → Full Web SDK → Version-specific pages` (4 levels)
* **Version fragmentation**: Creates unnecessary depth that violates platform constraints
* **Multiple sections affected**: Several areas exceed the 3-level maximum

**Impact on restructuring:**
This constraint makes restructuring **more critical** because:

1. **Current site violates platform limits** - some areas are already broken
2. **Our proposed structure would fix violations** while improving organization
3. **Version consolidation becomes essential** - not just for UX but for platform compliance
4. **Simplified navigation required** - must work within Readme's constraints

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

Both options reorganize the existing 13 categories into 4 new categories:

**Current 13 categories → New 4 categories:**

* HOW YUNO WORKS, GET STARTED WITH YUNO → Get Started
* SDKs (consolidated), Payment Features, DIRECT INTEGRATION USE CASES → Build Your Integration
* Wallets, Security and Compliance, Webhooks, Additional Services → Advanced Features
* USING YUNO, Disputes, Payout Management, PLUGINS → Operations & Management

## Option 1: Adyen-Inspired User Journey Structure

This structure follows Adyen's approach with clear decision guidance and linear progression from setup to implementation.

### Structure visualization (Only Categories)

```
Get Started (CATEGORY)
Build Your Integration (CATEGORY)
Advanced Features (CATEGORY)
Operations & Management (CATEGORY)
```

### Structure (Readme Platform Compliant)

Reorganize the documentation into the following new structure that complies with Readme's 3-level maximum:

```
Get Started (CATEGORY)
├── HOW YUNO WORKS (Level 1)
│   ├── What is Yuno? (Level 2)
│   ├── How Yuno Payment Process Works (Level 2)
│   └── Basic Concepts (Level 2)
│       ├── Customers (Level 3)
│       ├── Sessions (Level 3)
│       ├── Payments (Level 3)
│       ├── Transactions (Level 3)
│       ├── Tokens (Level 3)
│       ├── Payment methods (Level 3)
│       ├── Webhooks (Level 3)
│       ├── Fraud prevention (Level 3)
│       └── 3DS (Level 3)
├── GET STARTED WITH YUNO (Level 1)
│   ├── Overview (Level 2)
│   ├── Set Up Your Account (Level 2)
│   └── Create Your First Payment With SDK (Level 2)
└── BUILD YOUR INTEGRATION (Level 1)
    ├── Choose the Right Integration for You (Level 2)
    ├── Direct Flow Integration (Level 2)
    └── SDK Integration Overview (Level 2)

Build Your Integration (CATEGORY)
├── Seamless SDKs (Recommended) (Level 1)
│   └── Seamless SDK (Level 2)
├── Web SDKs (Level 1)
│   ├── Full Web SDK (Level 2)
│   │   └── Full SDK implementation (Level 3)
│   ├── Lite Web SDK (Level 2)
│   │   └── Lite SDK implementation (Level 3)
│   ├── Secure Fields (Web) (Level 2)
│   │   ├── Secure Fields (Payment) (Level 3)
│   │   └── Secure Fields (Enrollment) (Level 3)
│   ├── Alternative SDKs (Level 2)
│   │   ├── Headless SDK (Enrollment Web) (Level 3)
│   │   ├── Headless SDK (Payment Web) (Level 3)
│   │   └── Seamless SDK (Payment Web) (Level 3)
│   ├── Web SDK Changelog (Level 2)
│   ├── Loader (Level 2)
│   ├── Payment Status (Level 2)
│   ├── SDK Customizations (Level 2)
│   ├── Demo App (Level 2)
│   └── 3DS Setup SDK (Deprecated) (Level 2)
├── Mobile SDKs (Level 1)
│   ├── Android SDKs (Level 2)
│   │   ├── Requirements (Level 3)
│   │   ├── Android SDK Release Notes (Level 3)
│   │   ├── Full SDK (Android) (Level 3)
│   │   ├── Lite SDK (Payment Android) (Level 3)
│   │   ├── Lite SDK (Enrollment Android) (Level 3)
│   │   ├── Headless SDK (Enrollment Android) (Level 3)
│   │   ├── Headless SDK (Payment Android) (Level 3)
│   │   ├── SDK Customizations (Level 3)
│   │   └── Handle External Browser Return (callback_url) (Level 3)
│   └── iOS SDKs (Level 2)
│       ├── iOS SDK release notes (Level 3)
│       ├── Full SDK (iOS) (Level 3)
│       ├── Lite SDK (Payment iOS) (Level 3)
│       ├── Lite SDK (Enrollment iOS) (Level 3)
│       ├── Headless SDK (Enrollment iOS) (Level 3)
│       ├── Headless SDK (Payment iOS) (Level 3)
│       ├── Loader (Level 3)
│       ├── SDK Customizations (Level 3)
│       └── Complementary features (Level 3)
├── Payment Features (Level 1)
│   ├── Enroll Payment Methods (Level 2)
│   ├── Enroll cards with payment links (Level 2)
│   ├── Installments (Level 2)
│   │   ├── Merchant Installments (Level 3)
│   │   └── Provider Installments (Level 3)
│   ├── Subscriptions (Level 2)
│   │   └── Smart Retries (Level 3)
│   ├── Transaction Retries (Level 2)
│   ├── Split Payments Marketplace (Level 2)
│   ├── Account Funding Transactions (AFTs) (Level 2)
│   ├── Payment Details (Level 2)
│   ├── SCA Exemptions (Level 2)
│   └── Cancel and Capture Flow (Level 2)
└── Direct Integration (Level 1)
    ├── Set Up Payment Connection (Level 2)
    ├── Create Payments (Level 2)
    ├── Refund Payments (Level 2)
    ├── Cancel Payments (Level 2)
    ├── Capture Payments (Level 2)
    ├── Build Reports (Level 2)
    └── Yuno Testing Gateway (Level 2)

Advanced Features (CATEGORY)
├── Wallets (Level 1)
│   ├── Wallets Overview (Level 2)
│   ├── Apple Pay (Level 2)
│   │   ├── Prerequisites (Apple Pay) (Level 3)
│   │   ├── Apple Pay Setup and Configuration (Level 3)
│   │   ├── SDK Integration (Level 3)
│   │   └── Direct Integration (Level 3)
│   ├── Google Pay™ (Level 2)
│   │   ├── Direct Integration (Level 3)
│   │   └── Integration Via Provider (Level 3)
│   └── Click to Pay (Level 2)
├── Security and Compliance (Level 1)
│   ├── 3D Secure (Level 2)
│   ├── Card Fingerprint (Level 2)
│   ├── Card Verification (Level 2)
│   ├── PCI Compliance (Level 2)
│   ├── Stored Credentials (Level 2)
│   ├── Network Tokens (Level 2)
│   └── Data Migration Processes (Level 2)
│       ├── Token Migration Process (Level 3)
│       ├── Via API (Level 3)
│       └── Exporting Tokens from Yuno (Level 3)
├── Webhooks (Level 1)
│   ├── Webhooks overview (Level 2)
│   ├── Configure Webhooks (Level 2)
│   └── Object and Examples (Level 2)
└── Additional Services (Level 1)
    ├── Aida AI Agent (Level 2)
    ├── Card Account Updater (Level 2)
    ├── Currency Conversion (Level 2)
    └── Building AI Integrations with Yuno's LLMs and MCP (Level 2)

Operations & Management (CATEGORY)
├── USING YUNO (Level 1)
│   ├── Environments (Level 2)
│   ├── Dashboard Overview (Level 2)
│   │   ├── Home (Level 3)
│   │   ├── Connections (Level 3)
│   │   ├── Routing (Level 3)
│   │   ├── Monitors (Level 3)
│   │   ├── Checkout Builder (Level 3)
│   │   ├── Payments (Level 3)
│   │   ├── Insights (Level 3)
│   │   ├── Reconciliations (Level 3)
│   │   └── Developers (Credentials) (Level 3)
│   ├── Other tools (Level 2)
│   │   ├── Risk Conditions (Level 3)
│   │   ├── Payment Links (Level 3)
│   │   └── Audit logs (Level 3)
│   ├── Account Management (Level 2)
│   ├── Teams and Roles (Level 2)
│   ├── Single Sign-On (SSO) (Level 2)
│   └── Security (Level 2)
├── Disputes (Level 1)
│   ├── Chargeback Management (Level 2)
│   └── Chargeback response codes (Level 2)
├── Payout Management (Level 1)
│   └── Payouts (Level 2)
└── PLUGINS (Level 1)
    └── VTEX (Level 2)
        ├── Configure Yuno as Provider (Level 3)
        └── VTEX Headless Integration Guide (Level 3)
```

**Key Changes for Readme Compliance:**

* **Flattened structure**: All major sections at Level 1 within each category
* **Eliminated version nesting**: Consolidated multiple versions into single pages
* **Simplified navigation**: No more than 2 levels within each category
* **Platform-optimized**: Designed specifically for Readme's constraints

### Key benefits

* **Clear decision guidance**: Integration choice upfront with step-by-step wizards
* **Linear progression**: Get Started → Build → Advanced → Operations
* **Use case-driven navigation**: Clear separation between online, mobile, and direct integrations
* **Workflow-based content**: Aligns with business processes
* **Reduced complexity**: SDK section consolidated and reorganized
* **Platform compliance**: Fixes current Readme 3-level violations

## Option 2: Stripe-Inspired Progressive Disclosure Structure

This organizes content using Stripe's approach with progressive disclosure and multiple entry points.

### Structure visualization (Only Categories)

```
Get Started (CATEGORY)
Build Your Integration (CATEGORY)
Advanced Features (CATEGORY)
Operations & Management (CATEGORY)
```

### Structure (Readme Platform Compliant)

Reorganize the documentation into the following new structure that complies with Readme's 3-level maximum:

```
Get Started (CATEGORY)
├── HOW YUNO WORKS (Level 1)
│   ├── What is Yuno? (Level 2)
│   ├── How Yuno Payment Process Works (Level 2)
│   └── Basic Concepts (Level 2)
│       ├── Customers (Level 3)
│       ├── Sessions (Level 3)
│       ├── Payments (Level 3)
│       ├── Transactions (Level 3)
│       ├── Tokens (Level 3)
│       ├── Payment methods (Level 3)
│       ├── Webhooks (Level 3)
│       ├── Fraud prevention (Level 3)
│       └── 3DS (Level 3)
├── GET STARTED WITH YUNO (Level 1)
│   ├── Overview (Level 2)
│   ├── Set Up Your Account (Level 2)
│   └── Create Your First Payment With SDK (Level 2)
└── BUILD YOUR INTEGRATION (Level 1)
    ├── Choose the Right Integration for You (Level 2)
    ├── Direct Flow Integration (Level 2)
    └── SDK Integration Overview (Level 2)

Build Your Integration (CATEGORY)
├── Seamless SDKs (Recommended) (Level 1)
│   └── Seamless SDK (Level 2)
├── Web SDKs (Level 1)
│   ├── Full Web SDK (Level 2)
│   │   └── Full SDK implementation (Level 3)
│   ├── Lite Web SDK (Level 2)
│   │   └── Lite SDK implementation (Level 3)
│   ├── Secure Fields (Web) (Level 2)
│   │   ├── Secure Fields (Payment) (Level 3)
│   │   └── Secure Fields (Enrollment) (Level 3)
│   ├── Alternative SDKs (Level 2)
│   │   ├── Headless SDK (Enrollment Web) (Level 3)
│   │   ├── Headless SDK (Payment Web) (Level 3)
│   │   └── Seamless SDK (Payment Web) (Level 3)
│   ├── Web SDK Changelog (Level 2)
│   ├── Loader (Level 2)
│   ├── Payment Status (Level 2)
│   ├── SDK Customizations (Level 2)
│   ├── Demo App (Level 2)
│   └── 3DS Setup SDK (Deprecated) (Level 2)
├── Mobile SDKs (Level 1)
│   ├── Android SDKs (Level 2)
│   │   ├── Requirements (Level 3)
│   │   ├── Android SDK Release Notes (Level 3)
│   │   ├── Full SDK (Android) (Level 3)
│   │   ├── Lite SDK (Payment Android) (Level 3)
│   │   ├── Lite SDK (Enrollment Android) (Level 3)
│   │   ├── Headless SDK (Enrollment Android) (Level 3)
│   │   ├── Headless SDK (Payment Android) (Level 3)
│   │   ├── SDK Customizations (Level 3)
│   │   └── Handle External Browser Return (callback_url) (Level 3)
│   └── iOS SDKs (Level 2)
│       ├── iOS SDK release notes (Level 3)
│       ├── Full SDK (iOS) (Level 3)
│       ├── Lite SDK (Payment iOS) (Level 3)
│       ├── Lite SDK (Enrollment iOS) (Level 3)
│       ├── Headless SDK (Enrollment iOS) (Level 3)
│       ├── Headless SDK (Payment iOS) (Level 3)
│       ├── Loader (Level 3)
│       ├── SDK Customizations (Level 3)
│       └── Complementary features (Level 3)
├── Payment Features (Level 1)
│   ├── Enroll Payment Methods (Level 2)
│   ├── Enroll cards with payment links (Level 2)
│   ├── Installments (Level 2)
│   │   ├── Merchant Installments (Level 3)
│   │   └── Provider Installments (Level 3)
│   ├── Subscriptions (Level 2)
│   │   └── Smart Retries (Level 3)
│   ├── Transaction Retries (Level 2)
│   ├── Split Payments Marketplace (Level 2)
│   ├── Account Funding Transactions (AFTs) (Level 2)
│   ├── Payment Details (Level 2)
│   ├── SCA Exemptions (Level 2)
│   └── Cancel and Capture Flow (Level 2)
└── Direct Integration (Level 1)
    ├── Set Up Payment Connection (Level 2)
    ├── Create Payments (Level 2)
    ├── Refund Payments (Level 2)
    ├── Cancel Payments (Level 2)
    ├── Capture Payments (Level 2)
    ├── Build Reports (Level 2)
    └── Yuno Testing Gateway (Level 2)

Advanced Features (CATEGORY)
├── Wallets (Level 1)
│   ├── Wallets Overview (Level 2)
│   ├── Apple Pay (Level 2)
│   │   ├── Prerequisites (Apple Pay) (Level 3)
│   │   ├── Apple Pay Setup and Configuration (Level 3)
│   │   ├── SDK Integration (Level 3)
│   │   └── Direct Integration (Level 3)
│   ├── Google Pay™ (Level 2)
│   │   ├── Direct Integration (Level 3)
│   │   └── Integration Via Provider (Level 3)
│   └── Click to Pay (Level 2)
├── Security and Compliance (Level 1)
│   ├── 3D Secure (Level 2)
│   ├── Card Fingerprint (Level 2)
│   ├── Card Verification (Level 2)
│   ├── PCI Compliance (Level 2)
│   ├── Stored Credentials (Level 2)
│   ├── Network Tokens (Level 2)
│   └── Data Migration Processes (Level 2)
│       ├── Token Migration Process (Level 3)
│       ├── Via API (Level 3)
│       └── Exporting Tokens from Yuno (Level 3)
├── Webhooks (Level 1)
│   ├── Webhooks overview (Level 2)
│   ├── Configure Webhooks (Level 2)
│   └── Object and Examples (Level 2)
└── Additional Services (Level 1)
    ├── Aida AI Agent (Level 2)
    ├── Card Account Updater (Level 2)
    ├── Currency Conversion (Level 2)
    └── Building AI Integrations with Yuno's LLMs and MCP (Level 2)

Operations & Management (CATEGORY)
├── USING YUNO (Level 1)
│   ├── Environments (Level 2)
│   ├── Dashboard Overview (Level 2)
│   │   ├── Home (Level 3)
│   │   ├── Connections (Level 3)
│   │   ├── Routing (Level 3)
│   │   ├── Monitors (Level 3)
│   │   ├── Checkout Builder (Level 3)
│   │   ├── Payments (Level 3)
│   │   ├── Insights (Level 3)
│   │   ├── Reconciliations (Level 3)
│   │   └── Developers (Credentials) (Level 3)
│   ├── Other tools (Level 2)
│   │   ├── Risk Conditions (Level 3)
│   │   ├── Payment Links (Level 3)
│   │   └── Audit logs (Level 3)
│   ├── Account Management (Level 2)
│   ├── Teams and Roles (Level 2)
│   ├── Single Sign-On (SSO) (Level 2)
│   └── Security (Level 2)
├── Disputes (Level 1)
│   ├── Chargeback Management (Level 2)
│   └── Chargeback response codes (Level 2)
├── Payout Management (Level 1)
│   └── Payouts (Level 2)
└── PLUGINS (Level 1)
    └── VTEX (Level 2)
        ├── Configure Yuno as Provider (Level 3)
        └── VTEX Headless Integration Guide (Level 3)
```

**Key Changes for Readme Compliance:**

* **Flattened structure**: All major sections at Level 1 within each category
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

### Key improvements

* **"Choose the Right Integration"**: Moves from buried position to clear entry point after understanding Yuno
* **SDK consolidation**: Mobile SDKs combined, web SDKs consolidated to reduce version fragmentation
* **Linear progression**: Clear path from learning → building → advanced features → operations
* **Better discoverability**: Related functionality grouped together
* **Reduced cognitive load**: 4 main sections instead of 13 scattered sections
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
