# Yuno API authentication for agents

This file tells AI agents and automated clients how to authenticate with Yuno.
Yuno is a payment orchestration platform; its public API and Model Context
Protocol (MCP) server are the two surfaces an agent will use.

## REST API (server-to-server)

The Yuno API authenticates with two API-key headers, sent on every request:

| Header | Purpose |
| --- | --- |
| `public-api-key` | Identifies your account. Safe to use from the SDK/client. |
| `private-secret-key` | Authorizes server-side calls. Never expose it in a browser or mobile client. |

Base URLs:

- Production: `https://api.y.uno`
- Sandbox: `https://api-sandbox.y.uno`

Mutating requests accept an optional `X-Idempotency-Key` header so retries do not
create duplicate payments.

Obtain keys from the Yuno Dashboard under **Settings → API keys**. Use sandbox
keys for testing; they cannot move real funds.

```http
POST /v1/payments HTTP/1.1
Host: api-sandbox.y.uno
public-api-key: YOUR_PUBLIC_API_KEY
private-secret-key: YOUR_PRIVATE_SECRET_KEY
Content-Type: application/json
```

Full machine-readable contract: <https://docs.y.uno/api-reference/openapi.json>

## MCP server (agent tools)

Yuno exposes a remote MCP server for agents. Discovery metadata:

- MCP Server Card: `/.well-known/mcp/server-card.json`
- OAuth authorization server: `/.well-known/oauth-authorization-server`
- OAuth protected resource: `/.well-known/oauth-protected-resource`

The MCP server is sandbox/development only. Do not route live merchant payments
through MCP. See <https://docs.y.uno/docs/ai-capabilities/remote-yuno-mcp-server>.

## Documentation entry points for agents

- Curated index: <https://docs.y.uno/llms.txt>
- Full text: <https://docs.y.uno/llms-full.txt>
- Any page is available as raw Markdown by appending `.md` to its URL.

## Contact

Support: support@y.uno
