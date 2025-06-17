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
Yuno enables merchants to handle overdue or declined payments through secure payment links. When a credit card expires or is reported stolen/lost, you can generate a payment link to share with customers via email or text message, allowing them to update their payment information easily.

This feature is designed for merchants who manage their own subscription engine and need to update credit card details to continue processing payments with a new `vaulted_token` for their customers.

## Benefits

* **Speed and Ease**: Users can resolve payment issues instantly without logging into their account or re-entering all their details
* **Seamless Update**: The new card used in the payment link is automatically saved when the previous card expires or is blocked, preventing future payment issues
* **Enhanced Security**: All payments made through the link are protected with advanced encryption technology

This feature ensures a smoother payment experience, reducing friction and improving service continuity for users of your subscription product.

## How It Works

### 1. Receiving the Payment Link

Users receive a secure payment link that allows them to complete the pending payment using a credit or debit card. When creating the payment link for enrollment, include these additional fields:

* `customer_payer.id`: The ID of the previously [generated customer](ref:create-customer)
* `one_time_use`: Set to `true` to ensure the payment link can only be used once
* `vault_on_success`: Set to `true` to enroll the credit card after successful payment

### 2. Automatic Enrollment

When the payment is completed successfully through the link, Yuno automatically generates a new `vaulted_token` for the customer.

### 3. Continue Charging

Retrieve the `vaulted_token` from the customer and continue with your subscription schedule. Use the [Get payment methods](ref:retrieve-enrolled-payment-methods-api) endpoint to access the customer's payment methods.

For more information about creating and managing payment links, refer to the [Payment link API reference](ref:create-payment-link).