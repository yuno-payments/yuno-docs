---
title: Report Status
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    This page presents a workflow with different reports' statuses and how they
    can be updated.
  robots: index
next:
  description: ''
---
## Workflow

In the following workflow, you can find the different reports' statuses and how they can be updated.

<Image align="center" src="https://files.readme.io/067f178-report_status1.png" />

## Report status

The reports can have the following status.

| Status       | Description                                                                                                                                                   |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `IN_PROCESS` | The report is being generated.                                                                                                                                |
| `SUCCEEDED`  | The report creation request has been executed successfully.                                                                                                   |
| `DOWNLOADED` | The merchant has downloaded the report.                                                                                                                       |
| `EXPIRED`    | The report URL has expired, and the report is no longer available for download. This happens 10 minutes after the creation confirmation (`SUCCEEDED` status). |
| `FAILED`     | The report generation failed.                                                                                                                                 |
| `ERROR`      | An error occurred in the process.                                                                                                                             |
