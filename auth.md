# Yuno API authentication for agents

This document is the walkthrough for an agent (or the developer steering one) to obtain Yuno API credentials, authenticate requests, handle failures, and revoke keys. Yuno is a payment orchestration platform; its API and MCP server share the same credentials.

## Discover

What Yuno exposes to programmatic clients:

- REST API, described by the OpenAPI 3.1 spec at [https://docs.y.uno/openapi.json](https://docs.y.uno/openapi.json) (YAML at [/openapi.yaml](https://docs.y.uno/openapi.yaml))
- Hosted MCP server at `https://mcp.prod.y.uno/mcp` (HTTP transport) and a local MCP via `npx @yuno-payments/yuno-mcp@latest`
- Docs MCP server for documentation search, config at [/.well-known/mcp.json](https://docs.y.uno/.well-known/mcp.json), no authentication
- Resource catalog at [/.well-known/ai-catalog.json](https://docs.y.uno/.well-known/ai-catalog.json); full docs index at [llms.txt](https://docs.y.uno/llms.txt)

Yuno does not currently publish `agent_auth` discovery metadata (RFC 8414 / RFC 9728 documents), and there is no anonymous or agent-initiated registration endpoint. Credential issuance requires a human with dashboard access, as described below.

## Pick a method

There is one method: **API key pairs** issued per organization and per environment in the Yuno Dashboard.

- `public-api-key` — identifies the account; safe for client-side use
- `private-secret-key` — server-side only; never expose in code repositories or client applications

Sandbox and Production use different key pairs. There is no OAuth flow; the MCP servers use the same API keys.

## Register

A human registers the organization once:

1. Create an organization account at [https://dashboard.y.uno](https://dashboard.y.uno), or ask an existing organization admin to invite the user's email.
2. Sign in to the Dashboard.

An agent cannot self-register. If you are an agent and your user has no Yuno account, stop and ask the user to complete this step.

## Claim

Get the credentials from the Dashboard:

1. Open [https://dashboard.y.uno/developers](https://dashboard.y.uno/developers) (Developers → Credentials).
2. Select the environment: **Test Mode** shows the Sandbox key pair, **Live Mode** shows the Production key pair.
3. Copy `public-api-key` and `private-secret-key`.
4. Organizations with multiple accounts also need the account code (`X-Account-Code` header) shown in the Dashboard.

See [Developers credentials](/docs/using-yuno/settings/developers-credentials) for screenshots and role requirements.

## Use

Send both keys as headers on every REST request:

```
public-api-key: <your public-api-key>
private-secret-key: <your private-secret-key>
```

Base URLs:

| Environment | Base URL                    |
| ----------- | --------------------------- |
| Sandbox     | `https://api-sandbox.y.uno` |
| Production (US) | `https://api.y.uno`     |
| Production (EMEA) | `https://api.eu.y.uno` |

Sandbox data is simulated and does not affect live accounting. Start every integration in Sandbox. See [API environments](/reference/getting-started/api-environments).

On payment mutations (create, capture, cancel, refund, payout), also send an `X-Idempotency-Key` header (UUID). Yuno stores the key and outcome for 24 hours; a repeated key returns the original response instead of duplicating the operation. See [Authentication](/reference/getting-started/authentication#idempotency).

For MCP: connect to `https://mcp.prod.y.uno/mcp` passing `public-api-key`, `private-secret-key`, and `account-code` as request headers (rate limit 15 requests/minute/session, 30 min idle TTL, 6 h absolute), or run the local server with `YUNO_PUBLIC_API_KEY`, `YUNO_PRIVATE_SECRET_KEY`, and `YUNO_ACCOUNT_CODE` environment variables. See [Remote Yuno MCP Server](/docs/ai-capabilities/remote-yuno-mcp-server) and [Building AI Integrations](/docs/ai-capabilities/building-ai-integrations-with-yunos-llms-and-mcp).

## Errors

- `401 Unauthorized` — missing or invalid key headers. Check both headers are present and match the environment of the base URL you are calling.
- `403 Forbidden` — keys valid but not allowed for this resource or environment; verify Test vs Live mode and the account code.
- Mixed-environment mistakes are the most common failure: Sandbox keys against `api.y.uno` (or the reverse) return `401`.

Every error body is JSON with a `code` field. See [Response codes](/reference/getting-started/response-codes) for the catalog.

## Revocation

Rotate or revoke keys in the Dashboard under [Developers → Credentials](https://dashboard.y.uno/developers). Rotating invalidates the old pair; update every consumer before rotating Production keys. Treat any `private-secret-key` that reaches a repository, log, or client application as compromised and rotate it immediately.

## Machine-readable docs

Every Yuno Docs page is available as plain-text Markdown by appending `.md` to its URL, for both guides and API reference pages. See [llms.txt](https://docs.y.uno/llms.txt) for the full page index.
