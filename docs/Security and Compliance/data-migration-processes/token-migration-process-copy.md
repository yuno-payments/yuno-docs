---
title: Token Migration Process [remove tabs copy]
deprecated: false
hidden: true
metadata:
  description: >-
    Token migration is the process by which the card numbers stored in a
    provider are transferred to Yuno's vault. This process involves the
    generation of a new token for each card.
  robots: index
---
### PGP public key

Use our public key to encrypt the PCI-sensitive files you send to Yuno.

\<Tabs>
&#x20; \<Tab title="Sandbox">
&#x20;   Email: \[security-migrations\@y.uno]\(mailto:security-migrations\@y.uno)

&#x20;   Comment: For encrypting sensitive data. Environment: sandbox

&#x20;   Created: 22 Nov 2024

&#x20;   Expires: 22 Nov 2026

&#x20;   Key ID: B342E3D3

&#x20;   Length: 4096

&#x20;   Algorithm: RSA

&#x20;   Fingerprint: 2B37 55FA 426A B1D0 2061 4C6C 919C 4D81 B342 E3D3

&#x20;   \<Shelf classname="cards\_container">
&#x20;     \<div class="first\_row">
&#x20;       \<YunoCard type="pgp-key" title="Public PGP Key" href="https\://yuno-public-keys.prod.y.uno/generic-pgp-keys\_public\_key\_sandbox.asc">
&#x20;         Download the public PGP key for encrypting sensitive data in the sandbox environment.
&#x20;       \</YunoCard>
&#x20;     \</div>
&#x20;   \</Shelf>

&#x20; \<Tab title="Production">
&#x20;   Email: \[security-migrations\@y.uno]\(mailto:security-migrations\@y.uno)

&#x20;   Comment: For encrypting sensitive data. Environment: production

&#x20;   Created: 22 Nov 2024

&#x20;   Expires: 22 Nov 2026

&#x20;   Key ID: 73D3D88A

&#x20;   Length: 4096

&#x20;   Algorithm: RSA

&#x20;   Fingerprint: 5160 7134 4C00 D270 93FB C450 19ED AACD 73D3 D88A

&#x20;   \<Shelf classname="cards\_container">
&#x20;     \<div class="first\_row">
&#x20;       \<YunoCard type="sdk-integrations" title="Public PGP Key" href="https\://yuno-public-keys.prod.y.uno/generic-pgp-keys\_public\_key\_production.asc">
&#x20;         Download the public PGP key for encrypting sensitive data in the production environment.
&#x20;       \</YunoCard>
&#x20;     \</div>
&#x20;   \</Shelf>

&#x20; \</Tab>
\</Tabs>