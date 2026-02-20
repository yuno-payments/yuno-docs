---
title: SDK Customizations
deprecated: false
hidden: false
metadata:
  robots: index
---

The Yuno Web SDK allows you to customize various elements, making it easy to align the design of payment forms and the checkout flow with your brand guidelines and UX/UI. Although the structure of each element remains uniform, you can adjust colors, text, buttons, and much more. For all Web SDK parameters and config options, see [Web SDK Common Reference](web-sdk-common-reference).

## General guidelines

* **Styles within an iframe**: Define the new styles when initializing the SDK. Each form input that receives card information is rendered within an iframe when using the Form Card Modal.
* **Styles outside an iframe**: Inject the styles directly into the page.
* **Check element structure**: Use the browser's developer mode to inspect where the element is rendered.

## Input design types

You can customize how labels and placeholders are displayed in input fields by configuring the input design type. This property controls the visual presentation of form labels and placeholders across different SDK implementations.

For detailed configuration options, design type descriptions, and CSS class information, see the [Default Design](sdk-customizations-default-design-web#input-design-types) page.

## Default and deprecated design

Use the Default Design information when customizing the Yuno Web SDK. This approach is recommended for all new customizations and ensures you use the most up-to-date styles and practices.

The Deprecated Design is available for Yuno clients needing access to CSS class information. However, this option will be removed in the future.

## Customizable elements

Sections below list Card and APM form elements and the classes you can modify.

Choose the design system you want to customize:

<Shelf classname="link_cards_container">
  <YunoCard title="Default Design" href="sdk-customizations-default-design-web" titleSize="h4" />

  <YunoCard title="Deprecated Design" href="sdk-customizations-deprecated-design-web" titleSize="h4" />
</Shelf>

## Address autocomplete

Merchants can enable or disable address autocomplete functionality in the Web SDK. When enabled, the SDK automatically fills address fields based on postal code lookup. When disabled, users must manually enter all address information.