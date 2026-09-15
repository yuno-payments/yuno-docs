---
title: "AGENTS.md"
description: "Instructions for coding agents integrating the Yuno Payments API and SDKs: install, configure, first payment, resources."
---

Yuno is a payment orchestration platform. The REST API returns JSON and uses GET, POST, and PATCH. This page gives an agent the minimum to install an SDK, configure credentials, and create a first payment in sandbox.

## Installation

Web SDK (npm, recommended):

```bash
npm install @yuno-payments/sdk-web
```

Web SDK (CDN script tag):

```html
<script src="https://sdk-web.y.uno/v1.10/main.js"></script>
```

iOS (CocoaPods):

```ruby
pod 'YunoSDK', '~> 2.11.1'
```

iOS (Swift Package Manager):

```swift
dependencies: [
    .package(url: "https://github.com/yuno-payments/yuno-sdk-ios", from: "2.11.1")
]
```

Android (Gradle, add the repository and the dependency):

```kotlin
maven { url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" }

dependencies {
    implementation 'com.yuno.payments:android-sdk:2.11.0'
}
```

React Native:

```bash
npm install @yuno-payments/yuno-sdk-react-native
cd ios && pod install
```

Flutter:

```bash
flutter pub add yuno
```

## Configuration

Environments and base URLs. The Dashboard calls Sandbox "Test Mode" and Production "Live Mode"; one account serves both, and a toggle switches between them.

| Environment | Dashboard mode | Base URL |
| --- | --- | --- |
| Sandbox | Test Mode | `https://api-sandbox.y.uno` |
| Production (US) | Live Mode | `https://api.y.uno` |
| Production (EMEA) | Live Mode | `https://api.eu.y.uno` |

Credentials. Every API request carries two headers. Get both from the Dashboard at https://dashboard.y.uno/developers (Developers > Credentials). Sandbox and Production use different key pairs; the keys shown depend on the mode selected in the Dashboard.

| Header | Value | Use |
| --- | --- | --- |
| `public-api-key` | Public API key | Required on every request; also initializes the SDK on the client side |
| `private-secret-key` | Private secret key | Required on every request; server side only |
| `X-Idempotency-Key` | UUID, unique per request | Safe retries; Yuno stores the key and outcome for 24 hours |

Other facts:

- `account_id` identifies the account inside request bodies (the sample project calls it `ACCOUNT_CODE`).
- Yuno uses a 60-second timeout for all endpoints.
- Docs MCP for coding tools: `https://docs.y.uno/mcp` (HTTP transport, no auth). Setup at https://docs.y.uno/setup-mcp.
- API MCP, hosted: `https://mcp.prod.y.uno/mcp` with headers `public-api-key`, `private-secret-key`, and `account-code`.
- API MCP, local: `npx @yuno-payments/yuno-mcp@latest` with env vars `YUNO_PUBLIC_API_KEY`, `YUNO_PRIVATE_SECRET_KEY`, and `YUNO_ACCOUNT_CODE`.

## Usage

The payment flow has four steps, in this order:

1. Create a customer. Yuno returns a customer ID used in every later step.
2. Create a checkout session (SDK and Checkout integrations). It links the customer to the payment and loads the payment methods enabled on your account. Direct server-to-server integrations skip this step.
3. Collect payment details. The SDK captures card data and returns a one-time token (OTT). Direct integrations send the details themselves and require PCI compliance.
4. Create the payment with the customer ID, the checkout session, and the token. Yuno reports later status changes through webhooks.

Create a checkout session (sandbox):

```bash
curl --request POST \
     --url https://api-sandbox.y.uno/v1/checkout/sessions \
     --header 'X-Idempotency-Key: <UUID>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'public-api-key: <PUBLIC_API_KEY>' \
     --header 'private-secret-key: <PRIVATE_SECRET_KEY>' \
     --data '{
       "account_id": "<ACCOUNT_ID>",
       "merchant_order_id": "1717681150",
       "payment_description": "Test Cards",
       "country": "US",
       "customer_id": "<CUSTOMER_ID>",
       "amount": { "currency": "USD", "value": 100 }
     }'
```

Create a payment with the one-time token from the SDK (sandbox):

```bash
curl --location 'https://api-sandbox.y.uno/v1/payments' \
--header 'X-Idempotency-Key: <UUID>' \
--header 'public-api-key: <PUBLIC_API_KEY>' \
--header 'private-secret-key: <PRIVATE_SECRET_KEY>' \
--header 'Content-Type: application/json' \
--data '{
    "description": "SDK Checkout",
    "account_id": "<ACCOUNT_ID>",
    "merchant_order_id": "123456",
    "merchant_reference": "reference_001",
    "country": "US",
    "amount": { "currency": "USD", "value": 100 },
    "checkout": { "session": "<CHECKOUT_SESSION>" },
    "customer_payer": { "id": "<CUSTOMER_ID>" },
    "payment_method": { "token": "<ONE_TIME_TOKEN>" }
}'
```

If the payment response has `sdk_action_required: true`, call the SDK method `continuePayment()` to finish 3DS, PIX, or bank redirects. For direct (server-to-server) card tests in sandbox, enable the Yuno Test Payment Gateway connection first: https://docs.y.uno/docs/direct-integration-use-cases/yuno-testing-gateway

## Resources

- https://docs.y.uno/llms.txt (page index; append `.md` to any docs URL for plain Markdown)
- https://docs.y.uno/llms-full.txt
- https://docs.y.uno/openapi.json
- https://docs.y.uno/openapi.yaml
- https://docs.y.uno/setup-mcp
- https://docs.y.uno/auth.md
- https://docs.y.uno/docs/developers
- https://docs.y.uno/reference/getting-started/api-reference-overview
- https://docs.y.uno/reference/getting-started/authentication
- https://docs.y.uno/reference/reference-lists
- https://docs.y.uno/docs/glossary (Yuno terminology)
- https://docs.y.uno/sitemap.md (markdown sitemap of every page)

## Conventions

- Keep `private-secret-key` on the server. Never embed it in client-side code, and never commit it to public repositories such as GitHub or Bitbucket. The public API key is the one used for client-side SDK initialization.
- Start in Sandbox (Test Mode) with sandbox keys. A new organization has access only to Test Mode; Live Mode requires an activation request and separate keys.
- Retry an unclear failure (timeout, connection error, `500`) with the same `X-Idempotency-Key`. Use a new key only for a new order or a new attempt after a decline or `IDEMPOTENCY_DUPLICATED`.
- If metadata drives routing rules, set it on the checkout session, not only on the payment.
- Treat webhook deliveries as at-least-once: Yuno retries up to seven times, so dedupe on `data.idempotency_key` and verify the HMAC SHA256 signature before trusting a payload.
- After creating a payment through an SDK, check `sdk_action_required` and call `continuePayment()` when it is `true`.

## Sitemap

See the full [sitemap](https://docs.y.uno/sitemap.md) for all pages.
