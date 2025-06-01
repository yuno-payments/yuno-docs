---
title: Google Pay
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    Google Pay, a cutting-edge digital wallet and online payment system,
    revolutionizes how users make payments by securely storing credit card
    information. Unlike conventional payment methods, Google Pay ensures
    enhanced security and privacy throughout the payment process.
  robots: index
next:
  description: ''
---
Google Pay™, a cutting-edge digital wallet and online payment system, revolutionizes how users make payments by securely storing credit card information. Unlike conventional payment methods, Google Pay ensures enhanced security and privacy throughout the payment process.

When utilizing Google Pay™, your confidential credit or debit card details are never directly shared with the merchant. Instead, a unique token is generated, serving as a representation of your payment information. This token is utilized to process the payment, provide an extra layer of protection, and prevent unauthorized access to your data.

Considering the distinct mechanism of Google Pay™, it is essential to grasp its working principles before seamlessly integrating it with Yuno. 

![](https://files.readme.io/0e1e3fe-Mod1-Pay_API_Pay-D2x1.png)

Familiarizing yourself with how Google Pay™ operates and understanding the process of creating tokens is vital to ensure a successful and secure integration with the Yuno platform. By harnessing the power of Google Pay and its advanced security features, you can elevate your payment experience and provide your customers with a safe and efficient payment solution.

## Integration options

Yuno provides two different integrations you can use to add Google Pay to your checkout:

<HTMLBlock>{`
<body>
  <section class="cards_container">
    <div class="first_row">
      <a class="card" onclick="window.location='google-pay-direct-integration';">
        <div class="content">
          <div class="svg_content">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 15" fill="none">
              <path
                d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
                fill="#513CE1" />
            </svg>
          </div>
          <h2>
            Direct
          </h2>
          <p>
	    Yuno connects directly with Google to get the necessary information to make a card transaction with any provider. 
          </p>
        </div>
      </a>
      <a class="card" onclick="window.location='integration-via-provider-google-pay';">
        <div class="content">
          <div class="svg_content">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 15" fill="none">
              <path
                d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
                fill="#513CE1" />
            </svg>
          </div>
          <h2>
            Via a Provider
          </h2>
          <p>
            Yuno uses Google integration for each provider without accessing card data. Each integration can only be used with the selected provider with this option.
          </p>
        </div>
      </a>
    </div>
  </section>
</body>
`}</HTMLBlock>

<br />