---
title: Co-badged Cards Compliance
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Co-badged Cards Compliance
  description: >-
    Comply with EU IFR Regulation 2015/751 Article 8 by allowing customers to
    choose their preferred card network for co-badged cards
  robots: index
next:
  description: ''
---

Co-badged cards are payment cards that support multiple payment networks (e.g., a card that supports both Cartes Bancaires and Visa). To comply with EU IFR Regulation 2015/751 Article 8, merchants must allow customers to choose which network to use when processing payments with co-badged cards.

## What are co-badged cards?

Co-badged cards are payment cards that carry multiple network logos and can be processed through different payment networks. Common examples include:

- Cards that support both a domestic network (e.g., Cartes Bancaires in France) and an international network (e.g., Visa or Mastercard)
- Cards that support multiple international networks

When a merchant accepts payments through multiple networks supported by the same card, EU regulations require that customers be given a choice of which network to use.

### Why co-badged cards exist

Co-badged cards provide flexibility for cardholders by allowing them to use their card through different payment networks depending on:
- Merchant acceptance (domestic vs. international networks)
- Geographic location (domestic networks may offer better rates or acceptance in certain regions)
- Network availability and routing preferences

The EU regulation ensures that when multiple network options are available, consumers have the right to choose which network processes their payment.

## When is compliance required?

Compliance with EU IFR Regulation 2015/751 Article 8 is required when:

- A merchant accepts both domestic and international networks (e.g., Cartes Bancaires and Visa)
- The customer's card supports multiple networks that the merchant accepts
- The transaction is processed within the European Economic Area (EEA)

If a merchant only accepts one network, or if the customer's card only supports one network that the merchant accepts, no network selection is required.

### Exceptions and Edge Cases

- **Single Network Acceptance**: If a merchant only accepts one network (e.g., only Visa), no network selection is required even if the card supports multiple networks.
- **Single Network Card**: If a customer's card only supports one network that the merchant accepts, no selection is needed.
- **Non-EEA Transactions**: The regulation applies to transactions processed within the EEA. Transactions outside the EEA are not subject to this requirement.
- **Network Unavailability**: If one of the supported networks is temporarily unavailable, merchants should still allow selection of the available network(s).

> 📘 Regulation Scope
>
> Regulation (EU) 2015/751 applies to all Member States of the European Union and the European Economic Area (EEA). The regulation entered into force on 8 June 2015, with Article 8 and related provisions applying from 9 June 2016.

## EU IFR Regulation 2015/751 Article 8

Regulation (EU) 2015/751, also known as the Interchange Fee Regulation (IFR), is a European Union regulation on interchange fees for card-based payment transactions. Article 8 specifically addresses co-badged cards and requires that merchants in the EEA allow customers to choose their preferred card network when using co-badged cards.

### Key Requirements of Article 8

Article 8 establishes the specific requirements for co-badged card compliance. The regulation requires:

- **Network Choice**: When a merchant accepts both domestic and international networks (e.g., Cartes Bancaires and Visa), the merchant must display a choice to EEA consumers allowing them to select whether to pay with the domestic or international network.
- **No Choice Required**: If a merchant only accepts one of the networks supported by the card, no network selection is required.
- **Consumer Control**: The regulation ensures consumers have control over which network processes their payment, promoting competition and transparency.

### Regulation Objectives

The Interchange Fee Regulation was created to address market fragmentation and promote fair competition in European payment processing. The regulation aims to:

- Promote competition between payment networks
- Give consumers control over which network processes their payments
- Ensure transparency in payment processing
- Reduce fragmentation in the European payment market
- Lower costs for merchants and consumers

### Regulation Timeline

Regulation (EU) 2015/751 has been implemented in phases:

- **Entry into Force**: 8 June 2015
- **Article 8 Application**: 9 June 2016 (along with Articles 7, 9, and 10)
- **Scope**: Applies to all EU Member States and EEA countries

> 📘 Regulatory Reference
>
> For the complete regulation text, including the full text of Article 8, see the [Official EU Regulation (EU) 2015/751](https://eur-lex.europa.eu/eli/reg/2015/751/oj). The regulation is also known as the Interchange Fee Regulation (IFR).

## SDK Integration (Out-of-the-box Compliance)

When using Yuno SDKs, merchants are compliant with co-badged card regulations out-of-the-box. The SDK automatically handles network detection and selection, ensuring compliance without additional merchant configuration.

### Supported SDK Versions

<!-- TODO: Update with specific version numbers once confirmed by SDK team -->
Co-badged card compliance is supported in specific versions of each Yuno SDK. The following SDK versions support co-badged card compliance:

- **Web SDK**: Version [TBD]
- **iOS SDK**: Version [TBD]
- **Android SDK**: Version 2.0.0 and later
- **React Native SDK**: Version [TBD]

### Automatic Compliance

The SDK automatically handles compliance with no configuration required. Compliance is enabled by default as soon as a merchant accepts both networks of a co-badged card.

The SDK automatically:

- Detects which networks are supported by the customer's card based on the card IIN (Issuer Identification Number)
- Displays network selection options to customers when multiple networks are available
- Handles the Mastercard-required phrase "Select card brand (optional)" automatically
- Stores the selected network for use in recurring payments

No additional configuration is required for basic compliance. The SDK handles all compliance requirements automatically.

### Network Selection UI

When a co-badged card is detected, the SDK automatically presents network selection options to the customer. The UI is not customizable and is consistently displayed across all platforms (Web, iOS, Android, React Native).

The UI includes:

- Clear display of available networks (e.g., Cartes Bancaires, Visa, Mastercard)
- The Mastercard-required phrase "Select card brand (optional)" which is always displayed when applicable
- User-friendly interface for network selection

![Network Selection UI](https://raw.githubusercontent.com/yuno-payments/yuno-docs/docs/co-badged-cards-compliance/docs/Security%20and%20Compliance/images/co-badged-cards-network-selection-ui.png)

### Recurring Payments

When a customer selects a network for their first payment, the SDK automatically stores this preference. For all subsequent recurring payments with the same card, the SDK automatically uses the initially selected network, ensuring compliance with the regulation requirement that all subsequent purchases be processed through the same network.

The SDK tracks and uses the selected network automatically—no additional merchant configuration is required.

## Direct Integration Compliance

For merchants using direct API integrations (not SDKs), additional steps are required to ensure compliance with co-badged card regulations.

### Merchant Requirements

<!-- TODO: Add specific requirements once confirmed by direct integration team -->
Merchants using direct API integrations must implement compliance measures themselves. To be compliant with EU IFR Regulation 2015/751 Article 8, merchants using direct integrations must:

1. Detect which networks are supported by the customer's card
2. Present network selection options to customers when multiple networks are available
3. Include the selected network in payment requests
4. Store the selected network for recurring payments
5. Display the Mastercard-required phrase "Select card brand (optional)" when applicable

### Card IIN Detection

<!-- TODO: Add API endpoint or method details once confirmed -->
Yuno provides methods to detect which networks are supported by a card based on the card IIN (Issuer Identification Number). The card IIN is the first 6-8 digits of the card number and identifies the card issuer and supported networks.

<!-- TODO: Add API endpoint documentation or code examples -->

### API Requirements

<!-- TODO: Add specific API endpoints and parameters once confirmed by direct integration team -->
To process payments with the selected network, merchants must include the network selection in their payment API requests. When creating a payment, merchants must include the selected network in the payment request. The following parameters are used:

<!-- TODO: Add parameter names and examples -->

```json
{
  "payment_method": {
    "detail": {
      "card": {
        "network": "selected_network_here"
      }
    }
  }
}
```

### Network Selection UI Implementation

Merchants must implement their own UI for network selection. The UI must:

- Display all available networks for the customer's card
- Allow customers to select their preferred network
- Display the Mastercard-required phrase "Select card brand (optional)" when applicable
- Be clear and user-friendly

### Mastercard Requirement

Mastercard requires that merchants display the phrase "Select card brand (optional)" when presenting network selection options. This phrase must be:

- Clearly visible to customers
- Displayed before or alongside network selection options
- Included even if network selection is optional

<!-- TODO: Add UI/UX guidelines or examples if available -->

### Recurring Payments

For recurring payments, merchants must ensure that the initially selected network is used for all subsequent payments with the same card. This requires:

1. Storing the selected network when the payment method is first used
2. Including the stored network in all subsequent payment requests for that payment method
3. Maintaining this preference across all recurring transactions

<!-- TODO: Add code examples or API documentation for storing and using network preference -->

### Network Preselection

<!-- TODO: Add implementation details once confirmed -->
Merchants may preselect a card network for customers, but customers must still be able to change the selection if they prefer a different network. If preselection is implemented:

- The preselected network should be clearly indicated
- Customers must be able to easily change the selection
- The preselection must comply with all other regulatory requirements

> ⚠️ Important
>
> Even when a network is preselected, customers must always have the ability to change their selection. The preselection should be a convenience feature, not a restriction.

Implementation details for merchant preselection are being confirmed.

## Technical Details

This section explains the technical mechanisms behind co-badged card compliance, including how networks are detected and how selections are stored.

### Card IIN and Brand Detection

Yuno uses the card IIN (Issuer Identification Number) to determine which networks are supported by a card. The IIN is the first 6-8 digits of the card number and provides information about:

- The card issuer
- Supported payment networks
- Card type (credit, debit, prepaid)

Based on the card IIN, Yuno automatically identifies which networks are available for a given card, enabling automatic network detection and selection. This detection happens automatically in the SDK—no merchant configuration is required.

### Network Selection Storage

When a customer selects a network, this preference must be stored and used for all future transactions with the same payment method. The selected network is associated with:

- The payment method (card)
- The customer (if applicable)
- The merchant account

This ensures that recurring payments maintain compliance by using the same network initially selected by the customer.

> ⚠️ Compliance Requirement
>
> Once a customer selects a network for their first payment with a co-badged card, that same network must be used for all subsequent payments with that card. Changing the network for recurring payments would violate the regulation unless the customer explicitly requests a change.

## Examples and Use Cases

The following examples demonstrate how co-badged card compliance works in practice, showing both scenarios where network selection is required and where it is not.

### Example: Cartes Bancaires and Visa Co-badged Card

A French customer uses a co-badged card that supports both Cartes Bancaires (domestic network) and Visa (international network). The merchant accepts both networks.

**Compliant Flow:**
1. Customer enters card details
2. System detects card supports both Cartes Bancaires and Visa
3. Customer is presented with network selection: "Cartes Bancaires" or "Visa"
4. Customer selects "Cartes Bancaires"
5. Payment is processed through Cartes Bancaires network
6. For future recurring payments, Cartes Bancaires is automatically used

### Example: Single Network Card

A customer uses a card that only supports Visa, and the merchant accepts Visa.

**Compliant Flow:**
1. Customer enters card details
2. System detects card only supports Visa
3. No network selection is required (only one network available)
4. Payment is processed through Visa network

### Example: Merchant Accepts Only One Network

A merchant only accepts Visa, and a customer uses a co-badged card that supports both Cartes Bancaires and Visa.

**Compliant Flow:**
1. Customer enters card details
2. System detects card supports both Cartes Bancaires and Visa
3. Merchant only accepts Visa, so no network selection is required
4. Payment is processed through Visa network (the only accepted network)

> 📘 Important Note
>
> Even if a card supports multiple networks, if the merchant only accepts one of those networks, no network selection is required. The regulation only applies when both the card and merchant support multiple networks.

## Summary

- **SDK Integration**: Merchants using Yuno SDKs are compliant out-of-the-box. No additional configuration required.
- **Direct Integration**: Merchants must implement network detection, selection UI, and network storage for recurring payments.
- **Regulatory Requirement**: EU IFR Regulation 2015/751 Article 8 requires network selection for co-badged cards in the EEA. The regulation entered into force on 8 June 2015, with Article 8 applying from 9 June 2016.
- **Mastercard Requirement**: The phrase "Select card brand (optional)" must be displayed when applicable.
- **Recurring Payments**: The initially selected network must be used for all subsequent payments with the same card.

<!-- TODO: Update all [TBD] sections and TODO comments once team provides information -->
