---
title: Organization Management
excerpt: Manage account groups, accounts, and user permissions across your organization.
deprecated: false
hidden: true
metadata:
  title: Organization Management
  description: Manage account groups, accounts, and user permissions across your organization using the Yuno B2B API.
  robots: noindex
---

The Organization Management API provides a robust framework for programmatically managing your B2B hierarchy within Yuno. This suite of endpoints enables you to architect and maintain complex multi-merchant structures with granular security.

## Core Components

- **Account Groups**: Top-level logical groupings used to organize accounts by region, business unit, or partner.
- **Accounts**: Individual merchant environments, each with its own payment and checkout configurations.
- **Users**: Staff members with identity profiles managed within your B2B organization.
- **RBAC Permissions**: Granular access control strings that define what users can do at both the Account and Group levels.

## Authentication

All requests to the Organization Management API require the following security headers:

- `PUBLIC-API-KEY`: Your public identification key.
- `PRIVATE-SECRET-KEY`: Your private secret for server-to-server authorization.

## Base URL

| Environment | Base URL |
| :--- | :--- |
| **Sandbox** | `https://api-sandbox.y.uno/v1` |
| **Production** | `https://api.y.uno/v1` |
