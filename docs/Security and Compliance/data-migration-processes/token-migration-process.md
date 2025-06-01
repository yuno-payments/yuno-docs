---
title: Token Migration Process
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    Token migration is the process by which the card numbers stored in a
    provider are transferred to Yuno's vault. This process involves the
    generation of a new token for each card.
  robots: index
next:
  description: ''
---
Token migration is the process of transferring card numbers from an existing provider to Yuno's secure vault. During this process, a new token is generated for each card, ensuring seamless continuity and security for payment processing. The token migration process consists of three main steps:

1. The merchant requests the token migration process to its current payment processor.
2. Yuno and the payment provider collaborate to securely import all card data into the Yuno Token Vault.
3. The merchant uses Yuno's Token Migration API to map the tokens from the payment provider to the `vaulted_tokens` of Yuno.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>First step</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tTo initiate the token migration process, contact your business advisor at Yuno to assess the viability and schedule of the procedure.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Importing cards from a gateway account (steps 1 and 2)

Since token migration involves sensitive information, strict security protocols must be followed. To import card data into Yuno from an existing gateway, complete the following steps:

1. **Coordinate with the Current Gateway:** Contact your current third-party vault or gateway and request an export of the payment method data. Ensure you follow their specified protocols.
2. **Complete the Formal Request:** Submit a formal request to Yuno, ensuring all required details and processes are documented. The gateway's response time and procedures will determine the data transfer process.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer alert\">\n    <div class=\"verticalLineAlert \"></div>\n    <div>\n      <h3>Your responsibilities when migrating tokens</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tYou are responsible for managing communication with your gateway provider throughout the migration process. The Yuno team will support and collaborate directly with the third-party vault/gateway to facilitate the importing process.\n          </p><p>\n          In addition, the customer subscription information, including amounts, dates, etc., must be obtained directly from the exporting entity, as Yuno will not extract this data from encrypted files.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Data transfer security</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tAll data throughout the migration process is encripted using PGP keys and transferred using SFTP (Secure File Transfer Protocol).\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Client Side Requirements (step 3)

At this point, you will provide the user's data (the buyers) and their existing payment methods.

Currently, you can execute the token migration process using the Yuno API, which is specifically designed for merchant use. As a merchant, you will use this API to:

1. **Add customers**: Create customers into the Yuno system.
2. **Enroll payment methods**: Enroll payment methods acquired from payment processors for each customer on the Yuno system.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine \"></div>\n    <div>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tThe API migration option is available for merchants to use to manage their customers and their respective payment data.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


Access the step-by-step guide on how to perform the token migration using the API using the button below:

[block:html]
{
  "html": "<body>\n  \n  <section class=\"link_cards_container\">\n\n    <a class=\"card\" onclick=\"window.location='via-api';\">\n      <div class=\"svg_content\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"15\" viewBox=\"0 0 14 15\" fill=\"none\">\n          <path\n            d=\"M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z\"\n            fill=\"#513CE1\" />\n        </svg>\n      </div>\n      <h4>Token migration via API</h4>\n    </a>\n\n  </section>\n\n</body>"
}
[/block]


### Data format

Yuno defines the required parameters for each customer and credit card to proceed with the migration process. The list of the required parameters is present below:

- Account ID
- Merchant customer ID
- First name
- Last name
- Email
- Country
- Document number
- Document type
- Payment method type
- Payment method ID
- Payment method token

You can use the [Customer Object](ref:the-customer-object) and [Payment Method Object](ref:the-payment-method-object-api) to find all the possible parameters that can be used when importing/creating customers or enrolling payment objects.

Different technical limitations associated with alternative payment methods may render them ineligible for migration between service providers. Contact the Yuno support team if you're contemplating the migration of alternative payment method tokens, such as Mercado Pago Wallet Connect, Bancolombia Tokenbox, etc., to the Yuno vault.

## Data validation

To ensure efficient processing and prevent delays, please include the following information when communicating with Support:

- The external identifier name to be used for the import.
- An approximate count of the expected number of payment methods to be included (a rough estimate is acceptable).
- Any known data gaps, such as missing names or expiration dates.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer alert\">\n    <div class=\"verticalLineAlert \"></div>\n    <div>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tYuno does not validate expiration dates during credit card import.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Data protection

When making payments through Yuno, the platform connects to payment processors. Yuno tokenizes and encrypts the data to ensure data security, simplifying the PCI compliance process. However, you remain responsible for managing and protecting your customer's (the buyer's) data. In addition, you are responsible for communicating any additional fees or other issues to your customer.

## Gateway / Payment Provider Requirements

To move forward with the process, you'll be requested to provide the following:

- A public SSH key (you can provide one for production and another for testing). For this, you can use the following command: `ssh-keygen -t rsa -b 4096 -C your_email@example.com` 
- The outbound IPs that will be used during the migration.
- A template file of the data to be migrated to understand its structure. It must include the following mandatory data:
  - **Cardholder Name**: The full name of the cardholder as stored by the current provider.
  - **Expiration Date**: The expiry date of the card.
  - **Card Number**: The complete card number (PAN) that will be tokenized by Yuno.
  - **Card ID**: A unique identifier assigned to each card by the current provider, used by the client for referencing that card during transactions.

### PGP Public Key

Use our public key to encrypt the PCI-sensitive files you send to Yuno.

[block:html]
{
  "html": "<style>\n  /* Tabs container */\n  .tab-header {\n    display: flex;\n    border-bottom: 2px solid #ddd;\n    margin-bottom: 20px;\n  }\n\n  /* Hide radio buttons */\n  input[type=\"radio\"] {\n    display: none;\n  }\n\n  /* Tab labels */\n  .tab-label {\n    text-decoration: none;\n    color: #333;\n    padding: 10px 20px;\n    transition: all 0.3s ease;\n    font-size: 16px;\n    margin-right: 10px;\n    border-bottom: 2px solid transparent;\n    cursor: pointer;\n  }\n\n  .tab-label:hover,\n  .tab-label:focus {\n    color: #000;\n  }\n\n  /* Tab content hidden by default */\n  .tab-panel {\n    display: none;\n  }\n\n  /* Show active tab content */\n  #sandbox:checked~.tab-panel#sandbox,\n  #production:checked~.tab-panel#production {\n    display: block;\n  }\n\n  /* Style for active tab */\n  #sandbox:checked~.tab-header label[for=\"sandbox\"],\n  #production:checked~.tab-header label[for=\"production\"] {\n    color: #000;\n    border-bottom: 2px solid #513CE1;\n  }\n\n  /* Expandable card container */\n  .expandable-card {\n    border-radius: 10px;\n    border: 1px solid #614ad623;\n    display: flex;\n    transition: all 0.2s;\n  }\n\n  /* Hover effect for expandable card */\n  .expandable-card:hover {\n    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);\n  }\n\n  /* Expand/Collapse icon styling */\n  .icon {\n    fill: rebeccapurple;\n    transition: 0.3s ease;\n    pointer-events: none;\n  }\n\n  .icon-close {\n    display: none;\n  }\n\n  details[open] .icon-close {\n    display: inline;\n  }\n\n  details[open] .icon-expand {\n    display: none;\n  }\n\n  /* Summary styles */\n  .expandable-summary {\n    padding: 0.8rem 1rem;\n    border-radius: 10px;\n    display: flex;\n    align-items: center;\n    cursor: pointer;\n  }\n\n  /* Title inside expandable summary */\n  .expandable-title {\n    font-size: 1rem;\n    margin: 0;\n  }\n\n  /* Summary icon alignment */\n  .expandable-icon-container {\n    margin-left: auto;\n    display: flex;\n  }\n\n  /* Content area inside expandable card */\n  .expandable-content {\n    padding: 0.5rem;\n  }\n\n  /* Animation for expandable content */\n  details[open] div {\n    animation: sweep 0.3s ease-in-out;\n  }\n\n  @keyframes sweep {\n    0% {\n      opacity: 0;\n      margin-left: -10px;\n    }\n\n    100% {\n      opacity: 1;\n      margin-left: 0px;\n    }\n  }\n</style>\n\n<body>\n  <!-- Radio buttons for tab control -->\n  <input type=\"radio\" id=\"sandbox\" name=\"tabs\" checked>\n  <input type=\"radio\" id=\"production\" name=\"tabs\">\n\n  <!-- Tab header -->\n  <div class=\"tab-header\">\n    <label for=\"sandbox\" class=\"tab-label\">Sandbox</label>\n    <label for=\"production\" class=\"tab-label\">Production</label>\n  </div>\n\n  <!-- Tab content -->\n  <div class=\"tab-panel\" id=\"sandbox\">\n    <p>Email: <a href=\"mailto:security-migrations@y.uno\">security-migrations@y.uno</a></p>\n    <p>Comment: For encrypting sensitive data. Environment: sandbox</p>\n    <p>Created: 22 Nov 2024</p>\n    <p>Expires: 22 Nov 2026</p>\n    <p>Key ID: B342E3D3</p>\n    <p>Length: 4096</p>\n    <p>Algorithm: RSA</p>\n    <p>Fingerprint: 2B37 55FA 426A B1D0 2061 4C6C 919C 4D81 B342 E3D3</p>\n\n    <!-- Public PGP Key Download Section -->\n    <section class=\"link_cards_container\">\n      <a class=\"card\"\n        onclick=\"window.location='https://yuno-public-keys.prod.y.uno/generic-pgp-keys_public_key_sandbox.asc';\">\n        <div class=\"svg_content\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\">\n            <path\n              d=\"M8 1.33334C8.36819 1.33334 8.66667 1.63181 8.66667 2.00001V9.12668L10.7933 6.99998C11.0512 6.74211 11.4487 6.74211 11.7067 6.99998C11.9646 7.25786 11.9646 7.65541 11.7067 7.91328L8.35334 11.2667C8.15842 11.4616 7.84159 11.4616 7.64667 11.2667L4.29334 7.91328C4.03546 7.65541 4.03546 7.25786 4.29334 6.99998C4.55121 6.74211 4.94876 6.74211 5.20667 6.99998L7.33334 9.12668V2.00001C7.33334 1.63181 7.63181 1.33334 8 1.33334ZM2.66667 13.3333C2.29847 13.3333 2 13.6318 2 14C2 14.3682 2.29847 14.6667 2.66667 14.6667H13.3333C13.7015 14.6667 14 14.3682 14 14C14 13.6318 13.7015 13.3333 13.3333 13.3333H2.66667Z\"\n              fill=\"#513CE1\" />\n          </svg>\n        </div>\n        <h4>Public PGP Key</h4>\n      </a>\n    </section>\n    \n    <br />\n\n    <details class=\"expandable-card\">\n      <summary class=\"expandable-summary\">\n        <span class=\"expandable-title\">Sandbox Key</span>\n        <div class=\"expandable-icon-container\">\n          <svg class=\"icon icon-expand\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n            <path fill-rule=\"evenodd\"\n              d=\"M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z\" />\n          </svg>\n          <svg class=\"icon icon-close\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n            <path fill-rule=\"evenodd\"\n              d=\"M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z\" />\n          </svg>\n        </div>\n      </summary>\n      \n      <br />\n      \n      <div class=\"expandable-content\">\n        <pre>-----BEGIN PGP PUBLIC KEY BLOCK-----\n\n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\nJiRYUpjGug==\n=LuK0\n-----END PGP PUBLIC KEY BLOCK-----</pre>\n      </div>\n    </details>\n  </div>\n\n  <div class=\"tab-panel\" id=\"production\">\n    <p>Email: <a href=\"mailto:security-migrations@y.uno\">security-migrations@y.uno</a></p>\n    <p>Comment: For encrypting sensitive data. Environment: production</p>\n    <p>Created: 22 Nov 2024</p>\n    <p>Expires: 22 Nov 2026</p>\n    <p>Key ID: 73D3D88A</p>\n    <p>Length: 4096</p>\n    <p>Algorithm: RSA</p>\n    <p>Fingerprint: 5160 7134 4C00 D270 93FB C450 19ED AACD 73D3 D88A</p>\n\n    <!-- Public PGP Key Download Section -->\n    <section class=\"link_cards_container\">\n      <a class=\"card\"\n        onclick=\"window.location='https://yuno-public-keys.prod.y.uno/generic-pgp-keys_public_key_production.asc';\">\n        <div class=\"svg_content\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\">\n            <path\n              d=\"M8 1.33334C8.36819 1.33334 8.66667 1.63181 8.66667 2.00001V9.12668L10.7933 6.99998C11.0512 6.74211 11.4487 6.74211 11.7067 6.99998C11.9646 7.25786 11.9646 7.65541 11.7067 7.91328L8.35334 11.2667C8.15842 11.4616 7.84159 11.4616 7.64667 11.2667L4.29334 7.91328C4.03546 7.65541 4.03546 7.25786 4.29334 6.99998C4.55121 6.74211 4.94876 6.74211 5.20667 6.99998L7.33334 9.12668V2.00001C7.33334 1.63181 7.63181 1.33334 8 1.33334ZM2.66667 13.3333C2.29847 13.3333 2 13.6318 2 14C2 14.3682 2.29847 14.6667 2.66667 14.6667H13.3333C13.7015 14.6667 14 14.3682 14 14C14 13.6318 13.7015 13.3333 13.3333 13.3333H2.66667Z\"\n              fill=\"#513CE1\" />\n          </svg>\n        </div>\n        <h4>Public PGP Key</h4>\n      </a>\n    </section>\n\n    <br />\n\n    <details class=\"expandable-card\">\n      <summary class=\"expandable-summary\">\n        <span class=\"expandable-title\">Production Key</span>\n        <div class=\"expandable-icon-container\">\n          <svg class=\"icon icon-expand\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n            <path fill-rule=\"evenodd\"\n              d=\"M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z\" />\n          </svg>\n          <svg class=\"icon icon-close\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n            <path fill-rule=\"evenodd\"\n              d=\"M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z\" />\n          </svg>\n        </div>\n      </summary>\n      \n      <br />\n      \n      <div class=\"expandable-content\">\n        <pre>-----BEGIN PGP PUBLIC KEY BLOCK-----\n\n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\nsNugHSYrj1RUuA==\n=ik2s\n-----END PGP PUBLIC KEY BLOCK-----</pre>\n      </div>\n    </details>\n  </div>\n\n</body>"
}
[/block]