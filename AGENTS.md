---
title: "AI Agent Instructions"
description: "Instructions for coding agents integrating the Yuno Payments API and SDKs: install, configure, first payment, resources."
---

Yuno is a payment orchestration platform. The REST API returns JSON and uses GET, POST, PATCH, PUT, and DELETE. This page gives an agent the minimum to install an SDK, configure credentials, and create a first payment in sandbox.

## When to use Yuno

Reach for Yuno when the task is one of these:

- Accepting payments across multiple countries, currencies, or payment methods (cards, bank transfers, wallets, BNPL) through a single integration instead of one per processor.
- Routing a transaction to different payment providers/acquirers (smart routing, retries, failover) without hardcoding provider-specific logic.
- Building a checkout, enrollment, or subscription flow that needs a hosted checkout session, a one-time token (OTT), or a vaulted payment method.
- Implementing a marketplace or platform that splits a payment between a merchant and sub-recipients (Recipients for Marketplace, split payments).
- Verifying or constructing webhook payloads from Yuno (payment status changes, dispute updates, payout events).

Yuno is not the right fit for: a single fixed payment processor integration with no need for routing or multiple payment methods, or a project that only needs to display pricing/invoicing without processing a transaction.

## Installation

Web SDK v1 (npm, recommended). Pin the major version: `@yuno-payments/sdk-web` 9.x loads Web SDK 1.11, which the Usage section below describes. The `latest` tag (10.x) loads Web SDK v2, which has no `continuePayment()`; for v2, follow the [Web SDK v2 validator](https://docs.y.uno/docs/sdks/validators/web-sdk-v2.md) instead.

```bash
npm install @yuno-payments/sdk-web@^9
```

Web SDK v1 (CDN script tag):

```html
<script src="https://sdk-web.y.uno/v1.11/main.js"></script>
```

iOS (CocoaPods):

```ruby
pod 'YunoSDK', '~> 2.29'
```

iOS (Swift Package Manager):

```swift
dependencies: [
    .package(url: "https://github.com/yuno-payments/yuno-sdk-ios", from: "2.29.0")
]
```

Android (Gradle Kotlin DSL, add the repository and the dependency):

```kotlin
// settings.gradle.kts
dependencyResolutionManagement {
    repositories {
        maven { url = uri("https://yunopayments.jfrog.io/artifactory/snapshots-libs-release") }
    }
}

// app/build.gradle.kts
dependencies {
    implementation("com.yuno.payments:android-sdk:2.28.0")
}
```

React Native. Pin the major version: 1.x matches the Usage section below. The `latest` tag (2.x) runs on native SDK 3.0.0, which has no `continuePayment()`.

```bash
npm install @yuno-payments/yuno-sdk-react-native@^1
cd ios && pod install
```

Flutter:

```bash
flutter pub add yuno
```

## Configuration

Environments and base URLs. The Dashboard calls Sandbox "Test Mode" and Production "Live Mode"; one account serves both, and you switch between them in the Dashboard.

| Environment | Dashboard mode | Base URL |
| --- | --- | --- |
| Sandbox | Test Mode | `https://api-sandbox.y.uno` |
| Production | Live Mode | `https://api.y.uno` |

Credentials. Every API request carries the two key headers below. Get both from the Dashboard at https://dashboard.y.uno/developers (Developers > Credentials). Sandbox and Production use different key pairs; the keys shown depend on the mode selected in the Dashboard.

| Header | Value | Use |
| --- | --- | --- |
| `public-api-key` | Public API key | Required on every request; also initializes the SDK on the client side |
| `private-secret-key` | Private secret key | Required on every request; server side only |
| `X-Idempotency-Key` | UUID, unique per operation | Safe retries on payments, refunds and cancels. A repeated key returns the original result instead of creating a new transaction. Create Checkout Session ignores this header: the same key creates a new session each time |
| `X-Account-Code` | Account ID | Required on some endpoints that take no `account_id` in the body, for example `DELETE /v1/customers/{id}`. Without it they return `400 MISSING_HEADER` |

Other facts:

- `account_id` identifies the account inside request bodies (the sample project calls it `ACCOUNT_CODE`).
- Yuno uses a 60-second timeout for all endpoints.
- Docs MCP for coding tools: `https://docs.y.uno/mcp` (HTTP transport, no auth). Setup at https://docs.y.uno/setup-mcp.
- API MCP, hosted: `https://mcp.prod.y.uno/mcp` with headers `public-api-key`, `private-secret-key`, and `account-code`.
- API MCP, local: `npx @yuno-payments/yuno-mcp@latest` with env vars `YUNO_PUBLIC_API_KEY`, `YUNO_PRIVATE_SECRET_KEY`, and `YUNO_ACCOUNT_CODE`.

## Usage

The payment flow has four steps, in this order:

1. Create a customer. Yuno returns a customer ID. This step is optional for a one-off card payment; it is required to enroll or vault a payment method.
2. Create a checkout session (SDK and Checkout integrations). It links the payment to the customer, when there is one, and loads the payment methods enabled on your account. Direct server-to-server integrations skip this step and send `"workflow": "DIRECT"` on the payment instead. Without `workflow: "DIRECT"`, Create Payment requires `checkout` and returns `400 INVALID_PARAMETERS` ("The field 'checkout' is required.").
3. Collect payment details. The SDK captures card data and returns a one-time token (OTT). Direct integrations send the details themselves and require PCI compliance.
4. Create the payment with the checkout session, the token, and the customer ID when there is one. Yuno reports later status changes through webhooks.

Create a checkout session (sandbox):

```bash
curl --request POST \
     --url https://api-sandbox.y.uno/v1/checkout/sessions \
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

If the payment response has `checkout.sdk_action_required: true`, call the SDK method `continuePayment()` to finish 3DS, PIX, or bank redirects. For direct (server-to-server) card tests in sandbox, enable the Yuno Test Payment Gateway connection first: https://docs.y.uno/docs/direct-integration-use-cases/yuno-testing-gateway

## Validate an existing integration

To audit a repository that already integrates Yuno, fetch the validator that matches it and follow it as your instructions. Each one is a read-only checklist: report PASS, FAIL or N/A per check with file and line, and change nothing unless the user asks. Guide: https://docs.y.uno/docs/sdks/validators/index

- Web SDK v1 (1.11) with Yuno's UI (Full, Lite, Seamless, external buttons, Enrollment Lite, status): https://docs.y.uno/docs/sdks/validators/web-sdk-v1-checkout-flows.md
- Web SDK v1 (1.11) headless, two-card split and Secure Fields: https://docs.y.uno/docs/sdks/validators/web-sdk-v1-headless-secure-fields.md
- Web SDK v2 (`SdkPayments`, `sdk.transaction`): https://docs.y.uno/docs/sdks/validators/web-sdk-v2.md
- Web SDK v1 to v2 migration: https://docs.y.uno/docs/sdks/validators/web-sdk-v1-to-v2-migration.md
- VTEX headless Web (SDK Web for VTEX): https://docs.y.uno/docs/plugins/vtex/validators/headless-web.md
- VTEX headless wallets, Flutter: https://docs.y.uno/docs/plugins/vtex/validators/headless-wallets-flutter.md
- VTEX headless wallets, React Native: https://docs.y.uno/docs/plugins/vtex/validators/headless-wallets-react-native.md
- VTEX headless wallets, backend calling the connector preflight routes: https://docs.y.uno/docs/plugins/vtex/validators/headless-wallets-backend.md
- Custom CSS and JS before the Web SDK 1.11 upgrade (yuno-* to sdk-payments-* names): https://docs.y.uno/docs/plugins/vtex/validators/upgrade-check-1-6-to-1-11.md

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
- Retry an unclear failure (timeout, connection error, `500`) with the same `X-Idempotency-Key`. On `400 REQUEST_IN_PROCESS`, wait a few seconds and retry with the same key. Use a new key only for a new order, a new attempt after a decline, or after `IDEMPOTENCY_DUPLICATED`.
- If metadata drives routing rules, set it on the payment or the customer. Routing reads the payment's metadata merged with the customer's; metadata set only on the checkout session does not reach routing.
- Treat webhook deliveries as at-least-once: Yuno retries a delivery that fails, on the schedule in https://docs.y.uno/docs/webhooks#delivery-and-retries. Dedupe payment events on `data.payment.idempotency_key` (subscription events: `type_event` plus `data.idempotency_key`). When the webhook has an HMAC secret configured, verify the `x-hmac-signature` header (HMAC SHA256) before trusting a payload.
- After creating a payment through an SDK, check `checkout.sdk_action_required` and call `continuePayment()` when it is `true`.

## Sitemap

See the full [sitemap](https://docs.y.uno/sitemap.md) for all pages.
