---
title: Yuno Documentation Structure Options
deprecated: false
hidden: false
metadata:
  robots: index
---
This document presents two improved menu structure options for the entire Yuno documentation. Both options use only existing content and aim to create a more intuitive user experience based on proven patterns from leading payment platforms.

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
Yuno Documentation (Current Site Structure)
├── HOW YUNO WORKS/ (12 items)
├── GET STARTED WITH YUNO/ (8 items)
├── USING YUNO/ (13 items)
├── DIRECT INTEGRATION USE CASES/ (7 items)
├── SDKs/ (50+ items - disproportionately large)
├── Security and Compliance/ (9 items)
├── Payment Features/ (12 items)
├── Payout Management/ (1 item)
├── Disputes/ (2 items)
├── Webhooks/ (3 items)
├── Wallets/ (7 items)
├── PLUGINS/ (2 items)
└── Additional Services/ (5 items)
```

### Key problems

* **Massive SDK section**: 50+ items vs. 1-13 items in other sections - completely disproportionate
* **Version fragmentation**: Multiple versions of same SDKs (v1.0, v1.1, v1.2, v1.3) creating confusion
* **No clear entry point**: Users overwhelmed by SDK section with no guidance on where to start
* **Inconsistent section depth**: Some sections with 1-2 items while SDK section has 50+
* **Poor discoverability**: Important integration guidance buried in massive SDK section
* **Mixed organization**: Well-organized sections alongside overwhelming SDK complexity
* **Scattered related content**: Integration guidance split between "GET STARTED" and "SDKs"

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

Reorganize the documentation into the following new structure:

```
Yuno Documentation
├── Get Started
│   ├── HOW YUNO WORKS/ (existing)
│   ├── GET STARTED WITH YUNO/ (existing)
│   └── Choose the Right Integration for You (move from GET STARTED)
├── Build Your Integration
│   ├── SDKs/ (reorganized and consolidated)
│   │   ├── Seamless SDKs (Recommended) (existing)
│   │   ├── Web SDKs (consolidated versions)
│   │   ├── Mobile SDKs (Android + iOS combined)
│   │   └── Build Your Integration (existing)
│   └── Payment Features/ (existing)
├── Advanced Features
│   ├── Wallets/ (existing)
│   ├── Security and Compliance/ (existing)
│   ├── Webhooks/ (existing)
│   └── Additional Services/ (existing)
└── Operations & Management
    ├── USING YUNO/ (existing)
    ├── Disputes/ (existing)
    ├── Payout Management/ (existing)
    ├── DIRECT INTEGRATION USE CASES/ (existing)
    └── PLUGINS/ (existing)
```

### Key benefits

* **Clear decision guidance**: Integration choice upfront with decision checklist
* **Linear progression**: Get Started → Build → Advanced → Operations
* **Adyen-style organization**: Proven pattern that users recognize
* **Related functionality**: Grouped by implementation phase
* **Reduced complexity**: SDK section consolidated and reorganized

## Option 2: Stripe-Inspired Progressive Disclosure Structure

This organizes content using Stripe's approach of progressive disclosure with multiple entry points and layered information depth.

### Structure

Reorganize the documentation into the following new structure:

```
Yuno Documentation
├── Quick Start
│   ├── HOW YUNO WORKS/ (existing)
│   ├── GET STARTED WITH YUNO/ (existing)
│   └── Choose the Right Integration for You (move from GET STARTED)
├── Core Integrations
│   ├── SDKs/ (reorganized and consolidated)
│   │   ├── Seamless SDKs (Recommended) (existing)
│   │   ├── Web SDKs (consolidated versions)
│   │   ├── Mobile SDKs (Android + iOS combined)
│   │   └── Build Your Integration (existing)
│   └── Payment Features/ (existing)
├── Advanced Features
│   ├── Wallets/ (existing)
│   ├── Security and Compliance/ (existing)
│   ├── Webhooks/ (existing)
│   └── Additional Services/ (existing)
└── Operations & Tools
    ├── USING YUNO/ (existing)
    ├── Disputes/ (existing)
    ├── Payout Management/ (existing)
    ├── DIRECT INTEGRATION USE CASES/ (existing)
    └── PLUGINS/ (existing)
```

### Key benefits

* **Progressive disclosure**: Basic concepts first, advanced topics layered
* **Multiple entry points**: Users can start where they're most comfortable
* **Stripe-style organization**: Familiar pattern for developers
* **Tool accessibility**: Operational resources easily discoverable
* **Platform consolidation**: Mobile SDKs combined for better organization

## Recommendation

We recommend **Option 1 (Adyen-Inspired User Journey)** because it:

1. **Provides clear decision guidance** upfront, addressing the main pain point of users not knowing which integration to choose
2. **Follows a proven linear progression** that users expect from payment platform documentation
3. **Consolidates the overwhelming SDK section** by combining mobile platforms and reorganizing web SDKs
4. **Groups operations together** in one section, making administrative tasks easily discoverable
5. **Maintains simplicity** by using existing content without adding complexity

### Key improvements

* **"Choose the Right Integration"**: Becomes the clear entry point after understanding Yuno
* **SDK consolidation**: Mobile SDKs combined, web SDKs consolidated to reduce version fragmentation (v1.0, v1.1, v1.2, v1.3)
* **Linear progression**: Clear path from learning → building → advanced features → operations
* **Better discoverability**: Related functionality grouped together
* **Reduced cognitive load**: 4 main sections instead of 13 scattered sections

### Implementation notes

Both options address the core problems identified in the current structure:

* Clear entry point for integration selection
* Logical grouping of related functionality
* Progressive complexity from simple to advanced
* Better discoverability of important content
* Professional organization that matches user expectations from other payment platforms
* Consolidated SDK section that's easier to navigate
