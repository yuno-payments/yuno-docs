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
A secure payment experience is essential for building user trust and increasing conversion rates. Customers are more likely to complete purchases when they know their sensitive data is protected from cyber threats and fraud. Achieving PCI compliance is a key step toward providing a safer user experience and earning your clients’ confidence.

## Yuno solution

Yuno offers a PCI-DSS Level 1 certified solution that allows you to securely tokenize your customers' payment information. This reduces your PCI scope and ensures robust data protection.

Tokenization is the process of collecting sensitive payment details and converting them into a short-term, single-use token that represents this information. Yuno manages and secures all sensitive payment data, maintaining PCI compliance on your behalf. The benefits of tokenization include:

* **Improved checkout experience**: Storing payment methods as tokens enables a faster and smoother checkout for your customers.
* **Support for subscriptions and recurring payments**: Tokenized payment methods can be reused for recurring billing, making subscription management seamless.
* **User control over payment information**: Yuno empowers users to manage their saved cards, providing transparency and control over their sensitive data.

By tokenizing payment information, Yuno streamlines payments across different providers. You only need to store a single token, making future transactions easier and more secure.

![PCI Compliance](https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/PCICompliance/pci_compliance1.png)

## What is PCI compliance?

PCI compliance refers to meeting the requirements of the Payment Card Industry Data Security Standard (PCI DSS). This set of security standards is designed to protect cardholder data and reduce payment card fraud. Any business that stores, processes, or transmits cardholder data must follow these rules. While governments do not directly enforce PCI DSS, card brands can impose penalties on merchants who fail to comply.

## Who must be PCI compliant

Any business that processes, transmits, or stores cardholder data—regardless of size or transaction volume—must be PCI compliant. If your business accepts card payments, you are required to follow PCI DSS. Even if you use a third-party provider to handle cardholder data, you still need to be certified. However, using a third-party solution like Yuno can significantly simplify the compliance process.

## PCI compliance levels

PCI compliance is divided into four levels, based on your company’s annual transaction volume. Each level has different security validation requirements:

* Level 1: More than 6 million debit or credit card transactions per year
* Level 2: Between 1 million and 6 million transactions per year
* Level 3: Between 20,000 and 1 million transactions per year
* Level 4: Fewer than 20,000 transactions per year

Level 1 merchants must complete an annual internal audit by a Qualified Security Assessor (QSA). Merchants in other levels typically need to submit an annual Self-Assessment Questionnaire (SAQ).

## How to become PCI compliant

To become PCI compliant, your business must follow the requirements set by the PCI Security Standards Council. There are 12 core requirements, but depending on your compliance level, you may need to address over 400 individual security controls, directives, and test procedures. These requirements are designed to ensure the safe handling and storage of cardholder data, and include annual validation cycles to maintain the necessary security standards.

## How Yuno helps you remain PCI compliant

Meeting PCI requirements can seem complex, but Yuno simplifies the process for you. By using Yuno, you can protect your business, reputation, and long-term sales with robust security and compliance.

Yuno tokenizes all transaction and cardholder data, so your systems never store or transmit sensitive card information. Instead, you only handle non-sensitive tokens, while Yuno securely stores and processes the actual card data.

Because your business has minimal contact with cardholder data, your PCI compliance process is much simpler. In most cases, you only need to complete a self-assessment questionnaire (SAQ) instead of undergoing a full internal audit. This reduces your compliance costs and helps you offer a safer payment experience to your customers.

Depending on your integration, you will likely need to complete either SAQ A or SAQ D:
- **SAQ A**: For businesses that fully outsource cardholder data functions and do not store, process, or transmit cardholder data. This questionnaire has 22 questions.
- **SAQ D**: For businesses that store cardholder data or do not use outsourced systems. This questionnaire has 329 questions.

If you integrate with Yuno using the [Direct Flow](doc:direct-flow), you must provide an Attestation of Compliance (AOC) signed by your company and a certified auditor.

## Take advantage of Yuno solutions

Yuno’s PCI-DSS Level 1 certified solution is available through several integration options. You can choose from Full Checkout, Lite Checkout, or Secure Fields SDKs—each designed to meet different business needs. These SDKs are available for both mobile and JavaScript environments. For more details, see the [SDK guide](doc:yuno-sdks).

<Image align="center" src="https://files.readme.io/158b4066d79b53ccbaa13042a21a244745cc9dcd03ca9509d88c94ee93ab5283-PCI_complience.png" />

## Where to find more information

For further information, you can use the [PCI official page](https://www.pcisecuritystandards.org/), where you will find complete documentation regarding data security standards. In addition, you can go directly to the [PCI Document Library](https://www.pcisecuritystandards.org/document_library/?category=saqs#results) to download the SAQ Instructions and Guidelines and the last versions of the SAQ self-assessment questionnaires.