---
title: API Overview
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
The Yuno API has been implemented around RESTful. Our API uses standard HTTP protocols where JSON payloads are returned in response to the HTTP requests. All operations can be performed via GET, POST and PATCH requests.

> 📘 Choose Your Integration
>
> Before you start the integration, [choose the type of integration](https://docs.y.uno/docs/choose-the-right-integration-for-you) you want to use.

## Setup and integration

The options below highlight essential information you will need to consider when building your integration with Yuno.

<Shelf classname="cards_container">
  <div class="first_row">
    <YunoCard title="Authentication" href="/reference/authentication">
      Learn about the authentication system Yuno APIs use.
    </YunoCard>

    <YunoCard title="Environments" href="/reference/api-environments">
      Check the existing environments for testing and production.
    </YunoCard>
  </div>

  <div class="second_row">
    <YunoCard title="SDKs" href="/docs/quickstart-guide">
      Explore the complete list of Yuno SDKs.
    </YunoCard>

    <YunoCard title="Webhooks" href="/docs/webhooks">
      Receive automatic notification from your operations.
    </YunoCard>

    <YunoCard title="Reference" href="/reference/reference-lists">
      Discover essential data Yuno API uses.
    </YunoCard>
  </div>
</Shelf>

## API services

Yuno provides a wide range of functionalities you can use through its API. Below are links to every API service available in the documentation.

<Shelf classname="link_cards_container">
  <YunoCard title="Customers" href="/reference/the-customer-object" />

  <YunoCard title="Enrollment" href="/reference/enrollment-workflow" />

  <YunoCard title="Checkout" href="/reference/the-checkout-session-object" />

  <YunoCard title="Payments" href="/reference/status-and-response-codes" />

  <YunoCard title="Payment Links" href="/reference/status-payment-links" />

  <YunoCard title="Subscriptions" href="/reference/status-subscriptions" />

  <YunoCard title="Payouts" href="/reference/payout-workflow" />

  <YunoCard title="Reports" href="/reference/report-status" />

  <YunoCard title="Installments" href="/reference/create-installments-plan" />
</Shelf>

## Supporting material

To make the integration process easier, Yuno provides supporting material so you can test Yuno APIs directly on your machine or run a ready-to-use web application using the example project.

<Shelf classname="cards_container second_cards_container">
  <YunoCard title="SDK Integration Example" href="/docs/step-2-your-first-payment">
    Explore a web implementation of Yuno SDK.
  </YunoCard>

  <YunoCard title="Postman" href="/reference/postman-collections">
    Try out the Yuno APIs.
  </YunoCard>
</Shelf>
