---
title: Subscription management
deprecated: false
hidden: true
metadata:
  robots: index
---
## How recurring Apple Pay payments work

To support recurring payments, some companies need to store the Apple Pay payment method while the user is actively engaged, and then use it later for payments when the user is no longer present. The initial on-session transaction is typically referred to as a Customer-Initiated Transaction (CIT), while subsequent payments are known as Merchant-Initiated Transactions (MIT). Common examples of MITs include:

* Subscriptions with a fixed billing schedule.
* Recurring ad-hoc payments with irregular frequency or customer-controlled timing.

When users engage with Apple Pay, they protect the original card number (PAN) by generating either a Device Primary Account Number (DPAN) or a Merchant Token (MPAN), depending on the operating system version and integration method. DPANs are linked to the specific Apple device and may become inactive if the user switches devices—such as moving from one iPhone to another—and re-adds the same card.

MPAN, a more recent and reliable alternative, is designed specifically for recurring payments. It remains active even when users change devices and offers improved visibility and lifecycle management capabilities. Aside from these differences, both MPANs and DPANs function in much the same way and Yuno relieves the merchant from that logic, handling them internally.

## Token generation and payment creation

Yuno’s payment platform conceptually supports Apple Pay merchant tokens to enable merchants to handle recurring or delayed payments seamlessly. The process involves two stages: initial vaulted\_token creation (with the user’s Apple Pay interaction), and subsequent charges using the stored token. Here’s how it works step by step:

1. **Customer’s Initial Apple Pay Payment**: The customer selects Apple Pay at checkout (on your app or website) and authorizes the payment. Yuno’s integration will present the Apple Pay sheet with the appropriate parameters indicating a recurring, deferred, or automatic payment intent. For example, if this is meant to save a token for subscription billing, Yuno signals a recurring payment request to Apple Pay. If the customer’s device and card issuer support merchant tokens, Apple will return an Apple Pay merchant token (MPAN) as part of the payment data internally. In order to be able to support this flow, you'll need to add the following information to the [payment creation](ref:create-payment)
   1. `vault_on_success`: Flag to enroll the card after a successful payment.
   2. `management_url`: Defined in the connection in Yuno's dashboard, this URL is necessary to redirect the customer to manage their apple pay subscriptions.
   3. *subscription object*: Information related to the [subscription](doc:subscriptions) the customer is enrolling in. Keep in mind that these fields are for informational purposes only, as future payments will be initiated by the merchant.
      1. &#x20;
         ```json
         "subscription:{ 
            "frequency": {
              "type": "MONTH",
              "value": 1
            }
         }
         ```
2. **Vaulted token creation**: Along with the payment authorization, Yuno securely stores the merchant token that came from Apple Pay and returns a vaulted\_token in the payment response in order to be used for future merchant initiated transactions.
3. **Future MITs**: When the time comes for a follow-up [payment](ref:create-payment), the merchant can initiate a payment through Yuno without involving the customer’s Apple Pay UI again. This could be the next month’s subscription fee, an installment, an automatic top-up, or final payment for a deferred charge. The merchant’s backend creates a charge request using the stored `vaulted_token` instead of prompting the user. This is a merchant-initiated transaction (MIT) – essentially charging the saved token on file ￼. Yuno’s system takes the saved Apple Pay token and submits the payment for authorization through the card network (just as it would with a stored card or any tokenized payment method). The card network/bank recognizes the token as tied to the original card and merchant, and processes the charge. No biometric or user action is needed at this stage – the transaction is processed off-session based on the prior consent.

Throughout this flow, Yuno abstracts the complexity: merchants do not need to deal with Apple’s cryptograms or token management directly. Yuno ensures the initial Customer Initiated Transaction (CIT) is handled promptly and that subsequent payments include the proper references to maximize authorization success ￼ ￼. All token details and usage are handled in a PCI-compliant manner by Yuno, keeping the process secure.