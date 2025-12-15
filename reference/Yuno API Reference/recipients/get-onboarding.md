---
title: Get Onboarding
excerpt: Retrieves detailed information about a specific onboarding for a recipient.
api:
  file: openapi.json
  operationId: get-onboarding
deprecated: false
hidden: false
link:
  new_tab: false
metadata:
  robots: index
---

This endpoint retrieves detailed information about a specific onboarding for a recipient in the [split payments marketplace](https://docs.y.uno/docs/split-payments-marketplace). Use this endpoint to check the current status, configuration, and details of an existing onboarding.

This endpoint requires an existing onboarding created via [Create Onboarding](ref:create-onboarding).

## Provider Response Fields

The onboarding response includes provider response fields that contain information returned by the payment provider during the onboarding process. These fields provide visibility into the provider's response and can be used for debugging, reconciliation, and compliance purposes.

### Raw Data Storage

The onboarding response includes a `raw_data` field that stores the complete, unprocessed response from the payment provider. This raw data is stored as-is and provides:

* **Complete provider response**: Full response payload from the provider, including all fields and metadata
* **Debugging support**: Access to original provider responses for troubleshooting
* **Compliance and auditing**: Historical record of provider responses for compliance requirements
* **Data integrity**: Preserves original provider data without transformation

> 📘 Raw Data Format
>
> The `raw_data` field contains the provider's response in its original format (typically JSON). This data is stored as-is and may vary by provider. Use this field when you need access to the complete, unprocessed provider response.

## Response Fields

The onboarding response includes the following provider-related fields:

* **`provider_response`**: Structured provider response data containing key information from the provider
* **`raw_data`**: Complete, unprocessed response from the payment provider stored as-is
* **`provider_id`**: Identifier of the payment provider used for this onboarding
* **`provider_status`**: Status returned by the provider for this onboarding

These fields are populated when the onboarding interacts with the payment provider and may be updated as the onboarding progresses through different stages.