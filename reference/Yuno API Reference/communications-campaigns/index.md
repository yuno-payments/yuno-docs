---
title: Communications Campaigns
deprecated: false
hidden: true
metadata:
  robots: index
---
Technical guide for integrating with the Yuno Campaigns API to automate personalized communications for declined payment recovery.

## Table of Contents

1. [Overview](#overview)
2. [How It Works](#how-it-works)
3. [Authentication](#authentication)
4. [API Reference](#api-reference)
   * [Campaign Endpoints](#campaign-endpoints)
   * [Rule Endpoints](#rule-endpoints)
5. [Data Models](#data-models)
   * [Campaign Object](#campaign-object)
   * [Rule Object](#rule-object)
   * [Rule Types Reference](#rule-types-reference)
   * [Conditional Operators Reference](#conditional-operators-reference)
6. [Getting Started](#getting-started)
7. [Use Case Examples](#use-case-examples)
8. [Error Handling](#error-handling)

## Overview

The Campaigns API allows you to create automated communication campaigns that are triggered when a customer's payment is declined. When a payment event matches your campaign's targeting rules, Yuno automatically sends a personalized message to the customer through the configured channel (WhatsApp or phone call), helping recover the failed transaction.

### Key Concepts

* **Campaign**: Defines who to target, through which channel, and when to send communications.
* **Rules**: Conditions attached to a campaign that determine which declined payments qualify. All active rules must pass for a payment to trigger the campaign (AND logic).
* **Schedule**: Controls the daily time window and timezone for sending communications.
* **Duration**: The start and end dates during which the campaign is active.

## How It Works

```
1. Customer's payment is declined
           |
2. Yuno evaluates the payment against your active campaigns
           |
3. All rules in the campaign are checked (AND logic)
           |
4. If all rules pass → communication is sent via the configured channel
           |
5. Customer receives a personalized WhatsApp message or phone call
```

**Example**: You create a campaign targeting declined payments in Colombia with amounts over 50,000 COP. When a Colombian customer's 80,000 COP payment is declined, Yuno automatically sends them a WhatsApp message with a personalized recovery suggestion.

## Authentication

All API requests require the following headers:

| Header                 | Description                                        | Required |
| ---------------------- | -------------------------------------------------- | -------- |
| `X-Public-Api-Key`     | Your merchant public API key                       | Yes      |
| `X-Private-Secret-Key` | Your merchant private secret key                   | Yes      |
| `Content-Type`         | Must be `application/json` for POST/PATCH requests | Yes      |

```bash
curl -X GET https://api-sandbox.y.uno/v1/campaigns \
  -H "X-Public-Api-Key: your-public-api-key" \
  -H "X-Private-Secret-Key: your-private-secret-key"
```
