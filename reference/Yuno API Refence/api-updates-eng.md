---
title: API Updates
excerpt: Stay up to date with everything related to Yuno's API capabilities
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
At Yuno, we ensure that all updates we make to our APIs are backward compatible with both the current and previous versions.

When a disruptive modification is implemented in the Yuno's API, a new dated version is launched. To prevent any disruption to your code, we keep you from altering your version until you are prepared to proceed with the upgrade.

### Backward compatibility changes

We consider the following alterations to maintain compatibility:

* Adding new API resources.
* Adding new optional request parameters to existing API methods.
* Adding new properties to existing API responses.
* Modifying the order of properties in existing API responses.
* Altering the length or format of opaque strings, such as object IDs, error messages, and other human-readable strings. This encompasses the addition or removal of fixed prefixes.
* Introducing new event types. Ensure your webhook listener adeptly handles unfamiliar event types.

### Stay up to date

Please refer to the [changelog](https://docs.y.uno/changelog) section in our documentation for updates on our API.
