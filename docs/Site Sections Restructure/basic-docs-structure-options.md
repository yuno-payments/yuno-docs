---
title: Basic Docs Structure Options
deprecated: false
hidden: false
metadata:
  robots: index
---
This document presents two improved menu structure options for the entire Yuno documentation. Both options use only existing content and aim to create a more intuitive user experience based on proven patterns from leading payment platforms.

> ℹ️ Note:
>
> This is the high-level overview. For complete Level 2 and Level 3 structure details, see the [Detailed Version](detailed-docs-structure-options.md).

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

The Yuno documentation contains 13 main sections with significant complexity imbalance:

### Current structure visualization

```
HOW YUNO WORKS (CATEGORY)
├── What is Yuno? (Level 1)
├── How Yuno Payment Process Works (Level 1)
└── Basic Concepts (Level 1)
GET STARTED WITH YUNO (CATEGORY)
├── Overview (Level 1)
├── Set Up Your Account (Level 1)
├── Create Your First Payment With SDK (Level 1)
└── BUILD YOUR INTEGRATION (Level 1)
USING YUNO (CATEGORY)
├── Environments (Level 1)
├── Dashboard Overview (Level 1)
├── Other tools (Level 1)
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
├── Yuno SDKs Introduction (Level 1)
├── Seamless SDKs (Recommended) (Level 1)
├── Web SDKs (Level 1)
├── Android SDKs (Level 1)
├── iOS SDKs (Level 1)
└── Country coverage (Level 1)
Security and Compliance (CATEGORY)
├── 3D Secure (Level 1)
├── Card Fingerprint (Level 1)
├── Card Verification (Level 1)
├── PCI Compliance (Level 1)
├── Stored Credentials (Level 1)
├── Network Tokens (Level 1)
└── Data Migration Processes (Level 1)
Payment Features (CATEGORY)
├── Enroll Payment Methods (Level 1)
├── Enroll cards with payment links (Level 1)
├── Installments (Level 1)
├── Subscriptions (Level 1)
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
├── Google Pay™ (Level 1)
└── Click to Pay (Level 1)
PLUGINS (CATEGORY)
└── VTEX (Level 1)
Additional Services (CATEGORY)
├── Aida AI Agent (Level 1)
├── Card Account Updater (Level 1)
├── Currency Conversion (Level 1)
├── Building AI Integrations with Yuno's LLMs and MCP (Level 1)
└── Enviroments (Level 1)
```

### Key problems

* **Massive SDK section**: Contains 50+ sub-items across multiple platforms vs. 1-13 items in other sections - completely disproportionate
* **Version fragmentation**: Multiple versions of same SDKs (v1.0, v1.1, v1.2, v1.3) creating confusion
* **No clear entry point**: Users overwhelmed by SDK section with no guidance on where to start
* **Inconsistent section depth**: Some sections with 1-2 Level 1 items while SDK section has 6 Level 1 items containing 50+ sub-items
* **Poor discoverability**: Important integration guidance buried in massive SDK section
* **Mixed organization**: Well-organized sections alongside overwhelming SDK complexity
* **Scattered related content**: Integration guidance split between "GET STARTED" and "SDKs"

### Readme Platform Constraint

**Critical Finding**: The Yuno documentation is hosted on the **Readme platform**, which has strict navigation limitations:

**Readme Platform Limitations:**

* **Maximum 3 levels** of navigation within each category
* **No subcategories beyond Level 3** are supported
* **Platform enforces these limits** - deeper nesting is not possible

**Current Structure Analysis:**

```
CATEGORY (Level 0 - Readme Category)
├── Level 1 (Section)
│   └── Level 2 (Subsection)
│       └── Level 3 (Maximum allowed - Page)
```

**Current violations identified:**

* **SDKs section exceeds limits**: Has 4+ levels in multiple areas
* **Web SDKs nested structure**: `SDKs → Web SDKs → Full Web SDK → Full Web SDK v1.3` (4 levels)
* **Version fragmentation**: Creates unnecessary depth that violates platform constraints
* **Multiple sections affected**: Several areas exceed the 3-level maximum

**Impact on Restructuring:**
This constraint makes restructuring **MORE necessary** because:

1. **Current site violates platform limits** - some areas are already broken
2. **Our proposed structure would fix violations** while improving organization
3. **Version consolidation becomes essential** - not just for UX but for platform compliance
4. **Simplified navigation required** - must work within Readme's constraints

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

### Content mapping

Both options reorganize the existing 13 categories into 4 new categories:

**Current 13 categories → New 4 categories:**

* HOW YUNO WORKS, GET STARTED WITH YUNO, BUILD YOUR INTEGRATION → Get Started/Quick Start
* SDKs (consolidated), Payment Features → Build Your Integration/Core Integrations
* Wallets, Security and Compliance, Webhooks, Additional Services → Advanced Features
* USING YUNO, Disputes, Payout Management, DIRECT INTEGRATION USE CASES, PLUGINS → Operations & Management/Operations & Tools

## Option 1: Adyen-Inspired User Journey Structure

This structure follows Adyen's proven approach of guiding users through a clear decision-making process with linear progression from setup to implementation.

### Structure (Readme Platform Compliant)

Reorganize the documentation into the following new structure that complies with Readme's 3-level maximum:

```
Get Started (CATEGORY)
├── HOW YUNO WORKS (Level 1)
├── GET STARTED WITH YUNO (Level 1)
└── BUILD YOUR INTEGRATION (Level 1)

Build Your Integration (CATEGORY)
├── Seamless SDKs (Recommended) (Level 1)
├── Web SDKs (Level 1)
├── Mobile SDKs (Level 1)
├── Payment Features (Level 1)
└── Direct Integration (Level 1)

Advanced Features (CATEGORY)
├── Wallets (Level 1)
├── Security and Compliance (Level 1)
├── Webhooks (Level 1)
└── Additional Services (Level 1)

Operations & Management (CATEGORY)
├── USING YUNO (Level 1)
├── Disputes (Level 1)
├── Payout Management (Level 1)
├── DIRECT INTEGRATION USE CASES (Level 1)
└── PLUGINS (Level 1)
```

**Key Changes for Readme Compliance:**

* **Flattened structure**: All major sections at Level 1 within each category
* **Eliminated version nesting**: Consolidated v1.0, v1.1, v1.2, v1.3 into single pages
* **Simplified navigation**: No more than 2 levels within each category
* **Platform-optimized**: Designed specifically for Readme's constraints

### Key benefits

* **Clear decision guidance**: Integration choice upfront using existing "Choose the Right Integration" content
* **Linear progression**: Get Started → Build → Advanced → Operations
* **Adyen-style organization**: Proven pattern that users recognize
* **Related functionality**: Grouped by implementation phase
* **Reduced complexity**: SDK section consolidated and reorganized
* **Platform compliance**: Fixes current Readme 3-level violations

## Option 2: Stripe-Inspired Progressive Disclosure Structure

This organizes content using Stripe's approach of progressive disclosure with multiple entry points and layered information depth.

### Structure (Readme Platform Compliant)

Reorganize the documentation into the following new structure that complies with Readme's 3-level maximum:

```
Quick Start (CATEGORY)
├── HOW YUNO WORKS (Level 1)
├── GET STARTED WITH YUNO (Level 1)
└── BUILD YOUR INTEGRATION (Level 1)

Core Integrations (CATEGORY)
├── Seamless SDKs (Recommended) (Level 1)
├── Web SDKs (Level 1)
├── Mobile SDKs (Level 1)
├── Payment Features (Level 1)
└── Direct Integration (Level 1)

Advanced Features (CATEGORY)
├── Wallets (Level 1)
├── Security and Compliance (Level 1)
├── Webhooks (Level 1)
└── Additional Services (Level 1)

Operations & Tools (CATEGORY)
├── USING YUNO (Level 1)
├── Disputes (Level 1)
├── Payout Management (Level 1)
├── DIRECT INTEGRATION USE CASES (Level 1)
└── PLUGINS (Level 1)
```

**Key Changes for Readme Compliance:**

* **Flattened structure**: All major sections at Level 1 within each category
* **Eliminated version nesting**: Consolidated v1.0, v1.1, v1.2, v1.3 into single pages
* **Simplified navigation**: No more than 2 levels within each category
* **Platform-optimized**: Designed specifically for Readme's constraints

### Key benefits

* **Progressive disclosure**: Basic concepts first, advanced topics layered
* **Multiple entry points**: Users can start where they're most comfortable
* **Stripe-style organization**: Familiar pattern for developers
* **Tool accessibility**: Operational resources easily discoverable
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

* **Readme platform compliance**: Fixes current violations of 3-level maximum constraint
* **"Choose the Right Integration"**: Moves from buried position to clear entry point after understanding Yuno
* **SDK consolidation**: Mobile SDKs combined, web SDKs consolidated to reduce version fragmentation (v1.0, v1.1, v1.2, v1.3)
* **Linear progression**: Clear path from learning → building → advanced features → operations
* **Better discoverability**: Related functionality grouped together
* **Reduced cognitive load**: 4 main sections instead of 13 scattered sections
* **Platform-optimized navigation**: Designed specifically for Readme's 3-level maximum constraint

### Implementation notes

Both options address the core problems identified in the current structure:

* Clear entry point for integration selection
* Logical grouping of related functionality
* Progressive complexity from simple to advanced
* Better discoverability of important content
* Professional organization that matches user expectations from other payment platforms
* Consolidated SDK section that's easier to navigate
