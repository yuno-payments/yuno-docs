---
title: Cancel or Refund a Payment
excerpt: ''
api:
  file: payment-api-refundcancel-payment.json
  operationId: cancel-or-refund-a-payment
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
This service allows you to cancel or refund an existing payment. Our system will identify if a cancellation or a refund is necessary based on the payment, no `transaction_id` is needed in this case. This service performs the following functions based on the status of the transaction:

- **Cancels** the payment if it has not been captured.
- **Refunds** the payment if it has been captured.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Refunds</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tIf you fill out the amount field, the refund will be partial. Otherwise, it will create a complete refund. The funds will be refunded to the payment method that was originally charged.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


Note that this request requires an `X-Idempotency-Key`. Check the [Authentication](ref:authentication#idempotency) page for more information.