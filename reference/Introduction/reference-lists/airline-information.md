---
title: Airline information
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    Find all airline information you may need when using Yuno API endpoints. It
    covers passenger types, fare class codes, and loyalty tiers. Use this page
    to understand and have access to standard values for each information
    category.
  robots: index
next:
  description: ''
---
On this page, you will find airline information you may need when using Yuno API endpoints. It covers passenger types, fare class codes, and loyalty tiers. Use this page to understand and have access to standard values for each information category.

## Passenger type

<HTMLBlock>{`
<table>
<thead>
  <tr>
    <th><code>passenger_type</code></th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>A</code></td>
    <td>Adult</td>
  </tr>
  <tr>
    <td><code>C</code></td>
    <td>Child</td>
  </tr>
  <tr>
    <td><code>I</code></td>
    <td>Infant or Baby</td>
  </tr>
</tbody>
</table>
`}</HTMLBlock>

## Fare class code

The values can be a letter (A-Z) but may vary depending on the airline's definition. Type: String (MAX:1; MIN:1).

## Loyalty tier

<HTMLBlock>{`
<table>
<thead>
  <tr>
    <th><code>loyalty_tier</code></th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>1</code></td>
    <td>High classification level</td>
  </tr>
  <tr>
    <td><code>2</code></td>
    <td>Second classification level</td>
  </tr>
  <tr>
    <td><code>3</code></td>
    <td>Third classification level</td>
  </tr>
</tbody>
</table>
`}</HTMLBlock>

<HTMLBlock>{`
<style>
  table thead th {
    text-align: left;
</style>
`}</HTMLBlock>
