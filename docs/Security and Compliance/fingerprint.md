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
The `fingerprint` field is a new addition to the payment method object. This field provides a unique, non-sensitive identifier for your customer's card across your organization. When a customer enrolls the same credit card multiple times—whether under one or several Yuno accounts—different `vaulted_tokens` are created for each enrollment. However, the `fingerprint` remains consistent, allowing you to recognize when the same card is present in different contexts.

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

Card fingerprinting creates a unique identifier for a specific payment method, allowing you to recognize the same card across different contexts—without exposing any sensitive card information. Unlike `vaulted_tokens`, fingerprints cannot be used to process payments. Instead, they serve as a secure, non-sensitive reference to the underlying card details.

Fingerprints are useful for:

* Identifying when a user presents the same card for multiple payments, which can help determine if enabling card vaulting would improve the user experience.
* Detecting if a single card is being used by multiple customers, which may indicate potential fraud.

The fingerprint is also included in the payment response whenever a transaction is made with an enrolled credit card.
