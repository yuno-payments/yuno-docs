---
name: yuno
description: Use when building payment integrations, configuring payment orchestration, managing payment methods, processing transactions, handling refunds, setting up webhooks, or implementing payment flows for web, mobile, or server-to-server integrations.
---

# Yuno Skill Reference

## Product summary

Yuno is a payment orchestration platform. One integration connects a merchant to many payment service providers (PSPs), acquirers, fraud tools and local payment methods. Developers integrate through the REST API, the SDKs (Web, iOS, Android, Flutter, React Native) or Payment Links. API credentials live in Dashboard → Developers. Primary documentation: https://docs.y.uno

## When to use

Reach for this skill when:
- Building payment checkout flows (SDK or API-based)
- Creating or managing payments, refunds, cancellations, or authorizations
- Vaulting cards and charging them later (subscriptions, merchant-initiated charges)
- Receiving webhooks and verifying their signature
- Configuring payment routing rules or provider connections
- Testing payment flows in sandbox before production

## Authority for agents

- Paths and required fields: the [OpenAPI](https://docs.y.uno/openapi.json) files and the matching Reference pages win over this skill's short tables. If they disagree, prefer OpenAPI and file a docs fix.
- Header casing for Payments and Checkout Session: [Authentication](https://docs.y.uno/reference/getting-started/authentication).
- Sandbox test cards: [Yuno Testing Gateway](https://docs.y.uno/docs/direct-integration-use-cases/yuno-testing-gateway).

## Facts models most often get wrong

Read these before writing code. Each one is a mistake models make repeatedly.

1. **Checkout session path is `POST /v1/checkout/sessions`**: two segments, plural. `/v1/checkout-sessions` (hyphen) returns 404 NOT_FOUND, and so does singular `/checkout/session`.
2. **Refund path is transaction-scoped**: `POST /v1/payments/{payment_id}/transactions/{transaction_id}/refund`. Its body requires `merchant_reference`. There is no `POST /v1/payments/{id}/refund` (404 NOT_FOUND). The alternative is `POST /v1/payments/{payment_id}/cancel-or-refund` with a `reason`.
3. **Webhook signature header is `x-hmac-signature`**: base64 HMAC-SHA256 over the raw request body. Never `x-yuno-signature`, `x-signature`, `yuno-signature` or `x-hub-signature-256`.
4. **Amounts are decimal major units**: `{"currency": "USD", "value": 25}` is 25.00 USD. `2500` would charge 2,500 USD. `49.90 BRL` is `"value": 49.9`.
5. **Sandbox host is `https://api-sandbox.y.uno`**. Default to it in test code and in any client where the environment is unset. Production is `https://api.y.uno` (EMEA: `https://api.eu.y.uno`).
6. **Recurring card charges use `stored_credentials`**, nested at `payment_method.detail.card.stored_credentials`. `reason` is one of `CARD_ON_FILE`, `SUBSCRIPTION`, `UNSCHEDULED_CARD_ON_FILE`. There is no `RECURRING` reason.
7. **Prefer webhooks to polling** for payment status. Poll `GET /v1/payments/{id}` only as a fallback or for reconciliation.

## Quick reference

### Environments

| Environment | Base URL |
|---|---|
| Sandbox (Test Mode) | `https://api-sandbox.y.uno` |
| Production US (Live Mode) | `https://api.y.uno` |
| Production EMEA | `https://api.eu.y.uno` |

Sandbox and production use different API keys. Read the base URL and keys from environment variables. If no environment is configured, use sandbox, never production.

### Request headers

| Header | Value | Notes |
|--------|-------|-------|
| `public-api-key` | Your public key | Dashboard → Developers. Required on **every** server request, together with `private-secret-key` |
| `private-secret-key` | Your secret key | Required on every server request. Server-side only; never send it to a browser or app |
| `X-Idempotency-Key` | UUID v4 | Required on `POST /v1/payments`, refunds and cancels |
| `Content-Type` | `application/json` | On POST/PATCH |

The merchant account goes in the request **body** as `account_id`, not in a header.

`X-Account-Code` (the same account UUID) is a header only on some organization-level APIs, such as the Checkout Builder API (beta), connections and sellers. See [Create Checkout](https://docs.y.uno/reference/checkout-builder/create-checkout). Payments and checkout sessions do not need it.

### Idempotency

- Generate a new UUID for every new operation: each payment, each refund attempt, each cancel.
- Retry an unclear failure (timeout, connection error, 500) with the **same** key. Never retry it with a new key: if the first request succeeded, a new key creates a duplicate charge.
- A reused key returns the original payment (the retry body is ignored), `400 REQUEST_IN_PROCESS` (retry in a few seconds with the same key), or `400 IDEMPOTENCY_DUPLICATED` (no payment was created; fix the request and use a new key).
- Use a new key for a new order or a new attempt after a decline.
- A refund never reuses the payment's idempotency key.

### Core API endpoints

All paths are relative to the base URL.

| Resource | Method and path | Purpose |
|----------|----------|---------|
| Customers | `POST /v1/customers` | Create a customer. Needed for vaulting |
| Checkout session | `POST /v1/checkout/sessions` | Start an SDK payment flow |
| Payments | `POST /v1/payments` | Create a payment (SDK or DIRECT) |
| Payments | `GET /v1/payments/{payment_id}` | Read payment `status` and `sub_status` |
| Refund | `POST /v1/payments/{payment_id}/transactions/{transaction_id}/refund` | Refund one transaction, full or partial. Body requires `merchant_reference` |
| Cancel or refund | `POST /v1/payments/{payment_id}/cancel-or-refund` | Yuno picks cancel or refund. Requires `reason` |

A `GET` can answer with HTTP 201. Treat any 2xx as success, not only 200. Error responses are JSON with a `code` and `messages`; surface both to the caller.

### Payment status

Read the **payment-level** `status` and `sub_status`. A payment can have several transactions; the payment status is the source of truth, not an individual transaction's status.

| `status` | Meaning | Fulfil the order? |
|---|---|---|
| `SUCCEEDED` | Captured | Yes |
| `PENDING` | Waiting on 3DS, an async method or provider confirmation | Wait for the webhook |
| `DECLINED`, `REJECTED`, `ERROR`, `CANCELLED`, `EXPIRED`, `REFUNDED` | Not paid, or reversed | No |

For an authorize-only payment, `sub_status` tells you whether the funds are authorized or captured.

## Workflow

### 1. SDK checkout (recommended; no PCI scope)

The SDK flow uses the default workflow `SDK_CHECKOUT`. Do not set `DIRECT` or `REDIRECT` on a checkout session for the SDK.

1. **Server: create a checkout session.** `POST /v1/checkout/sessions` with:
   - Required: `account_id`, `merchant_order_id`, `payment_description`, `country` (ISO 3166-1 alpha-2, e.g. `"US"`), `amount` `{currency, value}` in major units
   - `customer_id` to link a Yuno customer
   - Return only `checkout_session`, the public API key and the country code to the browser
2. **Browser: start the SDK.**
   ```js
   const yuno = await Yuno.initialize(PUBLIC_API_KEY);
   await yuno.startSeamlessCheckout({
     checkoutSession, elementSelector: "#root", countryCode: "US", language: "en",
     async yunoCreatePayment(oneTimeToken) {
       await fetch("/api/payments", { method: "POST", headers: {"Content-Type": "application/json"},
         body: JSON.stringify({ oneTimeToken, checkoutSession }) });
       yuno.continuePayment();
     },
     yunoPaymentResult(status) { /* show result; the webhook is the source of truth */ },
   });
   await yuno.mountSeamlessCheckout();
   // on the pay button: yuno.startPayment();
   ```
3. **Server: create the payment** from inside `yunoCreatePayment`. `POST /v1/payments` with `X-Idempotency-Key`, `account_id`, `description`, `country`, `merchant_order_id`, `amount`, `checkout: {"session": checkoutSession}` and `payment_method: {"token": oneTimeToken}`. The browser then calls `yuno.continuePayment()` to handle 3DS or redirects.
4. **Confirm by webhook.** Ship only when a verified webhook (or a `GET`) shows `SUCCEEDED`.

### 2. Direct API (PCI-certified merchants only)

`POST /v1/payments` with `workflow: "DIRECT"` and the required fields `account_id`, `description`, `country`, `merchant_order_id`, `amount`, `payment_method`.

Charge a saved card with the vaulted token only:

```json
"payment_method": { "type": "CARD", "vaulted_token": "<vaulted_token>" }
```

Do not send `payment_method.token` together with `vaulted_token`: the vaulted token overrides the token, and fraud screening loses the device fingerprint. Read both `status` and `sub_status` on the response. If `payment_method.detail.redirect_url` is present, send the user there for 3DS.

### 3. Vault a card and charge it monthly (merchant-initiated)

1. **Create the customer** with `POST /v1/customers`. Keep the Yuno customer id.
2. **First payment (customer present).** Vault the card and mark the series start:
   ```json
   {
     "customer_payer": { "id": "<yuno_customer_id>" },
     "payment_method": {
       "type": "CARD",
       "token": "<one_time_token>",
       "vault_on_success": true,
       "detail": { "card": { "stored_credentials": { "reason": "SUBSCRIPTION", "usage": "FIRST" } } }
     }
   }
   ```
   `vault_on_success` needs `customer_payer.id`. Without it, nothing is vaulted. Save `vaulted_token` and `payment_method.detail.card.stored_credentials.network_transaction_id` from the response.
3. **Each monthly charge (customer absent).** New `X-Idempotency-Key`, vaulted token only, same `reason`, `usage: "USED"`, and the network transaction id from the first charge:
   ```json
   {
     "customer_payer": { "id": "<yuno_customer_id>" },
     "payment_method": {
       "type": "CARD",
       "vaulted_token": "<vaulted_token>",
       "detail": { "card": { "stored_credentials": {
         "reason": "SUBSCRIPTION", "usage": "USED",
         "network_transaction_id": "<from_first_charge>"
       } } }
     }
   }
   ```
   Keep `reason` the same across the series; some providers (e.g. Adyen) decline when it changes. Add `subscription_agreement_id` where the market needs it (e.g. MX). The merchant never stores a raw card number.

`reason` values: `SUBSCRIPTION` (scheduled MIT), `UNSCHEDULED_CARD_ON_FILE` (MIT at any time), `CARD_ON_FILE` (customer present, one-click). `usage` values: `FIRST`, `USED`.

### 4. Refund a payment

1. **Find the transaction.** Take the `PURCHASE` transaction (one-step payment) or the `CAPTURE` transaction (two-step) from the create response (`transactions.id`) or from `GET /v1/payments/{payment_id}`. A `REFUND` transaction's id cannot be refunded.
2. **Call** `POST /v1/payments/{payment_id}/transactions/{transaction_id}/refund` with a **new** `X-Idempotency-Key` and a `merchant_reference` in the body (required; without it the API returns 400 INVALID_PARAMETERS).
   - Full refund: omit `amount`.
   - Partial refund: send `amount: {currency, value}` in major units.
3. **Read the result.** The response contains a new transaction of type `REFUND`:
   - `SUCCEEDED`: refunded.
   - `PENDING`: the provider confirms later. Wait for the `payment.refund` webhook.
   - `DECLINED` or `ERROR`: failed. Retry later with a new idempotency key.
4. **One refund at a time.** Do not start another refund on the same transaction while one is `PENDING`.

### 5. Receive webhooks

Configure the endpoint in Dashboard → Developers → Webhooks and enable **Use HMAC Authentication**. The HMAC secret is the webhook secret from the dashboard; it is not the API `private-secret-key`.

```js
app.post("/webhooks/yuno", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.get("x-hmac-signature") || "";
  const expected = crypto.createHmac("sha256", process.env.YUNO_WEBHOOK_SECRET)
    .update(req.body)            // raw bytes, never JSON.stringify(req.body)
    .digest("base64");
  const a = Buffer.from(sig), b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return res.sendStatus(401);

  const event = JSON.parse(req.body.toString("utf8"));
  const key = event.data?.idempotency_key;          // stable across retries
  if (await alreadyProcessed(event.type_event, key)) return res.sendStatus(200);

  if (event.type_event === "payment.purchase" && event.data.payment.status === "SUCCEEDED") {
    await markOrderPaid(event.data.payment.id);
  }
  await recordProcessed(event.type_event, key);
  res.sendStatus(200);
});
```

- Verify over the **raw body**. Re-serialized JSON changes the bytes and the signature fails.
- Reject a bad signature with 401 and do nothing else.
- Yuno retries up to 7 times when it does not get HTTP 200. De-duplicate on `data.idempotency_key` (plus `type_event` for `subscription.*` events). The top-level `retry` field counts attempts.
- Payload shape: `type`, `type_event` (`payment.purchase`, `payment.refund`, ...), `retry`, `data.payment.id`, `data.payment.status`, `data.payment.sub_status`, `data.idempotency_key`.
- Return 200 fast and process slow work asynchronously.

### 6. Configure payment routing

1. Dashboard → Connections → add a provider connection with its credentials.
2. Dashboard → Routing → choose the payment method → create a route, add the connection as a step, add conditions (country, currency, amount, card brand) and an optional fallback → Publish.
3. Test the route in sandbox before production.

## Common gotchas

- **Invented paths.** Use the exact paths in the endpoint table. `/v1/checkout-sessions` and `/v1/payments/{id}/refund` return 404.
- **Minor units.** Yuno amounts are major units. Do not multiply by 100.
- **Secret key in the browser.** Only `public-api-key` reaches the client. `private-secret-key` stays on the server.
- **vaulted_token with token.** Send one or the other. The vaulted token overrides the token and its device fingerprint.
- **Parallel refunds.** Wait for a refund to reach a final status before starting another on the same transaction.
- **Cancelling during 3DS.** A payment that is `PENDING` for 3DS cannot be cancelled. It resolves on its own.
- **Routing on metadata.** Metadata that drives routing must be set on the checkout session, not only on the payment.
- **Fallback with provider installments.** Do not add a fallback provider to a route that uses provider installments.
- **Polling as the primary signal.** Use webhooks. Polling adds latency and load.
- **Wrong sandbox test card.** For the Yuno Test Payment Gateway, the Visa card that returns SUCCEEDED is `4507990000000002` (exp `11/28`, CVV `123`). Stripe-style `4242…` and `4111…` are not Gateway cards. Full matrix: [Yuno Testing Gateway](https://docs.y.uno/docs/direct-integration-use-cases/yuno-testing-gateway).

## Verification checklist

- [ ] Base URL from config; sandbox (`api-sandbox.y.uno`) when unset
- [ ] `private-secret-key` only on the server; the browser gets only `public-api-key` and the session id
- [ ] Every payment, refund and cancel sends a fresh UUID `X-Idempotency-Key`; retries of the same request reuse it
- [ ] Amounts in major units
- [ ] Checkout session created server-side at `POST /v1/checkout/sessions` before the SDK starts
- [ ] Payment `status` and `sub_status` read at payment level; any 2xx accepted
- [ ] Webhook verified with `x-hmac-signature` over the raw body, timing-safe compare, 401 on mismatch
- [ ] Webhook retries de-duplicated on `data.idempotency_key`
- [ ] Refunds use the transaction-scoped path with `merchant_reference`, one at a time
- [ ] Recurring charges carry `stored_credentials` with a valid `reason`, `usage: USED` and the `network_transaction_id`

## Resources

**Full index**: https://docs.y.uno/llms.txt

1. [API environments](https://docs.y.uno/reference/getting-started/api-environments)
2. [Authentication](https://docs.y.uno/reference/getting-started/authentication)
3. [Create checkout session](https://docs.y.uno/reference/checkout-sessions/create-checkout-session)
4. [Create payment](https://docs.y.uno/reference/payments/create-payment)
5. [Refund payments](https://docs.y.uno/docs/direct-integration-use-cases/refund-payments)
6. [Stored credentials](https://docs.y.uno/docs/payment-features/stored-credentials)
7. [Verify webhook signatures (HMAC)](https://docs.y.uno/docs/webhooks/verify-webhook-signatures-hmac)
8. [Webhook object and examples](https://docs.y.uno/docs/webhooks/object-and-examples)
9. [Seamless SDK web payments](https://docs.y.uno/docs/sdks/seamless-sdk/web-payments)
