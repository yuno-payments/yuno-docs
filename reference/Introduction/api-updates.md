---
title: API Updates
excerpt: Stay up to date with Yuno API changes and updates.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
At Yuno, we make sure that all updates we make to our APIs are compatible with both the current version and previous versions.

When a disruptive modification is implemented to the Yuno API, a new version is released. To avoid any issues with your code, we do not require a version change until you are ready to proceed with the upgrade.

### Backwards compatible changes

We consider the following modifications to maintain backward compatibility:

- Add new resources to the API.
- Add new optional request parameters to existing API methods.
- Add new properties to existing API responses.
- Modify the order of properties in existing API responses.
- Alter the length or format of opaque strings, such as object identifiers, error messages, and other human-readable strings. This includes adding or removing prefixes.
- Introduce new types of events. Make sure your webhook receiving service supports unknown event types.