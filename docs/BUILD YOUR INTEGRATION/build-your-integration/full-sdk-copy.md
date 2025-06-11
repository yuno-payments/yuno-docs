---
title: '[Tests page]'
deprecated: false
hidden: true
metadata:
  title: Full SDK
  description: >-
    Using our Full SDK, you can integrate Yuno, minimizing integration,
    maintenance, and operational efforts without any need for compliance.
  robots: index
---
This page guides you through the available integration methods with Yuno. After [setting up your Yuno account](doc:step-1-set-up-your-account), you can choose the right SDK and learn about referencing the correct endpoints and integrating additional services.

Before proceeding, choose the integration method that best suits your needs. For an overview of available options and their capabilities, see [Choose the Right Integration for You](doc:choose-the-right-integration-for-you).

## Available Integration Options

Here are the primary integration methods available with Yuno, each designed to fit different needs and technical requirements:

<Shelf classname="cards_container" columns={4}>
  <div class="first_row">
    <YunoCard type="sdk-integrations" title="Full SDK" href="/docs/full-checkout-sdk">
      Render the payment methods your company has available in the checkout and for user enrollment.
    </YunoCard>

    <YunoCard type="sdk-integrations" title="Lite SDK (Payment)" href="/docs/lite-checkout-sdk">
      With this option, you control which payment methods will be shown to the user during checkout and
      enrollment.
    </YunoCard>
  </div>

  <div class="second_row">
    <YunoCard type="sdk-integrations" title="Secure Fields (Payment - Enrollment)" href="/docs/secure-fields-checkout-sdk">
      Create and customize your own checkout with prebuilt UI components.
    </YunoCard>

    <YunoCard type="sdk-integrations" title="Lite SDK (Enrollment)" href="/docs/lite-checkout-sdk">
      Simplify the user enrollment of payment methods.
    </YunoCard>
  </div>

  <div class="third_row">
    <YunoCard type="sdk-integrations" title="Headless SDK (Payment)" href="/docs/headless-sdk-payment">
      Customize the checkout without having to be PCI compliant.
    </YunoCard>

    <YunoCard type="sdk-integrations" title="Headless SDK (Enrollment)" href="/docs/headless-sdk-enrollment">
      Customize the enrollment of new payment methods.
    </YunoCard>
  </div>
</Shelf>