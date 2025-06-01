---
title: Payment Links
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Payment Links
  description: >-
    The Payment Links section within the dashboard serves as your gateway to
    effortless and efficient payment collection.
  robots: index
next:
  description: ''
---
The dashboard's payment links section allows you to create URLs to simplify your payment collection effortlessly. Let's see how Yuno's payment links solution brings both simplicity and advanced features.

## A no-code experience

- **Custom-built payment links**: You can create payment links tailored to your needs without coding
- **Simple setup**: Construct a payment link in a few intuitive steps. Specify a country, currency, amount, and at least one payment method for rapid link creation
- **Start and expiration dates**: Enhance payment link utility by setting start and expiration dates. Increase your control by defining the exact time and timezone

![](https://files.readme.io/4c63c64-payment_links.png)

## Advantages of payment links

- Effortless usability with an intuitive interface and no need for coding
- Highly customizable links aligning with business needs and enhancing customer engagement
- Enhanced control allowing for the cancellation of links on demand
- Transaction insights deliver deep visibility and valuable analytics into payment activity and transaction status

## Create a payment link

If you are using the dashboard, follow these steps to create a payment link:

1. Access the [Yuno dashboard](https://auth.y.uno/u/login?)
2. Navigate to the **Payment links** section
3. Click **Create payment link**
4. Fill in the **Basic info** (description, country, currency, and amount) for your payment. Then, configure **Advanced options**
5. (Optional) Use **Payment settings** to add more payment methods, which could increase conversion
6. Share the payment link with your customer

If you are using the API integration, follow these steps:

1. (Optional) Create a customer using the [Create customer](ref:create-customer) endpoint.
2. Create the payment link using the [Create payment link](ref:create-payment-link) endpoint.
3. Share the payment link with your customer.

## Advanced options

Payment links can be enhanced in multiple ways:

- **Connect the payment link to an existing order ID**: Simplify order tracking by matching the payment link to an order ID
- **Collect multiple payments**: Determine whether a link should accept multiple payments or a single transaction
- **Set start and expiration date**: Set a timeframe in which your link will be active, down to the minute and timezone. If you don't set a start date, your link will be active immediately
- **Enhanced user experience**: Delight your customers by adding items, services, or causes. This enhanced detail elevates the customer experience and provides a comprehensive view of the order within the payment link checkout
- **Airline ticket information**: Beneficial for airlines and travel-related businesses, this feature allows the integration of airline ticket information within the payment link checkout, offering a seamless and convenient payment experience

## Using payment links

When customers open payment links, they will be greeted with a clean interface informing them of the amount to be paid and the payment methods available, according to what you selected when generating the link. The look of the page will adapt dynamically to phones and tablets. After following the on-screen instructions, customers will be able to process their payment, which can be viewed on the dashboard when managing payment links.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/80d70eea20b56f7ecc64e90ef5c9d6644b01ac2eee925227d812bc0023ae115b-Screenshot_2025-05-29_at_11.27.19_AM.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Payment link management

**Payment links** will display all your links in a list. Click any link to see an overview and payments performed. You may also narrow your search by payment link ID or using filters. Additionally, selecting the three dots next to each link will display:

- **Share payment link**: Quickly retrieve the link to share with your customers
- **View details**: See payment methods and previous payments
- **Disable**: Deactivate the link once it's no longer needed

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6e50101997a8f28c9a47a5aafc643c53d897adb029d6fee6340eb3a1e59e0c1e-Captura_de_Tela_2025-05-28_as_15.19.18.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


For detailed insights and inquiries, consult our comprehensive documentation or connect with our support team.