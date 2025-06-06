---
title: Step by Step Integration Process (new version)
deprecated: false
hidden: true
metadata:
  robots: index
---
This page guides you through the integration process with Yuno. After [setting up your Yuno account](doc:step-1-set-up-your-account), we will walk you through selecting the right SDK, referencing the correct endpoints, and integrating additional services. Once you complete these steps, you will be ready to process payments with Yuno.

Before proceeding, choose the integration method that best suits your needs. For an overview of available options and their capabilities, see [ Choose the Right Integration You](doc:choose-the-right-integration-for-you).

## Step 1: Integrate the basic payment workflow

To start, integrate the core payment workflow that enables you to create payments. The steps will vary based on the integration you choose. Below is a general overview of the process:

1. Create a customer.
2. Create a checkout session.
3. Show the payment methods available for the customer to choose from.
4. Ask for the required information depending on the payment method.
5. Create the payment.

<HTMLBlock>{`
<body>
  <section class="link_cards_container">
    <a class="card" href="/docs/full-sdk-workflow">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Full SDK</h4>
    </a>

    <a class="card" href="/docs/the-ultimate-checkout-lite">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Lite SDK (Payment)</h4>
    </a>

    <a class="card" href="/docs/enrollment-lite">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Lite SDK (Enrollment)</h4>
    </a>

    <a class="card" href="/docs/secure-fields">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Secure Fields</h4>
    </a>

    <a class="card" href="/docs/headless-sdk-integration">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Headless SDK (Payment)</h4>
    </a>

    <a class="card" href="/docs/headless-sdk-enrollment-steps">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Headless SDK (Enrollment)</h4>
    </a>

    <a class="card" href="/docs/direct-flow">
      <div class="svg_content">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
            fill="#513CE1" />
        </svg>
      </div>
      <h4>Direct Workflow</h4>
    </a>

  </section>

</body>
`}</HTMLBlock>

## Step 2: Implement refunds (optional)

Once the basic integration is complete, we recommend implementing refunds to enhance your payment system. Using the [refunds endpoint](ref:refund-payment), you can process full or partial refunds directly within your environment.

Key considerations:

* Refunds can also be managed through the Yuno dashboard.
* Not all payment methods support refunds.

## Step 3: Implement captures and cancellations (optional)

To gain full control over transactions, integrate the [cancel](doc:cancel-payments) and [capture](doc:capture-authorization) endpoints:

* **Cancellations**: Allow you to void ongoing transactions with a pending status (often for asynchronous payment methods).
* **Captures**: Enable you to finalize pre-authorized transactions (commonly used for credit card authorizations).

## Step 4: Set up webhooks (optional)

We strongly recommend configuring [webhooks](doc:webhooks) to receive real-time updates about payment events. Webhooks:

* Eliminate the need for frequent API requests by notifying your system when a payment status changes.
* Allow you to process payment information on demand, improving efficiency.

You can configure webhooks from the Yuno dashboard.

## Step 5: Test and go live

Once your integration is complete:

1. Test your setup using the [Yuno Test Gateway](doc:yuno-testing-gateway) for credit cards.
2. Verify functionality across all workflows.
3. Switch to production credentials by [enabling your account for production](doc:environments).

After successful testing, you’re ready to go live with Yuno.