---
title: Card Fingerprint
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
We've added a new field to the Payment method object called `fingerprint`. It is a field that represents your customer's card throughout your organization. When a customer enrolls a credit card multiple times related to one or many Yuno accounts, multiple `vaulted_tokens` will be generated, but the fingerprint lets you identify when the same card is in different scenarios.

```json
"card_data": {
                    "holder_name": "John Doe",
                    "iin": "41111111",
                    "lfd": "1111",
                    "number_length": 16,
                    "security_code_length": 3,
                    "brand": "VISA",
                    "issuer_name": "JPMORGAN CHASE BANK N A",
                    "category": "CREDIT",
                    "type": "CREDIT",
                    "fingerprint": "d244e20d-43a1-43f7-9b48-0a76423be35e"
                },
```

Fingerprinting involves creating an identifier for a specific payment method without disclosing any sensitive information. Unlike `vaulted_tokens`, fingerprints cannot be used to make payments, making them a secure representation of payment method details.  

Fingerprints are highly valuable for:

- Tracking if a user is using the same card for multiple customer-present payments, suggesting that a vault could greatly improve the user experience.
- Checking if a particular card is being used by multiple customers, which could indicate fraud.

You will also find the fingerprint in the payment response when a transaction is made using an enrolled credit card.