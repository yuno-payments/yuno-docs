# Authentication for AI agents

How to authenticate programmatic and agent-driven requests against the Yuno API and MCP server.

## REST API

The Yuno API uses API key authentication. Every request requires two headers:

- `public-api-key`
- `private-secret-key`

Find both in the [Yuno Dashboard](https://dashboard.y.uno/developers), under Developers credentials. Sandbox and Production use different key pairs; the keys shown in the Dashboard depend on which environment (Test Mode or Live Mode) is selected.

Do not share `private-secret-key` in public places like GitHub or Bitbucket.

## Base URLs

| Environment | Base URL |
| --- | --- |
| Sandbox | `https://api-sandbox.y.uno` |
| Production | `https://api.y.uno` |

Sandbox data is simulated and does not affect live accounting or metrics. See [API environments](/reference/getting-started/api-environments) for full details.

## Idempotency

Send an `X-Idempotency-Key` header (UUID) on requests that support it to safely retry after a connection issue without duplicating the operation. Yuno stores the key and the transaction outcome for 24 hours. A repeated key within that window returns the original response instead of creating a new transaction.

See [Authentication](/reference/getting-started/authentication#idempotency) for retry and error-handling behavior.

## Model Context Protocol (MCP)

Yuno exposes its API as MCP tools for AI agents. Two ways to connect:

**Local (CLI-launched)**: run `npx @yuno-payments/yuno-mcp@latest` and set `YUNO_PUBLIC_API_KEY`, `YUNO_PRIVATE_SECRET_KEY`, and `YUNO_ACCOUNT_CODE` as environment variables. See [Building AI Integrations with Yuno's LLMs and MCP](/docs/ai-capabilities/building-ai-integrations-with-yunos-llms-and-mcp).

**Remote (hosted endpoint)**: connect over HTTP transport to `https://mcp.prod.y.uno/mcp`, passing `public-api-key`, `private-secret-key`, and `account-code` as request headers. Adds IP binding, rate limiting (15 requests/minute/session), and session TTLs (30 min idle, 6 hours absolute). See [Remote Yuno MCP Server](/docs/ai-capabilities/remote-yuno-mcp-server).

Both methods use the same API key credentials as the REST API, no separate OAuth flow.

## Machine-readable docs

Every Yuno Docs page is available as plain-text Markdown by appending `.md` to its URL, for both guides and API reference pages. See [llms.txt](https://docs.y.uno/llms.txt) for the full page index.
