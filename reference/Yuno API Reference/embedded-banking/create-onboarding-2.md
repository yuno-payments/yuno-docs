---
title: Create Onboarding
api:
  file: openapi.json
  operationId: post_{id}onboardings-1
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: index
---
This endpoint creates an onboarding for a recipient, enabling merchant to be integrated with banking as a service providers. Use this to register new users or entities.

## Overview

Onboarding is the first step in the [split payments marketplace](https://docs.y.uno/docs/split-payments-marketplace#/) workflow. Each recipient  must be onboarded with BaaS providers before they can receive process transactions.

The onboarding process supports two flows:

* **Pre-onboarded accounts**: For users/entities already registered with providers. Use `type: "PREVIOUSLY_ONBOARDED"`.
* **Dynamic onboarding**: For new recipient registration including KYC/KYB (Know Your Customer/Know Your Business) validation. Use `type: "ONE_STEP_ONBOARDING"` or `type: "TWO_STEP_ONBOARDING"` (previously `type: "ONBOARD_ONTO_PROVIDER"`).

> 📘 Two-Step Onboarding
>
> For `type: "TWO_STEP_ONBOARDING"` flows, use the [Continue Onboarding](ref:continue-onboarding) endpoint to complete the KYC process after account creation.

<br />
