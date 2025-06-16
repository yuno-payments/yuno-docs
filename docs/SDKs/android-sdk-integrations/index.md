---
title: Android SDK Integrations
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Android SDK Integrations
  description: >-
    Yuno's Android SDKs are specifically designed to simplify the integration of
    payment processing functionality in your Android applications. Developers
    can implement features more efficiently, reducing the need for extensive
    knowledge of payment protocols and infrastructure.
  robots: index
next:
  description: ''
---
Yuno's Android SDKs are specifically designed to simplify the integration of payment processing functionality in your Android applications. Developers can implement features more efficiently, reducing the need for extensive knowledge of payment protocols and infrastructure.

## Integrations

Select one of the user-friendly Android integration options available and kickstart your journey toward efficient payment processing:

<Shelf classname="cards_container">
  <div class="first_row">
    <YunoCard title="Full SDK" href="/docs/full-checkout-android">
      Render the payment methods your company has available in the checkout and for user enrollment.
    </YunoCard>
  </div>

  <div class="second_row">
    <YunoCard title="Lite SDK (Payment)" href="/docs/lite-checkout-android">
      With this option, you control which payment methods will be shown to the user during checkout and enrollment.
    </YunoCard>

    <YunoCard title="Lite SDK (Enrollment)" href="/docs/enrollment-android">
      Simplify the user enrollment of payment methods.
    </YunoCard>
  </div>

  <div class="third_row">
    <YunoCard title="Headless SDK (Payment)" href="/docs/headless-sdk-payment-android">
      Customize the checkout without having to be PCI compliant.
    </YunoCard>

    <YunoCard title="Headless SDK (Enrollment)" href="/docs/headless-sdk-enrollment-android">
      Customize the enrollment of new payment methods.
    </YunoCard>
  </div>
</Shelf>

<br />

<HTMLBlock>{`
<body>
  <section class="cards_container">
    <div class="first_row">
      <a class="card" href="/docs/full-checkout-android">
        <div class="content">
          <div class="svg_content">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 15" fill="none">
              <path
                d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
                fill="#513CE1" />
            </svg>
          </div>
          <h2>
            Full SDK
          </h2>
          <p>
            Render the payment methods your company has available in the checkout and for user enrollment.
          </p>
        </div>
      </a>
    </div>

    <div class="second_row">
      <a class="card" href="/docs/lite-checkout-android">
        <div class="content">
          <div class="svg_content">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 15" fill="none">
              <path
                d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
                fill="#513CE1" />
            </svg>
          </div>
          <h2>
            Lite SDK (Payment)
          </h2>
          <p>
            With this option, you control which payment methods will be shown to the user during checkout and
            enrollment.
          </p>
        </div>
      </a>
      <a class="card" href="/docs/enrollment-android">
        <div class="content">
          <div class="svg_content">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 15" fill="none">
              <path
                d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
                fill="#513CE1" />
            </svg>
          </div>
          <h2>
            Lite SDK (Enrollment)
          </h2>
          <p>
            Simplify the user enrollment of payment methods.
          </p>
        </div>
      </a>
    </div>

    <div class="third_row">
      <a class="card" href="/docs/headless-sdk-payment-android">
        <div class="content">
          <div class="svg_content">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 15" fill="none">
              <path
                d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
                fill="#513CE1" />
            </svg>
          </div>
          <h2>
            Headless SDK (Payment)
          </h2>
          <p>
            Customize the checkout without having to be PCI compliant.
          </p>
        </div>
      </a>
      <a class="card" href="/docs/headless-sdk-enrollment-android">
        <div class="content">
          <div class="svg_content">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 15" fill="none">
              <path
                d="M10.8281 4V9.6875C10.8281 9.77452 10.7935 9.85798 10.732 9.91952C10.6705 9.98106 10.587 10.0156 10.5 10.0156C10.413 10.0156 10.3295 9.98106 10.268 9.91952C10.2064 9.85798 10.1719 9.77452 10.1719 9.6875V4.79188L3.73187 11.2319C3.66967 11.2898 3.5874 11.3214 3.50239 11.3199C3.41738 11.3184 3.33628 11.284 3.27616 11.2238C3.21604 11.1637 3.1816 11.0826 3.1801 10.9976C3.1786 10.9126 3.21016 10.8303 3.26812 10.7681L9.70812 4.32812H4.81249C4.72547 4.32812 4.64201 4.29355 4.58047 4.23202C4.51894 4.17048 4.48437 4.08702 4.48437 4C4.48437 3.91298 4.51894 3.82952 4.58047 3.76798C4.64201 3.70645 4.72547 3.67188 4.81249 3.67188H10.5C10.587 3.67188 10.6705 3.70645 10.732 3.76798C10.7935 3.82952 10.8281 3.91298 10.8281 4Z"
                fill="#513CE1" />
            </svg>
          </div>
          <h2>
            Headless SDK (Enrollment)
          </h2>
          <p>
            Customize the enrollment of new payment methods.
          </p>
        </div>
      </a>
    </div>
  </section>
</body>
`}</HTMLBlock>

> 📘 Explore the SDK Project Example
>
> Yuno provides an example project of a running application using an SDK. You can access the [project repository](https://github.com/yuno-payments/yuno-sdk-web) or [download the project](https://github.com/yuno-payments/yuno-sdk-web/archive/refs/heads/main.zip). In addition, you can access the [Create Your First Payment With SDK](/docs/step-2-your-first-payment) guide available in the documentation.