---
title: Payment Link Status
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    Yuno's payment links solution enables businesses to accept payments
    effortlessly and offer subscriptions without additional websites or
    applications. These versatile links can be shared across various platforms.
  robots: index
next:
  description: ''
---
Yuno's payment links solution enables businesses to accept payments effortlessly and offer subscriptions without additional websites or applications. These versatile links can be shared across various platforms, including social media, emails, and websites. Supporting diverse payment methods like credit and debit cards, Apple Pay, and Google Pay, payment links provide a secure and rapid way to collect payments.

## Workflow

In the following workflow, you can find the different payment link statuses and how they can be updated.

<Image align="center" src="https://files.readme.io/054999389730071ce7c1f43d122500eebcdc07344293ab219cec1540edf64be4-Image_payment_link.png" />

## Payment links status

The payment links can have the status described in the table below.

<HTMLBlock>{`
<table>
<thead>
  <tr>
    <th>Status</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>CREATED</td>
    <td>The payment link is active and can be used to make a payment.</td>
  </tr>
  <tr>
    <td>USED</td>
    <td>The payment link has already been used.</td>
  </tr>
  <tr>
    <td>CANCELED</td>
    <td>Payment link canceled.</td>
  </tr>
  <tr>
    <td>EXPIRED</td>
    <td>The link expired before your customer was able to pay for it.</td>
  </tr>
  <tr>
    <td>ERROR</td>
    <td>An error occurred in the process.</td>
  </tr>
</tbody>
</table>

<style>
  table th {
    text-align: left;
  }
</style>
`}</HTMLBlock>