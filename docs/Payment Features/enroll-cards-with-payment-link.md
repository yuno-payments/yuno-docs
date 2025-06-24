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
Yuno provides merchants with the ability to manage overdue or declined payments using secure payment links. When a credit card expires or is reported as stolen or lost, you can generate a payment link to share with customers via email or text message, allowing them to easily update their payment information.

This feature is tailored for merchants who operate their own subscription engine and need to update credit card details to continue processing payments with a new `vaulted_token` for their customers.

## Benefits

* **Speed and ease**: Users can resolve payment issues instantly without logging into their account or re-entering all their details
* **Seamless update**: The new card used in the payment link is automatically saved when the previous card expires or is blocked, preventing future payment issues
* **Enhanced security**: All payments made through the link are protected with advanced encryption technology

This feature ensures a smoother payment experience, reducing friction and improving service continuity for users of your subscription product.

## How it works

### 1. Receiving the payment link

When users need to update their payment information, they receive a secure payment link. This link allows them to complete any pending payments using a credit or debit card. To create the payment link for enrollment, make sure to include the following fields:

* `customer_payer.id`: The ID of the previously [generated customer](ref:create-customer)
* `one_time_use`: Set this to `true` to ensure the payment link can only be used once
* `vault_on_success`: Set this to `true` to enroll the credit card after a successful payment

### 2. Automatic enrollment

Once the payment is successfully completed through the link, Yuno automatically generates a new `vaulted_token` for the customer.

### 3. Continue charging

After obtaining the `vaulted_token`, you can proceed with your subscription schedule. Use the [Get payment methods](ref:retrieve-enrolled-payment-methods-api) endpoint to access the customer's payment methods.

For more information about creating and managing payment links, refer to the [payment link API reference](ref:create-payment-link).