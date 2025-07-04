---
title: Token Migration Process [replace tabs copy]
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

    <Shelf classname="link_cards_container">
      <YunoCard title="Public PGP Key" href="https://yuno-public-keys.prod.y.uno/generic-pgp-keys_public_key_sandbox.asc" titleSize="h4" />
    </Shelf>

    <ExpandableCard title="Sandbox Key">
      <pre className="whitespace-pre-wrap text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto">
        \-----BEGIN PGP PUBLIC KEY BLOCK-----

        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
        JiRYUpjGug==
        \=LuK0
        \-----END PGP PUBLIC KEY BLOCK-----
      </pre>
    </ExpandableCard>
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

    <Shelf classname="link_cards_container">
      <YunoCard title="Public PGP Key" href="https://yuno-public-keys.prod.y.uno/generic-pgp-keys_public_key_production.asc" titleSize="h4" />
    </Shelf>

    <ExpandableCard title="Production Key">
      <pre className="whitespace-pre-wrap text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto">
        \-----BEGIN PGP PUBLIC KEY BLOCK-----

        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
        sNugHSYrj1RUuA==
        \=ik2s
        \-----END PGP PUBLIC KEY BLOCK-----
      </pre>
    </ExpandableCard>
  </Tab>
</Tabs>