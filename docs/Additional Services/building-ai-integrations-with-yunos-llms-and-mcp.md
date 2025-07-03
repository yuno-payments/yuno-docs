---
title: Building AI Integrations with Yuno's LLMs and MCP
deprecated: false
hidden: false
metadata:
  robots: index
---
Yuno offers tools to help you build AI-aware and merchant-friendly payment experiences. Our machine-ready documentation makes it easier for large language models (LLMs) to understand Yuno’s APIs and documentation, while our Model Context Protocol (MCP) provides a seamless way to integrate Yuno's capabilities into your product.

This guide introduces how to work with both components. You’ll learn how the LLM layer empowers AI tools to deliver more accurate and contextual integration support, and how the MCP can embed key payment and merchant functionality directly into your environment, enabling faster builds with less friction.

## Machine-ready content in plain text

To help large language models understand and support Yuno integrations, we provide a dedicated set of Markdown (.md) files designed specifically for machine readability. These files describe Yuno’s APIs, product behavior, and implementation details in a format that’s easy for LLMs to parse and analyze.

The .md files are part of [Yuno Docs](docs.y.uno). You can access them by adding .md to the end of any Yuno Docs URL (this works for both Guides and API Reference pages). The content is served in plain text, making it easier for machines to extract and process the underlying knowledge without requiring human interpretation.

This setup enables AI assistants, developer tools, and chat-based agents to answer questions, explain features, and guide integrations automatically. It’s a lightweight but powerful way to open up Yuno’s documentation to a wide range of intelligent applications.

## Yuno's Model Context Protocol (MCP)

This package provides an MCP server that exposes the Yuno payment platform API as Model Context Protocol tools. It enables programmatic access for AI agents, automation systems, and other advanced workflows that rely on structured, machine-readable context.

### Features

* **Exposes Yuno API endpoints as MCP tools**: Each endpoint is modeled as a tool that agents can call programmatically, with clear input and output structures

* **Enables AI and automation workflows with Yuno**: Integrate Yuno into local agents or custom workflows without complex, handcrafted logic

* **Easy integration with Cursor and other MCP-compatible agents**: Works out of the box with tools like Cursor, Claude Desktop, and other environments that support the Model Context Protocol

### Available tools

The Yuno MCP server makes the following tools available to AI agents and automation:

| Tool name                                | Description                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------ |
| `customer.create`                        | Create a new customer                                                          |
| `customer.retrieve`                      | Retrieve a customer by ID                                                      |
| `customer.retrieveByExternalId`          | Retrieve a customer by external id (`merchant_customer_id`)                    |
| `customer.update`                        | Update an existing customer by ID                                              |
| `paymentMethod.enroll`                   | Enroll or create payment method for a customer                                 |
| `paymentMethod.retrieve`                 | Retrieve payment method                                                        |
| `paymentMethod.retrieveEnrolled`         | Retrieve all enrolled payment methods for a customer                           |
| `paymentMethod.unenroll`                 | Unenroll payment method                                                        |
| `checkoutSession.create`                 | Create a checkout session                                                      |
| `checkoutSession.retrievePaymentMethods` | Retrieve payment methods for checkout                                          |
| `payments.create`                        | Create a payment with various workflows                                        |
| `payments.retrieve`                      | Retrieve payment information                                                   |
| `payments.retrieveByMerchantOrderId`     | Retrieve payment(s) by `merchant_order_id`                                     |
| `payments.refund`                        | Refund a payment (full or partial) by payment and transaction ID               |
| `payments.cancelOrRefund`                | Cancel or refund a payment by payment ID (auto-detects action)                 |
| `payments.cancelOrRefundWithTransaction` | Cancel or refund a payment by payment and transaction ID (auto-detects action) |
| `payments.cancel`                        | Cancel a pending payment by payment and transaction ID                         |
| `payments.authorize`                     | Authorize a payment (`capture: false`)                                         |
| `payments.captureAuthorization`          | Capture a previously authorized payment                                        |
| `paymentLinks.create`                    | Create a new payment link                                                      |
| `paymentLinks.retrieve`                  | Retrieve a payment link by ID                                                  |
| `paymentLinks.cancel`                    | Cancel a payment link by ID                                                    |
| `subscriptions.create`                   | Create a new subscription                                                      |
| `subscriptions.retrieve`                 | Retrieve a subscription by ID                                                  |
| `subscriptions.pause`                    | Pause a subscription by ID                                                     |
| `subscriptions.resume`                   | Resume a subscription by ID                                                    |
| `subscriptions.update`                   | Update a subscription by ID                                                    |
| `subscriptions.cancel`                   | Cancel a subscription by ID                                                    |
| `recipients.create`                      | Create a new recipient                                                         |
| `recipients.retrieve`                    | Retrieve a recipient by ID                                                     |
| `recipients.update`                      | Update a recipient by ID                                                       |
| `recipients.delete`                      | Delete a recipient by ID                                                       |
| `recipients.createOnboarding`            | Create onboarding for a recipient                                              |
| `installmentPlans.create`                | Create a new installment plan                                                  |
| `installmentPlans.retrieve`              | Retrieve an installment plan by ID                                             |
| `installmentPlans.retrieveAll`           | Retrieve all installment plans for an account                                  |
| `installmentPlans.update`                | Update an installment plan by ID                                               |
| `installmentPlans.delete`                | Delete an installment plan by ID                                               |
| `documentation.read`                     | Access Yuno API documentation and guides                                       |

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

* For official Yuno support, please visit [Yuno's official documentation](https://docs.y.uno.com/)