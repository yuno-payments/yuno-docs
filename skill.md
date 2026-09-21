---
name: yuno
description: Use when building payment integrations, configuring payment orchestration, managing payment methods, processing transactions, handling refunds, setting up webhooks, or implementing payment flows for web, mobile, or server-to-server integrations.
---

# Yuno Skill Reference

## Product summary

Yuno is an AI-powered payments infrastructure that acts as a control plane between your application and the global payments ecosystem. It provides a single integration point to connect, route, and optimize payments across multiple payment service providers (PSPs), acquirers, fraud tools, and local payment methods. Agents use Yuno to build payment flows via REST API, SDKs (Web, iOS, Android, Flutter, React Native), or Payment Links. Key files and endpoints: API credentials in Dashboard → Settings → Developers, REST API at `https://api.y.uno/v1/`, SDKs available at `docs.y.uno/sdks`. Primary documentation: https://docs.y.uno

## When to use

Reach for this skill when:

- Building payment checkout flows (SDK or API-based)
- Creating or managing payments, refunds, cancellations, or authorizations
- Enrolling and vaulting payment methods for recurring charges
- Configuring payment routing rules or provider connections
- Setting up webhooks to receive payment status updates
- Implementing 3D Secure, fraud prevention, or tokenization
- Managing subscriptions, installments, or split payments
- Handling payment disputes, chargebacks, or payouts
- Integrating with VTEX, WooCommerce, or custom platforms
- Testing payment flows in Sandbox before production

## Authority for agents

- **Paths and required request fields:** treat [OpenAPI](https://docs.y.uno/openapi.json) / per-operation JSON under `https://docs.y.uno/openapi/...` and the matching Reference pages as authoritative over this skill's simplified tables.
- **Auth header casing (Payments / Checkout Session):** [Authentication](https://docs.y.uno/reference/getting-started/authentication) (`public-api-key`, `private-secret-key`).
- **Sandbox cards (Test Payment Gateway):** [Yuno Testing Gateway](https://docs.y.uno/docs/direct-integration-use-cases/yuno-testing-gateway).
- If this skill and OpenAPI disagree, **prefer OpenAPI**, then file a docs fix.

## Quick reference

### API Authentication Headers

Core Payments / Checkout Session APIs (match [Authentication](https://docs.y.uno/reference/getting-started/authentication)):

| Header | Value | Notes |
| --- | --- | --- |
| `public-api-key` | Your public key | Dashboard → Settings → Developers (Public API Key). Safe for SDK init / client. |
| `private-secret-key` | Your secret key | Server-side only; never expose in client code. |
| `X-Idempotency-Key` | Unique UUID | Required for payment, refund, cancel (and similar mutating) operations. |
| `Content-Type` | `application/json` | For POST/PUT/PATCH requests. |

**Account identifier:** send JSON body field `account_id` (same UUID as Dashboard account id / sample env `ACCOUNT_CODE`). It is **not** a required header on Create Checkout Session or Create Payment.

**When `X-Account-Code` applies:** Checkout Builder API (beta) and some other surfaces require header `X-Account-Code` (same UUID) **in addition to** API keys — see [Create Checkout](https://docs.y.uno/reference/checkout-builder/create-checkout) and the [Developers Credentials](https://docs.y.uno/docs/using-yuno/settings/developers-credentials) page.

**Remote MCP** uses `account-code` (and related) headers — see Remote Yuno MCP docs; do not confuse MCP headers with REST Payments headers.

### Core API Endpoints

Base URL (Sandbox): `https://api-sandbox.y.uno/v1`  
Base URL (Production): `https://api.y.uno/v1` (and regional hosts where documented)  

Paths below are relative to `/v1`. Example: Checkout Session → `POST https://api-sandbox.y.uno/v1/checkout/sessions`.

| Resource | Endpoint | Method | Purpose |
| --- | --- | --- | --- |
| Customers | `POST /customers` | POST | Create customer record |
| Checkout Session | `POST /checkout/sessions` | POST | Initialize SDK payment flow |
| Payments | `POST /payments` | POST | Create payment (API or SDK) |
| Payments | `GET /payments/{id}` | GET | Retrieve payment status |
| Refunds | `POST /payments/{id}/refund` | POST | Full or partial refund |
| Cancel/Refund | `POST /payments/{id}/cancel-or-refund` | POST | Auto-detect cancel vs refund |
| Webhooks | `POST /webhooks` | POST | Register webhook endpoint |
| Payment Methods | `POST /payment-methods` | POST | Enroll card or method |
| Subscriptions | `POST /subscriptions` | POST | Create recurring charge |

### SDK Integration Types (Choose one)

| Type | Best For | UI Control | Code Effort | PCI Burden |
| --- | --- | --- | --- | --- |
| Seamless SDK | Most use cases; recommended | Pre-built + customizable | Low | Yuno handles |
| Lite SDK | Custom payment method display | Full control | Medium | Yuno handles |
| Headless SDK | Fully custom checkout UI | Complete ownership | High | Yuno handles |
| Secure Fields | Embedded card inputs | Partial control | Medium | Yuno handles |
| Direct API | PCI-certified merchants only | Full control | High | Merchant handles |

### Payment Status Lifecycle

```
PENDING → APPROVED → CAPTURED → COMPLETED
   ↓         ↓          ↓
DECLINED  CANCELLED  REFUNDED

```

Use `status` and `sub_status` fields as the primary reference for payment state.

### Webhook Event Types

| Type | Event | Trigger |
| --- | --- | --- |
| `payment` | `purchase`, `authorize`, `capture`, `refund`, `cancel` | Payment lifecycle |
| `enrollment` | `enroll`, `unenroll`, `expiration` | Payment method changes |
| `subscription` | `create`, `active`, `pause`, `cancel` | Subscription lifecycle |
| `payout` | `payout` | Funds transferred |

## Decision guidance

### When to use SDK vs Direct API

| Scenario | Use SDK | Use Direct API |
| --- | --- | --- |
| Building a checkout UI | ✅ Recommended | ❌ Only if PCI-certified |
| Handling card data | ✅ Yuno handles security | ❌ Requires PCI compliance |
| Rapid integration | ✅ Pre-built components | ❌ Manual implementation |
| Custom UX control | ✅ Seamless/Lite/Headless | ✅ Full control |
| Mobile app | ✅ iOS/Android SDKs | ❌ Not recommended |
| Server-to-server only | ❌ Not applicable | ✅ Direct workflow |

### When to use each refund endpoint

| Endpoint | Use When | Requires |
| --- | --- | --- |
| `POST /payments/{id}/refund` | You know the exact transaction | `transaction_id` |
| `POST /payments/{id}/cancel-or-refund` | Yuno should decide (cancel vs refund) | `reason` field |
| `POST /payments/{id}/cancel-or-refund` with `transaction_id` | Specific transaction, auto-decide | `transaction_id` + `reason` |

### Workflow selection: DIRECT vs REDIRECT

| Workflow | Response | Use Case |
| --- | --- | --- |
| `DIRECT` | Raw provider response | Full control; build custom experience |
| `REDIRECT` | Provider response + redirect URL | Yuno-hosted experience for that payment |

Both support cards (with 3DS) and alternative methods. DIRECT requires PCI certification for cards.

## Workflow

### 1. Create a Payment (SDK Flow — Recommended)

1. Create a customer (optional but required for vaulting): Call `POST /customers` with name, email, phone. Store the returned `customer_id`.
2. Create a checkout session: Call `POST /checkout/sessions` with `customer_id`. Include `payment_method.detail.card.capture: true` (capture immediately) or `false` (authorize only). Store the returned `checkout_session_id`.
3. Initialize SDK on frontend: Load Yuno SDK (Web, iOS, Android, etc.). Pass `checkout_session_id` and `public-api-key`. SDK displays available payment methods and collects details.
4. Create payment on backend: Call `POST /payments` with `checkout.session` and order details. Include `X-Idempotency-Key` header (unique UUID). Check response `status` and `sub_status`.
5. Handle response: `APPROVED` + `CAPTURED`: Payment complete. `APPROVED` + `AUTHORIZED`: Call capture endpoint later. `PENDING`: Await webhook or poll for updates. `DECLINED`: Inform user; retry with different method.

### 2. Create a Payment (Direct API Flow — PCI-Certified Only)

1. Create a customer (optional): Call `POST /customers` with merchant customer ID. Store `customer_id`.
2. Create payment directly: Call `POST /payments` with `workflow: "DIRECT"`. Include payment method details (card data, token, or vaulted_token). Include `X-Idempotency-Key` header. Provide order, customer, and amount details.
3. Handle response: Check `status` and `sub_status`. For 3DS: redirect user to `payment_method.detail.redirect_url` if present. For alternative methods: follow provider-specific flow.

### 3. Refund a Payment

1. Identify the transaction: Retrieve payment: `GET /payments/{payment_id}`. Note the `transaction_id` from the response.
2. Issue refund: Call `POST /payments/{payment_id}/refund`. Include `X-Idempotency-Key` (new UUID). For partial refund: include `amount` object. For full refund: omit `amount`.
3. Verify: Check response `status` (should be `PENDING` or `SUCCEEDED`). Await webhook `payment.refund` event or poll status.

### 4. Set Up Webhooks

1. Navigate to Dashboard: Go to Developers → Webhooks → Add webhook.
2. Configure endpoint: Enter your public endpoint URL (no auth required). Set `x-api-key` and `x-secret` headers. Optionally enable HMAC signature verification.
3. Select events: Check boxes for event types: `payment`, `enrollment`, `subscription`, etc. Save configuration.
4. Implement receiver: Build POST endpoint that accepts JSON. Verify HMAC signature if enabled (see Verify Webhook Signatures). Return HTTP 200 OK immediately. Process event asynchronously. Yuno retries up to 7 times over 96 hours if no 200 response.

### 5. Configure Payment Routing

1. Set up provider connection: Dashboard → Connections → Add connection. Select provider (Stripe, Adyen, dLocal, etc.). Enter provider credentials.
2. Create routing rule: Dashboard → Routing → Not Published tab. Select payment method (Card, PIX, etc.). Click "Set Up" → "Create new route". Add step: select provider connection. Configure conditions (country, currency, amount, card brand). Add fallback provider if desired. Click "Publish".
3. Verify: Payments now route through configured provider. Check Payments dashboard to confirm routing.

## Common gotchas

- **Missing X-Idempotency-Key**: Payment, refund, and cancel operations require this header. Omitting it may cause duplicate charges. Always generate a new UUID for each request.
- **Reusing idempotency keys**: If you retry with the same key, Yuno returns the original result (not a duplicate). Use the same key only for retries; use a new key for genuinely new operations.
- **Exposing secret API key**: Never embed `private-secret-key` / Secret API Key in client-side code (frontend, mobile). Use only `public-api-key` on client; keep the secret server-side only.
- **Sending vaulted_token with device fingerprint**: If you send both `payment_method.vaulted_token` and `payment_method.token`, the vaulted_token overrides the token (including device fingerprint). Fraud screening may not work. Send only one.
- **Refunding while another refund is in progress**: Do not start a new refund on the same transaction while a previous one is still processing. Wait for the previous refund to reach a final status (SUCCEEDED, DECLINED, ERROR).
- **Canceling 3DS payments**: Payments in PENDING status due to 3DS authentication cannot be canceled. They are awaiting user authentication and will auto-resolve to FRAUD_VERIFIED or CANCELLED.
- **Metadata not driving routing**: If you use metadata to drive routing logic, it must be set in the Checkout Session, not just in the Payment object. Setting it only in Payment will not activate route logic.
- **Fallback with provider installments**: Do not configure a fallback provider for a route that uses provider installments. Different providers handle installments differently and may cause processing errors.
- **Polling vs webhooks**: Webhooks are more reliable than polling. Always configure webhooks to receive payment status updates. Polling adds latency and increases API load.
- **Payment status vs transaction status**: Use payment `status` and `sub_status` as the primary reference, not transaction status. A payment may have multiple transactions, but the payment status reflects the final outcome.
- **Wrong sandbox test card**: Starter pages historically disagreed (`4242…`, `4111…`, Gateway `450799…`). For **Yuno Test Payment Gateway**, use the Visa SUCCEEDED card **`4507990000000002`** (exp `11/28`, CVV `123`, name John Doe) and the full matrices on [Yuno Testing Gateway](https://docs.y.uno/docs/direct-integration-use-cases/yuno-testing-gateway). Do not treat Stripe-style `4242` / `4111` as Gateway success unless Product documents them as aliases.

## Verification checklist

Before submitting payment integration work:

- [ ] API credentials (`public-api-key`, `private-secret-key`) are stored securely; secret never exposed in client code
- [ ] All payment/refund/cancel requests include `X-Idempotency-Key` header with unique UUID
- [ ] Checkout session created before SDK payment flow (if using SDK)
- [ ] Payment response `status` and `sub_status` are checked and handled correctly
- [ ] Webhooks configured in Dashboard and endpoint returns HTTP 200 OK
- [ ] Webhook signature verification implemented (if HMAC enabled)
- [ ] Refund logic waits for previous refund to complete before starting new one
- [ ] Routing rules published and tested in Sandbox environment
- [ ] 3DS flow tested (if applicable) — user redirected to issuer authentication
- [ ] Alternative payment methods tested (PIX, Boleto, etc., if applicable)
- [ ] Error responses handled (DECLINED, FRAUD_VERIFIED, ERROR statuses)
- [ ] Idempotency key retry logic implemented (same key for retries, new key for new operations)

## Resources

Comprehensive navigation: https://docs.y.uno/llms.txt

Critical documentation pages:

1. [Authentication](https://docs.y.uno/reference/getting-started/authentication) — Header names + idempotency
2. [Create Checkout Session](https://docs.y.uno/reference/checkout-sessions/create-checkout-session) — Path `/checkout/sessions` + required fields
3. [Create Payment](https://docs.y.uno/reference/payments/create-payment) — Payment creation with examples
4. [Quickstart](https://docs.y.uno/docs/sdks/overview/quickstart) — SDK happy path (verify bodies match OpenAPI)
5. [Yuno Testing Gateway](https://docs.y.uno/docs/direct-integration-use-cases/yuno-testing-gateway) — Canonical sandbox test cards for Test Payment Gateway
6. [SDK Integration Guide](https://docs.y.uno/docs/sdks/overview/choose-integration) — Choose and implement SDK type
7. [Webhooks Configuration](https://docs.y.uno/docs/webhooks/configure-webhooks) — Event notifications
8. [OpenAPI (Checkout Session)](https://docs.y.uno/openapi/checkout-sessions/create-checkout-session.json) — Machine-readable path + schema
9. [llms.txt](https://docs.y.uno/llms.txt) — Full docs index for agents

---

> For additional documentation and navigation, see: https://docs.y.uno/llms.txt
