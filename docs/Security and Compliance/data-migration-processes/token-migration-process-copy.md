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

<br />

<ExpandableCard title="Production Key">
  <p>Use your production key only in live environments. Never expose it publicly.</p>
</ExpandableCard>

<br />

<Tabs>
  <Tab title="Sandbox">
    Email: [security-migrations@y.uno](mailto:security-migrations@y.uno)

    Comment: For encrypting sensitive data. Environment: sandbox

    Created: 22 Nov 2024

    Expires: 22 Nov 2026

    Key ID: B342E3D3

    Length: 4096

    Algorithm: RSA

    Fingerprint: 2B37 55FA 426A B1D0 2061 4C6C 919C 4D81 B342 E3D3

    <Shelf classname="cards_container">
      <div class="first_row">
        <YunoCard type="pgp-key" title="Public PGP Key" href="https://yuno-public-keys.prod.y.uno/generic-pgp-keys_public_key_sandbox.asc">
          Download the public PGP key for encrypting sensitive data in the sandbox environment.
        </YunoCard>
      </div>
    </Shelf>
  </Tab>

  <Tab title="Production">
    Email: [security-migrations@y.uno](mailto:security-migrations@y.uno)

    Comment: For encrypting sensitive data. Environment: production

    Created: 22 Nov 2024

    Expires: 22 Nov 2026

    Key ID: 73D3D88A

    Length: 4096

    Algorithm: RSA

    Fingerprint: 5160 7134 4C00 D270 93FB C450 19ED AACD 73D3 D88A

    <Shelf classname="cards_container">
      <div class="first_row">
        <YunoCard type="sdk-integrations" title="Public PGP Key" href="https://yuno-public-keys.prod.y.uno/generic-pgp-keys_public_key_production.asc">
          Download the public PGP key for encrypting sensitive data in the production environment.
        </YunoCard>
      </div>
    </Shelf>
  </Tab>
</Tabs>