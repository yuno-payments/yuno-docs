---
title: Enroll cards with payment links
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
In Yuno we allow users to easily catch up on overdue or declined payments through a payment link. If a credit card is expired or notified stolen/lost, and you need to update the credit card information, you can generate a secure payment link to share with your customers via email or text message.

This feature is mainly oriented to merchants that have their own subscription engine and want to update credit card details in order to continue generating payments with a new `vaulted_token` for a customer. 

### Benefits for Users

* *Speed and Ease*: Users can resolve payment issues instantly without needing to log in to their account or re-enter all their details.
* *Seamless Update*: If the previous card has expired or been blocked, the new card used in the payment link will be automatically saved, preventing future payment issues.
* Enhanced Security: All payments made through the link are protected with advanced encryption technology.\
  This feature ensures a smoother payment experience, reducing friction and improving service continuity for users of our subscription product.

### How It Works

1- *Receiving the Payment Link*: Users will receive a secure payment link. This link allows them to complete the pending payment using a credit or debit card. Additional fields for the payment link creation for enrollment: 

* `customer_payer.id`: The id of the previously [generated customer](ref:create-customer).
* `one_time_use`= true: The payment link will be for a one time use only.
* `vault_on_success` = true: The flag in order to enroll the credit card after the succeeded payment. 

2- *Automatic enrollment*: Upon completing the payment through the link, if the payment is succeeded, the new `vaulted_token` will be generated for the customer.

3- *Continue charging*: Get the `vaulted_token` from the customer and continue with your subscription schedule. [Get payment methods](ref:retrieve-enrolled-payment-methods-api) for a customer. 

For more information, please refer to the [Payment link API reference](ref:create-payment-link).
