---
title: Authentication
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    The Yuno API employs the ApiKey security schema to authenticate HTTP
    requests. These keys are access credentials composed of alphanumeric
    characters that authorize the use of specific features of our API.
  robots: index
next:
  description: ''
---
The Yuno API uses the ApiKey security schema to authenticate HTTP requests. API keys are alphanumeric credentials that grant access to specific API features.

All requests require `public-api-key` and `private-secret-key` headers. Find them in your [Yuno Dashboard](https://dashboard.y.uno/developers).

<Callout icon="❗️" theme="error">
  Do not share your secret API keys in public places like GitHub or Bitbucket to avoid malicious API calls.
</Callout>

Occasionally, an `X-Idempotency-Key` may be required. This UUID must be unique for each request. See [Idempotency](ref:authentication#idempotency) for details.

**Example request**:

```curl
curl --request <Method> \\
     --url <URL> \\
     --header 'X-Idempotency-Key: 7bf41af5-70ae-4e79-9b28-a8fa75c3ac53' \\
     --header 'accept: application/json' \\
     --header 'content-type: application/json' \\
     --header 'private-secret-key: <Your private-secret-key>' \\
     --header 'public-api-key: <Your public-api-key>'
```

## Idempotency

Idempotency is the ability to make multiple identical requests and always get the same response. This is useful when a request fails due to a connection issue and the outcome is unclear; you can retry using the same `X-Idempotency-Key` and the API will not duplicate the operation.

Some requests include a unique identifier sent as the `X-Idempotency-Key` header (e.g., `7bf41af5-70ae-4e79-9b28-a8fa75c3ac53`). This key also serves to identify a specific transaction.

<Callout icon="📘">
  Set the `x-idempotency-key` value to `{$randomUUID}` to generate keys automatically.
</Callout>

Yuno stores the `X-Idempotency-Key` and the transaction status for 24 hours, regardless of the outcome (captured, authorized, or failed). Any subsequent request with the same key within that window returns the original response instead of creating a new transaction.

If two requests are sent simultaneously, the API may receive the second before responding to the first. In that case, the second request returns a `409 Conflict`, indicating there is already an open call for that `X-Idempotency-Key`.

<Callout icon="📘" theme="info">
  If two requests are sent with the same key but different body contents, the API processes only the first one.
</Callout>

Keys are not stored when a request fails with a `400` error. This allows you to correct the request and resubmit it with the same key. The same applies to `500` errors.

<br />
