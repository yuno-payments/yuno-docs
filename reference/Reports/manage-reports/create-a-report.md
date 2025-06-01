---
title: Create a Report
excerpt: ''
api:
  file: payouts.json
  operationId: create-a-report
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    A request to allow you to request the generation of specific report types.
    The response from this endpoint provides an object containing the `status`
    of the report generation and a report `id`.
  robots: index
next:
  description: ''
---
This endpoint allows you to request the generation of specific report types. The response from this endpoint provides an object containing:

- The `status` of the report generation.
- A report `id`.

Use the report id to download the report using the [Download a Report](ref:download-a-report) endpoint after it is generated.