---
title: PCI Compliance
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: PCI Compliance
  description: >-
    The user payment experience is related directly to how safe they feel when
    using your platform to make a payment. Clients are likelier to buy from
    merchants that keep their sensitive data safe. Therefore, becoming PCI
    compliant makes you closer to a better user experience and gaining clients’
    trust.
  robots: index
next:
  description: ''
---
The Payment Card Industry Data Security Standard (PCI DSS) requires any business that stores, processes, or transmits cardholder data to meet a defined set of security controls. Non-compliance can result in fines from card brands and increased liability in the event of a breach.

By integrating with Yuno, your systems never store or transmit raw card data. Yuno's PCI DSS Level 1 solution handles all sensitive payment information through tokenization — replacing card data with a non-sensitive token before it ever reaches your infrastructure. This significantly reduces your PCI scope and the validation effort required.

![PCI Compliance](https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/PCICompliance/pci_compliance1.png)

## How Yuno reduces your PCI scope

When you integrate using Yuno's SDKs (Full Checkout, Lite Checkout, or Secure Fields), sensitive card data flows directly between the customer's browser or app and Yuno's secure environment. Your servers receive only tokens.

This means most merchants using Yuno's SDK qualify for the **SAQ A** — the shortest PCI self-assessment, composed of just 22 questions — rather than the full SAQ D, which has 329 questions and is required when a merchant stores or processes card data directly.

> 📘 Direct Flow
>
> If your integration uses the [Direct Flow](doc:direct-flow), your business handles card data directly and must provide an Attestation of Compliance (AOC) signed by your company and a certified auditor.

## What tokenization gives you

Beyond compliance, Yuno's tokenization provides practical benefits for your payment operations:

* **One-click checkout**: Returning customers pay with a single tap using their stored vaulted token
* **Recurring and subscription billing**: Tokenized payment methods are reused seamlessly across billing cycles
* **Cross-processor portability**: A single vaulted token works across all processors connected to your Yuno account
* **Reduced declines**: Network tokens automatically update when cards are renewed or reissued

For a full breakdown of token types and how they work, see [Tokens](doc:tokens).

<Image align="center" width="700px" src="https://files.readme.io/158b4066d79b53ccbaa13042a21a244745cc9dcd03ca9509d88c94ee93ab5283-PCI_complience.png" />

## Getting started

Yuno's SDK integrations are available for web (JavaScript) and mobile (iOS, Android, Flutter). Refer to the [SDK guide](doc:quickstart) to choose the right integration for your use case.

For more on PCI DSS requirements and self-assessment questionnaires, see the [PCI Security Standards Council](https://www.pcisecuritystandards.org/) and the [PCI Document Library](https://www.pcisecuritystandards.org/document_library/?category=saqs#results).
