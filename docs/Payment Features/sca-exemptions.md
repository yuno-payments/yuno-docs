---
title: SCA Exemptions
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
# Understanding SCA Exemptions

Under the European Union's Payment Services Directive 2 (PSD2), Strong Customer Authentication (SCA) is mandated for electronic payments to enhance security and reduce fraud. However, PSD2 provides specific scenarios—known as SCA exemptions—where transactions can bypass the standard authentication requirements. These exemptions are designed to streamline the payment process for low-risk transactions, improving the user experience without compromising security.

# Challenge Request Indicator

The `strong_customer_authentication_exemptions` array enables merchants to specify their preference regarding the application of Strong Customer Authentication (SCA) exemptions during a transaction. By utilizing this field, merchants can request that certain transactions be exempted from the standard authentication challenges, thereby enhancing the customer experience and reducing friction during the payment process.

## Allowed Values

The `strong_customer_authentication_exemptions` array accepts the following values, each corresponding to a specific SCA exemption:

* **`LOW_VALUE`**: Indicates that the transaction amount is below the low-value threshold defined by PSD2 (typically under €30).
  _Benefit_: Low-value transactions may be exempt from SCA, expediting the payment process for minor purchases.

* **`TRANSACTION_RISK_ANALYSIS`**: Signifies that a Transaction Risk Analysis (TRA) has been conducted, and the transaction is deemed low-risk.
  _Benefit_: Allows low-risk transactions to bypass SCA, improving conversion rates.

* **`STRONG_CUSTOMER_AUTHENTICATION`**: Signifies that the authentication responsibility has been delegated to a trusted third party who has already performed SCA.
  _Benefit_: Enables authorized third parties to manage authentication, reducing the need for additional challenges.

* **`OUT_OF_SCOPE`**: Signifies that the authentication responsibility shouldn't be taken into account.

* **`SECURE_CORPORATE`**: Indicates that the payment is made using a secure corporate card not assigned to an individual.
  _Benefit_: Corporate payments may be exempt from SCA, facilitating seamless business transactions.

* **`TRUSTED_BENEFICIARY`**: Denotes that the merchant has been added to the customer's list of trusted beneficiaries after an initial SCA.
  _Benefit_: Subsequent payments to trusted merchants can be exempt from SCA, streamlining repeat purchases.

* **`RECURRING_PAYMENT`**: Indicates that the transaction is a fixed-amount recurring payment to the same beneficiary.
  _Benefit_: Recurring payments may be exempt from SCA after the initial authentication, enhancing the customer experience for subscription services.

> 📘 Cartes Bancaires Safe'R (France)
>
> Safe'R is a Cartes Bancaires (CB) program built on top of EMV 3DS 2.x and TRA. There is no dedicated `SAFER` flag in Yuno's API. To request Safe'R-eligible flows, use the `TRANSACTION_RISK_ANALYSIS` exemption and include the CB risk data fields in your payment request.
>
> Provide as much of the following as possible to maximize eligibility:
>
> * `customer_payer.ip_address`
> * `customer_payer.email`
> * `customer_payer.phone`
> * `customer_payer.billing_address.*`
> * `customer_payer.shipping_address.*`
> * `customer_payer.browser_info.*` (for web flows)

## Implementation Example

The Strong Customer Authentication exemptions come from either:

* **[Recommended]** - The previous analysis of a fraud provider in your payment route:
  * <Image align="center" border={false} src="https://files.readme.io/5e1b8247f3e9331bc2b87954083e493304b8dfcf2421666497dd28b8a7fe28b4-Screenshot_2025-06-09_at_9.35.29_AM.png" />
* Defining it when creating payment requests via API. Ensure that the selected value accurately reflects the nature of the transaction. For example:

```json
{
  [...],
  "payment_method": {
        "type": "CARD",
        "detail": {
            "card": {
                "card_data": {
                    "holder_name": "Paco",
                    "number": "4871049999999910",
                    "expiration_month": 3,
                    "expiration_year": 30,
                    "security_code": "737"
                },
               "three_d_secure": {
                        "strong_customer_authentication_exemptions": ["LOW_VALUE"]
                    }
            }
        }
    }
[...]
}
```

In this example, the `strong_customer_authentication_exemptions` is set to LOW_VALUE, indicating that the transaction qualifies for the low-value payment exemption.

### Considerations

* _Issuer's Final Decision_: While merchants can request an exemption using the `strong_customer_authentication_exemptions` field, the card issuer has the final authority to accept or decline the exemption based on their risk assessment and compliance policies.
* _Liability Implications_: Requesting an exemption may impact liability in cases of fraudulent transactions. It's essential to understand that if an exemption is granted, the liability shift associated with SCA may not apply.
* _Regulatory Compliance_: Ensure that the use of this field aligns with regional regulations, such as PSD2 in Europe, and that your implementation adheres to the specific requirements and thresholds defined for each exemption type.

By effectively utilizing the `strong_customer_authentication_exemptions` field, merchants can optimize their payment processes, reduce friction for customers, and maintain compliance with regulatory standards.
