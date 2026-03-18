---
title: Sellers (Franchise)
sidebarTitle: Overview
description: Manage franchise merchant identities and provider-specific credentials.
hidden: true
---

The Sellers API allows franchise merchants to register per-provider seller identities so the correct `merchant_id` is automatically resolved at payment time. 

A merchant operating multiple franchise stores can assign different provider credentials (e.g., `CIELO_456` for Cielo, `ADYEN_789` for Adyen) to each store, and the system will pick the right one based on which provider processes the payment.

## Key Concepts

- **Organizational Scope:** A seller is created under a specific `account_code`, but is available organization-wide — any account within the same organization can reference that seller in payment requests.
- **Non-Blocking Resolution:** Franchise resolution never blocks a payment. If no mapping exists or the service is unavailable, the payment proceeds with the default `merchant_id` from the connection.
- **Polymorphic Detail:** The `payment_method` array uses a polymorphic `detail` structure. The shape of the detail object depends on the `payment_method_type` field (`CARD` → `detail.card.provider`, `APPLE_PAY` → `detail.wallet.provider`).
- **Soft Delete:** Deleting a seller soft-deletes the record and all associated payment method data. Past payments are unaffected.

## Authentication

All Sellers API endpoints require the following headers:

| Header | Required | Description |
| :---- | :---- | :---- |
| `public-api-key` | Yes | Your Yuno public API key. |
| `private-secret-key` | Yes | Your Yuno private secret key. |
| `X-account-code` | Yes | The account UUID identifier. |
| `X-Idempotency-Key` | Recommended (POST) | Unique UUID for safe retries. |

<CardGroup cols={2}>
  <Card title="The Seller Object" icon="cube" href="the-seller-object">
    Understand the structure and attributes of a seller identity.
  </Card>
  <Card title="Using Sellers in Payments" icon="money-bill-transfer" href="using-sellers-in-payments">
    Learn how to reference sellers in your payment requests.
  </Card>
</CardGroup>
