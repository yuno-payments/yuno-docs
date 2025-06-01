---
title: Configuring payment conditions (Depricated)
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: Configuring payment conditions
  description: >-
    After integrating the Yuno plugin into your VTEX account, you can take
    advantage of Yuno solutions. In this step, you will configure payment
    conditions on the VTEX platform. Payment conditions are the methods of
    payment displayed on the website for checkout.
  robots: index
next:
  description: ''
---
After integrating the Yuno plugin into your VTEX account, you can take advantage of Yuno solutions. In this step, you will configure payment conditions on the VTEX platform. Payment conditions are the methods of payment displayed on the website for checkout. This functionality enables you to configure a range of choices, including installment plans and interest rates.

You can configure payment conditions for each payment available on VTEX. To help you understand the process, the step-by-step guide below presents how to configure a payment condition when the user selects Visa credit card as the payment method.

1. First, navigate to **Store Settings**> **Payment** > **Settings** and select **Payment Conditions**.
2. On this page, you find all already configured payment conditions. To add a new one, click the **+** button.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;">
  <image src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/vtex/configuringPayment/vtex_configure1.png?raw=true" style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></image>
</div>
`}</HTMLBlock>

3. Choose the payment condition to configure. In this example, Visa credit card was chosen.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;">
  <image src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/vtex/configuringPayment/vtex_configure2.png?raw=true" style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></image>
</div>
`}</HTMLBlock>

4. On the new page, for **Process with affiliation** select **Yuno**. This ensures that Yuno will be your processing gateway for Visa credit card payments. You can also add conditions and configurations for full or installment payments on this page.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;">
  <image src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/vtex/configuringPayment/vtex_configure3.png?raw=true" style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></image>
</div>
`}</HTMLBlock>

5. Click on **Save**.

After concluding step 5, you have configured and made the Visa credit card payment method available for your clients. Returning to the **Payment Conditions** page, you can confirm it is active. For further information on configuring payment conditions considering installments with or without interest, check the [VTEX page](https://help.vtex.com/en/tutorial/how-to-configure-payment-conditions--tutorials_455?\&utm_source=autocomplete#installments-without-interest). Now, when your customers arrive at the checkout phase and select credit card as the payment method, the Yuno checkout will gather all the information required for fraud screening and three d secure services in the background while using VTEX credit card form:

<Image align="center" width="400px" src="https://files.readme.io/6de6f33-Screenshot_2023-08-22_at_6.20.41_AM.png" />
