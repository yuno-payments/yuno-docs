---
title: Basic Concepts
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
To understand how Yuno operates, you need to grasp some fundamental concepts about its architecture. This guide covers the essential elements required for integration:

* **Sessions**: The most basic component of a transaction. A session begins when a user visits your checkout page and views the available payment methods. It contains all relevant checkout information, including available payment methods and tokenized options for returning users.

* **Payments**: A payment occurs when a user initiates a payment action during a checkout session.

* **Transactions**: These represent operations related to payments, such as purchases or refunds, processed through one or more connections.

![Transactions and Sessions](https://github.com/writechoiceorg/yuno-images/blob/main/doc/concepts/transactions_sessions.png?raw=true)

## Concept list

For a deeper understanding of each concept related to Yuno's system, visit the respective pages:

<Shelf classname="link_cards_container">
  <YunoCard title="Customers" href="/docs/customers" titleSize="h4" />

  <YunoCard title="Sessions" href="/docs/sessions" titleSize="h4" />

  <YunoCard title="Payments" href="/docs/payments-1" titleSize="h4" />

  <YunoCard title="Transactions" href="/docs/transactions" titleSize="h4" />

  <YunoCard title="Tokens" href="/docs/tokens" titleSize="h4" />

  <YunoCard title="Payment Methods" href="/docs/payment-methods" titleSize="h4" />

  <YunoCard title="Fraud Prevention" href="/docs/fraud" titleSize="h4" />

  <YunoCard title="3DS" href="/docs/3ds-1" titleSize="h4" />
</Shelf>