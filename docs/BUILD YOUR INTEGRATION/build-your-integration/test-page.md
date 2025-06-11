---
title: Step by Step Integration Process (Test page)
deprecated: false
hidden: true
metadata:
  robots: index
---
This page guides you through the available integration methods with Yuno. After [setting up your Yuno account](doc:step-1-set-up-your-account), you can choose the right SDK and learn about referencing the correct endpoints and integrating additional services.

Before proceeding, choose the integration method that best suits your needs. For an overview of available options and their capabilities, see [Choose the Right Integration for You](doc:choose-the-right-integration-for-you).

## Available Integration Options

Here are the primary integration methods available with Yuno, each designed to fit different needs and technical requirements:

<Cards columns={4}>
  <Card title="Full SDK" href="/docs/full-sdk-workflow" icon="fa-code">
    * [Web](/docs/full-sdk-workflow)
    * [Android](https://docs.y.uno/docs/full-checkout-android)
    * [iOS](https://docs.y.uno/docs/full-checkout-ios)
    * [Flutter](https://docs.y.uno/docs/full-sdk-flutter)
  </Card>

  <Card title="Lite SDK (Payment)" href="/docs/the-ultimate-checkout-lite" icon="fa-code" />

  <Card title="Lite SDK (Enrollment)" href="/docs/enrollment-lite" icon="fa-code" />

  <Card title="Secure Fields" href="/docs/secure-fields" icon="fa-code" />

  <Card title="Headless SDK (Payment)" href="/docs/headless-sdk-integration" icon="fa-code" />

  <Card title="Headless SDK (Enrollment)" href="/docs/headless-sdk-enrollment-steps" icon="fa-code" />

  <Card title="Direct Workflow" href="/docs/direct-flow" icon="fa-code" />
</Cards>

<HTMLBlock>{`
<Shelf classname="cards_container">
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
`}</HTMLBlock>