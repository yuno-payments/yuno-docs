---
title: Environments
excerpt: API base URLs and the two environments (Sandbox and Production) for calling the Yuno API.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---

This page explains the API base URLs and the two environments you can use when calling the Yuno API: **Sandbox** and **Production**.

For how to switch between Test Mode and Live Mode in the Yuno dashboard, see [Environments (Dashboard)](https://docs.y.uno/docs/environments).

## Overview: Sandbox vs Production

| Environment | Purpose | Base URL |
|-------------|---------|----------|
| **Sandbox** | Testing and development. No live data or real transactions. | `https://api-sandbox.y.uno` |
| **Production** | Live environment. Real transactions and accounting. | `https://api.y.uno` |

In the dashboard, Sandbox is referred to as **Test Mode** and Production as **Live Mode**. You use the same account for both; the dashboard toggle switches which environment you are using.

## Credentials

> 🚧 **Credentials**
>
> Sandbox and Production use **different API keys**. The credentials you use in Test Mode (Sandbox) are not the same as those for Live Mode (Production). In the dashboard, the keys shown depend on which environment you have selected. See [Developers credentials](https://docs.y.uno/docs/developers-credentials) for where to find them.

## Base URLs

### Sandbox

Use this base URL for all API requests when testing. Data is simulated and does not affect live accounting or metrics.

```
https://api-sandbox.y.uno
```

### Production

Use this base URL when your integration is live and you are processing real payments.

```
https://api.y.uno
```

## Processing time and timeout

> 📘 **Processing time**
>
> The processing time for each request depends on the processor or acquirer. Total time is the sum of Yuno's processing time and the processor's.

> 🚧 **Timeout**
>
> Yuno uses a **60-second timeout** for all endpoints. The full request–response cycle must complete within 60 seconds. Response times are usually much shorter; 60 seconds covers slower processor responses.
