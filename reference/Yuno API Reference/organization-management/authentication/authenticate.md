---
title: Authenticate User
excerpt: ''
api:
  file: organization-management.json
  operationId: authenticate-user
deprecated: false
hidden: true
metadata:
  title: ''
  description: >-
    Authenticate a whitelabel user within your B2B organization and request an Embed Token for secure frontend integration.
  robots: index
next:
  description: ''
---
This request authenticates a whitelabel user within your B2B organization and returns a short-lived JWT (Embed Token). This token is required to authorize the Organization Management dashboard or SDK within your own platform.

### Prerequisites

Before using this endpoint, ensure you have:
1.  **Whitelabel Enabled**: Your organization must be created in the Yuno Dashboard with the `whitelabel` property set to `true`.
2.  **API Credentials**: You must use your standard `PUBLIC-API-KEY` and `PRIVATE-SECRET-KEY` for authorization.

### Token Details

- **Expiration**: The token is valid for 24 hours (86400 seconds).
- **Claim**: The JWT includes a `login_method: "whitelabel"` claim.
- **Constraints**: The user must be **ACTIVE** and not deleted to successfully authenticate.

> 📘 Security
>
> All authentication failures return a generic error (`LOGIN_FAILED`) to prevent entity enumeration. Always call this endpoint from your **secure backend** to protect your private API keys.

### Usage Flow

1.  **Request Token**: Your backend calls this endpoint with the `user_code`.
2.  **Pass to Frontend**: Send the `access_token` to your client application.
3.  **Authorize**: Use the token in the `Authorization: Bearer <access_token>` header for SDK or dashboard actions.

### Example Integration (Node.js)

```javascript
const response = await fetch('https://api.y.uno/v1/organizations/authenticate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'PUBLIC-API-KEY': 'your_public_key',
    'PRIVATE-SECRET-KEY': 'your_private_secret',
  },
  body: JSON.stringify({
    user_code: '550e8400-e29b-41d4-a716-446655440000',
  }),
});

const { access_token, token_type, expires_in } = await response.json();
```
