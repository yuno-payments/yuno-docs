---
title: Update Campaign Status
api:
  file: communications-campaigns.json
  operationId: patch_campaigns-campaign-id
deprecated: false
hidden: false
link:
  new_tab: false
metadata:
  robots: index
---
Updates the status of a campaign. Use this to pause, resume, complete, or cancel a campaign.

## Status Transitions

* `ACTIVE` --> `PAUSED`, `COMPLETED`, `CANCELLED`
* `PAUSED` --> `ACTIVE`, `COMPLETED`, `CANCELLED`
* `COMPLETED` --> (terminal - no further transitions)
* `CANCELLED` --> (terminal - no further transitions)