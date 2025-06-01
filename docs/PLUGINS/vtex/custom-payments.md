---
title: Custom Payments
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
The custom payment is an alternative to the standard options offered by Payments. It allows you to create up to 15 new forms of payment, such as cash on delivery or payment with the store's card, for example. This VTEX feature lets you create custom payment methods to complement your checkout offer. Most common used cases are related to adding new Card processors to the checkout flow, such as: 

- ALELO
- SODEXO
- VR

## Creating a custom payment method

The first [configuration in VTEX](https://help.vtex.com/en/tutorial/setting-up-payments-with-store-card-cobranded) step will be the creation of the custom payment (cobranded) store card.

1. In the VTEX Admin, go to** Store Settings > Payment > Settings**, or type Settings in the search bar at the top of the page.
2. Click on the **Custom Payments** tab.
   1. [block:image]{"images":[{"image":["https://files.readme.io/822a422-Screenshot_2024-07-10_at_11.57.05_AM.png","",""],"align":"center"}]}[/block]
3. In (**cobranded) store cards**, click on one of the five configuration boxes.
4. In **Name**, fill in the name of the card. Options available for processing in Yuno: 
   1. ALELO
   2. SODEXO
   3. VR
5. In **Description**, write the text that will give more details about the payment condition.
6. In the **Card Brand** field, choose the banner to which your store card is linked. Currently, the possible options are: American Express, Cabal, Diners, Elo, Mastercard and Visa.
7. In **BIN ranges (optional)**, you can enter a range of BINs (by entering the first and last code in the sequence, separated by a hyphen) or several (separating each range by a comma and without spaces).
   1. When the customer enters a bin number outside the range specified in this field, the following message will be displayed "Check the digits printed on your card. We couldn't confirm if the card number is correct". If there is no error in the number entered, they can click on "YES, THE NUMBER IS CORRECT" to continue completing the order.
8. In the field **Acquirer Payment Code (optional)**, enter the code to be sent and processed by the acquirer you have contracted.
9. In **Split Payments**, if you choose to use this option, when the sale involves marketplace stores, the amounts will be split between the sellers and the marketplace.
10. Click **Save**.

## Payment Conditions

After setting up your payment method, please follow the steps 6 to 9 in the [Configure Yuno as provider](doc:configure-yuno-as-provider) documentation.