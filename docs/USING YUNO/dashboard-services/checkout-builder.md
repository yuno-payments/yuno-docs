---
title: Checkout Builder
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Checkout Builder
  description: >-
    The Checkout Builder feature in the dashboard empowers users to shape their
    payment checkout process to suit their brand and business needs.
  robots: index
next:
  description: ''
---
The Checkout Builder is a no-code tool designed to customize your checkout experience. It includes two main modules:

* **Payment method settings**: Enable payment methods with a published route to show to your customers. Additionally, you can define under which circumstances specific payment methods are displayed.
* **Checkout styling**: Adjust the checkout's visual elements for desktop and mobile devices, including colors and typography. This ensures the checkout experience is consistent with yoru brand.

Any changes made using the Checkout Builder are immediately reflected in the user-facing checkout, providing a straightforward way to manage and adapt the checkout experience to meet your business requirements.

<Image align="center" border={false} src="https://files.readme.io/5a0a03a-manage_checkout_view.png" />

## Advantages of using Checkout Builder

* **Customization with no code**: Enjoy the flexibility of tailoring your checkout experience without the need for complex coding. This empowers you to create a checkout process that aligns seamlessly with your brand and business objectives.
* **Payment method flexibility**: Easily enable, organize, and display the payment methods that best suit your customer base and market.
* **Intuitive user interface**: Yuno's interface makes it a breeze to configure payment methods, set display conditions, and customize styling.

## Payment method settings

This module lets you configure and customize the payment methods used in the checkout experience. Beyond activating payment methods, you can adjust the order in which they're displayed, customize their appearance, set required fields, and determine conditions for when each payment method is displayed. This breadth of customization ensures the checkout experience fits your audience and specific use case.

You must click **Publish settings** on the Checkout Builder to apply all changes to the checkout.

### Conditions

You can control when a payment method appears at checkout by setting display conditions based on criteria such as the order’s country, amount, currency, or integration metadata. To configure these settings, follow the steps:

1. Next to the payment method, click the three dots icon to open settings and select **Set Conditions**. A pop-up will appear, click **Add new condition** to proceed.

<Image border={false} src="https://files.readme.io/43f984abb0af8af92f6663229d9c895fdbe233ead7af224052596c6839556b8f-image1.png" />

2. In the **Add new condition** section, enter a descriptive name for your condition. Then, select your desired specification such as order country, order current & amount, or metadata. This specification sets the parameters that will trigger your condition. You can select more than one condition at a time.

<Image border={false} src="https://files.readme.io/ed8aff519e8357a2d530b75585a93cf0b7a1ba7df3f8e605158974efe1b71b6f-image2.png" />

3. New options will appear based on the specifications you selected. Fill out the fields to achieve your desired outcome.

<Image border={false} src="https://files.readme.io/6487abe0715c535247d709a1c8062ff95415f4915a74bae5b70b1154b87e7441-image5.png" />

### Required fields

Required fields specify the information users must provide when using each payment method. Some payment methods require specific data to process payments, and Yuno may request it even if you didn't specify it. Yuno streamlines the process of adding or removing desired fields through its user interface. To configure required fields, click the three dots icon next to each payment method and select **Set Required fields**.

Once the Required fields menu is open, use the toggle to turn specific fields on and off. Fields required by a provider are enabled by default.

<Image border={false} src="https://files.readme.io/3367e1a24cd510ba8f56df1f73dacfa07f94478493d8e1a208a16dedfcea9a3e-image4.png" />

You can disable any field, including those required by providers. However, disabling required fields may result in payment failures, so it is essential to verify the provider compatibility before making changes. If a new provider is added to the payment method, any previously disabled required fields will remain disabled, even if required by the new provider. You must manually re-enable these fields if necessary. Therefore, always check the required fields after adding a new provider.

In the Required fields, you can also configure the behavior for enrolled cards. You can configure whether to request the CVV for every transaction or only during the customer’s first payment.

### Edit name and logo

The name and logo settings control how a payment methods appear during checkout. This option is unavailable for enrolled payment methods. To adjust these settings:

1. Within **Payment method settings**, click the three dots icon next to any non-enrolled payment method and select **Edit name and logo**.
2. Select **Use custom settings** to make changes.
3. Enter your preferred name for the payment method.
4. Optionally, you can add a description and provide a new logo URL. The URL must start with "https://". Use a square image (JPG or PNG), 100x100 pixels in size, and up tp 10 KB.
5. Click **Save changes**, followed by **Publish settings** to apply all changes.

<Image border={false} src="https://files.readme.io/592162ae53722d2676c56066ea67eeeb09a7caab0c8abbea29e66231035e38d2-image3.png" />

## Checkout styling

Match your brand's unique look and feel using the Checkout Styling module. Changes made in this module are reflected in the end-user checkout immediately after publishing.

The General Styling section allows you to adjust key visual elements, creating a consistent and professional look throughout the checkout experience. In this section, you can customize the following elements:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Customizable Element
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Payment method list style**
      </td>

      <td>
        Define how you want the payment methods list to behave and be displayed in your checkout.  Toggle these options:

        * **Unfolded display:** Shows the payment form expanded in place, integrated into the payment methods list.
        * **Preselected payment method**: Enable the option to display a preselected payment method when the checkout loads.
        * **Condensed checkout view**: Reduce visual clutter by showing just the preselected payment method. Additional options remain available under **View more**.
        * **Edit payment method list:** Enable this option to allow users to delete their saved payment methods directly from the checkout.
      </td>
    </tr>

    <tr>
      <td>
        **Forms collect data**
      </td>

      <td>
        Select how your forms will be shown to users when collecting payment details. Options include:  

        * **Modal or render**: Render is web-only.
        * **Card form visualization mode**: Define how the card form will be displayed to users during checkout (one step or step by step).
        * **Credit card only processing**: Force dual-network cards to be processed exclusively as credit, disabling the debit option.
        * **Enable card scanning**: Activate the scanning option so users can automatically capture their credit or debit card details using their device’s camera, avoiding manual entry of the card number, expiration date, and cardholder name.
      </td>
    </tr>

    <tr>
      <td>
        **Typography**
      </td>

      <td>
        Choose a font from our list to apply to the entire design of your checkout.
      </td>
    </tr>

    <tr>
      <td>
        **Colors**
      </td>

      <td>
        Select and customize the color palette to define the visual appearance of your checkout.  

        * **Use system settings (dark mode)**: This feature will remain disabled while there are custom changes to the checkout’s colors, typography, or styles. To enable it again, you’ll need to restore the default values.
        * **Custom colors**: Set accent, background, and secondary background colors independently with hex codes, as well as the color of the text.
      </td>
    </tr>

    <tr>
      <td>
        **Background Color**
      </td>

      <td>
        Set the background color applied across all checkout forms, establishing a base that reflects your brand’s aesthetic. This background color serves as the foundation of the entire checkout interface.
      </td>
    </tr>

    <tr>
      <td>
        **Form styles settings**
      </td>

      <td>
        Customize every detail of your payment form's design. Adjust borders, typography, colors, and corner radius to fully match your brand's visual identity.  Options include:  

        * Logo border
        * Logo border color
        * Logo corner radius
        * Font size
        * Font weight
      </td>
    </tr>
  </tbody>
</Table>
