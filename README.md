# Yuno API Documentation

Official documentation for [Yuno](https://y.uno) — the payment orchestration platform for Latin America and beyond.

**Live site:** [yuno-3979e326.mintlify.app](https://yuno-3979e326.mintlify.app/)

## What's Inside

| Section | Pages | Description |
|---------|-------|-------------|
| **Getting Started** | 5 | Authentication, environments, quickstart with multi-language examples |
| **Core Concepts** | 11 | Payment flows, checkout sessions, customers, webhooks, idempotency, error handling |
| **Guides** | 40+ | SDK integration (Web, iOS, Android, Flutter), direct API, testing, webhooks, payment methods |
| **API Reference** | 90+ | Full OpenAPI 3.1 spec with 58 paths, 45 schemas, interactive playground |
| **Features** | 25+ | Subscriptions, digital wallets, installments, network tokens, payouts, splits, BaaS |
| **Security** | 12 | 3DS optimization, PCI compliance, chargeback prevention, incident response |
| **AI** | 8 | Aida ML engine, MCP integration, agent orchestration, error recovery |
| **SDKs** | 15 | Web, iOS, Android, Flutter, React components, Vue components |
| **Reference** | 9 | Country matrix, provider comparison, glossary, response codes |

**Total: 230+ pages** covering payments, orchestration, and compliance across 17+ countries.

## Tech Stack

- **Platform:** [Mintlify](https://mintlify.com)
- **API Spec:** OpenAPI 3.1.0 (`api-reference/openapi.json`)
- **Config:** `docs.json`

## LLM Readability

This documentation is optimized for AI/LLM consumption:

- **`/llms.txt`** — Auto-generated index of all pages for LLM discovery
- **`/llms-full.txt`** — Complete documentation in a single file for full-context ingestion
- **MCP Server** — Connect AI tools directly to Yuno's API via the [MCP integration guide](https://yuno-3979e326.mintlify.app/ai/llm-mcp-integration)
- **Agent workflows** — Multi-step orchestration patterns for AI agents

AI tools (Claude Code, Cursor, Windsurf, etc.) can index the full documentation via:

```
https://yuno-3979e326.mintlify.app/llms.txt
https://yuno-3979e326.mintlify.app/llms-full.txt
```

## Local Development

```bash
# Install Mintlify CLI
npm i -g mint

# Preview locally
mint dev
```

Open [http://localhost:3000](http://localhost:3000) to view the docs.

## Deployment

Changes pushed to `main` are automatically deployed via the Mintlify GitHub app.

## Repository Structure

```
.
├── docs.json                    # Navigation and site config
├── api-reference/
│   ├── openapi.json             # OpenAPI 3.1 spec (58 paths, 45 schemas)
│   ├── checkout-sessions/       # Checkout session endpoints
│   ├── payments/                # Payment CRUD + capture/cancel/refund
│   ├── customers/               # Customer management
│   ├── subscriptions/           # Subscription lifecycle
│   ├── recipients/              # Recipient onboarding + transfers
│   ├── baas/                    # Banking as a Service
│   ├── campaigns/               # Campaign management
│   └── ...
├── getting-started/             # Quickstart, auth, environments
├── core-concepts/               # Payment flow, webhooks, idempotency
├── guides/
│   ├── sdk/                     # Web, mobile, framework SDKs
│   ├── direct-api/              # Direct API integration
│   ├── testing/                 # Sandbox, test cards, scenarios
│   ├── webhooks/                # Setup, events, signatures, local testing
│   └── payment-methods/         # PIX, Boleto, OXXO, cards, BNPL
├── features/                    # Subscriptions, wallets, tokens, payouts
├── security/                    # 3DS, PCI, chargebacks, incidents
├── ai/                          # Aida, MCP, agent orchestration
├── platform/                    # Dashboard guides
├── reference/                   # Country matrix, provider coverage, glossary
├── troubleshooting/             # Error codes, FAQ
└── changelog/                   # SDK and API changelogs
```

## Support

- **Email:** support@y.uno
- **Dashboard:** [dashboard.y.uno](https://dashboard.y.uno)
- **GitHub:** [github.com/yuno-payments](https://github.com/yuno-payments)
