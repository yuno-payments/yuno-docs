---
title: Create Onboarding
excerpt: Creates an onboarding for a recipient.
api:
  file: openapi.json
  operationId: post_{id}onboardings
deprecated: false
hidden: false
link:
  new_tab: false
metadata:
  robots: index
---
This endpoint creates an onboarding for a recipient, enabling submerchants to be integrated with payment providers for split payment scenarios. Use this to register new submerchants or set up recipients before they can receive split payments.

## Overview

Onboarding is the first step in the [split payments marketplace](https://docs.y.uno/docs/split-payments-marketplace#/) workflow. Each recipient (submerchant) must be onboarded with payment providers before they can receive split payments.

The onboarding process supports two flows:

* **Pre-onboarded accounts**: For submerchants already registered with providers. Use `type: "PREVIOUSLY_ONBOARDED"`.
* **Dynamic onboarding**: For new submerchant registration including KYC/KYB (Know Your Customer/Know Your Business) validation. Use `type: "ONE_STEP_ONBOARDING"` or `type: "TWO_STEP_ONBOARDING"` (previously `type: "ONBOARD_ONTO_PROVIDER"`).

> 📘 Two-Step Onboarding
>
> For `type: "TWO_STEP_ONBOARDING"` flows, use the [Continue Onboarding](ref:continue-onboarding) endpoint to complete the KYC process after account creation.