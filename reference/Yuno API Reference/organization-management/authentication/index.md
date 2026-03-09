---
title: Authentication
excerpt: Securely authenticate users for white-label integrations using Embed Tokens.
deprecated: false
hidden: true
metadata:
  title: Authentication
  description: Securely authenticate whitelabel users using Yuno's Embed Token system for frontend integrations.
  robots: index
---
To provide secure, authenticated access to Organization Management features within white-label dashboards or custom SDK implementations, Yuno utilizes an Embed Token system.

### Authentication Flow

1.  **User Code**: Identify the whitelabel user in your system.
2.  **Authenticate**: Use the `/authenticate` endpoint with the `user_code` to request a token.
3.  **Embed Token**: The API returns a short-lived JWT (access token) used for authorizing subsequent SDK or dashboard actions.
