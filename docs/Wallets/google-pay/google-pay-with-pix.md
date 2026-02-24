---
title: Google Pay with PIX
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    Accept PIX payments through Google Pay in Brazil. Combine Google Pay's
    wallet convenience with Brazil's instant payment system.
  robots: index
next:
  description: ''
---
In Brazil, Yuno supports Google Pay as an interface for PIX payments. Customers select Google Pay at checkout, and the payment is processed through PIX, Brazil's instant payment system. This combines the convenience of Google Pay's stored payment methods with PIX's real-time settlement.

<Callout icon="📘" theme="info">
  Google Pay with PIX is available only in Brazil, with transactions in BRL (Brazilian Real).
</Callout>

## How it works

From the merchant's perspective, a Google Pay + PIX payment behaves like a standard asynchronous PIX payment, even though the customer starts in Google Pay.

1. The customer selects Google Pay at checkout.
2. Google Pay presents PIX as a payment option within the Google Pay payment sheet.
3. The customer selects a bank or credential that can initiate a PIX transfer and authorizes the payment.
4. Yuno creates the payment in `PENDING` status and returns the standard PIX artifacts (QR code, copy-and-paste code, or deeplink) depending on the provider and configuration.
5. The customer completes the PIX transfer through their bank.
6. The bank confirms the transfer to the provider, which notifies Yuno.
7. Yuno updates the payment status to `SUCCEEDED` and fires a webhook.

```mermaid
sequenceDiagram
    participant Customer
    participant GooglePay as Google Pay
    participant Merchant
    participant Yuno
    participant Provider
    participant Bank

    Customer->>GooglePay: Selects Google Pay
    GooglePay->>Customer: Shows PIX option
    Customer->>GooglePay: Authorizes PIX payment
    GooglePay->>Merchant: Returns payment data
    Merchant->>Yuno: Creates payment
    Yuno->>Provider: Routes PIX payment
    Provider-->>Yuno: Returns PIX artifacts
    Yuno-->>Merchant: Payment PENDING + PIX artifacts
    Merchant-->>Customer: Displays QR code / instructions
    Customer->>Bank: Completes PIX transfer
    Bank->>Provider: Confirms transfer
    Provider->>Yuno: Payment confirmed
    Yuno->>Merchant: Webhook: SUCCEEDED
```

## Requirements

- A Yuno account with a provider connection that supports both Google Pay and PIX in Brazil
- Transactions must be in **BRL** (Brazilian Real)
- The customer's Google account must have PIX enabled

## Integration

Google Pay with PIX follows the same integration patterns as Google Pay with card payments. Choose the integration method that fits your architecture:

- **[SDK integration](doc:google-pay-sdk-integration)**: Yuno's SDK handles the full flow, including presenting PIX as an option within Google Pay.
- **[Direct integration](doc:google-pay-direct-integration)**: You manage the Google Pay frontend and pass the PIX payment token to Yuno.
- **[Provider integration](doc:integration-via-provider-google-pay)**: Your payment provider handles the Google Pay + PIX flow.

When creating the payment, set the `payment_method.type` to `GOOGLE_PAY`. The SDK or provider determines whether the underlying transaction uses card or PIX based on the customer's selection within Google Pay.

## Payment request

Create a payment using the same `GOOGLE_PAY` payment method type. Set the country to `BR` and the currency to `BRL`:

```json
{
  "account_id": "your-account-id",
  "description": "Google Pay PIX payment",
  "merchant_order_id": "order-456",
  "country": "BR",
  "amount": {
    "currency": "BRL",
    "value": 5000
  },
  "customer_payer": {
    "email": "customer@example.com"
  },
  "payment_method": {
    "type": "GOOGLE_PAY"
  }
}
```

<Callout icon="⚠️" theme="warn">
  The exact API fields that indicate a PIX payment was initiated through Google Pay may vary depending on your provider configuration. Contact your Technical Account Manager for the latest specification for your setup.
</Callout>

## Payment statuses

Google Pay with PIX is **asynchronous**. Unlike card payments through Google Pay, which typically resolve immediately, PIX payments go through a pending state while waiting for the bank transfer to complete.

| Status | Description |
|---|---|
| `PENDING` | Payment created. The PIX transfer has not been completed yet. |
| `SUCCEEDED` | The bank confirmed the PIX transfer. Funds have settled. |
| `EXPIRED` | The PIX payment was not completed before the expiration deadline. |
| `DECLINED` | The payment was declined by the provider or bank. |

### Status lifecycle

```mermaid
stateDiagram-v2
    [*] --> PENDING: Payment created
    PENDING --> SUCCEEDED: Bank confirms PIX transfer
    PENDING --> EXPIRED: PIX expiration deadline reached
    PENDING --> DECLINED: Provider/bank declines
    SUCCEEDED --> [*]
    EXPIRED --> [*]
    DECLINED --> [*]
```

## Handling user cancellation

If the customer closes the Google Pay sheet or the PIX instructions screen before completing the bank transfer:

- The **frontend/SDK** reports that the user left the flow (e.g., the SDK returns a user-cancelled status).
- The **payment in the API remains `PENDING`**. The PIX reference is still valid and the customer can still complete the transfer from their bank app.
- The PIX payment only moves to `EXPIRED` when the expiration deadline is reached, not when the user closes the UI.

Your checkout should handle this by:

1. **Re-displaying the PIX instructions** if the customer returns to the same session, since the PIX reference is still valid.
2. **Letting the customer pay later** if your UX supports it. The PIX code remains active until it expires.
3. **Polling the payment status** via `GET /v1/payments/{id}` or listening for webhooks to detect when the transfer completes.

## Webhooks

Standard payment webhooks fire for all status transitions. The webhook payload follows the same structure as any other Yuno payment notification.

Monitor these events:

- **Payment succeeded**: The PIX transfer was completed. Update your order status and confirm to the customer.
- **Payment expired**: The PIX deadline passed without a transfer. Stop displaying the QR code or PIX instructions and prompt the customer to start a new payment.

See [Webhooks](doc:webhooks) for configuration details.

## Differences from card payments

| Aspect | Google Pay with cards | Google Pay with PIX |
|---|---|---|
| Processing | Usually synchronous | Asynchronous (PENDING until bank confirms) |
| Settlement | Depends on provider and acquirer | Instant (PIX network) |
| Currency | Multiple currencies supported | BRL only |
| Country | Global availability | Brazil only |
| Refunds | Standard refund flow | PIX refund flow |
| Recurring payments | Supported via vaulted tokens | Not supported |
| Customer action after checkout | None required | Must complete PIX transfer via bank |
| Expiration | N/A | PIX reference expires per provider/Yuno rules |

## Related documentation

- [Google Pay overview](doc:google-pay)
- [Google Pay SDK integration](doc:google-pay-sdk-integration)
- [Google Pay Direct integration](doc:google-pay-direct-integration)
- [Google Pay via provider](doc:integration-via-provider-google-pay)
