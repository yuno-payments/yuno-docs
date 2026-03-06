---
title: Organization Management
excerpt: Overview of the Organization Management API.
deprecated: false
hidden: true
metadata:
  title: Organization Management
  description: Manage account groups, accounts, and user permissions across your organization.
  robots: noindex
---
# Organization Management

The Organization Management API allows you to programmatically manage your B2B structure within Yuno. This includes creating and managing:

- **Account Groups**: Logical groupings of accounts (e.g., by region, business unit, or partner).
- **Accounts**: Individual merchant accounts within a group.
- **Users**: Staff members with specific permissions at the account or account group level.
- **Permissions**: Granular access control for users.

## Authentication
All requests require the following headers:
- `PUBLIC-API-KEY`
- `PRIVATE-SECRET-KEY`

## Base URL
All requests are made to:
`/v1`
