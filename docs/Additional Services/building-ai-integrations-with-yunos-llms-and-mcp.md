---
title: Building AI Integrations with Yuno's LLMs and MCP
deprecated: false
hidden: true
metadata:
  robots: index
---
Yuno offers tools to help you build AI-aware and merchant-friendly payment experiences. Our machine-ready documentation makes it easier for large language models (LLMs) to understand Yuno’s APIs and documentation, while our Model Context Protocol (MCP) provides a seamless way to integrate Yuno's capabilities into your product.

This guide introduces how to work with both components. You’ll learn how the LLM layer empowers AI tools to deliver more accurate and contextual integration support, and how the MCP can embed key payment and merchant functionality directly into your environment, enabling faster builds with less friction.

## Machine-ready content in plain text

To help large language models understand and support Yuno integrations, we provide a dedicated set of Markdown (.md) files designed specifically for machine readability. These files describe Yuno’s APIs, product behavior, and implementation details in a format that’s easy for LLMs to parse and analyze.

The .md files are part of [Yuno Docs](docs.y.uno). You can access them by adding .md to the end of any Yuno Docs URL (this works for both Guides and API Reference pages). The content is served in plain text, making it easier for machines to extract and process the underlying knowledge without requiring human interpretation.

This setup enables AI assistants, developer tools, and chat-based agents to answer questions, explain features, and guide integrations automatically. It’s a lightweight but powerful way to open up Yuno’s documentation to a wide range of intelligent applications.

For example, a chatbot with access to these files could help a developer debug a payment integration, explain how vaulted tokens work, or walk through MCP setup — all based on real, structured content.

These files are publicly accessible and updated alongside our main documentation. They follow consistent formatting guidelines to ensure clarity, context, and AI compatibility.

## Yuno's Model Context Protocol (MCP)

This package provides an MCP server that exposes the Yuno payment platform API as Model Context Protocol tools. It enables programmatic access for AI agents, automation systems, and other advanced workflows that rely on structured, machine-readable context.

### Features

* **Exposes Yuno API endpoints as MCP tools**: Each endpoint is modeled as a tool that agents can call programmatically, with clear input and output structures

* **Enables AI and automation workflows with Yuno**: Integrate Yuno into local agents or custom workflows without complex, handcrafted logic

* **TypeScript support**: Fully typed for reliable development and seamless use in modern TypeScript environments

* **Easy integration with Cursor and other MCP-compatible agents**: Works out of the box with tools like Cursor, Claude Desktop, and other environments that support the Model Context Protocol

### Available tools

The Yuno MCP server makes the following tools available to AI agents and automation:

| Tool name                | Description                              |
| ------------------------ | ---------------------------------------- |
| `customer.create`        | Create a new customer                    |
| `checkoutSession.create` | Create a checkout session                |
| `payments.create`        | Create a payment with various workflows  |
| `payments.read`          | Retrieve payment information             |
| `documentation.read`     | Access Yuno API documentation and guides |

### Payment workflows

The `payments.create` tool supports three workflow types:

* `DIRECT` – Direct payment processing
* `REDIRECT` – Redirect-based payment flow
* `SDK_CHECKOUT` – Requires `checkout_session_id` and `ott` (for web, Android, and iOS payments)

## Using the MCP with Cursor or Claude Desktop

You can use this MCP server with Cursor or Claude Desktop to enable AI-driven payment flows, customer creation, and more.

### 1. Set up your Yuno API credentials

Set your Yuno API credentials using environment variables (see config examples below).

### 2. Add the MCP server to Cursor

* Open Cursor Settings (`Cmd+Shift+P` → "Cursor Settings")
* Go to the **MCP** section and click **Add new global MCP server**
* Add the following config (replace the path with your actual build output):

```json
{
  "mcpServers": {
    "yuno-mcp": {
      "type": "command",
      "command": "npx @yuno-payments/yuno-mcp@latest",
      "env": {
        "YUNO_ACCOUNT_CODE": "your_account_code",
        "YUNO_PUBLIC_API_KEY": "your_public_api_key",
        "YUNO_PRIVATE_SECRET_KEY": "your_private_secret_key",
        "YUNO_COUNTRY_CODE": "your_country_code",
        "YUNO_CURRENCY": "your_currency"
      }
    }
  }
}
```

### 3. Add the MCP server to Claude Desktop

* Open Claude Desktop settings → "Developer" tab → Edit Config.
* Add the following config:

```json
{
  "mcpServers": {
    "yuno-mcp": {
      "command": "npx",
      "args": [
        "@yuno-payments/yuno-mcp@latest"
      ],
      "env": {
        "YUNO_ACCOUNT_CODE": "your_account_code",
        "YUNO_PUBLIC_API_KEY": "your_public_api_key",
        "YUNO_PRIVATE_SECRET_KEY": "your_private_secret_key",
        "YUNO_COUNTRY_CODE": "your_country_code",
        "YUNO_CURRENCY": "your_currency"
      }
    }
  }
}
```

### 4. Test the integration

* In Cursor or Claude, select a Markdown file or chat and ask the agent to create a payment, customer, or checkout session using the yuno-mcp tool
* Make sure your environment variables are set correctly

## Environment variables

* `YUNO_ACCOUNT_CODE`\*
* `YUNO_PUBLIC_API_KEY`\*
* `YUNO_PRIVATE_SECRET_KEY`\*
* `YUNO_COUNTRY_CODE` (optional)
* `YUNO_CURRENCY` (optional)

Asterisk (\*) marks required.

## Support

For issues, bugs, or feature requests, please [open an issue](https://github.com/yuno-payments/yuno-mcp/issues) in our GitHub repository.\
For official Yuno support, please visit [Yuno's official documentation](https://docs.y.uno.com/).