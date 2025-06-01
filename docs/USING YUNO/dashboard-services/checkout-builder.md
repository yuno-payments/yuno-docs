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

- **Payment method settings**: Enable payment methods with a published route to show to your customers. Additionally, you can define under which circumstances specific payment methods are displayed.
- **Checkout styling**: Adjust the checkout's visual elements for desktop and mobile devices, including colors and typography. This ensures the checkout experience is consistent with yoru brand.

Any changes made using the Checkout Builder are immediately reflected in the user-facing checkout, providing a straightforward way to manage and adapt the checkout experience to meet your business requirements.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5a0a03a-manage_checkout_view.png",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Advantages of using Checkout Builder

- **Customization with no code**: Enjoy the flexibility of tailoring your checkout experience without the need for complex coding. This empowers you to create a checkout process that aligns seamlessly with your brand and business objectives.
- **Payment method flexibility**: Easily enable, organize, and display the payment methods that best suit your customer base and market.
- **Intuitive user interface**: Yuno's interface makes it a breeze to configure payment methods, set display conditions, and customize styling.

## Payment method settings

This module lets you configure and customize the payment methods used in the checkout experience. Beyond activating payment methods, you can adjust the order in which they're displayed, customize their appearance, set required fields, and determine conditions for when each payment method is displayed. This breadth of customization ensures the checkout experience fits your audience and specific use case.

You must click **Publish settings** on the Checkout Builder to apply all changes to the checkout.

### Conditions

You can control when a payment method appears at checkout by setting display conditions based on criteria such as the order’s country, amount, currency, or integration metadata. To configure these settings, follow the steps:

1. Next to the payment method, click the three dots icon to open settings and select **Set Conditions**. A pop-up will appear, click **Add new condition** to proceed.

![](https://files.readme.io/43f984abb0af8af92f6663229d9c895fdbe233ead7af224052596c6839556b8f-image1.png)

2. In the **Add new condition** section, enter a descriptive name for your condition. Then, select your desired specification such as order country, order current & amount, or metadata. This specification sets the parameters that will trigger your condition. You can select more than one condition at a time.

![](https://files.readme.io/ed8aff519e8357a2d530b75585a93cf0b7a1ba7df3f8e605158974efe1b71b6f-image2.png)

3. New options will appear based on the specifications you selected. Fill out the fields to achieve your desired outcome.

![](https://files.readme.io/6487abe0715c535247d709a1c8062ff95415f4915a74bae5b70b1154b87e7441-image5.png)

### Required fields

Required fields specify the information users must provide when using each payment method. Some payment methods require specific data to process payments, and Yuno may request it even if you didn't specify it. Yuno streamlines the process of adding or removing desired fields through its user interface. To configure required fields, click the three dots icon next to each payment method and select **Set Required fields**.

Once the Required fields menu is open, use the toggle to turn specific fields on and off. Fields required by a provider are enabled by default.

![](https://files.readme.io/3367e1a24cd510ba8f56df1f73dacfa07f94478493d8e1a208a16dedfcea9a3e-image4.png)

You can disable any field, including those required by providers. However, disabling required fields may result in payment failures, so it is essential to verify the provider compatibility before making changes. If a new provider is added to the payment method, any previously disabled required fields will remain disabled, even if required by the new provider. You must manually re-enable these fields if necessary. Therefore, always check the required fields after adding a new provider.

In the Required fields, you can also configure the behavior for enrolled cards. You can configure whether to request the CVV for every transaction or only during the customer’s first payment.

### Edit name and logo

The name and logo settings control how a payment methods appear during checkout. This option is unavailable for enrolled payment methods. To adjust these settings:

1. Within **Payment method settings**, click the three dots icon next to any non-enrolled payment method and select **Edit name and logo**.
2. Select **Use custom settings** to make changes.
3. Enter your preferred name for the payment method.
4. Optionally, you can add a description and provide a new logo URL. The URL must start with "https\://". Use a square image (JPG or PNG), 100x100 pixels in size, and up tp 10 KB.
5. Click **Save changes**, followed by **Publish settings** to apply all changes. 

![](https://files.readme.io/592162ae53722d2676c56066ea67eeeb09a7caab0c8abbea29e66231035e38d2-image3.png)

## Checkout styling

Match your brand's unique look and feel using the Checkout Styling module. Changes made in this module are reflected in the end-user checkout immediately after publishing.

### General Styling Options

The General Styling section allows you to adjust key visual elements, creating a consistent and professional look throughout the checkout experience. In this section, you can customize the following elements:

[block:parameters]
{
  "data": {
    "h-0": "Customizable Element",
    "h-1": "Description",
    "0-0": "**Background Color**",
    "0-1": "Set the background color applied across all checkout forms, establishing a base that reflects your brand’s aesthetic. This background color serves as the foundation of the entire checkout interface.",
    "1-0": "**Accent Color**",
    "1-1": "Select an accent color to highlight interactive elements, enhancing the user experience and adding brand-specific touches. The accent color applies to:  \n  \n- The background color of the primary button\n- The border color of the secondary button\n- Checkbox colors",
    "2-0": "**Primary Text Color**",
    "2-1": "Define the main text color for high-visibility elements. This color will apply to:  \n  \n- Titles and subtitle\n- User input fields\n- Dropdown values\n- Text on secondary buttons\n- Checkbox text",
    "3-0": "**Secondary Text Color**",
    "3-1": "Choose a secondary text color for supporting text elements. This color applies to:  \n  \n- Field descriptions\n- Placeholder text\n- Help text for additional form guidance",
    "4-0": "**Primary Button Text Color**",
    "4-1": "Set the text color for the primary button to ensure the call-to-action is noticeable and accessible.",
    "5-0": "**Typography**",
    "5-1": "Select your preferred font."
  },
  "cols": 2,
  "rows": 6,
  "align": [
    "left",
    "left"
  ]
}
[/block]