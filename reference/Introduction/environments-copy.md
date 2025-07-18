---
title: Environments (COPY)
deprecated: false
hidden: false
metadata:
  robots: index
---
You can interact with the Yuno API using two environments:

* Sandbox
* Production

These environments are also available on the Dashboard, enabling you to connect and test different connections without requiring you to add the real account data.

## Sandbox

This is a controlled development environment where you can conduct tests during implementation. When performing tests in Sandbox, they do not affect live data and accounting since the data used during the test mode is false.

The base URL used for the Yuno API running in the Sandbox environment is formatted as shown below:

## Production

This is the environment where real events occur, affecting accounting and metrics. This environment is consumed once the integration tests have finished, and it is time to open it to the public.